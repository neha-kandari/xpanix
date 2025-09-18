import React, { useEffect, useRef } from 'react';

interface GridBackgroundProps {
  children: React.ReactNode;
  className?: string;
}

export default function GridBackground({ children, className = "" }: GridBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Grid settings
    const gridSize = 50;
    const gridColor = 'rgba(255, 255, 255, 0.03)';
    const gridLineWidth = 1;

    // Lighting effect settings
    const lights: Array<{ x: number; y: number; radius: number; intensity: number; speed: number }> = [
      { x: 0, y: 0, radius: 200, intensity: 0.1, speed: 0.001 },
      { x: 0, y: 0, radius: 150, intensity: 0.15, speed: 0.002 },
      { x: 0, y: 0, radius: 100, intensity: 0.2, speed: 0.003 }
    ];

    let animationId: number;
    let time = 0;

    const animate = () => {
      time += 0.01;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update light positions
      lights.forEach((light, index) => {
        light.x = canvas.width / 2 + Math.sin(time * light.speed + index) * 300;
        light.y = canvas.height / 2 + Math.cos(time * light.speed + index) * 200;
      });

      // Draw grid
      ctx.strokeStyle = gridColor;
      ctx.lineWidth = gridLineWidth;

      // Vertical lines
      for (let x = 0; x <= canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Horizontal lines
      for (let y = 0; y <= canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw lighting effects
      lights.forEach(light => {
        const gradient = ctx.createRadialGradient(
          light.x, light.y, 0,
          light.x, light.y, light.radius
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, ${light.intensity})`);
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className={`relative ${className}`}>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none z-0"
        style={{ background: 'transparent' }}
      />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
} 