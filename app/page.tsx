'use client'

import { useState, useEffect, lazy, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import WelcomeScreen from '@/components/WelcomeScreen'

// Lazy load heavy components
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

export default function Home() {
  const [showWelcome, setShowWelcome] = useState(true)
  const [showContent, setShowContent] = useState(false)
  const [preloadComplete, setPreloadComplete] = useState(false)

  // Always scroll to top on page load/refresh
  useEffect(() => {
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
  }, [showWelcome])

  // Pre-render components during welcome screen for performance
  useEffect(() => {
    if (showWelcome) {
      // Start pre-rendering components after a short delay to let welcome screen render first
      const preloadTimer = setTimeout(() => {
        setPreloadComplete(true)
      }, 1000) // Start preloading 1 second into welcome screen

      return () => clearTimeout(preloadTimer)
    }
  }, [showWelcome])

  const handleWelcomeComplete = () => {
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

      {/* Pre-render components invisibly during welcome screen for performance */}
      {showWelcome && preloadComplete && (
        <div 
          style={{ 
            position: 'fixed', 
            top: '-9999px', 
            left: '-9999px', 
            visibility: 'hidden',
            pointerEvents: 'none',
            zIndex: -1000
          }}
          aria-hidden="true"
        >
          <Navigation />
          <main>
            <Suspense fallback={<SectionLoader />}>
              <Hero />
            </Suspense>
            <Suspense fallback={<SectionLoader />}>
              <About />
            </Suspense>
            <Suspense fallback={<SectionLoader />}>
              <Experience />
            </Suspense>
            <Suspense fallback={<SectionLoader />}>
              <Projects />
            </Suspense>
            <Suspense fallback={<SectionLoader />}>
              <Skills />
            </Suspense>
            <Suspense fallback={<SectionLoader />}>
              <Education />
            </Suspense>
            <Suspense fallback={<SectionLoader />}>
              <Contact />
            </Suspense>
          </main>
          <Footer />
        </div>
      )}

      {/* Navigation - only show after welcome screen */}
      <AnimatePresence>
        {!showWelcome && (
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

      {/* Main content with improved fade-up transition */}
      <AnimatePresence>
        {showContent && (
          <motion.main
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              duration: 1.2, 
              ease: [0.22, 1, 0.36, 1],
              delay: 0.1
            }}
          >
            <Suspense fallback={<SectionLoader />}>
              <Hero />
            </Suspense>
            <Suspense fallback={<SectionLoader />}>
              <About />
            </Suspense>
            <Suspense fallback={<SectionLoader />}>
              <Experience />
            </Suspense>
            <Suspense fallback={<SectionLoader />}>
              <Projects />
            </Suspense>
            <Suspense fallback={<SectionLoader />}>
              <Skills />
            </Suspense>
            <Suspense fallback={<SectionLoader />}>
              <Education />
            </Suspense>
            <Suspense fallback={<SectionLoader />}>
              <Contact />
            </Suspense>
          </motion.main>
        )}
      </AnimatePresence>

      {/* Footer - only show after content is loaded */}
      <AnimatePresence>
        {showContent && (
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