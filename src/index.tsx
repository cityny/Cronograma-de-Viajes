// En el archivo index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
// CAMBIAR: de './App' a './App.tsx'
import App from './App.tsx';
import './styles/index.css';

// ... el resto del código

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
