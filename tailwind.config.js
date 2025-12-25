/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        audi: {
          black: '#000000',
          'gray-900': '#0D0D0D',
          'gray-800': '#1A1A1A',
          'gray-700': '#2A2A2A',
          'gray-600': '#3D3D3D',
          'gray-500': '#5C5C5C',
          'gray-400': '#8C8C8C',
          'gray-300': '#B3B3B3',
          'gray-200': '#D4D4D4',
          'gray-100': '#E8E8E8',
          white: '#FFFFFF',
          red: '#BB0A30',
          'red-dark': '#8A0825',
          'red-light': '#E01E41',
          silver: '#C4C4C4',
          'silver-dark': '#A3A3A3',
          accent: '#FF3341',
        },
      },
      fontFamily: {
        'audi-extended': ['Audi Type Extended', 'Helvetica Neue', 'Arial', 'sans-serif'],
        'audi': ['Audi Type', 'Helvetica Neue', 'Arial', 'sans-serif'],
        'display': ['DM Sans', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'audi-gradient': 'linear-gradient(135deg, #1A1A1A 0%, #0D0D0D 50%, #000000 100%)',
        'card-gradient': 'linear-gradient(145deg, rgba(42,42,42,0.8) 0%, rgba(26,26,26,0.9) 100%)',
        'glass': 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
      },
      boxShadow: {
        'audi': '0 4px 30px rgba(0, 0, 0, 0.4)',
        'audi-hover': '0 8px 40px rgba(187, 10, 48, 0.2)',
        'card': '0 8px 32px rgba(0, 0, 0, 0.3)',
        'glow': '0 0 40px rgba(187, 10, 48, 0.15)',
        'inner-light': 'inset 0 1px 0 rgba(255,255,255,0.05)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'slide-in-right': 'slideInRight 0.5s ease-out forwards',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(187, 10, 48, 0.1)' },
          '100%': { boxShadow: '0 0 40px rgba(187, 10, 48, 0.25)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
