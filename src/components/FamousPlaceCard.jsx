import React from 'react';
import { Clock, ArrowRight, Sparkles, MapPin } from 'lucide-react';

export default function FamousPlaceCard({ place, onSelectPlace }) {
  return (
    <div 
      onClick={() => onSelectPlace && onSelectPlace(place)}
      className={`group rounded-3xl overflow-hidden glass-card-light hover:shadow-2xl transition-all duration-500 flex flex-col justify-between h-full bg-white border border-[#171A19]/08 ${onSelectPlace ? 'cursor-pointer' : ''}`}
    >
      <div>
        {/* Dynamic Image with Zoom on Hover */}
        <div className="relative h-52 w-full overflow-hidden">
          <img
            src={place.image}
            alt={place.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          
          {/* Category Badge (Top-Left) */}
          <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/90 text-[#171A19] backdrop-blur-md shadow-sm">
            {place.category}
          </span>

          {/* Highlight Badge (Bottom-Left on Image) */}
          {place.highlight && (
            <div className="absolute bottom-3 left-3 right-3 flex items-center space-x-1.5 text-white text-[11px] font-medium bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-xl border border-white/10">
              <Sparkles className="w-3 h-3 text-[#D8B98A] shrink-0" />
              <span className="truncate">{place.highlight}</span>
            </div>
          )}
        </div>

        {/* Place Information */}
        <div className="p-5">
          <h4 className="font-editorial text-2xl font-bold text-[#171A19] mb-2 group-hover:text-[#2F6F68] transition-colors leading-tight">
            {place.name}
          </h4>

          <p className="text-xs text-[#68706D] leading-relaxed line-clamp-2 font-light">
            {place.description}
          </p>
        </div>
      </div>

      {/* Visit Duration Footer */}
      <div className="px-5 pb-5 pt-0 flex items-center justify-between text-xs text-[#2F6F68] font-semibold border-t border-[#171A19]/06 mt-2">
        <div className="flex items-center space-x-1.5 pt-3">
          <Clock className="w-3.5 h-3.5 text-[#2F6F68]" />
          <span>{place.duration || '1–2 hours'}</span>
        </div>

        <span className="inline-flex items-center space-x-1 text-xs font-bold text-[#D8B98A] group-hover:text-[#2F6F68] pt-3 group-hover:translate-x-1 transition-all">
          <span>View Spot</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </div>
  );
}
