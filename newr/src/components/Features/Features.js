import React from 'react';
import Container from '../common/Container/Container';
import './Features.css';

// Define features with fallback images for cross-browser compatibility
const featuresList = [
  {
    id: 'ai-writing',
    title: 'AI-Powered Content Writing',
    description: 'Create high-quality articles, blog posts, and marketing copy in seconds with advanced AI technology.',
    icon: '/assets/icons/writing.svg',
    fallbackIcon: '/assets/icons/writing.png'
  },
  {
    id: 'multi-language',
    title: 'Multi-Language Support',
    description: 'Generate and translate content across 50+ languages to reach global audiences effortlessly.',
    icon: '/assets/icons/globe.svg',
    fallbackIcon: '/assets/icons/globe.png'
  },
  {
    id: 'seo-optimization',
    title: 'SEO Optimization',
    description: 'AI tools analyze and enhance your content for better search engine rankings and visibility.',
    icon: '/assets/icons/seo.svg',
    fallbackIcon: '/assets/icons/seo.png'
  },
  {
    id: 'plagiarism',
    title: 'Plagiarism Detection',
    description: 'Ensure your content is 100% original with built-in plagiarism checking against billions of web pages.',
    icon: '/assets/icons/check.svg',
    fallbackIcon: '/assets/icons/check.png'
  },
  {
    id: 'templates',
    title: 'Customizable Templates',
    description: 'Choose from hundreds of pre-designed templates for various content types and industries.',
    icon: '/assets/icons/template.svg',
    fallbackIcon: '/assets/icons/template.png'
  },
  {
    id: 'analytics',
    title: 'Content Performance Analytics',
    description: 'Track how your content performs with comprehensive analytics and improvement suggestions.',
    icon: '/assets/icons/chart.svg',
    fallbackIcon: '/assets/icons/chart.png'
  }
];

const Features = () => {
  // Handle SVG loading errors by switching to PNG fallback
  const handleIconError = (e) => {
    const target = e.target;
    if (target.dataset.fallback) {
      target.src = target.dataset.fallback;
      target.onerror = null; // Prevent infinite error loop
    }
  };

  return (
    <Container className="features" background="light">
      <div className="features-heading">
        <h2 id="features-title">Powerful AI Content Features</h2>
        <p>Our platform offers everything you need to create amazing content</p>
      </div>

      <div
        className="features-grid"
        role="list"
        aria-labelledby="features-title"
      >
        {featuresList.map((feature) => (
          <div
            key={feature.id}
            className="feature-card"
            role="listitem"
          >
            <div className="feature-icon">
              <img
                src={feature.icon}
                alt=""
                aria-hidden="true"
                data-fallback={feature.fallbackIcon}
                onError={handleIconError}
              />
            </div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default Features;
