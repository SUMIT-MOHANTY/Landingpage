/**
 * Device detection utility
 * Identifies device type, screen size, and capabilities
 */

export const DEVICE_TYPES = {
  MOBILE: 'mobile',
  TABLET: 'tablet',
  DESKTOP: 'desktop',
  TV: 'tv',
  UNKNOWN: 'unknown'
};

/**
 * Detect current device type
 * @returns {Object} Device information
 */
export const detectDevice = () => {
  const userAgent = navigator.userAgent;
  let deviceType = DEVICE_TYPES.UNKNOWN;
  let deviceVendor = 'Unknown';
  let isTouchDevice = false;
  let screenInfo = {};
  let performance = {};

  // Touch detection
  isTouchDevice = ('ontouchstart' in window) ||
                  (navigator.maxTouchPoints > 0) ||
                  (navigator.msMaxTouchPoints > 0);

  // Screen information
  screenInfo = {
    width: window.innerWidth,
    height: window.innerHeight,
    screenWidth: window.screen.width,
    screenHeight: window.screen.height,
    orientation: window.innerHeight > window.innerWidth ? 'portrait' : 'landscape',
    pixelRatio: window.devicePixelRatio || 1,
    colorDepth: window.screen.colorDepth
  };

  // Performance metrics
  performance = {
    memory: window.performance?.memory ? {
      jsHeapSizeLimit: Math.round(window.performance.memory.jsHeapSizeLimit / (1024 * 1024)),
      totalJSHeapSize: Math.round(window.performance.memory.totalJSHeapSize / (1024 * 1024)),
      usedJSHeapSize: Math.round(window.performance.memory.usedJSHeapSize / (1024 * 1024))
    } : null,
    navigation: window.performance?.navigation ? {
      redirectCount: window.performance.navigation.redirectCount,
      type: window.performance.navigation.type
    } : null,
    // Connection information if available
    connection: navigator.connection ? {
      effectiveType: navigator.connection.effectiveType,
      downlink: navigator.connection.downlink,
      rtt: navigator.connection.rtt,
      saveData: navigator.connection.saveData
    } : null
  };

  // Device type detection based on user agent and screen size
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(userAgent)) {
    deviceType = DEVICE_TYPES.TABLET;
  } else if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(userAgent)) {
    deviceType = DEVICE_TYPES.MOBILE;
  } else if (/(smart[-\s]?tv|hbbtv|appletv|googletv|hdmi|netcast|viera|nettv|roku|\bdtv\b|sonydtv|inettvbrowser|\btv\b)/i.test(userAgent)) {
    deviceType = DEVICE_TYPES.TV;
  } else {
    deviceType = DEVICE_TYPES.DESKTOP;
  }

  // Detect device vendor
  if (/iP(hone|od|ad)/i.test(userAgent)) {
    deviceVendor = 'Apple';
  } else if (/Android/i.test(userAgent)) {
    deviceVendor = 'Android';
  } else if (/Windows Phone/i.test(userAgent)) {
    deviceVendor = 'Microsoft';
  } else if (/Macintosh|MacIntel|MacPPC|Mac68K/i.test(userAgent)) {
    deviceVendor = 'Mac';
  } else if (/Windows|Win32|Win64|WinCE/i.test(userAgent)) {
    deviceVendor = 'Windows';
  } else if (/Linux|X11/i.test(userAgent)) {
    deviceVendor = 'Linux';
  }

  return {
    type: deviceType,
    vendor: deviceVendor,
    isTouchDevice,
    userAgent,
    screenInfo,
    performance,
    // Battery information if available
    batteryInfo: async () => {
      if ('getBattery' in navigator) {
        try {
          const battery = await navigator.getBattery();
          return {
            level: battery.level,
            charging: battery.charging,
            chargingTime: battery.chargingTime,
            dischargingTime: battery.dischargingTime
          };
        } catch (e) {
          console.error("Battery API error:", e);
          return null;
        }
      }
      return null;
    }
  };
};

/**
 * Get current viewport size category
 * @returns {String} Viewport category (xs, sm, md, lg, xl)
 */
export const getViewportCategory = () => {
  const width = window.innerWidth;

  if (width < 576) return 'xs';
  if (width >= 576 && width < 768) return 'sm';
  if (width >= 768 && width < 992) return 'md';
  if (width >= 992 && width < 1200) return 'lg';
  return 'xl';
};

export default {
  detectDevice,
  getViewportCategory,
  DEVICE_TYPES
};
