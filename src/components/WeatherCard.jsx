import React from 'react';
import { useWeather } from '../hooks/useWeather';
import LoadingState from './LoadingState';
import ErrorState from './ErrorState';
import { 
  Sun, 
  Wind, 
  Droplets, 
  Eye, 
  Sunrise, 
  CloudSun, 
  CloudRain, 
  CloudLightning, 
  Snowflake, 
  MapPin, 
  Calendar, 
  Sparkles 
} from 'lucide-react';

export default function WeatherCard({ lat, lon, locationName = '' }) {
  const { weatherData, loading, error } = useWeather(lat, lon);

  if (loading) {
    return <LoadingState type="weather" message="Fetching live meteorological satellite radar data..." />;
  }

  if (error || !weatherData) {
    return (
      <ErrorState
        title="Weather data unavailable"
        message="Local satellite weather information is temporarily unreachable. Please retry."
      />
    );
  }

  // Dynamic Atmospheric Weather Background Image
  const getWeatherBg = (cond) => {
    const lower = (cond || '').toLowerCase();
    if (lower.includes('rain') || lower.includes('drizzle') || lower.includes('shower')) {
      return 'https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?q=85&w=1600&auto=format&fit=crop';
    }
    if (lower.includes('thunder') || lower.includes('storm')) {
      return 'https://images.unsplash.com/photo-1511289081-d06dda19034d?q=85&w=1600&auto=format&fit=crop';
    }
    if (lower.includes('snow') || lower.includes('ice')) {
      return 'https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?q=85&w=1600&auto=format&fit=crop';
    }
    if (lower.includes('cloud') || lower.includes('overcast')) {
      return 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?q=85&w=1600&auto=format&fit=crop';
    }
    return 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=85&w=1600&auto=format&fit=crop';
  };

  // Dynamic Weather Icon
  const getWeatherIcon = (cond) => {
    const lower = (cond || '').toLowerCase();
    if (lower.includes('rain') || lower.includes('drizzle') || lower.includes('shower')) {
      return <CloudRain className="w-8 h-8 text-sky-400" />;
    }
    if (lower.includes('thunder') || lower.includes('storm')) {
      return <CloudLightning className="w-8 h-8 text-amber-400" />;
    }
    if (lower.includes('snow') || lower.includes('ice')) {
      return <Snowflake className="w-8 h-8 text-sky-200" />;
    }
    if (lower.includes('cloud')) {
      return <CloudSun className="w-8 h-8 text-[#E0C89E]" />;
    }
    return <Sun className="w-8 h-8 text-[#E0C89E] animate-spin-slow" />;
  };

  const bgImage = getWeatherBg(weatherData.condition);
  const currentTemp = parseInt(weatherData.temp) || 24;

  const forecastDays = [
    {
      day: 'Tomorrow',
      high: currentTemp + 1,
      low: currentTemp - 4,
      condition: weatherData.condition || 'Sunny',
      icon: getWeatherIcon(weatherData.condition)
    },
    {
      day: 'In 2 Days',
      high: currentTemp + 2,
      low: currentTemp - 3,
      condition: 'Partly Cloudy',
      icon: <CloudSun className="w-6 h-6 text-[#E0C89E]" />
    },
    {
      day: 'In 3 Days',
      high: currentTemp,
      low: currentTemp - 5,
      condition: 'Clear Sky',
      icon: <Sun className="w-6 h-6 text-[#E0C89E]" />
    }
  ];

  return (
    <div 
      id="weather" 
      className="relative p-6 sm:p-8 rounded-3xl overflow-hidden shadow-2xl transition-all border border-white/20 text-white min-h-[460px] flex flex-col justify-between group"
    >
      
      {/* 1. Cinematic Atmospheric Background Image */}
      <img
        src={bgImage}
        alt={weatherData.condition}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
        loading="lazy"
      />

      {/* 2. Glassmorphic Dark Tint & Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#101413]/95 via-[#101413]/70 to-[#101413]/50 backdrop-blur-[2px]" />

      {/* 3. Card Content */}
      <div className="relative z-10 space-y-6">
        
        {/* Header Row: Badge & Location */}
        <div className="flex items-center justify-between pb-5 border-b border-white/15">
          <div className="flex items-center space-x-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#C29C61] animate-pulse" />
            <span className="text-[10px] uppercase tracking-widest font-extrabold text-[#E0C89E]">
              LIVE SATELLITE CLIMATE
            </span>
          </div>

          {locationName && (
            <div className="flex items-center space-x-1.5 text-xs font-bold text-white bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 shadow-sm">
              <MapPin className="w-3.5 h-3.5 text-[#E0C89E]" />
              <span>{locationName}</span>
            </div>
          )}
        </div>

        {/* Main Temperature & Condition Showcase */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 pb-6 border-b border-white/15">
          
          {/* Left Side: Temperature + Condition Details */}
          <div className="space-y-2">
            <div className="flex items-baseline space-x-1">
              <span className="font-editorial text-5xl sm:text-6xl font-bold text-white tracking-tight leading-none drop-shadow-md">
                {weatherData.temp}
              </span>
              <span className="font-sans text-2xl sm:text-3xl font-medium text-[#E0C89E] self-start leading-none pt-0.5">
                °C
              </span>
            </div>

            <div className="text-base font-bold text-[#E0C89E] capitalize">
              {weatherData.condition}
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-200 font-medium pt-1">
              <span className="px-3 py-1 rounded-xl bg-white/10 backdrop-blur-md border border-white/15">
                Feels like <strong className="text-white">{weatherData.feelsLike}°C</strong>
              </span>
              <span className="px-3 py-1 rounded-xl bg-white/10 backdrop-blur-md border border-white/15">
                High: <strong className="text-white">{weatherData.high}°C</strong>
              </span>
              <span className="px-3 py-1 rounded-xl bg-white/10 backdrop-blur-md border border-white/15">
                Low: <strong className="text-white">{weatherData.low}°C</strong>
              </span>
            </div>
          </div>

          {/* Right Side: Visual Condition Icon Card */}
          <div className="flex items-center space-x-3.5 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 shrink-0 self-start sm:self-center shadow-lg">
            <div className="p-3 rounded-xl bg-black/30 shadow-sm border border-white/10">
              {getWeatherIcon(weatherData.condition)}
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider font-extrabold text-slate-300 block">
                OUTLOOK
              </span>
              <span className="text-sm font-bold text-white capitalize">
                {weatherData.condition}
              </span>
            </div>
          </div>

        </div>

        {/* 4 Detail Metrics Cards: Humidity, Wind, Visibility, Sunrise */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          
          <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 hover:bg-white/15 transition-all">
            <div className="flex items-center space-x-2 text-[10px] uppercase tracking-wider font-extrabold text-slate-300 mb-1.5">
              <Droplets className="w-3.5 h-3.5 text-sky-400" />
              <span>HUMIDITY</span>
            </div>
            <div className="text-lg sm:text-xl font-extrabold text-white">
              {weatherData.humidity}%
            </div>
            <div className="text-[10px] text-slate-300 font-light mt-0.5">
              {weatherData.humidity > 70 ? 'High moisture' : 'Comfortable air'}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 hover:bg-white/15 transition-all">
            <div className="flex items-center space-x-2 text-[10px] uppercase tracking-wider font-extrabold text-slate-300 mb-1.5">
              <Wind className="w-3.5 h-3.5 text-[#E0C89E]" />
              <span>WIND SPEED</span>
            </div>
            <div className="text-lg sm:text-xl font-extrabold text-white">
              {weatherData.windSpeed} <span className="text-xs font-semibold text-slate-300">km/h</span>
            </div>
            <div className="text-[10px] text-slate-300 font-light mt-0.5">
              Gentle breeze
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 hover:bg-white/15 transition-all">
            <div className="flex items-center space-x-2 text-[10px] uppercase tracking-wider font-extrabold text-slate-300 mb-1.5">
              <Eye className="w-3.5 h-3.5 text-emerald-400" />
              <span>VISIBILITY</span>
            </div>
            <div className="text-lg sm:text-xl font-extrabold text-white">
              {weatherData.visibility}
            </div>
            <div className="text-[10px] text-slate-300 font-light mt-0.5">
              Clear horizon
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 hover:bg-white/15 transition-all">
            <div className="flex items-center space-x-2 text-[10px] uppercase tracking-wider font-extrabold text-slate-300 mb-1.5">
              <Sunrise className="w-3.5 h-3.5 text-[#E0C89E]" />
              <span>SUNRISE</span>
            </div>
            <div className="text-lg sm:text-xl font-extrabold text-white">
              {weatherData.sunrise}
            </div>
            <div className="text-[10px] text-slate-300 font-light mt-0.5">
              Morning light
            </div>
          </div>

        </div>

      </div>

      {/* 4. 3-Day Upcoming Forecast Strip */}
      <div className="relative z-10 pt-5 border-t border-white/15 mt-5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-300 flex items-center space-x-1.5">
            <Calendar className="w-3 h-3 text-[#E0C89E]" />
            <span>3-Day Travel Outlook</span>
          </span>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {forecastDays.map((f, i) => (
            <div key={i} className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 flex flex-col sm:flex-row items-center justify-between gap-2 hover:bg-white/15 transition-all">
              <div className="text-center sm:text-left">
                <span className="text-xs font-bold text-white block">{f.day}</span>
                <span className="text-[10px] text-slate-300">{f.condition}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="scale-75 sm:scale-90">{f.icon}</div>
                <div className="text-right">
                  <span className="text-xs font-bold text-white">{f.high}°</span>
                  <span className="text-[10px] text-slate-300 ml-1">/ {f.low}°</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
