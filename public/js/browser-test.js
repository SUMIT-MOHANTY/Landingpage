document.addEventListener('DOMContentLoaded', function() {
  const testResults = document.getElementById('browser-test-results');
  if (!testResults) return;

  // Test features and append results
  function testFeature(feature, test) {
    const result = test();
    const item = document.createElement('li');
    item.className = result ? 'supported' : 'not-supported';
    item.innerHTML = `${feature}: <span>${result ? 'Supported' : 'Not Supported'}</span>`;
    testResults.appendChild(item);
    return result;
  }

  // Test for Flexbox
  testFeature('Flexbox', () => {
    const el = document.createElement('div');
    return el.style.flexDirection !== undefined;
  });

  // Test for Grid
  testFeature('CSS Grid', () => {
    const el = document.createElement('div');
    return el.style.gridTemplateColumns !== undefined;
  });

  // Test for IntersectionObserver
  testFeature('IntersectionObserver', () => {
    return 'IntersectionObserver' in window;
  });

  // Test for Fetch API
  testFeature('Fetch API', () => {
    return 'fetch' in window;
  });

  // Test for Promise API
  testFeature('Promises', () => {
    return 'Promise' in window;
  });

  // Test for localStorage
  testFeature('localStorage', () => {
    try {
      localStorage.setItem('test', 'test');
      localStorage.removeItem('test');
      return true;
    } catch (e) {
      return false;
    }
  });

  // Browser info
  const browserInfo = document.createElement('div');
  browserInfo.className = 'browser-info';
  browserInfo.innerHTML = `
    <h3>Browser Information</h3>
    <p>User Agent: ${navigator.userAgent}</p>
    <p>Screen Size: ${window.innerWidth}x${window.innerHeight}</p>
    <p>Pixel Ratio: ${window.devicePixelRatio}</p>
  `;

  testResults.parentNode.insertBefore(browserInfo, testResults);
});
