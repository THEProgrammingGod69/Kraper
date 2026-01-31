'use client';

import { usePaperStore } from '@/lib/store/paperStore';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from "@/components/ui/button";

const researchTypes = [
    { value: 'Experimental/Empirical', label: 'Experimental/Empirical', desc: 'I conducted experiments' },
    { value: 'Design/Implementation', label: 'Design/Implementation', desc: 'I built a system/prototype' },
    { value: 'Theoretical/Conceptual', label: 'Theoretical/Conceptual', desc: 'Proposing a new theory/framework' },
    { value: 'Simulation-based', label: 'Simulation-based', desc: 'Computer modeling' },
    { value: 'Hypothetical/Proposed', label: 'Hypothetical/Proposed', desc: 'System not yet implemented' },
    { value: 'Survey/Review', label: 'Survey/Review', desc: 'Analyzing existing research' },
];

const completionStatuses = [
    { value: 'Completed', label: 'Completed', desc: 'I have actual results' },
    { value: 'Hypothetical', label: 'Hypothetical', desc: 'This is a proposed approach' },
    { value: 'Partially complete', label: 'Partially Complete', desc: 'Some parts done, some hypothetical' },
];

export default function Phase1CoreIdentity() {
    const { inputs, updateInput } = usePaperStore();

    const addAuthor = () => {
        const currentAuthors = inputs.authors || [];
        updateInput('authors', [...currentAuthors, { name: '', email: '', department: '', institution: '' }]);
    };

    const removeAuthor = (index: number) => {
        const currentAuthors = inputs.authors || [];
        if (currentAuthors.length > 1) {
            updateInput('authors', currentAuthors.filter((_, i) => i !== index));
        }
    };

    const updateAuthor = (index: number, field: string, value: string) => {
        const currentAuthors = inputs.authors || [];
        const newAuthors = [...currentAuthors];
        newAuthors[index] = { ...newAuthors[index], [field]: value };
        updateInput('authors', newAuthors);
    };

    const authors = inputs.authors || [{ name: '', email: '', department: '', institution: '' }];

    return (
        <div className="space-y-8">
            {/* Authors Section */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-xl font-medium text-white">Authors 👥</h3>
                    <Button variant="outline" size="sm" onClick={addAuthor} className="border-nebula-500/30 text-nebula-400">
                        + Add Author
                    </Button>
                </div>

                {authors.map((author, index) => (
                    <Card key={index} className="relative group">
                        {authors.length > 1 && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeAuthor(index)}
                                className="absolute right-2 top-2 text-red-500 hover:text-red-400 hover:bg-red-500/10 z-10"
                            >
                                ✕
                            </Button>
                        )}
                        <CardHeader>
                            <CardTitle className="text-base">Author {index + 1}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Full Name</Label>
                                    <Input
                                        placeholder="e.g. Dr. Jane Doe"
                                        value={author.name}
                                        onChange={(e) => updateAuthor(index, 'name', e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Email Address</Label>
                                    <Input
                                        placeholder="jane.doe@university.edu"
                                        value={author.email}
                                        onChange={(e) => updateAuthor(index, 'email', e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Department</Label>
                                    <Input
                                        placeholder="e.g. Dept. of Computer Science"
                                        value={author.department}
                                        onChange={(e) => updateAuthor(index, 'department', e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Institution / Company</Label>
                                    <Input
                                        placeholder="e.g. Stanford University"
                                        value={author.institution}
                                        onChange={(e) => updateAuthor(index, 'institution', e.target.value)}
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Q1: Domain */}
            <Card>
                <CardHeader>
                    <CardTitle>Research Domain ⭐</CardTitle>
                    <CardDescription>
                        What is the general field of your research?
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Input
                        placeholder="e.g., Artificial Intelligence, Computer Networks, Biomedical Engineering..."
                        value={inputs.domain || ''}
                        onChange={(e) => updateInput('domain', e.target.value)}
                    />
                </CardContent>
            </Card>

            {/* Q2: Topic */}
            <Card>
                <CardHeader>
                    <CardTitle>Research Topic ⭐</CardTitle>
                    <CardDescription>
                        What specific problem or topic are you researching? Describe in one sentence.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Input
                        placeholder='e.g., "Detecting fake news using deep learning" or "Improving battery life in IoT sensors"'
                        value={inputs.research_topic || ''}
                        onChange={(e) => updateInput('research_topic', e.target.value)}
                    />
                </CardContent>
            </Card>

            {/* Q3: Research Type */}
            <Card>
                <CardHeader>
                    <CardTitle>Research Type ⭐</CardTitle>
                    <CardDescription>
                        What type of research is this? Choose one:
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid md:grid-cols-2 gap-3">
                        {researchTypes.map((type) => (
                            <button
                                key={type.value}
                                onClick={() => updateInput('research_type', type.value as any)}
                                className={`p-4 rounded-xl border text-left transition-all ${inputs.research_type === type.value
                                    ? 'border-nebula-500 bg-nebula-500/10 shadow-[0_0_15px_rgba(99,102,241,0.2)]'
                                    : 'border-white/10 hover:border-white/20 hover:bg-white/5'
                                    }`}
                            >
                                <div className="font-medium mb-1">{type.label}</div>
                                <div className="text-sm text-gray-600">{type.desc}</div>
                            </button>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Q4: Completion Status */}
            <Card>
                <CardHeader>
                    <CardTitle>Is Your Work Complete or Hypothetical? ⭐</CardTitle>
                    <CardDescription>
                        Choose one:
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid md:grid-cols-3 gap-3">
                        {completionStatuses.map((status) => (
                            <button
                                key={status.value}
                                onClick={() => updateInput('completion_status', status.value as any)}
                                className={`p-4 rounded-xl border text-left transition-all ${inputs.completion_status === status.value
                                    ? 'border-nebula-500 bg-nebula-500/10 shadow-[0_0_15px_rgba(99,102,241,0.2)]'
                                    : 'border-white/10 hover:border-white/20 hover:bg-white/5'
                                    }`}
                            >
                                <div className="font-medium mb-1">{status.label}</div>
                                <div className="text-sm text-gray-600">{status.desc}</div>
                            </button>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
