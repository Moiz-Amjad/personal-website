// Common types used throughout the application

export interface ContactFormData {
  user_name: string
  user_email: string
  message: string
}

export interface ProjectData {
  id: string
  title: string
  description: string
  technologies: string[]
  liveUrl?: string
  githubUrl?: string
  imageUrl?: string
  featured?: boolean
}

export interface ExperienceData {
  id: string
  company: string
  position: string
  location: string
  duration: string
  description: string[]
  technologies?: string[]
}

export interface EducationData {
  id: string
  institution: string
  degree: string
  field: string
  duration: string
  gpa?: string
  honors?: string[]
}

export interface SkillCategory {
  id: string
  name: string
  skills: string[]
  icon?: string
}

export interface SocialLink {
  id: string
  name: string
  url: string
  icon: string
}

export interface ThemeContextType {
  theme: 'light' | 'dark'
  toggleTheme: () => void
}

export interface NavigationItem {
  name: string
  href: string
}

export interface AnimationProps {
  initial?: any
  animate?: any
  transition?: any
  whileHover?: any
  whileTap?: any
}

export interface ThreeComponentProps {
  position?: [number, number, number]
  scale?: number
  speed?: number
  color1?: string
  color2?: string
  variant?: string
  count?: number
  autoRotate?: boolean
  intensity?: number
}

export type Theme = 'light' | 'dark'
export type StatusType = 'success' | 'error' | '' 