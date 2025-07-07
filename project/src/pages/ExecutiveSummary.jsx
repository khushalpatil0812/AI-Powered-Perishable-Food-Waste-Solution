import React, { useState, useEffect, useCallback } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar
} from 'recharts';
import {
  TrendingUp, DollarSign, Target, Store,
  RefreshCw, Download, AlertTriangle
} from 'lucide-react';

import KPICard from '../components/KPICard';
import AlertPanel from '../components/AlertPanel';
import ExpiringItemsPanel from '../components/ExpiringItemsPanel';
import DataRefreshButton from '../components/DataRefreshButton';
import LoadingSpinner from '../components/LoadingSpinner';

import { ApiService } from '../services/apiService';
import { useApi } from '../hooks/useApi';

export default function ExecutiveSummary() {
  const [backendConnected, setBackendConnected] = useState(false);

  // ✅ Memoize API calls to avoid infinite re-renders
  const getDashboardSummary = useCallback(ApiService.getDashboardSummary, []);
  const getWasteTrends = useCallback(ApiService.getWasteTrends, []);
  const getStoreComparison = useCallback(ApiService.getStoreComparison, []);

  const {
    data: dashboardData,
    loading,
    error,
    refresh
  } = useApi(getDashboardSummary, { immediate: true });

  const {
    data: wasteTrends,
    loading: wasteTrendsLoading
  } = useApi(getWasteTrends, { immediate: true });

  const {
    data: storeComparison,
    loading: storeComparisonLoading
  } = useApi(getStoreComparison, { immediate: true });

  // ✅ Check backend health
  useEffect(() => {
    const checkBackend = async () => {
      try {
        const res = await fetch('http://localhost:8000/health');
        if (res.ok) setBackendConnected(true);
        else setBackendConnected(false);
      } catch {
        setBackendConnected(false);
      }
    };
    checkBackend();
  }, []);

  const handleRefreshAll = async () => {
    try {
      await refresh();
    } catch (error) {
      console.error('Failed to refresh data:', error);
    }
  };

  const handleExportReport = () => {
    const reportData = {
      generated_at: new Date().toISOString(),
      summary: dashboardData,
      waste_trends: wasteTrends,
      store_comparison: storeComparison
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `walmart-ai-report-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const stores = dashboardData?.stores || [];
  const kpis = dashboardData?.kpis || {};

  if (loading && !dashboardData) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error && !dashboardData) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-4">
          <AlertTriangle className="h-6 w-6 text-red-500" />
          <h3 className="text-red-800 font-medium">Backend Connection Error</h3>
        </div>
        <p className="text-red-600 mb-4">{error.toString()}</p>
        <div className="bg-yellow-50 border border-yellow-200 rounded p-3 mb-4">
          <p className="text-yellow-800 text-sm">
            <strong>Make sure your backend is running:</strong>
          </p>
          <ol className="text-yellow-700 text-sm mt-2 list-decimal list-inside space-y-1">
            <li>Navigate to your project directory</li>
            <li>Run: <code className="bg-yellow-100 px-1 rounded">python run.py</code></li>
            <li>Ensure: <code className="bg-yellow-100 px-1 rounded">http://localhost:8000</code> is reachable</li>
          </ol>
        </div>
        <button
          onClick={handleRefreshAll}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
        >
          <RefreshCw className="h-4 w-4" />
          <span>Try Again</span>
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {!backendConnected && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="h-5 w-5 text-yellow-500" />
            <div>
              <p className="text-yellow-800 font-medium">Backend Disconnected</p>
              <p className="text-yellow-700 text-sm">Using fallback data. Start backend for real-time updates.</p>
            </div>
          </div>
        </div>
      )}

      {/* Header Section */}
      <div className="bg-gradient-to-r from-[#004c91] to-blue-700 text-white rounded-lg p-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold mb-2">Walmart AI-Powered Perishable Optimization</h1>
            <p className="text-blue-200">Real-time insights across {stores.length} active stores</p>
            <p className="text-sm text-blue-300 mt-1">
              Last updated: {dashboardData?.last_updated ? new Date(dashboardData.last_updated).toLocaleString() : 'Never'}
            </p>
          </div>
          <div className="flex space-x-2">
            <DataRefreshButton onRefresh={handleRefreshAll} lastUpdated={dashboardData?.last_updated} />
            <button
              onClick={handleExportReport}
              className="bg-white bg-opacity-20 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 hover:bg-opacity-30 transition-colors"
            >
              <Download className="h-4 w-4" />
              <span>Export Report</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard title="Waste Reduction" value={kpis.waste_reduction?.value || "35%"} change={kpis.waste_reduction?.change || "+5%"} trend="up" icon={TrendingUp} color="green" />
        <KPICard title="Cost Savings" value={kpis.cost_savings?.value || "$900K"} change={kpis.cost_savings?.change || "+12%"} trend="up" icon={DollarSign} color="blue" />
        <KPICard title="ROI" value={kpis.roi?.value || "340%"} change={kpis.roi?.change || "+8%"} trend="up" icon={Target} color="purple" />
        <KPICard title="Active Stores" value={kpis.active_stores?.value || "3/3"} change={kpis.active_stores?.change || "100%"} trend="up" icon={Store} color="yellow" />
      </div>

      {/* Expiring Items */}
      <ExpiringItemsPanel />

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Waste Reduction Trend (Last 30 Days)</h3>
          <div style={{ minHeight: '300px' }}>
            {wasteTrendsLoading ? <LoadingSpinner /> : (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={wasteTrends?.data || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="before" stroke="#dc3545" strokeWidth={2} name="Before Optimization" />
                  <Line type="monotone" dataKey="after" stroke="#28a745" strokeWidth={2} name="After Optimization" />
                  <Line type="monotone" dataKey="reduction" stroke="#ffc220" strokeWidth={3} name="Reduction %" />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Cost Savings by Store</h3>
          <div style={{ minHeight: '300px' }}>
            {storeComparisonLoading ? <LoadingSpinner /> : (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={storeComparison?.data || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="savings" fill="#004c91" name="Cost Savings" />
                  <Bar dataKey="waste" fill="#ffc220" name="Waste Reduction" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>

      {/* Store Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Store Performance Overview</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Store Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Waste Reduction</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cost Savings</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {stores.map((store) => (
                <tr key={store.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{store.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{store.location}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{store.wasteReduction || store.waste_reduction}%</td>
                  <td className="px-6 py-4 whitespace-nowrap">${(store.costSavings || store.cost_savings).toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{store.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Alerts */}
      <AlertPanel />
    </div>
  );
}
