# Overview

Focused reference for **eslint-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

# ESLint

ESLint is the de facto linter for JavaScript and TypeScript. Its value is not style enforcement — that is prettier.md's job — but **catching whole classes of bug** (unhandled promises, unsafe `any`, broken hook rules, shadowed globals) statically. Practical ESLint work leans on **flat config with `defineConfig`, type-aware linting via `projectService`, and a deliberately small rule set** — while language-level type guidance lives in typescript.md.

_Verified against ESLint 10.11, typescript-eslint 8.71._

---

## 1. Flat Config Is the Only Format

- **`.eslintrc` is removed in ESLint 10.** The legacy format is no longer supported at all; there is no environment variable to re-enable it.
- **ESLint 10 requires Node 20+** (19, 21, and 23 are dropped). Set `engines` and CI to match.
- **Use `eslint.config.mjs` and export from `defineConfig`** (`eslint/config`). It flattens nested objects and arrays, supports `extends`, and is type-safe — you get autocomplete and config typos become build errors.
- **`globalIgnores([...])` replaces `.eslintignore`.** A bare `{ ignores: [...] }` object is a _local_ exclusion, not a global skip; use the helper when you mean global.
- **Config lookup is now per-file.** ESLint 10 walks up from each linted file to find `eslint.config.*` instead of starting at the cwd — which is what makes per-package configs in a monorepo just work.

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

- **`prettier` goes last in `extends`** so it can switch off every stylistic rule that fights the formatter. Never run both and negotiate.

---

## 2. TypeScript Integration
