import { useEffect, useState } from 'react';
import { Activity, ShieldAlert, Sparkles, Home, LayoutDashboard, UploadCloud, Server } from 'lucide-react';
import { ViewState, BackendHealth } from '../types/report';
import { checkBackendHealth } from '../services/api';

interface HeaderProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
  onOpenUpload: () => void;
}

export default function Header({ currentView, onNavigate, onOpenUpload }: HeaderProps) {
  const [health, setHealth] = useState<BackendHealth | null>(null);

  useEffect(() => {
    checkBackendHealth()
      .then(setHealth)
      .catch(() => setHealth(null));
  }, []);

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
      {/* Top Notice Ribbon */}
      <div className="bg-slate-900 text-slate-100 text-[11px] py-1 px-4 text-center font-medium flex items-center justify-center gap-2">
        <Sparkles className="w-3 h-3 text-teal-400" />
        <span>
          <strong>ReportSaathi:</strong> Educational Medical Report Explainer.
          {health?.status === 'healthy' ? (
            health.gemini_configured ? (
              <span className="text-emerald-300 ml-1">● FastAPI Backend & Live Gemini AI Active</span>
            ) : (
              <span className="text-teal-300 ml-1">● FastAPI Backend Connected (Demo Fallback)</span>
            )
          ) : (
            <span className="text-amber-300 ml-1">● Running Client-Side Demo</span>
          )}
        </span>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={() => onNavigate('landing')}
          className="flex items-center gap-3 text-left group focus:outline-hidden"
          title="Return to ReportSaathi Home"
        >
          <div className="bg-gradient-to-tr from-teal-600 to-emerald-500 text-white p-2.5 rounded-xl shadow-xs group-hover:scale-105 transition-transform">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-black text-slate-900 tracking-tight">ReportSaathi</span>
              <span className="text-[10px] font-bold bg-teal-50 text-teal-800 px-2 py-0.5 rounded-full border border-teal-200 uppercase tracking-wider">
                Beta
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium">Simple Educational Lab Explainer</p>
          </div>
        </button>

        {/* Navigation Actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          <nav className="hidden sm:flex items-center gap-1 text-xs font-semibold">
            <button
              onClick={() => onNavigate('landing')}
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                currentView === 'landing'
                  ? 'bg-slate-100 text-teal-800 font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Home className="w-3.5 h-3.5" />
              <span>About</span>
            </button>

            <button
              onClick={() => onNavigate('dashboard')}
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                currentView === 'dashboard'
                  ? 'bg-slate-100 text-teal-800 font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Dashboard</span>
            </button>
          </nav>

          {/* Backend Status Pill */}
          {health?.status === 'healthy' ? (
            <div className="hidden lg:flex items-center gap-1 text-[11px] bg-teal-50 text-teal-800 px-2.5 py-1 rounded-full border border-teal-200 font-medium">
              <Server className="w-3 h-3 text-teal-600" />
              <span>Backend Ready</span>
            </div>
          ) : null}

          <button
            onClick={onOpenUpload}
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl shadow-xs transition-all active:scale-95"
          >
            <UploadCloud className="w-4 h-4" />
            <span className="hidden xs:inline">Upload Report</span>
            <span className="xs:hidden">Upload</span>
          </button>

          {/* Educational Disclaimer Badge */}
          <div className="hidden md:flex items-center gap-1.5 text-[11px] bg-amber-50 text-amber-900 border border-amber-200 px-3 py-1.5 rounded-full font-medium shadow-2xs">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
            <span>Non-Diagnostic</span>
          </div>
        </div>
      </div>
    </header>
  );
}
