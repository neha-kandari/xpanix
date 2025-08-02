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

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    scene.background = null;

    const camera = new THREE.OrthographicCamera(
      -width / 2,
      width / 2,
      height / 2,
      -height / 2,
      -10000,
      10000
    );
    camera.position.set(980.99, 179.96, 196.84);
    camera.quaternion.setFromEuler(new THREE.Euler(-0.64, 1.33, 0.63));

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: !lowTier, powerPreference: 'low-power' });
    renderer.setPixelRatio(lowTier ? 1 : Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = false;
    renderer.shadowMap.type = THREE.PCFShadowMap;

    renderer.domElement.style.touchAction = 'pan-y';
    renderer.domElement.style.pointerEvents = 'auto';
    renderer.domElement.style.userSelect = 'none';
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = lowTier ? 0.03 : 0.08;
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.enableRotate = true;
    controls.maxPolarAngle = Math.PI * 0.8;
    controls.minPolarAngle = Math.PI * 0.2;
    controls.maxAzimuthAngle = Math.PI / 6;
    controls.minAzimuthAngle = -Math.PI / 6;

    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

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
            const scale = Math.max(size.x / width, size.y / height) * 1.2;
            camera.zoom = 1 / scale;
            camera.position.set(center.x, center.y, center.z + 1000);
            camera.lookAt(center);
            controls.target.copy(center);
            camera.updateProjectionMatrix();
            controls.update();
          }, 100);
        })
        .catch(console.error);
    };

    if ('requestIdleCallback' in window) requestIdleCallback(loadScene);
    else setTimeout(loadScene, 300);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', onResize);
      splineAppRef.current?.dispose();
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
          fontSize: '1rem',
          zIndex: 99
        }}>
          Loading…
        </div>
      )}
      <div
        ref={containerRef}
        style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden', WebkitOverflowScrolling: 'touch' }}
      />
    </>
  );
}
