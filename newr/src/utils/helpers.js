/**
 * Collection of cross-browser compatible utility functions
 * for React applications with browser compatibility fixes
 */

/**
 * Safely gets a nested property from an object without throwing errors
 * @param {Object} obj - The object to access
 * @param {string} path - Dot notation path to the property
 * @param {*} defaultValue - Default value if property doesn't exist
 * @returns {*} The value or defaultValue
 */
export const getNestedValue = (obj, path, defaultValue = null) => {
  if (!obj || !path) return defaultValue;

  try {
    const keys = path.split('.');
    let result = obj;

    for (const key of keys) {
      if (result === undefined || result === null) return defaultValue;
      result = result[key];
    }

    return result !== undefined ? result : defaultValue;
  } catch (err) {
    console.error('Error accessing nested value:', err);
    return defaultValue;
  }
};

/**
 * Formats a date string in a cross-browser compatible way
 * @param {string|Date} date - Date to format
 * @param {string} format - Format string: 'short', 'medium', 'long'
 * @param {string} locale - Locale string (default: en-US)
 * @returns {string} Formatted date
 */
export const formatDate = (date, format = 'medium', locale = 'en-US') => {
  try {
    const dateObj = date instanceof Date ? date : new Date(date);

    // Check for invalid date
    if (isNaN(dateObj.getTime())) {
      throw new Error('Invalid date');
    }

    // Options for different formats
    const options = {
      short: { month: 'numeric', day: 'numeric', year: '2-digit' },
      medium: { month: 'short', day: 'numeric', year: 'numeric' },
      long: { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }
    };

    // Fallback for browsers that don't support Intl
    if (typeof Intl === 'undefined' || !Intl.DateTimeFormat) {
      // Simple fallback formatting
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const month = months[dateObj.getMonth()];
      const day = dateObj.getDate();
      const year = dateObj.getFullYear();
      return `${month} ${day}, ${year}`;
    }

    return new Intl.DateTimeFormat(locale, options[format] || options.medium).format(dateObj);
  } catch (err) {
    console.error('Date formatting error:', err);
    return '';
  }
};

/**
 * Detects browser features with proper fallbacks
 * @param {string} feature - Feature to detect
 * @returns {boolean} True if feature is supported
 */
export const supportsFeature = (feature) => {
  try {
    switch (feature) {
      case 'webp':
        // Check for WebP support
        const canvas = document.createElement('canvas');
        if (canvas && canvas.getContext && canvas.getContext('2d')) {
          return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
        }
        return false;

      case 'intersectionObserver':
        return 'IntersectionObserver' in window;

      case 'localStorage':
        try {
          localStorage.setItem('test', 'test');
          localStorage.removeItem('test');
          return true;
        } catch (e) {
          return false;
        }

      case 'touch':
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0;

      default:
        return false;
    }
  } catch (err) {
    console.error('Feature detection error:', err);
    return false;
  }
};

/**
 * Debounces a function to improve performance
 * @param {Function} fn - Function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} Debounced function
 */
export const debounce = (fn, delay = 300) => {
  let timer = null;

  return function(...args) {
    const context = this;

    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      fn.apply(context, args);
      timer = null;
    }, delay);
  };
};

/**
 * Safely executes a fetch request with timeout and error handling
 * @param {string} url - URL to fetch
 * @param {Object} options - Fetch options
 * @param {number} timeout - Timeout in milliseconds
 * @returns {Promise} Fetch response
 */
export const safeFetch = async (url, options = {}, timeout = 8000) => {
  // Create abort controller for timeout
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }

    return response;
  } catch (err) {
    clearTimeout(timeoutId);

    if (err.name === 'AbortError') {
      throw new Error(`Request timeout after ${timeout}ms`);
    }

    throw err;
  }
};

/**
 * Generates a unique ID (for keys, etc.)
 * @returns {string} Unique ID
 */
export const generateId = () => {
  return Math.random().toString(36).substring(2, 9) +
         Date.now().toString(36);
};

/**
 * Tests if reduced motion is preferred by the user
 * @returns {boolean} True if reduced motion is preferred
 */
export const prefersReducedMotion = () => {
  return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
};
