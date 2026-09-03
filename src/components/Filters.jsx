import React from 'react';
import { REGIONS, TRAVEL_TYPES } from '../data/destinations';

export default function Filters({ selectedRegion, onSelectRegion, selectedType, onSelectType }) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-2">
      
      {/* Region Filter Chips */}
      <div className="flex items-center space-x-1.5 overflow-x-auto w-full md:w-auto pb-1 no-scrollbar">
        <span className="text-[10px] font-extrabold text-[#8A9592] uppercase tracking-wider mr-2 shrink-0">Region:</span>
        {REGIONS.map((region) => (
          <button
            key={region}
            onClick={() => onSelectRegion(region)}
            className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              selectedRegion === region
                ? 'bg-[#1B4944] text-white shadow-sm'
                : 'bg-white text-[#101413] hover:bg-black/5 border border-[#101413]/08'
            }`}
          >
            {region}
          </button>
        ))}
      </div>

      {/* Travel Type Filter Chips */}
      <div className="flex items-center space-x-1.5 overflow-x-auto w-full md:w-auto pb-1 no-scrollbar">
        <span className="text-[10px] font-extrabold text-[#8A9592] uppercase tracking-wider mr-2 shrink-0">Type:</span>
        {TRAVEL_TYPES.map((type) => (
          <button
            key={type}
            onClick={() => onSelectType(type)}
            className={`px-3.5 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
              selectedType === type
                ? 'bg-[#E0C89E] text-[#101413] font-bold shadow-sm'
                : 'bg-white text-[#586260] hover:text-[#101413] border border-[#101413]/08'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

    </div>
  );
}
