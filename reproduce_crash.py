"""
Reproduce Crash
Sends the exact same payload that caused the 500 error to debug it.
"""
import requests
import json

API_URL = "http://localhost:3000/api/v1/generate"

data = {
  "domain": "Education",
  "research_topic": "Career guidance system",
  "research_type": "Theoretical/Conceptual",
  "completion_status": "Completed",
  "problem_importance": "For promoting careers",
  "key_contribution": "A ai based algorithm",
  "key_results": "Different types of careers",
  "background_info": "Carrer",
  "specific_problem": "Less career options in india",
  "objectives": "Career",
  "related_approaches": "Career",
  "prior_limitations": "Career",
  "comparison_baselines": "other models",
  "approach_overview": "Create a whole system",
  "system_workflow": "User",
  "algorithms": "ocean",
  "dataset_details": "Kaggle",
  "tools_used": "Ai",
  "validation_method": "Ai",
  "quantitative_results": "100",
  "result_interpretation": "good",
  "comparison_analysis": "good",
  "current_limitations": "nothing",
  "future_work": "scope",
  "conclusion_summary": "nothing",
  "formal_problem_def": "nothing",
  "architecture_details": "nothing",
  "ethical_considerations": "nothing",
  "special_requirements": "nothign"
}

print(f"🚀 Sending request to {API_URL}...")

try:
    response = requests.post(API_URL, json=data)
    print(f"Status Code: {response.status_code}")
    print("Response:")
    print(response.text)
except Exception as e:
    print(f"Request failed: {e}")
