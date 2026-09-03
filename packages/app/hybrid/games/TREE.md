# TREE

```text
├── 8-bit/
│   ├── docs/
│   │   ├── [ARCHITECTURE.md](./8-bit/docs/ARCHITECTURE.md)
│   │   ├── [CONTRIBUTING.md](./8-bit/docs/CONTRIBUTING.md)
│   │   ├── [DOWNLOADS.md](./8-bit/docs/DOWNLOADS.md)
│   │   ├── [PACKAGING.md](./8-bit/docs/PACKAGING.md)
│   │   └── [ROADMAP.md](./8-bit/docs/ROADMAP.md)
│   ├── e2e/
│   │   └── [home.spec.ts](./8-bit/e2e/home.spec.ts)
│   ├── public/
│   │   ├── icons/
│   │   │   ├── [icon-128x128.png](./8-bit/public/icons/icon-128x128.png)
│   │   │   ├── [icon-144x144.png](./8-bit/public/icons/icon-144x144.png)
│   │   │   ├── [icon-152x152.png](./8-bit/public/icons/icon-152x152.png)
│   │   │   ├── [icon-16x16.png](./8-bit/public/icons/icon-16x16.png)
│   │   │   ├── [icon-180x180.png](./8-bit/public/icons/icon-180x180.png)
│   │   │   ├── [icon-192x192.png](./8-bit/public/icons/icon-192x192.png)
│   │   │   ├── [icon-256x256.png](./8-bit/public/icons/icon-256x256.png)
│   │   │   ├── [icon-32x32.png](./8-bit/public/icons/icon-32x32.png)
│   │   │   ├── [icon-384x384.png](./8-bit/public/icons/icon-384x384.png)
│   │   │   ├── [icon-48x48.png](./8-bit/public/icons/icon-48x48.png)
│   │   │   ├── [icon-512x512.png](./8-bit/public/icons/icon-512x512.png)
│   │   │   ├── [icon-64x64.png](./8-bit/public/icons/icon-64x64.png)
│   │   │   ├── [icon-72x72.png](./8-bit/public/icons/icon-72x72.png)
│   │   │   ├── [icon-96x96.png](./8-bit/public/icons/icon-96x96.png)
│   │   │   └── [icon.svg](./8-bit/public/icons/icon.svg)
│   │   ├── [apple-touch-icon.png](./8-bit/public/apple-touch-icon.png)
│   │   ├── [favicon.ico](./8-bit/public/favicon.ico)
│   │   ├── [manifest.json](./8-bit/public/manifest.json)
│   │   ├── [robots.txt](./8-bit/public/robots.txt)
│   │   ├── [sitemap.xml](./8-bit/public/sitemap.xml)
│   │   └── [sw.js](./8-bit/public/sw.js)
│   ├── src/
│   │   ├── app/
│   │   │   ├── (auth)/
│   │   │   │   ├── forget-password/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./8-bit/src/app/(auth)/forget-password/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./8-bit/src/app/(auth)/forget-password/page.tsx)
│   │   │   │   ├── profile/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./8-bit/src/app/(auth)/profile/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./8-bit/src/app/(auth)/profile/page.tsx)
│   │   │   │   ├── reset-password/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./8-bit/src/app/(auth)/reset-password/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./8-bit/src/app/(auth)/reset-password/page.tsx)
│   │   │   │   ├── sign-in/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./8-bit/src/app/(auth)/sign-in/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./8-bit/src/app/(auth)/sign-in/page.tsx)
│   │   │   │   └── sign-up/
│   │   │   │       ├── __tests__/
│   │   │   │       │   └── [page.test.tsx](./8-bit/src/app/(auth)/sign-up/__tests__/page.test.tsx)
│   │   │   │       └── [page.tsx](./8-bit/src/app/(auth)/sign-up/page.tsx)
│   │   │   ├── (games)/
│   │   │   │   ├── dino-run/
│   │   │   │   │   └── [page.tsx](./8-bit/src/app/(games)/dino-run/page.tsx)
│   │   │   │   ├── maze/
│   │   │   │   │   └── [page.tsx](./8-bit/src/app/(games)/maze/page.tsx)
│   │   │   │   ├── rock-paper-scissors/
│   │   │   │   │   └── [page.tsx](./8-bit/src/app/(games)/rock-paper-scissors/page.tsx)
│   │   │   │   └── snake/
│   │   │   │       └── [page.tsx](./8-bit/src/app/(games)/snake/page.tsx)
│   │   │   ├── (info)/
│   │   │   │   ├── about/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./8-bit/src/app/(info)/about/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./8-bit/src/app/(info)/about/page.tsx)
│   │   │   │   ├── downloads/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./8-bit/src/app/(info)/downloads/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./8-bit/src/app/(info)/downloads/page.tsx)
│   │   │   │   └── version/
│   │   │   │       ├── __tests__/
│   │   │   │       │   └── [page.test.tsx](./8-bit/src/app/(info)/version/__tests__/page.test.tsx)
│   │   │   │       └── [page.tsx](./8-bit/src/app/(info)/version/page.tsx)
│   │   │   ├── __tests__/
│   │   │   │   ├── [default.test.tsx](./8-bit/src/app/__tests__/default.test.tsx)
│   │   │   │   ├── [error.test.tsx](./8-bit/src/app/__tests__/error.test.tsx)
│   │   │   │   ├── [forbidden.test.tsx](./8-bit/src/app/__tests__/forbidden.test.tsx)
│   │   │   │   ├── [global-error.test.tsx](./8-bit/src/app/__tests__/global-error.test.tsx)
│   │   │   │   ├── [layout.test.tsx](./8-bit/src/app/__tests__/layout.test.tsx)
│   │   │   │   ├── [loading.test.tsx](./8-bit/src/app/__tests__/loading.test.tsx)
│   │   │   │   ├── [not-found.test.tsx](./8-bit/src/app/__tests__/not-found.test.tsx)
│   │   │   │   ├── [page.test.tsx](./8-bit/src/app/__tests__/page.test.tsx)
│   │   │   │   ├── [robots.test.ts](./8-bit/src/app/__tests__/robots.test.ts)
│   │   │   │   ├── [template.test.tsx](./8-bit/src/app/__tests__/template.test.tsx)
│   │   │   │   └── [unauthorized.test.tsx](./8-bit/src/app/__tests__/unauthorized.test.tsx)
│   │   │   ├── [default.tsx](./8-bit/src/app/default.tsx)
│   │   │   ├── [error.tsx](./8-bit/src/app/error.tsx)
│   │   │   ├── [favicon.ico](./8-bit/src/app/favicon.ico)
│   │   │   ├── [forbidden.tsx](./8-bit/src/app/forbidden.tsx)
│   │   │   ├── [global-error.tsx](./8-bit/src/app/global-error.tsx)
│   │   │   ├── [layout.tsx](./8-bit/src/app/layout.tsx)
│   │   │   ├── [loading.tsx](./8-bit/src/app/loading.tsx)
│   │   │   ├── [not-found.tsx](./8-bit/src/app/not-found.tsx)
│   │   │   ├── [page.tsx](./8-bit/src/app/page.tsx)
│   │   │   ├── [robots.ts](./8-bit/src/app/robots.ts)
│   │   │   ├── [template.tsx](./8-bit/src/app/template.tsx)
│   │   │   └── [unauthorized.tsx](./8-bit/src/app/unauthorized.tsx)
│   │   ├── components/
│   │   │   ├── organisms/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [Header.test.tsx](./8-bit/src/components/organisms/__tests__/Header.test.tsx)
│   │   │   │   └── [Header.tsx](./8-bit/src/components/organisms/Header.tsx)
│   │   │   └── templates/
│   │   │       ├── __tests__/
│   │   │       │   ├── [AboutTemplate.test.tsx](./8-bit/src/components/templates/__tests__/AboutTemplate.test.tsx)
│   │   │       │   ├── [DownloadsTemplate.test.tsx](./8-bit/src/components/templates/__tests__/DownloadsTemplate.test.tsx)
│   │   │       │   ├── [ErrorTemplate.test.tsx](./8-bit/src/components/templates/__tests__/ErrorTemplate.test.tsx)
│   │   │       │   └── [VersionTemplate.test.tsx](./8-bit/src/components/templates/__tests__/VersionTemplate.test.tsx)
│   │   │       ├── [AboutTemplate.tsx](./8-bit/src/components/templates/AboutTemplate.tsx)
│   │   │       ├── [DownloadsTemplate.tsx](./8-bit/src/components/templates/DownloadsTemplate.tsx)
│   │   │       ├── [ErrorTemplate.tsx](./8-bit/src/components/templates/ErrorTemplate.tsx)
│   │   │       └── [VersionTemplate.tsx](./8-bit/src/components/templates/VersionTemplate.tsx)
│   │   ├── games/
│   │   │   ├── DinoRun/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [game.test.ts](./8-bit/src/games/DinoRun/__tests__/game.test.ts)
│   │   │   │   │   └── [index.test.tsx](./8-bit/src/games/DinoRun/__tests__/index.test.tsx)
│   │   │   │   ├── [constants.ts](./8-bit/src/games/DinoRun/constants.ts)
│   │   │   │   ├── [game.ts](./8-bit/src/games/DinoRun/game.ts)
│   │   │   │   ├── [index.tsx](./8-bit/src/games/DinoRun/index.tsx)
│   │   │   │   └── [types.ts](./8-bit/src/games/DinoRun/types.ts)
│   │   │   ├── Maze/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [index.test.tsx](./8-bit/src/games/Maze/__tests__/index.test.tsx)
│   │   │   │   │   └── [maze.test.ts](./8-bit/src/games/Maze/__tests__/maze.test.ts)
│   │   │   │   ├── [constants.ts](./8-bit/src/games/Maze/constants.ts)
│   │   │   │   ├── [index.tsx](./8-bit/src/games/Maze/index.tsx)
│   │   │   │   ├── [maze.ts](./8-bit/src/games/Maze/maze.ts)
│   │   │   │   └── [types.ts](./8-bit/src/games/Maze/types.ts)
│   │   │   ├── RockPaperScissors/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [index.test.tsx](./8-bit/src/games/RockPaperScissors/__tests__/index.test.tsx)
│   │   │   │   │   └── [utils.test.ts](./8-bit/src/games/RockPaperScissors/__tests__/utils.test.ts)
│   │   │   │   ├── [index.tsx](./8-bit/src/games/RockPaperScissors/index.tsx)
│   │   │   │   ├── [types.ts](./8-bit/src/games/RockPaperScissors/types.ts)
│   │   │   │   └── [utils.ts](./8-bit/src/games/RockPaperScissors/utils.ts)
│   │   │   ├── Snake/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [index.test.tsx](./8-bit/src/games/Snake/__tests__/index.test.tsx)
│   │   │   │   │   └── [snake.test.ts](./8-bit/src/games/Snake/__tests__/snake.test.ts)
│   │   │   │   ├── utils/
│   │   │   │   │   └── __tests__/
│   │   │   │   ├── [constants.ts](./8-bit/src/games/Snake/constants.ts)
│   │   │   │   ├── [index.tsx](./8-bit/src/games/Snake/index.tsx)
│   │   │   │   ├── [snake.ts](./8-bit/src/games/Snake/snake.ts)
│   │   │   │   └── [types.ts](./8-bit/src/games/Snake/types.ts)
│   │   │   └── _shared/
│   │   │       ├── __tests__/
│   │   │       │   ├── [GameInstructions.test.tsx](./8-bit/src/games/_shared/__tests__/GameInstructions.test.tsx)
│   │   │       │   └── [gameData.test.ts](./8-bit/src/games/_shared/__tests__/gameData.test.ts)
│   │   │       ├── [GameInstructions.tsx](./8-bit/src/games/_shared/GameInstructions.tsx)
│   │   │       └── [gameData.tsx](./8-bit/src/games/_shared/gameData.tsx)
│   │   └── styles/
│   │       ├── [base.css](./8-bit/src/styles/base.css)
│   │       ├── [globals.css](./8-bit/src/styles/globals.css)
│   │       └── [themes.css](./8-bit/src/styles/themes.css)
│   ├── src-tauri/
│   │   ├── capabilities/
│   │   │   └── [default.json](./8-bit/src-tauri/capabilities/default.json)
│   │   ├── icons/
│   │   │   ├── [128x128.png](./8-bit/src-tauri/icons/128x128.png)
│   │   │   ├── [128x128@2x.png](./8-bit/src-tauri/icons/128x128@2x.png)
│   │   │   ├── [32x32.png](./8-bit/src-tauri/icons/32x32.png)
│   │   │   ├── [Square107x107Logo.png](./8-bit/src-tauri/icons/Square107x107Logo.png)
│   │   │   ├── [Square142x142Logo.png](./8-bit/src-tauri/icons/Square142x142Logo.png)
│   │   │   ├── [Square150x150Logo.png](./8-bit/src-tauri/icons/Square150x150Logo.png)
│   │   │   ├── [Square284x284Logo.png](./8-bit/src-tauri/icons/Square284x284Logo.png)
│   │   │   ├── [Square30x30Logo.png](./8-bit/src-tauri/icons/Square30x30Logo.png)
│   │   │   ├── [Square310x310Logo.png](./8-bit/src-tauri/icons/Square310x310Logo.png)
│   │   │   ├── [Square44x44Logo.png](./8-bit/src-tauri/icons/Square44x44Logo.png)
│   │   │   ├── [Square71x71Logo.png](./8-bit/src-tauri/icons/Square71x71Logo.png)
│   │   │   ├── [Square89x89Logo.png](./8-bit/src-tauri/icons/Square89x89Logo.png)
│   │   │   ├── [StoreLogo.png](./8-bit/src-tauri/icons/StoreLogo.png)
│   │   │   ├── [icon.icns](./8-bit/src-tauri/icons/icon.icns)
│   │   │   ├── [icon.ico](./8-bit/src-tauri/icons/icon.ico)
│   │   │   └── [icon.png](./8-bit/src-tauri/icons/icon.png)
│   │   ├── src/
│   │   │   ├── [lib.rs](./8-bit/src-tauri/src/lib.rs)
│   │   │   └── [main.rs](./8-bit/src-tauri/src/main.rs)
│   │   ├── [Cargo.lock](./8-bit/src-tauri/Cargo.lock)
│   │   ├── [Cargo.toml](./8-bit/src-tauri/Cargo.toml)
│   │   ├── [build.rs](./8-bit/src-tauri/build.rs)
│   │   └── [tauri.conf.json](./8-bit/src-tauri/tauri.conf.json)
│   ├── [AGENTS.md](./8-bit/AGENTS.md)
│   ├── [Dockerfile](./8-bit/Dockerfile)
│   ├── [LICENSE](./8-bit/LICENSE)
│   ├── [README.md](./8-bit/README.md)
│   ├── [TREE.md](./8-bit/TREE.md)
│   ├── [docker-compose.yaml](./8-bit/docker-compose.yaml)
│   ├── [eslint.config.mts](./8-bit/eslint.config.mts)
│   ├── [jest.config.ts](./8-bit/jest.config.ts)
│   ├── [jest.setup.ts](./8-bit/jest.setup.ts)
│   ├── [next.config.ts](./8-bit/next.config.ts)
│   ├── [package.json](./8-bit/package.json)
│   ├── [playwright.config.ts](./8-bit/playwright.config.ts)
│   ├── [postcss.config.mjs](./8-bit/postcss.config.mjs)
│   └── [tsconfig.json](./8-bit/tsconfig.json)
├── casino/
│   ├── docs/
│   │   ├── [ARCHITECTURE.md](./casino/docs/ARCHITECTURE.md)
│   │   ├── [CONTRIBUTING.md](./casino/docs/CONTRIBUTING.md)
│   │   ├── [DOWNLOADS.md](./casino/docs/DOWNLOADS.md)
│   │   └── [ROADMAP.md](./casino/docs/ROADMAP.md)
│   ├── e2e/
│   │   └── [home.spec.ts](./casino/e2e/home.spec.ts)
│   ├── public/
│   │   ├── icons/
│   │   │   ├── [icon-128x128.png](./casino/public/icons/icon-128x128.png)
│   │   │   ├── [icon-144x144.png](./casino/public/icons/icon-144x144.png)
│   │   │   ├── [icon-152x152.png](./casino/public/icons/icon-152x152.png)
│   │   │   ├── [icon-16x16.png](./casino/public/icons/icon-16x16.png)
│   │   │   ├── [icon-180x180.png](./casino/public/icons/icon-180x180.png)
│   │   │   ├── [icon-192x192.png](./casino/public/icons/icon-192x192.png)
│   │   │   ├── [icon-256x256.png](./casino/public/icons/icon-256x256.png)
│   │   │   ├── [icon-32x32.png](./casino/public/icons/icon-32x32.png)
│   │   │   ├── [icon-384x384.png](./casino/public/icons/icon-384x384.png)
│   │   │   ├── [icon-48x48.png](./casino/public/icons/icon-48x48.png)
│   │   │   ├── [icon-512x512.png](./casino/public/icons/icon-512x512.png)
│   │   │   ├── [icon-64x64.png](./casino/public/icons/icon-64x64.png)
│   │   │   ├── [icon-72x72.png](./casino/public/icons/icon-72x72.png)
│   │   │   ├── [icon-96x96.png](./casino/public/icons/icon-96x96.png)
│   │   │   └── [icon.svg](./casino/public/icons/icon.svg)
│   │   ├── [apple-touch-icon.png](./casino/public/apple-touch-icon.png)
│   │   ├── [favicon.ico](./casino/public/favicon.ico)
│   │   ├── [manifest.json](./casino/public/manifest.json)
│   │   ├── [robots.txt](./casino/public/robots.txt)
│   │   ├── [sitemap.xml](./casino/public/sitemap.xml)
│   │   └── [sw.js](./casino/public/sw.js)
│   ├── src/
│   │   ├── app/
│   │   │   ├── (auth)/
│   │   │   │   ├── forget-password/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./casino/src/app/(auth)/forget-password/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./casino/src/app/(auth)/forget-password/page.tsx)
│   │   │   │   ├── profile/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./casino/src/app/(auth)/profile/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./casino/src/app/(auth)/profile/page.tsx)
│   │   │   │   ├── reset-password/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./casino/src/app/(auth)/reset-password/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./casino/src/app/(auth)/reset-password/page.tsx)
│   │   │   │   ├── sign-in/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./casino/src/app/(auth)/sign-in/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./casino/src/app/(auth)/sign-in/page.tsx)
│   │   │   │   └── sign-up/
│   │   │   │       ├── __tests__/
│   │   │   │       │   └── [page.test.tsx](./casino/src/app/(auth)/sign-up/__tests__/page.test.tsx)
│   │   │   │       └── [page.tsx](./casino/src/app/(auth)/sign-up/page.tsx)
│   │   │   ├── (games)/
│   │   │   │   ├── baccarat/
│   │   │   │   │   └── [page.tsx](./casino/src/app/(games)/baccarat/page.tsx)
│   │   │   │   ├── card-counter/
│   │   │   │   │   └── [page.tsx](./casino/src/app/(games)/card-counter/page.tsx)
│   │   │   │   ├── craps/
│   │   │   │   │   └── [page.tsx](./casino/src/app/(games)/craps/page.tsx)
│   │   │   │   ├── hi-lo/
│   │   │   │   │   └── [page.tsx](./casino/src/app/(games)/hi-lo/page.tsx)
│   │   │   │   ├── keno/
│   │   │   │   │   └── [page.tsx](./casino/src/app/(games)/keno/page.tsx)
│   │   │   │   ├── over-under-seven/
│   │   │   │   │   └── [page.tsx](./casino/src/app/(games)/over-under-seven/page.tsx)
│   │   │   │   ├── poker-odds/
│   │   │   │   │   └── [page.tsx](./casino/src/app/(games)/poker-odds/page.tsx)
│   │   │   │   ├── roulette/
│   │   │   │   │   └── [page.tsx](./casino/src/app/(games)/roulette/page.tsx)
│   │   │   │   ├── slot-machine/
│   │   │   │   │   └── [page.tsx](./casino/src/app/(games)/slot-machine/page.tsx)
│   │   │   │   └── war/
│   │   │   │       └── [page.tsx](./casino/src/app/(games)/war/page.tsx)
│   │   │   ├── (info)/
│   │   │   │   ├── about/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./casino/src/app/(info)/about/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./casino/src/app/(info)/about/page.tsx)
│   │   │   │   ├── downloads/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./casino/src/app/(info)/downloads/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./casino/src/app/(info)/downloads/page.tsx)
│   │   │   │   └── version/
│   │   │   │       ├── __tests__/
│   │   │   │       │   └── [page.test.tsx](./casino/src/app/(info)/version/__tests__/page.test.tsx)
│   │   │   │       └── [page.tsx](./casino/src/app/(info)/version/page.tsx)
│   │   │   ├── __tests__/
│   │   │   │   ├── [default.test.tsx](./casino/src/app/__tests__/default.test.tsx)
│   │   │   │   ├── [error.test.tsx](./casino/src/app/__tests__/error.test.tsx)
│   │   │   │   ├── [forbidden.test.tsx](./casino/src/app/__tests__/forbidden.test.tsx)
│   │   │   │   ├── [global-error.test.tsx](./casino/src/app/__tests__/global-error.test.tsx)
│   │   │   │   ├── [layout.test.tsx](./casino/src/app/__tests__/layout.test.tsx)
│   │   │   │   ├── [loading.test.tsx](./casino/src/app/__tests__/loading.test.tsx)
│   │   │   │   ├── [not-found.test.tsx](./casino/src/app/__tests__/not-found.test.tsx)
│   │   │   │   ├── [page.test.tsx](./casino/src/app/__tests__/page.test.tsx)
│   │   │   │   ├── [robots.test.ts](./casino/src/app/__tests__/robots.test.ts)
│   │   │   │   ├── [template.test.tsx](./casino/src/app/__tests__/template.test.tsx)
│   │   │   │   └── [unauthorized.test.tsx](./casino/src/app/__tests__/unauthorized.test.tsx)
│   │   │   ├── [default.tsx](./casino/src/app/default.tsx)
│   │   │   ├── [error.tsx](./casino/src/app/error.tsx)
│   │   │   ├── [favicon.ico](./casino/src/app/favicon.ico)
│   │   │   ├── [forbidden.tsx](./casino/src/app/forbidden.tsx)
│   │   │   ├── [global-error.tsx](./casino/src/app/global-error.tsx)
│   │   │   ├── [layout.tsx](./casino/src/app/layout.tsx)
│   │   │   ├── [loading.tsx](./casino/src/app/loading.tsx)
│   │   │   ├── [not-found.tsx](./casino/src/app/not-found.tsx)
│   │   │   ├── [page.tsx](./casino/src/app/page.tsx)
│   │   │   ├── [robots.ts](./casino/src/app/robots.ts)
│   │   │   ├── [template.tsx](./casino/src/app/template.tsx)
│   │   │   └── [unauthorized.tsx](./casino/src/app/unauthorized.tsx)
│   │   ├── components/
│   │   │   ├── organisms/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [Header.test.tsx](./casino/src/components/organisms/__tests__/Header.test.tsx)
│   │   │   │   └── [Header.tsx](./casino/src/components/organisms/Header.tsx)
│   │   │   └── templates/
│   │   │       ├── __tests__/
│   │   │       │   ├── [AboutTemplate.test.tsx](./casino/src/components/templates/__tests__/AboutTemplate.test.tsx)
│   │   │       │   ├── [DownloadsTemplate.test.tsx](./casino/src/components/templates/__tests__/DownloadsTemplate.test.tsx)
│   │   │       │   ├── [ErrorTemplate.test.tsx](./casino/src/components/templates/__tests__/ErrorTemplate.test.tsx)
│   │   │       │   └── [VersionTemplate.test.tsx](./casino/src/components/templates/__tests__/VersionTemplate.test.tsx)
│   │   │       ├── [AboutTemplate.tsx](./casino/src/components/templates/AboutTemplate.tsx)
│   │   │       ├── [DownloadsTemplate.tsx](./casino/src/components/templates/DownloadsTemplate.tsx)
│   │   │       ├── [ErrorTemplate.tsx](./casino/src/components/templates/ErrorTemplate.tsx)
│   │   │       └── [VersionTemplate.tsx](./casino/src/components/templates/VersionTemplate.tsx)
│   │   ├── games/
│   │   │   ├── _shared/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [cards.test.ts](./casino/src/games/_shared/__tests__/cards.test.ts)
│   │   │   │   └── [cards.ts](./casino/src/games/_shared/cards.ts)
│   │   │   ├── baccarat/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [index.test.tsx](./casino/src/games/baccarat/__tests__/index.test.tsx)
│   │   │   │   │   ├── [useBaccarat.test.ts](./casino/src/games/baccarat/__tests__/useBaccarat.test.ts)
│   │   │   │   │   └── [utils.test.ts](./casino/src/games/baccarat/__tests__/utils.test.ts)
│   │   │   │   ├── [index.tsx](./casino/src/games/baccarat/index.tsx)
│   │   │   │   ├── [types.ts](./casino/src/games/baccarat/types.ts)
│   │   │   │   ├── [useBaccarat.ts](./casino/src/games/baccarat/useBaccarat.ts)
│   │   │   │   └── [utils.ts](./casino/src/games/baccarat/utils.ts)
│   │   │   ├── card-counter/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [index.test.tsx](./casino/src/games/card-counter/__tests__/index.test.tsx)
│   │   │   │   │   ├── [useCardCounter.test.ts](./casino/src/games/card-counter/__tests__/useCardCounter.test.ts)
│   │   │   │   │   └── [utils.test.ts](./casino/src/games/card-counter/__tests__/utils.test.ts)
│   │   │   │   ├── [index.tsx](./casino/src/games/card-counter/index.tsx)
│   │   │   │   ├── [types.ts](./casino/src/games/card-counter/types.ts)
│   │   │   │   ├── [useCardCounter.ts](./casino/src/games/card-counter/useCardCounter.ts)
│   │   │   │   └── [utils.ts](./casino/src/games/card-counter/utils.ts)
│   │   │   ├── craps/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [index.test.tsx](./casino/src/games/craps/__tests__/index.test.tsx)
│   │   │   │   │   ├── [useCraps.test.ts](./casino/src/games/craps/__tests__/useCraps.test.ts)
│   │   │   │   │   └── [utils.test.ts](./casino/src/games/craps/__tests__/utils.test.ts)
│   │   │   │   ├── [index.tsx](./casino/src/games/craps/index.tsx)
│   │   │   │   ├── [types.ts](./casino/src/games/craps/types.ts)
│   │   │   │   ├── [useCraps.ts](./casino/src/games/craps/useCraps.ts)
│   │   │   │   └── [utils.ts](./casino/src/games/craps/utils.ts)
│   │   │   ├── hi-lo/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [index.test.tsx](./casino/src/games/hi-lo/__tests__/index.test.tsx)
│   │   │   │   │   ├── [useHiLo.test.ts](./casino/src/games/hi-lo/__tests__/useHiLo.test.ts)
│   │   │   │   │   └── [utils.test.ts](./casino/src/games/hi-lo/__tests__/utils.test.ts)
│   │   │   │   ├── [constants.ts](./casino/src/games/hi-lo/constants.ts)
│   │   │   │   ├── [index.tsx](./casino/src/games/hi-lo/index.tsx)
│   │   │   │   ├── [types.ts](./casino/src/games/hi-lo/types.ts)
│   │   │   │   ├── [useHiLo.ts](./casino/src/games/hi-lo/useHiLo.ts)
│   │   │   │   └── [utils.ts](./casino/src/games/hi-lo/utils.ts)
│   │   │   ├── keno/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [index.test.tsx](./casino/src/games/keno/__tests__/index.test.tsx)
│   │   │   │   │   ├── [useKeno.test.ts](./casino/src/games/keno/__tests__/useKeno.test.ts)
│   │   │   │   │   └── [utils.test.ts](./casino/src/games/keno/__tests__/utils.test.ts)
│   │   │   │   ├── [index.tsx](./casino/src/games/keno/index.tsx)
│   │   │   │   ├── [types.ts](./casino/src/games/keno/types.ts)
│   │   │   │   ├── [useKeno.ts](./casino/src/games/keno/useKeno.ts)
│   │   │   │   └── [utils.ts](./casino/src/games/keno/utils.ts)
│   │   │   ├── over-under-seven/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [index.test.tsx](./casino/src/games/over-under-seven/__tests__/index.test.tsx)
│   │   │   │   │   ├── [useOverUnderSeven.test.ts](./casino/src/games/over-under-seven/__tests__/useOverUnderSeven.test.ts)
│   │   │   │   │   └── [utils.test.ts](./casino/src/games/over-under-seven/__tests__/utils.test.ts)
│   │   │   │   ├── [index.tsx](./casino/src/games/over-under-seven/index.tsx)
│   │   │   │   ├── [types.ts](./casino/src/games/over-under-seven/types.ts)
│   │   │   │   ├── [useOverUnderSeven.ts](./casino/src/games/over-under-seven/useOverUnderSeven.ts)
│   │   │   │   └── [utils.ts](./casino/src/games/over-under-seven/utils.ts)
│   │   │   ├── poker-odds/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [usePokerOdds.test.tsx](./casino/src/games/poker-odds/__tests__/usePokerOdds.test.tsx)
│   │   │   │   │   └── [utils.test.ts](./casino/src/games/poker-odds/__tests__/utils.test.ts)
│   │   │   │   ├── components/
│   │   │   │   │   └── [CardPicker.tsx](./casino/src/games/poker-odds/components/CardPicker.tsx)
│   │   │   │   ├── [constants.ts](./casino/src/games/poker-odds/constants.ts)
│   │   │   │   ├── [index.tsx](./casino/src/games/poker-odds/index.tsx)
│   │   │   │   ├── [types.ts](./casino/src/games/poker-odds/types.ts)
│   │   │   │   ├── [usePokerOdds.ts](./casino/src/games/poker-odds/usePokerOdds.ts)
│   │   │   │   └── [utils.ts](./casino/src/games/poker-odds/utils.ts)
│   │   │   ├── roulette/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [index.test.tsx](./casino/src/games/roulette/__tests__/index.test.tsx)
│   │   │   │   │   ├── [useRoulette.test.ts](./casino/src/games/roulette/__tests__/useRoulette.test.ts)
│   │   │   │   │   └── [utils.test.ts](./casino/src/games/roulette/__tests__/utils.test.ts)
│   │   │   │   ├── [index.tsx](./casino/src/games/roulette/index.tsx)
│   │   │   │   ├── [types.ts](./casino/src/games/roulette/types.ts)
│   │   │   │   ├── [useRoulette.ts](./casino/src/games/roulette/useRoulette.ts)
│   │   │   │   └── [utils.ts](./casino/src/games/roulette/utils.ts)
│   │   │   ├── slot-machine/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [index.test.tsx](./casino/src/games/slot-machine/__tests__/index.test.tsx)
│   │   │   │   │   ├── [useSlotMachine.test.ts](./casino/src/games/slot-machine/__tests__/useSlotMachine.test.ts)
│   │   │   │   │   └── [utils.test.ts](./casino/src/games/slot-machine/__tests__/utils.test.ts)
│   │   │   │   ├── [constants.ts](./casino/src/games/slot-machine/constants.ts)
│   │   │   │   ├── [index.tsx](./casino/src/games/slot-machine/index.tsx)
│   │   │   │   ├── [useSlotMachine.ts](./casino/src/games/slot-machine/useSlotMachine.ts)
│   │   │   │   └── [utils.ts](./casino/src/games/slot-machine/utils.ts)
│   │   │   └── war/
│   │   │       ├── __tests__/
│   │   │       │   ├── [index.test.tsx](./casino/src/games/war/__tests__/index.test.tsx)
│   │   │       │   ├── [useWar.test.ts](./casino/src/games/war/__tests__/useWar.test.ts)
│   │   │       │   └── [utils.test.ts](./casino/src/games/war/__tests__/utils.test.ts)
│   │   │       ├── [index.tsx](./casino/src/games/war/index.tsx)
│   │   │       ├── [types.ts](./casino/src/games/war/types.ts)
│   │   │       ├── [useWar.ts](./casino/src/games/war/useWar.ts)
│   │   │       └── [utils.ts](./casino/src/games/war/utils.ts)
│   │   └── styles/
│   │       ├── [base.css](./casino/src/styles/base.css)
│   │       ├── [globals.css](./casino/src/styles/globals.css)
│   │       └── [themes.css](./casino/src/styles/themes.css)
│   ├── src-tauri/
│   │   ├── capabilities/
│   │   │   └── [default.json](./casino/src-tauri/capabilities/default.json)
│   │   ├── icons/
│   │   │   ├── [128x128.png](./casino/src-tauri/icons/128x128.png)
│   │   │   ├── [128x128@2x.png](./casino/src-tauri/icons/128x128@2x.png)
│   │   │   ├── [32x32.png](./casino/src-tauri/icons/32x32.png)
│   │   │   ├── [Square107x107Logo.png](./casino/src-tauri/icons/Square107x107Logo.png)
│   │   │   ├── [Square142x142Logo.png](./casino/src-tauri/icons/Square142x142Logo.png)
│   │   │   ├── [Square150x150Logo.png](./casino/src-tauri/icons/Square150x150Logo.png)
│   │   │   ├── [Square284x284Logo.png](./casino/src-tauri/icons/Square284x284Logo.png)
│   │   │   ├── [Square30x30Logo.png](./casino/src-tauri/icons/Square30x30Logo.png)
│   │   │   ├── [Square310x310Logo.png](./casino/src-tauri/icons/Square310x310Logo.png)
│   │   │   ├── [Square44x44Logo.png](./casino/src-tauri/icons/Square44x44Logo.png)
│   │   │   ├── [Square71x71Logo.png](./casino/src-tauri/icons/Square71x71Logo.png)
│   │   │   ├── [Square89x89Logo.png](./casino/src-tauri/icons/Square89x89Logo.png)
│   │   │   ├── [StoreLogo.png](./casino/src-tauri/icons/StoreLogo.png)
│   │   │   ├── [icon.icns](./casino/src-tauri/icons/icon.icns)
│   │   │   ├── [icon.ico](./casino/src-tauri/icons/icon.ico)
│   │   │   └── [icon.png](./casino/src-tauri/icons/icon.png)
│   │   ├── src/
│   │   │   ├── [lib.rs](./casino/src-tauri/src/lib.rs)
│   │   │   └── [main.rs](./casino/src-tauri/src/main.rs)
│   │   ├── [Cargo.lock](./casino/src-tauri/Cargo.lock)
│   │   ├── [Cargo.toml](./casino/src-tauri/Cargo.toml)
│   │   ├── [build.rs](./casino/src-tauri/build.rs)
│   │   └── [tauri.conf.json](./casino/src-tauri/tauri.conf.json)
│   ├── [Dockerfile](./casino/Dockerfile)
│   ├── [LICENSE](./casino/LICENSE)
│   ├── [README.md](./casino/README.md)
│   ├── [TREE.md](./casino/TREE.md)
│   ├── [docker-compose.yaml](./casino/docker-compose.yaml)
│   ├── [eslint.config.mts](./casino/eslint.config.mts)
│   ├── [jest.config.ts](./casino/jest.config.ts)
│   ├── [jest.setup.ts](./casino/jest.setup.ts)
│   ├── [next.config.ts](./casino/next.config.ts)
│   ├── [package.json](./casino/package.json)
│   ├── [playwright.config.ts](./casino/playwright.config.ts)
│   ├── [postcss.config.mjs](./casino/postcss.config.mjs)
│   └── [tsconfig.json](./casino/tsconfig.json)
├── countries/
│   ├── docs/
│   │   ├── [ARCHITECTURE.md](./countries/docs/ARCHITECTURE.md)
│   │   ├── [CONTRIBUTING.md](./countries/docs/CONTRIBUTING.md)
│   │   ├── [DOWNLOADS.md](./countries/docs/DOWNLOADS.md)
│   │   ├── [PACKAGING.md](./countries/docs/PACKAGING.md)
│   │   └── [ROADMAP.md](./countries/docs/ROADMAP.md)
│   ├── e2e/
│   │   └── [home.spec.ts](./countries/e2e/home.spec.ts)
│   ├── public/
│   │   ├── icons/
│   │   │   ├── [icon-128x128.png](./countries/public/icons/icon-128x128.png)
│   │   │   ├── [icon-144x144.png](./countries/public/icons/icon-144x144.png)
│   │   │   ├── [icon-152x152.png](./countries/public/icons/icon-152x152.png)
│   │   │   ├── [icon-16x16.png](./countries/public/icons/icon-16x16.png)
│   │   │   ├── [icon-180x180.png](./countries/public/icons/icon-180x180.png)
│   │   │   ├── [icon-192x192.png](./countries/public/icons/icon-192x192.png)
│   │   │   ├── [icon-256x256.png](./countries/public/icons/icon-256x256.png)
│   │   │   ├── [icon-32x32.png](./countries/public/icons/icon-32x32.png)
│   │   │   ├── [icon-384x384.png](./countries/public/icons/icon-384x384.png)
│   │   │   ├── [icon-48x48.png](./countries/public/icons/icon-48x48.png)
│   │   │   ├── [icon-512x512.png](./countries/public/icons/icon-512x512.png)
│   │   │   ├── [icon-64x64.png](./countries/public/icons/icon-64x64.png)
│   │   │   ├── [icon-72x72.png](./countries/public/icons/icon-72x72.png)
│   │   │   ├── [icon-96x96.png](./countries/public/icons/icon-96x96.png)
│   │   │   └── [icon.svg](./countries/public/icons/icon.svg)
│   │   ├── [apple-touch-icon.png](./countries/public/apple-touch-icon.png)
│   │   ├── [favicon.ico](./countries/public/favicon.ico)
│   │   ├── [manifest.json](./countries/public/manifest.json)
│   │   ├── [robots.txt](./countries/public/robots.txt)
│   │   ├── [sitemap.xml](./countries/public/sitemap.xml)
│   │   └── [sw.js](./countries/public/sw.js)
│   ├── src/
│   │   ├── app/
│   │   │   ├── (auth)/
│   │   │   │   ├── forget-password/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./countries/src/app/(auth)/forget-password/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./countries/src/app/(auth)/forget-password/page.tsx)
│   │   │   │   ├── profile/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./countries/src/app/(auth)/profile/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./countries/src/app/(auth)/profile/page.tsx)
│   │   │   │   ├── reset-password/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./countries/src/app/(auth)/reset-password/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./countries/src/app/(auth)/reset-password/page.tsx)
│   │   │   │   ├── sign-in/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./countries/src/app/(auth)/sign-in/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./countries/src/app/(auth)/sign-in/page.tsx)
│   │   │   │   └── sign-up/
│   │   │   │       ├── __tests__/
│   │   │   │       │   └── [page.test.tsx](./countries/src/app/(auth)/sign-up/__tests__/page.test.tsx)
│   │   │   │       └── [page.tsx](./countries/src/app/(auth)/sign-up/page.tsx)
│   │   │   ├── (games)/
│   │   │   │   ├── border/
│   │   │   │   │   └── [page.tsx](./countries/src/app/(games)/border/page.tsx)
│   │   │   │   ├── connections/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./countries/src/app/(games)/connections/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./countries/src/app/(games)/connections/page.tsx)
│   │   │   │   ├── continents-sort/
│   │   │   │   │   └── [page.tsx](./countries/src/app/(games)/continents-sort/page.tsx)
│   │   │   │   ├── emoji-guesser/
│   │   │   │   │   └── [page.tsx](./countries/src/app/(games)/emoji-guesser/page.tsx)
│   │   │   │   ├── flag-guesser/
│   │   │   │   │   └── [page.tsx](./countries/src/app/(games)/flag-guesser/page.tsx)
│   │   │   │   ├── higher-or-lower/
│   │   │   │   │   └── [page.tsx](./countries/src/app/(games)/higher-or-lower/page.tsx)
│   │   │   │   └── wordle/
│   │   │   │       ├── __tests__/
│   │   │   │       │   └── [page.test.tsx](./countries/src/app/(games)/wordle/__tests__/page.test.tsx)
│   │   │   │       └── [page.tsx](./countries/src/app/(games)/wordle/page.tsx)
│   │   │   ├── (info)/
│   │   │   │   ├── about/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./countries/src/app/(info)/about/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./countries/src/app/(info)/about/page.tsx)
│   │   │   │   ├── downloads/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./countries/src/app/(info)/downloads/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./countries/src/app/(info)/downloads/page.tsx)
│   │   │   │   └── version/
│   │   │   │       ├── __tests__/
│   │   │   │       │   └── [page.test.tsx](./countries/src/app/(info)/version/__tests__/page.test.tsx)
│   │   │   │       └── [page.tsx](./countries/src/app/(info)/version/page.tsx)
│   │   │   ├── __tests__/
│   │   │   │   ├── [default.test.tsx](./countries/src/app/__tests__/default.test.tsx)
│   │   │   │   ├── [error.test.tsx](./countries/src/app/__tests__/error.test.tsx)
│   │   │   │   ├── [forbidden.test.tsx](./countries/src/app/__tests__/forbidden.test.tsx)
│   │   │   │   ├── [global-error.test.tsx](./countries/src/app/__tests__/global-error.test.tsx)
│   │   │   │   ├── [layout.test.tsx](./countries/src/app/__tests__/layout.test.tsx)
│   │   │   │   ├── [loading.test.tsx](./countries/src/app/__tests__/loading.test.tsx)
│   │   │   │   ├── [not-found.test.tsx](./countries/src/app/__tests__/not-found.test.tsx)
│   │   │   │   ├── [page.test.tsx](./countries/src/app/__tests__/page.test.tsx)
│   │   │   │   ├── [robots.test.ts](./countries/src/app/__tests__/robots.test.ts)
│   │   │   │   ├── [template.test.tsx](./countries/src/app/__tests__/template.test.tsx)
│   │   │   │   └── [unauthorized.test.tsx](./countries/src/app/__tests__/unauthorized.test.tsx)
│   │   │   ├── [default.tsx](./countries/src/app/default.tsx)
│   │   │   ├── [error.tsx](./countries/src/app/error.tsx)
│   │   │   ├── [favicon.ico](./countries/src/app/favicon.ico)
│   │   │   ├── [forbidden.tsx](./countries/src/app/forbidden.tsx)
│   │   │   ├── [global-error.tsx](./countries/src/app/global-error.tsx)
│   │   │   ├── [layout.tsx](./countries/src/app/layout.tsx)
│   │   │   ├── [loading.tsx](./countries/src/app/loading.tsx)
│   │   │   ├── [not-found.tsx](./countries/src/app/not-found.tsx)
│   │   │   ├── [page.tsx](./countries/src/app/page.tsx)
│   │   │   ├── [robots.ts](./countries/src/app/robots.ts)
│   │   │   ├── [template.tsx](./countries/src/app/template.tsx)
│   │   │   └── [unauthorized.tsx](./countries/src/app/unauthorized.tsx)
│   │   ├── components/
│   │   │   ├── organisms/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [Header.test.tsx](./countries/src/components/organisms/__tests__/Header.test.tsx)
│   │   │   │   └── [Header.tsx](./countries/src/components/organisms/Header.tsx)
│   │   │   └── templates/
│   │   │       ├── __tests__/
│   │   │       │   ├── [AboutTemplate.test.tsx](./countries/src/components/templates/__tests__/AboutTemplate.test.tsx)
│   │   │       │   ├── [DownloadsTemplate.test.tsx](./countries/src/components/templates/__tests__/DownloadsTemplate.test.tsx)
│   │   │       │   ├── [ErrorTemplate.test.tsx](./countries/src/components/templates/__tests__/ErrorTemplate.test.tsx)
│   │   │       │   └── [VersionTemplate.test.tsx](./countries/src/components/templates/__tests__/VersionTemplate.test.tsx)
│   │   │       ├── [AboutTemplate.tsx](./countries/src/components/templates/AboutTemplate.tsx)
│   │   │       ├── [DownloadsTemplate.tsx](./countries/src/components/templates/DownloadsTemplate.tsx)
│   │   │       ├── [ErrorTemplate.tsx](./countries/src/components/templates/ErrorTemplate.tsx)
│   │   │       └── [VersionTemplate.tsx](./countries/src/components/templates/VersionTemplate.tsx)
│   │   ├── games/
│   │   │   ├── _shared/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [countries.test.ts](./countries/src/games/_shared/__tests__/countries.test.ts)
│   │   │   │   │   └── [quiz.test.ts](./countries/src/games/_shared/__tests__/quiz.test.ts)
│   │   │   │   ├── [borders.ts](./countries/src/games/_shared/borders.ts)
│   │   │   │   ├── [countries-data.ts](./countries/src/games/_shared/countries-data.ts)
│   │   │   │   ├── [countries.ts](./countries/src/games/_shared/countries.ts)
│   │   │   │   ├── [population.ts](./countries/src/games/_shared/population.ts)
│   │   │   │   └── [quiz.ts](./countries/src/games/_shared/quiz.ts)
│   │   │   ├── border/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [index.test.tsx](./countries/src/games/border/__tests__/index.test.tsx)
│   │   │   │   │   ├── [useBorder.test.ts](./countries/src/games/border/__tests__/useBorder.test.ts)
│   │   │   │   │   └── [utils.test.ts](./countries/src/games/border/__tests__/utils.test.ts)
│   │   │   │   ├── [index.tsx](./countries/src/games/border/index.tsx)
│   │   │   │   ├── [types.ts](./countries/src/games/border/types.ts)
│   │   │   │   ├── [useBorder.ts](./countries/src/games/border/useBorder.ts)
│   │   │   │   └── [utils.ts](./countries/src/games/border/utils.ts)
│   │   │   ├── connections/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [index.test.tsx](./countries/src/games/connections/__tests__/index.test.tsx)
│   │   │   │   │   ├── [puzzles.test.ts](./countries/src/games/connections/__tests__/puzzles.test.ts)
│   │   │   │   │   ├── [useConnections.test.ts](./countries/src/games/connections/__tests__/useConnections.test.ts)
│   │   │   │   │   └── [utils.test.ts](./countries/src/games/connections/__tests__/utils.test.ts)
│   │   │   │   ├── [index.tsx](./countries/src/games/connections/index.tsx)
│   │   │   │   ├── [puzzles.ts](./countries/src/games/connections/puzzles.ts)
│   │   │   │   ├── [types.ts](./countries/src/games/connections/types.ts)
│   │   │   │   ├── [useConnections.ts](./countries/src/games/connections/useConnections.ts)
│   │   │   │   └── [utils.ts](./countries/src/games/connections/utils.ts)
│   │   │   ├── continents-sort/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [index.test.tsx](./countries/src/games/continents-sort/__tests__/index.test.tsx)
│   │   │   │   │   ├── [useContinentsSort.test.ts](./countries/src/games/continents-sort/__tests__/useContinentsSort.test.ts)
│   │   │   │   │   └── [utils.test.ts](./countries/src/games/continents-sort/__tests__/utils.test.ts)
│   │   │   │   ├── [index.tsx](./countries/src/games/continents-sort/index.tsx)
│   │   │   │   ├── [types.ts](./countries/src/games/continents-sort/types.ts)
│   │   │   │   ├── [useContinentsSort.ts](./countries/src/games/continents-sort/useContinentsSort.ts)
│   │   │   │   └── [utils.ts](./countries/src/games/continents-sort/utils.ts)
│   │   │   ├── emoji-guesser/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [index.test.tsx](./countries/src/games/emoji-guesser/__tests__/index.test.tsx)
│   │   │   │   │   ├── [useEmojiGuesser.test.ts](./countries/src/games/emoji-guesser/__tests__/useEmojiGuesser.test.ts)
│   │   │   │   │   └── [utils.test.ts](./countries/src/games/emoji-guesser/__tests__/utils.test.ts)
│   │   │   │   ├── [index.tsx](./countries/src/games/emoji-guesser/index.tsx)
│   │   │   │   ├── [types.ts](./countries/src/games/emoji-guesser/types.ts)
│   │   │   │   ├── [useEmojiGuesser.ts](./countries/src/games/emoji-guesser/useEmojiGuesser.ts)
│   │   │   │   └── [utils.ts](./countries/src/games/emoji-guesser/utils.ts)
│   │   │   ├── flag-guesser/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [index.test.tsx](./countries/src/games/flag-guesser/__tests__/index.test.tsx)
│   │   │   │   │   ├── [useFlagGuesser.test.ts](./countries/src/games/flag-guesser/__tests__/useFlagGuesser.test.ts)
│   │   │   │   │   └── [utils.test.ts](./countries/src/games/flag-guesser/__tests__/utils.test.ts)
│   │   │   │   ├── [index.tsx](./countries/src/games/flag-guesser/index.tsx)
│   │   │   │   ├── [types.ts](./countries/src/games/flag-guesser/types.ts)
│   │   │   │   ├── [useFlagGuesser.ts](./countries/src/games/flag-guesser/useFlagGuesser.ts)
│   │   │   │   └── [utils.ts](./countries/src/games/flag-guesser/utils.ts)
│   │   │   ├── higher-or-lower/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [index.test.tsx](./countries/src/games/higher-or-lower/__tests__/index.test.tsx)
│   │   │   │   │   ├── [useHigherOrLower.test.ts](./countries/src/games/higher-or-lower/__tests__/useHigherOrLower.test.ts)
│   │   │   │   │   └── [utils.test.ts](./countries/src/games/higher-or-lower/__tests__/utils.test.ts)
│   │   │   │   ├── [index.tsx](./countries/src/games/higher-or-lower/index.tsx)
│   │   │   │   ├── [types.ts](./countries/src/games/higher-or-lower/types.ts)
│   │   │   │   ├── [useHigherOrLower.ts](./countries/src/games/higher-or-lower/useHigherOrLower.ts)
│   │   │   │   └── [utils.ts](./countries/src/games/higher-or-lower/utils.ts)
│   │   │   └── wordle/
│   │   │       ├── __tests__/
│   │   │       │   ├── [index.test.tsx](./countries/src/games/wordle/__tests__/index.test.tsx)
│   │   │       │   ├── [useWordle.test.ts](./countries/src/games/wordle/__tests__/useWordle.test.ts)
│   │   │       │   └── [utils.test.ts](./countries/src/games/wordle/__tests__/utils.test.ts)
│   │   │       ├── [index.tsx](./countries/src/games/wordle/index.tsx)
│   │   │       ├── [types.ts](./countries/src/games/wordle/types.ts)
│   │   │       ├── [useWordle.ts](./countries/src/games/wordle/useWordle.ts)
│   │   │       └── [utils.ts](./countries/src/games/wordle/utils.ts)
│   │   └── styles/
│   │       ├── [base.css](./countries/src/styles/base.css)
│   │       ├── [globals.css](./countries/src/styles/globals.css)
│   │       └── [themes.css](./countries/src/styles/themes.css)
│   ├── src-tauri/
│   │   ├── capabilities/
│   │   │   └── [default.json](./countries/src-tauri/capabilities/default.json)
│   │   ├── icons/
│   │   │   ├── [128x128.png](./countries/src-tauri/icons/128x128.png)
│   │   │   ├── [128x128@2x.png](./countries/src-tauri/icons/128x128@2x.png)
│   │   │   ├── [32x32.png](./countries/src-tauri/icons/32x32.png)
│   │   │   ├── [Square107x107Logo.png](./countries/src-tauri/icons/Square107x107Logo.png)
│   │   │   ├── [Square142x142Logo.png](./countries/src-tauri/icons/Square142x142Logo.png)
│   │   │   ├── [Square150x150Logo.png](./countries/src-tauri/icons/Square150x150Logo.png)
│   │   │   ├── [Square284x284Logo.png](./countries/src-tauri/icons/Square284x284Logo.png)
│   │   │   ├── [Square30x30Logo.png](./countries/src-tauri/icons/Square30x30Logo.png)
│   │   │   ├── [Square310x310Logo.png](./countries/src-tauri/icons/Square310x310Logo.png)
│   │   │   ├── [Square44x44Logo.png](./countries/src-tauri/icons/Square44x44Logo.png)
│   │   │   ├── [Square71x71Logo.png](./countries/src-tauri/icons/Square71x71Logo.png)
│   │   │   ├── [Square89x89Logo.png](./countries/src-tauri/icons/Square89x89Logo.png)
│   │   │   ├── [StoreLogo.png](./countries/src-tauri/icons/StoreLogo.png)
│   │   │   ├── [icon.icns](./countries/src-tauri/icons/icon.icns)
│   │   │   ├── [icon.ico](./countries/src-tauri/icons/icon.ico)
│   │   │   └── [icon.png](./countries/src-tauri/icons/icon.png)
│   │   ├── src/
│   │   │   ├── [lib.rs](./countries/src-tauri/src/lib.rs)
│   │   │   └── [main.rs](./countries/src-tauri/src/main.rs)
│   │   ├── [Cargo.lock](./countries/src-tauri/Cargo.lock)
│   │   ├── [Cargo.toml](./countries/src-tauri/Cargo.toml)
│   │   ├── [build.rs](./countries/src-tauri/build.rs)
│   │   └── [tauri.conf.json](./countries/src-tauri/tauri.conf.json)
│   ├── [Dockerfile](./countries/Dockerfile)
│   ├── [LICENSE](./countries/LICENSE)
│   ├── [README.md](./countries/README.md)
│   ├── [TREE.md](./countries/TREE.md)
│   ├── [docker-compose.yaml](./countries/docker-compose.yaml)
│   ├── [eslint.config.mts](./countries/eslint.config.mts)
│   ├── [jest.config.ts](./countries/jest.config.ts)
│   ├── [jest.setup.ts](./countries/jest.setup.ts)
│   ├── [next.config.ts](./countries/next.config.ts)
│   ├── [package.json](./countries/package.json)
│   ├── [playwright.config.ts](./countries/playwright.config.ts)
│   ├── [postcss.config.mjs](./countries/postcss.config.mjs)
│   └── [tsconfig.json](./countries/tsconfig.json)
├── memory/
│   ├── docs/
│   │   ├── [ARCHITECTURE.md](./memory/docs/ARCHITECTURE.md)
│   │   ├── [CONTRIBUTING.md](./memory/docs/CONTRIBUTING.md)
│   │   ├── [DOWNLOADS.md](./memory/docs/DOWNLOADS.md)
│   │   ├── [PACKAGING.md](./memory/docs/PACKAGING.md)
│   │   └── [ROADMAP.md](./memory/docs/ROADMAP.md)
│   ├── e2e/
│   │   └── [home.spec.ts](./memory/e2e/home.spec.ts)
│   ├── public/
│   │   ├── icons/
│   │   │   ├── [icon-128x128.png](./memory/public/icons/icon-128x128.png)
│   │   │   ├── [icon-144x144.png](./memory/public/icons/icon-144x144.png)
│   │   │   ├── [icon-152x152.png](./memory/public/icons/icon-152x152.png)
│   │   │   ├── [icon-16x16.png](./memory/public/icons/icon-16x16.png)
│   │   │   ├── [icon-180x180.png](./memory/public/icons/icon-180x180.png)
│   │   │   ├── [icon-192x192.png](./memory/public/icons/icon-192x192.png)
│   │   │   ├── [icon-256x256.png](./memory/public/icons/icon-256x256.png)
│   │   │   ├── [icon-32x32.png](./memory/public/icons/icon-32x32.png)
│   │   │   ├── [icon-384x384.png](./memory/public/icons/icon-384x384.png)
│   │   │   ├── [icon-48x48.png](./memory/public/icons/icon-48x48.png)
│   │   │   ├── [icon-512x512.png](./memory/public/icons/icon-512x512.png)
│   │   │   ├── [icon-64x64.png](./memory/public/icons/icon-64x64.png)
│   │   │   ├── [icon-72x72.png](./memory/public/icons/icon-72x72.png)
│   │   │   ├── [icon-96x96.png](./memory/public/icons/icon-96x96.png)
│   │   │   └── [icon.svg](./memory/public/icons/icon.svg)
│   │   ├── [apple-touch-icon.png](./memory/public/apple-touch-icon.png)
│   │   ├── [favicon.ico](./memory/public/favicon.ico)
│   │   ├── [manifest.json](./memory/public/manifest.json)
│   │   ├── [robots.txt](./memory/public/robots.txt)
│   │   ├── [sitemap.xml](./memory/public/sitemap.xml)
│   │   └── [sw.js](./memory/public/sw.js)
│   ├── src/
│   │   ├── app/
│   │   │   ├── (auth)/
│   │   │   │   ├── forget-password/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./memory/src/app/(auth)/forget-password/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./memory/src/app/(auth)/forget-password/page.tsx)
│   │   │   │   ├── profile/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./memory/src/app/(auth)/profile/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./memory/src/app/(auth)/profile/page.tsx)
│   │   │   │   ├── reset-password/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./memory/src/app/(auth)/reset-password/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./memory/src/app/(auth)/reset-password/page.tsx)
│   │   │   │   ├── sign-in/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./memory/src/app/(auth)/sign-in/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./memory/src/app/(auth)/sign-in/page.tsx)
│   │   │   │   └── sign-up/
│   │   │   │       ├── __tests__/
│   │   │   │       │   └── [page.test.tsx](./memory/src/app/(auth)/sign-up/__tests__/page.test.tsx)
│   │   │   │       └── [page.tsx](./memory/src/app/(auth)/sign-up/page.tsx)
│   │   │   ├── (games)/
│   │   │   │   ├── memory-match/
│   │   │   │   │   └── [page.tsx](./memory/src/app/(games)/memory-match/page.tsx)
│   │   │   │   ├── n-back/
│   │   │   │   │   └── [page.tsx](./memory/src/app/(games)/n-back/page.tsx)
│   │   │   │   ├── pi/
│   │   │   │   │   └── [page.tsx](./memory/src/app/(games)/pi/page.tsx)
│   │   │   │   ├── recall/
│   │   │   │   │   └── [page.tsx](./memory/src/app/(games)/recall/page.tsx)
│   │   │   │   └── [page.tsx](./memory/src/app/(games)/page.tsx)
│   │   │   ├── (info)/
│   │   │   │   ├── about/
│   │   │   │   │   └── [page.tsx](./memory/src/app/(info)/about/page.tsx)
│   │   │   │   ├── downloads/
│   │   │   │   │   └── [page.tsx](./memory/src/app/(info)/downloads/page.tsx)
│   │   │   │   └── version/
│   │   │   │       └── [page.tsx](./memory/src/app/(info)/version/page.tsx)
│   │   │   ├── __tests__/
│   │   │   │   ├── [default.test.tsx](./memory/src/app/__tests__/default.test.tsx)
│   │   │   │   ├── [error.test.tsx](./memory/src/app/__tests__/error.test.tsx)
│   │   │   │   ├── [forbidden.test.tsx](./memory/src/app/__tests__/forbidden.test.tsx)
│   │   │   │   ├── [global-error.test.tsx](./memory/src/app/__tests__/global-error.test.tsx)
│   │   │   │   ├── [layout.test.tsx](./memory/src/app/__tests__/layout.test.tsx)
│   │   │   │   ├── [loading.test.tsx](./memory/src/app/__tests__/loading.test.tsx)
│   │   │   │   ├── [not-found.test.tsx](./memory/src/app/__tests__/not-found.test.tsx)
│   │   │   │   ├── [robots.test.ts](./memory/src/app/__tests__/robots.test.ts)
│   │   │   │   ├── [template.test.tsx](./memory/src/app/__tests__/template.test.tsx)
│   │   │   │   └── [unauthorized.test.tsx](./memory/src/app/__tests__/unauthorized.test.tsx)
│   │   │   ├── [default.tsx](./memory/src/app/default.tsx)
│   │   │   ├── [error.tsx](./memory/src/app/error.tsx)
│   │   │   ├── [forbidden.tsx](./memory/src/app/forbidden.tsx)
│   │   │   ├── [global-error.tsx](./memory/src/app/global-error.tsx)
│   │   │   ├── [layout.tsx](./memory/src/app/layout.tsx)
│   │   │   ├── [loading.tsx](./memory/src/app/loading.tsx)
│   │   │   ├── [not-found.tsx](./memory/src/app/not-found.tsx)
│   │   │   ├── [robots.ts](./memory/src/app/robots.ts)
│   │   │   ├── [template.tsx](./memory/src/app/template.tsx)
│   │   │   └── [unauthorized.tsx](./memory/src/app/unauthorized.tsx)
│   │   ├── components/
│   │   │   ├── organisms/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [Header.test.tsx](./memory/src/components/organisms/__tests__/Header.test.tsx)
│   │   │   │   └── [Header.tsx](./memory/src/components/organisms/Header.tsx)
│   │   │   └── templates/
│   │   │       ├── __tests__/
│   │   │       │   ├── [AboutTemplate.test.tsx](./memory/src/components/templates/__tests__/AboutTemplate.test.tsx)
│   │   │       │   ├── [DownloadsTemplate.test.tsx](./memory/src/components/templates/__tests__/DownloadsTemplate.test.tsx)
│   │   │       │   ├── [ErrorTemplate.test.tsx](./memory/src/components/templates/__tests__/ErrorTemplate.test.tsx)
│   │   │       │   └── [VersionTemplate.test.tsx](./memory/src/components/templates/__tests__/VersionTemplate.test.tsx)
│   │   │       ├── [AboutTemplate.tsx](./memory/src/components/templates/AboutTemplate.tsx)
│   │   │       ├── [DownloadsTemplate.tsx](./memory/src/components/templates/DownloadsTemplate.tsx)
│   │   │       ├── [ErrorTemplate.tsx](./memory/src/components/templates/ErrorTemplate.tsx)
│   │   │       └── [VersionTemplate.tsx](./memory/src/components/templates/VersionTemplate.tsx)
│   │   ├── data/
│   │   │   └── [pi.ts](./memory/src/data/pi.ts)
│   │   ├── games/
│   │   │   ├── MemoryMatch/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [MemoryMatch.test.tsx](./memory/src/games/MemoryMatch/__tests__/MemoryMatch.test.tsx)
│   │   │   │   │   ├── [useMemoryMatch.test.ts](./memory/src/games/MemoryMatch/__tests__/useMemoryMatch.test.ts)
│   │   │   │   │   └── [utils.test.ts](./memory/src/games/MemoryMatch/__tests__/utils.test.ts)
│   │   │   │   ├── [index.tsx](./memory/src/games/MemoryMatch/index.tsx)
│   │   │   │   ├── [useMemoryMatch.ts](./memory/src/games/MemoryMatch/useMemoryMatch.ts)
│   │   │   │   └── [utils.ts](./memory/src/games/MemoryMatch/utils.ts)
│   │   │   ├── NBack/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [NBack.test.tsx](./memory/src/games/NBack/__tests__/NBack.test.tsx)
│   │   │   │   │   └── [constants.test.ts](./memory/src/games/NBack/__tests__/constants.test.ts)
│   │   │   │   ├── [constants.ts](./memory/src/games/NBack/constants.ts)
│   │   │   │   └── [index.tsx](./memory/src/games/NBack/index.tsx)
│   │   │   ├── PiNumber/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [Pi.test.tsx](./memory/src/games/PiNumber/__tests__/Pi.test.tsx)
│   │   │   │   │   ├── [constants.test.ts](./memory/src/games/PiNumber/__tests__/constants.test.ts)
│   │   │   │   │   ├── [keyHandlers.test.ts](./memory/src/games/PiNumber/__tests__/keyHandlers.test.ts)
│   │   │   │   │   └── [usePiGame.test.ts](./memory/src/games/PiNumber/__tests__/usePiGame.test.ts)
│   │   │   │   ├── [constants.ts](./memory/src/games/PiNumber/constants.ts)
│   │   │   │   ├── [index.tsx](./memory/src/games/PiNumber/index.tsx)
│   │   │   │   ├── [keyHandlers.ts](./memory/src/games/PiNumber/keyHandlers.ts)
│   │   │   │   └── [usePiGame.ts](./memory/src/games/PiNumber/usePiGame.ts)
│   │   │   └── Recall/
│   │   │       ├── __tests__/
│   │   │       │   ├── [Recall.test.tsx](./memory/src/games/Recall/__tests__/Recall.test.tsx)
│   │   │       │   ├── [constants.test.ts](./memory/src/games/Recall/__tests__/constants.test.ts)
│   │   │       │   ├── [useHighStreak.test.ts](./memory/src/games/Recall/__tests__/useHighStreak.test.ts)
│   │   │       │   └── [useRecall.test.ts](./memory/src/games/Recall/__tests__/useRecall.test.ts)
│   │   │       ├── [constants.ts](./memory/src/games/Recall/constants.ts)
│   │   │       ├── [index.tsx](./memory/src/games/Recall/index.tsx)
│   │   │       ├── [useHighStreak.ts](./memory/src/games/Recall/useHighStreak.ts)
│   │   │       └── [useRecall.ts](./memory/src/games/Recall/useRecall.ts)
│   │   └── styles/
│   │       ├── [base.css](./memory/src/styles/base.css)
│   │       ├── [globals.css](./memory/src/styles/globals.css)
│   │       └── [themes.css](./memory/src/styles/themes.css)
│   ├── src-tauri/
│   │   ├── capabilities/
│   │   │   └── [default.json](./memory/src-tauri/capabilities/default.json)
│   │   ├── icons/
│   │   │   ├── [128x128.png](./memory/src-tauri/icons/128x128.png)
│   │   │   ├── [128x128@2x.png](./memory/src-tauri/icons/128x128@2x.png)
│   │   │   ├── [32x32.png](./memory/src-tauri/icons/32x32.png)
│   │   │   ├── [Square107x107Logo.png](./memory/src-tauri/icons/Square107x107Logo.png)
│   │   │   ├── [Square142x142Logo.png](./memory/src-tauri/icons/Square142x142Logo.png)
│   │   │   ├── [Square150x150Logo.png](./memory/src-tauri/icons/Square150x150Logo.png)
│   │   │   ├── [Square284x284Logo.png](./memory/src-tauri/icons/Square284x284Logo.png)
│   │   │   ├── [Square30x30Logo.png](./memory/src-tauri/icons/Square30x30Logo.png)
│   │   │   ├── [Square310x310Logo.png](./memory/src-tauri/icons/Square310x310Logo.png)
│   │   │   ├── [Square44x44Logo.png](./memory/src-tauri/icons/Square44x44Logo.png)
│   │   │   ├── [Square71x71Logo.png](./memory/src-tauri/icons/Square71x71Logo.png)
│   │   │   ├── [Square89x89Logo.png](./memory/src-tauri/icons/Square89x89Logo.png)
│   │   │   ├── [StoreLogo.png](./memory/src-tauri/icons/StoreLogo.png)
│   │   │   ├── [icon.icns](./memory/src-tauri/icons/icon.icns)
│   │   │   ├── [icon.ico](./memory/src-tauri/icons/icon.ico)
│   │   │   └── [icon.png](./memory/src-tauri/icons/icon.png)
│   │   ├── src/
│   │   │   ├── [lib.rs](./memory/src-tauri/src/lib.rs)
│   │   │   └── [main.rs](./memory/src-tauri/src/main.rs)
│   │   ├── [Cargo.lock](./memory/src-tauri/Cargo.lock)
│   │   ├── [Cargo.toml](./memory/src-tauri/Cargo.toml)
│   │   ├── [build.rs](./memory/src-tauri/build.rs)
│   │   └── [tauri.conf.json](./memory/src-tauri/tauri.conf.json)
│   ├── [Dockerfile](./memory/Dockerfile)
│   ├── [LICENSE](./memory/LICENSE)
│   ├── [README.md](./memory/README.md)
│   ├── [TREE.md](./memory/TREE.md)
│   ├── [docker-compose.yaml](./memory/docker-compose.yaml)
│   ├── [eslint.config.mts](./memory/eslint.config.mts)
│   ├── [jest.config.ts](./memory/jest.config.ts)
│   ├── [jest.setup.ts](./memory/jest.setup.ts)
│   ├── [next.config.ts](./memory/next.config.ts)
│   ├── [package.json](./memory/package.json)
│   ├── [playwright.config.ts](./memory/playwright.config.ts)
│   ├── [postcss.config.mjs](./memory/postcss.config.mjs)
│   └── [tsconfig.json](./memory/tsconfig.json)
├── nikoli/
│   ├── docs/
│   │   ├── [ARCHITECTURE.md](./nikoli/docs/ARCHITECTURE.md)
│   │   ├── [CONTRIBUTING.md](./nikoli/docs/CONTRIBUTING.md)
│   │   ├── [DOWNLOADS.md](./nikoli/docs/DOWNLOADS.md)
│   │   ├── [PACKAGING.md](./nikoli/docs/PACKAGING.md)
│   │   └── [ROADMAP.md](./nikoli/docs/ROADMAP.md)
│   ├── e2e/
│   │   ├── [fillomino.spec.ts](./nikoli/e2e/fillomino.spec.ts)
│   │   ├── [heyawake.spec.ts](./nikoli/e2e/heyawake.spec.ts)
│   │   ├── [home.spec.ts](./nikoli/e2e/home.spec.ts)
│   │   ├── [masyu.spec.ts](./nikoli/e2e/masyu.spec.ts)
│   │   ├── [navigation.spec.ts](./nikoli/e2e/navigation.spec.ts)
│   │   ├── [norinori.spec.ts](./nikoli/e2e/norinori.spec.ts)
│   │   ├── [nurikabe.spec.ts](./nikoli/e2e/nurikabe.spec.ts)
│   │   ├── [shikaku.spec.ts](./nikoli/e2e/shikaku.spec.ts)
│   │   └── [sudoku.spec.ts](./nikoli/e2e/sudoku.spec.ts)
│   ├── public/
│   │   ├── icons/
│   │   │   ├── [icon-128x128.png](./nikoli/public/icons/icon-128x128.png)
│   │   │   ├── [icon-144x144.png](./nikoli/public/icons/icon-144x144.png)
│   │   │   ├── [icon-152x152.png](./nikoli/public/icons/icon-152x152.png)
│   │   │   ├── [icon-16x16.png](./nikoli/public/icons/icon-16x16.png)
│   │   │   ├── [icon-180x180.png](./nikoli/public/icons/icon-180x180.png)
│   │   │   ├── [icon-192x192.png](./nikoli/public/icons/icon-192x192.png)
│   │   │   ├── [icon-256x256.png](./nikoli/public/icons/icon-256x256.png)
│   │   │   ├── [icon-32x32.png](./nikoli/public/icons/icon-32x32.png)
│   │   │   ├── [icon-384x384.png](./nikoli/public/icons/icon-384x384.png)
│   │   │   ├── [icon-48x48.png](./nikoli/public/icons/icon-48x48.png)
│   │   │   ├── [icon-512x512.png](./nikoli/public/icons/icon-512x512.png)
│   │   │   ├── [icon-64x64.png](./nikoli/public/icons/icon-64x64.png)
│   │   │   ├── [icon-72x72.png](./nikoli/public/icons/icon-72x72.png)
│   │   │   ├── [icon-96x96.png](./nikoli/public/icons/icon-96x96.png)
│   │   │   └── [icon.svg](./nikoli/public/icons/icon.svg)
│   │   ├── [apple-touch-icon.png](./nikoli/public/apple-touch-icon.png)
│   │   ├── [favicon.ico](./nikoli/public/favicon.ico)
│   │   ├── [manifest.json](./nikoli/public/manifest.json)
│   │   ├── [robots.txt](./nikoli/public/robots.txt)
│   │   ├── [sitemap.xml](./nikoli/public/sitemap.xml)
│   │   └── [sw.js](./nikoli/public/sw.js)
│   ├── src/
│   │   ├── app/
│   │   │   ├── (auth)/
│   │   │   │   ├── forget-password/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./nikoli/src/app/(auth)/forget-password/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./nikoli/src/app/(auth)/forget-password/page.tsx)
│   │   │   │   ├── profile/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./nikoli/src/app/(auth)/profile/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./nikoli/src/app/(auth)/profile/page.tsx)
│   │   │   │   ├── reset-password/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./nikoli/src/app/(auth)/reset-password/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./nikoli/src/app/(auth)/reset-password/page.tsx)
│   │   │   │   ├── sign-in/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./nikoli/src/app/(auth)/sign-in/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./nikoli/src/app/(auth)/sign-in/page.tsx)
│   │   │   │   └── sign-up/
│   │   │   │       ├── __tests__/
│   │   │   │       │   └── [page.test.tsx](./nikoli/src/app/(auth)/sign-up/__tests__/page.test.tsx)
│   │   │   │       └── [page.tsx](./nikoli/src/app/(auth)/sign-up/page.tsx)
│   │   │   ├── (games)/
│   │   │   │   ├── fillomino/
│   │   │   │   │   └── [page.tsx](./nikoli/src/app/(games)/fillomino/page.tsx)
│   │   │   │   ├── heyawake/
│   │   │   │   │   └── [page.tsx](./nikoli/src/app/(games)/heyawake/page.tsx)
│   │   │   │   ├── masyu/
│   │   │   │   │   └── [page.tsx](./nikoli/src/app/(games)/masyu/page.tsx)
│   │   │   │   ├── norinori/
│   │   │   │   │   └── [page.tsx](./nikoli/src/app/(games)/norinori/page.tsx)
│   │   │   │   ├── nurikabe/
│   │   │   │   │   └── [page.tsx](./nikoli/src/app/(games)/nurikabe/page.tsx)
│   │   │   │   ├── shikaku/
│   │   │   │   │   └── [page.tsx](./nikoli/src/app/(games)/shikaku/page.tsx)
│   │   │   │   └── sudoku/
│   │   │   │       └── [page.tsx](./nikoli/src/app/(games)/sudoku/page.tsx)
│   │   │   ├── (info)/
│   │   │   │   ├── about/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./nikoli/src/app/(info)/about/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./nikoli/src/app/(info)/about/page.tsx)
│   │   │   │   ├── downloads/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./nikoli/src/app/(info)/downloads/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./nikoli/src/app/(info)/downloads/page.tsx)
│   │   │   │   └── version/
│   │   │   │       ├── __tests__/
│   │   │   │       │   └── [page.test.tsx](./nikoli/src/app/(info)/version/__tests__/page.test.tsx)
│   │   │   │       └── [page.tsx](./nikoli/src/app/(info)/version/page.tsx)
│   │   │   ├── __tests__/
│   │   │   │   ├── [default.test.tsx](./nikoli/src/app/__tests__/default.test.tsx)
│   │   │   │   ├── [error.test.tsx](./nikoli/src/app/__tests__/error.test.tsx)
│   │   │   │   ├── [forbidden.test.tsx](./nikoli/src/app/__tests__/forbidden.test.tsx)
│   │   │   │   ├── [global-error.test.tsx](./nikoli/src/app/__tests__/global-error.test.tsx)
│   │   │   │   ├── [layout.test.tsx](./nikoli/src/app/__tests__/layout.test.tsx)
│   │   │   │   ├── [loading.test.tsx](./nikoli/src/app/__tests__/loading.test.tsx)
│   │   │   │   ├── [not-found.test.tsx](./nikoli/src/app/__tests__/not-found.test.tsx)
│   │   │   │   ├── [page.test.tsx](./nikoli/src/app/__tests__/page.test.tsx)
│   │   │   │   ├── [robots.test.ts](./nikoli/src/app/__tests__/robots.test.ts)
│   │   │   │   ├── [template.test.tsx](./nikoli/src/app/__tests__/template.test.tsx)
│   │   │   │   └── [unauthorized.test.tsx](./nikoli/src/app/__tests__/unauthorized.test.tsx)
│   │   │   ├── [default.tsx](./nikoli/src/app/default.tsx)
│   │   │   ├── [error.tsx](./nikoli/src/app/error.tsx)
│   │   │   ├── [favicon.ico](./nikoli/src/app/favicon.ico)
│   │   │   ├── [forbidden.tsx](./nikoli/src/app/forbidden.tsx)
│   │   │   ├── [global-error.tsx](./nikoli/src/app/global-error.tsx)
│   │   │   ├── [layout.tsx](./nikoli/src/app/layout.tsx)
│   │   │   ├── [loading.tsx](./nikoli/src/app/loading.tsx)
│   │   │   ├── [not-found.tsx](./nikoli/src/app/not-found.tsx)
│   │   │   ├── [page.tsx](./nikoli/src/app/page.tsx)
│   │   │   ├── [robots.ts](./nikoli/src/app/robots.ts)
│   │   │   ├── [template.tsx](./nikoli/src/app/template.tsx)
│   │   │   └── [unauthorized.tsx](./nikoli/src/app/unauthorized.tsx)
│   │   ├── components/
│   │   │   ├── organisms/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [Header.test.tsx](./nikoli/src/components/organisms/__tests__/Header.test.tsx)
│   │   │   │   └── [Header.tsx](./nikoli/src/components/organisms/Header.tsx)
│   │   │   └── templates/
│   │   │       ├── __tests__/
│   │   │       │   ├── [AboutTemplate.test.tsx](./nikoli/src/components/templates/__tests__/AboutTemplate.test.tsx)
│   │   │       │   ├── [DownloadsTemplate.test.tsx](./nikoli/src/components/templates/__tests__/DownloadsTemplate.test.tsx)
│   │   │       │   ├── [ErrorTemplate.test.tsx](./nikoli/src/components/templates/__tests__/ErrorTemplate.test.tsx)
│   │   │       │   └── [VersionTemplate.test.tsx](./nikoli/src/components/templates/__tests__/VersionTemplate.test.tsx)
│   │   │       ├── [AboutTemplate.tsx](./nikoli/src/components/templates/AboutTemplate.tsx)
│   │   │       ├── [DownloadsTemplate.tsx](./nikoli/src/components/templates/DownloadsTemplate.tsx)
│   │   │       ├── [ErrorTemplate.tsx](./nikoli/src/components/templates/ErrorTemplate.tsx)
│   │   │       └── [VersionTemplate.tsx](./nikoli/src/components/templates/VersionTemplate.tsx)
│   │   ├── games/
│   │   │   ├── Fillomino/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [Fillomino.test.tsx](./nikoli/src/games/Fillomino/__tests__/Fillomino.test.tsx)
│   │   │   │   │   ├── [useFillomino.test.ts](./nikoli/src/games/Fillomino/__tests__/useFillomino.test.ts)
│   │   │   │   │   └── [utils.test.ts](./nikoli/src/games/Fillomino/__tests__/utils.test.ts)
│   │   │   │   ├── [index.tsx](./nikoli/src/games/Fillomino/index.tsx)
│   │   │   │   ├── [types.ts](./nikoli/src/games/Fillomino/types.ts)
│   │   │   │   ├── [useFillomino.ts](./nikoli/src/games/Fillomino/useFillomino.ts)
│   │   │   │   └── [utils.ts](./nikoli/src/games/Fillomino/utils.ts)
│   │   │   ├── Heyawake/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [Heyawake.test.tsx](./nikoli/src/games/Heyawake/__tests__/Heyawake.test.tsx)
│   │   │   │   │   ├── [useHeyawake.test.ts](./nikoli/src/games/Heyawake/__tests__/useHeyawake.test.ts)
│   │   │   │   │   └── [utils.test.ts](./nikoli/src/games/Heyawake/__tests__/utils.test.ts)
│   │   │   │   ├── [index.tsx](./nikoli/src/games/Heyawake/index.tsx)
│   │   │   │   ├── [types.ts](./nikoli/src/games/Heyawake/types.ts)
│   │   │   │   ├── [useHeyawake.ts](./nikoli/src/games/Heyawake/useHeyawake.ts)
│   │   │   │   └── [utils.ts](./nikoli/src/games/Heyawake/utils.ts)
│   │   │   ├── Masyu/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [Masyu.test.tsx](./nikoli/src/games/Masyu/__tests__/Masyu.test.tsx)
│   │   │   │   │   ├── [useMasyu.test.ts](./nikoli/src/games/Masyu/__tests__/useMasyu.test.ts)
│   │   │   │   │   └── [utils.test.ts](./nikoli/src/games/Masyu/__tests__/utils.test.ts)
│   │   │   │   ├── [AGENTS.md](./nikoli/src/games/Masyu/AGENTS.md)
│   │   │   │   ├── [index.tsx](./nikoli/src/games/Masyu/index.tsx)
│   │   │   │   ├── [types.ts](./nikoli/src/games/Masyu/types.ts)
│   │   │   │   ├── [useMasyu.ts](./nikoli/src/games/Masyu/useMasyu.ts)
│   │   │   │   └── [utils.ts](./nikoli/src/games/Masyu/utils.ts)
│   │   │   ├── Norinori/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [Norinori.test.tsx](./nikoli/src/games/Norinori/__tests__/Norinori.test.tsx)
│   │   │   │   │   ├── [useNorinori.test.ts](./nikoli/src/games/Norinori/__tests__/useNorinori.test.ts)
│   │   │   │   │   └── [utils.test.ts](./nikoli/src/games/Norinori/__tests__/utils.test.ts)
│   │   │   │   ├── [index.tsx](./nikoli/src/games/Norinori/index.tsx)
│   │   │   │   ├── [types.ts](./nikoli/src/games/Norinori/types.ts)
│   │   │   │   ├── [useNorinori.ts](./nikoli/src/games/Norinori/useNorinori.ts)
│   │   │   │   └── [utils.ts](./nikoli/src/games/Norinori/utils.ts)
│   │   │   ├── Nurikabe/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [Nurikabe.test.tsx](./nikoli/src/games/Nurikabe/__tests__/Nurikabe.test.tsx)
│   │   │   │   │   ├── [useNurikabe.test.ts](./nikoli/src/games/Nurikabe/__tests__/useNurikabe.test.ts)
│   │   │   │   │   └── [utils.test.ts](./nikoli/src/games/Nurikabe/__tests__/utils.test.ts)
│   │   │   │   ├── [index.tsx](./nikoli/src/games/Nurikabe/index.tsx)
│   │   │   │   ├── [types.ts](./nikoli/src/games/Nurikabe/types.ts)
│   │   │   │   ├── [useNurikabe.ts](./nikoli/src/games/Nurikabe/useNurikabe.ts)
│   │   │   │   └── [utils.ts](./nikoli/src/games/Nurikabe/utils.ts)
│   │   │   ├── Shikaku/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [Shikaku.test.tsx](./nikoli/src/games/Shikaku/__tests__/Shikaku.test.tsx)
│   │   │   │   │   ├── [useShikaku.test.ts](./nikoli/src/games/Shikaku/__tests__/useShikaku.test.ts)
│   │   │   │   │   └── [utils.test.ts](./nikoli/src/games/Shikaku/__tests__/utils.test.ts)
│   │   │   │   ├── [index.tsx](./nikoli/src/games/Shikaku/index.tsx)
│   │   │   │   ├── [types.ts](./nikoli/src/games/Shikaku/types.ts)
│   │   │   │   ├── [useShikaku.ts](./nikoli/src/games/Shikaku/useShikaku.ts)
│   │   │   │   └── [utils.ts](./nikoli/src/games/Shikaku/utils.ts)
│   │   │   ├── Sudoku/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── __snapshots__/
│   │   │   │   │   │   └── [index.test.tsx.snap](./nikoli/src/games/Sudoku/__tests__/__snapshots__/index.test.tsx.snap)
│   │   │   │   │   ├── [index.test.tsx](./nikoli/src/games/Sudoku/__tests__/index.test.tsx)
│   │   │   │   │   └── [useSudoku.test.ts](./nikoli/src/games/Sudoku/__tests__/useSudoku.test.ts)
│   │   │   │   ├── utils/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [sudoku.test.ts](./nikoli/src/games/Sudoku/utils/__tests__/sudoku.test.ts)
│   │   │   │   │   └── [sudoku.ts](./nikoli/src/games/Sudoku/utils/sudoku.ts)
│   │   │   │   ├── [index.tsx](./nikoli/src/games/Sudoku/index.tsx)
│   │   │   │   ├── [types.ts](./nikoli/src/games/Sudoku/types.ts)
│   │   │   │   └── [useSudoku.ts](./nikoli/src/games/Sudoku/useSudoku.ts)
│   │   │   └── _shared/
│   │   │       ├── __tests__/
│   │   │       │   ├── [GameInstructions.test.tsx](./nikoli/src/games/_shared/__tests__/GameInstructions.test.tsx)
│   │   │       │   └── [gameData.test.tsx](./nikoli/src/games/_shared/__tests__/gameData.test.tsx)
│   │   │       ├── [GameInstructions.tsx](./nikoli/src/games/_shared/GameInstructions.tsx)
│   │   │       └── [gameData.tsx](./nikoli/src/games/_shared/gameData.tsx)
│   │   └── styles/
│   │       ├── [base.css](./nikoli/src/styles/base.css)
│   │       ├── [globals.css](./nikoli/src/styles/globals.css)
│   │       └── [themes.css](./nikoli/src/styles/themes.css)
│   ├── src-tauri/
│   │   ├── capabilities/
│   │   │   └── [default.json](./nikoli/src-tauri/capabilities/default.json)
│   │   ├── icons/
│   │   │   ├── [128x128.png](./nikoli/src-tauri/icons/128x128.png)
│   │   │   ├── [128x128@2x.png](./nikoli/src-tauri/icons/128x128@2x.png)
│   │   │   ├── [32x32.png](./nikoli/src-tauri/icons/32x32.png)
│   │   │   ├── [Square107x107Logo.png](./nikoli/src-tauri/icons/Square107x107Logo.png)
│   │   │   ├── [Square142x142Logo.png](./nikoli/src-tauri/icons/Square142x142Logo.png)
│   │   │   ├── [Square150x150Logo.png](./nikoli/src-tauri/icons/Square150x150Logo.png)
│   │   │   ├── [Square284x284Logo.png](./nikoli/src-tauri/icons/Square284x284Logo.png)
│   │   │   ├── [Square30x30Logo.png](./nikoli/src-tauri/icons/Square30x30Logo.png)
│   │   │   ├── [Square310x310Logo.png](./nikoli/src-tauri/icons/Square310x310Logo.png)
│   │   │   ├── [Square44x44Logo.png](./nikoli/src-tauri/icons/Square44x44Logo.png)
│   │   │   ├── [Square71x71Logo.png](./nikoli/src-tauri/icons/Square71x71Logo.png)
│   │   │   ├── [Square89x89Logo.png](./nikoli/src-tauri/icons/Square89x89Logo.png)
│   │   │   ├── [StoreLogo.png](./nikoli/src-tauri/icons/StoreLogo.png)
│   │   │   ├── [icon.icns](./nikoli/src-tauri/icons/icon.icns)
│   │   │   ├── [icon.ico](./nikoli/src-tauri/icons/icon.ico)
│   │   │   └── [icon.png](./nikoli/src-tauri/icons/icon.png)
│   │   ├── src/
│   │   │   ├── [lib.rs](./nikoli/src-tauri/src/lib.rs)
│   │   │   └── [main.rs](./nikoli/src-tauri/src/main.rs)
│   │   ├── [Cargo.lock](./nikoli/src-tauri/Cargo.lock)
│   │   ├── [Cargo.toml](./nikoli/src-tauri/Cargo.toml)
│   │   ├── [build.rs](./nikoli/src-tauri/build.rs)
│   │   └── [tauri.conf.json](./nikoli/src-tauri/tauri.conf.json)
│   ├── [AGENTS.md](./nikoli/AGENTS.md)
│   ├── [Dockerfile](./nikoli/Dockerfile)
│   ├── [LICENSE](./nikoli/LICENSE)
│   ├── [README.md](./nikoli/README.md)
│   ├── [TREE.md](./nikoli/TREE.md)
│   ├── [docker-compose.yaml](./nikoli/docker-compose.yaml)
│   ├── [eslint.config.mts](./nikoli/eslint.config.mts)
│   ├── [jest.config.ts](./nikoli/jest.config.ts)
│   ├── [jest.setup.ts](./nikoli/jest.setup.ts)
│   ├── [next.config.ts](./nikoli/next.config.ts)
│   ├── [package.json](./nikoli/package.json)
│   ├── [playwright.config.ts](./nikoli/playwright.config.ts)
│   ├── [postcss.config.mjs](./nikoli/postcss.config.mjs)
│   └── [tsconfig.json](./nikoli/tsconfig.json)
├── tic-tac-toe/
│   ├── docs/
│   │   ├── [ARCHITECTURE.md](./tic-tac-toe/docs/ARCHITECTURE.md)
│   │   ├── [CONTRIBUTING.md](./tic-tac-toe/docs/CONTRIBUTING.md)
│   │   ├── [DOWNLOADS.md](./tic-tac-toe/docs/DOWNLOADS.md)
│   │   └── [ROADMAP.md](./tic-tac-toe/docs/ROADMAP.md)
│   ├── e2e/
│   │   └── [home.spec.ts](./tic-tac-toe/e2e/home.spec.ts)
│   ├── public/
│   │   ├── icons/
│   │   │   ├── [icon-128x128.png](./tic-tac-toe/public/icons/icon-128x128.png)
│   │   │   ├── [icon-144x144.png](./tic-tac-toe/public/icons/icon-144x144.png)
│   │   │   ├── [icon-152x152.png](./tic-tac-toe/public/icons/icon-152x152.png)
│   │   │   ├── [icon-16x16.png](./tic-tac-toe/public/icons/icon-16x16.png)
│   │   │   ├── [icon-180x180.png](./tic-tac-toe/public/icons/icon-180x180.png)
│   │   │   ├── [icon-192x192.png](./tic-tac-toe/public/icons/icon-192x192.png)
│   │   │   ├── [icon-256x256.png](./tic-tac-toe/public/icons/icon-256x256.png)
│   │   │   ├── [icon-32x32.png](./tic-tac-toe/public/icons/icon-32x32.png)
│   │   │   ├── [icon-384x384.png](./tic-tac-toe/public/icons/icon-384x384.png)
│   │   │   ├── [icon-48x48.png](./tic-tac-toe/public/icons/icon-48x48.png)
│   │   │   ├── [icon-512x512.png](./tic-tac-toe/public/icons/icon-512x512.png)
│   │   │   ├── [icon-64x64.png](./tic-tac-toe/public/icons/icon-64x64.png)
│   │   │   ├── [icon-72x72.png](./tic-tac-toe/public/icons/icon-72x72.png)
│   │   │   ├── [icon-96x96.png](./tic-tac-toe/public/icons/icon-96x96.png)
│   │   │   └── [icon.svg](./tic-tac-toe/public/icons/icon.svg)
│   │   ├── [apple-touch-icon.png](./tic-tac-toe/public/apple-touch-icon.png)
│   │   ├── [favicon.ico](./tic-tac-toe/public/favicon.ico)
│   │   ├── [manifest.json](./tic-tac-toe/public/manifest.json)
│   │   ├── [robots.txt](./tic-tac-toe/public/robots.txt)
│   │   ├── [sitemap.xml](./tic-tac-toe/public/sitemap.xml)
│   │   └── [sw.js](./tic-tac-toe/public/sw.js)
│   ├── src/
│   │   ├── app/
│   │   │   ├── (auth)/
│   │   │   │   ├── forget-password/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./tic-tac-toe/src/app/(auth)/forget-password/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./tic-tac-toe/src/app/(auth)/forget-password/page.tsx)
│   │   │   │   ├── profile/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./tic-tac-toe/src/app/(auth)/profile/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./tic-tac-toe/src/app/(auth)/profile/page.tsx)
│   │   │   │   ├── reset-password/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./tic-tac-toe/src/app/(auth)/reset-password/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./tic-tac-toe/src/app/(auth)/reset-password/page.tsx)
│   │   │   │   ├── sign-in/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./tic-tac-toe/src/app/(auth)/sign-in/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./tic-tac-toe/src/app/(auth)/sign-in/page.tsx)
│   │   │   │   └── sign-up/
│   │   │   │       ├── __tests__/
│   │   │   │       │   └── [page.test.tsx](./tic-tac-toe/src/app/(auth)/sign-up/__tests__/page.test.tsx)
│   │   │   │       └── [page.tsx](./tic-tac-toe/src/app/(auth)/sign-up/page.tsx)
│   │   │   ├── (games)/
│   │   │   │   ├── classic/
│   │   │   │   │   └── [page.tsx](./tic-tac-toe/src/app/(games)/classic/page.tsx)
│   │   │   │   ├── duck/
│   │   │   │   │   └── [page.tsx](./tic-tac-toe/src/app/(games)/duck/page.tsx)
│   │   │   │   ├── notakto/
│   │   │   │   │   └── [page.tsx](./tic-tac-toe/src/app/(games)/notakto/page.tsx)
│   │   │   │   ├── reverse/
│   │   │   │   │   └── [page.tsx](./tic-tac-toe/src/app/(games)/reverse/page.tsx)
│   │   │   │   ├── t3/
│   │   │   │   │   └── [page.tsx](./tic-tac-toe/src/app/(games)/t3/page.tsx)
│   │   │   │   └── wild/
│   │   │   │       └── [page.tsx](./tic-tac-toe/src/app/(games)/wild/page.tsx)
│   │   │   ├── (info)/
│   │   │   │   ├── about/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./tic-tac-toe/src/app/(info)/about/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./tic-tac-toe/src/app/(info)/about/page.tsx)
│   │   │   │   ├── downloads/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./tic-tac-toe/src/app/(info)/downloads/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./tic-tac-toe/src/app/(info)/downloads/page.tsx)
│   │   │   │   └── version/
│   │   │   │       ├── __tests__/
│   │   │   │       │   └── [page.test.tsx](./tic-tac-toe/src/app/(info)/version/__tests__/page.test.tsx)
│   │   │   │       └── [page.tsx](./tic-tac-toe/src/app/(info)/version/page.tsx)
│   │   │   ├── __tests__/
│   │   │   │   ├── [default.test.tsx](./tic-tac-toe/src/app/__tests__/default.test.tsx)
│   │   │   │   ├── [error.test.tsx](./tic-tac-toe/src/app/__tests__/error.test.tsx)
│   │   │   │   ├── [forbidden.test.tsx](./tic-tac-toe/src/app/__tests__/forbidden.test.tsx)
│   │   │   │   ├── [global-error.test.tsx](./tic-tac-toe/src/app/__tests__/global-error.test.tsx)
│   │   │   │   ├── [layout.test.tsx](./tic-tac-toe/src/app/__tests__/layout.test.tsx)
│   │   │   │   ├── [loading.test.tsx](./tic-tac-toe/src/app/__tests__/loading.test.tsx)
│   │   │   │   ├── [not-found.test.tsx](./tic-tac-toe/src/app/__tests__/not-found.test.tsx)
│   │   │   │   ├── [page.test.tsx](./tic-tac-toe/src/app/__tests__/page.test.tsx)
│   │   │   │   ├── [robots.test.ts](./tic-tac-toe/src/app/__tests__/robots.test.ts)
│   │   │   │   ├── [template.test.tsx](./tic-tac-toe/src/app/__tests__/template.test.tsx)
│   │   │   │   └── [unauthorized.test.tsx](./tic-tac-toe/src/app/__tests__/unauthorized.test.tsx)
│   │   │   ├── [default.tsx](./tic-tac-toe/src/app/default.tsx)
│   │   │   ├── [error.tsx](./tic-tac-toe/src/app/error.tsx)
│   │   │   ├── [favicon.ico](./tic-tac-toe/src/app/favicon.ico)
│   │   │   ├── [forbidden.tsx](./tic-tac-toe/src/app/forbidden.tsx)
│   │   │   ├── [global-error.tsx](./tic-tac-toe/src/app/global-error.tsx)
│   │   │   ├── [layout.tsx](./tic-tac-toe/src/app/layout.tsx)
│   │   │   ├── [loading.tsx](./tic-tac-toe/src/app/loading.tsx)
│   │   │   ├── [not-found.tsx](./tic-tac-toe/src/app/not-found.tsx)
│   │   │   ├── [page.tsx](./tic-tac-toe/src/app/page.tsx)
│   │   │   ├── [robots.ts](./tic-tac-toe/src/app/robots.ts)
│   │   │   ├── [template.tsx](./tic-tac-toe/src/app/template.tsx)
│   │   │   └── [unauthorized.tsx](./tic-tac-toe/src/app/unauthorized.tsx)
│   │   ├── components/
│   │   │   ├── organisms/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [Header.test.tsx](./tic-tac-toe/src/components/organisms/__tests__/Header.test.tsx)
│   │   │   │   └── [Header.tsx](./tic-tac-toe/src/components/organisms/Header.tsx)
│   │   │   └── templates/
│   │   │       ├── __tests__/
│   │   │       │   ├── [AboutTemplate.test.tsx](./tic-tac-toe/src/components/templates/__tests__/AboutTemplate.test.tsx)
│   │   │       │   ├── [DownloadsTemplate.test.tsx](./tic-tac-toe/src/components/templates/__tests__/DownloadsTemplate.test.tsx)
│   │   │       │   ├── [ErrorTemplate.test.tsx](./tic-tac-toe/src/components/templates/__tests__/ErrorTemplate.test.tsx)
│   │   │       │   └── [VersionTemplate.test.tsx](./tic-tac-toe/src/components/templates/__tests__/VersionTemplate.test.tsx)
│   │   │       ├── [AboutTemplate.tsx](./tic-tac-toe/src/components/templates/AboutTemplate.tsx)
│   │   │       ├── [DownloadsTemplate.tsx](./tic-tac-toe/src/components/templates/DownloadsTemplate.tsx)
│   │   │       ├── [ErrorTemplate.tsx](./tic-tac-toe/src/components/templates/ErrorTemplate.tsx)
│   │   │       └── [VersionTemplate.tsx](./tic-tac-toe/src/components/templates/VersionTemplate.tsx)
│   │   ├── games/
│   │   │   ├── _shared/
│   │   │   │   └── [board.ts](./tic-tac-toe/src/games/_shared/board.ts)
│   │   │   ├── classic/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [index.test.tsx](./tic-tac-toe/src/games/classic/__tests__/index.test.tsx)
│   │   │   │   │   ├── [useClassic.test.tsx](./tic-tac-toe/src/games/classic/__tests__/useClassic.test.tsx)
│   │   │   │   │   └── [utils.test.ts](./tic-tac-toe/src/games/classic/__tests__/utils.test.ts)
│   │   │   │   ├── [index.tsx](./tic-tac-toe/src/games/classic/index.tsx)
│   │   │   │   ├── [types.ts](./tic-tac-toe/src/games/classic/types.ts)
│   │   │   │   ├── [useClassic.ts](./tic-tac-toe/src/games/classic/useClassic.ts)
│   │   │   │   └── [utils.ts](./tic-tac-toe/src/games/classic/utils.ts)
│   │   │   ├── duck/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [index.test.tsx](./tic-tac-toe/src/games/duck/__tests__/index.test.tsx)
│   │   │   │   │   ├── [useDuck.test.tsx](./tic-tac-toe/src/games/duck/__tests__/useDuck.test.tsx)
│   │   │   │   │   └── [utils.test.ts](./tic-tac-toe/src/games/duck/__tests__/utils.test.ts)
│   │   │   │   ├── [index.tsx](./tic-tac-toe/src/games/duck/index.tsx)
│   │   │   │   ├── [types.ts](./tic-tac-toe/src/games/duck/types.ts)
│   │   │   │   ├── [useDuck.ts](./tic-tac-toe/src/games/duck/useDuck.ts)
│   │   │   │   └── [utils.ts](./tic-tac-toe/src/games/duck/utils.ts)
│   │   │   ├── notakto/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [index.test.tsx](./tic-tac-toe/src/games/notakto/__tests__/index.test.tsx)
│   │   │   │   │   ├── [useNotakto.test.tsx](./tic-tac-toe/src/games/notakto/__tests__/useNotakto.test.tsx)
│   │   │   │   │   └── [utils.test.ts](./tic-tac-toe/src/games/notakto/__tests__/utils.test.ts)
│   │   │   │   ├── [index.tsx](./tic-tac-toe/src/games/notakto/index.tsx)
│   │   │   │   ├── [types.ts](./tic-tac-toe/src/games/notakto/types.ts)
│   │   │   │   ├── [useNotakto.ts](./tic-tac-toe/src/games/notakto/useNotakto.ts)
│   │   │   │   └── [utils.ts](./tic-tac-toe/src/games/notakto/utils.ts)
│   │   │   ├── reverse/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [index.test.tsx](./tic-tac-toe/src/games/reverse/__tests__/index.test.tsx)
│   │   │   │   │   ├── [useReverse.test.tsx](./tic-tac-toe/src/games/reverse/__tests__/useReverse.test.tsx)
│   │   │   │   │   └── [utils.test.ts](./tic-tac-toe/src/games/reverse/__tests__/utils.test.ts)
│   │   │   │   ├── [index.tsx](./tic-tac-toe/src/games/reverse/index.tsx)
│   │   │   │   ├── [types.ts](./tic-tac-toe/src/games/reverse/types.ts)
│   │   │   │   ├── [useReverse.ts](./tic-tac-toe/src/games/reverse/useReverse.ts)
│   │   │   │   └── [utils.ts](./tic-tac-toe/src/games/reverse/utils.ts)
│   │   │   ├── t3/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [index.test.tsx](./tic-tac-toe/src/games/t3/__tests__/index.test.tsx)
│   │   │   │   │   ├── [useT3.test.tsx](./tic-tac-toe/src/games/t3/__tests__/useT3.test.tsx)
│   │   │   │   │   └── [utils.test.ts](./tic-tac-toe/src/games/t3/__tests__/utils.test.ts)
│   │   │   │   ├── [index.tsx](./tic-tac-toe/src/games/t3/index.tsx)
│   │   │   │   ├── [types.ts](./tic-tac-toe/src/games/t3/types.ts)
│   │   │   │   ├── [useT3.ts](./tic-tac-toe/src/games/t3/useT3.ts)
│   │   │   │   └── [utils.ts](./tic-tac-toe/src/games/t3/utils.ts)
│   │   │   └── wild/
│   │   │       ├── __tests__/
│   │   │       │   ├── [index.test.tsx](./tic-tac-toe/src/games/wild/__tests__/index.test.tsx)
│   │   │       │   ├── [useWild.test.tsx](./tic-tac-toe/src/games/wild/__tests__/useWild.test.tsx)
│   │   │       │   └── [utils.test.ts](./tic-tac-toe/src/games/wild/__tests__/utils.test.ts)
│   │   │       ├── [index.tsx](./tic-tac-toe/src/games/wild/index.tsx)
│   │   │       ├── [types.ts](./tic-tac-toe/src/games/wild/types.ts)
│   │   │       ├── [useWild.ts](./tic-tac-toe/src/games/wild/useWild.ts)
│   │   │       └── [utils.ts](./tic-tac-toe/src/games/wild/utils.ts)
│   │   └── styles/
│   │       ├── [base.css](./tic-tac-toe/src/styles/base.css)
│   │       ├── [globals.css](./tic-tac-toe/src/styles/globals.css)
│   │       └── [themes.css](./tic-tac-toe/src/styles/themes.css)
│   ├── src-tauri/
│   │   ├── capabilities/
│   │   │   └── [default.json](./tic-tac-toe/src-tauri/capabilities/default.json)
│   │   ├── icons/
│   │   │   ├── [128x128.png](./tic-tac-toe/src-tauri/icons/128x128.png)
│   │   │   ├── [128x128@2x.png](./tic-tac-toe/src-tauri/icons/128x128@2x.png)
│   │   │   ├── [32x32.png](./tic-tac-toe/src-tauri/icons/32x32.png)
│   │   │   ├── [Square107x107Logo.png](./tic-tac-toe/src-tauri/icons/Square107x107Logo.png)
│   │   │   ├── [Square142x142Logo.png](./tic-tac-toe/src-tauri/icons/Square142x142Logo.png)
│   │   │   ├── [Square150x150Logo.png](./tic-tac-toe/src-tauri/icons/Square150x150Logo.png)
│   │   │   ├── [Square284x284Logo.png](./tic-tac-toe/src-tauri/icons/Square284x284Logo.png)
│   │   │   ├── [Square30x30Logo.png](./tic-tac-toe/src-tauri/icons/Square30x30Logo.png)
│   │   │   ├── [Square310x310Logo.png](./tic-tac-toe/src-tauri/icons/Square310x310Logo.png)
│   │   │   ├── [Square44x44Logo.png](./tic-tac-toe/src-tauri/icons/Square44x44Logo.png)
│   │   │   ├── [Square71x71Logo.png](./tic-tac-toe/src-tauri/icons/Square71x71Logo.png)
│   │   │   ├── [Square89x89Logo.png](./tic-tac-toe/src-tauri/icons/Square89x89Logo.png)
│   │   │   ├── [StoreLogo.png](./tic-tac-toe/src-tauri/icons/StoreLogo.png)
│   │   │   ├── [icon.icns](./tic-tac-toe/src-tauri/icons/icon.icns)
│   │   │   ├── [icon.ico](./tic-tac-toe/src-tauri/icons/icon.ico)
│   │   │   └── [icon.png](./tic-tac-toe/src-tauri/icons/icon.png)
│   │   ├── src/
│   │   │   ├── [lib.rs](./tic-tac-toe/src-tauri/src/lib.rs)
│   │   │   └── [main.rs](./tic-tac-toe/src-tauri/src/main.rs)
│   │   ├── [Cargo.lock](./tic-tac-toe/src-tauri/Cargo.lock)
│   │   ├── [Cargo.toml](./tic-tac-toe/src-tauri/Cargo.toml)
│   │   ├── [build.rs](./tic-tac-toe/src-tauri/build.rs)
│   │   └── [tauri.conf.json](./tic-tac-toe/src-tauri/tauri.conf.json)
│   ├── [Dockerfile](./tic-tac-toe/Dockerfile)
│   ├── [LICENSE](./tic-tac-toe/LICENSE)
│   ├── [README.md](./tic-tac-toe/README.md)
│   ├── [TREE.md](./tic-tac-toe/TREE.md)
│   ├── [docker-compose.yaml](./tic-tac-toe/docker-compose.yaml)
│   ├── [eslint.config.mts](./tic-tac-toe/eslint.config.mts)
│   ├── [jest.config.ts](./tic-tac-toe/jest.config.ts)
│   ├── [jest.setup.ts](./tic-tac-toe/jest.setup.ts)
│   ├── [next.config.ts](./tic-tac-toe/next.config.ts)
│   ├── [package.json](./tic-tac-toe/package.json)
│   ├── [playwright.config.ts](./tic-tac-toe/playwright.config.ts)
│   ├── [postcss.config.mjs](./tic-tac-toe/postcss.config.mjs)
│   └── [tsconfig.json](./tic-tac-toe/tsconfig.json)
├── [README.md](./README.md)
└── [TREE.md](./TREE.md)
```

358 directories, 1019 files
