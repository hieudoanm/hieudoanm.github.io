# TREE

```text
├── casino/
│   ├── docs/
│   │   ├── [ARCHITECTURE.md](./casino/docs/ARCHITECTURE.md)
│   │   ├── [CONTRIBUTING.md](./casino/docs/CONTRIBUTING.md)
│   │   ├── [DOWNLOADS.md](./casino/docs/DOWNLOADS.md)
│   │   └── [ROADMAP.md](./casino/docs/ROADMAP.md)
│   ├── e2e/
│   │   ├── screenshots/
│   │   │   ├── [about.png](./casino/e2e/screenshots/about.png)
│   │   │   ├── [downloads.png](./casino/e2e/screenshots/downloads.png)
│   │   │   ├── [home.png](./casino/e2e/screenshots/home.png)
│   │   │   └── [version.png](./casino/e2e/screenshots/version.png)
│   │   ├── [about.spec.ts](./casino/e2e/about.spec.ts)
│   │   ├── [downloads.spec.ts](./casino/e2e/downloads.spec.ts)
│   │   ├── [home.spec.ts](./casino/e2e/home.spec.ts)
│   │   └── [version.spec.ts](./casino/e2e/version.spec.ts)
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
│   │   ├── content/
│   │   │   ├── [about.ts](./casino/src/content/about.ts)
│   │   │   ├── [download.ts](./casino/src/content/download.ts)
│   │   │   └── [version.ts](./casino/src/content/version.ts)
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
│   │   │   ├── android/
│   │   │   │   ├── mipmap-anydpi-v26/
│   │   │   │   │   └── [ic_launcher.xml](./casino/src-tauri/icons/android/mipmap-anydpi-v26/ic_launcher.xml)
│   │   │   │   ├── mipmap-hdpi/
│   │   │   │   │   ├── [ic_launcher.png](./casino/src-tauri/icons/android/mipmap-hdpi/ic_launcher.png)
│   │   │   │   │   ├── [ic_launcher_foreground.png](./casino/src-tauri/icons/android/mipmap-hdpi/ic_launcher_foreground.png)
│   │   │   │   │   └── [ic_launcher_round.png](./casino/src-tauri/icons/android/mipmap-hdpi/ic_launcher_round.png)
│   │   │   │   ├── mipmap-mdpi/
│   │   │   │   │   ├── [ic_launcher.png](./casino/src-tauri/icons/android/mipmap-mdpi/ic_launcher.png)
│   │   │   │   │   ├── [ic_launcher_foreground.png](./casino/src-tauri/icons/android/mipmap-mdpi/ic_launcher_foreground.png)
│   │   │   │   │   └── [ic_launcher_round.png](./casino/src-tauri/icons/android/mipmap-mdpi/ic_launcher_round.png)
│   │   │   │   ├── mipmap-xhdpi/
│   │   │   │   │   ├── [ic_launcher.png](./casino/src-tauri/icons/android/mipmap-xhdpi/ic_launcher.png)
│   │   │   │   │   ├── [ic_launcher_foreground.png](./casino/src-tauri/icons/android/mipmap-xhdpi/ic_launcher_foreground.png)
│   │   │   │   │   └── [ic_launcher_round.png](./casino/src-tauri/icons/android/mipmap-xhdpi/ic_launcher_round.png)
│   │   │   │   ├── mipmap-xxhdpi/
│   │   │   │   │   ├── [ic_launcher.png](./casino/src-tauri/icons/android/mipmap-xxhdpi/ic_launcher.png)
│   │   │   │   │   ├── [ic_launcher_foreground.png](./casino/src-tauri/icons/android/mipmap-xxhdpi/ic_launcher_foreground.png)
│   │   │   │   │   └── [ic_launcher_round.png](./casino/src-tauri/icons/android/mipmap-xxhdpi/ic_launcher_round.png)
│   │   │   │   ├── mipmap-xxxhdpi/
│   │   │   │   │   ├── [ic_launcher.png](./casino/src-tauri/icons/android/mipmap-xxxhdpi/ic_launcher.png)
│   │   │   │   │   ├── [ic_launcher_foreground.png](./casino/src-tauri/icons/android/mipmap-xxxhdpi/ic_launcher_foreground.png)
│   │   │   │   │   └── [ic_launcher_round.png](./casino/src-tauri/icons/android/mipmap-xxxhdpi/ic_launcher_round.png)
│   │   │   │   └── values/
│   │   │   │       └── [ic_launcher_background.xml](./casino/src-tauri/icons/android/values/ic_launcher_background.xml)
│   │   │   ├── ios/
│   │   │   │   ├── [AppIcon-20x20@1x.png](./casino/src-tauri/icons/ios/AppIcon-20x20@1x.png)
│   │   │   │   ├── [AppIcon-20x20@2x-1.png](./casino/src-tauri/icons/ios/AppIcon-20x20@2x-1.png)
│   │   │   │   ├── [AppIcon-20x20@2x.png](./casino/src-tauri/icons/ios/AppIcon-20x20@2x.png)
│   │   │   │   ├── [AppIcon-20x20@3x.png](./casino/src-tauri/icons/ios/AppIcon-20x20@3x.png)
│   │   │   │   ├── [AppIcon-29x29@1x.png](./casino/src-tauri/icons/ios/AppIcon-29x29@1x.png)
│   │   │   │   ├── [AppIcon-29x29@2x-1.png](./casino/src-tauri/icons/ios/AppIcon-29x29@2x-1.png)
│   │   │   │   ├── [AppIcon-29x29@2x.png](./casino/src-tauri/icons/ios/AppIcon-29x29@2x.png)
│   │   │   │   ├── [AppIcon-29x29@3x.png](./casino/src-tauri/icons/ios/AppIcon-29x29@3x.png)
│   │   │   │   ├── [AppIcon-40x40@1x.png](./casino/src-tauri/icons/ios/AppIcon-40x40@1x.png)
│   │   │   │   ├── [AppIcon-40x40@2x-1.png](./casino/src-tauri/icons/ios/AppIcon-40x40@2x-1.png)
│   │   │   │   ├── [AppIcon-40x40@2x.png](./casino/src-tauri/icons/ios/AppIcon-40x40@2x.png)
│   │   │   │   ├── [AppIcon-40x40@3x.png](./casino/src-tauri/icons/ios/AppIcon-40x40@3x.png)
│   │   │   │   ├── [AppIcon-512@2x.png](./casino/src-tauri/icons/ios/AppIcon-512@2x.png)
│   │   │   │   ├── [AppIcon-60x60@2x.png](./casino/src-tauri/icons/ios/AppIcon-60x60@2x.png)
│   │   │   │   ├── [AppIcon-60x60@3x.png](./casino/src-tauri/icons/ios/AppIcon-60x60@3x.png)
│   │   │   │   ├── [AppIcon-76x76@1x.png](./casino/src-tauri/icons/ios/AppIcon-76x76@1x.png)
│   │   │   │   ├── [AppIcon-76x76@2x.png](./casino/src-tauri/icons/ios/AppIcon-76x76@2x.png)
│   │   │   │   └── [AppIcon-83.5x83.5@2x.png](./casino/src-tauri/icons/ios/AppIcon-83.5x83.5@2x.png)
│   │   │   ├── [128x128.png](./casino/src-tauri/icons/128x128.png)
│   │   │   ├── [128x128@2x.png](./casino/src-tauri/icons/128x128@2x.png)
│   │   │   ├── [256x256.png](./casino/src-tauri/icons/256x256.png)
│   │   │   ├── [32x32.png](./casino/src-tauri/icons/32x32.png)
│   │   │   ├── [64x64.png](./casino/src-tauri/icons/64x64.png)
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
│   │   │   ├── [create-icons.sh](./casino/src-tauri/icons/create-icons.sh)
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
│   │   ├── content/
│   │   │   ├── [about.ts](./memory/src/content/about.ts)
│   │   │   ├── [download.ts](./memory/src/content/download.ts)
│   │   │   └── [version.ts](./memory/src/content/version.ts)
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

418 directories, 1294 files
