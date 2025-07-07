import numpy as np
import pandas as pd
from typing import List, Dict
from datetime import datetime, timedelta
import random

class MLService:
    def __init__(self):
        """Initialize ML Service with mock models"""
        self.model_version = "v2.1"
        self.accuracy = 0.885
        
    def predict_demand(self, store_id: str, product_id: str, days: int = 7) -> List[Dict]:
        """Predict demand for a product using ML model"""
        
        # Mock ML prediction - in production, this would load actual models
        base_demand = random.randint(800, 1200)
        predictions = []
        
        for i in range(days):
            # Add some realistic variance and trends
            daily_variance = random.randint(-100, 100)
            weekend_boost = 1.2 if (i + datetime.now().weekday()) % 7 in [5, 6] else 1.0
            
            daily_demand = int(base_demand * weekend_boost + daily_variance)
            confidence = round(random.uniform(0.8, 0.95), 2)
            
            predictions.append({
                "date": (datetime.now() + timedelta(days=i)).isoformat(),
                "predicted_demand": max(0, daily_demand),
                "confidence": confidence,
                "factors": {
                    "weather": random.choice(["sunny", "rainy", "cloudy"]),
                    "events": random.choice([None, "holiday", "promotion"])
                }
            })
        
        return predictions
    
    def optimize_inventory(self, store_id: str) -> Dict:
        """Optimize inventory levels using ML algorithms"""
        
        # Mock optimization results
        products_optimized = random.randint(20, 30)
        potential_savings = random.randint(10000, 50000)
        
        recommendations = []
        categories = ["dairy", "produce", "bakery", "meat", "deli"]
        
        for category in categories:
            action = random.choice(["reduce", "increase", "maintain"])
            impact = random.randint(5, 25)
            
            recommendations.append({
                "category": category,
                "action": action,
                "impact_percentage": impact,
                "confidence": round(random.uniform(0.7, 0.9), 2)
            })
        
        return {
            "store_id": store_id,
            "optimized_products": products_optimized,
            "potential_savings": potential_savings,
            "recommendations": recommendations,
            "model_confidence": 0.87,
            "last_updated": datetime.now().isoformat()
        }
    
    def predict_waste(self, store_id: str, product_id: str) -> Dict:
        """Predict potential waste for a product"""
        
        # Mock waste prediction
        waste_probability = round(random.uniform(0.1, 0.4), 2)
        estimated_value = random.randint(100, 1000)
        
        # Generate prevention actions based on probability
        actions = ["reduce_order", "dynamic_pricing", "promotion", "donation"]
        prevention_actions = random.sample(actions, random.randint(2, 3))
        
        return {
            "store_id": store_id,
            "product_id": product_id,
            "waste_probability": waste_probability,
            "estimated_waste_value": estimated_value,
            "prevention_actions": prevention_actions,
            "confidence": round(random.uniform(0.8, 0.95), 2),
            "risk_level": "high" if waste_probability > 0.3 else "medium" if waste_probability > 0.2 else "low"
        }
    
    def calculate_roi_impact(self, scenario_params: Dict) -> Dict:
        """Calculate ROI impact based on scenario parameters"""
        
        base_roi = 340
        impact_factors = {
            "demand_change": scenario_params.get("demand_change", 0) * 0.01,
            "weather": {"normal": 1.0, "severe": 0.9, "extreme": 0.8}.get(scenario_params.get("weather", "normal"), 1.0),
            "competition": {"low": 1.1, "medium": 1.0, "high": 0.9}.get(scenario_params.get("competition", "medium"), 1.0),
            "economic": {"recession": 0.8, "normal": 1.0, "growth": 1.2}.get(scenario_params.get("economic", "normal"), 1.0)
        }
        
        # Calculate combined impact
        total_impact = 1.0
        for factor, value in impact_factors.items():
            if factor == "demand_change":
                total_impact += value
            else:
                total_impact *= value
        
        adjusted_roi = base_roi * total_impact
        
        return {
            "base_roi": base_roi,
            "adjusted_roi": round(adjusted_roi, 1),
            "impact_percentage": round((total_impact - 1) * 100, 1),
            "risk_assessment": "high" if total_impact < 0.8 else "medium" if total_impact < 1.1 else "low"
        }