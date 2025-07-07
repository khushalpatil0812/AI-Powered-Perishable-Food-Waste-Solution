import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Sliders, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';

export default function ScenarioModeling() {
  const [selectedScenario, setSelectedScenario] = useState('holiday');
  const [demandChange, setDemandChange] = useState(0);
  const [weatherImpact, setWeatherImpact] = useState('normal');
  const [competition, setCompetition] = useState('medium');
  const [economicConditions, setEconomicConditions] = useState('normal');

  const prebuiltScenarios = [
    { id: 'holiday', name: 'Holiday Season Impact', demandChange: 25, weather: 'normal', competition: 'high', economic: 'growth' },
    { id: 'supply', name: 'Supply Chain Disruption', demandChange: -15, weather: 'severe', competition: 'medium', economic: 'recession' },
    { id: 'downturn', name: 'Economic Downturn', demandChange: -20, weather: 'normal', competition: 'high', economic: 'recession' },
    { id: 'expansion', name: 'Store Expansion', demandChange: 40, weather: 'normal', competition: 'low', economic: 'growth' },
  ];

  const baselineMetrics = {
    wasteReduction: 35,
    costSavings: 900000,
    roi: 340,
    riskLevel: 'Low'
  };

  const calculateScenarioImpact = () => {
    let impactMultiplier = 1;
    
    // Demand change impact
    impactMultiplier += demandChange / 100 * 0.5;
    
    // Weather impact
    const weatherMultipliers = { normal: 1, severe: 0.85, extreme: 0.7 };
    impactMultiplier *= weatherMultipliers[weatherImpact as keyof typeof weatherMultipliers];
    
    // Competition impact
    const competitionMultipliers = { low: 1.1, medium: 1, high: 0.9 };
    impactMultiplier *= competitionMultipliers[competition as keyof typeof competitionMultipliers];
    
    // Economic conditions impact
    const economicMultipliers = { recession: 0.8, normal: 1, growth: 1.2 };
    impactMultiplier *= economicMultipliers[economicConditions as keyof typeof economicMultipliers];

    return {
      wasteReduction: Math.max(0, Math.min(50, baselineMetrics.wasteReduction * impactMultiplier)),
      costSavings: Math.max(0, baselineMetrics.costSavings * impactMultiplier),
      roi: Math.max(0, baselineMetrics.roi * impactMultiplier),
      riskLevel: impactMultiplier < 0.8 ? 'High' : impactMultiplier < 1.1 ? 'Medium' : 'Low'
    };
  };

  const scenarioMetrics = calculateScenarioImpact();

  const comparisonData = [
    {
      metric: 'Waste Reduction',
      baseline: baselineMetrics.wasteReduction,
      scenario: scenarioMetrics.wasteReduction,
      unit: '%'
    },
    {
      metric: 'Cost Savings',
      baseline: baselineMetrics.costSavings / 1000,
      scenario: scenarioMetrics.costSavings / 1000,
      unit: 'K'
    },
    {
      metric: 'ROI',
      baseline: baselineMetrics.roi,
      scenario: scenarioMetrics.roi,
      unit: '%'
    }
  ];

  const handleScenarioSelect = (scenarioId: string) => {
    const scenario = prebuiltScenarios.find(s => s.id === scenarioId);
    if (scenario) {
      setSelectedScenario(scenarioId);
      setDemandChange(scenario.demandChange);
      setWeatherImpact(scenario.weather);
      setCompetition(scenario.competition);
      setEconomicConditions(scenario.economic);
    }
  };

  const whatIfQuestions = [
    { question: 'What if we expand to 10 stores?', impact: '+150% cost savings', risk: 'Medium' },
    { question: 'What if demand drops 20%?', impact: '-25% waste reduction', risk: 'High' },
    { question: 'What if implementation costs increase?', impact: '-40% ROI', risk: 'Medium' },
    { question: 'What if we achieve 50% waste reduction?', impact: '+45% cost savings', risk: 'Low' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-2">Scenario Modeling</h1>
        <p className="text-purple-200">Test different scenarios and their impact on your optimization results</p>
      </div>

      {/* Scenario Builder */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Scenario Builder</h3>
        
        {/* Pre-built Scenarios */}
        <div className="mb-6">
          <h4 className="text-md font-medium text-gray-700 mb-3">Pre-built Scenarios</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {prebuiltScenarios.map((scenario) => (
              <button
                key={scenario.id}
                onClick={() => handleScenarioSelect(scenario.id)}
                className={`p-3 rounded-lg border text-left transition-colors ${
                  selectedScenario === scenario.id
                    ? 'border-[#004c91] bg-blue-50 text-[#004c91]'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <h5 className="font-medium text-sm">{scenario.name}</h5>
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Demand Change: {demandChange > 0 ? '+' : ''}{demandChange}%
            </label>
            <input
              type="range"
              min="-50"
              max="50"
              value={demandChange}
              onChange={(e) => setDemandChange(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>-50%</span>
              <span>0%</span>
              <span>+50%</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Weather Impact</label>
            <select
              value={weatherImpact}
              onChange={(e) => setWeatherImpact(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="normal">Normal</option>
              <option value="severe">Severe</option>
              <option value="extreme">Extreme</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Competition Level</label>
            <select
              value={competition}
              onChange={(e) => setCompetition(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Economic Conditions</label>
            <select
              value={economicConditions}
              onChange={(e) => setEconomicConditions(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="recession">Recession</option>
              <option value="normal">Normal</option>
              <option value="growth">Growth</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">Waste Reduction</h3>
            <Sliders className="h-5 w-5 text-gray-400" />
          </div>
          <p className="text-2xl font-bold text-green-600">{scenarioMetrics.wasteReduction.toFixed(1)}%</p>
          <p className="text-sm text-gray-500">
            {((scenarioMetrics.wasteReduction / baselineMetrics.wasteReduction - 1) * 100).toFixed(1)}% vs baseline
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">Cost Savings</h3>
            <TrendingUp className="h-5 w-5 text-gray-400" />
          </div>
          <p className="text-2xl font-bold text-blue-600">${(scenarioMetrics.costSavings / 1000).toFixed(0)}K</p>
          <p className="text-sm text-gray-500">
            {((scenarioMetrics.costSavings / baselineMetrics.costSavings - 1) * 100).toFixed(1)}% vs baseline
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">ROI Adjustment</h3>
            <CheckCircle className="h-5 w-5 text-gray-400" />
          </div>
          <p className="text-2xl font-bold text-purple-600">{scenarioMetrics.roi.toFixed(0)}%</p>
          <p className="text-sm text-gray-500">
            {((scenarioMetrics.roi / baselineMetrics.roi - 1) * 100).toFixed(1)}% vs baseline
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">Risk Assessment</h3>
            <AlertTriangle className={`h-5 w-5 ${
              scenarioMetrics.riskLevel === 'High' ? 'text-red-500' : 
              scenarioMetrics.riskLevel === 'Medium' ? 'text-yellow-500' : 'text-green-500'
            }`} />
          </div>
          <p className={`text-2xl font-bold ${
            scenarioMetrics.riskLevel === 'High' ? 'text-red-600' : 
            scenarioMetrics.riskLevel === 'Medium' ? 'text-yellow-600' : 'text-green-600'
          }`}>
            {scenarioMetrics.riskLevel}
          </p>
          <p className="text-sm text-gray-500">Risk level vs baseline</p>
        </div>
      </div>

      {/* Comparison Chart */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Current State vs Selected Scenario</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={comparisonData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="metric" />
            <YAxis />
            <Tooltip formatter={(value, name) => [
              `${value}${comparisonData.find(d => d.metric === name)?.unit || ''}`,
              name === 'baseline' ? 'Current State' : 'Scenario'
            ]} />
            <Bar dataKey="baseline" fill="#004c91" name="baseline" />
            <Bar dataKey="scenario" fill="#ffc220" name="scenario" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* What-if Analysis */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">What-if Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {whatIfQuestions.map((item, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <h4 className="font-medium text-gray-900 mb-2">{item.question}</h4>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{item.impact}</span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  item.risk === 'High' ? 'bg-red-100 text-red-800' :
                  item.risk === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {item.risk} Risk
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}