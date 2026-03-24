/**
 * Comprehensive Test Runner
 * Runs all test suites and generates reports
 */

const { runCrossBrowserTests } = require('./browser_testing/cross_browser_test');
const { runAccessibilityTests } = require('./accessibility/a11y_test');
const { runPerformanceTests } = require('./performance/perf_test');

async function runAllTests() {
  console.log('Starting comprehensive test suite...');

  try {
    // Run cross-browser tests
    await runCrossBrowserTests();

    // Run accessibility tests
    await runAccessibilityTests();

    // Run performance tests
    await runPerformanceTests();

    console.log('All tests completed successfully!');
  } catch (error) {
    console.error('Error during test execution:', error);
    process.exit(1);
  }
}

// If this script is run directly
if (require.main === module) {
  runAllTests();
}

module.exports = { runAllTests };
