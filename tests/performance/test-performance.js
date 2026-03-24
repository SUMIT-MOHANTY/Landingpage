// Simple performance test script using Lighthouse programmatically
const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');

async function runLighthouse(url) {
  const chrome = await chromeLauncher.launch({chromeFlags: ['--headless']});
  const options = {
    logLevel: 'info',
    output: 'json',
    onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
    port: chrome.port
  };

  const runnerResult = await lighthouse(url, options);

  console.log('Report is done for', url);
  console.log('Performance score:', runnerResult.lhr.categories.performance.score * 100);
  console.log('Accessibility score:', runnerResult.lhr.categories.accessibility.score * 100);
  console.log('Best practices score:', runnerResult.lhr.categories.['best-practices'].score * 100);
  console.log('SEO score:', runnerResult.lhr.categories.seo.score * 100);

  await chrome.kill();
}

// Run the test on the local server
runLighthouse('http://localhost:3000')
  .catch(error => {
    console.error('Error running Lighthouse:', error);
    process.exit(1);
  });
