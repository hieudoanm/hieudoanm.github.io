import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      width: {
        '30': '7.5rem',
        '31': '7.75rem',
        '33': '8.25rem',
        '34': '8.5rem',
      },
      height: {
        'screen-2': '200vh',
        'screen-3': '300vh',
        'screen-4': '400vh',
        'screen-5': '500vh',
        'screen-6': '600vh',
        'screen-7': '700vh',
        'screen-8': '800vh',
        'screen-9': '900vh',
      },
    },
  },
  plugins: [],
} satisfies Config;
