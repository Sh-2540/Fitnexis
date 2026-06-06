import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider , signInWithPopup } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCO7prQ8SjIsrtMdRibpQJyRv4YZS33VZM",
  authDomain: "fitnexis-d30c7.firebaseapp.com",
  projectId: "fitnexis-d30c7",
  storageBucket: "fitnexis-d30c7.firebasestorage.app",
  messagingSenderId: "12482854565",
  appId: "1:12482854565:web:736298275f12bcb4c6974c",
  measurementId: "G-0WXDGM1ZLN",
};
  // Initialize Firebase
const app = initializeApp(firebaseConfig);

// Optional analytics (you can keep or remove)
const analytics = getAnalytics(app);

// Auth setup
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const goggleLogin =() =>signInWithPopup(auth,googleProvider);