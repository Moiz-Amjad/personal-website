'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Canvas } from '@react-three/fiber'
import { Zap } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import OpenGLBackground from '../three/OpenGLBackground'
import RealisticDragon from '../three/RealisticDragon'
import FlyingObjects from '../three/FlyingObjects'

const skillCategories = [
  {
    title: 'Languages',
    skills: ['Python', 'JavaScript', 'TypeScript', 'C', 'Java', 'SQL', 'Assembly'],
  },
  {
    title: 'Frontend',
    skills: ['React', 'Next.js', 'Tailwind CSS', 'Material-UI', 'Framer Motion', 'Three.js'],
  },
  {
    title: 'Backend',
    skills: ['Node.js', 'Express', 'Firebase', 'PostgreSQL', 'MongoDB'],
  },
  {
    title: 'Cloud & DevOps',
    skills: ['AWS', 'GCP', 'Azure', 'Docker', 'Kubernetes', 'CI/CD'],
  },
  {
    title: 'AI/ML',
    skills: ['OpenAI', 'LangChain', 'Pinecone', 'TensorFlow', 'PyTorch'],
  },
  {
    title: 'Tools',
    skills: ['Git', 'VS Code', 'Figma', 'Stripe', 'Clerk', 'Vercel'],
  },
]

export default function Skills() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [hoveredSkills, setHoveredSkills] = useState<Set<string>>(new Set())

  // Handle theme changes to reset hover states
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted) {
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
    }
  }, [theme, mounted])

  const handleSkillHover = (skill: string, isHovering: boolean) => {
    if (isHovering) {
      setHoveredSkills(prev => new Set(prev).add(skill))
      
      // Apply hover styles
      const element = document.querySelector(`[data-skill-tag][data-skill="${skill}"]`) as HTMLElement
      if (element) {
        element.style.backgroundColor = theme === 'dark' ? 'rgb(59 130 246)' : 'rgb(147 51 234)'
        element.style.color = 'white'
        element.classList.add('animate-pulse')
      }
    } else {
      // Delay removal of hover state with blinking effect
      setTimeout(() => {
        setHoveredSkills(prev => {
          const newSet = new Set(prev)
          newSet.delete(skill)
          return newSet
        })
        
        const element = document.querySelector(`[data-skill-tag][data-skill="${skill}"]`) as HTMLElement
        if (element) {
          // Add blinking effect before removing hover state
          element.style.animation = 'pulse 0.5s ease-in-out 3'
          
          setTimeout(() => {
            element.style.backgroundColor = ''
            element.style.color = ''
            element.style.animation = ''
            element.classList.remove('animate-pulse')
          }, 1500) // Keep the effect for 1.5 seconds with blinking
        }
      }, 200) // Small delay before starting the exit animation
    }
  }

  if (!mounted) return null

  return (
    <section 
      id="skills" 
      className="py-20 section-padding bg-gray-50 dark:bg-gray-900/50 relative overflow-hidden"
      aria-labelledby="skills-heading"
      role="region"
    >
      {/* 3D Background */}
      <div className="absolute inset-0 z-0 opacity-25" aria-hidden="true">
        <Canvas camera={{ position: [0, 0, 14], fov: 50 }}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[7, 7, 5]} intensity={0.6} />
          <OpenGLBackground variant="particles" intensity={0.5} />
          <RealisticDragon position={[-6, 3, -2]} scale={0.2} speed={1.1} />
          <RealisticDragon position={[6, -2, 2]} scale={0.25} speed={0.8} />
          <FlyingObjects count={10} variant="geometric" speed={1.2} />
        </Canvas>
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-10 left-10 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-indigo-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="max-width relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mb-4"
              aria-hidden="true"
            >
              <Zap className="w-8 h-8 text-white" />
            </motion.div>
            <h2 id="skills-heading" className="text-3xl md:text-4xl font-bold gradient-text">
              Technical Skills
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mt-4">
              Technologies and tools I work with
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skillCategories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9, rotateY: 45 }}
                animate={inView ? { opacity: 1, scale: 1, rotateY: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.01, y: -2 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-300 dark:border-gray-600 group relative overflow-hidden focus-within:ring-2 focus-within:ring-purple-500 focus-within:ring-offset-2"
                role="region"
                aria-labelledby={`skills-category-${index}`}
              >
                {/* Animated background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true"></div>
                
                {/* Floating particles */}
                <div className="absolute top-2 right-2 w-2 h-2 bg-purple-500 rounded-full animate-pulse opacity-60" aria-hidden="true"></div>
                <div className="absolute bottom-2 left-2 w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse delay-300 opacity-60" aria-hidden="true"></div>
                
                <div className="relative z-10">
                  <motion.h3 
                    id={`skills-category-${index}`}
                    className="text-xl font-semibold mb-4 gradient-text group-hover:scale-105 transition-transform duration-300"
                    initial={{ x: -20, opacity: 0 }}
                    animate={inView ? { x: 0, opacity: 1 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                  >
                    {category.title}
                  </motion.h3>
                  
                  <div className="flex flex-wrap gap-2" role="list" aria-label={`${category.title} skills`}>
                    {category.skills.map((skill, i) => (
                      <motion.span
                        key={i}
                        data-skill-tag="true"
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
                        transition={{ 
                          duration: 0.4, 
                          delay: index * 0.1 + i * 0.05 + 0.3,
                          type: "spring",
                          stiffness: 100
                        }}
                        whileHover={{ 
                          scale: 1.05,
                          transition: { duration: 0.1 }
                        }}
                        onMouseEnter={() => handleSkillHover(skill, true)}
                        onMouseLeave={() => handleSkillHover(skill, false)}
                        className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-sm cursor-pointer transition-all duration-200 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                        role="listitem"
                        tabIndex={0}
                        data-skill={skill}
                        aria-label={`${skill} skill`}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            handleSkillHover(skill, true)
                            setTimeout(() => handleSkillHover(skill, false), 2000)
                          }
                        }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Skills Summary */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-16 text-center"
            role="region"
            aria-labelledby="skills-summary"
          >
            <h3 id="skills-summary" className="sr-only">Skills Summary Statistics</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="p-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl border border-gray-300 dark:border-gray-600">
                <div className="text-3xl font-bold gradient-text" aria-label="15 plus languages">15+</div>
                <div className="text-sm text-gray-700 dark:text-gray-300">Languages</div>
              </div>
              <div className="p-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl border border-gray-300 dark:border-gray-600">
                <div className="text-3xl font-bold gradient-text" aria-label="25 plus frameworks">25+</div>
                <div className="text-sm text-gray-700 dark:text-gray-300">Frameworks</div>
              </div>
              <div className="p-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl border border-gray-300 dark:border-gray-600">
                <div className="text-3xl font-bold gradient-text" aria-label="10 plus tools">10+</div>
                <div className="text-sm text-gray-700 dark:text-gray-300">Tools</div>
              </div>
              <div className="p-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl border border-gray-300 dark:border-gray-600">
                <div className="text-3xl font-bold gradient-text" aria-label="3 plus cloud platforms">3+</div>
                <div className="text-sm text-gray-700 dark:text-gray-300">Cloud Platforms</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
} 