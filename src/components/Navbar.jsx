import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Compass, 
  Menu, 
  X, 
  Sparkles, 
  CloudSun, 
  MapPin, 
  User, 
  Landmark, 
  Calendar, 
  Luggage,
  Heart,
  ChevronRight
} from 'lucide-react';
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

  // Lock background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  // Handle Escape key to close mobile menu
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
    { path: '/places', label: 'Tourist Places', icon: <Landmark className="w-3.5 h-3.5 text-[#24655D]" /> },
    { path: '/itinerary', label: 'AI Planner', icon: <Calendar className="w-3.5 h-3.5 text-[#24655D]" /> },
    { path: '/weather', label: 'Weather', icon: <CloudSun className="w-3.5 h-3.5 text-[#24655D]" /> },
    { path: '/packing', label: 'Packing', icon: <Luggage className="w-3.5 h-3.5 text-[#24655D]" /> }
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
      isScrolled ? 'glass-nav-light py-2.5 shadow-sm' : 'bg-transparent py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link 
          to="/" 
          className="flex items-center space-x-3 px-4 py-2 rounded-full bg-white/90 hover:bg-white backdrop-blur-xl border border-[#101413]/08 shadow-sm group focus:outline-none focus:ring-2 focus:ring-[#24655D] min-h-[44px] transition-all"
        >
          <div className="w-8 h-8 rounded-full bg-[#1B4944] text-white flex items-center justify-center shadow-md shadow-[#1B4944]/25 group-hover:scale-105 transition-transform">
            <Compass className="w-4 h-4 stroke-[2.2]" />
          </div>
          <div className="flex flex-col">
            <span className="font-editorial text-xl font-bold tracking-tight text-[#101413] leading-none">
              Aetheria
            </span>
            <span className="text-[9px] uppercase tracking-[0.2em] font-semibold text-[#8A9592] mt-0.5">
              Luxury Travel
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-1 bg-white/90 backdrop-blur-xl px-4 py-1.5 rounded-full border border-[#101413]/08 shadow-sm">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all min-h-[38px] flex items-center space-x-1.5 ${
                isActive(link.path)
                  ? 'bg-[#1B4944] text-white shadow-sm'
                  : 'text-[#586260] hover:text-[#101413] hover:bg-black/5'
              }`}
            >
              {link.icon}
              <span>{link.label}</span>
            </Link>
          ))}

          {/* AI Assistant Quick Pill */}
          <button
            onClick={onOpenAIChat}
            className="px-4 py-2 rounded-full text-xs font-bold text-[#1B4944] hover:bg-[#1B4944]/10 transition-all min-h-[38px] flex items-center space-x-1.5 cursor-pointer ml-1"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C29C61]" />
            <span>Ask AI</span>
          </button>
        </nav>

        {/* Right Actions: Location, Auth Profile, Mobile Menu */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          
          {/* Location Selector Pill */}
          <button
            onClick={onOpenLocationModal}
            className="hidden sm:flex items-center space-x-2 px-3.5 py-2 rounded-full bg-white/90 hover:bg-white backdrop-blur-xl border border-[#101413]/08 shadow-sm text-xs font-semibold text-[#101413] transition-all min-h-[44px]"
            title="Select or detect your location"
          >
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <MapPin className="w-3.5 h-3.5 text-[#24655D]" />
            <span className="max-w-[110px] truncate">
              {currentLocation ? currentLocation.name : 'Detect Location'}
            </span>
          </button>

          {/* Auth & Profile Avatar */}
          <button
            onClick={onOpenAuthModal}
            className="flex items-center space-x-2 px-3.5 py-2 rounded-full bg-white/90 hover:bg-white backdrop-blur-xl border border-[#101413]/08 shadow-sm transition-all min-h-[44px]"
            title={user ? `${user.displayName || 'Profile'} (${savedFavorites.length} saved)` : 'Sign In / Register'}
          >
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                alt="Profile"
                className="w-6 h-6 rounded-full object-cover border border-[#1B4944]"
              />
            ) : (
              <div className="w-6 h-6 rounded-full bg-[#1B4944]/10 text-[#1B4944] flex items-center justify-center font-bold text-[11px]">
                {user ? (user.displayName?.[0] || 'U').toUpperCase() : <User className="w-3.5 h-3.5" />}
              </div>
            )}
            <span className="text-xs font-semibold text-[#101413] hidden md:inline">
              {user ? (user.displayName?.split(' ')[0] || 'Account') : 'Sign In'}
            </span>
            {savedFavorites?.length > 0 && (
              <span className="w-4 h-4 rounded-full bg-rose-500 text-white font-bold text-[9px] flex items-center justify-center">
                {savedFavorites.length}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-full bg-white/90 hover:bg-white backdrop-blur-xl border border-[#101413]/08 shadow-sm text-[#101413] min-h-[44px] min-w-[44px] flex items-center justify-center transition-all"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>

      </div>

      {/* Mobile Drawer Navigation Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="lg:hidden fixed inset-x-4 top-20 bg-white/95 backdrop-blur-2xl rounded-3xl border border-[#101413]/10 shadow-2xl p-6 space-y-4 z-50 overflow-hidden"
          >
            <div className="space-y-1.5">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-semibold transition-all ${
                    isActive(link.path)
                      ? 'bg-[#1B4944] text-white shadow-sm'
                      : 'text-[#586260] hover:text-[#101413] hover:bg-black/5'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    {link.icon}
                    <span>{link.label}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 opacity-50" />
                </Link>
              ))}
            </div>

            {/* Mobile Actions: Location & AI */}
            <div className="pt-4 border-t border-[#101413]/08 space-y-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenLocationModal();
                }}
                className="w-full flex items-center justify-between px-4 py-3 rounded-2xl bg-[#F9F8F5] text-xs font-semibold text-[#101413]"
              >
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-[#24655D]" />
                  <span>{currentLocation ? currentLocation.name : 'Choose Location'}</span>
                </div>
                <span className="text-[10px] uppercase font-bold text-[#24655D]">Change</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAIChat();
                }}
                className="w-full flex items-center justify-center space-x-2 py-3.5 rounded-2xl bg-[#101413] text-white text-xs font-bold shadow-md"
              >
                <Sparkles className="w-4 h-4 text-[#C29C61]" />
                <span>✨ Launch AI Travel Assistant</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
