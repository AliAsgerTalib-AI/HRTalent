import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { DashboardView } from './components/DashboardView';
import { JobsView } from './components/JobsView';
import { CandidatesView } from './components/CandidatesView';
import { CareersPortal } from './components/CareersPortal';
import { SettingsView } from './components/SettingsView';
import { Globe, Bell, HelpCircle, LayoutDashboard, Briefcase, Users, BarChart3, Settings as SettingsIcon, MessageSquare, Flame } from 'lucide-react';

import {
  INITIAL_JOBS,
  INITIAL_CANDIDATES,
  INITIAL_TASKS,
  INITIAL_ACTIVITIES,
  INITIAL_SETTINGS,
} from './data';
import { Job, Candidate, Task, Activity, RecruiterSettings } from './types';

export default function App() {
  // --- Dynamic State Hooks loaded from LocalStorage ---
  const [jobs, setJobs] = useState<Job[]>(() => {
    const cached = localStorage.getItem('tf_jobs_db');
    return cached ? JSON.parse(cached) : INITIAL_JOBS;
  });

  const [candidates, setCandidates] = useState<Candidate[]>(() => {
    const cached = localStorage.getItem('tf_candidates_db');
    return cached ? JSON.parse(cached) : INITIAL_CANDIDATES;
  });

  const [tasks, setTasks] = useState<Task[]>(() => {
    const cached = localStorage.getItem('tf_tasks');
    return cached ? JSON.parse(cached) : INITIAL_TASKS;
  });

  const [activities, setActivities] = useState<Activity[]>(() => {
    const cached = localStorage.getItem('tf_activities');
    return cached ? JSON.parse(cached) : INITIAL_ACTIVITIES;
  });

  const [settings, setSettings] = useState<RecruiterSettings>(() => {
    const cached = localStorage.getItem('tf_settings');
    return cached ? JSON.parse(cached) : INITIAL_SETTINGS;
  });

  // Saving state changes directly back into local storage
  useEffect(() => {
    localStorage.setItem('tf_jobs_db', JSON.stringify(jobs));
  }, [jobs]);

  useEffect(() => {
    localStorage.setItem('tf_candidates_db', JSON.stringify(candidates));
  }, [candidates]);

  useEffect(() => {
    localStorage.setItem('tf_tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('tf_activities', JSON.stringify(activities));
  }, [activities]);

  useEffect(() => {
    localStorage.setItem('tf_settings', JSON.stringify(settings));
  }, [settings]);

  // --- Active Portal/Navigation parameters ---
  const [viewPortal, setViewPortal] = useState(false); // Switch to Careers Page
  const [currentTab, setCurrentTab] = useState<'dashboard' | 'jobs' | 'candidates' | 'analytics' | 'settings'>('dashboard');

  // Interactive controls within tabs
  const [isNewJobMode, setIsNewJobMode] = useState(false);
  const [selectedCandidateId, setSelectedCandidateId] = useState<string | null>(null);

  // App notification alert
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [notifBellOpen, setNotifBellOpen] = useState(false);

  // Interactive metrics
  const activeJobsCount = jobs.filter((j) => j.status === 'Active').length;
  const applicationsCount = candidates.length;
  const interviewCount = candidates.filter((c) => c.stage === 'Interview').length;

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  // --- Recruiter actions ---
  const handleAddNewJob = (newJob: Job) => {
    setJobs([newJob, ...jobs]);
    
    // Add activity log
    const newActivity: Activity = {
      id: `act-job-${Date.now()}`,
      user: settings.recruiterName,
      userAvatar: settings.recruiterAvatar,
      action: 'posted a new job:',
      target: `${newJob.title} (${newJob.department})`,
      time: 'Just now',
    };
    setActivities([newActivity, ...activities]);
    triggerToast(`🎉 Posted new Job: ${newJob.title}!`);
  };

  const handleUpdateJob = (updatedJob: Job) => {
    setJobs(jobs.map((j) => (j.id === updatedJob.id ? updatedJob : j)));
  };

  const handleUpdateCandidate = (updatedCandidate: Candidate) => {
    setCandidates(candidates.map((c) => (c.id === updatedCandidate.id ? updatedCandidate : c)));
  };

  const handleCompleteTask = (taskId: string) => {
    setTasks(tasks.filter((t) => t.id !== taskId));
    triggerToast('✓ Task completed and archived!');
  };

  // --- Candidate External Portal Actions ---
  const handleCandidateApply = (applicantData: {
    name: string;
    email: string;
    expectedSalary: string;
    summary: string;
    jobId: string;
    jobTitle: string;
    tags: string[];
  }) => {
    // Determine profile avatar
    const genders = ['women', 'men'];
    const randomGender = genders[Math.floor(Math.random() * genders.length)];
    const randomId = Math.floor(Math.random() * 80);
    const randomAvatar = `https://randomuser.me/api/portraits/${randomGender}/${randomId}.jpg`;

    const newCandidateId = `cand-${Date.now()}`;
    const newCandidate: Candidate = {
      id: newCandidateId,
      name: applicantData.name,
      title: `${selectedCandidateId ? 'Experienced applicant' : 'Candidate'} • for ${applicantData.jobTitle}`,
      rating: parseFloat((4.2 + Math.random() * 0.8).toFixed(1)),
      experience: '5+ Years',
      location: 'Remote',
      email: applicantData.email,
      avatar: randomAvatar,
      tags: applicantData.tags,
      stage: 'Applied',
      appliedDate: 'Just now',
      jobId: applicantData.jobId,
      jobTitle: applicantData.jobTitle,
      expectedSalary: applicantData.expectedSalary,
      resume: {
        summary: applicantData.summary,
        experience: [
          {
            role: 'Lead Professional Portfolio',
            company: 'Independent Contractor',
            period: '2021 - Present',
            highlights: ['Designed scalable elements in active production frameworks.', 'Collaborated on remote sprint reviews.']
          }
        ]
      },
      scorecard: {
        technical: parseFloat((4.2 + Math.random() * 0.8).toFixed(1)),
        design: parseFloat((4.1 + Math.random() * 0.9).toFixed(1)),
        culture: 4.5,
      },
      timeline: [
        {
          id: `t-apply-${Date.now()}`,
          event: `Applied to ${applicantData.jobTitle} position via Careers Portal`,
          user: 'System Bot',
          time: 'Just now',
          type: 'status',
        }
      ],
      comments: []
    };

    // Update state & databases
    setCandidates([newCandidate, ...candidates]);

    // Update job app applicant count metric
    setJobs(jobs.map(j => {
      if (j.id === applicantData.jobId) {
        return {
          ...j,
          appsCount: j.appsCount + 1
        };
      }
      return j;
    }));

    // Add activity log
    const applyActivity: Activity = {
      id: `act-apply-${Date.now()}`,
      user: 'Careers Portal',
      userAvatar: randomAvatar,
      action: 'received a new application from',
      target: `${applicantData.name} for ${applicantData.jobTitle}`,
      time: 'Just now',
    };
    setActivities([applyActivity, ...activities]);

    // Trigger toast notification
    triggerToast(`🔔 New Applicant: ${applicantData.name} applied for ${applicantData.jobTitle}!`);
  };

  const handleAddCandidateManually = () => {
    const name = prompt('Enter candidate full name:', 'Alex Rivera');
    if (!name) return;
    const email = prompt('Enter email address:', 'alex.r@cloudforce.io');
    if (!email) return;

    handleCandidateApply({
      name,
      email,
      expectedSalary: '$140k - $160k',
      summary: 'Experienced professional with comprehensive engineering track records.',
      jobId: 'job-1',
      jobTitle: 'Senior Software Engineer',
      tags: ['TypeScript', 'Node.js', 'Google Cloud', 'Docker'],
    });

    // Automatically navigate to that newly generated applicant
    const newlyCreated = candidates[0];
    if (newlyCreated) {
      setSelectedCandidateId(newlyCreated.id);
      setCurrentTab('candidates');
    }
  };

  // --- Reset database back to default ---
  const handleResetDatabase = () => {
    localStorage.removeItem('tf_jobs_db');
    localStorage.removeItem('tf_candidates_db');
    localStorage.removeItem('tf_tasks');
    localStorage.removeItem('tf_activities');
    localStorage.removeItem('tf_settings');
    
    // Reset state parameters
    setJobs(INITIAL_JOBS);
    setCandidates(INITIAL_CANDIDATES);
    setTasks(INITIAL_TASKS);
    setActivities(INITIAL_ACTIVITIES);
    setSettings(INITIAL_SETTINGS);

    // Refresh dashboard UI
    setCurrentTab('dashboard');
    setViewPortal(false);
    setIsNewJobMode(false);
    setSelectedCandidateId(null);

    triggerToast('❇️ Database successfully reset to default metrics!');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#faf9f5] text-slate-900 font-sans antialiased" id="talentflow-app-root">
      
      {/* Toast popup */}
      {toastMessage && (
        <div className="fixed top-24 right-6 z-50 bg-slate-900 text-white px-5 py-3.5 rounded-2xl border-2 border-slate-950 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center gap-3 animate-fadeIn">
          <span className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping" />
          <p className="text-xs font-black uppercase font-mono tracking-wider">{toastMessage}</p>
        </div>
      )}

      {/* Unified top Toggle bar (Interactive workspace switch) */}
      <div className="bg-slate-900 text-[#8293b8] py-2.5 px-6 h-12 flex items-center justify-between border-b-2 border-slate-950 select-none shrink-0 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] z-40" id="unified-top-switch-bar">
        <div className="flex items-center gap-2 text-[10px] tracking-widest font-extrabold uppercase font-mono text-emerald-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse border border-slate-900" />
          <span>TalentFlow Enterprise Suite</span>
        </div>

        {/* Dynamic toggle switches directly matching view */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setViewPortal(false)}
            id="bar-btn-recruiter-mode"
            className={`text-[11px] font-mono font-black uppercase tracking-wider px-3.5 py-1.5 rounded-xl border-2 transition-all cursor-pointer ${
              !viewPortal
                ? 'bg-amber-200 text-slate-900 border-slate-950 shadow-[2px_2px_0px_0px_#000]'
                : 'text-slate-400 border-transparent hover:text-white'
            }`}
          >
            Recruiter Workspace
          </button>
          
          <button
            onClick={() => setViewPortal(true)}
            id="bar-btn-candidate-mode"
            className={`text-[11px] font-mono font-black uppercase tracking-wider px-3.5 py-1.5 rounded-xl border-2 transition-all cursor-pointer ${
              viewPortal
                ? 'bg-amber-200 text-slate-900 border-slate-950 shadow-[2px_2px_0px_0px_#000]'
                : 'text-slate-400 border-transparent hover:text-emerald-400'
            }`}
          >
            Careers Landing Page
          </button>
        </div>
      </div>

      {/* LAYOUT DETERMINER */}
      {viewPortal ? (
        /* ================= CARRIERS EXTERNAL PORTAL ================= */
        <CareersPortal
          jobs={jobs}
          onApply={handleCandidateApply}
          onClosePortal={() => setViewPortal(false)}
        />
      ) : (
        /* ================= RECRUITER OFFICE PLATFORM ================= */
        <div className="flex-1 flex overflow-hidden min-h-0">
          
          {/* Main Sidebar */}
          <Sidebar
            currentTab={currentTab}
            setCurrentTab={(tab) => {
              setCurrentTab(tab as any);
              setIsNewJobMode(false);
              setSelectedCandidateId(null);
            }}
            settings={settings}
            onLogout={() => {
              if (confirm('Are you holding an audit lock? Press OK to simulate log out and reload state.')) {
                handleResetDatabase();
              }
            }}
            onOpenSupport={() => triggerToast('📞 Technical assistance active. Message Sarah Jenkins via slack!')}
          />

          {/* Central Workspace Canvas with unified dashboard header */}
          <div className="flex-1 flex flex-col overflow-hidden min-w-0 bg-[#faf9f5]">
            
            {/* Unified Header matching screenshots */}
            <header className="border-b-2 border-slate-900 bg-white px-8 h-20 flex items-center justify-between shrink-0 select-none">
              
              {/* Left search */}
              <div className="flex items-center gap-4 text-xs text-slate-400 font-mono font-bold uppercase">
                <span className="text-emerald-500 font-extrabold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
                  System Live Ingress
                </span>
                <span className="text-slate-300">|</span>
                <span className="text-slate-900 font-sans font-black">UTC: 2026-05-27</span>
              </div>

              {/* Right indicators */}
              <div className="flex items-center gap-6 relative">
                
                {/* Visual feedback warning */}
                <button
                  onClick={() => alert('Search across the platform using table search bars inside Jobs and Candidates tab!')}
                  className="p-1.5 hover:bg-slate-50 border-2 border-transparent hover:border-slate-900 rounded-xl text-slate-700 cursor-pointer"
                  title="Search Workspace"
                >
                  <Globe className="w-5 h-5 text-slate-800" />
                </button>

                {/* Notifications trigger with relative popup dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setNotifBellOpen(!notifBellOpen)}
                    className="p-1.5 hover:bg-slate-50 border-2 border-transparent hover:border-slate-900 rounded-xl text-slate-700 relative cursor-pointer"
                    title="Workspace Notifications"
                  >
                    <Bell className="w-5 h-5 text-slate-800" />
                    {tasks.length > 0 && (
                      <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-rose-600 rounded-full border border-slate-900" />
                    )}
                  </button>

                  {notifBellOpen && (
                    <div className="absolute right-0 top-11 bg-white border-2 border-slate-900 p-4 rounded-2xl shadow-[4px_4px_0px_0px_#000] w-72 z-50 text-xs space-y-2 text-slate-900 font-sans">
                      <div className="flex justify-between items-center border-b pb-2">
                        <span className="font-extrabold uppercase font-mono tracking-wider">Urgent Logs</span>
                        <span className="text-[10px] text-slate-400 font-mono font-bold">{tasks.length} pending</span>
                      </div>
                      <div className="space-y-1.5 pt-1.5 max-h-48 overflow-y-auto">
                        <p className="hover:bg-slate-50 p-2 rounded-xl text-slate-705 leading-normal border border-dashed border-transparent hover:border-slate-200">
                          🔵 New update: Data synchronization and CSV buffers linked to settings securely.
                        </p>
                        <p className="hover:bg-slate-50 p-2 rounded-xl text-slate-705 leading-normal border border-dashed border-transparent hover:border-slate-200">
                          📢 Job Status change: "Senior Software Engineer" has {candidates.length} applicants registered.
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => alert('Operational guidance active! Navigate across views. Candidate inputs instantly populate recruiter databases.')}
                  className="p-1.5 hover:bg-slate-50 border-2 border-transparent hover:border-slate-900 rounded-xl text-slate-700 cursor-pointer text-xs font-bold uppercase tracking-wider font-mono flex items-center gap-1.5"
                  title="Documentation Info"
                >
                  <HelpCircle className="w-5 h-5 text-slate-800" />
                  <span className="hidden sm:inline">Help</span>
                </button>

                <span className="w-0.5 h-6 bg-slate-300" />

                {/* Profile section */}
                <div className="flex items-center gap-3">
                  <img
                    src={settings.recruiterAvatar}
                    alt="Recruiter Avatar"
                    className="w-10 h-10 rounded-xl object-cover border-2 border-slate-900 shadow-[2px_2px_0px_0px_#000]"
                    referrerPolicy="no-referrer"
                  />
                  <div className="text-left hidden sm:block leading-tight">
                    <p className="text-xs font-black text-slate-900">{settings.recruiterName}</p>
                    <p className="text-[10px] text-slate-400 font-mono font-extrabold uppercase">Lead Recruiter</p>
                  </div>
                </div>

              </div>
            </header>

            {/* View Director */}
            <div className="flex-1 flex overflow-hidden min-h-0">
              {currentTab === 'dashboard' && (
                <DashboardView
                  jobs={jobs}
                  candidates={candidates}
                  tasks={tasks}
                  activities={activities}
                  settings={settings}
                  onSelectCandidate={(id) => {
                    setSelectedCandidateId(id);
                    setCurrentTab('candidates');
                  }}
                  onCompleteTask={handleCompleteTask}
                  onCreateJobClick={() => {
                    setIsNewJobMode(true);
                    setCurrentTab('jobs');
                  }}
                  onAddCandidateClick={handleAddCandidateManually}
                />
              )}

              {currentTab === 'jobs' && (
                <JobsView
                  jobs={jobs}
                  candidates={candidates}
                  onAddJob={handleAddNewJob}
                  onUpdateJob={handleUpdateJob}
                  isCreateMode={isNewJobMode}
                  setIsCreateMode={setIsNewJobMode}
                />
              )}

              {currentTab === 'candidates' && (
                <CandidatesView
                  candidates={candidates}
                  jobs={jobs}
                  onUpdateCandidate={handleUpdateCandidate}
                  selectedCandidateId={selectedCandidateId}
                  onClearSelectedCandidate={() => setSelectedCandidateId(null)}
                  onSelectCandidate={(id) => setSelectedCandidateId(id)}
                />
              )}

              {currentTab === 'analytics' && (
                /* ================= VISUAL ANALYTICS INTERACTIVE REPORT ================= */
                <div className="flex-1 overflow-y-auto bg-[#faf9f5] p-8 space-y-8" id="visual-analytics-board">
                  <div className="border-b-2 border-slate-900 pb-5">
                    <h2 className="font-display text-3xl font-black text-slate-900">Hiring Performance Analytics</h2>
                    <p className="text-xs text-slate-500 mt-2 font-semibold">Simulated statistical analysis tracking throughput, conversion rates, and pipeline health.</p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    
                    {/* Stat Card A: Dynamic conversion funnel */}
                    <div className="bg-white border-2 border-slate-900 rounded-3xl p-6 space-y-4 shadow-[6px_6px_0px_0px_#0f172a] hover:-translate-y-0.5 transition-all">
                      <h3 className="font-display text-xl font-black text-slate-905 border-b-2 border-slate-900 pb-3 flex items-center gap-2">
                        <Flame className="w-5 h-5 text-amber-500 fill-amber-500" />
                        <span>Hiring Pipeline Conversion Funnel</span>
                      </h3>

                      <div className="space-y-4 pt-2">
                        {[
                          { stage: 'Applications Received', count: applicationsCount, rate: '100%', color: 'from-amber-200 to-amber-300' },
                          { stage: 'Screening Passed', count: Math.ceil(applicationsCount * 0.6), rate: '60%', color: 'from-sky-200 to-sky-300' },
                          { stage: 'Interview Stages', count: interviewCount, rate: '42%', color: 'from-indigo-200 to-indigo-300' },
                          { stage: 'Offer Loop Out', count: Math.ceil(interviewCount * 0.3), rate: '15%', color: 'from-emerald-250 to-emerald-305' },
                        ].map((node, i) => (
                          <div key={i} className="space-y-1.5">
                            <div className="flex justify-between text-xs">
                              <span className="font-sans font-black text-slate-900">{node.stage}</span>
                              <span className="font-mono font-black text-slate-900 bg-slate-100 border border-slate-900 px-1.5 py-0.5 rounded text-[11px] shadow-[1px_1px_0px_0px_#000]">{node.count} candidates ({node.rate})</span>
                            </div>
                            <div className="w-full bg-slate-105 border border-slate-900 h-3 rounded-full overflow-hidden">
                              <div
                                className="bg-slate-900 h-2.5 rounded-full"
                                style={{ width: node.rate }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Stat Card B: Applicant volume diagram */}
                    <div className="bg-[#eff6ff] border-2 border-slate-900 text-slate-900 p-6 rounded-3xl shadow-[6px_6px_0px_0px_#0f172a] hover:-translate-y-0.5 transition-all space-y-4">
                      <h3 className="font-display text-xl font-black text-slate-900 border-b-2 border-slate-900 pb-3">Applicant Velocity</h3>
                      
                      {/* Interactive CSS SVG bar representations */}
                      <div className="h-48 flex items-end justify-between gap-4 pt-4 border-b-2 border-dashed border-slate-900 pb-4">
                        {[
                          { label: 'W1', height: 'h-1/5', count: 12 },
                          { label: 'W2', height: 'h-3/5', count: 42 },
                          { label: 'W3', height: 'h-2/5', count: 28 },
                          { label: 'W4', height: 'h-4/5', count: 56 },
                          { label: 'Now', height: 'h-full', count: applicationsCount },
                        ].map((bar, i) => (
                          <div key={i} className="flex-1 flex flex-col items-center gap-1 group">
                            <span className="text-[10px] font-mono font-black text-slate-900 bg-white border border-slate-900 px-1 rounded shadow-[1.5px_1.5px_0px_0px_#000] opacity-0 group-hover:opacity-100 transition-opacity">
                              {bar.count}
                            </span>
                            <div className={`w-full bg-slate-900 hover:bg-emerald-400 border-2 border-slate-950 transition-all rounded-t-xl ${bar.height}`} />
                            <span className="text-[10px] font-mono font-black text-slate-900">{bar.label}</span>
                          </div>
                        ))}
                      </div>
                      <p className="text-[11px] text-slate-500 font-extrabold text-center uppercase tracking-wider font-mono">Total application submissions grouped by matching intervals</p>
                    </div>

                  </div>

                </div>
              )}

              {currentTab === 'settings' && (
                <SettingsView
                  settings={settings}
                  onUpdateSettings={setSettings}
                  onResetData={handleResetDatabase}
                />
              )}
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
