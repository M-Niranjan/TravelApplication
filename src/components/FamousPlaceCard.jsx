import React from 'react';
import { motion } from 'framer-motion';
import { Clock, ArrowRight, MapPin, Sparkles } from 'lucide-react';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=85&w=1200&auto=format&fit=crop';

export default function FamousPlaceCard({ place, onSelectPlace }) {
  const handleClick = () => {
    if (onSelectPlace) {
      onSelectPlace(place);
    }
  };

  const handleImageError = (e) => {
    e.target.src = FALLBACK_IMAGE;
  };

  return (
    <motion.div 
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      onClick={handleClick}
      className="group rounded-3xl overflow-hidden bg-white border border-slate-200/80 hover:border-slate-300 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_36px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col justify-between h-full cursor-pointer select-none"
    >
      <div>
        {/* Dynamic Image Container */}
        <div className="relative h-52 w-full overflow-hidden bg-slate-100">
          <img
            src={place.image || FALLBACK_IMAGE}
            alt={place.name}
            onError={handleImageError}
            className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700 ease-out"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
          
          {/* Category Badge */}
          <span className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-white/95 text-slate-900 backdrop-blur-md shadow-sm border border-white/60">
            {place.category}
          </span>

          {place.country && (
            <span className="absolute top-3.5 right-3.5 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-slate-950/70 backdrop-blur-md text-white shadow-sm flex items-center space-x-1">
              <MapPin className="w-2.5 h-2.5 text-amber-300" />
              <span>{place.country}</span>
            </span>
          )}
        </div>

        {/* Place Information */}
        <div className="p-5">
          <h4 className="font-editorial text-2xl font-bold text-slate-900 mb-1.5 group-hover:text-blue-600 transition-colors leading-tight">
            {place.name}
          </h4>

          <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 font-light">
            {place.description}
          </p>
        </div>
      </div>

      {/* Visit Duration & Action Footer */}
      <div className="px-5 pb-5 pt-0 flex items-center justify-between text-xs font-bold border-t border-slate-100 mt-2">
        <div className="flex items-center space-x-1.5 pt-3">
          <div className="w-5 h-5 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center">
            <Clock className="w-3 h-3" />
          </div>
          <span className="text-slate-600 text-[11px]">{place.duration || '1–2 hours'}</span>
        </div>

        <span className="inline-flex items-center space-x-1.5 text-slate-900 group-hover:text-blue-600 pt-3 group-hover:translate-x-1 transition-transform font-bold text-xs">
          <span>View Landmark</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </motion.div>
  );
}
