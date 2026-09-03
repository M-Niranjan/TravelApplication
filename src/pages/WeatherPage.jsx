import React, { useState } from 'react';
import WeatherCard from '../components/WeatherCard';
import { DESTINATIONS } from '../data/destinations';
import { CloudSun, MapPin } from 'lucide-react';

export default function WeatherPage({ currentLocation }) {
  const [selectedDestId, setSelectedDestId] = useState('current');

  const selectedDest = DESTINATIONS.find((d) => d.id === selectedDestId);

  const activeLat = selectedDestId === 'current'
    ? (currentLocation?.latitude || 12.9716)
    : (selectedDest?.latitude || 48.8566);

  const activeLon = selectedDestId === 'current'
    ? (currentLocation?.longitude || 77.5946)
    : (selectedDest?.longitude || 2.3522);

  const activeName = selectedDestId === 'current'
    ? (currentLocation?.city || 'Current Location')
    : (`${selectedDest.name}, ${selectedDest.country}`);

  return (
    <div className="pt-32 pb-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#1B4944]/10 text-[#1B4944] text-xs font-bold uppercase tracking-wider mb-3">
          <CloudSun className="w-3.5 h-3.5 text-[#C29C61]" />
          <span>SATELLITE CLIMATE & RADAR</span>
        </div>
        <h1 className="font-editorial text-4xl sm:text-6xl font-bold text-[#101413] tracking-tight mb-4">
          Global Weather
        </h1>
        <p className="text-sm sm:text-base text-[#586260] font-light">
          Check live climate conditions, real-time temperatures, and 3-day forecasts for your target destination.
        </p>
      </div>

      {/* Destination Selector Tabs */}
      <div className="bg-white p-4 rounded-3xl border border-[#101413]/08 shadow-luxury mb-10 flex items-center space-x-2 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setSelectedDestId('current')}
          className={`px-4 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center space-x-1.5 min-h-[40px] ${
            selectedDestId === 'current'
              ? 'bg-[#1B4944] text-white shadow-sm'
              : 'bg-[#F9F8F5] text-[#586260] hover:text-[#101413]'
          }`}
        >
          <MapPin className="w-3.5 h-3.5" />
          <span>My Location</span>
        </button>

        {DESTINATIONS.map((dest) => (
          <button
            key={dest.id}
            onClick={() => setSelectedDestId(dest.id)}
            className={`px-4 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all min-h-[40px] ${
              selectedDestId === dest.id
                ? 'bg-[#1B4944] text-white shadow-sm'
                : 'bg-[#F9F8F5] text-[#586260] hover:text-[#101413]'
            }`}
          >
            {dest.name}
          </button>
        ))}
      </div>

      {/* Weather Card Display */}
      <WeatherCard lat={activeLat} lon={activeLon} locationName={activeName} />

    </div>
  );
}
