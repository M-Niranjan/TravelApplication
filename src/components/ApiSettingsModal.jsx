import React, { useState } from 'react';
import { X, Key, ShieldCheck, Check, Sparkles, Sun, Image } from 'lucide-react';

export default function ApiSettingsModal({ isOpen, onClose, apiKeys, onSaveApiKeys }) {
  const [groqKey, setGroqKey] = useState(apiKeys.groqKey || '');
  const [openWeatherKey, setOpenWeatherKey] = useState(apiKeys.openWeatherKey || '');
  const [pexelsKey, setPexelsKey] = useState(apiKeys.pexelsKey || '');
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveApiKeys({
      groqKey: groqKey.trim(),
      openWeatherKey: openWeatherKey.trim(),
      pexelsKey: pexelsKey.trim()
    });
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-lg glass-panel p-6 sm:p-8 rounded-3xl shadow-2xl border border-slate-700/80">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-teal-400">
              <Key className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">API Credentials & Keys</h3>
              <p className="text-xs text-slate-400">Optional configuration for live APIs</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full glass-card hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Informational Banner */}
        <div className="p-4 rounded-2xl bg-teal-500/10 border border-teal-500/30 text-xs text-teal-200 mb-6 flex items-start space-x-3">
          <ShieldCheck className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-teal-300 font-bold block mb-1">Zero Setup Required Out-of-the-Box!</strong>
            The app uses Open-Meteo for free weather, curated HD imagery, and an intelligent offline AI fallback engine. You can enter real API keys below if desired. Keys stay strictly in local memory.
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Groq Key */}
          <div>
            <label className="text-xs font-bold text-slate-300 flex items-center space-x-1.5 mb-1.5">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>Groq API Key</span>
            </label>
            <input
              type="password"
              value={groqKey}
              onChange={(e) => setGroqKey(e.target.value)}
              placeholder="gsk_..."
              className="w-full bg-slate-900 border border-slate-700/80 rounded-2xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
            />
          </div>

          {/* OpenWeather Key */}
          <div>
            <label className="text-xs font-bold text-slate-300 flex items-center space-x-1.5 mb-1.5">
              <Sun className="w-4 h-4 text-amber-400" />
              <span>OpenWeather API Key (Optional)</span>
            </label>
            <input
              type="password"
              value={openWeatherKey}
              onChange={(e) => setOpenWeatherKey(e.target.value)}
              placeholder="e.g. 4b8d..."
              className="w-full bg-slate-900 border border-slate-700/80 rounded-2xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
            />
          </div>

          {/* Pexels Key */}
          <div>
            <label className="text-xs font-bold text-slate-300 flex items-center space-x-1.5 mb-1.5">
              <Image className="w-4 h-4 text-indigo-400" />
              <span>Pexels API Key (Optional)</span>
            </label>
            <input
              type="password"
              value={pexelsKey}
              onChange={(e) => setPexelsKey(e.target.value)}
              placeholder="e.g. 5634..."
              className="w-full bg-slate-900 border border-slate-700/80 rounded-2xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
            />
          </div>

          {/* Submit */}
          <div className="pt-4 flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-full glass-card text-xs font-bold text-slate-300 hover:text-white"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-teal-500/20 flex items-center space-x-1.5"
            >
              {savedSuccess ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Saved!</span>
                </>
              ) : (
                <span>Save API Keys</span>
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
