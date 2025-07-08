"use client";

import React, { useEffect, useState } from 'react';

interface PerformanceFallbackProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  threshold?: number; // Number of long tasks before switching to fallback
}

export default function PerformanceFallback({ 
  children, 
  fallback, 
  threshold = 3 
}: PerformanceFallbackProps) {
  const [useHighPerformance, setUseHighPerformance] = useState(true);

  useEffect(() => {
    // Check initial device capabilities
    const isLowEndDevice = () => {
      const memory = navigator.deviceMemory;
      const cores = navigator.hardwareConcurrency;
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      
      return (
        Boolean(memory && memory < 4) ||
        Boolean(cores && cores < 4) ||
        Boolean(isMobile && cores && cores < 6)
      );
    };

    // Immediately switch to fallback for very low-end devices
    if (isLowEndDevice()) {
      setUseHighPerformance(false);
      return;
    }

    // Monitor performance and switch if needed
    let observer: PerformanceObserver | null = null;

    if ('PerformanceObserver' in window) {
      try {
        observer = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry: PerformanceEntry) => {
            if (entry.entryType === 'longtask' && entry.duration > 50) {
              // Count this as a strike towards fallback mode
              setUseHighPerformance(false);
              // Add emergency performance class to body
              document.body.classList.add('emergency-performance');
              window.__emergencyOptimizations = true;
            }
          });
        });

        observer.observe({ entryTypes: ['longtask'] });
      } catch {
        console.warn('Performance monitoring not available');
      }
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [threshold]);

  // Default fallback if none provided
  const defaultFallback = (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-gray-600 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-400">Optimizing for your device...</p>
      </div>
    </div>
  );

  return useHighPerformance ? <>{children}</> : <>{fallback || defaultFallback}</>;
}

// Lightweight contact form fallback
export function ContactFormFallback() {
  return (
    <div className="min-h-screen bg-black text-white pt-24">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-6 text-white">CONTACT US</h1>
          <h2 className="text-xl font-medium mb-4 text-white">
            Skip the Middlemen – Talk Directly to the Developer!
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto">
            We believe in clear, fast, and honest communication. That&apos;s why when you reach out to us, you won&apos;t be passed through layers of sales person and managers.
          </p>
        </div>

        {/* Simple two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold mb-6">Get in touch</h3>
            
            {/* Simple contact cards */}
            <a 
              href="mailto:info.xpanix@gmail.com"
              className="block bg-gray-900 p-6 rounded-lg hover:bg-gray-800 transition-colors"
            >
              <h4 className="font-semibold mb-2">Email us</h4>
              <p className="text-gray-400">info.xpanix@gmail.com</p>
            </a>

            <a 
              href="https://wa.me/918930005190"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-gray-900 p-6 rounded-lg hover:bg-gray-800 transition-colors"
            >
              <h4 className="font-semibold mb-2">Call us</h4>
              <p className="text-gray-400">+91 8930005190</p>
            </a>

            <a 
              href="https://www.google.com/maps/search/?api=1&query=2+Eadgah+Road+Model+Town+Panipat+Haryana+India"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-gray-900 p-6 rounded-lg hover:bg-gray-800 transition-colors"
            >
              <h4 className="font-semibold mb-2">Our location</h4>
              <p className="text-gray-400">2, Eadgah Road Model Town Panipat Haryana</p>
            </a>
          </div>

          {/* Simple form */}
          <div className="bg-gray-900 p-8 rounded-lg">
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gray-600"
                required
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gray-600"
                required
              />
              <input
                type="tel"
                placeholder="Phone"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gray-600"
                required
              />
              <textarea
                placeholder="Message"
                rows={4}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gray-600"
                required
              />
              <button
                type="submit"
                className="w-full bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 rounded-lg transition-colors"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
} 