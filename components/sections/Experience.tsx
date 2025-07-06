'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import LazyCanvas from '../three/LazyCanvas'
import { Calendar, MapPin, ExternalLink, Building } from 'lucide-react'
import OpenGLBackground from '../three/OpenGLBackground'
import RealisticDragon from '../three/RealisticDragon'
import FlyingObjects from '../three/FlyingObjects'

const experiences = [
  {
    title: 'Software Engineering Intern',
    company: 'Software Application & Innovation Lab – Boston University',
    location: 'Boston, MA',
    period: 'May 2025 – Present',
    description: [
      "Modernized BU's web presence by implementing Figma mock-ups into responsive, reusable WordPress components, resulting in a cohesive, faster-loading user experience and reduced development time."
    ],
    technologies: ['WordPress', 'PHP', 'Figma', 'JavaScript', 'CSS'],
    link: 'https://www.bu.edu/sail/'
  },
  {
    title: 'IT Systems & Support Analyst',
    company: 'University of Massachusetts Boston',
    location: 'Boston, MA',
    period: 'Jan 2025 – Present',
    description: [
      "Increased user satisfaction and service reliability by triaging 100+ ServiceNow requests and resolving 50+ hardware, software, and system issues, reducing downtime.",
      "Ensured data integrity and security by managing 200+ student and faculty accounts across multiple systems and educating users on phishing prevention, leading to a 10 % reduction in incidents."
    ],
    technologies: ['Bash', 'Python', 'ServiceNow', 'Azure AD'],
    link: 'https://umb.edu'
  },
  {
    title: 'Software Engineering Fellow',
    company: 'Headstarter AI',
    location: 'Remote',
    period: 'Jul 2024 – Sep 2024',
    description: [
      "Led development of 5 AI-driven web applications in 5 weeks, scaling them to 50+ users with a focus on performance optimisation and engagement.",
      "Integrated a RAG pipeline (OpenAI + Pinecone) to power customer-support agents, reducing manual query resolution time by 25 %.",
      "Collaborated with 3 engineers to launch a SaaS product generating dynamic flashcards, boosting engagement by 15 %."
    ],
    technologies: ['Next.js', 'LangChain', 'OpenAI API', 'Pinecone'],
    link: 'https://headstarter.ai'
  },
  {
    title: 'Software Engineer Intern',
    company: 'Devsinc',
    location: 'Remote',
    period: 'Summer 2022',
    description: [
      "Optimised an expense-management platform front-end (React), reducing page-load time by 26 %.",
      "Built a custom hash-table implementation, improving data retrieval speed by 40 %.",
      "Applied the Factory Design Pattern to standardise UI components, cutting code redundancy by 30 % and improving scalability."
    ],
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Jest'],
    link: 'https://devsinc.com'
  },
  {
    title: 'Software Engineering Supplemental Instructor',
    company: 'University of Massachusetts Boston',
    location: 'Boston, MA',
    period: 'Sep 2022 – Dec 2022',
    description: [
      'Delivered four weekly supplemental instruction sessions to 30 students, improving course grades by 15 % in Python, OOP and Data Structures.',
      'Provided personalised feedback on assignments, enabling students to resolve 80 % of coding errors independently.'
    ],
    technologies: ['Python', 'Teaching', 'OOP', 'Data Structures'],
    link: 'https://umb.edu'
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
        <LazyCanvas camera={{ position: [0, 0, 10], fov: 50 }}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 5, 5]} intensity={0.6} />
          <OpenGLBackground variant="waves" intensity={0.3} />
          <RealisticDragon position={[4, -1, -3]} scale={0.18} speed={0.7} />
          <FlyingObjects count={5} variant="orbs" speed={0.5} />
        </LazyCanvas>
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

                  <ul className="list-disc ml-5 text-gray-700 dark:text-gray-300 mb-4 space-y-1">
                    {experience.description.map((d,i)=>(
                      <li key={i}>{d}</li>
                    ))}
                  </ul>

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