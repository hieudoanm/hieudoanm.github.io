import { defineConfig, globalIgnores } from 'eslint/config';

const eslintConfig = defineConfig([
  globalIgnores([
    '.next/**',
    'build/**',
    'docs/**',
    'mobile/**',
    'node_modules/**',
    'out/**',
    'public/workers/**',
    'src-tauri/**',
    'next-env.d.ts',
  ]),
]);

export default eslintConfig;
