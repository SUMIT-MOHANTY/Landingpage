import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './styles/responsive.css';
import App from './App';

// Ensure proper focus for keyboard users
document.body.addEventListener('keyup', (e) => {
  if (e.key === 'Tab') {
    document.body.classList.add('user-is-tabbing');
  }
});

// Remove focus styling for mouse users
document.body.addEventListener('mousedown', () => {
  document.body.classList.remove('user-is-tabbing');
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
