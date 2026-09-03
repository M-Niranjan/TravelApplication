import React from 'react';
import { Compass, ArrowUp } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#101413] text-white border-t border-white/10 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Column */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#2F6F68] text-white flex items-center justify-center">
                <Compass className="w-4 h-4" />
              </div>
              <span className="font-editorial text-2xl font-bold tracking-tight text-white">
                Aetheria
              </span>
            </div>
            <p className="text-xs text-slate-400 font-light max-w-sm leading-relaxed">
              Explore the world. Plan unforgettable journeys with cinematic imagery and Gemini AI guidance.
            </p>
          </div>

          {/* Quick Navigation Links */}
          <div className="space-y-2">
            <h5 className="text-xs font-bold uppercase tracking-wider text-[#D8B98A]">Navigation</h5>
            <ul className="space-y-2 text-xs text-slate-300">
              <li><Link to="/destinations" className="hover:text-white transition-colors">Destinations</Link></li>
              <li><a href="#weather" className="hover:text-white transition-colors">Weather</a></li>
              <li><a href="#itinerary-builder" className="hover:text-white transition-colors">AI Planner</a></li>
            </ul>
          </div>

          {/* Back to Top */}
          <div className="flex flex-col items-start md:items-end justify-between">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors flex items-center space-x-2 text-xs font-semibold"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-4 h-4 text-[#D8B98A]" />
            </button>
          </div>

        </div>

        {/* Copyright */}
        <div className="pt-8 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 font-light">
          <p>© 2026 Travel • Built with React, Tailwind CSS, & Google Gemini AI</p>
          <p className="mt-2 sm:mt-0 text-[11px] text-slate-400">Front-End Developer Assignment Submission</p>
        </div>

      </div>
    </footer>
  );
}
