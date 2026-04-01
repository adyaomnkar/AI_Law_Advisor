#!/bin/bash
set -e

echo "[Build] Installing Python dependencies..."
pip install -r requirements.txt

echo "[Build] Downloading spaCy model..."
python -m spacy download en_core_web_sm

echo "[Build] Build complete!"
