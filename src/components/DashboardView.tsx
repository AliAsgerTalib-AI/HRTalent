import React from 'react';
import { Briefcase, FileText, Calendar, Zap, ArrowUpRight, CheckCircle2, AlertCircle, ChevronRight, Star, Heart, MessageSquare } from 'lucide-react';
import { Job, Candidate, Task, Activity, RecruiterSettings } from '../types';

interface DashboardViewProps {
  jobs: Job[];
  candidates: Candidate[];
  tasks: Task[];
  activities: Activity[];
  settings: RecruiterSettings;
  onSelectCandidate: (candidateId: string) => void;
  onCompleteTask: (taskId: string) => void;
  onCreateJobClick: () => void;
  onAddCandidateClick: () => void;
}

export function DashboardView({
  jobs,
  candidates,
  tasks,
  activities,
  settings,
  onSelectCandidate,
  onCompleteTask,
  onCreateJobClick,
  onAddCandidateClick,
}: DashboardViewProps) {
  // Compute metrics dynamically from interactive state
  const activeRolesCount = jobs.filter((j) => j.status === 'Active').length;
  const applicationsCount = candidates.length;
  const interviewCount = candidates.filter((c) => c.stage === 'Interview').length;

  return (
    <div className="flex-1 overflow-y-auto bg-[#faf9f5] p-4 sm:p-8 space-y-6 sm:space-y-8 select-none" id="recruiter-dashboard-view">
      {/* Top Welcome Title Grid */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl xs:text-3xl sm:text-4xl font-black tracking-tight text-slate-900">Recruiter Overview</h2>
          <p className="font-sans text-xs sm:text-sm text-slate-600 mt-2 font-medium">
            Welcome back, <span className="text-slate-900 font-bold">{settings.recruiterName}</span>. You have <span className="text-rose-600 font-bold underline decoration-rose-500 decoration-2">{tasks.length} urgent tasks</span> requiring attention today.
          </p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto shrink-0">
          <button
            onClick={onAddCandidateClick}
            id="dash-add-candidate-btn"
            className="flex-1 sm:flex-initial text-center px-4 sm:px-5 py-3 bg-white border-2 border-slate-900 rounded-2xl text-[11px] sm:text-xs font-bold font-mono uppercase tracking-wider text-slate-900 shadow-[2px_2px_0px_0px_#0f172a] hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-[4px_4px_0px_0px_#0f172a] active:translate-y-0.5 active:translate-x-0.5 active:shadow-[1px_1px_0px_0px_#0f172a] transition-all cursor-pointer"
          >
            Add Candidate
          </button>
          <button
            onClick={onCreateJobClick}
            id="dash-create-job-btn"
            className="flex-1 sm:flex-initial text-center px-4 sm:px-5 py-3 bg-emerald-400 border-2 border-slate-900 rounded-2xl text-[11px] sm:text-xs font-bold font-mono uppercase tracking-wider text-slate-900 shadow-[2px_2px_0px_0px_#0f172a] hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-[4px_4px_0px_0px_#0f172a] active:translate-y-0.5 active:translate-x-0.5 active:shadow-[1px_1px_0px_0px_#0f172a] transition-all cursor-pointer"
          >
            Create Job
          </button>
        </div>
      </div>

      {/* Grid of 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Stat Card 1: Active Roles */}
        <div className="bg-[#eff6ff] border-2 border-slate-900 p-6 rounded-3xl flex flex-col justify-between h-40 shadow-[6px_6px_0px_0px_#0f172a] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[8px_8px_0px_0px_#0f172a] transition-all duration-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold font-mono text-slate-900 uppercase tracking-wider">Active Roles</span>
            <span className="p-2 bg-white border-2 border-slate-900 rounded-xl text-slate-900">
              <Briefcase className="w-5 h-5 stroke-[2]" />
            </span>
          </div>
          <div>
            <div className="text-4xl font-extrabold font-display tracking-tight text-slate-900">{activeRolesCount}</div>
            <div className="flex items-center gap-1 text-xs text-emerald-800 font-extrabold mt-1">
              <ArrowUpRight className="w-4.5 h-4.5 stroke-[2.5]" />
              <span>+2 from last month</span>
            </div>
          </div>
        </div>

        {/* Stat Card 2: Applications */}
        <div className="bg-[#fffbeb] border-2 border-slate-900 p-6 rounded-3xl flex flex-col justify-between h-40 shadow-[6px_6px_0px_0px_#0f172a] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[8px_8px_0px_0px_#0f172a] transition-all duration-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold font-mono text-slate-900 uppercase tracking-wider">Applications</span>
            <span className="p-2 bg-white border-2 border-slate-900 rounded-xl text-slate-900">
              <FileText className="w-5 h-5 stroke-[2]" />
            </span>
          </div>
          <div>
            <div className="text-4xl font-extrabold font-display tracking-tight text-slate-900">{applicationsCount}</div>
            <div className="flex items-center gap-1 text-xs text-emerald-800 font-extrabold mt-1">
              <ArrowUpRight className="w-4.5 h-4.5 stroke-[2.5]" />
              <span>+48 new this week</span>
            </div>
          </div>
        </div>

        {/* Stat Card 3: Interviews */}
        <div className="bg-[#f0fdf4] border-2 border-slate-900 p-6 rounded-3xl flex flex-col justify-between h-40 shadow-[6px_6px_0px_0px_#0f172a] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[8px_8px_0px_0px_#0f172a] transition-all duration-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold font-mono text-slate-900 uppercase tracking-wider">Interviews</span>
            <span className="p-2 bg-white border-2 border-slate-900 rounded-xl text-slate-900">
              <Calendar className="w-5 h-5 stroke-[2]" />
            </span>
          </div>
          <div>
            <div className="text-4xl font-extrabold font-display tracking-tight text-slate-900">
              {interviewCount < 10 ? `0${interviewCount}` : interviewCount}
            </div>
            <div className="text-xs text-slate-600 font-extrabold mt-1">
              Scheduled for this week
            </div>
          </div>
        </div>

        {/* Stat Card 4: Hiring Velocity */}
        <div className="bg-[#faf5ff] border-2 border-slate-900 p-6 rounded-3xl flex flex-col justify-between h-40 shadow-[6px_6px_0px_0px_#0f172a] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[8px_8px_0px_0px_#0f172a] transition-all duration-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold font-mono text-slate-900 uppercase tracking-wider">Hiring Velocity</span>
            <span className="p-2 bg-slate-900 rounded-xl text-amber-400">
              <Zap className="w-5 h-5 text-amber-400 fill-amber-400" />
            </span>
          </div>
          <div>
            <div className="text-4xl font-extrabold font-display tracking-tight text-slate-900">18d</div>
            <div className="text-xs text-slate-500 font-extrabold mt-1">
              Average time to fill
            </div>
          </div>
        </div>
      </div>

      {/* Intermediate Grid: Urgent Tasks vs. Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Urgent Tasks (span 4 / 12) */}
        <div className="lg:col-span-4 bg-white border-2 border-slate-900 p-6 rounded-3xl flex flex-col h-[480px] shadow-[6px_6px_0px_0px_#0f172a] hover:-translate-y-0.5 transition-all">
          <div className="flex items-center justify-between mb-4 border-b-2 border-slate-900 pb-3">
            <h3 className="font-display text-xl font-bold text-slate-900 flex items-center gap-2">
              Urgent Tasks
            </h3>
            <span className="bg-rose-100 text-rose-800 text-[11px] font-extrabold font-mono px-3 py-1 rounded-full border border-slate-900 uppercase tracking-wider shadow-[2px_2px_0px_0px_#0f172a]">
              {tasks.length} Pending
            </span>
          </div>

          <div className="flex-1 overflow-y-auto space-y-4 pr-1">
            {tasks.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-4">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 stroke-[1.5] mb-2" />
                <p className="text-sm font-bold text-slate-900">All Caught Up!</p>
                <p className="text-xs text-slate-500 mt-1">There are no urgent recruiter responses pending.</p>
              </div>
            ) : (
              tasks.map((task) => (
                <div
                  key={task.id}
                  id={`task-item-${task.id}`}
                  className="group relative bg-[#faf9f6] border-2 border-slate-900 p-4 rounded-2xl flex items-start gap-3 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_#0f172a] transition-all duration-150"
                >
                  <div className="mt-0.5">
                    {task.type === 'review' && (
                      <span className="w-8 h-8 rounded-xl bg-rose-200 border-2 border-slate-900 flex items-center justify-center text-rose-800 font-extrabold font-mono text-xs">
                        !
                      </span>
                    )}
                    {task.type === 'offer' && (
                      <span className="w-8 h-8 rounded-xl bg-emerald-200 border-2 border-slate-900 flex items-center justify-center text-emerald-800 font-extrabold font-mono text-xs">
                        ✓
                      </span>
                    )}
                    {task.type === 'plan' && (
                      <span className="w-8 h-8 rounded-xl bg-blue-200 border-2 border-slate-900 flex items-center justify-center text-blue-800 font-extrabold font-mono text-xs">
                        P
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0 pr-4">
                    <p className="text-xs font-bold font-sans text-slate-900 group-hover:underline">
                      {task.title}
                    </p>
                    <p className="text-[11px] font-mono font-medium text-slate-500 mt-1">
                      {task.target}
                    </p>
                  </div>
                  <button
                    onClick={() => onCompleteTask(task.id)}
                    title="Complete task"
                    className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-all px-2.5 py-1.5 bg-emerald-400 border-2 border-slate-900 text-slate-900 rounded-xl cursor-pointer shadow-[1.5px_1.5px_0px_0px_#0f172a] sm:shadow-[2px_2px_0px_0px_#0f172a] hover:shadow-[3px_3px_0px_0px_#0f172a] text-[10px] sm:text-xs font-black uppercase tracking-wider font-mono"
                  >
                    Done
                  </button>
                </div>
              ))
            )}
          </div>

          <div className="border-t-2 border-slate-900 pt-4 mt-4">
            <button
              id="dashboard-view-all-tasks-btn"
              onClick={() => alert('All tasks filtered! You can mark items inline here.')}
              className="w-full text-center py-3 border-2 border-slate-900 hover:bg-slate-50 rounded-2xl text-xs font-bold uppercase tracking-wider font-mono text-slate-900 bg-white shadow-[2px_2px_0px_0px_#0f172a] active:translate-y-0.5 transition-all"
            >
              View All Tasks
            </button>
          </div>
        </div>

        {/* Right Column: Recent Activity (span 8 / 12) */}
        <div className="lg:col-span-8 bg-white border-2 border-slate-900 p-6 rounded-3xl flex flex-col h-[480px] shadow-[6px_6px_0px_0px_#0f172a] hover:-translate-y-0.5 transition-all">
          <div className="mb-4 border-b-2 border-slate-900 pb-3">
            <h3 className="font-display text-xl font-bold text-slate-900">Recent Activity</h3>
            <p className="text-xs text-slate-500 font-medium mt-1">Real-time collaboration feed from hiring team leads</p>
          </div>

          <div className="flex-1 overflow-y-auto space-y-6 pr-1">
            {activities.map((activity) => (
              <div key={activity.id} className="flex gap-4 items-start border-b border-dashed border-slate-100 pb-4 last:border-0 last:pb-0">
                <div className="relative shrink-0 mt-1">
                  {activity.userAvatar ? (
                    <img
                      src={activity.userAvatar}
                      alt={activity.user}
                      className="w-10 h-10 rounded-2xl object-cover border-2 border-slate-900"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-2xl bg-slate-900 text-white flex items-center justify-center text-xs font-extrabold border-2 border-slate-900">
                      {activity.user.substring(0, 2).toUpperCase()}
                    </div>
                  )}
                  {activity.badge && (
                    <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-300 border border-slate-900 rounded-full flex items-center justify-center text-[8px]" />
                  )}
                </div>

                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs text-slate-900 font-semibold font-sans">
                      <span className="font-bold text-slate-900 bg-amber-100 border border-slate-900 px-1 py-0.5 rounded text-[11px] mr-1.5">{activity.user}</span> {activity.action}{' '}
                      <span className="text-indigo-700 font-bold">{activity.target}</span>
                    </p>
                    <span className="text-[10px] text-slate-400 font-mono font-medium">{activity.time}</span>
                  </div>

                  {/* Badges/States matching feed */}
                  {activity.badge && (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 border border-slate-900 text-slate-900 text-[10px] font-bold font-mono">
                      ★ {activity.badge}
                    </div>
                  )}

                  {/* Multi-line highlights/quotes matching Screenshot 2 */}
                  {activity.quote && (
                    <div className="border-l-4 border-slate-900 pl-4 py-2 bg-slate-50 rounded-r-xl max-w-full">
                      <p className="text-xs italic text-slate-700 leading-relaxed font-sans pr-2">
                        "{activity.quote}"
                      </p>
                    </div>
                  )}

                  {activity.meta && (
                    <div className="flex items-center gap-2 py-1 px-3 bg-[#f3f4f6] rounded-xl text-xs font-mono font-medium text-slate-700 border border-slate-300 w-fit">
                      {activity.meta}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Grid: Top Talent Spotlight */}
      <section className="space-y-4" id="top-talent-spotlight-section">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-display text-2xl font-black text-slate-900">Top Talent Spotlight</h3>
            <p className="text-xs text-slate-500 font-medium mt-1">Highly-evaluated candidates pending interview loops</p>
          </div>
          {/* Slider controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => alert('Scrolling list back')}
              className="p-2 border-2 border-slate-900 bg-white rounded-xl shadow-[2px_2px_0px_0px_#0f172a] active:translate-y-0.5 transition-all cursor-pointer text-slate-900 hover:bg-slate-50"
            >
              <ChevronRight className="w-4 h-4 rotate-180" />
            </button>
            <button
              onClick={() => alert('Scrolling list forward')}
              className="p-2 border-2 border-slate-900 bg-white rounded-xl shadow-[2px_2px_0px_0px_#0f172a] active:translate-y-0.5 transition-all cursor-pointer text-slate-900 hover:bg-slate-50"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Spotlight Cards Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {candidates.slice(0, 3).map((candidate) => (
            <div
              key={candidate.id}
              className="bg-white border-2 border-slate-900 hover:border-slate-950 rounded-3xl flex flex-col justify-between overflow-hidden shadow-[4px_4px_0px_0px_#0f172a] hover:-translate-y-1 hover:shadow-[7px_7px_0px_0px_#0f172a] transition-all duration-200 relative group"
            >
              {/* Star Rating Badge perfectly aligned */}
              <div className="absolute top-4 right-4 bg-amber-200 border-2 border-slate-900 p-1 px-3 rounded-full flex items-center gap-1 shadow-[2px_2px_0px_0px_#0f172a]">
                <span className="text-amber-700 text-xs">★</span>
                <span className="text-slate-900 font-mono font-bold text-[11px] tracking-tight">{candidate.rating}</span>
              </div>

              {/* Card Body */}
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <img
                    src={candidate.avatar}
                    alt={candidate.name}
                    className="w-14 h-14 rounded-2xl object-cover border-2 border-slate-900"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="font-display font-extrabold text-slate-900 text-base group-hover:underline">
                      {candidate.name}
                    </h4>
                    <p className="text-[11px] font-semibold text-slate-500 mt-1 uppercase tracking-wider font-mono">
                      {candidate.title.split('•')[0]} ({candidate.experience})
                    </p>
                  </div>
                </div>

                {/* Candidate tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {candidate.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 bg-sky-50 border border-slate-900 text-slate-900 text-[10px] font-bold font-mono rounded-lg"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer actions */}
              <div className="px-6 pb-6 pt-4 border-t-2 border-slate-900 bg-slate-50/60 flex items-center gap-2">
                <button
                  onClick={() => onSelectCandidate(candidate.id)}
                  id={`review-btn-${candidate.id}`}
                  className="flex-1 text-center py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-black text-xs uppercase tracking-wider font-mono rounded-xl border-2 border-slate-900 active:translate-y-0.5 transition-all cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                >
                  Review
                </button>
                <button
                  onClick={() => alert(`Inquiry mail sent to: ${candidate.email}`)}
                  className="p-2.5 border-2 border-slate-900 hover:bg-white rounded-xl text-slate-900 transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5 cursor-pointer bg-white"
                  title="Contact candidate"
                >
                  <MessageSquare className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
