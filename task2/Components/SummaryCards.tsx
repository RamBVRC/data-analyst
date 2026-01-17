
import React from 'react';
import { formatCurrency, formatPercent } from '../utils/dataHelper';

interface SummaryCardsProps {
  totalSales: number;
  totalProfit: number;
  avgMargin: number;
  orderCount: number;
}

const SummaryCards: React.FC<SummaryCardsProps> = ({ totalSales, totalProfit, avgMargin, orderCount }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card title="Total Sales" value={formatCurrency(totalSales)} icon="💰" trend="+4.2%" color="blue" />
      <Card title="Total Profit" value={formatCurrency(totalProfit)} icon="📈" trend="+2.1%" color="emerald" />
      <Card title="Profit Margin" value={formatPercent(avgMargin)} icon="🎯" trend="-0.5%" color="purple" />
      <Card title="Orders" value={orderCount.toString()} icon="📦" trend="+12" color="amber" />
    </div>
  );
};

const Card = ({ title, value, icon, trend, color }: { title: string, value: string, icon: string, trend: string, color: string }) => {
  const colorMap: Record<string, string> = {
    blue: 'bg-blue-50 text-blue-600',
    emerald: 'bg-emerald-50 text-emerald-600',
    purple: 'bg-purple-50 text-purple-600',
    amber: 'bg-amber-50 text-amber-600',
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col gap-2 relative overflow-hidden">
      <div className={`absolute top-0 right-0 p-4 opacity-20 text-4xl`}>{icon}</div>
      <span className="text-slate-500 text-sm font-medium">{title}</span>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-bold text-slate-900">{value}</span>
        <span className={`text-xs font-semibold ${trend.startsWith('+') ? 'text-emerald-500' : 'text-rose-500'}`}>
          {trend}
        </span>
      </div>
      <div className="w-full h-1 bg-slate-100 mt-2 rounded-full overflow-hidden">
        <div className={`h-full ${colorMap[color].split(' ')[0].replace('bg-', 'bg-')} w-2/3 opacity-30`}></div>
      </div>
    </div>
  );
};

export default SummaryCards;
