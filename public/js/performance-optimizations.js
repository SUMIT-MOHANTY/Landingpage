/**
 * Performance Optimization Utilities
 * Improves page loading and rendering performance
 */
const PerformanceOptimizer = {
  // Lazy load images
  setupLazyLoading: function() {
    if ('IntersectionObserver' in window) {
      const imgObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            if (img.dataset.srcset) {
              img.srcset = img.dataset.srcset;
            }
            img.classList.add('loaded');
            observer.unobserve(img);
          }
        });
      });

      document.querySelectorAll('img[data-src]').forEach(img => {
        imgObserver.observe(img);
      });
    } else {
      // Fallback for browsers without IntersectionObserver
      document.querySelectorAll('img[data-src]').forEach(img => {
        img.src = img.dataset.src;
        if (img.dataset.srcset) {
          img.srcset = img.dataset.srcset;
        }
      });
    }
  },

  // Defer non-critical resources
  deferNonCriticalResources: function() {
    // Find all non-critical scripts (those with data-defer attribute)
    document.querySelectorAll('script[data-defer]').forEach(script => {
      const newScript = document.createElement('script');
      if (script.src) {
        newScript.src = script.src;
      } else {
        newScript.textContent = script.textContent;
      }
      script.getAttributeNames().forEach(attr => {
        if (attr !== 'data-defer') {
          newScript.setAttribute(attr, script.getAttribute(attr));
        }
      });

      // Remove the original script
      script.parentNode.removeChild(script);

      // Add the script after page load
      window.addEventListener('load', () => {
        document.body.appendChild(newScript);
      });
    });
  },

  // Initialize performance optimizations
  init: function() {
    // Execute on DOMContentLoaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        this.setupLazyLoading();
        this.deferNonCriticalResources();
      });
    } else {
      // DOM already loaded
      this.setupLazyLoading();
      this.deferNonCriticalResources();
    }
  }
};

// Initialize
PerformanceOptimizer.init();
