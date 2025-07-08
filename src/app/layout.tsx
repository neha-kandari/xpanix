import Header from "../components/Header";
import Footer from "../components/Footer";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <link rel="preconnect" href="https://unpkg.com" />
        <link rel="dns-prefetch" href="https://unpkg.com" />
        <link rel="preconnect" href="https://prod.spline.design" />
        <link rel="dns-prefetch" href="https://prod.spline.design" />
        {/* Performance and conditional loading script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Initialize performance optimizer immediately
              (function() {
                let longTaskCount = 0;
                const isLowEnd = navigator.hardwareConcurrency < 4 || (navigator.deviceMemory && navigator.deviceMemory < 4);
                const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
                
                // Monitor long tasks and auto-optimize (but allow hero Spline)
                if ('PerformanceObserver' in window) {
                  try {
                    const observer = new PerformanceObserver((list) => {
                      list.getEntries().forEach((entry) => {
                        if (entry.duration > 50) {
                          longTaskCount++;
                          if (longTaskCount > 5) { // Increased threshold to avoid premature optimization
                            // Emergency optimization: disable heavy features but allow hero Spline
                            const style = document.createElement('style');
                                                         style.textContent = \`
                               *, *::before, *::after { 
                                 animation: none !important; 
                                 transition: none !important; 
                                 transform: none !important; 
                               }
                               /* Allow hero Spline to work */
                               spline-viewer, spline-viewer * {
                                 animation: initial !important;
                                 transition: initial !important;
                                 transform: initial !important;
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
                             \`;
                            document.head.appendChild(style);
                            observer.disconnect();
                          }
                        }
                      });
                    });
                    observer.observe({ entryTypes: ['longtask'] });
                  } catch(e) {}
                }
                
                // Preload Spline for all devices except extremely low-end
                if (!isLowEnd || window.innerWidth > 768) {
                  // Immediate preload for better first-load experience
                  const link = document.createElement('link');
                  link.rel = 'modulepreload';
                  link.href = 'https://unpkg.com/@splinetool/viewer@1.10.24/build/spline-viewer.js';
                  link.crossOrigin = 'anonymous';
                  document.head.appendChild(link);
                  
                  // Also preload scene files
                  const sceneLink1 = document.createElement('link');
                  sceneLink1.rel = 'prefetch';
                  sceneLink1.href = 'https://prod.spline.design/7qZIUdCCEbZokdYA/scene.splinecode';
                  sceneLink1.crossOrigin = 'anonymous';
                  document.head.appendChild(sceneLink1);
                  
                  // Preload the script immediately for homepage visits
                  if (window.location.pathname === '/' || window.location.pathname === '') {
                    setTimeout(() => {
                      const script = document.createElement('script');
                      script.type = 'module';
                      script.src = 'https://unpkg.com/@splinetool/viewer@1.10.24/build/spline-viewer.js';
                      script.async = true;
                      script.defer = true;
                      document.head.appendChild(script);
                    }, 500);
                  }
                }
                
                // Optimize images immediately when DOM is ready
                function optimizeImages() {
                  document.querySelectorAll('img').forEach(img => {
                    if (!img.hasAttribute('loading')) img.setAttribute('loading', 'lazy');
                    if (!img.hasAttribute('decoding')) img.setAttribute('decoding', 'async');
                  });
                }
                
                if (document.readyState === 'loading') {
                  document.addEventListener('DOMContentLoaded', optimizeImages);
                } else {
                  optimizeImages();
                }
                
                // Initialize critical performance optimizations
                window.__performanceOptimized = true;
                
                // Mark very low-end devices for targeted optimizations
                if (isMobile && isLowEnd && navigator.connection && 
                    (navigator.connection.effectiveType === '2g' || navigator.connection.effectiveType === 'slow-2g')) {
                  document.body.setAttribute('data-low-end', 'true');
                }
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased bg-black">
        <Header />
        {children}
        <Footer />
        {/* Initialize performance optimizer after page load */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.addEventListener('load', function() {
                // Additional performance optimizations after page load
                if ('requestIdleCallback' in window) {
                  requestIdleCallback(function() {
                    // Defer non-critical operations
                    import('/src/libs/performanceOptimizer.js').then(module => {
                      module.initPerformanceOptimizer();
                    }).catch(() => {});
                  }, { timeout: 1000 });
                }
              });
            `,
          }}
        />
      </body>
    </html>
  );
}

export const metadata = {
  title: 'Xpanix',
  description: 'Expand your business with us',
};
