from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import dashboard, forecasting, inventory, waste, roi, scenarios
from app.config import settings
from app.database import create_tables
import uvicorn

# Create FastAPI app
app = FastAPI(
    title="Walmart AI Optimization API",
    description="AI-powered perishable optimization system for Walmart stores",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

# Include API routers
app.include_router(dashboard.router, prefix="/api/dashboard", tags=["Dashboard"])
app.include_router(forecasting.router, prefix="/api/forecasting", tags=["Forecasting"])
app.include_router(inventory.router, prefix="/api/inventory", tags=["Inventory"])
app.include_router(waste.router, prefix="/api/waste", tags=["Waste"])
app.include_router(roi.router, prefix="/api/roi", tags=["ROI"])
app.include_router(scenarios.router, prefix="/api/scenarios", tags=["Scenarios"])

@app.on_event("startup")
async def startup_event():
    """Initialize database tables on startup"""
    create_tables()
    print("🚀 Walmart AI Optimization API is starting up...")
    print(f"📊 Environment: {settings.ENVIRONMENT}")
    print(f"🗄️ Database: {settings.DATABASE_URL}")

@app.get("/")
async def root():
    """Root endpoint with API information"""
    return {
        "message": "Walmart AI-Powered Perishable Optimization API",
        "version": "1.0.0",
        "status": "running",
        "docs": "/docs",
        "endpoints": {
            "dashboard": "/api/dashboard",
            "forecasting": "/api/forecasting", 
            "inventory": "/api/inventory",
            "waste": "/api/waste",
            "roi": "/api/roi",
            "scenarios": "/api/scenarios"
        }
    }

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "timestamp": "2024-01-15T10:30:00Z",
        "version": "1.0.0"
    }

if __name__ == "__main__":
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )