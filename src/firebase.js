// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "khushit-vendors.firebaseapp.com",
  projectId: "khushit-vendors",
  storageBucket: "khushit-vendors.appspot.com",
  messagingSenderId: "678401802178",
  appId: "1:678401802178:web:a95ce5aa6ad59f6bf4e05b",
  measurementId: "G-V74GDB3R8Q",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
