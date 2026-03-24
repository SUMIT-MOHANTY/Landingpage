/**
 * Utility helper functions for the Generative AI landing page
 */

/**
 * Debounce function to limit the rate at which a function can fire
 * Useful for resize handlers, scroll events, etc.
 *
 * @param {Function} func - The function to debounce
 * @param {number} wait - The debounce wait time in milliseconds
 * @param {boolean} immediate - Whether to trigger the function immediately
 * @returns {Function} - The debounced function
 */
export const debounce = (func, wait = 300, immediate = false) => {
  let timeout;

  return function executedFunction(...args) {
    const context = this;

    const later = () => {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    const callNow = immediate && !timeout;

    clearTimeout(timeout);

    timeout = setTimeout(later, wait);

    if (callNow) func.apply(context, args);
  };
};

/**
 * Format a number with commas as thousands separators
 *
 * @param {number} num - The number to format
 * @returns {string} - Formatted number string
 */
export const formatNumber = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

/**
 * Validate email address format
 *
 * @param {string} email - The email address to validate
 * @returns {boolean} - Whether the email is valid
 */
export const isValidEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

/**
 * Get the current viewport dimensions
 *
 * @returns {Object} - Object containing width and height of viewport
 */
export const getViewportDimensions = () => {
  return {
    width: window.innerWidth || document.documentElement.clientWidth,
    height: window.innerHeight || document.documentElement.clientHeight
  };
};

/**
 * Generate a unique ID (for keying elements, etc.)
 *
 * @param {string} prefix - Optional prefix for the ID
 * @returns {string} - Unique ID
 */
export const generateId = (prefix = 'id') => {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Check if an element is in viewport
 *
 * @param {HTMLElement} element - The DOM element to check
 * @param {number} offset - Optional offset value
 * @returns {boolean} - Whether the element is in viewport
 */
export const isElementInViewport = (element, offset = 0) => {
  if (!element) return false;

  const rect = element.getBoundingClientRect();

  return (
    rect.top >= 0 - offset &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + offset &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

/**
 * Smooth scroll to an element
 *
 * @param {string} elementId - ID of the element to scroll to
 * @param {number} offset - Optional offset from the top
 */
export const scrollToElement = (elementId, offset = 0) => {
  const element = document.getElementById(elementId);

  if (element) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};
