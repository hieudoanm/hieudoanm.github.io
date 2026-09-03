# TREE

```text
├── docs/
│   ├── [ARCHITECTURE.md](./docs/ARCHITECTURE.md)
│   ├── [CONTRIBUTING.md](./docs/CONTRIBUTING.md)
│   ├── [DOWNLOADS.md](./docs/DOWNLOADS.md)
│   ├── [PACKAGING.md](./docs/PACKAGING.md)
│   └── [ROADMAP.md](./docs/ROADMAP.md)
├── e2e/
│   ├── [fillomino.spec.ts](./e2e/fillomino.spec.ts)
│   ├── [heyawake.spec.ts](./e2e/heyawake.spec.ts)
│   ├── [home.spec.ts](./e2e/home.spec.ts)
│   ├── [masyu.spec.ts](./e2e/masyu.spec.ts)
│   ├── [navigation.spec.ts](./e2e/navigation.spec.ts)
│   ├── [norinori.spec.ts](./e2e/norinori.spec.ts)
│   ├── [nurikabe.spec.ts](./e2e/nurikabe.spec.ts)
│   ├── [shikaku.spec.ts](./e2e/shikaku.spec.ts)
│   └── [sudoku.spec.ts](./e2e/sudoku.spec.ts)
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
│   │   │   ├── fillomino/
│   │   │   │   └── [page.tsx](./src/app/(games)/fillomino/page.tsx)
│   │   │   ├── heyawake/
│   │   │   │   └── [page.tsx](./src/app/(games)/heyawake/page.tsx)
│   │   │   ├── masyu/
│   │   │   │   └── [page.tsx](./src/app/(games)/masyu/page.tsx)
│   │   │   ├── norinori/
│   │   │   │   └── [page.tsx](./src/app/(games)/norinori/page.tsx)
│   │   │   ├── nurikabe/
│   │   │   │   └── [page.tsx](./src/app/(games)/nurikabe/page.tsx)
│   │   │   ├── shikaku/
│   │   │   │   └── [page.tsx](./src/app/(games)/shikaku/page.tsx)
│   │   │   └── sudoku/
│   │   │       └── [page.tsx](./src/app/(games)/sudoku/page.tsx)
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
│   ├── games/
│   │   ├── Fillomino/
│   │   │   ├── __tests__/
│   │   │   │   ├── [Fillomino.test.tsx](./src/games/Fillomino/__tests__/Fillomino.test.tsx)
│   │   │   │   ├── [useFillomino.test.ts](./src/games/Fillomino/__tests__/useFillomino.test.ts)
│   │   │   │   └── [utils.test.ts](./src/games/Fillomino/__tests__/utils.test.ts)
│   │   │   ├── [index.tsx](./src/games/Fillomino/index.tsx)
│   │   │   ├── [types.ts](./src/games/Fillomino/types.ts)
│   │   │   ├── [useFillomino.ts](./src/games/Fillomino/useFillomino.ts)
│   │   │   └── [utils.ts](./src/games/Fillomino/utils.ts)
│   │   ├── Heyawake/
│   │   │   ├── __tests__/
│   │   │   │   ├── [Heyawake.test.tsx](./src/games/Heyawake/__tests__/Heyawake.test.tsx)
│   │   │   │   ├── [useHeyawake.test.ts](./src/games/Heyawake/__tests__/useHeyawake.test.ts)
│   │   │   │   └── [utils.test.ts](./src/games/Heyawake/__tests__/utils.test.ts)
│   │   │   ├── [index.tsx](./src/games/Heyawake/index.tsx)
│   │   │   ├── [types.ts](./src/games/Heyawake/types.ts)
│   │   │   ├── [useHeyawake.ts](./src/games/Heyawake/useHeyawake.ts)
│   │   │   └── [utils.ts](./src/games/Heyawake/utils.ts)
│   │   ├── Masyu/
│   │   │   ├── __tests__/
│   │   │   │   ├── [Masyu.test.tsx](./src/games/Masyu/__tests__/Masyu.test.tsx)
│   │   │   │   ├── [useMasyu.test.ts](./src/games/Masyu/__tests__/useMasyu.test.ts)
│   │   │   │   └── [utils.test.ts](./src/games/Masyu/__tests__/utils.test.ts)
│   │   │   ├── [AGENTS.md](./src/games/Masyu/AGENTS.md)
│   │   │   ├── [index.tsx](./src/games/Masyu/index.tsx)
│   │   │   ├── [types.ts](./src/games/Masyu/types.ts)
│   │   │   ├── [useMasyu.ts](./src/games/Masyu/useMasyu.ts)
│   │   │   └── [utils.ts](./src/games/Masyu/utils.ts)
│   │   ├── Norinori/
│   │   │   ├── __tests__/
│   │   │   │   ├── [Norinori.test.tsx](./src/games/Norinori/__tests__/Norinori.test.tsx)
│   │   │   │   ├── [useNorinori.test.ts](./src/games/Norinori/__tests__/useNorinori.test.ts)
│   │   │   │   └── [utils.test.ts](./src/games/Norinori/__tests__/utils.test.ts)
│   │   │   ├── [index.tsx](./src/games/Norinori/index.tsx)
│   │   │   ├── [types.ts](./src/games/Norinori/types.ts)
│   │   │   ├── [useNorinori.ts](./src/games/Norinori/useNorinori.ts)
│   │   │   └── [utils.ts](./src/games/Norinori/utils.ts)
│   │   ├── Nurikabe/
│   │   │   ├── __tests__/
│   │   │   │   ├── [Nurikabe.test.tsx](./src/games/Nurikabe/__tests__/Nurikabe.test.tsx)
│   │   │   │   ├── [useNurikabe.test.ts](./src/games/Nurikabe/__tests__/useNurikabe.test.ts)
│   │   │   │   └── [utils.test.ts](./src/games/Nurikabe/__tests__/utils.test.ts)
│   │   │   ├── [index.tsx](./src/games/Nurikabe/index.tsx)
│   │   │   ├── [types.ts](./src/games/Nurikabe/types.ts)
│   │   │   ├── [useNurikabe.ts](./src/games/Nurikabe/useNurikabe.ts)
│   │   │   └── [utils.ts](./src/games/Nurikabe/utils.ts)
│   │   ├── Shikaku/
│   │   │   ├── __tests__/
│   │   │   │   ├── [Shikaku.test.tsx](./src/games/Shikaku/__tests__/Shikaku.test.tsx)
│   │   │   │   ├── [useShikaku.test.ts](./src/games/Shikaku/__tests__/useShikaku.test.ts)
│   │   │   │   └── [utils.test.ts](./src/games/Shikaku/__tests__/utils.test.ts)
│   │   │   ├── [index.tsx](./src/games/Shikaku/index.tsx)
│   │   │   ├── [types.ts](./src/games/Shikaku/types.ts)
│   │   │   ├── [useShikaku.ts](./src/games/Shikaku/useShikaku.ts)
│   │   │   └── [utils.ts](./src/games/Shikaku/utils.ts)
│   │   ├── Sudoku/
│   │   │   ├── __tests__/
│   │   │   │   ├── __snapshots__/
│   │   │   │   │   └── [index.test.tsx.snap](./src/games/Sudoku/__tests__/__snapshots__/index.test.tsx.snap)
│   │   │   │   ├── [index.test.tsx](./src/games/Sudoku/__tests__/index.test.tsx)
│   │   │   │   └── [useSudoku.test.ts](./src/games/Sudoku/__tests__/useSudoku.test.ts)
│   │   │   ├── utils/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [sudoku.test.ts](./src/games/Sudoku/utils/__tests__/sudoku.test.ts)
│   │   │   │   └── [sudoku.ts](./src/games/Sudoku/utils/sudoku.ts)
│   │   │   ├── [index.tsx](./src/games/Sudoku/index.tsx)
│   │   │   ├── [types.ts](./src/games/Sudoku/types.ts)
│   │   │   └── [useSudoku.ts](./src/games/Sudoku/useSudoku.ts)
│   │   └── _shared/
│   │       ├── __tests__/
│   │       │   ├── [GameInstructions.test.tsx](./src/games/_shared/__tests__/GameInstructions.test.tsx)
│   │       │   └── [gameData.test.tsx](./src/games/_shared/__tests__/gameData.test.tsx)
│   │       ├── [GameInstructions.tsx](./src/games/_shared/GameInstructions.tsx)
│   │       └── [gameData.tsx](./src/games/_shared/gameData.tsx)
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

63 directories, 186 files
