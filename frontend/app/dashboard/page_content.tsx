'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { FileText, Lock, Clock, ArrowRight, Plus, Terminal, Settings, User } from 'lucide-react';
import ProtectedRoute from '@/components/layout/ProtectedRoute';
import { useAuth } from '@/lib/context/AuthContext';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function DashboardPage() {
    const { user, signOut } = useAuth();
    const [recentProject, setRecentProject] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchRecent() {
            if (!user) return;
            try {
                const { data } = await supabase
                    .from('projects')
                    .select('*')
                    .eq('user_id', user.uid)
                    .order('created_at', { ascending: false })
                    .limit(1)
                    .single();

                if (data) setRecentProject(data);
            } catch (e) {
                console.log("No recent interactions found.");
            } finally {
                setLoading(false);
            }
        }
        fetchRecent();
    }, [user]);

    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-void text-starlight selection:bg-nebula-500/30">
                {/* Ambient Background */}
                <div className="fixed inset-0 z-0 pointer-events-none">
                    <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-nebula-500/10 rounded-full blur-[100px] animate-orb-float" />
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:50px_50px] opacity-20" />
                </div>

                {/* HUD Header */}
                <header className="sticky top-0 z-50 border-b border-white/5 bg-void/80 backdrop-blur-md">
                    <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                                <Terminal className="w-4 h-4 text-nebula-400" />
                            </div>
                            <span className="font-bold text-lg tracking-tight">KRAPER <span className="text-dust font-normal text-xs ml-2">TERMINAL v2.0</span></span>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-dust">
                                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                <span>SYSTEM ONLINE</span>
                            </div>
                            <Link href="/profile">
                                <Button variant="ghost" size="sm" className="text-dust hover:text-white">
                                    <span className="mr-2">{user?.displayName?.split(' ')[0] || 'User'}</span>
                                    {user?.photoURL ? (
                                        <img src={user.photoURL} alt="User" className="w-4 h-4 rounded-full" />
                                    ) : (
                                        <User className="w-4 h-4" />
                                    )}
                                </Button>
                            </Link>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="relative z-10 max-w-7xl mx-auto px-6 py-12">

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="mb-12"
                    >
                        <h1 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-gray-500">
                            Command Center
                        </h1>
                        <p className="text-dust text-lg">Initialize a new research sequence.</p>
                    </motion.div>

                    {/* Most Recent Project Banner (If Exists) */}
                    {recentProject && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-8"
                        >
                            <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-white/10 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 hover:border-white/20 transition-all group">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-400 text-2xl group-hover:scale-110 transition-transform">
                                        <FileText />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-1 group-hover:text-indigo-300 transition-colors uppercase tracking-wide">Resume Session</h3>
                                        <p className="text-lg text-white font-medium">{recentProject.title}</p>
                                        <div className="flex gap-2 text-xs text-dust mt-1">
                                            <span>{recentProject.domain}</span>
                                            <span>•</span>
                                            <span>Last edited: {new Date(recentProject.updated_at).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                </div>
                                <Button className="bg-white text-black hover:bg-gray-200">
                                    Open in Studio <ArrowRight className="ml-2 w-4 h-4" />
                                </Button>
                            </div>
                        </motion.div>
                    )}

                    {/* Grid Layout */}
                    <div className="grid md:grid-cols-3 gap-6">

                        {/* Primary Action - Create Paper */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="md:col-span-2 md:row-span-2 group"
                        >
                            <Link href="/studio/setup">
                                <Card className="h-full relative overflow-hidden border-nebula-500/30 bg-gradient-to-br from-white/[0.03] to-white/[0.01] hover:border-nebula-500/60 hover:shadow-[0_0_40px_rgba(99,102,241,0.15)] group-hover:bg-white/[0.05]">
                                    {/* Decorative Elements */}
                                    <div className="absolute top-0 right-0 p-4 opacity-50">
                                        <Plus className="w-6 h-6 text-nebula-500" />
                                    </div>

                                    <CardHeader className="relative z-10">
                                        <div className="w-12 h-12 rounded-2xl bg-nebula-gradient p-[1px] mb-6">
                                            <div className="w-full h-full bg-black rounded-[0.9rem] flex items-center justify-center">
                                                <FileText className="w-6 h-6 text-white" />
                                            </div>
                                        </div>
                                        <CardTitle className="text-3xl mb-2">Initialize Research Paper</CardTitle>
                                        <CardDescription className="text-lg">
                                            Start the 29-step guided sequence for academic generation.
                                        </CardDescription>
                                    </CardHeader>

                                    <CardContent className="mt-8">
                                        <div className="grid grid-cols-3 gap-4">
                                            <div className="p-3 rounded-lg bg-black/20 border border-white/5">
                                                <div className="text-2xl font-bold text-white mb-1">01</div>
                                                <div className="text-xs text-dust uppercase">Structure</div>
                                            </div>
                                            <div className="p-3 rounded-lg bg-black/20 border border-white/5">
                                                <div className="text-2xl font-bold text-white mb-1">02</div>
                                                <div className="text-xs text-dust uppercase">Draft</div>
                                            </div>
                                            <div className="p-3 rounded-lg bg-black/20 border border-white/5">
                                                <div className="text-2xl font-bold text-white mb-1">03</div>
                                                <div className="text-xs text-dust uppercase">Format</div>
                                            </div>
                                        </div>

                                        <div className="mt-8 flex items-center text-nebula-400 font-medium group-hover:translate-x-2 transition-transform">
                                            Begin Sequence <ArrowRight className="w-4 h-4 ml-2" />
                                        </div>
                                    </CardContent>

                                    {/* Hover Gradient Overlay */}
                                    <div className="absolute inset-0 bg-nebula-gradient opacity-0 group-hover:opacity-5 transition-opacity duration-500" />
                                </Card>
                            </Link>
                        </motion.div>

                        {/* Secondary Action - Patents (Locked) */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <Card className="h-full relative overflow-hidden bg-black/40 border-white/5 hover:border-white/10 opacity-70 cursor-not-allowed">
                                {/* Lock Overlay */}
                                <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] z-20 flex flex-col items-center justify-center text-center p-6">
                                    <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-3">
                                        <Lock className="w-5 h-5 text-dust" />
                                    </div>
                                    <span className="text-xs font-bold text-dust uppercase tracking-widest border border-white/10 px-2 py-1 rounded">Module Offline</span>
                                </div>

                                <CardHeader>
                                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-4">
                                        <FileText className="w-5 h-5 text-dust" />
                                    </div>
                                    <CardTitle className="text-xl text-dust">Patent Engine</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-dust/50">
                                        Automated patent application drafting and claims generation.
                                    </p>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Recent Activity */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="md:row-span-2"
                        >
                            <Card className="h-full bg-void border-white/10">
                                <CardHeader>
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <Clock className="w-5 h-5 text-nebula-400" />
                                            <CardTitle className="text-lg">Recent Logs</CardTitle>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <div className="divide-y divide-white/5">
                                        {/* Empty State / List */}
                                        <div className="p-6 text-center">
                                            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-white/5 flex items-center justify-center">
                                                <Terminal className="w-6 h-6 text-dust/50" />
                                            </div>
                                            <p className="text-sm text-dust">
                                                {loading ? "Syncing..." : recentProject ? "System Active." : "No active sequences found."}
                                            </p>
                                            <Link href="/studio/setup">
                                                <Button variant="link" className="mt-2 text-nebula-400">Initialize New</Button>
                                            </Link>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                    </div>
                </main>
            </div>
        </ProtectedRoute>
    );
}
