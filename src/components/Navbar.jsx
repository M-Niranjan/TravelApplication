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
  Heart,
  Compass,
  ArrowRight
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
    { 
      path: '/destinations', 
      label: 'Destinations', 
      icon: <Compass className="w-4 h-4 text-blue-600" />,
      bg: 'bg-blue-50' 
    },
    { 
      path: '/places', 
      label: 'Tourist Places', 
      icon: <Landmark className="w-4 h-4 text-indigo-600" />,
      bg: 'bg-indigo-50' 
    },
    { 
      path: '/itinerary', 
      label: 'AI Trip Planner', 
      icon: <Calendar className="w-4 h-4 text-purple-600" />,
      bg: 'bg-purple-50' 
    },
    { 
      path: '/weather', 
      label: 'Live Weather', 
      icon: <CloudSun className="w-4 h-4 text-amber-500" />,
      bg: 'bg-amber-50' 
    },
    { 
      path: '/packing', 
      label: 'Packing List', 
      icon: <Luggage className="w-4 h-4 text-rose-500" />,
      bg: 'bg-rose-50' 
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
                <span className={active ? 'text-white' : ''}>{link.icon}</span>
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
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden p-2.5 rounded-full bg-white/95 hover:bg-white backdrop-blur-xl border border-slate-200/80 shadow-sm text-slate-800 min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
            aria-label="Open navigation menu"
          >
            <Menu className="w-5 h-5" />
          </motion.button>

        </div>

      </div>

      {/* ========================================================
          MOBILE NAVIGATION DRAWER WITH SOLID HIGH-CONTRAST SHEET
      ======================================================== */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex items-start justify-center p-4 overflow-y-auto">
            
            {/* 1. Full-Screen Dim Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-[#0F172A]/85 backdrop-blur-md cursor-pointer"
            />

            {/* 2. Solid High-Contrast Mobile Sheet */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: -20 }}
              transition={{ type: 'spring', stiffness: 320, damping: 28 }}
              className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-10 my-4 flex flex-col"
            >
              
              {/* Sheet Header */}
              <div className="bg-[#0F172A] text-white p-5 flex items-center justify-between border-b border-slate-800">
                <VoyagerLogo size="sm" showText={true} isLight={true} />

                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Sheet Content Area */}
              <div className="p-5 space-y-4 max-h-[75vh] overflow-y-auto no-scrollbar">
                
                {/* User Account / Profile Banner in Drawer */}
                <div 
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuthModal();
                  }}
                  className="p-3.5 rounded-2xl bg-slate-50 hover:bg-blue-50/50 border border-slate-200/80 flex items-center justify-between cursor-pointer transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    {user?.photoURL ? (
                      <img src={user.photoURL} alt="Avatar" className="w-10 h-10 rounded-xl object-cover border border-blue-600" />
                    ) : (
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-sm">
                        {user ? (user.displayName?.[0] || 'U').toUpperCase() : <User className="w-4 h-4" />}
                      </div>
                    )}
                    <div>
                      <span className="text-xs font-bold text-slate-900 block leading-tight">
                        {user ? (user.displayName || 'Travel Explorer') : 'Sign In / Register'}
                      </span>
                      <span className="text-[10px] text-slate-500">
                        {user ? `${savedFavorites.length} Saved Favorites · Settings` : 'Access your travel hub & favorites'}
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </div>

                {/* Primary Navigation Route Links with Solid White High Contrast */}
                <div className="space-y-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block px-1">
                    Explore Pages
                  </span>
                  
                  {navLinks.map((link) => {
                    const active = isActive(link.path);
                    return (
                      <Link
                        key={link.path}
                        to={link.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center justify-between p-3.5 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
                          active
                            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20'
                            : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-200/70'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                            active ? 'bg-white/20 text-white' : `${link.bg}`
                          }`}>
                            {React.cloneElement(link.icon, { className: active ? 'text-white w-4 h-4' : 'w-4 h-4' })}
                          </div>
                          <span>{link.label}</span>
                        </div>
                        <ChevronRight className={`w-4 h-4 ${active ? 'text-white' : 'text-slate-400'}`} />
                      </Link>
                    );
                  })}
                </div>

                {/* Location Quick Switcher */}
                <div className="pt-2">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenLocationModal();
                    }}
                    className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-blue-50/60 hover:bg-blue-50 border border-blue-200/70 text-xs font-bold text-slate-800 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center space-x-2.5">
                      <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center">
                        <MapPin className="w-3.5 h-3.5" />
                      </div>
                      <div className="text-left">
                        <span className="text-[10px] uppercase font-extrabold text-blue-600 block">Current Location</span>
                        <span className="text-xs text-slate-900 font-bold">{currentLocation ? currentLocation.name : 'Detect Location'}</span>
                      </div>
                    </div>
                    <span className="text-[10px] uppercase font-bold text-blue-600 bg-white px-2.5 py-1 rounded-full border border-blue-200 shadow-sm">
                      Change
                    </span>
                  </button>
                </div>

                {/* Launch Voyager AI Concierge Primary CTA */}
                <div className="pt-1">
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenAIChat();
                    }}
                    className="w-full flex items-center justify-center space-x-2 py-3.5 px-4 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-rose-500 text-white text-xs font-extrabold shadow-lg shadow-blue-500/25 cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>Launch Voyager AI Concierge</span>
                  </motion.button>
                </div>

              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
}
