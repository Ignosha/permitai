'use client';

import { useState, useEffect, Suspense } from 'react';
import { cn } from '@/lib/utils';

interface SplineSceneProps {
  scene: string;
  className?: string;
  fallback?: React.ReactNode;
}

function ErrorBoundary({ children, onError }: { children: React.ReactNode; onError: () => void }) {
  const [hasError, setHasError] = useState(false);
  
  useEffect(() => {
    if (hasError) {
      onError();
    }
  }, [hasError, onError]);
  
  if (hasError) return null;
  
  try {
    return <>{children}</>;
  } catch (e) {
    setHasError(true);
    return null;
  }
}

export default function SplineScene({ scene, className, fallback }: SplineSceneProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [SplineComponent, setSplineComponent] = useState<any>(null);

  useEffect(() => {
    if (!scene) {
      setLoading(false);
      return;
    }
    
    let mounted = true;
    setLoading(true);
    setError(false);

    setTimeout(() => {
      if (!mounted) return;
      
      import('@splinetool/react-spline')
        .then(mod => {
          if (!mounted) return;
          setSplineComponent(() => mod.default);
          setLoading(false);
        })
        .catch(err => {
          console.error('Failed to load Spline:', err);
          if (mounted) {
            setError(true);
            setLoading(false);
          }
        });
    }, 100);

    const timeout = setTimeout(() => {
      if (mounted && loading) {
        setError(true);
        setLoading(false);
      }
    }, 5000);

    return () => {
      mounted = false;
      clearTimeout(timeout);
    };
  }, [scene]);

  if (error || !scene) {
    return (
      <div className={cn('w-full h-full relative flex items-center justify-center', className)} style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #111 100%)' }}>
        {fallback || (
          <div style={{ textAlign: 'center', color: '#888' }}>
            <div style={{ fontSize: '3rem', marginBottom: '16px' }}>⚠️</div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.75rem' }}>3D preview unavailable</div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={cn('w-full h-full relative', className)}>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #111 100%)' }}>
          {fallback || (
            <div style={{ textAlign: 'center', color: '#888' }}>
              <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🤖</div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.75rem' }}>Loading 3D...</div>
            </div>
          )}
        </div>
      )}
      {!loading && !error && SplineComponent && (
        <div className="absolute inset-0">
          <Suspense fallback={null}>
            <SplineComponent
              scene={scene}
              onLoad={() => {}}
              onError={(err: any) => {
                console.error('Spline error:', err);
                setError(true);
                setLoading(false);
              }}
            />
          </Suspense>
        </div>
      )}
    </div>
  );
}
