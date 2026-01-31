'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { usePaperStore } from '@/lib/store/paperStore';
import { paperApi } from '@/lib/api/client';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/lib/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Sparkles, Download, FileText, ChevronLeft, LogOut, Code, Eye, Terminal, RefreshCw } from 'lucide-react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import ProtectedRoute from '@/components/layout/ProtectedRoute';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

// Math Rendering
import 'katex/dist/katex.min.css';
import Latex from 'react-latex-next';

// Register fonts
// @ts-ignore
// @ts-ignore
if (pdfFonts.pdfMake) {
    // @ts-ignore
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
} else if (pdfFonts.vfs) {
    // @ts-ignore
    pdfMake.vfs = pdfFonts.vfs;
} else {
    // @ts-ignore
    pdfMake.vfs = pdfFonts;
}
import { Document, Packer, Paragraph, TextRun, HeadingLevel } from 'docx';
import { saveAs } from 'file-saver';
import { Play, FileText as FileTextIcon, Image as ImageIcon } from 'lucide-react';

// Dynamically import Monaco Editor (client-side only)
const Editor = dynamic(() => import('@monaco-editor/react'), { ssr: false });

export default function WorkspacePage() {
    const router = useRouter();
    const { user } = useAuth();
    const { inputs, generatedSections, setGeneratedSections, formattingMode, setFormattingMode, isGenerating, setIsGenerating, setError, error } = usePaperStore();

    // Explicit Order for Visual Display
    const SECTION_DISPLAY_ORDER = [
        "Abstract", "Keywords", "Introduction", "Related Work",
        "Problem Formulation", "Methodology", "Experimental Setup",
        "Results and Discussion", "System Architecture",
        "Limitations and Future Scope", "Conclusion", "References"
    ];

    // Helper to find key case-insensitively
    const findKey = (search: string) => {
        return Object.keys(generatedSections).find(k => k.toLowerCase().trim() === search.toLowerCase().trim());
    };

    const [activeTab, setActiveTab] = useState<'preview' | 'latex'>('preview');
    const [generationProgress, setGenerationProgress] = useState(0);
    const [editorContent, setEditorContent] = useState('');

    // Ref to track if update is coming from Recompile action
    // This prevents the visual preview update from overwriting the editor content
    const isRecompiling = useRef(false);

    // Sync editor content when generatedSections changes
    useEffect(() => {
        if (Object.keys(generatedSections).length > 0) {
            // If we are recompiling, we DON'T want to overwrite the editor
            // because the editor IS the source of truth right now.
            if (isRecompiling.current) {
                isRecompiling.current = false;
                return;
            }
            setEditorContent(generateLatexSource());
        }
    }, [generatedSections]);



    const handleGenerate = async () => {
        setIsGenerating(true);
        setError(null);
        setGenerationProgress(0);

        try {
            // Map all 29 questionnaire inputs to backend format
            const payload = {
                // Author Info
                authors: inputs.authors || [],

                // Core Info (Q1-Q4)
                domain: inputs.domain || '',
                research_topic: inputs.research_topic || '',
                research_type: inputs.research_type || '',
                completion_status: inputs.completion_status || '',

                // Motivation (Q5-Q7)
                problem_importance: inputs.problem_importance || '',
                key_contribution: inputs.key_contribution || '',
                key_results: inputs.key_results || '',

                // Context (Q8-Q10)
                background_info: inputs.background_info || '',
                specific_problem: inputs.specific_problem || '',
                objectives: inputs.objectives || '',

                // Literature (Q11-Q13)
                related_approaches: inputs.related_approaches || '',
                prior_limitations: inputs.prior_limitations || '',
                comparison_baselines: inputs.comparison_baselines || '',

                // Methodology (Q14-Q19)
                approach_overview: inputs.approach_overview || '',
                system_workflow: inputs.system_workflow || '',
                algorithms: inputs.algorithms || '',
                dataset_details: inputs.dataset_details || '',
                tools_used: inputs.tools_used || '',
                validation_method: inputs.validation_method || '',

                // Results (Q20-Q22)
                quantitative_results: inputs.quantitative_results || '',
                result_interpretation: inputs.result_interpretation || '',
                comparison_analysis: inputs.comparison_analysis || '',

                // Conclusion (Q23-Q25)
                current_limitations: inputs.current_limitations || '',
                future_work: inputs.future_work || '',
                conclusion_summary: inputs.conclusion_summary || '',

                // Optional (Q26-Q29)
                formal_problem_def: inputs.formal_problem_def || '',
                architecture_details: inputs.architecture_details || '',
                ethical_considerations: inputs.ethical_considerations || '',
                special_requirements: inputs.special_requirements || '',
            };

            // Progress Simulation
            const progressInterval = setInterval(() => {
                setGenerationProgress(prev => Math.min(prev + (Math.random() * 5), 90));
            }, 800);

            const response = await paperApi.generatePaper(payload as any);

            clearInterval(progressInterval);
            setGenerationProgress(100);

            if (response.success) {
                setGeneratedSections(response.data.generated_text);

                // Save to Supabase
                if (user) {
                    try {
                        await supabase.from('projects').insert({
                            user_id: user.uid,
                            title: inputs.research_topic || 'Untitled Paper',
                            domain: inputs.domain || 'Research',
                            content: response.data.generated_text,
                            inputs: inputs,
                            status: 'Draft'
                        });
                        console.log("Project saved to Supabase");
                    } catch (err) {
                        console.error("Failed to auto-save project", err);
                    }
                }
            }
        } catch (error: any) {
            console.error('Generation error:', error);
            setError(error.response?.data?.message || error.message || 'Failed to generate paper');
        } finally {
            setIsGenerating(false);
        }
    };

    const handleExport = () => {
        const blob = new Blob([JSON.stringify(generatedSections, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${inputs.research_topic?.replace(/\s+/g, '_') || 'paper'}.json`;
        a.click();
    };


    // Helper to escape special LaTeX characters
    const escapeLatex = (text: string) => {
        return text
            .replace(/\\/g, '\\textbackslash{}')
            .replace(/\{/g, '\\{')
            .replace(/\}/g, '\\}')
            .replace(/\$/g, '\\$')
            .replace(/&/g, '\\&')
            .replace(/#/g, '\\#')
            .replace(/\^/g, '\\textasciicircum{}')
            .replace(/_/g, '\\_')
            .replace(/%/g, '\\%')
            .replace(/~/g, '\\textasciitilde{}');
    };

    // Helper to convert Markdown-ish content to LaTeX
    const mdToLatex = (text: string) => {
        let latex = escapeLatex(text);
        // Bold (**text**) -> \textbf{text}
        latex = latex.replace(/\\ \*\* (.*?) \\ \*\*/g, '\\textbf{$1}'); // excessive escaping due to escapeLatex
        // Actually, better to do md replace BEFORE escaping, or careful manual handling.
        // Let's use a simpler approach: plain text with basic sections for now to avoid breaking math.
        // Reverting to direct text injection for content, but wrapped in sections.
        return text;
    };

    // Generate Full LaTeX Source
    const generateLatexSource = () => {
        if (!generatedSections || Object.keys(generatedSections).length === 0) return '';

        const authorBlock = (inputs.authors || []).map((auth: any) =>
            `\\IEEEauthorblockN{${auth.name}}\n\\IEEEauthorblockA{\\textit{${auth.department}} \\\\\n\\textit{${auth.institution}} \\\\\n${auth.email}}`
        ).join('\n\\and\n');

        let latex = `\\documentclass[conference]{IEEEtran}
\\usepackage{cite}
\\usepackage{amsmath,amssymb,amsfonts}
\\usepackage{algorithmic}
\\usepackage{graphicx}
\\usepackage{textcomp}
\\usepackage{xcolor}

\\begin{document}

\\title{${inputs.research_topic || 'Untitled Paper'}}

\\author{
${authorBlock}
}

\\maketitle

`;

        // Order of sections (same as pipeline)
        const sectionOrder = [
            "Abstract", "Keywords", "Introduction", "Related Work",
            "Problem Formulation", "Methodology", "Experimental Setup",
            "Results and Discussion", "System Architecture",
            "Limitations and Future Scope", "Conclusion", "References"
        ];

        Object.entries(generatedSections).forEach(([key, content]) => {
            // Basic Markdown cleanup for LaTeX
            let cleanContent = (content as string)
                .replace(/\*\*(.*?)\*\*/g, "\\textbf{$1}") // Bold
                .replace(/\*(.*?)\*/g, "\\textit{$1}")     // Italic
                .replace(/^# (.*)/gm, "\\section{$1}")      // H1
                .replace(/^## (.*)/gm, "\\subsection{$1}")  // H2
                .replace(/^### (.*)/gm, "\\subsubsection{$1}") // H3
                .replace(/`/g, "")   // Remove backticks
                .replace(/_/g, "\\_"); // Escape underscores

            if (key === 'Abstract') {
                latex += `\\begin{abstract}\n${cleanContent}\n\\end{abstract}\n\n`;
            } else if (key === 'Keywords') {
                latex += `\\begin{IEEEkeywords}\n${cleanContent}\n\\end{IEEEkeywords}\n\n`;
            } else if (key === 'References') {
                // Heuristic to detect bib items or list
                latex += `\\section{References}\n${cleanContent}\n\n`;
            } else {
                latex += `\\section{${key}}\n${cleanContent}\n\n`;
            }
        });

        latex += "\\end{document}";
        return latex;
    };

    const latexSource = generateLatexSource();

    // Recompile: Parse simple LaTeX back to sections
    const handleRecompile = () => {
        setIsGenerating(true);
        // Set lock to prevent overwrite
        isRecompiling.current = true;

        // Robust regex to handle spacing: \section { Title }
        // We want to capture everything until the next section or end of doc
        // Using [\s\S]*? with a positive lookahead for next section
        const sectionRegex = /\\section\s*\{(.*?)\}\s*([\s\S]*?)(?=\\section|\\end\{document\}|$)/gi;

        const newSections: Record<string, string> = { ...generatedSections };
        let match;
        // Reset lastIndex just in case
        sectionRegex.lastIndex = 0;

        while ((match = sectionRegex.exec(editorContent)) !== null) {
            const title = match[1].trim();
            const content = match[2].trim();

            // Find fuzzy key
            const existingKey = Object.keys(newSections).find(k => k.toLowerCase().trim() === title.toLowerCase().trim()) || title;
            newSections[existingKey] = content;
        }

        setGeneratedSections(newSections);
        setTimeout(() => setIsGenerating(false), 500); // Fake delay for feel
    };

    const handleDownloadPDF = () => {
        // Define styles
        const styles = {
            header: { fontSize: 18, bold: true, alignment: 'center', margin: [0, 0, 0, 10] },
            subheader: { fontSize: 12, italics: true, alignment: 'center', margin: [0, 0, 0, 20] },
            sectionHeader: { fontSize: 12, bold: true, margin: [0, 10, 0, 5], unzip: true },
            text: { fontSize: 10, margin: [0, 0, 0, 5], alignment: 'justify' },
            abstract: { fontSize: 9, italics: true, margin: [20, 0, 20, 10], alignment: 'justify' }
        };

        // Build Author block
        const authorsText = (inputs.authors || []).map((a: any) => `${a.name} (${a.institution})`).join(', ');

        // Document Definition
        const docDefinition: any = {
            content: [
                { text: inputs.research_topic || 'Untitled Paper', style: 'header' },
                { text: authorsText, style: 'subheader' },
            ],
            styles: styles,
            defaultStyle: {
                font: 'Roboto'
            }
        };



        // Order sections
        const sections = [
            "Abstract", "Keywords", "Introduction", "Related Work",
            "Problem Formulation", "Methodology", "Experimental Setup",
            "Results and Discussion", "System Architecture",
            "Limitations and Future Scope", "Conclusion", "References"
        ];


        // Add sections directly
        sections.forEach(key => {
            if ((generatedSections as any)[key]) {
                const content = (generatedSections as any)[key];
                docDefinition.content.push({ text: key.toUpperCase(), style: 'sectionHeader' });
                const paragraphs = content.split('\n\n').map((p: string) => ({ text: p.replace(/[\*_]/g, ''), style: 'text' }));
                docDefinition.content.push(paragraphs);
            }
        });

        pdfMake.createPdf(docDefinition).download(`${inputs.research_topic || 'research_paper'}.pdf`);
    };

    const handleDownloadWord = async () => {
        const children = [];

        // Title
        children.push(new Paragraph({
            text: inputs.research_topic || 'Untitled Paper',
            heading: HeadingLevel.TITLE,
        }));

        // Sections
        Object.entries(generatedSections).forEach(([title, content]) => {
            children.push(new Paragraph({
                text: title,
                heading: HeadingLevel.HEADING_1,
                spacing: { before: 400, after: 200 }
            }));

            // Split by paragraphs
            content.split('\n\n').forEach(para => {
                children.push(new Paragraph({
                    children: [new TextRun(para)],
                    spacing: { after: 200 }
                }));
            });
        });

        const doc = new Document({
            sections: [{ children }],
        });

        Packer.toBlob(doc).then((blob) => {
            saveAs(blob, `${inputs.research_topic || 'research_paper'}.docx`);
        });
    };



    return (
        <ProtectedRoute>
            <div className="h-screen flex flex-col bg-void text-starlight overflow-hidden">
                {/* ... (Header remains same) ... */}

                {/* ... (Split Screen structure remains same) ... */}
                <div className="flex-1 flex overflow-hidden">
                    {/* Left Panel */}
                    <div className="w-1/2 flex flex-col border-r border-white/10 bg-[#0A0A0A]">
                        <div className="p-6 border-b border-white/10 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Button variant="ghost" size="icon" onClick={() => router.push('/studio/questionnaire')}>
                                    <ChevronLeft className="w-5 h-5 text-gray-400 hover:text-white" />
                                </Button>
                                <div>
                                    <h2 className="text-lg font-bold">Project Configuration</h2>
                                    <p className="text-xs text-gray-400">research parameters & context</p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <Button variant="outline" size="sm" className="gap-2 bg-white/5 border-white/10 hover:bg-white/10 text-white" onClick={handleGenerate} disabled={isGenerating}>
                                    <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
                                    Regenerate
                                </Button>
                            </div>
                        </div>

                        <div className="flex-1 overflow-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-white/10 hover:scrollbar-thumb-white/20">
                            {/* Author Info */}
                            <div className="space-y-4">
                                <h3 className="text-xs uppercase tracking-wider text-gray-400 font-bold flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                                    Authors
                                </h3>
                                <div className="grid gap-3">
                                    {(inputs.authors || []).map((author, i) => (
                                        <div key={i} className="bg-white/5 p-3 rounded-lg border border-white/5">
                                            <div className="font-medium text-white">{author.name || 'Unnamed Author'}</div>
                                            <div className="text-xs text-gray-400">{author.institution}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Key Parameters */}
                            <div className="space-y-4">
                                <h3 className="text-xs uppercase tracking-wider text-gray-400 font-bold flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                                    Core Parameters
                                </h3>
                                <div className="space-y-3">
                                    <div className="group">
                                        <label className="text-xs text-gray-500 group-hover:text-indigo-400 transition-colors">Research Topic</label>
                                        <div className="text-sm font-medium mt-1 text-gray-200">{inputs.research_topic}</div>
                                    </div>
                                    <div className="group">
                                        <label className="text-xs text-gray-500 group-hover:text-indigo-400 transition-colors">Domain</label>
                                        <div className="text-sm font-medium mt-1 text-gray-200">{inputs.domain}</div>
                                    </div>
                                    <div className="group">
                                        <label className="text-xs text-gray-500 group-hover:text-indigo-400 transition-colors">Research Type</label>
                                        <div className="text-sm font-medium mt-1 text-gray-200">{inputs.research_type}</div>
                                    </div>
                                </div>
                            </div>

                            {/* All other inputs as a list */}
                            <div className="space-y-4">
                                <h3 className="text-xs uppercase tracking-wider text-gray-400 font-bold flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                                    Detailed Context
                                </h3>
                                <div className="space-y-4">
                                    {Object.entries(inputs).map(([key, value]) => {
                                        if (['authors', 'domain', 'research_topic', 'research_type'].includes(key)) return null;
                                        if (!value || (typeof value === 'string' && value.length === 0)) return null;
                                        return (
                                            <div key={key} className="group">
                                                <label className="text-xs text-gray-500 uppercase group-hover:text-indigo-400 transition-colors">
                                                    {key.replace(/_/g, ' ')}
                                                </label>
                                                <div className="text-sm text-gray-300 mt-1 line-clamp-3 hover:line-clamp-none bg-black/20 p-2 rounded hover:bg-black/40 transition-all cursor-default border border-transparent hover:border-white/10">
                                                    {value as string}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>


                    {/* Right Panel */}
                    <div className="w-1/2 flex flex-col bg-black/40 relative">
                        {/* Toolbar */}
                        <div className="h-12 border-b border-white/10 flex items-center justify-between px-4 bg-[#0F0F0F]">
                            <div className="flex bg-black/40 rounded-lg p-0.5 border border-white/5">
                                <button
                                    onClick={() => setActiveTab('preview')}
                                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all flex items-center gap-2 ${activeTab === 'preview' ? 'bg-white/10 text-white shadow-sm' : 'text-gray-400 hover:text-white'}`}
                                >
                                    <ImageIcon className="w-3.5 h-3.5" />
                                    Visual
                                </button>
                                <button
                                    onClick={() => setActiveTab('latex')}
                                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all flex items-center gap-2 ${activeTab === 'latex' ? 'bg-white/10 text-white shadow-sm' : 'text-gray-400 hover:text-white'}`}
                                >
                                    <Code className="w-3.5 h-3.5" />
                                    LaTeX source
                                </button>
                            </div>

                            <div className="flex items-center gap-2">
                                {activeTab === 'latex' && (
                                    <Button size="sm" variant="ghost" className="h-8 text-green-400 hover:text-green-300 hover:bg-green-400/10 gap-2" onClick={handleRecompile}>
                                        <Play className="w-3.5 h-3.5 fill-current" />
                                        Recompile
                                    </Button>
                                )}
                                <div className="h-4 w-px bg-white/10 mx-1"></div>
                                <Button size="sm" variant="ghost" className="h-8 text-gray-400 hover:text-white" onClick={handleDownloadPDF}>
                                    <span className="text-xs">PDF</span>
                                </Button>
                                <Button size="sm" variant="ghost" className="h-8 text-gray-400 hover:text-white" onClick={handleDownloadWord}>
                                    <span className="text-xs">DOCX</span>
                                </Button>
                            </div>
                        </div>

                        <div className="flex-1 overflow-auto p-8 relative z-10 bg-[#1e1e1e]">
                            {/* Error State */}
                            {Boolean(error) && (
                                <div className="flex flex-col items-center justify-center h-full text-center p-8">
                                    <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-4">
                                        <LogOut className="w-8 h-8 text-red-500" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2">Generation Failed</h3>
                                    <p className="text-gray-400 max-w-md mb-6">{error}</p>
                                    <Button onClick={handleGenerate} variant="outline" className="border-white/10 hover:bg-white/5">
                                        Try Again
                                    </Button>
                                </div>
                            )}

                            {/* Empty State */}
                            {!error && !isGenerating && Object.keys(generatedSections).length === 0 && (
                                <div className="flex flex-col items-center justify-center h-full text-center p-8">
                                    <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
                                        <Sparkles className="w-8 h-8 text-indigo-400" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2">Ready to Write</h3>
                                    <p className="text-gray-400 max-w-md mb-6">Paper generation has not started yet.</p>
                                    <Button onClick={handleGenerate} className="bg-indigo-600 hover:bg-indigo-700">
                                        Start Generation
                                    </Button>
                                </div>
                            )}

                            {!error && isGenerating ? (
                                // ... (Spinner) ...
                                <div className="flex flex-col items-center justify-center h-full">
                                    {/* ... Spinner code ... */}
                                    <div className="relative w-32 h-32 mb-8">
                                        {/* Orbital Spinner */}
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                            className="absolute inset-0 rounded-full border border-white/5 border-t-nebula-500 shadow-[0_0_30px_rgba(99,102,241,0.2)]"
                                        />
                                        <motion.div
                                            animate={{ rotate: -360 }}
                                            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                                            className="absolute inset-4 rounded-full border border-white/5 border-b-purple-500 shadow-[0_0_30px_rgba(168,85,247,0.2)]"
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center font-bold text-xl text-white">
                                            {Math.round(generationProgress)}%
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-lg font-medium text-white mb-2">Synthesizing Research Paper</p>
                                        <p className="text-sm text-dust">Analyzing {Object.keys(inputs).length} data points...</p>
                                    </div>
                                </div>
                            ) : activeTab === 'preview' ? (
                                <div id="paper-preview" className="max-w-[210mm] mx-auto bg-white text-black shadow-2xl p-[20mm] min-h-[297mm] transition-transform origin-top duration-300">
                                    {/* Paper Render IEEE Style */}
                                    <div className="font-serif leading-tight">
                                        {/* Title */}
                                        <h1 className="text-2xl font-bold text-center mb-6 uppercase tracking-wide">
                                            {inputs.research_topic || 'Untitled Research Paper'}
                                        </h1>

                                        {/* Authors */}
                                        <div className="flex flex-wrap justify-center gap-x-12 gap-y-4 mb-8 text-center px-10">
                                            {(inputs.authors || []).map((auth: any, i: number) => (
                                                <div key={i} className="text-sm">
                                                    <div className="font-bold italic text-base">{auth.name}</div>
                                                    <div className="italic text-xs text-gray-700">{auth.department}</div>
                                                    <div className="italic text-xs text-gray-700">{auth.institution}</div>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="columns-2 gap-8 text-justify text-[10pt] relative">
                                            {SECTION_DISPLAY_ORDER.map((sectionName) => {
                                                const realKey = findKey(sectionName);
                                                const content = realKey ? (generatedSections as any)[realKey] : null;
                                                if (!content) return null;

                                                return (
                                                    <div key={sectionName} className="mb-6 break-inside-avoid">
                                                        {/* Section Header */}
                                                        <h2 className="text-xs font-bold uppercase text-center border-b border-black/20 pb-0.5 mb-2 tracking-widest mt-2">
                                                            {sectionName}
                                                        </h2>
                                                        {/* Content */}
                                                        {/* Use a container with overflow handling for wide equations */}
                                                        <div className="whitespace-pre-wrap [&_.katex-display]:overflow-x-auto [&_.katex-display]:max-w-full [&_.katex-display]:overflow-y-hidden">
                                                            {/* Render with LaTeX support */}
                                                            <Latex strict={false}>{content}</Latex>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                            {/* Render any extra sections not in standard list */}
                                            {Object.keys(generatedSections).filter(k => !SECTION_DISPLAY_ORDER.some(o => o.toLowerCase() === k.toLowerCase())).map(section => (
                                                <div key={section} className="mb-6 break-inside-avoid">
                                                    <h2 className="text-xs font-bold uppercase text-center border-b border-black/20 pb-0.5 mb-2 tracking-widest mt-2">
                                                        {section}
                                                    </h2>
                                                    <div className="whitespace-pre-wrap [&_.katex-display]:overflow-x-auto [&_.katex-display]:max-w-full">
                                                        <Latex strict={false}>{(generatedSections as any)[section]}</Latex>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="h-full border border-white/10 rounded-lg overflow-hidden relative group">
                                    <div className="absolute top-0 right-0 p-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <div className="text-xs text-white/30 bg-black/50 px-2 py-1 rounded">Editable</div>
                                    </div>
                                    <Editor
                                        height="100%"
                                        defaultLanguage="latex"
                                        theme="vs-dark"
                                        value={editorContent}
                                        onChange={(val) => setEditorContent(val || '')}
                                        options={{
                                            readOnly: false,
                                            minimap: { enabled: true },
                                            fontSize: 14,
                                            fontFamily: 'JetBrains Mono, monospace',
                                            padding: { top: 20 },
                                            wordWrap: 'on',
                                            scrollBeyondLastLine: false,
                                            smoothScrolling: true
                                        }}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div >
        </ProtectedRoute >
    );
}
