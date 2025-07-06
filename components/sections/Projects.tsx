'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import LazyCanvas from '../three/LazyCanvas'
import { ExternalLink, Github, Sparkles, Bot, Calculator, Users, MessageCircle, DollarSign, Receipt } from 'lucide-react'
import OpenGLBackground from '../three/OpenGLBackground'
import RealisticDragon from '../three/RealisticDragon'
import FlyingObjects from '../three/FlyingObjects'

const projects = [
  {
    title: 'AI Support Bot',
    description: 'GPT-4 powered support bot with Pinecone RAG pipeline for intelligent customer assistance',
    tech: ['GPT-4', 'Pinecone', 'React', 'Node.js', 'TypeScript'],
    live: 'https://ai-support-bot.vercel.app',
    github: 'https://github.com/Moiz-Amjad/ai-support-bot',
    image: '/api/placeholder/600/400',
    icon: Bot,
    iconColor: 'text-blue-500',
    accentColor: 'from-blue-500 to-cyan-500',
    secondaryIcons: [MessageCircle, Sparkles],
  },
  {
    title: 'Splitwise Clone',
    description: 'Full-stack expense sharing application with real-time updates and group management',
    tech: ['React', 'Firebase', 'Node.js', 'Material-UI', 'Redux'],
    live: 'https://splitwiseapp2023.netlify.app',
    github: 'https://github.com/Moiz-Amjad/splitwise-clone',
    image: '/api/placeholder/600/400',
    icon: Calculator,
    iconColor: 'text-green-500',
    accentColor: 'from-green-500 to-emerald-500',
    secondaryIcons: [Users, DollarSign, Receipt],
  },
]

export default function Projects() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  return (
    <section 
      id="projects" 
      className="py-20 section-padding relative overflow-hidden"
      aria-labelledby="projects-heading"
      role="region"
    >
      {/* 3D Background */}
      <div className="absolute inset-0 z-0 opacity-25" aria-hidden="true">
        <LazyCanvas camera={{ position: [0, 0, 12], fov: 45 }}>
          <ambientLight intensity={0.3} />
          <directionalLight position={[8, 8, 5]} intensity={0.7} />
          <OpenGLBackground variant="waves" intensity={0.4} />
          <RealisticDragon position={[-5, 3, -2]} scale={0.25} speed={0.9} />
          <RealisticDragon position={[7, -2, 1]} scale={0.2} speed={0.7} />
          <FlyingObjects count={6} variant="orbs" speed={0.8} />
        </LazyCanvas>
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-20 right-20 w-40 h-40 bg-purple-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-60 h-60 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
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
              <Sparkles className="w-8 h-8 text-white" />
            </motion.div>
            <h2 id="projects-heading" className="text-3xl md:text-4xl font-bold gradient-text">
              Featured Projects
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mt-4">
              A showcase of my recent work and creative solutions
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => {
              const MainIcon = project.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  whileHover={{ y: -3, scale: 1.005 }}
                  className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-100 border border-gray-300 dark:border-gray-600 focus-within:ring-2 focus-within:ring-purple-500 focus-within:ring-offset-2"
                  role="article"
                  aria-labelledby={`project-title-${index}`}
                >
                  <div className={`relative h-48 bg-gradient-to-br ${project.accentColor} overflow-hidden`}>
                    {/* Project Logo and Icons */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={inView ? { scale: 1, rotate: 0 } : {}}
                        transition={{ duration: 0.8, delay: index * 0.2 + 0.3 }}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="relative transition-transform duration-100"
                      >
                        <MainIcon size={64} className="text-white/90 drop-shadow-lg" />
                        
                        {/* Secondary icons floating around */}
                        {project.secondaryIcons.map((Icon, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={inView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ duration: 0.6, delay: index * 0.2 + 0.5 + i * 0.2 }}
                            whileHover={{ scale: 1.2, y: -2 }}
                            className={`absolute transition-transform duration-80 ${
                              i === 0 ? 'top-2 -right-8' : 
                              i === 1 ? 'bottom-2 -left-8' : 
                              'top-8 -left-12'
                            }`}
                          >
                            <Icon size={24} className="text-white/60 animate-float" style={{ animationDelay: `${i * 0.5}s` }} />
                          </motion.div>
                        ))}
                      </motion.div>
                    </div>
                    
                    {/* Animated background pattern */}
                    <div className="absolute inset-0 opacity-20" aria-hidden="true">
                      <div className="absolute top-4 left-4 w-8 h-8 bg-white rounded-full animate-float"></div>
                      <div className="absolute top-8 right-8 w-6 h-6 bg-white rounded-full animate-float delay-300"></div>
                      <div className="absolute bottom-4 left-1/2 w-4 h-4 bg-white rounded-full animate-float delay-700"></div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 
                        id={`project-title-${index}`}
                        className="text-xl font-semibold group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-100 text-gray-900 dark:text-gray-100"
                      >
                        {project.title}
                      </h3>
                      <div className="flex space-x-1" aria-hidden="true">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-150"></div>
                        <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse delay-300"></div>
                      </div>
                    </div>
                    
                    <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-6" role="list" aria-label="Technologies used">
                      {project.tech.map((tech, i) => (
                        <motion.span
                          key={i}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={inView ? { opacity: 1, scale: 1 } : {}}
                          transition={{ duration: 0.3, delay: 0.5 + i * 0.1 }}
                          whileHover={{ scale: 1.05 }}
                          className="px-3 py-1 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 text-sm rounded-full hover:from-purple-100 hover:to-blue-100 dark:hover:from-purple-900 dark:hover:to-blue-900 transition-all duration-100 text-gray-800 dark:text-gray-200"
                          role="listitem"
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                    
                    <div className="flex space-x-4">
                      <motion.a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05, x: 5 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.08 }}
                        className="flex items-center text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium transition-colors duration-100 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 rounded-md px-2 py-1"
                        aria-label={`View live demo of ${project.title}`}
                      >
                        <ExternalLink size={18} className="mr-2" aria-hidden="true" />
                        Live Demo
                      </motion.a>
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05, x: 5 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.08 }}
                        className="flex items-center text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 font-medium transition-colors duration-100 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 rounded-md px-2 py-1"
                        aria-label={`View source code of ${project.title} on GitHub`}
                      >
                        <Github size={18} className="mr-2" aria-hidden="true" />
                        Source Code
                      </motion.a>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
} 