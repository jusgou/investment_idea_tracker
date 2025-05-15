// Firebase configuration
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBxO-tawD556H5qvVOczmIhp6KUn4a7Ido",
  authDomain: "investment-idea-tracker.firebaseapp.com",
  projectId: "investment-idea-tracker",
  storageBucket: "investment-idea-tracker.firebasestorage.app",
  messagingSenderId: "456223212051",
  appId: "1:456223212051:web:5da71ad909ae6f54ad35e6",
  measurementId: "G-57X66JN7XF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export default app;
