export const DESTINATIONS = [
  {
    id: 'paris-france',
    name: 'Paris',
    country: 'France',
    region: 'Europe',
    description: 'France’s capital is a major European city and global center for art, fashion, gastronomy, and culture. Its 19th-century cityscape is crisscrossed by wide boulevards and the River Seine.',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=85&w=1600&auto=format&fit=crop',
    latitude: 48.8566,
    longitude: 2.3522,
    bestTime: 'April - May & September - October',
    currency: 'EUR (€)',
    language: 'French',
    tags: ['Europe', 'Culture', 'Luxury', 'Architecture', 'Food'],
    places: [
      {
        id: 'eiffel-tower',
        name: 'Eiffel Tower',
        category: 'Iconic Landmark',
        description: 'Wrought-iron lattice tower on the Champ de Mars, illuminated by 20,000 sparkling lights every night.',
        image: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?q=85&w=1200&auto=format&fit=crop',
        duration: '1–2 hours'
      },
      {
        id: 'louvre-museum',
        name: 'The Louvre Museum',
        category: 'Art & Heritage',
        description: 'World’s largest art museum housing historic masterpieces including the Mona Lisa and Venus de Milo.',
        image: 'https://images.unsplash.com/photo-1565099824688-e93eb20fe52c?q=85&w=1200&auto=format&fit=crop',
        duration: '3–4 hours'
      },
      {
        id: 'notre-dame',
        name: 'Notre-Dame Cathedral',
        category: 'Gothic Masterpiece',
        description: 'Medieval Catholic cathedral on the Île de la Cité, celebrated for its rose windows and twin towers.',
        image: 'https://images.unsplash.com/photo-1478860409698-8707f313ee8b?q=85&w=1200&auto=format&fit=crop',
        duration: '1.5 hours'
      },
      {
        id: 'montmartre-sacre-coeur',
        name: 'Montmartre & Sacré-Cœur',
        category: 'Historic Hilltop',
        description: 'Bohemian hilltop neighborhood featuring artists’ squares and panoramic views over Paris.',
        image: 'https://images.unsplash.com/photo-1550340499-a6c60fc8287c?q=85&w=1200&auto=format&fit=crop',
        duration: '2–3 hours'
      },
      {
        id: 'arc-de-triomphe',
        name: 'Arc de Triomphe',
        category: 'Historic Monument',
        description: 'Iconic triumphal arch standing at the western end of the Champs-Élysées with rooftop vistas.',
        image: 'https://images.unsplash.com/photo-1509299349698-dd22323b5963?q=85&w=1200&auto=format&fit=crop',
        duration: '1 hour'
      },
      {
        id: 'palace-of-versailles',
        name: 'Palace of Versailles',
        category: 'Royal Palace & Gardens',
        description: 'Opulent royal residence famous for the gilded Hall of Mirrors and magnificent geometric fountains.',
        image: 'https://images.unsplash.com/photo-1584467541268-b040f83be3fd?q=85&w=1200&auto=format&fit=crop',
        duration: '4–5 hours'
      }
    ]
  },
  {
    id: 'tokyo-japan',
    name: 'Tokyo',
    country: 'Japan',
    region: 'Asia',
    description: 'Japan’s bustling capital, mixing ultra-modern neon skyscrapers with historic Shinto shrines, tranquil gardens, and world-renowned culinary innovation.',
    image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=85&w=1600&auto=format&fit=crop',
    latitude: 35.6762,
    longitude: 139.6503,
    bestTime: 'March - May & September - November',
    currency: 'JPY (¥)',
    language: 'Japanese',
    tags: ['Asia', 'Modern', 'Food', 'Culture', 'Shopping'],
    places: [
      {
        id: 'sensoji',
        name: 'Senso-ji Temple',
        category: 'Historic Shrine',
        description: 'Tokyo’s oldest Buddhist temple in Asakusa with its iconic giant red lantern and Nakamise street.',
        image: 'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?q=85&w=1200&auto=format&fit=crop',
        duration: '1–2 hours'
      },
      {
        id: 'shibuya-scramble',
        name: 'Shibuya Scramble Crossing',
        category: 'Modern Landmark',
        description: 'World’s busiest pedestrian crossing, surrounded by giant screens and electric Tokyo energy.',
        image: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=85&w=1200&auto=format&fit=crop',
        duration: '1 hour'
      },
      {
        id: 'tokyo-skytree',
        name: 'Tokyo Skytree',
        category: 'Observation Tower',
        description: 'Towering 634-meter structure offering 360-degree panoramic views across the Tokyo metropolis and Mount Fuji.',
        image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=85&w=1200&auto=format&fit=crop',
        duration: '2 hours'
      },
      {
        id: 'meiji-shrine',
        name: 'Meiji Jingu Shrine',
        category: 'Sacred Sanctuary',
        description: 'Peaceful Shinto shrine surrounded by an evergreen forest of over 100,000 trees in Shibuya.',
        image: 'https://images.unsplash.com/photo-1583037189850-1921ae7c6c22?q=85&w=1200&auto=format&fit=crop',
        duration: '1.5 hours'
      },
      {
        id: 'teamlab-planets',
        name: 'teamLab Planets',
        category: 'Digital Art Museum',
        description: 'Immersive digital art museum where visitors walk through water and giant crystal gardens.',
        image: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?q=85&w=1200&auto=format&fit=crop',
        duration: '2.5 hours'
      },
      {
        id: 'shinjuku-gyoen',
        name: 'Shinjuku Gyoen Garden',
        category: 'Botanical Garden',
        description: 'Expansive historic park blending traditional Japanese, English landscape, and French formal gardens.',
        image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=85&w=1200&auto=format&fit=crop',
        duration: '2 hours'
      }
    ]
  },
  {
    id: 'bali-indonesia',
    name: 'Bali',
    country: 'Indonesia',
    region: 'Asia',
    description: 'An Indonesian island known for its forested volcanic mountains, iconic rice paddies, beaches, and coral reefs, with sacred Hindu shrines like Cliffside Uluwatu.',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=85&w=1600&auto=format&fit=crop',
    latitude: -8.4095,
    longitude: 115.1889,
    bestTime: 'April - October (Dry season)',
    currency: 'IDR (Rp)',
    language: 'Indonesian / Balinese',
    tags: ['Asia', 'Beach', 'Adventure', 'Relaxation', 'Nature'],
    places: [
      {
        id: 'ubud-monkey-forest',
        name: 'Ubud Sacred Monkey Forest',
        category: 'Nature & Wildlife',
        description: 'Lush natural forest sanctuary housing hundreds of Balinese long-tailed macaques and ancient mossy temples.',
        image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=85&w=1200&auto=format&fit=crop',
        duration: '2 hours'
      },
      {
        id: 'tegallalang-rice-terraces',
        name: 'Tegallalang Rice Terraces',
        category: 'Emerald Valley',
        description: 'Iconic emerald-green stepped rice paddies situated in the hills of Ubud with dramatic jungle swings.',
        image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?q=85&w=1200&auto=format&fit=crop',
        duration: '2–3 hours'
      },
      {
        id: 'uluwatu-cliff-temple',
        name: 'Uluwatu Temple',
        category: 'Cliffside Shrine',
        description: 'Majestic Balinese sea temple perched atop a steep 70-meter cliff with breathtaking sunset amphitheaters.',
        image: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?q=85&w=1200&auto=format&fit=crop',
        duration: '2 hours'
      },
      {
        id: 'tanah-lot-temple',
        name: 'Tanah Lot Sea Temple',
        category: 'Ocean Pilgrimage',
        description: 'Ancient offshore rock formation and Hindu pilgrimage temple bathed in golden sunset waves.',
        image: 'https://images.unsplash.com/photo-1512100356356-de1b84283e18?q=85&w=1200&auto=format&fit=crop',
        duration: '1.5 hours'
      },
      {
        id: 'nusa-penida-kelingking',
        name: 'Kelingking Beach (Nusa Penida)',
        category: 'Coastal Wonder',
        description: 'Breathtaking T-Rex shaped coastal headland surrounded by crystal-clear turquoise waters and white sand.',
        image: 'https://images.unsplash.com/photo-1598387993441-a364f854c3e1?q=85&w=1200&auto=format&fit=crop',
        duration: 'Half Day'
      },
      {
        id: 'mount-batur-sunrise',
        name: 'Mount Batur Sunrise Trek',
        category: 'Volcano Adventure',
        description: 'Active volcano hiking trail offering stunning sunrise panoramas above the clouds and caldera lake.',
        image: 'https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?q=85&w=1200&auto=format&fit=crop',
        duration: '4–5 hours'
      }
    ]
  },
  {
    id: 'dubai-uae',
    name: 'Dubai',
    country: 'United Arab Emirates',
    region: 'Asia',
    description: 'A global metropolis in the UAE known for luxury shopping, ultra-modern architecture, artificial palm islands, and desert safari experiences.',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=85&w=1600&auto=format&fit=crop',
    latitude: 25.2048,
    longitude: 55.2708,
    bestTime: 'November - March',
    currency: 'AED (د.إ)',
    language: 'Arabic / English',
    tags: ['Asia', 'Luxury', 'Modern', 'Shopping', 'Architecture'],
    places: [
      {
        id: 'burj-khalifa',
        name: 'Burj Khalifa',
        category: 'Skyscraper Landmark',
        description: 'World’s tallest building offering breathtaking panoramas over the desert skyline from level 148.',
        image: 'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?q=85&w=1200&auto=format&fit=crop',
        duration: '2–3 hours'
      },
      {
        id: 'dubai-miracle-garden',
        name: 'Dubai Miracle Garden',
        category: 'Floral Attraction',
        description: 'World’s largest natural flower garden displaying over 150 million blooming flowers in fantastical shapes.',
        image: 'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?q=85&w=1200&auto=format&fit=crop',
        duration: '2 hours'
      },
      {
        id: 'palm-jumeirah-atlantis',
        name: 'Palm Jumeirah & Atlantis',
        category: 'Island Wonder',
        description: 'Tree-shaped artificial island featuring five-star luxury resorts, aquariums, and world-class fine dining.',
        image: 'https://images.unsplash.com/photo-1580674285054-bed31e145f59?q=85&w=1200&auto=format&fit=crop',
        duration: '3 hours'
      },
      {
        id: 'dubai-frame',
        name: 'The Dubai Frame',
        category: 'Architectural Icon',
        description: 'A 150-meter golden frame structure connecting historic old Dubai with the modern futuristic skyline.',
        image: 'https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?q=85&w=1200&auto=format&fit=crop',
        duration: '1.5 hours'
      },
      {
        id: 'arabian-desert-safari',
        name: 'Arabian Desert Safari',
        category: 'Desert Adventure',
        description: 'Exhilarating 4x4 dune bashing, camel riding, and traditional Bedouin stargazing camps.',
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=85&w=1200&auto=format&fit=crop',
        duration: '4–6 hours'
      },
      {
        id: 'dubai-creek-souks',
        name: 'Dubai Creek & Gold Souk',
        category: 'Heritage & Markets',
        description: 'Take a traditional abra wooden boat across the creek and explore the glittering spice and gold bazaars.',
        image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?q=85&w=1200&auto=format&fit=crop',
        duration: '2 hours'
      }
    ]
  },
  {
    id: 'switzerland-alps',
    name: 'Switzerland',
    country: 'Switzerland',
    region: 'Europe',
    description: 'A mountainous Central European nation, home to numerous lakes, villages, and the high peaks of the Alps. Famous for ski resorts, hiking, and alpine lakes.',
    image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=85&w=1600&auto=format&fit=crop',
    latitude: 46.8182,
    longitude: 8.2275,
    bestTime: 'June - September (Hiking) & Dec - March (Skiing)',
    currency: 'CHF (Fr)',
    language: 'German / French / Italian',
    tags: ['Europe', 'Mountain', 'Adventure', 'Nature', 'Relaxation'],
    places: [
      {
        id: 'matterhorn-zermatt',
        name: 'The Matterhorn, Zermatt',
        category: 'Alpine Peak',
        description: 'Iconic pyramid-shaped peak towering over Zermatt with year-round glacier skiing and scenic mountain railways.',
        image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=85&w=1200&auto=format&fit=crop',
        duration: 'Half Day'
      },
      {
        id: 'lauterbrunnen-valley',
        name: 'Lauterbrunnen Valley & Falls',
        category: 'Alpine Valley',
        description: 'Fairytale valley of 72 cascading waterfalls, sheer limestone cliffs, and traditional Swiss wooden chalets.',
        image: 'https://images.unsplash.com/photo-1527668752968-14dc70a27c95?q=85&w=1200&auto=format&fit=crop',
        duration: '3–4 hours'
      },
      {
        id: 'jungfraujoch-top-of-europe',
        name: 'Jungfraujoch (Top of Europe)',
        category: 'Glacier Observatory',
        description: 'Highest railway station in Europe at 3,454m with the Ice Palace and Aletsch Glacier views.',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=85&w=1200&auto=format&fit=crop',
        duration: 'Full Day'
      },
      {
        id: 'chateau-de-chillon',
        name: 'Château de Chillon, Lake Geneva',
        category: 'Medieval Castle',
        description: 'Romantic medieval fortress perched on an island rock on the sparkling shores of Lake Geneva.',
        image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=85&w=1200&auto=format&fit=crop',
        duration: '2 hours'
      },
      {
        id: 'lucerne-chapel-bridge',
        name: 'Lucerne & Chapel Bridge',
        category: 'Historic Landmark',
        description: 'Covered wooden footbridge decorated with 17th-century interior paintings across the Reuss River.',
        image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=85&w=1200&auto=format&fit=crop',
        duration: '2–3 hours'
      },
      {
        id: 'interlaken-lake-brienz',
        name: 'Interlaken & Lake Brienz',
        category: 'Turquoise Alpine Lake',
        description: 'Resort town nestled between Lake Thun and Lake Brienz, renowned for boat cruises and paragliding.',
        image: 'https://images.unsplash.com/photo-1573155993874-d5d48af862ba?q=85&w=1200&auto=format&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=85&w=1600&auto=format&fit=crop',
    latitude: 41.9028,
    longitude: 12.4964,
    bestTime: 'April - May & September - October',
    currency: 'EUR (€)',
    language: 'Italian',
    tags: ['Europe', 'History', 'Culture', 'Food', 'Architecture'],
    places: [
      {
        id: 'colosseum',
        name: 'The Colosseum',
        category: 'Ancient Amphitheater',
        description: 'Massive stone amphitheater commissioned in AD 72 for gladiatorial games and historic spectacles.',
        image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=85&w=1200&auto=format&fit=crop',
        duration: '2–3 hours'
      },
      {
        id: 'vatican-museums-st-peters',
        name: 'Vatican Museums & St. Peter’s',
        category: 'Renaissance Masterpiece',
        description: 'The Sistine Chapel ceiling painted by Michelangelo and the world’s grandest Catholic basilica.',
        image: 'https://images.unsplash.com/photo-1531572753322-ad063cecc140?q=85&w=1200&auto=format&fit=crop',
        duration: '3–4 hours'
      },
      {
        id: 'trevi-fountain',
        name: 'Trevi Fountain',
        category: 'Baroque Monument',
        description: 'Legendary 18th-century Baroque fountain where visitors toss coins to ensure their return to Rome.',
        image: 'https://images.unsplash.com/photo-1525874684015-58379d421a52?q=85&w=1200&auto=format&fit=crop',
        duration: '1 hour'
      },
      {
        id: 'pantheon-rome',
        name: 'The Pantheon',
        category: 'Ancient Temple',
        description: 'Former Roman temple renowned for its unreinforced concrete dome and magnificent central oculus.',
        image: 'https://images.unsplash.com/photo-1543429776-2782fc8e1acd?q=85&w=1200&auto=format&fit=crop',
        duration: '1 hour'
      },
      {
        id: 'spanish-steps',
        name: 'Spanish Steps',
        category: 'Historic Piazza',
        description: 'Monumental stairway of 135 steps climbing a steep slope between the Piazza di Spagna and Trinità dei Monti.',
        image: 'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?q=85&w=1200&auto=format&fit=crop',
        duration: '1 hour'
      },
      {
        id: 'roman-forum-palatine',
        name: 'Roman Forum & Palatine Hill',
        category: 'Archaeological Park',
        description: 'The ancient political and commercial heart of the Roman Empire amidst soaring stone columns and ruins.',
        image: 'https://images.unsplash.com/photo-1588614959060-4d144f28b207?q=85&w=1200&auto=format&fit=crop',
        duration: '2 hours'
      }
    ]
  },
  {
    id: 'barcelona-spain',
    name: 'Barcelona',
    country: 'Spain',
    region: 'Europe',
    description: 'The cosmopolitan capital of Spain’s Catalonia region, defined by Antoni Gaudí’s surreal modernist architecture, seaside promenades, and vibrant tapaseries.',
    image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?q=85&w=1600&auto=format&fit=crop',
    latitude: 41.3879,
    longitude: 2.1699,
    bestTime: 'May - June & September - October',
    currency: 'EUR (€)',
    language: 'Spanish / Catalan',
    tags: ['Europe', 'Beach', 'Architecture', 'Culture', 'Food'],
    places: [
      {
        id: 'sagrada-familia',
        name: 'Basílica de la Sagrada Família',
        category: 'Architectural Wonder',
        description: 'Gaudí’s unfinished masterpiece basilica featuring forest-like stone columns and vibrant stained glass.',
        image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?q=85&w=1200&auto=format&fit=crop',
        duration: '2 hours'
      },
      {
        id: 'park-guell',
        name: 'Park Güell',
        category: 'Gaudí Heritage Park',
        description: 'Whimsical public park system composed of colorful mosaic salamanders and panoramic city views.',
        image: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?q=85&w=1200&auto=format&fit=crop',
        duration: '2 hours'
      },
      {
        id: 'casa-batllo',
        name: 'Casa Batlló',
        category: 'Modernist Masterpiece',
        description: 'A visceral architectural wonder with a dragon-scale roof and skeletal balconies on Passeig de Gràcia.',
        image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?q=85&w=1200&auto=format&fit=crop',
        duration: '1.5 hours'
      },
      {
        id: 'gothic-quarter-barcelona',
        name: 'Gothic Quarter (Barri Gòtic)',
        category: 'Medieval Quarter',
        description: 'Atmospheric labyrinth of narrow cobblestone alleyways, tapas bars, and ancient Roman walls.',
        image: 'https://images.unsplash.com/photo-1511527661048-7fe73d85e9a4?q=85&w=1200&auto=format&fit=crop',
        duration: '2 hours'
      },
      {
        id: 'barceloneta-beach-promenade',
        name: 'Barceloneta Beach',
        category: 'Seaside Promenade',
        description: 'Lively golden sand city beach with seaside chiringuito bars, palm trees, and fresh seafood bistros.',
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=85&w=1200&auto=format&fit=crop',
        duration: '2–3 hours'
      },
      {
        id: 'montjuic-castle-fountain',
        name: 'Montjuïc Hill & Castle',
        category: 'Panoramic Hilltop',
        description: 'Hilltop fortress featuring cable car rides, botanical gardens, and evening panoramic views.',
        image: 'https://images.unsplash.com/photo-1512753360435-329c4535a9a7?q=85&w=1200&auto=format&fit=crop',
        duration: '3 hours'
      }
    ]
  },
  {
    id: 'iceland-reykjavik',
    name: 'Iceland',
    country: 'Iceland',
    region: 'Europe',
    description: 'Nordic island nation defined by dramatic volcanic landscapes, hot geothermal springs, massive glaciers, black sand beaches, and dancing Northern Lights.',
    image: 'https://images.unsplash.com/photo-1504893524553-b855bce32c67?q=85&w=1600&auto=format&fit=crop',
    latitude: 64.1466,
    longitude: -21.9426,
    bestTime: 'Sept - March (Aurora) & June - Aug (Midnight Sun)',
    currency: 'ISK (kr)',
    language: 'Icelandic / English',
    tags: ['Europe', 'Adventure', 'Nature', 'Photography'],
    places: [
      {
        id: 'blue-lagoon',
        name: 'Blue Lagoon Geothermal Spa',
        category: 'Geothermal Spa',
        description: 'Milky-blue mineral-rich geothermal spa surrounded by black volcanic basalt rocks and silica masks.',
        image: 'https://images.unsplash.com/photo-1529963183134-61a90db47eaf?q=85&w=1200&auto=format&fit=crop',
        duration: '3 hours'
      },
      {
        id: 'gullfoss-golden-waterfall',
        name: 'Gullfoss (Golden Falls)',
        category: 'Iconic Waterfall',
        description: 'Thunderous two-tiered glacial waterfall plunging deep into a rugged canyon along the Golden Circle.',
        image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=85&w=1200&auto=format&fit=crop',
        duration: '1.5 hours'
      },
      {
        id: 'reynisfjara-black-beach',
        name: 'Reynisfjara Black Sand Beach',
        category: 'Volcanic Beach',
        description: 'Dramatic black volcanic sand beach famous for towering basalt sea stacks and roaring Atlantic waves.',
        image: 'https://images.unsplash.com/photo-1508873696983-2df5293cb32f?q=85&w=1200&auto=format&fit=crop',
        duration: '2 hours'
      },
      {
        id: 'jokulsarlon-diamond-beach',
        name: 'Jökulsárlón Glacier & Diamond Beach',
        category: 'Glacial Lagoon',
        description: 'Luminous blue icebergs drifting from Vatnajökull glacier onto a glittering black volcanic shore.',
        image: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?q=85&w=1200&auto=format&fit=crop',
        duration: 'Half Day'
      },
      {
        id: 'strokkur-geysir-valley',
        name: 'Strokkur Geysir & Geothermal Valley',
        category: 'Active Geothermal Field',
        description: 'Famous bubbling geothermal area where Strokkur geysir erupts boiling water up to 30 meters high every 6–10 minutes.',
        image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=85&w=1200&auto=format&fit=crop',
        duration: '1.5 hours'
      },
      {
        id: 'skogafoss-waterfall',
        name: 'Skógafoss Waterfall',
        category: 'Majestic Waterfall',
        description: 'Breathtaking 60-meter-high curtain waterfall frequently generating single and double rainbows.',
        image: 'https://images.unsplash.com/photo-1476610182048-b716b8518aae?q=85&w=1200&auto=format&fit=crop',
        duration: '1.5 hours'
      }
    ]
  }
];

export const REGIONS = ['All', 'Asia', 'Europe', 'Americas'];
export const TRAVEL_TYPES = ['All Types', 'Culture', 'Beach', 'Adventure', 'Luxury', 'Nature', 'Modern', 'History'];
