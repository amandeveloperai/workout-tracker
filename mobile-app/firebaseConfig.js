import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';

// Using the same config as web app for now
const firebaseConfig = {
    apiKey: "AIzaSyAOC7HKO557OZIY2sOKubjaazk1ZxpKxdo",
    authDomain: "workout-tracker-52fc7.firebaseapp.com",
    projectId: "workout-tracker-52fc7",
    storageBucket: "workout-tracker-52fc7.firebasestorage.app",
    messagingSenderId: "1032877044952",
    appId: "1:1032877044952:web:68598ac1b2618cc24213ad",
    measurementId: "G-T8H89EHWH0"
};

export const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
});
export const db = getFirestore(app);
