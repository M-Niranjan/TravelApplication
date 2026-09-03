import React from 'react';
import DestinationCard from './DestinationCard';
import { Search } from 'lucide-react';

export default function DestinationGrid({ destinations, onResetFilters }) {
  if (!destinations || destinations.length === 0) {
    return (
      <div className="p-12 rounded-3xl bg-white border border-[#171A19]/10 text-center max-w-md mx-auto my-12 shadow-sm">
        <div className="w-14 h-14 rounded-full bg-[#2F6F68]/10 text-[#2F6F68] flex items-center justify-center mx-auto mb-4">
          <Search className="w-6 h-6" />
        </div>
        <h4 className="font-editorial text-2xl font-bold text-[#171A19] mb-2">No destinations found</h4>
        <p className="text-xs text-[#68706D] font-medium leading-relaxed mb-6">
          Try searching for another city or country.
        </p>
        <button
          onClick={onResetFilters}
          className="px-6 py-2.5 rounded-full bg-[#2F6F68] text-white font-bold text-xs hover:bg-[#265953] transition-colors shadow-sm"
        >
          Reset Search Filters
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
