import React, { useState, useEffect, useRef } from 'react';
import Button from '../common/Button/Button';
import Container from '../common/Container/Container';
import { createFocusTrap, isMobileDevice } from '../../utils/helpers';
import './Header.css';

/**
 * Responsive and accessible header component
 * @returns {React.ReactElement} - Rendered header
 */
const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const focusTrapRef = useRef(null);

  // Close mobile menu when window is resized to desktop
  useEffect(() => {
    const handleResize = () => {
      if (!isMobileDevice() && menuOpen) {
        setMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [menuOpen]);

  // Create focus trap for mobile menu
  useEffect(() => {
    if (menuOpen && menuRef.current) {
      focusTrapRef.current = createFocusTrap(menuRef.current);
      focusTrapRef.current.activate();
    }

    return () => {
      if (focusTrapRef.current) {
        focusTrapRef.current.deactivate();
      }
    };
  }, [menuOpen]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    // Set aria-expanded attribute on menu button
    document.getElementById('menu-button').setAttribute('aria-expanded', !menuOpen);
  };

  return (
    <header className="header" role="banner">
      <Container size="default" className="header__container">
        <div className="header__logo">
          <a href="/" aria-label="Home">
            <span className="logo-text">GenAI Platform</span>
          </a>
        </div>

        {/* Mobile menu toggle button */}
        <button
          id="menu-button"
          className="header__menu-toggle"
          onClick={toggleMenu}
          aria-expanded={menuOpen}
          aria-controls="navigation-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          <span className="sr-only">{menuOpen ? "Close menu" : "Menu"}</span>
          <div className={`hamburger ${menuOpen ? 'hamburger--active' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>

        {/* Navigation menu */}
        <nav
          id="navigation-menu"
          ref={menuRef}
          className={`header__nav ${menuOpen ? 'header__nav--open' : ''}`}
          aria-label="Main Navigation"
          aria-hidden={isMobileDevice() && !menuOpen}
        >
          <ul className="header__nav-list">
            <li className="header__nav-item">
              <a href="#features" className="header__nav-link">Features</a>
            </li>
            <li className="header__nav-item">
              <a href="#examples" className="header__nav-link">Examples</a>
            </li>
            <li className="header__nav-item">
              <a href="#pricing" className="header__nav-link">Pricing</a>
            </li>
            <li className="header__nav-item">
              <a href="#docs" className="header__nav-link">Documentation</a>
            </li>
          </ul>
          <div className="header__cta">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => window.location.href = '/login'}
            >
              Log In
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => window.location.href = '/signup'}
            >
              Sign Up
            </Button>
          </div>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
