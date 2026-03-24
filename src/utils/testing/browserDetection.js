/**
 * Browser detection utility
 * Identifies the current browser and version
 */
export const detectBrowser = () => {
  const userAgent = navigator.userAgent;
  let browserName = "Unknown";
  let browserVersion = "Unknown";
  let browserEngine = "Unknown";
  let isCompatible = true;
  let compatibilityIssues = [];

  // Detect browser and version
  if (userAgent.indexOf("Firefox") > -1) {
    browserName = "Firefox";
    browserEngine = "Gecko";
    browserVersion = userAgent.match(/Firefox\/([0-9.]+)/)[1];
    if (parseInt(browserVersion) < 60) {
      isCompatible = false;
      compatibilityIssues.push("Firefox version below 60 has limited CSS Grid support");
    }
  } else if (userAgent.indexOf("SamsungBrowser") > -1) {
    browserName = "Samsung Browser";
    browserEngine = "Blink";
    browserVersion = userAgent.match(/SamsungBrowser\/([0-9.]+)/)[1];
    if (parseInt(browserVersion) < 10) {
      isCompatible = false;
      compatibilityIssues.push("Samsung Browser below version 10 has limited support for ES6");
    }
  } else if (userAgent.indexOf("Opera") > -1 || userAgent.indexOf("OPR") > -1) {
    browserName = "Opera";
    browserEngine = "Blink";
    browserVersion = userAgent.indexOf("Opera") > -1
      ? userAgent.match(/Opera\/([0-9.]+)/)[1]
      : userAgent.match(/OPR\/([0-9.]+)/)[1];
    if (parseInt(browserVersion) < 50) {
      isCompatible = false;
      compatibilityIssues.push("Opera below version 50 may have CSS variable support issues");
    }
  } else if (userAgent.indexOf("Trident") > -1 || userAgent.indexOf("MSIE") > -1) {
    browserName = "Internet Explorer";
    browserEngine = "Trident";
    browserVersion = userAgent.indexOf("MSIE") > -1
      ? userAgent.match(/MSIE ([0-9.]+)/)[1]
      : userAgent.match(/rv:([0-9.]+)/)[1];
    isCompatible = false;
    compatibilityIssues.push("Internet Explorer has limited support for modern CSS and JS features");
  } else if (userAgent.indexOf("Edge") > -1) {
    browserName = "Edge (Legacy)";
    browserEngine = "EdgeHTML";
    browserVersion = userAgent.match(/Edge\/([0-9.]+)/)[1];
    if (parseInt(browserVersion) < 18) {
      isCompatible = false;
      compatibilityIssues.push("Edge Legacy has limited support for some CSS features");
    }
  } else if (userAgent.indexOf("Edg") > -1) {
    browserName = "Edge (Chromium)";
    browserEngine = "Blink";
    browserVersion = userAgent.match(/Edg\/([0-9.]+)/)[1];
    if (parseInt(browserVersion) < 80) {
      isCompatible = false;
      compatibilityIssues.push("Early Chromium Edge versions have some CSS Grid issues");
    }
  } else if (userAgent.indexOf("Chrome") > -1) {
    browserName = "Chrome";
    browserEngine = "Blink";
    browserVersion = userAgent.match(/Chrome\/([0-9.]+)/)[1];
    if (parseInt(browserVersion) < 60) {
      isCompatible = false;
      compatibilityIssues.push("Chrome below version 60 has limited CSS Grid support");
    }
  } else if (userAgent.indexOf("Safari") > -1) {
    browserName = "Safari";
    browserEngine = "WebKit";
    browserVersion = userAgent.match(/Version\/([0-9.]+)/)[1];
    if (parseInt(browserVersion) < 11) {
      isCompatible = false;
      compatibilityIssues.push("Safari below version 11 has limited support for CSS Grid and modern JS features");
    }
  }

  return {
    name: browserName,
    version: browserVersion,
    engine: browserEngine,
    userAgent: userAgent,
    isCompatible,
    compatibilityIssues,
  };
};

/**
 * Feature detection for critical browser features
 * Returns an object with boolean flags for each feature
 */
export const detectFeatureSupport = () => {
  return {
    flexbox: typeof document.createElement('div').style.flexBasis !== 'undefined',
    grid: typeof document.createElement('div').style.grid !== 'undefined',
    cssVariables: window.CSS && window.CSS.supports && window.CSS.supports('--a', '0'),
    fetch: typeof window.fetch !== 'undefined',
    intersectionObserver: 'IntersectionObserver' in window,
    webpSupport: false, // Will be determined by the webp detection function
    webpLossless: false
  };
};

/**
 * Detect WebP support
 * This function tests for WebP support and updates the feature detection object
 */
export const detectWebpSupport = async (featuresObj) => {
  // Basic WebP support check
  const basicWebP = new Promise(resolve => {
    const img = new Image();
    img.onload = function() { resolve(img.width > 0 && img.height > 0); };
    img.onerror = function() { resolve(false); };
    img.src = 'data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA=';
  });

  // Lossless WebP support check
  const losslessWebP = new Promise(resolve => {
    const img = new Image();
    img.onload = function() { resolve(img.width > 0 && img.height > 0); };
    img.onerror = function() { resolve(false); };
    img.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAEALmk0mk0iIiIiIgBoSygABc6zbAAA/v56QAAAAP8TCRMQ0QA=';
  });

  try {
    featuresObj.webpSupport = await basicWebP;
    featuresObj.webpLossless = await losslessWebP;
  } catch (e) {
    console.error("WebP detection error:", e);
    featuresObj.webpSupport = false;
    featuresObj.webpLossless = false;
  }

  return featuresObj;
};

export default {
  detectBrowser,
  detectFeatureSupport,
  detectWebpSupport
};
