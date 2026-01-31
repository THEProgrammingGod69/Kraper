/**
 * Research Paper Generator - Express API Gateway
 * 
 * This is the main entry point for the Node.js backend.
 * It handles HTTP requests, validates input, and orchestrates
 * communication with the Python RAG microservice.
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3000;

// ===========================================
// MIDDLEWARE CONFIGURATION
// ===========================================

// Security headers
app.use(helmet());

// Enable CORS for all origins (configure as needed for production)
app.use(cors());

// Parse JSON request bodies (limit to 10MB for large questionnaires)
app.use(express.json({ limit: '10mb' }));

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
    next();
});

// ===========================================
// ROUTES
// ===========================================

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({
        status: 'healthy',
        service: 'research-paper-generator-api',
        timestamp: new Date().toISOString()
    });
});

// API routes (versioned)
app.use('/api/v1', routes);

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        error: 'Not Found',
        message: `Route ${req.method} ${req.path} does not exist`,
        timestamp: new Date().toISOString()
    });
});

// ===========================================
// GLOBAL ERROR HANDLER
// ===========================================

app.use((err, req, res, next) => {
    console.error('Error:', err);

    res.status(err.status || 500).json({
        error: err.name || 'InternalServerError',
        message: err.message || 'An unexpected error occurred',
        timestamp: new Date().toISOString(),
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
});

// ===========================================
// SERVER START
// ===========================================

app.listen(PORT, () => {
    console.log('='.repeat(50));
    console.log('🚀 Research Paper Generator API');
    console.log('='.repeat(50));
    console.log(`✓ Server running on port ${PORT}`);
    console.log(`✓ Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`✓ Python Service URL: ${process.env.PYTHON_SERVICE_URL || 'http://localhost:5000'}`);
    console.log('='.repeat(50));
});

module.exports = app;
