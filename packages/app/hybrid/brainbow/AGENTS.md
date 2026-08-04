# Agents

- [Agents](#agents)
  - [Techstack](#techstack)
    - [01. TypeScript](#01-typescript)
    - [02. pnpm](#02-pnpm)
    - [03. ESLint](#03-eslint)
    - [04. Prettier](#04-prettier)
    - [05. Jest](#05-jest)
    - [06. Playwright](#06-playwright)
    - [07. Next.js](#07-nextjs)
    - [08. Tailwind CSS](#08-tailwind-css)
    - [09. DaisyUI](#09-daisyui)
    - [10. Tauri](#10-tauri)
  - [Coding Conventions](#coding-conventions)
    - [SonarQue](#sonarque)
  - [Image Processing](#image-processing)
    - [Channel Model](#channel-model)
    - [Canvas Rules](#canvas-rules)
    - [Native Boundaries](#native-boundaries)
  - [Components](#components)
    - [Atoms](#atoms)
    - [Molecules](#molecules)
    - [Organisms](#organisms)
  - [Pages](#pages)
    - [Route Structure](#route-structure)
    - [Pages Details](#pages-details)
    - [Layout](#layout)
    - [Templates](#templates)
  - [Styling](#styling)
    - [Base HTML](#base-html)
    - [UX for Browser / Desktop App (Big Screen)](#ux-for-browser--desktop-app-big-screen)
    - [UX for Mobile App (Small Screen)](#ux-for-mobile-app-small-screen)
  - [Platform Checklist](#platform-checklist)
    - [Mobile](#mobile)
    - [Desktop](#desktop)

## Techstack

### 01. TypeScript

1. Use `strict: true` in `tsconfig.json` — Enables `strictNullChecks`,
   `noImplicitAny`, and other checks. AI agents infer null-safety from the type
   system instead of guessing.
2. Prefer `interface` over `type` for object shapes — `interface` extends,
   merges, and produces clearer error messages. Use `type` for unions,
   intersections, and primitives.
3. Use `as const` for literal types —
   `const channels = ["r", "g", "b"] as const` narrows to a tuple of literal
   types. AI agents see the exact set of values without runtime checks.
4. Use `branded types` for domain primitives —
   `type DatasetId = string & { readonly __brand: "DatasetId" }` prevents mixing
   up IDs of different entities.
5. Use `Readonly<T>` and `Partial<T>` utilities — Mark immutable interfaces
   explicitly. AI agents can trust that parameters won't be mutated.
6. Favour `zod` for runtime validation — Parse external data (file names, user
   input) at the boundary, then use inferred static types internally.
7. Use `never` in exhaustive checks — `default: const _exhaustive: never = x;`
   causes a compile error when a switch misses a case.
8. Prefer `satisfies` over raw casts —
   `const config = { zoom: 1 } satisfies ViewState` validates without widening
   the type.
9. Use arrow functions for all function expressions — `const fn = () => {}` over
   `function fn() {}`.
10. Explicitly type function return types on exported functions —
    `export const loadImage = (file: File): Promise<ImageRaster> =>` makes the
    contract visible at the call site.

### 02. pnpm

1. Use `pnpm` instead of `npm` or `yarn`.
2. Run `pnpm install` after every `package.json` change — Lock file must stay in
   sync.
3. Use `pnpm exec` over `npx` for local scripts.
4. Use workspace protocol for internal packages — `"@my/lib": "workspace:*"`
   links local packages.
5. Use `pnpm dlx` over `npx` for one-off executions.
6. Check `pnpm-lock.yaml` into version control.
7. Use `pnpm outdated` to check dependency freshness.
8. Use `pnpm audit` in CI for vulnerability scanning.
9. Use `.npmrc` for project-level settings only when necessary.
10. Run filters from the workspace root —
    `pnpm build --filter=@hieudoanm.github.io/brainbow`.

### 03. ESLint

1. Use `eslint-config-next` for Next.js projects.
2. Run `eslint . --fix` as a pre-commit step.
3. Use `typescript-eslint` for TypeScript-specific rules.
4. Prefer `eslint-plugin-import` for import ordering.
5. Use `eslint-plugin-react` with `react-hooks` rules.
6. Disable specific rules with inline comments sparingly.
7. Use `eslint-config-prettier` to disable formatting rules.
8. Use `eslint-plugin-jsx-a11y` for accessibility.
9. Configure ignore patterns in `eslint.config.mts` — node_modules, out, tauri.
10. Use flat config (`eslint.config.mts`) over `.eslintrc`.

### 04. Prettier

1. Use `prettier-plugin-tailwindcss` — Auto-sort Tailwind classes.
2. Configure in `.prettierrc.json` with project conventions —
   `singleQuote: true`, `trailingComma: 'es5'`, `printWidth: 80`.
3. Run `prettier --cache --write .` — Cached formatting is faster.
4. Use `.prettierignore` to exclude generated files.
5. Format on save in IDE.
6. Use `prettier --check .` in CI.
7. Prefer double quotes in JSX, single quotes in JS.
8. Use `prettier --write "**/*.{ts,tsx,js,jsx,json,css,md}"` for full
   formatting.
9. Don't override Prettier with ESLint formatting rules.
10. Use `prettier --list-different` to check without modifying.

### 05. Jest

1. Test behaviour, not implementation.
2. Use Arrange-Act-Assert pattern.
3. Write isolated tests — each test manages its own state.
4. Prefer realistic test data — use synthetic rasters that resemble real
   microscopy output.
5. Cover boundary conditions — empty rasters, zero-size canvases, hidden
   channels.
6. Use `it.each` for data-driven tests.
7. Use `mock` and `spy` for test doubles — mock `FileReader`/`createImageBitmap`
   for image loading tests.
8. Use `toThrow` for error assertions.
9. Use `toMatchSnapshot` for snapshot testing.
10. Keep test files colocated with source — `src/**/__tests__/*.test.ts`.

### 06. Playwright

1. Use `locator` over raw CSS/XPath selectors.
2. Prefer `getByRole`, `getByText`, `getByTestId`.
3. Use `page` fixtures over manual browser setup.
4. Use `test.beforeEach` for shared setup.
5. Use `expect.toHaveText`, `toBeVisible`, `toBeEnabled`.
6. Use `mockRoute` for API stubs.
7. Use `waitForLoadState('networkidle')` sparingly.
8. Use `snapshot` for visual regression.
9. Use `webServer` config for dev server.
10. Test file-import flows by seeding a fixture via `page.setInputFiles`.

### 07. Next.js

1. Use the App Router (`app/`) over the Pages Router (`pages/`).
2. Prefer server components by default.
3. Use client components only when needed — mark files with `"use client"` when
   they need interactivity, browser APIs, or hooks. The viewer is client-only.
4. Avoid dynamic route segments (`[id]`, `[slug]`) — use flat routes with
   `useSearchParams()` instead.
5. Use `loading.tsx` and `error.tsx` for fallbacks.
6. Use `layout.tsx` for shared UI.
7. Use `next/link` for client-side navigation.
8. `output: 'export'` — static export only, no server runtime.

### 08. Tailwind CSS

1. Use utility classes over custom CSS.
2. Use `@apply` sparingly — only for repeated base HTML styles.
3. Use `theme()` for design tokens.
4. Use responsive prefixes consistently — `sm:`, `md:`, `lg:`, `xl:`.
5. Use `group` and `group-hover:` for compound interactions.
6. Use `@layer base` for base styles.
7. Use `@layer components` for reusable component styles.
8. Use `@layer utilities` for custom utilities.
9. Use `tailwind.config.ts` for customization if needed.
10. Dark theme is default — `data-theme="nothing"`.

### 09. DaisyUI

1. Use `data-theme` for theme switching — `<html data-theme="nothing">`.
2. Use component classes directly — `btn`, `card`, `modal`, `navbar`, `drawer`.
3. Use `btn-primary`, `btn-secondary`, `btn-accent` for variants.
4. Use `badge-*` for status indicators.
5. Use `input-bordered`, `input-ghost` for form inputs.
6. Use `card`, `card-body`, `card-title` for card layouts.
7. Use `modal`, `modal-box`, `modal-backdrop` for modals.
8. Use `navbar`, `drawer`, `footer` for layout components.
9. Use `table-zebra`, `table-compact` for table variants.
10. Use `loading-*` for loading states.

### 10. Tauri

1. Use `tauri::Builder` for app configuration.
2. Use `#[tauri::command]` for IPC.
3. Use `State<'_, T>` for shared state.
4. Use `Window` for window control.
5. Use `tauri::path::PathResolver` for file paths.
6. Use events for frontend↔backend messaging — `window.emit("event", payload)`
   and `listen()`.
7. Prefer Tauri plugins for native features — dialogs, notifications, file
   system.
8. Use `tauri::async_runtime` for background tasks — image decoding and batch
   jobs never block the main thread.
9. Define permissions in `capabilities/`.
10. Call from TS via `@tauri-apps/api` only — never inline Rust strings in JS.

## Coding Conventions

### SonarQue

1. **S3358** — Nested ternary operators should not be used.
2. **S3776** — Cognitive Complexity of methods should not be too high.
3. **S138** — Functions should not have too many lines (~30 line cap).
4. **S1128** — Unused imports should be removed.
5. **S1192** — String literals should not be duplicated — extract repeated
   strings (e.g. channel names) into constants.
6. **S4144** — Functions should not have identical implementations — DRY.
7. **S6582** — Optional property access should be used — `x?.y` over `x && x.y`.
8. **S6438** — JSX props should not use unknown attributes — type all props.
9. **S3801** — Functions should only return early with a consistent pattern —
   guard clauses at the top.
10. **S1449** — Deprecated code should be removed.

## Image Processing

### Channel Model

1. A raster is `ImageData`-compatible
   `{ width, height, data: Uint8ClampedArray }`.
2. Channels are stored as per-channel arrays; default RGB channels map to the
   red, green, and blue planes.
3. Channel state is `{ visible: boolean, opacity: number, color: string }` —
   immutably updated.
4. Compositing sums visible channels weighted by opacity, then clamps to the
   `[0, 255]` range.
5. Histograms count pixel intensities per channel into 256 bins — pure functions
   over the raster.
6. Keep all math in `src/lib/image/` — no DOM types in the pure functions.

### Canvas Rules

1. The viewer owns a single `<canvas>`; all rendering happens in one
   `requestAnimationFrame` loop.
2. Pan/zoom is applied via the canvas transform — never by re-rendering pixels.
3. Skip `drawImage`/`putImageData` when no channel changed or transform is
   identical (dirty-flag rendering).
4. Resize the backing store with `devicePixelRatio` awareness — never stretch a
   low-res buffer.
5. Destroy the rAF loop and bitmap on unmount (`AbortController`).
6. Image decode is async — show a skeleton while pending, surface errors loudly.

### Native Boundaries

1. All Tauri calls go through `src/lib/native/` so the web build never imports
   `@tauri-apps/api` at module scope.
2. Feature-detect with `isTauri()` before invoking native commands.
3. Web fallback uses the File API + `createImageBitmap` + Canvas2D only.
4. Keep web and native code paths behaviorally identical for the core viewer.

## Components

### Atoms

| Component | File                | Props                                  | Description           |
| --------- | ------------------- | -------------------------------------- | --------------------- |
| `Button`  | `atoms/Button.tsx`  | `variant?, size?, disabled?, children` | Action trigger        |
| `Slider`  | `atoms/Slider.tsx`  | `value, min, max, step?, onChange`     | Range input (opacity) |
| `Toggle`  | `atoms/Toggle.tsx`  | `checked, onChange, label?`            | On/off switch         |
| `Badge`   | `atoms/Badge.tsx`   | `variant?, children`                   | Status indicator      |
| `Toolbar` | `atoms/Toolbar.tsx` | `children`                             | Icon button group     |

### Molecules

| Component        | File                           | Props                                                      | Description             |
| ---------------- | ------------------------------ | ---------------------------------------------------------- | ----------------------- |
| `ChannelControl` | `molecules/ChannelControl.tsx` | `name, color, visible, opacity, onToggle, onOpacityChange` | Channel toggle + slider |
| `ImageToolbar`   | `molecules/ImageToolbar.tsx`   | `zoom, onZoomIn, onZoomOut, onReset, onFit`                | Viewer zoom controls    |
| `EmptyState`     | `molecules/EmptyState.tsx`     | `icon, title, description?, action?`                       | No-data placeholder     |

### Organisms

| Component      | File                         | Props                         | Description       |
| -------------- | ---------------------------- | ----------------------------- | ----------------- |
| `ViewerCanvas` | `organisms/ViewerCanvas.tsx` | `raster, channels, transform` | Canvas renderer   |
| `ChannelList`  | `organisms/ChannelList.tsx`  | `channels, onChange`          | Per-channel panel |

## Pages

### Route Structure

| Route     | File               | Template         | Client | Description                       |
| --------- | ------------------ | ---------------- | ------ | --------------------------------- |
| `/`       | `page.tsx`         | `HomeTemplate`   | Yes    | Import a dataset or open the demo |
| `/viewer` | `viewer/page.tsx`  | `ViewerTemplate` | Yes    | Full-screen image viewer          |
| `*`       | `not-found.tsx`    | `ErrorTemplate`  | No     | 404 page with "Go home" action    |
| `*`       | `error.tsx`        | `ErrorTemplate`  | Yes    | 500 page with "Try again" action  |
| `*`       | `global-error.tsx` | —                | Yes    | Root-level error boundary         |

### Pages Details

1. **`/` — Home**
   - Centred layout with app title and short description
   - "Open demo dataset" button and a file picker for importing images
   - Uses `HomeTemplate` component

2. **`/viewer` — Viewer**
   - Full-screen canvas viewer with a channel sidebar
   - Pan/zoom/rotate canvas viewer (Canvas2D)
   - Channel toggling with per-channel opacity
   - Uses `ViewerTemplate` component

3. **`not-found` — 404**
   - Error code: `404`
   - Description: "The page you are looking for does not exist."
   - Action: "Go home" link to `/`
   - Uses `ErrorTemplate` component

4. **`error` — 500**
   - Error code: `500`
   - Description: "Something went wrong."
   - Action: "Try again" button calls `reset()`
   - Must be a Client Component (`'use client'`)

### Layout

- `layout.tsx` wraps all pages
- Sets `<html lang="en" data-theme="nothing">`
- Includes PWA metadata (manifest, appleWebApp, viewport)
- Registers service worker via `SWProvider`
- Body: `bg-base-100 text-base-content h-screen overflow-y-auto`

### Templates

- **`HomeTemplate`** — Props: `onOpenDemo`, `onImportFiles`
- **`ViewerTemplate`** — Props: `raster`, `channels`, `onChannelChange`
- **`ErrorTemplate`** — Props: `code`, `description`, `action` (ReactNode)

## Styling

### Base HTML

```css
@layer base {
  /* Headings */
  h1 {
    @apply font-mono text-4xl font-light tracking-tight;
  }
  h2 {
    @apply font-mono text-2xl font-light tracking-tight;
  }
  h3 {
    @apply font-mono text-xl font-light tracking-tight;
  }
  h4 {
    @apply font-mono text-lg font-light;
  }
  h5 {
    @apply font-mono text-base font-light;
  }
  h6 {
    @apply font-mono text-sm font-light;
  }

  /* Text */
  p {
    @apply text-base leading-relaxed;
  }
  strong {
    @apply font-semibold;
  }
  em {
    @apply italic;
  }
  small {
    @apply text-sm;
  }
  sub {
    @apply text-xs;
  }
  sup {
    @apply text-xs;
  }
  mark {
    @apply rounded bg-yellow-500/20 px-0.5 text-yellow-500;
  }
  blockquote {
    @apply border-base-content/20 text-base-content/70 border-l-4 pl-4 italic;
  }

  /* Links */
  a {
    @apply text-primary hover:text-primary/80 transition-colors;
  }

  /* Lists */
  ul {
    @apply list-inside list-disc;
  }
  ol {
    @apply list-inside list-decimal;
  }
  li {
    @apply leading-relaxed;
  }

  /* Code */
  code {
    @apply bg-base-content/10 rounded px-1.5 py-0.5 font-mono text-sm;
  }
  pre {
    @apply bg-base-content/5 overflow-x-auto rounded-xl p-4 font-mono text-sm;
  }
  pre code {
    @apply bg-transparent p-0;
  }
  kbd {
    @apply bg-base-200 border-base-content/20 rounded border px-1.5 py-0.5 font-mono text-xs shadow-sm;
  }

  /* Tables */
  table {
    @apply w-full text-sm;
  }
  thead {
    @apply border-base-content/20 border-b;
  }
  tbody {
    @apply divide-base-content/10 divide-y;
  }
  th {
    @apply px-4 py-2 text-left font-medium;
  }
  td {
    @apply px-4 py-2;
  }

  /* Forms */
  input {
    @apply bg-transparent;
  }
  textarea {
    @apply bg-transparent;
  }
  select {
    @apply bg-transparent;
  }
  label {
    @apply text-sm font-medium;
  }
  fieldset {
    @apply border-base-content/20 rounded-xl border p-4;
  }
  legend {
    @apply px-2 text-sm font-medium;
  }

  /* Media */
  img {
    @apply h-auto max-w-full;
  }
  video {
    @apply max-w-full;
  }
  audio {
    @apply w-full;
  }
  figure {
    @apply flex flex-col;
  }
  figcaption {
    @apply text-base-content/50 mt-2 text-sm;
  }

  /* Semantic */
  header {
    @apply w-full;
  }
  footer {
    @apply w-full;
  }
  nav {
    @apply w-full;
  }
  main {
    @apply w-full;
  }
  section {
    @apply w-full;
  }
  article {
    @apply w-full;
  }
  aside {
    @apply w-full;
  }

  /* Misc */
  hr {
    @apply border-base-content/20 my-8;
  }
  details {
    @apply text-sm;
  }
  summary {
    @apply cursor-pointer font-medium;
  }
  dialog {
    @apply rounded-2xl p-6 shadow-xl;
  }
}
```

### UX for Browser / Desktop App (Big Screen)

1. Use a sidebar for primary navigation — persistent sidebar for main app
   sections.
2. Show content in a centered container — max-width 1200px with auto margins.
3. Use a fixed header for global actions — import, zoom, share controls.
4. Display density with compact layouts — more data per screen on large
   displays.
5. Use hover states for interactive elements.
6. Support keyboard navigation — `+`/`-` zoom, `0` fit, `Space` pan.
7. Use multi-column layouts for dashboards.
8. Show breadcrumbs for deep navigation.
9. Use modal dialogs for focused tasks — e.g. dataset properties.
10. Provide resizable panels — draggable dividers for channel sidebar.

### UX for Mobile App (Small Screen)

1. Use a bottom tab bar for primary navigation — 4–5 tabs max.
2. Collapse secondary actions into overflow menus.
3. Use full-width inputs and buttons — touch targets minimum 44px.
4. Implement pull-to-refresh.
5. Use swipe gestures for actions.
6. Stack content vertically — single-column layouts with scroll.
7. Show a back button in the header.
8. Use bottom sheets for modals.
9. Implement pinch-to-zoom on the canvas.
10. Use skeleton loading states.

## Platform Checklist

### Mobile

- Android (APK, ABB)
  - `pnpm tauri android build` produces a signed APK and ABB
  - Test on Android 10+ emulator and a physical device
  - Verify `<head>` PWA `<meta>` tags are present in the WebView
  - Check status bar colour matches `theme-color` meta
  - Confirm the bottom navbar is visible and tappable (≥44px touch targets)
  - Validate back-button handling — app should not exit on back press
  - Test offline behaviour — SW caches shell and offline fallback renders
  - Verify `safe-area-inset-bottom` padding for gesture-navigation devices

### Desktop

- Linux
  - `pnpm tauri build` produces `.deb`, `.AppImage`, and `.rpm`
  - Install `.deb` on Ubuntu/Debian — app launches from system menu
  - Install `.rpm` on Fedora — app launches from system menu
  - Run `.AppImage` — no FUSE dependency errors
  - Verify system tray icon appears and context menu works
  - Check window title bar matches OS theme (light/dark)
  - Confirm keyboard shortcut `Ctrl+Q` quits cleanly
  - Test window resize — layout adapts without horizontal scrollbar

- macOS
  - `pnpm tauri build` produces `.app` and `.dmg`
  - Open `.dmg` — drag-to-Applications flow works
  - Launch from Applications — Dock icon appears
  - Verify code signing — right-click → Open without Gatekeeper warning
  - Test dark mode toggle — UI switches without page reload
  - Confirm window traffic-light buttons (close/minimise/zoom) function
  - Check menu bar items (File, Edit, View) have expected shortcuts
  - Validate `Cmd+Q`, `Cmd+W`, `Cmd+M` shortcuts work
