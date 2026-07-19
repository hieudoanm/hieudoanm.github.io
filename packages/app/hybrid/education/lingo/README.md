# Lingo

> Duolingo-style language learning — flashcards, dictionary and sign-language
> recognition as a hybrid web/desktop app.

## Overview

Lingo bundles three language-learning tools in one offline-first app:

| Feature        | What it does                                                                                   |
| -------------- | ---------------------------------------------------------------------------------------------- |
| **Flashcards** | Spaced-repetition style card browser over a 8.6 MB vocabulary dataset, keyboard navigable      |
| **Dictionary** | Word lookup with definitions grouped by part of speech and linked synonyms/antonyms            |
| **Sign**       | Real-time sign-language letter recognition from the webcam via MediaPipe Hands + an ONNX model |

A shared gamification layer tracks XP and daily streaks in IndexedDB.

## Tech Stack

- Next.js 16 (App Router, static export) + React 19 + TypeScript strict
- Tailwind CSS 4 with DaisyUI 5 custom themes (`lingo` light default,
  `lingo-dark`)
- TanStack Query for async data (vocabulary fetch)
- IndexedDB (`idb`) for local progress persistence
- ONNX Runtime Web + MediaPipe Hands for sign recognition
- Tauri 2 shell with updater, dialog and notification plugins

## Development

```bash
pnpm install          # from repo root
pnpm dev              # http://localhost:3000
pnpm test             # Jest unit tests
pnpm test:e2e         # Playwright e2e tests
pnpm lint && pnpm format
pnpm build            # static export to out/
```

See [`docs/`](./docs/) for architecture, contributing and packaging guides.
