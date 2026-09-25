import next from 'eslint-config-next/typescript';
import { defineConfig, globalIgnores } from 'eslint/config';

const eslintConfig = defineConfig([
  ...next,
  globalIgnores([
    '.next/**',
    'build/**',
    'coverage/**',
    'jest.config.ts',
    'jest.setup.ts',
    'next-env.d.ts',
    'node_modules/**',
    'out/**',
    'playwright-report/**',
    'test-results/**',
    'src-tauri/**',
    'src-tauri/target/**',
  ]),
  {
    files: ['**/__tests__/**/*.{ts,tsx}', '**/*.{test,spec}.{ts,tsx}'],
    rules: {
      // Test doubles legitimately stand in for framework internals.
      '@typescript-eslint/no-explicit-any': 'off',
      // `require()` is how a few suites reach modules jest.mock cannot hoist.
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
  {
    // `_`-prefixed bindings are params kept for signature clarity.
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
    },
  },
]);

export default eslintConfig;
