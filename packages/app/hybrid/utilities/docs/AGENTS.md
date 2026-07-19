# Docs

Personal site for Hieu Doan: a resume page at `/` and the Apps Store at `/store`
(migrated from `app/hybrid/shopping/store`). Developer tools that used to live
here moved to the Omni monorepo (`omni/packages/web` `/apps`).

## Build & Test

```bash
pnpm dev                    # Start Next.js dev server
pnpm tsc --noEmit           # TypeScript type check
pnpm lint                   # ESLint
pnpm build                  # Static export to out/
pnpm test                   # Jest unit tests
pnpm test:e2e               # Playwright (home.spec.ts only)
```

## File Structure

```text
src/
  app/
    page.tsx                # Resume (formerly the about page)
    layout.tsx              # Root layout (data-theme="nothing")
    store/
      layout.tsx            # Store shell — #store-root data-theme="store-dark" + Header
      page.tsx              # Store home — search, filters, app grid
      app/[slug]/page.tsx   # App detail pages (19 apps, generateStaticParams)
      about|downloads|version/  # Store info pages
  components/
    routes/resume/          # Resume sections, data, periods, projects
    organisms/
      Header.tsx            # Store header (theme toggle scoped to #store-root)
      AppPage.tsx           # Store app detail wrapper
      layout/               # Docs sidebar Breadcrumb
        Breadcrumb.tsx
    molecules/ + atoms/     # Store UI (StoreCard, SearchBar, sections/, ...)
    templates/              # Store About/Downloads/Version/Error templates
    layout/RootLayoutClient.tsx
  content/                  # Store static content (about, downloads, version)
  data/downloads.json       # Store app catalog (source: data/csv/*.csv)
  lib/                      # Store logic (os detect, downloads parser, screenshots)
  hooks/                    # useSWRegister + store hooks (useSearch, useFilters, ...)
  styles/
    globals.css             # Tailwind CSS 4 + DaisyUI 5
    themes.css              # daisyUI themes: docs (nothing/light/dark/luxury)
                            # + store (store-dark/store-light, scoped via data-theme)
public/
  store/                    # Store assets: icons/, og/, screenshots/ (5.9MB)
src-tauri/                  # Tauri 2 desktop config (frontendDist: ../out)
e2e/home.spec.ts            # Only remaining Playwright spec — covers /
```

## Store specifics

- All store routes live under `/store`; internal links are `/store`-prefixed.
- Store theme is scoped: `data-theme="store-dark"` on `#store-root` in
  `app/store/layout.tsx` — it does NOT leak into the resume page. The Header
  theme toggle writes to `#store-root` (falls back to `documentElement`).
- `lib/screenshots.ts` serves screenshots locally from `/store/screenshots`.
- App catalog: edit `data/csv/*.csv`, regenerate `data/downloads.json` with
  `data/scripts/convert-csv-to-json.ts`.

## Coding Rules

1. Arrow functions only — no `function` keyword
2. Explicit types on all exports — never `any`
3. TailwindCSS v4 + DaisyUI v5 — no CSS modules, no styled-components
4. Icons: `react-icons/pi` (Phosphor) / `react-icons/fi` (store header)
5. Keep files under 200 lines, functions under 30 lines
6. Mobile-first responsive design
