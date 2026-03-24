/**
 * Automated Browser Testing Script
 * Uses Puppeteer to test the website in headless Chrome
 *
 * To use:
 * 1. npm install puppeteer
 * 2. node tests/run-browser-tests.js
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function runTests() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  // Set viewport sizes to test
  const viewports = [
    { width: 1920, height: 1080, name: 'large-desktop' },
    { width: 1366, height: 768, name: 'desktop' },
    { width: 768, height: 1024, name: 'tablet-portrait' },
    { width: 375, height: 667, name: 'mobile' }
  ];

  const testUrl = 'http://localhost:3000'; // Update with your local dev URL
  const results = {
    url: testUrl,
    timestamp: new Date().toISOString(),
    viewportTests: [],
    consoleErrors: [],
    networkErrors: [],
    accessibilityIssues: []
  };

  // Collect console errors
  page.on('console', msg => {
    if (msg.type() === 'error') {
      results.consoleErrors.push({
        message: msg.text(),
        location: msg.location()
      });
    }
  });

  // Collect network errors
  page.on('requestfailed', request => {
    results.networkErrors.push({
      url: request.url(),
      errorText: request.failure().errorText
    });
  });

  // Run tests for each viewport
  for (const viewport of viewports) {
    await page.setViewport({ width: viewport.width, height: viewport.height });

    console.log(`Testing viewport ${viewport.name} (${viewport.width}x${viewport.height})`);

    try {
      await page.goto(testUrl, { waitUntil: 'networkidle2', timeout: 30000 });

      // Take screenshot
      const screenshotDir = path.join(__dirname, 'screenshots');
      if (!fs.existsSync(screenshotDir)) {
        fs.mkdirSync(screenshotDir, { recursive: true });
      }

      await page.screenshot({
        path: path.join(screenshotDir, `screenshot-${viewport.name}.png`),
        fullPage: true
      });

      // Test page load and critical elements
      const viewportTest = {
        viewport: viewport.name,
        loadSuccessful: true,
        elementsVisible: {},
        metricsCollected: {}
      };

      // Check if critical elements are visible
      const criticalSelectors = [
        'header',
        'nav',
        'main',
        'footer',
        '.hero-section',
        '.cta-button'
      ];

      for (const selector of criticalSelectors) {
        try {
          const visible = await page.evaluate((sel) => {
            const element = document.querySelector(sel);
            if (!element) return false;

            const style = window.getComputedStyle(element);
            return style && style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0';
          }, selector);

          viewportTest.elementsVisible[selector] = visible;
        } catch (error) {
          viewportTest.elementsVisible[selector] = false;
        }
      }

      // Collect performance metrics
      const performanceMetrics = await page.evaluate(() => {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        const domLoadTime = perfData.domContentLoadedEventEnd - perfData.navigationStart;

        return {
          pageLoadTime,
          domLoadTime
        };
      });

      viewportTest.metricsCollected = performanceMetrics;

      // Run accessibility checks
      const accessibilityIssues = await page.evaluate(() => {
        if (typeof runAccessibilityChecks === 'function') {
          return runAccessibilityChecks().issues;
        }
        return ['Accessibility checking function not found'];
      });

      if (Array.isArray(accessibilityIssues)) {
        results.accessibilityIssues.push({
          viewport: viewport.name,
          issues: accessibilityIssues
        });
      }

      results.viewportTests.push(viewportTest);

    } catch (error) {
      results.viewportTests.push({
        viewport: viewport.name,
        loadSuccessful: false,
        error: error.message
      });
      console.error(`Error testing viewport ${viewport.name}:`, error);
    }
  }

  await browser.close();

  // Save results to file
  const resultsDir = path.join(__dirname, 'results');
  if (!fs.existsSync(resultsDir)) {
    fs.mkdirSync(resultsDir, { recursive: true });
  }

  fs.writeFileSync(
    path.join(resultsDir, `browser-test-results-${new Date().toISOString().replace(/:/g, '-')}.json`),
    JSON.stringify(results, null, 2)
  );

  console.log('Testing complete. Results saved to tests/results/');

  // Log summary
  console.log('\n=== Test Summary ===');
  console.log(`Viewports tested: ${results.viewportTests.length}`);
  console.log(`Console errors: ${results.consoleErrors.length}`);
  console.log(`Network errors: ${results.networkErrors.length}`);
  console.log(`Accessibility issues: ${results.accessibilityIssues.reduce((total, vp) => total + vp.issues.length, 0)}`);

  return results;
}

// Run tests if executed directly
if (require.main === module) {
  runTests().catch(console.error);
}

module.exports = { runTests };
