import os
import re
from rank_bm25 import BM25Okapi
from config import DATA_DIR

try:
    import chromadb
    from chromadb.utils import embedding_functions
    CHROMA_AVAILABLE = True
except ImportError:
    CHROMA_AVAILABLE = False


class HybridSearch:
    def __init__(self):
        self.documents = []
        self.bm25 = None
        self.collection = None
        self._load_documents()
        self._build_bm25()
        if CHROMA_AVAILABLE:
            self._build_vector_store()

    def _load_documents(self):
        domain_map = {
            'tenant_rights.txt': 'tenant',
            'consumer_protection.txt': 'consumer',
            'general_laws.txt': 'general',
        }
        for filename, domain in domain_map.items():
            filepath = os.path.join(DATA_DIR, filename)
            if not os.path.exists(filepath):
                continue
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            chunks = self._split_into_sections(content, domain)
            self.documents.extend(chunks)

    def _split_into_sections(self, text, domain):
        sections = re.split(r'\n(?=Section \d+)', text.strip())
        chunks = []
        for section in sections:
            if not section.strip():
                continue
            lines = section.strip().split('\n')
            section_id = lines[0].strip() if lines else 'Unknown'
            title = lines[1].strip() if len(lines) > 1 else ''
            body = '\n'.join(lines[2:]).strip() if len(lines) > 2 else ''
            chunks.append({
                'id': f"{domain}_{section_id.replace(' ', '_').lower()}",
                'source': f"{section_id} - {title}",
                'section': section_id,
                'title': title,
                'text': f"{section_id}\n{title}\n{body}",
                'domain': domain,
            })
        return chunks

    def _build_bm25(self):
        tokenized = [doc['text'].lower().split() for doc in self.documents]
        if tokenized:
            self.bm25 = BM25Okapi(tokenized)

    def _build_vector_store(self):
        db_path = os.path.join(os.path.dirname(__file__), '..', 'chroma_db')
        client = chromadb.PersistentClient(path=db_path)

        ef = embedding_functions.DefaultEmbeddingFunction()
        self.collection = client.get_or_create_collection(
            name="legal_docs",
            embedding_function=ef,
        )

        if self.collection.count() == 0 and self.documents:
            self.collection.add(
                ids=[d['id'] for d in self.documents],
                documents=[d['text'] for d in self.documents],
                metadatas=[{'domain': d['domain'], 'source': d['source'], 'section': d['section']} for d in self.documents],
            )

    def search(self, query, domain=None, top_k=5):
        bm25_results = self._bm25_search(query, domain, top_k * 2)
        vector_results = self._vector_search(query, domain, top_k * 2) if self.collection else []
        fused = self._reciprocal_rank_fusion(bm25_results, vector_results, k=60)
        return fused[:top_k]

    def _bm25_search(self, query, domain, top_k):
        if not self.bm25:
            return []
        tokenized_query = query.lower().split()
        scores = self.bm25.get_scores(tokenized_query)

        scored_docs = []
        for i, score in enumerate(scores):
            doc = self.documents[i]
            if domain and doc['domain'] != domain and doc['domain'] != 'general':
                continue
            scored_docs.append((doc, score))

        scored_docs.sort(key=lambda x: x[1], reverse=True)
        return [doc for doc, _ in scored_docs[:top_k]]

    def _vector_search(self, query, domain, top_k):
        if not self.collection:
            return []
        where_filter = None
        if domain:
            where_filter = {"$or": [{"domain": domain}, {"domain": "general"}]}

        results = self.collection.query(
            query_texts=[query],
            n_results=top_k,
            where=where_filter,
        )

        docs = []
        if results and results['documents']:
            for i, doc_text in enumerate(results['documents'][0]):
                meta = results['metadatas'][0][i] if results['metadatas'] else {}
                docs.append({
                    'id': results['ids'][0][i] if results['ids'] else f'vec_{i}',
                    'text': doc_text,
                    'source': meta.get('source', 'Unknown'),
                    'section': meta.get('section', ''),
                    'domain': meta.get('domain', ''),
                })
        return docs

    def _reciprocal_rank_fusion(self, bm25_results, vector_results, k=60):
        scores = {}
        doc_map = {}

        for rank, doc in enumerate(bm25_results):
            doc_id = doc.get('id', doc['source'])
            scores[doc_id] = scores.get(doc_id, 0) + 1 / (k + rank + 1)
            doc_map[doc_id] = doc

        for rank, doc in enumerate(vector_results):
            doc_id = doc.get('id', doc['source'])
            scores[doc_id] = scores.get(doc_id, 0) + 1 / (k + rank + 1)
            doc_map[doc_id] = doc

        sorted_ids = sorted(scores.keys(), key=lambda x: scores[x], reverse=True)
        return [doc_map[doc_id] for doc_id in sorted_ids]
