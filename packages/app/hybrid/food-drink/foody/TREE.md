# TREE

```text
├── docs/
│   ├── [ARCHITECTURE.md](./docs/ARCHITECTURE.md)
│   ├── [CONTRIBUTING.md](./docs/CONTRIBUTING.md)
│   ├── [DOWNLOADS.md](./docs/DOWNLOADS.md)
│   ├── [PACKAGING.md](./docs/PACKAGING.md)
│   └── [ROADMAP.md](./docs/ROADMAP.md)
├── e2e/
│   └── [home.spec.ts](./e2e/home.spec.ts)
├── public/
│   ├── icons/
│   │   ├── [icon-128x128.png](./public/icons/icon-128x128.png)
│   │   ├── [icon-144x144.png](./public/icons/icon-144x144.png)
│   │   ├── [icon-152x152.png](./public/icons/icon-152x152.png)
│   │   ├── [icon-16x16.png](./public/icons/icon-16x16.png)
│   │   ├── [icon-180x180.png](./public/icons/icon-180x180.png)
│   │   ├── [icon-192.png](./public/icons/icon-192.png)
│   │   ├── [icon-192x192.png](./public/icons/icon-192x192.png)
│   │   ├── [icon-256x256.png](./public/icons/icon-256x256.png)
│   │   ├── [icon-32x32.png](./public/icons/icon-32x32.png)
│   │   ├── [icon-384x384.png](./public/icons/icon-384x384.png)
│   │   ├── [icon-48x48.png](./public/icons/icon-48x48.png)
│   │   ├── [icon-512.png](./public/icons/icon-512.png)
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
├── scripts/
│   └── [foods-csv-to-json.mjs](./scripts/foods-csv-to-json.mjs)
├── src/
│   ├── app/
│   │   ├── (app)/
│   │   │   ├── list/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [page.test.tsx](./src/app/(app)/list/__tests__/page.test.tsx)
│   │   │   │   └── [page.tsx](./src/app/(app)/list/page.tsx)
│   │   │   ├── randomizer/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [page.test.tsx](./src/app/(app)/randomizer/__tests__/page.test.tsx)
│   │   │   │   └── [page.tsx](./src/app/(app)/randomizer/page.tsx)
│   │   │   ├── schedule/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [page.test.tsx](./src/app/(app)/schedule/__tests__/page.test.tsx)
│   │   │   │   └── [page.tsx](./src/app/(app)/schedule/page.tsx)
│   │   │   └── wheel/
│   │   │       ├── __tests__/
│   │   │       │   └── [page.test.tsx](./src/app/(app)/wheel/__tests__/page.test.tsx)
│   │   │       └── [page.tsx](./src/app/(app)/wheel/page.tsx)
│   │   ├── (info)/
│   │   │   ├── about/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [page.test.tsx](./src/app/(info)/about/__tests__/page.test.tsx)
│   │   │   │   └── [page.tsx](./src/app/(info)/about/page.tsx)
│   │   │   ├── downloads/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [page.test.tsx](./src/app/(info)/downloads/__tests__/page.test.tsx)
│   │   │   │   └── [page.tsx](./src/app/(info)/downloads/page.tsx)
│   │   │   └── version/
│   │   │       ├── __tests__/
│   │   │       │   └── [page.test.tsx](./src/app/(info)/version/__tests__/page.test.tsx)
│   │   │       └── [page.tsx](./src/app/(info)/version/page.tsx)
│   │   ├── __tests__/
│   │   │   ├── [error.test.tsx](./src/app/__tests__/error.test.tsx)
│   │   │   ├── [forbidden.test.tsx](./src/app/__tests__/forbidden.test.tsx)
│   │   │   ├── [global-error.test.tsx](./src/app/__tests__/global-error.test.tsx)
│   │   │   ├── [loading.test.tsx](./src/app/__tests__/loading.test.tsx)
│   │   │   ├── [not-found.test.tsx](./src/app/__tests__/not-found.test.tsx)
│   │   │   ├── [page.test.tsx](./src/app/__tests__/page.test.tsx)
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
│   │   └── [unauthorized.tsx](./src/app/unauthorized.tsx)
│   ├── components/
│   │   ├── atoms/
│   │   │   ├── __tests__/
│   │   │   │   ├── [Badge.test.tsx](./src/components/atoms/__tests__/Badge.test.tsx)
│   │   │   │   ├── [Button.test.tsx](./src/components/atoms/__tests__/Button.test.tsx)
│   │   │   │   ├── [OfflineBadge.test.tsx](./src/components/atoms/__tests__/OfflineBadge.test.tsx)
│   │   │   │   └── [ThemeToggle.test.tsx](./src/components/atoms/__tests__/ThemeToggle.test.tsx)
│   │   │   ├── [Badge.tsx](./src/components/atoms/Badge.tsx)
│   │   │   ├── [Button.tsx](./src/components/atoms/Button.tsx)
│   │   │   ├── [OfflineBadge.tsx](./src/components/atoms/OfflineBadge.tsx)
│   │   │   └── [ThemeToggle.tsx](./src/components/atoms/ThemeToggle.tsx)
│   │   ├── molecules/
│   │   ├── organisms/
│   │   │   ├── __tests__/
│   │   │   │   └── [Header.test.tsx](./src/components/organisms/__tests__/Header.test.tsx)
│   │   │   ├── list/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [index.test.tsx](./src/components/organisms/list/__tests__/index.test.tsx)
│   │   │   │   └── [index.tsx](./src/components/organisms/list/index.tsx)
│   │   │   ├── randomizer/
│   │   │   │   ├── __fixtures__/
│   │   │   │   │   └── [fixtures.ts](./src/components/organisms/randomizer/__fixtures__/fixtures.ts)
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [index.test.tsx](./src/components/organisms/randomizer/__tests__/index.test.tsx)
│   │   │   │   ├── components/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [CuisineSelect.test.tsx](./src/components/organisms/randomizer/components/__tests__/CuisineSelect.test.tsx)
│   │   │   │   │   │   ├── [HowToModal.test.tsx](./src/components/organisms/randomizer/components/__tests__/HowToModal.test.tsx)
│   │   │   │   │   │   └── [Reel.test.tsx](./src/components/organisms/randomizer/components/__tests__/Reel.test.tsx)
│   │   │   │   │   ├── [CuisineSelect.tsx](./src/components/organisms/randomizer/components/CuisineSelect.tsx)
│   │   │   │   │   ├── [HowToModal.tsx](./src/components/organisms/randomizer/components/HowToModal.tsx)
│   │   │   │   │   └── [Reel.tsx](./src/components/organisms/randomizer/components/Reel.tsx)
│   │   │   │   ├── hooks/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [useFoodPicker.test.ts](./src/components/organisms/randomizer/hooks/__tests__/useFoodPicker.test.ts)
│   │   │   │   │   └── [useFoodPicker.ts](./src/components/organisms/randomizer/hooks/useFoodPicker.ts)
│   │   │   │   └── [index.tsx](./src/components/organisms/randomizer/index.tsx)
│   │   │   ├── schedule/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [index.test.tsx](./src/components/organisms/schedule/__tests__/index.test.tsx)
│   │   │   │   └── [index.tsx](./src/components/organisms/schedule/index.tsx)
│   │   │   ├── wheel/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [index.test.tsx](./src/components/organisms/wheel/__tests__/index.test.tsx)
│   │   │   │   └── [index.tsx](./src/components/organisms/wheel/index.tsx)
│   │   │   └── [Header.tsx](./src/components/organisms/Header.tsx)
│   │   └── templates/
│   │       ├── __tests__/
│   │       │   ├── [AboutTemplate.test.tsx](./src/components/templates/__tests__/AboutTemplate.test.tsx)
│   │       │   ├── [DownloadsTemplate.test.tsx](./src/components/templates/__tests__/DownloadsTemplate.test.tsx)
│   │       │   ├── [ErrorTemplate.test.tsx](./src/components/templates/__tests__/ErrorTemplate.test.tsx)
│   │       │   ├── [HomeTemplate.test.tsx](./src/components/templates/__tests__/HomeTemplate.test.tsx)
│   │       │   └── [VersionTemplate.test.tsx](./src/components/templates/__tests__/VersionTemplate.test.tsx)
│   │       ├── [AboutTemplate.tsx](./src/components/templates/AboutTemplate.tsx)
│   │       ├── [DownloadsTemplate.tsx](./src/components/templates/DownloadsTemplate.tsx)
│   │       ├── [ErrorTemplate.tsx](./src/components/templates/ErrorTemplate.tsx)
│   │       ├── [HomeTemplate.tsx](./src/components/templates/HomeTemplate.tsx)
│   │       └── [VersionTemplate.tsx](./src/components/templates/VersionTemplate.tsx)
│   ├── data/
│   │   ├── __tests__/
│   │   │   └── [constants.test.ts](./src/data/__tests__/constants.test.ts)
│   │   ├── [cuisines.ts](./src/data/cuisines.ts)
│   │   ├── [foods.csv](./src/data/foods.csv)
│   │   ├── [foods.json](./src/data/foods.json)
│   │   ├── [foods.ts](./src/data/foods.ts)
│   │   ├── [index.ts](./src/data/index.ts)
│   │   ├── [schedule.ts](./src/data/schedule.ts)
│   │   └── [types.ts](./src/data/types.ts)
│   ├── hooks/
│   │   ├── __tests__/
│   │   │   ├── [useOffline.test.ts](./src/hooks/__tests__/useOffline.test.ts)
│   │   │   ├── [useSWRegister.test.ts](./src/hooks/__tests__/useSWRegister.test.ts)
│   │   │   ├── [useTheme.test.ts](./src/hooks/__tests__/useTheme.test.ts)
│   │   │   └── [useUpdater.test.ts](./src/hooks/__tests__/useUpdater.test.ts)
│   │   ├── [useOffline.ts](./src/hooks/useOffline.ts)
│   │   ├── [useSWRegister.ts](./src/hooks/useSWRegister.ts)
│   │   ├── [useTheme.ts](./src/hooks/useTheme.ts)
│   │   └── [useUpdater.ts](./src/hooks/useUpdater.ts)
│   ├── lib/
│   │   ├── __tests__/
│   │   │   └── [progress.test.ts](./src/lib/__tests__/progress.test.ts)
│   │   ├── native/
│   │   │   ├── __tests__/
│   │   │   │   └── [index.test.ts](./src/lib/native/__tests__/index.test.ts)
│   │   │   └── [index.ts](./src/lib/native/index.ts)
│   │   └── [progress.ts](./src/lib/progress.ts)
│   ├── providers/
│   │   ├── __tests__/
│   │   │   ├── [NativeProvider.test.tsx](./src/providers/__tests__/NativeProvider.test.tsx)
│   │   │   ├── [QueryProvider.test.tsx](./src/providers/__tests__/QueryProvider.test.tsx)
│   │   │   └── [SWProvider.test.tsx](./src/providers/__tests__/SWProvider.test.tsx)
│   │   ├── [NativeProvider.tsx](./src/providers/NativeProvider.tsx)
│   │   ├── [QueryProvider.tsx](./src/providers/QueryProvider.tsx)
│   │   └── [SWProvider.tsx](./src/providers/SWProvider.tsx)
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

60 directories, 165 files
