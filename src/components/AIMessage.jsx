import React from 'react';
import { Sparkles, User, Calendar, ArrowDownRight } from 'lucide-react';
import AILogo from './AILogo';

/**
 * Formats AI text into clean, human-readable prose with emojis.
 * Removes raw markdown artifacts like **, __, ###, ##, #.
 */
function renderHumanReadableContent(rawText) {
  if (!rawText) return null;

  // Split into lines
  const lines = rawText.split('\n');

  return lines.map((line, lineIndex) => {
    let trimmed = line.trim();

    if (!trimmed) {
      return <div key={lineIndex} className="h-2" />;
    }

    // Clean up header hashes (#, ##, ###)
    if (/^#{1,6}\s+/.test(trimmed)) {
      const headerText = trimmed.replace(/^#{1,6}\s+/, '');
      const cleaned = headerText.replace(/\*\*(.*?)\*\*/g, '$1').replace(/\*(.*?)\*/g, '$1');
      return (
        <h4 key={lineIndex} className="font-bold text-slate-900 text-xs sm:text-sm mt-2 mb-1 flex items-center space-x-1.5">
          <span>✨</span>
          <span>{cleaned}</span>
        </h4>
      );
    }

    // Check if line is a bullet point (starts with *, -, •, or number)
    const isBullet = /^[•\-\*]\s+/.test(trimmed) || /^\d+\.\s+/.test(trimmed);
    let contentToParse = trimmed;
    let bulletPrefix = null;

    if (/^[•\-\*]\s+/.test(trimmed)) {
      contentToParse = trimmed.replace(/^[•\-\*]\s+/, '');
      bulletPrefix = '📍';
    } else if (/^(\d+)\.\s+/.test(trimmed)) {
      const match = trimmed.match(/^(\d+)\.\s+/);
      contentToParse = trimmed.replace(/^(\d+)\.\s+/, '');
      bulletPrefix = `${match[1]}.`;
    }

    // Parse bold segments (**text** or __text__) into clean bold spans
    const parts = [];
    const regex = /(\*\*.*?\*\*|__.*?__)/g;
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(contentToParse)) !== null) {
      if (match.index > lastIndex) {
        parts.push(contentToParse.substring(lastIndex, match.index));
      }
      const boldText = match[0].replace(/^\*\*|^\_\_|\*\*$|\_\_$/g, '');
      parts.push(
        <strong key={`bold-${lineIndex}-${match.index}`} className="font-bold text-slate-900">
          {boldText}
        </strong>
      );
      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < contentToParse.length) {
      parts.push(contentToParse.substring(lastIndex));
    }

    if (isBullet) {
      return (
        <div key={lineIndex} className="flex items-start space-x-2 my-1">
          <span className="text-xs shrink-0 select-none mt-0.5">{bulletPrefix}</span>
          <div className="flex-1 leading-relaxed">{parts}</div>
        </div>
      );
    }

    return (
      <p key={lineIndex} className="leading-relaxed my-0.5">
        {parts}
      </p>
    );
  });
}

export default function AIMessage({ message, onViewItineraryOnPage }) {
  const isAI = message.sender === 'ai' || message.sender === 'bot';
  const isItineraryRelated = isAI && (
    message.text?.toLowerCase().includes('day 1') ||
    message.text?.toLowerCase().includes('itinerary') ||
    message.text?.toLowerCase().includes('plan') ||
    message.text?.toLowerCase().includes('recommend spending')
  );

  return (
    <div className={`flex items-start space-x-2.5 ${isAI ? 'justify-start' : 'justify-end'} animate-fade-in`}>
      {isAI && (
        <AILogo size="sm" className="mt-0.5" />
      )}

      <div
        className={`max-w-[88%] p-3.5 sm:p-4 rounded-2xl text-xs leading-relaxed ${
          isAI
            ? 'bg-white text-slate-800 border border-slate-200/90 rounded-tl-none font-sans shadow-sm font-normal'
            : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-tr-none shadow-md shadow-blue-500/20'
        }`}
      >
        {isAI ? (
          <div className="space-y-1">{renderHumanReadableContent(message.text)}</div>
        ) : (
          <div className="whitespace-pre-wrap">{message.text}</div>
        )}

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

        <span className={`block text-[9px] mt-2 text-right ${isAI ? 'text-slate-400' : 'text-white/75'}`}>
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
