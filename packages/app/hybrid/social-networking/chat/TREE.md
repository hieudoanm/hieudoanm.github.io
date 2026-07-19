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
│   │   ├── chat/
│   │   │   ├── __tests__/
│   │   │   │   └── [page.test.tsx](./src/app/chat/__tests__/page.test.tsx)
│   │   │   └── [page.tsx](./src/app/chat/page.tsx)
│   │   ├── settings/
│   │   │   ├── __tests__/
│   │   │   │   └── [page.test.tsx](./src/app/settings/__tests__/page.test.tsx)
│   │   │   └── [page.tsx](./src/app/settings/page.tsx)
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
│   │   │   ├── [FullScreen.test.tsx](./src/components/__tests__/FullScreen.test.tsx)
│   │   │   └── [SWProvider.test.tsx](./src/components/__tests__/SWProvider.test.tsx)
│   │   ├── atoms/
│   │   │   ├── __tests__/
│   │   │   │   ├── [MessageBubble.test.tsx](./src/components/atoms/__tests__/MessageBubble.test.tsx)
│   │   │   │   └── [ModelBadge.test.tsx](./src/components/atoms/__tests__/ModelBadge.test.tsx)
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
│   │   │   ├── __tests__/
│   │   │   │   ├── [ChatInput.test.tsx](./src/components/molecules/__tests__/ChatInput.test.tsx)
│   │   │   │   └── [ConversationCard.test.tsx](./src/components/molecules/__tests__/ConversationCard.test.tsx)
│   │   │   ├── [ChatInput.tsx](./src/components/molecules/ChatInput.tsx)
│   │   │   └── [ConversationCard.tsx](./src/components/molecules/ConversationCard.tsx)
│   │   ├── organisms/
│   │   │   ├── __tests__/
│   │   │   │   ├── [ChatHeader.test.tsx](./src/components/organisms/__tests__/ChatHeader.test.tsx)
│   │   │   │   ├── [OfflineBanner.test.tsx](./src/components/organisms/__tests__/OfflineBanner.test.tsx)
│   │   │   │   ├── [Sidebar.test.tsx](./src/components/organisms/__tests__/Sidebar.test.tsx)
│   │   │   │   └── [ToastContainer.test.tsx](./src/components/organisms/__tests__/ToastContainer.test.tsx)
│   │   │   ├── [ChatHeader.tsx](./src/components/organisms/ChatHeader.tsx)
│   │   │   ├── [OfflineBanner.tsx](./src/components/organisms/OfflineBanner.tsx)
│   │   │   ├── [Sidebar.tsx](./src/components/organisms/Sidebar.tsx)
│   │   │   └── [ToastContainer.tsx](./src/components/organisms/ToastContainer.tsx)
│   │   ├── templates/
│   │   │   ├── __tests__/
│   │   │   │   ├── [AboutTemplate.test.tsx](./src/components/templates/__tests__/AboutTemplate.test.tsx)
│   │   │   │   ├── [DownloadsTemplate.test.tsx](./src/components/templates/__tests__/DownloadsTemplate.test.tsx)
│   │   │   │   ├── [ErrorTemplate.test.tsx](./src/components/templates/__tests__/ErrorTemplate.test.tsx)
│   │   │   │   ├── [PageTransition.test.tsx](./src/components/templates/__tests__/PageTransition.test.tsx)
│   │   │   │   └── [VersionTemplate.test.tsx](./src/components/templates/__tests__/VersionTemplate.test.tsx)
│   │   │   ├── [AboutTemplate.tsx](./src/components/templates/AboutTemplate.tsx)
│   │   │   ├── [DownloadsTemplate.tsx](./src/components/templates/DownloadsTemplate.tsx)
│   │   │   ├── [ErrorTemplate.tsx](./src/components/templates/ErrorTemplate.tsx)
│   │   │   ├── [PageTransition.tsx](./src/components/templates/PageTransition.tsx)
│   │   │   └── [VersionTemplate.tsx](./src/components/templates/VersionTemplate.tsx)
│   │   ├── write/
│   │   │   ├── __tests__/
│   │   │   │   ├── [WriteModal.test.tsx](./src/components/write/__tests__/WriteModal.test.tsx)
│   │   │   │   ├── [WriteTool.test.tsx](./src/components/write/__tests__/WriteTool.test.tsx)
│   │   │   │   └── [config.test.ts](./src/components/write/__tests__/config.test.ts)
│   │   │   ├── [WriteTool.tsx](./src/components/write/WriteTool.tsx)
│   │   │   ├── [config.ts](./src/components/write/config.ts)
│   │   │   └── [index.tsx](./src/components/write/index.tsx)
│   │   ├── [FullScreen.tsx](./src/components/FullScreen.tsx)
│   │   └── [SWProvider.tsx](./src/components/SWProvider.tsx)
│   ├── data/
│   │   ├── __tests__/
│   │   │   ├── [models.test.ts](./src/data/__tests__/models.test.ts)
│   │   │   └── [seed.test.ts](./src/data/__tests__/seed.test.ts)
│   │   ├── [models.ts](./src/data/models.ts)
│   │   └── [seed.ts](./src/data/seed.ts)
│   ├── hooks/
│   │   ├── __tests__/
│   │   │   ├── [useKeyboard.test.ts](./src/hooks/__tests__/useKeyboard.test.ts)
│   │   │   ├── [useSWRegister.test.ts](./src/hooks/__tests__/useSWRegister.test.ts)
│   │   │   └── [useStreaming.test.ts](./src/hooks/__tests__/useStreaming.test.ts)
│   │   ├── [useKeyboard.ts](./src/hooks/useKeyboard.ts)
│   │   ├── [useSWRegister.ts](./src/hooks/useSWRegister.ts)
│   │   └── [useStreaming.ts](./src/hooks/useStreaming.ts)
│   ├── lib/
│   │   ├── __tests__/
│   │   │   └── [db.test.ts](./src/lib/__tests__/db.test.ts)
│   │   ├── api/
│   │   │   └── __tests__/
│   │   │       ├── [rest-endpoint.test.ts](./src/lib/api/__tests__/rest-endpoint.test.ts)
│   │   │       └── [trpc-endpoint.test.ts](./src/lib/api/__tests__/trpc-endpoint.test.ts)
│   │   └── [db.ts](./src/lib/db.ts)
│   ├── pages/
│   │   └── api/
│   │       ├── rest/
│   │       │   └── [[endpoint].ts](./src/pages/api/rest/[endpoint].ts)
│   │       └── trpc/
│   │           └── [[trpc].ts](./src/pages/api/trpc/[trpc].ts)
│   ├── providers/
│   │   ├── __tests__/
│   │   │   ├── [DataProvider.test.tsx](./src/providers/__tests__/DataProvider.test.tsx)
│   │   │   ├── [Providers.test.tsx](./src/providers/__tests__/Providers.test.tsx)
│   │   │   └── [ToastProvider.test.tsx](./src/providers/__tests__/ToastProvider.test.tsx)
│   │   ├── [DataProvider.tsx](./src/providers/DataProvider.tsx)
│   │   ├── [Providers.tsx](./src/providers/Providers.tsx)
│   │   └── [ToastProvider.tsx](./src/providers/ToastProvider.tsx)
│   ├── server/
│   │   ├── rest/
│   │   │   ├── __tests__/
│   │   │   │   └── [index.test.ts](./src/server/rest/__tests__/index.test.ts)
│   │   │   ├── handlers/
│   │   │   │   ├── metadata/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [docs.test.ts](./src/server/rest/handlers/metadata/__tests__/docs.test.ts)
│   │   │   │   │   │   └── [metadata.test.ts](./src/server/rest/handlers/metadata/__tests__/metadata.test.ts)
│   │   │   │   │   ├── [docs.ts](./src/server/rest/handlers/metadata/docs.ts)
│   │   │   │   │   ├── [health.ts](./src/server/rest/handlers/metadata/health.ts)
│   │   │   │   │   ├── [info.ts](./src/server/rest/handlers/metadata/info.ts)
│   │   │   │   │   ├── [status.ts](./src/server/rest/handlers/metadata/status.ts)
│   │   │   │   │   └── [version.ts](./src/server/rest/handlers/metadata/version.ts)
│   │   │   │   └── utils/
│   │   │   │       ├── __tests__/
│   │   │   │       │   └── [proxy.test.ts](./src/server/rest/handlers/utils/__tests__/proxy.test.ts)
│   │   │   │       └── [proxy.ts](./src/server/rest/handlers/utils/proxy.ts)
│   │   │   ├── [index.ts](./src/server/rest/index.ts)
│   │   │   └── [types.ts](./src/server/rest/types.ts)
│   │   └── trpc/
│   │       ├── __tests__/
│   │       │   └── [probe.test.ts](./src/server/trpc/__tests__/probe.test.ts)
│   │       ├── routers/
│   │       │   ├── __tests__/
│   │       │   │   └── [_app.test.ts](./src/server/trpc/routers/__tests__/_app.test.ts)
│   │       │   ├── openrouter/
│   │       │   │   ├── __tests__/
│   │       │   │   │   ├── [client.test.ts](./src/server/trpc/routers/openrouter/__tests__/client.test.ts)
│   │       │   │   │   ├── [index.test.ts](./src/server/trpc/routers/openrouter/__tests__/index.test.ts)
│   │       │   │   │   └── [service.test.ts](./src/server/trpc/routers/openrouter/__tests__/service.test.ts)
│   │       │   │   ├── [client.ts](./src/server/trpc/routers/openrouter/client.ts)
│   │       │   │   ├── [enums.ts](./src/server/trpc/routers/openrouter/enums.ts)
│   │       │   │   ├── [index.ts](./src/server/trpc/routers/openrouter/index.ts)
│   │       │   │   └── [service.ts](./src/server/trpc/routers/openrouter/service.ts)
│   │       │   ├── youtube/
│   │       │   │   ├── __tests__/
│   │       │   │   │   ├── [index.test.ts](./src/server/trpc/routers/youtube/__tests__/index.test.ts)
│   │       │   │   │   └── [service.test.ts](./src/server/trpc/routers/youtube/__tests__/service.test.ts)
│   │       │   │   ├── [index.ts](./src/server/trpc/routers/youtube/index.ts)
│   │       │   │   └── [service.ts](./src/server/trpc/routers/youtube/service.ts)
│   │       │   └── [_app.ts](./src/server/trpc/routers/_app.ts)
│   │       └── [trpc.ts](./src/server/trpc/trpc.ts)
│   ├── styles/
│   │   ├── [base.css](./src/styles/base.css)
│   │   ├── [globals.css](./src/styles/globals.css)
│   │   └── [themes.css](./src/styles/themes.css)
│   ├── types/
│   │   └── [index.ts](./src/types/index.ts)
│   └── utils/
│       ├── __tests__/
│       │   ├── [format.test.ts](./src/utils/__tests__/format.test.ts)
│       │   ├── [trpc-server.test.ts](./src/utils/__tests__/trpc-server.test.ts)
│       │   └── [trpc.test.ts](./src/utils/__tests__/trpc.test.ts)
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

81 directories, 218 files
