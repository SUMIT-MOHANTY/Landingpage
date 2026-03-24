import React from 'react';
import Button from '../common/Button/Button';
import './Hero.css';

/**
 * Hero - Main hero section of the landing page
 * Features headline, subheadline, CTA buttons and visual element
 */
const Hero = () => {
  return (
    <section className="hero-section">
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="highlight">Generative AI</span> That Transforms Ideas Into Reality
          </h1>

          <p className="hero-subtitle">
            Harness the power of advanced artificial intelligence to create stunning content,
            generate creative solutions, and streamline your workflow with our intuitive platform.
          </p>

          <div className="hero-cta">
            <Button variant="primary" size="large">
              Start Creating Free
            </Button>
            <Button variant="outline" size="large">
              View Demo
            </Button>
          </div>

          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">10M+</span>
              <span className="stat-label">Creations Generated</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">50K+</span>
              <span className="stat-label">Active Users</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">99.9%</span>
              <span className="stat-label">Uptime</span>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-image-container">
            <img
              src="/assets/images/ai-generation-visual.svg"
              alt="AI Generation Visualization"
              className="hero-image"
            />

            <div className="floating-badge top-left">
              <span className="badge-icon"></span>
              <span className="badge-text">Smart Analysis</span>
            </div>

            <div className="floating-badge bottom-right">
              <span className="badge-icon"></span>
              <span className="badge-text">Instant Results</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
