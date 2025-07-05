'use client'

import { Suspense, useRef, useState, memo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useGLTF, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

interface RealisticDragonProps {
  url?: string
  position?: [number, number, number]
  scale?: number
  speed?: number
  autoRotate?: boolean
}

function RealisticDragon({
  url = '/models/dragon.glb', // We'll use a local model or fallback to procedural
  position = [0, 0, 0],
  scale = 1,
  speed = 0.2,
  autoRotate = true,
}: RealisticDragonProps) {
  const group = useRef<THREE.Group>(null!)
  const dragonRef = useRef<THREE.Group>(null!)
  const wingRef1 = useRef<THREE.Mesh>(null!)
  const wingRef2 = useRef<THREE.Mesh>(null!)

  // Fallback to procedural dragon if GLTF fails
  const [useProceduralDragon, setUseProceduralDragon] = useState(false)

  useFrame((state) => {
    if (autoRotate && group.current) {
      const t = state.clock.elapsedTime * speed
      
      // More realistic flying pattern
      group.current.position.x = position[0] + Math.sin(t * 0.8) * 6
      group.current.position.y = position[1] + Math.sin(t * 1.2) * 2
      group.current.position.z = position[2] + Math.cos(t * 0.8) * 4
      
      // Banking and turning
      group.current.rotation.y = Math.sin(t * 0.5) * 0.3
      group.current.rotation.z = Math.sin(t * 1.2) * 0.15
      group.current.rotation.x = Math.sin(t * 0.7) * 0.1
    }

    // Wing flapping for procedural dragon
    if (wingRef1.current && wingRef2.current) {
      const wingFlap = Math.sin(state.clock.elapsedTime * speed * 12) * 0.4
      wingRef1.current.rotation.z = wingFlap + 0.2
      wingRef2.current.rotation.z = -wingFlap - 0.2
    }
  })

  // Enhanced procedural dragon
  const ProceduralDragon = memo(() => (
    <group ref={dragonRef}>
      {/* Main body - more elongated and serpentine */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <capsuleGeometry args={[0.4, 2.5, 4, 8]} />
        <meshStandardMaterial 
          color="#4C1D95" 
          metalness={0.7}
          roughness={0.3}
          emissive="#2D1B69"
          emissiveIntensity={0.1}
        />
      </mesh>

      {/* Neck */}
      <mesh position={[1.8, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <capsuleGeometry args={[0.25, 1.2, 4, 8]} />
        <meshStandardMaterial 
          color="#5B21B6" 
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>

      {/* Head - more dragon-like */}
      <mesh position={[2.8, 0, 0]}>
        <coneGeometry args={[0.5, 1.2, 8]} />
        <meshStandardMaterial 
          color="#6D28D9" 
          metalness={0.6}
          roughness={0.4}
        />
      </mesh>

      {/* Eyes */}
      <mesh position={[3.2, 0.2, 0.3]}>
        <sphereGeometry args={[0.08]} />
        <meshStandardMaterial 
          color="#FF0000" 
          emissive="#FF0000" 
          emissiveIntensity={0.8}
        />
      </mesh>
      <mesh position={[3.2, 0.2, -0.3]}>
        <sphereGeometry args={[0.08]} />
        <meshStandardMaterial 
          color="#FF0000" 
          emissive="#FF0000" 
          emissiveIntensity={0.8}
        />
      </mesh>

      {/* Horns */}
      <mesh position={[3.1, 0.4, 0.2]} rotation={[0.3, 0, 0]}>
        <coneGeometry args={[0.05, 0.4, 4]} />
        <meshStandardMaterial color="#1F1B24" metalness={0.9} />
      </mesh>
      <mesh position={[3.1, 0.4, -0.2]} rotation={[-0.3, 0, 0]}>
        <coneGeometry args={[0.05, 0.4, 4]} />
        <meshStandardMaterial color="#1F1B24" metalness={0.9} />
      </mesh>

      {/* Wings - more detailed */}
      <mesh ref={wingRef1} position={[0.5, 0.3, 1.2]} rotation={[0, 0.2, 0.2]}>
        <planeGeometry args={[3, 2]} />
        <meshStandardMaterial 
          color="#7C3AED" 
          transparent 
          opacity={0.8} 
          side={THREE.DoubleSide}
          metalness={0.3}
          roughness={0.7}
          emissive="#4C1D95"
          emissiveIntensity={0.1}
        />
      </mesh>
      <mesh ref={wingRef2} position={[0.5, 0.3, -1.2]} rotation={[0, -0.2, -0.2]}>
        <planeGeometry args={[3, 2]} />
        <meshStandardMaterial 
          color="#7C3AED" 
          transparent 
          opacity={0.8} 
          side={THREE.DoubleSide}
          metalness={0.3}
          roughness={0.7}
          emissive="#4C1D95"
          emissiveIntensity={0.1}
        />
      </mesh>

      {/* Wing membranes */}
      <mesh position={[0.8, 0.1, 1.5]} rotation={[0, 0.3, 0.1]}>
        <planeGeometry args={[1.5, 1]} />
        <meshStandardMaterial 
          color="#8B5CF6" 
          transparent 
          opacity={0.6} 
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh position={[0.8, 0.1, -1.5]} rotation={[0, -0.3, -0.1]}>
        <planeGeometry args={[1.5, 1]} />
        <meshStandardMaterial 
          color="#8B5CF6" 
          transparent 
          opacity={0.6} 
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Tail */}
      <mesh position={[-1.8, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <coneGeometry args={[0.2, 2, 8]} />
        <meshStandardMaterial 
          color="#4C1D95" 
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>

      {/* Spikes along back */}
      {Array.from({ length: 5 }, (_, i) => (
        <mesh key={i} position={[1 - i * 0.5, 0.4, 0]} rotation={[0, 0, 0]}>
          <coneGeometry args={[0.08, 0.3, 4]} />
          <meshStandardMaterial color="#1F1B24" metalness={0.9} />
        </mesh>
      ))}

      {/* Particle trail */}
      <mesh position={[-3, 0, 0]}>
        <sphereGeometry args={[0.1]} />
        <meshStandardMaterial 
          color="#8B5CF6" 
          emissive="#8B5CF6" 
          emissiveIntensity={0.5}
          transparent
          opacity={0.7}
        />
      </mesh>
    </group>
  ))

  return (
    <group ref={group} scale={scale} position={position}>
      <ProceduralDragon />
    </group>
  )
}

// Memoize the component to prevent unnecessary re-renders
export default memo(RealisticDragon)

useGLTF.preload('https://cdn.jsdelivr.net/gh/drcmda/react-three-fiber@master/examples/public/models/DragonAttenuation.glb') 