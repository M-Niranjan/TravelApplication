import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, Sparkles, Compass, MapPin, Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const TRAVEL_MEDIA = [
  {
    id: 'positano',
    name: 'Positano, Amalfi Coast',
    country: 'Italy',
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=85&w=1920&auto=format&fit=crop',
    video: 'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-positano-coastline-in-italy-40742-large.mp4',
  },
  {
    id: 'swiss-alps',
    name: 'Swiss Alps & Lake',
    country: 'Switzerland',
    image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=85&w=1920&auto=format&fit=crop',
    video: 'https://assets.mixkit.co/videos/preview/mixkit-scenic-view-of-mountains-and-a-lake-41544-large.mp4',
  },
  {
    id: 'tropical-beach',
    name: 'Maldives Island Beach',
    country: 'Maldives',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=85&w=1920&auto=format&fit=crop',
    video: 'https://assets.mixkit.co/videos/preview/mixkit-top-view-of-a-beach-with-turquoise-water-41553-large.mp4',
  },
  {
    id: 'santorini',
    name: 'Santorini Caldera',
    country: 'Greece',
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=85&w=1920&auto=format&fit=crop',
    video: 'https://assets.mixkit.co/videos/preview/mixkit-rocky-shore-of-a-greek-island-4179-large.mp4',
  },
  {
    id: 'airplane-journey',
    name: 'Flight Above Clouds',
    country: 'International',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=85&w=1920&auto=format&fit=crop',
    video: 'https://assets.mixkit.co/videos/preview/mixkit-airplane-flying-above-the-clouds-41549-large.mp4',
  },
  {
    id: 'kyoto',
    name: 'Kyoto Heritage Gardens',
    country: 'Japan',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=85&w=1920&auto=format&fit=crop',
    video: 'https://assets.mixkit.co/videos/preview/mixkit-sun-setting-over-the-city-702-large.mp4',
  },
  {
    id: 'paris',
    name: 'Paris Eiffel Sunset',
    country: 'France',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=85&w=1920&auto=format&fit=crop',
    video: 'https://assets.mixkit.co/videos/preview/mixkit-car-traveling-through-a-pine-forest-34283-large.mp4',
  },
  {
    id: 'dubai',
    name: 'Dubai Skyline & Marina',
    country: 'United Arab Emirates',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=85&w=1920&auto=format&fit=crop',
    video: 'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-city-traffic-at-night-41548-large.mp4',
  }
];

export default function Hero({ onOpenAIChat }) {
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const videoRefs = useRef([]);
  const activeItem = TRAVEL_MEDIA[currentMediaIndex];

  // Auto-cycle through media smoothly every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentMediaIndex((prev) => (prev + 1) % TRAVEL_MEDIA.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  // Play video smoothly when it becomes active
  useEffect(() => {
    const activeVideo = videoRefs.current[currentMediaIndex];
    if (activeVideo) {
      activeVideo.currentTime = 0;
      const playPromise = activeVideo.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Handled autoplay restrictions gracefully
        });
      }
    }
  }, [currentMediaIndex]);

  return (
    <section className="relative min-h-[92vh] sm:min-h-screen flex items-center justify-center overflow-hidden bg-[#101413]">
      
      {/* 1. Cinematic Background Auto-Crossfade Layer */}
      <div className="absolute inset-0 w-full h-full">
        {TRAVEL_MEDIA.map((item, index) => {
          const isActive = index === currentMediaIndex;
          return (
            <div
              key={item.id}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              {/* Fallback & Loading High-Res Image */}
              <img
                src={item.image}
                alt={item.name}
                className="absolute inset-0 w-full h-full object-cover scale-105 transition-transform duration-[6000ms] ease-out"
                loading="eager"
              />

              {/* Seamless Loop Video */}
              {item.video && (
                <video
                  ref={(el) => (videoRefs.current[index] = el)}
                  src={item.video}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              )}
            </div>
          );
        })}
      </div>

      {/* 2. Deep Gradient Vignette for Maximum Text Legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#101413] via-[#101413]/55 to-[#101413]/40 z-20" />
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/20 to-black/60 z-20 pointer-events-none" />

      {/* 3. Hero Content */}
      <div className="relative z-30 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24 pb-16 flex flex-col items-center">
        
        {/* Glowing Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/15 hover:bg-white/20 backdrop-blur-xl border border-white/20 text-white text-xs font-semibold tracking-wider uppercase mb-6 shadow-lg"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#C29C61] animate-pulse" />
          <span>AI-Powered Global Travel Guide</span>
        </motion.div>

        {/* Large Editorial Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
          className="font-editorial text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[1.08] mb-6 drop-shadow-2xl"
        >
          Explore Extraordinary <br />
          <span className="italic font-normal text-[#E0C89E] font-editorial">Destinations</span> Across Earth
        </motion.h1>

        {/* Supporting Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
          className="text-sm sm:text-base md:text-lg text-slate-200 font-light max-w-2xl mx-auto mb-10 leading-relaxed drop-shadow-md"
        >
          Curated iconic landmarks, live local climates, custom day-by-day itineraries, and smart packing assistants powered by Google Gemini AI.
        </motion.p>

        {/* Primary Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md sm:max-w-none"
        >
          <Link
            to="/destinations"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#1B4944] hover:bg-[#24655D] text-white font-bold text-xs sm:text-sm tracking-wide shadow-xl shadow-[#1B4944]/40 hover:scale-105 active:scale-95 transition-all flex items-center justify-center space-x-2.5 min-h-[48px]"
          >
            <Compass className="w-4 h-4 text-[#C29C61]" />
            <span>Explore Destinations</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            to="/itinerary"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/15 hover:bg-white/25 text-white backdrop-blur-xl border border-white/25 font-bold text-xs sm:text-sm tracking-wide hover:scale-105 active:scale-95 transition-all flex items-center justify-center space-x-2 min-h-[48px]"
          >
            <Calendar className="w-4 h-4 text-[#C29C61]" />
            <span>Plan Itinerary</span>
          </Link>
        </motion.div>

        {/* Live Active Slide Location Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-14 inline-flex items-center space-x-3 px-4 py-2 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 text-white text-xs"
        >
          <MapPin className="w-3.5 h-3.5 text-[#C29C61]" />
          <span className="font-semibold">{activeItem.name}, {activeItem.country}</span>
          <div className="flex space-x-1 pl-2">
            {TRAVEL_MEDIA.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentMediaIndex(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === currentMediaIndex ? 'w-5 bg-[#C29C61]' : 'w-1.5 bg-white/30 hover:bg-white/60'
                }`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </motion.div>

      </div>

      {/* Down Arrow Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 text-white/60 hover:text-white transition-colors cursor-pointer animate-bounce-gentle hidden sm:block">
        <ArrowDown className="w-5 h-5" />
      </div>

    </section>
  );
}
