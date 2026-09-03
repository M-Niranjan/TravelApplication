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
        <div className="w-7 h-7 rounded-full bg-[#2F6F68] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
          <Sparkles className="w-4 h-4 text-[#D8B98A]" />
        </div>
      )}

      <div
        className={`max-w-[85%] p-3.5 rounded-2xl text-xs leading-relaxed ${
          isAI
            ? 'bg-[#F7F5F0] text-[#171A19] border border-[#171A19]/08 rounded-tl-none font-sans'
            : 'bg-[#2F6F68] text-white font-medium rounded-tr-none shadow-sm'
        }`}
      >
        <div className="whitespace-pre-wrap">{message.text}</div>

        {/* Action card to render & view real structured day-by-day plan on the page */}
        {isItineraryRelated && onViewItineraryOnPage && (
          <div className="mt-3 pt-2.5 border-t border-[#171A19]/10">
            <button
              onClick={onViewItineraryOnPage}
              className="w-full py-2 px-3 rounded-xl bg-[#2F6F68] hover:bg-[#265953] text-white font-bold text-[11px] flex items-center justify-between shadow-sm transition-transform hover:scale-[1.02]"
            >
              <div className="flex items-center space-x-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#D8B98A]" />
                <span>View Full Day-by-Day Plan on Page</span>
              </div>
              <ArrowDownRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        <span className={`block text-[9px] mt-1.5 text-right ${isAI ? 'text-[#68706D]' : 'text-white/70'}`}>
          {message.timestamp}
        </span>
      </div>

      {!isAI && (
        <div className="w-7 h-7 rounded-full bg-[#D8B98A] text-[#101413] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
          <User className="w-4 h-4" />
        </div>
      )}
    </div>
  );
}
