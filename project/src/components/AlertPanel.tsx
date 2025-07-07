import React from 'react';
import { AlertTriangle, Info, AlertCircle } from 'lucide-react';
import { alerts } from '../data/mockData';

export default function AlertPanel() {
  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'High':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'Medium':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case 'Info':
        return <Info className="h-5 w-5 text-blue-500" />;
      default:
        return <Info className="h-5 w-5 text-blue-500" />;
    }
  };

  const getAlertBorder = (type: string) => {
    switch (type) {
      case 'High':
        return 'border-l-red-500';
      case 'Medium':
        return 'border-l-yellow-500';
      case 'Info':
        return 'border-l-blue-500';
      default:
        return 'border-l-blue-500';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">System Alerts</h3>
      <div className="space-y-3">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`border-l-4 ${getAlertBorder(alert.type)} bg-gray-50 p-4 rounded-r-md`}
          >
            <div className="flex items-start">
              <div className="flex-shrink-0 mr-3">
                {getAlertIcon(alert.type)}
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-800">{alert.message}</p>
                {alert.store && (
                  <p className="text-xs text-gray-500 mt-1">{alert.store}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}