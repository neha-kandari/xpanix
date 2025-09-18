import React, { useEffect, useRef, useState } from 'react';

interface InteractiveGlassMorphismGridProps {
  children: React.ReactNode;
  className?: string;
}

export default function InteractiveGlassMorphismGrid({ children, className = "" }: InteractiveGlassMorphismGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Set initial dimensions
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Generate grid cells
  const gridCells = [];
  const cellSize = 120;
  const gap = 4;
  const cols = Math.ceil(dimensions.width / (cellSize + gap)) + 2;
  const rows = Math.ceil(dimensions.height / (cellSize + gap)) + 2;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x = col * (cellSize + gap) - cellSize;
      const y = row * (cellSize + gap) - cellSize;
      
      // Calculate distance from mouse
      const distance = Math.sqrt(
        Math.pow(mousePosition.x - (x + cellSize / 2), 2) + 
        Math.pow(mousePosition.y - (y + cellSize / 2), 2)
      );
      
      // Only show grid cells within sphere radius
      const sphereRadius = 150;
      if (distance > sphereRadius) continue;
      
      // Create glow effect based on distance
      const maxDistance = sphereRadius;
      const intensity = Math.max(0, 1 - distance / maxDistance);
      const glowOpacity = intensity * 0.8;
      const borderOpacity = 0.2 + intensity * 0.6;
      
      // Create fade effect at edges
      const fadeDistance = sphereRadius * 0.8;
      const fadeIntensity = distance > fadeDistance ? 
        Math.max(0, 1 - (distance - fadeDistance) / (sphereRadius - fadeDistance)) : 1;

      gridCells.push(
        <div
          key={`${row}-${col}`}
          className="absolute rounded-2xl transition-all duration-300 ease-out"
          style={{
            left: `${x}px`,
            top: `${y}px`,
            width: `${cellSize}px`,
            height: `${cellSize}px`,
            background: `rgba(156, 163, 175, ${glowOpacity * 0.15 * fadeIntensity})`,
            border: `1px solid rgba(156, 163, 175, ${borderOpacity * fadeIntensity})`,
            boxShadow: intensity > 0.1 ? `
              inset 0 1px 0 rgba(255, 255, 255, ${intensity * 0.3 * fadeIntensity}),
              0 0 ${intensity * 25}px rgba(156, 163, 175, ${intensity * 0.9 * fadeIntensity}),
              0 0 ${intensity * 50}px rgba(156, 163, 175, ${intensity * 0.5 * fadeIntensity})
            ` : `inset 0 1px 0 rgba(255, 255, 255, ${0.05 * fadeIntensity})`,
            backdropFilter: 'blur(10px)',
            transform: intensity > 0.3 ? `scale(${1 + intensity * 0.15})` : 'scale(1)',
            opacity: fadeIntensity,
          }}
        />
      );
    }
  }

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      {/* Mouse Following Sphere - Behind everything */}
      <div
        className="fixed pointer-events-none z-1 transition-opacity duration-300"
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          width: '300px',
          height: '300px',
          transform: 'translate(-50%, -50%)',
          background: `radial-gradient(ellipse 60% 40% at 30% 30%, 
            rgba(220, 220, 220, 0.4) 0%,
            rgba(180, 180, 180, 0.3) 20%,
            rgba(156, 163, 175, 0.25) 40%,
            rgba(120, 120, 120, 0.15) 65%,
            rgba(80, 80, 80, 0.1) 80%,
            transparent 100%
          )`,
          borderRadius: '50%',
          filter: 'blur(1px)',
          boxShadow: `
            inset -20px -20px 40px rgba(0, 0, 0, 0.3),
            inset 20px 20px 40px rgba(255, 255, 255, 0.1),
            0 0 50px rgba(156, 163, 175, 0.2)
          `,
        }}
      />

      {/* Sphere Highlight */}
      <div
        className="fixed pointer-events-none z-1 transition-opacity duration-300"
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          width: '80px',
          height: '60px',
          transform: 'translate(-70%, -70%)',
          background: `radial-gradient(ellipse, 
            rgba(255, 255, 255, 0.4) 0%,
            rgba(255, 255, 255, 0.2) 50%,
            transparent 100%
          )`,
          borderRadius: '50%',
          filter: 'blur(3px)',
        }}
      />

      {/* Additional Ambient Glow - Behind grid */}
      <div
        className="fixed pointer-events-none z-0 transition-all duration-500 ease-out"
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          width: '600px',
          height: '600px',
          transform: 'translate(-50%, -50%)',
          background: `radial-gradient(circle, 
            rgba(156, 163, 175, 0.1) 0%, 
            rgba(156, 163, 175, 0.05) 40%, 
            transparent 70%
          )`,
          borderRadius: '50%',
          filter: 'blur(20px)',
        }}
      />

      {/* Grid Background - In front of circles */}
      <div className="fixed inset-0 w-full h-full pointer-events-none z-5">
        {gridCells}
      </div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
} 