export const DESTINATIONS = [
  {
    id: 'switzerland-alps',
    name: 'Switzerland',
    country: 'Switzerland',
    region: 'Europe',
    description: 'A mountainous Central European nation, home to numerous lakes, alpine villages, and the towering peaks of the Alps. Famous for luxury ski resorts, world-class train journeys, emerald lakes, and lush valleys.',
    image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=1600&auto=format&fit=crop',
    latitude: 46.8182,
    longitude: 8.2275,
    bestTime: 'June - September (Hiking) & Dec - March (Skiing)',
    currency: 'CHF (Fr)',
    language: 'German / French / Italian',
    tags: ['Europe', 'Mountain', 'Adventure', 'Nature', 'Relaxation'],
    places: [
      {
        id: 'matterhorn',
        name: 'The Matterhorn, Zermatt',
        category: 'Alpine Peak',
        description: 'The world-famous pyramid-shaped mountain peak towering over the car-free alpine village of Zermatt.',
        image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=800&auto=format&fit=crop',
        duration: 'Half Day',
        highlight: 'Scenic Gornergrat cogwheel train & reflection lake'
      },
      {
        id: 'jungfraujoch',
        name: 'Jungfraujoch – Top of Europe',
        category: 'Glacier & Ice Palace',
        description: 'Europe’s highest railway station at 3,454m offering panoramic views of the Great Aletsch Glacier and an underground ice palace.',
        image: 'https://images.unsplash.com/photo-1527668752968-14dc70a27c95?q=80&w=800&auto=format&fit=crop',
        duration: 'Full Day',
        highlight: 'Sphinx Observatory & year-round snow'
      },
      {
        id: 'lauterbrunnen',
        name: 'Lauterbrunnen Valley',
        category: 'Valley & Waterfalls',
        description: 'A dramatic alpine valley set against monumental rock faces with 72 roaring waterfalls, including the iconic Staubbach Falls.',
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop',
        duration: '3–4 hours',
        highlight: 'Inspiration for Tolkien’s Rivendell'
      },
      {
        id: 'lake-lucerne',
        name: 'Lake Lucerne & Chapel Bridge',
        category: 'Scenic Lake & Old Town',
        description: 'Fjord-like lake surrounded by Mount Pilatus and Mount Rigi, featuring Europe’s oldest covered wooden footbridge from 1333.',
        image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=800&auto=format&fit=crop',
        duration: 'Half Day',
        highlight: 'Historic paddle steamer cruises'
      },
      {
        id: 'interlaken',
        name: 'Interlaken & Harder Kulm',
        category: 'Adventure Hub',
        description: 'Nestled between Lake Thun and Lake Brienz, world-renowned for paragliding, panoramic cable cars, and turquoise waters.',
        image: 'https://images.unsplash.com/photo-1491555103944-7c647fd857e6?q=80&w=800&auto=format&fit=crop',
        duration: '2–3 hours',
        highlight: 'Two-lakes glass bridge viewpoint'
      },
      {
        id: 'chillon-castle',
        name: 'Château de Chillon, Montreux',
        category: 'Historic Island Castle',
        description: 'An enchanting medieval fortress perched on a rocky islet on Lake Geneva, surrounded by vineyards and snow-capped peaks.',
        image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=800&auto=format&fit=crop',
        duration: '2 hours',
        highlight: '11th-century underground vaults & chapel'
      }
    ]
  },
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
    currency: 'EUR (€)',
    language: 'French',
    tags: ['Europe', 'Culture', 'Luxury', 'Architecture', 'Food'],
    places: [
      {
        id: 'eiffel-tower',
        name: 'Eiffel Tower',
        category: 'Iconic Landmark',
        description: 'Wrought-iron lattice tower on the Champ de Mars, illuminated by 20,000 sparkling golden lights every evening.',
        image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=800&auto=format&fit=crop',
        duration: '2–3 hours',
        highlight: 'Summit observation deck with Champagne bar'
      },
      {
        id: 'louvre-museum',
        name: 'The Louvre Museum',
        category: 'Art & Culture',
        description: 'World’s largest art museum housing over 35,000 historic masterpieces including the Mona Lisa and Venus de Milo.',
        image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=800&auto=format&fit=crop',
        duration: '3–4 hours',
        highlight: 'Glass pyramid courtyard & grand gallery'
      },
      {
        id: 'palace-versailles',
        name: 'Palace of Versailles',
        category: 'Royal Palace & Gardens',
        description: 'Opulent royal residence of King Louis XIV featuring the Hall of Mirrors, glittering chandeliers, and vast musical fountain gardens.',
        image: 'https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=800&auto=format&fit=crop',
        duration: 'Half Day',
        highlight: 'Hall of Mirrors & Grand Trianon'
      },
      {
        id: 'montmartre',
        name: 'Montmartre & Sacré-Cœur',
        category: 'Historic Arts District',
        description: 'Charming hilltop village known for cobblestone alleys, street portrait painters, and the majestic white basilica with citywide views.',
        image: 'https://images.unsplash.com/photo-1522093007474-d86e9bf7ba6f?q=80&w=800&auto=format&fit=crop',
        duration: '2–3 hours',
        highlight: 'Panoramic sunset view from church steps'
      },
      {
        id: 'notre-dame',
        name: 'Notre-Dame & Île de la Cité',
        category: 'Gothic Cathedral',
        description: 'Masterpiece of French Gothic architecture sitting in the heart of the Seine River with gargoyles and flying buttresses.',
        image: 'https://images.unsplash.com/photo-1478860409698-8707f313ee8b?q=80&w=800&auto=format&fit=crop',
        duration: '1.5 hours',
        highlight: 'Medieval stained glass rose windows'
      },
      {
        id: 'arc-triomphe',
        name: 'Arc de Triomphe & Champs-Élysées',
        category: 'Historic Monument',
        description: 'Triumphal arch honoring those who fought for France, standing at the western apex of the legendary Champs-Élysées.',
        image: 'https://images.unsplash.com/photo-1509299349698-dd22323b5963?q=80&w=800&auto=format&fit=crop',
        duration: '1 hour',
        highlight: 'Rooftop terrace overlooking 12 radiant avenues'
      }
    ]
  },
  {
    id: 'tokyo-japan',
    name: 'Tokyo',
    country: 'Japan',
    region: 'Asia',
    description: 'Japan’s bustling capital, mixing ultra-modern neon skyscrapers with historic Shinto shrines, tranquil moss gardens, and world-renowned culinary innovation.',
    image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=1600&auto=format&fit=crop',
    latitude: 35.6762,
    longitude: 139.6503,
    bestTime: 'March - May (Cherry Blossoms) & Sept - Nov',
    currency: 'JPY (¥)',
    language: 'Japanese',
    tags: ['Asia', 'Modern', 'Food', 'Culture', 'Shopping'],
    places: [
      {
        id: 'sensoji',
        name: 'Senso-ji Temple, Asakusa',
        category: 'Historic Shrine',
        description: 'Tokyo’s oldest Buddhist temple founded in 645 AD, entered through the iconic Kaminarimon gate with its giant red paper lantern.',
        image: 'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?q=80&w=800&auto=format&fit=crop',
        duration: '1.5–2 hours',
        highlight: 'Nakamise-dori traditional souvenir street'
      },
      {
        id: 'shibuya-scramble',
        name: 'Shibuya Scramble Crossing',
        category: 'Modern Landmark',
        description: 'The world’s busiest pedestrian crossing where up to 3,000 people cross simultaneously beneath massive glowing billboard towers.',
        image: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=80&w=800&auto=format&fit=crop',
        duration: '1 hour',
        highlight: 'Shibuya Sky rooftop 360-degree glass deck'
      },
      {
        id: 'mount-fuji',
        name: 'Mount Fuji & Lake Kawaguchiko',
        category: 'Volcanic Mountain & Lakes',
        description: 'Japan’s sacred 3,776m volcanic peak reflecting in the serene waters of Lake Kawaguchiko, framed by cherry blossoms and pagoda temples.',
        image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=800&auto=format&fit=crop',
        duration: 'Full Day',
        highlight: 'Chureito Pagoda postcard viewpoint'
      },
      {
        id: 'meiji-shrine',
        name: 'Meiji Jingu Shrine & Harajuku',
        category: 'Sacred Forest & Culture',
        description: 'Tranquil Shinto shrine enveloped by 170 acres of evergreen sacred forest, steps away from vibrant Takeshita fashion street.',
        image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=800&auto=format&fit=crop',
        duration: '2 hours',
        highlight: 'Torii gate of 1,500-year-old Japanese cypress'
      },
      {
        id: 'teamlab-planets',
        name: 'teamLab Planets Tokyo',
        category: 'Digital Art Museum',
        description: 'Immersive digital art museum where visitors walk barefoot through crystal universes, floating orchid gardens, and mirror water pools.',
        image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop',
        duration: '2 hours',
        highlight: 'Floating Flower Garden with live orchids'
      },
      {
        id: 'akihabara',
        name: 'Akihabara Electric Town',
        category: 'Tech & Gaming Hub',
        description: 'The world capital of otaku culture, retro gaming emporiums, multi-story electronics department stores, and anime shops.',
        image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=800&auto=format&fit=crop',
        duration: '2–3 hours',
        highlight: 'Retro arcade game centres & themed cafes'
      }
    ]
  },
  {
    id: 'bali-indonesia',
    name: 'Bali',
    country: 'Indonesia',
    region: 'Asia',
    description: 'An Indonesian tropical island known for its forested volcanic mountains, iconic terraced rice paddies, pristine beaches, coral reefs, and cliffside ocean temples.',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1600&auto=format&fit=crop',
    latitude: -8.4095,
    longitude: 115.1889,
    bestTime: 'April - October (Dry season)',
    currency: 'IDR (Rp)',
    language: 'Indonesian / Balinese',
    tags: ['Asia', 'Beach', 'Adventure', 'Relaxation', 'Nature'],
    places: [
      {
        id: 'uluwatu-temple',
        name: 'Uluwatu Cliff Temple',
        category: 'Cliffside Hindu Shrine',
        description: 'Magnificent sea temple perched atop a sheer 70-meter limestone cliff above crashing Indian Ocean waves.',
        image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=800&auto=format&fit=crop',
        duration: '2–3 hours',
        highlight: 'Sunset Kecak fire dance performance'
      },
      {
        id: 'tegallalang',
        name: 'Tegallalang Rice Terraces, Ubud',
        category: 'Lush Agriculture & Valley',
        description: 'Vibrant emerald terraced paddy fields carved into hillsides following ancient Balinese Subak irrigation systems.',
        image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?q=80&w=800&auto=format&fit=crop',
        duration: '2 hours',
        highlight: 'Jungle valley swings & organic cafes'
      },
      {
        id: 'tanah-lot',
        name: 'Tanah Lot Ocean Temple',
        category: 'Offshore Sea Rock Temple',
        description: 'Ancient Hindu pilgrimage temple perched on an offshore wave-cut rock island, surrounded by foaming tidal water at high tide.',
        image: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?q=80&w=800&auto=format&fit=crop',
        duration: '2 hours',
        highlight: 'Famous golden sunset photography silhouette'
      },
      {
        id: 'nusa-penida',
        name: 'Nusa Penida & Kelingking Beach',
        category: 'Islands & Dramatic Cliffs',
        description: 'Unspoiled island sanctuary famous for the T-Rex shaped cliff towering over turquoise waters and white sand coves.',
        image: 'https://images.unsplash.com/photo-1589793463357-5fb81343546b?q=80&w=800&auto=format&fit=crop',
        duration: 'Full Day',
        highlight: 'Manta ray snorkeling & dramatic coastal cliffs'
      },
      {
        id: 'ubud-monkey-forest',
        name: 'Ubud Sacred Monkey Forest',
        category: 'Nature & Ancient Sanctuary',
        description: 'Enchanted moss-draped forest sanctuary housing 115 species of trees and hundreds of wild Balinese long-tailed macaques.',
        image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=800&auto=format&fit=crop',
        duration: '2 hours',
        highlight: 'Ancient 14th-century temple hidden in Banyan trees'
      },
      {
        id: 'mount-batur',
        name: 'Mount Batur Volcano',
        category: 'Active Volcanic Peak',
        description: 'Active volcano standing 1,717m high, offering thrilling pre-dawn trekking to witness a sea-of-clouds sunrise.',
        image: 'https://images.unsplash.com/photo-1512100356356-de1b84283e18?q=80&w=800&auto=format&fit=crop',
        duration: 'Half Day',
        highlight: 'Breakfast cooked over volcanic steam vents'
      }
    ]
  },
  {
    id: 'dubai-uae',
    name: 'Dubai',
    country: 'United Arab Emirates',
    region: 'Asia',
    description: 'A global metropolis in the UAE known for luxury shopping, ultra-modern architecture, artificial palm islands, dune safaris, and futuristic landmarks.',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1600&auto=format&fit=crop',
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
        description: 'The world’s tallest building at 828 meters, featuring sky-high observation decks with 360-degree views of the Persian Gulf and desert.',
        image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=800&auto=format&fit=crop',
        duration: '2–3 hours',
        highlight: 'Level 148 At the Top SKY lounge'
      },
      {
        id: 'palm-jumeirah',
        name: 'Palm Jumeirah & Atlantis',
        category: 'Man-Made Palm Island',
        description: 'The world’s largest man-made palm archipelago, home to luxurious resorts, beach clubs, and the Aquaventure Waterpark.',
        image: 'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?q=80&w=800&auto=format&fit=crop',
        duration: 'Half Day',
        highlight: 'The View at the Palm 240m glass deck'
      },
      {
        id: 'dubai-fountain',
        name: 'The Dubai Fountain & Mall',
        category: 'Choreographed Spectacle',
        description: 'World’s largest choreographed dancing fountain system shooting water up to 150 meters, set in the shadow of Burj Khalifa.',
        image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?q=80&w=800&auto=format&fit=crop',
        duration: '1.5 hours',
        highlight: 'Nightly illuminations with world music'
      },
      {
        id: 'desert-safari',
        name: 'Arabian Desert Safari & Dunes',
        category: 'Desert Adventure',
        description: 'Thrilling 4x4 dune bashing across golden red dunes, sandboarding, camel rides, and traditional Bedouin camp dinners under the stars.',
        image: 'https://images.unsplash.com/photo-1451337516015-6b6e9a44a8a3?q=80&w=800&auto=format&fit=crop',
        duration: 'Half Day',
        highlight: 'Sunset over endless rolling desert dunes'
      },
      {
        id: 'museum-of-future',
        name: 'Museum of the Future',
        category: 'Futuristic Architecture',
        description: 'An architectural and engineering marvel shaped like an asymmetrical toroid engraved with Arabic calligraphy of royal poetry.',
        image: 'https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?q=80&w=800&auto=format&fit=crop',
        duration: '2 hours',
        highlight: 'Immersive journey into year 2071 space innovations'
      },
      {
        id: 'dubai-miracle-garden',
        name: 'Dubai Miracle Garden',
        category: 'Floral Sanctuary',
        description: 'World’s largest natural flower garden featuring over 150 million blooming flowers arranged in surreal castles, arches, and planes.',
        image: 'https://images.unsplash.com/photo-1580674285054-4752228892e0?q=80&w=800&auto=format&fit=crop',
        duration: '2 hours',
        highlight: 'Full-size Emirates A380 airplane covered in petunias'
      }
    ]
  },
  {
    id: 'rome-italy',
    name: 'Rome',
    country: 'Italy',
    region: 'Europe',
    description: 'Rome, Italy’s capital, is a sprawling, open-air museum city with nearly 3,000 years of globally influential art, architecture, and ancient classical history.',
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=1600&auto=format&fit=crop',
    latitude: 41.9028,
    longitude: 12.4964,
    bestTime: 'April - May & September - October',
    currency: 'EUR (€)',
    language: 'Italian',
    tags: ['Europe', 'History', 'Culture', 'Food', 'Architecture'],
    places: [
      {
        id: 'colosseum',
        name: 'The Colosseum & Forum',
        category: 'Ancient Amphitheater',
        description: 'Massive stone amphitheater commissioned in AD 72, the epicenter of Roman gladiatorial games, wild beast hunts, and imperial power.',
        image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=800&auto=format&fit=crop',
        duration: '2.5 hours',
        highlight: 'Underground hypogeum arena floor access'
      },
      {
        id: 'vatican-museums',
        name: 'Vatican Museums & Sistine Chapel',
        category: 'Papal Art & Holy See',
        description: 'Enormous treasury of classical sculptures and Renaissance masterpieces, crowned by Michelangelo’s world-renowned Sistine Chapel ceiling.',
        image: 'https://images.unsplash.com/photo-1531572753322-ad063cecc140?q=80&w=800&auto=format&fit=crop',
        duration: '3–4 hours',
        highlight: 'Michelangelo’s Last Judgment & St. Peter’s Basilica'
      },
      {
        id: 'trevi-fountain',
        name: 'Trevi Fountain',
        category: 'Baroque Masterpiece',
        description: 'Rome’s grandest Baroque fountain depicting Oceanus on his shell chariot, famous for the coin-tossing legend guaranteeing a return to Rome.',
        image: 'https://images.unsplash.com/photo-1525874684015-58379d421a52?q=80&w=800&auto=format&fit=crop',
        duration: '1 hour',
        highlight: 'Illuminated evening fountain ambiance'
      },
      {
        id: 'pantheon',
        name: 'The Pantheon',
        category: 'Ancient Roman Temple',
        description: '2,000-year-old temple boasting the world’s largest unreinforced concrete dome with a central oculus open to the sky.',
        image: 'https://images.unsplash.com/photo-1543429776-2782fc8e1acd?q=80&w=800&auto=format&fit=crop',
        duration: '1 hour',
        highlight: 'Tomb of the Renaissance master Raphael'
      },
      {
        id: 'piazza-navona',
        name: 'Piazza Navona & Fountains',
        category: 'Baroque Square',
        description: 'Vibrant square built on the 1st-century Stadium of Domitian, featuring Bernini’s Fountain of the Four Rivers and lively street bistros.',
        image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=800&auto=format&fit=crop',
        duration: '1.5 hours',
        highlight: 'Artisanal gelato & street artists'
      },
      {
        id: 'spanish-steps',
        name: 'Spanish Steps & Trastevere',
        category: 'Historic Steps & Bohemian Quarter',
        description: 'Monumental 135-step stairway connecting Piazza di Spagna to Trinità dei Monti church, leading into romantic Trastevere cobblestone lanes.',
        image: 'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?q=80&w=800&auto=format&fit=crop',
        duration: '2 hours',
        highlight: 'Authentic carbonara dining in Trastevere'
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
    currency: 'EUR (€)',
    language: 'Spanish / Catalan',
    tags: ['Europe', 'Beach', 'Architecture', 'Culture', 'Food'],
    places: [
      {
        id: 'sagrada-familia',
        name: 'Basílica de la Sagrada Família',
        category: 'Architectural Wonder',
        description: 'Antoni Gaudí’s unfinished masterpiece basilica featuring tree-like stone pillars, stained glass rainbows, and soaring sculpted spires.',
        image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?q=80&w=800&auto=format&fit=crop',
        duration: '2.5 hours',
        highlight: 'Nativity and Passion towers city views'
      },
      {
        id: 'park-guell',
        name: 'Park Güell',
        category: 'Mosaic Park & Gardens',
        description: 'Whimsical public park system of colorful mosaic benches, gingerbread gatehouses, and the famous ceramic salamander dragon.',
        image: 'https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?q=80&w=800&auto=format&fit=crop',
        duration: '2 hours',
        highlight: 'Panoramic Mediterranean sea overlook'
      },
      {
        id: 'casa-batllo',
        name: 'Casa Batlló & Casa Milà',
        category: 'Modernist Masterpiece',
        description: 'Gaudí’s dragon-roofed architectural jewel on Passeig de Gràcia, inspired by marine life and organic fluid curves.',
        image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=800&auto=format&fit=crop',
        duration: '1.5 hours',
        highlight: 'Sculpted chimney rooftop terrace'
      },
      {
        id: 'gothic-quarter',
        name: 'Gothic Quarter (Barri Gòtic)',
        category: 'Medieval Quarter',
        description: 'Labyrinth of narrow medieval cobblestone passages, hidden courtyards, Roman ruins, and cozy candlelit tapas bodegas.',
        image: 'https://images.unsplash.com/photo-1511527661048-7fe73d85e9a4?q=80&w=800&auto=format&fit=crop',
        duration: '2–3 hours',
        highlight: 'Pont del Bisbe marble bridge'
      },
      {
        id: 'barceloneta',
        name: 'Barceloneta Beach & Harbor',
        category: 'Seaside Promenade',
        description: 'Golden sand Mediterranean city beach lined with seafood chiringuitos, palm trees, and the iconic sail-shaped W Hotel.',
        image: 'https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?q=80&w=800&auto=format&fit=crop',
        duration: '2 hours',
        highlight: 'Fresh paella by the marina'
      },
      {
        id: 'montjuic',
        name: 'Montjuïc Hill & Magic Fountain',
        category: 'Scenic Hilltop & Castle',
        description: 'Prominent hill overlooking Barcelona harbor, featuring the National Art Museum of Catalonia (MNAC) and Olympic park.',
        image: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?q=80&w=800&auto=format&fit=crop',
        duration: 'Half Day',
        highlight: 'Cable car ride across the port'
      }
    ]
  },
  {
    id: 'iceland-reykjavik',
    name: 'Iceland',
    country: 'Iceland',
    region: 'Europe',
    description: 'Nordic island nation defined by dramatic volcanic landscapes, steaming geothermal springs, massive blue glaciers, black sand beaches, and dancing Northern Lights.',
    image: 'https://images.unsplash.com/photo-1504893524553-b855bce32c67?q=80&w=1600&auto=format&fit=crop',
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
        category: 'Geothermal Mineral Spa',
        description: 'Milky-blue silica and mineral-rich warm geothermal water surrounded by volcanic black lava fields on the Reykjanes Peninsula.',
        image: 'https://images.unsplash.com/photo-1504893524553-b855bce32c67?q=80&w=800&auto=format&fit=crop',
        duration: '3 hours',
        highlight: 'Silica mud masks & swim-up bar'
      },
      {
        id: 'gullfoss',
        name: 'Gullfoss Golden Waterfall',
        category: 'Glacial Canyon Waterfall',
        description: 'Mighty two-tiered roaring waterfall plunging 32 meters into the rugged Hvítá river canyon on the famous Golden Circle route.',
        image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=800&auto=format&fit=crop',
        duration: '1.5 hours',
        highlight: 'Rainbows formed in the roaring glacial mist'
      },
      {
        id: 'reynisfjara',
        name: 'Reynisfjara Black Sand Beach',
        category: 'Volcanic Coastline & Basalt',
        description: 'World-famous black volcanic sand beach flanked by dramatic geometric basalt column sea stacks and crashing North Atlantic breakers.',
        image: 'https://images.unsplash.com/photo-1529963183134-61a90db47eaf?q=80&w=800&auto=format&fit=crop',
        duration: '2 hours',
        highlight: 'Reynisdrangar sea stacks & Hálsanefshellir cave'
      },
      {
        id: 'jokulsarlon',
        name: 'Jökulsárlón Glacier Lagoon',
        category: 'Glacial Lagoon & Icebergs',
        description: 'Surreal lagoon filled with massive glowing blue icebergs calved from Breiðamerkurjökull glacier drifting out to Diamond Beach.',
        image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=800&auto=format&fit=crop',
        duration: 'Half Day',
        highlight: 'Amphibian boat tours among floating icebergs'
      },
      {
        id: 'skogafoss',
        name: 'Skógafoss Mighty Waterfall',
        category: 'Dramatic Waterfall',
        description: 'A 60-meter-tall curtain of roaring water you can walk directly up to, creating vivid single and double rainbows on sunny days.',
        image: 'https://images.unsplash.com/photo-1476610182048-b716b8518aae?q=80&w=800&auto=format&fit=crop',
        duration: '1.5 hours',
        highlight: '527-step staircase to clifftop observation deck'
      },
      {
        id: 'northern-lights',
        name: 'Thingvellir National Park & Aurora',
        category: 'UNESCO Rift Valley & Aurora',
        description: 'Continental rift valley where the North American and Eurasian tectonic plates drift apart, prime for watching the Aurora Borealis.',
        image: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?q=80&w=800&auto=format&fit=crop',
        duration: '3 hours',
        highlight: 'Silfra fissure crystal-clear snorkeling'
      }
    ]
  }
];

export const REGIONS = ['All', 'Asia', 'Europe', 'Americas'];
export const TRAVEL_TYPES = ['All Types', 'Culture', 'Beach', 'Adventure', 'Luxury', 'Nature', 'Modern', 'History'];
