'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sphere, Cone, Cylinder } from '@react-three/drei'
import * as THREE from 'three'

interface DragonProps {
  position?: [number, number, number]
  scale?: number
  color?: string
  speed?: number
}

export default function Dragon({ 
  position = [0, 0, 0], 
  scale = 1, 
  color = '#8B5CF6',
  speed = 1 
}: DragonProps) {
  const dragonRef = useRef<THREE.Group>(null!)
  const wingRef1 = useRef<THREE.Mesh>(null!)
  const wingRef2 = useRef<THREE.Mesh>(null!)
  const tailRef = useRef<THREE.Group>(null!)

  // Particle system for dragon breath/trail
  const particlesCount = 50
  const positions = useMemo(() => {
    const positions = new Float32Array(particlesCount * 3)
    for (let i = 0; i < particlesCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 2
    }
    return positions
  }, [particlesCount])

  useFrame((state) => {
    if (dragonRef.current) {
      // Main dragon movement - flying in a figure-8 pattern
      const time = state.clock.elapsedTime * speed * 0.5
      dragonRef.current.position.x = position[0] + Math.sin(time) * 3
      dragonRef.current.position.y = position[1] + Math.sin(time * 2) * 1.5
      dragonRef.current.position.z = position[2] + Math.cos(time) * 2
      
      // Dragon rotation for realistic flying
      dragonRef.current.rotation.y = Math.sin(time * 0.5) * 0.3
      dragonRef.current.rotation.z = Math.sin(time * 1.5) * 0.1
    }

    // Wing flapping animation
    if (wingRef1.current && wingRef2.current) {
      const wingFlap = Math.sin(state.clock.elapsedTime * speed * 8) * 0.5
      wingRef1.current.rotation.z = wingFlap
      wingRef2.current.rotation.z = -wingFlap
    }

    // Tail movement
    if (tailRef.current) {
      tailRef.current.rotation.y = Math.sin(state.clock.elapsedTime * speed * 3) * 0.3
    }
  })

  return (
    <group ref={dragonRef} position={position} scale={scale}>
      {/* Dragon Body */}
      <Cylinder args={[0.3, 0.5, 2]} position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color={color} metalness={0.3} roughness={0.4} />
      </Cylinder>

      {/* Dragon Head */}
      <Cone args={[0.4, 1]} position={[1.2, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <meshStandardMaterial color={color} metalness={0.3} roughness={0.4} />
      </Cone>

      {/* Dragon Eyes */}
      <Sphere args={[0.1]} position={[1.4, 0.2, 0.2]}>
        <meshStandardMaterial color="#ff0000" emissive="#ff0000" emissiveIntensity={0.5} />
      </Sphere>
      <Sphere args={[0.1]} position={[1.4, 0.2, -0.2]}>
        <meshStandardMaterial color="#ff0000" emissive="#ff0000" emissiveIntensity={0.5} />
      </Sphere>

      {/* Wings */}
      <mesh ref={wingRef1} position={[0, 0.5, 1]}>
        <planeGeometry args={[2, 1.5]} />
        <meshStandardMaterial 
          color={color} 
          transparent 
          opacity={0.7} 
          side={THREE.DoubleSide}
          metalness={0.2}
          roughness={0.8}
        />
      </mesh>
      <mesh ref={wingRef2} position={[0, 0.5, -1]}>
        <planeGeometry args={[2, 1.5]} />
        <meshStandardMaterial 
          color={color} 
          transparent 
          opacity={0.7} 
          side={THREE.DoubleSide}
          metalness={0.2}
          roughness={0.8}
        />
      </mesh>

      {/* Tail */}
      <group ref={tailRef} position={[-1.5, 0, 0]}>
        <Cylinder args={[0.1, 0.3, 1.5]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial color={color} metalness={0.3} roughness={0.4} />
        </Cylinder>
        <Cone args={[0.2, 0.8]} position={[-0.8, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
          <meshStandardMaterial color={color} metalness={0.3} roughness={0.4} />
        </Cone>
      </group>

      {/* Particle trail */}
      <points position={[-2, 0, 0]}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particlesCount}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.05}
          color={color}
          sizeAttenuation
          transparent
          opacity={0.6}
        />
      </points>
    </group>
  )
} 