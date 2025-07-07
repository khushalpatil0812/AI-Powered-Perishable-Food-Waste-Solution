from fastapi import APIRouter, Query
from typing import List, Dict, Optional

router = APIRouter()

@router.get("/recommendations")
async def get_inventory_recommendations(store_id: str = Query("all", description="Store ID filter")):
    """Get inventory optimization recommendations"""
    
    return {
        "products": [
            {
                "name": "Milk 2%", 
                "category": "Dairy", 
                "current_stock": 120, 
                "optimal_stock": 95, 
                "reorder_point": 30, 
                "savings": 450, 
                "action": "Reduce"
            },
            {
                "name": "Bananas", 
                "category": "Produce", 
                "current_stock": 80, 
                "optimal_stock": 110, 
                "reorder_point": 25, 
                "savings": 230, 
                "action": "Increase"
            },
            {
                "name": "Bread", 
                "category": "Bakery", 
                "current_stock": 45, 
                "optimal_stock": 35, 
                "reorder_point": 15, 
                "savings": 180, 
                "action": "Reduce"
            },
            {
                "name": "Chicken Breast", 
                "category": "Meat", 
                "current_stock": 60, 
                "optimal_stock": 75, 
                "reorder_point": 20, 
                "savings": 320, 
                "action": "Increase"
            },
            {
                "name": "Deli Sandwiches", 
                "category": "Deli", 
                "current_stock": 25, 
                "optimal_stock": 20, 
                "reorder_point": 8, 
                "savings": 120, 
                "action": "Reduce"
            }
        ],
        "metrics": {
            "total_skus": 1247,
            "optimized_items": 892,
            "savings_potential": 250000,
            "turnover_rate": 12.5,
            "current_inventory_value": 1200000,
            "optimal_inventory_value": 950000
        },
        "heatmap_data": [
            {"category": "Dairy", "store": "Store A", "level": 85, "status": "optimal"},
            {"category": "Dairy", "store": "Store B", "level": 95, "status": "overstocked"},
            {"category": "Dairy", "store": "Store C", "level": 75, "status": "understocked"},
            {"category": "Produce", "store": "Store A", "level": 90, "status": "optimal"},
            {"category": "Produce", "store": "Store B", "level": 70, "status": "understocked"},
            {"category": "Produce", "store": "Store C", "level": 95, "status": "overstocked"},
            {"category": "Bakery", "store": "Store A", "level": 80, "status": "optimal"},
            {"category": "Bakery", "store": "Store B", "level": 85, "status": "optimal"},
            {"category": "Bakery", "store": "Store C", "level": 92, "status": "overstocked"}
        ],
        "action_items": [
            {"type": "urgent", "count": 12, "message": "items expiring in 24 hours"},
            {"type": "moderate", "count": 34, "message": "items need reordering"},
            {"type": "optimal", "count": 156, "message": "items properly stocked"}
        ]
    }

@router.post("/optimize")
async def optimize_inventory(store_id: str):
    """Run inventory optimization for a store"""
    return {
        "message": f"Optimization started for {store_id}", 
        "job_id": f"opt_{store_id}_{int(datetime.now().timestamp())}",
        "estimated_completion": "5 minutes",
        "status": "processing"
    }

@router.get("/levels/{store_id}")
async def get_inventory_levels(store_id: str):
    """Get current inventory levels for a store"""
    return {
        "store_id": store_id,
        "categories": {
            "dairy": {"current": 85, "optimal": 90, "status": "understocked"},
            "produce": {"current": 92, "optimal": 85, "status": "overstocked"},
            "bakery": {"current": 78, "optimal": 80, "status": "optimal"},
            "meat": {"current": 88, "optimal": 85, "status": "optimal"},
            "deli": {"current": 95, "optimal": 75, "status": "overstocked"}
        },
        "last_updated": datetime.now().isoformat()
    }