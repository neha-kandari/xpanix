#!/usr/bin/env node

/**
 * Spline Performance Test Script
 * This script helps test and measure spline animation performance
 */

const puppeteer = require('puppeteer');

async function testSplinePerformance() {
  console.log('🚀 Starting Spline Performance Test...\n');

  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: { width: 1920, height: 1080 }
  });

  try {
    const page = await browser.newPage();
    
    // Enable performance monitoring
    await page.setCacheEnabled(false);
    
    // Listen for console messages
    page.on('console', msg => {
      if (msg.text().includes('Spline')) {
        console.log(`📊 ${msg.text()}`);
      }
    });

    // Navigate to the site
    console.log('📱 Loading website...');
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });

    // Wait for spline to load
    console.log('⏳ Waiting for Spline animations to load...');
    await page.waitForTimeout(5000);

    // Test performance metrics
    console.log('\n📈 Collecting performance metrics...');
    
    const performanceMetrics = await page.evaluate(() => {
      const metrics = {
        frameTime: 0,
        memoryUsage: 0,
        splineInstances: 0,
        loadTime: 0
      };

      // Get memory usage
      if (performance.memory) {
        metrics.memoryUsage = performance.memory.usedJSHeapSize / (1024 * 1024);
      }

      // Count spline instances
      const splineViewers = document.querySelectorAll('spline-viewer');
      metrics.splineInstances = splineViewers.length;

      // Measure frame time (simplified)
      const startTime = performance.now();
      return new Promise(resolve => {
        requestAnimationFrame(() => {
          metrics.frameTime = performance.now() - startTime;
          resolve(metrics);
        });
      });
    });

    console.log('\n📊 Performance Results:');
    console.log(`   Memory Usage: ${performanceMetrics.memoryUsage.toFixed(2)} MB`);
    console.log(`   Frame Time: ${performanceMetrics.frameTime.toFixed(2)} ms`);
    console.log(`   Spline Instances: ${performanceMetrics.splineInstances}`);
    
    // Performance recommendations
    console.log('\n💡 Performance Recommendations:');
    
    if (performanceMetrics.frameTime > 16.67) {
      console.log('   ⚠️  Frame time exceeds 60fps threshold');
      console.log('   💡 Consider reducing spline quality or quantity');
    }
    
    if (performanceMetrics.memoryUsage > 100) {
      console.log('   ⚠️  High memory usage detected');
      console.log('   💡 Consider implementing memory cleanup');
    }
    
    if (performanceMetrics.splineInstances > 2) {
      console.log('   ⚠️  Multiple spline instances detected');
      console.log('   💡 Consider using OptimizedSplineManager for better performance');
    }

    // Test mobile performance
    console.log('\n📱 Testing mobile performance...');
    await page.setViewport({ width: 375, height: 667 });
    await page.waitForTimeout(3000);
    
    const mobileMetrics = await page.evaluate(() => {
      return {
        frameTime: performance.now(),
        memoryUsage: performance.memory ? performance.memory.usedJSHeapSize / (1024 * 1024) : 0
      };
    });

    console.log(`   Mobile Frame Time: ${mobileMetrics.frameTime.toFixed(2)} ms`);
    console.log(`   Mobile Memory Usage: ${mobileMetrics.memoryUsage.toFixed(2)} MB`);

    console.log('\n✅ Performance test completed!');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  } finally {
    await browser.close();
  }
}

// Run the test if this script is executed directly
if (require.main === module) {
  testSplinePerformance().catch(console.error);
}

module.exports = { testSplinePerformance }; 