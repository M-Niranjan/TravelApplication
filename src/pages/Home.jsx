import React, { useState, useMemo } from 'react';
import Hero from '../components/Hero';
import SearchBar from '../components/SearchBar';
import Filters from '../components/Filters';
import DestinationGrid from '../components/DestinationGrid';
import FamousPlaceCard from '../components/FamousPlaceCard';
import WeatherCard from '../components/WeatherCard';
import ItineraryGenerator from '../components/ItineraryGenerator';
import PackingAssistant from '../components/PackingAssistant';
import { DESTINATIONS } from '../data/destinations';
import { Sparkles, MapPin, Landmark, Compass } from 'lucide-react';

export default function Home({ onOpenAIChat, currentLocation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [selectedType, setSelectedType] = useState('All Types');

  const filteredDestinations = useMemo(() => {
    return DESTINATIONS.filter((dest) => {
      const matchesSearch =
        !searchQuery ||
        dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesRegion = selectedRegion === 'All' || dest.region === selectedRegion;
      const matchesType = selectedType === 'All Types' || dest.tags.includes(selectedType);

      return matchesSearch && matchesRegion && matchesType;
    });
  }, [searchQuery, selectedRegion, selectedType]);

  // Aggregate famous places across top destinations
  const allFamousPlaces = useMemo(() => {
    return DESTINATIONS.flatMap((d) => d.places || []);
  }, []);

  return (
    <div className="space-y-20">
      
      {/* Hero Section */}
      <div className="no-print">
        <Hero onOpenAIChat={onOpenAIChat} />
      </div>

      {/* Weather Section for Visitor's Current Location */}
      <section id="weather" className="no-print max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <WeatherCard
          lat={currentLocation.lat}
          lon={currentLocation.lon}
          locationName={currentLocation.formattedName}
        />
      </section>

      {/* Destination Explorer Section */}
      <section id="explorer" className="no-print max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#2F6F68] block mb-2">
              DISCOVER DESTINATIONS
            </span>
            <h2 className="font-editorial text-4xl sm:text-5xl font-bold text-[#171A19] tracking-tight">
              Curated Escapes
            </h2>
          </div>

          {/* Search Bar Component */}
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            onClear={() => setSearchQuery('')}
          />
        </div>

        {/* Filters Bar */}
        <div className="mb-10">
          <Filters
            selectedRegion={selectedRegion}
            onSelectRegion={setSelectedRegion}
            selectedType={selectedType}
            onSelectType={setSelectedType}
          />
        </div>

        {/* Grid of Destination Cards */}
        <DestinationGrid
          destinations={filteredDestinations}
          onResetFilters={() => {
            setSearchQuery('');
            setSelectedRegion('All');
            setSelectedType('All Types');
          }}
        />

      </section>

      {/* Famous Places Showcase Section */}
      <section className="no-print bg-white py-20 border-y border-[#171A19]/06">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#2F6F68] block mb-2">
              NOTABLE LANDMARKS
            </span>
            <h2 className="font-editorial text-3xl sm:text-5xl font-bold text-[#171A19] tracking-tight mb-4">
              Famous Places Worth Visiting
            </h2>
            <p className="text-sm text-[#68706D] font-light">
              Explore historic monuments, architectural wonders, and natural sanctuaries with estimated visit durations.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {allFamousPlaces.slice(0, 8).map((place) => (
              <FamousPlaceCard key={place.id} place={place} />
            ))}
          </div>

        </div>
      </section>

      {/* AI Itinerary Generator Section */}
      <ItineraryGenerator />

      {/* Smart Packing Assistant Checklist */}
      <PackingAssistant />

    </div>
  );
}
