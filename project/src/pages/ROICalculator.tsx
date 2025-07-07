import React, { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Calculator, DollarSign, TrendingUp, Clock } from 'lucide-react';
import { roiScenarios } from '../data/mockData';

export default function ROICalculator() {
  const [numStores, setNumStores] = useState(3);
  const [implementationCost, setImplementationCost] = useState(50000);
  const [currentWaste, setCurrentWaste] = useState(30000);
  const [expectedReduction, setExpectedReduction] = useState(35);
  const [timeHorizon, setTimeHorizon] = useState('2years');

  const calculations = useMemo(() => {
    const totalImplementationCost = numStores * implementationCost;
    const monthlyWastePerStore = currentWaste;
    const totalMonthlyWaste = numStores * monthlyWastePerStore;
    const monthlySavings = totalMonthlyWaste * (expectedReduction / 100);
    const annualSavings = monthlySavings * 12;
    const breakEvenMonths = totalImplementationCost / monthlySavings;
    
    const timeMultiplier = timeHorizon === '6months' ? 0.5 : timeHorizon === '1year' ? 1 : 2;
    const totalSavings = annualSavings * timeMultiplier;
    const roi = ((totalSavings - totalImplementationCost) / totalImplementationCost) * 100;

    return {
      totalImplementationCost,
      monthlySavings,
      annualSavings,
      breakEvenMonths,
      roi,
      totalSavings
    };
  }, [numStores, implementationCost, currentWaste, expectedReduction, timeHorizon]);

  const roiData = useMemo(() => {
    const data = [];
    const months = timeHorizon === '6months' ? 6 : timeHorizon === '1year' ? 12 : 24;
    
    for (let i = 0; i <= months; i++) {
      const cumulativeSavings = calculations.monthlySavings * i;
      const netROI = cumulativeSavings - calculations.totalImplementationCost;
      data.push({
        month: i,
        investment: i === 0 ? calculations.totalImplementationCost : calculations.totalImplementationCost,
        savings: cumulativeSavings,
        netROI: netROI
      });
    }
    return data;
  }, [calculations, timeHorizon]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#004c91] to-blue-700 text-white rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-2">ROI Calculator</h1>
        <p className="text-blue-200">Calculate your return on investment for AI-powered optimization</p>
      </div>

      {/* Input Controls */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Configuration Parameters</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Number of Stores</label>
            <input
              type="range"
              min="1"
              max="100"
              value={numStores}
              onChange={(e) => setNumStores(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>1</span>
              <span className="font-medium text-[#004c91]">{numStores}</span>
              <span>100</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Implementation Cost per Store</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
              <input
                type="number"
                value={implementationCost}
                onChange={(e) => setImplementationCost(parseInt(e.target.value))}
                className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Current Monthly Waste per Store</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
              <input
                type="number"
                value={currentWaste}
                onChange={(e) => setCurrentWaste(parseInt(e.target.value))}
                className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Expected Reduction (%)</label>
            <input
              type="range"
              min="20"
              max="50"
              value={expectedReduction}
              onChange={(e) => setExpectedReduction(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>20%</span>
              <span className="font-medium text-[#004c91]">{expectedReduction}%</span>
              <span>50%</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Time Horizon</label>
            <select
              value={timeHorizon}
              onChange={(e) => setTimeHorizon(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="6months">6 months</option>
              <option value="1year">1 year</option>
              <option value="2years">2 years</option>
            </select>
          </div>
        </div>
      </div>

      {/* Real-time Calculations */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">Total Implementation Cost</h3>
              <p className="text-xl font-bold text-red-600">${calculations.totalImplementationCost.toLocaleString()}</p>
            </div>
            <DollarSign className="h-6 w-6 text-red-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">Monthly Savings</h3>
              <p className="text-xl font-bold text-green-600">${calculations.monthlySavings.toLocaleString()}</p>
            </div>
            <TrendingUp className="h-6 w-6 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">Annual Savings</h3>
              <p className="text-xl font-bold text-blue-600">${calculations.annualSavings.toLocaleString()}</p>
            </div>
            <Calculator className="h-6 w-6 text-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">Break-even Point</h3>
              <p className="text-xl font-bold text-purple-600">{calculations.breakEvenMonths.toFixed(1)} mo</p>
            </div>
            <Clock className="h-6 w-6 text-purple-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">{timeHorizon.replace('years', '-Year').replace('year', '-Year').replace('months', '-Month')} ROI</h3>
              <p className="text-xl font-bold text-[#ffc220]">{calculations.roi.toFixed(0)}%</p>
            </div>
            <TrendingUp className="h-6 w-6 text-[#ffc220]" />
          </div>
        </div>
      </div>

      {/* ROI Visualization */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">ROI Timeline</h3>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={roiData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" label={{ value: 'Months', position: 'insideBottom', offset: -10 }} />
            <YAxis label={{ value: 'Amount ($)', angle: -90, position: 'insideLeft' }} />
            <Tooltip formatter={(value, name) => [
              `$${value.toLocaleString()}`,
              name === 'investment' ? 'Investment' : name === 'savings' ? 'Cumulative Savings' : 'Net ROI'
            ]} />
            <Line type="monotone" dataKey="investment" stroke="#dc3545" strokeWidth={2} strokeDasharray="5 5" name="investment" />
            <Line type="monotone" dataKey="savings" stroke="#28a745" strokeWidth={3} name="savings" />
            <Line type="monotone" dataKey="netROI" stroke="#004c91" strokeWidth={3} name="netROI" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Scenario Comparison */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Scenario Comparison</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {roiScenarios.map((scenario, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <h4 className="font-medium text-gray-900 mb-3">{scenario.name}</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">ROI:</span>
                  <span className="text-sm font-medium text-green-600">{scenario.roi}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Break-even:</span>
                  <span className="text-sm font-medium">{scenario.breakEven} months</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Annual Savings:</span>
                  <span className="text-sm font-medium">${scenario.savings.toLocaleString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sensitivity Analysis */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Sensitivity Analysis</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reduction Rate</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Monthly Savings</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Break-even</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">2-Year ROI</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk Level</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[20, 25, 30, 35, 40, 45].map((rate) => {
                const savings = numStores * currentWaste * (rate / 100);
                const breakEven = (numStores * implementationCost) / savings;
                const roi = ((savings * 24 - numStores * implementationCost) / (numStores * implementationCost)) * 100;
                const risk = rate < 25 ? 'High' : rate < 35 ? 'Medium' : 'Low';
                const riskColor = risk === 'High' ? 'text-red-600' : risk === 'Medium' ? 'text-yellow-600' : 'text-green-600';
                
                return (
                  <tr key={rate} className={expectedReduction === rate ? 'bg-blue-50' : 'hover:bg-gray-50'}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{rate}%</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${savings.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{breakEven.toFixed(1)} months</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">{roi.toFixed(0)}%</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <span className={riskColor}>{risk}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}