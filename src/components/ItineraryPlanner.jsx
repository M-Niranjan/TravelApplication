import React, { useState } from 'react';
import { DESTINATIONS } from '../data/destinations';
import { generateAItinerary } from '../services/geminiService';
import { Calendar, Sparkles, MapPin, Clock, DollarSign, Printer, Download, Share2, Compass, CheckCircle2, ChevronRight, Lightbulb } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ItineraryPlanner({ initialDestination = null, apiKey = '' }) {
  const [selectedDestId, setSelectedDestId] = useState(initialDestination?.id || DESTINATIONS[0].id);
  const [duration, setDuration] = useState(3);
  const [style, setStyle] = useState('Cultural & Culinary');
  const [budget, setBudget] = useState('Moderate ($$)');
  const [isGenerating, setIsGenerating] = useState(false);
  const [itinerary, setItinerary] = useState(null);

  const activeDestination = DESTINATIONS.find((d) => d.id === selectedDestId) || DESTINATIONS[0];

  const handleGenerate = async (e) => {
    e.preventDefault();
    setIsGenerating(true);

    try {
      const result = await generateAItinerary({
        destination: activeDestination,
        durationDays: duration,
        style,
        budget,
        apiKey
      });

      setItinerary(result);

      // Trigger celebratory confetti effect
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err) {
      console.error('Itinerary generation error:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <section id="planner-section" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="text-xs font-bold uppercase tracking-widest text-teal-400 mb-2 inline-flex items-center space-x-1.5">
          <Calendar className="w-4 h-4 text-cyan-400" />
          <span>AI-Powered Itinerary Engine</span>
        </span>
        <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
          Day-by-Day Visual Trip Builder
        </h2>
        <p className="text-sm text-slate-400 font-light">
          Generate structured, actionable day-by-day travel plans formatted as beautiful timeline cards—not a block of text.
        </p>
      </div>

      {/* Generator Form Panel */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl mb-12 border border-slate-800 shadow-2xl">
        <form onSubmit={handleGenerate} className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
          
          {/* Destination Selector */}
          <div>
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-2">
              Select Destination
            </label>
            <select
              value={selectedDestId}
              onChange={(e) => setSelectedDestId(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700/80 rounded-2xl px-4 py-3 text-sm text-white focus:outline-none focus:border-teal-500"
            >
              {DESTINATIONS.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}, {d.country}
                </option>
              ))}
            </select>
          </div>

          {/* Duration Selector */}
          <div>
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-2">
              Trip Duration ({duration} Days)
            </label>
            <input
              type="range"
              min="1"
              max="7"
              value={duration}
              onChange={(e) => setDuration(parseInt(e.target.value))}
              className="w-full accent-teal-500 bg-slate-900 cursor-pointer h-2 rounded-lg"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>1 Day</span>
              <span>4 Days</span>
              <span>7 Days</span>
            </div>
          </div>

          {/* Travel Style */}
          <div>
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-2">
              Travel Style
            </label>
            <select
              value={style}
              onChange={(e) => setStyle(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700/80 rounded-2xl px-4 py-3 text-sm text-white focus:outline-none focus:border-teal-500"
            >
              <option value="Cultural & Culinary">Cultural & Culinary</option>
              <option value="Relaxed & Scenic">Relaxed & Scenic</option>
              <option value="Fast-Paced Adventure">Fast-Paced Adventure</option>
              <option value="Romantic Getaway">Romantic Getaway</option>
              <option value="Budget Explorer">Budget Explorer</option>
            </select>
          </div>

          {/* Generate Button */}
          <div>
            <button
              type="submit"
              disabled={isGenerating}
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-slate-950 font-bold text-sm shadow-xl shadow-teal-500/25 flex items-center justify-center space-x-2 transition-transform hover:scale-[1.02] disabled:opacity-50"
            >
              <Sparkles className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
              <span>{isGenerating ? 'Crafting Itinerary...' : 'Build Visual Itinerary'}</span>
            </button>
          </div>

        </form>
      </div>

      {/* Structured Day-by-Day Visual Output */}
      {itinerary ? (
        <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-slate-700/80 shadow-2xl">
          
          {/* Header Summary */}
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-8 border-b border-slate-800 gap-6">
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-bold mb-3">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>AI Generated Itinerary</span>
              </div>
              <h3 className="text-3xl font-extrabold text-white tracking-tight">
                {itinerary.tripTitle}
              </h3>
              <p className="text-sm text-slate-300 font-light mt-2 max-w-2xl">
                {itinerary.overview}
              </p>
            </div>

            {/* Quick Metrics & Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="glass-card px-4 py-3 rounded-2xl text-left sm:text-right border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Estimated Budget</span>
                <span className="text-sm font-bold text-amber-300">{itinerary.estimatedTotalCost}</span>
              </div>

              <button
                onClick={handlePrint}
                className="px-4 py-3 rounded-2xl glass-card hover:bg-white/10 text-xs font-bold text-slate-200 flex items-center justify-center space-x-2 transition-colors border border-slate-700"
              >
                <Printer className="w-4 h-4 text-teal-400" />
                <span>Print / PDF</span>
              </button>
            </div>
          </div>

          {/* Timeline Days */}
          <div className="mt-8 space-y-12">
            {itinerary.days?.map((day) => (
              <div key={day.dayNumber} className="relative pl-6 sm:pl-10 border-l-2 border-teal-500/40">
                
                {/* Timeline Node Badge */}
                <div className="absolute -left-[17px] top-0 w-8 h-8 rounded-full bg-teal-500 text-slate-950 font-extrabold text-xs flex items-center justify-center shadow-lg shadow-teal-500/30">
                  {day.dayNumber}
                </div>

                {/* Day Header */}
                <div className="mb-6">
                  <h4 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    Day {day.dayNumber}: {day.title}
                  </h4>
                </div>

                {/* 3 Activities Cards (Morning, Afternoon, Evening) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  
                  {/* Morning */}
                  <div className="glass-card p-5 rounded-2xl border border-slate-800/80">
                    <div className="flex items-center justify-between text-xs text-teal-400 font-semibold mb-2">
                      <span className="uppercase tracking-wider">Morning</span>
                      <span>{day.morning?.time}</span>
                    </div>
                    <h5 className="text-base font-bold text-white mb-2">{day.morning?.title}</h5>
                    <p className="text-xs text-slate-400 leading-relaxed mb-4">{day.morning?.description}</p>
                    <div className="flex items-center justify-between text-[11px] text-slate-300 pt-3 border-t border-slate-800">
                      <span className="flex items-center space-x-1">
                        <MapPin className="w-3 h-3 text-teal-400" />
                        <span>{day.morning?.location}</span>
                      </span>
                      <span className="font-bold text-amber-300">{day.morning?.estimatedCost}</span>
                    </div>
                  </div>

                  {/* Afternoon */}
                  <div className="glass-card p-5 rounded-2xl border border-slate-800/80">
                    <div className="flex items-center justify-between text-xs text-cyan-400 font-semibold mb-2">
                      <span className="uppercase tracking-wider">Afternoon</span>
                      <span>{day.afternoon?.time}</span>
                    </div>
                    <h5 className="text-base font-bold text-white mb-2">{day.afternoon?.title}</h5>
                    <p className="text-xs text-slate-400 leading-relaxed mb-4">{day.afternoon?.description}</p>
                    <div className="flex items-center justify-between text-[11px] text-slate-300 pt-3 border-t border-slate-800">
                      <span className="flex items-center space-x-1">
                        <MapPin className="w-3 h-3 text-cyan-400" />
                        <span>{day.afternoon?.location}</span>
                      </span>
                      <span className="font-bold text-amber-300">{day.afternoon?.estimatedCost}</span>
                    </div>
                  </div>

                  {/* Evening */}
                  <div className="glass-card p-5 rounded-2xl border border-slate-800/80">
                    <div className="flex items-center justify-between text-xs text-indigo-400 font-semibold mb-2">
                      <span className="uppercase tracking-wider">Evening</span>
                      <span>{day.evening?.time}</span>
                    </div>
                    <h5 className="text-base font-bold text-white mb-2">{day.evening?.title}</h5>
                    <p className="text-xs text-slate-400 leading-relaxed mb-4">{day.evening?.description}</p>
                    <div className="flex items-center justify-between text-[11px] text-slate-300 pt-3 border-t border-slate-800">
                      <span className="flex items-center space-x-1">
                        <MapPin className="w-3 h-3 text-indigo-400" />
                        <span>{day.evening?.location}</span>
                      </span>
                      <span className="font-bold text-amber-300">{day.evening?.estimatedCost}</span>
                    </div>
                  </div>

                </div>

                {/* Local Tip Box */}
                {day.localTip && (
                  <div className="p-4 rounded-2xl bg-teal-500/10 border border-teal-500/30 flex items-start space-x-3 text-xs text-teal-200">
                    <Lightbulb className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-bold text-teal-300">Local Secret: </strong>
                      <span>{day.localTip}</span>
                    </div>
                  </div>
                )}

              </div>
            ))}
          </div>

        </div>
      ) : (
        /* Empty State */
        <div className="glass-panel p-12 rounded-3xl text-center max-w-md mx-auto">
          <Compass className="w-12 h-12 text-teal-400 mx-auto mb-4 animate-float" />
          <h4 className="text-lg font-bold text-white mb-2">No Itinerary Generated Yet</h4>
          <p className="text-xs text-slate-400 mb-4">
            Select your desired destination and duration above, then click "Build Visual Itinerary" to generate a day-by-day plan.
          </p>
        </div>
      )}

    </section>
  );
}
