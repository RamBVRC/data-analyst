import React from 'react';
import { Insight } from '../types';

interface InsightsPanelProps {
  insights: Insight[];
  loading: boolean;
}

const InsightsPanel: React.FC<InsightsPanelProps> = ({ insights, loading }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-slate-800 flex items-center gap-2">
          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          AI-Powered Insights
        </h3>
        {loading && <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-600 border-t-transparent"></div>}
      </div>
      
      <div className="space-y-4">
        {insights.map((insight) => (
          <div 
            key={insight.id} 
            className={`p-4 rounded-xl border-l-4 transition-all hover:scale-[1.01] ${
              insight.type === 'success' ? 'bg-emerald-50 border-emerald-500 text-emerald-800' :
              insight.type === 'warning' ? 'bg-amber-50 border-amber-500 text-amber-800' :
              'bg-blue-50 border-blue-500 text-blue-800'
            }`}
          >
            <p className="text-sm font-medium leading-relaxed">
              {insight.text}
            </p>
          </div>
        ))}
        {insights.length === 0 && !loading && (
          <p className="text-slate-400 text-sm text-center py-8">Adjust filters or upload data to see insights.</p>
        )}
      </div>
    </div>
  );
};

export default InsightsPanel;
