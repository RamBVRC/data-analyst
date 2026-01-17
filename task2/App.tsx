import React, { useState, useEffect, useMemo } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  Cell, PieChart, Pie, Legend 
} from 'recharts';
import { SAMPLE_DATA } from './constants';
import { SaleRecord, FilterState, Insight } from './types';
import { cleanData, filterData, getPivotByCategory, getPivotByRegionSegment, getProfitMarginByCategory } from './utils/dataHelper';
import { generateInsights } from './services/geminiService';
import SummaryCards from './components/SummaryCards';
import Slicers from './components/Slicers';
import PivotTable from './components/PivotTable';
import InsightsPanel from './components/Insightspanel';

const App: React.FC = () => {
  const [rawData, setRawData] = useState<SaleRecord[]>(cleanData(SAMPLE_DATA));
  const [filters, setFilters] = useState<FilterState>({ region: [], category: [], segment: [] });
  const [insights, setInsights] = useState<Insight[]>([]);
  const [loadingInsights, setLoadingInsights] = useState(false);

  // Filtered dataset
  const filteredData = useMemo(() => filterData(rawData, filters), [rawData, filters]);

  // Pivot Calculations
  const categoryPivot = useMemo(() => getPivotByCategory(filteredData), [filteredData]);
  const regionSegmentPivotRaw = useMemo(() => getPivotByRegionSegment(filteredData), [filteredData]);
  const marginPivot = useMemo(() => getProfitMarginByCategory(filteredData), [filteredData]);

  const regionSegmentTableData = useMemo(() => {
    return regionSegmentPivotRaw.map(r => ({
      region: r.region,
      ...r.segments,
      total: r.total
    }));
  }, [regionSegmentPivotRaw]);

  // Aggregate stats
  const stats = useMemo(() => {
    const totalSales = filteredData.reduce((s, d) => s + d.sales, 0);
    const totalProfit = filteredData.reduce((s, d) => s + d.profit, 0);
    return {
      totalSales,
      totalProfit,
      avgMargin: totalSales !== 0 ? (totalProfit / totalSales) * 100 : 0,
      orderCount: filteredData.length
    };
  }, [filteredData]);

  // Fetch Insights on Data Change
  useEffect(() => {
    const fetchInsights = async () => {
      setLoadingInsights(true);
      const newInsights = await generateInsights(filteredData);
      setInsights(newInsights);
      setLoadingInsights(false);
    };
    
    const timeout = setTimeout(fetchInsights, 1000);
    return () => clearTimeout(timeout);
  }, [filteredData]);

  const handleExport = () => {
    alert("Exporting 'Pivot_Report.pdf' and 'Insights.docx'... (Simulated Download)");
  };

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444'];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-screen-2xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-blue-100">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V3zm3 3a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V7a1 1 0 00-1-1H6zm0 8a1 1 0 00-1 1v1a1 1 0 001 1h8a1 1 0 001-1v-1a1 1 0 00-1-1H6zm6-8a1 1 0 00-1 1v4a1 1 0 001 1h1a1 1 0 001-1V7a1 1 0 00-1-1h-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 leading-tight">PivotMaster Pro</h1>
              <p className="text-xs text-slate-500 font-medium">Superstore Sales Analysis Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={handleExport}
              className="px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors flex items-center gap-2 shadow-lg shadow-slate-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Export Report
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-screen-2xl mx-auto w-full p-6 flex flex-col gap-6">
        
        {/* Top Summary Stats */}
        <SummaryCards 
          totalSales={stats.totalSales} 
          totalProfit={stats.totalProfit} 
          avgMargin={stats.avgMargin} 
          orderCount={stats.orderCount} 
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Slicers (Sidebar) */}
          <aside className="lg:col-span-2">
            <Slicers filters={filters} setFilters={setFilters} />
          </aside>

          {/* Main Analytics Grid */}
          <div className="lg:col-span-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Visual Charts */}
            <div className="md:col-span-2 grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Sales by Category Chart */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  Sales Distribution by Category
                </h3>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={categoryPivot} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                      <Tooltip 
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                        formatter={(value: number | undefined) => [`$${(value ?? 0).toFixed(2)}`, 'Sales']}
                      />
                      <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                        {categoryPivot.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Profit Margin Chart */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                  Profit Margin % by Category
                </h3>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={marginPivot}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                        nameKey="label"
                      >
                        {marginPivot.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value: number | undefined) => [`${(value ?? 0).toFixed(1)}%`, 'Margin']} />
                      <Legend verticalAlign="bottom" height={36} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Pivot Tables */}
            <div className="space-y-6">
              <PivotTable 
                title="Sales Summary by Category" 
                headers={['Category', 'Total Sales', 'Market Share']} 
                rows={categoryPivot.map(p => ({ label: p.label, value: p.value, percentage: p.percentage }))} 
              />
              <PivotTable 
                title="Region & Segment Matrix" 
                headers={['Region', 'Consumer', 'Corporate', 'Home Office', 'Total']} 
                rows={regionSegmentTableData}
                highlightTop
              />
            </div>

            {/* Insights Panel */}
            <div className="space-y-6">
              <InsightsPanel insights={insights} loading={loadingInsights} />
              
              {/* Additional Pivot: Calculated Margin */}
              <PivotTable 
                title="Calculated Profit Margins" 
                headers={['Category', 'Avg Profit Margin %']} 
                rows={marginPivot} 
              />
            </div>

          </div>
        </div>
      </main>

      {/* Footer / Status Bar */}
      <footer className="bg-white border-t border-slate-200 p-4">
        <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row justify-between items-center text-xs text-slate-400 gap-2">
          <div className="flex gap-4">
            <span>Powered by Gemini 3 Analysis</span>
            <span className="text-slate-200">|</span>
            <span>Dataset: Superstore_Sales_2023.xlsx</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            Real-time Processing Active
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
