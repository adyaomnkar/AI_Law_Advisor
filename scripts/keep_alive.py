"""
Keep-Alive Pinger for Render Free Tier
Pings the backend every 14 minutes to prevent cold starts.

Usage:
  python scripts/keep_alive.py

Or use a free cron service instead:
  - https://cron-job.org (free, 1-min intervals)
  - https://uptimerobot.com (free, 5-min intervals)

Set the URL to: https://ai-law-advisor-api.onrender.com/health
Set interval to: every 14 minutes
"""

import time
import urllib.request

BACKEND_URL = "https://ai-law-advisor-api.onrender.com/health"
INTERVAL = 14 * 60  # 14 minutes in seconds

def ping():
    try:
        req = urllib.request.urlopen(BACKEND_URL, timeout=30)
        print(f"[Ping] {req.status} OK - Backend is alive")
    except Exception as e:
        print(f"[Ping] Failed - {e}")

if __name__ == "__main__":
    print(f"[Keep-Alive] Pinging {BACKEND_URL} every {INTERVAL // 60} minutes")
    print("[Keep-Alive] Press Ctrl+C to stop\n")
    while True:
        ping()
        time.sleep(INTERVAL)
