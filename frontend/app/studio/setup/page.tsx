'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePaperStore } from '@/lib/store/paperStore';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Check, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/layout/ProtectedRoute';

// Import phase components
import Phase1CoreIdentity from '@/components/studio/phases/Phase1CoreIdentity';
import Phase2Motivation from '@/components/studio/phases/Phase2Motivation';
import Phase3Context from '@/components/studio/phases/Phase3Context';
import Phase4Literature from '@/components/studio/phases/Phase4Literature';
import Phase5Methodology from '@/components/studio/phases/Phase5Methodology';
import Phase6Results from '@/components/studio/phases/Phase6Results';
import Phase7Conclusion from '@/components/studio/phases/Phase7Conclusion';
import Phase8Optional from '@/components/studio/phases/Phase8Optional';

const phases = [
    { component: Phase1CoreIdentity, title: 'Core Identity' },
    { component: Phase2Motivation, title: 'Motivation' },
    { component: Phase3Context, title: 'Context' },
    { component: Phase4Literature, title: 'Literature' },
    { component: Phase5Methodology, title: 'Methodology' },
    { component: Phase6Results, title: 'Results' },
    { component: Phase7Conclusion, title: 'Conclusion' },
    { component: Phase8Optional, title: 'Optional Details' },
];

export default function QuestionnaireSetup() {
    const router = useRouter();
    const { currentStep, nextStep, previousStep } = usePaperStore();
    const [direction, setDirection] = useState(1);

    const CurrentPhaseComponent = phases[currentStep].component;
    const progress = ((currentStep + 1) / phases.length) * 100;

    const handleNext = () => {
        setDirection(1);
        if (currentStep === phases.length - 1) {
            router.push('/studio/workspace');
        } else {
            nextStep();
        }
    };

    const handlePrevious = () => {
        setDirection(-1);
        previousStep();
    };

    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-void text-starlight selection:bg-nebula-500/30 overflow-hidden relative">
                {/* Ambient Background */}
                <div className="fixed inset-0 z-0 pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-nebula-500/5 rounded-full blur-[120px] animate-orb-float" />
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:40px_40px] opacity-10" />
                </div>

                {/* Progress Bar */}
                <div className="fixed top-0 left-0 right-0 h-1 bg-white/5 z-50">
                    <motion.div
                        className="h-full bg-nebula-gradient shadow-[0_0_15px_rgba(99,102,241,0.5)]"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.5, ease: "circOut" }}
                    />
                </div>

                {/* Header */}
                <header className="border-b border-white/5 bg-black/20 backdrop-blur-md sticky top-1 z-40">
                    <div className="max-w-4xl mx-auto px-6 py-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-xs font-medium text-nebula-400 uppercase tracking-wider mb-1">
                                    Phase {currentStep + 1} / {phases.length}
                                </h2>
                                <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                                    {phases[currentStep].title}
                                </h1>
                            </div>
                            <div className="hidden sm:flex items-center gap-2 text-xs text-dust/50 border border-white/5 px-3 py-1 rounded-full">
                                <Sparkles className="w-3 h-3 text-yellow-500" />
                                <span>Auto-saving to Neural Cloud</span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="relative z-10 max-w-4xl mx-auto px-6 py-12">
                    <AnimatePresence mode="wait" custom={direction}>
                        <motion.div
                            key={currentStep}
                            custom={direction}
                            initial={{ opacity: 0, x: direction * 50, filter: "blur(10px)" }}
                            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                            exit={{ opacity: 0, x: direction * -50, filter: "blur(10px)" }}
                            transition={{ duration: 0.4, ease: "circOut" }}
                            className="min-h-[400px]"
                        >
                            <CurrentPhaseComponent />
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation */}
                    <div className="flex items-center justify-between mt-12 pt-8 border-t border-white/5">
                        <Button
                            variant="ghost"
                            onClick={handlePrevious}
                            disabled={currentStep === 0}
                            className="text-dust hover:text-white hover:bg-white/5"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Previous Phase
                        </Button>

                        <Button onClick={handleNext} variant={currentStep === phases.length - 1 ? "primary" : "outline"} className="px-8">
                            {currentStep === phases.length - 1 ? (
                                <>
                                    <Check className="w-4 h-4 mr-2" />
                                    Initialize Generation
                                </>
                            ) : (
                                <>
                                    Next Step
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </>
                            )}
                        </Button>
                    </div>
                </main>
            </div>
        </ProtectedRoute>
    );
}
