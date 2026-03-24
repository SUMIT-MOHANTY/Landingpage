import React from 'react';
import Hero from '../Hero/Hero';
import Features from '../Features/Features';
import Pricing from '../Pricing/Pricing';
import Testimonials from '../Testimonials/Testimonials';
import CallToAction from '../CallToAction/CallToAction';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <Hero
        title="Streamline Your Workflow"
        subtitle="The all-in-one platform for modern teams to collaborate, communicate, and deliver"
        ctaText="Get Started"
        ctaLink="/signup"
        imageUrl="/assets/images/hero-image.png"
      />

      <Features />

      <Testimonials />

      <Pricing />

      <CallToAction
        title="Ready to transform your workflow?"
        description="Join thousands of teams who have already streamlined their processes."
        buttonText="Start Free Trial"
        buttonLink="/signup"
      />
    </div>
  );
};

export default LandingPage;
