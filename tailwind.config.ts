import type { Config } from 'tailwindcss';

const ROOT = '/Users/louietran/mahjong-school';

const config: Config = {
  content: [
    `${ROOT}/app/**/*.{ts,tsx,mdx}`,
    `${ROOT}/components/**/*.{ts,tsx}`,
    `${ROOT}/content/**/*.{md,mdx}`,
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          green: '#3D6E2F',
          greenDeep: '#244416',
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
        body: ['15px', { lineHeight: '1.7' }],
        ui: ['13px', { lineHeight: '1.5' }],
      },
      borderRadius: {
        md: '8px',
        lg: '12px',
      },
      maxWidth: {
        prose: '720px',
        article: '600px',
      },
    },
  },
  plugins: [],
};

export default config;
