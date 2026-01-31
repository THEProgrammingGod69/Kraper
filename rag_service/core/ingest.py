"""
PDF Ingestion & FAISS Index Creation

This script processes all PDFs in the data/pdfs directory,
chunks them, creates embeddings, and builds a FAISS vector store.

Run this ONCE before starting the RAG service:
    python core/ingest.py
"""

import os
import sys
from pathlib import Path
from dotenv import load_dotenv

# Add parent directory to path for imports
sys.path.append(str(Path(__file__).parent.parent))

from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS

# Load environment variables
load_dotenv()

# Configuration
PDF_DIR = os.getenv('PDF_DIRECTORY', './data/pdfs')
FAISS_INDEX_PATH = os.getenv('FAISS_INDEX_PATH', './data/faiss_index')
EMBEDDING_MODEL = os.getenv('EMBEDDING_MODEL', 'sentence-transformers/all-MiniLM-L6-v2')
CHUNK_SIZE = int(os.getenv('CHUNK_SIZE', 1000))
CHUNK_OVERLAP = int(os.getenv('CHUNK_OVERLAP', 200))


def load_pdfs(directory):
    """
    Load all PDF files from the specified directory
    
    Args:
        directory (str): Path to PDF directory
    
    Returns:
        list: List of LangChain Document objects
    """
    print(f"📂 Loading PDFs from: {directory}")
    
    pdf_files = list(Path(directory).glob('*.pdf'))
    
    if not pdf_files:
        raise ValueError(f"No PDF files found in {directory}")
    
    print(f"   Found {len(pdf_files)} PDF files")
    
    all_documents = []
    
    for pdf_path in pdf_files:
        print(f"   Loading: {pdf_path.name}")
        try:
            loader = PyPDFLoader(str(pdf_path))
            documents = loader.load()
            
            # Add metadata
            for doc in documents:
                doc.metadata['source'] = pdf_path.name
            
            all_documents.extend(documents)
            print(f"      ✓ {len(documents)} pages loaded")
            
        except Exception as e:
            print(f"      ❌ Error loading {pdf_path.name}: {e}")
            continue
    
    print(f"\n✓ Total pages loaded: {len(all_documents)}")
    return all_documents


def chunk_documents(documents, chunk_size=1000, chunk_overlap=200):
    """
    Split documents into smaller chunks for better retrieval
    
    Args:
        documents (list): List of Document objects
        chunk_size (int): Target size of each chunk
        chunk_overlap (int): Overlap between chunks
    
    Returns:
        list: List of chunked Document objects
    """
    print(f"\n📝 Chunking documents (size={chunk_size}, overlap={chunk_overlap})")
    
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=chunk_size,
        chunk_overlap=chunk_overlap,
        length_function=len,
        separators=["\n\n", "\n", ". ", " ", ""]
    )
    
    chunks = text_splitter.split_documents(documents)
    
    print(f"✓ Created {len(chunks)} chunks")
    return chunks


def create_faiss_index(chunks, embedding_model, index_path):
    """
    Create FAISS vector store from document chunks
    
    Args:
        chunks (list): List of Document chunks
        embedding_model (str): Name of HuggingFace embedding model
        index_path (str): Path to save the FAISS index
    """
    print(f"\n🧠 Creating embeddings with model: {embedding_model}")
    print("   This may take several minutes...")
    
    # Initialize embeddings
    embeddings = HuggingFaceEmbeddings(
        model_name=embedding_model,
        model_kwargs={'device': 'cpu'},  # No GPU required
        encode_kwargs={'normalize_embeddings': True}
    )
    
    # Create FAISS index
    print("   Building FAISS index...")
    vectorstore = FAISS.from_documents(chunks, embeddings)
    
    # Save to disk
    print(f"💾 Saving index to: {index_path}")
    Path(index_path).parent.mkdir(parents=True, exist_ok=True)
    vectorstore.save_local(index_path)
    
    print("✓ FAISS index created and saved successfully!")
    return vectorstore


def main():
    """
    Main ingestion pipeline
    """
    print("="*60)
    print("PDF INGESTION & FAISS INDEX CREATION")
    print("="*60)
    
    try:
        # Step 1: Load PDFs
        documents = load_pdfs(PDF_DIR)
        
        # Step 2: Chunk documents
        chunks = chunk_documents(documents, CHUNK_SIZE, CHUNK_OVERLAP)
        
        # Step 3: Create FAISS index
        vectorstore = create_faiss_index(chunks, EMBEDDING_MODEL, FAISS_INDEX_PATH)
        
        # Summary
        print("\n" + "="*60)
        print("INGESTION COMPLETE!")
        print("="*60)
        print(f"✓ Processed PDFs: {len(documents)} pages")
        print(f"✓ Total chunks: {len(chunks)}")
        print(f"✓ Index saved to: {FAISS_INDEX_PATH}")
        print("\nYou can now start the Flask server:")
        print("  python app.py")
        print("="*60)
        
    except Exception as e:
        print(f"\n❌ Ingestion failed: {e}")
        sys.exit(1)


if __name__ == "__main__":
    main()
