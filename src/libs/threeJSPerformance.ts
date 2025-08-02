import * as THREE from 'three';

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

class ThreeJSPerformanceMonitor {
  private stats: PerformanceStats;
  private frameCount: number = 0;
  private lastTime: number = performance.now();
  private renderer: THREE.WebGLRenderer | null = null;
  private scene: THREE.Scene | null = null;
  private onStatsUpdate: ((stats: PerformanceStats) => void) | null = null;

  constructor() {
    this.stats = {
      fps: 60,
      memoryUsage: 0,
      renderTime: 0,
      triangleCount: 0,
      drawCalls: 0,
      deviceCapabilities: this.detectDeviceCapabilities()
    };
  }

  private detectDeviceCapabilities() {
    const userAgent = navigator.userAgent;
    const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
    const isSmallScreen = window.innerWidth <= 768;
    const isMobile = isMobileUA || (isSmallScreen && window.innerHeight < 600);

    // Memory detection
    let hasLowMemory = false;
    if ('performance' in window && 'memory' in performance) {
      const memory = (performance as any).memory;
      const totalMemory = memory.jsHeapSizeLimit / (1024 * 1024); // MB
      hasLowMemory = totalMemory < 512;
    }

    // GPU detection
    let hasSlowGPU = false;
    let maxTextureSize = 2048;
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl') as WebGLRenderingContext | null;
    if (gl) {
      maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);
      hasSlowGPU = maxTextureSize < 2048;
    }

    const isLowEnd = isMobile || hasLowMemory || hasSlowGPU || window.innerWidth < 768;
    let pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    if (isLowEnd) pixelRatio = Math.min(pixelRatio, 1);
    if (hasSlowGPU) pixelRatio = 1;

    return {
      isMobile,
      isLowEnd,
      hasLowMemory,
      hasSlowGPU,
      pixelRatio,
      maxTextureSize
    };
  }

  setRenderer(renderer: THREE.WebGLRenderer) {
    this.renderer = renderer;
  }

  setScene(scene: THREE.Scene) {
    this.scene = scene;
  }

  onUpdate(callback: (stats: PerformanceStats) => void) {
    this.onStatsUpdate = callback;
  }

  update() {
    this.frameCount++;
    const currentTime = performance.now();
    
    // Update FPS every 60 frames
    if (this.frameCount % 60 === 0) {
      this.stats.fps = 60000 / (currentTime - this.lastTime);
      this.lastTime = currentTime;
    }

    // Update memory usage
    if ('performance' in window && 'memory' in performance) {
      const memory = (performance as any).memory;
      this.stats.memoryUsage = memory.usedJSHeapSize / (1024 * 1024); // MB
    }

    // Update renderer stats if available
    if (this.renderer) {
      const info = this.renderer.info;
      this.stats.triangleCount = info.render.triangles;
      this.stats.drawCalls = info.render.calls;
    }

    // Update render time
    this.stats.renderTime = currentTime - this.lastTime;

    // Call update callback
    if (this.onStatsUpdate) {
      this.onStatsUpdate(this.stats);
    }

    // Log performance warnings
    this.checkPerformanceWarnings();
  }

  private checkPerformanceWarnings() {
    const warnings = [];

    if (this.stats.fps < 30) {
      warnings.push(`Low FPS: ${this.stats.fps.toFixed(1)}`);
    }

    if (this.stats.memoryUsage > 200) {
      warnings.push(`High memory usage: ${this.stats.memoryUsage.toFixed(1)}MB`);
    }

    if (this.stats.triangleCount > 10000) {
      warnings.push(`High triangle count: ${this.stats.triangleCount}`);
    }

    if (warnings.length > 0) {
      console.warn('ThreeJS Performance Warnings:', warnings.join(', '));
    }
  }

  getStats(): PerformanceStats {
    return { ...this.stats };
  }

  getDeviceCapabilities() {
    return this.stats.deviceCapabilities;
  }

  shouldUseLowQuality(): boolean {
    const { isLowEnd, hasLowMemory, hasSlowGPU } = this.stats.deviceCapabilities;
    return isLowEnd || hasLowMemory || hasSlowGPU || this.stats.fps < 30;
  }

  getOptimalPixelRatio(): number {
    const { pixelRatio } = this.stats.deviceCapabilities;
    if (this.stats.fps < 30) {
      return Math.max(0.5, pixelRatio * 0.5);
    }
    return pixelRatio;
  }
}

export const performanceMonitor = new ThreeJSPerformanceMonitor();

export function getPerformanceStats(): PerformanceStats {
  return performanceMonitor.getStats();
}

export function shouldUseLowQuality(): boolean {
  return performanceMonitor.shouldUseLowQuality();
}

export function getOptimalPixelRatio(): number {
  return performanceMonitor.getOptimalPixelRatio();
} 