# TREE

```text
├── chemistry/
│   ├── docs/
│   │   ├── [ARCHITECTURE.md](./chemistry/docs/ARCHITECTURE.md)
│   │   ├── [CONTRIBUTING.md](./chemistry/docs/CONTRIBUTING.md)
│   │   ├── [DOWNLOADS.md](./chemistry/docs/DOWNLOADS.md)
│   │   ├── [PACKAGING.md](./chemistry/docs/PACKAGING.md)
│   │   └── [ROADMAP.md](./chemistry/docs/ROADMAP.md)
│   ├── e2e/
│   │   └── [home.spec.ts](./chemistry/e2e/home.spec.ts)
│   ├── public/
│   │   ├── icons/
│   │   │   ├── [icon-128x128.png](./chemistry/public/icons/icon-128x128.png)
│   │   │   ├── [icon-144x144.png](./chemistry/public/icons/icon-144x144.png)
│   │   │   ├── [icon-152x152.png](./chemistry/public/icons/icon-152x152.png)
│   │   │   ├── [icon-16x16.png](./chemistry/public/icons/icon-16x16.png)
│   │   │   ├── [icon-180x180.png](./chemistry/public/icons/icon-180x180.png)
│   │   │   ├── [icon-192.png](./chemistry/public/icons/icon-192.png)
│   │   │   ├── [icon-192x192.png](./chemistry/public/icons/icon-192x192.png)
│   │   │   ├── [icon-256x256.png](./chemistry/public/icons/icon-256x256.png)
│   │   │   ├── [icon-32x32.png](./chemistry/public/icons/icon-32x32.png)
│   │   │   ├── [icon-384x384.png](./chemistry/public/icons/icon-384x384.png)
│   │   │   ├── [icon-48x48.png](./chemistry/public/icons/icon-48x48.png)
│   │   │   ├── [icon-512.png](./chemistry/public/icons/icon-512.png)
│   │   │   ├── [icon-512x512.png](./chemistry/public/icons/icon-512x512.png)
│   │   │   ├── [icon-64x64.png](./chemistry/public/icons/icon-64x64.png)
│   │   │   ├── [icon-72x72.png](./chemistry/public/icons/icon-72x72.png)
│   │   │   ├── [icon-96x96.png](./chemistry/public/icons/icon-96x96.png)
│   │   │   └── [icon.svg](./chemistry/public/icons/icon.svg)
│   │   ├── [apple-touch-icon.png](./chemistry/public/apple-touch-icon.png)
│   │   ├── [favicon.ico](./chemistry/public/favicon.ico)
│   │   ├── [manifest.json](./chemistry/public/manifest.json)
│   │   ├── [robots.txt](./chemistry/public/robots.txt)
│   │   ├── [sitemap.xml](./chemistry/public/sitemap.xml)
│   │   └── [sw.js](./chemistry/public/sw.js)
│   ├── src/
│   │   ├── app/
│   │   │   ├── (auth)/
│   │   │   │   ├── forget-password/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./chemistry/src/app/(auth)/forget-password/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./chemistry/src/app/(auth)/forget-password/page.tsx)
│   │   │   │   ├── profile/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./chemistry/src/app/(auth)/profile/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./chemistry/src/app/(auth)/profile/page.tsx)
│   │   │   │   ├── reset-password/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./chemistry/src/app/(auth)/reset-password/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./chemistry/src/app/(auth)/reset-password/page.tsx)
│   │   │   │   ├── sign-in/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./chemistry/src/app/(auth)/sign-in/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./chemistry/src/app/(auth)/sign-in/page.tsx)
│   │   │   │   └── sign-up/
│   │   │   │       ├── __tests__/
│   │   │   │       │   └── [page.test.tsx](./chemistry/src/app/(auth)/sign-up/__tests__/page.test.tsx)
│   │   │   │       └── [page.tsx](./chemistry/src/app/(auth)/sign-up/page.tsx)
│   │   │   ├── (info)/
│   │   │   │   ├── about/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./chemistry/src/app/(info)/about/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./chemistry/src/app/(info)/about/page.tsx)
│   │   │   │   ├── downloads/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./chemistry/src/app/(info)/downloads/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./chemistry/src/app/(info)/downloads/page.tsx)
│   │   │   │   └── version/
│   │   │   │       ├── __tests__/
│   │   │   │       │   └── [page.test.tsx](./chemistry/src/app/(info)/version/__tests__/page.test.tsx)
│   │   │   │       └── [page.tsx](./chemistry/src/app/(info)/version/page.tsx)
│   │   │   ├── __tests__/
│   │   │   │   ├── [error.test.tsx](./chemistry/src/app/__tests__/error.test.tsx)
│   │   │   │   ├── [forbidden.test.tsx](./chemistry/src/app/__tests__/forbidden.test.tsx)
│   │   │   │   ├── [global-error.test.tsx](./chemistry/src/app/__tests__/global-error.test.tsx)
│   │   │   │   ├── [layout.test.tsx](./chemistry/src/app/__tests__/layout.test.tsx)
│   │   │   │   ├── [loading.test.tsx](./chemistry/src/app/__tests__/loading.test.tsx)
│   │   │   │   ├── [not-found.test.tsx](./chemistry/src/app/__tests__/not-found.test.tsx)
│   │   │   │   ├── [page.test.tsx](./chemistry/src/app/__tests__/page.test.tsx)
│   │   │   │   ├── [robots.test.ts](./chemistry/src/app/__tests__/robots.test.ts)
│   │   │   │   └── [unauthorized.test.tsx](./chemistry/src/app/__tests__/unauthorized.test.tsx)
│   │   │   ├── periodic-table/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [page.test.tsx](./chemistry/src/app/periodic-table/__tests__/page.test.tsx)
│   │   │   │   └── [page.tsx](./chemistry/src/app/periodic-table/page.tsx)
│   │   │   ├── [default.tsx](./chemistry/src/app/default.tsx)
│   │   │   ├── [error.tsx](./chemistry/src/app/error.tsx)
│   │   │   ├── [favicon.ico](./chemistry/src/app/favicon.ico)
│   │   │   ├── [forbidden.tsx](./chemistry/src/app/forbidden.tsx)
│   │   │   ├── [global-error.tsx](./chemistry/src/app/global-error.tsx)
│   │   │   ├── [layout.tsx](./chemistry/src/app/layout.tsx)
│   │   │   ├── [loading.tsx](./chemistry/src/app/loading.tsx)
│   │   │   ├── [not-found.tsx](./chemistry/src/app/not-found.tsx)
│   │   │   ├── [page.tsx](./chemistry/src/app/page.tsx)
│   │   │   ├── [robots.ts](./chemistry/src/app/robots.ts)
│   │   │   └── [unauthorized.tsx](./chemistry/src/app/unauthorized.tsx)
│   │   ├── components/
│   │   │   ├── atoms/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [Badge.test.tsx](./chemistry/src/components/atoms/__tests__/Badge.test.tsx)
│   │   │   │   │   ├── [OfflineBadge.test.tsx](./chemistry/src/components/atoms/__tests__/OfflineBadge.test.tsx)
│   │   │   │   │   └── [ThemeToggle.test.tsx](./chemistry/src/components/atoms/__tests__/ThemeToggle.test.tsx)
│   │   │   │   ├── [Badge.tsx](./chemistry/src/components/atoms/Badge.tsx)
│   │   │   │   ├── [Button.tsx](./chemistry/src/components/atoms/Button.tsx)
│   │   │   │   ├── [OfflineBadge.tsx](./chemistry/src/components/atoms/OfflineBadge.tsx)
│   │   │   │   └── [ThemeToggle.tsx](./chemistry/src/components/atoms/ThemeToggle.tsx)
│   │   │   ├── features/
│   │   │   │   └── periodic-table/
│   │   │   │       └── [index.tsx](./chemistry/src/components/features/periodic-table/index.tsx)
│   │   │   └── templates/
│   │   │       ├── __tests__/
│   │   │       │   ├── [AboutTemplate.test.tsx](./chemistry/src/components/templates/__tests__/AboutTemplate.test.tsx)
│   │   │       │   ├── [DownloadsTemplate.test.tsx](./chemistry/src/components/templates/__tests__/DownloadsTemplate.test.tsx)
│   │   │       │   ├── [ErrorTemplate.test.tsx](./chemistry/src/components/templates/__tests__/ErrorTemplate.test.tsx)
│   │   │       │   ├── [HomeTemplate.test.tsx](./chemistry/src/components/templates/__tests__/HomeTemplate.test.tsx)
│   │   │       │   └── [VersionTemplate.test.tsx](./chemistry/src/components/templates/__tests__/VersionTemplate.test.tsx)
│   │   │       ├── [AboutTemplate.tsx](./chemistry/src/components/templates/AboutTemplate.tsx)
│   │   │       ├── [DownloadsTemplate.tsx](./chemistry/src/components/templates/DownloadsTemplate.tsx)
│   │   │       ├── [ErrorTemplate.tsx](./chemistry/src/components/templates/ErrorTemplate.tsx)
│   │   │       ├── [HomeTemplate.tsx](./chemistry/src/components/templates/HomeTemplate.tsx)
│   │   │       └── [VersionTemplate.tsx](./chemistry/src/components/templates/VersionTemplate.tsx)
│   │   ├── data/
│   │   │   └── [periodic-table.ts](./chemistry/src/data/periodic-table.ts)
│   │   ├── hooks/
│   │   │   ├── __tests__/
│   │   │   │   ├── [useOffline.test.ts](./chemistry/src/hooks/__tests__/useOffline.test.ts)
│   │   │   │   ├── [useProgress.test.ts](./chemistry/src/hooks/__tests__/useProgress.test.ts)
│   │   │   │   ├── [useSWRegister.test.ts](./chemistry/src/hooks/__tests__/useSWRegister.test.ts)
│   │   │   │   ├── [useTheme.test.ts](./chemistry/src/hooks/__tests__/useTheme.test.ts)
│   │   │   │   └── [useUpdater.test.ts](./chemistry/src/hooks/__tests__/useUpdater.test.ts)
│   │   │   ├── [useOffline.ts](./chemistry/src/hooks/useOffline.ts)
│   │   │   ├── [useProgress.ts](./chemistry/src/hooks/useProgress.ts)
│   │   │   ├── [useSWRegister.ts](./chemistry/src/hooks/useSWRegister.ts)
│   │   │   ├── [useTheme.ts](./chemistry/src/hooks/useTheme.ts)
│   │   │   └── [useUpdater.ts](./chemistry/src/hooks/useUpdater.ts)
│   │   ├── lib/
│   │   │   ├── __tests__/
│   │   │   │   └── [progress.test.ts](./chemistry/src/lib/__tests__/progress.test.ts)
│   │   │   ├── native/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [index.test.ts](./chemistry/src/lib/native/__tests__/index.test.ts)
│   │   │   │   └── [index.ts](./chemistry/src/lib/native/index.ts)
│   │   │   └── [progress.ts](./chemistry/src/lib/progress.ts)
│   │   ├── providers/
│   │   │   ├── __tests__/
│   │   │   │   ├── [NativeProvider.test.tsx](./chemistry/src/providers/__tests__/NativeProvider.test.tsx)
│   │   │   │   ├── [QueryProvider.test.tsx](./chemistry/src/providers/__tests__/QueryProvider.test.tsx)
│   │   │   │   └── [SWProvider.test.tsx](./chemistry/src/providers/__tests__/SWProvider.test.tsx)
│   │   │   ├── [NativeProvider.tsx](./chemistry/src/providers/NativeProvider.tsx)
│   │   │   ├── [QueryProvider.tsx](./chemistry/src/providers/QueryProvider.tsx)
│   │   │   └── [SWProvider.tsx](./chemistry/src/providers/SWProvider.tsx)
│   │   └── styles/
│   │       ├── [base.css](./chemistry/src/styles/base.css)
│   │       ├── [globals.css](./chemistry/src/styles/globals.css)
│   │       └── [themes.css](./chemistry/src/styles/themes.css)
│   ├── src-tauri/
│   │   ├── capabilities/
│   │   │   └── [default.json](./chemistry/src-tauri/capabilities/default.json)
│   │   ├── icons/
│   │   │   ├── [128x128.png](./chemistry/src-tauri/icons/128x128.png)
│   │   │   ├── [128x128@2x.png](./chemistry/src-tauri/icons/128x128@2x.png)
│   │   │   ├── [32x32.png](./chemistry/src-tauri/icons/32x32.png)
│   │   │   ├── [Square107x107Logo.png](./chemistry/src-tauri/icons/Square107x107Logo.png)
│   │   │   ├── [Square142x142Logo.png](./chemistry/src-tauri/icons/Square142x142Logo.png)
│   │   │   ├── [Square150x150Logo.png](./chemistry/src-tauri/icons/Square150x150Logo.png)
│   │   │   ├── [Square284x284Logo.png](./chemistry/src-tauri/icons/Square284x284Logo.png)
│   │   │   ├── [Square30x30Logo.png](./chemistry/src-tauri/icons/Square30x30Logo.png)
│   │   │   ├── [Square310x310Logo.png](./chemistry/src-tauri/icons/Square310x310Logo.png)
│   │   │   ├── [Square44x44Logo.png](./chemistry/src-tauri/icons/Square44x44Logo.png)
│   │   │   ├── [Square71x71Logo.png](./chemistry/src-tauri/icons/Square71x71Logo.png)
│   │   │   ├── [Square89x89Logo.png](./chemistry/src-tauri/icons/Square89x89Logo.png)
│   │   │   ├── [StoreLogo.png](./chemistry/src-tauri/icons/StoreLogo.png)
│   │   │   ├── [icon.icns](./chemistry/src-tauri/icons/icon.icns)
│   │   │   ├── [icon.ico](./chemistry/src-tauri/icons/icon.ico)
│   │   │   └── [icon.png](./chemistry/src-tauri/icons/icon.png)
│   │   ├── src/
│   │   │   ├── [lib.rs](./chemistry/src-tauri/src/lib.rs)
│   │   │   └── [main.rs](./chemistry/src-tauri/src/main.rs)
│   │   ├── [Cargo.lock](./chemistry/src-tauri/Cargo.lock)
│   │   ├── [Cargo.toml](./chemistry/src-tauri/Cargo.toml)
│   │   ├── [build.rs](./chemistry/src-tauri/build.rs)
│   │   └── [tauri.conf.json](./chemistry/src-tauri/tauri.conf.json)
│   ├── [AGENTS.md](./chemistry/AGENTS.md)
│   ├── [Dockerfile](./chemistry/Dockerfile)
│   ├── [LICENSE](./chemistry/LICENSE)
│   ├── [README.md](./chemistry/README.md)
│   ├── [TREE.md](./chemistry/TREE.md)
│   ├── [docker-compose.yaml](./chemistry/docker-compose.yaml)
│   ├── [eslint.config.mts](./chemistry/eslint.config.mts)
│   ├── [jest.config.ts](./chemistry/jest.config.ts)
│   ├── [jest.setup.ts](./chemistry/jest.setup.ts)
│   ├── [next.config.ts](./chemistry/next.config.ts)
│   ├── [package.json](./chemistry/package.json)
│   ├── [playwright.config.ts](./chemistry/playwright.config.ts)
│   ├── [postcss.config.mjs](./chemistry/postcss.config.mjs)
│   └── [tsconfig.json](./chemistry/tsconfig.json)
├── economics/
│   ├── docs/
│   │   ├── [ARCHITECTURE.md](./economics/docs/ARCHITECTURE.md)
│   │   ├── [CONTRIBUTING.md](./economics/docs/CONTRIBUTING.md)
│   │   ├── [DOWNLOADS.md](./economics/docs/DOWNLOADS.md)
│   │   ├── [PACKAGING.md](./economics/docs/PACKAGING.md)
│   │   └── [ROADMAP.md](./economics/docs/ROADMAP.md)
│   ├── e2e/
│   │   └── [home.spec.ts](./economics/e2e/home.spec.ts)
│   ├── public/
│   │   ├── icons/
│   │   │   ├── [icon-128x128.png](./economics/public/icons/icon-128x128.png)
│   │   │   ├── [icon-144x144.png](./economics/public/icons/icon-144x144.png)
│   │   │   ├── [icon-152x152.png](./economics/public/icons/icon-152x152.png)
│   │   │   ├── [icon-16x16.png](./economics/public/icons/icon-16x16.png)
│   │   │   ├── [icon-180x180.png](./economics/public/icons/icon-180x180.png)
│   │   │   ├── [icon-192.png](./economics/public/icons/icon-192.png)
│   │   │   ├── [icon-192x192.png](./economics/public/icons/icon-192x192.png)
│   │   │   ├── [icon-256x256.png](./economics/public/icons/icon-256x256.png)
│   │   │   ├── [icon-32x32.png](./economics/public/icons/icon-32x32.png)
│   │   │   ├── [icon-384x384.png](./economics/public/icons/icon-384x384.png)
│   │   │   ├── [icon-48x48.png](./economics/public/icons/icon-48x48.png)
│   │   │   ├── [icon-512.png](./economics/public/icons/icon-512.png)
│   │   │   ├── [icon-512x512.png](./economics/public/icons/icon-512x512.png)
│   │   │   ├── [icon-64x64.png](./economics/public/icons/icon-64x64.png)
│   │   │   ├── [icon-72x72.png](./economics/public/icons/icon-72x72.png)
│   │   │   ├── [icon-96x96.png](./economics/public/icons/icon-96x96.png)
│   │   │   └── [icon.svg](./economics/public/icons/icon.svg)
│   │   ├── [apple-touch-icon.png](./economics/public/apple-touch-icon.png)
│   │   ├── [favicon.ico](./economics/public/favicon.ico)
│   │   ├── [manifest.json](./economics/public/manifest.json)
│   │   ├── [robots.txt](./economics/public/robots.txt)
│   │   ├── [sitemap.xml](./economics/public/sitemap.xml)
│   │   └── [sw.js](./economics/public/sw.js)
│   ├── src/
│   │   ├── app/
│   │   │   ├── (auth)/
│   │   │   │   ├── forget-password/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./economics/src/app/(auth)/forget-password/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./economics/src/app/(auth)/forget-password/page.tsx)
│   │   │   │   ├── profile/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./economics/src/app/(auth)/profile/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./economics/src/app/(auth)/profile/page.tsx)
│   │   │   │   ├── reset-password/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./economics/src/app/(auth)/reset-password/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./economics/src/app/(auth)/reset-password/page.tsx)
│   │   │   │   ├── sign-in/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./economics/src/app/(auth)/sign-in/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./economics/src/app/(auth)/sign-in/page.tsx)
│   │   │   │   └── sign-up/
│   │   │   │       ├── __tests__/
│   │   │   │       │   └── [page.test.tsx](./economics/src/app/(auth)/sign-up/__tests__/page.test.tsx)
│   │   │   │       └── [page.tsx](./economics/src/app/(auth)/sign-up/page.tsx)
│   │   │   ├── (games)/
│   │   │   │   └── prisoners-dilemma/
│   │   │   │       ├── __tests__/
│   │   │   │       │   └── [page.test.tsx](./economics/src/app/(games)/prisoners-dilemma/__tests__/page.test.tsx)
│   │   │   │       └── [page.tsx](./economics/src/app/(games)/prisoners-dilemma/page.tsx)
│   │   │   ├── (info)/
│   │   │   │   ├── about/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./economics/src/app/(info)/about/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./economics/src/app/(info)/about/page.tsx)
│   │   │   │   ├── downloads/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./economics/src/app/(info)/downloads/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./economics/src/app/(info)/downloads/page.tsx)
│   │   │   │   └── version/
│   │   │   │       ├── __tests__/
│   │   │   │       │   └── [page.test.tsx](./economics/src/app/(info)/version/__tests__/page.test.tsx)
│   │   │   │       └── [page.tsx](./economics/src/app/(info)/version/page.tsx)
│   │   │   ├── __tests__/
│   │   │   │   ├── [error.test.tsx](./economics/src/app/__tests__/error.test.tsx)
│   │   │   │   ├── [forbidden.test.tsx](./economics/src/app/__tests__/forbidden.test.tsx)
│   │   │   │   ├── [global-error.test.tsx](./economics/src/app/__tests__/global-error.test.tsx)
│   │   │   │   ├── [layout.test.tsx](./economics/src/app/__tests__/layout.test.tsx)
│   │   │   │   ├── [loading.test.tsx](./economics/src/app/__tests__/loading.test.tsx)
│   │   │   │   ├── [not-found.test.tsx](./economics/src/app/__tests__/not-found.test.tsx)
│   │   │   │   ├── [page.test.tsx](./economics/src/app/__tests__/page.test.tsx)
│   │   │   │   ├── [robots.test.ts](./economics/src/app/__tests__/robots.test.ts)
│   │   │   │   └── [unauthorized.test.tsx](./economics/src/app/__tests__/unauthorized.test.tsx)
│   │   │   ├── [default.tsx](./economics/src/app/default.tsx)
│   │   │   ├── [error.tsx](./economics/src/app/error.tsx)
│   │   │   ├── [favicon.ico](./economics/src/app/favicon.ico)
│   │   │   ├── [forbidden.tsx](./economics/src/app/forbidden.tsx)
│   │   │   ├── [global-error.tsx](./economics/src/app/global-error.tsx)
│   │   │   ├── [layout.tsx](./economics/src/app/layout.tsx)
│   │   │   ├── [loading.tsx](./economics/src/app/loading.tsx)
│   │   │   ├── [not-found.tsx](./economics/src/app/not-found.tsx)
│   │   │   ├── [page.tsx](./economics/src/app/page.tsx)
│   │   │   ├── [robots.ts](./economics/src/app/robots.ts)
│   │   │   └── [unauthorized.tsx](./economics/src/app/unauthorized.tsx)
│   │   ├── components/
│   │   │   ├── atoms/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [Badge.test.tsx](./economics/src/components/atoms/__tests__/Badge.test.tsx)
│   │   │   │   │   ├── [OfflineBadge.test.tsx](./economics/src/components/atoms/__tests__/OfflineBadge.test.tsx)
│   │   │   │   │   └── [ThemeToggle.test.tsx](./economics/src/components/atoms/__tests__/ThemeToggle.test.tsx)
│   │   │   │   ├── [Badge.tsx](./economics/src/components/atoms/Badge.tsx)
│   │   │   │   ├── [Button.tsx](./economics/src/components/atoms/Button.tsx)
│   │   │   │   ├── [OfflineBadge.tsx](./economics/src/components/atoms/OfflineBadge.tsx)
│   │   │   │   └── [ThemeToggle.tsx](./economics/src/components/atoms/ThemeToggle.tsx)
│   │   │   └── templates/
│   │   │       ├── __tests__/
│   │   │       │   ├── [AboutTemplate.test.tsx](./economics/src/components/templates/__tests__/AboutTemplate.test.tsx)
│   │   │       │   ├── [DownloadsTemplate.test.tsx](./economics/src/components/templates/__tests__/DownloadsTemplate.test.tsx)
│   │   │       │   ├── [ErrorTemplate.test.tsx](./economics/src/components/templates/__tests__/ErrorTemplate.test.tsx)
│   │   │       │   ├── [HomeTemplate.test.tsx](./economics/src/components/templates/__tests__/HomeTemplate.test.tsx)
│   │   │       │   └── [VersionTemplate.test.tsx](./economics/src/components/templates/__tests__/VersionTemplate.test.tsx)
│   │   │       ├── [AboutTemplate.tsx](./economics/src/components/templates/AboutTemplate.tsx)
│   │   │       ├── [DownloadsTemplate.tsx](./economics/src/components/templates/DownloadsTemplate.tsx)
│   │   │       ├── [ErrorTemplate.tsx](./economics/src/components/templates/ErrorTemplate.tsx)
│   │   │       ├── [HomeTemplate.tsx](./economics/src/components/templates/HomeTemplate.tsx)
│   │   │       └── [VersionTemplate.tsx](./economics/src/components/templates/VersionTemplate.tsx)
│   │   ├── games/
│   │   │   └── prisoners-dilemma/
│   │   │       ├── __tests__/
│   │   │       │   ├── [game.test.ts](./economics/src/games/prisoners-dilemma/__tests__/game.test.ts)
│   │   │       │   └── [index.test.tsx](./economics/src/games/prisoners-dilemma/__tests__/index.test.tsx)
│   │   │       ├── utils/
│   │   │       │   └── [game.ts](./economics/src/games/prisoners-dilemma/utils/game.ts)
│   │   │       ├── [constants.ts](./economics/src/games/prisoners-dilemma/constants.ts)
│   │   │       ├── [index.tsx](./economics/src/games/prisoners-dilemma/index.tsx)
│   │   │       └── [types.ts](./economics/src/games/prisoners-dilemma/types.ts)
│   │   ├── hooks/
│   │   │   ├── __tests__/
│   │   │   │   ├── [useOffline.test.ts](./economics/src/hooks/__tests__/useOffline.test.ts)
│   │   │   │   ├── [useProgress.test.ts](./economics/src/hooks/__tests__/useProgress.test.ts)
│   │   │   │   ├── [useSWRegister.test.ts](./economics/src/hooks/__tests__/useSWRegister.test.ts)
│   │   │   │   ├── [useTheme.test.ts](./economics/src/hooks/__tests__/useTheme.test.ts)
│   │   │   │   └── [useUpdater.test.ts](./economics/src/hooks/__tests__/useUpdater.test.ts)
│   │   │   ├── [useOffline.ts](./economics/src/hooks/useOffline.ts)
│   │   │   ├── [useProgress.ts](./economics/src/hooks/useProgress.ts)
│   │   │   ├── [useSWRegister.ts](./economics/src/hooks/useSWRegister.ts)
│   │   │   ├── [useTheme.ts](./economics/src/hooks/useTheme.ts)
│   │   │   └── [useUpdater.ts](./economics/src/hooks/useUpdater.ts)
│   │   ├── lib/
│   │   │   ├── __tests__/
│   │   │   │   └── [progress.test.ts](./economics/src/lib/__tests__/progress.test.ts)
│   │   │   ├── native/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [index.test.ts](./economics/src/lib/native/__tests__/index.test.ts)
│   │   │   │   └── [index.ts](./economics/src/lib/native/index.ts)
│   │   │   └── [progress.ts](./economics/src/lib/progress.ts)
│   │   ├── providers/
│   │   │   ├── __tests__/
│   │   │   │   ├── [NativeProvider.test.tsx](./economics/src/providers/__tests__/NativeProvider.test.tsx)
│   │   │   │   ├── [QueryProvider.test.tsx](./economics/src/providers/__tests__/QueryProvider.test.tsx)
│   │   │   │   └── [SWProvider.test.tsx](./economics/src/providers/__tests__/SWProvider.test.tsx)
│   │   │   ├── [NativeProvider.tsx](./economics/src/providers/NativeProvider.tsx)
│   │   │   ├── [QueryProvider.tsx](./economics/src/providers/QueryProvider.tsx)
│   │   │   └── [SWProvider.tsx](./economics/src/providers/SWProvider.tsx)
│   │   └── styles/
│   │       ├── [base.css](./economics/src/styles/base.css)
│   │       ├── [globals.css](./economics/src/styles/globals.css)
│   │       └── [themes.css](./economics/src/styles/themes.css)
│   ├── src-tauri/
│   │   ├── capabilities/
│   │   │   └── [default.json](./economics/src-tauri/capabilities/default.json)
│   │   ├── icons/
│   │   │   ├── [128x128.png](./economics/src-tauri/icons/128x128.png)
│   │   │   ├── [128x128@2x.png](./economics/src-tauri/icons/128x128@2x.png)
│   │   │   ├── [32x32.png](./economics/src-tauri/icons/32x32.png)
│   │   │   ├── [Square107x107Logo.png](./economics/src-tauri/icons/Square107x107Logo.png)
│   │   │   ├── [Square142x142Logo.png](./economics/src-tauri/icons/Square142x142Logo.png)
│   │   │   ├── [Square150x150Logo.png](./economics/src-tauri/icons/Square150x150Logo.png)
│   │   │   ├── [Square284x284Logo.png](./economics/src-tauri/icons/Square284x284Logo.png)
│   │   │   ├── [Square30x30Logo.png](./economics/src-tauri/icons/Square30x30Logo.png)
│   │   │   ├── [Square310x310Logo.png](./economics/src-tauri/icons/Square310x310Logo.png)
│   │   │   ├── [Square44x44Logo.png](./economics/src-tauri/icons/Square44x44Logo.png)
│   │   │   ├── [Square71x71Logo.png](./economics/src-tauri/icons/Square71x71Logo.png)
│   │   │   ├── [Square89x89Logo.png](./economics/src-tauri/icons/Square89x89Logo.png)
│   │   │   ├── [StoreLogo.png](./economics/src-tauri/icons/StoreLogo.png)
│   │   │   ├── [icon.icns](./economics/src-tauri/icons/icon.icns)
│   │   │   ├── [icon.ico](./economics/src-tauri/icons/icon.ico)
│   │   │   └── [icon.png](./economics/src-tauri/icons/icon.png)
│   │   ├── src/
│   │   │   ├── [lib.rs](./economics/src-tauri/src/lib.rs)
│   │   │   └── [main.rs](./economics/src-tauri/src/main.rs)
│   │   ├── [Cargo.lock](./economics/src-tauri/Cargo.lock)
│   │   ├── [Cargo.toml](./economics/src-tauri/Cargo.toml)
│   │   ├── [build.rs](./economics/src-tauri/build.rs)
│   │   └── [tauri.conf.json](./economics/src-tauri/tauri.conf.json)
│   ├── [AGENTS.md](./economics/AGENTS.md)
│   ├── [Dockerfile](./economics/Dockerfile)
│   ├── [LICENSE](./economics/LICENSE)
│   ├── [README.md](./economics/README.md)
│   ├── [TREE.md](./economics/TREE.md)
│   ├── [docker-compose.yaml](./economics/docker-compose.yaml)
│   ├── [eslint.config.mts](./economics/eslint.config.mts)
│   ├── [jest.config.ts](./economics/jest.config.ts)
│   ├── [jest.setup.ts](./economics/jest.setup.ts)
│   ├── [next.config.ts](./economics/next.config.ts)
│   ├── [package.json](./economics/package.json)
│   ├── [playwright.config.ts](./economics/playwright.config.ts)
│   ├── [postcss.config.mjs](./economics/postcss.config.mjs)
│   └── [tsconfig.json](./economics/tsconfig.json)
├── history/
│   ├── docs/
│   │   ├── [ARCHITECTURE.md](./history/docs/ARCHITECTURE.md)
│   │   ├── [CONTRIBUTING.md](./history/docs/CONTRIBUTING.md)
│   │   ├── [DOWNLOADS.md](./history/docs/DOWNLOADS.md)
│   │   ├── [PACKAGING.md](./history/docs/PACKAGING.md)
│   │   └── [ROADMAP.md](./history/docs/ROADMAP.md)
│   ├── e2e/
│   │   └── [home.spec.ts](./history/e2e/home.spec.ts)
│   ├── public/
│   │   ├── icons/
│   │   │   ├── [icon-128x128.png](./history/public/icons/icon-128x128.png)
│   │   │   ├── [icon-144x144.png](./history/public/icons/icon-144x144.png)
│   │   │   ├── [icon-152x152.png](./history/public/icons/icon-152x152.png)
│   │   │   ├── [icon-16x16.png](./history/public/icons/icon-16x16.png)
│   │   │   ├── [icon-180x180.png](./history/public/icons/icon-180x180.png)
│   │   │   ├── [icon-192.png](./history/public/icons/icon-192.png)
│   │   │   ├── [icon-192x192.png](./history/public/icons/icon-192x192.png)
│   │   │   ├── [icon-256x256.png](./history/public/icons/icon-256x256.png)
│   │   │   ├── [icon-32x32.png](./history/public/icons/icon-32x32.png)
│   │   │   ├── [icon-384x384.png](./history/public/icons/icon-384x384.png)
│   │   │   ├── [icon-48x48.png](./history/public/icons/icon-48x48.png)
│   │   │   ├── [icon-512.png](./history/public/icons/icon-512.png)
│   │   │   ├── [icon-512x512.png](./history/public/icons/icon-512x512.png)
│   │   │   ├── [icon-64x64.png](./history/public/icons/icon-64x64.png)
│   │   │   ├── [icon-72x72.png](./history/public/icons/icon-72x72.png)
│   │   │   ├── [icon-96x96.png](./history/public/icons/icon-96x96.png)
│   │   │   └── [icon.svg](./history/public/icons/icon.svg)
│   │   ├── [apple-touch-icon.png](./history/public/apple-touch-icon.png)
│   │   ├── [favicon.ico](./history/public/favicon.ico)
│   │   ├── [manifest.json](./history/public/manifest.json)
│   │   ├── [robots.txt](./history/public/robots.txt)
│   │   ├── [sitemap.xml](./history/public/sitemap.xml)
│   │   └── [sw.js](./history/public/sw.js)
│   ├── src/
│   │   ├── app/
│   │   │   ├── (auth)/
│   │   │   │   ├── forget-password/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./history/src/app/(auth)/forget-password/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./history/src/app/(auth)/forget-password/page.tsx)
│   │   │   │   ├── profile/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./history/src/app/(auth)/profile/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./history/src/app/(auth)/profile/page.tsx)
│   │   │   │   ├── reset-password/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./history/src/app/(auth)/reset-password/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./history/src/app/(auth)/reset-password/page.tsx)
│   │   │   │   ├── sign-in/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./history/src/app/(auth)/sign-in/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./history/src/app/(auth)/sign-in/page.tsx)
│   │   │   │   └── sign-up/
│   │   │   │       ├── __tests__/
│   │   │   │       │   └── [page.test.tsx](./history/src/app/(auth)/sign-up/__tests__/page.test.tsx)
│   │   │   │       └── [page.tsx](./history/src/app/(auth)/sign-up/page.tsx)
│   │   │   ├── (games)/
│   │   │   │   ├── myth-vs-fact/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./history/src/app/(games)/myth-vs-fact/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./history/src/app/(games)/myth-vs-fact/page.tsx)
│   │   │   │   └── through-the-years/
│   │   │   │       ├── __tests__/
│   │   │   │       │   └── [page.test.tsx](./history/src/app/(games)/through-the-years/__tests__/page.test.tsx)
│   │   │   │       └── [page.tsx](./history/src/app/(games)/through-the-years/page.tsx)
│   │   │   ├── (info)/
│   │   │   │   ├── about/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./history/src/app/(info)/about/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./history/src/app/(info)/about/page.tsx)
│   │   │   │   ├── downloads/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./history/src/app/(info)/downloads/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./history/src/app/(info)/downloads/page.tsx)
│   │   │   │   └── version/
│   │   │   │       ├── __tests__/
│   │   │   │       │   └── [page.test.tsx](./history/src/app/(info)/version/__tests__/page.test.tsx)
│   │   │   │       └── [page.tsx](./history/src/app/(info)/version/page.tsx)
│   │   │   ├── __tests__/
│   │   │   │   ├── [error.test.tsx](./history/src/app/__tests__/error.test.tsx)
│   │   │   │   ├── [forbidden.test.tsx](./history/src/app/__tests__/forbidden.test.tsx)
│   │   │   │   ├── [global-error.test.tsx](./history/src/app/__tests__/global-error.test.tsx)
│   │   │   │   ├── [layout.test.tsx](./history/src/app/__tests__/layout.test.tsx)
│   │   │   │   ├── [loading.test.tsx](./history/src/app/__tests__/loading.test.tsx)
│   │   │   │   ├── [not-found.test.tsx](./history/src/app/__tests__/not-found.test.tsx)
│   │   │   │   ├── [page.test.tsx](./history/src/app/__tests__/page.test.tsx)
│   │   │   │   ├── [robots.test.ts](./history/src/app/__tests__/robots.test.ts)
│   │   │   │   └── [unauthorized.test.tsx](./history/src/app/__tests__/unauthorized.test.tsx)
│   │   │   ├── [default.tsx](./history/src/app/default.tsx)
│   │   │   ├── [error.tsx](./history/src/app/error.tsx)
│   │   │   ├── [favicon.ico](./history/src/app/favicon.ico)
│   │   │   ├── [forbidden.tsx](./history/src/app/forbidden.tsx)
│   │   │   ├── [global-error.tsx](./history/src/app/global-error.tsx)
│   │   │   ├── [layout.tsx](./history/src/app/layout.tsx)
│   │   │   ├── [loading.tsx](./history/src/app/loading.tsx)
│   │   │   ├── [not-found.tsx](./history/src/app/not-found.tsx)
│   │   │   ├── [page.tsx](./history/src/app/page.tsx)
│   │   │   ├── [robots.ts](./history/src/app/robots.ts)
│   │   │   └── [unauthorized.tsx](./history/src/app/unauthorized.tsx)
│   │   ├── components/
│   │   │   ├── atoms/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [Badge.test.tsx](./history/src/components/atoms/__tests__/Badge.test.tsx)
│   │   │   │   │   ├── [OfflineBadge.test.tsx](./history/src/components/atoms/__tests__/OfflineBadge.test.tsx)
│   │   │   │   │   └── [ThemeToggle.test.tsx](./history/src/components/atoms/__tests__/ThemeToggle.test.tsx)
│   │   │   │   ├── [Badge.tsx](./history/src/components/atoms/Badge.tsx)
│   │   │   │   ├── [Button.tsx](./history/src/components/atoms/Button.tsx)
│   │   │   │   ├── [OfflineBadge.tsx](./history/src/components/atoms/OfflineBadge.tsx)
│   │   │   │   └── [ThemeToggle.tsx](./history/src/components/atoms/ThemeToggle.tsx)
│   │   │   ├── organisms/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [Header.test.tsx](./history/src/components/organisms/__tests__/Header.test.tsx)
│   │   │   │   └── [Header.tsx](./history/src/components/organisms/Header.tsx)
│   │   │   └── templates/
│   │   │       ├── __tests__/
│   │   │       │   ├── [AboutTemplate.test.tsx](./history/src/components/templates/__tests__/AboutTemplate.test.tsx)
│   │   │       │   ├── [DownloadsTemplate.test.tsx](./history/src/components/templates/__tests__/DownloadsTemplate.test.tsx)
│   │   │       │   ├── [ErrorTemplate.test.tsx](./history/src/components/templates/__tests__/ErrorTemplate.test.tsx)
│   │   │       │   ├── [HomeTemplate.test.tsx](./history/src/components/templates/__tests__/HomeTemplate.test.tsx)
│   │   │       │   └── [VersionTemplate.test.tsx](./history/src/components/templates/__tests__/VersionTemplate.test.tsx)
│   │   │       ├── [AboutTemplate.tsx](./history/src/components/templates/AboutTemplate.tsx)
│   │   │       ├── [DownloadsTemplate.tsx](./history/src/components/templates/DownloadsTemplate.tsx)
│   │   │       ├── [ErrorTemplate.tsx](./history/src/components/templates/ErrorTemplate.tsx)
│   │   │       ├── [HomeTemplate.tsx](./history/src/components/templates/HomeTemplate.tsx)
│   │   │       └── [VersionTemplate.tsx](./history/src/components/templates/VersionTemplate.tsx)
│   │   ├── games/
│   │   │   ├── myth-vs-fact/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [index.test.tsx](./history/src/games/myth-vs-fact/__tests__/index.test.tsx)
│   │   │   │   ├── data/
│   │   │   │   │   ├── [items.csv](./history/src/games/myth-vs-fact/data/items.csv)
│   │   │   │   │   └── [items.json](./history/src/games/myth-vs-fact/data/items.json)
│   │   │   │   ├── utils/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [game.test.ts](./history/src/games/myth-vs-fact/utils/__tests__/game.test.ts)
│   │   │   │   │   └── [game.ts](./history/src/games/myth-vs-fact/utils/game.ts)
│   │   │   │   ├── [constants.ts](./history/src/games/myth-vs-fact/constants.ts)
│   │   │   │   ├── [index.tsx](./history/src/games/myth-vs-fact/index.tsx)
│   │   │   │   └── [types.ts](./history/src/games/myth-vs-fact/types.ts)
│   │   │   └── through-the-years/
│   │   │       ├── __tests__/
│   │   │       │   ├── components/
│   │   │       │   │   ├── [BrowseCompact.test.tsx](./history/src/games/through-the-years/__tests__/components/BrowseCompact.test.tsx)
│   │   │       │   │   ├── [BrowseSpread.test.tsx](./history/src/games/through-the-years/__tests__/components/BrowseSpread.test.tsx)
│   │   │       │   │   ├── [Card.test.tsx](./history/src/games/through-the-years/__tests__/components/Card.test.tsx)
│   │   │       │   │   └── [Timeline.test.tsx](./history/src/games/through-the-years/__tests__/components/Timeline.test.tsx)
│   │   │       │   ├── screens/
│   │   │       │   │   ├── [BrowseScreen.test.tsx](./history/src/games/through-the-years/__tests__/screens/BrowseScreen.test.tsx)
│   │   │       │   │   ├── [GameOverScreen.test.tsx](./history/src/games/through-the-years/__tests__/screens/GameOverScreen.test.tsx)
│   │   │       │   │   ├── [GameScreen.test.tsx](./history/src/games/through-the-years/__tests__/screens/GameScreen.test.tsx)
│   │   │       │   │   └── [SetupScreen.test.tsx](./history/src/games/through-the-years/__tests__/screens/SetupScreen.test.tsx)
│   │   │       │   ├── [engine.test.ts](./history/src/games/through-the-years/__tests__/engine.test.ts)
│   │   │       │   ├── [index.test.tsx](./history/src/games/through-the-years/__tests__/index.test.tsx)
│   │   │       │   └── [store.test.ts](./history/src/games/through-the-years/__tests__/store.test.ts)
│   │   │       ├── components/
│   │   │       │   ├── components/
│   │   │       │   │   ├── [BrowseCompact.tsx](./history/src/games/through-the-years/components/components/BrowseCompact.tsx)
│   │   │       │   │   ├── [BrowseSpread.tsx](./history/src/games/through-the-years/components/components/BrowseSpread.tsx)
│   │   │       │   │   ├── [Card.tsx](./history/src/games/through-the-years/components/components/Card.tsx)
│   │   │       │   │   └── [Timeline.tsx](./history/src/games/through-the-years/components/components/Timeline.tsx)
│   │   │       │   └── screens/
│   │   │       │       ├── [BrowseScreen.tsx](./history/src/games/through-the-years/components/screens/BrowseScreen.tsx)
│   │   │       │       ├── [GameOverScreen.tsx](./history/src/games/through-the-years/components/screens/GameOverScreen.tsx)
│   │   │       │       ├── [GameScreen.tsx](./history/src/games/through-the-years/components/screens/GameScreen.tsx)
│   │   │       │       └── [SetupScreen.tsx](./history/src/games/through-the-years/components/screens/SetupScreen.tsx)
│   │   │       ├── data/
│   │   │       │   ├── json/
│   │   │       │   │   ├── africa/
│   │   │       │   │   │   ├── [egypt-events.json](./history/src/games/through-the-years/data/json/africa/egypt-events.json)
│   │   │       │   │   │   └── [south-africa-events.json](./history/src/games/through-the-years/data/json/africa/south-africa-events.json)
│   │   │       │   │   ├── americas/
│   │   │       │   │   │   ├── [mexico-events.json](./history/src/games/through-the-years/data/json/americas/mexico-events.json)
│   │   │       │   │   │   └── [united-states-events.json](./history/src/games/through-the-years/data/json/americas/united-states-events.json)
│   │   │       │   │   ├── asia/
│   │   │       │   │   │   ├── [china-events.json](./history/src/games/through-the-years/data/json/asia/china-events.json)
│   │   │       │   │   │   ├── [india-events.json](./history/src/games/through-the-years/data/json/asia/india-events.json)
│   │   │       │   │   │   ├── [iraq-events.json](./history/src/games/through-the-years/data/json/asia/iraq-events.json)
│   │   │       │   │   │   ├── [japan-events.json](./history/src/games/through-the-years/data/json/asia/japan-events.json)
│   │   │       │   │   │   └── [vietnam-events.json](./history/src/games/through-the-years/data/json/asia/vietnam-events.json)
│   │   │       │   │   ├── europe/
│   │   │       │   │   │   ├── [france-events.json](./history/src/games/through-the-years/data/json/europe/france-events.json)
│   │   │       │   │   │   ├── [germany-events.json](./history/src/games/through-the-years/data/json/europe/germany-events.json)
│   │   │       │   │   │   ├── [greece-events.json](./history/src/games/through-the-years/data/json/europe/greece-events.json)
│   │   │       │   │   │   ├── [italy-events.json](./history/src/games/through-the-years/data/json/europe/italy-events.json)
│   │   │       │   │   │   └── [united-kingdom-events.json](./history/src/games/through-the-years/data/json/europe/united-kingdom-events.json)
│   │   │       │   │   └── world/
│   │   │       │   │       └── [world-events.json](./history/src/games/through-the-years/data/json/world/world-events.json)
│   │   │       │   ├── [categories.ts](./history/src/games/through-the-years/data/categories.ts)
│   │   │       │   ├── [constants.ts](./history/src/games/through-the-years/data/constants.ts)
│   │   │       │   ├── [continents.ts](./history/src/games/through-the-years/data/continents.ts)
│   │   │       │   ├── [decks.ts](./history/src/games/through-the-years/data/decks.ts)
│   │   │       │   └── [modes.ts](./history/src/games/through-the-years/data/modes.ts)
│   │   │       ├── testing/
│   │   │       │   └── [fixtures.ts](./history/src/games/through-the-years/testing/fixtures.ts)
│   │   │       ├── [engine.ts](./history/src/games/through-the-years/engine.ts)
│   │   │       ├── [index.tsx](./history/src/games/through-the-years/index.tsx)
│   │   │       ├── [store.ts](./history/src/games/through-the-years/store.ts)
│   │   │       └── [types.ts](./history/src/games/through-the-years/types.ts)
│   │   ├── hooks/
│   │   │   ├── __tests__/
│   │   │   │   ├── [useOffline.test.ts](./history/src/hooks/__tests__/useOffline.test.ts)
│   │   │   │   ├── [useProgress.test.ts](./history/src/hooks/__tests__/useProgress.test.ts)
│   │   │   │   ├── [useSWRegister.test.ts](./history/src/hooks/__tests__/useSWRegister.test.ts)
│   │   │   │   ├── [useTheme.test.ts](./history/src/hooks/__tests__/useTheme.test.ts)
│   │   │   │   └── [useUpdater.test.ts](./history/src/hooks/__tests__/useUpdater.test.ts)
│   │   │   ├── [useOffline.ts](./history/src/hooks/useOffline.ts)
│   │   │   ├── [useProgress.ts](./history/src/hooks/useProgress.ts)
│   │   │   ├── [useSWRegister.ts](./history/src/hooks/useSWRegister.ts)
│   │   │   ├── [useTheme.ts](./history/src/hooks/useTheme.ts)
│   │   │   └── [useUpdater.ts](./history/src/hooks/useUpdater.ts)
│   │   ├── lib/
│   │   │   ├── __tests__/
│   │   │   │   └── [progress.test.ts](./history/src/lib/__tests__/progress.test.ts)
│   │   │   ├── native/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [index.test.ts](./history/src/lib/native/__tests__/index.test.ts)
│   │   │   │   └── [index.ts](./history/src/lib/native/index.ts)
│   │   │   └── [progress.ts](./history/src/lib/progress.ts)
│   │   ├── providers/
│   │   │   ├── __tests__/
│   │   │   │   ├── [NativeProvider.test.tsx](./history/src/providers/__tests__/NativeProvider.test.tsx)
│   │   │   │   ├── [QueryProvider.test.tsx](./history/src/providers/__tests__/QueryProvider.test.tsx)
│   │   │   │   └── [SWProvider.test.tsx](./history/src/providers/__tests__/SWProvider.test.tsx)
│   │   │   ├── [NativeProvider.tsx](./history/src/providers/NativeProvider.tsx)
│   │   │   ├── [QueryProvider.tsx](./history/src/providers/QueryProvider.tsx)
│   │   │   └── [SWProvider.tsx](./history/src/providers/SWProvider.tsx)
│   │   └── styles/
│   │       ├── [base.css](./history/src/styles/base.css)
│   │       ├── [globals.css](./history/src/styles/globals.css)
│   │       └── [themes.css](./history/src/styles/themes.css)
│   ├── src-tauri/
│   │   ├── capabilities/
│   │   │   └── [default.json](./history/src-tauri/capabilities/default.json)
│   │   ├── icons/
│   │   │   ├── [128x128.png](./history/src-tauri/icons/128x128.png)
│   │   │   ├── [128x128@2x.png](./history/src-tauri/icons/128x128@2x.png)
│   │   │   ├── [32x32.png](./history/src-tauri/icons/32x32.png)
│   │   │   ├── [Square107x107Logo.png](./history/src-tauri/icons/Square107x107Logo.png)
│   │   │   ├── [Square142x142Logo.png](./history/src-tauri/icons/Square142x142Logo.png)
│   │   │   ├── [Square150x150Logo.png](./history/src-tauri/icons/Square150x150Logo.png)
│   │   │   ├── [Square284x284Logo.png](./history/src-tauri/icons/Square284x284Logo.png)
│   │   │   ├── [Square30x30Logo.png](./history/src-tauri/icons/Square30x30Logo.png)
│   │   │   ├── [Square310x310Logo.png](./history/src-tauri/icons/Square310x310Logo.png)
│   │   │   ├── [Square44x44Logo.png](./history/src-tauri/icons/Square44x44Logo.png)
│   │   │   ├── [Square71x71Logo.png](./history/src-tauri/icons/Square71x71Logo.png)
│   │   │   ├── [Square89x89Logo.png](./history/src-tauri/icons/Square89x89Logo.png)
│   │   │   ├── [StoreLogo.png](./history/src-tauri/icons/StoreLogo.png)
│   │   │   ├── [icon.icns](./history/src-tauri/icons/icon.icns)
│   │   │   ├── [icon.ico](./history/src-tauri/icons/icon.ico)
│   │   │   └── [icon.png](./history/src-tauri/icons/icon.png)
│   │   ├── src/
│   │   │   ├── [lib.rs](./history/src-tauri/src/lib.rs)
│   │   │   └── [main.rs](./history/src-tauri/src/main.rs)
│   │   ├── [Cargo.lock](./history/src-tauri/Cargo.lock)
│   │   ├── [Cargo.toml](./history/src-tauri/Cargo.toml)
│   │   ├── [build.rs](./history/src-tauri/build.rs)
│   │   └── [tauri.conf.json](./history/src-tauri/tauri.conf.json)
│   ├── [AGENTS.md](./history/AGENTS.md)
│   ├── [Dockerfile](./history/Dockerfile)
│   ├── [LICENSE](./history/LICENSE)
│   ├── [README.md](./history/README.md)
│   ├── [TREE.md](./history/TREE.md)
│   ├── [docker-compose.yaml](./history/docker-compose.yaml)
│   ├── [eslint.config.mts](./history/eslint.config.mts)
│   ├── [jest.config.ts](./history/jest.config.ts)
│   ├── [jest.setup.ts](./history/jest.setup.ts)
│   ├── [next.config.ts](./history/next.config.ts)
│   ├── [package.json](./history/package.json)
│   ├── [playwright.config.ts](./history/playwright.config.ts)
│   ├── [postcss.config.mjs](./history/postcss.config.mjs)
│   └── [tsconfig.json](./history/tsconfig.json)
├── lingo/
│   ├── docs/
│   │   ├── [ARCHITECTURE.md](./lingo/docs/ARCHITECTURE.md)
│   │   ├── [CONTRIBUTING.md](./lingo/docs/CONTRIBUTING.md)
│   │   ├── [DOWNLOADS.md](./lingo/docs/DOWNLOADS.md)
│   │   ├── [PACKAGING.md](./lingo/docs/PACKAGING.md)
│   │   └── [ROADMAP.md](./lingo/docs/ROADMAP.md)
│   ├── e2e/
│   │   └── [home.spec.ts](./lingo/e2e/home.spec.ts)
│   ├── public/
│   │   ├── data/
│   │   │   └── [words.json](./lingo/public/data/words.json)
│   │   ├── icons/
│   │   │   ├── [icon-128x128.png](./lingo/public/icons/icon-128x128.png)
│   │   │   ├── [icon-144x144.png](./lingo/public/icons/icon-144x144.png)
│   │   │   ├── [icon-152x152.png](./lingo/public/icons/icon-152x152.png)
│   │   │   ├── [icon-16x16.png](./lingo/public/icons/icon-16x16.png)
│   │   │   ├── [icon-180x180.png](./lingo/public/icons/icon-180x180.png)
│   │   │   ├── [icon-192.png](./lingo/public/icons/icon-192.png)
│   │   │   ├── [icon-192x192.png](./lingo/public/icons/icon-192x192.png)
│   │   │   ├── [icon-256x256.png](./lingo/public/icons/icon-256x256.png)
│   │   │   ├── [icon-32x32.png](./lingo/public/icons/icon-32x32.png)
│   │   │   ├── [icon-384x384.png](./lingo/public/icons/icon-384x384.png)
│   │   │   ├── [icon-48x48.png](./lingo/public/icons/icon-48x48.png)
│   │   │   ├── [icon-512.png](./lingo/public/icons/icon-512.png)
│   │   │   ├── [icon-512x512.png](./lingo/public/icons/icon-512x512.png)
│   │   │   ├── [icon-64x64.png](./lingo/public/icons/icon-64x64.png)
│   │   │   ├── [icon-72x72.png](./lingo/public/icons/icon-72x72.png)
│   │   │   ├── [icon-96x96.png](./lingo/public/icons/icon-96x96.png)
│   │   │   └── [icon.svg](./lingo/public/icons/icon.svg)
│   │   ├── models/
│   │   │   └── [sign-model.onnx](./lingo/public/models/sign-model.onnx)
│   │   ├── [apple-touch-icon.png](./lingo/public/apple-touch-icon.png)
│   │   ├── [favicon.ico](./lingo/public/favicon.ico)
│   │   ├── [manifest.json](./lingo/public/manifest.json)
│   │   ├── [robots.txt](./lingo/public/robots.txt)
│   │   ├── [sitemap.xml](./lingo/public/sitemap.xml)
│   │   └── [sw.js](./lingo/public/sw.js)
│   ├── src/
│   │   ├── app/
│   │   │   ├── (app)/
│   │   │   │   ├── english/
│   │   │   │   │   └── [page.tsx](./lingo/src/app/(app)/english/page.tsx)
│   │   │   │   ├── flashcards/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./lingo/src/app/(app)/flashcards/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./lingo/src/app/(app)/flashcards/page.tsx)
│   │   │   │   └── sign/
│   │   │   │       └── [page.tsx](./lingo/src/app/(app)/sign/page.tsx)
│   │   │   ├── (auth)/
│   │   │   │   ├── forget-password/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./lingo/src/app/(auth)/forget-password/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./lingo/src/app/(auth)/forget-password/page.tsx)
│   │   │   │   ├── profile/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./lingo/src/app/(auth)/profile/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./lingo/src/app/(auth)/profile/page.tsx)
│   │   │   │   ├── reset-password/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./lingo/src/app/(auth)/reset-password/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./lingo/src/app/(auth)/reset-password/page.tsx)
│   │   │   │   ├── sign-in/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./lingo/src/app/(auth)/sign-in/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./lingo/src/app/(auth)/sign-in/page.tsx)
│   │   │   │   └── sign-up/
│   │   │   │       ├── __tests__/
│   │   │   │       │   └── [page.test.tsx](./lingo/src/app/(auth)/sign-up/__tests__/page.test.tsx)
│   │   │   │       └── [page.tsx](./lingo/src/app/(auth)/sign-up/page.tsx)
│   │   │   ├── (info)/
│   │   │   │   ├── about/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./lingo/src/app/(info)/about/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./lingo/src/app/(info)/about/page.tsx)
│   │   │   │   ├── downloads/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./lingo/src/app/(info)/downloads/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./lingo/src/app/(info)/downloads/page.tsx)
│   │   │   │   └── version/
│   │   │   │       ├── __tests__/
│   │   │   │       │   └── [page.test.tsx](./lingo/src/app/(info)/version/__tests__/page.test.tsx)
│   │   │   │       └── [page.tsx](./lingo/src/app/(info)/version/page.tsx)
│   │   │   ├── __tests__/
│   │   │   │   ├── [error.test.tsx](./lingo/src/app/__tests__/error.test.tsx)
│   │   │   │   ├── [forbidden.test.tsx](./lingo/src/app/__tests__/forbidden.test.tsx)
│   │   │   │   ├── [global-error.test.tsx](./lingo/src/app/__tests__/global-error.test.tsx)
│   │   │   │   ├── [layout.test.tsx](./lingo/src/app/__tests__/layout.test.tsx)
│   │   │   │   ├── [loading.test.tsx](./lingo/src/app/__tests__/loading.test.tsx)
│   │   │   │   ├── [not-found.test.tsx](./lingo/src/app/__tests__/not-found.test.tsx)
│   │   │   │   ├── [page.test.tsx](./lingo/src/app/__tests__/page.test.tsx)
│   │   │   │   ├── [robots.test.ts](./lingo/src/app/__tests__/robots.test.ts)
│   │   │   │   └── [unauthorized.test.tsx](./lingo/src/app/__tests__/unauthorized.test.tsx)
│   │   │   ├── [default.tsx](./lingo/src/app/default.tsx)
│   │   │   ├── [error.tsx](./lingo/src/app/error.tsx)
│   │   │   ├── [favicon.ico](./lingo/src/app/favicon.ico)
│   │   │   ├── [forbidden.tsx](./lingo/src/app/forbidden.tsx)
│   │   │   ├── [global-error.tsx](./lingo/src/app/global-error.tsx)
│   │   │   ├── [layout.tsx](./lingo/src/app/layout.tsx)
│   │   │   ├── [loading.tsx](./lingo/src/app/loading.tsx)
│   │   │   ├── [not-found.tsx](./lingo/src/app/not-found.tsx)
│   │   │   ├── [page.tsx](./lingo/src/app/page.tsx)
│   │   │   ├── [robots.ts](./lingo/src/app/robots.ts)
│   │   │   └── [unauthorized.tsx](./lingo/src/app/unauthorized.tsx)
│   │   ├── components/
│   │   │   ├── atoms/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [Badge.test.tsx](./lingo/src/components/atoms/__tests__/Badge.test.tsx)
│   │   │   │   │   ├── [Button.test.tsx](./lingo/src/components/atoms/__tests__/Button.test.tsx)
│   │   │   │   │   └── [OfflineBadge.test.tsx](./lingo/src/components/atoms/__tests__/OfflineBadge.test.tsx)
│   │   │   │   ├── [Badge.tsx](./lingo/src/components/atoms/Badge.tsx)
│   │   │   │   ├── [Button.tsx](./lingo/src/components/atoms/Button.tsx)
│   │   │   │   ├── [OfflineBadge.tsx](./lingo/src/components/atoms/OfflineBadge.tsx)
│   │   │   │   └── [ThemeToggle.tsx](./lingo/src/components/atoms/ThemeToggle.tsx)
│   │   │   ├── features/
│   │   │   │   ├── english/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [index.test.tsx](./lingo/src/components/features/english/__tests__/index.test.tsx)
│   │   │   │   │   │   └── [utils.test.ts](./lingo/src/components/features/english/__tests__/utils.test.ts)
│   │   │   │   │   ├── [index.tsx](./lingo/src/components/features/english/index.tsx)
│   │   │   │   │   └── [utils.ts](./lingo/src/components/features/english/utils.ts)
│   │   │   │   ├── flashcards/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [index.test.tsx](./lingo/src/components/features/flashcards/__tests__/index.test.tsx)
│   │   │   │   │   │   └── [utils.test.ts](./lingo/src/components/features/flashcards/__tests__/utils.test.ts)
│   │   │   │   │   ├── [index.tsx](./lingo/src/components/features/flashcards/index.tsx)
│   │   │   │   │   └── [utils.ts](./lingo/src/components/features/flashcards/utils.ts)
│   │   │   │   └── sign/
│   │   │   │       ├── __tests__/
│   │   │   │       │   ├── [index.test.tsx](./lingo/src/components/features/sign/__tests__/index.test.tsx)
│   │   │   │       │   └── [utils.test.ts](./lingo/src/components/features/sign/__tests__/utils.test.ts)
│   │   │   │       ├── [index.tsx](./lingo/src/components/features/sign/index.tsx)
│   │   │   │       └── [utils.ts](./lingo/src/components/features/sign/utils.ts)
│   │   │   └── templates/
│   │   │       ├── __tests__/
│   │   │       │   ├── [AboutTemplate.test.tsx](./lingo/src/components/templates/__tests__/AboutTemplate.test.tsx)
│   │   │       │   ├── [DownloadsTemplate.test.tsx](./lingo/src/components/templates/__tests__/DownloadsTemplate.test.tsx)
│   │   │       │   ├── [ErrorTemplate.test.tsx](./lingo/src/components/templates/__tests__/ErrorTemplate.test.tsx)
│   │   │       │   ├── [HomeTemplate.test.tsx](./lingo/src/components/templates/__tests__/HomeTemplate.test.tsx)
│   │   │       │   └── [VersionTemplate.test.tsx](./lingo/src/components/templates/__tests__/VersionTemplate.test.tsx)
│   │   │       ├── [AboutTemplate.tsx](./lingo/src/components/templates/AboutTemplate.tsx)
│   │   │       ├── [DownloadsTemplate.tsx](./lingo/src/components/templates/DownloadsTemplate.tsx)
│   │   │       ├── [ErrorTemplate.tsx](./lingo/src/components/templates/ErrorTemplate.tsx)
│   │   │       ├── [HomeTemplate.tsx](./lingo/src/components/templates/HomeTemplate.tsx)
│   │   │       └── [VersionTemplate.tsx](./lingo/src/components/templates/VersionTemplate.tsx)
│   │   ├── hooks/
│   │   │   ├── __tests__/
│   │   │   │   ├── [useOffline.test.ts](./lingo/src/hooks/__tests__/useOffline.test.ts)
│   │   │   │   ├── [useProgress.test.ts](./lingo/src/hooks/__tests__/useProgress.test.ts)
│   │   │   │   ├── [useSWRegister.test.ts](./lingo/src/hooks/__tests__/useSWRegister.test.ts)
│   │   │   │   ├── [useTheme.test.ts](./lingo/src/hooks/__tests__/useTheme.test.ts)
│   │   │   │   └── [useUpdater.test.ts](./lingo/src/hooks/__tests__/useUpdater.test.ts)
│   │   │   ├── [useOffline.ts](./lingo/src/hooks/useOffline.ts)
│   │   │   ├── [useProgress.ts](./lingo/src/hooks/useProgress.ts)
│   │   │   ├── [useSWRegister.ts](./lingo/src/hooks/useSWRegister.ts)
│   │   │   ├── [useTheme.ts](./lingo/src/hooks/useTheme.ts)
│   │   │   └── [useUpdater.ts](./lingo/src/hooks/useUpdater.ts)
│   │   ├── lib/
│   │   │   ├── __tests__/
│   │   │   │   └── [progress.test.ts](./lingo/src/lib/__tests__/progress.test.ts)
│   │   │   ├── native/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [index.test.ts](./lingo/src/lib/native/__tests__/index.test.ts)
│   │   │   │   └── [index.ts](./lingo/src/lib/native/index.ts)
│   │   │   ├── [progress.ts](./lingo/src/lib/progress.ts)
│   │   │   └── [publicPaths.ts](./lingo/src/lib/publicPaths.ts)
│   │   ├── providers/
│   │   │   ├── __tests__/
│   │   │   │   ├── [NativeProvider.test.tsx](./lingo/src/providers/__tests__/NativeProvider.test.tsx)
│   │   │   │   ├── [QueryProvider.test.tsx](./lingo/src/providers/__tests__/QueryProvider.test.tsx)
│   │   │   │   └── [SWProvider.test.tsx](./lingo/src/providers/__tests__/SWProvider.test.tsx)
│   │   │   ├── [NativeProvider.tsx](./lingo/src/providers/NativeProvider.tsx)
│   │   │   ├── [QueryProvider.tsx](./lingo/src/providers/QueryProvider.tsx)
│   │   │   └── [SWProvider.tsx](./lingo/src/providers/SWProvider.tsx)
│   │   └── styles/
│   │       ├── [base.css](./lingo/src/styles/base.css)
│   │       ├── [globals.css](./lingo/src/styles/globals.css)
│   │       └── [themes.css](./lingo/src/styles/themes.css)
│   ├── src-tauri/
│   │   ├── capabilities/
│   │   │   └── [default.json](./lingo/src-tauri/capabilities/default.json)
│   │   ├── icons/
│   │   │   ├── [128x128.png](./lingo/src-tauri/icons/128x128.png)
│   │   │   ├── [128x128@2x.png](./lingo/src-tauri/icons/128x128@2x.png)
│   │   │   ├── [32x32.png](./lingo/src-tauri/icons/32x32.png)
│   │   │   ├── [Square107x107Logo.png](./lingo/src-tauri/icons/Square107x107Logo.png)
│   │   │   ├── [Square142x142Logo.png](./lingo/src-tauri/icons/Square142x142Logo.png)
│   │   │   ├── [Square150x150Logo.png](./lingo/src-tauri/icons/Square150x150Logo.png)
│   │   │   ├── [Square284x284Logo.png](./lingo/src-tauri/icons/Square284x284Logo.png)
│   │   │   ├── [Square30x30Logo.png](./lingo/src-tauri/icons/Square30x30Logo.png)
│   │   │   ├── [Square310x310Logo.png](./lingo/src-tauri/icons/Square310x310Logo.png)
│   │   │   ├── [Square44x44Logo.png](./lingo/src-tauri/icons/Square44x44Logo.png)
│   │   │   ├── [Square71x71Logo.png](./lingo/src-tauri/icons/Square71x71Logo.png)
│   │   │   ├── [Square89x89Logo.png](./lingo/src-tauri/icons/Square89x89Logo.png)
│   │   │   ├── [StoreLogo.png](./lingo/src-tauri/icons/StoreLogo.png)
│   │   │   ├── [icon.icns](./lingo/src-tauri/icons/icon.icns)
│   │   │   ├── [icon.ico](./lingo/src-tauri/icons/icon.ico)
│   │   │   └── [icon.png](./lingo/src-tauri/icons/icon.png)
│   │   ├── src/
│   │   │   ├── [lib.rs](./lingo/src-tauri/src/lib.rs)
│   │   │   └── [main.rs](./lingo/src-tauri/src/main.rs)
│   │   ├── [Cargo.lock](./lingo/src-tauri/Cargo.lock)
│   │   ├── [Cargo.toml](./lingo/src-tauri/Cargo.toml)
│   │   ├── [build.rs](./lingo/src-tauri/build.rs)
│   │   └── [tauri.conf.json](./lingo/src-tauri/tauri.conf.json)
│   ├── [AGENTS.md](./lingo/AGENTS.md)
│   ├── [Dockerfile](./lingo/Dockerfile)
│   ├── [LICENSE](./lingo/LICENSE)
│   ├── [README.md](./lingo/README.md)
│   ├── [TREE.md](./lingo/TREE.md)
│   ├── [docker-compose.yaml](./lingo/docker-compose.yaml)
│   ├── [eslint.config.mts](./lingo/eslint.config.mts)
│   ├── [jest.config.ts](./lingo/jest.config.ts)
│   ├── [jest.setup.ts](./lingo/jest.setup.ts)
│   ├── [next.config.ts](./lingo/next.config.ts)
│   ├── [package.json](./lingo/package.json)
│   ├── [playwright.config.ts](./lingo/playwright.config.ts)
│   ├── [postcss.config.mjs](./lingo/postcss.config.mjs)
│   └── [tsconfig.json](./lingo/tsconfig.json)
├── music/
│   ├── docs/
│   │   ├── [ARCHITECTURE.md](./music/docs/ARCHITECTURE.md)
│   │   ├── [CONTRIBUTING.md](./music/docs/CONTRIBUTING.md)
│   │   ├── [DOWNLOADS.md](./music/docs/DOWNLOADS.md)
│   │   ├── [PACKAGING.md](./music/docs/PACKAGING.md)
│   │   └── [ROADMAP.md](./music/docs/ROADMAP.md)
│   ├── e2e/
│   │   └── [home.spec.ts](./music/e2e/home.spec.ts)
│   ├── public/
│   │   ├── icons/
│   │   │   ├── [icon-128x128.png](./music/public/icons/icon-128x128.png)
│   │   │   ├── [icon-144x144.png](./music/public/icons/icon-144x144.png)
│   │   │   ├── [icon-152x152.png](./music/public/icons/icon-152x152.png)
│   │   │   ├── [icon-16x16.png](./music/public/icons/icon-16x16.png)
│   │   │   ├── [icon-180x180.png](./music/public/icons/icon-180x180.png)
│   │   │   ├── [icon-192.png](./music/public/icons/icon-192.png)
│   │   │   ├── [icon-192x192.png](./music/public/icons/icon-192x192.png)
│   │   │   ├── [icon-256x256.png](./music/public/icons/icon-256x256.png)
│   │   │   ├── [icon-32x32.png](./music/public/icons/icon-32x32.png)
│   │   │   ├── [icon-384x384.png](./music/public/icons/icon-384x384.png)
│   │   │   ├── [icon-48x48.png](./music/public/icons/icon-48x48.png)
│   │   │   ├── [icon-512.png](./music/public/icons/icon-512.png)
│   │   │   ├── [icon-512x512.png](./music/public/icons/icon-512x512.png)
│   │   │   ├── [icon-64x64.png](./music/public/icons/icon-64x64.png)
│   │   │   ├── [icon-72x72.png](./music/public/icons/icon-72x72.png)
│   │   │   ├── [icon-96x96.png](./music/public/icons/icon-96x96.png)
│   │   │   └── [icon.svg](./music/public/icons/icon.svg)
│   │   ├── [apple-touch-icon.png](./music/public/apple-touch-icon.png)
│   │   ├── [favicon.ico](./music/public/favicon.ico)
│   │   ├── [manifest.json](./music/public/manifest.json)
│   │   ├── [robots.txt](./music/public/robots.txt)
│   │   ├── [sitemap.xml](./music/public/sitemap.xml)
│   │   └── [sw.js](./music/public/sw.js)
│   ├── src/
│   │   ├── app/
│   │   │   ├── (auth)/
│   │   │   │   ├── forget-password/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./music/src/app/(auth)/forget-password/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./music/src/app/(auth)/forget-password/page.tsx)
│   │   │   │   ├── profile/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./music/src/app/(auth)/profile/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./music/src/app/(auth)/profile/page.tsx)
│   │   │   │   ├── reset-password/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./music/src/app/(auth)/reset-password/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./music/src/app/(auth)/reset-password/page.tsx)
│   │   │   │   ├── sign-in/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./music/src/app/(auth)/sign-in/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./music/src/app/(auth)/sign-in/page.tsx)
│   │   │   │   └── sign-up/
│   │   │   │       ├── __tests__/
│   │   │   │       │   └── [page.test.tsx](./music/src/app/(auth)/sign-up/__tests__/page.test.tsx)
│   │   │   │       └── [page.tsx](./music/src/app/(auth)/sign-up/page.tsx)
│   │   │   ├── (info)/
│   │   │   │   ├── about/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./music/src/app/(info)/about/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./music/src/app/(info)/about/page.tsx)
│   │   │   │   ├── downloads/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./music/src/app/(info)/downloads/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./music/src/app/(info)/downloads/page.tsx)
│   │   │   │   └── version/
│   │   │   │       ├── __tests__/
│   │   │   │       │   └── [page.test.tsx](./music/src/app/(info)/version/__tests__/page.test.tsx)
│   │   │   │       └── [page.tsx](./music/src/app/(info)/version/page.tsx)
│   │   │   ├── __tests__/
│   │   │   │   ├── [error.test.tsx](./music/src/app/__tests__/error.test.tsx)
│   │   │   │   ├── [forbidden.test.tsx](./music/src/app/__tests__/forbidden.test.tsx)
│   │   │   │   ├── [global-error.test.tsx](./music/src/app/__tests__/global-error.test.tsx)
│   │   │   │   ├── [layout.test.tsx](./music/src/app/__tests__/layout.test.tsx)
│   │   │   │   ├── [loading.test.tsx](./music/src/app/__tests__/loading.test.tsx)
│   │   │   │   ├── [not-found.test.tsx](./music/src/app/__tests__/not-found.test.tsx)
│   │   │   │   ├── [page.test.tsx](./music/src/app/__tests__/page.test.tsx)
│   │   │   │   ├── [robots.test.ts](./music/src/app/__tests__/robots.test.ts)
│   │   │   │   └── [unauthorized.test.tsx](./music/src/app/__tests__/unauthorized.test.tsx)
│   │   │   ├── pitch/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [page.test.tsx](./music/src/app/pitch/__tests__/page.test.tsx)
│   │   │   │   └── [page.tsx](./music/src/app/pitch/page.tsx)
│   │   │   ├── [default.tsx](./music/src/app/default.tsx)
│   │   │   ├── [error.tsx](./music/src/app/error.tsx)
│   │   │   ├── [favicon.ico](./music/src/app/favicon.ico)
│   │   │   ├── [forbidden.tsx](./music/src/app/forbidden.tsx)
│   │   │   ├── [global-error.tsx](./music/src/app/global-error.tsx)
│   │   │   ├── [layout.tsx](./music/src/app/layout.tsx)
│   │   │   ├── [loading.tsx](./music/src/app/loading.tsx)
│   │   │   ├── [not-found.tsx](./music/src/app/not-found.tsx)
│   │   │   ├── [page.tsx](./music/src/app/page.tsx)
│   │   │   ├── [robots.ts](./music/src/app/robots.ts)
│   │   │   └── [unauthorized.tsx](./music/src/app/unauthorized.tsx)
│   │   ├── components/
│   │   │   ├── atoms/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [Badge.test.tsx](./music/src/components/atoms/__tests__/Badge.test.tsx)
│   │   │   │   │   ├── [OfflineBadge.test.tsx](./music/src/components/atoms/__tests__/OfflineBadge.test.tsx)
│   │   │   │   │   └── [ThemeToggle.test.tsx](./music/src/components/atoms/__tests__/ThemeToggle.test.tsx)
│   │   │   │   ├── [Badge.tsx](./music/src/components/atoms/Badge.tsx)
│   │   │   │   ├── [Button.tsx](./music/src/components/atoms/Button.tsx)
│   │   │   │   ├── [OfflineBadge.tsx](./music/src/components/atoms/OfflineBadge.tsx)
│   │   │   │   └── [ThemeToggle.tsx](./music/src/components/atoms/ThemeToggle.tsx)
│   │   │   ├── features/
│   │   │   │   └── pitch/
│   │   │   │       ├── __tests__/
│   │   │   │       │   ├── [index.test.tsx](./music/src/components/features/pitch/__tests__/index.test.tsx)
│   │   │   │       │   ├── [keyClasses.test.ts](./music/src/components/features/pitch/__tests__/keyClasses.test.ts)
│   │   │   │       │   ├── [useAudio.test.ts](./music/src/components/features/pitch/__tests__/useAudio.test.ts)
│   │   │   │       │   ├── [useGame.test.ts](./music/src/components/features/pitch/__tests__/useGame.test.ts)
│   │   │   │       │   └── [useSequence.test.ts](./music/src/components/features/pitch/__tests__/useSequence.test.ts)
│   │   │   │       ├── [constants.ts](./music/src/components/features/pitch/constants.ts)
│   │   │   │       ├── [index.tsx](./music/src/components/features/pitch/index.tsx)
│   │   │   │       ├── [keyClasses.ts](./music/src/components/features/pitch/keyClasses.ts)
│   │   │   │       ├── [useAudio.ts](./music/src/components/features/pitch/useAudio.ts)
│   │   │   │       ├── [useGame.ts](./music/src/components/features/pitch/useGame.ts)
│   │   │   │       ├── [usePitchGame.ts](./music/src/components/features/pitch/usePitchGame.ts)
│   │   │   │       └── [useSequence.ts](./music/src/components/features/pitch/useSequence.ts)
│   │   │   └── templates/
│   │   │       ├── __tests__/
│   │   │       │   ├── [AboutTemplate.test.tsx](./music/src/components/templates/__tests__/AboutTemplate.test.tsx)
│   │   │       │   ├── [DownloadsTemplate.test.tsx](./music/src/components/templates/__tests__/DownloadsTemplate.test.tsx)
│   │   │       │   ├── [ErrorTemplate.test.tsx](./music/src/components/templates/__tests__/ErrorTemplate.test.tsx)
│   │   │       │   ├── [HomeTemplate.test.tsx](./music/src/components/templates/__tests__/HomeTemplate.test.tsx)
│   │   │       │   └── [VersionTemplate.test.tsx](./music/src/components/templates/__tests__/VersionTemplate.test.tsx)
│   │   │       ├── [AboutTemplate.tsx](./music/src/components/templates/AboutTemplate.tsx)
│   │   │       ├── [DownloadsTemplate.tsx](./music/src/components/templates/DownloadsTemplate.tsx)
│   │   │       ├── [ErrorTemplate.tsx](./music/src/components/templates/ErrorTemplate.tsx)
│   │   │       ├── [HomeTemplate.tsx](./music/src/components/templates/HomeTemplate.tsx)
│   │   │       └── [VersionTemplate.tsx](./music/src/components/templates/VersionTemplate.tsx)
│   │   ├── hooks/
│   │   │   ├── __tests__/
│   │   │   │   ├── [useOffline.test.ts](./music/src/hooks/__tests__/useOffline.test.ts)
│   │   │   │   ├── [useProgress.test.ts](./music/src/hooks/__tests__/useProgress.test.ts)
│   │   │   │   ├── [useSWRegister.test.ts](./music/src/hooks/__tests__/useSWRegister.test.ts)
│   │   │   │   ├── [useTheme.test.ts](./music/src/hooks/__tests__/useTheme.test.ts)
│   │   │   │   └── [useUpdater.test.ts](./music/src/hooks/__tests__/useUpdater.test.ts)
│   │   │   ├── [useOffline.ts](./music/src/hooks/useOffline.ts)
│   │   │   ├── [useProgress.ts](./music/src/hooks/useProgress.ts)
│   │   │   ├── [useSWRegister.ts](./music/src/hooks/useSWRegister.ts)
│   │   │   ├── [useTheme.ts](./music/src/hooks/useTheme.ts)
│   │   │   └── [useUpdater.ts](./music/src/hooks/useUpdater.ts)
│   │   ├── lib/
│   │   │   ├── __tests__/
│   │   │   │   └── [progress.test.ts](./music/src/lib/__tests__/progress.test.ts)
│   │   │   ├── native/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [index.test.ts](./music/src/lib/native/__tests__/index.test.ts)
│   │   │   │   └── [index.ts](./music/src/lib/native/index.ts)
│   │   │   └── [progress.ts](./music/src/lib/progress.ts)
│   │   ├── providers/
│   │   │   ├── __tests__/
│   │   │   │   ├── [NativeProvider.test.tsx](./music/src/providers/__tests__/NativeProvider.test.tsx)
│   │   │   │   ├── [QueryProvider.test.tsx](./music/src/providers/__tests__/QueryProvider.test.tsx)
│   │   │   │   └── [SWProvider.test.tsx](./music/src/providers/__tests__/SWProvider.test.tsx)
│   │   │   ├── [NativeProvider.tsx](./music/src/providers/NativeProvider.tsx)
│   │   │   ├── [QueryProvider.tsx](./music/src/providers/QueryProvider.tsx)
│   │   │   └── [SWProvider.tsx](./music/src/providers/SWProvider.tsx)
│   │   └── styles/
│   │       ├── [base.css](./music/src/styles/base.css)
│   │       ├── [globals.css](./music/src/styles/globals.css)
│   │       └── [themes.css](./music/src/styles/themes.css)
│   ├── src-tauri/
│   │   ├── capabilities/
│   │   │   └── [default.json](./music/src-tauri/capabilities/default.json)
│   │   ├── icons/
│   │   │   ├── [128x128.png](./music/src-tauri/icons/128x128.png)
│   │   │   ├── [128x128@2x.png](./music/src-tauri/icons/128x128@2x.png)
│   │   │   ├── [32x32.png](./music/src-tauri/icons/32x32.png)
│   │   │   ├── [Square107x107Logo.png](./music/src-tauri/icons/Square107x107Logo.png)
│   │   │   ├── [Square142x142Logo.png](./music/src-tauri/icons/Square142x142Logo.png)
│   │   │   ├── [Square150x150Logo.png](./music/src-tauri/icons/Square150x150Logo.png)
│   │   │   ├── [Square284x284Logo.png](./music/src-tauri/icons/Square284x284Logo.png)
│   │   │   ├── [Square30x30Logo.png](./music/src-tauri/icons/Square30x30Logo.png)
│   │   │   ├── [Square310x310Logo.png](./music/src-tauri/icons/Square310x310Logo.png)
│   │   │   ├── [Square44x44Logo.png](./music/src-tauri/icons/Square44x44Logo.png)
│   │   │   ├── [Square71x71Logo.png](./music/src-tauri/icons/Square71x71Logo.png)
│   │   │   ├── [Square89x89Logo.png](./music/src-tauri/icons/Square89x89Logo.png)
│   │   │   ├── [StoreLogo.png](./music/src-tauri/icons/StoreLogo.png)
│   │   │   ├── [icon.icns](./music/src-tauri/icons/icon.icns)
│   │   │   ├── [icon.ico](./music/src-tauri/icons/icon.ico)
│   │   │   └── [icon.png](./music/src-tauri/icons/icon.png)
│   │   ├── src/
│   │   │   ├── [lib.rs](./music/src-tauri/src/lib.rs)
│   │   │   └── [main.rs](./music/src-tauri/src/main.rs)
│   │   ├── [Cargo.lock](./music/src-tauri/Cargo.lock)
│   │   ├── [Cargo.toml](./music/src-tauri/Cargo.toml)
│   │   ├── [build.rs](./music/src-tauri/build.rs)
│   │   └── [tauri.conf.json](./music/src-tauri/tauri.conf.json)
│   ├── [AGENTS.md](./music/AGENTS.md)
│   ├── [Dockerfile](./music/Dockerfile)
│   ├── [LICENSE](./music/LICENSE)
│   ├── [README.md](./music/README.md)
│   ├── [TREE.md](./music/TREE.md)
│   ├── [docker-compose.yaml](./music/docker-compose.yaml)
│   ├── [eslint.config.mts](./music/eslint.config.mts)
│   ├── [jest.config.ts](./music/jest.config.ts)
│   ├── [jest.setup.ts](./music/jest.setup.ts)
│   ├── [next.config.ts](./music/next.config.ts)
│   ├── [package.json](./music/package.json)
│   ├── [playwright.config.ts](./music/playwright.config.ts)
│   ├── [postcss.config.mjs](./music/postcss.config.mjs)
│   └── [tsconfig.json](./music/tsconfig.json)
├── [README.md](./README.md)
└── [TREE.md](./TREE.md)
```

279 directories, 815 files
