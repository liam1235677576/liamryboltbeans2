
import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App';

console.log("Arcade Engine: Initializing Kernel...");

const mount = () => {
  const rootElement = document.getElementById('root');
  
  if (!rootElement) {
    console.error("Arcade Engine: Root element not found.");
    return;
  }

  try {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <HashRouter>
          <App />
        </HashRouter>
      </React.StrictMode>
    );
    console.log("Arcade Engine: UI System Ready.");
  } catch (error: any) {
    console.error("Arcade Engine: Mount error", error);
    const overlay = document.getElementById('error-overlay');
    const msg = document.getElementById('error-message');
    if (overlay && msg) {
      overlay.style.display = 'flex';
      msg.textContent = "MOUNT ERROR: " + (error?.message || "Check console for stack trace.");
    }
  }
};

// Handle both standard and deferred loading
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  mount();
} else {
  document.addEventListener('DOMContentLoaded', mount);
}
