/**
 * Simple performance testing script
 * Run with: node tools/performance-test.js [url]
 */

const puppeteer = require('puppeteer');

async function measurePerformance(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Enable performance metrics
  await page.setCacheEnabled(false);
  await page.coverage.startJSCoverage();
  await page.coverage.startCSSCoverage();

  // Navigate and measure timing
  const start = Date.now();
  await page.goto(url, { waitUntil: 'networkidle0' });
  const loadTime = Date.now() - start;

  // Get performance metrics
  const metrics = await page.evaluate(() => JSON.stringify({
    jsHeapSizeLimit: performance.memory ? performance.memory.jsHeapSizeLimit : null,
    totalJSHeapSize: performance.memory ? performance.memory.totalJSHeapSize : null,
    usedJSHeapSize: performance.memory ? performance.memory.usedJSHeapSize : null,
    timing: performance.timing.toJSON(),
    navigation: performance.navigation
  }));

  // Get JS and CSS coverage
  const jsCoverage = await page.coverage.stopJSCoverage();
  const cssCoverage = await page.coverage.stopCSSCoverage();

  // Calculate unused bytes
  let jsUsed = 0;
  let jsTotal = 0;
  jsCoverage.forEach(item => {
    jsTotal += item.text.length;
    for (const range of item.ranges) {
      jsUsed += range.end - range.start - 1;
    }
  });

  let cssUsed = 0;
  let cssTotal = 0;
  cssCoverage.forEach(item => {
    cssTotal += item.text.length;
    for (const range of item.ranges) {
      cssUsed += range.end - range.start - 1;
    }
  });

  await browser.close();

  // Format and return results
  return {
    url,
    loadTime: `${loadTime}ms`,
    metrics: JSON.parse(metrics),
    coverage: {
      js: {
        total: `${(jsTotal / 1024).toFixed(2)} KB`,
        used: `${(jsUsed / 1024).toFixed(2)} KB`,
        unused: `${((jsTotal - jsUsed) / 1024).toFixed(2)} KB`,
        percentUnused: `${((jsTotal - jsUsed) / jsTotal * 100).toFixed(2)}%`
      },
      css: {
        total: `${(cssTotal / 1024).toFixed(2)} KB`,
        used: `${(cssUsed / 1024).toFixed(2)} KB`,
        unused: `${((cssTotal - cssUsed) / 1024).toFixed(2)} KB`,
        percentUnused: `${((cssTotal - cssUsed) / cssTotal * 100).toFixed(2)}%`
      }
    }
  };
}

// Get URL from command line args or use default
const url = process.argv[2] || 'http://localhost:8080';
measurePerformance(url)
  .then(results => {
    console.log(JSON.stringify(results, null, 2));
  })
  .catch(err => {
    console.error('Error:', err);
    process.exit(1);
  });
