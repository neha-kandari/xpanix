#!/usr/bin/env node

/**
 * Spline Performance Monitor
 * This script helps monitor spline animation performance in real-time
 */

console.log('🎯 Spline Performance Monitor');
console.log('=============================\n');

// Monitor console for spline-related messages
const originalConsoleWarn = console.warn;
const originalConsoleError = console.error;

let splineWarnings = 0;
let splineErrors = 0;
let webglErrors = 0;

console.warn = function(...args) {
  const message = args.join(' ');
  if (message.includes('Spline')) {
    splineWarnings++;
    console.log(`⚠️  Spline Warning #${splineWarnings}: ${message}`);
  } else {
    originalConsoleWarn.apply(console, args);
  }
};

console.error = function(...args) {
  const message = args.join(' ');
  if (message.includes('WebGL') || message.includes('GL_INVALID')) {
    webglErrors++;
    console.log(`🔴 WebGL Error #${webglErrors}: ${message}`);
  } else if (message.includes('Spline')) {
    splineErrors++;
    console.log(`❌ Spline Error #${splineErrors}: ${message}`);
  } else {
    originalConsoleError.apply(console, args);
  }
};

// Performance monitoring
let frameCount = 0;
let lastTime = performance.now();

function monitorPerformance() {
  const currentTime = performance.now();
  const frameTime = currentTime - lastTime;
  lastTime = currentTime;
  frameCount++;

  // Log performance every 5 seconds
  if (frameCount % 300 === 0) { // Assuming 60fps, 300 frames = 5 seconds
    console.log(`📊 Performance Stats:`);
    console.log(`   Frame Time: ${frameTime.toFixed(2)}ms`);
    console.log(`   Spline Warnings: ${splineWarnings}`);
    console.log(`   Spline Errors: ${splineErrors}`);
    console.log(`   WebGL Errors: ${webglErrors}`);
    console.log('---');
  }

  requestAnimationFrame(monitorPerformance);
}

// Start monitoring
requestAnimationFrame(monitorPerformance);

console.log('✅ Performance monitoring started');
console.log('📊 Check the console for real-time performance data\n');

// Export for use in browser console
if (typeof window !== 'undefined') {
  window.splinePerformanceMonitor = {
    getStats: () => ({
      frameCount,
      splineWarnings,
      splineErrors,
      webglErrors
    }),
    reset: () => {
      frameCount = 0;
      splineWarnings = 0;
      splineErrors = 0;
      webglErrors = 0;
    }
  };
} 