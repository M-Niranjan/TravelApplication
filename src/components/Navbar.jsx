import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  X, 
  Sparkles, 
  CloudSun, 
  MapPin, 
  User, 
  Landmark, 
  Calendar, 
  Luggage, 
  ChevronRight,
  Heart
} from 'lucide-react';
import VoyagerLogo from './VoyagerLogo';
import { useAuth } from '../context/AuthContext';

export default function Navbar({ onOpenAIChat, onOpenLocationModal, onOpenAuthModal, currentLocation }) {
  const { user, savedFavorites } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { path: '/destinations', label: 'Destinations', icon: null },
    { 
      path: '/places', 
      label: 'Tourist Places', 
      icon: <Landmark className="w-3.5 h-3.5 text-blue-500" /> 
    },
    { 
      path: '/itinerary', 
      label: 'AI Planner', 
      icon: <Calendar className="w-3.5 h-3.5 text-blue-500" /> 
    },
    { 
      path: '/weather', 
      label: 'Weather', 
      icon: <CloudSun className="w-3.5 h-3.5 text-amber-500" /> 
    },
    { 
      path: '/packing', 
      label: 'Packing', 
      icon: <Luggage className="w-3.5 h-3.5 text-rose-500" /> 
    }
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
      isScrolled ? 'glass-nav-light py-2.5 shadow-sm' : 'bg-transparent py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo with 3D Gradient Compass Rose */}
        <Link 
          to="/" 
          className="flex items-center px-3.5 py-1.5 rounded-full bg-white/95 hover:bg-white backdrop-blur-xl border border-slate-200/80 shadow-sm group focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[44px] transition-all"
        >
          <VoyagerLogo size="md" showText={true} />
        </Link>

        {/* Desktop Navigation Links with Spring Micro-Interactions */}
        <nav className="hidden lg:flex items-center space-x-1 bg-white/95 backdrop-blur-xl px-3.5 py-1.5 rounded-full border border-slate-200/80 shadow-sm">
          {navLinks.map((link) => {
            const active = isActive(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-4 py-2 rounded-full text-xs font-bold tracking-wide transition-all min-h-[38px] flex items-center space-x-1.5 ${
                  active
                    ? 'text-white'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                }`}
              >
                {active && (
                  <motion.div
                    layoutId="activeNavTab"
                    className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full shadow-md shadow-blue-500/30 -z-10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {link.icon && <span className={active ? 'text-white' : ''}>{link.icon}</span>}
                <span>{link.label}</span>
              </Link>
            );
          })}

          {/* Ask AI Pill Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onOpenAIChat}
            className="px-4 py-2 rounded-full text-xs font-bold bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 text-blue-700 transition-all min-h-[38px] flex items-center space-x-1.5 border border-blue-200/60 ml-1 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-rose-500 animate-pulse" />
            <span>Ask AI</span>
          </motion.button>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          
          {/* Location Selector Pill */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            onClick={onOpenLocationModal}
            className="hidden sm:flex items-center space-x-2 px-3.5 py-2 rounded-full bg-white/95 hover:bg-white backdrop-blur-xl border border-slate-200/80 shadow-sm text-xs font-bold text-slate-800 transition-all min-h-[44px]"
            title="Select or detect location"
          >
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <MapPin className="w-3.5 h-3.5 text-blue-600" />
            <span className="max-w-[110px] truncate">
              {currentLocation ? currentLocation.name : 'Location'}
            </span>
          </motion.button>

          {/* Auth & Favorites Pill */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            onClick={onOpenAuthModal}
            className="flex items-center space-x-2 px-3.5 py-2 rounded-full bg-white/95 hover:bg-white backdrop-blur-xl border border-slate-200/80 shadow-sm transition-all min-h-[44px]"
            title={user ? `${user.displayName || 'Profile'} (${savedFavorites.length} saved)` : 'Sign In'}
          >
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                alt="Profile"
                className="w-6 h-6 rounded-full object-cover border border-blue-600"
              />
            ) : (
              <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-[11px]">
                {user ? (user.displayName?.[0] || 'U').toUpperCase() : <User className="w-3.5 h-3.5" />}
              </div>
            )}
            <span className="text-xs font-bold text-slate-800 hidden md:inline">
              {user ? (user.displayName?.split(' ')[0] || 'Account') : 'Sign In'}
            </span>
            {savedFavorites?.length > 0 && (
              <span className="w-4 h-4 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white font-extrabold text-[9px] flex items-center justify-center shadow-sm">
                {savedFavorites.length}
              </span>
            )}
          </motion.button>

          {/* Mobile Hamburger Toggle */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-full bg-white/95 hover:bg-white backdrop-blur-xl border border-slate-200/80 shadow-sm text-slate-800 min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </motion.button>

        </div>

      </div>

      {/* Mobile Animated Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="lg:hidden fixed inset-x-4 top-20 bg-white/98 backdrop-blur-2xl rounded-3xl border border-slate-200/90 shadow-2xl p-6 space-y-4 z-50 overflow-hidden"
          >
            <div className="space-y-1.5">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-bold transition-all ${
                    isActive(link.path)
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    {link.icon}
                    <span>{link.label}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 opacity-50" />
                </Link>
              ))}
            </div>

            {/* Mobile Actions */}
            <div className="pt-4 border-t border-slate-100 space-y-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenLocationModal();
                }}
                className="w-full flex items-center justify-between px-4 py-3 rounded-2xl bg-slate-50 text-xs font-bold text-slate-800 border border-slate-200/60"
              >
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  <span>{currentLocation ? currentLocation.name : 'Choose Location'}</span>
                </div>
                <span className="text-[10px] uppercase font-bold text-blue-600">Change</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAIChat();
                }}
                className="w-full flex items-center justify-center space-x-2 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-rose-500 text-white text-xs font-bold shadow-lg shadow-blue-500/20"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>✨ Launch Voyager AI Assistant</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
