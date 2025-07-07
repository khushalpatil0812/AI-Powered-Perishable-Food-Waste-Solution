#!/usr/bin/env python3
"""
Walmart AI Backend Runner
Simple script to start the FastAPI server
"""

import uvicorn
from app.main import app

if __name__ == "__main__":
    print("🚀 Starting Walmart AI Optimization Backend...")
    print("📊 Dashboard: http://localhost:8000")
    print("📖 API Docs: http://localhost:8000/docs")
    print("🔍 Health Check: http://localhost:8000/health")
    print("-" * 50)

    uvicorn.run(
        "app.main:app",  # pass as string!
        host="127.0.0.1",
        port=8000,
        reload=True,
        log_level="info"
    )
