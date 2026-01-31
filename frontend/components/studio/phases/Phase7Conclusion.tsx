'use client';

import { usePaperStore } from '@/lib/store/paperStore';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Phase7Conclusion() {
    const { inputs, updateInput } = usePaperStore();

    return (
        <div className="space-y-8">
            {/* Q23: Limitations */}
            <Card>
                <CardHeader>
                    <CardTitle>Current Limitations ⭐</CardTitle>
                    <CardDescription>
                        What are 3-5 limitations of your research? Be honest about what your approach can't do or assumptions that limit it.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Textarea
                        placeholder={'Example:\n- Only works on English text\n- Requires GPU for real-time use\n- Not tested beyond 10,000 samples'}
                        value={inputs.current_limitations || ''}
                        onChange={(e) => updateInput('current_limitations', e.target.value)}
                        rows={6}
                    />
                </CardContent>
            </Card>

            {/* Q24: Future Work */}
            <Card>
                <CardHeader>
                    <CardTitle>Future Research Directions ⭐</CardTitle>
                    <CardDescription>
                        What are 3-5 next steps or future improvements?
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Textarea
                        placeholder={"Examples:\n- Extend to multi-lingual support\n- Test on larger datasets\n- Implement on mobile devices\n- Address limitation X"}
                        value={inputs.future_work || ''}
                        onChange={(e) => updateInput('future_work', e.target.value)}
                        rows={6}
                    />
                </CardContent>
            </Card>

            {/* Q25: Key Takeaways */}
            <Card>
                <CardHeader>
                    <CardTitle>Key Takeaways ⭐</CardTitle>
                    <CardDescription>
                        What are the 3-5 most important points from your research? Summarize: problem addressed, what you did, what you achieved, why it matters.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Textarea
                        value={inputs.conclusion_summary || ''}
                        onChange={(e) => updateInput('conclusion_summary', e.target.value)}
                        rows={6}
                    />
                </CardContent>
            </Card>
        </div>
    );
}
