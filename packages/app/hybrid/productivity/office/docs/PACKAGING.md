# Packaging

## Hybrid App Strategy

This package produces three deployment targets from a single codebase:

| Target    | Build Command      | Output                          |
| --------- | ------------------ | ------------------------------- |
| Web       | `pnpm build`       | `out/` (static HTML/CSS/JS)     |
| Desktop   | `pnpm tauri build` | Native binaries (`.dmg`, `.msi`, `.deb`) |
| Mobile    | `pnpm tauri build` | iOS/Android app bundles         |

## Static Export

The app is configured for static export (`output: 'export'` in `next.config.ts`).
All pages are pre-rendered at build time — no server required. Client-side data
(csv, markdown, tasks) is persisted in the browser (localStorage / IndexedDB).

## Tauri Configuration

Tauri wraps the static web build into a native desktop/mobile app.

- `src-tauri/tauri.conf.json` — app metadata, window config, bundle settings
- `src-tauri/Cargo.toml` — Rust dependencies
- `src-tauri/src/lib.rs` — Tauri plugin setup
- `src-tauri/src/main.rs` — Desktop entry point
- `src-tauri/capabilities/default.json` — Permission grants

## PWA Manifest

`public/manifest.json` configures the web app for installation:

- `name`: "Office"
- `short_name`: "Office"
- Icons: 16×16 through 512×512

## Icon Generation

Icons are generated from `public/icons/icon.svg`:

```bash
# Generate PNG icons from SVG
npx @aspect-build/aspect-icons public/icons/icon.svg \
  --output public/icons \
  --sizes 16,32,48,64,72,96,128,144,152,180,192,256,384,512
```

Tauri icons are generated separately for desktop bundles:

```bash
# Generate Tauri icons
npx @tauri-apps/cli icon public/icons/icon-512x512.png \
  --output src-tauri/icons
```

## Build Commands

| Command            | Description                    |
| ------------------ | ------------------------------ |
| `pnpm build`       | Next.js static export          |
| `pnpm dev`         | Next.js dev server (Turbopack) |
| `pnpm typecheck`   | `tsc --noEmit`                 |
| `pnpm test`        | Jest unit tests                |
| `pnpm test:e2e`    | Playwright end-to-end tests    |
| `pnpm lint`        | ESLint with fixes              |
| `pnpm format`      | Prettier auto-fix              |
| `pnpm tauri dev`   | Tauri desktop dev mode         |
| `pnpm tauri build` | Tauri desktop production build |

`next.config.ts` also enables the React Compiler (`reactCompiler: true`),
strict mode, and strips console output in production.

## Distribution

- **Web**: Deploy `out/` to any static host (GitHub Pages, Netlify, Vercel)
- **Desktop**: Attach `.dmg`/`.msi`/`.deb` to GitHub Releases
- **Mobile**: Submit to App Store / Google Play via Tauri Mobile