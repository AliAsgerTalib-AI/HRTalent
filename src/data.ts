import { Job, Candidate, Task, Activity, RecruiterSettings } from './types';

export const INITIAL_SETTINGS: RecruiterSettings = {
  notificationsEnabled: true,
  emailDigest: true,
  autoPostLinkedIn: true,
  autoPostIndeed: false,
  supportStatus: 'Active',
  recruiterName: 'Sarah Jenkins',
  recruiterEmail: 'sarah.j@talentflow.co',
  recruiterAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
};

export const INITIAL_JOBS: Job[] = [
  {
    id: 'job-1',
    title: 'Senior Software Engineer',
    department: 'Engineering',
    location: 'Remote',
    salaryMin: 140000,
    salaryMax: 180000,
    type: 'Full-time',
    status: 'Active',
    hiringManager: 'Jane Doe',
    hiringManagerAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150',
    appsCount: 42,
    health: 'On Track',
    recruiter: 'Sarah Jenkins',
    postedAt: '3 days ago',
    channels: {
      linkedIn: true,
      indeed: true,
      glassdoor: false,
      internal: true,
    },
    description: `We are looking for a highly skilled Senior Software Engineer to join our growing core platform team. This role requires extensive experience building scalable, distributed cloud systems, React/TypeScript frontends, and a deep passion for writing clean, tested code.

Key Responsibilities:
- Lead architectural discussions and frontend/backend tech selections.
- Build resilient restful and GraphQL APIs using Node.js or similar environments.
- Mentor junior team members through thoughtful code reviews and interactive technical sessions.
- Collaborate with cross-functional teams to outline product roadmap milestones.`,
  },
  {
    id: 'job-2',
    title: 'Product Designer',
    department: 'Design',
    location: 'New York, NY',
    salaryMin: 130000,
    salaryMax: 170000,
    type: 'Full-time',
    status: 'Active',
    hiringManager: 'Alex Smith',
    hiringManagerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
    appsCount: 18,
    health: 'Needs Attention',
    recruiter: 'Sarah Jenkins',
    postedAt: '1 week ago',
    channels: {
      linkedIn: false,
      indeed: false,
      glassdoor: true,
      internal: true,
    },
    description: `Lead the evolution of our "Efficient Authority" design system. You'll partner closely with engineering and product leaders to research, synthesize, and craft beautiful, data-dense web layouts for our modern recruitment suite user base.

Key Responsibilities:
- Design intuitive user journeys and stateful interaction diagrams for data-dense tables.
- Champion layout precision, micro-interactions, typography constraints, and accessibility guides.
- Execute clean Figma mockups and collaborate via Storybook inspection tools.`,
  },
  {
    id: 'job-3',
    title: 'Marketing Manager',
    department: 'Marketing',
    location: 'San Francisco, CA',
    salaryMin: 110000,
    salaryMax: 140000,
    type: 'Full-time',
    status: 'Draft',
    hiringManager: 'Rita Wang',
    hiringManagerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
    appsCount: 0,
    health: 'Draft',
    recruiter: 'Sarah Jenkins',
    postedAt: 'Created yesterday',
    channels: {
      linkedIn: true,
      indeed: true,
      glassdoor: false,
      internal: false,
    },
    description: `We are seeking an outstanding Marketing Manager to grow our organic B2B outreach and establish TalentFlow as a category leader in the recruiter intelligence tech market. You'll operate across search optimization, paid media, and industry event campaigns.

Key Responsibilities:
- Run high-performing outbound growth campaigns.
- Write compelling technical case studies and whitepapers for HR practitioners.
- Elevate our visual brand identity across digital social touchpoints.`,
  },
  {
    id: 'job-4',
    title: 'Technical Recruiter',
    department: 'Operations',
    location: 'London, UK',
    salaryMin: 90000,
    salaryMax: 120000,
    type: 'Contract',
    status: 'Active',
    hiringManager: 'Marcus Thorne',
    hiringManagerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150',
    appsCount: 11,
    health: 'On Track',
    recruiter: 'Sarah Jenkins',
    postedAt: '5 days ago',
    channels: {
      linkedIn: true,
      indeed: false,
      glassdoor: false,
      internal: true,
    },
    description: `We're eating our own dog food! Join our internal recruitment team as a Technical Recruiter to help us scale from 100 to 500 people globally using TalentFlow's own suite of recruitment tools.

Key Responsibilities:
- Source high-caliber engineering talent on alternative networks and via GitHub profiles.
- Guide candidates through an empathetic, clear, and high-velocity recruitment run.
- Keep system feedback scores pristine and maintain close alignment with hiring managers.`,
  }
];

export const INITIAL_CANDIDATES: Candidate[] = [
  {
    id: 'cand-1',
    name: 'Elena Rodriguez',
    title: 'Senior Product Designer & UX Strategist',
    rating: 4.9,
    experience: '8+ Years',
    location: 'San Francisco, CA (Remote)',
    email: 'elena.r@design.com',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150',
    tags: ['Figma', 'React', 'UX Research', 'Design Systems'],
    stage: 'Interview',
    appliedDate: 'Oct 12',
    jobId: 'job-2',
    jobTitle: 'Product Designer',
    expectedSalary: '$165k - $180k',
    resume: {
      summary: 'Creative and detail-oriented Product Designer with 8+ years of experience in developing user-centric SaaS platforms. Expert in design systems, visual storytelling, and translating complex technical requirements into intuitive digital experiences.',
      experience: [
        {
          role: 'Principal Designer',
          company: 'CloudScale AI',
          period: '2020 - Present',
          highlights: [
            'Led the redesign of the core enterprise dashboard, resulting in a 40% increase in user efficiency.',
            'Developed and maintained the "Ethereal" Design System used by 5 product squads.',
            'Mentored a team of 4 junior and mid-level designers.'
          ]
        },
        {
          role: 'Senior UX Designer',
          company: 'FinFlow',
          period: '2017 - 2020',
          highlights: [
            'Spearheaded mobile-first payment experience for 2M+ active users.',
            'Conducted 50+ user research sessions to validate core feature roadmaps.'
          ]
        }
      ]
    },
    scorecard: {
      technical: 5.0,
      design: 4.8,
      culture: 4.5,
    },
    timeline: [
      {
        id: 'timeline-e-1',
        event: 'Moved to Interview Stage',
        user: 'Sarah Jenkins',
        time: '2 hours ago',
        type: 'status',
      },
      {
        id: 'timeline-e-2',
        event: 'Technical Interview Scheduled',
        user: 'Sarah Jenkins',
        time: 'Oct 16, 2023 • 10:00 AM',
        type: 'status',
      },
      {
        id: 'timeline-e-3',
        event: 'Feedback Submitted: Phone Screen',
        user: 'Marcus Chen',
        time: 'Oct 15, 2023',
        type: 'feedback',
        details: 'Elena demonstrated outstanding interaction modeling and system thinking. Strong hire recomendation for the next design iteration.'
      }
    ],
    comments: [
      {
        id: 'comment-e-1',
        user: 'Sarah Jenkins',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
        role: 'Lead Recruiter',
        text: 'Elena has incredible professional poise and immediately understood our Design requirements. Portfolio highlights extremely dense web architecture dashboards that look exceptionally modern and functional.',
        rating: 'Strong Hire',
        time: '2 hours ago'
      }
    ]
  },
  {
    id: 'cand-2',
    name: 'Marcus Chen',
    title: 'Senior Product Designer',
    rating: 4.9,
    experience: '8+ Years',
    location: 'Boston, MA',
    email: 'm.chen@designer.io',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150',
    tags: ['Figma', 'React', 'System Design'],
    stage: 'Applied',
    appliedDate: 'Yesterday',
    jobId: 'job-2',
    jobTitle: 'Product Designer',
    expectedSalary: '$160k - $175k',
    resume: {
      summary: 'Systems-focused designer bridging user interface structures and front-end engineering specifications. Champion of scalable visual patterns and component-driven production cycles.',
      experience: [
        {
          role: 'Senior Product Designer',
          company: 'DevFlow Suite',
          period: '2019 - Present',
          highlights: [
            'Crafted highly reactive visualization boards displaying multi-tenant analytics logs.',
            'Collaborated on atomic design frameworks directly integrating with React component libraries.'
          ]
        }
      ]
    },
    scorecard: {
      technical: 4.7,
      design: 4.9,
      culture: 4.4,
    },
    timeline: [
      {
        id: 't-mc-1',
        event: 'Applied to Product Designer',
        user: 'System Integration',
        time: 'Yesterday',
        type: 'status',
      }
    ],
    comments: []
  },
  {
    id: 'cand-3',
    name: 'Sophia Williams',
    title: 'Full Stack Engineer',
    rating: 4.8,
    experience: '5 Years',
    location: 'Austin, TX',
    email: 'sophia.williams@stackcode.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
    tags: ['Python', 'AWS', 'Docker', 'Node.js'],
    stage: 'Phone Screen',
    appliedDate: 'Oct 14',
    jobId: 'job-1',
    jobTitle: 'Senior Software Engineer',
    expectedSalary: '$150k - $165k',
    resume: {
      summary: 'Impactful Full Stack Engineer with a strong record in provisioning multi-region cloud applications, automating high-throughput pipelines, and assembling pixel-perfect customer interfaces.',
      experience: [
        {
          role: 'Full Stack Engineer',
          company: 'AppGrid LLC',
          period: '2021 - Present',
          highlights: [
            'Assembled cloud architectures yielding a 20% reduction in API response times across peak network hours.',
            'Engineered dynamic dashboards tracking metrics using SVG grids and client-side caching buffers.'
          ]
        }
      ]
    },
    scorecard: {
      technical: 4.8,
      design: 4.0,
      culture: 4.7,
    },
    timeline: [
      {
        id: 't-sw-1',
        event: 'Scheduled Phone Screen',
        user: 'Sarah Jenkins',
        time: 'Oct 14, 2023',
        type: 'status',
      }
    ],
    comments: []
  },
  {
    id: 'cand-4',
    name: 'David Miller',
    title: 'Senior Data Analyst',
    rating: 4.6,
    experience: '6 Years',
    location: 'Denver, CO',
    email: 'd.miller@analyticslabs.net',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=150',
    tags: ['SQL', 'Tableau', 'Machine Learning'],
    stage: 'Applied',
    appliedDate: 'Oct 10',
    jobId: 'job-1',
    jobTitle: 'Senior Software Engineer',
    expectedSalary: '$130k - $145k',
    resume: {
      summary: 'Rigorous analyst dedicated to surfacing predictive patterns, building interactive report matrices, and translating huge datasets into operational growth levers.',
      experience: [
        {
          role: 'Lead Analyst',
          company: 'MetricVantage Corp',
          period: '2020 - Present',
          highlights: [
            'Pioneered business intelligence clusters serving real-time analytics reports to executive boards.',
            'Collaborated with database nodes optimizing ingestion latency for structured streaming data pools.'
          ]
        }
      ]
    },
    scorecard: {
      technical: 4.6,
      design: 3.8,
      culture: 4.5,
    },
    timeline: [
      {
        id: 't-dm-1',
        event: 'Applied to Senior Software Engineer',
        user: 'System Integration',
        time: 'Oct 10, 2023',
        type: 'status',
      }
    ],
    comments: []
  }
];

export const INITIAL_TASKS: Task[] = [
  {
    id: 'task-1',
    title: 'Review 15 new candidates',
    type: 'review',
    target: 'Senior Designer - UX/UI',
    priority: 'High',
  },
  {
    id: 'task-2',
    title: 'Send offer to Alex Rivera',
    type: 'offer',
    target: 'Lead Backend Engineer',
    priority: 'High',
  },
  {
    id: 'task-3',
    title: 'Finalize Q3 Hiring Plan',
    type: 'plan',
    target: 'Engineering Department',
    priority: 'High',
  }
];

export const INITIAL_ACTIVITIES: Activity[] = [
  {
    id: 'act-1',
    user: 'Sarah Jenkins',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
    action: 'left feedback for Jordan Smith',
    target: 'Product Manager Role',
    time: '2 hours ago',
    badge: 'Strong Hire',
    badgeType: 'success',
    quote: '"Jordan demonstrated exceptional strategic thinking during the case study. His approach to technical debt prioritization was exactly what we\'re looking for."',
  },
  {
    id: 'act-2',
    user: 'System Integrator',
    action: 'Application Status Changed',
    target: 'Marketing Specialist Role',
    time: '5 hours ago',
    meta: 'Applied → Screening (8 candidates moved)',
  },
  {
    id: 'act-3',
    user: 'System Integrator',
    userAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150',
    action: 'New Application Received',
    target: 'Senior Frontend Dev',
    time: 'Yesterday',
  }
];
