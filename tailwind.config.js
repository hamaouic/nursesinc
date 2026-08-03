/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Brand pastels
        blush: {
          50: '#FFF5F7',
          100: '#FFE9EE',
          200: '#FFD1DC',
          300: '#FFB9C8',
          400: '#FF9FB3',
          500: '#FF7F99',
        },
        mint: {
          50: '#F4FBF6',
          100: '#E8F5E9',
          200: '#D4ECD8',
          300: '#B5DEC0',
          400: '#8FCB9F',
          500: '#6DBD85',
        },
        cream: {
          50: '#FFFEFC',
          100: '#FAF7F2',
          200: '#F2EDE5',
        },
        ink: {
          DEFAULT: '#2C3E50',
          50: '#F4F6F8',
          100: '#E4E8EC',
          200: '#C4CCD4',
          300: '#94A2B0',
          400: '#64758A',
          500: '#2C3E50',
          600: '#243342',
          700: '#1B2733',
          800: '#121B24',
        },
      },
      fontFamily: {
        display: ['"Fraunces"', '"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 10px 30px -10px rgba(44, 62, 80, 0.12)',
        glow: '0 20px 50px -20px rgba(255, 209, 220, 0.6)',
        'glow-mint': '0 20px 50px -20px rgba(141, 207, 168, 0.5)',
      },
      backgroundImage: {
        'mesh-pink':
          'radial-gradient(at 20% 20%, rgba(255,209,220,0.5) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(232,245,233,0.6) 0px, transparent 50%), radial-gradient(at 0% 80%, rgba(255,209,220,0.4) 0px, transparent 50%)',
        'mesh-mint':
          'radial-gradient(at 80% 20%, rgba(232,245,233,0.7) 0px, transparent 50%), radial-gradient(at 20% 0%, rgba(255,209,220,0.45) 0px, transparent 50%), radial-gradient(at 50% 80%, rgba(141,207,168,0.35) 0px, transparent 50%)',
        'mesh-cream':
          'radial-gradient(at 50% 0%, rgba(255,209,220,0.4) 0px, transparent 50%), radial-gradient(at 100% 100%, rgba(232,245,233,0.55) 0px, transparent 50%)',
      },
      keyframes: {
        'float-slow': {
          '0%,100%': { transform: 'translateY(0) translateX(0)' },
          '50%': { transform: 'translateY(-12px) translateX(6px)' },
        },
        'blob': {
          '0%,100%': { borderRadius: '42% 58% 70% 30% / 45% 45% 55% 55%' },
          '50%': { borderRadius: '70% 30% 50% 50% / 30% 60% 40% 70%' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'caret-blink': {
          '0%,100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
      animation: {
        'float-slow': 'float-slow 8s ease-in-out infinite',
        blob: 'blob 14s ease-in-out infinite',
        shimmer: 'shimmer 3s linear infinite',
      },
    },
  },
  plugins: [],
};