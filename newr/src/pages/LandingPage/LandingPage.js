import React from 'react';
import Header from '../../components/Header/Header';
import Hero from '../../components/Hero/Hero';
import Features from '../../components/Features/Features';
import AIExamples from '../../components/AIExamples/AIExamples';
import CallToAction from '../../components/CallToAction/CallToAction';
import Footer from '../../components/Footer/Footer';
import Container from '../../components/common/Container/Container';
import './LandingPage.css';

/**
 * LandingPage - Main component for the Generative AI landing page
 * Organizes all section components in the correct order
 */
const LandingPage = () => {
  return (
    <div className="landing-page">
      <Header />

      <main>
        <Hero />

        <Container>
          <Features />
        </Container>

        <Container className="alternate-bg">
          <AIExamples />
        </Container>

        <Container>
          <CallToAction />
        </Container>
      </main>

      <Footer />
    </div>
  );
};

export default LandingPage;
