"use client";

import React, { useEffect, useRef, useState } from "react";
import { loadSplineViewer, shouldShowSpline } from "../libs/splineLoader";

export default function SplineClient() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [showSpline, setShowSpline] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  // Check if we should show Spline at all on this device
  useEffect(() => {
    setShowSpline(shouldShowSpline());
  }, []);

  // Load Spline IMMEDIATELY on component mount - no waiting
  useEffect(() => {
    if (!showSpline) return;

    // Set flag to allow hero Spline to load even in poor conditions
    window.__allowHeroSpline = true;
    
    // Load immediately without any delays or waiting
    setShouldLoad(true);
    setIsVisible(true);
    
    console.log('🎬 Starting Spline load immediately...');
    
    // Load with high priority since it's above the fold
    loadSplineViewer('high')
      .then(() => {
        console.log('✅ Spline loaded successfully');
        setIsLoaded(true);
      })
      .catch((error) => {
        console.error('❌ Failed to load Spline viewer:', error);
        // On error, still show the container to prevent layout shift
        setIsLoaded(true);
      });
  }, [showSpline]);

  // Fallback content for mobile/low-end devices
  if (!showSpline) {
    return (
      <div 
        style={{
          width: '100vw',
          height: '100vh',
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 1,
          background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{
          width: '200px',
          height: '200px',
          background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          animation: 'pulse 2s ease-in-out infinite',
        }} />
        <style jsx>{`
          @keyframes pulse {
            0%, 100% { opacity: 0.3; transform: scale(1); }
            50% { opacity: 0.6; transform: scale(1.1); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      style={{
        width: '100vw',
        height: '100vh',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 1,
        backgroundColor: 'transparent',
      }}
    >
      {/* Loading indicator while Spline is loading */}
      {shouldLoad && !isLoaded && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 2,
        }}>
          <div style={{
            width: '60px',
            height: '60px',
            border: '2px solid rgba(255, 255, 255, 0.2)',
            borderTop: '2px solid rgba(255, 255, 255, 0.8)',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
          }} />
          <style jsx>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      )}

      {/* Spline viewer */}
      {shouldLoad && React.createElement('spline-viewer', {
        'loading-anim': true,
        url: "https://prod.spline.design/7qZIUdCCEbZokdYA/scene.splinecode",
        style: {
          width: '100%',
          height: '100%',
          display: 'block',
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.5s ease-in-out',
        },
        onLoad: () => {
          setIsLoaded(true);
        },
      })}
    </div>
  );
}
