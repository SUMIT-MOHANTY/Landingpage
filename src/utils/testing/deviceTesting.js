/**
 * Device testing utilities
 * Helps with responsive design testing and device-specific fixes
 */

// Screen size breakpoints
export const breakpoints = {
  xs: 320,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1400
};

// Get current screen size category
export const getScreenSizeCategory = () => {
  const width = window.innerWidth;

  if (width < breakpoints.sm) return 'xs';
  if (width < breakpoints.md) return 'sm';
  if (width < breakpoints.lg) return 'md';
  if (width < breakpoints.xl) return 'lg';
  if (width < breakpoints.xxl) return 'xl';
  return 'xxl';
};

// Check if element is visible in viewport using Intersection Observer API
export const createVisibilityObserver = (callback, options = {}) => {
  // Fallback for browsers that don't support Intersection Observer
  if (!('IntersectionObserver' in window)) {
    return {
      observe: (element) => {
        const checkVisibility = () => {
          const rect = element.getBoundingClientRect();
          const isVisible = (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= window.innerHeight &&
            rect.right <= window.innerWidth
          );
          callback({ isIntersecting: isVisible }, [{ isIntersecting: isVisible, target: element }]);
        };

        window.addEventListener('scroll', checkVisibility);
        window.addEventListener('resize', checkVisibility);
        checkVisibility();

        return {
          unobserve: () => {
            window.removeEventListener('scroll', checkVisibility);
            window.removeEventListener('resize', checkVisibility);
          }
        };
      },
      unobserve: () => {}
    };
  }

  // Use native Intersection Observer when available
  return new IntersectionObserver(callback, {
    rootMargin: '0px',
    threshold: 0.1,
    ...options
  });
};

// Apply device-specific fixes
export const applyDeviceFixes = () => {
  const screenCategory = getScreenSizeCategory();
  document.documentElement.dataset.screenSize = screenCategory;

  // iOS-specific fixes
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  if (isIOS) {
    document.documentElement.classList.add('ios-device');

    // Fix for 100vh issue on iOS
    document.documentElement.style.setProperty(
      '--real-vh',
      `${window.innerHeight * 0.01}px`
    );

    window.addEventListener('resize', () => {
      document.documentElement.style.setProperty(
        '--real-vh',
        `${window.innerHeight * 0.01}px`
      );
    });
  }

  return {
    screenCategory,
    width: window.innerWidth,
    height: window.innerHeight,
    devicePixelRatio: window.devicePixelRatio || 1
  };
};

export default {
  breakpoints,
  getScreenSizeCategory,
  createVisibilityObserver,
  applyDeviceFixes
};
