import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import '@fontsource-variable/inter';
import { setupStorage } from './utils/setup-storage';
import { initializeVideoReviews } from './utils/video';

// Set up storage bucket and initialize reviews
Promise.all([
  setupStorage(),
  initializeVideoReviews()
]).then(([storageSuccess]) => {
  if (!storageSuccess) {
    console.error('Failed to set up storage bucket');
  }
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);