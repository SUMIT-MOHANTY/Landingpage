import React, { useState } from 'react';
import Container from '../common/Container/Container';
import Button from '../common/Button/Button';
import './AIExamples.css';

/**
 * AIExamples component showcasing AI capabilities with accessible tabs
 * @returns {React.ReactElement} - Rendered AI examples section
 */
const AIExamples = () => {
  const [activeTab, setActiveTab] = useState('text');

  // Example categories with accessibility support
  const examples = {
    text: {
      id: 'text-generation',
      title: 'Text Generation',
      description: 'Generate creative content, summaries, and professional writing with our advanced language models.',
      items: [
        { title: 'Content Writing', description: 'Create blog posts, articles, and marketing copy in seconds.' },
        { title: 'Summary Generation', description: 'Condense large documents into concise summaries.' },
        { title: 'Creative Writing', description: 'Generate stories, poems, and creative concepts.' }
      ]
    },
    image: {
      id: 'image-creation',
      title: 'Image Creation',
      description: 'Transform text prompts into stunning visuals for various creative and professional needs.',
      items: [
        { title: 'Art Generation', description: 'Create digital artwork in various styles and mediums.' },
        { title: 'Product Visualization', description: 'Generate product mock-ups from descriptions.' },
        { title: 'Design Assets', description: 'Create UI components, icons, and design elements.' }
      ]
    },
    code: {
      id: 'code-generation',
      title: 'Code Generation',
      description: 'Get assistance with coding tasks across multiple programming languages and frameworks.',
      items: [
        { title: 'Function Generation', description: 'Generate functions based on requirements.' },
        { title: 'Debugging Assistance', description: 'Find and fix bugs in your code.' },
        { title: 'Documentation', description: 'Auto-generate code documentation.' }
      ]
    }
  };

  // Handle tab selection with keyboard navigation
  const handleTabSelection = (tabId) => {
    setActiveTab(tabId);
    // Announce tab change to screen readers
    const liveRegion = document.getElementById('tab-change-announcement');
    if (liveRegion) {
      liveRegion.textContent = `${examples[tabId].title} tab selected`;
    }
  };

  // Handle keyboard navigation for tabs
  const handleTabKeyDown = (event, tabId) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleTabSelection(tabId);
    }
  };

  return (
    <section id="examples" className="ai-examples" aria-labelledby="examples-heading">
      <Container>
        <h2 id="examples-heading" className="ai-examples__title">
          See AI in Action
        </h2>
        <p className="ai-examples__subtitle">
          Explore examples of how our AI can transform your workflows and creative processes.
        </p>

        {/* ARIA live region for announcing tab changes */}
        <div
          id="tab-change-announcement"
          className="sr-only"
          aria-live="polite"
          aria-atomic="true"
        ></div>

        {/* Accessible tab navigation */}
        <div className="ai-examples__tabs" role="tablist" aria-label="AI capability examples">
          {Object.keys(examples).map((tabId) => (
            <button
              key={tabId}
              id={`tab-${tabId}`}
              className={`ai-examples__tab ${activeTab === tabId ? 'ai-examples__tab--active' : ''}`}
              onClick={() => handleTabSelection(tabId)}
              onKeyDown={(e) => handleTabKeyDown(e, tabId)}
              role="tab"
              aria-selected={activeTab === tabId}
              aria-controls={`panel-${tabId}`}
              tabIndex={activeTab === tabId ? 0 : -1}
            >
              {examples[tabId].title}
            </button>
          ))}
        </div>

        {/* Tab content panels */}
        {Object.keys(examples).map((tabId) => (
          <div
            key={tabId}
            id={`panel-${tabId}`}
            className={`ai-examples__panel ${activeTab === tabId ? 'ai-examples__panel--active' : ''}`}
            role="tabpanel"
            aria-labelledby={`tab-${tabId}`}
            tabIndex="0"
            hidden={activeTab !== tabId}
          >
            <div className="ai-examples__content">
              <div className="ai-examples__description">
                <h3>{examples[tabId].title}</h3>
                <p>{examples[tabId].description}</p>
                <ul className="ai-examples__list">
                  {examples[tabId].items.map((item, index) => (
                    <li key={index} className="ai-examples__item">
                      <strong>{item.title}:</strong> {item.description}
                    </li>
                  ))}
                </ul>
                <Button
                  variant="primary"
                  onClick={() => window.location.href = `/examples/${examples[tabId].id}`}
                  aria-label={`View all ${examples[tabId].title} examples`}
                >
                  View All Examples
                </Button>
              </div>
              <div className="ai-examples__preview" aria-hidden="true">
                {/* Placeholder for example preview image */}
                <div className="ai-examples__image-placeholder">
                  <span>{examples[tabId].title} Preview</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Container>
    </section>
  );
};

export default AIExamples;
