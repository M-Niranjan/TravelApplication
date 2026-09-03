import React, { useState, useMemo } from 'react';
import FamousPlaceCard from '../components/FamousPlaceCard';
import PlaceDetailModal from '../components/PlaceDetailModal';
import { DESTINATIONS } from '../data/destinations';
import { Landmark, Search } from 'lucide-react';

export default function Places({ onOpenAIChatWithDestination }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('All');
  const [selectedPlace, setSelectedPlace] = useState(null);

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

  // Extract unique countries
  const countries = useMemo(() => {
    return ['All', ...new Set(DESTINATIONS.map((d) => d.country))];
  }, []);

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

      return matchesSearch && matchesCountry;
    });
  }, [allPlaces, searchQuery, selectedCountry]);

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#1B4944]/10 text-[#1B4944] text-xs font-bold uppercase tracking-wider mb-3">
          <Landmark className="w-3.5 h-3.5 text-[#C29C61]" />
          <span>GLOBAL SIGHTS & ATTRACTIONS</span>
        </div>
        <h1 className="font-editorial text-4xl sm:text-6xl font-bold text-[#101413] tracking-tight mb-4">
          Tourist Places & Sights
        </h1>
        <p className="text-sm sm:text-base text-[#586260] font-light leading-relaxed">
          Click on any landmark to view detailed traveler guides, history, visiting hours, and AI assistance.
        </p>
      </div>

      {/* Filters & Search Row */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#101413]/08 shadow-luxury mb-12 space-y-5">
        
        {/* Search Input */}
        <div className="relative max-w-xl mx-auto">
          <Search className="w-4 h-4 text-[#8A9592] absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search attractions by name, country (e.g. Matterhorn, Eiffel, Senso-ji)..."
            className="w-full pl-11 pr-4 py-3.5 rounded-full bg-[#F9F8F5] border border-[#101413]/10 text-xs sm:text-sm font-semibold text-[#101413] focus:outline-none focus:border-[#1B4944] shadow-sm"
          />
        </div>

        {/* Country Filter Chips */}
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#8A9592] block mb-2.5 text-center">
            Filter by Country
          </span>
          <div className="flex items-center justify-center flex-wrap gap-2">
            {countries.map((country) => (
              <button
                key={country}
                onClick={() => setSelectedCountry(country)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  selectedCountry === country
                    ? 'bg-[#1B4944] text-white shadow-sm'
                    : 'bg-[#F9F8F5] text-[#586260] hover:text-[#101413] border border-[#101413]/06'
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
        <div className="p-12 text-center bg-white rounded-3xl border border-[#101413]/08 max-w-md mx-auto shadow-luxury">
          <p className="font-editorial text-2xl font-bold text-[#101413] mb-2">No tourist places found</p>
          <p className="text-xs text-[#586260] mb-5">Try searching for another country or landmark.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCountry('All');
            }}
            className="px-6 py-2.5 rounded-full bg-[#1B4944] text-white font-bold text-xs shadow-sm hover:bg-[#24655D] transition-colors min-h-[44px]"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPlaces.map((place) => (
            <FamousPlaceCard
              key={place.id}
              place={place}
              onSelectPlace={(p) => setSelectedPlace(p)}
            />
          ))}
        </div>
      )}

      {/* Interactive Place Detail Modal */}
      {selectedPlace && (
        <PlaceDetailModal
          place={selectedPlace}
          onClose={() => setSelectedPlace(null)}
          onOpenAIChatWithDestination={onOpenAIChatWithDestination}
        />
      )}

    </div>
  );
}
