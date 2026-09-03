import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Menu, X, Sparkles, CloudSun, MapPin, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar({ onOpenAIChat, onOpenLocationModal, onOpenAuthModal, currentLocation }) {
  const { user } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
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

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
      isScrolled ? 'glass-nav-light py-3 shadow-sm' : 'bg-transparent py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Travel Logo */}
        <Link 
          to="/" 
          className="flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full bg-white/90 hover:bg-white backdrop-blur-md border border-[#171A19]/10 shadow-sm group focus:outline-none focus:ring-2 focus:ring-[#2F6F68] min-h-[44px] transition-all"
        >
          <div className="w-8 h-8 rounded-full bg-[#2F6F68] text-white flex items-center justify-center shadow-md shadow-[#2F6F68]/20 group-hover:scale-105 transition-transform">
            <Compass className="w-4 h-4 stroke-[2.5]" />
          </div>
          <span className="font-editorial text-xl font-bold tracking-tight text-[#171A19] pr-1">
            Aetheria
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-1 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#171A19]/10 shadow-sm">
          <Link
            to="/destinations"
            className={`px-4 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all min-h-[44px] flex items-center ${
              isActive('/destinations')
                ? 'bg-[#2F6F68] text-white shadow-sm'
                : 'text-[#171A19] hover:text-[#2F6F68] hover:bg-black/5'
            }`}
          >
            Destinations
          </Link>

          <button
            onClick={() => {
              if (location.pathname !== '/') {
                navigate('/');
                setTimeout(() => {
                  document.getElementById('explorer')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 200);
              } else {
                document.getElementById('explorer')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }}
            className="px-4 py-2.5 rounded-full text-xs font-semibold text-[#171A19] hover:text-[#2F6F68] hover:bg-black/5 transition-all min-h-[44px] flex items-center cursor-pointer"
          >
            Explore
          </button>

          <button
            onClick={() => {
              if (location.pathname !== '/') {
                navigate('/');
                setTimeout(() => {
                  document.getElementById('weather')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 200);
              } else {
                document.getElementById('weather')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }}
            className="px-4 py-2.5 rounded-full text-xs font-semibold text-[#171A19] hover:text-[#2F6F68] hover:bg-black/5 transition-all min-h-[44px] flex items-center space-x-1.5 cursor-pointer"
          >
            <CloudSun className="w-3.5 h-3.5 text-[#2F6F68]" />
            <span>Weather</span>
          </button>

          <button
            onClick={() => {
              if (location.pathname !== '/') {
                navigate('/');
                setTimeout(() => {
                  document.getElementById('itinerary-builder')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 200);
              } else {
                document.getElementById('itinerary-builder')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }}
            className="px-4 py-2.5 rounded-full text-xs font-semibold text-[#171A19] hover:text-[#2F6F68] hover:bg-black/5 transition-all min-h-[44px] flex items-center cursor-pointer"
          >
            AI Planner
          </button>

          <button
            onClick={onOpenAIChat}
            className="px-4 py-2.5 rounded-full text-xs font-bold text-[#2F6F68] hover:bg-[#2F6F68]/10 transition-all min-h-[44px] flex items-center space-x-1.5 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#D8B98A]" />
            <span>Ask AI</span>
          </button>
        </nav>

        {/* Right Actions: Profile, Location & Mobile Toggle */}
        <div className="flex items-center space-x-2.5">
          
          {/* User Profile / Firebase Auth Trigger */}
          <button
            onClick={onOpenAuthModal}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-full text-xs font-bold border shadow-sm transition-all min-h-[44px] ${
              user
                ? 'bg-[#2F6F68] text-white border-[#2F6F68] hover:bg-[#265953]'
                : 'bg-white/90 hover:bg-white text-[#171A19] border-[#171A19]/10'
            }`}
            title={user ? 'View profile' : 'Sign in'}
          >
            {user ? (
              <>
                <img
                  src={user.photoURL}
                  alt={user.displayName}
                  className="w-5 h-5 rounded-full object-cover border border-white"
                />
                <span className="max-w-[80px] sm:max-w-[110px] truncate">{user.displayName.split(' ')[0]}</span>
              </>
            ) : (
              <>
                <User className="w-3.5 h-3.5 text-[#2F6F68]" />
                <span>Sign In</span>
              </>
            )}
          </button>

          {/* Location Badge Trigger */}
          <button
            onClick={onOpenLocationModal}
            className="hidden sm:flex items-center space-x-1.5 px-3.5 py-2 rounded-full bg-white/90 hover:bg-white text-xs font-semibold text-[#171A19] border border-[#171A19]/10 shadow-sm transition-all min-h-[44px]"
            title="Location settings"
          >
            <MapPin className="w-3.5 h-3.5 text-[#2F6F68]" />
            <span className="max-w-[90px] sm:max-w-[120px] truncate">{currentLocation?.city || 'Bengaluru'}</span>
          </button>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-3 rounded-full bg-white text-[#171A19] shadow-sm border border-[#171A19]/10 focus:outline-none min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Animated Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden fixed inset-x-0 top-[72px] bg-white/95 backdrop-blur-xl border-b border-[#171A19]/10 px-6 py-6 space-y-4 shadow-2xl z-40 max-h-[85vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#171A19]/08">
              <span className="text-xs font-bold uppercase tracking-widest text-[#2F6F68]">Navigation</span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-full hover:bg-gray-100 text-[#68706D]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <Link
              to="/destinations"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-3 rounded-2xl text-base font-bold text-[#171A19] hover:bg-[#2F6F68]/10 min-h-[44px] flex items-center"
            >
              Destinations
            </Link>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (location.pathname !== '/') {
                  navigate('/');
                  setTimeout(() => {
                    document.getElementById('explorer')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }, 200);
                } else {
                  document.getElementById('explorer')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              className="w-full text-left block px-4 py-3 rounded-2xl text-base font-bold text-[#171A19] hover:bg-[#2F6F68]/10 min-h-[44px] flex items-center"
            >
              Explore
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (location.pathname !== '/') {
                  navigate('/');
                  setTimeout(() => {
                    document.getElementById('weather')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }, 200);
                } else {
                  document.getElementById('weather')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              className="w-full text-left block px-4 py-3 rounded-2xl text-base font-bold text-[#171A19] hover:bg-[#2F6F68]/10 min-h-[44px] flex items-center space-x-2"
            >
              <CloudSun className="w-5 h-5 text-[#2F6F68]" />
              <span>Weather</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (location.pathname !== '/') {
                  navigate('/');
                  setTimeout(() => {
                    document.getElementById('itinerary-builder')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }, 200);
                } else {
                  document.getElementById('itinerary-builder')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              className="w-full text-left block px-4 py-3 rounded-2xl text-base font-bold text-[#171A19] hover:bg-[#2F6F68]/10 min-h-[44px] flex items-center"
            >
              AI Planner
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAIChat();
              }}
              className="w-full text-left px-5 py-3.5 rounded-2xl text-base font-bold text-[#2F6F68] bg-[#2F6F68]/10 flex items-center space-x-2.5 min-h-[44px]"
            >
              <Sparkles className="w-5 h-5 text-[#D8B98A]" />
              <span>Ask Travel AI</span>
            </button>

            {/* Mobile Profile & Location Action Buttons */}
            <div className="pt-2 border-t border-[#171A19]/08 space-y-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuthModal();
                }}
                className="w-full text-left px-4 py-3 rounded-2xl text-sm font-bold bg-[#F7F5F0] hover:bg-[#2F6F68]/10 text-[#171A19] flex items-center space-x-2.5 min-h-[44px]"
              >
                {user ? (
                  <>
                    <img
                      src={user.photoURL}
                      alt={user.displayName}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <span>Profile ({user.displayName})</span>
                  </>
                ) : (
                  <>
                    <User className="w-5 h-5 text-[#2F6F68]" />
                    <span>Sign In / Create Profile</span>
                  </>
                )}
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenLocationModal();
                }}
                className="w-full text-left px-4 py-3 rounded-2xl text-sm font-bold bg-[#F7F5F0] hover:bg-[#2F6F68]/10 text-[#171A19] flex items-center space-x-2.5 min-h-[44px]"
              >
                <MapPin className="w-5 h-5 text-[#2F6F68]" />
                <span>Current Location: {currentLocation?.city || 'Bengaluru'}</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
