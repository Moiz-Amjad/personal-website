'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import LazyCanvas from '../three/LazyCanvas'
import { Code, Database, Server, Smartphone, Cloud, Zap } from 'lucide-react'
import OpenGLBackground from '../three/OpenGLBackground'
import RealisticDragon from '../three/RealisticDragon'
import FlyingObjects from '../three/FlyingObjects'
import { useTheme } from '../ThemeProvider'

const skillCategories = [
  {
    icon: Code,
    title: 'Frontend',
    skills: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Framer Motion']
  },
  {
    icon: Server,
    title: 'Backend',
    skills: ['Node.js', 'Express', 'Python', 'Django', 'FastAPI', 'REST APIs', 'GraphQL', 'Microservices']
  },
  {
    icon: Database,
    title: 'Database',
    skills: ['PostgreSQL', 'MongoDB', 'Redis', 'MySQL', 'Prisma', 'Supabase', 'Firebase', 'DynamoDB']
  },
  {
    icon: Cloud,
    title: 'Cloud & DevOps',
    skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Vercel', 'Netlify', 'GitHub Actions', 'Terraform']
  },
  {
    icon: Smartphone,
    title: 'Mobile',
    skills: ['React Native', 'Flutter', 'iOS', 'Android', 'Expo', 'PWA', 'Responsive Design']
  },
  {
    icon: Zap,
    title: 'AI/ML',
    skills: ['Machine Learning', 'Deep Learning', 'TensorFlow', 'PyTorch', 'OpenAI API', 'Computer Vision', 'NLP']
  }
]

export default function Skills() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [hoveredSkills, setHoveredSkills] = useState<Set<string>>(new Set())

  // Set mounted to true after first render
  useEffect(() => {
    setMounted(true)
  }, [])

  // Handle theme changes to reset hover states
  useEffect(() => {
    if (!mounted) return

    // Force re-render of skill tags when theme changes to reset hover states
    const skillTags = document.querySelectorAll('[data-skill-tag]')
    skillTags.forEach(tag => {
      const element = tag as HTMLElement
      element.style.backgroundColor = ''
      element.style.color = ''
      element.style.transform = ''
    })
    // Clear hovered skills on theme change
    setHoveredSkills(new Set())
  }, [theme, mounted])

  const applyHoverStyles = (el: HTMLElement) => {
    el.style.backgroundColor = theme === 'dark' ? '#8B5CF6' : '#A855F7'
    el.style.color = '#FFFFFF'
    el.style.transform = 'scale(1.05)'
    el.classList.add('animate-pulse')
  }

  const resetStyles = (el: HTMLElement) => {
    el.style.backgroundColor = ''
    el.style.color = ''
    el.style.transform = ''
    el.classList.remove('animate-pulse')
  }

  const handleSkillHover = (skill: string) => {
    if (!mounted) return

    setHoveredSkills(prev => new Set(prev).add(skill))
    const element = document.querySelector(`[data-skill-tag][data-skill="${skill}"]`) as HTMLElement
    if (element) applyHoverStyles(element)
  }

  const handleSkillLeave = (skill: string) => {
    if (!mounted) return

    const element = document.querySelector(`[data-skill-tag][data-skill="${skill}"]`) as HTMLElement
    if (element) {
      // keep blink for 1.5s then reset
      setTimeout(() => {
        resetStyles(element)
        setHoveredSkills(prev => {
          const newSet = new Set(prev)
          newSet.delete(skill)
          return newSet
        })
      }, 1500)
    }
  }

  return (
    <section 
      id="skills" 
      className="py-20 section-padding relative overflow-hidden"
      aria-labelledby="skills-heading"
      role="region"
    >
      {/* 3D Background */}
      <div className="absolute inset-0 z-0 opacity-20" aria-hidden="true">
        <LazyCanvas camera={{ position: [0, 0, 10], fov: 50 }}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 5, 5]} intensity={0.6} />
          <OpenGLBackground variant="geometric" intensity={0.4} />
          <RealisticDragon position={[-5, 1, -3]} scale={0.15} speed={0.5} />
          <FlyingObjects count={6} variant="geometric" speed={0.4} />
        </LazyCanvas>
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-20 right-20 w-24 h-24 bg-purple-500/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-32 h-32 bg-blue-500/10 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 right-1/3 w-20 h-20 bg-indigo-500/10 rounded-full blur-xl animate-pulse delay-500"></div>
      </div>

      <div className="max-width relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 
            id="skills-heading"
            className="text-4xl md:text-5xl font-bold mb-6 gradient-text"
          >
            Technical Skills
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            A comprehensive toolkit of modern technologies and frameworks I use to build scalable, 
            performant applications across the full stack.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="glass-card p-6 rounded-xl hover:shadow-xl transition-all duration-300 group"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center mb-4">
                <div className="p-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg mr-4 group-hover:scale-110 transition-transform">
                  <category.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                  {category.title}
                </h3>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    data-skill-tag
                    data-skill={skill}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer hover:bg-purple-500 hover:text-white hover:scale-105"
                    onMouseEnter={() => handleSkillHover(skill)}
                    onMouseLeave={() => handleSkillLeave(skill)}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 