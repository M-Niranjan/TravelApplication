import React from 'react';
import { motion } from 'framer-motion';
import AILogo from './AILogo';
import { Sparkles, MessageSquare } from 'lucide-react';

export default function AIFloatingTrigger({ onClick }) {
  return (
    <motion.button
      whileHover={{ scale: 1.05, y: -3 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="no-print hidden lg:flex fixed bottom-6 right-6 z-40 items-center space-x-3.5 pl-2 pr-4 py-2 rounded-full bg-[#0F172A]/95 hover:bg-[#0F172A] text-white shadow-2xl shadow-blue-500/20 border border-slate-700/80 hover:border-blue-500/50 backdrop-blur-xl transition-all cursor-pointer group select-none"
      aria-label="Open Voyager AI Assistant"
    >
      {/* 1. Custom HD AI Logo Badge */}
      <AILogo size="md" />

      {/* 2. Text Stack */}
      <div className="text-left flex flex-col justify-center">
        <div className="flex items-center space-x-1.5 leading-none">
          <span className="font-editorial text-xs font-bold tracking-wide text-white group-hover:text-blue-300 transition-colors">
            Voyager AI
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" title="Online" />
        </div>
        <span className="text-[10px] text-slate-400 font-light mt-0.5 tracking-tight">
          Ask Travel Concierge
        </span>
      </div>

      {/* 3. Subtle Sparkle Accent */}
      <div className="w-6 h-6 rounded-full bg-white/5 group-hover:bg-blue-600/30 flex items-center justify-center transition-colors">
        <Sparkles className="w-3.5 h-3.5 text-amber-300 group-hover:scale-110 transition-transform" />
      </div>
    </motion.button>
  );
}
