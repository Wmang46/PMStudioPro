/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3b82f6', // blue-500
          dark: '#2563eb', // blue-600
        },
        accent: {
          DEFAULT: '#8b5cf6', // violet-500
          dark: '#7c3aed', // violet-600
        },
        article: '#3b82f6', // blue-500
        audio: '#8b5cf6', // violet-500
        video: '#ef4444', // red-500
      },
      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'sans-serif',
        ],
        mono: ['Fira Code', 'ui-monospace', 'monospace'],
      },
      maxWidth: {
        content: '1200px',
        prose: '70ch',
      },
    },
  },
  plugins: [],
};
