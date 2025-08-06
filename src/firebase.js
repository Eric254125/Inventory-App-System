// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDr5JaTeuSXtQi62RaRP_-PISyVLFQpq6k",
  authDomain: "inventory-system-61ef0.firebaseapp.com",
  projectId: "inventory-system-61ef0",
  storageBucket: "inventory-system-61ef0.firebasestorage.app",
  messagingSenderId: "858426103873",
  appId: "1:858426103873:web:a66f21c6a3ab336d028ec0",
  measurementId: "G-B3E5QDX50H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


export {app};
export {analytics}
