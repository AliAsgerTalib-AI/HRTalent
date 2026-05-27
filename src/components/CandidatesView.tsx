import React, { useState } from 'react';
import { ChevronRight, ArrowLeft, Star, Mail, MapPin, DollarSign, Calendar, Sliders, ExternalLink, Archive, Check, ThumbsUp, Trash2, Plus, ThumbsDown } from 'lucide-react';
import { Candidate, Job } from '../types';

interface CandidatesViewProps {
  candidates: Candidate[];
  jobs: Job[];
  onUpdateCandidate: (updated: Candidate) => void;
  selectedCandidateId: string | null;
  onClearSelectedCandidate: () => void;
  onSelectCandidate: (candidateId: string) => void;
}

export function CandidatesView({
  candidates,
  jobs,
  onUpdateCandidate,
  selectedCandidateId,
  onClearSelectedCandidate,
  onSelectCandidate,
}: CandidatesViewProps) {
  // Tabs within single dossier
  const [activeTab, setActiveTab] = useState<'resume' | 'notes' | 'portfolio' | 'history'>('resume');

  // New feedback comment fields
  const [newCommentText, setNewCommentText] = useState('');
  const [feedbackRating, setFeedbackRating] = useState<'Strong Hire' | 'Hire' | 'Weak Hire' | 'No Hire'>('Strong Hire');

  // Search/filter states for List Mode
  const [searchTerm, setSearchTerm] = useState('');
  const [stageFilter, setStageFilter] = useState<string>('All');

  // Find currently evaluated candidate
  const candidate = candidates.find((c) => c.id === selectedCandidateId) || null;

  // Add Comment/Feedback inside evaluative dossier
  const handleAddFeedback = () => {
    if (!newCommentText.trim() || !candidate) return;

    const newComment = {
      id: `comment-${Date.now()}`,
      user: 'Sarah Jenkins',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
      role: 'Lead Recruiter',
      text: newCommentText,
      rating: feedbackRating,
      time: 'Just now',
    };

    const newTimelineItem = {
      id: `timeline-${Date.now()}`,
      event: `Feedback Submitted: ${feedbackRating}`,
      user: 'Sarah Jenkins',
      time: 'Just now',
      type: 'feedback' as const,
      details: newCommentText,
    };

    const updatedCandidate: Candidate = {
      ...candidate,
      comments: [newComment, ...candidate.comments],
      timeline: [newTimelineItem, ...candidate.timeline],
    };

    onUpdateCandidate(updatedCandidate);
    setNewCommentText('');
    alert('Feedback comments dynamically updated and saved to localStorage settings!');
  };

  // Move candidate through pipeline stages
  const handleTransitionStage = (nextStage: typeof candidate.stage) => {
    if (!candidate) return;

    const newTimelineItem = {
      id: `timeline-st-${Date.now()}`,
      event: `Moved to ${nextStage} Stage`,
      user: 'Sarah Jenkins',
      time: 'Just now',
      type: 'status' as const,
    };

    const updatedCandidate: Candidate = {
      ...candidate,
      stage: nextStage,
      timeline: [newTimelineItem, ...candidate.timeline],
    };

    onUpdateCandidate(updatedCandidate);
    alert(`Pipeline updated! ${candidate.name} is now in the ${nextStage} loop.`);
  };

  // Score validation helper
  const handleScoreChange = (factor: 'technical' | 'design' | 'culture', val: number) => {
    if (!candidate) return;
    const updatedScorecard = {
      ...candidate.scorecard,
      [factor]: parseFloat(Math.min(5.0, Math.max(0, val)).toFixed(1)),
    };
    onUpdateCandidate({
      ...candidate,
      scorecard: updatedScorecard,
    });
  };

  // Filtered List
  const filteredCandidates = candidates.filter((cand) => {
    const matchesSearch = cand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          cand.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          cand.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStage = stageFilter === 'All' || cand.stage === stageFilter;
    return matchesSearch && matchesStage;
  });

  return (
    <div className="flex-1 overflow-y-auto bg-[#faf9f5]" id="candidates-workspace-view">
      {candidate ? (
        /* ================= EVALUATOR DOSSIER MODE ================= */
        <div className="p-8 max-w-7xl mx-auto space-y-6" id="candidate-dossier-full">
          
          {/* Back Trigger and Navigation breadcrumbs */}
          <div className="flex items-center justify-between border-b-2 border-slate-900 pb-4">
            <button
              onClick={onClearSelectedCandidate}
              className="flex items-center gap-2 group text-xs font-bold font-mono tracking-wider bg-white px-4 py-2 border-2 border-slate-900 rounded-2xl hover:bg-slate-50 transition shadow-[2px_2px_0px_0px_#000] active:translate-y-0.5 active:shadow-[1px_1px_0px_0px_#000] shrink-0"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Candidates</span>
            </button>
            <div className="text-right text-xs text-slate-500 font-mono leading-relaxed select-none">
              Jobs / <span className="text-slate-900 font-bold">{candidate.jobTitle}</span> / Candidate Profile
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Content Matrix (span 8 of 12) */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Primary Profile Spotlight Card */}
              <div className="bg-white border-2 border-slate-900 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center gap-6 relative shadow-[6px_6px_0px_0px_#0f172a] hover:-translate-y-0.5 hover:shadow-[8px_8px_0px_0px_#0f172a] transition-all">
                {/* Image */}
                <img
                  src={candidate.avatar}
                  alt={candidate.name}
                  className="w-24 h-24 rounded-2xl object-cover border-2 border-slate-900 shrink-0"
                  referrerPolicy="no-referrer"
                />

                <div className="flex-1 space-y-2 min-w-0">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h2 className="font-display text-3xl font-black text-slate-900 tracking-tight truncate">
                      {candidate.name}
                    </h2>
                    {/* Top match badge */}
                    <span className="px-3 py-0.5 rounded-full bg-emerald-100 border border-slate-900 text-slate-900 text-[10px] font-bold font-mono tracking-wide uppercase">
                      Top 1% Match
                    </span>
                  </div>

                  <p className="font-sans text-sm font-bold text-slate-600">
                    {candidate.title}
                  </p>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5 text-xs text-slate-500 md:items-center border-t border-slate-200 pt-3 mt-1 font-mono">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                      <span className="text-slate-905 font-black">{candidate.rating}</span>
                      <span>/ 5.0</span>
                    </div>
                    <div className="flex items-center gap-1 truncate">
                      <MapPin className="w-4 h-4 text-slate-900" />
                      <span className="font-bold text-slate-700">{candidate.location}</span>
                    </div>
                    <div className="flex items-center gap-1 col-span-2 md:col-span-1 truncate">
                      <Mail className="w-4 h-4 text-slate-900" />
                      <span className="font-bold text-slate-700">{candidate.email}</span>
                    </div>
                  </div>

                  {/* Badges/Tags */}
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {candidate.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 bg-[#eff6ff] border border-slate-900 text-slate-905 text-[10px] font-mono font-bold rounded-lg"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Expected salary tags at the right panel */}
                <div className="md:border-l-2 md:border-slate-900 md:pl-6 shrink-0 flex flex-col items-start justify-center md:h-24">
                  <span className="text-[10px] font-extrabold font-mono uppercase tracking-wider text-slate-400">Expected Salary</span>
                  <p className="text-2xl font-black tracking-tight text-slate-900 mt-1.5 bg-[#fef3c7] border border-slate-900 px-3 py-1 rounded-lg shadow-[2px_2px_0px_0px_#000]">{candidate.expectedSalary}</p>
                </div>
              </div>

              {/* Progress Stepper Stages */}
              <div className="bg-white border-2 border-slate-900 p-6 rounded-3xl shadow-[6px_6px_0px_0px_#0f172a] space-y-4">
                <h3 className="text-xs font-extrabold font-mono text-slate-400 uppercase tracking-wider">Evaluation Pipeline</h3>
                
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-2">
                  {[
                    { label: 'Applied', date: 'Oct 12', checked: true },
                    { label: 'Phone Screen', date: 'Oct 15', checked: true },
                    { label: 'Interview', date: 'In Progress', active: true },
                    { label: 'Offer', date: 'Pending', inactive: true },
                  ].map((step, idx) => {
                    const isPassed = step.checked;
                    const isActive = step.active;
                    return (
                      <div key={idx} className="flex-1 flex flex-col items-center relative w-full">
                        {/* Connecting Line */}
                        {idx > 0 && (
                          <div className={`hidden md:block absolute left-0 right-1/2 top-4.5 h-1 -translate-x-1/2 -z-0 ${
                            isPassed || isActive ? 'bg-slate-900' : 'bg-slate-200'
                          }`} />
                        )}

                        {idx < 3 && (
                          <div className={`hidden md:block absolute left-1/2 right-0 top-4.5 h-1 translate-x-1/2 -z-0 ${
                            isPassed ? 'bg-slate-900' : 'bg-slate-200'
                          }`} />
                        )}

                        {/* Interactive circle indicator */}
                        <div className={`w-9 h-9 rounded-xl border-2 flex items-center justify-center font-mono font-black text-xs relative z-10 transition shadow-[2px_2px_0px_0px_#0f172a] ${
                          isPassed ? 'bg-slate-900 text-white border-slate-900 shadow-none' :
                          isActive ? 'bg-amber-200 text-slate-900 border-slate-900' :
                          'bg-slate-50 text-slate-400 border-slate-200 shadow-none'
                        }`}>
                          {isPassed ? '✓' : idx + 1}
                        </div>

                        <div className="text-center mt-3">
                          <p className="text-xs font-black text-slate-900">{step.label}</p>
                          <p className="text-[10px] text-slate-400 font-mono font-bold uppercase mt-1">{step.date}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Tab menu & Rich evaluative output panels */}
              <div className="bg-white border-2 border-slate-900 rounded-3xl overflow-hidden shadow-[6px_6px_0px_0px_#0f172a]">
                {/* Nested menu */}
                <div className="flex border-b-2 border-slate-900 bg-[#eff6ff] px-6">
                  {[
                    { id: 'resume', label: 'Resume' },
                    { id: 'notes', label: 'Interview Notes' },
                    { id: 'portfolio', label: 'Portfolio' },
                    { id: 'history', label: 'Communication History' },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`py-4 px-4 font-display font-black text-xs mr-2 transition-all cursor-pointer ${
                        activeTab === tab.id
                          ? 'text-slate-900 pb-[14px] border-b-4 border-slate-905'
                          : 'text-slate-500 hover:text-slate-900'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Living Output Panel */}
                <div className="p-8">
                  {activeTab === 'resume' && (
                    <div className="space-y-6 leading-relaxed">
                      <div className="space-y-2">
                        <h4 className="text-xs font-black font-mono tracking-wider text-slate-400 uppercase">Professional Summary</h4>
                        <p className="text-sm text-slate-800 leading-relaxed font-sans">{candidate.resume.summary}</p>
                      </div>

                      <div className="space-y-4 border-t-2 border-slate-100 pt-6">
                        <h4 className="text-xs font-black font-mono tracking-wider text-slate-400 uppercase mb-3">Work Experience</h4>
                        {candidate.resume.experience.map((exp, idx) => (
                          <div key={idx} className="space-y-2 relative group bg-[#fafafa] border-2 border-slate-900 p-4 rounded-2xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                            <div className="flex flex-wrap justify-between items-center gap-2">
                              <h5 className="text-sm font-black text-slate-900">
                                {exp.role} <span className="text-slate-400 font-normal">—</span> <span className="text-indigo-707 bg-indigo-50 border border-slate-300 px-1.5 py-0.5 rounded text-xs">{exp.company}</span>
                              </h5>
                              <span className="text-[10px] text-slate-400 font-mono font-extrabold uppercase bg-white border border-slate-300 px-1.5 py-0.5 rounded">{exp.period}</span>
                            </div>
                            <ul className="list-disc pl-5 mt-2 space-y-1.5">
                              {exp.highlights.map((h, i) => (
                                <li key={i} className="text-xs text-slate-707 font-medium">{h}</li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === 'notes' && (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between border-b pb-3 mb-4">
                        <h4 className="text-xs font-black font-mono tracking-wider text-slate-400 uppercase">Interview Notes & Feedback</h4>
                        <span className="text-[10px] font-mono text-slate-400 font-bold uppercase">Add review score below</span>
                      </div>

                      {/* Comment submission form */}
                      <div className="bg-[#fffbeb] p-5 rounded-2xl border-2 border-slate-900 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] space-y-4">
                        <span className="text-[10px] font-extrabold font-mono text-slate-900 uppercase tracking-wider block">Add Evaluator Review</span>
                        <textarea
                          rows={3}
                          placeholder="Elena has exceptional visual design system credentials..."
                          value={newCommentText}
                          onChange={(e) => setNewCommentText(e.target.value)}
                          className="w-full px-3 py-2 border-2 border-slate-900 bg-white rounded-xl text-xs"
                        />
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-extrabold font-mono text-slate-900">Rating:</span>
                            <select
                              value={feedbackRating}
                              onChange={(e) => setFeedbackRating(e.target.value as any)}
                              className="text-xs font-bold border-2 border-slate-900 rounded-lg px-2.5 py-1.5 bg-white"
                            >
                              <option>Strong Hire</option>
                              <option>Hire</option>
                              <option>Weak Hire</option>
                              <option>No Hire</option>
                            </select>
                          </div>
                          <button
                            onClick={handleAddFeedback}
                            className="bg-slate-900 hover:bg-slate-800 text-white border-2 border-slate-950 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider font-mono shadow-[2px_2px_0px_0px_#000] active:translate-y-0.5 cursor-pointer"
                          >
                            Submit
                          </button>
                        </div>
                      </div>

                      <div className="space-y-4 mt-6">
                        {candidate.comments.map((comment) => (
                          <div key={comment.id} className="bg-white border-2 border-slate-900 rounded-2xl p-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] space-y-2.5">
                            <div className="flex items-center justify-between border-b border-dashed border-slate-100 pb-2">
                              <div className="flex items-center gap-2">
                                <img
                                  src={comment.avatar}
                                  alt={comment.user}
                                  className="w-8 h-8 rounded-full object-cover border-2 border-slate-900"
                                  referrerPolicy="no-referrer"
                                />
                                <div className="leading-tight">
                                  <span className="text-xs font-black text-slate-900 block">{comment.user}</span>
                                  <span className="text-[9px] text-slate-400 font-mono font-bold uppercase block">{comment.role}</span>
                                </div>
                              </div>
                              <span className="px-2.5 py-1 bg-emerald-100 border border-slate-900 text-slate-900 text-[9px] font-mono font-extrabold rounded-lg uppercase">
                                {comment.rating}
                              </span>
                            </div>
                            <p className="text-xs text-slate-705 leading-relaxed italic">"{comment.text}"</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === 'portfolio' && (
                    <div className="text-center p-12 text-slate-500 space-y-4 bg-[#eff6ff] border-2 border-slate-900 rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                      <div className="w-16 h-16 bg-white border-2 border-slate-900 rounded-2xl flex items-center justify-center text-slate-950 mx-auto shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                        <ExternalLink className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-base font-black text-slate-900">Candidate Design Portfolio</p>
                        <p className="text-xs text-slate-500 mt-1">SaaS Interface Layout Design, Custom Tokens & Live Components.</p>
                      </div>
                      <button
                        onClick={() => alert(`Opening mock portfolio workspace URL: https://design.portfolio/${candidate.name.split(' ')[0].toLowerCase()}`)}
                        className="px-5 py-2.5 bg-slate-900 border-2 border-slate-950 text-white text-xs font-black uppercase tracking-wider font-mono rounded-xl hover:bg-slate-800 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5 cursor-pointer"
                      >
                        Launch Link
                      </button>
                    </div>
                  )}

                  {activeTab === 'history' && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between border-b pb-2">
                        <h4 className="text-xs font-black font-mono tracking-wider text-slate-400 uppercase">Communication Log</h4>
                        <span className="text-[10px] text-slate-400 font-mono font-bold uppercase">Direct Mail syncing active</span>
                      </div>
                      <div className="space-y-3">
                        <div className="p-4 border-2 border-slate-900 rounded-2xl space-y-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] bg-white">
                          <div className="flex justify-between items-center">
                            <span className="text-xs font-black text-slate-900">Subject: Technical Interview Invitation</span>
                            <span className="text-[10px] text-slate-400 font-mono uppercase font-bold">Yesterday</span>
                          </div>
                          <p className="text-xs text-slate-650">Mail successfully pushed to inbox: <span className="font-mono bg-slate-100 p-0.5 rounded text-[11px] text-indigo-700">{candidate.email}</span></p>
                        </div>
                        <div className="p-4 border-2 border-slate-900 rounded-2xl space-y-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] bg-white">
                          <div className="flex justify-between items-center">
                            <span className="text-xs font-black text-slate-900">Subject: Portfolio Review Completed</span>
                            <span className="text-[10px] text-slate-400 font-mono uppercase font-bold text-slate-500">Oct 14</span>
                          </div>
                          <p className="text-xs text-slate-650">Automated pipeline notification dispatched to candidate dashboard.</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Side Control Bar (span 4 of 12) */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Pipeline Actions Card */}
              <div className="bg-white border-2 border-slate-900 p-6 rounded-3xl space-y-4 shadow-[6px_6px_0px_0px_#0f172a] hover:-translate-y-0.5 transition-all">
                <h3 className="text-xs font-extrabold font-mono text-slate-400 uppercase tracking-wider border-b-2 border-slate-900 pb-2">Pipeline Actions</h3>

                <button
                  onClick={() => handleTransitionStage('Interview')}
                  className="w-full flex items-center justify-center gap-2.5 px-4 py-3 bg-[#6cf8bb] border-2 border-slate-900 text-slate-900 rounded-xl text-xs font-black uppercase tracking-wider font-mono shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5 active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer"
                >
                  <span>Pass to Next Stage</span>
                </button>

                <button
                  onClick={() => {
                    const d = prompt('Schedule Interview date & time:', 'Oct 18, 2023 at 2:00 PM');
                    if (d) {
                      const updated = {
                        ...candidate,
                        timeline: [
                          { id: `t-sch-${Date.now()}`, event: `Interview Scheduled: ${d}`, user: 'Sarah Jenkins', time: 'Just now', type: 'status' as const },
                          ...candidate.timeline
                        ]
                      };
                      onUpdateCandidate(updated);
                      alert('Interview date updated on central calendar!');
                    }
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-slate-900 text-slate-905 bg-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5 hover:bg-slate-50"
                >
                  <Calendar className="w-4.5 h-4.5 text-slate-700 shrink-0" />
                  <span>Schedule Loop</span>
                </button>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <button
                    onClick={() => handleTransitionStage('Rejected')}
                    className="py-2.5 border-2 border-rose-905 text-rose-800 bg-rose-50 hover:bg-rose-100 rounded-xl text-xs font-black uppercase tracking-wider font-mono shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5 transition cursor-pointer"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => handleTransitionStage('Hold')}
                    className="py-2.5 border-2 border-slate-900 text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl text-xs font-black uppercase tracking-wider font-mono shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5 transition cursor-pointer"
                  >
                    Hold
                  </button>
                </div>
              </div>

              {/* Scorecard Summary Card */}
              <div className="bg-white border-2 border-slate-900 p-6 rounded-3xl space-y-4 shadow-[6px_6px_0px_0px_#0f172a] hover:-translate-y-0.5 transition-all">
                <div className="flex items-center justify-between border-b-2 border-slate-900 pb-2">
                  <h3 className="text-xs font-extrabold font-mono text-slate-400 uppercase tracking-wider">Scorecard</h3>
                  <button
                    onClick={() => {
                      const factor = prompt('Which factor to adjust (technical, design, culture)?', 'technical') as any;
                      if (!['technical', 'design', 'culture'].includes(factor)) return;
                      const score = Number(prompt('Enter score (0.0 to 5.0):', '4.5'));
                      if (!isNaN(score)) {
                        handleScoreChange(factor, score);
                      }
                    }}
                    className="text-[10px] text-slate-450 hover:text-slate-900 font-extrabold uppercase tracking-wider font-mono cursor-pointer"
                    id="candidates-scorecard-edit-btn"
                  >
                    Manage
                  </button>
                </div>

                <div className="space-y-4">
                  {[
                    { factor: 'technical' as const, label: 'Technical Score', score: candidate.scorecard.technical },
                    { factor: 'design' as const, label: 'Design Score', score: candidate.scorecard.design },
                    { factor: 'culture' as const, label: 'Culture Score', score: candidate.scorecard.culture },
                  ].map((item) => {
                    const percent = (item.score / 5.0) * 100;
                    return (
                      <div key={item.factor} className="space-y-1.5">
                        <div className="flex justify-between text-xs">
                          <span className="font-extrabold text-slate-900">{item.label}</span>
                          <span className="font-bold font-mono text-slate-900 bg-amber-100 border border-slate-900 px-1.5 py-0.5 rounded text-[11px] shadow-[1px_1px_0px_0px_#000]">{item.score.toFixed(1)} / 5.0</span>
                        </div>
                        {/* Custom progress indicator */}
                        <div className="w-full bg-slate-100 border border-slate-900 h-2.5 rounded-full overflow-hidden">
                          <div
                            className="bg-slate-900 h-2 rounded-full"
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Dossier Timeline Activity Card */}
              <div className="bg-white border-2 border-slate-900 p-6 rounded-3xl space-y-4 shadow-[6px_6px_0px_0px_#0f172a] hover:-translate-y-0.5 transition-all">
                <h3 className="text-xs font-extrabold font-mono text-slate-400 uppercase tracking-wider border-b-2 border-slate-900 pb-2">Timeline</h3>
                
                <div className="space-y-4 relative pl-4 border-l-2 border-slate-900">
                  {candidate.timeline.map((event) => (
                    <div key={event.id} className="relative space-y-1">
                      {/* Dot icon */}
                      <span className="w-3 h-3 bg-amber-250 border-2 border-slate-900 rounded-xl absolute -left-[22.5px] top-1" />
                      <div className="leading-tight">
                        <p className="text-xs font-bold text-slate-900">{event.event}</p>
                        <p className="text-[10px] text-slate-400 font-mono font-bold uppercase mt-0.5">by {event.user} • {event.time}</p>
                      </div>
                      {event.details && (
                        <p className="text-[11px] text-slate-600 italic leading-relaxed pl-2 border-l border-slate-300">
                          {event.details}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Hiring Team Card */}
              <div className="bg-white border-2 border-slate-900 p-6 rounded-3xl space-y-4 shadow-[6px_6px_0px_0px_#0f172a] hover:-translate-y-0.5 transition-all">
                <h3 className="text-xs font-extrabold font-mono text-slate-400 uppercase tracking-wider border-b-2 border-slate-900 pb-2">Hiring Team</h3>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center -space-x-2.5 overflow-hidden">
                    {[
                      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
                      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150',
                      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150'
                    ].map((avatar, idx) => (
                      <img
                        key={idx}
                        className="inline-block h-9.5 w-9.5 rounded-2xl ring-2 ring-slate-900 object-cover border border-slate-950"
                        src={avatar}
                        alt="Teammember"
                        referrerPolicy="no-referrer"
                      />
                    ))}
                    <div className="inline-flex h-9.5 w-9.5 items-center justify-center rounded-2xl bg-slate-900 text-[10px] font-black font-mono text-white ring-2 ring-slate-900 border border-slate-950">
                      +2
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      const name = prompt('Enter reviewer name to add:');
                      if (name) alert(`Reviewer permission dispatched to ${name}!`);
                    }}
                    className="flex items-center gap-1.5 py-2 px-3 border-2 border-slate-900 bg-white hover:bg-slate-50 rounded-xl text-[10px] uppercase font-mono tracking-wider font-extrabold text-slate-705 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Reviewer</span>
                  </button>
                </div>
              </div>

            </div>

          </div>

        </div>
      ) : (
        /* ================= STANDARD LIST MODE ================= */
        <div className="p-8 max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b-2 border-slate-900 pb-5">
            <div>
              <h2 className="font-display text-3xl font-black text-slate-900">Candidates Board</h2>
              <p className="text-xs text-slate-500 font-semibold mt-1">
                Evaluate scores, screen resume parameters, and trigger pipeline transitions.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
              {/* Direct search */}
              <input
                type="text"
                placeholder="Search candidates, skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-2.5 bg-white border-2 border-slate-900 rounded-xl text-xs font-bold placeholder-slate-400 w-full sm:w-64"
              />

              {/* Status stepper */}
              <select
                value={stageFilter}
                onChange={(e) => setStageFilter(e.target.value)}
                className="px-4 py-2.5 bg-white border-2 border-slate-900 rounded-xl text-xs font-black"
              >
                <option value="All">All Stages</option>
                <option value="Applied">Applied</option>
                <option value="Phone Screen">Phone Screen</option>
                <option value="Interview">Interview</option>
                <option value="Offer">Offer</option>
              </select>
            </div>
          </div>

          {/* Grid matching Spotlight */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCandidates.map((cand) => (
              <div
                key={cand.id}
                onClick={() => onSelectCandidate(cand.id)}
                className="bg-white border-2 border-slate-900 hover:border-slate-950 rounded-3xl flex flex-col justify-between overflow-hidden shadow-[4px_4px_0px_0px_#0f172a] hover:-translate-y-1 hover:shadow-[7px_7px_0px_0px_#0f172a] transition duration-150 cursor-pointer relative"
              >
                {/* Rating Badge */}
                <div className="absolute top-4 right-4 bg-amber-100 border-2 border-slate-900 p-1 px-2.5 rounded-full flex items-center gap-1 shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span className="text-slate-900 font-mono font-black text-[10px] leading-none">{cand.rating}</span>
                </div>

                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-3.5">
                    <img
                      src={cand.avatar}
                      alt={cand.name}
                      className="w-13 h-13 rounded-2xl object-cover border-2 border-slate-900"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h4 className="font-display font-extrabold text-slate-900 text-base">
                        {cand.name}
                      </h4>
                      <p className="text-[10px] text-slate-500 mt-1 font-mono font-bold uppercase">
                        For <span className="text-indigo-700 bg-indigo-50 border border-slate-300 px-1 py-0.5 rounded text-[9.5px]">{cand.jobTitle.split('•')[0]}</span>
                      </p>
                    </div>
                  </div>

                  {/* Summary excerpt */}
                  <p className="text-xs text-slate-650 line-clamp-2 leading-relaxed font-sans font-medium">
                    {cand.resume.summary}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {cand.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 bg-slate-100 border border-slate-300 text-slate-800 text-[9px] font-mono font-bold rounded-lg"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Stage state Footer details */}
                <div className="px-6 py-4.5 border-t-2 border-slate-900 bg-slate-50/60 flex justify-between items-center text-[11px] font-mono">
                  <span className="text-slate-500 font-extrabold uppercase text-[10px]">Current Stage:</span>
                  <span className="px-2.5 py-1 rounded-full bg-slate-900 text-white text-[9px] font-mono font-black uppercase border border-slate-950 shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]">
                    {cand.stage}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
