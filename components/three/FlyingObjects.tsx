'use client'

import { useRef, useMemo, memo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sphere, Box, Torus } from '@react-three/drei'
import * as THREE from 'three'

interface FlyingObjectsProps {
  count?: number
  variant?: 'butterflies' | 'orbs' | 'geometric' | 'mixed'
  color1?: string
  color2?: string
  speed?: number
}

function FlyingObjects({
  count = 6,
  variant = 'mixed',
  color1 = '#8B5CF6',
  color2 = '#3B82F6',
  speed = 1
}: FlyingObjectsProps) {
  const groupRef = useRef<THREE.Group>(null!)

  // Generate random positions and properties for flying objects
  const objects = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      position: [
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 20
      ] as [number, number, number],
      scale: 0.1 + Math.random() * 0.3,
      speed: 0.5 + Math.random() * 1.5,
      type: Math.floor(Math.random() * 4), // 0: butterfly, 1: orb, 2: geometric, 3: sparkle
      color: Math.random() > 0.5 ? color1 : color2,
      offset: Math.random() * Math.PI * 2
    }))
  }, [count, color1, color2])

  useFrame((state) => {
    if (!groupRef.current) return

    groupRef.current.children.forEach((child, index) => {
      const obj = objects[index]
      if (!obj || !child) return

      const time = state.clock.elapsedTime * speed * obj.speed + obj.offset
      
      // Different movement patterns for different objects
      switch (obj.type) {
        case 0: // Butterfly pattern - figure 8
          child.position.x = obj.position[0] + Math.sin(time) * 3
          child.position.y = obj.position[1] + Math.sin(time * 2) * 1.5
          child.position.z = obj.position[2] + Math.cos(time) * 2
          child.rotation.y = time * 0.5
          child.rotation.z = Math.sin(time * 4) * 0.2
          break
          
        case 1: // Orb pattern - floating
          child.position.x = obj.position[0] + Math.sin(time * 0.7) * 2
          child.position.y = obj.position[1] + Math.cos(time * 0.5) * 2
          child.position.z = obj.position[2] + Math.sin(time * 0.3) * 1.5
          child.rotation.x = time * 0.3
          child.rotation.y = time * 0.4
          break
          
        case 2: // Geometric pattern - orbiting
          const radius = 4
          child.position.x = obj.position[0] + Math.cos(time) * radius
          child.position.y = obj.position[1] + Math.sin(time * 0.5) * 1
          child.position.z = obj.position[2] + Math.sin(time) * radius
          child.rotation.x = time
          child.rotation.y = time * 1.5
          child.rotation.z = time * 0.5
          break
          
        case 3: // Sparkle pattern - random drift
          child.position.x = obj.position[0] + Math.sin(time * 0.3) * 5
          child.position.y = obj.position[1] + Math.cos(time * 0.4) * 3
          child.position.z = obj.position[2] + Math.sin(time * 0.6) * 4
          child.rotation.x = time * 2
          child.rotation.y = time * 3
          break
      }
    })
  })

  const renderButterfly = useMemo(() => (obj: any, index: number) => (
    <group key={`butterfly-${index}`}>
      {/* Body */}
      <Box args={[0.1, 0.8, 0.1]} position={[0, 0, 0]}>
        <meshStandardMaterial color={obj.color} />
      </Box>
      {/* Wings */}
      <Sphere args={[0.3, 8, 6]} position={[-0.2, 0.2, 0]} scale={[0.8, 0.6, 0.1]}>
        <meshStandardMaterial color={obj.color} transparent opacity={0.7} />
      </Sphere>
      <Sphere args={[0.3, 8, 6]} position={[0.2, 0.2, 0]} scale={[0.8, 0.6, 0.1]}>
        <meshStandardMaterial color={obj.color} transparent opacity={0.7} />
      </Sphere>
      <Sphere args={[0.2, 8, 6]} position={[-0.15, -0.2, 0]} scale={[0.6, 0.4, 0.1]}>
        <meshStandardMaterial color={obj.color} transparent opacity={0.7} />
      </Sphere>
      <Sphere args={[0.2, 8, 6]} position={[0.15, -0.2, 0]} scale={[0.6, 0.4, 0.1]}>
        <meshStandardMaterial color={obj.color} transparent opacity={0.7} />
      </Sphere>
    </group>
  ), [])

  const renderOrb = useMemo(() => (obj: any, index: number) => (
    <Sphere key={`orb-${index}`} args={[0.2]}>
      <meshStandardMaterial 
        color={obj.color} 
        emissive={obj.color} 
        emissiveIntensity={0.3}
        transparent 
        opacity={0.8}
      />
    </Sphere>
  ), [])

  const renderGeometric = useMemo(() => (obj: any, index: number) => {
    const shapes = [
      <Box key={`geo-box-${index}`} args={[0.3, 0.3, 0.3]}>
        <meshStandardMaterial color={obj.color} wireframe />
      </Box>,
      <Torus key={`geo-torus-${index}`} args={[0.3, 0.1, 8, 16]}>
        <meshStandardMaterial color={obj.color} wireframe />
      </Torus>,
      <Sphere key={`geo-sphere-${index}`} args={[0.25]}>
        <meshStandardMaterial color={obj.color} wireframe />
      </Sphere>
    ]
    return shapes[index % 3]
  }, [])

  const renderSparkle = useMemo(() => (obj: any, index: number) => (
    <group key={`sparkle-${index}`}>
      <Sphere args={[0.05]}>
        <meshStandardMaterial 
          color={obj.color} 
          emissive={obj.color} 
          emissiveIntensity={0.8}
        />
      </Sphere>
      {/* Sparkle rays */}
      <Box args={[0.02, 0.4, 0.02]}>
        <meshStandardMaterial color={obj.color} emissive={obj.color} emissiveIntensity={0.5} />
      </Box>
      <Box args={[0.4, 0.02, 0.02]}>
        <meshStandardMaterial color={obj.color} emissive={obj.color} emissiveIntensity={0.5} />
      </Box>
      <Box args={[0.02, 0.02, 0.4]}>
        <meshStandardMaterial color={obj.color} emissive={obj.color} emissiveIntensity={0.5} />
      </Box>
    </group>
  ), [])

  return (
    <group ref={groupRef}>
      {objects.map((obj, index) => (
        <group 
          key={obj.id} 
          position={obj.position} 
          scale={obj.scale}
        >
          {variant === 'butterflies' && renderButterfly(obj, index)}
          {variant === 'orbs' && renderOrb(obj, index)}
          {variant === 'geometric' && renderGeometric(obj, index)}
          {variant === 'mixed' && (
            <>
              {obj.type === 0 && renderButterfly(obj, index)}
              {obj.type === 1 && renderOrb(obj, index)}
              {obj.type === 2 && renderGeometric(obj, index)}
              {obj.type === 3 && renderSparkle(obj, index)}
            </>
          )}
        </group>
      ))}
    </group>
  )
}

// Memoize the component to prevent unnecessary re-renders
export default memo(FlyingObjects) 