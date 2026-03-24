/**
 * Utility functions for accessibility and responsive design
 */

/**
 * Creates a focus trap within a specified element
 * @param {HTMLElement} element - The element to trap focus within
 * @returns {Object} - Methods to activate and deactivate the focus trap
 */
export const createFocusTrap = (element) => {
  if (!element) return null;

  const focusableElements = element.querySelectorAll(
    'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
  );

  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  const handleKeyDown = (event) => {
    if (event.key === 'Tab') {
      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }
  };

  return {
    activate: () => {
      element.addEventListener('keydown', handleKeyDown);
      firstElement?.focus();
    },
    deactivate: () => {
      element.removeEventListener('keydown', handleKeyDown);
    }
  };
};

/**
 * Detects if device is a mobile device
 * @returns {boolean} - True if current device is mobile
 */
export const isMobileDevice = () => {
  return window.innerWidth < 768;
};

/**
 * Detects if an element is currently in the viewport
 * @param {HTMLElement} element - The element to check
 * @returns {boolean} - True if element is in viewport
 */
export const isInViewport = (element) => {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

/**
 * Handles Enter and Space keypresses for custom interactive elements
 * @param {Function} callback - Function to execute when key is pressed
 * @returns {Function} - Event handler function
 */
export const handleKeyboardActivation = (callback) => {
  return (event) => {
    if (event.key === 'Enter' || event.key === ' ' || event.key === 'Spacebar') {
      event.preventDefault();
      callback(event);
    }
  };
};

/**
 * Sets focus to the first focusable element within a container
 * @param {HTMLElement} container - Container to search within
 */
export const setInitialFocus = (container) => {
  const focusableElements = container.querySelectorAll(
    'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex="0"]'
  );

  if (focusableElements.length) {
    focusableElements[0].focus();
  }
};

/**
 * Checks if reduced motion is preferred
 * @returns {boolean} - True if reduced motion is preferred
 */
export const prefersReducedMotion = () => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Announces a message to screen readers using ARIA live regions
 * @param {string} message - Message to announce
 * @param {string} priority - 'polite' or 'assertive'
 */
export const announceForScreenReader = (message, priority = 'polite') => {
  const announcement = document.createElement('div');
  announcement.setAttribute('aria-live', priority);
  announcement.setAttribute('aria-atomic', 'true');
  announcement.classList.add('sr-only');
  document.body.appendChild(announcement);

  // Use setTimeout to ensure the element is in the DOM before changing its content
  setTimeout(() => {
    announcement.textContent = message;

    // Remove after announcement is made
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }, 100);
};
