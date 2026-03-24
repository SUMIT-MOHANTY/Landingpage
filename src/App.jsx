import React from 'react';
import './App.css';
import GenAIContent from './components/GenAIContent';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Generative AI Platform</h1>
        <p>Experience the future of AI-powered content creation</p>
      </header>
      <GenAIContent />
      <footer className="App-footer">
        <p>&copy; {new Date().getFullYear()} GenAI Platform. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
