from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from typing import Dict, Any
from datetime import datetime

router = APIRouter()

@router.get("/summary")
async def get_dashboard_summary(db: Session = Depends(get_db)) -> Dict[str, Any]:
    """Get executive summary data for dashboard"""

    return {
        "kpis": {
            "waste_reduction": {
                "value": "35%",
                "change": "+5% from last month",
                "trend": "up"
            },
            "cost_savings": {
                "value": "$900K",
                "change": "+12% from last month",
                "trend": "up"
            },
            "roi": {
                "value": "340%",
                "change": "+8% from last month",
                "trend": "up"
            },
            "active_stores": {
                "value": "3/3",
                "change": "100% coverage",
                "trend": "up"
            }
        },
        "stores": [
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
        ],
        "alerts": [
            {
                "id": "1",
                "type": "High",
                "message": "Store C: Milk expiring in 2 days - 45 units",
                "store": "Store C"
            },
            {
                "id": "2",
                "type": "Medium",
                "message": "Store A: Optimize bread pricing - potential 15% savings",
                "store": "Store A"
            },
            {
                "id": "3",
                "type": "Info",
                "message": "System processed 1,247 optimization recommendations today"
            }
        ],
        "last_updated": datetime.now().isoformat()
    }

@router.get("/waste-trends")
async def get_waste_trends():
    """Get waste reduction trend data"""
    return {
        "data": [
            {"name": "Week 1", "before": 45000, "after": 45000, "reduction": 0},
            {"name": "Week 2", "before": 45000, "after": 40500, "reduction": 10},
            {"name": "Week 3", "before": 45000, "after": 35100, "reduction": 22},
            {"name": "Week 4", "before": 45000, "after": 29250, "reduction": 35}
        ]
    }

@router.get("/store-comparison")
async def get_store_comparison():
    """Get store comparison data for charts"""
    return {
        "data": [
            {"name": "Store A", "savings": 320, "waste": 35},
            {"name": "Store B", "savings": 250, "waste": 28},
            {"name": "Store C", "savings": 330, "waste": 42}
        ]
    }