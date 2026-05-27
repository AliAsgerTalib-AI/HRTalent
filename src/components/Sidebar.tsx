import React from 'react';
import { LayoutDashboard, Briefcase, Users, BarChart3, Settings, HelpCircle, LogOut } from 'lucide-react';
import { RecruiterSettings } from '../types';

interface SidebarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  settings: RecruiterSettings;
  onLogout: () => void;
  onOpenSupport: () => void;
}

export function Sidebar({ currentTab, setCurrentTab, settings, onLogout, onOpenSupport }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'jobs', label: 'Jobs', icon: Briefcase },
    { id: 'candidates', label: 'Candidates', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-white border-r-2 border-slate-900 flex flex-col h-full min-h-screen shrink-0 selection:bg-slate-900 selection:text-white select-none" id="talentflow-sidebar">
      {/* Branding Header with high contrast border */}
      <div className="p-6 border-b-2 border-slate-900 bg-[#fffbeb]">
        <h1 className="font-display text-2xl font-black tracking-tight text-slate-900 flex items-center gap-2.5">
          <span className="bg-slate-900 text-white w-9 h-9 rounded-xl flex items-center justify-center font-mono font-black text-sm border-2 border-slate-950 shadow-[2px_2px_0px_0px_#000]">TF</span>
          <span>TalentFlow</span>
        </h1>
        <p className="font-sans text-xs text-slate-600 mt-2 font-bold tracking-wider uppercase">Recruitment Suite</p>
      </div>

      {/* Navigation Links inside bento list */}
      <nav className="flex-1 p-4 space-y-2 mt-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              id={`sidebar-item-${item.id}`}
              onClick={() => setCurrentTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all duration-150 border-2 select-none cursor-pointer ${
                isActive
                  ? 'bg-amber-200 text-slate-900 border-slate-900 shadow-[3px_3px_0px_0px_#050510]'
                  : 'text-slate-600 border-transparent hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-slate-900 stroke-[2.5]' : 'text-slate-500'}`} />
              <span className="font-sans font-extrabold">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Footer / Support Banner with solid accents */}
      <div className="p-4 border-t-2 border-slate-900 bg-slate-50 space-y-3">
        {/* Support widget link */}
        <button
          onClick={onOpenSupport}
          id="sidebar-btn-support"
          className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold uppercase tracking-wider font-mono text-slate-600 hover:bg-white hover:text-slate-900 border border-slate-300 hover:border-slate-900 rounded-xl transition-all cursor-pointer bg-white"
        >
          <HelpCircle className="w-4.5 h-4.5 text-slate-500" />
          <span>Support Contact</span>
        </button>

        {/* Support Status Widget (Reflecting image detail: "Support Status Active") */}
        <div className="bg-slate-900 text-white p-3.5 rounded-2xl border-2 border-slate-950 space-y-1 relative shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] select-none">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-mono tracking-wider font-extrabold text-slate-400">Support Status</span>
            <span className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse border border-slate-905" />
          </div>
          <p className="text-xs font-black font-sans tracking-wide uppercase text-emerald-400">Connected</p>
        </div>

        {/* Logout Link */}
        <button
          onClick={onLogout}
          id="sidebar-btn-logout"
          className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-extrabold uppercase tracking-wider font-mono text-rose-600 hover:bg-rose-100/60 border border-dashed border-rose-300 hover:border-rose-500 rounded-xl transition-all cursor-pointer bg-white"
        >
          <LogOut className="w-4.5 h-4.5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
