import React, { Suspense, lazy } from 'react';
import './App.css';

// Lazy load the LandingPage component for better performance
const LandingPage = lazy(() => import('./pages/LandingPage/LandingPage'));

// Custom error boundary component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('App error:', error, errorInfo);
    // You could log to an error reporting service here
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-container">
          <h2>Something went wrong.</h2>
          <p>Please refresh the page or contact support if the issue persists.</p>
          <button onClick={() => window.location.reload()}>Refresh Page</button>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading amazing content...</p>
        </div>
      }>
        <LandingPage />
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
