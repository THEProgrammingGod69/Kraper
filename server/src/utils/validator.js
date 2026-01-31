/**
 * Request Validation Schemas
 * 
 * Defines strict validation rules for the 29-question input format.
 * Maps Q1-Q29 to structured JSON fields.
 */

const Joi = require('joi');

/**
 * Full Research Paper Questionnaire Schema
 */
const questionnaireSchema = Joi.object({
    // --- PART A: CORE INFO ---
    domain: Joi.string().required().description('Q1: Research Domain'),
    research_topic: Joi.string().required().description('Q2: Research Topic/Problem'),
    research_type: Joi.string().valid(
        'Experimental/Empirical',
        'Design/Implementation',
        'Theoretical/Conceptual',
        'Simulation-based',
        'Hypothetical/Proposed',
        'Survey/Review'
    ).required().description('Q3: Research Type'),
    completion_status: Joi.string().valid(
        'Completed',
        'Hypothetical',
        'Partially complete'
    ).required().description('Q4: Work Status'),

    // --- PART B: ABSTRACT & MOTIVATION ---
    problem_importance: Joi.string().required().description('Q5: Why is this important?'),
    key_contribution: Joi.string().required().description('Q6: Main contribution'),
    key_results: Joi.string().required().description('Q7: Main findings/outcomes'),

    // --- PART C: BACKGROUND & PROBLEM ---
    background_info: Joi.string().required().description('Q8: General background'),
    specific_problem: Joi.string().required().description('Q9: Specific gap/problem'),
    objectives: Joi.string().required().description('Q10: Specific goals'),

    // --- PART D: RELATED WORK ---
    related_approaches: Joi.string().required().description('Q11: Existing methods'),
    prior_limitations: Joi.string().required().description('Q12: Weaknesses in prior work'),
    comparison_baselines: Joi.string().required().description('Q13: Baselines for comparison'),

    // --- PART E: METHODOLOGY ---
    approach_overview: Joi.string().required().description('Q14: Overall method description'),
    system_workflow: Joi.string().required().description('Q15: System steps/architecture'),
    algorithms: Joi.string().required().description('Q16: Specific algorithms/techniques'),
    dataset_details: Joi.string().required().description('Q17: Data source/size'),
    tools_used: Joi.string().required().description('Q18: Implementation tools'),
    validation_method: Joi.string().required().description('Q19: Testing/Proof method'),

    // --- PART F: RESULTS & DISCUSSION ---
    quantitative_results: Joi.string().required().description('Q20: Numerical results'),
    result_interpretation: Joi.string().required().description('Q21: Meaning of results'),
    comparison_analysis: Joi.string().required().description('Q22: Comparison with others'),

    // --- PART G: LIMITATIONS & FUTURE WORK ---
    current_limitations: Joi.string().required().description('Q23: Known limitations'),
    future_work: Joi.string().required().description('Q24: Next steps'),

    // --- PART H: CONCLUSION ---
    conclusion_summary: Joi.string().required().description('Q25: Key takeaways'),

    // --- OPTIONAL EXTRAS ---
    formal_problem_def: Joi.string().optional().allow('', null).description('Q26: Formal definition'),
    architecture_details: Joi.string().optional().allow('', null).description('Q27: Specific architecture details'),
    ethical_considerations: Joi.string().optional().allow('', null).description('Q28: Ethics/Bias'),
    special_requirements: Joi.string().optional().allow('', null).description('Q29: Other needs'),

    // Config
    max_tokens: Joi.number().optional().default(1000)
});

/**
 * Validates the questionnaire payload
 */
function validateQuestionnaire(data) {
    return questionnaireSchema.validate(data, {
        abortEarly: false,
        stripUnknown: true
    });
}

module.exports = {
    validateQuestionnaire
};
