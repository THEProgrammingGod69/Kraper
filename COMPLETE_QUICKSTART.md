# KRAPER - Complete System Quick Start Guide

## System Architecture

```
┌─────────────────┐
│   Frontend      │  Port 3001 (Next.js)
│   (React/Next)  │
└────────┬────────┘
         │ HTTP
         ▼
┌─────────────────┐
│  Node.js API    │  Port 3000 (Express)
│  (Gateway)      │
└────────┬────────┘
         │ HTTP
         ▼
┌─────────────────┐
│  Python RAG     │  Port 5000 (Flask)
│  (LLaMA 3.1)    │
└─────────────────┘
```

## Prerequisites

- Node.js 18+ installed
- Python 3.9+ installed
- Groq API key configured

## Step 1: Start Backend Services

### Terminal 1: Python RAG Service
```powershell
cd x:\AIBhoomi\Kraper2.0\rag_service
python app.py
```

**Expected Output:**
```
✓ Embeddings loaded
✓ FAISS index loaded
✓ Flask app running on http://127.0.0.1:5000
```

### Terminal 2: Node.js Gateway
```powershell
cd x:\AIBhoomi\Kraper2.0\server
npm start
```

**Expected Output:**
```
✓ Server running on port 3000
✓ Connected to Python service
```

## Step 2: Start Frontend

### Terminal 3: Next.js Frontend
```powershell
cd x:\AIBhoomi\Kraper2.0\frontend
npm run dev
```

**Expected Output:**
```
✓ Ready in 11.2s
▲ Next.js 16.1.6 (Turbopack)
- Local: http://localhost:3001
```

## Step 3: Access the Application

Open your browser and navigate to:

**http://localhost:3001**

## User Flow

### 1. Landing Page
- View animated KRAPER logo
- Click **"Start Drafting"**

### 2. Dashboard
- Click **"Create Research Paper"** card

### 3. Questionnaire (8 Phases)
Fill out the 29 questions:

**Phase 1: Core Identity**
- Research Domain
- Research Topic
- Research Type
- Completion Status

**Phase 2: Motivation**
- Problem Importance
- Key Contribution
- Key Results

**Phase 3: Context**
- Background Information
- Specific Problem
- Research Objectives

**Phase 4: Literature**
- Existing Approaches
- Prior Limitations
- Comparison Baselines

**Phase 5: Methodology**
- Overall Approach
- System Workflow
- Algorithms & Techniques
- Dataset Details
- Implementation Tools
- Validation Method

**Phase 6: Results**
- Quantitative Results
- Result Interpretation
- Comparison Analysis

**Phase 7: Conclusion**
- Current Limitations
- Future Work
- Key Takeaways

**Phase 8: Optional**
- Formal Problem Definition
- Architecture Details
- Ethical Considerations
- Special Requirements

### 4. Workspace
- View **split-screen** layout
- **Left**: Your questionnaire inputs
- **Right**: Generated paper preview
- Toggle between **IEEE** and **Springer** formatting
- Click **Export** to download JSON

## Example Test Data

For quick testing, use this sample data:

**Domain:** Artificial Intelligence  
**Topic:** Detecting fake news using deep learning  
**Type:** Experimental/Empirical  
**Status:** Completed  

**Problem Importance:**  
"Fake news spreads rapidly on social media, influencing public opinion and elections. Current detection methods rely on manual fact-checking, which is slow and doesn't scale. Automated solutions are needed."

**Key Contribution:**  
"A novel CNN-LSTM hybrid model that achieves 94% accuracy in detecting fake news by analyzing both textual content and propagation patterns."

**Key Results:**  
"Achieved 94.2% accuracy on the FakeNewsNet dataset, outperforming BERT-base (87.3%) and traditional SVM (72.1%). Processing time: 45ms per article."

*(Fill remaining fields with relevant content)*

## Troubleshooting

### Frontend won't start
```powershell
cd frontend
rm -r node_modules .next
npm install
npm run dev
```

### Backend connection error
- Check that Node.js server is running on port 3000
- Check that Python service is running on port 5000
- Verify `.env.local` has `NEXT_PUBLIC_API_URL=http://localhost:3000`

### Paper generation fails
- Check Python service logs for errors
- Verify Groq API key is set in `rag_service/.env`
- Check rate limits (wait 1 minute between requests)

## Environment Variables

### Frontend (`.env.local`)
```bash
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### Backend (`server/.env`)
```bash
PORT=3000
PYTHON_SERVICE_URL=http://localhost:5000
REQUEST_TIMEOUT=300000
```

### RAG Service (`rag_service/.env`)
```bash
FLASK_PORT=5000
MODEL_NAME=llama-3.1-8b-instant
GROQ_API_KEY=your_groq_api_key_here
```

## Ports Summary

| Service | Port | URL |
|---------|------|-----|
| Frontend | 3001 | http://localhost:3001 |
| Node.js API | 3000 | http://localhost:3000 |
| Python RAG | 5000 | http://localhost:5000 |

## Health Checks

### Check Frontend
```
http://localhost:3001
```

### Check Node.js API
```
http://localhost:3000/api/v1/status
```

### Check Python Service
```
http://localhost:5000/health
```

## Development Tips

1. **Auto-save**: Questionnaire answers are saved to localStorage automatically
2. **Hot Reload**: Frontend updates instantly when you edit code
3. **State Reset**: Clear browser localStorage to reset questionnaire
4. **API Logs**: Check terminal windows for request/response logs
5. **Error Messages**: Look for red error toasts in the UI

## Production Deployment

### Frontend (Vercel)
```bash
cd frontend
npm run build
vercel deploy
```

### Backend (Railway/Render)
```bash
cd server
npm run build
# Deploy to your platform
```

### RAG Service (Railway/Render)
```bash
cd rag_service
# Deploy Python Flask app
```

## Support

For issues or questions:
1. Check terminal logs for errors
2. Verify all services are running
3. Check browser console (F12)
4. Review API responses in Network tab

---

**You're all set!** 🚀

The complete KRAPER system is now running. Create your first research paper by filling out the questionnaire and watching the AI generate your academic paper in real-time.
