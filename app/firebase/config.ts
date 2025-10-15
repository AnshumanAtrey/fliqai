// Firebase configuration for React app
import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged 
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDSPDD2xMpBvVoGuuxFYG0_nlUWVtkMk2M",
  authDomain: "fliq-webapp.firebaseapp.com",
  projectId: "fliq-webapp",
  storageBucket: "fliq-webapp.firebasestorage.app",
  messagingSenderId: "926699186492",
  appId: "1:926699186492:web:1eb6acf39b9c1e5ae59639",
  measurementId: "G-LHHRWJ112X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Providers
const googleProvider = new GoogleAuthProvider();

export {
  auth,
  googleProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged
};