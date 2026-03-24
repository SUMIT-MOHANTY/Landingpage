import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';

// Polyfill check for older browsers
const loadPolyfills = async () => {
  if (!window.fetch) {
    await import('whatwg-fetch');
  }

  if (!window.IntersectionObserver) {
    await import('intersection-observer');
  }
};

const renderApp = () => {
  const container = document.getElementById('root');

  // Check if the container exists to prevent errors
  if (!container) {
    console.error('Failed to find the root element');
    return;
  }

  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
};

// Load any required polyfills then render the app
loadPolyfills().then(renderApp);

// Register service worker for better offline experience
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').catch(error => {
      console.log('Service worker registration failed:', error);
    });
  });
}
