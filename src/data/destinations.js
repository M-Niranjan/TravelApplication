export const DESTINATIONS = [
  {
    id: 'paris-france',
    name: 'Paris',
    country: 'France',
    region: 'Europe',
    description: 'France’s capital is a major European city and global center for art, fashion, gastronomy, and culture. Its 19th-century cityscape is crisscrossed by wide boulevards and the River Seine.',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1600&auto=format&fit=crop',
    latitude: 48.8566,
    longitude: 2.3522,
    bestTime: 'April - May & September - October',
    duration: '4–5 days',
    currency: 'EUR (€)',
    language: 'French',
    tags: ['Europe', 'Culture', 'Luxury', 'Architecture', 'Food'],
    places: [
      {
        id: 'eiffel-tower',
        name: 'Eiffel Tower',
        category: 'Landmark',
        description: 'Wrought-iron lattice tower on the Champ de Mars, illuminated by 20,000 sparkling lights every night.',
        image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=800&auto=format&fit=crop',
        duration: '1–2 hours'
      },
      {
        id: 'louvre-museum',
        name: 'The Louvre Museum',
        category: 'Art & Culture',
        description: 'World’s largest art museum housing historic masterpieces including the Mona Lisa.',
        image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=800&auto=format&fit=crop',
        duration: '3–4 hours'
      }
    ]
  },
  {
    id: 'tokyo-japan',
    name: 'Tokyo',
    country: 'Japan',
    region: 'Asia',
    description: 'Japan’s bustling capital, mixing ultra-modern neon skyscrapers with historic Shinto shrines, tranquil gardens, and world-renowned culinary innovation.',
    image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=1600&auto=format&fit=crop',
    latitude: 35.6762,
    longitude: 139.6503,
    bestTime: 'March - May & September - November',
    duration: '5–7 days',
    currency: 'JPY (¥)',
    language: 'Japanese',
    tags: ['Asia', 'Modern', 'Food', 'Culture', 'Shopping'],
    places: [
      {
        id: 'sensoji',
        name: 'Senso-ji Temple',
        category: 'Historic Shrine',
        description: 'Tokyo’s oldest Buddhist temple in Asakusa with its iconic giant red lantern.',
        image: 'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?q=80&w=800&auto=format&fit=crop',
        duration: '1–2 hours'
      },
      {
        id: 'shibuya-scramble',
        name: 'Shibuya Scramble Crossing',
        category: 'Modern Landmark',
        description: 'World’s busiest pedestrian crossing, surrounded by electric Tokyo energy.',
        image: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=80&w=800&auto=format&fit=crop',
        duration: '1 hour'
      }
    ]
  },
  {
    id: 'bali-indonesia',
    name: 'Bali',
    country: 'Indonesia',
    region: 'Asia',
    description: 'An Indonesian island known for its forested volcanic mountains, iconic rice paddies, beaches, and coral reefs, with sacred Hindu shrines like Cliffside Uluwatu.',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1600&auto=format&fit=crop',
    latitude: -8.4095,
    longitude: 115.1889,
    bestTime: 'April - October (Dry season)',
    duration: '5–7 days',
    currency: 'IDR (Rp)',
    language: 'Indonesian / Balinese',
    tags: ['Asia', 'Beach', 'Adventure', 'Relaxation', 'Nature'],
    places: [
      {
        id: 'ubud-monkey-forest',
        name: 'Ubud Sacred Monkey Forest',
        category: 'Nature & Sanctuary',
        description: 'Lush natural forest sanctuary housing hundreds of Balinese long-tailed macaques.',
        image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=800&auto=format&fit=crop',
        duration: '2 hours'
      }
    ]
  },
  {
    id: 'dubai-uae',
    name: 'Dubai',
    country: 'United Arab Emirates',
    region: 'Asia',
    description: 'A global metropolis in the UAE known for luxury shopping, ultra-modern architecture, artificial palm islands, and desert safari experiences.',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1600&auto=format&fit=crop',
    latitude: 25.2048,
    longitude: 55.2708,
    bestTime: 'November - March',
    duration: '3–4 days',
    currency: 'AED (د.إ)',
    language: 'Arabic / English',
    tags: ['Asia', 'Luxury', 'Modern', 'Shopping', 'Architecture'],
    places: [
      {
        id: 'burj-khalifa',
        name: 'Burj Khalifa',
        category: 'Skyscraper Landmark',
        description: 'World’s tallest building offering breathtaking panoramas over the desert skyline.',
        image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=800&auto=format&fit=crop',
        duration: '2–3 hours'
      }
    ]
  },
  {
    id: 'switzerland-alps',
    name: 'Switzerland',
    country: 'Switzerland',
    region: 'Europe',
    description: 'A mountainous Central European nation, home to numerous lakes, villages, and the high peaks of the Alps. Famous for ski resorts, hiking, and alpine lakes.',
    image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=1600&auto=format&fit=crop',
    latitude: 46.8182,
    longitude: 8.2275,
    bestTime: 'June - September & Dec - March',
    duration: '4–6 days',
    currency: 'CHF (Fr)',
    language: 'German / French / Italian',
    tags: ['Europe', 'Mountain', 'Adventure', 'Nature', 'Relaxation'],
    places: [
      {
        id: 'matterhorn',
        name: 'The Matterhorn Zermatt',
        category: 'Alpine Peak',
        description: 'Iconic pyramid-shaped peak spanning the border between Switzerland and Italy.',
        image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=800&auto=format&fit=crop',
        duration: 'Half Day'
      }
    ]
  },
  {
    id: 'rome-italy',
    name: 'Rome',
    country: 'Italy',
    region: 'Europe',
    description: 'Rome, Italy’s capital, is a sprawling, cosmopolitan city with nearly 3,000 years of globally influential art, architecture, and ancient history.',
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=1600&auto=format&fit=crop',
    latitude: 41.9028,
    longitude: 12.4964,
    bestTime: 'April - May & September - October',
    duration: '3–4 days',
    currency: 'EUR (€)',
    language: 'Italian',
    tags: ['Europe', 'History', 'Culture', 'Food', 'Architecture'],
    places: [
      {
        id: 'colosseum',
        name: 'The Colosseum',
        category: 'Ancient Landmark',
        description: 'Massive stone amphitheater commissioned in AD 72 for gladiatorial games.',
        image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=800&auto=format&fit=crop',
        duration: '2–3 hours'
      }
    ]
  },
  {
    id: 'santorini-greece',
    name: 'Santorini',
    country: 'Greece',
    region: 'Europe',
    description: 'One of the Cyclades islands in the Aegean Sea, devastated by a 16th-century BC volcanic eruption that shaped its rugged caldera, whitewashed cliff villages, and world-famous sunsets.',
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=1600&auto=format&fit=crop',
    latitude: 36.3932,
    longitude: 25.4615,
    bestTime: 'May - October',
    duration: '3–4 days',
    currency: 'EUR (€)',
    language: 'Greek',
    tags: ['Europe', 'Beach', 'Luxury', 'Relaxation', 'Photography'],
    places: [
      {
        id: 'oia-village',
        name: 'Oia Clifftop Village',
        category: 'Scenic Settlement',
        description: 'Famous whitewashed village with cobalt-blue dome churches and legendary Aegean sunset viewpoints.',
        image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=800&auto=format&fit=crop',
        duration: '3 hours'
      }
    ]
  },
  {
    id: 'barcelona-spain',
    name: 'Barcelona',
    country: 'Spain',
    region: 'Europe',
    description: 'The cosmopolitan capital of Spain’s Catalonia region, defined by Antoni Gaudí’s surreal modernist architecture, seaside promenades, and vibrant tapaseries.',
    image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?q=80&w=1600&auto=format&fit=crop',
    latitude: 41.3879,
    longitude: 2.1699,
    bestTime: 'May - June & September - October',
    duration: '3–5 days',
    currency: 'EUR (€)',
    language: 'Spanish / Catalan',
    tags: ['Europe', 'Beach', 'Architecture', 'Culture', 'Food'],
    places: [
      {
        id: 'sagrada-familia',
        name: 'Basílica de la Sagrada Família',
        category: 'Architectural Wonder',
        description: 'Gaudí’s unfinished masterpiece basilica featuring forest-like stone columns and stained glass.',
        image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?q=80&w=800&auto=format&fit=crop',
        duration: '2 hours'
      }
    ]
  },
  {
    id: 'new-york-usa',
    name: 'New York City',
    country: 'United States',
    region: 'Americas',
    description: 'Comprising 5 boroughs sitting where the Hudson River meets the Atlantic Ocean. At its core is Manhattan, a densely packed city of iconic skyscrapers, Central Park, and Broadway.',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=1600&auto=format&fit=crop',
    latitude: 40.7128,
    longitude: -74.0060,
    bestTime: 'April - June & September - November',
    duration: '4–6 days',
    currency: 'USD ($)',
    language: 'English',
    tags: ['Americas', 'Modern', 'Culture', 'Shopping', 'Food'],
    places: [
      {
        id: 'statue-of-liberty',
        name: 'Statue of Liberty',
        category: 'Historic Monument',
        description: 'Colossal neoclassical copper sculpture on Liberty Island in New York Harbor.',
        image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=800&auto=format&fit=crop',
        duration: '3 hours'
      }
    ]
  },
  {
    id: 'maldives-islands',
    name: 'Maldives',
    country: 'Maldives',
    region: 'Asia',
    description: 'A tropical paradise in the Indian Ocean formed by 26 ring-shaped atolls, renowned for crystal-clear turquoise lagoons, coral reefs, and luxurious overwater private villas.',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=1600&auto=format&fit=crop',
    latitude: 3.2028,
    longitude: 73.2207,
    bestTime: 'November - April (Dry season)',
    duration: '4–7 days',
    currency: 'MVR (Rf) / USD',
    language: 'Dhivehi / English',
    tags: ['Asia', 'Beach', 'Luxury', 'Relaxation', 'Nature'],
    places: [
      {
        id: 'male-atoll',
        name: 'North Malé Coral Reefs',
        category: 'Marine Sanctuary',
        description: 'Vibrant coral reef gardens teeming with manta rays, sea turtles, and tropical marine life.',
        image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=800&auto=format&fit=crop',
        duration: 'Half Day'
      }
    ]
  },
  {
    id: 'iceland-reykjavik',
    name: 'Iceland',
    country: 'Iceland',
    region: 'Europe',
    description: 'Nordic island nation defined by dramatic volcanic landscapes, hot geothermal springs, massive glaciers, black sand beaches, and dancing Northern Lights.',
    image: 'https://images.unsplash.com/photo-1504893524553-b855bce32c67?q=80&w=1600&auto=format&fit=crop',
    latitude: 64.1466,
    longitude: -21.9426,
    bestTime: 'Sept - March (Aurora) & June - Aug (Midnight Sun)',
    duration: '5–8 days',
    currency: 'ISK (kr)',
    language: 'Icelandic / English',
    tags: ['Europe', 'Adventure', 'Nature', 'Photography'],
    places: [
      {
        id: 'blue-lagoon',
        name: 'Blue Lagoon Spa',
        category: 'Geothermal Spa',
        description: 'Milky-blue mineral-rich geothermal spa surrounded by black volcanic basalt rocks.',
        image: 'https://images.unsplash.com/photo-1504893524553-b855bce32c67?q=80&w=800&auto=format&fit=crop',
        duration: '3 hours'
      }
    ]
  },
  {
    id: 'sydney-australia',
    name: 'Sydney',
    country: 'Australia',
    region: 'Oceania',
    description: 'Capital of New South Wales and one of Australia’s largest cities, best known for its sail-shaped Sydney Opera House, Harbour Bridge, and world-class surfing beaches.',
    image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=1600&auto=format&fit=crop',
    latitude: -33.8688,
    longitude: 151.2093,
    bestTime: 'September - November & March - May',
    duration: '4–6 days',
    currency: 'AUD (A$)',
    language: 'English',
    tags: ['Oceania', 'Beach', 'Modern', 'Architecture', 'Adventure'],
    places: [
      {
        id: 'sydney-opera-house',
        name: 'Sydney Opera House',
        category: 'Architectural Icon',
        description: 'World-famous multi-venue performing arts centre designed with expressive white shell vaults.',
        image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=800&auto=format&fit=crop',
        duration: '2 hours'
      }
    ]
  }
];

export const REGIONS = ['All', 'Asia', 'Europe', 'Americas', 'Oceania'];
export const TRAVEL_TYPES = ['All Types', 'Culture', 'Beach', 'Adventure', 'Luxury', 'Nature', 'Modern', 'History'];
