export const APP_CONFIG = {
  name: 'MentorPath',
  version: '1.0.0',
  description: 'Your AI-Powered Journey to Professional Growth'
};

export const COLORS = {
  primary: {
    blue: '#1E3A8A',
    teal: '#10B981',
    gold: '#F59E0B',
    gray: '#F9FAFB'
  },
  gradients: {
    primary: 'from-mentor-blue to-mentor-teal',
    secondary: 'from-mentor-teal to-mentor-gold'
  }
};

export const SKILL_CATEGORIES = {
  technical: [
    'JavaScript', 'TypeScript', 'React', 'Vue', 'Angular', 'Node.js', 'Python',
    'Java', 'C#', 'PHP', 'Ruby', 'Go', 'Rust', 'Swift', 'Kotlin', 'HTML', 'CSS',
    'SASS', 'Tailwind', 'Bootstrap', 'MongoDB', 'PostgreSQL', 'MySQL', 'Redis',
    'AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'Git', 'Jenkins', 'Jest',
    'Cypress', 'GraphQL', 'REST', 'WebSocket', 'Microservices', 'Serverless'
  ],
  soft: [
    'Communication', 'Leadership', 'Teamwork', 'Problem Solving', 'Time Management',
    'Adaptability', 'Creativity', 'Critical Thinking', 'Decision Making', 'Conflict Resolution',
    'Emotional Intelligence', 'Negotiation', 'Presentation', 'Mentoring', 'Agile Methodology',
    'Project Management', 'Strategic Planning', 'Customer Service', 'Analytical Thinking'
  ]
};

export const JOB_TYPES = [
  'Full-time', 'Part-time', 'Contract', 'Internship', 'Freelance', 'Remote'
];

export const EXPERIENCE_LEVELS = [
  'Intern', 'Junior', 'Mid-level', 'Senior', 'Lead', 'Principal', 'Executive'
];

export const INDUSTRIES = [
  'Technology', 'Finance', 'Healthcare', 'Education', 'E-commerce', 'Manufacturing',
  'Consulting', 'Marketing', 'Media', 'Non-profit', 'Government', 'Other'
];

export const FILE_CONFIG = {
  maxSize: 50 * 1024 * 1024, // 50MB
  allowedTypes: [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ],
  allowedExtensions: ['.pdf', '.doc', '.docx']
};

export const CHAT_CONFIG = {
  maxMessageLength: 1000,
  maxHistory: 50,
  thinkingTime: 2000 // Simulated AI thinking time in ms
};