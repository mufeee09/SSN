// import { StrictMode } from 'react';
// import { createRoot } from 'react-dom/client';
// import App from './App.tsx';
// import './index.css';

// // 🔥 Add this line
// import { registerSW } from 'virtual:pwa-register';

// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//     <App />
//   </StrictMode>
// );

// // 🔥 Register Service Worker
// registerSW({ immediate: true });


import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

import { registerSW } from 'virtual:pwa-register';

const updateSW = registerSW({
  immediate: true,

  onNeedRefresh() {
    // 🔥 Force update immediately
    updateSW(true);
  },

  onOfflineReady() {
    console.log('App ready to work offline');
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
