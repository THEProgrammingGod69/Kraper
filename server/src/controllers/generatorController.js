/**
 * Generator Controller
 * 
 * Handles the core business logic for text generation requests.
 * Validates input, communicates with Python RAG service, and
 * standardizes responses.
 */

const axios = require('axios');
const { validateQuestionnaire } = require('../utils/validator');

const PYTHON_SERVICE_URL = process.env.PYTHON_SERVICE_URL || 'http://localhost:5000';
const REQUEST_TIMEOUT = parseInt(process.env.REQUEST_TIMEOUT) || 600000; // 10 minutes for full paper

/**
 * Generate Academic Text
 * 
 * POST /api/v1/generate
 * 
 * Flow:
 * 1. Validate incoming questionnaire
 * 2. Forward request to Python RAG service
 * 3. Return generated text with metadata
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware
 */
async function generateText(req, res, next) {
    try {
        console.log('📝 Received text generation request');

        // ===========================================
        // STEP 1: VALIDATE INPUT
        // ===========================================

        const { error, value } = validateQuestionnaire(req.body);

        if (error) {
            console.error('❌ Validation failed:', error.details);
            return res.status(400).json({
                error: 'ValidationError',
                message: 'Invalid questionnaire format',
                details: error.details.map(d => ({
                    field: d.path.join('.'),
                    message: d.message
                })),
                timestamp: new Date().toISOString()
            });
        }

        console.log('✓ Validation passed');
        console.log(`  - Domain: ${value.domain}`);
        console.log(`  - Topic: ${value.research_topic}`);

        // ===========================================
        // STEP 2: CALL PYTHON RAG SERVICE
        // ===========================================

        console.log('🔗 Forwarding to Python RAG service...');
        const startTime = Date.now();

        const pythonResponse = await axios.post(
            `${PYTHON_SERVICE_URL}/generate`,
            value,
            {
                timeout: REQUEST_TIMEOUT,
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        const processingTime = Date.now() - startTime;
        console.log(`✓ Received response from Python service (${processingTime}ms)`);

        // ===========================================
        // STEP 3: RETURN RESPONSE
        // ===========================================

        return res.status(200).json({
            success: true,
            data: {
                generated_text: pythonResponse.data.paper_sections, // Python returns 'paper_sections', not 'generated_text'
                metadata: {
                    research_domain: value.domain,
                    retrieved_chunks: pythonResponse.data.metadata?.retrieved_chunks || null,
                    model_used: pythonResponse.data.metadata?.model_used || 'llama-3-8b-instant',
                    provider: pythonResponse.data.metadata?.provider || 'groq',
                    processing_time_ms: pythonResponse.data.metadata?.processing_time_ms || processingTime,
                    timestamp: new Date().toISOString()
                }
            }
        });

    } catch (error) {
        console.error('❌ Error in generateText:', error.message);

        // Handle Python service errors
        if (error.response) {
            // Python service returned an error
            return res.status(error.response.status).json({
                error: 'RAGServiceError',
                message: error.response.data.message || 'Error from RAG service',
                details: error.response.data.details || null,
                timestamp: new Date().toISOString()
            });
        }

        // Handle network errors (Python service unreachable)
        if (error.code === 'ECONNREFUSED') {
            return res.status(503).json({
                error: 'ServiceUnavailable',
                message: 'Python RAG service is not running. Please start it first.',
                timestamp: new Date().toISOString()
            });
        }

        // Handle timeout errors
        if (error.code === 'ETIMEDOUT' || error.code === 'ECONNABORTED') {
            return res.status(504).json({
                error: 'GatewayTimeout',
                message: 'Request to RAG service timed out. The generation may be taking longer than expected.',
                timestamp: new Date().toISOString()
            });
        }

        // Pass other errors to global error handler
        next(error);
    }
}

/**
 * Health check for Python service
 * 
 * GET /api/v1/status
 */
async function checkStatus(req, res) {
    try {
        const response = await axios.get(`${PYTHON_SERVICE_URL}/health`, {
            timeout: 5000
        });

        res.json({
            node_service: 'healthy',
            python_service: response.data.status || 'healthy',
            python_url: PYTHON_SERVICE_URL,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        res.status(503).json({
            node_service: 'healthy',
            python_service: 'unreachable',
            python_url: PYTHON_SERVICE_URL,
            error: error.message,
            timestamp: new Date().toISOString()
        });
    }
}

module.exports = {
    generateText,
    checkStatus
};
