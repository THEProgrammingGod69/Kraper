# Test Commands for Research Paper Generator

## Quick Test (PowerShell)

### Method 1: Using Invoke-RestMethod (Recommended for PowerShell)

```powershell
$body = Get-Content test_request.json -Raw
Invoke-RestMethod -Uri http://localhost:3000/api/v1/generate -Method Post -Body $body -ContentType "application/json"
```

### Method 2: Using curl (if installed separately)

```bash
curl.exe -X POST http://localhost:3000/api/v1/generate -H "Content-Type: application/json" -d "@test_request.json"
```

### Method 3: Manual Test with Simple JSON

```powershell
$json = @{
    research_domain = "Natural Language Processing"
    problem_statement = "Sentiment analysis on social media"
    methodology = "BERT-based transformer model"
    dataset_description = "Twitter dataset with 50k tweets"
    evaluation_metrics = "Accuracy, F1-Score"
    target_section = "Abstract"
} | ConvertTo-Json

Invoke-RestMethod -Uri http://localhost:3000/api/v1/generate -Method Post -Body $json -ContentType "application/json"
```

## Alternative: Use Postman or VS Code REST Client

### Postman
1. Create a new POST request
2. URL: `http://localhost:3000/api/v1/generate`
3. Headers: `Content-Type: application/json`
4. Body: Copy content from `test_request.json`
5. Click Send

### VS Code REST Client Extension
Create a file `test.http`:

```http
POST http://localhost:3000/api/v1/generate
Content-Type: application/json

{
  "research_domain": "Natural Language Processing",
  "problem_statement": "Sentiment analysis on social media",
  "methodology": "BERT-based transformer model",
  "dataset_description": "Twitter dataset with 50k tweets",
  "evaluation_metrics": "Accuracy, F1-Score",
  "target_section": "Abstract"
}
```

## Expected Response

```json
{
  "success": true,
  "data": {
    "generated_text": "Sentiment analysis on social media platforms has emerged as a critical research area...",
    "section": "Abstract",
    "metadata": {
      "research_domain": "Natural Language Processing",
      "retrieved_chunks": 5,
      "model_used": "llama3-8b-8192",
      "processing_time_ms": 3241,
      "timestamp": "2026-01-31T..."
    }
  }
}
```

## Troubleshooting

If you get errors, check:
1. Both services are running (Node.js on 3000, Python on 5000)
2. Python service logs for errors
3. API key is valid in `rag_service/.env`
