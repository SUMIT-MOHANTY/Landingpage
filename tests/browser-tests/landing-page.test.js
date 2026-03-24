const { chromium, firefox, webkit } = require('playwright');
const config = require('./browser-config');

describe('Landing Page Browser Tests', () => {
  let browser;
  let page;

  for (const browserType of [chromium, firefox, webkit]) {
    describe(`Testing on ${browserType.name()}`, () => {
      beforeAll(async () => {
        browser = await browserType.launch();
        page = await browser.newPage();
        await page.setViewportSize({
          width: config.viewport.width,
          height: config.viewport.height
        });
      });

      afterAll(async () => {
        await browser.close();
      });

      test('Page loads correctly', async () => {
        await page.goto('http://localhost:3000');
        expect(await page.title()).toBeTruthy();
      });

      test('Hero section is visible', async () => {
        await page.goto('http://localhost:3000');
        const heroSection = await page.$('.hero-section');
        expect(heroSection).toBeTruthy();
      });

      test('CTA button is clickable', async () => {
        await page.goto('http://localhost:3000');
        await page.click('.cta-button');
        // Verify redirect or modal appears
      });

      test('Navigation menu works', async () => {
        await page.goto('http://localhost:3000');
        await page.click('.nav-toggle');
        const navMenu = await page.$('.nav-menu.active');
        expect(navMenu).toBeTruthy();
      });

      test('Form submission works', async () => {
        await page.goto('http://localhost:3000');
        await page.fill('#contact-email', 'test@example.com');
        await page.fill('#contact-name', 'Test User');
        await page.fill('#contact-message', 'This is a test message');
        await page.click('#submit-form');

        // Check for success message
        const successMessage = await page.$('.form-success');
        expect(successMessage).toBeTruthy();
      });
    });
  }
});
