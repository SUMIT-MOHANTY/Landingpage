import React, { useState, useEffect } from 'react';
import Container from '../common/Container/Container';
import Button from '../common/Button/Button';
import './Hero.css';

const Hero = () => {
  const [currentWord, setCurrentWord] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Words to animate through in the hero headline
  const dynamicWords = ['Blogs', 'Emails', 'Ads', 'Reports', 'Stories'];

  // Detect if hero is in viewport for animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Set visibility based on intersection
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    // Fallback for browsers that don't support IntersectionObserver
    if (!('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    // Target the hero element
    const heroElement = document.querySelector('.hero');
    if (heroElement) {
      observer.observe(heroElement);
    }

    return () => {
      if (heroElement) {
        observer.unobserve(heroElement);
      }
    };
  }, []);

  // Dynamic word rotation animation
  useEffect(() => {
    // Only start animation if hero is visible
    if (!isVisible) return;

    const rotateWords = () => {
      setIsAnimating(true);

      // After animation out completes
      const timeout1 = setTimeout(() => {
        setCurrentWord((prevWord) => (prevWord + 1) % dynamicWords.length);

        // After changing word, start animation in
        const timeout2 = setTimeout(() => {
          setIsAnimating(false);
        }, 100);

        return () => clearTimeout(timeout2);
      }, 500);

      return () => clearTimeout(timeout1);
    };

    // Set up interval for word rotation
    const interval = setInterval(rotateWords, 3000);

    return () => clearInterval(interval);
  }, [isVisible, dynamicWords.length]);

  return (
    <Container className="hero">
      <div className={`hero-content ${isVisible ? 'visible' : ''}`}>
        <h1>
          AI-Powered Content Creation for Amazing{' '}
          <span className="dynamic-text-container">
            <span
              className={`dynamic-text ${isAnimating ? 'animating' : ''}`}
              aria-live="polite"
            >
              {dynamicWords[currentWord]}
            </span>
          </span>
        </h1>

        <p className="hero-description">
          Create professional content 10x faster with our advanced AI writing platform.
          Get high-quality, SEO-optimized content for any need in seconds.
        </p>

        <div className="hero-actions">
          <Button variant="primary" size="large" onClick={() => window.location.href = '/signup'}>
            Get Started Free
          </Button>
          <Button variant="secondary" size="large" onClick={() => window.location.href = '/demo'}>
            Watch Demo
          </Button>
        </div>

        <div className="hero-trust">
          <p>Trusted by 10,000+ content creators worldwide</p>
          <div className="trust-logos">
            {/* Use picture element for better browser compatibility */}
            <picture>
              <source srcSet="/assets/images/trust-logos.webp" type="image/webp" />
              <source srcSet="/assets/images/trust-logos.png" type="image/png" />
              <img
                src="/assets/images/trust-logos.png"
                alt="Companies that trust our platform"
                loading="lazy"
              />
            </picture>
          </div>
        </div>
      </div>

      <div className={`hero-image ${isVisible ? 'visible' : ''}`}>
        {/* Use picture element for better browser compatibility */}
        <picture>
          <source
            srcSet="/assets/images/hero-image.webp"
            type="image/webp"
            media="(min-width: 768px)"
          />
          <source
            srcSet="/assets/images/hero-image-mobile.webp"
            type="image/webp"
            media="(max-width: 767px)"
          />
          <source
            srcSet="/assets/images/hero-image.png"
            type="image/png"
            media="(min-width: 768px)"
          />
          <source
            srcSet="/assets/images/hero-image-mobile.png"
            type="image/png"
            media="(max-width: 767px)"
          />
          <img
            src="/assets/images/hero-image.png"
            alt="AI content creation platform interface"
            loading="eager"
          />
        </picture>
      </div>
    </Container>
  );
};

export default Hero;
