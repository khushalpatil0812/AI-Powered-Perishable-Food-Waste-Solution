import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import { TrendingDown, Leaf, DollarSign, Calendar } from 'lucide-react';
import { wasteReductionData, categoryWasteData, stores } from '../data/mockData';

export default function WasteReduction() {
  const COLORS = ['#004c91', '#ffc220', '#28a745', '#dc3545', '#6f42c1'];

  const timelineData = [
    { week: 'Week 1', event: 'Implemented ML forecasting', impact: '5% reduction' },
    { week: 'Week 2', event: 'Optimized inventory levels', impact: '15% reduction' },
    { week: 'Week 3', event: 'Dynamic pricing activated', impact: '25% reduction' },
    { week: 'Week 4', event: 'Full system integration', impact: '35% reduction' },
  ];

  const storeWasteReduction = stores.map(store => ({
    name: store.name.split(' - ')[0],
    reduction: store.wasteReduction,
    before: 30000,
    after: 30000 * (1 - store.wasteReduction / 100)
  }));

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-2">Waste Reduction Analytics</h1>
        <p className="text-green-100">Environmental impact and cost savings through AI optimization</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">Total Waste Reduction</h3>
              <p className="text-2xl font-bold text-green-600">35%</p>
              <p className="text-sm text-green-500 mt-1">↗ +5% from last month</p>
            </div>
            <TrendingDown className="h-8 w-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">Current Monthly Waste</h3>
              <p className="text-2xl font-bold text-blue-600">$89K</p>
              <p className="text-sm text-blue-500 mt-1">↘ Down from $137K</p>
            </div>
            <DollarSign className="h-8 w-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">Projected Monthly Waste</h3>
              <p className="text-2xl font-bold text-purple-600">$58K</p>
              <p className="text-sm text-purple-500 mt-1">↘ 35% reduction target</p>
            </div>
            <Calendar className="h-8 w-8 text-purple-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">Environmental Impact</h3>
              <p className="text-2xl font-bold text-green-600">1,200</p>
              <p className="text-sm text-green-500 mt-1">tons CO₂ saved</p>
            </div>
            <Leaf className="h-8 w-8 text-green-500" />
          </div>
        </div>
      </div>

      {/* Waste Trends Chart */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Waste Reduction Progress</h3>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={wasteReductionData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip formatter={(value, name) => [
              name === 'reduction' ? `${value}%` : `$${value.toLocaleString()}`,
              name === 'before' ? 'Before Optimization' : name === 'after' ? 'After Optimization' : 'Reduction %'
            ]} />
            <Line type="monotone" dataKey="before" stroke="#dc3545" strokeWidth={2} name="before" strokeDasharray="5 5" />
            <Line type="monotone" dataKey="after" stroke="#28a745" strokeWidth={3} name="after" />
            <Line type="monotone" dataKey="reduction" stroke="#ffc220" strokeWidth={3} name="reduction" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Category Breakdown and Store Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Breakdown */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Waste by Category</h3>
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryWasteData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {categoryWasteData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value, name) => [`${value}%`, name]} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-2">
            {categoryWasteData.map((item, index) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  ></div>
                  <span className="text-sm text-gray-600">{item.name}</span>
                </div>
                <span className="text-sm font-medium text-gray-900">${item.amount.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Store Comparison */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Waste Reduction by Store</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={storeWasteReduction} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis type="category" dataKey="name" />
              <Tooltip formatter={(value, name) => [
                name === 'reduction' ? `${value}%` : `$${value.toLocaleString()}`,
                name === 'reduction' ? 'Waste Reduction' : name === 'before' ? 'Before' : 'After'
              ]} />
              <Bar dataKey="reduction" fill="#28a745" name="reduction" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Action Timeline */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Implementation Timeline</h3>
        <div className="space-y-4">
          {timelineData.map((item, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-[#004c91] rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">{index + 1}</span>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">{item.week}</h4>
                    <p className="text-sm text-gray-600">{item.event}</p>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {item.impact}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}