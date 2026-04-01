import sys
import os
sys.path.insert(0, os.path.dirname(__file__))

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from pydantic import BaseModel
from typing import Optional
import json

from config import PORT, FRONTEND_URL, get_llm_provider
from database.db import init_db, save_session, get_sessions
from rag_pipeline.hybrid_search import HybridSearch
from ner.legal_ner import extract_entities_spacy as extract_entities
from llm_service import generate_response
from pdf_generator import generate_legal_notice
from action_engine import get_action_buttons

app = FastAPI(title="AI Law Advisor API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        FRONTEND_URL,
        "http://localhost:3000",
        "http://localhost:5173",
        "https://ai-law-advisor.onrender.com",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize on startup
search_engine = None

@app.on_event("startup")
def startup():
    global search_engine
    init_db()
    search_engine = HybridSearch()
    provider = get_llm_provider()
    print(f"[AI Law Advisor] Backend started")
    print(f"[AI Law Advisor] LLM Provider: {provider or 'NONE (fallback mode)'}")
    print(f"[AI Law Advisor] Documents loaded: {len(search_engine.documents)}")
    print(f"[AI Law Advisor] Vector store: {'ChromaDB' if search_engine.collection else 'Disabled (BM25 only)'}")


# Request/Response Models

class ChatRequest(BaseModel):
    query: str
    domain: str = 'tenant'
    language: str = 'en'
    session_id: Optional[str] = None

class ChatResponse(BaseModel):
    response: str
    entities: dict
    sources: list
    session_id: Optional[str] = None
    accuracy: list = []
    action_buttons: list = []

class SearchRequest(BaseModel):
    query: str
    domain: str = 'tenant'

class PDFRequest(BaseModel):
    template_type: str
    entities: Optional[dict] = None
    details: dict = {}

class LegalAidService(BaseModel):
    name: str
    description: str
    website: str
    helpline: str
    coverage: str


# API Routes

@app.get("/")
def root():
    return {
        "service": "AI Law Advisor API",
        "version": "1.0.0",
        "llm_provider": get_llm_provider() or "none",
        "docs_loaded": len(search_engine.documents) if search_engine else 0,
    }

@app.get("/health")
def health():
    return {"status": "ok"}




@app.post("/api/chat", response_model=ChatResponse)
async def chat(req: ChatRequest):
    if not search_engine:
        raise HTTPException(500, "Search engine not initialized")

    # search for relevant legal context with relevance scores
    results = search_engine.search_with_scores(req.query, domain=req.domain, top_k=5)

    # extract entities from query + results
    combined_text = req.query + "\n" + "\n".join([r['text'] for r in results[:3]])
    entities = extract_entities(combined_text)

    # generate LLM response
    context_chunks = [{'source': r['source'], 'text': r['text']} for r in results]
    response_text = await generate_response(req.query, context_chunks, req.language)

    # merge entities from response
    response_entities = extract_entities(response_text)
    for k, v in response_entities.items():
        if k in entities:
            entities[k] = list(set(entities[k] + v))
        else:
            entities[k] = v

    sources = [{'section': r['section'], 'text': r.get('title', r['source'])} for r in results[:5]]

    accuracy = [
        {'section': r['section'], 'title': r.get('title', r['source']), 'relevance': r.get('relevance', 0)}
        for r in results[:5]
    ]

    action_buttons = get_action_buttons(req.query, entities, response_text)

    save_session(req.query, response_text, req.domain, req.language, entities)

    return ChatResponse(
        response=response_text,
        entities=entities,
        sources=sources,
        session_id=req.session_id,
        accuracy=accuracy,
        action_buttons=action_buttons,
    )


@app.post("/api/search")
def search(req: SearchRequest):
    if not search_engine:
        raise HTTPException(500, "Search engine not initialized")

    results = search_engine.search(req.query, domain=req.domain, top_k=10)
    return {
        "results": [
            {
                "section": r['section'],
                "title": r.get('title', ''),
                "text": r['text'],
                "domain": r['domain'],
                "source": r['source'],
            }
            for r in results
        ],
        "total": len(results),
    }


@app.post("/api/generate-pdf")
def generate_pdf(req: PDFRequest):
    try:
        filepath, filename = generate_legal_notice(
            req.template_type,
            req.details,
            req.entities,
        )
        return FileResponse(
            filepath,
            media_type='application/pdf',
            filename=filename,
            headers={"Content-Disposition": f"attachment; filename={filename}"}
        )
    except Exception as e:
        raise HTTPException(500, f"PDF generation failed: {str(e)}")


@app.get("/api/legal-aid")
def legal_aid(state: str = ''):
    services = [
        {
            "name": "National Legal Services Authority (NALSA)",
            "description": "Free legal services for weaker sections of society including SC/ST, women, children, disabled persons, and those with annual income less than specified limit.",
            "website": "https://nalsa.gov.in",
            "helpline": "15100",
            "coverage": "All India",
        },
        {
            "name": "e-Daakhil Portal",
            "description": "Online consumer complaint filing portal. Free for claims under Rs. 5 lakhs.",
            "website": "https://edaakhil.nic.in",
            "helpline": "1800-11-4000",
            "coverage": "All India",
        },
        {
            "name": "District Legal Services Authority (DLSA)",
            "description": "Available in every district. Provides free legal aid, Lok Adalats, and mediation services.",
            "website": "https://doj.gov.in/legal-aid",
            "helpline": "Contact local DLSA",
            "coverage": "District-level",
        },
        {
            "name": "Tele-Law (CSC)",
            "description": "Free legal consultation via video conferencing at Common Service Centres.",
            "website": "https://www.tele-law.in",
            "helpline": "1800-11-0031",
            "coverage": "All India (via CSCs)",
        },
        {
            "name": "National Consumer Helpline",
            "description": "Government helpline for consumer grievances and pre-litigation guidance.",
            "website": "https://consumerhelpline.gov.in",
            "helpline": "1800-11-4000 / 14404",
            "coverage": "All India",
        },
        {
            "name": "State Human Rights Commission",
            "description": "Handles complaints of human rights violations.",
            "website": "https://nhrc.nic.in",
            "helpline": "14433",
            "coverage": "State-level",
        },
    ]
    return {"services": services}


@app.get("/api/sessions")
def list_sessions(limit: int = 50):
    return {"sessions": get_sessions(limit)}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=PORT, reload=True)
