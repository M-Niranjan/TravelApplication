import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, Bot, User, X, RefreshCw, Compass } from 'lucide-react';
import { DESTINATIONS } from '../data/destinations';
import { askGeminiAssistant } from '../services/geminiService';

export default function AIChatbot({ isOpen, onClose, initialDestination = null, apiKey = '' }) {
  const [selectedDestination, setSelectedDestination] = useState(initialDestination || DESTINATIONS[0]);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: `Hello! I'm **Aetheria AI**, your personal travel advisor. Ask me anything about **${initialDestination ? initialDestination.name : 'any destination'}**—such as how long to stay, top attractions, best seasonal months, or budget advice!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    if (initialDestination) {
      setSelectedDestination(initialDestination);
    }
  }, [initialDestination]);

  const handleSend = async (userPrompt = input) => {
    const textToSend = userPrompt.trim();
    if (!textToSend || isLoading) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const responseText = await askGeminiAssistant({
        prompt: textToSend,
        destinationContext: selectedDestination,
        apiKey
      });

      const botMsg = {
        id: Date.now() + 1,
        sender: 'bot',
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      console.error('Chatbot error:', error);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'bot',
          text: 'I encountered a brief connection error. Please try asking again!',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const starterPrompts = [
    `How many days should I spend in ${selectedDestination?.name || 'Kyoto'}?`,
    `What are the top must-see places in ${selectedDestination?.name || 'Kyoto'}?`,
    `When is the absolute best month to visit ${selectedDestination?.name || 'Kyoto'}?`,
    `What are local currency and tipping customs in ${selectedDestination?.country || 'Japan'}?`
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 w-full max-w-md glass-panel rounded-3xl shadow-2xl border border-slate-700/80 overflow-hidden flex flex-col h-[580px] transition-all">
      
      {/* Chat Header */}
      <div className="bg-slate-900/90 p-4 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-teal-500 to-cyan-400 flex items-center justify-center text-slate-950 font-bold shadow-md shadow-teal-500/20">
            <Sparkles className="w-5 h-5 text-slate-950" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white flex items-center space-x-1.5">
              <span>Aetheria AI Companion</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </h4>
            <select
              value={selectedDestination?.id}
              onChange={(e) => {
                const found = DESTINATIONS.find(d => d.id === e.target.value);
                setSelectedDestination(found);
              }}
              className="bg-transparent text-[11px] text-teal-300 focus:outline-none border-none cursor-pointer"
            >
              {DESTINATIONS.map(d => (
                <option key={d.id} value={d.id} className="bg-slate-900 text-white">
                  Focus: {d.name}, {d.country}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-2 rounded-full glass-card hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Messages Stream */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 custom-scrollbar bg-slate-950/40">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start space-x-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.sender === 'bot' && (
              <div className="w-7 h-7 rounded-lg bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-teal-300 shrink-0 mt-1">
                <Bot className="w-4 h-4" />
              </div>
            )}

            <div
              className={`max-w-[80%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-950 font-medium rounded-tr-none'
                  : 'glass-card text-slate-200 border border-slate-700/60 rounded-tl-none'
              }`}
            >
              <div className="whitespace-pre-wrap">{msg.text}</div>
              <span className={`block text-[9px] mt-1 text-right ${msg.sender === 'user' ? 'text-slate-900/70' : 'text-slate-500'}`}>
                {msg.timestamp}
              </span>
            </div>

            {msg.sender === 'user' && (
              <div className="w-7 h-7 rounded-lg bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-300 shrink-0 mt-1">
                <User className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center space-x-2 text-xs text-teal-400 glass-card p-3 rounded-2xl w-fit">
            <Sparkles className="w-4 h-4 animate-spin" />
            <span>Consulting Gemini AI travel models...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Starter Prompts Chips */}
      <div className="px-4 py-2 bg-slate-900/60 border-t border-slate-800/80 flex items-center space-x-1 overflow-x-auto no-scrollbar">
        {starterPrompts.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(prompt)}
            className="px-3 py-1 rounded-full text-[10px] whitespace-nowrap glass-card hover:bg-teal-500/20 text-slate-300 hover:text-teal-200 border border-slate-700/40 transition-colors"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Chat Input Bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="p-3 bg-slate-900 border-t border-slate-800 flex items-center space-x-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Ask about ${selectedDestination?.name || 'travel'}...`}
          className="flex-1 bg-slate-950 border border-slate-700 rounded-full px-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
        />
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="p-2.5 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-950 font-bold hover:scale-105 disabled:opacity-50 transition-all"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

    </div>
  );
}
