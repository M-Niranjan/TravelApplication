import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  auth, 
  googleProvider, 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  updateProfile, 
  signOut as fbSignOut, 
  onAuthStateChanged 
} from '../services/firebase';

const AuthContext = createContext(null);

const DEFAULT_PREFERENCES = {
  tempUnit: 'C', // 'C' | 'F'
  currency: 'USD', // 'USD' | 'EUR' | 'GBP' | 'JPY' | 'INR' | 'AUD' | 'CAD'
  travelStyle: 'Culture',
  weatherAlerts: true,
  aiRecommendations: true,
  offlineCaching: true
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);
  const [savedFavorites, setSavedFavorites] = useState([]);
  const [preferences, setPreferences] = useState(DEFAULT_PREFERENCES);

  // Load saved favorites, preferences & stored active user session on mount
  useEffect(() => {
    try {
      const storedFavs = localStorage.getItem('aetheria_saved_favorites');
      if (storedFavs) {
        setSavedFavorites(JSON.parse(storedFavs));
      }

      const storedPrefs = localStorage.getItem('aetheria_preferences');
      if (storedPrefs) {
        setPreferences({ ...DEFAULT_PREFERENCES, ...JSON.parse(storedPrefs) });
      }

      const activeLocalUser = localStorage.getItem('aetheria_active_user');
      if (activeLocalUser) {
        setUser(JSON.parse(activeLocalUser));
      }
    } catch (e) {
      console.warn('Failed to load local storage data:', e);
    }
    setLoading(false);
  }, []);

  // Listen to Firebase auth state changes
  useEffect(() => {
    if (!auth) return;

    let unsubscribe;
    try {
      unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
        if (firebaseUser) {
          const profileData = {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName || firebaseUser.email.split('@')[0],
            photoURL: firebaseUser.photoURL || `https://api.dicebear.com/7.x/adventurer/svg?seed=${firebaseUser.email}`,
            createdAt: firebaseUser.metadata?.creationTime || new Date().toISOString(),
            isFirebase: true
          };
          setUser(profileData);
          localStorage.setItem('aetheria_active_user', JSON.stringify(profileData));
        }
      });
    } catch (e) {
      // Firebase listener fallback
    }

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  // Update Preferences
  const updatePreferences = (newPrefs) => {
    setPreferences((prev) => {
      const updated = { ...prev, ...newPrefs };
      localStorage.setItem('aetheria_preferences', JSON.stringify(updated));
      return updated;
    });
  };

  // Update User Display Name
  const updateDisplayName = async (newDisplayName) => {
    if (!newDisplayName || !user) return;
    try {
      if (auth?.currentUser) {
        await updateProfile(auth.currentUser, { displayName: newDisplayName }).catch(() => {});
      }
      const updatedUser = { ...user, displayName: newDisplayName };
      setUser(updatedUser);
      localStorage.setItem('aetheria_active_user', JSON.stringify(updatedUser));
      
      // Update in registered list if local
      const storedUsers = JSON.parse(localStorage.getItem('aetheria_registered_users') || '[]');
      const userIdx = storedUsers.findIndex((u) => u.email?.toLowerCase() === user.email?.toLowerCase());
      if (userIdx >= 0) {
        storedUsers[userIdx].displayName = newDisplayName;
        localStorage.setItem('aetheria_registered_users', JSON.stringify(storedUsers));
      }
      return updatedUser;
    } catch (err) {
      console.error('Failed to update display name:', err);
      throw err;
    }
  };

  // Clear all saved favorites
  const clearAllFavorites = () => {
    setSavedFavorites([]);
    localStorage.removeItem('aetheria_saved_favorites');
  };

  // Sign in with Email and Password
  const loginWithEmail = async (email, password) => {
    setAuthError(null);

    // 1. Try real Firebase Auth first
    if (auth) {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        if (userCredential?.user) {
          const profileData = {
            uid: userCredential.user.uid,
            email: userCredential.user.email,
            displayName: userCredential.user.displayName || email.split('@')[0],
            photoURL: userCredential.user.photoURL || `https://api.dicebear.com/7.x/adventurer/svg?seed=${email}`,
            createdAt: new Date().toISOString(),
            isFirebase: true
          };
          setUser(profileData);
          localStorage.setItem('aetheria_active_user', JSON.stringify(profileData));
          return profileData;
        }
      } catch (fbErr) {
        if (fbErr.code === 'auth/wrong-password' || fbErr.code === 'auth/invalid-credential') {
          const msg = 'Invalid email or password.';
          setAuthError(msg);
          throw new Error(msg);
        }
        console.warn('Firebase login check:', fbErr.message);
      }
    }

    // 2. Local profile verification
    try {
      const storedUsers = JSON.parse(localStorage.getItem('aetheria_registered_users') || '[]');
      const foundUser = storedUsers.find((u) => u.email.toLowerCase() === email.toLowerCase());

      if (foundUser) {
        if (foundUser.password && foundUser.password !== password) {
          throw new Error('Incorrect password. Please verify your credentials.');
        }

        const activeProfile = {
          uid: foundUser.uid,
          email: foundUser.email,
          displayName: foundUser.displayName,
          photoURL: foundUser.photoURL,
          createdAt: foundUser.createdAt,
          isFirebase: false
        };
        setUser(activeProfile);
        localStorage.setItem('aetheria_active_user', JSON.stringify(activeProfile));
        return activeProfile;
      } else {
        // Auto-create local traveler profile
        const newProfile = {
          uid: `user_${Date.now()}`,
          email: email,
          displayName: email.split('@')[0],
          photoURL: `https://api.dicebear.com/7.x/adventurer/svg?seed=${email}`,
          createdAt: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
          isFirebase: false
        };
        storedUsers.push({ ...newProfile, password });
        localStorage.setItem('aetheria_registered_users', JSON.stringify(storedUsers));
        localStorage.setItem('aetheria_active_user', JSON.stringify(newProfile));
        setUser(newProfile);
        return newProfile;
      }
    } catch (err) {
      setAuthError(err.message);
      throw err;
    }
  };

  // Sign up with Email, Password and Display Name
  const registerWithEmail = async (email, password, displayName) => {
    setAuthError(null);

    // 1. Try real Firebase Auth first
    if (auth) {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        if (userCredential?.user) {
          if (displayName) {
            await updateProfile(userCredential.user, { displayName });
          }
          const profileData = {
            uid: userCredential.user.uid,
            email: userCredential.user.email,
            displayName: displayName || userCredential.user.email.split('@')[0],
            photoURL: `https://api.dicebear.com/7.x/adventurer/svg?seed=${email}`,
            createdAt: new Date().toISOString(),
            isFirebase: true
          };
          setUser(profileData);
          localStorage.setItem('aetheria_active_user', JSON.stringify(profileData));
          return profileData;
        }
      } catch (fbErr) {
        if (fbErr.code === 'auth/email-already-in-use') {
          const msg = 'An account with this email already exists. Please sign in.';
          setAuthError(msg);
          throw new Error(msg);
        }
        console.warn('Firebase registration check:', fbErr.message);
      }
    }

    // 2. Local traveler profile registration
    const newProfile = {
      uid: `traveler_${Date.now()}`,
      email: email,
      displayName: displayName || email.split('@')[0],
      photoURL: `https://api.dicebear.com/7.x/adventurer/svg?seed=${displayName || email}`,
      createdAt: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      isFirebase: false
    };

    const storedUsers = JSON.parse(localStorage.getItem('aetheria_registered_users') || '[]');
    const existingIdx = storedUsers.findIndex((u) => u.email.toLowerCase() === email.toLowerCase());
    if (existingIdx >= 0) {
      storedUsers[existingIdx] = { ...newProfile, password };
    } else {
      storedUsers.push({ ...newProfile, password });
    }

    localStorage.setItem('aetheria_registered_users', JSON.stringify(storedUsers));
    localStorage.setItem('aetheria_active_user', JSON.stringify(newProfile));
    setUser(newProfile);
    return newProfile;
  };

  // Sign in with Google through Firebase Authentication
  const loginWithGoogle = async () => {
    setAuthError(null);

    if (!auth || !googleProvider) {
      const msg = 'Google sign-in is not configured for this deployment.';
      setAuthError(msg);
      throw new Error(msg);
    }

    try {
      const result = await signInWithPopup(auth, googleProvider);
      if (!result?.user) throw new Error('Google sign-in did not return a user.');

      const profileData = {
        uid: result.user.uid,
        email: result.user.email,
        displayName: result.user.displayName || result.user.email.split('@')[0],
        photoURL: result.user.photoURL || `https://api.dicebear.com/7.x/adventurer/svg?seed=${result.user.email}`,
        createdAt: result.user.metadata?.creationTime || new Date().toISOString(),
        isFirebase: true
      };
      setUser(profileData);
      localStorage.setItem('aetheria_active_user', JSON.stringify(profileData));
      return profileData;
    } catch (error) {
      const errorMessages = {
        'auth/unauthorized-domain': `This site is not authorized in Firebase. Add ${window.location.hostname} in Firebase Console > Authentication > Settings > Authorized domains.`,
        'auth/popup-blocked': 'Google sign-in was blocked by the browser. Allow popups for this site and try again.',
        'auth/popup-closed-by-user': 'The Google sign-in window closed before authentication completed.',
        'auth/operation-not-allowed': 'Google sign-in is disabled in Firebase Console.',
        'auth/invalid-api-key': 'The Firebase API key configured for this deployment is invalid.'
      };
      const msg = errorMessages[error.code] || error.message || 'Google sign-in failed.';
      setAuthError(msg);
      throw new Error(msg);
    }
  };

  // Demo Sign-In
  const loginWithDemo = (demoName = 'Niranjan Explorer') => {
    const mockUser = {
      uid: 'demo_user_traveler',
      email: 'niranjan@travelapplication.com',
      displayName: demoName,
      photoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=250&auto=format&fit=crop',
      createdAt: 'September 2026',
      isDemo: true
    };
    localStorage.setItem('aetheria_active_user', JSON.stringify(mockUser));
    setUser(mockUser);
    setAuthError(null);
    return mockUser;
  };

  // Sign out
  const logout = async () => {
    try {
      localStorage.removeItem('aetheria_active_user');
      if (auth) {
        await fbSignOut(auth).catch(() => {});
      }
      setUser(null);
    } catch (error) {
      setUser(null);
    }
  };

  // Toggle favorite destination bookmark
  const toggleFavorite = (destId) => {
    setSavedFavorites((prev) => {
      const updated = prev.includes(destId) ? prev.filter((id) => id !== destId) : [...prev, destId];
      localStorage.setItem('aetheria_saved_favorites', JSON.stringify(updated));
      return updated;
    });
  };

  const value = {
    user,
    loading,
    authError,
    setAuthError,
    loginWithEmail,
    registerWithEmail,
    loginWithGoogle,
    loginWithDemo,
    logout,
    savedFavorites,
    toggleFavorite,
    clearAllFavorites,
    preferences,
    updatePreferences,
    updateDisplayName,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
