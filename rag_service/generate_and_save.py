import os
import sys
import json
from dotenv import load_dotenv

# Run this from rag_service/ directory

from core.rag_pipeline import get_rag_pipeline

# Check if .env exists
if not os.path.exists('.env'):
    print("❌ .env file missing in rag_service!")
    sys.exit(1)

load_dotenv()

print("🚀 Generating your Apple RCNN Paper directly...")

payload = {
  "domain": "RCNN",
  "research_topic": "Apple disease detection using RCNN",
  "research_type": "Experimental/Empirical",
  "completion_status": "Completed",
  "problem_importance": "Important for detection of diseases in aplle leaves",
  "key_contribution": "Using RCNN",
  "key_results": "Successfully Detetcted the diseases in various types of aplle aand scab",
  "background_info": "The presenmce of diseases in plant leaves poses a serious challenge to agricultutral productivity, often leading to considerable finacial loses",
  "specific_problem": "The presenmce of diseases in plant leaves poses a serious challenge to agricultutral productivity, often leading to considerable finacial loses",
  "objectives": "To design and implemet a rcnn",
  "related_approaches": "Manual Vision Inspection, Traditional Image processing techniques",
  "prior_limitations": "Dependence on ideal image conditons, poor generalization to real life scenarios",
  "comparison_baselines": "Conventional RCNN, ResNet,CNN trained on ideal dataset,",
  "approach_overview": "Data colelction, Data preprocessing and Augmentation, RCNN model Architecture",
  "system_workflow": "Image aquisition, Imnput image upload, Image preprocessing,",
  "algorithms": "RCNN",
  "dataset_details": "KAgghele dataset",
  "tools_used": "Jupyter Notebook",
  "validation_method": "By tarining it",
  "quantitative_results": "Successful detection",
  "result_interpretation": "WE detected many diseases in the apple leaves",
  "comparison_analysis": "Good",
  "current_limitations": "Good",
  "future_work": "Usinng Various types of cnns",
  "conclusion_summary": "Not as such",
  "formal_problem_def": "",
  "architecture_details": "",
  "ethical_considerations": "",
  "special_requirements": ""
}

try:
    pipeline = get_rag_pipeline()
    print(f"📝 generating paper for: {payload['research_topic']}")
    
    # Run generation
    result = pipeline.generate_full_paper(payload)
    
    # Save to file in root
    filename = "../Recovered_Apple_RCNN_Paper.json"
    with open(filename, 'w') as f:
        json.dump(result['paper_sections'], f, indent=2)
        
    print(f"\n✅ SUCCESS! Paper generated and saved to: {filename}")
    
except Exception as e:
    print(f"\n❌ Script failed: {str(e)}")
