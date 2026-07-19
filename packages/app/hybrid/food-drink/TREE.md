# TREE

```text
├── foody/
│   ├── docs/
│   │   ├── [ARCHITECTURE.md](./foody/docs/ARCHITECTURE.md)
│   │   ├── [CONTRIBUTING.md](./foody/docs/CONTRIBUTING.md)
│   │   ├── [DOWNLOADS.md](./foody/docs/DOWNLOADS.md)
│   │   ├── [PACKAGING.md](./foody/docs/PACKAGING.md)
│   │   └── [ROADMAP.md](./foody/docs/ROADMAP.md)
│   ├── e2e/
│   │   └── [home.spec.ts](./foody/e2e/home.spec.ts)
│   ├── public/
│   │   ├── icons/
│   │   │   ├── [icon-128x128.png](./foody/public/icons/icon-128x128.png)
│   │   │   ├── [icon-144x144.png](./foody/public/icons/icon-144x144.png)
│   │   │   ├── [icon-152x152.png](./foody/public/icons/icon-152x152.png)
│   │   │   ├── [icon-16x16.png](./foody/public/icons/icon-16x16.png)
│   │   │   ├── [icon-180x180.png](./foody/public/icons/icon-180x180.png)
│   │   │   ├── [icon-192.png](./foody/public/icons/icon-192.png)
│   │   │   ├── [icon-192x192.png](./foody/public/icons/icon-192x192.png)
│   │   │   ├── [icon-256x256.png](./foody/public/icons/icon-256x256.png)
│   │   │   ├── [icon-32x32.png](./foody/public/icons/icon-32x32.png)
│   │   │   ├── [icon-384x384.png](./foody/public/icons/icon-384x384.png)
│   │   │   ├── [icon-48x48.png](./foody/public/icons/icon-48x48.png)
│   │   │   ├── [icon-512.png](./foody/public/icons/icon-512.png)
│   │   │   ├── [icon-512x512.png](./foody/public/icons/icon-512x512.png)
│   │   │   ├── [icon-64x64.png](./foody/public/icons/icon-64x64.png)
│   │   │   ├── [icon-72x72.png](./foody/public/icons/icon-72x72.png)
│   │   │   ├── [icon-96x96.png](./foody/public/icons/icon-96x96.png)
│   │   │   └── [icon.svg](./foody/public/icons/icon.svg)
│   │   ├── [apple-touch-icon.png](./foody/public/apple-touch-icon.png)
│   │   ├── [favicon.ico](./foody/public/favicon.ico)
│   │   ├── [manifest.json](./foody/public/manifest.json)
│   │   ├── [robots.txt](./foody/public/robots.txt)
│   │   ├── [sitemap.xml](./foody/public/sitemap.xml)
│   │   └── [sw.js](./foody/public/sw.js)
│   ├── scripts/
│   │   └── [foods-csv-to-json.mjs](./foody/scripts/foods-csv-to-json.mjs)
│   ├── src/
│   │   ├── app/
│   │   │   ├── (app)/
│   │   │   │   ├── list/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./foody/src/app/(app)/list/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./foody/src/app/(app)/list/page.tsx)
│   │   │   │   ├── randomizer/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./foody/src/app/(app)/randomizer/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./foody/src/app/(app)/randomizer/page.tsx)
│   │   │   │   ├── schedule/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./foody/src/app/(app)/schedule/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./foody/src/app/(app)/schedule/page.tsx)
│   │   │   │   └── wheel/
│   │   │   │       ├── __tests__/
│   │   │   │       │   └── [page.test.tsx](./foody/src/app/(app)/wheel/__tests__/page.test.tsx)
│   │   │   │       └── [page.tsx](./foody/src/app/(app)/wheel/page.tsx)
│   │   │   ├── (auth)/
│   │   │   │   ├── forget-password/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./foody/src/app/(auth)/forget-password/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./foody/src/app/(auth)/forget-password/page.tsx)
│   │   │   │   ├── profile/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./foody/src/app/(auth)/profile/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./foody/src/app/(auth)/profile/page.tsx)
│   │   │   │   ├── reset-password/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./foody/src/app/(auth)/reset-password/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./foody/src/app/(auth)/reset-password/page.tsx)
│   │   │   │   ├── sign-in/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./foody/src/app/(auth)/sign-in/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./foody/src/app/(auth)/sign-in/page.tsx)
│   │   │   │   └── sign-up/
│   │   │   │       ├── __tests__/
│   │   │   │       │   └── [page.test.tsx](./foody/src/app/(auth)/sign-up/__tests__/page.test.tsx)
│   │   │   │       └── [page.tsx](./foody/src/app/(auth)/sign-up/page.tsx)
│   │   │   ├── (info)/
│   │   │   │   ├── about/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./foody/src/app/(info)/about/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./foody/src/app/(info)/about/page.tsx)
│   │   │   │   ├── downloads/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./foody/src/app/(info)/downloads/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./foody/src/app/(info)/downloads/page.tsx)
│   │   │   │   └── version/
│   │   │   │       ├── __tests__/
│   │   │   │       │   └── [page.test.tsx](./foody/src/app/(info)/version/__tests__/page.test.tsx)
│   │   │   │       └── [page.tsx](./foody/src/app/(info)/version/page.tsx)
│   │   │   ├── __tests__/
│   │   │   │   ├── [error.test.tsx](./foody/src/app/__tests__/error.test.tsx)
│   │   │   │   ├── [forbidden.test.tsx](./foody/src/app/__tests__/forbidden.test.tsx)
│   │   │   │   ├── [global-error.test.tsx](./foody/src/app/__tests__/global-error.test.tsx)
│   │   │   │   ├── [layout.test.tsx](./foody/src/app/__tests__/layout.test.tsx)
│   │   │   │   ├── [loading.test.tsx](./foody/src/app/__tests__/loading.test.tsx)
│   │   │   │   ├── [not-found.test.tsx](./foody/src/app/__tests__/not-found.test.tsx)
│   │   │   │   ├── [page.test.tsx](./foody/src/app/__tests__/page.test.tsx)
│   │   │   │   ├── [robots.test.ts](./foody/src/app/__tests__/robots.test.ts)
│   │   │   │   └── [unauthorized.test.tsx](./foody/src/app/__tests__/unauthorized.test.tsx)
│   │   │   ├── [default.tsx](./foody/src/app/default.tsx)
│   │   │   ├── [error.tsx](./foody/src/app/error.tsx)
│   │   │   ├── [favicon.ico](./foody/src/app/favicon.ico)
│   │   │   ├── [forbidden.tsx](./foody/src/app/forbidden.tsx)
│   │   │   ├── [global-error.tsx](./foody/src/app/global-error.tsx)
│   │   │   ├── [layout.tsx](./foody/src/app/layout.tsx)
│   │   │   ├── [loading.tsx](./foody/src/app/loading.tsx)
│   │   │   ├── [not-found.tsx](./foody/src/app/not-found.tsx)
│   │   │   ├── [page.tsx](./foody/src/app/page.tsx)
│   │   │   ├── [robots.ts](./foody/src/app/robots.ts)
│   │   │   └── [unauthorized.tsx](./foody/src/app/unauthorized.tsx)
│   │   ├── components/
│   │   │   ├── atoms/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [Badge.test.tsx](./foody/src/components/atoms/__tests__/Badge.test.tsx)
│   │   │   │   │   ├── [Button.test.tsx](./foody/src/components/atoms/__tests__/Button.test.tsx)
│   │   │   │   │   ├── [OfflineBadge.test.tsx](./foody/src/components/atoms/__tests__/OfflineBadge.test.tsx)
│   │   │   │   │   └── [ThemeToggle.test.tsx](./foody/src/components/atoms/__tests__/ThemeToggle.test.tsx)
│   │   │   │   ├── [Badge.tsx](./foody/src/components/atoms/Badge.tsx)
│   │   │   │   ├── [Button.tsx](./foody/src/components/atoms/Button.tsx)
│   │   │   │   ├── [OfflineBadge.tsx](./foody/src/components/atoms/OfflineBadge.tsx)
│   │   │   │   └── [ThemeToggle.tsx](./foody/src/components/atoms/ThemeToggle.tsx)
│   │   │   ├── molecules/
│   │   │   │   ├── __fixtures__/
│   │   │   │   │   └── [fixtures.ts](./foody/src/components/molecules/__fixtures__/fixtures.ts)
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [CuisineSelect.test.tsx](./foody/src/components/molecules/__tests__/CuisineSelect.test.tsx)
│   │   │   │   │   └── [Reel.test.tsx](./foody/src/components/molecules/__tests__/Reel.test.tsx)
│   │   │   │   ├── [CuisineSelect.tsx](./foody/src/components/molecules/CuisineSelect.tsx)
│   │   │   │   └── [Reel.tsx](./foody/src/components/molecules/Reel.tsx)
│   │   │   ├── organisms/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [Header.test.tsx](./foody/src/components/organisms/__tests__/Header.test.tsx)
│   │   │   │   ├── list/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [index.test.tsx](./foody/src/components/organisms/list/__tests__/index.test.tsx)
│   │   │   │   │   └── [index.tsx](./foody/src/components/organisms/list/index.tsx)
│   │   │   │   ├── randomizer/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [index.test.tsx](./foody/src/components/organisms/randomizer/__tests__/index.test.tsx)
│   │   │   │   │   └── [index.tsx](./foody/src/components/organisms/randomizer/index.tsx)
│   │   │   │   ├── schedule/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [index.test.tsx](./foody/src/components/organisms/schedule/__tests__/index.test.tsx)
│   │   │   │   │   └── [index.tsx](./foody/src/components/organisms/schedule/index.tsx)
│   │   │   │   ├── wheel/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [index.test.tsx](./foody/src/components/organisms/wheel/__tests__/index.test.tsx)
│   │   │   │   │   └── [index.tsx](./foody/src/components/organisms/wheel/index.tsx)
│   │   │   │   └── [Header.tsx](./foody/src/components/organisms/Header.tsx)
│   │   │   └── templates/
│   │   │       ├── __tests__/
│   │   │       │   ├── [AboutTemplate.test.tsx](./foody/src/components/templates/__tests__/AboutTemplate.test.tsx)
│   │   │       │   ├── [DownloadsTemplate.test.tsx](./foody/src/components/templates/__tests__/DownloadsTemplate.test.tsx)
│   │   │       │   ├── [ErrorTemplate.test.tsx](./foody/src/components/templates/__tests__/ErrorTemplate.test.tsx)
│   │   │       │   ├── [HomeTemplate.test.tsx](./foody/src/components/templates/__tests__/HomeTemplate.test.tsx)
│   │   │       │   └── [VersionTemplate.test.tsx](./foody/src/components/templates/__tests__/VersionTemplate.test.tsx)
│   │   │       ├── [AboutTemplate.tsx](./foody/src/components/templates/AboutTemplate.tsx)
│   │   │       ├── [DownloadsTemplate.tsx](./foody/src/components/templates/DownloadsTemplate.tsx)
│   │   │       ├── [ErrorTemplate.tsx](./foody/src/components/templates/ErrorTemplate.tsx)
│   │   │       ├── [HomeTemplate.tsx](./foody/src/components/templates/HomeTemplate.tsx)
│   │   │       └── [VersionTemplate.tsx](./foody/src/components/templates/VersionTemplate.tsx)
│   │   ├── data/
│   │   │   ├── __tests__/
│   │   │   │   └── [constants.test.ts](./foody/src/data/__tests__/constants.test.ts)
│   │   │   ├── [cuisines.ts](./foody/src/data/cuisines.ts)
│   │   │   ├── [foods.csv](./foody/src/data/foods.csv)
│   │   │   ├── [foods.json](./foody/src/data/foods.json)
│   │   │   ├── [foods.ts](./foody/src/data/foods.ts)
│   │   │   ├── [index.ts](./foody/src/data/index.ts)
│   │   │   ├── [schedule.ts](./foody/src/data/schedule.ts)
│   │   │   └── [types.ts](./foody/src/data/types.ts)
│   │   ├── hooks/
│   │   │   ├── __tests__/
│   │   │   │   ├── [useFoodPicker.test.ts](./foody/src/hooks/__tests__/useFoodPicker.test.ts)
│   │   │   │   ├── [useOffline.test.ts](./foody/src/hooks/__tests__/useOffline.test.ts)
│   │   │   │   ├── [useSWRegister.test.ts](./foody/src/hooks/__tests__/useSWRegister.test.ts)
│   │   │   │   ├── [useTheme.test.ts](./foody/src/hooks/__tests__/useTheme.test.ts)
│   │   │   │   └── [useUpdater.test.ts](./foody/src/hooks/__tests__/useUpdater.test.ts)
│   │   │   ├── [useFoodPicker.ts](./foody/src/hooks/useFoodPicker.ts)
│   │   │   ├── [useOffline.ts](./foody/src/hooks/useOffline.ts)
│   │   │   ├── [useSWRegister.ts](./foody/src/hooks/useSWRegister.ts)
│   │   │   ├── [useTheme.ts](./foody/src/hooks/useTheme.ts)
│   │   │   └── [useUpdater.ts](./foody/src/hooks/useUpdater.ts)
│   │   ├── lib/
│   │   │   ├── __tests__/
│   │   │   │   └── [progress.test.ts](./foody/src/lib/__tests__/progress.test.ts)
│   │   │   ├── native/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [index.test.ts](./foody/src/lib/native/__tests__/index.test.ts)
│   │   │   │   └── [index.ts](./foody/src/lib/native/index.ts)
│   │   │   └── [progress.ts](./foody/src/lib/progress.ts)
│   │   ├── providers/
│   │   │   ├── __tests__/
│   │   │   │   ├── [NativeProvider.test.tsx](./foody/src/providers/__tests__/NativeProvider.test.tsx)
│   │   │   │   ├── [QueryProvider.test.tsx](./foody/src/providers/__tests__/QueryProvider.test.tsx)
│   │   │   │   └── [SWProvider.test.tsx](./foody/src/providers/__tests__/SWProvider.test.tsx)
│   │   │   ├── [NativeProvider.tsx](./foody/src/providers/NativeProvider.tsx)
│   │   │   ├── [QueryProvider.tsx](./foody/src/providers/QueryProvider.tsx)
│   │   │   └── [SWProvider.tsx](./foody/src/providers/SWProvider.tsx)
│   │   └── styles/
│   │       ├── [base.css](./foody/src/styles/base.css)
│   │       ├── [globals.css](./foody/src/styles/globals.css)
│   │       └── [themes.css](./foody/src/styles/themes.css)
│   ├── src-tauri/
│   │   ├── capabilities/
│   │   │   └── [default.json](./foody/src-tauri/capabilities/default.json)
│   │   ├── icons/
│   │   │   ├── [128x128.png](./foody/src-tauri/icons/128x128.png)
│   │   │   ├── [128x128@2x.png](./foody/src-tauri/icons/128x128@2x.png)
│   │   │   ├── [32x32.png](./foody/src-tauri/icons/32x32.png)
│   │   │   ├── [Square107x107Logo.png](./foody/src-tauri/icons/Square107x107Logo.png)
│   │   │   ├── [Square142x142Logo.png](./foody/src-tauri/icons/Square142x142Logo.png)
│   │   │   ├── [Square150x150Logo.png](./foody/src-tauri/icons/Square150x150Logo.png)
│   │   │   ├── [Square284x284Logo.png](./foody/src-tauri/icons/Square284x284Logo.png)
│   │   │   ├── [Square30x30Logo.png](./foody/src-tauri/icons/Square30x30Logo.png)
│   │   │   ├── [Square310x310Logo.png](./foody/src-tauri/icons/Square310x310Logo.png)
│   │   │   ├── [Square44x44Logo.png](./foody/src-tauri/icons/Square44x44Logo.png)
│   │   │   ├── [Square71x71Logo.png](./foody/src-tauri/icons/Square71x71Logo.png)
│   │   │   ├── [Square89x89Logo.png](./foody/src-tauri/icons/Square89x89Logo.png)
│   │   │   ├── [StoreLogo.png](./foody/src-tauri/icons/StoreLogo.png)
│   │   │   ├── [icon.icns](./foody/src-tauri/icons/icon.icns)
│   │   │   ├── [icon.ico](./foody/src-tauri/icons/icon.ico)
│   │   │   └── [icon.png](./foody/src-tauri/icons/icon.png)
│   │   ├── src/
│   │   │   ├── [lib.rs](./foody/src-tauri/src/lib.rs)
│   │   │   └── [main.rs](./foody/src-tauri/src/main.rs)
│   │   ├── [Cargo.lock](./foody/src-tauri/Cargo.lock)
│   │   ├── [Cargo.toml](./foody/src-tauri/Cargo.toml)
│   │   ├── [build.rs](./foody/src-tauri/build.rs)
│   │   └── [tauri.conf.json](./foody/src-tauri/tauri.conf.json)
│   ├── [AGENTS.md](./foody/AGENTS.md)
│   ├── [Dockerfile](./foody/Dockerfile)
│   ├── [LICENSE](./foody/LICENSE)
│   ├── [README.md](./foody/README.md)
│   ├── [TREE.md](./foody/TREE.md)
│   ├── [docker-compose.yaml](./foody/docker-compose.yaml)
│   ├── [eslint.config.mts](./foody/eslint.config.mts)
│   ├── [jest.config.ts](./foody/jest.config.ts)
│   ├── [jest.setup.ts](./foody/jest.setup.ts)
│   ├── [next.config.ts](./foody/next.config.ts)
│   ├── [package.json](./foody/package.json)
│   ├── [playwright.config.ts](./foody/playwright.config.ts)
│   ├── [postcss.config.mjs](./foody/postcss.config.mjs)
│   └── [tsconfig.json](./foody/tsconfig.json)
├── [README.md](./README.md)
└── [TREE.md](./TREE.md)
```

69 directories, 177 files
