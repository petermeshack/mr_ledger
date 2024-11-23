// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
/*
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};
*/
const firebaseConfig = {
    apiKey: "AIzaSyBN7wGd1eAclzCDNUmlI9wp5KpcITi0YaY",
    authDomain: "mrledger-b0672.firebaseapp.com",
    databaseURL: "https://mrledger-b0672-default-rtdb.firebaseio.com",
    projectId: "mrledger-b0672",
    storageBucket: "mrledger-b0672.firebasestorage.app",
    messagingSenderId: "133590096284",
    appId: "1:133590096284:web:629e9611d3bb7f66d7d059",
    measurementId: "G-05FXR5V5YW"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default app;