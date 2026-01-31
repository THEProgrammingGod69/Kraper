'use client';

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles, Zap, Shield, ChevronRight, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/context/AuthContext";
import Background from "@/components/ui/Background";

export default function Home() {
  const { user, loading } = useAuth();

  return (
    <div className="min-h-[calc(100vh-6rem)] flex flex-col items-center justify-center relative overflow-hidden">

      {/* Dynamic Canvas Background */}
      <Background />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-20 flex flex-col items-center text-center">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <span className="glass-panel px-4 py-1.5 rounded-full text-xs font-medium text-hydra-lavender flex items-center gap-2 border border-hydra-purple/20 shadow-lg shadow-hydra-purple/10">
            <Sparkles className="w-3 h-3 fill-current" />
            AI-Powered Research Assistant v2.0
          </span>
        </motion.div>

        {/* Hero Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-8 text-white relative z-20"
        >
          <span className="block mb-2">Kraft Your</span>
          <span className="text-hydra-lavender">Masterpiece.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl text-lg md:text-xl text-gray-300 mb-12 leading-relaxed"
        >
          Transform scattered ideas into IEEE-standard research papers in seconds.
          <br className="hidden md:block" />
          The future of academic writing is here.
        </motion.p>

        {/* CTA Buttons - Conditional Rendering */}
        {!loading && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 w-full justify-center z-20 relative"
          >
            {user ? (
              // Logged In View
              <>
                <Link href="/dashboard">
                  <Button size="lg" className="h-14 px-8 rounded-full text-base font-semibold btn-hydra hover:shadow-lg hover:shadow-hydra-purple/40 transition-all group text-black/80">
                    Go to Dashboard
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/studio/setup">
                  <Button size="lg" variant="outline" className="h-14 px-8 rounded-full text-base font-semibold border-hydra-lavender/30 hover:bg-hydra-purple/10 transition-all text-white backdrop-blur-sm group">
                    <Sparkles className="w-4 h-4 mr-2 text-hydra-lavender group-hover:animate-pulse" />
                    New Project
                  </Button>
                </Link>
              </>
            ) : (
              // Guest View
              <>
                <Link href="/login">
                  <Button size="lg" className="h-14 px-8 rounded-full text-base font-semibold btn-hydra hover:shadow-lg hover:shadow-hydra-purple/40 transition-all group text-black/80">
                    Get Started
                    <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/login">
                  <Button size="lg" variant="outline" className="h-14 px-8 rounded-full text-base font-semibold border-hydra-lavender/30 hover:bg-hydra-purple/10 transition-all text-white backdrop-blur-sm">
                    <LogIn className="w-4 h-4 mr-2" />
                    Sign In
                  </Button>
                </Link>
              </>
            )}
          </motion.div>
        )}

        {/* Features Grid (Minimal) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-32 w-full max-w-5xl text-left relative z-20">
          <FeatureCard delay={0.4} icon={Zap} title="Instant Drafts" description="Generate full LaTeX drafts from simple questionnaire inputs in under 2 minutes." />
          <FeatureCard delay={0.5} icon={Shield} title="IEEE Compliance" description="Output is automatically formatted to strict IEEE conference standards with citations." />
          <FeatureCard delay={0.6} icon={Sparkles} title="AI-Powered" description="Leverages advanced LLMs to synthesize coherent, heavily cited academic content." />
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, description, delay }: { icon: any, title: string, description: string, delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.6, delay: delay }}
      className="group p-6 rounded-[40px] bg-hydra-radial border border-hydra-lavender/10 hover:border-hydra-lavender/40 transition-all backdrop-blur-sm shadow-xl"
    >
      <div className="w-12 h-12 rounded-xl bg-hydra-purple/20 flex items-center justify-center mb-4 text-hydra-lavender group-hover:scale-110 transition-transform border border-hydra-lavender/20 group-hover:border-hydra-lavender/40">
        <Icon className="w-6 h-6 text-hydra-lavender group-hover:text-white transition-colors" />
      </div>
      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-hydra-lavender transition-colors">{title}</h3>
      <p className="text-sm text-gray-400 leading-relaxed group-hover:text-gray-300">{description}</p>
    </motion.div>
  )
}
