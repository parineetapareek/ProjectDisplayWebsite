// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "prollaborate.firebaseapp.com",
  projectId: "prollaborate",
  storageBucket: "prollaborate.appspot.com",
  messagingSenderId: "664095413553",
  appId: "1:664095413553:web:5e0f7473d2d7b68af1cc10",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
