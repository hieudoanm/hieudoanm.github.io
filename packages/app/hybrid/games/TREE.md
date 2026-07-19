# TREE

```text
├── memory/
│   ├── docs/
│   │   ├── [ARCHITECTURE.md](./memory/docs/ARCHITECTURE.md)
│   │   ├── [CONTRIBUTING.md](./memory/docs/CONTRIBUTING.md)
│   │   ├── [DOWNLOADS.md](./memory/docs/DOWNLOADS.md)
│   │   ├── [PACKAGING.md](./memory/docs/PACKAGING.md)
│   │   └── [ROADMAP.md](./memory/docs/ROADMAP.md)
│   ├── e2e/
│   │   ├── screenshots/
│   │   │   ├── [about.png](./memory/e2e/screenshots/about.png)
│   │   │   ├── [downloads.png](./memory/e2e/screenshots/downloads.png)
│   │   │   ├── [home.png](./memory/e2e/screenshots/home.png)
│   │   │   └── [version.png](./memory/e2e/screenshots/version.png)
│   │   ├── [about.spec.ts](./memory/e2e/about.spec.ts)
│   │   ├── [downloads.spec.ts](./memory/e2e/downloads.spec.ts)
│   │   ├── [home.spec.ts](./memory/e2e/home.spec.ts)
│   │   └── [version.spec.ts](./memory/e2e/version.spec.ts)
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
│   │   │   │   ├── 8-bit/
│   │   │   │   │   ├── dino-run/
│   │   │   │   │   │   └── [page.tsx](./memory/src/app/(games)/8-bit/dino-run/page.tsx)
│   │   │   │   │   ├── maze/
│   │   │   │   │   │   └── [page.tsx](./memory/src/app/(games)/8-bit/maze/page.tsx)
│   │   │   │   │   ├── rock-paper-scissors/
│   │   │   │   │   │   └── [page.tsx](./memory/src/app/(games)/8-bit/rock-paper-scissors/page.tsx)
│   │   │   │   │   ├── snake/
│   │   │   │   │   │   └── [page.tsx](./memory/src/app/(games)/8-bit/snake/page.tsx)
│   │   │   │   │   └── [page.tsx](./memory/src/app/(games)/8-bit/page.tsx)
│   │   │   │   ├── gambling/
│   │   │   │   │   ├── baccarat/
│   │   │   │   │   │   └── [page.tsx](./memory/src/app/(games)/gambling/baccarat/page.tsx)
│   │   │   │   │   ├── card-counter/
│   │   │   │   │   │   └── [page.tsx](./memory/src/app/(games)/gambling/card-counter/page.tsx)
│   │   │   │   │   ├── craps/
│   │   │   │   │   │   └── [page.tsx](./memory/src/app/(games)/gambling/craps/page.tsx)
│   │   │   │   │   ├── hi-lo/
│   │   │   │   │   │   └── [page.tsx](./memory/src/app/(games)/gambling/hi-lo/page.tsx)
│   │   │   │   │   ├── keno/
│   │   │   │   │   │   └── [page.tsx](./memory/src/app/(games)/gambling/keno/page.tsx)
│   │   │   │   │   ├── over-under-seven/
│   │   │   │   │   │   └── [page.tsx](./memory/src/app/(games)/gambling/over-under-seven/page.tsx)
│   │   │   │   │   ├── poker-odds/
│   │   │   │   │   │   └── [page.tsx](./memory/src/app/(games)/gambling/poker-odds/page.tsx)
│   │   │   │   │   ├── roulette/
│   │   │   │   │   │   └── [page.tsx](./memory/src/app/(games)/gambling/roulette/page.tsx)
│   │   │   │   │   ├── slot-machine/
│   │   │   │   │   │   └── [page.tsx](./memory/src/app/(games)/gambling/slot-machine/page.tsx)
│   │   │   │   │   ├── war/
│   │   │   │   │   │   └── [page.tsx](./memory/src/app/(games)/gambling/war/page.tsx)
│   │   │   │   │   └── [page.tsx](./memory/src/app/(games)/gambling/page.tsx)
│   │   │   │   ├── memory/
│   │   │   │   │   ├── memory-match/
│   │   │   │   │   │   └── [page.tsx](./memory/src/app/(games)/memory/memory-match/page.tsx)
│   │   │   │   │   ├── n-back/
│   │   │   │   │   │   └── [page.tsx](./memory/src/app/(games)/memory/n-back/page.tsx)
│   │   │   │   │   ├── pi/
│   │   │   │   │   │   └── [page.tsx](./memory/src/app/(games)/memory/pi/page.tsx)
│   │   │   │   │   ├── recall/
│   │   │   │   │   │   └── [page.tsx](./memory/src/app/(games)/memory/recall/page.tsx)
│   │   │   │   │   └── [page.tsx](./memory/src/app/(games)/memory/page.tsx)
│   │   │   │   ├── nikoli/
│   │   │   │   │   ├── fillomino/
│   │   │   │   │   │   └── [page.tsx](./memory/src/app/(games)/nikoli/fillomino/page.tsx)
│   │   │   │   │   ├── heyawake/
│   │   │   │   │   │   └── [page.tsx](./memory/src/app/(games)/nikoli/heyawake/page.tsx)
│   │   │   │   │   ├── masyu/
│   │   │   │   │   │   └── [page.tsx](./memory/src/app/(games)/nikoli/masyu/page.tsx)
│   │   │   │   │   ├── norinori/
│   │   │   │   │   │   └── [page.tsx](./memory/src/app/(games)/nikoli/norinori/page.tsx)
│   │   │   │   │   ├── nurikabe/
│   │   │   │   │   │   └── [page.tsx](./memory/src/app/(games)/nikoli/nurikabe/page.tsx)
│   │   │   │   │   ├── shikaku/
│   │   │   │   │   │   └── [page.tsx](./memory/src/app/(games)/nikoli/shikaku/page.tsx)
│   │   │   │   │   ├── sudoku/
│   │   │   │   │   │   └── [page.tsx](./memory/src/app/(games)/nikoli/sudoku/page.tsx)
│   │   │   │   │   └── [page.tsx](./memory/src/app/(games)/nikoli/page.tsx)
│   │   │   │   ├── puzzles/
│   │   │   │   │   ├── game2048/
│   │   │   │   │   │   └── [page.tsx](./memory/src/app/(games)/puzzles/game2048/page.tsx)
│   │   │   │   │   ├── lights-out/
│   │   │   │   │   │   └── [page.tsx](./memory/src/app/(games)/puzzles/lights-out/page.tsx)
│   │   │   │   │   ├── sliding-puzzle/
│   │   │   │   │   │   └── [page.tsx](./memory/src/app/(games)/puzzles/sliding-puzzle/page.tsx)
│   │   │   │   │   ├── towers/
│   │   │   │   │   │   └── [page.tsx](./memory/src/app/(games)/puzzles/towers/page.tsx)
│   │   │   │   │   └── [page.tsx](./memory/src/app/(games)/puzzles/page.tsx)
│   │   │   │   └── tic-tac-toe/
│   │   │   │       ├── classic/
│   │   │   │       │   └── [page.tsx](./memory/src/app/(games)/tic-tac-toe/classic/page.tsx)
│   │   │   │       ├── duck/
│   │   │   │       │   └── [page.tsx](./memory/src/app/(games)/tic-tac-toe/duck/page.tsx)
│   │   │   │       ├── notakto/
│   │   │   │       │   └── [page.tsx](./memory/src/app/(games)/tic-tac-toe/notakto/page.tsx)
│   │   │   │       ├── reverse/
│   │   │   │       │   └── [page.tsx](./memory/src/app/(games)/tic-tac-toe/reverse/page.tsx)
│   │   │   │       ├── t3/
│   │   │   │       │   └── [page.tsx](./memory/src/app/(games)/tic-tac-toe/t3/page.tsx)
│   │   │   │       ├── wild/
│   │   │   │       │   └── [page.tsx](./memory/src/app/(games)/tic-tac-toe/wild/page.tsx)
│   │   │   │       └── [page.tsx](./memory/src/app/(games)/tic-tac-toe/page.tsx)
│   │   │   ├── (info)/
│   │   │   │   ├── about/
│   │   │   │   │   └── [page.tsx](./memory/src/app/(info)/about/page.tsx)
│   │   │   │   ├── downloads/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./memory/src/app/(info)/downloads/__tests__/page.test.tsx)
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
│   │   │   ├── [favicon.ico](./memory/src/app/favicon.ico)
│   │   │   ├── [forbidden.tsx](./memory/src/app/forbidden.tsx)
│   │   │   ├── [global-error.tsx](./memory/src/app/global-error.tsx)
│   │   │   ├── [layout.tsx](./memory/src/app/layout.tsx)
│   │   │   ├── [loading.tsx](./memory/src/app/loading.tsx)
│   │   │   ├── [not-found.tsx](./memory/src/app/not-found.tsx)
│   │   │   ├── [page.tsx](./memory/src/app/page.tsx)
│   │   │   ├── [robots.ts](./memory/src/app/robots.ts)
│   │   │   ├── [template.tsx](./memory/src/app/template.tsx)
│   │   │   └── [unauthorized.tsx](./memory/src/app/unauthorized.tsx)
│   │   ├── components/
│   │   │   ├── atoms/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [Dropzone.test.tsx](./memory/src/components/atoms/__tests__/Dropzone.test.tsx)
│   │   │   │   ├── [Dropzone.tsx](./memory/src/components/atoms/Dropzone.tsx)
│   │   │   │   └── [index.ts](./memory/src/components/atoms/index.ts)
│   │   │   ├── organisms/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [GameContainer.test.tsx](./memory/src/components/organisms/__tests__/GameContainer.test.tsx)
│   │   │   │   │   └── [Header.test.tsx](./memory/src/components/organisms/__tests__/Header.test.tsx)
│   │   │   │   ├── [GameContainer.tsx](./memory/src/components/organisms/GameContainer.tsx)
│   │   │   │   └── [Header.tsx](./memory/src/components/organisms/Header.tsx)
│   │   │   └── templates/
│   │   │       ├── __tests__/
│   │   │       │   ├── [AboutTemplate.test.tsx](./memory/src/components/templates/__tests__/AboutTemplate.test.tsx)
│   │   │       │   ├── [DownloadsTemplate.test.tsx](./memory/src/components/templates/__tests__/DownloadsTemplate.test.tsx)
│   │   │       │   ├── [ErrorTemplate.test.tsx](./memory/src/components/templates/__tests__/ErrorTemplate.test.tsx)
│   │   │       │   ├── [GamesTemplate.test.tsx](./memory/src/components/templates/__tests__/GamesTemplate.test.tsx)
│   │   │       │   └── [VersionTemplate.test.tsx](./memory/src/components/templates/__tests__/VersionTemplate.test.tsx)
│   │   │       ├── [AboutTemplate.tsx](./memory/src/components/templates/AboutTemplate.tsx)
│   │   │       ├── [DownloadsTemplate.tsx](./memory/src/components/templates/DownloadsTemplate.tsx)
│   │   │       ├── [ErrorTemplate.tsx](./memory/src/components/templates/ErrorTemplate.tsx)
│   │   │       ├── [GamesTemplate.tsx](./memory/src/components/templates/GamesTemplate.tsx)
│   │   │       └── [VersionTemplate.tsx](./memory/src/components/templates/VersionTemplate.tsx)
│   │   ├── content/
│   │   │   ├── [about.ts](./memory/src/content/about.ts)
│   │   │   ├── [download.ts](./memory/src/content/download.ts)
│   │   │   └── [version.ts](./memory/src/content/version.ts)
│   │   ├── data/
│   │   │   └── [pi.ts](./memory/src/data/pi.ts)
│   │   ├── games/
│   │   │   ├── 8-bit/
│   │   │   │   ├── DinoRun/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [game.test.ts](./memory/src/games/8-bit/DinoRun/__tests__/game.test.ts)
│   │   │   │   │   │   └── [index.test.tsx](./memory/src/games/8-bit/DinoRun/__tests__/index.test.tsx)
│   │   │   │   │   ├── [constants.ts](./memory/src/games/8-bit/DinoRun/constants.ts)
│   │   │   │   │   ├── [game.ts](./memory/src/games/8-bit/DinoRun/game.ts)
│   │   │   │   │   ├── [index.tsx](./memory/src/games/8-bit/DinoRun/index.tsx)
│   │   │   │   │   └── [types.ts](./memory/src/games/8-bit/DinoRun/types.ts)
│   │   │   │   ├── Maze/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [index.test.tsx](./memory/src/games/8-bit/Maze/__tests__/index.test.tsx)
│   │   │   │   │   │   └── [maze.test.ts](./memory/src/games/8-bit/Maze/__tests__/maze.test.ts)
│   │   │   │   │   ├── [constants.ts](./memory/src/games/8-bit/Maze/constants.ts)
│   │   │   │   │   ├── [index.tsx](./memory/src/games/8-bit/Maze/index.tsx)
│   │   │   │   │   ├── [maze.ts](./memory/src/games/8-bit/Maze/maze.ts)
│   │   │   │   │   └── [types.ts](./memory/src/games/8-bit/Maze/types.ts)
│   │   │   │   ├── RockPaperScissors/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [index.test.tsx](./memory/src/games/8-bit/RockPaperScissors/__tests__/index.test.tsx)
│   │   │   │   │   │   └── [utils.test.ts](./memory/src/games/8-bit/RockPaperScissors/__tests__/utils.test.ts)
│   │   │   │   │   ├── [index.tsx](./memory/src/games/8-bit/RockPaperScissors/index.tsx)
│   │   │   │   │   ├── [types.ts](./memory/src/games/8-bit/RockPaperScissors/types.ts)
│   │   │   │   │   └── [utils.ts](./memory/src/games/8-bit/RockPaperScissors/utils.ts)
│   │   │   │   ├── Snake/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [index.test.tsx](./memory/src/games/8-bit/Snake/__tests__/index.test.tsx)
│   │   │   │   │   │   └── [snake.test.ts](./memory/src/games/8-bit/Snake/__tests__/snake.test.ts)
│   │   │   │   │   ├── [constants.ts](./memory/src/games/8-bit/Snake/constants.ts)
│   │   │   │   │   ├── [index.tsx](./memory/src/games/8-bit/Snake/index.tsx)
│   │   │   │   │   ├── [snake.ts](./memory/src/games/8-bit/Snake/snake.ts)
│   │   │   │   │   └── [types.ts](./memory/src/games/8-bit/Snake/types.ts)
│   │   │   │   └── _shared/
│   │   │   │       ├── __tests__/
│   │   │   │       │   ├── [GameInstructions.test.tsx](./memory/src/games/8-bit/_shared/__tests__/GameInstructions.test.tsx)
│   │   │   │       │   └── [gameData.test.ts](./memory/src/games/8-bit/_shared/__tests__/gameData.test.ts)
│   │   │   │       ├── [GameInstructions.tsx](./memory/src/games/8-bit/_shared/GameInstructions.tsx)
│   │   │   │       ├── [gameData.tsx](./memory/src/games/8-bit/_shared/gameData.tsx)
│   │   │   │       └── [games.ts](./memory/src/games/8-bit/_shared/games.ts)
│   │   │   ├── gambling/
│   │   │   │   ├── Baccarat/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [index.test.tsx](./memory/src/games/gambling/Baccarat/__tests__/index.test.tsx)
│   │   │   │   │   │   ├── [useBaccarat.test.ts](./memory/src/games/gambling/Baccarat/__tests__/useBaccarat.test.ts)
│   │   │   │   │   │   └── [utils.test.ts](./memory/src/games/gambling/Baccarat/__tests__/utils.test.ts)
│   │   │   │   │   ├── [index.tsx](./memory/src/games/gambling/Baccarat/index.tsx)
│   │   │   │   │   ├── [types.ts](./memory/src/games/gambling/Baccarat/types.ts)
│   │   │   │   │   ├── [useBaccarat.ts](./memory/src/games/gambling/Baccarat/useBaccarat.ts)
│   │   │   │   │   └── [utils.ts](./memory/src/games/gambling/Baccarat/utils.ts)
│   │   │   │   ├── CardCounter/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [index.test.tsx](./memory/src/games/gambling/CardCounter/__tests__/index.test.tsx)
│   │   │   │   │   │   ├── [useCardCounter.test.ts](./memory/src/games/gambling/CardCounter/__tests__/useCardCounter.test.ts)
│   │   │   │   │   │   └── [utils.test.ts](./memory/src/games/gambling/CardCounter/__tests__/utils.test.ts)
│   │   │   │   │   ├── [index.tsx](./memory/src/games/gambling/CardCounter/index.tsx)
│   │   │   │   │   ├── [types.ts](./memory/src/games/gambling/CardCounter/types.ts)
│   │   │   │   │   ├── [useCardCounter.ts](./memory/src/games/gambling/CardCounter/useCardCounter.ts)
│   │   │   │   │   └── [utils.ts](./memory/src/games/gambling/CardCounter/utils.ts)
│   │   │   │   ├── Craps/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [index.test.tsx](./memory/src/games/gambling/Craps/__tests__/index.test.tsx)
│   │   │   │   │   │   ├── [useCraps.test.ts](./memory/src/games/gambling/Craps/__tests__/useCraps.test.ts)
│   │   │   │   │   │   └── [utils.test.ts](./memory/src/games/gambling/Craps/__tests__/utils.test.ts)
│   │   │   │   │   ├── [index.tsx](./memory/src/games/gambling/Craps/index.tsx)
│   │   │   │   │   ├── [types.ts](./memory/src/games/gambling/Craps/types.ts)
│   │   │   │   │   ├── [useCraps.ts](./memory/src/games/gambling/Craps/useCraps.ts)
│   │   │   │   │   └── [utils.ts](./memory/src/games/gambling/Craps/utils.ts)
│   │   │   │   ├── HiLo/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [index.test.tsx](./memory/src/games/gambling/HiLo/__tests__/index.test.tsx)
│   │   │   │   │   │   ├── [useHiLo.test.ts](./memory/src/games/gambling/HiLo/__tests__/useHiLo.test.ts)
│   │   │   │   │   │   └── [utils.test.ts](./memory/src/games/gambling/HiLo/__tests__/utils.test.ts)
│   │   │   │   │   ├── [constants.ts](./memory/src/games/gambling/HiLo/constants.ts)
│   │   │   │   │   ├── [index.tsx](./memory/src/games/gambling/HiLo/index.tsx)
│   │   │   │   │   ├── [types.ts](./memory/src/games/gambling/HiLo/types.ts)
│   │   │   │   │   ├── [useHiLo.ts](./memory/src/games/gambling/HiLo/useHiLo.ts)
│   │   │   │   │   └── [utils.ts](./memory/src/games/gambling/HiLo/utils.ts)
│   │   │   │   ├── Keno/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [index.test.tsx](./memory/src/games/gambling/Keno/__tests__/index.test.tsx)
│   │   │   │   │   │   ├── [useKeno.test.ts](./memory/src/games/gambling/Keno/__tests__/useKeno.test.ts)
│   │   │   │   │   │   └── [utils.test.ts](./memory/src/games/gambling/Keno/__tests__/utils.test.ts)
│   │   │   │   │   ├── [index.tsx](./memory/src/games/gambling/Keno/index.tsx)
│   │   │   │   │   ├── [types.ts](./memory/src/games/gambling/Keno/types.ts)
│   │   │   │   │   ├── [useKeno.ts](./memory/src/games/gambling/Keno/useKeno.ts)
│   │   │   │   │   └── [utils.ts](./memory/src/games/gambling/Keno/utils.ts)
│   │   │   │   ├── OverUnderSeven/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [index.test.tsx](./memory/src/games/gambling/OverUnderSeven/__tests__/index.test.tsx)
│   │   │   │   │   │   ├── [useOverUnderSeven.test.ts](./memory/src/games/gambling/OverUnderSeven/__tests__/useOverUnderSeven.test.ts)
│   │   │   │   │   │   └── [utils.test.ts](./memory/src/games/gambling/OverUnderSeven/__tests__/utils.test.ts)
│   │   │   │   │   ├── [index.tsx](./memory/src/games/gambling/OverUnderSeven/index.tsx)
│   │   │   │   │   ├── [types.ts](./memory/src/games/gambling/OverUnderSeven/types.ts)
│   │   │   │   │   ├── [useOverUnderSeven.ts](./memory/src/games/gambling/OverUnderSeven/useOverUnderSeven.ts)
│   │   │   │   │   └── [utils.ts](./memory/src/games/gambling/OverUnderSeven/utils.ts)
│   │   │   │   ├── PokerOdds/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [usePokerOdds.test.tsx](./memory/src/games/gambling/PokerOdds/__tests__/usePokerOdds.test.tsx)
│   │   │   │   │   │   └── [utils.test.ts](./memory/src/games/gambling/PokerOdds/__tests__/utils.test.ts)
│   │   │   │   │   ├── components/
│   │   │   │   │   │   └── [CardPicker.tsx](./memory/src/games/gambling/PokerOdds/components/CardPicker.tsx)
│   │   │   │   │   ├── [constants.ts](./memory/src/games/gambling/PokerOdds/constants.ts)
│   │   │   │   │   ├── [index.tsx](./memory/src/games/gambling/PokerOdds/index.tsx)
│   │   │   │   │   ├── [types.ts](./memory/src/games/gambling/PokerOdds/types.ts)
│   │   │   │   │   ├── [usePokerOdds.ts](./memory/src/games/gambling/PokerOdds/usePokerOdds.ts)
│   │   │   │   │   └── [utils.ts](./memory/src/games/gambling/PokerOdds/utils.ts)
│   │   │   │   ├── Roulette/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [index.test.tsx](./memory/src/games/gambling/Roulette/__tests__/index.test.tsx)
│   │   │   │   │   │   ├── [useRoulette.test.ts](./memory/src/games/gambling/Roulette/__tests__/useRoulette.test.ts)
│   │   │   │   │   │   └── [utils.test.ts](./memory/src/games/gambling/Roulette/__tests__/utils.test.ts)
│   │   │   │   │   ├── [index.tsx](./memory/src/games/gambling/Roulette/index.tsx)
│   │   │   │   │   ├── [types.ts](./memory/src/games/gambling/Roulette/types.ts)
│   │   │   │   │   ├── [useRoulette.ts](./memory/src/games/gambling/Roulette/useRoulette.ts)
│   │   │   │   │   └── [utils.ts](./memory/src/games/gambling/Roulette/utils.ts)
│   │   │   │   ├── SlotMachine/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [index.test.tsx](./memory/src/games/gambling/SlotMachine/__tests__/index.test.tsx)
│   │   │   │   │   │   ├── [useSlotMachine.test.ts](./memory/src/games/gambling/SlotMachine/__tests__/useSlotMachine.test.ts)
│   │   │   │   │   │   └── [utils.test.ts](./memory/src/games/gambling/SlotMachine/__tests__/utils.test.ts)
│   │   │   │   │   ├── [constants.ts](./memory/src/games/gambling/SlotMachine/constants.ts)
│   │   │   │   │   ├── [index.tsx](./memory/src/games/gambling/SlotMachine/index.tsx)
│   │   │   │   │   ├── [useSlotMachine.ts](./memory/src/games/gambling/SlotMachine/useSlotMachine.ts)
│   │   │   │   │   └── [utils.ts](./memory/src/games/gambling/SlotMachine/utils.ts)
│   │   │   │   ├── War/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [index.test.tsx](./memory/src/games/gambling/War/__tests__/index.test.tsx)
│   │   │   │   │   │   ├── [useWar.test.ts](./memory/src/games/gambling/War/__tests__/useWar.test.ts)
│   │   │   │   │   │   └── [utils.test.ts](./memory/src/games/gambling/War/__tests__/utils.test.ts)
│   │   │   │   │   ├── [index.tsx](./memory/src/games/gambling/War/index.tsx)
│   │   │   │   │   ├── [types.ts](./memory/src/games/gambling/War/types.ts)
│   │   │   │   │   ├── [useWar.ts](./memory/src/games/gambling/War/useWar.ts)
│   │   │   │   │   └── [utils.ts](./memory/src/games/gambling/War/utils.ts)
│   │   │   │   └── _shared/
│   │   │   │       ├── __tests__/
│   │   │   │       │   └── [cards.test.ts](./memory/src/games/gambling/_shared/__tests__/cards.test.ts)
│   │   │   │       ├── [cards.ts](./memory/src/games/gambling/_shared/cards.ts)
│   │   │   │       └── [games.ts](./memory/src/games/gambling/_shared/games.ts)
│   │   │   ├── memory/
│   │   │   │   ├── MemoryMatch/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [MemoryMatch.test.tsx](./memory/src/games/memory/MemoryMatch/__tests__/MemoryMatch.test.tsx)
│   │   │   │   │   │   ├── [useMemoryMatch.test.ts](./memory/src/games/memory/MemoryMatch/__tests__/useMemoryMatch.test.ts)
│   │   │   │   │   │   └── [utils.test.ts](./memory/src/games/memory/MemoryMatch/__tests__/utils.test.ts)
│   │   │   │   │   ├── [index.tsx](./memory/src/games/memory/MemoryMatch/index.tsx)
│   │   │   │   │   ├── [useMemoryMatch.ts](./memory/src/games/memory/MemoryMatch/useMemoryMatch.ts)
│   │   │   │   │   └── [utils.ts](./memory/src/games/memory/MemoryMatch/utils.ts)
│   │   │   │   ├── NBack/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [NBack.test.tsx](./memory/src/games/memory/NBack/__tests__/NBack.test.tsx)
│   │   │   │   │   │   └── [constants.test.ts](./memory/src/games/memory/NBack/__tests__/constants.test.ts)
│   │   │   │   │   ├── [constants.ts](./memory/src/games/memory/NBack/constants.ts)
│   │   │   │   │   └── [index.tsx](./memory/src/games/memory/NBack/index.tsx)
│   │   │   │   ├── PiNumber/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [Pi.test.tsx](./memory/src/games/memory/PiNumber/__tests__/Pi.test.tsx)
│   │   │   │   │   │   ├── [constants.test.ts](./memory/src/games/memory/PiNumber/__tests__/constants.test.ts)
│   │   │   │   │   │   ├── [keyHandlers.test.ts](./memory/src/games/memory/PiNumber/__tests__/keyHandlers.test.ts)
│   │   │   │   │   │   └── [usePiGame.test.ts](./memory/src/games/memory/PiNumber/__tests__/usePiGame.test.ts)
│   │   │   │   │   ├── [constants.ts](./memory/src/games/memory/PiNumber/constants.ts)
│   │   │   │   │   ├── [index.tsx](./memory/src/games/memory/PiNumber/index.tsx)
│   │   │   │   │   ├── [keyHandlers.ts](./memory/src/games/memory/PiNumber/keyHandlers.ts)
│   │   │   │   │   └── [usePiGame.ts](./memory/src/games/memory/PiNumber/usePiGame.ts)
│   │   │   │   ├── Recall/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [Recall.test.tsx](./memory/src/games/memory/Recall/__tests__/Recall.test.tsx)
│   │   │   │   │   │   ├── [constants.test.ts](./memory/src/games/memory/Recall/__tests__/constants.test.ts)
│   │   │   │   │   │   ├── [useHighStreak.test.ts](./memory/src/games/memory/Recall/__tests__/useHighStreak.test.ts)
│   │   │   │   │   │   └── [useRecall.test.ts](./memory/src/games/memory/Recall/__tests__/useRecall.test.ts)
│   │   │   │   │   ├── [constants.ts](./memory/src/games/memory/Recall/constants.ts)
│   │   │   │   │   ├── [index.tsx](./memory/src/games/memory/Recall/index.tsx)
│   │   │   │   │   ├── [useHighStreak.ts](./memory/src/games/memory/Recall/useHighStreak.ts)
│   │   │   │   │   └── [useRecall.ts](./memory/src/games/memory/Recall/useRecall.ts)
│   │   │   │   └── _shared/
│   │   │   │       └── [games.ts](./memory/src/games/memory/_shared/games.ts)
│   │   │   ├── nikoli/
│   │   │   │   ├── Fillomino/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [Fillomino.test.tsx](./memory/src/games/nikoli/Fillomino/__tests__/Fillomino.test.tsx)
│   │   │   │   │   │   ├── [useFillomino.test.ts](./memory/src/games/nikoli/Fillomino/__tests__/useFillomino.test.ts)
│   │   │   │   │   │   └── [utils.test.ts](./memory/src/games/nikoli/Fillomino/__tests__/utils.test.ts)
│   │   │   │   │   ├── [index.tsx](./memory/src/games/nikoli/Fillomino/index.tsx)
│   │   │   │   │   ├── [types.ts](./memory/src/games/nikoli/Fillomino/types.ts)
│   │   │   │   │   ├── [useFillomino.ts](./memory/src/games/nikoli/Fillomino/useFillomino.ts)
│   │   │   │   │   └── [utils.ts](./memory/src/games/nikoli/Fillomino/utils.ts)
│   │   │   │   ├── Heyawake/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [Heyawake.test.tsx](./memory/src/games/nikoli/Heyawake/__tests__/Heyawake.test.tsx)
│   │   │   │   │   │   ├── [useHeyawake.test.ts](./memory/src/games/nikoli/Heyawake/__tests__/useHeyawake.test.ts)
│   │   │   │   │   │   └── [utils.test.ts](./memory/src/games/nikoli/Heyawake/__tests__/utils.test.ts)
│   │   │   │   │   ├── [index.tsx](./memory/src/games/nikoli/Heyawake/index.tsx)
│   │   │   │   │   ├── [types.ts](./memory/src/games/nikoli/Heyawake/types.ts)
│   │   │   │   │   ├── [useHeyawake.ts](./memory/src/games/nikoli/Heyawake/useHeyawake.ts)
│   │   │   │   │   └── [utils.ts](./memory/src/games/nikoli/Heyawake/utils.ts)
│   │   │   │   ├── Masyu/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [Masyu.test.tsx](./memory/src/games/nikoli/Masyu/__tests__/Masyu.test.tsx)
│   │   │   │   │   │   ├── [useMasyu.test.ts](./memory/src/games/nikoli/Masyu/__tests__/useMasyu.test.ts)
│   │   │   │   │   │   └── [utils.test.ts](./memory/src/games/nikoli/Masyu/__tests__/utils.test.ts)
│   │   │   │   │   ├── [AGENTS.md](./memory/src/games/nikoli/Masyu/AGENTS.md)
│   │   │   │   │   ├── [index.tsx](./memory/src/games/nikoli/Masyu/index.tsx)
│   │   │   │   │   ├── [types.ts](./memory/src/games/nikoli/Masyu/types.ts)
│   │   │   │   │   ├── [useMasyu.ts](./memory/src/games/nikoli/Masyu/useMasyu.ts)
│   │   │   │   │   └── [utils.ts](./memory/src/games/nikoli/Masyu/utils.ts)
│   │   │   │   ├── Norinori/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [Norinori.test.tsx](./memory/src/games/nikoli/Norinori/__tests__/Norinori.test.tsx)
│   │   │   │   │   │   ├── [useNorinori.test.ts](./memory/src/games/nikoli/Norinori/__tests__/useNorinori.test.ts)
│   │   │   │   │   │   └── [utils.test.ts](./memory/src/games/nikoli/Norinori/__tests__/utils.test.ts)
│   │   │   │   │   ├── [index.tsx](./memory/src/games/nikoli/Norinori/index.tsx)
│   │   │   │   │   ├── [types.ts](./memory/src/games/nikoli/Norinori/types.ts)
│   │   │   │   │   ├── [useNorinori.ts](./memory/src/games/nikoli/Norinori/useNorinori.ts)
│   │   │   │   │   └── [utils.ts](./memory/src/games/nikoli/Norinori/utils.ts)
│   │   │   │   ├── Nurikabe/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [Nurikabe.test.tsx](./memory/src/games/nikoli/Nurikabe/__tests__/Nurikabe.test.tsx)
│   │   │   │   │   │   ├── [useNurikabe.test.ts](./memory/src/games/nikoli/Nurikabe/__tests__/useNurikabe.test.ts)
│   │   │   │   │   │   └── [utils.test.ts](./memory/src/games/nikoli/Nurikabe/__tests__/utils.test.ts)
│   │   │   │   │   ├── [index.tsx](./memory/src/games/nikoli/Nurikabe/index.tsx)
│   │   │   │   │   ├── [types.ts](./memory/src/games/nikoli/Nurikabe/types.ts)
│   │   │   │   │   ├── [useNurikabe.ts](./memory/src/games/nikoli/Nurikabe/useNurikabe.ts)
│   │   │   │   │   └── [utils.ts](./memory/src/games/nikoli/Nurikabe/utils.ts)
│   │   │   │   ├── Shikaku/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [Shikaku.test.tsx](./memory/src/games/nikoli/Shikaku/__tests__/Shikaku.test.tsx)
│   │   │   │   │   │   ├── [useShikaku.test.ts](./memory/src/games/nikoli/Shikaku/__tests__/useShikaku.test.ts)
│   │   │   │   │   │   └── [utils.test.ts](./memory/src/games/nikoli/Shikaku/__tests__/utils.test.ts)
│   │   │   │   │   ├── [index.tsx](./memory/src/games/nikoli/Shikaku/index.tsx)
│   │   │   │   │   ├── [types.ts](./memory/src/games/nikoli/Shikaku/types.ts)
│   │   │   │   │   ├── [useShikaku.ts](./memory/src/games/nikoli/Shikaku/useShikaku.ts)
│   │   │   │   │   └── [utils.ts](./memory/src/games/nikoli/Shikaku/utils.ts)
│   │   │   │   ├── Sudoku/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── __snapshots__/
│   │   │   │   │   │   │   └── [index.test.tsx.snap](./memory/src/games/nikoli/Sudoku/__tests__/__snapshots__/index.test.tsx.snap)
│   │   │   │   │   │   ├── [index.test.tsx](./memory/src/games/nikoli/Sudoku/__tests__/index.test.tsx)
│   │   │   │   │   │   └── [useSudoku.test.ts](./memory/src/games/nikoli/Sudoku/__tests__/useSudoku.test.ts)
│   │   │   │   │   ├── utils/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   └── [sudoku.test.ts](./memory/src/games/nikoli/Sudoku/utils/__tests__/sudoku.test.ts)
│   │   │   │   │   │   └── [sudoku.ts](./memory/src/games/nikoli/Sudoku/utils/sudoku.ts)
│   │   │   │   │   ├── [index.tsx](./memory/src/games/nikoli/Sudoku/index.tsx)
│   │   │   │   │   ├── [types.ts](./memory/src/games/nikoli/Sudoku/types.ts)
│   │   │   │   │   └── [useSudoku.ts](./memory/src/games/nikoli/Sudoku/useSudoku.ts)
│   │   │   │   └── _shared/
│   │   │   │       ├── __tests__/
│   │   │   │       │   ├── [GameInstructions.test.tsx](./memory/src/games/nikoli/_shared/__tests__/GameInstructions.test.tsx)
│   │   │   │       │   └── [gameData.test.tsx](./memory/src/games/nikoli/_shared/__tests__/gameData.test.tsx)
│   │   │   │       ├── [GameInstructions.tsx](./memory/src/games/nikoli/_shared/GameInstructions.tsx)
│   │   │   │       ├── [gameData.tsx](./memory/src/games/nikoli/_shared/gameData.tsx)
│   │   │   │       └── [games.ts](./memory/src/games/nikoli/_shared/games.ts)
│   │   │   ├── puzzles/
│   │   │   │   ├── Game2048/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── __snapshots__/
│   │   │   │   │   │   │   └── [Game2048.test.tsx.snap](./memory/src/games/puzzles/Game2048/__tests__/__snapshots__/Game2048.test.tsx.snap)
│   │   │   │   │   │   └── [Game2048.test.tsx](./memory/src/games/puzzles/Game2048/__tests__/Game2048.test.tsx)
│   │   │   │   │   ├── utils/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   └── [game.test.ts](./memory/src/games/puzzles/Game2048/utils/__tests__/game.test.ts)
│   │   │   │   │   │   └── [game.ts](./memory/src/games/puzzles/Game2048/utils/game.ts)
│   │   │   │   │   ├── [AGENTS.md](./memory/src/games/puzzles/Game2048/AGENTS.md)
│   │   │   │   │   ├── [constants.ts](./memory/src/games/puzzles/Game2048/constants.ts)
│   │   │   │   │   ├── [index.tsx](./memory/src/games/puzzles/Game2048/index.tsx)
│   │   │   │   │   └── [types.ts](./memory/src/games/puzzles/Game2048/types.ts)
│   │   │   │   ├── LightsOut/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [LightsOut.test.tsx](./memory/src/games/puzzles/LightsOut/__tests__/LightsOut.test.tsx)
│   │   │   │   │   │   ├── [useLightsOut.test.ts](./memory/src/games/puzzles/LightsOut/__tests__/useLightsOut.test.ts)
│   │   │   │   │   │   └── [utils.test.ts](./memory/src/games/puzzles/LightsOut/__tests__/utils.test.ts)
│   │   │   │   │   ├── [AGENTS.md](./memory/src/games/puzzles/LightsOut/AGENTS.md)
│   │   │   │   │   ├── [index.tsx](./memory/src/games/puzzles/LightsOut/index.tsx)
│   │   │   │   │   ├── [useLightsOut.ts](./memory/src/games/puzzles/LightsOut/useLightsOut.ts)
│   │   │   │   │   └── [utils.ts](./memory/src/games/puzzles/LightsOut/utils.ts)
│   │   │   │   ├── SlidingPuzzle/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── __snapshots__/
│   │   │   │   │   │   │   └── [SlidingPuzzle.test.tsx.snap](./memory/src/games/puzzles/SlidingPuzzle/__tests__/__snapshots__/SlidingPuzzle.test.tsx.snap)
│   │   │   │   │   │   ├── [SlidingPuzzle.test.tsx](./memory/src/games/puzzles/SlidingPuzzle/__tests__/SlidingPuzzle.test.tsx)
│   │   │   │   │   │   ├── [useSlidingPuzzle.test.ts](./memory/src/games/puzzles/SlidingPuzzle/__tests__/useSlidingPuzzle.test.ts)
│   │   │   │   │   │   └── [utils.test.ts](./memory/src/games/puzzles/SlidingPuzzle/__tests__/utils.test.ts)
│   │   │   │   │   ├── [AGENTS.md](./memory/src/games/puzzles/SlidingPuzzle/AGENTS.md)
│   │   │   │   │   ├── [index.tsx](./memory/src/games/puzzles/SlidingPuzzle/index.tsx)
│   │   │   │   │   ├── [useSlidingPuzzle.ts](./memory/src/games/puzzles/SlidingPuzzle/useSlidingPuzzle.ts)
│   │   │   │   │   └── [utils.ts](./memory/src/games/puzzles/SlidingPuzzle/utils.ts)
│   │   │   │   ├── Towers/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── __snapshots__/
│   │   │   │   │   │   │   └── [Towers.test.tsx.snap](./memory/src/games/puzzles/Towers/__tests__/__snapshots__/Towers.test.tsx.snap)
│   │   │   │   │   │   └── [Towers.test.tsx](./memory/src/games/puzzles/Towers/__tests__/Towers.test.tsx)
│   │   │   │   │   ├── utils/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   └── [towers.test.ts](./memory/src/games/puzzles/Towers/utils/__tests__/towers.test.ts)
│   │   │   │   │   │   └── [towers.ts](./memory/src/games/puzzles/Towers/utils/towers.ts)
│   │   │   │   │   ├── [AGENTS.md](./memory/src/games/puzzles/Towers/AGENTS.md)
│   │   │   │   │   ├── [constants.ts](./memory/src/games/puzzles/Towers/constants.ts)
│   │   │   │   │   ├── [index.tsx](./memory/src/games/puzzles/Towers/index.tsx)
│   │   │   │   │   └── [types.ts](./memory/src/games/puzzles/Towers/types.ts)
│   │   │   │   └── _shared/
│   │   │   │       └── [games.ts](./memory/src/games/puzzles/_shared/games.ts)
│   │   │   └── tic-tac-toe/
│   │   │       ├── _shared/
│   │   │       │   ├── [board.ts](./memory/src/games/tic-tac-toe/_shared/board.ts)
│   │   │       │   └── [games.ts](./memory/src/games/tic-tac-toe/_shared/games.ts)
│   │   │       ├── classic/
│   │   │       │   ├── __tests__/
│   │   │       │   │   ├── [index.test.tsx](./memory/src/games/tic-tac-toe/classic/__tests__/index.test.tsx)
│   │   │       │   │   ├── [useClassic.test.tsx](./memory/src/games/tic-tac-toe/classic/__tests__/useClassic.test.tsx)
│   │   │       │   │   └── [utils.test.ts](./memory/src/games/tic-tac-toe/classic/__tests__/utils.test.ts)
│   │   │       │   ├── [index.tsx](./memory/src/games/tic-tac-toe/classic/index.tsx)
│   │   │       │   ├── [types.ts](./memory/src/games/tic-tac-toe/classic/types.ts)
│   │   │       │   ├── [useClassic.ts](./memory/src/games/tic-tac-toe/classic/useClassic.ts)
│   │   │       │   └── [utils.ts](./memory/src/games/tic-tac-toe/classic/utils.ts)
│   │   │       ├── duck/
│   │   │       │   ├── __tests__/
│   │   │       │   │   ├── [index.test.tsx](./memory/src/games/tic-tac-toe/duck/__tests__/index.test.tsx)
│   │   │       │   │   ├── [useDuck.test.tsx](./memory/src/games/tic-tac-toe/duck/__tests__/useDuck.test.tsx)
│   │   │       │   │   └── [utils.test.ts](./memory/src/games/tic-tac-toe/duck/__tests__/utils.test.ts)
│   │   │       │   ├── [index.tsx](./memory/src/games/tic-tac-toe/duck/index.tsx)
│   │   │       │   ├── [types.ts](./memory/src/games/tic-tac-toe/duck/types.ts)
│   │   │       │   ├── [useDuck.ts](./memory/src/games/tic-tac-toe/duck/useDuck.ts)
│   │   │       │   └── [utils.ts](./memory/src/games/tic-tac-toe/duck/utils.ts)
│   │   │       ├── notakto/
│   │   │       │   ├── __tests__/
│   │   │       │   │   ├── [index.test.tsx](./memory/src/games/tic-tac-toe/notakto/__tests__/index.test.tsx)
│   │   │       │   │   ├── [useNotakto.test.tsx](./memory/src/games/tic-tac-toe/notakto/__tests__/useNotakto.test.tsx)
│   │   │       │   │   └── [utils.test.ts](./memory/src/games/tic-tac-toe/notakto/__tests__/utils.test.ts)
│   │   │       │   ├── [index.tsx](./memory/src/games/tic-tac-toe/notakto/index.tsx)
│   │   │       │   ├── [types.ts](./memory/src/games/tic-tac-toe/notakto/types.ts)
│   │   │       │   ├── [useNotakto.ts](./memory/src/games/tic-tac-toe/notakto/useNotakto.ts)
│   │   │       │   └── [utils.ts](./memory/src/games/tic-tac-toe/notakto/utils.ts)
│   │   │       ├── reverse/
│   │   │       │   ├── __tests__/
│   │   │       │   │   ├── [index.test.tsx](./memory/src/games/tic-tac-toe/reverse/__tests__/index.test.tsx)
│   │   │       │   │   ├── [useReverse.test.tsx](./memory/src/games/tic-tac-toe/reverse/__tests__/useReverse.test.tsx)
│   │   │       │   │   └── [utils.test.ts](./memory/src/games/tic-tac-toe/reverse/__tests__/utils.test.ts)
│   │   │       │   ├── [index.tsx](./memory/src/games/tic-tac-toe/reverse/index.tsx)
│   │   │       │   ├── [types.ts](./memory/src/games/tic-tac-toe/reverse/types.ts)
│   │   │       │   ├── [useReverse.ts](./memory/src/games/tic-tac-toe/reverse/useReverse.ts)
│   │   │       │   └── [utils.ts](./memory/src/games/tic-tac-toe/reverse/utils.ts)
│   │   │       ├── t3/
│   │   │       │   ├── __tests__/
│   │   │       │   │   ├── [index.test.tsx](./memory/src/games/tic-tac-toe/t3/__tests__/index.test.tsx)
│   │   │       │   │   ├── [useT3.test.tsx](./memory/src/games/tic-tac-toe/t3/__tests__/useT3.test.tsx)
│   │   │       │   │   └── [utils.test.ts](./memory/src/games/tic-tac-toe/t3/__tests__/utils.test.ts)
│   │   │       │   ├── [index.tsx](./memory/src/games/tic-tac-toe/t3/index.tsx)
│   │   │       │   ├── [types.ts](./memory/src/games/tic-tac-toe/t3/types.ts)
│   │   │       │   ├── [useT3.ts](./memory/src/games/tic-tac-toe/t3/useT3.ts)
│   │   │       │   └── [utils.ts](./memory/src/games/tic-tac-toe/t3/utils.ts)
│   │   │       └── wild/
│   │   │           ├── __tests__/
│   │   │           │   ├── [index.test.tsx](./memory/src/games/tic-tac-toe/wild/__tests__/index.test.tsx)
│   │   │           │   ├── [useWild.test.tsx](./memory/src/games/tic-tac-toe/wild/__tests__/useWild.test.tsx)
│   │   │           │   └── [utils.test.ts](./memory/src/games/tic-tac-toe/wild/__tests__/utils.test.ts)
│   │   │           ├── [index.tsx](./memory/src/games/tic-tac-toe/wild/index.tsx)
│   │   │           ├── [types.ts](./memory/src/games/tic-tac-toe/wild/types.ts)
│   │   │           ├── [useWild.ts](./memory/src/games/tic-tac-toe/wild/useWild.ts)
│   │   │           └── [utils.ts](./memory/src/games/tic-tac-toe/wild/utils.ts)
│   │   └── styles/
│   │       ├── [globals.css](./memory/src/styles/globals.css)
│   │       └── [themes.css](./memory/src/styles/themes.css)
│   ├── src-tauri/
│   │   ├── capabilities/
│   │   │   └── [default.json](./memory/src-tauri/capabilities/default.json)
│   │   ├── icons/
│   │   │   ├── android/
│   │   │   │   ├── mipmap-anydpi-v26/
│   │   │   │   │   └── [ic_launcher.xml](./memory/src-tauri/icons/android/mipmap-anydpi-v26/ic_launcher.xml)
│   │   │   │   ├── mipmap-hdpi/
│   │   │   │   │   ├── [ic_launcher.png](./memory/src-tauri/icons/android/mipmap-hdpi/ic_launcher.png)
│   │   │   │   │   ├── [ic_launcher_foreground.png](./memory/src-tauri/icons/android/mipmap-hdpi/ic_launcher_foreground.png)
│   │   │   │   │   └── [ic_launcher_round.png](./memory/src-tauri/icons/android/mipmap-hdpi/ic_launcher_round.png)
│   │   │   │   ├── mipmap-mdpi/
│   │   │   │   │   ├── [ic_launcher.png](./memory/src-tauri/icons/android/mipmap-mdpi/ic_launcher.png)
│   │   │   │   │   ├── [ic_launcher_foreground.png](./memory/src-tauri/icons/android/mipmap-mdpi/ic_launcher_foreground.png)
│   │   │   │   │   └── [ic_launcher_round.png](./memory/src-tauri/icons/android/mipmap-mdpi/ic_launcher_round.png)
│   │   │   │   ├── mipmap-xhdpi/
│   │   │   │   │   ├── [ic_launcher.png](./memory/src-tauri/icons/android/mipmap-xhdpi/ic_launcher.png)
│   │   │   │   │   ├── [ic_launcher_foreground.png](./memory/src-tauri/icons/android/mipmap-xhdpi/ic_launcher_foreground.png)
│   │   │   │   │   └── [ic_launcher_round.png](./memory/src-tauri/icons/android/mipmap-xhdpi/ic_launcher_round.png)
│   │   │   │   ├── mipmap-xxhdpi/
│   │   │   │   │   ├── [ic_launcher.png](./memory/src-tauri/icons/android/mipmap-xxhdpi/ic_launcher.png)
│   │   │   │   │   ├── [ic_launcher_foreground.png](./memory/src-tauri/icons/android/mipmap-xxhdpi/ic_launcher_foreground.png)
│   │   │   │   │   └── [ic_launcher_round.png](./memory/src-tauri/icons/android/mipmap-xxhdpi/ic_launcher_round.png)
│   │   │   │   ├── mipmap-xxxhdpi/
│   │   │   │   │   ├── [ic_launcher.png](./memory/src-tauri/icons/android/mipmap-xxxhdpi/ic_launcher.png)
│   │   │   │   │   ├── [ic_launcher_foreground.png](./memory/src-tauri/icons/android/mipmap-xxxhdpi/ic_launcher_foreground.png)
│   │   │   │   │   └── [ic_launcher_round.png](./memory/src-tauri/icons/android/mipmap-xxxhdpi/ic_launcher_round.png)
│   │   │   │   └── values/
│   │   │   │       └── [ic_launcher_background.xml](./memory/src-tauri/icons/android/values/ic_launcher_background.xml)
│   │   │   ├── ios/
│   │   │   │   ├── [AppIcon-20x20@1x.png](./memory/src-tauri/icons/ios/AppIcon-20x20@1x.png)
│   │   │   │   ├── [AppIcon-20x20@2x-1.png](./memory/src-tauri/icons/ios/AppIcon-20x20@2x-1.png)
│   │   │   │   ├── [AppIcon-20x20@2x.png](./memory/src-tauri/icons/ios/AppIcon-20x20@2x.png)
│   │   │   │   ├── [AppIcon-20x20@3x.png](./memory/src-tauri/icons/ios/AppIcon-20x20@3x.png)
│   │   │   │   ├── [AppIcon-29x29@1x.png](./memory/src-tauri/icons/ios/AppIcon-29x29@1x.png)
│   │   │   │   ├── [AppIcon-29x29@2x-1.png](./memory/src-tauri/icons/ios/AppIcon-29x29@2x-1.png)
│   │   │   │   ├── [AppIcon-29x29@2x.png](./memory/src-tauri/icons/ios/AppIcon-29x29@2x.png)
│   │   │   │   ├── [AppIcon-29x29@3x.png](./memory/src-tauri/icons/ios/AppIcon-29x29@3x.png)
│   │   │   │   ├── [AppIcon-40x40@1x.png](./memory/src-tauri/icons/ios/AppIcon-40x40@1x.png)
│   │   │   │   ├── [AppIcon-40x40@2x-1.png](./memory/src-tauri/icons/ios/AppIcon-40x40@2x-1.png)
│   │   │   │   ├── [AppIcon-40x40@2x.png](./memory/src-tauri/icons/ios/AppIcon-40x40@2x.png)
│   │   │   │   ├── [AppIcon-40x40@3x.png](./memory/src-tauri/icons/ios/AppIcon-40x40@3x.png)
│   │   │   │   ├── [AppIcon-512@2x.png](./memory/src-tauri/icons/ios/AppIcon-512@2x.png)
│   │   │   │   ├── [AppIcon-60x60@2x.png](./memory/src-tauri/icons/ios/AppIcon-60x60@2x.png)
│   │   │   │   ├── [AppIcon-60x60@3x.png](./memory/src-tauri/icons/ios/AppIcon-60x60@3x.png)
│   │   │   │   ├── [AppIcon-76x76@1x.png](./memory/src-tauri/icons/ios/AppIcon-76x76@1x.png)
│   │   │   │   ├── [AppIcon-76x76@2x.png](./memory/src-tauri/icons/ios/AppIcon-76x76@2x.png)
│   │   │   │   └── [AppIcon-83.5x83.5@2x.png](./memory/src-tauri/icons/ios/AppIcon-83.5x83.5@2x.png)
│   │   │   ├── [128x128.png](./memory/src-tauri/icons/128x128.png)
│   │   │   ├── [128x128@2x.png](./memory/src-tauri/icons/128x128@2x.png)
│   │   │   ├── [256x256.png](./memory/src-tauri/icons/256x256.png)
│   │   │   ├── [32x32.png](./memory/src-tauri/icons/32x32.png)
│   │   │   ├── [64x64.png](./memory/src-tauri/icons/64x64.png)
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
│   │   │   ├── [create-icons.sh](./memory/src-tauri/icons/create-icons.sh)
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
├── [README.md](./README.md)
└── [TREE.md](./TREE.md)
```

187 directories, 472 files
