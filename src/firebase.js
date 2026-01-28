import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

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

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { db, storage, auth, googleProvider };