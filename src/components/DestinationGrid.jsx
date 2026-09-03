import React from 'react';
import DestinationCard from './DestinationCard';
import { Search, Compass } from 'lucide-react';

export default function DestinationGrid({ destinations, onResetFilters }) {
  if (!destinations || destinations.length === 0) {
    return (
      <div className="p-12 rounded-3xl bg-white border border-[#101413]/08 text-center max-w-md mx-auto my-12 shadow-luxury">
        <div className="w-14 h-14 rounded-2xl bg-[#1B4944]/10 text-[#1B4944] flex items-center justify-center mx-auto mb-4">
          <Search className="w-6 h-6" />
        </div>
        <h4 className="font-editorial text-2xl font-bold text-[#101413] mb-2">No destinations match your search</h4>
        <p className="text-xs text-[#586260] font-light leading-relaxed mb-6">
          Try clearing your filters or searching for another country or city.
        </p>
        <button
          onClick={onResetFilters}
          className="px-6 py-3 rounded-full bg-[#1B4944] text-white font-bold text-xs hover:bg-[#24655D] transition-transform hover:scale-105 active:scale-95 shadow-md min-h-[44px]"
        >
          Reset Filters
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {destinations.map((dest) => (
        <DestinationCard key={dest.id} destination={dest} />
      ))}
    </div>
  );
}
