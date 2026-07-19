# TREE

```text
├── chat/
│   ├── docs/
│   │   ├── [ARCHITECTURE.md](./chat/docs/ARCHITECTURE.md)
│   │   ├── [CONTRIBUTING.md](./chat/docs/CONTRIBUTING.md)
│   │   ├── [DOWNLOADS.md](./chat/docs/DOWNLOADS.md)
│   │   ├── [PACKAGING.md](./chat/docs/PACKAGING.md)
│   │   └── [ROADMAP.md](./chat/docs/ROADMAP.md)
│   ├── e2e/
│   │   ├── [about.spec.ts](./chat/e2e/about.spec.ts)
│   │   ├── [chat-header.spec.ts](./chat/e2e/chat-header.spec.ts)
│   │   ├── [chat-thread.spec.ts](./chat/e2e/chat-thread.spec.ts)
│   │   ├── [home.spec.ts](./chat/e2e/home.spec.ts)
│   │   ├── [navigation.spec.ts](./chat/e2e/navigation.spec.ts)
│   │   ├── [profile.spec.ts](./chat/e2e/profile.spec.ts)
│   │   ├── [responsive.spec.ts](./chat/e2e/responsive.spec.ts)
│   │   ├── [settings.spec.ts](./chat/e2e/settings.spec.ts)
│   │   ├── [sidebar.spec.ts](./chat/e2e/sidebar.spec.ts)
│   │   └── [version.spec.ts](./chat/e2e/version.spec.ts)
│   ├── public/
│   │   ├── icons/
│   │   │   ├── [icon-128x128.png](./chat/public/icons/icon-128x128.png)
│   │   │   ├── [icon-144x144.png](./chat/public/icons/icon-144x144.png)
│   │   │   ├── [icon-152x152.png](./chat/public/icons/icon-152x152.png)
│   │   │   ├── [icon-16x16.png](./chat/public/icons/icon-16x16.png)
│   │   │   ├── [icon-180x180.png](./chat/public/icons/icon-180x180.png)
│   │   │   ├── [icon-192x192.png](./chat/public/icons/icon-192x192.png)
│   │   │   ├── [icon-256x256.png](./chat/public/icons/icon-256x256.png)
│   │   │   ├── [icon-32x32.png](./chat/public/icons/icon-32x32.png)
│   │   │   ├── [icon-384x384.png](./chat/public/icons/icon-384x384.png)
│   │   │   ├── [icon-48x48.png](./chat/public/icons/icon-48x48.png)
│   │   │   ├── [icon-512x512.png](./chat/public/icons/icon-512x512.png)
│   │   │   ├── [icon-64x64.png](./chat/public/icons/icon-64x64.png)
│   │   │   ├── [icon-72x72.png](./chat/public/icons/icon-72x72.png)
│   │   │   ├── [icon-96x96.png](./chat/public/icons/icon-96x96.png)
│   │   │   └── [icon.svg](./chat/public/icons/icon.svg)
│   │   ├── [apple-touch-icon.png](./chat/public/apple-touch-icon.png)
│   │   ├── [favicon.ico](./chat/public/favicon.ico)
│   │   ├── [manifest.json](./chat/public/manifest.json)
│   │   ├── [robots.txt](./chat/public/robots.txt)
│   │   ├── [sitemap.xml](./chat/public/sitemap.xml)
│   │   └── [sw.js](./chat/public/sw.js)
│   ├── src/
│   │   ├── app/
│   │   │   ├── (auth)/
│   │   │   │   ├── forget-password/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./chat/src/app/(auth)/forget-password/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./chat/src/app/(auth)/forget-password/page.tsx)
│   │   │   │   ├── profile/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./chat/src/app/(auth)/profile/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./chat/src/app/(auth)/profile/page.tsx)
│   │   │   │   ├── reset-password/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./chat/src/app/(auth)/reset-password/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./chat/src/app/(auth)/reset-password/page.tsx)
│   │   │   │   ├── sign-in/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./chat/src/app/(auth)/sign-in/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./chat/src/app/(auth)/sign-in/page.tsx)
│   │   │   │   └── sign-up/
│   │   │   │       ├── __tests__/
│   │   │   │       │   └── [page.test.tsx](./chat/src/app/(auth)/sign-up/__tests__/page.test.tsx)
│   │   │   │       └── [page.tsx](./chat/src/app/(auth)/sign-up/page.tsx)
│   │   │   ├── (info)/
│   │   │   │   ├── about/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./chat/src/app/(info)/about/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./chat/src/app/(info)/about/page.tsx)
│   │   │   │   ├── downloads/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./chat/src/app/(info)/downloads/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./chat/src/app/(info)/downloads/page.tsx)
│   │   │   │   └── version/
│   │   │   │       ├── __tests__/
│   │   │   │       │   └── [page.test.tsx](./chat/src/app/(info)/version/__tests__/page.test.tsx)
│   │   │   │       └── [page.tsx](./chat/src/app/(info)/version/page.tsx)
│   │   │   ├── __tests__/
│   │   │   │   ├── [error.test.tsx](./chat/src/app/__tests__/error.test.tsx)
│   │   │   │   ├── [forbidden.test.tsx](./chat/src/app/__tests__/forbidden.test.tsx)
│   │   │   │   ├── [global-error.test.tsx](./chat/src/app/__tests__/global-error.test.tsx)
│   │   │   │   ├── [layout.test.tsx](./chat/src/app/__tests__/layout.test.tsx)
│   │   │   │   ├── [loading.test.tsx](./chat/src/app/__tests__/loading.test.tsx)
│   │   │   │   ├── [not-found.test.tsx](./chat/src/app/__tests__/not-found.test.tsx)
│   │   │   │   ├── [page.test.tsx](./chat/src/app/__tests__/page.test.tsx)
│   │   │   │   ├── [robots.test.ts](./chat/src/app/__tests__/robots.test.ts)
│   │   │   │   ├── [template.test.tsx](./chat/src/app/__tests__/template.test.tsx)
│   │   │   │   └── [unauthorized.test.tsx](./chat/src/app/__tests__/unauthorized.test.tsx)
│   │   │   ├── chat/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [page.test.tsx](./chat/src/app/chat/__tests__/page.test.tsx)
│   │   │   │   └── [page.tsx](./chat/src/app/chat/page.tsx)
│   │   │   ├── settings/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [page.test.tsx](./chat/src/app/settings/__tests__/page.test.tsx)
│   │   │   │   └── [page.tsx](./chat/src/app/settings/page.tsx)
│   │   │   ├── [default.tsx](./chat/src/app/default.tsx)
│   │   │   ├── [error.tsx](./chat/src/app/error.tsx)
│   │   │   ├── [favicon.ico](./chat/src/app/favicon.ico)
│   │   │   ├── [forbidden.tsx](./chat/src/app/forbidden.tsx)
│   │   │   ├── [global-error.tsx](./chat/src/app/global-error.tsx)
│   │   │   ├── [layout.tsx](./chat/src/app/layout.tsx)
│   │   │   ├── [loading.tsx](./chat/src/app/loading.tsx)
│   │   │   ├── [not-found.tsx](./chat/src/app/not-found.tsx)
│   │   │   ├── [page.tsx](./chat/src/app/page.tsx)
│   │   │   ├── [robots.ts](./chat/src/app/robots.ts)
│   │   │   ├── [template.tsx](./chat/src/app/template.tsx)
│   │   │   └── [unauthorized.tsx](./chat/src/app/unauthorized.tsx)
│   │   ├── components/
│   │   │   ├── __tests__/
│   │   │   │   ├── [FullScreen.test.tsx](./chat/src/components/__tests__/FullScreen.test.tsx)
│   │   │   │   └── [SWProvider.test.tsx](./chat/src/components/__tests__/SWProvider.test.tsx)
│   │   │   ├── atoms/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [MessageBubble.test.tsx](./chat/src/components/atoms/__tests__/MessageBubble.test.tsx)
│   │   │   │   │   └── [ModelBadge.test.tsx](./chat/src/components/atoms/__tests__/ModelBadge.test.tsx)
│   │   │   │   ├── [MessageBubble.tsx](./chat/src/components/atoms/MessageBubble.tsx)
│   │   │   │   └── [ModelBadge.tsx](./chat/src/components/atoms/ModelBadge.tsx)
│   │   │   ├── chat/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [Chat.test.tsx](./chat/src/components/chat/__tests__/Chat.test.tsx)
│   │   │   │   │   ├── [ChatCounter.test.tsx](./chat/src/components/chat/__tests__/ChatCounter.test.tsx)
│   │   │   │   │   ├── [ChatMessages.test.tsx](./chat/src/components/chat/__tests__/ChatMessages.test.tsx)
│   │   │   │   │   └── [ChatModels.test.tsx](./chat/src/components/chat/__tests__/ChatModels.test.tsx)
│   │   │   │   ├── [Chat.tsx](./chat/src/components/chat/Chat.tsx)
│   │   │   │   ├── [ChatCounter.tsx](./chat/src/components/chat/ChatCounter.tsx)
│   │   │   │   ├── [ChatMessages.tsx](./chat/src/components/chat/ChatMessages.tsx)
│   │   │   │   ├── [ChatModels.tsx](./chat/src/components/chat/ChatModels.tsx)
│   │   │   │   └── [index.ts](./chat/src/components/chat/index.ts)
│   │   │   ├── molecules/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [ChatInput.test.tsx](./chat/src/components/molecules/__tests__/ChatInput.test.tsx)
│   │   │   │   │   └── [ConversationCard.test.tsx](./chat/src/components/molecules/__tests__/ConversationCard.test.tsx)
│   │   │   │   ├── [ChatInput.tsx](./chat/src/components/molecules/ChatInput.tsx)
│   │   │   │   └── [ConversationCard.tsx](./chat/src/components/molecules/ConversationCard.tsx)
│   │   │   ├── organisms/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [ChatHeader.test.tsx](./chat/src/components/organisms/__tests__/ChatHeader.test.tsx)
│   │   │   │   │   ├── [OfflineBanner.test.tsx](./chat/src/components/organisms/__tests__/OfflineBanner.test.tsx)
│   │   │   │   │   ├── [Sidebar.test.tsx](./chat/src/components/organisms/__tests__/Sidebar.test.tsx)
│   │   │   │   │   └── [ToastContainer.test.tsx](./chat/src/components/organisms/__tests__/ToastContainer.test.tsx)
│   │   │   │   ├── [ChatHeader.tsx](./chat/src/components/organisms/ChatHeader.tsx)
│   │   │   │   ├── [OfflineBanner.tsx](./chat/src/components/organisms/OfflineBanner.tsx)
│   │   │   │   ├── [Sidebar.tsx](./chat/src/components/organisms/Sidebar.tsx)
│   │   │   │   └── [ToastContainer.tsx](./chat/src/components/organisms/ToastContainer.tsx)
│   │   │   ├── templates/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [AboutTemplate.test.tsx](./chat/src/components/templates/__tests__/AboutTemplate.test.tsx)
│   │   │   │   │   ├── [DownloadsTemplate.test.tsx](./chat/src/components/templates/__tests__/DownloadsTemplate.test.tsx)
│   │   │   │   │   ├── [ErrorTemplate.test.tsx](./chat/src/components/templates/__tests__/ErrorTemplate.test.tsx)
│   │   │   │   │   ├── [PageTransition.test.tsx](./chat/src/components/templates/__tests__/PageTransition.test.tsx)
│   │   │   │   │   └── [VersionTemplate.test.tsx](./chat/src/components/templates/__tests__/VersionTemplate.test.tsx)
│   │   │   │   ├── [AboutTemplate.tsx](./chat/src/components/templates/AboutTemplate.tsx)
│   │   │   │   ├── [DownloadsTemplate.tsx](./chat/src/components/templates/DownloadsTemplate.tsx)
│   │   │   │   ├── [ErrorTemplate.tsx](./chat/src/components/templates/ErrorTemplate.tsx)
│   │   │   │   ├── [PageTransition.tsx](./chat/src/components/templates/PageTransition.tsx)
│   │   │   │   └── [VersionTemplate.tsx](./chat/src/components/templates/VersionTemplate.tsx)
│   │   │   ├── write/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [WriteModal.test.tsx](./chat/src/components/write/__tests__/WriteModal.test.tsx)
│   │   │   │   │   ├── [WriteTool.test.tsx](./chat/src/components/write/__tests__/WriteTool.test.tsx)
│   │   │   │   │   └── [config.test.ts](./chat/src/components/write/__tests__/config.test.ts)
│   │   │   │   ├── [WriteTool.tsx](./chat/src/components/write/WriteTool.tsx)
│   │   │   │   ├── [config.ts](./chat/src/components/write/config.ts)
│   │   │   │   └── [index.tsx](./chat/src/components/write/index.tsx)
│   │   │   ├── [FullScreen.tsx](./chat/src/components/FullScreen.tsx)
│   │   │   └── [SWProvider.tsx](./chat/src/components/SWProvider.tsx)
│   │   ├── data/
│   │   │   ├── __tests__/
│   │   │   │   ├── [models.test.ts](./chat/src/data/__tests__/models.test.ts)
│   │   │   │   └── [seed.test.ts](./chat/src/data/__tests__/seed.test.ts)
│   │   │   ├── [models.ts](./chat/src/data/models.ts)
│   │   │   └── [seed.ts](./chat/src/data/seed.ts)
│   │   ├── hooks/
│   │   │   ├── __tests__/
│   │   │   │   ├── [useKeyboard.test.ts](./chat/src/hooks/__tests__/useKeyboard.test.ts)
│   │   │   │   ├── [useSWRegister.test.ts](./chat/src/hooks/__tests__/useSWRegister.test.ts)
│   │   │   │   └── [useStreaming.test.ts](./chat/src/hooks/__tests__/useStreaming.test.ts)
│   │   │   ├── [useKeyboard.ts](./chat/src/hooks/useKeyboard.ts)
│   │   │   ├── [useSWRegister.ts](./chat/src/hooks/useSWRegister.ts)
│   │   │   └── [useStreaming.ts](./chat/src/hooks/useStreaming.ts)
│   │   ├── lib/
│   │   │   ├── __tests__/
│   │   │   │   └── [db.test.ts](./chat/src/lib/__tests__/db.test.ts)
│   │   │   ├── api/
│   │   │   │   └── __tests__/
│   │   │   │       ├── [rest-endpoint.test.ts](./chat/src/lib/api/__tests__/rest-endpoint.test.ts)
│   │   │   │       └── [trpc-endpoint.test.ts](./chat/src/lib/api/__tests__/trpc-endpoint.test.ts)
│   │   │   └── [db.ts](./chat/src/lib/db.ts)
│   │   ├── pages/
│   │   │   └── api/
│   │   │       ├── rest/
│   │   │       │   └── [[endpoint].ts](./chat/src/pages/api/rest/[endpoint].ts)
│   │   │       └── trpc/
│   │   │           └── [[trpc].ts](./chat/src/pages/api/trpc/[trpc].ts)
│   │   ├── providers/
│   │   │   ├── __tests__/
│   │   │   │   ├── [DataProvider.test.tsx](./chat/src/providers/__tests__/DataProvider.test.tsx)
│   │   │   │   ├── [Providers.test.tsx](./chat/src/providers/__tests__/Providers.test.tsx)
│   │   │   │   └── [ToastProvider.test.tsx](./chat/src/providers/__tests__/ToastProvider.test.tsx)
│   │   │   ├── [DataProvider.tsx](./chat/src/providers/DataProvider.tsx)
│   │   │   ├── [Providers.tsx](./chat/src/providers/Providers.tsx)
│   │   │   └── [ToastProvider.tsx](./chat/src/providers/ToastProvider.tsx)
│   │   ├── server/
│   │   │   ├── rest/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [index.test.ts](./chat/src/server/rest/__tests__/index.test.ts)
│   │   │   │   ├── handlers/
│   │   │   │   │   ├── metadata/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [docs.test.ts](./chat/src/server/rest/handlers/metadata/__tests__/docs.test.ts)
│   │   │   │   │   │   │   └── [metadata.test.ts](./chat/src/server/rest/handlers/metadata/__tests__/metadata.test.ts)
│   │   │   │   │   │   ├── [docs.ts](./chat/src/server/rest/handlers/metadata/docs.ts)
│   │   │   │   │   │   ├── [health.ts](./chat/src/server/rest/handlers/metadata/health.ts)
│   │   │   │   │   │   ├── [info.ts](./chat/src/server/rest/handlers/metadata/info.ts)
│   │   │   │   │   │   ├── [status.ts](./chat/src/server/rest/handlers/metadata/status.ts)
│   │   │   │   │   │   └── [version.ts](./chat/src/server/rest/handlers/metadata/version.ts)
│   │   │   │   │   └── utils/
│   │   │   │   │       ├── __tests__/
│   │   │   │   │       │   └── [proxy.test.ts](./chat/src/server/rest/handlers/utils/__tests__/proxy.test.ts)
│   │   │   │   │       └── [proxy.ts](./chat/src/server/rest/handlers/utils/proxy.ts)
│   │   │   │   ├── [index.ts](./chat/src/server/rest/index.ts)
│   │   │   │   └── [types.ts](./chat/src/server/rest/types.ts)
│   │   │   └── trpc/
│   │   │       ├── __tests__/
│   │   │       │   └── [probe.test.ts](./chat/src/server/trpc/__tests__/probe.test.ts)
│   │   │       ├── routers/
│   │   │       │   ├── __tests__/
│   │   │       │   │   └── [_app.test.ts](./chat/src/server/trpc/routers/__tests__/_app.test.ts)
│   │   │       │   ├── openrouter/
│   │   │       │   │   ├── __tests__/
│   │   │       │   │   │   ├── [client.test.ts](./chat/src/server/trpc/routers/openrouter/__tests__/client.test.ts)
│   │   │       │   │   │   ├── [index.test.ts](./chat/src/server/trpc/routers/openrouter/__tests__/index.test.ts)
│   │   │       │   │   │   └── [service.test.ts](./chat/src/server/trpc/routers/openrouter/__tests__/service.test.ts)
│   │   │       │   │   ├── [client.ts](./chat/src/server/trpc/routers/openrouter/client.ts)
│   │   │       │   │   ├── [enums.ts](./chat/src/server/trpc/routers/openrouter/enums.ts)
│   │   │       │   │   ├── [index.ts](./chat/src/server/trpc/routers/openrouter/index.ts)
│   │   │       │   │   └── [service.ts](./chat/src/server/trpc/routers/openrouter/service.ts)
│   │   │       │   ├── youtube/
│   │   │       │   │   ├── __tests__/
│   │   │       │   │   │   ├── [index.test.ts](./chat/src/server/trpc/routers/youtube/__tests__/index.test.ts)
│   │   │       │   │   │   └── [service.test.ts](./chat/src/server/trpc/routers/youtube/__tests__/service.test.ts)
│   │   │       │   │   ├── [index.ts](./chat/src/server/trpc/routers/youtube/index.ts)
│   │   │       │   │   └── [service.ts](./chat/src/server/trpc/routers/youtube/service.ts)
│   │   │       │   └── [_app.ts](./chat/src/server/trpc/routers/_app.ts)
│   │   │       └── [trpc.ts](./chat/src/server/trpc/trpc.ts)
│   │   ├── styles/
│   │   │   ├── [base.css](./chat/src/styles/base.css)
│   │   │   ├── [globals.css](./chat/src/styles/globals.css)
│   │   │   └── [themes.css](./chat/src/styles/themes.css)
│   │   ├── types/
│   │   │   └── [index.ts](./chat/src/types/index.ts)
│   │   └── utils/
│   │       ├── __tests__/
│   │       │   ├── [format.test.ts](./chat/src/utils/__tests__/format.test.ts)
│   │       │   ├── [trpc-server.test.ts](./chat/src/utils/__tests__/trpc-server.test.ts)
│   │       │   └── [trpc.test.ts](./chat/src/utils/__tests__/trpc.test.ts)
│   │       ├── [format.ts](./chat/src/utils/format.ts)
│   │       └── [trpc.ts](./chat/src/utils/trpc.ts)
│   ├── src-tauri/
│   │   ├── capabilities/
│   │   │   └── [default.json](./chat/src-tauri/capabilities/default.json)
│   │   ├── icons/
│   │   │   ├── [128x128.png](./chat/src-tauri/icons/128x128.png)
│   │   │   ├── [128x128@2x.png](./chat/src-tauri/icons/128x128@2x.png)
│   │   │   ├── [32x32.png](./chat/src-tauri/icons/32x32.png)
│   │   │   ├── [Square107x107Logo.png](./chat/src-tauri/icons/Square107x107Logo.png)
│   │   │   ├── [Square142x142Logo.png](./chat/src-tauri/icons/Square142x142Logo.png)
│   │   │   ├── [Square150x150Logo.png](./chat/src-tauri/icons/Square150x150Logo.png)
│   │   │   ├── [Square284x284Logo.png](./chat/src-tauri/icons/Square284x284Logo.png)
│   │   │   ├── [Square30x30Logo.png](./chat/src-tauri/icons/Square30x30Logo.png)
│   │   │   ├── [Square310x310Logo.png](./chat/src-tauri/icons/Square310x310Logo.png)
│   │   │   ├── [Square44x44Logo.png](./chat/src-tauri/icons/Square44x44Logo.png)
│   │   │   ├── [Square71x71Logo.png](./chat/src-tauri/icons/Square71x71Logo.png)
│   │   │   ├── [Square89x89Logo.png](./chat/src-tauri/icons/Square89x89Logo.png)
│   │   │   ├── [StoreLogo.png](./chat/src-tauri/icons/StoreLogo.png)
│   │   │   ├── [icon.icns](./chat/src-tauri/icons/icon.icns)
│   │   │   ├── [icon.ico](./chat/src-tauri/icons/icon.ico)
│   │   │   └── [icon.png](./chat/src-tauri/icons/icon.png)
│   │   ├── src/
│   │   │   ├── [lib.rs](./chat/src-tauri/src/lib.rs)
│   │   │   └── [main.rs](./chat/src-tauri/src/main.rs)
│   │   ├── [Cargo.lock](./chat/src-tauri/Cargo.lock)
│   │   ├── [Cargo.toml](./chat/src-tauri/Cargo.toml)
│   │   ├── [build.rs](./chat/src-tauri/build.rs)
│   │   └── [tauri.conf.json](./chat/src-tauri/tauri.conf.json)
│   ├── [AGENTS.md](./chat/AGENTS.md)
│   ├── [Dockerfile](./chat/Dockerfile)
│   ├── [LICENSE](./chat/LICENSE)
│   ├── [README.md](./chat/README.md)
│   ├── [TREE.md](./chat/TREE.md)
│   ├── [docker-compose.yaml](./chat/docker-compose.yaml)
│   ├── [eslint.config.mts](./chat/eslint.config.mts)
│   ├── [jest.config.ts](./chat/jest.config.ts)
│   ├── [jest.setup.ts](./chat/jest.setup.ts)
│   ├── [next.config.ts](./chat/next.config.ts)
│   ├── [package.json](./chat/package.json)
│   ├── [playwright.config.ts](./chat/playwright.config.ts)
│   ├── [postcss.config.mjs](./chat/postcss.config.mjs)
│   └── [tsconfig.json](./chat/tsconfig.json)
├── messaging/
│   ├── docs/
│   │   ├── [ARCHITECTURE.md](./messaging/docs/ARCHITECTURE.md)
│   │   ├── [CONTRIBUTING.md](./messaging/docs/CONTRIBUTING.md)
│   │   ├── [DOWNLOADS.md](./messaging/docs/DOWNLOADS.md)
│   │   ├── [PACKAGING.md](./messaging/docs/PACKAGING.md)
│   │   └── [ROADMAP.md](./messaging/docs/ROADMAP.md)
│   ├── public/
│   │   ├── icons/
│   │   │   ├── [icon-128x128.png](./messaging/public/icons/icon-128x128.png)
│   │   │   ├── [icon-144x144.png](./messaging/public/icons/icon-144x144.png)
│   │   │   ├── [icon-152x152.png](./messaging/public/icons/icon-152x152.png)
│   │   │   ├── [icon-16x16.png](./messaging/public/icons/icon-16x16.png)
│   │   │   ├── [icon-180x180.png](./messaging/public/icons/icon-180x180.png)
│   │   │   ├── [icon-192x192.png](./messaging/public/icons/icon-192x192.png)
│   │   │   ├── [icon-256x256.png](./messaging/public/icons/icon-256x256.png)
│   │   │   ├── [icon-32x32.png](./messaging/public/icons/icon-32x32.png)
│   │   │   ├── [icon-384x384.png](./messaging/public/icons/icon-384x384.png)
│   │   │   ├── [icon-48x48.png](./messaging/public/icons/icon-48x48.png)
│   │   │   ├── [icon-512x512.png](./messaging/public/icons/icon-512x512.png)
│   │   │   ├── [icon-64x64.png](./messaging/public/icons/icon-64x64.png)
│   │   │   ├── [icon-72x72.png](./messaging/public/icons/icon-72x72.png)
│   │   │   ├── [icon-96x96.png](./messaging/public/icons/icon-96x96.png)
│   │   │   └── [icon.svg](./messaging/public/icons/icon.svg)
│   │   ├── [apple-touch-icon.png](./messaging/public/apple-touch-icon.png)
│   │   ├── [favicon.ico](./messaging/public/favicon.ico)
│   │   ├── [manifest.json](./messaging/public/manifest.json)
│   │   ├── [robots.txt](./messaging/public/robots.txt)
│   │   ├── [sitemap.xml](./messaging/public/sitemap.xml)
│   │   └── [sw.js](./messaging/public/sw.js)
│   ├── src/
│   │   ├── app/
│   │   │   ├── (app)/
│   │   │   │   ├── chat/
│   │   │   │   └── settings/
│   │   │   │       └── [page.tsx](./messaging/src/app/(app)/settings/page.tsx)
│   │   │   ├── (auth)/
│   │   │   │   ├── forget-password/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./messaging/src/app/(auth)/forget-password/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./messaging/src/app/(auth)/forget-password/page.tsx)
│   │   │   │   ├── profile/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./messaging/src/app/(auth)/profile/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./messaging/src/app/(auth)/profile/page.tsx)
│   │   │   │   ├── reset-password/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./messaging/src/app/(auth)/reset-password/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./messaging/src/app/(auth)/reset-password/page.tsx)
│   │   │   │   ├── sign-in/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./messaging/src/app/(auth)/sign-in/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./messaging/src/app/(auth)/sign-in/page.tsx)
│   │   │   │   └── sign-up/
│   │   │   │       ├── __tests__/
│   │   │   │       │   └── [page.test.tsx](./messaging/src/app/(auth)/sign-up/__tests__/page.test.tsx)
│   │   │   │       └── [page.tsx](./messaging/src/app/(auth)/sign-up/page.tsx)
│   │   │   ├── (info)/
│   │   │   │   ├── about/
│   │   │   │   │   └── [page.tsx](./messaging/src/app/(info)/about/page.tsx)
│   │   │   │   ├── downloads/
│   │   │   │   │   └── [page.tsx](./messaging/src/app/(info)/downloads/page.tsx)
│   │   │   │   └── version/
│   │   │   │       └── [page.tsx](./messaging/src/app/(info)/version/page.tsx)
│   │   │   ├── __tests__/
│   │   │   │   ├── [about-page.test.tsx](./messaging/src/app/__tests__/about-page.test.tsx)
│   │   │   │   ├── [downloads-page.test.tsx](./messaging/src/app/__tests__/downloads-page.test.tsx)
│   │   │   │   ├── [error-page.test.tsx](./messaging/src/app/__tests__/error-page.test.tsx)
│   │   │   │   ├── [error.test.tsx](./messaging/src/app/__tests__/error.test.tsx)
│   │   │   │   ├── [forbidden.test.tsx](./messaging/src/app/__tests__/forbidden.test.tsx)
│   │   │   │   ├── [global-error.test.tsx](./messaging/src/app/__tests__/global-error.test.tsx)
│   │   │   │   ├── [home-page.test.tsx](./messaging/src/app/__tests__/home-page.test.tsx)
│   │   │   │   ├── [layout.test.tsx](./messaging/src/app/__tests__/layout.test.tsx)
│   │   │   │   ├── [loading.test.tsx](./messaging/src/app/__tests__/loading.test.tsx)
│   │   │   │   ├── [not-found-page.test.tsx](./messaging/src/app/__tests__/not-found-page.test.tsx)
│   │   │   │   ├── [not-found.test.tsx](./messaging/src/app/__tests__/not-found.test.tsx)
│   │   │   │   ├── [robots.test.ts](./messaging/src/app/__tests__/robots.test.ts)
│   │   │   │   ├── [settings-page.test.tsx](./messaging/src/app/__tests__/settings-page.test.tsx)
│   │   │   │   ├── [template.test.tsx](./messaging/src/app/__tests__/template.test.tsx)
│   │   │   │   ├── [unauthorized.test.tsx](./messaging/src/app/__tests__/unauthorized.test.tsx)
│   │   │   │   └── [version-page.test.tsx](./messaging/src/app/__tests__/version-page.test.tsx)
│   │   │   ├── [default.tsx](./messaging/src/app/default.tsx)
│   │   │   ├── [error.tsx](./messaging/src/app/error.tsx)
│   │   │   ├── [favicon.ico](./messaging/src/app/favicon.ico)
│   │   │   ├── [forbidden.tsx](./messaging/src/app/forbidden.tsx)
│   │   │   ├── [global-error.tsx](./messaging/src/app/global-error.tsx)
│   │   │   ├── [layout.tsx](./messaging/src/app/layout.tsx)
│   │   │   ├── [loading.tsx](./messaging/src/app/loading.tsx)
│   │   │   ├── [not-found.tsx](./messaging/src/app/not-found.tsx)
│   │   │   ├── [page.tsx](./messaging/src/app/page.tsx)
│   │   │   ├── [robots.ts](./messaging/src/app/robots.ts)
│   │   │   ├── [template.tsx](./messaging/src/app/template.tsx)
│   │   │   └── [unauthorized.tsx](./messaging/src/app/unauthorized.tsx)
│   │   ├── components/
│   │   │   ├── atoms/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [Avatar.test.tsx](./messaging/src/components/atoms/__tests__/Avatar.test.tsx)
│   │   │   │   │   ├── [Badge.test.tsx](./messaging/src/components/atoms/__tests__/Badge.test.tsx)
│   │   │   │   │   ├── [EmptyState.test.tsx](./messaging/src/components/atoms/__tests__/EmptyState.test.tsx)
│   │   │   │   │   ├── [IconButton.test.tsx](./messaging/src/components/atoms/__tests__/IconButton.test.tsx)
│   │   │   │   │   ├── [StatusDot.test.tsx](./messaging/src/components/atoms/__tests__/StatusDot.test.tsx)
│   │   │   │   │   └── [TypingIndicator.test.tsx](./messaging/src/components/atoms/__tests__/TypingIndicator.test.tsx)
│   │   │   │   ├── [Avatar.tsx](./messaging/src/components/atoms/Avatar.tsx)
│   │   │   │   ├── [Badge.tsx](./messaging/src/components/atoms/Badge.tsx)
│   │   │   │   ├── [EmptyState.tsx](./messaging/src/components/atoms/EmptyState.tsx)
│   │   │   │   ├── [IconButton.tsx](./messaging/src/components/atoms/IconButton.tsx)
│   │   │   │   ├── [StatusDot.tsx](./messaging/src/components/atoms/StatusDot.tsx)
│   │   │   │   └── [TypingIndicator.tsx](./messaging/src/components/atoms/TypingIndicator.tsx)
│   │   │   ├── molecules/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [CallControls.test.tsx](./messaging/src/components/molecules/__tests__/CallControls.test.tsx)
│   │   │   │   │   ├── [ChatHeader.test.tsx](./messaging/src/components/molecules/__tests__/ChatHeader.test.tsx)
│   │   │   │   │   ├── [ChatListItem.test.tsx](./messaging/src/components/molecules/__tests__/ChatListItem.test.tsx)
│   │   │   │   │   ├── [ChatSearchBar.test.tsx](./messaging/src/components/molecules/__tests__/ChatSearchBar.test.tsx)
│   │   │   │   │   ├── [Composer.test.tsx](./messaging/src/components/molecules/__tests__/Composer.test.tsx)
│   │   │   │   │   ├── [ContactRow.test.tsx](./messaging/src/components/molecules/__tests__/ContactRow.test.tsx)
│   │   │   │   │   ├── [DateDivider.test.tsx](./messaging/src/components/molecules/__tests__/DateDivider.test.tsx)
│   │   │   │   │   ├── [EmojiAutocomplete.test.tsx](./messaging/src/components/molecules/__tests__/EmojiAutocomplete.test.tsx)
│   │   │   │   │   ├── [LinkPreviewCard.test.tsx](./messaging/src/components/molecules/__tests__/LinkPreviewCard.test.tsx)
│   │   │   │   │   ├── [MediaComposer.test.tsx](./messaging/src/components/molecules/__tests__/MediaComposer.test.tsx)
│   │   │   │   │   ├── [MessageBubble.test.tsx](./messaging/src/components/molecules/__tests__/MessageBubble.test.tsx)
│   │   │   │   │   ├── [MessageContextMenu.test.tsx](./messaging/src/components/molecules/__tests__/MessageContextMenu.test.tsx)
│   │   │   │   │   ├── [ReactionBar.test.tsx](./messaging/src/components/molecules/__tests__/ReactionBar.test.tsx)
│   │   │   │   │   ├── [ReplyComposer.test.tsx](./messaging/src/components/molecules/__tests__/ReplyComposer.test.tsx)
│   │   │   │   │   ├── [SearchBar.test.tsx](./messaging/src/components/molecules/__tests__/SearchBar.test.tsx)
│   │   │   │   │   ├── [SecretChatBanner.test.tsx](./messaging/src/components/molecules/__tests__/SecretChatBanner.test.tsx)
│   │   │   │   │   ├── [StickerPicker.test.tsx](./messaging/src/components/molecules/__tests__/StickerPicker.test.tsx)
│   │   │   │   │   ├── [ToastViewport.test.tsx](./messaging/src/components/molecules/__tests__/ToastViewport.test.tsx)
│   │   │   │   │   ├── [VerificationCodeModal.test.tsx](./messaging/src/components/molecules/__tests__/VerificationCodeModal.test.tsx)
│   │   │   │   │   └── [VoiceRecorder.test.tsx](./messaging/src/components/molecules/__tests__/VoiceRecorder.test.tsx)
│   │   │   │   ├── [CallControls.tsx](./messaging/src/components/molecules/CallControls.tsx)
│   │   │   │   ├── [ChatHeader.tsx](./messaging/src/components/molecules/ChatHeader.tsx)
│   │   │   │   ├── [ChatListItem.tsx](./messaging/src/components/molecules/ChatListItem.tsx)
│   │   │   │   ├── [ChatSearchBar.tsx](./messaging/src/components/molecules/ChatSearchBar.tsx)
│   │   │   │   ├── [Composer.tsx](./messaging/src/components/molecules/Composer.tsx)
│   │   │   │   ├── [ContactRow.tsx](./messaging/src/components/molecules/ContactRow.tsx)
│   │   │   │   ├── [DateDivider.tsx](./messaging/src/components/molecules/DateDivider.tsx)
│   │   │   │   ├── [EmojiAutocomplete.tsx](./messaging/src/components/molecules/EmojiAutocomplete.tsx)
│   │   │   │   ├── [LinkPreviewCard.tsx](./messaging/src/components/molecules/LinkPreviewCard.tsx)
│   │   │   │   ├── [MediaComposer.tsx](./messaging/src/components/molecules/MediaComposer.tsx)
│   │   │   │   ├── [MessageBubble.tsx](./messaging/src/components/molecules/MessageBubble.tsx)
│   │   │   │   ├── [MessageContextMenu.tsx](./messaging/src/components/molecules/MessageContextMenu.tsx)
│   │   │   │   ├── [ReactionBar.tsx](./messaging/src/components/molecules/ReactionBar.tsx)
│   │   │   │   ├── [ReplyComposer.tsx](./messaging/src/components/molecules/ReplyComposer.tsx)
│   │   │   │   ├── [SearchBar.tsx](./messaging/src/components/molecules/SearchBar.tsx)
│   │   │   │   ├── [SecretChatBanner.tsx](./messaging/src/components/molecules/SecretChatBanner.tsx)
│   │   │   │   ├── [StickerPicker.tsx](./messaging/src/components/molecules/StickerPicker.tsx)
│   │   │   │   ├── [ToastViewport.tsx](./messaging/src/components/molecules/ToastViewport.tsx)
│   │   │   │   ├── [VerificationCodeModal.tsx](./messaging/src/components/molecules/VerificationCodeModal.tsx)
│   │   │   │   └── [VoiceRecorder.tsx](./messaging/src/components/molecules/VoiceRecorder.tsx)
│   │   │   ├── organisms/
│   │   │   │   ├── ChatPane/
│   │   │   │   │   ├── [MessageList.tsx](./messaging/src/components/organisms/ChatPane/MessageList.tsx)
│   │   │   │   │   └── [useChatPaneHandlers.ts](./messaging/src/components/organisms/ChatPane/useChatPaneHandlers.ts)
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [BlockedContactsPanel.test.tsx](./messaging/src/components/organisms/__tests__/BlockedContactsPanel.test.tsx)
│   │   │   │   │   ├── [CallHistoryPanel.test.tsx](./messaging/src/components/organisms/__tests__/CallHistoryPanel.test.tsx)
│   │   │   │   │   ├── [CallScreen.test.tsx](./messaging/src/components/organisms/__tests__/CallScreen.test.tsx)
│   │   │   │   │   ├── [ChatPane.test.tsx](./messaging/src/components/organisms/__tests__/ChatPane.test.tsx)
│   │   │   │   │   ├── [ChatSettingsPanel.test.tsx](./messaging/src/components/organisms/__tests__/ChatSettingsPanel.test.tsx)
│   │   │   │   │   ├── [ChatSidebar.test.tsx](./messaging/src/components/organisms/__tests__/ChatSidebar.test.tsx)
│   │   │   │   │   ├── [DeviceSyncPanel.test.tsx](./messaging/src/components/organisms/__tests__/DeviceSyncPanel.test.tsx)
│   │   │   │   │   ├── [DeviceTrustPanel.test.tsx](./messaging/src/components/organisms/__tests__/DeviceTrustPanel.test.tsx)
│   │   │   │   │   ├── [ForwardModal.test.tsx](./messaging/src/components/organisms/__tests__/ForwardModal.test.tsx)
│   │   │   │   │   ├── [GroupAdminPanel.test.tsx](./messaging/src/components/organisms/__tests__/GroupAdminPanel.test.tsx)
│   │   │   │   │   ├── [GroupCallView.test.tsx](./messaging/src/components/organisms/__tests__/GroupCallView.test.tsx)
│   │   │   │   │   ├── [ImageLightbox.test.tsx](./messaging/src/components/organisms/__tests__/ImageLightbox.test.tsx)
│   │   │   │   │   ├── [IncomingCallModal.test.tsx](./messaging/src/components/organisms/__tests__/IncomingCallModal.test.tsx)
│   │   │   │   │   ├── [MediaGallery.test.tsx](./messaging/src/components/organisms/__tests__/MediaGallery.test.tsx)
│   │   │   │   │   ├── [NewChatModal.test.tsx](./messaging/src/components/organisms/__tests__/NewChatModal.test.tsx)
│   │   │   │   │   ├── [PairingModal.test.tsx](./messaging/src/components/organisms/__tests__/PairingModal.test.tsx)
│   │   │   │   │   ├── [PinLockScreen.test.tsx](./messaging/src/components/organisms/__tests__/PinLockScreen.test.tsx)
│   │   │   │   │   └── [PrivacySettingsPanel.test.tsx](./messaging/src/components/organisms/__tests__/PrivacySettingsPanel.test.tsx)
│   │   │   │   ├── [BlockedContactsPanel.tsx](./messaging/src/components/organisms/BlockedContactsPanel.tsx)
│   │   │   │   ├── [CallHistoryPanel.tsx](./messaging/src/components/organisms/CallHistoryPanel.tsx)
│   │   │   │   ├── [CallScreen.tsx](./messaging/src/components/organisms/CallScreen.tsx)
│   │   │   │   ├── [ChatPane.tsx](./messaging/src/components/organisms/ChatPane.tsx)
│   │   │   │   ├── [ChatSettingsPanel.tsx](./messaging/src/components/organisms/ChatSettingsPanel.tsx)
│   │   │   │   ├── [ChatSidebar.tsx](./messaging/src/components/organisms/ChatSidebar.tsx)
│   │   │   │   ├── [DeviceSyncPanel.tsx](./messaging/src/components/organisms/DeviceSyncPanel.tsx)
│   │   │   │   ├── [DeviceTrustPanel.tsx](./messaging/src/components/organisms/DeviceTrustPanel.tsx)
│   │   │   │   ├── [ForwardModal.tsx](./messaging/src/components/organisms/ForwardModal.tsx)
│   │   │   │   ├── [GroupAdminPanel.tsx](./messaging/src/components/organisms/GroupAdminPanel.tsx)
│   │   │   │   ├── [GroupCallView.tsx](./messaging/src/components/organisms/GroupCallView.tsx)
│   │   │   │   ├── [ImageLightbox.tsx](./messaging/src/components/organisms/ImageLightbox.tsx)
│   │   │   │   ├── [IncomingCallModal.tsx](./messaging/src/components/organisms/IncomingCallModal.tsx)
│   │   │   │   ├── [MediaGallery.tsx](./messaging/src/components/organisms/MediaGallery.tsx)
│   │   │   │   ├── [NewChatModal.tsx](./messaging/src/components/organisms/NewChatModal.tsx)
│   │   │   │   ├── [PairingModal.tsx](./messaging/src/components/organisms/PairingModal.tsx)
│   │   │   │   ├── [PinLockScreen.tsx](./messaging/src/components/organisms/PinLockScreen.tsx)
│   │   │   │   └── [PrivacySettingsPanel.tsx](./messaging/src/components/organisms/PrivacySettingsPanel.tsx)
│   │   │   └── templates/
│   │   │       ├── __tests__/
│   │   │       │   ├── [AboutTemplate.test.tsx](./messaging/src/components/templates/__tests__/AboutTemplate.test.tsx)
│   │   │       │   ├── [AppShell.test.tsx](./messaging/src/components/templates/__tests__/AppShell.test.tsx)
│   │   │       │   ├── [DownloadsTemplate.test.tsx](./messaging/src/components/templates/__tests__/DownloadsTemplate.test.tsx)
│   │   │       │   ├── [ErrorTemplate.test.tsx](./messaging/src/components/templates/__tests__/ErrorTemplate.test.tsx)
│   │   │       │   └── [VersionTemplate.test.tsx](./messaging/src/components/templates/__tests__/VersionTemplate.test.tsx)
│   │   │       ├── [AboutTemplate.tsx](./messaging/src/components/templates/AboutTemplate.tsx)
│   │   │       ├── [AppShell.tsx](./messaging/src/components/templates/AppShell.tsx)
│   │   │       ├── [DownloadsTemplate.tsx](./messaging/src/components/templates/DownloadsTemplate.tsx)
│   │   │       ├── [ErrorTemplate.tsx](./messaging/src/components/templates/ErrorTemplate.tsx)
│   │   │       └── [VersionTemplate.tsx](./messaging/src/components/templates/VersionTemplate.tsx)
│   │   ├── data/
│   │   │   ├── __tests__/
│   │   │   │   ├── [models.test.ts](./messaging/src/data/__tests__/models.test.ts)
│   │   │   │   └── [seed.test.ts](./messaging/src/data/__tests__/seed.test.ts)
│   │   │   ├── [models.ts](./messaging/src/data/models.ts)
│   │   │   ├── [seed.ts](./messaging/src/data/seed.ts)
│   │   │   └── [stickers.ts](./messaging/src/data/stickers.ts)
│   │   ├── hooks/
│   │   │   ├── __tests__/
│   │   │   │   └── [useSWRegister.test.ts](./messaging/src/hooks/__tests__/useSWRegister.test.ts)
│   │   │   ├── [useAuthActions.ts](./messaging/src/hooks/useAuthActions.ts)
│   │   │   ├── [useCallActions.ts](./messaging/src/hooks/useCallActions.ts)
│   │   │   ├── [useChatActions.ts](./messaging/src/hooks/useChatActions.ts)
│   │   │   ├── [useDataEffects.ts](./messaging/src/hooks/useDataEffects.ts)
│   │   │   ├── [useMessageActions.ts](./messaging/src/hooks/useMessageActions.ts)
│   │   │   ├── [usePeerActions.ts](./messaging/src/hooks/usePeerActions.ts)
│   │   │   ├── [usePrivacyActions.ts](./messaging/src/hooks/usePrivacyActions.ts)
│   │   │   ├── [useSWRegister.ts](./messaging/src/hooks/useSWRegister.ts)
│   │   │   └── [useSettingsActions.ts](./messaging/src/hooks/useSettingsActions.ts)
│   │   ├── lib/
│   │   │   ├── __tests__/
│   │   │   │   ├── [crypto.test.ts](./messaging/src/lib/__tests__/crypto.test.ts)
│   │   │   │   ├── [db.test.ts](./messaging/src/lib/__tests__/db.test.ts)
│   │   │   │   ├── [format.test.ts](./messaging/src/lib/__tests__/format.test.ts)
│   │   │   │   ├── [selectors.test.ts](./messaging/src/lib/__tests__/selectors.test.ts)
│   │   │   │   ├── [url.test.ts](./messaging/src/lib/__tests__/url.test.ts)
│   │   │   │   └── [webrtc.test.ts](./messaging/src/lib/__tests__/webrtc.test.ts)
│   │   │   ├── [crypto.ts](./messaging/src/lib/crypto.ts)
│   │   │   ├── [db.ts](./messaging/src/lib/db.ts)
│   │   │   ├── [format.ts](./messaging/src/lib/format.ts)
│   │   │   ├── [selectors.ts](./messaging/src/lib/selectors.ts)
│   │   │   ├── [url.ts](./messaging/src/lib/url.ts)
│   │   │   └── [webrtc.ts](./messaging/src/lib/webrtc.ts)
│   │   ├── providers/
│   │   │   ├── __tests__/
│   │   │   │   ├── [DataProvider.test.tsx](./messaging/src/providers/__tests__/DataProvider.test.tsx)
│   │   │   │   ├── [Providers.test.tsx](./messaging/src/providers/__tests__/Providers.test.tsx)
│   │   │   │   ├── [SWProvider.test.tsx](./messaging/src/providers/__tests__/SWProvider.test.tsx)
│   │   │   │   └── [ToastProvider.test.tsx](./messaging/src/providers/__tests__/ToastProvider.test.tsx)
│   │   │   ├── [DataContext.ts](./messaging/src/providers/DataContext.ts)
│   │   │   ├── [DataProvider.tsx](./messaging/src/providers/DataProvider.tsx)
│   │   │   ├── [Providers.tsx](./messaging/src/providers/Providers.tsx)
│   │   │   ├── [SWProvider.tsx](./messaging/src/providers/SWProvider.tsx)
│   │   │   ├── [ToastProvider.tsx](./messaging/src/providers/ToastProvider.tsx)
│   │   │   └── [data-helpers.ts](./messaging/src/providers/data-helpers.ts)
│   │   ├── styles/
│   │   │   ├── [base.css](./messaging/src/styles/base.css)
│   │   │   ├── [globals.css](./messaging/src/styles/globals.css)
│   │   │   └── [themes.css](./messaging/src/styles/themes.css)
│   │   └── types/
│   │       ├── [call.ts](./messaging/src/types/call.ts)
│   │       ├── [chat.ts](./messaging/src/types/chat.ts)
│   │       ├── [index.ts](./messaging/src/types/index.ts)
│   │       ├── [message.ts](./messaging/src/types/message.ts)
│   │       ├── [peer.ts](./messaging/src/types/peer.ts)
│   │       ├── [settings.ts](./messaging/src/types/settings.ts)
│   │       └── [user.ts](./messaging/src/types/user.ts)
│   ├── src-tauri/
│   │   ├── capabilities/
│   │   │   └── [default.json](./messaging/src-tauri/capabilities/default.json)
│   │   ├── icons/
│   │   │   ├── [128x128.png](./messaging/src-tauri/icons/128x128.png)
│   │   │   ├── [128x128@2x.png](./messaging/src-tauri/icons/128x128@2x.png)
│   │   │   ├── [32x32.png](./messaging/src-tauri/icons/32x32.png)
│   │   │   ├── [Square107x107Logo.png](./messaging/src-tauri/icons/Square107x107Logo.png)
│   │   │   ├── [Square142x142Logo.png](./messaging/src-tauri/icons/Square142x142Logo.png)
│   │   │   ├── [Square150x150Logo.png](./messaging/src-tauri/icons/Square150x150Logo.png)
│   │   │   ├── [Square284x284Logo.png](./messaging/src-tauri/icons/Square284x284Logo.png)
│   │   │   ├── [Square30x30Logo.png](./messaging/src-tauri/icons/Square30x30Logo.png)
│   │   │   ├── [Square310x310Logo.png](./messaging/src-tauri/icons/Square310x310Logo.png)
│   │   │   ├── [Square44x44Logo.png](./messaging/src-tauri/icons/Square44x44Logo.png)
│   │   │   ├── [Square71x71Logo.png](./messaging/src-tauri/icons/Square71x71Logo.png)
│   │   │   ├── [Square89x89Logo.png](./messaging/src-tauri/icons/Square89x89Logo.png)
│   │   │   ├── [StoreLogo.png](./messaging/src-tauri/icons/StoreLogo.png)
│   │   │   ├── [icon.icns](./messaging/src-tauri/icons/icon.icns)
│   │   │   ├── [icon.ico](./messaging/src-tauri/icons/icon.ico)
│   │   │   └── [icon.png](./messaging/src-tauri/icons/icon.png)
│   │   ├── src/
│   │   │   ├── [lib.rs](./messaging/src-tauri/src/lib.rs)
│   │   │   └── [main.rs](./messaging/src-tauri/src/main.rs)
│   │   ├── [Cargo.lock](./messaging/src-tauri/Cargo.lock)
│   │   ├── [Cargo.toml](./messaging/src-tauri/Cargo.toml)
│   │   ├── [build.rs](./messaging/src-tauri/build.rs)
│   │   └── [tauri.conf.json](./messaging/src-tauri/tauri.conf.json)
│   ├── tests/
│   │   └── [fake-indexeddb.d.ts](./messaging/tests/fake-indexeddb.d.ts)
│   ├── [AGENTS.md](./messaging/AGENTS.md)
│   ├── [Dockerfile](./messaging/Dockerfile)
│   ├── [LICENSE](./messaging/LICENSE)
│   ├── [README.md](./messaging/README.md)
│   ├── [docker-compose.yaml](./messaging/docker-compose.yaml)
│   ├── [eslint.config.mts](./messaging/eslint.config.mts)
│   ├── [jest.config.ts](./messaging/jest.config.ts)
│   ├── [jest.setup.ts](./messaging/jest.setup.ts)
│   ├── [next.config.ts](./messaging/next.config.ts)
│   ├── [package.json](./messaging/package.json)
│   ├── [playwright.config.ts](./messaging/playwright.config.ts)
│   ├── [postcss.config.mjs](./messaging/postcss.config.mjs)
│   └── [tsconfig.json](./messaging/tsconfig.json)
├── [README.md](./README.md)
└── [TREE.md](./TREE.md)
```

132 directories, 472 files
