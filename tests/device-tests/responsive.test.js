const { chromium } = require('playwright');
const config = require('./device-config');

describe('Landing Page Responsive Tests', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await chromium.launch();
  });

  afterAll(async () => {
    await browser.close();
  });

  for (const device of config.devices) {
    describe(`Testing on ${device.name}`, () => {
      beforeEach(async () => {
        page = await browser.newPage({
          viewport: {
            width: device.width,
            height: device.height,
          },
          deviceScaleFactor: device.deviceScaleFactor,
          isMobile: device.isMobile
        });
      });

      afterEach(async () => {
        await page.close();
      });

      test('Page layout is responsive', async () => {
        await page.goto('http://localhost:3000');

        // Check that layout elements are visible and positioned correctly
        const heroSection = await page.$('.hero-section');
        expect(heroSection).toBeTruthy();

        if (device.isMobile) {
          // Mobile specific checks
          const mobileMenu = await page.$('.mobile-menu');
          expect(mobileMenu).toBeTruthy();
        } else {
          // Desktop specific checks
          const desktopNav = await page.$('.desktop-navigation');
          expect(desktopNav).toBeTruthy();
        }
      });

      test('Images are properly sized', async () => {
        await page.goto('http://localhost:3000');

        // Check if proper image sizes are loaded
        const heroImage = await page.$eval('.hero-image', el => {
          const computedStyle = window.getComputedStyle(el);
          return {
            width: computedStyle.width,
            height: computedStyle.height,
            display: computedStyle.display
          };
        });

        expect(heroImage.display).not.toBe('none');
      });

      test('Interactive elements are accessible', async () => {
        await page.goto('http://localhost:3000');

        // Check tap targets for mobile
        if (device.isMobile) {
          const buttons = await page.$$('button, .btn, [role="button"]');
          for (const button of buttons) {
            const size = await button.boundingBox();
            // Ensuring tap targets are at least 48x48px for mobile
            expect(size.width >= 48 && size.height >= 48).toBeTruthy();
          }
        }
      });
    });
  }
});
