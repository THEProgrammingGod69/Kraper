# AI-Powered Research Paper Generator - Backend

A complete backend system for generating academically-formatted research paper text using Retrieval-Augmented Generation (RAG) and cloud-hosted LLaMA 3 8B Instruct model.

## 🏗️ Architecture

```
┌─────────────┐
│   Client    │
│  (Frontend) │
└──────┬──────┘
       │ JSON Request
       ▼
┌─────────────────────────────────────┐
│     Node.js Express Server          │
│  (API Gateway - Port 3000)          │
│  • Request validation               │
│  • Orchestration                    │
│  • Response formatting              │
└────────────┬────────────────────────┘
             │ HTTP POST
             ▼
┌─────────────────────────────────────┐
│   Python Flask RAG Service          │
│     (AI Layer - Port 5000)          │
│  • PDF Processing                   │
│  • FAISS Vector Search              │
│  • Prompt Engineering               │
│  • LLaMA 3 8B API Calls             │
└─────────────────────────────────────┘
```

## 🎯 Key Features

- **Modular Design**: Strict separation between Node.js (orchestration) and Python (AI logic)
- **RAG Pipeline**: Retrieves relevant research paper context before generation
- **IEEE-Style Prompts**: Enforces academic writing standards (formal tone, third-person, citations)
- **Cloud LLM**: Supports Groq, Together AI, Fireworks AI, and OpenAI APIs
- **No GPU Required**: Uses CPU-based FAISS and Sentence-Transformers
- **Beginner-Friendly**: Clear code structure with extensive comments

## 📁 Project Structure

```
x:/AIBhoomi/Kraper2.0/
│
├── server/                          # Node.js Express API Gateway
│   ├── src/
│   │   ├── app.js                   # Main Express app
│   │   ├── routes.js                # API route definitions
│   │   ├── controllers/
│   │   │   └── generatorController.js
│   │   └── utils/
│   │       └── validator.js         # Joi validation schemas
│   ├── package.json
│   └── .env.example
│
└── rag_service/                     # Python RAG Microservice
    ├── core/
    │   ├── ingest.py                # PDF → FAISS pipeline
    │   ├── rag_pipeline.py          # Retrieval + Generation logic
    │   └── llm_client.py            # Cloud LLM abstraction
    ├── config/
    │   └── prompts.py               # IEEE-style prompt templates
    ├── data/
    │   ├── pdfs/                    # Place your 80 PDFs here
    │   └── faiss_index/             # Generated vector database
    ├── app.py                       # Flask API server
    ├── requirements.txt
    └── .env.example
```

## 🚀 Setup Instructions

### Prerequisites

- **Node.js** 18+ and npm
- **Python** 3.9+
- **Cloud LLM API Key** (Groq/Together/Fireworks)

### Step 1: Clone & Navigate

```bash
cd x:/AIBhoomi/Kraper2.0
```

### Step 2: Set Up Node.js Server

```bash
cd server
npm install
cp .env.example .env
```

Edit `server/.env` and configure:
```env
PORT=3000
PYTHON_SERVICE_URL=http://localhost:5000
```

### Step 3: Set Up Python RAG Service

```bash
cd ../rag_service
python -m venv venv
venv\Scripts\activate          # On Windows
# source venv/bin/activate     # On Linux/Mac

pip install -r requirements.txt
cp .env.example .env
```

Edit `rag_service/.env` and configure:
```env
LLM_PROVIDER=groq              # or together, fireworks
GROQ_API_KEY=your_api_key_here
MODEL_NAME=llama-3.1-8b-instant
```

### Step 4: Add Research Papers

Place your 80 research paper PDFs in:
```
rag_service/data/pdfs/
```

### Step 5: Build FAISS Index

**⚠️ Run this ONCE before starting the server:**

```bash
cd rag_service
python core/ingest.py
```

This will:
- Load all PDFs
- Chunk the text
- Create embeddings (using HuggingFace model)
- Build and save FAISS vector database

Expected output:
```
✓ Processed PDFs: 240 pages
✓ Total chunks: 1523
✓ Index saved to: ./data/faiss_index
```

### Step 6: Start Both Services

**Terminal 1 (Python RAG Service):**
```bash
cd rag_service
python app.py
```

**Terminal 2 (Node.js Server):**
```bash
cd server
npm start
```

## 📡 API Usage

### Endpoint: `POST /api/v1/generate`

**Request:**
```json
{
  "research_domain": "Computer Vision",
  "problem_statement": "Object detection in low-light conditions",
  "methodology": "Enhanced YOLO with attention mechanisms",
  "dataset_description": "Custom dataset with 10,000 images",
  "evaluation_metrics": "mAP, Precision, Recall, F1-Score",
  "target_section": "Abstract",
  "max_tokens": 800
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "generated_text": "Object detection in...",
    "section": "Abstract",
    "metadata": {
      "research_domain": "Computer Vision",
      "retrieved_chunks": 5,
      "model_used": "llama-3.1-8b-instant",
      "processing_time_ms": 3241,
      "timestamp": "2026-01-31T08:05:12.345Z"
    }
  }
}
```

### Health Check: `GET /api/v1/status`

```json
{
  "node_service": "healthy",
  "python_service": "healthy",
  "python_url": "http://localhost:5000"
}
```

## 🔧 Configuration Options

### Supported Sections

- `Abstract`
- `Introduction`
- `Literature Review`
- `Methodology`
- `Results`
- `Discussion`
- `Conclusion`
- `Future Work`

### Environment Variables

**Node.js (`server/.env`):**
- `PORT`: Server port (default: 3000)
- `PYTHON_SERVICE_URL`: Python service URL
- `REQUEST_TIMEOUT`: Timeout in ms (default: 120000)

**Python (`rag_service/.env`):**
- `LLM_PROVIDER`: groq | together | fireworks | openai
- `GROQ_API_KEY`: Your Groq API key
- `MODEL_NAME`: llama-3.1-8b-instant (or other compatible model)
- `CHUNK_SIZE`: Text chunk size (default: 1000)
- `CHUNK_OVERLAP`: Overlap between chunks (default: 200)
- `TOP_K_RETRIEVAL`: Number of chunks to retrieve (default: 5)
- `TEMPERATURE`: LLM temperature (default: 0.3)

## 🧪 Testing

### Test Python Service Directly

```bash
curl -X POST http://localhost:5000/generate \
  -H "Content-Type: application/json" \
  -d '{
    "research_domain": "Machine Learning",
    "problem_statement": "Sentiment analysis on social media",
    "methodology": "BERT-based transformer model",
    "dataset_description": "Twitter dataset with 50k tweets",
    "evaluation_metrics": "Accuracy, F1-Score",
    "target_section": "Abstract"
  }'
```

### Test Node.js Gateway

```bash
curl -X POST http://localhost:3000/api/v1/generate \
  -H "Content-Type: application/json" \
  -d @test_request.json
```

## 🎓 Academic Writing Standards

The system enforces **IEEE-style academic writing**:

✅ **Required:**
- Third-person narrative only
- Passive voice ("The system was designed...")
- Formal technical language
- Structured sections following IEEE format
- Citation placeholders ([1], [2])

❌ **Forbidden:**
- First-person ("I", "we", "our")
- Casual language
- Fabricated experimental results
- Unsupported claims

## 🔌 Integration with Frontend

This backend is **frontend-agnostic**. Connect any frontend framework:

**Example (React/Next.js):**
```javascript
const response = await fetch('http://localhost:3000/api/v1/generate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    research_domain: 'NLP',
    problem_statement: '...',
    methodology: '...',
    dataset_description: '...',
    evaluation_metrics: '...',
    target_section: 'Abstract'
  })
});

const data = await response.json();
console.log(data.data.generated_text);
```

## 🛠️ Troubleshooting

### Python service unreachable
- Ensure both services are running
- Check `PYTHON_SERVICE_URL` in Node `.env`
- Verify ports 3000 and 5000 are not in use

### FAISS index not found
- Run `python core/ingest.py` first
- Check `FAISS_INDEX_PATH` in Python `.env`

### LLM API errors
- Verify API key in `.env`
- Check API quota/limits
- Test with curl directly

### PDF ingestion fails
- Ensure PDFs are in `rag_service/data/pdfs/`
- Check file permissions
- Verify PDF files are not corrupted

## 📚 Technology Stack

**Backend Framework:**
- Express.js (Node.js)
- Flask (Python)

**Validation & Security:**
- Joi (request validation)
- Helmet (security headers)
- CORS (cross-origin)

**AI/ML:**
- LangChain (RAG orchestration)
- FAISS (vector database)
- Sentence-Transformers (embeddings)
- Cloud LLM APIs (inference)

## 📝 Code Explanations

### Node.js Flow
1. **app.js**: Sets up Express with middleware
2. **routes.js**: Defines `/generate` endpoint
3. **validator.js**: Validates questionnaire with Joi
4. **generatorController.js**: Forwards request to Python, handles errors

### Python Flow
1. **app.py**: Flask server with `/generate` endpoint
2. **rag_pipeline.py**: Orchestrates retrieval + generation
3. **llm_client.py**: Abstracts cloud API calls
4. **prompts.py**: Contains IEEE-style templates
5. **ingest.py**: One-time PDF → FAISS conversion

## 🎯 Design Decisions

1. **Why separate Node and Python?**
   - Node: Better for web/API handling
   - Python: Superior AI/ML ecosystem

2. **Why FAISS over other vector DBs?**
   - CPU-friendly (no GPU needed)
   - Fast similarity search
   - Simple to deploy

3. **Why Cloud LLM instead of local?**
   - No GPU requirement (per constraints)
   - Better performance
   - Lower maintenance

4. **Why strict prompt engineering?**
   - Ensures academic quality
   - Prevents hallucinations
   - Maintains IEEE standards

## 🚀 Next Steps

- [ ] Add authentication/authorization
- [ ] Implement caching for repeated queries
- [ ] Add support for multiple vector stores
- [ ] Create frontend UI
- [ ] Add monitoring/logging
- [ ] Deploy to cloud (AWS/Azure/GCP)

## 📄 License

MIT License - Free for educational and commercial use.

---

**Built for college final-year AI projects** 🎓

For questions or issues, refer to the inline code comments or check the logs.
