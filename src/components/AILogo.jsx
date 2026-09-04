import React from 'react';
import { motion } from 'framer-motion';

export default function AILogo({ size = 'md', className = '' }) {
  const sizeMap = {
    sm: 'w-6 h-6 p-1',
    md: 'w-8 h-8 p-1.5',
    lg: 'w-10 h-10 p-2',
    xl: 'w-12 h-12 p-2.5'
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  return (
    <div className={`relative flex items-center justify-center shrink-0 ${className}`}>
      
      {/* Outer Radiant Glow Ring */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0.9, 0.6] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-rose-500 blur-[4px] -z-10"
      />

      {/* Modern 3D-Style Gradient Capsule */}
      <div className={`${currentSize} rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-rose-500 flex items-center justify-center shadow-md shadow-blue-500/30 border border-white/20 relative overflow-hidden`}>
        
        {/* Subtle Highlight Shimmer */}
        <div className="absolute top-0 left-0 right-0 h-1/2 bg-white/20 rounded-t-2xl pointer-events-none" />

        {/* Crisp HD AI Vector Diamond Star */}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="w-full h-full text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* 4-Point AI Star */}
          <path
            d="M12 2L14.8 9.2L22 12L14.8 14.8L12 22L9.2 14.8L2 12L9.2 9.2L12 2Z"
            fill="white"
            stroke="none"
          />
          {/* Secondary AI Accent Sparkle */}
          <circle cx="19" cy="5" r="1.5" fill="#FBBF24" stroke="none" />
          <circle cx="5" cy="19" r="1" fill="#FB7185" stroke="none" />
        </svg>
      </div>

    </div>
  );
}
