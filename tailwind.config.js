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
        canvas: '#F9F8F5',
        obsidian: '#101413',
        emerald: {
          50: '#F0F7F5',
          100: '#DCEEEA',
          200: '#BBDDD6',
          500: '#24655D',
          600: '#1B4944',
          700: '#143834',
          800: '#0E2825',
          900: '#081715',
        },
        champagne: {
          300: '#EBDCBF',
          400: '#E0C89E',
          500: '#D4B37D',
          600: '#C29C61',
        },
        slateText: {
          primary: '#101413',
          secondary: '#586260',
          muted: '#8A9592',
        }
      },
      fontFamily: {
        editorial: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Manrope', 'Inter', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      boxShadow: {
        'luxury': '0 20px 40px -15px rgba(16, 20, 19, 0.07), 0 0 1px 1px rgba(16, 20, 19, 0.05)',
        'luxury-hover': '0 30px 60px -20px rgba(16, 20, 19, 0.15), 0 0 1px 1px rgba(16, 20, 19, 0.08)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.08)',
        'glow-teal': '0 0 25px rgba(36, 101, 93, 0.35)',
      },
      animation: {
        'bounce-gentle': 'bounceGentle 2s infinite',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'spin-slow': 'spin 12s linear infinite',
      },
      keyframes: {
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(5px)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}
