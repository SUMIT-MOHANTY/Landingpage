/**
 * Cross-browser compatible helper functions
 */
import { detectBrowser, applyBrowserFixes } from './testing/browserDetection';
import { applyDeviceFixes, createVisibilityObserver } from './testing/deviceTesting';

// Initialize on load
export const initBrowserCompatibility = () => {
  const browser = applyBrowserFixes();
  const device = applyDeviceFixes();
  console.log('Browser:', browser);
  console.log('Device:', device);
  return { browser, device };
};

// Safely parse JSON with error handling
export const safeJsonParse = (jsonString, fallback = null) => {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    console.error('JSON Parse Error:', error);
    return fallback;
  }
};

// Safe local storage with fallback
export const storage = {
  get: (key, fallback = null) => {
    try {
      const value = localStorage.getItem(key);
      return value !== null ? safeJsonParse(value, value) : fallback;
    } catch (error) {
      console.error('LocalStorage get error:', error);
      return fallback;
    }
  },
  set: (key, value) => {
    try {
      const valueToStore = typeof value === 'string' ? value : JSON.stringify(value);
      localStorage.setItem(key, valueToStore);
      return true;
    } catch (error) {
      console.error('LocalStorage set error:', error);
      return false;
    }
  },
  remove: (key) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('LocalStorage remove error:', error);
      return false;
    }
  }
};

// Debounce function for performance optimization
export const debounce = (func, wait = 100) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Add intersection observer with polyfill support
export const createObserver = (callback, options = {}) => {
  return createVisibilityObserver(callback, options);
};

// Focus trap for accessibility
export const createFocusTrap = (containerElement) => {
  const focusableElements = containerElement.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );

  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  const handleTabKey = (e) => {
    if (e.key === 'Tab') {
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  };

  return {
    activate: () => {
      containerElement.addEventListener('keydown', handleTabKey);
      firstElement.focus();
    },
    deactivate: () => {
      containerElement.removeEventListener('keydown', handleTabKey);
    }
  };
};

// Cross-browser animation function with requestAnimationFrame
export const smoothScroll = (target, duration = 500) => {
  const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  let startTime = null;

  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    const ease = t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; // easeInOutQuad

    window.scrollTo(0, startPosition + distance * ease(progress));

    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    }
  }

  requestAnimationFrame(animation);
};

export default {
  initBrowserCompatibility,
  safeJsonParse,
  storage,
  debounce,
  createObserver,
  createFocusTrap,
  smoothScroll
};
