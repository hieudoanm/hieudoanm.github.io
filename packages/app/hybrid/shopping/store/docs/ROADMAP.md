# Roadmap

## Phase 1 — Core Store ✅

- [x] Project scaffold (Next.js 16, TypeScript 6, Tailwind CSS 4, DaisyUI 5)
- [x] Store theme (`store-dark` / `store-light`, dark teal base, teal + pink
      accents)
- [x] App data pipeline (CSV → JSON, `parseDownloads()`)
- [x] OS detection (`navigator.userAgent`, `detectPlatform()`)
- [x] Home page with responsive grid
- [x] StoreCard component (emoji icons, platform badges, download buttons)
- [x] Search with `useDeferredValue` debouncing
- [x] Platform and category filter chips
- [x] Detail page with `generateStaticParams` for 57 apps
- [x] AppInfo component (download options, recommended badge, platform list)
- [x] Header with nav and theme toggle
- [x] Info pages (About, Version)
- [x] Error shells (error, global-error, not-found, forbidden, unauthorized)
- [x] Page transition template
- [x] Static export (`output: export`)
- [x] Service worker and PWA manifest
- [x] Jest config with 80% coverage threshold
- [x] Playwright E2E tests (12 test cases)

## Phase 2 — Polish

- [x] App screenshots / preview images on detail pages
- [x] Category tags on cards
- [x] Sort options (name, category)
- [x] Grid/list view toggle
- [x] Animated page transitions (Motion)
- [x] Keyboard navigation (press `/` to focus search, `Escape` to clear)
- [x] Share button (Web Share API + clipboard fallback)
- [x] Favorite / wishlist (localStorage)
- [x] Recently viewed apps (localStorage)
- [x] Dark/light theme persistence (localStorage)

## Phase 3 — Rich Catalog

- [ ] App ratings and reviews (mock data)
- [ ] Version history per app
- [x] App screenshots gallery
- [x] System requirements display
- [x] File size display
- [ ] Download count display
- [ ] Release notes per download
- [x] Related apps suggestions
- [x] Featured / promoted apps section
- [ ] Trending apps (based on view count)

## Phase 4 — Search & Discovery

- [x] Full-text search with highlighting
- [x] Search suggestions / autocomplete
- [x] Advanced filters (platform, category)
- [x] Search history (localStorage)
- [x] URL-based deep linking for search queries
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
