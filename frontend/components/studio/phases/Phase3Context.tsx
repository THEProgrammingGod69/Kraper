'use client';

import { usePaperStore } from '@/lib/store/paperStore';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Phase3Context() {
    const { inputs, updateInput } = usePaperStore();

    return (
        <div className="space-y-8">
            {/* Q8: Background */}
            <Card>
                <CardHeader>
                    <CardTitle>Background Information ⭐</CardTitle>
                    <CardDescription>
                        What background should readers know to understand your research? (4-6 sentences)
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Textarea
                        placeholder="What is the general technology/area? What are the basic concepts? What has been done before?"
                        value={inputs.background_info || ''}
                        onChange={(e) => updateInput('background_info', e.target.value)}
                        rows={6}
                    />
                </CardContent>
            </Card>

            {/* Q9: Problem Statement */}
            <Card>
                <CardHeader>
                    <CardTitle>Specific Problem Statement ⭐</CardTitle>
                    <CardDescription>
                        What is the exact problem or gap your research addresses? (3-5 sentences)
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Textarea
                        placeholder="What is currently inadequate? Why is this a problem? What challenges exist?"
                        value={inputs.specific_problem || ''}
                        onChange={(e) => updateInput('specific_problem', e.target.value)}
                        rows={5}
                    />
                </CardContent>
            </Card>

            {/* Q10: Objectives */}
            <Card>
                <CardHeader>
                    <CardTitle>Research Objectives ⭐</CardTitle>
                    <CardDescription>
                        What are your specific goals? List 3-5 objectives.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Textarea
                        placeholder={"Example:\n1. Develop a method to...\n2. Achieve X% accuracy on...\n3. Reduce processing time to...\n4. Compare performance against..."}
                        value={inputs.objectives || ''}
                        onChange={(e) => updateInput('objectives', e.target.value)}
                        rows={6}
                    />
                </CardContent>
            </Card>
        </div>
    );
}
