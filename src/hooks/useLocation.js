import { useState } from 'react';
import { Geolocation } from '@capacitor/geolocation';
import { getCurrentCityLocation } from '../services/location';

export function useLocation(initialLocation = { city: 'Bengaluru', country: 'India', formattedName: 'Bengaluru, India', lat: 12.9716, lon: 77.5946 }) {
  const [location, setLocation] = useState(initialLocation);
  const [permissionState, setPermissionState] = useState('prompt'); // 'prompt' | 'granted' | 'denied'
  const [isLocating, setIsLocating] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const requestLocation = async () => {
    setIsLocating(true);
    setErrorMessage(null);

    try {
      // 1. Try Capacitor Native Geolocation plugin
      const permissions = await Geolocation.requestPermissions();
      if (permissions.location === 'granted' || permissions.coarseLocation === 'granted') {
        const position = await Geolocation.getCurrentPosition();
        const { latitude, longitude } = position.coords;
        const locInfo = await getCurrentCityLocation(latitude, longitude);
        setLocation(locInfo);
        setPermissionState('granted');
        setIsLocating(false);
        return;
      }
    } catch (e) {
      console.log('Capacitor native geolocation fallback to browser web geolocation:', e);
    }

    // 2. Browser Geolocation fallback
    if (!navigator.geolocation) {
      setPermissionState('denied');
      setErrorMessage("Location access wasn't granted. No problem — search for a location instead.");
      setIsLocating(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        const locInfo = await getCurrentCityLocation(latitude, longitude);
        setLocation(locInfo);
        setPermissionState('granted');
        setIsLocating(false);
      },
      (err) => {
        setIsLocating(false);
        setPermissionState('denied');
        setErrorMessage("Location access wasn't granted. No problem — search for a location instead.");
      },
      { timeout: 10000 }
    );
  };

  const setManualLocation = (newLoc) => {
    setLocation(newLoc);
    setErrorMessage(null);
  };

  return { location, permissionState, isLocating, errorMessage, requestLocation, setManualLocation };
}
