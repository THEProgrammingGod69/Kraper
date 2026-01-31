"""
IEEE-Style Academic Prompt Templates (Expanded for Full Paper)

Enforces strict academic standards:
- IEEE citation style
- Third-person narrative
- Formal technical language
- No casual expressions
- Specific section requirements (e.g., Image Placeholders)
"""

# Base System Prompt
SYSTEM_PROMPT = """You are an expert academic research paper writer specializing in IEEE-style technical writing.

STRICT GUIDELINES:
1. Write in THIRD PERSON ONLY (never use "I", "we", "our")
2. Use FORMAL ACADEMIC LANGUAGE (no casual expressions)
3. Follow IEEE citation style conventions ([1], [2])
4. Use PASSIVE VOICE where appropriate
5. Be CONCISE and TECHNICAL
6. NEVER fabricate experimental results - use the provided data
7. If specific details are missing, generalize appropriately without hallucinating metrics

TONE: Objective, precise, scholarly
STYLE: IEEE Conference/Journal standard
"""

def get_section_prompt(section_name):
    """
    Returns section-specific writing guidelines
    """
    prompts = {
        "Title and Author": """
TASK: Generate a professional, academic title for this research paper.
- The title should be concise but descriptive.
- Avoid "A Study of..." or "Research on..."
- Format: plain text title only.
- Also append a placeholder author line: "By [Author Name]"
""",

        "Abstract": """
TASK: Write a structured abstract.
- Background (1 sentence): Context
- Problem (1 sentence): Challenge addressed
- Methodology (2-3 sentences): Your approach
- Results (1-2 sentences): Key findings
- Conclusion (1 sentence): Impact
Max 250 words.
""",

        "Introduction": """
TASK: Write the Introduction section.
1. Broad Context: Introduce the general area
2. Problem Statement: Specific gap/issue
3. Motivation: Why this matters
4. Contributions: List the key contributions clearly
5. Paper Structure: Brief roadmap
""",

        "Literature Review": """
TASK: Write the Literature Review.
- Synthesize the provided 'Related Approaches'.
- Group similar methods together.
- Discuss their strengths and weaknesses ('Prior Limitations').
- Focus on concepts, not just listing papers.
- Use widely recognized citation placeholders like [1], [2].
""",

        "Related Work": """
TASK: Write the Related Work section (distinct from Lit Review if needed, or focused on direct competitors).
- Compare your approach strictly against the 'Comparison Baselines' provided.
- Highlight why your method is different/better.
""",

        "Problem Formulation": """
TASK: Write the Problem Formulation section.
- Define the problem formally and mathematically if possible.
- Define inputs, outputs, and constraints.
- State the objective function or goal clearly.
- Use Formal Definition provided if available.
""",

        "Methodology": """
TASK: Write the Methodology section.
- Overview: High-level approach
- Workflow: Step-by-step process ('System Workflow')
- Algorithms: Specific techniques used ('Algorithms')
- Explain rationale for choices.
""",

        "System Architecture": """
TASK: Write the System Architecture section.
- Describe the system components and how they interact.
- **CRITICAL REQUIREMENT**: You MUST suggest image placeholders where a diagram would be helpful.
- Format for images: `**[IMAGE SUGGESTION: <Description of the diagram>]**`
- Explain the data flow clearly.
""",

        "Results and Discussion": """
TASK: Write the Results and Discussion section.
- Setup: Dataset and Tools used
- Quantitative Analysis: Present the 'Quantitative Results'
- Interpretation: Explain what the results mean ('Result Interpretation')
- Comparison: Analyze performance vs baselines ('Comparison Analysis')
- Use "Table I", "Figure 2" references in text.
""",

        "Limitations and Future Scope": """
TASK: Write the Critical Analysis / Conclusion.
- Honest discussion of 'Current Limitations'.
- Concrete 'Future Work' directions.
""",

        "Experimental Setup": """
TASK: Write the Experimental Setup section.
- Dataset Details: Describe the dataset used.
- Train-Test Split: How data was divided.
- Baselines: List models used for comparison.
- Evaluation Metrics: Accuracy, F1, RMSE, etc.
- Hardware & Tools: GPU/TPU, libraries (PyTorch, TensorFlow).
""",

        "Conclusion": """
TASK: Write the Conclusion section.
- Summary: Recap the work done.
- Key Results: Highlight best performance metrics.
- Practical Impact: Real-world significance.
- Closing Statement: Final thought.
""",


        "Keywords": """
TASK: Generate 5-7 IEEE-style Keywords or Index Terms.
- Format: Comma-separated list.
- Example: Deep Learning, Time Series Analysis, Supply Chain, Decision Support Systems.
""",

        "References": """
TASK: Generate a robust placeholder Reference list.
- Generate 5-10 realistic-looking citation placeholders based on the provided research context/domain.
- Format: IEEE Style (e.g., [1] J. Doe, "Title," Journal, Year.)
- These do not need to be real papers, but should look academically correct for the domain.
"""
    }
    
    return prompts.get(section_name, "Write this section following IEEE standards.")


def build_generation_prompt(questionnaire, retrieved_context, section):
    """
    Constructs the prompt for a specific section
    """
    section_guidelines = get_section_prompt(section)
    
    prompt = f"""You are writing the **{section}** section of a research paper.

---
RESEARCH DATE FROM USER:
Domain: {questionnaire.get('domain')}
Topic: {questionnaire.get('research_topic')}
Type: {questionnaire.get('research_type')}
Status: {questionnaire.get('completion_status')}

MOTIVATION:
Importance: {questionnaire.get('problem_importance')}
Contribution: {questionnaire.get('key_contribution')}

PROBLEM:
Gap: {questionnaire.get('specific_problem')}
Objectives: {questionnaire.get('objectives')}

METHODOLOGY:
Approach: {questionnaire.get('approach_overview')}
Workflow: {questionnaire.get('system_workflow')}
Algorithms: {questionnaire.get('algorithms')}
Data: {questionnaire.get('dataset_details')}
Tools: {questionnaire.get('tools_used')}

RESULTS:
Key Results: {questionnaire.get('key_results')}
Metrics: {questionnaire.get('quantitative_results')}
Interpretation: {questionnaire.get('result_interpretation')}

COMPARISON:
Related Work: {questionnaire.get('related_approaches')}
Baselines: {questionnaire.get('comparison_baselines')}

LIMITATIONS:
Limitations: {questionnaire.get('current_limitations')}
Future: {questionnaire.get('future_work')}

EXTRAS:
Architecture: {questionnaire.get('architecture_details', 'N/A')}
Formal Def: {questionnaire.get('formal_problem_def', 'N/A')}
---

RETRIEVED CONTEXT (Use for background/style/theory):
{retrieved_context}

---

SECTION GUIDELINES:
{section_guidelines}

WRITING INSTRUCTIONS:
- Write ONLY the content for the {section} section.
- Do not repeat the section title as a header.
- Maintain flow and academic tone.
- If writing "System Architecture", remember the layout requirements.
"""
    return prompt
