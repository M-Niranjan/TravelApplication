import React, { useState, useMemo } from 'react';
import FamousPlaceCard from '../components/FamousPlaceCard';
import { DESTINATIONS } from '../data/destinations';
import { Landmark, Search, Filter } from 'lucide-react';

export default function Places() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Extract all places with destination context
  const allPlaces = useMemo(() => {
    return DESTINATIONS.flatMap((dest) =>
      (dest.places || []).map((place) => ({
        ...place,
        destinationName: dest.name,
        country: dest.country,
        region: dest.region
      }))
    );
  }, []);

  // Extract unique countries and categories
  const countries = useMemo(() => {
    return ['All', ...new Set(DESTINATIONS.map((d) => d.country))];
  }, []);

  const categories = useMemo(() => {
    return ['All', ...new Set(allPlaces.map((p) => p.category))];
  }, [allPlaces]);

  // Filter places
  const filteredPlaces = useMemo(() => {
    return allPlaces.filter((place) => {
      const matchesSearch =
        !searchQuery ||
        place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        place.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        place.destinationName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        place.country.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCountry = selectedCountry === 'All' || place.country === selectedCountry;
      const matchesCategory = selectedCategory === 'All' || place.category === selectedCategory;

      return matchesSearch && matchesCountry && matchesCategory;
    });
  }, [allPlaces, searchQuery, selectedCountry, selectedCategory]);

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#2F6F68]/10 text-[#2F6F68] text-xs font-bold uppercase tracking-wider mb-3">
          <Landmark className="w-3.5 h-3.5 text-[#D8B98A]" />
          <span>GLOBAL LANDMARKS & ATTRACTIONS</span>
        </div>
        <h1 className="font-editorial text-4xl sm:text-6xl font-bold text-[#171A19] tracking-tight mb-4">
          Tourist Places & Sights
        </h1>
        <p className="text-sm sm:text-base text-[#68706D] font-light leading-relaxed">
          Discover iconic historic monuments, alpine summits, holy shrines, and natural wonders across the globe.
        </p>
      </div>

      {/* Filters & Search Row */}
      <div className="bg-white p-6 rounded-3xl border border-[#171A19]/10 shadow-sm mb-10 space-y-4">
        
        {/* Search Input */}
        <div className="relative max-w-xl mx-auto">
          <Search className="w-4 h-4 text-[#68706D] absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search attractions by name, country (e.g., Switzerland, Matterhorn, Eiffel)..."
            className="w-full pl-11 pr-4 py-3 rounded-full bg-[#F7F5F0] border border-[#171A19]/10 text-xs sm:text-sm font-semibold text-[#171A19] focus:outline-none focus:border-[#2F6F68]"
          />
        </div>

        {/* Country Filter Chips */}
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#68706D] block mb-2 text-center">
            Filter by Country
          </span>
          <div className="flex items-center justify-center flex-wrap gap-2">
            {countries.map((country) => (
              <button
                key={country}
                onClick={() => setSelectedCountry(country)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  selectedCountry === country
                    ? 'bg-[#2F6F68] text-white shadow-sm'
                    : 'bg-[#F7F5F0] text-[#68706D] hover:text-[#171A19] border border-[#171A19]/06'
                }`}
              >
                {country}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* 4-Column Grid of Places */}
      {filteredPlaces.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-3xl border border-[#171A19]/10 max-w-md mx-auto">
          <p className="font-editorial text-2xl font-bold text-[#171A19] mb-2">No tourist places found</p>
          <p className="text-xs text-[#68706D] mb-4">Try searching for another country or landmark.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCountry('All');
              setSelectedCategory('All');
            }}
            className="px-6 py-2 rounded-full bg-[#2F6F68] text-white font-bold text-xs"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPlaces.map((place) => (
            <FamousPlaceCard key={place.id} place={place} />
          ))}
        </div>
      )}

    </div>
  );
}
