import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Clock, 
  MapPin, 
  Sparkles, 
  Compass, 
  Camera, 
  Ticket, 
  Lightbulb, 
  ArrowRight,
  Heart
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { DESTINATIONS } from '../data/destinations';
import { useAuth } from '../context/AuthContext';

export default function PlaceDetailModal({ place, onClose, onOpenAIChatWithDestination }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { savedFavorites, toggleFavorite } = useAuth();

  if (!place) return null;

  // Find parent destination reliably
  const parentDestination = DESTINATIONS.find((d) => 
    d.places?.some((p) => p.id === place.id || p.name?.toLowerCase() === place.name?.toLowerCase()) ||
    (place.destinationName && d.name.toLowerCase() === place.destinationName.toLowerCase()) ||
    (place.country && d.country.toLowerCase() === place.country.toLowerCase())
  ) || DESTINATIONS[0];

  const isSaved = savedFavorites.includes(place.id);

  const handleExploreDestination = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    onClose();
    if (parentDestination?.id) {
      navigate(`/destinations/${parentDestination.id}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleAskAI = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    onClose();
    if (onOpenAIChatWithDestination) {
      onOpenAIChatWithDestination(parentDestination);
    }
  };

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

        {/* Modal Window with Spring Entrance */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 25 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 25 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="relative bg-white rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden z-10 my-8 max-h-[90vh] flex flex-col pointer-events-auto border border-slate-200"
        >
          {/* Hero Image Section */}
          <div className="relative h-64 sm:h-72 w-full shrink-0 overflow-hidden bg-slate-100">
            <img
              src={place.image}
              alt={place.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = parentDestination?.image || 'https://images.unsplash.com/photo-1599661046289-e31897846e41?q=85&w=1200&auto=format&fit=crop';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/40 to-transparent" />

            {/* Close Button */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="absolute top-4 right-4 p-2.5 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-md transition-all shadow-md z-20 min-h-[40px] min-w-[40px] flex items-center justify-center cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </motion.button>

            {/* Category & Location Badges */}
            <div className="absolute top-4 left-4 flex items-center space-x-2 z-10">
              <span className="px-3.5 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-white/95 text-slate-900 backdrop-blur-md shadow-sm">
                {place.category || 'Landmark'}
              </span>
              <span className="px-3.5 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm flex items-center space-x-1.5">
                <MapPin className="w-3 h-3 text-amber-300" />
                <span>{parentDestination.name}, {parentDestination.country}</span>
              </span>
            </div>

            {/* Place Title in Overlay */}
            <div className="absolute bottom-5 left-6 right-6 text-white z-10">
              <span className="text-xs uppercase tracking-widest font-extrabold text-amber-300 block mb-1">
                {parentDestination.country}
              </span>
              <h3 className="font-editorial text-3xl sm:text-4xl font-bold tracking-tight drop-shadow-md">
                {place.name}
              </h3>
            </div>
          </div>

          {/* Modal Content Scrollable Area */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 no-scrollbar bg-slate-50/50">
            
            {/* Description */}
            <div>
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 mb-2">
                About this landmark
              </h4>
              <p className="text-sm text-slate-700 leading-relaxed font-light">
                {place.description}
              </p>
            </div>

            {/* Key Information Chips Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              
              <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
                <div className="flex items-center space-x-2 text-[10px] uppercase font-bold text-slate-500 mb-1">
                  <div className="w-5 h-5 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Clock className="w-3.5 h-3.5" />
                  </div>
                  <span>Duration</span>
                </div>
                <span className="text-xs sm:text-sm font-bold text-slate-900">
                  {place.duration || '1–2 hours'}
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
                <div className="flex items-center space-x-2 text-[10px] uppercase font-bold text-slate-500 mb-1">
                  <div className="w-5 h-5 rounded-md bg-amber-50 text-amber-600 flex items-center justify-center">
                    <Camera className="w-3.5 h-3.5" />
                  </div>
                  <span>Best Photo Time</span>
                </div>
                <span className="text-xs sm:text-sm font-bold text-slate-900">
                  Golden Hour / Morning
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm col-span-2 sm:col-span-1">
                <div className="flex items-center space-x-2 text-[10px] uppercase font-bold text-slate-500 mb-1">
                  <div className="w-5 h-5 rounded-md bg-rose-50 text-rose-600 flex items-center justify-center">
                    <Ticket className="w-3.5 h-3.5" />
                  </div>
                  <span>Experience</span>
                </div>
                <span className="text-xs sm:text-sm font-bold text-slate-900">
                  Sightseeing & Culture
                </span>
              </div>

            </div>

            {/* Insider Traveler Tip */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/80 text-amber-950 flex items-start space-x-3 shadow-sm">
              <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                <Lightbulb className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold block mb-0.5 text-amber-900">Traveler Tip</span>
                <p className="text-xs text-amber-800 leading-relaxed font-light">
                  Arrive early in the morning to beat the peak tourist queues and enjoy soft natural lighting for photography.
                </p>
              </div>
            </div>

          </div>

          {/* Modal Action Buttons Footer */}
          <div className="p-4 sm:p-6 bg-white border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
            
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              type="button"
              onClick={handleAskAI}
              className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-slate-900 hover:bg-black text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-sm cursor-pointer min-h-[44px]"
            >
              <Sparkles className="w-4 h-4 text-rose-400" />
              <span>Ask AI About {place.name}</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              type="button"
              onClick={handleExploreDestination}
              className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-md shadow-blue-500/25 cursor-pointer min-h-[44px]"
            >
              <span>Explore {parentDestination.name}</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>

          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
