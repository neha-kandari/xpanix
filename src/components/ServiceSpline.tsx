import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Application } from '@splinetool/runtime';

export default function ServiceSpline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);
  const splineAppRef = useRef<Application | null>(null);
  const [sceneLoaded, setSceneLoaded] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const isLowTier = () => {
      const mem = (navigator as any).deviceMemory || 4;
      const cores = navigator.hardwareConcurrency || 4;
      return mem <= 2 || cores <= 2;
    };

    const lowTier = isLowTier();
    const isMobile = /Mobi|Android/i.test(navigator.userAgent);

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
    camera.position.set(0, 0, 1000);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: !lowTier });
    renderer.setPixelRatio(lowTier ? 1 : Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = !lowTier;
    renderer.shadowMap.type = THREE.PCFShadowMap;

    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.1;
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.enableRotate = true;
    controls.maxPolarAngle = Math.PI * 0.8;
    controls.minPolarAngle = Math.PI * 0.2;
    controls.maxAzimuthAngle = Math.PI / 6;
    controls.minAzimuthAngle = -Math.PI / 6;

    // Reduce damping on mobile to prevent drift
    if (isMobile) {
      controls.dampingFactor = 0.05;
      controls.rotateSpeed = 0.3;
    }

    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.left = -w / 2;
      camera.right = w / 2;
      camera.top = h / 2;
      camera.bottom = -h / 2;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', onResize);

    const centerCameraToScene = () => {
      scene.updateMatrixWorld(true);
      const box = new THREE.Box3().setFromObject(scene);
      const size = box.getSize(new THREE.Vector3());
      const center = box.getCenter(new THREE.Vector3());

      if (size.length() === 0 || isNaN(center.x)) {
        // Retry after short delay if scene is not ready
        setTimeout(centerCameraToScene, 150);
        return;
      }

      const scale = Math.max(size.x / width, size.y / height) * 1.2;
      camera.zoom = 1 / scale;
      camera.position.set(center.x, center.y, center.z + 1000);
      camera.lookAt(center);
      controls.target.copy(center);
      camera.updateProjectionMatrix();
      controls.update();

      // Lock controls target on mobile to prevent drift
      if (isMobile) {
        controls.saveState();
      }
    };

    const loadScene = () => {
      const app = new Application(renderer.domElement);
      splineAppRef.current = app;
      app
        .load('https://prod.spline.design/0HhtDF4IAOrdc6FJ/scene.splinecode')
        .then(() => {
          setSceneLoaded(true);
          setTimeout(centerCameraToScene, 100);
          
          // Disable Spline app pointer events on mobile to prevent conflicts
          if (isMobile && app.canvas) {
            app.canvas.style.pointerEvents = 'none';
          }
        })
        .catch(console.error);
    };

    // Idle loading fallback
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(loadScene);
    } else {
      setTimeout(loadScene, 300);
    }

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', onResize);
      splineAppRef.current?.dispose();
      controls.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <>
      {!sceneLoaded && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: '#000',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'sans-serif',
            fontSize: '1rem',
            zIndex: 99,
          }}
        >
          Loading…
        </div>
      )}
      <div ref={containerRef} style={{ width: '100%', height: '100%', position: 'relative' }} />
    </>
  );
} 
