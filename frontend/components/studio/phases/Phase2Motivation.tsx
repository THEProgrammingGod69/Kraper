'use client';

import { usePaperStore } from '@/lib/store/paperStore';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Phase2Motivation() {
    const { inputs, updateInput } = usePaperStore();

    return (
        <div className="space-y-8">
            {/* Q5: Importance */}
            <Card>
                <CardHeader>
                    <CardTitle>Why Is This Research Important? ⭐</CardTitle>
                    <CardDescription>
                        What real-world problem does this address? Why does it matter? Explain in 2-4 sentences.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Textarea
                        placeholder="What problem exists? Why is it a problem? Why are current solutions inadequate?"
                        value={inputs.problem_importance || ''}
                        onChange={(e) => updateInput('problem_importance', e.target.value)}
                        rows={4}
                    />
                </CardContent>
            </Card>

            {/* Q6: Contribution */}
            <Card>
                <CardHeader>
                    <CardTitle>What Is Your Main Contribution? ⭐</CardTitle>
                    <CardDescription>
                        What is the main thing your research contributes? Write 1-2 sentences.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Textarea
                        placeholder='e.g., "A new algorithm that..." or "A system that improves..." or "Evidence that shows..."'
                        value={inputs.key_contribution || ''}
                        onChange={(e) => updateInput('key_contribution', e.target.value)}
                        rows={3}
                    />
                </CardContent>
            </Card>

            {/* Q7: Results */}
            <Card>
                <CardHeader>
                    <CardTitle>What Are Your Key Results? ⚡</CardTitle>
                    <CardDescription>
                        For completed work: Provide actual results. For hypothetical: Provide expected outcomes. Include numbers/metrics if available.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Textarea
                        placeholder='e.g., "Achieved 94% accuracy" or "Expected to reduce latency by 20%"'
                        value={inputs.key_results || ''}
                        onChange={(e) => updateInput('key_results', e.target.value)}
                        rows={4}
                    />
                </CardContent>
            </Card>
        </div>
    );
}
