import React from 'react';
import Header from '../components/Header/Header';
import Hero from '../components/Hero/Hero';
import Features from '../components/Features/Features';
import Pricing from '../components/Pricing/Pricing';
import Testimonials from '../components/Testimonials/Testimonials';
import CallToAction from '../components/CallToAction/CallToAction';
import Footer from '../components/Footer/Footer';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <Header />
      <Hero
        title="Transform Your Productivity"
        subtitle="Our AI-powered platform helps you focus on what matters most."
        ctaText="Get Started"
        ctaLink="/signup"
        imageUrl="/images/hero-image.svg"
      />
      <Features />
      <Testimonials />
      <Pricing />
      <CallToAction
        title="Ready to boost your productivity?"
        description="Join thousands of satisfied customers who have transformed their workflow."
        buttonText="Start Free Trial"
        buttonLink="/signup"
      />
      <Footer />
    </div>
  );
};

export default LandingPage;
