import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Navigation, Search, X, Check, MapPinOff } from 'lucide-react';
import { searchLocationByQuery } from '../services/location';

export default function LocationSelector({ isOpen, onClose, currentLocation, onRequestLocation, onSelectLocation, permissionState, isLocating, errorMessage }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    const results = await searchLocationByQuery(searchQuery);
    setSearchResults(results);
    setIsSearching(false);
  };

  const handlePickResult = (result) => {
    onSelectLocation({
      city: result.cityName,
      country: result.countryName,
      formattedName: `${result.cityName}${result.countryName ? `, ${result.countryName}` : ''}`,
      lat: result.lat,
      lon: result.lon
    });
    onClose();
  };

  return (
    <div 
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0F172A]/80 backdrop-blur-md"
    >
      <motion.div 
        initial={{ opacity: 0, scale: 0.92, y: 25 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 25 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="relative w-full max-w-md bg-white p-6 sm:p-8 rounded-3xl shadow-2xl border border-slate-200"
      >
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-900 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Selected Location Pill */}
        <div className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-bold mb-4 border border-blue-200/60">
          <MapPin className="w-3.5 h-3.5 text-blue-600" />
          <span>{currentLocation.formattedName || 'Current Location'}</span>
        </div>

        {/* Title */}
        <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
          Discover Places Near You
        </h3>
        <p className="text-xs text-slate-600 font-light leading-relaxed mb-6">
          Allow location access to get localized weather and travel recommendations.
        </p>

        {/* Permission Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-3 mb-6">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            onClick={onRequestLocation}
            disabled={isLocating}
            className="w-full sm:w-auto flex-1 py-3 px-5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs shadow-md shadow-blue-500/25 flex items-center justify-center space-x-2 transition-transform min-h-[44px] cursor-pointer"
          >
            <Navigation className={`w-4 h-4 ${isLocating ? 'animate-spin' : ''}`} />
            <span>{isLocating ? 'Locating...' : 'Allow GPS Location'}</span>
          </motion.button>
        </div>

        {/* Denied State Error Handling */}
        {errorMessage && (
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 mb-6 flex items-start space-x-2.5">
            <MapPinOff className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong className="block font-bold">Location access wasn't granted.</strong>
              <span>No problem — search for a location manually below.</span>
            </div>
          </div>
        )}

        {/* Manual Location Search Form */}
        <form onSubmit={handleSearchSubmit} className="space-y-3">
          <label className="text-xs font-bold text-slate-900 block uppercase tracking-wider">
            Search Location Manually
          </label>
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search city or country (e.g. Paris, Tokyo, London)..."
              className="w-full bg-slate-50 border border-slate-200 rounded-full pl-10 pr-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            disabled={isSearching || !searchQuery.trim()}
            className="w-full py-2.5 rounded-full bg-slate-900 hover:bg-black text-white font-bold text-xs transition-colors min-h-[40px] cursor-pointer"
          >
            {isSearching ? 'Searching...' : 'Search Location'}
          </button>
        </form>

        {/* Search Results Dropdown List */}
        {searchResults.length > 0 && (
          <div className="mt-4 max-h-48 overflow-y-auto space-y-1 border-t border-slate-100 pt-3 no-scrollbar">
            {searchResults.map((res) => (
              <button
                key={res.id}
                onClick={() => handlePickResult(res)}
                className="w-full text-left p-2.5 rounded-xl hover:bg-blue-50 text-xs font-bold text-slate-800 flex items-center justify-between transition-colors cursor-pointer"
              >
                <span>{res.name}</span>
                <Check className="w-3.5 h-3.5 text-blue-600" />
              </button>
            ))}
          </div>
        )}

      </motion.div>
    </div>
  );
}
