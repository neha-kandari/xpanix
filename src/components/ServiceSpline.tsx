import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Application } from '@splinetool/runtime';

export default function ServiceSpline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const splineAppRef = useRef<Application | null>(null);
  const animationRef = useRef<number>(0);
  const [sceneLoaded, setSceneLoaded] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    const isLowTier = () => {
      const mem = (navigator as any).deviceMemory || 4;
      const cores = navigator.hardwareConcurrency || 4;
      return mem <= 2 || cores <= 2;
    };
    const lowTier = isLowTier();
    const isMobile = /Mobi|Android/i.test(navigator.userAgent);

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    scene.background = null;

    // Mobile-optimized camera settings
    const camera = new THREE.OrthographicCamera(
      -width / 2,
      width / 2,
      height / 2,
      -height / 2,
      -10000,
      10000
    );
    
    // Different camera positions for mobile vs desktop
    if (isMobile) {
      camera.position.set(500, 200, 300);
      camera.quaternion.setFromEuler(new THREE.Euler(-0.3, 0.8, 0.2));
    } else {
      camera.position.set(980.99, 179.96, 196.84);
      camera.quaternion.setFromEuler(new THREE.Euler(-0.64, 1.33, 0.63));
    }

    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: !lowTier && !isMobile, 
      powerPreference: isMobile ? 'low-power' : 'high-performance',
      stencil: false,
      depth: true
    });
    
    // Mobile-optimized pixel ratio
    const pixelRatio = isMobile ? 1 : (lowTier ? 1 : Math.min(window.devicePixelRatio, 1.5));
    renderer.setPixelRatio(pixelRatio);
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = false;
    renderer.shadowMap.type = THREE.PCFShadowMap;

    renderer.domElement.style.touchAction = 'pan-y';
    renderer.domElement.style.pointerEvents = 'auto';
    renderer.domElement.style.userSelect = 'none';
    container.appendChild(renderer.domElement);

    // Controls setup - disabled completely on mobile to prevent drift
    let controls: OrbitControls | null = null;
    if (!isMobile) {
      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = lowTier ? 0.03 : 0.08;
      controls.enableZoom = false;
      controls.enablePan = false;
      controls.enableRotate = true;
      controls.maxPolarAngle = Math.PI * 0.8;
      controls.minPolarAngle = Math.PI * 0.2;
      controls.maxAzimuthAngle = Math.PI / 6;
      controls.minAzimuthAngle = -Math.PI / 6;
      controls.rotateSpeed = 0.5;
    }

    // Mobile-optimized animation loop with frame limiting
    let lastFrameTime = 0;
    const targetFPS = isMobile ? 30 : 60;
    const frameInterval = 1000 / targetFPS;
    
    const animate = (currentTime: number) => {
      animationRef.current = requestAnimationFrame(animate);
      
      // Frame rate limiting for mobile
      if (isMobile && currentTime - lastFrameTime < frameInterval) {
        return;
      }
      lastFrameTime = currentTime;
      
      // Only update controls if they exist (desktop only)
      if (controls) {
        controls.update();
      }
      renderer.render(scene, camera);
    };
    animate(0);

    const onResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      renderer.setSize(w, h);
      camera.left = -w / 2;
      camera.right = w / 2;
      camera.top = h / 2;
      camera.bottom = -h / 2;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', onResize);

    // Store initial camera state for mobile stability
    let initialCameraPosition: THREE.Vector3 | null = null;
    let initialCameraTarget: THREE.Vector3 | null = null;

    const loadScene = () => {
      const app = new Application(renderer.domElement);
      splineAppRef.current = app;
      app.load('https://prod.spline.design/0HhtDF4IAOrdc6FJ/scene.splinecode')
        .then(() => {
          setSceneLoaded(true);
          setTimeout(() => {
            scene.updateMatrixWorld(true);
            const box = new THREE.Box3().setFromObject(scene);
            const center = box.getCenter(new THREE.Vector3());
            const size = box.getSize(new THREE.Vector3());
            
            // Mobile-specific scaling and positioning
            if (isMobile) {
              const scale = Math.max(size.x / width, size.y / height) * 1.8;
              camera.zoom = 1 / scale;
              
              // Set stable camera position for mobile
              const targetPosition = new THREE.Vector3(center.x + 200, center.y + 100, center.z + 800);
              camera.position.copy(targetPosition);
              camera.lookAt(center.x, center.y, center.z);
              
              // Store stable positions to prevent drift
              initialCameraPosition = targetPosition.clone();
              initialCameraTarget = new THREE.Vector3(center.x, center.y, center.z);
              
              // Disable any Spline app controls on mobile
              if (app.canvas) {
                app.canvas.style.pointerEvents = 'none';
              }
            } else {
              const scale = Math.max(size.x / width, size.y / height) * 1.2;
              camera.zoom = 1 / scale;
              camera.position.set(center.x, center.y, center.z + 1000);
              camera.lookAt(center);
              
              // Set controls target for desktop
              if (controls) {
                controls.target.copy(center);
              }
            }
            
            camera.updateProjectionMatrix();
            
            // Final update for desktop controls only
            if (controls) {
              controls.update();
            }
          }, isMobile ? 200 : 100);
        })
        .catch(console.error);
    };

    if ('requestIdleCallback' in window) requestIdleCallback(loadScene);
    else setTimeout(loadScene, 300);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', onResize);
      splineAppRef.current?.dispose();
      if (controls) {
        controls.dispose();
      }
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <>
      {!sceneLoaded && (
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'transparent',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          fontSize: '0.9rem',
          zIndex: 99
        }}>
          Loading…
        </div>
      )}
      <div
        ref={containerRef}
        style={{ 
          width: '100%', 
          height: '100%', 
          minHeight: '200px',
          position: 'relative', 
          overflow: 'hidden', 
          WebkitOverflowScrolling: 'touch',
          touchAction: 'pan-y'
        }}
      />
    </>
  );
}
