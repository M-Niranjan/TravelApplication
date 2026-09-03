import React, { useState, useMemo } from 'react';
import DestinationCard from './DestinationCard';
import { DESTINATIONS, CATEGORIES, CONTINENTS, COUNTRIES } from '../data/destinations';
import { createDynamicDestination } from '../services/dynamicDestinationService';
import { Filter, Search, SlidersHorizontal, Map, Sparkles, Globe, Loader2 } from 'lucide-react';

export default function DestinationExplorer({ onSelectDestination, searchQuery, selectedCategory, onSelectCategory, bookmarkedIds, onToggleBookmark, dynamicDestinations, onAddDynamicDestination }) {
  const [selectedContinent, setSelectedContinent] = useState('All Continents');
  const [selectedCountry, setSelectedCountry] = useState('All Countries');
  const [localSearch, setLocalSearch] = useState(searchQuery || '');
  const [sortBy, setSortBy] = useState('rating');
  const [isSearchingDynamic, setIsSearchingDynamic] = useState(false);

  // Combine static presets and dynamically searched destinations
  const allAvailableDestinations = useMemo(() => {
    const combined = [...DESTINATIONS];
    dynamicDestinations?.forEach((dyn) => {
      if (!combined.some((d) => d.id === dyn.id)) {
        combined.unshift(dyn);
      }
    });
    return combined;
  }, [dynamicDestinations]);

  // Filter and sort logic
  const filteredDestinations = useMemo(() => {
    return allAvailableDestinations.filter((dest) => {
      const matchesSearch = 
        !localSearch || 
        dest.name.toLowerCase().includes(localSearch.toLowerCase()) ||
        dest.country.toLowerCase().includes(localSearch.toLowerCase()) ||
        dest.description.toLowerCase().includes(localSearch.toLowerCase());

      const matchesCategory = selectedCategory === 'All Categories' || selectedCategory === 'All' || dest.category === selectedCategory;
      const matchesContinent = selectedContinent === 'All Continents' || selectedContinent === 'All' || dest.continent === selectedContinent;
      const matchesCountry = selectedCountry === 'All Countries' || dest.country.toLowerCase() === selectedCountry.toLowerCase();

      return matchesSearch && matchesCategory && matchesContinent && matchesCountry;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'temp') return b.avgTemp - a.avgTemp;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0;
    });
  }, [allAvailableDestinations, localSearch, selectedCategory, selectedContinent, selectedCountry, sortBy]);

  // Trigger dynamic search if no matches found in existing array
  const handleDynamicSearchTrigger = async () => {
    if (!localSearch || localSearch.trim().length < 2) return;
    setIsSearchingDynamic(true);

    try {
      const newDest = await createDynamicDestination(localSearch);
      if (newDest) {
        onAddDynamicDestination(newDest);
      }
    } catch (e) {
      console.error('Dynamic destination error:', e);
    } finally {
      setIsSearchingDynamic(false);
    }
  };

  return (
    <section id="explorer-section" className="py-20 relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-teal-400 mb-2 block flex items-center space-x-1.5">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Search & Select Any Global Location</span>
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Destination Explorer
          </h2>
        </div>

        <p className="text-sm text-slate-400 max-w-md mt-4 md:mt-0 font-light">
          Search <strong>any location worldwide</strong> in the search bar or select a specific <strong>Country</strong> from the list below.
        </p>
      </div>

      {/* Filter Toolbar */}
      <div className="glass-panel p-4 sm:p-6 rounded-3xl mb-10 border border-slate-800 shadow-xl space-y-4">
        
        {/* Top Controls: Search Bar & Dynamic Search Button */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleDynamicSearchTrigger();
              }}
              placeholder="Search ANY location or city worldwide (e.g. Barcelona, Sydney, Dubai, Rome)..."
              className="w-full bg-slate-900/90 border border-slate-700/80 rounded-full pl-10 pr-4 py-3 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-teal-500 shadow-inner"
            />
          </div>

          <button
            onClick={handleDynamicSearchTrigger}
            disabled={isSearchingDynamic || !localSearch.trim()}
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-slate-950 font-bold text-xs shadow-md shadow-teal-500/20 flex items-center justify-center space-x-2 transition-transform hover:scale-105 disabled:opacity-50 shrink-0"
          >
            {isSearchingDynamic ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Locating Worldwide...</span>
              </>
            ) : (
              <>
                <Globe className="w-4 h-4" />
                <span>Search Global Location</span>
              </>
            )}
          </button>
        </div>

        {/* Bottom Filter Controls: Category Chips, Country Select, Continent Select, Sort */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 pt-2 border-t border-slate-800/80">
          
          {/* Category Chips */}
          <div className="flex items-center space-x-1 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 no-scrollbar">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  (selectedCategory === cat || (selectedCategory === 'All' && cat === 'All Categories'))
                    ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-950 font-bold shadow-md shadow-teal-500/20' 
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Select Dropdowns */}
          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto justify-end">
            
            {/* Country Selector Dropdown */}
            <div className="relative">
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="bg-slate-900 border border-slate-700/80 rounded-full px-4 py-2.5 text-xs text-teal-300 font-bold focus:outline-none focus:border-teal-500 cursor-pointer shadow-md"
              >
                {COUNTRIES.map((cnt) => (
                  <option key={cnt} value={cnt} className="bg-slate-900 text-white font-normal">
                    Country: {cnt}
                  </option>
                ))}
              </select>
            </div>

            {/* Continent Dropdown */}
            <select
              value={selectedContinent}
              onChange={(e) => setSelectedContinent(e.target.value)}
              className="bg-slate-900 border border-slate-700/80 rounded-full px-4 py-2.5 text-xs text-slate-300 focus:outline-none focus:border-teal-500 cursor-pointer"
            >
              {CONTINENTS.map((cont) => (
                <option key={cont} value={cont} className="bg-slate-900 text-white">
                  Continent: {cont}
                </option>
              ))}
            </select>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-slate-900 border border-slate-700/80 rounded-full px-4 py-2.5 text-xs text-slate-300 focus:outline-none focus:border-teal-500 cursor-pointer"
            >
              <option value="rating" className="bg-slate-900 text-white">Sort: Highest Rated</option>
              <option value="temp" className="bg-slate-900 text-white">Sort: Warmest Climate</option>
              <option value="name" className="bg-slate-900 text-white">Sort: Alphabetical</option>
            </select>

          </div>

        </div>

      </div>

      {/* Grid of Destination Cards */}
      {filteredDestinations.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDestinations.map((dest) => (
            <DestinationCard
              key={dest.id}
              destination={dest}
              onSelect={onSelectDestination}
              isBookmarked={bookmarkedIds.includes(dest.id)}
              onToggleBookmark={onToggleBookmark}
            />
          ))}
        </div>
      ) : (
        /* Empty State with Dynamic Search Prompt */
        <div className="glass-panel p-12 rounded-3xl text-center max-w-lg mx-auto my-12">
          <div className="w-16 h-16 rounded-2xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center mx-auto mb-4 text-teal-400">
            <Globe className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Location Not Found in Presets</h3>
          <p className="text-xs text-slate-400 mb-6">
            Would you like us to generate a live destination profile for <strong className="text-teal-300 font-bold">"{localSearch}"</strong> with real weather, landmarks, and photos?
          </p>
          <div className="flex items-center justify-center space-x-3">
            <button
              onClick={handleDynamicSearchTrigger}
              disabled={isSearchingDynamic}
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-950 font-bold text-xs hover:scale-105 transition-transform"
            >
              {isSearchingDynamic ? 'Generating...' : `Fetch "${localSearch}" Live`}
            </button>
            <button
              onClick={() => {
                setLocalSearch('');
                setSelectedCategory('All Categories');
                setSelectedContinent('All Continents');
                setSelectedCountry('All Countries');
              }}
              className="px-5 py-2.5 rounded-full glass-card text-xs font-bold text-slate-300 hover:text-white"
            >
              Reset Filters
            </button>
          </div>
        </div>
      )}

    </section>
  );
}
