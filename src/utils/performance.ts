// Performance monitoring utilities
import { onCLS, onFCP, onINP, onLCP, onTTFB } from 'web-vitals';

// Web Vitals monitoring
export function initPerformanceMonitoring() {
  if (typeof window === 'undefined') return;

  // Track Core Web Vitals
  onCLS(sendToAnalytics);
  onFCP(sendToAnalytics);
  onINP(sendToAnalytics);
  onLCP(sendToAnalytics);
  onTTFB(sendToAnalytics);

  // Monitor long tasks
  if ('PerformanceObserver' in window) {
    const longTaskObserver = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.duration > 50) {
          console.warn('Long task detected:', {
            duration: entry.duration,
            startTime: entry.startTime,
            name: entry.name,
          });
          
          // Send to analytics in production
          if (import.meta.env.MODE === 'production') {
            sendToAnalytics({
              name: 'Long Task',
              value: entry.duration,
              id: `long-task-${Date.now()}`,
            });
          }
        }
      });
    });

    try {
      longTaskObserver.observe({ entryTypes: ['longtask'] });
    } catch (e) {
      console.warn('Long task observer not supported');
    }
  }

  // Monitor layout shifts
  if ('PerformanceObserver' in window) {
    const clsObserver = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry: any) => {
        if (!entry.hadRecentInput && entry.value > 0.1) {
          console.warn('Layout shift detected:', {
            value: entry.value,
            sources: entry.sources,
          });
        }
      });
    });

    try {
      clsObserver.observe({ entryTypes: ['layout-shift'] });
    } catch (e) {
      console.warn('Layout shift observer not supported');
    }
  }
}

// Send metrics to analytics service
function sendToAnalytics({ name, value, id }: { name: string; value: number; id: string }) {
  // Log in development
  if (import.meta.env.MODE === 'development') {
    console.log(`Performance Metric - ${name}:`, {
      value: Math.round(value * 1000) / 1000,
      id,
      timestamp: new Date().toISOString(),
    });
  }

  // In production, send to your analytics service
  if (import.meta.env.MODE === 'production' && typeof window !== 'undefined') {
    // Example: Google Analytics 4
    if (typeof (window as any).gtag !== 'undefined') {
      (window as any).gtag('event', name, {
        custom_parameter_1: value,
        custom_parameter_2: id,
      });
    }

    // Example: Custom analytics endpoint
    // fetch('/api/analytics', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ metric: name, value, id }),
    // }).catch(console.error);
  }
}

// Performance budget monitoring
export function checkPerformanceBudgets() {
  if (typeof window === 'undefined') return;

  // Define performance budgets
  const budgets = {
    'Largest Contentful Paint': 2500, // 2.5s
    'First Input Delay': 100,         // 100ms
    'Cumulative Layout Shift': 0.1,   // 0.1
    'First Contentful Paint': 1800,   // 1.8s
    'Time to First Byte': 800,        // 800ms
  };

  // Check budgets after page load
  window.addEventListener('load', () => {
    setTimeout(() => {
      Object.entries(budgets).forEach(([metric, budget]) => {
        // This is a simplified check - real implementation would track actual values
        console.log(`Performance Budget Check - ${metric}: ${budget}ms/units`);
      });
    }, 3000);
  });
}

// Resource loading optimization
export function optimizeResourceLoading() {
  if (typeof window === 'undefined') return;

  // Preload critical resources
  const criticalResources = [
    { href: '/fonts/your-critical-font.woff2', as: 'font', type: 'font/woff2' },
    // Add your critical resources here
  ];

  criticalResources.forEach((resource) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = resource.href;
    link.as = resource.as;
    if (resource.type) link.type = resource.type;
    if (resource.as === 'font') link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });
}

// Lazy loading utility for components
export function createIntersectionObserver(
  callback: (entries: IntersectionObserverEntry[]) => void,
  options: IntersectionObserverInit = {}
) {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    return null;
  }

  const defaultOptions: IntersectionObserverInit = {
    root: null,
    rootMargin: '50px',
    threshold: 0.1,
    ...options,
  };

  return new IntersectionObserver(callback, defaultOptions);
}

// Main thread optimization
export function breakLongTask<T>(
  items: T[],
  processor: (item: T) => void,
  batchSize: number = 10
): Promise<void> {
  return new Promise((resolve) => {
    let index = 0;

    function processBatch() {
      const endIndex = Math.min(index + batchSize, items.length);
      
      for (let i = index; i < endIndex; i++) {
        processor(items[i]);
      }
      
      index = endIndex;
      
      if (index < items.length) {
        // Use scheduler.postTask if available, otherwise setTimeout
        if ('scheduler' in window && 'postTask' in (window as any).scheduler) {
          (window as any).scheduler.postTask(processBatch, { priority: 'background' });
        } else {
          setTimeout(processBatch, 0);
        }
      } else {
        resolve();
      }
    }

    processBatch();
  });
}

// Image optimization utility
export function optimizeImageLoading() {
  if (typeof window === 'undefined') return;

  // Add loading="lazy" to all images not in viewport
  const images = document.querySelectorAll('img:not([loading])');
  
  images.forEach((img, index) => {
    // First few images load eagerly
    if (index < 3) {
      img.setAttribute('loading', 'eager');
    } else {
      img.setAttribute('loading', 'lazy');
    }
  });
} 