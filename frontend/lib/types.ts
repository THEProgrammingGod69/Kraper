// Research Paper Types
export interface QuestionnaireInputs {
    // --- Author Info (New) ---
    authors: Array<{
        name: string;
        email: string;
        department: string;
        institution: string;
    }>;

    // --- Core Identity ---
    domain?: string;
    research_topic?: string;
    research_type: 'Experimental/Empirical' | 'Design/Implementation' | 'Theoretical/Conceptual' | 'Simulation-based' | 'Hypothetical/Proposed' | 'Survey/Review';
    completion_status: 'Completed' | 'Hypothetical' | 'Partially complete';

    // Part B: Motivation
    problem_importance: string;
    key_contribution: string;
    key_results: string;

    // Part C: Background & Problem
    background_info: string;
    specific_problem: string;
    objectives: string;

    // Part D: Related Work
    related_approaches: string;
    prior_limitations: string;
    comparison_baselines: string;

    // Part E: Methodology
    approach_overview: string;
    system_workflow: string;
    algorithms: string;
    dataset_details: string;
    tools_used: string;
    validation_method: string;

    // Part F: Results
    quantitative_results: string;
    result_interpretation: string;
    comparison_analysis: string;

    // Part G: Conclusion
    current_limitations: string;
    future_work: string;
    conclusion_summary: string;

    // Part H: Optional
    formal_problem_def?: string;
    architecture_details?: string;
    ethical_considerations?: string;
    special_requirements?: string;
}

export interface GeneratedPaper {
    'Title and Author': string;
    'Abstract': string;
    'Introduction': string;
    'Literature Review': string;
    'Related Work': string;
    'Problem Formulation': string;
    'Methodology': string;
    'System Architecture': string;
    'Results and Discussion': string;
    'Limitations and Future Scope': string;
    'References': string;
}

export interface PaperMetadata {
    processing_time_ms: number;
    model_used: string;
    timestamp: string;
}

export interface GenerationResponse {
    success: boolean;
    data: {
        generated_text: GeneratedPaper;
        metadata: PaperMetadata;
    };
}

export type FormattingMode = 'IEEE' | 'Springer';

export interface PaperState {
    inputs: Partial<QuestionnaireInputs>;
    generatedSections: Partial<GeneratedPaper>;
    formattingMode: FormattingMode;
    isGenerating: boolean;
    currentPhase: number;
    totalPhases: number;
    error: string | null;
}
