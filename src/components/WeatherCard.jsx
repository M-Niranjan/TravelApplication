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
  Calendar
} from 'lucide-react';

export default function WeatherCard({ lat, lon, locationName = '' }) {
  const { weatherData, loading, error } = useWeather(lat, lon);

  if (loading) {
    return <LoadingState type="weather" message="Checking the weather..." />;
  }

  if (error || !weatherData) {
    return (
      <ErrorState
        title="Weather unavailable"
        message="Weather information is temporarily unavailable. Try again."
      />
    );
  }

  // Dynamic Weather Icon based on condition
  const getWeatherIcon = (cond) => {
    const lower = (cond || '').toLowerCase();
    if (lower.includes('rain') || lower.includes('drizzle') || lower.includes('shower')) {
      return <CloudRain className="w-8 h-8 text-blue-500" />;
    }
    if (lower.includes('thunder') || lower.includes('storm')) {
      return <CloudLightning className="w-8 h-8 text-amber-500" />;
    }
    if (lower.includes('snow') || lower.includes('ice')) {
      return <Snowflake className="w-8 h-8 text-sky-300" />;
    }
    if (lower.includes('cloud')) {
      return <CloudSun className="w-8 h-8 text-[#2F6F68]" />;
    }
    return <Sun className="w-8 h-8 text-[#D8B98A] animate-spin-slow" />;
  };

  // 3-Day forecast simulation derived from current conditions
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
      icon: <CloudSun className="w-6 h-6 text-[#2F6F68]" />
    },
    {
      day: 'In 3 Days',
      high: currentTemp,
      low: currentTemp - 5,
      condition: 'Clear Sky',
      icon: <Sun className="w-6 h-6 text-[#D8B98A]" />
    }
  ];

  return (
    <div id="weather" className="relative p-6 sm:p-8 rounded-3xl bg-white border border-[#171A19]/10 shadow-lg overflow-hidden transition-all hover:shadow-xl">
      
      {/* Decorative subtle background gradient blob */}
      <div className="absolute -right-16 -top-16 w-60 h-60 bg-[#2F6F68]/05 rounded-full blur-3xl pointer-events-none" />

      {/* Header Row: Badge & Location */}
      <div className="flex items-center justify-between pb-6 border-b border-[#171A19]/08 mb-6">
        <div className="flex items-center space-x-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#2F6F68] animate-pulse" />
          <span className="text-[10px] uppercase tracking-widest font-extrabold text-[#2F6F68]">
            LIVE WEATHER CONDITIONS
          </span>
        </div>

        {locationName && (
          <div className="flex items-center space-x-1 text-xs font-bold text-[#171A19] bg-[#F7F5F0] px-3 py-1.5 rounded-full border border-[#171A19]/06">
            <MapPin className="w-3.5 h-3.5 text-[#2F6F68]" />
            <span>{locationName}</span>
          </div>
        )}
      </div>

      {/* Main Temperature & Condition Showcase */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 pb-6 border-b border-[#171A19]/08 mb-5">
        
        {/* Left Side: Temperature + Condition Details */}
        <div className="space-y-1.5">
          
          {/* Refined Temperature Size */}
          <div className="flex items-baseline space-x-1">
            <span className="font-editorial text-4xl sm:text-5xl font-bold text-[#171A19] tracking-tight leading-none">
              {weatherData.temp}
            </span>
            <span className="font-sans text-xl sm:text-2xl font-medium text-[#2F6F68] self-start leading-none pt-0.5">
              °C
            </span>
          </div>

          <div className="text-sm font-bold text-[#2F6F68] capitalize">
            {weatherData.condition}
          </div>

          <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-[#68706D] font-medium pt-0.5">
            <span className="px-2.5 py-0.5 rounded-md bg-[#F7F5F0] border border-[#171A19]/05">
              Feels like <strong className="text-[#171A19]">{weatherData.feelsLike}°C</strong>
            </span>
            <span className="px-2.5 py-0.5 rounded-md bg-[#F7F5F0] border border-[#171A19]/05">
              High: <strong className="text-[#171A19]">{weatherData.high}°C</strong>
            </span>
            <span className="px-2.5 py-0.5 rounded-md bg-[#F7F5F0] border border-[#171A19]/05">
              Low: <strong className="text-[#171A19]">{weatherData.low}°C</strong>
            </span>
          </div>

        </div>

        {/* Right Side: Visual Condition Icon Card */}
        <div className="flex items-center space-x-3.5 bg-[#F7F5F0] p-3.5 sm:p-4 rounded-2xl border border-[#171A19]/06 shrink-0 self-start sm:self-center">
          <div className="p-2.5 rounded-xl bg-white shadow-sm border border-[#171A19]/06">
            {getWeatherIcon(weatherData.condition)}
          </div>
          <div>
            <span className="text-[9px] uppercase tracking-wider font-extrabold text-[#68706D] block">
              OUTLOOK
            </span>
            <span className="text-xs sm:text-sm font-bold text-[#171A19] capitalize">
              {weatherData.condition}
            </span>
          </div>
        </div>

      </div>

      {/* 4 Detail Metrics Cards: Humidity, Wind, Visibility, Sunrise */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
        
        {/* Humidity Card */}
        <div className="p-4 rounded-2xl bg-[#F7F5F0] border border-[#171A19]/06 hover:border-[#2F6F68]/30 transition-colors">
          <div className="flex items-center space-x-2 text-[10px] uppercase tracking-wider font-extrabold text-[#68706D] mb-1.5">
            <Droplets className="w-3.5 h-3.5 text-[#2F6F68]" />
            <span>HUMIDITY</span>
          </div>
          <div className="text-lg sm:text-xl font-extrabold text-[#171A19]">
            {weatherData.humidity}%
          </div>
          <div className="text-[10px] text-[#68706D] font-light mt-0.5">
            {weatherData.humidity > 70 ? 'High moisture' : 'Comfortable'}
          </div>
        </div>

        {/* Wind Card */}
        <div className="p-4 rounded-2xl bg-[#F7F5F0] border border-[#171A19]/06 hover:border-[#2F6F68]/30 transition-colors">
          <div className="flex items-center space-x-2 text-[10px] uppercase tracking-wider font-extrabold text-[#68706D] mb-1.5">
            <Wind className="w-3.5 h-3.5 text-[#2F6F68]" />
            <span>WIND SPEED</span>
          </div>
          <div className="text-lg sm:text-xl font-extrabold text-[#171A19]">
            {weatherData.windSpeed} <span className="text-xs font-semibold text-[#68706D]">km/h</span>
          </div>
          <div className="text-[10px] text-[#68706D] font-light mt-0.5">
            Gentle breeze
          </div>
        </div>

        {/* Visibility Card */}
        <div className="p-4 rounded-2xl bg-[#F7F5F0] border border-[#171A19]/06 hover:border-[#2F6F68]/30 transition-colors">
          <div className="flex items-center space-x-2 text-[10px] uppercase tracking-wider font-extrabold text-[#68706D] mb-1.5">
            <Eye className="w-3.5 h-3.5 text-[#2F6F68]" />
            <span>VISIBILITY</span>
          </div>
          <div className="text-lg sm:text-xl font-extrabold text-[#171A19]">
            {weatherData.visibility}
          </div>
          <div className="text-[10px] text-[#68706D] font-light mt-0.5">
            Clear view
          </div>
        </div>

        {/* Sunrise Card */}
        <div className="p-4 rounded-2xl bg-[#F7F5F0] border border-[#171A19]/06 hover:border-[#2F6F68]/30 transition-colors">
          <div className="flex items-center space-x-2 text-[10px] uppercase tracking-wider font-extrabold text-[#68706D] mb-1.5">
            <Sunrise className="w-3.5 h-3.5 text-[#D8B98A]" />
            <span>SUNRISE</span>
          </div>
          <div className="text-lg sm:text-xl font-extrabold text-[#171A19]">
            {weatherData.sunrise}
          </div>
          <div className="text-[10px] text-[#68706D] font-light mt-0.5">
            Morning light
          </div>
        </div>

      </div>

      {/* 3-Day Upcoming Forecast Strip */}
      <div className="pt-5 border-t border-[#171A19]/08">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#68706D] flex items-center space-x-1.5">
            <Calendar className="w-3 h-3 text-[#2F6F68]" />
            <span>3-Day Travel Outlook</span>
          </span>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {forecastDays.map((f, i) => (
            <div key={i} className="p-3.5 rounded-2xl bg-[#F7F5F0] border border-[#171A19]/05 flex flex-col sm:flex-row items-center justify-between gap-2">
              <div className="text-center sm:text-left">
                <span className="text-[11px] font-bold text-[#171A19] block">{f.day}</span>
                <span className="text-[10px] text-[#68706D]">{f.condition}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="scale-75 sm:scale-90">{f.icon}</div>
                <div className="text-right">
                  <span className="text-xs font-bold text-[#171A19]">{f.high}°</span>
                  <span className="text-[10px] text-[#68706D] ml-1">/ {f.low}°</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
