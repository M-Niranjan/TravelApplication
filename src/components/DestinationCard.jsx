import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Heart, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function DestinationCard({ destination }) {
  const { savedFavorites, toggleFavorite } = useAuth();
  const isSaved = savedFavorites.includes(destination.id);

  const handleHeartClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(destination.id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      className="h-full"
    >
      <Link 
        to={`/destinations/${destination.id}`}
        className="group relative block rounded-3xl overflow-hidden bg-white border border-slate-200/80 hover:border-slate-300 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_36px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col h-[410px]"
      >
        {/* Top Image Container */}
        <div className="relative w-full h-[240px] overflow-hidden bg-slate-100 shrink-0">
          <img
            src={destination.image}
            alt={destination.name}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-106"
            loading="lazy"
          />
          
          {/* Subtle natural bottom tint for photo depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10" />

          {/* Region Badge (Top-Left) */}
          <div className="absolute top-3.5 left-3.5 flex items-center space-x-2 z-10">
            <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-white/95 text-slate-900 backdrop-blur-md shadow-sm border border-white/60">
              {destination.region}
            </span>
          </div>

          {/* Bookmark Heart Button (Top-Right) */}
          <motion.button
            whileTap={{ scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            onClick={handleHeartClick}
            aria-label={isSaved ? 'Remove from saved' : 'Save to favorites'}
            className="absolute top-3.5 right-3.5 z-20 p-2.5 rounded-full bg-white/90 hover:bg-white text-slate-800 backdrop-blur-md shadow-sm transition-all min-h-[36px] min-w-[36px] flex items-center justify-center cursor-pointer border border-white/80"
          >
            <Heart 
              className={`w-4 h-4 transition-colors ${
                isSaved ? 'fill-rose-500 text-rose-500' : 'text-slate-600 hover:text-rose-500'
              }`} 
            />
          </motion.button>

          {/* Rating Badge (Bottom-Right of Image) */}
          <div className="absolute bottom-3 right-3 z-10 flex items-center space-x-1 px-2.5 py-1 rounded-full bg-slate-950/75 backdrop-blur-md text-white text-[11px] font-bold shadow-sm">
            <span className="text-amber-400 text-xs">★</span>
            <span>4.9</span>
          </div>
        </div>

        {/* Bottom Clean Luxury Metadata */}
        <div className="p-5 flex flex-col justify-between flex-1 bg-white">
          <div>
            <div className="flex items-center space-x-1.5 text-xs font-extrabold uppercase tracking-wider text-blue-600 mb-1">
              <MapPin className="w-3.5 h-3.5 text-blue-500" />
              <span>{destination.country}</span>
            </div>

            <h3 className="font-editorial text-2xl font-bold text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors duration-200">
              {destination.name}
            </h3>

            <p className="text-xs text-slate-500 font-light line-clamp-2 mt-1.5 leading-relaxed">
              {destination.description}
            </p>
          </div>

          {/* Footer Action */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between mt-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              {destination.places?.length || 5} Famous Sights
            </span>

            <span className="inline-flex items-center space-x-1.5 text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
              <span>Explore</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
