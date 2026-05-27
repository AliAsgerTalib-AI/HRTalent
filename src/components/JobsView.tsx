import React, { useState } from 'react';
import { Search, Filter, Plus, Clipboard, Check, ChevronDown, CheckSquare, Square, ToggleLeft, ToggleRight, X, Eye, FileText, Globe } from 'lucide-react';
import { Job, Candidate } from '../types';

interface JobsViewProps {
  jobs: Job[];
  candidates: Candidate[];
  onAddJob: (newJob: Job) => void;
  onUpdateJob: (updatedJob: Job) => void;
  isCreateMode: boolean;
  setIsCreateMode: (mode: boolean) => void;
}

export function JobsView({
  jobs,
  candidates,
  onAddJob,
  onUpdateJob,
  isCreateMode,
  setIsCreateMode,
}: JobsViewProps) {
  // Search state
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Filtering states from Screenshot 1 Left Panel
  const [statusFilter, setStatusFilter] = useState<'Active' | 'Draft' | 'Closed' | 'All'>('All');
  const [deptFilter, setDeptFilter] = useState<string[]>([]); // empty list means show all

  // Board distribution states from Screenshot 1 Left Panel
  const [linkedinActive, setLinkedinActive] = useState(true);
  const [indeedActive, setIndeedActive] = useState(false);

  // Selected job for right Drawer / evaluation details
  const [selectedJob, setSelectedJob] = useState<Job | null>(jobs[0] || null);
  const [drawerOpen, setDrawerOpen] = useState(true);

  // Job creation form states (Screenshot 5 context)
  const [formTitle, setFormTitle] = useState('');
  const [formDepartment, setFormDepartment] = useState('Engineering');
  const [formJobType, setFormJobType] = useState('Full-time');
  const [formLocation, setFormLocation] = useState('');
  const [formSalaryMin, setFormSalaryMin] = useState('120000');
  const [formSalaryMax, setFormSalaryMax] = useState('160000');
  const [formDescription, setFormDescription] = useState('Write about the role, day-to-day responsibilities, and team culture...');
  const [formChannels, setFormChannels] = useState({
    linkedIn: true,
    indeed: true,
    glassdoor: false,
    internal: true,
  });
  const [formHiringManager, setFormHiringManager] = useState('Jane Doe');

  // Multi-department toggling helper
  const handleDeptToggle = (dept: string) => {
    if (deptFilter.includes(dept)) {
      setDeptFilter(deptFilter.filter((d) => d !== dept));
    } else {
      setDeptFilter([...deptFilter, dept]);
    }
  };

  // Counting helpers for the filter tags from Screenshot 1
  const activeCount = jobs.filter((j) => j.status === 'Active').length;
  const draftCount = jobs.filter((j) => j.status === 'Draft').length;
  const closedCount = jobs.filter((j) => j.status === 'Closed').length;

  // Filter list
  const filteredJobs = jobs.filter((job) => {
    // Search match
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          job.hiringManager.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          job.department.toLowerCase().includes(searchTerm.toLowerCase());

    // Status Filter match
    const matchesStatus = statusFilter === 'All' || job.status === statusFilter;

    // Dept Filter match
    const matchesDept = deptFilter.length === 0 || deptFilter.includes(job.department);

    return matchesSearch && matchesStatus && matchesDept;
  });

  // Handle saving edits inside drawer (Screenshot 1 panel)
  const handleSaveJobEdits = () => {
    if (selectedJob) {
      onUpdateJob(selectedJob);
      alert(`Job settings saved for: ${selectedJob.title}`);
    }
  };

  // Handle publishing a new job (Screenshot 5 actions)
  const handlePublishNewJob = (statusOverride: 'Active' | 'Draft') => {
    if (!formTitle.trim()) {
      alert('Please enter a job title');
      return;
    }

    const createdJob: Job = {
      id: `job-${Date.now()}`,
      title: formTitle,
      department: formDepartment,
      location: formLocation || 'Remote',
      salaryMin: Number(formSalaryMin) || 100000,
      salaryMax: Number(formSalaryMax) || 150000,
      type: formJobType,
      status: statusOverride,
      hiringManager: formHiringManager,
      hiringManagerAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150',
      appsCount: 0,
      health: statusOverride === 'Active' ? 'On Track' : 'Draft',
      recruiter: 'Sarah Jenkins',
      postedAt: 'Just now',
      channels: formChannels,
      description: formDescription,
    };

    onAddJob(createdJob);
    setIsCreateMode(false);
    setSelectedJob(createdJob);
    setDrawerOpen(true);

    // Reset Form fields
    setFormTitle('');
    setFormLocation('');
    setFormDescription('Write about the role, day-to-day responsibilities, and team culture...');
  };

  return (
    <div className="flex-1 flex overflow-hidden bg-white select-none" id="jobs-workspace-pane">
      
      {/* 1. Left sub-sidebar - Search filter options */}
      {!isCreateMode && (
        <>
          {/* Backdrop for mobile */}
          {isMobileFiltersOpen && (
            <div 
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 lg:hidden"
              onClick={() => setIsMobileFiltersOpen(false)}
            />
          )}

          <div className={`
            ${isMobileFiltersOpen ? 'fixed top-0 bottom-0 left-0 z-50 w-72 h-full border-r-2 border-slate-900 bg-[#fffdfa] p-6 space-y-8 overflow-y-auto shadow-2xl block' : 'hidden'}
            lg:static lg:block lg:w-64 lg:border-r-2 lg:border-slate-905 lg:bg-[#fffdfa] lg:p-6 lg:space-y-8 lg:shrink-0 lg:overflow-y-auto lg:shadow-none transition-all duration-300
          `}>
            {/* If on mobile, add a close button at top */}
            <div className="flex lg:hidden items-center justify-between border-b-2 border-slate-900 pb-3">
              <span className="font-display text-base font-black text-slate-900">Filters</span>
              <button 
                onClick={() => setIsMobileFiltersOpen(false)}
                className="p-1 border-2 border-slate-900 rounded-lg bg-white text-slate-800 cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5 shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          {/* Status Filter block */}
          <div className="space-y-4">
            <h4 className="text-xs font-extrabold font-mono text-slate-800 uppercase tracking-wider border-b-2 border-slate-900 pb-2">Status</h4>
            <div className="space-y-2">
              <button
                onClick={() => setStatusFilter('All')}
                className={`w-full flex items-center justify-between text-xs font-bold px-3 py-2.5 rounded-xl border-2 transition cursor-pointer ${
                  statusFilter === 'All' 
                    ? 'bg-amber-100 border-slate-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-slate-900' 
                    : 'border-transparent text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <span>All Postings</span>
                <span className="text-[10px] font-mono text-slate-500 font-extrabold bg-white border border-slate-300 px-1.5 py-0.5 rounded-md">{jobs.length}</span>
              </button>
              <button
                onClick={() => setStatusFilter('Active')}
                className={`w-full flex items-center justify-between text-xs font-bold px-3 py-2.5 rounded-xl border-2 transition cursor-pointer ${
                  statusFilter === 'Active' 
                    ? 'bg-[#dcfce7] border-slate-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-slate-900' 
                    : 'border-transparent text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-md bg-emerald-500 border border-slate-950" />
                  <span>Active</span>
                </div>
                <span className="text-[10px] font-mono text-slate-500 font-extrabold bg-white border border-slate-300 px-1.5 py-0.5 rounded-md">{activeCount}</span>
              </button>
              <button
                onClick={() => setStatusFilter('Draft')}
                className={`w-full flex items-center justify-between text-xs font-bold px-3 py-2.5 rounded-xl border-2 transition cursor-pointer ${
                  statusFilter === 'Draft' 
                    ? 'bg-[#e0f2fe] border-slate-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-slate-900' 
                    : 'border-transparent text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-md bg-sky-400 border border-slate-950" />
                  <span>Drafts</span>
                </div>
                <span className="text-[10px] font-mono text-slate-500 font-extrabold bg-white border border-slate-300 px-1.5 py-0.5 rounded-md">{draftCount}</span>
              </button>
              <button
                onClick={() => setStatusFilter('Closed')}
                className={`w-full flex items-center justify-between text-xs font-bold px-3 py-2.5 rounded-xl border-2 transition cursor-pointer ${
                  statusFilter === 'Closed' 
                    ? 'bg-[#ffe4e6] border-slate-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-slate-900' 
                    : 'border-transparent text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-md bg-rose-500 border border-slate-950" />
                  <span>Closed</span>
                </div>
                <span className="text-[10px] font-mono text-slate-500 font-extrabold bg-white border border-slate-300 px-1.5 py-0.5 rounded-md">{closedCount}</span>
              </button>
            </div>
          </div>

          {/* Department Filter block */}
          <div className="space-y-4">
            <h4 className="text-xs font-extrabold font-mono text-slate-800 uppercase tracking-wider border-b-2 border-slate-900 pb-2">Department</h4>
            <div className="space-y-3">
              {['Engineering', 'Design', 'Marketing', 'Sales'].map((dept) => {
                const isChecked = deptFilter.includes(dept);
                return (
                  <button
                    key={dept}
                    onClick={() => handleDeptToggle(dept)}
                    className="flex items-center gap-3 w-full text-left text-xs text-slate-700 font-bold hover:text-slate-955 select-none cursor-pointer"
                  >
                    {isChecked ? (
                      <CheckSquare className="w-5 h-5 text-slate-900 fill-amber-300 stroke-[2] shrink-0" />
                    ) : (
                      <Square className="w-5 h-5 text-slate-400 hover:border-slate-900 shrink-0" />
                    )}
                    <span>{dept}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Board Distribution Option switches */}
          <div className="space-y-4 border-t-2 border-slate-900 pt-6">
            <h4 className="text-xs font-extrabold font-mono text-slate-800 uppercase tracking-wider border-b-2 border-slate-900 pb-2">Distribution</h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-700 font-extrabold">LinkedIn</span>
                <button
                  onClick={() => setLinkedinActive(!linkedinActive)}
                  className="cursor-pointer transition hover:opacity-90"
                >
                  <div className={`w-10 h-6 rounded-full p-0.5 transition-colors border-2 border-slate-900 ${linkedinActive ? 'bg-emerald-400' : 'bg-slate-100'}`}>
                    <div className={`bg-white w-4.5 h-4.5 rounded-full border border-slate-900 shadow-sm transform transition-transform duration-200 ${linkedinActive ? 'translate-x-[15px]' : 'translate-x-0'}`} />
                  </div>
                </button>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-700 font-extrabold">Indeed</span>
                <button
                  onClick={() => setIndeedActive(!indeedActive)}
                  className="cursor-pointer transition hover:opacity-90"
                >
                  <div className={`w-10 h-6 rounded-full p-0.5 transition-colors border-2 border-slate-900 ${indeedActive ? 'bg-emerald-400' : 'bg-slate-100'}`}>
                    <div className={`bg-white w-4.5 h-4.5 rounded-full border border-slate-900 shadow-sm transform transition-transform duration-200 ${indeedActive ? 'translate-x-[15px]' : 'translate-x-0'}`} />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    )}

      {/* 2. Main central Workspace */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#faf9f5]">
        {isCreateMode ? (
          /* POST A NEW JOB VIEW */
          <div className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-6 sm:space-y-8" id="post-job-workspace-scroll">
            {/* Action Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b-2 border-slate-900 pb-6 gap-4">
              <div>
                <h2 className="font-display text-3xl font-black text-slate-900">Post a New Job</h2>
                <p className="text-xs text-slate-500 font-medium mt-1">Draft templates or push configurations instantly to visual active vectors.</p>
              </div>
              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <button
                  onClick={() => setIsCreateMode(false)}
                  className="px-4 py-2.5 border-2 border-slate-900 bg-white rounded-xl text-xs font-black uppercase tracking-wider font-mono text-slate-900 hover:bg-slate-50 cursor-pointer transition shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5 active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"
                >
                  Discard
                </button>
                <button
                  onClick={() => handlePublishNewJob('Draft')}
                  className="px-4 py-2.5 border-2 border-slate-900 bg-white rounded-xl text-xs font-black uppercase tracking-wider font-mono text-slate-900 hover:bg-slate-50 cursor-pointer transition shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5 active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"
                >
                  Save Draft
                </button>
                <button
                  onClick={() => handlePublishNewJob('Active')}
                  id="btn-publish-final"
                  className="px-5 py-2.5 bg-[#6cf8bb] border-2 border-slate-900 rounded-xl text-xs font-black uppercase tracking-wider font-mono text-slate-900 hover:bg-emerald-300 transition-all cursor-pointer shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5 active:translate-x-0.5 active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"
                >
                  Publish Job
                </button>
              </div>
            </div>

            {/* Layout Split: Left Form Elements, Right Side Channels */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Input Form (span 7) */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* Job Basics card */}
                <div className="bg-white border-2 border-slate-900 p-4 sm:p-6 rounded-2xl sm:rounded-3xl space-y-6 shadow-[4px_4px_0px_0px_#0f172a]">
                  <h3 className="font-display text-base font-extrabold text-slate-900 border-b-2 border-slate-900 pb-3">Job Basics</h3>
                  
                  <div className="space-y-2">
                    <label className="text-[11px] font-extrabold font-mono text-slate-500 uppercase tracking-wider">Job Title</label>
                    <input
                      type="text"
                      placeholder="e.g. Senior Software Engineer"
                      value={formTitle}
                      onChange={(e) => setFormTitle(e.target.value)}
                      id="input-form-job-title"
                      className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-900 rounded-xl text-xs font-semibold placeholder-slate-400 focus:bg-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[11px] font-extrabold font-mono text-slate-500 uppercase tracking-wider">Department</label>
                      <select
                        value={formDepartment}
                        onChange={(e) => setFormDepartment(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-900 rounded-xl text-xs font-bold bg-white focus:bg-white"
                      >
                        <option>Engineering</option>
                        <option>Design</option>
                        <option>Marketing</option>
                        <option>Operations</option>
                        <option>Sales</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[11px] font-extrabold font-mono text-slate-500 uppercase tracking-wider">Job Type</label>
                      <select
                        value={formJobType}
                        onChange={(e) => setFormJobType(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-900 rounded-xl text-xs font-bold bg-white focus:bg-white"
                      >
                        <option>Full-time</option>
                        <option>Contract</option>
                        <option>Part-time</option>
                        <option>Remote</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[11px] font-extrabold font-mono text-slate-500 uppercase tracking-wider">Location</label>
                      <input
                        type="text"
                        placeholder="City, State or Remote"
                        value={formLocation}
                        onChange={(e) => setFormLocation(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-900 rounded-xl text-xs font-semibold placeholder-slate-400 focus:bg-white"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[11px] font-extrabold font-mono text-slate-500 uppercase tracking-wider">Salary Range (Annual)</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          placeholder="Min"
                          value={formSalaryMin}
                          onChange={(e) => setFormSalaryMin(e.target.value)}
                          className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-900 rounded-xl text-xs font-bold focus:bg-white"
                        />
                        <span className="text-slate-900 font-bold font-mono text-xs">-</span>
                        <input
                          type="number"
                          placeholder="Max"
                          value={formSalaryMax}
                          onChange={(e) => setFormSalaryMax(e.target.value)}
                          className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-900 rounded-xl text-xs font-bold focus:bg-white"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Job Description card */}
                <div className="bg-white border-2 border-slate-900 p-4 sm:p-6 rounded-2xl sm:rounded-3xl space-y-4 shadow-[4px_4px_0px_0px_#0f172a]">
                  <h3 className="font-display text-base font-extrabold text-slate-900 border-b-2 border-slate-900 pb-3">Job Description</h3>
                  
                  {/* Rich text simulator bar */}
                  <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-2 border-2 border-slate-900 rounded-xl">
                    {['B', 'I', 'U', 'S', '</>', '🔗'].map((btn, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => alert(`Applied styling tag: ${btn}`)}
                        className="px-2.5 py-1 text-xs font-mono font-black border-2 border-transparent hover:border-slate-900 rounded-lg cursor-pointer transition bg-white"
                      >
                        {btn}
                      </button>
                    ))}
                    <span className="w-0.5 h-5 bg-slate-300 mx-2" />
                    <button
                      type="button"
                      onClick={() => alert('Undone text change')}
                      className="text-[10px] uppercase font-mono tracking-tight text-slate-500 font-extrabold px-1.5 py-1 hover:bg-white border hover:border-slate-300 rounded"
                    >
                      Undo
                    </button>
                    <button
                      type="button"
                      onClick={() => alert('Redone text change')}
                      className="text-[10px] uppercase font-mono tracking-tight text-slate-500 font-extrabold px-1.5 py-1 hover:bg-white border hover:border-slate-300 rounded mr-auto"
                    >
                      Redo
                    </button>
                  </div>

                  <textarea
                    rows={8}
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-900 rounded-xl text-xs overflow-y-auto leading-relaxed focus:bg-white"
                  />
                </div>
              </div>

              {/* Right Column: Publishing & Team Settings */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* Publishing Channels card */}
                <div className="bg-white border-2 border-slate-900 p-4 sm:p-6 rounded-2xl sm:rounded-3xl space-y-4 shadow-[4px_4px_0px_0px_#0f172a]">
                  <h3 className="font-display text-base font-extrabold text-slate-900 border-b-2 border-slate-900 pb-2">Publishing</h3>
                  <div className="space-y-4 pt-1">
                    {[
                      { key: 'linkedIn', label: 'LinkedIn', desc: 'Recommended for reach' },
                      { key: 'indeed', label: 'Indeed', desc: 'High volume applicants' },
                      { key: 'glassdoor', label: 'Glassdoor', desc: 'Employer branding boost' },
                      { key: 'internal', label: 'Internal Portal', desc: 'Active employees and referrals' },
                    ].map((channel) => {
                      const isActive = formChannels[channel.key as keyof typeof formChannels];
                      return (
                        <div key={channel.key} className="flex items-center justify-between py-1 border-b border-dashed last:border-0 last:pb-0 pb-3">
                          <div>
                            <p className="text-xs font-bold text-slate-900">{channel.label}</p>
                            <p className="text-[10px] text-slate-400 font-bold font-mono uppercase mt-0.5">{channel.desc}</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => setFormChannels({ ...formChannels, [channel.key]: !isActive })}
                            className={`w-10 h-6 rounded-full p-0.5 transition-colors border-2 border-slate-900 cursor-pointer ${isActive ? 'bg-emerald-400' : 'bg-slate-100'}`}
                          >
                            <div className={`bg-white w-4.5 h-4.5 rounded-full border border-slate-900 shadow-sm transform transition-transform duration-200 ${isActive ? 'translate-x-[15px]' : 'translate-x-0'}`} />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Team Assignments card */}
                <div className="bg-white border-2 border-slate-900 p-4 sm:p-6 rounded-2xl sm:rounded-3xl space-y-4 shadow-[4px_4px_0px_0px_#0f172a]">
                  <h3 className="font-display text-base font-extrabold text-slate-900 border-b-2 border-slate-900 pb-2">Hiring Team</h3>
                  <div className="space-y-4 pt-1">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-[10px] text-slate-400 font-extrabold font-mono tracking-wider uppercase">Lead Recruiter</p>
                        <p className="text-xs font-black text-slate-905 mt-1.5 bg-slate-100 border border-slate-900 rounded px-2.5 py-1">Sarah Jenkins</p>
                      </div>
                      <img
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150"
                        alt="Sarah"
                        className="w-12 h-12 rounded-2xl border-2 border-slate-900 object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    <div className="flex items-center justify-between gap-4 border-t-2 border-slate-900 pt-3.5">
                      <div className="flex-1">
                        <p className="text-[10px] text-slate-400 font-extrabold font-mono tracking-wider uppercase">Hiring Manager</p>
                        <select
                          value={formHiringManager}
                          onChange={(e) => setFormHiringManager(e.target.value)}
                          className="w-full text-xs font-bold text-slate-900 mt-1.5 focus:outline-none focus:ring-0 bg-slate-100 border-2 border-slate-900 rounded-xl px-2.5 py-1.5 cursor-pointer"
                        >
                          <option>Jane Doe</option>
                          <option>Alex Smith</option>
                          <option>Rita Wang</option>
                          <option>Marcus Thorne</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Live Preview block */}
                <div className="bg-slate-900 text-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-[4px_4px_0px_0px_#0f172a] border-2 border-slate-950 space-y-3">
                  <span className="text-[9px] uppercase font-mono tracking-widest text-[#6cf8bb] font-extrabold px-2 py-0.5 rounded-md bg-slate-800 border border-slate-700">Live Preview</span>
                  <div className="space-y-1.5 mt-2.5">
                    <h4 className="font-display text-2xl font-extrabold tracking-tight text-white leading-tight">
                      {formTitle || 'Senior Software Engineer'}
                    </h4>
                    <p className="font-mono text-[11px] text-slate-300 font-bold uppercase">
                      {formDepartment} • {formLocation || 'Remote'}
                    </p>
                  </div>
                </div>

              </div>

            </div>

          </div>
        ) : (
          /* STANDARD JOBS BOARD LIST VIEW & DETAIL EDIT PANELS */
          <div className="flex-1 flex overflow-hidden">
            
            {/* Core listing panel (width: 100% minus right Drawer) */}
            <div className="flex-1 flex flex-col overflow-y-auto p-4 sm:p-8 space-y-6">
              
              {/* Header and Add / Search triggers */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b-2 border-slate-900 pb-5">
                <div>
                  <h2 className="font-display text-2xl xs:text-3xl font-black text-slate-900">Jobs Workspace</h2>
                  <p className="text-xs text-slate-500 mt-1 font-semibold font-sans">
                    Monitor, customize, and configure your active career recruitment opportunities.
                  </p>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 w-full md:w-auto">
                  {/* Small Search */}
                  <div className="relative flex-1 md:flex-initial">
                    <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search postings..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2.5 bg-white border-2 border-slate-900 rounded-xl text-xs placeholder-slate-400 w-full md:w-64 focus:w-72 transition-all font-bold"
                    />
                  </div>
                  {/* Mobile Filters trigger button */}
                  <button
                    onClick={() => setIsMobileFiltersOpen(true)}
                    className="lg:hidden p-2.5 border-2 border-slate-900 rounded-xl bg-white text-slate-800 cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-[#fff7ed] transition active:translate-y-0.5"
                    title="Filters"
                  >
                    <Filter className="w-4 h-4 stroke-[2.5]" />
                  </button>
                  {/* Toggle Create view button */}
                  <button
                    onClick={() => setIsCreateMode(true)}
                    id="jobs-btn-post-new"
                    className="p-2.5 bg-emerald-400 border-2 border-slate-900 text-slate-900 rounded-xl hover:bg-emerald-300 flex items-center gap-1.5 px-3 sm:px-4 text-xs font-black uppercase tracking-wider font-mono shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5 active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] cursor-pointer transition-all"
                  >
                    <Plus className="w-4 h-4 stroke-[2.5]" />
                    <span>Post<span className="hidden xs:inline"> Job</span></span>
                  </button>
                </div>
              </div>

              {/* Table / Row Display of Listings - Styled as beautiful robust list */}
              <div className="bg-white border-2 border-slate-900 rounded-3xl overflow-hidden shadow-[6px_6px_0px_0px_#0f172a] hover:-translate-y-0.5 transition-all">
                {/* Table Headers */}
                <div className="grid grid-cols-12 gap-2 px-4 sm:px-6 py-4 bg-[#eff6ff] border-b-2 border-slate-900 text-[10px] font-extrabold font-mono text-slate-900 uppercase tracking-wider select-none text-left">
                  <div className="col-span-7 sm:col-span-7 md:col-span-4">Job Title</div>
                  <div className="hidden sm:block col-span-2">Department</div>
                  <div className="hidden md:block col-span-3">Hiring Manager</div>
                  <div className="col-span-2 sm:col-span-1 text-center">Apps</div>
                  <div className="col-span-3 sm:col-span-2 text-right">Status</div>
                </div>

                <div className="divide-y-2 divide-slate-900">
                  {filteredJobs.length === 0 ? (
                    <div className="p-12 text-center text-slate-500">
                      <Clipboard className="w-12 h-12 stroke-[1.5] text-slate-300 mx-auto mb-3" />
                      <p className="text-sm font-bold">No postings match current filters.</p>
                      <button onClick={() => { setStatusFilter('All'); setDeptFilter([]); setSearchTerm(''); }} className="mt-2 text-xs text-rose-600 font-black uppercase tracking-wider font-mono underline">
                        Clear all filters
                      </button>
                    </div>
                  ) : (
                    filteredJobs.map((job) => {
                      const isActive = selectedJob?.id === job.id;
                      const applicantsCount = candidates.filter((c) => c.jobId === job.id).length;
                      
                      return (
                        <div
                          key={job.id}
                          id={`job-row-${job.id}`}
                          onClick={() => {
                            setSelectedJob(job);
                            setDrawerOpen(true);
                          }}
                          className={`grid grid-cols-12 gap-2 px-4 sm:px-6 py-5 hover:bg-slate-50/70 items-center cursor-pointer transition ${
                            isActive ? 'bg-amber-100/60 border-l-8 border-slate-900' : ''
                          }`}
                        >
                          {/* Title Element */}
                          <div className="col-span-7 sm:col-span-7 md:col-span-4 min-w-0 pr-2">
                            <h4 className="font-display font-extrabold text-slate-900 text-xs sm:text-sm lg:text-base tracking-tight leading-snug">
                              {job.title}
                            </h4>
                            <p className="text-[9px] sm:text-[10px] text-slate-500 font-bold font-mono uppercase mt-1">
                              Posted {job.postedAt} <span className="hidden xs:inline">• {job.location}</span>
                            </p>
                            {/* Department inline badge for mobile only */}
                            <span className="inline-block sm:hidden text-[9px] font-extrabold text-indigo-700 bg-indigo-50 border border-slate-300 px-1.5 py-0.5 mt-1 rounded">
                              {job.department}
                            </span>
                          </div>

                          {/* Department */}
                          <div className="hidden sm:block col-span-2">
                            <span className="text-xs font-extrabold text-slate-900 bg-slate-150 border border-slate-905 px-2 py-0.5 rounded-md">
                              {job.department}
                            </span>
                          </div>

                          {/* Hiring Manager */}
                          <div className="hidden md:flex col-span-3 items-center gap-2.5">
                            <div className="w-8 h-8 rounded-xl bg-slate-900 text-white shrink-0 flex items-center justify-center font-mono font-black text-xs border border-slate-950">
                              {job.hiringManager.split(' ').map((n) => n[0]).join('')}
                            </div>
                            <span className="text-xs font-bold text-slate-900 font-sans truncate">
                              {job.hiringManager}
                            </span>
                          </div>

                          {/* Applicants Count */}
                          <div className="col-span-2 sm:col-span-1 text-center font-mono font-black text-xs sm:text-sm text-slate-905 bg-slate-105 border border-slate-900 rounded-lg py-1 shadow-[1px_1px_0px_0px_#000]">
                            {applicantsCount || job.appsCount}
                          </div>

                          {/* Health Indicator Badge */}
                          <div className="col-span-3 sm:col-span-2 text-right">
                            {job.health === 'On Track' && (
                              <span className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1 rounded-full bg-[#dcfce7] border border-slate-900 text-emerald-800 text-[9px] sm:text-[10px] font-bold font-mono uppercase shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
                                On Track
                              </span>
                            )}
                            {job.health === 'Needs Attention' && (
                              <span className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1 rounded-full bg-[#fef3c7] border border-slate-900 text-amber-800 text-[9px] sm:text-[10px] font-bold font-mono uppercase shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
                                Review
                              </span>
                            )}
                            {job.health === 'Draft' && (
                              <span className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1 rounded-full bg-slate-100 border border-slate-900 text-slate-500 text-[9px] sm:text-[10px] font-bold font-mono uppercase shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
                                Draft
                              </span>
                            )}
                            {job.health === 'Off Track' && (
                              <span className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1 rounded-full bg-[#ffe4e6] border border-slate-900 text-rose-700 text-[9px] sm:text-[10px] font-bold font-mono uppercase shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] animate-pulse">
                                Urgently
                              </span>
                            )}
                          </div>

                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>

            {/* Backdrop for mobile drawer */}
            {drawerOpen && selectedJob && (
              <div 
                className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 lg:hidden"
                onClick={() => setDrawerOpen(false)}
              />
            )}

            {/* 3. Right detail edit panel drawer */}
            {drawerOpen && selectedJob && (
              <div className="fixed inset-y-0 right-0 lg:static z-50 lg:z-auto w-full sm:w-96 border-l-2 border-slate-900 bg-white flex flex-col h-full shrink-0 overflow-hidden" id="edit-job-drawer">
                {/* Header detail */}
                <div className="p-6 border-b-2 border-slate-900 bg-[#eff6ff] flex items-center justify-between shrink-0">
                  <h3 className="font-display text-lg font-black text-slate-900">Edit Job Post</h3>
                  <button
                    onClick={() => setDrawerOpen(false)}
                    className="p-1.5 border-2 border-slate-900 bg-white hover:bg-slate-50 rounded-xl text-slate-900 transition active:translate-y-0.5 cursor-pointer shadow-[1.5px_1.5px_0px_0px_#000]"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Content area */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                  {/* Job basics highlight */}
                  <div className="bg-[#fffdf5] border-2 border-slate-900 p-4 rounded-2xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] space-y-1.5">
                    <span className="text-[10px] uppercase font-mono text-slate-500 font-extrabold">{selectedJob.department} Posting</span>
                    <h4 className="text-base font-black text-slate-905 tracking-tight">{selectedJob.title}</h4>
                    <p className="text-xs text-slate-500 font-mono font-bold mt-1 uppercase">{selectedJob.location} • {selectedJob.type}</p>
                  </div>

                  {/* Description Preview */}
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-mono text-slate-400 font-black">Description Preview</label>
                    <div className="bg-slate-50 border-2 border-slate-900 p-4 rounded-2xl max-h-56 overflow-y-auto text-xs text-slate-700 leading-relaxed whitespace-pre-line font-sans">
                      {selectedJob.description}
                    </div>
                  </div>

                  {/* Live Publication Channels checkboxes */}
                  <div className="space-y-3.5 pt-4 border-t-2 border-slate-900">
                    <label className="text-[10px] uppercase font-mono text-slate-400 font-black">Publication Channels</label>
                    <div className="grid grid-cols-2 gap-3.5">
                      {[
                        { key: 'linkedIn', label: 'LinkedIn' },
                        { key: 'indeed', label: 'Indeed' },
                        { key: 'glassdoor', label: 'Glassdoor' },
                        { key: 'internal', label: 'Internal' },
                      ].map((channel) => {
                        const isPublished = selectedJob.channels[channel.key as keyof typeof selectedJob.channels];
                        return (
                          <div
                            key={channel.key}
                            className="bg-white border-2 border-slate-900 rounded-xl p-3 flex items-center justify-between shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 transition-all"
                          >
                            <span className="text-xs font-bold text-slate-900">{channel.label}</span>
                            <button
                              type="button"
                              onClick={() => {
                                const newChannels = {
                                  ...selectedJob.channels,
                                  [channel.key]: !isPublished,
                                };
                                setSelectedJob({
                                  ...selectedJob,
                                  channels: newChannels,
                                });
                              }}
                              className={`w-9 h-5 rounded-full p-0.5 border-2 border-slate-900 cursor-pointer ${isPublished ? 'bg-emerald-400' : 'bg-slate-200'}`}
                            >
                              <div className={`bg-white w-3.5 h-3.5 rounded-full border border-slate-900 shadow-sm transform transition-transform duration-200 ${isPublished ? 'translate-x-[15px]' : 'translate-x-0'}`} />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Save Changes / Cancel bottom row */}
                <div className="p-6 border-t-2 border-slate-900 bg-slate-50 shrink-0 flex items-center gap-3">
                  <button
                    onClick={() => setDrawerOpen(false)}
                    className="flex-1 text-center py-3 border-2 border-slate-900 text-slate-900 bg-white hover:bg-slate-50 font-black text-xs uppercase tracking-wider font-mono rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5 active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveJobEdits}
                    id="edit-job-save-btn"
                    className="flex-1 text-center py-3 bg-slate-900 hover:bg-slate-800 text-white border-2 border-slate-950 font-black text-xs uppercase tracking-wider font-mono rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5 active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

    </div>
  );
}
