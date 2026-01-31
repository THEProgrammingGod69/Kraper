# Quick Start Guide

## ✅ Setup Complete!

Your backend is now configured and ready. Here's what we've done:

### Configuration ✓
- [x] API Key: Groq configured
- [x] Node.js dependencies installed  
- [x] Python dependencies installed
- [x] Environment files created

## 🚀 Next Steps

### 1. Add Research Papers

Place your **80 research paper PDFs** in:
```
x:\AIBhoomi\Kraper2.0\rag_service\data\pdfs\
```

**Don't have PDFs yet?** You can test with just a few PDFs first.

### 2. Run Ingestion (One-Time Setup)

This creates the FAISS vector database from your PDFs:

```powershell
cd x:\AIBhoomi\Kraper2.0\rag_service
python core/ingest.py
```

**Expected output:**
```
✓ Processed PDFs: 240 pages
✓ Total chunks: 1523
✓ Index saved to: ./data/faiss_index
```

### 3. Start the Python Service

```powershell
cd x:\AIBhoomi\Kraper2.0\rag_service
python app.py
```

You should see:
```
🤖 LLM Client initialized: groq (llama3-8b-8192)
✓ RAG pipeline ready!
🐍 Starting Python RAG Service
```

**Keep this terminal open!**

### 4. Start the Node.js Service (New Terminal)

Open a **second terminal**:

```powershell
cd x:\AIBhoomi\Kraper2.0\server
npm start
```

You should see:
```
🚀 Research Paper Generator API
✓ Server running on port 3000
```

### 5. Test the System

```powershell
curl -X POST http://localhost:3000/api/v1/generate -H "Content-Type: application/json" -d @test_request.json
```

## 🔍 Quick Health Check

```powershell
# Check if Python service is running
curl http://localhost:5000/health

# Check if Node service can reach Python
curl http://localhost:3000/api/v1/status
```

## 📊 Current Configuration

**Model**: LLaMA 3 8B Instruct  
**Provider**: Groq (ultra-fast)  
**Embedding Model**: all-MiniLM-L6-v2  
**Vector DB**: FAISS (local)  
**Chunk Size**: 1000 chars  
**Top-K Retrieval**: 5 chunks  

## ⚠️ Troubleshooting

**"FAISS index not found"**  
→ Run `python core/ingest.py` first

**"No PDF files found"**  
→ Add PDFs to `data/pdfs/` directory

**"Python service unreachable"**  
→ Make sure Python Flask is running on port 5000

## 📝 What's Next?

Once both services are running, you can:
1. Test with the sample request
2. Integrate with a frontend
3. Customize prompts in `config/prompts.py`
4. Adjust RAG parameters in `.env`
