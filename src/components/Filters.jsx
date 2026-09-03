import React from 'react';
import { REGIONS, TRAVEL_TYPES } from '../data/destinations';

export default function Filters({ selectedRegion, onSelectRegion, selectedType, onSelectType }) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-2">
      
      {/* Region Filter Chips */}
      <div className="flex items-center space-x-1.5 overflow-x-auto w-full md:w-auto pb-1 no-scrollbar">
        <span className="text-xs font-bold text-[#68706D] uppercase tracking-wider mr-2 shrink-0">Region:</span>
        {REGIONS.map((region) => (
          <button
            key={region}
            onClick={() => onSelectRegion(region)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              selectedRegion === region
                ? 'bg-[#2F6F68] text-white shadow-sm'
                : 'bg-white text-[#171A19] hover:bg-gray-100 border border-[#171A19]/10'
            }`}
          >
            {region}
          </button>
        ))}
      </div>

      {/* Travel Type Filter Chips */}
      <div className="flex items-center space-x-1.5 overflow-x-auto w-full md:w-auto pb-1 no-scrollbar">
        <span className="text-xs font-bold text-[#68706D] uppercase tracking-wider mr-2 shrink-0">Type:</span>
        {TRAVEL_TYPES.map((type) => (
          <button
            key={type}
            onClick={() => onSelectType(type)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
              selectedType === type
                ? 'bg-[#D8B98A] text-[#101413] font-bold shadow-sm'
                : 'bg-white/60 text-[#68706D] hover:text-[#171A19] border border-[#171A19]/08'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

    </div>
  );
}
