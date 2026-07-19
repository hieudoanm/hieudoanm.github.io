# TREE

```text
├── docs/
│   ├── [ARCHITECTURE.md](./docs/ARCHITECTURE.md)
│   ├── [CONTRIBUTING.md](./docs/CONTRIBUTING.md)
│   ├── [DOWNLOADS.md](./docs/DOWNLOADS.md)
│   ├── [PACKAGING.md](./docs/PACKAGING.md)
│   └── [ROADMAP.md](./docs/ROADMAP.md)
├── e2e/
│   └── [store.spec.ts](./e2e/store.spec.ts)
├── public/
│   ├── icons/
│   │   ├── [icon-128x128.png](./public/icons/icon-128x128.png)
│   │   ├── [icon-144x144.png](./public/icons/icon-144x144.png)
│   │   ├── [icon-152x152.png](./public/icons/icon-152x152.png)
│   │   ├── [icon-16x16.png](./public/icons/icon-16x16.png)
│   │   ├── [icon-180x180.png](./public/icons/icon-180x180.png)
│   │   ├── [icon-192x192.png](./public/icons/icon-192x192.png)
│   │   ├── [icon-256x256.png](./public/icons/icon-256x256.png)
│   │   ├── [icon-32x32.png](./public/icons/icon-32x32.png)
│   │   ├── [icon-384x384.png](./public/icons/icon-384x384.png)
│   │   ├── [icon-48x48.png](./public/icons/icon-48x48.png)
│   │   ├── [icon-512x512.png](./public/icons/icon-512x512.png)
│   │   ├── [icon-64x64.png](./public/icons/icon-64x64.png)
│   │   ├── [icon-72x72.png](./public/icons/icon-72x72.png)
│   │   ├── [icon-96x96.png](./public/icons/icon-96x96.png)
│   │   └── [icon.svg](./public/icons/icon.svg)
│   ├── [apple-touch-icon.png](./public/apple-touch-icon.png)
│   ├── [favicon.ico](./public/favicon.ico)
│   ├── [manifest.json](./public/manifest.json)
│   ├── [robots.txt](./public/robots.txt)
│   ├── [sitemap.xml](./public/sitemap.xml)
│   └── [sw.js](./public/sw.js)
├── src/
│   ├── app/
│   │   ├── (app)/
│   │   │   └── app/
│   │   │       └── [slug]/
│   │   │           └── [page.tsx](./src/app/(app)/app/[slug]/page.tsx)
│   │   ├── (auth)/
│   │   │   ├── forget-password/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [page.test.tsx](./src/app/(auth)/forget-password/__tests__/page.test.tsx)
│   │   │   │   └── [page.tsx](./src/app/(auth)/forget-password/page.tsx)
│   │   │   ├── profile/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [page.test.tsx](./src/app/(auth)/profile/__tests__/page.test.tsx)
│   │   │   │   └── [page.tsx](./src/app/(auth)/profile/page.tsx)
│   │   │   ├── reset-password/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [page.test.tsx](./src/app/(auth)/reset-password/__tests__/page.test.tsx)
│   │   │   │   └── [page.tsx](./src/app/(auth)/reset-password/page.tsx)
│   │   │   ├── sign-in/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [page.test.tsx](./src/app/(auth)/sign-in/__tests__/page.test.tsx)
│   │   │   │   └── [page.tsx](./src/app/(auth)/sign-in/page.tsx)
│   │   │   └── sign-up/
│   │   │       ├── __tests__/
│   │   │       │   └── [page.test.tsx](./src/app/(auth)/sign-up/__tests__/page.test.tsx)
│   │   │       └── [page.tsx](./src/app/(auth)/sign-up/page.tsx)
│   │   ├── (info)/
│   │   │   ├── about/
│   │   │   │   └── [page.tsx](./src/app/(info)/about/page.tsx)
│   │   │   └── version/
│   │   │       └── [page.tsx](./src/app/(info)/version/page.tsx)
│   │   ├── __tests__/
│   │   │   ├── [default.test.tsx](./src/app/__tests__/default.test.tsx)
│   │   │   ├── [error.test.tsx](./src/app/__tests__/error.test.tsx)
│   │   │   ├── [forbidden.test.tsx](./src/app/__tests__/forbidden.test.tsx)
│   │   │   ├── [global-error.test.tsx](./src/app/__tests__/global-error.test.tsx)
│   │   │   ├── [layout.test.tsx](./src/app/__tests__/layout.test.tsx)
│   │   │   ├── [loading.test.tsx](./src/app/__tests__/loading.test.tsx)
│   │   │   ├── [not-found.test.tsx](./src/app/__tests__/not-found.test.tsx)
│   │   │   ├── [page.test.tsx](./src/app/__tests__/page.test.tsx)
│   │   │   ├── [robots.test.ts](./src/app/__tests__/robots.test.ts)
│   │   │   ├── [template.test.tsx](./src/app/__tests__/template.test.tsx)
│   │   │   └── [unauthorized.test.tsx](./src/app/__tests__/unauthorized.test.tsx)
│   │   ├── [default.tsx](./src/app/default.tsx)
│   │   ├── [error.tsx](./src/app/error.tsx)
│   │   ├── [favicon.ico](./src/app/favicon.ico)
│   │   ├── [forbidden.tsx](./src/app/forbidden.tsx)
│   │   ├── [global-error.tsx](./src/app/global-error.tsx)
│   │   ├── [layout.tsx](./src/app/layout.tsx)
│   │   ├── [loading.tsx](./src/app/loading.tsx)
│   │   ├── [not-found.tsx](./src/app/not-found.tsx)
│   │   ├── [page.tsx](./src/app/page.tsx)
│   │   ├── [robots.ts](./src/app/robots.ts)
│   │   ├── [sitemap.ts](./src/app/sitemap.ts)
│   │   ├── [template.tsx](./src/app/template.tsx)
│   │   └── [unauthorized.tsx](./src/app/unauthorized.tsx)
│   ├── components/
│   │   ├── atoms/
│   │   │   ├── __tests__/
│   │   │   │   ├── [FilterChip.test.tsx](./src/components/atoms/__tests__/FilterChip.test.tsx)
│   │   │   │   └── [StoreCard.test.tsx](./src/components/atoms/__tests__/StoreCard.test.tsx)
│   │   │   ├── [FilterChip.tsx](./src/components/atoms/FilterChip.tsx)
│   │   │   └── [StoreCard.tsx](./src/components/atoms/StoreCard.tsx)
│   │   ├── molecules/
│   │   │   ├── __tests__/
│   │   │   │   ├── [AppInfo.test.tsx](./src/components/molecules/__tests__/AppInfo.test.tsx)
│   │   │   │   ├── [AppSection.test.tsx](./src/components/molecules/__tests__/AppSection.test.tsx)
│   │   │   │   └── [SearchBar.test.tsx](./src/components/molecules/__tests__/SearchBar.test.tsx)
│   │   │   ├── sections/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [AppHeader.test.tsx](./src/components/molecules/sections/__tests__/AppHeader.test.tsx)
│   │   │   │   │   └── [ScreenshotCarousel.test.tsx](./src/components/molecules/sections/__tests__/ScreenshotCarousel.test.tsx)
│   │   │   │   ├── [AndroidGroup.tsx](./src/components/molecules/sections/AndroidGroup.tsx)
│   │   │   │   ├── [AppHeader.tsx](./src/components/molecules/sections/AppHeader.tsx)
│   │   │   │   ├── [BackLink.tsx](./src/components/molecules/sections/BackLink.tsx)
│   │   │   │   ├── [DownloadSection.tsx](./src/components/molecules/sections/DownloadSection.tsx)
│   │   │   │   ├── [ExtensionGroup.tsx](./src/components/molecules/sections/ExtensionGroup.tsx)
│   │   │   │   ├── [LinuxGroup.tsx](./src/components/molecules/sections/LinuxGroup.tsx)
│   │   │   │   ├── [MacOSGroup.tsx](./src/components/molecules/sections/MacOSGroup.tsx)
│   │   │   │   ├── [PlatformGroup.tsx](./src/components/molecules/sections/PlatformGroup.tsx)
│   │   │   │   ├── [RelatedApps.tsx](./src/components/molecules/sections/RelatedApps.tsx)
│   │   │   │   ├── [ScreenshotCarousel.tsx](./src/components/molecules/sections/ScreenshotCarousel.tsx)
│   │   │   │   └── [WindowsGroup.tsx](./src/components/molecules/sections/WindowsGroup.tsx)
│   │   │   ├── [AppInfo.tsx](./src/components/molecules/AppInfo.tsx)
│   │   │   ├── [AppSection.tsx](./src/components/molecules/AppSection.tsx)
│   │   │   ├── [CategoryFilter.tsx](./src/components/molecules/CategoryFilter.tsx)
│   │   │   ├── [DownloadRow.tsx](./src/components/molecules/DownloadRow.tsx)
│   │   │   ├── [PlatformFilter.tsx](./src/components/molecules/PlatformFilter.tsx)
│   │   │   ├── [RecentlyViewed.tsx](./src/components/molecules/RecentlyViewed.tsx)
│   │   │   ├── [SearchBar.tsx](./src/components/molecules/SearchBar.tsx)
│   │   │   └── [SortBar.tsx](./src/components/molecules/SortBar.tsx)
│   │   ├── organisms/
│   │   │   ├── __tests__/
│   │   │   │   ├── [AppPage.test.tsx](./src/components/organisms/__tests__/AppPage.test.tsx)
│   │   │   │   └── [Header.test.tsx](./src/components/organisms/__tests__/Header.test.tsx)
│   │   │   ├── [AppPage.tsx](./src/components/organisms/AppPage.tsx)
│   │   │   └── [Header.tsx](./src/components/organisms/Header.tsx)
│   │   └── templates/
│   │       ├── __tests__/
│   │       │   ├── [AboutTemplate.test.tsx](./src/components/templates/__tests__/AboutTemplate.test.tsx)
│   │       │   ├── [ErrorTemplate.test.tsx](./src/components/templates/__tests__/ErrorTemplate.test.tsx)
│   │       │   └── [VersionTemplate.test.tsx](./src/components/templates/__tests__/VersionTemplate.test.tsx)
│   │       ├── [AboutTemplate.tsx](./src/components/templates/AboutTemplate.tsx)
│   │       ├── [ErrorTemplate.tsx](./src/components/templates/ErrorTemplate.tsx)
│   │       └── [VersionTemplate.tsx](./src/components/templates/VersionTemplate.tsx)
│   ├── data/
│   │   ├── csv/
│   │   │   ├── [clis.csv](./src/data/csv/clis.csv)
│   │   │   ├── [extensions.csv](./src/data/csv/extensions.csv)
│   │   │   ├── [hybrid.csv](./src/data/csv/hybrid.csv)
│   │   │   └── [native.csv](./src/data/csv/native.csv)
│   │   ├── scripts/
│   │   │   └── [convert-csv-to-json.ts](./src/data/scripts/convert-csv-to-json.ts)
│   │   └── [downloads.json](./src/data/downloads.json)
│   ├── hooks/
│   │   ├── __tests__/
│   │   │   ├── [useBrowserDetect.test.ts](./src/hooks/__tests__/useBrowserDetect.test.ts)
│   │   │   ├── [useFilters.test.ts](./src/hooks/__tests__/useFilters.test.ts)
│   │   │   └── [useSearch.test.ts](./src/hooks/__tests__/useSearch.test.ts)
│   │   ├── [useBrowserDetect.ts](./src/hooks/useBrowserDetect.ts)
│   │   ├── [useFilters.ts](./src/hooks/useFilters.ts)
│   │   └── [useSearch.ts](./src/hooks/useSearch.ts)
│   ├── lib/
│   │   ├── __tests__/
│   │   │   ├── [browser.test.ts](./src/lib/__tests__/browser.test.ts)
│   │   │   ├── [downloads.test.ts](./src/lib/__tests__/downloads.test.ts)
│   │   │   ├── [hooks.test.ts](./src/lib/__tests__/hooks.test.ts)
│   │   │   ├── [os.detectPlatform.test.ts](./src/lib/__tests__/os.detectPlatform.test.ts)
│   │   │   ├── [os.test.ts](./src/lib/__tests__/os.test.ts)
│   │   │   └── [storage.test.ts](./src/lib/__tests__/storage.test.ts)
│   │   ├── [browser.ts](./src/lib/browser.ts)
│   │   ├── [downloads.ts](./src/lib/downloads.ts)
│   │   ├── [hooks.ts](./src/lib/hooks.ts)
│   │   ├── [icons.ts](./src/lib/icons.ts)
│   │   ├── [os.ts](./src/lib/os.ts)
│   │   ├── [storage.ts](./src/lib/storage.ts)
│   │   └── [types.ts](./src/lib/types.ts)
│   └── styles/
│       ├── [base.css](./src/styles/base.css)
│       ├── [globals.css](./src/styles/globals.css)
│       └── [themes.css](./src/styles/themes.css)
├── src-tauri/
│   ├── capabilities/
│   │   └── [default.json](./src-tauri/capabilities/default.json)
│   ├── icons/
│   │   ├── [128x128.png](./src-tauri/icons/128x128.png)
│   │   ├── [128x128@2x.png](./src-tauri/icons/128x128@2x.png)
│   │   ├── [32x32.png](./src-tauri/icons/32x32.png)
│   │   ├── [Square107x107Logo.png](./src-tauri/icons/Square107x107Logo.png)
│   │   ├── [Square142x142Logo.png](./src-tauri/icons/Square142x142Logo.png)
│   │   ├── [Square150x150Logo.png](./src-tauri/icons/Square150x150Logo.png)
│   │   ├── [Square284x284Logo.png](./src-tauri/icons/Square284x284Logo.png)
│   │   ├── [Square30x30Logo.png](./src-tauri/icons/Square30x30Logo.png)
│   │   ├── [Square310x310Logo.png](./src-tauri/icons/Square310x310Logo.png)
│   │   ├── [Square44x44Logo.png](./src-tauri/icons/Square44x44Logo.png)
│   │   ├── [Square71x71Logo.png](./src-tauri/icons/Square71x71Logo.png)
│   │   ├── [Square89x89Logo.png](./src-tauri/icons/Square89x89Logo.png)
│   │   ├── [StoreLogo.png](./src-tauri/icons/StoreLogo.png)
│   │   ├── [icon.icns](./src-tauri/icons/icon.icns)
│   │   ├── [icon.ico](./src-tauri/icons/icon.ico)
│   │   └── [icon.png](./src-tauri/icons/icon.png)
│   ├── src/
│   │   ├── [lib.rs](./src-tauri/src/lib.rs)
│   │   └── [main.rs](./src-tauri/src/main.rs)
│   ├── [Cargo.lock](./src-tauri/Cargo.lock)
│   ├── [Cargo.toml](./src-tauri/Cargo.toml)
│   ├── [build.rs](./src-tauri/build.rs)
│   └── [tauri.conf.json](./src-tauri/tauri.conf.json)
├── [AGENTS.md](./AGENTS.md)
├── [Dockerfile](./Dockerfile)
├── [LICENSE](./LICENSE)
├── [README.md](./README.md)
├── [TREE.md](./TREE.md)
├── [docker-compose.yaml](./docker-compose.yaml)
├── [eslint.config.mts](./eslint.config.mts)
├── [jest.config.ts](./jest.config.ts)
├── [jest.setup.ts](./jest.setup.ts)
├── [next.config.ts](./next.config.ts)
├── [package.json](./package.json)
├── [playwright.config.ts](./playwright.config.ts)
├── [postcss.config.mjs](./postcss.config.mjs)
└── [tsconfig.json](./tsconfig.json)
```

47 directories, 167 files
