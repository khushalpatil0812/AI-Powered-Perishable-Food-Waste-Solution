from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    # Database
    DATABASE_URL: str = "sqlite:///./walmart_ai.db"  # Default to SQLite for easy setup
    
    # Redis (optional for caching)
    REDIS_URL: str = "redis://localhost:6379"
    
    # API Keys (for external services)
    WEATHER_API_KEY: Optional[str] = None
    
    # Security
    SECRET_KEY: str = "walmart-ai-super-secret-key-2024-hackathon"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # Environment
    ENVIRONMENT: str = "development"
    
    # CORS
    ALLOWED_ORIGINS: list = [
        "http://localhost:3000",
        "http://localhost:5173",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:5173"
    ]

    class Config:
        env_file = ".env"

settings = Settings()