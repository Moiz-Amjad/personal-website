'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei'
import { motion } from 'framer-motion'
import { Suspense, useState, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'
import { usePerformanceMonitor } from '@/hooks/usePerformanceMonitor'
import TypeWriter from '../TypeWriter'

// Lazy load 3D components
import dynamic from 'next/dynamic'

const ParticleBackground = dynamic(() => import('../three/ParticleBackground'), {
  ssr: false,
  loading: () => null
})

const RealisticDragon = dynamic(() => import('../three/RealisticDragon'), {
  ssr: false,
  loading: () => null
})

const FlyingObjects = dynamic(() => import('../three/FlyingObjects'), {
  ssr: false,
  loading: () => null
})

const OpenGLBackground = dynamic(() => import('../three/OpenGLBackground'), {
  ssr: false,
  loading: () => null
})

const LightweightParticles = dynamic(() => import('../three/LightweightParticles'), {
  ssr: false,
  loading: () => null
})

export default function Hero() {
  const performance = usePerformanceMonitor()
  const [componentsLoaded, setComponentsLoaded] = useState({
    particles: false,
    dragons: false,
    objects: false,
    spheres: false
  })

  // Progressive loading of 3D components
  useEffect(() => {
    const loadComponents = () => {
      // Load particles first (lightest)
      setTimeout(() => {
        setComponentsLoaded(prev => ({ ...prev, particles: true }))
      }, 500)

      // Load spheres (medium complexity)
      setTimeout(() => {
        setComponentsLoaded(prev => ({ ...prev, spheres: true }))
      }, 1000)

      // Load dragons (heavy) only if performance allows
      if (performance.enable3D) {
        setTimeout(() => {
          setComponentsLoaded(prev => ({ ...prev, dragons: true }))
        }, 1500)
      }

      // Load flying objects last
      if (performance.enableComplexAnimations) {
        setTimeout(() => {
          setComponentsLoaded(prev => ({ ...prev, objects: true }))
        }, 2000)
      }
    }

    loadComponents()
  }, [performance.enable3D, performance.enableComplexAnimations])

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Background - Progressive Loading */}
      {performance.enable3D && (
        <div className="absolute inset-0 z-0">
          <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
            <ambientLight intensity={0.3} />
            <directionalLight position={[10, 10, 5]} intensity={0.8} />
            <pointLight position={[-10, -10, -5]} intensity={0.5} color="#8B5CF6" />
            
            {/* OpenGL Background - Load first */}
            <Suspense fallback={null}>
              <OpenGLBackground variant="particles" intensity={0.4} />
            </Suspense>
            
            {/* Particles - Progressive loading */}
            {componentsLoaded.particles && (
              <Suspense fallback={null}>
                {performance.enableParticles ? (
                  performance.isMobile ? (
                    <LightweightParticles 
                      count={performance.particleCount} 
                      variant="minimal"
                    />
                  ) : (
                    <ParticleBackground />
                  )
                ) : null}
              </Suspense>
            )}
            
            {/* Spheres - Load after particles */}
            {componentsLoaded.spheres && (
              <>
                <Sphere args={[1, 100, 200]} scale={performance.isMobile ? 2 : 2.5} position={[2, 0, 0]}>
                  <MeshDistortMaterial
                    color="#3B82F6"
                    attach="material"
                    distort={performance.quality === 'low' ? 0.3 : 0.5}
                    speed={2 * performance.animationSpeed}
                    roughness={0}
                    opacity={performance.isMobile ? 0.6 : 0.8}
                    transparent
                  />
                </Sphere>
                <Sphere args={[1, 100, 200]} scale={performance.isMobile ? 1.2 : 1.5} position={[-3, 1, -2]}>
                  <MeshDistortMaterial
                    color="#8B5CF6"
                    attach="material"
                    distort={performance.quality === 'low' ? 0.2 : 0.3}
                    speed={3 * performance.animationSpeed}
                    roughness={0}
                    opacity={performance.isMobile ? 0.4 : 0.6}
                    transparent
                  />
                </Sphere>
              </>
            )}
            
            {/* Dragons - Load only on capable devices */}
            {componentsLoaded.dragons && performance.enable3D && !performance.isLowPerformance && (
              <Suspense fallback={null}>
                <RealisticDragon 
                  position={[4, 2, -3]} 
                  scale={performance.isMobile ? 0.2 : 0.3} 
                  speed={0.8 * performance.animationSpeed} 
                />
                <RealisticDragon 
                  position={[-4, -1, 2]} 
                  scale={performance.isMobile ? 0.15 : 0.25} 
                  speed={1.2 * performance.animationSpeed} 
                />
              </Suspense>
            )}
            
            {/* Flying Objects - Load last, only if performance allows */}
            {componentsLoaded.objects && performance.enableComplexAnimations && (
              <Suspense fallback={null}>
                <FlyingObjects 
                  count={performance.isMobile ? 4 : 8} 
                  variant="mixed" 
                  speed={0.5 * performance.animationSpeed} 
                />
              </Suspense>
            )}
            
            <OrbitControls 
              enableZoom={false} 
              enablePan={false} 
              autoRotate={performance.enableComplexAnimations} 
              autoRotateSpeed={0.2 * performance.animationSpeed} 
            />
          </Canvas>
        </div>
      )}

      {/* Fallback background for low-performance devices */}
      {!performance.enable3D && (
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 opacity-20" />
      )}

      {/* Content */}
      <div className="relative z-10 text-center section-padding">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold mb-4"
        >
          Moiz Amjad
        </motion.h1>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-2xl md:text-3xl gradient-text mb-6"
        >
          Software Engineer
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto"
        >
          <TypeWriter
            phrases={[
              "Building performant, scalable web experiences.",
              "Creating innovative AI-powered solutions.",
              "Developing responsive full-stack applications.",
              "Transforming ideas into digital reality.",
              "Crafting beautiful user interfaces.",
              "Optimizing for performance and accessibility."
            ]}
            typingSpeed={performance.isMobile ? 60 : 80}
            deletingSpeed={performance.isMobile ? 30 : 40}
            pauseTime={performance.isMobile ? 1500 : 2000}
            className="text-lg md:text-xl"
          />
        </motion.div>
        <motion.a
          href="#contact"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          whileHover={{ scale: performance.enableComplexAnimations ? 1.05 : 1.02 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block px-8 py-3 bg-primary text-white rounded-full font-medium hover:bg-primary/90 transition-colors"
        >
          Get In Touch
        </motion.a>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={performance.enableComplexAnimations ? { y: [0, 10, 0] } : {}}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ChevronDown size={32} className="text-gray-400" />
        </motion.div>
      </motion.div>
    </section>
  )
} 