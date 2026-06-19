import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import solid from 'vite-plugin-solid';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [solid(), tailwindcss()],
  resolve: {
    alias: [
      {
        find: /^@hieudoanm\/colors$/,
        replacement: path.resolve(
          __dirname,
          '../../modules/utilities/colors/src/index.ts'
        ),
      },
      {
        find: /^@hieudoanm\/json$/,
        replacement: path.resolve(
          __dirname,
          '../../modules/utilities/json/src/index.ts'
        ),
      },
      {
        find: /^@hieudoanm\/number$/,
        replacement: path.resolve(
          __dirname,
          '../../modules/utilities/number/src/index.ts'
        ),
      },
      {
        find: /^@hieudoanm\/calendar$/,
        replacement: path.resolve(
          __dirname,
          '../../modules/utilities/calendar/src/index.ts'
        ),
      },
      {
        find: /^@hieudoanm\/string$/,
        replacement: path.resolve(
          __dirname,
          '../../modules/utilities/string/src/index.ts'
        ),
      },
      {
        find: /^@hieudoanm\.github\.io\/(.*)$/,
        replacement: path.resolve(__dirname, './src/$1'),
      },
    ],
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
  },
});
