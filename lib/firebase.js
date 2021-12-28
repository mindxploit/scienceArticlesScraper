import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAdZobpVFeOPDHIP8ELwmg0GPxlU3YBbKk",
  authDomain: "mistho-interview.firebaseapp.com",
  projectId: "mistho-interview",
  storageBucket: "mistho-interview.appspot.com",
  messagingSenderId: "538958692328",
  appId: "1:538958692328:web:b705470e0421e903deae5d",
  measurementId: "G-RSX1SVFMLR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  auth,
}