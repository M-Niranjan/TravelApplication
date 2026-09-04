import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import DestinationCard from '../components/DestinationCard';
import FamousPlaceCard from '../components/FamousPlaceCard';
import PlaceDetailModal from '../components/PlaceDetailModal';
import { DESTINATIONS } from '../data/destinations';
import { Sparkles, MapPin, Landmark, ArrowRight, Calendar, Luggage } from 'lucide-react';

export default function Home({ onOpenAIChat, currentLocation }) {
  const [selectedPlace, setSelectedPlace] = useState(null);

  const featuredDestinations = useMemo(() => DESTINATIONS.slice(0, 4), []);

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
            <span className="text-xs font-extrabold uppercase tracking-widest text-blue-600 block mb-2">
              CURATED ESCAPES
            </span>
            <h2 className="font-editorial text-3xl sm:text-5xl font-bold text-slate-900 tracking-tight">
              Featured Destinations
            </h2>
          </div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/destinations"
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs border border-slate-200/90 shadow-sm transition-all group shrink-0 min-h-[44px]"
            >
              <span>View All Destinations</span>
              <ArrowRight className="w-3.5 h-3.5 text-blue-600 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {featuredDestinations.map((dest) => (
            <DestinationCard key={dest.id} destination={dest} />
          ))}
        </div>
      </section>

      {/* 3. Notable Landmarks Showcase (Top 4 Places) */}
      <section className="bg-white py-20 border-y border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-blue-600 block mb-2">
                GLOBAL LANDMARKS
              </span>
              <h2 className="font-editorial text-3xl sm:text-5xl font-bold text-slate-900 tracking-tight">
                Top Sights & Attractions
              </h2>
            </div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/places"
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-800 font-bold text-xs border border-slate-200 shadow-sm transition-all group shrink-0 min-h-[44px]"
              >
                <span>Explore All Tourist Places</span>
                <ArrowRight className="w-3.5 h-3.5 text-blue-600 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
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
          <motion.div whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
            <Link
              to="/itinerary"
              className="p-8 sm:p-10 rounded-3xl bg-white text-slate-900 flex items-center justify-between group hover:shadow-[0_16px_36px_rgba(0,0,0,0.06)] transition-all border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.02)] h-full"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shadow-sm">
                  <Calendar className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    AI Itinerary Planner
                  </h3>
                  <p className="text-xs text-slate-500 font-light max-w-sm leading-relaxed mt-1">
                    Generate tailored day-by-day travel schedules with PDF export and custom durations.
                  </p>
                </div>
              </div>
              <div className="w-12 h-12 rounded-full bg-slate-100 group-hover:bg-blue-600 group-hover:text-white text-slate-700 flex items-center justify-center transition-all shrink-0 ml-4">
                <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>
          </motion.div>

          {/* Smart Packing Assistant Card */}
          <motion.div whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
            <Link
              to="/packing"
              className="p-8 sm:p-10 rounded-3xl bg-white text-slate-900 flex items-center justify-between group hover:shadow-[0_16px_36px_rgba(0,0,0,0.06)] transition-all border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.02)] h-full"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center shadow-sm">
                  <Luggage className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-slate-900 group-hover:text-rose-600 transition-colors">
                    Smart Packing Checklist
                  </h3>
                  <p className="text-xs text-slate-500 font-light max-w-sm leading-relaxed mt-1">
                    Interactive luggage readiness tracker and essential gear checklist tailored to destination climate.
                  </p>
                </div>
              </div>
              <div className="w-12 h-12 rounded-full bg-slate-100 group-hover:bg-rose-600 group-hover:text-white text-slate-700 flex items-center justify-center transition-all shrink-0 ml-4">
                <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>
          </motion.div>

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
