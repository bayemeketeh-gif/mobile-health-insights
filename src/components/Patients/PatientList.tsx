import React, { useState } from 'react';
import { Search, Filter, MoreVertical, Download } from 'lucide-react';
import { Patient } from '../../types';

const mockPatients: Patient[] = [
  { id: '1', name: 'John Doe', age: 45, gender: 'Male', lastVisit: '2023-11-20', condition: 'Hypertension', status: 'Stable' },
  { id: '2', name: 'Alice Smith', age: 28, gender: 'Female', lastVisit: '2023-11-22', condition: 'Malaria', status: 'Recovering' },
  { id: '3', name: 'Robert Johnson', age: 62, gender: 'Male', lastVisit: '2023-11-21', condition: 'Diabetes Type 2', status: 'Stable' },
  { id: '4', name: 'Emma Wilson', age: 10, gender: 'Female', lastVisit: '2023-11-23', condition: 'Fever', status: 'Critical' },
  { id: '5', name: 'Michael Brown', age: 35, gender: 'Male', lastVisit: '2023-11-19', condition: 'Fracture', status: 'Stable' },
];

export const PatientList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by patient name, ID, or condition..."
            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-slate-700 hover:bg-slate-50 transition-colors">
            <Filter className="w-4 h-4" />
            Filter
          </button>
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors">
            <Download className="w-4 h-4" />
            Export Data
          </button>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Patient Name</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Demographics</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Last Visit</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Condition</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mockPatients.map((patient) => (
                <tr key={patient.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-900">{patient.name}</div>
                    <div className="text-xs text-slate-500">ID: #{patient.id}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-slate-700">{patient.age}y, {patient.gender}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-700">{patient.lastVisit}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-slate-100 text-slate-700 rounded-md text-xs font-medium">
                      {patient.condition}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      patient.status === 'Critical' ? 'bg-red-50 text-red-600' :
                      patient.status === 'Recovering' ? 'bg-blue-50 text-blue-600' :
                      'bg-green-50 text-green-600'
                    }`}>
                      {patient.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-1 hover:bg-slate-100 rounded-lg transition-colors">
                      <MoreVertical className="w-4 h-4 text-slate-400" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};