'use client';

import { motion } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { scaleOnHover } from '@/components/ui/animations';

interface PricingCardProps {
    tier: string;
    price: number;
    period: 'monthly' | 'yearly';
    features: string[];
    highlighted?: boolean;
    cta: string;
}

export default function PricingCard({ tier, price, period, features, highlighted = false, cta }: PricingCardProps) {
    const yearlyPrice = Math.floor(price * 12 * 0.8); // 20% discount for yearly

    return (
        <motion.div
            {...scaleOnHover}
            className={`
        relative p-8 rounded-[40px] border backdrop-blur-sm
        ${highlighted
                    ? 'bg-hydra-radial border-hydra-lavender/40 shadow-2xl shadow-hydra-purple/20'
                    : 'bg-hydra-dark/50 border-hydra-lavender/10 hover:border-hydra-lavender/30'
                }
        transition-all duration-300
      `}
        >
            {highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full btn-hydra text-xs font-bold text-black/80 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    MOST POPULAR
                </div>
            )}

            <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">{tier}</h3>
                <div className="flex items-baseline justify-center gap-1">
                    <span className="text-5xl font-black text-hydra-lavender">
                        ${period === 'yearly' ? yearlyPrice : price}
                    </span>
                    <span className="text-gray-400">/{period === 'yearly' ? 'year' : 'month'}</span>
                </div>
                {period === 'yearly' && (
                    <p className="text-sm text-green-400 mt-2">Save 20%</p>
                )}
            </div>

            <ul className="space-y-4 mb-8">
                {features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-hydra-purple flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-300">{feature}</span>
                    </li>
                ))}
            </ul>

            <Button
                className={`
          w-full h-12 rounded-full font-bold uppercase text-sm tracking-wide
          ${highlighted
                        ? 'btn-hydra text-black/80 shadow-lg hover:shadow-hydra-purple/40'
                        : 'bg-hydra-purple/20 text-white border border-hydra-purple/30 hover:bg-hydra-purple/30'
                    }
        `}
            >
                {cta}
            </Button>
        </motion.div>
    );
}
