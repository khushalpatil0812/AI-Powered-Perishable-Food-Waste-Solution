from fastapi import APIRouter
from pydantic import BaseModel
from typing import List, Dict

router = APIRouter()

class ROICalculationRequest(BaseModel):
    num_stores: int
    implementation_cost: float
    current_waste: float
    expected_reduction: float
    time_horizon: str

@router.post("/calculate")
async def calculate_roi(request: ROICalculationRequest):
    """Calculate ROI based on input parameters"""
    
    total_implementation_cost = request.num_stores * request.implementation_cost
    monthly_waste_per_store = request.current_waste
    total_monthly_waste = request.num_stores * monthly_waste_per_store
    monthly_savings = total_monthly_waste * (request.expected_reduction / 100)
    annual_savings = monthly_savings * 12
    break_even_months = total_implementation_cost / monthly_savings if monthly_savings > 0 else 0
    
    time_multiplier = 0.5 if request.time_horizon == '6months' else 1 if request.time_horizon == '1year' else 2
    total_savings = annual_savings * time_multiplier
    roi = ((total_savings - total_implementation_cost) / total_implementation_cost) * 100 if total_implementation_cost > 0 else 0
    
    # Generate timeline data
    months = 6 if request.time_horizon == '6months' else 12 if request.time_horizon == '1year' else 24
    timeline_data = []
    
    for i in range(months + 1):
        cumulative_savings = monthly_savings * i
        net_roi = cumulative_savings - total_implementation_cost
        timeline_data.append({
            "month": i,
            "investment": total_implementation_cost,
            "savings": cumulative_savings,
            "netROI": net_roi
        })
    
    return {
        "calculations": {
            "total_implementation_cost": total_implementation_cost,
            "monthly_savings": monthly_savings,
            "annual_savings": annual_savings,
            "break_even_months": round(break_even_months, 1),
            "roi": round(roi, 1),
            "total_savings": total_savings
        },
        "timeline_data": timeline_data
    }

@router.get("/scenarios")
async def get_roi_scenarios():
    """Get predefined ROI scenarios"""
    return {
        "scenarios": [
            {"name": "Conservative (25%)", "roi": 245, "break_even": 6.2, "savings": 283500},
            {"name": "Realistic (35%)", "roi": 340, "break_even": 4.8, "savings": 378000},
            {"name": "Optimistic (45%)", "roi": 435, "break_even": 3.7, "savings": 472500}
        ]
    }

@router.get("/sensitivity")
async def get_sensitivity_analysis():
    """Get sensitivity analysis data"""
    base_stores = 3
    base_cost = 50000
    base_waste = 30000
    
    sensitivity_data = []
    
    for reduction_rate in [20, 25, 30, 35, 40, 45]:
        monthly_savings = base_stores * base_waste * (reduction_rate / 100)
        break_even = (base_stores * base_cost) / monthly_savings
        two_year_roi = ((monthly_savings * 24 - base_stores * base_cost) / (base_stores * base_cost)) * 100
        risk = "High" if reduction_rate < 25 else "Medium" if reduction_rate < 35 else "Low"
        
        sensitivity_data.append({
            "reduction_rate": reduction_rate,
            "monthly_savings": monthly_savings,
            "break_even": round(break_even, 1),
            "two_year_roi": round(two_year_roi, 0),
            "risk": risk
        })
    
    return {"sensitivity_data": sensitivity_data}