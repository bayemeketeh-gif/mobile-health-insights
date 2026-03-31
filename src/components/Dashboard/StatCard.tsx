import React from 'react';
import { ArrowUpRight, ArrowDownRight, TrendingUp } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  change: number;
  trend: 'up' | 'down' | 'neutral';
  icon: React.ReactNode;
}

export const StatCard: React.FC<StatCardProps> = ({ label, value, change, trend, icon }) => {
  const isUp = trend === 'up';
  
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 bg-slate-50 rounded-xl text-blue-600">
          {icon}
        </div>
        <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
          isUp ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'
        }`}>
          {isUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
          {Math.abs(change)}%
        </div>
      </div>
      <div>
        <p className="text-sm text-slate-500 mb-1">{label}</p>
        <h3 className="text-2xl font-bold text-slate-900">{value}</h3>
      </div>
      <div className="mt-4 pt-4 border-t border-slate-50">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <TrendingUp className="w-3 h-3" />
          <span>vs last 30 days</span>
        </div>
      </div>
    </div>
  );
};