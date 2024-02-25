import daisyui from 'daisyui';
import type { Config } from 'tailwindcss';

const config: Config = {
  important: true,
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {},
  plugins: [daisyui],
  daisyui: {
    base: false,
    darkTheme: 'light',
    themes: false,
  },
};

export default config;
