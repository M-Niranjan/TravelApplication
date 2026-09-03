import React from 'react';
import { Compass, ArrowUp, Sparkles, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#101413] text-white border-t border-white/10 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Column */}
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-2xl bg-[#1B4944] text-[#E0C89E] flex items-center justify-center shadow-md">
                <Compass className="w-5 h-5 stroke-[2.2]" />
              </div>
              <span className="font-editorial text-2xl font-bold tracking-tight text-white">
                Aetheria
              </span>
            </div>
            <p className="text-xs text-slate-400 font-light max-w-md leading-relaxed">
              High-end luxury travel platform combining cinematic destination media, live satellite weather analytics, and multi-turn itinerary planning powered by Google Gemini AI.
            </p>
          </div>

          {/* Quick Navigation Links */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-[#E0C89E]">Pages</h5>
            <ul className="space-y-2 text-xs text-slate-300 font-light">
              <li><Link to="/destinations" className="hover:text-white transition-colors">Global Destinations</Link></li>
              <li><Link to="/places" className="hover:text-white transition-colors">Tourist Landmarks</Link></li>
              <li><Link to="/itinerary" className="hover:text-white transition-colors">AI Trip Planner</Link></li>
              <li><Link to="/weather" className="hover:text-white transition-colors">Live Satellite Weather</Link></li>
              <li><Link to="/packing" className="hover:text-white transition-colors">Packing Readiness</Link></li>
            </ul>
          </div>

          {/* Back to Top */}
          <div className="flex flex-col items-start md:items-end justify-between">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all flex items-center space-x-2 text-xs font-semibold border border-white/15 min-h-[44px]"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-4 h-4 text-[#E0C89E]" />
            </button>
          </div>

        </div>

        {/* Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 font-light">
          <p>© 2026 Aetheria Travel Technologies • Built with React, Tailwind CSS, & Google Gemini AI</p>
          <p className="mt-2 sm:mt-0 text-[11px] text-slate-400">Luxury Travel Explorer Platform</p>
        </div>

      </div>
    </footer>
  );
}
