# Roadmap

## Phase 1 — Core Store ✅

- [x] Project scaffold (Next.js 16, TypeScript 6, Tailwind CSS 4, DaisyUI 5)
- [x] Nothing theme (OLED black + red accent)
- [x] App data pipeline (CSV → JSON, `parseDownloads()`)
- [x] OS detection (`navigator.userAgent`, `detectPlatform()`)
- [x] Home page with responsive grid
- [x] StoreCard component (emoji icons, platform badges, download buttons)
- [x] Search with `useDeferredValue` debouncing
- [x] Filter tabs (All / Hybrid / Native) with counts
- [x] Detail page with `generateStaticParams` for 44 apps
- [x] AppInfo component (download options, recommended badge, platform list)
- [x] Header with nav and theme toggle
- [x] Info pages (About, Version)
- [x] Error shells (error, global-error, not-found, forbidden, unauthorized)
- [x] Page transition template
- [x] Static export (`output: export`)
- [x] Service worker and PWA manifest
- [x] Jest config with 80% coverage threshold
- [x] Playwright E2E tests (9 specs)

## Phase 2 — Polish

- [ ] App screenshots / preview images on detail pages
- [ ] Category tags on cards (games, productivity, medical, etc.)
- [x] Sort options (name, category)
- [x] Grid/list view toggle
- [ ] Animated page transitions (Framer Motion)
- [x] Keyboard navigation (press `/` to focus search, `Escape` to clear)
- [x] Share button (Web Share API + clipboard fallback)
- [x] Favorite / wishlist (localStorage)
- [x] Recently viewed apps (localStorage)
- [x] Dark/light theme persistence (localStorage)

## Phase 3 — Rich Catalog

- [ ] App ratings and reviews (mock data)
- [x] Version history per app
- [ ] App screenshots gallery
- [x] System requirements display
- [x] File size and download count display
- [ ] Release notes per download
- [x] Related apps suggestions
- [ ] Featured / promoted apps section
- [ ] Trending apps (based on view count)

## Phase 4 — Search & Discovery

- [ ] Full-text search with highlighting
- [x] Search suggestions / autocomplete
- [x] Advanced filters (platform, category)
- [ ] Search history (localStorage)
- [ ] URL-based deep linking for search queries
- [x] SEO metadata per app (Open Graph, Twitter cards)
- [x] Sitemap generation for all app pages
- [ ] RSS feed for new apps

## Phase 5 — Platform & Ecosystem

- [ ] Tauri desktop builds (macOS, Windows, Linux)
- [ ] Android APK / AAB builds
- [ ] Auto-update pipeline (Tauri updater)
- [ ] macOS notarization and code signing
- [ ] Windows code signing
- [ ] Google Play Store listing
- [ ] Apple App Store listing
- [ ] Analytics dashboard (views, downloads per app)
- [ ] Admin panel for managing app catalog
- [ ] API endpoint for programmatic access to catalog data
