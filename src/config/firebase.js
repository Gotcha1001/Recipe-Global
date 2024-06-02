import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDJGRlM8uOFKG0NojwtXE_MKEqND3lB8fs",
  authDomain: "recipe-app-acd06.firebaseapp.com",
  projectId: "recipe-app-acd06",
  storageBucket: "recipe-app-acd06.appspot.com",
  messagingSenderId: "39880170292",
  appId: "1:39880170292:web:75a2df95c8ea28343e2361",
  measurementId: "G-5DZSDCYZ0J",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
