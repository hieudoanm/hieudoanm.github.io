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
│   │   ├── screenshots/
│   │   │   ├── [about.png](./chemistry/e2e/screenshots/about.png)
│   │   │   ├── [downloads.png](./chemistry/e2e/screenshots/downloads.png)
│   │   │   ├── [home.png](./chemistry/e2e/screenshots/home.png)
│   │   │   └── [version.png](./chemistry/e2e/screenshots/version.png)
│   │   ├── [about.spec.ts](./chemistry/e2e/about.spec.ts)
│   │   ├── [downloads.spec.ts](./chemistry/e2e/downloads.spec.ts)
│   │   ├── [home.spec.ts](./chemistry/e2e/home.spec.ts)
│   │   └── [version.spec.ts](./chemistry/e2e/version.spec.ts)
│   ├── public/
│   │   ├── icons/
│   │   │   ├── [icon-128x128.png](./chemistry/public/icons/icon-128x128.png)
│   │   │   ├── [icon-144x144.png](./chemistry/public/icons/icon-144x144.png)
│   │   │   ├── [icon-152x152.png](./chemistry/public/icons/icon-152x152.png)
│   │   │   ├── [icon-16x16.png](./chemistry/public/icons/icon-16x16.png)
│   │   │   ├── [icon-180x180.png](./chemistry/public/icons/icon-180x180.png)
│   │   │   ├── [icon-192x192.png](./chemistry/public/icons/icon-192x192.png)
│   │   │   ├── [icon-256x256.png](./chemistry/public/icons/icon-256x256.png)
│   │   │   ├── [icon-32x32.png](./chemistry/public/icons/icon-32x32.png)
│   │   │   ├── [icon-384x384.png](./chemistry/public/icons/icon-384x384.png)
│   │   │   ├── [icon-48x48.png](./chemistry/public/icons/icon-48x48.png)
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
│   │   │   ├── (games)/
│   │   │   │   └── periodic-table/
│   │   │   │       ├── __tests__/
│   │   │   │       │   └── [page.test.tsx](./chemistry/src/app/(games)/periodic-table/__tests__/page.test.tsx)
│   │   │   │       └── [page.tsx](./chemistry/src/app/(games)/periodic-table/page.tsx)
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
│   │   │   │   │   └── [ThemeToggle.test.tsx](./chemistry/src/components/atoms/__tests__/ThemeToggle.test.tsx)
│   │   │   │   ├── [Badge.tsx](./chemistry/src/components/atoms/Badge.tsx)
│   │   │   │   ├── [Button.tsx](./chemistry/src/components/atoms/Button.tsx)
│   │   │   │   ├── [ElementCell.tsx](./chemistry/src/components/atoms/ElementCell.tsx)
│   │   │   │   └── [ThemeToggle.tsx](./chemistry/src/components/atoms/ThemeToggle.tsx)
│   │   │   ├── molecules/
│   │   │   │   ├── [CategoryFilter.tsx](./chemistry/src/components/molecules/CategoryFilter.tsx)
│   │   │   │   └── [PeriodicGridView.tsx](./chemistry/src/components/molecules/PeriodicGridView.tsx)
│   │   │   ├── organisms/
│   │   │   │   ├── [Header.tsx](./chemistry/src/components/organisms/Header.tsx)
│   │   │   │   └── [PeriodicTable.tsx](./chemistry/src/components/organisms/PeriodicTable.tsx)
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
│   │   ├── content/
│   │   │   ├── [about.ts](./chemistry/src/content/about.ts)
│   │   │   ├── [download.ts](./chemistry/src/content/download.ts)
│   │   │   └── [version.ts](./chemistry/src/content/version.ts)
│   │   ├── data/
│   │   │   └── [periodic-table.ts](./chemistry/src/data/periodic-table.ts)
│   │   ├── hooks/
│   │   │   ├── __tests__/
│   │   │   │   ├── [useSWRegister.test.ts](./chemistry/src/hooks/__tests__/useSWRegister.test.ts)
│   │   │   │   ├── [useTheme.test.ts](./chemistry/src/hooks/__tests__/useTheme.test.ts)
│   │   │   │   └── [useUpdater.test.ts](./chemistry/src/hooks/__tests__/useUpdater.test.ts)
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
│   │   │   ├── android/
│   │   │   │   ├── mipmap-anydpi-v26/
│   │   │   │   │   └── [ic_launcher.xml](./chemistry/src-tauri/icons/android/mipmap-anydpi-v26/ic_launcher.xml)
│   │   │   │   ├── mipmap-hdpi/
│   │   │   │   │   ├── [ic_launcher.png](./chemistry/src-tauri/icons/android/mipmap-hdpi/ic_launcher.png)
│   │   │   │   │   ├── [ic_launcher_foreground.png](./chemistry/src-tauri/icons/android/mipmap-hdpi/ic_launcher_foreground.png)
│   │   │   │   │   └── [ic_launcher_round.png](./chemistry/src-tauri/icons/android/mipmap-hdpi/ic_launcher_round.png)
│   │   │   │   ├── mipmap-mdpi/
│   │   │   │   │   ├── [ic_launcher.png](./chemistry/src-tauri/icons/android/mipmap-mdpi/ic_launcher.png)
│   │   │   │   │   ├── [ic_launcher_foreground.png](./chemistry/src-tauri/icons/android/mipmap-mdpi/ic_launcher_foreground.png)
│   │   │   │   │   └── [ic_launcher_round.png](./chemistry/src-tauri/icons/android/mipmap-mdpi/ic_launcher_round.png)
│   │   │   │   ├── mipmap-xhdpi/
│   │   │   │   │   ├── [ic_launcher.png](./chemistry/src-tauri/icons/android/mipmap-xhdpi/ic_launcher.png)
│   │   │   │   │   ├── [ic_launcher_foreground.png](./chemistry/src-tauri/icons/android/mipmap-xhdpi/ic_launcher_foreground.png)
│   │   │   │   │   └── [ic_launcher_round.png](./chemistry/src-tauri/icons/android/mipmap-xhdpi/ic_launcher_round.png)
│   │   │   │   ├── mipmap-xxhdpi/
│   │   │   │   │   ├── [ic_launcher.png](./chemistry/src-tauri/icons/android/mipmap-xxhdpi/ic_launcher.png)
│   │   │   │   │   ├── [ic_launcher_foreground.png](./chemistry/src-tauri/icons/android/mipmap-xxhdpi/ic_launcher_foreground.png)
│   │   │   │   │   └── [ic_launcher_round.png](./chemistry/src-tauri/icons/android/mipmap-xxhdpi/ic_launcher_round.png)
│   │   │   │   ├── mipmap-xxxhdpi/
│   │   │   │   │   ├── [ic_launcher.png](./chemistry/src-tauri/icons/android/mipmap-xxxhdpi/ic_launcher.png)
│   │   │   │   │   ├── [ic_launcher_foreground.png](./chemistry/src-tauri/icons/android/mipmap-xxxhdpi/ic_launcher_foreground.png)
│   │   │   │   │   └── [ic_launcher_round.png](./chemistry/src-tauri/icons/android/mipmap-xxxhdpi/ic_launcher_round.png)
│   │   │   │   └── values/
│   │   │   │       └── [ic_launcher_background.xml](./chemistry/src-tauri/icons/android/values/ic_launcher_background.xml)
│   │   │   ├── ios/
│   │   │   │   ├── [AppIcon-20x20@1x.png](./chemistry/src-tauri/icons/ios/AppIcon-20x20@1x.png)
│   │   │   │   ├── [AppIcon-20x20@2x-1.png](./chemistry/src-tauri/icons/ios/AppIcon-20x20@2x-1.png)
│   │   │   │   ├── [AppIcon-20x20@2x.png](./chemistry/src-tauri/icons/ios/AppIcon-20x20@2x.png)
│   │   │   │   ├── [AppIcon-20x20@3x.png](./chemistry/src-tauri/icons/ios/AppIcon-20x20@3x.png)
│   │   │   │   ├── [AppIcon-29x29@1x.png](./chemistry/src-tauri/icons/ios/AppIcon-29x29@1x.png)
│   │   │   │   ├── [AppIcon-29x29@2x-1.png](./chemistry/src-tauri/icons/ios/AppIcon-29x29@2x-1.png)
│   │   │   │   ├── [AppIcon-29x29@2x.png](./chemistry/src-tauri/icons/ios/AppIcon-29x29@2x.png)
│   │   │   │   ├── [AppIcon-29x29@3x.png](./chemistry/src-tauri/icons/ios/AppIcon-29x29@3x.png)
│   │   │   │   ├── [AppIcon-40x40@1x.png](./chemistry/src-tauri/icons/ios/AppIcon-40x40@1x.png)
│   │   │   │   ├── [AppIcon-40x40@2x-1.png](./chemistry/src-tauri/icons/ios/AppIcon-40x40@2x-1.png)
│   │   │   │   ├── [AppIcon-40x40@2x.png](./chemistry/src-tauri/icons/ios/AppIcon-40x40@2x.png)
│   │   │   │   ├── [AppIcon-40x40@3x.png](./chemistry/src-tauri/icons/ios/AppIcon-40x40@3x.png)
│   │   │   │   ├── [AppIcon-512@2x.png](./chemistry/src-tauri/icons/ios/AppIcon-512@2x.png)
│   │   │   │   ├── [AppIcon-60x60@2x.png](./chemistry/src-tauri/icons/ios/AppIcon-60x60@2x.png)
│   │   │   │   ├── [AppIcon-60x60@3x.png](./chemistry/src-tauri/icons/ios/AppIcon-60x60@3x.png)
│   │   │   │   ├── [AppIcon-76x76@1x.png](./chemistry/src-tauri/icons/ios/AppIcon-76x76@1x.png)
│   │   │   │   ├── [AppIcon-76x76@2x.png](./chemistry/src-tauri/icons/ios/AppIcon-76x76@2x.png)
│   │   │   │   └── [AppIcon-83.5x83.5@2x.png](./chemistry/src-tauri/icons/ios/AppIcon-83.5x83.5@2x.png)
│   │   │   ├── [128x128.png](./chemistry/src-tauri/icons/128x128.png)
│   │   │   ├── [128x128@2x.png](./chemistry/src-tauri/icons/128x128@2x.png)
│   │   │   ├── [256x256.png](./chemistry/src-tauri/icons/256x256.png)
│   │   │   ├── [32x32.png](./chemistry/src-tauri/icons/32x32.png)
│   │   │   ├── [64x64.png](./chemistry/src-tauri/icons/64x64.png)
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
│   │   │   ├── [create-icons.sh](./chemistry/src-tauri/icons/create-icons.sh)
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
├── doi/
│   ├── docs/
│   │   ├── [ARCHITECTURE.md](./doi/docs/ARCHITECTURE.md)
│   │   ├── [CONTRIBUTING.md](./doi/docs/CONTRIBUTING.md)
│   │   ├── [DOWNLOADS.md](./doi/docs/DOWNLOADS.md)
│   │   ├── [PACKAGING.md](./doi/docs/PACKAGING.md)
│   │   └── [ROADMAP.md](./doi/docs/ROADMAP.md)
│   ├── e2e/
│   │   └── [smoke.spec.ts](./doi/e2e/smoke.spec.ts)
│   ├── prisma/
│   │   ├── dbml/
│   │   │   └── [schema.dbml](./doi/prisma/dbml/schema.dbml)
│   │   ├── json-schema/
│   │   │   └── [json-schema.json](./doi/prisma/json-schema/json-schema.json)
│   │   └── [schema.prisma](./doi/prisma/schema.prisma)
│   ├── public/
│   │   ├── database/
│   │   │   ├── csv/
│   │   │   │   ├── [doi.references.csv](./doi/public/database/csv/doi.references.csv)
│   │   │   │   └── [doi.works.csv](./doi/public/database/csv/doi.works.csv)
│   │   │   ├── docs/
│   │   │   │   └── [swagger.json](./doi/public/database/docs/swagger.json)
│   │   │   ├── images/
│   │   │   │   └── [graph.svg](./doi/public/database/images/graph.svg)
│   │   │   ├── scripts/
│   │   │   │   ├── [analyse.py](./doi/public/database/scripts/analyse.py)
│   │   │   │   ├── [crawl.py](./doi/public/database/scripts/crawl.py)
│   │   │   │   ├── [to_csv.py](./doi/public/database/scripts/to_csv.py)
│   │   │   │   └── [visualise.py](./doi/public/database/scripts/visualise.py)
│   │   │   ├── temp/
│   │   │   │   └── [backfill_types.py](./doi/public/database/temp/backfill_types.py)
│   │   │   ├── [Makefile](./doi/public/database/Makefile)
│   │   │   ├── [README.md](./doi/public/database/README.md)
│   │   │   ├── [doi.db](./doi/public/database/doi.db)
│   │   │   ├── [doi.db-journal](./doi/public/database/doi.db-journal)
│   │   │   ├── [metadata.json](./doi/public/database/metadata.json)
│   │   │   └── [pyproject.toml](./doi/public/database/pyproject.toml)
│   │   ├── icons/
│   │   │   ├── [icon-128x128.png](./doi/public/icons/icon-128x128.png)
│   │   │   ├── [icon-144x144.png](./doi/public/icons/icon-144x144.png)
│   │   │   ├── [icon-152x152.png](./doi/public/icons/icon-152x152.png)
│   │   │   ├── [icon-16x16.png](./doi/public/icons/icon-16x16.png)
│   │   │   ├── [icon-180x180.png](./doi/public/icons/icon-180x180.png)
│   │   │   ├── [icon-192x192.png](./doi/public/icons/icon-192x192.png)
│   │   │   ├── [icon-256x256.png](./doi/public/icons/icon-256x256.png)
│   │   │   ├── [icon-32x32.png](./doi/public/icons/icon-32x32.png)
│   │   │   ├── [icon-384x384.png](./doi/public/icons/icon-384x384.png)
│   │   │   ├── [icon-48x48.png](./doi/public/icons/icon-48x48.png)
│   │   │   ├── [icon-512x512.png](./doi/public/icons/icon-512x512.png)
│   │   │   ├── [icon-64x64.png](./doi/public/icons/icon-64x64.png)
│   │   │   ├── [icon-72x72.png](./doi/public/icons/icon-72x72.png)
│   │   │   ├── [icon-96x96.png](./doi/public/icons/icon-96x96.png)
│   │   │   └── [icon.svg](./doi/public/icons/icon.svg)
│   │   ├── wasm/
│   │   │   └── [sql-wasm.wasm](./doi/public/wasm/sql-wasm.wasm)
│   │   ├── [apple-touch-icon.png](./doi/public/apple-touch-icon.png)
│   │   ├── [favicon.ico](./doi/public/favicon.ico)
│   │   ├── [manifest.json](./doi/public/manifest.json)
│   │   ├── [robots.txt](./doi/public/robots.txt)
│   │   ├── [sitemap.xml](./doi/public/sitemap.xml)
│   │   └── [sw.js](./doi/public/sw.js)
│   ├── src/
│   │   ├── app/
│   │   │   ├── (app)/
│   │   │   │   ├── graph/
│   │   │   │   │   └── [page.tsx](./doi/src/app/(app)/graph/page.tsx)
│   │   │   │   ├── overview/
│   │   │   │   │   └── [page.tsx](./doi/src/app/(app)/overview/page.tsx)
│   │   │   │   └── search/
│   │   │   │       └── [page.tsx](./doi/src/app/(app)/search/page.tsx)
│   │   │   ├── (info)/
│   │   │   │   ├── about/
│   │   │   │   │   └── [page.tsx](./doi/src/app/(info)/about/page.tsx)
│   │   │   │   ├── downloads/
│   │   │   │   │   └── [page.tsx](./doi/src/app/(info)/downloads/page.tsx)
│   │   │   │   └── version/
│   │   │   │       └── [page.tsx](./doi/src/app/(info)/version/page.tsx)
│   │   │   ├── [default.tsx](./doi/src/app/default.tsx)
│   │   │   ├── [error.tsx](./doi/src/app/error.tsx)
│   │   │   ├── [favicon.ico](./doi/src/app/favicon.ico)
│   │   │   ├── [forbidden.tsx](./doi/src/app/forbidden.tsx)
│   │   │   ├── [global-error.tsx](./doi/src/app/global-error.tsx)
│   │   │   ├── [layout.tsx](./doi/src/app/layout.tsx)
│   │   │   ├── [loading.tsx](./doi/src/app/loading.tsx)
│   │   │   ├── [not-found.tsx](./doi/src/app/not-found.tsx)
│   │   │   ├── [page.tsx](./doi/src/app/page.tsx)
│   │   │   ├── [robots.ts](./doi/src/app/robots.ts)
│   │   │   └── [unauthorized.tsx](./doi/src/app/unauthorized.tsx)
│   │   ├── components/
│   │   │   ├── atoms/
│   │   │   │   ├── [SearchBox.tsx](./doi/src/components/atoms/SearchBox.tsx)
│   │   │   │   ├── [SearchResultItem.tsx](./doi/src/components/atoms/SearchResultItem.tsx)
│   │   │   │   └── [StatCard.tsx](./doi/src/components/atoms/StatCard.tsx)
│   │   │   ├── molecules/
│   │   │   │   ├── [CitationGraph.tsx](./doi/src/components/molecules/CitationGraph.tsx)
│   │   │   │   ├── [ErrorState.tsx](./doi/src/components/molecules/ErrorState.tsx)
│   │   │   │   ├── [LoadingState.tsx](./doi/src/components/molecules/LoadingState.tsx)
│   │   │   │   ├── [RankingList.tsx](./doi/src/components/molecules/RankingList.tsx)
│   │   │   │   ├── [SearchResults.tsx](./doi/src/components/molecules/SearchResults.tsx)
│   │   │   │   └── [YearChart.tsx](./doi/src/components/molecules/YearChart.tsx)
│   │   │   ├── organisms/
│   │   │   │   └── [Header.tsx](./doi/src/components/organisms/Header.tsx)
│   │   │   └── templates/
│   │   │       ├── [AboutTemplate.tsx](./doi/src/components/templates/AboutTemplate.tsx)
│   │   │       ├── [DownloadsTemplate.tsx](./doi/src/components/templates/DownloadsTemplate.tsx)
│   │   │       ├── [ErrorTemplate.tsx](./doi/src/components/templates/ErrorTemplate.tsx)
│   │   │       ├── [HomeTemplate.tsx](./doi/src/components/templates/HomeTemplate.tsx)
│   │   │       └── [VersionTemplate.tsx](./doi/src/components/templates/VersionTemplate.tsx)
│   │   ├── content/
│   │   │   ├── [about.ts](./doi/src/content/about.ts)
│   │   │   ├── [download.ts](./doi/src/content/download.ts)
│   │   │   └── [version.ts](./doi/src/content/version.ts)
│   │   ├── lib/
│   │   │   ├── __tests__/
│   │   │   │   ├── [abstract.test.ts](./doi/src/lib/__tests__/abstract.test.ts)
│   │   │   │   ├── [queries.test.ts](./doi/src/lib/__tests__/queries.test.ts)
│   │   │   │   └── [sqlite.test.ts](./doi/src/lib/__tests__/sqlite.test.ts)
│   │   │   ├── stubs/
│   │   │   │   └── [node-builtins.ts](./doi/src/lib/stubs/node-builtins.ts)
│   │   │   ├── [abstract.ts](./doi/src/lib/abstract.ts)
│   │   │   ├── [queries.ts](./doi/src/lib/queries.ts)
│   │   │   └── [sqlite.ts](./doi/src/lib/sqlite.ts)
│   │   ├── providers/
│   │   │   ├── [DoiProvider.tsx](./doi/src/providers/DoiProvider.tsx)
│   │   │   └── [Shell.tsx](./doi/src/providers/Shell.tsx)
│   │   ├── styles/
│   │   │   ├── [base.css](./doi/src/styles/base.css)
│   │   │   ├── [globals.css](./doi/src/styles/globals.css)
│   │   │   └── [themes.css](./doi/src/styles/themes.css)
│   │   └── types/
│   │       └── [doi.ts](./doi/src/types/doi.ts)
│   ├── src-tauri/
│   │   ├── capabilities/
│   │   │   └── [default.json](./doi/src-tauri/capabilities/default.json)
│   │   ├── icons/
│   │   │   ├── android/
│   │   │   │   ├── mipmap-anydpi-v26/
│   │   │   │   │   └── [ic_launcher.xml](./doi/src-tauri/icons/android/mipmap-anydpi-v26/ic_launcher.xml)
│   │   │   │   ├── mipmap-hdpi/
│   │   │   │   │   ├── [ic_launcher.png](./doi/src-tauri/icons/android/mipmap-hdpi/ic_launcher.png)
│   │   │   │   │   ├── [ic_launcher_foreground.png](./doi/src-tauri/icons/android/mipmap-hdpi/ic_launcher_foreground.png)
│   │   │   │   │   └── [ic_launcher_round.png](./doi/src-tauri/icons/android/mipmap-hdpi/ic_launcher_round.png)
│   │   │   │   ├── mipmap-mdpi/
│   │   │   │   │   ├── [ic_launcher.png](./doi/src-tauri/icons/android/mipmap-mdpi/ic_launcher.png)
│   │   │   │   │   ├── [ic_launcher_foreground.png](./doi/src-tauri/icons/android/mipmap-mdpi/ic_launcher_foreground.png)
│   │   │   │   │   └── [ic_launcher_round.png](./doi/src-tauri/icons/android/mipmap-mdpi/ic_launcher_round.png)
│   │   │   │   ├── mipmap-xhdpi/
│   │   │   │   │   ├── [ic_launcher.png](./doi/src-tauri/icons/android/mipmap-xhdpi/ic_launcher.png)
│   │   │   │   │   ├── [ic_launcher_foreground.png](./doi/src-tauri/icons/android/mipmap-xhdpi/ic_launcher_foreground.png)
│   │   │   │   │   └── [ic_launcher_round.png](./doi/src-tauri/icons/android/mipmap-xhdpi/ic_launcher_round.png)
│   │   │   │   ├── mipmap-xxhdpi/
│   │   │   │   │   ├── [ic_launcher.png](./doi/src-tauri/icons/android/mipmap-xxhdpi/ic_launcher.png)
│   │   │   │   │   ├── [ic_launcher_foreground.png](./doi/src-tauri/icons/android/mipmap-xxhdpi/ic_launcher_foreground.png)
│   │   │   │   │   └── [ic_launcher_round.png](./doi/src-tauri/icons/android/mipmap-xxhdpi/ic_launcher_round.png)
│   │   │   │   ├── mipmap-xxxhdpi/
│   │   │   │   │   ├── [ic_launcher.png](./doi/src-tauri/icons/android/mipmap-xxxhdpi/ic_launcher.png)
│   │   │   │   │   ├── [ic_launcher_foreground.png](./doi/src-tauri/icons/android/mipmap-xxxhdpi/ic_launcher_foreground.png)
│   │   │   │   │   └── [ic_launcher_round.png](./doi/src-tauri/icons/android/mipmap-xxxhdpi/ic_launcher_round.png)
│   │   │   │   └── values/
│   │   │   │       └── [ic_launcher_background.xml](./doi/src-tauri/icons/android/values/ic_launcher_background.xml)
│   │   │   ├── ios/
│   │   │   │   ├── [AppIcon-20x20@1x.png](./doi/src-tauri/icons/ios/AppIcon-20x20@1x.png)
│   │   │   │   ├── [AppIcon-20x20@2x-1.png](./doi/src-tauri/icons/ios/AppIcon-20x20@2x-1.png)
│   │   │   │   ├── [AppIcon-20x20@2x.png](./doi/src-tauri/icons/ios/AppIcon-20x20@2x.png)
│   │   │   │   ├── [AppIcon-20x20@3x.png](./doi/src-tauri/icons/ios/AppIcon-20x20@3x.png)
│   │   │   │   ├── [AppIcon-29x29@1x.png](./doi/src-tauri/icons/ios/AppIcon-29x29@1x.png)
│   │   │   │   ├── [AppIcon-29x29@2x-1.png](./doi/src-tauri/icons/ios/AppIcon-29x29@2x-1.png)
│   │   │   │   ├── [AppIcon-29x29@2x.png](./doi/src-tauri/icons/ios/AppIcon-29x29@2x.png)
│   │   │   │   ├── [AppIcon-29x29@3x.png](./doi/src-tauri/icons/ios/AppIcon-29x29@3x.png)
│   │   │   │   ├── [AppIcon-40x40@1x.png](./doi/src-tauri/icons/ios/AppIcon-40x40@1x.png)
│   │   │   │   ├── [AppIcon-40x40@2x-1.png](./doi/src-tauri/icons/ios/AppIcon-40x40@2x-1.png)
│   │   │   │   ├── [AppIcon-40x40@2x.png](./doi/src-tauri/icons/ios/AppIcon-40x40@2x.png)
│   │   │   │   ├── [AppIcon-40x40@3x.png](./doi/src-tauri/icons/ios/AppIcon-40x40@3x.png)
│   │   │   │   ├── [AppIcon-512@2x.png](./doi/src-tauri/icons/ios/AppIcon-512@2x.png)
│   │   │   │   ├── [AppIcon-60x60@2x.png](./doi/src-tauri/icons/ios/AppIcon-60x60@2x.png)
│   │   │   │   ├── [AppIcon-60x60@3x.png](./doi/src-tauri/icons/ios/AppIcon-60x60@3x.png)
│   │   │   │   ├── [AppIcon-76x76@1x.png](./doi/src-tauri/icons/ios/AppIcon-76x76@1x.png)
│   │   │   │   ├── [AppIcon-76x76@2x.png](./doi/src-tauri/icons/ios/AppIcon-76x76@2x.png)
│   │   │   │   └── [AppIcon-83.5x83.5@2x.png](./doi/src-tauri/icons/ios/AppIcon-83.5x83.5@2x.png)
│   │   │   ├── [128x128.png](./doi/src-tauri/icons/128x128.png)
│   │   │   ├── [128x128@2x.png](./doi/src-tauri/icons/128x128@2x.png)
│   │   │   ├── [32x32.png](./doi/src-tauri/icons/32x32.png)
│   │   │   ├── [64x64.png](./doi/src-tauri/icons/64x64.png)
│   │   │   ├── [Square107x107Logo.png](./doi/src-tauri/icons/Square107x107Logo.png)
│   │   │   ├── [Square142x142Logo.png](./doi/src-tauri/icons/Square142x142Logo.png)
│   │   │   ├── [Square150x150Logo.png](./doi/src-tauri/icons/Square150x150Logo.png)
│   │   │   ├── [Square284x284Logo.png](./doi/src-tauri/icons/Square284x284Logo.png)
│   │   │   ├── [Square30x30Logo.png](./doi/src-tauri/icons/Square30x30Logo.png)
│   │   │   ├── [Square310x310Logo.png](./doi/src-tauri/icons/Square310x310Logo.png)
│   │   │   ├── [Square44x44Logo.png](./doi/src-tauri/icons/Square44x44Logo.png)
│   │   │   ├── [Square71x71Logo.png](./doi/src-tauri/icons/Square71x71Logo.png)
│   │   │   ├── [Square89x89Logo.png](./doi/src-tauri/icons/Square89x89Logo.png)
│   │   │   ├── [StoreLogo.png](./doi/src-tauri/icons/StoreLogo.png)
│   │   │   ├── [create-icons.sh](./doi/src-tauri/icons/create-icons.sh)
│   │   │   ├── [icon.icns](./doi/src-tauri/icons/icon.icns)
│   │   │   ├── [icon.ico](./doi/src-tauri/icons/icon.ico)
│   │   │   └── [icon.png](./doi/src-tauri/icons/icon.png)
│   │   ├── src/
│   │   │   ├── [lib.rs](./doi/src-tauri/src/lib.rs)
│   │   │   └── [main.rs](./doi/src-tauri/src/main.rs)
│   │   ├── [Cargo.lock](./doi/src-tauri/Cargo.lock)
│   │   ├── [Cargo.toml](./doi/src-tauri/Cargo.toml)
│   │   ├── [build.rs](./doi/src-tauri/build.rs)
│   │   └── [tauri.conf.json](./doi/src-tauri/tauri.conf.json)
│   ├── [AGENTS.md](./doi/AGENTS.md)
│   ├── [eslint.config.mts](./doi/eslint.config.mts)
│   ├── [jest.config.ts](./doi/jest.config.ts)
│   ├── [jest.setup.ts](./doi/jest.setup.ts)
│   ├── [next.config.ts](./doi/next.config.ts)
│   ├── [package.json](./doi/package.json)
│   ├── [playwright.config.ts](./doi/playwright.config.ts)
│   ├── [postcss.config.mjs](./doi/postcss.config.mjs)
│   └── [tsconfig.json](./doi/tsconfig.json)
├── economics/
│   ├── docs/
│   │   ├── [ARCHITECTURE.md](./economics/docs/ARCHITECTURE.md)
│   │   ├── [CONTRIBUTING.md](./economics/docs/CONTRIBUTING.md)
│   │   ├── [DOWNLOADS.md](./economics/docs/DOWNLOADS.md)
│   │   ├── [PACKAGING.md](./economics/docs/PACKAGING.md)
│   │   └── [ROADMAP.md](./economics/docs/ROADMAP.md)
│   ├── e2e/
│   │   ├── screenshots/
│   │   │   ├── [about.png](./economics/e2e/screenshots/about.png)
│   │   │   ├── [downloads.png](./economics/e2e/screenshots/downloads.png)
│   │   │   ├── [home.png](./economics/e2e/screenshots/home.png)
│   │   │   └── [version.png](./economics/e2e/screenshots/version.png)
│   │   ├── [about.spec.ts](./economics/e2e/about.spec.ts)
│   │   ├── [downloads.spec.ts](./economics/e2e/downloads.spec.ts)
│   │   ├── [home.spec.ts](./economics/e2e/home.spec.ts)
│   │   └── [version.spec.ts](./economics/e2e/version.spec.ts)
│   ├── public/
│   │   ├── icons/
│   │   │   ├── [icon-128x128.png](./economics/public/icons/icon-128x128.png)
│   │   │   ├── [icon-144x144.png](./economics/public/icons/icon-144x144.png)
│   │   │   ├── [icon-152x152.png](./economics/public/icons/icon-152x152.png)
│   │   │   ├── [icon-16x16.png](./economics/public/icons/icon-16x16.png)
│   │   │   ├── [icon-180x180.png](./economics/public/icons/icon-180x180.png)
│   │   │   ├── [icon-192x192.png](./economics/public/icons/icon-192x192.png)
│   │   │   ├── [icon-256x256.png](./economics/public/icons/icon-256x256.png)
│   │   │   ├── [icon-32x32.png](./economics/public/icons/icon-32x32.png)
│   │   │   ├── [icon-384x384.png](./economics/public/icons/icon-384x384.png)
│   │   │   ├── [icon-48x48.png](./economics/public/icons/icon-48x48.png)
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
│   │   │   │   ├── adverse-selection/
│   │   │   │   │   └── lemons/
│   │   │   │   │       ├── __tests__/
│   │   │   │   │       │   └── [page.test.tsx](./economics/src/app/(games)/adverse-selection/lemons/__tests__/page.test.tsx)
│   │   │   │   │       └── [page.tsx](./economics/src/app/(games)/adverse-selection/lemons/page.tsx)
│   │   │   │   ├── aggregate-demand-supply/
│   │   │   │   │   └── shocks/
│   │   │   │   │       ├── __tests__/
│   │   │   │   │       │   └── [page.test.tsx](./economics/src/app/(games)/aggregate-demand-supply/shocks/__tests__/page.test.tsx)
│   │   │   │   │       └── [page.tsx](./economics/src/app/(games)/aggregate-demand-supply/shocks/page.tsx)
│   │   │   │   ├── arbitrage/
│   │   │   │   │   └── triangular/
│   │   │   │   │       ├── __tests__/
│   │   │   │   │       │   └── [page.test.tsx](./economics/src/app/(games)/arbitrage/triangular/__tests__/page.test.tsx)
│   │   │   │   │       └── [page.tsx](./economics/src/app/(games)/arbitrage/triangular/page.tsx)
│   │   │   │   ├── auction-theory/
│   │   │   │   │   └── auction/
│   │   │   │   │       ├── __tests__/
│   │   │   │   │       │   └── [page.test.tsx](./economics/src/app/(games)/auction-theory/auction/__tests__/page.test.tsx)
│   │   │   │   │       └── [page.tsx](./economics/src/app/(games)/auction-theory/auction/page.tsx)
│   │   │   │   ├── backward-induction/
│   │   │   │   │   └── rollback/
│   │   │   │   │       ├── __tests__/
│   │   │   │   │       │   └── [page.test.tsx](./economics/src/app/(games)/backward-induction/rollback/__tests__/page.test.tsx)
│   │   │   │   │       └── [page.tsx](./economics/src/app/(games)/backward-induction/rollback/page.tsx)
│   │   │   │   ├── bargaining-theory/
│   │   │   │   │   └── ultimatum/
│   │   │   │   │       ├── __tests__/
│   │   │   │   │       │   └── [page.test.tsx](./economics/src/app/(games)/bargaining-theory/ultimatum/__tests__/page.test.tsx)
│   │   │   │   │       └── [page.tsx](./economics/src/app/(games)/bargaining-theory/ultimatum/page.tsx)
│   │   │   │   ├── bayesian-updating/
│   │   │   │   │   └── monty-hall/
│   │   │   │   │       ├── __tests__/
│   │   │   │   │       │   └── [page.test.tsx](./economics/src/app/(games)/bayesian-updating/monty-hall/__tests__/page.test.tsx)
│   │   │   │   │       └── [page.tsx](./economics/src/app/(games)/bayesian-updating/monty-hall/page.tsx)
│   │   │   │   ├── behavioral-finance/
│   │   │   │   │   └── bubble/
│   │   │   │   │       ├── __tests__/
│   │   │   │   │       │   └── [page.test.tsx](./economics/src/app/(games)/behavioral-finance/bubble/__tests__/page.test.tsx)
│   │   │   │   │       └── [page.tsx](./economics/src/app/(games)/behavioral-finance/bubble/page.tsx)
│   │   │   │   ├── behavioral-heuristics/
│   │   │   │   │   └── lab/
│   │   │   │   │       ├── __tests__/
│   │   │   │   │       │   └── [page.test.tsx](./economics/src/app/(games)/behavioral-heuristics/lab/__tests__/page.test.tsx)
│   │   │   │   │       └── [page.tsx](./economics/src/app/(games)/behavioral-heuristics/lab/page.tsx)
│   │   │   │   ├── business-cycles/
│   │   │   │   │   └── predict/
│   │   │   │   │       ├── __tests__/
│   │   │   │   │       │   └── [page.test.tsx](./economics/src/app/(games)/business-cycles/predict/__tests__/page.test.tsx)
│   │   │   │   │       └── [page.tsx](./economics/src/app/(games)/business-cycles/predict/page.tsx)
│   │   │   │   ├── capm-and-risk/
│   │   │   │   │   └── portfolio/
│   │   │   │   │       ├── __tests__/
│   │   │   │   │       │   └── [page.test.tsx](./economics/src/app/(games)/capm-and-risk/portfolio/__tests__/page.test.tsx)
│   │   │   │   │       └── [page.tsx](./economics/src/app/(games)/capm-and-risk/portfolio/page.tsx)
│   │   │   │   ├── causal-inference/
│   │   │   │   │   └── experiments/
│   │   │   │   │       ├── __tests__/
│   │   │   │   │       │   └── [page.test.tsx](./economics/src/app/(games)/causal-inference/experiments/__tests__/page.test.tsx)
│   │   │   │   │       └── [page.tsx](./economics/src/app/(games)/causal-inference/experiments/page.tsx)
│   │   │   │   ├── consumer-theory/
│   │   │   │   │   └── utility/
│   │   │   │   │       ├── __tests__/
│   │   │   │   │       │   └── [page.test.tsx](./economics/src/app/(games)/consumer-theory/utility/__tests__/page.test.tsx)
│   │   │   │   │       └── [page.tsx](./economics/src/app/(games)/consumer-theory/utility/page.tsx)
│   │   │   │   ├── coordination-games/
│   │   │   │   │   └── stag-hunt/
│   │   │   │   │       ├── __tests__/
│   │   │   │   │       │   └── [page.test.tsx](./economics/src/app/(games)/coordination-games/stag-hunt/__tests__/page.test.tsx)
│   │   │   │   │       └── [page.tsx](./economics/src/app/(games)/coordination-games/stag-hunt/page.tsx)
│   │   │   │   ├── development-rcts/
│   │   │   │   │   └── experiment/
│   │   │   │   │       ├── __tests__/
│   │   │   │   │       │   └── [page.test.tsx](./economics/src/app/(games)/development-rcts/experiment/__tests__/page.test.tsx)
│   │   │   │   │       └── [page.tsx](./economics/src/app/(games)/development-rcts/experiment/page.tsx)
│   │   │   │   ├── economic-inequality/
│   │   │   │   │   └── lorenz/
│   │   │   │   │       └── [page.tsx](./economics/src/app/(games)/economic-inequality/lorenz/page.tsx)
│   │   │   │   ├── efficient-market-hypothesis/
│   │   │   │   │   └── random-walk/
│   │   │   │   │       ├── __tests__/
│   │   │   │   │       │   └── [page.test.tsx](./economics/src/app/(games)/efficient-market-hypothesis/random-walk/__tests__/page.test.tsx)
│   │   │   │   │       └── [page.tsx](./economics/src/app/(games)/efficient-market-hypothesis/random-walk/page.tsx)
│   │   │   │   ├── elasticity/
│   │   │   │   │   └── pricing/
│   │   │   │   │       ├── __tests__/
│   │   │   │   │       │   └── [page.test.tsx](./economics/src/app/(games)/elasticity/pricing/__tests__/page.test.tsx)
│   │   │   │   │       └── [page.tsx](./economics/src/app/(games)/elasticity/pricing/page.tsx)
│   │   │   │   ├── endowment-effect/
│   │   │   │   │   └── trade/
│   │   │   │   │       ├── __tests__/
│   │   │   │   │       │   └── [page.test.tsx](./economics/src/app/(games)/endowment-effect/trade/__tests__/page.test.tsx)
│   │   │   │   │       └── [page.tsx](./economics/src/app/(games)/endowment-effect/trade/page.tsx)
│   │   │   │   ├── evolutionary-game-theory/
│   │   │   │   │   └── replicator/
│   │   │   │   │       ├── __tests__/
│   │   │   │   │       │   └── [page.test.tsx](./economics/src/app/(games)/evolutionary-game-theory/replicator/__tests__/page.test.tsx)
│   │   │   │   │       └── [page.tsx](./economics/src/app/(games)/evolutionary-game-theory/replicator/page.tsx)
│   │   │   │   ├── externalities/
│   │   │   │   │   └── pigou/
│   │   │   │   │       ├── __tests__/
│   │   │   │   │       │   └── [page.test.tsx](./economics/src/app/(games)/externalities/pigou/__tests__/page.test.tsx)
│   │   │   │   │       └── [page.tsx](./economics/src/app/(games)/externalities/pigou/page.tsx)
│   │   │   │   ├── fiscal-policy/
│   │   │   │   │   └── stimulus/
│   │   │   │   │       ├── __tests__/
│   │   │   │   │       │   └── [page.test.tsx](./economics/src/app/(games)/fiscal-policy/stimulus/__tests__/page.test.tsx)
│   │   │   │   │       └── [page.tsx](./economics/src/app/(games)/fiscal-policy/stimulus/page.tsx)
│   │   │   │   ├── game-theory-basics/
│   │   │   │   │   └── matrix/
│   │   │   │   │       ├── __tests__/
│   │   │   │   │       │   └── [page.test.tsx](./economics/src/app/(games)/game-theory-basics/matrix/__tests__/page.test.tsx)
│   │   │   │   │       └── [page.tsx](./economics/src/app/(games)/game-theory-basics/matrix/page.tsx)
│   │   │   │   ├── gdp-and-national-accounts/
│   │   │   │   │   └── aggregate/
│   │   │   │   │       ├── __tests__/
│   │   │   │   │       │   └── [page.test.tsx](./economics/src/app/(games)/gdp-and-national-accounts/aggregate/__tests__/page.test.tsx)
│   │   │   │   │       └── [page.tsx](./economics/src/app/(games)/gdp-and-national-accounts/aggregate/page.tsx)
│   │   │   │   ├── human-capital/
│   │   │   │   │   └── decision/
│   │   │   │   │       ├── __tests__/
│   │   │   │   │       │   └── [page.test.tsx](./economics/src/app/(games)/human-capital/decision/__tests__/page.test.tsx)
│   │   │   │   │       └── [page.tsx](./economics/src/app/(games)/human-capital/decision/page.tsx)
│   │   │   │   ├── imperfect-competition/
│   │   │   │   │   └── lab/
│   │   │   │   │       ├── __tests__/
│   │   │   │   │       │   └── [page.test.tsx](./economics/src/app/(games)/imperfect-competition/lab/__tests__/page.test.tsx)
│   │   │   │   │       └── [page.tsx](./economics/src/app/(games)/imperfect-competition/lab/page.tsx)
│   │   │   │   ├── institutions-and-growth/
│   │   │   │   │   └── lab/
│   │   │   │   │       ├── __tests__/
│   │   │   │   │       │   └── [page.test.tsx](./economics/src/app/(games)/institutions-and-growth/lab/__tests__/page.test.tsx)
│   │   │   │   │       └── [page.tsx](./economics/src/app/(games)/institutions-and-growth/lab/page.tsx)
│   │   │   │   ├── is-lm-model/
│   │   │   │   │   └── equilibrium/
│   │   │   │   │       ├── __tests__/
│   │   │   │   │       │   └── [page.test.tsx](./economics/src/app/(games)/is-lm-model/equilibrium/__tests__/page.test.tsx)
│   │   │   │   │       └── [page.tsx](./economics/src/app/(games)/is-lm-model/equilibrium/page.tsx)
│   │   │   │   ├── keynesian-economics/
│   │   │   │   │   └── cross/
│   │   │   │   │       ├── __tests__/
│   │   │   │   │       │   └── [page.test.tsx](./economics/src/app/(games)/keynesian-economics/cross/__tests__/page.test.tsx)
│   │   │   │   │       └── [page.tsx](./economics/src/app/(games)/keynesian-economics/cross/page.tsx)
│   │   │   │   ├── labor-markets/
│   │   │   │   │   └── wage/
│   │   │   │   │       ├── __tests__/
│   │   │   │   │       │   └── [page.test.tsx](./economics/src/app/(games)/labor-markets/wage/__tests__/page.test.tsx)
│   │   │   │   │       └── [page.tsx](./economics/src/app/(games)/labor-markets/wage/page.tsx)
│   │   │   │   ├── marginal-utility/
│   │   │   │   │   └── lab/
│   │   │   │   │       ├── __tests__/
│   │   │   │   │       │   └── [page.test.tsx](./economics/src/app/(games)/marginal-utility/lab/__tests__/page.test.tsx)
│   │   │   │   │       └── [page.tsx](./economics/src/app/(games)/marginal-utility/lab/page.tsx)
│   │   │   │   ├── market-failures/
│   │   │   │   │   └── policies/
│   │   │   │   │       ├── __tests__/
│   │   │   │   │       │   └── [page.test.tsx](./economics/src/app/(games)/market-failures/policies/__tests__/page.test.tsx)
│   │   │   │   │       └── [page.tsx](./economics/src/app/(games)/market-failures/policies/page.tsx)
│   │   │   │   ├── market-microstructure/
│   │   │   │   │   └── order-book/
│   │   │   │   │       ├── __tests__/
│   │   │   │   │       │   └── [page.test.tsx](./economics/src/app/(games)/market-microstructure/order-book/__tests__/page.test.tsx)
│   │   │   │   │       └── [page.tsx](./economics/src/app/(games)/market-microstructure/order-book/page.tsx)
│   │   │   │   ├── mechanism-design/
│   │   │   │   │   └── reveal/
│   │   │   │   │       ├── __tests__/
│   │   │   │   │       │   └── [page.test.tsx](./economics/src/app/(games)/mechanism-design/reveal/__tests__/page.test.tsx)
│   │   │   │   │       └── [page.tsx](./economics/src/app/(games)/mechanism-design/reveal/page.tsx)
│   │   │   │   ├── mental-accounting/
│   │   │   │   │   └── scenarios/
│   │   │   │   │       ├── __tests__/
│   │   │   │   │       │   └── [page.test.tsx](./economics/src/app/(games)/mental-accounting/scenarios/__tests__/page.test.tsx)
│   │   │   │   │       └── [page.tsx](./economics/src/app/(games)/mental-accounting/scenarios/page.tsx)
│   │   │   │   ├── migration-economics/
│   │   │   │   │   └── moves/
│   │   │   │   │       ├── __tests__/
│   │   │   │   │       │   └── [page.test.tsx](./economics/src/app/(games)/migration-economics/moves/__tests__/page.test.tsx)
│   │   │   │   │       └── [page.tsx](./economics/src/app/(games)/migration-economics/moves/page.tsx)
│   │   │   │   ├── monetary-policy/
│   │   │   │   │   └── interest/
│   │   │   │   │       ├── __tests__/
│   │   │   │   │       │   └── [page.test.tsx](./economics/src/app/(games)/monetary-policy/interest/__tests__/page.test.tsx)
│   │   │   │   │       └── [page.tsx](./economics/src/app/(games)/monetary-policy/interest/page.tsx)
│   │   │   │   ├── monopoly-and-market-power/
│   │   │   │   │   └── pricing/
│   │   │   │   │       ├── __tests__/
│   │   │   │   │       │   └── [page.test.tsx](./economics/src/app/(games)/monopoly-and-market-power/pricing/__tests__/page.test.tsx)
│   │   │   │   │       └── [page.tsx](./economics/src/app/(games)/monopoly-and-market-power/pricing/page.tsx)
│   │   │   │   ├── moral-hazard/
│   │   │   │   │   └── insurance/
│   │   │   │   │       ├── __tests__/
│   │   │   │   │       │   └── [page.test.tsx](./economics/src/app/(games)/moral-hazard/insurance/__tests__/page.test.tsx)
│   │   │   │   │       └── [page.tsx](./economics/src/app/(games)/moral-hazard/insurance/page.tsx)
│   │   │   │   ├── nash-equilibrium/
│   │   │   │   │   └── solve/
│   │   │   │   │       ├── __tests__/
│   │   │   │   │       │   └── [page.test.tsx](./economics/src/app/(games)/nash-equilibrium/solve/__tests__/page.test.tsx)
│   │   │   │   │       └── [page.tsx](./economics/src/app/(games)/nash-equilibrium/solve/page.tsx)
│   │   │   │   ├── nudge-and-behavioral-economics/
│   │   │   │   │   └── choice/
│   │   │   │   │       ├── __tests__/
│   │   │   │   │       │   └── [page.test.tsx](./economics/src/app/(games)/nudge-and-behavioral-economics/choice/__tests__/page.test.tsx)
│   │   │   │   │       └── [page.tsx](./economics/src/app/(games)/nudge-and-behavioral-economics/choice/page.tsx)
│   │   │   │   ├── oligopoly/
│   │   │   │   │   └── cournot/
│   │   │   │   │       ├── __tests__/
│   │   │   │   │       │   └── [page.test.tsx](./economics/src/app/(games)/oligopoly/cournot/__tests__/page.test.tsx)
│   │   │   │   │       └── [page.tsx](./economics/src/app/(games)/oligopoly/cournot/page.tsx)
│   │   │   │   ├── opportunity-cost/
│   │   │   │   │   └── trade-offs/
│   │   │   │   │       ├── __tests__/
│   │   │   │   │       │   └── [page.test.tsx](./economics/src/app/(games)/opportunity-cost/trade-offs/__tests__/page.test.tsx)
│   │   │   │   │       └── [page.tsx](./economics/src/app/(games)/opportunity-cost/trade-offs/page.tsx)
│   │   │   │   ├── overconfidence-bias/
│   │   │   │   │   └── calibration/
│   │   │   │   │       ├── __tests__/
│   │   │   │   │       │   └── [page.test.tsx](./economics/src/app/(games)/overconfidence-bias/calibration/__tests__/page.test.tsx)
│   │   │   │   │       └── [page.tsx](./economics/src/app/(games)/overconfidence-bias/calibration/page.tsx)
│   │   │   │   ├── perfect-competition/
│   │   │   │   │   └── firm/
│   │   │   │   │       ├── __tests__/
│   │   │   │   │       │   └── [page.test.tsx](./economics/src/app/(games)/perfect-competition/firm/__tests__/page.test.tsx)
│   │   │   │   │       └── [page.tsx](./economics/src/app/(games)/perfect-competition/firm/page.tsx)
│   │   │   │   ├── phillips-curve/
│   │   │   │   │   └── tradeoff/
│   │   │   │   │       ├── __tests__/
│   │   │   │   │       │   └── [page.test.tsx](./economics/src/app/(games)/phillips-curve/tradeoff/__tests__/page.test.tsx)
│   │   │   │   │       └── [page.tsx](./economics/src/app/(games)/phillips-curve/tradeoff/page.tsx)
│   │   │   │   ├── portfolio-theory/
│   │   │   │   │   └── frontier/
│   │   │   │   │       ├── __tests__/
│   │   │   │   │       │   └── [page.test.tsx](./economics/src/app/(games)/portfolio-theory/frontier/__tests__/page.test.tsx)
│   │   │   │   │       └── [page.tsx](./economics/src/app/(games)/portfolio-theory/frontier/page.tsx)
│   │   │   │   ├── poverty-traps/
│   │   │   │   │   └── escape/
│   │   │   │   │       ├── __tests__/
│   │   │   │   │       │   └── [page.test.tsx](./economics/src/app/(games)/poverty-traps/escape/__tests__/page.test.tsx)
│   │   │   │   │       └── [page.tsx](./economics/src/app/(games)/poverty-traps/escape/page.tsx)
│   │   │   │   ├── price-discrimination/
│   │   │   │   │   └── split/
│   │   │   │   │       ├── __tests__/
│   │   │   │   │       │   └── [page.test.tsx](./economics/src/app/(games)/price-discrimination/split/__tests__/page.test.tsx)
│   │   │   │   │       └── [page.tsx](./economics/src/app/(games)/price-discrimination/split/page.tsx)
│   │   │   │   ├── prisoners-dilemma/
│   │   │   │   │   ├── bots/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   └── [page.test.tsx](./economics/src/app/(games)/prisoners-dilemma/bots/__tests__/page.test.tsx)
│   │   │   │   │   │   └── [page.tsx](./economics/src/app/(games)/prisoners-dilemma/bots/page.tsx)
│   │   │   │   │   ├── simulation/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   └── [page.test.tsx](./economics/src/app/(games)/prisoners-dilemma/simulation/__tests__/page.test.tsx)
│   │   │   │   │   │   └── [page.tsx](./economics/src/app/(games)/prisoners-dilemma/simulation/page.tsx)
│   │   │   │   │   └── versus/
│   │   │   │   │       ├── __tests__/
│   │   │   │   │       │   └── [page.test.tsx](./economics/src/app/(games)/prisoners-dilemma/versus/__tests__/page.test.tsx)
│   │   │   │   │       └── [page.tsx](./economics/src/app/(games)/prisoners-dilemma/versus/page.tsx)
│   │   │   │   ├── production-and-costs/
│   │   │   │   │   └── lab/
│   │   │   │   │       ├── __tests__/
│   │   │   │   │       │   └── [page.test.tsx](./economics/src/app/(games)/production-and-costs/lab/__tests__/page.test.tsx)
│   │   │   │   │       └── [page.tsx](./economics/src/app/(games)/production-and-costs/lab/page.tsx)
│   │   │   │   ├── prospect-theory/
│   │   │   │   │   └── framing/
│   │   │   │   │       ├── __tests__/
│   │   │   │   │       │   └── [page.test.tsx](./economics/src/app/(games)/prospect-theory/framing/__tests__/page.test.tsx)
│   │   │   │   │       └── [page.tsx](./economics/src/app/(games)/prospect-theory/framing/page.tsx)
│   │   │   │   ├── public-choice/
│   │   │   │   │   └── voting/
│   │   │   │   │       ├── __tests__/
│   │   │   │   │       │   └── [page.test.tsx](./economics/src/app/(games)/public-choice/voting/__tests__/page.test.tsx)
│   │   │   │   │       └── [page.tsx](./economics/src/app/(games)/public-choice/voting/page.tsx)
│   │   │   │   ├── public-goods-dilemma/
│   │   │   │   │   └── contribute/
│   │   │   │   │       ├── __tests__/
│   │   │   │   │       │   └── [page.test.tsx](./economics/src/app/(games)/public-goods-dilemma/contribute/__tests__/page.test.tsx)
│   │   │   │   │       └── [page.tsx](./economics/src/app/(games)/public-goods-dilemma/contribute/page.tsx)
│   │   │   │   ├── repeated-games/
│   │   │   │   │   └── tournament/
│   │   │   │   │       ├── __tests__/
│   │   │   │   │       │   └── [page.test.tsx](./economics/src/app/(games)/repeated-games/tournament/__tests__/page.test.tsx)
│   │   │   │   │       └── [page.tsx](./economics/src/app/(games)/repeated-games/tournament/page.tsx)
│   │   │   │   ├── signaling/
│   │   │   │   │   └── job-market/
│   │   │   │   │       ├── __tests__/
│   │   │   │   │       │   └── [page.test.tsx](./economics/src/app/(games)/signaling/job-market/__tests__/page.test.tsx)
│   │   │   │   │       └── [page.tsx](./economics/src/app/(games)/signaling/job-market/page.tsx)
│   │   │   │   ├── social-preferences/
│   │   │   │   │   └── dictator/
│   │   │   │   │       ├── __tests__/
│   │   │   │   │       │   └── [page.test.tsx](./economics/src/app/(games)/social-preferences/dictator/__tests__/page.test.tsx)
│   │   │   │   │       └── [page.tsx](./economics/src/app/(games)/social-preferences/dictator/page.tsx)
│   │   │   │   ├── supply-and-demand/
│   │   │   │   │   └── price-lab/
│   │   │   │   │       ├── __tests__/
│   │   │   │   │       │   └── [page.test.tsx](./economics/src/app/(games)/supply-and-demand/price-lab/__tests__/page.test.tsx)
│   │   │   │   │       └── [page.tsx](./economics/src/app/(games)/supply-and-demand/price-lab/page.tsx)
│   │   │   │   ├── time-inconsistency/
│   │   │   │   │   └── savings/
│   │   │   │   │       ├── __tests__/
│   │   │   │   │       │   └── [page.test.tsx](./economics/src/app/(games)/time-inconsistency/savings/__tests__/page.test.tsx)
│   │   │   │   │       └── [page.tsx](./economics/src/app/(games)/time-inconsistency/savings/page.tsx)
│   │   │   │   ├── time-value-of-money/
│   │   │   │   │   └── lab/
│   │   │   │   │       ├── __tests__/
│   │   │   │   │       │   └── [page.test.tsx](./economics/src/app/(games)/time-value-of-money/lab/__tests__/page.test.tsx)
│   │   │   │   │       └── [page.tsx](./economics/src/app/(games)/time-value-of-money/lab/page.tsx)
│   │   │   │   ├── trade-and-tariffs/
│   │   │   │   │   └── lab/
│   │   │   │   │       ├── __tests__/
│   │   │   │   │       │   └── [page.test.tsx](./economics/src/app/(games)/trade-and-tariffs/lab/__tests__/page.test.tsx)
│   │   │   │   │       └── [page.tsx](./economics/src/app/(games)/trade-and-tariffs/lab/page.tsx)
│   │   │   │   ├── tragedy-of-the-commons/
│   │   │   │   │   └── harvest/
│   │   │   │   │       ├── __tests__/
│   │   │   │   │       │   └── [page.test.tsx](./economics/src/app/(games)/tragedy-of-the-commons/harvest/__tests__/page.test.tsx)
│   │   │   │   │       └── [page.tsx](./economics/src/app/(games)/tragedy-of-the-commons/harvest/page.tsx)
│   │   │   │   ├── unemployment-okuns-law/
│   │   │   │   │   └── lab/
│   │   │   │   │       ├── __tests__/
│   │   │   │   │       │   └── [page.test.tsx](./economics/src/app/(games)/unemployment-okuns-law/lab/__tests__/page.test.tsx)
│   │   │   │   │       └── [page.tsx](./economics/src/app/(games)/unemployment-okuns-law/lab/page.tsx)
│   │   │   │   └── zero-sum-games/
│   │   │   │       └── rps/
│   │   │   │           ├── __tests__/
│   │   │   │           │   └── [page.test.tsx](./economics/src/app/(games)/zero-sum-games/rps/__tests__/page.test.tsx)
│   │   │   │           └── [page.tsx](./economics/src/app/(games)/zero-sum-games/rps/page.tsx)
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
│   │   │   ├── (theory)/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [theory-pages.test.tsx](./economics/src/app/(theory)/__tests__/theory-pages.test.tsx)
│   │   │   │   ├── adverse-selection/
│   │   │   │   │   └── [page.tsx](./economics/src/app/(theory)/adverse-selection/page.tsx)
│   │   │   │   ├── aggregate-demand-supply/
│   │   │   │   │   └── [page.tsx](./economics/src/app/(theory)/aggregate-demand-supply/page.tsx)
│   │   │   │   ├── arbitrage/
│   │   │   │   │   └── [page.tsx](./economics/src/app/(theory)/arbitrage/page.tsx)
│   │   │   │   ├── auction-theory/
│   │   │   │   │   └── [page.tsx](./economics/src/app/(theory)/auction-theory/page.tsx)
│   │   │   │   ├── backward-induction/
│   │   │   │   │   └── [page.tsx](./economics/src/app/(theory)/backward-induction/page.tsx)
│   │   │   │   ├── bargaining-theory/
│   │   │   │   │   └── [page.tsx](./economics/src/app/(theory)/bargaining-theory/page.tsx)
│   │   │   │   ├── bayesian-updating/
│   │   │   │   │   └── [page.tsx](./economics/src/app/(theory)/bayesian-updating/page.tsx)
│   │   │   │   ├── behavioral-finance/
│   │   │   │   │   └── [page.tsx](./economics/src/app/(theory)/behavioral-finance/page.tsx)
│   │   │   │   ├── behavioral-heuristics/
│   │   │   │   │   └── [page.tsx](./economics/src/app/(theory)/behavioral-heuristics/page.tsx)
│   │   │   │   ├── business-cycles/
│   │   │   │   │   └── [page.tsx](./economics/src/app/(theory)/business-cycles/page.tsx)
│   │   │   │   ├── capm-and-risk/
│   │   │   │   │   └── [page.tsx](./economics/src/app/(theory)/capm-and-risk/page.tsx)
│   │   │   │   ├── causal-inference/
│   │   │   │   │   └── [page.tsx](./economics/src/app/(theory)/causal-inference/page.tsx)
│   │   │   │   ├── consumer-theory/
│   │   │   │   │   └── [page.tsx](./economics/src/app/(theory)/consumer-theory/page.tsx)
│   │   │   │   ├── coordination-games/
│   │   │   │   │   └── [page.tsx](./economics/src/app/(theory)/coordination-games/page.tsx)
│   │   │   │   ├── development-rcts/
│   │   │   │   │   └── [page.tsx](./economics/src/app/(theory)/development-rcts/page.tsx)
│   │   │   │   ├── economic-inequality/
│   │   │   │   │   └── [page.tsx](./economics/src/app/(theory)/economic-inequality/page.tsx)
│   │   │   │   ├── efficient-market-hypothesis/
│   │   │   │   │   └── [page.tsx](./economics/src/app/(theory)/efficient-market-hypothesis/page.tsx)
│   │   │   │   ├── elasticity/
│   │   │   │   │   └── [page.tsx](./economics/src/app/(theory)/elasticity/page.tsx)
│   │   │   │   ├── endowment-effect/
│   │   │   │   │   └── [page.tsx](./economics/src/app/(theory)/endowment-effect/page.tsx)
│   │   │   │   ├── evolutionary-game-theory/
│   │   │   │   │   └── [page.tsx](./economics/src/app/(theory)/evolutionary-game-theory/page.tsx)
│   │   │   │   ├── externalities/
│   │   │   │   │   └── [page.tsx](./economics/src/app/(theory)/externalities/page.tsx)
│   │   │   │   ├── fiscal-policy/
│   │   │   │   │   └── [page.tsx](./economics/src/app/(theory)/fiscal-policy/page.tsx)
│   │   │   │   ├── game-theory-basics/
│   │   │   │   │   └── [page.tsx](./economics/src/app/(theory)/game-theory-basics/page.tsx)
│   │   │   │   ├── gdp-and-national-accounts/
│   │   │   │   │   └── [page.tsx](./economics/src/app/(theory)/gdp-and-national-accounts/page.tsx)
│   │   │   │   ├── human-capital/
│   │   │   │   │   └── [page.tsx](./economics/src/app/(theory)/human-capital/page.tsx)
│   │   │   │   ├── imperfect-competition/
│   │   │   │   │   └── [page.tsx](./economics/src/app/(theory)/imperfect-competition/page.tsx)
│   │   │   │   ├── institutions-and-growth/
│   │   │   │   │   └── [page.tsx](./economics/src/app/(theory)/institutions-and-growth/page.tsx)
│   │   │   │   ├── is-lm-model/
│   │   │   │   │   └── [page.tsx](./economics/src/app/(theory)/is-lm-model/page.tsx)
│   │   │   │   ├── keynesian-economics/
│   │   │   │   │   └── [page.tsx](./economics/src/app/(theory)/keynesian-economics/page.tsx)
│   │   │   │   ├── labor-markets/
│   │   │   │   │   └── [page.tsx](./economics/src/app/(theory)/labor-markets/page.tsx)
│   │   │   │   ├── marginal-utility/
│   │   │   │   │   └── [page.tsx](./economics/src/app/(theory)/marginal-utility/page.tsx)
│   │   │   │   ├── market-failures/
│   │   │   │   │   └── [page.tsx](./economics/src/app/(theory)/market-failures/page.tsx)
│   │   │   │   ├── market-microstructure/
│   │   │   │   │   └── [page.tsx](./economics/src/app/(theory)/market-microstructure/page.tsx)
│   │   │   │   ├── mechanism-design/
│   │   │   │   │   └── [page.tsx](./economics/src/app/(theory)/mechanism-design/page.tsx)
│   │   │   │   ├── mental-accounting/
│   │   │   │   │   └── [page.tsx](./economics/src/app/(theory)/mental-accounting/page.tsx)
│   │   │   │   ├── migration-economics/
│   │   │   │   │   └── [page.tsx](./economics/src/app/(theory)/migration-economics/page.tsx)
│   │   │   │   ├── monetary-policy/
│   │   │   │   │   └── [page.tsx](./economics/src/app/(theory)/monetary-policy/page.tsx)
│   │   │   │   ├── monopoly-and-market-power/
│   │   │   │   │   └── [page.tsx](./economics/src/app/(theory)/monopoly-and-market-power/page.tsx)
│   │   │   │   ├── moral-hazard/
│   │   │   │   │   └── [page.tsx](./economics/src/app/(theory)/moral-hazard/page.tsx)
│   │   │   │   ├── nash-equilibrium/
│   │   │   │   │   └── [page.tsx](./economics/src/app/(theory)/nash-equilibrium/page.tsx)
│   │   │   │   ├── nudge-and-behavioral-economics/
│   │   │   │   │   └── [page.tsx](./economics/src/app/(theory)/nudge-and-behavioral-economics/page.tsx)
│   │   │   │   ├── oligopoly/
│   │   │   │   │   └── [page.tsx](./economics/src/app/(theory)/oligopoly/page.tsx)
│   │   │   │   ├── opportunity-cost/
│   │   │   │   │   └── [page.tsx](./economics/src/app/(theory)/opportunity-cost/page.tsx)
│   │   │   │   ├── overconfidence-bias/
│   │   │   │   │   └── [page.tsx](./economics/src/app/(theory)/overconfidence-bias/page.tsx)
│   │   │   │   ├── perfect-competition/
│   │   │   │   │   └── [page.tsx](./economics/src/app/(theory)/perfect-competition/page.tsx)
│   │   │   │   ├── phillips-curve/
│   │   │   │   │   └── [page.tsx](./economics/src/app/(theory)/phillips-curve/page.tsx)
│   │   │   │   ├── portfolio-theory/
│   │   │   │   │   └── [page.tsx](./economics/src/app/(theory)/portfolio-theory/page.tsx)
│   │   │   │   ├── poverty-traps/
│   │   │   │   │   └── [page.tsx](./economics/src/app/(theory)/poverty-traps/page.tsx)
│   │   │   │   ├── price-discrimination/
│   │   │   │   │   └── [page.tsx](./economics/src/app/(theory)/price-discrimination/page.tsx)
│   │   │   │   ├── prisoners-dilemma/
│   │   │   │   │   └── [page.tsx](./economics/src/app/(theory)/prisoners-dilemma/page.tsx)
│   │   │   │   ├── production-and-costs/
│   │   │   │   │   └── [page.tsx](./economics/src/app/(theory)/production-and-costs/page.tsx)
│   │   │   │   ├── prospect-theory/
│   │   │   │   │   └── [page.tsx](./economics/src/app/(theory)/prospect-theory/page.tsx)
│   │   │   │   ├── public-choice/
│   │   │   │   │   └── [page.tsx](./economics/src/app/(theory)/public-choice/page.tsx)
│   │   │   │   ├── public-goods-dilemma/
│   │   │   │   │   └── [page.tsx](./economics/src/app/(theory)/public-goods-dilemma/page.tsx)
│   │   │   │   ├── repeated-games/
│   │   │   │   │   └── [page.tsx](./economics/src/app/(theory)/repeated-games/page.tsx)
│   │   │   │   ├── signaling/
│   │   │   │   │   └── [page.tsx](./economics/src/app/(theory)/signaling/page.tsx)
│   │   │   │   ├── social-preferences/
│   │   │   │   │   └── [page.tsx](./economics/src/app/(theory)/social-preferences/page.tsx)
│   │   │   │   ├── supply-and-demand/
│   │   │   │   │   └── [page.tsx](./economics/src/app/(theory)/supply-and-demand/page.tsx)
│   │   │   │   ├── time-inconsistency/
│   │   │   │   │   └── [page.tsx](./economics/src/app/(theory)/time-inconsistency/page.tsx)
│   │   │   │   ├── time-value-of-money/
│   │   │   │   │   └── [page.tsx](./economics/src/app/(theory)/time-value-of-money/page.tsx)
│   │   │   │   ├── trade-and-tariffs/
│   │   │   │   │   └── [page.tsx](./economics/src/app/(theory)/trade-and-tariffs/page.tsx)
│   │   │   │   ├── tragedy-of-the-commons/
│   │   │   │   │   └── [page.tsx](./economics/src/app/(theory)/tragedy-of-the-commons/page.tsx)
│   │   │   │   ├── unemployment-okuns-law/
│   │   │   │   │   └── [page.tsx](./economics/src/app/(theory)/unemployment-okuns-law/page.tsx)
│   │   │   │   └── zero-sum-games/
│   │   │   │       └── [page.tsx](./economics/src/app/(theory)/zero-sum-games/page.tsx)
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
│   │   │   │   │   ├── [Button.test.tsx](./economics/src/components/atoms/__tests__/Button.test.tsx)
│   │   │   │   │   └── [ThemeToggle.test.tsx](./economics/src/components/atoms/__tests__/ThemeToggle.test.tsx)
│   │   │   │   ├── [AccentBadge.tsx](./economics/src/components/atoms/AccentBadge.tsx)
│   │   │   │   ├── [Badge.tsx](./economics/src/components/atoms/Badge.tsx)
│   │   │   │   ├── [Button.tsx](./economics/src/components/atoms/Button.tsx)
│   │   │   │   ├── [CaretButton.tsx](./economics/src/components/atoms/CaretButton.tsx)
│   │   │   │   ├── [DifficultyBadge.tsx](./economics/src/components/atoms/DifficultyBadge.tsx)
│   │   │   │   ├── [FilterChip.tsx](./economics/src/components/atoms/FilterChip.tsx)
│   │   │   │   └── [ThemeToggle.tsx](./economics/src/components/atoms/ThemeToggle.tsx)
│   │   │   ├── molecules/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [StrategyList.test.tsx](./economics/src/components/molecules/__tests__/StrategyList.test.tsx)
│   │   │   │   ├── [CardActions.tsx](./economics/src/components/molecules/CardActions.tsx)
│   │   │   │   ├── [FilterCheckbox.tsx](./economics/src/components/molecules/FilterCheckbox.tsx)
│   │   │   │   ├── [FilterRow.tsx](./economics/src/components/molecules/FilterRow.tsx)
│   │   │   │   ├── [GameResult.tsx](./economics/src/components/molecules/GameResult.tsx)
│   │   │   │   ├── [GroupHeader.tsx](./economics/src/components/molecules/GroupHeader.tsx)
│   │   │   │   ├── [MoveButtons.tsx](./economics/src/components/molecules/MoveButtons.tsx)
│   │   │   │   ├── [PayoffMatrix.tsx](./economics/src/components/molecules/PayoffMatrix.tsx)
│   │   │   │   ├── [RankingTable.tsx](./economics/src/components/molecules/RankingTable.tsx)
│   │   │   │   ├── [RoundHistory.tsx](./economics/src/components/molecules/RoundHistory.tsx)
│   │   │   │   ├── [RoundReveal.tsx](./economics/src/components/molecules/RoundReveal.tsx)
│   │   │   │   ├── [ScoreBar.tsx](./economics/src/components/molecules/ScoreBar.tsx)
│   │   │   │   ├── [SearchBar.tsx](./economics/src/components/molecules/SearchBar.tsx)
│   │   │   │   ├── [SelectField.tsx](./economics/src/components/molecules/SelectField.tsx)
│   │   │   │   └── [StrategyList.tsx](./economics/src/components/molecules/StrategyList.tsx)
│   │   │   ├── organisms/
│   │   │   │   ├── [FilterPanel.tsx](./economics/src/components/organisms/FilterPanel.tsx)
│   │   │   │   ├── [GroupSection.tsx](./economics/src/components/organisms/GroupSection.tsx)
│   │   │   │   ├── [Header.tsx](./economics/src/components/organisms/Header.tsx)
│   │   │   │   └── [ToolCard.tsx](./economics/src/components/organisms/ToolCard.tsx)
│   │   │   └── templates/
│   │   │       ├── __tests__/
│   │   │       │   ├── [AboutTemplate.test.tsx](./economics/src/components/templates/__tests__/AboutTemplate.test.tsx)
│   │   │       │   ├── [DownloadsTemplate.test.tsx](./economics/src/components/templates/__tests__/DownloadsTemplate.test.tsx)
│   │   │       │   ├── [ErrorTemplate.test.tsx](./economics/src/components/templates/__tests__/ErrorTemplate.test.tsx)
│   │   │       │   ├── [HomeTemplate.test.tsx](./economics/src/components/templates/__tests__/HomeTemplate.test.tsx)
│   │   │       │   ├── [TheoryTemplate.test.tsx](./economics/src/components/templates/__tests__/TheoryTemplate.test.tsx)
│   │   │       │   └── [VersionTemplate.test.tsx](./economics/src/components/templates/__tests__/VersionTemplate.test.tsx)
│   │   │       ├── [AboutTemplate.tsx](./economics/src/components/templates/AboutTemplate.tsx)
│   │   │       ├── [DownloadsTemplate.tsx](./economics/src/components/templates/DownloadsTemplate.tsx)
│   │   │       ├── [ErrorTemplate.tsx](./economics/src/components/templates/ErrorTemplate.tsx)
│   │   │       ├── [HomeTemplate.tsx](./economics/src/components/templates/HomeTemplate.tsx)
│   │   │       ├── [TheoryTemplate.tsx](./economics/src/components/templates/TheoryTemplate.tsx)
│   │   │       └── [VersionTemplate.tsx](./economics/src/components/templates/VersionTemplate.tsx)
│   │   ├── content/
│   │   │   ├── [about.ts](./economics/src/content/about.ts)
│   │   │   ├── [download.ts](./economics/src/content/download.ts)
│   │   │   └── [version.ts](./economics/src/content/version.ts)
│   │   ├── games/
│   │   │   ├── ad-as/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [game.test.ts](./economics/src/games/ad-as/__tests__/game.test.ts)
│   │   │   │   │   ├── [index.test.tsx](./economics/src/games/ad-as/__tests__/index.test.tsx)
│   │   │   │   │   └── [reducer.test.ts](./economics/src/games/ad-as/__tests__/reducer.test.ts)
│   │   │   │   ├── [components.tsx](./economics/src/games/ad-as/components.tsx)
│   │   │   │   ├── [constants.ts](./economics/src/games/ad-as/constants.ts)
│   │   │   │   ├── [game.ts](./economics/src/games/ad-as/game.ts)
│   │   │   │   ├── [index.tsx](./economics/src/games/ad-as/index.tsx)
│   │   │   │   ├── [reducer.ts](./economics/src/games/ad-as/reducer.ts)
│   │   │   │   └── [types.ts](./economics/src/games/ad-as/types.ts)
│   │   │   ├── arbitrage/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [game.test.ts](./economics/src/games/arbitrage/__tests__/game.test.ts)
│   │   │   │   │   ├── [index.test.tsx](./economics/src/games/arbitrage/__tests__/index.test.tsx)
│   │   │   │   │   └── [reducer.test.ts](./economics/src/games/arbitrage/__tests__/reducer.test.ts)
│   │   │   │   ├── [components.tsx](./economics/src/games/arbitrage/components.tsx)
│   │   │   │   ├── [constants.ts](./economics/src/games/arbitrage/constants.ts)
│   │   │   │   ├── [game.ts](./economics/src/games/arbitrage/game.ts)
│   │   │   │   ├── [index.tsx](./economics/src/games/arbitrage/index.tsx)
│   │   │   │   ├── [reducer.ts](./economics/src/games/arbitrage/reducer.ts)
│   │   │   │   └── [types.ts](./economics/src/games/arbitrage/types.ts)
│   │   │   ├── auction/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [game.test.ts](./economics/src/games/auction/__tests__/game.test.ts)
│   │   │   │   │   ├── [index.test.tsx](./economics/src/games/auction/__tests__/index.test.tsx)
│   │   │   │   │   └── [reducer.test.ts](./economics/src/games/auction/__tests__/reducer.test.ts)
│   │   │   │   ├── [constants.ts](./economics/src/games/auction/constants.ts)
│   │   │   │   ├── [game.ts](./economics/src/games/auction/game.ts)
│   │   │   │   ├── [index.tsx](./economics/src/games/auction/index.tsx)
│   │   │   │   ├── [reducer.ts](./economics/src/games/auction/reducer.ts)
│   │   │   │   └── [types.ts](./economics/src/games/auction/types.ts)
│   │   │   ├── bargaining/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [game.test.ts](./economics/src/games/bargaining/__tests__/game.test.ts)
│   │   │   │   │   ├── [index.test.tsx](./economics/src/games/bargaining/__tests__/index.test.tsx)
│   │   │   │   │   └── [reducer.test.ts](./economics/src/games/bargaining/__tests__/reducer.test.ts)
│   │   │   │   ├── [constants.ts](./economics/src/games/bargaining/constants.ts)
│   │   │   │   ├── [game.ts](./economics/src/games/bargaining/game.ts)
│   │   │   │   ├── [index.tsx](./economics/src/games/bargaining/index.tsx)
│   │   │   │   ├── [reducer.ts](./economics/src/games/bargaining/reducer.ts)
│   │   │   │   └── [types.ts](./economics/src/games/bargaining/types.ts)
│   │   │   ├── basics/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [game.test.ts](./economics/src/games/basics/__tests__/game.test.ts)
│   │   │   │   │   ├── [index.test.tsx](./economics/src/games/basics/__tests__/index.test.tsx)
│   │   │   │   │   └── [reducer.test.ts](./economics/src/games/basics/__tests__/reducer.test.ts)
│   │   │   │   ├── [components.tsx](./economics/src/games/basics/components.tsx)
│   │   │   │   ├── [constants.ts](./economics/src/games/basics/constants.ts)
│   │   │   │   ├── [game.ts](./economics/src/games/basics/game.ts)
│   │   │   │   ├── [index.tsx](./economics/src/games/basics/index.tsx)
│   │   │   │   ├── [panels.tsx](./economics/src/games/basics/panels.tsx)
│   │   │   │   ├── [reducer.ts](./economics/src/games/basics/reducer.ts)
│   │   │   │   └── [types.ts](./economics/src/games/basics/types.ts)
│   │   │   ├── bayesian/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [game.test.ts](./economics/src/games/bayesian/__tests__/game.test.ts)
│   │   │   │   │   ├── [index.test.tsx](./economics/src/games/bayesian/__tests__/index.test.tsx)
│   │   │   │   │   └── [reducer.test.ts](./economics/src/games/bayesian/__tests__/reducer.test.ts)
│   │   │   │   ├── [components.tsx](./economics/src/games/bayesian/components.tsx)
│   │   │   │   ├── [constants.ts](./economics/src/games/bayesian/constants.ts)
│   │   │   │   ├── [game.ts](./economics/src/games/bayesian/game.ts)
│   │   │   │   ├── [index.tsx](./economics/src/games/bayesian/index.tsx)
│   │   │   │   ├── [reducer.ts](./economics/src/games/bayesian/reducer.ts)
│   │   │   │   └── [types.ts](./economics/src/games/bayesian/types.ts)
│   │   │   ├── bubbles/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [game.test.ts](./economics/src/games/bubbles/__tests__/game.test.ts)
│   │   │   │   │   ├── [index.test.tsx](./economics/src/games/bubbles/__tests__/index.test.tsx)
│   │   │   │   │   └── [reducer.test.ts](./economics/src/games/bubbles/__tests__/reducer.test.ts)
│   │   │   │   ├── [components.tsx](./economics/src/games/bubbles/components.tsx)
│   │   │   │   ├── [constants.ts](./economics/src/games/bubbles/constants.ts)
│   │   │   │   ├── [game.ts](./economics/src/games/bubbles/game.ts)
│   │   │   │   ├── [index.tsx](./economics/src/games/bubbles/index.tsx)
│   │   │   │   ├── [reducer.ts](./economics/src/games/bubbles/reducer.ts)
│   │   │   │   └── [types.ts](./economics/src/games/bubbles/types.ts)
│   │   │   ├── business-cycles/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [game.test.ts](./economics/src/games/business-cycles/__tests__/game.test.ts)
│   │   │   │   │   ├── [index.test.tsx](./economics/src/games/business-cycles/__tests__/index.test.tsx)
│   │   │   │   │   └── [reducer.test.ts](./economics/src/games/business-cycles/__tests__/reducer.test.ts)
│   │   │   │   ├── [components.tsx](./economics/src/games/business-cycles/components.tsx)
│   │   │   │   ├── [constants.ts](./economics/src/games/business-cycles/constants.ts)
│   │   │   │   ├── [game.ts](./economics/src/games/business-cycles/game.ts)
│   │   │   │   ├── [index.tsx](./economics/src/games/business-cycles/index.tsx)
│   │   │   │   ├── [reducer.ts](./economics/src/games/business-cycles/reducer.ts)
│   │   │   │   └── [types.ts](./economics/src/games/business-cycles/types.ts)
│   │   │   ├── capm/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [game.test.ts](./economics/src/games/capm/__tests__/game.test.ts)
│   │   │   │   │   ├── [index.test.tsx](./economics/src/games/capm/__tests__/index.test.tsx)
│   │   │   │   │   └── [reducer.test.ts](./economics/src/games/capm/__tests__/reducer.test.ts)
│   │   │   │   ├── [components.tsx](./economics/src/games/capm/components.tsx)
│   │   │   │   ├── [constants.ts](./economics/src/games/capm/constants.ts)
│   │   │   │   ├── [game.ts](./economics/src/games/capm/game.ts)
│   │   │   │   ├── [index.tsx](./economics/src/games/capm/index.tsx)
│   │   │   │   ├── [reducer.ts](./economics/src/games/capm/reducer.ts)
│   │   │   │   └── [types.ts](./economics/src/games/capm/types.ts)
│   │   │   ├── causal/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [game.test.ts](./economics/src/games/causal/__tests__/game.test.ts)
│   │   │   │   │   ├── [index.test.tsx](./economics/src/games/causal/__tests__/index.test.tsx)
│   │   │   │   │   └── [reducer.test.ts](./economics/src/games/causal/__tests__/reducer.test.ts)
│   │   │   │   ├── [components.tsx](./economics/src/games/causal/components.tsx)
│   │   │   │   ├── [constants.ts](./economics/src/games/causal/constants.ts)
│   │   │   │   ├── [game.ts](./economics/src/games/causal/game.ts)
│   │   │   │   ├── [index.tsx](./economics/src/games/causal/index.tsx)
│   │   │   │   ├── [reducer.ts](./economics/src/games/causal/reducer.ts)
│   │   │   │   └── [types.ts](./economics/src/games/causal/types.ts)
│   │   │   ├── commitment/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [game.test.ts](./economics/src/games/commitment/__tests__/game.test.ts)
│   │   │   │   │   ├── [index.test.tsx](./economics/src/games/commitment/__tests__/index.test.tsx)
│   │   │   │   │   └── [reducer.test.ts](./economics/src/games/commitment/__tests__/reducer.test.ts)
│   │   │   │   ├── [constants.ts](./economics/src/games/commitment/constants.ts)
│   │   │   │   ├── [game.ts](./economics/src/games/commitment/game.ts)
│   │   │   │   ├── [index.tsx](./economics/src/games/commitment/index.tsx)
│   │   │   │   ├── [reducer.ts](./economics/src/games/commitment/reducer.ts)
│   │   │   │   └── [types.ts](./economics/src/games/commitment/types.ts)
│   │   │   ├── commons/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [game.test.ts](./economics/src/games/commons/__tests__/game.test.ts)
│   │   │   │   │   ├── [index.test.tsx](./economics/src/games/commons/__tests__/index.test.tsx)
│   │   │   │   │   └── [reducer.test.ts](./economics/src/games/commons/__tests__/reducer.test.ts)
│   │   │   │   ├── [constants.ts](./economics/src/games/commons/constants.ts)
│   │   │   │   ├── [game.ts](./economics/src/games/commons/game.ts)
│   │   │   │   ├── [index.tsx](./economics/src/games/commons/index.tsx)
│   │   │   │   ├── [reducer.ts](./economics/src/games/commons/reducer.ts)
│   │   │   │   └── [types.ts](./economics/src/games/commons/types.ts)
│   │   │   ├── consumer/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [game.test.ts](./economics/src/games/consumer/__tests__/game.test.ts)
│   │   │   │   │   ├── [index.test.tsx](./economics/src/games/consumer/__tests__/index.test.tsx)
│   │   │   │   │   └── [reducer.test.ts](./economics/src/games/consumer/__tests__/reducer.test.ts)
│   │   │   │   ├── [components.tsx](./economics/src/games/consumer/components.tsx)
│   │   │   │   ├── [constants.ts](./economics/src/games/consumer/constants.ts)
│   │   │   │   ├── [game.ts](./economics/src/games/consumer/game.ts)
│   │   │   │   ├── [index.tsx](./economics/src/games/consumer/index.tsx)
│   │   │   │   ├── [reducer.ts](./economics/src/games/consumer/reducer.ts)
│   │   │   │   └── [types.ts](./economics/src/games/consumer/types.ts)
│   │   │   ├── dictator/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [game.test.ts](./economics/src/games/dictator/__tests__/game.test.ts)
│   │   │   │   │   ├── [index.test.tsx](./economics/src/games/dictator/__tests__/index.test.tsx)
│   │   │   │   │   └── [reducer.test.ts](./economics/src/games/dictator/__tests__/reducer.test.ts)
│   │   │   │   ├── [constants.ts](./economics/src/games/dictator/constants.ts)
│   │   │   │   ├── [game.ts](./economics/src/games/dictator/game.ts)
│   │   │   │   ├── [index.tsx](./economics/src/games/dictator/index.tsx)
│   │   │   │   ├── [reducer.ts](./economics/src/games/dictator/reducer.ts)
│   │   │   │   └── [types.ts](./economics/src/games/dictator/types.ts)
│   │   │   ├── elasticity/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [game.test.ts](./economics/src/games/elasticity/__tests__/game.test.ts)
│   │   │   │   │   ├── [index.test.tsx](./economics/src/games/elasticity/__tests__/index.test.tsx)
│   │   │   │   │   └── [reducer.test.ts](./economics/src/games/elasticity/__tests__/reducer.test.ts)
│   │   │   │   ├── [components.tsx](./economics/src/games/elasticity/components.tsx)
│   │   │   │   ├── [constants.ts](./economics/src/games/elasticity/constants.ts)
│   │   │   │   ├── [game.ts](./economics/src/games/elasticity/game.ts)
│   │   │   │   ├── [index.tsx](./economics/src/games/elasticity/index.tsx)
│   │   │   │   ├── [reducer.ts](./economics/src/games/elasticity/reducer.ts)
│   │   │   │   └── [types.ts](./economics/src/games/elasticity/types.ts)
│   │   │   ├── emh/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [game.test.ts](./economics/src/games/emh/__tests__/game.test.ts)
│   │   │   │   │   ├── [index.test.tsx](./economics/src/games/emh/__tests__/index.test.tsx)
│   │   │   │   │   └── [reducer.test.ts](./economics/src/games/emh/__tests__/reducer.test.ts)
│   │   │   │   ├── [components.tsx](./economics/src/games/emh/components.tsx)
│   │   │   │   ├── [constants.ts](./economics/src/games/emh/constants.ts)
│   │   │   │   ├── [game.ts](./economics/src/games/emh/game.ts)
│   │   │   │   ├── [index.tsx](./economics/src/games/emh/index.tsx)
│   │   │   │   ├── [reducer.ts](./economics/src/games/emh/reducer.ts)
│   │   │   │   └── [types.ts](./economics/src/games/emh/types.ts)
│   │   │   ├── endowment/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [game.test.ts](./economics/src/games/endowment/__tests__/game.test.ts)
│   │   │   │   │   ├── [index.test.tsx](./economics/src/games/endowment/__tests__/index.test.tsx)
│   │   │   │   │   └── [reducer.test.ts](./economics/src/games/endowment/__tests__/reducer.test.ts)
│   │   │   │   ├── [constants.ts](./economics/src/games/endowment/constants.ts)
│   │   │   │   ├── [game.ts](./economics/src/games/endowment/game.ts)
│   │   │   │   ├── [index.tsx](./economics/src/games/endowment/index.tsx)
│   │   │   │   ├── [reducer.ts](./economics/src/games/endowment/reducer.ts)
│   │   │   │   └── [types.ts](./economics/src/games/endowment/types.ts)
│   │   │   ├── evolution/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [game.test.ts](./economics/src/games/evolution/__tests__/game.test.ts)
│   │   │   │   │   ├── [index.test.tsx](./economics/src/games/evolution/__tests__/index.test.tsx)
│   │   │   │   │   └── [reducer.test.ts](./economics/src/games/evolution/__tests__/reducer.test.ts)
│   │   │   │   ├── [components.tsx](./economics/src/games/evolution/components.tsx)
│   │   │   │   ├── [constants.ts](./economics/src/games/evolution/constants.ts)
│   │   │   │   ├── [game.ts](./economics/src/games/evolution/game.ts)
│   │   │   │   ├── [index.tsx](./economics/src/games/evolution/index.tsx)
│   │   │   │   ├── [reducer.ts](./economics/src/games/evolution/reducer.ts)
│   │   │   │   └── [types.ts](./economics/src/games/evolution/types.ts)
│   │   │   ├── externalities/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [game.test.ts](./economics/src/games/externalities/__tests__/game.test.ts)
│   │   │   │   │   ├── [index.test.tsx](./economics/src/games/externalities/__tests__/index.test.tsx)
│   │   │   │   │   └── [reducer.test.ts](./economics/src/games/externalities/__tests__/reducer.test.ts)
│   │   │   │   ├── [components.tsx](./economics/src/games/externalities/components.tsx)
│   │   │   │   ├── [constants.ts](./economics/src/games/externalities/constants.ts)
│   │   │   │   ├── [game.ts](./economics/src/games/externalities/game.ts)
│   │   │   │   ├── [index.tsx](./economics/src/games/externalities/index.tsx)
│   │   │   │   ├── [reducer.ts](./economics/src/games/externalities/reducer.ts)
│   │   │   │   └── [types.ts](./economics/src/games/externalities/types.ts)
│   │   │   ├── fiscal/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [game.test.ts](./economics/src/games/fiscal/__tests__/game.test.ts)
│   │   │   │   │   ├── [index.test.tsx](./economics/src/games/fiscal/__tests__/index.test.tsx)
│   │   │   │   │   └── [reducer.test.ts](./economics/src/games/fiscal/__tests__/reducer.test.ts)
│   │   │   │   ├── [components.tsx](./economics/src/games/fiscal/components.tsx)
│   │   │   │   ├── [constants.ts](./economics/src/games/fiscal/constants.ts)
│   │   │   │   ├── [game.ts](./economics/src/games/fiscal/game.ts)
│   │   │   │   ├── [index.tsx](./economics/src/games/fiscal/index.tsx)
│   │   │   │   ├── [reducer.ts](./economics/src/games/fiscal/reducer.ts)
│   │   │   │   └── [types.ts](./economics/src/games/fiscal/types.ts)
│   │   │   ├── framing/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [game.test.ts](./economics/src/games/framing/__tests__/game.test.ts)
│   │   │   │   │   ├── [index.test.tsx](./economics/src/games/framing/__tests__/index.test.tsx)
│   │   │   │   │   └── [reducer.test.ts](./economics/src/games/framing/__tests__/reducer.test.ts)
│   │   │   │   ├── [constants.ts](./economics/src/games/framing/constants.ts)
│   │   │   │   ├── [game.ts](./economics/src/games/framing/game.ts)
│   │   │   │   ├── [index.tsx](./economics/src/games/framing/index.tsx)
│   │   │   │   ├── [reducer.ts](./economics/src/games/framing/reducer.ts)
│   │   │   │   └── [types.ts](./economics/src/games/framing/types.ts)
│   │   │   ├── gdp/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [game.test.ts](./economics/src/games/gdp/__tests__/game.test.ts)
│   │   │   │   │   ├── [index.test.tsx](./economics/src/games/gdp/__tests__/index.test.tsx)
│   │   │   │   │   └── [reducer.test.ts](./economics/src/games/gdp/__tests__/reducer.test.ts)
│   │   │   │   ├── [components.tsx](./economics/src/games/gdp/components.tsx)
│   │   │   │   ├── [constants.ts](./economics/src/games/gdp/constants.ts)
│   │   │   │   ├── [game.ts](./economics/src/games/gdp/game.ts)
│   │   │   │   ├── [index.tsx](./economics/src/games/gdp/index.tsx)
│   │   │   │   ├── [reducer.ts](./economics/src/games/gdp/reducer.ts)
│   │   │   │   └── [types.ts](./economics/src/games/gdp/types.ts)
│   │   │   ├── heuristics/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [game.test.ts](./economics/src/games/heuristics/__tests__/game.test.ts)
│   │   │   │   │   ├── [index.test.tsx](./economics/src/games/heuristics/__tests__/index.test.tsx)
│   │   │   │   │   └── [reducer.test.ts](./economics/src/games/heuristics/__tests__/reducer.test.ts)
│   │   │   │   ├── [components.tsx](./economics/src/games/heuristics/components.tsx)
│   │   │   │   ├── [constants.ts](./economics/src/games/heuristics/constants.ts)
│   │   │   │   ├── [game.ts](./economics/src/games/heuristics/game.ts)
│   │   │   │   ├── [index.tsx](./economics/src/games/heuristics/index.tsx)
│   │   │   │   ├── [reducer.ts](./economics/src/games/heuristics/reducer.ts)
│   │   │   │   └── [types.ts](./economics/src/games/heuristics/types.ts)
│   │   │   ├── human-capital/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [game.test.ts](./economics/src/games/human-capital/__tests__/game.test.ts)
│   │   │   │   │   ├── [index.test.tsx](./economics/src/games/human-capital/__tests__/index.test.tsx)
│   │   │   │   │   └── [reducer.test.ts](./economics/src/games/human-capital/__tests__/reducer.test.ts)
│   │   │   │   ├── [components.tsx](./economics/src/games/human-capital/components.tsx)
│   │   │   │   ├── [constants.ts](./economics/src/games/human-capital/constants.ts)
│   │   │   │   ├── [game.ts](./economics/src/games/human-capital/game.ts)
│   │   │   │   ├── [index.tsx](./economics/src/games/human-capital/index.tsx)
│   │   │   │   ├── [panels.tsx](./economics/src/games/human-capital/panels.tsx)
│   │   │   │   ├── [reducer.ts](./economics/src/games/human-capital/reducer.ts)
│   │   │   │   └── [types.ts](./economics/src/games/human-capital/types.ts)
│   │   │   ├── inequality/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [game.test.ts](./economics/src/games/inequality/__tests__/game.test.ts)
│   │   │   │   │   ├── [index.test.tsx](./economics/src/games/inequality/__tests__/index.test.tsx)
│   │   │   │   │   └── [reducer.test.ts](./economics/src/games/inequality/__tests__/reducer.test.ts)
│   │   │   │   ├── [components.tsx](./economics/src/games/inequality/components.tsx)
│   │   │   │   ├── [constants.ts](./economics/src/games/inequality/constants.ts)
│   │   │   │   ├── [game.ts](./economics/src/games/inequality/game.ts)
│   │   │   │   ├── [index.tsx](./economics/src/games/inequality/index.tsx)
│   │   │   │   ├── [reducer.ts](./economics/src/games/inequality/reducer.ts)
│   │   │   │   └── [types.ts](./economics/src/games/inequality/types.ts)
│   │   │   ├── institutions/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [game.test.ts](./economics/src/games/institutions/__tests__/game.test.ts)
│   │   │   │   │   ├── [index.test.tsx](./economics/src/games/institutions/__tests__/index.test.tsx)
│   │   │   │   │   └── [reducer.test.ts](./economics/src/games/institutions/__tests__/reducer.test.ts)
│   │   │   │   ├── [components.tsx](./economics/src/games/institutions/components.tsx)
│   │   │   │   ├── [constants.ts](./economics/src/games/institutions/constants.ts)
│   │   │   │   ├── [game.ts](./economics/src/games/institutions/game.ts)
│   │   │   │   ├── [index.tsx](./economics/src/games/institutions/index.tsx)
│   │   │   │   ├── [reducer.ts](./economics/src/games/institutions/reducer.ts)
│   │   │   │   └── [types.ts](./economics/src/games/institutions/types.ts)
│   │   │   ├── is-lm/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [game.test.ts](./economics/src/games/is-lm/__tests__/game.test.ts)
│   │   │   │   │   ├── [index.test.tsx](./economics/src/games/is-lm/__tests__/index.test.tsx)
│   │   │   │   │   └── [reducer.test.ts](./economics/src/games/is-lm/__tests__/reducer.test.ts)
│   │   │   │   ├── [components.tsx](./economics/src/games/is-lm/components.tsx)
│   │   │   │   ├── [constants.ts](./economics/src/games/is-lm/constants.ts)
│   │   │   │   ├── [game.ts](./economics/src/games/is-lm/game.ts)
│   │   │   │   ├── [index.tsx](./economics/src/games/is-lm/index.tsx)
│   │   │   │   ├── [plot.tsx](./economics/src/games/is-lm/plot.tsx)
│   │   │   │   ├── [reducer.ts](./economics/src/games/is-lm/reducer.ts)
│   │   │   │   └── [types.ts](./economics/src/games/is-lm/types.ts)
│   │   │   ├── keynesian/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [game.test.ts](./economics/src/games/keynesian/__tests__/game.test.ts)
│   │   │   │   │   ├── [index.test.tsx](./economics/src/games/keynesian/__tests__/index.test.tsx)
│   │   │   │   │   └── [reducer.test.ts](./economics/src/games/keynesian/__tests__/reducer.test.ts)
│   │   │   │   ├── [components.tsx](./economics/src/games/keynesian/components.tsx)
│   │   │   │   ├── [constants.ts](./economics/src/games/keynesian/constants.ts)
│   │   │   │   ├── [game.ts](./economics/src/games/keynesian/game.ts)
│   │   │   │   ├── [index.tsx](./economics/src/games/keynesian/index.tsx)
│   │   │   │   ├── [panels.tsx](./economics/src/games/keynesian/panels.tsx)
│   │   │   │   ├── [primitives.tsx](./economics/src/games/keynesian/primitives.tsx)
│   │   │   │   ├── [reducer.ts](./economics/src/games/keynesian/reducer.ts)
│   │   │   │   ├── [results.tsx](./economics/src/games/keynesian/results.tsx)
│   │   │   │   ├── [screens.tsx](./economics/src/games/keynesian/screens.tsx)
│   │   │   │   └── [types.ts](./economics/src/games/keynesian/types.ts)
│   │   │   ├── labor/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [game.test.ts](./economics/src/games/labor/__tests__/game.test.ts)
│   │   │   │   │   ├── [index.test.tsx](./economics/src/games/labor/__tests__/index.test.tsx)
│   │   │   │   │   └── [reducer.test.ts](./economics/src/games/labor/__tests__/reducer.test.ts)
│   │   │   │   ├── [components.tsx](./economics/src/games/labor/components.tsx)
│   │   │   │   ├── [constants.ts](./economics/src/games/labor/constants.ts)
│   │   │   │   ├── [game.ts](./economics/src/games/labor/game.ts)
│   │   │   │   ├── [index.tsx](./economics/src/games/labor/index.tsx)
│   │   │   │   ├── [panels.tsx](./economics/src/games/labor/panels.tsx)
│   │   │   │   ├── [reducer.ts](./economics/src/games/labor/reducer.ts)
│   │   │   │   └── [types.ts](./economics/src/games/labor/types.ts)
│   │   │   ├── lemons/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [game.test.ts](./economics/src/games/lemons/__tests__/game.test.ts)
│   │   │   │   │   ├── [index.test.tsx](./economics/src/games/lemons/__tests__/index.test.tsx)
│   │   │   │   │   └── [reducer.test.ts](./economics/src/games/lemons/__tests__/reducer.test.ts)
│   │   │   │   ├── [components.tsx](./economics/src/games/lemons/components.tsx)
│   │   │   │   ├── [constants.ts](./economics/src/games/lemons/constants.ts)
│   │   │   │   ├── [game.ts](./economics/src/games/lemons/game.ts)
│   │   │   │   ├── [index.tsx](./economics/src/games/lemons/index.tsx)
│   │   │   │   ├── [reducer.ts](./economics/src/games/lemons/reducer.ts)
│   │   │   │   └── [types.ts](./economics/src/games/lemons/types.ts)
│   │   │   ├── marginal-utility/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [game.test.ts](./economics/src/games/marginal-utility/__tests__/game.test.ts)
│   │   │   │   │   ├── [index.test.tsx](./economics/src/games/marginal-utility/__tests__/index.test.tsx)
│   │   │   │   │   └── [reducer.test.ts](./economics/src/games/marginal-utility/__tests__/reducer.test.ts)
│   │   │   │   ├── [challenge.tsx](./economics/src/games/marginal-utility/challenge.tsx)
│   │   │   │   ├── [components.tsx](./economics/src/games/marginal-utility/components.tsx)
│   │   │   │   ├── [constants.ts](./economics/src/games/marginal-utility/constants.ts)
│   │   │   │   ├── [game.ts](./economics/src/games/marginal-utility/game.ts)
│   │   │   │   ├── [index.tsx](./economics/src/games/marginal-utility/index.tsx)
│   │   │   │   ├── [lab.tsx](./economics/src/games/marginal-utility/lab.tsx)
│   │   │   │   ├── [reducer.ts](./economics/src/games/marginal-utility/reducer.ts)
│   │   │   │   └── [types.ts](./economics/src/games/marginal-utility/types.ts)
│   │   │   ├── market-failures/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [game.test.ts](./economics/src/games/market-failures/__tests__/game.test.ts)
│   │   │   │   │   ├── [index.test.tsx](./economics/src/games/market-failures/__tests__/index.test.tsx)
│   │   │   │   │   └── [reducer.test.ts](./economics/src/games/market-failures/__tests__/reducer.test.ts)
│   │   │   │   ├── [components.tsx](./economics/src/games/market-failures/components.tsx)
│   │   │   │   ├── [constants.ts](./economics/src/games/market-failures/constants.ts)
│   │   │   │   ├── [game.ts](./economics/src/games/market-failures/game.ts)
│   │   │   │   ├── [index.tsx](./economics/src/games/market-failures/index.tsx)
│   │   │   │   ├── [reducer.ts](./economics/src/games/market-failures/reducer.ts)
│   │   │   │   └── [types.ts](./economics/src/games/market-failures/types.ts)
│   │   │   ├── mechanism/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [game.test.ts](./economics/src/games/mechanism/__tests__/game.test.ts)
│   │   │   │   │   ├── [index.test.tsx](./economics/src/games/mechanism/__tests__/index.test.tsx)
│   │   │   │   │   └── [reducer.test.ts](./economics/src/games/mechanism/__tests__/reducer.test.ts)
│   │   │   │   ├── [components.tsx](./economics/src/games/mechanism/components.tsx)
│   │   │   │   ├── [constants.ts](./economics/src/games/mechanism/constants.ts)
│   │   │   │   ├── [game.ts](./economics/src/games/mechanism/game.ts)
│   │   │   │   ├── [index.tsx](./economics/src/games/mechanism/index.tsx)
│   │   │   │   ├── [reducer.ts](./economics/src/games/mechanism/reducer.ts)
│   │   │   │   └── [types.ts](./economics/src/games/mechanism/types.ts)
│   │   │   ├── mental-accounting/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [game.test.ts](./economics/src/games/mental-accounting/__tests__/game.test.ts)
│   │   │   │   │   ├── [index.test.tsx](./economics/src/games/mental-accounting/__tests__/index.test.tsx)
│   │   │   │   │   └── [reducer.test.ts](./economics/src/games/mental-accounting/__tests__/reducer.test.ts)
│   │   │   │   ├── [components.tsx](./economics/src/games/mental-accounting/components.tsx)
│   │   │   │   ├── [constants.ts](./economics/src/games/mental-accounting/constants.ts)
│   │   │   │   ├── [framer.tsx](./economics/src/games/mental-accounting/framer.tsx)
│   │   │   │   ├── [game.ts](./economics/src/games/mental-accounting/game.ts)
│   │   │   │   ├── [index.tsx](./economics/src/games/mental-accounting/index.tsx)
│   │   │   │   ├── [reducer.ts](./economics/src/games/mental-accounting/reducer.ts)
│   │   │   │   └── [types.ts](./economics/src/games/mental-accounting/types.ts)
│   │   │   ├── migration/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [game.test.ts](./economics/src/games/migration/__tests__/game.test.ts)
│   │   │   │   │   ├── [index.test.tsx](./economics/src/games/migration/__tests__/index.test.tsx)
│   │   │   │   │   └── [reducer.test.ts](./economics/src/games/migration/__tests__/reducer.test.ts)
│   │   │   │   ├── [components.tsx](./economics/src/games/migration/components.tsx)
│   │   │   │   ├── [constants.ts](./economics/src/games/migration/constants.ts)
│   │   │   │   ├── [game.ts](./economics/src/games/migration/game.ts)
│   │   │   │   ├── [index.tsx](./economics/src/games/migration/index.tsx)
│   │   │   │   ├── [panels.tsx](./economics/src/games/migration/panels.tsx)
│   │   │   │   ├── [reducer.ts](./economics/src/games/migration/reducer.ts)
│   │   │   │   └── [types.ts](./economics/src/games/migration/types.ts)
│   │   │   ├── monetary-policy/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [game.test.ts](./economics/src/games/monetary-policy/__tests__/game.test.ts)
│   │   │   │   │   ├── [index.test.tsx](./economics/src/games/monetary-policy/__tests__/index.test.tsx)
│   │   │   │   │   └── [reducer.test.ts](./economics/src/games/monetary-policy/__tests__/reducer.test.ts)
│   │   │   │   ├── [components.tsx](./economics/src/games/monetary-policy/components.tsx)
│   │   │   │   ├── [constants.ts](./economics/src/games/monetary-policy/constants.ts)
│   │   │   │   ├── [game.ts](./economics/src/games/monetary-policy/game.ts)
│   │   │   │   ├── [index.tsx](./economics/src/games/monetary-policy/index.tsx)
│   │   │   │   ├── [reducer.ts](./economics/src/games/monetary-policy/reducer.ts)
│   │   │   │   └── [types.ts](./economics/src/games/monetary-policy/types.ts)
│   │   │   ├── monopolistic/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [game.test.ts](./economics/src/games/monopolistic/__tests__/game.test.ts)
│   │   │   │   │   ├── [index.test.tsx](./economics/src/games/monopolistic/__tests__/index.test.tsx)
│   │   │   │   │   └── [reducer.test.ts](./economics/src/games/monopolistic/__tests__/reducer.test.ts)
│   │   │   │   ├── [chart.tsx](./economics/src/games/monopolistic/chart.tsx)
│   │   │   │   ├── [components.tsx](./economics/src/games/monopolistic/components.tsx)
│   │   │   │   ├── [constants.ts](./economics/src/games/monopolistic/constants.ts)
│   │   │   │   ├── [game.ts](./economics/src/games/monopolistic/game.ts)
│   │   │   │   ├── [index.tsx](./economics/src/games/monopolistic/index.tsx)
│   │   │   │   ├── [lab.tsx](./economics/src/games/monopolistic/lab.tsx)
│   │   │   │   ├── [panels.tsx](./economics/src/games/monopolistic/panels.tsx)
│   │   │   │   ├── [reducer.ts](./economics/src/games/monopolistic/reducer.ts)
│   │   │   │   └── [types.ts](./economics/src/games/monopolistic/types.ts)
│   │   │   ├── monopoly/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [game.test.ts](./economics/src/games/monopoly/__tests__/game.test.ts)
│   │   │   │   │   ├── [index.test.tsx](./economics/src/games/monopoly/__tests__/index.test.tsx)
│   │   │   │   │   └── [reducer.test.ts](./economics/src/games/monopoly/__tests__/reducer.test.ts)
│   │   │   │   ├── [components.tsx](./economics/src/games/monopoly/components.tsx)
│   │   │   │   ├── [constants.ts](./economics/src/games/monopoly/constants.ts)
│   │   │   │   ├── [game.ts](./economics/src/games/monopoly/game.ts)
│   │   │   │   ├── [index.tsx](./economics/src/games/monopoly/index.tsx)
│   │   │   │   ├── [reducer.ts](./economics/src/games/monopoly/reducer.ts)
│   │   │   │   └── [types.ts](./economics/src/games/monopoly/types.ts)
│   │   │   ├── moral-hazard/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [game.test.ts](./economics/src/games/moral-hazard/__tests__/game.test.ts)
│   │   │   │   │   ├── [index.test.tsx](./economics/src/games/moral-hazard/__tests__/index.test.tsx)
│   │   │   │   │   └── [reducer.test.ts](./economics/src/games/moral-hazard/__tests__/reducer.test.ts)
│   │   │   │   ├── [components.tsx](./economics/src/games/moral-hazard/components.tsx)
│   │   │   │   ├── [constants.ts](./economics/src/games/moral-hazard/constants.ts)
│   │   │   │   ├── [game.ts](./economics/src/games/moral-hazard/game.ts)
│   │   │   │   ├── [index.tsx](./economics/src/games/moral-hazard/index.tsx)
│   │   │   │   ├── [reducer.ts](./economics/src/games/moral-hazard/reducer.ts)
│   │   │   │   └── [types.ts](./economics/src/games/moral-hazard/types.ts)
│   │   │   ├── nash/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [game.test.ts](./economics/src/games/nash/__tests__/game.test.ts)
│   │   │   │   │   ├── [index.test.tsx](./economics/src/games/nash/__tests__/index.test.tsx)
│   │   │   │   │   └── [reducer.test.ts](./economics/src/games/nash/__tests__/reducer.test.ts)
│   │   │   │   ├── [components.tsx](./economics/src/games/nash/components.tsx)
│   │   │   │   ├── [constants.ts](./economics/src/games/nash/constants.ts)
│   │   │   │   ├── [game.ts](./economics/src/games/nash/game.ts)
│   │   │   │   ├── [index.tsx](./economics/src/games/nash/index.tsx)
│   │   │   │   ├── [reducer.ts](./economics/src/games/nash/reducer.ts)
│   │   │   │   └── [types.ts](./economics/src/games/nash/types.ts)
│   │   │   ├── nudge/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [game.test.ts](./economics/src/games/nudge/__tests__/game.test.ts)
│   │   │   │   │   ├── [index.test.tsx](./economics/src/games/nudge/__tests__/index.test.tsx)
│   │   │   │   │   └── [reducer.test.ts](./economics/src/games/nudge/__tests__/reducer.test.ts)
│   │   │   │   ├── [components-report.tsx](./economics/src/games/nudge/components-report.tsx)
│   │   │   │   ├── [components-simulator.tsx](./economics/src/games/nudge/components-simulator.tsx)
│   │   │   │   ├── [components.tsx](./economics/src/games/nudge/components.tsx)
│   │   │   │   ├── [constants.ts](./economics/src/games/nudge/constants.ts)
│   │   │   │   ├── [game.ts](./economics/src/games/nudge/game.ts)
│   │   │   │   ├── [index.tsx](./economics/src/games/nudge/index.tsx)
│   │   │   │   ├── [reducer.ts](./economics/src/games/nudge/reducer.ts)
│   │   │   │   └── [types.ts](./economics/src/games/nudge/types.ts)
│   │   │   ├── okuns/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [game.test.ts](./economics/src/games/okuns/__tests__/game.test.ts)
│   │   │   │   │   ├── [index.test.tsx](./economics/src/games/okuns/__tests__/index.test.tsx)
│   │   │   │   │   └── [reducer.test.ts](./economics/src/games/okuns/__tests__/reducer.test.ts)
│   │   │   │   ├── components/
│   │   │   │   │   ├── [estimate.tsx](./economics/src/games/okuns/components/estimate.tsx)
│   │   │   │   │   ├── [intro.tsx](./economics/src/games/okuns/components/intro.tsx)
│   │   │   │   │   ├── [result.tsx](./economics/src/games/okuns/components/result.tsx)
│   │   │   │   │   └── [steer.tsx](./economics/src/games/okuns/components/steer.tsx)
│   │   │   │   ├── [components.tsx](./economics/src/games/okuns/components.tsx)
│   │   │   │   ├── [constants.ts](./economics/src/games/okuns/constants.ts)
│   │   │   │   ├── [game.ts](./economics/src/games/okuns/game.ts)
│   │   │   │   ├── [index.tsx](./economics/src/games/okuns/index.tsx)
│   │   │   │   ├── [reducer.ts](./economics/src/games/okuns/reducer.ts)
│   │   │   │   └── [types.ts](./economics/src/games/okuns/types.ts)
│   │   │   ├── oligopoly/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [game.test.ts](./economics/src/games/oligopoly/__tests__/game.test.ts)
│   │   │   │   │   ├── [index.test.tsx](./economics/src/games/oligopoly/__tests__/index.test.tsx)
│   │   │   │   │   └── [reducer.test.ts](./economics/src/games/oligopoly/__tests__/reducer.test.ts)
│   │   │   │   ├── [constants.ts](./economics/src/games/oligopoly/constants.ts)
│   │   │   │   ├── [game.ts](./economics/src/games/oligopoly/game.ts)
│   │   │   │   ├── [index.tsx](./economics/src/games/oligopoly/index.tsx)
│   │   │   │   ├── [reducer.ts](./economics/src/games/oligopoly/reducer.ts)
│   │   │   │   └── [types.ts](./economics/src/games/oligopoly/types.ts)
│   │   │   ├── opportunity-cost/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [game.test.ts](./economics/src/games/opportunity-cost/__tests__/game.test.ts)
│   │   │   │   │   ├── [index.test.tsx](./economics/src/games/opportunity-cost/__tests__/index.test.tsx)
│   │   │   │   │   └── [reducer.test.ts](./economics/src/games/opportunity-cost/__tests__/reducer.test.ts)
│   │   │   │   ├── components/
│   │   │   │   │   ├── [challenge.tsx](./economics/src/games/opportunity-cost/components/challenge.tsx)
│   │   │   │   │   ├── [format.ts](./economics/src/games/opportunity-cost/components/format.ts)
│   │   │   │   │   ├── [results.tsx](./economics/src/games/opportunity-cost/components/results.tsx)
│   │   │   │   │   └── [sandbox.tsx](./economics/src/games/opportunity-cost/components/sandbox.tsx)
│   │   │   │   ├── [components.tsx](./economics/src/games/opportunity-cost/components.tsx)
│   │   │   │   ├── [constants.ts](./economics/src/games/opportunity-cost/constants.ts)
│   │   │   │   ├── [game.ts](./economics/src/games/opportunity-cost/game.ts)
│   │   │   │   ├── [index.tsx](./economics/src/games/opportunity-cost/index.tsx)
│   │   │   │   ├── [reducer.ts](./economics/src/games/opportunity-cost/reducer.ts)
│   │   │   │   └── [types.ts](./economics/src/games/opportunity-cost/types.ts)
│   │   │   ├── order-book/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [game.test.ts](./economics/src/games/order-book/__tests__/game.test.ts)
│   │   │   │   │   ├── [index.test.tsx](./economics/src/games/order-book/__tests__/index.test.tsx)
│   │   │   │   │   └── [reducer.test.ts](./economics/src/games/order-book/__tests__/reducer.test.ts)
│   │   │   │   ├── [constants.ts](./economics/src/games/order-book/constants.ts)
│   │   │   │   ├── [game.ts](./economics/src/games/order-book/game.ts)
│   │   │   │   ├── [index.tsx](./economics/src/games/order-book/index.tsx)
│   │   │   │   ├── [reducer.ts](./economics/src/games/order-book/reducer.ts)
│   │   │   │   └── [types.ts](./economics/src/games/order-book/types.ts)
│   │   │   ├── overconfidence/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [game.test.ts](./economics/src/games/overconfidence/__tests__/game.test.ts)
│   │   │   │   │   ├── [index.test.tsx](./economics/src/games/overconfidence/__tests__/index.test.tsx)
│   │   │   │   │   └── [reducer.test.ts](./economics/src/games/overconfidence/__tests__/reducer.test.ts)
│   │   │   │   ├── [brackets.tsx](./economics/src/games/overconfidence/brackets.tsx)
│   │   │   │   ├── [calibration.tsx](./economics/src/games/overconfidence/calibration.tsx)
│   │   │   │   ├── [components.tsx](./economics/src/games/overconfidence/components.tsx)
│   │   │   │   ├── [constants.ts](./economics/src/games/overconfidence/constants.ts)
│   │   │   │   ├── [game.ts](./economics/src/games/overconfidence/game.ts)
│   │   │   │   ├── [index.tsx](./economics/src/games/overconfidence/index.tsx)
│   │   │   │   ├── [market.tsx](./economics/src/games/overconfidence/market.tsx)
│   │   │   │   ├── [question.tsx](./economics/src/games/overconfidence/question.tsx)
│   │   │   │   ├── [reducer.ts](./economics/src/games/overconfidence/reducer.ts)
│   │   │   │   └── [types.ts](./economics/src/games/overconfidence/types.ts)
│   │   │   ├── perfect-competition/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [game.test.ts](./economics/src/games/perfect-competition/__tests__/game.test.ts)
│   │   │   │   │   ├── [index.test.tsx](./economics/src/games/perfect-competition/__tests__/index.test.tsx)
│   │   │   │   │   └── [reducer.test.ts](./economics/src/games/perfect-competition/__tests__/reducer.test.ts)
│   │   │   │   ├── [components.tsx](./economics/src/games/perfect-competition/components.tsx)
│   │   │   │   ├── [constants.ts](./economics/src/games/perfect-competition/constants.ts)
│   │   │   │   ├── [game.ts](./economics/src/games/perfect-competition/game.ts)
│   │   │   │   ├── [index.tsx](./economics/src/games/perfect-competition/index.tsx)
│   │   │   │   ├── [reducer.ts](./economics/src/games/perfect-competition/reducer.ts)
│   │   │   │   └── [types.ts](./economics/src/games/perfect-competition/types.ts)
│   │   │   ├── phillips/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [game.test.ts](./economics/src/games/phillips/__tests__/game.test.ts)
│   │   │   │   │   ├── [index.test.tsx](./economics/src/games/phillips/__tests__/index.test.tsx)
│   │   │   │   │   └── [reducer.test.ts](./economics/src/games/phillips/__tests__/reducer.test.ts)
│   │   │   │   ├── [components.tsx](./economics/src/games/phillips/components.tsx)
│   │   │   │   ├── [constants.ts](./economics/src/games/phillips/constants.ts)
│   │   │   │   ├── [game.ts](./economics/src/games/phillips/game.ts)
│   │   │   │   ├── [index.tsx](./economics/src/games/phillips/index.tsx)
│   │   │   │   ├── [reducer.ts](./economics/src/games/phillips/reducer.ts)
│   │   │   │   └── [types.ts](./economics/src/games/phillips/types.ts)
│   │   │   ├── portfolio/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [game.test.ts](./economics/src/games/portfolio/__tests__/game.test.ts)
│   │   │   │   │   ├── [index.test.tsx](./economics/src/games/portfolio/__tests__/index.test.tsx)
│   │   │   │   │   └── [reducer.test.ts](./economics/src/games/portfolio/__tests__/reducer.test.ts)
│   │   │   │   ├── [challenge.tsx](./economics/src/games/portfolio/challenge.tsx)
│   │   │   │   ├── [components.tsx](./economics/src/games/portfolio/components.tsx)
│   │   │   │   ├── [constants.ts](./economics/src/games/portfolio/constants.ts)
│   │   │   │   ├── [frontier.tsx](./economics/src/games/portfolio/frontier.tsx)
│   │   │   │   ├── [game.ts](./economics/src/games/portfolio/game.ts)
│   │   │   │   ├── [index.tsx](./economics/src/games/portfolio/index.tsx)
│   │   │   │   ├── [reducer.ts](./economics/src/games/portfolio/reducer.ts)
│   │   │   │   └── [types.ts](./economics/src/games/portfolio/types.ts)
│   │   │   ├── poverty-trap/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [game.test.ts](./economics/src/games/poverty-trap/__tests__/game.test.ts)
│   │   │   │   │   ├── [index.test.tsx](./economics/src/games/poverty-trap/__tests__/index.test.tsx)
│   │   │   │   │   └── [reducer.test.ts](./economics/src/games/poverty-trap/__tests__/reducer.test.ts)
│   │   │   │   ├── [components.tsx](./economics/src/games/poverty-trap/components.tsx)
│   │   │   │   ├── [constants.ts](./economics/src/games/poverty-trap/constants.ts)
│   │   │   │   ├── [game.ts](./economics/src/games/poverty-trap/game.ts)
│   │   │   │   ├── [index.tsx](./economics/src/games/poverty-trap/index.tsx)
│   │   │   │   ├── [panel.tsx](./economics/src/games/poverty-trap/panel.tsx)
│   │   │   │   ├── [reducer.ts](./economics/src/games/poverty-trap/reducer.ts)
│   │   │   │   └── [types.ts](./economics/src/games/poverty-trap/types.ts)
│   │   │   ├── price-discrimination/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [game.test.ts](./economics/src/games/price-discrimination/__tests__/game.test.ts)
│   │   │   │   │   ├── [index.test.tsx](./economics/src/games/price-discrimination/__tests__/index.test.tsx)
│   │   │   │   │   └── [reducer.test.ts](./economics/src/games/price-discrimination/__tests__/reducer.test.ts)
│   │   │   │   ├── [components.tsx](./economics/src/games/price-discrimination/components.tsx)
│   │   │   │   ├── [constants.ts](./economics/src/games/price-discrimination/constants.ts)
│   │   │   │   ├── [game.ts](./economics/src/games/price-discrimination/game.ts)
│   │   │   │   ├── [index.tsx](./economics/src/games/price-discrimination/index.tsx)
│   │   │   │   ├── [panels.tsx](./economics/src/games/price-discrimination/panels.tsx)
│   │   │   │   ├── [reducer.ts](./economics/src/games/price-discrimination/reducer.ts)
│   │   │   │   └── [types.ts](./economics/src/games/price-discrimination/types.ts)
│   │   │   ├── price-lab/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [game.test.ts](./economics/src/games/price-lab/__tests__/game.test.ts)
│   │   │   │   │   └── [index.test.tsx](./economics/src/games/price-lab/__tests__/index.test.tsx)
│   │   │   │   ├── [components.tsx](./economics/src/games/price-lab/components.tsx)
│   │   │   │   ├── [constants.ts](./economics/src/games/price-lab/constants.ts)
│   │   │   │   ├── [game.ts](./economics/src/games/price-lab/game.ts)
│   │   │   │   ├── [index.tsx](./economics/src/games/price-lab/index.tsx)
│   │   │   │   └── [types.ts](./economics/src/games/price-lab/types.ts)
│   │   │   ├── prisoners-dilemma/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [game.test.ts](./economics/src/games/prisoners-dilemma/__tests__/game.test.ts)
│   │   │   │   │   ├── [index.test.tsx](./economics/src/games/prisoners-dilemma/__tests__/index.test.tsx)
│   │   │   │   │   └── [tournament.test.ts](./economics/src/games/prisoners-dilemma/__tests__/tournament.test.ts)
│   │   │   │   ├── [behaviours.ts](./economics/src/games/prisoners-dilemma/behaviours.ts)
│   │   │   │   ├── [constants.ts](./economics/src/games/prisoners-dilemma/constants.ts)
│   │   │   │   ├── [game.ts](./economics/src/games/prisoners-dilemma/game.ts)
│   │   │   │   ├── [index.tsx](./economics/src/games/prisoners-dilemma/index.tsx)
│   │   │   │   ├── [reducer.ts](./economics/src/games/prisoners-dilemma/reducer.ts)
│   │   │   │   ├── [tournament.ts](./economics/src/games/prisoners-dilemma/tournament.ts)
│   │   │   │   └── [types.ts](./economics/src/games/prisoners-dilemma/types.ts)
│   │   │   ├── production/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [game.test.ts](./economics/src/games/production/__tests__/game.test.ts)
│   │   │   │   │   ├── [index.test.tsx](./economics/src/games/production/__tests__/index.test.tsx)
│   │   │   │   │   └── [reducer.test.ts](./economics/src/games/production/__tests__/reducer.test.ts)
│   │   │   │   ├── [components.tsx](./economics/src/games/production/components.tsx)
│   │   │   │   ├── [constants.ts](./economics/src/games/production/constants.ts)
│   │   │   │   ├── [curves.tsx](./economics/src/games/production/curves.tsx)
│   │   │   │   ├── [game.ts](./economics/src/games/production/game.ts)
│   │   │   │   ├── [index.tsx](./economics/src/games/production/index.tsx)
│   │   │   │   ├── [metrics.tsx](./economics/src/games/production/metrics.tsx)
│   │   │   │   ├── [quiz.tsx](./economics/src/games/production/quiz.tsx)
│   │   │   │   ├── [reducer.ts](./economics/src/games/production/reducer.ts)
│   │   │   │   └── [types.ts](./economics/src/games/production/types.ts)
│   │   │   ├── public-choice/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [game.test.ts](./economics/src/games/public-choice/__tests__/game.test.ts)
│   │   │   │   │   ├── [index.test.tsx](./economics/src/games/public-choice/__tests__/index.test.tsx)
│   │   │   │   │   └── [reducer.test.ts](./economics/src/games/public-choice/__tests__/reducer.test.ts)
│   │   │   │   ├── [components.tsx](./economics/src/games/public-choice/components.tsx)
│   │   │   │   ├── [constants.ts](./economics/src/games/public-choice/constants.ts)
│   │   │   │   ├── [game.ts](./economics/src/games/public-choice/game.ts)
│   │   │   │   ├── [index.tsx](./economics/src/games/public-choice/index.tsx)
│   │   │   │   ├── [median.tsx](./economics/src/games/public-choice/median.tsx)
│   │   │   │   ├── [paradox.tsx](./economics/src/games/public-choice/paradox.tsx)
│   │   │   │   ├── [reducer.ts](./economics/src/games/public-choice/reducer.ts)
│   │   │   │   ├── [rent.tsx](./economics/src/games/public-choice/rent.tsx)
│   │   │   │   └── [types.ts](./economics/src/games/public-choice/types.ts)
│   │   │   ├── public-goods/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [game.test.ts](./economics/src/games/public-goods/__tests__/game.test.ts)
│   │   │   │   │   ├── [index.test.tsx](./economics/src/games/public-goods/__tests__/index.test.tsx)
│   │   │   │   │   └── [reducer.test.ts](./economics/src/games/public-goods/__tests__/reducer.test.ts)
│   │   │   │   ├── [constants.ts](./economics/src/games/public-goods/constants.ts)
│   │   │   │   ├── [game.ts](./economics/src/games/public-goods/game.ts)
│   │   │   │   ├── [index.tsx](./economics/src/games/public-goods/index.tsx)
│   │   │   │   ├── [reducer.ts](./economics/src/games/public-goods/reducer.ts)
│   │   │   │   └── [types.ts](./economics/src/games/public-goods/types.ts)
│   │   │   ├── rcts/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [game.test.ts](./economics/src/games/rcts/__tests__/game.test.ts)
│   │   │   │   │   ├── [index.test.tsx](./economics/src/games/rcts/__tests__/index.test.tsx)
│   │   │   │   │   └── [reducer.test.ts](./economics/src/games/rcts/__tests__/reducer.test.ts)
│   │   │   │   ├── [components.tsx](./economics/src/games/rcts/components.tsx)
│   │   │   │   ├── [constants.ts](./economics/src/games/rcts/constants.ts)
│   │   │   │   ├── [game.ts](./economics/src/games/rcts/game.ts)
│   │   │   │   ├── [index.tsx](./economics/src/games/rcts/index.tsx)
│   │   │   │   ├── [reducer.ts](./economics/src/games/rcts/reducer.ts)
│   │   │   │   └── [types.ts](./economics/src/games/rcts/types.ts)
│   │   │   ├── repeated/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [game.test.ts](./economics/src/games/repeated/__tests__/game.test.ts)
│   │   │   │   │   ├── [index.test.tsx](./economics/src/games/repeated/__tests__/index.test.tsx)
│   │   │   │   │   └── [reducer.test.ts](./economics/src/games/repeated/__tests__/reducer.test.ts)
│   │   │   │   ├── [constants.ts](./economics/src/games/repeated/constants.ts)
│   │   │   │   ├── [game.ts](./economics/src/games/repeated/game.ts)
│   │   │   │   ├── [index.tsx](./economics/src/games/repeated/index.tsx)
│   │   │   │   ├── [reducer.ts](./economics/src/games/repeated/reducer.ts)
│   │   │   │   └── [types.ts](./economics/src/games/repeated/types.ts)
│   │   │   ├── rps/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [game.test.ts](./economics/src/games/rps/__tests__/game.test.ts)
│   │   │   │   │   ├── [index.test.tsx](./economics/src/games/rps/__tests__/index.test.tsx)
│   │   │   │   │   └── [reducer.test.ts](./economics/src/games/rps/__tests__/reducer.test.ts)
│   │   │   │   ├── [constants.ts](./economics/src/games/rps/constants.ts)
│   │   │   │   ├── [game.ts](./economics/src/games/rps/game.ts)
│   │   │   │   ├── [index.tsx](./economics/src/games/rps/index.tsx)
│   │   │   │   ├── [reducer.ts](./economics/src/games/rps/reducer.ts)
│   │   │   │   └── [types.ts](./economics/src/games/rps/types.ts)
│   │   │   ├── sequential/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [game.test.ts](./economics/src/games/sequential/__tests__/game.test.ts)
│   │   │   │   │   ├── [index.test.tsx](./economics/src/games/sequential/__tests__/index.test.tsx)
│   │   │   │   │   └── [reducer.test.ts](./economics/src/games/sequential/__tests__/reducer.test.ts)
│   │   │   │   ├── [components.tsx](./economics/src/games/sequential/components.tsx)
│   │   │   │   ├── [constants.ts](./economics/src/games/sequential/constants.ts)
│   │   │   │   ├── [game.ts](./economics/src/games/sequential/game.ts)
│   │   │   │   ├── [index.tsx](./economics/src/games/sequential/index.tsx)
│   │   │   │   ├── [reducer.ts](./economics/src/games/sequential/reducer.ts)
│   │   │   │   └── [types.ts](./economics/src/games/sequential/types.ts)
│   │   │   ├── signaling/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [game.test.ts](./economics/src/games/signaling/__tests__/game.test.ts)
│   │   │   │   │   ├── [index.test.tsx](./economics/src/games/signaling/__tests__/index.test.tsx)
│   │   │   │   │   └── [reducer.test.ts](./economics/src/games/signaling/__tests__/reducer.test.ts)
│   │   │   │   ├── [constants.ts](./economics/src/games/signaling/constants.ts)
│   │   │   │   ├── [game.ts](./economics/src/games/signaling/game.ts)
│   │   │   │   ├── [index.tsx](./economics/src/games/signaling/index.tsx)
│   │   │   │   ├── [reducer.ts](./economics/src/games/signaling/reducer.ts)
│   │   │   │   └── [types.ts](./economics/src/games/signaling/types.ts)
│   │   │   ├── stag-hunt/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [game.test.ts](./economics/src/games/stag-hunt/__tests__/game.test.ts)
│   │   │   │   │   ├── [index.test.tsx](./economics/src/games/stag-hunt/__tests__/index.test.tsx)
│   │   │   │   │   └── [reducer.test.ts](./economics/src/games/stag-hunt/__tests__/reducer.test.ts)
│   │   │   │   ├── [constants.ts](./economics/src/games/stag-hunt/constants.ts)
│   │   │   │   ├── [game.ts](./economics/src/games/stag-hunt/game.ts)
│   │   │   │   ├── [index.tsx](./economics/src/games/stag-hunt/index.tsx)
│   │   │   │   ├── [reducer.ts](./economics/src/games/stag-hunt/reducer.ts)
│   │   │   │   └── [types.ts](./economics/src/games/stag-hunt/types.ts)
│   │   │   ├── time-value/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [game.test.ts](./economics/src/games/time-value/__tests__/game.test.ts)
│   │   │   │   │   ├── [index.test.tsx](./economics/src/games/time-value/__tests__/index.test.tsx)
│   │   │   │   │   └── [reducer.test.ts](./economics/src/games/time-value/__tests__/reducer.test.ts)
│   │   │   │   ├── [calculator.tsx](./economics/src/games/time-value/calculator.tsx)
│   │   │   │   ├── [components.tsx](./economics/src/games/time-value/components.tsx)
│   │   │   │   ├── [constants.ts](./economics/src/games/time-value/constants.ts)
│   │   │   │   ├── [game.ts](./economics/src/games/time-value/game.ts)
│   │   │   │   ├── [index.tsx](./economics/src/games/time-value/index.tsx)
│   │   │   │   ├── [phases.tsx](./economics/src/games/time-value/phases.tsx)
│   │   │   │   ├── [reducer.ts](./economics/src/games/time-value/reducer.ts)
│   │   │   │   └── [types.ts](./economics/src/games/time-value/types.ts)
│   │   │   └── trade/
│   │   │       ├── __tests__/
│   │   │       │   ├── [game.test.ts](./economics/src/games/trade/__tests__/game.test.ts)
│   │   │       │   ├── [index.test.tsx](./economics/src/games/trade/__tests__/index.test.tsx)
│   │   │       │   └── [reducer.test.ts](./economics/src/games/trade/__tests__/reducer.test.ts)
│   │   │       ├── [chart-scaffold.tsx](./economics/src/games/trade/chart-scaffold.tsx)
│   │   │       ├── [chart.tsx](./economics/src/games/trade/chart.tsx)
│   │   │       ├── [components.tsx](./economics/src/games/trade/components.tsx)
│   │   │       ├── [constants.ts](./economics/src/games/trade/constants.ts)
│   │   │       ├── [game.ts](./economics/src/games/trade/game.ts)
│   │   │       ├── [index.tsx](./economics/src/games/trade/index.tsx)
│   │   │       ├── [panels.tsx](./economics/src/games/trade/panels.tsx)
│   │   │       ├── [reducer.ts](./economics/src/games/trade/reducer.ts)
│   │   │       ├── [retaliation.tsx](./economics/src/games/trade/retaliation.tsx)
│   │   │       └── [types.ts](./economics/src/games/trade/types.ts)
│   │   ├── hooks/
│   │   │   ├── __tests__/
│   │   │   │   ├── [useOffline.test.ts](./economics/src/hooks/__tests__/useOffline.test.ts)
│   │   │   │   ├── [useSWRegister.test.ts](./economics/src/hooks/__tests__/useSWRegister.test.ts)
│   │   │   │   ├── [useTheme.test.ts](./economics/src/hooks/__tests__/useTheme.test.ts)
│   │   │   │   └── [useUpdater.test.ts](./economics/src/hooks/__tests__/useUpdater.test.ts)
│   │   │   ├── [useOffline.ts](./economics/src/hooks/useOffline.ts)
│   │   │   ├── [useSWRegister.ts](./economics/src/hooks/useSWRegister.ts)
│   │   │   ├── [useTheme.ts](./economics/src/hooks/useTheme.ts)
│   │   │   └── [useUpdater.ts](./economics/src/hooks/useUpdater.ts)
│   │   ├── lib/
│   │   │   ├── __tests__/
│   │   │   │   └── [native.test.ts](./economics/src/lib/__tests__/native.test.ts)
│   │   │   ├── [catalog.ts](./economics/src/lib/catalog.ts)
│   │   │   └── [native.ts](./economics/src/lib/native.ts)
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
│   │   │   ├── android/
│   │   │   │   ├── mipmap-anydpi-v26/
│   │   │   │   │   └── [ic_launcher.xml](./economics/src-tauri/icons/android/mipmap-anydpi-v26/ic_launcher.xml)
│   │   │   │   ├── mipmap-hdpi/
│   │   │   │   │   ├── [ic_launcher.png](./economics/src-tauri/icons/android/mipmap-hdpi/ic_launcher.png)
│   │   │   │   │   ├── [ic_launcher_foreground.png](./economics/src-tauri/icons/android/mipmap-hdpi/ic_launcher_foreground.png)
│   │   │   │   │   └── [ic_launcher_round.png](./economics/src-tauri/icons/android/mipmap-hdpi/ic_launcher_round.png)
│   │   │   │   ├── mipmap-mdpi/
│   │   │   │   │   ├── [ic_launcher.png](./economics/src-tauri/icons/android/mipmap-mdpi/ic_launcher.png)
│   │   │   │   │   ├── [ic_launcher_foreground.png](./economics/src-tauri/icons/android/mipmap-mdpi/ic_launcher_foreground.png)
│   │   │   │   │   └── [ic_launcher_round.png](./economics/src-tauri/icons/android/mipmap-mdpi/ic_launcher_round.png)
│   │   │   │   ├── mipmap-xhdpi/
│   │   │   │   │   ├── [ic_launcher.png](./economics/src-tauri/icons/android/mipmap-xhdpi/ic_launcher.png)
│   │   │   │   │   ├── [ic_launcher_foreground.png](./economics/src-tauri/icons/android/mipmap-xhdpi/ic_launcher_foreground.png)
│   │   │   │   │   └── [ic_launcher_round.png](./economics/src-tauri/icons/android/mipmap-xhdpi/ic_launcher_round.png)
│   │   │   │   ├── mipmap-xxhdpi/
│   │   │   │   │   ├── [ic_launcher.png](./economics/src-tauri/icons/android/mipmap-xxhdpi/ic_launcher.png)
│   │   │   │   │   ├── [ic_launcher_foreground.png](./economics/src-tauri/icons/android/mipmap-xxhdpi/ic_launcher_foreground.png)
│   │   │   │   │   └── [ic_launcher_round.png](./economics/src-tauri/icons/android/mipmap-xxhdpi/ic_launcher_round.png)
│   │   │   │   ├── mipmap-xxxhdpi/
│   │   │   │   │   ├── [ic_launcher.png](./economics/src-tauri/icons/android/mipmap-xxxhdpi/ic_launcher.png)
│   │   │   │   │   ├── [ic_launcher_foreground.png](./economics/src-tauri/icons/android/mipmap-xxxhdpi/ic_launcher_foreground.png)
│   │   │   │   │   └── [ic_launcher_round.png](./economics/src-tauri/icons/android/mipmap-xxxhdpi/ic_launcher_round.png)
│   │   │   │   └── values/
│   │   │   │       └── [ic_launcher_background.xml](./economics/src-tauri/icons/android/values/ic_launcher_background.xml)
│   │   │   ├── ios/
│   │   │   │   ├── [AppIcon-20x20@1x.png](./economics/src-tauri/icons/ios/AppIcon-20x20@1x.png)
│   │   │   │   ├── [AppIcon-20x20@2x-1.png](./economics/src-tauri/icons/ios/AppIcon-20x20@2x-1.png)
│   │   │   │   ├── [AppIcon-20x20@2x.png](./economics/src-tauri/icons/ios/AppIcon-20x20@2x.png)
│   │   │   │   ├── [AppIcon-20x20@3x.png](./economics/src-tauri/icons/ios/AppIcon-20x20@3x.png)
│   │   │   │   ├── [AppIcon-29x29@1x.png](./economics/src-tauri/icons/ios/AppIcon-29x29@1x.png)
│   │   │   │   ├── [AppIcon-29x29@2x-1.png](./economics/src-tauri/icons/ios/AppIcon-29x29@2x-1.png)
│   │   │   │   ├── [AppIcon-29x29@2x.png](./economics/src-tauri/icons/ios/AppIcon-29x29@2x.png)
│   │   │   │   ├── [AppIcon-29x29@3x.png](./economics/src-tauri/icons/ios/AppIcon-29x29@3x.png)
│   │   │   │   ├── [AppIcon-40x40@1x.png](./economics/src-tauri/icons/ios/AppIcon-40x40@1x.png)
│   │   │   │   ├── [AppIcon-40x40@2x-1.png](./economics/src-tauri/icons/ios/AppIcon-40x40@2x-1.png)
│   │   │   │   ├── [AppIcon-40x40@2x.png](./economics/src-tauri/icons/ios/AppIcon-40x40@2x.png)
│   │   │   │   ├── [AppIcon-40x40@3x.png](./economics/src-tauri/icons/ios/AppIcon-40x40@3x.png)
│   │   │   │   ├── [AppIcon-512@2x.png](./economics/src-tauri/icons/ios/AppIcon-512@2x.png)
│   │   │   │   ├── [AppIcon-60x60@2x.png](./economics/src-tauri/icons/ios/AppIcon-60x60@2x.png)
│   │   │   │   ├── [AppIcon-60x60@3x.png](./economics/src-tauri/icons/ios/AppIcon-60x60@3x.png)
│   │   │   │   ├── [AppIcon-76x76@1x.png](./economics/src-tauri/icons/ios/AppIcon-76x76@1x.png)
│   │   │   │   ├── [AppIcon-76x76@2x.png](./economics/src-tauri/icons/ios/AppIcon-76x76@2x.png)
│   │   │   │   └── [AppIcon-83.5x83.5@2x.png](./economics/src-tauri/icons/ios/AppIcon-83.5x83.5@2x.png)
│   │   │   ├── [128x128.png](./economics/src-tauri/icons/128x128.png)
│   │   │   ├── [128x128@2x.png](./economics/src-tauri/icons/128x128@2x.png)
│   │   │   ├── [256x256.png](./economics/src-tauri/icons/256x256.png)
│   │   │   ├── [32x32.png](./economics/src-tauri/icons/32x32.png)
│   │   │   ├── [64x64.png](./economics/src-tauri/icons/64x64.png)
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
│   │   │   ├── [create-icons.sh](./economics/src-tauri/icons/create-icons.sh)
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
│   │   ├── screenshots/
│   │   │   ├── [about.png](./history/e2e/screenshots/about.png)
│   │   │   ├── [downloads.png](./history/e2e/screenshots/downloads.png)
│   │   │   ├── [home.png](./history/e2e/screenshots/home.png)
│   │   │   └── [version.png](./history/e2e/screenshots/version.png)
│   │   ├── [about.spec.ts](./history/e2e/about.spec.ts)
│   │   ├── [downloads.spec.ts](./history/e2e/downloads.spec.ts)
│   │   ├── [home.spec.ts](./history/e2e/home.spec.ts)
│   │   └── [version.spec.ts](./history/e2e/version.spec.ts)
│   ├── public/
│   │   ├── icons/
│   │   │   ├── [icon-128x128.png](./history/public/icons/icon-128x128.png)
│   │   │   ├── [icon-144x144.png](./history/public/icons/icon-144x144.png)
│   │   │   ├── [icon-152x152.png](./history/public/icons/icon-152x152.png)
│   │   │   ├── [icon-16x16.png](./history/public/icons/icon-16x16.png)
│   │   │   ├── [icon-180x180.png](./history/public/icons/icon-180x180.png)
│   │   │   ├── [icon-192x192.png](./history/public/icons/icon-192x192.png)
│   │   │   ├── [icon-256x256.png](./history/public/icons/icon-256x256.png)
│   │   │   ├── [icon-32x32.png](./history/public/icons/icon-32x32.png)
│   │   │   ├── [icon-384x384.png](./history/public/icons/icon-384x384.png)
│   │   │   ├── [icon-48x48.png](./history/public/icons/icon-48x48.png)
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
│   │   │   │   │   └── [ThemeToggle.test.tsx](./history/src/components/atoms/__tests__/ThemeToggle.test.tsx)
│   │   │   │   ├── [Badge.tsx](./history/src/components/atoms/Badge.tsx)
│   │   │   │   ├── [Button.tsx](./history/src/components/atoms/Button.tsx)
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
│   │   ├── content/
│   │   │   ├── [about.ts](./history/src/content/about.ts)
│   │   │   ├── [download.ts](./history/src/content/download.ts)
│   │   │   └── [version.ts](./history/src/content/version.ts)
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
│   │   │   │   ├── [useSWRegister.test.ts](./history/src/hooks/__tests__/useSWRegister.test.ts)
│   │   │   │   ├── [useTheme.test.ts](./history/src/hooks/__tests__/useTheme.test.ts)
│   │   │   │   └── [useUpdater.test.ts](./history/src/hooks/__tests__/useUpdater.test.ts)
│   │   │   ├── [useSWRegister.ts](./history/src/hooks/useSWRegister.ts)
│   │   │   ├── [useTheme.ts](./history/src/hooks/useTheme.ts)
│   │   │   └── [useUpdater.ts](./history/src/hooks/useUpdater.ts)
│   │   ├── lib/
│   │   │   └── native/
│   │   │       ├── __tests__/
│   │   │       │   └── [index.test.ts](./history/src/lib/native/__tests__/index.test.ts)
│   │   │       └── [index.ts](./history/src/lib/native/index.ts)
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
│   │   │   ├── android/
│   │   │   │   ├── mipmap-anydpi-v26/
│   │   │   │   │   └── [ic_launcher.xml](./history/src-tauri/icons/android/mipmap-anydpi-v26/ic_launcher.xml)
│   │   │   │   ├── mipmap-hdpi/
│   │   │   │   │   ├── [ic_launcher.png](./history/src-tauri/icons/android/mipmap-hdpi/ic_launcher.png)
│   │   │   │   │   ├── [ic_launcher_foreground.png](./history/src-tauri/icons/android/mipmap-hdpi/ic_launcher_foreground.png)
│   │   │   │   │   └── [ic_launcher_round.png](./history/src-tauri/icons/android/mipmap-hdpi/ic_launcher_round.png)
│   │   │   │   ├── mipmap-mdpi/
│   │   │   │   │   ├── [ic_launcher.png](./history/src-tauri/icons/android/mipmap-mdpi/ic_launcher.png)
│   │   │   │   │   ├── [ic_launcher_foreground.png](./history/src-tauri/icons/android/mipmap-mdpi/ic_launcher_foreground.png)
│   │   │   │   │   └── [ic_launcher_round.png](./history/src-tauri/icons/android/mipmap-mdpi/ic_launcher_round.png)
│   │   │   │   ├── mipmap-xhdpi/
│   │   │   │   │   ├── [ic_launcher.png](./history/src-tauri/icons/android/mipmap-xhdpi/ic_launcher.png)
│   │   │   │   │   ├── [ic_launcher_foreground.png](./history/src-tauri/icons/android/mipmap-xhdpi/ic_launcher_foreground.png)
│   │   │   │   │   └── [ic_launcher_round.png](./history/src-tauri/icons/android/mipmap-xhdpi/ic_launcher_round.png)
│   │   │   │   ├── mipmap-xxhdpi/
│   │   │   │   │   ├── [ic_launcher.png](./history/src-tauri/icons/android/mipmap-xxhdpi/ic_launcher.png)
│   │   │   │   │   ├── [ic_launcher_foreground.png](./history/src-tauri/icons/android/mipmap-xxhdpi/ic_launcher_foreground.png)
│   │   │   │   │   └── [ic_launcher_round.png](./history/src-tauri/icons/android/mipmap-xxhdpi/ic_launcher_round.png)
│   │   │   │   ├── mipmap-xxxhdpi/
│   │   │   │   │   ├── [ic_launcher.png](./history/src-tauri/icons/android/mipmap-xxxhdpi/ic_launcher.png)
│   │   │   │   │   ├── [ic_launcher_foreground.png](./history/src-tauri/icons/android/mipmap-xxxhdpi/ic_launcher_foreground.png)
│   │   │   │   │   └── [ic_launcher_round.png](./history/src-tauri/icons/android/mipmap-xxxhdpi/ic_launcher_round.png)
│   │   │   │   └── values/
│   │   │   │       └── [ic_launcher_background.xml](./history/src-tauri/icons/android/values/ic_launcher_background.xml)
│   │   │   ├── ios/
│   │   │   │   ├── [AppIcon-20x20@1x.png](./history/src-tauri/icons/ios/AppIcon-20x20@1x.png)
│   │   │   │   ├── [AppIcon-20x20@2x-1.png](./history/src-tauri/icons/ios/AppIcon-20x20@2x-1.png)
│   │   │   │   ├── [AppIcon-20x20@2x.png](./history/src-tauri/icons/ios/AppIcon-20x20@2x.png)
│   │   │   │   ├── [AppIcon-20x20@3x.png](./history/src-tauri/icons/ios/AppIcon-20x20@3x.png)
│   │   │   │   ├── [AppIcon-29x29@1x.png](./history/src-tauri/icons/ios/AppIcon-29x29@1x.png)
│   │   │   │   ├── [AppIcon-29x29@2x-1.png](./history/src-tauri/icons/ios/AppIcon-29x29@2x-1.png)
│   │   │   │   ├── [AppIcon-29x29@2x.png](./history/src-tauri/icons/ios/AppIcon-29x29@2x.png)
│   │   │   │   ├── [AppIcon-29x29@3x.png](./history/src-tauri/icons/ios/AppIcon-29x29@3x.png)
│   │   │   │   ├── [AppIcon-40x40@1x.png](./history/src-tauri/icons/ios/AppIcon-40x40@1x.png)
│   │   │   │   ├── [AppIcon-40x40@2x-1.png](./history/src-tauri/icons/ios/AppIcon-40x40@2x-1.png)
│   │   │   │   ├── [AppIcon-40x40@2x.png](./history/src-tauri/icons/ios/AppIcon-40x40@2x.png)
│   │   │   │   ├── [AppIcon-40x40@3x.png](./history/src-tauri/icons/ios/AppIcon-40x40@3x.png)
│   │   │   │   ├── [AppIcon-512@2x.png](./history/src-tauri/icons/ios/AppIcon-512@2x.png)
│   │   │   │   ├── [AppIcon-60x60@2x.png](./history/src-tauri/icons/ios/AppIcon-60x60@2x.png)
│   │   │   │   ├── [AppIcon-60x60@3x.png](./history/src-tauri/icons/ios/AppIcon-60x60@3x.png)
│   │   │   │   ├── [AppIcon-76x76@1x.png](./history/src-tauri/icons/ios/AppIcon-76x76@1x.png)
│   │   │   │   ├── [AppIcon-76x76@2x.png](./history/src-tauri/icons/ios/AppIcon-76x76@2x.png)
│   │   │   │   └── [AppIcon-83.5x83.5@2x.png](./history/src-tauri/icons/ios/AppIcon-83.5x83.5@2x.png)
│   │   │   ├── [128x128.png](./history/src-tauri/icons/128x128.png)
│   │   │   ├── [128x128@2x.png](./history/src-tauri/icons/128x128@2x.png)
│   │   │   ├── [256x256.png](./history/src-tauri/icons/256x256.png)
│   │   │   ├── [32x32.png](./history/src-tauri/icons/32x32.png)
│   │   │   ├── [64x64.png](./history/src-tauri/icons/64x64.png)
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
│   │   │   ├── [create-icons.sh](./history/src-tauri/icons/create-icons.sh)
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
│   │   ├── screenshots/
│   │   │   ├── [about.png](./lingo/e2e/screenshots/about.png)
│   │   │   ├── [downloads.png](./lingo/e2e/screenshots/downloads.png)
│   │   │   ├── [home.png](./lingo/e2e/screenshots/home.png)
│   │   │   └── [version.png](./lingo/e2e/screenshots/version.png)
│   │   ├── [about.spec.ts](./lingo/e2e/about.spec.ts)
│   │   ├── [downloads.spec.ts](./lingo/e2e/downloads.spec.ts)
│   │   ├── [home.spec.ts](./lingo/e2e/home.spec.ts)
│   │   └── [version.spec.ts](./lingo/e2e/version.spec.ts)
│   ├── public/
│   │   ├── audio/
│   │   │   ├── 3/
│   │   │   │   ├── [a.mp3](./lingo/public/audio/3/a.mp3)
│   │   │   │   ├── [as.mp3](./lingo/public/audio/3/as.mp3)
│   │   │   │   ├── [b.mp3](./lingo/public/audio/3/b.mp3)
│   │   │   │   ├── [c.mp3](./lingo/public/audio/3/c.mp3)
│   │   │   │   ├── [cs.mp3](./lingo/public/audio/3/cs.mp3)
│   │   │   │   ├── [d.mp3](./lingo/public/audio/3/d.mp3)
│   │   │   │   ├── [ds.mp3](./lingo/public/audio/3/ds.mp3)
│   │   │   │   ├── [e.mp3](./lingo/public/audio/3/e.mp3)
│   │   │   │   ├── [f.mp3](./lingo/public/audio/3/f.mp3)
│   │   │   │   ├── [fs.mp3](./lingo/public/audio/3/fs.mp3)
│   │   │   │   ├── [g.mp3](./lingo/public/audio/3/g.mp3)
│   │   │   │   └── [gs.mp3](./lingo/public/audio/3/gs.mp3)
│   │   │   └── 4/
│   │   │       └── [c.mp3](./lingo/public/audio/4/c.mp3)
│   │   ├── data/
│   │   │   └── [words.json](./lingo/public/data/words.json)
│   │   ├── icons/
│   │   │   ├── [icon-128x128.png](./lingo/public/icons/icon-128x128.png)
│   │   │   ├── [icon-144x144.png](./lingo/public/icons/icon-144x144.png)
│   │   │   ├── [icon-152x152.png](./lingo/public/icons/icon-152x152.png)
│   │   │   ├── [icon-16x16.png](./lingo/public/icons/icon-16x16.png)
│   │   │   ├── [icon-180x180.png](./lingo/public/icons/icon-180x180.png)
│   │   │   ├── [icon-192x192.png](./lingo/public/icons/icon-192x192.png)
│   │   │   ├── [icon-256x256.png](./lingo/public/icons/icon-256x256.png)
│   │   │   ├── [icon-32x32.png](./lingo/public/icons/icon-32x32.png)
│   │   │   ├── [icon-384x384.png](./lingo/public/icons/icon-384x384.png)
│   │   │   ├── [icon-48x48.png](./lingo/public/icons/icon-48x48.png)
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
│   │   │   ├── (games)/
│   │   │   │   ├── english/
│   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/english/page.tsx)
│   │   │   │   ├── flashcards/
│   │   │   │   │   ├── [language]/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   └── [page.test.tsx](./lingo/src/app/(games)/flashcards/[language]/__tests__/page.test.tsx)
│   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/flashcards/[language]/page.tsx)
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./lingo/src/app/(games)/flashcards/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/flashcards/page.tsx)
│   │   │   │   ├── music/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./lingo/src/app/(games)/music/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/music/page.tsx)
│   │   │   │   └── sign/
│   │   │   │       └── [page.tsx](./lingo/src/app/(games)/sign/page.tsx)
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
│   │   │   │   │   └── [Button.test.tsx](./lingo/src/components/atoms/__tests__/Button.test.tsx)
│   │   │   │   ├── [Badge.tsx](./lingo/src/components/atoms/Badge.tsx)
│   │   │   │   ├── [Button.tsx](./lingo/src/components/atoms/Button.tsx)
│   │   │   │   └── [ThemeToggle.tsx](./lingo/src/components/atoms/ThemeToggle.tsx)
│   │   │   ├── organisms/
│   │   │   │   └── [Header.tsx](./lingo/src/components/organisms/Header.tsx)
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
│   │   ├── content/
│   │   │   ├── [about.ts](./lingo/src/content/about.ts)
│   │   │   ├── [download.ts](./lingo/src/content/download.ts)
│   │   │   └── [version.ts](./lingo/src/content/version.ts)
│   │   ├── games/
│   │   │   ├── english/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [index.test.tsx](./lingo/src/games/english/__tests__/index.test.tsx)
│   │   │   │   │   └── [utils.test.ts](./lingo/src/games/english/__tests__/utils.test.ts)
│   │   │   │   ├── [index.tsx](./lingo/src/games/english/index.tsx)
│   │   │   │   └── [utils.ts](./lingo/src/games/english/utils.ts)
│   │   │   ├── flashcards/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [index.test.tsx](./lingo/src/games/flashcards/__tests__/index.test.tsx)
│   │   │   │   │   └── [utils.test.ts](./lingo/src/games/flashcards/__tests__/utils.test.ts)
│   │   │   │   ├── [LanguageList.tsx](./lingo/src/games/flashcards/LanguageList.tsx)
│   │   │   │   ├── [flags.ts](./lingo/src/games/flashcards/flags.ts)
│   │   │   │   ├── [index.tsx](./lingo/src/games/flashcards/index.tsx)
│   │   │   │   └── [utils.ts](./lingo/src/games/flashcards/utils.ts)
│   │   │   ├── music/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [index.test.tsx](./lingo/src/games/music/__tests__/index.test.tsx)
│   │   │   │   │   ├── [keyClasses.test.ts](./lingo/src/games/music/__tests__/keyClasses.test.ts)
│   │   │   │   │   ├── [useAudio.test.ts](./lingo/src/games/music/__tests__/useAudio.test.ts)
│   │   │   │   │   ├── [useGame.test.ts](./lingo/src/games/music/__tests__/useGame.test.ts)
│   │   │   │   │   └── [useSequence.test.ts](./lingo/src/games/music/__tests__/useSequence.test.ts)
│   │   │   │   ├── [constants.ts](./lingo/src/games/music/constants.ts)
│   │   │   │   ├── [index.tsx](./lingo/src/games/music/index.tsx)
│   │   │   │   ├── [keyClasses.ts](./lingo/src/games/music/keyClasses.ts)
│   │   │   │   ├── [twinkle-twinkle-little-star.ts](./lingo/src/games/music/twinkle-twinkle-little-star.ts)
│   │   │   │   ├── [useAudio.ts](./lingo/src/games/music/useAudio.ts)
│   │   │   │   ├── [useGame.ts](./lingo/src/games/music/useGame.ts)
│   │   │   │   ├── [useMusicGame.ts](./lingo/src/games/music/useMusicGame.ts)
│   │   │   │   └── [useSequence.ts](./lingo/src/games/music/useSequence.ts)
│   │   │   └── sign/
│   │   │       ├── __tests__/
│   │   │       │   ├── [index.test.tsx](./lingo/src/games/sign/__tests__/index.test.tsx)
│   │   │       │   └── [utils.test.ts](./lingo/src/games/sign/__tests__/utils.test.ts)
│   │   │       ├── [index.tsx](./lingo/src/games/sign/index.tsx)
│   │   │       └── [utils.ts](./lingo/src/games/sign/utils.ts)
│   │   ├── hooks/
│   │   │   ├── __tests__/
│   │   │   │   ├── [useSWRegister.test.ts](./lingo/src/hooks/__tests__/useSWRegister.test.ts)
│   │   │   │   ├── [useTheme.test.ts](./lingo/src/hooks/__tests__/useTheme.test.ts)
│   │   │   │   └── [useUpdater.test.ts](./lingo/src/hooks/__tests__/useUpdater.test.ts)
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
│   │   │   ├── android/
│   │   │   │   ├── mipmap-anydpi-v26/
│   │   │   │   │   └── [ic_launcher.xml](./lingo/src-tauri/icons/android/mipmap-anydpi-v26/ic_launcher.xml)
│   │   │   │   ├── mipmap-hdpi/
│   │   │   │   │   ├── [ic_launcher.png](./lingo/src-tauri/icons/android/mipmap-hdpi/ic_launcher.png)
│   │   │   │   │   ├── [ic_launcher_foreground.png](./lingo/src-tauri/icons/android/mipmap-hdpi/ic_launcher_foreground.png)
│   │   │   │   │   └── [ic_launcher_round.png](./lingo/src-tauri/icons/android/mipmap-hdpi/ic_launcher_round.png)
│   │   │   │   ├── mipmap-mdpi/
│   │   │   │   │   ├── [ic_launcher.png](./lingo/src-tauri/icons/android/mipmap-mdpi/ic_launcher.png)
│   │   │   │   │   ├── [ic_launcher_foreground.png](./lingo/src-tauri/icons/android/mipmap-mdpi/ic_launcher_foreground.png)
│   │   │   │   │   └── [ic_launcher_round.png](./lingo/src-tauri/icons/android/mipmap-mdpi/ic_launcher_round.png)
│   │   │   │   ├── mipmap-xhdpi/
│   │   │   │   │   ├── [ic_launcher.png](./lingo/src-tauri/icons/android/mipmap-xhdpi/ic_launcher.png)
│   │   │   │   │   ├── [ic_launcher_foreground.png](./lingo/src-tauri/icons/android/mipmap-xhdpi/ic_launcher_foreground.png)
│   │   │   │   │   └── [ic_launcher_round.png](./lingo/src-tauri/icons/android/mipmap-xhdpi/ic_launcher_round.png)
│   │   │   │   ├── mipmap-xxhdpi/
│   │   │   │   │   ├── [ic_launcher.png](./lingo/src-tauri/icons/android/mipmap-xxhdpi/ic_launcher.png)
│   │   │   │   │   ├── [ic_launcher_foreground.png](./lingo/src-tauri/icons/android/mipmap-xxhdpi/ic_launcher_foreground.png)
│   │   │   │   │   └── [ic_launcher_round.png](./lingo/src-tauri/icons/android/mipmap-xxhdpi/ic_launcher_round.png)
│   │   │   │   ├── mipmap-xxxhdpi/
│   │   │   │   │   ├── [ic_launcher.png](./lingo/src-tauri/icons/android/mipmap-xxxhdpi/ic_launcher.png)
│   │   │   │   │   ├── [ic_launcher_foreground.png](./lingo/src-tauri/icons/android/mipmap-xxxhdpi/ic_launcher_foreground.png)
│   │   │   │   │   └── [ic_launcher_round.png](./lingo/src-tauri/icons/android/mipmap-xxxhdpi/ic_launcher_round.png)
│   │   │   │   └── values/
│   │   │   │       └── [ic_launcher_background.xml](./lingo/src-tauri/icons/android/values/ic_launcher_background.xml)
│   │   │   ├── ios/
│   │   │   │   ├── [AppIcon-20x20@1x.png](./lingo/src-tauri/icons/ios/AppIcon-20x20@1x.png)
│   │   │   │   ├── [AppIcon-20x20@2x-1.png](./lingo/src-tauri/icons/ios/AppIcon-20x20@2x-1.png)
│   │   │   │   ├── [AppIcon-20x20@2x.png](./lingo/src-tauri/icons/ios/AppIcon-20x20@2x.png)
│   │   │   │   ├── [AppIcon-20x20@3x.png](./lingo/src-tauri/icons/ios/AppIcon-20x20@3x.png)
│   │   │   │   ├── [AppIcon-29x29@1x.png](./lingo/src-tauri/icons/ios/AppIcon-29x29@1x.png)
│   │   │   │   ├── [AppIcon-29x29@2x-1.png](./lingo/src-tauri/icons/ios/AppIcon-29x29@2x-1.png)
│   │   │   │   ├── [AppIcon-29x29@2x.png](./lingo/src-tauri/icons/ios/AppIcon-29x29@2x.png)
│   │   │   │   ├── [AppIcon-29x29@3x.png](./lingo/src-tauri/icons/ios/AppIcon-29x29@3x.png)
│   │   │   │   ├── [AppIcon-40x40@1x.png](./lingo/src-tauri/icons/ios/AppIcon-40x40@1x.png)
│   │   │   │   ├── [AppIcon-40x40@2x-1.png](./lingo/src-tauri/icons/ios/AppIcon-40x40@2x-1.png)
│   │   │   │   ├── [AppIcon-40x40@2x.png](./lingo/src-tauri/icons/ios/AppIcon-40x40@2x.png)
│   │   │   │   ├── [AppIcon-40x40@3x.png](./lingo/src-tauri/icons/ios/AppIcon-40x40@3x.png)
│   │   │   │   ├── [AppIcon-512@2x.png](./lingo/src-tauri/icons/ios/AppIcon-512@2x.png)
│   │   │   │   ├── [AppIcon-60x60@2x.png](./lingo/src-tauri/icons/ios/AppIcon-60x60@2x.png)
│   │   │   │   ├── [AppIcon-60x60@3x.png](./lingo/src-tauri/icons/ios/AppIcon-60x60@3x.png)
│   │   │   │   ├── [AppIcon-76x76@1x.png](./lingo/src-tauri/icons/ios/AppIcon-76x76@1x.png)
│   │   │   │   ├── [AppIcon-76x76@2x.png](./lingo/src-tauri/icons/ios/AppIcon-76x76@2x.png)
│   │   │   │   └── [AppIcon-83.5x83.5@2x.png](./lingo/src-tauri/icons/ios/AppIcon-83.5x83.5@2x.png)
│   │   │   ├── [128x128.png](./lingo/src-tauri/icons/128x128.png)
│   │   │   ├── [128x128@2x.png](./lingo/src-tauri/icons/128x128@2x.png)
│   │   │   ├── [256x256.png](./lingo/src-tauri/icons/256x256.png)
│   │   │   ├── [32x32.png](./lingo/src-tauri/icons/32x32.png)
│   │   │   ├── [64x64.png](./lingo/src-tauri/icons/64x64.png)
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
│   │   │   ├── [create-icons.sh](./lingo/src-tauri/icons/create-icons.sh)
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
├── [README.md](./README.md)
└── [TREE.md](./TREE.md)
```

721 directories, 1838 files
