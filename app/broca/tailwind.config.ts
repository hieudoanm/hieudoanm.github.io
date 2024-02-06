import type { Config } from 'tailwindcss';

const config: Config = {
  important: true,
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {},
  plugins: [require('daisyui')],
  daisyui: { base: false, darkTheme: 'light', themes: ['light'] },
};

export default config;
