import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAOC7HKO557OZIY2sOKubjaazk1ZxpKxdo",
    authDomain: "workout-tracker-52fc7.firebaseapp.com",
    projectId: "workout-tracker-52fc7",
    storageBucket: "workout-tracker-52fc7.firebasestorage.app",
    messagingSenderId: "1032877044952",
    appId: "1:1032877044952:web:68598ac1b2618cc24213ad",
    measurementId: "G-T8H89EHWH0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export default app;
