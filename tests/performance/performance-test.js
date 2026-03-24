/**
 * Performance Testing Script
 * Uses Lighthouse to analyze performance metrics of the landing page
 */
const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const fs = require('fs').promises;

const URL = 'http://localhost:3000'; // Update with your deployment URL

async function runPerformanceTest() {
  let chrome;

  try {
    // Launch Chrome
    chrome = await chromeLauncher.launch({
      chromeFlags: ['--headless', '--no-sandbox', '--disable-gpu']
    });

    // Run Lighthouse
    console.log('Running Lighthouse performance tests...');
    const results = await lighthouse(URL, {
      port: chrome.port,
      onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
      output: 'json',
      logLevel: 'info'
    });

    // Generate report
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const report = {
      url: URL,
      timestamp,
      performance: {
        score: results.lhr.categories.performance.score * 100,
        firstContentfulPaint: results.lhr.audits['first-contentful-paint'].displayValue,
        speedIndex: results.lhr.audits['speed-index'].displayValue,
        largestContentfulPaint: results.lhr.audits['largest-contentful-paint'].displayValue,
        totalBlockingTime: results.lhr.audits['total-blocking-time'].displayValue,
        cumulativeLayoutShift: results.lhr.audits['cumulative-layout-shift'].displayValue
      },
      accessibility: {
        score: results.lhr.categories.accessibility.score * 100
      },
      bestPractices: {
        score: results.lhr.categories['best-practices'].score * 100
      },
      seo: {
        score: results.lhr.categories.seo.score * 100
      }
    };

    // Save report to file
    await fs.writeFile(
      `tests/performance/performance-report-${timestamp}.json`,
      JSON.stringify(report, null, 2)
    );

    // Save full Lighthouse report
    await fs.writeFile(
      `tests/performance/lighthouse-full-${timestamp}.json`,
      JSON.stringify(results.lhr, null, 2)
    );

    console.log(`Performance tests completed.`);
    console.log(`Performance score: ${report.performance.score.toFixed(0)}/100`);
    console.log(`Accessibility score: ${report.accessibility.score.toFixed(0)}/100`);
    console.log(`Best practices score: ${report.bestPractices.score.toFixed(0)}/100`);
    console.log(`SEO score: ${report.seo.score.toFixed(0)}/100`);

    return report;
  } catch (error) {
    console.error('Performance testing failed:', error);
    throw error;
  } finally {
    if (chrome) {
      await chrome.kill();
    }
  }
}

// Export for use in other scripts
module.exports = { runPerformanceTest };

// Run test directly if this script is executed directly
if (require.main === module) {
  runPerformanceTest().catch(console.error);
}
