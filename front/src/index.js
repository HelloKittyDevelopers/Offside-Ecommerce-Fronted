import React from 'react';
import ReactDOM from 'react-dom/client'; // Importación correcta para React 18
import './index.css';
import App from './App';
import './bootstrap.min.css';
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter } from 'react-router-dom'; // Importar BrowserRouter

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
