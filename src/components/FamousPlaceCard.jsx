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
      className="group rounded-3xl overflow-hidden glass-card-light hover:shadow-2xl hover:shadow-blue-500/15 hover:border-blue-400/30 transition-all duration-300 flex flex-col justify-between h-full cursor-pointer select-none bg-white border border-slate-200/80"
    >
      <div>
        {/* Dynamic Image with Hover Zoom */}
        <div className="relative h-48 w-full overflow-hidden bg-slate-100">
          <img
            src={place.image || FALLBACK_IMAGE}
            alt={place.name}
            onError={handleImageError}
            className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/80 via-transparent to-transparent group-hover:from-[#0F172A]/90 transition-colors" />
          
          {/* HD Category Badge */}
          <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-white/95 text-slate-900 backdrop-blur-md shadow-md border border-white/50">
            {place.category}
          </span>
        </div>

        {/* Place Information */}
        <div className="p-6">
          <h4 className="font-editorial text-2xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors leading-tight">
            {place.name}
          </h4>

          <p className="text-xs text-slate-600 leading-relaxed line-clamp-2 font-light">
            {place.description}
          </p>
        </div>
      </div>

      {/* Visit Duration & Action Footer */}
      <div className="px-6 pb-6 pt-0 flex items-center justify-between text-xs text-blue-600 font-bold border-t border-slate-100 mt-2">
        <div className="flex items-center space-x-1.5 pt-3">
          <div className="w-5 h-5 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
            <Clock className="w-3 h-3" />
          </div>
          <span className="text-slate-700">{place.duration || '1–2 hours'}</span>
        </div>

        <span className="inline-flex items-center space-x-1.5 text-blue-600 pt-3 group-hover:translate-x-1 transition-transform font-bold text-xs">
          <span>View Details</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </motion.div>
  );
}
