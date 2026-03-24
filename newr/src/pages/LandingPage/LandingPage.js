import React, { useState, useEffect, useRef } from 'react';
import Header from '../../components/Header/Header';
import Hero from '../../components/Hero/Hero';
import Features from '../../components/Features/Features';
import AIExamples from '../../components/AIExamples/AIExamples';
import CallToAction from '../../components/CallToAction/CallToAction';
import Footer from '../../components/Footer/Footer';
import './LandingPage.css';

const LandingPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [screenSize, setScreenSize] = useState('desktop');
  const sectionsRef = useRef([]);

  // Detect screen size for responsive optimizations
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width <= 768) {
        setScreenSize('mobile');
      } else if (width <= 1024) {
        setScreenSize('tablet');
      } else {
        setScreenSize('desktop');
      }
    };

    // Set initial size
    handleResize();

    // Add event listener with debouncing for performance
    let resizeTimer;
    const debouncedResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(handleResize, 100);
    };

    window.addEventListener('resize', debouncedResize);

    // Mark as loaded after a small delay for any animations
    const timer = setTimeout(() => setIsLoaded(true), 300);

    return () => {
      window.removeEventListener('resize', debouncedResize);
      clearTimeout(timer);
      clearTimeout(resizeTimer);
    };
  }, []);

  // Implement intersection observer for performance optimization
  useEffect(() => {
    if (!('IntersectionObserver' in window)) {
      // Fallback for browsers that don't support IntersectionObserver
      setIsLoaded(true);
      return;
    }

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    // Observe all section elements
    const sections = document.querySelectorAll('.landing-section');
    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, [isLoaded]);

  return (
    <div className={`landing-page ${isLoaded ? 'loaded' : ''} ${screenSize}`}>
      <Header />
      <main>
        <section className="landing-section hero-section">
          <Hero />
        </section>

        <section className="landing-section features-section">
          <Features />
        </section>

        <section className="landing-section examples-section">
          <AIExamples />
        </section>

        <section className="landing-section cta-section">
          <CallToAction />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
