import os
from dotenv import load_dotenv

_env_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '.env')
load_dotenv(_env_path, override=True)

GEMINI_API_KEY = os.getenv('GEMINI_API_KEY', '')
ANTHROPIC_API_KEY = os.getenv('ANTHROPIC_API_KEY', '')
DATABASE_URL = os.getenv('DATABASE_URL', 'sqlite:///./law_advisor.db')
PORT = int(os.getenv('PORT', 8000))
FRONTEND_URL = os.getenv('FRONTEND_URL', 'http://localhost:3000')
DATA_DIR = os.path.join(os.path.dirname(__file__), '..', 'data')

def get_llm_provider():
    if GEMINI_API_KEY:
        return 'gemini'
    if ANTHROPIC_API_KEY:
        return 'claude'
    return None
