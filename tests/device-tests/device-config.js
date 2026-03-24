// Device testing configuration
module.exports = {
  devices: [
    { name: 'iPhone X', width: 375, height: 812, deviceScaleFactor: 3, isMobile: true },
    { name: 'iPad Pro', width: 1024, height: 1366, deviceScaleFactor: 2, isMobile: true },
    { name: 'Pixel 5', width: 393, height: 851, deviceScaleFactor: 2.75, isMobile: true },
    { name: 'Desktop', width: 1920, height: 1080, deviceScaleFactor: 1, isMobile: false }
  ],
  orientation: 'portrait',
  screenshots: true
};
