import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { TrendingUp, Target, Activity, Calendar, Filter } from 'lucide-react';
import { demandForecastData } from '../data/mockData';

export default function DemandForecasting() {
  const [selectedStore, setSelectedStore] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('7days');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const topProducts = [
    { name: 'Milk 2%', accuracy: 92, trend: 'up', prediction: '+15%' },
    { name: 'Bananas', accuracy: 88, trend: 'up', prediction: '+8%' },
    { name: 'Bread', accuracy: 85, trend: 'down', prediction: '-5%' },
    { name: 'Chicken', accuracy: 90, trend: 'up', prediction: '+12%' },
    { name: 'Apples', accuracy: 87, trend: 'up', prediction: '+6%' },
  ];

  return (
    <div className="space-y-8">
      {/* Header and Controls */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Demand Forecasting</h1>
            <p className="text-gray-600">ML-powered predictions with 88.5% accuracy</p>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <select 
              value={selectedStore}
              onChange={(e) => setSelectedStore(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Stores</option>
              <option value="store-a">Store A - Urban</option>
              <option value="store-b">Store B - Suburban</option>
              <option value="store-c">Store C - Rural</option>
            </select>
            
            <select 
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="7days">Last 7 days</option>
              <option value="30days">Last 30 days</option>
              <option value="90days">Last 90 days</option>
            </select>
            
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              <option value="dairy">Dairy</option>
              <option value="produce">Produce</option>
              <option value="bakery">Bakery</option>
              <option value="meat">Meat</option>
              <option value="deli">Deli</option>
            </select>
          </div>
        </div>
      </div>

      {/* Accuracy Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">Prediction Accuracy</h3>
              <p className="text-2xl font-bold text-green-600">88.5%</p>
            </div>
            <Target className="h-8 w-8 text-green-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">Mean Absolute Error</h3>
              <p className="text-2xl font-bold text-blue-600">12.3%</p>
            </div>
            <Activity className="h-8 w-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">R-squared</h3>
              <p className="text-2xl font-bold text-purple-600">0.847</p>
            </div>
            <TrendingUp className="h-8 w-8 text-purple-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">Last Updated</h3>
              <p className="text-2xl font-bold text-gray-900">2 min</p>
            </div>
            <Calendar className="h-8 w-8 text-gray-500" />
          </div>
        </div>
      </div>

      {/* Main Forecasting Chart */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Demand Forecast vs Actual</h3>
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={demandForecastData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip formatter={(value, name) => [
              `${value} units`,
              name === 'actual' ? 'Actual Demand' : name === 'predicted' ? 'Predicted Demand' : 'Confidence Interval'
            ]} />
            <Area
              type="monotone"
              dataKey="confidence"
              stroke="none"
              fill="#e3f2fd"
              fillOpacity={0.6}
            />
            <Line
              type="monotone"
              dataKey="actual"
              stroke="#004c91"
              strokeWidth={3}
              dot={{ fill: '#004c91', strokeWidth: 2, r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="predicted"
              stroke="#ffc220"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ fill: '#ffc220', strokeWidth: 2, r: 4 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Product Performance Grid */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Top Product Forecasts</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {topProducts.map((product, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="w-full h-20 bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
                <span className="text-gray-400">📦</span>
              </div>
              <h4 className="font-medium text-gray-900">{product.name}</h4>
              <p className="text-sm text-gray-600 mt-1">Accuracy: {product.accuracy}%</p>
              <div className="flex items-center justify-between mt-2">
                <span className={`text-sm font-medium ${product.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {product.prediction}
                </span>
                <TrendingUp className={`h-4 w-4 ${product.trend === 'up' ? 'text-green-500' : 'text-red-500 rotate-180'}`} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Weather Impact Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Weather Impact Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-4xl mb-2">☀️</div>
            <h4 className="font-medium text-gray-900">Today</h4>
            <p className="text-2xl font-bold text-gray-900">72°F</p>
            <p className="text-sm text-green-600">+5% demand impact</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-2">🌧️</div>
            <h4 className="font-medium text-gray-900">Tomorrow</h4>
            <p className="text-2xl font-bold text-gray-900">65°F</p>
            <p className="text-sm text-blue-600">+12% demand impact</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-2">⛈️</div>
            <h4 className="font-medium text-gray-900">Weekend</h4>
            <p className="text-2xl font-bold text-gray-900">58°F</p>
            <p className="text-sm text-yellow-600">+20% demand impact</p>
          </div>
        </div>
      </div>
    </div>
  );
}