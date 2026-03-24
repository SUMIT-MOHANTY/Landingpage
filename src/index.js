import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import ReactDOM from 'react-dom';
import './styles/global.css';
import './styles/variables.css';
import './styles/responsive.css';
import App from './App';
import ErrorBoundary from './components/common/ErrorBoundary/ErrorBoundary';

// Browser compatibility detection
import { detectBrowser } from './utils/testing/browserDetection';

// Log browser information for debugging
const browserInfo = detectBrowser();
console.log('Browser detected:', browserInfo.name, browserInfo.version);

// Show warning for incompatible browsers
if (!browserInfo.isCompatible) {
  console.warn('Browser compatibility issues detected:', browserInfo.compatibilityIssues);
}

// Performance monitoring
if (window.performance) {
  window.addEventListener('load', () => {
    const timing = window.performance.timing;
    const loadTime = timing.loadEventEnd - timing.navigationStart;
    console.log('Page load time:', loadTime + 'ms');
  });
}

// Error tracking
window.onerror = function(message, source, lineno, colno, error) {
  console.error('Global error caught:', message, 'at', source, lineno, colno);
  // You could send this to a monitoring service
  return false;
};

// Render with error boundary
ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary showDetails={process.env.NODE_ENV === 'development'}>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root')
);
