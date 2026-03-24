import React from 'react';
import Container from '../common/Container/Container';
import './Features.css';

/**
 * Features section with responsive grid and accessibility features
 * @returns {React.ReactElement} - Rendered features section
 */
const Features = () => {
  // Features data with accessibility descriptions
  const features = [
    {
      id: 'natural-language',
      icon: 'chat',
      title: 'Natural Language Processing',
      description: 'Process and understand human language for content generation, sentiment analysis, and more.',
      ariaLabel: 'Feature: Natural Language Processing'
    },
    {
      id: 'image-gen',
      icon: 'image',
      title: 'Image Generation',
      description: 'Create stunning visuals, artwork, and design assets from text descriptions.',
      ariaLabel: 'Feature: Image Generation'
    },
    {
      id: 'code-assist',
      icon: 'code',
      title: 'Code Assistance',
      description: 'Get help with coding tasks, debugging, and optimization for multiple programming languages.',
      ariaLabel: 'Feature: Code Assistance'
    },
    {
      id: 'data-analysis',
      icon: 'chart',
      title: 'Data Analysis',
      description: 'Extract insights and patterns from complex datasets with AI-powered analytics.',
      ariaLabel: 'Feature: Data Analysis'
    },
    {
      id: 'automation',
      icon: 'automation',
      title: 'Workflow Automation',
      description: 'Automate repetitive tasks and streamline workflows with intelligent process automation.',
      ariaLabel: 'Feature: Workflow Automation'
    },
    {
      id: 'personalization',
      icon: 'person',
      title: 'Personalization Engine',
      description: 'Deliver tailored experiences to users based on their preferences and behaviors.',
      ariaLabel: 'Feature: Personalization Engine'
    }
  ];

  return (
    <section id="features" className="features" aria-labelledby="features-heading">
      <Container>
        <div className="features__header">
          <h2 id="features-heading" className="features__title">
            Powerful Features for Every Need
          </h2>
          <p className="features__subtitle">
            Our platform offers a comprehensive suite of AI tools to handle diverse tasks
            across multiple domains.
          </p>
        </div>

        {/* Features grid with responsive layout */}
        <div className="features__grid">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="feature-card"
              aria-labelledby={`feature-title-${feature.id}`}
            >
              <div className="feature-card__icon" aria-hidden="true">
                <span className={`icon icon-${feature.icon}`}></span>
              </div>
              <h3 id={`feature-title-${feature.id}`} className="feature-card__title">
                {feature.title}
              </h3>
              <p className="feature-card__description">
                {feature.description}
              </p>
              <a
                href={`/features/${feature.id}`}
                className="feature-card__link"
                aria-label={`Learn more about ${feature.title}`}
              >
                Learn more
                <span aria-hidden="true"> -></span>
              </a>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Features;
