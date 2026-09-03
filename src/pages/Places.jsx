import React, { useState, useMemo } from 'react';
import FamousPlaceCard from '../components/FamousPlaceCard';
import PlaceDetailModal from '../components/PlaceDetailModal';
import { DESTINATIONS } from '../data/destinations';
import { Landmark, Search } from 'lucide-react';

export default function Places({ onOpenAIChatWithDestination }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('All');
  const [selectedPlace, setSelectedPlace] = useState(null);

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

  const countries = useMemo(() => {
    return ['All', ...new Set(DESTINATIONS.map((d) => d.country))];
  }, []);

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
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider mb-3 border border-blue-200/60 shadow-sm">
          <Landmark className="w-3.5 h-3.5 text-rose-500" />
          <span>GLOBAL SIGHTS & ATTRACTIONS</span>
        </div>
        <h1 className="font-editorial text-4xl sm:text-6xl font-bold text-slate-900 tracking-tight mb-4">
          Tourist Places & Sights
        </h1>
        <p className="text-sm sm:text-base text-slate-600 font-light leading-relaxed">
          Click on any landmark to view detailed traveler guides, history, visiting hours, and AI assistance.
        </p>
      </div>

      {/* Filters & Search Row */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-luxury mb-12 space-y-5">
        
        {/* Search Input */}
        <div className="relative max-w-xl mx-auto">
          <Search className="w-4 h-4 text-blue-500 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search attractions by name, country (e.g. Matterhorn, Eiffel, Senso-ji)..."
            className="w-full pl-11 pr-4 py-3.5 rounded-full bg-slate-50 border border-slate-200 text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:border-blue-500 shadow-sm"
          />
        </div>

        {/* Country Filter Chips */}
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block mb-2.5 text-center">
            Filter by Country
          </span>
          <div className="flex items-center justify-center flex-wrap gap-2">
            {countries.map((country) => (
              <button
                key={country}
                onClick={() => setSelectedCountry(country)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  selectedCountry === country
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/25'
                    : 'bg-slate-50 text-slate-600 hover:text-slate-900 border border-slate-200/80'
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
        <div className="p-12 text-center bg-white rounded-3xl border border-slate-200/80 max-w-md mx-auto shadow-luxury">
          <p className="font-editorial text-2xl font-bold text-slate-900 mb-2">No tourist places found</p>
          <p className="text-xs text-slate-500 mb-5">Try searching for another country or landmark.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCountry('All');
            }}
            className="px-6 py-2.5 rounded-full bg-blue-600 text-white font-bold text-xs shadow-sm hover:bg-blue-700 transition-colors min-h-[44px] cursor-pointer"
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
