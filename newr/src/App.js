import React from 'react';
import LandingPage from './pages/LandingPage/LandingPage';
import './App.css';

/**
 * Main App component
 * @returns {React.ReactElement} - Rendered application
 */
function App() {
  return (
    <div className="app">
      {/* Skip to main content link for accessibility */}
      <a href="#main-content" className="skip-nav">
        Skip to main content
      </a>

      <LandingPage />
    </div>
  );
}

export default App;
