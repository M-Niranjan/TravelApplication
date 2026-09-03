import React, { useState, useEffect } from 'react';
import { useGemini } from '../hooks/useGemini';
import ItineraryTimeline from './ItineraryTimeline';
import LoadingState from './LoadingState';
import { DESTINATIONS } from '../data/destinations';
import { Sparkles, Calendar, Compass, Sliders, Check, MapPin } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ItineraryGenerator({ initialDestination = null }) {
  const [selectedDestId, setSelectedDestId] = useState(initialDestination?.id || DESTINATIONS[0].id);
  const [days, setDays] = useState(3);
  const [style, setStyle] = useState('Culture');
  const [budget, setBudget] = useState('Mid-range');
  const [selectedInterests, setSelectedInterests] = useState(['History', 'Food']);
  
  const activeDestination = DESTINATIONS.find((d) => d.id === selectedDestId) || DESTINATIONS[0];

  // Helper to build initial structured day-by-day plan
  const createDefaultPlan = (dest, numDays = 3, planStyle = 'Culture') => {
    const daysArr = [];
    for (let i = 1; i <= numDays; i++) {
      const p1 = dest.places?.[(i - 1) % (dest.places?.length || 1)] || { 
        name: 'Historic Old Quarter', 
        description: 'Explore charming cobblestone avenues and heritage architecture.' 
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
            description: `Enjoy traditional cuisine at a top-rated local bistro.`,
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

  const travelStyles = ['Relaxed', 'Adventure', 'Culture', 'Luxury', 'Food', 'Family'];
  const interestOptions = ['History', 'Nature', 'Shopping', 'Food', 'Photography', 'Nightlife', 'Architecture'];

  // Update plan when destination changes
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

  const handleFormSubmit = async (e) => {
    e.preventDefault();
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
      } catch (e) {}
    }
  };

  return (
    <section id="itinerary-builder" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Section Header */}
      <div className="no-print text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#2F6F68]/10 text-[#2F6F68] text-xs font-bold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5 text-[#D8B98A]" />
          <span>✨ Plan my trip with AI</span>
        </div>
        <h2 className="font-editorial text-3xl sm:text-5xl font-bold text-[#171A19] tracking-tight mb-4">
          Day-by-Day Travel Itinerary
        </h2>
        <p className="text-sm text-[#68706D] font-light">
          Configure your travel preferences and let Gemini AI generate a real, readable day-by-day plan directly on the page.
        </p>
      </div>

      {/* Preferences Form Container */}
      <div className="no-print bg-white p-6 sm:p-10 rounded-3xl border border-[#171A19]/10 shadow-sm mb-12">
        <form onSubmit={handleFormSubmit} className="space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Destination Selection */}
            <div>
              <label className="text-xs font-bold text-[#171A19] uppercase tracking-wider block mb-2">
                Destination
              </label>
              <select
                value={selectedDestId}
                onChange={(e) => setSelectedDestId(e.target.value)}
                className="w-full bg-[#F7F5F0] border border-[#171A19]/10 rounded-2xl px-4 py-3 text-xs sm:text-sm font-semibold text-[#171A19] focus:outline-none focus:border-[#2F6F68]"
              >
                {DESTINATIONS.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}, {d.country}
                  </option>
                ))}
              </select>
            </div>

            {/* Number of Days */}
            <div>
              <label className="text-xs font-bold text-[#171A19] uppercase tracking-wider block mb-2">
                Duration ({days} Days)
              </label>
              <input
                type="range"
                min="1"
                max="7"
                value={days}
                onChange={(e) => setDays(parseInt(e.target.value))}
                className="w-full accent-[#2F6F68] bg-[#F7F5F0] cursor-pointer h-2 rounded-lg mt-3"
              />
              <div className="flex justify-between text-[10px] text-[#68706D] mt-1 font-semibold">
                <span>1 Day</span>
                <span>4 Days</span>
                <span>7 Days</span>
              </div>
            </div>

            {/* Travel Style */}
            <div>
              <label className="text-xs font-bold text-[#171A19] uppercase tracking-wider block mb-2">
                Travel Style
              </label>
              <select
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                className="w-full bg-[#F7F5F0] border border-[#171A19]/10 rounded-2xl px-4 py-3 text-xs sm:text-sm font-semibold text-[#171A19] focus:outline-none focus:border-[#2F6F68]"
              >
                {travelStyles.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>

          </div>

          {/* Interests Filter Chips */}
          <div>
            <label className="text-xs font-bold text-[#171A19] uppercase tracking-wider block mb-2">
              Select Your Interests
            </label>
            <div className="flex flex-wrap gap-2">
              {interestOptions.map((interest) => {
                const selected = selectedInterests.includes(interest);
                return (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => toggleInterest(interest)}
                    className={`px-4 py-2 rounded-full text-xs font-semibold transition-all flex items-center space-x-1.5 ${
                      selected
                        ? 'bg-[#2F6F68] text-white shadow-sm'
                        : 'bg-[#F7F5F0] text-[#68706D] hover:text-[#171A19] border border-[#171A19]/08'
                    }`}
                  >
                    {selected && <Check className="w-3.5 h-3.5 text-[#D8B98A]" />}
                    <span>{interest}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Generate Button */}
          <div className="pt-2 text-right">
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto px-10 py-4 rounded-full bg-[#2F6F68] hover:bg-[#265953] text-white font-bold text-sm shadow-md shadow-[#2F6F68]/20 transition-transform hover:scale-[1.02] flex items-center justify-center space-x-2 disabled:opacity-50 min-h-[44px]"
            >
              <Sparkles className="w-4 h-4 text-[#D8B98A]" />
              <span>{loading ? 'AI is planning your journey...' : '✨ Generate Day-by-Day Plan'}</span>
            </button>
          </div>

        </form>
      </div>

      {/* Loading Indicator */}
      {loading && (
        <div className="no-print">
          <LoadingState type="itinerary" message="Gemini AI is crafting your day-by-day travel timeline..." />
        </div>
      )}

      {/* Rendered Real, Readable Day-by-Day Plan on Page */}
      {itineraryResult && !loading && (
        <div className="space-y-6">
          <ItineraryTimeline itinerary={itineraryResult} />
        </div>
      )}

    </section>
  );
}
