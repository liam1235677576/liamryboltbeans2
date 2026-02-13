
import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App';

console.log("Arcade Engine: Mounting Components...");

const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error("Arcade Engine Error: Could not find root element");
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
);

console.log("Arcade Engine: Ready!");
