/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        nuvica: {
          sky: '#cce5ff',
          'sky-light': '#eef6ff',
          'sky-card': '#e3effc',
          navy: '#0b192c',
          'navy-dark': '#060f1d',
          'navy-card': '#132847',
          blue: '#0284c7',
          'blue-deep': '#1e40af',
          green: '#22c55e',
          'green-light': '#4ade80',
          'green-soft': '#dcfce7',
          slate: '#334155',
          muted: '#64748b',
        },
      },
      borderRadius: {
        '3xl': '1.75rem',
        '4xl': '2.25rem',
      },
    },
  },
  plugins: [],
}
