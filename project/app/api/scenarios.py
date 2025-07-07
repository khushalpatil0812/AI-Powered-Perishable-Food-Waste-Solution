from fastapi import APIRouter
from pydantic import BaseModel
from typing import Dict, List

router = APIRouter()

class ScenarioRequest(BaseModel):
    demand_change: float
    weather_impact: str
    competition: str
    economic_conditions: str

@router.get("/prebuilt")
async def get_prebuilt_scenarios():
    """Get predefined scenarios"""
    return {
        "scenarios": [
            {
                "id": "holiday",
                "name": "Holiday Season Impact",
                "demand_change": 25,
                "weather": "normal",
                "competition": "high",
                "economic": "growth"
            },
            {
                "id": "supply",
                "name": "Supply Chain Disruption",
                "demand_change": -15,
                "weather": "severe",
                "competition": "medium",
                "economic": "recession"
            },
            {
                "id": "downturn",
                "name": "Economic Downturn",
                "demand_change": -20,
                "weather": "normal",
                "competition": "high",
                "economic": "recession"
            },
            {
                "id": "expansion",
                "name": "Store Expansion",
                "demand_change": 40,
                "weather": "normal",
                "competition": "low",
                "economic": "growth"
            }
        ]
    }

@router.post("/analyze")
async def analyze_scenario(scenario: ScenarioRequest):
    """Analyze a custom scenario"""
    
    # Base metrics
    base_waste_reduction = 35
    base_cost_savings = 900000
    base_roi = 340
    
    # Calculate impact multiplier
    impact_multiplier = 1.0
    
    # Demand change impact
    impact_multiplier += scenario.demand_change / 100 * 0.5
    
    # Weather impact
    weather_multipliers = {"normal": 1.0, "severe": 0.85, "extreme": 0.7}
    impact_multiplier *= weather_multipliers.get(scenario.weather_impact, 1.0)
    
    # Competition impact
    competition_multipliers = {"low": 1.1, "medium": 1.0, "high": 0.9}
    impact_multiplier *= competition_multipliers.get(scenario.competition, 1.0)
    
    # Economic conditions impact
    economic_multipliers = {"recession": 0.8, "normal": 1.0, "growth": 1.2}
    impact_multiplier *= economic_multipliers.get(scenario.economic_conditions, 1.0)
    
    # Calculate scenario metrics
    scenario_waste_reduction = max(0, min(50, base_waste_reduction * impact_multiplier))
    scenario_cost_savings = max(0, base_cost_savings * impact_multiplier)
    scenario_roi = max(0, base_roi * impact_multiplier)
    
    # Determine risk level
    if impact_multiplier < 0.8:
        risk_level = "High"
    elif impact_multiplier < 1.1:
        risk_level = "Medium"
    else:
        risk_level = "Low"
    
    return {
        "scenario_metrics": {
            "waste_reduction": round(scenario_waste_reduction, 1),
            "cost_savings": round(scenario_cost_savings, 0),
            "roi": round(scenario_roi, 0),
            "risk_level": risk_level
        },
        "baseline_metrics": {
            "waste_reduction": base_waste_reduction,
            "cost_savings": base_cost_savings,
            "roi": base_roi,
            "risk_level": "Low"
        },
        "impact_multiplier": round(impact_multiplier, 2)
    }

@router.get("/what-if")
async def get_what_if_questions():
    """Get what-if analysis questions"""
    return {
        "questions": [
            {
                "question": "What if we expand to 10 stores?",
                "impact": "+150% cost savings",
                "risk": "Medium"
            },
            {
                "question": "What if demand drops 20%?",
                "impact": "-25% waste reduction",
                "risk": "High"
            },
            {
                "question": "What if implementation costs increase?",
                "impact": "-40% ROI",
                "risk": "Medium"
            },
            {
                "question": "What if we achieve 50% waste reduction?",
                "impact": "+45% cost savings",
                "risk": "Low"
            }
        ]
    }

@router.get("/comparison")
async def get_scenario_comparison():
    """Get comparison data for charts"""
    return {
        "comparison_data": [
            {
                "metric": "Waste Reduction",
                "baseline": 35,
                "scenario": 28,
                "unit": "%"
            },
            {
                "metric": "Cost Savings",
                "baseline": 900,
                "scenario": 720,
                "unit": "K"
            },
            {
                "metric": "ROI",
                "baseline": 340,
                "scenario": 272,
                "unit": "%"
            }
        ]
    }