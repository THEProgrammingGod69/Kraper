import os
import sys
import json
from dotenv import load_dotenv

# Add parent directory to path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from core.rag_pipeline import get_rag_pipeline

# Check if .env exists
if not os.path.exists('.env'):
    print("❌ .env file missing in rag_service!")
    sys.exit(1)

load_dotenv()

print("🔍 Testing RAG Pipeline directly...")

try:
    # Initialize pipeline
    pipeline = get_rag_pipeline()
    
    # Load test request
    with open('../full_request.json', 'r') as f:
        request_data = json.load(f)
        
    print(f"📝 generating paper for: {request_data['research_topic']}")
    
    # Run generation
    result = pipeline.generate_full_paper(request_data)
    
    print("\n✅ Generation Successful!")
    print(f"Sections generated: {list(result['paper_sections'].keys())}")
    
except Exception as e:
    print(f"\n❌ Error: {str(e)}")
    import traceback
    traceback.print_exc()
