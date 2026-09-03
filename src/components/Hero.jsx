import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, Sparkles, Compass, MapPin, Calendar } from 'lucide-react';

// Curated Collection of High-Definition Travel Destinations with Optimized Visuals & Video Footage
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
    video: 'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-city-traffic-at-night-11-large.mp4',
  }
];

export default function Hero({ onOpenAIChat }) {
  const [activeIdx, setActiveIdx] = useState(0);

  // Preload all destination images immediately into browser cache
  useEffect(() => {
    TRAVEL_MEDIA.forEach((item) => {
      const img = new Image();
      img.src = item.image;
    });
  }, []);

  // Change background photo/media every 3 seconds reliably
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx((prevIdx) => (prevIdx + 1) % TRAVEL_MEDIA.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  const currentMedia = TRAVEL_MEDIA[activeIdx];

  return (
    <section className="relative min-h-[92vh] sm:min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-[#101413]">
      
      {/* Dynamic 3-Second Crossfade Background Photo & Video Layer */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <AnimatePresence mode="sync">
          <motion.div
            key={currentMedia.id}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1.02 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: 'easeInOut' }}
            className="absolute inset-0 w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: `url(${currentMedia.image})`,
            }}
          >
            {/* Optional Ambient Video Overlay when supported */}
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-50 pointer-events-none"
            >
              <source src={currentMedia.video} type="video/mp4" />
            </video>
          </motion.div>
        </AnimatePresence>

        {/* Translucent Layered Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-black/35 pointer-events-none z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/30 pointer-events-none z-10" />

        {/* Live Location Tag (Bottom Left of Hero — completely clear of floating AI button) */}
        <motion.div
          key={`tag-${currentMedia.id}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
          className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8 z-20 flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-xs font-semibold shadow-lg pointer-events-none"
        >
          <MapPin className="w-3.5 h-3.5 text-[#D8B98A]" />
          <span>{currentMedia.name}</span>
          <span className="text-[#D8B98A] text-[10px]">· 3s live</span>
        </motion.div>
      </div>

      {/* Hero Content Container */}
      <div className="relative z-30 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
        
        {/* 1. Eyebrow Tag */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-[10px] sm:text-xs font-bold tracking-widest uppercase text-[#D8B98A] mb-4 sm:mb-6 shadow-lg"
        >
          <Compass className="w-3.5 h-3.5 text-[#D8B98A]" />
          <span>DISCOVER THE WORLD</span>
        </motion.div>

        {/* 2. Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
          className="font-editorial font-bold tracking-tight text-white mb-4 sm:mb-6 leading-[1.08] drop-shadow-xl"
          style={{ fontSize: 'clamp(2.5rem, 7.5vw, 6.5rem)' }}
        >
          Find your next <br />
          <span className="italic font-normal text-[#D8B98A]">great escape.</span>
        </motion.h1>

        {/* 3. Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
          className="max-w-xl mx-auto text-xs sm:text-base md:text-lg text-slate-100 font-light mb-8 sm:mb-10 leading-relaxed drop-shadow-md px-2"
        >
          Explore beautiful destinations, discover famous places and plan your journey with AI.
        </motion.p>

        {/* 4. Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-md mx-auto w-full px-4 sm:px-0"
        >
          <a
            href="#explorer"
            className="w-full sm:w-auto px-8 py-3.5 sm:py-4 rounded-full bg-[#2F6F68] hover:bg-[#265953] text-white font-bold text-xs sm:text-sm transition-all shadow-2xl shadow-[#2F6F68]/50 hover:scale-[1.03] flex items-center justify-center space-x-2 min-h-[44px]"
          >
            <span>Explore destinations</span>
          </a>

          <a
            href="#itinerary-builder"
            className="w-full sm:w-auto px-8 py-3.5 sm:py-4 rounded-full bg-black/50 hover:bg-black/70 text-white font-bold text-xs sm:text-sm backdrop-blur-md border border-white/30 transition-all hover:scale-[1.03] flex items-center justify-center space-x-2 shadow-xl min-h-[44px]"
          >
            <Calendar className="w-4 h-4 text-[#D8B98A]" />
            <span>Plan Itinerary</span>
          </a>
        </motion.div>

        {/* 5. Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.9 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-12 sm:mt-20 inline-flex flex-col items-center cursor-pointer text-slate-200 hover:text-white transition-colors"
          onClick={() => {
            document.getElementById('explorer')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <span className="text-[10px] uppercase tracking-widest font-semibold mb-1.5 drop-shadow-md">Scroll to explore</span>
          <ArrowDown className="w-4 h-4 text-[#D8B98A] animate-bounce-gentle" />
        </motion.div>

      </div>
    </section>
  );
}
