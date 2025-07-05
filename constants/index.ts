// Application constants and configuration

export const SITE_CONFIG = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || 'Moiz Amjad Portfolio',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://moizamjad.dev',
  description: 'Full-stack software engineer specializing in modern web technologies, AI/ML, and scalable applications',
  author: 'Moiz Amjad',
  email: 'moiz.amjad37@gmail.com',
  social: {
    linkedin: 'https://www.linkedin.com/in/moiz-amjad/',
    github: 'https://github.com/Moiz-Amjad',
    twitter: '@moizamjad',
  }
} as const

export const NAVIGATION_ITEMS = [
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Education', href: '#education' },
  { name: 'Contact', href: '#contact' },
] as const

export const EMAILJS_CONFIG = {
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!,
} as const

export const ANIMATION_DURATIONS = {
  fast: 0.08,
  normal: 0.3,
  slow: 0.8,
  welcome: 1.2,
} as const

export const THEME_COLORS = {
  primary: '#8B5CF6',
  secondary: '#3B82F6',
  accent: '#10B981',
  dark: '#1F2937',
  light: '#F9FAFB',
} as const

export const BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const

export const THREE_CONFIG = {
  particles: {
    count: 2000,
    size: 0.02,
    opacity: 0.6,
  },
  dragons: {
    count: 15,
    speed: 0.2,
    scale: 1,
  },
  flyingObjects: {
    count: 40,
    speed: 1,
    variants: ['butterflies', 'orbs', 'geometric', 'sparkles'] as const,
  },
} as const

export const PERSONAL_INFO = {
  name: 'Moiz Amjad',
  title: 'Software Engineer',
  location: 'Boston, MA',
  experience: '3+ Years',
  projects: '25+ Projects',
  bio: `I'm a passionate software engineer with expertise in full-stack development, 
        AI/ML, and modern web technologies. I love building scalable applications 
        that solve real-world problems and create meaningful user experiences.`,
} as const

export const SKILLS_DATA = [
  {
    id: 'languages',
    name: 'Programming Languages',
    skills: ['JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'SQL'],
  },
  {
    id: 'frontend',
    name: 'Frontend Technologies',
    skills: ['React', 'Next.js', 'Vue.js', 'HTML5', 'CSS3', 'Tailwind CSS'],
  },
  {
    id: 'backend',
    name: 'Backend Technologies',
    skills: ['Node.js', 'Express.js', 'Django', 'Flask', 'PostgreSQL', 'MongoDB'],
  },
  {
    id: 'tools',
    name: 'Tools & Platforms',
    skills: ['Git', 'Docker', 'AWS', 'Vercel', 'Firebase', 'Figma'],
  },
] as const

export const PROJECTS_DATA = [
  {
    id: 'ai-support-bot',
    title: 'AI Support Bot',
    description: 'Intelligent customer support chatbot using OpenAI GPT-4',
    technologies: ['Next.js', 'OpenAI API', 'TypeScript', 'Tailwind CSS'],
    featured: true,
  },
  {
    id: 'splitwise-clone',
    title: 'Splitwise Clone',
    description: 'Expense sharing application with real-time updates',
    technologies: ['React', 'Node.js', 'MongoDB', 'Socket.io'],
    featured: true,
  },
] as const

export const EXPERIENCE_DATA = [
  {
    id: 'headstarter',
    company: 'Headstarter AI',
    position: 'Software Engineer Fellow',
    location: 'Remote',
    duration: 'July 2024 - Present',
    description: [
      'Built 5+ AI apps and APIs using NextJS, OpenAI, Pinecone, StripeAPI',
      'Developed projects from design to deployment leading 4+ engineering fellows',
      'Coached by Amazon, Bloomberg and Capital One engineers on Agile, CI/CD, Git and microservice patterns',
    ],
  },
  {
    id: 'devsinc',
    company: 'Devsinc',
    position: 'Software Engineer Intern',
    location: 'Remote',
    duration: 'Summer 2022',
    description: [
      'Developed responsive web applications using React and Node.js',
      'Collaborated with cross-functional teams to deliver high-quality software',
      'Participated in code reviews and implemented best practices',
    ],
  },
] as const

export const EDUCATION_DATA = [
  {
    id: 'umass-boston',
    institution: 'University of Massachusetts Boston',
    degree: 'Bachelor of Science',
    field: 'Computer Science',
    duration: '2021 - 2025',
    gpa: '3.8/4.0',
    honors: ['Dean\'s List', 'Academic Excellence Scholarship'],
  },
] as const 