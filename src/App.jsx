import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { App as CapApp } from '@capacitor/app';
import Navbar from './components/Navbar';
import MobileBottomNav from './components/MobileBottomNav';
import Footer from './components/Footer';
import Home from './pages/Home';
import Destinations from './pages/Destinations';
import DestinationDetails from './pages/DestinationDetails';
import Places from './pages/Places';
import ItineraryPage from './pages/ItineraryPage';
import PackingPage from './pages/PackingPage';
import WeatherPage from './pages/WeatherPage';
import LocationSelector from './components/LocationSelector';
import AIChat from './components/AIChat';
import AuthModal from './components/AuthModal';
import { AuthProvider } from './context/AuthContext';
import { useLocation } from './hooks/useLocation';
import { Sparkles } from 'lucide-react';

function AppContent() {
  const { location, permissionState, isLocating, errorMessage, requestLocation, setManualLocation } = useLocation();

  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [activeChatDestination, setActiveChatDestination] = useState(null);

  const handleOpenAIChatWithDestination = (dest = null) => {
    setActiveChatDestination(dest);
    setIsAIChatOpen(true);
  };

  // Android Native Hardware Back Button Handler
  useEffect(() => {
    let listener;
    try {
      listener = CapApp.addListener('backButton', ({ canGoBack }) => {
        if (isAuthModalOpen) {
          setIsAuthModalOpen(false);
        } else if (isAIChatOpen) {
          setIsAIChatOpen(false);
        } else if (isLocationModalOpen) {
          setIsLocationModalOpen(false);
        } else if (canGoBack) {
          window.history.back();
        } else {
          CapApp.exitApp();
        }
      });
    } catch (e) {
      // Running on web browser
    }

    return () => {
      if (listener && typeof listener.then === 'function') {
        listener.then((h) => h.remove());
      }
    };
  }, [isAuthModalOpen, isAIChatOpen, isLocationModalOpen]);

  return (
    <Router>
      <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] font-sans relative selection:bg-blue-600 selection:text-white flex flex-col justify-between pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]">
        
        {/* Top Navigation Bar */}
        <div className="no-print">
          <Navbar
            onOpenAIChat={() => handleOpenAIChatWithDestination(null)}
            onOpenLocationModal={() => setIsLocationModalOpen(true)}
            onOpenAuthModal={() => setIsAuthModalOpen(true)}
            currentLocation={location}
          />
        </div>

        {/* Dedicated Page Routes with Safe Bottom Padding for Mobile Nav Dock */}
        <main className="flex-grow pb-24 lg:pb-0">
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  onOpenAIChat={() => handleOpenAIChatWithDestination(null)}
                  currentLocation={location}
                />
              }
            />
            <Route path="/destinations" element={<Destinations />} />
            <Route
              path="/destinations/:id"
              element={
                <DestinationDetails
                  onOpenAIChatWithDestination={handleOpenAIChatWithDestination}
                />
              }
            />
            <Route 
              path="/places" 
              element={<Places onOpenAIChatWithDestination={handleOpenAIChatWithDestination} />} 
            />
            <Route path="/itinerary" element={<ItineraryPage />} />
            <Route path="/packing" element={<PackingPage />} />
            <Route path="/weather" element={<WeatherPage currentLocation={location} />} />
            
            {/* Fallback wildcard catch-all route to prevent 404s */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Mobile Luxury Bottom Navigation Bar (App Dock) */}
        <div className="no-print">
          <MobileBottomNav
            onOpenAIChat={() => handleOpenAIChatWithDestination(null)}
            onOpenAuthModal={() => setIsAuthModalOpen(true)}
          />
        </div>

        {/* Desktop Floating AI Assistant Trigger Button (Bottom-Right) */}
        {!isAIChatOpen && (
          <button
            onClick={() => handleOpenAIChatWithDestination(null)}
            className="no-print hidden lg:flex fixed bottom-6 right-6 z-40 px-5 py-3.5 rounded-full bg-[#0F172A] text-white font-bold text-xs shadow-2xl hover:scale-105 transition-transform items-center space-x-2 border border-slate-700 group min-h-[44px] cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
            <span>✨ Ask Voyager AI</span>
          </button>
        )}

        {/* Location Selector Modal */}
        <div className="no-print">
          <LocationSelector
            isOpen={isLocationModalOpen}
            onClose={() => setIsLocationModalOpen(false)}
            currentLocation={location}
            onRequestLocation={requestLocation}
            onSelectLocation={setManualLocation}
            permissionState={permissionState}
            isLocating={isLocating}
            errorMessage={errorMessage}
          />
        </div>

        {/* Firebase Authentication & User Profile Modal */}
        <div className="no-print">
          <AuthModal
            isOpen={isAuthModalOpen}
            onClose={() => setIsAuthModalOpen(false)}
          />
        </div>

        {/* AI Chat Floating Assistant Panel / Mobile Bottom Sheet */}
        <div className="no-print">
          <AIChat
            isOpen={isAIChatOpen}
            onClose={() => setIsAIChatOpen(false)}
            destination={activeChatDestination}
          />
        </div>

        {/* Footer (with safe spacing for bottom dock on mobile) */}
        <div className="no-print pb-16 lg:pb-0">
          <Footer />
        </div>

      </div>
    </Router>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
