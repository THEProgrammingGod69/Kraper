'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Sparkles, TrendingUp, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Background from '@/components/ui/Background';
import { fadeInUp, staggerContainer } from '@/components/ui/animations';
import axios from 'axios';

export default function RecommendationsPage() {
    const [formData, setFormData] = useState({
        title: '',
        domain: '',
        abstract: ''
    });
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState<any>(null);

    const domains = [
        'Artificial Intelligence',
        'Machine Learning',
        'Blockchain',
        'Healthcare',
        'Cybersecurity',
        'IoT',
        'Cloud Computing',
        'Data Science',
        'Robotics',
        'Quantum Computing'
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post('http://localhost:5002/api/recommendations/analyze', formData, {
                timeout: 60000
            });
            setResults(response.data);
        } catch (error) {
            console.error('Error analyzing project:', error);
            alert('Failed to analyze project. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen relative overflow-hidden">
            <Background />

            <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">
                {/* Header */}
                <motion.div
                    initial="initial"
                    animate="animate"
                    variants={staggerContainer}
                    className="text-center mb-16"
                >
                    <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel mb-6 border border-hydra-purple/20">
                        <Lightbulb className="w-4 h-4 text-hydra-lavender" />
                        <span className="text-sm text-gray-300">AI-Powered Project Evaluator</span>
                    </motion.div>

                    <motion.h1 variants={fadeInUp} className="text-5xl md:text-6xl font-bold mb-4">
                        <span className="text-white">Validate Your</span>
                        <br />
                        <span className="text-hydra-lavender">Research Idea</span>
                    </motion.h1>

                    <motion.p variants={fadeInUp} className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Get instant AI-powered feedback on your project idea's originality and potential impact.
                    </motion.p>
                </motion.div>

                {/* Under Construction Banner */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                    className="mb-12 max-w-3xl mx-auto"
                >
                    <div className="relative overflow-hidden rounded-[40px] border-2 border-yellow-400/30 bg-gradient-to-r from-yellow-400/5 via-hydra-purple/5 to-yellow-400/5 p-6 backdrop-blur-sm">
                        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,193,7,0.1)_50%,transparent_75%)] bg-[length:20px_20px] animate-pulse"></div>
                        <div className="relative flex items-center justify-center gap-4">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-yellow-400 animate-pulse"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-400 animate-pulse [animation-delay:0.2s]"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-400 animate-pulse [animation-delay:0.4s]"></div>
                            </div>
                            <span className="text-lg font-bold text-yellow-400 font-mono uppercase tracking-wider">
                                🚧 Feature Under Active Development 🚧
                            </span>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-yellow-400 animate-pulse"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-400 animate-pulse [animation-delay:0.2s]"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-400 animate-pulse [animation-delay:0.4s]"></div>
                            </div>
                        </div>
                        <p className="text-center text-sm text-gray-400 mt-2 font-mono">
                            AI evaluation system coming soon • Stay tuned for updates
                        </p>
                    </div>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Input Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="glass-panel rounded-[40px] p-8 border border-hydra-lavender/10"
                    >
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                            <Sparkles className="w-6 h-6 text-hydra-purple" />
                            Project Details
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Title */}
                            <div>
                                <label className="block text-sm font-bold text-gray-300 mb-2 uppercase tracking-wide">
                                    Project Title
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl bg-hydra-dark border border-hydra-lavender/20 text-white placeholder-gray-500 focus:outline-none focus:border-hydra-purple transition-all"
                                    placeholder="e.g., AI-Powered Medical Diagnosis System"
                                />
                            </div>

                            {/* Domain */}
                            <div>
                                <label className="block text-sm font-bold text-gray-300 mb-2 uppercase tracking-wide">
                                    Research Domain
                                </label>
                                <select
                                    required
                                    value={formData.domain}
                                    onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl bg-hydra-dark border border-hydra-lavender/20 text-white focus:outline-none focus:border-hydra-purple transition-all"
                                >
                                    <option value="">Select a domain</option>
                                    {domains.map((domain) => (
                                        <option key={domain} value={domain}>{domain}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Abstract */}
                            <div>
                                <label className="block text-sm font-bold text-gray-300 mb-2 uppercase tracking-wide">
                                    Abstract
                                </label>
                                <textarea
                                    required
                                    value={formData.abstract}
                                    onChange={(e) => setFormData({ ...formData, abstract: e.target.value })}
                                    maxLength={500}
                                    rows={6}
                                    className="w-full px-4 py-3 rounded-xl bg-hydra-dark border border-hydra-lavender/20 text-white placeholder-gray-500 focus:outline-none focus:border-hydra-purple transition-all resize-none"
                                    placeholder="Briefly describe your project idea, methodology, and expected outcomes..."
                                />
                                <p className="text-xs text-gray-500 mt-2">{formData.abstract.length}/500 characters</p>
                            </div>

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full h-14 rounded-full btn-hydra text-sm uppercase tracking-wide font-bold text-black/80 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                        Analyzing...
                                    </>
                                ) : (
                                    <>
                                        <TrendingUp className="w-5 h-5 mr-2" />
                                        Analyze Project
                                    </>
                                )}
                            </Button>
                        </form>
                    </motion.div>

                    {/* Results Display */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                        className="glass-panel rounded-[40px] p-8 border border-hydra-lavender/10"
                    >
                        {!results ? (
                            <div className="h-full flex flex-col items-center justify-center text-center">
                                <div className="w-24 h-24 rounded-full bg-hydra-purple/20 flex items-center justify-center mb-4">
                                    <Lightbulb className="w-12 h-12 text-hydra-lavender" />
                                </div>
                                <h3 className="text-xl font-bold mb-2">Awaiting Analysis</h3>
                                <p className="text-gray-400">Fill in the form to get your project evaluated</p>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                <h2 className="text-2xl font-bold">Analysis Results</h2>

                                {/* Rating Score */}
                                <div className="bg-hydra-radial rounded-2xl p-6 border border-hydra-lavender/20">
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-sm font-bold text-gray-300 uppercase">Project Rating</span>
                                        <TrendingUp className="w-5 h-5 text-hydra-lavender" />
                                    </div>
                                    <div className="text-5xl font-black text-hydra-lavender">
                                        {results.rating}<span className="text-2xl text-gray-500">/10</span>
                                    </div>
                                </div>

                                {/* Novelty Status */}
                                <div className="bg-hydra-radial rounded-2xl p-6 border border-hydra-lavender/20">
                                    <div className="flex items-center gap-3 mb-3">
                                        {results.is_novel ? (
                                            <CheckCircle className="w-6 h-6 text-green-400" />
                                        ) : (
                                            <AlertCircle className="w-6 h-6 text-yellow-400" />
                                        )}
                                        <span className="text-lg font-bold">
                                            {results.is_novel ? 'Highly Original' : 'Similar Work Exists'}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-400">
                                        {results.is_novel
                                            ? 'No similar projects found. Your idea appears to be novel!'
                                            : `Found ${results.similar_projects?.length || 0} similar projects in existing literature.`}
                                    </p>
                                </div>

                                {/* Analysis */}
                                {results.analysis && (
                                    <div className="bg-hydra-radial rounded-2xl p-6 border border-hydra-lavender/20">
                                        <h3 className="text-sm font-bold text-gray-300 uppercase mb-3">AI Analysis</h3>
                                        <p className="text-gray-300 leading-relaxed">{results.analysis}</p>
                                    </div>
                                )}

                                {/* Similar Projects */}
                                {results.similar_projects && results.similar_projects.length > 0 && (
                                    <div className="bg-hydra-radial rounded-2xl p-6 border border-hydra-lavender/20">
                                        <h3 className="text-sm font-bold text-gray-300 uppercase mb-3">Similar Projects</h3>
                                        <div className="space-y-2">
                                            {results.similar_projects.slice(0, 3).map((project: string, idx: number) => (
                                                <div key={idx} className="text-sm text-gray-400 flex items-start gap-2">
                                                    <span className="text-hydra-purple">•</span>
                                                    <span>{project}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
