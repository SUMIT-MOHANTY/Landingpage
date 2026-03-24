import React from 'react';
import Container from '../common/Container/Container';
import Button from '../common/Button/Button';
import './CallToAction.css';

/**
 * Call to Action section with accessible form elements
 * @returns {React.ReactElement} - Rendered CTA section
 */
const CallToAction = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Form handling logic would go here

    // Accessibility: Announce success to screen readers
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'assertive');
    announcement.classList.add('sr-only');
    announcement.textContent = 'Form submitted successfully. We will contact you soon.';
    document.body.appendChild(announcement);

    // Remove announcement after it's read
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 3000);
  };

  return (
    <section className="cta" aria-labelledby="cta-heading">
      <Container>
        <div className="cta__container">
          <div className="cta__content">
            <h2 id="cta-heading" className="cta__title">Ready to Transform Your Work?</h2>
            <p className="cta__description">
              Start using our AI platform today and experience the future of productivity.
              Sign up for a free trial with no credit card required.
            </p>
          </div>

          <div className="cta__form-container">
            <form onSubmit={handleSubmit} className="cta__form" aria-labelledby="form-heading">
              <h3 id="form-heading" className="cta__form-title">Start Your Free Trial</h3>

              <div className="form-group">
                <label htmlFor="email" className="form-label">Email Address</label>
                <input
                  type="email"
                  id="email"
                  className="form-input"
                  placeholder="your@email.com"
                  aria-required="true"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="company" className="form-label">Company Name</label>
                <input
                  type="text"
                  id="company"
                  className="form-input"
                  placeholder="Your Company"
                  aria-required="true"
                  required
                />
              </div>

              <div className="form-group form-checkbox">
                <input
                  type="checkbox"
                  id="terms"
                  className="form-checkbox__input"
                  aria-required="true"
                  required
                />
                <label htmlFor="terms" className="form-checkbox__label">
                  I agree to the <a href="/terms" className="form-link">Terms of Service</a> and <a href="/privacy" className="form-link">Privacy Policy</a>
                </label>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                isFullWidth={true}
                aria-label="Start your free 14-day trial"
              >
                Start Your 14-Day Free Trial
              </Button>

              <p className="cta__form-note">
                <small>No credit card required. Cancel anytime.</small>
              </p>
            </form>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default CallToAction;
