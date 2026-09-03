import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { DESTINATIONS } from '../data/destinations';
import WeatherCard from '../components/WeatherCard';
import FamousPlaceCard from '../components/FamousPlaceCard';
import PlaceDetailModal from '../components/PlaceDetailModal';
import ItineraryGenerator from '../components/ItineraryGenerator';
import PackingAssistant from '../components/PackingAssistant';
import { MapPin, Calendar, Globe, DollarSign, ArrowLeft, Sparkles, Heart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function DestinationDetails({ onOpenAIChatWithDestination }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { savedFavorites, toggleFavorite } = useAuth();
  const [selectedPlace, setSelectedPlace] = useState(null);

  const destination = DESTINATIONS.find((d) => d.id === id);
  const isSaved = destination ? savedFavorites.includes(destination.id) : false;

  if (!destination) {
    return (
      <div className="pt-32 pb-24 text-center max-w-md mx-auto px-4">
        <h2 className="font-editorial text-3xl font-bold mb-4">Destination not found</h2>
        <p className="text-xs text-[#68706D] mb-6">The requested destination could not be located.</p>
        <Link
          to="/destinations"
          className="px-6 py-3 rounded-full bg-[#2F6F68] text-white font-bold text-xs inline-flex items-center space-x-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Destinations</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-24">
      
      {/* 1. Cinematic Hero Banner */}
      <div className="relative h-[65vh] min-h-[440px] w-full overflow-hidden">
        <img
          src={destination.image}
          alt={destination.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#101413] via-[#101413]/50 to-black/30" />

        {/* Back Link & Heart Action */}
        <div className="absolute top-8 left-4 sm:left-8 right-4 sm:right-8 z-20 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/90 hover:bg-white text-[#171A19] font-bold text-xs backdrop-blur-md shadow-md transition-all active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          <button
            onClick={() => toggleFavorite(destination.id)}
            className="p-3 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/20 text-white transition-all active:scale-95 shadow-md"
            title={isSaved ? 'Remove from favorites' : 'Save to favorites'}
          >
            <Heart className={`w-5 h-5 ${isSaved ? 'fill-rose-500 text-rose-500' : 'text-white'}`} />
          </button>
        </div>

        {/* Hero Title & Badges */}
        <div className="absolute bottom-12 left-4 sm:left-8 lg:left-16 right-4 sm:right-8 max-w-4xl text-white">
          <div className="flex items-center space-x-2 mb-3">
            <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/90 text-[#171A19] shadow-sm">
              {destination.region}
            </span>
            <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#2F6F68] text-[#D8B98A] shadow-sm">
              {destination.country}
            </span>
          </div>

          <h1 className="font-editorial text-5xl sm:text-7xl font-bold tracking-tight mb-4 drop-shadow-lg">
            {destination.name}
          </h1>

          <p className="text-sm sm:text-base text-slate-200 font-light leading-relaxed max-w-2xl drop-shadow-md">
            {destination.description}
          </p>
        </div>
      </div>

      {/* 2. Destination Core Info Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20 space-y-14">
        
        {/* Quick Facts Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-[#171A19]/10 shadow-lg">
          
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-[#2F6F68]/10 text-[#2F6F68] flex items-center justify-center shrink-0">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#68706D] block">Best Season</span>
              <span className="text-xs sm:text-sm font-bold text-[#171A19]">{destination.bestTime}</span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-[#2F6F68]/10 text-[#2F6F68] flex items-center justify-center shrink-0">
              <DollarSign className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#68706D] block">Currency</span>
              <span className="text-xs sm:text-sm font-bold text-[#171A19]">{destination.currency}</span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-[#2F6F68]/10 text-[#2F6F68] flex items-center justify-center shrink-0">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#68706D] block">Language</span>
              <span className="text-xs sm:text-sm font-bold text-[#171A19]">{destination.language}</span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-[#2F6F68]/10 text-[#2F6F68] flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#68706D] block">Coordinates</span>
              <span className="text-xs sm:text-sm font-bold text-[#171A19]">{destination.latitude.toFixed(2)}°, {destination.longitude.toFixed(2)}°</span>
            </div>
          </div>

        </div>

        {/* Live Weather Forecast for this destination */}
        <div>
          <h3 className="font-editorial text-3xl font-bold text-[#171A19] mb-4">
            Live Weather in {destination.name}
          </h3>
          <WeatherCard
            lat={destination.latitude}
            lon={destination.longitude}
            locationName={`${destination.name}, ${destination.country}`}
          />
        </div>

        {/* Famous Places in this Destination (Clickable to open PlaceDetailModal) */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-2">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#2F6F68] block mb-1">
                CURATED SIGHTS
              </span>
              <h3 className="font-editorial text-3xl font-bold text-[#171A19]">
                Famous Places in {destination.name}
              </h3>
            </div>
            <p className="text-xs text-[#68706D]">
              Click any place to explore detailed visiting tips & AI advice.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {destination.places?.map((place) => (
              <FamousPlaceCard
                key={place.id}
                place={place}
                onSelectPlace={(p) => setSelectedPlace(p)}
              />
            ))}
          </div>
        </div>

        {/* Ask AI Assistant CTA */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#101413] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <span className="text-[10px] uppercase tracking-widest font-extrabold text-[#D8B98A] block mb-1">
              DESTINATION ASSISTANT
            </span>
            <h3 className="font-editorial text-3xl font-bold text-white mb-2">
              Have questions about {destination.name}?
            </h3>
            <p className="text-xs text-slate-300 font-light max-w-lg">
              Ask our AI assistant what to pack, when to visit, what food to sample, or how many days to spend.
            </p>
          </div>

          <button
            onClick={() => onOpenAIChatWithDestination(destination)}
            className="px-8 py-3.5 rounded-full bg-[#2F6F68] hover:bg-[#265953] text-white font-bold text-xs shadow-md transition-transform hover:scale-105 flex items-center space-x-2 shrink-0"
          >
            <Sparkles className="w-4 h-4 text-[#D8B98A]" />
            <span>✨ Ask AI about {destination.name}</span>
          </button>
        </div>

        {/* AI Itinerary Generator Section initialized for this destination */}
        <ItineraryGenerator initialDestination={destination} />

        {/* Smart Packing Assistant Checklist */}
        <PackingAssistant />

      </div>

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
