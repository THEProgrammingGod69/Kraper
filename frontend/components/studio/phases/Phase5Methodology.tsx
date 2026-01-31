'use client';

import { usePaperStore } from '@/lib/store/paperStore';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Phase5Methodology() {
    const { inputs, updateInput } = usePaperStore();

    return (
        <div className="space-y-8">
            {/* Q14: Overall Approach */}
            <Card>
                <CardHeader>
                    <CardTitle>Overall Approach ⭐</CardTitle>
                    <CardDescription>
                        Describe your method in 3-5 sentences. What is your main idea? How does it work? What makes it different?
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Textarea
                        value={inputs.approach_overview || ''}
                        onChange={(e) => updateInput('approach_overview', e.target.value)}
                        rows={5}
                    />
                </CardContent>
            </Card>

            {/* Q15: System Steps */}
            <Card>
                <CardHeader>
                    <CardTitle>System Steps/Architecture ⭐</CardTitle>
                    <CardDescription>
                        What are the main steps or components in your system/method? List the workflow from input to output.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Textarea
                        placeholder={"Example:\n1. Data preprocessing: Clean and tokenize text\n2. Feature extraction: CNN processes embeddings\n3. Classification: Predict output label\n4. Post-processing: Generate confidence scores"}
                        value={inputs.system_workflow || ''}
                        onChange={(e) => updateInput('system_workflow', e.target.value)}
                        rows={7}
                    />
                </CardContent>
            </Card>

            {/* Q16: Algorithms */}
            <Card>
                <CardHeader>
                    <CardTitle>Algorithms and Techniques ⭐</CardTitle>
                    <CardDescription>
                        What specific algorithms or techniques do you use? For each: what is it and why did you choose it?
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Textarea
                        placeholder='e.g., "We use LSTM networks because they capture sequential dependencies better than standard RNNs"'
                        value={inputs.algorithms || ''}
                        onChange={(e) => updateInput('algorithms', e.target.value)}
                        rows={6}
                    />
                </CardContent>
            </Card>

            {/* Q17: Data */}
            <Card>
                <CardHeader>
                    <CardTitle>Data and Datasets ⚡</CardTitle>
                    <CardDescription>
                        What data does your research use? Include dataset name, size, and source (or how it would be collected).
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Textarea
                        value={inputs.dataset_details || ''}
                        onChange={(e) => updateInput('dataset_details', e.target.value)}
                        rows={4}
                    />
                </CardContent>
            </Card>

            {/* Q18: Tools */}
            <Card>
                <CardHeader>
                    <CardTitle>Implementation Tools ⚡</CardTitle>
                    <CardDescription>
                        What tools/technologies are you using? List programming languages, frameworks, platforms.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Textarea
                        placeholder="e.g., Python with TensorFlow, MATLAB, Arduino, AWS, etc."
                        value={inputs.tools_used || ''}
                        onChange={(e) => updateInput('tools_used', e.target.value)}
                        rows={3}
                    />
                </CardContent>
            </Card>

            {/* Q19: Validation */}
            <Card>
                <CardHeader>
                    <CardTitle>How Do You Validate Your Approach? ⚡</CardTitle>
                    <CardDescription>
                        How do you test or prove your method works? What experiments, metrics, or analyses?
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Textarea
                        value={inputs.validation_method || ''}
                        onChange={(e) => updateInput('validation_method', e.target.value)}
                        rows={5}
                    />
                </CardContent>
            </Card>
        </div>
    );
}
