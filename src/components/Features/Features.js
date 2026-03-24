import React from 'react';
import './Features.css';

const Features = () => {
  // Features data with proper error handling for images
  const features = [
    {
      id: 1,
      title: "Text Generation",
      description: "Create human-quality text for creative writing, content creation, summarization, and more.",
      icon: "text-icon"
    },
    {
      id: 2,
      title: "Image Generation",
      description: "Transform text prompts into stunning visual content with precise control over style and composition.",
      icon: "image-icon"
    },
    {
      id: 3,
      title: "Code Assistance",
      description: "Generate code snippets, debug existing code, and get programming guidance across multiple languages.",
      icon: "code-icon"
    },
    {
      id: 4,
      title: "Conversational AI",
      description: "Build natural, contextual conversations that understand user intent and maintain coherent dialogue.",
      icon: "chat-icon"
    }
  ];

  // Error state for handling any rendering issues
  const [error, setError] = React.useState(null);

  // Safely render feature items with error boundaries
  const renderFeatureItems = () => {
    try {
      return features.map(feature => (
        <div className="feature-item" key={feature.id}>
          <div className="feature-icon">
            <div className={`icon ${feature.icon}`}></div>
          </div>
          <h3 className="feature-title">{feature.title}</h3>
          <p className="feature-description">{feature.description}</p>
        </div>
      ));
    } catch (err) {
      console.error("Error rendering features:", err);
      setError("Failed to display features. Please refresh the page.");
      return null;
    }
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <section id="features" className="features-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Generative AI Capabilities</h2>
          <p className="section-subtitle">
            Powerful AI features to transform your workflow and unleash creativity
          </p>
        </div>
        <div className="features-container">
          {renderFeatureItems()}
        </div>
      </div>
    </section>
  );
};

export default Features;
