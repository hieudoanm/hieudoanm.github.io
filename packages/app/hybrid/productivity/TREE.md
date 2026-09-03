# TREE

```text
├── calendar/
│   ├── docs/
│   │   ├── [ARCHITECTURE.md](./calendar/docs/ARCHITECTURE.md)
│   │   ├── [CONTRIBUTING.md](./calendar/docs/CONTRIBUTING.md)
│   │   ├── [DOWNLOADS.md](./calendar/docs/DOWNLOADS.md)
│   │   ├── [PACKAGING.md](./calendar/docs/PACKAGING.md)
│   │   └── [ROADMAP.md](./calendar/docs/ROADMAP.md)
│   ├── e2e/
│   │   └── [home.spec.ts](./calendar/e2e/home.spec.ts)
│   ├── public/
│   │   ├── icons/
│   │   │   ├── [icon-128x128.png](./calendar/public/icons/icon-128x128.png)
│   │   │   ├── [icon-144x144.png](./calendar/public/icons/icon-144x144.png)
│   │   │   ├── [icon-152x152.png](./calendar/public/icons/icon-152x152.png)
│   │   │   ├── [icon-16x16.png](./calendar/public/icons/icon-16x16.png)
│   │   │   ├── [icon-180x180.png](./calendar/public/icons/icon-180x180.png)
│   │   │   ├── [icon-192x192.png](./calendar/public/icons/icon-192x192.png)
│   │   │   ├── [icon-256x256.png](./calendar/public/icons/icon-256x256.png)
│   │   │   ├── [icon-32x32.png](./calendar/public/icons/icon-32x32.png)
│   │   │   ├── [icon-384x384.png](./calendar/public/icons/icon-384x384.png)
│   │   │   ├── [icon-48x48.png](./calendar/public/icons/icon-48x48.png)
│   │   │   ├── [icon-512x512.png](./calendar/public/icons/icon-512x512.png)
│   │   │   ├── [icon-64x64.png](./calendar/public/icons/icon-64x64.png)
│   │   │   ├── [icon-72x72.png](./calendar/public/icons/icon-72x72.png)
│   │   │   ├── [icon-96x96.png](./calendar/public/icons/icon-96x96.png)
│   │   │   └── [icon.svg](./calendar/public/icons/icon.svg)
│   │   ├── [apple-touch-icon.png](./calendar/public/apple-touch-icon.png)
│   │   ├── [favicon.ico](./calendar/public/favicon.ico)
│   │   ├── [manifest.json](./calendar/public/manifest.json)
│   │   ├── [robots.txt](./calendar/public/robots.txt)
│   │   ├── [sitemap.xml](./calendar/public/sitemap.xml)
│   │   └── [sw.js](./calendar/public/sw.js)
│   ├── src/
│   │   ├── app/
│   │   │   ├── (auth)/
│   │   │   │   ├── forget-password/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./calendar/src/app/(auth)/forget-password/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./calendar/src/app/(auth)/forget-password/page.tsx)
│   │   │   │   ├── profile/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./calendar/src/app/(auth)/profile/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./calendar/src/app/(auth)/profile/page.tsx)
│   │   │   │   ├── reset-password/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./calendar/src/app/(auth)/reset-password/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./calendar/src/app/(auth)/reset-password/page.tsx)
│   │   │   │   ├── sign-in/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./calendar/src/app/(auth)/sign-in/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./calendar/src/app/(auth)/sign-in/page.tsx)
│   │   │   │   └── sign-up/
│   │   │   │       ├── __tests__/
│   │   │   │       │   └── [page.test.tsx](./calendar/src/app/(auth)/sign-up/__tests__/page.test.tsx)
│   │   │   │       └── [page.tsx](./calendar/src/app/(auth)/sign-up/page.tsx)
│   │   │   ├── (info)/
│   │   │   │   ├── about/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./calendar/src/app/(info)/about/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./calendar/src/app/(info)/about/page.tsx)
│   │   │   │   ├── downloads/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./calendar/src/app/(info)/downloads/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./calendar/src/app/(info)/downloads/page.tsx)
│   │   │   │   └── version/
│   │   │   │       ├── __tests__/
│   │   │   │       │   └── [page.test.tsx](./calendar/src/app/(info)/version/__tests__/page.test.tsx)
│   │   │   │       └── [page.tsx](./calendar/src/app/(info)/version/page.tsx)
│   │   │   ├── __tests__/
│   │   │   │   ├── [default.test.tsx](./calendar/src/app/__tests__/default.test.tsx)
│   │   │   │   ├── [error.test.tsx](./calendar/src/app/__tests__/error.test.tsx)
│   │   │   │   ├── [forbidden.test.tsx](./calendar/src/app/__tests__/forbidden.test.tsx)
│   │   │   │   ├── [global-error.test.tsx](./calendar/src/app/__tests__/global-error.test.tsx)
│   │   │   │   ├── [layout.test.tsx](./calendar/src/app/__tests__/layout.test.tsx)
│   │   │   │   ├── [loading.test.tsx](./calendar/src/app/__tests__/loading.test.tsx)
│   │   │   │   ├── [not-found.test.tsx](./calendar/src/app/__tests__/not-found.test.tsx)
│   │   │   │   ├── [page.test.tsx](./calendar/src/app/__tests__/page.test.tsx)
│   │   │   │   ├── [robots.test.ts](./calendar/src/app/__tests__/robots.test.ts)
│   │   │   │   ├── [template.test.tsx](./calendar/src/app/__tests__/template.test.tsx)
│   │   │   │   └── [unauthorized.test.tsx](./calendar/src/app/__tests__/unauthorized.test.tsx)
│   │   │   ├── [default.tsx](./calendar/src/app/default.tsx)
│   │   │   ├── [error.tsx](./calendar/src/app/error.tsx)
│   │   │   ├── [favicon.ico](./calendar/src/app/favicon.ico)
│   │   │   ├── [forbidden.tsx](./calendar/src/app/forbidden.tsx)
│   │   │   ├── [global-error.tsx](./calendar/src/app/global-error.tsx)
│   │   │   ├── [layout.tsx](./calendar/src/app/layout.tsx)
│   │   │   ├── [loading.tsx](./calendar/src/app/loading.tsx)
│   │   │   ├── [not-found.tsx](./calendar/src/app/not-found.tsx)
│   │   │   ├── [page.tsx](./calendar/src/app/page.tsx)
│   │   │   ├── [robots.ts](./calendar/src/app/robots.ts)
│   │   │   ├── [template.tsx](./calendar/src/app/template.tsx)
│   │   │   └── [unauthorized.tsx](./calendar/src/app/unauthorized.tsx)
│   │   ├── components/
│   │   │   ├── atoms/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [EventList.test.tsx](./calendar/src/components/atoms/__tests__/EventList.test.tsx)
│   │   │   │   │   ├── [LunarDate.test.tsx](./calendar/src/components/atoms/__tests__/LunarDate.test.tsx)
│   │   │   │   │   ├── [TimeBlock.test.tsx](./calendar/src/components/atoms/__tests__/TimeBlock.test.tsx)
│   │   │   │   │   └── [TimeGrid.test.tsx](./calendar/src/components/atoms/__tests__/TimeGrid.test.tsx)
│   │   │   │   ├── [EventList.tsx](./calendar/src/components/atoms/EventList.tsx)
│   │   │   │   ├── [LunarDate.tsx](./calendar/src/components/atoms/LunarDate.tsx)
│   │   │   │   ├── [TimeBlock.tsx](./calendar/src/components/atoms/TimeBlock.tsx)
│   │   │   │   └── [TimeGrid.tsx](./calendar/src/components/atoms/TimeGrid.tsx)
│   │   │   ├── molecules/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [DayView.test.tsx](./calendar/src/components/molecules/__tests__/DayView.test.tsx)
│   │   │   │   │   ├── [MonthCalendar.test.tsx](./calendar/src/components/molecules/__tests__/MonthCalendar.test.tsx)
│   │   │   │   │   ├── [ThreeDayView.test.tsx](./calendar/src/components/molecules/__tests__/ThreeDayView.test.tsx)
│   │   │   │   │   ├── [WeekView.test.tsx](./calendar/src/components/molecules/__tests__/WeekView.test.tsx)
│   │   │   │   │   └── [YearlyView.test.tsx](./calendar/src/components/molecules/__tests__/YearlyView.test.tsx)
│   │   │   │   ├── [DayView.tsx](./calendar/src/components/molecules/DayView.tsx)
│   │   │   │   ├── [HalflyView.tsx](./calendar/src/components/molecules/HalflyView.tsx)
│   │   │   │   ├── [MonthCalendar.tsx](./calendar/src/components/molecules/MonthCalendar.tsx)
│   │   │   │   ├── [QuarterlyView.tsx](./calendar/src/components/molecules/QuarterlyView.tsx)
│   │   │   │   ├── [ThreeDayView.tsx](./calendar/src/components/molecules/ThreeDayView.tsx)
│   │   │   │   ├── [WeekView.tsx](./calendar/src/components/molecules/WeekView.tsx)
│   │   │   │   └── [YearlyView.tsx](./calendar/src/components/molecules/YearlyView.tsx)
│   │   │   ├── organisms/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [CalendarApp.test.tsx](./calendar/src/components/organisms/__tests__/CalendarApp.test.tsx)
│   │   │   │   │   ├── [CountdownModal.test.tsx](./calendar/src/components/organisms/__tests__/CountdownModal.test.tsx)
│   │   │   │   │   ├── [DaysCountModal.test.tsx](./calendar/src/components/organisms/__tests__/DaysCountModal.test.tsx)
│   │   │   │   │   └── [Header.test.tsx](./calendar/src/components/organisms/__tests__/Header.test.tsx)
│   │   │   │   ├── [CalendarApp.tsx](./calendar/src/components/organisms/CalendarApp.tsx)
│   │   │   │   ├── [CountdownModal.tsx](./calendar/src/components/organisms/CountdownModal.tsx)
│   │   │   │   ├── [DaysCountModal.tsx](./calendar/src/components/organisms/DaysCountModal.tsx)
│   │   │   │   └── [Header.tsx](./calendar/src/components/organisms/Header.tsx)
│   │   │   └── templates/
│   │   │       ├── __tests__/
│   │   │       │   ├── [AboutTemplate.test.tsx](./calendar/src/components/templates/__tests__/AboutTemplate.test.tsx)
│   │   │       │   ├── [DownloadsTemplate.test.tsx](./calendar/src/components/templates/__tests__/DownloadsTemplate.test.tsx)
│   │   │       │   ├── [ErrorTemplate.test.tsx](./calendar/src/components/templates/__tests__/ErrorTemplate.test.tsx)
│   │   │       │   └── [VersionTemplate.test.tsx](./calendar/src/components/templates/__tests__/VersionTemplate.test.tsx)
│   │   │       ├── [AboutTemplate.tsx](./calendar/src/components/templates/AboutTemplate.tsx)
│   │   │       ├── [DownloadsTemplate.tsx](./calendar/src/components/templates/DownloadsTemplate.tsx)
│   │   │       ├── [ErrorTemplate.tsx](./calendar/src/components/templates/ErrorTemplate.tsx)
│   │   │       └── [VersionTemplate.tsx](./calendar/src/components/templates/VersionTemplate.tsx)
│   │   ├── data/
│   │   │   ├── __tests__/
│   │   │   │   ├── [constants.test.ts](./calendar/src/data/__tests__/constants.test.ts)
│   │   │   │   ├── [countdown.test.ts](./calendar/src/data/__tests__/countdown.test.ts)
│   │   │   │   ├── [daysBetween.test.ts](./calendar/src/data/__tests__/daysBetween.test.ts)
│   │   │   │   └── [timeBlocks.test.ts](./calendar/src/data/__tests__/timeBlocks.test.ts)
│   │   │   ├── [constants.ts](./calendar/src/data/constants.ts)
│   │   │   ├── [events.ts](./calendar/src/data/events.ts)
│   │   │   ├── [months.ts](./calendar/src/data/months.ts)
│   │   │   ├── [timeBlocks.ts](./calendar/src/data/timeBlocks.ts)
│   │   │   └── [years.ts](./calendar/src/data/years.ts)
│   │   ├── lib/
│   │   │   ├── __tests__/
│   │   │   │   └── [fonts.test.ts](./calendar/src/lib/__tests__/fonts.test.ts)
│   │   │   ├── [countdown.ts](./calendar/src/lib/countdown.ts)
│   │   │   ├── [daysBetween.ts](./calendar/src/lib/daysBetween.ts)
│   │   │   └── [fonts.ts](./calendar/src/lib/fonts.ts)
│   │   └── styles/
│   │       ├── [base.css](./calendar/src/styles/base.css)
│   │       ├── [globals.css](./calendar/src/styles/globals.css)
│   │       └── [themes.css](./calendar/src/styles/themes.css)
│   ├── src-tauri/
│   │   ├── capabilities/
│   │   │   └── [default.json](./calendar/src-tauri/capabilities/default.json)
│   │   ├── icons/
│   │   │   ├── [128x128.png](./calendar/src-tauri/icons/128x128.png)
│   │   │   ├── [128x128@2x.png](./calendar/src-tauri/icons/128x128@2x.png)
│   │   │   ├── [32x32.png](./calendar/src-tauri/icons/32x32.png)
│   │   │   ├── [Square107x107Logo.png](./calendar/src-tauri/icons/Square107x107Logo.png)
│   │   │   ├── [Square142x142Logo.png](./calendar/src-tauri/icons/Square142x142Logo.png)
│   │   │   ├── [Square150x150Logo.png](./calendar/src-tauri/icons/Square150x150Logo.png)
│   │   │   ├── [Square284x284Logo.png](./calendar/src-tauri/icons/Square284x284Logo.png)
│   │   │   ├── [Square30x30Logo.png](./calendar/src-tauri/icons/Square30x30Logo.png)
│   │   │   ├── [Square310x310Logo.png](./calendar/src-tauri/icons/Square310x310Logo.png)
│   │   │   ├── [Square44x44Logo.png](./calendar/src-tauri/icons/Square44x44Logo.png)
│   │   │   ├── [Square71x71Logo.png](./calendar/src-tauri/icons/Square71x71Logo.png)
│   │   │   ├── [Square89x89Logo.png](./calendar/src-tauri/icons/Square89x89Logo.png)
│   │   │   ├── [StoreLogo.png](./calendar/src-tauri/icons/StoreLogo.png)
│   │   │   ├── [icon.icns](./calendar/src-tauri/icons/icon.icns)
│   │   │   ├── [icon.ico](./calendar/src-tauri/icons/icon.ico)
│   │   │   └── [icon.png](./calendar/src-tauri/icons/icon.png)
│   │   ├── src/
│   │   │   ├── [lib.rs](./calendar/src-tauri/src/lib.rs)
│   │   │   └── [main.rs](./calendar/src-tauri/src/main.rs)
│   │   ├── [Cargo.lock](./calendar/src-tauri/Cargo.lock)
│   │   ├── [Cargo.toml](./calendar/src-tauri/Cargo.toml)
│   │   ├── [build.rs](./calendar/src-tauri/build.rs)
│   │   └── [tauri.conf.json](./calendar/src-tauri/tauri.conf.json)
│   ├── [AGENTS.md](./calendar/AGENTS.md)
│   ├── [Dockerfile](./calendar/Dockerfile)
│   ├── [LICENSE](./calendar/LICENSE)
│   ├── [README.md](./calendar/README.md)
│   ├── [TREE.md](./calendar/TREE.md)
│   ├── [docker-compose.yaml](./calendar/docker-compose.yaml)
│   ├── [eslint.config.mts](./calendar/eslint.config.mts)
│   ├── [jest.config.ts](./calendar/jest.config.ts)
│   ├── [jest.setup.ts](./calendar/jest.setup.ts)
│   ├── [next.config.ts](./calendar/next.config.ts)
│   ├── [package.json](./calendar/package.json)
│   ├── [playwright.config.ts](./calendar/playwright.config.ts)
│   ├── [postcss.config.mjs](./calendar/postcss.config.mjs)
│   └── [tsconfig.json](./calendar/tsconfig.json)
├── csv/
│   ├── docs/
│   │   ├── [ARCHITECTURE.md](./csv/docs/ARCHITECTURE.md)
│   │   ├── [CONTRIBUTING.md](./csv/docs/CONTRIBUTING.md)
│   │   ├── [DOWNLOADS.md](./csv/docs/DOWNLOADS.md)
│   │   ├── [PACKAGING.md](./csv/docs/PACKAGING.md)
│   │   └── [ROADMAP.md](./csv/docs/ROADMAP.md)
│   ├── e2e/
│   │   └── [smoke.spec.ts](./csv/e2e/smoke.spec.ts)
│   ├── public/
│   │   ├── icons/
│   │   │   ├── [icon-128x128.png](./csv/public/icons/icon-128x128.png)
│   │   │   ├── [icon-144x144.png](./csv/public/icons/icon-144x144.png)
│   │   │   ├── [icon-152x152.png](./csv/public/icons/icon-152x152.png)
│   │   │   ├── [icon-16x16.png](./csv/public/icons/icon-16x16.png)
│   │   │   ├── [icon-180x180.png](./csv/public/icons/icon-180x180.png)
│   │   │   ├── [icon-192x192.png](./csv/public/icons/icon-192x192.png)
│   │   │   ├── [icon-256x256.png](./csv/public/icons/icon-256x256.png)
│   │   │   ├── [icon-32x32.png](./csv/public/icons/icon-32x32.png)
│   │   │   ├── [icon-384x384.png](./csv/public/icons/icon-384x384.png)
│   │   │   ├── [icon-48x48.png](./csv/public/icons/icon-48x48.png)
│   │   │   ├── [icon-512x512.png](./csv/public/icons/icon-512x512.png)
│   │   │   ├── [icon-64x64.png](./csv/public/icons/icon-64x64.png)
│   │   │   ├── [icon-72x72.png](./csv/public/icons/icon-72x72.png)
│   │   │   ├── [icon-96x96.png](./csv/public/icons/icon-96x96.png)
│   │   │   └── [icon.svg](./csv/public/icons/icon.svg)
│   │   ├── [apple-touch-icon.png](./csv/public/apple-touch-icon.png)
│   │   ├── [favicon.ico](./csv/public/favicon.ico)
│   │   ├── [manifest.json](./csv/public/manifest.json)
│   │   ├── [robots.txt](./csv/public/robots.txt)
│   │   ├── [sitemap.xml](./csv/public/sitemap.xml)
│   │   └── [sw.js](./csv/public/sw.js)
│   ├── src/
│   │   ├── app/
│   │   │   ├── (auth)/
│   │   │   │   ├── forget-password/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./csv/src/app/(auth)/forget-password/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./csv/src/app/(auth)/forget-password/page.tsx)
│   │   │   │   ├── profile/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./csv/src/app/(auth)/profile/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./csv/src/app/(auth)/profile/page.tsx)
│   │   │   │   ├── reset-password/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./csv/src/app/(auth)/reset-password/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./csv/src/app/(auth)/reset-password/page.tsx)
│   │   │   │   ├── sign-in/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./csv/src/app/(auth)/sign-in/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./csv/src/app/(auth)/sign-in/page.tsx)
│   │   │   │   └── sign-up/
│   │   │   │       ├── __tests__/
│   │   │   │       │   └── [page.test.tsx](./csv/src/app/(auth)/sign-up/__tests__/page.test.tsx)
│   │   │   │       └── [page.tsx](./csv/src/app/(auth)/sign-up/page.tsx)
│   │   │   ├── (info)/
│   │   │   │   ├── about/
│   │   │   │   │   └── [page.tsx](./csv/src/app/(info)/about/page.tsx)
│   │   │   │   ├── downloads/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./csv/src/app/(info)/downloads/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./csv/src/app/(info)/downloads/page.tsx)
│   │   │   │   └── version/
│   │   │   │       └── [page.tsx](./csv/src/app/(info)/version/page.tsx)
│   │   │   ├── __tests__/
│   │   │   │   ├── [error.test.tsx](./csv/src/app/__tests__/error.test.tsx)
│   │   │   │   ├── [forbidden.test.tsx](./csv/src/app/__tests__/forbidden.test.tsx)
│   │   │   │   ├── [global-error.test.tsx](./csv/src/app/__tests__/global-error.test.tsx)
│   │   │   │   ├── [layout.test.tsx](./csv/src/app/__tests__/layout.test.tsx)
│   │   │   │   ├── [loading.test.tsx](./csv/src/app/__tests__/loading.test.tsx)
│   │   │   │   ├── [not-found.test.tsx](./csv/src/app/__tests__/not-found.test.tsx)
│   │   │   │   ├── [page.test.tsx](./csv/src/app/__tests__/page.test.tsx)
│   │   │   │   ├── [robots.test.ts](./csv/src/app/__tests__/robots.test.ts)
│   │   │   │   ├── [template.test.tsx](./csv/src/app/__tests__/template.test.tsx)
│   │   │   │   └── [unauthorized.test.tsx](./csv/src/app/__tests__/unauthorized.test.tsx)
│   │   │   ├── [default.tsx](./csv/src/app/default.tsx)
│   │   │   ├── [error.tsx](./csv/src/app/error.tsx)
│   │   │   ├── [favicon.ico](./csv/src/app/favicon.ico)
│   │   │   ├── [forbidden.tsx](./csv/src/app/forbidden.tsx)
│   │   │   ├── [global-error.tsx](./csv/src/app/global-error.tsx)
│   │   │   ├── [layout.tsx](./csv/src/app/layout.tsx)
│   │   │   ├── [loading.tsx](./csv/src/app/loading.tsx)
│   │   │   ├── [not-found.tsx](./csv/src/app/not-found.tsx)
│   │   │   ├── [page.tsx](./csv/src/app/page.tsx)
│   │   │   ├── [robots.ts](./csv/src/app/robots.ts)
│   │   │   ├── [template.tsx](./csv/src/app/template.tsx)
│   │   │   └── [unauthorized.tsx](./csv/src/app/unauthorized.tsx)
│   │   ├── components/
│   │   │   ├── __tests__/
│   │   │   │   └── [RegisterServiceWorker.test.tsx](./csv/src/components/__tests__/RegisterServiceWorker.test.tsx)
│   │   │   ├── editor/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [Cell.test.tsx](./csv/src/components/editor/__tests__/Cell.test.tsx)
│   │   │   │   │   ├── [Editor.test.tsx](./csv/src/components/editor/__tests__/Editor.test.tsx)
│   │   │   │   │   ├── [Grid.test.tsx](./csv/src/components/editor/__tests__/Grid.test.tsx)
│   │   │   │   │   ├── [StatusBar.test.tsx](./csv/src/components/editor/__tests__/StatusBar.test.tsx)
│   │   │   │   │   └── [Toolbar.test.tsx](./csv/src/components/editor/__tests__/Toolbar.test.tsx)
│   │   │   │   ├── [Cell.tsx](./csv/src/components/editor/Cell.tsx)
│   │   │   │   ├── [CommentPopover.tsx](./csv/src/components/editor/CommentPopover.tsx)
│   │   │   │   ├── [Editor.tsx](./csv/src/components/editor/Editor.tsx)
│   │   │   │   ├── [FilterBar.tsx](./csv/src/components/editor/FilterBar.tsx)
│   │   │   │   ├── [FindBar.tsx](./csv/src/components/editor/FindBar.tsx)
│   │   │   │   ├── [Grid.tsx](./csv/src/components/editor/Grid.tsx)
│   │   │   │   ├── [SheetTabs.tsx](./csv/src/components/editor/SheetTabs.tsx)
│   │   │   │   ├── [ShortcutsModal.tsx](./csv/src/components/editor/ShortcutsModal.tsx)
│   │   │   │   ├── [StatusBar.tsx](./csv/src/components/editor/StatusBar.tsx)
│   │   │   │   └── [Toolbar.tsx](./csv/src/components/editor/Toolbar.tsx)
│   │   │   ├── templates/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [AboutTemplate.test.tsx](./csv/src/components/templates/__tests__/AboutTemplate.test.tsx)
│   │   │   │   │   ├── [DownloadsTemplate.test.tsx](./csv/src/components/templates/__tests__/DownloadsTemplate.test.tsx)
│   │   │   │   │   ├── [ErrorTemplate.test.tsx](./csv/src/components/templates/__tests__/ErrorTemplate.test.tsx)
│   │   │   │   │   └── [VersionTemplate.test.tsx](./csv/src/components/templates/__tests__/VersionTemplate.test.tsx)
│   │   │   │   ├── [AboutTemplate.tsx](./csv/src/components/templates/AboutTemplate.tsx)
│   │   │   │   ├── [DownloadsTemplate.tsx](./csv/src/components/templates/DownloadsTemplate.tsx)
│   │   │   │   ├── [ErrorTemplate.tsx](./csv/src/components/templates/ErrorTemplate.tsx)
│   │   │   │   └── [VersionTemplate.tsx](./csv/src/components/templates/VersionTemplate.tsx)
│   │   │   └── [RegisterServiceWorker.tsx](./csv/src/components/RegisterServiceWorker.tsx)
│   │   ├── hooks/
│   │   │   ├── __tests__/
│   │   │   │   ├── [useCsvState.test.ts](./csv/src/hooks/__tests__/useCsvState.test.ts)
│   │   │   │   └── [useEditor.test.ts](./csv/src/hooks/__tests__/useEditor.test.ts)
│   │   │   ├── [useCsvState.ts](./csv/src/hooks/useCsvState.ts)
│   │   │   ├── [useEditor.ts](./csv/src/hooks/useEditor.ts)
│   │   │   └── [useTheme.ts](./csv/src/hooks/useTheme.ts)
│   │   ├── lib/
│   │   │   ├── __tests__/
│   │   │   │   ├── [autofill.test.ts](./csv/src/lib/__tests__/autofill.test.ts)
│   │   │   │   ├── [columns.test.ts](./csv/src/lib/__tests__/columns.test.ts)
│   │   │   │   ├── [csv.test.ts](./csv/src/lib/__tests__/csv.test.ts)
│   │   │   │   ├── [export.test.ts](./csv/src/lib/__tests__/export.test.ts)
│   │   │   │   ├── [fonts.test.ts](./csv/src/lib/__tests__/fonts.test.ts)
│   │   │   │   ├── [format.test.ts](./csv/src/lib/__tests__/format.test.ts)
│   │   │   │   ├── [formula.test.ts](./csv/src/lib/__tests__/formula.test.ts)
│   │   │   │   ├── [grid.test.ts](./csv/src/lib/__tests__/grid.test.ts)
│   │   │   │   ├── [selection.test.ts](./csv/src/lib/__tests__/selection.test.ts)
│   │   │   │   ├── [storage.test.ts](./csv/src/lib/__tests__/storage.test.ts)
│   │   │   │   ├── [workbook.test.ts](./csv/src/lib/__tests__/workbook.test.ts)
│   │   │   │   └── [xlsx.test.ts](./csv/src/lib/__tests__/xlsx.test.ts)
│   │   │   ├── [autofill.ts](./csv/src/lib/autofill.ts)
│   │   │   ├── [columns.ts](./csv/src/lib/columns.ts)
│   │   │   ├── [csv.ts](./csv/src/lib/csv.ts)
│   │   │   ├── [export.ts](./csv/src/lib/export.ts)
│   │   │   ├── [fonts.ts](./csv/src/lib/fonts.ts)
│   │   │   ├── [format.ts](./csv/src/lib/format.ts)
│   │   │   ├── [formula.ts](./csv/src/lib/formula.ts)
│   │   │   ├── [grid.ts](./csv/src/lib/grid.ts)
│   │   │   ├── [selection.ts](./csv/src/lib/selection.ts)
│   │   │   ├── [storage.ts](./csv/src/lib/storage.ts)
│   │   │   ├── [types.ts](./csv/src/lib/types.ts)
│   │   │   ├── [workbook.ts](./csv/src/lib/workbook.ts)
│   │   │   ├── [xlsx.ts](./csv/src/lib/xlsx.ts)
│   │   │   └── [xml.ts](./csv/src/lib/xml.ts)
│   │   ├── styles/
│   │   │   ├── [globals.css](./csv/src/styles/globals.css)
│   │   │   └── [themes.css](./csv/src/styles/themes.css)
│   │   └── test/
│   │       └── [style-mock.js](./csv/src/test/style-mock.js)
│   ├── src-tauri/
│   │   ├── capabilities/
│   │   │   └── [default.json](./csv/src-tauri/capabilities/default.json)
│   │   ├── icons/
│   │   │   ├── [128x128.png](./csv/src-tauri/icons/128x128.png)
│   │   │   ├── [128x128@2x.png](./csv/src-tauri/icons/128x128@2x.png)
│   │   │   ├── [32x32.png](./csv/src-tauri/icons/32x32.png)
│   │   │   ├── [Square107x107Logo.png](./csv/src-tauri/icons/Square107x107Logo.png)
│   │   │   ├── [Square142x142Logo.png](./csv/src-tauri/icons/Square142x142Logo.png)
│   │   │   ├── [Square150x150Logo.png](./csv/src-tauri/icons/Square150x150Logo.png)
│   │   │   ├── [Square284x284Logo.png](./csv/src-tauri/icons/Square284x284Logo.png)
│   │   │   ├── [Square30x30Logo.png](./csv/src-tauri/icons/Square30x30Logo.png)
│   │   │   ├── [Square310x310Logo.png](./csv/src-tauri/icons/Square310x310Logo.png)
│   │   │   ├── [Square44x44Logo.png](./csv/src-tauri/icons/Square44x44Logo.png)
│   │   │   ├── [Square71x71Logo.png](./csv/src-tauri/icons/Square71x71Logo.png)
│   │   │   ├── [Square89x89Logo.png](./csv/src-tauri/icons/Square89x89Logo.png)
│   │   │   ├── [StoreLogo.png](./csv/src-tauri/icons/StoreLogo.png)
│   │   │   ├── [icon.icns](./csv/src-tauri/icons/icon.icns)
│   │   │   ├── [icon.ico](./csv/src-tauri/icons/icon.ico)
│   │   │   └── [icon.png](./csv/src-tauri/icons/icon.png)
│   │   ├── src/
│   │   │   ├── [lib.rs](./csv/src-tauri/src/lib.rs)
│   │   │   └── [main.rs](./csv/src-tauri/src/main.rs)
│   │   ├── [Cargo.lock](./csv/src-tauri/Cargo.lock)
│   │   ├── [Cargo.toml](./csv/src-tauri/Cargo.toml)
│   │   ├── [build.rs](./csv/src-tauri/build.rs)
│   │   └── [tauri.conf.json](./csv/src-tauri/tauri.conf.json)
│   ├── [AGENTS.md](./csv/AGENTS.md)
│   ├── [Dockerfile](./csv/Dockerfile)
│   ├── [LICENSE](./csv/LICENSE)
│   ├── [README.md](./csv/README.md)
│   ├── [docker-compose.yaml](./csv/docker-compose.yaml)
│   ├── [eslint.config.mts](./csv/eslint.config.mts)
│   ├── [jest.config.ts](./csv/jest.config.ts)
│   ├── [jest.setup.ts](./csv/jest.setup.ts)
│   ├── [next.config.ts](./csv/next.config.ts)
│   ├── [package.json](./csv/package.json)
│   ├── [playwright.config.ts](./csv/playwright.config.ts)
│   ├── [postcss.config.mjs](./csv/postcss.config.mjs)
│   └── [tsconfig.json](./csv/tsconfig.json)
├── keynotes/
│   ├── __mocks__/
│   │   └── [idb.ts](./keynotes/__mocks__/idb.ts)
│   ├── docs/
│   │   ├── [ARCHITECTURE.md](./keynotes/docs/ARCHITECTURE.md)
│   │   ├── [CONTRIBUTING.md](./keynotes/docs/CONTRIBUTING.md)
│   │   ├── [DOWNLOADS.md](./keynotes/docs/DOWNLOADS.md)
│   │   ├── [PACKAGING.md](./keynotes/docs/PACKAGING.md)
│   │   └── [ROADMAP.md](./keynotes/docs/ROADMAP.md)
│   ├── public/
│   │   ├── icons/
│   │   │   ├── [icon-128x128.png](./keynotes/public/icons/icon-128x128.png)
│   │   │   ├── [icon-144x144.png](./keynotes/public/icons/icon-144x144.png)
│   │   │   ├── [icon-152x152.png](./keynotes/public/icons/icon-152x152.png)
│   │   │   ├── [icon-16x16.png](./keynotes/public/icons/icon-16x16.png)
│   │   │   ├── [icon-180x180.png](./keynotes/public/icons/icon-180x180.png)
│   │   │   ├── [icon-192x192.png](./keynotes/public/icons/icon-192x192.png)
│   │   │   ├── [icon-256x256.png](./keynotes/public/icons/icon-256x256.png)
│   │   │   ├── [icon-32x32.png](./keynotes/public/icons/icon-32x32.png)
│   │   │   ├── [icon-384x384.png](./keynotes/public/icons/icon-384x384.png)
│   │   │   ├── [icon-48x48.png](./keynotes/public/icons/icon-48x48.png)
│   │   │   ├── [icon-512x512.png](./keynotes/public/icons/icon-512x512.png)
│   │   │   ├── [icon-64x64.png](./keynotes/public/icons/icon-64x64.png)
│   │   │   ├── [icon-72x72.png](./keynotes/public/icons/icon-72x72.png)
│   │   │   ├── [icon-96x96.png](./keynotes/public/icons/icon-96x96.png)
│   │   │   └── [icon.svg](./keynotes/public/icons/icon.svg)
│   │   ├── [apple-touch-icon.png](./keynotes/public/apple-touch-icon.png)
│   │   ├── [favicon.ico](./keynotes/public/favicon.ico)
│   │   ├── [icon.svg](./keynotes/public/icon.svg)
│   │   ├── [manifest.webmanifest](./keynotes/public/manifest.webmanifest)
│   │   ├── [robots.txt](./keynotes/public/robots.txt)
│   │   ├── [sitemap.xml](./keynotes/public/sitemap.xml)
│   │   └── [sw.js](./keynotes/public/sw.js)
│   ├── src/
│   │   ├── app/
│   │   │   ├── (app)/
│   │   │   ├── (auth)/
│   │   │   │   ├── forget-password/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./keynotes/src/app/(auth)/forget-password/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./keynotes/src/app/(auth)/forget-password/page.tsx)
│   │   │   │   ├── profile/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./keynotes/src/app/(auth)/profile/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./keynotes/src/app/(auth)/profile/page.tsx)
│   │   │   │   ├── reset-password/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./keynotes/src/app/(auth)/reset-password/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./keynotes/src/app/(auth)/reset-password/page.tsx)
│   │   │   │   ├── sign-in/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./keynotes/src/app/(auth)/sign-in/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./keynotes/src/app/(auth)/sign-in/page.tsx)
│   │   │   │   └── sign-up/
│   │   │   │       ├── __tests__/
│   │   │   │       │   └── [page.test.tsx](./keynotes/src/app/(auth)/sign-up/__tests__/page.test.tsx)
│   │   │   │       └── [page.tsx](./keynotes/src/app/(auth)/sign-up/page.tsx)
│   │   │   ├── (info)/
│   │   │   │   ├── about/
│   │   │   │   │   └── [page.tsx](./keynotes/src/app/(info)/about/page.tsx)
│   │   │   │   ├── downloads/
│   │   │   │   │   └── [page.tsx](./keynotes/src/app/(info)/downloads/page.tsx)
│   │   │   │   └── version/
│   │   │   │       └── [page.tsx](./keynotes/src/app/(info)/version/page.tsx)
│   │   │   ├── __tests__/
│   │   │   │   ├── [HomePage.test.tsx](./keynotes/src/app/__tests__/HomePage.test.tsx)
│   │   │   │   ├── [error.test.tsx](./keynotes/src/app/__tests__/error.test.tsx)
│   │   │   │   ├── [forbidden.test.tsx](./keynotes/src/app/__tests__/forbidden.test.tsx)
│   │   │   │   ├── [global-error.test.tsx](./keynotes/src/app/__tests__/global-error.test.tsx)
│   │   │   │   ├── [layout.test.tsx](./keynotes/src/app/__tests__/layout.test.tsx)
│   │   │   │   ├── [loading.test.tsx](./keynotes/src/app/__tests__/loading.test.tsx)
│   │   │   │   ├── [not-found.test.tsx](./keynotes/src/app/__tests__/not-found.test.tsx)
│   │   │   │   ├── [robots.test.ts](./keynotes/src/app/__tests__/robots.test.ts)
│   │   │   │   ├── [template.test.tsx](./keynotes/src/app/__tests__/template.test.tsx)
│   │   │   │   └── [unauthorized.test.tsx](./keynotes/src/app/__tests__/unauthorized.test.tsx)
│   │   │   ├── editor/
│   │   │   │   └── [id]/
│   │   │   │       ├── __tests__/
│   │   │   │       │   ├── [EditorInteractions.test.tsx](./keynotes/src/app/editor/[id]/__tests__/EditorInteractions.test.tsx)
│   │   │   │       │   ├── [EditorPage.coverage.test.tsx](./keynotes/src/app/editor/[id]/__tests__/EditorPage.coverage.test.tsx)
│   │   │   │       │   └── [EditorPage.test.tsx](./keynotes/src/app/editor/[id]/__tests__/EditorPage.test.tsx)
│   │   │   │       ├── [EditorPage.tsx](./keynotes/src/app/editor/[id]/EditorPage.tsx)
│   │   │   │       └── [page.tsx](./keynotes/src/app/editor/[id]/page.tsx)
│   │   │   ├── handouts/
│   │   │   │   └── [id]/
│   │   │   │       ├── __tests__/
│   │   │   │       │   └── [HandoutsPage.test.tsx](./keynotes/src/app/handouts/[id]/__tests__/HandoutsPage.test.tsx)
│   │   │   │       ├── [HandoutsPage.tsx](./keynotes/src/app/handouts/[id]/HandoutsPage.tsx)
│   │   │   │       └── [page.tsx](./keynotes/src/app/handouts/[id]/page.tsx)
│   │   │   ├── present/
│   │   │   │   ├── [id]/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [PresentPage.test.tsx](./keynotes/src/app/present/[id]/__tests__/PresentPage.test.tsx)
│   │   │   │   │   ├── [PresentPage.tsx](./keynotes/src/app/present/[id]/PresentPage.tsx)
│   │   │   │   │   └── [page.tsx](./keynotes/src/app/present/[id]/page.tsx)
│   │   │   │   └── __tests__/
│   │   │   │       └── [PresentPage.test.tsx](./keynotes/src/app/present/__tests__/PresentPage.test.tsx)
│   │   │   ├── presenter/
│   │   │   │   └── [id]/
│   │   │   │       ├── __tests__/
│   │   │   │       │   └── [PresenterView.test.tsx](./keynotes/src/app/presenter/[id]/__tests__/PresenterView.test.tsx)
│   │   │   │       ├── [PresenterView.tsx](./keynotes/src/app/presenter/[id]/PresenterView.tsx)
│   │   │   │       └── [page.tsx](./keynotes/src/app/presenter/[id]/page.tsx)
│   │   │   ├── print/
│   │   │   │   └── [id]/
│   │   │   │       ├── __tests__/
│   │   │   │       │   └── [PrintPage.test.tsx](./keynotes/src/app/print/[id]/__tests__/PrintPage.test.tsx)
│   │   │   │       ├── [PrintPage.tsx](./keynotes/src/app/print/[id]/PrintPage.tsx)
│   │   │   │       └── [page.tsx](./keynotes/src/app/print/[id]/page.tsx)
│   │   │   ├── templates/
│   │   │   │   └── [page.tsx](./keynotes/src/app/templates/page.tsx)
│   │   │   ├── [default.tsx](./keynotes/src/app/default.tsx)
│   │   │   ├── [error.tsx](./keynotes/src/app/error.tsx)
│   │   │   ├── [favicon.ico](./keynotes/src/app/favicon.ico)
│   │   │   ├── [forbidden.tsx](./keynotes/src/app/forbidden.tsx)
│   │   │   ├── [global-error.tsx](./keynotes/src/app/global-error.tsx)
│   │   │   ├── [layout.tsx](./keynotes/src/app/layout.tsx)
│   │   │   ├── [loading.tsx](./keynotes/src/app/loading.tsx)
│   │   │   ├── [not-found.tsx](./keynotes/src/app/not-found.tsx)
│   │   │   ├── [page.tsx](./keynotes/src/app/page.tsx)
│   │   │   ├── [robots.ts](./keynotes/src/app/robots.ts)
│   │   │   ├── [template.tsx](./keynotes/src/app/template.tsx)
│   │   │   └── [unauthorized.tsx](./keynotes/src/app/unauthorized.tsx)
│   │   ├── components/
│   │   │   ├── atoms/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [FormControls.test.tsx](./keynotes/src/components/atoms/__tests__/FormControls.test.tsx)
│   │   │   │   ├── [FormControls.tsx](./keynotes/src/components/atoms/FormControls.tsx)
│   │   │   │   ├── [IconButton.tsx](./keynotes/src/components/atoms/IconButton.tsx)
│   │   │   │   ├── [LiveRegion.tsx](./keynotes/src/components/atoms/LiveRegion.tsx)
│   │   │   │   ├── [SkipLink.tsx](./keynotes/src/components/atoms/SkipLink.tsx)
│   │   │   │   └── [ThemeToggle.tsx](./keynotes/src/components/atoms/ThemeToggle.tsx)
│   │   │   ├── canvas/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [ObjectRenderer.test.tsx](./keynotes/src/components/canvas/__tests__/ObjectRenderer.test.tsx)
│   │   │   │   │   ├── [SlideCanvas.coverage.test.tsx](./keynotes/src/components/canvas/__tests__/SlideCanvas.coverage.test.tsx)
│   │   │   │   │   ├── [SlideCanvas.test.tsx](./keynotes/src/components/canvas/__tests__/SlideCanvas.test.tsx)
│   │   │   │   │   └── [canvasOps.test.ts](./keynotes/src/components/canvas/__tests__/canvasOps.test.ts)
│   │   │   │   ├── [ObjectRenderer.tsx](./keynotes/src/components/canvas/ObjectRenderer.tsx)
│   │   │   │   ├── [Rulers.tsx](./keynotes/src/components/canvas/Rulers.tsx)
│   │   │   │   ├── [SelectionOverlay.tsx](./keynotes/src/components/canvas/SelectionOverlay.tsx)
│   │   │   │   ├── [SlideCanvas.tsx](./keynotes/src/components/canvas/SlideCanvas.tsx)
│   │   │   │   ├── [SlidePreview.tsx](./keynotes/src/components/canvas/SlidePreview.tsx)
│   │   │   │   └── [canvasOps.ts](./keynotes/src/components/canvas/canvasOps.ts)
│   │   │   ├── home/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [DeckThumb.test.tsx](./keynotes/src/components/home/__tests__/DeckThumb.test.tsx)
│   │   │   │   ├── [DeckThumb.tsx](./keynotes/src/components/home/DeckThumb.tsx)
│   │   │   │   └── [ImportMenu.tsx](./keynotes/src/components/home/ImportMenu.tsx)
│   │   │   ├── objects/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [ObjectContent.test.tsx](./keynotes/src/components/objects/__tests__/ObjectContent.test.tsx)
│   │   │   │   └── [ObjectContent.tsx](./keynotes/src/components/objects/ObjectContent.tsx)
│   │   │   ├── organisms/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [EditorToolbar.coverage.test.tsx](./keynotes/src/components/organisms/__tests__/EditorToolbar.coverage.test.tsx)
│   │   │   │   │   ├── [ExportMenu.test.tsx](./keynotes/src/components/organisms/__tests__/ExportMenu.test.tsx)
│   │   │   │   │   └── [InsertToolbar.test.tsx](./keynotes/src/components/organisms/__tests__/InsertToolbar.test.tsx)
│   │   │   │   ├── panels/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [AnimationsPanel.test.tsx](./keynotes/src/components/organisms/panels/__tests__/AnimationsPanel.test.tsx)
│   │   │   │   │   │   ├── [CommentsPanel.test.tsx](./keynotes/src/components/organisms/panels/__tests__/CommentsPanel.test.tsx)
│   │   │   │   │   │   ├── [FooterControls.test.tsx](./keynotes/src/components/organisms/panels/__tests__/FooterControls.test.tsx)
│   │   │   │   │   │   ├── [FormatPanel.test.tsx](./keynotes/src/components/organisms/panels/__tests__/FormatPanel.test.tsx)
│   │   │   │   │   │   ├── [MasterPanel.test.tsx](./keynotes/src/components/organisms/panels/__tests__/MasterPanel.test.tsx)
│   │   │   │   │   │   ├── [ReuseSlidesModal.test.tsx](./keynotes/src/components/organisms/panels/__tests__/ReuseSlidesModal.test.tsx)
│   │   │   │   │   │   ├── [SectionGroup.test.tsx](./keynotes/src/components/organisms/panels/__tests__/SectionGroup.test.tsx)
│   │   │   │   │   │   ├── [SlideBackgroundPicker.test.tsx](./keynotes/src/components/organisms/panels/__tests__/SlideBackgroundPicker.test.tsx)
│   │   │   │   │   │   └── [SlidesPanel.test.tsx](./keynotes/src/components/organisms/panels/__tests__/SlidesPanel.test.tsx)
│   │   │   │   │   ├── animations/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   └── [AnimationOrderList.test.tsx](./keynotes/src/components/organisms/panels/animations/__tests__/AnimationOrderList.test.tsx)
│   │   │   │   │   │   ├── [AnimationOrderList.tsx](./keynotes/src/components/organisms/panels/animations/AnimationOrderList.tsx)
│   │   │   │   │   │   └── [AnimationPreview.tsx](./keynotes/src/components/organisms/panels/animations/AnimationPreview.tsx)
│   │   │   │   │   ├── [AnimationsPanel.tsx](./keynotes/src/components/organisms/panels/AnimationsPanel.tsx)
│   │   │   │   │   ├── [ArrangePanel.tsx](./keynotes/src/components/organisms/panels/ArrangePanel.tsx)
│   │   │   │   │   ├── [CommentsPanel.tsx](./keynotes/src/components/organisms/panels/CommentsPanel.tsx)
│   │   │   │   │   ├── [FooterControls.tsx](./keynotes/src/components/organisms/panels/FooterControls.tsx)
│   │   │   │   │   ├── [FormatPanel.tsx](./keynotes/src/components/organisms/panels/FormatPanel.tsx)
│   │   │   │   │   ├── [LeftPanel.tsx](./keynotes/src/components/organisms/panels/LeftPanel.tsx)
│   │   │   │   │   ├── [MasterPanel.tsx](./keynotes/src/components/organisms/panels/MasterPanel.tsx)
│   │   │   │   │   ├── [NotesPanel.tsx](./keynotes/src/components/organisms/panels/NotesPanel.tsx)
│   │   │   │   │   ├── [OutlinePanel.tsx](./keynotes/src/components/organisms/panels/OutlinePanel.tsx)
│   │   │   │   │   ├── [ReuseSlidesModal.tsx](./keynotes/src/components/organisms/panels/ReuseSlidesModal.tsx)
│   │   │   │   │   ├── [RightPanel.tsx](./keynotes/src/components/organisms/panels/RightPanel.tsx)
│   │   │   │   │   ├── [SectionGroup.tsx](./keynotes/src/components/organisms/panels/SectionGroup.tsx)
│   │   │   │   │   ├── [SlideBackgroundPicker.tsx](./keynotes/src/components/organisms/panels/SlideBackgroundPicker.tsx)
│   │   │   │   │   ├── [SlideThumb.tsx](./keynotes/src/components/organisms/panels/SlideThumb.tsx)
│   │   │   │   │   ├── [SlidesPanel.tsx](./keynotes/src/components/organisms/panels/SlidesPanel.tsx)
│   │   │   │   │   ├── [ThemePanel.tsx](./keynotes/src/components/organisms/panels/ThemePanel.tsx)
│   │   │   │   │   └── [TransitionsPanel.tsx](./keynotes/src/components/organisms/panels/TransitionsPanel.tsx)
│   │   │   │   ├── [DiagnosticsPanel.tsx](./keynotes/src/components/organisms/DiagnosticsPanel.tsx)
│   │   │   │   ├── [EditorToolbar.tsx](./keynotes/src/components/organisms/EditorToolbar.tsx)
│   │   │   │   ├── [ExportMenu.tsx](./keynotes/src/components/organisms/ExportMenu.tsx)
│   │   │   │   ├── [InsertToolbar.tsx](./keynotes/src/components/organisms/InsertToolbar.tsx)
│   │   │   │   └── [ToastContainer.tsx](./keynotes/src/components/organisms/ToastContainer.tsx)
│   │   │   ├── present/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [AnnotationOverlay.test.tsx](./keynotes/src/components/present/__tests__/AnnotationOverlay.test.tsx)
│   │   │   │   │   ├── [PresentSlide.test.tsx](./keynotes/src/components/present/__tests__/PresentSlide.test.tsx)
│   │   │   │   │   └── [presentSteps.test.ts](./keynotes/src/components/present/__tests__/presentSteps.test.ts)
│   │   │   │   ├── [AnnotationOverlay.tsx](./keynotes/src/components/present/AnnotationOverlay.tsx)
│   │   │   │   ├── [AnnotationToolbar.tsx](./keynotes/src/components/present/AnnotationToolbar.tsx)
│   │   │   │   ├── [BlackoutOverlay.tsx](./keynotes/src/components/present/BlackoutOverlay.tsx)
│   │   │   │   ├── [CaptionsBar.tsx](./keynotes/src/components/present/CaptionsBar.tsx)
│   │   │   │   ├── [PresentSlide.tsx](./keynotes/src/components/present/PresentSlide.tsx)
│   │   │   │   ├── [PresentTools.tsx](./keynotes/src/components/present/PresentTools.tsx)
│   │   │   │   ├── [RehearsalSummary.tsx](./keynotes/src/components/present/RehearsalSummary.tsx)
│   │   │   │   └── [presentSteps.ts](./keynotes/src/components/present/presentSteps.ts)
│   │   │   ├── templates/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [AboutTemplate.test.tsx](./keynotes/src/components/templates/__tests__/AboutTemplate.test.tsx)
│   │   │   │   │   ├── [DownloadsTemplate.test.tsx](./keynotes/src/components/templates/__tests__/DownloadsTemplate.test.tsx)
│   │   │   │   │   ├── [ErrorTemplate.test.tsx](./keynotes/src/components/templates/__tests__/ErrorTemplate.test.tsx)
│   │   │   │   │   └── [VersionTemplate.test.tsx](./keynotes/src/components/templates/__tests__/VersionTemplate.test.tsx)
│   │   │   │   ├── [AboutTemplate.tsx](./keynotes/src/components/templates/AboutTemplate.tsx)
│   │   │   │   ├── [DownloadsTemplate.tsx](./keynotes/src/components/templates/DownloadsTemplate.tsx)
│   │   │   │   ├── [ErrorTemplate.tsx](./keynotes/src/components/templates/ErrorTemplate.tsx)
│   │   │   │   └── [VersionTemplate.tsx](./keynotes/src/components/templates/VersionTemplate.tsx)
│   │   │   └── [PwaRegister.tsx](./keynotes/src/components/PwaRegister.tsx)
│   │   ├── data/
│   │   │   ├── __tests__/
│   │   │   │   └── [themes.test.ts](./keynotes/src/data/__tests__/themes.test.ts)
│   │   │   ├── [charts.ts](./keynotes/src/data/charts.ts)
│   │   │   ├── [icons.ts](./keynotes/src/data/icons.ts)
│   │   │   ├── [presets.ts](./keynotes/src/data/presets.ts)
│   │   │   ├── [templates.ts](./keynotes/src/data/templates.ts)
│   │   │   └── [themes.ts](./keynotes/src/data/themes.ts)
│   │   ├── hooks/
│   │   │   ├── __tests__/
│   │   │   │   ├── [useCaptions.test.tsx](./keynotes/src/hooks/__tests__/useCaptions.test.tsx)
│   │   │   │   ├── [useObjectKeyboard.test.tsx](./keynotes/src/hooks/__tests__/useObjectKeyboard.test.tsx)
│   │   │   │   └── [useTheme.test.tsx](./keynotes/src/hooks/__tests__/useTheme.test.tsx)
│   │   │   ├── [useCaptions.ts](./keynotes/src/hooks/useCaptions.ts)
│   │   │   ├── [useObjectKeyboard.ts](./keynotes/src/hooks/useObjectKeyboard.ts)
│   │   │   └── [useTheme.ts](./keynotes/src/hooks/useTheme.ts)
│   │   ├── lib/
│   │   │   ├── __tests__/
│   │   │   │   └── [db.test.ts](./keynotes/src/lib/__tests__/db.test.ts)
│   │   │   ├── stubs/
│   │   │   │   └── [node-builtins.ts](./keynotes/src/lib/stubs/node-builtins.ts)
│   │   │   └── [db.ts](./keynotes/src/lib/db.ts)
│   │   ├── providers/
│   │   │   ├── __tests__/
│   │   │   │   ├── [DeckProvider.test.tsx](./keynotes/src/providers/__tests__/DeckProvider.test.tsx)
│   │   │   │   └── [ToastProvider.test.tsx](./keynotes/src/providers/__tests__/ToastProvider.test.tsx)
│   │   │   ├── [DeckProvider.tsx](./keynotes/src/providers/DeckProvider.tsx)
│   │   │   ├── [Providers.tsx](./keynotes/src/providers/Providers.tsx)
│   │   │   └── [ToastProvider.tsx](./keynotes/src/providers/ToastProvider.tsx)
│   │   ├── styles/
│   │   │   └── [globals.css](./keynotes/src/styles/globals.css)
│   │   ├── test/
│   │   │   └── [helpers.tsx](./keynotes/src/test/helpers.tsx)
│   │   ├── types/
│   │   │   └── [deck.ts](./keynotes/src/types/deck.ts)
│   │   └── utils/
│   │       ├── __tests__/
│   │       │   ├── [animations.test.ts](./keynotes/src/utils/__tests__/animations.test.ts)
│   │       │   ├── [annotations.test.ts](./keynotes/src/utils/__tests__/annotations.test.ts)
│   │       │   ├── [capture.test.ts](./keynotes/src/utils/__tests__/capture.test.ts)
│   │       │   ├── [color.test.ts](./keynotes/src/utils/__tests__/color.test.ts)
│   │       │   ├── [deckFactory.test.ts](./keynotes/src/utils/__tests__/deckFactory.test.ts)
│   │       │   ├── [diagnostics.test.ts](./keynotes/src/utils/__tests__/diagnostics.test.ts)
│   │       │   ├── [exporters.test.ts](./keynotes/src/utils/__tests__/exporters.test.ts)
│   │       │   ├── [format.test.ts](./keynotes/src/utils/__tests__/format.test.ts)
│   │       │   ├── [geometry.test.ts](./keynotes/src/utils/__tests__/geometry.test.ts)
│   │       │   ├── [highlight.test.tsx](./keynotes/src/utils/__tests__/highlight.test.tsx)
│   │       │   ├── [importers.test.ts](./keynotes/src/utils/__tests__/importers.test.ts)
│   │       │   ├── [markdown.test.tsx](./keynotes/src/utils/__tests__/markdown.test.tsx)
│   │       │   ├── [master.test.ts](./keynotes/src/utils/__tests__/master.test.ts)
│   │       │   ├── [recentColors.test.ts](./keynotes/src/utils/__tests__/recentColors.test.ts)
│   │       │   ├── [rehearsal.test.ts](./keynotes/src/utils/__tests__/rehearsal.test.ts)
│   │       │   ├── [reuse.test.ts](./keynotes/src/utils/__tests__/reuse.test.ts)
│   │       │   ├── [sections.test.ts](./keynotes/src/utils/__tests__/sections.test.ts)
│   │       │   ├── [shapes.test.ts](./keynotes/src/utils/__tests__/shapes.test.ts)
│   │       │   ├── [shortcuts.test.ts](./keynotes/src/utils/__tests__/shortcuts.test.ts)
│   │       │   └── [slideBg.test.ts](./keynotes/src/utils/__tests__/slideBg.test.ts)
│   │       ├── [animations.ts](./keynotes/src/utils/animations.ts)
│   │       ├── [annotations.ts](./keynotes/src/utils/annotations.ts)
│   │       ├── [capture.ts](./keynotes/src/utils/capture.ts)
│   │       ├── [color.ts](./keynotes/src/utils/color.ts)
│   │       ├── [deckFactory.ts](./keynotes/src/utils/deckFactory.ts)
│   │       ├── [diagnostics.ts](./keynotes/src/utils/diagnostics.ts)
│   │       ├── [exporters.ts](./keynotes/src/utils/exporters.ts)
│   │       ├── [format.ts](./keynotes/src/utils/format.ts)
│   │       ├── [geometry.ts](./keynotes/src/utils/geometry.ts)
│   │       ├── [highlight.tsx](./keynotes/src/utils/highlight.tsx)
│   │       ├── [id.ts](./keynotes/src/utils/id.ts)
│   │       ├── [importers.ts](./keynotes/src/utils/importers.ts)
│   │       ├── [markdown.tsx](./keynotes/src/utils/markdown.tsx)
│   │       ├── [master.ts](./keynotes/src/utils/master.ts)
│   │       ├── [recentColors.ts](./keynotes/src/utils/recentColors.ts)
│   │       ├── [rehearsal.ts](./keynotes/src/utils/rehearsal.ts)
│   │       ├── [reuse.ts](./keynotes/src/utils/reuse.ts)
│   │       ├── [sections.ts](./keynotes/src/utils/sections.ts)
│   │       ├── [shapes.ts](./keynotes/src/utils/shapes.ts)
│   │       ├── [shortcuts.ts](./keynotes/src/utils/shortcuts.ts)
│   │       └── [slideBg.ts](./keynotes/src/utils/slideBg.ts)
│   ├── src-tauri/
│   │   ├── capabilities/
│   │   │   └── [default.json](./keynotes/src-tauri/capabilities/default.json)
│   │   ├── icons/
│   │   │   ├── [128x128.png](./keynotes/src-tauri/icons/128x128.png)
│   │   │   ├── [128x128@2x.png](./keynotes/src-tauri/icons/128x128@2x.png)
│   │   │   ├── [32x32.png](./keynotes/src-tauri/icons/32x32.png)
│   │   │   ├── [Square107x107Logo.png](./keynotes/src-tauri/icons/Square107x107Logo.png)
│   │   │   ├── [Square142x142Logo.png](./keynotes/src-tauri/icons/Square142x142Logo.png)
│   │   │   ├── [Square150x150Logo.png](./keynotes/src-tauri/icons/Square150x150Logo.png)
│   │   │   ├── [Square284x284Logo.png](./keynotes/src-tauri/icons/Square284x284Logo.png)
│   │   │   ├── [Square30x30Logo.png](./keynotes/src-tauri/icons/Square30x30Logo.png)
│   │   │   ├── [Square310x310Logo.png](./keynotes/src-tauri/icons/Square310x310Logo.png)
│   │   │   ├── [Square44x44Logo.png](./keynotes/src-tauri/icons/Square44x44Logo.png)
│   │   │   ├── [Square71x71Logo.png](./keynotes/src-tauri/icons/Square71x71Logo.png)
│   │   │   ├── [Square89x89Logo.png](./keynotes/src-tauri/icons/Square89x89Logo.png)
│   │   │   ├── [StoreLogo.png](./keynotes/src-tauri/icons/StoreLogo.png)
│   │   │   ├── [icon.icns](./keynotes/src-tauri/icons/icon.icns)
│   │   │   ├── [icon.ico](./keynotes/src-tauri/icons/icon.ico)
│   │   │   └── [icon.png](./keynotes/src-tauri/icons/icon.png)
│   │   ├── src/
│   │   │   ├── [lib.rs](./keynotes/src-tauri/src/lib.rs)
│   │   │   └── [main.rs](./keynotes/src-tauri/src/main.rs)
│   │   ├── [Cargo.lock](./keynotes/src-tauri/Cargo.lock)
│   │   ├── [Cargo.toml](./keynotes/src-tauri/Cargo.toml)
│   │   ├── [build.rs](./keynotes/src-tauri/build.rs)
│   │   └── [tauri.conf.json](./keynotes/src-tauri/tauri.conf.json)
│   ├── [AGENTS.md](./keynotes/AGENTS.md)
│   ├── [Dockerfile](./keynotes/Dockerfile)
│   ├── [LICENSE](./keynotes/LICENSE)
│   ├── [README.md](./keynotes/README.md)
│   ├── [docker-compose.yaml](./keynotes/docker-compose.yaml)
│   ├── [eslint.config.mts](./keynotes/eslint.config.mts)
│   ├── [jest.config.ts](./keynotes/jest.config.ts)
│   ├── [jest.setup.ts](./keynotes/jest.setup.ts)
│   ├── [next.config.ts](./keynotes/next.config.ts)
│   ├── [package.json](./keynotes/package.json)
│   ├── [postcss.config.mjs](./keynotes/postcss.config.mjs)
│   └── [tsconfig.json](./keynotes/tsconfig.json)
├── markdown/
│   ├── docs/
│   │   ├── [ARCHITECTURE.md](./markdown/docs/ARCHITECTURE.md)
│   │   ├── [CONTRIBUTING.md](./markdown/docs/CONTRIBUTING.md)
│   │   ├── [DOWNLOADS.md](./markdown/docs/DOWNLOADS.md)
│   │   ├── [PACKAGING.md](./markdown/docs/PACKAGING.md)
│   │   └── [ROADMAP.md](./markdown/docs/ROADMAP.md)
│   ├── e2e/
│   │   └── [smoke.spec.ts](./markdown/e2e/smoke.spec.ts)
│   ├── public/
│   │   ├── icons/
│   │   │   ├── [icon-128x128.png](./markdown/public/icons/icon-128x128.png)
│   │   │   ├── [icon-144x144.png](./markdown/public/icons/icon-144x144.png)
│   │   │   ├── [icon-152x152.png](./markdown/public/icons/icon-152x152.png)
│   │   │   ├── [icon-16x16.png](./markdown/public/icons/icon-16x16.png)
│   │   │   ├── [icon-180x180.png](./markdown/public/icons/icon-180x180.png)
│   │   │   ├── [icon-192x192.png](./markdown/public/icons/icon-192x192.png)
│   │   │   ├── [icon-256x256.png](./markdown/public/icons/icon-256x256.png)
│   │   │   ├── [icon-32x32.png](./markdown/public/icons/icon-32x32.png)
│   │   │   ├── [icon-384x384.png](./markdown/public/icons/icon-384x384.png)
│   │   │   ├── [icon-48x48.png](./markdown/public/icons/icon-48x48.png)
│   │   │   ├── [icon-512x512.png](./markdown/public/icons/icon-512x512.png)
│   │   │   ├── [icon-64x64.png](./markdown/public/icons/icon-64x64.png)
│   │   │   ├── [icon-72x72.png](./markdown/public/icons/icon-72x72.png)
│   │   │   ├── [icon-96x96.png](./markdown/public/icons/icon-96x96.png)
│   │   │   └── [icon.svg](./markdown/public/icons/icon.svg)
│   │   ├── [apple-touch-icon.png](./markdown/public/apple-touch-icon.png)
│   │   ├── [favicon.ico](./markdown/public/favicon.ico)
│   │   ├── [manifest.json](./markdown/public/manifest.json)
│   │   ├── [robots.txt](./markdown/public/robots.txt)
│   │   ├── [sitemap.xml](./markdown/public/sitemap.xml)
│   │   └── [sw.js](./markdown/public/sw.js)
│   ├── scripts/
│   │   └── [generate-seed.mjs](./markdown/scripts/generate-seed.mjs)
│   ├── src/
│   │   ├── app/
│   │   │   ├── (auth)/
│   │   │   │   ├── forget-password/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./markdown/src/app/(auth)/forget-password/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./markdown/src/app/(auth)/forget-password/page.tsx)
│   │   │   │   ├── profile/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./markdown/src/app/(auth)/profile/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./markdown/src/app/(auth)/profile/page.tsx)
│   │   │   │   ├── reset-password/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./markdown/src/app/(auth)/reset-password/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./markdown/src/app/(auth)/reset-password/page.tsx)
│   │   │   │   ├── sign-in/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./markdown/src/app/(auth)/sign-in/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./markdown/src/app/(auth)/sign-in/page.tsx)
│   │   │   │   └── sign-up/
│   │   │   │       ├── __tests__/
│   │   │   │       │   └── [page.test.tsx](./markdown/src/app/(auth)/sign-up/__tests__/page.test.tsx)
│   │   │   │       └── [page.tsx](./markdown/src/app/(auth)/sign-up/page.tsx)
│   │   │   ├── (info)/
│   │   │   │   ├── about/
│   │   │   │   │   └── [page.tsx](./markdown/src/app/(info)/about/page.tsx)
│   │   │   │   ├── downloads/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./markdown/src/app/(info)/downloads/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./markdown/src/app/(info)/downloads/page.tsx)
│   │   │   │   └── version/
│   │   │   │       └── [page.tsx](./markdown/src/app/(info)/version/page.tsx)
│   │   │   ├── __tests__/
│   │   │   │   ├── [error.test.tsx](./markdown/src/app/__tests__/error.test.tsx)
│   │   │   │   ├── [forbidden.test.tsx](./markdown/src/app/__tests__/forbidden.test.tsx)
│   │   │   │   ├── [global-error.test.tsx](./markdown/src/app/__tests__/global-error.test.tsx)
│   │   │   │   ├── [layout.test.tsx](./markdown/src/app/__tests__/layout.test.tsx)
│   │   │   │   ├── [loading.test.tsx](./markdown/src/app/__tests__/loading.test.tsx)
│   │   │   │   ├── [not-found.test.tsx](./markdown/src/app/__tests__/not-found.test.tsx)
│   │   │   │   ├── [page.test.tsx](./markdown/src/app/__tests__/page.test.tsx)
│   │   │   │   ├── [robots.test.ts](./markdown/src/app/__tests__/robots.test.ts)
│   │   │   │   ├── [template.test.tsx](./markdown/src/app/__tests__/template.test.tsx)
│   │   │   │   └── [unauthorized.test.tsx](./markdown/src/app/__tests__/unauthorized.test.tsx)
│   │   │   ├── [default.tsx](./markdown/src/app/default.tsx)
│   │   │   ├── [error.tsx](./markdown/src/app/error.tsx)
│   │   │   ├── [favicon.ico](./markdown/src/app/favicon.ico)
│   │   │   ├── [forbidden.tsx](./markdown/src/app/forbidden.tsx)
│   │   │   ├── [global-error.tsx](./markdown/src/app/global-error.tsx)
│   │   │   ├── [layout.tsx](./markdown/src/app/layout.tsx)
│   │   │   ├── [loading.tsx](./markdown/src/app/loading.tsx)
│   │   │   ├── [not-found.tsx](./markdown/src/app/not-found.tsx)
│   │   │   ├── [page.tsx](./markdown/src/app/page.tsx)
│   │   │   ├── [robots.ts](./markdown/src/app/robots.ts)
│   │   │   ├── [template.tsx](./markdown/src/app/template.tsx)
│   │   │   └── [unauthorized.tsx](./markdown/src/app/unauthorized.tsx)
│   │   ├── components/
│   │   │   ├── editor/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [ConvertToolbar.test.tsx](./markdown/src/components/editor/__tests__/ConvertToolbar.test.tsx)
│   │   │   │   │   ├── [FileToolbar.test.tsx](./markdown/src/components/editor/__tests__/FileToolbar.test.tsx)
│   │   │   │   │   ├── [FormatToolbar.test.tsx](./markdown/src/components/editor/__tests__/FormatToolbar.test.tsx)
│   │   │   │   │   ├── [MarkdownPreviewer.test.tsx](./markdown/src/components/editor/__tests__/MarkdownPreviewer.test.tsx)
│   │   │   │   │   ├── [StatsBar.test.tsx](./markdown/src/components/editor/__tests__/StatsBar.test.tsx)
│   │   │   │   │   ├── [TocSidebar.test.tsx](./markdown/src/components/editor/__tests__/TocSidebar.test.tsx)
│   │   │   │   │   └── [ViewControls.test.tsx](./markdown/src/components/editor/__tests__/ViewControls.test.tsx)
│   │   │   │   ├── [ConvertToolbar.tsx](./markdown/src/components/editor/ConvertToolbar.tsx)
│   │   │   │   ├── [FileToolbar.tsx](./markdown/src/components/editor/FileToolbar.tsx)
│   │   │   │   ├── [FormatToolbar.tsx](./markdown/src/components/editor/FormatToolbar.tsx)
│   │   │   │   ├── [MarkdownPreviewer.tsx](./markdown/src/components/editor/MarkdownPreviewer.tsx)
│   │   │   │   ├── [StatsBar.tsx](./markdown/src/components/editor/StatsBar.tsx)
│   │   │   │   ├── [TocSidebar.tsx](./markdown/src/components/editor/TocSidebar.tsx)
│   │   │   │   └── [ViewControls.tsx](./markdown/src/components/editor/ViewControls.tsx)
│   │   │   ├── markdown/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [GraphView.test.tsx](./markdown/src/components/markdown/__tests__/GraphView.test.tsx)
│   │   │   │   │   ├── [VaultApp.test.tsx](./markdown/src/components/markdown/__tests__/VaultApp.test.tsx)
│   │   │   │   │   ├── [VaultSidebar.test.tsx](./markdown/src/components/markdown/__tests__/VaultSidebar.test.tsx)
│   │   │   │   │   └── [WordCounterDialog.test.tsx](./markdown/src/components/markdown/__tests__/WordCounterDialog.test.tsx)
│   │   │   │   ├── [GraphView.tsx](./markdown/src/components/markdown/GraphView.tsx)
│   │   │   │   ├── [VaultApp.tsx](./markdown/src/components/markdown/VaultApp.tsx)
│   │   │   │   ├── [VaultSidebar.tsx](./markdown/src/components/markdown/VaultSidebar.tsx)
│   │   │   │   └── [WordCounterDialog.tsx](./markdown/src/components/markdown/WordCounterDialog.tsx)
│   │   │   └── templates/
│   │   │       ├── __tests__/
│   │   │       │   ├── [AboutTemplate.test.tsx](./markdown/src/components/templates/__tests__/AboutTemplate.test.tsx)
│   │   │       │   ├── [DownloadsTemplate.test.tsx](./markdown/src/components/templates/__tests__/DownloadsTemplate.test.tsx)
│   │   │       │   ├── [ErrorTemplate.test.tsx](./markdown/src/components/templates/__tests__/ErrorTemplate.test.tsx)
│   │   │       │   └── [VersionTemplate.test.tsx](./markdown/src/components/templates/__tests__/VersionTemplate.test.tsx)
│   │   │       ├── [AboutTemplate.tsx](./markdown/src/components/templates/AboutTemplate.tsx)
│   │   │       ├── [DownloadsTemplate.tsx](./markdown/src/components/templates/DownloadsTemplate.tsx)
│   │   │       ├── [ErrorTemplate.tsx](./markdown/src/components/templates/ErrorTemplate.tsx)
│   │   │       └── [VersionTemplate.tsx](./markdown/src/components/templates/VersionTemplate.tsx)
│   │   ├── data/
│   │   │   ├── [seed.gen.json](./markdown/src/data/seed.gen.json)
│   │   │   └── [seed.ts](./markdown/src/data/seed.ts)
│   │   ├── hooks/
│   │   │   ├── __tests__/
│   │   │   │   ├── [useCodeMirror.test.ts](./markdown/src/hooks/__tests__/useCodeMirror.test.ts)
│   │   │   │   ├── [useMarkdownRender.test.ts](./markdown/src/hooks/__tests__/useMarkdownRender.test.ts)
│   │   │   │   ├── [useSWRegister.test.ts](./markdown/src/hooks/__tests__/useSWRegister.test.ts)
│   │   │   │   └── [useScrollSync.test.ts](./markdown/src/hooks/__tests__/useScrollSync.test.ts)
│   │   │   ├── [useCodeMirror.ts](./markdown/src/hooks/useCodeMirror.ts)
│   │   │   ├── [useMarkdownRender.ts](./markdown/src/hooks/useMarkdownRender.ts)
│   │   │   ├── [useSWRegister.ts](./markdown/src/hooks/useSWRegister.ts)
│   │   │   └── [useScrollSync.ts](./markdown/src/hooks/useScrollSync.ts)
│   │   ├── lib/
│   │   │   ├── __tests__/
│   │   │   │   ├── [braille.test.ts](./markdown/src/lib/__tests__/braille.test.ts)
│   │   │   │   ├── [date.test.ts](./markdown/src/lib/__tests__/date.test.ts)
│   │   │   │   ├── [export.test.ts](./markdown/src/lib/__tests__/export.test.ts)
│   │   │   │   ├── [fonts.test.ts](./markdown/src/lib/__tests__/fonts.test.ts)
│   │   │   │   ├── [format.test.ts](./markdown/src/lib/__tests__/format.test.ts)
│   │   │   │   ├── [leet.test.ts](./markdown/src/lib/__tests__/leet.test.ts)
│   │   │   │   ├── [markdown.test.ts](./markdown/src/lib/__tests__/markdown.test.ts)
│   │   │   │   ├── [morse.test.ts](./markdown/src/lib/__tests__/morse.test.ts)
│   │   │   │   ├── [slug.test.ts](./markdown/src/lib/__tests__/slug.test.ts)
│   │   │   │   ├── [storage.ssr.test.ts](./markdown/src/lib/__tests__/storage.ssr.test.ts)
│   │   │   │   ├── [storage.test.ts](./markdown/src/lib/__tests__/storage.test.ts)
│   │   │   │   ├── [textCase.test.ts](./markdown/src/lib/__tests__/textCase.test.ts)
│   │   │   │   ├── [typoglycemia.test.ts](./markdown/src/lib/__tests__/typoglycemia.test.ts)
│   │   │   │   ├── [wikilinks.test.ts](./markdown/src/lib/__tests__/wikilinks.test.ts)
│   │   │   │   └── [wordCounter.test.ts](./markdown/src/lib/__tests__/wordCounter.test.ts)
│   │   │   ├── [braille.ts](./markdown/src/lib/braille.ts)
│   │   │   ├── [date.ts](./markdown/src/lib/date.ts)
│   │   │   ├── [export.ts](./markdown/src/lib/export.ts)
│   │   │   ├── [fonts.ts](./markdown/src/lib/fonts.ts)
│   │   │   ├── [format.ts](./markdown/src/lib/format.ts)
│   │   │   ├── [leet.ts](./markdown/src/lib/leet.ts)
│   │   │   ├── [markdown.ts](./markdown/src/lib/markdown.ts)
│   │   │   ├── [morse.ts](./markdown/src/lib/morse.ts)
│   │   │   ├── [slug.ts](./markdown/src/lib/slug.ts)
│   │   │   ├── [storage.ts](./markdown/src/lib/storage.ts)
│   │   │   ├── [textCase.ts](./markdown/src/lib/textCase.ts)
│   │   │   ├── [types.ts](./markdown/src/lib/types.ts)
│   │   │   ├── [typoglycemia.ts](./markdown/src/lib/typoglycemia.ts)
│   │   │   ├── [wikilinks.ts](./markdown/src/lib/wikilinks.ts)
│   │   │   └── [wordCounter.ts](./markdown/src/lib/wordCounter.ts)
│   │   ├── notes/
│   │   │   ├── devices/
│   │   │   │   ├── [devices.md](./markdown/src/notes/devices/devices.md)
│   │   │   │   ├── [headphones.md](./markdown/src/notes/devices/headphones.md)
│   │   │   │   ├── [laptops.md](./markdown/src/notes/devices/laptops.md)
│   │   │   │   ├── [phones.md](./markdown/src/notes/devices/phones.md)
│   │   │   │   ├── [tablets.md](./markdown/src/notes/devices/tablets.md)
│   │   │   │   └── [watches.md](./markdown/src/notes/devices/watches.md)
│   │   │   ├── engineering/
│   │   │   │   ├── data/
│   │   │   │   │   ├── analyst/
│   │   │   │   │   │   ├── non-technical/
│   │   │   │   │   │   │   ├── [powerbi.md](./markdown/src/notes/engineering/data/analyst/non-technical/powerbi.md)
│   │   │   │   │   │   │   └── [tableau.md](./markdown/src/notes/engineering/data/analyst/non-technical/tableau.md)
│   │   │   │   │   │   └── technical/
│   │   │   │   │   │       ├── [matplotlib.md](./markdown/src/notes/engineering/data/analyst/technical/matplotlib.md)
│   │   │   │   │   │       ├── [numpy.md](./markdown/src/notes/engineering/data/analyst/technical/numpy.md)
│   │   │   │   │   │       ├── [pandas.md](./markdown/src/notes/engineering/data/analyst/technical/pandas.md)
│   │   │   │   │   │       └── [statsmodels.md](./markdown/src/notes/engineering/data/analyst/technical/statsmodels.md)
│   │   │   │   │   ├── engineer/
│   │   │   │   │   │   ├── [apache-airflow.md](./markdown/src/notes/engineering/data/engineer/apache-airflow.md)
│   │   │   │   │   │   ├── [apache-iceberg.md](./markdown/src/notes/engineering/data/engineer/apache-iceberg.md)
│   │   │   │   │   │   ├── [apache-spark.md](./markdown/src/notes/engineering/data/engineer/apache-spark.md)
│   │   │   │   │   │   └── [apache-trino.md](./markdown/src/notes/engineering/data/engineer/apache-trino.md)
│   │   │   │   │   └── scientist/
│   │   │   │   │       ├── python/
│   │   │   │   │       │   ├── [hugging-face.md](./markdown/src/notes/engineering/data/scientist/python/hugging-face.md)
│   │   │   │   │       │   ├── [pytorch.md](./markdown/src/notes/engineering/data/scientist/python/pytorch.md)
│   │   │   │   │       │   ├── [scikit-learn.md](./markdown/src/notes/engineering/data/scientist/python/scikit-learn.md)
│   │   │   │   │       │   ├── [tensorflow.md](./markdown/src/notes/engineering/data/scientist/python/tensorflow.md)
│   │   │   │   │       │   └── [xgboost.md](./markdown/src/notes/engineering/data/scientist/python/xgboost.md)
│   │   │   │   │       └── typescript/
│   │   │   │   │           ├── [brain.js.md](./markdown/src/notes/engineering/data/scientist/typescript/brain.js.md)
│   │   │   │   │           ├── [mind.js.md](./markdown/src/notes/engineering/data/scientist/typescript/mind.js.md)
│   │   │   │   │           ├── [ml5.js.md](./markdown/src/notes/engineering/data/scientist/typescript/ml5.js.md)
│   │   │   │   │           └── [synaptic.js.md](./markdown/src/notes/engineering/data/scientist/typescript/synaptic.js.md)
│   │   │   │   ├── developer-tools/
│   │   │   │   │   ├── api/
│   │   │   │   │   │   ├── clients/
│   │   │   │   │   │   │   ├── [bruno.md](./markdown/src/notes/engineering/developer-tools/api/clients/bruno.md)
│   │   │   │   │   │   │   ├── [insomnia.md](./markdown/src/notes/engineering/developer-tools/api/clients/insomnia.md)
│   │   │   │   │   │   │   └── [postman.md](./markdown/src/notes/engineering/developer-tools/api/clients/postman.md)
│   │   │   │   │   │   └── documentation/
│   │   │   │   │   │       ├── [rapi-doc.md](./markdown/src/notes/engineering/developer-tools/api/documentation/rapi-doc.md)
│   │   │   │   │   │       ├── [redoc.md](./markdown/src/notes/engineering/developer-tools/api/documentation/redoc.md)
│   │   │   │   │   │       ├── [stoplight.md](./markdown/src/notes/engineering/developer-tools/api/documentation/stoplight.md)
│   │   │   │   │   │       └── [swagger.md](./markdown/src/notes/engineering/developer-tools/api/documentation/swagger.md)
│   │   │   │   │   ├── code-editors/
│   │   │   │   │   │   ├── [cursor.md](./markdown/src/notes/engineering/developer-tools/code-editors/cursor.md)
│   │   │   │   │   │   ├── [vscode.md](./markdown/src/notes/engineering/developer-tools/code-editors/vscode.md)
│   │   │   │   │   │   ├── [vscodium.md](./markdown/src/notes/engineering/developer-tools/code-editors/vscodium.md)
│   │   │   │   │   │   └── [windsurf.md](./markdown/src/notes/engineering/developer-tools/code-editors/windsurf.md)
│   │   │   │   │   ├── ide/
│   │   │   │   │   │   ├── jetbrains/
│   │   │   │   │   │   │   ├── [clion.md](./markdown/src/notes/engineering/developer-tools/ide/jetbrains/clion.md)
│   │   │   │   │   │   │   ├── [intellij-idea.md](./markdown/src/notes/engineering/developer-tools/ide/jetbrains/intellij-idea.md)
│   │   │   │   │   │   │   ├── [php-storm.md](./markdown/src/notes/engineering/developer-tools/ide/jetbrains/php-storm.md)
│   │   │   │   │   │   │   ├── [py-charm.md](./markdown/src/notes/engineering/developer-tools/ide/jetbrains/py-charm.md)
│   │   │   │   │   │   │   ├── [rider.md](./markdown/src/notes/engineering/developer-tools/ide/jetbrains/rider.md)
│   │   │   │   │   │   │   ├── [ruby-mine.md](./markdown/src/notes/engineering/developer-tools/ide/jetbrains/ruby-mine.md)
│   │   │   │   │   │   │   ├── [rust-rover.md](./markdown/src/notes/engineering/developer-tools/ide/jetbrains/rust-rover.md)
│   │   │   │   │   │   │   └── [web-storm.md](./markdown/src/notes/engineering/developer-tools/ide/jetbrains/web-storm.md)
│   │   │   │   │   │   ├── [android-studio.md](./markdown/src/notes/engineering/developer-tools/ide/android-studio.md)
│   │   │   │   │   │   ├── [visual-studio.md](./markdown/src/notes/engineering/developer-tools/ide/visual-studio.md)
│   │   │   │   │   │   └── [xcode.md](./markdown/src/notes/engineering/developer-tools/ide/xcode.md)
│   │   │   │   │   ├── languages/
│   │   │   │   │   │   ├── c/
│   │   │   │   │   │   │   └── tools/
│   │   │   │   │   │   │       └── [clang-format.md](./markdown/src/notes/engineering/developer-tools/languages/c/tools/clang-format.md)
│   │   │   │   │   │   ├── go/
│   │   │   │   │   │   │   └── tools/
│   │   │   │   │   │   │       └── [gofmt.md](./markdown/src/notes/engineering/developer-tools/languages/go/tools/gofmt.md)
│   │   │   │   │   │   ├── python/
│   │   │   │   │   │   │   └── tools/
│   │   │   │   │   │   │       ├── [black.md](./markdown/src/notes/engineering/developer-tools/languages/python/tools/black.md)
│   │   │   │   │   │   │       ├── [flake8.md](./markdown/src/notes/engineering/developer-tools/languages/python/tools/flake8.md)
│   │   │   │   │   │   │       ├── [pylint.md](./markdown/src/notes/engineering/developer-tools/languages/python/tools/pylint.md)
│   │   │   │   │   │   │       └── [ruff.md](./markdown/src/notes/engineering/developer-tools/languages/python/tools/ruff.md)
│   │   │   │   │   │   ├── shell/
│   │   │   │   │   │   │   └── tools/
│   │   │   │   │   │   │       └── [shell-check.md](./markdown/src/notes/engineering/developer-tools/languages/shell/tools/shell-check.md)
│   │   │   │   │   │   └── typescript/
│   │   │   │   │   │       ├── engines/
│   │   │   │   │   │       │   ├── [hermes.md](./markdown/src/notes/engineering/developer-tools/languages/typescript/engines/hermes.md)
│   │   │   │   │   │       │   ├── [javascript-core.md](./markdown/src/notes/engineering/developer-tools/languages/typescript/engines/javascript-core.md)
│   │   │   │   │   │       │   ├── [quick.js.md](./markdown/src/notes/engineering/developer-tools/languages/typescript/engines/quick.js.md)
│   │   │   │   │   │       │   ├── [spider-monkey.md](./markdown/src/notes/engineering/developer-tools/languages/typescript/engines/spider-monkey.md)
│   │   │   │   │   │       │   └── [v8.md](./markdown/src/notes/engineering/developer-tools/languages/typescript/engines/v8.md)
│   │   │   │   │   │       ├── monorepo/
│   │   │   │   │   │       │   ├── [bit.md](./markdown/src/notes/engineering/developer-tools/languages/typescript/monorepo/bit.md)
│   │   │   │   │   │       │   ├── [lerna.js.md](./markdown/src/notes/engineering/developer-tools/languages/typescript/monorepo/lerna.js.md)
│   │   │   │   │   │       │   ├── [nx.md](./markdown/src/notes/engineering/developer-tools/languages/typescript/monorepo/nx.md)
│   │   │   │   │   │       │   ├── [pnpm-workspaces.md](./markdown/src/notes/engineering/developer-tools/languages/typescript/monorepo/pnpm-workspaces.md)
│   │   │   │   │   │       │   ├── [turborepo.md](./markdown/src/notes/engineering/developer-tools/languages/typescript/monorepo/turborepo.md)
│   │   │   │   │   │       │   └── [yarn-workspaces.md](./markdown/src/notes/engineering/developer-tools/languages/typescript/monorepo/yarn-workspaces.md)
│   │   │   │   │   │       ├── packages/
│   │   │   │   │   │       │   ├── managers/
│   │   │   │   │   │       │   │   ├── [npm.md](./markdown/src/notes/engineering/developer-tools/languages/typescript/packages/managers/npm.md)
│   │   │   │   │   │       │   │   ├── [pnpm.md](./markdown/src/notes/engineering/developer-tools/languages/typescript/packages/managers/pnpm.md)
│   │   │   │   │   │       │   │   ├── [volt.md](./markdown/src/notes/engineering/developer-tools/languages/typescript/packages/managers/volt.md)
│   │   │   │   │   │       │   │   └── [yarn.md](./markdown/src/notes/engineering/developer-tools/languages/typescript/packages/managers/yarn.md)
│   │   │   │   │   │       │   └── registries/
│   │   │   │   │   │       │       ├── [github-packages.md](./markdown/src/notes/engineering/developer-tools/languages/typescript/packages/registries/github-packages.md)
│   │   │   │   │   │       │       └── [jsr.md](./markdown/src/notes/engineering/developer-tools/languages/typescript/packages/registries/jsr.md)
│   │   │   │   │   │       ├── runtimes/
│   │   │   │   │   │       │   ├── [bun.md](./markdown/src/notes/engineering/developer-tools/languages/typescript/runtimes/bun.md)
│   │   │   │   │   │       │   ├── [deno.md](./markdown/src/notes/engineering/developer-tools/languages/typescript/runtimes/deno.md)
│   │   │   │   │   │       │   ├── [llrt.md](./markdown/src/notes/engineering/developer-tools/languages/typescript/runtimes/llrt.md)
│   │   │   │   │   │       │   ├── [node.js.md](./markdown/src/notes/engineering/developer-tools/languages/typescript/runtimes/node.js.md)
│   │   │   │   │   │       │   └── [winter.js.md](./markdown/src/notes/engineering/developer-tools/languages/typescript/runtimes/winter.js.md)
│   │   │   │   │   │       └── tools/
│   │   │   │   │   │           ├── [biome.md](./markdown/src/notes/engineering/developer-tools/languages/typescript/tools/biome.md)
│   │   │   │   │   │           ├── [eslint.md](./markdown/src/notes/engineering/developer-tools/languages/typescript/tools/eslint.md)
│   │   │   │   │   │           ├── [oxc.md](./markdown/src/notes/engineering/developer-tools/languages/typescript/tools/oxc.md)
│   │   │   │   │   │           └── [prettier.md](./markdown/src/notes/engineering/developer-tools/languages/typescript/tools/prettier.md)
│   │   │   │   │   └── version-control/
│   │   │   │   │       ├── platform/
│   │   │   │   │       │   └── [launchpad.md](./markdown/src/notes/engineering/developer-tools/version-control/platform/launchpad.md)
│   │   │   │   │       └── system/
│   │   │   │   │           ├── [helix-core.md](./markdown/src/notes/engineering/developer-tools/version-control/system/helix-core.md)
│   │   │   │   │           └── [svn.md](./markdown/src/notes/engineering/developer-tools/version-control/system/svn.md)
│   │   │   │   ├── devops/
│   │   │   │   │   ├── container/
│   │   │   │   │   │   ├── desktop/
│   │   │   │   │   │   │   └── [rancher.md](./markdown/src/notes/engineering/devops/container/desktop/rancher.md)
│   │   │   │   │   │   ├── orchestration/
│   │   │   │   │   │   │   ├── [kubernetes.md](./markdown/src/notes/engineering/devops/container/orchestration/kubernetes.md)
│   │   │   │   │   │   │   └── [nomad.md](./markdown/src/notes/engineering/devops/container/orchestration/nomad.md)
│   │   │   │   │   │   └── runtimes/
│   │   │   │   │   │       ├── [containerd.md](./markdown/src/notes/engineering/devops/container/runtimes/containerd.md)
│   │   │   │   │   │       ├── [docker.md](./markdown/src/notes/engineering/devops/container/runtimes/docker.md)
│   │   │   │   │   │       ├── [hadolint.md](./markdown/src/notes/engineering/devops/container/runtimes/hadolint.md)
│   │   │   │   │   │       └── [podman.md](./markdown/src/notes/engineering/devops/container/runtimes/podman.md)
│   │   │   │   │   ├── delivery/
│   │   │   │   │   │   └── iac/
│   │   │   │   │   │       ├── [aws-cloudformation.md](./markdown/src/notes/engineering/devops/delivery/iac/aws-cloudformation.md)
│   │   │   │   │   │       ├── [open-tofu.md](./markdown/src/notes/engineering/devops/delivery/iac/open-tofu.md)
│   │   │   │   │   │       └── [terraform.md](./markdown/src/notes/engineering/devops/delivery/iac/terraform.md)
│   │   │   │   │   ├── hosting/
│   │   │   │   │   │   ├── baas/
│   │   │   │   │   │   │   ├── [appwrite.md](./markdown/src/notes/engineering/devops/hosting/baas/appwrite.md)
│   │   │   │   │   │   │   ├── [firebase.md](./markdown/src/notes/engineering/devops/hosting/baas/firebase.md)
│   │   │   │   │   │   │   ├── [nhost.md](./markdown/src/notes/engineering/devops/hosting/baas/nhost.md)
│   │   │   │   │   │   │   ├── [pocketbase.md](./markdown/src/notes/engineering/devops/hosting/baas/pocketbase.md)
│   │   │   │   │   │   │   └── [supabase.md](./markdown/src/notes/engineering/devops/hosting/baas/supabase.md)
│   │   │   │   │   │   ├── iaas/
│   │   │   │   │   │   │   ├── [aws.md](./markdown/src/notes/engineering/devops/hosting/iaas/aws.md)
│   │   │   │   │   │   │   ├── [azure.md](./markdown/src/notes/engineering/devops/hosting/iaas/azure.md)
│   │   │   │   │   │   │   ├── [digital-ocean.md](./markdown/src/notes/engineering/devops/hosting/iaas/digital-ocean.md)
│   │   │   │   │   │   │   ├── [google-cloud.md](./markdown/src/notes/engineering/devops/hosting/iaas/google-cloud.md)
│   │   │   │   │   │   │   └── [ibm-cloud.md](./markdown/src/notes/engineering/devops/hosting/iaas/ibm-cloud.md)
│   │   │   │   │   │   ├── paas/
│   │   │   │   │   │   │   ├── [google-app-engine.md](./markdown/src/notes/engineering/devops/hosting/paas/google-app-engine.md)
│   │   │   │   │   │   │   ├── [heroku.md](./markdown/src/notes/engineering/devops/hosting/paas/heroku.md)
│   │   │   │   │   │   │   ├── [open-shift.md](./markdown/src/notes/engineering/devops/hosting/paas/open-shift.md)
│   │   │   │   │   │   │   ├── [railway.md](./markdown/src/notes/engineering/devops/hosting/paas/railway.md)
│   │   │   │   │   │   │   └── [render.md](./markdown/src/notes/engineering/devops/hosting/paas/render.md)
│   │   │   │   │   │   ├── serverless/
│   │   │   │   │   │   │   ├── [cloudflare-workers.md](./markdown/src/notes/engineering/devops/hosting/serverless/cloudflare-workers.md)
│   │   │   │   │   │   │   ├── [deno-deploy.md](./markdown/src/notes/engineering/devops/hosting/serverless/deno-deploy.md)
│   │   │   │   │   │   │   ├── [fly.md](./markdown/src/notes/engineering/devops/hosting/serverless/fly.md)
│   │   │   │   │   │   │   ├── [netlify.md](./markdown/src/notes/engineering/devops/hosting/serverless/netlify.md)
│   │   │   │   │   │   │   └── [vercel.md](./markdown/src/notes/engineering/devops/hosting/serverless/vercel.md)
│   │   │   │   │   │   └── static/
│   │   │   │   │   │       ├── [cloudflare-pages.md](./markdown/src/notes/engineering/devops/hosting/static/cloudflare-pages.md)
│   │   │   │   │   │       └── [github-pages.md](./markdown/src/notes/engineering/devops/hosting/static/github-pages.md)
│   │   │   │   │   ├── observability/
│   │   │   │   │   │   ├── [aws-cloudwatch.md](./markdown/src/notes/engineering/devops/observability/aws-cloudwatch.md)
│   │   │   │   │   │   ├── [datadog.md](./markdown/src/notes/engineering/devops/observability/datadog.md)
│   │   │   │   │   │   ├── [grafana.md](./markdown/src/notes/engineering/devops/observability/grafana.md)
│   │   │   │   │   │   ├── [kibana.md](./markdown/src/notes/engineering/devops/observability/kibana.md)
│   │   │   │   │   │   └── [splunk.md](./markdown/src/notes/engineering/devops/observability/splunk.md)
│   │   │   │   │   └── secrets/
│   │   │   │   │       ├── [aws-secrets-manager.md](./markdown/src/notes/engineering/devops/secrets/aws-secrets-manager.md)
│   │   │   │   │       ├── [azure-key-vault.md](./markdown/src/notes/engineering/devops/secrets/azure-key-vault.md)
│   │   │   │   │       ├── [hashicorp-vault.md](./markdown/src/notes/engineering/devops/secrets/hashicorp-vault.md)
│   │   │   │   │       ├── [infisical.md](./markdown/src/notes/engineering/devops/secrets/infisical.md)
│   │   │   │   │       ├── [kubernetes-secrets.md](./markdown/src/notes/engineering/devops/secrets/kubernetes-secrets.md)
│   │   │   │   │       └── [open-bao.md](./markdown/src/notes/engineering/devops/secrets/open-bao.md)
│   │   │   │   ├── game/
│   │   │   │   │   └── engines/
│   │   │   │   │       ├── [cocos.md](./markdown/src/notes/engineering/game/engines/cocos.md)
│   │   │   │   │       ├── [godot.md](./markdown/src/notes/engineering/game/engines/godot.md)
│   │   │   │   │       ├── [unity.md](./markdown/src/notes/engineering/game/engines/unity.md)
│   │   │   │   │       └── [unreal.md](./markdown/src/notes/engineering/game/engines/unreal.md)
│   │   │   │   ├── hardware/
│   │   │   │   │   ├── chip/
│   │   │   │   │   │   ├── apple/
│   │   │   │   │   │   │   ├── [a-series.md](./markdown/src/notes/engineering/hardware/chip/apple/a-series.md)
│   │   │   │   │   │   │   └── [m-series.md](./markdown/src/notes/engineering/hardware/chip/apple/m-series.md)
│   │   │   │   │   │   └── [snapdragon.md](./markdown/src/notes/engineering/hardware/chip/snapdragon.md)
│   │   │   │   │   ├── microcontroller/
│   │   │   │   │   │   ├── [arduino.md](./markdown/src/notes/engineering/hardware/microcontroller/arduino.md)
│   │   │   │   │   │   ├── [esp32.md](./markdown/src/notes/engineering/hardware/microcontroller/esp32.md)
│   │   │   │   │   │   └── [raspberry-pi-pico.md](./markdown/src/notes/engineering/hardware/microcontroller/raspberry-pi-pico.md)
│   │   │   │   │   ├── tpu/
│   │   │   │   │   │   └── [google.md](./markdown/src/notes/engineering/hardware/tpu/google.md)
│   │   │   │   │   └── [raspberry-pi.md](./markdown/src/notes/engineering/hardware/raspberry-pi.md)
│   │   │   │   ├── languages/
│   │   │   │   │   ├── compiled/
│   │   │   │   │   │   ├── [c.md](./markdown/src/notes/engineering/languages/compiled/c.md)
│   │   │   │   │   │   ├── [cplusplus.md](./markdown/src/notes/engineering/languages/compiled/cplusplus.md)
│   │   │   │   │   │   ├── [go.md](./markdown/src/notes/engineering/languages/compiled/go.md)
│   │   │   │   │   │   └── [rust.md](./markdown/src/notes/engineering/languages/compiled/rust.md)
│   │   │   │   │   ├── data/
│   │   │   │   │   │   ├── [javascript.md](./markdown/src/notes/engineering/languages/data/javascript.md)
│   │   │   │   │   │   ├── [matlab.md](./markdown/src/notes/engineering/languages/data/matlab.md)
│   │   │   │   │   │   ├── [python.md](./markdown/src/notes/engineering/languages/data/python.md)
│   │   │   │   │   │   └── [r.md](./markdown/src/notes/engineering/languages/data/r.md)
│   │   │   │   │   ├── full-stack/
│   │   │   │   │   │   ├── [dart.md](./markdown/src/notes/engineering/languages/full-stack/dart.md)
│   │   │   │   │   │   ├── [php.md](./markdown/src/notes/engineering/languages/full-stack/php.md)
│   │   │   │   │   │   ├── [ruby.md](./markdown/src/notes/engineering/languages/full-stack/ruby.md)
│   │   │   │   │   │   └── [typescript.md](./markdown/src/notes/engineering/languages/full-stack/typescript.md)
│   │   │   │   │   ├── jvm/
│   │   │   │   │   │   ├── [groovy.md](./markdown/src/notes/engineering/languages/jvm/groovy.md)
│   │   │   │   │   │   ├── [java.md](./markdown/src/notes/engineering/languages/jvm/java.md)
│   │   │   │   │   │   ├── [kotlin.md](./markdown/src/notes/engineering/languages/jvm/kotlin.md)
│   │   │   │   │   │   └── [scala.md](./markdown/src/notes/engineering/languages/jvm/scala.md)
│   │   │   │   │   ├── native/
│   │   │   │   │   │   ├── [csharp.md](./markdown/src/notes/engineering/languages/native/csharp.md)
│   │   │   │   │   │   └── [swift.md](./markdown/src/notes/engineering/languages/native/swift.md)
│   │   │   │   │   └── terminal/
│   │   │   │   │       ├── [bash.md](./markdown/src/notes/engineering/languages/terminal/bash.md)
│   │   │   │   │       └── [power-shell.md](./markdown/src/notes/engineering/languages/terminal/power-shell.md)
│   │   │   │   ├── roles/
│   │   │   │   │   ├── delivery/
│   │   │   │   │   │   ├── [release-train-engineer.md](./markdown/src/notes/engineering/roles/delivery/release-train-engineer.md)
│   │   │   │   │   │   └── [scrum-master.md](./markdown/src/notes/engineering/roles/delivery/scrum-master.md)
│   │   │   │   │   ├── engineer/
│   │   │   │   │   │   ├── [distinguished.md](./markdown/src/notes/engineering/roles/engineer/distinguished.md)
│   │   │   │   │   │   ├── [lead.md](./markdown/src/notes/engineering/roles/engineer/lead.md)
│   │   │   │   │   │   ├── [manager.md](./markdown/src/notes/engineering/roles/engineer/manager.md)
│   │   │   │   │   │   └── [principal.md](./markdown/src/notes/engineering/roles/engineer/principal.md)
│   │   │   │   │   ├── product/
│   │   │   │   │   │   ├── [business-analyst.md](./markdown/src/notes/engineering/roles/product/business-analyst.md)
│   │   │   │   │   │   └── [product-owner.md](./markdown/src/notes/engineering/roles/product/product-owner.md)
│   │   │   │   │   └── solution/
│   │   │   │   │       ├── [architect.md](./markdown/src/notes/engineering/roles/solution/architect.md)
│   │   │   │   │       └── [design.md](./markdown/src/notes/engineering/roles/solution/design.md)
│   │   │   │   ├── software/
│   │   │   │   │   ├── backend/
│   │   │   │   │   │   ├── api/
│   │   │   │   │   │   │   ├── protocols/
│   │   │   │   │   │   │   │   ├── [amqp.md](./markdown/src/notes/engineering/software/backend/api/protocols/amqp.md)
│   │   │   │   │   │   │   │   ├── [grpc.md](./markdown/src/notes/engineering/software/backend/api/protocols/grpc.md)
│   │   │   │   │   │   │   │   ├── [https.md](./markdown/src/notes/engineering/software/backend/api/protocols/https.md)
│   │   │   │   │   │   │   │   ├── [mqtt.md](./markdown/src/notes/engineering/software/backend/api/protocols/mqtt.md)
│   │   │   │   │   │   │   │   ├── [tcp.md](./markdown/src/notes/engineering/software/backend/api/protocols/tcp.md)
│   │   │   │   │   │   │   │   ├── [udp.md](./markdown/src/notes/engineering/software/backend/api/protocols/udp.md)
│   │   │   │   │   │   │   │   └── [web-socket.md](./markdown/src/notes/engineering/software/backend/api/protocols/web-socket.md)
│   │   │   │   │   │   │   └── styles/
│   │   │   │   │   │   │       ├── https/
│   │   │   │   │   │   │       │   ├── [graphql.md](./markdown/src/notes/engineering/software/backend/api/styles/https/graphql.md)
│   │   │   │   │   │   │       │   ├── [rest.md](./markdown/src/notes/engineering/software/backend/api/styles/https/rest.md)
│   │   │   │   │   │   │       │   └── [webhook.md](./markdown/src/notes/engineering/software/backend/api/styles/https/webhook.md)
│   │   │   │   │   │   │       └── [rpc.md](./markdown/src/notes/engineering/software/backend/api/styles/rpc.md)
│   │   │   │   │   │   ├── architecture/
│   │   │   │   │   │   │   ├── [cqrs.md](./markdown/src/notes/engineering/software/backend/architecture/cqrs.md)
│   │   │   │   │   │   │   ├── [event-driven.md](./markdown/src/notes/engineering/software/backend/architecture/event-driven.md)
│   │   │   │   │   │   │   ├── [hexagonal.md](./markdown/src/notes/engineering/software/backend/architecture/hexagonal.md)
│   │   │   │   │   │   │   ├── [microservices.md](./markdown/src/notes/engineering/software/backend/architecture/microservices.md)
│   │   │   │   │   │   │   └── [monolith.md](./markdown/src/notes/engineering/software/backend/architecture/monolith.md)
│   │   │   │   │   │   ├── database/
│   │   │   │   │   │   │   ├── hosting/
│   │   │   │   │   │   │   │   ├── [neon.md](./markdown/src/notes/engineering/software/backend/database/hosting/neon.md)
│   │   │   │   │   │   │   │   └── [planet-scale.md](./markdown/src/notes/engineering/software/backend/database/hosting/planet-scale.md)
│   │   │   │   │   │   │   ├── orm/
│   │   │   │   │   │   │   │   ├── python/
│   │   │   │   │   │   │   │   │   └── [sql-alchemy.md](./markdown/src/notes/engineering/software/backend/database/orm/python/sql-alchemy.md)
│   │   │   │   │   │   │   │   └── typescript/
│   │   │   │   │   │   │   │       ├── [drizzle.md](./markdown/src/notes/engineering/software/backend/database/orm/typescript/drizzle.md)
│   │   │   │   │   │   │   │       ├── [mikro-orm.md](./markdown/src/notes/engineering/software/backend/database/orm/typescript/mikro-orm.md)
│   │   │   │   │   │   │   │       ├── [mongoose.md](./markdown/src/notes/engineering/software/backend/database/orm/typescript/mongoose.md)
│   │   │   │   │   │   │   │       ├── [prisma.md](./markdown/src/notes/engineering/software/backend/database/orm/typescript/prisma.md)
│   │   │   │   │   │   │   │       ├── [sequelize.md](./markdown/src/notes/engineering/software/backend/database/orm/typescript/sequelize.md)
│   │   │   │   │   │   │   │       └── [type-orm.md](./markdown/src/notes/engineering/software/backend/database/orm/typescript/type-orm.md)
│   │   │   │   │   │   │   └── paradigms/
│   │   │   │   │   │   │       ├── cache/
│   │   │   │   │   │   │       │   ├── [badger.md](./markdown/src/notes/engineering/software/backend/database/paradigms/cache/badger.md)
│   │   │   │   │   │   │       │   ├── [leveldb.md](./markdown/src/notes/engineering/software/backend/database/paradigms/cache/leveldb.md)
│   │   │   │   │   │   │       │   ├── [memcached.md](./markdown/src/notes/engineering/software/backend/database/paradigms/cache/memcached.md)
│   │   │   │   │   │   │       │   ├── [redis.md](./markdown/src/notes/engineering/software/backend/database/paradigms/cache/redis.md)
│   │   │   │   │   │   │       │   ├── [rocksdb.md](./markdown/src/notes/engineering/software/backend/database/paradigms/cache/rocksdb.md)
│   │   │   │   │   │   │       │   └── [valkey.md](./markdown/src/notes/engineering/software/backend/database/paradigms/cache/valkey.md)
│   │   │   │   │   │   │       ├── graph/
│   │   │   │   │   │   │       │   ├── [dgraph.md](./markdown/src/notes/engineering/software/backend/database/paradigms/graph/dgraph.md)
│   │   │   │   │   │   │       │   └── [neo4j.md](./markdown/src/notes/engineering/software/backend/database/paradigms/graph/neo4j.md)
│   │   │   │   │   │   │       ├── multi/
│   │   │   │   │   │   │       │   └── [fauna.md](./markdown/src/notes/engineering/software/backend/database/paradigms/multi/fauna.md)
│   │   │   │   │   │   │       ├── nosql/
│   │   │   │   │   │   │       │   ├── [couchbase.md](./markdown/src/notes/engineering/software/backend/database/paradigms/nosql/couchbase.md)
│   │   │   │   │   │   │       │   ├── [couchdb.md](./markdown/src/notes/engineering/software/backend/database/paradigms/nosql/couchdb.md)
│   │   │   │   │   │   │       │   ├── [dynamodb.md](./markdown/src/notes/engineering/software/backend/database/paradigms/nosql/dynamodb.md)
│   │   │   │   │   │   │       │   ├── [mongodb.md](./markdown/src/notes/engineering/software/backend/database/paradigms/nosql/mongodb.md)
│   │   │   │   │   │   │       │   └── [rethinkdb.md](./markdown/src/notes/engineering/software/backend/database/paradigms/nosql/rethinkdb.md)
│   │   │   │   │   │   │       ├── search/
│   │   │   │   │   │   │       │   ├── [apache-solr.md](./markdown/src/notes/engineering/software/backend/database/paradigms/search/apache-solr.md)
│   │   │   │   │   │   │       │   ├── [elasticsearch.md](./markdown/src/notes/engineering/software/backend/database/paradigms/search/elasticsearch.md)
│   │   │   │   │   │   │       │   └── [opensearch.md](./markdown/src/notes/engineering/software/backend/database/paradigms/search/opensearch.md)
│   │   │   │   │   │   │       ├── sql/
│   │   │   │   │   │   │       │   ├── [cockroachdb.md](./markdown/src/notes/engineering/software/backend/database/paradigms/sql/cockroachdb.md)
│   │   │   │   │   │   │       │   ├── [libsql.md](./markdown/src/notes/engineering/software/backend/database/paradigms/sql/libsql.md)
│   │   │   │   │   │   │       │   ├── [mariadb.md](./markdown/src/notes/engineering/software/backend/database/paradigms/sql/mariadb.md)
│   │   │   │   │   │   │       │   ├── [mssql.md](./markdown/src/notes/engineering/software/backend/database/paradigms/sql/mssql.md)
│   │   │   │   │   │   │       │   ├── [mysql.md](./markdown/src/notes/engineering/software/backend/database/paradigms/sql/mysql.md)
│   │   │   │   │   │   │       │   ├── [postgresql.md](./markdown/src/notes/engineering/software/backend/database/paradigms/sql/postgresql.md)
│   │   │   │   │   │   │       │   └── [sqlite.md](./markdown/src/notes/engineering/software/backend/database/paradigms/sql/sqlite.md)
│   │   │   │   │   │   │       └── wide-column/
│   │   │   │   │   │   │           ├── [apache-cassandra.md](./markdown/src/notes/engineering/software/backend/database/paradigms/wide-column/apache-cassandra.md)
│   │   │   │   │   │   │           └── [apache-hbase.md](./markdown/src/notes/engineering/software/backend/database/paradigms/wide-column/apache-hbase.md)
│   │   │   │   │   │   ├── events/
│   │   │   │   │   │   │   ├── pub-sub/
│   │   │   │   │   │   │   │   ├── [mqtt.md](./markdown/src/notes/engineering/software/backend/events/pub-sub/mqtt.md)
│   │   │   │   │   │   │   │   └── [nats.md](./markdown/src/notes/engineering/software/backend/events/pub-sub/nats.md)
│   │   │   │   │   │   │   ├── queue/
│   │   │   │   │   │   │   │   ├── [activemq.md](./markdown/src/notes/engineering/software/backend/events/queue/activemq.md)
│   │   │   │   │   │   │   │   └── [rabbitmq.md](./markdown/src/notes/engineering/software/backend/events/queue/rabbitmq.md)
│   │   │   │   │   │   │   └── streaming/
│   │   │   │   │   │   │       ├── [apache-kafka.md](./markdown/src/notes/engineering/software/backend/events/streaming/apache-kafka.md)
│   │   │   │   │   │   │       └── [apache-pulsar.md](./markdown/src/notes/engineering/software/backend/events/streaming/apache-pulsar.md)
│   │   │   │   │   │   ├── languages/
│   │   │   │   │   │   │   ├── csharp/
│   │   │   │   │   │   │   │   └── [dotnet.md](./markdown/src/notes/engineering/software/backend/languages/csharp/dotnet.md)
│   │   │   │   │   │   │   ├── go/
│   │   │   │   │   │   │   │   ├── frameworks/
│   │   │   │   │   │   │   │   │   ├── [beego.md](./markdown/src/notes/engineering/software/backend/languages/go/frameworks/beego.md)
│   │   │   │   │   │   │   │   │   ├── [chi.md](./markdown/src/notes/engineering/software/backend/languages/go/frameworks/chi.md)
│   │   │   │   │   │   │   │   │   ├── [echo.md](./markdown/src/notes/engineering/software/backend/languages/go/frameworks/echo.md)
│   │   │   │   │   │   │   │   │   ├── [gin.md](./markdown/src/notes/engineering/software/backend/languages/go/frameworks/gin.md)
│   │   │   │   │   │   │   │   │   └── [gorilla.md](./markdown/src/notes/engineering/software/backend/languages/go/frameworks/gorilla.md)
│   │   │   │   │   │   │   │   └── graphql/
│   │   │   │   │   │   │   │       └── [graphql-go.md](./markdown/src/notes/engineering/software/backend/languages/go/graphql/graphql-go.md)
│   │   │   │   │   │   │   ├── jvm/
│   │   │   │   │   │   │   │   ├── java/
│   │   │   │   │   │   │   │   │   ├── [helidon.md](./markdown/src/notes/engineering/software/backend/languages/jvm/java/helidon.md)
│   │   │   │   │   │   │   │   │   ├── [javalin.md](./markdown/src/notes/engineering/software/backend/languages/jvm/java/javalin.md)
│   │   │   │   │   │   │   │   │   ├── [micronaut.md](./markdown/src/notes/engineering/software/backend/languages/jvm/java/micronaut.md)
│   │   │   │   │   │   │   │   │   ├── [quarkus.md](./markdown/src/notes/engineering/software/backend/languages/jvm/java/quarkus.md)
│   │   │   │   │   │   │   │   │   └── [spring-boot.md](./markdown/src/notes/engineering/software/backend/languages/jvm/java/spring-boot.md)
│   │   │   │   │   │   │   │   ├── kotlin/
│   │   │   │   │   │   │   │   │   └── [ktor.md](./markdown/src/notes/engineering/software/backend/languages/jvm/kotlin/ktor.md)
│   │   │   │   │   │   │   │   └── scala/
│   │   │   │   │   │   │   │       ├── [akka.md](./markdown/src/notes/engineering/software/backend/languages/jvm/scala/akka.md)
│   │   │   │   │   │   │   │       ├── [http4s.md](./markdown/src/notes/engineering/software/backend/languages/jvm/scala/http4s.md)
│   │   │   │   │   │   │   │       └── [play.md](./markdown/src/notes/engineering/software/backend/languages/jvm/scala/play.md)
│   │   │   │   │   │   │   ├── php/
│   │   │   │   │   │   │   │   └── [laravel.md](./markdown/src/notes/engineering/software/backend/languages/php/laravel.md)
│   │   │   │   │   │   │   ├── python/
│   │   │   │   │   │   │   │   ├── [fastapi.md](./markdown/src/notes/engineering/software/backend/languages/python/fastapi.md)
│   │   │   │   │   │   │   │   ├── [flask.md](./markdown/src/notes/engineering/software/backend/languages/python/flask.md)
│   │   │   │   │   │   │   │   ├── [pyramid.md](./markdown/src/notes/engineering/software/backend/languages/python/pyramid.md)
│   │   │   │   │   │   │   │   └── [tonardo.md](./markdown/src/notes/engineering/software/backend/languages/python/tonardo.md)
│   │   │   │   │   │   │   ├── ruby/
│   │   │   │   │   │   │   │   └── [rails.md](./markdown/src/notes/engineering/software/backend/languages/ruby/rails.md)
│   │   │   │   │   │   │   ├── rust/
│   │   │   │   │   │   │   │   ├── [actix.md](./markdown/src/notes/engineering/software/backend/languages/rust/actix.md)
│   │   │   │   │   │   │   │   ├── [gotham.md](./markdown/src/notes/engineering/software/backend/languages/rust/gotham.md)
│   │   │   │   │   │   │   │   ├── [hyper.md](./markdown/src/notes/engineering/software/backend/languages/rust/hyper.md)
│   │   │   │   │   │   │   │   ├── [rocket.md](./markdown/src/notes/engineering/software/backend/languages/rust/rocket.md)
│   │   │   │   │   │   │   │   └── [wrap.md](./markdown/src/notes/engineering/software/backend/languages/rust/wrap.md)
│   │   │   │   │   │   │   └── typescript/
│   │   │   │   │   │   │       ├── frameworks/
│   │   │   │   │   │   │       │   ├── [express.js.md](./markdown/src/notes/engineering/software/backend/languages/typescript/frameworks/express.js.md)
│   │   │   │   │   │   │       │   ├── [fastify.js.md](./markdown/src/notes/engineering/software/backend/languages/typescript/frameworks/fastify.js.md)
│   │   │   │   │   │   │       │   ├── [hapi.js.md](./markdown/src/notes/engineering/software/backend/languages/typescript/frameworks/hapi.js.md)
│   │   │   │   │   │   │       │   ├── [hono.js.md](./markdown/src/notes/engineering/software/backend/languages/typescript/frameworks/hono.js.md)
│   │   │   │   │   │   │       │   ├── [koa.js.md](./markdown/src/notes/engineering/software/backend/languages/typescript/frameworks/koa.js.md)
│   │   │   │   │   │   │       │   └── [nest.js.md](./markdown/src/notes/engineering/software/backend/languages/typescript/frameworks/nest.js.md)
│   │   │   │   │   │   │       ├── graphql/
│   │   │   │   │   │   │       │   ├── [apollo-server.md](./markdown/src/notes/engineering/software/backend/languages/typescript/graphql/apollo-server.md)
│   │   │   │   │   │   │       │   ├── [garph.md](./markdown/src/notes/engineering/software/backend/languages/typescript/graphql/garph.md)
│   │   │   │   │   │   │       │   ├── [mercurius.md](./markdown/src/notes/engineering/software/backend/languages/typescript/graphql/mercurius.md)
│   │   │   │   │   │   │       │   └── [yoga.md](./markdown/src/notes/engineering/software/backend/languages/typescript/graphql/yoga.md)
│   │   │   │   │   │   │       ├── native/
│   │   │   │   │   │   │       │   ├── [bun.http.md](./markdown/src/notes/engineering/software/backend/languages/typescript/native/bun.http.md)
│   │   │   │   │   │   │       │   ├── [deno.http.md](./markdown/src/notes/engineering/software/backend/languages/typescript/native/deno.http.md)
│   │   │   │   │   │   │       │   └── [node.http.md](./markdown/src/notes/engineering/software/backend/languages/typescript/native/node.http.md)
│   │   │   │   │   │   │       └── web-socket/
│   │   │   │   │   │   │           ├── [sock.js.md](./markdown/src/notes/engineering/software/backend/languages/typescript/web-socket/sock.js.md)
│   │   │   │   │   │   │           ├── [socket.io.md](./markdown/src/notes/engineering/software/backend/languages/typescript/web-socket/socket.io.md)
│   │   │   │   │   │   │           └── [ws.md](./markdown/src/notes/engineering/software/backend/languages/typescript/web-socket/ws.md)
│   │   │   │   │   │   └── security/
│   │   │   │   │   │       ├── [jwt.md](./markdown/src/notes/engineering/software/backend/security/jwt.md)
│   │   │   │   │   │       ├── [oauth2.md](./markdown/src/notes/engineering/software/backend/security/oauth2.md)
│   │   │   │   │   │       └── [oidc.md](./markdown/src/notes/engineering/software/backend/security/oidc.md)
│   │   │   │   │   ├── cli/
│   │   │   │   │   │   ├── go/
│   │   │   │   │   │   │   └── [cobra.md](./markdown/src/notes/engineering/software/cli/go/cobra.md)
│   │   │   │   │   │   ├── python/
│   │   │   │   │   │   │   ├── [argparse.md](./markdown/src/notes/engineering/software/cli/python/argparse.md)
│   │   │   │   │   │   │   └── [click.md](./markdown/src/notes/engineering/software/cli/python/click.md)
│   │   │   │   │   │   ├── rust/
│   │   │   │   │   │   │   ├── [argh.md](./markdown/src/notes/engineering/software/cli/rust/argh.md)
│   │   │   │   │   │   │   └── [clap.md](./markdown/src/notes/engineering/software/cli/rust/clap.md)
│   │   │   │   │   │   └── typescript/
│   │   │   │   │   │       ├── [commander.md](./markdown/src/notes/engineering/software/cli/typescript/commander.md)
│   │   │   │   │   │       ├── [oclif.md](./markdown/src/notes/engineering/software/cli/typescript/oclif.md)
│   │   │   │   │   │       └── [yargs.md](./markdown/src/notes/engineering/software/cli/typescript/yargs.md)
│   │   │   │   │   ├── frontend/
│   │   │   │   │   │   ├── bff/
│   │   │   │   │   │   │   ├── [graphql.md](./markdown/src/notes/engineering/software/frontend/bff/graphql.md)
│   │   │   │   │   │   │   └── [trpc.md](./markdown/src/notes/engineering/software/frontend/bff/trpc.md)
│   │   │   │   │   │   ├── hybrid/
│   │   │   │   │   │   │   ├── desktop/
│   │   │   │   │   │   │   │   ├── [electron.md](./markdown/src/notes/engineering/software/frontend/hybrid/desktop/electron.md)
│   │   │   │   │   │   │   │   ├── [tauri.md](./markdown/src/notes/engineering/software/frontend/hybrid/desktop/tauri.md)
│   │   │   │   │   │   │   │   └── [wails.md](./markdown/src/notes/engineering/software/frontend/hybrid/desktop/wails.md)
│   │   │   │   │   │   │   ├── mobile/
│   │   │   │   │   │   │   │   ├── frameworks/
│   │   │   │   │   │   │   │   │   ├── [capacitor.js.md](./markdown/src/notes/engineering/software/frontend/hybrid/mobile/frameworks/capacitor.js.md)
│   │   │   │   │   │   │   │   │   ├── [expo.md](./markdown/src/notes/engineering/software/frontend/hybrid/mobile/frameworks/expo.md)
│   │   │   │   │   │   │   │   │   ├── [ionic.md](./markdown/src/notes/engineering/software/frontend/hybrid/mobile/frameworks/ionic.md)
│   │   │   │   │   │   │   │   │   ├── [lynx.md](./markdown/src/notes/engineering/software/frontend/hybrid/mobile/frameworks/lynx.md)
│   │   │   │   │   │   │   │   │   ├── [native-script.md](./markdown/src/notes/engineering/software/frontend/hybrid/mobile/frameworks/native-script.md)
│   │   │   │   │   │   │   │   │   ├── [react-native.md](./markdown/src/notes/engineering/software/frontend/hybrid/mobile/frameworks/react-native.md)
│   │   │   │   │   │   │   │   │   └── [svelte-native.md](./markdown/src/notes/engineering/software/frontend/hybrid/mobile/frameworks/svelte-native.md)
│   │   │   │   │   │   │   │   └── styling/
│   │   │   │   │   │   │   │       └── [nativewind.md](./markdown/src/notes/engineering/software/frontend/hybrid/mobile/styling/nativewind.md)
│   │   │   │   │   │   │   ├── multi/
│   │   │   │   │   │   │   │   ├── [meteor.md](./markdown/src/notes/engineering/software/frontend/hybrid/multi/meteor.md)
│   │   │   │   │   │   │   │   └── [quasar.md](./markdown/src/notes/engineering/software/frontend/hybrid/multi/quasar.md)
│   │   │   │   │   │   │   └── [flutter.md](./markdown/src/notes/engineering/software/frontend/hybrid/flutter.md)
│   │   │   │   │   │   ├── native/
│   │   │   │   │   │   │   ├── desktop/
│   │   │   │   │   │   │   │   ├── linux/
│   │   │   │   │   │   │   │   │   ├── [alpine-linux.md](./markdown/src/notes/engineering/software/frontend/native/desktop/linux/alpine-linux.md)
│   │   │   │   │   │   │   │   │   ├── [arch-linux.md](./markdown/src/notes/engineering/software/frontend/native/desktop/linux/arch-linux.md)
│   │   │   │   │   │   │   │   │   ├── [chromeos.md](./markdown/src/notes/engineering/software/frontend/native/desktop/linux/chromeos.md)
│   │   │   │   │   │   │   │   │   ├── [debian.md](./markdown/src/notes/engineering/software/frontend/native/desktop/linux/debian.md)
│   │   │   │   │   │   │   │   │   ├── [fedora.md](./markdown/src/notes/engineering/software/frontend/native/desktop/linux/fedora.md)
│   │   │   │   │   │   │   │   │   ├── [freebsd.md](./markdown/src/notes/engineering/software/frontend/native/desktop/linux/freebsd.md)
│   │   │   │   │   │   │   │   │   ├── [kali.md](./markdown/src/notes/engineering/software/frontend/native/desktop/linux/kali.md)
│   │   │   │   │   │   │   │   │   ├── [kernel.md](./markdown/src/notes/engineering/software/frontend/native/desktop/linux/kernel.md)
│   │   │   │   │   │   │   │   │   ├── [linux.md](./markdown/src/notes/engineering/software/frontend/native/desktop/linux/linux.md)
│   │   │   │   │   │   │   │   │   ├── [mint.md](./markdown/src/notes/engineering/software/frontend/native/desktop/linux/mint.md)
│   │   │   │   │   │   │   │   │   ├── [red-hat-enterprise-linux.md](./markdown/src/notes/engineering/software/frontend/native/desktop/linux/red-hat-enterprise-linux.md)
│   │   │   │   │   │   │   │   │   └── [ubuntu.md](./markdown/src/notes/engineering/software/frontend/native/desktop/linux/ubuntu.md)
│   │   │   │   │   │   │   │   ├── [macos.md](./markdown/src/notes/engineering/software/frontend/native/desktop/macos.md)
│   │   │   │   │   │   │   │   └── [windows.md](./markdown/src/notes/engineering/software/frontend/native/desktop/windows.md)
│   │   │   │   │   │   │   └── mobile/
│   │   │   │   │   │   │       ├── operating-systems/
│   │   │   │   │   │   │       │   ├── [android.md](./markdown/src/notes/engineering/software/frontend/native/mobile/operating-systems/android.md)
│   │   │   │   │   │   │       │   ├── [harmonyos.md](./markdown/src/notes/engineering/software/frontend/native/mobile/operating-systems/harmonyos.md)
│   │   │   │   │   │   │       │   ├── [ios.md](./markdown/src/notes/engineering/software/frontend/native/mobile/operating-systems/ios.md)
│   │   │   │   │   │   │       │   ├── [kaios.md](./markdown/src/notes/engineering/software/frontend/native/mobile/operating-systems/kaios.md)
│   │   │   │   │   │   │       │   └── [ubuntu-touch.md](./markdown/src/notes/engineering/software/frontend/native/mobile/operating-systems/ubuntu-touch.md)
│   │   │   │   │   │   │       └── styling/
│   │   │   │   │   │   │           ├── [material3.md](./markdown/src/notes/engineering/software/frontend/native/mobile/styling/material3.md)
│   │   │   │   │   │   │           └── [swift-ui.md](./markdown/src/notes/engineering/software/frontend/native/mobile/styling/swift-ui.md)
│   │   │   │   │   │   └── web/
│   │   │   │   │   │       ├── authentication/
│   │   │   │   │   │       │   ├── [auth.js.md](./markdown/src/notes/engineering/software/frontend/web/authentication/auth.js.md)
│   │   │   │   │   │       │   └── [better-auth.md](./markdown/src/notes/engineering/software/frontend/web/authentication/better-auth.md)
│   │   │   │   │   │       ├── build-tools/
│   │   │   │   │   │       │   ├── bundler/
│   │   │   │   │   │       │   │   ├── [esbuild.md](./markdown/src/notes/engineering/software/frontend/web/build-tools/bundler/esbuild.md)
│   │   │   │   │   │       │   │   ├── [parcel.js.md](./markdown/src/notes/engineering/software/frontend/web/build-tools/bundler/parcel.js.md)
│   │   │   │   │   │       │   │   ├── [rollup.js.md](./markdown/src/notes/engineering/software/frontend/web/build-tools/bundler/rollup.js.md)
│   │   │   │   │   │       │   │   ├── [rspack.md](./markdown/src/notes/engineering/software/frontend/web/build-tools/bundler/rspack.md)
│   │   │   │   │   │       │   │   └── [webpack.js.md](./markdown/src/notes/engineering/software/frontend/web/build-tools/bundler/webpack.js.md)
│   │   │   │   │   │       │   ├── compiler/
│   │   │   │   │   │       │   │   ├── [babel.js.md](./markdown/src/notes/engineering/software/frontend/web/build-tools/compiler/babel.js.md)
│   │   │   │   │   │       │   │   └── [swc.md](./markdown/src/notes/engineering/software/frontend/web/build-tools/compiler/swc.md)
│   │   │   │   │   │       │   ├── [storybook.md](./markdown/src/notes/engineering/software/frontend/web/build-tools/storybook.md)
│   │   │   │   │   │       │   └── [vite.md](./markdown/src/notes/engineering/software/frontend/web/build-tools/vite.md)
│   │   │   │   │   │       ├── charts/
│   │   │   │   │   │       │   ├── [chart.js.md](./markdown/src/notes/engineering/software/frontend/web/charts/chart.js.md)
│   │   │   │   │   │       │   ├── [chartist.md](./markdown/src/notes/engineering/software/frontend/web/charts/chartist.md)
│   │   │   │   │   │       │   ├── [d3.js.md](./markdown/src/notes/engineering/software/frontend/web/charts/d3.js.md)
│   │   │   │   │   │       │   ├── [google-charts.md](./markdown/src/notes/engineering/software/frontend/web/charts/google-charts.md)
│   │   │   │   │   │       │   ├── [highcharts.md](./markdown/src/notes/engineering/software/frontend/web/charts/highcharts.md)
│   │   │   │   │   │       │   ├── [plotly.md](./markdown/src/notes/engineering/software/frontend/web/charts/plotly.md)
│   │   │   │   │   │       │   ├── [recharts.md](./markdown/src/notes/engineering/software/frontend/web/charts/recharts.md)
│   │   │   │   │   │       │   └── [tanstack-charts.md](./markdown/src/notes/engineering/software/frontend/web/charts/tanstack-charts.md)
│   │   │   │   │   │       ├── frameworks/
│   │   │   │   │   │       │   ├── csr/
│   │   │   │   │   │       │   │   ├── jsx/
│   │   │   │   │   │       │   │   │   ├── [preact.md](./markdown/src/notes/engineering/software/frontend/web/frameworks/csr/jsx/preact.md)
│   │   │   │   │   │       │   │   │   ├── [qwik.md](./markdown/src/notes/engineering/software/frontend/web/frameworks/csr/jsx/qwik.md)
│   │   │   │   │   │       │   │   │   ├── [react.md](./markdown/src/notes/engineering/software/frontend/web/frameworks/csr/jsx/react.md)
│   │   │   │   │   │       │   │   │   └── [solid.md](./markdown/src/notes/engineering/software/frontend/web/frameworks/csr/jsx/solid.md)
│   │   │   │   │   │       │   │   ├── [angular.js.md](./markdown/src/notes/engineering/software/frontend/web/frameworks/csr/angular.js.md)
│   │   │   │   │   │       │   │   ├── [angular.md](./markdown/src/notes/engineering/software/frontend/web/frameworks/csr/angular.md)
│   │   │   │   │   │       │   │   ├── [backbone.md](./markdown/src/notes/engineering/software/frontend/web/frameworks/csr/backbone.md)
│   │   │   │   │   │       │   │   ├── [ember.md](./markdown/src/notes/engineering/software/frontend/web/frameworks/csr/ember.md)
│   │   │   │   │   │       │   │   ├── [svelte.md](./markdown/src/notes/engineering/software/frontend/web/frameworks/csr/svelte.md)
│   │   │   │   │   │       │   │   └── [vue.md](./markdown/src/notes/engineering/software/frontend/web/frameworks/csr/vue.md)
│   │   │   │   │   │       │   ├── ssg/
│   │   │   │   │   │       │   │   ├── [astro.md](./markdown/src/notes/engineering/software/frontend/web/frameworks/ssg/astro.md)
│   │   │   │   │   │       │   │   ├── [gatsby.md](./markdown/src/notes/engineering/software/frontend/web/frameworks/ssg/gatsby.md)
│   │   │   │   │   │       │   │   └── [vuepress.md](./markdown/src/notes/engineering/software/frontend/web/frameworks/ssg/vuepress.md)
│   │   │   │   │   │       │   └── ssr/
│   │   │   │   │   │       │       ├── [angular-ssr.md](./markdown/src/notes/engineering/software/frontend/web/frameworks/ssr/angular-ssr.md)
│   │   │   │   │   │       │       ├── [htmx.md](./markdown/src/notes/engineering/software/frontend/web/frameworks/ssr/htmx.md)
│   │   │   │   │   │       │       ├── [next.md](./markdown/src/notes/engineering/software/frontend/web/frameworks/ssr/next.md)
│   │   │   │   │   │       │       ├── [nuxt.md](./markdown/src/notes/engineering/software/frontend/web/frameworks/ssr/nuxt.md)
│   │   │   │   │   │       │       ├── [remix.md](./markdown/src/notes/engineering/software/frontend/web/frameworks/ssr/remix.md)
│   │   │   │   │   │       │       ├── [solid-start.md](./markdown/src/notes/engineering/software/frontend/web/frameworks/ssr/solid-start.md)
│   │   │   │   │   │       │       └── [svelte-kit.md](./markdown/src/notes/engineering/software/frontend/web/frameworks/ssr/svelte-kit.md)
│   │   │   │   │   │       ├── query/
│   │   │   │   │   │       │   ├── [apollo-client.md](./markdown/src/notes/engineering/software/frontend/web/query/apollo-client.md)
│   │   │   │   │   │       │   ├── [axios.md](./markdown/src/notes/engineering/software/frontend/web/query/axios.md)
│   │   │   │   │   │       │   ├── [swr.md](./markdown/src/notes/engineering/software/frontend/web/query/swr.md)
│   │   │   │   │   │       │   └── [tanstack-query.md](./markdown/src/notes/engineering/software/frontend/web/query/tanstack-query.md)
│   │   │   │   │   │       ├── state-management/
│   │   │   │   │   │       │   ├── [jotai.md](./markdown/src/notes/engineering/software/frontend/web/state-management/jotai.md)
│   │   │   │   │   │       │   ├── [nano-stores.md](./markdown/src/notes/engineering/software/frontend/web/state-management/nano-stores.md)
│   │   │   │   │   │       │   ├── [redux.md](./markdown/src/notes/engineering/software/frontend/web/state-management/redux.md)
│   │   │   │   │   │       │   ├── [xstate.md](./markdown/src/notes/engineering/software/frontend/web/state-management/xstate.md)
│   │   │   │   │   │       │   └── [zustand.md](./markdown/src/notes/engineering/software/frontend/web/state-management/zustand.md)
│   │   │   │   │   │       ├── styling/
│   │   │   │   │   │       │   ├── css-in-js/
│   │   │   │   │   │       │   │   ├── [emotion.md](./markdown/src/notes/engineering/software/frontend/web/styling/css-in-js/emotion.md)
│   │   │   │   │   │       │   │   ├── [styled-components.md](./markdown/src/notes/engineering/software/frontend/web/styling/css-in-js/styled-components.md)
│   │   │   │   │   │       │   │   └── [stylex.md](./markdown/src/notes/engineering/software/frontend/web/styling/css-in-js/stylex.md)
│   │   │   │   │   │       │   ├── css-preprocessor/
│   │   │   │   │   │       │   │   ├── [less.md](./markdown/src/notes/engineering/software/frontend/web/styling/css-preprocessor/less.md)
│   │   │   │   │   │       │   │   └── [sass.md](./markdown/src/notes/engineering/software/frontend/web/styling/css-preprocessor/sass.md)
│   │   │   │   │   │       │   ├── css-tooling/
│   │   │   │   │   │       │   │   ├── [postcss.md](./markdown/src/notes/engineering/software/frontend/web/styling/css-tooling/postcss.md)
│   │   │   │   │   │       │   │   └── [stylelint.md](./markdown/src/notes/engineering/software/frontend/web/styling/css-tooling/stylelint.md)
│   │   │   │   │   │       │   ├── css-utilities/
│   │   │   │   │   │       │   │   ├── [tailwindcss.md](./markdown/src/notes/engineering/software/frontend/web/styling/css-utilities/tailwindcss.md)
│   │   │   │   │   │       │   │   └── [unocss.md](./markdown/src/notes/engineering/software/frontend/web/styling/css-utilities/unocss.md)
│   │   │   │   │   │       │   └── ui-components/
│   │   │   │   │   │       │       ├── css/
│   │   │   │   │   │       │       │   ├── [bootstrap.md](./markdown/src/notes/engineering/software/frontend/web/styling/ui-components/css/bootstrap.md)
│   │   │   │   │   │       │       │   ├── [bulma.md](./markdown/src/notes/engineering/software/frontend/web/styling/ui-components/css/bulma.md)
│   │   │   │   │   │       │       │   ├── [daisyui.md](./markdown/src/notes/engineering/software/frontend/web/styling/ui-components/css/daisyui.md)
│   │   │   │   │   │       │       │   ├── [materializecss.md](./markdown/src/notes/engineering/software/frontend/web/styling/ui-components/css/materializecss.md)
│   │   │   │   │   │       │       │   ├── [tailwindcss-plus.md](./markdown/src/notes/engineering/software/frontend/web/styling/ui-components/css/tailwindcss-plus.md)
│   │   │   │   │   │       │       │   └── [uikit.md](./markdown/src/notes/engineering/software/frontend/web/styling/ui-components/css/uikit.md)
│   │   │   │   │   │       │       └── react/
│   │   │   │   │   │       │           ├── [ant-design.md](./markdown/src/notes/engineering/software/frontend/web/styling/ui-components/react/ant-design.md)
│   │   │   │   │   │       │           ├── [charka-ui.md](./markdown/src/notes/engineering/software/frontend/web/styling/ui-components/react/charka-ui.md)
│   │   │   │   │   │       │           ├── [hero-ui.md](./markdown/src/notes/engineering/software/frontend/web/styling/ui-components/react/hero-ui.md)
│   │   │   │   │   │       │           ├── [mui.md](./markdown/src/notes/engineering/software/frontend/web/styling/ui-components/react/mui.md)
│   │   │   │   │   │       │           ├── [shadcn-ui.md](./markdown/src/notes/engineering/software/frontend/web/styling/ui-components/react/shadcn-ui.md)
│   │   │   │   │   │       │           └── [theme-ui.md](./markdown/src/notes/engineering/software/frontend/web/styling/ui-components/react/theme-ui.md)
│   │   │   │   │   │       └── testing/
│   │   │   │   │   │           ├── e2e/
│   │   │   │   │   │           │   ├── [cypress.md](./markdown/src/notes/engineering/software/frontend/web/testing/e2e/cypress.md)
│   │   │   │   │   │           │   ├── [karma.md](./markdown/src/notes/engineering/software/frontend/web/testing/e2e/karma.md)
│   │   │   │   │   │           │   ├── [playwright.md](./markdown/src/notes/engineering/software/frontend/web/testing/e2e/playwright.md)
│   │   │   │   │   │           │   ├── [puppeteer.md](./markdown/src/notes/engineering/software/frontend/web/testing/e2e/puppeteer.md)
│   │   │   │   │   │           │   └── [selenium.md](./markdown/src/notes/engineering/software/frontend/web/testing/e2e/selenium.md)
│   │   │   │   │   │           └── unit/
│   │   │   │   │   │               ├── [jasmine.js.md](./markdown/src/notes/engineering/software/frontend/web/testing/unit/jasmine.js.md)
│   │   │   │   │   │               ├── [jest.js.md](./markdown/src/notes/engineering/software/frontend/web/testing/unit/jest.js.md)
│   │   │   │   │   │               ├── [mocha.js.md](./markdown/src/notes/engineering/software/frontend/web/testing/unit/mocha.js.md)
│   │   │   │   │   │               ├── [testing-library.md](./markdown/src/notes/engineering/software/frontend/web/testing/unit/testing-library.md)
│   │   │   │   │   │               └── [vitest.md](./markdown/src/notes/engineering/software/frontend/web/testing/unit/vitest.md)
│   │   │   │   │   └── services/
│   │   │   │   │       ├── auth/
│   │   │   │   │       │   ├── [auth0.md](./markdown/src/notes/engineering/software/services/auth/auth0.md)
│   │   │   │   │       │   ├── [clerk.md](./markdown/src/notes/engineering/software/services/auth/clerk.md)
│   │   │   │   │       │   ├── [keycloak.md](./markdown/src/notes/engineering/software/services/auth/keycloak.md)
│   │   │   │   │       │   ├── [okta.md](./markdown/src/notes/engineering/software/services/auth/okta.md)
│   │   │   │   │       │   ├── [one-login.md](./markdown/src/notes/engineering/software/services/auth/one-login.md)
│   │   │   │   │       │   ├── [osso.md](./markdown/src/notes/engineering/software/services/auth/osso.md)
│   │   │   │   │       │   └── [zitadel.md](./markdown/src/notes/engineering/software/services/auth/zitadel.md)
│   │   │   │   │       ├── email/
│   │   │   │   │       │   ├── [mail-gun.md](./markdown/src/notes/engineering/software/services/email/mail-gun.md)
│   │   │   │   │       │   ├── [mailchimp.md](./markdown/src/notes/engineering/software/services/email/mailchimp.md)
│   │   │   │   │       │   ├── [postmark.md](./markdown/src/notes/engineering/software/services/email/postmark.md)
│   │   │   │   │       │   ├── [resend.md](./markdown/src/notes/engineering/software/services/email/resend.md)
│   │   │   │   │       │   └── [send-grid.md](./markdown/src/notes/engineering/software/services/email/send-grid.md)
│   │   │   │   │       └── payment/
│   │   │   │   │           ├── [braintree.md](./markdown/src/notes/engineering/software/services/payment/braintree.md)
│   │   │   │   │           ├── [dodopayments.md](./markdown/src/notes/engineering/software/services/payment/dodopayments.md)
│   │   │   │   │           ├── [klarna.md](./markdown/src/notes/engineering/software/services/payment/klarna.md)
│   │   │   │   │           ├── [lemonsqueezy.md](./markdown/src/notes/engineering/software/services/payment/lemonsqueezy.md)
│   │   │   │   │           ├── [paddle.md](./markdown/src/notes/engineering/software/services/payment/paddle.md)
│   │   │   │   │           ├── [paypal.md](./markdown/src/notes/engineering/software/services/payment/paypal.md)
│   │   │   │   │           ├── [polar.md](./markdown/src/notes/engineering/software/services/payment/polar.md)
│   │   │   │   │           ├── [revenuecat.md](./markdown/src/notes/engineering/software/services/payment/revenuecat.md)
│   │   │   │   │           ├── [square.md](./markdown/src/notes/engineering/software/services/payment/square.md)
│   │   │   │   │           └── [stripe.md](./markdown/src/notes/engineering/software/services/payment/stripe.md)
│   │   │   │   ├── [agents.md](./markdown/src/notes/engineering/agents.md)
│   │   │   │   ├── [ai.md](./markdown/src/notes/engineering/ai.md)
│   │   │   │   ├── [algorithms.md](./markdown/src/notes/engineering/algorithms.md)
│   │   │   │   ├── [api.md](./markdown/src/notes/engineering/api.md)
│   │   │   │   ├── [back-end.md](./markdown/src/notes/engineering/back-end.md)
│   │   │   │   ├── [blockchain.md](./markdown/src/notes/engineering/blockchain.md)
│   │   │   │   ├── [browsers.md](./markdown/src/notes/engineering/browsers.md)
│   │   │   │   ├── [c.md](./markdown/src/notes/engineering/c.md)
│   │   │   │   ├── [cli.md](./markdown/src/notes/engineering/cli.md)
│   │   │   │   ├── [data-structures-and-algorithms.md](./markdown/src/notes/engineering/data-structures-and-algorithms.md)
│   │   │   │   ├── [data-structures.md](./markdown/src/notes/engineering/data-structures.md)
│   │   │   │   ├── [databases.md](./markdown/src/notes/engineering/databases.md)
│   │   │   │   ├── [design.md](./markdown/src/notes/engineering/design.md)
│   │   │   │   ├── [foss.md](./markdown/src/notes/engineering/foss.md)
│   │   │   │   ├── [front-end.md](./markdown/src/notes/engineering/front-end.md)
│   │   │   │   ├── [game-engines.md](./markdown/src/notes/engineering/game-engines.md)
│   │   │   │   ├── [go.md](./markdown/src/notes/engineering/go.md)
│   │   │   │   ├── [hosting.md](./markdown/src/notes/engineering/hosting.md)
│   │   │   │   ├── [ide.md](./markdown/src/notes/engineering/ide.md)
│   │   │   │   ├── [java.md](./markdown/src/notes/engineering/java.md)
│   │   │   │   ├── [javascript.md](./markdown/src/notes/engineering/javascript.md)
│   │   │   │   ├── [kotlin.md](./markdown/src/notes/engineering/kotlin.md)
│   │   │   │   ├── [languages.md](./markdown/src/notes/engineering/languages.md)
│   │   │   │   ├── [llm.md](./markdown/src/notes/engineering/llm.md)
│   │   │   │   ├── [messaging.md](./markdown/src/notes/engineering/messaging.md)
│   │   │   │   ├── [os.md](./markdown/src/notes/engineering/os.md)
│   │   │   │   ├── [python.md](./markdown/src/notes/engineering/python.md)
│   │   │   │   ├── [rust.md](./markdown/src/notes/engineering/rust.md)
│   │   │   │   ├── [swift.md](./markdown/src/notes/engineering/swift.md)
│   │   │   │   ├── [system-design.md](./markdown/src/notes/engineering/system-design.md)
│   │   │   │   ├── [technology.md](./markdown/src/notes/engineering/technology.md)
│   │   │   │   ├── [techstack.md](./markdown/src/notes/engineering/techstack.md)
│   │   │   │   ├── [ui-components.md](./markdown/src/notes/engineering/ui-components.md)
│   │   │   │   └── [workspaces.md](./markdown/src/notes/engineering/workspaces.md)
│   │   │   ├── games/
│   │   │   │   ├── [board-go.md](./markdown/src/notes/games/board-go.md)
│   │   │   │   ├── [checker.md](./markdown/src/notes/games/checker.md)
│   │   │   │   ├── [chess.md](./markdown/src/notes/games/chess.md)
│   │   │   │   ├── [dota.md](./markdown/src/notes/games/dota.md)
│   │   │   │   ├── [e-sports.md](./markdown/src/notes/games/e-sports.md)
│   │   │   │   ├── [games.md](./markdown/src/notes/games/games.md)
│   │   │   │   ├── [gaming-consoles.md](./markdown/src/notes/games/gaming-consoles.md)
│   │   │   │   ├── [league-of-legends.md](./markdown/src/notes/games/league-of-legends.md)
│   │   │   │   ├── [shogi.md](./markdown/src/notes/games/shogi.md)
│   │   │   │   └── [xiangqi.md](./markdown/src/notes/games/xiangqi.md)
│   │   │   ├── geography/
│   │   │   │   ├── [cities.md](./markdown/src/notes/geography/cities.md)
│   │   │   │   └── [geography.md](./markdown/src/notes/geography/geography.md)
│   │   │   ├── humanities/
│   │   │   │   ├── [books.md](./markdown/src/notes/humanities/books.md)
│   │   │   │   ├── [grammy.md](./markdown/src/notes/humanities/grammy.md)
│   │   │   │   ├── [humanity-languages.md](./markdown/src/notes/humanities/humanity-languages.md)
│   │   │   │   ├── [humanity.md](./markdown/src/notes/humanities/humanity.md)
│   │   │   │   ├── [languages-languages.md](./markdown/src/notes/humanities/languages-languages.md)
│   │   │   │   ├── [literature.md](./markdown/src/notes/humanities/literature.md)
│   │   │   │   ├── [news.md](./markdown/src/notes/humanities/news.md)
│   │   │   │   ├── [nobel.md](./markdown/src/notes/humanities/nobel.md)
│   │   │   │   └── [random-research.md](./markdown/src/notes/humanities/random-research.md)
│   │   │   ├── life/
│   │   │   │   ├── [bored.md](./markdown/src/notes/life/bored.md)
│   │   │   │   ├── [degrees.md](./markdown/src/notes/life/degrees.md)
│   │   │   │   ├── [education.md](./markdown/src/notes/life/education.md)
│   │   │   │   ├── [f&b.md](./markdown/src/notes/life/f&b.md)
│   │   │   │   ├── [maslow-hierarchy.md](./markdown/src/notes/life/maslow-hierarchy.md)
│   │   │   │   ├── [minimalism.md](./markdown/src/notes/life/minimalism.md)
│   │   │   │   ├── [monday-fear.md](./markdown/src/notes/life/monday-fear.md)
│   │   │   │   ├── [negative-thoughts.md](./markdown/src/notes/life/negative-thoughts.md)
│   │   │   │   ├── [nothing.md](./markdown/src/notes/life/nothing.md)
│   │   │   │   ├── [resolutions.md](./markdown/src/notes/life/resolutions.md)
│   │   │   │   ├── [sample.md](./markdown/src/notes/life/sample.md)
│   │   │   │   └── [university.md](./markdown/src/notes/life/university.md)
│   │   │   ├── marketing/
│   │   │   │   ├── copy-writer/
│   │   │   │   │   ├── commerce/
│   │   │   │   │   │   ├── [gumroad.md](./markdown/src/notes/marketing/copy-writer/commerce/gumroad.md)
│   │   │   │   │   │   └── [shopify.md](./markdown/src/notes/marketing/copy-writer/commerce/shopify.md)
│   │   │   │   │   └── sites/
│   │   │   │   │       ├── [acquire.md](./markdown/src/notes/marketing/copy-writer/sites/acquire.md)
│   │   │   │   │       ├── [hacker-news.md](./markdown/src/notes/marketing/copy-writer/sites/hacker-news.md)
│   │   │   │   │       ├── [indie-hackers.md](./markdown/src/notes/marketing/copy-writer/sites/indie-hackers.md)
│   │   │   │   │       └── [product-hunt.md](./markdown/src/notes/marketing/copy-writer/sites/product-hunt.md)
│   │   │   │   └── ui-ux-designer/
│   │   │   │       ├── [canva.md](./markdown/src/notes/marketing/ui-ux-designer/canva.md)
│   │   │   │       └── [figma.md](./markdown/src/notes/marketing/ui-ux-designer/figma.md)
│   │   │   ├── media/
│   │   │   │   ├── [anime.md](./markdown/src/notes/media/anime.md)
│   │   │   │   ├── [arts.md](./markdown/src/notes/media/arts.md)
│   │   │   │   ├── [comics.md](./markdown/src/notes/media/comics.md)
│   │   │   │   ├── [entertainment.md](./markdown/src/notes/media/entertainment.md)
│   │   │   │   ├── [game-of-thrones.md](./markdown/src/notes/media/game-of-thrones.md)
│   │   │   │   ├── [instruments.md](./markdown/src/notes/media/instruments.md)
│   │   │   │   ├── [listening.md](./markdown/src/notes/media/listening.md)
│   │   │   │   ├── [movies.md](./markdown/src/notes/media/movies.md)
│   │   │   │   ├── [music.md](./markdown/src/notes/media/music.md)
│   │   │   │   ├── [musical.md](./markdown/src/notes/media/musical.md)
│   │   │   │   ├── [podcasts.md](./markdown/src/notes/media/podcasts.md)
│   │   │   │   ├── [reading.md](./markdown/src/notes/media/reading.md)
│   │   │   │   ├── [series.md](./markdown/src/notes/media/series.md)
│   │   │   │   └── [watching.md](./markdown/src/notes/media/watching.md)
│   │   │   ├── science/
│   │   │   │   ├── [biology.md](./markdown/src/notes/science/biology.md)
│   │   │   │   ├── [brain.md](./markdown/src/notes/science/brain.md)
│   │   │   │   ├── [chemistry.md](./markdown/src/notes/science/chemistry.md)
│   │   │   │   ├── [economics.md](./markdown/src/notes/science/economics.md)
│   │   │   │   ├── [fields.md](./markdown/src/notes/science/fields.md)
│   │   │   │   ├── [mathematics.md](./markdown/src/notes/science/mathematics.md)
│   │   │   │   ├── [neuroscience.md](./markdown/src/notes/science/neuroscience.md)
│   │   │   │   ├── [physics.md](./markdown/src/notes/science/physics.md)
│   │   │   │   ├── [psychology.md](./markdown/src/notes/science/psychology.md)
│   │   │   │   ├── [sciences.md](./markdown/src/notes/science/sciences.md)
│   │   │   │   └── [stem.md](./markdown/src/notes/science/stem.md)
│   │   │   ├── sports/
│   │   │   │   ├── [american-football.md](./markdown/src/notes/sports/american-football.md)
│   │   │   │   ├── [badminton.md](./markdown/src/notes/sports/badminton.md)
│   │   │   │   ├── [baseball.md](./markdown/src/notes/sports/baseball.md)
│   │   │   │   ├── [basketball.md](./markdown/src/notes/sports/basketball.md)
│   │   │   │   ├── [bicycling.md](./markdown/src/notes/sports/bicycling.md)
│   │   │   │   ├── [cricket.md](./markdown/src/notes/sports/cricket.md)
│   │   │   │   ├── [f1.md](./markdown/src/notes/sports/f1.md)
│   │   │   │   ├── [football.md](./markdown/src/notes/sports/football.md)
│   │   │   │   ├── [futsal.md](./markdown/src/notes/sports/futsal.md)
│   │   │   │   ├── [marathon.md](./markdown/src/notes/sports/marathon.md)
│   │   │   │   ├── [netball.md](./markdown/src/notes/sports/netball.md)
│   │   │   │   ├── [pickleball.md](./markdown/src/notes/sports/pickleball.md)
│   │   │   │   ├── [rugby.md](./markdown/src/notes/sports/rugby.md)
│   │   │   │   ├── [sports.md](./markdown/src/notes/sports/sports.md)
│   │   │   │   ├── [squash.md](./markdown/src/notes/sports/squash.md)
│   │   │   │   ├── [swimming.md](./markdown/src/notes/sports/swimming.md)
│   │   │   │   ├── [table-tennis.md](./markdown/src/notes/sports/table-tennis.md)
│   │   │   │   └── [tennis.md](./markdown/src/notes/sports/tennis.md)
│   │   │   ├── transport/
│   │   │   │   ├── [cars.md](./markdown/src/notes/transport/cars.md)
│   │   │   │   ├── [motorcycle.md](./markdown/src/notes/transport/motorcycle.md)
│   │   │   │   ├── [motorcycles.md](./markdown/src/notes/transport/motorcycles.md)
│   │   │   │   └── [vehicles.md](./markdown/src/notes/transport/vehicles.md)
│   │   │   ├── [engineering.md](./markdown/src/notes/engineering.md)
│   │   │   ├── [intro.md](./markdown/src/notes/intro.md)
│   │   │   ├── [me.md](./markdown/src/notes/me.md)
│   │   │   └── [resume.md](./markdown/src/notes/resume.md)
│   │   ├── providers/
│   │   │   ├── __tests__/
│   │   │   │   └── [SWProvider.test.tsx](./markdown/src/providers/__tests__/SWProvider.test.tsx)
│   │   │   └── [SWProvider.tsx](./markdown/src/providers/SWProvider.tsx)
│   │   ├── styles/
│   │   │   ├── [base.css](./markdown/src/styles/base.css)
│   │   │   ├── [globals.css](./markdown/src/styles/globals.css)
│   │   │   └── [themes.css](./markdown/src/styles/themes.css)
│   │   └── test/
│   │       └── [style-mock.js](./markdown/src/test/style-mock.js)
│   ├── src-tauri/
│   │   ├── capabilities/
│   │   │   └── [default.json](./markdown/src-tauri/capabilities/default.json)
│   │   ├── icons/
│   │   │   ├── [128x128.png](./markdown/src-tauri/icons/128x128.png)
│   │   │   ├── [128x128@2x.png](./markdown/src-tauri/icons/128x128@2x.png)
│   │   │   ├── [32x32.png](./markdown/src-tauri/icons/32x32.png)
│   │   │   ├── [Square107x107Logo.png](./markdown/src-tauri/icons/Square107x107Logo.png)
│   │   │   ├── [Square142x142Logo.png](./markdown/src-tauri/icons/Square142x142Logo.png)
│   │   │   ├── [Square150x150Logo.png](./markdown/src-tauri/icons/Square150x150Logo.png)
│   │   │   ├── [Square284x284Logo.png](./markdown/src-tauri/icons/Square284x284Logo.png)
│   │   │   ├── [Square30x30Logo.png](./markdown/src-tauri/icons/Square30x30Logo.png)
│   │   │   ├── [Square310x310Logo.png](./markdown/src-tauri/icons/Square310x310Logo.png)
│   │   │   ├── [Square44x44Logo.png](./markdown/src-tauri/icons/Square44x44Logo.png)
│   │   │   ├── [Square71x71Logo.png](./markdown/src-tauri/icons/Square71x71Logo.png)
│   │   │   ├── [Square89x89Logo.png](./markdown/src-tauri/icons/Square89x89Logo.png)
│   │   │   ├── [StoreLogo.png](./markdown/src-tauri/icons/StoreLogo.png)
│   │   │   ├── [icon.icns](./markdown/src-tauri/icons/icon.icns)
│   │   │   ├── [icon.ico](./markdown/src-tauri/icons/icon.ico)
│   │   │   └── [icon.png](./markdown/src-tauri/icons/icon.png)
│   │   ├── src/
│   │   │   ├── [lib.rs](./markdown/src-tauri/src/lib.rs)
│   │   │   └── [main.rs](./markdown/src-tauri/src/main.rs)
│   │   ├── [Cargo.lock](./markdown/src-tauri/Cargo.lock)
│   │   ├── [Cargo.toml](./markdown/src-tauri/Cargo.toml)
│   │   ├── [build.rs](./markdown/src-tauri/build.rs)
│   │   └── [tauri.conf.json](./markdown/src-tauri/tauri.conf.json)
│   ├── [AGENTS.md](./markdown/AGENTS.md)
│   ├── [Dockerfile](./markdown/Dockerfile)
│   ├── [LICENSE](./markdown/LICENSE)
│   ├── [README.md](./markdown/README.md)
│   ├── [docker-compose.yaml](./markdown/docker-compose.yaml)
│   ├── [eslint.config.mts](./markdown/eslint.config.mts)
│   ├── [jest.config.ts](./markdown/jest.config.ts)
│   ├── [jest.setup.ts](./markdown/jest.setup.ts)
│   ├── [next.config.ts](./markdown/next.config.ts)
│   ├── [package.json](./markdown/package.json)
│   ├── [playwright.config.ts](./markdown/playwright.config.ts)
│   ├── [postcss.config.mjs](./markdown/postcss.config.mjs)
│   └── [tsconfig.json](./markdown/tsconfig.json)
├── pdf/
│   ├── docs/
│   │   ├── [ARCHITECTURE.md](./pdf/docs/ARCHITECTURE.md)
│   │   ├── [CONTRIBUTING.md](./pdf/docs/CONTRIBUTING.md)
│   │   ├── [DOWNLOADS.md](./pdf/docs/DOWNLOADS.md)
│   │   ├── [PACKAGING.md](./pdf/docs/PACKAGING.md)
│   │   └── [ROADMAP.md](./pdf/docs/ROADMAP.md)
│   ├── e2e/
│   │   ├── [about.spec.ts](./pdf/e2e/about.spec.ts)
│   │   ├── [home.spec.ts](./pdf/e2e/home.spec.ts)
│   │   ├── [navigation.spec.ts](./pdf/e2e/navigation.spec.ts)
│   │   ├── [pdf-compare.spec.ts](./pdf/e2e/pdf-compare.spec.ts)
│   │   ├── [pdf-edit.spec.ts](./pdf/e2e/pdf-edit.spec.ts)
│   │   ├── [pdf-merge.spec.ts](./pdf/e2e/pdf-merge.spec.ts)
│   │   ├── [pdf-viewer.spec.ts](./pdf/e2e/pdf-viewer.spec.ts)
│   │   ├── [profile.spec.ts](./pdf/e2e/profile.spec.ts)
│   │   ├── [settings.spec.ts](./pdf/e2e/settings.spec.ts)
│   │   ├── [version.spec.ts](./pdf/e2e/version.spec.ts)
│   │   └── [view-mode.spec.ts](./pdf/e2e/view-mode.spec.ts)
│   ├── public/
│   │   ├── icons/
│   │   │   ├── [icon-128x128.png](./pdf/public/icons/icon-128x128.png)
│   │   │   ├── [icon-144x144.png](./pdf/public/icons/icon-144x144.png)
│   │   │   ├── [icon-152x152.png](./pdf/public/icons/icon-152x152.png)
│   │   │   ├── [icon-16x16.png](./pdf/public/icons/icon-16x16.png)
│   │   │   ├── [icon-180x180.png](./pdf/public/icons/icon-180x180.png)
│   │   │   ├── [icon-192x192.png](./pdf/public/icons/icon-192x192.png)
│   │   │   ├── [icon-256x256.png](./pdf/public/icons/icon-256x256.png)
│   │   │   ├── [icon-32x32.png](./pdf/public/icons/icon-32x32.png)
│   │   │   ├── [icon-384x384.png](./pdf/public/icons/icon-384x384.png)
│   │   │   ├── [icon-48x48.png](./pdf/public/icons/icon-48x48.png)
│   │   │   ├── [icon-512x512.png](./pdf/public/icons/icon-512x512.png)
│   │   │   ├── [icon-64x64.png](./pdf/public/icons/icon-64x64.png)
│   │   │   ├── [icon-72x72.png](./pdf/public/icons/icon-72x72.png)
│   │   │   ├── [icon-96x96.png](./pdf/public/icons/icon-96x96.png)
│   │   │   └── [icon.svg](./pdf/public/icons/icon.svg)
│   │   ├── [apple-touch-icon.png](./pdf/public/apple-touch-icon.png)
│   │   ├── [favicon.ico](./pdf/public/favicon.ico)
│   │   ├── [manifest.json](./pdf/public/manifest.json)
│   │   ├── [robots.txt](./pdf/public/robots.txt)
│   │   ├── [sitemap.xml](./pdf/public/sitemap.xml)
│   │   └── [sw.js](./pdf/public/sw.js)
│   ├── src/
│   │   ├── app/
│   │   │   ├── (auth)/
│   │   │   │   ├── forget-password/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./pdf/src/app/(auth)/forget-password/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./pdf/src/app/(auth)/forget-password/page.tsx)
│   │   │   │   ├── profile/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./pdf/src/app/(auth)/profile/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./pdf/src/app/(auth)/profile/page.tsx)
│   │   │   │   ├── reset-password/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./pdf/src/app/(auth)/reset-password/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./pdf/src/app/(auth)/reset-password/page.tsx)
│   │   │   │   ├── sign-in/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./pdf/src/app/(auth)/sign-in/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./pdf/src/app/(auth)/sign-in/page.tsx)
│   │   │   │   └── sign-up/
│   │   │   │       ├── __tests__/
│   │   │   │       │   └── [page.test.tsx](./pdf/src/app/(auth)/sign-up/__tests__/page.test.tsx)
│   │   │   │       └── [page.tsx](./pdf/src/app/(auth)/sign-up/page.tsx)
│   │   │   ├── (info)/
│   │   │   │   ├── about/
│   │   │   │   │   └── [page.tsx](./pdf/src/app/(info)/about/page.tsx)
│   │   │   │   ├── downloads/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./pdf/src/app/(info)/downloads/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./pdf/src/app/(info)/downloads/page.tsx)
│   │   │   │   └── version/
│   │   │   │       └── [page.tsx](./pdf/src/app/(info)/version/page.tsx)
│   │   │   ├── __tests__/
│   │   │   │   ├── [about-page.test.tsx](./pdf/src/app/__tests__/about-page.test.tsx)
│   │   │   │   ├── [error-page.test.tsx](./pdf/src/app/__tests__/error-page.test.tsx)
│   │   │   │   ├── [error.test.tsx](./pdf/src/app/__tests__/error.test.tsx)
│   │   │   │   ├── [forbidden.test.tsx](./pdf/src/app/__tests__/forbidden.test.tsx)
│   │   │   │   ├── [global-error.test.tsx](./pdf/src/app/__tests__/global-error.test.tsx)
│   │   │   │   ├── [home-page.test.tsx](./pdf/src/app/__tests__/home-page.test.tsx)
│   │   │   │   ├── [layout.test.tsx](./pdf/src/app/__tests__/layout.test.tsx)
│   │   │   │   ├── [loading.test.tsx](./pdf/src/app/__tests__/loading.test.tsx)
│   │   │   │   ├── [not-found-page.test.tsx](./pdf/src/app/__tests__/not-found-page.test.tsx)
│   │   │   │   ├── [not-found.test.tsx](./pdf/src/app/__tests__/not-found.test.tsx)
│   │   │   │   ├── [pdf-compare-page.test.tsx](./pdf/src/app/__tests__/pdf-compare-page.test.tsx)
│   │   │   │   ├── [pdf-edit-page.test.tsx](./pdf/src/app/__tests__/pdf-edit-page.test.tsx)
│   │   │   │   ├── [pdf-merge-page.test.tsx](./pdf/src/app/__tests__/pdf-merge-page.test.tsx)
│   │   │   │   ├── [pdf-viewer-page.test.tsx](./pdf/src/app/__tests__/pdf-viewer-page.test.tsx)
│   │   │   │   ├── [robots.test.ts](./pdf/src/app/__tests__/robots.test.ts)
│   │   │   │   ├── [settings-page.test.tsx](./pdf/src/app/__tests__/settings-page.test.tsx)
│   │   │   │   ├── [template.test.tsx](./pdf/src/app/__tests__/template.test.tsx)
│   │   │   │   ├── [tools-page.test.tsx](./pdf/src/app/__tests__/tools-page.test.tsx)
│   │   │   │   ├── [unauthorized.test.tsx](./pdf/src/app/__tests__/unauthorized.test.tsx)
│   │   │   │   └── [version-page.test.tsx](./pdf/src/app/__tests__/version-page.test.tsx)
│   │   │   ├── pdf/
│   │   │   │   ├── compare/
│   │   │   │   │   └── [page.tsx](./pdf/src/app/pdf/compare/page.tsx)
│   │   │   │   ├── edit/
│   │   │   │   │   └── [page.tsx](./pdf/src/app/pdf/edit/page.tsx)
│   │   │   │   ├── merge/
│   │   │   │   │   └── [page.tsx](./pdf/src/app/pdf/merge/page.tsx)
│   │   │   │   └── [page.tsx](./pdf/src/app/pdf/page.tsx)
│   │   │   ├── settings/
│   │   │   │   └── [page.tsx](./pdf/src/app/settings/page.tsx)
│   │   │   ├── tools/
│   │   │   │   └── [page.tsx](./pdf/src/app/tools/page.tsx)
│   │   │   ├── [default.tsx](./pdf/src/app/default.tsx)
│   │   │   ├── [error.tsx](./pdf/src/app/error.tsx)
│   │   │   ├── [favicon.ico](./pdf/src/app/favicon.ico)
│   │   │   ├── [forbidden.tsx](./pdf/src/app/forbidden.tsx)
│   │   │   ├── [global-error.tsx](./pdf/src/app/global-error.tsx)
│   │   │   ├── [layout.tsx](./pdf/src/app/layout.tsx)
│   │   │   ├── [loading.tsx](./pdf/src/app/loading.tsx)
│   │   │   ├── [not-found.tsx](./pdf/src/app/not-found.tsx)
│   │   │   ├── [page.tsx](./pdf/src/app/page.tsx)
│   │   │   ├── [robots.ts](./pdf/src/app/robots.ts)
│   │   │   ├── [template.tsx](./pdf/src/app/template.tsx)
│   │   │   └── [unauthorized.tsx](./pdf/src/app/unauthorized.tsx)
│   │   ├── components/
│   │   │   ├── __tests__/
│   │   │   │   ├── [PdfFileUpload.test.tsx](./pdf/src/components/__tests__/PdfFileUpload.test.tsx)
│   │   │   │   └── [SWProvider.test.tsx](./pdf/src/components/__tests__/SWProvider.test.tsx)
│   │   │   ├── atoms/
│   │   │   │   ├── __mocks__/
│   │   │   │   │   └── [PdfFileUpload.tsx](./pdf/src/components/atoms/__mocks__/PdfFileUpload.tsx)
│   │   │   │   └── [PdfFileUpload.tsx](./pdf/src/components/atoms/PdfFileUpload.tsx)
│   │   │   ├── molecules/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [FormFieldsLayer.test.tsx](./pdf/src/components/molecules/__tests__/FormFieldsLayer.test.tsx)
│   │   │   │   │   ├── [PageOrganizer.test.tsx](./pdf/src/components/molecules/__tests__/PageOrganizer.test.tsx)
│   │   │   │   │   ├── [PageView.test.tsx](./pdf/src/components/molecules/__tests__/PageView.test.tsx)
│   │   │   │   │   └── [SignaturePad.test.tsx](./pdf/src/components/molecules/__tests__/SignaturePad.test.tsx)
│   │   │   │   ├── [FormFieldsLayer.tsx](./pdf/src/components/molecules/FormFieldsLayer.tsx)
│   │   │   │   ├── [PageOrganizer.tsx](./pdf/src/components/molecules/PageOrganizer.tsx)
│   │   │   │   ├── [PageView.tsx](./pdf/src/components/molecules/PageView.tsx)
│   │   │   │   ├── [SignaturePad.tsx](./pdf/src/components/molecules/SignaturePad.tsx)
│   │   │   │   └── [ViewerSkeleton.tsx](./pdf/src/components/molecules/ViewerSkeleton.tsx)
│   │   │   ├── organisms/
│   │   │   │   └── [ToastContainer.tsx](./pdf/src/components/organisms/ToastContainer.tsx)
│   │   │   ├── templates/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [AboutTemplate.test.tsx](./pdf/src/components/templates/__tests__/AboutTemplate.test.tsx)
│   │   │   │   │   ├── [DownloadsTemplate.test.tsx](./pdf/src/components/templates/__tests__/DownloadsTemplate.test.tsx)
│   │   │   │   │   ├── [ErrorTemplate.test.tsx](./pdf/src/components/templates/__tests__/ErrorTemplate.test.tsx)
│   │   │   │   │   └── [VersionTemplate.test.tsx](./pdf/src/components/templates/__tests__/VersionTemplate.test.tsx)
│   │   │   │   ├── [AboutTemplate.tsx](./pdf/src/components/templates/AboutTemplate.tsx)
│   │   │   │   ├── [DownloadsTemplate.tsx](./pdf/src/components/templates/DownloadsTemplate.tsx)
│   │   │   │   ├── [ErrorTemplate.tsx](./pdf/src/components/templates/ErrorTemplate.tsx)
│   │   │   │   └── [VersionTemplate.tsx](./pdf/src/components/templates/VersionTemplate.tsx)
│   │   │   ├── tools/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [convert-create-tools.test.tsx](./pdf/src/components/tools/__tests__/convert-create-tools.test.tsx)
│   │   │   │   │   ├── [pdf-canvas-tools.test.tsx](./pdf/src/components/tools/__tests__/pdf-canvas-tools.test.tsx)
│   │   │   │   │   └── [pdf-operations-tools.test.tsx](./pdf/src/components/tools/__tests__/pdf-operations-tools.test.tsx)
│   │   │   │   ├── [CreateTextToPdfTool.tsx](./pdf/src/components/tools/CreateTextToPdfTool.tsx)
│   │   │   │   ├── [CreateUrlToPdfTool.tsx](./pdf/src/components/tools/CreateUrlToPdfTool.tsx)
│   │   │   │   ├── [EbookConvertTool.tsx](./pdf/src/components/tools/EbookConvertTool.tsx)
│   │   │   │   ├── [ImagesToPdfTool.tsx](./pdf/src/components/tools/ImagesToPdfTool.tsx)
│   │   │   │   ├── [PdfAnnotateTool.tsx](./pdf/src/components/tools/PdfAnnotateTool.tsx)
│   │   │   │   ├── [PdfCompressTool.tsx](./pdf/src/components/tools/PdfCompressTool.tsx)
│   │   │   │   ├── [PdfCropTool.tsx](./pdf/src/components/tools/PdfCropTool.tsx)
│   │   │   │   ├── [PdfDeletePagesTool.tsx](./pdf/src/components/tools/PdfDeletePagesTool.tsx)
│   │   │   │   ├── [PdfEsignTool.tsx](./pdf/src/components/tools/PdfEsignTool.tsx)
│   │   │   │   ├── [PdfExtractImagesTool.tsx](./pdf/src/components/tools/PdfExtractImagesTool.tsx)
│   │   │   │   ├── [PdfExtractTextTool.tsx](./pdf/src/components/tools/PdfExtractTextTool.tsx)
│   │   │   │   ├── [PdfInfoTool.tsx](./pdf/src/components/tools/PdfInfoTool.tsx)
│   │   │   │   ├── [PdfMergeTool.tsx](./pdf/src/components/tools/PdfMergeTool.tsx)
│   │   │   │   ├── [PdfMetadataTool.tsx](./pdf/src/components/tools/PdfMetadataTool.tsx)
│   │   │   │   ├── [PdfOcrTool.tsx](./pdf/src/components/tools/PdfOcrTool.tsx)
│   │   │   │   ├── [PdfPageNumbersTool.tsx](./pdf/src/components/tools/PdfPageNumbersTool.tsx)
│   │   │   │   ├── [PdfPlaceholderTool.tsx](./pdf/src/components/tools/PdfPlaceholderTool.tsx)
│   │   │   │   ├── [PdfRearrangeTool.tsx](./pdf/src/components/tools/PdfRearrangeTool.tsx)
│   │   │   │   ├── [PdfRedactTool.tsx](./pdf/src/components/tools/PdfRedactTool.tsx)
│   │   │   │   ├── [PdfRepairTool.tsx](./pdf/src/components/tools/PdfRepairTool.tsx)
│   │   │   │   ├── [PdfRotateTool.tsx](./pdf/src/components/tools/PdfRotateTool.tsx)
│   │   │   │   ├── [PdfSecurityTool.tsx](./pdf/src/components/tools/PdfSecurityTool.tsx)
│   │   │   │   ├── [PdfSplitTool.tsx](./pdf/src/components/tools/PdfSplitTool.tsx)
│   │   │   │   ├── [PdfToFormatTool.tsx](./pdf/src/components/tools/PdfToFormatTool.tsx)
│   │   │   │   ├── [PdfToImagesTool.tsx](./pdf/src/components/tools/PdfToImagesTool.tsx)
│   │   │   │   ├── [PdfTranslateTool.tsx](./pdf/src/components/tools/PdfTranslateTool.tsx)
│   │   │   │   ├── [PdfWatermarkTool.tsx](./pdf/src/components/tools/PdfWatermarkTool.tsx)
│   │   │   │   └── [UrlToPdfTool.tsx](./pdf/src/components/tools/UrlToPdfTool.tsx)
│   │   │   └── [SWProvider.tsx](./pdf/src/components/SWProvider.tsx)
│   │   ├── data/
│   │   │   ├── __tests__/
│   │   │   │   ├── [models.test.ts](./pdf/src/data/__tests__/models.test.ts)
│   │   │   │   ├── [pdf-tools.test.ts](./pdf/src/data/__tests__/pdf-tools.test.ts)
│   │   │   │   └── [seed.test.ts](./pdf/src/data/__tests__/seed.test.ts)
│   │   │   ├── [models.ts](./pdf/src/data/models.ts)
│   │   │   ├── [pdf-tools.ts](./pdf/src/data/pdf-tools.ts)
│   │   │   └── [seed.ts](./pdf/src/data/seed.ts)
│   │   ├── hooks/
│   │   │   ├── __tests__/
│   │   │   │   └── [useSWRegister.test.ts](./pdf/src/hooks/__tests__/useSWRegister.test.ts)
│   │   │   └── [useSWRegister.ts](./pdf/src/hooks/useSWRegister.ts)
│   │   ├── lib/
│   │   │   ├── __tests__/
│   │   │   │   ├── [db.test.ts](./pdf/src/lib/__tests__/db.test.ts)
│   │   │   │   └── [pdf-tools.test.ts](./pdf/src/lib/__tests__/pdf-tools.test.ts)
│   │   │   ├── [db.ts](./pdf/src/lib/db.ts)
│   │   │   └── [pdf-tools.ts](./pdf/src/lib/pdf-tools.ts)
│   │   ├── providers/
│   │   │   ├── __tests__/
│   │   │   │   ├── [DataProvider.test.tsx](./pdf/src/providers/__tests__/DataProvider.test.tsx)
│   │   │   │   ├── [Providers.test.tsx](./pdf/src/providers/__tests__/Providers.test.tsx)
│   │   │   │   └── [ToastProvider.test.tsx](./pdf/src/providers/__tests__/ToastProvider.test.tsx)
│   │   │   ├── [DataProvider.tsx](./pdf/src/providers/DataProvider.tsx)
│   │   │   ├── [Providers.tsx](./pdf/src/providers/Providers.tsx)
│   │   │   └── [ToastProvider.tsx](./pdf/src/providers/ToastProvider.tsx)
│   │   ├── styles/
│   │   │   ├── [base.css](./pdf/src/styles/base.css)
│   │   │   ├── [globals.css](./pdf/src/styles/globals.css)
│   │   │   └── [themes.css](./pdf/src/styles/themes.css)
│   │   ├── types/
│   │   │   └── [index.ts](./pdf/src/types/index.ts)
│   │   └── utils/
│   │       ├── __tests__/
│   │       │   └── [format.test.ts](./pdf/src/utils/__tests__/format.test.ts)
│   │       └── [format.ts](./pdf/src/utils/format.ts)
│   ├── src-tauri/
│   │   ├── capabilities/
│   │   │   └── [default.json](./pdf/src-tauri/capabilities/default.json)
│   │   ├── icons/
│   │   │   ├── [128x128.png](./pdf/src-tauri/icons/128x128.png)
│   │   │   ├── [128x128@2x.png](./pdf/src-tauri/icons/128x128@2x.png)
│   │   │   ├── [32x32.png](./pdf/src-tauri/icons/32x32.png)
│   │   │   ├── [Square107x107Logo.png](./pdf/src-tauri/icons/Square107x107Logo.png)
│   │   │   ├── [Square142x142Logo.png](./pdf/src-tauri/icons/Square142x142Logo.png)
│   │   │   ├── [Square150x150Logo.png](./pdf/src-tauri/icons/Square150x150Logo.png)
│   │   │   ├── [Square284x284Logo.png](./pdf/src-tauri/icons/Square284x284Logo.png)
│   │   │   ├── [Square30x30Logo.png](./pdf/src-tauri/icons/Square30x30Logo.png)
│   │   │   ├── [Square310x310Logo.png](./pdf/src-tauri/icons/Square310x310Logo.png)
│   │   │   ├── [Square44x44Logo.png](./pdf/src-tauri/icons/Square44x44Logo.png)
│   │   │   ├── [Square71x71Logo.png](./pdf/src-tauri/icons/Square71x71Logo.png)
│   │   │   ├── [Square89x89Logo.png](./pdf/src-tauri/icons/Square89x89Logo.png)
│   │   │   ├── [StoreLogo.png](./pdf/src-tauri/icons/StoreLogo.png)
│   │   │   ├── [icon.icns](./pdf/src-tauri/icons/icon.icns)
│   │   │   ├── [icon.ico](./pdf/src-tauri/icons/icon.ico)
│   │   │   └── [icon.png](./pdf/src-tauri/icons/icon.png)
│   │   ├── src/
│   │   │   ├── [lib.rs](./pdf/src-tauri/src/lib.rs)
│   │   │   └── [main.rs](./pdf/src-tauri/src/main.rs)
│   │   ├── [Cargo.lock](./pdf/src-tauri/Cargo.lock)
│   │   ├── [Cargo.toml](./pdf/src-tauri/Cargo.toml)
│   │   ├── [build.rs](./pdf/src-tauri/build.rs)
│   │   └── [tauri.conf.json](./pdf/src-tauri/tauri.conf.json)
│   ├── [AGENTS.md](./pdf/AGENTS.md)
│   ├── [Dockerfile](./pdf/Dockerfile)
│   ├── [LICENSE](./pdf/LICENSE)
│   ├── [README.md](./pdf/README.md)
│   ├── [TREE.md](./pdf/TREE.md)
│   ├── [apple-touch-icon.png](./pdf/apple-touch-icon.png)
│   ├── [docker-compose.yaml](./pdf/docker-compose.yaml)
│   ├── [eslint.config.mts](./pdf/eslint.config.mts)
│   ├── [favicon.ico](./pdf/favicon.ico)
│   ├── [jest.config.ts](./pdf/jest.config.ts)
│   ├── [jest.setup.ts](./pdf/jest.setup.ts)
│   ├── [next.config.ts](./pdf/next.config.ts)
│   ├── [package.json](./pdf/package.json)
│   ├── [playwright.config.ts](./pdf/playwright.config.ts)
│   ├── [postcss.config.mjs](./pdf/postcss.config.mjs)
│   ├── [robots.txt](./pdf/robots.txt)
│   ├── [sitemap.xml](./pdf/sitemap.xml)
│   └── [tsconfig.json](./pdf/tsconfig.json)
├── projects/
│   ├── docs/
│   │   ├── [ARCHITECTURE.md](./projects/docs/ARCHITECTURE.md)
│   │   ├── [CONTRIBUTING.md](./projects/docs/CONTRIBUTING.md)
│   │   ├── [DOWNLOADS.md](./projects/docs/DOWNLOADS.md)
│   │   ├── [PACKAGING.md](./projects/docs/PACKAGING.md)
│   │   └── [ROADMAP.md](./projects/docs/ROADMAP.md)
│   ├── e2e/
│   │   ├── [about.spec.ts](./projects/e2e/about.spec.ts)
│   │   ├── [board-views.spec.ts](./projects/e2e/board-views.spec.ts)
│   │   ├── [board.spec.ts](./projects/e2e/board.spec.ts)
│   │   ├── [home.spec.ts](./projects/e2e/home.spec.ts)
│   │   ├── [navigation.spec.ts](./projects/e2e/navigation.spec.ts)
│   │   ├── [profile.spec.ts](./projects/e2e/profile.spec.ts)
│   │   ├── [settings.spec.ts](./projects/e2e/settings.spec.ts)
│   │   └── [version.spec.ts](./projects/e2e/version.spec.ts)
│   ├── public/
│   │   ├── icons/
│   │   │   ├── [icon-128x128.png](./projects/public/icons/icon-128x128.png)
│   │   │   ├── [icon-144x144.png](./projects/public/icons/icon-144x144.png)
│   │   │   ├── [icon-152x152.png](./projects/public/icons/icon-152x152.png)
│   │   │   ├── [icon-16x16.png](./projects/public/icons/icon-16x16.png)
│   │   │   ├── [icon-180x180.png](./projects/public/icons/icon-180x180.png)
│   │   │   ├── [icon-192x192.png](./projects/public/icons/icon-192x192.png)
│   │   │   ├── [icon-256x256.png](./projects/public/icons/icon-256x256.png)
│   │   │   ├── [icon-32x32.png](./projects/public/icons/icon-32x32.png)
│   │   │   ├── [icon-384x384.png](./projects/public/icons/icon-384x384.png)
│   │   │   ├── [icon-48x48.png](./projects/public/icons/icon-48x48.png)
│   │   │   ├── [icon-512x512.png](./projects/public/icons/icon-512x512.png)
│   │   │   ├── [icon-64x64.png](./projects/public/icons/icon-64x64.png)
│   │   │   ├── [icon-72x72.png](./projects/public/icons/icon-72x72.png)
│   │   │   ├── [icon-96x96.png](./projects/public/icons/icon-96x96.png)
│   │   │   └── [icon.svg](./projects/public/icons/icon.svg)
│   │   ├── [apple-touch-icon.png](./projects/public/apple-touch-icon.png)
│   │   ├── [favicon.ico](./projects/public/favicon.ico)
│   │   ├── [manifest.json](./projects/public/manifest.json)
│   │   ├── [robots.txt](./projects/public/robots.txt)
│   │   ├── [sitemap.xml](./projects/public/sitemap.xml)
│   │   └── [sw.js](./projects/public/sw.js)
│   ├── src/
│   │   ├── app/
│   │   │   ├── (auth)/
│   │   │   │   ├── forget-password/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./projects/src/app/(auth)/forget-password/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./projects/src/app/(auth)/forget-password/page.tsx)
│   │   │   │   ├── profile/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./projects/src/app/(auth)/profile/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./projects/src/app/(auth)/profile/page.tsx)
│   │   │   │   ├── reset-password/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./projects/src/app/(auth)/reset-password/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./projects/src/app/(auth)/reset-password/page.tsx)
│   │   │   │   ├── sign-in/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./projects/src/app/(auth)/sign-in/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./projects/src/app/(auth)/sign-in/page.tsx)
│   │   │   │   └── sign-up/
│   │   │   │       ├── __tests__/
│   │   │   │       │   └── [page.test.tsx](./projects/src/app/(auth)/sign-up/__tests__/page.test.tsx)
│   │   │   │       └── [page.tsx](./projects/src/app/(auth)/sign-up/page.tsx)
│   │   │   ├── (info)/
│   │   │   │   ├── about/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./projects/src/app/(info)/about/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./projects/src/app/(info)/about/page.tsx)
│   │   │   │   ├── downloads/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./projects/src/app/(info)/downloads/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./projects/src/app/(info)/downloads/page.tsx)
│   │   │   │   └── version/
│   │   │   │       ├── __tests__/
│   │   │   │       │   └── [page.test.tsx](./projects/src/app/(info)/version/__tests__/page.test.tsx)
│   │   │   │       └── [page.tsx](./projects/src/app/(info)/version/page.tsx)
│   │   │   ├── __tests__/
│   │   │   │   ├── [error.test.tsx](./projects/src/app/__tests__/error.test.tsx)
│   │   │   │   ├── [forbidden.test.tsx](./projects/src/app/__tests__/forbidden.test.tsx)
│   │   │   │   ├── [global-error.test.tsx](./projects/src/app/__tests__/global-error.test.tsx)
│   │   │   │   ├── [home-page.test.tsx](./projects/src/app/__tests__/home-page.test.tsx)
│   │   │   │   ├── [layout.test.tsx](./projects/src/app/__tests__/layout.test.tsx)
│   │   │   │   ├── [loading.test.tsx](./projects/src/app/__tests__/loading.test.tsx)
│   │   │   │   ├── [not-found.test.tsx](./projects/src/app/__tests__/not-found.test.tsx)
│   │   │   │   ├── [robots.test.ts](./projects/src/app/__tests__/robots.test.ts)
│   │   │   │   ├── [template.test.tsx](./projects/src/app/__tests__/template.test.tsx)
│   │   │   │   └── [unauthorized.test.tsx](./projects/src/app/__tests__/unauthorized.test.tsx)
│   │   │   ├── board/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [page.test.tsx](./projects/src/app/board/__tests__/page.test.tsx)
│   │   │   │   ├── cal/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./projects/src/app/board/cal/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./projects/src/app/board/cal/page.tsx)
│   │   │   │   ├── list/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./projects/src/app/board/list/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./projects/src/app/board/list/page.tsx)
│   │   │   │   ├── timeline/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./projects/src/app/board/timeline/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./projects/src/app/board/timeline/page.tsx)
│   │   │   │   └── [page.tsx](./projects/src/app/board/page.tsx)
│   │   │   ├── card/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [page.test.tsx](./projects/src/app/card/__tests__/page.test.tsx)
│   │   │   │   └── [page.tsx](./projects/src/app/card/page.tsx)
│   │   │   ├── settings/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [page.test.tsx](./projects/src/app/settings/__tests__/page.test.tsx)
│   │   │   │   └── [page.tsx](./projects/src/app/settings/page.tsx)
│   │   │   ├── [default.tsx](./projects/src/app/default.tsx)
│   │   │   ├── [error.tsx](./projects/src/app/error.tsx)
│   │   │   ├── [favicon.ico](./projects/src/app/favicon.ico)
│   │   │   ├── [forbidden.tsx](./projects/src/app/forbidden.tsx)
│   │   │   ├── [global-error.tsx](./projects/src/app/global-error.tsx)
│   │   │   ├── [layout.tsx](./projects/src/app/layout.tsx)
│   │   │   ├── [loading.tsx](./projects/src/app/loading.tsx)
│   │   │   ├── [not-found.tsx](./projects/src/app/not-found.tsx)
│   │   │   ├── [page.tsx](./projects/src/app/page.tsx)
│   │   │   ├── [robots.ts](./projects/src/app/robots.ts)
│   │   │   ├── [template.tsx](./projects/src/app/template.tsx)
│   │   │   └── [unauthorized.tsx](./projects/src/app/unauthorized.tsx)
│   │   ├── components/
│   │   │   ├── __tests__/
│   │   │   │   ├── [BoardFilterBar.test.tsx](./projects/src/components/__tests__/BoardFilterBar.test.tsx)
│   │   │   │   └── [SWProvider.test.tsx](./projects/src/components/__tests__/SWProvider.test.tsx)
│   │   │   ├── organisms/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [ToastContainer.test.tsx](./projects/src/components/organisms/__tests__/ToastContainer.test.tsx)
│   │   │   │   ├── [BoardActivity.tsx](./projects/src/components/organisms/BoardActivity.tsx)
│   │   │   │   ├── [BoardFilterBar.tsx](./projects/src/components/organisms/BoardFilterBar.tsx)
│   │   │   │   ├── [MembersMenu.tsx](./projects/src/components/organisms/MembersMenu.tsx)
│   │   │   │   ├── [NotificationsDropdown.tsx](./projects/src/components/organisms/NotificationsDropdown.tsx)
│   │   │   │   ├── [ShareMenu.tsx](./projects/src/components/organisms/ShareMenu.tsx)
│   │   │   │   └── [ToastContainer.tsx](./projects/src/components/organisms/ToastContainer.tsx)
│   │   │   ├── templates/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [AboutTemplate.test.tsx](./projects/src/components/templates/__tests__/AboutTemplate.test.tsx)
│   │   │   │   │   ├── [DownloadsTemplate.test.tsx](./projects/src/components/templates/__tests__/DownloadsTemplate.test.tsx)
│   │   │   │   │   ├── [ErrorTemplate.test.tsx](./projects/src/components/templates/__tests__/ErrorTemplate.test.tsx)
│   │   │   │   │   └── [VersionTemplate.test.tsx](./projects/src/components/templates/__tests__/VersionTemplate.test.tsx)
│   │   │   │   ├── [AboutTemplate.tsx](./projects/src/components/templates/AboutTemplate.tsx)
│   │   │   │   ├── [DownloadsTemplate.tsx](./projects/src/components/templates/DownloadsTemplate.tsx)
│   │   │   │   ├── [ErrorTemplate.tsx](./projects/src/components/templates/ErrorTemplate.tsx)
│   │   │   │   └── [VersionTemplate.tsx](./projects/src/components/templates/VersionTemplate.tsx)
│   │   │   └── [SWProvider.tsx](./projects/src/components/SWProvider.tsx)
│   │   ├── data/
│   │   │   ├── __tests__/
│   │   │   │   ├── [models.test.ts](./projects/src/data/__tests__/models.test.ts)
│   │   │   │   └── [seed.test.ts](./projects/src/data/__tests__/seed.test.ts)
│   │   │   ├── [models.ts](./projects/src/data/models.ts)
│   │   │   └── [seed.ts](./projects/src/data/seed.ts)
│   │   ├── hooks/
│   │   │   ├── __tests__/
│   │   │   │   └── [useSWRegister.test.ts](./projects/src/hooks/__tests__/useSWRegister.test.ts)
│   │   │   └── [useSWRegister.ts](./projects/src/hooks/useSWRegister.ts)
│   │   ├── lib/
│   │   │   ├── __tests__/
│   │   │   │   └── [db.test.ts](./projects/src/lib/__tests__/db.test.ts)
│   │   │   └── [db.ts](./projects/src/lib/db.ts)
│   │   ├── providers/
│   │   │   ├── __tests__/
│   │   │   │   ├── [DataProvider.test.tsx](./projects/src/providers/__tests__/DataProvider.test.tsx)
│   │   │   │   ├── [Providers.test.tsx](./projects/src/providers/__tests__/Providers.test.tsx)
│   │   │   │   └── [ToastProvider.test.tsx](./projects/src/providers/__tests__/ToastProvider.test.tsx)
│   │   │   ├── [DataProvider.tsx](./projects/src/providers/DataProvider.tsx)
│   │   │   ├── [Providers.tsx](./projects/src/providers/Providers.tsx)
│   │   │   └── [ToastProvider.tsx](./projects/src/providers/ToastProvider.tsx)
│   │   ├── styles/
│   │   │   ├── [base.css](./projects/src/styles/base.css)
│   │   │   ├── [globals.css](./projects/src/styles/globals.css)
│   │   │   └── [themes.css](./projects/src/styles/themes.css)
│   │   ├── types/
│   │   │   └── [index.ts](./projects/src/types/index.ts)
│   │   └── utils/
│   │       ├── __tests__/
│   │       │   └── [format.test.ts](./projects/src/utils/__tests__/format.test.ts)
│   │       ├── [collab.ts](./projects/src/utils/collab.ts)
│   │       └── [format.ts](./projects/src/utils/format.ts)
│   ├── src-tauri/
│   │   ├── icons/
│   │   │   ├── [128x128.png](./projects/src-tauri/icons/128x128.png)
│   │   │   ├── [128x128@2x.png](./projects/src-tauri/icons/128x128@2x.png)
│   │   │   ├── [32x32.png](./projects/src-tauri/icons/32x32.png)
│   │   │   ├── [Square107x107Logo.png](./projects/src-tauri/icons/Square107x107Logo.png)
│   │   │   ├── [Square142x142Logo.png](./projects/src-tauri/icons/Square142x142Logo.png)
│   │   │   ├── [Square150x150Logo.png](./projects/src-tauri/icons/Square150x150Logo.png)
│   │   │   ├── [Square284x284Logo.png](./projects/src-tauri/icons/Square284x284Logo.png)
│   │   │   ├── [Square30x30Logo.png](./projects/src-tauri/icons/Square30x30Logo.png)
│   │   │   ├── [Square310x310Logo.png](./projects/src-tauri/icons/Square310x310Logo.png)
│   │   │   ├── [Square44x44Logo.png](./projects/src-tauri/icons/Square44x44Logo.png)
│   │   │   ├── [Square71x71Logo.png](./projects/src-tauri/icons/Square71x71Logo.png)
│   │   │   ├── [Square89x89Logo.png](./projects/src-tauri/icons/Square89x89Logo.png)
│   │   │   ├── [StoreLogo.png](./projects/src-tauri/icons/StoreLogo.png)
│   │   │   ├── [icon.icns](./projects/src-tauri/icons/icon.icns)
│   │   │   ├── [icon.ico](./projects/src-tauri/icons/icon.ico)
│   │   │   └── [icon.png](./projects/src-tauri/icons/icon.png)
│   │   ├── src/
│   │   │   ├── [lib.rs](./projects/src-tauri/src/lib.rs)
│   │   │   └── [main.rs](./projects/src-tauri/src/main.rs)
│   │   ├── [Cargo.lock](./projects/src-tauri/Cargo.lock)
│   │   ├── [Cargo.toml](./projects/src-tauri/Cargo.toml)
│   │   ├── [build.rs](./projects/src-tauri/build.rs)
│   │   └── [tauri.conf.json](./projects/src-tauri/tauri.conf.json)
│   ├── [AGENTS.md](./projects/AGENTS.md)
│   ├── [Dockerfile](./projects/Dockerfile)
│   ├── [LICENSE](./projects/LICENSE)
│   ├── [README.md](./projects/README.md)
│   ├── [TREE.md](./projects/TREE.md)
│   ├── [docker-compose.yaml](./projects/docker-compose.yaml)
│   ├── [eslint.config.mts](./projects/eslint.config.mts)
│   ├── [jest.config.ts](./projects/jest.config.ts)
│   ├── [jest.setup.ts](./projects/jest.setup.ts)
│   ├── [next.config.ts](./projects/next.config.ts)
│   ├── [package.json](./projects/package.json)
│   ├── [playwright.config.ts](./projects/playwright.config.ts)
│   ├── [postcss.config.mjs](./projects/postcss.config.mjs)
│   └── [tsconfig.json](./projects/tsconfig.json)
├── resume/
│   ├── docs/
│   │   ├── other/
│   │   │   ├── [DATA-MODEL.md](./resume/docs/other/DATA-MODEL.md)
│   │   │   ├── [DEVELOPMENT.md](./resume/docs/other/DEVELOPMENT.md)
│   │   │   ├── [README.md](./resume/docs/other/README.md)
│   │   │   └── [TEMPLATES.md](./resume/docs/other/TEMPLATES.md)
│   │   ├── [ARCHITECTURE.md](./resume/docs/ARCHITECTURE.md)
│   │   ├── [CONTRIBUTING.md](./resume/docs/CONTRIBUTING.md)
│   │   ├── [DOWNLOADS.md](./resume/docs/DOWNLOADS.md)
│   │   └── [ROADMAP.md](./resume/docs/ROADMAP.md)
│   ├── e2e/
│   │   ├── [about.spec.ts](./resume/e2e/about.spec.ts)
│   │   ├── [editor.spec.ts](./resume/e2e/editor.spec.ts)
│   │   ├── [home.spec.ts](./resume/e2e/home.spec.ts)
│   │   ├── [hydration.spec.ts](./resume/e2e/hydration.spec.ts)
│   │   ├── [navigation.spec.ts](./resume/e2e/navigation.spec.ts)
│   │   ├── [responsive.spec.ts](./resume/e2e/responsive.spec.ts)
│   │   └── [version.spec.ts](./resume/e2e/version.spec.ts)
│   ├── public/
│   │   ├── icons/
│   │   │   ├── [icon-128x128.png](./resume/public/icons/icon-128x128.png)
│   │   │   ├── [icon-144x144.png](./resume/public/icons/icon-144x144.png)
│   │   │   ├── [icon-152x152.png](./resume/public/icons/icon-152x152.png)
│   │   │   ├── [icon-16x16.png](./resume/public/icons/icon-16x16.png)
│   │   │   ├── [icon-180x180.png](./resume/public/icons/icon-180x180.png)
│   │   │   ├── [icon-192x192.png](./resume/public/icons/icon-192x192.png)
│   │   │   ├── [icon-256x256.png](./resume/public/icons/icon-256x256.png)
│   │   │   ├── [icon-32x32.png](./resume/public/icons/icon-32x32.png)
│   │   │   ├── [icon-384x384.png](./resume/public/icons/icon-384x384.png)
│   │   │   ├── [icon-48x48.png](./resume/public/icons/icon-48x48.png)
│   │   │   ├── [icon-512x512.png](./resume/public/icons/icon-512x512.png)
│   │   │   ├── [icon-64x64.png](./resume/public/icons/icon-64x64.png)
│   │   │   ├── [icon-72x72.png](./resume/public/icons/icon-72x72.png)
│   │   │   ├── [icon-96x96.png](./resume/public/icons/icon-96x96.png)
│   │   │   └── [icon.svg](./resume/public/icons/icon.svg)
│   │   ├── [apple-touch-icon.png](./resume/public/apple-touch-icon.png)
│   │   ├── [favicon.ico](./resume/public/favicon.ico)
│   │   ├── [manifest.json](./resume/public/manifest.json)
│   │   ├── [resume.schema.json](./resume/public/resume.schema.json)
│   │   ├── [robots.txt](./resume/public/robots.txt)
│   │   ├── [sitemap.xml](./resume/public/sitemap.xml)
│   │   └── [sw.js](./resume/public/sw.js)
│   ├── src/
│   │   ├── app/
│   │   │   ├── (auth)/
│   │   │   │   ├── forget-password/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./resume/src/app/(auth)/forget-password/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./resume/src/app/(auth)/forget-password/page.tsx)
│   │   │   │   ├── profile/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./resume/src/app/(auth)/profile/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./resume/src/app/(auth)/profile/page.tsx)
│   │   │   │   ├── reset-password/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./resume/src/app/(auth)/reset-password/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./resume/src/app/(auth)/reset-password/page.tsx)
│   │   │   │   ├── sign-in/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./resume/src/app/(auth)/sign-in/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./resume/src/app/(auth)/sign-in/page.tsx)
│   │   │   │   └── sign-up/
│   │   │   │       ├── __tests__/
│   │   │   │       │   └── [page.test.tsx](./resume/src/app/(auth)/sign-up/__tests__/page.test.tsx)
│   │   │   │       └── [page.tsx](./resume/src/app/(auth)/sign-up/page.tsx)
│   │   │   ├── (info)/
│   │   │   │   ├── about/
│   │   │   │   │   └── [page.tsx](./resume/src/app/(info)/about/page.tsx)
│   │   │   │   ├── downloads/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./resume/src/app/(info)/downloads/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./resume/src/app/(info)/downloads/page.tsx)
│   │   │   │   └── version/
│   │   │   │       └── [page.tsx](./resume/src/app/(info)/version/page.tsx)
│   │   │   ├── __tests__/
│   │   │   │   ├── [error.test.tsx](./resume/src/app/__tests__/error.test.tsx)
│   │   │   │   ├── [forbidden.test.tsx](./resume/src/app/__tests__/forbidden.test.tsx)
│   │   │   │   ├── [global-error.test.tsx](./resume/src/app/__tests__/global-error.test.tsx)
│   │   │   │   ├── [layout.test.tsx](./resume/src/app/__tests__/layout.test.tsx)
│   │   │   │   ├── [loading.test.tsx](./resume/src/app/__tests__/loading.test.tsx)
│   │   │   │   ├── [not-found.test.tsx](./resume/src/app/__tests__/not-found.test.tsx)
│   │   │   │   ├── [page.test.tsx](./resume/src/app/__tests__/page.test.tsx)
│   │   │   │   ├── [robots.test.ts](./resume/src/app/__tests__/robots.test.ts)
│   │   │   │   ├── [shell.test.tsx](./resume/src/app/__tests__/shell.test.tsx)
│   │   │   │   ├── [template.test.tsx](./resume/src/app/__tests__/template.test.tsx)
│   │   │   │   └── [unauthorized.test.tsx](./resume/src/app/__tests__/unauthorized.test.tsx)
│   │   │   ├── [default.tsx](./resume/src/app/default.tsx)
│   │   │   ├── [error.tsx](./resume/src/app/error.tsx)
│   │   │   ├── [favicon.ico](./resume/src/app/favicon.ico)
│   │   │   ├── [forbidden.tsx](./resume/src/app/forbidden.tsx)
│   │   │   ├── [global-error.tsx](./resume/src/app/global-error.tsx)
│   │   │   ├── [layout.tsx](./resume/src/app/layout.tsx)
│   │   │   ├── [loading.tsx](./resume/src/app/loading.tsx)
│   │   │   ├── [not-found.tsx](./resume/src/app/not-found.tsx)
│   │   │   ├── [page.tsx](./resume/src/app/page.tsx)
│   │   │   ├── [robots.ts](./resume/src/app/robots.ts)
│   │   │   ├── [template.tsx](./resume/src/app/template.tsx)
│   │   │   └── [unauthorized.tsx](./resume/src/app/unauthorized.tsx)
│   │   ├── components/
│   │   │   ├── app/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [ThemeToggle.test.tsx](./resume/src/components/app/__tests__/ThemeToggle.test.tsx)
│   │   │   │   └── [ThemeToggle.tsx](./resume/src/components/app/ThemeToggle.tsx)
│   │   │   ├── resume/
│   │   │   │   ├── data/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [DataPanel.test.tsx](./resume/src/components/resume/data/__tests__/DataPanel.test.tsx)
│   │   │   │   │   └── [DataPanel.tsx](./resume/src/components/resume/data/DataPanel.tsx)
│   │   │   │   ├── editor/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [CertificationsForm.test.tsx](./resume/src/components/resume/editor/__tests__/CertificationsForm.test.tsx)
│   │   │   │   │   │   ├── [EditorPanel.test.tsx](./resume/src/components/resume/editor/__tests__/EditorPanel.test.tsx)
│   │   │   │   │   │   ├── [EducationForm.test.tsx](./resume/src/components/resume/editor/__tests__/EducationForm.test.tsx)
│   │   │   │   │   │   ├── [ExperienceForm.test.tsx](./resume/src/components/resume/editor/__tests__/ExperienceForm.test.tsx)
│   │   │   │   │   │   ├── [LanguagesForm.test.tsx](./resume/src/components/resume/editor/__tests__/LanguagesForm.test.tsx)
│   │   │   │   │   │   ├── [PersonalForm.test.tsx](./resume/src/components/resume/editor/__tests__/PersonalForm.test.tsx)
│   │   │   │   │   │   ├── [ProjectForm.test.tsx](./resume/src/components/resume/editor/__tests__/ProjectForm.test.tsx)
│   │   │   │   │   │   ├── [SkillsForm.test.tsx](./resume/src/components/resume/editor/__tests__/SkillsForm.test.tsx)
│   │   │   │   │   │   └── [SortableList.test.tsx](./resume/src/components/resume/editor/__tests__/SortableList.test.tsx)
│   │   │   │   │   ├── [CertificationsForm.tsx](./resume/src/components/resume/editor/CertificationsForm.tsx)
│   │   │   │   │   ├── [EditorPanel.tsx](./resume/src/components/resume/editor/EditorPanel.tsx)
│   │   │   │   │   ├── [EducationForm.tsx](./resume/src/components/resume/editor/EducationForm.tsx)
│   │   │   │   │   ├── [ExperienceForm.tsx](./resume/src/components/resume/editor/ExperienceForm.tsx)
│   │   │   │   │   ├── [Field.tsx](./resume/src/components/resume/editor/Field.tsx)
│   │   │   │   │   ├── [InterestsForm.tsx](./resume/src/components/resume/editor/InterestsForm.tsx)
│   │   │   │   │   ├── [LanguagesForm.tsx](./resume/src/components/resume/editor/LanguagesForm.tsx)
│   │   │   │   │   ├── [ListItemCard.tsx](./resume/src/components/resume/editor/ListItemCard.tsx)
│   │   │   │   │   ├── [PersonalForm.tsx](./resume/src/components/resume/editor/PersonalForm.tsx)
│   │   │   │   │   ├── [ProjectForm.tsx](./resume/src/components/resume/editor/ProjectForm.tsx)
│   │   │   │   │   ├── [SkillsForm.tsx](./resume/src/components/resume/editor/SkillsForm.tsx)
│   │   │   │   │   ├── [SortableList.tsx](./resume/src/components/resume/editor/SortableList.tsx)
│   │   │   │   │   └── [SummaryForm.tsx](./resume/src/components/resume/editor/SummaryForm.tsx)
│   │   │   │   ├── preview/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [PreviewPanel.test.tsx](./resume/src/components/resume/preview/__tests__/PreviewPanel.test.tsx)
│   │   │   │   │   │   ├── [PreviewToolbar.test.tsx](./resume/src/components/resume/preview/__tests__/PreviewToolbar.test.tsx)
│   │   │   │   │   │   ├── [ProfileSwitcher.test.tsx](./resume/src/components/resume/preview/__tests__/ProfileSwitcher.test.tsx)
│   │   │   │   │   │   ├── [TemplatePicker.test.tsx](./resume/src/components/resume/preview/__tests__/TemplatePicker.test.tsx)
│   │   │   │   │   │   └── [templateFilters.test.ts](./resume/src/components/resume/preview/__tests__/templateFilters.test.ts)
│   │   │   │   │   ├── [PreviewPanel.tsx](./resume/src/components/resume/preview/PreviewPanel.tsx)
│   │   │   │   │   ├── [PreviewStage.tsx](./resume/src/components/resume/preview/PreviewStage.tsx)
│   │   │   │   │   ├── [PreviewToolbar.tsx](./resume/src/components/resume/preview/PreviewToolbar.tsx)
│   │   │   │   │   ├── [ProfileSwitcher.tsx](./resume/src/components/resume/preview/ProfileSwitcher.tsx)
│   │   │   │   │   ├── [ResumeSheet.tsx](./resume/src/components/resume/preview/ResumeSheet.tsx)
│   │   │   │   │   ├── [TemplatePicker.tsx](./resume/src/components/resume/preview/TemplatePicker.tsx)
│   │   │   │   │   ├── [TemplateThumbnail.tsx](./resume/src/components/resume/preview/TemplateThumbnail.tsx)
│   │   │   │   │   ├── [ZoomControls.tsx](./resume/src/components/resume/preview/ZoomControls.tsx)
│   │   │   │   │   └── [templateFilters.ts](./resume/src/components/resume/preview/templateFilters.ts)
│   │   │   │   ├── template/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [primitives.test.tsx](./resume/src/components/resume/template/__tests__/primitives.test.tsx)
│   │   │   │   │   └── [primitives.tsx](./resume/src/components/resume/template/primitives.tsx)
│   │   │   │   └── templates/
│   │   │   │       ├── __tests__/
│   │   │   │       │   └── [templates.test.tsx](./resume/src/components/resume/templates/__tests__/templates.test.tsx)
│   │   │   │       ├── [AcademicTemplate.tsx](./resume/src/components/resume/templates/AcademicTemplate.tsx)
│   │   │   │       ├── [AlignTemplate.tsx](./resume/src/components/resume/templates/AlignTemplate.tsx)
│   │   │   │       ├── [AuroraTemplate.tsx](./resume/src/components/resume/templates/AuroraTemplate.tsx)
│   │   │   │       ├── [BeaconTemplate.tsx](./resume/src/components/resume/templates/BeaconTemplate.tsx)
│   │   │   │       ├── [BoldTemplate.tsx](./resume/src/components/resume/templates/BoldTemplate.tsx)
│   │   │   │       ├── [ClassicTemplate.tsx](./resume/src/components/resume/templates/ClassicTemplate.tsx)
│   │   │   │       ├── [CompactTemplate.tsx](./resume/src/components/resume/templates/CompactTemplate.tsx)
│   │   │   │       ├── [CreativeTemplate.tsx](./resume/src/components/resume/templates/CreativeTemplate.tsx)
│   │   │   │       ├── [ElegantTemplate.tsx](./resume/src/components/resume/templates/ElegantTemplate.tsx)
│   │   │   │       ├── [EmberTemplate.tsx](./resume/src/components/resume/templates/EmberTemplate.tsx)
│   │   │   │       ├── [ExecutiveTemplate.tsx](./resume/src/components/resume/templates/ExecutiveTemplate.tsx)
│   │   │   │       ├── [InkwellTemplate.tsx](./resume/src/components/resume/templates/InkwellTemplate.tsx)
│   │   │   │       ├── [KineticTemplate.tsx](./resume/src/components/resume/templates/KineticTemplate.tsx)
│   │   │   │       ├── [LatticeTemplate.tsx](./resume/src/components/resume/templates/LatticeTemplate.tsx)
│   │   │   │       ├── [MeadowTemplate.tsx](./resume/src/components/resume/templates/MeadowTemplate.tsx)
│   │   │   │       ├── [MinimalTemplate.tsx](./resume/src/components/resume/templates/MinimalTemplate.tsx)
│   │   │   │       ├── [ModernTemplate.tsx](./resume/src/components/resume/templates/ModernTemplate.tsx)
│   │   │   │       ├── [NovaTemplate.tsx](./resume/src/components/resume/templates/NovaTemplate.tsx)
│   │   │   │       ├── [OrbitTemplate.tsx](./resume/src/components/resume/templates/OrbitTemplate.tsx)
│   │   │   │       ├── [PinnacleTemplate.tsx](./resume/src/components/resume/templates/PinnacleTemplate.tsx)
│   │   │   │       ├── [ProfessionalTemplate.tsx](./resume/src/components/resume/templates/ProfessionalTemplate.tsx)
│   │   │   │       ├── [PulseTemplate.tsx](./resume/src/components/resume/templates/PulseTemplate.tsx)
│   │   │   │       ├── [QuartzTemplate.tsx](./resume/src/components/resume/templates/QuartzTemplate.tsx)
│   │   │   │       ├── [SierraTemplate.tsx](./resume/src/components/resume/templates/SierraTemplate.tsx)
│   │   │   │       ├── [SimpleTemplate.tsx](./resume/src/components/resume/templates/SimpleTemplate.tsx)
│   │   │   │       ├── [SlateTemplate.tsx](./resume/src/components/resume/templates/SlateTemplate.tsx)
│   │   │   │       ├── [SterlingTemplate.tsx](./resume/src/components/resume/templates/SterlingTemplate.tsx)
│   │   │   │       ├── [SummitTemplate.tsx](./resume/src/components/resume/templates/SummitTemplate.tsx)
│   │   │   │       ├── [TechnicalTemplate.tsx](./resume/src/components/resume/templates/TechnicalTemplate.tsx)
│   │   │   │       ├── [TimberTemplate.tsx](./resume/src/components/resume/templates/TimberTemplate.tsx)
│   │   │   │       ├── [TopazTemplate.tsx](./resume/src/components/resume/templates/TopazTemplate.tsx)
│   │   │   │       ├── [WaveTemplate.tsx](./resume/src/components/resume/templates/WaveTemplate.tsx)
│   │   │   │       ├── [index.ts](./resume/src/components/resume/templates/index.ts)
│   │   │   │       └── [types.ts](./resume/src/components/resume/templates/types.ts)
│   │   │   └── templates/
│   │   │       ├── __tests__/
│   │   │       │   ├── [AboutTemplate.test.tsx](./resume/src/components/templates/__tests__/AboutTemplate.test.tsx)
│   │   │       │   ├── [DownloadsTemplate.test.tsx](./resume/src/components/templates/__tests__/DownloadsTemplate.test.tsx)
│   │   │       │   ├── [ErrorTemplate.test.tsx](./resume/src/components/templates/__tests__/ErrorTemplate.test.tsx)
│   │   │       │   └── [VersionTemplate.test.tsx](./resume/src/components/templates/__tests__/VersionTemplate.test.tsx)
│   │   │       ├── [AboutTemplate.tsx](./resume/src/components/templates/AboutTemplate.tsx)
│   │   │       ├── [DownloadsTemplate.tsx](./resume/src/components/templates/DownloadsTemplate.tsx)
│   │   │       ├── [ErrorTemplate.tsx](./resume/src/components/templates/ErrorTemplate.tsx)
│   │   │       └── [VersionTemplate.tsx](./resume/src/components/templates/VersionTemplate.tsx)
│   │   ├── data/
│   │   │   ├── __tests__/
│   │   │   │   ├── [examples.test.ts](./resume/src/data/__tests__/examples.test.ts)
│   │   │   │   ├── [paper.test.ts](./resume/src/data/__tests__/paper.test.ts)
│   │   │   │   └── [seed.test.ts](./resume/src/data/__tests__/seed.test.ts)
│   │   │   ├── [examples.ts](./resume/src/data/examples.ts)
│   │   │   ├── [paper.ts](./resume/src/data/paper.ts)
│   │   │   └── [seed.ts](./resume/src/data/seed.ts)
│   │   ├── hooks/
│   │   │   ├── __tests__/
│   │   │   │   ├── [useHistory.test.ts](./resume/src/hooks/__tests__/useHistory.test.ts)
│   │   │   │   ├── [useKeyboardShortcuts.test.ts](./resume/src/hooks/__tests__/useKeyboardShortcuts.test.ts)
│   │   │   │   ├── [useLocalStorage.test.ts](./resume/src/hooks/__tests__/useLocalStorage.test.ts)
│   │   │   │   ├── [useResumeProfiles.test.ts](./resume/src/hooks/__tests__/useResumeProfiles.test.ts)
│   │   │   │   ├── [useSWRegister.test.ts](./resume/src/hooks/__tests__/useSWRegister.test.ts)
│   │   │   │   └── [useTheme.test.ts](./resume/src/hooks/__tests__/useTheme.test.ts)
│   │   │   ├── [useHistory.ts](./resume/src/hooks/useHistory.ts)
│   │   │   ├── [useKeyboardShortcuts.ts](./resume/src/hooks/useKeyboardShortcuts.ts)
│   │   │   ├── [useLocalStorage.ts](./resume/src/hooks/useLocalStorage.ts)
│   │   │   ├── [useOverflowDetect.ts](./resume/src/hooks/useOverflowDetect.ts)
│   │   │   ├── [usePreviewScale.ts](./resume/src/hooks/usePreviewScale.ts)
│   │   │   ├── [useResumeProfiles.ts](./resume/src/hooks/useResumeProfiles.ts)
│   │   │   ├── [useSWRegister.ts](./resume/src/hooks/useSWRegister.ts)
│   │   │   └── [useTheme.ts](./resume/src/hooks/useTheme.ts)
│   │   ├── providers/
│   │   │   ├── __tests__/
│   │   │   │   └── [SWProvider.test.tsx](./resume/src/providers/__tests__/SWProvider.test.tsx)
│   │   │   └── [SWProvider.tsx](./resume/src/providers/SWProvider.tsx)
│   │   ├── routes/
│   │   │   ├── __tests__/
│   │   │   │   └── [ErrorPage.test.tsx](./resume/src/routes/__tests__/ErrorPage.test.tsx)
│   │   │   └── [ErrorPage.tsx](./resume/src/routes/ErrorPage.tsx)
│   │   ├── styles/
│   │   │   ├── [base.css](./resume/src/styles/base.css)
│   │   │   ├── [globals.css](./resume/src/styles/globals.css)
│   │   │   └── [themes.css](./resume/src/styles/themes.css)
│   │   ├── types/
│   │   │   └── [resume.ts](./resume/src/types/resume.ts)
│   │   └── utils/
│   │       ├── __tests__/
│   │       │   ├── [contact.test.ts](./resume/src/utils/__tests__/contact.test.ts)
│   │       │   ├── [count.test.ts](./resume/src/utils/__tests__/count.test.ts)
│   │       │   ├── [export.test.ts](./resume/src/utils/__tests__/export.test.ts)
│   │       │   ├── [fit.test.ts](./resume/src/utils/__tests__/fit.test.ts)
│   │       │   ├── [id.test.ts](./resume/src/utils/__tests__/id.test.ts)
│   │       │   ├── [io.test.ts](./resume/src/utils/__tests__/io.test.ts)
│   │       │   └── [text.test.ts](./resume/src/utils/__tests__/text.test.ts)
│   │       ├── [contact.ts](./resume/src/utils/contact.ts)
│   │       ├── [count.ts](./resume/src/utils/count.ts)
│   │       ├── [export.ts](./resume/src/utils/export.ts)
│   │       ├── [fit.ts](./resume/src/utils/fit.ts)
│   │       ├── [id.ts](./resume/src/utils/id.ts)
│   │       ├── [io.ts](./resume/src/utils/io.ts)
│   │       └── [text.ts](./resume/src/utils/text.ts)
│   ├── src-tauri/
│   │   ├── capabilities/
│   │   │   └── [default.json](./resume/src-tauri/capabilities/default.json)
│   │   ├── icons/
│   │   │   ├── [128x128.png](./resume/src-tauri/icons/128x128.png)
│   │   │   ├── [128x128@2x.png](./resume/src-tauri/icons/128x128@2x.png)
│   │   │   ├── [32x32.png](./resume/src-tauri/icons/32x32.png)
│   │   │   ├── [Square107x107Logo.png](./resume/src-tauri/icons/Square107x107Logo.png)
│   │   │   ├── [Square142x142Logo.png](./resume/src-tauri/icons/Square142x142Logo.png)
│   │   │   ├── [Square150x150Logo.png](./resume/src-tauri/icons/Square150x150Logo.png)
│   │   │   ├── [Square284x284Logo.png](./resume/src-tauri/icons/Square284x284Logo.png)
│   │   │   ├── [Square30x30Logo.png](./resume/src-tauri/icons/Square30x30Logo.png)
│   │   │   ├── [Square310x310Logo.png](./resume/src-tauri/icons/Square310x310Logo.png)
│   │   │   ├── [Square44x44Logo.png](./resume/src-tauri/icons/Square44x44Logo.png)
│   │   │   ├── [Square71x71Logo.png](./resume/src-tauri/icons/Square71x71Logo.png)
│   │   │   ├── [Square89x89Logo.png](./resume/src-tauri/icons/Square89x89Logo.png)
│   │   │   ├── [StoreLogo.png](./resume/src-tauri/icons/StoreLogo.png)
│   │   │   ├── [icon.icns](./resume/src-tauri/icons/icon.icns)
│   │   │   ├── [icon.ico](./resume/src-tauri/icons/icon.ico)
│   │   │   └── [icon.png](./resume/src-tauri/icons/icon.png)
│   │   ├── src/
│   │   │   ├── [lib.rs](./resume/src-tauri/src/lib.rs)
│   │   │   └── [main.rs](./resume/src-tauri/src/main.rs)
│   │   ├── [Cargo.lock](./resume/src-tauri/Cargo.lock)
│   │   ├── [Cargo.toml](./resume/src-tauri/Cargo.toml)
│   │   ├── [build.rs](./resume/src-tauri/build.rs)
│   │   └── [tauri.conf.json](./resume/src-tauri/tauri.conf.json)
│   ├── [AGENTS.md](./resume/AGENTS.md)
│   ├── [Dockerfile](./resume/Dockerfile)
│   ├── [LICENSE](./resume/LICENSE)
│   ├── [README.md](./resume/README.md)
│   ├── [docker-compose.yaml](./resume/docker-compose.yaml)
│   ├── [eslint.config.mts](./resume/eslint.config.mts)
│   ├── [jest.config.ts](./resume/jest.config.ts)
│   ├── [jest.setup.ts](./resume/jest.setup.ts)
│   ├── [next.config.ts](./resume/next.config.ts)
│   ├── [package.json](./resume/package.json)
│   ├── [playwright.config.ts](./resume/playwright.config.ts)
│   ├── [postcss.config.mjs](./resume/postcss.config.mjs)
│   └── [tsconfig.json](./resume/tsconfig.json)
├── [README.md](./README.md)
└── [TREE.md](./TREE.md)
```

555 directories, 1897 files
