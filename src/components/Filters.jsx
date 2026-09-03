import React from 'react';
import { motion } from 'framer-motion';
import { REGIONS, TRAVEL_TYPES } from '../data/destinations';

export default function Filters({ selectedRegion, onSelectRegion, selectedType, onSelectType }) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-2">
      
      {/* Region Filter Chips */}
      <div className="flex items-center space-x-1.5 overflow-x-auto w-full md:w-auto pb-1 no-scrollbar">
        <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mr-2 shrink-0">Region:</span>
        {REGIONS.map((region) => (
          <motion.button
            whileTap={{ scale: 0.94 }}
            key={region}
            onClick={() => onSelectRegion(region)}
            className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              selectedRegion === region
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/25'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200/80'
            }`}
          >
            {region}
          </motion.button>
        ))}
      </div>

      {/* Travel Type Filter Chips */}
      <div className="flex items-center space-x-1.5 overflow-x-auto w-full md:w-auto pb-1 no-scrollbar">
        <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mr-2 shrink-0">Type:</span>
        {TRAVEL_TYPES.map((type) => (
          <motion.button
            whileTap={{ scale: 0.94 }}
            key={type}
            onClick={() => onSelectType(type)}
            className={`px-3.5 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              selectedType === type
                ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-md shadow-rose-500/25'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200/80'
            }`}
          >
            {type}
          </motion.button>
        ))}
      </div>

    </div>
  );
}
