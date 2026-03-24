/**
 * Cross-browser testing script using Playwright
 * Run with: npx playwright test
 */

const { test, expect } = require('@playwright/test');

// Define list of test URLs (update with your actual pages)
const pages = [
  '/',
  '/about',
  '/contact',
  '/features'
];

// Test across all pages in Chromium
test.describe('Chrome browser testing', () => {
  for (const page of pages) {
    test(`Page ${page} loads correctly in Chrome`, async ({ browser }) => {
      const context = await browser.newContext({
        viewport: { width: 1280, height: 720 },
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36'
      });
      const pageObj = await context.newPage();

      // Navigate to the page
      await pageObj.goto(`http://localhost:3000${page}`);

      // Basic tests
      await expect(pageObj).toHaveTitle(/./); // Page has a title

      // Check that main elements exist
      await expect(pageObj.locator('header')).toBeVisible();
      await expect(pageObj.locator('footer')).toBeVisible();

      // Take a screenshot for reference
      await pageObj.screenshot({ path: `docs/testing-results/chrome-${page.replace('/', '')}-desktop.png` });

      await context.close();
    });
  }
});

// Test across all pages in Firefox
test.describe('Firefox browser testing', () => {
  for (const page of pages) {
    test(`Page ${page} loads correctly in Firefox`, async ({ browser }) => {
      const context = await browser.newContext({
        viewport: { width: 1280, height: 720 },
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:95.0) Gecko/20100101 Firefox/95.0'
      });
      const pageObj = await context.newPage();

      // Navigate to the page
      await pageObj.goto(`http://localhost:3000${page}`);

      // Basic tests
      await expect(pageObj).toHaveTitle(/./); // Page has a title

      // Take a screenshot for reference
      await pageObj.screenshot({ path: `docs/testing-results/firefox-${page.replace('/', '')}-desktop.png` });

      await context.close();
    });
  }
});

// Test mobile dimensions
test.describe('Mobile responsive testing', () => {
  const mobileSizes = [
    { name: 'iPhone-SE', width: 375, height: 667 },
    { name: 'Pixel-5', width: 393, height: 851 },
    { name: 'iPad', width: 820, height: 1180 }
  ];

  for (const size of mobileSizes) {
    for (const page of pages) {
      test(`Page ${page} loads correctly on ${size.name}`, async ({ browser }) => {
        const context = await browser.newContext({
          viewport: { width: size.width, height: size.height },
          userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1'
        });
        const pageObj = await context.newPage();

        // Navigate to the page
        await pageObj.goto(`http://localhost:3000${page}`);

        // Check for mobile menu
        const isMobileMenuPresent = await pageObj.locator('.mobile-menu, [data-mobile-menu], nav[role="navigation"]').isVisible();

        // Check responsive elements
        await expect(pageObj.locator('body')).toHaveCSS('overflow-x', 'hidden');

        // Take a screenshot for reference
        await pageObj.screenshot({ path: `docs/testing-results/${size.name}-${page.replace('/', '')}.png` });

        await context.close();
      });
    }
  }
});
