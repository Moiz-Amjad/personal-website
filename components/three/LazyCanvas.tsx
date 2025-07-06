'use client'

import { ReactNode, Suspense } from 'react'
import { Canvas, CanvasProps } from '@react-three/fiber'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'

interface LazyCanvasProps extends CanvasProps {
  height?: string | number
  children: ReactNode
}

/**
 * Lightweight wrapper around @react-three/fiber <Canvas/>
 * It mounts the real Canvas only when the wrapper enters the viewport.
 * When the element scrolls out, the Canvas unmounts – freeing GPU & RAM.
 */
export default function LazyCanvas({ height = '100%', children, ...rest }: LazyCanvasProps) {
  const [ref, inView] = useInView({ rootMargin: '200px', triggerOnce: true })
  const [mountedOnce, setMountedOnce] = useState(false)

  if (inView && !mountedOnce) setMountedOnce(true)

  return (
    <div ref={ref} style={{ height, width: '100%' }}>
      {mountedOnce && (
        <Suspense fallback={null}>
          <Canvas {...rest}>{children}</Canvas>
        </Suspense>
      )}
    </div>
  )
} 