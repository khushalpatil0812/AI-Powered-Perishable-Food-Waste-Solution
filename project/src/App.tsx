import React, { useState } from 'react';
import Layout from './components/Layout';
import ExecutiveSummary from './pages/ExecutiveSummary';
import DemandForecasting from './pages/DemandForecasting';
import InventoryOptimization from './pages/InventoryOptimization';
import WasteReduction from './pages/WasteReduction';
import ROICalculator from './pages/ROICalculator';
import ScenarioModeling from './pages/ScenarioModeling';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  const [activeTab, setActiveTab] = useState('executive');

  const renderContent = () => {
    switch (activeTab) {
      case 'executive':
        return <ExecutiveSummary />;
      case 'forecasting':
        return <DemandForecasting />;
      case 'inventory':
        return <InventoryOptimization />;
      case 'waste':
        return <WasteReduction />;
      case 'roi':
        return <ROICalculator />;
      case 'scenario':
        return <ScenarioModeling />;
      default:
        return <ExecutiveSummary />;
    }
  };

  return (
    <ErrorBoundary>
      <Layout activeTab={activeTab} onTabChange={setActiveTab}>
        {renderContent()}
      </Layout>
    </ErrorBoundary>
  );
}

export default App;