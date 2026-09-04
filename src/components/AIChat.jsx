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
import AILogo from './AILogo';
import { useGemini } from '../hooks/useGemini';
import { DESTINATIONS } from '../data/destinations';

export default function AIChat({ isOpen, onClose, destination = null }) {
  const [selectedDestination, setSelectedDestination] = useState(destination || DESTINATIONS[0]);
  const activeDestination = selectedDestination;
  const { messages, loading, error, sendMessage, clearMessages } = useGemini();
  const [input, setInput] = useState('');
  const chatEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (destination) setSelectedDestination(destination);
  }, [destination]);

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

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading, error]);

  if (!isOpen) return null;

  const handleSend = (userQuery = input) => {
    if (!userQuery.trim() || loading) return;
    const queryDestination = findDestinationInQuery(userQuery, activeDestination);
    setSelectedDestination(queryDestination);
    sendMessage(userQuery.trim(), queryDestination);
    setInput('');
  };

  const handleRetryLast = () => {
    const lastUserMsg = [...messages].reverse().find((m) => m.sender === 'user');
    if (lastUserMsg) {
      const queryDestination = findDestinationInQuery(lastUserMsg.text, activeDestination);
      setSelectedDestination(queryDestination);
      sendMessage(lastUserMsg.text, queryDestination);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9, y: 25 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 25 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      role="dialog"
      aria-label="Travel AI Assistant"
      className="fixed inset-0 sm:inset-auto sm:bottom-6 sm:right-6 z-50 w-full sm:max-w-md h-full sm:h-[590px] bg-white rounded-none sm:rounded-3xl shadow-2xl border-none sm:border border-slate-200 overflow-hidden flex flex-col"
    >
      
      {/* Header with Deep Sapphire & Radiant Gradient */}
      <div className="bg-[#0F172A] text-white px-5 py-4 flex items-center justify-between shrink-0 shadow-md">
        <div className="flex items-center space-x-3">
          <AILogo size="md" />
          <div>
            <div className="flex items-center space-x-1.5">
              <h3 className="font-editorial text-base font-bold tracking-wide">Voyager AI</h3>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-extrabold shadow-sm">
                PRO
              </span>
            </div>
            <p className="text-[10px] text-slate-300 font-light flex items-center space-x-1">
              <MapPin className="w-3 h-3 text-rose-400" />
              <span>{activeDestination.name}, {activeDestination.country}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-1">
          {messages.length > 0 && (
            <button
              onClick={clearMessages}
              className="p-2 rounded-full hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
              title="Reset Conversation"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
            aria-label="Close chat"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
        
        {/* Welcome Banner */}
        {messages.length === 0 && (
          <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-3">
            <div className="flex items-center space-x-2 text-blue-600 font-bold text-xs">
              <Bot className="w-4 h-4" />
              <span>Your Intelligent Travel Concierge</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed font-light">
              Ask me anything about <strong>{activeDestination.name}</strong>, iconic sights, hidden spots, dining secrets, or custom trip timelines.
            </p>

            <div className="pt-2">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-2">
                Popular Inquiries
              </span>
              <div className="flex flex-wrap gap-1.5">
                {suggestedPrompts.slice(0, 4).map((prompt, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(prompt)}
                    className="text-left text-[11px] px-3 py-1.5 rounded-full bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-700 transition-all cursor-pointer font-medium"
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
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shrink-0 shadow-sm">
              <Bot className="w-4 h-4" />
            </div>
            <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex items-center space-x-2">
              <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />
              <span className="text-xs text-slate-600 font-medium">Voyager AI is thinking...</span>
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
        <div className="px-4 py-2 bg-white border-t border-slate-100 overflow-x-auto no-scrollbar flex space-x-1.5 shrink-0">
          {suggestedPrompts.slice(0, 4).map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleSend(prompt)}
              className="whitespace-nowrap text-[11px] px-3 py-1 rounded-full bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-600 transition-all font-medium cursor-pointer"
            >
              {prompt}
            </button>
          ))}
        </div>
      )}

      {/* Input Row */}
      <div className="p-3 bg-white border-t border-slate-200 shrink-0">
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
            className="flex-1 bg-slate-100 border border-slate-200 rounded-full px-4 py-2.5 text-xs font-medium text-slate-900 focus:outline-none focus:border-blue-500"
          />

          <motion.button
            whileTap={{ scale: 0.9 }}
            type="submit"
            disabled={!input.trim() || loading}
            className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-md shadow-blue-500/25 disabled:opacity-40 transition-transform shrink-0 cursor-pointer"
            aria-label="Send message"
          >
            <Send className="w-4 h-4" />
          </motion.button>
        </form>
      </div>

    </motion.div>
  );
}

function findDestinationInQuery(query, currentDestination) {
  const normalizedQuery = query.toLowerCase();
  const mentionedDestination = DESTINATIONS.find((item) => {
    const name = item.name.toLowerCase();
    const country = item.country.toLowerCase();
    return normalizedQuery.includes(name) || normalizedQuery.includes(country);
  });

  return mentionedDestination || currentDestination;
}
