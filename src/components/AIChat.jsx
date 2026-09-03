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
  RefreshCw,
  Compass
} from 'lucide-react';
import AIMessage from './AIMessage';
import { useGemini } from '../hooks/useGemini';
import { DESTINATIONS } from '../data/destinations';

export default function AIChat({ isOpen, onClose, destination = null }) {
  const activeDestination = destination || DESTINATIONS[0];
  const { messages, loading, error, sendMessage, clearMessages } = useGemini();
  const [input, setInput] = useState('');
  const chatEndRef = useRef(null);
  const inputRef = useRef(null);

  // Dynamic suggested prompts
  const suggestedPrompts = useMemo(() => {
    const destName = activeDestination.name;
    if (destName) {
      return [
        `How many days in ${destName}?`,
        `Must-see places in ${destName}`,
        `Best time to visit?`,
        `What food to try in ${destName}?`,
        `Is ${destName} family-friendly?`,
        `Packing essentials for ${destName}`
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
  }, [activeDestination]);

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
    sendMessage(userQuery.trim(), activeDestination);
    setInput('');
  };

  const handleRetryLast = () => {
    const lastUserMsg = [...messages].reverse().find((m) => m.sender === 'user');
    if (lastUserMsg) {
      sendMessage(lastUserMsg.text, activeDestination);
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
      className="fixed inset-0 sm:inset-auto sm:bottom-6 sm:right-6 z-50 w-full sm:max-w-md h-full sm:h-[580px] bg-white rounded-none sm:rounded-3xl shadow-2xl border-none sm:border border-[#101413]/10 overflow-hidden flex flex-col"
    >
      
      {/* Header */}
      <div className="bg-[#101413] text-white px-5 py-4 flex items-center justify-between shrink-0 shadow-md">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#1B4944] flex items-center justify-center text-[#E0C89E] shadow-sm">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <h3 className="font-editorial text-base font-bold tracking-wide">Aetheria AI</h3>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#1B4944] text-[#E0C89E] font-bold">
                PRO
              </span>
            </div>
            <p className="text-[10px] text-slate-300 font-light flex items-center space-x-1">
              <MapPin className="w-3 h-3 text-[#E0C89E]" />
              <span>{activeDestination.name}, {activeDestination.country}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-1">
          {messages.length > 0 && (
            <button
              onClick={clearMessages}
              className="p-2 rounded-full hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
              title="Reset Conversation"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
            aria-label="Close chat"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#F9F8F5]">
        
        {/* Welcome Banner */}
        {messages.length === 0 && (
          <div className="p-5 rounded-2xl bg-white border border-[#101413]/06 shadow-sm space-y-3">
            <div className="flex items-center space-x-2 text-[#1B4944] font-bold text-xs">
              <Bot className="w-4 h-4" />
              <span>Your Luxury Travel Concierge</span>
            </div>
            <p className="text-xs text-[#586260] leading-relaxed font-light">
              Ask me anything about <strong>{activeDestination.name}</strong>, iconic sights, hidden spots, dining secrets, or custom trip timelines.
            </p>

            <div className="pt-2">
              <span className="text-[10px] uppercase font-bold text-[#8A9592] block mb-2">
                Popular Inquiries
              </span>
              <div className="flex flex-wrap gap-1.5">
                {suggestedPrompts.slice(0, 4).map((prompt, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(prompt)}
                    className="text-left text-[11px] px-3 py-1.5 rounded-full bg-[#F9F8F5] hover:bg-[#1B4944] hover:text-white text-[#101413] border border-[#101413]/08 transition-all"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Message Thread */}
        {messages.map((msg, index) => (
          <AIMessage key={index} message={msg} />
        ))}

        {/* Loading Indicator */}
        {loading && (
          <div className="flex items-start space-x-2">
            <div className="w-7 h-7 rounded-full bg-[#1B4944] text-[#E0C89E] flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4" />
            </div>
            <div className="p-3.5 rounded-2xl bg-white border border-[#101413]/08 shadow-sm flex items-center space-x-2">
              <Loader2 className="w-4 h-4 text-[#1B4944] animate-spin" />
              <span className="text-xs text-[#586260] font-medium">Aetheria AI is thinking...</span>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 text-xs flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{error}</span>
            </div>
            <button
              onClick={handleRetryLast}
              className="px-2.5 py-1 rounded-full bg-rose-600 text-white font-bold text-[10px] hover:bg-rose-700 transition-colors"
            >
              Retry
            </button>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Suggested Chips Carousel */}
      {messages.length > 0 && (
        <div className="px-4 py-2 bg-white border-t border-[#101413]/06 overflow-x-auto no-scrollbar flex space-x-1.5 shrink-0">
          {suggestedPrompts.slice(0, 4).map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleSend(prompt)}
              className="whitespace-nowrap text-[11px] px-3 py-1 rounded-full bg-[#F9F8F5] hover:bg-[#1B4944] hover:text-white text-[#586260] border border-[#101413]/08 transition-all"
            >
              {prompt}
            </button>
          ))}
        </div>
      )}

      {/* Input Row */}
      <div className="p-3 bg-white border-t border-[#101413]/08 shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center space-x-2"
        >
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Ask anything about ${activeDestination.name}...`}
            className="flex-1 bg-[#F9F8F5] border border-[#101413]/10 rounded-full px-4 py-2.5 text-xs font-medium text-[#101413] focus:outline-none focus:border-[#1B4944]"
          />

          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="w-10 h-10 rounded-full bg-[#1B4944] hover:bg-[#24655D] text-white flex items-center justify-center shadow-sm disabled:opacity-40 transition-transform active:scale-95 shrink-0"
            aria-label="Send message"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

    </motion.div>
  );
}
