// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider} from "firebase/auth";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBCH3rBeLPJk4fZwvB7Rvr_wXEGzhIHBcM",
  authDomain: "fir-project-7ef30.firebaseapp.com",
  projectId: "fir-project-7ef30",
  storageBucket: "fir-project-7ef30.appspot.com",
  messagingSenderId: "973371637822",
  appId: "1:973371637822:web:2ec08ede48f48e5849516f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

export const db = getFirestore(app);