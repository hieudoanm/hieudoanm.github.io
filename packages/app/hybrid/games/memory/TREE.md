# TREE

```text
├── docs/
│   ├── [ARCHITECTURE.md](./docs/ARCHITECTURE.md)
│   ├── [CONTRIBUTING.md](./docs/CONTRIBUTING.md)
│   ├── [DOWNLOADS.md](./docs/DOWNLOADS.md)
│   ├── [PACKAGING.md](./docs/PACKAGING.md)
│   └── [ROADMAP.md](./docs/ROADMAP.md)
├── e2e/
│   ├── screenshots/
│   │   ├── [about.png](./e2e/screenshots/about.png)
│   │   ├── [downloads.png](./e2e/screenshots/downloads.png)
│   │   ├── [home.png](./e2e/screenshots/home.png)
│   │   └── [version.png](./e2e/screenshots/version.png)
│   ├── [about.spec.ts](./e2e/about.spec.ts)
│   ├── [downloads.spec.ts](./e2e/downloads.spec.ts)
│   ├── [home.spec.ts](./e2e/home.spec.ts)
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
│   │   │   ├── 8-bit/
│   │   │   │   ├── dino-run/
│   │   │   │   │   └── [page.tsx](./src/app/(games)/8-bit/dino-run/page.tsx)
│   │   │   │   ├── maze/
│   │   │   │   │   └── [page.tsx](./src/app/(games)/8-bit/maze/page.tsx)
│   │   │   │   ├── rock-paper-scissors/
│   │   │   │   │   └── [page.tsx](./src/app/(games)/8-bit/rock-paper-scissors/page.tsx)
│   │   │   │   ├── snake/
│   │   │   │   │   └── [page.tsx](./src/app/(games)/8-bit/snake/page.tsx)
│   │   │   │   └── [page.tsx](./src/app/(games)/8-bit/page.tsx)
│   │   │   ├── memory/
│   │   │   │   ├── memory-match/
│   │   │   │   │   └── [page.tsx](./src/app/(games)/memory/memory-match/page.tsx)
│   │   │   │   ├── n-back/
│   │   │   │   │   └── [page.tsx](./src/app/(games)/memory/n-back/page.tsx)
│   │   │   │   ├── pi/
│   │   │   │   │   └── [page.tsx](./src/app/(games)/memory/pi/page.tsx)
│   │   │   │   ├── recall/
│   │   │   │   │   └── [page.tsx](./src/app/(games)/memory/recall/page.tsx)
│   │   │   │   └── [page.tsx](./src/app/(games)/memory/page.tsx)
│   │   │   ├── nikoli/
│   │   │   │   ├── fillomino/
│   │   │   │   │   └── [page.tsx](./src/app/(games)/nikoli/fillomino/page.tsx)
│   │   │   │   ├── heyawake/
│   │   │   │   │   └── [page.tsx](./src/app/(games)/nikoli/heyawake/page.tsx)
│   │   │   │   ├── masyu/
│   │   │   │   │   └── [page.tsx](./src/app/(games)/nikoli/masyu/page.tsx)
│   │   │   │   ├── norinori/
│   │   │   │   │   └── [page.tsx](./src/app/(games)/nikoli/norinori/page.tsx)
│   │   │   │   ├── nurikabe/
│   │   │   │   │   └── [page.tsx](./src/app/(games)/nikoli/nurikabe/page.tsx)
│   │   │   │   ├── shikaku/
│   │   │   │   │   └── [page.tsx](./src/app/(games)/nikoli/shikaku/page.tsx)
│   │   │   │   ├── sudoku/
│   │   │   │   │   └── [page.tsx](./src/app/(games)/nikoli/sudoku/page.tsx)
│   │   │   │   └── [page.tsx](./src/app/(games)/nikoli/page.tsx)
│   │   │   ├── puzzles/
│   │   │   │   ├── game2048/
│   │   │   │   │   └── [page.tsx](./src/app/(games)/puzzles/game2048/page.tsx)
│   │   │   │   ├── lights-out/
│   │   │   │   │   └── [page.tsx](./src/app/(games)/puzzles/lights-out/page.tsx)
│   │   │   │   ├── sliding-puzzle/
│   │   │   │   │   └── [page.tsx](./src/app/(games)/puzzles/sliding-puzzle/page.tsx)
│   │   │   │   ├── towers/
│   │   │   │   │   └── [page.tsx](./src/app/(games)/puzzles/towers/page.tsx)
│   │   │   │   └── [page.tsx](./src/app/(games)/puzzles/page.tsx)
│   │   │   └── tic-tac-toe/
│   │   │       ├── classic/
│   │   │       │   └── [page.tsx](./src/app/(games)/tic-tac-toe/classic/page.tsx)
│   │   │       ├── duck/
│   │   │       │   └── [page.tsx](./src/app/(games)/tic-tac-toe/duck/page.tsx)
│   │   │       ├── notakto/
│   │   │       │   └── [page.tsx](./src/app/(games)/tic-tac-toe/notakto/page.tsx)
│   │   │       ├── reverse/
│   │   │       │   └── [page.tsx](./src/app/(games)/tic-tac-toe/reverse/page.tsx)
│   │   │       ├── t3/
│   │   │       │   └── [page.tsx](./src/app/(games)/tic-tac-toe/t3/page.tsx)
│   │   │       ├── wild/
│   │   │       │   └── [page.tsx](./src/app/(games)/tic-tac-toe/wild/page.tsx)
│   │   │       └── [page.tsx](./src/app/(games)/tic-tac-toe/page.tsx)
│   │   ├── (info)/
│   │   │   ├── about/
│   │   │   │   └── [page.tsx](./src/app/(info)/about/page.tsx)
│   │   │   ├── downloads/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [page.test.tsx](./src/app/(info)/downloads/__tests__/page.test.tsx)
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
│   │   ├── [page.tsx](./src/app/page.tsx)
│   │   ├── [robots.ts](./src/app/robots.ts)
│   │   ├── [template.tsx](./src/app/template.tsx)
│   │   └── [unauthorized.tsx](./src/app/unauthorized.tsx)
│   ├── components/
│   │   ├── atoms/
│   │   │   ├── __tests__/
│   │   │   │   └── [Dropzone.test.tsx](./src/components/atoms/__tests__/Dropzone.test.tsx)
│   │   │   ├── [Dropzone.tsx](./src/components/atoms/Dropzone.tsx)
│   │   │   └── [index.ts](./src/components/atoms/index.ts)
│   │   ├── molecules/
│   │   ├── organisms/
│   │   │   ├── __tests__/
│   │   │   │   └── [Header.test.tsx](./src/components/organisms/__tests__/Header.test.tsx)
│   │   │   └── [Header.tsx](./src/components/organisms/Header.tsx)
│   │   └── templates/
│   │       ├── __tests__/
│   │       │   ├── [AboutTemplate.test.tsx](./src/components/templates/__tests__/AboutTemplate.test.tsx)
│   │       │   ├── [DownloadsTemplate.test.tsx](./src/components/templates/__tests__/DownloadsTemplate.test.tsx)
│   │       │   ├── [ErrorTemplate.test.tsx](./src/components/templates/__tests__/ErrorTemplate.test.tsx)
│   │       │   ├── [GamesTemplate.test.tsx](./src/components/templates/__tests__/GamesTemplate.test.tsx)
│   │       │   └── [VersionTemplate.test.tsx](./src/components/templates/__tests__/VersionTemplate.test.tsx)
│   │       ├── [AboutTemplate.tsx](./src/components/templates/AboutTemplate.tsx)
│   │       ├── [DownloadsTemplate.tsx](./src/components/templates/DownloadsTemplate.tsx)
│   │       ├── [ErrorTemplate.tsx](./src/components/templates/ErrorTemplate.tsx)
│   │       ├── [GamesTemplate.tsx](./src/components/templates/GamesTemplate.tsx)
│   │       └── [VersionTemplate.tsx](./src/components/templates/VersionTemplate.tsx)
│   ├── content/
│   │   ├── [about.ts](./src/content/about.ts)
│   │   ├── [download.ts](./src/content/download.ts)
│   │   └── [version.ts](./src/content/version.ts)
│   ├── data/
│   │   └── [pi.ts](./src/data/pi.ts)
│   ├── games/
│   │   ├── 8-bit/
│   │   │   ├── DinoRun/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [game.test.ts](./src/games/8-bit/DinoRun/__tests__/game.test.ts)
│   │   │   │   │   └── [index.test.tsx](./src/games/8-bit/DinoRun/__tests__/index.test.tsx)
│   │   │   │   ├── [constants.ts](./src/games/8-bit/DinoRun/constants.ts)
│   │   │   │   ├── [game.ts](./src/games/8-bit/DinoRun/game.ts)
│   │   │   │   ├── [index.tsx](./src/games/8-bit/DinoRun/index.tsx)
│   │   │   │   └── [types.ts](./src/games/8-bit/DinoRun/types.ts)
│   │   │   ├── Maze/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [index.test.tsx](./src/games/8-bit/Maze/__tests__/index.test.tsx)
│   │   │   │   │   └── [maze.test.ts](./src/games/8-bit/Maze/__tests__/maze.test.ts)
│   │   │   │   ├── [constants.ts](./src/games/8-bit/Maze/constants.ts)
│   │   │   │   ├── [index.tsx](./src/games/8-bit/Maze/index.tsx)
│   │   │   │   ├── [maze.ts](./src/games/8-bit/Maze/maze.ts)
│   │   │   │   └── [types.ts](./src/games/8-bit/Maze/types.ts)
│   │   │   ├── RockPaperScissors/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [index.test.tsx](./src/games/8-bit/RockPaperScissors/__tests__/index.test.tsx)
│   │   │   │   │   └── [utils.test.ts](./src/games/8-bit/RockPaperScissors/__tests__/utils.test.ts)
│   │   │   │   ├── [index.tsx](./src/games/8-bit/RockPaperScissors/index.tsx)
│   │   │   │   ├── [types.ts](./src/games/8-bit/RockPaperScissors/types.ts)
│   │   │   │   └── [utils.ts](./src/games/8-bit/RockPaperScissors/utils.ts)
│   │   │   ├── Snake/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [index.test.tsx](./src/games/8-bit/Snake/__tests__/index.test.tsx)
│   │   │   │   │   └── [snake.test.ts](./src/games/8-bit/Snake/__tests__/snake.test.ts)
│   │   │   │   ├── [constants.ts](./src/games/8-bit/Snake/constants.ts)
│   │   │   │   ├── [index.tsx](./src/games/8-bit/Snake/index.tsx)
│   │   │   │   ├── [snake.ts](./src/games/8-bit/Snake/snake.ts)
│   │   │   │   └── [types.ts](./src/games/8-bit/Snake/types.ts)
│   │   │   └── _shared/
│   │   │       ├── __tests__/
│   │   │       │   ├── [GameInstructions.test.tsx](./src/games/8-bit/_shared/__tests__/GameInstructions.test.tsx)
│   │   │       │   └── [gameData.test.ts](./src/games/8-bit/_shared/__tests__/gameData.test.ts)
│   │   │       ├── [GameInstructions.tsx](./src/games/8-bit/_shared/GameInstructions.tsx)
│   │   │       └── [gameData.tsx](./src/games/8-bit/_shared/gameData.tsx)
│   │   ├── memory/
│   │   │   ├── MemoryMatch/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [MemoryMatch.test.tsx](./src/games/memory/MemoryMatch/__tests__/MemoryMatch.test.tsx)
│   │   │   │   │   ├── [useMemoryMatch.test.ts](./src/games/memory/MemoryMatch/__tests__/useMemoryMatch.test.ts)
│   │   │   │   │   └── [utils.test.ts](./src/games/memory/MemoryMatch/__tests__/utils.test.ts)
│   │   │   │   ├── [index.tsx](./src/games/memory/MemoryMatch/index.tsx)
│   │   │   │   ├── [useMemoryMatch.ts](./src/games/memory/MemoryMatch/useMemoryMatch.ts)
│   │   │   │   └── [utils.ts](./src/games/memory/MemoryMatch/utils.ts)
│   │   │   ├── NBack/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [NBack.test.tsx](./src/games/memory/NBack/__tests__/NBack.test.tsx)
│   │   │   │   │   └── [constants.test.ts](./src/games/memory/NBack/__tests__/constants.test.ts)
│   │   │   │   ├── [constants.ts](./src/games/memory/NBack/constants.ts)
│   │   │   │   └── [index.tsx](./src/games/memory/NBack/index.tsx)
│   │   │   ├── PiNumber/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [Pi.test.tsx](./src/games/memory/PiNumber/__tests__/Pi.test.tsx)
│   │   │   │   │   ├── [constants.test.ts](./src/games/memory/PiNumber/__tests__/constants.test.ts)
│   │   │   │   │   ├── [keyHandlers.test.ts](./src/games/memory/PiNumber/__tests__/keyHandlers.test.ts)
│   │   │   │   │   └── [usePiGame.test.ts](./src/games/memory/PiNumber/__tests__/usePiGame.test.ts)
│   │   │   │   ├── [constants.ts](./src/games/memory/PiNumber/constants.ts)
│   │   │   │   ├── [index.tsx](./src/games/memory/PiNumber/index.tsx)
│   │   │   │   ├── [keyHandlers.ts](./src/games/memory/PiNumber/keyHandlers.ts)
│   │   │   │   └── [usePiGame.ts](./src/games/memory/PiNumber/usePiGame.ts)
│   │   │   └── Recall/
│   │   │       ├── __tests__/
│   │   │       │   ├── [Recall.test.tsx](./src/games/memory/Recall/__tests__/Recall.test.tsx)
│   │   │       │   ├── [constants.test.ts](./src/games/memory/Recall/__tests__/constants.test.ts)
│   │   │       │   ├── [useHighStreak.test.ts](./src/games/memory/Recall/__tests__/useHighStreak.test.ts)
│   │   │       │   └── [useRecall.test.ts](./src/games/memory/Recall/__tests__/useRecall.test.ts)
│   │   │       ├── [constants.ts](./src/games/memory/Recall/constants.ts)
│   │   │       ├── [index.tsx](./src/games/memory/Recall/index.tsx)
│   │   │       ├── [useHighStreak.ts](./src/games/memory/Recall/useHighStreak.ts)
│   │   │       └── [useRecall.ts](./src/games/memory/Recall/useRecall.ts)
│   │   ├── nikoli/
│   │   │   ├── Fillomino/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [Fillomino.test.tsx](./src/games/nikoli/Fillomino/__tests__/Fillomino.test.tsx)
│   │   │   │   │   ├── [useFillomino.test.ts](./src/games/nikoli/Fillomino/__tests__/useFillomino.test.ts)
│   │   │   │   │   └── [utils.test.ts](./src/games/nikoli/Fillomino/__tests__/utils.test.ts)
│   │   │   │   ├── [index.tsx](./src/games/nikoli/Fillomino/index.tsx)
│   │   │   │   ├── [types.ts](./src/games/nikoli/Fillomino/types.ts)
│   │   │   │   ├── [useFillomino.ts](./src/games/nikoli/Fillomino/useFillomino.ts)
│   │   │   │   └── [utils.ts](./src/games/nikoli/Fillomino/utils.ts)
│   │   │   ├── Heyawake/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [Heyawake.test.tsx](./src/games/nikoli/Heyawake/__tests__/Heyawake.test.tsx)
│   │   │   │   │   ├── [useHeyawake.test.ts](./src/games/nikoli/Heyawake/__tests__/useHeyawake.test.ts)
│   │   │   │   │   └── [utils.test.ts](./src/games/nikoli/Heyawake/__tests__/utils.test.ts)
│   │   │   │   ├── [index.tsx](./src/games/nikoli/Heyawake/index.tsx)
│   │   │   │   ├── [types.ts](./src/games/nikoli/Heyawake/types.ts)
│   │   │   │   ├── [useHeyawake.ts](./src/games/nikoli/Heyawake/useHeyawake.ts)
│   │   │   │   └── [utils.ts](./src/games/nikoli/Heyawake/utils.ts)
│   │   │   ├── Masyu/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [Masyu.test.tsx](./src/games/nikoli/Masyu/__tests__/Masyu.test.tsx)
│   │   │   │   │   ├── [useMasyu.test.ts](./src/games/nikoli/Masyu/__tests__/useMasyu.test.ts)
│   │   │   │   │   └── [utils.test.ts](./src/games/nikoli/Masyu/__tests__/utils.test.ts)
│   │   │   │   ├── [AGENTS.md](./src/games/nikoli/Masyu/AGENTS.md)
│   │   │   │   ├── [index.tsx](./src/games/nikoli/Masyu/index.tsx)
│   │   │   │   ├── [types.ts](./src/games/nikoli/Masyu/types.ts)
│   │   │   │   ├── [useMasyu.ts](./src/games/nikoli/Masyu/useMasyu.ts)
│   │   │   │   └── [utils.ts](./src/games/nikoli/Masyu/utils.ts)
│   │   │   ├── Norinori/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [Norinori.test.tsx](./src/games/nikoli/Norinori/__tests__/Norinori.test.tsx)
│   │   │   │   │   ├── [useNorinori.test.ts](./src/games/nikoli/Norinori/__tests__/useNorinori.test.ts)
│   │   │   │   │   └── [utils.test.ts](./src/games/nikoli/Norinori/__tests__/utils.test.ts)
│   │   │   │   ├── [index.tsx](./src/games/nikoli/Norinori/index.tsx)
│   │   │   │   ├── [types.ts](./src/games/nikoli/Norinori/types.ts)
│   │   │   │   ├── [useNorinori.ts](./src/games/nikoli/Norinori/useNorinori.ts)
│   │   │   │   └── [utils.ts](./src/games/nikoli/Norinori/utils.ts)
│   │   │   ├── Nurikabe/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [Nurikabe.test.tsx](./src/games/nikoli/Nurikabe/__tests__/Nurikabe.test.tsx)
│   │   │   │   │   ├── [useNurikabe.test.ts](./src/games/nikoli/Nurikabe/__tests__/useNurikabe.test.ts)
│   │   │   │   │   └── [utils.test.ts](./src/games/nikoli/Nurikabe/__tests__/utils.test.ts)
│   │   │   │   ├── [index.tsx](./src/games/nikoli/Nurikabe/index.tsx)
│   │   │   │   ├── [types.ts](./src/games/nikoli/Nurikabe/types.ts)
│   │   │   │   ├── [useNurikabe.ts](./src/games/nikoli/Nurikabe/useNurikabe.ts)
│   │   │   │   └── [utils.ts](./src/games/nikoli/Nurikabe/utils.ts)
│   │   │   ├── Shikaku/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [Shikaku.test.tsx](./src/games/nikoli/Shikaku/__tests__/Shikaku.test.tsx)
│   │   │   │   │   ├── [useShikaku.test.ts](./src/games/nikoli/Shikaku/__tests__/useShikaku.test.ts)
│   │   │   │   │   └── [utils.test.ts](./src/games/nikoli/Shikaku/__tests__/utils.test.ts)
│   │   │   │   ├── [index.tsx](./src/games/nikoli/Shikaku/index.tsx)
│   │   │   │   ├── [types.ts](./src/games/nikoli/Shikaku/types.ts)
│   │   │   │   ├── [useShikaku.ts](./src/games/nikoli/Shikaku/useShikaku.ts)
│   │   │   │   └── [utils.ts](./src/games/nikoli/Shikaku/utils.ts)
│   │   │   ├── Sudoku/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── __snapshots__/
│   │   │   │   │   │   └── [index.test.tsx.snap](./src/games/nikoli/Sudoku/__tests__/__snapshots__/index.test.tsx.snap)
│   │   │   │   │   ├── [index.test.tsx](./src/games/nikoli/Sudoku/__tests__/index.test.tsx)
│   │   │   │   │   └── [useSudoku.test.ts](./src/games/nikoli/Sudoku/__tests__/useSudoku.test.ts)
│   │   │   │   ├── utils/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [sudoku.test.ts](./src/games/nikoli/Sudoku/utils/__tests__/sudoku.test.ts)
│   │   │   │   │   └── [sudoku.ts](./src/games/nikoli/Sudoku/utils/sudoku.ts)
│   │   │   │   ├── [index.tsx](./src/games/nikoli/Sudoku/index.tsx)
│   │   │   │   ├── [types.ts](./src/games/nikoli/Sudoku/types.ts)
│   │   │   │   └── [useSudoku.ts](./src/games/nikoli/Sudoku/useSudoku.ts)
│   │   │   └── _shared/
│   │   │       ├── __tests__/
│   │   │       │   ├── [GameInstructions.test.tsx](./src/games/nikoli/_shared/__tests__/GameInstructions.test.tsx)
│   │   │       │   └── [gameData.test.tsx](./src/games/nikoli/_shared/__tests__/gameData.test.tsx)
│   │   │       ├── [GameInstructions.tsx](./src/games/nikoli/_shared/GameInstructions.tsx)
│   │   │       └── [gameData.tsx](./src/games/nikoli/_shared/gameData.tsx)
│   │   ├── puzzles/
│   │   │   ├── Game2048/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── __snapshots__/
│   │   │   │   │   │   └── [Game2048.test.tsx.snap](./src/games/puzzles/Game2048/__tests__/__snapshots__/Game2048.test.tsx.snap)
│   │   │   │   │   └── [Game2048.test.tsx](./src/games/puzzles/Game2048/__tests__/Game2048.test.tsx)
│   │   │   │   ├── utils/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [game.test.ts](./src/games/puzzles/Game2048/utils/__tests__/game.test.ts)
│   │   │   │   │   └── [game.ts](./src/games/puzzles/Game2048/utils/game.ts)
│   │   │   │   ├── [AGENTS.md](./src/games/puzzles/Game2048/AGENTS.md)
│   │   │   │   ├── [constants.ts](./src/games/puzzles/Game2048/constants.ts)
│   │   │   │   ├── [index.tsx](./src/games/puzzles/Game2048/index.tsx)
│   │   │   │   └── [types.ts](./src/games/puzzles/Game2048/types.ts)
│   │   │   ├── LightsOut/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [LightsOut.test.tsx](./src/games/puzzles/LightsOut/__tests__/LightsOut.test.tsx)
│   │   │   │   │   ├── [useLightsOut.test.ts](./src/games/puzzles/LightsOut/__tests__/useLightsOut.test.ts)
│   │   │   │   │   └── [utils.test.ts](./src/games/puzzles/LightsOut/__tests__/utils.test.ts)
│   │   │   │   ├── [AGENTS.md](./src/games/puzzles/LightsOut/AGENTS.md)
│   │   │   │   ├── [index.tsx](./src/games/puzzles/LightsOut/index.tsx)
│   │   │   │   ├── [useLightsOut.ts](./src/games/puzzles/LightsOut/useLightsOut.ts)
│   │   │   │   └── [utils.ts](./src/games/puzzles/LightsOut/utils.ts)
│   │   │   ├── SlidingPuzzle/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── __snapshots__/
│   │   │   │   │   │   └── [SlidingPuzzle.test.tsx.snap](./src/games/puzzles/SlidingPuzzle/__tests__/__snapshots__/SlidingPuzzle.test.tsx.snap)
│   │   │   │   │   ├── [SlidingPuzzle.test.tsx](./src/games/puzzles/SlidingPuzzle/__tests__/SlidingPuzzle.test.tsx)
│   │   │   │   │   ├── [useSlidingPuzzle.test.ts](./src/games/puzzles/SlidingPuzzle/__tests__/useSlidingPuzzle.test.ts)
│   │   │   │   │   └── [utils.test.ts](./src/games/puzzles/SlidingPuzzle/__tests__/utils.test.ts)
│   │   │   │   ├── [AGENTS.md](./src/games/puzzles/SlidingPuzzle/AGENTS.md)
│   │   │   │   ├── [index.tsx](./src/games/puzzles/SlidingPuzzle/index.tsx)
│   │   │   │   ├── [useSlidingPuzzle.ts](./src/games/puzzles/SlidingPuzzle/useSlidingPuzzle.ts)
│   │   │   │   └── [utils.ts](./src/games/puzzles/SlidingPuzzle/utils.ts)
│   │   │   └── Towers/
│   │   │       ├── __tests__/
│   │   │       │   ├── __snapshots__/
│   │   │       │   │   └── [Towers.test.tsx.snap](./src/games/puzzles/Towers/__tests__/__snapshots__/Towers.test.tsx.snap)
│   │   │       │   └── [Towers.test.tsx](./src/games/puzzles/Towers/__tests__/Towers.test.tsx)
│   │   │       ├── utils/
│   │   │       │   ├── __tests__/
│   │   │       │   │   └── [towers.test.ts](./src/games/puzzles/Towers/utils/__tests__/towers.test.ts)
│   │   │       │   └── [towers.ts](./src/games/puzzles/Towers/utils/towers.ts)
│   │   │       ├── [AGENTS.md](./src/games/puzzles/Towers/AGENTS.md)
│   │   │       ├── [constants.ts](./src/games/puzzles/Towers/constants.ts)
│   │   │       ├── [index.tsx](./src/games/puzzles/Towers/index.tsx)
│   │   │       └── [types.ts](./src/games/puzzles/Towers/types.ts)
│   │   └── tic-tac-toe/
│   │       ├── _shared/
│   │       │   └── [board.ts](./src/games/tic-tac-toe/_shared/board.ts)
│   │       ├── classic/
│   │       │   ├── __tests__/
│   │       │   │   ├── [index.test.tsx](./src/games/tic-tac-toe/classic/__tests__/index.test.tsx)
│   │       │   │   ├── [useClassic.test.tsx](./src/games/tic-tac-toe/classic/__tests__/useClassic.test.tsx)
│   │       │   │   └── [utils.test.ts](./src/games/tic-tac-toe/classic/__tests__/utils.test.ts)
│   │       │   ├── [index.tsx](./src/games/tic-tac-toe/classic/index.tsx)
│   │       │   ├── [types.ts](./src/games/tic-tac-toe/classic/types.ts)
│   │       │   ├── [useClassic.ts](./src/games/tic-tac-toe/classic/useClassic.ts)
│   │       │   └── [utils.ts](./src/games/tic-tac-toe/classic/utils.ts)
│   │       ├── duck/
│   │       │   ├── __tests__/
│   │       │   │   ├── [index.test.tsx](./src/games/tic-tac-toe/duck/__tests__/index.test.tsx)
│   │       │   │   ├── [useDuck.test.tsx](./src/games/tic-tac-toe/duck/__tests__/useDuck.test.tsx)
│   │       │   │   └── [utils.test.ts](./src/games/tic-tac-toe/duck/__tests__/utils.test.ts)
│   │       │   ├── [index.tsx](./src/games/tic-tac-toe/duck/index.tsx)
│   │       │   ├── [types.ts](./src/games/tic-tac-toe/duck/types.ts)
│   │       │   ├── [useDuck.ts](./src/games/tic-tac-toe/duck/useDuck.ts)
│   │       │   └── [utils.ts](./src/games/tic-tac-toe/duck/utils.ts)
│   │       ├── notakto/
│   │       │   ├── __tests__/
│   │       │   │   ├── [index.test.tsx](./src/games/tic-tac-toe/notakto/__tests__/index.test.tsx)
│   │       │   │   ├── [useNotakto.test.tsx](./src/games/tic-tac-toe/notakto/__tests__/useNotakto.test.tsx)
│   │       │   │   └── [utils.test.ts](./src/games/tic-tac-toe/notakto/__tests__/utils.test.ts)
│   │       │   ├── [index.tsx](./src/games/tic-tac-toe/notakto/index.tsx)
│   │       │   ├── [types.ts](./src/games/tic-tac-toe/notakto/types.ts)
│   │       │   ├── [useNotakto.ts](./src/games/tic-tac-toe/notakto/useNotakto.ts)
│   │       │   └── [utils.ts](./src/games/tic-tac-toe/notakto/utils.ts)
│   │       ├── reverse/
│   │       │   ├── __tests__/
│   │       │   │   ├── [index.test.tsx](./src/games/tic-tac-toe/reverse/__tests__/index.test.tsx)
│   │       │   │   ├── [useReverse.test.tsx](./src/games/tic-tac-toe/reverse/__tests__/useReverse.test.tsx)
│   │       │   │   └── [utils.test.ts](./src/games/tic-tac-toe/reverse/__tests__/utils.test.ts)
│   │       │   ├── [index.tsx](./src/games/tic-tac-toe/reverse/index.tsx)
│   │       │   ├── [types.ts](./src/games/tic-tac-toe/reverse/types.ts)
│   │       │   ├── [useReverse.ts](./src/games/tic-tac-toe/reverse/useReverse.ts)
│   │       │   └── [utils.ts](./src/games/tic-tac-toe/reverse/utils.ts)
│   │       ├── t3/
│   │       │   ├── __tests__/
│   │       │   │   ├── [index.test.tsx](./src/games/tic-tac-toe/t3/__tests__/index.test.tsx)
│   │       │   │   ├── [useT3.test.tsx](./src/games/tic-tac-toe/t3/__tests__/useT3.test.tsx)
│   │       │   │   └── [utils.test.ts](./src/games/tic-tac-toe/t3/__tests__/utils.test.ts)
│   │       │   ├── [index.tsx](./src/games/tic-tac-toe/t3/index.tsx)
│   │       │   ├── [types.ts](./src/games/tic-tac-toe/t3/types.ts)
│   │       │   ├── [useT3.ts](./src/games/tic-tac-toe/t3/useT3.ts)
│   │       │   └── [utils.ts](./src/games/tic-tac-toe/t3/utils.ts)
│   │       └── wild/
│   │           ├── __tests__/
│   │           │   ├── [index.test.tsx](./src/games/tic-tac-toe/wild/__tests__/index.test.tsx)
│   │           │   ├── [useWild.test.tsx](./src/games/tic-tac-toe/wild/__tests__/useWild.test.tsx)
│   │           │   └── [utils.test.ts](./src/games/tic-tac-toe/wild/__tests__/utils.test.ts)
│   │           ├── [index.tsx](./src/games/tic-tac-toe/wild/index.tsx)
│   │           ├── [types.ts](./src/games/tic-tac-toe/wild/types.ts)
│   │           ├── [useWild.ts](./src/games/tic-tac-toe/wild/useWild.ts)
│   │           └── [utils.ts](./src/games/tic-tac-toe/wild/utils.ts)
│   └── styles/
│       ├── [base.css](./src/styles/base.css)
│       ├── [globals.css](./src/styles/globals.css)
│       └── [themes.css](./src/styles/themes.css)
├── src-tauri/
│   ├── capabilities/
│   │   └── [default.json](./src-tauri/capabilities/default.json)
│   ├── icons/
│   │   ├── android/
│   │   │   ├── mipmap-anydpi-v26/
│   │   │   │   └── [ic_launcher.xml](./src-tauri/icons/android/mipmap-anydpi-v26/ic_launcher.xml)
│   │   │   ├── mipmap-hdpi/
│   │   │   │   ├── [ic_launcher.png](./src-tauri/icons/android/mipmap-hdpi/ic_launcher.png)
│   │   │   │   ├── [ic_launcher_foreground.png](./src-tauri/icons/android/mipmap-hdpi/ic_launcher_foreground.png)
│   │   │   │   └── [ic_launcher_round.png](./src-tauri/icons/android/mipmap-hdpi/ic_launcher_round.png)
│   │   │   ├── mipmap-mdpi/
│   │   │   │   ├── [ic_launcher.png](./src-tauri/icons/android/mipmap-mdpi/ic_launcher.png)
│   │   │   │   ├── [ic_launcher_foreground.png](./src-tauri/icons/android/mipmap-mdpi/ic_launcher_foreground.png)
│   │   │   │   └── [ic_launcher_round.png](./src-tauri/icons/android/mipmap-mdpi/ic_launcher_round.png)
│   │   │   ├── mipmap-xhdpi/
│   │   │   │   ├── [ic_launcher.png](./src-tauri/icons/android/mipmap-xhdpi/ic_launcher.png)
│   │   │   │   ├── [ic_launcher_foreground.png](./src-tauri/icons/android/mipmap-xhdpi/ic_launcher_foreground.png)
│   │   │   │   └── [ic_launcher_round.png](./src-tauri/icons/android/mipmap-xhdpi/ic_launcher_round.png)
│   │   │   ├── mipmap-xxhdpi/
│   │   │   │   ├── [ic_launcher.png](./src-tauri/icons/android/mipmap-xxhdpi/ic_launcher.png)
│   │   │   │   ├── [ic_launcher_foreground.png](./src-tauri/icons/android/mipmap-xxhdpi/ic_launcher_foreground.png)
│   │   │   │   └── [ic_launcher_round.png](./src-tauri/icons/android/mipmap-xxhdpi/ic_launcher_round.png)
│   │   │   ├── mipmap-xxxhdpi/
│   │   │   │   ├── [ic_launcher.png](./src-tauri/icons/android/mipmap-xxxhdpi/ic_launcher.png)
│   │   │   │   ├── [ic_launcher_foreground.png](./src-tauri/icons/android/mipmap-xxxhdpi/ic_launcher_foreground.png)
│   │   │   │   └── [ic_launcher_round.png](./src-tauri/icons/android/mipmap-xxxhdpi/ic_launcher_round.png)
│   │   │   └── values/
│   │   │       └── [ic_launcher_background.xml](./src-tauri/icons/android/values/ic_launcher_background.xml)
│   │   ├── ios/
│   │   │   ├── [AppIcon-20x20@1x.png](./src-tauri/icons/ios/AppIcon-20x20@1x.png)
│   │   │   ├── [AppIcon-20x20@2x-1.png](./src-tauri/icons/ios/AppIcon-20x20@2x-1.png)
│   │   │   ├── [AppIcon-20x20@2x.png](./src-tauri/icons/ios/AppIcon-20x20@2x.png)
│   │   │   ├── [AppIcon-20x20@3x.png](./src-tauri/icons/ios/AppIcon-20x20@3x.png)
│   │   │   ├── [AppIcon-29x29@1x.png](./src-tauri/icons/ios/AppIcon-29x29@1x.png)
│   │   │   ├── [AppIcon-29x29@2x-1.png](./src-tauri/icons/ios/AppIcon-29x29@2x-1.png)
│   │   │   ├── [AppIcon-29x29@2x.png](./src-tauri/icons/ios/AppIcon-29x29@2x.png)
│   │   │   ├── [AppIcon-29x29@3x.png](./src-tauri/icons/ios/AppIcon-29x29@3x.png)
│   │   │   ├── [AppIcon-40x40@1x.png](./src-tauri/icons/ios/AppIcon-40x40@1x.png)
│   │   │   ├── [AppIcon-40x40@2x-1.png](./src-tauri/icons/ios/AppIcon-40x40@2x-1.png)
│   │   │   ├── [AppIcon-40x40@2x.png](./src-tauri/icons/ios/AppIcon-40x40@2x.png)
│   │   │   ├── [AppIcon-40x40@3x.png](./src-tauri/icons/ios/AppIcon-40x40@3x.png)
│   │   │   ├── [AppIcon-512@2x.png](./src-tauri/icons/ios/AppIcon-512@2x.png)
│   │   │   ├── [AppIcon-60x60@2x.png](./src-tauri/icons/ios/AppIcon-60x60@2x.png)
│   │   │   ├── [AppIcon-60x60@3x.png](./src-tauri/icons/ios/AppIcon-60x60@3x.png)
│   │   │   ├── [AppIcon-76x76@1x.png](./src-tauri/icons/ios/AppIcon-76x76@1x.png)
│   │   │   ├── [AppIcon-76x76@2x.png](./src-tauri/icons/ios/AppIcon-76x76@2x.png)
│   │   │   └── [AppIcon-83.5x83.5@2x.png](./src-tauri/icons/ios/AppIcon-83.5x83.5@2x.png)
│   │   ├── [128x128.png](./src-tauri/icons/128x128.png)
│   │   ├── [128x128@2x.png](./src-tauri/icons/128x128@2x.png)
│   │   ├── [256x256.png](./src-tauri/icons/256x256.png)
│   │   ├── [32x32.png](./src-tauri/icons/32x32.png)
│   │   ├── [64x64.png](./src-tauri/icons/64x64.png)
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
│   │   ├── [create-icons.sh](./src-tauri/icons/create-icons.sh)
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

150 directories, 377 files
