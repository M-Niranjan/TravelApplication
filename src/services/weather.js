// OpenWeather API Integration with fallback to Open-Meteo

export async function getWeather(lat, lon, apiKey = '') {
  const activeKey = apiKey || import.meta.env.VITE_OPENWEATHER_API_KEY || '';

  if (activeKey) {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${activeKey}`
      );
      if (response.ok) {
        const data = await response.json();
        return {
          source: 'OpenWeather API',
          temp: Math.round(data.main.temp),
          feelsLike: Math.round(data.main.feels_like),
          condition: data.weather[0].main,
          description: data.weather[0].description,
          icon: data.weather[0].icon,
          humidity: data.main.humidity,
          windSpeed: Math.round(data.wind.speed * 3.6), // convert m/s to km/h
          visibility: data.visibility ? (data.visibility / 1000).toFixed(1) + ' km' : '10 km',
          sunrise: new Date(data.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          sunset: new Date(data.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          high: Math.round(data.main.temp_max),
          low: Math.round(data.main.temp_min),
          city: data.name
        };
      }
    } catch (e) {
      console.warn('OpenWeather fetch failed, utilizing Open-Meteo fallback:', e);
    }
  }

  // Fallback: Open-Meteo free endpoint (No key required)
  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=relative_humidity_2m,windspeed_10m,visibility&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=auto`
    );

    if (!response.ok) throw new Error(`Weather service error: ${response.status}`);

    const data = await response.json();
    const current = data.current_weather;

    return {
      source: 'Open-Meteo',
      temp: Math.round(current.temperature),
      feelsLike: Math.round(current.temperature - 1),
      condition: current.weathercode <= 3 ? 'Partly Cloudy' : current.weathercode <= 65 ? 'Rain Showers' : 'Clear Sky',
      description: 'Pleasant travel weather',
      icon: '02d',
      humidity: data.hourly?.relative_humidity_2m?.[0] || 60,
      windSpeed: Math.round(current.windspeed),
      visibility: '10 km',
      sunrise: data.daily?.sunrise?.[0] ? new Date(data.daily.sunrise[0]).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '06:00 AM',
      sunset: data.daily?.sunset?.[0] ? new Date(data.daily.sunset[0]).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '07:30 PM',
      high: data.daily?.temperature_2m_max?.[0] ? Math.round(data.daily.temperature_2m_max[0]) : Math.round(current.temperature + 3),
      low: data.daily?.temperature_2m_min?.[0] ? Math.round(data.daily.temperature_2m_min[0]) : Math.round(current.temperature - 3)
    };
  } catch (err) {
    throw new Error('Weather information is temporarily unavailable. Try again.');
  }
}
