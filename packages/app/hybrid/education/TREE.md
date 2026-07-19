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
│   │   │   ├── [base.css](./doi/src/styles/base.css)
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
│   │   │   │   ├── chemistry/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./lingo/src/app/(games)/chemistry/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/chemistry/page.tsx)
│   │   │   │   ├── economics/
│   │   │   │   │   ├── adverse-selection/
│   │   │   │   │   │   ├── lemons/
│   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/economics/adverse-selection/lemons/page.tsx)
│   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/economics/adverse-selection/page.tsx)
│   │   │   │   │   ├── aggregate-demand-supply/
│   │   │   │   │   │   ├── shocks/
│   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/economics/aggregate-demand-supply/shocks/page.tsx)
│   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/economics/aggregate-demand-supply/page.tsx)
│   │   │   │   │   ├── arbitrage/
│   │   │   │   │   │   ├── triangular/
│   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/economics/arbitrage/triangular/page.tsx)
│   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/economics/arbitrage/page.tsx)
│   │   │   │   │   ├── auction-theory/
│   │   │   │   │   │   ├── auction/
│   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/economics/auction-theory/auction/page.tsx)
│   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/economics/auction-theory/page.tsx)
│   │   │   │   │   ├── backward-induction/
│   │   │   │   │   │   ├── rollback/
│   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/economics/backward-induction/rollback/page.tsx)
│   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/economics/backward-induction/page.tsx)
│   │   │   │   │   ├── bargaining-theory/
│   │   │   │   │   │   ├── ultimatum/
│   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/economics/bargaining-theory/ultimatum/page.tsx)
│   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/economics/bargaining-theory/page.tsx)
│   │   │   │   │   ├── bayesian-updating/
│   │   │   │   │   │   ├── monty-hall/
│   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/economics/bayesian-updating/monty-hall/page.tsx)
│   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/economics/bayesian-updating/page.tsx)
│   │   │   │   │   ├── behavioral-finance/
│   │   │   │   │   │   ├── bubble/
│   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/economics/behavioral-finance/bubble/page.tsx)
│   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/economics/behavioral-finance/page.tsx)
│   │   │   │   │   ├── behavioral-heuristics/
│   │   │   │   │   │   ├── lab/
│   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/economics/behavioral-heuristics/lab/page.tsx)
│   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/economics/behavioral-heuristics/page.tsx)
│   │   │   │   │   ├── business-cycles/
│   │   │   │   │   │   ├── predict/
│   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/economics/business-cycles/predict/page.tsx)
│   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/economics/business-cycles/page.tsx)
│   │   │   │   │   ├── capm-and-risk/
│   │   │   │   │   │   ├── portfolio/
│   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/economics/capm-and-risk/portfolio/page.tsx)
│   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/economics/capm-and-risk/page.tsx)
│   │   │   │   │   ├── causal-inference/
│   │   │   │   │   │   ├── experiments/
│   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/economics/causal-inference/experiments/page.tsx)
│   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/economics/causal-inference/page.tsx)
│   │   │   │   │   ├── consumer-theory/
│   │   │   │   │   │   ├── utility/
│   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/economics/consumer-theory/utility/page.tsx)
│   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/economics/consumer-theory/page.tsx)
│   │   │   │   │   ├── coordination-games/
│   │   │   │   │   │   ├── stag-hunt/
│   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/economics/coordination-games/stag-hunt/page.tsx)
│   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/economics/coordination-games/page.tsx)
│   │   │   │   │   ├── development-rcts/
│   │   │   │   │   │   ├── experiment/
│   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/economics/development-rcts/experiment/page.tsx)
│   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/economics/development-rcts/page.tsx)
│   │   │   │   │   ├── economic-inequality/
│   │   │   │   │   │   ├── lorenz/
│   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/economics/economic-inequality/lorenz/page.tsx)
│   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/economics/economic-inequality/page.tsx)
│   │   │   │   │   ├── efficient-market-hypothesis/
│   │   │   │   │   │   ├── random-walk/
│   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/economics/efficient-market-hypothesis/random-walk/page.tsx)
│   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/economics/efficient-market-hypothesis/page.tsx)
│   │   │   │   │   ├── elasticity/
│   │   │   │   │   │   ├── pricing/
│   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/economics/elasticity/pricing/page.tsx)
│   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/economics/elasticity/page.tsx)
│   │   │   │   │   ├── endowment-effect/
│   │   │   │   │   │   ├── trade/
│   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/economics/endowment-effect/trade/page.tsx)
│   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/economics/endowment-effect/page.tsx)
│   │   │   │   │   ├── evolutionary-game-theory/
│   │   │   │   │   │   ├── replicator/
│   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/economics/evolutionary-game-theory/replicator/page.tsx)
│   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/economics/evolutionary-game-theory/page.tsx)
│   │   │   │   │   ├── externalities/
│   │   │   │   │   │   ├── pigou/
│   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/economics/externalities/pigou/page.tsx)
│   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/economics/externalities/page.tsx)
│   │   │   │   │   ├── fiscal-policy/
│   │   │   │   │   │   ├── stimulus/
│   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/economics/fiscal-policy/stimulus/page.tsx)
│   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/economics/fiscal-policy/page.tsx)
│   │   │   │   │   ├── game-theory-basics/
│   │   │   │   │   │   ├── matrix/
│   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/economics/game-theory-basics/matrix/page.tsx)
│   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/economics/game-theory-basics/page.tsx)
│   │   │   │   │   ├── gdp-and-national-accounts/
│   │   │   │   │   │   ├── aggregate/
│   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/economics/gdp-and-national-accounts/aggregate/page.tsx)
│   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/economics/gdp-and-national-accounts/page.tsx)
│   │   │   │   │   ├── human-capital/
│   │   │   │   │   │   ├── decision/
│   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/economics/human-capital/decision/page.tsx)
│   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/economics/human-capital/page.tsx)
│   │   │   │   │   ├── imperfect-competition/
│   │   │   │   │   │   ├── lab/
│   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/economics/imperfect-competition/lab/page.tsx)
│   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/economics/imperfect-competition/page.tsx)
│   │   │   │   │   ├── institutions-and-growth/
│   │   │   │   │   │   ├── lab/
│   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/economics/institutions-and-growth/lab/page.tsx)
│   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/economics/institutions-and-growth/page.tsx)
│   │   │   │   │   ├── is-lm-model/
│   │   │   │   │   │   ├── equilibrium/
│   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/economics/is-lm-model/equilibrium/page.tsx)
│   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/economics/is-lm-model/page.tsx)
│   │   │   │   │   ├── keynesian-economics/
│   │   │   │   │   │   ├── cross/
│   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/economics/keynesian-economics/cross/page.tsx)
│   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/economics/keynesian-economics/page.tsx)
│   │   │   │   │   ├── labor-markets/
│   │   │   │   │   │   ├── wage/
│   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/economics/labor-markets/wage/page.tsx)
│   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/economics/labor-markets/page.tsx)
│   │   │   │   │   ├── marginal-utility/
│   │   │   │   │   │   ├── lab/
│   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/economics/marginal-utility/lab/page.tsx)
│   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/economics/marginal-utility/page.tsx)
│   │   │   │   │   ├── market-failures/
│   │   │   │   │   │   ├── policies/
│   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/economics/market-failures/policies/page.tsx)
│   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/economics/market-failures/page.tsx)
│   │   │   │   │   ├── market-microstructure/
│   │   │   │   │   │   ├── order-book/
│   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/economics/market-microstructure/order-book/page.tsx)
│   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/economics/market-microstructure/page.tsx)
│   │   │   │   │   ├── mechanism-design/
│   │   │   │   │   │   ├── reveal/
│   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/economics/mechanism-design/reveal/page.tsx)
│   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/economics/mechanism-design/page.tsx)
│   │   │   │   │   ├── mental-accounting/
│   │   │   │   │   │   ├── scenarios/
│   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/economics/mental-accounting/scenarios/page.tsx)
│   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/economics/mental-accounting/page.tsx)
│   │   │   │   │   ├── migration-economics/
│   │   │   │   │   │   ├── moves/
│   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/economics/migration-economics/moves/page.tsx)
│   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/economics/migration-economics/page.tsx)
│   │   │   │   │   ├── monetary-policy/
│   │   │   │   │   │   ├── interest/
│   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/economics/monetary-policy/interest/page.tsx)
│   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/economics/monetary-policy/page.tsx)
│   │   │   │   │   ├── monopoly-and-market-power/
│   │   │   │   │   │   ├── pricing/
│   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/economics/monopoly-and-market-power/pricing/page.tsx)
│   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/economics/monopoly-and-market-power/page.tsx)
│   │   │   │   │   ├── moral-hazard/
│   │   │   │   │   │   ├── insurance/
│   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/economics/moral-hazard/insurance/page.tsx)
│   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/economics/moral-hazard/page.tsx)
│   │   │   │   │   ├── nash-equilibrium/
│   │   │   │   │   │   ├── solve/
│   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/economics/nash-equilibrium/solve/page.tsx)
│   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/economics/nash-equilibrium/page.tsx)
│   │   │   │   │   ├── nudge-and-behavioral-economics/
│   │   │   │   │   │   ├── choice/
│   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/economics/nudge-and-behavioral-economics/choice/page.tsx)
│   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/economics/nudge-and-behavioral-economics/page.tsx)
│   │   │   │   │   ├── oligopoly/
│   │   │   │   │   │   ├── cournot/
│   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/economics/oligopoly/cournot/page.tsx)
│   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/economics/oligopoly/page.tsx)
│   │   │   │   │   ├── opportunity-cost/
│   │   │   │   │   │   ├── trade-offs/
│   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/economics/opportunity-cost/trade-offs/page.tsx)
│   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/economics/opportunity-cost/page.tsx)
│   │   │   │   │   ├── overconfidence-bias/
│   │   │   │   │   │   ├── calibration/
│   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/economics/overconfidence-bias/calibration/page.tsx)
│   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/economics/overconfidence-bias/page.tsx)
│   │   │   │   │   ├── perfect-competition/
│   │   │   │   │   │   ├── firm/
│   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/economics/perfect-competition/firm/page.tsx)
│   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/economics/perfect-competition/page.tsx)
│   │   │   │   │   ├── phillips-curve/
│   │   │   │   │   │   ├── tradeoff/
│   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/economics/phillips-curve/tradeoff/page.tsx)
│   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/economics/phillips-curve/page.tsx)
│   │   │   │   │   ├── portfolio-theory/
│   │   │   │   │   │   ├── frontier/
│   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/economics/portfolio-theory/frontier/page.tsx)
│   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/economics/portfolio-theory/page.tsx)
│   │   │   │   │   ├── poverty-traps/
│   │   │   │   │   │   ├── escape/
│   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/economics/poverty-traps/escape/page.tsx)
│   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/economics/poverty-traps/page.tsx)
│   │   │   │   │   ├── price-discrimination/
│   │   │   │   │   │   ├── split/
│   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/economics/price-discrimination/split/page.tsx)
│   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/economics/price-discrimination/page.tsx)
│   │   │   │   │   ├── prisoners-dilemma/
│   │   │   │   │   │   ├── bots/
│   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/economics/prisoners-dilemma/bots/page.tsx)
│   │   │   │   │   │   ├── simulation/
│   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/economics/prisoners-dilemma/simulation/page.tsx)
│   │   │   │   │   │   ├── versus/
│   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/economics/prisoners-dilemma/versus/page.tsx)
│   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/economics/prisoners-dilemma/page.tsx)
│   │   │   │   │   ├── production-and-costs/
│   │   │   │   │   │   ├── lab/
│   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/economics/production-and-costs/lab/page.tsx)
│   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/economics/production-and-costs/page.tsx)
│   │   │   │   │   ├── prospect-theory/
│   │   │   │   │   │   ├── framing/
│   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/economics/prospect-theory/framing/page.tsx)
│   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/economics/prospect-theory/page.tsx)
│   │   │   │   │   ├── public-choice/
│   │   │   │   │   │   ├── voting/
│   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/economics/public-choice/voting/page.tsx)
│   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/economics/public-choice/page.tsx)
│   │   │   │   │   ├── public-goods-dilemma/
│   │   │   │   │   │   ├── contribute/
│   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/economics/public-goods-dilemma/contribute/page.tsx)
│   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/economics/public-goods-dilemma/page.tsx)
│   │   │   │   │   ├── repeated-games/
│   │   │   │   │   │   ├── tournament/
│   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/economics/repeated-games/tournament/page.tsx)
│   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/economics/repeated-games/page.tsx)
│   │   │   │   │   ├── signaling/
│   │   │   │   │   │   ├── job-market/
│   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/economics/signaling/job-market/page.tsx)
│   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/economics/signaling/page.tsx)
│   │   │   │   │   ├── social-preferences/
│   │   │   │   │   │   ├── dictator/
│   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/economics/social-preferences/dictator/page.tsx)
│   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/economics/social-preferences/page.tsx)
│   │   │   │   │   ├── supply-and-demand/
│   │   │   │   │   │   ├── price-lab/
│   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/economics/supply-and-demand/price-lab/page.tsx)
│   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/economics/supply-and-demand/page.tsx)
│   │   │   │   │   ├── time-inconsistency/
│   │   │   │   │   │   ├── savings/
│   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/economics/time-inconsistency/savings/page.tsx)
│   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/economics/time-inconsistency/page.tsx)
│   │   │   │   │   ├── time-value-of-money/
│   │   │   │   │   │   ├── lab/
│   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/economics/time-value-of-money/lab/page.tsx)
│   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/economics/time-value-of-money/page.tsx)
│   │   │   │   │   ├── trade-and-tariffs/
│   │   │   │   │   │   ├── lab/
│   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/economics/trade-and-tariffs/lab/page.tsx)
│   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/economics/trade-and-tariffs/page.tsx)
│   │   │   │   │   ├── tragedy-of-the-commons/
│   │   │   │   │   │   ├── harvest/
│   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/economics/tragedy-of-the-commons/harvest/page.tsx)
│   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/economics/tragedy-of-the-commons/page.tsx)
│   │   │   │   │   ├── unemployment-okuns-law/
│   │   │   │   │   │   ├── lab/
│   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/economics/unemployment-okuns-law/lab/page.tsx)
│   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/economics/unemployment-okuns-law/page.tsx)
│   │   │   │   │   ├── zero-sum-games/
│   │   │   │   │   │   ├── rps/
│   │   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/economics/zero-sum-games/rps/page.tsx)
│   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/economics/zero-sum-games/page.tsx)
│   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/economics/page.tsx)
│   │   │   │   ├── history/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./lingo/src/app/(games)/history/__tests__/page.test.tsx)
│   │   │   │   │   ├── myth-vs-fact/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   └── [page.test.tsx](./lingo/src/app/(games)/history/myth-vs-fact/__tests__/page.test.tsx)
│   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/history/myth-vs-fact/page.tsx)
│   │   │   │   │   ├── through-the-years/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   └── [page.test.tsx](./lingo/src/app/(games)/history/through-the-years/__tests__/page.test.tsx)
│   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/history/through-the-years/page.tsx)
│   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/history/page.tsx)
│   │   │   │   ├── languages/
│   │   │   │   │   ├── [language]/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   └── [page.test.tsx](./lingo/src/app/(games)/languages/[language]/__tests__/page.test.tsx)
│   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/languages/[language]/page.tsx)
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./lingo/src/app/(games)/languages/__tests__/page.test.tsx)
│   │   │   │   │   ├── english/
│   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/languages/english/page.tsx)
│   │   │   │   │   ├── sign/
│   │   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/languages/sign/page.tsx)
│   │   │   │   │   └── [page.tsx](./lingo/src/app/(games)/languages/page.tsx)
│   │   │   │   └── music/
│   │   │   │       ├── __tests__/
│   │   │   │       │   └── [page.test.tsx](./lingo/src/app/(games)/music/__tests__/page.test.tsx)
│   │   │   │       └── [page.tsx](./lingo/src/app/(games)/music/page.tsx)
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
│   │   │       │   ├── [HomeTemplate.test.tsx](./lingo/src/components/templates/__tests__/HomeTemplate.test.tsx)
│   │   │       │   └── [VersionTemplate.test.tsx](./lingo/src/components/templates/__tests__/VersionTemplate.test.tsx)
│   │   │       ├── [AboutTemplate.tsx](./lingo/src/components/templates/AboutTemplate.tsx)
│   │   │       ├── [DownloadsTemplate.tsx](./lingo/src/components/templates/DownloadsTemplate.tsx)
│   │   │       ├── [ErrorTemplate.tsx](./lingo/src/components/templates/ErrorTemplate.tsx)
│   │   │       ├── [HomeTemplate.tsx](./lingo/src/components/templates/HomeTemplate.tsx)
│   │   │       ├── [TheoryTemplate.tsx](./lingo/src/components/templates/TheoryTemplate.tsx)
│   │   │       └── [VersionTemplate.tsx](./lingo/src/components/templates/VersionTemplate.tsx)
│   │   ├── content/
│   │   │   ├── [about.ts](./lingo/src/content/about.ts)
│   │   │   ├── [download.ts](./lingo/src/content/download.ts)
│   │   │   └── [version.ts](./lingo/src/content/version.ts)
│   │   ├── games/
│   │   │   ├── chemistry/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [index.test.tsx](./lingo/src/games/chemistry/__tests__/index.test.tsx)
│   │   │   │   │   └── [utils.test.ts](./lingo/src/games/chemistry/__tests__/utils.test.ts)
│   │   │   │   ├── [index.tsx](./lingo/src/games/chemistry/index.tsx)
│   │   │   │   └── [utils.ts](./lingo/src/games/chemistry/utils.ts)
│   │   │   ├── economics/
│   │   │   │   ├── ad-as/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [game.test.ts](./lingo/src/games/economics/ad-as/__tests__/game.test.ts)
│   │   │   │   │   │   ├── [index.test.tsx](./lingo/src/games/economics/ad-as/__tests__/index.test.tsx)
│   │   │   │   │   │   └── [reducer.test.ts](./lingo/src/games/economics/ad-as/__tests__/reducer.test.ts)
│   │   │   │   │   ├── [components.tsx](./lingo/src/games/economics/ad-as/components.tsx)
│   │   │   │   │   ├── [constants.ts](./lingo/src/games/economics/ad-as/constants.ts)
│   │   │   │   │   ├── [game.ts](./lingo/src/games/economics/ad-as/game.ts)
│   │   │   │   │   ├── [index.tsx](./lingo/src/games/economics/ad-as/index.tsx)
│   │   │   │   │   ├── [reducer.ts](./lingo/src/games/economics/ad-as/reducer.ts)
│   │   │   │   │   └── [types.ts](./lingo/src/games/economics/ad-as/types.ts)
│   │   │   │   ├── arbitrage/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [game.test.ts](./lingo/src/games/economics/arbitrage/__tests__/game.test.ts)
│   │   │   │   │   │   ├── [index.test.tsx](./lingo/src/games/economics/arbitrage/__tests__/index.test.tsx)
│   │   │   │   │   │   └── [reducer.test.ts](./lingo/src/games/economics/arbitrage/__tests__/reducer.test.ts)
│   │   │   │   │   ├── [components.tsx](./lingo/src/games/economics/arbitrage/components.tsx)
│   │   │   │   │   ├── [constants.ts](./lingo/src/games/economics/arbitrage/constants.ts)
│   │   │   │   │   ├── [game.ts](./lingo/src/games/economics/arbitrage/game.ts)
│   │   │   │   │   ├── [index.tsx](./lingo/src/games/economics/arbitrage/index.tsx)
│   │   │   │   │   ├── [reducer.ts](./lingo/src/games/economics/arbitrage/reducer.ts)
│   │   │   │   │   └── [types.ts](./lingo/src/games/economics/arbitrage/types.ts)
│   │   │   │   ├── auction/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [game.test.ts](./lingo/src/games/economics/auction/__tests__/game.test.ts)
│   │   │   │   │   │   ├── [index.test.tsx](./lingo/src/games/economics/auction/__tests__/index.test.tsx)
│   │   │   │   │   │   └── [reducer.test.ts](./lingo/src/games/economics/auction/__tests__/reducer.test.ts)
│   │   │   │   │   ├── [constants.ts](./lingo/src/games/economics/auction/constants.ts)
│   │   │   │   │   ├── [game.ts](./lingo/src/games/economics/auction/game.ts)
│   │   │   │   │   ├── [index.tsx](./lingo/src/games/economics/auction/index.tsx)
│   │   │   │   │   ├── [reducer.ts](./lingo/src/games/economics/auction/reducer.ts)
│   │   │   │   │   └── [types.ts](./lingo/src/games/economics/auction/types.ts)
│   │   │   │   ├── bargaining/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [game.test.ts](./lingo/src/games/economics/bargaining/__tests__/game.test.ts)
│   │   │   │   │   │   ├── [index.test.tsx](./lingo/src/games/economics/bargaining/__tests__/index.test.tsx)
│   │   │   │   │   │   └── [reducer.test.ts](./lingo/src/games/economics/bargaining/__tests__/reducer.test.ts)
│   │   │   │   │   ├── [constants.ts](./lingo/src/games/economics/bargaining/constants.ts)
│   │   │   │   │   ├── [game.ts](./lingo/src/games/economics/bargaining/game.ts)
│   │   │   │   │   ├── [index.tsx](./lingo/src/games/economics/bargaining/index.tsx)
│   │   │   │   │   ├── [reducer.ts](./lingo/src/games/economics/bargaining/reducer.ts)
│   │   │   │   │   └── [types.ts](./lingo/src/games/economics/bargaining/types.ts)
│   │   │   │   ├── basics/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [game.test.ts](./lingo/src/games/economics/basics/__tests__/game.test.ts)
│   │   │   │   │   │   ├── [index.test.tsx](./lingo/src/games/economics/basics/__tests__/index.test.tsx)
│   │   │   │   │   │   └── [reducer.test.ts](./lingo/src/games/economics/basics/__tests__/reducer.test.ts)
│   │   │   │   │   ├── [components.tsx](./lingo/src/games/economics/basics/components.tsx)
│   │   │   │   │   ├── [constants.ts](./lingo/src/games/economics/basics/constants.ts)
│   │   │   │   │   ├── [game.ts](./lingo/src/games/economics/basics/game.ts)
│   │   │   │   │   ├── [index.tsx](./lingo/src/games/economics/basics/index.tsx)
│   │   │   │   │   ├── [panels.tsx](./lingo/src/games/economics/basics/panels.tsx)
│   │   │   │   │   ├── [reducer.ts](./lingo/src/games/economics/basics/reducer.ts)
│   │   │   │   │   └── [types.ts](./lingo/src/games/economics/basics/types.ts)
│   │   │   │   ├── bayesian/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [game.test.ts](./lingo/src/games/economics/bayesian/__tests__/game.test.ts)
│   │   │   │   │   │   ├── [index.test.tsx](./lingo/src/games/economics/bayesian/__tests__/index.test.tsx)
│   │   │   │   │   │   └── [reducer.test.ts](./lingo/src/games/economics/bayesian/__tests__/reducer.test.ts)
│   │   │   │   │   ├── [components.tsx](./lingo/src/games/economics/bayesian/components.tsx)
│   │   │   │   │   ├── [constants.ts](./lingo/src/games/economics/bayesian/constants.ts)
│   │   │   │   │   ├── [game.ts](./lingo/src/games/economics/bayesian/game.ts)
│   │   │   │   │   ├── [index.tsx](./lingo/src/games/economics/bayesian/index.tsx)
│   │   │   │   │   ├── [reducer.ts](./lingo/src/games/economics/bayesian/reducer.ts)
│   │   │   │   │   └── [types.ts](./lingo/src/games/economics/bayesian/types.ts)
│   │   │   │   ├── bubbles/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [game.test.ts](./lingo/src/games/economics/bubbles/__tests__/game.test.ts)
│   │   │   │   │   │   ├── [index.test.tsx](./lingo/src/games/economics/bubbles/__tests__/index.test.tsx)
│   │   │   │   │   │   └── [reducer.test.ts](./lingo/src/games/economics/bubbles/__tests__/reducer.test.ts)
│   │   │   │   │   ├── [components.tsx](./lingo/src/games/economics/bubbles/components.tsx)
│   │   │   │   │   ├── [constants.ts](./lingo/src/games/economics/bubbles/constants.ts)
│   │   │   │   │   ├── [game.ts](./lingo/src/games/economics/bubbles/game.ts)
│   │   │   │   │   ├── [index.tsx](./lingo/src/games/economics/bubbles/index.tsx)
│   │   │   │   │   ├── [reducer.ts](./lingo/src/games/economics/bubbles/reducer.ts)
│   │   │   │   │   └── [types.ts](./lingo/src/games/economics/bubbles/types.ts)
│   │   │   │   ├── business-cycles/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [game.test.ts](./lingo/src/games/economics/business-cycles/__tests__/game.test.ts)
│   │   │   │   │   │   ├── [index.test.tsx](./lingo/src/games/economics/business-cycles/__tests__/index.test.tsx)
│   │   │   │   │   │   └── [reducer.test.ts](./lingo/src/games/economics/business-cycles/__tests__/reducer.test.ts)
│   │   │   │   │   ├── [components.tsx](./lingo/src/games/economics/business-cycles/components.tsx)
│   │   │   │   │   ├── [constants.ts](./lingo/src/games/economics/business-cycles/constants.ts)
│   │   │   │   │   ├── [game.ts](./lingo/src/games/economics/business-cycles/game.ts)
│   │   │   │   │   ├── [index.tsx](./lingo/src/games/economics/business-cycles/index.tsx)
│   │   │   │   │   ├── [reducer.ts](./lingo/src/games/economics/business-cycles/reducer.ts)
│   │   │   │   │   └── [types.ts](./lingo/src/games/economics/business-cycles/types.ts)
│   │   │   │   ├── capm/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [game.test.ts](./lingo/src/games/economics/capm/__tests__/game.test.ts)
│   │   │   │   │   │   ├── [index.test.tsx](./lingo/src/games/economics/capm/__tests__/index.test.tsx)
│   │   │   │   │   │   └── [reducer.test.ts](./lingo/src/games/economics/capm/__tests__/reducer.test.ts)
│   │   │   │   │   ├── [components.tsx](./lingo/src/games/economics/capm/components.tsx)
│   │   │   │   │   ├── [constants.ts](./lingo/src/games/economics/capm/constants.ts)
│   │   │   │   │   ├── [game.ts](./lingo/src/games/economics/capm/game.ts)
│   │   │   │   │   ├── [index.tsx](./lingo/src/games/economics/capm/index.tsx)
│   │   │   │   │   ├── [reducer.ts](./lingo/src/games/economics/capm/reducer.ts)
│   │   │   │   │   └── [types.ts](./lingo/src/games/economics/capm/types.ts)
│   │   │   │   ├── causal/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [game.test.ts](./lingo/src/games/economics/causal/__tests__/game.test.ts)
│   │   │   │   │   │   ├── [index.test.tsx](./lingo/src/games/economics/causal/__tests__/index.test.tsx)
│   │   │   │   │   │   └── [reducer.test.ts](./lingo/src/games/economics/causal/__tests__/reducer.test.ts)
│   │   │   │   │   ├── [components.tsx](./lingo/src/games/economics/causal/components.tsx)
│   │   │   │   │   ├── [constants.ts](./lingo/src/games/economics/causal/constants.ts)
│   │   │   │   │   ├── [game.ts](./lingo/src/games/economics/causal/game.ts)
│   │   │   │   │   ├── [index.tsx](./lingo/src/games/economics/causal/index.tsx)
│   │   │   │   │   ├── [reducer.ts](./lingo/src/games/economics/causal/reducer.ts)
│   │   │   │   │   └── [types.ts](./lingo/src/games/economics/causal/types.ts)
│   │   │   │   ├── commitment/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [game.test.ts](./lingo/src/games/economics/commitment/__tests__/game.test.ts)
│   │   │   │   │   │   ├── [index.test.tsx](./lingo/src/games/economics/commitment/__tests__/index.test.tsx)
│   │   │   │   │   │   └── [reducer.test.ts](./lingo/src/games/economics/commitment/__tests__/reducer.test.ts)
│   │   │   │   │   ├── [constants.ts](./lingo/src/games/economics/commitment/constants.ts)
│   │   │   │   │   ├── [game.ts](./lingo/src/games/economics/commitment/game.ts)
│   │   │   │   │   ├── [index.tsx](./lingo/src/games/economics/commitment/index.tsx)
│   │   │   │   │   ├── [reducer.ts](./lingo/src/games/economics/commitment/reducer.ts)
│   │   │   │   │   └── [types.ts](./lingo/src/games/economics/commitment/types.ts)
│   │   │   │   ├── commons/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [game.test.ts](./lingo/src/games/economics/commons/__tests__/game.test.ts)
│   │   │   │   │   │   ├── [index.test.tsx](./lingo/src/games/economics/commons/__tests__/index.test.tsx)
│   │   │   │   │   │   └── [reducer.test.ts](./lingo/src/games/economics/commons/__tests__/reducer.test.ts)
│   │   │   │   │   ├── [constants.ts](./lingo/src/games/economics/commons/constants.ts)
│   │   │   │   │   ├── [game.ts](./lingo/src/games/economics/commons/game.ts)
│   │   │   │   │   ├── [index.tsx](./lingo/src/games/economics/commons/index.tsx)
│   │   │   │   │   ├── [reducer.ts](./lingo/src/games/economics/commons/reducer.ts)
│   │   │   │   │   └── [types.ts](./lingo/src/games/economics/commons/types.ts)
│   │   │   │   ├── consumer/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [game.test.ts](./lingo/src/games/economics/consumer/__tests__/game.test.ts)
│   │   │   │   │   │   ├── [index.test.tsx](./lingo/src/games/economics/consumer/__tests__/index.test.tsx)
│   │   │   │   │   │   └── [reducer.test.ts](./lingo/src/games/economics/consumer/__tests__/reducer.test.ts)
│   │   │   │   │   ├── [components.tsx](./lingo/src/games/economics/consumer/components.tsx)
│   │   │   │   │   ├── [constants.ts](./lingo/src/games/economics/consumer/constants.ts)
│   │   │   │   │   ├── [game.ts](./lingo/src/games/economics/consumer/game.ts)
│   │   │   │   │   ├── [index.tsx](./lingo/src/games/economics/consumer/index.tsx)
│   │   │   │   │   ├── [reducer.ts](./lingo/src/games/economics/consumer/reducer.ts)
│   │   │   │   │   └── [types.ts](./lingo/src/games/economics/consumer/types.ts)
│   │   │   │   ├── dictator/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [game.test.ts](./lingo/src/games/economics/dictator/__tests__/game.test.ts)
│   │   │   │   │   │   ├── [index.test.tsx](./lingo/src/games/economics/dictator/__tests__/index.test.tsx)
│   │   │   │   │   │   └── [reducer.test.ts](./lingo/src/games/economics/dictator/__tests__/reducer.test.ts)
│   │   │   │   │   ├── [constants.ts](./lingo/src/games/economics/dictator/constants.ts)
│   │   │   │   │   ├── [game.ts](./lingo/src/games/economics/dictator/game.ts)
│   │   │   │   │   ├── [index.tsx](./lingo/src/games/economics/dictator/index.tsx)
│   │   │   │   │   ├── [reducer.ts](./lingo/src/games/economics/dictator/reducer.ts)
│   │   │   │   │   └── [types.ts](./lingo/src/games/economics/dictator/types.ts)
│   │   │   │   ├── elasticity/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [game.test.ts](./lingo/src/games/economics/elasticity/__tests__/game.test.ts)
│   │   │   │   │   │   ├── [index.test.tsx](./lingo/src/games/economics/elasticity/__tests__/index.test.tsx)
│   │   │   │   │   │   └── [reducer.test.ts](./lingo/src/games/economics/elasticity/__tests__/reducer.test.ts)
│   │   │   │   │   ├── [components.tsx](./lingo/src/games/economics/elasticity/components.tsx)
│   │   │   │   │   ├── [constants.ts](./lingo/src/games/economics/elasticity/constants.ts)
│   │   │   │   │   ├── [game.ts](./lingo/src/games/economics/elasticity/game.ts)
│   │   │   │   │   ├── [index.tsx](./lingo/src/games/economics/elasticity/index.tsx)
│   │   │   │   │   ├── [reducer.ts](./lingo/src/games/economics/elasticity/reducer.ts)
│   │   │   │   │   └── [types.ts](./lingo/src/games/economics/elasticity/types.ts)
│   │   │   │   ├── emh/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [game.test.ts](./lingo/src/games/economics/emh/__tests__/game.test.ts)
│   │   │   │   │   │   ├── [index.test.tsx](./lingo/src/games/economics/emh/__tests__/index.test.tsx)
│   │   │   │   │   │   └── [reducer.test.ts](./lingo/src/games/economics/emh/__tests__/reducer.test.ts)
│   │   │   │   │   ├── [components.tsx](./lingo/src/games/economics/emh/components.tsx)
│   │   │   │   │   ├── [constants.ts](./lingo/src/games/economics/emh/constants.ts)
│   │   │   │   │   ├── [game.ts](./lingo/src/games/economics/emh/game.ts)
│   │   │   │   │   ├── [index.tsx](./lingo/src/games/economics/emh/index.tsx)
│   │   │   │   │   ├── [reducer.ts](./lingo/src/games/economics/emh/reducer.ts)
│   │   │   │   │   └── [types.ts](./lingo/src/games/economics/emh/types.ts)
│   │   │   │   ├── endowment/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [game.test.ts](./lingo/src/games/economics/endowment/__tests__/game.test.ts)
│   │   │   │   │   │   ├── [index.test.tsx](./lingo/src/games/economics/endowment/__tests__/index.test.tsx)
│   │   │   │   │   │   └── [reducer.test.ts](./lingo/src/games/economics/endowment/__tests__/reducer.test.ts)
│   │   │   │   │   ├── [constants.ts](./lingo/src/games/economics/endowment/constants.ts)
│   │   │   │   │   ├── [game.ts](./lingo/src/games/economics/endowment/game.ts)
│   │   │   │   │   ├── [index.tsx](./lingo/src/games/economics/endowment/index.tsx)
│   │   │   │   │   ├── [reducer.ts](./lingo/src/games/economics/endowment/reducer.ts)
│   │   │   │   │   └── [types.ts](./lingo/src/games/economics/endowment/types.ts)
│   │   │   │   ├── evolution/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [game.test.ts](./lingo/src/games/economics/evolution/__tests__/game.test.ts)
│   │   │   │   │   │   ├── [index.test.tsx](./lingo/src/games/economics/evolution/__tests__/index.test.tsx)
│   │   │   │   │   │   └── [reducer.test.ts](./lingo/src/games/economics/evolution/__tests__/reducer.test.ts)
│   │   │   │   │   ├── [components.tsx](./lingo/src/games/economics/evolution/components.tsx)
│   │   │   │   │   ├── [constants.ts](./lingo/src/games/economics/evolution/constants.ts)
│   │   │   │   │   ├── [game.ts](./lingo/src/games/economics/evolution/game.ts)
│   │   │   │   │   ├── [index.tsx](./lingo/src/games/economics/evolution/index.tsx)
│   │   │   │   │   ├── [reducer.ts](./lingo/src/games/economics/evolution/reducer.ts)
│   │   │   │   │   └── [types.ts](./lingo/src/games/economics/evolution/types.ts)
│   │   │   │   ├── externalities/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [game.test.ts](./lingo/src/games/economics/externalities/__tests__/game.test.ts)
│   │   │   │   │   │   ├── [index.test.tsx](./lingo/src/games/economics/externalities/__tests__/index.test.tsx)
│   │   │   │   │   │   └── [reducer.test.ts](./lingo/src/games/economics/externalities/__tests__/reducer.test.ts)
│   │   │   │   │   ├── [components.tsx](./lingo/src/games/economics/externalities/components.tsx)
│   │   │   │   │   ├── [constants.ts](./lingo/src/games/economics/externalities/constants.ts)
│   │   │   │   │   ├── [game.ts](./lingo/src/games/economics/externalities/game.ts)
│   │   │   │   │   ├── [index.tsx](./lingo/src/games/economics/externalities/index.tsx)
│   │   │   │   │   ├── [reducer.ts](./lingo/src/games/economics/externalities/reducer.ts)
│   │   │   │   │   └── [types.ts](./lingo/src/games/economics/externalities/types.ts)
│   │   │   │   ├── fiscal/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [game.test.ts](./lingo/src/games/economics/fiscal/__tests__/game.test.ts)
│   │   │   │   │   │   ├── [index.test.tsx](./lingo/src/games/economics/fiscal/__tests__/index.test.tsx)
│   │   │   │   │   │   └── [reducer.test.ts](./lingo/src/games/economics/fiscal/__tests__/reducer.test.ts)
│   │   │   │   │   ├── [components.tsx](./lingo/src/games/economics/fiscal/components.tsx)
│   │   │   │   │   ├── [constants.ts](./lingo/src/games/economics/fiscal/constants.ts)
│   │   │   │   │   ├── [game.ts](./lingo/src/games/economics/fiscal/game.ts)
│   │   │   │   │   ├── [index.tsx](./lingo/src/games/economics/fiscal/index.tsx)
│   │   │   │   │   ├── [reducer.ts](./lingo/src/games/economics/fiscal/reducer.ts)
│   │   │   │   │   └── [types.ts](./lingo/src/games/economics/fiscal/types.ts)
│   │   │   │   ├── framing/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [game.test.ts](./lingo/src/games/economics/framing/__tests__/game.test.ts)
│   │   │   │   │   │   ├── [index.test.tsx](./lingo/src/games/economics/framing/__tests__/index.test.tsx)
│   │   │   │   │   │   └── [reducer.test.ts](./lingo/src/games/economics/framing/__tests__/reducer.test.ts)
│   │   │   │   │   ├── [constants.ts](./lingo/src/games/economics/framing/constants.ts)
│   │   │   │   │   ├── [game.ts](./lingo/src/games/economics/framing/game.ts)
│   │   │   │   │   ├── [index.tsx](./lingo/src/games/economics/framing/index.tsx)
│   │   │   │   │   ├── [reducer.ts](./lingo/src/games/economics/framing/reducer.ts)
│   │   │   │   │   └── [types.ts](./lingo/src/games/economics/framing/types.ts)
│   │   │   │   ├── gdp/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [game.test.ts](./lingo/src/games/economics/gdp/__tests__/game.test.ts)
│   │   │   │   │   │   ├── [index.test.tsx](./lingo/src/games/economics/gdp/__tests__/index.test.tsx)
│   │   │   │   │   │   └── [reducer.test.ts](./lingo/src/games/economics/gdp/__tests__/reducer.test.ts)
│   │   │   │   │   ├── [components.tsx](./lingo/src/games/economics/gdp/components.tsx)
│   │   │   │   │   ├── [constants.ts](./lingo/src/games/economics/gdp/constants.ts)
│   │   │   │   │   ├── [game.ts](./lingo/src/games/economics/gdp/game.ts)
│   │   │   │   │   ├── [index.tsx](./lingo/src/games/economics/gdp/index.tsx)
│   │   │   │   │   ├── [reducer.ts](./lingo/src/games/economics/gdp/reducer.ts)
│   │   │   │   │   └── [types.ts](./lingo/src/games/economics/gdp/types.ts)
│   │   │   │   ├── heuristics/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [game.test.ts](./lingo/src/games/economics/heuristics/__tests__/game.test.ts)
│   │   │   │   │   │   ├── [index.test.tsx](./lingo/src/games/economics/heuristics/__tests__/index.test.tsx)
│   │   │   │   │   │   └── [reducer.test.ts](./lingo/src/games/economics/heuristics/__tests__/reducer.test.ts)
│   │   │   │   │   ├── [components.tsx](./lingo/src/games/economics/heuristics/components.tsx)
│   │   │   │   │   ├── [constants.ts](./lingo/src/games/economics/heuristics/constants.ts)
│   │   │   │   │   ├── [game.ts](./lingo/src/games/economics/heuristics/game.ts)
│   │   │   │   │   ├── [index.tsx](./lingo/src/games/economics/heuristics/index.tsx)
│   │   │   │   │   ├── [reducer.ts](./lingo/src/games/economics/heuristics/reducer.ts)
│   │   │   │   │   └── [types.ts](./lingo/src/games/economics/heuristics/types.ts)
│   │   │   │   ├── human-capital/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [game.test.ts](./lingo/src/games/economics/human-capital/__tests__/game.test.ts)
│   │   │   │   │   │   ├── [index.test.tsx](./lingo/src/games/economics/human-capital/__tests__/index.test.tsx)
│   │   │   │   │   │   └── [reducer.test.ts](./lingo/src/games/economics/human-capital/__tests__/reducer.test.ts)
│   │   │   │   │   ├── [components.tsx](./lingo/src/games/economics/human-capital/components.tsx)
│   │   │   │   │   ├── [constants.ts](./lingo/src/games/economics/human-capital/constants.ts)
│   │   │   │   │   ├── [game.ts](./lingo/src/games/economics/human-capital/game.ts)
│   │   │   │   │   ├── [index.tsx](./lingo/src/games/economics/human-capital/index.tsx)
│   │   │   │   │   ├── [panels.tsx](./lingo/src/games/economics/human-capital/panels.tsx)
│   │   │   │   │   ├── [reducer.ts](./lingo/src/games/economics/human-capital/reducer.ts)
│   │   │   │   │   └── [types.ts](./lingo/src/games/economics/human-capital/types.ts)
│   │   │   │   ├── inequality/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [game.test.ts](./lingo/src/games/economics/inequality/__tests__/game.test.ts)
│   │   │   │   │   │   ├── [index.test.tsx](./lingo/src/games/economics/inequality/__tests__/index.test.tsx)
│   │   │   │   │   │   └── [reducer.test.ts](./lingo/src/games/economics/inequality/__tests__/reducer.test.ts)
│   │   │   │   │   ├── [components.tsx](./lingo/src/games/economics/inequality/components.tsx)
│   │   │   │   │   ├── [constants.ts](./lingo/src/games/economics/inequality/constants.ts)
│   │   │   │   │   ├── [game.ts](./lingo/src/games/economics/inequality/game.ts)
│   │   │   │   │   ├── [index.tsx](./lingo/src/games/economics/inequality/index.tsx)
│   │   │   │   │   ├── [reducer.ts](./lingo/src/games/economics/inequality/reducer.ts)
│   │   │   │   │   └── [types.ts](./lingo/src/games/economics/inequality/types.ts)
│   │   │   │   ├── institutions/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [game.test.ts](./lingo/src/games/economics/institutions/__tests__/game.test.ts)
│   │   │   │   │   │   ├── [index.test.tsx](./lingo/src/games/economics/institutions/__tests__/index.test.tsx)
│   │   │   │   │   │   └── [reducer.test.ts](./lingo/src/games/economics/institutions/__tests__/reducer.test.ts)
│   │   │   │   │   ├── [components.tsx](./lingo/src/games/economics/institutions/components.tsx)
│   │   │   │   │   ├── [constants.ts](./lingo/src/games/economics/institutions/constants.ts)
│   │   │   │   │   ├── [game.ts](./lingo/src/games/economics/institutions/game.ts)
│   │   │   │   │   ├── [index.tsx](./lingo/src/games/economics/institutions/index.tsx)
│   │   │   │   │   ├── [reducer.ts](./lingo/src/games/economics/institutions/reducer.ts)
│   │   │   │   │   └── [types.ts](./lingo/src/games/economics/institutions/types.ts)
│   │   │   │   ├── is-lm/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [game.test.ts](./lingo/src/games/economics/is-lm/__tests__/game.test.ts)
│   │   │   │   │   │   ├── [index.test.tsx](./lingo/src/games/economics/is-lm/__tests__/index.test.tsx)
│   │   │   │   │   │   └── [reducer.test.ts](./lingo/src/games/economics/is-lm/__tests__/reducer.test.ts)
│   │   │   │   │   ├── [components.tsx](./lingo/src/games/economics/is-lm/components.tsx)
│   │   │   │   │   ├── [constants.ts](./lingo/src/games/economics/is-lm/constants.ts)
│   │   │   │   │   ├── [game.ts](./lingo/src/games/economics/is-lm/game.ts)
│   │   │   │   │   ├── [index.tsx](./lingo/src/games/economics/is-lm/index.tsx)
│   │   │   │   │   ├── [plot.tsx](./lingo/src/games/economics/is-lm/plot.tsx)
│   │   │   │   │   ├── [reducer.ts](./lingo/src/games/economics/is-lm/reducer.ts)
│   │   │   │   │   └── [types.ts](./lingo/src/games/economics/is-lm/types.ts)
│   │   │   │   ├── keynesian/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [game.test.ts](./lingo/src/games/economics/keynesian/__tests__/game.test.ts)
│   │   │   │   │   │   ├── [index.test.tsx](./lingo/src/games/economics/keynesian/__tests__/index.test.tsx)
│   │   │   │   │   │   └── [reducer.test.ts](./lingo/src/games/economics/keynesian/__tests__/reducer.test.ts)
│   │   │   │   │   ├── [components.tsx](./lingo/src/games/economics/keynesian/components.tsx)
│   │   │   │   │   ├── [constants.ts](./lingo/src/games/economics/keynesian/constants.ts)
│   │   │   │   │   ├── [game.ts](./lingo/src/games/economics/keynesian/game.ts)
│   │   │   │   │   ├── [index.tsx](./lingo/src/games/economics/keynesian/index.tsx)
│   │   │   │   │   ├── [panels.tsx](./lingo/src/games/economics/keynesian/panels.tsx)
│   │   │   │   │   ├── [primitives.tsx](./lingo/src/games/economics/keynesian/primitives.tsx)
│   │   │   │   │   ├── [reducer.ts](./lingo/src/games/economics/keynesian/reducer.ts)
│   │   │   │   │   ├── [results.tsx](./lingo/src/games/economics/keynesian/results.tsx)
│   │   │   │   │   ├── [screens.tsx](./lingo/src/games/economics/keynesian/screens.tsx)
│   │   │   │   │   └── [types.ts](./lingo/src/games/economics/keynesian/types.ts)
│   │   │   │   ├── labor/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [game.test.ts](./lingo/src/games/economics/labor/__tests__/game.test.ts)
│   │   │   │   │   │   ├── [index.test.tsx](./lingo/src/games/economics/labor/__tests__/index.test.tsx)
│   │   │   │   │   │   └── [reducer.test.ts](./lingo/src/games/economics/labor/__tests__/reducer.test.ts)
│   │   │   │   │   ├── [components.tsx](./lingo/src/games/economics/labor/components.tsx)
│   │   │   │   │   ├── [constants.ts](./lingo/src/games/economics/labor/constants.ts)
│   │   │   │   │   ├── [game.ts](./lingo/src/games/economics/labor/game.ts)
│   │   │   │   │   ├── [index.tsx](./lingo/src/games/economics/labor/index.tsx)
│   │   │   │   │   ├── [panels.tsx](./lingo/src/games/economics/labor/panels.tsx)
│   │   │   │   │   ├── [reducer.ts](./lingo/src/games/economics/labor/reducer.ts)
│   │   │   │   │   └── [types.ts](./lingo/src/games/economics/labor/types.ts)
│   │   │   │   ├── lemons/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [game.test.ts](./lingo/src/games/economics/lemons/__tests__/game.test.ts)
│   │   │   │   │   │   ├── [index.test.tsx](./lingo/src/games/economics/lemons/__tests__/index.test.tsx)
│   │   │   │   │   │   └── [reducer.test.ts](./lingo/src/games/economics/lemons/__tests__/reducer.test.ts)
│   │   │   │   │   ├── [components.tsx](./lingo/src/games/economics/lemons/components.tsx)
│   │   │   │   │   ├── [constants.ts](./lingo/src/games/economics/lemons/constants.ts)
│   │   │   │   │   ├── [game.ts](./lingo/src/games/economics/lemons/game.ts)
│   │   │   │   │   ├── [index.tsx](./lingo/src/games/economics/lemons/index.tsx)
│   │   │   │   │   ├── [reducer.ts](./lingo/src/games/economics/lemons/reducer.ts)
│   │   │   │   │   └── [types.ts](./lingo/src/games/economics/lemons/types.ts)
│   │   │   │   ├── marginal-utility/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [game.test.ts](./lingo/src/games/economics/marginal-utility/__tests__/game.test.ts)
│   │   │   │   │   │   ├── [index.test.tsx](./lingo/src/games/economics/marginal-utility/__tests__/index.test.tsx)
│   │   │   │   │   │   └── [reducer.test.ts](./lingo/src/games/economics/marginal-utility/__tests__/reducer.test.ts)
│   │   │   │   │   ├── [challenge.tsx](./lingo/src/games/economics/marginal-utility/challenge.tsx)
│   │   │   │   │   ├── [components.tsx](./lingo/src/games/economics/marginal-utility/components.tsx)
│   │   │   │   │   ├── [constants.ts](./lingo/src/games/economics/marginal-utility/constants.ts)
│   │   │   │   │   ├── [game.ts](./lingo/src/games/economics/marginal-utility/game.ts)
│   │   │   │   │   ├── [index.tsx](./lingo/src/games/economics/marginal-utility/index.tsx)
│   │   │   │   │   ├── [lab.tsx](./lingo/src/games/economics/marginal-utility/lab.tsx)
│   │   │   │   │   ├── [reducer.ts](./lingo/src/games/economics/marginal-utility/reducer.ts)
│   │   │   │   │   └── [types.ts](./lingo/src/games/economics/marginal-utility/types.ts)
│   │   │   │   ├── market-failures/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [game.test.ts](./lingo/src/games/economics/market-failures/__tests__/game.test.ts)
│   │   │   │   │   │   ├── [index.test.tsx](./lingo/src/games/economics/market-failures/__tests__/index.test.tsx)
│   │   │   │   │   │   └── [reducer.test.ts](./lingo/src/games/economics/market-failures/__tests__/reducer.test.ts)
│   │   │   │   │   ├── [components.tsx](./lingo/src/games/economics/market-failures/components.tsx)
│   │   │   │   │   ├── [constants.ts](./lingo/src/games/economics/market-failures/constants.ts)
│   │   │   │   │   ├── [game.ts](./lingo/src/games/economics/market-failures/game.ts)
│   │   │   │   │   ├── [index.tsx](./lingo/src/games/economics/market-failures/index.tsx)
│   │   │   │   │   ├── [reducer.ts](./lingo/src/games/economics/market-failures/reducer.ts)
│   │   │   │   │   └── [types.ts](./lingo/src/games/economics/market-failures/types.ts)
│   │   │   │   ├── mechanism/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [game.test.ts](./lingo/src/games/economics/mechanism/__tests__/game.test.ts)
│   │   │   │   │   │   ├── [index.test.tsx](./lingo/src/games/economics/mechanism/__tests__/index.test.tsx)
│   │   │   │   │   │   └── [reducer.test.ts](./lingo/src/games/economics/mechanism/__tests__/reducer.test.ts)
│   │   │   │   │   ├── [components.tsx](./lingo/src/games/economics/mechanism/components.tsx)
│   │   │   │   │   ├── [constants.ts](./lingo/src/games/economics/mechanism/constants.ts)
│   │   │   │   │   ├── [game.ts](./lingo/src/games/economics/mechanism/game.ts)
│   │   │   │   │   ├── [index.tsx](./lingo/src/games/economics/mechanism/index.tsx)
│   │   │   │   │   ├── [reducer.ts](./lingo/src/games/economics/mechanism/reducer.ts)
│   │   │   │   │   └── [types.ts](./lingo/src/games/economics/mechanism/types.ts)
│   │   │   │   ├── mental-accounting/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [game.test.ts](./lingo/src/games/economics/mental-accounting/__tests__/game.test.ts)
│   │   │   │   │   │   ├── [index.test.tsx](./lingo/src/games/economics/mental-accounting/__tests__/index.test.tsx)
│   │   │   │   │   │   └── [reducer.test.ts](./lingo/src/games/economics/mental-accounting/__tests__/reducer.test.ts)
│   │   │   │   │   ├── [components.tsx](./lingo/src/games/economics/mental-accounting/components.tsx)
│   │   │   │   │   ├── [constants.ts](./lingo/src/games/economics/mental-accounting/constants.ts)
│   │   │   │   │   ├── [framer.tsx](./lingo/src/games/economics/mental-accounting/framer.tsx)
│   │   │   │   │   ├── [game.ts](./lingo/src/games/economics/mental-accounting/game.ts)
│   │   │   │   │   ├── [index.tsx](./lingo/src/games/economics/mental-accounting/index.tsx)
│   │   │   │   │   ├── [reducer.ts](./lingo/src/games/economics/mental-accounting/reducer.ts)
│   │   │   │   │   └── [types.ts](./lingo/src/games/economics/mental-accounting/types.ts)
│   │   │   │   ├── migration/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [game.test.ts](./lingo/src/games/economics/migration/__tests__/game.test.ts)
│   │   │   │   │   │   ├── [index.test.tsx](./lingo/src/games/economics/migration/__tests__/index.test.tsx)
│   │   │   │   │   │   └── [reducer.test.ts](./lingo/src/games/economics/migration/__tests__/reducer.test.ts)
│   │   │   │   │   ├── [components.tsx](./lingo/src/games/economics/migration/components.tsx)
│   │   │   │   │   ├── [constants.ts](./lingo/src/games/economics/migration/constants.ts)
│   │   │   │   │   ├── [game.ts](./lingo/src/games/economics/migration/game.ts)
│   │   │   │   │   ├── [index.tsx](./lingo/src/games/economics/migration/index.tsx)
│   │   │   │   │   ├── [panels.tsx](./lingo/src/games/economics/migration/panels.tsx)
│   │   │   │   │   ├── [reducer.ts](./lingo/src/games/economics/migration/reducer.ts)
│   │   │   │   │   └── [types.ts](./lingo/src/games/economics/migration/types.ts)
│   │   │   │   ├── monetary-policy/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [game.test.ts](./lingo/src/games/economics/monetary-policy/__tests__/game.test.ts)
│   │   │   │   │   │   ├── [index.test.tsx](./lingo/src/games/economics/monetary-policy/__tests__/index.test.tsx)
│   │   │   │   │   │   └── [reducer.test.ts](./lingo/src/games/economics/monetary-policy/__tests__/reducer.test.ts)
│   │   │   │   │   ├── [components.tsx](./lingo/src/games/economics/monetary-policy/components.tsx)
│   │   │   │   │   ├── [constants.ts](./lingo/src/games/economics/monetary-policy/constants.ts)
│   │   │   │   │   ├── [game.ts](./lingo/src/games/economics/monetary-policy/game.ts)
│   │   │   │   │   ├── [index.tsx](./lingo/src/games/economics/monetary-policy/index.tsx)
│   │   │   │   │   ├── [reducer.ts](./lingo/src/games/economics/monetary-policy/reducer.ts)
│   │   │   │   │   └── [types.ts](./lingo/src/games/economics/monetary-policy/types.ts)
│   │   │   │   ├── monopolistic/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [game.test.ts](./lingo/src/games/economics/monopolistic/__tests__/game.test.ts)
│   │   │   │   │   │   ├── [index.test.tsx](./lingo/src/games/economics/monopolistic/__tests__/index.test.tsx)
│   │   │   │   │   │   └── [reducer.test.ts](./lingo/src/games/economics/monopolistic/__tests__/reducer.test.ts)
│   │   │   │   │   ├── [chart.tsx](./lingo/src/games/economics/monopolistic/chart.tsx)
│   │   │   │   │   ├── [components.tsx](./lingo/src/games/economics/monopolistic/components.tsx)
│   │   │   │   │   ├── [constants.ts](./lingo/src/games/economics/monopolistic/constants.ts)
│   │   │   │   │   ├── [game.ts](./lingo/src/games/economics/monopolistic/game.ts)
│   │   │   │   │   ├── [index.tsx](./lingo/src/games/economics/monopolistic/index.tsx)
│   │   │   │   │   ├── [lab.tsx](./lingo/src/games/economics/monopolistic/lab.tsx)
│   │   │   │   │   ├── [panels.tsx](./lingo/src/games/economics/monopolistic/panels.tsx)
│   │   │   │   │   ├── [reducer.ts](./lingo/src/games/economics/monopolistic/reducer.ts)
│   │   │   │   │   └── [types.ts](./lingo/src/games/economics/monopolistic/types.ts)
│   │   │   │   ├── monopoly/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [game.test.ts](./lingo/src/games/economics/monopoly/__tests__/game.test.ts)
│   │   │   │   │   │   ├── [index.test.tsx](./lingo/src/games/economics/monopoly/__tests__/index.test.tsx)
│   │   │   │   │   │   └── [reducer.test.ts](./lingo/src/games/economics/monopoly/__tests__/reducer.test.ts)
│   │   │   │   │   ├── [components.tsx](./lingo/src/games/economics/monopoly/components.tsx)
│   │   │   │   │   ├── [constants.ts](./lingo/src/games/economics/monopoly/constants.ts)
│   │   │   │   │   ├── [game.ts](./lingo/src/games/economics/monopoly/game.ts)
│   │   │   │   │   ├── [index.tsx](./lingo/src/games/economics/monopoly/index.tsx)
│   │   │   │   │   ├── [reducer.ts](./lingo/src/games/economics/monopoly/reducer.ts)
│   │   │   │   │   └── [types.ts](./lingo/src/games/economics/monopoly/types.ts)
│   │   │   │   ├── moral-hazard/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [game.test.ts](./lingo/src/games/economics/moral-hazard/__tests__/game.test.ts)
│   │   │   │   │   │   ├── [index.test.tsx](./lingo/src/games/economics/moral-hazard/__tests__/index.test.tsx)
│   │   │   │   │   │   └── [reducer.test.ts](./lingo/src/games/economics/moral-hazard/__tests__/reducer.test.ts)
│   │   │   │   │   ├── [components.tsx](./lingo/src/games/economics/moral-hazard/components.tsx)
│   │   │   │   │   ├── [constants.ts](./lingo/src/games/economics/moral-hazard/constants.ts)
│   │   │   │   │   ├── [game.ts](./lingo/src/games/economics/moral-hazard/game.ts)
│   │   │   │   │   ├── [index.tsx](./lingo/src/games/economics/moral-hazard/index.tsx)
│   │   │   │   │   ├── [reducer.ts](./lingo/src/games/economics/moral-hazard/reducer.ts)
│   │   │   │   │   └── [types.ts](./lingo/src/games/economics/moral-hazard/types.ts)
│   │   │   │   ├── nash/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [game.test.ts](./lingo/src/games/economics/nash/__tests__/game.test.ts)
│   │   │   │   │   │   ├── [index.test.tsx](./lingo/src/games/economics/nash/__tests__/index.test.tsx)
│   │   │   │   │   │   └── [reducer.test.ts](./lingo/src/games/economics/nash/__tests__/reducer.test.ts)
│   │   │   │   │   ├── [components.tsx](./lingo/src/games/economics/nash/components.tsx)
│   │   │   │   │   ├── [constants.ts](./lingo/src/games/economics/nash/constants.ts)
│   │   │   │   │   ├── [game.ts](./lingo/src/games/economics/nash/game.ts)
│   │   │   │   │   ├── [index.tsx](./lingo/src/games/economics/nash/index.tsx)
│   │   │   │   │   ├── [reducer.ts](./lingo/src/games/economics/nash/reducer.ts)
│   │   │   │   │   └── [types.ts](./lingo/src/games/economics/nash/types.ts)
│   │   │   │   ├── nudge/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [game.test.ts](./lingo/src/games/economics/nudge/__tests__/game.test.ts)
│   │   │   │   │   │   ├── [index.test.tsx](./lingo/src/games/economics/nudge/__tests__/index.test.tsx)
│   │   │   │   │   │   └── [reducer.test.ts](./lingo/src/games/economics/nudge/__tests__/reducer.test.ts)
│   │   │   │   │   ├── [components-report.tsx](./lingo/src/games/economics/nudge/components-report.tsx)
│   │   │   │   │   ├── [components-simulator.tsx](./lingo/src/games/economics/nudge/components-simulator.tsx)
│   │   │   │   │   ├── [components.tsx](./lingo/src/games/economics/nudge/components.tsx)
│   │   │   │   │   ├── [constants.ts](./lingo/src/games/economics/nudge/constants.ts)
│   │   │   │   │   ├── [game.ts](./lingo/src/games/economics/nudge/game.ts)
│   │   │   │   │   ├── [index.tsx](./lingo/src/games/economics/nudge/index.tsx)
│   │   │   │   │   ├── [reducer.ts](./lingo/src/games/economics/nudge/reducer.ts)
│   │   │   │   │   └── [types.ts](./lingo/src/games/economics/nudge/types.ts)
│   │   │   │   ├── okuns/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [game.test.ts](./lingo/src/games/economics/okuns/__tests__/game.test.ts)
│   │   │   │   │   │   ├── [index.test.tsx](./lingo/src/games/economics/okuns/__tests__/index.test.tsx)
│   │   │   │   │   │   └── [reducer.test.ts](./lingo/src/games/economics/okuns/__tests__/reducer.test.ts)
│   │   │   │   │   ├── components/
│   │   │   │   │   │   ├── [estimate.tsx](./lingo/src/games/economics/okuns/components/estimate.tsx)
│   │   │   │   │   │   ├── [intro.tsx](./lingo/src/games/economics/okuns/components/intro.tsx)
│   │   │   │   │   │   ├── [result.tsx](./lingo/src/games/economics/okuns/components/result.tsx)
│   │   │   │   │   │   └── [steer.tsx](./lingo/src/games/economics/okuns/components/steer.tsx)
│   │   │   │   │   ├── [components.tsx](./lingo/src/games/economics/okuns/components.tsx)
│   │   │   │   │   ├── [constants.ts](./lingo/src/games/economics/okuns/constants.ts)
│   │   │   │   │   ├── [game.ts](./lingo/src/games/economics/okuns/game.ts)
│   │   │   │   │   ├── [index.tsx](./lingo/src/games/economics/okuns/index.tsx)
│   │   │   │   │   ├── [reducer.ts](./lingo/src/games/economics/okuns/reducer.ts)
│   │   │   │   │   └── [types.ts](./lingo/src/games/economics/okuns/types.ts)
│   │   │   │   ├── oligopoly/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [game.test.ts](./lingo/src/games/economics/oligopoly/__tests__/game.test.ts)
│   │   │   │   │   │   ├── [index.test.tsx](./lingo/src/games/economics/oligopoly/__tests__/index.test.tsx)
│   │   │   │   │   │   └── [reducer.test.ts](./lingo/src/games/economics/oligopoly/__tests__/reducer.test.ts)
│   │   │   │   │   ├── [constants.ts](./lingo/src/games/economics/oligopoly/constants.ts)
│   │   │   │   │   ├── [game.ts](./lingo/src/games/economics/oligopoly/game.ts)
│   │   │   │   │   ├── [index.tsx](./lingo/src/games/economics/oligopoly/index.tsx)
│   │   │   │   │   ├── [reducer.ts](./lingo/src/games/economics/oligopoly/reducer.ts)
│   │   │   │   │   └── [types.ts](./lingo/src/games/economics/oligopoly/types.ts)
│   │   │   │   ├── opportunity-cost/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [game.test.ts](./lingo/src/games/economics/opportunity-cost/__tests__/game.test.ts)
│   │   │   │   │   │   ├── [index.test.tsx](./lingo/src/games/economics/opportunity-cost/__tests__/index.test.tsx)
│   │   │   │   │   │   └── [reducer.test.ts](./lingo/src/games/economics/opportunity-cost/__tests__/reducer.test.ts)
│   │   │   │   │   ├── components/
│   │   │   │   │   │   ├── [challenge.tsx](./lingo/src/games/economics/opportunity-cost/components/challenge.tsx)
│   │   │   │   │   │   ├── [format.ts](./lingo/src/games/economics/opportunity-cost/components/format.ts)
│   │   │   │   │   │   ├── [results.tsx](./lingo/src/games/economics/opportunity-cost/components/results.tsx)
│   │   │   │   │   │   └── [sandbox.tsx](./lingo/src/games/economics/opportunity-cost/components/sandbox.tsx)
│   │   │   │   │   ├── [components.tsx](./lingo/src/games/economics/opportunity-cost/components.tsx)
│   │   │   │   │   ├── [constants.ts](./lingo/src/games/economics/opportunity-cost/constants.ts)
│   │   │   │   │   ├── [game.ts](./lingo/src/games/economics/opportunity-cost/game.ts)
│   │   │   │   │   ├── [index.tsx](./lingo/src/games/economics/opportunity-cost/index.tsx)
│   │   │   │   │   ├── [reducer.ts](./lingo/src/games/economics/opportunity-cost/reducer.ts)
│   │   │   │   │   └── [types.ts](./lingo/src/games/economics/opportunity-cost/types.ts)
│   │   │   │   ├── order-book/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [game.test.ts](./lingo/src/games/economics/order-book/__tests__/game.test.ts)
│   │   │   │   │   │   ├── [index.test.tsx](./lingo/src/games/economics/order-book/__tests__/index.test.tsx)
│   │   │   │   │   │   └── [reducer.test.ts](./lingo/src/games/economics/order-book/__tests__/reducer.test.ts)
│   │   │   │   │   ├── [constants.ts](./lingo/src/games/economics/order-book/constants.ts)
│   │   │   │   │   ├── [game.ts](./lingo/src/games/economics/order-book/game.ts)
│   │   │   │   │   ├── [index.tsx](./lingo/src/games/economics/order-book/index.tsx)
│   │   │   │   │   ├── [reducer.ts](./lingo/src/games/economics/order-book/reducer.ts)
│   │   │   │   │   └── [types.ts](./lingo/src/games/economics/order-book/types.ts)
│   │   │   │   ├── overconfidence/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [game.test.ts](./lingo/src/games/economics/overconfidence/__tests__/game.test.ts)
│   │   │   │   │   │   ├── [index.test.tsx](./lingo/src/games/economics/overconfidence/__tests__/index.test.tsx)
│   │   │   │   │   │   └── [reducer.test.ts](./lingo/src/games/economics/overconfidence/__tests__/reducer.test.ts)
│   │   │   │   │   ├── [brackets.tsx](./lingo/src/games/economics/overconfidence/brackets.tsx)
│   │   │   │   │   ├── [calibration.tsx](./lingo/src/games/economics/overconfidence/calibration.tsx)
│   │   │   │   │   ├── [components.tsx](./lingo/src/games/economics/overconfidence/components.tsx)
│   │   │   │   │   ├── [constants.ts](./lingo/src/games/economics/overconfidence/constants.ts)
│   │   │   │   │   ├── [game.ts](./lingo/src/games/economics/overconfidence/game.ts)
│   │   │   │   │   ├── [index.tsx](./lingo/src/games/economics/overconfidence/index.tsx)
│   │   │   │   │   ├── [market.tsx](./lingo/src/games/economics/overconfidence/market.tsx)
│   │   │   │   │   ├── [question.tsx](./lingo/src/games/economics/overconfidence/question.tsx)
│   │   │   │   │   ├── [reducer.ts](./lingo/src/games/economics/overconfidence/reducer.ts)
│   │   │   │   │   └── [types.ts](./lingo/src/games/economics/overconfidence/types.ts)
│   │   │   │   ├── perfect-competition/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [game.test.ts](./lingo/src/games/economics/perfect-competition/__tests__/game.test.ts)
│   │   │   │   │   │   ├── [index.test.tsx](./lingo/src/games/economics/perfect-competition/__tests__/index.test.tsx)
│   │   │   │   │   │   └── [reducer.test.ts](./lingo/src/games/economics/perfect-competition/__tests__/reducer.test.ts)
│   │   │   │   │   ├── [components.tsx](./lingo/src/games/economics/perfect-competition/components.tsx)
│   │   │   │   │   ├── [constants.ts](./lingo/src/games/economics/perfect-competition/constants.ts)
│   │   │   │   │   ├── [game.ts](./lingo/src/games/economics/perfect-competition/game.ts)
│   │   │   │   │   ├── [index.tsx](./lingo/src/games/economics/perfect-competition/index.tsx)
│   │   │   │   │   ├── [reducer.ts](./lingo/src/games/economics/perfect-competition/reducer.ts)
│   │   │   │   │   └── [types.ts](./lingo/src/games/economics/perfect-competition/types.ts)
│   │   │   │   ├── phillips/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [game.test.ts](./lingo/src/games/economics/phillips/__tests__/game.test.ts)
│   │   │   │   │   │   ├── [index.test.tsx](./lingo/src/games/economics/phillips/__tests__/index.test.tsx)
│   │   │   │   │   │   └── [reducer.test.ts](./lingo/src/games/economics/phillips/__tests__/reducer.test.ts)
│   │   │   │   │   ├── [components.tsx](./lingo/src/games/economics/phillips/components.tsx)
│   │   │   │   │   ├── [constants.ts](./lingo/src/games/economics/phillips/constants.ts)
│   │   │   │   │   ├── [game.ts](./lingo/src/games/economics/phillips/game.ts)
│   │   │   │   │   ├── [index.tsx](./lingo/src/games/economics/phillips/index.tsx)
│   │   │   │   │   ├── [reducer.ts](./lingo/src/games/economics/phillips/reducer.ts)
│   │   │   │   │   └── [types.ts](./lingo/src/games/economics/phillips/types.ts)
│   │   │   │   ├── portfolio/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [game.test.ts](./lingo/src/games/economics/portfolio/__tests__/game.test.ts)
│   │   │   │   │   │   ├── [index.test.tsx](./lingo/src/games/economics/portfolio/__tests__/index.test.tsx)
│   │   │   │   │   │   └── [reducer.test.ts](./lingo/src/games/economics/portfolio/__tests__/reducer.test.ts)
│   │   │   │   │   ├── [challenge.tsx](./lingo/src/games/economics/portfolio/challenge.tsx)
│   │   │   │   │   ├── [components.tsx](./lingo/src/games/economics/portfolio/components.tsx)
│   │   │   │   │   ├── [constants.ts](./lingo/src/games/economics/portfolio/constants.ts)
│   │   │   │   │   ├── [frontier.tsx](./lingo/src/games/economics/portfolio/frontier.tsx)
│   │   │   │   │   ├── [game.ts](./lingo/src/games/economics/portfolio/game.ts)
│   │   │   │   │   ├── [index.tsx](./lingo/src/games/economics/portfolio/index.tsx)
│   │   │   │   │   ├── [reducer.ts](./lingo/src/games/economics/portfolio/reducer.ts)
│   │   │   │   │   └── [types.ts](./lingo/src/games/economics/portfolio/types.ts)
│   │   │   │   ├── poverty-trap/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [game.test.ts](./lingo/src/games/economics/poverty-trap/__tests__/game.test.ts)
│   │   │   │   │   │   ├── [index.test.tsx](./lingo/src/games/economics/poverty-trap/__tests__/index.test.tsx)
│   │   │   │   │   │   └── [reducer.test.ts](./lingo/src/games/economics/poverty-trap/__tests__/reducer.test.ts)
│   │   │   │   │   ├── [components.tsx](./lingo/src/games/economics/poverty-trap/components.tsx)
│   │   │   │   │   ├── [constants.ts](./lingo/src/games/economics/poverty-trap/constants.ts)
│   │   │   │   │   ├── [game.ts](./lingo/src/games/economics/poverty-trap/game.ts)
│   │   │   │   │   ├── [index.tsx](./lingo/src/games/economics/poverty-trap/index.tsx)
│   │   │   │   │   ├── [panel.tsx](./lingo/src/games/economics/poverty-trap/panel.tsx)
│   │   │   │   │   ├── [reducer.ts](./lingo/src/games/economics/poverty-trap/reducer.ts)
│   │   │   │   │   └── [types.ts](./lingo/src/games/economics/poverty-trap/types.ts)
│   │   │   │   ├── price-discrimination/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [game.test.ts](./lingo/src/games/economics/price-discrimination/__tests__/game.test.ts)
│   │   │   │   │   │   ├── [index.test.tsx](./lingo/src/games/economics/price-discrimination/__tests__/index.test.tsx)
│   │   │   │   │   │   └── [reducer.test.ts](./lingo/src/games/economics/price-discrimination/__tests__/reducer.test.ts)
│   │   │   │   │   ├── [components.tsx](./lingo/src/games/economics/price-discrimination/components.tsx)
│   │   │   │   │   ├── [constants.ts](./lingo/src/games/economics/price-discrimination/constants.ts)
│   │   │   │   │   ├── [game.ts](./lingo/src/games/economics/price-discrimination/game.ts)
│   │   │   │   │   ├── [index.tsx](./lingo/src/games/economics/price-discrimination/index.tsx)
│   │   │   │   │   ├── [panels.tsx](./lingo/src/games/economics/price-discrimination/panels.tsx)
│   │   │   │   │   ├── [reducer.ts](./lingo/src/games/economics/price-discrimination/reducer.ts)
│   │   │   │   │   └── [types.ts](./lingo/src/games/economics/price-discrimination/types.ts)
│   │   │   │   ├── price-lab/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [game.test.ts](./lingo/src/games/economics/price-lab/__tests__/game.test.ts)
│   │   │   │   │   │   └── [index.test.tsx](./lingo/src/games/economics/price-lab/__tests__/index.test.tsx)
│   │   │   │   │   ├── [components.tsx](./lingo/src/games/economics/price-lab/components.tsx)
│   │   │   │   │   ├── [constants.ts](./lingo/src/games/economics/price-lab/constants.ts)
│   │   │   │   │   ├── [game.ts](./lingo/src/games/economics/price-lab/game.ts)
│   │   │   │   │   ├── [index.tsx](./lingo/src/games/economics/price-lab/index.tsx)
│   │   │   │   │   └── [types.ts](./lingo/src/games/economics/price-lab/types.ts)
│   │   │   │   ├── prisoners-dilemma/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [game.test.ts](./lingo/src/games/economics/prisoners-dilemma/__tests__/game.test.ts)
│   │   │   │   │   │   ├── [index.test.tsx](./lingo/src/games/economics/prisoners-dilemma/__tests__/index.test.tsx)
│   │   │   │   │   │   └── [tournament.test.ts](./lingo/src/games/economics/prisoners-dilemma/__tests__/tournament.test.ts)
│   │   │   │   │   ├── [behaviours.ts](./lingo/src/games/economics/prisoners-dilemma/behaviours.ts)
│   │   │   │   │   ├── [constants.ts](./lingo/src/games/economics/prisoners-dilemma/constants.ts)
│   │   │   │   │   ├── [game.ts](./lingo/src/games/economics/prisoners-dilemma/game.ts)
│   │   │   │   │   ├── [index.tsx](./lingo/src/games/economics/prisoners-dilemma/index.tsx)
│   │   │   │   │   ├── [reducer.ts](./lingo/src/games/economics/prisoners-dilemma/reducer.ts)
│   │   │   │   │   ├── [tournament.ts](./lingo/src/games/economics/prisoners-dilemma/tournament.ts)
│   │   │   │   │   └── [types.ts](./lingo/src/games/economics/prisoners-dilemma/types.ts)
│   │   │   │   ├── production/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [game.test.ts](./lingo/src/games/economics/production/__tests__/game.test.ts)
│   │   │   │   │   │   ├── [index.test.tsx](./lingo/src/games/economics/production/__tests__/index.test.tsx)
│   │   │   │   │   │   └── [reducer.test.ts](./lingo/src/games/economics/production/__tests__/reducer.test.ts)
│   │   │   │   │   ├── [components.tsx](./lingo/src/games/economics/production/components.tsx)
│   │   │   │   │   ├── [constants.ts](./lingo/src/games/economics/production/constants.ts)
│   │   │   │   │   ├── [curves.tsx](./lingo/src/games/economics/production/curves.tsx)
│   │   │   │   │   ├── [game.ts](./lingo/src/games/economics/production/game.ts)
│   │   │   │   │   ├── [index.tsx](./lingo/src/games/economics/production/index.tsx)
│   │   │   │   │   ├── [metrics.tsx](./lingo/src/games/economics/production/metrics.tsx)
│   │   │   │   │   ├── [quiz.tsx](./lingo/src/games/economics/production/quiz.tsx)
│   │   │   │   │   ├── [reducer.ts](./lingo/src/games/economics/production/reducer.ts)
│   │   │   │   │   └── [types.ts](./lingo/src/games/economics/production/types.ts)
│   │   │   │   ├── public-choice/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [game.test.ts](./lingo/src/games/economics/public-choice/__tests__/game.test.ts)
│   │   │   │   │   │   ├── [index.test.tsx](./lingo/src/games/economics/public-choice/__tests__/index.test.tsx)
│   │   │   │   │   │   └── [reducer.test.ts](./lingo/src/games/economics/public-choice/__tests__/reducer.test.ts)
│   │   │   │   │   ├── [components.tsx](./lingo/src/games/economics/public-choice/components.tsx)
│   │   │   │   │   ├── [constants.ts](./lingo/src/games/economics/public-choice/constants.ts)
│   │   │   │   │   ├── [game.ts](./lingo/src/games/economics/public-choice/game.ts)
│   │   │   │   │   ├── [index.tsx](./lingo/src/games/economics/public-choice/index.tsx)
│   │   │   │   │   ├── [median.tsx](./lingo/src/games/economics/public-choice/median.tsx)
│   │   │   │   │   ├── [paradox.tsx](./lingo/src/games/economics/public-choice/paradox.tsx)
│   │   │   │   │   ├── [reducer.ts](./lingo/src/games/economics/public-choice/reducer.ts)
│   │   │   │   │   ├── [rent.tsx](./lingo/src/games/economics/public-choice/rent.tsx)
│   │   │   │   │   └── [types.ts](./lingo/src/games/economics/public-choice/types.ts)
│   │   │   │   ├── public-goods/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [game.test.ts](./lingo/src/games/economics/public-goods/__tests__/game.test.ts)
│   │   │   │   │   │   ├── [index.test.tsx](./lingo/src/games/economics/public-goods/__tests__/index.test.tsx)
│   │   │   │   │   │   └── [reducer.test.ts](./lingo/src/games/economics/public-goods/__tests__/reducer.test.ts)
│   │   │   │   │   ├── [constants.ts](./lingo/src/games/economics/public-goods/constants.ts)
│   │   │   │   │   ├── [game.ts](./lingo/src/games/economics/public-goods/game.ts)
│   │   │   │   │   ├── [index.tsx](./lingo/src/games/economics/public-goods/index.tsx)
│   │   │   │   │   ├── [reducer.ts](./lingo/src/games/economics/public-goods/reducer.ts)
│   │   │   │   │   └── [types.ts](./lingo/src/games/economics/public-goods/types.ts)
│   │   │   │   ├── rcts/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [game.test.ts](./lingo/src/games/economics/rcts/__tests__/game.test.ts)
│   │   │   │   │   │   ├── [index.test.tsx](./lingo/src/games/economics/rcts/__tests__/index.test.tsx)
│   │   │   │   │   │   └── [reducer.test.ts](./lingo/src/games/economics/rcts/__tests__/reducer.test.ts)
│   │   │   │   │   ├── [components.tsx](./lingo/src/games/economics/rcts/components.tsx)
│   │   │   │   │   ├── [constants.ts](./lingo/src/games/economics/rcts/constants.ts)
│   │   │   │   │   ├── [game.ts](./lingo/src/games/economics/rcts/game.ts)
│   │   │   │   │   ├── [index.tsx](./lingo/src/games/economics/rcts/index.tsx)
│   │   │   │   │   ├── [reducer.ts](./lingo/src/games/economics/rcts/reducer.ts)
│   │   │   │   │   └── [types.ts](./lingo/src/games/economics/rcts/types.ts)
│   │   │   │   ├── repeated/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [game.test.ts](./lingo/src/games/economics/repeated/__tests__/game.test.ts)
│   │   │   │   │   │   ├── [index.test.tsx](./lingo/src/games/economics/repeated/__tests__/index.test.tsx)
│   │   │   │   │   │   └── [reducer.test.ts](./lingo/src/games/economics/repeated/__tests__/reducer.test.ts)
│   │   │   │   │   ├── [constants.ts](./lingo/src/games/economics/repeated/constants.ts)
│   │   │   │   │   ├── [game.ts](./lingo/src/games/economics/repeated/game.ts)
│   │   │   │   │   ├── [index.tsx](./lingo/src/games/economics/repeated/index.tsx)
│   │   │   │   │   ├── [reducer.ts](./lingo/src/games/economics/repeated/reducer.ts)
│   │   │   │   │   └── [types.ts](./lingo/src/games/economics/repeated/types.ts)
│   │   │   │   ├── rps/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [game.test.ts](./lingo/src/games/economics/rps/__tests__/game.test.ts)
│   │   │   │   │   │   ├── [index.test.tsx](./lingo/src/games/economics/rps/__tests__/index.test.tsx)
│   │   │   │   │   │   └── [reducer.test.ts](./lingo/src/games/economics/rps/__tests__/reducer.test.ts)
│   │   │   │   │   ├── [constants.ts](./lingo/src/games/economics/rps/constants.ts)
│   │   │   │   │   ├── [game.ts](./lingo/src/games/economics/rps/game.ts)
│   │   │   │   │   ├── [index.tsx](./lingo/src/games/economics/rps/index.tsx)
│   │   │   │   │   ├── [reducer.ts](./lingo/src/games/economics/rps/reducer.ts)
│   │   │   │   │   └── [types.ts](./lingo/src/games/economics/rps/types.ts)
│   │   │   │   ├── sequential/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [game.test.ts](./lingo/src/games/economics/sequential/__tests__/game.test.ts)
│   │   │   │   │   │   ├── [index.test.tsx](./lingo/src/games/economics/sequential/__tests__/index.test.tsx)
│   │   │   │   │   │   └── [reducer.test.ts](./lingo/src/games/economics/sequential/__tests__/reducer.test.ts)
│   │   │   │   │   ├── [components.tsx](./lingo/src/games/economics/sequential/components.tsx)
│   │   │   │   │   ├── [constants.ts](./lingo/src/games/economics/sequential/constants.ts)
│   │   │   │   │   ├── [game.ts](./lingo/src/games/economics/sequential/game.ts)
│   │   │   │   │   ├── [index.tsx](./lingo/src/games/economics/sequential/index.tsx)
│   │   │   │   │   ├── [reducer.ts](./lingo/src/games/economics/sequential/reducer.ts)
│   │   │   │   │   └── [types.ts](./lingo/src/games/economics/sequential/types.ts)
│   │   │   │   ├── signaling/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [game.test.ts](./lingo/src/games/economics/signaling/__tests__/game.test.ts)
│   │   │   │   │   │   ├── [index.test.tsx](./lingo/src/games/economics/signaling/__tests__/index.test.tsx)
│   │   │   │   │   │   └── [reducer.test.ts](./lingo/src/games/economics/signaling/__tests__/reducer.test.ts)
│   │   │   │   │   ├── [constants.ts](./lingo/src/games/economics/signaling/constants.ts)
│   │   │   │   │   ├── [game.ts](./lingo/src/games/economics/signaling/game.ts)
│   │   │   │   │   ├── [index.tsx](./lingo/src/games/economics/signaling/index.tsx)
│   │   │   │   │   ├── [reducer.ts](./lingo/src/games/economics/signaling/reducer.ts)
│   │   │   │   │   └── [types.ts](./lingo/src/games/economics/signaling/types.ts)
│   │   │   │   ├── stag-hunt/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [game.test.ts](./lingo/src/games/economics/stag-hunt/__tests__/game.test.ts)
│   │   │   │   │   │   ├── [index.test.tsx](./lingo/src/games/economics/stag-hunt/__tests__/index.test.tsx)
│   │   │   │   │   │   └── [reducer.test.ts](./lingo/src/games/economics/stag-hunt/__tests__/reducer.test.ts)
│   │   │   │   │   ├── [constants.ts](./lingo/src/games/economics/stag-hunt/constants.ts)
│   │   │   │   │   ├── [game.ts](./lingo/src/games/economics/stag-hunt/game.ts)
│   │   │   │   │   ├── [index.tsx](./lingo/src/games/economics/stag-hunt/index.tsx)
│   │   │   │   │   ├── [reducer.ts](./lingo/src/games/economics/stag-hunt/reducer.ts)
│   │   │   │   │   └── [types.ts](./lingo/src/games/economics/stag-hunt/types.ts)
│   │   │   │   ├── time-value/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [game.test.ts](./lingo/src/games/economics/time-value/__tests__/game.test.ts)
│   │   │   │   │   │   ├── [index.test.tsx](./lingo/src/games/economics/time-value/__tests__/index.test.tsx)
│   │   │   │   │   │   └── [reducer.test.ts](./lingo/src/games/economics/time-value/__tests__/reducer.test.ts)
│   │   │   │   │   ├── [calculator.tsx](./lingo/src/games/economics/time-value/calculator.tsx)
│   │   │   │   │   ├── [components.tsx](./lingo/src/games/economics/time-value/components.tsx)
│   │   │   │   │   ├── [constants.ts](./lingo/src/games/economics/time-value/constants.ts)
│   │   │   │   │   ├── [game.ts](./lingo/src/games/economics/time-value/game.ts)
│   │   │   │   │   ├── [index.tsx](./lingo/src/games/economics/time-value/index.tsx)
│   │   │   │   │   ├── [phases.tsx](./lingo/src/games/economics/time-value/phases.tsx)
│   │   │   │   │   ├── [reducer.ts](./lingo/src/games/economics/time-value/reducer.ts)
│   │   │   │   │   └── [types.ts](./lingo/src/games/economics/time-value/types.ts)
│   │   │   │   ├── trade/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [game.test.ts](./lingo/src/games/economics/trade/__tests__/game.test.ts)
│   │   │   │   │   │   ├── [index.test.tsx](./lingo/src/games/economics/trade/__tests__/index.test.tsx)
│   │   │   │   │   │   └── [reducer.test.ts](./lingo/src/games/economics/trade/__tests__/reducer.test.ts)
│   │   │   │   │   ├── [chart-scaffold.tsx](./lingo/src/games/economics/trade/chart-scaffold.tsx)
│   │   │   │   │   ├── [chart.tsx](./lingo/src/games/economics/trade/chart.tsx)
│   │   │   │   │   ├── [components.tsx](./lingo/src/games/economics/trade/components.tsx)
│   │   │   │   │   ├── [constants.ts](./lingo/src/games/economics/trade/constants.ts)
│   │   │   │   │   ├── [game.ts](./lingo/src/games/economics/trade/game.ts)
│   │   │   │   │   ├── [index.tsx](./lingo/src/games/economics/trade/index.tsx)
│   │   │   │   │   ├── [panels.tsx](./lingo/src/games/economics/trade/panels.tsx)
│   │   │   │   │   ├── [reducer.ts](./lingo/src/games/economics/trade/reducer.ts)
│   │   │   │   │   ├── [retaliation.tsx](./lingo/src/games/economics/trade/retaliation.tsx)
│   │   │   │   │   └── [types.ts](./lingo/src/games/economics/trade/types.ts)
│   │   │   │   ├── [Hub.tsx](./lingo/src/games/economics/Hub.tsx)
│   │   │   │   └── [data.ts](./lingo/src/games/economics/data.ts)
│   │   │   ├── history/
│   │   │   │   ├── myth-vs-fact/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [index.test.tsx](./lingo/src/games/history/myth-vs-fact/__tests__/index.test.tsx)
│   │   │   │   │   ├── data/
│   │   │   │   │   │   ├── [items.csv](./lingo/src/games/history/myth-vs-fact/data/items.csv)
│   │   │   │   │   │   └── [items.json](./lingo/src/games/history/myth-vs-fact/data/items.json)
│   │   │   │   │   ├── utils/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   └── [game.test.ts](./lingo/src/games/history/myth-vs-fact/utils/__tests__/game.test.ts)
│   │   │   │   │   │   └── [game.ts](./lingo/src/games/history/myth-vs-fact/utils/game.ts)
│   │   │   │   │   ├── [constants.ts](./lingo/src/games/history/myth-vs-fact/constants.ts)
│   │   │   │   │   ├── [index.tsx](./lingo/src/games/history/myth-vs-fact/index.tsx)
│   │   │   │   │   └── [types.ts](./lingo/src/games/history/myth-vs-fact/types.ts)
│   │   │   │   ├── through-the-years/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── components/
│   │   │   │   │   │   │   ├── [BrowseCompact.test.tsx](./lingo/src/games/history/through-the-years/__tests__/components/BrowseCompact.test.tsx)
│   │   │   │   │   │   │   ├── [BrowseSpread.test.tsx](./lingo/src/games/history/through-the-years/__tests__/components/BrowseSpread.test.tsx)
│   │   │   │   │   │   │   ├── [Card.test.tsx](./lingo/src/games/history/through-the-years/__tests__/components/Card.test.tsx)
│   │   │   │   │   │   │   └── [Timeline.test.tsx](./lingo/src/games/history/through-the-years/__tests__/components/Timeline.test.tsx)
│   │   │   │   │   │   ├── screens/
│   │   │   │   │   │   │   ├── [BrowseScreen.test.tsx](./lingo/src/games/history/through-the-years/__tests__/screens/BrowseScreen.test.tsx)
│   │   │   │   │   │   │   ├── [GameOverScreen.test.tsx](./lingo/src/games/history/through-the-years/__tests__/screens/GameOverScreen.test.tsx)
│   │   │   │   │   │   │   ├── [GameScreen.test.tsx](./lingo/src/games/history/through-the-years/__tests__/screens/GameScreen.test.tsx)
│   │   │   │   │   │   │   └── [SetupScreen.test.tsx](./lingo/src/games/history/through-the-years/__tests__/screens/SetupScreen.test.tsx)
│   │   │   │   │   │   ├── [engine.test.ts](./lingo/src/games/history/through-the-years/__tests__/engine.test.ts)
│   │   │   │   │   │   ├── [index.test.tsx](./lingo/src/games/history/through-the-years/__tests__/index.test.tsx)
│   │   │   │   │   │   └── [store.test.ts](./lingo/src/games/history/through-the-years/__tests__/store.test.ts)
│   │   │   │   │   ├── components/
│   │   │   │   │   │   ├── components/
│   │   │   │   │   │   │   ├── [BrowseCompact.tsx](./lingo/src/games/history/through-the-years/components/components/BrowseCompact.tsx)
│   │   │   │   │   │   │   ├── [BrowseSpread.tsx](./lingo/src/games/history/through-the-years/components/components/BrowseSpread.tsx)
│   │   │   │   │   │   │   ├── [Card.tsx](./lingo/src/games/history/through-the-years/components/components/Card.tsx)
│   │   │   │   │   │   │   └── [Timeline.tsx](./lingo/src/games/history/through-the-years/components/components/Timeline.tsx)
│   │   │   │   │   │   └── screens/
│   │   │   │   │   │       ├── [BrowseScreen.tsx](./lingo/src/games/history/through-the-years/components/screens/BrowseScreen.tsx)
│   │   │   │   │   │       ├── [GameOverScreen.tsx](./lingo/src/games/history/through-the-years/components/screens/GameOverScreen.tsx)
│   │   │   │   │   │       ├── [GameScreen.tsx](./lingo/src/games/history/through-the-years/components/screens/GameScreen.tsx)
│   │   │   │   │   │       └── [SetupScreen.tsx](./lingo/src/games/history/through-the-years/components/screens/SetupScreen.tsx)
│   │   │   │   │   ├── data/
│   │   │   │   │   │   ├── json/
│   │   │   │   │   │   │   ├── africa/
│   │   │   │   │   │   │   │   ├── [egypt-events.json](./lingo/src/games/history/through-the-years/data/json/africa/egypt-events.json)
│   │   │   │   │   │   │   │   └── [south-africa-events.json](./lingo/src/games/history/through-the-years/data/json/africa/south-africa-events.json)
│   │   │   │   │   │   │   ├── americas/
│   │   │   │   │   │   │   │   ├── [mexico-events.json](./lingo/src/games/history/through-the-years/data/json/americas/mexico-events.json)
│   │   │   │   │   │   │   │   └── [united-states-events.json](./lingo/src/games/history/through-the-years/data/json/americas/united-states-events.json)
│   │   │   │   │   │   │   ├── asia/
│   │   │   │   │   │   │   │   ├── [china-events.json](./lingo/src/games/history/through-the-years/data/json/asia/china-events.json)
│   │   │   │   │   │   │   │   ├── [india-events.json](./lingo/src/games/history/through-the-years/data/json/asia/india-events.json)
│   │   │   │   │   │   │   │   ├── [iraq-events.json](./lingo/src/games/history/through-the-years/data/json/asia/iraq-events.json)
│   │   │   │   │   │   │   │   ├── [japan-events.json](./lingo/src/games/history/through-the-years/data/json/asia/japan-events.json)
│   │   │   │   │   │   │   │   └── [vietnam-events.json](./lingo/src/games/history/through-the-years/data/json/asia/vietnam-events.json)
│   │   │   │   │   │   │   ├── europe/
│   │   │   │   │   │   │   │   ├── [france-events.json](./lingo/src/games/history/through-the-years/data/json/europe/france-events.json)
│   │   │   │   │   │   │   │   ├── [germany-events.json](./lingo/src/games/history/through-the-years/data/json/europe/germany-events.json)
│   │   │   │   │   │   │   │   ├── [greece-events.json](./lingo/src/games/history/through-the-years/data/json/europe/greece-events.json)
│   │   │   │   │   │   │   │   ├── [italy-events.json](./lingo/src/games/history/through-the-years/data/json/europe/italy-events.json)
│   │   │   │   │   │   │   │   └── [united-kingdom-events.json](./lingo/src/games/history/through-the-years/data/json/europe/united-kingdom-events.json)
│   │   │   │   │   │   │   └── world/
│   │   │   │   │   │   │       └── [world-events.json](./lingo/src/games/history/through-the-years/data/json/world/world-events.json)
│   │   │   │   │   │   ├── [categories.ts](./lingo/src/games/history/through-the-years/data/categories.ts)
│   │   │   │   │   │   ├── [constants.ts](./lingo/src/games/history/through-the-years/data/constants.ts)
│   │   │   │   │   │   ├── [continents.ts](./lingo/src/games/history/through-the-years/data/continents.ts)
│   │   │   │   │   │   ├── [decks.ts](./lingo/src/games/history/through-the-years/data/decks.ts)
│   │   │   │   │   │   └── [modes.ts](./lingo/src/games/history/through-the-years/data/modes.ts)
│   │   │   │   │   ├── testing/
│   │   │   │   │   │   └── [fixtures.ts](./lingo/src/games/history/through-the-years/testing/fixtures.ts)
│   │   │   │   │   ├── [engine.ts](./lingo/src/games/history/through-the-years/engine.ts)
│   │   │   │   │   ├── [index.tsx](./lingo/src/games/history/through-the-years/index.tsx)
│   │   │   │   │   ├── [store.ts](./lingo/src/games/history/through-the-years/store.ts)
│   │   │   │   │   └── [types.ts](./lingo/src/games/history/through-the-years/types.ts)
│   │   │   │   └── [Hub.tsx](./lingo/src/games/history/Hub.tsx)
│   │   │   ├── languages/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [index.test.tsx](./lingo/src/games/languages/__tests__/index.test.tsx)
│   │   │   │   │   └── [utils.test.ts](./lingo/src/games/languages/__tests__/utils.test.ts)
│   │   │   │   ├── english/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [index.test.tsx](./lingo/src/games/languages/english/__tests__/index.test.tsx)
│   │   │   │   │   │   └── [utils.test.ts](./lingo/src/games/languages/english/__tests__/utils.test.ts)
│   │   │   │   │   ├── [index.tsx](./lingo/src/games/languages/english/index.tsx)
│   │   │   │   │   └── [utils.ts](./lingo/src/games/languages/english/utils.ts)
│   │   │   │   ├── sign/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [index.test.tsx](./lingo/src/games/languages/sign/__tests__/index.test.tsx)
│   │   │   │   │   │   └── [utils.test.ts](./lingo/src/games/languages/sign/__tests__/utils.test.ts)
│   │   │   │   │   ├── [index.tsx](./lingo/src/games/languages/sign/index.tsx)
│   │   │   │   │   └── [utils.ts](./lingo/src/games/languages/sign/utils.ts)
│   │   │   │   ├── [LanguageList.tsx](./lingo/src/games/languages/LanguageList.tsx)
│   │   │   │   ├── [flags.ts](./lingo/src/games/languages/flags.ts)
│   │   │   │   ├── [index.tsx](./lingo/src/games/languages/index.tsx)
│   │   │   │   └── [utils.ts](./lingo/src/games/languages/utils.ts)
│   │   │   └── music/
│   │   │       ├── __tests__/
│   │   │       │   ├── [index.test.tsx](./lingo/src/games/music/__tests__/index.test.tsx)
│   │   │       │   ├── [keyClasses.test.ts](./lingo/src/games/music/__tests__/keyClasses.test.ts)
│   │   │       │   ├── [useAudio.test.ts](./lingo/src/games/music/__tests__/useAudio.test.ts)
│   │   │       │   ├── [useGame.test.ts](./lingo/src/games/music/__tests__/useGame.test.ts)
│   │   │       │   └── [useSequence.test.ts](./lingo/src/games/music/__tests__/useSequence.test.ts)
│   │   │       ├── [constants.ts](./lingo/src/games/music/constants.ts)
│   │   │       ├── [index.tsx](./lingo/src/games/music/index.tsx)
│   │   │       ├── [keyClasses.ts](./lingo/src/games/music/keyClasses.ts)
│   │   │       ├── [twinkle-twinkle-little-star.ts](./lingo/src/games/music/twinkle-twinkle-little-star.ts)
│   │   │       ├── [useAudio.ts](./lingo/src/games/music/useAudio.ts)
│   │   │       ├── [useGame.ts](./lingo/src/games/music/useGame.ts)
│   │   │       ├── [useMusicGame.ts](./lingo/src/games/music/useMusicGame.ts)
│   │   │       └── [useSequence.ts](./lingo/src/games/music/useSequence.ts)
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
│   │       ├── [base.css](./lingo/src/styles/base.css)
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

424 directories, 1226 files
