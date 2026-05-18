const path = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    path.join(__dirname, './app/**/*.{ts,tsx,mdx}'),
    path.join(__dirname, './components/**/*.{ts,tsx}'),
    path.join(__dirname, './content/**/*.{md,mdx}'),
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'JetBrains Mono', 'monospace'],
      },
      colors: {
        brand: {
          green: '#235836',
          greenDeep: '#1c4a2a',
          greenLight: '#97C459',
          cream: '#F5F0E1',
          creamShadow: '#D4C5A2',
          bone: '#C2B493',
          ink: '#2C2A26',
          inkRed: '#A0392E',
          inkBlue: '#185FA5',
        },
      },
      fontSize: {
        h1: ['34px', { lineHeight: '1.15' }],
        lead: ['18px', { lineHeight: '1.5' }],
        h2: ['20px', { lineHeight: '1.3' }],
        h3: ['16px', { lineHeight: '1.4' }],
        body: ['16px', { lineHeight: '1.7' }],
        ui: ['14px', { lineHeight: '1.5' }],
      },
      borderRadius: {
        md: '8px',
        lg: '12px',
      },
      maxWidth: {
        prose: '720px',
        article: '600px',
      },
      keyframes: {
        'oracle-wobble': {
          '0%':   { transform: 'scale(1) rotate(0deg)' },
          '15%':  { transform: 'scale(0.93) rotate(-4deg)' },
          '35%':  { transform: 'scale(1.06) rotate(3deg)' },
          '55%':  { transform: 'scale(0.97) rotate(-2deg)' },
          '75%':  { transform: 'scale(1.03) rotate(1deg)' },
          '100%': { transform: 'scale(1) rotate(0deg)' },
        },
      },
      animation: {
        'oracle-wobble': 'oracle-wobble 380ms cubic-bezier(0.36,0.07,0.19,0.97) both',
      },
    },
  },
  plugins: [],
};
