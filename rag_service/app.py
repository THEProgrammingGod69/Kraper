"""
Flask API for Python RAG Service

Exposes endpoints for:
- Health check
- Full Paper Generation

This service is called by the Node.js Express server.
"""

import os
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from dotenv import load_dotenv

from core.rag_pipeline import get_rag_pipeline

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
# Allow all origins, all methods, all headers, with credentials
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

# Configuration
FLASK_HOST = os.getenv('FLASK_HOST', '0.0.0.0')
FLASK_PORT = int(os.getenv('FLASK_PORT', 5002))
FLASK_ENV = os.getenv('FLASK_ENV', 'development')

# Initialize RAG pipeline
print("\n" + "="*60)
print("PYTHON RAG SERVICE INITIALIZATION")
print("="*60)

try:
    rag_pipeline = get_rag_pipeline()
    print("✓ RAG pipeline initialized successfully")
except Exception as e:
    print(f"❌ Failed to initialize RAG pipeline: {e}")
    exit(1)

print("="*60 + "\n")


@app.route('/health', methods=['GET', 'OPTIONS'])
@cross_origin()
def health_check():
    return jsonify({
        'status': 'healthy',
        'service': 'python-rag-service',
        'llm_provider': rag_pipeline.llm_client.provider,
        'model': rag_pipeline.llm_client.model_name
    }), 200


@app.route('/generate', methods=['POST', 'OPTIONS'])
@cross_origin()
def generate_paper():
    """
    Generate FULL research paper endpoint
    """
    try:
        questionnaire = request.get_json()
        
        if not questionnaire or 'domain' not in questionnaire:
            return jsonify({
                'error': 'InvalidRequest',
                'message': 'Missing domain or questionnaire data'
            }), 400
        
        print(f"\n📥 Received PAPER generation request for: {questionnaire.get('research_topic')}")
        
        # Run RAG pipeline for full paper
        result = rag_pipeline.generate_full_paper(questionnaire)
        
        return jsonify(result), 200
        
    except Exception as e:
        print(f"❌ Error in /generate: {str(e)}")
        return jsonify({
            'error': 'GenerationError',
            'message': str(e)
        }), 500




from core.conference_scraper import ConferenceScraper

# Initialize Scraper
scraper = ConferenceScraper()

@app.route('/conferences', methods=['POST', 'OPTIONS'])
@cross_origin()
def get_conferences():
    """
    Get conferences for a domain
    Accepts: { domain: "keywords" }
    """
    try:
        data = request.get_json()
        domain = data.get('domain', 'General')
        
        # Scrape
        results = scraper.get_conferences(domain)
        
        return jsonify({
            "status": "success",
            "count": len(results),
            "data": results
        }), 200
    except Exception as e:
        print(f"❌ Error in /conferences: {e}")
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500


if __name__ == '__main__':
    app.run(
        host=FLASK_HOST,
        port=FLASK_PORT,
        debug=(FLASK_ENV == 'development')
    )
