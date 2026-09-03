import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  updateProfile, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';

// Firebase configuration targeting user's travelApplication project
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDemoTravelKey1234567890abcdefgh",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "travelapplication.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "travelapplication",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "travelapplication.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "102938475600",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:102938475600:web:travelapplication12345"
};

// Initialize Firebase App singleton safely
let app;
let auth;
let googleProvider;

try {
  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
  auth = getAuth(app);
  googleProvider = new GoogleAuthProvider();
  // Force account selection screen on Google Popup
  googleProvider.setCustomParameters({
    prompt: 'select_account'
  });
} catch (e) {
  console.warn('Firebase initialization warning:', e);
}

export { 
  app, 
  auth, 
  googleProvider, 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  updateProfile, 
  signOut, 
  onAuthStateChanged 
};
