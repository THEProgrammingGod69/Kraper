import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { QuestionnaireInputs, GeneratedPaper, FormattingMode } from '@/lib/types';

interface PaperStore {
    // Questionnaire State
    inputs: Partial<QuestionnaireInputs>;
    currentStep: number;
    totalSteps: number;

    // Generated Content
    generatedSections: Partial<GeneratedPaper>;
    formattingMode: FormattingMode;

    // UI State
    isGenerating: boolean;
    error: string | null;

    // Actions
    updateInput: (field: keyof QuestionnaireInputs, value: any) => void;
    updateInputs: (inputs: Partial<QuestionnaireInputs>) => void;
    setCurrentStep: (step: number) => void;
    nextStep: () => void;
    previousStep: () => void;
    setGeneratedSections: (sections: Partial<GeneratedPaper>) => void;
    setFormattingMode: (mode: FormattingMode) => void;
    setIsGenerating: (isGenerating: boolean) => void;
    setError: (error: string | null) => void;
    reset: () => void;
}

const initialState = {
    inputs: {
        // Author Info
        authors: [
            { name: '', email: '', department: '', institution: '' }
        ],

        domain: '',
        research_topic: '',
    },
    currentStep: 0,
    totalSteps: 8, // 8 phases in the questionnaire
    generatedSections: {},
    formattingMode: 'IEEE' as FormattingMode,
    isGenerating: false,
    error: null,
};

export const usePaperStore = create<PaperStore>()(
    persist(
        (set, get) => ({
            ...initialState,

            updateInput: (field, value) =>
                set((state) => ({
                    inputs: { ...state.inputs, [field]: value },
                })),

            updateInputs: (inputs) =>
                set((state) => ({
                    inputs: { ...state.inputs, ...inputs },
                })),

            setCurrentStep: (step) => set({ currentStep: step }),

            nextStep: () =>
                set((state) => ({
                    currentStep: Math.min(state.currentStep + 1, state.totalSteps - 1),
                })),

            previousStep: () =>
                set((state) => ({
                    currentStep: Math.max(state.currentStep - 1, 0),
                })),

            setGeneratedSections: (sections) =>
                set({ generatedSections: sections }),

            setFormattingMode: (mode) => set({ formattingMode: mode }),

            setIsGenerating: (isGenerating) => set({ isGenerating }),

            setError: (error) => set({ error }),

            reset: () => set(initialState),
        }),
        {
            name: 'kraper-paper-storage',
            partialize: (state) => ({
                inputs: state.inputs,
                currentStep: state.currentStep,
                formattingMode: state.formattingMode,
            }),
        }
    )
);
