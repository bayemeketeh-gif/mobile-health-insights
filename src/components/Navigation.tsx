import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  ClipboardPlus, 
  BarChart3, 
  Settings,
  Menu,
  X,
  PlusCircle,
  Bell
} from 'lucide-react';
import { View } from '../types';

interface SidebarProps {
  activeView: View;
  onViewChange: (view: View) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeView, onViewChange, isOpen, setIsOpen }) => {
  const navItems = [
    { id: 'dashboard' as View, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'patients' as View, label: 'Patient Records', icon: Users },
    { id: 'data-entry' as View, label: 'New Record', icon: ClipboardPlus },
    { id: 'analytics' as View, label: 'Analytics', icon: BarChart3 },
    { id: 'settings' as View, label: 'Settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 bottom-0 z-50 w-64 bg-white border-r border-slate-200 transition-transform duration-300 lg:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          <div className="p-6 flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
              <PlusCircle className="text-white w-6 h-6" />
            </div>
            <div>
              <h1 className="font-bold text-slate-900 leading-none">HealthTrack</h1>
              <span className="text-xs text-slate-500">Clinic Digitizer</span>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="lg:hidden ml-auto p-2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="flex-1 px-4 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onViewChange(item.id);
                  if (window.innerWidth < 1024) setIsOpen(false);
                }}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                  ${activeView === item.id 
                    ? 'bg-blue-50 text-blue-600 font-medium' 
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}
                `}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </button>
            ))}
          </nav>

          <div className="p-4 border-t border-slate-100">
            <div className="bg-slate-50 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">
                  JD
                </div>
                <div className="overflow-hidden">
                  <p className="text-sm font-medium text-slate-900 truncate">Dr. Jane Doe</p>
                  <p className="text-xs text-slate-500 truncate">Chief Administrator</p>
                </div>
              </div>
              <button className="w-full text-xs font-medium text-blue-600 bg-white border border-blue-100 py-2 rounded-lg hover:bg-blue-50 transition-colors">
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export const Header: React.FC<{ onMenuClick: () => void; title: string }> = ({ onMenuClick, title }) => (
  <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200 lg:ml-64">
    <div className="px-6 h-16 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-2 -ml-2 text-slate-600 hover:bg-slate-100 rounded-lg"
        >
          <Menu className="w-6 h-6" />
        </button>
        <h2 className="text-lg font-semibold text-slate-900 capitalize">{title.replace('-', ' ')}</h2>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="relative">
          <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
            <Bell className="w-5 h-5" />
          </button>
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 border-2 border-white rounded-full"></span>
        </div>
        <div className="h-8 w-px bg-slate-200 mx-2"></div>
        <div className="hidden sm:flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-medium text-slate-900">Health Center A</p>
            <p className="text-xs text-green-500 font-medium flex items-center gap-1 justify-end">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
              Online
            </p>
          </div>
        </div>
      </div>
    </div>
  </header>
);