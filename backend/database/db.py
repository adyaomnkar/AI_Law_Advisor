import os
import json
from datetime import datetime

PG_HOST = os.getenv('PG_HOST', 'localhost')
PG_PORT = os.getenv('PG_PORT', '5432')
PG_DB = os.getenv('PG_DB', 'law_advisor')
PG_USER = os.getenv('PG_USER', 'postgres')
PG_PASS = os.getenv('PG_PASS', 'postgres')

try:
    import psycopg2
    import psycopg2.extras
    _HAS_PG_DRIVER = True
except ImportError:
    _HAS_PG_DRIVER = False

_pg_failed = False
SQLITE_PATH = os.path.join(os.path.dirname(__file__), '..', 'law_advisor.db')


def _using_pg():
    return _HAS_PG_DRIVER and not _pg_failed


def get_conn():
    global _pg_failed
    if _HAS_PG_DRIVER and not _pg_failed:
        try:
            conn = psycopg2.connect(
                host=PG_HOST, port=PG_PORT,
                dbname=PG_DB, user=PG_USER, password=PG_PASS
            )
            conn.autocommit = True
            return conn
        except Exception:
            _pg_failed = True
            print("[DB] PostgreSQL connection failed, falling back to SQLite")

    import sqlite3
    conn = sqlite3.connect(SQLITE_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    conn = get_conn()
    c = conn.cursor()

    if _using_pg():
        c.execute('''CREATE TABLE IF NOT EXISTS users (
            user_id SERIAL PRIMARY KEY,
            name TEXT,
            language VARCHAR(10) DEFAULT 'en',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )''')
        c.execute('''CREATE TABLE IF NOT EXISTS sessions (
            session_id SERIAL PRIMARY KEY,
            user_id INTEGER REFERENCES users(user_id),
            query TEXT,
            response TEXT,
            domain VARCHAR(50),
            language VARCHAR(10) DEFAULT 'en',
            entities JSONB,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )''')
        c.execute('''CREATE TABLE IF NOT EXISTS generated_documents (
            doc_id SERIAL PRIMARY KEY,
            user_id INTEGER REFERENCES users(user_id),
            document_type VARCHAR(50),
            file_path TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )''')
    else:
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
    print(f"[DB] Using {'PostgreSQL' if _using_pg() else 'SQLite'}")


def save_session(query, response, domain='tenant', language='en', entities=None, user_id=None):
    conn = get_conn()
    c = conn.cursor()
    entities_val = json.dumps(entities) if entities else None

    if _using_pg():
        c.execute(
            'INSERT INTO sessions (user_id, query, response, domain, language, entities) VALUES (%s, %s, %s, %s, %s, %s) RETURNING session_id',
            (user_id, query, response, domain, language, entities_val)
        )
        session_id = c.fetchone()[0]
    else:
        c.execute(
            'INSERT INTO sessions (user_id, query, response, domain, language, entities) VALUES (?, ?, ?, ?, ?, ?)',
            (user_id, query, response, domain, language, entities_val)
        )
        conn.commit()
        session_id = c.lastrowid

    conn.close()
    return session_id


def save_document(user_id, document_type, file_path):
    conn = get_conn()
    c = conn.cursor()

    if _using_pg():
        c.execute(
            'INSERT INTO generated_documents (user_id, document_type, file_path) VALUES (%s, %s, %s) RETURNING doc_id',
            (user_id, document_type, file_path)
        )
        doc_id = c.fetchone()[0]
    else:
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

    if _using_pg():
        c = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
        c.execute('SELECT * FROM sessions ORDER BY created_at DESC LIMIT %s', (limit,))
    else:
        c = conn.cursor()
        c.execute('SELECT * FROM sessions ORDER BY created_at DESC LIMIT ?', (limit,))

    rows = c.fetchall()
    conn.close()
    return [dict(r) for r in rows]
