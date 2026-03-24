/**
 * Responsive Navigation Handler
 * Handles mobile navigation toggle and accessibility features
 */
document.addEventListener('DOMContentLoaded', function() {
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
    // Toggle navigation menu
    navToggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');

      // Update ARIA attributes
      const expanded = navMenu.classList.contains('active');
      navToggle.setAttribute('aria-expanded', expanded);

      // Update button text for screen readers
      navToggle.innerHTML = expanded ?
        'Close menu <span class="sr-only">Close navigation menu</span>' :
        'Menu <span class="sr-only">Open navigation menu</span>';
    });

    // Close menu on ESC key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.innerHTML = 'Menu <span class="sr-only">Open navigation menu</span>';
        navToggle.focus();
      }
    });

    // Handle resize events
    window.addEventListener('resize', function() {
      if (window.innerWidth > 576 && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Add focus outlines for keyboard navigation
  document.body.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
      document.body.classList.add('keyboard-navigation');
    }
  });

  document.body.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-navigation');
  });
});
