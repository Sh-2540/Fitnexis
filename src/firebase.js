import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider , signInWithPopup } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBT-govl_WEMD4qriuIH_ae6pooVBFZRfQ",
  authDomain: "fitnexis-01.firebaseapp.com",
  projectId: "fitnexis-01",
  storageBucket: "fitnexis-01.firebasestorage.app",
  messagingSenderId: "1041529689644",
  appId: "1:1041529689644:web:01928ddef0723ae85ba389",
  measurementId: "G-FEGWJKRWCD"
};
  // Initialize Firebase
const app = initializeApp(firebaseConfig);

// Optional analytics (you can keep or remove)
const analytics = getAnalytics(app);

// Auth setup
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const goggleLogin =() =>signInWithPopup(auth,googleProvider);