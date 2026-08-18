# TREE

```text
├── e2e/
│   ├── [about.spec.ts](./e2e/about.spec.ts)
│   ├── [chat-header.spec.ts](./e2e/chat-header.spec.ts)
│   ├── [chat-thread.spec.ts](./e2e/chat-thread.spec.ts)
│   ├── [home.spec.ts](./e2e/home.spec.ts)
│   ├── [navigation.spec.ts](./e2e/navigation.spec.ts)
│   ├── [profile.spec.ts](./e2e/profile.spec.ts)
│   ├── [responsive.spec.ts](./e2e/responsive.spec.ts)
│   ├── [settings.spec.ts](./e2e/settings.spec.ts)
│   ├── [sidebar.spec.ts](./e2e/sidebar.spec.ts)
│   └── [version.spec.ts](./e2e/version.spec.ts)
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
│   │   ├── chat/
│   │   │   └── [page.tsx](./src/app/chat/page.tsx)
│   │   ├── profile/
│   │   │   └── [page.tsx](./src/app/profile/page.tsx)
│   │   ├── settings/
│   │   │   └── [page.tsx](./src/app/settings/page.tsx)
│   │   ├── version/
│   │   │   └── [page.tsx](./src/app/version/page.tsx)
│   │   ├── [error.tsx](./src/app/error.tsx)
│   │   ├── [layout.tsx](./src/app/layout.tsx)
│   │   ├── [not-found.tsx](./src/app/not-found.tsx)
│   │   └── [page.tsx](./src/app/page.tsx)
│   ├── components/
│   │   ├── atoms/
│   │   │   ├── [MessageBubble.tsx](./src/components/atoms/MessageBubble.tsx)
│   │   │   └── [ModelBadge.tsx](./src/components/atoms/ModelBadge.tsx)
│   │   ├── chat/
│   │   │   ├── __tests__/
│   │   │   │   ├── [Chat.test.tsx](./src/components/chat/__tests__/Chat.test.tsx)
│   │   │   │   ├── [ChatCounter.test.tsx](./src/components/chat/__tests__/ChatCounter.test.tsx)
│   │   │   │   ├── [ChatMessages.test.tsx](./src/components/chat/__tests__/ChatMessages.test.tsx)
│   │   │   │   └── [ChatModels.test.tsx](./src/components/chat/__tests__/ChatModels.test.tsx)
│   │   │   ├── [Chat.tsx](./src/components/chat/Chat.tsx)
│   │   │   ├── [ChatCounter.tsx](./src/components/chat/ChatCounter.tsx)
│   │   │   ├── [ChatMessages.tsx](./src/components/chat/ChatMessages.tsx)
│   │   │   ├── [ChatModels.tsx](./src/components/chat/ChatModels.tsx)
│   │   │   └── [index.ts](./src/components/chat/index.ts)
│   │   ├── molecules/
│   │   │   ├── [ChatInput.tsx](./src/components/molecules/ChatInput.tsx)
│   │   │   └── [ConversationCard.tsx](./src/components/molecules/ConversationCard.tsx)
│   │   ├── organisms/
│   │   │   ├── [ChatHeader.tsx](./src/components/organisms/ChatHeader.tsx)
│   │   │   ├── [OfflineBanner.tsx](./src/components/organisms/OfflineBanner.tsx)
│   │   │   ├── [Sidebar.tsx](./src/components/organisms/Sidebar.tsx)
│   │   │   └── [ToastContainer.tsx](./src/components/organisms/ToastContainer.tsx)
│   │   ├── templates/
│   │   │   ├── [AboutTemplate.tsx](./src/components/templates/AboutTemplate.tsx)
│   │   │   ├── [ErrorTemplate.tsx](./src/components/templates/ErrorTemplate.tsx)
│   │   │   ├── [PageTransition.tsx](./src/components/templates/PageTransition.tsx)
│   │   │   └── [VersionTemplate.tsx](./src/components/templates/VersionTemplate.tsx)
│   │   ├── write/
│   │   │   ├── [WriteTool.tsx](./src/components/write/WriteTool.tsx)
│   │   │   ├── [config.ts](./src/components/write/config.ts)
│   │   │   └── [index.tsx](./src/components/write/index.tsx)
│   │   ├── [FullScreen.tsx](./src/components/FullScreen.tsx)
│   │   └── [SWProvider.tsx](./src/components/SWProvider.tsx)
│   ├── data/
│   │   ├── [models.ts](./src/data/models.ts)
│   │   └── [seed.ts](./src/data/seed.ts)
│   ├── hooks/
│   │   ├── [useKeyboard.ts](./src/hooks/useKeyboard.ts)
│   │   ├── [useSWRegister.ts](./src/hooks/useSWRegister.ts)
│   │   └── [useStreaming.ts](./src/hooks/useStreaming.ts)
│   ├── lib/
│   │   └── [db.ts](./src/lib/db.ts)
│   ├── pages/
│   │   └── api/
│   │       ├── rest/
│   │       │   └── [[endpoint].ts](./src/pages/api/rest/[endpoint].ts)
│   │       └── trpc/
│   │           └── [[trpc].ts](./src/pages/api/trpc/[trpc].ts)
│   ├── providers/
│   │   ├── [DataProvider.tsx](./src/providers/DataProvider.tsx)
│   │   ├── [Providers.tsx](./src/providers/Providers.tsx)
│   │   └── [ToastProvider.tsx](./src/providers/ToastProvider.tsx)
│   ├── server/
│   │   ├── rest/
│   │   │   ├── handlers/
│   │   │   │   ├── metadata/
│   │   │   │   │   ├── [docs.ts](./src/server/rest/handlers/metadata/docs.ts)
│   │   │   │   │   ├── [health.ts](./src/server/rest/handlers/metadata/health.ts)
│   │   │   │   │   ├── [info.ts](./src/server/rest/handlers/metadata/info.ts)
│   │   │   │   │   ├── [status.ts](./src/server/rest/handlers/metadata/status.ts)
│   │   │   │   │   └── [version.ts](./src/server/rest/handlers/metadata/version.ts)
│   │   │   │   └── utils/
│   │   │   │       └── [proxy.ts](./src/server/rest/handlers/utils/proxy.ts)
│   │   │   ├── [index.ts](./src/server/rest/index.ts)
│   │   │   └── [types.ts](./src/server/rest/types.ts)
│   │   └── trpc/
│   │       ├── routers/
│   │       │   ├── openrouter/
│   │       │   │   ├── [client.ts](./src/server/trpc/routers/openrouter/client.ts)
│   │       │   │   ├── [enums.ts](./src/server/trpc/routers/openrouter/enums.ts)
│   │       │   │   ├── [index.ts](./src/server/trpc/routers/openrouter/index.ts)
│   │       │   │   └── [service.ts](./src/server/trpc/routers/openrouter/service.ts)
│   │       │   ├── youtube/
│   │       │   │   ├── [index.ts](./src/server/trpc/routers/youtube/index.ts)
│   │       │   │   └── [service.ts](./src/server/trpc/routers/youtube/service.ts)
│   │       │   └── [_app.ts](./src/server/trpc/routers/_app.ts)
│   │       └── [trpc.ts](./src/server/trpc/trpc.ts)
│   ├── styles/
│   │   └── [globals.css](./src/styles/globals.css)
│   ├── types/
│   │   └── [index.ts](./src/types/index.ts)
│   └── utils/
│       ├── [format.ts](./src/utils/format.ts)
│       └── [trpc.ts](./src/utils/trpc.ts)
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

42 directories, 120 files
