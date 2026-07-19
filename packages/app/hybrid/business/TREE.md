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
│   │   └── [home.spec.ts](./menu/e2e/home.spec.ts)
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
│   │   │   ├── atoms/
│   │   │   ├── molecules/
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
│   │   │   ├── [base.css](./menu/src/styles/base.css)
│   │   │   ├── [globals.css](./menu/src/styles/globals.css)
│   │   │   └── [themes.css](./menu/src/styles/themes.css)
│   │   └── types/
│   │       └── [menu.ts](./menu/src/types/menu.ts)
│   ├── src-tauri/
│   │   ├── capabilities/
│   │   │   └── [default.json](./menu/src-tauri/capabilities/default.json)
│   │   ├── icons/
│   │   │   ├── [128x128.png](./menu/src-tauri/icons/128x128.png)
│   │   │   ├── [128x128@2x.png](./menu/src-tauri/icons/128x128@2x.png)
│   │   │   ├── [32x32.png](./menu/src-tauri/icons/32x32.png)
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
│   │   └── [home.spec.ts](./pos/e2e/home.spec.ts)
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
│   │   │   ├── [downloads.test.tsx](./pos/src/__tests__/downloads.test.tsx)
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
│   │   ├── data/
│   │   │   ├── __tests__/
│   │   │   │   └── [items.test.ts](./pos/src/data/__tests__/items.test.ts)
│   │   │   └── [items.ts](./pos/src/data/items.ts)
│   │   ├── lib/
│   │   │   ├── __tests__/
│   │   │   │   └── [storage.test.ts](./pos/src/lib/__tests__/storage.test.ts)
│   │   │   └── [storage.ts](./pos/src/lib/storage.ts)
│   │   ├── styles/
│   │   │   ├── [base.css](./pos/src/styles/base.css)
│   │   │   ├── [globals.css](./pos/src/styles/globals.css)
│   │   │   └── [themes.css](./pos/src/styles/themes.css)
│   │   └── types/
│   │       └── [pos.ts](./pos/src/types/pos.ts)
│   ├── src-tauri/
│   │   ├── capabilities/
│   │   │   └── [default.json](./pos/src-tauri/capabilities/default.json)
│   │   ├── icons/
│   │   │   ├── [128x128.png](./pos/src-tauri/icons/128x128.png)
│   │   │   ├── [128x128@2x.png](./pos/src-tauri/icons/128x128@2x.png)
│   │   │   ├── [32x32.png](./pos/src-tauri/icons/32x32.png)
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

86 directories, 296 files
