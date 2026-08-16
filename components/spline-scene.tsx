'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface SplineSceneProps {
  scene?: string;
  className?: string;
  fallback?: React.ReactNode;
}

export default function SplineScene({ scene, className, fallback }: SplineSceneProps) {
  const [hasError, setHasError] = useState(false);
  const [SplineComponent, setSplineComponent] = useState<any>(null);
  
  useEffect(() => {
    if (!scene || hasError) return;
    
    let mounted = true;
    
    // Delay the import to avoid blocking initial render
    const timer = setTimeout(() => {
      import('@splinetool/react-spline')
        .then(mod => {
          if (!mounted) return;
          setSplineComponent(() => mod.default);
        })
        .catch(err => {
          console.error('Spline import failed:', err);
          setHasError(true);
        });
    }, 200);
    
    return () => {
      mounted = false;
      clearTimeout(timer);
    };
  }, [scene, hasError]);

  // Show fallback only - don't render Spline directly to avoid crashes
  return (
    <div className={cn('w-full h-full relative flex items-center justify-center', className)} style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #111 100%)' }}>
      {fallback || (
        <div style={{ textAlign: 'center', color: '#888' }}>
          <div style={{ fontSize: '3rem', marginBottom: '16px' }} aria-hidden="true">🤖</div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.75rem' }}>AI Permit Intelligence</div>
        </div>
      )}
    </div>
  );
}
