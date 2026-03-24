import React from 'react';
import { motion } from 'framer-motion';
import { FaBrain, FaRobot, FaCode, FaImage, FaMusic, FaFileAlt } from 'react-icons/fa';
import './Features.css';

const featureData = [
  {
    icon: <FaBrain size={24} />,
    title: "Natural Language Processing",
    description: "Understand and generate human language with advanced contextual understanding and semantic analysis.",
    color: "#3498db"
  },
  {
    icon: <FaRobot size={24} />,
    title: "Conversational AI",
    description: "Create human-like conversations with memory, personality, and contextual awareness.",
    color: "#2ecc71"
  },
  {
    icon: <FaCode size={24} />,
    title: "Code Generation",
    description: "Generate functional code across multiple languages with documentation and best practices.",
    color: "#9b59b6"
  },
  {
    icon: <FaImage size={24} />,
    title: "Image Generation",
    description: "Create stunning visuals from text descriptions with style control and high resolution.",
    color: "#e74c3c"
  },
  {
    icon: <FaMusic size={24} />,
    title: "Audio Generation",
    description: "Generate realistic speech, music, and sound effects with emotional tone control.",
    color: "#f39c12"
  },
  {
    icon: <FaFileAlt size={24} />,
    title: "Content Creation",
    description: "Produce engaging articles, marketing copy, and creative content tailored to your audience.",
    color: "#1abc9c"
  }
];

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5
    }
  })
};

const Features = () => {
  return (
    <section className="features-section" id="features">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Powerful Generative AI Features
        </motion.h2>
        <motion.p
          className="section-subtitle"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Discover the cutting-edge capabilities that define the future of AI
        </motion.p>

        <div className="features-grid">
          {featureData.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="feature-card"
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
            >
              <div className="feature-icon" style={{ backgroundColor: feature.color }}>
                {feature.icon}
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
