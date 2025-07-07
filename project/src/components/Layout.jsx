import React, { useState } from 'react';
import { ShoppingCart, TrendingUp, Package, Trash2, Calculator, GitBranch, Menu, X } from 'lucide-react';
import BackendStatus from './BackendStatus';

const tabs = [
  { id: 'executive', name: 'Executive Summary', icon: TrendingUp },
  { id: 'forecasting', name: 'Demand Forecasting', icon: TrendingUp },
  { id: 'inventory', name: 'Inventory Optimization', icon: Package },
  { id: 'waste', name: 'Waste Reduction', icon: Trash2 },
  { id: 'roi', name: 'ROI Calculator', icon: Calculator },
  { id: 'scenario', name: 'Scenario Modeling', icon: GitBranch },
];

export default function Layout({ children, activeTab, onTabChange }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#004c91] text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Title */}
            <div className="flex items-center space-x-4">
              <ShoppingCart className="h-8 w-8 text-[#ffc220]" />
              <div>
                <h1 className="text-xl font-bold">Walmart</h1>
                <p className="text-sm text-blue-200">AI-Powered Perishable Optimization</p>
              </div>
            </div>

            {/* Backend Status */}
            <div className="hidden md:block">
              <BackendStatus />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:block">
              <div className="flex space-x-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => onTabChange(tab.id)}
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center space-x-1 ${
                        activeTab === tab.id
                          ? 'bg-[#ffc220] text-[#004c91]'
                          : 'text-blue-200 hover:bg-blue-700 hover:text-white'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="hidden xl:inline">{tab.name}</span>
                    </button>
                  );
                })}
              </div>
            </nav>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-md text-blue-200 hover:text-white hover:bg-blue-700"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="lg:hidden py-4">
              <div className="space-y-1">
                <div className="mb-3">
                  <BackendStatus />
                </div>
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => {
                        onTabChange(tab.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center space-x-2 ${
                        activeTab === tab.id
                          ? 'bg-[#ffc220] text-[#004c91]'
                          : 'text-blue-200 hover:bg-blue-700 hover:text-white'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{tab.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}