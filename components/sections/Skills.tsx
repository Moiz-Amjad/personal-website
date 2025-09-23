'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Code, Database, Server, Smartphone, Cloud, Zap } from 'lucide-react'
import { useTheme } from '../ThemeProvider'

const skillCategories = [
  {
    icon: Code,
    title: 'Frontend',
    skills: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind', 'Material UI', 'Framer Motion', 'Three.js']
  },
  {
    icon: Server,
    title: 'Backend',
    skills: ['Node.js', 'Firebase', 'Python', 'C', 'TypeScript', 'JavaScript', 'REST APIs', 'CRUD', 'Factory Design Patterns']
  },
  {
    icon: Database,
    title: 'Database',
    skills: ['PostgreSQL', 'MySQL', 'Supabase', 'Google Cloud Firebase', 'Pinecone']
  },
  {
    icon: Cloud,
    title: 'Cloud & DevOps',
    skills: ['AWS', 'GCP', 'Azure', 'Docker', 'Kubernetes', 'CI/CD', 'Vercel', 'Netlify', 'GitHub Actions']
  },
  {
    icon: Smartphone,
    title: 'Mobile',
    skills: ['React Native', 'Flutter', 'Swift']
  },
  {
    icon: Zap,
    title: 'AI/ML',
    skills: ['LangFlow', 'LangFuse', 'LangChain','RAG Pipeline', 'OpenAI API', 'LiteLLM']
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
      className="py-20 section-padding relative overflow-hidden bg-transparent"
      aria-labelledby="skills-heading"
      role="region"
    >
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
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto glass-text-light">
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