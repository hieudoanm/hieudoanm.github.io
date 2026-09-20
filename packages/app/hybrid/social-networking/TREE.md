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
│   │   ├── [downloads.spec.ts](./chat/e2e/downloads.spec.ts)
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
│   │   │   │   ├── [Header.tsx](./chat/src/components/organisms/Header.tsx)
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
│   │   │   └── [FullScreen.tsx](./chat/src/components/FullScreen.tsx)
│   │   ├── content/
│   │   │   ├── [about.ts](./chat/src/content/about.ts)
│   │   │   ├── [download.ts](./chat/src/content/download.ts)
│   │   │   └── [version.ts](./chat/src/content/version.ts)
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
│   │   │   ├── [SWProvider.tsx](./chat/src/providers/SWProvider.tsx)
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
│   │   │   ├── android/
│   │   │   │   ├── mipmap-anydpi-v26/
│   │   │   │   │   └── [ic_launcher.xml](./chat/src-tauri/icons/android/mipmap-anydpi-v26/ic_launcher.xml)
│   │   │   │   ├── mipmap-hdpi/
│   │   │   │   │   ├── [ic_launcher.png](./chat/src-tauri/icons/android/mipmap-hdpi/ic_launcher.png)
│   │   │   │   │   ├── [ic_launcher_foreground.png](./chat/src-tauri/icons/android/mipmap-hdpi/ic_launcher_foreground.png)
│   │   │   │   │   └── [ic_launcher_round.png](./chat/src-tauri/icons/android/mipmap-hdpi/ic_launcher_round.png)
│   │   │   │   ├── mipmap-mdpi/
│   │   │   │   │   ├── [ic_launcher.png](./chat/src-tauri/icons/android/mipmap-mdpi/ic_launcher.png)
│   │   │   │   │   ├── [ic_launcher_foreground.png](./chat/src-tauri/icons/android/mipmap-mdpi/ic_launcher_foreground.png)
│   │   │   │   │   └── [ic_launcher_round.png](./chat/src-tauri/icons/android/mipmap-mdpi/ic_launcher_round.png)
│   │   │   │   ├── mipmap-xhdpi/
│   │   │   │   │   ├── [ic_launcher.png](./chat/src-tauri/icons/android/mipmap-xhdpi/ic_launcher.png)
│   │   │   │   │   ├── [ic_launcher_foreground.png](./chat/src-tauri/icons/android/mipmap-xhdpi/ic_launcher_foreground.png)
│   │   │   │   │   └── [ic_launcher_round.png](./chat/src-tauri/icons/android/mipmap-xhdpi/ic_launcher_round.png)
│   │   │   │   ├── mipmap-xxhdpi/
│   │   │   │   │   ├── [ic_launcher.png](./chat/src-tauri/icons/android/mipmap-xxhdpi/ic_launcher.png)
│   │   │   │   │   ├── [ic_launcher_foreground.png](./chat/src-tauri/icons/android/mipmap-xxhdpi/ic_launcher_foreground.png)
│   │   │   │   │   └── [ic_launcher_round.png](./chat/src-tauri/icons/android/mipmap-xxhdpi/ic_launcher_round.png)
│   │   │   │   ├── mipmap-xxxhdpi/
│   │   │   │   │   ├── [ic_launcher.png](./chat/src-tauri/icons/android/mipmap-xxxhdpi/ic_launcher.png)
│   │   │   │   │   ├── [ic_launcher_foreground.png](./chat/src-tauri/icons/android/mipmap-xxxhdpi/ic_launcher_foreground.png)
│   │   │   │   │   └── [ic_launcher_round.png](./chat/src-tauri/icons/android/mipmap-xxxhdpi/ic_launcher_round.png)
│   │   │   │   └── values/
│   │   │   │       └── [ic_launcher_background.xml](./chat/src-tauri/icons/android/values/ic_launcher_background.xml)
│   │   │   ├── ios/
│   │   │   │   ├── [AppIcon-20x20@1x.png](./chat/src-tauri/icons/ios/AppIcon-20x20@1x.png)
│   │   │   │   ├── [AppIcon-20x20@2x-1.png](./chat/src-tauri/icons/ios/AppIcon-20x20@2x-1.png)
│   │   │   │   ├── [AppIcon-20x20@2x.png](./chat/src-tauri/icons/ios/AppIcon-20x20@2x.png)
│   │   │   │   ├── [AppIcon-20x20@3x.png](./chat/src-tauri/icons/ios/AppIcon-20x20@3x.png)
│   │   │   │   ├── [AppIcon-29x29@1x.png](./chat/src-tauri/icons/ios/AppIcon-29x29@1x.png)
│   │   │   │   ├── [AppIcon-29x29@2x-1.png](./chat/src-tauri/icons/ios/AppIcon-29x29@2x-1.png)
│   │   │   │   ├── [AppIcon-29x29@2x.png](./chat/src-tauri/icons/ios/AppIcon-29x29@2x.png)
│   │   │   │   ├── [AppIcon-29x29@3x.png](./chat/src-tauri/icons/ios/AppIcon-29x29@3x.png)
│   │   │   │   ├── [AppIcon-40x40@1x.png](./chat/src-tauri/icons/ios/AppIcon-40x40@1x.png)
│   │   │   │   ├── [AppIcon-40x40@2x-1.png](./chat/src-tauri/icons/ios/AppIcon-40x40@2x-1.png)
│   │   │   │   ├── [AppIcon-40x40@2x.png](./chat/src-tauri/icons/ios/AppIcon-40x40@2x.png)
│   │   │   │   ├── [AppIcon-40x40@3x.png](./chat/src-tauri/icons/ios/AppIcon-40x40@3x.png)
│   │   │   │   ├── [AppIcon-512@2x.png](./chat/src-tauri/icons/ios/AppIcon-512@2x.png)
│   │   │   │   ├── [AppIcon-60x60@2x.png](./chat/src-tauri/icons/ios/AppIcon-60x60@2x.png)
│   │   │   │   ├── [AppIcon-60x60@3x.png](./chat/src-tauri/icons/ios/AppIcon-60x60@3x.png)
│   │   │   │   ├── [AppIcon-76x76@1x.png](./chat/src-tauri/icons/ios/AppIcon-76x76@1x.png)
│   │   │   │   ├── [AppIcon-76x76@2x.png](./chat/src-tauri/icons/ios/AppIcon-76x76@2x.png)
│   │   │   │   └── [AppIcon-83.5x83.5@2x.png](./chat/src-tauri/icons/ios/AppIcon-83.5x83.5@2x.png)
│   │   │   ├── [128x128.png](./chat/src-tauri/icons/128x128.png)
│   │   │   ├── [128x128@2x.png](./chat/src-tauri/icons/128x128@2x.png)
│   │   │   ├── [256x256.png](./chat/src-tauri/icons/256x256.png)
│   │   │   ├── [32x32.png](./chat/src-tauri/icons/32x32.png)
│   │   │   ├── [64x64.png](./chat/src-tauri/icons/64x64.png)
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
│   │   │   ├── [create-icons.sh](./chat/src-tauri/icons/create-icons.sh)
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
├── [README.md](./README.md)
└── [TREE.md](./TREE.md)
```

92 directories, 262 files
