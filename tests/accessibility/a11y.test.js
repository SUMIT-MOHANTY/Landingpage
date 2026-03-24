const { chromium } = require('playwright');
const { AxeBuilder } = require('@axe-core/playwright');

describe('Landing Page Accessibility Tests', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await chromium.launch();
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
  });

  test('Page should not have accessibility violations', async () => {
    await page.goto('http://localhost:3000');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('Page has proper heading structure', async () => {
    await page.goto('http://localhost:3000');

    const headings = await page.evaluate(() => {
      const headingElements = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
      return headingElements.map(h => ({
        level: parseInt(h.tagName.charAt(1)),
        text: h.textContent.trim()
      }));
    });

    // Verify there's only one h1
    const h1Count = headings.filter(h => h.level === 1).length;
    expect(h1Count).toBe(1);

    // Verify heading structure is sequential
    let previousLevel = 0;
    let valid = true;
    for (const heading of headings) {
      if (heading.level - previousLevel > 1 && previousLevel !== 0) {
        valid = false;
        break;
      }
      previousLevel = heading.level;
    }

    expect(valid).toBe(true);
  });
});
