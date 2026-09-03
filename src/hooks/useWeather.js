import { useState, useEffect } from 'react';
import { getWeather } from '../services/weather';

export function useWeather(lat, lon, apiKey = '') {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!lat || !lon) return;

    setLoading(true);
    setError(null);

    getWeather(lat, lon, apiKey)
      .then((data) => {
        setWeatherData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || 'Weather information is temporarily unavailable. Try again.');
        setLoading(false);
      });
  }, [lat, lon, apiKey]);

  return { weatherData, loading, error };
}
