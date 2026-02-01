"""
RAG Pipeline - Retrieval Augmented Generation

Core logic for:
1. Loading FAISS vector store
2. Performing similarity search
3. Constructing prompts
4. Generating text with LLM
"""

import os
import time
from pathlib import Path
from dotenv import load_dotenv

from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS

from .llm_client import get_llm_client
from config.prompts import SYSTEM_PROMPT, build_generation_prompt

# Load environment
load_dotenv()

# Configuration
FAISS_INDEX_PATH = os.getenv('FAISS_INDEX_PATH', './data/faiss_index')
EMBEDDING_MODEL = os.getenv('EMBEDDING_MODEL', 'sentence-transformers/all-MiniLM-L6-v2')
TOP_K = int(os.getenv('TOP_K_RETRIEVAL', 5))


class RAGPipeline:
    """
    Main RAG pipeline for academic text generation
    """
    
    def __init__(self):
        """
        Initialize the RAG pipeline with vector store and LLM client
        """
        print("🔧 Initializing RAG Pipeline...")
        
        # Load embeddings model
        print(f"   Loading embeddings: {EMBEDDING_MODEL}")
        self.embeddings = HuggingFaceEmbeddings(
            model_name=EMBEDDING_MODEL,
            model_kwargs={'device': 'cpu'},
            encode_kwargs={'normalize_embeddings': True}
        )
        
        # Load FAISS index
        print(f"   Loading FAISS index: {FAISS_INDEX_PATH}")
        if Path(FAISS_INDEX_PATH).exists():
            try:
                self.vectorstore = FAISS.load_local(
                    FAISS_INDEX_PATH, 
                    self.embeddings,
                    allow_dangerous_deserialization=True
                )
                print("   ✓ FAISS index loaded successfully")
            except Exception as e:
                print(f"   ⚠️ Failed to load FAISS index: {e}")
                self.vectorstore = None
        else:
            print(f"   ⚠️ FAISS index not found at {FAISS_INDEX_PATH}. Starting in pure LLM mode (no RAG).")
            self.vectorstore = None
        
        # Initialize LLM client
        self.llm_client = get_llm_client()
        
        print("✓ RAG Pipeline ready!")
    
    def retrieve_context(self, questionnaire, top_k=TOP_K):
        """
        Retrieve relevant research paper chunks based on questionnaire
        
        Args:
            questionnaire (dict): User's research details
            top_k (int): Number of chunks to retrieve
        
        Returns:
            tuple: (context_text, metadata_list)
        """
        print(f"\n🔍 Retrieving relevant context (top-{top_k})...")
        
        # Build retrieval query using the NEW keys
        query = f"""
        Domain: {questionnaire.get('domain')}
        Topic: {questionnaire.get('research_topic')}
        Problem: {questionnaire.get('specific_problem')}
        Method: {questionnaire.get('approach_overview')}
        """
        
        # Perform similarity search
        docs = []
        if self.vectorstore:
            try:
                docs = self.vectorstore.similarity_search(query, k=top_k)
            except Exception as e:
                print(f"   ⚠️ Vector search error: {e}")
        else:
            print("   ℹ️ No vector store loaded. Skipping retrieval.")
        
        if not docs:
            print("   ⚠️ No relevant documents found. Switching to KNOWLEDGE-BASED generation.")
            return ("NO_RETRIEVED_CONTEXT. The user's research topic was not found in the local database. "
                    "You MUST generate the content based entirely on your internal academic knowledge. "
                    "Maintain strict IEEE formatting and professional tone as if you had access to sources."), []
        
        # Extract text and metadata
        retrieved_chunks = []
        metadata_list = []
        
        for i, doc in enumerate(docs):
            # print(f"   [{i+1}] Source: {doc.metadata.get('source', 'unknown')}")
            retrieved_chunks.append(doc.page_content)
            metadata_list.append({
                'source': doc.metadata.get('source', 'unknown'),
                'page': doc.metadata.get('page', 'N/A')
            })
        
        # Combine chunks into single context
        context_text = "\n\n---\n\n".join(retrieved_chunks)
        
        print(f"✓ Retrieved {len(docs)} relevant chunks")
        return context_text, metadata_list
    
    def generate_full_paper(self, questionnaire):
        """
        Generates a complete research paper by iterating through sections
        """
        print("\n" + "="*60)
        print("STARTING FULL PAPER GENERATION")
        print("="*60)
        
        start_time = time.time()
        
        # Step 1: Retrieve context (Global context for consistency)
        context, metadata = self.retrieve_context(questionnaire)
        
        # Step 2: Define Sections to Generate (EXACT ORDER PER USER SPEC)
        sections_to_generate = [
            # Front Matter (Title/Author done manually above)
            "Abstract",
            "Keywords",
            
            # Main Paper Body
            "Introduction",
            "Related Work",                  # Section 2
            "Problem Formulation",           # Section 3 (equations here)
            "Methodology",                   # Section 4 (Proposed Methodology)
            "Experimental Setup",            # Section 5 (CRITICAL for reviewers)
            "Results and Discussion",        # Section 6
            "System Architecture",           # Section 7 (Optional, after results)
            "Limitations and Future Scope",  # Section 8
            "Conclusion",                    # Section 9
            
            # Back Matter
            "References"
        ]
        
        paper_content = {}
        
        # --- FRONT MATTER (Manual Construction) ---
        print("\n📝 formatting Front Matter...")
        
        # --- FRONT MATTER (Manual Construction) ---
        print("\n📝 formatting Front Matter...")
        
        authors = questionnaire.get('authors', [])
        # Fallback for old single-author format or empty
        if not authors:
             authors = [{
                 'name': questionnaire.get('author_name', '[Author Name]'),
                 'department': questionnaire.get('author_department', ''),
                 'institution': questionnaire.get('author_institution', ''),
                 'email': questionnaire.get('author_email', '')
             }]

        # Construct Author Block
        author_lines = []
        for auth in authors:
            name = auth.get('name', '')
            dept = auth.get('department', '')
            inst = auth.get('institution', '')
            email = auth.get('email', '')
            
            # IEEE Format: Name, Affiliation, Email
            # We'll stack them for simplicity in Markdown/LaTeX
            parts = [name]
            if dept or inst:
                parts.append(f"{dept}, {inst}".strip(", "))
            if email:
                parts.append(email)
            
            author_lines.append("\n".join(parts))
        
        author_block = "\n\nAND\n\n".join(author_lines) # Separator for clarity
        
        front_matter = f"""
{questionnaire.get('research_topic', 'Research Paper Title').upper()}

{author_block}
"""
        paper_content['Title and Author'] = front_matter.strip()
        print(f"   ✓ Title and Author formatted for {len(authors)} author(s)")

        # Step 3: Iterate and Generate
        for section in sections_to_generate:
            print(f"\n📝 Generating Section: {section}...")
            
            # Construct prompt for this specific section
            user_prompt = build_generation_prompt(questionnaire, context, section)
            
            # Generate text
            # Use slightly higher max_tokens for content-heavy sections
            max_tokens = 1500 if section in ["Introduction", "Methodology", "Results and Discussion"] else 800
            
            generated_text = self.llm_client.generate(
                system_prompt=SYSTEM_PROMPT,
                user_prompt=user_prompt,
                max_tokens=max_tokens,
                temperature=0.3
            )
            
            paper_content[section] = generated_text
            print(f"   ✓ {section} completed ({len(generated_text)} chars)")
            
        total_time = (time.time() - start_time) * 1000
        print("\n" + "="*60)
        print(f"PAPER GENERATION COMPLETE ({total_time/1000:.1f}s)")
        print("="*60)
        
        return {
            'paper_sections': paper_content,
            'metadata': {
                'retrieved_chunks': len(metadata),
                'sources': metadata,
                'model_used': self.llm_client.model_name,
                'provider': self.llm_client.provider,
                'processing_time_ms': total_time
            }
        }


# Singleton instance
_rag_pipeline_instance = None

def get_rag_pipeline():
    """
    Returns a singleton instance of the RAG pipeline
    """
    global _rag_pipeline_instance
    if _rag_pipeline_instance is None:
        _rag_pipeline_instance = RAGPipeline()
    return _rag_pipeline_instance
