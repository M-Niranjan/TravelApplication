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
          className="fixed inset-0 bg-black/75 backdrop-blur-md cursor-pointer"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative bg-white rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden z-10 my-8 max-h-[90vh] flex flex-col pointer-events-auto"
        >
          {/* Hero Image Section */}
          <div className="relative h-64 sm:h-72 w-full shrink-0 overflow-hidden">
            <img
              src={place.image}
              alt={place.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#101413] via-[#101413]/40 to-transparent" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2.5 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-md transition-transform hover:scale-105 active:scale-95 shadow-md z-20"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Category & Location Badges */}
            <div className="absolute top-4 left-4 flex items-center space-x-2 z-10">
              <span className="px-3.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/90 backdrop-blur-md text-[#171A19] shadow-sm">
                {place.category || 'Landmark'}
              </span>
              <span className="px-3.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#2F6F68] text-white shadow-sm flex items-center space-x-1">
                <MapPin className="w-3 h-3 text-[#D8B98A]" />
                <span>{parentDestination.name}, {parentDestination.country}</span>
              </span>
            </div>

            {/* Place Title in Overlay */}
            <div className="absolute bottom-5 left-6 right-6 text-white z-10">
              <span className="text-xs uppercase tracking-widest font-semibold text-[#D8B98A] block mb-1">
                {parentDestination.country}
              </span>
              <h3 className="font-editorial text-3xl sm:text-4xl font-bold tracking-tight">
                {place.name}
              </h3>
            </div>
          </div>

          {/* Modal Content Scrollable Area */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 no-scrollbar">
            
            {/* Description */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#2F6F68] mb-2">
                About this landmark
              </h4>
              <p className="text-sm text-[#171A19] leading-relaxed font-light">
                {place.description}
              </p>
            </div>

            {/* Key Information Chips Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              
              <div className="p-3.5 rounded-2xl bg-[#F7F5F0] border border-[#171A19]/06">
                <span className="text-[10px] uppercase font-bold text-[#68706D] block mb-1 flex items-center space-x-1">
                  <Clock className="w-3.5 h-3.5 text-[#2F6F68]" />
                  <span>Duration</span>
                </span>
                <span className="text-xs sm:text-sm font-bold text-[#171A19]">
                  {place.duration || '1–2 hours'}
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#F7F5F0] border border-[#171A19]/06">
                <span className="text-[10px] uppercase font-bold text-[#68706D] block mb-1 flex items-center space-x-1">
                  <Camera className="w-3.5 h-3.5 text-[#2F6F68]" />
                  <span>Best Photo Time</span>
                </span>
                <span className="text-xs sm:text-sm font-bold text-[#171A19]">
                  Golden Hour / Morning
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#F7F5F0] border border-[#171A19]/06 col-span-2 sm:col-span-1">
                <span className="text-[10px] uppercase font-bold text-[#68706D] block mb-1 flex items-center space-x-1">
                  <Ticket className="w-3.5 h-3.5 text-[#2F6F68]" />
                  <span>Experience</span>
                </span>
                <span className="text-xs sm:text-sm font-bold text-[#171A19]">
                  Sightseeing & Culture
                </span>
              </div>

            </div>

            {/* Insider Traveler Tip */}
            <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/80 text-amber-900 flex items-start space-x-3">
              <Lightbulb className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-bold block mb-0.5">Traveler Tip</span>
                <p className="text-xs text-amber-800 leading-relaxed font-light">
                  Arrive early in the morning to beat the peak tourist queues and enjoy soft natural lighting for photography.
                </p>
              </div>
            </div>

          </div>

          {/* Modal Action Buttons Footer */}
          <div className="p-4 sm:p-6 bg-[#F7F5F0] border-t border-[#171A19]/08 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
            
            <button
              type="button"
              onClick={handleAskAI}
              className="w-full sm:w-auto px-5 py-3 rounded-full bg-[#101413] hover:bg-black text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-sm transition-transform active:scale-95 cursor-pointer min-h-[44px]"
            >
              <Sparkles className="w-4 h-4 text-[#D8B98A]" />
              <span>Ask AI About {place.name}</span>
            </button>

            <button
              type="button"
              onClick={handleExploreDestination}
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#2F6F68] hover:bg-[#265953] text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-sm transition-transform hover:scale-[1.02] active:scale-95 cursor-pointer min-h-[44px]"
            >
              <span>Explore {parentDestination.name}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
