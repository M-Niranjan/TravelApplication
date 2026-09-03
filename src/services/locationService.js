// Location Service for Geolocation and City Nominatim Search

/**
 * Reverse geocode latitude and longitude to get City and Country name
 */
export async function reverseGeocode(lat, lon) {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10&addressdetails=1`,
      {
        headers: {
          'Accept-Language': 'en',
          'User-Agent': 'AetheriaTravelApp/1.0'
        }
      }
    );
    if (!response.ok) throw new Error('Geocoding failed');
    const data = await response.json();
    
    const city = data.address.city || data.address.town || data.address.village || data.address.county || 'Your Location';
    const country = data.address.country || '';
    
    return {
      cityName: city,
      countryName: country,
      displayName: `${city}${country ? `, ${country}` : ''}`,
      lat,
      lon
    };
  } catch (error) {
    console.warn('Reverse geocode failed:', error);
    return {
      cityName: 'Current Location',
      countryName: '',
      displayName: 'Current Location',
      lat,
      lon
    };
  }
}

/**
 * Search cities by query string
 */
export async function searchLocations(query) {
  if (!query || query.trim().length < 2) return [];

  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5&addressdetails=1`,
      {
        headers: {
          'Accept-Language': 'en',
          'User-Agent': 'AetheriaTravelApp/1.0'
        }
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
    console.error('Location search error:', error);
    return [];
  }
}
