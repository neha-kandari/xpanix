import { useEffect } from 'react';
import { 
  initPerformanceMonitoring, 
  checkPerformanceBudgets, 
  optimizeImageLoading 
} from '../utils/performance';
import { performanceMonitor } from '../libs/threeJSPerformance';

export default function PerformanceInit() {
  useEffect(() => {
    // Initialize performance monitoring
    initPerformanceMonitoring();
    
    // Initialize Three.js performance monitoring
    performanceMonitor.onUpdate((stats) => {
      // Log performance stats in development
      if (process.env.NODE_ENV === 'development') {
        console.log('Performance Stats:', stats);
      }
    });
    
    // Check performance budgets
    checkPerformanceBudgets();
    
    // Optimize image loading after a delay
    const timer = setTimeout(() => {
      optimizeImageLoading();
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return null; // This component doesn't render anything
} 