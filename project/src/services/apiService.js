// Real API service that connects to the FastAPI backend
const API_BASE_URL = 'http://localhost:8000/api';

// Helper function to handle API requests
const apiRequest = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`API request failed for ${endpoint}:`, error);
    throw new Error(`Failed to fetch data from ${endpoint}: ${error.message}`);
  }
};

export class ApiService {
  // Dashboard APIs
  static async getDashboardSummary() {
    return apiRequest('/dashboard/summary');
  }

  static async getWasteTrends() {
    return apiRequest('/dashboard/waste-trends');
  }

  static async getStoreComparison() {
    return apiRequest('/dashboard/store-comparison');
  }

  // Forecasting APIs
  static async getDemandPredictions(storeId, category, days = 7) {
    const params = new URLSearchParams();
    if (storeId) params.append('store_id', storeId);
    if (category) params.append('product_category', category);
    params.append('days', days.toString());
    
    return apiRequest(`/forecasting/predictions?${params}`);
  }

  static async generateForecast(storeId, productId, days = 7) {
    return apiRequest('/forecasting/generate', {
      method: 'POST',
      body: JSON.stringify({ store_id: storeId, product_id: productId, days }),
    });
  }

  static async getForecastAccuracy() {
    return apiRequest('/forecasting/accuracy');
  }

  // Inventory APIs
  static async getInventoryRecommendations(storeId = "all") {
    return apiRequest(`/inventory/recommendations?store_id=${storeId}`);
  }

  static async optimizeInventory(storeId) {
    return apiRequest('/inventory/optimize', {
      method: 'POST',
      body: JSON.stringify({ store_id: storeId }),
    });
  }

  static async getInventoryLevels(storeId) {
    return apiRequest(`/inventory/levels/${storeId}`);
  }

  // Waste APIs
  static async getWasteSummary() {
    return apiRequest('/waste/summary');
  }

  static async getWasteByCategory() {
    return apiRequest('/waste/by-category');
  }

  static async getWasteByStore() {
    return apiRequest('/waste/by-store');
  }

  static async getImplementationTimeline() {
    return apiRequest('/waste/timeline');
  }

  static async predictWaste(storeId, productId) {
    return apiRequest('/waste/predict', {
      method: 'POST',
      body: JSON.stringify({ store_id: storeId, product_id: productId }),
    });
  }

  // Expiring Items API - NEW!
  static async getExpiringItems(storeId = "all", daysAhead = 7) {
    const params = new URLSearchParams();
    if (storeId !== "all") params.append('store_id', storeId);
    params.append('days_ahead', daysAhead.toString());
    
    return apiRequest(`/inventory/expiring?${params}`);
  }

  // ROI APIs
  static async calculateROI(params) {
    return apiRequest('/roi/calculate', {
      method: 'POST',
      body: JSON.stringify(params),
    });
  }

  static async getROIScenarios() {
    return apiRequest('/roi/scenarios');
  }

  static async getSensitivityAnalysis() {
    return apiRequest('/roi/sensitivity');
  }

  // Scenario APIs
  static async getPrebuiltScenarios() {
    return apiRequest('/scenarios/prebuilt');
  }

  static async analyzeScenario(scenario) {
    return apiRequest('/scenarios/analyze', {
      method: 'POST',
      body: JSON.stringify(scenario),
    });
  }

  static async getWhatIfQuestions() {
    return apiRequest('/scenarios/what-if');
  }

  static async getScenarioComparison() {
    return apiRequest('/scenarios/comparison');
  }

  // Health check
  static async healthCheck() {
    return apiRequest('/health', { method: 'GET' });
  }
}