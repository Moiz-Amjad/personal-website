'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Mail, MessageSquare, User, Send, AlertCircle } from 'lucide-react'
import { sendEmail, validateContactForm } from '@/lib/emailjs'
import { validateEmail } from '@/utils'
import { ContactFormData, StatusType } from '@/types'
import { SITE_CONFIG } from '@/constants'

export default function Contact() {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  })

  const form = useRef<HTMLFormElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [statusMessage, setStatusMessage] = useState('')
  const [statusType, setStatusType] = useState<StatusType>('')
  const [emailError, setEmailError] = useState('')
  const [formData, setFormData] = useState<ContactFormData>({
    user_name: '',
    user_email: '',
    message: ''
  })

  // Handle input changes with validation
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))

    // Real-time email validation
    if (name === 'user_email') {
      if (value && !validateEmail(value)) {
        setEmailError('Please enter a valid email address')
      } else {
        setEmailError('')
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!form.current) return

    // Validate email before submission
    if (!validateEmail(formData.user_email)) {
      setEmailError('Please enter a valid email address')
      return
    }

    // Check all required fields
    if (!formData.user_name.trim() || !formData.user_email.trim() || !formData.message.trim()) {
      setStatusMessage('Please fill in all required fields')
      setStatusType('error')
      return
    }
    
    setIsSubmitting(true)
    setStatusMessage('')
    setStatusType('')
    setEmailError('')

    try {
      // Send email using the centralized email service
      const result = await sendEmail(form.current)
      
      if (result.success) {
        setStatusMessage(result.message)
        setStatusType('success')
        form.current.reset()
        setFormData({ user_name: '', user_email: '', message: '' })
      } else {
        setStatusMessage(result.message)
        setStatusType('error')
      }
    } catch (error) {
      console.error('Email sending error:', error)
      setStatusMessage(`Failed to send message. Please try again or email me directly at ${SITE_CONFIG.email}`)
      setStatusType('error')
    } finally {
      setIsSubmitting(false)
      // Clear status message after 5 seconds
      setTimeout(() => {
        setStatusMessage('')
        setStatusType('')
      }, 5000)
    }
  }

  return (
    <section 
      id="contact" 
      className="py-20 section-padding bg-gray-50 dark:bg-gray-900/50"
      aria-labelledby="contact-heading"
      role="region"
    >
      <div className="max-width">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto"
        >
          <h2 id="contact-heading" className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900 dark:text-gray-100">
            Get In Touch
          </h2>
          <p className="text-center text-gray-800 dark:text-gray-300 mb-12 text-lg font-medium">
            Have a question or want to work together? Feel free to reach out!
          </p>
          
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-300 dark:border-gray-600">
            <div className="text-center mb-6">
              <a 
                href="mailto:moiz.amjad37@gmail.com" 
                className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 hover:underline font-medium text-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 rounded-md px-2 py-1"
                aria-label="Send email to moiz.amjad37@gmail.com"
              >
                moiz.amjad37@gmail.com
              </a>
            </div>
            
            <form 
              ref={form} 
              onSubmit={handleSubmit} 
              className="space-y-6"
              aria-label="Contact form"
              noValidate
            >
              <div>
                <label 
                  htmlFor="user_name"
                  className="flex items-center text-sm font-medium mb-2 text-gray-800 dark:text-gray-200"
                >
                  <User size={16} className="mr-2 text-purple-600 dark:text-purple-400" aria-hidden="true" />
                  Name *
                </label>
                <input
                  type="text"
                  id="user_name"
                  name="user_name"
                  value={formData.user_name}
                  onChange={handleInputChange}
                  required
                  aria-required="true"
                  aria-describedby="name-error"
                  className="w-full px-4 py-3 border border-gray-400 dark:border-gray-500 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200"
                  placeholder="Your full name"
                />
                <div id="name-error" className="sr-only" aria-live="polite"></div>
              </div>
              
              <div>
                <label 
                  htmlFor="user_email"
                  className="flex items-center text-sm font-medium mb-2 text-gray-800 dark:text-gray-200"
                >
                  <Mail size={16} className="mr-2 text-purple-600 dark:text-purple-400" aria-hidden="true" />
                  Email *
                </label>
                <input
                  type="email"
                  id="user_email"
                  name="user_email"
                  value={formData.user_email}
                  onChange={handleInputChange}
                  required
                  aria-required="true"
                  aria-describedby="email-error"
                  className={`w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200 ${
                    emailError 
                      ? 'border-red-500 dark:border-red-400' 
                      : 'border-gray-400 dark:border-gray-500'
                  }`}
                  placeholder="your.email@example.com"
                />
                {emailError && (
                  <div className="flex items-center mt-2 text-red-600 dark:text-red-400 text-sm" id="email-error" aria-live="polite">
                    <AlertCircle size={16} className="mr-2" aria-hidden="true" />
                    {emailError}
                  </div>
                )}
              </div>
              
              <div>
                <label 
                  htmlFor="message"
                  className="flex items-center text-sm font-medium mb-2 text-gray-800 dark:text-gray-200"
                >
                  <MessageSquare size={16} className="mr-2 text-purple-600 dark:text-purple-400" aria-hidden="true" />
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  aria-required="true"
                  aria-describedby="message-error message-help"
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-400 dark:border-gray-500 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 resize-none transition-colors duration-200"
                  placeholder="Tell me about your project or question..."
                />
                <div id="message-help" className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  Please provide as much detail as possible to help me understand your needs.
                </div>
                <div id="message-error" className="sr-only" aria-live="polite"></div>
              </div>

              {/* Status Message */}
              {statusMessage && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-lg text-center font-medium ${
                    statusType === 'success' 
                      ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 border border-green-300 dark:border-green-700' 
                      : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 border border-red-300 dark:border-red-700'
                  }`}
                  role="alert"
                  aria-live="polite"
                >
                  {statusMessage}
                </motion.div>
              )}
              
              <motion.button
                type="submit"
                disabled={isSubmitting || !!emailError || !formData.user_name.trim() || !formData.user_email.trim() || !formData.message.trim()}
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                className={`w-full py-4 rounded-lg font-medium transition-all flex items-center justify-center text-lg ${
                  isSubmitting || !!emailError || !formData.user_name.trim() || !formData.user_email.trim() || !formData.message.trim()
                    ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed text-gray-700 dark:text-gray-300' 
                    : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2'
                }`}
                aria-describedby={isSubmitting ? 'submitting-status' : undefined}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-current mr-2" aria-hidden="true"></div>
                    <span id="submitting-status">Sending message...</span>
                  </>
                ) : (
                  <>
                    <Send size={18} className="mr-2" aria-hidden="true" />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>

            {/* Additional contact information */}
            <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
              <div className="text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Prefer a different method? You can also reach me at:
                </p>
                <div className="flex justify-center space-x-4 text-sm">
                  <a 
                    href="https://www.linkedin.com/in/moiz-amjad/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 hover:underline focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 rounded-md px-2 py-1"
                    aria-label="Connect with me on LinkedIn"
                  >
                    LinkedIn
                  </a>
                  <span className="text-gray-400 dark:text-gray-600">•</span>
                  <a 
                    href="https://github.com/Moiz-Amjad" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 hover:underline focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 rounded-md px-2 py-1"
                    aria-label="View my projects on GitHub"
                  >
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 