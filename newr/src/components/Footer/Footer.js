import React from 'react';
import Container from '../common/Container/Container';
import './Footer.css';

/**
 * Accessible and responsive footer component
 * @returns {React.ReactElement} - Rendered footer
 */
const Footer = () => {
  // Get current year for copyright
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer" role="contentinfo">
      <Container>
        <div className="footer__content">
          <div className="footer__brand">
            <a href="/" aria-label="GenAI Platform homepage">
              <span className="footer__logo">GenAI Platform</span>
            </a>
            <p className="footer__tagline">
              Transforming workflows with the power of artificial intelligence
            </p>
          </div>

          <nav className="footer__navigation" aria-label="Footer Navigation">
            <div className="footer__nav-group">
              <h3 className="footer__nav-title">Product</h3>
              <ul className="footer__nav-list">
                <li><a href="/features" className="footer__nav-link">Features</a></li>
                <li><a href="/pricing" className="footer__nav-link">Pricing</a></li>
                <li><a href="/integrations" className="footer__nav-link">Integrations</a></li>
                <li><a href="/roadmap" className="footer__nav-link">Roadmap</a></li>
              </ul>
            </div>

            <div className="footer__nav-group">
              <h3 className="footer__nav-title">Resources</h3>
              <ul className="footer__nav-list">
                <li><a href="/docs" className="footer__nav-link">Documentation</a></li>
                <li><a href="/api" className="footer__nav-link">API Reference</a></li>
                <li><a href="/guides" className="footer__nav-link">Guides</a></li>
                <li><a href="/blog" className="footer__nav-link">Blog</a></li>
              </ul>
            </div>

            <div className="footer__nav-group">
              <h3 className="footer__nav-title">Company</h3>
              <ul className="footer__nav-list">
                <li><a href="/about" className="footer__nav-link">About Us</a></li>
                <li><a href="/careers" className="footer__nav-link">Careers</a></li>
                <li><a href="/contact" className="footer__nav-link">Contact</a></li>
                <li><a href="/press" className="footer__nav-link">Press</a></li>
              </ul>
            </div>

            <div className="footer__nav-group">
              <h3 className="footer__nav-title">Legal</h3>
              <ul className="footer__nav-list">
                <li><a href="/terms" className="footer__nav-link">Terms of Service</a></li>
                <li><a href="/privacy" className="footer__nav-link">Privacy Policy</a></li>
                <li><a href="/security" className="footer__nav-link">Security</a></li>
                <li><a href="/accessibility" className="footer__nav-link">Accessibility</a></li>
              </ul>
            </div>
          </nav>
        </div>

        <div className="footer__bottom">
          <div className="footer__social">
            <a href="https://twitter.com/genaiplatform" className="footer__social-link" aria-label="Twitter">
              <span className="icon icon-twitter" aria-hidden="true"></span>
            </a>
            <a href="https://linkedin.com/company/genaiplatform" className="footer__social-link" aria-label="LinkedIn">
              <span className="icon icon-linkedin" aria-hidden="true"></span>
            </a>
            <a href="https://github.com/genaiplatform" className="footer__social-link" aria-label="GitHub">
              <span className="icon icon-github" aria-hidden="true"></span>
            </a>
            <a href="https://youtube.com/c/genaiplatform" className="footer__social-link" aria-label="YouTube">
              <span className="icon icon-youtube" aria-hidden="true"></span>
            </a>
          </div>

          <p className="footer__copyright">
            &copy; {currentYear} GenAI Platform. All rights reserved.
          </p>

          <div className="footer__accessibility">
            <a href="/accessibility" className="footer__accessibility-link">
              Accessibility Statement
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
