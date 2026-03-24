import React, { lazy, Suspense } from 'react';
import './App.css';
import ErrorBoundary from './components/common/ErrorBoundary/ErrorBoundary';

// Lazy load the LandingPage component
const LandingPage = lazy(() => import('./pages/LandingPage/LandingPage'));

function App() {
  return (
    <ErrorBoundary fallback={<div className="error-fallback">Something went wrong. Please refresh the page.</div>}>
      <Suspense fallback={<div className="loading">Loading...</div>}>
        <div className="App">
          <LandingPage />
        </div>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
