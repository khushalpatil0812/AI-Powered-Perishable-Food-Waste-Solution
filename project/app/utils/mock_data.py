import random
from datetime import datetime, timedelta
from typing import Dict, List

def generate_store_data() -> List[Dict]:
    """Generate mock store data"""
    stores = [
        {
            "id": "store-a",
            "name": "Store A - Urban",
            "location": "Downtown",
            "type": "Urban",
            "waste_reduction": 35,
            "cost_savings": 320000,
            "status": "Active"
        },
        {
            "id": "store-b",
            "name": "Store B - Suburban", 
            "location": "Mall",
            "type": "Suburban",
            "waste_reduction": 28,
            "cost_savings": 250000,
            "status": "Active"
        },
        {
            "id": "store-c",
            "name": "Store C - Rural",
            "location": "Highway", 
            "type": "Rural",
            "waste_reduction": 42,
            "cost_savings": 330000,
            "status": "Active"
        }
    ]
    return stores

def generate_product_data() -> List[Dict]:
    """Generate mock product data"""
    products = [
        {"name": "Milk 2%", "category": "Dairy", "current_stock": 120, "optimal_stock": 95, "reorder_point": 30},
        {"name": "Bananas", "category": "Produce", "current_stock": 80, "optimal_stock": 110, "reorder_point": 25},
        {"name": "Bread", "category": "Bakery", "current_stock": 45, "optimal_stock": 35, "reorder_point": 15},
        {"name": "Chicken Breast", "category": "Meat", "current_stock": 60, "optimal_stock": 75, "reorder_point": 20},
        {"name": "Deli Sandwiches", "category": "Deli", "current_stock": 25, "optimal_stock": 20, "reorder_point": 8}
    ]
    return products

def generate_forecast_data(days: int = 7) -> List[Dict]:
    """Generate mock forecast data"""
    days_of_week = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    forecast_data = []
    
    for i in range(days):
        day = days_of_week[i % 7]
        base_demand = random.randint(800, 1400)
        predicted = base_demand + random.randint(-50, 50)
        confidence = random.randint(15, 35)
        
        forecast_data.append({
            "day": day,
            "actual": base_demand,
            "predicted": predicted,
            "confidence": confidence
        })
    
    return forecast_data

def get_mock_dashboard_data() -> Dict:
    """Get complete mock dashboard data"""
    return {
        "stores": generate_store_data(),
        "products": generate_product_data(),
        "forecast": generate_forecast_data(),
        "last_updated": datetime.now().isoformat()
    }