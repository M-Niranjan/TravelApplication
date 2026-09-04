// Image Service to query Pexels / Unsplash with rich curated fallbacks

const CURATED_IMAGE_DATABASE = {
  kyoto: [
    'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1578637387939-43c525550085?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?q=80&w=1200&auto=format&fit=crop',
  ],
  amalfi: [
    'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1555992336-fb0d29498b13?q=80&w=1200&auto=format&fit=crop',
  ],
  santorini: [
    'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1200&auto=format&fit=crop',
  ],
  banff: [
    'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?q=80&w=1200&auto=format&fit=crop',
  ],
  default: [
    'https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop',
  ]
};

/**
 * Fetch images for a search query using Pexels API (if key present) or Unsplash Source / curated fallback
 */
export async function fetchImages(query, pexelsApiKey = '', count = 4) {
  if (pexelsApiKey) {
    try {
      const response = await fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=${count}`, {
        headers: {
          Authorization: pexelsApiKey
        }
      });
      if (response.ok) {
        const data = await response.json();
        if (data.photos && data.photos.length > 0) {
          return data.photos.map(p => p.src.large2x || p.src.large);
        }
      }
    } catch (e) {
      console.warn('Pexels API fetch failed:', e);
    }
  }

  // Check curated matches
  const normalizedQuery = query.toLowerCase();
  for (const [key, photos] of Object.entries(CURATED_IMAGE_DATABASE)) {
    if (normalizedQuery.includes(key)) {
      return photos.slice(0, count);
    }
  }

  // Fallback to verified high quality travel photos
  const fallbackList = [
    'https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=1200&auto=format&fit=crop'
  ];
  return Array.from({ length: count }).map((_, i) => fallbackList[i % fallbackList.length]);
}
