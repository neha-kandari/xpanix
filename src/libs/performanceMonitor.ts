// Performance monitoring for mobile optimization
export class MobilePerformanceMonitor {
  private static instance: MobilePerformanceMonitor;
  private startTime: number = performance.now();
  private metrics: Map<string, number> = new Map();

  static getInstance(): MobilePerformanceMonitor {
    if (!MobilePerformanceMonitor.instance) {
      MobilePerformanceMonitor.instance = new MobilePerformanceMonitor();
    }
    return MobilePerformanceMonitor.instance;
  }

  // Track main thread blocking time
  trackMainThreadWork(taskName: string, fn: () => void | Promise<void>): Promise<void> {
    return new Promise(async (resolve) => {
      const start = performance.now();
      
      // Schedule a task to run in the background
      if ('scheduler' in window && 'postTask' in window.scheduler!) {
        await window.scheduler!.postTask(fn, { priority: 'background' });
      } else if ('requestIdleCallback' in window) {
        // Fallback: break up work using MessageChannel
        await this.scheduleTask(fn);
      }
      
      const duration = performance.now() - start;
      this.metrics.set(taskName, duration);
      
      if (duration > 50) {
        console.warn(`Task "${taskName}" took ${duration.toFixed(2)}ms (>50ms threshold)`);
      }
      
      resolve();
    });
  }

  // Break up heavy tasks to prevent main thread blocking
  private scheduleTask(fn: () => void | Promise<void>): Promise<void> {
    return new Promise((resolve) => {
      const channel = new MessageChannel();
      channel.port2.onmessage = async () => {
        await fn();
        resolve();
      };
      channel.port1.postMessage(null);
    });
  }

  // Monitor Long Tasks (if supported)
  monitorLongTasks(): void {
    if ('PerformanceObserver' in window) {
      try {
        const observer = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry: PerformanceEntry) => {
            if (entry.duration > 50) {
              console.warn(`Long task detected: ${entry.duration.toFixed(2)}ms`);
              this.metrics.set(`longTask_${Date.now()}`, entry.duration);
            }
          });
        });
        
        observer.observe({ entryTypes: ['longtask'] });
      } catch {
        // PerformanceObserver not supported or longtask not available
      }
    }
  }

  // Get performance metrics
  getMetrics(): Record<string, number> {
    const obj: Record<string, number> = {};
    this.metrics.forEach((value, key) => {
      obj[key] = value;
    });
    return obj;
  }

  // Check if device is struggling with performance
  isDeviceStruggling(): boolean {
    const longTasks = Array.from(this.metrics.entries())
      .filter(([key]) => key.startsWith('longTask_'))
      .length;
    
    return longTasks > 5; // More than 5 long tasks indicates struggling
  }

  // Get total time spent on main thread
  getTotalMainThreadTime(): number {
    return Array.from(this.metrics.values()).reduce((sum, time) => sum + time, 0);
  }
}

// Utility to defer script execution
export const deferExecution = (fn: () => void, delay = 16): void => {
  if ('requestIdleCallback' in window) {
    requestIdleCallback(fn, { timeout: delay * 4 });
  } else {
    setTimeout(fn, delay);
  }
};

// Chunk large operations to prevent blocking
export const chunkOperation = async <T>(
  items: T[],
  processor: (item: T) => void,
  chunkSize = 10
): Promise<void> => {
  for (let i = 0; i < items.length; i += chunkSize) {
    const chunk = items.slice(i, i + chunkSize);
    
    await new Promise<void>((resolve) => {
      deferExecution(() => {
        chunk.forEach(processor);
        resolve();
      });
    });
  }
};

// Initialize performance monitoring
export const initMobilePerformanceMonitoring = (): void => {
  const monitor = MobilePerformanceMonitor.getInstance();
  monitor.monitorLongTasks();
  
  // Report performance metrics after page load
  if (document.readyState === 'complete') {
    reportMetrics();
  } else {
    window.addEventListener('load', reportMetrics);
  }
};

const reportMetrics = (): void => {
  setTimeout(() => {
    const monitor = MobilePerformanceMonitor.getInstance();
    const metrics = monitor.getMetrics();
    const totalTime = monitor.getTotalMainThreadTime();
    
    console.log('Mobile Performance Metrics:', {
      totalMainThreadTime: `${totalTime.toFixed(2)}ms`,
      isDeviceStruggling: monitor.isDeviceStruggling(),
      metrics
    });
  }, 3000);
}; 