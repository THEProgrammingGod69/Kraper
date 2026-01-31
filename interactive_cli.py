"""
Interactive Research Paper Generator CLI

Run this script to answer the questionnaire in your terminal!
It will collect your answers and send them to the backend.

Usage: python interactive_cli.py
"""

import requests
import json
import time

API_URL = "http://localhost:3000/api/v1/generate"

def ask(question, default=None):
    """Ask a question with an optional default value"""
    prompt = f"\n👉 {question}"
    if default:
        prompt += f" (Default: {default})"
    prompt += "\n> "
    
    response = input(prompt).strip()
    # Return default if provided, otherwise empty string (not None)
    if not response and default is not None:
        return default
    return response if response else ""

def main():
    print("="*60)
    print("🎓 AI RESEARCH PAPER GENERATOR - INTERACTIVE MODE")
    print("="*60)
    print("Answer the following questions to generate your paper.")
    print("Press Enter to skip optional questions or use defaults.")
    
    # --- PART A: CORE INFO ---
    print("\n--- PART A: CORE INFO ---")
    data = {}
    data['domain'] = ask("Research Domain (e.g., NLP, Computer Vision)", "Artificial Intelligence")
    data['research_topic'] = ask("Research Topic (1 sentence)", "Generating research papers using AI")
    
    print("\nChoose Research Type:")
    print("1. Experimental/Empirical")
    print("2. Design/Implementation")
    print("3. Theoretical/Conceptual")
    print("4. Simulation-based")
    print("5. Hypothetical/Proposed")
    print("6. Survey/Review")
    type_map = {
        "1": "Experimental/Empirical", "2": "Design/Implementation",
        "3": "Theoretical/Conceptual", "4": "Simulation-based",
        "5": "Hypothetical/Proposed", "6": "Survey/Review"
    }
    data['research_type'] = type_map.get(ask("Select Type (1-6)", "2"), "Design/Implementation")
    
    data['completion_status'] = ask("Is work Completed or Hypothetical?", "Hypothetical")

    # --- PART B: MOTIVATION ---
    print("\n--- PART B: MOTIVATION ---")
    data['problem_importance'] = ask("Why is this research important?")
    data['key_contribution'] = ask("What is your main contribution?")
    data['key_results'] = ask("What are your key results/findings?")

    # --- PART C: PROBLEM ---
    print("\n--- PART C: BACKGROUND & PROBLEM ---")
    data['background_info'] = ask("Brief background info:")
    data['specific_problem'] = ask("Specific problem/gap you address:")
    data['objectives'] = ask("Research objectives (list them):")

    # --- PART D: RELATED WORK ---
    print("\n--- PART D: RELATED WORK ---")
    data['related_approaches'] = ask("Existing approaches:")
    data['prior_limitations'] = ask("Limitations of prior work:")
    data['comparison_baselines'] = ask("Baselines for comparison:")

    # --- PART E: METHODOLOGY ---
    print("\n--- PART E: METHODOLOGY ---")
    data['approach_overview'] = ask("Overview of your approach:")
    data['system_workflow'] = ask("System workflow steps:")
    data['algorithms'] = ask("Algorithms/Techniques used:")
    data['dataset_details'] = ask("Dataset details:")
    data['tools_used'] = ask("Implementation tools:")
    data['validation_method'] = ask("How do you validate it?")

    # --- PART F: RESULTS ---
    print("\n--- PART F: RESULTS ---")
    data['quantitative_results'] = ask("Quantitative results:")
    data['result_interpretation'] = ask("Interpretation of results:")
    data['comparison_analysis'] = ask("Comparison with baselines:")

    # --- PART G: CONCLUSION ---
    print("\n--- PART G: CLOSING ---")
    data['current_limitations'] = ask("Current limitations:")
    data['future_work'] = ask("Future work directions:")
    data['conclusion_summary'] = ask("Key takeaways for conclusion:")
    
    # --- EXTRAS ---
    data['formal_problem_def'] = ask("[Optional] Formal problem definition:")
    data['architecture_details'] = ask("[Optional] Architecture details:")
    data['ethical_considerations'] = ask("[Optional] Ethical considerations:")
    data['special_requirements'] = ask("[Optional] Special requirements:")

    print("\n" + "="*60)
    print("🚀 Sending request to backend... (This may take 30-60s)")
    print("="*60)
    
    try:
        start_time = time.time()
        response = requests.post(API_URL, json=data, timeout=600)
        response.raise_for_status()
        
        result = response.json()
        
        if result.get('success'):
            paper = result['data']['generated_text']
            filename = f"generated_paper_{int(time.time())}.json"
            
            with open(filename, 'w') as f:
                json.dump(paper, f, indent=2)
                
            print(f"\n✅ Paper Generated Successfully! ({time.time() - start_time:.1f}s)")
            print(f"📄 Saved to: {filename}")
            print("\nPreview of Abstract:")
            print("-" * 40)
            print(paper.get('Abstract', 'No Abstract'))
            print("-" * 40)
        else:
            print("\n❌ Backend returned error:")
            print(json.dumps(result, indent=2))
            
    except Exception as e:
        print(f"\n❌ Request failed: {e}")

if __name__ == "__main__":
    main()
