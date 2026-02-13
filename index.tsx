
import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App';

console.log("Arcade Engine: Starting...");

const initApp = () => {
  try {
    const rootElement = document.getElementById('root');
    if (!rootElement) {
      console.error("Arcade Engine: Error - #root element not found.");
      return;
    }

    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <HashRouter>
          <App />
        </HashRouter>
      </React.StrictMode>
    );
    console.log("Arcade Engine: UI Mounted successfully.");
  } catch (err) {
    console.error("Arcade Engine: Initialization failed", err);
  }
};

// Handle mounting for both immediate and deferred loading scenarios
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  initApp();
} else {
  document.addEventListener('DOMContentLoaded', initApp);
}
