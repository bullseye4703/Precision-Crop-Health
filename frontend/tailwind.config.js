/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#020617', // slate-950
        surface: '#0f172a',    // slate-900
        surfaceLight: '#1e293b', // slate-800
        primary: '#10b981', // emerald-500
        primaryHover: '#059669', // emerald-600
        secondary: '#34d399', // emerald-400
        accent: '#047857', // emerald-700
        danger: '#ef4444',
        warning: '#f59e0b',
        textMain: '#f8fafc', // slate-50
        textMuted: '#94a3b8', // slate-400
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}
