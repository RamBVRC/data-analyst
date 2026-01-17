export interface SaleRecord {
  orderId: string;
  orderDate: string;
  region: string;
  category: string;
  subCategory: string;
  segment: string;
  sales: number;
  profit: number;
  quantity: number;
  // Calculated fields
  profitMargin?: number;
}

export interface PivotSummary {
  label: string;
  value: number;
  secondaryValue?: number;
  percentage?: number;
  // Index signature to satisfy chart data requirements where an object with dynamic keys is expected
  [key: string]: string | number | undefined;
}

export interface Insight {
  id: string;
  text: string;
  type: 'success' | 'warning' | 'info';
}

export interface FilterState {
  region: string[];
  category: string[];
  segment: string[];
}
