"use client";

import { useEffect } from 'react';
import HeroSection from '@/components/HeroSection';
import WhatWeDoSection from "@/components/WhatWeDoSection";
import BenefitsSection from '@/components/BenefitsSection';
import SplineClient from '@/components/SplineClient';
import { initMobilePerformanceMonitoring } from '@/libs/performanceMonitor';
import { initPerformanceOptimizer } from '@/libs/performanceOptimizer';

export default function Home() {
  useEffect(() => {
    // Initialize performance monitoring for mobile optimization
    initMobilePerformanceMonitoring();
    
    // Defer performance optimizer to allow Spline to load first
    if (typeof window !== 'undefined') {
      // Give Spline time to load before activating optimizations
      setTimeout(() => {
        if ('requestIdleCallback' in window) {
          requestIdleCallback(() => {
            initPerformanceOptimizer();
          }, { timeout: 2000 });
        } else {
          setTimeout(() => {
            initPerformanceOptimizer();
          }, 3000);
        }
      }, 2000); // Wait 2 seconds before initializing optimizer
    }
  }, []);

  return (
    <>
      <HeroSection>
        <SplineClient />
      </HeroSection>
      <WhatWeDoSection />
      <BenefitsSection/>
    </>
  );
}
