/**
 * Security Enhancement Utilities
 * Adds client-side security improvements
 */
const SecurityEnhancements = {
  // Add security headers via meta tags (as backup to server headers)
  addSecurityMetaTags: function() {
    // Content Security Policy as fallback (server headers are preferred)
    if (!document.querySelector('meta[http-equiv="Content-Security-Policy"]')) {
      const cspMeta = document.createElement('meta');
      cspMeta.httpEquiv = 'Content-Security-Policy';
      cspMeta.content = "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data: https:; font-src 'self'; connect-src 'self';";
      document.head.appendChild(cspMeta);
    }

    // X-XSS-Protection as fallback
    if (!document.querySelector('meta[http-equiv="X-XSS-Protection"]')) {
      const xssMeta = document.createElement('meta');
      xssMeta.httpEquiv = 'X-XSS-Protection';
      xssMeta.content = '1; mode=block';
      document.head.appendChild(xssMeta);
    }

    // Referrer policy
    if (!document.querySelector('meta[name="referrer"]')) {
      const referrerMeta = document.createElement('meta');
      referrerMeta.name = 'referrer';
      referrerMeta.content = 'strict-origin-when-cross-origin';
      document.head.appendChild(referrerMeta);
    }
  },

  // Sanitize user input (for forms)
  sanitizeInput: function(input) {
    // Basic XSS prevention
    return String(input)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  },

  // Validate forms before submission
  setupFormValidation: function() {
    document.querySelectorAll('form').forEach(form => {
      form.addEventListener('submit', (e) => {
        let isValid = true;

        // Validate required fields
        form.querySelectorAll('[required]').forEach(field => {
          if (!field.value.trim()) {
            isValid = false;
            field.classList.add('error');

            // Add error message if it doesn't exist
            const errorId = `${field.id}-error`;
            if (!document.getElementById(errorId)) {
              const errorMsg = document.createElement('div');
              errorMsg.id = errorId;
              errorMsg.className = 'error-message';
              errorMsg.textContent = 'This field is required';
              errorMsg.setAttribute('aria-live', 'polite');
              field.parentNode.insertBefore(errorMsg, field.nextSibling);
            }
          }
        });

        // Validate email fields
        form.querySelectorAll('input[type="email"]').forEach(field => {
          if (field.value && !this.isValidEmail(field.value)) {
            isValid = false;
            field.classList.add('error');

            // Add error message if it doesn't exist
            const errorId = `${field.id}-error`;
            if (!document.getElementById(errorId)) {
              const errorMsg = document.createElement('div');
              errorMsg.id = errorId;
              errorMsg.className = 'error-message';
              errorMsg.textContent = 'Please enter a valid email address';
              errorMsg.setAttribute('aria-live', 'polite');
              field.parentNode.insertBefore(errorMsg, field.nextSibling);
            }
          }
        });

        if (!isValid) {
          e.preventDefault();
        }
      });
    });
  },

  // Email validation
  isValidEmail: function(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  },

  // Initialize security enhancements
  init: function() {
    this.addSecurityMetaTags();
    this.setupFormValidation();
  }
};

// Execute on page load
document.addEventListener('DOMContentLoaded', function() {
  SecurityEnhancements.init();
});
