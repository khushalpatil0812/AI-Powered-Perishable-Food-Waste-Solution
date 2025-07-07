import React, { useState, useEffect } from 'react';
import { AlertTriangle, Clock, Package, MapPin, Calendar } from 'lucide-react';

export default function ExpiringItemsPanel() {
  const [expiringItems, setExpiringItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock data for expiring items - in production this would come from your backend
  const mockExpiringItems = [
    {
      id: 1,
      productName: "Milk 2%",
      category: "Dairy",
      store: "Store C - Rural",
      currentStock: 45,
      expiryDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
      daysUntilExpiry: 2,
      estimatedLoss: 450,
      urgency: "critical",
      batchNumber: "MLK-2024-001",
      supplier: "Local Dairy Co."
    },
    {
      id: 2,
      productName: "Bananas",
      category: "Produce", 
      store: "Store A - Urban",
      currentStock: 28,
      expiryDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // 1 day from now
      daysUntilExpiry: 1,
      estimatedLoss: 280,
      urgency: "critical",
      batchNumber: "BAN-2024-015",
      supplier: "Fresh Farms Inc."
    },
    {
      id: 3,
      productName: "Bread - Whole Wheat",
      category: "Bakery",
      store: "Store B - Suburban",
      currentStock: 15,
      expiryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
      daysUntilExpiry: 3,
      estimatedLoss: 180,
      urgency: "high",
      batchNumber: "BRD-2024-089",
      supplier: "Artisan Bakery"
    },
    {
      id: 4,
      productName: "Chicken Breast",
      category: "Meat",
      store: "Store A - Urban", 
      currentStock: 12,
      expiryDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000), // 4 days from now
      daysUntilExpiry: 4,
      estimatedLoss: 360,
      urgency: "medium",
      batchNumber: "CHK-2024-203",
      supplier: "Premium Meats Ltd."
    },
    {
      id: 5,
      productName: "Greek Yogurt",
      category: "Dairy",
      store: "Store C - Rural",
      currentStock: 8,
      expiryDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
      daysUntilExpiry: 5,
      estimatedLoss: 120,
      urgency: "medium",
      batchNumber: "YOG-2024-156",
      supplier: "Organic Valley"
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setExpiringItems(mockExpiringItems);
      setLoading(false);
    }, 1000);
  }, []);

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'critical':
        return 'bg-red-50 border-red-200 text-red-800';
      case 'high':
        return 'bg-orange-50 border-orange-200 text-orange-800';
      case 'medium':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const getUrgencyIcon = (urgency) => {
    switch (urgency) {
      case 'critical':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'high':
        return <Clock className="h-5 w-5 text-orange-500" />;
      case 'medium':
        return <Calendar className="h-5 w-5 text-yellow-500" />;
      default:
        return <Package className="h-5 w-5 text-gray-500" />;
    }
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const totalEstimatedLoss = expiringItems.reduce((sum, item) => sum + item.estimatedLoss, 0);
  const criticalItems = expiringItems.filter(item => item.urgency === 'critical').length;

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-16 bg-gray-100 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Expiring Items Alert</h3>
          <p className="text-sm text-gray-600">
            {criticalItems} critical items • ${totalEstimatedLoss.toLocaleString()} potential loss
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <AlertTriangle className="h-6 w-6 text-red-500" />
          <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
            {expiringItems.length} Items
          </span>
        </div>
      </div>

      <div className="space-y-4 max-h-96 overflow-y-auto">
        {expiringItems.map((item) => (
          <div
            key={item.id}
            className={`border rounded-lg p-4 ${getUrgencyColor(item.urgency)}`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                {getUrgencyIcon(item.urgency)}
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-medium text-gray-900">{item.productName}</h4>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      {item.category}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-2">
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-3 w-3" />
                      <span>{item.store}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Package className="h-3 w-3" />
                      <span>{item.currentStock} units</span>
                    </div>
                  </div>

                  <div className="text-xs text-gray-500 space-y-1">
                    <div>Batch: {item.batchNumber}</div>
                    <div>Supplier: {item.supplier}</div>
                    <div>Expires: {formatDate(item.expiryDate)}</div>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="text-lg font-bold text-gray-900">
                  {item.daysUntilExpiry} day{item.daysUntilExpiry !== 1 ? 's' : ''}
                </div>
                <div className="text-sm text-red-600 font-medium">
                  ${item.estimatedLoss} loss
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-3 flex space-x-2">
              <button className="bg-blue-600 text-white text-xs px-3 py-1 rounded hover:bg-blue-700 transition-colors">
                Mark Down Price
              </button>
              <button className="bg-green-600 text-white text-xs px-3 py-1 rounded hover:bg-green-700 transition-colors">
                Donate
              </button>
              <button className="bg-gray-600 text-white text-xs px-3 py-1 rounded hover:bg-gray-700 transition-colors">
                Transfer Store
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Actions */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-600">
            Total potential loss: <span className="font-semibold text-red-600">${totalEstimatedLoss.toLocaleString()}</span>
          </div>
          <button className="bg-[#004c91] text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
            Generate Action Plan
          </button>
        </div>
      </div>
    </div>
  );
}