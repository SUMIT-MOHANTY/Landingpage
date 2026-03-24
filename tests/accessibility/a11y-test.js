/**
 * Accessibility Testing Script
 * Uses axe-core to perform accessibility testing on the landing page
 */
const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const { AxeBuilder } = require('@axe-core/webdriverjs');
const fs = require('fs').promises;

const URL = 'http://localhost:3000'; // Update with your deployment URL

async function runA11yTest() {
  let driver;

  try {
    // Setup Chrome in headless mode
    driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(new chrome.Options().headless())
      .build();

    // Navigate to the landing page
    await driver.get(URL);

    // Run axe accessibility tests
    console.log('Running accessibility tests...');
    const results = await new AxeBuilder(driver).analyze();

    // Generate report
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const report = {
      url: URL,
      timestamp,
      violations: results.violations,
      passes: results.passes.length,
      incomplete: results.incomplete.length,
      inapplicable: results.inapplicable.length
    };

    // Save report to file
    await fs.writeFile(
      `tests/accessibility/a11y-report-${timestamp}.json`,
      JSON.stringify(report, null, 2)
    );

    console.log(`Accessibility tests completed.`);
    console.log(`Violations found: ${results.violations.length}`);

    if (results.violations.length > 0) {
      results.violations.forEach(violation => {
        console.log(`\n${violation.impact} impact: ${violation.help}`);
        console.log(`Rule: ${violation.helpUrl}`);
        console.log(`Elements affected: ${violation.nodes.length}`);
      });
    }

    return report;
  } catch (error) {
    console.error('Accessibility testing failed:', error);
    throw error;
  } finally {
    if (driver) {
      await driver.quit();
    }
  }
}

// Export for use in other scripts
module.exports = { runA11yTest };

// Run test directly if this script is executed directly
if (require.main === module) {
  runA11yTest().catch(console.error);
}
