// src/config/firebaseConfig.ts

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Ajouter l'authentification
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB5yT4p4eUrpXxGokFX7UFXKyag5BgjMiA",
  authDomain: "mail-6457f.firebaseapp.com",
  projectId: "mail-6457f",
  storageBucket: "mail-6457f.firebasestorage.app",
  messagingSenderId: "963325386543",
  appId: "1:963325386543:web:d9403e77bec2aa6da48bda",
  measurementId: "G-1BTZH26TVL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app); // Initialiser l'authentification

export { app, analytics, auth };
