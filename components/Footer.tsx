'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="py-8 section-padding bg-gray-100 dark:bg-gray-900">
      <div className="max-width">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <p className="text-gray-600 dark:text-gray-400 mb-4 md:mb-0">
            © 2025 Moiz Amjad. All rights reserved.
          </p>
          
          <div className="flex space-x-4">
            <motion.a
              href="https://github.com/Moiz-Amjad"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="text-gray-600 dark:text-gray-400 hover:text-primary"
            >
              <Github size={20} />
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/moiz-amjad/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="text-gray-600 dark:text-gray-400 hover:text-primary"
            >
              <Linkedin size={20} />
            </motion.a>
            <motion.a
              href="mailto:moiz.amjad37@gmail.com"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="text-gray-600 dark:text-gray-400 hover:text-primary"
            >
              <Mail size={20} />
            </motion.a>
          </div>
        </div>
      </div>
    </footer>
  )
} 