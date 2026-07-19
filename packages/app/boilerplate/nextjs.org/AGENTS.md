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
3. Use `as const` for literal types — `const roles = ["admin", "user"] as const`
   narrows to a tuple of literal types. AI agents see the exact set of values
   without runtime checks.
4. Use `branded types` for domain primitives —
   `type UserId = string & { readonly __brand: "UserId" }` prevents mixing up
   IDs of different entities. AI agents catch type confusion at compile time.
5. Use `Readonly<T>` and `Partial<T>` utilities — Mark immutable interfaces
   explicitly. AI agents can trust that parameters won't be mutated.
6. Favour `io-ts` or `zod` for runtime validation — Parse external data at the
   boundary, then use inferred static types internally. AI agents see validated
   types instead of `any` or `unknown`.
7. Use `never` in exhaustive checks — `default: const _exhaustive: never = x;`
   causes a compile error when a switch misses a case. AI agents rely on the
   compiler to flag omissions.
8. Prefer `satisfies` over raw casts —
   `const config = { port: 3000 } satisfies Config` validates without widening
   the type. AI agents see the narrowed literal but get type-checking.
9. Use arrow functions for all function expressions — `const fn = () => {}` over
   `function fn() {}`. Consistent style across the codebase.
10. Explicitly type function return types on exported functions —
    `export const getUser = (id: string): User =>` makes the contract visible at
    the call site. AI agents read the signature without tracing the body.

### 02. pnpm

1. Use `pnpm` instead of `npm` or `yarn` — Strict dependency resolution prevents
   phantom dependencies. AI agents trust that imported packages exist in
   `package.json`.
2. Run `pnpm install` after every `package.json` change — Lock file must stay in
   sync. AI agents detect missing installs from `MODULE_NOT_FOUND` errors.
3. Use `pnpm exec` over `npx` for local scripts — `pnpm exec` runs binaries from
   the local `node_modules/.bin`. AI agents see the exact version being used.
4. Use workspace protocol for internal packages — `"@my/lib": "workspace:*"`
   links local packages. AI agents trace monorepo dependency graphs from the
   protocol.
5. Use `pnpm dlx` over `npx` for one-off executions — `pnpm dlx` downloads and
   runs without polluting the global store. AI agents prefer isolated execution.
6. Check `pnpm-lock.yaml` into version control — Never add it to `.gitignore`.
   AI agents rely on the lock file to reproduce builds.
7. Use `pnpm outdated` to check dependency freshness — Review updates before
   bumping. AI agents prefer explicit version bumps over lock file regeneration.
8. Use `pnpm audit` in CI for vulnerability scanning — Catch known CVEs before
   deployment. AI agents trust audited dependency trees.
9. Use `pnpm publish` with `--access public` for scoped packages — Default
   access is restricted for scoped packages. AI agents set visibility
   explicitly.
10. Use `.npmrc` for project-level settings — `auto-install-peers=true` or
    `shamefully-hoist=true` only when necessary. AI agents read project config
    from `.npmrc`.

### 03. ESLint

1. Use `eslint-config-next` for Next.js projects — Includes React, Next.js, and
   import rules. AI agents produce code that passes lint without guessing rules.
2. Run `eslint . --fix` as a pre-commit step — Auto-fix formatting and simple
   violations. AI agents see clean diffs after fixing.
3. Use `typescript-eslint` for TypeScript-specific rules —
   `no-floating-promises`, `no-misused-promises`, `prefer-optional-chain`. AI
   agents catch async bugs at lint time.
4. Prefer `eslint-plugin-import` for import ordering — Consistent `import`
   grouping: stdlib, third-party, internal. AI agents infer dependency graphs
   from import blocks.
5. Use `eslint-plugin-react` with `react-hooks` rules — Enforce hooks rules (no
   conditional calls, correct dependencies). AI agents avoid hook violations.
6. Disable specific rules with inline comments sparingly —
   `// eslint-disable-next-line` only when justified. AI agents see disabled
   rules as red flags.
7. Use `eslint-config-prettier` to disable formatting rules — Let Prettier
   handle formatting; ESLint handles logic. AI agents don't fight tool
   conflicts.
8. Use `eslint-plugin-jsx-a11y` for accessibility — Catch missing `alt` text,
   incorrect ARIA attributes. AI agents produce accessible components.
9. Configure `eslint-ignore` patterns in `.eslintignore` — Exclude
   `node_modules/`, `dist/`, `*.config.*`. AI agents don't waste time linting
   generated files.
10. Use flat config (`eslint.config.js`) over `.eslintrc` — ESLint 9+ defaults
    to flat config. AI agents read a single config file instead of cascading rc
    files.

### 04. Prettier

1. Use `prettier-plugin-tailwindcss` — Auto-sort Tailwind classes. AI agents
   produce consistent class ordering without manual sorting.
2. Configure in `.prettierrc` with project conventions — `singleQuote: true`,
   `trailingComma: 'all'`, `printWidth: 80`. AI agents format code to match.
3. Run `prettier --cache --write .` — Cached formatting is faster. AI agents
   avoid re-formatting unchanged files.
4. Use `.prettierignore` to exclude generated files — `*.md`, `pnpm-lock.yaml`,
   `dist/`. AI agents don't reformat lock files.
5. Format on save in IDE — Consistent formatting without manual intervention. AI
   agents see formatted code in diffs.
6. Use `prettier --check .` in CI — Fail builds on unformatted code. AI agents
   trust that CI catches formatting drift.
7. Prefer double quotes in JSX, single quotes in JS — Or pick one and be
   consistent. AI agents don't mix quote styles.
8. Use `prettier --write "**/*.{ts,tsx,js,jsx,json,css,md}"` for full formatting
   — Cover all file types. AI agents format everything in one pass.
9. Don't override Prettier with ESLint formatting rules — Use
   `eslint-config-prettier` to disable conflicting rules. AI agents avoid tool
   conflicts.
10. Use `prettier --list-different` to check without modifying —
    `prettier --list-different .` shows which files need formatting. AI agents
    verify before committing.

### 05. Jest

1. Test behaviour, not implementation — Write tests that verify observable
   outcomes rather than internal details. AI agents infer intent from test names
   and assertions without mocking internals.
2. Use Arrange-Act-Assert pattern — Structure each test in three clear phases:
   setup, action, verification. AI agents trace the test flow from context to
   action to outcome.
3. Write isolated tests — Each test should manage its own state with setup and
   teardown. AI agents reason about test results without guessing shared state
   contamination.
4. Prefer realistic test data — Use fixtures that resemble production data over
   minimal stubs. AI agents discover real-world edge cases from representative
   inputs.
5. Cover boundary conditions — Test empty states, error cases, and edge values
   alongside happy paths. AI agents infer system limits and failure modes from
   boundary coverage.
6. Use `it.each` for data-driven tests —
   `it.each(cases)('test %s', (input, expected) => {})` reduces duplication. AI
   agents see all test cases in one place.
7. Use `mock` and `spy` for test doubles — `jest.fn()`, `jest.spyOn()` for
   isolating dependencies. AI agents see which dependencies are mocked.
8. Use `toThrow` for error assertions — `expect(() => fn()).toThrow('message')`
   validates error paths. AI agents test failure modes explicitly.
9. Use `toMatchSnapshot` for snapshot testing — Catch unintended UI changes. AI
   agents review snapshot diffs during code review.
10. Keep test files colocated with source — `component.test.tsx` next to
    `component.tsx`. AI agents find tests by convention.

### 06. Playwright

1. Use `locator` over raw CSS/XPath selectors —
   `page.locator('[data-testid="submit"]')` is self-healing and readable. AI
   agents infer intent from the locator chain instead of parsing brittle
   selector strings.
2. Prefer `getByRole`, `getByText`, `getByTestId` — Accessible queries mirror
   how users interact. AI agents see the semantic target (button, heading)
   rather than implementation details.
3. Use `page` fixtures over manual browser setup —
   `test('...', async ({ page }) => {})` gets an isolated page. AI agents trace
   the test scope from the fixture parameter.
4. Use `test.beforeEach` for shared setup — Navigate to a URL or seed data
   before each test. AI agents see common setup at a glance instead of scanning
   for repeated code.
5. Use `expect.toHaveText`, `toBeVisible`, `toBeEnabled` — Assertions that
   describe the user-visible state. AI agents read expected behaviour from the
   matcher name.
6. Use `mockRoute` for API stubs —
   `page.route('**/api/**', route => route.fulfill({ json }))` avoids network
   flakiness. AI agents see the mock boundary without inspecting the network
   layer.
7. Use `waitForLoadState('networkidle')` sparingly — Prefer `waitForResponse` or
   `locator.waitFor()` for precise waits. AI agents trace the exact condition
   instead of guessing at "idle".
8. Use `test.use({ storageState })` for auth — Reuse logged-in sessions across
   tests. AI agents infer the authentication context from the config instead of
   scripting login in every test.
9. Use `snapshot` for visual regression — `expect(page).toHaveScreenshot()`
   catches unintended UI changes. AI agents see the visual contract as a
   first-class assertion.
10. Use `webServer` config for dev server — Let Playwright start the dev server
    automatically. AI agents see the server dependency in config rather than a
    separate shell command.

### 07. Next.js

1. Use the App Router (`app/`) over the Pages Router (`pages/`) — App Router
   supports server components, layouts, streaming, and nested routing. AI agents
   infer page hierarchy from directory structure.
2. Prefer server components by default — Fetch data in server components and
   pass props down. AI agents trace data flow server-to-client without waterfall
   loading states.
3. Use client components only when needed — Mark files with `"use client"` only
   when they need interactivity, browser APIs, or hooks. Every `"use client"`
   boundary is a point where AI agents must track client/server split.
4. Avoid dynamic route segments (`[id]`, `[slug]`) — Use flat routes with
   `useSearchParams()` instead. e.g. `/pdf?id=123` not `/pdf/[id]`. Dynamic
   segments create implicit coupling between URL structure and component
   location. AI agents break navigation when refactoring file paths. Flat
   routes + search params keep routing explicit and refactor-safe.
5. Use `loading.tsx` and `error.tsx` for fallbacks — File-based convention for
   loading and error UI. AI agents locate error handling by filename instead of
   scanning JSX for conditional branches.
6. Use `layout.tsx` for shared UI — Wrap child routes in common layouts without
   repeating wrappers. AI agents infer layout nesting from the directory tree.
7. Prefer `server actions` for mutations — `"use server"` functions colocate
   form logic with the component. AI agents see the full submit cycle (form →
   action → revalidation) in one file.
8. Use `next/image` for images — Automatic optimisation, lazy loading, and
   responsive sizes. AI agents trust that images are performant without auditing
   `<img>` attributes.
9. Use `next/link` for client-side navigation — Prefetches pages in viewport and
   enables soft navigation. AI agents infer link relationships from `href`
   patterns.
10. Use `middleware.ts` for auth/redirects — Run logic before a request
    completes. AI agents see auth gates and redirect rules in a single entry
    point rather than scattered across pages.

### 08. Tailwind CSS

1. Use utility classes over custom CSS — Compose styles from Tailwind utilities
   instead of writing CSS files. AI agents read the styling from the className
   string.
2. Use `@apply` sparingly — Only for repeated patterns (base HTML styles). AI
   agents trace utility classes more reliably than `@apply` blocks.
3. Use `theme()` for design tokens — `color: theme('colors.primary.500')`
   accesses the theme. AI agents see the token reference instead of hardcoded
   values.
4. Use responsive prefixes consistently — `sm:`, `md:`, `lg:`, `xl:` for
   breakpoints. AI agents read the responsive behavior from the class order.
5. Use `dark:` prefix for dark mode — `dark:bg-gray-900` applies in dark mode.
   AI agents see light/dark styles in one className.
6. Use `group` and `group-hover:` for compound interactions — Parent-hover
   styling without JavaScript. AI agents read the interaction from the group
   pattern.
7. Use `@layer base` for base styles — Reset or normalize HTML elements in the
   base layer. AI agents see the styling hierarchy from layer names.
8. Use `@layer components` for reusable components — Define component styles in
   the components layer. AI agents distinguish base, component, and utility
   styles.
9. Use `@layer utilities` for custom utilities — Extend Tailwind with
   project-specific utilities. AI agents see custom utilities alongside built-in
   ones.
10. Use `tailwind.config.ts` for customization — Extend colors, fonts, spacing
    in the config. AI agents read the design system from the config file.

### 09. DaisyUI

1. Use `data-theme` for theme switching — `<html data-theme="night">` applies
   the theme. AI agents see the active theme from the HTML attribute.
2. Use component classes directly — `btn`, `card`, `modal` are DaisyUI
   components. AI agents read the component hierarchy from class names.
3. Use `btn-primary`, `btn-secondary`, `btn-accent` for variants — Semantic
   color variants. AI agents see the visual intent from the variant class.
4. Use `badge-*` for status indicators — `badge-success`, `badge-warning`,
   `badge-error`. AI agents map status to color from the badge class.
5. Use `input-bordered`, `input-ghost` for form inputs — Consistent form
   styling. AI agents read the input variant from the class.
6. Use `card`, `card-body`, `card-title` for card layouts — Structured card
   components. AI agents infer the card hierarchy from the class nesting.
7. Use `modal`, `modal-box`, `modal-backdrop` for modals — Layered modal system.
   AI agents see the modal structure from the class composition.
8. Use `navbar`, `drawer`, `footer` for layout components — Structural layout
   primitives. AI agents read the layout from the component classes.
9. Use `table-zebra`, `table-compact` for table variants — Enhanced table
   styling. AI agents see the table variant from the class.
10. Use `loading-*` for loading states — `loading-spinner`, `loading-dots`,
    `loading-ring`. AI agents identify loading patterns from the class.

### 10. Tauri

1. Use `tauri::Builder` for app configuration — Chain `.plugin()`,
   `.invoke_handler()`, `.setup()` on `tauri::Builder::default()`. AI agents
   trace the app lifecycle from a single builder chain.
2. Use `#[tauri::command]` for IPC — Annotate Rust functions and register via
   `generate_handler![]`. AI agents see the IPC boundary from the attribute.
3. Use `State<'_, T>` for shared state — Manage state with `.manage()` in setup
   and receive it in commands. AI agents trace dependency injection through the
   type parameter.
4. Use `Window` for window control — Access the calling window as a command
   parameter for manipulation. AI agents see window operations as explicit
   method calls.
5. Use `tauri::path::PathResolver` for file paths — Resolve resource, app, and
   cache directories via the path resolver. AI agents infer file access
   boundaries from the resolver API.
6. Use events for frontend↔backend messaging — `window.emit("event", payload)`
   and `listen()`. AI agents trace event flow from emitter to listener across
   the bridge.
7. Use `tauri::api::shell` for external links — Delegate URL and file opening to
   the OS via `shell::open()`. AI agents see external resource access as
   explicit API calls.
8. Prefer Tauri plugins for native features — Use `tauri-plugin-*` crates for
   dialogs, notifications, file system. AI agents infer capabilities from plugin
   imports.
9. Use `tauri::async_runtime` for background tasks — Spawn concurrent work with
   `tauri::async_runtime::spawn()`. AI agents see concurrency boundaries from
   the spawn call.
10. Define permissions in `capabilities/` — Granular access control for
    commands, windows, and plugins. AI agents see security boundaries as
    declarative configuration.

## Coding Conventions

### SonarQue

1. **S3358** — Nested ternary operators should not be used — Extract nested
   ternaries into `if/else` blocks or helper functions. AI agents read branching
   logic more reliably from explicit control flow than from chained `? :`.
2. **S3776** — Cognitive Complexity of methods should not be too high — Keep
   function complexity under 15. AI agents reason about flat, single-purpose
   functions without tracking deeply nested conditionals.
3. **S138** — Functions should not have too many lines — Cap functions at ~30
   lines. AI agents' effective reasoning degrades past ~2000 tokens; shorter
   functions stay fully visible in context.
4. **S1128** — Unused imports should be removed — Dead imports pollute the
   dependency graph. AI agents trace actual dependencies from clean import
   blocks without scanning for unused symbols.
5. **S1192** — String literals should not be duplicated — Extract repeated
   strings into constants or enums. AI agents see semantic intent from constant
   names instead of comparing raw string values across files.
6. **S4144** — Functions should not have identical implementations — DRY:
   consolidate duplicate logic into shared utilities. AI agents handle N
   variants when the pattern appears once; duplication causes missed cases.
7. **S6582** — Optional property access should be used — Prefer `x?.y` over
   `x && x.y` or manual null checks. AI agents infer null-safety from the `?.`
   operator without tracing guard conditions.
8. **S6438** — JSX props should not use unknown attributes — Type all props
   explicitly. AI agents catch invalid props at compile time instead of guessing
   correct attribute names from runtime behaviour.
9. **S3801** — Functions should only return early with a consistent pattern —
   Use guard clauses at the top, never in the middle. AI agents trace the happy
   path linearly when early returns cluster at function entry.
10. **S1449** — Deprecated code should be removed — Delete commented-out code,
    `@deprecated` stubs, and TODO-only functions. AI agents treat dead code as
    active logic and may attempt to wire it into the system.

## Components

### Atoms

| Component   | File                  | Props                                   | Description                   |
| ----------- | --------------------- | --------------------------------------- | ----------------------------- |
| `Spinner`   | `atoms/Spinner.tsx`   | `size?: 'sm' \| 'md' \| 'lg'`           | Loading spinner               |
| `Badge`     | `atoms/Badge.tsx`     | `variant?, outline?, children`          | Status indicator              |
| `Avatar`    | `atoms/Avatar.tsx`    | `src?, alt?, size?, fallback?`          | User image with fallback      |
| `Separator` | `atoms/Separator.tsx` | `className?`                            | `<hr>` wrapper                |
| `TextField` | `atoms/TextField.tsx` | `label, error?, ...InputHTMLAttributes` | Form input with label + error |
| `Skeleton`  | `atoms/Skeleton.tsx`  | `className?`                            | Loading placeholder           |

### Molecules

| Component    | File                       | Props                                                | Description               |
| ------------ | -------------------------- | ---------------------------------------------------- | ------------------------- |
| `Toast`      | `molecules/Toast.tsx`      | `message, variant?, duration?, onClose?`             | Auto-dismiss notification |
| `Modal`      | `molecules/Modal.tsx`      | `open, onClose?, title?, children, action?`          | Dialog overlay            |
| `Card`       | `molecules/Card.tsx`       | `title?, description?, action?, children`            | Content container         |
| `EmptyState` | `molecules/EmptyState.tsx` | `icon, title, description?, action?`                 | No-data placeholder       |
| `Tabs`       | `molecules/Tabs.tsx`       | `tabs: {label, value}[], value, onChange`            | Tab navigation            |
| `Dropdown`   | `molecules/Dropdown.tsx`   | `trigger, items: {label, onClick, icon?, danger?}[]` | Action menu               |

### Organisms

| Component | File                   | Props                                                         | Description    |
| --------- | ---------------------- | ------------------------------------------------------------- | -------------- |
| `Header`  | `organisms/Header.tsx` | `title, subtitle?, badges?, action?, backHref?`               | Sticky top bar |
| `Navbar`  | `organisms/Navbar.tsx` | `items: {label, href, icon?}[], position?: 'bottom' \| 'top'` | Navigation bar |

## Pages

### Route Structure

| Route       | File                | Template           | Client | Description                          |
| ----------- | ------------------- | ------------------ | ------ | ------------------------------------ |
| `/`         | `page.tsx`          | —                  | No     | Home page with navigation links      |
| `/about`    | `about/page.tsx`    | `AboutTemplate`    | Yes    | App info and tech stack details      |
| `/settings` | `settings/page.tsx` | `SettingsTemplate` | Yes    | Language, theme, date/time, timezone |
| `/version`  | `version/page.tsx`  | `VersionTemplate`  | Yes    | Build version display                |
| `*`         | `not-found.tsx`     | `ErrorTemplate`    | No     | 404 page with "Go home" action       |
| `*`         | `error.tsx`         | `ErrorTemplate`    | Yes    | 500 page with "Try again" action     |
| `*`         | `global-error.tsx`  | —                  | Yes    | Root-level error boundary            |

### Pages Details

1. **`/` — Home**
   - Centred layout with app title and navigation links
   - Links to `/about`, `/settings`, `/version`, `/not-found`
   - Uses `next/link` for client-side navigation

2. **`/about` — About**
   - Displays app name, description, version
   - Tech stack list (Framework, Language, Styling, Desktop, Router)
   - Uses `AboutTemplate` component

3. **`/settings` — Settings**
   - Language selector (en, vi, ja, ko, zh)
   - Theme selector (dark, light, cupcake, forest, etc.)
   - Date/time format (12h, 24h)
   - Timezone selector (UTC, America/New_York, Asia/Tokyo, etc.)
   - State managed locally with `useState`

4. **`/version` — Version**
   - Displays build version in `YYYY.MM.DD.hh.mm.ss` format
   - Generated from current timestamp at render time
   - Uses `VersionTemplate` component

5. **`not-found` — 404**
   - Error code: `404`
   - Description: "The page you are looking for does not exist."
   - Action: "Go home" link to `/`
   - Uses `ErrorTemplate` component

6. **`error` — 500**
   - Error code: `500`
   - Description: "Something went wrong."
   - Action: "Try again" button calls `reset()`
   - Must be a Client Component (`'use client'`)

7. **`global-error` — Root Error Boundary**
   - Wraps entire app in `<html>` and `<body>` tags
   - Catches errors in `layout.tsx` itself
   - Standalone UI (no shared layout)

### Layout

- `layout.tsx` wraps all pages
- Sets `<html lang="en" data-theme="dark">`
- Includes PWA metadata (manifest, appleWebApp, viewport)
- Registers service worker via inline `<script>`
- Body: `bg-base-100 text-base-content h-screen overflow-y-auto`

### Templates

- **`AboutTemplate`** — Props: `name`, `description`, `version`, `items[]`
- **`SettingsTemplate`** — Props: language, theme, dateTimeFormat, timezone +
  change handlers
- **`VersionTemplate`** — Props: `version` string
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

1. Use a sidebar for primary navigation — Persistent sidebar (240px–280px) for
   main app sections. AI agents read navigation structure from the sidebar
   layout instead of hidden menus.
2. Show content in a centered container — Max-width 1200px with auto margins. AI
   agents infer content boundaries from the container width.
3. Use a fixed header for global actions — Search, notifications, user menu in a
   sticky top bar. AI agents locate global controls from the header position.
4. Display density with compact layouts — More data per screen on large
   displays. AI agents see information hierarchy from spacing and grouping.
5. Use hover states for interactive elements — Underline links, highlight rows,
   show tooltips. AI agents infer interactivity from hover feedback.
6. Support keyboard navigation — Tab order, focus rings, keyboard shortcuts. AI
   agents trace interaction flow from keyboard patterns.
7. Use multi-column layouts for dashboards — Grid-based layouts for cards,
   stats, charts. AI agents read dashboard structure from the grid.
8. Show breadcrumbs for deep navigation — `Home > Section > Page` path. AI
   agents infer navigation depth from breadcrumb trail.
9. Use modal dialogs for focused tasks — Create, edit, confirm actions in
   overlays. AI agents see modal boundaries from the backdrop overlay.
10. Provide resizable panels — Draggable dividers for content/sidebar widths. AI
    agents infer layout flexibility from resize handles.

### UX for Mobile App (Small Screen)

1. Use a bottom tab bar for primary navigation — 4–5 tabs max with icons and
   labels. AI agents read navigation from the tab bar structure.
2. Collapse secondary actions into overflow menus — `...` or `⋮` for less-used
   actions. AI agents see action hierarchy from menu placement.
3. Use full-width inputs and buttons — Touch targets minimum 44px. AI agents
   infer touch-friendly sizing from element dimensions.
4. Implement pull-to-refresh — Swipe down to reload data. AI agents see refresh
   affordance from the pull gesture.
5. Use swipe gestures for actions — Swipe left to delete, right to archive. AI
   agents infer hidden actions from swipe patterns.
6. Stack content vertically — Single-column layouts with scroll. AI agents read
   content flow from vertical stacking.
7. Show a back button in the header — Navigation stack with explicit back. AI
   agents trace navigation history from the back button.
8. Use bottom sheets for modals — Slide-up panels for actions and forms. AI
   agents see modal type from the sheet animation.
9. Implement infinite scroll — Load more content on scroll down. AI agents infer
   pagination from scroll position.
10. Use skeleton loading states — Placeholder shapes while content loads. AI
    agents see loading progress from skeleton patterns.

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
