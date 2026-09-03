import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { DESTINATIONS } from '../data/destinations';
import WeatherCard from '../components/WeatherCard';
import FamousPlaceCard from '../components/FamousPlaceCard';
import ItineraryGenerator from '../components/ItineraryGenerator';
import PackingAssistant from '../components/PackingAssistant';
import { MapPin, Calendar, Globe, DollarSign, ArrowLeft, Sparkles } from 'lucide-react';

export default function DestinationDetails({ onOpenAIChatWithDestination }) {
  const { id } = useParams();
  const destination = DESTINATIONS.find((d) => d.id === id) || DESTINATIONS[0];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  if (!destination) return null;

  return (
    <div className="pt-24 pb-24 space-y-16">
      
      {/* Back Link & Hero Image Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to="/destinations"
          className="inline-flex items-center space-x-2 text-xs font-bold text-[#68706D] hover:text-[#2F6F68] mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Destinations</span>
        </Link>

        {/* Hero Cover Banner */}
        <div className="relative h-[480px] sm:h-[560px] w-full rounded-3xl overflow-hidden shadow-2xl">
          <img
            src={destination.image}
            alt={destination.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#101413]/90 via-[#101413]/30 to-transparent" />

          {/* Title & Introduction Overlay */}
          <div className="absolute bottom-8 left-8 right-8 z-10 text-white max-w-3xl">
            <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-white/20 backdrop-blur-md text-[#D8B98A] border border-white/20 mb-3 inline-block">
              {destination.country}
            </span>
            <h1 className="font-editorial text-5xl sm:text-7xl font-bold tracking-tight mb-3">
              {destination.name}
            </h1>
            <p className="text-sm sm:text-base text-slate-200 font-light leading-relaxed">
              {destination.description}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Quick Travel Metrics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-white border border-[#171A19]/08 shadow-sm">
            <span className="text-[10px] text-[#68706D] uppercase tracking-wider block mb-1 flex items-center space-x-1">
              <Calendar className="w-3.5 h-3.5 text-[#2F6F68]" />
              <span>Best Time to Visit</span>
            </span>
            <span className="text-xs font-bold text-[#171A19]">{destination.bestTime}</span>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#171A19]/08 shadow-sm">
            <span className="text-[10px] text-[#68706D] uppercase tracking-wider block mb-1 flex items-center space-x-1">
              <Globe className="w-3.5 h-3.5 text-[#2F6F68]" />
              <span>Language</span>
            </span>
            <span className="text-xs font-bold text-[#171A19]">{destination.language}</span>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#171A19]/08 shadow-sm">
            <span className="text-[10px] text-[#68706D] uppercase tracking-wider block mb-1 flex items-center space-x-1">
              <DollarSign className="w-3.5 h-3.5 text-[#D8B98A]" />
              <span>Currency</span>
            </span>
            <span className="text-xs font-bold text-[#171A19]">{destination.currency}</span>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#171A19]/08 shadow-sm">
            <span className="text-[10px] text-[#68706D] uppercase tracking-wider block mb-1 flex items-center space-x-1">
              <MapPin className="w-3.5 h-3.5 text-[#2F6F68]" />
              <span>Region</span>
            </span>
            <span className="text-xs font-bold text-[#171A19]">{destination.region}</span>
          </div>
        </div>

        {/* Real-Time Weather Component for this destination */}
        <div>
          <h3 className="font-editorial text-2xl font-bold text-[#171A19] mb-4">
            Live Weather in {destination.name}
          </h3>
          <WeatherCard
            lat={destination.latitude}
            lon={destination.longitude}
            locationName={`${destination.name}, ${destination.country}`}
          />
        </div>

        {/* About Section */}
        <div className="bg-white p-8 sm:p-10 rounded-3xl border border-[#171A19]/10 shadow-sm">
          <h3 className="font-editorial text-3xl font-bold text-[#171A19] mb-4">
            About {destination.name}
          </h3>
          <p className="text-sm text-[#68706D] font-light leading-relaxed mb-6">
            {destination.description}
          </p>

          <div className="flex flex-wrap gap-2 pt-4 border-t border-[#171A19]/08">
            {destination.tags?.map((tag) => (
              <span key={tag} className="px-3.5 py-1 rounded-full text-xs font-semibold bg-[#F7F5F0] text-[#2F6F68]">
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Famous Places Section */}
        <div>
          <h3 className="font-editorial text-3xl font-bold text-[#171A19] mb-6">
            Famous Places in {destination.name}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {destination.places?.map((place) => (
              <FamousPlaceCard key={place.id} place={place} />
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

    </div>
  );
}
