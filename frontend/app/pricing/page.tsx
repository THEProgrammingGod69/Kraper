'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { DollarSign } from 'lucide-react';
import Background from '@/components/ui/Background';
import PricingCard from '@/components/pricing/PricingCard';
import { fadeInUp, staggerContainer } from '@/components/ui/animations';

export default function PricingPage() {
    const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');

    const plans = [
        {
            tier: 'Student',
            price: 6,
            features: [
                '10 papers per month',
                'IEEE formatting',
                'Basic citations',
                'Community support',
                'Export to PDF',
                'Student verification required'
            ],
            cta: 'Start 7-Day Trial'
        },
        {
            tier: 'Pro',
            price: 10,
            features: [
                'Unlimited papers',
                'Advanced AI generation',
                'IEEE & custom formats',
                'Priority support',
                'LaTeX export',
                'Conference recommendations',
                'Plagiarism checker',
                'Team collaboration (3 seats)',
                'API access'
            ],
            cta: 'Start 7-Day Trial',
            highlighted: true
        }
    ];

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
                        <DollarSign className="w-4 h-4 text-hydra-lavender" />
                        <span className="text-sm text-gray-300">Simple, Transparent Pricing</span>
                    </motion.div>

                    <motion.h1 variants={fadeInUp} className="text-5xl md:text-6xl font-bold mb-4">
                        <span className="text-white">Choose Your</span>
                        <br />
                        <span className="text-hydra-lavender">Perfect Plan</span>
                    </motion.h1>

                    <motion.p variants={fadeInUp} className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
                        Affordable plans for students and researchers.
                    </motion.p>

                    {/* Billing Toggle */}
                    <motion.div variants={fadeInUp} className="inline-flex items-center gap-4 bg-hydra-dark/50 backdrop-blur-sm rounded-full p-1 border border-hydra-lavender/10">
                        <button
                            onClick={() => setBillingPeriod('monthly')}
                            className={`
                px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wide transition-all
                ${billingPeriod === 'monthly'
                                    ? 'bg-hydra-purple text-white'
                                    : 'text-gray-400 hover:text-white'
                                }
              `}
                        >
                            Monthly
                        </button>
                        <button
                            onClick={() => setBillingPeriod('yearly')}
                            className={`
                px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wide transition-all
                ${billingPeriod === 'yearly'
                                    ? 'bg-hydra-purple text-white'
                                    : 'text-gray-400 hover:text-white'
                                }
              `}
                        >
                            Yearly
                            <span className="ml-2 text-xs text-green-400">Save 20%</span>
                        </button>
                    </motion.div>
                </motion.div>

                {/* Pricing Cards */}
                <motion.div
                    initial="initial"
                    animate="animate"
                    variants={staggerContainer}
                    className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
                >
                    {plans.map((plan, idx) => (
                        <motion.div key={plan.tier} variants={fadeInUp}>
                            <PricingCard
                                {...plan}
                                period={billingPeriod}
                            />
                        </motion.div>
                    ))}
                </motion.div>

                {/* FAQ or Additional Info */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="mt-20 text-center"
                >
                    <p className="text-gray-400">
                        All plans include a <span className="text-hydra-lavender font-bold">7-day free trial</span>. No credit card required.
                        <br />
                        Need a custom plan? <a href="/contact" className="text-hydra-lavender hover:underline">Contact us</a>
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
