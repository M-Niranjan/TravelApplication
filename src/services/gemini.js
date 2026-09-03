// Official Google Gemini API Integration using the Gemini REST API

/**
 * Ask Google Gemini Travel Assistant with destination context & multi-turn history
 */
export async function askTravelAI({
  destination = null,
  conversation = [],
  question,
  apiKey = ''
}) {
  const activeKey = apiKey || import.meta.env.VITE_GEMINI_API_KEY || '';

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
  const systemInstruction = `You are an intelligent, helpful, and inspiring AI Travel Assistant for Aetheria Travel.

The user is currently exploring:
${destInfo}

Answer travel questions specifically for this destination.
Help the user with:
- how long to stay and recommended trip duration
- must-see attractions, famous landmarks, and hidden gems
- best time of year to visit (weather, seasons, crowds)
- signature local dishes, culinary markets, and dining tips
- family-friendliness and accessibility
- packing essentials and practical travel advice

Guidelines:
- Provide concise, practical, and well-structured answers.
- Use bullet points and short paragraphs suitable for mobile screens.
- Do not invent exact live weather, prices, or ticket availability.
- When recommending places, prioritize the destination currently being viewed.`;

  // 3. Construct history for Gemini multi-turn chat
  const recentHistory = (conversation || [])
    .slice(-6)
    .filter((msg) => msg.text && msg.text.trim())
    .map((msg) => ({
      role: msg.sender === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }]
    }));

  // 4. Call Official Google Gemini SDK
  if (activeKey) {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=${encodeURIComponent(activeKey)}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            systemInstruction: { parts: [{ text: systemInstruction }] },
            contents: [
              ...recentHistory.map((message) => ({
                role: message.role,
                parts: message.parts
              })),
              { role: 'user', parts: [{ text: question }] }
            ]
          })
        }
      );

      if (!response.ok) {
        throw new Error(`Gemini request failed with HTTP ${response.status}`);
      }

      const data = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (text && text.trim()) return text.trim();
    } catch (e) {
      console.warn('Google Gemini SDK call warning, using fallback:', e.message);
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
  const activeKey = apiKey || import.meta.env.VITE_GEMINI_API_KEY || '';
  const { destination, days = 3, style = 'Culture', budget = 'Mid-range', interests = [] } = config;

  const systemPrompt = `You are an expert travel planner. Generate a structured JSON travel itinerary for ${destination.name}, ${destination.country} for ${days} days.
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
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=${encodeURIComponent(activeKey)}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: systemPrompt }] }],
            generationConfig: { responseMimeType: 'application/json' }
          })
        }
      );

      if (!response.ok) {
        throw new Error(`Gemini itinerary request failed with HTTP ${response.status}`);
      }

      const data = await response.json();
      const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (rawText) {
        const cleanedText = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
        return JSON.parse(cleanedText);
      }
    } catch (e) {
      console.warn('Google Gemini Itinerary request warning, using fallback:', e.message);
    }
  }

  // Structured Fallback Itinerary
  return generateFallbackItineraryJSON(destination, days, style);
}

function generateFallbackAnswer(prompt, dest) {
  const query = prompt.toLowerCase();
  const name = dest ? dest.name : 'this destination';
  const country = dest ? dest.country : 'the region';

  if (query.includes('how many days') || query.includes('how long') || query.includes('duration') || query.includes('days should i stay')) {
    return `For **${name}**, we recommend spending **${dest ? dest.duration || '3 to 5 days' : '3 to 5 days'}**.\n\n• **Day 1–2:** Explore iconic landmarks and historic neighborhoods.\n• **Day 3–4:** Immerse in local food markets, museums, and cultural sites.\n• **Day 5:** Take a relaxed scenic excursion or day trip into the surrounding countryside.`;
  }
  if (query.includes('best time') || query.includes('when to visit') || query.includes('when should i visit') || query.includes('season')) {
    return `The ideal time to visit **${name}, ${country}** is during **${dest ? dest.bestTime || 'Spring or Autumn' : 'Spring or Autumn'}**.\n\n• Weather is comfortable with mild temperatures.\n• Major attractions have manageable queues compared to peak summer.\n• Beautiful seasonal scenery for sightseeing and photography.`;
  }
  if (query.includes('what should i see') || query.includes('must see') || query.includes('places') || query.includes('attractions')) {
    const placesList = dest?.places?.map((p) => `• **${p.name}:** ${p.description}`).join('\n') || `• Historic City Center\n• Scenic Waterfront\n• Cultural Museums`;
    return `Top must-see attractions in **${name}**:\n\n${placesList}\n\n*Tip: Start early in the morning to beat the crowds at popular landmarks.*`;
  }
  if (query.includes('food') || query.includes('eat') || query.includes('drink') || query.includes('cuisine')) {
    return `Signature food and dining experiences in **${name}**:\n\n• Sample traditional regional specialties at local bistros.\n• Visit vibrant morning food markets for fresh pastries and artisanal snacks.\n• Explore authentic family-run eateries off the main tourist streets.`;
  }
  if (query.includes('family') || query.includes('kids') || query.includes('children')) {
    return `**${name}** is very welcoming for families!\n\n• Most central areas are walkable and stroller-friendly.\n• Parks, interactive museums, and boat tours are great for all ages.\n• Family-friendly restaurants with diverse menu options are readily available.`;
  }
  if (query.includes('pack') || query.includes('wear') || query.includes('luggage')) {
    return `Packing essentials for **${name}**:\n\n• Comfortable walking shoes (essential for cobblestone and walking tours).\n• Versatile layered clothing for changing weather.\n• Universal power adapter, portable charger, and lightweight daypack.\n• Sun protection (sunglasses, hat, sunscreen).`;
  }

  return `**${name}, ${country}** is an extraordinary destination! Explore the city center on foot, sample local regional cuisine at neighborhood bistros, and take an early morning walking tour of key historic landmarks for the best travel experience.`;
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
