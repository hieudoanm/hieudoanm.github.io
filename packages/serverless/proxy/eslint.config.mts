import { defineConfig, globalIgnores } from 'eslint/config';
import tseslint from 'typescript-eslint';

export default defineConfig([
  // Ignore build files
  globalIgnores([
    '.next/**',
    'out/**',
    'dist/**',
    'node_modules/**',
    'next-env.d.ts',
  ]),

  // ✅ Use official typescript-eslint config
  ...tseslint.configs.recommended,
]);
