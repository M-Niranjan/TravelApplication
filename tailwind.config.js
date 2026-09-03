/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ivory: '#F7F5F0',
        charcoal: '#101413',
        ocean: {
          50: '#f0f7f6',
          100: '#dbeee9',
          500: '#2F6F68',
          600: '#265953',
          700: '#1f4843',
          900: '#15322e',
        },
        sand: {
          300: '#e8d4b8',
          400: '#D8B98A',
          500: '#c8a470',
        },
        text: {
          primary: '#171A19',
          secondary: '#68706D'
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Manrope', 'Inter', 'sans-serif'],
      },
      animation: {
        'bounce-gentle': 'bounceGentle 2s infinite',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
      },
      keyframes: {
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(6px)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}
