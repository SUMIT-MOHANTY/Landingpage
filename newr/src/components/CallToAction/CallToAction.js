import React from 'react';
import Button from '../common/Button/Button';
import './CallToAction.css';

/**
 * CallToAction - Component for the call-to-action section
 * Encourages visitors to sign up or try the AI service
 */
const CallToAction = () => {
  const handleSignUp = (e) => {
    e.preventDefault();
    // Handle signup logic - would connect to backend API in a real implementation
    alert('Sign up functionality would be implemented here');
  };

  return (
    <section id="cta" className="cta-section">
      <div className="cta-container">
        <h2>Ready to Experience the Power of AI?</h2>
        <p className="cta-description">
          Join thousands of innovators, creators, and businesses already leveraging
          our generative AI platform to transform their workflows and unlock new possibilities.
        </p>

        <form className="cta-form" onSubmit={handleSignUp}>
          <div className="form-group">
            <input
              type="email"
              placeholder="Enter your email address"
              className="email-input"
              required
              aria-label="Email Address"
            />
            <Button
              type="submit"
              variant="primary"
              size="large"
            >
              Get Started Free
            </Button>
          </div>
          <p className="form-disclaimer">
            No credit card required. Free plan includes 100 AI generations per month.
          </p>
        </form>

        <div className="cta-testimonial">
          <p className="testimonial-quote">
            "This generative AI platform has revolutionized our content creation process,
            saving us 15+ hours per week while improving quality."
          </p>
          <div className="testimonial-author">
            <img src="/assets/images/testimonial-avatar.jpg" alt="Sarah J." className="author-image" />
            <div className="author-details">
              <p className="author-name">Sarah Johnson</p>
              <p className="author-title">Creative Director, DesignCo</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
