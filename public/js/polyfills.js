/**
 * Browser compatibility polyfills and feature detection
 */

// Feature detection helper
const supports = {
  // Check if the browser supports IntersectionObserver
  intersectionObserver: 'IntersectionObserver' in window,

  // Check if the browser supports the fetch API
  fetch: 'fetch' in window,

  // Check if the browser supports CSS Grid
  grid: window.CSS && CSS.supports && CSS.supports('display', 'grid'),

  // Check if the browser supports CSS custom properties
  customProperties: window.CSS && CSS.supports && CSS.supports('--custom-prop', 'value'),

  // Check if the browser supports WebP images
  webp: false,

  // Check if the browser supports the passive event listener option
  passiveEvents: false
};

// Test for WebP support
(function() {
  const webP = new Image();
  webP.onload = webP.onerror = function() {
    supports.webp = webP.height === 2;
  };
  webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
})();

// Test for passive event listeners
(function() {
  try {
    const options = Object.defineProperty({}, 'passive', {
      get: function() {
        supports.passiveEvents = true;
        return true;
      }
    });
    window.addEventListener('test', null, options);
  } catch(err) {}
})();

// Load polyfills conditionally
function loadPolyfills() {
  const polyfills = [];

  // IntersectionObserver polyfill
  if (!supports.intersectionObserver) {
    polyfills.push(loadScript('https://cdn.jsdelivr.net/npm/intersection-observer@0.12.0/intersection-observer.js'));
  }

  // Fetch API polyfill
  if (!supports.fetch) {
    polyfills.push(loadScript('https://cdn.jsdelivr.net/npm/whatwg-fetch@3.6.2/dist/fetch.umd.js'));
  }

  // Custom Elements polyfill (for older browsers)
  if (!('customElements' in window)) {
    polyfills.push(loadScript('https://cdn.jsdelivr.net/npm/@webcomponents/custom-elements@1.5.0/custom-elements.min.js'));
  }

  return Promise.all(polyfills).then(() => {
    console.log('All polyfills loaded successfully');
  }).catch(error => {
    console.error('Error loading polyfills:', error);
  });
}

// Helper to load scripts dynamically
function loadScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

// Add class to HTML element based on feature detection
function applyFeatureClasses() {
  const html = document.documentElement;

  Object.entries(supports).forEach(([feature, supported]) => {
    html.classList.add(supported ? `has-${feature}` : `no-${feature}`);
  });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  applyFeatureClasses();
  loadPolyfills();
});

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { supports };
}
