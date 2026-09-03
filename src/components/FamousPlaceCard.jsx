import React from 'react';
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
    <div 
      onClick={handleClick}
      className="group rounded-3xl overflow-hidden glass-card-light hover:shadow-2xl hover:border-[#2F6F68]/30 transition-all duration-300 flex flex-col justify-between h-full cursor-pointer select-none"
    >
      <div>
        {/* Dynamic Image with Hover Zoom & Robust Error Fallback */}
        <div className="relative h-48 w-full overflow-hidden bg-slate-200">
          <img
            src={place.image || FALLBACK_IMAGE}
            alt={place.name}
            onError={handleImageError}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent group-hover:from-black/70 transition-colors" />
          
          <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/90 text-[#171A19] backdrop-blur-md shadow-sm">
            {place.category}
          </span>
        </div>

        {/* Place Information */}
        <div className="p-6">
          <h4 className="font-editorial text-2xl font-bold text-[#171A19] mb-2 group-hover:text-[#2F6F68] transition-colors leading-tight">
            {place.name}
          </h4>

          <p className="text-xs text-[#68706D] leading-relaxed line-clamp-2 font-light">
            {place.description}
          </p>
        </div>
      </div>

      {/* Visit Duration & Action Footer */}
      <div className="px-6 pb-6 pt-0 flex items-center justify-between text-xs text-[#2F6F68] font-semibold border-t border-[#171A19]/05 mt-2">
        <div className="flex items-center space-x-1.5 pt-3">
          <Clock className="w-3.5 h-3.5 text-[#2F6F68]" />
          <span>{place.duration || '1–2 hours'}</span>
        </div>

        <span className="inline-flex items-center space-x-1 text-[#2F6F68] pt-3 group-hover:translate-x-1 transition-transform font-bold text-xs">
          <span>View Details</span>
          <ArrowRight className="w-4 h-4 text-[#2F6F68]" />
        </span>
      </div>
    </div>
  );
}
