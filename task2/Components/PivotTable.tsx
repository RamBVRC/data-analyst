
import React from 'react';
import { formatCurrency, formatPercent } from '../utils/dataHelper';

interface PivotTableProps {
  title: string;
  headers: string[];
  rows: any[];
  highlightTop?: boolean;
}

const PivotTable: React.FC<PivotTableProps> = ({ title, headers, rows, highlightTop = false }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
        <h3 className="font-bold text-slate-800">{title}</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-500 font-medium uppercase text-xs">
            <tr>
              {headers.map(h => (
                <th key={h} className="px-6 py-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((row, idx) => (
              <tr key={idx} className="hover:bg-slate-50 transition-colors">
                {Object.values(row).map((val: any, vIdx) => (
                  <td key={vIdx} className="px-6 py-4 whitespace-nowrap">
                    {typeof val === 'number' 
                      ? (val < 1 && val > -1 ? formatPercent(val * 100) : formatCurrency(val))
                      : (val && typeof val === 'object' ? formatCurrency(Object.values(val)[0] as number) : val)
                    }
                    {highlightTop && vIdx === Object.keys(row).length - 1 && val > 1000 && (
                      <span className="ml-2 px-1.5 py-0.5 rounded text-[10px] font-bold bg-green-100 text-green-700">TOP</span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PivotTable;
