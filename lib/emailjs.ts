// EmailJS configuration and utilities

import { sendForm } from '@emailjs/browser'
import { EMAILJS_CONFIG } from '@/constants'
import { ContactFormData } from '@/types'

/**
 * Sends an email using EmailJS
 */
export const sendEmail = async (
  form: HTMLFormElement
): Promise<{ success: boolean; message: string }> => {
  try {
    const result = await sendForm(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateId,
      form,
      EMAILJS_CONFIG.publicKey
    )
    
    console.log('Email sent successfully:', result.text)
    
    return {
      success: true,
      message: 'Message sent successfully! I\'ll get back to you soon.',
    }
  } catch (error) {
    console.error('EmailJS error:', error)
    
    return {
      success: false,
      message: 'Failed to send message. Please try again or email me directly at moiz.amjad37@gmail.com',
    }
  }
}

/**
 * Validates the EmailJS configuration
 */
export const validateEmailJSConfig = (): boolean => {
  const { serviceId, templateId, publicKey } = EMAILJS_CONFIG
  
  if (!serviceId || !templateId || !publicKey) {
    console.error('EmailJS configuration is incomplete. Please check your environment variables.')
    return false
  }
  
  return true
}

/**
 * Validates contact form data
 */
export const validateContactForm = (data: ContactFormData): { isValid: boolean; errors: string[] } => {
  const errors: string[] = []
  
  if (!data.user_name.trim()) {
    errors.push('Name is required')
  }
  
  if (!data.user_email.trim()) {
    errors.push('Email is required')
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.user_email)) {
      errors.push('Please enter a valid email address')
    }
  }
  
  if (!data.message.trim()) {
    errors.push('Message is required')
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  }
} 