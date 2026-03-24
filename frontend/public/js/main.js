/**
 * Performance-optimized JavaScript for the landing page
 * - Uses modern JavaScript patterns
 * - Implements lazy loading
 * - Utilizes requestAnimationFrame for smooth animations
 * - Defers non-critical operations
 */

// Wait until DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Performance optimized initialization
  const init = () => {
    initLazyLoading();
    initSmoothScroll();
    setupEventListeners();

    // Defer non-critical operations
    setTimeout(() => {
      loadAnalytics();
    }, 3000);
  };

  // Lazy loading implementation for images
  const initLazyLoading = () => {
    if ('IntersectionObserver' in window) {
      const lazyImages = document.querySelectorAll('img.lazy');

      const imageObserver = new IntersectionObserver((entries) => {
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

      lazyImages.forEach(img => {
        imageObserver.observe(img);
      });
    } else {
      // Fallback for browsers that don't support Intersection Observer
      const lazyLoad = () => {
        const lazyImages = document.querySelectorAll('img.lazy');
        lazyImages.forEach(img => {
          if (img.getBoundingClientRect().top <= window.innerHeight &&
              img.getBoundingClientRect().bottom >= 0 &&
              getComputedStyle(img).display !== 'none') {
            img.src = img.dataset.src;
            if (img.dataset.srcset) {
              img.srcset = img.dataset.srcset;
            }
            img.classList.remove('lazy');
          }
        });
      };

      // Throttled scroll event
      let lazyLoadThrottleTimeout;
      window.addEventListener('scroll', () => {
        if (lazyLoadThrottleTimeout) {
          clearTimeout(lazyLoadThrottleTimeout);
        }
        lazyLoadThrottleTimeout = setTimeout(lazyLoad, 200);
      });
    }
  };

  // Smooth scroll implementation with performance optimization
  const initSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          // Using native smooth scroll when supported
          if ('scrollBehavior' in document.documentElement.style) {
            window.scrollTo({
              top: targetElement.offsetTop,
              behavior: 'smooth'
            });
          } else {
            // Fallback for browsers without native smooth scrolling
            window.scrollTo(0, targetElement.offsetTop);
          }
        }
      });
    });
  };

  // Event listener setup with event delegation for better performance
  const setupEventListeners = () => {
    const body = document.body;

    body.addEventListener('click', (e) => {
      // Handle button clicks
      if (e.target.classList.contains('btn') || e.target.closest('.btn')) {
        const button = e.target.classList.contains('btn') ? e.target : e.target.closest('.btn');

        // Visual feedback with requestAnimationFrame for better performance
        requestAnimationFrame(() => {
          button.classList.add('btn-clicked');
          setTimeout(() => {
            requestAnimationFrame(() => {
              button.classList.remove('btn-clicked');
            });
          }, 200);
        });
      }
    });

    // Performance optimized scroll listener with throttling
    let lastScrollTop = 0;
    let ticking = false;

    window.addEventListener('scroll', () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll(scrollTop, lastScrollTop);
          lastScrollTop = scrollTop;
          ticking = false;
        });
        ticking = true;
      }
    });
  };

  // Handle scroll events
  const handleScroll = (scrollTop, lastScrollTop) => {
    const header = document.querySelector('header');
    if (!header) return;

    if (scrollTop > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Direction detection for smart UI
    if (scrollTop > lastScrollTop) {
      // Scrolling down
      header.classList.add('hidden');
    } else {
      // Scrolling up
      header.classList.remove('hidden');
    }
  };

  // Defer analytics loading
  const loadAnalytics = () => {
    console.log('Analytics loading deferred for better initial page load');
    // Would implement actual analytics here in production
  };

  // Initialize the application
  init();
});
