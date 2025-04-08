import { defineConfig } from '@solidjs/start/config';
import tailwindcss from '@tailwindcss/vite';
import wasm from 'vite-plugin-wasm';

export default defineConfig({
  vite: {
    // vite options
    plugins: [tailwindcss(), wasm()],
    server: {
      port: 3000,
    },
    build: {
      target: 'esnext',
    },
  },
});
