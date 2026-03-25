# AI-Powered Legal Rights Awareness Chatbot

**Hybrid RAG + Legal NER System for Accessible Legal Information**

A chatbot that uses **Hybrid Retrieval-Augmented Generation (RAG)**, **Legal Named Entity Recognition (NER)**, and **LLMs** to explain legal rights in plain language, retrieve accurate legal sections, generate formal legal notices, and provide referrals to legal aid organizations.

> **Disclaimer:** This system provides legal information, not legal advice. Consult a qualified lawyer for your specific situation.

---

## Features

- **Hybrid Retrieval** — BM25 keyword search + ChromaDB vector semantic search with Reciprocal Rank Fusion (RRF)
- **Legal NER** — Extracts statutes, sections, amounts, penalties, and courts from queries and responses
- **Plain Language Responses** — LLM translates complex legal jargon to 8th-grade reading level
- **Legal Notice PDF Generator** — 6 templates (eviction, deposit, rent, consumer grievance, defective product, refund)
- **Dual LLM Support** — Google Gemini or Anthropic Claude, auto-detected from environment
- **Legal Aid Referrals** — NALSA, e-Daakhil, DLSA, Tele-Law, Consumer Helpline, SHRC
- **Multilingual** — English and Hindi support

## Legal Domains (MVP)

- **Tenant Rights** — Rent disputes, security deposits, eviction rules
- **Consumer Rights** — Defective products, refunds, complaints
- **General Laws** — Cyber crime, employment, traffic, family law

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, Tailwind CSS 3, React Router, React Markdown, Axios |
| Backend | FastAPI, Uvicorn |
| RAG | BM25 (rank-bm25), ChromaDB, Sentence Transformers |
| NER | Regex-based extraction (+ optional spaCy) |
| LLM | Google Generative AI / Anthropic Claude |
| PDF | ReportLab + Jinja2 |
| Database | SQLite (SQLAlchemy) |

---

## Installation & Setup

### Prerequisites

- **Python 3.10+**
- **Node.js 18+**
- **npm**

### 1. Clone the Repository

```bash
git clone https://github.com/adyaomnkar/AI_Law_Advisor.git
cd AI_Law_Advisor
```

### 2. Setup Environment Variables

```bash
cp .env.example .env
```

Edit `.env` and add your API key:

```env
# Add ONE of these (auto-detected):
GEMINI_API_KEY=your-gemini-api-key
# OR
ANTHROPIC_API_KEY=your-anthropic-api-key
```

Get a free Gemini API key from [Google AI Studio](https://aistudio.google.com/apikey).

### 3. Install & Start Backend

```bash
cd backend
pip install -r requirements.txt
python main.py
```

Backend runs on `http://localhost:8000`

> **Note:** First startup downloads a ~79MB embedding model for ChromaDB. This is cached for future runs.

### 4. Install & Start Frontend

Open a new terminal:

```bash
cd frontend
npm install
npm start
```

Frontend runs on `http://localhost:3000`

---

## Project Structure

```
AI_Law_Advisor/
├── backend/
│   ├── main.py                 # FastAPI app, routes
│   ├── config.py               # Environment config, LLM provider detection
│   ├── llm_service.py          # Dual LLM service (Gemini/Claude)
│   ├── pdf_generator.py        # Legal notice PDF generation
│   ├── requirements.txt        # Python dependencies
│   ├── database/
│   │   └── db.py               # SQLite database
│   ├── rag_pipeline/
│   │   └── hybrid_search.py    # BM25 + ChromaDB + RRF
│   ├── ner/
│   │   └── legal_ner.py        # Legal entity extraction
│   └── templates/
│       └── legal_notice.html   # Jinja2 HTML template
│
├── frontend/
│   └── src/
│       ├── App.js              # Routes
│       ├── context/
│       │   └── ChatContext.js  # State management
│       ├── services/
│       │   └── api.js          # Axios API client
│       ├── pages/
│       │   ├── ChatPage.js     # Main chat interface
│       │   ├── LegalAidPage.js # Legal aid services
│       │   └── AboutPage.js    # About page
│       └── components/
│           ├── Navbar.js
│           ├── ChatInput.js
│           ├── ChatMessage.js
│           ├── WelcomeScreen.js
│           ├── PDFGenerator.js
│           ├── DomainSelector.js
│           ├── EntityBadge.js
│           └── Disclaimer.js
│
├── data/
│   ├── tenant_rights.txt       # Tenant law sections
│   ├── consumer_protection.txt # Consumer law sections
│   └── general_laws.txt        # General law sections
│
├── .env.example                # Environment template
└── .gitignore
```

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Health check, LLM provider status |
| POST | `/api/chat` | Send query, get legal response with entities & sources |
| POST | `/api/search` | Search legal documents |
| POST | `/api/generate-pdf` | Generate legal notice PDF |
| GET | `/api/legal-aid` | Get legal aid services list |
| GET | `/api/sessions` | Get chat history |

---

## How It Works

```
User Query → Legal NER Extraction → Hybrid Retrieval (BM25 + Vector) → RRF Fusion → LLM Response → React UI
```

1. User asks a legal question
2. System extracts legal entities (sections, statutes, amounts)
3. Hybrid search finds relevant legal provisions using BM25 + ChromaDB
4. Results are fused using Reciprocal Rank Fusion
5. LLM generates a plain-language response with citations
6. User can generate a formal legal notice PDF

---

## Demo

**Query:** "I bought a fridge and it broke the next day. The shop refuses to refund my 20,000 rupees."

**System Response:**
- Identifies: Product (Fridge), Amount (Rs. 20,000), Issue (Defective Product)
- Retrieves: Consumer Protection Act sections
- Explains rights in plain language with actionable steps
- Option to generate a Refund Request legal notice PDF

---

## License

MIT License
