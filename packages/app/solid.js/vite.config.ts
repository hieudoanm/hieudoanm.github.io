import { defineConfig } from 'vite';
import { solidStart } from '@solidjs/start/config';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
  plugins: [solidStart(), tailwindcss()],
  resolve: {
    alias: {
      '@hieudoanm': path.resolve(__dirname, './src'),
    },
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
