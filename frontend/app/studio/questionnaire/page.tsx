'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export default function QuestionnairePage() {
    const router = useRouter();

    return (
        <div className="min-h-screen pt-24 px-6 max-w-4xl mx-auto">
            <Button variant="ghost" className="mb-6 text-gray-400 hover:text-white" onClick={() => router.back()}>
                <ArrowLeft className="w-4 h-4 mr-2" /> Back
            </Button>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div className="bg-gradient-to-br from-nebula-900/50 to-black border border-white/10 rounded-2xl p-8 backdrop-blur-xl">
                    <div className="text-center mb-10">
                        <h1 className="text-3xl font-bold text-white mb-2">Project Details</h1>
                        <p className="text-gray-400">Tell us about your research to generate a comprehensive paper.</p>
                    </div>

                    {/* Placeholder for the actual multi-step form */}
                    <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed border-white/10 rounded-xl bg-white/5">
                        <p className="text-gray-300 mb-4">Questionnaire Form Wizard Loading...</p>
                        <Button onClick={() => router.push('/studio/workspace')} className="bg-nebula-500 hover:bg-nebula-600">
                            Skip to Workspace (Demo)
                        </Button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
