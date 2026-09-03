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
  Bookmark,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

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
      setSuccessMessage('Logged in with Google!');
      setTimeout(() => onClose(), 800);
    } catch (err) {
      // Error handled in AuthContext
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDemoSignIn = async () => {
    setIsSubmitting(true);
    setAuthError(null);
    try {
      await loginWithDemo();
      setSuccessMessage('Welcome Explorer!');
      setTimeout(() => onClose(), 600);
    } catch (err) {
      // Handled
    } finally {
      setIsSubmitting(false);
    }
  };

  // Saved destinations list
  const favoritedDestinations = DESTINATIONS.filter((d) => savedFavorites.includes(d.id));

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative bg-white rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden z-10 my-8 border border-[#101413]/10"
        >
          
          {/* Header Banner */}
          <div className="bg-[#101413] text-white p-6 relative">
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-[#1B4944] text-[#E0C89E] flex items-center justify-center shadow-md">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-widest font-extrabold text-[#E0C89E] block">
                  Aetheria Club
                </span>
                <h3 className="font-editorial text-2xl font-bold">
                  {user ? 'Traveler Profile' : 'Access Your Travel Hub'}
                </h3>
              </div>
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-6 sm:p-8 space-y-6">
            
            {/* If Logged In: Show Profile & Saved Destinations */}
            {user ? (
              <div className="space-y-6">
                
                {/* User Info Card */}
                <div className="p-4 rounded-2xl bg-[#F9F8F5] border border-[#101413]/06 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {user.photoURL ? (
                      <img src={user.photoURL} alt="Avatar" className="w-12 h-12 rounded-full object-cover border-2 border-[#1B4944]" />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-[#1B4944] text-[#E0C89E] font-bold text-lg flex items-center justify-center">
                        {(user.displayName?.[0] || 'U').toUpperCase()}
                      </div>
                    )}
                    <div>
                      <h4 className="font-bold text-sm text-[#101413]">{user.displayName || 'Travel Explorer'}</h4>
                      <p className="text-xs text-[#586260]">{user.email}</p>
                    </div>
                  </div>

                  <button
                    onClick={logout}
                    className="p-2.5 rounded-full bg-white hover:bg-rose-50 text-gray-500 hover:text-rose-600 border border-[#101413]/08 transition-colors"
                    title="Sign Out"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>

                {/* Saved Destinations Library */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#1B4944] flex items-center space-x-1.5">
                      <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                      <span>Saved Favorites ({savedFavorites.length})</span>
                    </span>
                  </div>

                  {favoritedDestinations.length === 0 ? (
                    <div className="p-6 rounded-2xl bg-[#F9F8F5] text-center border border-dashed border-[#101413]/10">
                      <p className="text-xs text-[#586260]">No saved destinations yet.</p>
                      <p className="text-[11px] text-[#8A9592] mt-1">Tap the heart on any destination card to bookmark it here.</p>
                    </div>
                  ) : (
                    <div className="space-y-2 max-h-48 overflow-y-auto no-scrollbar">
                      {favoritedDestinations.map((dest) => (
                        <Link
                          key={dest.id}
                          to={`/destinations/${dest.id}`}
                          onClick={onClose}
                          className="p-2.5 rounded-2xl bg-[#F9F8F5] hover:bg-[#1B4944]/08 border border-[#101413]/06 transition-colors flex items-center justify-between group"
                        >
                          <div className="flex items-center space-x-3">
                            <img src={dest.image} alt={dest.name} className="w-10 h-10 rounded-xl object-cover" />
                            <div>
                              <span className="text-xs font-bold text-[#101413] block leading-tight">{dest.name}</span>
                              <span className="text-[10px] text-[#586260]">{dest.country}</span>
                            </div>
                          </div>
                          <ArrowRight className="w-4 h-4 text-[#1B4944] group-hover:translate-x-1 transition-transform mr-2" />
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

              </div>
            ) : (
              /* If Not Logged In: Login/Register Form */
              <div className="space-y-5">
                
                {/* Mode Tabs */}
                <div className="flex rounded-full bg-[#F9F8F5] p-1 border border-[#101413]/06">
                  <button
                    onClick={() => setMode('login')}
                    className={`flex-1 py-2 rounded-full text-xs font-bold transition-all ${
                      mode === 'login' ? 'bg-[#1B4944] text-white shadow-sm' : 'text-[#586260]'
                    }`}
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => setMode('register')}
                    className={`flex-1 py-2 rounded-full text-xs font-bold transition-all ${
                      mode === 'register' ? 'bg-[#1B4944] text-white shadow-sm' : 'text-[#586260]'
                    }`}
                  >
                    Create Account
                  </button>
                </div>

                {/* Notifications */}
                {authError && (
                  <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 text-xs flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>{authError}</span>
                  </div>
                )}

                {successMessage && (
                  <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{successMessage}</span>
                  </div>
                )}

                {/* Email Password Form */}
                <form onSubmit={handleSubmit} className="space-y-3.5">
                  {mode === 'register' && (
                    <div>
                      <label className="text-[10px] font-bold text-[#1B4944] uppercase tracking-wider block mb-1">
                        Full Name
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-[#8A9592] absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          required
                          value={displayName}
                          onChange={(e) => setDisplayName(e.target.value)}
                          placeholder="Your Name"
                          className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-[#F9F8F5] border border-[#101413]/10 text-xs font-medium text-[#101413] focus:outline-none focus:border-[#1B4944]"
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="text-[10px] font-bold text-[#1B4944] uppercase tracking-wider block mb-1">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-[#8A9592] absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-[#F9F8F5] border border-[#101413]/10 text-xs font-medium text-[#101413] focus:outline-none focus:border-[#1B4944]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-[#1B4944] uppercase tracking-wider block mb-1">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-[#8A9592] absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-[#F9F8F5] border border-[#101413]/10 text-xs font-medium text-[#101413] focus:outline-none focus:border-[#1B4944]"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-full bg-[#1B4944] hover:bg-[#24655D] text-white font-bold text-xs shadow-md transition-transform active:scale-95 disabled:opacity-50 min-h-[44px]"
                  >
                    {isSubmitting ? (
                      <Loader2 className="w-4 h-4 animate-spin mx-auto" />
                    ) : (
                      <span>{mode === 'login' ? 'Sign In' : 'Create Free Account'}</span>
                    )}
                  </button>
                </form>

                {/* Divider */}
                <div className="relative flex items-center justify-center">
                  <div className="border-t border-[#101413]/10 w-full" />
                  <span className="bg-white px-3 text-[10px] uppercase font-bold text-[#8A9592] shrink-0">
                    Or Continue With
                  </span>
                </div>

                {/* 1-Tap Google & Quick Demo Sign In Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={handleGoogleSignIn}
                    disabled={isSubmitting}
                    className="p-2.5 rounded-2xl border border-[#101413]/10 hover:bg-[#F9F8F5] text-xs font-bold text-[#101413] flex items-center justify-center space-x-2 transition-all min-h-[42px]"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.3 9 5 12 5z" />
                      <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z" />
                      <path fill="#FBBC05" d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3 0-.8.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12 0 14.8c0 2.8.7 5.1 1.9 7.5l3.7-2.9z" />
                      <path fill="#34A853" d="M12 23.5c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.3-6.4-5.2L1.9 16.5C3.7 20.2 7.5 23.5 12 23.5z" />
                    </svg>
                    <span>Google</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleDemoSignIn}
                    disabled={isSubmitting}
                    className="p-2.5 rounded-2xl bg-[#1B4944]/10 hover:bg-[#1B4944]/15 text-[#1B4944] text-xs font-bold flex items-center justify-center space-x-1.5 transition-all min-h-[42px]"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#C29C61]" />
                    <span>Demo Login</span>
                  </button>
                </div>

              </div>
            )}

          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
