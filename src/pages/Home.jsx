import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import DestinationCard from '../components/DestinationCard';
import FamousPlaceCard from '../components/FamousPlaceCard';
import PlaceDetailModal from '../components/PlaceDetailModal';
import { DESTINATIONS } from '../data/destinations';
import { Sparkles, MapPin, Landmark, ArrowRight, Calendar, Luggage } from 'lucide-react';

export default function Home({ onOpenAIChat, currentLocation }) {
  const [selectedPlace, setSelectedPlace] = useState(null);

  // Top 4 featured destinations
  const featuredDestinations = useMemo(() => DESTINATIONS.slice(0, 4), []);

  // Top 4 featured landmarks
  const featuredPlaces = useMemo(() => {
    return DESTINATIONS.flatMap((d) => (d.places || []).map((p) => ({ ...p, destinationName: d.name, country: d.country }))).slice(0, 4);
  }, []);

  return (
    <div className="space-y-20 pb-24">
      
      {/* 1. Hero Section (Cinematic 3-Second Crossfade Engine) */}
      <Hero onOpenAIChat={onOpenAIChat} />

      {/* 2. Curated Escapes Showcase (Top 4 Cards) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#1B4944] block mb-2">
              CURATED ESCAPES
            </span>
            <h2 className="font-editorial text-3xl sm:text-5xl font-bold text-[#101413] tracking-tight">
              Featured Destinations
            </h2>
          </div>

          <Link
            to="/destinations"
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-white hover:bg-[#1B4944] text-[#101413] hover:text-white font-bold text-xs border border-[#101413]/10 shadow-sm transition-all group shrink-0 min-h-[44px]"
          >
            <span>View All Destinations</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {featuredDestinations.map((dest) => (
            <DestinationCard key={dest.id} destination={dest} />
          ))}
        </div>
      </section>

      {/* 3. Notable Landmarks Showcase (Top 4 Places) */}
      <section className="bg-white py-20 border-y border-[#101413]/06">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#1B4944] block mb-2">
                GLOBAL LANDMARKS
              </span>
              <h2 className="font-editorial text-3xl sm:text-5xl font-bold text-[#101413] tracking-tight">
                Top Sights & Attractions
              </h2>
            </div>

            <Link
              to="/places"
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-[#F9F8F5] hover:bg-[#1B4944] text-[#101413] hover:text-white font-bold text-xs border border-[#101413]/10 shadow-sm transition-all group shrink-0 min-h-[44px]"
            >
              <span>Explore All Tourist Places</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredPlaces.map((place) => (
              <FamousPlaceCard
                key={place.id}
                place={place}
                onSelectPlace={(p) => setSelectedPlace(p)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Quick Action Hub Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* AI Itinerary Card */}
          <Link
            to="/itinerary"
            className="p-8 sm:p-10 rounded-3xl bg-[#101413] text-white flex items-center justify-between group hover:shadow-2xl transition-all border border-white/10"
          >
            <div className="space-y-2">
              <div className="w-11 h-11 rounded-2xl bg-[#1B4944] text-[#E0C89E] flex items-center justify-center shadow-md">
                <Calendar className="w-5 h-5" />
              </div>
              <h3 className="font-editorial text-2xl sm:text-3xl font-bold">AI Itinerary Planner</h3>
              <p className="text-xs text-slate-300 font-light max-w-sm leading-relaxed">
                Generate tailored day-by-day travel schedules with PDF export and custom durations.
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-white/10 group-hover:bg-[#1B4944] flex items-center justify-center transition-colors shrink-0 ml-4">
              <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>

          {/* Smart Packing Assistant Card */}
          <Link
            to="/packing"
            className="p-8 sm:p-10 rounded-3xl bg-white text-[#101413] flex items-center justify-between group hover:shadow-2xl transition-all border border-[#101413]/10"
          >
            <div className="space-y-2">
              <div className="w-11 h-11 rounded-2xl bg-[#1B4944]/10 text-[#1B4944] flex items-center justify-center shadow-sm">
                <Luggage className="w-5 h-5" />
              </div>
              <h3 className="font-editorial text-2xl sm:text-3xl font-bold">Smart Packing Checklist</h3>
              <p className="text-xs text-[#586260] font-light max-w-sm leading-relaxed">
                Interactive luggage readiness tracker and essential gear checklist by category.
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-[#F9F8F5] group-hover:bg-[#1B4944] group-hover:text-white flex items-center justify-center transition-colors shrink-0 ml-4">
              <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>

        </div>
      </section>

      {/* Place Detail Modal */}
      {selectedPlace && (
        <PlaceDetailModal
          place={selectedPlace}
          onClose={() => setSelectedPlace(null)}
          onOpenAIChatWithDestination={onOpenAIChat}
        />
      )}

    </div>
  );
}
