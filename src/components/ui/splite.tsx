'use client'

import { Suspense, lazy, useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
}

function SplineFallback({ className }: { className?: string }) {
  return (
    <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20 ${className || ''}`}>
      <div className="text-center text-muted-foreground">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
          <span className="text-2xl">🎨</span>
        </div>
        <p className="text-sm">3D Preview</p>
      </div>
    </div>
  )
}

function ErrorFallback({ className }: { className?: string }) {
  return <SplineFallback className={className} />
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  const [hasError, setHasError] = useState(false)

  if (hasError) {
    return <SplineFallback className={className} />
  }

  return (
    <ErrorBoundary
      fallback={<ErrorFallback className={className} />}
      onError={() => setHasError(true)}
    >
      <Suspense 
        fallback={
          <div className="w-full h-full flex items-center justify-center">
            <span className="loader"></span>
          </div>
        }
      >
        <Spline
          scene={scene}
          className={className}
          onError={() => setHasError(true)}
        />
      </Suspense>
    </ErrorBoundary>
  )
}
