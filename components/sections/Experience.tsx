'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Calendar, MapPin, ExternalLink, Building } from 'lucide-react'

const experiences = [
  {
    title: 'Software Engineering Intern',
    company: 'Software Application & Innovation Lab – Boston University',
    location: 'Boston, MA',
    period: 'Feb 2025 – Aug 2025',
    description: [
      "Integrated Langfuse tracing into LLM pipelines and configured PostgreSQL to store user history and analytics, enabling real-time monitoring of costs and usage.",
      "Automated LLM lifecycle management by containerizing core services with Docker and utilizing Langflow to register new LiteLLM workflows, achieving 100% environment parity.",
      "Configured MongoDB as the dedicated document store for the LibreChat component's conversation data, accelerating the retrieval of complex, unstructured chat history.",
      "Implemented Figma mockups into reusable UI components for the Admin Dashboard using Tailwind CSS, reducing new feature development time and standardizing visual design."
    ],
    technologies: ['Docker', 'Next.js', 'Node.js', 'PostgreSQL', 'React', 'LangFlow', 'MongoDB', 'LangFuse', 'LiteLLM', 'LiteLLM', 'JavaScript', 'Figma', 'WordPress'],
    link: 'https://www.bu.edu/sail/'
  },
  {
    title: 'IT Systems & Support Analyst',
    company: 'University of Massachusetts Boston',
    location: 'Boston, MA',
    period: 'Jan 2025 – Present',
    description: [
      "Resolved 100+ ServiceNow tickets including hardware and software issues across Mac, Windows, and Linux systems sometimes requiring making/running Bash or PowerShell scripts.",
      "Managed 15,000+ university accounts across MS Azure Services including Active Directory."
    ],
    technologies: ['Bash', 'PowerShell', 'ServiceNow', 'Azure AD', 'Linux', 'Windows', 'macOS'],
    link: 'https://umb.edu'
  },
  {
    title: 'Software Engineering Fellow',
    company: 'Headstarter AI',
    location: 'Remote',
    period: 'Jul 2024 – Sep 2024',
    description: [
      "Led Full-Stack development of 5 AI-driven web apps in 5 weeks, leveraging Node.js/Express.js, Material UI and Google Cloud Platform (Firestore, Storage) to scale an app to 70+ users.",
      "Engineered a Retrieval-Augmented Generation (RAG) pipeline using Python (LangChain), GPT-4o mini, and Pinecone, which increased support agent response accuracy by up to 85%"
    ],
    technologies: ['Next.js', 'LangChain', 'OpenAI API', 'Pinecone', 'React', 'RAG-Pipeline'],
    link: 'https://headstarter.co/'
  },
  {
    title: 'Software Engineer Intern',
    company: 'Devsinc',
    location: 'Lahore, Pakistan',
    period: 'Jul 2023 - Aug 2023',
    description: [
      "Collaborated with a 5 member team to optimize their expense platform’s front end by integrating Node.js build tools for image compression and code splitting, cutting page load times by ~15%.",
      "Refactored a core data module with an in-memory hash table lookup in Express.js, boosting data retrieval speed for specific high-frequency queries.",
      "Applied the Factory Design Pattern to standardize React UI components in a module, decreasing code redundancy and improving maintainability."
    ],
    technologies: ['React', 'Node.js', 'Express.js', 'Data Structures & Algorithms', 'Factory Design Patterns', 'JavaScript'],
    link: 'https://devsinc.com'
  },
  {
    title: 'Software Engineering Supplemental Instructor & Peer Tutor',
    company: 'University of Massachusetts Boston',
    location: 'Boston, MA',
    period: 'Sep 2022 – Dec 2024',
    description: [
      "Delivered group and one-on-one instruction sessions on OOP, DSA, Python, Java, C and Math, helping students improve their overall course grade by at least a letter grade on average."
    ],
    technologies: ['Python', 'Java', 'C', 'Math', 'Object Oriented Programming', 'Data Structures & Algorithms',],
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
      // Calculate progress: 0 at top, 1 when fully scrolled through
      const scrollProgress = Math.max(0, Math.min(1, visibleRatio + (containerTop < 0 ? Math.min(1, Math.abs(containerTop) / containerHeight) : 0)))
      
      // Progressive loading: show experiences incrementally as user scrolls
      const newVisibleCount = Math.min(
        experiences.length,
        Math.max(1, Math.ceil(scrollProgress * (experiences.length + 0.5)))
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
      className="py-20 section-padding relative overflow-hidden bg-transparent"
      aria-labelledby="experience-heading"
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
            id="experience-heading"
            className="text-4xl md:text-5xl font-bold mb-6 gradient-text"
          >
            Professional Experience
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto glass-text-light">
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