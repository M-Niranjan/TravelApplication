import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Compass, 
  Landmark, 
  Sparkles, 
  CloudSun, 
  User
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import AILogo from './AILogo';

export default function MobileBottomNav({ onOpenAIChat, onOpenAuthModal }) {
  const location = useLocation();
  const { user, savedFavorites } = useAuth();

  const isExploreActive = location.pathname === '/' || location.pathname === '/destinations';
  const isPlacesActive = location.pathname.startsWith('/places');
  const isPlannerActive = location.pathname.startsWith('/itinerary');
  const isWeatherActive = location.pathname.startsWith('/weather');

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0B132B] border-t border-slate-800 shadow-[0_-8px_30px_rgba(0,0,0,0.6)] px-2 py-1.5 pb-[max(0.6rem,env(safe-area-inset-bottom))]">
      <div className="flex items-center justify-around max-w-lg mx-auto relative">
        
        {/* 1. Explore Tab */}
        <Link
          to="/destinations"
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all relative flex-1 ${
            isExploreActive
              ? 'text-blue-400 font-bold'
              : 'text-slate-300 hover:text-white font-medium'
          }`}
        >
          {isExploreActive && (
            <motion.div
              layoutId="bottomNavActiveDot"
              className="absolute -top-1 w-6 h-1 rounded-full bg-gradient-to-r from-blue-400 to-indigo-400 shadow-md shadow-blue-500/50"
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
          )}
          <Compass className={`w-5 h-5 ${isExploreActive ? 'text-blue-400 stroke-[2.5]' : 'text-slate-300'}`} />
          <span className={`text-[11px] mt-1 tracking-tight ${isExploreActive ? 'text-blue-400 font-bold' : 'text-slate-300'}`}>
            Explore
          </span>
        </Link>

        {/* 2. Tourist Places Tab */}
        <Link
          to="/places"
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all relative flex-1 ${
            isPlacesActive
              ? 'text-blue-400 font-bold'
              : 'text-slate-300 hover:text-white font-medium'
          }`}
        >
          {isPlacesActive && (
            <motion.div
              layoutId="bottomNavActiveDot"
              className="absolute -top-1 w-6 h-1 rounded-full bg-gradient-to-r from-blue-400 to-indigo-400 shadow-md shadow-blue-500/50"
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
          )}
          <Landmark className={`w-5 h-5 ${isPlacesActive ? 'text-blue-400 stroke-[2.5]' : 'text-slate-300'}`} />
          <span className={`text-[11px] mt-1 tracking-tight ${isPlacesActive ? 'text-blue-400 font-bold' : 'text-slate-300'}`}>
            Places
          </span>
        </Link>

        {/* 3. Center Elevated AI Trip Planner Action Button */}
        <Link
          to="/itinerary"
          className="flex flex-col items-center justify-center -mt-6 px-1 flex-1 group"
        >
          <motion.div
            whileTap={{ scale: 0.9 }}
            className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-rose-500 flex items-center justify-center shadow-lg shadow-blue-500/40 border-2 border-[#0B132B] relative"
          >
            <Sparkles className="w-6 h-6 text-white animate-pulse" />
          </motion.div>
          <span className={`text-[11px] font-bold mt-1 tracking-tight ${isPlannerActive ? 'text-blue-400' : 'text-white'}`}>
            AI Plan
          </span>
        </Link>

        {/* 4. Weather Tab */}
        <Link
          to="/weather"
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all relative flex-1 ${
            isWeatherActive
              ? 'text-blue-400 font-bold'
              : 'text-slate-300 hover:text-white font-medium'
          }`}
        >
          {isWeatherActive && (
            <motion.div
              layoutId="bottomNavActiveDot"
              className="absolute -top-1 w-6 h-1 rounded-full bg-gradient-to-r from-blue-400 to-indigo-400 shadow-md shadow-blue-500/50"
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
          )}
          <CloudSun className={`w-5 h-5 ${isWeatherActive ? 'text-blue-400 stroke-[2.5]' : 'text-slate-300'}`} />
          <span className={`text-[11px] mt-1 tracking-tight ${isWeatherActive ? 'text-blue-400 font-bold' : 'text-slate-300'}`}>
            Weather
          </span>
        </Link>

        {/* 5. Profile & Settings Tab */}
        <button
          onClick={onOpenAuthModal}
          className="flex flex-col items-center justify-center py-1 px-2.5 rounded-xl text-slate-300 hover:text-white font-medium relative flex-1 cursor-pointer"
        >
          <div className="relative">
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                alt="Profile"
                className="w-5 h-5 rounded-full object-cover border-2 border-blue-400"
              />
            ) : (
              <User className="w-5 h-5 text-slate-300" />
            )}
            {savedFavorites?.length > 0 && (
              <span className="absolute -top-1.5 -right-2.5 min-w-[15px] h-[15px] px-1 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white font-extrabold text-[9px] flex items-center justify-center shadow-sm">
                {savedFavorites.length}
              </span>
            )}
          </div>
          <span className="text-[11px] mt-1 tracking-tight text-slate-300 font-medium">
            {user ? 'Account' : 'Profile'}
          </span>
        </button>

      </div>
    </div>
  );
}
