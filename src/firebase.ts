// src/firebase.ts

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCfwPRrAEyT5_VJtzJDQu1vcC6AejsSy34",
  authDomain: "ssn-web-aaa51.firebaseapp.com",
  projectId: "ssn-web-aaa51",
  storageBucket: "ssn-web-aaa51.firebasestorage.app",
  messagingSenderId: "991072246164",
  appId: "1:991072246164:web:41fe1593a2968ab9825781",
  measurementId: "G-2QJNJW2SKG"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
