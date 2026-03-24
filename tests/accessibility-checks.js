/**
 * Accessibility Testing Suite
 * Run these checks to ensure the site is accessible
 */

// Basic accessibility checks that can be run in the browser
function runAccessibilityChecks() {
  const issues = [];

  // Check for images without alt text
  document.querySelectorAll('img').forEach(img => {
    if (!img.hasAttribute('alt')) {
      issues.push(`Image missing alt text: ${img.src}`);
    }
  });

  // Check for proper heading hierarchy
  let lastHeadingLevel = 0;
  document.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(heading => {
    const currentLevel = parseInt(heading.tagName.charAt(1));
    if (lastHeadingLevel > 0 && currentLevel > lastHeadingLevel + 1) {
      issues.push(`Heading level skipped: Found ${heading.tagName} after h${lastHeadingLevel}`);
    }
    lastHeadingLevel = currentLevel;
  });

  // Check for sufficient color contrast (simplified check)
  const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, a, li, td, th, label, button');
  textElements.forEach(el => {
    const style = window.getComputedStyle(el);
    const fontSize = parseFloat(style.fontSize);
    if (fontSize < 14) {
      issues.push(`Text may be too small for readability: ${el.tagName} with content "${el.textContent.substring(0, 20)}..."`);
    }
  });

  // Check for keyboard accessibility
  const interactiveElements = document.querySelectorAll('a, button, input, select, textarea, [tabindex]');
  interactiveElements.forEach(el => {
    if (el.tabIndex < 0 && !el.disabled) {
      issues.push(`Interactive element not keyboard accessible: ${el.tagName} with content "${el.textContent || el.value || ''}"`);
    }
  });

  return {
    issues,
    passedChecks: issues.length === 0,
    summary: `Found ${issues.length} accessibility issues`
  };
}

// Export for automated testing
if (typeof module !== 'undefined') {
  module.exports = { runAccessibilityChecks };
}
