'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei'
import { motion } from 'framer-motion'
import ParticleBackground from '../three/ParticleBackground'
import RealisticDragon from '../three/RealisticDragon'
import FlyingObjects from '../three/FlyingObjects'
import OpenGLBackground from '../three/OpenGLBackground'
import TypeWriter from '../TypeWriter'
import { ChevronDown } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <ambientLight intensity={0.3} />
          <directionalLight position={[10, 10, 5]} intensity={0.8} />
          <pointLight position={[-10, -10, -5]} intensity={0.5} color="#8B5CF6" />
          
          {/* OpenGL Background */}
          <OpenGLBackground variant="particles" intensity={0.4} />
          
          {/* Original elements */}
          <ParticleBackground />
          <Sphere args={[1, 100, 200]} scale={2.5} position={[2, 0, 0]}>
            <MeshDistortMaterial
              color="#3B82F6"
              attach="material"
              distort={0.5}
              speed={2}
              roughness={0}
              opacity={0.8}
              transparent
            />
          </Sphere>
          <Sphere args={[1, 100, 200]} scale={1.5} position={[-3, 1, -2]}>
            <MeshDistortMaterial
              color="#8B5CF6"
              attach="material"
              distort={0.3}
              speed={3}
              roughness={0}
              opacity={0.6}
              transparent
            />
          </Sphere>
          
          {/* Dragons */}
          <RealisticDragon position={[4, 2, -3]} scale={0.3} speed={0.8} />
          <RealisticDragon position={[-4, -1, 2]} scale={0.25} speed={1.2} />
          
          {/* Flying Objects */}
          <FlyingObjects count={8} variant="mixed" speed={0.5} />
          
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.2} />
        </Canvas>
      </div>

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
            typingSpeed={80}
            deletingSpeed={40}
            pauseTime={2000}
            className="text-lg md:text-xl"
          />
        </motion.div>
        <motion.a
          href="#contact"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
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
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ChevronDown size={32} className="text-gray-400" />
        </motion.div>
      </motion.div>
    </section>
  )
} 