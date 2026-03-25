import sqlite3
import os
from datetime import datetime

DB_PATH = os.path.join(os.path.dirname(__file__), '..', 'law_advisor.db')


def get_conn():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    conn = get_conn()
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS users (
        user_id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        language TEXT DEFAULT 'en',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )''')
    c.execute('''CREATE TABLE IF NOT EXISTS sessions (
        session_id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER REFERENCES users(user_id),
        query TEXT,
        response TEXT,
        domain TEXT,
        language TEXT DEFAULT 'en',
        entities TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )''')
    c.execute('''CREATE TABLE IF NOT EXISTS generated_documents (
        doc_id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER REFERENCES users(user_id),
        document_type TEXT,
        file_path TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )''')
    conn.commit()
    conn.close()


def save_session(query, response, domain='tenant', language='en', entities=None, user_id=None):
    import json
    conn = get_conn()
    c = conn.cursor()
    c.execute(
        'INSERT INTO sessions (user_id, query, response, domain, language, entities) VALUES (?, ?, ?, ?, ?, ?)',
        (user_id, query, response, domain, language, json.dumps(entities) if entities else None)
    )
    conn.commit()
    session_id = c.lastrowid
    conn.close()
    return session_id


def save_document(user_id, document_type, file_path):
    conn = get_conn()
    c = conn.cursor()
    c.execute(
        'INSERT INTO generated_documents (user_id, document_type, file_path) VALUES (?, ?, ?)',
        (user_id, document_type, file_path)
    )
    conn.commit()
    doc_id = c.lastrowid
    conn.close()
    return doc_id


def get_sessions(limit=50):
    conn = get_conn()
    c = conn.cursor()
    c.execute('SELECT * FROM sessions ORDER BY created_at DESC LIMIT ?', (limit,))
    rows = c.fetchall()
    conn.close()
    return [dict(r) for r in rows]
