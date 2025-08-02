import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Application } from '@splinetool/runtime';

// Extend Navigator interface to include deviceMemory
declare global {
  interface Navigator {
    deviceMemory?: number;
  }
}

interface DeviceInfo {
  isMobile: boolean;
  memory: number;
  cores: number;
}

const detectDevice = (): DeviceInfo => {
  const isMobile = /Mobi|Android/i.test(navigator.userAgent);
  const memory = (navigator as any).deviceMemory || 4;
  const cores = navigator.hardwareConcurrency || 4;
  return { isMobile, memory, cores };
};

// Performance settings based on device capabilities
const getPerformanceSettings = (deviceInfo: DeviceInfo) => {
  const isLowEnd = deviceInfo.isMobile || deviceInfo.memory <= 2 || deviceInfo.cores <= 2;
  const isMidRange = deviceInfo.memory <= 4 || deviceInfo.cores <= 4;
  
  return {
    pixelRatio: isLowEnd ? 1 : isMidRange ? 1.25 : Math.min(window.devicePixelRatio, 2),
    antialias: !isLowEnd,
    powerPreference: isLowEnd ? 'default' : 'high-performance',
    targetFPS: isLowEnd ? 30 : 60,
    enableShadows: !isLowEnd && !isMidRange,
    quality: isLowEnd ? 'low' : isMidRange ? 'medium' : 'high'
  } as const;
};

export default function ThreeJSHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const splineAppRef = useRef<Application | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const lastFrameTimeRef = useRef<number>(0);
  const resizeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [loading, setLoading] = useState(true);
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo | null>(null);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    setDeviceInfo(detectDevice());
  }, []);

  useEffect(() => {
    if (!containerRef.current || !deviceInfo) return;

    const container = containerRef.current;
    if (!container) return;

    // Get performance settings based on device
    const perfSettings = getPerformanceSettings(deviceInfo);
    
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(70, container.clientWidth / container.clientHeight, 0.1, 5000);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      antialias: perfSettings.antialias,
      alpha: true,
      powerPreference: perfSettings.powerPreference as WebGLPowerPreference,
      stencil: false,
      depth: true,
      preserveDrawingBuffer: false,
    });
    
    renderer.setPixelRatio(perfSettings.pixelRatio);
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.shadowMap.enabled = perfSettings.enableShadows;
    renderer.shadowMap.type = perfSettings.enableShadows ? THREE.PCFSoftShadowMap : THREE.BasicShadowMap;
    
    // Optimize for performance
    renderer.info.autoReset = false;
    
    Object.assign(renderer.domElement.style, {
      pointerEvents: 'auto',
      userSelect: 'none',
      touchAction: 'pan-y',
      willChange: 'transform',
    });
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const controls = new OrbitControls(camera, renderer.domElement);
    Object.assign(controls, {
      enableDamping: true,
      dampingFactor: 0.05,
      enableZoom: false,
      enablePan: false,
      enableRotate: true,
      maxPolarAngle: Math.PI * 0.8,
      minPolarAngle: Math.PI * 0.2,
      maxAzimuthAngle: Math.PI / 4,
      minAzimuthAngle: -Math.PI / 4,
      rotateSpeed: 0.5,
    });
    controlsRef.current = controls;

    // Frame rate controlled animation loop
    const targetFrameTime = 1000 / perfSettings.targetFPS;
    
    const animate = (currentTime: number) => {
      if (!renderer || !scene || !camera || !controls) return;
      
      // Frame rate limiting
      const deltaTime = currentTime - lastFrameTimeRef.current;
      if (deltaTime >= targetFrameTime) {
        controls.update();
        renderer.render(scene, camera);
        lastFrameTimeRef.current = currentTime;
        renderer.info.reset();
      }
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    animationFrameRef.current = requestAnimationFrame(animate);

    // Debounced resize handler for better performance
    const handleResize = () => {
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
      
      resizeTimeoutRef.current = setTimeout(() => {
        if (!container || !camera || !renderer) return;
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
      }, 100);
    };
    window.addEventListener('resize', handleResize, { passive: true });

    const loadSpline = () => {
      // Progressive loading with better error handling
      const app = new Application(renderer.domElement);
      splineAppRef.current = app;
      
      // Simulate progress for better UX
      const progressInterval = setInterval(() => {
        setLoadingProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + Math.random() * 10;
        });
      }, 200);

      app.load('https://prod.spline.design/2VoTq6B1iob8D37P/scene.splinecode')
        .then(() => {
          clearInterval(progressInterval);
          setLoadingProgress(100);
          
          // Smooth transition after loading
          setTimeout(() => {
            setLoading(false);
            
            // Performance-optimized scene setup
            requestIdleCallback(() => {
              if (!scene || !camera || !controls || !renderer) return;
              
              scene.updateMatrixWorld(true);
              const box = new THREE.Box3().setFromObject(scene);
              const center = new THREE.Vector3();
              box.getCenter(center);
              const size = box.getSize(new THREE.Vector3());
              const maxDim = Math.max(size.x, size.y, size.z);
              const fov = camera.fov * (Math.PI / 180);
              const cameraZ = Math.max(Math.abs(maxDim / 2 / Math.tan(fov / 2)), 500);

              camera.position.set(center.x, center.y, cameraZ);
              camera.lookAt(center);
              controls.target.copy(center);
              controls.update();
              renderer.render(scene, camera);
            });
          }, 500);
        })
        .catch(err => {
          clearInterval(progressInterval);
          console.error('Spline load error:', err);
          setLoading(false);
          setLoadingProgress(0);
        });
    };

    if ('requestIdleCallback' in window && window.requestIdleCallback) {
      window.requestIdleCallback(loadSpline);
    } else {
      setTimeout(loadSpline, 300);
    }

    return () => {
      // Clean up animation frame
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      
      // Clean up resize timeout
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
      
      // Clean up event listeners
      window.removeEventListener('resize', handleResize);
      
      // Clean up Spline app
      if (splineAppRef.current) {
        try {
          splineAppRef.current.dispose();
        } catch (error) {
          console.warn('Error disposing Spline app:', error);
        }
      }
      
      // Clean up Three.js resources
      if (renderer) {
        try {
          renderer.dispose();
          renderer.forceContextLoss();
          if (container && renderer.domElement && container.contains(renderer.domElement)) {
            container.removeChild(renderer.domElement);
          }
        } catch (error) {
          console.warn('Error disposing renderer:', error);
        }
      }
      
      // Clean up scene objects
      if (sceneRef.current) {
        sceneRef.current.clear();
      }
    };
  }, [deviceInfo]);

  return (
    <>
      {loading && (
        <div style={{
          width: '100%',
          height: '100vh',
          backgroundColor: '#0f0f0f',
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '1.3rem',
          fontFamily: 'sans-serif',
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 100,
          transition: 'opacity 0.6s ease-in-out',
        }}>
          <div style={{ marginBottom: '24px' }}>Loading experience...</div>
          <div style={{
            width: '200px',
            height: '4px',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '2px',
            overflow: 'hidden',
          }}>
            <div style={{
              width: `${loadingProgress}%`,
              height: '100%',
              backgroundColor: '#fff',
              borderRadius: '2px',
              transition: 'width 0.3s ease-out',
            }} />
          </div>
          <div style={{ 
            marginTop: '12px', 
            fontSize: '0.9rem', 
            color: 'rgba(255, 255, 255, 0.7)',
          }}>
            {Math.round(loadingProgress)}%
          </div>
        </div>
      )}
      <div ref={containerRef} style={{
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        position: 'relative',
        zIndex: 1,
        touchAction: 'pan-y',
        opacity: loading ? 0 : 1,
        transition: 'opacity 0.6s ease-in-out',
      }} />
    </>
  );
}
