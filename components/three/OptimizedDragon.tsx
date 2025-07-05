'use client'

import { Suspense, useRef, useState, memo, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

interface OptimizedDragonProps {
  url?: string
  position?: [number, number, number]
  scale?: number
  speed?: number
  autoRotate?: boolean
  quality?: 'low' | 'medium' | 'high'
}

const DragonMesh = memo(({ 
  url = "/models/dragon.glb", 
  position = [0, 0, 0], 
  scale = 1, 
  speed = 1,
  autoRotate = true,
  quality = 'medium'
}: OptimizedDragonProps) => {
  const meshRef = useRef<THREE.Group>(null)
  const { scene } = useGLTF(url)
  const { viewport } = useThree()
  const [isVisible, setIsVisible] = useState(true)

  // Performance optimization: reduce quality on mobile
  useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          // Reduce geometry complexity based on quality
          if (quality === 'low') {
            child.geometry.deleteAttribute('normal')
            child.geometry.deleteAttribute('uv')
          }
          
          // Optimize materials
          if (child.material instanceof THREE.MeshStandardMaterial) {
            child.material.roughness = 0.8
            child.material.metalness = 0.2
            
            // Disable expensive features on mobile
            if (quality === 'low') {
              child.material.envMap = null
              child.material.normalMap = null
              child.material.roughnessMap = null
              child.material.metalnessMap = null
            }
          }
        }
      })
    }
  }, [scene, quality])

  // Visibility culling for performance
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden)
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [])

  useFrame((state) => {
    if (!meshRef.current || !isVisible) return

    const time = state.clock.getElapsedTime()
    
    // Gentle floating motion
    meshRef.current.position.y = position[1] + Math.sin(time * speed * 0.5) * 0.3
    
    if (autoRotate) {
      meshRef.current.rotation.y = time * speed * 0.2
    }
    
    // Subtle breathing effect
    const breathScale = 1 + Math.sin(time * speed * 0.8) * 0.02
    meshRef.current.scale.setScalar(scale * breathScale)
  })

  return (
    <group ref={meshRef} position={position}>
      <primitive object={scene.clone()} />
    </group>
  )
})

DragonMesh.displayName = 'DragonMesh'

const OptimizedDragon = (props: OptimizedDragonProps) => {
  const [shouldLoad, setShouldLoad] = useState(false)

  // Delay loading to improve initial performance
  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldLoad(true)
    }, 2000) // Load after 2 seconds

    return () => clearTimeout(timer)
  }, [])

  if (!shouldLoad) {
    return null
  }

  return (
    <Suspense fallback={null}>
      <DragonMesh {...props} />
    </Suspense>
  )
}

export default memo(OptimizedDragon)

// Preload the model for better performance
useGLTF.preload("/models/dragon.glb") 