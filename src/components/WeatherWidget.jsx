import React from 'react';
import { X, Sun, CloudRain, Wind, Droplets, Compass, Thermometer, Calendar } from 'lucide-react';

export default function WeatherWidget({ isOpen, onClose, weatherData, locationName }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md transition-opacity">
      <div className="relative w-full max-w-lg glass-panel p-6 rounded-3xl shadow-2xl border border-slate-700/60 overflow-hidden">
        
        {/* Decorative Background Blur Circle */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-teal-500/20 rounded-full blur-3xl pointer-events-none" />
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-teal-400">Live Weather Insight</span>
            <h3 className="text-2xl font-bold text-white flex items-center space-x-2">
              <Compass className="w-5 h-5 text-teal-400" />
              <span>{locationName || 'Current Location'}</span>
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full glass-card hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Temperature Display */}
        {weatherData ? (
          <div>
            <div className="flex items-center justify-between bg-gradient-to-r from-teal-950/40 to-slate-900/60 p-6 rounded-2xl border border-teal-500/20 mb-6">
              <div>
                <div className="text-5xl font-extrabold text-white tracking-tight">
                  {weatherData.temp}°C
                </div>
                <div className="text-sm font-medium text-teal-300 mt-1 capitalize">
                  {weatherData.condition}
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  Feels like {weatherData.feelsLike}°C • H: {weatherData.high}° L: {weatherData.low}°
                </div>
              </div>

              <div className="w-16 h-16 rounded-2xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-300 shadow-inner">
                <Sun className="w-10 h-10 text-amber-400 animate-spin-slow" />
              </div>
            </div>

            {/* Weather Metrics Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="glass-card p-4 rounded-2xl flex items-center space-x-3">
                <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400">
                  <Droplets className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-slate-400 block">Humidity</span>
                  <span className="text-base font-bold text-white">{weatherData.humidity}%</span>
                </div>
              </div>

              <div className="glass-card p-4 rounded-2xl flex items-center space-x-3">
                <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400">
                  <Wind className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-slate-400 block">Wind Speed</span>
                  <span className="text-base font-bold text-white">{weatherData.windSpeed} km/h</span>
                </div>
              </div>
            </div>

            {/* 5-Day Forecast Stream */}
            {weatherData.dailyForecast && weatherData.dailyForecast.length > 0 && (
              <div>
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 flex items-center space-x-1.5">
                  <Calendar className="w-4 h-4 text-teal-400" />
                  <span>5-Day Outlook</span>
                </h4>
                <div className="grid grid-cols-5 gap-2">
                  {weatherData.dailyForecast.map((day, idx) => (
                    <div key={idx} className="glass-card p-3 rounded-xl text-center flex flex-col items-center">
                      <span className="text-xs font-medium text-slate-300 mb-1">{day.date}</span>
                      <Sun className="w-5 h-5 text-amber-400 my-1" />
                      <span className="text-xs font-bold text-white">{day.maxTemp}°</span>
                      <span className="text-[10px] text-slate-400">{day.minTemp}°</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Source Footer */}
            <div className="mt-6 text-center border-t border-slate-800/80 pt-3">
              <span className="text-[11px] text-slate-400">
                Data provided by <strong className="text-teal-400">{weatherData.source || 'Open-Meteo API'}</strong>
              </span>
            </div>

          </div>
        ) : (
          <div className="py-12 text-center text-slate-400">
            Fetching real-time weather information...
          </div>
        )}

      </div>
    </div>
  );
}
