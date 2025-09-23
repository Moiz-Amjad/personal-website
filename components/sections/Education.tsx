'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { GraduationCap, Award, BookOpen, Trophy, Star, Medal, Crown } from 'lucide-react'

const awards = [
  {
    name: 'National Grid Scholarship',
    description: 'Merit-based scholarship for outstanding academic performance',
    icon: Crown,
    color: 'from-yellow-400 to-orange-500',
    year: '2024',
  },
  {
    name: 'Kannankote Sri Scholarship',
    description: 'Academic excellence recognition in Computer Science',
    icon: Trophy,
    color: 'from-purple-400 to-pink-500',
    year: '2023',
  },
  {
    name: 'Shorelight Scholarship',
    description: 'International student academic achievement award',
    icon: Star,
    color: 'from-blue-400 to-cyan-500',
    year: '2022',
  },
  {
    name: 'Academic Recognition Award',
    description: 'Dean\'s list recognition for academic excellence',
    icon: Medal,
    color: 'from-green-400 to-emerald-500',
    year: '2023',
  },
]

export default function Education() {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  })

  return (
    <section 
      id="education" 
      className="py-20 section-padding relative overflow-hidden bg-transparent"
      aria-labelledby="education-heading"
      role="region"
    >
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
              <BookOpen className="w-8 h-8 text-white" />
            </motion.div>
            <h2 id="education-heading" className="text-3xl md:text-4xl font-bold gradient-text">
              Education & Achievements
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mt-4 glass-text-light">
              Academic journey and recognition
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Education Card */}
            <motion.div
              initial={{ opacity: 0, x: -50, rotateY: 20 }}
              animate={inView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="glass-card p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-80 group relative overflow-hidden"
              role="article"
              aria-labelledby="education-title"
            >
              {/* Animated corner accents */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-blue-500" aria-hidden="true"></div>
              <div className="absolute top-2 right-2 w-3 h-3 bg-purple-500 rounded-full animate-pulse" aria-hidden="true"></div>
              <div className="absolute bottom-2 left-2 w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-300" aria-hidden="true"></div>
              
              <div className="relative z-10">
                <div className="flex items-center mb-6">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.2 }}
                    className="p-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mr-4"
                    aria-hidden="true"
                  >
                    <GraduationCap className="text-white" size={24} />
                  </motion.div>
                  <h3 id="education-title" className="text-2xl font-semibold group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-80">
                    Education
                  </h3>
                </div>
                
                <div className="space-y-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <h4 className="text-xl font-medium mb-2 text-gray-900 dark:text-gray-100">
                      B.Sc. Computer Science (Honors)
                    </h4>
                    <p className="text-purple-600 dark:text-purple-400 font-semibold">
                      University of Massachusetts Boston
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 mb-2">Expected May 2026</p>
                    
                    <div className="flex items-center justify-between bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-lg p-3 border border-gray-300 dark:border-gray-600">
                      <span className="font-medium text-gray-800 dark:text-gray-200">GPA:</span>
                      <div className="flex items-center">
                        <span className="text-2xl font-bold gradient-text">3.8</span>
                        <span className="text-gray-700 dark:text-gray-300 ml-1">/4.0</span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
            
            {/* Awards Card */}
            <motion.div
              initial={{ opacity: 0, x: 50, rotateY: -20 }}
              animate={inView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="glass-card p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-80 group relative overflow-hidden"
              role="article"
              aria-labelledby="awards-title"
            >
              {/* Animated corner accents */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500" aria-hidden="true"></div>
              <div className="absolute top-2 left-2 w-3 h-3 bg-blue-500 rounded-full animate-pulse" aria-hidden="true"></div>
              <div className="absolute bottom-2 right-2 w-2 h-2 bg-purple-500 rounded-full animate-pulse delay-300" aria-hidden="true"></div>
              
              <div className="relative z-10">
                <div className="flex items-center mb-6">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.2 }}
                    className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mr-4"
                    aria-hidden="true"
                  >
                    <Trophy className="text-white" size={24} />
                  </motion.div>
                  <h3 id="awards-title" className="text-2xl font-semibold group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-80">
                    Awards & Scholarships
                  </h3>
                </div>
                
                <div className="space-y-4" role="list" aria-label="Awards and scholarships">
                  {awards.map((award, index) => {
                    const IconComponent = award.icon
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                        whileHover={{ x: 5, scale: 1.02 }}
                        className="relative group/award"
                        role="listitem"
                      >
                        <div className="flex items-start p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-lg hover:shadow-md transition-all duration-80 border border-gray-200 dark:border-gray-500">
                          {/* Award Icon */}
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={inView ? { scale: 1 } : {}}
                            transition={{ duration: 0.3, delay: 0.6 + index * 0.1 + 0.2 }}
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            className={`p-2 bg-gradient-to-r ${award.color} rounded-full mr-4 flex-shrink-0 shadow-lg transition-transform duration-80`}
                            aria-hidden="true"
                          >
                            <IconComponent className="w-5 h-5 text-white" />
                          </motion.div>
                          
                          {/* Award Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <h4 className="font-semibold text-gray-900 dark:text-gray-100 group-hover/award:text-purple-600 dark:group-hover/award:text-purple-400 transition-colors duration-80">
                                {award.name}
                              </h4>
                              <span className="text-xs font-medium text-gray-600 dark:text-gray-400 bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded-full">
                                {award.year}
                              </span>
                            </div>
                            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                              {award.description}
                            </p>
                          </div>
                        </div>
                        
                        {/* Hover glow effect */}
                        <div className={`absolute inset-0 bg-gradient-to-r ${award.color} opacity-0 group-hover/award:opacity-10 rounded-lg transition-opacity duration-80 pointer-events-none`} aria-hidden="true"></div>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Academic Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6"
            role="region"
            aria-labelledby="academic-stats"
          >
            <h3 id="academic-stats" className="sr-only">Academic Statistics</h3>
            <motion.div 
              whileHover={{ scale: 1.05, y: -2 }}
              transition={{ duration: 0.08 }}
              className="text-center p-6 glass-card rounded-xl hover:shadow-lg transition-all duration-80 group"
            >
              <div className="text-3xl font-bold gradient-text group-hover:scale-110 transition-transform duration-80" aria-label="3.8 GPA">
                3.8
              </div>
              <div className="text-sm text-gray-700 dark:text-gray-300 font-medium">GPA</div>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05, y: -2 }}
              transition={{ duration: 0.08 }}
              className="text-center p-6 glass-card rounded-xl hover:shadow-lg transition-all duration-80 group"
            >
              <div className="text-3xl font-bold gradient-text group-hover:scale-110 transition-transform duration-80" aria-label="4 scholarships">
                4
              </div>
              <div className="text-sm text-gray-700 dark:text-gray-300 font-medium">Scholarships</div>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05, y: -2 }}
              transition={{ duration: 0.08 }}
              className="text-center p-6 glass-card rounded-xl hover:shadow-lg transition-all duration-80 group"
            >
              <div className="text-3xl font-bold gradient-text group-hover:scale-110 transition-transform duration-80" aria-label="Graduation year 2026">
                May 2026
              </div>
              <div className="text-sm text-gray-700 dark:text-gray-300 font-medium">Graduation</div>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05, y: -2 }}
              transition={{ duration: 0.08 }}
              className="text-center p-6 glass-card rounded-xl hover:shadow-lg transition-all duration-80 group"
            >
              <div className="text-3xl font-bold gradient-text group-hover:scale-110 transition-transform duration-80" aria-label="Computer Science Honors">
                CS
              </div>
              <div className="text-sm text-gray-700 dark:text-gray-300 font-medium">Honors</div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
} 