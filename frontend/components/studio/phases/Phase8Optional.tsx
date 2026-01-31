'use client';

import { usePaperStore } from '@/lib/store/paperStore';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Phase8Optional() {
    const { inputs, updateInput } = usePaperStore();

    return (
        <div className="space-y-8">
            <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">Optional Details</h3>
                <p className="text-gray-600">These questions are optional. Skip if not applicable to your research.</p>
            </div>

            {/* Q26: Formal Problem Definition */}
            <Card>
                <CardHeader>
                    <CardTitle>Formal Problem Definition ➕</CardTitle>
                    <CardDescription>
                        Can you formally define the problem? (Input, Output, Constraints)
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Textarea
                        placeholder="Input: What data is given?\nOutput: What should be produced?\nConstraints: What limitations?"
                        value={inputs.formal_problem_def || ''}
                        onChange={(e) => updateInput('formal_problem_def', e.target.value)}
                        rows={5}
                    />
                </CardContent>
            </Card>

            {/* Q27: Architecture Details */}
            <Card>
                <CardHeader>
                    <CardTitle>System Architecture Details ➕</CardTitle>
                    <CardDescription>
                        (Only if you built a system) Describe main modules/components, how they connect, data flow.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Textarea
                        value={inputs.architecture_details || ''}
                        onChange={(e) => updateInput('architecture_details', e.target.value)}
                        rows={6}
                    />
                </CardContent>
            </Card>

            {/* Q28: Ethical Considerations */}
            <Card>
                <CardHeader>
                    <CardTitle>Ethical Considerations ➕</CardTitle>
                    <CardDescription>
                        Are there ethical implications or bias concerns? (Privacy issues, potential biases, misuse concerns)
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Textarea
                        value={inputs.ethical_considerations || ''}
                        onChange={(e) => updateInput('ethical_considerations', e.target.value)}
                        rows={4}
                    />
                </CardContent>
            </Card>

            {/* Q29: Special Requirements */}
            <Card>
                <CardHeader>
                    <CardTitle>Special Requirements ➕</CardTitle>
                    <CardDescription>
                        Any other specific needs for the paper?
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Textarea
                        placeholder='e.g., "Must emphasize real-time capabilities", "Focus on practical applications"'
                        value={inputs.special_requirements || ''}
                        onChange={(e) => updateInput('special_requirements', e.target.value)}
                        rows={3}
                    />
                </CardContent>
            </Card>
        </div>
    );
}
