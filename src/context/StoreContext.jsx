import { createContext, useContext, useState, useEffect } from 'react';
import { auth, googleProvider, db } from '../firebase';
import { signInWithPopup, signOut, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';

const StoreContext = createContext();

const INITIAL_USER_STATE = {
    name: "Athlete",
    xp: 0,
    level: 1,
    streak: 0,
    lastWorkoutDate: null,
    badges: []
};

export const StoreProvider = ({ children }) => {
    // Theme State
    const [theme, setTheme] = useState(() => localStorage.getItem('workout-tracker-theme') || 'dark');

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('workout-tracker-theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    };

    // Auth & Data State
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);

    // Sync with Firebase Auth & Firestore
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setCurrentUser(user);
                try {
                    const userRef = doc(db, "users", user.uid);
                    const userSnap = await getDoc(userRef);

                    if (userSnap.exists()) {
                        setData(userSnap.data());
                    } else {
                        // Initialize new user data in Firestore
                        const newData = {
                            user: { ...INITIAL_USER_STATE, name: user.displayName || user.email?.split('@')[0] || "Athlete" },
                            workouts: []
                        };
                        await setDoc(userRef, newData);
                        setData(newData);
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error);
                    // Fallback to local storage or empty state if Firestore fails (e.g. permissions)
                    const saved = localStorage.getItem(`workout-tracker-data-${user.uid}`);
                    if (saved) {
                        setData(JSON.parse(saved));
                    } else {
                        const newData = {
                            user: { ...INITIAL_USER_STATE, name: user.displayName || user.email?.split('@')[0] || "Athlete" },
                            workouts: []
                        };
                        setData(newData);
                    }
                }
            } else {
                setCurrentUser(null);
                setData(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    // Auth Actions
    const loginWithGoogle = async () => {
        try {
            if (auth.app.options.apiKey === "YOUR_API_KEY") {
                throw new Error("Firebase not configured. Please update src/firebase.js with your keys.");
            }
            await signInWithPopup(auth, googleProvider);
            return { success: true };
        } catch (error) {
            console.error("Google Login Error:", error);
            return { success: false, error: error.message };
        }
    };

    const loginWithEmail = async (email, password) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            return { success: true };
        } catch (error) {
            console.error("Login Error:", error);
            return { success: false, error: error.message };
        }
    };

    const signupWithEmail = async (email, password) => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            return { success: true };
        } catch (error) {
            console.error("Signup Error:", error);
            return { success: false, error: error.message };
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Logout Error:", error);
        }
    };

    // Data Actions
    const addWorkout = async (workout) => {
        // Optimistic update
        setData(prev => ({
            ...prev,
            workouts: [workout, ...prev.workouts]
        }));

        if (currentUser) {
            try {
                const userRef = doc(db, "users", currentUser.uid);
                await updateDoc(userRef, {
                    workouts: arrayUnion(workout)
                });
            } catch (error) {
                console.error("Error saving workout:", error);
            }
        }
    };

    const updateUserStats = async (updates) => {
        // Optimistic update
        setData(prev => ({
            ...prev,
            user: { ...prev.user, ...updates }
        }));

        if (currentUser) {
            try {
                const userRef = doc(db, "users", currentUser.uid);
                // We need to update nested fields. Firestore dot notation: "user.xp": ...
                const firestoreUpdates = {};
                for (const [key, value] of Object.entries(updates)) {
                    firestoreUpdates[`user.${key}`] = value;
                }
                await updateDoc(userRef, firestoreUpdates);
            } catch (error) {
                console.error("Error updating stats:", error);
            }
        }
    };

    return (
        <StoreContext.Provider value={{
            user: data?.user,
            workouts: data?.workouts || [],
            isAuthenticated: !!currentUser,
            loading,
            theme,
            toggleTheme,
            loginWithGoogle,
            loginWithEmail,
            signupWithEmail,
            logout,
            addWorkout,
            updateUserStats
        }}>
            {!loading && children}
        </StoreContext.Provider>
    );
};

export const useStore = () => useContext(StoreContext);
