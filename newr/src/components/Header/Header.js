import React, { useState, useEffect, useRef } from 'react';
import Button from '../common/Button/Button';
import './Header.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const headerRef = useRef(null);
  const menuButtonRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuOpen &&
        headerRef.current &&
        !headerRef.current.contains(event.target) &&
        menuButtonRef.current !== event.target &&
        !menuButtonRef.current?.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    };

    // Add scroll listener for header styling
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 20);
    };

    // Initialize scroll state
    handleScroll();

    // Set up event listeners
    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Remove event listeners on cleanup
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [menuOpen]);

  // Close menu on escape key
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape' && menuOpen) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [menuOpen]);

  // Prevent body scroll when menu is open on mobile
  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }

    // Cleanup on unmount
    return () => {
      document.body.classList.remove('menu-open');
    };
  }, [menuOpen]);

  const toggleMenu = () => {
    setMenuOpen(prevState => !prevState);
  };

  return (
    <header
      ref={headerRef}
      className={`header ${isScrolled ? 'scrolled' : ''} ${menuOpen ? 'menu-active' : ''}`}
    >
      <div className="header-container">
        <div className="logo">
          <a href="/" aria-label="AI Content Pro Home">
            AI Content Pro
          </a>
        </div>

        <button
          ref={menuButtonRef}
          className={`menu-toggle ${menuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-expanded={menuOpen}
          aria-controls="main-menu"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          <span className="menu-icon" aria-hidden="true"></span>
        </button>

        <nav
          id="main-menu"
          className={`main-nav ${menuOpen ? 'open' : ''}`}
          aria-label="Main navigation"
        >
          <ul>
            <li>
              <a href="#features" onClick={() => setMenuOpen(false)}>
                Features
              </a>
            </li>
            <li>
              <a href="#pricing" onClick={() => setMenuOpen(false)}>
                Pricing
              </a>
            </li>
            <li>
              <a href="#examples" onClick={() => setMenuOpen(false)}>
                Examples
              </a>
            </li>
            <li>
              <a href="/blog" onClick={() => setMenuOpen(false)}>
                Blog
              </a>
            </li>
            <li className="mobile-only">
              <a href="/login" onClick={() => setMenuOpen(false)}>
                Log In
              </a>
            </li>
            <li className="mobile-only">
              <a href="/signup" onClick={() => setMenuOpen(false)}>
                Sign Up
              </a>
            </li>
          </ul>
        </nav>

        <div className="header-actions">
          <a href="/login" className="login-link">
            Log In
          </a>
          <Button variant="primary" size="small" onClick={() => window.location.href = '/signup'}>
            Sign Up Free
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
