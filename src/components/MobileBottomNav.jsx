import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Compass, 
  Landmark, 
  Sparkles, 
  CloudSun, 
  User, 
  Calendar,
  Heart
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function MobileBottomNav({ onOpenAIChat, onOpenAuthModal }) {
  const location = useLocation();
  const { user, savedFavorites } = useAuth();

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/' || location.pathname === '/destinations';
    return location.pathname.startsWith(path);
  };

  const navItems = [
    {
      id: 'explore',
      label: 'Explore',
      path: '/destinations',
      icon: <Compass className="w-5 h-5" />
    },
    {
      id: 'places',
      label: 'Places',
      path: '/places',
      icon: <Landmark className="w-5 h-5" />
    },
    {
      id: 'planner',
      label: 'AI Plan',
      path: '/itinerary',
      isCenterAction: true,
      icon: <Sparkles className="w-5 h-5 text-white" />
    },
    {
      id: 'weather',
      label: 'Weather',
      path: '/weather',
      icon: <CloudSun className="w-5 h-5" />
    }
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0F172A]/98 backdrop-blur-2xl border-t border-slate-800 shadow-[0_-10px_25px_rgba(0,0,0,0.5)] px-3 py-2 pb-[max(0.6rem,env(safe-area-inset-bottom))]">
      <div className="flex items-center justify-around max-w-md mx-auto relative">
        
        {/* 1. Explore Tab */}
        <Link
          to="/destinations"
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition-all relative ${
            isActive('/destinations') || location.pathname === '/'
              ? 'text-blue-400 font-bold'
              : 'text-slate-400 hover:text-white font-medium'
          }`}
        >
          {(isActive('/destinations') || location.pathname === '/') && (
            <motion.div
              layoutId="bottomNavPill"
              className="absolute -top-1 w-8 h-1 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 shadow-glow-azure"
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
          )}
          <Compass className="w-5 h-5" />
          <span className="text-[10px] mt-1 tracking-tight">Explore</span>
        </Link>

        {/* 2. Tourist Places Tab */}
        <Link
          to="/places"
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition-all relative ${
            isActive('/places')
              ? 'text-blue-400 font-bold'
              : 'text-slate-400 hover:text-white font-medium'
          }`}
        >
          {isActive('/places') && (
            <motion.div
              layoutId="bottomNavPill"
              className="absolute -top-1 w-8 h-1 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 shadow-glow-azure"
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
          )}
          <Landmark className="w-5 h-5" />
          <span className="text-[10px] mt-1 tracking-tight">Places</span>
        </Link>

        {/* 3. Center Elevated AI Trip Planner Button */}
        <Link
          to="/itinerary"
          className="flex flex-col items-center justify-center -mt-5 group"
        >
          <motion.div
            whileTap={{ scale: 0.9 }}
            className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-rose-500 flex items-center justify-center shadow-lg shadow-blue-500/40 border-2 border-[#0F172A] relative"
          >
            <Sparkles className="w-6 h-6 text-white animate-pulse" />
          </motion.div>
          <span className="text-[10px] font-bold text-white mt-0.5 tracking-tight">AI Plan</span>
        </Link>

        {/* 4. Weather Tab */}
        <Link
          to="/weather"
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition-all relative ${
            isActive('/weather')
              ? 'text-blue-400 font-bold'
              : 'text-slate-400 hover:text-white font-medium'
          }`}
        >
          {isActive('/weather') && (
            <motion.div
              layoutId="bottomNavPill"
              className="absolute -top-1 w-8 h-1 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 shadow-glow-azure"
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
          )}
          <CloudSun className="w-5 h-5" />
          <span className="text-[10px] mt-1 tracking-tight">Weather</span>
        </Link>

        {/* 5. Profile & Settings Tab */}
        <button
          onClick={onOpenAuthModal}
          className="flex flex-col items-center justify-center py-1 px-3 rounded-2xl text-slate-400 hover:text-white font-medium relative cursor-pointer"
        >
          <div className="relative">
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                alt="Profile"
                className="w-5 h-5 rounded-full object-cover border border-blue-400"
              />
            ) : (
              <User className="w-5 h-5" />
            )}
            {savedFavorites?.length > 0 && (
              <span className="absolute -top-1.5 -right-2 w-3.5 h-3.5 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white font-extrabold text-[8px] flex items-center justify-center">
                {savedFavorites.length}
              </span>
            )}
          </div>
          <span className="text-[10px] mt-1 tracking-tight">
            {user ? 'Account' : 'Profile'}
          </span>
        </button>

      </div>
    </div>
  );
}
