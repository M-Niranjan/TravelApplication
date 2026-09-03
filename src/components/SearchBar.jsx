import React from 'react';
import { Search, X } from 'lucide-react';

export default function SearchBar({ value, onChange, onClear }) {
  return (
    <div className="relative w-full max-w-xl">
      <Search className="w-4 h-4 text-[#8A9592] absolute left-4 top-1/2 -translate-y-1/2" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search by city, country, or keyword (e.g. Paris, Tokyo, Beach)..."
        className="w-full bg-white border border-[#101413]/10 rounded-full pl-11 pr-10 py-3.5 text-xs sm:text-sm text-[#101413] placeholder-[#8A9592] focus:outline-none focus:border-[#1B4944] focus:ring-2 focus:ring-[#1B4944]/15 shadow-sm transition-all"
      />
      {value && (
        <button
          onClick={onClear}
          className="p-1.5 rounded-full text-[#8A9592] hover:text-[#101413] absolute right-3.5 top-1/2 -translate-y-1/2"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
