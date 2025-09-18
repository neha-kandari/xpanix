import React, { useEffect, useState } from 'react';
import { getPerformanceStats } from '../libs/threeJSPerformance';

interface PerformanceStats {
  fps: number;
  memoryUsage: number;
  renderTime: number;
  triangleCount: number;
  drawCalls: number;
  deviceCapabilities: {
    isMobile: boolean;
    isLowEnd: boolean;
    hasLowMemory: boolean;
    hasSlowGPU: boolean;
    pixelRatio: number;
    maxTextureSize: number;
  };
}

export default function ThreeJSPerformanceDashboard() {
  const [stats, setStats] = useState<PerformanceStats | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show in development mode
    if (process.env.NODE_ENV !== 'development') {
      return;
    }

    setIsVisible(true);

    const updateStats = () => {
      const currentStats = getPerformanceStats();
      setStats(currentStats);
    };

    // Update stats every second
    const interval = setInterval(updateStats, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!isVisible || !stats) {
    return null;
  }

  const getQualityColor = (fps: number) => {
    if (fps >= 50) return '#00ff00';
    if (fps >= 30) return '#ffff00';
    return '#ff0000';
  };

  const getMemoryColor = (memory: number) => {
    if (memory < 100) return '#00ff00';
    if (memory < 200) return '#ffff00';
    return '#ff0000';
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: '10px',
        right: '10px',
        background: 'rgba(0, 0, 0, 0.8)',
        color: 'white',
        padding: '10px',
        borderRadius: '5px',
        fontSize: '12px',
        fontFamily: 'monospace',
        zIndex: 1000,
        minWidth: '200px',
      }}
    >
      <div style={{ marginBottom: '5px', fontWeight: 'bold' }}>
        Three.js Performance
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5px' }}>
        <div>FPS:</div>
        <div style={{ color: getQualityColor(stats.fps) }}>
          {stats.fps.toFixed(1)}
        </div>
        <div>Memory:</div>
        <div style={{ color: getMemoryColor(stats.memoryUsage) }}>
          {stats.memoryUsage.toFixed(1)}MB
        </div>
        <div>Triangles:</div>
        <div>{stats.triangleCount.toLocaleString()}</div>
        <div>Draw Calls:</div>
        <div>{stats.drawCalls}</div>
        <div>Device:</div>
        <div>
          {stats.deviceCapabilities.isLowEnd ? 'Low-end' : 'High-end'}
        </div>
        <div>Pixel Ratio:</div>
        <div>{stats.deviceCapabilities.pixelRatio}</div>
      </div>
      <div style={{ marginTop: '5px', fontSize: '10px', opacity: 0.7 }}>
        Mobile: {stats.deviceCapabilities.isMobile ? 'Yes' : 'No'}
        {stats.deviceCapabilities.hasLowMemory && ' | Low Memory'}
        {stats.deviceCapabilities.hasSlowGPU && ' | Slow GPU'}
      </div>
    </div>
  );
} 