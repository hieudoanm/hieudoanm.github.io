# Decisions

Each decision follows a template: **Context → Options → Chosen → Consequences**.

---

## Use Next.js

**Status:** Accepted

**Context:** Need a React framework for a hybrid web/desktop/mobile app with
static export support.

**Options:** Next.js, Vite, Remix, Astro

**Chosen:** Next.js

**Consequences:**

- App Router with file-based routing
- Built-in static export (`output: 'export'`)
- Turbopack for fast dev builds
- Strong ecosystem and community

- Heavier than Vite for pure SPA use cases
- Static export limits server-side features

---

## Use App Router

**Status:** Accepted

**Context:** Next.js supports both Pages Router and App Router.

**Options:** Pages Router, App Router

**Chosen:** App Router

**Consequences:**

- Server Components by default
- Colocated `loading.tsx`, `error.tsx` conventions
- Layout nesting via directory structure
- Streaming and Suspense support

- Newer, smaller ecosystem than Pages Router
- Some third-party libraries still Pages Router-first

---

## Use TypeScript

**Status:** Accepted

**Context:** Need type safety for a multi-platform app.

**Options:** TypeScript, JavaScript

**Chosen:** TypeScript (strict mode)

**Consequences:**

- Compile-time error catching
- Better IDE support and refactoring
- Self-documenting interfaces

- Build step required
- Learning curve for type system

---

## Use Tailwind CSS + DaisyUI

**Status:** Accepted

**Context:** Need a styling system that works across web, desktop, and mobile.

**Options:** Tailwind + DaisyUI, CSS Modules, styled-components, Emotion

**Chosen:** Tailwind CSS + DaisyUI

**Consequences:**

- Utility-first — no custom CSS files
- DaisyUI provides ready-made component classes
- Small production bundle
- Works with static export

- Utility classes can be verbose in JSX
- Limited design customisation without overriding DaisyUI theme

---

## Use react-icons

**Status:** Accepted

**Context:** Need a consistent icon library across all components.

**Options:** react-icons, heroicons, lucide-react, SVG sprite

**Chosen:** react-icons (Feather set)

**Consequences:**

- Single import source for all icons
- Tree-shakeable — only imported icons in bundle
- Feather icons are clean and consistent
- `className` prop for sizing integrates with Tailwind

- Large dependency if multiple icon sets are imported
- No custom icon support without SVG

---

## Use Tauri for Desktop/Mobile

**Status:** Accepted

**Context:** Need native desktop and mobile builds from the same web codebase.

**Options:** Tauri, Electron, Capacitor, React Native

**Chosen:** Tauri

**Consequences:**

- Smaller binary size than Electron
- Rust backend for performance
- Shared web codebase across platforms
- Supports Android and iOS

- Rust learning curve for native features
- Smaller ecosystem than Electron

---

## Use Static Export

**Status:** Accepted

**Context:** App needs to work offline and be deployable to CDN.

**Options:** Static export, Server-side rendering, ISR

**Chosen:** Static export (`output: 'export'`)

**Consequences:**

- Zero server runtime — deployable anywhere
- Offline-first with service worker
- Fast page loads from CDN

- No server-side data fetching
- No API routes
- No middleware

---

## Use Flat Routes

**Status:** Accepted

**Context:** Dynamic `[id]` segments create implicit coupling between URL
structure and file location.

**Options:** Dynamic routes (`[id]`), Flat routes + `useSearchParams()`

**Chosen:** Flat routes + `useSearchParams()`

**Consequences:**

- Explicit routing — no hidden URL-to-file mapping
- Refactor-safe — renaming files doesn't break URLs
- Simpler navigation patterns

- URLs are slightly longer (`/detail?id=123` vs `/detail/123`)
- No SEO benefits from clean URLs (acceptable for app, not for marketing sites)

---

## Use pnpm

**Status:** Accepted

**Context:** Need a fast, reliable package manager.

**Options:** npm, yarn, pnpm

**Chosen:** pnpm

**Consequences:**

- Strict dependency resolution
- Faster installs than npm/yarn
- Workspace support for monorepos
- Smaller disk footprint via content-addressable store

- Some packages have compatibility issues with pnpm's strict mode

---

## Use Jest + Playwright

**Status:** Accepted

**Context:** Need unit testing and E2E testing.

**Options:** Jest + Playwright, Vitest + Cypress, Jest + Cypress

**Chosen:** Jest + Playwright

**Consequences:**

- Jest is mature and well-documented
- Playwright supports all browsers out of the box
- Playwright's auto-waiting reduces flaky tests
- `@testing-library/react` for component tests

- Two test runners to maintain
- Playwright requires browser binaries
