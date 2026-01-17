import { SaleRecord, PivotSummary, FilterState } from "../types";

export const cleanData = (data: SaleRecord[]): SaleRecord[] => {
  return data
    .filter(item => item.sales !== undefined && item.sales !== null && !isNaN(item.sales))
    .map(item => ({
      ...item,
      // Calculate Profit Margin = Profit / Sales
      profitMargin: item.sales !== 0 ? (item.profit / item.sales) : 0
    }));
};

export const filterData = (data: SaleRecord[], filters: FilterState): SaleRecord[] => {
  return data.filter(item => {
    const regionMatch = filters.region.length === 0 || filters.region.includes(item.region);
    const categoryMatch = filters.category.length === 0 || filters.category.includes(item.category);
    const segmentMatch = filters.segment.length === 0 || filters.segment.includes(item.segment);
    return regionMatch && categoryMatch && segmentMatch;
  });
};

export const getPivotByCategory = (data: SaleRecord[]): PivotSummary[] => {
  const map = new Map<string, number>();
  let total = 0;
  
  data.forEach(item => {
    map.set(item.category, (map.get(item.category) || 0) + item.sales);
    total += item.sales;
  });

  return Array.from(map.entries())
    .map(([label, value]) => ({
      label,
      value,
      percentage: (value / total) * 100
    }))
    .sort((a, b) => b.value - a.value);
};

export const getPivotByRegionSegment = (data: SaleRecord[]): { region: string, segments: { [key: string]: number }, total: number }[] => {
  const regions = [...new Set(data.map(d => d.region))].sort();
  const segments = [...new Set(data.map(d => d.segment))].sort();
  
  return regions.map(r => {
    const rData = data.filter(d => d.region === r);
    const segmentSales: { [key: string]: number } = {};
    let rTotal = 0;
    
    segments.forEach(s => {
      const sSales = rData.filter(d => d.segment === s).reduce((sum, d) => sum + d.sales, 0);
      segmentSales[s] = sSales;
      rTotal += sSales;
    });
    
    return { region: r, segments: segmentSales, total: rTotal };
  });
};

export const getProfitMarginByCategory = (data: SaleRecord[]): PivotSummary[] => {
  const categories = [...new Set(data.map(d => d.category))];
  return categories.map(c => {
    const cData = data.filter(d => d.category === c);
    const totalSales = cData.reduce((sum, d) => sum + d.sales, 0);
    const totalProfit = cData.reduce((sum, d) => sum + d.profit, 0);
    return {
      label: c,
      value: totalSales !== 0 ? (totalProfit / totalSales) * 100 : 0
    };
  }).sort((a, b) => b.value - a.value);
};

export const formatCurrency = (val: number) => 
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);

export const formatPercent = (val: number) => 
  new Intl.NumberFormat('en-US', { style: 'percent', minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(val / 100);
