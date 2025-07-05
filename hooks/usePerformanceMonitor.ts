import { useState, useEffect } from 'react'

interface PerformanceSettings {
  quality: 'low' | 'medium' | 'high'
  particleCount: number
  animationSpeed: number
  enable3D: boolean
  enableParticles: boolean
  enableComplexAnimations: boolean
}

// Type for battery API
interface BatteryManager {
  level: number
  charging: boolean
}

// Extend Navigator interface
declare global {
  interface Navigator {
    getBattery?: () => Promise<BatteryManager>
    deviceMemory?: number
    connection?: {
      effectiveType: string
    }
  }
}

export function usePerformanceMonitor() {
  const [settings, setSettings] = useState<PerformanceSettings>({
    quality: 'medium',
    particleCount: 100,
    animationSpeed: 1,
    enable3D: true,
    enableParticles: true,
    enableComplexAnimations: true
  })

  const [isLowPerformance, setIsLowPerformance] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const detectPerformance = () => {
      // Device detection
      const isMobileDevice = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      const isSmallScreen = window.innerWidth < 768
      const isSlowConnection = 'connection' in navigator && 
        (navigator.connection?.effectiveType === 'slow-2g' || navigator.connection?.effectiveType === '2g')

      setIsMobile(isMobileDevice || isSmallScreen)

      // Performance indicators
      const deviceMemory = navigator.deviceMemory || 4 // Default to 4GB if not available
      const hardwareConcurrency = navigator.hardwareConcurrency || 4
      const isLowMemory = deviceMemory < 4
      const isLowCPU = hardwareConcurrency < 4

      // Battery level (if available)
      let isBatteryLow = false
      if (navigator.getBattery) {
        navigator.getBattery().then((battery: BatteryManager) => {
          isBatteryLow = battery.level < 0.3 && !battery.charging
        }).catch(() => {
          // Battery API not supported, ignore
        })
      }

      const isLowPerf = isMobileDevice || isLowMemory || isLowCPU || isSlowConnection || isBatteryLow

      setIsLowPerformance(isLowPerf)

      // Adjust settings based on performance
      if (isLowPerf) {
        setSettings({
          quality: 'low',
          particleCount: 30,
          animationSpeed: 0.5,
          enable3D: !isMobileDevice, // Disable 3D on mobile
          enableParticles: !isMobileDevice,
          enableComplexAnimations: false
        })
      } else if (isMobileDevice) {
        setSettings({
          quality: 'medium',
          particleCount: 50,
          animationSpeed: 0.8,
          enable3D: true,
          enableParticles: true,
          enableComplexAnimations: true
        })
      } else {
        setSettings({
          quality: 'high',
          particleCount: 150,
          animationSpeed: 1,
          enable3D: true,
          enableParticles: true,
          enableComplexAnimations: true
        })
      }
    }

    detectPerformance()

    // Re-evaluate on resize
    window.addEventListener('resize', detectPerformance)
    return () => window.removeEventListener('resize', detectPerformance)
  }, [])

  // Performance monitoring during runtime
  useEffect(() => {
    let frameCount = 0
    let lastTime = performance.now()
    let fps = 60

    const measureFPS = () => {
      frameCount++
      const currentTime = performance.now()
      
      if (currentTime - lastTime >= 1000) {
        fps = Math.round((frameCount * 1000) / (currentTime - lastTime))
        frameCount = 0
        lastTime = currentTime

        // Adjust quality based on FPS
        if (fps < 30 && settings.quality !== 'low') {
          setSettings(prev => ({
            ...prev,
            quality: 'low',
            particleCount: Math.max(20, prev.particleCount * 0.5),
            animationSpeed: prev.animationSpeed * 0.8,
            enableComplexAnimations: false
          }))
        } else if (fps > 50 && settings.quality === 'low') {
          setSettings(prev => ({
            ...prev,
            quality: 'medium',
            particleCount: Math.min(100, prev.particleCount * 1.5),
            animationSpeed: Math.min(1, prev.animationSpeed * 1.2),
            enableComplexAnimations: true
          }))
        }
      }

      requestAnimationFrame(measureFPS)
    }

    const rafId = requestAnimationFrame(measureFPS)
    return () => cancelAnimationFrame(rafId)
  }, [settings])

  return {
    ...settings,
    isLowPerformance,
    isMobile,
    fps: 60 // You could expose actual FPS if needed
  }
} 