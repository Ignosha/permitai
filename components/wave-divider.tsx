'use client';

import { useMemo } from 'react';

interface WaveDividerProps {
  color?: string;
  flip?: boolean;
  height?: number;
  className?: string;
}

export default function WaveDivider({
  color = '#0a0a0a',
  flip = false,
  height = 80,
  className = '',
}: WaveDividerProps) {
  const paths = useMemo(() => {
    const segments = 6;
    const width = 1200;
    const segmentWidth = width / segments;
    
    const makePath = (yOffset: number, amplitude: number) => {
      let path = `M0,${height}`;
      for (let i = 0; i < segments; i++) {
        const x1 = i * segmentWidth;
        const x2 = (i + 1) * segmentWidth;
        const cp1x = x1 + segmentWidth * 0.25;
        const cp1y = height * 0.5 - amplitude * (0.5 + 0.5 * Math.sin(i * 1.2));
        const cp2x = x1 + segmentWidth * 0.75;
        const cp2y = height * 0.5 - amplitude * (0.5 + 0.5 * Math.cos(i * 1.2));
        path += ` C${cp1x},${cp1y} ${cp2x},${cp2y} ${x2},${height}`;
      }
      path += ` L${width},${height} L${width},${height} L0,${height} Z`;
      return path;
    };
    
    return [makePath(0, height * 0.3), makePath(0, height * 0.2), makePath(0, height * 0.15)];
  }, [height]);
  
  return (
    <div
      className={[
        'absolute left-0 w-full overflow-hidden leading-none pointer-events-none',
        flip ? 'top-0 rotate-180' : 'bottom-0',
        className,
      ].join(' ')}
    >
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className="relative block w-full"
        style={{ height: `${height}px` }}
      >
        <path d={paths[0]} fill={color} opacity="0.9" />
        <path d={paths[1]} fill={color} opacity="0.6" style={{ transform: 'translateY(-10px)' }} />
        <path d={paths[2]} fill={color} opacity="0.3" style={{ transform: 'translateY(-20px)' }} />
      </svg>
    </div>
  );
}
