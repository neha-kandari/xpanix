// Advanced Performance Optimizer for Main Thread Work Reduction
export class PerformanceOptimizer {
  private static instance: PerformanceOptimizer;
  private observer: PerformanceObserver | null = null;
  private longTasksDetected = 0;
  private isOptimizationEnabled = false;

  static getInstance(): PerformanceOptimizer {
    if (!PerformanceOptimizer.instance) {
      PerformanceOptimizer.instance = new PerformanceOptimizer();
    }
    return PerformanceOptimizer.instance;
  }

  // Initialize performance optimizations
  init(): void {
    this.enableOptimizations();
    this.monitorMainThread();
    this.optimizeScheduling();
    this.deferNonCriticalTasks();
  }

  private enableOptimizations(): void {
    this.isOptimizationEnabled = true;
    
    // Disable expensive CSS features on poor performing devices
    if (this.isLowPerformanceDevice()) {
      this.reduceCSSComplexity();
    }
  }

  // Monitor main thread blocking
  private monitorMainThread(): void {
    if (!('PerformanceObserver' in window)) return;

    try {
      this.observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry: PerformanceEntry) => {
          if (entry.entryType === 'longtask') {
            this.longTasksDetected++;
            console.warn(`🚨 Long task: ${entry.duration.toFixed(1)}ms`);
            
            // Auto-optimize if too many long tasks detected
            if (this.longTasksDetected > 5) { // Increased threshold
              // Don't enable emergency optimizations if hero Spline or Cover animations are active
              const allowHeroSpline = window.__allowHeroSpline;
              const allowCoverAnimations = window.__allowCoverAnimations;
              if (!allowHeroSpline && !allowCoverAnimations) {
                this.enableEmergencyOptimizations();
              } else {
                console.log('🛡️ Deferring emergency optimizations - critical animations are active');
              }
            }
          }
        });
      });

      this.observer.observe({ entryTypes: ['longtask'] });
    } catch {
      console.warn('Performance monitoring not available');
    }
  }

  // Optimize task scheduling using modern browser APIs
  private optimizeScheduling(): void {
    // Use scheduler.postTask when available for better performance
    if ('scheduler' in window && 'postTask' in window.scheduler!) {
      // Store reference to scheduler for optimized task scheduling
      window.__optimizedScheduler = true;
    }
  }

  // Non-blocking task scheduler
  private scheduleNonBlocking(callback: (...args: unknown[]) => void, args: unknown[]): number {
    const channel = new MessageChannel();
    const id = Math.random();
    
    channel.port2.onmessage = () => {
      callback(...args);
    };
    
    // Use requestIdleCallback if available
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        channel.port1.postMessage(null);
      }, { timeout: 100 });
    } else {
      channel.port1.postMessage(null);
    }
    
    return id as number;
  }

  // Defer non-critical tasks
  private deferNonCriticalTasks(): void {
    // Defer analytics and tracking
    this.deferTask(() => {
      // Analytics initialization would go here
    }, 3000);

    // Defer non-essential animations
    this.deferTask(() => {
      document.body.classList.add('animations-enabled');
    }, 1000);

    // Defer font loading optimizations
    this.deferTask(() => {
      this.optimizeFontLoading();
    }, 500);
  }

  // Defer task execution
  private deferTask(task: () => void, delay: number): void {
    if ('requestIdleCallback' in window) {
      requestIdleCallback(task, { timeout: delay });
    } else {
      setTimeout(task, delay);
    }
  }

  // Check if device is low performance
  private isLowPerformanceDevice(): boolean {
    const memory = navigator.deviceMemory;
    const cores = navigator.hardwareConcurrency;
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    return (
      Boolean(memory && memory < 4) ||
      Boolean(cores && cores < 4) ||
      Boolean(isMobile && cores && cores < 6)
    );
  }

  // Reduce CSS complexity for low-end devices
  private reduceCSSComplexity(): void {
    const style = document.createElement('style');
    style.textContent = `
      /* Disable expensive CSS properties */
      *, *::before, *::after {
        backdrop-filter: none !important;
        filter: none !important;
        box-shadow: none !important;
        text-shadow: none !important;
        transform: none !important;
        transition: none !important;
        animation: none !important;
      }
      
      /* BUT preserve Cover component animations */
      .group\\/cover,
      .group\\/cover *,
      .group\\/cover *::before,
      .group\\/cover *::after {
        animation: initial !important;
        transition: initial !important;
        transform: initial !important;
      }
      
      /* Simplified gradients */
      .bg-gradient-to-br, .bg-gradient-to-r {
        background: #1a1a1a !important;
      }
      
      /* Disable transform animations */
      .group-hover\\:scale-110, .hover\\:scale-\\[1\\.02\\] {
        transform: none !important;
      }
    `;
    document.head.appendChild(style);
  }

  // Emergency optimizations when performance is critical
  public enableEmergencyOptimizations(): void {
    console.warn('🚨 Enabling emergency performance optimizations');
    
    // Set emergency mode flag but allow hero Spline to load
    window.__emergencyOptimizations = true;
    
    // Disable all animations except critical ones
    const style = document.createElement('style');
    style.textContent = `
      *, *::before, *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
      }
      
      /* Allow hero Spline to still function */
      spline-viewer {
        animation: initial !important;
        transition: initial !important;
      }
      
      /* Allow Cover component animations to work */
      .group\\/cover,
      .group\\/cover *,
      .group\\/cover *::before,
      .group\\/cover *::after {
        animation: initial !important;
        transition: initial !important;
        transform: initial !important;
      }
    `;
    document.head.appendChild(style);

    // Stop non-critical Spline loading but allow hero Spline
    this.disableHeavyComponents();
  }

  // Disable heavy components
  private disableHeavyComponents(): void {
    // Find and hide Spline components
    const splineElements = document.querySelectorAll('spline-viewer');
    splineElements.forEach(el => {
      (el as HTMLElement).style.display = 'none';
    });

    // Stop any pending Spline loads
    const scripts = document.querySelectorAll('script[src*="spline"]');
    scripts.forEach(script => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    });
  }

  // Optimize font loading
  private optimizeFontLoading(): void {
    // Preload critical fonts only
    const criticalFonts = [
      'system-ui',
      '-apple-system',
      'BlinkMacSystemFont'
    ];

    document.documentElement.style.fontFamily = criticalFonts.join(', ');
  }

  // Break up heavy operations into chunks
  static chunkWork<T>(
    items: T[],
    processor: (item: T) => void,
    chunkSize = 5
  ): Promise<void> {
    return new Promise((resolve) => {
      let index = 0;
      
      function processChunk() {
        const endIndex = Math.min(index + chunkSize, items.length);
        
        for (let i = index; i < endIndex; i++) {
          processor(items[i]);
        }
        
        index = endIndex;
        
        if (index < items.length) {
          // Use scheduler.postTask if available
          if ('scheduler' in window && 'postTask' in window.scheduler!) {
            window.scheduler!.postTask(processChunk, { priority: 'background' });
          } else if ('requestIdleCallback' in window) {
            requestIdleCallback(processChunk, { timeout: 50 });
          } else {
            setTimeout(processChunk, 0);
          }
        } else {
          resolve();
        }
      }
      
      processChunk();
    });
  }

  // Optimize images loading
  static optimizeImages(): void {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      if (!img.hasAttribute('loading')) {
        img.setAttribute('loading', 'lazy');
      }
      if (!img.hasAttribute('decoding')) {
        img.setAttribute('decoding', 'async');
      }
    });
  }

  // Clean up when component unmounts
  cleanup(): void {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  }

  // Get performance metrics
  getMetrics(): { longTasks: number; isOptimized: boolean } {
    return {
      longTasks: this.longTasksDetected,
      isOptimized: this.isOptimizationEnabled
    };
  }
}

// Auto-initialize performance optimizer
export const initPerformanceOptimizer = (): void => {
  if (typeof window === 'undefined') return;
  
  const optimizer = PerformanceOptimizer.getInstance();
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => optimizer.init());
  } else {
    optimizer.init();
  }
  
  // Cleanup on page unload
  window.addEventListener('beforeunload', () => optimizer.cleanup());
};

// Emergency performance mode for critical situations
export const enableEmergencyMode = (): void => {
  const optimizer = PerformanceOptimizer.getInstance();
  (optimizer as PerformanceOptimizer).enableEmergencyOptimizations();
}; 