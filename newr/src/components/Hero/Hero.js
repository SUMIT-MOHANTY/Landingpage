import React from 'react';
import Container from '../common/Container/Container';
import Button from '../common/Button/Button';
import './Hero.css';

/**
 * Hero section component with responsive design and accessibility features
 * @returns {React.ReactElement} - Rendered hero section
 */
const Hero = () => {
  return (
    <section className="hero" aria-labelledby="hero-heading">
      <Container size="wide" className="hero__container">
        <div className="hero__content">
          <h1 id="hero-heading" className="hero__title">
            Transform Your Workflow with Generative AI
          </h1>
          <p className="hero__subtitle">
            Harness the power of artificial intelligence to streamline your processes,
            boost creativity, and solve complex problems.
          </p>
          <div className="hero__actions">
            <Button
              variant="primary"
              size="lg"
              onClick={() => window.location.href = '/demo'}
              aria-label="Try free demo"
            >
              Try Free Demo
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => window.location.href = '/learn-more'}
              aria-label="Learn more about our platform"
            >
              Learn More
            </Button>
          </div>
        </div>

        <div className="hero__image" aria-hidden="true">
          {/* This is a decorative image, so we use aria-hidden */}
          <img
            src="/assets/images/hero-image.webp"
            alt=""
            loading="eager"
            width="600"
            height="400"
          />
          <div className="hero__image-overlay"></div>
        </div>

        {/* Stats with proper ARIA roles for screen readers */}
        <div className="hero__stats" role="region" aria-label="Platform statistics">
          <div className="hero__stat">
            <span className="hero__stat-value">10M+</span>
            <span className="hero__stat-label">Active Users</span>
          </div>
          <div className="hero__stat">
            <span className="hero__stat-value">99.9%</span>
            <span className="hero__stat-label">Uptime</span>
          </div>
          <div className="hero__stat">
            <span className="hero__stat-value">4.9/5</span>
            <span className="hero__stat-label">Customer Rating</span>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Hero;
