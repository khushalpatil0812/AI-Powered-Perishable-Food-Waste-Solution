export interface Store {
  id: string;
  name: string;
  location: string;
  type: string;
  wasteReduction: number;
  costSavings: number;
  status: 'Active' | 'Inactive';
}

export interface Product {
  name: string;
  category: string;
  currentStock: number;
  optimalStock: number;
  reorderPoint: number;
  savings: number;
  action: 'Reduce' | 'Increase' | 'Maintain';
}

export interface Alert {
  id: string;
  type: 'High' | 'Medium' | 'Info';
  message: string;
  store?: string;
}

export const stores: Store[] = [
  {
    id: 'store-a',
    name: 'Store A - Urban',
    location: 'Downtown',
    type: 'Urban',
    wasteReduction: 35,
    costSavings: 320000,
    status: 'Active'
  },
  {
    id: 'store-b',
    name: 'Store B - Suburban',
    location: 'Mall',
    type: 'Suburban',
    wasteReduction: 28,
    costSavings: 250000,
    status: 'Active'
  },
  {
    id: 'store-c',
    name: 'Store C - Rural',
    location: 'Highway',
    type: 'Rural',
    wasteReduction: 42,
    costSavings: 330000,
    status: 'Active'
  }
];

export const products: Product[] = [
  { name: 'Milk 2%', category: 'Dairy', currentStock: 120, optimalStock: 95, reorderPoint: 30, savings: 450, action: 'Reduce' },
  { name: 'Bananas', category: 'Produce', currentStock: 80, optimalStock: 110, reorderPoint: 25, savings: 230, action: 'Increase' },
  { name: 'Bread', category: 'Bakery', currentStock: 45, optimalStock: 35, reorderPoint: 15, savings: 180, action: 'Reduce' },
  { name: 'Chicken Breast', category: 'Meat', currentStock: 60, optimalStock: 75, reorderPoint: 20, savings: 320, action: 'Increase' },
  { name: 'Deli Sandwiches', category: 'Deli', currentStock: 25, optimalStock: 20, reorderPoint: 8, savings: 120, action: 'Reduce' }
];

export const alerts: Alert[] = [
  {
    id: '1',
    type: 'High',
    message: 'Store C: Milk expiring in 2 days - 45 units',
    store: 'Store C'
  },
  {
    id: '2',
    type: 'Medium',
    message: 'Store A: Optimize bread pricing - potential 15% savings',
    store: 'Store A'
  },
  {
    id: '3',
    type: 'Info',
    message: 'System processed 1,247 optimization recommendations today'
  }
];

export const wasteReductionData = [
  { name: 'Week 1', before: 45000, after: 45000, reduction: 0 },
  { name: 'Week 2', before: 45000, after: 40500, reduction: 10 },
  { name: 'Week 3', before: 45000, after: 35100, reduction: 22 },
  { name: 'Week 4', before: 45000, after: 29250, reduction: 35 },
];

export const demandForecastData = [
  { day: 'Mon', actual: 850, predicted: 820, confidence: 15 },
  { day: 'Tue', actual: 920, predicted: 890, confidence: 20 },
  { day: 'Wed', actual: 780, predicted: 810, confidence: 18 },
  { day: 'Thu', actual: 1050, predicted: 1020, confidence: 25 },
  { day: 'Fri', actual: 1200, predicted: 1180, confidence: 30 },
  { day: 'Sat', actual: 1350, predicted: 1320, confidence: 35 },
  { day: 'Sun', actual: 980, predicted: 950, confidence: 22 },
];

export const categoryWasteData = [
  { name: 'Dairy', value: 25, amount: 22000 },
  { name: 'Produce', value: 35, amount: 31000 },
  { name: 'Bakery', value: 20, amount: 18000 },
  { name: 'Meat', value: 15, amount: 13000 },
  { name: 'Deli', value: 5, amount: 4000 },
];

export const roiScenarios = [
  { name: 'Conservative (25%)', roi: 245, breakEven: 6.2, savings: 283500 },
  { name: 'Realistic (35%)', roi: 340, breakEven: 4.8, savings: 378000 },
  { name: 'Optimistic (45%)', roi: 435, breakEven: 3.7, savings: 472500 },
];

export const inventoryHeatmapData = [
  { category: 'Dairy', store: 'Store A', level: 85, status: 'optimal' },
  { category: 'Dairy', store: 'Store B', level: 95, status: 'overstocked' },
  { category: 'Dairy', store: 'Store C', level: 75, status: 'understocked' },
  { category: 'Produce', store: 'Store A', level: 90, status: 'optimal' },
  { category: 'Produce', store: 'Store B', level: 70, status: 'understocked' },
  { category: 'Produce', store: 'Store C', level: 95, status: 'overstocked' },
  { category: 'Bakery', store: 'Store A', level: 80, status: 'optimal' },
  { category: 'Bakery', store: 'Store B', level: 85, status: 'optimal' },
  { category: 'Bakery', store: 'Store C', level: 92, status: 'overstocked' },
];