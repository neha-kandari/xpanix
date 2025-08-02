import React, { useState, useEffect, useRef, ReactNode } from 'react';
import { Suspense, lazy } from 'react';
import { createIntersectionObserver } from '../utils/performance';

interface LazyWrapperProps {
  children: React.ReactNode;
  fallback?: React.ComponentType;
  rootMargin?: string;
  threshold?: number;
  className?: string;
}

const DefaultFallback = () => (
  <div className="flex items-center justify-center p-8">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
  </div>
);

export default function LazyWrapper({ 
  children, 
  fallback: Fallback = DefaultFallback,
  rootMargin = '100px',
  threshold = 0.1,
  className = ''
}: LazyWrapperProps) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = createIntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer?.unobserve(element);
          }
        });
      },
      { rootMargin, threshold }
    );

    if (observer) {
      observer.observe(element);
      return () => observer.disconnect();
    } else {
      // Fallback for browsers without IntersectionObserver
      setIsVisible(true);
    }
  }, [rootMargin, threshold]);

  return (
    <div ref={elementRef} className={className}>
      {isVisible ? (
        <Suspense fallback={<Fallback />}>
          {children}
        </Suspense>
      ) : (
        <div style={{ minHeight: '200px' }} className="flex items-center justify-center">
          <div className="w-4 h-4 bg-gray-400 rounded-full animate-pulse"></div>
        </div>
      )}
    </div>
  );
} 