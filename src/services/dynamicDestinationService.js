// Dynamic Destination Generator for ANY location searched worldwide
import { fetchLiveWeather } from './weatherService';

const CONTINENT_MAP = {
  'japan': 'Asia', 'china': 'Asia', 'india': 'Asia', 'thailand': 'Asia', 'vietnam': 'Asia', 'indonesia': 'Asia', 'uae': 'Asia', 'united arab emirates': 'Asia', 'south korea': 'Asia', 'singapore': 'Asia', 'malaysia': 'Asia', 'nepal': 'Asia',
  'france': 'Europe', 'italy': 'Europe', 'greece': 'Europe', 'spain': 'Europe', 'germany': 'Europe', 'united kingdom': 'Europe', 'uk': 'Europe', 'switzerland': 'Europe', 'netherlands': 'Europe', 'portugal': 'Europe', 'iceland': 'Europe', 'turkey': 'Europe', 'austria': 'Europe', 'croatia': 'Europe',
  'united states': 'North America', 'usa': 'North America', 'canada': 'North America', 'mexico': 'North America',
  'peru': 'South America', 'brazil': 'South America', 'argentina': 'South America', 'colombia': 'South America', 'chile': 'South America',
  'australia': 'Oceania', 'new zealand': 'Oceania',
  'egypt': 'Africa', 'south africa': 'Africa', 'morocco': 'Africa', 'kenya': 'Africa'
};

const CURRENCY_MAP = {
  'japan': 'JPY (¥)', 'italy': 'EUR (€)', 'france': 'EUR (€)', 'greece': 'EUR (€)', 'spain': 'EUR (€)', 'germany': 'EUR (€)', 'united kingdom': 'GBP (£)',
  'united states': 'USD ($)', 'canada': 'CAD ($)', 'australia': 'AUD ($)', 'india': 'INR (₹)', 'uae': 'AED (د.إ)', 'switzerland': 'CHF (Fr)',
  'brazil': 'BRL (R$)', 'egypt': 'EGP (E£)', 'turkey': 'TRY (₺)', 'singapore': 'SGD ($)', 'thailand': 'THB (฿)', 'mexico': 'MXN ($)'
};

/**
 * Fetch or dynamically construct a full Destination object for ANY location searched in the world
 */
export async function createDynamicDestination(query) {
  if (!query || query.trim().length < 2) return null;

  const cleanQuery = query.trim();

  try {
    // 1. Geocode location using Nominatim OpenStreetMap API
    const geoRes = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(cleanQuery)}&limit=1&addressdetails=1`,
      {
        headers: {
          'Accept-Language': 'en',
          'User-Agent': 'AetheriaTravelApp/1.0'
        }
      }
    );

    if (!geoRes.ok) return null;
    const geoData = await geoRes.json();

    if (!geoData || geoData.length === 0) return null;

    const firstMatch = geoData[0];
    const lat = parseFloat(firstMatch.lat);
    const lon = parseFloat(firstMatch.lon);

    const cityName = firstMatch.address?.city || 
                     firstMatch.address?.town || 
                     firstMatch.address?.village || 
                     firstMatch.address?.municipality || 
                     firstMatch.name || 
                     cleanQuery;

    const countryName = firstMatch.address?.country || 'World Destination';
    const countryKey = countryName.toLowerCase();

    const continent = CONTINENT_MAP[countryKey] || 'Global';
    const currency = CURRENCY_MAP[countryKey] || 'USD ($)';

    // 2. Fetch live real-time weather from Open-Meteo
    const weather = await fetchLiveWeather(lat, lon);

    // 3. Fetch high-res imagery from Unsplash Source
    const heroImage = `https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1600&auto=format&fit=crop&sig=${Math.abs(Math.sin(lat) * 10000).toFixed(0)}`;

    // 4. Geocode famous places / landmarks near this location
    const placesRes = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(`tourism in ${cityName} ${countryName}`)}&limit=4&addressdetails=1`,
      {
        headers: {
          'Accept-Language': 'en',
          'User-Agent': 'AetheriaTravelApp/1.0'
        }
      }
    );

    let famousPlaces = [];
    if (placesRes.ok) {
      const placesData = await placesRes.json();
      famousPlaces = placesData.map((p, idx) => ({
        id: `dynamic-place-${p.place_id || idx}`,
        name: p.name || `${cityName} Landmark ${idx + 1}`,
        category: idx % 2 === 0 ? 'Monument & Sight' : 'Historic & Nature',
        description: `Explore the vibrant attraction of ${p.name || cityName}, offering iconic views and local cultural experiences.`,
        image: `https://images.unsplash.com/photo-${1500000000000 + idx * 100000}?q=80&w=800&auto=format&fit=crop&sig=${idx + 10}`,
        duration: '2-3 hours',
        approxCost: idx === 0 ? 'Free' : '$15 - $30',
        lat: parseFloat(p.lat),
        lon: parseFloat(p.lon)
      }));
    }

    // Fallback famous places if search yields few items
    if (famousPlaces.length < 2) {
      famousPlaces = [
        {
          id: `place-1-${cityName}`,
          name: `${cityName} Historic Old Town`,
          category: 'Historic Center',
          description: `Stroll through the legendary streets of ${cityName}, lined with authentic architecture, boutique shops, and local cafes.`,
          image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop',
          duration: '3 hours',
          approxCost: 'Free walk',
          lat: lat + 0.005,
          lon: lon + 0.005
        },
        {
          id: `place-2-${cityName}`,
          name: `${cityName} Panoramic Viewpoint & Gardens`,
          category: 'Scenic Viewpoint',
          description: `Enjoy breathtaking sky-line views over ${cityName} and surrounding natural landscapes.`,
          image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=800&auto=format&fit=crop',
          duration: '2 hours',
          approxCost: '$10',
          lat: lat - 0.005,
          lon: lon - 0.005
        }
      ];
    }

    const categoryOptions = ['Beach', 'Cultural', 'Mountain', 'Modern', 'Historic', 'Hidden Gem'];
    const category = categoryOptions[Math.floor(Math.abs(Math.sin(lat)) * categoryOptions.length)];

    return {
      id: `dynamic-${cityName.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
      name: cityName,
      country: countryName,
      continent: continent,
      tagline: `Discover the wonders of ${cityName}`,
      category: category,
      description: `${cityName} is a captivating destination in ${countryName}. Renowned for its unique cultural heritage, stunning architecture, vibrant street life, and unforgettable scenery.`,
      lat: lat,
      lon: lon,
      avgTemp: weather.temp || 22,
      rating: 4.9,
      reviewCount: 1850 + Math.floor(Math.abs(Math.sin(lon)) * 2000),
      durationDays: '3-5 days',
      budgetRange: '$$$',
      bestTimeToVisit: 'Spring & Autumn',
      currency: currency,
      language: firstMatch.address?.country_code === 'jp' ? 'Japanese' : firstMatch.address?.country_code === 'fr' ? 'French' : 'English / Local',
      timezone: 'UTC',
      heroImage: heroImage,
      famousPlaces: famousPlaces
    };
  } catch (error) {
    console.error('Dynamic destination creation error:', error);
    return null;
  }
}
