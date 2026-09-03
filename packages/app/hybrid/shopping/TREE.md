# TREE

```text
├── store/
│   ├── docs/
│   │   ├── [ARCHITECTURE.md](./store/docs/ARCHITECTURE.md)
│   │   ├── [CONTRIBUTING.md](./store/docs/CONTRIBUTING.md)
│   │   ├── [DOWNLOADS.md](./store/docs/DOWNLOADS.md)
│   │   ├── [PACKAGING.md](./store/docs/PACKAGING.md)
│   │   └── [ROADMAP.md](./store/docs/ROADMAP.md)
│   ├── e2e/
│   │   └── [store.spec.ts](./store/e2e/store.spec.ts)
│   ├── public/
│   │   ├── icons/
│   │   │   ├── [icon-128x128.png](./store/public/icons/icon-128x128.png)
│   │   │   ├── [icon-144x144.png](./store/public/icons/icon-144x144.png)
│   │   │   ├── [icon-152x152.png](./store/public/icons/icon-152x152.png)
│   │   │   ├── [icon-16x16.png](./store/public/icons/icon-16x16.png)
│   │   │   ├── [icon-180x180.png](./store/public/icons/icon-180x180.png)
│   │   │   ├── [icon-192x192.png](./store/public/icons/icon-192x192.png)
│   │   │   ├── [icon-256x256.png](./store/public/icons/icon-256x256.png)
│   │   │   ├── [icon-32x32.png](./store/public/icons/icon-32x32.png)
│   │   │   ├── [icon-384x384.png](./store/public/icons/icon-384x384.png)
│   │   │   ├── [icon-48x48.png](./store/public/icons/icon-48x48.png)
│   │   │   ├── [icon-512x512.png](./store/public/icons/icon-512x512.png)
│   │   │   ├── [icon-64x64.png](./store/public/icons/icon-64x64.png)
│   │   │   ├── [icon-72x72.png](./store/public/icons/icon-72x72.png)
│   │   │   ├── [icon-96x96.png](./store/public/icons/icon-96x96.png)
│   │   │   └── [icon.svg](./store/public/icons/icon.svg)
│   │   ├── [apple-touch-icon.png](./store/public/apple-touch-icon.png)
│   │   ├── [favicon.ico](./store/public/favicon.ico)
│   │   ├── [manifest.json](./store/public/manifest.json)
│   │   ├── [robots.txt](./store/public/robots.txt)
│   │   ├── [sitemap.xml](./store/public/sitemap.xml)
│   │   └── [sw.js](./store/public/sw.js)
│   ├── src/
│   │   ├── app/
│   │   │   ├── (app)/
│   │   │   │   └── app/
│   │   │   │       └── [slug]/
│   │   │   │           └── [page.tsx](./store/src/app/(app)/app/[slug]/page.tsx)
│   │   │   ├── (auth)/
│   │   │   │   ├── forget-password/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./store/src/app/(auth)/forget-password/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./store/src/app/(auth)/forget-password/page.tsx)
│   │   │   │   ├── profile/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./store/src/app/(auth)/profile/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./store/src/app/(auth)/profile/page.tsx)
│   │   │   │   ├── reset-password/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./store/src/app/(auth)/reset-password/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./store/src/app/(auth)/reset-password/page.tsx)
│   │   │   │   ├── sign-in/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./store/src/app/(auth)/sign-in/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./store/src/app/(auth)/sign-in/page.tsx)
│   │   │   │   └── sign-up/
│   │   │   │       ├── __tests__/
│   │   │   │       │   └── [page.test.tsx](./store/src/app/(auth)/sign-up/__tests__/page.test.tsx)
│   │   │   │       └── [page.tsx](./store/src/app/(auth)/sign-up/page.tsx)
│   │   │   ├── (info)/
│   │   │   │   ├── about/
│   │   │   │   │   └── [page.tsx](./store/src/app/(info)/about/page.tsx)
│   │   │   │   └── version/
│   │   │   │       └── [page.tsx](./store/src/app/(info)/version/page.tsx)
│   │   │   ├── __tests__/
│   │   │   │   ├── [default.test.tsx](./store/src/app/__tests__/default.test.tsx)
│   │   │   │   ├── [error.test.tsx](./store/src/app/__tests__/error.test.tsx)
│   │   │   │   ├── [forbidden.test.tsx](./store/src/app/__tests__/forbidden.test.tsx)
│   │   │   │   ├── [global-error.test.tsx](./store/src/app/__tests__/global-error.test.tsx)
│   │   │   │   ├── [layout.test.tsx](./store/src/app/__tests__/layout.test.tsx)
│   │   │   │   ├── [loading.test.tsx](./store/src/app/__tests__/loading.test.tsx)
│   │   │   │   ├── [not-found.test.tsx](./store/src/app/__tests__/not-found.test.tsx)
│   │   │   │   ├── [page.test.tsx](./store/src/app/__tests__/page.test.tsx)
│   │   │   │   ├── [robots.test.ts](./store/src/app/__tests__/robots.test.ts)
│   │   │   │   ├── [template.test.tsx](./store/src/app/__tests__/template.test.tsx)
│   │   │   │   └── [unauthorized.test.tsx](./store/src/app/__tests__/unauthorized.test.tsx)
│   │   │   ├── [default.tsx](./store/src/app/default.tsx)
│   │   │   ├── [error.tsx](./store/src/app/error.tsx)
│   │   │   ├── [favicon.ico](./store/src/app/favicon.ico)
│   │   │   ├── [forbidden.tsx](./store/src/app/forbidden.tsx)
│   │   │   ├── [global-error.tsx](./store/src/app/global-error.tsx)
│   │   │   ├── [layout.tsx](./store/src/app/layout.tsx)
│   │   │   ├── [loading.tsx](./store/src/app/loading.tsx)
│   │   │   ├── [not-found.tsx](./store/src/app/not-found.tsx)
│   │   │   ├── [page.tsx](./store/src/app/page.tsx)
│   │   │   ├── [robots.ts](./store/src/app/robots.ts)
│   │   │   ├── [sitemap.ts](./store/src/app/sitemap.ts)
│   │   │   ├── [template.tsx](./store/src/app/template.tsx)
│   │   │   └── [unauthorized.tsx](./store/src/app/unauthorized.tsx)
│   │   ├── components/
│   │   │   ├── atoms/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [FilterChip.test.tsx](./store/src/components/atoms/__tests__/FilterChip.test.tsx)
│   │   │   │   │   └── [StoreCard.test.tsx](./store/src/components/atoms/__tests__/StoreCard.test.tsx)
│   │   │   │   ├── [FilterChip.tsx](./store/src/components/atoms/FilterChip.tsx)
│   │   │   │   └── [StoreCard.tsx](./store/src/components/atoms/StoreCard.tsx)
│   │   │   ├── molecules/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [AppInfo.test.tsx](./store/src/components/molecules/__tests__/AppInfo.test.tsx)
│   │   │   │   │   ├── [AppSection.test.tsx](./store/src/components/molecules/__tests__/AppSection.test.tsx)
│   │   │   │   │   └── [SearchBar.test.tsx](./store/src/components/molecules/__tests__/SearchBar.test.tsx)
│   │   │   │   ├── sections/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [AppHeader.test.tsx](./store/src/components/molecules/sections/__tests__/AppHeader.test.tsx)
│   │   │   │   │   │   └── [ScreenshotCarousel.test.tsx](./store/src/components/molecules/sections/__tests__/ScreenshotCarousel.test.tsx)
│   │   │   │   │   ├── [AndroidGroup.tsx](./store/src/components/molecules/sections/AndroidGroup.tsx)
│   │   │   │   │   ├── [AppHeader.tsx](./store/src/components/molecules/sections/AppHeader.tsx)
│   │   │   │   │   ├── [BackLink.tsx](./store/src/components/molecules/sections/BackLink.tsx)
│   │   │   │   │   ├── [DownloadSection.tsx](./store/src/components/molecules/sections/DownloadSection.tsx)
│   │   │   │   │   ├── [ExtensionGroup.tsx](./store/src/components/molecules/sections/ExtensionGroup.tsx)
│   │   │   │   │   ├── [LinuxGroup.tsx](./store/src/components/molecules/sections/LinuxGroup.tsx)
│   │   │   │   │   ├── [MacOSGroup.tsx](./store/src/components/molecules/sections/MacOSGroup.tsx)
│   │   │   │   │   ├── [PlatformGroup.tsx](./store/src/components/molecules/sections/PlatformGroup.tsx)
│   │   │   │   │   ├── [RelatedApps.tsx](./store/src/components/molecules/sections/RelatedApps.tsx)
│   │   │   │   │   ├── [ScreenshotCarousel.tsx](./store/src/components/molecules/sections/ScreenshotCarousel.tsx)
│   │   │   │   │   └── [WindowsGroup.tsx](./store/src/components/molecules/sections/WindowsGroup.tsx)
│   │   │   │   ├── [AppInfo.tsx](./store/src/components/molecules/AppInfo.tsx)
│   │   │   │   ├── [AppSection.tsx](./store/src/components/molecules/AppSection.tsx)
│   │   │   │   ├── [CategoryFilter.tsx](./store/src/components/molecules/CategoryFilter.tsx)
│   │   │   │   ├── [DownloadRow.tsx](./store/src/components/molecules/DownloadRow.tsx)
│   │   │   │   ├── [PlatformFilter.tsx](./store/src/components/molecules/PlatformFilter.tsx)
│   │   │   │   ├── [RecentlyViewed.tsx](./store/src/components/molecules/RecentlyViewed.tsx)
│   │   │   │   ├── [SearchBar.tsx](./store/src/components/molecules/SearchBar.tsx)
│   │   │   │   └── [SortBar.tsx](./store/src/components/molecules/SortBar.tsx)
│   │   │   ├── organisms/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [AppPage.test.tsx](./store/src/components/organisms/__tests__/AppPage.test.tsx)
│   │   │   │   │   └── [Header.test.tsx](./store/src/components/organisms/__tests__/Header.test.tsx)
│   │   │   │   ├── [AppPage.tsx](./store/src/components/organisms/AppPage.tsx)
│   │   │   │   └── [Header.tsx](./store/src/components/organisms/Header.tsx)
│   │   │   └── templates/
│   │   │       ├── __tests__/
│   │   │       │   ├── [AboutTemplate.test.tsx](./store/src/components/templates/__tests__/AboutTemplate.test.tsx)
│   │   │       │   ├── [ErrorTemplate.test.tsx](./store/src/components/templates/__tests__/ErrorTemplate.test.tsx)
│   │   │       │   └── [VersionTemplate.test.tsx](./store/src/components/templates/__tests__/VersionTemplate.test.tsx)
│   │   │       ├── [AboutTemplate.tsx](./store/src/components/templates/AboutTemplate.tsx)
│   │   │       ├── [ErrorTemplate.tsx](./store/src/components/templates/ErrorTemplate.tsx)
│   │   │       └── [VersionTemplate.tsx](./store/src/components/templates/VersionTemplate.tsx)
│   │   ├── data/
│   │   │   ├── csv/
│   │   │   │   ├── [clis.csv](./store/src/data/csv/clis.csv)
│   │   │   │   ├── [extensions.csv](./store/src/data/csv/extensions.csv)
│   │   │   │   ├── [hybrid.csv](./store/src/data/csv/hybrid.csv)
│   │   │   │   └── [native.csv](./store/src/data/csv/native.csv)
│   │   │   ├── scripts/
│   │   │   │   └── [convert-csv-to-json.ts](./store/src/data/scripts/convert-csv-to-json.ts)
│   │   │   └── [downloads.json](./store/src/data/downloads.json)
│   │   ├── hooks/
│   │   │   ├── __tests__/
│   │   │   │   ├── [useBrowserDetect.test.ts](./store/src/hooks/__tests__/useBrowserDetect.test.ts)
│   │   │   │   ├── [useFilters.test.ts](./store/src/hooks/__tests__/useFilters.test.ts)
│   │   │   │   └── [useSearch.test.ts](./store/src/hooks/__tests__/useSearch.test.ts)
│   │   │   ├── [useBrowserDetect.ts](./store/src/hooks/useBrowserDetect.ts)
│   │   │   ├── [useFilters.ts](./store/src/hooks/useFilters.ts)
│   │   │   └── [useSearch.ts](./store/src/hooks/useSearch.ts)
│   │   ├── lib/
│   │   │   ├── __tests__/
│   │   │   │   ├── [browser.test.ts](./store/src/lib/__tests__/browser.test.ts)
│   │   │   │   ├── [downloads.test.ts](./store/src/lib/__tests__/downloads.test.ts)
│   │   │   │   ├── [hooks.test.ts](./store/src/lib/__tests__/hooks.test.ts)
│   │   │   │   ├── [os.detectPlatform.test.ts](./store/src/lib/__tests__/os.detectPlatform.test.ts)
│   │   │   │   ├── [os.test.ts](./store/src/lib/__tests__/os.test.ts)
│   │   │   │   └── [storage.test.ts](./store/src/lib/__tests__/storage.test.ts)
│   │   │   ├── [browser.ts](./store/src/lib/browser.ts)
│   │   │   ├── [downloads.ts](./store/src/lib/downloads.ts)
│   │   │   ├── [hooks.ts](./store/src/lib/hooks.ts)
│   │   │   ├── [icons.ts](./store/src/lib/icons.ts)
│   │   │   ├── [os.ts](./store/src/lib/os.ts)
│   │   │   ├── [storage.ts](./store/src/lib/storage.ts)
│   │   │   └── [types.ts](./store/src/lib/types.ts)
│   │   └── styles/
│   │       ├── [base.css](./store/src/styles/base.css)
│   │       ├── [globals.css](./store/src/styles/globals.css)
│   │       └── [themes.css](./store/src/styles/themes.css)
│   ├── src-tauri/
│   │   ├── capabilities/
│   │   │   └── [default.json](./store/src-tauri/capabilities/default.json)
│   │   ├── icons/
│   │   │   ├── [128x128.png](./store/src-tauri/icons/128x128.png)
│   │   │   ├── [128x128@2x.png](./store/src-tauri/icons/128x128@2x.png)
│   │   │   ├── [32x32.png](./store/src-tauri/icons/32x32.png)
│   │   │   ├── [Square107x107Logo.png](./store/src-tauri/icons/Square107x107Logo.png)
│   │   │   ├── [Square142x142Logo.png](./store/src-tauri/icons/Square142x142Logo.png)
│   │   │   ├── [Square150x150Logo.png](./store/src-tauri/icons/Square150x150Logo.png)
│   │   │   ├── [Square284x284Logo.png](./store/src-tauri/icons/Square284x284Logo.png)
│   │   │   ├── [Square30x30Logo.png](./store/src-tauri/icons/Square30x30Logo.png)
│   │   │   ├── [Square310x310Logo.png](./store/src-tauri/icons/Square310x310Logo.png)
│   │   │   ├── [Square44x44Logo.png](./store/src-tauri/icons/Square44x44Logo.png)
│   │   │   ├── [Square71x71Logo.png](./store/src-tauri/icons/Square71x71Logo.png)
│   │   │   ├── [Square89x89Logo.png](./store/src-tauri/icons/Square89x89Logo.png)
│   │   │   ├── [StoreLogo.png](./store/src-tauri/icons/StoreLogo.png)
│   │   │   ├── [icon.icns](./store/src-tauri/icons/icon.icns)
│   │   │   ├── [icon.ico](./store/src-tauri/icons/icon.ico)
│   │   │   └── [icon.png](./store/src-tauri/icons/icon.png)
│   │   ├── src/
│   │   │   ├── [lib.rs](./store/src-tauri/src/lib.rs)
│   │   │   └── [main.rs](./store/src-tauri/src/main.rs)
│   │   ├── [Cargo.lock](./store/src-tauri/Cargo.lock)
│   │   ├── [Cargo.toml](./store/src-tauri/Cargo.toml)
│   │   ├── [build.rs](./store/src-tauri/build.rs)
│   │   └── [tauri.conf.json](./store/src-tauri/tauri.conf.json)
│   ├── [AGENTS.md](./store/AGENTS.md)
│   ├── [Dockerfile](./store/Dockerfile)
│   ├── [LICENSE](./store/LICENSE)
│   ├── [README.md](./store/README.md)
│   ├── [TREE.md](./store/TREE.md)
│   ├── [docker-compose.yaml](./store/docker-compose.yaml)
│   ├── [eslint.config.mts](./store/eslint.config.mts)
│   ├── [jest.config.ts](./store/jest.config.ts)
│   ├── [jest.setup.ts](./store/jest.setup.ts)
│   ├── [next.config.ts](./store/next.config.ts)
│   ├── [package.json](./store/package.json)
│   ├── [playwright.config.ts](./store/playwright.config.ts)
│   ├── [postcss.config.mjs](./store/postcss.config.mjs)
│   └── [tsconfig.json](./store/tsconfig.json)
├── [README.md](./README.md)
└── [TREE.md](./TREE.md)
```

48 directories, 169 files
