# TREE

```text
├── docs/
│   ├── [ARCHITECTURE.md](./docs/ARCHITECTURE.md)
│   ├── [CONTRIBUTING.md](./docs/CONTRIBUTING.md)
│   ├── [DOWNLOADS.md](./docs/DOWNLOADS.md)
│   ├── [PACKAGING.md](./docs/PACKAGING.md)
│   └── [ROADMAP.md](./docs/ROADMAP.md)
├── e2e/
│   ├── [about.spec.ts](./e2e/about.spec.ts)
│   ├── [filter-search.spec.ts](./e2e/filter-search.spec.ts)
│   ├── [generator.spec.ts](./e2e/generator.spec.ts)
│   ├── [health.spec.ts](./e2e/health.spec.ts)
│   ├── [home.spec.ts](./e2e/home.spec.ts)
│   ├── [navigation.spec.ts](./e2e/navigation.spec.ts)
│   ├── [new-item.spec.ts](./e2e/new-item.spec.ts)
│   ├── [profile.spec.ts](./e2e/profile.spec.ts)
│   ├── [settings.spec.ts](./e2e/settings.spec.ts)
│   └── [version.spec.ts](./e2e/version.spec.ts)
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
│   │   │   ├── generator/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [generator-page.test.tsx](./src/app/(app)/generator/__tests__/generator-page.test.tsx)
│   │   │   │   └── [page.tsx](./src/app/(app)/generator/page.tsx)
│   │   │   ├── health/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [health-page.test.tsx](./src/app/(app)/health/__tests__/health-page.test.tsx)
│   │   │   │   └── [page.tsx](./src/app/(app)/health/page.tsx)
│   │   │   ├── item/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [item-page.test.tsx](./src/app/(app)/item/__tests__/item-page.test.tsx)
│   │   │   │   └── [page.tsx](./src/app/(app)/item/page.tsx)
│   │   │   ├── settings/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [settings-page.test.tsx](./src/app/(app)/settings/__tests__/settings-page.test.tsx)
│   │   │   │   └── [page.tsx](./src/app/(app)/settings/page.tsx)
│   │   │   └── trash/
│   │   │       ├── __tests__/
│   │   │       │   └── [trash-page.test.tsx](./src/app/(app)/trash/__tests__/trash-page.test.tsx)
│   │   │       └── [page.tsx](./src/app/(app)/trash/page.tsx)
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
│   │   ├── [template.tsx](./src/app/template.tsx)
│   │   └── [unauthorized.tsx](./src/app/unauthorized.tsx)
│   ├── components/
│   │   ├── __tests__/
│   │   │   └── [SWProvider.test.tsx](./src/components/__tests__/SWProvider.test.tsx)
│   │   ├── molecules/
│   │   │   ├── __tests__/
│   │   │   │   ├── [AccessLogCard.test.tsx](./src/components/molecules/__tests__/AccessLogCard.test.tsx)
│   │   │   │   └── [ShareItemModal.test.tsx](./src/components/molecules/__tests__/ShareItemModal.test.tsx)
│   │   │   ├── [AccessLogCard.tsx](./src/components/molecules/AccessLogCard.tsx)
│   │   │   ├── [ConfirmDialog.tsx](./src/components/molecules/ConfirmDialog.tsx)
│   │   │   ├── [HealthWidgets.tsx](./src/components/molecules/HealthWidgets.tsx)
│   │   │   ├── [ShareItemModal.tsx](./src/components/molecules/ShareItemModal.tsx)
│   │   │   └── [VaultItemForm.tsx](./src/components/molecules/VaultItemForm.tsx)
│   │   ├── organisms/
│   │   │   ├── __tests__/
│   │   │   │   ├── [EmergencyAccessCard.test.tsx](./src/components/organisms/__tests__/EmergencyAccessCard.test.tsx)
│   │   │   │   ├── [FolderManager.test.tsx](./src/components/organisms/__tests__/FolderManager.test.tsx)
│   │   │   │   ├── [LockScreen.test.tsx](./src/components/organisms/__tests__/LockScreen.test.tsx)
│   │   │   │   ├── [RecentlyUsed.test.tsx](./src/components/organisms/__tests__/RecentlyUsed.test.tsx)
│   │   │   │   ├── [ToastContainer.test.tsx](./src/components/organisms/__tests__/ToastContainer.test.tsx)
│   │   │   │   ├── [TotpDisplay.test.tsx](./src/components/organisms/__tests__/TotpDisplay.test.tsx)
│   │   │   │   └── [TransferCard.test.tsx](./src/components/organisms/__tests__/TransferCard.test.tsx)
│   │   │   ├── [EmergencyAccessCard.tsx](./src/components/organisms/EmergencyAccessCard.tsx)
│   │   │   ├── [FolderManager.tsx](./src/components/organisms/FolderManager.tsx)
│   │   │   ├── [LockScreen.tsx](./src/components/organisms/LockScreen.tsx)
│   │   │   ├── [MasterPasswordCard.tsx](./src/components/organisms/MasterPasswordCard.tsx)
│   │   │   ├── [RecentlyUsed.tsx](./src/components/organisms/RecentlyUsed.tsx)
│   │   │   ├── [SecuritySettingsCard.tsx](./src/components/organisms/SecuritySettingsCard.tsx)
│   │   │   ├── [ToastContainer.tsx](./src/components/organisms/ToastContainer.tsx)
│   │   │   ├── [TotpDisplay.tsx](./src/components/organisms/TotpDisplay.tsx)
│   │   │   ├── [TransferCard.tsx](./src/components/organisms/TransferCard.tsx)
│   │   │   ├── [VaultItemCard.tsx](./src/components/organisms/VaultItemCard.tsx)
│   │   │   └── [VaultToolbar.tsx](./src/components/organisms/VaultToolbar.tsx)
│   │   ├── templates/
│   │   │   ├── __tests__/
│   │   │   │   ├── [AboutTemplate.test.tsx](./src/components/templates/__tests__/AboutTemplate.test.tsx)
│   │   │   │   ├── [DownloadsTemplate.test.tsx](./src/components/templates/__tests__/DownloadsTemplate.test.tsx)
│   │   │   │   ├── [ErrorTemplate.test.tsx](./src/components/templates/__tests__/ErrorTemplate.test.tsx)
│   │   │   │   └── [VersionTemplate.test.tsx](./src/components/templates/__tests__/VersionTemplate.test.tsx)
│   │   │   ├── [AboutTemplate.tsx](./src/components/templates/AboutTemplate.tsx)
│   │   │   ├── [DownloadsTemplate.tsx](./src/components/templates/DownloadsTemplate.tsx)
│   │   │   ├── [ErrorTemplate.tsx](./src/components/templates/ErrorTemplate.tsx)
│   │   │   └── [VersionTemplate.tsx](./src/components/templates/VersionTemplate.tsx)
│   │   └── [SWProvider.tsx](./src/components/SWProvider.tsx)
│   ├── data/
│   │   ├── __tests__/
│   │   │   ├── [models.test.ts](./src/data/__tests__/models.test.ts)
│   │   │   └── [seed.test.ts](./src/data/__tests__/seed.test.ts)
│   │   ├── [models.ts](./src/data/models.ts)
│   │   └── [seed.ts](./src/data/seed.ts)
│   ├── hooks/
│   │   ├── __tests__/
│   │   │   └── [useSWRegister.test.tsx](./src/hooks/__tests__/useSWRegister.test.tsx)
│   │   └── [useSWRegister.ts](./src/hooks/useSWRegister.ts)
│   ├── lib/
│   │   ├── __tests__/
│   │   │   ├── [db.test.ts](./src/lib/__tests__/db.test.ts)
│   │   │   ├── [health.test.ts](./src/lib/__tests__/health.test.ts)
│   │   │   ├── [security.test.ts](./src/lib/__tests__/security.test.ts)
│   │   │   ├── [totp.test.ts](./src/lib/__tests__/totp.test.ts)
│   │   │   └── [transfer.test.ts](./src/lib/__tests__/transfer.test.ts)
│   │   ├── [db.ts](./src/lib/db.ts)
│   │   ├── [health.ts](./src/lib/health.ts)
│   │   ├── [security.ts](./src/lib/security.ts)
│   │   ├── [totp.ts](./src/lib/totp.ts)
│   │   └── [transfer.ts](./src/lib/transfer.ts)
│   ├── providers/
│   │   ├── __tests__/
│   │   │   ├── [DataProvider.test.tsx](./src/providers/__tests__/DataProvider.test.tsx)
│   │   │   ├── [SecurityProvider.test.tsx](./src/providers/__tests__/SecurityProvider.test.tsx)
│   │   │   └── [ToastProvider.test.tsx](./src/providers/__tests__/ToastProvider.test.tsx)
│   │   ├── [DataProvider.tsx](./src/providers/DataProvider.tsx)
│   │   ├── [Providers.tsx](./src/providers/Providers.tsx)
│   │   ├── [SecurityProvider.tsx](./src/providers/SecurityProvider.tsx)
│   │   └── [ToastProvider.tsx](./src/providers/ToastProvider.tsx)
│   ├── styles/
│   │   ├── [base.css](./src/styles/base.css)
│   │   ├── [globals.css](./src/styles/globals.css)
│   │   └── [themes.css](./src/styles/themes.css)
│   ├── test-utils/
│   │   └── [fakeDb.ts](./src/test-utils/fakeDb.ts)
│   ├── types/
│   │   └── [index.ts](./src/types/index.ts)
│   └── utils/
│       ├── __tests__/
│       │   └── [format.test.ts](./src/utils/__tests__/format.test.ts)
│       └── [format.ts](./src/utils/format.ts)
├── src-tauri/
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

60 directories, 185 files
