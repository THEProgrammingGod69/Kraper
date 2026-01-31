import requests
import json
import time

# Node.js Service URL
API_URL = "http://localhost:3000/api/v1/generate"

print("🔍 Starting End-to-End System Test...")

try:
    # Load the full request payload
    with open('full_request.json', 'r') as f:
        payload = json.load(f)
        
    print(f"📝 Topic: {payload['research_topic']}")
    print("🚀 Sending request to Node.js Gateway...")
    
    start_time = time.time()
    response = requests.post(API_URL, json=payload, timeout=600)
    
    # Check response
    if response.status_code == 200:
        result = response.json()
        print("\n✅ SUCCESS! Paper Generated.")
        print(f"Total Time: {time.time() - start_time:.1f}s")
        
        # Save output
        with open('E2E_Test_Result.json', 'w') as f:
            json.dump(result, f, indent=2)
        print("📄 Saved result to E2E_Test_Result.json")
        
        # Verify sections
        if 'data' in result and 'generated_text' in result['data']:
            sections = result['data']['generated_text']
            print("\nGenerated Sections:")
            for key in sections:
                print(f" - {key} ({len(sections[key])} chars)")
        
    else:
        print(f"\n❌ FAILED. Status: {response.status_code}")
        print(f"Response: {response.text}")
        
except Exception as e:
    print(f"\n❌ Test Script Error: {str(e)}")
