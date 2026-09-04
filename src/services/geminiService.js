// Groq AI service for conversational assistance and visual itinerary generation.

/**
 * Ask Google Gemini API a travel question
 */
export async function askGeminiAssistant({ prompt, destinationContext = null, apiKey = '' }) {
  const activeKey = apiKey || import.meta.env.VITE_GROQ_API_KEY || '';

  if (activeKey) {
    try {
      const contextPrompt = destinationContext 
        ? `You are an expert travel guide for ${destinationContext.name}, ${destinationContext.country}. 
           User Question: "${prompt}". 
           Write in warm, human-readable English with travel emojis (✨, 🗺️, 📍, 🥐, ☀️, 💡, 🧳). Do NOT use raw markdown asterisks (**) or hashes (#).`
        : `You are Voyager AI, an elite personal travel concierge. 
           User Question: "${prompt}". 
           Write expert travel insights with friendly travel emojis. Do NOT use raw markdown asterisks (**) or hashes (#).`;

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
            messages: [{ role: 'user', content: contextPrompt }]
          })
        }
      );

      if (response.ok) {
        const data = await response.json();
        const replyText = data.choices?.[0]?.message?.content;
        if (replyText) return replyText;
      } else if (response.status === 401 || response.status === 403) {
        throw new Error('Groq API key is invalid or unauthorized. Check VITE_GROQ_API_KEY.');
      }
    } catch (e) {
      console.warn('Groq API call failed, using intelligent fallback engine:', e);
    }
  }

  // Smart Offline Fallback Assistant Engine
  return generateOfflineSmartResponse(prompt, destinationContext);
}

/**
 * Generate Structured Visual Itinerary using Gemini API
 */
export async function generateAItinerary({ destination, durationDays = 3, style = 'Cultural & Culinary', budget = 'Moderate ($$)', apiKey = '' }) {
  const activeKey = apiKey || import.meta.env.VITE_GROQ_API_KEY || '';

  if (activeKey) {
    try {
      const prompt = `Generate a JSON travel itinerary for ${destination.name}, ${destination.country} for ${durationDays} days.
      Style: ${style}, Budget: ${budget}.
      Respond ONLY with strict JSON without markdown backticks in this exact schema:
      {
        "tripTitle": "${durationDays}-Day Ultimate ${destination.name} Experience",
        "overview": "A brief 2-sentence summary of the trip.",
        "estimatedTotalCost": "$800 - $1200",
        "recommendedTransport": "Public Transit & Taxis",
        "days": [
          {
            "dayNumber": 1,
            "title": "Day 1 Theme Title",
            "morning": { "time": "09:00 AM", "title": "Activity name", "description": "Details", "estimatedCost": "$20", "location": "Spot name" },
            "afternoon": { "time": "01:30 PM", "title": "Activity name", "description": "Details", "estimatedCost": "$35", "location": "Spot name" },
            "evening": { "time": "06:30 PM", "title": "Activity name", "description": "Details", "estimatedCost": "$50", "location": "Spot name" },
            "localTip": "A helpful insider secret for Day 1"
          }
        ]
      }`;

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
            messages: [{ role: 'user', content: prompt }],
            response_format: { type: 'json_object' }
          })
        }
      );

      if (response.ok) {
        const data = await response.json();
        const rawText = data.choices?.[0]?.message?.content;
        if (rawText) {
          const cleanedText = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
          return JSON.parse(cleanedText);
        }
      }
    } catch (e) {
      console.warn('Groq API itinerary generation failed, using intelligent fallback:', e);
    }
  }

  // Fallback visual itinerary generator
  return generateOfflineItinerary(destination, durationDays, style, budget);
}

// Helper: Smart Fallback Conversational Engine with Emojis and No Raw Markdown
function generateOfflineSmartResponse(prompt, dest) {
  const query = prompt.toLowerCase();
  const destName = dest ? dest.name : 'your destination';

  if (query.includes('how long') || query.includes('duration') || query.includes('days')) {
    return `✨ Recommended Duration for ${destName}:\n\nWe recommend spending ${dest ? dest.durationDays : '4 to 6 days'} to truly experience the culture, iconic sights, and local cuisine without rushing.\n\n📍 1-2 Days: Quick highlights & main landmarks.\n🗺️ 3-4 Days: Optimal balance of famous places and neighborhood exploration.\n🌄 5+ Days: Deep dive into surrounding side trips & hidden gems.`;
  }

  if (query.includes('when to go') || query.includes('season') || query.includes('weather') || query.includes('best time')) {
    return `🌤️ Best Time to Visit ${destName}:\n\nThe ideal travel window is ${dest ? dest.bestTimeToVisit : 'Spring (April-May) or Autumn (September-October)'}.\n\n☀️ During these months, you will enjoy mild temperatures, fewer peak tourist crowds, and stunning seasonal natural backdrops!`;
  }

  if (query.includes('what to see') || query.includes('attraction') || query.includes('famous') || query.includes('must visit')) {
    const placesList = dest?.famousPlaces ? dest.famousPlaces.map(p => `🏛️ ${p.name}: ${p.description}`).join('\n') : '🏛️ Historic Old Town & Central Square\n🍓 Local Food Markets\n🌅 Panoramic Sunset Viewpoints';
    return `✨ Top Must-See Places in ${destName}:\n\n${placesList}\n\n💡 Pro-Tip: Visit early in the morning to beat the crowds and capture ideal golden-hour lighting!`;
  }

  if (query.includes('cost') || query.includes('budget') || query.includes('currency') || query.includes('expensive')) {
    return `💰 Budget & Currency Insights for ${destName}:\n\n💵 Currency: ${dest ? dest.currency : 'Local Currency'}\n📊 Budget Category: ${dest ? dest.budgetRange : 'Moderate ($$)'}\n💳 Daily Estimate: $90 - $180 / day depending on travel style.\n💡 Payment Tip: Credit cards are widely accepted in main venues, but carry small cash notes for street food stalls and local markets!`;
  }

  return `✈️ Travel Tips for ${destName}:\n\n${destName} is a phenomenal destination! Here are 3 key tips:\n\n🚆 1. Local Transit: Use the high-speed rail or metro for fast, reliable travel.\n🥐 2. Culinary Highlight: Be sure to sample regional authentic dishes in local neighborhood eateries.\n💬 3. Local Etiquette: ${dest ? `Remember that the native language is ${dest.language}, so learning basic greetings like 'Hello' and 'Thank you' is warmly appreciated!` : 'A polite greeting goes a long way with local shopkeepers!'}`;
}

// Helper: Smart Fallback Visual Itinerary Generator
function generateOfflineItinerary(dest, durationDays, style, budget) {
  const daysArray = [];

  for (let i = 1; i <= durationDays; i++) {
    const place1 = dest.famousPlaces?.[(i - 1) % (dest.famousPlaces?.length || 1)] || { name: 'Historic City Center', description: 'Explore ancient architecture and local streets.', approxCost: '$15' };
    const place2 = dest.famousPlaces?.[i % (dest.famousPlaces?.length || 1)] || { name: 'Scenic Viewpoint & Gardens', description: 'Take panoramic photos and enjoy afternoon tea.', approxCost: '$20' };

    daysArray.push({
      dayNumber: i,
      title: i === 1 ? `Arrival & Classic ${dest.name} Highlights` : i === 2 ? `Cultural Immersion & Hidden Secrets` : `Scenic Exploration & Sunset Farewell`,
      morning: {
        time: '09:00 AM',
        title: place1.name,
        description: place1.description,
        estimatedCost: place1.approxCost,
        location: `${place1.name}, ${dest.name}`
      },
      afternoon: {
        time: '01:30 PM',
        title: `Authentic ${dest.name} Culinary & Walking Tour`,
        description: `Stroll through vibrant neighborhood lanes, visiting top-rated local cafes and sampling traditional street food delicacies.`,
        estimatedCost: '$25 - $40',
        location: `Central ${dest.name}`
      },
      evening: {
        time: '06:30 PM',
        title: place2.name,
        description: place2.description,
        estimatedCost: place2.approxCost,
        location: `${place2.name}, ${dest.name}`
      },
      localTip: i === 1 ? 'Book tickets online in advance to skip long entrance queues.' : 'Pack comfortable walking shoes for cobblestone streets.'
    });
  }

  return {
    tripTitle: `${durationDays}-Day Ultimate ${dest.name} Itinerary`,
    overview: `Experience the best of ${dest.name} with a carefully curated ${style.toLowerCase()} route tailored for a ${budget.toLowerCase()} budget.`,
    estimatedTotalCost: `$${durationDays * 120} - $${durationDays * 220}`,
    recommendedTransport: 'Metro & Scenic Walking Routes',
    days: daysArray
  };
}
