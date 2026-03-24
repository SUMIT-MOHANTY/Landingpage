/**
 * Network Resilience Utilities
 * Helps the site function even on poor connections
 */
const NetworkResilience = {
  // Check connection status
  isOnline: function() {
    return navigator.onLine;
  },

  // Monitor connection changes
  setupConnectionMonitoring: function() {
    window.addEventListener('online', () => {
      this.handleConnectionChange(true);
    });

    window.addEventListener('offline', () => {
      this.handleConnectionChange(false);
    });

    // Connection speed detection (if available)
    if ('connection' in navigator) {
      const connection = navigator.connection;

      if (connection) {
        connection.addEventListener('change', () => {
          this.handleConnectionTypeChange(connection);
        });

        // Initial check
        this.handleConnectionTypeChange(connection);
      }
    }
  },

  // Handle connection status changes
  handleConnectionChange: function(isOnline) {
    const statusElement = document.getElementById('connection-status');

    if (isOnline) {
      // We're online
      document.body.classList.remove('offline-mode');
      document.body.classList.add('online-mode');

      if (statusElement) {
        statusElement.textContent = 'Online';
        statusElement.className = 'status-online';
      }

      // Retry any pending operations
      this.retryPendingOperations();
    } else {
      // We're offline
      document.body.classList.remove('online-mode');
      document.body.classList.add('offline-mode');

      if (statusElement) {
        statusElement.textContent = 'Offline - Some features may be unavailable';
        statusElement.className = 'status-offline';
      }
    }
  },

  // Handle connection type/speed changes
  handleConnectionTypeChange: function(connection) {
    const connectionType = connection.effectiveType || connection.type;
    const isSlowConnection =
      connectionType === 'slow-2g' ||
      connectionType === '2g' ||
      connectionType === 'cellular';

    if (isSlowConnection) {
      document.body.classList.add('slow-connection');

      // Disable non-critical animations and effects
      document.querySelectorAll('.non-critical-animation').forEach(el => {
        el.classList.add('animation-disabled');
      });

      // Load lower quality images
      document.querySelectorAll('img[data-low-src]').forEach(img => {
        if (!img.dataset.originalSrc) {
          img.dataset.originalSrc = img.src;
        }
        img.src = img.dataset.lowSrc;
      });
    } else {
      document.body.classList.remove('slow-connection');

      // Re-enable animations
      document.querySelectorAll('.non-critical-animation').forEach(el => {
        el.classList.remove('animation-disabled');
      });

      // Restore original images
      document.querySelectorAll('img[data-original-src]').forEach(img => {
        img.src = img.dataset.originalSrc;
      });
    }
  },

  // Store operations to retry when back online
  pendingOperations: [],

  // Add operation to retry when online
  addPendingOperation: function(operation) {
    this.pendingOperations.push(operation);
  },

  // Retry all pending operations
  retryPendingOperations: function() {
    while (this.pendingOperations.length > 0) {
      const operation = this.pendingOperations.shift();
      try {
        operation();
      } catch (e) {
        console.error('Failed to execute pending operation:', e);
      }
    }
  },

  // Initialize network resilience features
  init: function() {
    this.setupConnectionMonitoring();
    this.handleConnectionChange(this.isOnline());
  }
};

// Execute on page load
document.addEventListener('DOMContentLoaded', function() {
  NetworkResilience.init();
});
