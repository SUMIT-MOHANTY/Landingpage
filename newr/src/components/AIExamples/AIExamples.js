import React, { useState } from 'react';
import './AIExamples.css';

/**
 * AIExamples - Component to showcase AI generation examples
 * Displays various examples of AI-generated content with interactive elements
 */
const AIExamples = () => {
  const [activeExample, setActiveExample] = useState(0);

  const examples = [
    {
      id: 1,
      title: "Text Generation",
      description: "AI models can generate human-like text for various applications.",
      demoContent: "This paragraph was written by an AI language model trained on diverse text data. It can create content for blogs, stories, reports, and more based on given prompts or context.",
      imageUrl: "/assets/images/text-generation-example.jpg"
    },
    {
      id: 2,
      title: "Image Creation",
      description: "Generative AI can create stunning images from text descriptions.",
      demoContent: "Enter a prompt like 'sunset over mountains with a lake reflection' and watch AI generate a beautiful image matching that description.",
      imageUrl: "/assets/images/image-generation-example.jpg"
    },
    {
      id: 3,
      title: "Code Assistance",
      description: "AI can help developers write and debug code more efficiently.",
      demoContent: "AI code assistants can suggest code completions, fix bugs, and even explain code functionality to improve developer productivity.",
      imageUrl: "/assets/images/code-generation-example.jpg"
    }
  ];

  return (
    <section id="ai-examples" className="ai-examples-section">
      <h2>See AI in Action</h2>
      <p className="section-intro">
        Explore real examples of what generative AI can create:
      </p>

      <div className="examples-navigation">
        {examples.map((example, index) => (
          <button
            key={example.id}
            className={`example-nav-button ${index === activeExample ? 'active' : ''}`}
            onClick={() => setActiveExample(index)}
          >
            {example.title}
          </button>
        ))}
      </div>

      <div className="example-showcase">
        <div className="example-content">
          <h3>{examples[activeExample].title}</h3>
          <p>{examples[activeExample].description}</p>
          <div className="demo-content">
            {examples[activeExample].demoContent}
          </div>
        </div>
        <div className="example-visual">
          <img
            src={examples[activeExample].imageUrl}
            alt={examples[activeExample].title}
            className="example-image"
          />
        </div>
      </div>
    </section>
  );
};

export default AIExamples;
