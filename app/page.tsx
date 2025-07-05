'use client'

import { useState, useEffect, lazy, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import WelcomeScreen from '@/components/WelcomeScreen'

// Lazy load heavy components with different priorities
const Hero = lazy(() => import('@/components/sections/Hero'))
const About = lazy(() => import('@/components/sections/About'))
const Experience = lazy(() => import('@/components/sections/Experience'))
const Projects = lazy(() => import('@/components/sections/Projects'))
const Skills = lazy(() => import('@/components/sections/Skills'))
const Education = lazy(() => import('@/components/sections/Education'))
const Contact = lazy(() => import('@/components/sections/Contact'))

// Loading fallback component that maintains layout
const SectionLoader = ({ height = "100vh" }: { height?: string }) => (
  <div 
    style={{ height, minHeight: height }}
    className="flex items-center justify-center bg-transparent"
  >
    <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin opacity-20" />
  </div>
)

// Progressive loading component wrapper
const ProgressiveSection = ({ 
  children, 
  isLoaded, 
  fallback = <SectionLoader /> 
}: { 
  children: React.ReactNode
  isLoaded: boolean
  fallback?: React.ReactNode
}) => {
  if (!isLoaded) return fallback
  return <>{children}</>
}

export default function Home() {
  const [showWelcome, setShowWelcome] = useState(true)
  const [showContent, setShowContent] = useState(false)
  const [mounted, setMounted] = useState(false)
  
  // Progressive loading states for each section
  const [loadedSections, setLoadedSections] = useState({
    hero: false,
    about: false,
    experience: false,
    projects: false,
    skills: false,
    education: false,
    contact: false
  })

  // Set mounted to true after first render
  useEffect(() => {
    setMounted(true)
  }, [])

  // Always scroll to top on page load/refresh
  useEffect(() => {
    if (!mounted) return

    window.scrollTo(0, 0)
    
    // Disable scroll during welcome screen
    if (showWelcome) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [showWelcome, mounted])

  // Progressive loading strategy
  useEffect(() => {
    if (!showContent || !mounted) return

    const loadSections = async () => {
      const delays = {
        hero: 0,      // Load immediately
        about: 800,   // Load after 800ms
        experience: 1600, // Load after 1.6s
        projects: 2400,   // Load after 2.4s
        skills: 3200,     // Load after 3.2s
        education: 4000,  // Load after 4s
        contact: 4800     // Load after 4.8s
      }

      // Load sections progressively
      Object.entries(delays).forEach(([section, delay]) => {
        setTimeout(() => {
          setLoadedSections(prev => ({
            ...prev,
            [section]: true
          }))
        }, delay)
      })
    }

    loadSections()
  }, [showContent, mounted])

  // Intersection observer for on-demand loading (fallback for slow connections)
  useEffect(() => {
    if (!mounted || !showContent) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id
            if (sectionId && !loadedSections[sectionId as keyof typeof loadedSections]) {
              setLoadedSections(prev => ({
                ...prev,
                [sectionId]: true
              }))
            }
          }
        })
      },
      {
        rootMargin: '100px', // Load when section is 100px away from viewport
        threshold: 0.1
      }
    )

    // Observe section containers
    const sections = ['hero', 'about', 'experience', 'projects', 'skills', 'education', 'contact']
    sections.forEach(section => {
      const element = document.getElementById(section)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [showContent, mounted, loadedSections])

  const handleWelcomeComplete = () => {
    if (!mounted) return

    setShowWelcome(false)
    // Enable smooth transition to main content with improved timing
    setTimeout(() => {
      setShowContent(true)
      document.body.style.overflow = 'unset'
    }, 150)
  }

  return (
    <>
      <AnimatePresence mode="wait">
        {showWelcome && (
          <WelcomeScreen 
            key="welcome"
            onComplete={handleWelcomeComplete} 
          />
        )}
      </AnimatePresence>

      {/* Navigation - only show after welcome screen */}
      <AnimatePresence>
        {!showWelcome && mounted && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ 
              duration: 0.8, 
              ease: [0.22, 1, 0.36, 1],
              delay: 0.2
            }}
          >
            <Navigation />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content with progressive loading */}
      <AnimatePresence>
        {showContent && mounted && (
          <motion.main
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              duration: 1.2, 
              ease: [0.22, 1, 0.36, 1],
              delay: 0.1
            }}
          >
            {/* Hero Section - Loads first */}
            <div id="hero">
              <ProgressiveSection isLoaded={loadedSections.hero}>
                <Suspense fallback={<SectionLoader />}>
                  <Hero />
                </Suspense>
              </ProgressiveSection>
            </div>

            {/* About Section */}
            <div id="about">
              <ProgressiveSection isLoaded={loadedSections.about}>
                <Suspense fallback={<SectionLoader />}>
                  <About />
                </Suspense>
              </ProgressiveSection>
            </div>

            {/* Experience Section */}
            <div id="experience">
              <ProgressiveSection isLoaded={loadedSections.experience}>
                <Suspense fallback={<SectionLoader />}>
                  <Experience />
                </Suspense>
              </ProgressiveSection>
            </div>

            {/* Projects Section */}
            <div id="projects">
              <ProgressiveSection isLoaded={loadedSections.projects}>
                <Suspense fallback={<SectionLoader />}>
                  <Projects />
                </Suspense>
              </ProgressiveSection>
            </div>

            {/* Skills Section */}
            <div id="skills">
              <ProgressiveSection isLoaded={loadedSections.skills}>
                <Suspense fallback={<SectionLoader />}>
                  <Skills />
                </Suspense>
              </ProgressiveSection>
            </div>

            {/* Education Section */}
            <div id="education">
              <ProgressiveSection isLoaded={loadedSections.education}>
                <Suspense fallback={<SectionLoader />}>
                  <Education />
                </Suspense>
              </ProgressiveSection>
            </div>

            {/* Contact Section */}
            <div id="contact">
              <ProgressiveSection isLoaded={loadedSections.contact}>
                <Suspense fallback={<SectionLoader />}>
                  <Contact />
                </Suspense>
              </ProgressiveSection>
            </div>
          </motion.main>
        )}
      </AnimatePresence>

      {/* Footer - only show after content is loaded */}
      <AnimatePresence>
        {showContent && mounted && loadedSections.contact && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.8, 
              ease: [0.22, 1, 0.36, 1],
              delay: 0.4 
            }}
          >
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
} 