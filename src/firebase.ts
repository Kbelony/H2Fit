// Import the functions you need from the SDKs you need
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore"
import {getAuth,GoogleAuthProvider} from "firebase/auth";
import firebase from "firebase/compat/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBfYgTztLYV5g-PyDPrG6e1ekwubEz3Lnc",
  authDomain: "h2fit-project.firebaseapp.com",
  projectId: "h2fit-project",
  storageBucket: "h2fit-project.appspot.com",
  messagingSenderId: "182120273529",
  appId: "1:182120273529:web:2c6d4f293122e42ed0e6a8",
  measurementId: "G-8XKGFV8PXL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app);

const auth = getAuth(app)
const provider = new GoogleAuthProvider();
const storage = firebase.storage// Ajoutez cette ligne

export { app, analytics, provider, storage, firestore, auth }; // Ajoutez 'auth' ici
export const db = getFirestore(app);