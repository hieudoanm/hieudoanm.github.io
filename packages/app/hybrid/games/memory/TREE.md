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
│   │   ├── (games)/
│   │   │   ├── memory-match/
│   │   │   │   └── [page.tsx](./src/app/(games)/memory-match/page.tsx)
│   │   │   ├── n-back/
│   │   │   │   └── [page.tsx](./src/app/(games)/n-back/page.tsx)
│   │   │   ├── pi/
│   │   │   │   └── [page.tsx](./src/app/(games)/pi/page.tsx)
│   │   │   ├── recall/
│   │   │   │   └── [page.tsx](./src/app/(games)/recall/page.tsx)
│   │   │   └── [page.tsx](./src/app/(games)/page.tsx)
│   │   ├── (info)/
│   │   │   ├── about/
│   │   │   │   └── [page.tsx](./src/app/(info)/about/page.tsx)
│   │   │   ├── downloads/
│   │   │   │   └── [page.tsx](./src/app/(info)/downloads/page.tsx)
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
│   │   │   ├── [robots.test.ts](./src/app/__tests__/robots.test.ts)
│   │   │   ├── [template.test.tsx](./src/app/__tests__/template.test.tsx)
│   │   │   └── [unauthorized.test.tsx](./src/app/__tests__/unauthorized.test.tsx)
│   │   ├── [default.tsx](./src/app/default.tsx)
│   │   ├── [error.tsx](./src/app/error.tsx)
│   │   ├── [forbidden.tsx](./src/app/forbidden.tsx)
│   │   ├── [global-error.tsx](./src/app/global-error.tsx)
│   │   ├── [layout.tsx](./src/app/layout.tsx)
│   │   ├── [loading.tsx](./src/app/loading.tsx)
│   │   ├── [not-found.tsx](./src/app/not-found.tsx)
│   │   ├── [robots.ts](./src/app/robots.ts)
│   │   ├── [template.tsx](./src/app/template.tsx)
│   │   └── [unauthorized.tsx](./src/app/unauthorized.tsx)
│   ├── components/
│   │   ├── organisms/
│   │   │   ├── __tests__/
│   │   │   │   └── [Header.test.tsx](./src/components/organisms/__tests__/Header.test.tsx)
│   │   │   └── [Header.tsx](./src/components/organisms/Header.tsx)
│   │   └── templates/
│   │       ├── __tests__/
│   │       │   ├── [AboutTemplate.test.tsx](./src/components/templates/__tests__/AboutTemplate.test.tsx)
│   │       │   ├── [DownloadsTemplate.test.tsx](./src/components/templates/__tests__/DownloadsTemplate.test.tsx)
│   │       │   ├── [ErrorTemplate.test.tsx](./src/components/templates/__tests__/ErrorTemplate.test.tsx)
│   │       │   └── [VersionTemplate.test.tsx](./src/components/templates/__tests__/VersionTemplate.test.tsx)
│   │       ├── [AboutTemplate.tsx](./src/components/templates/AboutTemplate.tsx)
│   │       ├── [DownloadsTemplate.tsx](./src/components/templates/DownloadsTemplate.tsx)
│   │       ├── [ErrorTemplate.tsx](./src/components/templates/ErrorTemplate.tsx)
│   │       └── [VersionTemplate.tsx](./src/components/templates/VersionTemplate.tsx)
│   ├── data/
│   │   └── [pi.ts](./src/data/pi.ts)
│   ├── games/
│   │   ├── MemoryMatch/
│   │   │   ├── __tests__/
│   │   │   │   ├── [MemoryMatch.test.tsx](./src/games/MemoryMatch/__tests__/MemoryMatch.test.tsx)
│   │   │   │   ├── [useMemoryMatch.test.ts](./src/games/MemoryMatch/__tests__/useMemoryMatch.test.ts)
│   │   │   │   └── [utils.test.ts](./src/games/MemoryMatch/__tests__/utils.test.ts)
│   │   │   ├── [index.tsx](./src/games/MemoryMatch/index.tsx)
│   │   │   ├── [useMemoryMatch.ts](./src/games/MemoryMatch/useMemoryMatch.ts)
│   │   │   └── [utils.ts](./src/games/MemoryMatch/utils.ts)
│   │   ├── NBack/
│   │   │   ├── __tests__/
│   │   │   │   ├── [NBack.test.tsx](./src/games/NBack/__tests__/NBack.test.tsx)
│   │   │   │   └── [constants.test.ts](./src/games/NBack/__tests__/constants.test.ts)
│   │   │   ├── [constants.ts](./src/games/NBack/constants.ts)
│   │   │   └── [index.tsx](./src/games/NBack/index.tsx)
│   │   ├── PiNumber/
│   │   │   ├── __tests__/
│   │   │   │   ├── [Pi.test.tsx](./src/games/PiNumber/__tests__/Pi.test.tsx)
│   │   │   │   ├── [constants.test.ts](./src/games/PiNumber/__tests__/constants.test.ts)
│   │   │   │   ├── [keyHandlers.test.ts](./src/games/PiNumber/__tests__/keyHandlers.test.ts)
│   │   │   │   └── [usePiGame.test.ts](./src/games/PiNumber/__tests__/usePiGame.test.ts)
│   │   │   ├── [constants.ts](./src/games/PiNumber/constants.ts)
│   │   │   ├── [index.tsx](./src/games/PiNumber/index.tsx)
│   │   │   ├── [keyHandlers.ts](./src/games/PiNumber/keyHandlers.ts)
│   │   │   └── [usePiGame.ts](./src/games/PiNumber/usePiGame.ts)
│   │   └── Recall/
│   │       ├── __tests__/
│   │       │   ├── [Recall.test.tsx](./src/games/Recall/__tests__/Recall.test.tsx)
│   │       │   ├── [constants.test.ts](./src/games/Recall/__tests__/constants.test.ts)
│   │       │   ├── [useHighStreak.test.ts](./src/games/Recall/__tests__/useHighStreak.test.ts)
│   │       │   └── [useRecall.test.ts](./src/games/Recall/__tests__/useRecall.test.ts)
│   │       ├── [constants.ts](./src/games/Recall/constants.ts)
│   │       ├── [index.tsx](./src/games/Recall/index.tsx)
│   │       ├── [useHighStreak.ts](./src/games/Recall/useHighStreak.ts)
│   │       └── [useRecall.ts](./src/games/Recall/useRecall.ts)
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

47 directories, 141 files
