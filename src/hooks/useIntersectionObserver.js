import { useState, useEffect } from 'react';

/**
 * Custom hook that tracks when an element enters the viewport
 * @param {Object} options - IntersectionObserver options
 * @returns {[ref, isVisible]} - Element ref and visibility state
 */
export const useIntersectionObserver = (options = {}) => {
  const [ref, setRef] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (ref) {
      const observer = new IntersectionObserver(([entry]) => {
        setIsVisible(entry.isIntersecting);
      }, {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
        ...options
      });

      observer.observe(ref);

      return () => {
        if (ref) {
          observer.unobserve(ref);
        }
      };
    }
  }, [ref, options]);

  return [setRef, isVisible];
};
