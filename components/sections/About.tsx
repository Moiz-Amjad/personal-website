'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import LazyCanvas from '../three/LazyCanvas'
import { Github, Linkedin, Code, Coffee, Rocket } from 'lucide-react'
import OpenGLBackground from '../three/OpenGLBackground'
import RealisticDragon from '../three/RealisticDragon'
import FlyingObjects from '../three/FlyingObjects'

export default function About() {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  })

  return (
    <section 
      id="about" 
      className="py-20 section-padding relative overflow-hidden"
      aria-labelledby="about-heading"
      role="region"
    >
      {/* 3D Background */}
      <div className="absolute inset-0 z-0 opacity-20" aria-hidden="true">
        <LazyCanvas camera={{ position: [0, 0, 10], fov: 50 }}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 5, 5]} intensity={0.6} />
          <OpenGLBackground variant="minimal" intensity={0.3} />
          <RealisticDragon position={[6, 2, -4]} scale={0.2} speed={0.6} />
          <FlyingObjects count={4} variant="butterflies" speed={0.3} />
        </LazyCanvas>
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-10 left-10 w-20 h-20 bg-purple-500/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-blue-500/10 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-indigo-500/10 rounded-full blur-xl animate-pulse delay-500"></div>
      </div>

      <div className="max-width relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 id="about-heading" className="text-3xl md:text-4xl font-bold text-center mb-12 gradient-text">
            About Me
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              role="img"
              aria-label="Profile representation with animated rings"
            >
              <div className="w-64 h-64 mx-auto relative">
                {/* Floating rings */}
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-purple-500/30"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  aria-hidden="true"
                />
                <motion.div
                  className="absolute inset-2 rounded-full border-2 border-blue-500/30"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  aria-hidden="true"
                />
                
                <div className="w-full h-full bg-gradient-to-br from-primary to-secondary p-1 rounded-2xl">
                  <div className="w-full h-full bg-white dark:bg-black rounded-2xl flex items-center justify-center relative overflow-hidden">
                    <span className="text-6xl font-bold gradient-text z-10" aria-hidden="true">MA</span>
                    {/* Animated background pattern */}
                    <div className="absolute inset-0 opacity-10" aria-hidden="true">
                      <div className="absolute top-4 left-4 w-8 h-8 bg-purple-500 rounded-full animate-bounce"></div>
                      <div className="absolute bottom-4 right-4 w-6 h-6 bg-blue-500 rounded-full animate-bounce delay-300"></div>
                      <div className="absolute top-1/2 right-8 w-4 h-4 bg-indigo-500 rounded-full animate-bounce delay-700"></div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <motion.p 
                className="text-lg text-gray-800 dark:text-gray-300 mb-6 leading-relaxed"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                I'm a passionate software engineer currently pursuing my B.Sc. in Computer Science at UMass Boston. 
                With experience as a Software Engineering Intern at Boston University and an IT Systems & Support 
                Analyst at UMass Boston, I specialize in building responsive, performant web applications.
              </motion.p>
              
              <motion.p 
                className="text-lg text-gray-800 dark:text-gray-300 mb-8 leading-relaxed"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                My journey in tech has been driven by a love for creating scalable solutions and exploring 
                cutting-edge technologies. From developing AI-powered applications to building full-stack web 
                platforms, I enjoy tackling complex challenges and turning ideas into reality.
              </motion.p>

              {/* Stats */}
              <motion.div 
                className="grid grid-cols-3 gap-4 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 1 }}
                role="region"
                aria-labelledby="stats-heading"
              >
                <h3 id="stats-heading" className="sr-only">Professional Statistics</h3>
                <motion.div 
                  className="text-center p-4 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-lg border border-purple-200 dark:border-purple-800 hover:shadow-lg transition-shadow duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                  tabIndex={0}
                  role="group"
                  aria-labelledby="projects-stat"
                >
                  <Code className="w-8 h-8 mx-auto mb-2 text-purple-600 dark:text-purple-400" aria-hidden="true" />
                  <div className="text-2xl font-bold text-gray-900 dark:text-gray-100" aria-label="25 plus projects">25+</div>
                  <div id="projects-stat" className="text-sm text-gray-700 dark:text-gray-300 font-medium">Projects</div>
                </motion.div>
                <motion.div 
                  className="text-center p-4 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-lg border border-blue-200 dark:border-blue-800 hover:shadow-lg transition-shadow duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                  tabIndex={0}
                  role="group"
                  aria-labelledby="experience-stat"
                >
                  <Coffee className="w-8 h-8 mx-auto mb-2 text-blue-600 dark:text-blue-400" aria-hidden="true" />
                  <div className="text-2xl font-bold text-gray-900 dark:text-gray-100" aria-label="3 plus years experience">3+</div>
                  <div id="experience-stat" className="text-sm text-gray-700 dark:text-gray-300 font-medium">Years Experience</div>
                </motion.div>
                <motion.div 
                  className="text-center p-4 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-lg border border-indigo-200 dark:border-indigo-800 hover:shadow-lg transition-shadow duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                  tabIndex={0}
                  role="group"
                  aria-labelledby="gpa-stat"
                >
                  <Rocket className="w-8 h-8 mx-auto mb-2 text-indigo-600 dark:text-indigo-400" aria-hidden="true" />
                  <div className="text-2xl font-bold text-gray-900 dark:text-gray-100" aria-label="3.7 GPA">3.7</div>
                  <div id="gpa-stat" className="text-sm text-gray-700 dark:text-gray-300 font-medium">GPA</div>
                </motion.div>
              </motion.div>
              
              <motion.div 
                className="flex space-x-4"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 1.2 }}
                role="group"
                aria-label="Social media links"
              >
                <motion.a
                  href="https://github.com/Moiz-Amjad"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.03, rotate: 2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                  className="p-3 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-lg hover:from-purple-100 hover:to-blue-100 dark:hover:from-purple-900 dark:hover:to-blue-900 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 border border-gray-300 dark:border-gray-600"
                  aria-label="Visit my GitHub profile"
                >
                  <Github size={24} className="text-gray-800 dark:text-gray-200" />
                </motion.a>
                <motion.a
                  href="https://www.linkedin.com/in/moiz-amjad/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.03, rotate: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                  className="p-3 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-lg hover:from-blue-100 hover:to-indigo-100 dark:hover:from-blue-900 dark:hover:to-indigo-900 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 border border-gray-300 dark:border-gray-600"
                  aria-label="Visit my LinkedIn profile"
                >
                  <Linkedin size={24} className="text-gray-800 dark:text-gray-200" />
                </motion.a>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 