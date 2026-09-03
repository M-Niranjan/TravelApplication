// Browser Geolocation & Nominatim Search Location Service

export async function getCurrentCityLocation(lat, lon) {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10&addressdetails=1`,
      {
        headers: { 'Accept-Language': 'en', 'User-Agent': 'AetheriaTravel/1.0' }
      }
    );
    if (!response.ok) throw new Error('Geocoding failed');
    const data = await response.json();

    const city = data.address.city || data.address.town || data.address.village || data.address.county || 'Your Location';
    const country = data.address.country || '';

    return {
      city,
      country,
      formattedName: `${city}, ${country}`,
      lat,
      lon
    };
  } catch (e) {
    return {
      city: 'Current Location',
      country: '',
      formattedName: 'Current location',
      lat,
      lon
    };
  }
}

export async function searchLocationByQuery(query) {
  if (!query || query.trim().length < 2) return [];

  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5&addressdetails=1`,
      {
        headers: { 'Accept-Language': 'en', 'User-Agent': 'AetheriaTravel/1.0' }
      }
    );
    if (!response.ok) return [];

    const data = await response.json();
    return data.map((item) => ({
      id: item.place_id,
      name: item.display_name,
      cityName: item.address?.city || item.address?.town || item.address?.village || item.name,
      countryName: item.address?.country || '',
      lat: parseFloat(item.lat),
      lon: parseFloat(item.lon)
    }));
  } catch (error) {
    return [];
  }
}
