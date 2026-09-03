import React, { useState, useMemo } from 'react';
import SearchBar from '../components/SearchBar';
import Filters from '../components/Filters';
import DestinationGrid from '../components/DestinationGrid';
import { DESTINATIONS } from '../data/destinations';
import { Compass } from 'lucide-react';

export default function Destinations() {
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

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <span className="text-xs font-extrabold uppercase tracking-widest text-[#2F6F68] block mb-2">
          GLOBAL EXPLORER
        </span>
        <h1 className="font-editorial text-4xl sm:text-6xl font-bold text-[#171A19] tracking-tight mb-4">
          All Destinations
        </h1>
        <p className="text-sm sm:text-base text-[#68706D] font-light leading-relaxed">
          Browse world-class destinations with cinematic imagery, weather data, and cultural highlights.
        </p>
      </div>

      {/* Search & Filters */}
      <div className="space-y-6 mb-12">
        <div className="flex justify-center">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            onClear={() => setSearchQuery('')}
          />
        </div>

        <Filters
          selectedRegion={selectedRegion}
          onSelectRegion={setSelectedRegion}
          selectedType={selectedType}
          onSelectType={setSelectedType}
        />
      </div>

      {/* Grid */}
      <DestinationGrid
        destinations={filteredDestinations}
        onResetFilters={() => {
          setSearchQuery('');
          setSelectedRegion('All');
          setSelectedType('All Types');
        }}
      />

    </div>
  );
}
