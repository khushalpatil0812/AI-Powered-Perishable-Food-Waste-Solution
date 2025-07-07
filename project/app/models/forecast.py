from sqlalchemy import Column, String, Integer, Float, DateTime, ForeignKey, JSON
from sqlalchemy.sql import func
from app.database import Base
import uuid

class Forecast(Base):
    __tablename__ = "forecasts"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    product_id = Column(String, ForeignKey("products.id"))
    store_id = Column(String, ForeignKey("stores.id"))
    forecast_date = Column(DateTime, nullable=False)
    predicted_demand = Column(Integer, default=0)
    actual_demand = Column(Integer, nullable=True)
    confidence_score = Column(Float, default=0.0)
    model_version = Column(String, default="v1.0")
    created_at = Column(DateTime, server_default=func.now())