# Apps / Visualization / Attractors

## Build & Test

```bash
pnpm dev          # Start Next.js dev server
pnpm test         # Run all Jest tests
pnpm tsc --noEmit # TypeScript type check
pnpm lint         # ESLint
```

## File Structure

```text
Attractors/
  index.tsx            # Entry component — overlay UI + video/canvas preview
  constants.ts         # SETTINGS per attractor + NUM_PARTICLES
  types.ts             # AttractorType, AttractorFn, ParticleData, Transition
  utils/
    attractors.ts      # Pure ODE functions (lorenz, aizawa, thomas, halvorsen, arneodo)
    renderer.ts        # createParticles/updateParticles — Three.js points + morphing
  hooks/
    useAnimation.ts    # THREE scene, OrbitControls, MediaPipe Hands, fist gesture
```

## Overview

Real-time Three.js particle renderings of five strange attractors. A webcam feed
with MediaPipe hand tracking orbits the camera; making a fist cycles to the next
attractor.

## Logic

- `ATTRACTOR_FNS` contains the ODEs for lorenz, aizawa, thomas, halvorsen, and
  arneodo; `SETTINGS` tunes scale, dt, camera, offset, and hue range per type
- `createParticles` seeds `NUM_PARTICLES` (8000) points by simulating each ODE
  forward 50–350 steps from random starting positions
- `updateParticles` integrates positions per frame, resets runaway points
  (distance > 200 or NaN), and cross-fades positions/colors between attractors
  over a 1200 ms eased transition
- `useAnimation` wires the WebGL renderer, `OrbitControls`, resize handling, and
  hand detection (fist = `curledCount >= 3`, debounced 1s)

## Routes

```tsx
// src/app/(products)/apps/visualization/page.tsx          — category listing
// src/app/(products)/apps/visualization/attractors/page.tsx — tool
```

## Registration

- `data/apps.csv` → `Visualization` section, `toolId: 'attractors'`

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
