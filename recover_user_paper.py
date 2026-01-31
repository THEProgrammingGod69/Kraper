"""
Recover User Paper
Re-runs the request with the data the user provided in the chat, correcting the specific "Experimental" type and Null values.
"""
import requests
import json
import time

API_URL = "http://localhost:3000/api/v1/generate"

# Data exact from user chat log
data = {
  "domain": "RCNN",
  "research_topic": "Apple disease detection using RCNN",
  "research_type": "Experimental/Empirical",  # Fixed from user input "Experimental"
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
  
  # Optionals - Sending empty strings instead of None to avoid 400 Error
  "formal_problem_def": "",
  "architecture_details": "",
  "ethical_considerations": "",
  "special_requirements": ""
}

print("🚀 Recovering user's paper request...")
print(f"Topic: {data['research_topic']}")

try:
    start_time = time.time()
    response = requests.post(API_URL, json=data, timeout=600)
    
    if response.status_code == 200:
        result = response.json()
        paper = result['data']['generated_text']
        filename = "Recovered_Apple_RCNN_Paper.json"
        
        with open(filename, 'w') as f:
            json.dump(paper, f, indent=2)
            
        print(f"\n✅ SUCCESS! Paper generated in {time.time() - start_time:.1f}s")
        print(f"📄 Saved to: {filename}")
        print("\nPreview:")
        print(paper.get('Title and Author', 'No Title'))
        print(paper.get('Abstract', 'No Abstract'))
    else:
        print(f"\n❌ Failed with {response.status_code}: {response.text}")

except Exception as e:
    print(f"\n❌ Script failed: {e}")
