'use client';

import { motion } from 'framer-motion';
import { Info, Zap, Shield, Sparkles, Users, BookOpen } from 'lucide-react';
import Background from '@/components/ui/Background';
import { fadeInUp, staggerContainer, slideInLeft, slideInRight } from '@/components/ui/animations';

export default function AboutPage() {
    const features = [
        {
            icon: Zap,
            title: 'Lightning Fast Generation',
            description: 'Generate comprehensive research papers in under 2 minutes with our advanced AI pipeline.'
        },
        {
            icon: Shield,
            title: 'IEEE Compliance',
            description: 'Automatically formatted to strict IEEE conference standards with proper citations and references.'
        },
        {
            icon: BookOpen,
            title: 'Conference Discovery',
            description: 'Find the perfect conferences for your research across multiple domains and deadlines.'
        },
        {
            icon: Users,
            title: 'Citation Management',
            description: 'Intelligent bibliography generation with support for multiple citation styles.'
        }
    ];

    const techStack = [
        { name: 'Next.js', color: '#000000' },
        { name: 'Python', color: '#3776AB' },
        { name: 'LLaMA-3', color: '#8176AF' },
        { name: 'FastRouter', color: '#C0B7E8' },
        { name: 'Supabase', color: '#3ECF8E' },
    ];

    return (
        <div className="min-h-screen relative overflow-hidden">
            <Background />

            <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 space-y-32">
                {/* Hero Section */}
                <motion.div
                    initial="initial"
                    animate="animate"
                    variants={staggerContainer}
                    className="text-center"
                >
                    <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel mb-6 border border-hydra-purple/20">
                        <Info className="w-4 h-4 text-hydra-lavender" />
                        <span className="text-sm text-gray-300">About Kraper</span>
                    </motion.div>

                    <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-bold mb-6">
                        <span className="text-white">Revolutionizing</span>
                        <br />
                        <span className="text-hydra-lavender">Academic Writing</span>
                    </motion.h1>

                    <motion.p variants={fadeInUp} className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                        Kraper leverages cutting-edge AI to transform the research paper writing process, helping academics focus on breakthrough ideas rather than formatting and structure.
                    </motion.p>
                </motion.div>

                {/* Mission Statement */}
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        variants={slideInLeft}
                    >
                        <h2 className="text-4xl font-bold mb-6">
                            <span className="text-white">Our Mission</span>
                        </h2>
                        <div className="space-y-4 text-gray-300 leading-relaxed">
                            <p>
                                We believe that groundbreaking research should be accessible to everyone, not just those with extensive academic writing experience.
                            </p>
                            <p>
                                Kraper democratizes research paper creation by automating the tedious parts while maintaining the highest standards of academic integrity and IEEE compliance.
                            </p>
                            <p>
                                Built by students, for students. Our mission is to accelerate academic innovation worldwide.
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        variants={slideInRight}
                        className="glass-panel rounded-[40px] p-8 border border-hydra-lavender/10 bg-hydra-radial"
                    >
                        <div className="space-y-4 font-mono text-sm">
                            <div className="text-hydra-lavender">
                                <span className="text-gray-500">$</span> git log --authors
                            </div>
                            <div className="pl-4 space-y-2">
                                <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                                    <span className="text-white font-bold">Arnav Sirse</span>
                                    <span className="text-gray-500">// Lead Developer</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
                                    <span className="text-white font-bold">Arya Ambekar</span>
                                    <span className="text-gray-500">// Core Developer</span>
                                </div>
                            </div>
                            <div className="text-gray-500 pt-4 border-t border-hydra-lavender/20">
                                <span className="text-hydra-purple">→</span> Built with ❤️ and ☕ in 2026
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Features Grid */}
                <div>
                    <motion.div
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="text-center mb-12"
                    >
                        <motion.h2 variants={fadeInUp} className="text-4xl font-bold mb-4">
                            <span className="text-white">Powerful Features</span>
                        </motion.h2>
                        <motion.p variants={fadeInUp} className="text-gray-400 max-w-2xl mx-auto">
                            Everything you need to create publication-ready research papers
                        </motion.p>
                    </motion.div>

                    <motion.div
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="grid md:grid-cols-2 gap-6"
                    >
                        {features.map((feature, idx) => {
                            const Icon = feature.icon;
                            return (
                                <motion.div
                                    key={idx}
                                    variants={fadeInUp}
                                    className="glass-panel rounded-[40px] p-6 border border-hydra-lavender/10 bg-hydra-radial hover:border-hydra-lavender/30 transition-all group"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-hydra-purple/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                        <Icon className="w-6 h-6 text-hydra-lavender" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                                    <p className="text-gray-400 text-sm">{feature.description}</p>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>

                {/* Technology Stack */}
                <div>
                    <motion.div
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="text-center mb-12"
                    >
                        <motion.h2 variants={fadeInUp} className="text-4xl font-bold mb-4">
                            <span className="text-white">Built With</span>
                            <br />
                            <span className="text-hydra-lavender">Cutting-Edge Technology</span>
                        </motion.h2>
                    </motion.div>

                    <motion.div
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="flex flex-wrap items-center justify-center gap-8"
                    >
                        {techStack.map((tech, idx) => (
                            <motion.div
                                key={idx}
                                variants={fadeInUp}
                                className="px-8 py-4 rounded-full glass-panel border border-hydra-lavender/10 hover:border-hydra-lavender/30 transition-all"
                            >
                                <span className="font-bold text-lg" style={{ color: tech.color }}>{tech.name}</span>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
