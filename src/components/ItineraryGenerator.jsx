import React, { useState, useEffect } from 'react';
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
  Sliders, 
  Layers,
  ChevronRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ItineraryGenerator({ initialDestination = null }) {
  const [selectedDestId, setSelectedDestId] = useState(initialDestination?.id || DESTINATIONS[0].id);
  const [days, setDays] = useState(3);
  const [style, setStyle] = useState('Culture');
  const [budget, setBudget] = useState('Mid-range');
  const [selectedInterests, setSelectedInterests] = useState(['History', 'Food']);

  const activeDestination = DESTINATIONS.find((d) => d.id === selectedDestId) || DESTINATIONS[0];

  const travelStyles = [
    { id: 'Culture', label: 'Culture', icon: '🏛️' },
    { id: 'Relaxed', label: 'Relaxed', icon: '🏖️' },
    { id: 'Adventure', label: 'Adventure', icon: '⚡' },
    { id: 'Food', label: 'Food & Wine', icon: '🍜' },
    { id: 'Nature', label: 'Nature', icon: '🌿' },
    { id: 'Luxury', label: 'Luxury', icon: '💎' }
  ];

  const durationOptions = [1, 2, 3, 4, 5, 7];
  const interestOptions = ['History', 'Nature', 'Shopping', 'Food', 'Photography', 'Nightlife', 'Architecture'];

  // Helper to build default structured plan
  const createDefaultPlan = (dest, numDays = 3, planStyle = 'Culture') => {
    const daysArr = [];
    for (let i = 1; i <= numDays; i++) {
      const p1 = dest.places?.[(i - 1) % (dest.places?.length || 1)] || { 
        name: 'Historic Old Quarter', 
        description: 'Explore charming cobblestone avenues, heritage architecture, and iconic squares.' 
      };
      const p2 = dest.places?.[i % (dest.places?.length || 1)] || { 
        name: 'Scenic Viewpoint & Cultural Market', 
        description: 'Sample authentic regional delicacies and enjoy panoramic cityscapes.' 
      };

      daysArr.push({
        day: i,
        title: i === 1 
          ? `Arrival & Classic ${dest.name} Highlights` 
          : i === 2 
            ? `Cultural Immersion & Local Gastronomy` 
            : `Scenic Excursion & Sunset Landmarks`,
        activities: [
          {
            time: '09:00',
            title: `Morning Exploration at ${p1.name}`,
            description: p1.description,
            duration: '2.5 hours'
          },
          {
            time: '13:00',
            title: `Authentic Regional Lunch & Neighborhood Stroll`,
            description: `Enjoy traditional cuisine at a top-rated local bistro in ${dest.name}.`,
            duration: '1.5 hours'
          },
          {
            time: '16:30',
            title: `Afternoon Cultural Visit to ${p2.name}`,
            description: p2.description,
            duration: '2 hours'
          }
        ]
      });
    }

    return {
      destination: dest.name,
      overview: `A tailored ${numDays}-day ${planStyle.toLowerCase()} journey through ${dest.name}, combining famous landmarks, culinary secrets, and scenic viewpoints.`,
      days: daysArr
    };
  };

  const [itineraryResult, setItineraryResult] = useState(() => 
    createDefaultPlan(activeDestination, 3, 'Culture')
  );

  const { loading, createItinerary } = useGemini();

  // Keep destination synced if prop changes
  useEffect(() => {
    if (initialDestination?.id) {
      setSelectedDestId(initialDestination.id);
    }
  }, [initialDestination]);

  useEffect(() => {
    setItineraryResult(createDefaultPlan(activeDestination, days, style));
  }, [selectedDestId]);

  const toggleInterest = (interest) => {
    setSelectedInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    );
  };

  const handleGenerate = async (e) => {
    if (e) e.preventDefault();
    const config = {
      destination: activeDestination,
      days,
      style,
      budget,
      interests: selectedInterests
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
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#2F6F68]/10 text-[#2F6F68] text-xs font-bold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5 text-[#D8B98A]" />
          <span>AI TRAVEL PLANNER STUDIO</span>
        </div>
        <h2 className="font-editorial text-3xl sm:text-5xl font-bold text-[#171A19] tracking-tight mb-3">
          Custom Day-by-Day Itinerary
        </h2>
        <p className="text-xs sm:text-sm text-[#68706D] font-light">
          Personalize your travel style, duration, and interests to generate a structured timeline.
        </p>
      </div>

      {/* Modern Split Studio Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Studio Controls Panel (5 cols) */}
        <div className="no-print lg:col-span-5 bg-white p-6 sm:p-7 rounded-3xl border border-[#171A19]/10 shadow-lg space-y-6 sticky lg:top-24">
          
          {/* Destination Preview & Selector */}
          <div>
            <label className="text-[10px] font-extrabold text-[#2F6F68] uppercase tracking-wider block mb-2">
              Select Destination
            </label>
            
            <div className="relative mb-3 rounded-2xl overflow-hidden h-28 border border-[#171A19]/10">
              <img
                src={activeDestination.image}
                alt={activeDestination.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute bottom-3 left-4 text-white">
                <span className="text-[10px] uppercase font-bold text-[#D8B98A] block">{activeDestination.country}</span>
                <span className="font-editorial text-xl font-bold">{activeDestination.name}</span>
              </div>
            </div>

            <select
              value={selectedDestId}
              onChange={(e) => setSelectedDestId(e.target.value)}
              className="w-full bg-[#F7F5F0] border border-[#171A19]/10 rounded-2xl px-4 py-3 text-xs sm:text-sm font-semibold text-[#171A19] focus:outline-none focus:border-[#2F6F68]"
            >
              {DESTINATIONS.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}, {d.country} ({d.region})
                </option>
              ))}
            </select>
          </div>

          {/* Duration Selector (Pills) */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-[10px] font-extrabold text-[#2F6F68] uppercase tracking-wider">
                Trip Duration
              </label>
              <span className="text-xs font-bold text-[#171A19]">{days} Days</span>
            </div>
            
            <div className="grid grid-cols-6 gap-1.5">
              {durationOptions.map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setDays(num)}
                  className={`py-2 rounded-xl text-xs font-bold transition-all min-h-[38px] ${
                    days === num
                      ? 'bg-[#2F6F68] text-white shadow-md scale-105'
                      : 'bg-[#F7F5F0] text-[#68706D] hover:text-[#171A19] hover:bg-black/5'
                  }`}
                >
                  {num}D
                </button>
              ))}
            </div>
          </div>

          {/* Travel Style Selector */}
          <div>
            <label className="text-[10px] font-extrabold text-[#2F6F68] uppercase tracking-wider block mb-2">
              Travel Vibe & Style
            </label>
            <div className="grid grid-cols-3 gap-2">
              {travelStyles.map((st) => (
                <button
                  key={st.id}
                  type="button"
                  onClick={() => setStyle(st.id)}
                  className={`p-2.5 rounded-2xl text-xs font-bold transition-all flex flex-col items-center space-y-1 border ${
                    style === st.id
                      ? 'bg-[#2F6F68]/10 border-[#2F6F68] text-[#2F6F68] shadow-sm'
                      : 'bg-[#F7F5F0] border-transparent text-[#68706D] hover:text-[#171A19]'
                  }`}
                >
                  <span className="text-base">{st.icon}</span>
                  <span className="text-[11px] truncate w-full text-center">{st.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Interests Filter Chips */}
          <div>
            <label className="text-[10px] font-extrabold text-[#2F6F68] uppercase tracking-wider block mb-2">
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
                    className={`px-3 py-1.5 rounded-full text-[11px] font-semibold transition-all flex items-center space-x-1 ${
                      selected
                        ? 'bg-[#101413] text-white shadow-sm'
                        : 'bg-[#F7F5F0] text-[#68706D] hover:text-[#171A19]'
                    }`}
                  >
                    {selected && <Check className="w-3 h-3 text-[#D8B98A]" />}
                    <span>{interest}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Generate Button */}
          <button
            type="button"
            onClick={handleGenerate}
            disabled={loading}
            className="w-full py-4 rounded-full bg-[#2F6F68] hover:bg-[#265953] text-white font-bold text-xs sm:text-sm shadow-xl shadow-[#2F6F68]/25 transition-transform hover:scale-[1.02] active:scale-95 flex items-center justify-center space-x-2 disabled:opacity-50 min-h-[48px]"
          >
            <Sparkles className="w-4 h-4 text-[#D8B98A]" />
            <span>{loading ? 'AI is generating itinerary...' : '✨ Generate Day-by-Day Plan'}</span>
          </button>

        </div>

        {/* Right Column: Interactive Plan Canvas (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {loading && (
            <div className="no-print">
              <LoadingState type="itinerary" message="Gemini AI is crafting your tailored day-by-day travel timeline..." />
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
