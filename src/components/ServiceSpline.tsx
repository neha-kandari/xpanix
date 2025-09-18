import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Application } from '@splinetool/runtime';

export default function ServiceSpline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const splineAppRef = useRef<Application | null>(null);
  const animationRef = useRef<number>(0);
  const [sceneLoaded, setSceneLoaded] = useState(false);
  const cameraPositionRef = useRef<THREE.Vector3 | null>(null);
  const cameraTargetRef = useRef<THREE.Vector3 | null>(null);

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
    scene.background = new THREE.Color(0x000000);

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
      powerPreference: isMobile ? 'low-power' : 'high-performance'
    });
    renderer.setPixelRatio(isMobile ? 1 : (lowTier ? 1 : Math.min(window.devicePixelRatio, 1.5)));
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = !lowTier;
    renderer.shadowMap.type = THREE.PCFShadowMap;

    renderer.domElement.style.touchAction = 'pan-y';
    renderer.domElement.style.pointerEvents = 'auto';
    renderer.domElement.style.userSelect = 'none';
    container.appendChild(renderer.domElement);

    // Controls setup - disabled on mobile to prevent drift
    let controls: OrbitControls | null = null;
    if (!isMobile) {
      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = lowTier ? 0.05 : 0.1;
      controls.enableZoom = false;
      controls.enablePan = false;
      controls.enableRotate = true;
      controls.maxPolarAngle = Math.PI * 0.8;
      controls.minPolarAngle = Math.PI * 0.2;
      controls.maxAzimuthAngle = Math.PI / 6;
      controls.minAzimuthAngle = -Math.PI / 6;
    }

    // Function to stabilize camera position
    const stabilizeCamera = () => {
      if (cameraPositionRef.current && cameraTargetRef.current) {
        camera.position.copy(cameraPositionRef.current);
        camera.lookAt(cameraTargetRef.current);
        camera.updateProjectionMatrix();
        if (controls) {
          controls.target.copy(cameraTargetRef.current);
          controls.update();
        }
      }
    };

    // Scroll event handler to maintain camera position
    const handleScroll = () => {
      if (isMobile) {
        // Stabilize camera position on scroll for mobile
        requestAnimationFrame(stabilizeCamera);
      }
    };

    // Resize handler
    const onResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      renderer.setSize(w, h);
      camera.left = -w / 2;
      camera.right = w / 2;
      camera.top = h / 2;
      camera.bottom = -h / 2;
      camera.updateProjectionMatrix();
      
      // Restabilize camera after resize
      if (sceneLoaded) {
        setTimeout(stabilizeCamera, 100);
      }
    };

    window.addEventListener('resize', onResize);
    window.addEventListener('scroll', handleScroll, { passive: true });

    const animate = (time = 0) => {
      animationRef.current = requestAnimationFrame(animate);
      if (controls) {
        controls.update();
      }
      renderer.render(scene, camera);
    };
    animate();

    const loadScene = () => {
      const app = new Application(renderer.domElement);
      splineAppRef.current = app;
      app.load('https://prod.spline.design/0HhtDF4IAOrdc6FJ/scene.splinecode')
        .then(() => {
          setSceneLoaded(true);
          // Center camera
          setTimeout(() => {
            scene.updateMatrixWorld(true);
            const box = new THREE.Box3().setFromObject(scene);
            const center = box.getCenter(new THREE.Vector3());
            const size = box.getSize(new THREE.Vector3());
            
            if (isMobile) {
              // Mobile-specific positioning to center the animation
              const scale = Math.max(size.x / width, size.y / height) * 1.8;
              camera.zoom = 1 / scale;
              camera.position.set(center.x + 200, center.y + 100, center.z + 800);
              camera.lookAt(center.x, center.y, center.z);
              
              // Store stable positions for mobile
              cameraPositionRef.current = camera.position.clone();
              cameraTargetRef.current = new THREE.Vector3(center.x, center.y, center.z);
              
              // Disable Spline app controls on mobile to prevent conflicts
              if (app.canvas) {
                app.canvas.style.pointerEvents = 'none';
              }
            } else {
              const maxDim = Math.max(size.x, size.y, size.z);
              // For orthographic camera, adjust zoom based on scene size
              const scale = Math.max(size.x / width, size.y / height) * 1.2;
              camera.zoom = 1 / scale;
              camera.position.set(center.x, center.y, center.z + 1000);
              camera.lookAt(center);
              if (controls) {
                controls.target.copy(center);
              }
            }
            
            camera.updateProjectionMatrix();
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
      window.removeEventListener('scroll', handleScroll);
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
          backgroundColor: '#000',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          fontSize: '1rem',
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
          position: 'relative',
          overflow: 'hidden',
          WebkitOverflowScrolling: 'touch',
          touchAction: 'pan-y'
        }} 
      />
    </>
  );
} 