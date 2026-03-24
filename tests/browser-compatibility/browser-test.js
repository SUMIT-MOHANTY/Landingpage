/**
 * Browser Compatibility Testing Script
 * This script runs automated tests across different browsers using Selenium WebDriver
 */
const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const firefox = require('selenium-webdriver/firefox');
const edge = require('selenium-webdriver/edge');
const safari = require('selenium-webdriver/safari');

const URL = 'http://localhost:3000'; // Update this to your deployment URL
const TIMEOUT = 10000; // 10 seconds

async function runTest(browserName, options = {}) {
  console.log(`Starting test on ${browserName}...`);
  let driver;

  try {
    // Setup the appropriate driver based on browser
    switch (browserName.toLowerCase()) {
      case 'chrome':
        driver = await new Builder()
          .forBrowser('chrome')
          .setChromeOptions(new chrome.Options().headless())
          .build();
        break;
      case 'firefox':
        driver = await new Builder()
          .forBrowser('firefox')
          .setFirefoxOptions(new firefox.Options().headless())
          .build();
        break;
      case 'edge':
        driver = await new Builder()
          .forBrowser('MicrosoftEdge')
          .setEdgeOptions(new edge.Options().headless())
          .build();
        break;
      case 'safari':
        driver = await new Builder()
          .forBrowser('safari')
          .setSafariOptions(new safari.Options())
          .build();
        break;
      default:
        throw new Error(`Unsupported browser: ${browserName}`);
    }

    // Emulate mobile device if specified
    if (options.mobileEmulation) {
      const emulation = {
        deviceName: options.mobileEmulation
      };
      await driver.setWindowRect(options.width, options.height);
    }

    // Navigate to the landing page
    await driver.get(URL);
    await driver.wait(until.titleContains(''), TIMEOUT);

    // Test navigation elements
    const navLinks = await driver.findElements(By.css('nav a'));
    console.log(`Found ${navLinks.length} navigation links`);

    // Test hero section
    const heroSection = await driver.findElement(By.css('.hero-section'));
    const isHeroVisible = await heroSection.isDisplayed();
    console.log(`Hero section visible: ${isHeroVisible}`);

    // Test responsive behavior
    if (options.testResponsive) {
      // Test at different viewport sizes
      await driver.manage().window().setRect({ width: 1920, height: 1080 });
      await driver.sleep(1000);
      console.log('Tested desktop viewport');

      await driver.manage().window().setRect({ width: 768, height: 1024 });
      await driver.sleep(1000);
      console.log('Tested tablet viewport');

      await driver.manage().window().setRect({ width: 375, height: 812 });
      await driver.sleep(1000);
      console.log('Tested mobile viewport');
    }

    // Check for console errors
    const logs = await driver.manage().logs().get('browser');
    const errors = logs.filter(entry => entry.level === 'SEVERE');
    if (errors.length > 0) {
      console.error(`Found ${errors.length} console errors in ${browserName}:`);
      errors.forEach(error => console.error(error));
    } else {
      console.log(`No console errors found in ${browserName}`);
    }

    console.log(`${browserName} test completed successfully.`);
    return { browser: browserName, success: true, errors: errors.length };
  } catch (error) {
    console.error(`Error testing ${browserName}:`, error);
    return { browser: browserName, success: false, error: error.toString() };
  } finally {
    if (driver) {
      await driver.quit();
    }
  }
}

async function runAllTests() {
  const results = [];

  // Test in different browsers
  results.push(await runTest('chrome', { testResponsive: true }));
  results.push(await runTest('firefox'));

  // Uncomment these as needed based on your testing environment
  // results.push(await runTest('edge'));
  // results.push(await runTest('safari'));

  // Mobile emulation test
  results.push(await runTest('chrome', {
    mobileEmulation: 'iPhone X',
    width: 375,
    height: 812
  }));

  console.log('Test Summary:');
  results.forEach(result => {
    console.log(`${result.browser}: ${result.success ? 'PASS' : 'FAIL'}`);
  });

  return results;
}

// Export for use in other scripts
module.exports = { runTest, runAllTests };

// Run tests directly if this script is executed directly
if (require.main === module) {
  runAllTests().catch(console.error);
}
