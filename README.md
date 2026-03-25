<div align="center">

# ⚖️ AI-Powered Legal Rights Awareness Chatbot

![Python](https://img.shields.io/badge/Python-3.10+-3776AB?style=for-the-badge&logo=python&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![FastAPI](https://img.shields.io/badge/FastAPI-0.115-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![ChromaDB](https://img.shields.io/badge/ChromaDB-Vector_DB-FF6F00?style=for-the-badge)
![SQLite](https://img.shields.io/badge/SQLite-Database-003B57?style=for-the-badge&logo=sqlite&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)

### 🔍 Hybrid RAG + Legal NER System for Accessible Legal Information

*A chatbot that uses **Hybrid Retrieval-Augmented Generation (RAG)**, **Legal Named Entity Recognition (NER)**, and **LLMs** to explain legal rights in plain language, retrieve accurate legal sections, generate formal legal notices, and provide referrals to legal aid organizations.*

> ⚠️ **Disclaimer:** This system provides **legal information**, not legal advice. Consult a qualified lawyer for your specific situation.

---

</div>

## ✨ Features

| | Feature | Description |
|:-:|---------|------------|
| 🔎 | **Hybrid Retrieval** | BM25 keyword search + ChromaDB vector semantic search with Reciprocal Rank Fusion (RRF) |
| 🏷️ | **Legal NER** | Extracts statutes, sections, amounts, penalties, and courts from queries and responses |
| 💬 | **Plain Language** | LLM translates complex legal jargon to 8th-grade reading level |
| 📄 | **PDF Generator** | 6 templates — eviction, deposit, rent, consumer grievance, defective product, refund |
| 🤖 | **Dual LLM** | Google Gemini or Anthropic Claude, auto-detected from environment |
| 🏛️ | **Legal Aid** | NALSA, e-Daakhil, DLSA, Tele-Law, Consumer Helpline, SHRC referrals |
| 🌐 | **Multilingual** | English and Hindi support |

---

## 📚 Legal Domains (MVP)

<div align="center">

| 🏠 Tenant Rights | 🛒 Consumer Rights | ⚖️ General Laws |
|:-:|:-:|:-:|
| Rent disputes | Defective products | Cyber crime |
| Security deposits | Refunds | Employment |
| Eviction rules | Complaints | Traffic & family law |

</div>

---

## 🛠️ Tech Stack

<div align="center">

| Layer | Technology | Badge |
|:-----:|------------|:-----:|
| **Frontend** | React 19, Tailwind CSS 3, React Router, Axios | ![React](https://img.shields.io/badge/-React-61DAFB?style=flat-square&logo=react&logoColor=black) ![Tailwind](https://img.shields.io/badge/-Tailwind-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white) |
| **Backend** | FastAPI, Uvicorn | ![FastAPI](https://img.shields.io/badge/-FastAPI-009688?style=flat-square&logo=fastapi&logoColor=white) |
| **RAG** | BM25, ChromaDB, Sentence Transformers | ![ChromaDB](https://img.shields.io/badge/-ChromaDB-FF6F00?style=flat-square) |
| **NER** | Regex-based extraction (+ optional spaCy) | ![spaCy](https://img.shields.io/badge/-spaCy-09A3D5?style=flat-square) |
| **LLM** | Google Gemini / Anthropic Claude | ![Gemini](https://img.shields.io/badge/-Gemini-4285F4?style=flat-square&logo=google&logoColor=white) |
| **PDF** | ReportLab + Jinja2 | ![PDF](https://img.shields.io/badge/-ReportLab-CC0000?style=flat-square) |
| **Database** | SQLite (SQLAlchemy) | ![SQLite](https://img.shields.io/badge/-SQLite-003B57?style=flat-square&logo=sqlite&logoColor=white) |

</div>

---

## 🚀 Installation & Setup

### Prerequisites

> ![Python](https://img.shields.io/badge/Python-3.10+-3776AB?style=flat-square&logo=python&logoColor=white) ![Node](https://img.shields.io/badge/Node.js-18+-339933?style=flat-square&logo=node.js&logoColor=white) ![npm](https://img.shields.io/badge/npm-latest-CB3837?style=flat-square&logo=npm&logoColor=white)

### Step 1 — Clone

```bash
git clone https://github.com/adyaomnkar/AI_Law_Advisor.git
cd AI_Law_Advisor
```

### Step 2 — Environment Variables

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

> 💡 Get a free Gemini API key from [Google AI Studio](https://aistudio.google.com/apikey)

### Step 3 — Backend

```bash
cd backend
pip install -r requirements.txt
python main.py
```

> 🟢 Backend runs on `http://localhost:8000`
> 📦 First startup downloads a ~79MB embedding model (cached after that)

### Step 4 — Frontend

Open a **new terminal**:

```bash
cd frontend
npm install
npm start
```

> 🟢 Frontend runs on `http://localhost:3000`

---

## ⚙️ How It Works

```mermaid
graph LR
    A["🧑 User Query"] --> B["🏷️ Legal NER"]
    B --> C["📖 BM25 Search"]
    B --> D["🧠 Vector Search"]
    C --> E["⚡ RRF Fusion"]
    D --> E
    E --> F["🤖 LLM Response"]
    F --> G["💻 React UI"]
    G --> H["📄 PDF Generator"]

    style A fill:#4F46E5,color:#fff,stroke:none
    style B fill:#7C3AED,color:#fff,stroke:none
    style C fill:#2563EB,color:#fff,stroke:none
    style D fill:#2563EB,color:#fff,stroke:none
    style E fill:#D97706,color:#fff,stroke:none
    style F fill:#059669,color:#fff,stroke:none
    style G fill:#0891B2,color:#fff,stroke:none
    style H fill:#DC2626,color:#fff,stroke:none
```

1. 🧑 User asks a legal question
2. 🏷️ System extracts legal entities (sections, statutes, amounts)
3. 🔎 Hybrid search finds relevant provisions using BM25 + ChromaDB
4. ⚡ Results are fused using Reciprocal Rank Fusion
5. 🤖 LLM generates a plain-language response with citations
6. 📄 User can generate a formal legal notice PDF

---

## 🌐 API Endpoints

| Method | Endpoint | Description |
|:------:|----------|-------------|
| ![GET](https://img.shields.io/badge/GET-blue?style=flat-square) | `/` | Health check, LLM provider status |
| ![POST](https://img.shields.io/badge/POST-green?style=flat-square) | `/api/chat` | Send query, get legal response with entities & sources |
| ![POST](https://img.shields.io/badge/POST-green?style=flat-square) | `/api/search` | Search legal documents |
| ![POST](https://img.shields.io/badge/POST-green?style=flat-square) | `/api/generate-pdf` | Generate legal notice PDF |
| ![GET](https://img.shields.io/badge/GET-blue?style=flat-square) | `/api/legal-aid` | Get legal aid services list |
| ![GET](https://img.shields.io/badge/GET-blue?style=flat-square) | `/api/sessions` | Get chat history |

---

## 🎯 Demo

<div align="center">

> 💬 **"I bought a fridge and it broke the next day. The shop refuses to refund my 20,000 rupees."**

</div>

| Step | What Happens |
|:----:|-------------|
| 🏷️ **Identifies** | Product → Fridge, Amount → ₹20,000, Issue → Defective Product |
| 📖 **Retrieves** | Consumer Protection Act sections |
| 💬 **Explains** | Rights in plain language with actionable steps |
| 📄 **Generates** | Refund Request legal notice PDF |

---

## 📁 Project Structure

```
AI_Law_Advisor/
│
├── 🔧 backend/
│   ├── main.py                 # FastAPI app, routes
│   ├── config.py               # Environment config, LLM detection
│   ├── llm_service.py          # Dual LLM (Gemini/Claude)
│   ├── pdf_generator.py        # Legal notice PDF generation
│   ├── requirements.txt
│   ├── database/db.py          # SQLite database
│   ├── rag_pipeline/
│   │   └── hybrid_search.py    # BM25 + ChromaDB + RRF
│   ├── ner/legal_ner.py        # Legal entity extraction
│   └── templates/
│       └── legal_notice.html   # Jinja2 template
│
├── 🎨 frontend/src/
│   ├── App.js
│   ├── context/ChatContext.js
│   ├── services/api.js
│   ├── pages/
│   │   ├── ChatPage.js
│   │   ├── LegalAidPage.js
│   │   └── AboutPage.js
│   └── components/
│       ├── Navbar.js
│       ├── ChatInput.js
│       ├── ChatMessage.js
│       ├── WelcomeScreen.js
│       ├── PDFGenerator.js
│       ├── DomainSelector.js
│       ├── EntityBadge.js
│       └── Disclaimer.js
│
├── 📚 data/
│   ├── tenant_rights.txt
│   ├── consumer_protection.txt
│   └── general_laws.txt
│
├── .env.example
└── .gitignore
```

---

<div align="center">

### 📜 License

**MIT License** — free to use and modify

---

*Built to bridge the access-to-justice gap* ⚖️

</div>
