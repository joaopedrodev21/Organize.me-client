/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e3a8a',
          900: '#172554',
          950: '#0c1a3d',
        },
        surface: {
          DEFAULT: 'rgba(15, 23, 42, 0.95)',
          light: 'rgba(15, 23, 42, 0.8)',
          lighter: 'rgba(30, 41, 59, 0.8)',
          border: 'rgba(148, 163, 184, 0.18)',
          'border-light': 'rgba(148, 163, 184, 0.12)',
        },
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
}
