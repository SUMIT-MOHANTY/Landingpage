import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ErrorBoundary.css';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render shows the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to an error reporting service
    console.error('ErrorBoundary caught an error', error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo
    });

    // You could also log to a remote logging service here
    if (window.gtag) {
      window.gtag('event', 'error', {
        'error_message': error.message,
        'error_stack': error.stack
      });
    }
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="error-boundary">
          <h2>Something went wrong.</h2>
          <p>Please refresh the page or contact support if the problem persists.</p>
          {this.props.showDetails && this.state.error && (
            <details className="error-details">
              <summary>Error Details</summary>
              <p>{this.state.error.toString()}</p>
              <pre>{this.state.errorInfo?.componentStack || 'No stack trace available'}</pre>
            </details>
          )}
          {this.props.renderFallback ? this.props.renderFallback(this.state.error) : null}
        </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  showDetails: PropTypes.bool,
  renderFallback: PropTypes.func
};

ErrorBoundary.defaultProps = {
  showDetails: false
};

export default ErrorBoundary;
