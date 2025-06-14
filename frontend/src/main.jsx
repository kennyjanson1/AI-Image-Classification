// src/main.jsx - Entry point
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'; // Impor komponen App (pembungkus)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App /> {/* Render komponen App (yang merender komponen UI utama) */}
  </React.StrictMode>,
);