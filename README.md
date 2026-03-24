# AI_Law_Advisor
Here’s a **professional GitHub README.md** tailored exactly to your **AI-Powered Legal Rights Awareness Chatbot (Hybrid RAG + Legal NER)** project and aligned with your Day-1 to Day-6 workflow. You can copy-paste this directly into your repo.

---

# ⚖️ AI-Powered Legal Rights Awareness Chatbot

**Hybrid RAG + Legal NER System for Accessible Legal Information**

## 📌 Project Overview

The **AI-Powered Legal Rights Awareness Chatbot** is designed to bridge the **access-to-justice gap** faced by marginalized communities who cannot afford legal consultation fees (often exceeding **$100/hour**).

This system uses **Hybrid Retrieval-Augmented Generation (RAG)**, **Legal Named Entity Recognition (NER)**, and **Large Language Models (LLMs)** to:

* Explain legal rights in **plain language**
* Retrieve **accurate legal sections**
* Generate **formal legal notices**
* Provide **referrals to legal aid organizations**

⚠️ **Disclaimer:**
This system provides **legal information**, not legal advice.

---

# 🎯 Problem Statement

Many individuals lack access to legal support due to:

* High lawyer consultation fees
* Complex legal language
* Limited awareness of legal rights
* Lack of access to reliable legal documentation

This chatbot solves these issues by transforming complex legal texts into **simple, actionable guidance**.

---

# 🚀 Key Features

✅ Hybrid Retrieval (BM25 + Semantic Search)
✅ Legal Named Entity Recognition (NER)
✅ Plain Language Legal Explanation
✅ Automated Legal Notice PDF Generator
✅ Multilingual Support
✅ Referral to Legal Aid Services
✅ Chat-based User Interface
✅ Section-Level Legal Retrieval

---

# 📚 MVP Scope

To maintain feasibility, the MVP is limited to:

### Legal Domains:

1️⃣ **Tenant Rights**

* Rent Control Acts

2️⃣ **Consumer Rights**

* Consumer Protection Act

Future expansion may include:

* Labour Law
* Criminal Law
* Family Law

---

# 🏗️ System Architecture

## Hybrid RAG Workflow

```
User Query
     ↓
Legal NER Extraction (spaCy / OpenNyAI)
     ↓
Hybrid Retrieval
   ├── BM25 Keyword Search
   ├── Vector Semantic Search
     ↓
Reciprocal Rank Fusion (RRF)
     ↓
Relevant Legal Sections
     ↓
LLM Plain Language Translation
     ↓
Legal Notice Generator (Jinja2 + PDF)
     ↓
React UI Response
```

---

# 🧠 Technology Stack

## Backend

* **FastAPI** — API framework
* **LangChain** — RAG orchestration
* **spaCy / OpenNyAI** — Legal NER
* **BM25** — Keyword search
* **FAISS / ChromaDB** — Vector database
* **PostgreSQL** — Data storage
* **Jinja2** — Template generation
* **ReportLab** — PDF creation

---

## Frontend

* **React.js**
* **Tailwind CSS**
* **Axios**

---

## AI / NLP

* LLM (GPT-based)
* spaCy NLP Pipeline
* Legal Entity Extraction
* Multilingual Translation API

---

# 📊 PostgreSQL Database Schema

## Tables

### users

```sql
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    name TEXT,
    language TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

### sessions

```sql
CREATE TABLE sessions (
    session_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    query TEXT,
    response TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

### generated_documents

```sql
CREATE TABLE generated_documents (
    doc_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    document_type TEXT,
    file_path TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

# 🔎 Hybrid Retrieval Strategy

This project uses **Hybrid Retrieval** because:

❌ Semantic Search Alone Fails
Example:

```
Section 302
Section 304
```

Semantically similar
⚠️ Legally completely different

---

## Retrieval Components

### 1️⃣ BM25 Keyword Search

Used for:

* Exact statute matching
* Section numbers
* Legal keywords

---

### 2️⃣ Vector Semantic Search

Used for:

* Intent matching
* Meaning-based retrieval

---

## Reciprocal Rank Fusion (RRF)

Combines both results:

```
RRF Score =
1 / (k + rank_BM25)
+
1 / (k + rank_Vector)
```

Ensures high accuracy retrieval.

---

# 🧠 Legal NER Pipeline

Uses:

* **OpenNyAI**
* **spaCy**
* **RoBERTa-base**

---

## Extracted Entities

* STATUTE
* SECTION
* COURT
* PENALTY
* MONEY
* PERSON

---

## Example

Input:

```
"My landlord won't return my 50,000 rupee deposit."
```

Output:

```
PERSON → landlord
MONEY → 50,000 rupees
```

---

# 🧾 Plain Language Engine

LLM translates legal jargon into:

✔ Simple English
✔ 8th-grade reading level
✔ Cited legal sections

---

## Example Output

Original:

```
Section 17 of the Consumer Protection Act...
```

Translated:

```
If a product is defective, you have the right to ask for repair, replacement, or refund.
```

---

# 📄 Legal Notice Generator

Uses:

* **Jinja2 Templates**
* **ReportLab**

Generates:

✔ Consumer Complaint Notices
✔ Tenant Notices
✔ Refund Requests

---

## Example Output

```
Consumer Complaint Notice

Amount: ₹20,000  
Issue: Defective Product  
Law: Consumer Protection Act Section 17
```

---

# 🌍 Multilingual Support

Supports:

* English
* Hindi
* Odia (planned)
* Bengali (planned)

Ensures accessibility for rural users.

---

# 🧑‍⚖️ Legal Aid Referral System

Provides verified referrals:

* **NALSA**
* **e-Daakhil Portal**
* Local Legal Services Authorities

---

# 📅 Development Timeline

## Day 1 — Planning & Architecture

* Problem Definition
* Hybrid RAG Design
* PostgreSQL Schema
* React + FastAPI Setup

---

## Day 2 — Hybrid RAG Setup

* Legal Document Ingestion
* Custom Section Splitter
* BM25 + Vector Search

---

## Day 3 — Legal NER Integration

* Entity Extraction
* Test Cases
* Structured Legal Mapping

---

## Day 4 — Document Generation

* Plain Language Engine
* Legal Notice PDF Generator

---

## Day 5 — UI & Accessibility

* UI Design
* Multilingual Support
* Legal Aid Referrals

---

## Day 6 — Final Demo

* Live Scenario Testing
* System Validation
* Architecture Defense

---

# 🧪 Test Case Example

Query:

```
"I bought a fridge and it broke the next day. The shop owner refuses to refund my 20,000 rupees."
```

System Output:

✔ Identifies:

```
Product → Fridge  
Amount → ₹20,000  
Issue → Defective Product
```

✔ Retrieves:

```
Consumer Protection Act Section
```

✔ Generates:

```
Refund Legal Notice PDF
```

---

# 📂 Project Structure

```
legal-chatbot/
│
├── backend/
│   ├── main.py
│   ├── rag_pipeline/
│   ├── ner/
│   ├── templates/
│   └── database/
│
├── frontend/
│   ├── src/
│   ├── components/
│   └── pages/
│
├── data/
│   ├── consumer_act/
│   ├── tenant_act/
│
├── docs/
│   └── architecture.png
│
├── tests/
│
├── requirements.txt
│
└── README.md
```

---

# 👥 Team Roles

## Legal NLP / NER Engineer

Responsible for:

* spaCy pipeline
* OpenNyAI integration
* Entity extraction logic

---

## Hybrid RAG Engineer

Responsible for:

* BM25 setup
* Vector DB integration
* Reciprocal Rank Fusion

---

## Frontend Developer

Responsible for:

* React UI
* Chat interface
* Document download UI

---

# 🔐 Ethical & Safety Measures

✔ Legal Disclaimers
✔ No hallucinated laws
✔ Verified legal sources
✔ Human referral fallback

---

# 📈 Future Enhancements

* Voice-based interaction
* OCR document upload
* Additional legal domains
* Mobile App version

---

# 🏁 How to Run the Project

## Backend

```bash
cd backend

pip install -r requirements.txt

uvicorn main:app --reload
```

---

## Frontend

```bash
cd frontend

npm install

npm run dev
```

---

# 🎥 Demo Scenario

Example:

```
User:
"I bought a fridge and it broke the next day."

System:

✔ Explains legal rights  
✔ Shows correct legal section  
✔ Generates refund notice PDF  
```

---

# 📜 License

MIT License

---

# ⭐ Why This Project Matters

This system transforms:

📄 **50-page legal documents**
➡️
📌 **3-step actionable legal guidance**

Empowering citizens with **accessible legal knowledge**.

---

If you want, I can also create:

* **Architecture Flowchart PNG**
* **System Prompt Template**
* **Jinja2 Legal Notice Template**
* **Presentation PPT**
* **GitHub repo folder template**

Just tell me.
