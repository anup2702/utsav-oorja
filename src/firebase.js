import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration - using hardcoded values for local development
// In production, these should be environment variables
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "AIzaSyCQEJpWNnM60tEDsjLo3iFArRIeJRhQRgI",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "durgapuja-dc996.firebaseapp.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "durgapuja-dc996",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "durgapuja-dc996.firebasestorage.app",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "599154572247",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "1:599154572247:web:7a8f806da9987e879de992",
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID || "G-LD6R89L7TS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

export default app;
