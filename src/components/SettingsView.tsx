import React, { useState } from 'react';
import { Settings, Save, RefreshCw, Smartphone, Mail, Bell, Shield, Database, User } from 'lucide-react';
import { RecruiterSettings } from '../types';

interface SettingsViewProps {
  settings: RecruiterSettings;
  onUpdateSettings: (nextSettings: RecruiterSettings) => void;
  onResetData: () => void;
}

export function SettingsView({ settings, onUpdateSettings, onResetData }: SettingsViewProps) {
  const [name, setName] = useState(settings.recruiterName);
  const [email, setEmail] = useState(settings.recruiterEmail);
  const [avatar, setAvatar] = useState(settings.recruiterAvatar);

  const [notifs, setNotifs] = useState(settings.notificationsEnabled);
  const [digest, setDigest] = useState(settings.emailDigest);
  const [linkedInDefault, setLinkedInDefault] = useState(settings.autoPostLinkedIn);
  const [indeedDefault, setIndeedDefault] = useState(settings.autoPostIndeed);

  const handleSave = () => {
    onUpdateSettings({
      ...settings,
      recruiterName: name,
      recruiterEmail: email,
      recruiterAvatar: avatar,
      notificationsEnabled: notifs,
      emailDigest: digest,
      autoPostLinkedIn: linkedInDefault,
      autoPostIndeed: indeedDefault,
    });
    alert('Recruiter settings successfully synchronized and saved inside client localStorage!');
  };

  return (
    <div className="flex-1 overflow-y-auto bg-[#faf9f5] p-8 space-y-8 select-none" id="settings-workspace-view">
      
      {/* Title */}
      <div className="border-b-2 border-slate-900 pb-5">
        <h2 className="font-display text-3xl font-black text-slate-905">Workspace Settings</h2>
        <p className="text-xs text-slate-500 mt-2 font-semibold">Configure recruiter profiles, notification parameters, and local data buffers.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left main pane (span 8) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Recruiter Profile card */}
          <div className="bg-white border-2 border-slate-900 rounded-3xl p-6 space-y-6 shadow-[6px_6px_0px_0px_#0f172a] hover:-translate-y-0.5 transition-all">
            <h3 className="font-display text-lg font-black text-slate-900 border-b-2 border-slate-900 pb-3 flex items-center gap-2">
              <User className="w-5 h-5 text-slate-900" />
              <span>Recruiter Information</span>
            </h3>

            <div className="flex items-center gap-4">
              <img
                src={avatar}
                alt="Profile Avatar"
                className="w-18 h-18 rounded-2xl object-cover border-2 border-slate-900 shadow-[2px_2px_0px_0px_#000]"
                referrerPolicy="no-referrer"
              />
              <div className="space-y-1.5 flex-1 min-w-0">
                <p className="text-xs font-black text-slate-900 font-mono uppercase tracking-wider">Profile Photo URL</p>
                <input
                  type="text"
                  placeholder="URL of headshot avatar..."
                  value={avatar}
                  onChange={(e) => setAvatar(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border-2 border-slate-900 rounded-xl text-xs font-bold"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-extrabold font-mono text-slate-500 uppercase tracking-wider">Display Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-900 rounded-xl text-xs font-bold"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-extrabold font-mono text-slate-500 uppercase tracking-wider">Work Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-900 rounded-xl text-xs font-bold"
                />
              </div>
            </div>
          </div>

          {/* Notifications Card */}
          <div className="bg-white border-2 border-slate-900 rounded-3xl p-6 space-y-4 shadow-[6px_6px_0px_0px_#0f172a] hover:-translate-y-0.5 transition-all">
            <h3 className="font-display text-lg font-black text-slate-900 border-b-2 border-slate-900 pb-3 flex items-center gap-2">
              <Bell className="w-5 h-5 text-slate-900 font-bold" />
              <span>Notifications & Channel Rules</span>
            </h3>

            <div className="space-y-4 pt-1">
              <div className="flex items-center justify-between py-1">
                <div>
                  <p className="text-xs font-extrabold text-slate-900">Enable Browser Notifications</p>
                  <p className="text-[10px] text-slate-450 font-mono font-bold uppercase mt-1">Alert instantly for urgent tasks or pipeline score modifications.</p>
                </div>
                <button
                  onClick={() => setNotifs(!notifs)}
                  className={`w-10 h-6 rounded-full p-0.5 transition-colors border-2 border-slate-905 cursor-pointer ${notifs ? 'bg-emerald-400' : 'bg-slate-100'}`}
                >
                  <div className={`bg-white w-4.5 h-4.5 rounded-full border border-slate-900 shadow-sm transform transition-transform duration-200 ${notifs ? 'translate-x-[15px]' : 'translate-x-0'}`} />
                </button>
              </div>

              <div className="flex items-center justify-between border-t-2 border-slate-150 pt-4">
                <div>
                  <p className="text-xs font-extrabold text-slate-900">Email Application Digest</p>
                  <p className="text-[10px] text-slate-450 font-mono font-bold uppercase mt-1">Send structured summaries of candidates recruited via external portal.</p>
                </div>
                <button
                  onClick={() => setDigest(!digest)}
                  className={`w-10 h-6 rounded-full p-0.5 transition-colors border-2 border-slate-905 cursor-pointer ${digest ? 'bg-emerald-400' : 'bg-slate-100'}`}
                >
                  <div className={`bg-white w-4.5 h-4.5 rounded-full border border-slate-900 shadow-sm transform transition-transform duration-200 ${digest ? 'translate-x-[15px]' : 'translate-x-0'}`} />
                </button>
              </div>

              <div className="flex items-center justify-between border-t-2 border-slate-150 pt-4">
                <div>
                  <p className="text-xs font-extrabold text-slate-900">Auto-Post To LinkedIn</p>
                  <p className="text-[10px] text-slate-450 font-mono font-bold uppercase mt-1">Simulate instant publishing when final recruiting vectors are activated.</p>
                </div>
                <button
                  onClick={() => setLinkedInDefault(!linkedInDefault)}
                  className={`w-10 h-6 rounded-full p-0.5 transition-colors border-2 border-slate-905 cursor-pointer ${linkedInDefault ? 'bg-emerald-400' : 'bg-slate-100'}`}
                >
                  <div className={`bg-white w-4.5 h-4.5 rounded-full border border-slate-900 shadow-sm transform transition-transform duration-200 ${linkedInDefault ? 'translate-x-[15px]' : 'translate-x-0'}`} />
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Right Admin/Database control pane (span 4) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Quick save settings shortcut button */}
          <button
            onClick={handleSave}
            id="settings-save-actions-btn"
            className="w-full flex items-center justify-center gap-2 py-3.5 bg-emerald-400 hover:bg-emerald-300 text-slate-900 border-2 border-slate-950 rounded-2xl text-xs font-black uppercase tracking-wider font-mono shadow-[4px_4px_0px_0px_#0f172a] hover:-translate-y-0.5 transition-all cursor-pointer active:translate-y-0.5 active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
          >
            <Save className="w-4 h-4 text-slate-900" />
            <span>Save Settings Changes</span>
          </button>

          {/* Database management card (CSV/JSON resets) */}
          <div className="bg-white border-2 border-slate-900 rounded-3xl p-6 space-y-4 shadow-[6px_6px_0px_0px_#0f172a] hover:-translate-y-0.5 transition-all">
            <h3 className="font-display text-base font-black text-slate-900 border-b-2 border-slate-900 pb-2 flex items-center gap-2">
              <Database className="w-4.5 h-4.5 text-slate-905" />
              <span>Data Management</span>
            </h3>
            
            <p className="text-xs text-slate-650 leading-relaxed font-sans font-medium">
              All active job postings, evaluators, candidates, scoring boards, and settings are buffered in your browser's persistent database. Reset to wipe testing parameters instantly.
            </p>

            <button
              onClick={() => {
                if (confirm('Wipe database? This will reload the default set matching Elena Rodriguez, David Miller, and Senior Software Engineers.')) {
                  onResetData();
                }
              }}
              id="settings-reset-db-btn"
              className="w-full flex items-center justify-center gap-1.5 py-3 border-2 border-rose-900 text-rose-850 hover:bg-rose-100/30 bg-rose-50 rounded-2xl text-xs font-black uppercase tracking-wider font-mono transition shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5 text-rose-800" />
              <span>Reset Buffer Database</span>
            </button>
          </div>

          {/* Legal / Enterprise Certification info card */}
          <div className="bg-slate-900 text-white p-6 rounded-3xl space-y-2 border-2 border-slate-950 shadow-[6px_6px_0px_0px_#0f172a] font-sans select-none text-left">
            <h4 className="text-xs text-amber-300 font-mono font-bold tracking-wider uppercase">Compliance & Auditing</h4>
            <p className="text-sm font-extrabold text-white mt-1.5 leading-snug uppercase tracking-wide">SOX & SOC2 Standard Encrypted</p>
            <p className="text-[10px] text-slate-400 font-mono leading-relaxed pt-1.5">
              Enterprise compliance rules enforce mandatory audit logs tracking evaluation score updates, candidate timeline transitions, and recruiter login actions.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
