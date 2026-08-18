# TREE

```text
├── docs/
│   ├── [ARCHITECTURE.md](./docs/ARCHITECTURE.md)
│   ├── [CONTRIBUTING.md](./docs/CONTRIBUTING.md)
│   ├── [DOWNLOADS.md](./docs/DOWNLOADS.md)
│   ├── [FEATURES.md](./docs/FEATURES.md)
│   ├── [PACKAGING.md](./docs/PACKAGING.md)
│   └── [ROADMAP.md](./docs/ROADMAP.md)
├── e2e/
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
│   │   ├── (games)/
│   │   │   ├── dino-run/
│   │   │   │   └── [page.tsx](./src/app/(games)/dino-run/page.tsx)
│   │   │   ├── maze/
│   │   │   │   └── [page.tsx](./src/app/(games)/maze/page.tsx)
│   │   │   └── snake/
│   │   │       └── [page.tsx](./src/app/(games)/snake/page.tsx)
│   │   ├── (info)/
│   │   ├── __tests__/
│   │   ├── [default.tsx](./src/app/default.tsx)
│   │   ├── [error.tsx](./src/app/error.tsx)
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
│   │   │   └── [Header.tsx](./src/components/organisms/Header.tsx)
│   │   └── templates/
│   │       ├── __tests__/
│   │       ├── [ErrorTemplate.tsx](./src/components/templates/ErrorTemplate.tsx)
│   │       └── [NotFoundTemplate.tsx](./src/components/templates/NotFoundTemplate.tsx)
│   ├── games/
│   │   ├── DinoRun/
│   │   │   ├── __tests__/
│   │   │   │   └── __tests__/
│   │   │   ├── [constants.ts](./src/games/DinoRun/constants.ts)
│   │   │   ├── [game.ts](./src/games/DinoRun/game.ts)
│   │   │   ├── [index.tsx](./src/games/DinoRun/index.tsx)
│   │   │   └── [types.ts](./src/games/DinoRun/types.ts)
│   │   ├── Maze/
│   │   │   ├── __tests__/
│   │   │   ├── [constants.ts](./src/games/Maze/constants.ts)
│   │   │   ├── [index.tsx](./src/games/Maze/index.tsx)
│   │   │   ├── [maze.ts](./src/games/Maze/maze.ts)
│   │   │   └── [types.ts](./src/games/Maze/types.ts)
│   │   ├── Snake/
│   │   │   ├── __tests__/
│   │   │   ├── utils/
│   │   │   │   └── __tests__/
│   │   │   ├── [constants.ts](./src/games/Snake/constants.ts)
│   │   │   ├── [index.tsx](./src/games/Snake/index.tsx)
│   │   │   ├── [snake.ts](./src/games/Snake/snake.ts)
│   │   │   └── [types.ts](./src/games/Snake/types.ts)
│   │   └── _shared/
│   │       ├── __tests__/
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
│   ├── [Cargo.toml](./src-tauri/Cargo.toml)
│   ├── [build.rs](./src-tauri/build.rs)
│   └── [tauri.conf.json](./src-tauri/tauri.conf.json)
├── [AGENTS.md](./AGENTS.md)
├── [LICENSE](./LICENSE)
├── [README.md](./README.md)
├── [TREE.md](./TREE.md)
├── [eslint.config.mts](./eslint.config.mts)
├── [jest.config.ts](./jest.config.ts)
├── [jest.setup.ts](./jest.setup.ts)
├── [next.config.ts](./next.config.ts)
├── [package.json](./package.json)
├── [playwright.config.ts](./playwright.config.ts)
├── [postcss.config.mjs](./postcss.config.mjs)
└── [tsconfig.json](./tsconfig.json)
```

34 directories, 95 files
