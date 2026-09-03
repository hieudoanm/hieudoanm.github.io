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
│   │   │   ├── border/
│   │   │   │   └── [page.tsx](./src/app/(games)/border/page.tsx)
│   │   │   ├── connections/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [page.test.tsx](./src/app/(games)/connections/__tests__/page.test.tsx)
│   │   │   │   └── [page.tsx](./src/app/(games)/connections/page.tsx)
│   │   │   ├── continents-sort/
│   │   │   │   └── [page.tsx](./src/app/(games)/continents-sort/page.tsx)
│   │   │   ├── emoji-guesser/
│   │   │   │   └── [page.tsx](./src/app/(games)/emoji-guesser/page.tsx)
│   │   │   ├── flag-guesser/
│   │   │   │   └── [page.tsx](./src/app/(games)/flag-guesser/page.tsx)
│   │   │   ├── higher-or-lower/
│   │   │   │   └── [page.tsx](./src/app/(games)/higher-or-lower/page.tsx)
│   │   │   └── wordle/
│   │   │       ├── __tests__/
│   │   │       │   └── [page.test.tsx](./src/app/(games)/wordle/__tests__/page.test.tsx)
│   │   │       └── [page.tsx](./src/app/(games)/wordle/page.tsx)
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
│   │   │   │   ├── [countries.test.ts](./src/games/_shared/__tests__/countries.test.ts)
│   │   │   │   └── [quiz.test.ts](./src/games/_shared/__tests__/quiz.test.ts)
│   │   │   ├── [borders.ts](./src/games/_shared/borders.ts)
│   │   │   ├── [countries-data.ts](./src/games/_shared/countries-data.ts)
│   │   │   ├── [countries.ts](./src/games/_shared/countries.ts)
│   │   │   ├── [population.ts](./src/games/_shared/population.ts)
│   │   │   └── [quiz.ts](./src/games/_shared/quiz.ts)
│   │   ├── border/
│   │   │   ├── __tests__/
│   │   │   │   ├── [index.test.tsx](./src/games/border/__tests__/index.test.tsx)
│   │   │   │   ├── [useBorder.test.ts](./src/games/border/__tests__/useBorder.test.ts)
│   │   │   │   └── [utils.test.ts](./src/games/border/__tests__/utils.test.ts)
│   │   │   ├── [index.tsx](./src/games/border/index.tsx)
│   │   │   ├── [types.ts](./src/games/border/types.ts)
│   │   │   ├── [useBorder.ts](./src/games/border/useBorder.ts)
│   │   │   └── [utils.ts](./src/games/border/utils.ts)
│   │   ├── connections/
│   │   │   ├── __tests__/
│   │   │   │   ├── [index.test.tsx](./src/games/connections/__tests__/index.test.tsx)
│   │   │   │   ├── [puzzles.test.ts](./src/games/connections/__tests__/puzzles.test.ts)
│   │   │   │   ├── [useConnections.test.ts](./src/games/connections/__tests__/useConnections.test.ts)
│   │   │   │   └── [utils.test.ts](./src/games/connections/__tests__/utils.test.ts)
│   │   │   ├── [index.tsx](./src/games/connections/index.tsx)
│   │   │   ├── [puzzles.ts](./src/games/connections/puzzles.ts)
│   │   │   ├── [types.ts](./src/games/connections/types.ts)
│   │   │   ├── [useConnections.ts](./src/games/connections/useConnections.ts)
│   │   │   └── [utils.ts](./src/games/connections/utils.ts)
│   │   ├── continents-sort/
│   │   │   ├── __tests__/
│   │   │   │   ├── [index.test.tsx](./src/games/continents-sort/__tests__/index.test.tsx)
│   │   │   │   ├── [useContinentsSort.test.ts](./src/games/continents-sort/__tests__/useContinentsSort.test.ts)
│   │   │   │   └── [utils.test.ts](./src/games/continents-sort/__tests__/utils.test.ts)
│   │   │   ├── [index.tsx](./src/games/continents-sort/index.tsx)
│   │   │   ├── [types.ts](./src/games/continents-sort/types.ts)
│   │   │   ├── [useContinentsSort.ts](./src/games/continents-sort/useContinentsSort.ts)
│   │   │   └── [utils.ts](./src/games/continents-sort/utils.ts)
│   │   ├── emoji-guesser/
│   │   │   ├── __tests__/
│   │   │   │   ├── [index.test.tsx](./src/games/emoji-guesser/__tests__/index.test.tsx)
│   │   │   │   ├── [useEmojiGuesser.test.ts](./src/games/emoji-guesser/__tests__/useEmojiGuesser.test.ts)
│   │   │   │   └── [utils.test.ts](./src/games/emoji-guesser/__tests__/utils.test.ts)
│   │   │   ├── [index.tsx](./src/games/emoji-guesser/index.tsx)
│   │   │   ├── [types.ts](./src/games/emoji-guesser/types.ts)
│   │   │   ├── [useEmojiGuesser.ts](./src/games/emoji-guesser/useEmojiGuesser.ts)
│   │   │   └── [utils.ts](./src/games/emoji-guesser/utils.ts)
│   │   ├── flag-guesser/
│   │   │   ├── __tests__/
│   │   │   │   ├── [index.test.tsx](./src/games/flag-guesser/__tests__/index.test.tsx)
│   │   │   │   ├── [useFlagGuesser.test.ts](./src/games/flag-guesser/__tests__/useFlagGuesser.test.ts)
│   │   │   │   └── [utils.test.ts](./src/games/flag-guesser/__tests__/utils.test.ts)
│   │   │   ├── [index.tsx](./src/games/flag-guesser/index.tsx)
│   │   │   ├── [types.ts](./src/games/flag-guesser/types.ts)
│   │   │   ├── [useFlagGuesser.ts](./src/games/flag-guesser/useFlagGuesser.ts)
│   │   │   └── [utils.ts](./src/games/flag-guesser/utils.ts)
│   │   ├── higher-or-lower/
│   │   │   ├── __tests__/
│   │   │   │   ├── [index.test.tsx](./src/games/higher-or-lower/__tests__/index.test.tsx)
│   │   │   │   ├── [useHigherOrLower.test.ts](./src/games/higher-or-lower/__tests__/useHigherOrLower.test.ts)
│   │   │   │   └── [utils.test.ts](./src/games/higher-or-lower/__tests__/utils.test.ts)
│   │   │   ├── [index.tsx](./src/games/higher-or-lower/index.tsx)
│   │   │   ├── [types.ts](./src/games/higher-or-lower/types.ts)
│   │   │   ├── [useHigherOrLower.ts](./src/games/higher-or-lower/useHigherOrLower.ts)
│   │   │   └── [utils.ts](./src/games/higher-or-lower/utils.ts)
│   │   └── wordle/
│   │       ├── __tests__/
│   │       │   ├── [index.test.tsx](./src/games/wordle/__tests__/index.test.tsx)
│   │       │   ├── [useWordle.test.ts](./src/games/wordle/__tests__/useWordle.test.ts)
│   │       │   └── [utils.test.ts](./src/games/wordle/__tests__/utils.test.ts)
│   │       ├── [index.tsx](./src/games/wordle/index.tsx)
│   │       ├── [types.ts](./src/games/wordle/types.ts)
│   │       ├── [useWordle.ts](./src/games/wordle/useWordle.ts)
│   │       └── [utils.ts](./src/games/wordle/utils.ts)
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

62 directories, 182 files
