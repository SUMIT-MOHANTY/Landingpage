import React from 'react';
import Features from '../Features';
import AIExamples from '../AIExamples';
import './GenAIContent.css';

const GenAIContent = () => {
  return (
    <div className="genai-content">
      <Features />
      <div className="content-divider">
        <div className="divider-line"></div>
      </div>
      <AIExamples />
    </div>
  );
};

export default GenAIContent;
