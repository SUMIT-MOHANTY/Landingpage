/**
 * Main JavaScript file with responsive design and accessibility enhancements
 */

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle functionality
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.getElementById('navigation-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            // Toggle the menu visibility
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            navMenu.classList.toggle('active');

            // Toggle the menu icon appearance
            menuToggle.classList.toggle('open');
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!navMenu.contains(event.target) && !menuToggle.contains(event.target) && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                menuToggle.classList.remove('open');
            }
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();

                // Check if user prefers reduced motion
                const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

                if (prefersReducedMotion) {
                    // Instantly jump to the target for users who prefer reduced motion
                    window.scrollTo(0, target.offsetTop);
                } else {
                    // Smooth scroll for users who don't mind animations
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }

                // Update the URL without scrolling
                history.pushState(null, null, this.getAttribute('href'));

                // Close the mobile menu if it's open
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    if (menuToggle) {
                        menuToggle.setAttribute('aria-expanded', 'false');
                        menuToggle.classList.remove('open');
                    }
                }
            }
        });
    });

    // Focus trap for modal dialogs
    const trapFocus = function(element) {
        const focusableElements = element.querySelectorAll('a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select');
        const firstFocusableElement = focusableElements[0];
        const lastFocusableElement = focusableElements[focusableElements.length - 1];

        element.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                // Shift + Tab
                if (e.shiftKey) {
                    if (document.activeElement === firstFocusableElement) {
                        lastFocusableElement.focus();
                        e.preventDefault();
                    }
                } else {
                    // Tab
                    if (document.activeElement === lastFocusableElement) {
                        firstFocusableElement.focus();
                        e.preventDefault();
                    }
                }
            }

            // Close on Escape key
            if (e.key === 'Escape') {
                closeModal(element);
            }
        });
    };

    // Function to close modal dialogs
    const closeModal = function(modal) {
        if (modal && modal.style.display === 'block') {
            modal.style.display = 'none';
            document.body.classList.remove('modal-open');

            // Return focus to the element that opened the modal
            if (modal.previousFocus) {
                modal.previousFocus.focus();
            }
        }
    };

    // Skip to main content functionality
    const addSkipLink = function() {
        const mainContent = document.getElementById('main-content');
        if (mainContent) {
            const skipLink = document.createElement('a');
            skipLink.href = '#main-content';
            skipLink.className = 'skip-to-main';
            skipLink.textContent = 'Skip to main content';
            document.body.insertBefore(skipLink, document.body.firstChild);
        }
    };

    addSkipLink();

    // Responsive image loading
    const loadResponsiveImages = function() {
        const images = document.querySelectorAll('img[data-src]');

        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;

                        // Optional: load different sized images based on screen width
                        if (img.dataset.srcset) {
                            img.srcset = img.dataset.srcset;
                        }

                        imageObserver.unobserve(img);
                    }
                });
            });

            images.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback for browsers that don't support IntersectionObserver
            images.forEach(img => {
                img.src = img.dataset.src;
                if (img.dataset.srcset) {
                    img.srcset = img.dataset.srcset;
                }
            });
        }
    };

    loadResponsiveImages();
});
