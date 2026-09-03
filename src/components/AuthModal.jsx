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
  ArrowRight,
  Settings,
  Sliders,
  Bell,
  Thermometer,
  DollarSign,
  Palmtree,
  Trash2,
  Check,
  Edit3,
  Save,
  Globe
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
    toggleFavorite,
    clearAllFavorites,
    preferences,
    updatePreferences,
    updateDisplayName,
    authError, 
    setAuthError 
  } = useAuth();

  // Mode for unauthenticated user: 'login' | 'register'
  const [authMode, setAuthMode] = useState('login');
  
  // Active Tab for authenticated user: 'profile' | 'settings' | 'favorites'
  const [activeTab, setActiveTab] = useState('profile');

  // Login form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Edit name state
  const [isEditingName, setIsEditingName] = useState(false);
  const [editNameInput, setEditNameInput] = useState('');
  const [settingsFeedback, setSettingsFeedback] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      setAuthError(null);
      setSuccessMessage('');
      setSettingsFeedback('');
      if (user) {
        setEditNameInput(user.displayName || '');
      }
    }
  }, [isOpen, user]);

  if (!isOpen) return null;

  const handleSubmitAuth = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setAuthError(null);

    try {
      if (authMode === 'login') {
        await loginWithEmail(email, password);
        setSuccessMessage('Welcome back!');
        setTimeout(() => setSuccessMessage(''), 1500);
      } else {
        await registerWithEmail(email, password, displayName);
        setSuccessMessage('Account created successfully!');
        setTimeout(() => setSuccessMessage(''), 1500);
      }
    } catch (err) {
      // Handled
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
      setTimeout(() => setSuccessMessage(''), 1500);
    } catch (err) {
      // Handled
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
      setTimeout(() => setSuccessMessage(''), 1500);
    } catch (err) {
      // Handled
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveName = async () => {
    if (!editNameInput.trim()) return;
    try {
      await updateDisplayName(editNameInput.trim());
      setIsEditingName(false);
      setSettingsFeedback('Profile name updated!');
      setTimeout(() => setSettingsFeedback(''), 2000);
    } catch (err) {
      setSettingsFeedback('Failed to update name');
    }
  };

  const handlePreferenceChange = (key, value) => {
    updatePreferences({ [key]: value });
    setSettingsFeedback('Preference saved!');
    setTimeout(() => setSettingsFeedback(''), 1500);
  };

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
          className="fixed inset-0 bg-[#0F172A]/85 backdrop-blur-md cursor-pointer"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 25 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 25 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="relative bg-white rounded-3xl max-w-xl w-full shadow-2xl overflow-hidden z-10 my-8 border border-slate-200 flex flex-col max-h-[90vh]"
        >
          
          {/* Header Banner */}
          <div className="bg-[#0F172A] text-white p-6 relative shrink-0">
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center space-x-3.5">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-rose-500 text-white flex items-center justify-center shadow-md shadow-blue-500/30">
                <Compass className="w-5 h-5 stroke-[2.4]" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] uppercase tracking-widest font-extrabold text-blue-400">
                    Aetheria Travel Club
                  </span>
                  {user && (
                    <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-[9px] font-extrabold">
                      EXPLORER
                    </span>
                  )}
                </div>
                <h3 className="font-editorial text-2xl font-bold">
                  {user ? 'Traveler Center' : 'Access Your Travel Hub'}
                </h3>
              </div>
            </div>

            {/* Navigation Tabs for Logged-In User */}
            {user && (
              <div className="flex items-center space-x-1 mt-5 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1.5 cursor-pointer ${
                    activeTab === 'profile'
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Profile</span>
                </button>

                <button
                  onClick={() => setActiveTab('settings')}
                  className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1.5 cursor-pointer ${
                    activeTab === 'settings'
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Settings className="w-3.5 h-3.5" />
                  <span>Settings</span>
                </button>

                <button
                  onClick={() => setActiveTab('favorites')}
                  className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1.5 cursor-pointer ${
                    activeTab === 'favorites'
                      ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Heart className="w-3.5 h-3.5" />
                  <span>Favorites ({savedFavorites.length})</span>
                </button>
              </div>
            )}
          </div>

          {/* Toast Feedback Notification */}
          {settingsFeedback && (
            <div className="bg-emerald-50 border-b border-emerald-200 text-emerald-800 px-6 py-2 text-xs font-bold flex items-center space-x-2 animate-fade-in shrink-0">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{settingsFeedback}</span>
            </div>
          )}

          {/* Modal Content Scrollable Area */}
          <div className="p-6 sm:p-8 space-y-6 overflow-y-auto flex-1 no-scrollbar">
            
            {/* ========================================================
                LOGGED-IN USER VIEW WITH 3 FUNCTIONAL TABS
            ======================================================== */}
            {user ? (
              <AnimatePresence mode="wait">
                
                {/* 1. PROFILE TAB */}
                {activeTab === 'profile' && (
                  <motion.div
                    key="tab-profile"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-6"
                  >
                    {/* User Overview Hero Card */}
                    <div className="p-5 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="relative">
                            {user.photoURL ? (
                              <img 
                                src={user.photoURL} 
                                alt="Avatar" 
                                className="w-16 h-16 rounded-2xl object-cover border-2 border-blue-600 shadow-md" 
                              />
                            ) : (
                              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-rose-500 text-white font-bold text-2xl flex items-center justify-center shadow-md">
                                {(user.displayName?.[0] || 'U').toUpperCase()}
                              </div>
                            )}
                            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center" title="Active">
                              <Check className="w-3 h-3 text-white stroke-[3]" />
                            </div>
                          </div>

                          <div>
                            {/* Editable Display Name */}
                            {!isEditingName ? (
                              <div className="flex items-center space-x-2">
                                <h4 className="font-bold text-base text-slate-900">{user.displayName || 'Travel Explorer'}</h4>
                                <button
                                  onClick={() => {
                                    setEditNameInput(user.displayName || '');
                                    setIsEditingName(true);
                                  }}
                                  className="p-1 rounded-lg hover:bg-slate-200 text-slate-400 hover:text-slate-800 transition-colors cursor-pointer"
                                  title="Edit Name"
                                >
                                  <Edit3 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            ) : (
                              <div className="flex items-center space-x-1.5 mt-1">
                                <input
                                  type="text"
                                  value={editNameInput}
                                  onChange={(e) => setEditNameInput(e.target.value)}
                                  className="px-2.5 py-1 rounded-xl bg-white border border-blue-400 text-xs font-bold text-slate-900 focus:outline-none"
                                  placeholder="Enter new name"
                                />
                                <button
                                  onClick={handleSaveName}
                                  className="p-1.5 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-colors cursor-pointer"
                                  title="Save Name"
                                >
                                  <Save className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => setIsEditingName(false)}
                                  className="p-1.5 rounded-xl bg-slate-200 text-slate-600 text-xs hover:bg-slate-300 transition-colors cursor-pointer"
                                  title="Cancel"
                                >
                                  <X className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            )}

                            <p className="text-xs text-slate-500 mt-0.5">{user.email}</p>
                            <span className="inline-block text-[10px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full mt-1.5 border border-blue-200/60">
                              Member since {user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : '2026'}
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={logout}
                          className="p-3 rounded-2xl bg-white hover:bg-rose-50 text-slate-400 hover:text-rose-600 border border-slate-200/80 transition-colors shadow-sm cursor-pointer"
                          title="Sign Out"
                        >
                          <LogOut className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Traveler Stats Ribbon */}
                    <div className="grid grid-cols-3 gap-3">
                      <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200/80 text-center">
                        <span className="text-[10px] uppercase font-bold text-blue-600 block mb-1">Saved Places</span>
                        <span className="font-editorial text-2xl font-bold text-slate-900">{savedFavorites.length}</span>
                      </div>

                      <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-200/80 text-center">
                        <span className="text-[10px] uppercase font-bold text-indigo-600 block mb-1">Destinations</span>
                        <span className="font-editorial text-2xl font-bold text-slate-900">{DESTINATIONS.length}</span>
                      </div>

                      <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-200/80 text-center">
                        <span className="text-[10px] uppercase font-bold text-rose-600 block mb-1">AI Assistant</span>
                        <span className="text-xs font-bold text-rose-700 mt-1 inline-block">Online</span>
                      </div>
                    </div>

                    {/* Passport Travel Status */}
                    <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-900 to-[#0F172A] text-white space-y-2 shadow-md">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] uppercase font-extrabold tracking-wider text-amber-300">
                          PASSPORT LEVEL
                        </span>
                        <span className="text-xs font-bold text-blue-300">Global Wanderer</span>
                      </div>
                      <p className="text-xs text-slate-300 font-light leading-relaxed">
                        You have access to real-time satellite meteorology radar, multi-day Gemini AI itinerary generation, and synchronized travel checklists.
                      </p>
                    </div>

                  </motion.div>
                )}

                {/* 2. SETTINGS & PREFERENCES TAB */}
                {activeTab === 'settings' && (
                  <motion.div
                    key="tab-settings"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-6"
                  >
                    
                    {/* Temperature Units Setting */}
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                          <Thermometer className="w-4 h-4" />
                        </div>
                        <div>
                          <h5 className="font-bold text-xs text-slate-900">Temperature Unit</h5>
                          <p className="text-[11px] text-slate-500">Choose preferred measurement unit</p>
                        </div>
                      </div>

                      <div className="flex rounded-xl bg-white p-1 border border-slate-200">
                        <button
                          onClick={() => handlePreferenceChange('tempUnit', 'C')}
                          className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            preferences.tempUnit === 'C' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600'
                          }`}
                        >
                          °C
                        </button>
                        <button
                          onClick={() => handlePreferenceChange('tempUnit', 'F')}
                          className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            preferences.tempUnit === 'F' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600'
                          }`}
                        >
                          °F
                        </button>
                      </div>
                    </div>

                    {/* Preferred Currency Setting */}
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
                          <DollarSign className="w-4 h-4" />
                        </div>
                        <div>
                          <h5 className="font-bold text-xs text-slate-900">Preferred Currency</h5>
                          <p className="text-[11px] text-slate-500">Destination budget estimations</p>
                        </div>
                      </div>

                      <select
                        value={preferences.currency}
                        onChange={(e) => handlePreferenceChange('currency', e.target.value)}
                        className="bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-800 focus:outline-none focus:border-blue-500 cursor-pointer"
                      >
                        <option value="USD">USD ($)</option>
                        <option value="EUR">EUR (€)</option>
                        <option value="GBP">GBP (£)</option>
                        <option value="JPY">JPY (¥)</option>
                        <option value="INR">INR (₹)</option>
                        <option value="AUD">AUD ($)</option>
                        <option value="CAD">CAD ($)</option>
                      </select>
                    </div>

                    {/* Default Travel Style Setting */}
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center">
                          <Palmtree className="w-4 h-4" />
                        </div>
                        <div>
                          <h5 className="font-bold text-xs text-slate-900">Default Travel Vibe</h5>
                          <p className="text-[11px] text-slate-500">AI itinerary default customization</p>
                        </div>
                      </div>

                      <select
                        value={preferences.travelStyle}
                        onChange={(e) => handlePreferenceChange('travelStyle', e.target.value)}
                        className="bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-800 focus:outline-none focus:border-blue-500 cursor-pointer"
                      >
                        <option value="Culture">🏛️ Culture</option>
                        <option value="Adventure">⚡ Adventure</option>
                        <option value="Relaxed">🏖️ Relaxed</option>
                        <option value="Food">🍜 Food & Wine</option>
                        <option value="Luxury">💎 Luxury</option>
                      </select>
                    </div>

                    {/* Smart Notifications & Switches */}
                    <div className="space-y-3">
                      <h5 className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                        Smart AI & Notification Preferences
                      </h5>

                      {/* Weather Alerts Toggle */}
                      <div className="p-3.5 rounded-2xl bg-white border border-slate-200 flex items-center justify-between">
                        <div className="flex items-center space-x-2.5">
                          <Bell className="w-4 h-4 text-blue-600" />
                          <span className="text-xs font-bold text-slate-800">Weather Radar & Climate Alerts</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handlePreferenceChange('weatherAlerts', !preferences.weatherAlerts)}
                          className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
                            preferences.weatherAlerts ? 'bg-blue-600' : 'bg-slate-300'
                          }`}
                        >
                          <motion.div
                            layout
                            className={`bg-white w-4 h-4 rounded-full shadow-md transform ${
                              preferences.weatherAlerts ? 'translate-x-5' : 'translate-x-0'
                            }`}
                          />
                        </button>
                      </div>

                      {/* AI Recommendations Toggle */}
                      <div className="p-3.5 rounded-2xl bg-white border border-slate-200 flex items-center justify-between">
                        <div className="flex items-center space-x-2.5">
                          <Sparkles className="w-4 h-4 text-rose-500" />
                          <span className="text-xs font-bold text-slate-800">AI Concierge Proactive Advice</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handlePreferenceChange('aiRecommendations', !preferences.aiRecommendations)}
                          className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
                            preferences.aiRecommendations ? 'bg-blue-600' : 'bg-slate-300'
                          }`}
                        >
                          <motion.div
                            layout
                            className={`bg-white w-4 h-4 rounded-full shadow-md transform ${
                              preferences.aiRecommendations ? 'translate-x-5' : 'translate-x-0'
                            }`}
                          />
                        </button>
                      </div>

                      {/* Offline Cache Toggle */}
                      <div className="p-3.5 rounded-2xl bg-white border border-slate-200 flex items-center justify-between">
                        <div className="flex items-center space-x-2.5">
                          <Globe className="w-4 h-4 text-emerald-600" />
                          <span className="text-xs font-bold text-slate-800">Auto-Save Itinerary Offline</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handlePreferenceChange('offlineCaching', !preferences.offlineCaching)}
                          className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
                            preferences.offlineCaching ? 'bg-blue-600' : 'bg-slate-300'
                          }`}
                        >
                          <motion.div
                            layout
                            className={`bg-white w-4 h-4 rounded-full shadow-md transform ${
                              preferences.offlineCaching ? 'translate-x-5' : 'translate-x-0'
                            }`}
                          />
                        </button>
                      </div>
                    </div>

                    {/* Data Actions: Clear Saved Favorites & Sign Out */}
                    <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          if (window.confirm('Clear all saved destination bookmarks?')) {
                            clearAllFavorites();
                            setSettingsFeedback('Saved bookmarks cleared!');
                            setTimeout(() => setSettingsFeedback(''), 2000);
                          }
                        }}
                        className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-bold flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5 text-slate-400" />
                        <span>Clear Saved Data</span>
                      </button>

                      <button
                        type="button"
                        onClick={logout}
                        className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-bold flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sign Out Account</span>
                      </button>
                    </div>

                  </motion.div>
                )}

                {/* 3. SAVED FAVORITES TAB */}
                {activeTab === 'favorites' && (
                  <motion.div
                    key="tab-favorites"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
                        Bookmarked Destinations ({savedFavorites.length})
                      </span>
                      {savedFavorites.length > 0 && (
                        <button
                          onClick={clearAllFavorites}
                          className="text-[11px] font-bold text-rose-500 hover:underline cursor-pointer"
                        >
                          Remove All
                        </button>
                      )}
                    </div>

                    {favoritedDestinations.length === 0 ? (
                      <div className="p-8 rounded-3xl bg-slate-50 text-center border border-dashed border-slate-200 space-y-3">
                        <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center mx-auto">
                          <Heart className="w-6 h-6" />
                        </div>
                        <h5 className="font-bold text-sm text-slate-800">No saved destinations yet</h5>
                        <p className="text-xs text-slate-500 max-w-xs mx-auto">
                          Tap the heart icon on any destination card while browsing to save your dream vacation spots here.
                        </p>
                        <Link
                          to="/destinations"
                          onClick={onClose}
                          className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-blue-600 text-white text-xs font-bold shadow-md shadow-blue-500/25"
                        >
                          <Compass className="w-3.5 h-3.5" />
                          <span>Explore Destinations</span>
                        </Link>
                      </div>
                    ) : (
                      <div className="space-y-2.5 max-h-72 overflow-y-auto no-scrollbar pr-1">
                        {favoritedDestinations.map((dest) => (
                          <div
                            key={dest.id}
                            className="p-3 rounded-2xl bg-slate-50 hover:bg-blue-50/50 border border-slate-200/80 transition-all flex items-center justify-between group"
                          >
                            <Link
                              to={`/destinations/${dest.id}`}
                              onClick={onClose}
                              className="flex items-center space-x-3.5 flex-1"
                            >
                              <img 
                                src={dest.image} 
                                alt={dest.name} 
                                className="w-12 h-12 rounded-xl object-cover shadow-sm" 
                              />
                              <div>
                                <span className="text-xs font-bold text-slate-900 block leading-tight">{dest.name}</span>
                                <span className="text-[10px] text-slate-500">{dest.country} · {dest.region}</span>
                              </div>
                            </Link>

                            <div className="flex items-center space-x-2">
                              <Link
                                to={`/destinations/${dest.id}`}
                                onClick={onClose}
                                className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-blue-600 text-xs font-bold hover:bg-blue-600 hover:text-white transition-colors"
                              >
                                View
                              </Link>

                              <button
                                onClick={() => toggleFavorite(dest.id)}
                                className="p-1.5 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-white transition-colors cursor-pointer"
                                title="Remove Bookmark"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}

              </AnimatePresence>
            ) : (
              /* ========================================================
                  UNAUTHENTICATED LOGIN / REGISTRATION VIEW
              ======================================================== */
              <div className="space-y-5">
                
                {/* Mode Tabs */}
                <div className="flex rounded-full bg-slate-100 p-1 border border-slate-200">
                  <button
                    onClick={() => setAuthMode('login')}
                    className={`flex-1 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      authMode === 'login' ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm' : 'text-slate-600'
                    }`}
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => setAuthMode('register')}
                    className={`flex-1 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      authMode === 'register' ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm' : 'text-slate-600'
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
                <form onSubmit={handleSubmitAuth} className="space-y-3.5">
                  {authMode === 'register' && (
                    <div>
                      <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider block mb-1">
                        Full Name
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          required
                          value={displayName}
                          onChange={(e) => setDisplayName(e.target.value)}
                          placeholder="Your Name"
                          className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider block mb-1">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider block mb-1">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs shadow-md shadow-blue-500/25 disabled:opacity-50 min-h-[44px] cursor-pointer"
                  >
                    {isSubmitting ? (
                      <Loader2 className="w-4 h-4 animate-spin mx-auto" />
                    ) : (
                      <span>{authMode === 'login' ? 'Sign In' : 'Create Free Account'}</span>
                    )}
                  </motion.button>
                </form>

                {/* Divider */}
                <div className="relative flex items-center justify-center">
                  <div className="border-t border-slate-200 w-full" />
                  <span className="bg-white px-3 text-[10px] uppercase font-bold text-slate-400 shrink-0">
                    Or Continue With
                  </span>
                </div>

                {/* 1-Tap Google & Quick Demo Sign In Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={handleGoogleSignIn}
                    disabled={isSubmitting}
                    className="p-2.5 rounded-2xl border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-800 flex items-center justify-center space-x-2 transition-all min-h-[42px] cursor-pointer"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.3 9 5 12 5z" />
                      <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z" />
                      <path fill="#FBBC05" d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3 0-.8.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12 0 14.8c0 2.8.7 5.1 1.9 7.5l3.7-2.9z" />
                      <path fill="#34A853" d="M12 23.5c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.3-6.4-5.2L1.9 16.5C3.7 20.2 7.5 23.5 12 23.5z" />
                    </svg>
                    <span>Google</span>
                  </motion.button>

                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={handleDemoSignIn}
                    disabled={isSubmitting}
                    className="p-2.5 rounded-2xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center space-x-1.5 transition-all min-h-[42px] cursor-pointer border border-blue-200/60"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-rose-500" />
                    <span>Demo Login</span>
                  </motion.button>
                </div>

              </div>
            )}

          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
