
import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App';

console.log("Arcade Engine: Initializing Kernel...");

function mount() {
  const rootElement = document.getElementById('root');
  
  if (!rootElement) {
    console.error("Arcade Engine: Fatal - Root element not found.");
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
    console.error("Arcade Engine: Initialization Failed", error);
    const overlay = document.getElementById('error-overlay');
    const msg = document.getElementById('error-message');
    if (overlay && msg) {
      overlay.style.display = 'flex';
      msg.textContent = "KERNEL ERROR: " + (error?.message || "Unknown error during mount. See console for details.");
    }
  }
}

// Ensure the DOM is fully loaded before mounting
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mount);
} else {
  mount();
}
