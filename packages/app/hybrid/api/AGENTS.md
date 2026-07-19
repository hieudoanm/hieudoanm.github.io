# API Client — Minimal API Client

## Table of Contents

- [API Client — Minimal API Client](#api-client--minimal-api-client)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
    - [Tech Stack](#tech-stack)
    - [Pages](#pages)
    - [File Structure](#file-structure)
  - [Development](#development)
    - [Key Conventions](#key-conventions)
    - [Features](#features)
      - [Business Features](#business-features)
        - [Request Composer](#request-composer)
        - [Request Configuration](#request-configuration)
        - [Authentication](#authentication)
        - [Response Viewer](#response-viewer)
        - [Request History](#request-history)
      - [Technical Features](#technical-features)
        - [HTTP Execution](#http-execution)
        - [Data & Persistence](#data--persistence)
        - [UI & Theming](#ui--theming)
        - [Page Transitions](#page-transitions)
        - [Offline Support](#offline-support)
        - [Accessibility](#accessibility)
  - [Design](#design)
    - [UX for Mobile](#ux-for-mobile)
      - [Layout](#layout)
      - [Forms](#forms)
      - [Lists & Scrolling](#lists--scrolling)
      - [Feedback](#feedback)
      - [Theming](#theming)
  - [Roadmap](#roadmap)
    - [Product Roadmap](#product-roadmap)
      - [Phase 1 — Core UI](#phase-1--core-ui)
      - [Phase 2 — Enhanced UX](#phase-2--enhanced-ux)
      - [Phase 3 — Advanced Features](#phase-3--advanced-features)
      - [Phase 4 — Organization](#phase-4--organization)

---

## Overview

### Tech Stack

1. **pnpm** (always pin dependencies version)
2. **ESLint** (with next)
3. **Prettier** (with tailwindcss)
4. **Jest** (coverage >= 80%)
5. **Playwright** (coverage all page level)
6. **Next.js 16** (App Router, static export)
7. **TypeScript 6** (strict mode)
8. **Tailwind CSS 4** + **DaisyUI 5** (32 themes, dark default)
9. **Tauri 2** (desktop shell)
10. **localStorage** persistence (history + draft)

### Pages

| #   | Route       | Page       | Key Features                                  |
| --- | ----------- | ---------- | --------------------------------------------- |
| 1   | `/`         | API Client | Method + URL composer, tabs, response viewer  |
| 2   | `/settings` | Settings   | Theme picker, data management (clear history) |
| 3   | `/about`    | About      | Stack info for the app                        |
| 4   | `/version`  | Version    | Build version display, copy to clipboard      |

### File Structure

```terminal
src/
  app/                # Next.js App Router pages
  pages/              # Pages Router API route (REST /api/rest/*)
  server/             # REST route registry + handlers (docs, health, info, status, version, proxy)
  components/
    atoms/            # MethodSelect, UrlInput, SendButton, KeyValueRow, StatusBadge
    molecules/        # RequestComposer, KeyValueEditor, BodyEditor, AuthEditor, HistoryEntryItem
    organisms/        # ApiClient, RequestTabs, ResponsePanel, HistoryList
    templates/        # AboutTemplate, VersionTemplate, ErrorTemplate, PageTransition
  hooks/              # useSWRegister
  lib/                # http.ts (execution + history), format.ts (display helpers)
  providers/          # SWProvider
  styles/             # globals.css (Tailwind + DaisyUI)
  types/              # TypeScript interfaces (api-client.ts)
src-tauri/            # Tauri desktop (Rust)
e2e/                  # Playwright E2E tests (home, api-client, navigation, settings, version, about)
```

## E2E Testing

- **Config**: `playwright.config.ts` — chromium project, `pnpm dev` web server
  on `localhost:3000`
- **Run**: `pnpm test:e2e` (or `pnpm test:e2e:ui` for the interactive runner)
- **Screenshots**: every test captures a full-page screenshot into `e2e/images/`
- **Network mocking**: the `api-client.spec.ts` tests intercept requests to
  `https://api.example.com/**` with `page.route` (fulfill/abort) so no external
  network is needed

---

## Development

### Key Conventions

- Arrow functions for all function declarations and component exports
- `FC` type for components
- `@/*` path aliases
- DaisyUI component classes (`btn` + `btn-*`, `input`, `select`, `badge`,
  `tabs`)
- Dark theme as default (`data-theme="night"`)
- `prettier-plugin-tailwindcss` for class sorting
- `react-icons/fi` (Feather) for icons
- Small focused files (<= 200 lines) and short functions (<= 30 lines)
- No global/singleton state — pure functions in `lib/` accept inputs and return
  outputs
- `console.*` stripped in production via `compiler.removeConsole`

### Features

#### Business Features

##### Request Composer

- **Method selector**: Dropdown for GET/POST/PUT/PATCH/DELETE/HEAD/OPTIONS with
  color-coded badges
- **URL input**: Enter-to-send, auto-completes nothing, mono font
- **Send button**: Primary button with spinner while in flight

##### Request Configuration

- **Params tab**: Key/value rows with enabled checkboxes, appended to URL as
  query string with proper encoding
- **Headers tab**: Key/value rows; custom headers override built-in auth headers
- **Body tab**: Textarea with one-click "Beautify JSON" (pretty-print) for valid
  JSON
- **Auth tab**: No Auth / Bearer Token / Basic Auth; token and credentials are
  optional until filled

##### Authentication

- **Bearer**: `Authorization: Bearer <token>` header
- **Basic**: `Authorization: Basic base64(user:pass)` header
- Both skipped when the corresponding fields are blank

##### Response Viewer

- **Status badge**: Color-coded by class (2xx success, 3xx warning, 4xx/5xx
  error)
- **Meta row**: Status text, elapsed time (ms), response size (B/KB/MB/GB)
- **Body/Headers toggle**: Pretty-printed JSON body (fallback to raw text) or
  headers table

##### Request History

- **History list**: Sidebar on desktop, toggleable on mobile; newest first
- **Reuse**: Click an entry to reload the request config
- **Relative time**: "just now", "5m ago", "3h ago", "2d ago"
- **Clear**: One-click wipe of history (and draft) from Settings

#### Technical Features

##### HTTP Execution

- **`executeRequest(config)`**: `fetch` wrapper producing `ResponseMeta`
  (status, statusText, url, headers, body, timeMs, sizeBytes)
- **`buildUrl(url, params)`**: Pure function; encodes keys/values, appends to
  existing query with `&`
- **`buildHeaders(config)`**: Pure function; auth + custom headers
- **`resolveBody(config)`**: Body only for methods that accept one
  (POST/PUT/PATCH/DELETE)
- **Errors**: Network failures surface as message in the response panel

##### Data & Persistence

- **localStorage keys**: `api-client:history` (limit 50 entries),
  `api-client:draft`, `api-client:theme`
- **Draft autosave**: Request config persists across reloads via effect
- **Corrupt data**: Safe fallbacks — bad JSON returns empty arrays/defaults

##### UI & Theming

- **32 DaisyUI themes**: Theme picker on Settings persists to `data-theme`
  attribute and localStorage
- **Responsive layout**: History sidebar hidden below `lg:` with mobile toggle
  button

##### Page Transitions

- **`PageTransition` component**: Tailwind
  `animate-in fade-in slide-in-from-bottom-3` wrapper
- **Applied via pages**: Smooth transitions on route change

##### Offline Support

- **PWA**: Service worker (`sw.js`) caches `/`, `/about/`, `/settings/`,
  `/version/` under `api-client-v1`
- **Fully client-side**: Requests go through the browser `fetch` API, no server
  needed

##### Accessibility

- **ARIA labels**: Method select, URL input, auth inputs, key/value rows,
  toggle/remove buttons
- **Keyboard**: Enter sends the request from the URL field

---

## Design

### UX for Mobile

#### Layout

- **Client on mobile**: Composer + tabs + response stacked vertically; history
  hidden behind toggle
- **Settings**: Sticky header with back button, cards below

#### Forms

- **Compact controls**: `input-sm`, `select-sm`, `btn-sm` scale the client for
  small screens
- **Send button**: Primary-colored with send icon; shows spinner while loading

#### Lists & Scrolling

- **History list**: Scrollable, truncated URLs, newest first
- **Response body**: `overflow-x-auto` with `break-all` for long lines

#### Feedback

- **Loading**: Spinner in send button + centered spinner in response panel
- **Error**: `alert alert-error` in the response panel
- **Empty states**: "Send a request to see the response here." and "No requests
  yet"

#### Theming

- **Dark mode default** (`data-theme="night"`)
- **Theme picker** on Settings page persists choice

---

## Roadmap

### Product Roadmap

#### Phase 1 — Core UI

> Foundation: composer, tabs, response viewer

- [x] Method + URL composer with send
- [x] Params/Headers key-value editors
- [x] Body editor with JSON beautify
- [x] Response panel with status, time, size, headers
- [x] Local request history

#### Phase 2 — Enhanced UX

> Polish: authentication, persistence

- [x] Bearer and Basic auth
- [x] Draft autosave
- [ ] Keyboard shortcuts (Ctrl+Enter send, Ctrl+L clear)
- [ ] Copy response body button
- [ ] Response preview by content-type

#### Phase 3 — Advanced Features

> Power: variables, collections, export

- [ ] Environment variables (`{{var}}` substitution)
- [ ] Request collections (saved, named, grouped)
- [ ] Export/import requests as JSON
- [ ] Request timeout and redirect control
- [ ] Response diffing between requests

#### Phase 4 — Organization

> Scale: tabs, search, codegen

- [ ] Multiple request tabs
- [ ] History search and filtering
- [ ] Code generation (curl, fetch, fetch-ts)
- [ ] Schema preview (OpenAPI import)
