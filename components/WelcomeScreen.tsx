'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei'

interface WelcomeScreenProps {
  onComplete: () => void
}

export default function WelcomeScreen({ onComplete }: WelcomeScreenProps) {
  const [progress, setProgress] = useState(0)
  const [showWelcome, setShowWelcome] = useState(true)

  const welcomeWords = ["Welcome", "to", "my", "portfolio"]

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          setTimeout(() => {
            setShowWelcome(false)
            setTimeout(onComplete, 800)
          }, 1000)
          return 100
        }
        return prev + 1.5
      })
    }, 60)

    return () => clearInterval(timer)
  }, [onComplete])

  if (!showWelcome) {
    return (
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900"
      />
    )
  }

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900"
    >
      {/* 3D Background */}
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <ambientLight intensity={0.3} />
          <directionalLight position={[10, 10, 5]} intensity={0.8} />
          <Sphere args={[1, 100, 200]} scale={1.5} position={[2, 0, 0]}>
            <MeshDistortMaterial
              color="#8B5CF6"
              attach="material"
              distort={0.4}
              speed={1.5}
              roughness={0}
              opacity={0.6}
              transparent
            />
          </Sphere>
          <Sphere args={[1, 100, 200]} scale={1} position={[-2, 1, -1]}>
            <MeshDistortMaterial
              color="#3B82F6"
              attach="material"
              distort={0.3}
              speed={2}
              roughness={0}
              opacity={0.8}
              transparent
            />
          </Sphere>
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <motion.h1 
            className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            MA
          </motion.h1>
          
          {/* Animated welcome text - word by word */}
          <div className="text-xl md:text-2xl text-gray-300 h-8 flex items-center justify-center space-x-3">
            {welcomeWords.map((word, index) => (
              <motion.span
                key={word}
                initial={{ 
                  y: -30, 
                  opacity: 0,
                  rotateX: -90
                }}
                animate={{ 
                  y: 0, 
                  opacity: 1,
                  rotateX: 0
                }}
                transition={{ 
                  duration: 0.6,
                  delay: 0.8 + index * 0.2,
                  ease: "easeOut",
                  type: "spring",
                  stiffness: 100
                }}
                className="inline-block"
                style={{
                  transformOrigin: "50% 50%",
                  transformStyle: "preserve-3d"
                }}
              >
                {word}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Loading Bar */}
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 256, opacity: 1 }}
          transition={{ duration: 0.8, delay: 2 }}
          className="w-64 h-2 bg-gray-700 rounded-full mx-auto mb-4 overflow-hidden"
        >
          <motion.div
            className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full relative"
            style={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          >
            {/* Glowing effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full blur-sm opacity-60"></div>
          </motion.div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2, duration: 0.6 }}
          className="text-gray-400 font-medium"
        >
          {Math.round(progress)}% Loading...
        </motion.p>

        {/* Enhanced Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -120, 0],
                opacity: [0.1, 0.8, 0.1],
                scale: [0.5, 1.2, 0.5],
              }}
              transition={{
                duration: 3 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 3,
                ease: "easeInOut"
              }}
            />
          ))}
          
          {/* Additional sparkle effects */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={`sparkle-${i}`}
              className="absolute w-1 h-1 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 4,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        {/* Pulse ring effect around the content */}
        <motion.div
          className="absolute inset-0 border-2 border-purple-500/20 rounded-full"
          style={{
            width: '120%',
            height: '120%',
            left: '-10%',
            top: '-10%'
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.1, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
    </motion.div>
  )
} 