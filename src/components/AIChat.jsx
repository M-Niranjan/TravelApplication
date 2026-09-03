import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Send, 
  X, 
  RotateCcw, 
  Bot, 
  Loader2, 
  MapPin, 
  AlertCircle, 
  RefreshCw 
} from 'lucide-react';
import AIMessage from './AIMessage';
import { useGemini } from '../hooks/useGemini';

export default function AIChat({ isOpen, onClose, destination = null }) {
  const { messages, loading, error, sendMessage, clearMessages } = useGemini();
  const [input, setInput] = useState('');
  const chatEndRef = useRef(null);
  const inputRef = useRef(null);

  // Dynamic suggested prompts based on whether a destination is active
  const suggestedPrompts = useMemo(() => {
    const destName = destination ? destination.name : null;
    if (destName) {
      return [
        `How many days in ${destName}?`,
        `Must-see places in ${destName}`,
        `Best time to visit?`,
        `What food should I try in ${destName}?`,
        `Is ${destName} good for families?`,
        `What should I pack for ${destName}?`
      ];
    }
    return [
      `How many days should I travel?`,
      `Best time to visit Europe?`,
      `Top cultural destinations`,
      `What should I pack?`,
      `Family-friendly travel tips`,
      `Plan my trip with AI`
    ];
  }, [destination]);

  // Focus input on open & close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 250);
    }

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Smooth scroll to bottom on new message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading, error]);

  if (!isOpen) return null;

  const handleSend = (userQuery = input) => {
    if (!userQuery.trim() || loading) return;
    sendMessage(userQuery.trim(), destination);
    setInput('');
  };

  const handleRetryLast = () => {
    const lastUserMsg = [...messages].reverse().find((m) => m.sender === 'user');
    if (lastUserMsg) {
      sendMessage(lastUserMsg.text, destination);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 20 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      role="dialog"
      aria-label="Travel AI Assistant"
      className="fixed inset-0 sm:inset-auto sm:bottom-6 sm:right-6 z-50 w-full sm:max-w-md h-full sm:h-[580px] bg-white rounded-none sm:rounded-3xl shadow-2xl border-none sm:border border-[#171A19]/10 overflow-hidden flex flex-col"
    >
      
      {/* Header */}
      <div className="bg-[#101413] text-white px-4 sm:px-5 py-3.5 flex items-center justify-between shrink-0 shadow-md">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#2F6F68] flex items-center justify-center text-[#D8B98A] shadow-sm">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold flex items-center space-x-1.5">
              <span>✨ Travel AI Assistant</span>
            </h4>
            <p className="text-[10px] text-slate-300 flex items-center space-x-1">
              <MapPin className="w-3 h-3 text-[#D8B98A]" />
              <span>
                Exploring: <strong className="text-[#D8B98A]">{destination ? `${destination.name}, ${destination.country}` : 'Global Destinations'}</strong>
              </span>
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-1">
          {messages.length > 0 && (
            <button
              onClick={clearMessages}
              className="p-2 rounded-full hover:bg-white/10 text-slate-300 hover:text-white transition-colors min-h-[40px] min-w-[40px] flex items-center justify-center"
              title="New conversation"
              aria-label="New conversation"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-slate-300 hover:text-white transition-colors min-h-[40px] min-w-[40px] flex items-center justify-center"
            title="Close chat"
            aria-label="Close chat"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Message List Stream */}
      <div 
        className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-[#F7F5F0]/60 no-scrollbar"
        role="log"
        aria-live="polite"
      >
        {messages.length === 0 && (
          <div className="py-8 text-center text-[#68706D] text-xs font-light space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-[#2F6F68]/10 text-[#2F6F68] flex items-center justify-center mx-auto mb-3">
              <Bot className="w-6 h-6" />
            </div>
            <p className="font-bold text-sm text-[#171A19]">
              Ask me anything about {destination ? destination.name : 'your next journey'}
            </p>
            <p className="text-[11px] text-[#68706D] max-w-xs mx-auto">
              Get recommendations on how long to stay, must-see places, best seasons, local food, and packing essentials.
            </p>
          </div>
        )}

        {messages.map((msg) => (
          <AIMessage 
            key={msg.id} 
            message={msg} 
            onViewItineraryOnPage={() => {
              onClose();
              setTimeout(() => {
                const el = document.getElementById('itinerary-builder');
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }, 200);
            }}
          />
        ))}

        {/* Thinking Indicator */}
        {loading && (
          <div className="flex items-center space-x-2.5 text-xs text-[#2F6F68] bg-white px-4 py-3 rounded-2xl w-fit border border-[#171A19]/08 shadow-sm">
            <Loader2 className="w-4 h-4 animate-spin text-[#2F6F68]" />
            <span className="font-semibold">Travel AI is thinking...</span>
            <span className="flex space-x-1">
              <span className="w-1.5 h-1.5 bg-[#2F6F68] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-1.5 h-1.5 bg-[#2F6F68] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-1.5 h-1.5 bg-[#2F6F68] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </span>
          </div>
        )}

        {/* Error Notification with Try Again Button */}
        {error && !loading && (
          <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-center justify-between gap-2 shadow-sm">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>{error}</span>
            </div>
            <button
              onClick={handleRetryLast}
              className="px-3 py-1 rounded-full bg-amber-600 text-white font-bold text-[10px] hover:bg-amber-700 transition-colors shrink-0"
            >
              Try again
            </button>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Suggested Prompts Horizontally Scrollable Chips */}
      <div className="px-3 py-2 bg-white border-t border-[#171A19]/06 flex items-center space-x-1.5 overflow-x-auto no-scrollbar shrink-0">
        {suggestedPrompts.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(prompt)}
            disabled={loading}
            className="px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap bg-[#F7F5F0] hover:bg-[#2F6F68]/10 text-[#171A19] hover:text-[#2F6F68] border border-[#171A19]/08 transition-colors min-h-[36px] flex items-center disabled:opacity-50"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="p-3 bg-white border-t border-[#171A19]/08 flex items-center space-x-2 shrink-0 pb-5 sm:pb-3"
      >
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Ask about ${destination ? destination.name : 'your destination'}...`}
          aria-label={`Ask about ${destination ? destination.name : 'your destination'}`}
          className="flex-1 bg-[#F7F5F0] border border-[#171A19]/10 rounded-full px-4 py-3 text-xs sm:text-sm text-[#171A19] placeholder-[#68706D] focus:outline-none focus:border-[#2F6F68] min-h-[44px]"
        />
        <button
          type="submit"
          disabled={!input.trim() || loading}
          aria-label="Send message"
          className="p-3 rounded-full bg-[#2F6F68] text-white font-bold hover:bg-[#265953] disabled:opacity-40 transition-all shadow-sm min-h-[44px] min-w-[44px] flex items-center justify-center hover:scale-105 active:scale-95"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </motion.div>
  );
}
