# TREE

```text
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
├── images/
├── public/
│   ├── icons/
│   │   ├── [icon-192x192.png](./public/icons/icon-192x192.png)
│   │   ├── [icon-512x512.png](./public/icons/icon-512x512.png)
│   │   └── [icon.svg](./public/icons/icon.svg)
│   ├── [apple-touch-icon.png](./public/apple-touch-icon.png)
│   ├── [favicon.ico](./public/favicon.ico)
│   ├── [manifest.json](./public/manifest.json)
│   ├── [robots.txt](./public/robots.txt)
│   ├── [sitemap.xml](./public/sitemap.xml)
│   └── [sw.js](./public/sw.js)
├── src/
│   ├── app/
│   │   ├── about/
│   │   │   └── [page.tsx](./src/app/about/page.tsx)
│   │   ├── version/
│   │   │   └── [page.tsx](./src/app/version/page.tsx)
│   │   ├── [error.tsx](./src/app/error.tsx)
│   │   ├── [layout.tsx](./src/app/layout.tsx)
│   │   ├── [not-found.tsx](./src/app/not-found.tsx)
│   │   └── [page.tsx](./src/app/page.tsx)
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
│   │   │   ├── [ShortcutsModal.test.tsx](./src/components/__tests__/ShortcutsModal.test.tsx)
│   │   │   ├── [StatusBar.test.tsx](./src/components/__tests__/StatusBar.test.tsx)
│   │   │   ├── [TabBar.test.tsx](./src/components/__tests__/TabBar.test.tsx)
│   │   │   ├── [TreeNode.test.tsx](./src/components/__tests__/TreeNode.test.tsx)
│   │   │   └── [WelcomeScreen.test.tsx](./src/components/__tests__/WelcomeScreen.test.tsx)
│   │   ├── templates/
│   │   │   ├── [AboutTemplate.tsx](./src/components/templates/AboutTemplate.tsx)
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
│   │   │   ├── [useCodePage.test.ts](./src/hooks/__tests__/useCodePage.test.ts)
│   │   │   └── [useErrorModal.test.ts](./src/hooks/__tests__/useErrorModal.test.ts)
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
│   │   └── [globals.css](./src/styles/globals.css)
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
├── [LICENSE](./LICENSE)
├── [README.md](./README.md)
├── [TREE.md](./TREE.md)
├── [eslint.config.mts](./eslint.config.mts)
├── [jest.config.ts](./jest.config.ts)
├── [jest.setup.ts](./jest.setup.ts)
├── [next.config.ts](./next.config.ts)
├── [package.json](./package.json)
├── [playwright.config.ts](./playwright.config.ts)
├── [postcss.config.mjs](./postcss.config.mjs)
└── [tsconfig.json](./tsconfig.json)
```

22 directories, 115 files
