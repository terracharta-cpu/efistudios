/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0c2340',
          50: '#f0f5fa',
          100: '#dbe7f3',
          200: '#b8d2e8',
          300: '#87b4d9',
          400: '#5291c6',
          500: '#3074b1',
          600: '#215c94',
          700: '#1a4877',
          800: '#163c63',
          900: '#0c2340',
          950: '#071526',
        },
        gold: {
          DEFAULT: '#c5a059',
          50: '#fbf7ee',
          100: '#f5ecd5',
          200: '#ebd7a7',
          300: '#dfc285',
          400: '#d2ab60',
          500: '#c5a059',
          600: '#b0873e',
          700: '#997530',
          800: '#735728',
          900: '#564220',
          950: '#342610',
        },
      },
      fontFamily: {
        sans: ['Montserrat', 'system-ui', 'sans-serif'],
        pathos: ["'Pathos'", "'GFS Neohellenic'", 'sans-serif'],
        neohellenic: ["'GFS Neohellenic'", 'sans-serif'],
        serif: ["'Pathos'", "'GFS Neohellenic'", 'serif'],
        display: ["'Pathos'", "'GFS Neohellenic'", 'serif'],
      },
      boxShadow: {
        'luxury': '0 4px 20px -2px rgba(12, 35, 64, 0.08), 0 2px 6px -1px rgba(12, 35, 64, 0.04)',
        'luxury-hover': '0 12px 30px -4px rgba(12, 35, 64, 0.12), 0 4px 10px -2px rgba(197, 160, 89, 0.15)',
        'gold-glow': '0 0 15px rgba(197, 160, 89, 0.25)',
      },
    },
  },
  plugins: [],
};
