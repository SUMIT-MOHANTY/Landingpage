import React, { useState, useEffect } from 'react';
import Button from '../common/Button/Button';
import './Header.css';

/**
 * Header - Site header component with navigation
 * Includes responsive mobile menu and scroll behavior
 */
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Handle menu toggle
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);

    // Prevent body scroll when menu is open
    if (!isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  // Handle navigation click
  const handleNavClick = (e, sectionId) => {
    e.preventDefault();

    // Close menu if open
    if (isMenuOpen) {
      setIsMenuOpen(false);
      document.body.style.overflow = 'auto';
    }

    // Smooth scroll to section
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`site-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        <div className="logo">
          <a href="/" className="logo-link">
            <span className="logo-text">Generative AI</span>
          </a>
        </div>

        <nav className={`main-nav ${isMenuOpen ? 'menu-open' : ''}`}>
          <ul className="nav-list">
            <li className="nav-item">
              <a
                href="#features"
                className="nav-link"
                onClick={(e) => handleNavClick(e, 'features')}
              >
                Features
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#ai-examples"
                className="nav-link"
                onClick={(e) => handleNavClick(e, 'ai-examples')}
              >
                Examples
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#pricing"
                className="nav-link"
                onClick={(e) => handleNavClick(e, 'pricing')}
              >
                Pricing
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#faq"
                className="nav-link"
                onClick={(e) => handleNavClick(e, 'faq')}
              >
                FAQ
              </a>
            </li>
          </ul>

          <div className="nav-auth">
            <Button variant="text" size="medium">Sign In</Button>
            <Button variant="primary" size="medium">Get Started</Button>
          </div>
        </nav>

        <button
          className={`menu-toggle ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation menu"
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>
      </div>
    </header>
  );
};

export default Header;
