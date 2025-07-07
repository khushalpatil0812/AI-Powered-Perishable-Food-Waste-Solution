from fastapi import APIRouter, Query
from app.services.ml_service import MLService
from typing import Optional
from datetime import datetime

router = APIRouter()
ml_service = MLService()

@router.get("/predictions")
async def get_demand_predictions(
    store_id: Optional[str] = Query(None, description="Store ID filter"),
    product_category: Optional[str] = Query(None, description="Product category filter"),
    days: int = Query(7, description="Number of days to forecast")
):
    """Get demand forecasting predictions"""
    
    return {
        "forecast_data": [
            {"day": "Mon", "actual": 850, "predicted": 820, "confidence": 15},
            {"day": "Tue", "actual": 920, "predicted": 890, "confidence": 20},
            {"day": "Wed", "actual": 780, "predicted": 810, "confidence": 18},
            {"day": "Thu", "actual": 1050, "predicted": 1020, "confidence": 25},
            {"day": "Fri", "actual": 1200, "predicted": 1180, "confidence": 30},
            {"day": "Sat", "actual": 1350, "predicted": 1320, "confidence": 35},
            {"day": "Sun", "actual": 980, "predicted": 950, "confidence": 22}
        ],
        "accuracy_metrics": {
            "prediction_accuracy": 88.5,
            "mean_absolute_error": 12.3,
            "r_squared": 0.847,
            "last_updated": "2 min"
        },
        "top_products": [
            {"name": "Milk 2%", "accuracy": 92, "trend": "up", "prediction": "+15%"},
            {"name": "Bananas", "accuracy": 88, "trend": "up", "prediction": "+8%"},
            {"name": "Bread", "accuracy": 85, "trend": "down", "prediction": "-5%"},
            {"name": "Chicken", "accuracy": 90, "trend": "up", "prediction": "+12%"},
            {"name": "Apples", "accuracy": 87, "trend": "up", "prediction": "+6%"}
        ],
        "weather_impact": [
            {"day": "Today", "temp": 72, "condition": "sunny", "impact": "+5%"},
            {"day": "Tomorrow", "temp": 65, "condition": "rainy", "impact": "+12%"},
            {"day": "Weekend", "temp": 58, "condition": "stormy", "impact": "+20%"}
        ]
    }

@router.post("/generate")
async def generate_forecast(store_id: str, product_id: str, days: int = 7):
    """Generate new forecast for specific product"""
    forecast = ml_service.predict_demand(store_id, product_id, days)
    return {
        "forecast": forecast, 
        "generated_at": datetime.now().isoformat(),
        "model_version": "v2.1",
        "confidence": 0.885
    }

@router.get("/accuracy")
async def get_forecast_accuracy():
    """Get forecasting accuracy metrics"""
    return {
        "overall_accuracy": 88.5,
        "by_category": {
            "dairy": 92.1,
            "produce": 85.3,
            "bakery": 89.7,
            "meat": 90.2,
            "deli": 87.8
        },
        "by_store": {
            "store-a": 89.2,
            "store-b": 87.1,
            "store-c": 89.8
        }
    }