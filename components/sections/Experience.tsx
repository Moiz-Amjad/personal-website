'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState, useEffect, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { Calendar, MapPin, Briefcase } from 'lucide-react'
import OpenGLBackground from '../three/OpenGLBackground'
import RealisticDragon from '../three/RealisticDragon'
import FlyingObjects from '../three/FlyingObjects'

const experiences = [
  {
    title: 'Software Engineering Intern',
    company: 'SAIL @ Boston University',
    location: 'Boston, MA',
    date: 'May 2025 - Present',
    description: [
      'Developing responsive WordPress components from Figma designs',
      'Collaborating with design team to ensure pixel-perfect implementation',
      'Optimizing website performance and user experience',
    ],
  },
  {
    title: 'IT Systems & Support Analyst',
    company: 'UMass Boston',
    location: 'Boston, MA',
    date: 'Jan 2025 - Present',
    description: [
      'Managing IT infrastructure and support systems',
      'Troubleshooting technical issues and providing solutions',
      'Implementing system improvements and automation',
    ],
  },
  {
    title: 'Software Engineering Fellow',
    company: 'Headstarter AI',
    location: 'Remote',
    date: 'Jul 2024 - Sep 2024',
    description: [
      'Built AI-powered applications using cutting-edge technologies',
      'Collaborated on team projects with agile methodologies',
      'Developed full-stack solutions with modern frameworks',
    ],
  },
  {
    title: 'Software Engineer Intern',
    company: 'Devsinc',
    location: 'Remote',
    date: 'Summer 2022',
    description: [
      'Developed web applications using React.js and Node.js',
      'Collaborated with senior developers on client projects',
      'Implemented responsive UI components and API integrations',
      'Participated in code reviews and agile development processes',
    ],
  },
]

export default function Experience() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const [visibleExperiences, setVisibleExperiences] = useState(0)
  const [isFullyLoaded, setIsFullyLoaded] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Scroll-based visibility detection - only when not fully loaded
  useEffect(() => {
    if (!inView || isFullyLoaded) return

    const handleScroll = () => {
      if (!containerRef.current || isFullyLoaded) return

      const containerRect = containerRef.current.getBoundingClientRect()
      const containerTop = containerRect.top
      const containerHeight = containerRect.height
      const viewportHeight = window.innerHeight

      // Calculate how much of the container is visible
      const visibleStart = Math.max(0, -containerTop)
      const visibleEnd = Math.min(containerHeight, viewportHeight - containerTop)
      const visibleRatio = (visibleEnd - visibleStart) / containerHeight

      // Show experiences based on scroll progress
      const newVisibleCount = Math.min(
        experiences.length,
        Math.max(1, Math.floor(visibleRatio * experiences.length * 1.8))
      )

      setVisibleExperiences(prevCount => {
        const updatedCount = Math.max(prevCount, newVisibleCount)
        
        // Mark as fully loaded when all experiences are visible
        if (updatedCount >= experiences.length) {
          setIsFullyLoaded(true)
        }
        
        return updatedCount
      })
    }

    handleScroll() // Initial check
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [inView, isFullyLoaded])

  // Show all experiences if fully loaded
  const experiencesToShow = isFullyLoaded ? experiences : experiences.slice(0, visibleExperiences)

  return (
    <section 
      id="experience" 
      className="py-20 section-padding bg-gray-50 dark:bg-gray-900/50 relative overflow-hidden"
      aria-labelledby="experience-heading"
      role="region"
    >
      {/* 3D Background */}
      <div className="absolute inset-0 z-0 opacity-20" aria-hidden="true">
        <Canvas camera={{ position: [0, 0, 15], fov: 40 }}>
          <ambientLight intensity={0.3} />
          <directionalLight position={[10, 10, 5]} intensity={0.6} />
          <OpenGLBackground variant="geometric" intensity={0.3} />
          <RealisticDragon position={[8, 4, -3]} scale={0.3} speed={0.5} />
          <FlyingObjects count={5} variant="mixed" speed={0.4} />
        </Canvas>
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-16 left-16 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-16 right-16 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="max-width relative z-10" ref={containerRef}>
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
              <Briefcase className="w-8 h-8 text-white" />
            </motion.div>
            <h2 id="experience-heading" className="text-3xl md:text-4xl font-bold gradient-text">
              Professional Experience
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mt-4">
              My journey in software engineering and technology
            </p>
          </div>
          
          {/* Timeline */}
          <div className="relative">
            {/* Timeline line */}
            <div 
              className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-purple-500 to-blue-500"
              aria-hidden="true"
            ></div>
            
            <div className="space-y-12" role="list" aria-label="Work experience timeline">
              {experiencesToShow.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                  role="listitem"
                >
                  {/* Timeline dot */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={inView ? { scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
                    className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full border-4 border-white dark:border-gray-900 z-10"
                    aria-hidden="true"
                  />
                  
                  {/* Content */}
                  <div className={`w-full md:w-5/12 ml-12 md:ml-0 ${index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'}`}>
                    <motion.article
                      whileHover={{ scale: 1.005, y: -2 }}
                      transition={{ duration: 0.08 }}
                      className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-100 border border-gray-300 dark:border-gray-600 group focus-within:ring-2 focus-within:ring-purple-500 focus-within:ring-offset-2"
                      tabIndex={0}
                      role="article"
                      aria-labelledby={`job-title-${index}`}
                    >
                      {/* Animated corner accents */}
                      <div className="absolute top-0 left-0 w-8 h-8 bg-gradient-to-br from-purple-500/20 to-transparent rounded-tl-xl" aria-hidden="true"></div>
                      <div className="absolute bottom-0 right-0 w-8 h-8 bg-gradient-to-tl from-blue-500/20 to-transparent rounded-br-xl" aria-hidden="true"></div>
                      
                      <div className="relative z-10">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                          <div>
                            <motion.h3 
                              id={`job-title-${index}`}
                              className="text-xl font-semibold group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-100 text-gray-900 dark:text-gray-100"
                              initial={{ opacity: 0, y: 10 }}
                              animate={inView ? { opacity: 1, y: 0 } : {}}
                              transition={{ duration: 0.5, delay: index * 0.2 + 0.5 }}
                            >
                              {exp.title}
                            </motion.h3>
                            <motion.p 
                              className="text-purple-600 dark:text-purple-400 font-medium"
                              initial={{ opacity: 0, y: 10 }}
                              animate={inView ? { opacity: 1, y: 0 } : {}}
                              transition={{ duration: 0.5, delay: index * 0.2 + 0.6 }}
                            >
                              {exp.company}
                            </motion.p>
                          </div>
                          <motion.div 
                            className="flex flex-col md:items-end mt-2 md:mt-0"
                            initial={{ opacity: 0, x: 20 }}
                            animate={inView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.5, delay: index * 0.2 + 0.7 }}
                          >
                            <div className="flex items-center text-gray-700 dark:text-gray-300 text-sm mb-1">
                              <Calendar size={16} className="mr-2 text-purple-500" aria-hidden="true" />
                              <span aria-label={`Employment period: ${exp.date}`}>{exp.date}</span>
                            </div>
                            <div className="flex items-center text-gray-700 dark:text-gray-300 text-sm">
                              <MapPin size={16} className="mr-2 text-blue-500" aria-hidden="true" />
                              <span aria-label={`Location: ${exp.location}`}>{exp.location}</span>
                            </div>
                          </motion.div>
                        </div>
                        
                        <motion.ul 
                          className="space-y-2 text-gray-700 dark:text-gray-300"
                          initial={{ opacity: 0 }}
                          animate={inView ? { opacity: 1 } : {}}
                          transition={{ duration: 0.5, delay: index * 0.2 + 0.8 }}
                          role="list"
                          aria-label="Job responsibilities"
                        >
                          {exp.description.map((desc, i) => (
                            <motion.li 
                              key={i}
                              initial={{ opacity: 0, x: -10 }}
                              animate={inView ? { opacity: 1, x: 0 } : {}}
                              transition={{ duration: 0.3, delay: index * 0.2 + 0.9 + i * 0.1 }}
                              className="flex items-start"
                              role="listitem"
                            >
                              <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mt-2 mr-3 flex-shrink-0" aria-hidden="true"></div>
                              {desc}
                            </motion.li>
                          ))}
                        </motion.ul>
                      </div>
                    </motion.article>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 