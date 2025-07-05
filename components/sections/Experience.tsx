'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Canvas } from '@react-three/fiber'
import { Calendar, MapPin, ExternalLink, Building } from 'lucide-react'
import OpenGLBackground from '../three/OpenGLBackground'
import RealisticDragon from '../three/RealisticDragon'
import FlyingObjects from '../three/FlyingObjects'

const experiences = [
  {
    title: 'Software Engineer',
    company: 'Tech Solutions Inc.',
    location: 'Boston, MA',
    period: '2023 - Present',
    description: 'Led development of scalable web applications using React, Node.js, and AWS. Implemented microservices architecture and improved system performance by 40%.',
    technologies: ['React', 'Node.js', 'AWS', 'MongoDB', 'TypeScript'],
    link: 'https://techsolutions.com'
  },
  {
    title: 'Full Stack Developer',
    company: 'StartupXYZ',
    location: 'Cambridge, MA',
    period: '2022 - 2023',
    description: 'Built and maintained multiple client projects using modern web technologies. Collaborated with cross-functional teams to deliver high-quality software solutions.',
    technologies: ['Next.js', 'Python', 'PostgreSQL', 'Docker', 'GraphQL'],
    link: 'https://startupxyz.com'
  },
  {
    title: 'Junior Developer',
    company: 'Digital Agency',
    location: 'Boston, MA',
    period: '2021 - 2022',
    description: 'Developed responsive web applications and helped optimize existing codebases. Gained experience in agile development methodologies and version control.',
    technologies: ['JavaScript', 'React', 'CSS3', 'MySQL', 'Git'],
    link: 'https://digitalagency.com'
  },
  {
    title: 'Software Engineering Intern',
    company: 'Innovation Labs',
    location: 'Boston, MA',
    period: '2021',
    description: 'Contributed to open-source projects and learned best practices in software development. Participated in code reviews and team meetings.',
    technologies: ['Python', 'Django', 'SQLite', 'HTML5', 'CSS3'],
    link: 'https://innovationlabs.com'
  }
]

export default function Experience() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const [visibleExperiences, setVisibleExperiences] = useState(0)
  const [isFullyLoaded, setIsFullyLoaded] = useState(false)
  const [mounted, setMounted] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Set mounted to true after first render
  useEffect(() => {
    setMounted(true)
  }, [])

  // Scroll-based visibility detection - only when not fully loaded
  useEffect(() => {
    if (!inView || isFullyLoaded || !mounted) return

    const handleScroll = () => {
      if (!containerRef.current || isFullyLoaded || !mounted) return

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
  }, [inView, isFullyLoaded, mounted])

  // Show all experiences if fully loaded
  const experiencesToShow = isFullyLoaded ? experiences : experiences.slice(0, visibleExperiences)

  return (
    <section 
      id="experience" 
      className="py-20 section-padding relative overflow-hidden"
      aria-labelledby="experience-heading"
      role="region"
    >
      {/* 3D Background */}
      <div className="absolute inset-0 z-0 opacity-20" aria-hidden="true">
        <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 5, 5]} intensity={0.6} />
          <OpenGLBackground variant="waves" intensity={0.3} />
          <RealisticDragon position={[4, -1, -3]} scale={0.18} speed={0.7} />
          <FlyingObjects count={5} variant="orbs" speed={0.5} />
        </Canvas>
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-16 left-16 w-28 h-28 bg-purple-500/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-16 right-16 w-36 h-36 bg-blue-500/10 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-2/3 left-1/3 w-24 h-24 bg-indigo-500/10 rounded-full blur-xl animate-pulse delay-500"></div>
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
            id="experience-heading"
            className="text-4xl md:text-5xl font-bold mb-6 gradient-text"
          >
            Professional Experience
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            A journey through my professional growth, showcasing the roles and projects that have 
            shaped my expertise in software development.
          </p>
        </motion.div>

        <div ref={containerRef} className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 to-blue-500"></div>

          <div className="space-y-12">
            {experiencesToShow.map((experience, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full border-4 border-white dark:border-gray-900 z-10"></div>

                {/* Experience card */}
                <div className={`glass-card p-6 rounded-xl hover:shadow-xl transition-all duration-300 ml-12 md:ml-0 ${
                  index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'
                } md:w-5/12 group`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <div className="p-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg mr-3 group-hover:scale-110 transition-transform">
                        <Building className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                          {experience.title}
                        </h3>
                        <p className="text-purple-600 dark:text-purple-400 font-medium">
                          {experience.company}
                        </p>
                      </div>
                    </div>
                    {experience.link && (
                      <a
                        href={experience.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-purple-500 transition-colors"
                        aria-label={`Visit ${experience.company} website`}
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    )}
                  </div>

                  <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm mb-4">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span className="mr-4">{experience.period}</span>
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{experience.location}</span>
                  </div>

                  <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                    {experience.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {experience.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
} 