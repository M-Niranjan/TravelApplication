import React, { useState } from 'react';
import { motion } from 'framer-motion';
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
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider mb-3 border border-blue-200/60 shadow-sm">
          <CloudSun className="w-3.5 h-3.5 text-amber-500" />
          <span>SATELLITE CLIMATE & RADAR</span>
        </div>
        <h1 className="font-editorial text-4xl sm:text-6xl font-bold text-slate-900 tracking-tight mb-4">
          Global Weather
        </h1>
        <p className="text-sm sm:text-base text-slate-600 font-light">
          Check live climate conditions, real-time temperatures, and 3-day forecasts for your target destination.
        </p>
      </div>

      {/* Destination Selector Tabs */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-luxury mb-10 flex items-center space-x-2 overflow-x-auto no-scrollbar">
        <motion.button
          whileTap={{ scale: 0.94 }}
          onClick={() => setSelectedDestId('current')}
          className={`px-4 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all flex items-center space-x-1.5 min-h-[40px] cursor-pointer ${
            selectedDestId === 'current'
              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/25'
              : 'bg-slate-50 text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <MapPin className="w-3.5 h-3.5" />
          <span>My Location</span>
        </motion.button>

        {DESTINATIONS.map((dest) => (
          <motion.button
            whileTap={{ scale: 0.94 }}
            key={dest.id}
            onClick={() => setSelectedDestId(dest.id)}
            className={`px-4 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all min-h-[40px] cursor-pointer ${
              selectedDestId === dest.id
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/25'
                : 'bg-slate-50 text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            {dest.name}
          </motion.button>
        ))}
      </div>

      {/* Weather Card Display */}
      <WeatherCard lat={activeLat} lon={activeLon} locationName={activeName} />

    </div>
  );
}
