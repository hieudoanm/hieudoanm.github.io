# ESLint: Basic Usage

Best practices for linting JavaScript and TypeScript with ESLint — flat config, typed linting, rule strategy, plugin selection, monorepo overrides, and CI gating. Use when setting up, structuring, or debugging an ESLint configuration.

## Scenario

Use this example as a starting point when applying **eslint-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. Flat Config Is the Only Format** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```js
// eslint.config.mjs
// @ts-check
import js from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier/flat';

export default defineConfig(
  globalIgnores(['dist', 'coverage', '**/*.d.ts']),
  {
    files: ['**/*.{js,mjs,cjs,ts,tsx}'],
    extends: [js.configs.recommended, tseslint.configs.recommended, prettier],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-misused-promises': 'error',
      '@typescript-eslint/consistent-type-imports': 'error',
    },
  },
  { files: ['**/*.js'], extends: [tseslint.configs.disableTypeChecked] }
);
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
