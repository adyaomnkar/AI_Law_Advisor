<div align="center">

<img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcDZ0Y2RyZm1tMG1kOWR0Ynl3OWdpaTFydnVhajBjdXRkY3Q2aCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/JqDcpPX8vWahUny0SH/giphy.gif" width="120"/>

# AI-Powered Legal Rights Awareness Chatbot

![Python](https://img.shields.io/badge/Python-3.10+-3776AB?style=for-the-badge&logo=python&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![FastAPI](https://img.shields.io/badge/FastAPI-0.115-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![ChromaDB](https://img.shields.io/badge/ChromaDB-Vector_DB-FF6F00?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)

**Hybrid RAG + Legal NER System for Accessible Legal Information**

<img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMnVhNHVmcjRhM2t5d2FwcGk0ZjJtaWx5dGlnNnVmdTcxeGxjdSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/l0HlNQ03J5JxX2rGU/giphy.gif" width="500"/>

---

*A chatbot that uses **Hybrid Retrieval-Augmented Generation (RAG)**, **Legal Named Entity Recognition (NER)**, and **LLMs** to explain legal rights in plain language, retrieve accurate legal sections, generate formal legal notices, and provide referrals to legal aid organizations.*

> **Disclaimer:** This system provides **legal information**, not legal advice. Consult a qualified lawyer for your specific situation.

</div>

---

## <img src="https://media.giphy.com/media/WUlplcMpOCEmTGBtBW/giphy.gif" width="30"> Features

| Feature | Description |
|---------|------------|
| **Hybrid Retrieval** | BM25 keyword search + ChromaDB vector semantic search with Reciprocal Rank Fusion (RRF) |
| **Legal NER** | Extracts statutes, sections, amounts, penalties, and courts from queries and responses |
| **Plain Language** | LLM translates complex legal jargon to 8th-grade reading level |
| **PDF Generator** | 6 templates — eviction, deposit, rent, consumer grievance, defective product, refund |
| **Dual LLM** | Google Gemini or Anthropic Claude, auto-detected from environment |
| **Legal Aid** | NALSA, e-Daakhil, DLSA, Tele-Law, Consumer Helpline, SHRC referrals |
| **Multilingual** | English and Hindi support |

---

## <img src="https://media.giphy.com/media/juua9i2c2fA0AIp2iq/giphy.gif" width="30"> Legal Domains (MVP)

```
 Tenant Rights       Consumer Rights       General Laws
  Rent disputes        Defective products     Cyber crime
  Security deposits    Refunds                Employment
  Eviction rules       Complaints             Traffic & family law
```

---

## <img src="https://media.giphy.com/media/QssGEmpkyEOhBCb7e1/giphy.gif" width="25"> Tech Stack

<div align="center">

| Layer | Technology |
|:-----:|:----------:|
| <img src="https://img.shields.io/badge/-Frontend-blue?style=flat-square"/> | React 19, Tailwind CSS 3, React Router, React Markdown, Axios |
| <img src="https://img.shields.io/badge/-Backend-green?style=flat-square"/> | FastAPI, Uvicorn |
| <img src="https://img.shields.io/badge/-RAG-orange?style=flat-square"/> | BM25 (rank-bm25), ChromaDB, Sentence Transformers |
| <img src="https://img.shields.io/badge/-NER-red?style=flat-square"/> | Regex-based extraction (+ optional spaCy) |
| <img src="https://img.shields.io/badge/-LLM-purple?style=flat-square"/> | Google Generative AI / Anthropic Claude |
| <img src="https://img.shields.io/badge/-PDF-crimson?style=flat-square"/> | ReportLab + Jinja2 |
| <img src="https://img.shields.io/badge/-Database-teal?style=flat-square"/> | SQLite (SQLAlchemy) |

</div>

---

## <img src="https://media.giphy.com/media/iY8CRBdQXODJSCERIr/giphy.gif" width="25"> Installation & Setup

### Prerequisites

```
 Python 3.10+     Node.js 18+     npm
```

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

> Backend runs on `http://localhost:8000`
> First startup downloads a ~79MB embedding model for ChromaDB (cached after that).

### 4. Install & Start Frontend

```bash
cd frontend
npm install
npm start
```

> Frontend runs on `http://localhost:3000`

---

## <img src="https://media.giphy.com/media/VgCDAzcKvsR6OM0uWg/giphy.gif" width="25"> How It Works

```mermaid
graph LR
    A[User Query] --> B[Legal NER]
    B --> C[BM25 Search]
    B --> D[Vector Search]
    C --> E[RRF Fusion]
    D --> E
    E --> F[LLM Response]
    F --> G[React UI]
    G --> H[PDF Generator]
```

1. User asks a legal question
2. System extracts legal entities (sections, statutes, amounts)
3. Hybrid search finds relevant provisions using BM25 + ChromaDB
4. Results are fused using Reciprocal Rank Fusion
5. LLM generates a plain-language response with citations
6. User can generate a formal legal notice PDF

---

## <img src="https://media.giphy.com/media/xT9IgzoKnwFNmISR8I/giphy.gif" width="25"> API Endpoints

| Method | Endpoint | Description |
|:------:|----------|-------------|
| `GET` | `/` | Health check, LLM provider status |
| `POST` | `/api/chat` | Send query, get legal response with entities & sources |
| `POST` | `/api/search` | Search legal documents |
| `POST` | `/api/generate-pdf` | Generate legal notice PDF |
| `GET` | `/api/legal-aid` | Get legal aid services list |
| `GET` | `/api/sessions` | Get chat history |

---

## <img src="https://media.giphy.com/media/3oKIPnAiaMCJ8dO8Fi/giphy.gif" width="25"> Demo

**Query:**
> "I bought a fridge and it broke the next day. The shop refuses to refund my 20,000 rupees."

**System Response:**
- Identifies: Product (Fridge), Amount (Rs. 20,000), Issue (Defective Product)
- Retrieves: Consumer Protection Act sections
- Explains rights in plain language with actionable steps
- Option to generate a Refund Request legal notice PDF

---

## Project Structure

```
AI_Law_Advisor/
├── backend/
│   ├── main.py                 # FastAPI app, routes
│   ├── config.py               # Environment config, LLM detection
│   ├── llm_service.py          # Dual LLM service (Gemini/Claude)
│   ├── pdf_generator.py        # Legal notice PDF generation
│   ├── requirements.txt
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
│       ├── App.js
│       ├── context/ChatContext.js
│       ├── services/api.js
│       ├── pages/
│       │   ├── ChatPage.js
│       │   ├── LegalAidPage.js
│       │   └── AboutPage.js
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
│   ├── tenant_rights.txt
│   ├── consumer_protection.txt
│   └── general_laws.txt
│
├── .env.example
└── .gitignore
```

---

<div align="center">

## License

MIT License

<img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExaWJlNmtvdnBjZ2VwMmQ0MmQyeGFuOW95OHBiYzVlcGIycmJ6dSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3o7btNa0RUYa5E7yl2/giphy.gif" width="80"/>

*Built for accessible justice*

</div>
