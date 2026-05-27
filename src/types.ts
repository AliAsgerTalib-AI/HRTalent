export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  salaryMin: number;
  salaryMax: number;
  type: string; // Full-time, Contract, Part-time, Remote
  status: 'Active' | 'Draft' | 'Closed';
  hiringManager: string;
  hiringManagerAvatar?: string;
  appsCount: number;
  health: 'On Track' | 'Needs Attention' | 'Draft' | 'Off Track';
  description: string;
  channels: {
    linkedIn: boolean;
    indeed: boolean;
    glassdoor: boolean;
    internal: boolean;
  };
  recruiter: string;
  postedAt: string; // e.g. "3 days ago"
}

export interface Candidate {
  id: string;
  name: string;
  title: string;
  rating: number;
  experience: string; // e.g. "8+ Years"
  location: string;
  email: string;
  avatar: string;
  tags: string[];
  stage: 'Applied' | 'Phone Screen' | 'Interview' | 'Offer' | 'Rejected' | 'Hold';
  appliedDate: string; // e.g. "Oct 12"
  jobId: string;
  jobTitle: string;
  expectedSalary: string;
  resume: {
    summary: string;
    experience: Array<{
      role: string;
      company: string;
      period: string;
      highlights: string[];
    }>;
  };
  scorecard: {
    technical: number;
    design: number;
    culture: number;
  };
  timeline: Array<{
    id: string;
    event: string;
    user: string;
    time: string;
    type: 'status' | 'feedback' | 'note';
    details?: string;
  }>;
  comments: Array<{
    id: string;
    user: string;
    avatar: string;
    role: string;
    text: string;
    rating?: string; // e.g., "Strong Hire", "Week Hire"
    time: string;
  }>;
}

export interface Task {
  id: string;
  title: string;
  type: 'review' | 'offer' | 'plan';
  target: string; // "Senior Designer - UX/UI"
  priority: 'High' | 'Medium' | 'Low';
}

export interface Activity {
  id: string;
  user: string;
  userAvatar?: string;
  action: string;
  target: string;
  time: string;
  badge?: string;
  badgeType?: 'success' | 'warning' | 'info';
  quote?: string;
  meta?: string;
}

export interface RecruiterSettings {
  notificationsEnabled: boolean;
  emailDigest: boolean;
  autoPostLinkedIn: boolean;
  autoPostIndeed: boolean;
  supportStatus: 'Active' | 'Inactive';
  recruiterName: string;
  recruiterEmail: string;
  recruiterAvatar: string;
}
