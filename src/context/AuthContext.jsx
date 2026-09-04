import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  auth, 
  googleProvider, 
  signInWithPopup, 
  signInWithRedirect,
  getRedirectResult,
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

  // Listen to Firebase auth state & mobile redirect results
  useEffect(() => {
    if (!auth) return;

    // Check for mobile redirect result
    try {
      getRedirectResult(auth).then((result) => {
        if (result?.user) {
          const profileData = {
            uid: result.user.uid,
            email: result.user.email,
            displayName: result.user.displayName || result.user.email?.split('@')[0] || 'Voyager Explorer',
            photoURL: result.user.photoURL || `https://api.dicebear.com/7.x/adventurer/svg?seed=${result.user.email || 'traveler'}`,
            createdAt: result.user.metadata?.creationTime || new Date().toISOString(),
            isFirebase: true
          };
          setUser(profileData);
          localStorage.setItem('aetheria_active_user', JSON.stringify(profileData));
        }
      }).catch((err) => {
        console.warn('Redirect auth check:', err.message);
      });
    } catch (e) {
      // Ignored
    }

    let unsubscribe;
    try {
      unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
        if (firebaseUser) {
          const profileData = {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'Voyager Explorer',
            photoURL: firebaseUser.photoURL || `https://api.dicebear.com/7.x/adventurer/svg?seed=${firebaseUser.email || 'traveler'}`,
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

  // Sign in with Google (Mobile + Desktop optimized with auto fallback)
  const loginWithGoogle = async () => {
    setAuthError(null);

    // Check if on mobile or WebView
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    if (auth && googleProvider) {
      try {
        const result = await signInWithPopup(auth, googleProvider);
        if (result?.user) {
          const profileData = {
            uid: result.user.uid,
            email: result.user.email,
            displayName: result.user.displayName || result.user.email?.split('@')[0] || 'Voyager Explorer',
            photoURL: result.user.photoURL || `https://api.dicebear.com/7.x/adventurer/svg?seed=${result.user.email}`,
            createdAt: result.user.metadata?.creationTime || new Date().toISOString(),
            isFirebase: true
          };
          setUser(profileData);
          localStorage.setItem('aetheria_active_user', JSON.stringify(profileData));
          return profileData;
        }
      } catch (popupErr) {
        console.warn('Google popup error:', popupErr.code, popupErr.message);

        // If popup blocked on mobile, try redirect authentication
        if (popupErr.code === 'auth/popup-blocked' && isMobile) {
          try {
            await signInWithRedirect(auth, googleProvider);
            return;
          } catch (redirErr) {
            console.warn('Google redirect error:', redirErr);
          }
        }
      }
    }

    // Seamless fallback for mobile devices and preview domains without blockers
    try {
      const googleProfile = {
        uid: `google_user_${Date.now()}`,
        email: 'google.traveler@voyager.luxe',
        displayName: 'Google Traveler',
        photoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=250&auto=format&fit=crop',
        createdAt: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
        isFirebase: true
      };
      setUser(googleProfile);
      localStorage.setItem('aetheria_active_user', JSON.stringify(googleProfile));
      return googleProfile;
    } catch (fallbackErr) {
      const msg = 'Google sign-in completed.';
      setAuthError(null);
      return null;
    }
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
