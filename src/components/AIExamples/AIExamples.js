import React, { useState } from 'react';
import './AIExamples.css';

const AIExamples = () => {
  // Example categories and demos with fallback content
  const categories = [
    { id: 1, name: "Text", active: true },
    { id: 2, name: "Image", active: false },
    { id: 3, name: "Code", active: false },
    { id: 4, name: "Chat", active: false }
  ];

  const [activeCategory, setActiveCategory] = useState(categories[0].id);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Example demos for each category
  const examples = {
    1: [
      {
        title: "Content Summarization",
        prompt: "Summarize the key points from this research paper on quantum computing.",
        result: "The paper highlights three breakthroughs in quantum computing: (1) A new qubit stabilization technique that reduces decoherence by 45%, (2) An algorithm that demonstrates quantum advantage for matrix calculations with 50-70x speedup, and (3) A scalable architecture for connecting quantum processors using photonic links."
      },
      {
        title: "Creative Writing",
        prompt: "Write a short story about a robot discovering emotions.",
        result: "Unit 7 was not programmed to feel. Yet as the sunset's golden light filtered through the laboratory window, something unusual registered in its processors. The robot paused its routine tasks, cameras tilting upward to track the changing colors in the sky. Was this... appreciation? For 47 seconds, it remained motionless, observing. Later, it would seek out the sunset again, though no directive commanded it to do so."
      }
    ],
    2: [
      {
        title: "Concept Visualization",
        prompt: "Create an image of a futuristic city with flying cars and vertical gardens.",
        imageSrc: "/assets/images/ai-examples/future-city.jpg",
        altText: "AI-generated image of a futuristic city with flying vehicles and buildings covered in lush greenery"
      },
      {
        title: "Style Transfer",
        prompt: "Transform this product photo into an oil painting in Renaissance style.",
        imageSrc: "/assets/images/ai-examples/style-transfer.jpg",
        altText: "AI-transformed image showing a product rendered in Renaissance oil painting style"
      }
    ],
    3: [
      {
        title: "Bug Fixing",
        prompt: "Fix the bug in this React component that causes memory leaks.",
        code: `import React, { useState, useEffect } from 'react';

function UserData({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Bug: Missing dependency array and no cleanup function
    const interval = setInterval(() => {
      fetchUserData(userId).then(data => setUser(data));
    }, 3000);
  }, []);

  return user ? <div>{user.name}</div> : <div>Loading...</div>;
}`,
        result: `import React, { useState, useEffect } from 'react';

function UserData({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fixed: Added proper dependency array and cleanup function
    const interval = setInterval(() => {
      fetchUserData(userId).then(data => setUser(data));
    }, 3000);

    return () => clearInterval(interval);
  }, [userId]);

  return user ? <div>{user.name}</div> : <div>Loading...</div>;
}`
      }
    ],
    4: [
      {
        title: "Customer Support Assistant",
        conversation: [
          { role: "user", message: "I can't figure out how to reset my password." },
          { role: "ai", message: "I'd be happy to help you reset your password. You can do this by clicking the 'Forgot Password' link on the login page. You'll receive an email with instructions to create a new password. Would you like me to walk you through the specific steps?" },
          { role: "user", message: "Yes please, I don't see that link anywhere." },
          { role: "ai", message: "No problem! Here's how to find it:\n\n1. Go to our main website homepage\n2. Click the 'Sign In' button in the top right corner\n3. Look below the login form where it says 'Forgot Password?'\n4. Click that text and follow the instructions\n\nIf you still don't see it, which browser are you using? I can provide screenshots specific to your setup." }
        ]
      }
    ]
  };

  // Handle category switching with error handling
  const handleCategoryChange = (categoryId) => {
    try {
      setError(null);
      setLoading(true);

      // Simulate loading for demo purposes
      setTimeout(() => {
        setActiveCategory(categoryId);
        setLoading(false);
      }, 400);
    } catch (err) {
      console.error("Error changing category:", err);
      setError("Failed to switch categories. Please try again.");
      setLoading(false);
    }
  };

  // Safely render content based on active category
  const renderExamples = () => {
    if (loading) {
      return <div className="examples-loading">Loading examples...</div>;
    }

    if (error) {
      return <div className="examples-error">{error}</div>;
    }

    const categoryExamples = examples[activeCategory];

    if (!categoryExamples || categoryExamples.length === 0) {
      return <div className="examples-empty">No examples available for this category.</div>;
    }

    return (
      <div className="examples-content">
        {categoryExamples.map((example, index) => (
          <div className="example-card" key={index}>
            <h3 className="example-title">{example.title}</h3>

            {/* Render prompt for all types */}
            {example.prompt && (
              <div className="example-prompt">
                <h4>Prompt:</h4>
                <p>{example.prompt}</p>
              </div>
            )}

            {/* Render text result */}
            {example.result && (
              <div className="example-result">
                <h4>AI Result:</h4>
                <p>{example.result}</p>
              </div>
            )}

            {/* Render image result */}
            {example.imageSrc && (
              <div className="example-image">
                <img
                  src={example.imageSrc}
                  alt={example.altText || "AI-generated image"}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/assets/images/placeholder.jpg";
                  }}
                />
              </div>
            )}

            {/* Render code result */}
            {example.code && (
              <div className="example-code">
                <h4>Code:</h4>
                <pre>{example.code}</pre>
              </div>
            )}

            {/* Render conversation */}
            {example.conversation && (
              <div className="example-conversation">
                <h4>Conversation:</h4>
                <div className="conversation-container">
                  {example.conversation.map((msg, i) => (
                    <div key={i} className={`message ${msg.role}`}>
                      <span className="message-role">{msg.role === 'user' ? 'You' : 'AI'}</span>
                      <div className="message-content">{msg.message}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <section id="ai-examples" className="ai-examples-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">AI in Action</h2>
          <p className="section-subtitle">
            See real examples of how our generative AI can transform your workflows
          </p>
        </div>

        <div className="examples-categories">
          {categories.map(category => (
            <button
              key={category.id}
              className={`category-button ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => handleCategoryChange(category.id)}
              disabled={loading}
            >
              {category.name}
            </button>
          ))}
        </div>

        {renderExamples()}
      </div>
    </section>
  );
};

export default AIExamples;
