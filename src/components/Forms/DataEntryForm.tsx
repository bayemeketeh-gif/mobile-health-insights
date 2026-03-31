import React, { useState } from 'react';
import { toast } from 'sonner';
import { Save, UserPlus, Stethoscope, FileText, Send, Camera, QrCode, ClipboardList } from 'lucide-react';

export const DataEntryForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success('Patient record saved successfully!', {
        description: 'Data has been synchronized with the central repository.',
      });
    }, 1500);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Quick Action Bar for Digitizing */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Scan ID', icon: QrCode, color: 'bg-indigo-50 text-indigo-600' },
          { label: 'Photo Doc', icon: Camera, color: 'bg-emerald-50 text-emerald-600' },
          { label: 'Voice Note', icon: ClipboardList, color: 'bg-orange-50 text-orange-600' },
          { label: 'Vital Sync', icon: Stethoscope, color: 'bg-blue-50 text-blue-600' },
        ].map((action, i) => (
          <button key={i} className={`${action.color} p-4 rounded-2xl border border-transparent hover:border-current/20 transition-all flex flex-col items-center gap-2 group`}>
            <action.icon className="w-6 h-6 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-semibold">{action.label}</span>
          </button>
        ))}
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900 flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-blue-600" />
                Digitize New Encounter
              </h3>
              <p className="text-sm text-slate-500 mt-1">
                Fill in the details for the current patient visit.
              </p>
            </div>
            <div className="hidden sm:block">
              <span className="px-3 py-1 bg-green-100 text-green-700 text-[10px] font-bold uppercase rounded-full tracking-wider">
                Sync Active
              </span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          {/* Patient Info */}
          <section>
            <div className="flex items-center gap-2 mb-4 text-sm font-semibold text-slate-700">
              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs">1</span>
              Patient Information
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Full Name</label>
                <input required type="text" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all" placeholder="e.g. John Doe" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Phone Number</label>
                <input type="tel" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all" placeholder="+1 (555) 000-0000" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Date of Birth</label>
                <input type="date" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Gender</label>
                <select className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all">
                  <option>Select</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
          </section>

          {/* Vitals */}
          <section>
            <div className="flex items-center gap-2 mb-4 text-sm font-semibold text-slate-700">
              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs">2</span>
              Vital Signs & Triage
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-500">Temp (°C)</label>
                <input type="number" step="0.1" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white" placeholder="36.5" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-500">Weight (kg)</label>
                <input type="number" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white" placeholder="70" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-500">BP (mmHg)</label>
                <input type="text" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white" placeholder="120/80" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-500">Heart Rate</label>
                <input type="number" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white" placeholder="72" />
              </div>
            </div>
          </section>

          {/* Clinical Assessment */}
          <section>
            <div className="flex items-center gap-2 mb-4 text-sm font-semibold text-slate-700">
              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs">3</span>
              Clinical Assessment
            </div>
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Primary Complaint</label>
                <textarea rows={2} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all" placeholder="Symptoms, duration..."></textarea>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Diagnosis</label>
                <div className="flex gap-2">
                  <input type="text" className="flex-1 px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all" placeholder="ICD-10 or common name" />
                  <button type="button" className="p-2 bg-slate-100 rounded-xl text-slate-500 hover:bg-slate-200 transition-colors">
                    <ClipboardList className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Prescription/Treatment</label>
                <textarea rows={2} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all" placeholder="Dosage, instructions..."></textarea>
              </div>
            </div>
          </section>

          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white font-semibold py-3 px-6 rounded-xl hover:bg-blue-700 transition-all disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Save Locally
                </>
              )}
            </button>
            <button
              type="button"
              className="flex-1 flex items-center justify-center gap-2 bg-blue-50 text-blue-600 font-semibold py-3 px-6 rounded-xl hover:bg-blue-100 transition-all border border-blue-100"
            >
              <Send className="w-5 h-5" />
              Sync to DHIS2
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};