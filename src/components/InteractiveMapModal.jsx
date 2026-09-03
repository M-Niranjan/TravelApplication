import React, { useEffect, useRef } from 'react';
import { X, MapPin, Compass } from 'lucide-react';
import L from 'leaflet';

export default function InteractiveMapModal({ isOpen, onClose, destination, highlightPlace = null }) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    if (!isOpen || !destination || !mapContainerRef.current) return;

    // Clean existing map instance if re-opening
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    const centerLat = highlightPlace ? highlightPlace.lat : destination.lat;
    const centerLon = highlightPlace ? highlightPlace.lon : destination.lon;
    const zoomLevel = highlightPlace ? 14 : 12;

    // Initialize Leaflet Map with CartoDB Dark Matter tiles for luxurious dark theme
    const map = L.map(mapContainerRef.current).setView([centerLat, centerLon], zoomLevel);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>',
      maxZoom: 19
    }).addTo(map);

    // Create custom pin icon
    const customIcon = L.divIcon({
      className: 'custom-leaflet-marker',
      html: `<div style="background-color: #14b8a6; border: 3px solid #030712; width: 24px; height: 24px; border-radius: 50%; box-shadow: 0 0 15px rgba(20, 184, 166, 0.8);"></div>`,
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    });

    // Add main destination marker
    const destMarker = L.marker([destination.lat, destination.lon], { icon: customIcon }).addTo(map);
    destMarker.bindPopup(`
      <div style="font-family: sans-serif; padding: 4px;">
        <strong style="color: #14b8a6; font-size: 14px;">${destination.name}</strong>
        <p style="margin: 4px 0 0 0; font-size: 11px; color: #94a3b8;">${destination.country}</p>
      </div>
    `);

    // Add markers for famous places
    destination.famousPlaces?.forEach((place) => {
      if (place.lat && place.lon) {
        const placeIcon = L.divIcon({
          className: 'custom-place-marker',
          html: `<div style="background-color: #06b6d4; border: 2px solid #ffffff; width: 18px; height: 18px; border-radius: 50%; box-shadow: 0 0 10px rgba(6, 182, 212, 0.7);"></div>`,
          iconSize: [18, 18],
          iconAnchor: [9, 9]
        });

        const marker = L.marker([place.lat, place.lon], { icon: placeIcon }).addTo(map);
        marker.bindPopup(`
          <div style="font-family: sans-serif; max-width: 180px;">
            <img src="${place.image}" style="width: 100%; height: 90px; object-fit: cover; border-radius: 8px; margin-bottom: 6px;" />
            <strong style="color: #ffffff; font-size: 13px; display: block;">${place.name}</strong>
            <span style="color: #14b8a6; font-size: 10px; font-weight: bold;">${place.category}</span>
            <p style="margin: 4px 0 0 0; font-size: 11px; color: #cbd5e1;">${place.approxCost}</p>
          </div>
        `);

        if (highlightPlace && highlightPlace.id === place.id) {
          marker.openPopup();
        }
      }
    });

    mapInstanceRef.current = map;

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [isOpen, destination, highlightPlace]);

  if (!isOpen || !destination) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
      <div className="relative w-full max-w-4xl glass-panel p-6 rounded-3xl shadow-2xl border border-slate-700/80 overflow-hidden flex flex-col h-[650px]">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-teal-400">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white flex items-center space-x-2">
                <span>Interactive Map: {destination.name}</span>
              </h3>
              <p className="text-xs text-teal-300 font-medium">
                {destination.country} • {destination.famousPlaces?.length || 0} Landmarks Plotted
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full glass-card hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Map Container */}
        <div className="flex-1 w-full rounded-2xl overflow-hidden relative border border-slate-800">
          <div ref={mapContainerRef} className="w-full h-full" />
        </div>

      </div>
    </div>
  );
}
