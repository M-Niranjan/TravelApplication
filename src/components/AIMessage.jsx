import React from 'react';
import { Sparkles, User, Calendar, ArrowDownRight } from 'lucide-react';

export default function AIMessage({ message, onViewItineraryOnPage }) {
  const isAI = message.sender === 'ai' || message.sender === 'bot';
  const isItineraryRelated = isAI && (
    message.text.toLowerCase().includes('day 1') ||
    message.text.toLowerCase().includes('itinerary') ||
    message.text.toLowerCase().includes('plan') ||
    message.text.toLowerCase().includes('recommend spending')
  );

  return (
    <div className={`flex items-start space-x-2.5 ${isAI ? 'justify-start' : 'justify-end'} animate-fade-in`}>
      {isAI && (
        <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
        </div>
      )}

      <div
        className={`max-w-[85%] p-3.5 sm:p-4 rounded-2xl text-xs leading-relaxed ${
          isAI
            ? 'bg-white text-slate-900 border border-slate-200/90 rounded-tl-none font-sans shadow-sm font-light'
            : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-tr-none shadow-md shadow-blue-500/20'
        }`}
      >
        <div className="whitespace-pre-wrap">{message.text}</div>

        {/* Action card to render structured day-by-day plan */}
        {isItineraryRelated && onViewItineraryOnPage && (
          <div className="mt-3 pt-2.5 border-t border-slate-100">
            <button
              onClick={onViewItineraryOnPage}
              className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-[11px] flex items-center justify-between shadow-sm transition-transform hover:scale-[1.02] cursor-pointer"
            >
              <div className="flex items-center space-x-1.5">
                <Calendar className="w-3.5 h-3.5 text-amber-300" />
                <span>View Structured Day-by-Day Plan</span>
              </div>
              <ArrowDownRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        <span className={`block text-[9px] mt-1.5 text-right ${isAI ? 'text-slate-400' : 'text-white/75'}`}>
          {message.timestamp}
        </span>
      </div>

      {!isAI && (
        <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-rose-500 to-pink-500 text-white flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs shadow-sm">
          <User className="w-3.5 h-3.5" />
        </div>
      )}
    </div>
  );
}
