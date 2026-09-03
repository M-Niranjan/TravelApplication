import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, Sparkles, MapPin, CheckCircle, Compass, Camera } from 'lucide-react';

export default function TouristPlaceModal({ place, destination, isOpen, onClose, onAskAI }) {
  if (!isOpen || !place) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative bg-white rounded-3xl overflow-hidden shadow-2xl max-w-2xl w-full z-10 border border-[#171A19]/10"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/50 hover:bg-black/70 text-white backdrop-blur-md transition-colors min-h-[40px] min-w-[40px] flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Hero Image */}
          <div className="relative h-64 sm:h-72 w-full overflow-hidden">
            <img
              src={place.image}
              alt={place.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#101413]/90 via-[#101413]/30 to-transparent" />

            {/* Badges on Image */}
            <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
              <span className="px-3.5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/95 text-[#171A19] backdrop-blur-md shadow-sm">
                {place.category}
              </span>
              {destination && (
                <span className="px-3.5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#2F6F68] text-white backdrop-blur-md shadow-sm flex items-center space-x-1">
                  <MapPin className="w-3 h-3 text-[#D8B98A]" />
                  <span>{destination.name}, {destination.country}</span>
                </span>
              )}
            </div>

            {/* Title on Image */}
            <div className="absolute bottom-5 left-6 right-6 text-white z-10">
              <h3 className="font-editorial text-2xl sm:text-4xl font-bold tracking-tight mb-1">
                {place.name}
              </h3>
              {place.highlight && (
                <div className="flex items-center space-x-1.5 text-xs text-[#D8B98A] font-semibold">
                  <Sparkles className="w-3.5 h-3.5 shrink-0" />
                  <span>{place.highlight}</span>
                </div>
              )}
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-6 sm:p-8 space-y-6 bg-white">
            
            {/* Quick Metrics Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-2xl bg-[#F7F5F0] border border-[#171A19]/05">
                <span className="text-[10px] uppercase font-extrabold text-[#68706D] block mb-0.5">
                  VISIT TIME
                </span>
                <span className="text-xs font-bold text-[#171A19] flex items-center space-x-1">
                  <Clock className="w-3.5 h-3.5 text-[#2F6F68]" />
                  <span>{place.duration || '2–3 hours'}</span>
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#F7F5F0] border border-[#171A19]/05">
                <span className="text-[10px] uppercase font-extrabold text-[#68706D] block mb-0.5">
                  EXPERIENCE
                </span>
                <span className="text-xs font-bold text-[#2F6F68] flex items-center space-x-1">
                  <Camera className="w-3.5 h-3.5" />
                  <span>Must-Visit</span>
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#F7F5F0] border border-[#171A19]/05 col-span-2 sm:col-span-1">
                <span className="text-[10px] uppercase font-extrabold text-[#68706D] block mb-0.5">
                  BEST VIEW
                </span>
                <span className="text-xs font-bold text-[#171A19] flex items-center space-x-1">
                  <Compass className="w-3.5 h-3.5 text-[#D8B98A]" />
                  <span>Panoramic</span>
                </span>
              </div>
            </div>

            {/* Description */}
            <div>
              <h5 className="text-xs font-bold uppercase tracking-wider text-[#171A19] mb-2">
                About this landmark
              </h5>
              <p className="text-xs sm:text-sm text-[#68706D] leading-relaxed font-light">
                {place.description}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-end gap-3 border-t border-[#171A19]/08">
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#F7F5F0] hover:bg-slate-200 text-[#171A19] font-bold text-xs transition-colors min-h-[44px]"
              >
                Close
              </button>
              
              {onAskAI && (
                <button
                  onClick={() => {
                    onClose();
                    onAskAI(place);
                  }}
                  className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#2F6F68] hover:bg-[#265953] text-white font-bold text-xs shadow-md transition-transform hover:scale-105 flex items-center justify-center space-x-1.5 min-h-[44px]"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#D8B98A]" />
                  <span>Ask AI about {place.name}</span>
                </button>
              )}
            </div>

          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
