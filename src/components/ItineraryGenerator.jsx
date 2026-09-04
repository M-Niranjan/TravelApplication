import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useGemini } from '../hooks/useGemini';
import ItineraryTimeline from './ItineraryTimeline';
import LoadingState from './LoadingState';
import { DESTINATIONS } from '../data/destinations';
import { 
  Sparkles, 
  Calendar, 
  Compass, 
  MapPin, 
  Printer, 
  Clock, 
  Check, 
  Plus, 
  Minus, 
  Sliders, 
  Layers, 
  Edit3, 
  Landmark, 
  CheckCircle2 
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ItineraryGenerator({ initialDestination = null }) {
  const [selectedDestId, setSelectedDestId] = useState(initialDestination?.id || DESTINATIONS[0].id);
  const [days, setDays] = useState(3);
  const [isCustomDays, setIsCustomDays] = useState(false);
  const [style, setStyle] = useState('Culture');
  const [budget, setBudget] = useState('Mid-range');
  const [selectedInterests, setSelectedInterests] = useState(['History', 'Food']);
  const [selectedTourIds, setSelectedTourIds] = useState([]);

  const activeDestination = DESTINATIONS.find((d) => d.id === selectedDestId) || DESTINATIONS[0];

  const travelStyles = [
    { id: 'Culture', label: 'Culture', icon: '🏛️' },
    { id: 'Relaxed', label: 'Relaxed', icon: '🏖️' },
    { id: 'Adventure', label: 'Adventure', icon: '⚡' },
    { id: 'Food', label: 'Food & Wine', icon: '🍜' },
    { id: 'Nature', label: 'Nature', icon: '🌿' },
    { id: 'Luxury', label: 'Luxury', icon: '💎' }
  ];

  const presetDurations = [1, 2, 3, 5, 7, 10];
  const interestOptions = ['History', 'Nature', 'Shopping', 'Food', 'Photography', 'Nightlife', 'Architecture'];

  useEffect(() => {
    if (activeDestination?.places) {
      setSelectedTourIds(activeDestination.places.map((p) => p.id));
    }
  }, [selectedDestId, activeDestination]);

  const toggleTour = (tourId) => {
    setSelectedTourIds((prev) =>
      prev.includes(tourId) ? prev.filter((id) => id !== tourId) : [...prev, tourId]
    );
  };

  const selectAllTours = () => {
    if (activeDestination?.places) {
      setSelectedTourIds(activeDestination.places.map((p) => p.id));
    }
  };

  const createDefaultPlan = (dest, numDays = 3, planStyle = 'Culture', activeTourIds = []) => {
    const daysArr = [];
    const cappedDays = Math.min(Math.max(numDays, 1), 30);
    
    const availablePlaces = dest.places?.filter((p) => 
      activeTourIds.length === 0 || activeTourIds.includes(p.id)
    ) || dest.places || [];

    const pool = availablePlaces.length > 0 ? availablePlaces : dest.places;

    for (let i = 1; i <= cappedDays; i++) {
      const p1 = pool[(i - 1) % (pool.length || 1)] || { 
        name: 'Historic Old Quarter', 
        description: `Explore charming avenues and iconic sights in ${dest.name}.` 
      };
      const p2 = pool[i % (pool.length || 1)] || { 
        name: 'Scenic Viewpoint & Cultural Market', 
        description: 'Sample authentic regional delicacies and enjoy panoramic cityscapes.' 
      };

      daysArr.push({
        day: i,
        title: i === 1 
          ? `Arrival & Classic ${dest.name} Highlights` 
          : i === 2 
            ? `Cultural Immersion & Local Gastronomy` 
            : i === 3
              ? `Scenic Excursion & Natural Wonders`
              : `Day ${i}: Iconic Sights & Hidden Treasures`,
        activities: [
          {
            time: '09:00',
            title: `Morning Tour: ${p1.name}`,
            description: p1.description,
            duration: p1.duration || '2.5 hours'
          },
          {
            time: '13:00',
            title: `Authentic Regional Lunch & Stroll`,
            description: `Enjoy traditional cuisine at a top-rated local bistro in ${dest.name}.`,
            duration: '1.5 hours'
          },
          {
            time: '16:30',
            title: `Afternoon Excursion: ${p2.name}`,
            description: p2.description,
            duration: p2.duration || '2 hours'
          }
        ]
      });
    }

    return {
      destination: dest.name,
      overview: `A tailored ${cappedDays}-day ${planStyle.toLowerCase()} journey through ${dest.name}, featuring ${pool.length} signature tours and attractions.`,
      days: daysArr
    };
  };

  const [itineraryResult, setItineraryResult] = useState(() => 
    createDefaultPlan(activeDestination, 3, 'Culture')
  );

  const { loading, createItinerary } = useGemini();

  useEffect(() => {
    if (initialDestination?.id) {
      setSelectedDestId(initialDestination.id);
    }
  }, [initialDestination]);

  useEffect(() => {
    setItineraryResult(createDefaultPlan(activeDestination, days, style, selectedTourIds));
  }, [selectedDestId, days, selectedTourIds]);

  const toggleInterest = (interest) => {
    setSelectedInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    );
  };

  const handleCustomDaysChange = (val) => {
    const parsed = parseInt(val, 10);
    if (!isNaN(parsed)) {
      setDays(Math.min(Math.max(parsed, 1), 30));
    }
  };

  const handleGenerate = async (e) => {
    if (e) e.preventDefault();
    
    const chosenTours = activeDestination.places?.filter((p) => selectedTourIds.includes(p.id)) || [];

    const config = {
      destination: activeDestination,
      days,
      style,
      budget,
      interests: [
        ...selectedInterests,
        ...chosenTours.map((t) => t.name)
      ]
    };

    const result = await createItinerary(config);
    if (result) {
      setItineraryResult(result);
      try {
        confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
      } catch (err) {}
    }
  };

  return (
    <div id="itinerary-builder" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="no-print text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider mb-3 border border-blue-200/60 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-rose-500 animate-pulse" />
          <span>AI TRAVEL PLANNER STUDIO</span>
        </div>
        <h2 className="font-editorial text-3xl sm:text-5xl font-bold text-slate-900 tracking-tight mb-3">
          {initialDestination ? `${activeDestination.name} Travel Itinerary` : 'Custom Day-by-Day Itinerary'}
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 font-light">
          {initialDestination 
            ? `Customize tourist places and duration in ${activeDestination.name} to generate your schedule.`
            : 'Select your destination, customize included tours & duration, and let Gemini AI generate your schedule.'}
        </p>
      </div>

      {/* Modern Split Studio Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Studio Controls Panel (5 cols) */}
        <div className="no-print lg:col-span-5 bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/80 shadow-luxury space-y-6 sticky lg:top-24">
          
          {/* 1. Destination Card */}
          <div>
            <label className="text-[10px] font-extrabold text-blue-600 uppercase tracking-wider block mb-2">
              Destination
            </label>
            
            <div className="relative rounded-2xl overflow-hidden h-28 border border-slate-200 shadow-sm bg-slate-100">
              <img
                src={activeDestination.image}
                alt={activeDestination.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/65 via-[#0F172A]/20 to-transparent" />
              <div className="absolute bottom-3 left-4 text-white">
                <span className="text-[10px] uppercase font-bold text-amber-300 block">{activeDestination.country}</span>
                <span className="font-editorial text-xl font-bold">{activeDestination.name}</span>
              </div>
            </div>

            {!initialDestination && (
              <select
                value={selectedDestId}
                onChange={(e) => setSelectedDestId(e.target.value)}
                className="w-full mt-3 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs sm:text-sm font-bold text-slate-800 focus:outline-none focus:border-blue-500"
              >
                {DESTINATIONS.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name} ({d.country})
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* 2. Included Tourist Places & Attractions in Destination */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-[10px] font-extrabold text-blue-600 uppercase tracking-wider flex items-center space-x-1">
                <Landmark className="w-3.5 h-3.5 text-blue-600" />
                <span>Tourist Places in {activeDestination.name}</span>
              </label>
              <button
                type="button"
                onClick={selectAllTours}
                className="text-[10px] font-bold text-blue-600 hover:underline cursor-pointer"
              >
                Select All
              </button>
            </div>

            <div className="space-y-2 max-h-56 overflow-y-auto no-scrollbar pr-1">
              {activeDestination.places?.map((tour) => {
                const isChecked = selectedTourIds.includes(tour.id);
                return (
                  <div
                    key={tour.id}
                    onClick={() => toggleTour(tour.id)}
                    className={`p-2.5 rounded-2xl border transition-all flex items-center justify-between cursor-pointer ${
                      isChecked
                        ? 'bg-blue-50/70 border-blue-500 text-slate-900 shadow-sm'
                        : 'bg-slate-50 border-slate-100 text-slate-500 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <img
                        src={tour.image}
                        alt={tour.name}
                        className="w-10 h-10 rounded-xl object-cover shrink-0"
                      />
                      <div>
                        <span className="text-xs font-bold block leading-tight">{tour.name}</span>
                        <span className="text-[10px] text-slate-500 block">{tour.category} · {tour.duration}</span>
                      </div>
                    </div>

                    <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                      isChecked ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm' : 'bg-slate-200 text-transparent'
                    }`}>
                      <Check className="w-3 h-3" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 3. Duration Selector with Presets & Manual Custom Option */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-[10px] font-extrabold text-blue-600 uppercase tracking-wider">
                Trip Duration
              </label>
              <button
                type="button"
                onClick={() => setIsCustomDays(!isCustomDays)}
                className="text-[11px] font-bold text-blue-600 hover:underline flex items-center space-x-1 cursor-pointer"
              >
                <Edit3 className="w-3 h-3" />
                <span>{isCustomDays ? 'Use Presets' : 'Custom Days'}</span>
              </button>
            </div>
            
            {!isCustomDays ? (
              <div className="grid grid-cols-6 gap-1.5">
                {presetDurations.map((num) => (
                  <motion.button
                    whileTap={{ scale: 0.92 }}
                    key={num}
                    type="button"
                    onClick={() => setDays(num)}
                    className={`py-2 rounded-xl text-xs font-bold transition-all min-h-[38px] cursor-pointer ${
                      days === num
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/25 scale-105'
                        : 'bg-slate-50 text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    {num}D
                  </motion.button>
                ))}
              </div>
            ) : (
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 flex items-center justify-between gap-3">
                <motion.button
                  whileTap={{ scale: 0.85 }}
                  type="button"
                  onClick={() => setDays((prev) => Math.max(prev - 1, 1))}
                  className="w-10 h-10 rounded-xl bg-white hover:bg-slate-100 text-slate-800 font-bold shadow-sm flex items-center justify-center cursor-pointer"
                >
                  <Minus className="w-4 h-4" />
                </motion.button>

                <div className="flex-1 text-center">
                  <div className="flex items-center justify-center space-x-1">
                    <input
                      type="number"
                      min="1"
                      max="30"
                      value={days}
                      onChange={(e) => handleCustomDaysChange(e.target.value)}
                      className="w-16 text-center font-editorial text-2xl font-bold text-slate-900 bg-white border border-slate-300 rounded-xl py-1 focus:outline-none focus:border-blue-500"
                    />
                    <span className="text-xs font-bold text-blue-600">Days</span>
                  </div>
                  <span className="text-[10px] text-slate-500 block mt-0.5 font-light">Custom range: 1 to 30 days</span>
                </div>

                <motion.button
                  whileTap={{ scale: 0.85 }}
                  type="button"
                  onClick={() => setDays((prev) => Math.min(prev + 1, 30))}
                  className="w-10 h-10 rounded-xl bg-white hover:bg-slate-100 text-slate-800 font-bold shadow-sm flex items-center justify-center cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                </motion.button>
              </div>
            )}
          </div>

          {/* 4. Travel Style Selector */}
          <div>
            <label className="text-[10px] font-extrabold text-blue-600 uppercase tracking-wider block mb-2">
              Travel Vibe & Style
            </label>
            <div className="grid grid-cols-3 gap-2">
              {travelStyles.map((st) => (
                <button
                  key={st.id}
                  type="button"
                  onClick={() => setStyle(st.id)}
                  className={`p-2.5 rounded-2xl text-xs font-bold transition-all flex flex-col items-center space-y-1 border cursor-pointer ${
                    style === st.id
                      ? 'bg-blue-50 border-blue-500 text-blue-700 shadow-sm'
                      : 'bg-slate-50 border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <span className="text-base">{st.icon}</span>
                  <span className="text-[11px] truncate w-full text-center">{st.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 5. Interests Filter Chips */}
          <div>
            <label className="text-[10px] font-extrabold text-blue-600 uppercase tracking-wider block mb-2">
              Specific Interests
            </label>
            <div className="flex flex-wrap gap-1.5">
              {interestOptions.map((interest) => {
                const selected = selectedInterests.includes(interest);
                return (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => toggleInterest(interest)}
                    className={`px-3 py-1.5 rounded-full text-[11px] font-bold transition-all flex items-center space-x-1 cursor-pointer ${
                      selected
                        ? 'bg-slate-900 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {selected && <Check className="w-3 h-3 text-rose-400" />}
                    <span>{interest}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 6. Generate Button with Glowing Gradient */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            type="button"
            onClick={handleGenerate}
            disabled={loading}
            className="w-full py-4 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-rose-500 text-white font-extrabold text-xs sm:text-sm shadow-xl shadow-blue-500/25 flex items-center justify-center space-x-2 disabled:opacity-50 min-h-[48px] cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>{loading ? 'AI is generating itinerary...' : `✨ Generate ${days}-Day ${activeDestination.name} Plan`}</span>
          </motion.button>

        </div>

        {/* Right Column: Interactive Plan Canvas (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {loading && (
            <div className="no-print">
              <LoadingState type="itinerary" message={`Gemini AI is crafting your ${days}-day ${activeDestination.name} travel timeline...`} />
            </div>
          )}

          {itineraryResult && !loading && (
            <ItineraryTimeline itinerary={itineraryResult} />
          )}

        </div>

      </div>

    </div>
  );
}
