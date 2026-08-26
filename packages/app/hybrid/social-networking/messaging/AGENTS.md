# Messaging

Real-time messaging application with chat, threads, and media sharing.

## Build & Test

```bash
pnpm dev                    # Start Next.js dev server
pnpm test                   # Run all Jest tests
pnpm tsc --noEmit           # TypeScript type check
pnpm lint                   # ESLint
```

## File Structure

```text
src/
  app/                      # Next.js App Router pages
  components/               # React components
  data/                     # Data models and seeds
  hooks/                    # Custom React hooks
  lib/                      # Utility libraries
  providers/                # Context providers
  styles/                   # Tailwind CSS 4 + DaisyUI 5
  types/                    # TypeScript type definitions
src-tauri/
  tauri.conf.json           # Tauri 2 desktop config
```

## Coding Rules

1. Arrow functions only — no `function` keyword
2. Explicit types on all exports — never `any`
3. TailwindCSS v4 + DaisyUI v5 — no CSS modules, no styled-components
4. Keep files under 200 lines, functions under 30 lines
5. Test behaviour, not implementation — Jest + Testing Library
6. Mobile-first responsive design
