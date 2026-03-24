/**
 * Browser Compatibility Utility
 * Detects browser capabilities and provides fallbacks for older browsers
 */
const BrowserCompatibility = {
  // Detect browser features
  supportsFlexbox: function() {
    const test = document.createElement('div');
    return test.style.flex !== undefined;
  },

  supportsGridLayout: function() {
    const test = document.createElement('div');
    return test.style.grid !== undefined;
  },

  // Apply fallbacks for older browsers
  applyFallbacks: function() {
    if (!this.supportsFlexbox()) {
      document.body.classList.add('no-flexbox');
      console.warn('Flexbox not supported, applying fallbacks');
    }

    if (!this.supportsGridLayout()) {
      document.body.classList.add('no-grid');
      console.warn('Grid layout not supported, applying fallbacks');
    }

    // Check if IntersectionObserver is available (for lazy loading)
    if (!('IntersectionObserver' in window)) {
      document.body.classList.add('no-intersection-observer');
      // Load all images immediately as fallback
      document.querySelectorAll('[data-src]').forEach(img => {
        img.src = img.dataset.src;
      });
    }
  }
};

// Execute on page load
document.addEventListener('DOMContentLoaded', function() {
  BrowserCompatibility.applyFallbacks();
});
