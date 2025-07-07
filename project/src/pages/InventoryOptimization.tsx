import React, { useState } from 'react';
import { Package, AlertTriangle, CheckCircle, TrendingUp } from 'lucide-react';
import { products, inventoryHeatmapData } from '../data/mockData';

export default function InventoryOptimization() {
  const [selectedStore, setSelectedStore] = useState('store-a');

  const stores = [
    { id: 'store-a', name: 'Store A - Urban' },
    { id: 'store-b', name: 'Store B - Suburban' },
    { id: 'store-c', name: 'Store C - Rural' },
  ];

  const getActionColor = (action: string) => {
    switch (action) {
      case 'Reduce':
        return 'bg-red-100 text-red-800';
      case 'Increase':
        return 'bg-green-100 text-green-800';
      case 'Maintain':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'optimal':
        return 'bg-green-400';
      case 'overstocked':
        return 'bg-red-400';
      case 'understocked':
        return 'bg-yellow-400';
      default:
        return 'bg-gray-400';
    }
  };

  return (
    <div className="space-y-8">
      {/* Store Navigation */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
          <h1 className="text-2xl font-bold text-gray-900">Inventory Optimization</h1>
          <div className="flex space-x-2">
            {stores.map((store) => (
              <button
                key={store.id}
                onClick={() => setSelectedStore(store.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedStore === store.id
                    ? 'bg-[#004c91] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {store.name}
              </button>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-blue-600">Total SKUs</h3>
            <p className="text-2xl font-bold text-blue-900">1,247</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-green-600">Optimized Items</h3>
            <p className="text-2xl font-bold text-green-900">892</p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-yellow-600">Savings Potential</h3>
            <p className="text-2xl font-bold text-yellow-900">$250K</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-purple-600">Turnover Rate</h3>
            <p className="text-2xl font-bold text-purple-900">12.5x</p>
          </div>
        </div>
      </div>

      {/* Optimization Recommendations */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Optimization Recommendations</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Stock</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Optimal Stock</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reorder Point</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Savings</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Package className="h-5 w-5 text-gray-400 mr-3" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">{product.name}</div>
                        <div className="text-sm text-gray-500">{product.category}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.currentStock}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">{product.optimalStock}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.reorderPoint}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getActionColor(product.action)}`}>
                      {product.action}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">${product.savings}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inventory Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Inventory Metrics</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Current Inventory Value</span>
              <span className="text-xl font-bold text-gray-900">$1.2M</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Optimal Inventory Value</span>
              <span className="text-xl font-bold text-green-600">$950K</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Potential Savings</span>
              <span className="text-xl font-bold text-blue-600">$250K</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Turnover Rate</span>
              <span className="text-xl font-bold text-purple-600">12.5x</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Action Items</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center">
                <AlertTriangle className="h-5 w-5 text-red-500 mr-3" />
                <span className="text-red-700">Urgent: 12 items expiring in 24 hours</span>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center">
                <TrendingUp className="h-5 w-5 text-yellow-500 mr-3" />
                <span className="text-yellow-700">Moderate: 34 items need reordering</span>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                <span className="text-green-700">Optimal: 156 items properly stocked</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stock Level Heatmap */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Stock Level Heatmap</h3>
        <div className="grid grid-cols-3 gap-4">
          {['Store A', 'Store B', 'Store C'].map((store) => (
            <div key={store} className="space-y-2">
              <h4 className="font-medium text-center text-gray-900">{store}</h4>
              {['Dairy', 'Produce', 'Bakery'].map((category) => {
                const data = inventoryHeatmapData.find(item => 
                  item.store === store && item.category === category
                );
                return (
                  <div key={category} className="flex items-center justify-between p-2 border rounded">
                    <span className="text-sm text-gray-600">{category}</span>
                    <div className="flex items-center space-x-2">
                      <div className={`w-4 h-4 rounded ${getStatusColor(data?.status || 'optimal')}`}></div>
                      <span className="text-sm font-medium">{data?.level || 85}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        <div className="flex justify-center space-x-6 mt-6">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded bg-red-400"></div>
            <span className="text-sm text-gray-600">Overstocked</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded bg-green-400"></div>
            <span className="text-sm text-gray-600">Optimal</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded bg-yellow-400"></div>
            <span className="text-sm text-gray-600">Understocked</span>
          </div>
        </div>
      </div>
    </div>
  );
}