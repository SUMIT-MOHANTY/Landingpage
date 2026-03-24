import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaImage, FaFileAlt, FaRobot } from 'react-icons/fa';
import './AIExamples.css';

const exampleTabs = [
  { id: 'chat', label: 'Conversational AI', icon: <FaRobot /> },
  { id: 'code', label: 'Code Generation', icon: <FaCode /> },
  { id: 'image', label: 'Image Creation', icon: <FaImage /> },
  { id: 'content', label: 'Content Writing', icon: <FaFileAlt /> }
];

const examples = {
  chat: {
    input: "Can you explain how quantum computing differs from traditional computing in simple terms?",
    output: `Quantum computing and traditional computing differ fundamentally in how they process information:

Traditional Computing:
- Uses bits that are either 0 or 1
- Processes data sequentially
- Best for everyday tasks and calculations

Quantum Computing:
- Uses quantum bits (qubits) that can be 0, 1, or both simultaneously (superposition)
- Can process many possibilities at once
- Leverages quantum entanglement to connect qubits
- Excels at solving complex problems like encryption, molecular modeling, and optimization

Think of traditional computers as solving a maze by trying one path at a time, while quantum computers explore all paths simultaneously to find the solution.`
  },
  code: {
    input: "Write a Python function to find the Fibonacci sequence up to n terms with memoization.",
    output: `
\`\`\`python
def fibonacci_sequence(n):
    """
    Generate the Fibonacci sequence up to n terms using memoization.

    Args:
        n: The number of Fibonacci terms to generate

    Returns:
        A list containing the Fibonacci sequence
    """
    # Initialize memoization cache
    memo = {0: 0, 1: 1}

    def fib_memo(k):
        if k in memo:
            return memo[k]
        # Calculate and cache the result
        memo[k] = fib_memo(k-1) + fib_memo(k-2)
        return memo[k]

    # Generate the sequence
    sequence = []
    for i in range(n):
        sequence.append(fib_memo(i))

    return sequence

# Example usage
if __name__ == "__main__":
    n_terms = 10
    result = fibonacci_sequence(n_terms)
    print(f"Fibonacci sequence up to {n_terms} terms:")
    print(result)  # Output: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
\`\`\`

This implementation uses memoization to store previously calculated Fibonacci values in a dictionary, significantly improving performance by avoiding redundant calculations.`
  },
  image: {
    input: "Generate a surreal landscape with floating islands, waterfalls flowing upward, and a purple sky with twin moons.",
    output: "https://images.unsplash.com/photo-1604537529428-15bcbeecfe4d?q=80&w=2069",
    isImage: true
  },
  content: {
    input: "Write a compelling product description for a new smart water bottle that tracks hydration and syncs with fitness apps.",
    output: `# HydroTrack Pro: The Future of Hydration

**Stay Perfectly Hydrated, Every Single Day**

Introducing the HydroTrack Pro, the revolutionary smart water bottle that transforms how you hydrate. Never wonder if you're drinking enough water again.

## Intelligent Hydration Monitoring

The HydroTrack Pro doesn't just hold water--it actively monitors your hydration levels throughout the day. Our proprietary sensors measure your intake with precision accuracy, while the adaptive AI creates personalized hydration goals based on:

- Your body metrics
- Activity level
- Local weather conditions
- Workout intensity

## Seamless Integration with Your Digital Life

The HydroTrack Pro syncs effortlessly with all major fitness apps including Apple Health, Fitbit, and Garmin. Watch your hydration data appear alongside your steps, heart rate, and sleep quality for a complete wellness picture.

## Premium Design Meets Advanced Technology

Crafted from premium, BPA-free Tritan material with a sleek, minimalist design, the HydroTrack Pro feels as good as it looks. The intuitive LED display gently reminds you when it's time to drink, while the long-lasting battery ensures 2+ weeks of use between charges.

**HydroTrack Pro: Because proper hydration is the foundation of optimal performance.**`
  }
};

const AIExamples = () => {
  const [activeTab, setActiveTab] = useState('chat');

  return (
    <section className="ai-examples-section" id="examples">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Experience AI in Action
        </motion.h2>
        <motion.p
          className="section-subtitle"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          See real examples of what our generative AI technology can create
        </motion.p>

        <div className="examples-container">
          <div className="example-tabs">
            {exampleTabs.map((tab) => (
              <button
                key={tab.id}
                className={`example-tab ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span className="tab-icon">{tab.icon}</span>
                <span className="tab-label">{tab.label}</span>
              </button>
            ))}
          </div>

          <div className="example-content">
            <div className="example-input">
              <h3>Prompt:</h3>
              <p>{examples[activeTab].input}</p>
            </div>

            <div className="example-output">
              <h3>Generated Output:</h3>
              {examples[activeTab].isImage ? (
                <div className="example-image-container">
                  <img
                    src={examples[activeTab].output}
                    alt="AI generated image"
                    className="example-image"
                  />
                </div>
              ) : (
                <div className="example-text">
                  <pre>{examples[activeTab].output}</pre>
                </div>
              )}
            </div>
          </div>

          <motion.div
            className="try-it-now"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <a href="#demo" className="try-button">Try it yourself</a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AIExamples;
