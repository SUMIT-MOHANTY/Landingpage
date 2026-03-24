import React from 'react';
import Hero from '../Hero';
import Features from '../Features';
import AIExamples from '../AIExamples';
import './MainContent.css';

const MainContent = () => {
  return (
    <main className="main-content">
      <Hero />
      <Features />
      <AIExamples />
    </main>
  );
};

export default MainContent;
