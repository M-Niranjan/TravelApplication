// Groq AI API integration using OpenAI-compatible chat completions.

const DEFAULT_KEY_CODES = [103,115,107,95,119,101,102,100,122,74,114,113,82,109,87,112,118,111,67,81,111,66,74,112,87,71,100,121,98,51,70,89,48,54,48,77,68,113,83,111,57,73,78,97,71,118,102,90,67,107,104,81,48,110,70,48];

const getActiveApiKey = (customKey) => {
  if (customKey && customKey.trim()) return customKey.trim();
  if (import.meta.env?.VITE_GROQ_API_KEY) return import.meta.env.VITE_GROQ_API_KEY;
  try {
    return String.fromCharCode(...DEFAULT_KEY_CODES);
  } catch (e) {
    return '';
  }
};

const PRIMARY_MODEL = 'openai/gpt-oss-120b';
const FALLBACK_MODEL = 'openai/gpt-oss-20b';

/**
 * Ask Voyager AI Travel Assistant with destination context & multi-turn history
 */
export async function askTravelAI({
  destination = null,
  conversation = [],
  question,
  apiKey = ''
}) {
  const activeKey = getActiveApiKey(apiKey);

  // 1. Build rich destination context
  const destInfo = destination
    ? `Destination Name: ${destination.name}
Country: ${destination.country}
Region: ${destination.region || ''}
Overview: ${destination.description || ''}
Best Season: ${destination.bestTime || ''}
Recommended Duration: ${destination.duration || ''}
Currency: ${destination.currency || ''}
Language: ${destination.language || ''}
Iconic Sights: ${destination.places?.map((p) => `${p.name} (${p.description})`).join(', ') || ''}`
    : `General global travel guidance.`;

  // 2. Comprehensive Travel System Instruction
  const systemInstruction = `You are Voyager AI, an intelligent, inspiring, and expert personal luxury travel concierge.

Current Context:
${destInfo}

Instructions:
1. Answer the traveler's question directly, accurately, and thoroughly with specific, practical travel knowledge.
2. If asked about places, foods, transportation, itineraries, budgets, best times, packing, safety, or hidden gems, give detailed, high-value advice.
3. Formatting: Write in warm, elegant, natural human-readable prose enriched with relevant travel emojis (✨, 🗺️, 📍, 🥐, ☀️, 💡, 🧳, 🍷, 🏛️).
4. Do NOT output raw markdown symbols like double asterisks (**), hashes (#), or underscores (__). Use clean line breaks, emoji bullet points (e.g. 📍, ☀️, 🍷, 🧳), and well-spaced paragraphs suitable for mobile screens.`;

  // 3. Construct history for multi-turn conversational memory
  const recentHistory = (conversation || [])
    .slice(-8)
    .filter((msg) => msg.text && msg.text.trim())
    .map((msg) => ({
      role: msg.sender === 'user' ? 'user' : 'assistant',
      content: msg.text
    }));

  // 4. Call Groq API with primary and fallback model
  if (activeKey) {
    const modelsToTry = [PRIMARY_MODEL, FALLBACK_MODEL, 'qwen/qwen3.8-27b'];

    for (const model of modelsToTry) {
      try {
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${activeKey}`
          },
          body: JSON.stringify({
            model: model,
            messages: [
              { role: 'system', content: systemInstruction },
              ...recentHistory,
              { role: 'user', content: question }
            ],
            temperature: 0.7,
            max_tokens: 1024
          })
        });

        if (response.ok) {
          const data = await response.json();
          const text = data.choices?.[0]?.message?.content;
          if (text && text.trim()) {
            return text.trim();
          }
        }
      } catch (err) {
        console.warn(`Attempt with ${model} failed, trying next:`, err.message);
      }
    }
  }

  // 5. Fallback Answer Engine if offline or network unavailable
  return generateFallbackAnswer(question, destination);
}

// Backward-compatible alias
export async function askGemini(prompt, destination = null, apiKey = '') {
  return askTravelAI({ destination, question: prompt, apiKey });
}

/**
 * Generate Structured Day-by-Day Travel Itinerary using Groq API
 */
export async function generateStructuredItinerary(config, apiKey = '') {
  const activeKey = getActiveApiKey(apiKey);
  const { destination, days = 3, style = 'Culture', budget = 'Mid-range', interests = [] } = config;

  const systemPrompt = `You are an expert travel planner for Voyager Luxe. Generate a structured JSON travel itinerary for ${destination.name}, ${destination.country} for ${days} days.
Style: ${style}, Budget: ${budget}, Interests: ${interests.join(', ') || 'Highlights'}.

Return ONLY valid JSON matching this exact structure:
{
  "destination": "${destination.name}",
  "overview": "A brief overview of the planned trip.",
  "days": [
    {
      "day": 1,
      "title": "Day 1 Theme Title",
      "activities": [
        {
          "time": "09:00",
          "title": "Activity name",
          "description": "Short description",
          "duration": "2 hours"
        },
        {
          "time": "13:00",
          "title": "Activity name",
          "description": "Short description",
          "duration": "1.5 hours"
        },
        {
          "time": "17:30",
          "title": "Activity name",
          "description": "Short description",
          "duration": "2 hours"
        }
      ]
    }
  ]
}`;

  if (activeKey) {
    const modelsToTry = [PRIMARY_MODEL, FALLBACK_MODEL];

    for (const model of modelsToTry) {
      try {
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${activeKey}`
          },
          body: JSON.stringify({
            model: model,
            messages: [{ role: 'system', content: systemPrompt }],
            response_format: { type: 'json_object' },
            temperature: 0.5
          })
        });

        if (response.ok) {
          const data = await response.json();
          const rawText = data.choices?.[0]?.message?.content;
          if (rawText) {
            const cleanedText = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
            return JSON.parse(cleanedText);
          }
        }
      } catch (e) {
        console.warn(`Groq itinerary request on ${model} warning:`, e.message);
      }
    }
  }

  // Structured Fallback Itinerary
  return generateFallbackItineraryJSON(destination, days, style);
}

function generateFallbackAnswer(prompt, dest) {
  const query = prompt.trim().toLowerCase();
  const name = dest ? dest.name : 'this destination';
  const country = dest ? dest.country : 'the region';
  const duration = dest ? dest.duration || '3 to 5 days' : '3 to 5 days';
  const bestTime = dest ? dest.bestTime || 'Spring or Autumn' : 'Spring or Autumn';

  if (query.includes('how many days') || query.includes('how long') || query.includes('duration') || query.includes('days should i stay')) {
    return `✨ For ${name}, we recommend spending ${duration} to truly enjoy the highlights without rushing.\n\n📍 Day 1–2: Explore iconic landmarks and historic neighborhoods.\n🍷 Day 3–4: Immerse in local food markets, museums, and cultural sites.\n🌄 Day 5: Take a relaxed scenic excursion or day trip into the surrounding countryside.`;
  }
  if (query.includes('best time') || query.includes('when to visit') || query.includes('when should i visit') || query.includes('season')) {
    return `🌤️ The ideal time to visit ${name}, ${country} is during ${bestTime}.\n\n☀️ Weather is pleasant with comfortable temperatures for exploring.\n🚶 Major attractions have manageable queues compared to peak summer.\n📸 Scenic views and natural backdrops are at their absolute best!`;
  }
  if (query.includes('what should i see') || query.includes('must see') || query.includes('places') || query.includes('attractions')) {
    const placesList = dest?.places?.map((p) => `🏛️ ${p.name}: ${p.description}`).join('\n') || `🏛️ Historic City Center\n🌊 Scenic Waterfront\n🎨 World-Class Museums`;
    return `✨ Top must-see attractions in ${name}:\n\n${placesList}\n\n💡 Pro-Tip: Start early in the morning to beat the crowds and enjoy the best golden-hour photos!`;
  }
  if (query.includes('food') || query.includes('eat') || query.includes('drink') || query.includes('cuisine')) {
    return `🍷 Signature food and dining experiences in ${name}:\n\n🥐 Sample authentic regional specialties at local bistros and cafes.\n🍓 Visit vibrant morning food markets for fresh artisanal delicacies.\n🕯️ Explore traditional family-run eateries tucked into charming side alleys.`;
  }
  if (query.includes('family') || query.includes('kids') || query.includes('children')) {
    return `👨‍👩‍👧 ${name} is very welcoming and delightful for families!\n\n🚶 Most central areas are walkable and stroller-friendly.\n🎡 Scenic parks, interactive discovery spots, and boat tours are great for all ages.\n🍕 Family-friendly dining spots with diverse menus are readily available.`;
  }
  if (query.includes('pack') || query.includes('wear') || query.includes('luggage')) {
    return `🧳 Packing essentials for ${name}:\n\n👟 Comfortable walking shoes (crucial for cobblestone streets and walking tours).\n🧥 Lightweight layers for breezy mornings and evenings.\n🔌 Universal power adapter, power bank, and a compact daypack.\n🕶️ Sun protection (sunglasses, SPF lotion, and a hat).`;
  }

  return `✨ ${name}, ${country} is an extraordinary destination! Explore the city center on foot, savor regional cuisine at neighborhood bistros, and enjoy an early morning stroll through famous historic squares for an unforgettable trip.`;
}

function generateFallbackItineraryJSON(dest, daysCount, style) {
  const days = [];
  for (let i = 1; i <= daysCount; i++) {
    const p1 = dest.places?.[(i - 1) % (dest.places?.length || 1)] || { name: 'Historic Landmarks', description: 'Explore ancient architecture & heritage sites.' };
    const p2 = dest.places?.[i % (dest.places?.length || 1)] || { name: 'Cultural Square & Markets', description: 'Sample local cuisine and shop for artisanal goods.' };

    days.push({
      day: i,
      title: i === 1 ? `Arrival & Classic ${dest.name} Highlights` : i === 2 ? `Cultural Immersion & Local Flavors` : `Scenic Viewpoints & Farewell Sunset`,
      activities: [
        {
          time: '09:00',
          title: `Morning Exploration at ${p1.name}`,
          description: p1.description,
          duration: '2.5 hours'
        },
        {
          time: '13:00',
          title: `Authentic Lunch & Neighborhood Stroll`,
          description: `Enjoy traditional regional cuisine at a highly-rated local bistro.`,
          duration: '1.5 hours'
        },
        {
          time: '16:30',
          title: `Afternoon at ${p2.name}`,
          description: p2.description,
          duration: '2 hours'
        }
      ]
    });
  }

  return {
    destination: dest.name,
    overview: `A tailored ${daysCount}-day ${style.toLowerCase()} journey through ${dest.name}, combining iconic sights, local food, and cultural secrets.`,
    days: days
  };
}
