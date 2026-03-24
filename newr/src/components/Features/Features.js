import React from 'react';
import './Features.css';

/**
 * Features - Component to display the key features of the AI platform
 * Showcases benefits and capabilities in a visually appealing grid
 */
const Features = () => {
  const featuresList = [
    {
      id: 1,
      icon: '',
      title: 'Smart Content Creation',
      description: 'Generate high-quality text content for blogs, social media, emails, and more with AI that understands your brand voice.'
    },
    {
      id: 2,
      icon: '',
      title: 'Visual Generation',
      description: 'Create stunning images, graphics, and designs from simple text descriptions in seconds.'
    },
    {
      id: 3,
      icon: '',
      title: 'Advanced Learning',
      description: 'Our AI continuously improves by learning from interactions, becoming more personalized to your specific needs.'
    },
    {
      id: 4,
      icon: '',
      title: 'Instant Responses',
      description: 'Get real-time AI-generated content with minimal latency, allowing for seamless workflow integration.'
    },
    {
      id: 5,
      icon: '',
      title: 'Customizable Outputs',
      description: 'Fine-tune AI outputs with adjustable parameters for tone, style, length, and complexity.'
    },
    {
      id: 6,
      icon: '',
      title: 'Data Privacy Focus',
      description: 'Enterprise-grade security ensures your data and AI interactions remain confidential and protected.'
    }
  ];

  return (
    <section id="features" className="features-section">
      <h2>Powerful AI Features</h2>
      <p className="section-intro">
        Our generative AI platform empowers your creativity and productivity with these cutting-edge capabilities:
      </p>

      <div className="features-grid">
        {featuresList.map(feature => (
          <div key={feature.id} className="feature-card">
            <div className="feature-icon">{feature.icon}</div>
            <h3 className="feature-title">{feature.title}</h3>
            <p className="feature-description">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
