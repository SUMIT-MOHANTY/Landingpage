import React from 'react';
import Container from '../common/Container/Container';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Dynamic link generation for better maintainability
  const footerLinks = {
    product: [
      { text: 'Features', url: '#features' },
      { text: 'Pricing', url: '/pricing' },
      { text: 'Use Cases', url: '/use-cases' },
      { text: 'Documentation', url: '/docs' }
    ],
    company: [
      { text: 'About Us', url: '/about' },
      { text: 'Careers', url: '/careers' },
      { text: 'Blog', url: '/blog' },
      { text: 'Contact', url: '/contact' }
    ],
    legal: [
      { text: 'Privacy Policy', url: '/privacy' },
      { text: 'Terms of Service', url: '/terms' },
      { text: 'Cookie Policy', url: '/cookies' },
      { text: 'GDPR', url: '/gdpr' }
    ],
    social: [
      { text: 'Twitter', url: 'https://twitter.com/aicontentco', icon: 'twitter' },
      { text: 'LinkedIn', url: 'https://linkedin.com/company/aicontentco', icon: 'linkedin' },
      { text: 'Facebook', url: 'https://facebook.com/aicontentco', icon: 'facebook' },
      { text: 'Instagram', url: 'https://instagram.com/aicontentco', icon: 'instagram' }
    ]
  };

  // Handle external links for security
  const handleExternalLink = (e, url) => {
    // If it's an external link, add security attributes
    if (url.startsWith('http')) {
      const link = e.currentTarget;
      link.setAttribute('rel', 'noopener noreferrer');
      link.setAttribute('target', '_blank');
    }
  };

  return (
    <footer className="footer">
      <Container>
        <div className="footer-content">
          <div className="footer-brand">
            <h2>AI Content Pro</h2>
            <p>Revolutionizing content creation with artificial intelligence</p>
            <div className="footer-social">
              {footerLinks.social.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  aria-label={link.text}
                  className={`social-icon ${link.icon}`}
                  onClick={(e) => handleExternalLink(e, link.url)}
                >
                  <span className="visually-hidden">{link.text}</span>
                  <span className="icon-placeholder" aria-hidden="true">
                    {link.icon.charAt(0).toUpperCase()}
                  </span>
                </a>
              ))}
            </div>
          </div>

          <div className="footer-links-container">
            <nav className="footer-links" aria-label="Product">
              <h3>Product</h3>
              <ul>
                {footerLinks.product.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.url}
                      onClick={(e) => handleExternalLink(e, link.url)}
                    >
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <nav className="footer-links" aria-label="Company">
              <h3>Company</h3>
              <ul>
                {footerLinks.company.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.url}
                      onClick={(e) => handleExternalLink(e, link.url)}
                    >
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <nav className="footer-links" aria-label="Legal">
              <h3>Legal</h3>
              <ul>
                {footerLinks.legal.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.url}
                      onClick={(e) => handleExternalLink(e, link.url)}
                    >
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} AI Content Pro. All rights reserved.</p>
          <div className="language-selector">
            <label htmlFor="language-select" className="visually-hidden">
              Select Language
            </label>
            <select id="language-select" defaultValue="en">
              <option value="en">English</option>
              <option value="es">Espaol</option>
              <option value="fr">Franais</option>
              <option value="de">Deutsch</option>
              <option value="zh"></option>
            </select>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
