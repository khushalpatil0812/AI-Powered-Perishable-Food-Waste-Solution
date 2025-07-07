from fastapi import APIRouter, Query
from typing import Optional

router = APIRouter()

@router.get("/summary")
async def get_waste_summary():
    """Get waste reduction summary data"""
    return {
        "metrics": {
            "total_waste_reduction": 35,
            "current_monthly_waste": 89000,
            "projected_monthly_waste": 58000,
            "environmental_impact": 1200  # tons CO2 saved
        },
        "trends": [
            {"name": "Week 1", "before": 45000, "after": 45000, "reduction": 0},
            {"name": "Week 2", "before": 45000, "after": 40500, "reduction": 10},
            {"name": "Week 3", "before": 45000, "after": 35100, "reduction": 22},
            {"name": "Week 4", "before": 45000, "after": 29250, "reduction": 35}
        ]
    }

@router.get("/by-category")
async def get_waste_by_category():
    """Get waste breakdown by product category"""
    return {
        "categories": [
            {"name": "Dairy", "value": 25, "amount": 22000},
            {"name": "Produce", "value": 35, "amount": 31000},
            {"name": "Bakery", "value": 20, "amount": 18000},
            {"name": "Meat", "value": 15, "amount": 13000},
            {"name": "Deli", "value": 5, "amount": 4000}
        ]
    }

@router.get("/by-store")
async def get_waste_by_store():
    """Get waste reduction by store"""
    return {
        "stores": [
            {"name": "Store A", "reduction": 35, "before": 30000, "after": 19500},
            {"name": "Store B", "reduction": 28, "before": 30000, "after": 21600},
            {"name": "Store C", "reduction": 42, "before": 30000, "after": 17400}
        ]
    }

@router.get("/timeline")
async def get_implementation_timeline():
    """Get implementation timeline with impact"""
    return {
        "timeline": [
            {"week": "Week 1", "event": "Implemented ML forecasting", "impact": "5% reduction"},
            {"week": "Week 2", "event": "Optimized inventory levels", "impact": "15% reduction"},
            {"week": "Week 3", "event": "Dynamic pricing activated", "impact": "25% reduction"},
            {"week": "Week 4", "event": "Full system integration", "impact": "35% reduction"}
        ]
    }

@router.post("/predict")
async def predict_waste(store_id: str, product_id: str):
    """Predict potential waste for a product"""
    return {
        "store_id": store_id,
        "product_id": product_id,
        "waste_probability": 0.23,
        "estimated_waste_value": 450,
        "prevention_actions": ["reduce_order", "dynamic_pricing", "promotion"],
        "confidence": 0.87
    }