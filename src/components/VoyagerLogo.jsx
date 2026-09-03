import React from 'react';
import { motion } from 'framer-motion';

export default function VoyagerLogo({ size = 'md', showText = true, isLight = false }) {
  const sizeMap = {
    sm: { icon: 'w-7 h-7', text: 'text-lg', sub: 'text-[8px]', svg: 14 },
    md: { icon: 'w-8 h-8', text: 'text-xl', sub: 'text-[9px]', svg: 16 },
    lg: { icon: 'w-10 h-10', text: 'text-2xl', sub: 'text-[10px]', svg: 20 },
    xl: { icon: 'w-12 h-12', text: 'text-3xl', sub: 'text-[11px]', svg: 24 }
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  return (
    <div className="flex items-center space-x-3 select-none">
      
      {/* 3D Gradient Compass Rose & Star Emblem */}
      <motion.div
        whileHover={{ rotate: 90, scale: 1.05 }}
        transition={{ type: 'spring', stiffness: 220, damping: 12 }}
        className={`${currentSize.icon} rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-rose-500 flex items-center justify-center shadow-lg shadow-blue-500/30 shrink-0 p-1.5 relative group`}
      >
        {/* Modern Vector Compass Star */}
        <svg 
          viewBox="0 0 24 24" 
          fill="none" 
          className="w-full h-full text-white"
          stroke="currentColor" 
          strokeWidth="2.2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          {/* Outer Ring */}
          <circle cx="12" cy="12" r="9.5" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeDasharray="2 2" />
          
          {/* North-South Needle */}
          <polygon points="12 3 14.5 12 12 21 9.5 12" fill="white" stroke="none" />
          
          {/* East-West Needle */}
          <polygon points="3 12 12 9.5 21 12 12 14.5" fill="rgba(255,255,255,0.75)" stroke="none" />
          
          {/* Center Jewel */}
          <circle cx="12" cy="12" r="2.2" fill="#F43F5E" stroke="white" strokeWidth="1" />
        </svg>
      </motion.div>

      {/* Brand Typography */}
      {showText && (
        <div className="flex flex-col">
          <span className={`font-editorial ${currentSize.text} font-bold tracking-tight leading-none ${
            isLight ? 'text-white' : 'text-slate-900'
          }`}>
            Voyager <span className="italic font-normal font-editorial bg-gradient-to-r from-blue-600 to-rose-500 bg-clip-text text-transparent">Luxe</span>
          </span>
          <span className={`uppercase tracking-[0.22em] font-extrabold ${currentSize.sub} mt-0.5 ${
            isLight ? 'text-blue-300' : 'text-blue-600'
          }`}>
            Intelligent Travel
          </span>
        </div>
      )}

    </div>
  );
}
