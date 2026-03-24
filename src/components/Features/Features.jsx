import React from 'react';
import './Features.css';

const Features = () => {
  const featuresList = [
    {
      id: 1,
      title: "Natural Language Processing",
      description: "Advanced NLP capabilities to understand and generate human language with remarkable accuracy.",
      icon: ""
    },
    {
      id: 2,
      title: "Image Generation",
      description: "Create stunning, realistic images from text descriptions with our state-of-the-art diffusion models.",
      icon: ""
    },
    {
      id: 3,
      title: "Code Assistance",
      description: "Get intelligent code suggestions, auto-completion, and bug detection across multiple programming languages.",
      icon: ""
    },
    {
      id: 4,
      title: "Content Creation",
      description: "Generate blog posts, marketing copy, creative stories, and more with customizable tone and style.",
      icon: ""
    },
    {
      id: 5,
      title: "Audio Processing",
      description: "Convert speech to text, text to speech, and create natural sounding voices for various applications.",
      icon: ""
    },
    {
      id: 6,
      title: "Multimodal Learning",
      description: "Combine text, images, and audio inputs to create rich, context-aware generative outputs.",
      icon: ""
    }
  ];

  return (
    <section id="features" className="features-section">
      <div className="container">
        <h2 className="section-title">Powerful GenAI Features</h2>
        <p className="section-subtitle">
          Discover the cutting-edge capabilities of our generative AI platform
        </p>

        <div className="features-grid">
          {featuresList.map((feature) => (
            <div key={feature.id} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
