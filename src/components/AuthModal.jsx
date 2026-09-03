import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { DESTINATIONS } from '../data/destinations';
import { 
  X, 
  User, 
  Mail, 
  Lock, 
  Sparkles, 
  LogOut, 
  Heart, 
  Compass, 
  Calendar, 
  CheckCircle2, 
  AlertCircle,
  Loader2,
  ShieldCheck,
  Bookmark
} from 'lucide-react';

export default function AuthModal({ isOpen, onClose }) {
  const { 
    user, 
    loginWithEmail, 
    registerWithEmail, 
    loginWithGoogle, 
    loginWithDemo, 
    logout, 
    savedFavorites, 
    authError, 
    setAuthError 
  } = useAuth();

  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Clear messages when opening or switching tabs
  useEffect(() => {
    if (isOpen) {
      setAuthError(null);
      setSuccessMessage('');
    }
  }, [isOpen, mode]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setAuthError(null);

    try {
      if (mode === 'login') {
        await loginWithEmail(email, password);
        setSuccessMessage('Welcome back!');
        setTimeout(() => onClose(), 800);
      } else {
        await registerWithEmail(email, password, displayName);
        setSuccessMessage('Account created successfully!');
        setTimeout(() => onClose(), 800);
      }
    } catch (err) {
      // Error handled in AuthContext
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsSubmitting(true);
    setAuthError(null);
    try {
      await loginWithGoogle();
      setSuccessMessage('Signed in with Google!');
      setTimeout(() => onClose(), 800);
    } catch (err) {
      console.warn('Google sign-in error:', err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDemoSignIn = () => {
    loginWithDemo('Niranjan Explorer');
    setSuccessMessage('Welcome! Signed in as Explorer.');
    setTimeout(() => onClose(), 600);
  };

  const favoriteDestinations = DESTINATIONS.filter((d) => savedFavorites.includes(d.id));

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#101413]/70 backdrop-blur-md"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="relative w-full max-w-lg bg-white p-6 sm:p-8 rounded-3xl shadow-2xl border border-[#171A19]/10 overflow-hidden max-h-[90vh] overflow-y-auto no-scrollbar"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 text-[#68706D] hover:text-[#171A19] transition-colors min-h-[40px] min-w-[40px] flex items-center justify-center"
        >
          <X className="w-5 h-5" />
        </button>

        {/* ============================================================ */}
        {/* VIEW 1: AUTHENTICATED USER PROFILE VIEW                       */}
        {/* ============================================================ */}
        {user ? (
          <div className="space-y-6">
            
            {/* Header / Avatar */}
            <div className="flex items-center space-x-4 pb-6 border-b border-[#171A19]/08">
              <div className="relative">
                <img
                  src={user.photoURL || `https://api.dicebear.com/7.x/adventurer/svg?seed=${user.email}`}
                  alt={user.displayName}
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-[#2F6F68] shadow-md bg-[#F7F5F0]"
                />
                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#2F6F68] border-2 border-white flex items-center justify-center text-white">
                  <ShieldCheck className="w-3 h-3" />
                </div>
              </div>

              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#2F6F68] block">
                  AETHERIA TRAVELER PROFILE
                </span>
                <h3 className="font-editorial text-2xl font-bold text-[#171A19]">
                  {user.displayName}
                </h3>
                <p className="text-xs text-[#68706D] font-light flex items-center space-x-1 mt-0.5">
                  <Mail className="w-3 h-3 text-[#2F6F68]" />
                  <span>{user.email}</span>
                </p>
              </div>
            </div>

            {/* Travel Stats Cards */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-[#F7F5F0] p-3.5 rounded-2xl border border-[#171A19]/06 text-center">
                <Heart className="w-4 h-4 text-[#2F6F68] mx-auto mb-1" />
                <div className="font-editorial text-lg font-bold text-[#171A19]">
                  {savedFavorites.length}
                </div>
                <div className="text-[10px] uppercase tracking-wider font-semibold text-[#68706D]">
                  Saved
                </div>
              </div>

              <div className="bg-[#F7F5F0] p-3.5 rounded-2xl border border-[#171A19]/06 text-center">
                <Compass className="w-4 h-4 text-[#D8B98A] mx-auto mb-1" />
                <div className="font-editorial text-lg font-bold text-[#171A19]">
                  {DESTINATIONS.length}
                </div>
                <div className="text-[10px] uppercase tracking-wider font-semibold text-[#68706D]">
                  Unlocked
                </div>
              </div>

              <div className="bg-[#F7F5F0] p-3.5 rounded-2xl border border-[#171A19]/06 text-center">
                <Sparkles className="w-4 h-4 text-[#2F6F68] mx-auto mb-1" />
                <div className="font-editorial text-lg font-bold text-[#171A19]">
                  PRO
                </div>
                <div className="text-[10px] uppercase tracking-wider font-semibold text-[#68706D]">
                  AI Tier
                </div>
              </div>
            </div>

            {/* Saved Favorite Destinations */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-bold text-[#171A19] uppercase tracking-wider flex items-center space-x-1.5">
                  <Bookmark className="w-3.5 h-3.5 text-[#2F6F68]" />
                  <span>Bookmarked Destinations ({savedFavorites.length})</span>
                </h4>
              </div>

              {favoriteDestinations.length > 0 ? (
                <div className="space-y-2 max-h-40 overflow-y-auto no-scrollbar">
                  {favoriteDestinations.map((dest) => (
                    <div
                      key={dest.id}
                      className="flex items-center justify-between p-2.5 rounded-2xl bg-[#F7F5F0] hover:bg-[#2F6F68]/10 transition-colors border border-[#171A19]/06"
                    >
                      <div className="flex items-center space-x-3">
                        <img
                          src={dest.image}
                          alt={dest.name}
                          className="w-10 h-10 rounded-xl object-cover"
                        />
                        <div>
                          <div className="text-xs font-bold text-[#171A19]">{dest.name}</div>
                          <div className="text-[10px] text-[#68706D]">{dest.country}</div>
                        </div>
                      </div>
                      <span className="text-[10px] font-semibold text-[#2F6F68] px-2.5 py-1 rounded-full bg-white">
                        {dest.duration}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-[#F7F5F0] text-center text-xs text-[#68706D] font-light">
                  No destinations saved yet. Explore and bookmark your favorite escapes!
                </div>
              )}
            </div>

            {/* Actions: Log Out */}
            <div className="pt-2 border-t border-[#171A19]/08 flex items-center justify-between">
              <span className="text-[10px] text-[#68706D]">
                Firebase Authenticated Session
              </span>
              <button
                onClick={logout}
                className="px-5 py-2.5 rounded-full bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold transition-colors flex items-center space-x-1.5 min-h-[40px]"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Log Out</span>
              </button>
            </div>

          </div>
        ) : (
          // ============================================================
          // VIEW 2: AUTHENTICATION FORM (SIGN IN / REGISTER)
          // ============================================================
          <div>
            
            {/* Header */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#2F6F68]/10 text-[#2F6F68] text-[10px] font-bold uppercase tracking-wider mb-2">
                <Compass className="w-3 h-3" />
                <span>FIREBASE AUTHENTICATION</span>
              </div>
              <h3 className="font-editorial text-3xl font-bold text-[#171A19]">
                {mode === 'login' ? 'Welcome Back' : 'Create Profile'}
              </h3>
              <p className="text-xs text-[#68706D] font-light mt-1">
                {mode === 'login'
                  ? 'Sign in to access your saved trips and personalized AI recommendations.'
                  : 'Join Aetheria to save itineraries and unlock AI travel planning.'}
              </p>
            </div>

            {/* Mode Switch Tabs */}
            <div className="flex bg-[#F7F5F0] p-1 rounded-full border border-[#171A19]/08 mb-6">
              <button
                type="button"
                onClick={() => setMode('login')}
                className={`flex-1 py-2 rounded-full text-xs font-bold transition-all ${
                  mode === 'login'
                    ? 'bg-white text-[#171A19] shadow-sm'
                    : 'text-[#68706D] hover:text-[#171A19]'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setMode('register')}
                className={`flex-1 py-2 rounded-full text-xs font-bold transition-all ${
                  mode === 'register'
                    ? 'bg-white text-[#171A19] shadow-sm'
                    : 'text-[#68706D] hover:text-[#171A19]'
                }`}
              >
                Create Account
              </button>
            </div>

            {/* Error & Success Feedback Alerts */}
            {authError && (
              <div className="p-3 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-700 mb-4 flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                <span>{authError}</span>
              </div>
            )}

            {successMessage && (
              <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-700 mb-4 flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                <span>{successMessage}</span>
              </div>
            )}

            {/* Google One-Tap Sign In */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={isSubmitting}
              className="w-full py-3 px-4 rounded-full bg-white hover:bg-[#F7F5F0] text-[#171A19] font-bold text-xs border border-[#171A19]/15 shadow-sm transition-all flex items-center justify-center space-x-3 mb-4 min-h-[44px]"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>

            {/* Divider */}
            <div className="flex items-center my-4">
              <div className="flex-grow border-t border-[#171A19]/10" />
              <span className="px-3 text-[10px] uppercase font-bold text-[#68706D]">
                or with email
              </span>
              <div className="flex-grow border-t border-[#171A19]/10" />
            </div>

            {/* Email Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5">
              {mode === 'register' && (
                <div>
                  <label className="text-[11px] font-bold text-[#171A19] block uppercase tracking-wider mb-1">
                    Your Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-[#68706D] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      placeholder="e.g. Niranjan M"
                      className="w-full bg-[#F7F5F0] border border-[#171A19]/10 rounded-full pl-10 pr-4 py-2.5 text-xs text-[#171A19] placeholder-[#68706D] focus:outline-none focus:border-[#2F6F68]"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="text-[11px] font-bold text-[#171A19] block uppercase tracking-wider mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#68706D] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full bg-[#F7F5F0] border border-[#171A19]/10 rounded-full pl-10 pr-4 py-2.5 text-xs text-[#171A19] placeholder-[#68706D] focus:outline-none focus:border-[#2F6F68]"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#171A19] block uppercase tracking-wider mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#68706D] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-[#F7F5F0] border border-[#171A19]/10 rounded-full pl-10 pr-4 py-2.5 text-xs text-[#171A19] placeholder-[#68706D] focus:outline-none focus:border-[#2F6F68]"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-full bg-[#2F6F68] hover:bg-[#265953] text-white font-bold text-xs shadow-md shadow-[#2F6F68]/20 transition-transform hover:scale-[1.02] flex items-center justify-center space-x-2 disabled:opacity-50 min-h-[44px]"
              >
                {isSubmitting ? (
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                ) : (
                  <span>{mode === 'login' ? 'Sign In to Account' : 'Create Profile'}</span>
                )}
              </button>
            </form>

            {/* Quick Demo Login Option */}
            <div className="mt-4 pt-3 border-t border-[#171A19]/08 text-center">
              <button
                type="button"
                onClick={handleDemoSignIn}
                className="text-xs text-[#2F6F68] hover:underline font-semibold"
              >
                ✨ Quick Demo Sign-In (1-Click Test Login)
              </button>
            </div>

          </div>
        )}

      </motion.div>
    </div>
  );
}
