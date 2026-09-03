# TREE

```text
├── docs/
│   ├── [ARCHITECTURE.md](./docs/ARCHITECTURE.md)
│   ├── [CONTRIBUTING.md](./docs/CONTRIBUTING.md)
│   ├── [DOWNLOADS.md](./docs/DOWNLOADS.md)
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
│   │   │   ├── baccarat/
│   │   │   │   └── [page.tsx](./src/app/(games)/baccarat/page.tsx)
│   │   │   ├── card-counter/
│   │   │   │   └── [page.tsx](./src/app/(games)/card-counter/page.tsx)
│   │   │   ├── craps/
│   │   │   │   └── [page.tsx](./src/app/(games)/craps/page.tsx)
│   │   │   ├── hi-lo/
│   │   │   │   └── [page.tsx](./src/app/(games)/hi-lo/page.tsx)
│   │   │   ├── keno/
│   │   │   │   └── [page.tsx](./src/app/(games)/keno/page.tsx)
│   │   │   ├── over-under-seven/
│   │   │   │   └── [page.tsx](./src/app/(games)/over-under-seven/page.tsx)
│   │   │   ├── poker-odds/
│   │   │   │   └── [page.tsx](./src/app/(games)/poker-odds/page.tsx)
│   │   │   ├── roulette/
│   │   │   │   └── [page.tsx](./src/app/(games)/roulette/page.tsx)
│   │   │   ├── slot-machine/
│   │   │   │   └── [page.tsx](./src/app/(games)/slot-machine/page.tsx)
│   │   │   └── war/
│   │   │       └── [page.tsx](./src/app/(games)/war/page.tsx)
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
│   │   ├── _shared/
│   │   │   ├── __tests__/
│   │   │   │   └── [cards.test.ts](./src/games/_shared/__tests__/cards.test.ts)
│   │   │   └── [cards.ts](./src/games/_shared/cards.ts)
│   │   ├── baccarat/
│   │   │   ├── __tests__/
│   │   │   │   ├── [index.test.tsx](./src/games/baccarat/__tests__/index.test.tsx)
│   │   │   │   ├── [useBaccarat.test.ts](./src/games/baccarat/__tests__/useBaccarat.test.ts)
│   │   │   │   └── [utils.test.ts](./src/games/baccarat/__tests__/utils.test.ts)
│   │   │   ├── [index.tsx](./src/games/baccarat/index.tsx)
│   │   │   ├── [types.ts](./src/games/baccarat/types.ts)
│   │   │   ├── [useBaccarat.ts](./src/games/baccarat/useBaccarat.ts)
│   │   │   └── [utils.ts](./src/games/baccarat/utils.ts)
│   │   ├── card-counter/
│   │   │   ├── __tests__/
│   │   │   │   ├── [index.test.tsx](./src/games/card-counter/__tests__/index.test.tsx)
│   │   │   │   ├── [useCardCounter.test.ts](./src/games/card-counter/__tests__/useCardCounter.test.ts)
│   │   │   │   └── [utils.test.ts](./src/games/card-counter/__tests__/utils.test.ts)
│   │   │   ├── [index.tsx](./src/games/card-counter/index.tsx)
│   │   │   ├── [types.ts](./src/games/card-counter/types.ts)
│   │   │   ├── [useCardCounter.ts](./src/games/card-counter/useCardCounter.ts)
│   │   │   └── [utils.ts](./src/games/card-counter/utils.ts)
│   │   ├── craps/
│   │   │   ├── __tests__/
│   │   │   │   ├── [index.test.tsx](./src/games/craps/__tests__/index.test.tsx)
│   │   │   │   ├── [useCraps.test.ts](./src/games/craps/__tests__/useCraps.test.ts)
│   │   │   │   └── [utils.test.ts](./src/games/craps/__tests__/utils.test.ts)
│   │   │   ├── [index.tsx](./src/games/craps/index.tsx)
│   │   │   ├── [types.ts](./src/games/craps/types.ts)
│   │   │   ├── [useCraps.ts](./src/games/craps/useCraps.ts)
│   │   │   └── [utils.ts](./src/games/craps/utils.ts)
│   │   ├── hi-lo/
│   │   │   ├── __tests__/
│   │   │   │   ├── [index.test.tsx](./src/games/hi-lo/__tests__/index.test.tsx)
│   │   │   │   ├── [useHiLo.test.ts](./src/games/hi-lo/__tests__/useHiLo.test.ts)
│   │   │   │   └── [utils.test.ts](./src/games/hi-lo/__tests__/utils.test.ts)
│   │   │   ├── [constants.ts](./src/games/hi-lo/constants.ts)
│   │   │   ├── [index.tsx](./src/games/hi-lo/index.tsx)
│   │   │   ├── [types.ts](./src/games/hi-lo/types.ts)
│   │   │   ├── [useHiLo.ts](./src/games/hi-lo/useHiLo.ts)
│   │   │   └── [utils.ts](./src/games/hi-lo/utils.ts)
│   │   ├── keno/
│   │   │   ├── __tests__/
│   │   │   │   ├── [index.test.tsx](./src/games/keno/__tests__/index.test.tsx)
│   │   │   │   ├── [useKeno.test.ts](./src/games/keno/__tests__/useKeno.test.ts)
│   │   │   │   └── [utils.test.ts](./src/games/keno/__tests__/utils.test.ts)
│   │   │   ├── [index.tsx](./src/games/keno/index.tsx)
│   │   │   ├── [types.ts](./src/games/keno/types.ts)
│   │   │   ├── [useKeno.ts](./src/games/keno/useKeno.ts)
│   │   │   └── [utils.ts](./src/games/keno/utils.ts)
│   │   ├── over-under-seven/
│   │   │   ├── __tests__/
│   │   │   │   ├── [index.test.tsx](./src/games/over-under-seven/__tests__/index.test.tsx)
│   │   │   │   ├── [useOverUnderSeven.test.ts](./src/games/over-under-seven/__tests__/useOverUnderSeven.test.ts)
│   │   │   │   └── [utils.test.ts](./src/games/over-under-seven/__tests__/utils.test.ts)
│   │   │   ├── [index.tsx](./src/games/over-under-seven/index.tsx)
│   │   │   ├── [types.ts](./src/games/over-under-seven/types.ts)
│   │   │   ├── [useOverUnderSeven.ts](./src/games/over-under-seven/useOverUnderSeven.ts)
│   │   │   └── [utils.ts](./src/games/over-under-seven/utils.ts)
│   │   ├── poker-odds/
│   │   │   ├── __tests__/
│   │   │   │   ├── [usePokerOdds.test.tsx](./src/games/poker-odds/__tests__/usePokerOdds.test.tsx)
│   │   │   │   └── [utils.test.ts](./src/games/poker-odds/__tests__/utils.test.ts)
│   │   │   ├── components/
│   │   │   │   └── [CardPicker.tsx](./src/games/poker-odds/components/CardPicker.tsx)
│   │   │   ├── [constants.ts](./src/games/poker-odds/constants.ts)
│   │   │   ├── [index.tsx](./src/games/poker-odds/index.tsx)
│   │   │   ├── [types.ts](./src/games/poker-odds/types.ts)
│   │   │   ├── [usePokerOdds.ts](./src/games/poker-odds/usePokerOdds.ts)
│   │   │   └── [utils.ts](./src/games/poker-odds/utils.ts)
│   │   ├── roulette/
│   │   │   ├── __tests__/
│   │   │   │   ├── [index.test.tsx](./src/games/roulette/__tests__/index.test.tsx)
│   │   │   │   ├── [useRoulette.test.ts](./src/games/roulette/__tests__/useRoulette.test.ts)
│   │   │   │   └── [utils.test.ts](./src/games/roulette/__tests__/utils.test.ts)
│   │   │   ├── [index.tsx](./src/games/roulette/index.tsx)
│   │   │   ├── [types.ts](./src/games/roulette/types.ts)
│   │   │   ├── [useRoulette.ts](./src/games/roulette/useRoulette.ts)
│   │   │   └── [utils.ts](./src/games/roulette/utils.ts)
│   │   ├── slot-machine/
│   │   │   ├── __tests__/
│   │   │   │   ├── [index.test.tsx](./src/games/slot-machine/__tests__/index.test.tsx)
│   │   │   │   ├── [useSlotMachine.test.ts](./src/games/slot-machine/__tests__/useSlotMachine.test.ts)
│   │   │   │   └── [utils.test.ts](./src/games/slot-machine/__tests__/utils.test.ts)
│   │   │   ├── [constants.ts](./src/games/slot-machine/constants.ts)
│   │   │   ├── [index.tsx](./src/games/slot-machine/index.tsx)
│   │   │   ├── [useSlotMachine.ts](./src/games/slot-machine/useSlotMachine.ts)
│   │   │   └── [utils.ts](./src/games/slot-machine/utils.ts)
│   │   └── war/
│   │       ├── __tests__/
│   │       │   ├── [index.test.tsx](./src/games/war/__tests__/index.test.tsx)
│   │       │   ├── [useWar.test.ts](./src/games/war/__tests__/useWar.test.ts)
│   │       │   └── [utils.test.ts](./src/games/war/__tests__/utils.test.ts)
│   │       ├── [index.tsx](./src/games/war/index.tsx)
│   │       ├── [types.ts](./src/games/war/types.ts)
│   │       ├── [useWar.ts](./src/games/war/useWar.ts)
│   │       └── [utils.ts](./src/games/war/utils.ts)
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

70 directories, 198 files
