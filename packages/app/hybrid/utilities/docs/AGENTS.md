# Docs

Personal site for Hieu Doan: the resume at `/` and the Apps Store at `/open`
(migrated from `app/hybrid/shopping/store`, formerly under `/store`). Developer
tools that used to live here moved to the Omni monorepo (`omni/packages/web`
`/apps`).

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
    page.tsx                # Resume home — profile, experience, projects
    open/page.tsx           # Store home — Header + search, filters, app grid
    layout.tsx              # Root layout — #store-root shell inside
                            # RootLayoutClient (no Header; pages opt in)
    app/[slug]/page.tsx     # App detail pages (Header + generateStaticParams)
  components/
    routes/resume/          # Resume sections + data (ResumeView)
    organisms/
      Header.tsx            # Store header
      AppPage.tsx           # Store app detail wrapper
      layout/               # Docs sidebar Breadcrumb
        Breadcrumb.tsx
    molecules/ + atoms/     # Store UI (StoreCard, SearchBar, sections/, ...)
    templates/              # Store Error templates
    layout/RootLayoutClient.tsx
  data/downloads.json       # Store app catalog (source: data/csv/*.csv)
  lib/                      # Store logic (os detect, downloads parser, screenshots)
  hooks/                    # useSWRegister + store hooks (useSearch, useFilters, ...)
  styles/
    globals.css             # Tailwind CSS 4 + DaisyUI 5
    themes.css              # single daisyUI `hieudoanm` light theme (teal brand)
                            # + font tokens
public/
  store/                    # Store assets: icons/, og/, screenshots/ (5.9MB)
src-tauri/                  # Tauri 2 desktop config (frontendDist: ../out)
e2e/home.spec.ts            # Only remaining Playwright spec — covers /
```

## Store specifics

- Store routes live at `/open` (home) and `/app/<slug>`; internal links are
  root-relative (`/app/<slug>`), store-chrome links point at `/open`.
- Single light theme: `data-theme="hieudoanm"` on `<html>` in `app/layout.tsx` —
  standard DaisyUI theme block, teal brand.
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
