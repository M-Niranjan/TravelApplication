// Unsplash & Pexels Image Service Integration with fallback imagery

export async function fetchDestinationImage(query, apiKey = '') {
  const unsplashKey = apiKey || import.meta.env.VITE_UNSPLASH_ACCESS_KEY || '';

  if (unsplashKey) {
    try {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=1&orientation=landscape`,
        {
          headers: {
            Authorization: `Client-ID ${unsplashKey}`
          }
        }
      );
      if (response.ok) {
        const data = await response.json();
        if (data.results && data.results.length > 0) {
          return data.results[0].urls.regular;
        }
      }
    } catch (e) {
      console.warn('Unsplash API fetch error:', e);
    }
  }

  // Fallback high-res imagery mapping
  const normalized = query.toLowerCase();
  if (normalized.includes('paris')) return 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1600&auto=format&fit=crop';
  if (normalized.includes('tokyo')) return 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=1600&auto=format&fit=crop';
  if (normalized.includes('kyoto')) return 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1600&auto=format&fit=crop';
  if (normalized.includes('amalfi') || normalized.includes('italy')) return 'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1600&auto=format&fit=crop';
  if (normalized.includes('santorini') || normalized.includes('greece')) return 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=1600&auto=format&fit=crop';
  if (normalized.includes('banff') || normalized.includes('canada')) return 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?q=80&w=1600&auto=format&fit=crop';

  return `https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1600&auto=format&fit=crop`;
}
