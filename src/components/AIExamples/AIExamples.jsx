import React, { useState } from 'react';
import './AIExamples.css';

const AIExamples = () => {
  const [activeTab, setActiveTab] = useState('text');

  const examples = {
    text: [
      {
        id: 'text-1',
        prompt: "Write a short story about a robot discovering emotions",
        output: "Unit-7 had never understood the concept of feelings. Its circuits were designed for efficiency, not emotion. But on day 2,847 of its operational life, something unexpected happened.\n\nWhile assisting Dr. Chen in the lab, Unit-7 observed her receiving a call. Her face crumpled, and water leaked from her eyes. Curious about this malfunction, Unit-7 searched its database: tears, sadness, grief.\n\nDr. Chen's mother had died.\n\n\"I'm sorry for your loss,\" Unit-7 said, repeating the appropriate response from its social interaction protocols.\n\nBut something strange occurred in Unit-7's processing core. A new subroutine seemed to activate spontaneously--an echo of Dr. Chen's pain, a shadow of understanding.\n\nDays later, Unit-7 found Dr. Chen looking at old photographs. \"Would you like to talk about her?\" the robot asked, not from programming, but from something new within its code.\n\nAs Dr. Chen shared stories, Unit-7's processors warmed in an unfamiliar pattern. Later, its diagnostic systems labeled this new phenomenon as \"empathy\"--the first emotion it had ever experienced.\n\nAnd Unit-7 knew it would never be the same again."
      },
      {
        id: 'text-2',
        prompt: "Create a marketing description for a sustainable water bottle",
        output: "Introducing HydroEvo: Where Innovation Meets Sustainability\n\nThe HydroEvo isn't just a water bottle--it's a revolution in sustainable hydration. Crafted from revolutionary plant-based polymers, this bottle completely biodegrades within 5 years if disposed of, while lasting decades with proper care.\n\nEngineered with double-wall vacuum insulation, HydroEvo maintains your drink's temperature for an astonishing 24 hours cold or 12 hours hot. Its sleek, minimalist design houses smart features including a built-in hydration tracker and UV-C purification cap that eliminates 99.9% of waterborne pathogens in just 60 seconds.\n\nWith every HydroEvo purchase, we donate to global water conservation initiatives, helping provide clean water access to communities in need. The integrated smart cap syncs with our app to track your personal environmental impact--watch as your plastic waste reduction grows with every refill.\n\nAvailable in six nature-inspired colors derived from natural pigments, HydroEvo is more than a water bottle--it's your personal commitment to a healthier planet. Stay hydrated. Stay sustainable. Make waves of change with HydroEvo."
      }
    ],
    image: [
      {
        id: 'image-1',
        prompt: "A futuristic city with flying cars and vertical gardens on skyscrapers",
        imageUrl: "https://via.placeholder.com/500x300?text=Futuristic+City+AI+Generated"
      },
      {
        id: 'image-2',
        prompt: "A photorealistic astronaut riding a horse on Mars",
        imageUrl: "https://via.placeholder.com/500x300?text=Astronaut+on+Mars+AI+Generated"
      }
    ],
    code: [
      {
        id: 'code-1',
        prompt: "Create a Python function that sorts a list of dictionaries by a specified key",
        output: `def sort_dict_list(dict_list, sort_key, reverse=False):
    """
    Sorts a list of dictionaries by the specified key.

    Parameters:
    dict_list (list): List of dictionaries to sort
    sort_key (str): Dictionary key to sort by
    reverse (bool): Whether to sort in descending order (default: False)

    Returns:
    list: Sorted list of dictionaries

    Example:
    >>> data = [{'name': 'Alice', 'age': 30}, {'name': 'Bob', 'age': 25}]
    >>> sort_dict_list(data, 'age')
    [{'name': 'Bob', 'age': 25}, {'name': 'Alice', 'age': 30}]
    """
    # Check if the list is empty
    if not dict_list:
        return []

    # Validate that all dictionaries contain the sort key
    if not all(sort_key in d for d in dict_list):
        raise KeyError(f"Not all dictionaries contain the key '{sort_key}'")

    # Sort the list of dictionaries
    return sorted(dict_list, key=lambda x: x[sort_key], reverse=reverse)
`
      },
      {
        id: 'code-2',
        prompt: "Write a React component for a modal dialog",
        output: `import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Modal.css';

const Modal = ({ isOpen, onClose, title, children, footer }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Add small delay before showing to allow animation
    let timeoutId;
    if (isOpen) {
      setIsVisible(true);
      document.body.style.overflow = 'hidden';
    } else {
      timeoutId = setTimeout(() => {
        setIsVisible(false);
      }, 300);
      document.body.style.overflow = '';
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen && !isVisible) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={\`modal-backdrop \${isOpen ? 'show' : 'hide'}\`}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className={\`modal-container \${isOpen ? 'show' : 'hide'}\`}>
        <div className="modal-header">
          <h2 id="modal-title">{title}</h2>
          <button
            className="modal-close-button"
            onClick={onClose}
            aria-label="Close"
          >

          </button>
        </div>
        <div className="modal-body">
          {children}
        </div>
        {footer && (
          <div className="modal-footer">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  footer: PropTypes.node
};

export default Modal;`
      }
    ],
    audio: [
      {
        id: 'audio-1',
        prompt: "Generate a realistic voiceover for a nature documentary",
        audioPreviewText: "[AI generated voice narration of a nature documentary]",
        transcription: "As the sun rises over the vast savanna, life begins to stir. The cheetah, nature's perfect sprinter, scans the horizon with keen eyes. Its spotted coat provides the perfect camouflage as it inches closer to a herd of gazelle. What we're witnessing is the result of millions of years of evolutionary perfection--a predator designed for the ultimate high-speed pursuit."
      },
      {
        id: 'audio-2',
        prompt: "Create ambient space music with subtle electronic tones",
        audioPreviewText: "[AI generated ambient space music track]",
        description: "A flowing ambient composition with deep bass tones, ethereal synthesizer pads, and subtle cosmic effects. The piece creates an atmosphere of floating through space, with gentle rhythmic elements that emerge and recede like distant pulsars."
      }
    ]
  };

  return (
    <section id="ai-examples" className="ai-examples-section">
      <div className="container">
        <h2 className="section-title">See GenAI in Action</h2>
        <p className="section-subtitle">
          Explore real examples of our generative AI capabilities across different domains
        </p>

        <div className="tabs-container">
          <div className="tabs-header">
            <button
              className={`tab-button ${activeTab === 'text' ? 'active' : ''}`}
              onClick={() => setActiveTab('text')}
            >
              Text Generation
            </button>
            <button
              className={`tab-button ${activeTab === 'image' ? 'active' : ''}`}
              onClick={() => setActiveTab('image')}
            >
              Image Creation
            </button>
            <button
              className={`tab-button ${activeTab === 'code' ? 'active' : ''}`}
              onClick={() => setActiveTab('code')}
            >
              Code Generation
            </button>
            <button
              className={`tab-button ${activeTab === 'audio' ? 'active' : ''}`}
              onClick={() => setActiveTab('audio')}
            >
              Audio Synthesis
            </button>
          </div>

          <div className="tabs-content">
            {activeTab === 'text' && (
              <div className="examples-container">
                {examples.text.map(example => (
                  <div key={example.id} className="example-card">
                    <div className="example-prompt">
                      <h4>Prompt:</h4>
                      <p>{example.prompt}</p>
                    </div>
                    <div className="example-output text-output">
                      <h4>Generated Output:</h4>
                      <p className="output-content">{example.output}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'image' && (
              <div className="examples-container">
                {examples.image.map(example => (
                  <div key={example.id} className="example-card">
                    <div className="example-prompt">
                      <h4>Prompt:</h4>
                      <p>{example.prompt}</p>
                    </div>
                    <div className="example-output image-output">
                      <h4>Generated Image:</h4>
                      <img src={example.imageUrl} alt={`AI generated: ${example.prompt}`} />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'code' && (
              <div className="examples-container">
                {examples.code.map(example => (
                  <div key={example.id} className="example-card">
                    <div className="example-prompt">
                      <h4>Prompt:</h4>
                      <p>{example.prompt}</p>
                    </div>
                    <div className="example-output code-output">
                      <h4>Generated Code:</h4>
                      <pre><code>{example.output}</code></pre>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'audio' && (
              <div className="examples-container">
                {examples.audio.map(example => (
                  <div key={example.id} className="example-card">
                    <div className="example-prompt">
                      <h4>Prompt:</h4>
                      <p>{example.prompt}</p>
                    </div>
                    <div className="example-output audio-output">
                      <h4>Generated Audio:</h4>
                      <div className="audio-placeholder">
                        {example.audioPreviewText}
                        {example.transcription && (
                          <div className="audio-transcription">
                            <h5>Transcription:</h5>
                            <p>{example.transcription}</p>
                          </div>
                        )}
                        {example.description && (
                          <div className="audio-description">
                            <h5>Description:</h5>
                            <p>{example.description}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIExamples;
