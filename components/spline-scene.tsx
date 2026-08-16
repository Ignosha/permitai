'use client';

import { useState, useEffect } from 'react';
import Spline from '@splinetool/react-spline';
import { cn } from '@/lib/utils';

interface SplineSceneProps {
  scene: string;
  className?: string;
  fallback?: React.ReactNode;
}

export default function SplineScene({ scene, className, fallback }: SplineSceneProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  return (
    <div className={cn('relative w-full h-full', className)}>
      {loading && !error && (
        <div className="absolute inset-0 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #111 100%)' }}>
          {fallback || (
            <div style={{ textAlign: 'center', color: '#888' }}>
              <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🤖</div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.75rem' }}>Loading 3D...</div>
            </div>
          )}
        </div>
      )}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #111 100%)' }}>
          {fallback || (
            <div style={{ textAlign: 'center', color: '#888' }}>
              <div style={{ fontSize: '3rem', marginBottom: '16px' }}>⚠️</div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.75rem' }}>3D preview unavailable</div>
            </div>
          )}
        </div>
      )}
      <div className={cn('w-full h-full', loading || error ? 'hidden' : '')}>
        <Spline
          scene={scene}
          onLoad={() => setLoading(false)}
          onError={(err: any) => {
            console.error('Spline error:', err);
            setError(true);
            setLoading(false);
          }}
        />
      </div>
    </div>
  );
}
