import React from 'react';
import { motion } from 'framer-motion';
import AILogo from './AILogo';

export default function AIFloatingTrigger({ onClick }) {
  return (
    <motion.button
      whileHover={{ scale: 1.12, y: -4 }}
      whileTap={{ scale: 0.92 }}
      onClick={onClick}
      className="no-print hidden lg:flex fixed bottom-7 right-7 z-40 p-2.5 rounded-2xl bg-[#0F172A]/90 hover:bg-[#0F172A] shadow-2xl shadow-blue-500/30 border border-slate-700/80 hover:border-blue-500/60 backdrop-blur-xl transition-all cursor-pointer group select-none items-center justify-center"
      aria-label="Open AI Assistant"
      title="Ask Voyager AI"
    >
      {/* Only HD AI Logo */}
      <AILogo size="lg" />
    </motion.button>
  );
}
