
import React from 'react';
import { REGIONS, CATEGORIES, SEGMENTS } from '../constants';
import { FilterState } from '../types';

interface SlicersProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
}

const Slicers: React.FC<SlicersProps> = ({ filters, setFilters }) => {
  const toggleFilter = (key: keyof FilterState, value: string) => {
    setFilters(prev => {
      const current = prev[key];
      const next = current.includes(value)
        ? current.filter(v => v !== value)
        : [...current, value];
      return { ...prev, [key]: next };
    });
  };

  const SlicerGroup = ({ title, options, filterKey }: { title: string, options: string[], filterKey: keyof FilterState }) => (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
      <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
        </svg>
        {title}
      </h3>
      <div className="space-y-1">
        {options.map(opt => (
          <button
            key={opt}
            onClick={() => toggleFilter(filterKey, opt)}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all flex items-center justify-between ${
              filters[filterKey].includes(opt)
                ? 'bg-blue-600 text-white shadow-md shadow-blue-200 font-medium'
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
            }`}
          >
            {opt}
            {filters[filterKey].includes(opt) && (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            )}
          </button>
        ))}
      </div>
      {filters[filterKey].length > 0 && (
        <button 
          onClick={() => setFilters(prev => ({ ...prev, [filterKey]: [] }))}
          className="mt-3 text-xs text-blue-600 hover:text-blue-800 font-medium"
        >
          Clear filters
        </button>
      )}
    </div>
  );

  return (
    <div className="flex flex-col gap-4 sticky top-6">
      <SlicerGroup title="Region" options={REGIONS} filterKey="region" />
      <SlicerGroup title="Category" options={CATEGORIES} filterKey="category" />
      <SlicerGroup title="Segment" options={SEGMENTS} filterKey="segment" />
    </div>
  );
};

export default Slicers;
