import React, { useState, useEffect } from 'react';
import { X, MapPin, Star, Sun, Calendar, Globe, DollarSign, Clock, Sparkles, Map as MapIcon, Landmark } from 'lucide-react';
import { fetchLiveWeather } from '../services/weatherService';

export default function DestinationDetailModal({ destination, onClose, onStartItinerary, onOpenMap }) {
  const [weather, setWeather] = useState(null);
  const [activeImage, setActiveImage] = useState(destination?.heroImage);

  useEffect(() => {
    if (destination) {
      setActiveImage(destination.heroImage);
      fetchLiveWeather(destination.lat, destination.lon).then((data) => {
        setWeather(data);
      });
    }
  }, [destination]);

  if (!destination) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto no-scrollbar">
      <div className="relative w-full max-w-4xl glass-panel rounded-3xl overflow-hidden shadow-2xl border border-slate-700/80 my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-3 rounded-full bg-slate-950/80 text-slate-300 hover:text-white backdrop-blur-md border border-slate-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Banner Header */}
        <div className="relative h-80 sm:h-96 w-full overflow-hidden">
          <img
            src={activeImage}
            alt={destination.name}
            className="w-full h-full object-cover transition-all duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-transparent to-transparent" />

          {/* Title and Country */}
          <div className="absolute bottom-6 left-6 right-6 z-10">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-teal-500 text-slate-950">
                {destination.category}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-900/80 text-slate-200 border border-slate-700">
                {destination.continent}
              </span>
              <div className="flex items-center space-x-1 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span>{destination.rating} ({destination.reviewCount} reviews)</span>
              </div>
            </div>

            <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
              {destination.name}
            </h2>
            <p className="text-sm text-teal-300 font-medium mt-1">
              {destination.country} — "{destination.tagline}"
            </p>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-8 max-h-[60vh] overflow-y-auto custom-scrollbar">
          
          {/* Quick Metrics Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            
            <div className="glass-card p-4 rounded-2xl">
              <span className="text-xs text-slate-400 block mb-1 flex items-center space-x-1">
                <Calendar className="w-3.5 h-3.5 text-teal-400" />
                <span>Best Time</span>
              </span>
              <span className="text-xs font-bold text-white">{destination.bestTimeToVisit}</span>
            </div>

            <div className="glass-card p-4 rounded-2xl">
              <span className="text-xs text-slate-400 block mb-1 flex items-center space-x-1">
                <Globe className="w-3.5 h-3.5 text-cyan-400" />
                <span>Currency & Lang</span>
              </span>
              <span className="text-xs font-bold text-white">{destination.currency} • {destination.language}</span>
            </div>

            <div className="glass-card p-4 rounded-2xl">
              <span className="text-xs text-slate-400 block mb-1 flex items-center space-x-1">
                <DollarSign className="w-3.5 h-3.5 text-amber-400" />
                <span>Budget Level</span>
              </span>
              <span className="text-xs font-bold text-amber-300">{destination.budgetRange}</span>
            </div>

            <div className="glass-card p-4 rounded-2xl">
              <span className="text-xs text-slate-400 block mb-1 flex items-center space-x-1">
                <Sun className="w-3.5 h-3.5 text-amber-400" />
                <span>Live Temp</span>
              </span>
              <span className="text-xs font-bold text-white">
                {weather ? `${weather.temp}°C (${weather.condition})` : 'Loading...'}
              </span>
            </div>

          </div>

          {/* Description */}
          <div>
            <h4 className="text-lg font-bold text-white mb-2">About Destination</h4>
            <p className="text-sm text-slate-300 leading-relaxed font-light">
              {destination.description}
            </p>
          </div>

          {/* Famous Places Subsection */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
              <Landmark className="w-5 h-5 text-teal-400" />
              <span>Notable Places to Visit in {destination.name}</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {destination.famousPlaces?.map((place) => (
                <div key={place.id} className="glass-card p-4 rounded-2xl flex space-x-3 items-center">
                  <img
                    src={place.image}
                    alt={place.name}
                    className="w-16 h-16 rounded-xl object-cover shrink-0"
                  />
                  <div>
                    <h5 className="text-sm font-bold text-white">{place.name}</h5>
                    <span className="text-[11px] text-teal-300 font-medium block">{place.category}</span>
                    <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">{place.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer CTA */}
        <div className="p-6 bg-slate-900/90 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <button
            onClick={() => onOpenMap(destination)}
            className="w-full sm:w-auto px-6 py-3 rounded-full glass-card hover:bg-white/10 text-slate-200 font-bold text-xs flex items-center justify-center space-x-2"
          >
            <MapIcon className="w-4 h-4 text-teal-400" />
            <span>Interactive Map View</span>
          </button>

          <button
            onClick={() => {
              onClose();
              onStartItinerary(destination);
            }}
            className="w-full sm:w-auto px-8 py-3 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-teal-500/25 flex items-center justify-center space-x-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Generate Day-by-Day Itinerary</span>
          </button>

        </div>

      </div>
    </div>
  );
}
