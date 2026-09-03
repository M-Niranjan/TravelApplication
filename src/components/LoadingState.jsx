import React from 'react';
import { Sparkles, Compass, CloudSun, MapPin } from 'lucide-react';

export default function LoadingState({ type = 'card', message = 'Loading details...' }) {
  if (type === 'weather') {
    return (
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/80 shadow-luxury space-y-5">
        <div className="flex justify-between items-center">
          <div className="h-4 w-32 rounded-full skeleton-shimmer" />
          <div className="h-6 w-24 rounded-full skeleton-shimmer" />
        </div>
        <div className="flex items-center space-x-4 pt-2">
          <div className="w-16 h-16 rounded-2xl skeleton-shimmer shrink-0" />
          <div className="space-y-2 flex-1">
            <div className="h-10 w-28 rounded-xl skeleton-shimmer" />
            <div className="h-4 w-40 rounded-lg skeleton-shimmer" />
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div className="h-16 rounded-2xl skeleton-shimmer" />
          <div className="h-16 rounded-2xl skeleton-shimmer" />
          <div className="h-16 rounded-2xl skeleton-shimmer" />
          <div className="h-16 rounded-2xl skeleton-shimmer" />
        </div>
      </div>
    );
  }

  if (type === 'itinerary') {
    return (
      <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/80 shadow-luxury space-y-6">
        <div className="flex items-center space-x-3 text-blue-600 font-bold text-sm">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-ping" />
          <Sparkles className="w-4 h-4 text-rose-500" />
          <span>Aetheria AI is orchestrating your custom travel schedule...</span>
        </div>
        <div className="space-y-4">
          <div className="h-7 w-3/4 rounded-xl skeleton-shimmer" />
          <div className="h-4 w-1/2 rounded-lg skeleton-shimmer" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
            <div className="h-32 rounded-2xl skeleton-shimmer" />
            <div className="h-32 rounded-2xl skeleton-shimmer" />
            <div className="h-32 rounded-2xl skeleton-shimmer" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {[1, 2, 3, 4].map((n) => (
        <div key={n} className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-luxury space-y-4">
          <div className="h-52 w-full rounded-2xl skeleton-shimmer" />
          <div className="h-5 w-2/3 rounded-lg skeleton-shimmer" />
          <div className="h-4 w-1/3 rounded-lg skeleton-shimmer" />
        </div>
      ))}
    </div>
  );
}
