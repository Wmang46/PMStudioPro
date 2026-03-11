/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: '#16161a',
          deep: '#0c0c0f',
          raised: '#1e1e24',
          hover: '#25252d',
        },
        accent: {
          DEFAULT: '#7f5af0',
          light: '#9b7bf7',
          dark: '#6b3fd4',
          glow: 'rgba(127, 90, 240, 0.15)',
        },
        teal: {
          DEFAULT: '#2cb67d',
          light: '#3fc68d',
          dark: '#239e6b',
        },
        coral: {
          DEFAULT: '#ff6b6b',
          light: '#ff8a8a',
        },
        ink: {
          DEFAULT: '#ededef',
          muted: '#94949e',
          faint: '#55555e',
          ghost: 'rgba(255, 255, 255, 0.08)',
        },
        // Keep article/audio/video type colors
        article: '#7f5af0',
        audio: '#2cb67d',
        video: '#ff6b6b',
      },
      fontFamily: {
        display: ['Syne', 'system-ui', 'sans-serif'],
        sans: ['DM Sans', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      maxWidth: {
        content: '1200px',
        prose: '70ch',
        narrow: '640px',
      },
      borderRadius: {
        card: '12px',
        btn: '8px',
        pill: '999px',
      },
      boxShadow: {
        glow: '0 0 40px rgba(127, 90, 240, 0.12)',
        'glow-lg': '0 0 80px rgba(127, 90, 240, 0.18)',
        card: '0 4px 24px rgba(0, 0, 0, 0.3)',
        'card-hover': '0 8px 40px rgba(0, 0, 0, 0.4)',
      },
      animation: {
        'fade-up': 'fadeUp 0.7s ease-out both',
        'fade-in': 'fadeIn 0.5s ease-out both',
        'slide-in': 'slideIn 0.6s ease-out both',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-12px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
      },
    },
  },
  plugins: [],
};
