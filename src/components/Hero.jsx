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

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentMediaIndex((prev) => (prev + 1) % TRAVEL_MEDIA.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const activeVideo = videoRefs.current[currentMediaIndex];
    if (activeVideo) {
      activeVideo.currentTime = 0;
      const playPromise = activeVideo.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    }
  }, [currentMediaIndex]);

  return (
    <section className="relative min-h-[92vh] sm:min-h-screen flex items-center justify-center overflow-hidden bg-[#0F172A]">
      
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
              <img
                src={item.image}
                alt={item.name}
                className="absolute inset-0 w-full h-full object-cover scale-105 transition-transform duration-[6000ms] ease-out"
                loading="eager"
              />

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

      {/* 2. Soft Midnight Sapphire Gradient Vignette (Light & Vibrant) */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/75 via-[#0F172A]/35 to-black/20 z-20" />
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/10 to-black/30 z-20 pointer-events-none" />

      {/* 3. Hero Content */}
      <div className="relative z-30 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-28 pb-16 flex flex-col items-center">
        
        {/* Radiant Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-xl border border-white/25 text-white text-xs font-bold tracking-wider uppercase mb-6 shadow-xl"
        >
          <div className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>AI-Powered Global Travel Platform</span>
        </motion.div>

        {/* Large Editorial Headline with Coral & Azure Gradient */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
          className="font-editorial text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[1.08] mb-6 drop-shadow-2xl"
        >
          Discover Extraordinary <br />
          <span className="italic font-normal bg-gradient-to-r from-blue-400 via-indigo-300 to-rose-400 bg-clip-text text-transparent font-editorial">
            Destinations
          </span> Across Earth
        </motion.h1>

        {/* Supporting Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          className="text-sm sm:text-base md:text-lg text-slate-200 font-light max-w-2xl mx-auto mb-10 leading-relaxed drop-shadow-md"
        >
          Curated iconic landmarks, live satellite climates, custom day-by-day itineraries, and smart packing assistants powered by Google Gemini AI.
        </motion.p>

        {/* Primary Action Buttons with Electric Azure & Radiant Coral */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md sm:max-w-none"
        >
          <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
            <Link
              to="/destinations"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-xs sm:text-sm tracking-wide shadow-xl shadow-blue-500/35 transition-all flex items-center justify-center space-x-2.5 min-h-[48px]"
            >
              <Compass className="w-4 h-4 text-white" />
              <span>Explore Destinations</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
            <Link
              to="/itinerary"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/15 hover:bg-white/25 text-white backdrop-blur-xl border border-white/25 font-extrabold text-xs sm:text-sm tracking-wide transition-all flex items-center justify-center space-x-2 min-h-[48px]"
            >
              <Calendar className="w-4 h-4 text-rose-400" />
              <span>Plan AI Itinerary</span>
            </Link>
          </motion.div>
        </motion.div>

        {/* Live Active Slide Location Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-14 inline-flex items-center space-x-3 px-4 py-2 rounded-full bg-black/50 backdrop-blur-xl border border-white/15 text-white text-xs shadow-lg"
        >
          <MapPin className="w-3.5 h-3.5 text-rose-400" />
          <span className="font-bold">{activeItem.name}, {activeItem.country}</span>
          <div className="flex space-x-1 pl-2">
            {TRAVEL_MEDIA.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentMediaIndex(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === currentMediaIndex 
                    ? 'w-6 bg-gradient-to-r from-blue-400 to-rose-400' 
                    : 'w-1.5 bg-white/30 hover:bg-white/60'
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
