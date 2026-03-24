import React from 'react';
import './LandingPage.css';
import Header from '../../components/Header/Header';
import Hero from '../../components/Hero/Hero';
import Features from '../../components/Features/Features';
import AIExamples from '../../components/AIExamples/AIExamples';
import CallToAction from '../../components/CallToAction/CallToAction';
import Footer from '../../components/Footer/Footer';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <Header />
      <main>
        <Hero />
        <Features />
        <AIExamples />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
