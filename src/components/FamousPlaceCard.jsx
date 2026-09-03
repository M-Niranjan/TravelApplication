import React from 'react';
import { Clock, ArrowRight, MapPin } from 'lucide-react';

export default function FamousPlaceCard({ place }) {
  return (
    <div className="group rounded-3xl overflow-hidden glass-card-light hover:shadow-lg transition-all duration-300 flex flex-col justify-between h-full">
      <div>
        {/* Dynamic Image */}
        <div className="relative h-48 w-full overflow-hidden">
          <img
            src={place.image}
            alt={place.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/90 text-[#171A19] backdrop-blur-md">
            {place.category}
          </span>
        </div>

        {/* Place Information */}
        <div className="p-6">
          <h4 className="font-editorial text-2xl font-bold text-[#171A19] mb-2 group-hover:text-[#2F6F68] transition-colors">
            {place.name}
          </h4>

          <p className="text-xs text-[#68706D] leading-relaxed line-clamp-2 font-light">
            {place.description}
          </p>
        </div>
      </div>

      {/* Visit Duration Footer */}
      <div className="px-6 pb-6 pt-0 flex items-center justify-between text-xs text-[#2F6F68] font-semibold border-t border-[#171A19]/05 mt-2">
        <div className="flex items-center space-x-1.5 pt-3">
          <Clock className="w-3.5 h-3.5 text-[#2F6F68]" />
          <span>{place.duration || '1–2 hours'}</span>
        </div>

        <span className="inline-flex items-center space-x-1 text-[#D8B98A] pt-3 group-hover:translate-x-1 transition-transform">
          <ArrowRight className="w-4 h-4 text-[#2F6F68]" />
        </span>
      </div>
    </div>
  );
}
