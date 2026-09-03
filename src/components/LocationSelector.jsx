import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Navigation, Search, X, Check, MapPinOff } from 'lucide-react';
import { searchLocationByQuery } from '../services/location';

export default function LocationSelector({ isOpen, onClose, currentLocation, onRequestLocation, onSelectLocation, permissionState, isLocating, errorMessage }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // Close on Escape key press
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#101413]/70 backdrop-blur-md"
    >
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="relative w-full max-w-md bg-white p-6 sm:p-8 rounded-3xl shadow-2xl border border-[#101413]/10"
      >
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 text-[#8A9592] hover:text-[#101413] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Selected Location Pill */}
        <div className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-[#1B4944]/10 text-[#1B4944] text-xs font-bold mb-4">
          <MapPin className="w-3.5 h-3.5 text-[#1B4944]" />
          <span>{currentLocation.formattedName || 'Current Location'}</span>
        </div>

        {/* Title */}
        <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-[#101413] mb-2">
          Discover Places Near You
        </h3>
        <p className="text-xs text-[#586260] font-light leading-relaxed mb-6">
          Allow location access to get localized weather and travel recommendations.
        </p>

        {/* Permission Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-3 mb-6">
          <button
            onClick={onRequestLocation}
            disabled={isLocating}
            className="w-full sm:w-auto flex-1 py-3 px-5 rounded-full bg-[#1B4944] hover:bg-[#24655D] text-white font-bold text-xs shadow-md flex items-center justify-center space-x-2 transition-transform hover:scale-105 active:scale-95 min-h-[44px]"
          >
            <Navigation className={`w-4 h-4 ${isLocating ? 'animate-spin' : ''}`} />
            <span>{isLocating ? 'Locating...' : 'Allow GPS Location'}</span>
          </button>
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
          <label className="text-xs font-bold text-[#101413] block uppercase tracking-wider">
            Search Location Manually
          </label>
          <div className="relative">
            <Search className="w-4 h-4 text-[#8A9592] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search city or country (e.g. Paris, Tokyo, London)..."
              className="w-full bg-[#F9F8F5] border border-[#101413]/10 rounded-full pl-10 pr-4 py-2.5 text-xs text-[#101413] placeholder-[#8A9592] focus:outline-none focus:border-[#1B4944]"
            />
          </div>
          <button
            type="submit"
            disabled={isSearching || !searchQuery.trim()}
            className="w-full py-2.5 rounded-full bg-[#101413] hover:bg-black text-white font-bold text-xs transition-colors min-h-[40px]"
          >
            {isSearching ? 'Searching...' : 'Search Location'}
          </button>
        </form>

        {/* Search Results Dropdown List */}
        {searchResults.length > 0 && (
          <div className="mt-4 max-h-48 overflow-y-auto space-y-1 border-t border-[#101413]/08 pt-3 no-scrollbar">
            {searchResults.map((res) => (
              <button
                key={res.id}
                onClick={() => handlePickResult(res)}
                className="w-full text-left p-2.5 rounded-xl hover:bg-[#1B4944]/10 text-xs font-semibold text-[#101413] flex items-center justify-between transition-colors"
              >
                <span>{res.name}</span>
                <Check className="w-3.5 h-3.5 text-[#1B4944]" />
              </button>
            ))}
          </div>
        )}

      </motion.div>
    </div>
  );
}
