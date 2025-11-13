// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // <-- ADD THIS
import { getStorage } from "firebase/storage"; // <-- ADD THIS

// TODO: Add your own Firebase configuration
// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyAtUSg-_LdrygpLn_trTq2Ms1MqLWoqOmE",
  authDomain: "gamepatty-a4c08.firebaseapp.com",
  projectId: "gamepatty-a4c08",
  storageBucket: "gamepatty-a4c08.firebasestorage.app",
  messagingSenderId: "278973400401",
  appId: "1:278973400401:web:8f36e675cf7a59bef27f70"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);