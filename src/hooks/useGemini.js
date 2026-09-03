import { useState, useCallback } from 'react';
import { askTravelAI, generateStructuredItinerary } from '../services/gemini';

export function useGemini(apiKey = '') {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendMessage = useCallback(async (promptText, destination = null) => {
    if (!promptText || !promptText.trim() || loading) return;

    const userMsg = {
      id: `user_${Date.now()}`,
      sender: 'user',
      text: promptText.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);
    setError(null);

    try {
      // Pass the current conversation history to Gemini
      const responseText = await askTravelAI({
        destination,
        conversation: messages,
        question: promptText.trim(),
        apiKey
      });

      const aiMsg = {
        id: `ai_${Date.now() + 1}`,
        sender: 'ai',
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      setError('Sorry, I could not get a response right now. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [loading, messages, apiKey]);

  const createItinerary = useCallback(async (config) => {
    setLoading(true);
    setError(null);
    try {
      const itineraryJSON = await generateStructuredItinerary(config, apiKey);
      setLoading(false);
      return itineraryJSON;
    } catch (err) {
      setError('Itinerary creation failed. Please try again.');
      setLoading(false);
      return null;
    }
  }, [apiKey]);

  const clearMessages = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);

  return { 
    messages, 
    loading, 
    error, 
    sendMessage, 
    createItinerary, 
    clearMessages 
  };
}
