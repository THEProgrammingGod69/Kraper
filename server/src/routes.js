/**
 * API Routes
 * 
 * Defines all API endpoints for the research paper generator
 */

const express = require('express');
const router = express.Router();
const { generateText, checkStatus } = require('./controllers/generatorController');

/**
 * POST /api/v1/generate
 * 
 * Generate academic text based on questionnaire
 * 
 * Request Body:
 * {
 *   "research_domain": "Machine Learning",
 *   "problem_statement": "...",
 *   "methodology": "...",
 *   "dataset_description": "...",
 *   "evaluation_metrics": "...",
 *   "target_section": "Abstract"
 * }
 * 
 * Response:
 * {
 *   "success": true,
 *   "data": {
 *     "generated_text": "...",
 *     "section": "Abstract",
 *     "metadata": { ... }
 *   }
 * }
 */
router.post('/generate', generateText);

/**
 * GET /api/v1/status
 * 
 * Check health of both Node and Python services
 */
router.get('/status', checkStatus);

module.exports = router;
