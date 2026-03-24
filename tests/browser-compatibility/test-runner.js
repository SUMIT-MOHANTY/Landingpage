/**
 * Browser Compatibility Test Runner
 *
 * This script automatically runs tests and generates reports for browser compatibility.
 * It can be integrated with testing frameworks or run standalone.
 */

import { detectBrowser, detectFeatureSupport, detectWebpSupport } from '../../src/utils/testing/browserDetection';
import { detectDevice, getViewportCategory } from '../../src/utils/testing/deviceDetection';

class CompatibilityTestRunner {
  constructor() {
    this.testResults = {
      browser: null,
      device: null,
      features: null,
      performanceMetrics: {},
      compatibilityScore: 0,
      compatibilityIssues: [],
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Run all compatibility tests
   */
  async runTests() {
    console.log('Starting browser compatibility tests...');

    // Detect browser
    this.testResults.browser = detectBrowser();
    console.log('Browser detected:', this.testResults.browser.name, this.testResults.browser.version);

    // Detect device
    this.testResults.device = detectDevice();
    console.log('Device detected:', this.testResults.device.type);

    // Detect features
    let features = detectFeatureSupport();
    this.testResults.features = await detectWebpSupport(features);
    console.log('Feature detection completed');

    // Collect performance metrics
    if (window.performance) {
      const perfTiming = window.performance.timing;
      this.testResults.performanceMetrics = {
        loadTime: perfTiming.loadEventEnd - perfTiming.navigationStart,
        domContentLoaded: perfTiming.domContentLoadedEventEnd - perfTiming.navigationStart,
        firstPaint: this.getFirstPaintTime(),
        networkLatency: perfTiming.responseEnd - perfTiming.fetchStart,
        processingTime: perfTiming.loadEventStart - perfTiming.domLoading
      };
    }

    // Calculate compatibility score
    this.calculateCompatibilityScore();

    console.log('Compatibility tests completed');
    console.log('Score:', this.testResults.compatibilityScore + '%');

    if (this.testResults.compatibilityIssues.length > 0) {
      console.log('Compatibility issues:');
      this.testResults.compatibilityIssues.forEach(issue => {
        console.log(' - ' + issue);
      });
    }

    return this.testResults;
  }

  /**
   * Get first paint time from Performance API
   */
  getFirstPaintTime() {
    if (window.performance && window.performance.getEntriesByType) {
      const paintMetrics = window.performance.getEntriesByType('paint');
      const firstPaint = paintMetrics.find(entry => entry.name === 'first-paint');
      return firstPaint ? firstPaint.startTime : null;
    }
    return null;
  }

  /**
   * Calculate compatibility score based on browser, features, and performance
   */
  calculateCompatibilityScore() {
    let score = 0;
    const issues = [];

    // Browser score (30%)
    const browser = this.testResults.browser;
    let browserScore = 30; // Default full score

    if (browser.name === 'Internet Explorer') {
      browserScore = 0;
      issues.push('Internet Explorer has limited support for modern web features');
    } else if (browser.name === 'Edge (Legacy)') {
      browserScore = 15;
      issues.push('Legacy Edge has some limitations with modern CSS features');
    } else if (browser.name === 'Safari' && parseFloat(browser.version) < 11) {
      browserScore = 20;
      issues.push('Safari version below 11 has limited support for some features');
    } else if (browser.name === 'Chrome' && parseFloat(browser.version) < 60) {
      browserScore = 25;
      issues.push('Chrome version below 60 has limited CSS Grid support');
    } else if (browser.name === 'Firefox' && parseFloat(browser.version) < 60) {
      browserScore = 25;
      issues.push('Firefox version below 60 has limited CSS Grid support');
    }

    // Feature support (50%)
    const features = this.testResults.features;
    let featureScore = 0;

    if (features.cssVariables) featureScore += 10;
    else issues.push('CSS Variables not supported - theming may not work correctly');

    if (features.grid) featureScore += 10;
    else issues.push('CSS Grid not supported - layouts may be incorrect');

    if (features.flexbox) featureScore += 10;
    else issues.push('Flexbox not supported - layouts may be incorrect');

    if (features.webpSupport) featureScore += 5;
    else issues.push('WebP images not supported - fallback images will be used');

    if (features.fetch) featureScore += 5;
    else issues.push('Fetch API not supported - AJAX requests may not work');

    if (features.intersectionObserver) featureScore += 10;
    else issues.push('Intersection Observer not supported - lazy loading will use fallback');

    // Performance score (20%)
    let performanceScore = 20; // Default full score
    const perf = this.testResults.performanceMetrics;

    if (perf.loadTime > 3000) {
      performanceScore -= 5;
      issues.push('Page load time is high - performance may be degraded');
    }

    if (perf.firstPaint && perf.firstPaint > 1000) {
      performanceScore -= 5;
      issues.push('First paint time is high - consider optimizing critical rendering path');
    }

    // Calculate total score
    const totalScore = browserScore + featureScore + performanceScore;

    this.testResults.compatibilityScore = totalScore;
    this.testResults.compatibilityIssues = issues;
  }

  /**
   * Generate a detailed compatibility report
   */
  generateReport() {
    const report = {
      ...this.testResults,
      recommendations: this.generateRecommendations()
    };

    return report;
  }

  /**
   * Generate recommendations based on test results
   */
  generateRecommendations() {
    const recommendations = [];
    const browser = this.testResults.browser;
    const features = this.testResults.features;

    if (browser.name === 'Internet Explorer') {
      recommendations.push('Consider adding a browser upgrade notice for IE users');
      recommendations.push('Include polyfills for ES6 features, fetch, Promise, etc.');
    }

    if (!features.cssVariables) {
      recommendations.push('Add a CSS Variables polyfill for theming support');
    }

    if (!features.grid) {
      recommendations.push('Add a CSS Grid polyfill or use flexbox fallback layouts');
    }

    if (!features.webpSupport) {
      recommendations.push('Ensure JPG/PNG fallbacks are available for all WebP images');
    }

    if (!features.intersectionObserver) {
      recommendations.push('Add Intersection Observer polyfill for lazy loading support');
    }

    if (this.testResults.performanceMetrics.loadTime > 3000) {
      recommendations.push('Optimize bundle size and consider code splitting to improve load times');
    }

    return recommendations;
  }

  /**
   * Save test results to localStorage for persistence
   */
  saveResults() {
    try {
      const resultsKey = 'browser-compatibility-test-results';
      localStorage.setItem(resultsKey, JSON.stringify(this.testResults));
      console.log('Test results saved to localStorage');
    } catch (e) {
      console.error('Failed to save test results:', e);
    }
  }
}

// Export the test runner
export default CompatibilityTestRunner;
