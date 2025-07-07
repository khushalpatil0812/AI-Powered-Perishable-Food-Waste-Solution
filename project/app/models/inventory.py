from sqlalchemy import Column, String, Integer, Float, DateTime, ForeignKey
from sqlalchemy.sql import func
from app.database import Base
import uuid

class Inventory(Base):
    __tablename__ = "inventory"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    product_id = Column(String, ForeignKey("products.id"))
    store_id = Column(String, ForeignKey("stores.id"))
    current_level = Column(Integer, default=0)
    optimal_level = Column(Integer, default=0)
    status = Column(String, default="optimal")  # optimal, overstocked, understocked
    last_updated = Column(DateTime, server_default=func.now())
    created_at = Column(DateTime, server_default=func.now())