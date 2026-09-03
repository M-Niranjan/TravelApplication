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

  // Top 4 featured destinations for clean home page
  const featuredDestinations = useMemo(() => DESTINATIONS.slice(0, 4), []);

  // Top 4 featured landmarks
  const featuredPlaces = useMemo(() => {
    return DESTINATIONS.flatMap((d) => (d.places || []).map((p) => ({ ...p, destinationName: d.name, country: d.country }))).slice(0, 4);
  }, []);

  return (
    <div className="space-y-16 pb-20">
      
      {/* 1. Hero Section (3-Second Auto-Media Rotation Engine) */}
      <Hero onOpenAIChat={onOpenAIChat} />

      {/* 2. Curated Escapes Showcase (Top 4 Cards) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#2F6F68] block mb-1.5">
              FEATURED ESCAPES
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-[#171A19] tracking-tight">
              Curated Destinations
            </h2>
          </div>

          <Link
            to="/destinations"
            className="inline-flex items-center space-x-1.5 px-5 py-2.5 rounded-full bg-white hover:bg-[#2F6F68] text-[#171A19] hover:text-white font-bold text-xs border border-[#171A19]/10 shadow-sm transition-all group shrink-0"
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
      <section className="bg-white py-16 border-y border-[#171A19]/06">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#2F6F68] block mb-1.5">
                ICONIC SIGHTS
              </span>
              <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-[#171A19] tracking-tight">
                Top Tourist Places
              </h2>
            </div>

            <Link
              to="/places"
              className="inline-flex items-center space-x-1.5 px-5 py-2.5 rounded-full bg-[#F7F5F0] hover:bg-[#2F6F68] text-[#171A19] hover:text-white font-bold text-xs border border-[#171A19]/10 shadow-sm transition-all group shrink-0"
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

      {/* 4. Quick Action Hub Banner (Planner & Packing Links) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* AI Itinerary Card */}
          <Link
            to="/itinerary"
            className="p-8 rounded-3xl bg-[#101413] text-white flex items-center justify-between group hover:shadow-2xl transition-all border border-white/10"
          >
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-2xl bg-[#2F6F68] text-[#D8B98A] flex items-center justify-center">
                <Calendar className="w-5 h-5" />
              </div>
              <h3 className="font-editorial text-2xl font-bold">AI Itinerary Planner</h3>
              <p className="text-xs text-slate-300 font-light max-w-xs">
                Generate tailored day-by-day travel schedules with PDF export.
              </p>
            </div>
            <div className="w-10 h-10 rounded-full bg-white/10 group-hover:bg-[#2F6F68] flex items-center justify-center transition-colors">
              <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>

          {/* Smart Packing Assistant Card */}
          <Link
            to="/packing"
            className="p-8 rounded-3xl bg-white text-[#171A19] flex items-center justify-between group hover:shadow-2xl transition-all border border-[#171A19]/10"
          >
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-2xl bg-[#2F6F68]/10 text-[#2F6F68] flex items-center justify-center">
                <Luggage className="w-5 h-5" />
              </div>
              <h3 className="font-editorial text-2xl font-bold">Smart Packing Checklist</h3>
              <p className="text-xs text-[#68706D] font-light max-w-xs">
                Interactive luggage readiness tracker and essential gear checklist.
              </p>
            </div>
            <div className="w-10 h-10 rounded-full bg-[#F7F5F0] group-hover:bg-[#2F6F68] group-hover:text-white flex items-center justify-center transition-colors">
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
