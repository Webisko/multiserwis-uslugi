/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        industrial: {
          50: '#f4f4f5',
          100: '#e4e4e7',
          200: '#d4d4d8',
          300: '#a1a1aa',
          400: '#71717a',
          500: '#52525b',
          600: '#3f3f46',
          700: '#27272a',
          800: '#1F2937', // Gray-800: Section background
          900: '#111827', // Gray-900: Body/Navbar/Cards
          950: '#030712', // Gray-950: Darker accents if needed
          accent: '#F59E0B', // Amber-500 (matches original site)
          accentHover: '#D97706', // Amber-600
        },
      },
      fontFamily: {
        sans: ['Inter', 'Segoe UI', 'Tahoma', 'Geneva', 'Verdana', 'sans-serif'],
        display: ['Oswald', 'Bahnschrift SemiCondensed', 'Arial Narrow', 'Franklin Gothic Medium', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
