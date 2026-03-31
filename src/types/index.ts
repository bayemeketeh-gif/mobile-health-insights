export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  lastVisit: string;
  condition: string;
  status: 'Stable' | 'Critical' | 'Recovering';
}

export interface Metric {
  label: string;
  value: string | number;
  change: number;
  trend: 'up' | 'down' | 'neutral';
}

export type View = 'dashboard' | 'patients' | 'data-entry' | 'analytics' | 'settings';