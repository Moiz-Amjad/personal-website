'use client'

import { useRef, useMemo, memo, useEffect, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

interface LightweightParticlesProps {
  count?: number
  variant?: 'minimal' | 'standard' | 'enhanced'
  color?: string
  size?: number
  speed?: number
}

const LightweightParticles = memo(({ 
  count = 100, 
  variant = 'standard',
  color = '#8B5CF6',
  size = 0.02,
  speed = 0.5
}: LightweightParticlesProps) => {
  const pointsRef = useRef<THREE.Points>(null)
  const [isMobile, setIsMobile] = useState(false)

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Adjust particle count based on device and variant
  const adjustedCount = useMemo(() => {
    let baseCount = count
    
    if (isMobile) {
      baseCount = Math.min(baseCount, 50) // Limit particles on mobile
    }
    
    switch (variant) {
      case 'minimal':
        return Math.floor(baseCount * 0.3)
      case 'standard':
        return Math.floor(baseCount * 0.7)
      case 'enhanced':
        return baseCount
      default:
        return baseCount
    }
  }, [count, variant, isMobile])

  // Generate particle positions
  const positions = useMemo(() => {
    const positions = new Float32Array(adjustedCount * 3)
    
    for (let i = 0; i < adjustedCount; i++) {
      const i3 = i * 3
      positions[i3] = (Math.random() - 0.5) * 20
      positions[i3 + 1] = (Math.random() - 0.5) * 20
      positions[i3 + 2] = (Math.random() - 0.5) * 20
    }
    
    return positions
  }, [adjustedCount])

  // Generate random speeds for each particle
  const speeds = useMemo(() => {
    return new Float32Array(adjustedCount).map(() => Math.random() * 0.02 + 0.01)
  }, [adjustedCount])

  useFrame((state) => {
    if (!pointsRef.current) return

    const time = state.clock.getElapsedTime() * speed
    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array

    for (let i = 0; i < adjustedCount; i++) {
      const i3 = i * 3
      const particleSpeed = speeds[i]
      
      // Simple floating motion
      positions[i3 + 1] += Math.sin(time + i) * particleSpeed * 0.1
      
      // Gentle rotation
      const angle = time * particleSpeed
      const radius = 0.5
      positions[i3] += Math.cos(angle) * radius * particleSpeed * 0.05
      positions[i3 + 2] += Math.sin(angle) * radius * particleSpeed * 0.05
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={color}
        size={isMobile ? size * 0.5 : size}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={isMobile ? 0.3 : 0.6}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  )
})

LightweightParticles.displayName = 'LightweightParticles'

export default LightweightParticles 