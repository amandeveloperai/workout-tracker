import { createContext, useContext, useState, useEffect } from 'react';
import { auth, googleProvider } from '../firebase';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';

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

    // Sync with Firebase Auth
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setCurrentUser(user);
                // Load data for this user
                const saved = localStorage.getItem(`workout-tracker-data-${user.uid}`);
                if (saved) {
                    setData(JSON.parse(saved));
                } else {
                    // Initialize new user data
                    const newData = {
                        user: { ...INITIAL_USER_STATE, name: user.displayName || user.email.split('@')[0] },
                        workouts: []
                    };
                    setData(newData);
                    localStorage.setItem(`workout-tracker-data-${user.uid}`, JSON.stringify(newData));
                }
            } else {
                setCurrentUser(null);
                setData(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    // Persist Data
    useEffect(() => {
        if (currentUser && data) {
            localStorage.setItem(`workout-tracker-data-${currentUser.uid}`, JSON.stringify(data));
        }
    }, [data, currentUser]);

    // Auth Actions
    const loginWithGoogle = async () => {
        try {
            // Check for placeholder config
            if (auth.app.options.apiKey === "YOUR_API_KEY") {
                throw new Error("Firebase not configured. Please update src/firebase.js with your keys.");
            }
            await signInWithPopup(auth, googleProvider);
            return { success: true };
        } catch (error) {
            console.error("Google Login Error:", error);
            let errorMessage = error.message;
            if (error.code === 'auth/api-key-not-valid-please-pass-in-a-valid-api-key') {
                errorMessage = "Invalid Firebase API Key. Check src/firebase.js.";
            } else if (error.message.includes("Firebase not configured")) {
                errorMessage = error.message;
            } else {
                errorMessage = "Google Login failed. Check console for details.";
            }
            return { success: false, error: errorMessage };
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
    const addWorkout = (workout) => {
        setData(prev => ({
            ...prev,
            workouts: [workout, ...prev.workouts]
        }));
    };

    const updateUserStats = (updates) => {
        setData(prev => ({
            ...prev,
            user: { ...prev.user, ...updates }
        }));
    };

    // Legacy/Mock Login (for testing without Firebase keys)
    // Keeping this as a fallback or for the "password" flow if we want to keep it
    // But user asked for Google Auth. Let's keep it simple and focus on Firebase.
    // Actually, let's keep the mock login as a "Guest" or "Local" mode if Firebase fails?
    // No, user specifically asked for Google Auth.

    return (
        <StoreContext.Provider value={{
            user: data?.user,
            workouts: data?.workouts || [],
            isAuthenticated: !!currentUser,
            loading,
            theme,
            toggleTheme,
            loginWithGoogle,
            logout,
            addWorkout,
            updateUserStats
        }}>
            {!loading && children}
        </StoreContext.Provider>
    );
};

export const useStore = () => useContext(StoreContext);
