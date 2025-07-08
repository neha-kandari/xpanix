let isSplineLoaded = false;
let loadingPromise: Promise<void> | null = null;
let scriptElement: HTMLScriptElement | null = null;

// Debounced loader to prevent multiple simultaneous loads
let loadTimeout: NodeJS.Timeout | null = null;

// Mobile detection and performance checks
const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
         window.innerWidth <= 768;
};

const isLowEndDevice = () => {
  // Check for low-end device indicators
  const memory = navigator.deviceMemory;
  const cores = navigator.hardwareConcurrency;
  return memory && memory < 4 || cores && cores < 4;
};

const isSlowConnection = () => {
  const connection = navigator.connection;
  if (!connection) return false;
  
  return connection.effectiveType === 'slow-2g' || 
         connection.effectiveType === '2g' ||
         connection.effectiveType === '3g' ||
         connection.saveData === true;
};

export const loadSplineViewer = (priority: 'high' | 'low' = 'low'): Promise<void> => {
  if (isSplineLoaded) {
    return Promise.resolve();
  }

  if (loadingPromise) {
    return loadingPromise;
  }

  // Enhanced performance checks
  const mobile = isMobile();
  const lowEnd = isLowEndDevice();
  const slowConn = isSlowConnection();
  
  // Check if emergency optimizations are active
  const emergencyMode = window.__emergencyOptimizations;
  
  // For high priority (hero section), be more aggressive - only skip on very poor conditions
  if (priority === 'high') {
    // Check if hero Spline is explicitly allowed
    const allowHeroSpline = window.__allowHeroSpline;
    
    if (allowHeroSpline) {
      console.log('🚀 Hero Spline explicitly allowed - loading regardless of conditions');
      // Skip all performance checks for hero Spline
    } else {
      // Only skip on extremely poor conditions for high priority loads
      if (mobile && lowEnd && slowConn && emergencyMode) {
        console.log('Skipping high priority Spline loading due to extremely poor conditions');
        return Promise.resolve();
      }
    }
  } else {
    // Original logic for low priority
    if (mobile && lowEnd && slowConn || emergencyMode) {
      console.log('Skipping Spline loading due to poor device/network conditions or emergency mode');
      return Promise.resolve();
    }

    // Additional check: Skip if main thread is already heavily loaded (only for low priority)
    if (window.__performanceOptimized) {
      const entries = performance.getEntriesByType('measure');
      if (entries.length > 50) {
        console.log('Deferring Spline loading due to high main thread activity');
        return new Promise(resolve => setTimeout(() => resolve(), 5000));
      }
    }
  }

  loadingPromise = new Promise<void>((resolve, reject) => {
    // Check if spline-viewer is already defined
    if (customElements.get('spline-viewer')) {
      isSplineLoaded = true;
      resolve();
      return;
    }

    const loadScript = () => {
      if (scriptElement) {
        // Script is already being loaded
        scriptElement.addEventListener('load', () => resolve());
        scriptElement.addEventListener('error', () => reject());
        return;
      }

      scriptElement = document.createElement("script");
      scriptElement.type = "module";
      scriptElement.src = "https://unpkg.com/@splinetool/viewer@1.10.24/build/spline-viewer.js";
      scriptElement.async = true;
      scriptElement.defer = true;
      
      // Add loading priority hints
      if (priority === 'high' && !mobile) {
        scriptElement.setAttribute('fetchpriority', 'high');
      } else {
        scriptElement.setAttribute('fetchpriority', 'low');
      }
      
      scriptElement.onload = () => {
        isSplineLoaded = true;
        scriptElement = null;
        resolve();
      };
      
      scriptElement.onerror = () => {
        scriptElement = null;
        loadingPromise = null;
        reject(new Error('Failed to load Spline viewer script'));
      };
      
      document.head.appendChild(scriptElement);
    };

    // Optimized loading strategy
    const getLoadDelay = () => {
      // High priority always loads immediately
      if (priority === 'high') return 0;
      
      // For low priority, add minimal delays only for poor conditions
      if (mobile && slowConn && lowEnd) return 2000; // 2s delay only for very poor conditions
      return mobile ? 500 : 0; // Minimal delay for mobile, immediate for desktop
    };

    const delay = getLoadDelay();

    if (delay === 0) {
      // Load immediately for high priority or good conditions
      loadScript();
    } else {
      // Use minimal delays only when necessary
      if ('requestIdleCallback' in window) {
        requestIdleCallback(loadScript, { timeout: delay + 1000 });
      } else {
        setTimeout(loadScript, delay);
      }
    }
  });

  return loadingPromise;
};

// Enhanced lazy loader with optimized settings
export const createLazySplineLoader = (threshold = 0.1, rootMargin = '100px') => {
  const mobile = isMobile();
  const lowEnd = isLowEndDevice();
  
  // Balanced threshold and margin for smooth loading
  const optimizedThreshold = mobile ? 0.15 : threshold; // Slightly higher for mobile but not excessive
  const optimizedMargin = mobile ? '150px' : rootMargin; // Reasonable margin for mobile
  
  return (element: Element, callback: () => void) => {
    // Skip on very low-end mobile devices
    if (mobile && lowEnd && isSlowConnection()) {
      console.log('Skipping Spline animation on low-end mobile device');
      return () => {}; // Return empty cleanup
    }

    if (!('IntersectionObserver' in window)) {
      // Longer fallback delay for mobile
      setTimeout(callback, mobile ? 5000 : 2000);
      return () => {};
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Minimal delay for smooth loading
            if (loadTimeout) clearTimeout(loadTimeout);
            const loadDelay = mobile ? 200 : 100;
            loadTimeout = setTimeout(() => {
              callback();
              observer.unobserve(element);
            }, loadDelay);
          }
        });
      },
      { 
        threshold: optimizedThreshold, 
        rootMargin: optimizedMargin,
        // Balanced settings for smooth performance
        trackVisibility: true,
        delay: 100 // Minimum required for trackVisibility
      } as IntersectionObserverInit
    );

    observer.observe(element);
    
    // Cleanup function
    return () => {
      observer.unobserve(element);
      if (loadTimeout) clearTimeout(loadTimeout);
    };
  };
};

// Optimized preload function
export const preloadSplineViewer = () => {
  if (typeof window === 'undefined') return;
  
  const mobile = isMobile();
  const lowEnd = isLowEndDevice();
  const slowConn = isSlowConnection();
  
  // Skip preloading only on very poor conditions
  if (lowEnd && slowConn) {
    return;
  }
  
  // Immediate preload for better performance
  const preloadDelay = mobile ? 1000 : 0;
  
  setTimeout(() => {
    if (!isSplineLoaded) {
      const link = document.createElement('link');
      link.rel = 'modulepreload';
      link.href = 'https://unpkg.com/@splinetool/viewer@1.10.24/build/spline-viewer.js';
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    }
  }, preloadDelay);
};

// Mobile-specific: Check if we should show Spline at all
export const shouldShowSpline = (): boolean => {
  const mobile = isMobile();
  const lowEnd = isLowEndDevice();
  const slowConn = isSlowConnection();
  
  // Skip on very poor conditions
  if (mobile && lowEnd && slowConn) {
    return false;
  }
  
  return true;
}; 