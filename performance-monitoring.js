// Performance Monitoring Script for Khaadi Website
// Measures Core Web Vitals and other performance metrics

// Measure Largest Contentful Paint (LCP)
let lcp;
const lcpObserver = new PerformanceObserver((entryList) => {
  const entries = entryList.getEntries();
  const lastEntry = entries[entries.length - 1];
  lcp = lastEntry.renderTime || lastEntry.loadTime;
});
lcpObserver.observe({entryTypes: ['largest-contentful-paint']});

// Measure First Input Delay (FID)
let fid;
const fidObserver = new PerformanceObserver((entryList) => {
  const entries = entryList.getEntries();
  const firstInput = entries[0];
  fid = firstInput.processingStart - firstInput.startTime;
});
fidObserver.observe({entryTypes: ['first-input']});

// Measure Cumulative Layout Shift (CLS)
let cls = 0;
const clsObserver = new PerformanceObserver((entryList) => {
  const entries = entryList.getEntries();
  for (const entry of entries) {
    if (!entry.hadRecentInput) {
      cls += entry.value;
    }
  }
});
clsObserver.observe({entryTypes: ['layout-shift']});

// Measure First Contentful Paint (FCP)
let fcp;
const fcpObserver = new PerformanceObserver((entryList) => {
  const entries = entryList.getEntries();
  fcp = entries[0].startTime;
  console.log(`First Contentful Paint: ${Math.round(fcp)} ms`);
});
fcpObserver.observe({entryTypes: ['paint']});

// Measure Time to Interactive (TTI)
let tti;
function measureTTI() {
  if (document.readyState === 'interactive' || document.readyState === 'complete') {
    tti = performance.now();
    console.log(`Time to Interactive: ${Math.round(tti)} ms`);
  } else {
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(() => {
        tti = performance.now();
        console.log(`Time to Interactive: ${Math.round(tti)} ms`);
      }, 0);
    });
  }
}
measureTTI();

// Report all metrics when page is fully loaded
window.addEventListener('load', () => {
  setTimeout(() => {
    console.log('--- Performance Metrics ---');
    if (lcp) console.log(`Largest Contentful Paint: ${Math.round(lcp)} ms`);
    if (fid) console.log(`First Input Delay: ${Math.round(fid)} ms`);
    console.log(`Cumulative Layout Shift: ${cls.toFixed(3)}`);
    if (tti) console.log(`Time to Interactive: ${Math.round(tti)} ms`);
    
    // Send metrics to analytics (would be implemented in production)
    // sendMetricsToAnalytics({ lcp, fid, cls, fcp, tti });
  }, 0);
});

// Function to send metrics to analytics (placeholder)
function sendMetricsToAnalytics(metrics) {
  // In a real implementation, this would send data to your analytics service
  console.log('Sending metrics to analytics:', metrics);
}

// Performance optimization utilities
const PerformanceUtils = {
  // Debounce function to optimize event handlers
  debounce: (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  // Throttle function for scroll and resize events
  throttle: (func, limit) => {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  },

  // Optimize images dynamically
  optimizeImages: () => {
    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => {
      if (!img.src && img.dataset.src) {
        img.src = img.dataset.src;
        img.onload = () => img.classList.add('loaded');
      }
    });
  },

  // Optimize resource loading
  optimizeResourceLoading: () => {
    // Preload critical resources
    const criticalResources = [
      { href: 'styles.min.css', as: 'style' },
      { href: 'script.min.js', as: 'script' }
    ];

    criticalResources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = resource.as;
      link.href = resource.href;
      document.head.appendChild(link);
    });
  }
};

// Initialize performance optimizations
document.addEventListener('DOMContentLoaded', () => {
  PerformanceUtils.optimizeResourceLoading();
  PerformanceUtils.optimizeImages();
});