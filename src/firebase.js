import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"


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


// Auth setup
export const db = getFirestore(app);
export const auth = getAuth(app);
