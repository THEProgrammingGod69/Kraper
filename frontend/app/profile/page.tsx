'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/lib/context/AuthContext';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { User, FileText, Clock, ExternalLink, Sparkles } from 'lucide-react';
import Link from 'next/link';


export default function ProfilePage() {
    const { user } = useAuth();
    const [projects, setProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProjects() {
            if (!user) return;
            try {
                // Fetch from Supabase "projects" table
                const { data, error } = await supabase
                    .from('projects')
                    .select('*')
                    .eq('user_id', user.uid)
                    .order('created_at', { ascending: false })
                    .limit(5);

                if (data && data.length > 0) {
                    setProjects(data);
                } else {
                    setProjects([]); // Explicitly empty if no real data
                }
            } catch (err) {
                console.error("Failed to fetch projects", err);
                // No mock fallback
            } finally {
                setLoading(false);
            }
        }

        fetchProjects();
    }, [user]);

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center p-6">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Please Log In</h1>
                    <Link href="/login"><Button>Go to Login</Button></Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen pt-32 pb-20 px-6 max-w-7xl mx-auto">

            {/* Header Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col md:flex-row gap-8 items-start mb-16"
            >
                {/* Profile Card */}
                <div className="w-full md:w-1/3">
                    <Card className="bg-white/5 border-white/10 backdrop-blur-md overflow-hidden relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 pointer-events-none" />
                        <CardContent className="p-8 flex flex-col items-center text-center relative z-10">
                            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-indigo-500 to-pink-500 p-1 mb-4 shadow-xl">
                                {user.photoURL ? (
                                    <img src={user.photoURL} alt="Profile" className="w-full h-full rounded-full object-cover border-2 border-black" />
                                ) : (
                                    <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                                        <User className="w-10 h-10 text-white" />
                                    </div>
                                )}
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-1">{user.displayName || 'Research Scholar'}</h2>
                            <p className="text-gray-400 text-sm mb-6">{user.email}</p>

                            <div className="w-full grid grid-cols-2 gap-4 text-left">
                                <div className="p-3 rounded-lg bg-black/20 border border-white/5">
                                    <p className="text-xs text-gray-500 mb-1">Projects</p>
                                    <p className="text-xl font-bold text-white">{projects.length}</p>
                                </div>
                                <div className="p-3 rounded-lg bg-black/20 border border-white/5">
                                    <p className="text-xs text-gray-500 mb-1">Plan</p>
                                    <p className="text-xl font-bold text-nebula-400">Pro</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Recent Projects */}
                <div className="w-full md:w-2/3">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                            <Clock className="w-5 h-5 text-gray-400" />
                            Recent Activity
                        </h3>
                        <Link href="/dashboard">
                            <Button variant="ghost" className="text-xs text-nebula-300 hover:text-white">View All</Button>
                        </Link>
                    </div>

                    <div className="space-y-4">
                        {projects.map((project, i) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <Card className="bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/20 transition-all group cursor-pointer group">
                                    <CardContent className="p-5 flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                                                <FileText className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-white group-hover:text-indigo-300 transition-colors">{project.title}</h4>
                                                <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                                                    <span>{project.domain || "Research"}</span>
                                                    <span>•</span>
                                                    <span>Edited {project.updated_at || new Date().toLocaleDateString()}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <Button size="icon" variant="ghost" className="opacity-0 group-hover:opacity-100 transition-opacity">
                                            <ExternalLink className="w-4 h-4" />
                                        </Button>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}

                        {projects.length === 0 && !loading && (
                            <div className="text-center py-12 border border-dashed border-white/10 rounded-xl">
                                <p className="text-gray-500 mb-4">No recent projects found.</p>
                                <Link href="/studio/setup"><Button>Start New Project</Button></Link>
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
