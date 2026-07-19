# Apps / Education / Sign

## Build & Test

```bash
pnpm dev          # Start Next.js dev server
pnpm test         # Run all Jest tests
pnpm tsc --noEmit # TypeScript type check
pnpm lint         # ESLint
```

## File Structure

```text
Sign/
  index.tsx            # Entry component — camera + ONNX hand-sign classifier
  utils.ts             # NODE_ENV + ONNX model URI
```

## Overview

Real-time sign-language letter classifier. MediaPipe Hands tracks one hand from
the webcam; 126 features (63 normalized landmarks + 60 bone vectors) feed an
ONNX model whose output label is displayed as a banner over the video.

## Logic

- `load()` initializes an ONNX `InferenceSession` (wasm provider) from `URI`
  (dev: `/models/sign-model.onnx`, prod: `/hieudoanm/models/sign-model.onnx`),
  then dynamically imports MediaPipe Hands/Camera; `isReady` gates the loading
  overlay.
- `onResults` draws a mirrored video and skeleton, mirrors landmarks
  (`x: 1 - lm.x`) for training parity, and normalizes them relative to the wrist
  using the wrist→middle-MCP distance (`normScale`, skipped when 0).
- Features are `(x, y, z)` offsets for all 21 landmarks (63) plus the 20
  `HAND_CONNECTIONS` bone vectors (60), asserted to equal 126 before inference.
- `isRunningRef` throttles inference to one frame at a time; `session.run`
  requests `'output_label'` and reads the string from the tensor's `cpuData`.
- `NODE_ENV`/`URI` come from `utils.ts`.

## Routes

```tsx
// src/app/(products)/apps/education/page.tsx        — category listing
// src/app/(products)/apps/education/sign/page.tsx   — tool
```

## Registration

- `data/apps.csv` → `Education` section, `toolId: 'sign'`

## Coding Rules

1. Arrow functions only — no `function` keyword
2. Explicit types on all exports — never `any`
3. State management: `useState`/`useReducer` for local, React Context for shared
4. TailwindCSS v4 + DaisyUI v5 — no CSS modules, no styled-components
5. Icons: `react-icons/pi` (Phosphor)
6. Each tool component receives `onClose: () => void` prop
7. Keep files under 200 lines, functions under 30 lines
8. Pure logic in `utils.ts` — never mix UI and business logic
9. Test behaviour, not implementation — Jest + Testing Library
10. `APP_SECTIONS` consumes `data/apps.json` — never hardcode app sections in
    components
