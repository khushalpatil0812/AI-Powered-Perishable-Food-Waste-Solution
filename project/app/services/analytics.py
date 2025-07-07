from typing import Dict, List
import pandas as pd
import numpy as np
from datetime import datetime, timedelta

class AnalyticsService:
    def __init__(self):
        self.version = "v1.5"
    
    def calculate_waste_metrics(self, store_data: List[Dict]) -> Dict:
        """Calculate comprehensive waste metrics"""
        
        total_waste_before = sum(store.get("waste_before", 30000) for store in store_data)
        total_waste_after = sum(store.get("waste_after", 20000) for store in store_data)
        
        waste_reduction_percentage = ((total_waste_before - total_waste_after) / total_waste_before) * 100
        cost_savings = total_waste_before - total_waste_after
        
        return {
            "total_waste_before": total_waste_before,
            "total_waste_after": total_waste_after,
            "waste_reduction_percentage": round(waste_reduction_percentage, 1),
            "cost_savings": cost_savings,
            "environmental_impact": {
                "co2_saved_tons": round(cost_savings * 0.0013, 1),  # Mock conversion factor
                "equivalent_cars_off_road": round(cost_savings * 0.0002, 0)
            }
        }
    
    def generate_trend_analysis(self, days: int = 30) -> List[Dict]:
        """Generate trend analysis data"""
        
        trends = []
        base_waste = 45000
        
        for i in range(days):
            date = datetime.now() - timedelta(days=days-i-1)
            
            # Simulate gradual improvement
            improvement_factor = min(0.35, i * 0.012)  # Max 35% improvement
            current_waste = base_waste * (1 - improvement_factor)
            
            trends.append({
                "date": date.isoformat(),
                "waste_amount": round(current_waste, 0),
                "reduction_percentage": round(improvement_factor * 100, 1),
                "cost_impact": round((base_waste - current_waste), 0)
            })
        
        return trends
    
    def calculate_roi_metrics(self, investment: float, savings: float, months: int) -> Dict:
        """Calculate comprehensive ROI metrics"""
        
        total_savings = savings * months
        net_profit = total_savings - investment
        roi_percentage = (net_profit / investment) * 100 if investment > 0 else 0
        payback_period = investment / savings if savings > 0 else float('inf')
        
        return {
            "investment": investment,
            "monthly_savings": savings,
            "total_savings": total_savings,
            "net_profit": net_profit,
            "roi_percentage": round(roi_percentage, 1),
            "payback_period_months": round(payback_period, 1),
            "break_even_month": int(payback_period) if payback_period != float('inf') else None
        }