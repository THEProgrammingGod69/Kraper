'use client';

import { usePaperStore } from '@/lib/store/paperStore';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Phase4Literature() {
    const { inputs, updateInput } = usePaperStore();

    return (
        <div className="space-y-8">
            {/* Q11: Existing Approaches */}
            <Card>
                <CardHeader>
                    <CardTitle>Existing Approaches ⭐</CardTitle>
                    <CardDescription>
                        What are 3-5 existing methods/systems related to your research? For each: what it does, what technique it uses, its main limitation.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Textarea
                        placeholder={'Example:\n"Method A uses rule-based matching. It\'s fast but cannot handle complex patterns. Accuracy is only 60%."'}
                        value={inputs.related_approaches || ''}
                        onChange={(e) => updateInput('related_approaches', e.target.value)}
                        rows={8}
                    />
                </CardContent>
            </Card>

            {/* Q12: Limitations */}
            <Card>
                <CardHeader>
                    <CardTitle>Limitations in Prior Work ⭐</CardTitle>
                    <CardDescription>
                        What specific weaknesses in previous research does your work address? List 3-5 specific limitations.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Textarea
                        placeholder="What doesn't work well? What hasn't been tried? What can't existing methods do?"
                        value={inputs.prior_limitations || ''}
                        onChange={(e) => updateInput('prior_limitations', e.target.value)}
                        rows={6}
                    />
                </CardContent>
            </Card>

            {/* Q13: Baselines */}
            <Card>
                <CardHeader>
                    <CardTitle>Comparison Baselines ⚡</CardTitle>
                    <CardDescription>
                        Which existing methods will you compare your approach against? Name 2-4 methods.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Textarea
                        placeholder='e.g., "BERT-base model, Standard SVM classifier, Industry-standard method X"'
                        value={inputs.comparison_baselines || ''}
                        onChange={(e) => updateInput('comparison_baselines', e.target.value)}
                        rows={3}
                    />
                </CardContent>
            </Card>
        </div>
    );
}
