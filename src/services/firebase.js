

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDGQew7P2diUlDxRZlD2rhmCwdkE4o0dnE",
  authDomain: "new-photo-deck.firebaseapp.com",
  projectId: "new-photo-deck",
  storageBucket: "new-photo-deck.firebasestorage.app",
  messagingSenderId: "126110616415",
  appId: "1:126110616415:web:5dfc8a77ed47c7457744ea",
  measurementId: "G-M58G4HED93"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
