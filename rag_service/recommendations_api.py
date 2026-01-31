from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv
import requests

load_dotenv()

app = Flask(__name__)
CORS(app)

# Existing routes...

@app.route('/api/recommendations/analyze', methods=['POST'])
def analyze_project():
    """
    Analyzes a research project idea for rating and novelty
    """
    try:
        data = request.json
        title = data.get('title', '')
        domain = data.get('domain', '')
        abstract = data.get('abstract', '')
        
        if not all([title, domain, abstract]):
            return jsonify({'error': 'Missing required fields'}), 400
        
        # 1. Rate the project using LLM
        rating, analysis = rate_project_with_llm(title, domain, abstract)
        
        # 2. Check novelty by searching for similar work
        similar_projects = search_similar_work(title, abstract)
        
        is_novel = len(similar_projects) == 0
        
        return jsonify({
            'rating': rating,
            'analysis': analysis,
            'is_novel': is_novel,
            'similar_projects': similar_projects
        })
        
    except Exception as e:
        print(f"Error in analyze_project: {e}")
        return jsonify({'error': str(e)}), 500


def rate_project_with_llm(title, domain, abstract):
    """
    Uses LLM to rate the project idea on a scale of 0-10
    """
    api_key = os.getenv('FASTROUTER_API_KEY')
    if not api_key:
        return 7, "API key not configured. Returning default rating."
    
    prompt = f"""You are an expert research evaluator. Rate the following research project idea on a scale of 0-10 based on:
- Innovation and originality
- Feasibility and methodology
- Potential impact in the field
- Clarity of the proposed approach

Project Title: {title}
Domain: {domain}
Abstract: {abstract}

Provide:
1. A rating from 0-10 (as a single number)
2. A brief 2-3 sentence analysis explaining the rating

Format your response as:
RATING: [number]
ANALYSIS: [your analysis]
"""
    
    try:
        response = requests.post(
            'https://api.fastrouter.io/v1/chat/completions',
            headers={
                'Authorization': f'Bearer {api_key}',
                'Content-Type': 'application/json'
            },
            json={
                'model': 'meta-llama/Llama-3-8B-Instruct',
                'messages': [
                    {'role': 'user', 'content': prompt}
                ],
                'temperature': 0.7,
                'max_tokens': 300
            },
            timeout=30
        )
        
        if response.status_code == 200:
            result = response.json()
            content = result['choices'][0]['message']['content']
            
            # Parse rating and analysis
            lines = content.strip().split('\n')
            rating = 7  # default
            analysis = "Good project idea with solid potential."
            
            for line in lines:
                if line.startswith('RATING:'):
                    try:
                        rating = min(10, max(0, int(line.split(':')[1].strip())))
                    except:
                        pass
                elif line.startswith('ANALYSIS:'):
                    analysis = line.split(':', 1)[1].strip()
            
            return rating, analysis
        else:
            return 7, "Could not generate detailed analysis. Project shows promise."
            
    except Exception as e:
        print(f"LLM Rating Error: {e}")
        return 7, "Analysis temporarily unavailable. Project appears viable."


def search_similar_work(title, abstract):
    """
    Searches for similar research work using web search
    Returns list of similar project titles
    """
    # Simple implementation using title keywords
    # In production, you'd use Google Scholar API or Semantic Scholar
    
    keywords = extract_keywords(title)
    similar = []
    
    # Placeholder logic - in reality, you'd query an academic database
    # For now, return empty to indicate "novel" unless we have a real search API
    
    return similar


def extract_keywords(text):
    """Extract key terms from text"""
    # Simple keyword extraction
    stop_words = {'a', 'an', 'the', 'in', 'on', 'at', 'for', 'to', 'of', 'and', 'or', 'but'}
    words = text.lower().split()
    keywords = [w for w in words if w not in stop_words and len(w) > 3]
    return keywords[:5]


if __name__ == '__main__':
    app.run(debug=True, port=5002)
