import daisyui from 'daisyui';
import type { Config } from 'tailwindcss';

const config: Config = {
  important: true,
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: { extend: {} },
  // eslint-disable-next-line unicorn/prefer-module
  plugins: [daisyui, require('nativewind/tailwind/css')],
  daisyui: {
    base: false,
    darkTheme: 'light',
    themes: false,
  },
};

export default config;
