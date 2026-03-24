import React, { useEffect } from 'react';
import Header from '../../components/Header/Header';
import Hero from '../../components/Hero/Hero';
import Features from '../../components/Features/Features';
import AIExamples from '../../components/AIExamples/AIExamples';
import CallToAction from '../../components/CallToAction/CallToAction';
import Footer from '../../components/Footer/Footer';
import './LandingPage.css';
import { announceForScreenReader } from '../../utils/helpers';

/**
 * Main landing page component integrating all sections
 * @returns {React.ReactElement} - Rendered landing page
 */
const LandingPage = () => {
  // Announce page load to screen readers
  useEffect(() => {
    announceForScreenReader('Generative AI landing page loaded', 'polite');
  }, []);

  return (
    <>
      <Header />
      <main id="main-content" className="landing-page">
        <Hero />
        <Features />
        <AIExamples />
        <CallToAction />
      </main>
      <Footer />
    </>
  );
};

export default LandingPage;
