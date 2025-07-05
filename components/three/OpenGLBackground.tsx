'use client'

import { useRef, useMemo, memo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sphere, Box, Torus } from '@react-three/drei'
import * as THREE from 'three'

interface OpenGLBackgroundProps {
  variant?: 'particles' | 'geometric' | 'waves' | 'minimal'
  color1?: string
  color2?: string
  intensity?: number
}

function OpenGLBackground({ 
  variant = 'particles',
  color1 = '#8B5CF6',
  color2 = '#3B82F6',
  intensity = 0.5
}: OpenGLBackgroundProps) {
  const particlesRef = useRef<THREE.Points>(null!)
  const geometryRef = useRef<THREE.Group>(null!)
  
  // Generate particles
  const particlesCount = variant === 'particles' ? 2000 : 500
  const positions = useMemo(() => {
    const positions = new Float32Array(particlesCount * 3)
    for (let i = 0; i < particlesCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 20     // x
      positions[i + 1] = (Math.random() - 0.5) * 20 // y
      positions[i + 2] = (Math.random() - 0.5) * 20 // z
    }
    return positions
  }, [particlesCount])

  const colors = useMemo(() => {
    const colors = new Float32Array(particlesCount * 3)
    const color1RGB = new THREE.Color(color1)
    const color2RGB = new THREE.Color(color2)
    
    for (let i = 0; i < particlesCount * 3; i += 3) {
      const mixFactor = Math.random()
      const mixedColor = color1RGB.clone().lerp(color2RGB, mixFactor)
      colors[i] = mixedColor.r
      colors[i + 1] = mixedColor.g
      colors[i + 2] = mixedColor.b
    }
    return colors
  }, [particlesCount, color1, color2])

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05
      particlesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1
    }

    if (geometryRef.current) {
      geometryRef.current.rotation.y = state.clock.elapsedTime * 0.1
      geometryRef.current.rotation.x = state.clock.elapsedTime * 0.05
    }
  })

  const renderParticles = useMemo(() => () => (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesCount}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particlesCount}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        sizeAttenuation
        transparent
        opacity={intensity * 0.6}
        vertexColors
        blending={THREE.AdditiveBlending}
      />
    </points>
  ), [particlesCount, positions, colors, intensity])

  const renderGeometric = useMemo(() => () => (
    <group ref={geometryRef}>
      {/* Floating geometric shapes */}
      {[...Array(8)].map((_, i) => (
        <group key={i} position={[
          (Math.random() - 0.5) * 15,
          (Math.random() - 0.5) * 15,
          (Math.random() - 0.5) * 15
        ]}>
          {i % 3 === 0 && (
            <Box args={[0.5, 0.5, 0.5]}>
              <meshStandardMaterial 
                color={i % 2 === 0 ? color1 : color2} 
                transparent 
                opacity={intensity * 0.3}
                wireframe
              />
            </Box>
          )}
          {i % 3 === 1 && (
            <Sphere args={[0.3]}>
              <meshStandardMaterial 
                color={i % 2 === 0 ? color1 : color2} 
                transparent 
                opacity={intensity * 0.3}
                wireframe
              />
            </Sphere>
          )}
          {i % 3 === 2 && (
            <Torus args={[0.4, 0.1, 8, 16]}>
              <meshStandardMaterial 
                color={i % 2 === 0 ? color1 : color2} 
                transparent 
                opacity={intensity * 0.3}
                wireframe
              />
            </Torus>
          )}
        </group>
      ))}
    </group>
  ), [color1, color2, intensity])

  const renderWaves = useMemo(() => () => {
    const waveGeometry = useMemo(() => {
      const geometry = new THREE.PlaneGeometry(20, 20, 32, 32)
      const positions = geometry.attributes.position.array as Float32Array
      
      for (let i = 0; i < positions.length; i += 3) {
        const x = positions[i]
        const y = positions[i + 1]
        positions[i + 2] = Math.sin(x * 0.5) * Math.cos(y * 0.5) * 0.5
      }
      
      geometry.attributes.position.needsUpdate = true
      return geometry
    }, [])

    return (
      <mesh geometry={waveGeometry} rotation={[-Math.PI / 2, 0, 0]}>
        <meshStandardMaterial 
          color={color1} 
          transparent 
          opacity={intensity * 0.2}
          wireframe
        />
      </mesh>
    )
  }, [color1, intensity])

  const renderMinimal = useMemo(() => () => (
    <group>
      {/* Simple floating orbs */}
      {[...Array(5)].map((_, i) => (
        <Sphere 
          key={i}
          args={[0.1]} 
          position={[
            Math.sin(i * 2) * 8,
            Math.cos(i * 1.5) * 6,
            Math.sin(i * 3) * 4
          ]}
        >
          <meshStandardMaterial 
            color={i % 2 === 0 ? color1 : color2} 
            transparent 
            opacity={intensity * 0.4}
            emissive={i % 2 === 0 ? color1 : color2}
            emissiveIntensity={0.1}
          />
        </Sphere>
      ))}
    </group>
  ), [color1, color2, intensity])

  return (
    <group>
      {/* Always render some particles for base atmosphere */}
      {renderParticles()}
      
      {/* Render variant-specific elements */}
      {variant === 'geometric' && renderGeometric()}
      {variant === 'waves' && renderWaves()}
      {variant === 'minimal' && renderMinimal()}
    </group>
  )
}

// Memoize the component to prevent unnecessary re-renders
export default memo(OpenGLBackground) 