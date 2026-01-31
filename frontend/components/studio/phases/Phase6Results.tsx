'use client';

import { usePaperStore } from '@/lib/store/paperStore';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Phase6Results() {
    const { inputs, updateInput } = usePaperStore();

    return (
        <div className="space-y-8">
            {/* Q20: Quantitative Results */}
            <Card>
                <CardHeader>
                    <CardTitle>Quantitative Results ⭐</CardTitle>
                    <CardDescription>
                        What are your numerical results? For completed work: actual measurements. For hypothetical: expected results.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Textarea
                        placeholder={"Example:\nAccuracy: 87.3% (baseline: 72.1%)\nProcessing time: 45ms (baseline: 120ms)"}
                        value={inputs.quantitative_results || ''}
                        onChange={(e) => updateInput('quantitative_results', e.target.value)}
                        rows={6}
                    />
                </CardContent>
            </Card>

            {/* Q21: Interpretation */}
            <Card>
                <CardHeader>
                    <CardTitle>Result Interpretation ⭐</CardTitle>
                    <CardDescription>
                        What do these results mean? Explain in 3-5 sentences: Why are results good/significant? What do they tell us?
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Textarea
                        value={inputs.result_interpretation || ''}
                        onChange={(e) => updateInput('result_interpretation', e.target.value)}
                        rows={5}
                    />
                </CardContent>
            </Card>

            {/* Q22: Comparison */}
            <Card>
                <CardHeader>
                    <CardTitle>Comparison Analysis ⚡</CardTitle>
                    <CardDescription>
                        How do your results compare to existing methods and why?
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Textarea
                        placeholder='e.g., "Our approach outperforms Method X by 15% because it handles Y better. Method Z is more accurate but 3x slower."'
                        value={inputs.comparison_analysis || ''}
                        onChange={(e) => updateInput('comparison_analysis', e.target.value)}
                        rows={4}
                    />
                </CardContent>
            </Card>
        </div>
    );
}
