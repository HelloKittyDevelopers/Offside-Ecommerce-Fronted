import React from 'react';
import ReactDOM from 'react-dom/client'; // Correct import for React 18
import './index.css';
import App from './App';
import './bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
