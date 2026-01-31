import axios from 'axios';
import type { QuestionnaireInputs, GenerationResponse } from '@/lib/types';

// BYPASS NODE.JS - Connect DIRECTLY to Python service
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5002';

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 600000, // 10 minutes for full paper generation
});

// Request interceptor
apiClient.interceptors.request.use(
    (config) => {
        // Add auth token if available
        const token = localStorage.getItem('auth_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Handle unauthorized
            localStorage.removeItem('auth_token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export const paperApi = {
    /**
     * Generate a complete research paper - DIRECT Python call
     */
    generatePaper: async (inputs: QuestionnaireInputs): Promise<GenerationResponse> => {
        const response = await apiClient.post('/generate', inputs);
        // Python returns { paper_sections: {...}, metadata: {...} }
        // Transform to match our frontend expectation
        return {
            success: true,
            data: {
                generated_text: response.data.paper_sections,
                metadata: response.data.metadata
            }
        };
    },

    /**
     * Check API health - Python service
     */
    healthCheck: async (): Promise<{ status: string }> => {
        const response = await apiClient.get('/health');
        return response.data;
    },

    /**
     * Future: Refine paper with Model-2
     */
    refinePaper: async (content: string): Promise<{ refined: string }> => {
        const response = await apiClient.post('/api/v1/refine', { content });
        return response.data;
    },
};

export default apiClient;
