# TREE

```text
├── doi/
│   ├── docs/
│   │   ├── [ARCHITECTURE.md](./doi/docs/ARCHITECTURE.md)
│   │   ├── [CONTRIBUTING.md](./doi/docs/CONTRIBUTING.md)
│   │   ├── [DOWNLOADS.md](./doi/docs/DOWNLOADS.md)
│   │   ├── [PACKAGING.md](./doi/docs/PACKAGING.md)
│   │   └── [ROADMAP.md](./doi/docs/ROADMAP.md)
│   ├── e2e/
│   │   └── [smoke.spec.ts](./doi/e2e/smoke.spec.ts)
│   ├── prisma/
│   │   ├── dbml/
│   │   │   └── [schema.dbml](./doi/prisma/dbml/schema.dbml)
│   │   ├── json-schema/
│   │   │   └── [json-schema.json](./doi/prisma/json-schema/json-schema.json)
│   │   └── [schema.prisma](./doi/prisma/schema.prisma)
│   ├── public/
│   │   ├── database/
│   │   │   ├── csv/
│   │   │   │   ├── [doi.references.csv](./doi/public/database/csv/doi.references.csv)
│   │   │   │   └── [doi.works.csv](./doi/public/database/csv/doi.works.csv)
│   │   │   ├── docs/
│   │   │   │   └── [swagger.json](./doi/public/database/docs/swagger.json)
│   │   │   ├── images/
│   │   │   │   └── [graph.svg](./doi/public/database/images/graph.svg)
│   │   │   ├── scripts/
│   │   │   │   ├── [analyse.py](./doi/public/database/scripts/analyse.py)
│   │   │   │   ├── [crawl.py](./doi/public/database/scripts/crawl.py)
│   │   │   │   ├── [to_csv.py](./doi/public/database/scripts/to_csv.py)
│   │   │   │   └── [visualise.py](./doi/public/database/scripts/visualise.py)
│   │   │   ├── temp/
│   │   │   │   └── [backfill_types.py](./doi/public/database/temp/backfill_types.py)
│   │   │   ├── [Makefile](./doi/public/database/Makefile)
│   │   │   ├── [README.md](./doi/public/database/README.md)
│   │   │   ├── [doi.db](./doi/public/database/doi.db)
│   │   │   ├── [metadata.json](./doi/public/database/metadata.json)
│   │   │   └── [pyproject.toml](./doi/public/database/pyproject.toml)
│   │   ├── icons/
│   │   │   ├── [icon-128x128.png](./doi/public/icons/icon-128x128.png)
│   │   │   ├── [icon-144x144.png](./doi/public/icons/icon-144x144.png)
│   │   │   ├── [icon-152x152.png](./doi/public/icons/icon-152x152.png)
│   │   │   ├── [icon-16x16.png](./doi/public/icons/icon-16x16.png)
│   │   │   ├── [icon-180x180.png](./doi/public/icons/icon-180x180.png)
│   │   │   ├── [icon-192x192.png](./doi/public/icons/icon-192x192.png)
│   │   │   ├── [icon-256x256.png](./doi/public/icons/icon-256x256.png)
│   │   │   ├── [icon-32x32.png](./doi/public/icons/icon-32x32.png)
│   │   │   ├── [icon-384x384.png](./doi/public/icons/icon-384x384.png)
│   │   │   ├── [icon-48x48.png](./doi/public/icons/icon-48x48.png)
│   │   │   ├── [icon-512x512.png](./doi/public/icons/icon-512x512.png)
│   │   │   ├── [icon-64x64.png](./doi/public/icons/icon-64x64.png)
│   │   │   ├── [icon-72x72.png](./doi/public/icons/icon-72x72.png)
│   │   │   ├── [icon-96x96.png](./doi/public/icons/icon-96x96.png)
│   │   │   └── [icon.svg](./doi/public/icons/icon.svg)
│   │   ├── wasm/
│   │   │   └── [sql-wasm.wasm](./doi/public/wasm/sql-wasm.wasm)
│   │   ├── [apple-touch-icon.png](./doi/public/apple-touch-icon.png)
│   │   ├── [favicon.ico](./doi/public/favicon.ico)
│   │   ├── [manifest.json](./doi/public/manifest.json)
│   │   ├── [robots.txt](./doi/public/robots.txt)
│   │   ├── [sitemap.xml](./doi/public/sitemap.xml)
│   │   └── [sw.js](./doi/public/sw.js)
│   ├── src/
│   │   ├── app/
│   │   │   ├── (app)/
│   │   │   │   ├── graph/
│   │   │   │   │   └── [page.tsx](./doi/src/app/(app)/graph/page.tsx)
│   │   │   │   ├── overview/
│   │   │   │   │   └── [page.tsx](./doi/src/app/(app)/overview/page.tsx)
│   │   │   │   └── search/
│   │   │   │       └── [page.tsx](./doi/src/app/(app)/search/page.tsx)
│   │   │   ├── (info)/
│   │   │   │   ├── about/
│   │   │   │   │   └── [page.tsx](./doi/src/app/(info)/about/page.tsx)
│   │   │   │   ├── downloads/
│   │   │   │   │   └── [page.tsx](./doi/src/app/(info)/downloads/page.tsx)
│   │   │   │   └── version/
│   │   │   │       └── [page.tsx](./doi/src/app/(info)/version/page.tsx)
│   │   │   ├── [default.tsx](./doi/src/app/default.tsx)
│   │   │   ├── [error.tsx](./doi/src/app/error.tsx)
│   │   │   ├── [favicon.ico](./doi/src/app/favicon.ico)
│   │   │   ├── [forbidden.tsx](./doi/src/app/forbidden.tsx)
│   │   │   ├── [global-error.tsx](./doi/src/app/global-error.tsx)
│   │   │   ├── [layout.tsx](./doi/src/app/layout.tsx)
│   │   │   ├── [loading.tsx](./doi/src/app/loading.tsx)
│   │   │   ├── [not-found.tsx](./doi/src/app/not-found.tsx)
│   │   │   ├── [page.tsx](./doi/src/app/page.tsx)
│   │   │   ├── [robots.ts](./doi/src/app/robots.ts)
│   │   │   └── [unauthorized.tsx](./doi/src/app/unauthorized.tsx)
│   │   ├── components/
│   │   │   ├── atoms/
│   │   │   │   ├── [SearchBox.tsx](./doi/src/components/atoms/SearchBox.tsx)
│   │   │   │   ├── [SearchResultItem.tsx](./doi/src/components/atoms/SearchResultItem.tsx)
│   │   │   │   └── [StatCard.tsx](./doi/src/components/atoms/StatCard.tsx)
│   │   │   ├── molecules/
│   │   │   │   ├── [CitationGraph.tsx](./doi/src/components/molecules/CitationGraph.tsx)
│   │   │   │   ├── [ErrorState.tsx](./doi/src/components/molecules/ErrorState.tsx)
│   │   │   │   ├── [LoadingState.tsx](./doi/src/components/molecules/LoadingState.tsx)
│   │   │   │   ├── [RankingList.tsx](./doi/src/components/molecules/RankingList.tsx)
│   │   │   │   ├── [SearchResults.tsx](./doi/src/components/molecules/SearchResults.tsx)
│   │   │   │   └── [YearChart.tsx](./doi/src/components/molecules/YearChart.tsx)
│   │   │   ├── organisms/
│   │   │   │   └── [Header.tsx](./doi/src/components/organisms/Header.tsx)
│   │   │   └── templates/
│   │   │       ├── [AboutTemplate.tsx](./doi/src/components/templates/AboutTemplate.tsx)
│   │   │       ├── [DownloadsTemplate.tsx](./doi/src/components/templates/DownloadsTemplate.tsx)
│   │   │       ├── [ErrorTemplate.tsx](./doi/src/components/templates/ErrorTemplate.tsx)
│   │   │       ├── [HomeTemplate.tsx](./doi/src/components/templates/HomeTemplate.tsx)
│   │   │       └── [VersionTemplate.tsx](./doi/src/components/templates/VersionTemplate.tsx)
│   │   ├── content/
│   │   │   ├── [about.ts](./doi/src/content/about.ts)
│   │   │   ├── [download.ts](./doi/src/content/download.ts)
│   │   │   └── [version.ts](./doi/src/content/version.ts)
│   │   ├── lib/
│   │   │   ├── __tests__/
│   │   │   │   ├── [abstract.test.ts](./doi/src/lib/__tests__/abstract.test.ts)
│   │   │   │   ├── [queries.test.ts](./doi/src/lib/__tests__/queries.test.ts)
│   │   │   │   └── [sqlite.test.ts](./doi/src/lib/__tests__/sqlite.test.ts)
│   │   │   ├── stubs/
│   │   │   │   └── [node-builtins.ts](./doi/src/lib/stubs/node-builtins.ts)
│   │   │   ├── [abstract.ts](./doi/src/lib/abstract.ts)
│   │   │   ├── [queries.ts](./doi/src/lib/queries.ts)
│   │   │   └── [sqlite.ts](./doi/src/lib/sqlite.ts)
│   │   ├── providers/
│   │   │   ├── [DoiProvider.tsx](./doi/src/providers/DoiProvider.tsx)
│   │   │   └── [Shell.tsx](./doi/src/providers/Shell.tsx)
│   │   ├── styles/
│   │   │   ├── [globals.css](./doi/src/styles/globals.css)
│   │   │   └── [themes.css](./doi/src/styles/themes.css)
│   │   └── types/
│   │       └── [doi.ts](./doi/src/types/doi.ts)
│   ├── src-tauri/
│   │   ├── capabilities/
│   │   │   └── [default.json](./doi/src-tauri/capabilities/default.json)
│   │   ├── icons/
│   │   │   ├── android/
│   │   │   │   ├── mipmap-anydpi-v26/
│   │   │   │   │   └── [ic_launcher.xml](./doi/src-tauri/icons/android/mipmap-anydpi-v26/ic_launcher.xml)
│   │   │   │   ├── mipmap-hdpi/
│   │   │   │   │   ├── [ic_launcher.png](./doi/src-tauri/icons/android/mipmap-hdpi/ic_launcher.png)
│   │   │   │   │   ├── [ic_launcher_foreground.png](./doi/src-tauri/icons/android/mipmap-hdpi/ic_launcher_foreground.png)
│   │   │   │   │   └── [ic_launcher_round.png](./doi/src-tauri/icons/android/mipmap-hdpi/ic_launcher_round.png)
│   │   │   │   ├── mipmap-mdpi/
│   │   │   │   │   ├── [ic_launcher.png](./doi/src-tauri/icons/android/mipmap-mdpi/ic_launcher.png)
│   │   │   │   │   ├── [ic_launcher_foreground.png](./doi/src-tauri/icons/android/mipmap-mdpi/ic_launcher_foreground.png)
│   │   │   │   │   └── [ic_launcher_round.png](./doi/src-tauri/icons/android/mipmap-mdpi/ic_launcher_round.png)
│   │   │   │   ├── mipmap-xhdpi/
│   │   │   │   │   ├── [ic_launcher.png](./doi/src-tauri/icons/android/mipmap-xhdpi/ic_launcher.png)
│   │   │   │   │   ├── [ic_launcher_foreground.png](./doi/src-tauri/icons/android/mipmap-xhdpi/ic_launcher_foreground.png)
│   │   │   │   │   └── [ic_launcher_round.png](./doi/src-tauri/icons/android/mipmap-xhdpi/ic_launcher_round.png)
│   │   │   │   ├── mipmap-xxhdpi/
│   │   │   │   │   ├── [ic_launcher.png](./doi/src-tauri/icons/android/mipmap-xxhdpi/ic_launcher.png)
│   │   │   │   │   ├── [ic_launcher_foreground.png](./doi/src-tauri/icons/android/mipmap-xxhdpi/ic_launcher_foreground.png)
│   │   │   │   │   └── [ic_launcher_round.png](./doi/src-tauri/icons/android/mipmap-xxhdpi/ic_launcher_round.png)
│   │   │   │   ├── mipmap-xxxhdpi/
│   │   │   │   │   ├── [ic_launcher.png](./doi/src-tauri/icons/android/mipmap-xxxhdpi/ic_launcher.png)
│   │   │   │   │   ├── [ic_launcher_foreground.png](./doi/src-tauri/icons/android/mipmap-xxxhdpi/ic_launcher_foreground.png)
│   │   │   │   │   └── [ic_launcher_round.png](./doi/src-tauri/icons/android/mipmap-xxxhdpi/ic_launcher_round.png)
│   │   │   │   └── values/
│   │   │   │       └── [ic_launcher_background.xml](./doi/src-tauri/icons/android/values/ic_launcher_background.xml)
│   │   │   ├── ios/
│   │   │   │   ├── [AppIcon-20x20@1x.png](./doi/src-tauri/icons/ios/AppIcon-20x20@1x.png)
│   │   │   │   ├── [AppIcon-20x20@2x-1.png](./doi/src-tauri/icons/ios/AppIcon-20x20@2x-1.png)
│   │   │   │   ├── [AppIcon-20x20@2x.png](./doi/src-tauri/icons/ios/AppIcon-20x20@2x.png)
│   │   │   │   ├── [AppIcon-20x20@3x.png](./doi/src-tauri/icons/ios/AppIcon-20x20@3x.png)
│   │   │   │   ├── [AppIcon-29x29@1x.png](./doi/src-tauri/icons/ios/AppIcon-29x29@1x.png)
│   │   │   │   ├── [AppIcon-29x29@2x-1.png](./doi/src-tauri/icons/ios/AppIcon-29x29@2x-1.png)
│   │   │   │   ├── [AppIcon-29x29@2x.png](./doi/src-tauri/icons/ios/AppIcon-29x29@2x.png)
│   │   │   │   ├── [AppIcon-29x29@3x.png](./doi/src-tauri/icons/ios/AppIcon-29x29@3x.png)
│   │   │   │   ├── [AppIcon-40x40@1x.png](./doi/src-tauri/icons/ios/AppIcon-40x40@1x.png)
│   │   │   │   ├── [AppIcon-40x40@2x-1.png](./doi/src-tauri/icons/ios/AppIcon-40x40@2x-1.png)
│   │   │   │   ├── [AppIcon-40x40@2x.png](./doi/src-tauri/icons/ios/AppIcon-40x40@2x.png)
│   │   │   │   ├── [AppIcon-40x40@3x.png](./doi/src-tauri/icons/ios/AppIcon-40x40@3x.png)
│   │   │   │   ├── [AppIcon-512@2x.png](./doi/src-tauri/icons/ios/AppIcon-512@2x.png)
│   │   │   │   ├── [AppIcon-60x60@2x.png](./doi/src-tauri/icons/ios/AppIcon-60x60@2x.png)
│   │   │   │   ├── [AppIcon-60x60@3x.png](./doi/src-tauri/icons/ios/AppIcon-60x60@3x.png)
│   │   │   │   ├── [AppIcon-76x76@1x.png](./doi/src-tauri/icons/ios/AppIcon-76x76@1x.png)
│   │   │   │   ├── [AppIcon-76x76@2x.png](./doi/src-tauri/icons/ios/AppIcon-76x76@2x.png)
│   │   │   │   └── [AppIcon-83.5x83.5@2x.png](./doi/src-tauri/icons/ios/AppIcon-83.5x83.5@2x.png)
│   │   │   ├── [128x128.png](./doi/src-tauri/icons/128x128.png)
│   │   │   ├── [128x128@2x.png](./doi/src-tauri/icons/128x128@2x.png)
│   │   │   ├── [32x32.png](./doi/src-tauri/icons/32x32.png)
│   │   │   ├── [64x64.png](./doi/src-tauri/icons/64x64.png)
│   │   │   ├── [Square107x107Logo.png](./doi/src-tauri/icons/Square107x107Logo.png)
│   │   │   ├── [Square142x142Logo.png](./doi/src-tauri/icons/Square142x142Logo.png)
│   │   │   ├── [Square150x150Logo.png](./doi/src-tauri/icons/Square150x150Logo.png)
│   │   │   ├── [Square284x284Logo.png](./doi/src-tauri/icons/Square284x284Logo.png)
│   │   │   ├── [Square30x30Logo.png](./doi/src-tauri/icons/Square30x30Logo.png)
│   │   │   ├── [Square310x310Logo.png](./doi/src-tauri/icons/Square310x310Logo.png)
│   │   │   ├── [Square44x44Logo.png](./doi/src-tauri/icons/Square44x44Logo.png)
│   │   │   ├── [Square71x71Logo.png](./doi/src-tauri/icons/Square71x71Logo.png)
│   │   │   ├── [Square89x89Logo.png](./doi/src-tauri/icons/Square89x89Logo.png)
│   │   │   ├── [StoreLogo.png](./doi/src-tauri/icons/StoreLogo.png)
│   │   │   ├── [create-icons.sh](./doi/src-tauri/icons/create-icons.sh)
│   │   │   ├── [icon.icns](./doi/src-tauri/icons/icon.icns)
│   │   │   ├── [icon.ico](./doi/src-tauri/icons/icon.ico)
│   │   │   └── [icon.png](./doi/src-tauri/icons/icon.png)
│   │   ├── src/
│   │   │   ├── [lib.rs](./doi/src-tauri/src/lib.rs)
│   │   │   └── [main.rs](./doi/src-tauri/src/main.rs)
│   │   ├── [Cargo.lock](./doi/src-tauri/Cargo.lock)
│   │   ├── [Cargo.toml](./doi/src-tauri/Cargo.toml)
│   │   ├── [build.rs](./doi/src-tauri/build.rs)
│   │   └── [tauri.conf.json](./doi/src-tauri/tauri.conf.json)
│   ├── [AGENTS.md](./doi/AGENTS.md)
│   ├── [eslint.config.mts](./doi/eslint.config.mts)
│   ├── [jest.config.ts](./doi/jest.config.ts)
│   ├── [jest.setup.ts](./doi/jest.setup.ts)
│   ├── [next.config.ts](./doi/next.config.ts)
│   ├── [package.json](./doi/package.json)
│   ├── [playwright.config.ts](./doi/playwright.config.ts)
│   ├── [postcss.config.mjs](./doi/postcss.config.mjs)
│   └── [tsconfig.json](./doi/tsconfig.json)
├── lingo/
│   ├── docs/
│   │   ├── [ARCHITECTURE.md](./lingo/docs/ARCHITECTURE.md)
│   │   ├── [CONTRIBUTING.md](./lingo/docs/CONTRIBUTING.md)
│   │   ├── [DOWNLOADS.md](./lingo/docs/DOWNLOADS.md)
│   │   ├── [PACKAGING.md](./lingo/docs/PACKAGING.md)
│   │   └── [ROADMAP.md](./lingo/docs/ROADMAP.md)
│   ├── e2e/
│   │   ├── screenshots/
│   │   │   ├── [about.png](./lingo/e2e/screenshots/about.png)
│   │   │   ├── [downloads.png](./lingo/e2e/screenshots/downloads.png)
│   │   │   ├── [home.png](./lingo/e2e/screenshots/home.png)
│   │   │   └── [version.png](./lingo/e2e/screenshots/version.png)
│   │   ├── [about.spec.ts](./lingo/e2e/about.spec.ts)
│   │   ├── [downloads.spec.ts](./lingo/e2e/downloads.spec.ts)
│   │   ├── [home.spec.ts](./lingo/e2e/home.spec.ts)
│   │   └── [version.spec.ts](./lingo/e2e/version.spec.ts)
│   ├── public/
│   │   ├── audio/
│   │   │   ├── 3/
│   │   │   │   ├── [a.mp3](./lingo/public/audio/3/a.mp3)
│   │   │   │   ├── [as.mp3](./lingo/public/audio/3/as.mp3)
│   │   │   │   ├── [b.mp3](./lingo/public/audio/3/b.mp3)
│   │   │   │   ├── [c.mp3](./lingo/public/audio/3/c.mp3)
│   │   │   │   ├── [cs.mp3](./lingo/public/audio/3/cs.mp3)
│   │   │   │   ├── [d.mp3](./lingo/public/audio/3/d.mp3)
│   │   │   │   ├── [ds.mp3](./lingo/public/audio/3/ds.mp3)
│   │   │   │   ├── [e.mp3](./lingo/public/audio/3/e.mp3)
│   │   │   │   ├── [f.mp3](./lingo/public/audio/3/f.mp3)
│   │   │   │   ├── [fs.mp3](./lingo/public/audio/3/fs.mp3)
│   │   │   │   ├── [g.mp3](./lingo/public/audio/3/g.mp3)
│   │   │   │   └── [gs.mp3](./lingo/public/audio/3/gs.mp3)
│   │   │   └── 4/
│   │   │       └── [c.mp3](./lingo/public/audio/4/c.mp3)
│   │   ├── data/
│   │   │   └── [words.json](./lingo/public/data/words.json)
│   │   ├── icons/
│   │   │   ├── [icon-128x128.png](./lingo/public/icons/icon-128x128.png)
│   │   │   ├── [icon-144x144.png](./lingo/public/icons/icon-144x144.png)
│   │   │   ├── [icon-152x152.png](./lingo/public/icons/icon-152x152.png)
│   │   │   ├── [icon-16x16.png](./lingo/public/icons/icon-16x16.png)
│   │   │   ├── [icon-180x180.png](./lingo/public/icons/icon-180x180.png)
│   │   │   ├── [icon-192x192.png](./lingo/public/icons/icon-192x192.png)
│   │   │   ├── [icon-256x256.png](./lingo/public/icons/icon-256x256.png)
│   │   │   ├── [icon-32x32.png](./lingo/public/icons/icon-32x32.png)
│   │   │   ├── [icon-384x384.png](./lingo/public/icons/icon-384x384.png)
│   │   │   ├── [icon-48x48.png](./lingo/public/icons/icon-48x48.png)
│   │   │   ├── [icon-512x512.png](./lingo/public/icons/icon-512x512.png)
│   │   │   ├── [icon-64x64.png](./lingo/public/icons/icon-64x64.png)
│   │   │   ├── [icon-72x72.png](./lingo/public/icons/icon-72x72.png)
│   │   │   ├── [icon-96x96.png](./lingo/public/icons/icon-96x96.png)
│   │   │   └── [icon.svg](./lingo/public/icons/icon.svg)
│   │   ├── models/
│   │   │   └── [sign-model.onnx](./lingo/public/models/sign-model.onnx)
│   │   ├── [apple-touch-icon.png](./lingo/public/apple-touch-icon.png)
│   │   ├── [favicon.ico](./lingo/public/favicon.ico)
│   │   ├── [manifest.json](./lingo/public/manifest.json)
│   │   ├── [robots.txt](./lingo/public/robots.txt)
│   │   ├── [sitemap.xml](./lingo/public/sitemap.xml)
│   │   └── [sw.js](./lingo/public/sw.js)
│   ├── src/
│   │   ├── app/
│   │   │   ├── (auth)/
│   │   │   │   ├── forget-password/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./lingo/src/app/(auth)/forget-password/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./lingo/src/app/(auth)/forget-password/page.tsx)
│   │   │   │   ├── profile/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./lingo/src/app/(auth)/profile/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./lingo/src/app/(auth)/profile/page.tsx)
│   │   │   │   ├── reset-password/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./lingo/src/app/(auth)/reset-password/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./lingo/src/app/(auth)/reset-password/page.tsx)
│   │   │   │   ├── sign-in/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./lingo/src/app/(auth)/sign-in/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./lingo/src/app/(auth)/sign-in/page.tsx)
│   │   │   │   └── sign-up/
│   │   │   │       ├── __tests__/
│   │   │   │       │   └── [page.test.tsx](./lingo/src/app/(auth)/sign-up/__tests__/page.test.tsx)
│   │   │   │       └── [page.tsx](./lingo/src/app/(auth)/sign-up/page.tsx)
│   │   │   ├── (games)/
│   │   │   │   ├── (arts)/
│   │   │   │   │   ├── colors/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   └── [page.test.tsx](./lingo/src/app/(games)/(arts)/colors/__tests__/page.test.tsx)
│   │   │   │   │   │   ├── css/
│   │   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   │   └── [page.test.tsx](./lingo/src/app/(games)/(arts)/colors/css/__tests__/page.test.tsx)
│   │   │   │   │   │   │   ├── gradient/
│   │   │   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   │   │   └── [page.test.tsx](./lingo/src/app/(games)/(arts)/colors/css/gradient/__tests__/page.test.tsx)
│   │   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(arts)/colors/css/gradient/page.tsx)
│   │   │   │   │   │   │   ├── palette/
│   │   │   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   │   │   └── [page.test.tsx](./lingo/src/app/(games)/(arts)/colors/css/palette/__tests__/page.test.tsx)
│   │   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(arts)/colors/css/palette/page.tsx)
│   │   │   │   │   │   │   ├── theme/
│   │   │   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   │   │   └── [page.test.tsx](./lingo/src/app/(games)/(arts)/colors/css/theme/__tests__/page.test.tsx)
│   │   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(arts)/colors/css/theme/page.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(arts)/colors/css/page.tsx)
│   │   │   │   │   │   ├── harmony/
│   │   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   │   └── [page.test.tsx](./lingo/src/app/(games)/(arts)/colors/harmony/__tests__/page.test.tsx)
│   │   │   │   │   │   │   ├── mixer/
│   │   │   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   │   │   └── [page.test.tsx](./lingo/src/app/(games)/(arts)/colors/harmony/mixer/__tests__/page.test.tsx)
│   │   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(arts)/colors/harmony/mixer/page.tsx)
│   │   │   │   │   │   │   ├── schemes/
│   │   │   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   │   │   └── [page.test.tsx](./lingo/src/app/(games)/(arts)/colors/harmony/schemes/__tests__/page.test.tsx)
│   │   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(arts)/colors/harmony/schemes/page.tsx)
│   │   │   │   │   │   │   ├── wheel/
│   │   │   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   │   │   └── [page.test.tsx](./lingo/src/app/(games)/(arts)/colors/harmony/wheel/__tests__/page.test.tsx)
│   │   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(arts)/colors/harmony/wheel/page.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(arts)/colors/harmony/page.tsx)
│   │   │   │   │   │   ├── models/
│   │   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   │   └── [page.test.tsx](./lingo/src/app/(games)/(arts)/colors/models/__tests__/page.test.tsx)
│   │   │   │   │   │   │   ├── adjuster/
│   │   │   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   │   │   └── [page.test.tsx](./lingo/src/app/(games)/(arts)/colors/models/adjuster/__tests__/page.test.tsx)
│   │   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(arts)/colors/models/adjuster/page.tsx)
│   │   │   │   │   │   │   ├── converter/
│   │   │   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   │   │   └── [page.test.tsx](./lingo/src/app/(games)/(arts)/colors/models/converter/__tests__/page.test.tsx)
│   │   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(arts)/colors/models/converter/page.tsx)
│   │   │   │   │   │   │   ├── random/
│   │   │   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   │   │   └── [page.test.tsx](./lingo/src/app/(games)/(arts)/colors/models/random/__tests__/page.test.tsx)
│   │   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(arts)/colors/models/random/page.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(arts)/colors/models/page.tsx)
│   │   │   │   │   │   ├── perception/
│   │   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   │   └── [page.test.tsx](./lingo/src/app/(games)/(arts)/colors/perception/__tests__/page.test.tsx)
│   │   │   │   │   │   │   ├── color-blindness/
│   │   │   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   │   │   └── [page.test.tsx](./lingo/src/app/(games)/(arts)/colors/perception/color-blindness/__tests__/page.test.tsx)
│   │   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(arts)/colors/perception/color-blindness/page.tsx)
│   │   │   │   │   │   │   ├── contrast/
│   │   │   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   │   │   └── [page.test.tsx](./lingo/src/app/(games)/(arts)/colors/perception/contrast/__tests__/page.test.tsx)
│   │   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(arts)/colors/perception/contrast/page.tsx)
│   │   │   │   │   │   │   ├── temperature/
│   │   │   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   │   │   └── [page.test.tsx](./lingo/src/app/(games)/(arts)/colors/perception/temperature/__tests__/page.test.tsx)
│   │   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(arts)/colors/perception/temperature/page.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(arts)/colors/perception/page.tsx)
│   │   │   │   │   │   ├── scales/
│   │   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   │   └── [page.test.tsx](./lingo/src/app/(games)/(arts)/colors/scales/__tests__/page.test.tsx)
│   │   │   │   │   │   │   ├── css-scale/
│   │   │   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   │   │   └── [page.test.tsx](./lingo/src/app/(games)/(arts)/colors/scales/css-scale/__tests__/page.test.tsx)
│   │   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(arts)/colors/scales/css-scale/page.tsx)
│   │   │   │   │   │   │   ├── opacity/
│   │   │   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   │   │   └── [page.test.tsx](./lingo/src/app/(games)/(arts)/colors/scales/opacity/__tests__/page.test.tsx)
│   │   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(arts)/colors/scales/opacity/page.tsx)
│   │   │   │   │   │   │   ├── shades-tints/
│   │   │   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   │   │   └── [page.test.tsx](./lingo/src/app/(games)/(arts)/colors/scales/shades-tints/__tests__/page.test.tsx)
│   │   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(arts)/colors/scales/shades-tints/page.tsx)
│   │   │   │   │   │   │   ├── tint-shade-tone/
│   │   │   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   │   │   └── [page.test.tsx](./lingo/src/app/(games)/(arts)/colors/scales/tint-shade-tone/__tests__/page.test.tsx)
│   │   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(arts)/colors/scales/tint-shade-tone/page.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(arts)/colors/scales/page.tsx)
│   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(arts)/colors/page.tsx)
│   │   │   │   │   └── music/
│   │   │   │   │       ├── pitch/
│   │   │   │   │       │   ├── __tests__/
│   │   │   │   │       │   │   └── [page.test.tsx](./lingo/src/app/(games)/(arts)/music/pitch/__tests__/page.test.tsx)
│   │   │   │   │       │   └── [page.tsx](./lingo/src/app/(games)/(arts)/music/pitch/page.tsx)
│   │   │   │   │       └── [page.tsx](./lingo/src/app/(games)/(arts)/music/page.tsx)
│   │   │   │   ├── (health)/
│   │   │   │   │   ├── ophthalmology/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   └── [page.test.tsx](./lingo/src/app/(games)/(health)/ophthalmology/__tests__/page.test.tsx)
│   │   │   │   │   │   ├── vision/
│   │   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   │   └── [page.test.tsx](./lingo/src/app/(games)/(health)/ophthalmology/vision/__tests__/page.test.tsx)
│   │   │   │   │   │   │   ├── logmar/
│   │   │   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   │   │   └── [page.test.tsx](./lingo/src/app/(games)/(health)/ophthalmology/vision/logmar/__tests__/page.test.tsx)
│   │   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(health)/ophthalmology/vision/logmar/page.tsx)
│   │   │   │   │   │   │   ├── snellen/
│   │   │   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   │   │   └── [page.test.tsx](./lingo/src/app/(games)/(health)/ophthalmology/vision/snellen/__tests__/page.test.tsx)
│   │   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(health)/ophthalmology/vision/snellen/page.tsx)
│   │   │   │   │   │   │   ├── tumbling-e/
│   │   │   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   │   │   └── [page.test.tsx](./lingo/src/app/(games)/(health)/ophthalmology/vision/tumbling-e/__tests__/page.test.tsx)
│   │   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(health)/ophthalmology/vision/tumbling-e/page.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(health)/ophthalmology/vision/page.tsx)
│   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(health)/ophthalmology/page.tsx)
│   │   │   │   │   └── psychology/
│   │   │   │   │       ├── (practices)/
│   │   │   │   │       │   ├── counselling/
│   │   │   │   │       │   │   ├── __tests__/
│   │   │   │   │       │   │   │   └── [page.test.tsx](./lingo/src/app/(games)/(health)/psychology/(practices)/counselling/__tests__/page.test.tsx)
│   │   │   │   │       │   │   └── [page.tsx](./lingo/src/app/(games)/(health)/psychology/(practices)/counselling/page.tsx)
│   │   │   │   │       │   ├── journaling/
│   │   │   │   │       │   │   ├── __tests__/
│   │   │   │   │       │   │   │   └── [page.test.tsx](./lingo/src/app/(games)/(health)/psychology/(practices)/journaling/__tests__/page.test.tsx)
│   │   │   │   │       │   │   └── [page.tsx](./lingo/src/app/(games)/(health)/psychology/(practices)/journaling/page.tsx)
│   │   │   │   │       │   └── mindfulness/
│   │   │   │   │       │       ├── __tests__/
│   │   │   │   │       │       │   └── [page.test.tsx](./lingo/src/app/(games)/(health)/psychology/(practices)/mindfulness/__tests__/page.test.tsx)
│   │   │   │   │       │       └── [page.tsx](./lingo/src/app/(games)/(health)/psychology/(practices)/mindfulness/page.tsx)
│   │   │   │   │       ├── (scales)/
│   │   │   │   │       │   ├── beck-depression-inventory/
│   │   │   │   │       │   │   └── [page.tsx](./lingo/src/app/(games)/(health)/psychology/(scales)/beck-depression-inventory/page.tsx)
│   │   │   │   │       │   ├── big-five-inventory/
│   │   │   │   │       │   │   └── [page.tsx](./lingo/src/app/(games)/(health)/psychology/(scales)/big-five-inventory/page.tsx)
│   │   │   │   │       │   ├── dyadic-adjustment-scale/
│   │   │   │   │       │   │   └── [page.tsx](./lingo/src/app/(games)/(health)/psychology/(scales)/dyadic-adjustment-scale/page.tsx)
│   │   │   │   │       │   ├── experiences-in-close-relationships/
│   │   │   │   │       │   │   └── [page.tsx](./lingo/src/app/(games)/(health)/psychology/(scales)/experiences-in-close-relationships/page.tsx)
│   │   │   │   │       │   ├── generalized-anxiety-disorder/
│   │   │   │   │       │   │   └── [page.tsx](./lingo/src/app/(games)/(health)/psychology/(scales)/generalized-anxiety-disorder/page.tsx)
│   │   │   │   │       │   ├── patient-health-questionnaire/
│   │   │   │   │       │   │   └── [page.tsx](./lingo/src/app/(games)/(health)/psychology/(scales)/patient-health-questionnaire/page.tsx)
│   │   │   │   │       │   ├── relationship-closeness-inventory/
│   │   │   │   │       │   │   └── [page.tsx](./lingo/src/app/(games)/(health)/psychology/(scales)/relationship-closeness-inventory/page.tsx)
│   │   │   │   │       │   └── satisfaction-with-life/
│   │   │   │   │       │       └── [page.tsx](./lingo/src/app/(games)/(health)/psychology/(scales)/satisfaction-with-life/page.tsx)
│   │   │   │   │       ├── (theory)/
│   │   │   │   │       │   ├── biology/
│   │   │   │   │       │   │   ├── __tests__/
│   │   │   │   │       │   │   │   └── [page.test.tsx](./lingo/src/app/(games)/(health)/psychology/(theory)/biology/__tests__/page.test.tsx)
│   │   │   │   │       │   │   └── [page.tsx](./lingo/src/app/(games)/(health)/psychology/(theory)/biology/page.tsx)
│   │   │   │   │       │   ├── cognitive/
│   │   │   │   │       │   │   ├── __tests__/
│   │   │   │   │       │   │   │   └── [page.test.tsx](./lingo/src/app/(games)/(health)/psychology/(theory)/cognitive/__tests__/page.test.tsx)
│   │   │   │   │       │   │   └── [page.tsx](./lingo/src/app/(games)/(health)/psychology/(theory)/cognitive/page.tsx)
│   │   │   │   │       │   ├── developmental/
│   │   │   │   │       │   │   ├── __tests__/
│   │   │   │   │       │   │   │   └── [page.test.tsx](./lingo/src/app/(games)/(health)/psychology/(theory)/developmental/__tests__/page.test.tsx)
│   │   │   │   │       │   │   └── [page.tsx](./lingo/src/app/(games)/(health)/psychology/(theory)/developmental/page.tsx)
│   │   │   │   │       │   └── social/
│   │   │   │   │       │       ├── __tests__/
│   │   │   │   │       │       │   └── [page.test.tsx](./lingo/src/app/(games)/(health)/psychology/(theory)/social/__tests__/page.test.tsx)
│   │   │   │   │       │       └── [page.tsx](./lingo/src/app/(games)/(health)/psychology/(theory)/social/page.tsx)
│   │   │   │   │       ├── __tests__/
│   │   │   │   │       │   └── [page.test.tsx](./lingo/src/app/(games)/(health)/psychology/__tests__/page.test.tsx)
│   │   │   │   │       └── [page.tsx](./lingo/src/app/(games)/(health)/psychology/page.tsx)
│   │   │   │   ├── (humanities)/
│   │   │   │   │   ├── economics/
│   │   │   │   │   │   ├── adverse-selection/
│   │   │   │   │   │   │   ├── lemons/
│   │   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(humanities)/economics/adverse-selection/lemons/page.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(humanities)/economics/adverse-selection/page.tsx)
│   │   │   │   │   │   ├── aggregate-demand-supply/
│   │   │   │   │   │   │   ├── shocks/
│   │   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(humanities)/economics/aggregate-demand-supply/shocks/page.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(humanities)/economics/aggregate-demand-supply/page.tsx)
│   │   │   │   │   │   ├── arbitrage/
│   │   │   │   │   │   │   ├── triangular/
│   │   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(humanities)/economics/arbitrage/triangular/page.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(humanities)/economics/arbitrage/page.tsx)
│   │   │   │   │   │   ├── auction-theory/
│   │   │   │   │   │   │   ├── auction/
│   │   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(humanities)/economics/auction-theory/auction/page.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(humanities)/economics/auction-theory/page.tsx)
│   │   │   │   │   │   ├── backward-induction/
│   │   │   │   │   │   │   ├── rollback/
│   │   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(humanities)/economics/backward-induction/rollback/page.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(humanities)/economics/backward-induction/page.tsx)
│   │   │   │   │   │   ├── bargaining-theory/
│   │   │   │   │   │   │   ├── ultimatum/
│   │   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(humanities)/economics/bargaining-theory/ultimatum/page.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(humanities)/economics/bargaining-theory/page.tsx)
│   │   │   │   │   │   ├── bayesian-updating/
│   │   │   │   │   │   │   ├── monty-hall/
│   │   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(humanities)/economics/bayesian-updating/monty-hall/page.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(humanities)/economics/bayesian-updating/page.tsx)
│   │   │   │   │   │   ├── behavioral-finance/
│   │   │   │   │   │   │   ├── bubble/
│   │   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(humanities)/economics/behavioral-finance/bubble/page.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(humanities)/economics/behavioral-finance/page.tsx)
│   │   │   │   │   │   ├── behavioral-heuristics/
│   │   │   │   │   │   │   ├── lab/
│   │   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(humanities)/economics/behavioral-heuristics/lab/page.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(humanities)/economics/behavioral-heuristics/page.tsx)
│   │   │   │   │   │   ├── business-cycles/
│   │   │   │   │   │   │   ├── predict/
│   │   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(humanities)/economics/business-cycles/predict/page.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(humanities)/economics/business-cycles/page.tsx)
│   │   │   │   │   │   ├── capm-and-risk/
│   │   │   │   │   │   │   ├── portfolio/
│   │   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(humanities)/economics/capm-and-risk/portfolio/page.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(humanities)/economics/capm-and-risk/page.tsx)
│   │   │   │   │   │   ├── causal-inference/
│   │   │   │   │   │   │   ├── experiments/
│   │   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(humanities)/economics/causal-inference/experiments/page.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(humanities)/economics/causal-inference/page.tsx)
│   │   │   │   │   │   ├── consumer-theory/
│   │   │   │   │   │   │   ├── utility/
│   │   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(humanities)/economics/consumer-theory/utility/page.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(humanities)/economics/consumer-theory/page.tsx)
│   │   │   │   │   │   ├── coordination-games/
│   │   │   │   │   │   │   ├── stag-hunt/
│   │   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(humanities)/economics/coordination-games/stag-hunt/page.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(humanities)/economics/coordination-games/page.tsx)
│   │   │   │   │   │   ├── development-rcts/
│   │   │   │   │   │   │   ├── experiment/
│   │   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(humanities)/economics/development-rcts/experiment/page.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(humanities)/economics/development-rcts/page.tsx)
│   │   │   │   │   │   ├── economic-inequality/
│   │   │   │   │   │   │   ├── lorenz/
│   │   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(humanities)/economics/economic-inequality/lorenz/page.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(humanities)/economics/economic-inequality/page.tsx)
│   │   │   │   │   │   ├── efficient-market-hypothesis/
│   │   │   │   │   │   │   ├── random-walk/
│   │   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(humanities)/economics/efficient-market-hypothesis/random-walk/page.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(humanities)/economics/efficient-market-hypothesis/page.tsx)
│   │   │   │   │   │   ├── elasticity/
│   │   │   │   │   │   │   ├── pricing/
│   │   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(humanities)/economics/elasticity/pricing/page.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(humanities)/economics/elasticity/page.tsx)
│   │   │   │   │   │   ├── endowment-effect/
│   │   │   │   │   │   │   ├── trade/
│   │   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(humanities)/economics/endowment-effect/trade/page.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(humanities)/economics/endowment-effect/page.tsx)
│   │   │   │   │   │   ├── evolutionary-game-theory/
│   │   │   │   │   │   │   ├── replicator/
│   │   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(humanities)/economics/evolutionary-game-theory/replicator/page.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(humanities)/economics/evolutionary-game-theory/page.tsx)
│   │   │   │   │   │   ├── externalities/
│   │   │   │   │   │   │   ├── pigou/
│   │   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(humanities)/economics/externalities/pigou/page.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(humanities)/economics/externalities/page.tsx)
│   │   │   │   │   │   ├── fiscal-policy/
│   │   │   │   │   │   │   ├── stimulus/
│   │   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(humanities)/economics/fiscal-policy/stimulus/page.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(humanities)/economics/fiscal-policy/page.tsx)
│   │   │   │   │   │   ├── game-theory-basics/
│   │   │   │   │   │   │   ├── matrix/
│   │   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(humanities)/economics/game-theory-basics/matrix/page.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(humanities)/economics/game-theory-basics/page.tsx)
│   │   │   │   │   │   ├── gdp-and-national-accounts/
│   │   │   │   │   │   │   ├── aggregate/
│   │   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(humanities)/economics/gdp-and-national-accounts/aggregate/page.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(humanities)/economics/gdp-and-national-accounts/page.tsx)
│   │   │   │   │   │   ├── human-capital/
│   │   │   │   │   │   │   ├── decision/
│   │   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(humanities)/economics/human-capital/decision/page.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(humanities)/economics/human-capital/page.tsx)
│   │   │   │   │   │   ├── imperfect-competition/
│   │   │   │   │   │   │   ├── lab/
│   │   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(humanities)/economics/imperfect-competition/lab/page.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(humanities)/economics/imperfect-competition/page.tsx)
│   │   │   │   │   │   ├── institutions-and-growth/
│   │   │   │   │   │   │   ├── lab/
│   │   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(humanities)/economics/institutions-and-growth/lab/page.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(humanities)/economics/institutions-and-growth/page.tsx)
│   │   │   │   │   │   ├── is-lm-model/
│   │   │   │   │   │   │   ├── equilibrium/
│   │   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(humanities)/economics/is-lm-model/equilibrium/page.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(humanities)/economics/is-lm-model/page.tsx)
│   │   │   │   │   │   ├── keynesian-economics/
│   │   │   │   │   │   │   ├── cross/
│   │   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(humanities)/economics/keynesian-economics/cross/page.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(humanities)/economics/keynesian-economics/page.tsx)
│   │   │   │   │   │   ├── labor-markets/
│   │   │   │   │   │   │   ├── wage/
│   │   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(humanities)/economics/labor-markets/wage/page.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(humanities)/economics/labor-markets/page.tsx)
│   │   │   │   │   │   ├── marginal-utility/
│   │   │   │   │   │   │   ├── lab/
│   │   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(humanities)/economics/marginal-utility/lab/page.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(humanities)/economics/marginal-utility/page.tsx)
│   │   │   │   │   │   ├── market-failures/
│   │   │   │   │   │   │   ├── policies/
│   │   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(humanities)/economics/market-failures/policies/page.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(humanities)/economics/market-failures/page.tsx)
│   │   │   │   │   │   ├── market-microstructure/
│   │   │   │   │   │   │   ├── order-book/
│   │   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(humanities)/economics/market-microstructure/order-book/page.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(humanities)/economics/market-microstructure/page.tsx)
│   │   │   │   │   │   ├── mechanism-design/
│   │   │   │   │   │   │   ├── reveal/
│   │   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(humanities)/economics/mechanism-design/reveal/page.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(humanities)/economics/mechanism-design/page.tsx)
│   │   │   │   │   │   ├── mental-accounting/
│   │   │   │   │   │   │   ├── scenarios/
│   │   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(humanities)/economics/mental-accounting/scenarios/page.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(humanities)/economics/mental-accounting/page.tsx)
│   │   │   │   │   │   ├── migration-economics/
│   │   │   │   │   │   │   ├── moves/
│   │   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(humanities)/economics/migration-economics/moves/page.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(humanities)/economics/migration-economics/page.tsx)
│   │   │   │   │   │   ├── monetary-policy/
│   │   │   │   │   │   │   ├── interest/
│   │   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(humanities)/economics/monetary-policy/interest/page.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(humanities)/economics/monetary-policy/page.tsx)
│   │   │   │   │   │   ├── monopoly-and-market-power/
│   │   │   │   │   │   │   ├── pricing/
│   │   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(humanities)/economics/monopoly-and-market-power/pricing/page.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(humanities)/economics/monopoly-and-market-power/page.tsx)
│   │   │   │   │   │   ├── moral-hazard/
│   │   │   │   │   │   │   ├── insurance/
│   │   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(humanities)/economics/moral-hazard/insurance/page.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(humanities)/economics/moral-hazard/page.tsx)
│   │   │   │   │   │   ├── nash-equilibrium/
│   │   │   │   │   │   │   ├── solve/
│   │   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(humanities)/economics/nash-equilibrium/solve/page.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(humanities)/economics/nash-equilibrium/page.tsx)
│   │   │   │   │   │   ├── nudge-and-behavioral-economics/
│   │   │   │   │   │   │   ├── choice/
│   │   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(humanities)/economics/nudge-and-behavioral-economics/choice/page.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(humanities)/economics/nudge-and-behavioral-economics/page.tsx)
│   │   │   │   │   │   ├── oligopoly/
│   │   │   │   │   │   │   ├── cournot/
│   │   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(humanities)/economics/oligopoly/cournot/page.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(humanities)/economics/oligopoly/page.tsx)
│   │   │   │   │   │   ├── opportunity-cost/
│   │   │   │   │   │   │   ├── trade-offs/
│   │   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(humanities)/economics/opportunity-cost/trade-offs/page.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(humanities)/economics/opportunity-cost/page.tsx)
│   │   │   │   │   │   ├── overconfidence-bias/
│   │   │   │   │   │   │   ├── calibration/
│   │   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(humanities)/economics/overconfidence-bias/calibration/page.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(humanities)/economics/overconfidence-bias/page.tsx)
│   │   │   │   │   │   ├── perfect-competition/
│   │   │   │   │   │   │   ├── firm/
│   │   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(humanities)/economics/perfect-competition/firm/page.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(humanities)/economics/perfect-competition/page.tsx)
│   │   │   │   │   │   ├── phillips-curve/
│   │   │   │   │   │   │   ├── tradeoff/
│   │   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(humanities)/economics/phillips-curve/tradeoff/page.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(humanities)/economics/phillips-curve/page.tsx)
│   │   │   │   │   │   ├── portfolio-theory/
│   │   │   │   │   │   │   ├── frontier/
│   │   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(humanities)/economics/portfolio-theory/frontier/page.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(humanities)/economics/portfolio-theory/page.tsx)
│   │   │   │   │   │   ├── poverty-traps/
│   │   │   │   │   │   │   ├── escape/
│   │   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(humanities)/economics/poverty-traps/escape/page.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(humanities)/economics/poverty-traps/page.tsx)
│   │   │   │   │   │   ├── price-discrimination/
│   │   │   │   │   │   │   ├── split/
│   │   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(humanities)/economics/price-discrimination/split/page.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(humanities)/economics/price-discrimination/page.tsx)
│   │   │   │   │   │   ├── prisoners-dilemma/
│   │   │   │   │   │   │   ├── bots/
│   │   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(humanities)/economics/prisoners-dilemma/bots/page.tsx)
│   │   │   │   │   │   │   ├── simulation/
│   │   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(humanities)/economics/prisoners-dilemma/simulation/page.tsx)
│   │   │   │   │   │   │   ├── versus/
│   │   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(humanities)/economics/prisoners-dilemma/versus/page.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(humanities)/economics/prisoners-dilemma/page.tsx)
│   │   │   │   │   │   ├── production-and-costs/
│   │   │   │   │   │   │   ├── lab/
│   │   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(humanities)/economics/production-and-costs/lab/page.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(humanities)/economics/production-and-costs/page.tsx)
│   │   │   │   │   │   ├── prospect-theory/
│   │   │   │   │   │   │   ├── framing/
│   │   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(humanities)/economics/prospect-theory/framing/page.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(humanities)/economics/prospect-theory/page.tsx)
│   │   │   │   │   │   ├── public-choice/
│   │   │   │   │   │   │   ├── voting/
│   │   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(humanities)/economics/public-choice/voting/page.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(humanities)/economics/public-choice/page.tsx)
│   │   │   │   │   │   ├── public-goods-dilemma/
│   │   │   │   │   │   │   ├── contribute/
│   │   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(humanities)/economics/public-goods-dilemma/contribute/page.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(humanities)/economics/public-goods-dilemma/page.tsx)
│   │   │   │   │   │   ├── repeated-games/
│   │   │   │   │   │   │   ├── tournament/
│   │   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(humanities)/economics/repeated-games/tournament/page.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(humanities)/economics/repeated-games/page.tsx)
│   │   │   │   │   │   ├── signaling/
│   │   │   │   │   │   │   ├── job-market/
│   │   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(humanities)/economics/signaling/job-market/page.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(humanities)/economics/signaling/page.tsx)
│   │   │   │   │   │   ├── social-preferences/
│   │   │   │   │   │   │   ├── dictator/
│   │   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(humanities)/economics/social-preferences/dictator/page.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(humanities)/economics/social-preferences/page.tsx)
│   │   │   │   │   │   ├── supply-and-demand/
│   │   │   │   │   │   │   ├── price-lab/
│   │   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(humanities)/economics/supply-and-demand/price-lab/page.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(humanities)/economics/supply-and-demand/page.tsx)
│   │   │   │   │   │   ├── time-inconsistency/
│   │   │   │   │   │   │   ├── savings/
│   │   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(humanities)/economics/time-inconsistency/savings/page.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(humanities)/economics/time-inconsistency/page.tsx)
│   │   │   │   │   │   ├── time-value-of-money/
│   │   │   │   │   │   │   ├── lab/
│   │   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(humanities)/economics/time-value-of-money/lab/page.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(humanities)/economics/time-value-of-money/page.tsx)
│   │   │   │   │   │   ├── trade-and-tariffs/
│   │   │   │   │   │   │   ├── lab/
│   │   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(humanities)/economics/trade-and-tariffs/lab/page.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(humanities)/economics/trade-and-tariffs/page.tsx)
│   │   │   │   │   │   ├── tragedy-of-the-commons/
│   │   │   │   │   │   │   ├── harvest/
│   │   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(humanities)/economics/tragedy-of-the-commons/harvest/page.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(humanities)/economics/tragedy-of-the-commons/page.tsx)
│   │   │   │   │   │   ├── unemployment-okuns-law/
│   │   │   │   │   │   │   ├── lab/
│   │   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(humanities)/economics/unemployment-okuns-law/lab/page.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(humanities)/economics/unemployment-okuns-law/page.tsx)
│   │   │   │   │   │   ├── zero-sum-games/
│   │   │   │   │   │   │   ├── rps/
│   │   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(humanities)/economics/zero-sum-games/rps/page.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(humanities)/economics/zero-sum-games/page.tsx)
│   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(humanities)/economics/page.tsx)
│   │   │   │   │   ├── geography/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   └── [page.test.tsx](./lingo/src/app/(games)/(humanities)/geography/__tests__/page.test.tsx)
│   │   │   │   │   │   ├── connections/
│   │   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   │   └── [page.test.tsx](./lingo/src/app/(games)/(humanities)/geography/connections/__tests__/page.test.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(humanities)/geography/connections/page.tsx)
│   │   │   │   │   │   ├── guess/
│   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(humanities)/geography/guess/page.tsx)
│   │   │   │   │   │   ├── higher-or-lower/
│   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(humanities)/geography/higher-or-lower/page.tsx)
│   │   │   │   │   │   ├── sort-continents/
│   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(humanities)/geography/sort-continents/page.tsx)
│   │   │   │   │   │   ├── wordle/
│   │   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   │   └── [page.test.tsx](./lingo/src/app/(games)/(humanities)/geography/wordle/__tests__/page.test.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(humanities)/geography/wordle/page.tsx)
│   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(humanities)/geography/page.tsx)
│   │   │   │   │   ├── history/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   └── [page.test.tsx](./lingo/src/app/(games)/(humanities)/history/__tests__/page.test.tsx)
│   │   │   │   │   │   ├── myth-vs-fact/
│   │   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   │   └── [page.test.tsx](./lingo/src/app/(games)/(humanities)/history/myth-vs-fact/__tests__/page.test.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(humanities)/history/myth-vs-fact/page.tsx)
│   │   │   │   │   │   ├── through-the-years/
│   │   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   │   └── [page.test.tsx](./lingo/src/app/(games)/(humanities)/history/through-the-years/__tests__/page.test.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(humanities)/history/through-the-years/page.tsx)
│   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(humanities)/history/page.tsx)
│   │   │   │   │   └── languages/
│   │   │   │   │       ├── [language]/
│   │   │   │   │       │   ├── __tests__/
│   │   │   │   │       │   │   └── [page.test.tsx](./lingo/src/app/(games)/(humanities)/languages/[language]/__tests__/page.test.tsx)
│   │   │   │   │       │   └── [page.tsx](./lingo/src/app/(games)/(humanities)/languages/[language]/page.tsx)
│   │   │   │   │       ├── __tests__/
│   │   │   │   │       │   └── [page.test.tsx](./lingo/src/app/(games)/(humanities)/languages/__tests__/page.test.tsx)
│   │   │   │   │       ├── english/
│   │   │   │   │       │   └── [page.tsx](./lingo/src/app/(games)/(humanities)/languages/english/page.tsx)
│   │   │   │   │       ├── sign/
│   │   │   │   │       │   └── [page.tsx](./lingo/src/app/(games)/(humanities)/languages/sign/page.tsx)
│   │   │   │   │       └── [page.tsx](./lingo/src/app/(games)/(humanities)/languages/page.tsx)
│   │   │   │   └── (stem)/
│   │   │   │       ├── chemistry/
│   │   │   │       │   ├── periodic-table/
│   │   │   │       │   │   ├── __tests__/
│   │   │   │       │   │   │   └── [page.test.tsx](./lingo/src/app/(games)/(stem)/chemistry/periodic-table/__tests__/page.test.tsx)
│   │   │   │       │   │   └── [page.tsx](./lingo/src/app/(games)/(stem)/chemistry/periodic-table/page.tsx)
│   │   │   │       │   └── [page.tsx](./lingo/src/app/(games)/(stem)/chemistry/page.tsx)
│   │   │   │       ├── maths/
│   │   │   │       │   ├── __tests__/
│   │   │   │       │   │   └── [page.test.tsx](./lingo/src/app/(games)/(stem)/maths/__tests__/page.test.tsx)
│   │   │   │       │   ├── attractors/
│   │   │   │       │   │   ├── __tests__/
│   │   │   │       │   │   │   └── [page.test.tsx](./lingo/src/app/(games)/(stem)/maths/attractors/__tests__/page.test.tsx)
│   │   │   │       │   │   └── [page.tsx](./lingo/src/app/(games)/(stem)/maths/attractors/page.tsx)
│   │   │   │       │   ├── cyclic/
│   │   │   │       │   │   ├── __tests__/
│   │   │   │       │   │   │   └── [page.test.tsx](./lingo/src/app/(games)/(stem)/maths/cyclic/__tests__/page.test.tsx)
│   │   │   │       │   │   └── [page.tsx](./lingo/src/app/(games)/(stem)/maths/cyclic/page.tsx)
│   │   │   │       │   ├── fibonacci-sequence/
│   │   │   │       │   │   ├── __tests__/
│   │   │   │       │   │   │   └── [page.test.tsx](./lingo/src/app/(games)/(stem)/maths/fibonacci-sequence/__tests__/page.test.tsx)
│   │   │   │       │   │   └── [page.tsx](./lingo/src/app/(games)/(stem)/maths/fibonacci-sequence/page.tsx)
│   │   │   │       │   ├── kaprekar-constant/
│   │   │   │       │   │   ├── __tests__/
│   │   │   │       │   │   │   └── [page.test.tsx](./lingo/src/app/(games)/(stem)/maths/kaprekar-constant/__tests__/page.test.tsx)
│   │   │   │       │   │   └── [page.tsx](./lingo/src/app/(games)/(stem)/maths/kaprekar-constant/page.tsx)
│   │   │   │       │   ├── prime-numbers/
│   │   │   │       │   │   ├── __tests__/
│   │   │   │       │   │   │   └── [page.test.tsx](./lingo/src/app/(games)/(stem)/maths/prime-numbers/__tests__/page.test.tsx)
│   │   │   │       │   │   └── [page.tsx](./lingo/src/app/(games)/(stem)/maths/prime-numbers/page.tsx)
│   │   │   │       │   └── [page.tsx](./lingo/src/app/(games)/(stem)/maths/page.tsx)
│   │   │   │       └── neuroscience/
│   │   │   │           ├── (neuroimaging)/
│   │   │   │           │   ├── (eeg)/
│   │   │   │           │   │   ├── eeg/
│   │   │   │           │   │   │   ├── interactive/
│   │   │   │           │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(stem)/neuroscience/(neuroimaging)/(eeg)/eeg/interactive/page.tsx)
│   │   │   │           │   │   │   └── [page.tsx](./lingo/src/app/(games)/(stem)/neuroscience/(neuroimaging)/(eeg)/eeg/page.tsx)
│   │   │   │           │   │   └── qeeg/
│   │   │   │           │   │       └── [page.tsx](./lingo/src/app/(games)/(stem)/neuroscience/(neuroimaging)/(eeg)/qeeg/page.tsx)
│   │   │   │           │   ├── (meg)/
│   │   │   │           │   │   ├── meg/
│   │   │   │           │   │   │   ├── interactive/
│   │   │   │           │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/(stem)/neuroscience/(neuroimaging)/(meg)/meg/interactive/page.tsx)
│   │   │   │           │   │   │   └── [page.tsx](./lingo/src/app/(games)/(stem)/neuroscience/(neuroimaging)/(meg)/meg/page.tsx)
│   │   │   │           │   │   └── opm-meg/
│   │   │   │           │   │       ├── interactive/
│   │   │   │           │   │       │   └── [page.tsx](./lingo/src/app/(games)/(stem)/neuroscience/(neuroimaging)/(meg)/opm-meg/interactive/page.tsx)
│   │   │   │           │   │       └── [page.tsx](./lingo/src/app/(games)/(stem)/neuroscience/(neuroimaging)/(meg)/opm-meg/page.tsx)
│   │   │   │           │   └── (mri)/
│   │   │   │           │       ├── fmri/
│   │   │   │           │       │   └── [page.tsx](./lingo/src/app/(games)/(stem)/neuroscience/(neuroimaging)/(mri)/fmri/page.tsx)
│   │   │   │           │       ├── fnirs/
│   │   │   │           │       │   └── [page.tsx](./lingo/src/app/(games)/(stem)/neuroscience/(neuroimaging)/(mri)/fnirs/page.tsx)
│   │   │   │           │       └── mri/
│   │   │   │           │           ├── interactive/
│   │   │   │           │           │   └── [page.tsx](./lingo/src/app/(games)/(stem)/neuroscience/(neuroimaging)/(mri)/mri/interactive/page.tsx)
│   │   │   │           │           └── [page.tsx](./lingo/src/app/(games)/(stem)/neuroscience/(neuroimaging)/(mri)/mri/page.tsx)
│   │   │   │           ├── (tasks)/
│   │   │   │           │   ├── flanker-task/
│   │   │   │           │   │   └── [page.tsx](./lingo/src/app/(games)/(stem)/neuroscience/(tasks)/flanker-task/page.tsx)
│   │   │   │           │   ├── lexical-decision/
│   │   │   │           │   │   └── [page.tsx](./lingo/src/app/(games)/(stem)/neuroscience/(tasks)/lexical-decision/page.tsx)
│   │   │   │           │   ├── memory-recognition/
│   │   │   │           │   │   └── [page.tsx](./lingo/src/app/(games)/(stem)/neuroscience/(tasks)/memory-recognition/page.tsx)
│   │   │   │           │   ├── numerical-comparison/
│   │   │   │           │   │   └── [page.tsx](./lingo/src/app/(games)/(stem)/neuroscience/(tasks)/numerical-comparison/page.tsx)
│   │   │   │           │   ├── random-dot-motion/
│   │   │   │           │   │   └── [page.tsx](./lingo/src/app/(games)/(stem)/neuroscience/(tasks)/random-dot-motion/page.tsx)
│   │   │   │           │   ├── stroop-task/
│   │   │   │           │   │   └── [page.tsx](./lingo/src/app/(games)/(stem)/neuroscience/(tasks)/stroop-task/page.tsx)
│   │   │   │           │   └── visual-search/
│   │   │   │           │       └── [page.tsx](./lingo/src/app/(games)/(stem)/neuroscience/(tasks)/visual-search/page.tsx)
│   │   │   │           ├── (theory)/
│   │   │   │           │   ├── attentional-drift-diffusion-model/
│   │   │   │           │   │   ├── interactive/
│   │   │   │           │   │   │   └── [page.tsx](./lingo/src/app/(games)/(stem)/neuroscience/(theory)/attentional-drift-diffusion-model/interactive/page.tsx)
│   │   │   │           │   │   └── [page.tsx](./lingo/src/app/(games)/(stem)/neuroscience/(theory)/attentional-drift-diffusion-model/page.tsx)
│   │   │   │           │   ├── drift-diffusion-model/
│   │   │   │           │   │   ├── interactive/
│   │   │   │           │   │   │   └── [page.tsx](./lingo/src/app/(games)/(stem)/neuroscience/(theory)/drift-diffusion-model/interactive/page.tsx)
│   │   │   │           │   │   └── [page.tsx](./lingo/src/app/(games)/(stem)/neuroscience/(theory)/drift-diffusion-model/page.tsx)
│   │   │   │           │   ├── hierarchical-drift-diffusion-model/
│   │   │   │           │   │   ├── interactive/
│   │   │   │           │   │   │   └── [page.tsx](./lingo/src/app/(games)/(stem)/neuroscience/(theory)/hierarchical-drift-diffusion-model/interactive/page.tsx)
│   │   │   │           │   │   └── [page.tsx](./lingo/src/app/(games)/(stem)/neuroscience/(theory)/hierarchical-drift-diffusion-model/page.tsx)
│   │   │   │           │   ├── leaky-competing-accumulator/
│   │   │   │           │   │   ├── interactive/
│   │   │   │           │   │   │   └── [page.tsx](./lingo/src/app/(games)/(stem)/neuroscience/(theory)/leaky-competing-accumulator/interactive/page.tsx)
│   │   │   │           │   │   └── [page.tsx](./lingo/src/app/(games)/(stem)/neuroscience/(theory)/leaky-competing-accumulator/page.tsx)
│   │   │   │           │   ├── linear-ballistic-accumulator/
│   │   │   │           │   │   ├── interactive/
│   │   │   │           │   │   │   └── [page.tsx](./lingo/src/app/(games)/(stem)/neuroscience/(theory)/linear-ballistic-accumulator/interactive/page.tsx)
│   │   │   │           │   │   └── [page.tsx](./lingo/src/app/(games)/(stem)/neuroscience/(theory)/linear-ballistic-accumulator/page.tsx)
│   │   │   │           │   └── race-models/
│   │   │   │           │       ├── interactive/
│   │   │   │           │       │   └── [page.tsx](./lingo/src/app/(games)/(stem)/neuroscience/(theory)/race-models/interactive/page.tsx)
│   │   │   │           │       └── [page.tsx](./lingo/src/app/(games)/(stem)/neuroscience/(theory)/race-models/page.tsx)
│   │   │   │           └── [page.tsx](./lingo/src/app/(games)/(stem)/neuroscience/page.tsx)
│   │   │   ├── (info)/
│   │   │   │   ├── about/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./lingo/src/app/(info)/about/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./lingo/src/app/(info)/about/page.tsx)
│   │   │   │   ├── downloads/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./lingo/src/app/(info)/downloads/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./lingo/src/app/(info)/downloads/page.tsx)
│   │   │   │   └── version/
│   │   │   │       ├── __tests__/
│   │   │   │       │   └── [page.test.tsx](./lingo/src/app/(info)/version/__tests__/page.test.tsx)
│   │   │   │       └── [page.tsx](./lingo/src/app/(info)/version/page.tsx)
│   │   │   ├── __tests__/
│   │   │   │   ├── [error.test.tsx](./lingo/src/app/__tests__/error.test.tsx)
│   │   │   │   ├── [forbidden.test.tsx](./lingo/src/app/__tests__/forbidden.test.tsx)
│   │   │   │   ├── [global-error.test.tsx](./lingo/src/app/__tests__/global-error.test.tsx)
│   │   │   │   ├── [layout.test.tsx](./lingo/src/app/__tests__/layout.test.tsx)
│   │   │   │   ├── [loading.test.tsx](./lingo/src/app/__tests__/loading.test.tsx)
│   │   │   │   ├── [not-found.test.tsx](./lingo/src/app/__tests__/not-found.test.tsx)
│   │   │   │   ├── [page.test.tsx](./lingo/src/app/__tests__/page.test.tsx)
│   │   │   │   ├── [robots.test.ts](./lingo/src/app/__tests__/robots.test.ts)
│   │   │   │   └── [unauthorized.test.tsx](./lingo/src/app/__tests__/unauthorized.test.tsx)
│   │   │   ├── [default.tsx](./lingo/src/app/default.tsx)
│   │   │   ├── [error.tsx](./lingo/src/app/error.tsx)
│   │   │   ├── [favicon.ico](./lingo/src/app/favicon.ico)
│   │   │   ├── [forbidden.tsx](./lingo/src/app/forbidden.tsx)
│   │   │   ├── [global-error.tsx](./lingo/src/app/global-error.tsx)
│   │   │   ├── [layout.tsx](./lingo/src/app/layout.tsx)
│   │   │   ├── [loading.tsx](./lingo/src/app/loading.tsx)
│   │   │   ├── [not-found.tsx](./lingo/src/app/not-found.tsx)
│   │   │   ├── [page.tsx](./lingo/src/app/page.tsx)
│   │   │   ├── [robots.ts](./lingo/src/app/robots.ts)
│   │   │   └── [unauthorized.tsx](./lingo/src/app/unauthorized.tsx)
│   │   ├── components/
│   │   │   ├── atoms/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [Badge.test.tsx](./lingo/src/components/atoms/__tests__/Badge.test.tsx)
│   │   │   │   │   └── [Button.test.tsx](./lingo/src/components/atoms/__tests__/Button.test.tsx)
│   │   │   │   ├── [AccentBadge.tsx](./lingo/src/components/atoms/AccentBadge.tsx)
│   │   │   │   ├── [Badge.tsx](./lingo/src/components/atoms/Badge.tsx)
│   │   │   │   ├── [Button.tsx](./lingo/src/components/atoms/Button.tsx)
│   │   │   │   ├── [CaretButton.tsx](./lingo/src/components/atoms/CaretButton.tsx)
│   │   │   │   ├── [DifficultyBadge.tsx](./lingo/src/components/atoms/DifficultyBadge.tsx)
│   │   │   │   ├── [FilterChip.tsx](./lingo/src/components/atoms/FilterChip.tsx)
│   │   │   │   └── [ThemeToggle.tsx](./lingo/src/components/atoms/ThemeToggle.tsx)
│   │   │   ├── molecules/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [StrategyList.test.tsx](./lingo/src/components/molecules/__tests__/StrategyList.test.tsx)
│   │   │   │   ├── [CardActions.tsx](./lingo/src/components/molecules/CardActions.tsx)
│   │   │   │   ├── [FilterCheckbox.tsx](./lingo/src/components/molecules/FilterCheckbox.tsx)
│   │   │   │   ├── [FilterRow.tsx](./lingo/src/components/molecules/FilterRow.tsx)
│   │   │   │   ├── [GameResult.tsx](./lingo/src/components/molecules/GameResult.tsx)
│   │   │   │   ├── [GroupHeader.tsx](./lingo/src/components/molecules/GroupHeader.tsx)
│   │   │   │   ├── [MoveButtons.tsx](./lingo/src/components/molecules/MoveButtons.tsx)
│   │   │   │   ├── [PayoffMatrix.tsx](./lingo/src/components/molecules/PayoffMatrix.tsx)
│   │   │   │   ├── [RankingTable.tsx](./lingo/src/components/molecules/RankingTable.tsx)
│   │   │   │   ├── [RoundHistory.tsx](./lingo/src/components/molecules/RoundHistory.tsx)
│   │   │   │   ├── [RoundReveal.tsx](./lingo/src/components/molecules/RoundReveal.tsx)
│   │   │   │   ├── [ScoreBar.tsx](./lingo/src/components/molecules/ScoreBar.tsx)
│   │   │   │   ├── [SearchBar.tsx](./lingo/src/components/molecules/SearchBar.tsx)
│   │   │   │   ├── [SelectField.tsx](./lingo/src/components/molecules/SelectField.tsx)
│   │   │   │   └── [StrategyList.tsx](./lingo/src/components/molecules/StrategyList.tsx)
│   │   │   ├── organisms/
│   │   │   │   ├── [FilterPanel.tsx](./lingo/src/components/organisms/FilterPanel.tsx)
│   │   │   │   ├── [GroupSection.tsx](./lingo/src/components/organisms/GroupSection.tsx)
│   │   │   │   ├── [Header.tsx](./lingo/src/components/organisms/Header.tsx)
│   │   │   │   └── [ToolCard.tsx](./lingo/src/components/organisms/ToolCard.tsx)
│   │   │   └── templates/
│   │   │       ├── __tests__/
│   │   │       │   ├── [AboutTemplate.test.tsx](./lingo/src/components/templates/__tests__/AboutTemplate.test.tsx)
│   │   │       │   ├── [DownloadsTemplate.test.tsx](./lingo/src/components/templates/__tests__/DownloadsTemplate.test.tsx)
│   │   │       │   ├── [ErrorTemplate.test.tsx](./lingo/src/components/templates/__tests__/ErrorTemplate.test.tsx)
│   │   │       │   ├── [GamesTemplate.test.tsx](./lingo/src/components/templates/__tests__/GamesTemplate.test.tsx)
│   │   │       │   └── [VersionTemplate.test.tsx](./lingo/src/components/templates/__tests__/VersionTemplate.test.tsx)
│   │   │       ├── [AboutTemplate.tsx](./lingo/src/components/templates/AboutTemplate.tsx)
│   │   │       ├── [DownloadsTemplate.tsx](./lingo/src/components/templates/DownloadsTemplate.tsx)
│   │   │       ├── [ErrorTemplate.tsx](./lingo/src/components/templates/ErrorTemplate.tsx)
│   │   │       ├── [GamesTemplate.tsx](./lingo/src/components/templates/GamesTemplate.tsx)
│   │   │       ├── [TheoryTemplate.tsx](./lingo/src/components/templates/TheoryTemplate.tsx)
│   │   │       └── [VersionTemplate.tsx](./lingo/src/components/templates/VersionTemplate.tsx)
│   │   ├── content/
│   │   │   ├── [about.ts](./lingo/src/content/about.ts)
│   │   │   ├── [download.ts](./lingo/src/content/download.ts)
│   │   │   └── [version.ts](./lingo/src/content/version.ts)
│   │   ├── games/
│   │   │   ├── arts/
│   │   │   │   ├── colors/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [colors.test.ts](./lingo/src/games/arts/colors/__tests__/colors.test.ts)
│   │   │   │   │   ├── adjuster/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   └── [ColorAdjuster.test.tsx](./lingo/src/games/arts/colors/adjuster/__tests__/ColorAdjuster.test.tsx)
│   │   │   │   │   │   └── [index.tsx](./lingo/src/games/arts/colors/adjuster/index.tsx)
│   │   │   │   │   ├── color-blindness/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   └── [ColorBlindnessSimulator.test.tsx](./lingo/src/games/arts/colors/color-blindness/__tests__/ColorBlindnessSimulator.test.tsx)
│   │   │   │   │   │   └── [index.tsx](./lingo/src/games/arts/colors/color-blindness/index.tsx)
│   │   │   │   │   ├── contrast/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   └── [ContrastChecker.test.tsx](./lingo/src/games/arts/colors/contrast/__tests__/ContrastChecker.test.tsx)
│   │   │   │   │   │   └── [index.tsx](./lingo/src/games/arts/colors/contrast/index.tsx)
│   │   │   │   │   ├── converter/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   └── [ColorConverter.test.tsx](./lingo/src/games/arts/colors/converter/__tests__/ColorConverter.test.tsx)
│   │   │   │   │   │   └── [index.tsx](./lingo/src/games/arts/colors/converter/index.tsx)
│   │   │   │   │   ├── css-scale/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   └── [CssScaleExporter.test.tsx](./lingo/src/games/arts/colors/css-scale/__tests__/CssScaleExporter.test.tsx)
│   │   │   │   │   │   └── [index.tsx](./lingo/src/games/arts/colors/css-scale/index.tsx)
│   │   │   │   │   ├── gradient/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   └── [GradientBuilder.test.tsx](./lingo/src/games/arts/colors/gradient/__tests__/GradientBuilder.test.tsx)
│   │   │   │   │   │   └── [index.tsx](./lingo/src/games/arts/colors/gradient/index.tsx)
│   │   │   │   │   ├── mixer/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   └── [ColorMixer.test.tsx](./lingo/src/games/arts/colors/mixer/__tests__/ColorMixer.test.tsx)
│   │   │   │   │   │   └── [index.tsx](./lingo/src/games/arts/colors/mixer/index.tsx)
│   │   │   │   │   ├── opacity/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   └── [OpacityOverlay.test.tsx](./lingo/src/games/arts/colors/opacity/__tests__/OpacityOverlay.test.tsx)
│   │   │   │   │   │   └── [index.tsx](./lingo/src/games/arts/colors/opacity/index.tsx)
│   │   │   │   │   ├── palette/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   └── [PaletteGenerator.test.tsx](./lingo/src/games/arts/colors/palette/__tests__/PaletteGenerator.test.tsx)
│   │   │   │   │   │   └── [index.tsx](./lingo/src/games/arts/colors/palette/index.tsx)
│   │   │   │   │   ├── random/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   └── [RandomColor.test.tsx](./lingo/src/games/arts/colors/random/__tests__/RandomColor.test.tsx)
│   │   │   │   │   │   └── [index.tsx](./lingo/src/games/arts/colors/random/index.tsx)
│   │   │   │   │   ├── schemes/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   └── [ColorSchemes.test.tsx](./lingo/src/games/arts/colors/schemes/__tests__/ColorSchemes.test.tsx)
│   │   │   │   │   │   └── [index.tsx](./lingo/src/games/arts/colors/schemes/index.tsx)
│   │   │   │   │   ├── shades-tints/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   └── [ShadesTints.test.tsx](./lingo/src/games/arts/colors/shades-tints/__tests__/ShadesTints.test.tsx)
│   │   │   │   │   │   └── [index.tsx](./lingo/src/games/arts/colors/shades-tints/index.tsx)
│   │   │   │   │   ├── shared/
│   │   │   │   │   │   ├── [ColorsTool.tsx](./lingo/src/games/arts/colors/shared/ColorsTool.tsx)
│   │   │   │   │   │   ├── [CopyRow.tsx](./lingo/src/games/arts/colors/shared/CopyRow.tsx)
│   │   │   │   │   │   ├── [Swatch.tsx](./lingo/src/games/arts/colors/shared/Swatch.tsx)
│   │   │   │   │   │   ├── [TheoryNote.tsx](./lingo/src/games/arts/colors/shared/TheoryNote.tsx)
│   │   │   │   │   │   ├── [index.ts](./lingo/src/games/arts/colors/shared/index.ts)
│   │   │   │   │   │   └── [useClipboard.ts](./lingo/src/games/arts/colors/shared/useClipboard.ts)
│   │   │   │   │   ├── temperature/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   └── [ColorTemperature.test.tsx](./lingo/src/games/arts/colors/temperature/__tests__/ColorTemperature.test.tsx)
│   │   │   │   │   │   └── [index.tsx](./lingo/src/games/arts/colors/temperature/index.tsx)
│   │   │   │   │   ├── theme/
│   │   │   │   │   │   └── __tests__/
│   │   │   │   │   │       └── [ColorsTool.test.tsx](./lingo/src/games/arts/colors/theme/__tests__/ColorsTool.test.tsx)
│   │   │   │   │   ├── tint-shade-tone/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   └── [TintShadeTone.test.tsx](./lingo/src/games/arts/colors/tint-shade-tone/__tests__/TintShadeTone.test.tsx)
│   │   │   │   │   │   └── [index.tsx](./lingo/src/games/arts/colors/tint-shade-tone/index.tsx)
│   │   │   │   │   ├── wheel/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   └── [ColorWheel.test.tsx](./lingo/src/games/arts/colors/wheel/__tests__/ColorWheel.test.tsx)
│   │   │   │   │   │   └── [index.tsx](./lingo/src/games/arts/colors/wheel/index.tsx)
│   │   │   │   │   ├── [colors.ts](./lingo/src/games/arts/colors/colors.ts)
│   │   │   │   │   └── [themeColors.ts](./lingo/src/games/arts/colors/themeColors.ts)
│   │   │   │   └── music/
│   │   │   │       ├── __tests__/
│   │   │   │       │   ├── [index.test.tsx](./lingo/src/games/arts/music/__tests__/index.test.tsx)
│   │   │   │       │   ├── [keyClasses.test.ts](./lingo/src/games/arts/music/__tests__/keyClasses.test.ts)
│   │   │   │       │   ├── [useAudio.test.ts](./lingo/src/games/arts/music/__tests__/useAudio.test.ts)
│   │   │   │       │   ├── [useGame.test.ts](./lingo/src/games/arts/music/__tests__/useGame.test.ts)
│   │   │   │       │   └── [useSequence.test.ts](./lingo/src/games/arts/music/__tests__/useSequence.test.ts)
│   │   │   │       ├── [constants.ts](./lingo/src/games/arts/music/constants.ts)
│   │   │   │       ├── [index.tsx](./lingo/src/games/arts/music/index.tsx)
│   │   │   │       ├── [keyClasses.ts](./lingo/src/games/arts/music/keyClasses.ts)
│   │   │   │       ├── [twinkle-twinkle-little-star.ts](./lingo/src/games/arts/music/twinkle-twinkle-little-star.ts)
│   │   │   │       ├── [useAudio.ts](./lingo/src/games/arts/music/useAudio.ts)
│   │   │   │       ├── [useGame.ts](./lingo/src/games/arts/music/useGame.ts)
│   │   │   │       ├── [useMusicGame.ts](./lingo/src/games/arts/music/useMusicGame.ts)
│   │   │   │       └── [useSequence.ts](./lingo/src/games/arts/music/useSequence.ts)
│   │   │   ├── health/
│   │   │   │   ├── ophthalmology/
│   │   │   │   │   ├── logmar/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [index.test.tsx](./lingo/src/games/health/ophthalmology/logmar/__tests__/index.test.tsx)
│   │   │   │   │   │   │   └── [utils.test.ts](./lingo/src/games/health/ophthalmology/logmar/__tests__/utils.test.ts)
│   │   │   │   │   │   ├── [constants.ts](./lingo/src/games/health/ophthalmology/logmar/constants.ts)
│   │   │   │   │   │   ├── [index.tsx](./lingo/src/games/health/ophthalmology/logmar/index.tsx)
│   │   │   │   │   │   └── [utils.ts](./lingo/src/games/health/ophthalmology/logmar/utils.ts)
│   │   │   │   │   ├── snellen/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [index.test.tsx](./lingo/src/games/health/ophthalmology/snellen/__tests__/index.test.tsx)
│   │   │   │   │   │   │   └── [utils.test.ts](./lingo/src/games/health/ophthalmology/snellen/__tests__/utils.test.ts)
│   │   │   │   │   │   ├── [index.tsx](./lingo/src/games/health/ophthalmology/snellen/index.tsx)
│   │   │   │   │   │   └── [utils.ts](./lingo/src/games/health/ophthalmology/snellen/utils.ts)
│   │   │   │   │   └── tumbling-e/
│   │   │   │   │       ├── __tests__/
│   │   │   │   │       │   ├── [index.test.tsx](./lingo/src/games/health/ophthalmology/tumbling-e/__tests__/index.test.tsx)
│   │   │   │   │       │   └── [utils.test.ts](./lingo/src/games/health/ophthalmology/tumbling-e/__tests__/utils.test.ts)
│   │   │   │   │       ├── [constants.ts](./lingo/src/games/health/ophthalmology/tumbling-e/constants.ts)
│   │   │   │   │       ├── [index.tsx](./lingo/src/games/health/ophthalmology/tumbling-e/index.tsx)
│   │   │   │   │       ├── [types.ts](./lingo/src/games/health/ophthalmology/tumbling-e/types.ts)
│   │   │   │   │       └── [utils.ts](./lingo/src/games/health/ophthalmology/tumbling-e/utils.ts)
│   │   │   │   └── psychology/
│   │   │   │       ├── BeckDepressionInventory/
│   │   │   │       │   ├── __tests__/
│   │   │   │       │   │   ├── [index.test.tsx](./lingo/src/games/health/psychology/BeckDepressionInventory/__tests__/index.test.tsx)
│   │   │   │       │   │   └── [utils.test.ts](./lingo/src/games/health/psychology/BeckDepressionInventory/__tests__/utils.test.ts)
│   │   │   │       │   ├── components/
│   │   │   │       │   │   ├── __tests__/
│   │   │   │       │   │   │   ├── [OptionsStep.test.tsx](./lingo/src/games/health/psychology/BeckDepressionInventory/components/__tests__/OptionsStep.test.tsx)
│   │   │   │       │   │   │   └── [ResultsStep.test.tsx](./lingo/src/games/health/psychology/BeckDepressionInventory/components/__tests__/ResultsStep.test.tsx)
│   │   │   │       │   │   ├── [OptionsStep.tsx](./lingo/src/games/health/psychology/BeckDepressionInventory/components/OptionsStep.tsx)
│   │   │   │       │   │   └── [ResultsStep.tsx](./lingo/src/games/health/psychology/BeckDepressionInventory/components/ResultsStep.tsx)
│   │   │   │       │   ├── docs/
│   │   │   │       │   │   └── [beck-depression-inventory.md](./lingo/src/games/health/psychology/BeckDepressionInventory/docs/beck-depression-inventory.md)
│   │   │   │       │   ├── [AGENTS.md](./lingo/src/games/health/psychology/BeckDepressionInventory/AGENTS.md)
│   │   │   │       │   ├── [index.tsx](./lingo/src/games/health/psychology/BeckDepressionInventory/index.tsx)
│   │   │   │       │   ├── [items.ts](./lingo/src/games/health/psychology/BeckDepressionInventory/items.ts)
│   │   │   │       │   └── [utils.ts](./lingo/src/games/health/psychology/BeckDepressionInventory/utils.ts)
│   │   │   │       ├── BigFiveInventory/
│   │   │   │       │   ├── __tests__/
│   │   │   │       │   │   ├── [index.test.tsx](./lingo/src/games/health/psychology/BigFiveInventory/__tests__/index.test.tsx)
│   │   │   │       │   │   └── [utils.test.ts](./lingo/src/games/health/psychology/BigFiveInventory/__tests__/utils.test.ts)
│   │   │   │       │   ├── components/
│   │   │   │       │   │   ├── __tests__/
│   │   │   │       │   │   │   ├── [AgreeStep.test.tsx](./lingo/src/games/health/psychology/BigFiveInventory/components/__tests__/AgreeStep.test.tsx)
│   │   │   │       │   │   │   └── [ResultsStep.test.tsx](./lingo/src/games/health/psychology/BigFiveInventory/components/__tests__/ResultsStep.test.tsx)
│   │   │   │       │   │   ├── [AgreeStep.tsx](./lingo/src/games/health/psychology/BigFiveInventory/components/AgreeStep.tsx)
│   │   │   │       │   │   └── [ResultsStep.tsx](./lingo/src/games/health/psychology/BigFiveInventory/components/ResultsStep.tsx)
│   │   │   │       │   ├── docs/
│   │   │   │       │   │   └── [big-five-inventory.md](./lingo/src/games/health/psychology/BigFiveInventory/docs/big-five-inventory.md)
│   │   │   │       │   ├── [AGENTS.md](./lingo/src/games/health/psychology/BigFiveInventory/AGENTS.md)
│   │   │   │       │   ├── [index.tsx](./lingo/src/games/health/psychology/BigFiveInventory/index.tsx)
│   │   │   │       │   └── [utils.ts](./lingo/src/games/health/psychology/BigFiveInventory/utils.ts)
│   │   │   │       ├── DyadicAdjustmentScale/
│   │   │   │       │   ├── __tests__/
│   │   │   │       │   │   ├── [index.test.tsx](./lingo/src/games/health/psychology/DyadicAdjustmentScale/__tests__/index.test.tsx)
│   │   │   │       │   │   └── [utils.test.ts](./lingo/src/games/health/psychology/DyadicAdjustmentScale/__tests__/utils.test.ts)
│   │   │   │       │   ├── components/
│   │   │   │       │   │   ├── __tests__/
│   │   │   │       │   │   │   ├── [OptionsStep.test.tsx](./lingo/src/games/health/psychology/DyadicAdjustmentScale/components/__tests__/OptionsStep.test.tsx)
│   │   │   │       │   │   │   └── [ResultsStep.test.tsx](./lingo/src/games/health/psychology/DyadicAdjustmentScale/components/__tests__/ResultsStep.test.tsx)
│   │   │   │       │   │   ├── [OptionsStep.tsx](./lingo/src/games/health/psychology/DyadicAdjustmentScale/components/OptionsStep.tsx)
│   │   │   │       │   │   └── [ResultsStep.tsx](./lingo/src/games/health/psychology/DyadicAdjustmentScale/components/ResultsStep.tsx)
│   │   │   │       │   ├── docs/
│   │   │   │       │   │   └── [dyadic-adjustment-scale.md](./lingo/src/games/health/psychology/DyadicAdjustmentScale/docs/dyadic-adjustment-scale.md)
│   │   │   │       │   ├── [AGENTS.md](./lingo/src/games/health/psychology/DyadicAdjustmentScale/AGENTS.md)
│   │   │   │       │   ├── [index.tsx](./lingo/src/games/health/psychology/DyadicAdjustmentScale/index.tsx)
│   │   │   │       │   └── [utils.ts](./lingo/src/games/health/psychology/DyadicAdjustmentScale/utils.ts)
│   │   │   │       ├── ExperiencesInCloseRelationships/
│   │   │   │       │   ├── __tests__/
│   │   │   │       │   │   ├── [index.test.tsx](./lingo/src/games/health/psychology/ExperiencesInCloseRelationships/__tests__/index.test.tsx)
│   │   │   │       │   │   └── [utils.test.ts](./lingo/src/games/health/psychology/ExperiencesInCloseRelationships/__tests__/utils.test.ts)
│   │   │   │       │   ├── components/
│   │   │   │       │   │   ├── __tests__/
│   │   │   │       │   │   │   ├── [ResultsStep.test.tsx](./lingo/src/games/health/psychology/ExperiencesInCloseRelationships/components/__tests__/ResultsStep.test.tsx)
│   │   │   │       │   │   │   └── [ScaleStep.test.tsx](./lingo/src/games/health/psychology/ExperiencesInCloseRelationships/components/__tests__/ScaleStep.test.tsx)
│   │   │   │       │   │   ├── [ResultsStep.tsx](./lingo/src/games/health/psychology/ExperiencesInCloseRelationships/components/ResultsStep.tsx)
│   │   │   │       │   │   └── [ScaleStep.tsx](./lingo/src/games/health/psychology/ExperiencesInCloseRelationships/components/ScaleStep.tsx)
│   │   │   │       │   ├── docs/
│   │   │   │       │   │   └── [experiences-in-close-relationships.md](./lingo/src/games/health/psychology/ExperiencesInCloseRelationships/docs/experiences-in-close-relationships.md)
│   │   │   │       │   ├── [AGENTS.md](./lingo/src/games/health/psychology/ExperiencesInCloseRelationships/AGENTS.md)
│   │   │   │       │   ├── [index.tsx](./lingo/src/games/health/psychology/ExperiencesInCloseRelationships/index.tsx)
│   │   │   │       │   └── [utils.ts](./lingo/src/games/health/psychology/ExperiencesInCloseRelationships/utils.ts)
│   │   │   │       ├── GeneralizedAnxietyDisorderScale/
│   │   │   │       │   ├── __tests__/
│   │   │   │       │   │   ├── [index.test.tsx](./lingo/src/games/health/psychology/GeneralizedAnxietyDisorderScale/__tests__/index.test.tsx)
│   │   │   │       │   │   └── [utils.test.ts](./lingo/src/games/health/psychology/GeneralizedAnxietyDisorderScale/__tests__/utils.test.ts)
│   │   │   │       │   ├── components/
│   │   │   │       │   │   ├── __tests__/
│   │   │   │       │   │   │   ├── [FrequencyStep.test.tsx](./lingo/src/games/health/psychology/GeneralizedAnxietyDisorderScale/components/__tests__/FrequencyStep.test.tsx)
│   │   │   │       │   │   │   └── [ResultsStep.test.tsx](./lingo/src/games/health/psychology/GeneralizedAnxietyDisorderScale/components/__tests__/ResultsStep.test.tsx)
│   │   │   │       │   │   ├── [FrequencyStep.tsx](./lingo/src/games/health/psychology/GeneralizedAnxietyDisorderScale/components/FrequencyStep.tsx)
│   │   │   │       │   │   └── [ResultsStep.tsx](./lingo/src/games/health/psychology/GeneralizedAnxietyDisorderScale/components/ResultsStep.tsx)
│   │   │   │       │   ├── docs/
│   │   │   │       │   │   └── [generalized-anxiety-disorder-scale.md](./lingo/src/games/health/psychology/GeneralizedAnxietyDisorderScale/docs/generalized-anxiety-disorder-scale.md)
│   │   │   │       │   ├── [AGENTS.md](./lingo/src/games/health/psychology/GeneralizedAnxietyDisorderScale/AGENTS.md)
│   │   │   │       │   ├── [index.tsx](./lingo/src/games/health/psychology/GeneralizedAnxietyDisorderScale/index.tsx)
│   │   │   │       │   └── [utils.ts](./lingo/src/games/health/psychology/GeneralizedAnxietyDisorderScale/utils.ts)
│   │   │   │       ├── PatientHealthQuestionnaire/
│   │   │   │       │   ├── __tests__/
│   │   │   │       │   │   ├── [index.test.tsx](./lingo/src/games/health/psychology/PatientHealthQuestionnaire/__tests__/index.test.tsx)
│   │   │   │       │   │   └── [utils.test.ts](./lingo/src/games/health/psychology/PatientHealthQuestionnaire/__tests__/utils.test.ts)
│   │   │   │       │   ├── components/
│   │   │   │       │   │   ├── __tests__/
│   │   │   │       │   │   │   ├── [FrequencyStep.test.tsx](./lingo/src/games/health/psychology/PatientHealthQuestionnaire/components/__tests__/FrequencyStep.test.tsx)
│   │   │   │       │   │   │   └── [ResultsStep.test.tsx](./lingo/src/games/health/psychology/PatientHealthQuestionnaire/components/__tests__/ResultsStep.test.tsx)
│   │   │   │       │   │   ├── [FrequencyStep.tsx](./lingo/src/games/health/psychology/PatientHealthQuestionnaire/components/FrequencyStep.tsx)
│   │   │   │       │   │   └── [ResultsStep.tsx](./lingo/src/games/health/psychology/PatientHealthQuestionnaire/components/ResultsStep.tsx)
│   │   │   │       │   ├── docs/
│   │   │   │       │   │   └── [patient-health-questionnaire.md](./lingo/src/games/health/psychology/PatientHealthQuestionnaire/docs/patient-health-questionnaire.md)
│   │   │   │       │   ├── [AGENTS.md](./lingo/src/games/health/psychology/PatientHealthQuestionnaire/AGENTS.md)
│   │   │   │       │   ├── [index.tsx](./lingo/src/games/health/psychology/PatientHealthQuestionnaire/index.tsx)
│   │   │   │       │   └── [utils.ts](./lingo/src/games/health/psychology/PatientHealthQuestionnaire/utils.ts)
│   │   │   │       ├── RelationshipClosenessInventory/
│   │   │   │       │   ├── __tests__/
│   │   │   │       │   │   ├── [index.test.tsx](./lingo/src/games/health/psychology/RelationshipClosenessInventory/__tests__/index.test.tsx)
│   │   │   │       │   │   └── [utils.test.ts](./lingo/src/games/health/psychology/RelationshipClosenessInventory/__tests__/utils.test.ts)
│   │   │   │       │   ├── components/
│   │   │   │       │   │   ├── __tests__/
│   │   │   │       │   │   │   ├── [ActivitiesStep.test.tsx](./lingo/src/games/health/psychology/RelationshipClosenessInventory/components/__tests__/ActivitiesStep.test.tsx)
│   │   │   │       │   │   │   ├── [ResultsStep.test.tsx](./lingo/src/games/health/psychology/RelationshipClosenessInventory/components/__tests__/ResultsStep.test.tsx)
│   │   │   │       │   │   │   └── [TimeStep.test.tsx](./lingo/src/games/health/psychology/RelationshipClosenessInventory/components/__tests__/TimeStep.test.tsx)
│   │   │   │       │   │   ├── [ActivitiesStep.tsx](./lingo/src/games/health/psychology/RelationshipClosenessInventory/components/ActivitiesStep.tsx)
│   │   │   │       │   │   ├── [ResultsStep.tsx](./lingo/src/games/health/psychology/RelationshipClosenessInventory/components/ResultsStep.tsx)
│   │   │   │       │   │   ├── [ScaleStep.tsx](./lingo/src/games/health/psychology/RelationshipClosenessInventory/components/ScaleStep.tsx)
│   │   │   │       │   │   └── [TimeStep.tsx](./lingo/src/games/health/psychology/RelationshipClosenessInventory/components/TimeStep.tsx)
│   │   │   │       │   ├── docs/
│   │   │   │       │   │   └── [relationship-closeness-inventory-revised.md](./lingo/src/games/health/psychology/RelationshipClosenessInventory/docs/relationship-closeness-inventory-revised.md)
│   │   │   │       │   ├── [AGENTS.md](./lingo/src/games/health/psychology/RelationshipClosenessInventory/AGENTS.md)
│   │   │   │       │   ├── [index.tsx](./lingo/src/games/health/psychology/RelationshipClosenessInventory/index.tsx)
│   │   │   │       │   └── [utils.ts](./lingo/src/games/health/psychology/RelationshipClosenessInventory/utils.ts)
│   │   │   │       └── SatisfactionWithLifeScale/
│   │   │   │           ├── __tests__/
│   │   │   │           │   ├── [index.test.tsx](./lingo/src/games/health/psychology/SatisfactionWithLifeScale/__tests__/index.test.tsx)
│   │   │   │           │   └── [utils.test.ts](./lingo/src/games/health/psychology/SatisfactionWithLifeScale/__tests__/utils.test.ts)
│   │   │   │           ├── components/
│   │   │   │           │   ├── [ResultsStep.tsx](./lingo/src/games/health/psychology/SatisfactionWithLifeScale/components/ResultsStep.tsx)
│   │   │   │           │   └── [ScaleStep.tsx](./lingo/src/games/health/psychology/SatisfactionWithLifeScale/components/ScaleStep.tsx)
│   │   │   │           ├── docs/
│   │   │   │           │   └── [satisfacition-with-life-scale.md](./lingo/src/games/health/psychology/SatisfactionWithLifeScale/docs/satisfacition-with-life-scale.md)
│   │   │   │           ├── [AGENTS.md](./lingo/src/games/health/psychology/SatisfactionWithLifeScale/AGENTS.md)
│   │   │   │           ├── [index.tsx](./lingo/src/games/health/psychology/SatisfactionWithLifeScale/index.tsx)
│   │   │   │           └── [utils.ts](./lingo/src/games/health/psychology/SatisfactionWithLifeScale/utils.ts)
│   │   │   ├── humanities/
│   │   │   │   ├── economics/
│   │   │   │   │   ├── ad-as/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [game.test.ts](./lingo/src/games/humanities/economics/ad-as/__tests__/game.test.ts)
│   │   │   │   │   │   │   ├── [index.test.tsx](./lingo/src/games/humanities/economics/ad-as/__tests__/index.test.tsx)
│   │   │   │   │   │   │   └── [reducer.test.ts](./lingo/src/games/humanities/economics/ad-as/__tests__/reducer.test.ts)
│   │   │   │   │   │   ├── [components.tsx](./lingo/src/games/humanities/economics/ad-as/components.tsx)
│   │   │   │   │   │   ├── [constants.ts](./lingo/src/games/humanities/economics/ad-as/constants.ts)
│   │   │   │   │   │   ├── [game.ts](./lingo/src/games/humanities/economics/ad-as/game.ts)
│   │   │   │   │   │   ├── [index.tsx](./lingo/src/games/humanities/economics/ad-as/index.tsx)
│   │   │   │   │   │   ├── [reducer.ts](./lingo/src/games/humanities/economics/ad-as/reducer.ts)
│   │   │   │   │   │   └── [types.ts](./lingo/src/games/humanities/economics/ad-as/types.ts)
│   │   │   │   │   ├── arbitrage/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [game.test.ts](./lingo/src/games/humanities/economics/arbitrage/__tests__/game.test.ts)
│   │   │   │   │   │   │   ├── [index.test.tsx](./lingo/src/games/humanities/economics/arbitrage/__tests__/index.test.tsx)
│   │   │   │   │   │   │   └── [reducer.test.ts](./lingo/src/games/humanities/economics/arbitrage/__tests__/reducer.test.ts)
│   │   │   │   │   │   ├── [components.tsx](./lingo/src/games/humanities/economics/arbitrage/components.tsx)
│   │   │   │   │   │   ├── [constants.ts](./lingo/src/games/humanities/economics/arbitrage/constants.ts)
│   │   │   │   │   │   ├── [game.ts](./lingo/src/games/humanities/economics/arbitrage/game.ts)
│   │   │   │   │   │   ├── [index.tsx](./lingo/src/games/humanities/economics/arbitrage/index.tsx)
│   │   │   │   │   │   ├── [reducer.ts](./lingo/src/games/humanities/economics/arbitrage/reducer.ts)
│   │   │   │   │   │   └── [types.ts](./lingo/src/games/humanities/economics/arbitrage/types.ts)
│   │   │   │   │   ├── auction/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [game.test.ts](./lingo/src/games/humanities/economics/auction/__tests__/game.test.ts)
│   │   │   │   │   │   │   ├── [index.test.tsx](./lingo/src/games/humanities/economics/auction/__tests__/index.test.tsx)
│   │   │   │   │   │   │   └── [reducer.test.ts](./lingo/src/games/humanities/economics/auction/__tests__/reducer.test.ts)
│   │   │   │   │   │   ├── [constants.ts](./lingo/src/games/humanities/economics/auction/constants.ts)
│   │   │   │   │   │   ├── [game.ts](./lingo/src/games/humanities/economics/auction/game.ts)
│   │   │   │   │   │   ├── [index.tsx](./lingo/src/games/humanities/economics/auction/index.tsx)
│   │   │   │   │   │   ├── [reducer.ts](./lingo/src/games/humanities/economics/auction/reducer.ts)
│   │   │   │   │   │   └── [types.ts](./lingo/src/games/humanities/economics/auction/types.ts)
│   │   │   │   │   ├── bargaining/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [game.test.ts](./lingo/src/games/humanities/economics/bargaining/__tests__/game.test.ts)
│   │   │   │   │   │   │   ├── [index.test.tsx](./lingo/src/games/humanities/economics/bargaining/__tests__/index.test.tsx)
│   │   │   │   │   │   │   └── [reducer.test.ts](./lingo/src/games/humanities/economics/bargaining/__tests__/reducer.test.ts)
│   │   │   │   │   │   ├── [constants.ts](./lingo/src/games/humanities/economics/bargaining/constants.ts)
│   │   │   │   │   │   ├── [game.ts](./lingo/src/games/humanities/economics/bargaining/game.ts)
│   │   │   │   │   │   ├── [index.tsx](./lingo/src/games/humanities/economics/bargaining/index.tsx)
│   │   │   │   │   │   ├── [reducer.ts](./lingo/src/games/humanities/economics/bargaining/reducer.ts)
│   │   │   │   │   │   └── [types.ts](./lingo/src/games/humanities/economics/bargaining/types.ts)
│   │   │   │   │   ├── basics/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [game.test.ts](./lingo/src/games/humanities/economics/basics/__tests__/game.test.ts)
│   │   │   │   │   │   │   ├── [index.test.tsx](./lingo/src/games/humanities/economics/basics/__tests__/index.test.tsx)
│   │   │   │   │   │   │   └── [reducer.test.ts](./lingo/src/games/humanities/economics/basics/__tests__/reducer.test.ts)
│   │   │   │   │   │   ├── [components.tsx](./lingo/src/games/humanities/economics/basics/components.tsx)
│   │   │   │   │   │   ├── [constants.ts](./lingo/src/games/humanities/economics/basics/constants.ts)
│   │   │   │   │   │   ├── [game.ts](./lingo/src/games/humanities/economics/basics/game.ts)
│   │   │   │   │   │   ├── [index.tsx](./lingo/src/games/humanities/economics/basics/index.tsx)
│   │   │   │   │   │   ├── [panels.tsx](./lingo/src/games/humanities/economics/basics/panels.tsx)
│   │   │   │   │   │   ├── [reducer.ts](./lingo/src/games/humanities/economics/basics/reducer.ts)
│   │   │   │   │   │   └── [types.ts](./lingo/src/games/humanities/economics/basics/types.ts)
│   │   │   │   │   ├── bayesian/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [game.test.ts](./lingo/src/games/humanities/economics/bayesian/__tests__/game.test.ts)
│   │   │   │   │   │   │   ├── [index.test.tsx](./lingo/src/games/humanities/economics/bayesian/__tests__/index.test.tsx)
│   │   │   │   │   │   │   └── [reducer.test.ts](./lingo/src/games/humanities/economics/bayesian/__tests__/reducer.test.ts)
│   │   │   │   │   │   ├── [components.tsx](./lingo/src/games/humanities/economics/bayesian/components.tsx)
│   │   │   │   │   │   ├── [constants.ts](./lingo/src/games/humanities/economics/bayesian/constants.ts)
│   │   │   │   │   │   ├── [game.ts](./lingo/src/games/humanities/economics/bayesian/game.ts)
│   │   │   │   │   │   ├── [index.tsx](./lingo/src/games/humanities/economics/bayesian/index.tsx)
│   │   │   │   │   │   ├── [reducer.ts](./lingo/src/games/humanities/economics/bayesian/reducer.ts)
│   │   │   │   │   │   └── [types.ts](./lingo/src/games/humanities/economics/bayesian/types.ts)
│   │   │   │   │   ├── bubbles/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [game.test.ts](./lingo/src/games/humanities/economics/bubbles/__tests__/game.test.ts)
│   │   │   │   │   │   │   ├── [index.test.tsx](./lingo/src/games/humanities/economics/bubbles/__tests__/index.test.tsx)
│   │   │   │   │   │   │   └── [reducer.test.ts](./lingo/src/games/humanities/economics/bubbles/__tests__/reducer.test.ts)
│   │   │   │   │   │   ├── [components.tsx](./lingo/src/games/humanities/economics/bubbles/components.tsx)
│   │   │   │   │   │   ├── [constants.ts](./lingo/src/games/humanities/economics/bubbles/constants.ts)
│   │   │   │   │   │   ├── [game.ts](./lingo/src/games/humanities/economics/bubbles/game.ts)
│   │   │   │   │   │   ├── [index.tsx](./lingo/src/games/humanities/economics/bubbles/index.tsx)
│   │   │   │   │   │   ├── [reducer.ts](./lingo/src/games/humanities/economics/bubbles/reducer.ts)
│   │   │   │   │   │   └── [types.ts](./lingo/src/games/humanities/economics/bubbles/types.ts)
│   │   │   │   │   ├── business-cycles/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [game.test.ts](./lingo/src/games/humanities/economics/business-cycles/__tests__/game.test.ts)
│   │   │   │   │   │   │   ├── [index.test.tsx](./lingo/src/games/humanities/economics/business-cycles/__tests__/index.test.tsx)
│   │   │   │   │   │   │   └── [reducer.test.ts](./lingo/src/games/humanities/economics/business-cycles/__tests__/reducer.test.ts)
│   │   │   │   │   │   ├── [components.tsx](./lingo/src/games/humanities/economics/business-cycles/components.tsx)
│   │   │   │   │   │   ├── [constants.ts](./lingo/src/games/humanities/economics/business-cycles/constants.ts)
│   │   │   │   │   │   ├── [game.ts](./lingo/src/games/humanities/economics/business-cycles/game.ts)
│   │   │   │   │   │   ├── [index.tsx](./lingo/src/games/humanities/economics/business-cycles/index.tsx)
│   │   │   │   │   │   ├── [reducer.ts](./lingo/src/games/humanities/economics/business-cycles/reducer.ts)
│   │   │   │   │   │   └── [types.ts](./lingo/src/games/humanities/economics/business-cycles/types.ts)
│   │   │   │   │   ├── capm/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [game.test.ts](./lingo/src/games/humanities/economics/capm/__tests__/game.test.ts)
│   │   │   │   │   │   │   ├── [index.test.tsx](./lingo/src/games/humanities/economics/capm/__tests__/index.test.tsx)
│   │   │   │   │   │   │   └── [reducer.test.ts](./lingo/src/games/humanities/economics/capm/__tests__/reducer.test.ts)
│   │   │   │   │   │   ├── [components.tsx](./lingo/src/games/humanities/economics/capm/components.tsx)
│   │   │   │   │   │   ├── [constants.ts](./lingo/src/games/humanities/economics/capm/constants.ts)
│   │   │   │   │   │   ├── [game.ts](./lingo/src/games/humanities/economics/capm/game.ts)
│   │   │   │   │   │   ├── [index.tsx](./lingo/src/games/humanities/economics/capm/index.tsx)
│   │   │   │   │   │   ├── [reducer.ts](./lingo/src/games/humanities/economics/capm/reducer.ts)
│   │   │   │   │   │   └── [types.ts](./lingo/src/games/humanities/economics/capm/types.ts)
│   │   │   │   │   ├── causal/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [game.test.ts](./lingo/src/games/humanities/economics/causal/__tests__/game.test.ts)
│   │   │   │   │   │   │   ├── [index.test.tsx](./lingo/src/games/humanities/economics/causal/__tests__/index.test.tsx)
│   │   │   │   │   │   │   └── [reducer.test.ts](./lingo/src/games/humanities/economics/causal/__tests__/reducer.test.ts)
│   │   │   │   │   │   ├── [components.tsx](./lingo/src/games/humanities/economics/causal/components.tsx)
│   │   │   │   │   │   ├── [constants.ts](./lingo/src/games/humanities/economics/causal/constants.ts)
│   │   │   │   │   │   ├── [game.ts](./lingo/src/games/humanities/economics/causal/game.ts)
│   │   │   │   │   │   ├── [index.tsx](./lingo/src/games/humanities/economics/causal/index.tsx)
│   │   │   │   │   │   ├── [reducer.ts](./lingo/src/games/humanities/economics/causal/reducer.ts)
│   │   │   │   │   │   └── [types.ts](./lingo/src/games/humanities/economics/causal/types.ts)
│   │   │   │   │   ├── commitment/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [game.test.ts](./lingo/src/games/humanities/economics/commitment/__tests__/game.test.ts)
│   │   │   │   │   │   │   ├── [index.test.tsx](./lingo/src/games/humanities/economics/commitment/__tests__/index.test.tsx)
│   │   │   │   │   │   │   └── [reducer.test.ts](./lingo/src/games/humanities/economics/commitment/__tests__/reducer.test.ts)
│   │   │   │   │   │   ├── [constants.ts](./lingo/src/games/humanities/economics/commitment/constants.ts)
│   │   │   │   │   │   ├── [game.ts](./lingo/src/games/humanities/economics/commitment/game.ts)
│   │   │   │   │   │   ├── [index.tsx](./lingo/src/games/humanities/economics/commitment/index.tsx)
│   │   │   │   │   │   ├── [reducer.ts](./lingo/src/games/humanities/economics/commitment/reducer.ts)
│   │   │   │   │   │   └── [types.ts](./lingo/src/games/humanities/economics/commitment/types.ts)
│   │   │   │   │   ├── commons/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [game.test.ts](./lingo/src/games/humanities/economics/commons/__tests__/game.test.ts)
│   │   │   │   │   │   │   ├── [index.test.tsx](./lingo/src/games/humanities/economics/commons/__tests__/index.test.tsx)
│   │   │   │   │   │   │   └── [reducer.test.ts](./lingo/src/games/humanities/economics/commons/__tests__/reducer.test.ts)
│   │   │   │   │   │   ├── [constants.ts](./lingo/src/games/humanities/economics/commons/constants.ts)
│   │   │   │   │   │   ├── [game.ts](./lingo/src/games/humanities/economics/commons/game.ts)
│   │   │   │   │   │   ├── [index.tsx](./lingo/src/games/humanities/economics/commons/index.tsx)
│   │   │   │   │   │   ├── [reducer.ts](./lingo/src/games/humanities/economics/commons/reducer.ts)
│   │   │   │   │   │   └── [types.ts](./lingo/src/games/humanities/economics/commons/types.ts)
│   │   │   │   │   ├── consumer/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [game.test.ts](./lingo/src/games/humanities/economics/consumer/__tests__/game.test.ts)
│   │   │   │   │   │   │   ├── [index.test.tsx](./lingo/src/games/humanities/economics/consumer/__tests__/index.test.tsx)
│   │   │   │   │   │   │   └── [reducer.test.ts](./lingo/src/games/humanities/economics/consumer/__tests__/reducer.test.ts)
│   │   │   │   │   │   ├── [components.tsx](./lingo/src/games/humanities/economics/consumer/components.tsx)
│   │   │   │   │   │   ├── [constants.ts](./lingo/src/games/humanities/economics/consumer/constants.ts)
│   │   │   │   │   │   ├── [game.ts](./lingo/src/games/humanities/economics/consumer/game.ts)
│   │   │   │   │   │   ├── [index.tsx](./lingo/src/games/humanities/economics/consumer/index.tsx)
│   │   │   │   │   │   ├── [reducer.ts](./lingo/src/games/humanities/economics/consumer/reducer.ts)
│   │   │   │   │   │   └── [types.ts](./lingo/src/games/humanities/economics/consumer/types.ts)
│   │   │   │   │   ├── dictator/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [game.test.ts](./lingo/src/games/humanities/economics/dictator/__tests__/game.test.ts)
│   │   │   │   │   │   │   ├── [index.test.tsx](./lingo/src/games/humanities/economics/dictator/__tests__/index.test.tsx)
│   │   │   │   │   │   │   └── [reducer.test.ts](./lingo/src/games/humanities/economics/dictator/__tests__/reducer.test.ts)
│   │   │   │   │   │   ├── [constants.ts](./lingo/src/games/humanities/economics/dictator/constants.ts)
│   │   │   │   │   │   ├── [game.ts](./lingo/src/games/humanities/economics/dictator/game.ts)
│   │   │   │   │   │   ├── [index.tsx](./lingo/src/games/humanities/economics/dictator/index.tsx)
│   │   │   │   │   │   ├── [reducer.ts](./lingo/src/games/humanities/economics/dictator/reducer.ts)
│   │   │   │   │   │   └── [types.ts](./lingo/src/games/humanities/economics/dictator/types.ts)
│   │   │   │   │   ├── elasticity/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [game.test.ts](./lingo/src/games/humanities/economics/elasticity/__tests__/game.test.ts)
│   │   │   │   │   │   │   ├── [index.test.tsx](./lingo/src/games/humanities/economics/elasticity/__tests__/index.test.tsx)
│   │   │   │   │   │   │   └── [reducer.test.ts](./lingo/src/games/humanities/economics/elasticity/__tests__/reducer.test.ts)
│   │   │   │   │   │   ├── [components.tsx](./lingo/src/games/humanities/economics/elasticity/components.tsx)
│   │   │   │   │   │   ├── [constants.ts](./lingo/src/games/humanities/economics/elasticity/constants.ts)
│   │   │   │   │   │   ├── [game.ts](./lingo/src/games/humanities/economics/elasticity/game.ts)
│   │   │   │   │   │   ├── [index.tsx](./lingo/src/games/humanities/economics/elasticity/index.tsx)
│   │   │   │   │   │   ├── [reducer.ts](./lingo/src/games/humanities/economics/elasticity/reducer.ts)
│   │   │   │   │   │   └── [types.ts](./lingo/src/games/humanities/economics/elasticity/types.ts)
│   │   │   │   │   ├── emh/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [game.test.ts](./lingo/src/games/humanities/economics/emh/__tests__/game.test.ts)
│   │   │   │   │   │   │   ├── [index.test.tsx](./lingo/src/games/humanities/economics/emh/__tests__/index.test.tsx)
│   │   │   │   │   │   │   └── [reducer.test.ts](./lingo/src/games/humanities/economics/emh/__tests__/reducer.test.ts)
│   │   │   │   │   │   ├── [components.tsx](./lingo/src/games/humanities/economics/emh/components.tsx)
│   │   │   │   │   │   ├── [constants.ts](./lingo/src/games/humanities/economics/emh/constants.ts)
│   │   │   │   │   │   ├── [game.ts](./lingo/src/games/humanities/economics/emh/game.ts)
│   │   │   │   │   │   ├── [index.tsx](./lingo/src/games/humanities/economics/emh/index.tsx)
│   │   │   │   │   │   ├── [reducer.ts](./lingo/src/games/humanities/economics/emh/reducer.ts)
│   │   │   │   │   │   └── [types.ts](./lingo/src/games/humanities/economics/emh/types.ts)
│   │   │   │   │   ├── endowment/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [game.test.ts](./lingo/src/games/humanities/economics/endowment/__tests__/game.test.ts)
│   │   │   │   │   │   │   ├── [index.test.tsx](./lingo/src/games/humanities/economics/endowment/__tests__/index.test.tsx)
│   │   │   │   │   │   │   └── [reducer.test.ts](./lingo/src/games/humanities/economics/endowment/__tests__/reducer.test.ts)
│   │   │   │   │   │   ├── [constants.ts](./lingo/src/games/humanities/economics/endowment/constants.ts)
│   │   │   │   │   │   ├── [game.ts](./lingo/src/games/humanities/economics/endowment/game.ts)
│   │   │   │   │   │   ├── [index.tsx](./lingo/src/games/humanities/economics/endowment/index.tsx)
│   │   │   │   │   │   ├── [reducer.ts](./lingo/src/games/humanities/economics/endowment/reducer.ts)
│   │   │   │   │   │   └── [types.ts](./lingo/src/games/humanities/economics/endowment/types.ts)
│   │   │   │   │   ├── evolution/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [game.test.ts](./lingo/src/games/humanities/economics/evolution/__tests__/game.test.ts)
│   │   │   │   │   │   │   ├── [index.test.tsx](./lingo/src/games/humanities/economics/evolution/__tests__/index.test.tsx)
│   │   │   │   │   │   │   └── [reducer.test.ts](./lingo/src/games/humanities/economics/evolution/__tests__/reducer.test.ts)
│   │   │   │   │   │   ├── [components.tsx](./lingo/src/games/humanities/economics/evolution/components.tsx)
│   │   │   │   │   │   ├── [constants.ts](./lingo/src/games/humanities/economics/evolution/constants.ts)
│   │   │   │   │   │   ├── [game.ts](./lingo/src/games/humanities/economics/evolution/game.ts)
│   │   │   │   │   │   ├── [index.tsx](./lingo/src/games/humanities/economics/evolution/index.tsx)
│   │   │   │   │   │   ├── [reducer.ts](./lingo/src/games/humanities/economics/evolution/reducer.ts)
│   │   │   │   │   │   └── [types.ts](./lingo/src/games/humanities/economics/evolution/types.ts)
│   │   │   │   │   ├── externalities/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [game.test.ts](./lingo/src/games/humanities/economics/externalities/__tests__/game.test.ts)
│   │   │   │   │   │   │   ├── [index.test.tsx](./lingo/src/games/humanities/economics/externalities/__tests__/index.test.tsx)
│   │   │   │   │   │   │   └── [reducer.test.ts](./lingo/src/games/humanities/economics/externalities/__tests__/reducer.test.ts)
│   │   │   │   │   │   ├── [components.tsx](./lingo/src/games/humanities/economics/externalities/components.tsx)
│   │   │   │   │   │   ├── [constants.ts](./lingo/src/games/humanities/economics/externalities/constants.ts)
│   │   │   │   │   │   ├── [game.ts](./lingo/src/games/humanities/economics/externalities/game.ts)
│   │   │   │   │   │   ├── [index.tsx](./lingo/src/games/humanities/economics/externalities/index.tsx)
│   │   │   │   │   │   ├── [reducer.ts](./lingo/src/games/humanities/economics/externalities/reducer.ts)
│   │   │   │   │   │   └── [types.ts](./lingo/src/games/humanities/economics/externalities/types.ts)
│   │   │   │   │   ├── fiscal/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [game.test.ts](./lingo/src/games/humanities/economics/fiscal/__tests__/game.test.ts)
│   │   │   │   │   │   │   ├── [index.test.tsx](./lingo/src/games/humanities/economics/fiscal/__tests__/index.test.tsx)
│   │   │   │   │   │   │   └── [reducer.test.ts](./lingo/src/games/humanities/economics/fiscal/__tests__/reducer.test.ts)
│   │   │   │   │   │   ├── [components.tsx](./lingo/src/games/humanities/economics/fiscal/components.tsx)
│   │   │   │   │   │   ├── [constants.ts](./lingo/src/games/humanities/economics/fiscal/constants.ts)
│   │   │   │   │   │   ├── [game.ts](./lingo/src/games/humanities/economics/fiscal/game.ts)
│   │   │   │   │   │   ├── [index.tsx](./lingo/src/games/humanities/economics/fiscal/index.tsx)
│   │   │   │   │   │   ├── [reducer.ts](./lingo/src/games/humanities/economics/fiscal/reducer.ts)
│   │   │   │   │   │   └── [types.ts](./lingo/src/games/humanities/economics/fiscal/types.ts)
│   │   │   │   │   ├── framing/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [game.test.ts](./lingo/src/games/humanities/economics/framing/__tests__/game.test.ts)
│   │   │   │   │   │   │   ├── [index.test.tsx](./lingo/src/games/humanities/economics/framing/__tests__/index.test.tsx)
│   │   │   │   │   │   │   └── [reducer.test.ts](./lingo/src/games/humanities/economics/framing/__tests__/reducer.test.ts)
│   │   │   │   │   │   ├── [constants.ts](./lingo/src/games/humanities/economics/framing/constants.ts)
│   │   │   │   │   │   ├── [game.ts](./lingo/src/games/humanities/economics/framing/game.ts)
│   │   │   │   │   │   ├── [index.tsx](./lingo/src/games/humanities/economics/framing/index.tsx)
│   │   │   │   │   │   ├── [reducer.ts](./lingo/src/games/humanities/economics/framing/reducer.ts)
│   │   │   │   │   │   └── [types.ts](./lingo/src/games/humanities/economics/framing/types.ts)
│   │   │   │   │   ├── gdp/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [game.test.ts](./lingo/src/games/humanities/economics/gdp/__tests__/game.test.ts)
│   │   │   │   │   │   │   ├── [index.test.tsx](./lingo/src/games/humanities/economics/gdp/__tests__/index.test.tsx)
│   │   │   │   │   │   │   └── [reducer.test.ts](./lingo/src/games/humanities/economics/gdp/__tests__/reducer.test.ts)
│   │   │   │   │   │   ├── [components.tsx](./lingo/src/games/humanities/economics/gdp/components.tsx)
│   │   │   │   │   │   ├── [constants.ts](./lingo/src/games/humanities/economics/gdp/constants.ts)
│   │   │   │   │   │   ├── [game.ts](./lingo/src/games/humanities/economics/gdp/game.ts)
│   │   │   │   │   │   ├── [index.tsx](./lingo/src/games/humanities/economics/gdp/index.tsx)
│   │   │   │   │   │   ├── [reducer.ts](./lingo/src/games/humanities/economics/gdp/reducer.ts)
│   │   │   │   │   │   └── [types.ts](./lingo/src/games/humanities/economics/gdp/types.ts)
│   │   │   │   │   ├── heuristics/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [game.test.ts](./lingo/src/games/humanities/economics/heuristics/__tests__/game.test.ts)
│   │   │   │   │   │   │   ├── [index.test.tsx](./lingo/src/games/humanities/economics/heuristics/__tests__/index.test.tsx)
│   │   │   │   │   │   │   └── [reducer.test.ts](./lingo/src/games/humanities/economics/heuristics/__tests__/reducer.test.ts)
│   │   │   │   │   │   ├── [components.tsx](./lingo/src/games/humanities/economics/heuristics/components.tsx)
│   │   │   │   │   │   ├── [constants.ts](./lingo/src/games/humanities/economics/heuristics/constants.ts)
│   │   │   │   │   │   ├── [game.ts](./lingo/src/games/humanities/economics/heuristics/game.ts)
│   │   │   │   │   │   ├── [index.tsx](./lingo/src/games/humanities/economics/heuristics/index.tsx)
│   │   │   │   │   │   ├── [reducer.ts](./lingo/src/games/humanities/economics/heuristics/reducer.ts)
│   │   │   │   │   │   └── [types.ts](./lingo/src/games/humanities/economics/heuristics/types.ts)
│   │   │   │   │   ├── human-capital/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [game.test.ts](./lingo/src/games/humanities/economics/human-capital/__tests__/game.test.ts)
│   │   │   │   │   │   │   ├── [index.test.tsx](./lingo/src/games/humanities/economics/human-capital/__tests__/index.test.tsx)
│   │   │   │   │   │   │   └── [reducer.test.ts](./lingo/src/games/humanities/economics/human-capital/__tests__/reducer.test.ts)
│   │   │   │   │   │   ├── [components.tsx](./lingo/src/games/humanities/economics/human-capital/components.tsx)
│   │   │   │   │   │   ├── [constants.ts](./lingo/src/games/humanities/economics/human-capital/constants.ts)
│   │   │   │   │   │   ├── [game.ts](./lingo/src/games/humanities/economics/human-capital/game.ts)
│   │   │   │   │   │   ├── [index.tsx](./lingo/src/games/humanities/economics/human-capital/index.tsx)
│   │   │   │   │   │   ├── [panels.tsx](./lingo/src/games/humanities/economics/human-capital/panels.tsx)
│   │   │   │   │   │   ├── [reducer.ts](./lingo/src/games/humanities/economics/human-capital/reducer.ts)
│   │   │   │   │   │   └── [types.ts](./lingo/src/games/humanities/economics/human-capital/types.ts)
│   │   │   │   │   ├── inequality/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [game.test.ts](./lingo/src/games/humanities/economics/inequality/__tests__/game.test.ts)
│   │   │   │   │   │   │   ├── [index.test.tsx](./lingo/src/games/humanities/economics/inequality/__tests__/index.test.tsx)
│   │   │   │   │   │   │   └── [reducer.test.ts](./lingo/src/games/humanities/economics/inequality/__tests__/reducer.test.ts)
│   │   │   │   │   │   ├── [components.tsx](./lingo/src/games/humanities/economics/inequality/components.tsx)
│   │   │   │   │   │   ├── [constants.ts](./lingo/src/games/humanities/economics/inequality/constants.ts)
│   │   │   │   │   │   ├── [game.ts](./lingo/src/games/humanities/economics/inequality/game.ts)
│   │   │   │   │   │   ├── [index.tsx](./lingo/src/games/humanities/economics/inequality/index.tsx)
│   │   │   │   │   │   ├── [reducer.ts](./lingo/src/games/humanities/economics/inequality/reducer.ts)
│   │   │   │   │   │   └── [types.ts](./lingo/src/games/humanities/economics/inequality/types.ts)
│   │   │   │   │   ├── institutions/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [game.test.ts](./lingo/src/games/humanities/economics/institutions/__tests__/game.test.ts)
│   │   │   │   │   │   │   ├── [index.test.tsx](./lingo/src/games/humanities/economics/institutions/__tests__/index.test.tsx)
│   │   │   │   │   │   │   └── [reducer.test.ts](./lingo/src/games/humanities/economics/institutions/__tests__/reducer.test.ts)
│   │   │   │   │   │   ├── [components.tsx](./lingo/src/games/humanities/economics/institutions/components.tsx)
│   │   │   │   │   │   ├── [constants.ts](./lingo/src/games/humanities/economics/institutions/constants.ts)
│   │   │   │   │   │   ├── [game.ts](./lingo/src/games/humanities/economics/institutions/game.ts)
│   │   │   │   │   │   ├── [index.tsx](./lingo/src/games/humanities/economics/institutions/index.tsx)
│   │   │   │   │   │   ├── [reducer.ts](./lingo/src/games/humanities/economics/institutions/reducer.ts)
│   │   │   │   │   │   └── [types.ts](./lingo/src/games/humanities/economics/institutions/types.ts)
│   │   │   │   │   ├── is-lm/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [game.test.ts](./lingo/src/games/humanities/economics/is-lm/__tests__/game.test.ts)
│   │   │   │   │   │   │   ├── [index.test.tsx](./lingo/src/games/humanities/economics/is-lm/__tests__/index.test.tsx)
│   │   │   │   │   │   │   └── [reducer.test.ts](./lingo/src/games/humanities/economics/is-lm/__tests__/reducer.test.ts)
│   │   │   │   │   │   ├── [components.tsx](./lingo/src/games/humanities/economics/is-lm/components.tsx)
│   │   │   │   │   │   ├── [constants.ts](./lingo/src/games/humanities/economics/is-lm/constants.ts)
│   │   │   │   │   │   ├── [game.ts](./lingo/src/games/humanities/economics/is-lm/game.ts)
│   │   │   │   │   │   ├── [index.tsx](./lingo/src/games/humanities/economics/is-lm/index.tsx)
│   │   │   │   │   │   ├── [plot.tsx](./lingo/src/games/humanities/economics/is-lm/plot.tsx)
│   │   │   │   │   │   ├── [reducer.ts](./lingo/src/games/humanities/economics/is-lm/reducer.ts)
│   │   │   │   │   │   └── [types.ts](./lingo/src/games/humanities/economics/is-lm/types.ts)
│   │   │   │   │   ├── keynesian/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [game.test.ts](./lingo/src/games/humanities/economics/keynesian/__tests__/game.test.ts)
│   │   │   │   │   │   │   ├── [index.test.tsx](./lingo/src/games/humanities/economics/keynesian/__tests__/index.test.tsx)
│   │   │   │   │   │   │   └── [reducer.test.ts](./lingo/src/games/humanities/economics/keynesian/__tests__/reducer.test.ts)
│   │   │   │   │   │   ├── [components.tsx](./lingo/src/games/humanities/economics/keynesian/components.tsx)
│   │   │   │   │   │   ├── [constants.ts](./lingo/src/games/humanities/economics/keynesian/constants.ts)
│   │   │   │   │   │   ├── [game.ts](./lingo/src/games/humanities/economics/keynesian/game.ts)
│   │   │   │   │   │   ├── [index.tsx](./lingo/src/games/humanities/economics/keynesian/index.tsx)
│   │   │   │   │   │   ├── [panels.tsx](./lingo/src/games/humanities/economics/keynesian/panels.tsx)
│   │   │   │   │   │   ├── [primitives.tsx](./lingo/src/games/humanities/economics/keynesian/primitives.tsx)
│   │   │   │   │   │   ├── [reducer.ts](./lingo/src/games/humanities/economics/keynesian/reducer.ts)
│   │   │   │   │   │   ├── [results.tsx](./lingo/src/games/humanities/economics/keynesian/results.tsx)
│   │   │   │   │   │   ├── [screens.tsx](./lingo/src/games/humanities/economics/keynesian/screens.tsx)
│   │   │   │   │   │   └── [types.ts](./lingo/src/games/humanities/economics/keynesian/types.ts)
│   │   │   │   │   ├── labor/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [game.test.ts](./lingo/src/games/humanities/economics/labor/__tests__/game.test.ts)
│   │   │   │   │   │   │   ├── [index.test.tsx](./lingo/src/games/humanities/economics/labor/__tests__/index.test.tsx)
│   │   │   │   │   │   │   └── [reducer.test.ts](./lingo/src/games/humanities/economics/labor/__tests__/reducer.test.ts)
│   │   │   │   │   │   ├── [components.tsx](./lingo/src/games/humanities/economics/labor/components.tsx)
│   │   │   │   │   │   ├── [constants.ts](./lingo/src/games/humanities/economics/labor/constants.ts)
│   │   │   │   │   │   ├── [game.ts](./lingo/src/games/humanities/economics/labor/game.ts)
│   │   │   │   │   │   ├── [index.tsx](./lingo/src/games/humanities/economics/labor/index.tsx)
│   │   │   │   │   │   ├── [panels.tsx](./lingo/src/games/humanities/economics/labor/panels.tsx)
│   │   │   │   │   │   ├── [reducer.ts](./lingo/src/games/humanities/economics/labor/reducer.ts)
│   │   │   │   │   │   └── [types.ts](./lingo/src/games/humanities/economics/labor/types.ts)
│   │   │   │   │   ├── lemons/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [game.test.ts](./lingo/src/games/humanities/economics/lemons/__tests__/game.test.ts)
│   │   │   │   │   │   │   ├── [index.test.tsx](./lingo/src/games/humanities/economics/lemons/__tests__/index.test.tsx)
│   │   │   │   │   │   │   └── [reducer.test.ts](./lingo/src/games/humanities/economics/lemons/__tests__/reducer.test.ts)
│   │   │   │   │   │   ├── [components.tsx](./lingo/src/games/humanities/economics/lemons/components.tsx)
│   │   │   │   │   │   ├── [constants.ts](./lingo/src/games/humanities/economics/lemons/constants.ts)
│   │   │   │   │   │   ├── [game.ts](./lingo/src/games/humanities/economics/lemons/game.ts)
│   │   │   │   │   │   ├── [index.tsx](./lingo/src/games/humanities/economics/lemons/index.tsx)
│   │   │   │   │   │   ├── [reducer.ts](./lingo/src/games/humanities/economics/lemons/reducer.ts)
│   │   │   │   │   │   └── [types.ts](./lingo/src/games/humanities/economics/lemons/types.ts)
│   │   │   │   │   ├── marginal-utility/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [game.test.ts](./lingo/src/games/humanities/economics/marginal-utility/__tests__/game.test.ts)
│   │   │   │   │   │   │   ├── [index.test.tsx](./lingo/src/games/humanities/economics/marginal-utility/__tests__/index.test.tsx)
│   │   │   │   │   │   │   └── [reducer.test.ts](./lingo/src/games/humanities/economics/marginal-utility/__tests__/reducer.test.ts)
│   │   │   │   │   │   ├── [challenge.tsx](./lingo/src/games/humanities/economics/marginal-utility/challenge.tsx)
│   │   │   │   │   │   ├── [components.tsx](./lingo/src/games/humanities/economics/marginal-utility/components.tsx)
│   │   │   │   │   │   ├── [constants.ts](./lingo/src/games/humanities/economics/marginal-utility/constants.ts)
│   │   │   │   │   │   ├── [game.ts](./lingo/src/games/humanities/economics/marginal-utility/game.ts)
│   │   │   │   │   │   ├── [index.tsx](./lingo/src/games/humanities/economics/marginal-utility/index.tsx)
│   │   │   │   │   │   ├── [lab.tsx](./lingo/src/games/humanities/economics/marginal-utility/lab.tsx)
│   │   │   │   │   │   ├── [reducer.ts](./lingo/src/games/humanities/economics/marginal-utility/reducer.ts)
│   │   │   │   │   │   └── [types.ts](./lingo/src/games/humanities/economics/marginal-utility/types.ts)
│   │   │   │   │   ├── market-failures/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [game.test.ts](./lingo/src/games/humanities/economics/market-failures/__tests__/game.test.ts)
│   │   │   │   │   │   │   ├── [index.test.tsx](./lingo/src/games/humanities/economics/market-failures/__tests__/index.test.tsx)
│   │   │   │   │   │   │   └── [reducer.test.ts](./lingo/src/games/humanities/economics/market-failures/__tests__/reducer.test.ts)
│   │   │   │   │   │   ├── [components.tsx](./lingo/src/games/humanities/economics/market-failures/components.tsx)
│   │   │   │   │   │   ├── [constants.ts](./lingo/src/games/humanities/economics/market-failures/constants.ts)
│   │   │   │   │   │   ├── [game.ts](./lingo/src/games/humanities/economics/market-failures/game.ts)
│   │   │   │   │   │   ├── [index.tsx](./lingo/src/games/humanities/economics/market-failures/index.tsx)
│   │   │   │   │   │   ├── [reducer.ts](./lingo/src/games/humanities/economics/market-failures/reducer.ts)
│   │   │   │   │   │   └── [types.ts](./lingo/src/games/humanities/economics/market-failures/types.ts)
│   │   │   │   │   ├── mechanism/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [game.test.ts](./lingo/src/games/humanities/economics/mechanism/__tests__/game.test.ts)
│   │   │   │   │   │   │   ├── [index.test.tsx](./lingo/src/games/humanities/economics/mechanism/__tests__/index.test.tsx)
│   │   │   │   │   │   │   └── [reducer.test.ts](./lingo/src/games/humanities/economics/mechanism/__tests__/reducer.test.ts)
│   │   │   │   │   │   ├── [components.tsx](./lingo/src/games/humanities/economics/mechanism/components.tsx)
│   │   │   │   │   │   ├── [constants.ts](./lingo/src/games/humanities/economics/mechanism/constants.ts)
│   │   │   │   │   │   ├── [game.ts](./lingo/src/games/humanities/economics/mechanism/game.ts)
│   │   │   │   │   │   ├── [index.tsx](./lingo/src/games/humanities/economics/mechanism/index.tsx)
│   │   │   │   │   │   ├── [reducer.ts](./lingo/src/games/humanities/economics/mechanism/reducer.ts)
│   │   │   │   │   │   └── [types.ts](./lingo/src/games/humanities/economics/mechanism/types.ts)
│   │   │   │   │   ├── mental-accounting/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [game.test.ts](./lingo/src/games/humanities/economics/mental-accounting/__tests__/game.test.ts)
│   │   │   │   │   │   │   ├── [index.test.tsx](./lingo/src/games/humanities/economics/mental-accounting/__tests__/index.test.tsx)
│   │   │   │   │   │   │   └── [reducer.test.ts](./lingo/src/games/humanities/economics/mental-accounting/__tests__/reducer.test.ts)
│   │   │   │   │   │   ├── [components.tsx](./lingo/src/games/humanities/economics/mental-accounting/components.tsx)
│   │   │   │   │   │   ├── [constants.ts](./lingo/src/games/humanities/economics/mental-accounting/constants.ts)
│   │   │   │   │   │   ├── [framer.tsx](./lingo/src/games/humanities/economics/mental-accounting/framer.tsx)
│   │   │   │   │   │   ├── [game.ts](./lingo/src/games/humanities/economics/mental-accounting/game.ts)
│   │   │   │   │   │   ├── [index.tsx](./lingo/src/games/humanities/economics/mental-accounting/index.tsx)
│   │   │   │   │   │   ├── [reducer.ts](./lingo/src/games/humanities/economics/mental-accounting/reducer.ts)
│   │   │   │   │   │   └── [types.ts](./lingo/src/games/humanities/economics/mental-accounting/types.ts)
│   │   │   │   │   ├── migration/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [game.test.ts](./lingo/src/games/humanities/economics/migration/__tests__/game.test.ts)
│   │   │   │   │   │   │   ├── [index.test.tsx](./lingo/src/games/humanities/economics/migration/__tests__/index.test.tsx)
│   │   │   │   │   │   │   └── [reducer.test.ts](./lingo/src/games/humanities/economics/migration/__tests__/reducer.test.ts)
│   │   │   │   │   │   ├── [components.tsx](./lingo/src/games/humanities/economics/migration/components.tsx)
│   │   │   │   │   │   ├── [constants.ts](./lingo/src/games/humanities/economics/migration/constants.ts)
│   │   │   │   │   │   ├── [game.ts](./lingo/src/games/humanities/economics/migration/game.ts)
│   │   │   │   │   │   ├── [index.tsx](./lingo/src/games/humanities/economics/migration/index.tsx)
│   │   │   │   │   │   ├── [panels.tsx](./lingo/src/games/humanities/economics/migration/panels.tsx)
│   │   │   │   │   │   ├── [reducer.ts](./lingo/src/games/humanities/economics/migration/reducer.ts)
│   │   │   │   │   │   └── [types.ts](./lingo/src/games/humanities/economics/migration/types.ts)
│   │   │   │   │   ├── monetary-policy/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [game.test.ts](./lingo/src/games/humanities/economics/monetary-policy/__tests__/game.test.ts)
│   │   │   │   │   │   │   ├── [index.test.tsx](./lingo/src/games/humanities/economics/monetary-policy/__tests__/index.test.tsx)
│   │   │   │   │   │   │   └── [reducer.test.ts](./lingo/src/games/humanities/economics/monetary-policy/__tests__/reducer.test.ts)
│   │   │   │   │   │   ├── [components.tsx](./lingo/src/games/humanities/economics/monetary-policy/components.tsx)
│   │   │   │   │   │   ├── [constants.ts](./lingo/src/games/humanities/economics/monetary-policy/constants.ts)
│   │   │   │   │   │   ├── [game.ts](./lingo/src/games/humanities/economics/monetary-policy/game.ts)
│   │   │   │   │   │   ├── [index.tsx](./lingo/src/games/humanities/economics/monetary-policy/index.tsx)
│   │   │   │   │   │   ├── [reducer.ts](./lingo/src/games/humanities/economics/monetary-policy/reducer.ts)
│   │   │   │   │   │   └── [types.ts](./lingo/src/games/humanities/economics/monetary-policy/types.ts)
│   │   │   │   │   ├── monopolistic/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [game.test.ts](./lingo/src/games/humanities/economics/monopolistic/__tests__/game.test.ts)
│   │   │   │   │   │   │   ├── [index.test.tsx](./lingo/src/games/humanities/economics/monopolistic/__tests__/index.test.tsx)
│   │   │   │   │   │   │   └── [reducer.test.ts](./lingo/src/games/humanities/economics/monopolistic/__tests__/reducer.test.ts)
│   │   │   │   │   │   ├── [chart.tsx](./lingo/src/games/humanities/economics/monopolistic/chart.tsx)
│   │   │   │   │   │   ├── [components.tsx](./lingo/src/games/humanities/economics/monopolistic/components.tsx)
│   │   │   │   │   │   ├── [constants.ts](./lingo/src/games/humanities/economics/monopolistic/constants.ts)
│   │   │   │   │   │   ├── [game.ts](./lingo/src/games/humanities/economics/monopolistic/game.ts)
│   │   │   │   │   │   ├── [index.tsx](./lingo/src/games/humanities/economics/monopolistic/index.tsx)
│   │   │   │   │   │   ├── [lab.tsx](./lingo/src/games/humanities/economics/monopolistic/lab.tsx)
│   │   │   │   │   │   ├── [panels.tsx](./lingo/src/games/humanities/economics/monopolistic/panels.tsx)
│   │   │   │   │   │   ├── [reducer.ts](./lingo/src/games/humanities/economics/monopolistic/reducer.ts)
│   │   │   │   │   │   └── [types.ts](./lingo/src/games/humanities/economics/monopolistic/types.ts)
│   │   │   │   │   ├── monopoly/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [game.test.ts](./lingo/src/games/humanities/economics/monopoly/__tests__/game.test.ts)
│   │   │   │   │   │   │   ├── [index.test.tsx](./lingo/src/games/humanities/economics/monopoly/__tests__/index.test.tsx)
│   │   │   │   │   │   │   └── [reducer.test.ts](./lingo/src/games/humanities/economics/monopoly/__tests__/reducer.test.ts)
│   │   │   │   │   │   ├── [components.tsx](./lingo/src/games/humanities/economics/monopoly/components.tsx)
│   │   │   │   │   │   ├── [constants.ts](./lingo/src/games/humanities/economics/monopoly/constants.ts)
│   │   │   │   │   │   ├── [game.ts](./lingo/src/games/humanities/economics/monopoly/game.ts)
│   │   │   │   │   │   ├── [index.tsx](./lingo/src/games/humanities/economics/monopoly/index.tsx)
│   │   │   │   │   │   ├── [reducer.ts](./lingo/src/games/humanities/economics/monopoly/reducer.ts)
│   │   │   │   │   │   └── [types.ts](./lingo/src/games/humanities/economics/monopoly/types.ts)
│   │   │   │   │   ├── moral-hazard/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [game.test.ts](./lingo/src/games/humanities/economics/moral-hazard/__tests__/game.test.ts)
│   │   │   │   │   │   │   ├── [index.test.tsx](./lingo/src/games/humanities/economics/moral-hazard/__tests__/index.test.tsx)
│   │   │   │   │   │   │   └── [reducer.test.ts](./lingo/src/games/humanities/economics/moral-hazard/__tests__/reducer.test.ts)
│   │   │   │   │   │   ├── [components.tsx](./lingo/src/games/humanities/economics/moral-hazard/components.tsx)
│   │   │   │   │   │   ├── [constants.ts](./lingo/src/games/humanities/economics/moral-hazard/constants.ts)
│   │   │   │   │   │   ├── [game.ts](./lingo/src/games/humanities/economics/moral-hazard/game.ts)
│   │   │   │   │   │   ├── [index.tsx](./lingo/src/games/humanities/economics/moral-hazard/index.tsx)
│   │   │   │   │   │   ├── [reducer.ts](./lingo/src/games/humanities/economics/moral-hazard/reducer.ts)
│   │   │   │   │   │   └── [types.ts](./lingo/src/games/humanities/economics/moral-hazard/types.ts)
│   │   │   │   │   ├── nash/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [game.test.ts](./lingo/src/games/humanities/economics/nash/__tests__/game.test.ts)
│   │   │   │   │   │   │   ├── [index.test.tsx](./lingo/src/games/humanities/economics/nash/__tests__/index.test.tsx)
│   │   │   │   │   │   │   └── [reducer.test.ts](./lingo/src/games/humanities/economics/nash/__tests__/reducer.test.ts)
│   │   │   │   │   │   ├── [components.tsx](./lingo/src/games/humanities/economics/nash/components.tsx)
│   │   │   │   │   │   ├── [constants.ts](./lingo/src/games/humanities/economics/nash/constants.ts)
│   │   │   │   │   │   ├── [game.ts](./lingo/src/games/humanities/economics/nash/game.ts)
│   │   │   │   │   │   ├── [index.tsx](./lingo/src/games/humanities/economics/nash/index.tsx)
│   │   │   │   │   │   ├── [reducer.ts](./lingo/src/games/humanities/economics/nash/reducer.ts)
│   │   │   │   │   │   └── [types.ts](./lingo/src/games/humanities/economics/nash/types.ts)
│   │   │   │   │   ├── nudge/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [game.test.ts](./lingo/src/games/humanities/economics/nudge/__tests__/game.test.ts)
│   │   │   │   │   │   │   ├── [index.test.tsx](./lingo/src/games/humanities/economics/nudge/__tests__/index.test.tsx)
│   │   │   │   │   │   │   └── [reducer.test.ts](./lingo/src/games/humanities/economics/nudge/__tests__/reducer.test.ts)
│   │   │   │   │   │   ├── [components-report.tsx](./lingo/src/games/humanities/economics/nudge/components-report.tsx)
│   │   │   │   │   │   ├── [components-simulator.tsx](./lingo/src/games/humanities/economics/nudge/components-simulator.tsx)
│   │   │   │   │   │   ├── [components.tsx](./lingo/src/games/humanities/economics/nudge/components.tsx)
│   │   │   │   │   │   ├── [constants.ts](./lingo/src/games/humanities/economics/nudge/constants.ts)
│   │   │   │   │   │   ├── [game.ts](./lingo/src/games/humanities/economics/nudge/game.ts)
│   │   │   │   │   │   ├── [index.tsx](./lingo/src/games/humanities/economics/nudge/index.tsx)
│   │   │   │   │   │   ├── [reducer.ts](./lingo/src/games/humanities/economics/nudge/reducer.ts)
│   │   │   │   │   │   └── [types.ts](./lingo/src/games/humanities/economics/nudge/types.ts)
│   │   │   │   │   ├── okuns/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [game.test.ts](./lingo/src/games/humanities/economics/okuns/__tests__/game.test.ts)
│   │   │   │   │   │   │   ├── [index.test.tsx](./lingo/src/games/humanities/economics/okuns/__tests__/index.test.tsx)
│   │   │   │   │   │   │   └── [reducer.test.ts](./lingo/src/games/humanities/economics/okuns/__tests__/reducer.test.ts)
│   │   │   │   │   │   ├── components/
│   │   │   │   │   │   │   ├── [estimate.tsx](./lingo/src/games/humanities/economics/okuns/components/estimate.tsx)
│   │   │   │   │   │   │   ├── [intro.tsx](./lingo/src/games/humanities/economics/okuns/components/intro.tsx)
│   │   │   │   │   │   │   ├── [result.tsx](./lingo/src/games/humanities/economics/okuns/components/result.tsx)
│   │   │   │   │   │   │   └── [steer.tsx](./lingo/src/games/humanities/economics/okuns/components/steer.tsx)
│   │   │   │   │   │   ├── [components.tsx](./lingo/src/games/humanities/economics/okuns/components.tsx)
│   │   │   │   │   │   ├── [constants.ts](./lingo/src/games/humanities/economics/okuns/constants.ts)
│   │   │   │   │   │   ├── [game.ts](./lingo/src/games/humanities/economics/okuns/game.ts)
│   │   │   │   │   │   ├── [index.tsx](./lingo/src/games/humanities/economics/okuns/index.tsx)
│   │   │   │   │   │   ├── [reducer.ts](./lingo/src/games/humanities/economics/okuns/reducer.ts)
│   │   │   │   │   │   └── [types.ts](./lingo/src/games/humanities/economics/okuns/types.ts)
│   │   │   │   │   ├── oligopoly/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [game.test.ts](./lingo/src/games/humanities/economics/oligopoly/__tests__/game.test.ts)
│   │   │   │   │   │   │   ├── [index.test.tsx](./lingo/src/games/humanities/economics/oligopoly/__tests__/index.test.tsx)
│   │   │   │   │   │   │   └── [reducer.test.ts](./lingo/src/games/humanities/economics/oligopoly/__tests__/reducer.test.ts)
│   │   │   │   │   │   ├── [constants.ts](./lingo/src/games/humanities/economics/oligopoly/constants.ts)
│   │   │   │   │   │   ├── [game.ts](./lingo/src/games/humanities/economics/oligopoly/game.ts)
│   │   │   │   │   │   ├── [index.tsx](./lingo/src/games/humanities/economics/oligopoly/index.tsx)
│   │   │   │   │   │   ├── [reducer.ts](./lingo/src/games/humanities/economics/oligopoly/reducer.ts)
│   │   │   │   │   │   └── [types.ts](./lingo/src/games/humanities/economics/oligopoly/types.ts)
│   │   │   │   │   ├── opportunity-cost/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [game.test.ts](./lingo/src/games/humanities/economics/opportunity-cost/__tests__/game.test.ts)
│   │   │   │   │   │   │   ├── [index.test.tsx](./lingo/src/games/humanities/economics/opportunity-cost/__tests__/index.test.tsx)
│   │   │   │   │   │   │   └── [reducer.test.ts](./lingo/src/games/humanities/economics/opportunity-cost/__tests__/reducer.test.ts)
│   │   │   │   │   │   ├── components/
│   │   │   │   │   │   │   ├── [challenge.tsx](./lingo/src/games/humanities/economics/opportunity-cost/components/challenge.tsx)
│   │   │   │   │   │   │   ├── [format.ts](./lingo/src/games/humanities/economics/opportunity-cost/components/format.ts)
│   │   │   │   │   │   │   ├── [results.tsx](./lingo/src/games/humanities/economics/opportunity-cost/components/results.tsx)
│   │   │   │   │   │   │   └── [sandbox.tsx](./lingo/src/games/humanities/economics/opportunity-cost/components/sandbox.tsx)
│   │   │   │   │   │   ├── [components.tsx](./lingo/src/games/humanities/economics/opportunity-cost/components.tsx)
│   │   │   │   │   │   ├── [constants.ts](./lingo/src/games/humanities/economics/opportunity-cost/constants.ts)
│   │   │   │   │   │   ├── [game.ts](./lingo/src/games/humanities/economics/opportunity-cost/game.ts)
│   │   │   │   │   │   ├── [index.tsx](./lingo/src/games/humanities/economics/opportunity-cost/index.tsx)
│   │   │   │   │   │   ├── [reducer.ts](./lingo/src/games/humanities/economics/opportunity-cost/reducer.ts)
│   │   │   │   │   │   └── [types.ts](./lingo/src/games/humanities/economics/opportunity-cost/types.ts)
│   │   │   │   │   ├── order-book/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [game.test.ts](./lingo/src/games/humanities/economics/order-book/__tests__/game.test.ts)
│   │   │   │   │   │   │   ├── [index.test.tsx](./lingo/src/games/humanities/economics/order-book/__tests__/index.test.tsx)
│   │   │   │   │   │   │   └── [reducer.test.ts](./lingo/src/games/humanities/economics/order-book/__tests__/reducer.test.ts)
│   │   │   │   │   │   ├── [constants.ts](./lingo/src/games/humanities/economics/order-book/constants.ts)
│   │   │   │   │   │   ├── [game.ts](./lingo/src/games/humanities/economics/order-book/game.ts)
│   │   │   │   │   │   ├── [index.tsx](./lingo/src/games/humanities/economics/order-book/index.tsx)
│   │   │   │   │   │   ├── [reducer.ts](./lingo/src/games/humanities/economics/order-book/reducer.ts)
│   │   │   │   │   │   └── [types.ts](./lingo/src/games/humanities/economics/order-book/types.ts)
│   │   │   │   │   ├── overconfidence/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [game.test.ts](./lingo/src/games/humanities/economics/overconfidence/__tests__/game.test.ts)
│   │   │   │   │   │   │   ├── [index.test.tsx](./lingo/src/games/humanities/economics/overconfidence/__tests__/index.test.tsx)
│   │   │   │   │   │   │   └── [reducer.test.ts](./lingo/src/games/humanities/economics/overconfidence/__tests__/reducer.test.ts)
│   │   │   │   │   │   ├── [brackets.tsx](./lingo/src/games/humanities/economics/overconfidence/brackets.tsx)
│   │   │   │   │   │   ├── [calibration.tsx](./lingo/src/games/humanities/economics/overconfidence/calibration.tsx)
│   │   │   │   │   │   ├── [components.tsx](./lingo/src/games/humanities/economics/overconfidence/components.tsx)
│   │   │   │   │   │   ├── [constants.ts](./lingo/src/games/humanities/economics/overconfidence/constants.ts)
│   │   │   │   │   │   ├── [game.ts](./lingo/src/games/humanities/economics/overconfidence/game.ts)
│   │   │   │   │   │   ├── [index.tsx](./lingo/src/games/humanities/economics/overconfidence/index.tsx)
│   │   │   │   │   │   ├── [market.tsx](./lingo/src/games/humanities/economics/overconfidence/market.tsx)
│   │   │   │   │   │   ├── [question.tsx](./lingo/src/games/humanities/economics/overconfidence/question.tsx)
│   │   │   │   │   │   ├── [reducer.ts](./lingo/src/games/humanities/economics/overconfidence/reducer.ts)
│   │   │   │   │   │   └── [types.ts](./lingo/src/games/humanities/economics/overconfidence/types.ts)
│   │   │   │   │   ├── perfect-competition/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [game.test.ts](./lingo/src/games/humanities/economics/perfect-competition/__tests__/game.test.ts)
│   │   │   │   │   │   │   ├── [index.test.tsx](./lingo/src/games/humanities/economics/perfect-competition/__tests__/index.test.tsx)
│   │   │   │   │   │   │   └── [reducer.test.ts](./lingo/src/games/humanities/economics/perfect-competition/__tests__/reducer.test.ts)
│   │   │   │   │   │   ├── [components.tsx](./lingo/src/games/humanities/economics/perfect-competition/components.tsx)
│   │   │   │   │   │   ├── [constants.ts](./lingo/src/games/humanities/economics/perfect-competition/constants.ts)
│   │   │   │   │   │   ├── [game.ts](./lingo/src/games/humanities/economics/perfect-competition/game.ts)
│   │   │   │   │   │   ├── [index.tsx](./lingo/src/games/humanities/economics/perfect-competition/index.tsx)
│   │   │   │   │   │   ├── [reducer.ts](./lingo/src/games/humanities/economics/perfect-competition/reducer.ts)
│   │   │   │   │   │   └── [types.ts](./lingo/src/games/humanities/economics/perfect-competition/types.ts)
│   │   │   │   │   ├── phillips/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [game.test.ts](./lingo/src/games/humanities/economics/phillips/__tests__/game.test.ts)
│   │   │   │   │   │   │   ├── [index.test.tsx](./lingo/src/games/humanities/economics/phillips/__tests__/index.test.tsx)
│   │   │   │   │   │   │   └── [reducer.test.ts](./lingo/src/games/humanities/economics/phillips/__tests__/reducer.test.ts)
│   │   │   │   │   │   ├── [components.tsx](./lingo/src/games/humanities/economics/phillips/components.tsx)
│   │   │   │   │   │   ├── [constants.ts](./lingo/src/games/humanities/economics/phillips/constants.ts)
│   │   │   │   │   │   ├── [game.ts](./lingo/src/games/humanities/economics/phillips/game.ts)
│   │   │   │   │   │   ├── [index.tsx](./lingo/src/games/humanities/economics/phillips/index.tsx)
│   │   │   │   │   │   ├── [reducer.ts](./lingo/src/games/humanities/economics/phillips/reducer.ts)
│   │   │   │   │   │   └── [types.ts](./lingo/src/games/humanities/economics/phillips/types.ts)
│   │   │   │   │   ├── portfolio/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [game.test.ts](./lingo/src/games/humanities/economics/portfolio/__tests__/game.test.ts)
│   │   │   │   │   │   │   ├── [index.test.tsx](./lingo/src/games/humanities/economics/portfolio/__tests__/index.test.tsx)
│   │   │   │   │   │   │   └── [reducer.test.ts](./lingo/src/games/humanities/economics/portfolio/__tests__/reducer.test.ts)
│   │   │   │   │   │   ├── [challenge.tsx](./lingo/src/games/humanities/economics/portfolio/challenge.tsx)
│   │   │   │   │   │   ├── [components.tsx](./lingo/src/games/humanities/economics/portfolio/components.tsx)
│   │   │   │   │   │   ├── [constants.ts](./lingo/src/games/humanities/economics/portfolio/constants.ts)
│   │   │   │   │   │   ├── [frontier.tsx](./lingo/src/games/humanities/economics/portfolio/frontier.tsx)
│   │   │   │   │   │   ├── [game.ts](./lingo/src/games/humanities/economics/portfolio/game.ts)
│   │   │   │   │   │   ├── [index.tsx](./lingo/src/games/humanities/economics/portfolio/index.tsx)
│   │   │   │   │   │   ├── [reducer.ts](./lingo/src/games/humanities/economics/portfolio/reducer.ts)
│   │   │   │   │   │   └── [types.ts](./lingo/src/games/humanities/economics/portfolio/types.ts)
│   │   │   │   │   ├── poverty-trap/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [game.test.ts](./lingo/src/games/humanities/economics/poverty-trap/__tests__/game.test.ts)
│   │   │   │   │   │   │   ├── [index.test.tsx](./lingo/src/games/humanities/economics/poverty-trap/__tests__/index.test.tsx)
│   │   │   │   │   │   │   └── [reducer.test.ts](./lingo/src/games/humanities/economics/poverty-trap/__tests__/reducer.test.ts)
│   │   │   │   │   │   ├── [components.tsx](./lingo/src/games/humanities/economics/poverty-trap/components.tsx)
│   │   │   │   │   │   ├── [constants.ts](./lingo/src/games/humanities/economics/poverty-trap/constants.ts)
│   │   │   │   │   │   ├── [game.ts](./lingo/src/games/humanities/economics/poverty-trap/game.ts)
│   │   │   │   │   │   ├── [index.tsx](./lingo/src/games/humanities/economics/poverty-trap/index.tsx)
│   │   │   │   │   │   ├── [panel.tsx](./lingo/src/games/humanities/economics/poverty-trap/panel.tsx)
│   │   │   │   │   │   ├── [reducer.ts](./lingo/src/games/humanities/economics/poverty-trap/reducer.ts)
│   │   │   │   │   │   └── [types.ts](./lingo/src/games/humanities/economics/poverty-trap/types.ts)
│   │   │   │   │   ├── price-discrimination/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [game.test.ts](./lingo/src/games/humanities/economics/price-discrimination/__tests__/game.test.ts)
│   │   │   │   │   │   │   ├── [index.test.tsx](./lingo/src/games/humanities/economics/price-discrimination/__tests__/index.test.tsx)
│   │   │   │   │   │   │   └── [reducer.test.ts](./lingo/src/games/humanities/economics/price-discrimination/__tests__/reducer.test.ts)
│   │   │   │   │   │   ├── [components.tsx](./lingo/src/games/humanities/economics/price-discrimination/components.tsx)
│   │   │   │   │   │   ├── [constants.ts](./lingo/src/games/humanities/economics/price-discrimination/constants.ts)
│   │   │   │   │   │   ├── [game.ts](./lingo/src/games/humanities/economics/price-discrimination/game.ts)
│   │   │   │   │   │   ├── [index.tsx](./lingo/src/games/humanities/economics/price-discrimination/index.tsx)
│   │   │   │   │   │   ├── [panels.tsx](./lingo/src/games/humanities/economics/price-discrimination/panels.tsx)
│   │   │   │   │   │   ├── [reducer.ts](./lingo/src/games/humanities/economics/price-discrimination/reducer.ts)
│   │   │   │   │   │   └── [types.ts](./lingo/src/games/humanities/economics/price-discrimination/types.ts)
│   │   │   │   │   ├── price-lab/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [game.test.ts](./lingo/src/games/humanities/economics/price-lab/__tests__/game.test.ts)
│   │   │   │   │   │   │   └── [index.test.tsx](./lingo/src/games/humanities/economics/price-lab/__tests__/index.test.tsx)
│   │   │   │   │   │   ├── [components.tsx](./lingo/src/games/humanities/economics/price-lab/components.tsx)
│   │   │   │   │   │   ├── [constants.ts](./lingo/src/games/humanities/economics/price-lab/constants.ts)
│   │   │   │   │   │   ├── [game.ts](./lingo/src/games/humanities/economics/price-lab/game.ts)
│   │   │   │   │   │   ├── [index.tsx](./lingo/src/games/humanities/economics/price-lab/index.tsx)
│   │   │   │   │   │   └── [types.ts](./lingo/src/games/humanities/economics/price-lab/types.ts)
│   │   │   │   │   ├── prisoners-dilemma/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [game.test.ts](./lingo/src/games/humanities/economics/prisoners-dilemma/__tests__/game.test.ts)
│   │   │   │   │   │   │   ├── [index.test.tsx](./lingo/src/games/humanities/economics/prisoners-dilemma/__tests__/index.test.tsx)
│   │   │   │   │   │   │   └── [tournament.test.ts](./lingo/src/games/humanities/economics/prisoners-dilemma/__tests__/tournament.test.ts)
│   │   │   │   │   │   ├── [behaviours.ts](./lingo/src/games/humanities/economics/prisoners-dilemma/behaviours.ts)
│   │   │   │   │   │   ├── [constants.ts](./lingo/src/games/humanities/economics/prisoners-dilemma/constants.ts)
│   │   │   │   │   │   ├── [game.ts](./lingo/src/games/humanities/economics/prisoners-dilemma/game.ts)
│   │   │   │   │   │   ├── [index.tsx](./lingo/src/games/humanities/economics/prisoners-dilemma/index.tsx)
│   │   │   │   │   │   ├── [reducer.ts](./lingo/src/games/humanities/economics/prisoners-dilemma/reducer.ts)
│   │   │   │   │   │   ├── [tournament.ts](./lingo/src/games/humanities/economics/prisoners-dilemma/tournament.ts)
│   │   │   │   │   │   └── [types.ts](./lingo/src/games/humanities/economics/prisoners-dilemma/types.ts)
│   │   │   │   │   ├── production/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [game.test.ts](./lingo/src/games/humanities/economics/production/__tests__/game.test.ts)
│   │   │   │   │   │   │   ├── [index.test.tsx](./lingo/src/games/humanities/economics/production/__tests__/index.test.tsx)
│   │   │   │   │   │   │   └── [reducer.test.ts](./lingo/src/games/humanities/economics/production/__tests__/reducer.test.ts)
│   │   │   │   │   │   ├── [components.tsx](./lingo/src/games/humanities/economics/production/components.tsx)
│   │   │   │   │   │   ├── [constants.ts](./lingo/src/games/humanities/economics/production/constants.ts)
│   │   │   │   │   │   ├── [curves.tsx](./lingo/src/games/humanities/economics/production/curves.tsx)
│   │   │   │   │   │   ├── [game.ts](./lingo/src/games/humanities/economics/production/game.ts)
│   │   │   │   │   │   ├── [index.tsx](./lingo/src/games/humanities/economics/production/index.tsx)
│   │   │   │   │   │   ├── [metrics.tsx](./lingo/src/games/humanities/economics/production/metrics.tsx)
│   │   │   │   │   │   ├── [quiz.tsx](./lingo/src/games/humanities/economics/production/quiz.tsx)
│   │   │   │   │   │   ├── [reducer.ts](./lingo/src/games/humanities/economics/production/reducer.ts)
│   │   │   │   │   │   └── [types.ts](./lingo/src/games/humanities/economics/production/types.ts)
│   │   │   │   │   ├── public-choice/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [game.test.ts](./lingo/src/games/humanities/economics/public-choice/__tests__/game.test.ts)
│   │   │   │   │   │   │   ├── [index.test.tsx](./lingo/src/games/humanities/economics/public-choice/__tests__/index.test.tsx)
│   │   │   │   │   │   │   └── [reducer.test.ts](./lingo/src/games/humanities/economics/public-choice/__tests__/reducer.test.ts)
│   │   │   │   │   │   ├── [components.tsx](./lingo/src/games/humanities/economics/public-choice/components.tsx)
│   │   │   │   │   │   ├── [constants.ts](./lingo/src/games/humanities/economics/public-choice/constants.ts)
│   │   │   │   │   │   ├── [game.ts](./lingo/src/games/humanities/economics/public-choice/game.ts)
│   │   │   │   │   │   ├── [index.tsx](./lingo/src/games/humanities/economics/public-choice/index.tsx)
│   │   │   │   │   │   ├── [median.tsx](./lingo/src/games/humanities/economics/public-choice/median.tsx)
│   │   │   │   │   │   ├── [paradox.tsx](./lingo/src/games/humanities/economics/public-choice/paradox.tsx)
│   │   │   │   │   │   ├── [reducer.ts](./lingo/src/games/humanities/economics/public-choice/reducer.ts)
│   │   │   │   │   │   ├── [rent.tsx](./lingo/src/games/humanities/economics/public-choice/rent.tsx)
│   │   │   │   │   │   └── [types.ts](./lingo/src/games/humanities/economics/public-choice/types.ts)
│   │   │   │   │   ├── public-goods/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [game.test.ts](./lingo/src/games/humanities/economics/public-goods/__tests__/game.test.ts)
│   │   │   │   │   │   │   ├── [index.test.tsx](./lingo/src/games/humanities/economics/public-goods/__tests__/index.test.tsx)
│   │   │   │   │   │   │   └── [reducer.test.ts](./lingo/src/games/humanities/economics/public-goods/__tests__/reducer.test.ts)
│   │   │   │   │   │   ├── [constants.ts](./lingo/src/games/humanities/economics/public-goods/constants.ts)
│   │   │   │   │   │   ├── [game.ts](./lingo/src/games/humanities/economics/public-goods/game.ts)
│   │   │   │   │   │   ├── [index.tsx](./lingo/src/games/humanities/economics/public-goods/index.tsx)
│   │   │   │   │   │   ├── [reducer.ts](./lingo/src/games/humanities/economics/public-goods/reducer.ts)
│   │   │   │   │   │   └── [types.ts](./lingo/src/games/humanities/economics/public-goods/types.ts)
│   │   │   │   │   ├── rcts/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [game.test.ts](./lingo/src/games/humanities/economics/rcts/__tests__/game.test.ts)
│   │   │   │   │   │   │   ├── [index.test.tsx](./lingo/src/games/humanities/economics/rcts/__tests__/index.test.tsx)
│   │   │   │   │   │   │   └── [reducer.test.ts](./lingo/src/games/humanities/economics/rcts/__tests__/reducer.test.ts)
│   │   │   │   │   │   ├── [components.tsx](./lingo/src/games/humanities/economics/rcts/components.tsx)
│   │   │   │   │   │   ├── [constants.ts](./lingo/src/games/humanities/economics/rcts/constants.ts)
│   │   │   │   │   │   ├── [game.ts](./lingo/src/games/humanities/economics/rcts/game.ts)
│   │   │   │   │   │   ├── [index.tsx](./lingo/src/games/humanities/economics/rcts/index.tsx)
│   │   │   │   │   │   ├── [reducer.ts](./lingo/src/games/humanities/economics/rcts/reducer.ts)
│   │   │   │   │   │   └── [types.ts](./lingo/src/games/humanities/economics/rcts/types.ts)
│   │   │   │   │   ├── repeated/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [game.test.ts](./lingo/src/games/humanities/economics/repeated/__tests__/game.test.ts)
│   │   │   │   │   │   │   ├── [index.test.tsx](./lingo/src/games/humanities/economics/repeated/__tests__/index.test.tsx)
│   │   │   │   │   │   │   └── [reducer.test.ts](./lingo/src/games/humanities/economics/repeated/__tests__/reducer.test.ts)
│   │   │   │   │   │   ├── [constants.ts](./lingo/src/games/humanities/economics/repeated/constants.ts)
│   │   │   │   │   │   ├── [game.ts](./lingo/src/games/humanities/economics/repeated/game.ts)
│   │   │   │   │   │   ├── [index.tsx](./lingo/src/games/humanities/economics/repeated/index.tsx)
│   │   │   │   │   │   ├── [reducer.ts](./lingo/src/games/humanities/economics/repeated/reducer.ts)
│   │   │   │   │   │   └── [types.ts](./lingo/src/games/humanities/economics/repeated/types.ts)
│   │   │   │   │   ├── rps/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [game.test.ts](./lingo/src/games/humanities/economics/rps/__tests__/game.test.ts)
│   │   │   │   │   │   │   ├── [index.test.tsx](./lingo/src/games/humanities/economics/rps/__tests__/index.test.tsx)
│   │   │   │   │   │   │   └── [reducer.test.ts](./lingo/src/games/humanities/economics/rps/__tests__/reducer.test.ts)
│   │   │   │   │   │   ├── [constants.ts](./lingo/src/games/humanities/economics/rps/constants.ts)
│   │   │   │   │   │   ├── [game.ts](./lingo/src/games/humanities/economics/rps/game.ts)
│   │   │   │   │   │   ├── [index.tsx](./lingo/src/games/humanities/economics/rps/index.tsx)
│   │   │   │   │   │   ├── [reducer.ts](./lingo/src/games/humanities/economics/rps/reducer.ts)
│   │   │   │   │   │   └── [types.ts](./lingo/src/games/humanities/economics/rps/types.ts)
│   │   │   │   │   ├── sequential/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [game.test.ts](./lingo/src/games/humanities/economics/sequential/__tests__/game.test.ts)
│   │   │   │   │   │   │   ├── [index.test.tsx](./lingo/src/games/humanities/economics/sequential/__tests__/index.test.tsx)
│   │   │   │   │   │   │   └── [reducer.test.ts](./lingo/src/games/humanities/economics/sequential/__tests__/reducer.test.ts)
│   │   │   │   │   │   ├── [components.tsx](./lingo/src/games/humanities/economics/sequential/components.tsx)
│   │   │   │   │   │   ├── [constants.ts](./lingo/src/games/humanities/economics/sequential/constants.ts)
│   │   │   │   │   │   ├── [game.ts](./lingo/src/games/humanities/economics/sequential/game.ts)
│   │   │   │   │   │   ├── [index.tsx](./lingo/src/games/humanities/economics/sequential/index.tsx)
│   │   │   │   │   │   ├── [reducer.ts](./lingo/src/games/humanities/economics/sequential/reducer.ts)
│   │   │   │   │   │   └── [types.ts](./lingo/src/games/humanities/economics/sequential/types.ts)
│   │   │   │   │   ├── signaling/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [game.test.ts](./lingo/src/games/humanities/economics/signaling/__tests__/game.test.ts)
│   │   │   │   │   │   │   ├── [index.test.tsx](./lingo/src/games/humanities/economics/signaling/__tests__/index.test.tsx)
│   │   │   │   │   │   │   └── [reducer.test.ts](./lingo/src/games/humanities/economics/signaling/__tests__/reducer.test.ts)
│   │   │   │   │   │   ├── [constants.ts](./lingo/src/games/humanities/economics/signaling/constants.ts)
│   │   │   │   │   │   ├── [game.ts](./lingo/src/games/humanities/economics/signaling/game.ts)
│   │   │   │   │   │   ├── [index.tsx](./lingo/src/games/humanities/economics/signaling/index.tsx)
│   │   │   │   │   │   ├── [reducer.ts](./lingo/src/games/humanities/economics/signaling/reducer.ts)
│   │   │   │   │   │   └── [types.ts](./lingo/src/games/humanities/economics/signaling/types.ts)
│   │   │   │   │   ├── stag-hunt/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [game.test.ts](./lingo/src/games/humanities/economics/stag-hunt/__tests__/game.test.ts)
│   │   │   │   │   │   │   ├── [index.test.tsx](./lingo/src/games/humanities/economics/stag-hunt/__tests__/index.test.tsx)
│   │   │   │   │   │   │   └── [reducer.test.ts](./lingo/src/games/humanities/economics/stag-hunt/__tests__/reducer.test.ts)
│   │   │   │   │   │   ├── [constants.ts](./lingo/src/games/humanities/economics/stag-hunt/constants.ts)
│   │   │   │   │   │   ├── [game.ts](./lingo/src/games/humanities/economics/stag-hunt/game.ts)
│   │   │   │   │   │   ├── [index.tsx](./lingo/src/games/humanities/economics/stag-hunt/index.tsx)
│   │   │   │   │   │   ├── [reducer.ts](./lingo/src/games/humanities/economics/stag-hunt/reducer.ts)
│   │   │   │   │   │   └── [types.ts](./lingo/src/games/humanities/economics/stag-hunt/types.ts)
│   │   │   │   │   ├── time-value/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [game.test.ts](./lingo/src/games/humanities/economics/time-value/__tests__/game.test.ts)
│   │   │   │   │   │   │   ├── [index.test.tsx](./lingo/src/games/humanities/economics/time-value/__tests__/index.test.tsx)
│   │   │   │   │   │   │   └── [reducer.test.ts](./lingo/src/games/humanities/economics/time-value/__tests__/reducer.test.ts)
│   │   │   │   │   │   ├── [calculator.tsx](./lingo/src/games/humanities/economics/time-value/calculator.tsx)
│   │   │   │   │   │   ├── [components.tsx](./lingo/src/games/humanities/economics/time-value/components.tsx)
│   │   │   │   │   │   ├── [constants.ts](./lingo/src/games/humanities/economics/time-value/constants.ts)
│   │   │   │   │   │   ├── [game.ts](./lingo/src/games/humanities/economics/time-value/game.ts)
│   │   │   │   │   │   ├── [index.tsx](./lingo/src/games/humanities/economics/time-value/index.tsx)
│   │   │   │   │   │   ├── [phases.tsx](./lingo/src/games/humanities/economics/time-value/phases.tsx)
│   │   │   │   │   │   ├── [reducer.ts](./lingo/src/games/humanities/economics/time-value/reducer.ts)
│   │   │   │   │   │   └── [types.ts](./lingo/src/games/humanities/economics/time-value/types.ts)
│   │   │   │   │   ├── trade/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [game.test.ts](./lingo/src/games/humanities/economics/trade/__tests__/game.test.ts)
│   │   │   │   │   │   │   ├── [index.test.tsx](./lingo/src/games/humanities/economics/trade/__tests__/index.test.tsx)
│   │   │   │   │   │   │   └── [reducer.test.ts](./lingo/src/games/humanities/economics/trade/__tests__/reducer.test.ts)
│   │   │   │   │   │   ├── [chart-scaffold.tsx](./lingo/src/games/humanities/economics/trade/chart-scaffold.tsx)
│   │   │   │   │   │   ├── [chart.tsx](./lingo/src/games/humanities/economics/trade/chart.tsx)
│   │   │   │   │   │   ├── [components.tsx](./lingo/src/games/humanities/economics/trade/components.tsx)
│   │   │   │   │   │   ├── [constants.ts](./lingo/src/games/humanities/economics/trade/constants.ts)
│   │   │   │   │   │   ├── [game.ts](./lingo/src/games/humanities/economics/trade/game.ts)
│   │   │   │   │   │   ├── [index.tsx](./lingo/src/games/humanities/economics/trade/index.tsx)
│   │   │   │   │   │   ├── [panels.tsx](./lingo/src/games/humanities/economics/trade/panels.tsx)
│   │   │   │   │   │   ├── [reducer.ts](./lingo/src/games/humanities/economics/trade/reducer.ts)
│   │   │   │   │   │   ├── [retaliation.tsx](./lingo/src/games/humanities/economics/trade/retaliation.tsx)
│   │   │   │   │   │   └── [types.ts](./lingo/src/games/humanities/economics/trade/types.ts)
│   │   │   │   │   └── [data.ts](./lingo/src/games/humanities/economics/data.ts)
│   │   │   │   ├── geography/
│   │   │   │   │   ├── _shared/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [countries.test.ts](./lingo/src/games/humanities/geography/_shared/__tests__/countries.test.ts)
│   │   │   │   │   │   │   └── [quiz.test.ts](./lingo/src/games/humanities/geography/_shared/__tests__/quiz.test.ts)
│   │   │   │   │   │   ├── [borders.ts](./lingo/src/games/humanities/geography/_shared/borders.ts)
│   │   │   │   │   │   ├── [countries-data.ts](./lingo/src/games/humanities/geography/_shared/countries-data.ts)
│   │   │   │   │   │   ├── [countries.ts](./lingo/src/games/humanities/geography/_shared/countries.ts)
│   │   │   │   │   │   ├── [population.ts](./lingo/src/games/humanities/geography/_shared/population.ts)
│   │   │   │   │   │   └── [quiz.ts](./lingo/src/games/humanities/geography/_shared/quiz.ts)
│   │   │   │   │   ├── guess/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [index.test.tsx](./lingo/src/games/humanities/geography/guess/__tests__/index.test.tsx)
│   │   │   │   │   │   │   ├── [useGuess.test.ts](./lingo/src/games/humanities/geography/guess/__tests__/useGuess.test.ts)
│   │   │   │   │   │   │   └── [utils.test.ts](./lingo/src/games/humanities/geography/guess/__tests__/utils.test.ts)
│   │   │   │   │   │   ├── [index.tsx](./lingo/src/games/humanities/geography/guess/index.tsx)
│   │   │   │   │   │   ├── [types.ts](./lingo/src/games/humanities/geography/guess/types.ts)
│   │   │   │   │   │   ├── [useGuess.ts](./lingo/src/games/humanities/geography/guess/useGuess.ts)
│   │   │   │   │   │   └── [utils.ts](./lingo/src/games/humanities/geography/guess/utils.ts)
│   │   │   │   │   ├── higher-or-lower/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [index.test.tsx](./lingo/src/games/humanities/geography/higher-or-lower/__tests__/index.test.tsx)
│   │   │   │   │   │   │   ├── [useHigherOrLower.test.ts](./lingo/src/games/humanities/geography/higher-or-lower/__tests__/useHigherOrLower.test.ts)
│   │   │   │   │   │   │   └── [utils.test.ts](./lingo/src/games/humanities/geography/higher-or-lower/__tests__/utils.test.ts)
│   │   │   │   │   │   ├── [index.tsx](./lingo/src/games/humanities/geography/higher-or-lower/index.tsx)
│   │   │   │   │   │   ├── [types.ts](./lingo/src/games/humanities/geography/higher-or-lower/types.ts)
│   │   │   │   │   │   ├── [useHigherOrLower.ts](./lingo/src/games/humanities/geography/higher-or-lower/useHigherOrLower.ts)
│   │   │   │   │   │   └── [utils.ts](./lingo/src/games/humanities/geography/higher-or-lower/utils.ts)
│   │   │   │   │   ├── nyt-connections/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [index.test.tsx](./lingo/src/games/humanities/geography/nyt-connections/__tests__/index.test.tsx)
│   │   │   │   │   │   │   ├── [puzzles.test.ts](./lingo/src/games/humanities/geography/nyt-connections/__tests__/puzzles.test.ts)
│   │   │   │   │   │   │   ├── [useConnections.test.ts](./lingo/src/games/humanities/geography/nyt-connections/__tests__/useConnections.test.ts)
│   │   │   │   │   │   │   └── [utils.test.ts](./lingo/src/games/humanities/geography/nyt-connections/__tests__/utils.test.ts)
│   │   │   │   │   │   ├── [index.tsx](./lingo/src/games/humanities/geography/nyt-connections/index.tsx)
│   │   │   │   │   │   ├── [puzzles.ts](./lingo/src/games/humanities/geography/nyt-connections/puzzles.ts)
│   │   │   │   │   │   ├── [types.ts](./lingo/src/games/humanities/geography/nyt-connections/types.ts)
│   │   │   │   │   │   ├── [useConnections.ts](./lingo/src/games/humanities/geography/nyt-connections/useConnections.ts)
│   │   │   │   │   │   └── [utils.ts](./lingo/src/games/humanities/geography/nyt-connections/utils.ts)
│   │   │   │   │   ├── nyt-wordle/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [index.test.tsx](./lingo/src/games/humanities/geography/nyt-wordle/__tests__/index.test.tsx)
│   │   │   │   │   │   │   ├── [useWordle.test.ts](./lingo/src/games/humanities/geography/nyt-wordle/__tests__/useWordle.test.ts)
│   │   │   │   │   │   │   └── [utils.test.ts](./lingo/src/games/humanities/geography/nyt-wordle/__tests__/utils.test.ts)
│   │   │   │   │   │   ├── [index.tsx](./lingo/src/games/humanities/geography/nyt-wordle/index.tsx)
│   │   │   │   │   │   ├── [types.ts](./lingo/src/games/humanities/geography/nyt-wordle/types.ts)
│   │   │   │   │   │   ├── [useWordle.ts](./lingo/src/games/humanities/geography/nyt-wordle/useWordle.ts)
│   │   │   │   │   │   └── [utils.ts](./lingo/src/games/humanities/geography/nyt-wordle/utils.ts)
│   │   │   │   │   └── sort-continents/
│   │   │   │   │       ├── __tests__/
│   │   │   │   │       │   ├── [index.test.tsx](./lingo/src/games/humanities/geography/sort-continents/__tests__/index.test.tsx)
│   │   │   │   │       │   ├── [useContinentsSort.test.ts](./lingo/src/games/humanities/geography/sort-continents/__tests__/useContinentsSort.test.ts)
│   │   │   │   │       │   └── [utils.test.ts](./lingo/src/games/humanities/geography/sort-continents/__tests__/utils.test.ts)
│   │   │   │   │       ├── [index.tsx](./lingo/src/games/humanities/geography/sort-continents/index.tsx)
│   │   │   │   │       ├── [types.ts](./lingo/src/games/humanities/geography/sort-continents/types.ts)
│   │   │   │   │       ├── [useContinentsSort.ts](./lingo/src/games/humanities/geography/sort-continents/useContinentsSort.ts)
│   │   │   │   │       └── [utils.ts](./lingo/src/games/humanities/geography/sort-continents/utils.ts)
│   │   │   │   ├── history/
│   │   │   │   │   ├── myth-vs-fact/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   └── [index.test.tsx](./lingo/src/games/humanities/history/myth-vs-fact/__tests__/index.test.tsx)
│   │   │   │   │   │   ├── data/
│   │   │   │   │   │   │   ├── [items.csv](./lingo/src/games/humanities/history/myth-vs-fact/data/items.csv)
│   │   │   │   │   │   │   └── [items.json](./lingo/src/games/humanities/history/myth-vs-fact/data/items.json)
│   │   │   │   │   │   ├── utils/
│   │   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   │   └── [game.test.ts](./lingo/src/games/humanities/history/myth-vs-fact/utils/__tests__/game.test.ts)
│   │   │   │   │   │   │   └── [game.ts](./lingo/src/games/humanities/history/myth-vs-fact/utils/game.ts)
│   │   │   │   │   │   ├── [constants.ts](./lingo/src/games/humanities/history/myth-vs-fact/constants.ts)
│   │   │   │   │   │   ├── [index.tsx](./lingo/src/games/humanities/history/myth-vs-fact/index.tsx)
│   │   │   │   │   │   └── [types.ts](./lingo/src/games/humanities/history/myth-vs-fact/types.ts)
│   │   │   │   │   └── through-the-years/
│   │   │   │   │       ├── __tests__/
│   │   │   │   │       │   ├── components/
│   │   │   │   │       │   │   ├── [BrowseCompact.test.tsx](./lingo/src/games/humanities/history/through-the-years/__tests__/components/BrowseCompact.test.tsx)
│   │   │   │   │       │   │   ├── [BrowseSpread.test.tsx](./lingo/src/games/humanities/history/through-the-years/__tests__/components/BrowseSpread.test.tsx)
│   │   │   │   │       │   │   ├── [Card.test.tsx](./lingo/src/games/humanities/history/through-the-years/__tests__/components/Card.test.tsx)
│   │   │   │   │       │   │   └── [Timeline.test.tsx](./lingo/src/games/humanities/history/through-the-years/__tests__/components/Timeline.test.tsx)
│   │   │   │   │       │   ├── screens/
│   │   │   │   │       │   │   ├── [BrowseScreen.test.tsx](./lingo/src/games/humanities/history/through-the-years/__tests__/screens/BrowseScreen.test.tsx)
│   │   │   │   │       │   │   ├── [GameOverScreen.test.tsx](./lingo/src/games/humanities/history/through-the-years/__tests__/screens/GameOverScreen.test.tsx)
│   │   │   │   │       │   │   ├── [GameScreen.test.tsx](./lingo/src/games/humanities/history/through-the-years/__tests__/screens/GameScreen.test.tsx)
│   │   │   │   │       │   │   └── [SetupScreen.test.tsx](./lingo/src/games/humanities/history/through-the-years/__tests__/screens/SetupScreen.test.tsx)
│   │   │   │   │       │   ├── [engine.test.ts](./lingo/src/games/humanities/history/through-the-years/__tests__/engine.test.ts)
│   │   │   │   │       │   ├── [index.test.tsx](./lingo/src/games/humanities/history/through-the-years/__tests__/index.test.tsx)
│   │   │   │   │       │   └── [store.test.ts](./lingo/src/games/humanities/history/through-the-years/__tests__/store.test.ts)
│   │   │   │   │       ├── components/
│   │   │   │   │       │   ├── components/
│   │   │   │   │       │   │   ├── [BrowseCompact.tsx](./lingo/src/games/humanities/history/through-the-years/components/components/BrowseCompact.tsx)
│   │   │   │   │       │   │   ├── [BrowseSpread.tsx](./lingo/src/games/humanities/history/through-the-years/components/components/BrowseSpread.tsx)
│   │   │   │   │       │   │   ├── [Card.tsx](./lingo/src/games/humanities/history/through-the-years/components/components/Card.tsx)
│   │   │   │   │       │   │   └── [Timeline.tsx](./lingo/src/games/humanities/history/through-the-years/components/components/Timeline.tsx)
│   │   │   │   │       │   └── screens/
│   │   │   │   │       │       ├── [BrowseScreen.tsx](./lingo/src/games/humanities/history/through-the-years/components/screens/BrowseScreen.tsx)
│   │   │   │   │       │       ├── [GameOverScreen.tsx](./lingo/src/games/humanities/history/through-the-years/components/screens/GameOverScreen.tsx)
│   │   │   │   │       │       ├── [GameScreen.tsx](./lingo/src/games/humanities/history/through-the-years/components/screens/GameScreen.tsx)
│   │   │   │   │       │       └── [SetupScreen.tsx](./lingo/src/games/humanities/history/through-the-years/components/screens/SetupScreen.tsx)
│   │   │   │   │       ├── data/
│   │   │   │   │       │   ├── json/
│   │   │   │   │       │   │   ├── africa/
│   │   │   │   │       │   │   │   ├── [egypt-events.json](./lingo/src/games/humanities/history/through-the-years/data/json/africa/egypt-events.json)
│   │   │   │   │       │   │   │   └── [south-africa-events.json](./lingo/src/games/humanities/history/through-the-years/data/json/africa/south-africa-events.json)
│   │   │   │   │       │   │   ├── americas/
│   │   │   │   │       │   │   │   ├── [mexico-events.json](./lingo/src/games/humanities/history/through-the-years/data/json/americas/mexico-events.json)
│   │   │   │   │       │   │   │   └── [united-states-events.json](./lingo/src/games/humanities/history/through-the-years/data/json/americas/united-states-events.json)
│   │   │   │   │       │   │   ├── asia/
│   │   │   │   │       │   │   │   ├── [china-events.json](./lingo/src/games/humanities/history/through-the-years/data/json/asia/china-events.json)
│   │   │   │   │       │   │   │   ├── [india-events.json](./lingo/src/games/humanities/history/through-the-years/data/json/asia/india-events.json)
│   │   │   │   │       │   │   │   ├── [iraq-events.json](./lingo/src/games/humanities/history/through-the-years/data/json/asia/iraq-events.json)
│   │   │   │   │       │   │   │   ├── [japan-events.json](./lingo/src/games/humanities/history/through-the-years/data/json/asia/japan-events.json)
│   │   │   │   │       │   │   │   └── [vietnam-events.json](./lingo/src/games/humanities/history/through-the-years/data/json/asia/vietnam-events.json)
│   │   │   │   │       │   │   ├── europe/
│   │   │   │   │       │   │   │   ├── [france-events.json](./lingo/src/games/humanities/history/through-the-years/data/json/europe/france-events.json)
│   │   │   │   │       │   │   │   ├── [germany-events.json](./lingo/src/games/humanities/history/through-the-years/data/json/europe/germany-events.json)
│   │   │   │   │       │   │   │   ├── [greece-events.json](./lingo/src/games/humanities/history/through-the-years/data/json/europe/greece-events.json)
│   │   │   │   │       │   │   │   ├── [italy-events.json](./lingo/src/games/humanities/history/through-the-years/data/json/europe/italy-events.json)
│   │   │   │   │       │   │   │   └── [united-kingdom-events.json](./lingo/src/games/humanities/history/through-the-years/data/json/europe/united-kingdom-events.json)
│   │   │   │   │       │   │   └── world/
│   │   │   │   │       │   │       └── [world-events.json](./lingo/src/games/humanities/history/through-the-years/data/json/world/world-events.json)
│   │   │   │   │       │   ├── [categories.ts](./lingo/src/games/humanities/history/through-the-years/data/categories.ts)
│   │   │   │   │       │   ├── [constants.ts](./lingo/src/games/humanities/history/through-the-years/data/constants.ts)
│   │   │   │   │       │   ├── [continents.ts](./lingo/src/games/humanities/history/through-the-years/data/continents.ts)
│   │   │   │   │       │   ├── [decks.ts](./lingo/src/games/humanities/history/through-the-years/data/decks.ts)
│   │   │   │   │       │   └── [modes.ts](./lingo/src/games/humanities/history/through-the-years/data/modes.ts)
│   │   │   │   │       ├── testing/
│   │   │   │   │       │   └── [fixtures.ts](./lingo/src/games/humanities/history/through-the-years/testing/fixtures.ts)
│   │   │   │   │       ├── [engine.ts](./lingo/src/games/humanities/history/through-the-years/engine.ts)
│   │   │   │   │       ├── [index.tsx](./lingo/src/games/humanities/history/through-the-years/index.tsx)
│   │   │   │   │       ├── [store.ts](./lingo/src/games/humanities/history/through-the-years/store.ts)
│   │   │   │   │       └── [types.ts](./lingo/src/games/humanities/history/through-the-years/types.ts)
│   │   │   │   └── languages/
│   │   │   │       ├── __tests__/
│   │   │   │       │   ├── [index.test.tsx](./lingo/src/games/humanities/languages/__tests__/index.test.tsx)
│   │   │   │       │   └── [utils.test.ts](./lingo/src/games/humanities/languages/__tests__/utils.test.ts)
│   │   │   │       ├── english/
│   │   │   │       │   ├── __tests__/
│   │   │   │       │   │   ├── [index.test.tsx](./lingo/src/games/humanities/languages/english/__tests__/index.test.tsx)
│   │   │   │       │   │   └── [utils.test.ts](./lingo/src/games/humanities/languages/english/__tests__/utils.test.ts)
│   │   │   │       │   ├── [index.tsx](./lingo/src/games/humanities/languages/english/index.tsx)
│   │   │   │       │   └── [utils.ts](./lingo/src/games/humanities/languages/english/utils.ts)
│   │   │   │       ├── sign/
│   │   │   │       │   ├── __tests__/
│   │   │   │       │   │   ├── [index.test.tsx](./lingo/src/games/humanities/languages/sign/__tests__/index.test.tsx)
│   │   │   │       │   │   └── [utils.test.ts](./lingo/src/games/humanities/languages/sign/__tests__/utils.test.ts)
│   │   │   │       │   ├── [index.tsx](./lingo/src/games/humanities/languages/sign/index.tsx)
│   │   │   │       │   └── [utils.ts](./lingo/src/games/humanities/languages/sign/utils.ts)
│   │   │   │       ├── [LanguageList.tsx](./lingo/src/games/humanities/languages/LanguageList.tsx)
│   │   │   │       ├── [flags.ts](./lingo/src/games/humanities/languages/flags.ts)
│   │   │   │       ├── [index.tsx](./lingo/src/games/humanities/languages/index.tsx)
│   │   │   │       └── [utils.ts](./lingo/src/games/humanities/languages/utils.ts)
│   │   │   └── stem/
│   │   │       ├── chemistry/
│   │   │       │   └── periodic-table/
│   │   │       │       ├── __tests__/
│   │   │       │       │   ├── [index.test.tsx](./lingo/src/games/stem/chemistry/periodic-table/__tests__/index.test.tsx)
│   │   │       │       │   └── [utils.test.ts](./lingo/src/games/stem/chemistry/periodic-table/__tests__/utils.test.ts)
│   │   │       │       ├── [index.tsx](./lingo/src/games/stem/chemistry/periodic-table/index.tsx)
│   │   │       │       └── [utils.ts](./lingo/src/games/stem/chemistry/periodic-table/utils.ts)
│   │   │       ├── maths/
│   │   │       │   ├── attractors/
│   │   │       │   │   ├── __tests__/
│   │   │       │   │   │   ├── [index.test.tsx](./lingo/src/games/stem/maths/attractors/__tests__/index.test.tsx)
│   │   │       │   │   │   ├── [renderer.test.ts](./lingo/src/games/stem/maths/attractors/__tests__/renderer.test.ts)
│   │   │       │   │   │   └── [utils.test.ts](./lingo/src/games/stem/maths/attractors/__tests__/utils.test.ts)
│   │   │       │   │   ├── utils/
│   │   │       │   │   │   ├── [attractors.ts](./lingo/src/games/stem/maths/attractors/utils/attractors.ts)
│   │   │       │   │   │   └── [renderer.ts](./lingo/src/games/stem/maths/attractors/utils/renderer.ts)
│   │   │       │   │   ├── [constants.ts](./lingo/src/games/stem/maths/attractors/constants.ts)
│   │   │       │   │   ├── [index.tsx](./lingo/src/games/stem/maths/attractors/index.tsx)
│   │   │       │   │   ├── [three.mock.ts](./lingo/src/games/stem/maths/attractors/three.mock.ts)
│   │   │       │   │   ├── [types.ts](./lingo/src/games/stem/maths/attractors/types.ts)
│   │   │       │   │   └── [useAttractors.ts](./lingo/src/games/stem/maths/attractors/useAttractors.ts)
│   │   │       │   ├── cyclic/
│   │   │       │   │   ├── __tests__/
│   │   │       │   │   │   ├── [index.test.tsx](./lingo/src/games/stem/maths/cyclic/__tests__/index.test.tsx)
│   │   │       │   │   │   └── [utils.test.ts](./lingo/src/games/stem/maths/cyclic/__tests__/utils.test.ts)
│   │   │       │   │   ├── [index.tsx](./lingo/src/games/stem/maths/cyclic/index.tsx)
│   │   │       │   │   └── [utils.ts](./lingo/src/games/stem/maths/cyclic/utils.ts)
│   │   │       │   ├── fibonacci-sequence/
│   │   │       │   │   ├── __tests__/
│   │   │       │   │   │   ├── [index.test.tsx](./lingo/src/games/stem/maths/fibonacci-sequence/__tests__/index.test.tsx)
│   │   │       │   │   │   └── [utils.test.ts](./lingo/src/games/stem/maths/fibonacci-sequence/__tests__/utils.test.ts)
│   │   │       │   │   ├── [index.tsx](./lingo/src/games/stem/maths/fibonacci-sequence/index.tsx)
│   │   │       │   │   └── [utils.ts](./lingo/src/games/stem/maths/fibonacci-sequence/utils.ts)
│   │   │       │   ├── kaprekar-constant/
│   │   │       │   │   ├── __tests__/
│   │   │       │   │   │   ├── [index.test.tsx](./lingo/src/games/stem/maths/kaprekar-constant/__tests__/index.test.tsx)
│   │   │       │   │   │   └── [utils.test.ts](./lingo/src/games/stem/maths/kaprekar-constant/__tests__/utils.test.ts)
│   │   │       │   │   ├── [index.tsx](./lingo/src/games/stem/maths/kaprekar-constant/index.tsx)
│   │   │       │   │   └── [utils.ts](./lingo/src/games/stem/maths/kaprekar-constant/utils.ts)
│   │   │       │   └── prime-numbers/
│   │   │       │       ├── __tests__/
│   │   │       │       │   ├── [index.test.tsx](./lingo/src/games/stem/maths/prime-numbers/__tests__/index.test.tsx)
│   │   │       │       │   └── [utils.test.ts](./lingo/src/games/stem/maths/prime-numbers/__tests__/utils.test.ts)
│   │   │       │       ├── [index.tsx](./lingo/src/games/stem/maths/prime-numbers/index.tsx)
│   │   │       │       └── [utils.ts](./lingo/src/games/stem/maths/prime-numbers/utils.ts)
│   │   │       └── neuroscience/
│   │   │           ├── attentional-drift-diffusion-model/
│   │   │           │   ├── [components.tsx](./lingo/src/games/stem/neuroscience/attentional-drift-diffusion-model/components.tsx)
│   │   │           │   ├── [game.ts](./lingo/src/games/stem/neuroscience/attentional-drift-diffusion-model/game.ts)
│   │   │           │   ├── [index.tsx](./lingo/src/games/stem/neuroscience/attentional-drift-diffusion-model/index.tsx)
│   │   │           │   └── [types.ts](./lingo/src/games/stem/neuroscience/attentional-drift-diffusion-model/types.ts)
│   │   │           ├── drift-diffusion-model/
│   │   │           │   ├── [components.tsx](./lingo/src/games/stem/neuroscience/drift-diffusion-model/components.tsx)
│   │   │           │   ├── [constants.ts](./lingo/src/games/stem/neuroscience/drift-diffusion-model/constants.ts)
│   │   │           │   ├── [game.ts](./lingo/src/games/stem/neuroscience/drift-diffusion-model/game.ts)
│   │   │           │   ├── [index.tsx](./lingo/src/games/stem/neuroscience/drift-diffusion-model/index.tsx)
│   │   │           │   └── [types.ts](./lingo/src/games/stem/neuroscience/drift-diffusion-model/types.ts)
│   │   │           ├── eeg/
│   │   │           │   ├── __tests__/
│   │   │           │   │   ├── [game.test.ts](./lingo/src/games/stem/neuroscience/eeg/__tests__/game.test.ts)
│   │   │           │   │   └── [index.test.tsx](./lingo/src/games/stem/neuroscience/eeg/__tests__/index.test.tsx)
│   │   │           │   ├── [components.tsx](./lingo/src/games/stem/neuroscience/eeg/components.tsx)
│   │   │           │   ├── [game.ts](./lingo/src/games/stem/neuroscience/eeg/game.ts)
│   │   │           │   ├── [index.tsx](./lingo/src/games/stem/neuroscience/eeg/index.tsx)
│   │   │           │   └── [types.ts](./lingo/src/games/stem/neuroscience/eeg/types.ts)
│   │   │           ├── hierarchical-drift-diffusion-model/
│   │   │           │   ├── [components.tsx](./lingo/src/games/stem/neuroscience/hierarchical-drift-diffusion-model/components.tsx)
│   │   │           │   ├── [game.ts](./lingo/src/games/stem/neuroscience/hierarchical-drift-diffusion-model/game.ts)
│   │   │           │   ├── [index.tsx](./lingo/src/games/stem/neuroscience/hierarchical-drift-diffusion-model/index.tsx)
│   │   │           │   └── [types.ts](./lingo/src/games/stem/neuroscience/hierarchical-drift-diffusion-model/types.ts)
│   │   │           ├── leaky-competing-accumulator/
│   │   │           │   ├── [components.tsx](./lingo/src/games/stem/neuroscience/leaky-competing-accumulator/components.tsx)
│   │   │           │   ├── [game.ts](./lingo/src/games/stem/neuroscience/leaky-competing-accumulator/game.ts)
│   │   │           │   ├── [index.tsx](./lingo/src/games/stem/neuroscience/leaky-competing-accumulator/index.tsx)
│   │   │           │   └── [types.ts](./lingo/src/games/stem/neuroscience/leaky-competing-accumulator/types.ts)
│   │   │           ├── linear-ballistic-accumulator/
│   │   │           │   ├── [components.tsx](./lingo/src/games/stem/neuroscience/linear-ballistic-accumulator/components.tsx)
│   │   │           │   ├── [game.ts](./lingo/src/games/stem/neuroscience/linear-ballistic-accumulator/game.ts)
│   │   │           │   ├── [index.tsx](./lingo/src/games/stem/neuroscience/linear-ballistic-accumulator/index.tsx)
│   │   │           │   └── [types.ts](./lingo/src/games/stem/neuroscience/linear-ballistic-accumulator/types.ts)
│   │   │           ├── meg/
│   │   │           │   ├── __tests__/
│   │   │           │   │   ├── [game.test.ts](./lingo/src/games/stem/neuroscience/meg/__tests__/game.test.ts)
│   │   │           │   │   └── [index.test.tsx](./lingo/src/games/stem/neuroscience/meg/__tests__/index.test.tsx)
│   │   │           │   ├── [components.tsx](./lingo/src/games/stem/neuroscience/meg/components.tsx)
│   │   │           │   ├── [forward.ts](./lingo/src/games/stem/neuroscience/meg/forward.ts)
│   │   │           │   ├── [game.ts](./lingo/src/games/stem/neuroscience/meg/game.ts)
│   │   │           │   ├── [index.tsx](./lingo/src/games/stem/neuroscience/meg/index.tsx)
│   │   │           │   └── [types.ts](./lingo/src/games/stem/neuroscience/meg/types.ts)
│   │   │           ├── mri/
│   │   │           │   ├── __tests__/
│   │   │           │   │   ├── [game.test.ts](./lingo/src/games/stem/neuroscience/mri/__tests__/game.test.ts)
│   │   │           │   │   └── [index.test.tsx](./lingo/src/games/stem/neuroscience/mri/__tests__/index.test.tsx)
│   │   │           │   ├── [components.tsx](./lingo/src/games/stem/neuroscience/mri/components.tsx)
│   │   │           │   ├── [game.ts](./lingo/src/games/stem/neuroscience/mri/game.ts)
│   │   │           │   ├── [index.tsx](./lingo/src/games/stem/neuroscience/mri/index.tsx)
│   │   │           │   └── [types.ts](./lingo/src/games/stem/neuroscience/mri/types.ts)
│   │   │           ├── opm-meg/
│   │   │           │   ├── __tests__/
│   │   │           │   │   ├── [game.test.ts](./lingo/src/games/stem/neuroscience/opm-meg/__tests__/game.test.ts)
│   │   │           │   │   └── [index.test.tsx](./lingo/src/games/stem/neuroscience/opm-meg/__tests__/index.test.tsx)
│   │   │           │   ├── [components.tsx](./lingo/src/games/stem/neuroscience/opm-meg/components.tsx)
│   │   │           │   ├── [game.ts](./lingo/src/games/stem/neuroscience/opm-meg/game.ts)
│   │   │           │   ├── [index.tsx](./lingo/src/games/stem/neuroscience/opm-meg/index.tsx)
│   │   │           │   └── [types.ts](./lingo/src/games/stem/neuroscience/opm-meg/types.ts)
│   │   │           ├── race-models/
│   │   │           │   ├── [components.tsx](./lingo/src/games/stem/neuroscience/race-models/components.tsx)
│   │   │           │   ├── [game.ts](./lingo/src/games/stem/neuroscience/race-models/game.ts)
│   │   │           │   ├── [index.tsx](./lingo/src/games/stem/neuroscience/race-models/index.tsx)
│   │   │           │   └── [types.ts](./lingo/src/games/stem/neuroscience/race-models/types.ts)
│   │   │           └── shared/
│   │   │               └── [Window.tsx](./lingo/src/games/stem/neuroscience/shared/Window.tsx)
│   │   ├── hooks/
│   │   │   ├── __tests__/
│   │   │   │   ├── [useSWRegister.test.ts](./lingo/src/hooks/__tests__/useSWRegister.test.ts)
│   │   │   │   ├── [useTheme.test.ts](./lingo/src/hooks/__tests__/useTheme.test.ts)
│   │   │   │   └── [useUpdater.test.ts](./lingo/src/hooks/__tests__/useUpdater.test.ts)
│   │   │   ├── [useSWRegister.ts](./lingo/src/hooks/useSWRegister.ts)
│   │   │   ├── [useTheme.ts](./lingo/src/hooks/useTheme.ts)
│   │   │   └── [useUpdater.ts](./lingo/src/hooks/useUpdater.ts)
│   │   ├── lib/
│   │   │   ├── __tests__/
│   │   │   │   └── [progress.test.ts](./lingo/src/lib/__tests__/progress.test.ts)
│   │   │   ├── native/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [index.test.ts](./lingo/src/lib/native/__tests__/index.test.ts)
│   │   │   │   └── [index.ts](./lingo/src/lib/native/index.ts)
│   │   │   ├── [catalog.ts](./lingo/src/lib/catalog.ts)
│   │   │   ├── [progress.ts](./lingo/src/lib/progress.ts)
│   │   │   └── [publicPaths.ts](./lingo/src/lib/publicPaths.ts)
│   │   ├── providers/
│   │   │   ├── __tests__/
│   │   │   │   ├── [NativeProvider.test.tsx](./lingo/src/providers/__tests__/NativeProvider.test.tsx)
│   │   │   │   ├── [QueryProvider.test.tsx](./lingo/src/providers/__tests__/QueryProvider.test.tsx)
│   │   │   │   └── [SWProvider.test.tsx](./lingo/src/providers/__tests__/SWProvider.test.tsx)
│   │   │   ├── [NativeProvider.tsx](./lingo/src/providers/NativeProvider.tsx)
│   │   │   ├── [QueryProvider.tsx](./lingo/src/providers/QueryProvider.tsx)
│   │   │   └── [SWProvider.tsx](./lingo/src/providers/SWProvider.tsx)
│   │   └── styles/
│   │       ├── [globals.css](./lingo/src/styles/globals.css)
│   │       └── [themes.css](./lingo/src/styles/themes.css)
│   ├── src-tauri/
│   │   ├── capabilities/
│   │   │   └── [default.json](./lingo/src-tauri/capabilities/default.json)
│   │   ├── icons/
│   │   │   ├── android/
│   │   │   │   ├── mipmap-anydpi-v26/
│   │   │   │   │   └── [ic_launcher.xml](./lingo/src-tauri/icons/android/mipmap-anydpi-v26/ic_launcher.xml)
│   │   │   │   ├── mipmap-hdpi/
│   │   │   │   │   ├── [ic_launcher.png](./lingo/src-tauri/icons/android/mipmap-hdpi/ic_launcher.png)
│   │   │   │   │   ├── [ic_launcher_foreground.png](./lingo/src-tauri/icons/android/mipmap-hdpi/ic_launcher_foreground.png)
│   │   │   │   │   └── [ic_launcher_round.png](./lingo/src-tauri/icons/android/mipmap-hdpi/ic_launcher_round.png)
│   │   │   │   ├── mipmap-mdpi/
│   │   │   │   │   ├── [ic_launcher.png](./lingo/src-tauri/icons/android/mipmap-mdpi/ic_launcher.png)
│   │   │   │   │   ├── [ic_launcher_foreground.png](./lingo/src-tauri/icons/android/mipmap-mdpi/ic_launcher_foreground.png)
│   │   │   │   │   └── [ic_launcher_round.png](./lingo/src-tauri/icons/android/mipmap-mdpi/ic_launcher_round.png)
│   │   │   │   ├── mipmap-xhdpi/
│   │   │   │   │   ├── [ic_launcher.png](./lingo/src-tauri/icons/android/mipmap-xhdpi/ic_launcher.png)
│   │   │   │   │   ├── [ic_launcher_foreground.png](./lingo/src-tauri/icons/android/mipmap-xhdpi/ic_launcher_foreground.png)
│   │   │   │   │   └── [ic_launcher_round.png](./lingo/src-tauri/icons/android/mipmap-xhdpi/ic_launcher_round.png)
│   │   │   │   ├── mipmap-xxhdpi/
│   │   │   │   │   ├── [ic_launcher.png](./lingo/src-tauri/icons/android/mipmap-xxhdpi/ic_launcher.png)
│   │   │   │   │   ├── [ic_launcher_foreground.png](./lingo/src-tauri/icons/android/mipmap-xxhdpi/ic_launcher_foreground.png)
│   │   │   │   │   └── [ic_launcher_round.png](./lingo/src-tauri/icons/android/mipmap-xxhdpi/ic_launcher_round.png)
│   │   │   │   ├── mipmap-xxxhdpi/
│   │   │   │   │   ├── [ic_launcher.png](./lingo/src-tauri/icons/android/mipmap-xxxhdpi/ic_launcher.png)
│   │   │   │   │   ├── [ic_launcher_foreground.png](./lingo/src-tauri/icons/android/mipmap-xxxhdpi/ic_launcher_foreground.png)
│   │   │   │   │   └── [ic_launcher_round.png](./lingo/src-tauri/icons/android/mipmap-xxxhdpi/ic_launcher_round.png)
│   │   │   │   └── values/
│   │   │   │       └── [ic_launcher_background.xml](./lingo/src-tauri/icons/android/values/ic_launcher_background.xml)
│   │   │   ├── ios/
│   │   │   │   ├── [AppIcon-20x20@1x.png](./lingo/src-tauri/icons/ios/AppIcon-20x20@1x.png)
│   │   │   │   ├── [AppIcon-20x20@2x-1.png](./lingo/src-tauri/icons/ios/AppIcon-20x20@2x-1.png)
│   │   │   │   ├── [AppIcon-20x20@2x.png](./lingo/src-tauri/icons/ios/AppIcon-20x20@2x.png)
│   │   │   │   ├── [AppIcon-20x20@3x.png](./lingo/src-tauri/icons/ios/AppIcon-20x20@3x.png)
│   │   │   │   ├── [AppIcon-29x29@1x.png](./lingo/src-tauri/icons/ios/AppIcon-29x29@1x.png)
│   │   │   │   ├── [AppIcon-29x29@2x-1.png](./lingo/src-tauri/icons/ios/AppIcon-29x29@2x-1.png)
│   │   │   │   ├── [AppIcon-29x29@2x.png](./lingo/src-tauri/icons/ios/AppIcon-29x29@2x.png)
│   │   │   │   ├── [AppIcon-29x29@3x.png](./lingo/src-tauri/icons/ios/AppIcon-29x29@3x.png)
│   │   │   │   ├── [AppIcon-40x40@1x.png](./lingo/src-tauri/icons/ios/AppIcon-40x40@1x.png)
│   │   │   │   ├── [AppIcon-40x40@2x-1.png](./lingo/src-tauri/icons/ios/AppIcon-40x40@2x-1.png)
│   │   │   │   ├── [AppIcon-40x40@2x.png](./lingo/src-tauri/icons/ios/AppIcon-40x40@2x.png)
│   │   │   │   ├── [AppIcon-40x40@3x.png](./lingo/src-tauri/icons/ios/AppIcon-40x40@3x.png)
│   │   │   │   ├── [AppIcon-512@2x.png](./lingo/src-tauri/icons/ios/AppIcon-512@2x.png)
│   │   │   │   ├── [AppIcon-60x60@2x.png](./lingo/src-tauri/icons/ios/AppIcon-60x60@2x.png)
│   │   │   │   ├── [AppIcon-60x60@3x.png](./lingo/src-tauri/icons/ios/AppIcon-60x60@3x.png)
│   │   │   │   ├── [AppIcon-76x76@1x.png](./lingo/src-tauri/icons/ios/AppIcon-76x76@1x.png)
│   │   │   │   ├── [AppIcon-76x76@2x.png](./lingo/src-tauri/icons/ios/AppIcon-76x76@2x.png)
│   │   │   │   └── [AppIcon-83.5x83.5@2x.png](./lingo/src-tauri/icons/ios/AppIcon-83.5x83.5@2x.png)
│   │   │   ├── [128x128.png](./lingo/src-tauri/icons/128x128.png)
│   │   │   ├── [128x128@2x.png](./lingo/src-tauri/icons/128x128@2x.png)
│   │   │   ├── [256x256.png](./lingo/src-tauri/icons/256x256.png)
│   │   │   ├── [32x32.png](./lingo/src-tauri/icons/32x32.png)
│   │   │   ├── [64x64.png](./lingo/src-tauri/icons/64x64.png)
│   │   │   ├── [Square107x107Logo.png](./lingo/src-tauri/icons/Square107x107Logo.png)
│   │   │   ├── [Square142x142Logo.png](./lingo/src-tauri/icons/Square142x142Logo.png)
│   │   │   ├── [Square150x150Logo.png](./lingo/src-tauri/icons/Square150x150Logo.png)
│   │   │   ├── [Square284x284Logo.png](./lingo/src-tauri/icons/Square284x284Logo.png)
│   │   │   ├── [Square30x30Logo.png](./lingo/src-tauri/icons/Square30x30Logo.png)
│   │   │   ├── [Square310x310Logo.png](./lingo/src-tauri/icons/Square310x310Logo.png)
│   │   │   ├── [Square44x44Logo.png](./lingo/src-tauri/icons/Square44x44Logo.png)
│   │   │   ├── [Square71x71Logo.png](./lingo/src-tauri/icons/Square71x71Logo.png)
│   │   │   ├── [Square89x89Logo.png](./lingo/src-tauri/icons/Square89x89Logo.png)
│   │   │   ├── [StoreLogo.png](./lingo/src-tauri/icons/StoreLogo.png)
│   │   │   ├── [create-icons.sh](./lingo/src-tauri/icons/create-icons.sh)
│   │   │   ├── [icon.icns](./lingo/src-tauri/icons/icon.icns)
│   │   │   ├── [icon.ico](./lingo/src-tauri/icons/icon.ico)
│   │   │   └── [icon.png](./lingo/src-tauri/icons/icon.png)
│   │   ├── src/
│   │   │   ├── [lib.rs](./lingo/src-tauri/src/lib.rs)
│   │   │   └── [main.rs](./lingo/src-tauri/src/main.rs)
│   │   ├── [Cargo.lock](./lingo/src-tauri/Cargo.lock)
│   │   ├── [Cargo.toml](./lingo/src-tauri/Cargo.toml)
│   │   ├── [build.rs](./lingo/src-tauri/build.rs)
│   │   └── [tauri.conf.json](./lingo/src-tauri/tauri.conf.json)
│   ├── [AGENTS.md](./lingo/AGENTS.md)
│   ├── [Dockerfile](./lingo/Dockerfile)
│   ├── [LICENSE](./lingo/LICENSE)
│   ├── [README.md](./lingo/README.md)
│   ├── [TREE.md](./lingo/TREE.md)
│   ├── [docker-compose.yaml](./lingo/docker-compose.yaml)
│   ├── [eslint.config.mts](./lingo/eslint.config.mts)
│   ├── [jest.config.ts](./lingo/jest.config.ts)
│   ├── [jest.setup.ts](./lingo/jest.setup.ts)
│   ├── [next.config.ts](./lingo/next.config.ts)
│   ├── [package.json](./lingo/package.json)
│   ├── [playwright.config.ts](./lingo/playwright.config.ts)
│   ├── [postcss.config.mjs](./lingo/postcss.config.mjs)
│   └── [tsconfig.json](./lingo/tsconfig.json)
├── [README.md](./README.md)
└── [TREE.md](./TREE.md)
```

697 directories, 1612 files
