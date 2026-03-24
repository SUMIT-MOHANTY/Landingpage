// Main JavaScript file - will be minified and bundled

// Implement lazy loading for images
document.addEventListener('DOMContentLoaded', () => {
  // Lazy load images
  const lazyImages = document.querySelectorAll('img.lazy');

  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          if (img.dataset.srcset) {
            img.srcset = img.dataset.srcset;
          }
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
  } else {
    // Fallback for browsers that don't support IntersectionObserver
    let lazyLoadThrottleTimeout;

    function lazyLoad() {
      if (lazyLoadThrottleTimeout) {
        clearTimeout(lazyLoadThrottleTimeout);
      }

      lazyLoadThrottleTimeout = setTimeout(() => {
        const scrollTop = window.scrollY;
        lazyImages.forEach(img => {
          if (img.offsetTop < window.innerHeight + scrollTop) {
            img.src = img.dataset.src;
            if (img.dataset.srcset) {
              img.srcset = img.dataset.srcset;
            }
            img.classList.remove('lazy');
          }
        });

        if (lazyImages.length === 0) {
          document.removeEventListener('scroll', lazyLoad);
          window.removeEventListener('resize', lazyLoad);
          window.removeEventListener('orientationchange', lazyLoad);
        }
      }, 20);
    }

    document.addEventListener('scroll', lazyLoad);
    window.addEventListener('resize', lazyLoad);
    window.addEventListener('orientationchange', lazyLoad);
  }

  // Defer non-critical JavaScript
  setTimeout(() => {
    // Load analytics or other non-essential scripts here
    console.log('Non-critical scripts loaded');
  }, 1000);
});

// Optimize event listeners with debouncing
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Apply debouncing to resize handlers
const handleResize = debounce(() => {
  // Handle resize event
  console.log('Window resized');
}, 250);

window.addEventListener('resize', handleResize);
