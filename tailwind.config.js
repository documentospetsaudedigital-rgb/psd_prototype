/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        sus: {
          blue: '#005CA9',
          lightBlue: '#0083CA',
          navy: '#003366',
          green: '#008542',
          lightGreen: '#E6F4EA',
          bg: '#F8FAFC',
        },
      },
    },
  },
  plugins: [],
};
