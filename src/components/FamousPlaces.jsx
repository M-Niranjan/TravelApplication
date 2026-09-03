import React, { useState } from 'react';
import { DESTINATIONS } from '../data/destinations';
import { Landmark, Clock, DollarSign, MapPin, Sparkles, PlusCircle } from 'lucide-react';

export default function FamousPlaces({ onAddToPlanner, onOpenMap }) {
  const [activeTab, setActiveTab] = useState(DESTINATIONS[0].id);

  const selectedDestination = DESTINATIONS.find((d) => d.id === activeTab) || DESTINATIONS[0];

  return (
    <section id="famous-places-section" className="py-20 bg-slate-900/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-teal-400 mb-2 inline-flex items-center space-x-1.5">
            <Landmark className="w-4 h-4 text-cyan-400" />
            <span>Notable Places & Landmarks</span>
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Curated Famous Places
          </h2>
          <p className="text-sm text-slate-400 font-light">
            Every destination is packed with historic monuments, natural wonders, and cultural hubs. Explore them in detail.
          </p>
        </div>

        {/* City Tab Buttons */}
        <div className="flex items-center justify-center space-x-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {DESTINATIONS.map((dest) => (
            <button
              key={dest.id}
              onClick={() => setActiveTab(dest.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center space-x-2 ${
                activeTab === dest.id
                  ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-950 font-bold shadow-lg shadow-teal-500/20 scale-105'
                  : 'glass-card text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <span>{dest.name}</span>
              <span className="text-[10px] opacity-75">({dest.famousPlaces?.length || 0})</span>
            </button>
          ))}
        </div>

        {/* Places Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {selectedDestination.famousPlaces?.map((place) => (
            <div
              key={place.id}
              className="glass-card rounded-3xl overflow-hidden border border-slate-800 hover:border-teal-500/40 transition-all duration-300 hover:-translate-y-1 group flex flex-col justify-between"
            >
              <div>
                {/* Image */}
                <div className="relative h-48 w-full overflow-hidden">
                  <img
                    src={place.image}
                    alt={place.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                  
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold bg-slate-950/80 backdrop-blur-md text-teal-300 border border-teal-500/30">
                    {place.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h4 className="text-xl font-bold text-white mb-2 group-hover:text-teal-300 transition-colors">
                    {place.name}
                  </h4>
                  
                  <p className="text-xs text-slate-400 leading-relaxed mb-4">
                    {place.description}
                  </p>

                  {/* Metadata Chips */}
                  <div className="flex flex-wrap gap-2 mb-4 text-[11px] text-slate-300">
                    <div className="flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800">
                      <Clock className="w-3.5 h-3.5 text-teal-400" />
                      <span>{place.duration}</span>
                    </div>

                    <div className="flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800">
                      <DollarSign className="w-3.5 h-3.5 text-amber-400" />
                      <span>{place.approxCost}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-5 pt-0 flex items-center justify-between gap-2 border-t border-slate-800/60 mt-2">
                <button
                  onClick={() => onOpenMap(selectedDestination, place)}
                  className="flex-1 py-2 px-3 rounded-xl glass-card hover:bg-white/10 text-xs font-semibold text-slate-300 hover:text-white flex items-center justify-center space-x-1.5 transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5 text-teal-400" />
                  <span>Map Pin</span>
                </button>

                <button
                  onClick={() => onAddToPlanner(selectedDestination, place)}
                  className="flex-1 py-2 px-3 rounded-xl bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 border border-teal-500/30 text-xs font-bold flex items-center justify-center space-x-1.5 transition-colors"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>Add to Trip</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
