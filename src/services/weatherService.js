// Weather Service using Open-Meteo (No key required) + optional OpenWeather fallback

// Weather code mappings to readable descriptions & icons
const WEATHER_CODES = {
  0: { desc: 'Clear Sky', icon: 'Sun' },
  1: { desc: 'Mainly Clear', icon: 'SunDim' },
  2: { desc: 'Partly Cloudy', icon: 'CloudSun' },
  3: { desc: 'Overcast', icon: 'Cloud' },
  45: { desc: 'Foggy', icon: 'CloudFog' },
  48: { desc: 'Depositing Rime Fog', icon: 'CloudFog' },
  51: { desc: 'Light Drizzle', icon: 'CloudDrizzle' },
  53: { desc: 'Moderate Drizzle', icon: 'CloudDrizzle' },
  55: { desc: 'Dense Drizzle', icon: 'CloudDrizzle' },
  61: { desc: 'Slight Rain', icon: 'CloudRain' },
  63: { desc: 'Moderate Rain', icon: 'CloudRain' },
  65: { desc: 'Heavy Rain', icon: 'CloudRainHeavy' },
  71: { desc: 'Slight Snow', icon: 'Snowflake' },
  73: { desc: 'Moderate Snow', icon: 'Snowflake' },
  75: { desc: 'Heavy Snow', icon: 'Snowflake' },
  80: { desc: 'Rain Showers', icon: 'CloudRain' },
  95: { desc: 'Thunderstorm', icon: 'CloudLightning' },
};

/**
 * Fetch live weather for latitude and longitude
 */
export async function fetchLiveWeather(lat, lon, apiKey = '') {
  try {
    // If custom OpenWeather key is provided, attempt OpenWeather
    if (apiKey) {
      try {
        const owRes = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
        );
        if (owRes.ok) {
          const owData = await owRes.json();
          return {
            source: 'OpenWeather',
            temp: Math.round(owData.main.temp),
            feelsLike: Math.round(owData.main.feels_like),
            humidity: owData.main.humidity,
            windSpeed: Math.round(owData.wind.speed * 3.6), // convert m/s to km/h
            condition: owData.weather[0].main,
            description: owData.weather[0].description,
            iconCode: owData.weather[0].icon,
            city: owData.name,
            high: Math.round(owData.main.temp_max),
            low: Math.round(owData.main.temp_min),
          };
        }
      } catch (e) {
        console.warn('OpenWeather request failed, falling back to Open-Meteo:', e);
      }
    }

    // Default: Free Open-Meteo API
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=relative_humidity_2m,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=auto`
    );

    if (!response.ok) {
      throw new Error(`Weather service error: ${response.status}`);
    }

    const data = await response.json();
    const current = data.current_weather;
    const weatherInfo = WEATHER_CODES[current.weathercode] || { desc: 'Clear', icon: 'Sun' };

    // Get current humidity from hourly array
    const humidity = data.hourly?.relative_humidity_2m?.[0] || 55;
    const high = data.daily?.temperature_2m_max?.[0] ? Math.round(data.daily.temperature_2m_max[0]) : Math.round(current.temperature + 3);
    const low = data.daily?.temperature_2m_min?.[0] ? Math.round(data.daily.temperature_2m_min[0]) : Math.round(current.temperature - 3);

    return {
      source: 'Open-Meteo',
      temp: Math.round(current.temperature),
      feelsLike: Math.round(current.temperature - 1),
      humidity: humidity,
      windSpeed: Math.round(current.windspeed),
      condition: weatherInfo.desc,
      description: weatherInfo.desc,
      iconName: weatherInfo.icon,
      high: high,
      low: low,
      dailyForecast: data.daily?.time?.slice(0, 5).map((date, idx) => ({
        date: new Date(date).toLocaleDateString('en-US', { weekday: 'short' }),
        maxTemp: Math.round(data.daily.temperature_2m_max[idx]),
        minTemp: Math.round(data.daily.temperature_2m_min[idx]),
        code: data.daily.weathercode[idx],
        condition: WEATHER_CODES[data.daily.weathercode[idx]]?.desc || 'Clear'
      })) || []
    };
  } catch (error) {
    console.error('Failed to fetch weather data:', error);
    // Fallback static weather object so UI never crashes
    return {
      source: 'Offline Fallback',
      temp: 22,
      feelsLike: 21,
      humidity: 50,
      windSpeed: 12,
      condition: 'Sunny & Pleasant',
      description: 'Pleasant weather for traveling',
      high: 25,
      low: 18,
      dailyForecast: []
    };
  }
}
