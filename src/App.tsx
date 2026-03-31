import React, { useState, useEffect } from 'react';
import { Sidebar, Header } from './components/Navigation';
import { StatCard } from './components/Dashboard/StatCard';
import { AnalyticsOverview } from './components/Dashboard/AnalyticsOverview';
import { PatientList } from './components/Patients/PatientList';
import { DataEntryForm } from './components/Forms/DataEntryForm';
import { View } from './types';
import { 
  Users, 
  Activity, 
  Calendar, 
  AlertCircle,
  Clock,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { Toaster } from 'sonner';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<View>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Stats for the dashboard
  const stats = [
    { label: 'Total Patients', value: '2,845', change: 12, trend: 'up' as const, icon: <Users className="w-6 h-6" /> },
    { label: 'Visits Today', value: '48', change: -5, trend: 'down' as const, icon: <Activity className="w-6 h-6" /> },
    { label: 'Upcoming Appts', value: '156', change: 8, trend: 'up' as const, icon: <Calendar className="w-6 h-6" /> },
    { label: 'Critical Alerts', value: '3', change: 0, trend: 'neutral' as const, icon: <AlertCircle className="w-6 h-6" /> },
  ];

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Hero Section */}
            <div className="relative h-64 w-full rounded-3xl overflow-hidden group">
              <img 
                src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/7dc8f8b9-bed3-4cb8-8e04-629f5df751ec/hero-image-6027fa02-1774722947585.webp"
                alt="Clinic management"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-blue-900/40 to-transparent"></div>
              <div className="absolute inset-0 p-8 flex flex-col justify-center text-white max-w-lg">
                <h1 className="text-3xl font-bold mb-2">Welcome back, Dr. Doe</h1>
                <p className="text-blue-100 text-sm mb-6">Your clinic has seen a 12% increase in patient volume this week. 5 new reports are ready for review.</p>
                <div className="flex gap-3">
                  <button 
                    onClick={() => setActiveView('data-entry')}
                    className="bg-white text-blue-900 px-6 py-2.5 rounded-xl font-semibold text-sm hover:bg-blue-50 transition-colors"
                  >
                    Register Patient
                  </button>
                  <button className="bg-white/20 backdrop-blur-md text-white px-6 py-2.5 rounded-xl font-semibold text-sm hover:bg-white/30 transition-colors border border-white/20">
                    View Reports
                  </button>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
              {stats.map((stat, idx) => (
                <StatCard key={idx} {...stat} />
              ))}
            </div>

            {/* Charts Section */}
            <AnalyticsOverview />

            {/* Recent Activities & Quick Access */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pb-8">
              <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold text-slate-900">Recent Patient Encounters</h3>
                  <button 
                    onClick={() => setActiveView('patients')}
                    className="text-xs font-medium text-blue-600 hover:underline flex items-center gap-1"
                  >
                    View All <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
                <div className="space-y-4">
                  {[
                    { name: 'Sarah Connor', time: '10 mins ago', type: 'Checkup', status: 'Completed' },
                    { name: 'Marcus Wright', time: '25 mins ago', type: 'Vaccination', status: 'Pending Lab' },
                    { name: 'Kyle Reese', time: '1 hour ago', type: 'Emergency', status: 'Follow-up' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer group">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-slate-200 text-slate-600 font-semibold group-hover:border-blue-200">
                          {item.name[0]}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-900">{item.name}</p>
                          <div className="flex items-center gap-2 text-xs text-slate-500">
                            <Clock className="w-3 h-3" />
                            {item.time} • {item.type}
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-500" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <h3 className="font-semibold text-slate-900 mb-6">Quick Links</h3>
                <div className="space-y-3">
                  {[
                    { label: 'DHIS2 Export', color: 'bg-green-500' },
                    { label: 'Medicine Inventory', color: 'bg-orange-500' },
                    { label: 'Staff Schedule', color: 'bg-purple-500' },
                    { label: 'Lab Results', color: 'bg-blue-500' },
                    { label: 'Billing System', color: 'bg-slate-700' },
                  ].map((link, i) => (
                    <button key={i} className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:border-slate-200 hover:bg-slate-50 transition-all text-left">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${link.color}`}></div>
                        <span className="text-sm font-medium text-slate-700">{link.label}</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-300" />
                    </button>
                  ))}
                </div>
                <div className="mt-8 p-4 bg-blue-50 rounded-2xl border border-blue-100">
                  <p className="text-xs font-semibold text-blue-600 uppercase mb-1">System Health</p>
                  <p className="text-sm text-blue-900 mb-3">Sync with central database is active.</p>
                  <div className="w-full bg-blue-200 h-1 rounded-full overflow-hidden">
                    <div className="bg-blue-600 h-full w-[94%]"></div>
                  </div>
                  <p className="text-[10px] text-blue-500 mt-2">Last sync: 2 mins ago</p>
                </div>
              </div>
            </div>
          </div>
        );
      case 'patients':
        return <PatientList />;
      case 'data-entry':
        return <DataEntryForm />;
      case 'analytics':
        return (
          <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center space-y-4">
            <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto text-blue-600">
              <Activity className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">Advanced Analytics Hub</h2>
            <p className="text-slate-500 max-w-md mx-auto">This module connects directly to national DHIS2 datasets for predictive healthcare modeling and resource allocation.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto pt-8">
              <img src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/7dc8f8b9-bed3-4cb8-8e04-629f5df751ec/dashboard-preview-6f40dead-1774722947440.webp" className="rounded-xl border shadow-sm" alt="analytics" />
              <img src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/7dc8f8b9-bed3-4cb8-8e04-629f5df751ec/analytics-bg-4bded786-1774722947162.webp" className="rounded-xl border shadow-sm" alt="data" />
            </div>
          </div>
        );
      default:
        return (
          <div className="flex flex-col items-center justify-center h-[60vh] text-slate-400">
            <AlertCircle className="w-12 h-12 mb-4" />
            <p>Module coming soon...</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Toaster position="top-right" />
      <Sidebar 
        activeView={activeView} 
        onViewChange={setActiveView} 
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />
      <Header 
        onMenuClick={() => setIsSidebarOpen(true)} 
        title={activeView} 
      />
      
      <main className="lg:ml-64 p-4 md:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;