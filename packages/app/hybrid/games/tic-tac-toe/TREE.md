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
│   │   │   ├── classic/
│   │   │   │   └── [page.tsx](./src/app/(games)/classic/page.tsx)
│   │   │   ├── duck/
│   │   │   │   └── [page.tsx](./src/app/(games)/duck/page.tsx)
│   │   │   ├── notakto/
│   │   │   │   └── [page.tsx](./src/app/(games)/notakto/page.tsx)
│   │   │   ├── reverse/
│   │   │   │   └── [page.tsx](./src/app/(games)/reverse/page.tsx)
│   │   │   ├── t3/
│   │   │   │   └── [page.tsx](./src/app/(games)/t3/page.tsx)
│   │   │   └── wild/
│   │   │       └── [page.tsx](./src/app/(games)/wild/page.tsx)
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
│   │   │   └── [board.ts](./src/games/_shared/board.ts)
│   │   ├── classic/
│   │   │   ├── __tests__/
│   │   │   │   ├── [index.test.tsx](./src/games/classic/__tests__/index.test.tsx)
│   │   │   │   ├── [useClassic.test.tsx](./src/games/classic/__tests__/useClassic.test.tsx)
│   │   │   │   └── [utils.test.ts](./src/games/classic/__tests__/utils.test.ts)
│   │   │   ├── [index.tsx](./src/games/classic/index.tsx)
│   │   │   ├── [types.ts](./src/games/classic/types.ts)
│   │   │   ├── [useClassic.ts](./src/games/classic/useClassic.ts)
│   │   │   └── [utils.ts](./src/games/classic/utils.ts)
│   │   ├── duck/
│   │   │   ├── __tests__/
│   │   │   │   ├── [index.test.tsx](./src/games/duck/__tests__/index.test.tsx)
│   │   │   │   ├── [useDuck.test.tsx](./src/games/duck/__tests__/useDuck.test.tsx)
│   │   │   │   └── [utils.test.ts](./src/games/duck/__tests__/utils.test.ts)
│   │   │   ├── [index.tsx](./src/games/duck/index.tsx)
│   │   │   ├── [types.ts](./src/games/duck/types.ts)
│   │   │   ├── [useDuck.ts](./src/games/duck/useDuck.ts)
│   │   │   └── [utils.ts](./src/games/duck/utils.ts)
│   │   ├── notakto/
│   │   │   ├── __tests__/
│   │   │   │   ├── [index.test.tsx](./src/games/notakto/__tests__/index.test.tsx)
│   │   │   │   ├── [useNotakto.test.tsx](./src/games/notakto/__tests__/useNotakto.test.tsx)
│   │   │   │   └── [utils.test.ts](./src/games/notakto/__tests__/utils.test.ts)
│   │   │   ├── [index.tsx](./src/games/notakto/index.tsx)
│   │   │   ├── [types.ts](./src/games/notakto/types.ts)
│   │   │   ├── [useNotakto.ts](./src/games/notakto/useNotakto.ts)
│   │   │   └── [utils.ts](./src/games/notakto/utils.ts)
│   │   ├── reverse/
│   │   │   ├── __tests__/
│   │   │   │   ├── [index.test.tsx](./src/games/reverse/__tests__/index.test.tsx)
│   │   │   │   ├── [useReverse.test.tsx](./src/games/reverse/__tests__/useReverse.test.tsx)
│   │   │   │   └── [utils.test.ts](./src/games/reverse/__tests__/utils.test.ts)
│   │   │   ├── [index.tsx](./src/games/reverse/index.tsx)
│   │   │   ├── [types.ts](./src/games/reverse/types.ts)
│   │   │   ├── [useReverse.ts](./src/games/reverse/useReverse.ts)
│   │   │   └── [utils.ts](./src/games/reverse/utils.ts)
│   │   ├── t3/
│   │   │   ├── __tests__/
│   │   │   │   ├── [index.test.tsx](./src/games/t3/__tests__/index.test.tsx)
│   │   │   │   ├── [useT3.test.tsx](./src/games/t3/__tests__/useT3.test.tsx)
│   │   │   │   └── [utils.test.ts](./src/games/t3/__tests__/utils.test.ts)
│   │   │   ├── [index.tsx](./src/games/t3/index.tsx)
│   │   │   ├── [types.ts](./src/games/t3/types.ts)
│   │   │   ├── [useT3.ts](./src/games/t3/useT3.ts)
│   │   │   └── [utils.ts](./src/games/t3/utils.ts)
│   │   └── wild/
│   │       ├── __tests__/
│   │       │   ├── [index.test.tsx](./src/games/wild/__tests__/index.test.tsx)
│   │       │   ├── [useWild.test.tsx](./src/games/wild/__tests__/useWild.test.tsx)
│   │       │   └── [utils.test.ts](./src/games/wild/__tests__/utils.test.ts)
│   │       ├── [index.tsx](./src/games/wild/index.tsx)
│   │       ├── [types.ts](./src/games/wild/types.ts)
│   │       ├── [useWild.ts](./src/games/wild/useWild.ts)
│   │       └── [utils.ts](./src/games/wild/utils.ts)
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

56 directories, 163 files
