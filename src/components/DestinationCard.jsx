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
        className="group relative block rounded-3xl overflow-hidden glass-card-light hover:shadow-2xl hover:shadow-blue-500/20 hover:border-blue-400/40 transition-all duration-300 flex flex-col h-[400px] bg-white"
      >
        {/* Destination Image with Hover Zoom */}
        <div className="relative w-full h-full overflow-hidden bg-slate-100">
          <img
            src={destination.image}
            alt={destination.name}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
            loading="lazy"
          />
          
          {/* Deep Gradient Overlays for Vivid High-Contrast Text */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/40 to-transparent group-hover:from-[#0F172A] transition-colors duration-300" />

          {/* Region Badge (Top-Left) with HD Gradient Container */}
          <div className="absolute top-4 left-4 flex items-center space-x-2 z-10">
            <span className="px-3.5 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-white/95 text-slate-900 backdrop-blur-md shadow-md border border-white/40">
              {destination.region}
            </span>
          </div>

          {/* Bookmark Heart Button (Top-Right) with Spring Physics */}
          <motion.button
            whileTap={{ scale: 0.8 }}
            whileHover={{ scale: 1.15 }}
            onClick={handleHeartClick}
            aria-label={isSaved ? 'Remove from saved' : 'Save to favorites'}
            className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md border border-white/20 text-white transition-all shadow-lg min-h-[40px] min-w-[40px] flex items-center justify-center cursor-pointer"
          >
            <motion.div
              animate={{ scale: isSaved ? [1, 1.4, 1] : 1 }}
              transition={{ duration: 0.3 }}
            >
              <Heart 
                className={`w-4 h-4 transition-colors ${
                  isSaved ? 'fill-rose-500 text-rose-500 drop-shadow-[0_0_8px_rgba(244,63,94,0.6)]' : 'text-white hover:text-rose-300'
                }`} 
              />
            </motion.div>
          </motion.button>

          {/* Destination Content Overlay (Bottom) */}
          <div className="absolute bottom-5 left-5 right-5 z-10 flex flex-col justify-end text-white">
            <span className="text-[11px] uppercase tracking-widest font-extrabold text-amber-300 mb-1">
              {destination.country}
            </span>

            {/* Title */}
            <h3 className="font-editorial text-2xl sm:text-3xl font-bold tracking-tight mb-2 group-hover:text-blue-200 transition-colors duration-300 drop-shadow-md">
              {destination.name}
            </h3>

            {/* Explore Footer Strip */}
            <div className="pt-2.5 border-t border-white/15 flex items-center justify-between">
              <span className="text-xs text-slate-300 font-light line-clamp-1 max-w-[170px]">
                {destination.description}
              </span>

              <span className="inline-flex items-center space-x-1.5 text-xs font-bold text-blue-300 group-hover:text-white transition-colors shrink-0">
                <span>Explore</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
