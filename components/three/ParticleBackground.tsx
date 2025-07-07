'use client'

import { useRef, useMemo } from 'react'
import { useFrame, Canvas } from '@react-three/fiber'
import * as THREE from 'three'
import RealisticDragon from './RealisticDragon'

export default function ParticleBackground() {
  const points = useRef<THREE.Points>(null!)
  const particlesCount = 5000

  const positions = useMemo(() => {
    const positions = new Float32Array(particlesCount * 3)
    for (let i = 0; i < particlesCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 20
    }
    return positions
  }, [particlesCount])

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.x = state.clock.elapsedTime * 0.05
      points.current.rotation.y = state.clock.elapsedTime * 0.075
    }
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.015}
        color="#3B82F6"
        sizeAttenuation
        transparent
        opacity={0.8}
      />
    </points>
  )
}

export function ParticleBackgroundWithDragons() {
  return (
    <Canvas camera={{ position: [0, 2, 10], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />

      {/* big hero dragon */}
      <RealisticDragon
        position={[0, 1, 0]}
        scale={2}
        speed={0.15}
      />

      {/* tiny background dragon */}
      <RealisticDragon
        position={[-8, 4, -6]}
        scale={0.6}
        speed={0.3}
      />

      <RealisticDragon
        url="https://my-cdn.com/models/butterfly.glb"
        position={[3, 2, -4]}
        scale={0.4}
        speed={0.4}
      />
    </Canvas>
  )
}
