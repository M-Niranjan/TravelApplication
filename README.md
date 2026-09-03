# Aetheria | Premium AI Travel Application & Android APK

A production-quality **AI-powered Travel Application** built in **React**, available both as a responsive web application and as a native **Android Application packaged as an APK using Capacitor**.

![Aetheria Travel App](https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1200&auto=format&fit=crop)

---

## 🏗️ Architecture & Single Codebase Workflow

The application uses a **single unified React codebase** for both Web and Android:

```text
React Application (Vite + Tailwind + Framer Motion)
      │
      ├── Web Production Build (dist)
      │    └── Web Deployment (Vercel / Netlify)
      │
      └── Capacitor Android Wrapper
           │
           └── android/ (Android Studio Project)
                │
                └── APK Generation (Build APKs)
```

---

## 🌟 Key Features

1. **Responsive-First UI (Mobile to 4K Monitors)**:
   - Dynamic mobile navigation drawer with hamburger toggle (`☰`), backdrop scroll locking, and Escape key handling.
   - Touch-optimized minimum 44px touch targets across all interactive buttons and inputs.
   - PWA support with Web App Manifest (`public/manifest.json`).

2. **Cinematic Hero Video Loop (`Hero.jsx`)**:
   - Full-screen looping background video with layered translucent gradient overlays.
   - Framer Motion staggered entrance animations.
   - Scene switcher and video pause/play controls.

3. **Capacitor Native Android Integration**:
   - Native Capacitor Geolocation plugin with fallback to Browser Geolocation API.
   - Android physical Hardware Back Button listener (`@capacitor/app`).
   - Android status bar & camera cutout safe-area insets (`env(safe-area-inset-top)`).

4. **Real-Time Weather (`WeatherCard.jsx`)**:
   - OpenWeather API data displaying live temperature, condition icon, feels-like temp, humidity, wind speed, visibility, and sunrise/sunset.
   - Skeleton loading and designed error states.

5. **Destination Explorer & Famous Places**:
   - Multi-criteria search (city, country, region, tags).
   - Region & Travel Type filter chips.
   - Visual place cards with dynamic Unsplash imagery, descriptions, and visit duration footers.

6. **Google Gemini AI Assistant & Visual Day-by-Day Itinerary Timeline**:
   - Full-screen mobile bottom sheet / floating desktop AI chat drawer.
   - Suggested question chips ("How many days?", "Best time?", "What should I see?", "Plan my trip").
   - AI Itinerary Generator returning structured JSON rendered as an interactive, expandable day-by-day UI timeline.

---

## 🚀 Environment Variables (`.env`)

Create a `.env` file in the project root:

```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
VITE_OPENWEATHER_API_KEY=your_openweather_api_key_here
VITE_UNSPLASH_ACCESS_KEY=your_unsplash_access_key_here
```

---

## 💻 Web Installation & Running Locally

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start Web Dev Server**:
   ```bash
   npm run dev
   ```

3. **Build Web Production Bundle**:
   ```bash
   npm run build
   ```

---

## 📱 Android Studio Setup & APK Generation Steps

### 1. Build and Sync React Web Assets to Android Project
Run the sync command:
```bash
npm run cap:sync
# Or: npm run build && npx cap sync android
```

### 2. Open Native Project in Android Studio
Launch Android Studio with:
```bash
npx cap open android
```
*(Or open the `n:\tapDesignASS\android` directory directly in Android Studio).*

### 3. Run on Android Emulator or Physical Android Phone
1. In Android Studio, select your Android Device / Virtual Device (Emulator).
2. Click the **Run 'app'** button (▶) or press `Shift + F10`.

### 4. Build Working Debug APK File
To generate an installable `.apk` file for your Android phone:
1. In Android Studio, go to top menu:
   `Build` ➔ `Build Bundle(s) / APK(s)` ➔ `Build APK(s)`
2. Once finished, click **locate** in the popup notification to find your output file:
   `android/app/build/outputs/apk/debug/app-debug.apk`
3. Transfer `app-debug.apk` to any Android phone and tap to install!

---

## 📄 License

Designed as a front-end developer assignment submission.
