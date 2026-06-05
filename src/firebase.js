import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider , signInWithPopup } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyAcEoj7pOyq3aNZKxQUhR9i7YPq4YIh4dw",
    authDomain: "nutrix-bc0d9.firebaseapp.com",
    projectId: "nutrix-bc0d9",
    storageBucket: "nutrix-bc0d9.firebasestorage.app",
    messagingSenderId: "754806942392",
    appId: "1:754806942392:web:035c1429f76bfa755f224d",
    measurementId: "G-Y7FKS19V7W"
  };
  // Initialize Firebase
const app = initializeApp(firebaseConfig);

// Optional analytics (you can keep or remove)
const analytics = getAnalytics(app);

// Auth setup
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const goggleLogin =() =>signInWithPopup(auth,googleProvider);