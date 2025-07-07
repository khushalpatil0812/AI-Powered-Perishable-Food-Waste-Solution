import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

interface DataRefreshButtonProps {
  onRefresh: () => Promise<void>;
  lastUpdated?: string;
}

export default function DataRefreshButton({ onRefresh, lastUpdated }: DataRefreshButtonProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await onRefresh();
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <div className="flex items-center space-x-3">
      <button
        onClick={handleRefresh}
        disabled={isRefreshing}
        className="bg-[#ffc220] text-[#004c91] px-4 py-2 rounded-lg font-medium flex items-center space-x-2 hover:bg-yellow-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
        <span>{isRefreshing ? 'Refreshing...' : 'Refresh Data'}</span>
      </button>
      {lastUpdated && (
        <span className="text-sm text-blue-200">
          Last updated: {new Date(lastUpdated).toLocaleTimeString()}
        </span>
      )}
    </div>
  );
}