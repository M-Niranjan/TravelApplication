import React from 'react';
import { Search, X } from 'lucide-react';

export default function SearchBar({ value, onChange, onClear }) {
  return (
    <div className="relative w-full max-w-xl">
      <Search className="w-4 h-4 text-blue-500 absolute left-4 top-1/2 -translate-y-1/2" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search by city, country, or keyword (e.g. Paris, Tokyo, Beach)..."
        className="w-full bg-white border border-slate-200/90 rounded-full pl-11 pr-10 py-3.5 text-xs sm:text-sm font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/15 shadow-sm transition-all"
      />
      {value && (
        <button
          onClick={onClear}
          className="p-1.5 rounded-full text-slate-400 hover:text-slate-900 absolute right-3.5 top-1/2 -translate-y-1/2 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
