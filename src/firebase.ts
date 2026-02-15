// // src/firebase.ts

// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
// import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
//   authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
//   projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
//   storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
//   appId: import.meta.env.VITE_FIREBASE_APP_ID,
//   measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
// };

// const app = initializeApp(firebaseConfig);

// // 🔐 Enable Firebase App Check (reCAPTCHA v3)
// initializeAppCheck(app, {
//   provider: new ReCaptchaV3Provider(
//     import.meta.env.VITE_RECAPTCHA_SITE_KEY // 🔹 Your reCAPTCHA SITE key
//   ),
//   isTokenAutoRefreshEnabled: true, // Automatically refresh token
// });

// export const db = getFirestore(app);



// src/firebase.ts

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import {   initializeAppCheck,   ReCaptchaV3Provider } from "firebase/app-check";
import { 
  getMessaging, 
  isSupported 
} from "firebase/messaging";

// 🔥 Firebase Config (from Vercel env)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// 🚀 Initialize App
const app = initializeApp(firebaseConfig);

// 🔐 App Check (reCAPTCHA v3 Protection)
// initializeAppCheck(app, {
//   provider: new ReCaptchaV3Provider(
//     import.meta.env.VITE_RECAPTCHA_SITE_KEY
//   ),
//   isTokenAutoRefreshEnabled: true,
// });

// 📦 Firestore
export const db = getFirestore(app);

// 🔔 Messaging (Push Notifications)
// Use async check because messaging not supported in all browsers
let messaging: any = null;

isSupported().then((yes) => {
  if (yes) {
    messaging = getMessaging(app);
  }
});

export { messaging };
