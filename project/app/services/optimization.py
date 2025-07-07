from typing import Dict, List
import random
from datetime import datetime

class OptimizationService:
    def __init__(self):
        self.algorithm_version = "v3.2"
    
    def optimize_store_inventory(self, store_id: str) -> Dict:
        """Optimize inventory for a specific store"""
        
        # Mock optimization algorithm
        categories = ["dairy", "produce", "bakery", "meat", "deli"]
        optimizations = []
        
        total_savings = 0
        
        for category in categories:
            current_level = random.randint(70, 120)
            optimal_level = random.randint(60, 100)
            action = "reduce" if current_level > optimal_level else "increase" if current_level < optimal_level else "maintain"
            savings = abs(current_level - optimal_level) * random.randint(10, 50)
            
            total_savings += savings
            
            optimizations.append({
                "category": category,
                "current_level": current_level,
                "optimal_level": optimal_level,
                "action": action,
                "potential_savings": savings,
                "confidence": round(random.uniform(0.8, 0.95), 2)
            })
        
        return {
            "store_id": store_id,
            "optimizations": optimizations,
            "total_potential_savings": total_savings,
            "optimization_score": round(random.uniform(0.85, 0.95), 2),
            "generated_at": datetime.now().isoformat()
        }
    
    def calculate_reorder_points(self, product_data: List[Dict]) -> List[Dict]:
        """Calculate optimal reorder points for products"""
        
        optimized_products = []
        
        for product in product_data:
            # Mock reorder point calculation
            current_stock = product.get("current_stock", 100)
            avg_daily_demand = random.randint(10, 30)
            lead_time = random.randint(2, 7)
            safety_stock = avg_daily_demand * 2
            
            reorder_point = (avg_daily_demand * lead_time) + safety_stock
            optimal_stock = reorder_point + (avg_daily_demand * 7)  # Week's worth
            
            action = "reduce" if current_stock > optimal_stock * 1.2 else "increase" if current_stock < optimal_stock * 0.8 else "maintain"
            
            optimized_products.append({
                **product,
                "optimal_stock": optimal_stock,
                "reorder_point": reorder_point,
                "action": action,
                "avg_daily_demand": avg_daily_demand,
                "lead_time": lead_time,
                "safety_stock": safety_stock
            })
        
        return optimized_products