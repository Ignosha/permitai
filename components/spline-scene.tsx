'use client';

import { useState } from 'react';
import Spline from '@splinetool/react-spline';
import { cn } from '@/lib/utils';

interface SplineSceneProps {
  scene: string;
  className?: string;
  fallback?: React.ReactNode;
}

export default function SplineScene({ scene, className, fallback }: SplineSceneProps) {
  const [loading, setLoading] = useState(true);

  return (
    <div className={cn('relative w-full h-full', className)}>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          {fallback || (
            <div className="w-8 h-8 border-2 border-[#222] border-t-[#c0fe04] rounded-full animate-spin" />
          )}
        </div>
      )}
      <Spline
        scene={scene}
        onLoad={() => setLoading(false)}
        onError={(error: any) => {
          console.error('Spline load error:', error);
          setLoading(false);
        }}
      />
    </div>
  );
}
