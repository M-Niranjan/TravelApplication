import React from 'react';
import { motion } from 'framer-motion';
import { REGIONS, TRAVEL_TYPES } from '../data/destinations';

export default function Filters({ selectedRegion, onSelectRegion, selectedType, onSelectType }) {
  return (
    <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 py-3 bg-white/70 backdrop-blur-md px-4 sm:px-6 rounded-3xl border border-slate-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
      
      {/* Region Filter Chips */}
      <div className="flex items-center space-x-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 no-scrollbar">
        <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mr-2 shrink-0">Region</span>
        <div className="flex items-center space-x-1.5 p-1 bg-slate-100/80 rounded-full">
          {REGIONS.map((region) => (
            <motion.button
              whileTap={{ scale: 0.95 }}
              key={region}
              onClick={() => onSelectRegion(region)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedRegion === region
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              {region}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Travel Type Filter Chips */}
      <div className="flex items-center space-x-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 no-scrollbar">
        <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mr-2 shrink-0">Vibe</span>
        <div className="flex items-center space-x-1.5 p-1 bg-slate-100/80 rounded-full">
          {TRAVEL_TYPES.map((type) => (
            <motion.button
              whileTap={{ scale: 0.95 }}
              key={type}
              onClick={() => onSelectType(type)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedType === type
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              {type}
            </motion.button>
          ))}
        </div>
      </div>

    </div>
  );
}
