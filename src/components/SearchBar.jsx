import React from 'react';
import { Search, X } from 'lucide-react';

export default function SearchBar({ value, onChange, onClear }) {
  return (
    <div className="relative w-full max-w-xl">
      <Search className="w-4 h-4 text-[#68706D] absolute left-4 top-1/2 -translate-y-1/2" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search by city, country, or keyword (e.g. Paris, Tokyo, Beach)..."
        className="w-full bg-white border border-[#171A19]/10 rounded-full pl-11 pr-10 py-3 text-xs sm:text-sm text-[#171A19] placeholder-[#68706D] focus:outline-none focus:border-[#2F6F68] focus:ring-2 focus:ring-[#2F6F68]/20 shadow-sm transition-all"
      />
      {value && (
        <button
          onClick={onClear}
          className="p-1 rounded-full text-[#68706D] hover:text-[#171A19] absolute right-3.5 top-1/2 -translate-y-1/2"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
