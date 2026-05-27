import React, { useState } from 'react';
import { Search, MapPin, Briefcase, ChevronRight, CheckCircle2, User, Mail, DollarSign, Building, Globe, X, FileText } from 'lucide-react';
import { Job } from '../types';

interface CareersPortalProps {
  jobs: Job[];
  onApply: (applicantData: {
    name: string;
    email: string;
    expectedSalary: string;
    summary: string;
    jobId: string;
    jobTitle: string;
    tags: string[];
  }) => void;
  onClosePortal: () => void;
}

export function CareersPortal({ jobs, onApply, onClosePortal }: CareersPortalProps) {
  // Search parameters
  const [keyword, setKeyword] = useState('');
  const [locationSelect, setLocationSelect] = useState('All');
  const [deptSelect, setDeptSelect] = useState('All');

  // Application flow states
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [applyModalOpen, setApplyModalOpen] = useState(false);

  // Form input states
  const [candidateName, setCandidateName] = useState('');
  const [candidateEmail, setCandidateEmail] = useState('');
  const [candidateSalary, setCandidateSalary] = useState('');
  const [candidateSummary, setCandidateSummary] = useState('');
  const [candidateSkills, setCandidateSkills] = useState('');

  // Log in to portal mock trigger
  const [trackingEmail, setTrackingEmail] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Filter positions
  const activeJobs = jobs.filter((j) => j.status === 'Active');

  const filteredJobs = activeJobs.filter((job) => {
    const matchesKeyword = job.title.toLowerCase().includes(keyword.toLowerCase()) ||
                          job.description.toLowerCase().includes(keyword.toLowerCase());
    
    const matchesLocation = locationSelect === 'All' || 
                            job.location.toLowerCase().includes(locationSelect.toLowerCase());
    
    const matchesDept = deptSelect === 'All' || 
                        job.department.toLowerCase() === deptSelect.toLowerCase();

    return matchesKeyword && matchesLocation && matchesDept;
  });

  // Submit trigger
  const handleSubmitApplication = (e: React.FormEvent) => {
    e.preventDefault();
    if (!candidateName.trim() || !candidateEmail.trim() || !selectedJob) {
      alert('Please fill out all required fields');
      return;
    }

    const skillsArray = candidateSkills
      ? candidateSkills.split(',').map((s) => s.trim())
      : ['Product', 'Engineering', 'Analytical'];

    onApply({
      name: candidateName,
      email: candidateEmail,
      expectedSalary: candidateSalary || '$130k - $150k',
      summary: candidateSummary || 'Passionate professional looking to expand creative capacity.',
      jobId: selectedJob.id,
      jobTitle: selectedJob.title,
      tags: skillsArray,
    });

    setApplyModalOpen(false);
    setSelectedJob(null);
    setCandidateName('');
    setCandidateEmail('');
    setCandidateSummary('');
    setCandidateSalary('');
    setCandidateSkills('');

    alert('Success! Your application was uploaded directly to TalentFlow Recruitment Suite! Switch to Recruiter view to examine your profile details.');
  };

  return (
    <div className="flex-1 bg-[#faf9f5] min-h-screen text-slate-900 overflow-y-auto selection:bg-slate-900 selection:text-white" id="careers-portal-page">
      
      {/* Careers Portal Nav Header */}
      <header className="border-b-2 border-slate-900 bg-white sticky top-0 z-30 select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 sm:py-5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 sm:gap-8">
            <div className="flex items-center gap-2">
              <span className="hidden sm:flex bg-slate-900 text-white w-9 h-9 rounded-xl items-center justify-center font-mono font-black text-sm border-2 border-slate-950 shadow-[2px_2px_0px_0px_#000] shrink-0">TF</span>
              <span className="font-display font-black text-xl sm:text-2xl tracking-tight text-slate-900">TalentFlow</span>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <span className="text-xs font-extrabold text-slate-900 border-b-2 border-slate-900 pb-1 cursor-pointer">Careers</span>
              <span className="text-xs font-bold text-slate-500 hover:text-slate-905 cursor-pointer" onClick={() => alert('TalentFlow is scaling globally! Focus is on transparency and beautiful interfaces.')}>About Us</span>
              <span className="text-xs font-bold text-slate-500 hover:text-slate-905 cursor-pointer" onClick={() => alert('Our culture values deep craft, asynchronous documentation loops, and aesthetic interfaces.')}>Culture</span>
            </nav>
          </div>

          <div className="flex items-center gap-3 sm:gap-6 shrink-0">
            <button
              onClick={() => {
                const mail = prompt('Enter your applied email address to check status:');
                if (mail) alert(`No active interview pipeline found for: ${mail}. Please apply below to trigger direct evaluation!`);
              }}
              className="text-[10px] sm:text-xs font-mono font-extrabold hover:underline text-slate-800 cursor-pointer uppercase tracking-wider shrink-0"
            >
              Track Status
            </button>
            <button
              onClick={onClosePortal}
              id="btn-return-recruiter-suite"
              className="px-3 sm:px-4 py-2 bg-slate-900 text-white rounded-xl text-[10px] sm:text-xs font-black uppercase tracking-wider font-mono hover:bg-slate-800 cursor-pointer shadow-[2px_2px_0px_0px_#000] border border-slate-950 transition shrink-0"
            >
              Exit Portal
            </button>
          </div>
        </div>
      </header>

      {/* Hero Display banner with recruitment text */}
      <section className="bg-white border-b-2 border-slate-900 py-12 sm:py-16 px-4 sm:px-6 relative overflow-hidden">
        {/* Background decorative grid pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <div className="max-w-4xl mx-auto space-y-6 text-center relative z-10">
          <h1 className="font-display text-3xl sm:text-6xl font-black text-slate-900 tracking-tight leading-none uppercase">
            Shape the future of <br />
            <span className="text-indigo-600 bg-indigo-50 border-2 border-indigo-600 px-3 sm:px-4 py-1.5 rounded-xl sm:rounded-2xl inline-block mt-3 shadow-[4px_4px_0px_0px_rgba(79,70,229,1)]">Recruitment Tech</span>
          </h1>
          <p className="text-xs sm:text-base text-slate-650 leading-relaxed max-w-2xl mx-auto font-medium pt-3">
            Help us build the most efficient HR ecosystem in the world. We are looking for dreamers, designers, builders, and leaders to join our global mission today.
          </p>
        </div>
      </section>

      {/* Core Search & Listings grid layout */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-6 sm:space-y-8">
        
        {/* Search Matrix filter block */}
        <div className="bg-[#fffbeb] border-2 border-slate-900 p-4.5 rounded-2xl shadow-[4px_4px_0px_0px_#0f172a] grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          
          {/* Keyword input */}
          <div className="md:col-span-4 relative">
            <Search className="w-4.5 h-4.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Job title or keywords..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border-2 border-slate-900 rounded-xl text-xs font-semibold placeholder-slate-400"
            />
          </div>

          {/* Location Dropdown selection */}
          <div className="md:col-span-3">
            <select
              value={locationSelect}
              onChange={(e) => setLocationSelect(e.target.value)}
              className="w-full px-3 py-3 border-2 border-slate-900 rounded-xl text-xs font-bold bg-white"
            >
              <option value="All">All Locations</option>
              <option value="Remote">Remote</option>
              <option value="New York">New York</option>
              <option value="London">London</option>
              <option value="San Francisco">San Francisco</option>
            </select>
          </div>

          {/* Dept selection */}
          <div className="md:col-span-3">
            <select
              value={deptSelect}
              onChange={(e) => setDeptSelect(e.target.value)}
              className="w-full px-3 py-3 border-2 border-slate-900 rounded-xl text-xs font-bold bg-white"
            >
              <option value="All">All Departments</option>
              <option value="Engineering">Engineering</option>
              <option value="Design">Design</option>
              <option value="Marketing">Marketing</option>
              <option value="Operations">Operations</option>
            </select>
          </div>

          {/* Apply search trigger */}
          <div className="md:col-span-2">
            <button
              onClick={() => alert(`Applied filters! Surface holds ${filteredJobs.length} matches.`)}
              className="w-full py-3.5 bg-slate-905 text-white hover:bg-slate-800 border-2 border-slate-950 font-black text-xs uppercase tracking-wider font-mono rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5 transition"
            >
              Search Jobs
            </button>
          </div>
        </div>

        {/* Layout Column split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Positions column: (span 8) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center justify-between border-b pb-3 mb-1">
              <h3 className="font-display font-black text-xl text-slate-900 uppercase">
                Open Positions ({filteredJobs.length})
              </h3>
              <span className="text-[10px] uppercase font-mono tracking-widest text-slate-500 font-bold">Sort by: Newest</span>
            </div>

            {filteredJobs.length === 0 ? (
              <div className="bg-white border-2 border-slate-900 p-12 rounded-3xl text-center text-slate-500 shadow-[4px_4px_0px_0px_#000]">
                <Briefcase className="w-12 h-12 stroke-[1.5] text-slate-350 mx-auto mb-3" />
                <p className="text-sm font-semibold text-slate-900">No open listings match your criteria.</p>
                <button
                  onClick={() => { setKeyword(''); setLocationSelect('All'); setDeptSelect('All'); }}
                  className="mt-2 text-xs text-indigo-700 font-bold underline"
                >
                  Clear search settings
                </button>
              </div>
            ) : (
              filteredJobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-white border-2 border-slate-900 hover:border-slate-950 p-4 sm:p-6 rounded-2xl sm:rounded-3xl flex flex-col justify-between transition relative group shadow-[4px_4px_0px_0px_#0f172a] hover:-translate-y-1 hover:shadow-[7px_7px_0px_0px_#0f172a]"
                >
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="inline-flex items-center gap-2">
                      <span className="px-3 py-1 bg-amber-100 border border-slate-900 text-slate-900 text-[10px] font-mono font-black uppercase tracking-wider rounded-lg shadow-[1.5px_1.5px_0px_0px_#000]">
                        {job.department}
                      </span>
                      <span className="text-xs text-slate-400 font-medium font-mono">Posted {job.postedAt}</span>
                    </div>
                    {/* Salary range */}
                    <span className="text-xs font-black font-mono text-slate-905 bg-slate-100 border border-slate-300 px-2 py-0.5 rounded-md">
                      ${(job.salaryMin / 1000).toFixed(0)}k - ${(job.salaryMax / 1000).toFixed(0)}k
                    </span>
                  </div>

                  <div className="space-y-2 mt-4">
                    <h4 className="font-display text-xl font-black text-slate-905 group-hover:underline leading-snug">
                      {job.title}
                    </h4>
                    <p className="text-xs text-slate-650 leading-relaxed whitespace-pre-line font-medium pr-4 mt-2 font-sans line-clamp-3">
                      {job.description}
                    </p>
                  </div>

                  {/* Criteria locations triggers */}
                  <div className="flex flex-wrap items-center justify-between gap-4 mt-6 border-t-2 border-slate-100 pt-4">
                    <div className="flex items-center gap-4 text-xs text-slate-450 font-mono font-bold uppercase">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-slate-900" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Briefcase className="w-4 h-4 text-slate-900" />
                        <span>{job.type}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setSelectedJob(job);
                        setApplyModalOpen(true);
                      }}
                      id={`apply-btn-${job.id}`}
                      className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 border-2 border-slate-950 text-white font-black text-xs uppercase tracking-wider font-mono rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5 transition cursor-pointer"
                    >
                      Apply Now
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Right Cards sidebar column: Already applied & Benefits checks (span 4) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Already Applied? Dark box */}
            <div className="bg-slate-900 text-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl border-2 border-slate-950 shadow-[4px_4px_0px_0px_#0f172a] space-y-4">
              <h3 className="font-display text-xl font-black uppercase tracking-tight text-white leading-tight">Already Applied?</h3>
              <p className="text-xs text-slate-400 font-sans leading-relaxed">
                Track your application status, manage interviews, and message your recruiter through our unified portal coordinates.
              </p>
              
              {isLoggingIn ? (
                <div className="space-y-2">
                  <input
                    type="email"
                    placeholder="Enter email to login"
                    value={trackingEmail}
                    onChange={(e) => setTrackingEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-xs"
                  />
                  <div className="flex items-center justify-between gap-2">
                    <button
                      onClick={() => setIsLoggingIn(false)}
                      className="text-[10px] uppercase font-mono font-bold text-slate-400"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        if (trackingEmail.trim()) {
                          alert(`Validation code dispatched to: ${trackingEmail}`);
                          setIsLoggingIn(false);
                        }
                      }}
                      className="px-3 py-1 bg-[#6cf8bb] text-slate-900 text-[11px] font-bold rounded"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setIsLoggingIn(true)}
                  className="w-full text-center py-3 bg-white text-slate-900 hover:bg-slate-50 border-2 border-slate-950 font-black text-xs uppercase tracking-wider font-mono rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5 transition-all text-center cursor-pointer"
                >
                  Log In to Portal
                </button>
              )}
            </div>

            {/* Why TalentFlow Checklist */}
            <div className="bg-white border-2 border-slate-900 p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-[4px_4px_0px_0px_#0f172a] space-y-4">
              <h3 className="font-display text-base font-black text-slate-900 uppercase">Why TalentFlow?</h3>
              <div className="space-y-3">
                {[
                  'Comprehensive health, vision, and dental coverage.',
                  'Annual remote-work stipend ($2,500).',
                  'Unlimited PTO with a 3-week mandatory minimum.',
                  'Stock options for all full-time employees.',
                ].map((item, id) => (
                  <div key={id} className="flex gap-2.5 items-start">
                    <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                    <p className="text-xs text-slate-650 font-sans leading-relaxed font-semibold">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Manhattan office workspace photo */}
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-slate-900 group aspect-video shadow-[4px_4px_0px_0px_#0f172a]">
              <img
                src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=400"
                alt="HQ Office"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/10 to-transparent flex items-end p-4">
                <span className="text-[#6cf8bb] bg-slate-900 border border-slate-705 px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider">Our Manhattan HQ</span>
              </div>
            </div>

          </div>

        </div>

      </main>

      {/* Dynamic Pop-up Apply Modal */}
      {applyModalOpen && selectedJob && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white border-2 border-slate-900 p-4 sm:p-6 rounded-2xl sm:rounded-3xl max-w-lg w-full space-y-4 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] relative animate-fadeIn">
            {/* Close button */}
            <button
              onClick={() => {
                setApplyModalOpen(false);
                setSelectedJob(null);
              }}
              className="absolute right-4 top-4 p-1.5 hover:bg-slate-50 border-2 border-slate-900 rounded-xl bg-white text-slate-900 cursor-pointer shadow-[1.5px_1.5px_0px_0px_#000]"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-1">
              <p className="text-[10px] uppercase font-mono tracking-wider font-extrabold text-indigo-700">{selectedJob.department} Candidate Application</p>
              <h3 className="font-display text-2xl font-black text-slate-900 tracking-tight leading-none mt-1">Apply for {selectedJob.title}</h3>
              <p className="text-xs text-slate-500 font-mono leading-relaxed mt-1 uppercase font-bold">{selectedJob.location} • {selectedJob.type}</p>
            </div>

            <form onSubmit={handleSubmitApplication} className="space-y-4 pt-2">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black font-mono text-slate-450 uppercase tracking-widest block">Full Name *</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Elena Rodriguez"
                    value={candidateName}
                    onChange={(e) => setCandidateName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border-2 border-slate-900 rounded-xl text-xs font-bold"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black font-mono text-slate-450 uppercase tracking-widest block">Email Address *</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    required
                    placeholder="e.g. elena@design.com"
                    value={candidateEmail}
                    onChange={(e) => setCandidateEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border-2 border-slate-900 rounded-xl text-xs font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black font-mono text-slate-455 uppercase tracking-widest block">Expected Salary</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="e.g. $140k - $160k"
                      value={candidateSalary}
                      onChange={(e) => setCandidateSalary(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border-2 border-slate-900 rounded-xl text-xs font-bold"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black font-mono text-slate-455 uppercase tracking-widest block">Key Skills (Comma Separated)</label>
                  <input
                    type="text"
                    placeholder="e.g. Figma, React, CSS"
                    value={candidateSkills}
                    onChange={(e) => setCandidateSkills(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-50 border-2 border-slate-900 rounded-xl text-xs font-bold"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black font-mono text-slate-456 uppercase tracking-widest block">Professional Summary Bio</label>
                <textarea
                  rows={2}
                  placeholder="Tell us about yourself..."
                  value={candidateSummary}
                  onChange={(e) => setCandidateSummary(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 border-2 border-slate-900 rounded-xl text-xs font-bold leading-relaxed"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-slate-900 text-white hover:bg-slate-800 border-2 border-slate-950 font-black text-xs uppercase tracking-wider font-mono rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5 transition"
              >
                Submit Application Profile
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
