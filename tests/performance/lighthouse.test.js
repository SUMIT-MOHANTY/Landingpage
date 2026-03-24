const { chromium } = require('playwright');
const lighthouse = require('lighthouse');
const { startFlow } = require('lighthouse/lighthouse-core/lib/user-flow');

describe('Landing Page Performance Tests', () => {
  let browser;
  let page;
  let flow;

  beforeAll(async () => {
    browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    page = await context.newPage();
    flow = await startFlow(page, { name: 'Landing Page User Flow' });
  });

  afterAll(async () => {
    await browser.close();
  });

  test('Landing page load performance meets thresholds', async () => {
    await flow.navigate('http://localhost:3000', {
      stepName: 'Initial page load'
    });

    const result = flow.getFlowResult();

    // Performance thresholds
    expect(result.steps[0].lhr.categories.performance.score).toBeGreaterThanOrEqual(0.9); // 90%+
    expect(result.steps[0].lhr.audits['first-contentful-paint'].numericValue).toBeLessThan(1800); // Under 1.8s
    expect(result.steps[0].lhr.audits['largest-contentful-paint'].numericValue).toBeLessThan(2500); // Under 2.5s
    expect(result.steps[0].lhr.audits['cumulative-layout-shift'].numericValue).toBeLessThan(0.1); // Under 0.1
  });

  test('Critical user journey performs well', async () => {
    await flow.startTimespan({ stepName: 'User interaction' });

    await page.goto('http://localhost:3000');
    await page.click('.cta-button');
    await page.fill('#contact-email', 'test@example.com');
    await page.click('#submit-form');

    await flow.endTimespan();

    const result = flow.getFlowResult();

    // Interaction performance thresholds
    expect(result.steps[1].lhr.categories.performance.score).toBeGreaterThanOrEqual(0.85); // 85%+
    expect(result.steps[1].lhr.audits['total-blocking-time'].numericValue).toBeLessThan(300); // Under 300ms
  });
});
