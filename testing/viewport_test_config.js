/**
 * Viewport Testing Configuration
 * Defines breakpoints and expected behaviors
 */

const viewportConfig = {
  breakpoints: [
    { name: 'xs', width: 320, height: 568 },
    { name: 'sm', width: 375, height: 667 },
    { name: 'md', width: 768, height: 1024 },
    { name: 'lg', width: 1024, height: 768 },
    { name: 'xl', width: 1440, height: 900 }
  ],

  // Elements that should be visible at each breakpoint
  visibilityRules: [
    {
      selector: 'nav.mobile-nav',
      visibleAt: ['xs', 'sm'],
      hiddenAt: ['md', 'lg', 'xl']
    },
    {
      selector: 'nav.desktop-nav',
      visibleAt: ['md', 'lg', 'xl'],
      hiddenAt: ['xs', 'sm']
    },
    {
      selector: '.hero-section h1',
      visibleAt: ['xs', 'sm', 'md', 'lg', 'xl']
    }
  ],

  // Elements that should change position or style at different breakpoints
  styleRules: [
    {
      selector: '.features-grid',
      xs: { display: 'block' },
      sm: { display: 'block' },
      md: { display: 'grid', gridTemplateColumns: '1fr 1fr' },
      lg: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr' },
      xl: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr' }
    }
  ]
};

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { viewportConfig };
}
