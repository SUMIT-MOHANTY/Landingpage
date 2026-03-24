/**
 * Accessibility testing with Axe
 */

const { test, expect } = require('@playwright/test');
const AxeBuilder = require('@axe-core/playwright').default;

const pages = [
  '/',
  '/about',
  '/contact',
  '/features'
];

test.describe('Accessibility testing', () => {
  for (const page of pages) {
    test(`Page ${page} should not have any automatically detectable accessibility issues`, async ({ page: pageObj }) => {
      await pageObj.goto(`http://localhost:3000${page}`);

      const accessibilityScanResults = await new AxeBuilder({ page: pageObj }).analyze();

      // Output results to console and save to file
      console.log(`Accessibility results for ${page}:`,
        `${accessibilityScanResults.violations.length} violations found`);

      // Write results to file for reference
      const fs = require('fs');
      fs.writeFileSync(
        `docs/testing-results/a11y-results-${page.replace('/', '')}.json`,
        JSON.stringify(accessibilityScanResults, null, 2)
      );

      // Expect no violations
      expect(accessibilityScanResults.violations).toEqual([]);
    });
  }
});
