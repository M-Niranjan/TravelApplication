// Groq API integration using the OpenAI-compatible chat completions API.

/**
 * Ask Voyager AI Travel Assistant with destination context & multi-turn history
 */
export async function askTravelAI({
  destination = null,
  conversation = [],
  question,
  apiKey = ''
}) {
  const activeKey = apiKey || import.meta.env.VITE_GROQ_API_KEY || '';

  // Keep basic conversation responsive even when the remote AI is unavailable.
  const quickReply = getQuickReply(question, destination);
  if (quickReply) return quickReply;

  // 1. Build rich destination context
  const destInfo = destination
    ? `Destination: ${destination.name}
Country: ${destination.country}
Description: ${destination.description || 'A popular travel destination.'}
Best time to visit: ${destination.bestTime || 'Spring or Autumn'}
Duration: ${destination.duration || '3-5 days'}
Famous landmarks: ${destination.places?.map((p) => p.name).join(', ') || 'Iconic local sights'}
Tags: ${destination.tags?.join(', ') || 'Travel, Culture'}`
    : `General global travel guidance.`;

  // 2. Travel-specific system instruction
  const systemInstruction = `You are Voyager AI, an elite, friendly, and inspiring personal travel concierge.

The traveler is currently exploring:
${destInfo}

Answer travel questions specifically for this destination.
Help the user with:
- how long to stay and recommended trip duration
- must-see attractions, famous landmarks, and hidden gems
- best time of year to visit (weather, seasons, crowds)
- signature local dishes, culinary markets, and dining tips
- family-friendliness and accessibility
- packing essentials and practical travel advice

IMPORTANT FORMATTING RULES:
- Write in warm, elegant, natural, human-readable prose enriched with relevant travel emojis (✨, 🗺️, 📍, 🥐, ☀️, 💡, 🧳, 🍷, 🏛️).
- DO NOT output raw markdown symbols like double asterisks (**), hashes (#), or underscores (__).
- Use clear spacing, friendly emoji bullet points (e.g. 📍, ☀️, 🍷, 🧳), and short paragraphs suitable for mobile screens.
- Do not invent exact live prices or ticket availability.`;

  // 3. Construct history for Groq multi-turn chat
  const recentHistory = (conversation || [])
    .slice(-6)
    .filter((msg) => msg.text && msg.text.trim())
    .map((msg) => ({
      role: msg.sender === 'user' ? 'user' : 'assistant',
      content: msg.text
    }));

  // 4. Call Groq
  if (activeKey) {
    try {
      const response = await fetch(
        'https://api.groq.com/openai/v1/chat/completions',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${activeKey}`
          },
          body: JSON.stringify({
            model: 'llama-3.3-70b-versatile',
            messages: [
              { role: 'system', content: systemInstruction },
              ...recentHistory,
              { role: 'user', content: question }
            ]
          })
        }
      );

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          throw new Error('Groq API key is invalid or unauthorized. Check VITE_GROQ_API_KEY.');
        }
        throw new Error(`Groq request failed with HTTP ${response.status}`);
      }

      const data = await response.json();
      const text = data.choices?.[0]?.message?.content;
      if (text && text.trim()) return text.trim();
    } catch (e) {
      if (e.message.includes('Groq API key')) throw e;
      console.warn('Groq call warning, using fallback:', e.message);
    }
  }

  // 5. Intelligent Fallback Answer Engine
  return generateFallbackAnswer(question, destination);
}

// Backward-compatible alias
export async function askGemini(prompt, destination = null, apiKey = '') {
  return askTravelAI({ destination, question: prompt, apiKey });
}

/**
 * Generate Structured Day-by-Day Travel Itinerary using Google Gemini SDK
 */
export async function generateStructuredItinerary(config, apiKey = '') {
  const activeKey = apiKey || import.meta.env.VITE_GROQ_API_KEY || '';
  const { destination, days = 3, style = 'Culture', budget = 'Mid-range', interests = [] } = config;

  const systemPrompt = `You are an expert travel planner for Voyager Luxe. Generate a structured JSON travel itinerary for ${destination.name}, ${destination.country} for ${days} days.
Style: ${style}, Budget: ${budget}, Interests: ${interests.join(', ') || 'Highlights'}.

Return ONLY valid JSON matching this exact structure, without markdown formatting:
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
    try {
      const response = await fetch(
        'https://api.groq.com/openai/v1/chat/completions',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${activeKey}`
          },
          body: JSON.stringify({
            model: 'llama-3.3-70b-versatile',
            messages: [{ role: 'system', content: systemPrompt }],
            response_format: { type: 'json_object' }
          })
        }
      );

      if (!response.ok) {
        throw new Error(`Groq itinerary request failed with HTTP ${response.status}`);
      }

      const data = await response.json();
      const rawText = data.choices?.[0]?.message?.content;
      if (rawText) {
        const cleanedText = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
        return JSON.parse(cleanedText);
      }
    } catch (e) {
      console.warn('Groq itinerary request warning, using fallback:', e.message);
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

function getQuickReply(prompt, dest) {
  const query = prompt.trim().toLowerCase();
  const name = dest ? dest.name : 'your destination';

  if (/^(hi|hello|hey|hiya|good morning|good afternoon|good evening)[!.?, ]*$/.test(query)) {
    return `👋 Hello! I am Voyager AI, your travel concierge. How can I assist you with ${name} today?`;
  }
  if (/^(thanks|thank you|thx)[!.?, ]*$/.test(query)) {
    return `✨ You are very welcome! Let me know if you need any more recommendations for ${name}.`;
  }
  if (/^(bye|goodbye|see you)[!.?, ]*$/.test(query)) {
    return '✈️ Safe travels and have an extraordinary journey ahead!';
  }

  return null;
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
