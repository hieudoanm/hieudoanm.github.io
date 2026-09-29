# TREE

```text
├── menu/
│   ├── docs/
│   │   ├── [ARCHITECTURE.md](./menu/docs/ARCHITECTURE.md)
│   │   ├── [CONTRIBUTING.md](./menu/docs/CONTRIBUTING.md)
│   │   ├── [DOWNLOADS.md](./menu/docs/DOWNLOADS.md)
│   │   ├── [PACKAGING.md](./menu/docs/PACKAGING.md)
│   │   └── [ROADMAP.md](./menu/docs/ROADMAP.md)
│   ├── e2e/
│   │   ├── screenshots/
│   │   │   ├── [about.png](./menu/e2e/screenshots/about.png)
│   │   │   ├── [downloads.png](./menu/e2e/screenshots/downloads.png)
│   │   │   ├── [home.png](./menu/e2e/screenshots/home.png)
│   │   │   └── [version.png](./menu/e2e/screenshots/version.png)
│   │   ├── [about.spec.ts](./menu/e2e/about.spec.ts)
│   │   ├── [downloads.spec.ts](./menu/e2e/downloads.spec.ts)
│   │   ├── [home.spec.ts](./menu/e2e/home.spec.ts)
│   │   └── [version.spec.ts](./menu/e2e/version.spec.ts)
│   ├── public/
│   │   ├── icons/
│   │   │   ├── [icon-128x128.png](./menu/public/icons/icon-128x128.png)
│   │   │   ├── [icon-144x144.png](./menu/public/icons/icon-144x144.png)
│   │   │   ├── [icon-152x152.png](./menu/public/icons/icon-152x152.png)
│   │   │   ├── [icon-16x16.png](./menu/public/icons/icon-16x16.png)
│   │   │   ├── [icon-180x180.png](./menu/public/icons/icon-180x180.png)
│   │   │   ├── [icon-192x192.png](./menu/public/icons/icon-192x192.png)
│   │   │   ├── [icon-256x256.png](./menu/public/icons/icon-256x256.png)
│   │   │   ├── [icon-32x32.png](./menu/public/icons/icon-32x32.png)
│   │   │   ├── [icon-384x384.png](./menu/public/icons/icon-384x384.png)
│   │   │   ├── [icon-48x48.png](./menu/public/icons/icon-48x48.png)
│   │   │   ├── [icon-512x512.png](./menu/public/icons/icon-512x512.png)
│   │   │   ├── [icon-64x64.png](./menu/public/icons/icon-64x64.png)
│   │   │   ├── [icon-72x72.png](./menu/public/icons/icon-72x72.png)
│   │   │   ├── [icon-96x96.png](./menu/public/icons/icon-96x96.png)
│   │   │   └── [icon.svg](./menu/public/icons/icon.svg)
│   │   ├── [apple-touch-icon.png](./menu/public/apple-touch-icon.png)
│   │   ├── [favicon.ico](./menu/public/favicon.ico)
│   │   ├── [manifest.json](./menu/public/manifest.json)
│   │   ├── [robots.txt](./menu/public/robots.txt)
│   │   ├── [sitemap.xml](./menu/public/sitemap.xml)
│   │   └── [sw.js](./menu/public/sw.js)
│   ├── src/
│   │   ├── app/
│   │   │   ├── (app)/
│   │   │   │   └── menu/
│   │   │   │       └── [page.tsx](./menu/src/app/(app)/menu/page.tsx)
│   │   │   ├── (auth)/
│   │   │   │   ├── forget-password/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./menu/src/app/(auth)/forget-password/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./menu/src/app/(auth)/forget-password/page.tsx)
│   │   │   │   ├── profile/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./menu/src/app/(auth)/profile/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./menu/src/app/(auth)/profile/page.tsx)
│   │   │   │   ├── reset-password/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./menu/src/app/(auth)/reset-password/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./menu/src/app/(auth)/reset-password/page.tsx)
│   │   │   │   ├── sign-in/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./menu/src/app/(auth)/sign-in/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./menu/src/app/(auth)/sign-in/page.tsx)
│   │   │   │   └── sign-up/
│   │   │   │       ├── __tests__/
│   │   │   │       │   └── [page.test.tsx](./menu/src/app/(auth)/sign-up/__tests__/page.test.tsx)
│   │   │   │       └── [page.tsx](./menu/src/app/(auth)/sign-up/page.tsx)
│   │   │   ├── (info)/
│   │   │   │   ├── about/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./menu/src/app/(info)/about/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./menu/src/app/(info)/about/page.tsx)
│   │   │   │   ├── downloads/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./menu/src/app/(info)/downloads/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./menu/src/app/(info)/downloads/page.tsx)
│   │   │   │   └── version/
│   │   │   │       ├── __tests__/
│   │   │   │       │   └── [page.test.tsx](./menu/src/app/(info)/version/__tests__/page.test.tsx)
│   │   │   │       └── [page.tsx](./menu/src/app/(info)/version/page.tsx)
│   │   │   ├── __tests__/
│   │   │   │   ├── [default.test.tsx](./menu/src/app/__tests__/default.test.tsx)
│   │   │   │   ├── [error.test.tsx](./menu/src/app/__tests__/error.test.tsx)
│   │   │   │   ├── [forbidden.test.tsx](./menu/src/app/__tests__/forbidden.test.tsx)
│   │   │   │   ├── [global-error.test.tsx](./menu/src/app/__tests__/global-error.test.tsx)
│   │   │   │   ├── [layout.test.tsx](./menu/src/app/__tests__/layout.test.tsx)
│   │   │   │   ├── [loading.test.tsx](./menu/src/app/__tests__/loading.test.tsx)
│   │   │   │   ├── [not-found.test.tsx](./menu/src/app/__tests__/not-found.test.tsx)
│   │   │   │   ├── [page.test.tsx](./menu/src/app/__tests__/page.test.tsx)
│   │   │   │   ├── [robots.test.ts](./menu/src/app/__tests__/robots.test.ts)
│   │   │   │   ├── [template.test.tsx](./menu/src/app/__tests__/template.test.tsx)
│   │   │   │   └── [unauthorized.test.tsx](./menu/src/app/__tests__/unauthorized.test.tsx)
│   │   │   ├── [default.tsx](./menu/src/app/default.tsx)
│   │   │   ├── [error.tsx](./menu/src/app/error.tsx)
│   │   │   ├── [favicon.ico](./menu/src/app/favicon.ico)
│   │   │   ├── [forbidden.tsx](./menu/src/app/forbidden.tsx)
│   │   │   ├── [global-error.tsx](./menu/src/app/global-error.tsx)
│   │   │   ├── [layout.tsx](./menu/src/app/layout.tsx)
│   │   │   ├── [loading.tsx](./menu/src/app/loading.tsx)
│   │   │   ├── [not-found.tsx](./menu/src/app/not-found.tsx)
│   │   │   ├── [page.tsx](./menu/src/app/page.tsx)
│   │   │   ├── [robots.ts](./menu/src/app/robots.ts)
│   │   │   ├── [template.tsx](./menu/src/app/template.tsx)
│   │   │   └── [unauthorized.tsx](./menu/src/app/unauthorized.tsx)
│   │   ├── components/
│   │   │   ├── organisms/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [CustomerMenu.test.tsx](./menu/src/components/organisms/__tests__/CustomerMenu.test.tsx)
│   │   │   │   │   ├── [Header.test.tsx](./menu/src/components/organisms/__tests__/Header.test.tsx)
│   │   │   │   │   ├── [MenuManager.test.tsx](./menu/src/components/organisms/__tests__/MenuManager.test.tsx)
│   │   │   │   │   ├── [QrShare.test.tsx](./menu/src/components/organisms/__tests__/QrShare.test.tsx)
│   │   │   │   │   ├── [RestaurantDashboard.test.tsx](./menu/src/components/organisms/__tests__/RestaurantDashboard.test.tsx)
│   │   │   │   │   └── [RestaurantManager.test.tsx](./menu/src/components/organisms/__tests__/RestaurantManager.test.tsx)
│   │   │   │   ├── [CustomerMenu.tsx](./menu/src/components/organisms/CustomerMenu.tsx)
│   │   │   │   ├── [Header.tsx](./menu/src/components/organisms/Header.tsx)
│   │   │   │   ├── [MenuManager.tsx](./menu/src/components/organisms/MenuManager.tsx)
│   │   │   │   ├── [QrShare.tsx](./menu/src/components/organisms/QrShare.tsx)
│   │   │   │   ├── [RestaurantDashboard.tsx](./menu/src/components/organisms/RestaurantDashboard.tsx)
│   │   │   │   ├── [RestaurantManager.tsx](./menu/src/components/organisms/RestaurantManager.tsx)
│   │   │   │   └── [types.ts](./menu/src/components/organisms/types.ts)
│   │   │   └── templates/
│   │   │       ├── __tests__/
│   │   │       │   ├── [AboutTemplate.test.tsx](./menu/src/components/templates/__tests__/AboutTemplate.test.tsx)
│   │   │       │   ├── [DownloadsTemplate.test.tsx](./menu/src/components/templates/__tests__/DownloadsTemplate.test.tsx)
│   │   │       │   ├── [ErrorTemplate.test.tsx](./menu/src/components/templates/__tests__/ErrorTemplate.test.tsx)
│   │   │       │   └── [VersionTemplate.test.tsx](./menu/src/components/templates/__tests__/VersionTemplate.test.tsx)
│   │   │       ├── [AboutTemplate.tsx](./menu/src/components/templates/AboutTemplate.tsx)
│   │   │       ├── [DownloadsTemplate.tsx](./menu/src/components/templates/DownloadsTemplate.tsx)
│   │   │       ├── [ErrorTemplate.tsx](./menu/src/components/templates/ErrorTemplate.tsx)
│   │   │       └── [VersionTemplate.tsx](./menu/src/components/templates/VersionTemplate.tsx)
│   │   ├── content/
│   │   │   ├── [about.ts](./menu/src/content/about.ts)
│   │   │   ├── [download.ts](./menu/src/content/download.ts)
│   │   │   └── [version.ts](./menu/src/content/version.ts)
│   │   ├── hooks/
│   │   │   ├── __tests__/
│   │   │   │   └── [useMenuStore.test.ts](./menu/src/hooks/__tests__/useMenuStore.test.ts)
│   │   │   └── [useMenuStore.ts](./menu/src/hooks/useMenuStore.ts)
│   │   ├── lib/
│   │   │   ├── __tests__/
│   │   │   │   ├── [menu.test.ts](./menu/src/lib/__tests__/menu.test.ts)
│   │   │   │   ├── [seed.test.ts](./menu/src/lib/__tests__/seed.test.ts)
│   │   │   │   └── [storage.test.ts](./menu/src/lib/__tests__/storage.test.ts)
│   │   │   ├── [ids.ts](./menu/src/lib/ids.ts)
│   │   │   ├── [menu.ts](./menu/src/lib/menu.ts)
│   │   │   ├── [qr.ts](./menu/src/lib/qr.ts)
│   │   │   ├── [seed.ts](./menu/src/lib/seed.ts)
│   │   │   └── [storage.ts](./menu/src/lib/storage.ts)
│   │   ├── styles/
│   │   │   ├── [globals.css](./menu/src/styles/globals.css)
│   │   │   └── [themes.css](./menu/src/styles/themes.css)
│   │   └── types/
│   │       └── [menu.ts](./menu/src/types/menu.ts)
│   ├── src-tauri/
│   │   ├── capabilities/
│   │   │   └── [default.json](./menu/src-tauri/capabilities/default.json)
│   │   ├── icons/
│   │   │   ├── android/
│   │   │   │   ├── mipmap-anydpi-v26/
│   │   │   │   │   └── [ic_launcher.xml](./menu/src-tauri/icons/android/mipmap-anydpi-v26/ic_launcher.xml)
│   │   │   │   ├── mipmap-hdpi/
│   │   │   │   │   ├── [ic_launcher.png](./menu/src-tauri/icons/android/mipmap-hdpi/ic_launcher.png)
│   │   │   │   │   ├── [ic_launcher_foreground.png](./menu/src-tauri/icons/android/mipmap-hdpi/ic_launcher_foreground.png)
│   │   │   │   │   └── [ic_launcher_round.png](./menu/src-tauri/icons/android/mipmap-hdpi/ic_launcher_round.png)
│   │   │   │   ├── mipmap-mdpi/
│   │   │   │   │   ├── [ic_launcher.png](./menu/src-tauri/icons/android/mipmap-mdpi/ic_launcher.png)
│   │   │   │   │   ├── [ic_launcher_foreground.png](./menu/src-tauri/icons/android/mipmap-mdpi/ic_launcher_foreground.png)
│   │   │   │   │   └── [ic_launcher_round.png](./menu/src-tauri/icons/android/mipmap-mdpi/ic_launcher_round.png)
│   │   │   │   ├── mipmap-xhdpi/
│   │   │   │   │   ├── [ic_launcher.png](./menu/src-tauri/icons/android/mipmap-xhdpi/ic_launcher.png)
│   │   │   │   │   ├── [ic_launcher_foreground.png](./menu/src-tauri/icons/android/mipmap-xhdpi/ic_launcher_foreground.png)
│   │   │   │   │   └── [ic_launcher_round.png](./menu/src-tauri/icons/android/mipmap-xhdpi/ic_launcher_round.png)
│   │   │   │   ├── mipmap-xxhdpi/
│   │   │   │   │   ├── [ic_launcher.png](./menu/src-tauri/icons/android/mipmap-xxhdpi/ic_launcher.png)
│   │   │   │   │   ├── [ic_launcher_foreground.png](./menu/src-tauri/icons/android/mipmap-xxhdpi/ic_launcher_foreground.png)
│   │   │   │   │   └── [ic_launcher_round.png](./menu/src-tauri/icons/android/mipmap-xxhdpi/ic_launcher_round.png)
│   │   │   │   ├── mipmap-xxxhdpi/
│   │   │   │   │   ├── [ic_launcher.png](./menu/src-tauri/icons/android/mipmap-xxxhdpi/ic_launcher.png)
│   │   │   │   │   ├── [ic_launcher_foreground.png](./menu/src-tauri/icons/android/mipmap-xxxhdpi/ic_launcher_foreground.png)
│   │   │   │   │   └── [ic_launcher_round.png](./menu/src-tauri/icons/android/mipmap-xxxhdpi/ic_launcher_round.png)
│   │   │   │   └── values/
│   │   │   │       └── [ic_launcher_background.xml](./menu/src-tauri/icons/android/values/ic_launcher_background.xml)
│   │   │   ├── ios/
│   │   │   │   ├── [AppIcon-20x20@1x.png](./menu/src-tauri/icons/ios/AppIcon-20x20@1x.png)
│   │   │   │   ├── [AppIcon-20x20@2x-1.png](./menu/src-tauri/icons/ios/AppIcon-20x20@2x-1.png)
│   │   │   │   ├── [AppIcon-20x20@2x.png](./menu/src-tauri/icons/ios/AppIcon-20x20@2x.png)
│   │   │   │   ├── [AppIcon-20x20@3x.png](./menu/src-tauri/icons/ios/AppIcon-20x20@3x.png)
│   │   │   │   ├── [AppIcon-29x29@1x.png](./menu/src-tauri/icons/ios/AppIcon-29x29@1x.png)
│   │   │   │   ├── [AppIcon-29x29@2x-1.png](./menu/src-tauri/icons/ios/AppIcon-29x29@2x-1.png)
│   │   │   │   ├── [AppIcon-29x29@2x.png](./menu/src-tauri/icons/ios/AppIcon-29x29@2x.png)
│   │   │   │   ├── [AppIcon-29x29@3x.png](./menu/src-tauri/icons/ios/AppIcon-29x29@3x.png)
│   │   │   │   ├── [AppIcon-40x40@1x.png](./menu/src-tauri/icons/ios/AppIcon-40x40@1x.png)
│   │   │   │   ├── [AppIcon-40x40@2x-1.png](./menu/src-tauri/icons/ios/AppIcon-40x40@2x-1.png)
│   │   │   │   ├── [AppIcon-40x40@2x.png](./menu/src-tauri/icons/ios/AppIcon-40x40@2x.png)
│   │   │   │   ├── [AppIcon-40x40@3x.png](./menu/src-tauri/icons/ios/AppIcon-40x40@3x.png)
│   │   │   │   ├── [AppIcon-512@2x.png](./menu/src-tauri/icons/ios/AppIcon-512@2x.png)
│   │   │   │   ├── [AppIcon-60x60@2x.png](./menu/src-tauri/icons/ios/AppIcon-60x60@2x.png)
│   │   │   │   ├── [AppIcon-60x60@3x.png](./menu/src-tauri/icons/ios/AppIcon-60x60@3x.png)
│   │   │   │   ├── [AppIcon-76x76@1x.png](./menu/src-tauri/icons/ios/AppIcon-76x76@1x.png)
│   │   │   │   ├── [AppIcon-76x76@2x.png](./menu/src-tauri/icons/ios/AppIcon-76x76@2x.png)
│   │   │   │   └── [AppIcon-83.5x83.5@2x.png](./menu/src-tauri/icons/ios/AppIcon-83.5x83.5@2x.png)
│   │   │   ├── [128x128.png](./menu/src-tauri/icons/128x128.png)
│   │   │   ├── [128x128@2x.png](./menu/src-tauri/icons/128x128@2x.png)
│   │   │   ├── [256x256.png](./menu/src-tauri/icons/256x256.png)
│   │   │   ├── [32x32.png](./menu/src-tauri/icons/32x32.png)
│   │   │   ├── [64x64.png](./menu/src-tauri/icons/64x64.png)
│   │   │   ├── [Square107x107Logo.png](./menu/src-tauri/icons/Square107x107Logo.png)
│   │   │   ├── [Square142x142Logo.png](./menu/src-tauri/icons/Square142x142Logo.png)
│   │   │   ├── [Square150x150Logo.png](./menu/src-tauri/icons/Square150x150Logo.png)
│   │   │   ├── [Square284x284Logo.png](./menu/src-tauri/icons/Square284x284Logo.png)
│   │   │   ├── [Square30x30Logo.png](./menu/src-tauri/icons/Square30x30Logo.png)
│   │   │   ├── [Square310x310Logo.png](./menu/src-tauri/icons/Square310x310Logo.png)
│   │   │   ├── [Square44x44Logo.png](./menu/src-tauri/icons/Square44x44Logo.png)
│   │   │   ├── [Square71x71Logo.png](./menu/src-tauri/icons/Square71x71Logo.png)
│   │   │   ├── [Square89x89Logo.png](./menu/src-tauri/icons/Square89x89Logo.png)
│   │   │   ├── [StoreLogo.png](./menu/src-tauri/icons/StoreLogo.png)
│   │   │   ├── [create-icons.sh](./menu/src-tauri/icons/create-icons.sh)
│   │   │   ├── [icon.icns](./menu/src-tauri/icons/icon.icns)
│   │   │   ├── [icon.ico](./menu/src-tauri/icons/icon.ico)
│   │   │   └── [icon.png](./menu/src-tauri/icons/icon.png)
│   │   ├── src/
│   │   │   ├── [lib.rs](./menu/src-tauri/src/lib.rs)
│   │   │   └── [main.rs](./menu/src-tauri/src/main.rs)
│   │   ├── [Cargo.lock](./menu/src-tauri/Cargo.lock)
│   │   ├── [Cargo.toml](./menu/src-tauri/Cargo.toml)
│   │   ├── [build.rs](./menu/src-tauri/build.rs)
│   │   └── [tauri.conf.json](./menu/src-tauri/tauri.conf.json)
│   ├── [AGENTS.md](./menu/AGENTS.md)
│   ├── [Dockerfile](./menu/Dockerfile)
│   ├── [LICENSE](./menu/LICENSE)
│   ├── [README.md](./menu/README.md)
│   ├── [TREE.md](./menu/TREE.md)
│   ├── [docker-compose.yaml](./menu/docker-compose.yaml)
│   ├── [eslint.config.mts](./menu/eslint.config.mts)
│   ├── [jest.config.ts](./menu/jest.config.ts)
│   ├── [jest.setup.ts](./menu/jest.setup.ts)
│   ├── [next.config.ts](./menu/next.config.ts)
│   ├── [package.json](./menu/package.json)
│   ├── [playwright.config.ts](./menu/playwright.config.ts)
│   ├── [postcss.config.mjs](./menu/postcss.config.mjs)
│   └── [tsconfig.json](./menu/tsconfig.json)
├── pos/
│   ├── docs/
│   │   ├── [ARCHITECTURE.md](./pos/docs/ARCHITECTURE.md)
│   │   ├── [CONTRIBUTING.md](./pos/docs/CONTRIBUTING.md)
│   │   ├── [DOWNLOADS.md](./pos/docs/DOWNLOADS.md)
│   │   ├── [PACKAGING.md](./pos/docs/PACKAGING.md)
│   │   └── [ROADMAP.md](./pos/docs/ROADMAP.md)
│   ├── e2e/
│   │   ├── screenshots/
│   │   │   ├── [about.png](./pos/e2e/screenshots/about.png)
│   │   │   ├── [downloads.png](./pos/e2e/screenshots/downloads.png)
│   │   │   ├── [home.png](./pos/e2e/screenshots/home.png)
│   │   │   └── [version.png](./pos/e2e/screenshots/version.png)
│   │   ├── [about.spec.ts](./pos/e2e/about.spec.ts)
│   │   ├── [downloads.spec.ts](./pos/e2e/downloads.spec.ts)
│   │   ├── [home.spec.ts](./pos/e2e/home.spec.ts)
│   │   └── [version.spec.ts](./pos/e2e/version.spec.ts)
│   ├── public/
│   │   ├── icons/
│   │   │   ├── [icon-128x128.png](./pos/public/icons/icon-128x128.png)
│   │   │   ├── [icon-144x144.png](./pos/public/icons/icon-144x144.png)
│   │   │   ├── [icon-152x152.png](./pos/public/icons/icon-152x152.png)
│   │   │   ├── [icon-16x16.png](./pos/public/icons/icon-16x16.png)
│   │   │   ├── [icon-180x180.png](./pos/public/icons/icon-180x180.png)
│   │   │   ├── [icon-192x192.png](./pos/public/icons/icon-192x192.png)
│   │   │   ├── [icon-256x256.png](./pos/public/icons/icon-256x256.png)
│   │   │   ├── [icon-32x32.png](./pos/public/icons/icon-32x32.png)
│   │   │   ├── [icon-384x384.png](./pos/public/icons/icon-384x384.png)
│   │   │   ├── [icon-48x48.png](./pos/public/icons/icon-48x48.png)
│   │   │   ├── [icon-512x512.png](./pos/public/icons/icon-512x512.png)
│   │   │   ├── [icon-64x64.png](./pos/public/icons/icon-64x64.png)
│   │   │   ├── [icon-72x72.png](./pos/public/icons/icon-72x72.png)
│   │   │   ├── [icon-96x96.png](./pos/public/icons/icon-96x96.png)
│   │   │   └── [icon.svg](./pos/public/icons/icon.svg)
│   │   ├── [apple-touch-icon.png](./pos/public/apple-touch-icon.png)
│   │   ├── [favicon.ico](./pos/public/favicon.ico)
│   │   ├── [manifest.json](./pos/public/manifest.json)
│   │   ├── [robots.txt](./pos/public/robots.txt)
│   │   ├── [sitemap.xml](./pos/public/sitemap.xml)
│   │   └── [sw.js](./pos/public/sw.js)
│   ├── src/
│   │   ├── __tests__/
│   │   │   ├── [about.test.tsx](./pos/src/__tests__/about.test.tsx)
│   │   │   ├── [error.test.tsx](./pos/src/__tests__/error.test.tsx)
│   │   │   ├── [global-error.test.tsx](./pos/src/__tests__/global-error.test.tsx)
│   │   │   ├── [layout.test.tsx](./pos/src/__tests__/layout.test.tsx)
│   │   │   ├── [not-found.test.tsx](./pos/src/__tests__/not-found.test.tsx)
│   │   │   └── [version.test.tsx](./pos/src/__tests__/version.test.tsx)
│   │   ├── app/
│   │   │   ├── (app)/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [page.test.tsx](./pos/src/app/(app)/__tests__/page.test.tsx)
│   │   │   │   └── [page.tsx](./pos/src/app/(app)/page.tsx)
│   │   │   ├── (auth)/
│   │   │   │   ├── forget-password/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./pos/src/app/(auth)/forget-password/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./pos/src/app/(auth)/forget-password/page.tsx)
│   │   │   │   ├── profile/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./pos/src/app/(auth)/profile/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./pos/src/app/(auth)/profile/page.tsx)
│   │   │   │   ├── reset-password/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./pos/src/app/(auth)/reset-password/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./pos/src/app/(auth)/reset-password/page.tsx)
│   │   │   │   ├── sign-in/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./pos/src/app/(auth)/sign-in/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./pos/src/app/(auth)/sign-in/page.tsx)
│   │   │   │   └── sign-up/
│   │   │   │       ├── __tests__/
│   │   │   │       │   └── [page.test.tsx](./pos/src/app/(auth)/sign-up/__tests__/page.test.tsx)
│   │   │   │       └── [page.tsx](./pos/src/app/(auth)/sign-up/page.tsx)
│   │   │   ├── (info)/
│   │   │   │   ├── about/
│   │   │   │   │   └── [page.tsx](./pos/src/app/(info)/about/page.tsx)
│   │   │   │   ├── downloads/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./pos/src/app/(info)/downloads/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./pos/src/app/(info)/downloads/page.tsx)
│   │   │   │   └── version/
│   │   │   │       └── [page.tsx](./pos/src/app/(info)/version/page.tsx)
│   │   │   ├── __tests__/
│   │   │   │   ├── [default.test.tsx](./pos/src/app/__tests__/default.test.tsx)
│   │   │   │   ├── [error.test.tsx](./pos/src/app/__tests__/error.test.tsx)
│   │   │   │   ├── [forbidden.test.tsx](./pos/src/app/__tests__/forbidden.test.tsx)
│   │   │   │   ├── [global-error.test.tsx](./pos/src/app/__tests__/global-error.test.tsx)
│   │   │   │   ├── [layout.test.tsx](./pos/src/app/__tests__/layout.test.tsx)
│   │   │   │   ├── [loading.test.tsx](./pos/src/app/__tests__/loading.test.tsx)
│   │   │   │   ├── [not-found.test.tsx](./pos/src/app/__tests__/not-found.test.tsx)
│   │   │   │   ├── [robots.test.ts](./pos/src/app/__tests__/robots.test.ts)
│   │   │   │   ├── [template.test.tsx](./pos/src/app/__tests__/template.test.tsx)
│   │   │   │   └── [unauthorized.test.tsx](./pos/src/app/__tests__/unauthorized.test.tsx)
│   │   │   ├── [default.tsx](./pos/src/app/default.tsx)
│   │   │   ├── [error.tsx](./pos/src/app/error.tsx)
│   │   │   ├── [favicon.ico](./pos/src/app/favicon.ico)
│   │   │   ├── [forbidden.tsx](./pos/src/app/forbidden.tsx)
│   │   │   ├── [global-error.tsx](./pos/src/app/global-error.tsx)
│   │   │   ├── [layout.tsx](./pos/src/app/layout.tsx)
│   │   │   ├── [loading.tsx](./pos/src/app/loading.tsx)
│   │   │   ├── [not-found.tsx](./pos/src/app/not-found.tsx)
│   │   │   ├── [robots.ts](./pos/src/app/robots.ts)
│   │   │   ├── [template.tsx](./pos/src/app/template.tsx)
│   │   │   └── [unauthorized.tsx](./pos/src/app/unauthorized.tsx)
│   │   ├── components/
│   │   │   ├── organisms/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [Cart.test.tsx](./pos/src/components/organisms/__tests__/Cart.test.tsx)
│   │   │   │   │   ├── [Checkout.test.tsx](./pos/src/components/organisms/__tests__/Checkout.test.tsx)
│   │   │   │   │   ├── [DailySummary.test.tsx](./pos/src/components/organisms/__tests__/DailySummary.test.tsx)
│   │   │   │   │   ├── [DigitalReceipt.test.tsx](./pos/src/components/organisms/__tests__/DigitalReceipt.test.tsx)
│   │   │   │   │   ├── [DiscountManager.test.tsx](./pos/src/components/organisms/__tests__/DiscountManager.test.tsx)
│   │   │   │   │   ├── [GiftCardManager.test.tsx](./pos/src/components/organisms/__tests__/GiftCardManager.test.tsx)
│   │   │   │   │   ├── [Header.test.tsx](./pos/src/components/organisms/__tests__/Header.test.tsx)
│   │   │   │   │   ├── [InventoryManager.test.tsx](./pos/src/components/organisms/__tests__/InventoryManager.test.tsx)
│   │   │   │   │   ├── [ItemCatalog.test.tsx](./pos/src/components/organisms/__tests__/ItemCatalog.test.tsx)
│   │   │   │   │   ├── [PaymentPanel.test.tsx](./pos/src/components/organisms/__tests__/PaymentPanel.test.tsx)
│   │   │   │   │   ├── [Receipt.test.tsx](./pos/src/components/organisms/__tests__/Receipt.test.tsx)
│   │   │   │   │   ├── [ReportingDashboard.test.tsx](./pos/src/components/organisms/__tests__/ReportingDashboard.test.tsx)
│   │   │   │   │   ├── [ShiftManager.test.tsx](./pos/src/components/organisms/__tests__/ShiftManager.test.tsx)
│   │   │   │   │   ├── [TaxConfigPanel.test.tsx](./pos/src/components/organisms/__tests__/TaxConfigPanel.test.tsx)
│   │   │   │   │   ├── [TransactionHistory.test.tsx](./pos/src/components/organisms/__tests__/TransactionHistory.test.tsx)
│   │   │   │   │   └── [UserManager.test.tsx](./pos/src/components/organisms/__tests__/UserManager.test.tsx)
│   │   │   │   ├── [Cart.tsx](./pos/src/components/organisms/Cart.tsx)
│   │   │   │   ├── [Checkout.tsx](./pos/src/components/organisms/Checkout.tsx)
│   │   │   │   ├── [DailySummary.tsx](./pos/src/components/organisms/DailySummary.tsx)
│   │   │   │   ├── [DigitalReceipt.tsx](./pos/src/components/organisms/DigitalReceipt.tsx)
│   │   │   │   ├── [DiscountManager.tsx](./pos/src/components/organisms/DiscountManager.tsx)
│   │   │   │   ├── [GiftCardManager.tsx](./pos/src/components/organisms/GiftCardManager.tsx)
│   │   │   │   ├── [Header.tsx](./pos/src/components/organisms/Header.tsx)
│   │   │   │   ├── [InventoryManager.tsx](./pos/src/components/organisms/InventoryManager.tsx)
│   │   │   │   ├── [ItemCatalog.tsx](./pos/src/components/organisms/ItemCatalog.tsx)
│   │   │   │   ├── [PaymentPanel.tsx](./pos/src/components/organisms/PaymentPanel.tsx)
│   │   │   │   ├── [Receipt.tsx](./pos/src/components/organisms/Receipt.tsx)
│   │   │   │   ├── [ReportingDashboard.tsx](./pos/src/components/organisms/ReportingDashboard.tsx)
│   │   │   │   ├── [ShiftManager.tsx](./pos/src/components/organisms/ShiftManager.tsx)
│   │   │   │   ├── [TaxConfigPanel.tsx](./pos/src/components/organisms/TaxConfigPanel.tsx)
│   │   │   │   ├── [TransactionHistory.tsx](./pos/src/components/organisms/TransactionHistory.tsx)
│   │   │   │   └── [UserManager.tsx](./pos/src/components/organisms/UserManager.tsx)
│   │   │   └── templates/
│   │   │       ├── __tests__/
│   │   │       │   ├── [AboutTemplate.test.tsx](./pos/src/components/templates/__tests__/AboutTemplate.test.tsx)
│   │   │       │   ├── [DownloadsTemplate.test.tsx](./pos/src/components/templates/__tests__/DownloadsTemplate.test.tsx)
│   │   │       │   ├── [ErrorTemplate.test.tsx](./pos/src/components/templates/__tests__/ErrorTemplate.test.tsx)
│   │   │       │   └── [VersionTemplate.test.tsx](./pos/src/components/templates/__tests__/VersionTemplate.test.tsx)
│   │   │       ├── [AboutTemplate.tsx](./pos/src/components/templates/AboutTemplate.tsx)
│   │   │       ├── [DownloadsTemplate.tsx](./pos/src/components/templates/DownloadsTemplate.tsx)
│   │   │       ├── [ErrorTemplate.tsx](./pos/src/components/templates/ErrorTemplate.tsx)
│   │   │       └── [VersionTemplate.tsx](./pos/src/components/templates/VersionTemplate.tsx)
│   │   ├── content/
│   │   │   ├── [about.ts](./pos/src/content/about.ts)
│   │   │   ├── [download.ts](./pos/src/content/download.ts)
│   │   │   └── [version.ts](./pos/src/content/version.ts)
│   │   ├── data/
│   │   │   ├── __tests__/
│   │   │   │   └── [items.test.ts](./pos/src/data/__tests__/items.test.ts)
│   │   │   └── [items.ts](./pos/src/data/items.ts)
│   │   ├── lib/
│   │   │   ├── __tests__/
│   │   │   │   └── [storage.test.ts](./pos/src/lib/__tests__/storage.test.ts)
│   │   │   └── [storage.ts](./pos/src/lib/storage.ts)
│   │   ├── styles/
│   │   │   ├── [globals.css](./pos/src/styles/globals.css)
│   │   │   └── [themes.css](./pos/src/styles/themes.css)
│   │   └── types/
│   │       └── [pos.ts](./pos/src/types/pos.ts)
│   ├── src-tauri/
│   │   ├── capabilities/
│   │   │   └── [default.json](./pos/src-tauri/capabilities/default.json)
│   │   ├── icons/
│   │   │   ├── android/
│   │   │   │   ├── mipmap-anydpi-v26/
│   │   │   │   │   └── [ic_launcher.xml](./pos/src-tauri/icons/android/mipmap-anydpi-v26/ic_launcher.xml)
│   │   │   │   ├── mipmap-hdpi/
│   │   │   │   │   ├── [ic_launcher.png](./pos/src-tauri/icons/android/mipmap-hdpi/ic_launcher.png)
│   │   │   │   │   ├── [ic_launcher_foreground.png](./pos/src-tauri/icons/android/mipmap-hdpi/ic_launcher_foreground.png)
│   │   │   │   │   └── [ic_launcher_round.png](./pos/src-tauri/icons/android/mipmap-hdpi/ic_launcher_round.png)
│   │   │   │   ├── mipmap-mdpi/
│   │   │   │   │   ├── [ic_launcher.png](./pos/src-tauri/icons/android/mipmap-mdpi/ic_launcher.png)
│   │   │   │   │   ├── [ic_launcher_foreground.png](./pos/src-tauri/icons/android/mipmap-mdpi/ic_launcher_foreground.png)
│   │   │   │   │   └── [ic_launcher_round.png](./pos/src-tauri/icons/android/mipmap-mdpi/ic_launcher_round.png)
│   │   │   │   ├── mipmap-xhdpi/
│   │   │   │   │   ├── [ic_launcher.png](./pos/src-tauri/icons/android/mipmap-xhdpi/ic_launcher.png)
│   │   │   │   │   ├── [ic_launcher_foreground.png](./pos/src-tauri/icons/android/mipmap-xhdpi/ic_launcher_foreground.png)
│   │   │   │   │   └── [ic_launcher_round.png](./pos/src-tauri/icons/android/mipmap-xhdpi/ic_launcher_round.png)
│   │   │   │   ├── mipmap-xxhdpi/
│   │   │   │   │   ├── [ic_launcher.png](./pos/src-tauri/icons/android/mipmap-xxhdpi/ic_launcher.png)
│   │   │   │   │   ├── [ic_launcher_foreground.png](./pos/src-tauri/icons/android/mipmap-xxhdpi/ic_launcher_foreground.png)
│   │   │   │   │   └── [ic_launcher_round.png](./pos/src-tauri/icons/android/mipmap-xxhdpi/ic_launcher_round.png)
│   │   │   │   ├── mipmap-xxxhdpi/
│   │   │   │   │   ├── [ic_launcher.png](./pos/src-tauri/icons/android/mipmap-xxxhdpi/ic_launcher.png)
│   │   │   │   │   ├── [ic_launcher_foreground.png](./pos/src-tauri/icons/android/mipmap-xxxhdpi/ic_launcher_foreground.png)
│   │   │   │   │   └── [ic_launcher_round.png](./pos/src-tauri/icons/android/mipmap-xxxhdpi/ic_launcher_round.png)
│   │   │   │   └── values/
│   │   │   │       └── [ic_launcher_background.xml](./pos/src-tauri/icons/android/values/ic_launcher_background.xml)
│   │   │   ├── ios/
│   │   │   │   ├── [AppIcon-20x20@1x.png](./pos/src-tauri/icons/ios/AppIcon-20x20@1x.png)
│   │   │   │   ├── [AppIcon-20x20@2x-1.png](./pos/src-tauri/icons/ios/AppIcon-20x20@2x-1.png)
│   │   │   │   ├── [AppIcon-20x20@2x.png](./pos/src-tauri/icons/ios/AppIcon-20x20@2x.png)
│   │   │   │   ├── [AppIcon-20x20@3x.png](./pos/src-tauri/icons/ios/AppIcon-20x20@3x.png)
│   │   │   │   ├── [AppIcon-29x29@1x.png](./pos/src-tauri/icons/ios/AppIcon-29x29@1x.png)
│   │   │   │   ├── [AppIcon-29x29@2x-1.png](./pos/src-tauri/icons/ios/AppIcon-29x29@2x-1.png)
│   │   │   │   ├── [AppIcon-29x29@2x.png](./pos/src-tauri/icons/ios/AppIcon-29x29@2x.png)
│   │   │   │   ├── [AppIcon-29x29@3x.png](./pos/src-tauri/icons/ios/AppIcon-29x29@3x.png)
│   │   │   │   ├── [AppIcon-40x40@1x.png](./pos/src-tauri/icons/ios/AppIcon-40x40@1x.png)
│   │   │   │   ├── [AppIcon-40x40@2x-1.png](./pos/src-tauri/icons/ios/AppIcon-40x40@2x-1.png)
│   │   │   │   ├── [AppIcon-40x40@2x.png](./pos/src-tauri/icons/ios/AppIcon-40x40@2x.png)
│   │   │   │   ├── [AppIcon-40x40@3x.png](./pos/src-tauri/icons/ios/AppIcon-40x40@3x.png)
│   │   │   │   ├── [AppIcon-512@2x.png](./pos/src-tauri/icons/ios/AppIcon-512@2x.png)
│   │   │   │   ├── [AppIcon-60x60@2x.png](./pos/src-tauri/icons/ios/AppIcon-60x60@2x.png)
│   │   │   │   ├── [AppIcon-60x60@3x.png](./pos/src-tauri/icons/ios/AppIcon-60x60@3x.png)
│   │   │   │   ├── [AppIcon-76x76@1x.png](./pos/src-tauri/icons/ios/AppIcon-76x76@1x.png)
│   │   │   │   ├── [AppIcon-76x76@2x.png](./pos/src-tauri/icons/ios/AppIcon-76x76@2x.png)
│   │   │   │   └── [AppIcon-83.5x83.5@2x.png](./pos/src-tauri/icons/ios/AppIcon-83.5x83.5@2x.png)
│   │   │   ├── [128x128.png](./pos/src-tauri/icons/128x128.png)
│   │   │   ├── [128x128@2x.png](./pos/src-tauri/icons/128x128@2x.png)
│   │   │   ├── [256x256.png](./pos/src-tauri/icons/256x256.png)
│   │   │   ├── [32x32.png](./pos/src-tauri/icons/32x32.png)
│   │   │   ├── [64x64.png](./pos/src-tauri/icons/64x64.png)
│   │   │   ├── [Square107x107Logo.png](./pos/src-tauri/icons/Square107x107Logo.png)
│   │   │   ├── [Square142x142Logo.png](./pos/src-tauri/icons/Square142x142Logo.png)
│   │   │   ├── [Square150x150Logo.png](./pos/src-tauri/icons/Square150x150Logo.png)
│   │   │   ├── [Square284x284Logo.png](./pos/src-tauri/icons/Square284x284Logo.png)
│   │   │   ├── [Square30x30Logo.png](./pos/src-tauri/icons/Square30x30Logo.png)
│   │   │   ├── [Square310x310Logo.png](./pos/src-tauri/icons/Square310x310Logo.png)
│   │   │   ├── [Square44x44Logo.png](./pos/src-tauri/icons/Square44x44Logo.png)
│   │   │   ├── [Square71x71Logo.png](./pos/src-tauri/icons/Square71x71Logo.png)
│   │   │   ├── [Square89x89Logo.png](./pos/src-tauri/icons/Square89x89Logo.png)
│   │   │   ├── [StoreLogo.png](./pos/src-tauri/icons/StoreLogo.png)
│   │   │   ├── [create-icons.sh](./pos/src-tauri/icons/create-icons.sh)
│   │   │   ├── [icon.icns](./pos/src-tauri/icons/icon.icns)
│   │   │   ├── [icon.ico](./pos/src-tauri/icons/icon.ico)
│   │   │   └── [icon.png](./pos/src-tauri/icons/icon.png)
│   │   ├── src/
│   │   │   ├── [lib.rs](./pos/src-tauri/src/lib.rs)
│   │   │   └── [main.rs](./pos/src-tauri/src/main.rs)
│   │   ├── [Cargo.lock](./pos/src-tauri/Cargo.lock)
│   │   ├── [Cargo.toml](./pos/src-tauri/Cargo.toml)
│   │   ├── [build.rs](./pos/src-tauri/build.rs)
│   │   └── [tauri.conf.json](./pos/src-tauri/tauri.conf.json)
│   ├── [AGENTS.md](./pos/AGENTS.md)
│   ├── [Dockerfile](./pos/Dockerfile)
│   ├── [LICENSE](./pos/LICENSE)
│   ├── [README.md](./pos/README.md)
│   ├── [TREE.md](./pos/TREE.md)
│   ├── [docker-compose.yaml](./pos/docker-compose.yaml)
│   ├── [eslint.config.mts](./pos/eslint.config.mts)
│   ├── [jest.config.ts](./pos/jest.config.ts)
│   ├── [jest.setup.ts](./pos/jest.setup.ts)
│   ├── [next.config.ts](./pos/next.config.ts)
│   ├── [package.json](./pos/package.json)
│   ├── [playwright.config.ts](./pos/playwright.config.ts)
│   ├── [postcss.config.mjs](./pos/postcss.config.mjs)
│   └── [tsconfig.json](./pos/tsconfig.json)
├── [README.md](./README.md)
└── [TREE.md](./TREE.md)
```

107 directories, 390 files
