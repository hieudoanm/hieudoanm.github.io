# TREE

```text
├── docs/
│   ├── [ARCHITECTURE.md](./docs/ARCHITECTURE.md)
│   ├── [CONTRIBUTING.md](./docs/CONTRIBUTING.md)
│   ├── [DOWNLOADS.md](./docs/DOWNLOADS.md)
│   ├── [PACKAGING.md](./docs/PACKAGING.md)
│   └── [ROADMAP.md](./docs/ROADMAP.md)
├── e2e/
│   ├── [about.spec.ts](./e2e/about.spec.ts)
│   ├── [activity-bar.spec.ts](./e2e/activity-bar.spec.ts)
│   ├── [file-explorer.spec.ts](./e2e/file-explorer.spec.ts)
│   ├── [global-search.spec.ts](./e2e/global-search.spec.ts)
│   ├── [home.spec.ts](./e2e/home.spec.ts)
│   ├── [navigation.spec.ts](./e2e/navigation.spec.ts)
│   ├── [responsive.spec.ts](./e2e/responsive.spec.ts)
│   ├── [status-bar.spec.ts](./e2e/status-bar.spec.ts)
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
│   │   │   ├── [about-page.test.tsx](./src/app/__tests__/about-page.test.tsx)
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
│   │   │   ├── [unauthorized.test.tsx](./src/app/__tests__/unauthorized.test.tsx)
│   │   │   └── [version-page.test.tsx](./src/app/__tests__/version-page.test.tsx)
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
│   │   ├── __tests__/
│   │   │   ├── [ActivityBar.test.tsx](./src/components/__tests__/ActivityBar.test.tsx)
│   │   │   ├── [Breadcrumb.test.tsx](./src/components/__tests__/Breadcrumb.test.tsx)
│   │   │   ├── [CodeEditor.test.tsx](./src/components/__tests__/CodeEditor.test.tsx)
│   │   │   ├── [ConfirmModal.test.tsx](./src/components/__tests__/ConfirmModal.test.tsx)
│   │   │   ├── [ContextMenu.test.tsx](./src/components/__tests__/ContextMenu.test.tsx)
│   │   │   ├── [EmptyExplorer.test.tsx](./src/components/__tests__/EmptyExplorer.test.tsx)
│   │   │   ├── [ErrorModal.test.tsx](./src/components/__tests__/ErrorModal.test.tsx)
│   │   │   ├── [ExplorerToolbar.test.tsx](./src/components/__tests__/ExplorerToolbar.test.tsx)
│   │   │   ├── [FileTree.test.tsx](./src/components/__tests__/FileTree.test.tsx)
│   │   │   ├── [GlobalSearchPanel.test.tsx](./src/components/__tests__/GlobalSearchPanel.test.tsx)
│   │   │   ├── [GoToLinePrompt.test.tsx](./src/components/__tests__/GoToLinePrompt.test.tsx)
│   │   │   ├── [InputPrompt.test.tsx](./src/components/__tests__/InputPrompt.test.tsx)
│   │   │   ├── [QuickOpen.test.tsx](./src/components/__tests__/QuickOpen.test.tsx)
│   │   │   ├── [SWProvider.test.tsx](./src/components/__tests__/SWProvider.test.tsx)
│   │   │   ├── [ShortcutsModal.test.tsx](./src/components/__tests__/ShortcutsModal.test.tsx)
│   │   │   ├── [StatusBar.test.tsx](./src/components/__tests__/StatusBar.test.tsx)
│   │   │   ├── [TabBar.test.tsx](./src/components/__tests__/TabBar.test.tsx)
│   │   │   ├── [TreeNode.test.tsx](./src/components/__tests__/TreeNode.test.tsx)
│   │   │   └── [WelcomeScreen.test.tsx](./src/components/__tests__/WelcomeScreen.test.tsx)
│   │   ├── templates/
│   │   │   ├── __tests__/
│   │   │   │   ├── [AboutTemplate.test.tsx](./src/components/templates/__tests__/AboutTemplate.test.tsx)
│   │   │   │   ├── [DownloadsTemplate.test.tsx](./src/components/templates/__tests__/DownloadsTemplate.test.tsx)
│   │   │   │   ├── [ErrorTemplate.test.tsx](./src/components/templates/__tests__/ErrorTemplate.test.tsx)
│   │   │   │   └── [VersionTemplate.test.tsx](./src/components/templates/__tests__/VersionTemplate.test.tsx)
│   │   │   ├── [AboutTemplate.tsx](./src/components/templates/AboutTemplate.tsx)
│   │   │   ├── [DownloadsTemplate.tsx](./src/components/templates/DownloadsTemplate.tsx)
│   │   │   ├── [ErrorTemplate.tsx](./src/components/templates/ErrorTemplate.tsx)
│   │   │   └── [VersionTemplate.tsx](./src/components/templates/VersionTemplate.tsx)
│   │   ├── [ActivityBar.tsx](./src/components/ActivityBar.tsx)
│   │   ├── [Breadcrumb.tsx](./src/components/Breadcrumb.tsx)
│   │   ├── [CodeEditor.tsx](./src/components/CodeEditor.tsx)
│   │   ├── [ConfirmModal.tsx](./src/components/ConfirmModal.tsx)
│   │   ├── [ContextMenu.tsx](./src/components/ContextMenu.tsx)
│   │   ├── [EmptyExplorer.tsx](./src/components/EmptyExplorer.tsx)
│   │   ├── [ErrorModal.tsx](./src/components/ErrorModal.tsx)
│   │   ├── [ExplorerToolbar.tsx](./src/components/ExplorerToolbar.tsx)
│   │   ├── [FileTree.tsx](./src/components/FileTree.tsx)
│   │   ├── [GlobalSearchPanel.tsx](./src/components/GlobalSearchPanel.tsx)
│   │   ├── [GoToLinePrompt.tsx](./src/components/GoToLinePrompt.tsx)
│   │   ├── [InputPrompt.tsx](./src/components/InputPrompt.tsx)
│   │   ├── [QuickOpen.tsx](./src/components/QuickOpen.tsx)
│   │   ├── [SWProvider.tsx](./src/components/SWProvider.tsx)
│   │   ├── [ShortcutsModal.tsx](./src/components/ShortcutsModal.tsx)
│   │   ├── [StatusBar.tsx](./src/components/StatusBar.tsx)
│   │   ├── [TabBar.tsx](./src/components/TabBar.tsx)
│   │   ├── [TreeNode.tsx](./src/components/TreeNode.tsx)
│   │   └── [WelcomeScreen.tsx](./src/components/WelcomeScreen.tsx)
│   ├── hooks/
│   │   ├── __tests__/
│   │   │   ├── [useCodePage.dialogUnavailable.test.ts](./src/hooks/__tests__/useCodePage.dialogUnavailable.test.ts)
│   │   │   ├── [useCodePage.fsUnavailable.test.ts](./src/hooks/__tests__/useCodePage.fsUnavailable.test.ts)
│   │   │   ├── [useCodePage.test.ts](./src/hooks/__tests__/useCodePage.test.ts)
│   │   │   ├── [useErrorModal.test.ts](./src/hooks/__tests__/useErrorModal.test.ts)
│   │   │   └── [useSWRegister.test.ts](./src/hooks/__tests__/useSWRegister.test.ts)
│   │   ├── [useCodePage.ts](./src/hooks/useCodePage.ts)
│   │   ├── [useErrorModal.ts](./src/hooks/useErrorModal.ts)
│   │   └── [useSWRegister.ts](./src/hooks/useSWRegister.ts)
│   ├── routes/
│   │   ├── __tests__/
│   │   │   ├── [CodePage.test.tsx](./src/routes/__tests__/CodePage.test.tsx)
│   │   │   └── [ErrorPage.test.tsx](./src/routes/__tests__/ErrorPage.test.tsx)
│   │   ├── [CodePage.tsx](./src/routes/CodePage.tsx)
│   │   └── [ErrorPage.tsx](./src/routes/ErrorPage.tsx)
│   ├── styles/
│   │   ├── [base.css](./src/styles/base.css)
│   │   ├── [globals.css](./src/styles/globals.css)
│   │   └── [themes.css](./src/styles/themes.css)
│   └── utils/
│       ├── __tests__/
│       │   ├── [editor-languages.test.tsx](./src/utils/__tests__/editor-languages.test.tsx)
│       │   ├── [tree.test.ts](./src/utils/__tests__/tree.test.ts)
│       │   └── [try-catch.test.ts](./src/utils/__tests__/try-catch.test.ts)
│       ├── [editor-languages.tsx](./src/utils/editor-languages.tsx)
│       ├── [tree.ts](./src/utils/tree.ts)
│       └── [try-catch.ts](./src/utils/try-catch.ts)
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
├── [AGENTS.md](./AGENTS.md)
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

38 directories, 178 files
