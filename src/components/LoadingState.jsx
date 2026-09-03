import React from 'react';

export default function LoadingState({ type = 'card', message = 'Loading details...' }) {
  if (type === 'weather') {
    return (
      <div className="p-6 rounded-2xl bg-white border border-[#171A19]/10 shadow-sm animate-pulse space-y-4">
        <div className="flex justify-between items-center">
          <div className="h-4 w-28 bg-gray-200 rounded"></div>
          <div className="h-4 w-16 bg-gray-200 rounded"></div>
        </div>
        <div className="flex items-center space-x-4 pt-2">
          <div className="w-12 h-12 rounded-xl bg-gray-200"></div>
          <div className="space-y-2">
            <div className="h-8 w-20 bg-gray-200 rounded"></div>
            <div className="h-3 w-32 bg-gray-200 rounded"></div>
          </div>
        </div>
        <p className="text-xs text-[#68706D] font-medium pt-2">{message}</p>
      </div>
    );
  }

  if (type === 'itinerary') {
    return (
      <div className="p-8 rounded-3xl bg-white border border-[#171A19]/10 shadow-sm space-y-6">
        <div className="flex items-center space-x-3 text-[#2F6F68] font-bold text-sm">
          <span className="w-2.5 h-2.5 rounded-full bg-[#2F6F68] animate-ping" />
          <span>Travel AI is creating your itinerary...</span>
        </div>
        <div className="space-y-4">
          <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
            <div className="h-28 bg-gray-100 rounded-2xl animate-pulse"></div>
            <div className="h-28 bg-gray-100 rounded-2xl animate-pulse"></div>
            <div className="h-28 bg-gray-100 rounded-2xl animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 rounded-3xl bg-white border border-[#171A19]/10 shadow-sm animate-pulse space-y-4">
      <div className="h-48 w-full bg-gray-200 rounded-2xl"></div>
      <div className="h-5 w-2/3 bg-gray-200 rounded"></div>
      <div className="h-4 w-1/3 bg-gray-200 rounded"></div>
      <p className="text-xs text-[#68706D] pt-2">{message}</p>
    </div>
  );
}
