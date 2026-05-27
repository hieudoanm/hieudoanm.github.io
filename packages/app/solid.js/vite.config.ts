import { defineConfig } from 'vite';
import { solidStart } from '@solidjs/start/config';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
  plugins: [solidStart(), tailwindcss()],
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
      { find: '@hieudoanm/', replacement: path.resolve(__dirname, './src') },
    ],
  },
  ssr: {
    noExternal: ['@browser/native', '@chess/elo'],
  },
  build: {
    commonjsOptions: {
      include: [/browser\/native/, /chess\/elo/, /node_modules/],
    },
  },
});
