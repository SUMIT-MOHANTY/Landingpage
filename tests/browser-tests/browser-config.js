// Browser testing configuration
module.exports = {
  browsers: [
    { name: 'chrome', version: 'latest' },
    { name: 'firefox', version: 'latest' },
    { name: 'edge', version: 'latest' },
    { name: 'safari', version: 'latest' }
  ],
  viewport: {
    width: 1280,
    height: 800
  },
  screenshots: {
    enabled: true,
    path: './reports/screenshots'
  }
};
