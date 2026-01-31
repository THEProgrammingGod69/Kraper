'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Calendar, MapPin, ExternalLink, Filter, Loader2, Award, BookOpen, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import axios from 'axios';

// API Configuration
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:5002";

interface Conference {
    id: string;
    acronym: string;
    name: string;
    dates: string;
    location: string;
    deadline: string;
    impact_factor: number;
    index: string;
    website: string;
}

const POPULAR_DOMAINS = ["Artificial Intelligence", "Cybersecurity", "Computer Vision", "Machine Learning", "Robotics", "IoT"];
const MONTHS = ["All", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function ConferencesPage() {
    const [searchTerm, setSearchTerm] = useState(''); // Local filter for loaded results
    const [domainQuery, setDomainQuery] = useState('Artificial Intelligence'); // API Query
    const [selectedMonth, setSelectedMonth] = useState('All');

    const [conferences, setConferences] = useState<Conference[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Fetch Conferences
    const fetchConferences = async () => {
        if (!domainQuery.trim()) return;

        setLoading(true);
        setError('');
        try {
            // Use local python service
            const response = await axios.post(`${API_URL}/conferences`, {
                domain: domainQuery
            }, { timeout: 60000 });

            if (response.data.status === 'success') {
                setConferences(response.data.data);
            } else {
                setError('Failed to fetch conferences');
            }
        } catch (err) {
            console.error("API Error", err);
            setError('Could not connect to conference service.');
        } finally {
            setLoading(false);
        }
    };

    // Initial load
    useEffect(() => {
        fetchConferences();
    }, []);

    // Filter Logic
    const filteredConferences = conferences.filter(conf => {
        // Search Filter
        const matchesSearch = conf.acronym.toLowerCase().includes(searchTerm.toLowerCase()) ||
            conf.name.toLowerCase().includes(searchTerm.toLowerCase());

        // Month Filter
        // Date format is usually "Jun 14 - Jun 19, 2026"
        let matchesMonth = true;
        if (selectedMonth !== 'All') {
            matchesMonth = conf.dates.includes(selectedMonth);
        }

        return matchesSearch && matchesMonth;
    });

    return (
        <div className="min-h-screen pt-32 pb-20 px-6 flex flex-col items-center">

            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-12 max-w-2xl"
            >
                <div className="flex items-center justify-center gap-2 mb-4">
                    <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-nebula-300 font-medium flex items-center gap-2">
                        <Calendar className="w-3 h-3" />
                        Realtime Global Scraper
                    </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                    Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Perfect Stage.</span>
                </h1>
                <p className="text-gray-400">
                    Live scraping of top-tier conferences. Enter any research domain below to find upcoming events.
                </p>
            </motion.div>

            {/* Search Controls */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="w-full max-w-4xl space-y-6 mb-12"
            >
                {/* Main Query Input */}
                <div className="flex flex-col md:flex-row gap-4 bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-md">
                    <div className="flex-1">
                        <label className="text-xs text-gray-500 mb-1.5 block ml-1">Research Domain</label>
                        <div className="flex gap-2">
                            <Input
                                value={domainQuery}
                                onChange={(e) => setDomainQuery(e.target.value)}
                                placeholder="e.g. Generative AI, Quantum Computing..."
                                className="bg-black/40 border-white/10 text-white h-11"
                                onKeyDown={(e) => e.key === 'Enter' && fetchConferences()}
                            />
                        </div>
                    </div>

                    <div className="w-full md:w-auto">
                        <label className="text-xs text-gray-500 mb-1.5 block ml-1">Action</label>
                        <Button
                            onClick={fetchConferences}
                            disabled={loading}
                            className="w-full md:w-auto h-11 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white"
                        >
                            {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <RefreshCw className="w-4 h-4 mr-2" />}
                            Scrape Conferences
                        </Button>
                    </div>
                </div>

                {/* Filters Row */}
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                    {/* Popular Chips */}
                    <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide max-w-2xl">
                        {POPULAR_DOMAINS.map(domain => (
                            <button
                                key={domain}
                                onClick={() => { setDomainQuery(domain); }}
                                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all border ${domainQuery === domain
                                    ? 'bg-white text-black border-white'
                                    : 'bg-white/5 text-gray-400 border-white/10 hover:border-white/20 hover:text-white'
                                    }`}
                            >
                                {domain}
                            </button>
                        ))}
                    </div>

                    {/* Local Filters */}
                    <div className="flex gap-3 w-full md:w-auto">
                        <div className="w-32">
                            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                                <SelectTrigger className="bg-white/5 border-white/10 text-white h-9 text-xs">
                                    <SelectValue placeholder="Month" />
                                </SelectTrigger>
                                <SelectContent className="bg-[#0B0C15] border-white/10 text-white">
                                    <SelectGroup>
                                        <SelectLabel>Month</SelectLabel>
                                        {MONTHS.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="relative w-full md:w-48">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
                            <input
                                type="text"
                                placeholder="Filter results..."
                                className="w-full bg-white/5 border border-white/10 rounded-md h-9 pl-9 pr-4 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-white/30"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Results Grid */}
            <div className="w-full max-w-4xl">
                {loading && (
                    <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                        <Loader2 className="w-10 h-10 animate-spin mb-4 text-nebula-500" />
                        <p>Scraping global databases for {domainQuery} conferences...</p>
                    </div>
                )}

                {!loading && error && (
                    <div className="text-center text-red-400 py-12 bg-red-500/5 rounded-xl border border-red-500/10">
                        <p>{error}</p>
                    </div>
                )}

                {!loading && !error && (
                    <div className="grid grid-cols-1 gap-4">
                        {filteredConferences.map((conf, i) => (
                            <motion.div
                                key={`${conf.id}-${i}`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className="group bg-white/5 border border-white/5 hover:border-white/20 rounded-xl p-6 transition-all hover:bg-white/10 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between"
                            >
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">{conf.acronym}</h3>
                                        {conf.deadline !== "N/A" && (
                                            <Badge variant="destructive" className="bg-red-500/10 text-red-400 border-red-500/20 hover:bg-red-500/20">
                                                Deadline: {conf.deadline}
                                            </Badge>
                                        )}
                                    </div>
                                    <p className="text-gray-300 font-medium mb-1 line-clamp-2">{conf.name}</p>

                                    <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-400">
                                        <span className="flex items-center gap-1.5 bg-white/5 px-2 py-1 rounded-md">
                                            <Calendar className="w-3.5 h-3.5 text-blue-400" /> {conf.dates}
                                        </span>
                                        <span className="flex items-center gap-1.5 bg-white/5 px-2 py-1 rounded-md">
                                            <MapPin className="w-3.5 h-3.5 text-emerald-400" /> {conf.location}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex flex-row md:flex-col gap-3 min-w-[140px] border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-6 w-full md:w-auto">
                                    <div className="flex items-center gap-2" title="Estimated Impact Factor">
                                        <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400">
                                            <Award className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500">Impact Factor</p>
                                            <p className="text-sm font-bold text-white">{conf.impact_factor}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2" title="Indexing">
                                        <div className="w-8 h-8 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                                            <BookOpen className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500">Index</p>
                                            <p className="text-sm font-bold text-white">{conf.index}</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}

                {!loading && !error && filteredConferences.length === 0 && (
                    <div className="text-center text-gray-500 py-12">
                        <Filter className="w-12 h-12 mx-auto mb-4 opacity-20" />
                        <p>No conferences found matching your filters.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
