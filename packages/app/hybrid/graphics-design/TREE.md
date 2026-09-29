# TREE

```text
├── exibit/
│   ├── docs/
│   │   ├── [ARCHITECTURE.md](./exibit/docs/ARCHITECTURE.md)
│   │   ├── [CONTRIBUTING.md](./exibit/docs/CONTRIBUTING.md)
│   │   ├── [DOWNLOADS.md](./exibit/docs/DOWNLOADS.md)
│   │   ├── [PACKAGING.md](./exibit/docs/PACKAGING.md)
│   │   └── [ROADMAP.md](./exibit/docs/ROADMAP.md)
│   ├── e2e/
│   │   ├── screenshots/
│   │   │   ├── [about.png](./exibit/e2e/screenshots/about.png)
│   │   │   ├── [downloads.png](./exibit/e2e/screenshots/downloads.png)
│   │   │   ├── [home.png](./exibit/e2e/screenshots/home.png)
│   │   │   └── [version.png](./exibit/e2e/screenshots/version.png)
│   │   ├── [about.spec.ts](./exibit/e2e/about.spec.ts)
│   │   ├── [downloads.spec.ts](./exibit/e2e/downloads.spec.ts)
│   │   ├── [home.spec.ts](./exibit/e2e/home.spec.ts)
│   │   └── [version.spec.ts](./exibit/e2e/version.spec.ts)
│   ├── public/
│   │   ├── icons/
│   │   │   ├── [icon-128x128.png](./exibit/public/icons/icon-128x128.png)
│   │   │   ├── [icon-144x144.png](./exibit/public/icons/icon-144x144.png)
│   │   │   ├── [icon-152x152.png](./exibit/public/icons/icon-152x152.png)
│   │   │   ├── [icon-16x16.png](./exibit/public/icons/icon-16x16.png)
│   │   │   ├── [icon-180x180.png](./exibit/public/icons/icon-180x180.png)
│   │   │   ├── [icon-192x192.png](./exibit/public/icons/icon-192x192.png)
│   │   │   ├── [icon-256x256.png](./exibit/public/icons/icon-256x256.png)
│   │   │   ├── [icon-32x32.png](./exibit/public/icons/icon-32x32.png)
│   │   │   ├── [icon-384x384.png](./exibit/public/icons/icon-384x384.png)
│   │   │   ├── [icon-48x48.png](./exibit/public/icons/icon-48x48.png)
│   │   │   ├── [icon-512x512.png](./exibit/public/icons/icon-512x512.png)
│   │   │   ├── [icon-64x64.png](./exibit/public/icons/icon-64x64.png)
│   │   │   ├── [icon-72x72.png](./exibit/public/icons/icon-72x72.png)
│   │   │   ├── [icon-96x96.png](./exibit/public/icons/icon-96x96.png)
│   │   │   └── [icon.svg](./exibit/public/icons/icon.svg)
│   │   ├── [apple-touch-icon.png](./exibit/public/apple-touch-icon.png)
│   │   ├── [favicon.ico](./exibit/public/favicon.ico)
│   │   ├── [manifest.json](./exibit/public/manifest.json)
│   │   ├── [robots.txt](./exibit/public/robots.txt)
│   │   ├── [sitemap.xml](./exibit/public/sitemap.xml)
│   │   └── [sw.js](./exibit/public/sw.js)
│   ├── src/
│   │   ├── __tests__/
│   │   │   ├── [about.test.tsx](./exibit/src/__tests__/about.test.tsx)
│   │   │   ├── [error.test.tsx](./exibit/src/__tests__/error.test.tsx)
│   │   │   ├── [global-error.test.tsx](./exibit/src/__tests__/global-error.test.tsx)
│   │   │   ├── [layout.test.tsx](./exibit/src/__tests__/layout.test.tsx)
│   │   │   ├── [not-found.test.tsx](./exibit/src/__tests__/not-found.test.tsx)
│   │   │   └── [version.test.tsx](./exibit/src/__tests__/version.test.tsx)
│   │   ├── app/
│   │   │   ├── (app)/
│   │   │   │   ├── chat/
│   │   │   │   │   ├── settings/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   └── [page.test.tsx](./exibit/src/app/(app)/chat/settings/__tests__/page.test.tsx)
│   │   │   │   │   │   └── [page.tsx](./exibit/src/app/(app)/chat/settings/page.tsx)
│   │   │   │   │   └── [page.tsx](./exibit/src/app/(app)/chat/page.tsx)
│   │   │   │   ├── menu/
│   │   │   │   │   └── [page.tsx](./exibit/src/app/(app)/menu/page.tsx)
│   │   │   │   └── pos/
│   │   │   │       └── [page.tsx](./exibit/src/app/(app)/pos/page.tsx)
│   │   │   ├── (auth)/
│   │   │   │   ├── forget-password/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./exibit/src/app/(auth)/forget-password/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./exibit/src/app/(auth)/forget-password/page.tsx)
│   │   │   │   ├── profile/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./exibit/src/app/(auth)/profile/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./exibit/src/app/(auth)/profile/page.tsx)
│   │   │   │   ├── reset-password/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./exibit/src/app/(auth)/reset-password/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./exibit/src/app/(auth)/reset-password/page.tsx)
│   │   │   │   ├── sign-in/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./exibit/src/app/(auth)/sign-in/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./exibit/src/app/(auth)/sign-in/page.tsx)
│   │   │   │   └── sign-up/
│   │   │   │       ├── __tests__/
│   │   │   │       │   └── [page.test.tsx](./exibit/src/app/(auth)/sign-up/__tests__/page.test.tsx)
│   │   │   │       └── [page.tsx](./exibit/src/app/(auth)/sign-up/page.tsx)
│   │   │   ├── (info)/
│   │   │   │   ├── about/
│   │   │   │   │   └── [page.tsx](./exibit/src/app/(info)/about/page.tsx)
│   │   │   │   ├── downloads/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./exibit/src/app/(info)/downloads/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./exibit/src/app/(info)/downloads/page.tsx)
│   │   │   │   └── version/
│   │   │   │       └── [page.tsx](./exibit/src/app/(info)/version/page.tsx)
│   │   │   ├── __tests__/
│   │   │   │   ├── [default.test.tsx](./exibit/src/app/__tests__/default.test.tsx)
│   │   │   │   ├── [error.test.tsx](./exibit/src/app/__tests__/error.test.tsx)
│   │   │   │   ├── [forbidden.test.tsx](./exibit/src/app/__tests__/forbidden.test.tsx)
│   │   │   │   ├── [global-error.test.tsx](./exibit/src/app/__tests__/global-error.test.tsx)
│   │   │   │   ├── [layout.test.tsx](./exibit/src/app/__tests__/layout.test.tsx)
│   │   │   │   ├── [loading.test.tsx](./exibit/src/app/__tests__/loading.test.tsx)
│   │   │   │   ├── [not-found.test.tsx](./exibit/src/app/__tests__/not-found.test.tsx)
│   │   │   │   ├── [robots.test.ts](./exibit/src/app/__tests__/robots.test.ts)
│   │   │   │   ├── [template.test.tsx](./exibit/src/app/__tests__/template.test.tsx)
│   │   │   │   └── [unauthorized.test.tsx](./exibit/src/app/__tests__/unauthorized.test.tsx)
│   │   │   ├── [default.tsx](./exibit/src/app/default.tsx)
│   │   │   ├── [error.tsx](./exibit/src/app/error.tsx)
│   │   │   ├── [favicon.ico](./exibit/src/app/favicon.ico)
│   │   │   ├── [forbidden.tsx](./exibit/src/app/forbidden.tsx)
│   │   │   ├── [global-error.tsx](./exibit/src/app/global-error.tsx)
│   │   │   ├── [layout.tsx](./exibit/src/app/layout.tsx)
│   │   │   ├── [loading.tsx](./exibit/src/app/loading.tsx)
│   │   │   ├── [not-found.tsx](./exibit/src/app/not-found.tsx)
│   │   │   ├── [page.tsx](./exibit/src/app/page.tsx)
│   │   │   ├── [robots.ts](./exibit/src/app/robots.ts)
│   │   │   ├── [template.tsx](./exibit/src/app/template.tsx)
│   │   │   └── [unauthorized.tsx](./exibit/src/app/unauthorized.tsx)
│   │   ├── components/
│   │   │   ├── menu/
│   │   │   │   ├── [CustomerMenu.tsx](./exibit/src/components/menu/CustomerMenu.tsx)
│   │   │   │   ├── [Header.tsx](./exibit/src/components/menu/Header.tsx)
│   │   │   │   ├── [MenuManager.tsx](./exibit/src/components/menu/MenuManager.tsx)
│   │   │   │   ├── [QrShare.tsx](./exibit/src/components/menu/QrShare.tsx)
│   │   │   │   ├── [RestaurantDashboard.tsx](./exibit/src/components/menu/RestaurantDashboard.tsx)
│   │   │   │   ├── [RestaurantManager.tsx](./exibit/src/components/menu/RestaurantManager.tsx)
│   │   │   │   ├── [index.ts](./exibit/src/components/menu/index.ts)
│   │   │   │   └── [types.ts](./exibit/src/components/menu/types.ts)
│   │   │   ├── messaging/
│   │   │   │   ├── atoms/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [Avatar.test.tsx](./exibit/src/components/messaging/atoms/__tests__/Avatar.test.tsx)
│   │   │   │   │   │   ├── [Badge.test.tsx](./exibit/src/components/messaging/atoms/__tests__/Badge.test.tsx)
│   │   │   │   │   │   ├── [EmptyState.test.tsx](./exibit/src/components/messaging/atoms/__tests__/EmptyState.test.tsx)
│   │   │   │   │   │   ├── [IconButton.test.tsx](./exibit/src/components/messaging/atoms/__tests__/IconButton.test.tsx)
│   │   │   │   │   │   ├── [StatusDot.test.tsx](./exibit/src/components/messaging/atoms/__tests__/StatusDot.test.tsx)
│   │   │   │   │   │   └── [TypingIndicator.test.tsx](./exibit/src/components/messaging/atoms/__tests__/TypingIndicator.test.tsx)
│   │   │   │   │   ├── [Avatar.tsx](./exibit/src/components/messaging/atoms/Avatar.tsx)
│   │   │   │   │   ├── [Badge.tsx](./exibit/src/components/messaging/atoms/Badge.tsx)
│   │   │   │   │   ├── [EmptyState.tsx](./exibit/src/components/messaging/atoms/EmptyState.tsx)
│   │   │   │   │   ├── [IconButton.tsx](./exibit/src/components/messaging/atoms/IconButton.tsx)
│   │   │   │   │   ├── [StatusDot.tsx](./exibit/src/components/messaging/atoms/StatusDot.tsx)
│   │   │   │   │   ├── [TypingIndicator.tsx](./exibit/src/components/messaging/atoms/TypingIndicator.tsx)
│   │   │   │   │   └── [index.ts](./exibit/src/components/messaging/atoms/index.ts)
│   │   │   │   ├── molecules/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [CallControls.test.tsx](./exibit/src/components/messaging/molecules/__tests__/CallControls.test.tsx)
│   │   │   │   │   │   ├── [ChatHeader.test.tsx](./exibit/src/components/messaging/molecules/__tests__/ChatHeader.test.tsx)
│   │   │   │   │   │   ├── [ChatListItem.test.tsx](./exibit/src/components/messaging/molecules/__tests__/ChatListItem.test.tsx)
│   │   │   │   │   │   ├── [ChatSearchBar.test.tsx](./exibit/src/components/messaging/molecules/__tests__/ChatSearchBar.test.tsx)
│   │   │   │   │   │   ├── [Composer.test.tsx](./exibit/src/components/messaging/molecules/__tests__/Composer.test.tsx)
│   │   │   │   │   │   ├── [ContactRow.test.tsx](./exibit/src/components/messaging/molecules/__tests__/ContactRow.test.tsx)
│   │   │   │   │   │   ├── [DateDivider.test.tsx](./exibit/src/components/messaging/molecules/__tests__/DateDivider.test.tsx)
│   │   │   │   │   │   ├── [EmojiAutocomplete.test.tsx](./exibit/src/components/messaging/molecules/__tests__/EmojiAutocomplete.test.tsx)
│   │   │   │   │   │   ├── [LinkPreviewCard.test.tsx](./exibit/src/components/messaging/molecules/__tests__/LinkPreviewCard.test.tsx)
│   │   │   │   │   │   ├── [MediaComposer.test.tsx](./exibit/src/components/messaging/molecules/__tests__/MediaComposer.test.tsx)
│   │   │   │   │   │   ├── [MessageBubble.test.tsx](./exibit/src/components/messaging/molecules/__tests__/MessageBubble.test.tsx)
│   │   │   │   │   │   ├── [MessageContextMenu.test.tsx](./exibit/src/components/messaging/molecules/__tests__/MessageContextMenu.test.tsx)
│   │   │   │   │   │   ├── [ReactionBar.test.tsx](./exibit/src/components/messaging/molecules/__tests__/ReactionBar.test.tsx)
│   │   │   │   │   │   ├── [ReplyComposer.test.tsx](./exibit/src/components/messaging/molecules/__tests__/ReplyComposer.test.tsx)
│   │   │   │   │   │   ├── [SearchBar.test.tsx](./exibit/src/components/messaging/molecules/__tests__/SearchBar.test.tsx)
│   │   │   │   │   │   ├── [SecretChatBanner.test.tsx](./exibit/src/components/messaging/molecules/__tests__/SecretChatBanner.test.tsx)
│   │   │   │   │   │   ├── [StickerPicker.test.tsx](./exibit/src/components/messaging/molecules/__tests__/StickerPicker.test.tsx)
│   │   │   │   │   │   ├── [ToastViewport.test.tsx](./exibit/src/components/messaging/molecules/__tests__/ToastViewport.test.tsx)
│   │   │   │   │   │   ├── [VerificationCodeModal.test.tsx](./exibit/src/components/messaging/molecules/__tests__/VerificationCodeModal.test.tsx)
│   │   │   │   │   │   └── [VoiceRecorder.test.tsx](./exibit/src/components/messaging/molecules/__tests__/VoiceRecorder.test.tsx)
│   │   │   │   │   ├── [CallControls.tsx](./exibit/src/components/messaging/molecules/CallControls.tsx)
│   │   │   │   │   ├── [ChatHeader.tsx](./exibit/src/components/messaging/molecules/ChatHeader.tsx)
│   │   │   │   │   ├── [ChatListItem.tsx](./exibit/src/components/messaging/molecules/ChatListItem.tsx)
│   │   │   │   │   ├── [ChatSearchBar.tsx](./exibit/src/components/messaging/molecules/ChatSearchBar.tsx)
│   │   │   │   │   ├── [Composer.tsx](./exibit/src/components/messaging/molecules/Composer.tsx)
│   │   │   │   │   ├── [ContactRow.tsx](./exibit/src/components/messaging/molecules/ContactRow.tsx)
│   │   │   │   │   ├── [DateDivider.tsx](./exibit/src/components/messaging/molecules/DateDivider.tsx)
│   │   │   │   │   ├── [EmojiAutocomplete.tsx](./exibit/src/components/messaging/molecules/EmojiAutocomplete.tsx)
│   │   │   │   │   ├── [LinkPreviewCard.tsx](./exibit/src/components/messaging/molecules/LinkPreviewCard.tsx)
│   │   │   │   │   ├── [MediaComposer.tsx](./exibit/src/components/messaging/molecules/MediaComposer.tsx)
│   │   │   │   │   ├── [MessageBubble.tsx](./exibit/src/components/messaging/molecules/MessageBubble.tsx)
│   │   │   │   │   ├── [MessageContextMenu.tsx](./exibit/src/components/messaging/molecules/MessageContextMenu.tsx)
│   │   │   │   │   ├── [ReactionBar.tsx](./exibit/src/components/messaging/molecules/ReactionBar.tsx)
│   │   │   │   │   ├── [ReplyComposer.tsx](./exibit/src/components/messaging/molecules/ReplyComposer.tsx)
│   │   │   │   │   ├── [SearchBar.tsx](./exibit/src/components/messaging/molecules/SearchBar.tsx)
│   │   │   │   │   ├── [SecretChatBanner.tsx](./exibit/src/components/messaging/molecules/SecretChatBanner.tsx)
│   │   │   │   │   ├── [StickerPicker.tsx](./exibit/src/components/messaging/molecules/StickerPicker.tsx)
│   │   │   │   │   ├── [ToastViewport.tsx](./exibit/src/components/messaging/molecules/ToastViewport.tsx)
│   │   │   │   │   ├── [VerificationCodeModal.tsx](./exibit/src/components/messaging/molecules/VerificationCodeModal.tsx)
│   │   │   │   │   ├── [VoiceRecorder.tsx](./exibit/src/components/messaging/molecules/VoiceRecorder.tsx)
│   │   │   │   │   └── [index.ts](./exibit/src/components/messaging/molecules/index.ts)
│   │   │   │   ├── organisms/
│   │   │   │   │   ├── ChatPane/
│   │   │   │   │   │   ├── [MessageList.tsx](./exibit/src/components/messaging/organisms/ChatPane/MessageList.tsx)
│   │   │   │   │   │   └── [useChatPaneHandlers.ts](./exibit/src/components/messaging/organisms/ChatPane/useChatPaneHandlers.ts)
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [BlockedContactsPanel.test.tsx](./exibit/src/components/messaging/organisms/__tests__/BlockedContactsPanel.test.tsx)
│   │   │   │   │   │   ├── [CallHistoryPanel.test.tsx](./exibit/src/components/messaging/organisms/__tests__/CallHistoryPanel.test.tsx)
│   │   │   │   │   │   ├── [CallScreen.test.tsx](./exibit/src/components/messaging/organisms/__tests__/CallScreen.test.tsx)
│   │   │   │   │   │   ├── [ChatPane.test.tsx](./exibit/src/components/messaging/organisms/__tests__/ChatPane.test.tsx)
│   │   │   │   │   │   ├── [ChatSettingsPanel.test.tsx](./exibit/src/components/messaging/organisms/__tests__/ChatSettingsPanel.test.tsx)
│   │   │   │   │   │   ├── [ChatSidebar.test.tsx](./exibit/src/components/messaging/organisms/__tests__/ChatSidebar.test.tsx)
│   │   │   │   │   │   ├── [DeviceSyncPanel.test.tsx](./exibit/src/components/messaging/organisms/__tests__/DeviceSyncPanel.test.tsx)
│   │   │   │   │   │   ├── [DeviceTrustPanel.test.tsx](./exibit/src/components/messaging/organisms/__tests__/DeviceTrustPanel.test.tsx)
│   │   │   │   │   │   ├── [ForwardModal.test.tsx](./exibit/src/components/messaging/organisms/__tests__/ForwardModal.test.tsx)
│   │   │   │   │   │   ├── [GroupAdminPanel.test.tsx](./exibit/src/components/messaging/organisms/__tests__/GroupAdminPanel.test.tsx)
│   │   │   │   │   │   ├── [GroupCallView.test.tsx](./exibit/src/components/messaging/organisms/__tests__/GroupCallView.test.tsx)
│   │   │   │   │   │   ├── [ImageLightbox.test.tsx](./exibit/src/components/messaging/organisms/__tests__/ImageLightbox.test.tsx)
│   │   │   │   │   │   ├── [IncomingCallModal.test.tsx](./exibit/src/components/messaging/organisms/__tests__/IncomingCallModal.test.tsx)
│   │   │   │   │   │   ├── [MediaGallery.test.tsx](./exibit/src/components/messaging/organisms/__tests__/MediaGallery.test.tsx)
│   │   │   │   │   │   ├── [NewChatModal.test.tsx](./exibit/src/components/messaging/organisms/__tests__/NewChatModal.test.tsx)
│   │   │   │   │   │   ├── [PairingModal.test.tsx](./exibit/src/components/messaging/organisms/__tests__/PairingModal.test.tsx)
│   │   │   │   │   │   ├── [PinLockScreen.test.tsx](./exibit/src/components/messaging/organisms/__tests__/PinLockScreen.test.tsx)
│   │   │   │   │   │   └── [PrivacySettingsPanel.test.tsx](./exibit/src/components/messaging/organisms/__tests__/PrivacySettingsPanel.test.tsx)
│   │   │   │   │   ├── [BlockedContactsPanel.tsx](./exibit/src/components/messaging/organisms/BlockedContactsPanel.tsx)
│   │   │   │   │   ├── [CallHistoryPanel.tsx](./exibit/src/components/messaging/organisms/CallHistoryPanel.tsx)
│   │   │   │   │   ├── [CallScreen.tsx](./exibit/src/components/messaging/organisms/CallScreen.tsx)
│   │   │   │   │   ├── [ChatPane.tsx](./exibit/src/components/messaging/organisms/ChatPane.tsx)
│   │   │   │   │   ├── [ChatSettingsPanel.tsx](./exibit/src/components/messaging/organisms/ChatSettingsPanel.tsx)
│   │   │   │   │   ├── [ChatSidebar.tsx](./exibit/src/components/messaging/organisms/ChatSidebar.tsx)
│   │   │   │   │   ├── [DeviceSyncPanel.tsx](./exibit/src/components/messaging/organisms/DeviceSyncPanel.tsx)
│   │   │   │   │   ├── [DeviceTrustPanel.tsx](./exibit/src/components/messaging/organisms/DeviceTrustPanel.tsx)
│   │   │   │   │   ├── [ForwardModal.tsx](./exibit/src/components/messaging/organisms/ForwardModal.tsx)
│   │   │   │   │   ├── [GroupAdminPanel.tsx](./exibit/src/components/messaging/organisms/GroupAdminPanel.tsx)
│   │   │   │   │   ├── [GroupCallView.tsx](./exibit/src/components/messaging/organisms/GroupCallView.tsx)
│   │   │   │   │   ├── [Header.tsx](./exibit/src/components/messaging/organisms/Header.tsx)
│   │   │   │   │   ├── [ImageLightbox.tsx](./exibit/src/components/messaging/organisms/ImageLightbox.tsx)
│   │   │   │   │   ├── [IncomingCallModal.tsx](./exibit/src/components/messaging/organisms/IncomingCallModal.tsx)
│   │   │   │   │   ├── [MediaGallery.tsx](./exibit/src/components/messaging/organisms/MediaGallery.tsx)
│   │   │   │   │   ├── [NewChatModal.tsx](./exibit/src/components/messaging/organisms/NewChatModal.tsx)
│   │   │   │   │   ├── [PairingModal.tsx](./exibit/src/components/messaging/organisms/PairingModal.tsx)
│   │   │   │   │   ├── [PinLockScreen.tsx](./exibit/src/components/messaging/organisms/PinLockScreen.tsx)
│   │   │   │   │   └── [PrivacySettingsPanel.tsx](./exibit/src/components/messaging/organisms/PrivacySettingsPanel.tsx)
│   │   │   │   ├── templates/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [AboutTemplate.test.tsx](./exibit/src/components/messaging/templates/__tests__/AboutTemplate.test.tsx)
│   │   │   │   │   │   ├── [AppShell.test.tsx](./exibit/src/components/messaging/templates/__tests__/AppShell.test.tsx)
│   │   │   │   │   │   ├── [DownloadsTemplate.test.tsx](./exibit/src/components/messaging/templates/__tests__/DownloadsTemplate.test.tsx)
│   │   │   │   │   │   ├── [ErrorTemplate.test.tsx](./exibit/src/components/messaging/templates/__tests__/ErrorTemplate.test.tsx)
│   │   │   │   │   │   └── [VersionTemplate.test.tsx](./exibit/src/components/messaging/templates/__tests__/VersionTemplate.test.tsx)
│   │   │   │   │   ├── [AboutTemplate.tsx](./exibit/src/components/messaging/templates/AboutTemplate.tsx)
│   │   │   │   │   ├── [AppShell.tsx](./exibit/src/components/messaging/templates/AppShell.tsx)
│   │   │   │   │   ├── [DownloadsTemplate.tsx](./exibit/src/components/messaging/templates/DownloadsTemplate.tsx)
│   │   │   │   │   ├── [ErrorTemplate.tsx](./exibit/src/components/messaging/templates/ErrorTemplate.tsx)
│   │   │   │   │   ├── [VersionTemplate.tsx](./exibit/src/components/messaging/templates/VersionTemplate.tsx)
│   │   │   │   │   └── [index.ts](./exibit/src/components/messaging/templates/index.ts)
│   │   │   │   └── [index.ts](./exibit/src/components/messaging/index.ts)
│   │   │   ├── organisms/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [Cart.test.tsx](./exibit/src/components/organisms/__tests__/Cart.test.tsx)
│   │   │   │   │   ├── [Checkout.test.tsx](./exibit/src/components/organisms/__tests__/Checkout.test.tsx)
│   │   │   │   │   ├── [DailySummary.test.tsx](./exibit/src/components/organisms/__tests__/DailySummary.test.tsx)
│   │   │   │   │   ├── [DigitalReceipt.test.tsx](./exibit/src/components/organisms/__tests__/DigitalReceipt.test.tsx)
│   │   │   │   │   ├── [DiscountManager.test.tsx](./exibit/src/components/organisms/__tests__/DiscountManager.test.tsx)
│   │   │   │   │   ├── [GiftCardManager.test.tsx](./exibit/src/components/organisms/__tests__/GiftCardManager.test.tsx)
│   │   │   │   │   ├── [Header.test.tsx](./exibit/src/components/organisms/__tests__/Header.test.tsx)
│   │   │   │   │   ├── [InventoryManager.test.tsx](./exibit/src/components/organisms/__tests__/InventoryManager.test.tsx)
│   │   │   │   │   ├── [ItemCatalog.test.tsx](./exibit/src/components/organisms/__tests__/ItemCatalog.test.tsx)
│   │   │   │   │   ├── [PaymentPanel.test.tsx](./exibit/src/components/organisms/__tests__/PaymentPanel.test.tsx)
│   │   │   │   │   ├── [Receipt.test.tsx](./exibit/src/components/organisms/__tests__/Receipt.test.tsx)
│   │   │   │   │   ├── [ReportingDashboard.test.tsx](./exibit/src/components/organisms/__tests__/ReportingDashboard.test.tsx)
│   │   │   │   │   ├── [ShiftManager.test.tsx](./exibit/src/components/organisms/__tests__/ShiftManager.test.tsx)
│   │   │   │   │   ├── [TaxConfigPanel.test.tsx](./exibit/src/components/organisms/__tests__/TaxConfigPanel.test.tsx)
│   │   │   │   │   ├── [TransactionHistory.test.tsx](./exibit/src/components/organisms/__tests__/TransactionHistory.test.tsx)
│   │   │   │   │   └── [UserManager.test.tsx](./exibit/src/components/organisms/__tests__/UserManager.test.tsx)
│   │   │   │   ├── [Cart.tsx](./exibit/src/components/organisms/Cart.tsx)
│   │   │   │   ├── [Checkout.tsx](./exibit/src/components/organisms/Checkout.tsx)
│   │   │   │   ├── [DailySummary.tsx](./exibit/src/components/organisms/DailySummary.tsx)
│   │   │   │   ├── [DigitalReceipt.tsx](./exibit/src/components/organisms/DigitalReceipt.tsx)
│   │   │   │   ├── [DiscountManager.tsx](./exibit/src/components/organisms/DiscountManager.tsx)
│   │   │   │   ├── [GiftCardManager.tsx](./exibit/src/components/organisms/GiftCardManager.tsx)
│   │   │   │   ├── [Header.tsx](./exibit/src/components/organisms/Header.tsx)
│   │   │   │   ├── [InventoryManager.tsx](./exibit/src/components/organisms/InventoryManager.tsx)
│   │   │   │   ├── [ItemCatalog.tsx](./exibit/src/components/organisms/ItemCatalog.tsx)
│   │   │   │   ├── [PaymentPanel.tsx](./exibit/src/components/organisms/PaymentPanel.tsx)
│   │   │   │   ├── [Receipt.tsx](./exibit/src/components/organisms/Receipt.tsx)
│   │   │   │   ├── [ReportingDashboard.tsx](./exibit/src/components/organisms/ReportingDashboard.tsx)
│   │   │   │   ├── [ShiftManager.tsx](./exibit/src/components/organisms/ShiftManager.tsx)
│   │   │   │   ├── [TaxConfigPanel.tsx](./exibit/src/components/organisms/TaxConfigPanel.tsx)
│   │   │   │   ├── [TransactionHistory.tsx](./exibit/src/components/organisms/TransactionHistory.tsx)
│   │   │   │   └── [UserManager.tsx](./exibit/src/components/organisms/UserManager.tsx)
│   │   │   └── templates/
│   │   │       ├── __tests__/
│   │   │       │   ├── [AboutTemplate.test.tsx](./exibit/src/components/templates/__tests__/AboutTemplate.test.tsx)
│   │   │       │   ├── [DownloadsTemplate.test.tsx](./exibit/src/components/templates/__tests__/DownloadsTemplate.test.tsx)
│   │   │       │   ├── [ErrorTemplate.test.tsx](./exibit/src/components/templates/__tests__/ErrorTemplate.test.tsx)
│   │   │       │   └── [VersionTemplate.test.tsx](./exibit/src/components/templates/__tests__/VersionTemplate.test.tsx)
│   │   │       ├── [AboutTemplate.tsx](./exibit/src/components/templates/AboutTemplate.tsx)
│   │   │       ├── [DownloadsTemplate.tsx](./exibit/src/components/templates/DownloadsTemplate.tsx)
│   │   │       ├── [ErrorTemplate.tsx](./exibit/src/components/templates/ErrorTemplate.tsx)
│   │   │       └── [VersionTemplate.tsx](./exibit/src/components/templates/VersionTemplate.tsx)
│   │   ├── content/
│   │   │   ├── [about.ts](./exibit/src/content/about.ts)
│   │   │   ├── [download.ts](./exibit/src/content/download.ts)
│   │   │   └── [version.ts](./exibit/src/content/version.ts)
│   │   ├── data/
│   │   │   ├── __tests__/
│   │   │   │   └── [items.test.ts](./exibit/src/data/__tests__/items.test.ts)
│   │   │   ├── messaging/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [models.test.ts](./exibit/src/data/messaging/__tests__/models.test.ts)
│   │   │   │   │   └── [seed.test.ts](./exibit/src/data/messaging/__tests__/seed.test.ts)
│   │   │   │   ├── [index.ts](./exibit/src/data/messaging/index.ts)
│   │   │   │   ├── [models.ts](./exibit/src/data/messaging/models.ts)
│   │   │   │   ├── [seed.ts](./exibit/src/data/messaging/seed.ts)
│   │   │   │   └── [stickers.ts](./exibit/src/data/messaging/stickers.ts)
│   │   │   └── [items.ts](./exibit/src/data/items.ts)
│   │   ├── hooks/
│   │   │   ├── menu/
│   │   │   │   ├── [index.ts](./exibit/src/hooks/menu/index.ts)
│   │   │   │   └── [useMenuStore.ts](./exibit/src/hooks/menu/useMenuStore.ts)
│   │   │   └── messaging/
│   │   │       ├── __tests__/
│   │   │       │   └── [useSWRegister.test.ts](./exibit/src/hooks/messaging/__tests__/useSWRegister.test.ts)
│   │   │       ├── [index.ts](./exibit/src/hooks/messaging/index.ts)
│   │   │       ├── [useAuthActions.ts](./exibit/src/hooks/messaging/useAuthActions.ts)
│   │   │       ├── [useCallActions.ts](./exibit/src/hooks/messaging/useCallActions.ts)
│   │   │       ├── [useChatActions.ts](./exibit/src/hooks/messaging/useChatActions.ts)
│   │   │       ├── [useDataEffects.ts](./exibit/src/hooks/messaging/useDataEffects.ts)
│   │   │       ├── [useMessageActions.ts](./exibit/src/hooks/messaging/useMessageActions.ts)
│   │   │       ├── [usePeerActions.ts](./exibit/src/hooks/messaging/usePeerActions.ts)
│   │   │       ├── [usePrivacyActions.ts](./exibit/src/hooks/messaging/usePrivacyActions.ts)
│   │   │       ├── [useSWRegister.ts](./exibit/src/hooks/messaging/useSWRegister.ts)
│   │   │       └── [useSettingsActions.ts](./exibit/src/hooks/messaging/useSettingsActions.ts)
│   │   ├── lib/
│   │   │   ├── __tests__/
│   │   │   │   └── [storage.test.ts](./exibit/src/lib/__tests__/storage.test.ts)
│   │   │   ├── menu/
│   │   │   │   ├── [ids.ts](./exibit/src/lib/menu/ids.ts)
│   │   │   │   ├── [index.ts](./exibit/src/lib/menu/index.ts)
│   │   │   │   ├── [menu.ts](./exibit/src/lib/menu/menu.ts)
│   │   │   │   ├── [qr.ts](./exibit/src/lib/menu/qr.ts)
│   │   │   │   ├── [seed.ts](./exibit/src/lib/menu/seed.ts)
│   │   │   │   └── [storage.ts](./exibit/src/lib/menu/storage.ts)
│   │   │   ├── messaging/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [crypto.test.ts](./exibit/src/lib/messaging/__tests__/crypto.test.ts)
│   │   │   │   │   ├── [db.test.ts](./exibit/src/lib/messaging/__tests__/db.test.ts)
│   │   │   │   │   ├── [format.test.ts](./exibit/src/lib/messaging/__tests__/format.test.ts)
│   │   │   │   │   ├── [selectors.test.ts](./exibit/src/lib/messaging/__tests__/selectors.test.ts)
│   │   │   │   │   ├── [url.test.ts](./exibit/src/lib/messaging/__tests__/url.test.ts)
│   │   │   │   │   └── [webrtc.test.ts](./exibit/src/lib/messaging/__tests__/webrtc.test.ts)
│   │   │   │   ├── [crypto.ts](./exibit/src/lib/messaging/crypto.ts)
│   │   │   │   ├── [db.ts](./exibit/src/lib/messaging/db.ts)
│   │   │   │   ├── [format.ts](./exibit/src/lib/messaging/format.ts)
│   │   │   │   ├── [index.ts](./exibit/src/lib/messaging/index.ts)
│   │   │   │   ├── [selectors.ts](./exibit/src/lib/messaging/selectors.ts)
│   │   │   │   ├── [url.ts](./exibit/src/lib/messaging/url.ts)
│   │   │   │   └── [webrtc.ts](./exibit/src/lib/messaging/webrtc.ts)
│   │   │   └── [storage.ts](./exibit/src/lib/storage.ts)
│   │   ├── providers/
│   │   │   └── messaging/
│   │   │       ├── __tests__/
│   │   │       │   ├── [DataProvider.test.tsx](./exibit/src/providers/messaging/__tests__/DataProvider.test.tsx)
│   │   │       │   ├── [Providers.test.tsx](./exibit/src/providers/messaging/__tests__/Providers.test.tsx)
│   │   │       │   ├── [SWProvider.test.tsx](./exibit/src/providers/messaging/__tests__/SWProvider.test.tsx)
│   │   │       │   └── [ToastProvider.test.tsx](./exibit/src/providers/messaging/__tests__/ToastProvider.test.tsx)
│   │   │       ├── [DataContext.ts](./exibit/src/providers/messaging/DataContext.ts)
│   │   │       ├── [DataProvider.tsx](./exibit/src/providers/messaging/DataProvider.tsx)
│   │   │       ├── [Providers.tsx](./exibit/src/providers/messaging/Providers.tsx)
│   │   │       ├── [SWProvider.tsx](./exibit/src/providers/messaging/SWProvider.tsx)
│   │   │       ├── [ToastProvider.tsx](./exibit/src/providers/messaging/ToastProvider.tsx)
│   │   │       ├── [data-helpers.ts](./exibit/src/providers/messaging/data-helpers.ts)
│   │   │       └── [index.ts](./exibit/src/providers/messaging/index.ts)
│   │   ├── styles/
│   │   │   ├── messaging/
│   │   │   │   ├── [globals.css](./exibit/src/styles/messaging/globals.css)
│   │   │   │   └── [themes.css](./exibit/src/styles/messaging/themes.css)
│   │   │   ├── [globals.css](./exibit/src/styles/globals.css)
│   │   │   └── [themes.css](./exibit/src/styles/themes.css)
│   │   └── types/
│   │       ├── menu/
│   │       │   ├── [index.ts](./exibit/src/types/menu/index.ts)
│   │       │   └── [menu.ts](./exibit/src/types/menu/menu.ts)
│   │       ├── messaging/
│   │       │   ├── [call.ts](./exibit/src/types/messaging/call.ts)
│   │       │   ├── [chat.ts](./exibit/src/types/messaging/chat.ts)
│   │       │   ├── [index.ts](./exibit/src/types/messaging/index.ts)
│   │       │   ├── [message.ts](./exibit/src/types/messaging/message.ts)
│   │       │   ├── [peer.ts](./exibit/src/types/messaging/peer.ts)
│   │       │   ├── [settings.ts](./exibit/src/types/messaging/settings.ts)
│   │       │   └── [user.ts](./exibit/src/types/messaging/user.ts)
│   │       └── [pos.ts](./exibit/src/types/pos.ts)
│   ├── src-tauri/
│   │   ├── capabilities/
│   │   │   └── [default.json](./exibit/src-tauri/capabilities/default.json)
│   │   ├── icons/
│   │   │   ├── android/
│   │   │   │   ├── mipmap-anydpi-v26/
│   │   │   │   │   └── [ic_launcher.xml](./exibit/src-tauri/icons/android/mipmap-anydpi-v26/ic_launcher.xml)
│   │   │   │   ├── mipmap-hdpi/
│   │   │   │   │   ├── [ic_launcher.png](./exibit/src-tauri/icons/android/mipmap-hdpi/ic_launcher.png)
│   │   │   │   │   ├── [ic_launcher_foreground.png](./exibit/src-tauri/icons/android/mipmap-hdpi/ic_launcher_foreground.png)
│   │   │   │   │   └── [ic_launcher_round.png](./exibit/src-tauri/icons/android/mipmap-hdpi/ic_launcher_round.png)
│   │   │   │   ├── mipmap-mdpi/
│   │   │   │   │   ├── [ic_launcher.png](./exibit/src-tauri/icons/android/mipmap-mdpi/ic_launcher.png)
│   │   │   │   │   ├── [ic_launcher_foreground.png](./exibit/src-tauri/icons/android/mipmap-mdpi/ic_launcher_foreground.png)
│   │   │   │   │   └── [ic_launcher_round.png](./exibit/src-tauri/icons/android/mipmap-mdpi/ic_launcher_round.png)
│   │   │   │   ├── mipmap-xhdpi/
│   │   │   │   │   ├── [ic_launcher.png](./exibit/src-tauri/icons/android/mipmap-xhdpi/ic_launcher.png)
│   │   │   │   │   ├── [ic_launcher_foreground.png](./exibit/src-tauri/icons/android/mipmap-xhdpi/ic_launcher_foreground.png)
│   │   │   │   │   └── [ic_launcher_round.png](./exibit/src-tauri/icons/android/mipmap-xhdpi/ic_launcher_round.png)
│   │   │   │   ├── mipmap-xxhdpi/
│   │   │   │   │   ├── [ic_launcher.png](./exibit/src-tauri/icons/android/mipmap-xxhdpi/ic_launcher.png)
│   │   │   │   │   ├── [ic_launcher_foreground.png](./exibit/src-tauri/icons/android/mipmap-xxhdpi/ic_launcher_foreground.png)
│   │   │   │   │   └── [ic_launcher_round.png](./exibit/src-tauri/icons/android/mipmap-xxhdpi/ic_launcher_round.png)
│   │   │   │   ├── mipmap-xxxhdpi/
│   │   │   │   │   ├── [ic_launcher.png](./exibit/src-tauri/icons/android/mipmap-xxxhdpi/ic_launcher.png)
│   │   │   │   │   ├── [ic_launcher_foreground.png](./exibit/src-tauri/icons/android/mipmap-xxxhdpi/ic_launcher_foreground.png)
│   │   │   │   │   └── [ic_launcher_round.png](./exibit/src-tauri/icons/android/mipmap-xxxhdpi/ic_launcher_round.png)
│   │   │   │   └── values/
│   │   │   │       └── [ic_launcher_background.xml](./exibit/src-tauri/icons/android/values/ic_launcher_background.xml)
│   │   │   ├── ios/
│   │   │   │   ├── [AppIcon-20x20@1x.png](./exibit/src-tauri/icons/ios/AppIcon-20x20@1x.png)
│   │   │   │   ├── [AppIcon-20x20@2x-1.png](./exibit/src-tauri/icons/ios/AppIcon-20x20@2x-1.png)
│   │   │   │   ├── [AppIcon-20x20@2x.png](./exibit/src-tauri/icons/ios/AppIcon-20x20@2x.png)
│   │   │   │   ├── [AppIcon-20x20@3x.png](./exibit/src-tauri/icons/ios/AppIcon-20x20@3x.png)
│   │   │   │   ├── [AppIcon-29x29@1x.png](./exibit/src-tauri/icons/ios/AppIcon-29x29@1x.png)
│   │   │   │   ├── [AppIcon-29x29@2x-1.png](./exibit/src-tauri/icons/ios/AppIcon-29x29@2x-1.png)
│   │   │   │   ├── [AppIcon-29x29@2x.png](./exibit/src-tauri/icons/ios/AppIcon-29x29@2x.png)
│   │   │   │   ├── [AppIcon-29x29@3x.png](./exibit/src-tauri/icons/ios/AppIcon-29x29@3x.png)
│   │   │   │   ├── [AppIcon-40x40@1x.png](./exibit/src-tauri/icons/ios/AppIcon-40x40@1x.png)
│   │   │   │   ├── [AppIcon-40x40@2x-1.png](./exibit/src-tauri/icons/ios/AppIcon-40x40@2x-1.png)
│   │   │   │   ├── [AppIcon-40x40@2x.png](./exibit/src-tauri/icons/ios/AppIcon-40x40@2x.png)
│   │   │   │   ├── [AppIcon-40x40@3x.png](./exibit/src-tauri/icons/ios/AppIcon-40x40@3x.png)
│   │   │   │   ├── [AppIcon-512@2x.png](./exibit/src-tauri/icons/ios/AppIcon-512@2x.png)
│   │   │   │   ├── [AppIcon-60x60@2x.png](./exibit/src-tauri/icons/ios/AppIcon-60x60@2x.png)
│   │   │   │   ├── [AppIcon-60x60@3x.png](./exibit/src-tauri/icons/ios/AppIcon-60x60@3x.png)
│   │   │   │   ├── [AppIcon-76x76@1x.png](./exibit/src-tauri/icons/ios/AppIcon-76x76@1x.png)
│   │   │   │   ├── [AppIcon-76x76@2x.png](./exibit/src-tauri/icons/ios/AppIcon-76x76@2x.png)
│   │   │   │   └── [AppIcon-83.5x83.5@2x.png](./exibit/src-tauri/icons/ios/AppIcon-83.5x83.5@2x.png)
│   │   │   ├── [128x128.png](./exibit/src-tauri/icons/128x128.png)
│   │   │   ├── [128x128@2x.png](./exibit/src-tauri/icons/128x128@2x.png)
│   │   │   ├── [256x256.png](./exibit/src-tauri/icons/256x256.png)
│   │   │   ├── [32x32.png](./exibit/src-tauri/icons/32x32.png)
│   │   │   ├── [64x64.png](./exibit/src-tauri/icons/64x64.png)
│   │   │   ├── [Square107x107Logo.png](./exibit/src-tauri/icons/Square107x107Logo.png)
│   │   │   ├── [Square142x142Logo.png](./exibit/src-tauri/icons/Square142x142Logo.png)
│   │   │   ├── [Square150x150Logo.png](./exibit/src-tauri/icons/Square150x150Logo.png)
│   │   │   ├── [Square284x284Logo.png](./exibit/src-tauri/icons/Square284x284Logo.png)
│   │   │   ├── [Square30x30Logo.png](./exibit/src-tauri/icons/Square30x30Logo.png)
│   │   │   ├── [Square310x310Logo.png](./exibit/src-tauri/icons/Square310x310Logo.png)
│   │   │   ├── [Square44x44Logo.png](./exibit/src-tauri/icons/Square44x44Logo.png)
│   │   │   ├── [Square71x71Logo.png](./exibit/src-tauri/icons/Square71x71Logo.png)
│   │   │   ├── [Square89x89Logo.png](./exibit/src-tauri/icons/Square89x89Logo.png)
│   │   │   ├── [StoreLogo.png](./exibit/src-tauri/icons/StoreLogo.png)
│   │   │   ├── [create-icons.sh](./exibit/src-tauri/icons/create-icons.sh)
│   │   │   ├── [icon-1024.png](./exibit/src-tauri/icons/icon-1024.png)
│   │   │   ├── [icon.icns](./exibit/src-tauri/icons/icon.icns)
│   │   │   ├── [icon.ico](./exibit/src-tauri/icons/icon.ico)
│   │   │   └── [icon.png](./exibit/src-tauri/icons/icon.png)
│   │   ├── src/
│   │   │   ├── [lib.rs](./exibit/src-tauri/src/lib.rs)
│   │   │   └── [main.rs](./exibit/src-tauri/src/main.rs)
│   │   ├── [Cargo.lock](./exibit/src-tauri/Cargo.lock)
│   │   ├── [Cargo.toml](./exibit/src-tauri/Cargo.toml)
│   │   ├── [build.rs](./exibit/src-tauri/build.rs)
│   │   └── [tauri.conf.json](./exibit/src-tauri/tauri.conf.json)
│   ├── [AGENTS.md](./exibit/AGENTS.md)
│   ├── [Dockerfile](./exibit/Dockerfile)
│   ├── [LICENSE](./exibit/LICENSE)
│   ├── [README.md](./exibit/README.md)
│   ├── [TREE.md](./exibit/TREE.md)
│   ├── [docker-compose.yaml](./exibit/docker-compose.yaml)
│   ├── [eslint.config.mts](./exibit/eslint.config.mts)
│   ├── [jest.config.ts](./exibit/jest.config.ts)
│   ├── [jest.setup.ts](./exibit/jest.setup.ts)
│   ├── [next.config.ts](./exibit/next.config.ts)
│   ├── [package.json](./exibit/package.json)
│   ├── [playwright.config.ts](./exibit/playwright.config.ts)
│   ├── [postcss.config.mjs](./exibit/postcss.config.mjs)
│   └── [tsconfig.json](./exibit/tsconfig.json)
├── photo/
│   ├── docs/
│   │   ├── [ARCHITECTURE.md](./photo/docs/ARCHITECTURE.md)
│   │   ├── [CONTRIBUTING.md](./photo/docs/CONTRIBUTING.md)
│   │   ├── [DOWNLOADS.md](./photo/docs/DOWNLOADS.md)
│   │   ├── [PACKAGING.md](./photo/docs/PACKAGING.md)
│   │   └── [ROADMAP.md](./photo/docs/ROADMAP.md)
│   ├── e2e/
│   │   ├── [about.spec.ts](./photo/e2e/about.spec.ts)
│   │   ├── [albums.spec.ts](./photo/e2e/albums.spec.ts)
│   │   ├── [crop.spec.ts](./photo/e2e/crop.spec.ts)
│   │   ├── [downloads.spec.ts](./photo/e2e/downloads.spec.ts)
│   │   ├── [edit.spec.ts](./photo/e2e/edit.spec.ts)
│   │   ├── [home.spec.ts](./photo/e2e/home.spec.ts)
│   │   ├── [layers.spec.ts](./photo/e2e/layers.spec.ts)
│   │   ├── [navigation.spec.ts](./photo/e2e/navigation.spec.ts)
│   │   ├── [profile.spec.ts](./photo/e2e/profile.spec.ts)
│   │   ├── [settings.spec.ts](./photo/e2e/settings.spec.ts)
│   │   └── [version.spec.ts](./photo/e2e/version.spec.ts)
│   ├── public/
│   │   ├── icons/
│   │   │   ├── [icon-128x128.png](./photo/public/icons/icon-128x128.png)
│   │   │   ├── [icon-144x144.png](./photo/public/icons/icon-144x144.png)
│   │   │   ├── [icon-152x152.png](./photo/public/icons/icon-152x152.png)
│   │   │   ├── [icon-16x16.png](./photo/public/icons/icon-16x16.png)
│   │   │   ├── [icon-180x180.png](./photo/public/icons/icon-180x180.png)
│   │   │   ├── [icon-192x192.png](./photo/public/icons/icon-192x192.png)
│   │   │   ├── [icon-256x256.png](./photo/public/icons/icon-256x256.png)
│   │   │   ├── [icon-32x32.png](./photo/public/icons/icon-32x32.png)
│   │   │   ├── [icon-384x384.png](./photo/public/icons/icon-384x384.png)
│   │   │   ├── [icon-48x48.png](./photo/public/icons/icon-48x48.png)
│   │   │   ├── [icon-512x512.png](./photo/public/icons/icon-512x512.png)
│   │   │   ├── [icon-64x64.png](./photo/public/icons/icon-64x64.png)
│   │   │   ├── [icon-72x72.png](./photo/public/icons/icon-72x72.png)
│   │   │   ├── [icon-96x96.png](./photo/public/icons/icon-96x96.png)
│   │   │   └── [icon.svg](./photo/public/icons/icon.svg)
│   │   ├── [apple-touch-icon.png](./photo/public/apple-touch-icon.png)
│   │   ├── [favicon.ico](./photo/public/favicon.ico)
│   │   ├── [manifest.json](./photo/public/manifest.json)
│   │   ├── [robots.txt](./photo/public/robots.txt)
│   │   ├── [sitemap.xml](./photo/public/sitemap.xml)
│   │   └── [sw.js](./photo/public/sw.js)
│   ├── src/
│   │   ├── app/
│   │   │   ├── (auth)/
│   │   │   │   ├── forget-password/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./photo/src/app/(auth)/forget-password/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./photo/src/app/(auth)/forget-password/page.tsx)
│   │   │   │   ├── profile/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./photo/src/app/(auth)/profile/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./photo/src/app/(auth)/profile/page.tsx)
│   │   │   │   ├── reset-password/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./photo/src/app/(auth)/reset-password/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./photo/src/app/(auth)/reset-password/page.tsx)
│   │   │   │   ├── sign-in/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./photo/src/app/(auth)/sign-in/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./photo/src/app/(auth)/sign-in/page.tsx)
│   │   │   │   └── sign-up/
│   │   │   │       ├── __tests__/
│   │   │   │       │   └── [page.test.tsx](./photo/src/app/(auth)/sign-up/__tests__/page.test.tsx)
│   │   │   │       └── [page.tsx](./photo/src/app/(auth)/sign-up/page.tsx)
│   │   │   ├── (info)/
│   │   │   │   ├── about/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./photo/src/app/(info)/about/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./photo/src/app/(info)/about/page.tsx)
│   │   │   │   ├── downloads/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./photo/src/app/(info)/downloads/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./photo/src/app/(info)/downloads/page.tsx)
│   │   │   │   └── version/
│   │   │   │       ├── __tests__/
│   │   │   │       │   └── [page.test.tsx](./photo/src/app/(info)/version/__tests__/page.test.tsx)
│   │   │   │       └── [page.tsx](./photo/src/app/(info)/version/page.tsx)
│   │   │   ├── __tests__/
│   │   │   │   ├── [error.test.tsx](./photo/src/app/__tests__/error.test.tsx)
│   │   │   │   ├── [forbidden.test.tsx](./photo/src/app/__tests__/forbidden.test.tsx)
│   │   │   │   ├── [global-error.test.tsx](./photo/src/app/__tests__/global-error.test.tsx)
│   │   │   │   ├── [layout.test.tsx](./photo/src/app/__tests__/layout.test.tsx)
│   │   │   │   ├── [loading.test.tsx](./photo/src/app/__tests__/loading.test.tsx)
│   │   │   │   ├── [not-found.test.tsx](./photo/src/app/__tests__/not-found.test.tsx)
│   │   │   │   ├── [page.test.tsx](./photo/src/app/__tests__/page.test.tsx)
│   │   │   │   ├── [robots.test.ts](./photo/src/app/__tests__/robots.test.ts)
│   │   │   │   ├── [template.test.tsx](./photo/src/app/__tests__/template.test.tsx)
│   │   │   │   └── [unauthorized.test.tsx](./photo/src/app/__tests__/unauthorized.test.tsx)
│   │   │   ├── albums/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [page.test.tsx](./photo/src/app/albums/__tests__/page.test.tsx)
│   │   │   │   └── [page.tsx](./photo/src/app/albums/page.tsx)
│   │   │   ├── edit/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [page.test.tsx](./photo/src/app/edit/__tests__/page.test.tsx)
│   │   │   │   ├── crop/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./photo/src/app/edit/crop/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./photo/src/app/edit/crop/page.tsx)
│   │   │   │   ├── layers/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./photo/src/app/edit/layers/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./photo/src/app/edit/layers/page.tsx)
│   │   │   │   └── [page.tsx](./photo/src/app/edit/page.tsx)
│   │   │   ├── settings/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [page.test.tsx](./photo/src/app/settings/__tests__/page.test.tsx)
│   │   │   │   └── [page.tsx](./photo/src/app/settings/page.tsx)
│   │   │   ├── tools/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [page.test.tsx](./photo/src/app/tools/__tests__/page.test.tsx)
│   │   │   │   └── [page.tsx](./photo/src/app/tools/page.tsx)
│   │   │   ├── [default.tsx](./photo/src/app/default.tsx)
│   │   │   ├── [error.tsx](./photo/src/app/error.tsx)
│   │   │   ├── [favicon.ico](./photo/src/app/favicon.ico)
│   │   │   ├── [forbidden.tsx](./photo/src/app/forbidden.tsx)
│   │   │   ├── [global-error.tsx](./photo/src/app/global-error.tsx)
│   │   │   ├── [layout.tsx](./photo/src/app/layout.tsx)
│   │   │   ├── [loading.tsx](./photo/src/app/loading.tsx)
│   │   │   ├── [not-found.tsx](./photo/src/app/not-found.tsx)
│   │   │   ├── [page.tsx](./photo/src/app/page.tsx)
│   │   │   ├── [robots.ts](./photo/src/app/robots.ts)
│   │   │   ├── [template.tsx](./photo/src/app/template.tsx)
│   │   │   └── [unauthorized.tsx](./photo/src/app/unauthorized.tsx)
│   │   ├── components/
│   │   │   ├── atoms/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [ImageFileUpload.test.tsx](./photo/src/components/atoms/__tests__/ImageFileUpload.test.tsx)
│   │   │   │   └── [ImageFileUpload.tsx](./photo/src/components/atoms/ImageFileUpload.tsx)
│   │   │   ├── organisms/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [ToastContainer.test.tsx](./photo/src/components/organisms/__tests__/ToastContainer.test.tsx)
│   │   │   │   ├── [Header.tsx](./photo/src/components/organisms/Header.tsx)
│   │   │   │   └── [ToastContainer.tsx](./photo/src/components/organisms/ToastContainer.tsx)
│   │   │   ├── templates/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [AboutTemplate.test.tsx](./photo/src/components/templates/__tests__/AboutTemplate.test.tsx)
│   │   │   │   │   ├── [DownloadsTemplate.test.tsx](./photo/src/components/templates/__tests__/DownloadsTemplate.test.tsx)
│   │   │   │   │   ├── [ErrorTemplate.test.tsx](./photo/src/components/templates/__tests__/ErrorTemplate.test.tsx)
│   │   │   │   │   └── [VersionTemplate.test.tsx](./photo/src/components/templates/__tests__/VersionTemplate.test.tsx)
│   │   │   │   ├── [AboutTemplate.tsx](./photo/src/components/templates/AboutTemplate.tsx)
│   │   │   │   ├── [DownloadsTemplate.tsx](./photo/src/components/templates/DownloadsTemplate.tsx)
│   │   │   │   ├── [ErrorTemplate.tsx](./photo/src/components/templates/ErrorTemplate.tsx)
│   │   │   │   └── [VersionTemplate.tsx](./photo/src/components/templates/VersionTemplate.tsx)
│   │   │   └── tools/
│   │   │       ├── __tests__/
│   │   │       │   ├── [AiColorizeTool.test.tsx](./photo/src/components/tools/__tests__/AiColorizeTool.test.tsx)
│   │   │       │   ├── [AiGenerateTool.test.tsx](./photo/src/components/tools/__tests__/AiGenerateTool.test.tsx)
│   │   │       │   ├── [AiRemoveBgTool.test.tsx](./photo/src/components/tools/__tests__/AiRemoveBgTool.test.tsx)
│   │   │       │   ├── [AiRemoveObjectTool.test.tsx](./photo/src/components/tools/__tests__/AiRemoveObjectTool.test.tsx)
│   │   │       │   ├── [AiRemovePersonTool.test.tsx](./photo/src/components/tools/__tests__/AiRemovePersonTool.test.tsx)
│   │   │       │   ├── [AiRemoveWatermarkTool.test.tsx](./photo/src/components/tools/__tests__/AiRemoveWatermarkTool.test.tsx)
│   │   │       │   ├── [AiRestoreTool.test.tsx](./photo/src/components/tools/__tests__/AiRestoreTool.test.tsx)
│   │   │       │   ├── [AiUnblurTool.test.tsx](./photo/src/components/tools/__tests__/AiUnblurTool.test.tsx)
│   │   │       │   ├── [AiUpscaleTool.test.tsx](./photo/src/components/tools/__tests__/AiUpscaleTool.test.tsx)
│   │   │       │   ├── [BarcodeReadTool.test.tsx](./photo/src/components/tools/__tests__/BarcodeReadTool.test.tsx)
│   │   │       │   ├── [BarcodeTool.test.tsx](./photo/src/components/tools/__tests__/BarcodeTool.test.tsx)
│   │   │       │   ├── [Base64Tool.test.tsx](./photo/src/components/tools/__tests__/Base64Tool.test.tsx)
│   │   │       │   ├── [BreakingBadTool.test.tsx](./photo/src/components/tools/__tests__/BreakingBadTool.test.tsx)
│   │   │       │   ├── [CameraTool.test.tsx](./photo/src/components/tools/__tests__/CameraTool.test.tsx)
│   │   │       │   ├── [ChartMakerTool.test.tsx](./photo/src/components/tools/__tests__/ChartMakerTool.test.tsx)
│   │   │       │   ├── [CollageMakerTool.test.tsx](./photo/src/components/tools/__tests__/CollageMakerTool.test.tsx)
│   │   │       │   ├── [ColorsTool.test.tsx](./photo/src/components/tools/__tests__/ColorsTool.test.tsx)
│   │   │       │   ├── [ContrastCheckerTool.test.tsx](./photo/src/components/tools/__tests__/ContrastCheckerTool.test.tsx)
│   │   │       │   ├── [GitHubSocialPreviewTool.test.tsx](./photo/src/components/tools/__tests__/GitHubSocialPreviewTool.test.tsx)
│   │   │       │   ├── [GradientGeneratorTool.test.tsx](./photo/src/components/tools/__tests__/GradientGeneratorTool.test.tsx)
│   │   │       │   ├── [HouseTool.test.tsx](./photo/src/components/tools/__tests__/HouseTool.test.tsx)
│   │   │       │   ├── [ImageAdjustTool.test.tsx](./photo/src/components/tools/__tests__/ImageAdjustTool.test.tsx)
│   │   │       │   ├── [ImageBlurBackgroundTool.test.tsx](./photo/src/components/tools/__tests__/ImageBlurBackgroundTool.test.tsx)
│   │   │       │   ├── [ImageBorderTool.test.tsx](./photo/src/components/tools/__tests__/ImageBorderTool.test.tsx)
│   │   │       │   ├── [ImageBwTool.test.tsx](./photo/src/components/tools/__tests__/ImageBwTool.test.tsx)
│   │   │       │   ├── [ImageColorizeTool.test.tsx](./photo/src/components/tools/__tests__/ImageColorizeTool.test.tsx)
│   │   │       │   ├── [ImageCombinerSideBySideTool.test.tsx](./photo/src/components/tools/__tests__/ImageCombinerSideBySideTool.test.tsx)
│   │   │       │   ├── [ImageCombinerStackedTool.test.tsx](./photo/src/components/tools/__tests__/ImageCombinerStackedTool.test.tsx)
│   │   │       │   ├── [ImageCompressTool.test.tsx](./photo/src/components/tools/__tests__/ImageCompressTool.test.tsx)
│   │   │       │   ├── [ImageConvertTool.test.tsx](./photo/src/components/tools/__tests__/ImageConvertTool.test.tsx)
│   │   │       │   ├── [ImageCropTool.test.tsx](./photo/src/components/tools/__tests__/ImageCropTool.test.tsx)
│   │   │       │   ├── [ImageDominantColorTool.test.tsx](./photo/src/components/tools/__tests__/ImageDominantColorTool.test.tsx)
│   │   │       │   ├── [ImageFlipTool.test.tsx](./photo/src/components/tools/__tests__/ImageFlipTool.test.tsx)
│   │   │       │   ├── [ImageMorphingTool.test.tsx](./photo/src/components/tools/__tests__/ImageMorphingTool.test.tsx)
│   │   │       │   ├── [ImageOcrTool.test.tsx](./photo/src/components/tools/__tests__/ImageOcrTool.test.tsx)
│   │   │       │   ├── [ImagePhotoFiltersTool.test.tsx](./photo/src/components/tools/__tests__/ImagePhotoFiltersTool.test.tsx)
│   │   │       │   ├── [ImagePixelateFaceTool.test.tsx](./photo/src/components/tools/__tests__/ImagePixelateFaceTool.test.tsx)
│   │   │       │   ├── [ImagePixelateTool.test.tsx](./photo/src/components/tools/__tests__/ImagePixelateTool.test.tsx)
│   │   │       │   ├── [ImageProfileTool.test.tsx](./photo/src/components/tools/__tests__/ImageProfileTool.test.tsx)
│   │   │       │   ├── [ImageResizeTool.test.tsx](./photo/src/components/tools/__tests__/ImageResizeTool.test.tsx)
│   │   │       │   ├── [ImageRotateTool.test.tsx](./photo/src/components/tools/__tests__/ImageRotateTool.test.tsx)
│   │   │       │   ├── [ImageRoundTool.test.tsx](./photo/src/components/tools/__tests__/ImageRoundTool.test.tsx)
│   │   │       │   ├── [ImageShadowTool.test.tsx](./photo/src/components/tools/__tests__/ImageShadowTool.test.tsx)
│   │   │       │   ├── [ImageSharpenTool.test.tsx](./photo/src/components/tools/__tests__/ImageSharpenTool.test.tsx)
│   │   │       │   ├── [ImageSplitTool.test.tsx](./photo/src/components/tools/__tests__/ImageSplitTool.test.tsx)
│   │   │       │   ├── [ImageTextTool.test.tsx](./photo/src/components/tools/__tests__/ImageTextTool.test.tsx)
│   │   │       │   ├── [ImageTranslateTool.test.tsx](./photo/src/components/tools/__tests__/ImageTranslateTool.test.tsx)
│   │   │       │   ├── [ImageTransparentBgTool.test.tsx](./photo/src/components/tools/__tests__/ImageTransparentBgTool.test.tsx)
│   │   │       │   ├── [ImageVignetteTool.test.tsx](./photo/src/components/tools/__tests__/ImageVignetteTool.test.tsx)
│   │   │       │   ├── [ImageWatermarkTool.test.tsx](./photo/src/components/tools/__tests__/ImageWatermarkTool.test.tsx)
│   │   │       │   ├── [InstaSizeTool.test.tsx](./photo/src/components/tools/__tests__/InstaSizeTool.test.tsx)
│   │   │       │   ├── [InvoiceParserTool.test.tsx](./photo/src/components/tools/__tests__/InvoiceParserTool.test.tsx)
│   │   │       │   ├── [MemeMakerTool.test.tsx](./photo/src/components/tools/__tests__/MemeMakerTool.test.tsx)
│   │   │       │   ├── [PixelTool.test.tsx](./photo/src/components/tools/__tests__/PixelTool.test.tsx)
│   │   │       │   ├── [QRCodeTool.test.tsx](./photo/src/components/tools/__tests__/QRCodeTool.test.tsx)
│   │   │       │   ├── [QrReadTool.test.tsx](./photo/src/components/tools/__tests__/QrReadTool.test.tsx)
│   │   │       │   └── [YouTubeThumbnailsTool.test.tsx](./photo/src/components/tools/__tests__/YouTubeThumbnailsTool.test.tsx)
│   │   │       ├── [AiColorizeTool.tsx](./photo/src/components/tools/AiColorizeTool.tsx)
│   │   │       ├── [AiGenerateTool.tsx](./photo/src/components/tools/AiGenerateTool.tsx)
│   │   │       ├── [AiRemoveBgTool.tsx](./photo/src/components/tools/AiRemoveBgTool.tsx)
│   │   │       ├── [AiRemoveObjectTool.tsx](./photo/src/components/tools/AiRemoveObjectTool.tsx)
│   │   │       ├── [AiRemovePersonTool.tsx](./photo/src/components/tools/AiRemovePersonTool.tsx)
│   │   │       ├── [AiRemoveWatermarkTool.tsx](./photo/src/components/tools/AiRemoveWatermarkTool.tsx)
│   │   │       ├── [AiRestoreTool.tsx](./photo/src/components/tools/AiRestoreTool.tsx)
│   │   │       ├── [AiUnblurTool.tsx](./photo/src/components/tools/AiUnblurTool.tsx)
│   │   │       ├── [AiUpscaleTool.tsx](./photo/src/components/tools/AiUpscaleTool.tsx)
│   │   │       ├── [BarcodeReadTool.tsx](./photo/src/components/tools/BarcodeReadTool.tsx)
│   │   │       ├── [BarcodeTool.tsx](./photo/src/components/tools/BarcodeTool.tsx)
│   │   │       ├── [Base64Tool.tsx](./photo/src/components/tools/Base64Tool.tsx)
│   │   │       ├── [BreakingBadTool.tsx](./photo/src/components/tools/BreakingBadTool.tsx)
│   │   │       ├── [CameraTool.tsx](./photo/src/components/tools/CameraTool.tsx)
│   │   │       ├── [ChartMakerTool.tsx](./photo/src/components/tools/ChartMakerTool.tsx)
│   │   │       ├── [CollageMakerTool.tsx](./photo/src/components/tools/CollageMakerTool.tsx)
│   │   │       ├── [ColorsTool.tsx](./photo/src/components/tools/ColorsTool.tsx)
│   │   │       ├── [ContrastCheckerTool.tsx](./photo/src/components/tools/ContrastCheckerTool.tsx)
│   │   │       ├── [GitHubSocialPreviewTool.tsx](./photo/src/components/tools/GitHubSocialPreviewTool.tsx)
│   │   │       ├── [GradientGeneratorTool.tsx](./photo/src/components/tools/GradientGeneratorTool.tsx)
│   │   │       ├── [HouseTool.tsx](./photo/src/components/tools/HouseTool.tsx)
│   │   │       ├── [ImageAdjustTool.tsx](./photo/src/components/tools/ImageAdjustTool.tsx)
│   │   │       ├── [ImageBlurBackgroundTool.tsx](./photo/src/components/tools/ImageBlurBackgroundTool.tsx)
│   │   │       ├── [ImageBorderTool.tsx](./photo/src/components/tools/ImageBorderTool.tsx)
│   │   │       ├── [ImageBwTool.tsx](./photo/src/components/tools/ImageBwTool.tsx)
│   │   │       ├── [ImageColorizeTool.tsx](./photo/src/components/tools/ImageColorizeTool.tsx)
│   │   │       ├── [ImageCombinerSideBySideTool.tsx](./photo/src/components/tools/ImageCombinerSideBySideTool.tsx)
│   │   │       ├── [ImageCombinerStackedTool.tsx](./photo/src/components/tools/ImageCombinerStackedTool.tsx)
│   │   │       ├── [ImageCompressTool.tsx](./photo/src/components/tools/ImageCompressTool.tsx)
│   │   │       ├── [ImageConvertTool.tsx](./photo/src/components/tools/ImageConvertTool.tsx)
│   │   │       ├── [ImageCropTool.tsx](./photo/src/components/tools/ImageCropTool.tsx)
│   │   │       ├── [ImageDominantColorTool.tsx](./photo/src/components/tools/ImageDominantColorTool.tsx)
│   │   │       ├── [ImageFlipTool.tsx](./photo/src/components/tools/ImageFlipTool.tsx)
│   │   │       ├── [ImageMorphingTool.tsx](./photo/src/components/tools/ImageMorphingTool.tsx)
│   │   │       ├── [ImageOcrTool.tsx](./photo/src/components/tools/ImageOcrTool.tsx)
│   │   │       ├── [ImagePhotoFiltersTool.tsx](./photo/src/components/tools/ImagePhotoFiltersTool.tsx)
│   │   │       ├── [ImagePixelateFaceTool.tsx](./photo/src/components/tools/ImagePixelateFaceTool.tsx)
│   │   │       ├── [ImagePixelateTool.tsx](./photo/src/components/tools/ImagePixelateTool.tsx)
│   │   │       ├── [ImageProfileTool.tsx](./photo/src/components/tools/ImageProfileTool.tsx)
│   │   │       ├── [ImageResizeTool.tsx](./photo/src/components/tools/ImageResizeTool.tsx)
│   │   │       ├── [ImageRotateTool.tsx](./photo/src/components/tools/ImageRotateTool.tsx)
│   │   │       ├── [ImageRoundTool.tsx](./photo/src/components/tools/ImageRoundTool.tsx)
│   │   │       ├── [ImageShadowTool.tsx](./photo/src/components/tools/ImageShadowTool.tsx)
│   │   │       ├── [ImageSharpenTool.tsx](./photo/src/components/tools/ImageSharpenTool.tsx)
│   │   │       ├── [ImageSplitTool.tsx](./photo/src/components/tools/ImageSplitTool.tsx)
│   │   │       ├── [ImageTextTool.tsx](./photo/src/components/tools/ImageTextTool.tsx)
│   │   │       ├── [ImageTranslateTool.tsx](./photo/src/components/tools/ImageTranslateTool.tsx)
│   │   │       ├── [ImageTransparentBgTool.tsx](./photo/src/components/tools/ImageTransparentBgTool.tsx)
│   │   │       ├── [ImageVignetteTool.tsx](./photo/src/components/tools/ImageVignetteTool.tsx)
│   │   │       ├── [ImageWatermarkTool.tsx](./photo/src/components/tools/ImageWatermarkTool.tsx)
│   │   │       ├── [InstaSizeTool.tsx](./photo/src/components/tools/InstaSizeTool.tsx)
│   │   │       ├── [InvoiceParserTool.tsx](./photo/src/components/tools/InvoiceParserTool.tsx)
│   │   │       ├── [MemeMakerTool.tsx](./photo/src/components/tools/MemeMakerTool.tsx)
│   │   │       ├── [PixelTool.tsx](./photo/src/components/tools/PixelTool.tsx)
│   │   │       ├── [QRCodeTool.tsx](./photo/src/components/tools/QRCodeTool.tsx)
│   │   │       ├── [QrReadTool.tsx](./photo/src/components/tools/QrReadTool.tsx)
│   │   │       └── [YouTubeThumbnailsTool.tsx](./photo/src/components/tools/YouTubeThumbnailsTool.tsx)
│   │   ├── content/
│   │   │   ├── [about.ts](./photo/src/content/about.ts)
│   │   │   ├── [download.ts](./photo/src/content/download.ts)
│   │   │   └── [version.ts](./photo/src/content/version.ts)
│   │   ├── data/
│   │   │   ├── __tests__/
│   │   │   │   └── [data.test.ts](./photo/src/data/__tests__/data.test.ts)
│   │   │   ├── [models.ts](./photo/src/data/models.ts)
│   │   │   ├── [photo-tools.ts](./photo/src/data/photo-tools.ts)
│   │   │   └── [seed.ts](./photo/src/data/seed.ts)
│   │   ├── hooks/
│   │   │   ├── __tests__/
│   │   │   │   └── [useSWRegister.test.ts](./photo/src/hooks/__tests__/useSWRegister.test.ts)
│   │   │   └── [useSWRegister.ts](./photo/src/hooks/useSWRegister.ts)
│   │   ├── lib/
│   │   │   ├── __tests__/
│   │   │   │   ├── [db.test.ts](./photo/src/lib/__tests__/db.test.ts)
│   │   │   │   └── [photo-tools.test.ts](./photo/src/lib/__tests__/photo-tools.test.ts)
│   │   │   ├── [db.ts](./photo/src/lib/db.ts)
│   │   │   └── [photo-tools.ts](./photo/src/lib/photo-tools.ts)
│   │   ├── providers/
│   │   │   ├── __tests__/
│   │   │   │   ├── [DataProvider.test.tsx](./photo/src/providers/__tests__/DataProvider.test.tsx)
│   │   │   │   └── [ToastProvider.test.tsx](./photo/src/providers/__tests__/ToastProvider.test.tsx)
│   │   │   ├── [DataProvider.tsx](./photo/src/providers/DataProvider.tsx)
│   │   │   ├── [Providers.tsx](./photo/src/providers/Providers.tsx)
│   │   │   ├── [SWProvider.tsx](./photo/src/providers/SWProvider.tsx)
│   │   │   └── [ToastProvider.tsx](./photo/src/providers/ToastProvider.tsx)
│   │   ├── server/
│   │   │   ├── __tests__/
│   │   │   │   └── [openrouter.test.ts](./photo/src/server/__tests__/openrouter.test.ts)
│   │   │   └── trpc/
│   │   │       ├── routers/
│   │   │       │   ├── openrouter/
│   │   │       │   │   └── [index.ts](./photo/src/server/trpc/routers/openrouter/index.ts)
│   │   │       │   └── [_app.ts](./photo/src/server/trpc/routers/_app.ts)
│   │   │       └── [trpc.ts](./photo/src/server/trpc/trpc.ts)
│   │   ├── styles/
│   │   │   ├── [globals.css](./photo/src/styles/globals.css)
│   │   │   └── [themes.css](./photo/src/styles/themes.css)
│   │   ├── types/
│   │   │   └── [index.ts](./photo/src/types/index.ts)
│   │   └── utils/
│   │       ├── __tests__/
│   │       │   └── [format.test.ts](./photo/src/utils/__tests__/format.test.ts)
│   │       ├── [format.ts](./photo/src/utils/format.ts)
│   │       └── [trpc.ts](./photo/src/utils/trpc.ts)
│   ├── src-tauri/
│   │   ├── capabilities/
│   │   │   └── [default.json](./photo/src-tauri/capabilities/default.json)
│   │   ├── icons/
│   │   │   ├── android/
│   │   │   │   ├── mipmap-anydpi-v26/
│   │   │   │   │   └── [ic_launcher.xml](./photo/src-tauri/icons/android/mipmap-anydpi-v26/ic_launcher.xml)
│   │   │   │   ├── mipmap-hdpi/
│   │   │   │   │   ├── [ic_launcher.png](./photo/src-tauri/icons/android/mipmap-hdpi/ic_launcher.png)
│   │   │   │   │   ├── [ic_launcher_foreground.png](./photo/src-tauri/icons/android/mipmap-hdpi/ic_launcher_foreground.png)
│   │   │   │   │   └── [ic_launcher_round.png](./photo/src-tauri/icons/android/mipmap-hdpi/ic_launcher_round.png)
│   │   │   │   ├── mipmap-mdpi/
│   │   │   │   │   ├── [ic_launcher.png](./photo/src-tauri/icons/android/mipmap-mdpi/ic_launcher.png)
│   │   │   │   │   ├── [ic_launcher_foreground.png](./photo/src-tauri/icons/android/mipmap-mdpi/ic_launcher_foreground.png)
│   │   │   │   │   └── [ic_launcher_round.png](./photo/src-tauri/icons/android/mipmap-mdpi/ic_launcher_round.png)
│   │   │   │   ├── mipmap-xhdpi/
│   │   │   │   │   ├── [ic_launcher.png](./photo/src-tauri/icons/android/mipmap-xhdpi/ic_launcher.png)
│   │   │   │   │   ├── [ic_launcher_foreground.png](./photo/src-tauri/icons/android/mipmap-xhdpi/ic_launcher_foreground.png)
│   │   │   │   │   └── [ic_launcher_round.png](./photo/src-tauri/icons/android/mipmap-xhdpi/ic_launcher_round.png)
│   │   │   │   ├── mipmap-xxhdpi/
│   │   │   │   │   ├── [ic_launcher.png](./photo/src-tauri/icons/android/mipmap-xxhdpi/ic_launcher.png)
│   │   │   │   │   ├── [ic_launcher_foreground.png](./photo/src-tauri/icons/android/mipmap-xxhdpi/ic_launcher_foreground.png)
│   │   │   │   │   └── [ic_launcher_round.png](./photo/src-tauri/icons/android/mipmap-xxhdpi/ic_launcher_round.png)
│   │   │   │   ├── mipmap-xxxhdpi/
│   │   │   │   │   ├── [ic_launcher.png](./photo/src-tauri/icons/android/mipmap-xxxhdpi/ic_launcher.png)
│   │   │   │   │   ├── [ic_launcher_foreground.png](./photo/src-tauri/icons/android/mipmap-xxxhdpi/ic_launcher_foreground.png)
│   │   │   │   │   └── [ic_launcher_round.png](./photo/src-tauri/icons/android/mipmap-xxxhdpi/ic_launcher_round.png)
│   │   │   │   └── values/
│   │   │   │       └── [ic_launcher_background.xml](./photo/src-tauri/icons/android/values/ic_launcher_background.xml)
│   │   │   ├── ios/
│   │   │   │   ├── [AppIcon-20x20@1x.png](./photo/src-tauri/icons/ios/AppIcon-20x20@1x.png)
│   │   │   │   ├── [AppIcon-20x20@2x-1.png](./photo/src-tauri/icons/ios/AppIcon-20x20@2x-1.png)
│   │   │   │   ├── [AppIcon-20x20@2x.png](./photo/src-tauri/icons/ios/AppIcon-20x20@2x.png)
│   │   │   │   ├── [AppIcon-20x20@3x.png](./photo/src-tauri/icons/ios/AppIcon-20x20@3x.png)
│   │   │   │   ├── [AppIcon-29x29@1x.png](./photo/src-tauri/icons/ios/AppIcon-29x29@1x.png)
│   │   │   │   ├── [AppIcon-29x29@2x-1.png](./photo/src-tauri/icons/ios/AppIcon-29x29@2x-1.png)
│   │   │   │   ├── [AppIcon-29x29@2x.png](./photo/src-tauri/icons/ios/AppIcon-29x29@2x.png)
│   │   │   │   ├── [AppIcon-29x29@3x.png](./photo/src-tauri/icons/ios/AppIcon-29x29@3x.png)
│   │   │   │   ├── [AppIcon-40x40@1x.png](./photo/src-tauri/icons/ios/AppIcon-40x40@1x.png)
│   │   │   │   ├── [AppIcon-40x40@2x-1.png](./photo/src-tauri/icons/ios/AppIcon-40x40@2x-1.png)
│   │   │   │   ├── [AppIcon-40x40@2x.png](./photo/src-tauri/icons/ios/AppIcon-40x40@2x.png)
│   │   │   │   ├── [AppIcon-40x40@3x.png](./photo/src-tauri/icons/ios/AppIcon-40x40@3x.png)
│   │   │   │   ├── [AppIcon-512@2x.png](./photo/src-tauri/icons/ios/AppIcon-512@2x.png)
│   │   │   │   ├── [AppIcon-60x60@2x.png](./photo/src-tauri/icons/ios/AppIcon-60x60@2x.png)
│   │   │   │   ├── [AppIcon-60x60@3x.png](./photo/src-tauri/icons/ios/AppIcon-60x60@3x.png)
│   │   │   │   ├── [AppIcon-76x76@1x.png](./photo/src-tauri/icons/ios/AppIcon-76x76@1x.png)
│   │   │   │   ├── [AppIcon-76x76@2x.png](./photo/src-tauri/icons/ios/AppIcon-76x76@2x.png)
│   │   │   │   └── [AppIcon-83.5x83.5@2x.png](./photo/src-tauri/icons/ios/AppIcon-83.5x83.5@2x.png)
│   │   │   ├── [128x128.png](./photo/src-tauri/icons/128x128.png)
│   │   │   ├── [128x128@2x.png](./photo/src-tauri/icons/128x128@2x.png)
│   │   │   ├── [256x256.png](./photo/src-tauri/icons/256x256.png)
│   │   │   ├── [32x32.png](./photo/src-tauri/icons/32x32.png)
│   │   │   ├── [64x64.png](./photo/src-tauri/icons/64x64.png)
│   │   │   ├── [Square107x107Logo.png](./photo/src-tauri/icons/Square107x107Logo.png)
│   │   │   ├── [Square142x142Logo.png](./photo/src-tauri/icons/Square142x142Logo.png)
│   │   │   ├── [Square150x150Logo.png](./photo/src-tauri/icons/Square150x150Logo.png)
│   │   │   ├── [Square284x284Logo.png](./photo/src-tauri/icons/Square284x284Logo.png)
│   │   │   ├── [Square30x30Logo.png](./photo/src-tauri/icons/Square30x30Logo.png)
│   │   │   ├── [Square310x310Logo.png](./photo/src-tauri/icons/Square310x310Logo.png)
│   │   │   ├── [Square44x44Logo.png](./photo/src-tauri/icons/Square44x44Logo.png)
│   │   │   ├── [Square71x71Logo.png](./photo/src-tauri/icons/Square71x71Logo.png)
│   │   │   ├── [Square89x89Logo.png](./photo/src-tauri/icons/Square89x89Logo.png)
│   │   │   ├── [StoreLogo.png](./photo/src-tauri/icons/StoreLogo.png)
│   │   │   ├── [create-icons.sh](./photo/src-tauri/icons/create-icons.sh)
│   │   │   ├── [icon.icns](./photo/src-tauri/icons/icon.icns)
│   │   │   ├── [icon.ico](./photo/src-tauri/icons/icon.ico)
│   │   │   └── [icon.png](./photo/src-tauri/icons/icon.png)
│   │   ├── src/
│   │   │   ├── [lib.rs](./photo/src-tauri/src/lib.rs)
│   │   │   └── [main.rs](./photo/src-tauri/src/main.rs)
│   │   ├── [Cargo.lock](./photo/src-tauri/Cargo.lock)
│   │   ├── [Cargo.toml](./photo/src-tauri/Cargo.toml)
│   │   ├── [build.rs](./photo/src-tauri/build.rs)
│   │   └── [tauri.conf.json](./photo/src-tauri/tauri.conf.json)
│   ├── [AGENTS.md](./photo/AGENTS.md)
│   ├── [Dockerfile](./photo/Dockerfile)
│   ├── [LICENSE](./photo/LICENSE)
│   ├── [README.md](./photo/README.md)
│   ├── [TREE.md](./photo/TREE.md)
│   ├── [docker-compose.yaml](./photo/docker-compose.yaml)
│   ├── [eslint.config.mts](./photo/eslint.config.mts)
│   ├── [jest.config.ts](./photo/jest.config.ts)
│   ├── [jest.setup.ts](./photo/jest.setup.ts)
│   ├── [next.config.ts](./photo/next.config.ts)
│   ├── [package.json](./photo/package.json)
│   ├── [playwright.config.ts](./photo/playwright.config.ts)
│   ├── [postcss.config.mjs](./photo/postcss.config.mjs)
│   └── [tsconfig.json](./photo/tsconfig.json)
├── svg/
│   ├── docs/
│   │   ├── [ARCHITECTURE.md](./svg/docs/ARCHITECTURE.md)
│   │   ├── [CONTRIBUTING.md](./svg/docs/CONTRIBUTING.md)
│   │   ├── [DOWNLOADS.md](./svg/docs/DOWNLOADS.md)
│   │   ├── [PACKAGING.md](./svg/docs/PACKAGING.md)
│   │   └── [ROADMAP.md](./svg/docs/ROADMAP.md)
│   ├── e2e/
│   │   ├── [about.spec.ts](./svg/e2e/about.spec.ts)
│   │   ├── [canvas-editor.spec.ts](./svg/e2e/canvas-editor.spec.ts)
│   │   ├── [code-editor.spec.ts](./svg/e2e/code-editor.spec.ts)
│   │   ├── [downloads.spec.ts](./svg/e2e/downloads.spec.ts)
│   │   ├── [home.spec.ts](./svg/e2e/home.spec.ts)
│   │   ├── [navigation.spec.ts](./svg/e2e/navigation.spec.ts)
│   │   ├── [profile.spec.ts](./svg/e2e/profile.spec.ts)
│   │   ├── [settings.spec.ts](./svg/e2e/settings.spec.ts)
│   │   └── [version.spec.ts](./svg/e2e/version.spec.ts)
│   ├── public/
│   │   ├── icons/
│   │   │   ├── [icon-128x128.png](./svg/public/icons/icon-128x128.png)
│   │   │   ├── [icon-144x144.png](./svg/public/icons/icon-144x144.png)
│   │   │   ├── [icon-152x152.png](./svg/public/icons/icon-152x152.png)
│   │   │   ├── [icon-16x16.png](./svg/public/icons/icon-16x16.png)
│   │   │   ├── [icon-180x180.png](./svg/public/icons/icon-180x180.png)
│   │   │   ├── [icon-192x192.png](./svg/public/icons/icon-192x192.png)
│   │   │   ├── [icon-256x256.png](./svg/public/icons/icon-256x256.png)
│   │   │   ├── [icon-32x32.png](./svg/public/icons/icon-32x32.png)
│   │   │   ├── [icon-384x384.png](./svg/public/icons/icon-384x384.png)
│   │   │   ├── [icon-48x48.png](./svg/public/icons/icon-48x48.png)
│   │   │   ├── [icon-512x512.png](./svg/public/icons/icon-512x512.png)
│   │   │   ├── [icon-64x64.png](./svg/public/icons/icon-64x64.png)
│   │   │   ├── [icon-72x72.png](./svg/public/icons/icon-72x72.png)
│   │   │   ├── [icon-96x96.png](./svg/public/icons/icon-96x96.png)
│   │   │   └── [icon.svg](./svg/public/icons/icon.svg)
│   │   ├── [apple-touch-icon.png](./svg/public/apple-touch-icon.png)
│   │   ├── [favicon.ico](./svg/public/favicon.ico)
│   │   ├── [manifest.json](./svg/public/manifest.json)
│   │   ├── [robots.txt](./svg/public/robots.txt)
│   │   ├── [sitemap.xml](./svg/public/sitemap.xml)
│   │   └── [sw.js](./svg/public/sw.js)
│   ├── src/
│   │   ├── app/
│   │   │   ├── (auth)/
│   │   │   │   ├── forget-password/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./svg/src/app/(auth)/forget-password/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./svg/src/app/(auth)/forget-password/page.tsx)
│   │   │   │   ├── profile/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./svg/src/app/(auth)/profile/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./svg/src/app/(auth)/profile/page.tsx)
│   │   │   │   ├── reset-password/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./svg/src/app/(auth)/reset-password/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./svg/src/app/(auth)/reset-password/page.tsx)
│   │   │   │   ├── sign-in/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./svg/src/app/(auth)/sign-in/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./svg/src/app/(auth)/sign-in/page.tsx)
│   │   │   │   └── sign-up/
│   │   │   │       ├── __tests__/
│   │   │   │       │   └── [page.test.tsx](./svg/src/app/(auth)/sign-up/__tests__/page.test.tsx)
│   │   │   │       └── [page.tsx](./svg/src/app/(auth)/sign-up/page.tsx)
│   │   │   ├── (info)/
│   │   │   │   ├── about/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./svg/src/app/(info)/about/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./svg/src/app/(info)/about/page.tsx)
│   │   │   │   ├── downloads/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./svg/src/app/(info)/downloads/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./svg/src/app/(info)/downloads/page.tsx)
│   │   │   │   └── version/
│   │   │   │       ├── __tests__/
│   │   │   │       │   └── [page.test.tsx](./svg/src/app/(info)/version/__tests__/page.test.tsx)
│   │   │   │       └── [page.tsx](./svg/src/app/(info)/version/page.tsx)
│   │   │   ├── __tests__/
│   │   │   │   ├── [error.test.tsx](./svg/src/app/__tests__/error.test.tsx)
│   │   │   │   ├── [forbidden.test.tsx](./svg/src/app/__tests__/forbidden.test.tsx)
│   │   │   │   ├── [global-error.test.tsx](./svg/src/app/__tests__/global-error.test.tsx)
│   │   │   │   ├── [home-page.test.tsx](./svg/src/app/__tests__/home-page.test.tsx)
│   │   │   │   ├── [layout.test.tsx](./svg/src/app/__tests__/layout.test.tsx)
│   │   │   │   ├── [loading.test.tsx](./svg/src/app/__tests__/loading.test.tsx)
│   │   │   │   ├── [not-found.test.tsx](./svg/src/app/__tests__/not-found.test.tsx)
│   │   │   │   ├── [robots.test.ts](./svg/src/app/__tests__/robots.test.ts)
│   │   │   │   ├── [template.test.tsx](./svg/src/app/__tests__/template.test.tsx)
│   │   │   │   └── [unauthorized.test.tsx](./svg/src/app/__tests__/unauthorized.test.tsx)
│   │   │   ├── edit/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [page.test.tsx](./svg/src/app/edit/__tests__/page.test.tsx)
│   │   │   │   ├── code/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./svg/src/app/edit/code/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./svg/src/app/edit/code/page.tsx)
│   │   │   │   └── [page.tsx](./svg/src/app/edit/page.tsx)
│   │   │   ├── settings/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [page.test.tsx](./svg/src/app/settings/__tests__/page.test.tsx)
│   │   │   │   └── [page.tsx](./svg/src/app/settings/page.tsx)
│   │   │   ├── [default.tsx](./svg/src/app/default.tsx)
│   │   │   ├── [error.tsx](./svg/src/app/error.tsx)
│   │   │   ├── [favicon.ico](./svg/src/app/favicon.ico)
│   │   │   ├── [forbidden.tsx](./svg/src/app/forbidden.tsx)
│   │   │   ├── [global-error.tsx](./svg/src/app/global-error.tsx)
│   │   │   ├── [layout.tsx](./svg/src/app/layout.tsx)
│   │   │   ├── [loading.tsx](./svg/src/app/loading.tsx)
│   │   │   ├── [not-found.tsx](./svg/src/app/not-found.tsx)
│   │   │   ├── [page.tsx](./svg/src/app/page.tsx)
│   │   │   ├── [robots.ts](./svg/src/app/robots.ts)
│   │   │   ├── [template.tsx](./svg/src/app/template.tsx)
│   │   │   └── [unauthorized.tsx](./svg/src/app/unauthorized.tsx)
│   │   ├── components/
│   │   │   ├── __tests__/
│   │   │   │   └── [SWProvider.test.tsx](./svg/src/components/__tests__/SWProvider.test.tsx)
│   │   │   ├── atoms/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [FileDropzone.test.tsx](./svg/src/components/atoms/__tests__/FileDropzone.test.tsx)
│   │   │   │   │   └── [PageTransition.test.tsx](./svg/src/components/atoms/__tests__/PageTransition.test.tsx)
│   │   │   │   ├── [FileDropzone.tsx](./svg/src/components/atoms/FileDropzone.tsx)
│   │   │   │   └── [PageTransition.tsx](./svg/src/components/atoms/PageTransition.tsx)
│   │   │   ├── organisms/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [IconGenerator.test.tsx](./svg/src/components/organisms/__tests__/IconGenerator.test.tsx)
│   │   │   │   │   ├── [IconWorkbench.test.tsx](./svg/src/components/organisms/__tests__/IconWorkbench.test.tsx)
│   │   │   │   │   └── [ToastContainer.test.tsx](./svg/src/components/organisms/__tests__/ToastContainer.test.tsx)
│   │   │   │   ├── [Header.tsx](./svg/src/components/organisms/Header.tsx)
│   │   │   │   ├── [IconGenerator.tsx](./svg/src/components/organisms/IconGenerator.tsx)
│   │   │   │   ├── [IconWorkbench.tsx](./svg/src/components/organisms/IconWorkbench.tsx)
│   │   │   │   └── [ToastContainer.tsx](./svg/src/components/organisms/ToastContainer.tsx)
│   │   │   └── templates/
│   │   │       ├── __tests__/
│   │   │       │   ├── [AboutTemplate.test.tsx](./svg/src/components/templates/__tests__/AboutTemplate.test.tsx)
│   │   │       │   ├── [DownloadsTemplate.test.tsx](./svg/src/components/templates/__tests__/DownloadsTemplate.test.tsx)
│   │   │       │   ├── [ErrorTemplate.test.tsx](./svg/src/components/templates/__tests__/ErrorTemplate.test.tsx)
│   │   │       │   └── [VersionTemplate.test.tsx](./svg/src/components/templates/__tests__/VersionTemplate.test.tsx)
│   │   │       ├── [AboutTemplate.tsx](./svg/src/components/templates/AboutTemplate.tsx)
│   │   │       ├── [DownloadsTemplate.tsx](./svg/src/components/templates/DownloadsTemplate.tsx)
│   │   │       ├── [ErrorTemplate.tsx](./svg/src/components/templates/ErrorTemplate.tsx)
│   │   │       └── [VersionTemplate.tsx](./svg/src/components/templates/VersionTemplate.tsx)
│   │   ├── content/
│   │   │   ├── [about.ts](./svg/src/content/about.ts)
│   │   │   ├── [download.ts](./svg/src/content/download.ts)
│   │   │   └── [version.ts](./svg/src/content/version.ts)
│   │   ├── data/
│   │   │   ├── __tests__/
│   │   │   │   ├── [models.test.ts](./svg/src/data/__tests__/models.test.ts)
│   │   │   │   └── [seed.test.ts](./svg/src/data/__tests__/seed.test.ts)
│   │   │   ├── [iconPresets.ts](./svg/src/data/iconPresets.ts)
│   │   │   ├── [models.ts](./svg/src/data/models.ts)
│   │   │   └── [seed.ts](./svg/src/data/seed.ts)
│   │   ├── hooks/
│   │   │   ├── __tests__/
│   │   │   │   └── [useSWRegister.test.ts](./svg/src/hooks/__tests__/useSWRegister.test.ts)
│   │   │   └── [useSWRegister.ts](./svg/src/hooks/useSWRegister.ts)
│   │   ├── lib/
│   │   │   ├── __tests__/
│   │   │   │   ├── [db.ssr.test.ts](./svg/src/lib/__tests__/db.ssr.test.ts)
│   │   │   │   └── [db.test.ts](./svg/src/lib/__tests__/db.test.ts)
│   │   │   └── [db.ts](./svg/src/lib/db.ts)
│   │   ├── providers/
│   │   │   ├── __tests__/
│   │   │   │   ├── [DataProvider.test.tsx](./svg/src/providers/__tests__/DataProvider.test.tsx)
│   │   │   │   ├── [Providers.test.tsx](./svg/src/providers/__tests__/Providers.test.tsx)
│   │   │   │   └── [ToastProvider.test.tsx](./svg/src/providers/__tests__/ToastProvider.test.tsx)
│   │   │   ├── [DataProvider.tsx](./svg/src/providers/DataProvider.tsx)
│   │   │   ├── [Providers.tsx](./svg/src/providers/Providers.tsx)
│   │   │   ├── [SWProvider.tsx](./svg/src/providers/SWProvider.tsx)
│   │   │   └── [ToastProvider.tsx](./svg/src/providers/ToastProvider.tsx)
│   │   ├── styles/
│   │   │   ├── [globals.css](./svg/src/styles/globals.css)
│   │   │   └── [themes.css](./svg/src/styles/themes.css)
│   │   ├── types/
│   │   │   └── [index.ts](./svg/src/types/index.ts)
│   │   └── utils/
│   │       ├── __tests__/
│   │       │   ├── [format.test.ts](./svg/src/utils/__tests__/format.test.ts)
│   │       │   ├── [iconGenerator.test.ts](./svg/src/utils/__tests__/iconGenerator.test.ts)
│   │       │   └── [svgToCanvas.test.ts](./svg/src/utils/__tests__/svgToCanvas.test.ts)
│   │       ├── [format.ts](./svg/src/utils/format.ts)
│   │       ├── [iconGenerator.ts](./svg/src/utils/iconGenerator.ts)
│   │       └── [svgToCanvas.ts](./svg/src/utils/svgToCanvas.ts)
│   ├── src-tauri/
│   │   ├── capabilities/
│   │   │   └── [default.json](./svg/src-tauri/capabilities/default.json)
│   │   ├── icons/
│   │   │   ├── android/
│   │   │   │   ├── mipmap-anydpi-v26/
│   │   │   │   │   └── [ic_launcher.xml](./svg/src-tauri/icons/android/mipmap-anydpi-v26/ic_launcher.xml)
│   │   │   │   ├── mipmap-hdpi/
│   │   │   │   │   ├── [ic_launcher.png](./svg/src-tauri/icons/android/mipmap-hdpi/ic_launcher.png)
│   │   │   │   │   ├── [ic_launcher_foreground.png](./svg/src-tauri/icons/android/mipmap-hdpi/ic_launcher_foreground.png)
│   │   │   │   │   └── [ic_launcher_round.png](./svg/src-tauri/icons/android/mipmap-hdpi/ic_launcher_round.png)
│   │   │   │   ├── mipmap-mdpi/
│   │   │   │   │   ├── [ic_launcher.png](./svg/src-tauri/icons/android/mipmap-mdpi/ic_launcher.png)
│   │   │   │   │   ├── [ic_launcher_foreground.png](./svg/src-tauri/icons/android/mipmap-mdpi/ic_launcher_foreground.png)
│   │   │   │   │   └── [ic_launcher_round.png](./svg/src-tauri/icons/android/mipmap-mdpi/ic_launcher_round.png)
│   │   │   │   ├── mipmap-xhdpi/
│   │   │   │   │   ├── [ic_launcher.png](./svg/src-tauri/icons/android/mipmap-xhdpi/ic_launcher.png)
│   │   │   │   │   ├── [ic_launcher_foreground.png](./svg/src-tauri/icons/android/mipmap-xhdpi/ic_launcher_foreground.png)
│   │   │   │   │   └── [ic_launcher_round.png](./svg/src-tauri/icons/android/mipmap-xhdpi/ic_launcher_round.png)
│   │   │   │   ├── mipmap-xxhdpi/
│   │   │   │   │   ├── [ic_launcher.png](./svg/src-tauri/icons/android/mipmap-xxhdpi/ic_launcher.png)
│   │   │   │   │   ├── [ic_launcher_foreground.png](./svg/src-tauri/icons/android/mipmap-xxhdpi/ic_launcher_foreground.png)
│   │   │   │   │   └── [ic_launcher_round.png](./svg/src-tauri/icons/android/mipmap-xxhdpi/ic_launcher_round.png)
│   │   │   │   ├── mipmap-xxxhdpi/
│   │   │   │   │   ├── [ic_launcher.png](./svg/src-tauri/icons/android/mipmap-xxxhdpi/ic_launcher.png)
│   │   │   │   │   ├── [ic_launcher_foreground.png](./svg/src-tauri/icons/android/mipmap-xxxhdpi/ic_launcher_foreground.png)
│   │   │   │   │   └── [ic_launcher_round.png](./svg/src-tauri/icons/android/mipmap-xxxhdpi/ic_launcher_round.png)
│   │   │   │   └── values/
│   │   │   │       └── [ic_launcher_background.xml](./svg/src-tauri/icons/android/values/ic_launcher_background.xml)
│   │   │   ├── ios/
│   │   │   │   ├── [AppIcon-20x20@1x.png](./svg/src-tauri/icons/ios/AppIcon-20x20@1x.png)
│   │   │   │   ├── [AppIcon-20x20@2x-1.png](./svg/src-tauri/icons/ios/AppIcon-20x20@2x-1.png)
│   │   │   │   ├── [AppIcon-20x20@2x.png](./svg/src-tauri/icons/ios/AppIcon-20x20@2x.png)
│   │   │   │   ├── [AppIcon-20x20@3x.png](./svg/src-tauri/icons/ios/AppIcon-20x20@3x.png)
│   │   │   │   ├── [AppIcon-29x29@1x.png](./svg/src-tauri/icons/ios/AppIcon-29x29@1x.png)
│   │   │   │   ├── [AppIcon-29x29@2x-1.png](./svg/src-tauri/icons/ios/AppIcon-29x29@2x-1.png)
│   │   │   │   ├── [AppIcon-29x29@2x.png](./svg/src-tauri/icons/ios/AppIcon-29x29@2x.png)
│   │   │   │   ├── [AppIcon-29x29@3x.png](./svg/src-tauri/icons/ios/AppIcon-29x29@3x.png)
│   │   │   │   ├── [AppIcon-40x40@1x.png](./svg/src-tauri/icons/ios/AppIcon-40x40@1x.png)
│   │   │   │   ├── [AppIcon-40x40@2x-1.png](./svg/src-tauri/icons/ios/AppIcon-40x40@2x-1.png)
│   │   │   │   ├── [AppIcon-40x40@2x.png](./svg/src-tauri/icons/ios/AppIcon-40x40@2x.png)
│   │   │   │   ├── [AppIcon-40x40@3x.png](./svg/src-tauri/icons/ios/AppIcon-40x40@3x.png)
│   │   │   │   ├── [AppIcon-512@2x.png](./svg/src-tauri/icons/ios/AppIcon-512@2x.png)
│   │   │   │   ├── [AppIcon-60x60@2x.png](./svg/src-tauri/icons/ios/AppIcon-60x60@2x.png)
│   │   │   │   ├── [AppIcon-60x60@3x.png](./svg/src-tauri/icons/ios/AppIcon-60x60@3x.png)
│   │   │   │   ├── [AppIcon-76x76@1x.png](./svg/src-tauri/icons/ios/AppIcon-76x76@1x.png)
│   │   │   │   ├── [AppIcon-76x76@2x.png](./svg/src-tauri/icons/ios/AppIcon-76x76@2x.png)
│   │   │   │   └── [AppIcon-83.5x83.5@2x.png](./svg/src-tauri/icons/ios/AppIcon-83.5x83.5@2x.png)
│   │   │   ├── [128x128.png](./svg/src-tauri/icons/128x128.png)
│   │   │   ├── [128x128@2x.png](./svg/src-tauri/icons/128x128@2x.png)
│   │   │   ├── [256x256.png](./svg/src-tauri/icons/256x256.png)
│   │   │   ├── [32x32.png](./svg/src-tauri/icons/32x32.png)
│   │   │   ├── [64x64.png](./svg/src-tauri/icons/64x64.png)
│   │   │   ├── [Square107x107Logo.png](./svg/src-tauri/icons/Square107x107Logo.png)
│   │   │   ├── [Square142x142Logo.png](./svg/src-tauri/icons/Square142x142Logo.png)
│   │   │   ├── [Square150x150Logo.png](./svg/src-tauri/icons/Square150x150Logo.png)
│   │   │   ├── [Square284x284Logo.png](./svg/src-tauri/icons/Square284x284Logo.png)
│   │   │   ├── [Square30x30Logo.png](./svg/src-tauri/icons/Square30x30Logo.png)
│   │   │   ├── [Square310x310Logo.png](./svg/src-tauri/icons/Square310x310Logo.png)
│   │   │   ├── [Square44x44Logo.png](./svg/src-tauri/icons/Square44x44Logo.png)
│   │   │   ├── [Square71x71Logo.png](./svg/src-tauri/icons/Square71x71Logo.png)
│   │   │   ├── [Square89x89Logo.png](./svg/src-tauri/icons/Square89x89Logo.png)
│   │   │   ├── [StoreLogo.png](./svg/src-tauri/icons/StoreLogo.png)
│   │   │   ├── [create-icons.sh](./svg/src-tauri/icons/create-icons.sh)
│   │   │   ├── [icon.icns](./svg/src-tauri/icons/icon.icns)
│   │   │   ├── [icon.ico](./svg/src-tauri/icons/icon.ico)
│   │   │   └── [icon.png](./svg/src-tauri/icons/icon.png)
│   │   ├── src/
│   │   │   ├── [lib.rs](./svg/src-tauri/src/lib.rs)
│   │   │   └── [main.rs](./svg/src-tauri/src/main.rs)
│   │   ├── [Cargo.lock](./svg/src-tauri/Cargo.lock)
│   │   ├── [Cargo.toml](./svg/src-tauri/Cargo.toml)
│   │   ├── [build.rs](./svg/src-tauri/build.rs)
│   │   └── [tauri.conf.json](./svg/src-tauri/tauri.conf.json)
│   ├── [AGENTS.md](./svg/AGENTS.md)
│   ├── [Dockerfile](./svg/Dockerfile)
│   ├── [LICENSE](./svg/LICENSE)
│   ├── [README.md](./svg/README.md)
│   ├── [TREE.md](./svg/TREE.md)
│   ├── [docker-compose.yaml](./svg/docker-compose.yaml)
│   ├── [eslint.config.mts](./svg/eslint.config.mts)
│   ├── [jest.config.ts](./svg/jest.config.ts)
│   ├── [jest.setup.ts](./svg/jest.setup.ts)
│   ├── [next.config.ts](./svg/next.config.ts)
│   ├── [package.json](./svg/package.json)
│   ├── [playwright.config.ts](./svg/playwright.config.ts)
│   ├── [postcss.config.mjs](./svg/postcss.config.mjs)
│   └── [tsconfig.json](./svg/tsconfig.json)
├── video/
│   ├── docs/
│   │   ├── [ARCHITECTURE.md](./video/docs/ARCHITECTURE.md)
│   │   ├── [CONTRIBUTING.md](./video/docs/CONTRIBUTING.md)
│   │   ├── [DOWNLOADS.md](./video/docs/DOWNLOADS.md)
│   │   ├── [PACKAGING.md](./video/docs/PACKAGING.md)
│   │   └── [ROADMAP.md](./video/docs/ROADMAP.md)
│   ├── e2e/
│   │   ├── screenshots/
│   │   │   └── [about.png](./video/e2e/screenshots/about.png)
│   │   ├── [about.spec.ts](./video/e2e/about.spec.ts)
│   │   ├── [downloads.spec.ts](./video/e2e/downloads.spec.ts)
│   │   ├── [home.spec.ts](./video/e2e/home.spec.ts)
│   │   └── [version.spec.ts](./video/e2e/version.spec.ts)
│   ├── public/
│   │   ├── icons/
│   │   │   ├── [icon-128x128.png](./video/public/icons/icon-128x128.png)
│   │   │   ├── [icon-144x144.png](./video/public/icons/icon-144x144.png)
│   │   │   ├── [icon-152x152.png](./video/public/icons/icon-152x152.png)
│   │   │   ├── [icon-16x16.png](./video/public/icons/icon-16x16.png)
│   │   │   ├── [icon-180x180.png](./video/public/icons/icon-180x180.png)
│   │   │   ├── [icon-192x192.png](./video/public/icons/icon-192x192.png)
│   │   │   ├── [icon-256x256.png](./video/public/icons/icon-256x256.png)
│   │   │   ├── [icon-32x32.png](./video/public/icons/icon-32x32.png)
│   │   │   ├── [icon-384x384.png](./video/public/icons/icon-384x384.png)
│   │   │   ├── [icon-48x48.png](./video/public/icons/icon-48x48.png)
│   │   │   ├── [icon-512x512.png](./video/public/icons/icon-512x512.png)
│   │   │   ├── [icon-64x64.png](./video/public/icons/icon-64x64.png)
│   │   │   ├── [icon-72x72.png](./video/public/icons/icon-72x72.png)
│   │   │   ├── [icon-96x96.png](./video/public/icons/icon-96x96.png)
│   │   │   └── [icon.svg](./video/public/icons/icon.svg)
│   │   ├── [apple-touch-icon.png](./video/public/apple-touch-icon.png)
│   │   ├── [favicon.ico](./video/public/favicon.ico)
│   │   ├── [manifest.json](./video/public/manifest.json)
│   │   ├── [robots.txt](./video/public/robots.txt)
│   │   ├── [sitemap.xml](./video/public/sitemap.xml)
│   │   └── [sw.js](./video/public/sw.js)
│   ├── src/
│   │   ├── app/
│   │   │   ├── (auth)/
│   │   │   │   ├── forget-password/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./video/src/app/(auth)/forget-password/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./video/src/app/(auth)/forget-password/page.tsx)
│   │   │   │   ├── profile/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./video/src/app/(auth)/profile/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./video/src/app/(auth)/profile/page.tsx)
│   │   │   │   ├── reset-password/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./video/src/app/(auth)/reset-password/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./video/src/app/(auth)/reset-password/page.tsx)
│   │   │   │   ├── sign-in/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./video/src/app/(auth)/sign-in/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./video/src/app/(auth)/sign-in/page.tsx)
│   │   │   │   └── sign-up/
│   │   │   │       ├── __tests__/
│   │   │   │       │   └── [page.test.tsx](./video/src/app/(auth)/sign-up/__tests__/page.test.tsx)
│   │   │   │       └── [page.tsx](./video/src/app/(auth)/sign-up/page.tsx)
│   │   │   ├── (info)/
│   │   │   │   ├── about/
│   │   │   │   │   └── [page.tsx](./video/src/app/(info)/about/page.tsx)
│   │   │   │   ├── downloads/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./video/src/app/(info)/downloads/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./video/src/app/(info)/downloads/page.tsx)
│   │   │   │   └── version/
│   │   │   │       └── [page.tsx](./video/src/app/(info)/version/page.tsx)
│   │   │   ├── __tests__/
│   │   │   │   ├── [error.test.tsx](./video/src/app/__tests__/error.test.tsx)
│   │   │   │   ├── [forbidden.test.tsx](./video/src/app/__tests__/forbidden.test.tsx)
│   │   │   │   ├── [global-error.test.tsx](./video/src/app/__tests__/global-error.test.tsx)
│   │   │   │   ├── [layout.test.tsx](./video/src/app/__tests__/layout.test.tsx)
│   │   │   │   ├── [loading.test.tsx](./video/src/app/__tests__/loading.test.tsx)
│   │   │   │   ├── [not-found.test.tsx](./video/src/app/__tests__/not-found.test.tsx)
│   │   │   │   ├── [page.test.tsx](./video/src/app/__tests__/page.test.tsx)
│   │   │   │   ├── [robots.test.ts](./video/src/app/__tests__/robots.test.ts)
│   │   │   │   ├── [template.test.tsx](./video/src/app/__tests__/template.test.tsx)
│   │   │   │   └── [unauthorized.test.tsx](./video/src/app/__tests__/unauthorized.test.tsx)
│   │   │   ├── tools/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [page.test.tsx](./video/src/app/tools/__tests__/page.test.tsx)
│   │   │   │   └── [page.tsx](./video/src/app/tools/page.tsx)
│   │   │   ├── [default.tsx](./video/src/app/default.tsx)
│   │   │   ├── [error.tsx](./video/src/app/error.tsx)
│   │   │   ├── [favicon.ico](./video/src/app/favicon.ico)
│   │   │   ├── [forbidden.tsx](./video/src/app/forbidden.tsx)
│   │   │   ├── [global-error.tsx](./video/src/app/global-error.tsx)
│   │   │   ├── [layout.tsx](./video/src/app/layout.tsx)
│   │   │   ├── [loading.tsx](./video/src/app/loading.tsx)
│   │   │   ├── [not-found.tsx](./video/src/app/not-found.tsx)
│   │   │   ├── [page.tsx](./video/src/app/page.tsx)
│   │   │   ├── [robots.ts](./video/src/app/robots.ts)
│   │   │   ├── [template.tsx](./video/src/app/template.tsx)
│   │   │   └── [unauthorized.tsx](./video/src/app/unauthorized.tsx)
│   │   ├── components/
│   │   │   ├── atoms/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [VideoFileUpload.test.tsx](./video/src/components/atoms/__tests__/VideoFileUpload.test.tsx)
│   │   │   │   └── [VideoFileUpload.tsx](./video/src/components/atoms/VideoFileUpload.tsx)
│   │   │   ├── organisms/
│   │   │   │   └── [Header.tsx](./video/src/components/organisms/Header.tsx)
│   │   │   ├── templates/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [AboutTemplate.test.tsx](./video/src/components/templates/__tests__/AboutTemplate.test.tsx)
│   │   │   │   │   ├── [DownloadsTemplate.test.tsx](./video/src/components/templates/__tests__/DownloadsTemplate.test.tsx)
│   │   │   │   │   ├── [ErrorTemplate.test.tsx](./video/src/components/templates/__tests__/ErrorTemplate.test.tsx)
│   │   │   │   │   └── [VersionTemplate.test.tsx](./video/src/components/templates/__tests__/VersionTemplate.test.tsx)
│   │   │   │   ├── [AboutTemplate.tsx](./video/src/components/templates/AboutTemplate.tsx)
│   │   │   │   ├── [DownloadsTemplate.tsx](./video/src/components/templates/DownloadsTemplate.tsx)
│   │   │   │   ├── [ErrorTemplate.tsx](./video/src/components/templates/ErrorTemplate.tsx)
│   │   │   │   └── [VersionTemplate.tsx](./video/src/components/templates/VersionTemplate.tsx)
│   │   │   └── tools/
│   │   │       ├── __tests__/
│   │   │       │   ├── [AudioTranscribeTool.test.tsx](./video/src/components/tools/__tests__/AudioTranscribeTool.test.tsx)
│   │   │       │   ├── [GenerateSubtitleTool.test.tsx](./video/src/components/tools/__tests__/GenerateSubtitleTool.test.tsx)
│   │   │       │   ├── [VideoCompressTool.test.tsx](./video/src/components/tools/__tests__/VideoCompressTool.test.tsx)
│   │   │       │   ├── [VideoConvertTool.test.tsx](./video/src/components/tools/__tests__/VideoConvertTool.test.tsx)
│   │   │       │   ├── [VideoCropTool.test.tsx](./video/src/components/tools/__tests__/VideoCropTool.test.tsx)
│   │   │       │   ├── [VideoDownloadTool.test.tsx](./video/src/components/tools/__tests__/VideoDownloadTool.test.tsx)
│   │   │       │   ├── [VideoExtractAudioTool.test.tsx](./video/src/components/tools/__tests__/VideoExtractAudioTool.test.tsx)
│   │   │       │   ├── [VideoExtractFramesTool.test.tsx](./video/src/components/tools/__tests__/VideoExtractFramesTool.test.tsx)
│   │   │       │   ├── [VideoMergeTool.test.tsx](./video/src/components/tools/__tests__/VideoMergeTool.test.tsx)
│   │   │       │   ├── [VideoMuteTool.test.tsx](./video/src/components/tools/__tests__/VideoMuteTool.test.tsx)
│   │   │       │   ├── [VideoResizeTool.test.tsx](./video/src/components/tools/__tests__/VideoResizeTool.test.tsx)
│   │   │       │   ├── [VideoSpeedTool.test.tsx](./video/src/components/tools/__tests__/VideoSpeedTool.test.tsx)
│   │   │       │   ├── [VideoStabilizeTool.test.tsx](./video/src/components/tools/__tests__/VideoStabilizeTool.test.tsx)
│   │   │       │   ├── [VideoToolsPage.test.tsx](./video/src/components/tools/__tests__/VideoToolsPage.test.tsx)
│   │   │       │   └── [VideoTrimTool.test.tsx](./video/src/components/tools/__tests__/VideoTrimTool.test.tsx)
│   │   │       ├── [AudioTranscribeTool.tsx](./video/src/components/tools/AudioTranscribeTool.tsx)
│   │   │       ├── [GenerateSubtitleTool.tsx](./video/src/components/tools/GenerateSubtitleTool.tsx)
│   │   │       ├── [VideoCompressTool.tsx](./video/src/components/tools/VideoCompressTool.tsx)
│   │   │       ├── [VideoConvertTool.tsx](./video/src/components/tools/VideoConvertTool.tsx)
│   │   │       ├── [VideoCropTool.tsx](./video/src/components/tools/VideoCropTool.tsx)
│   │   │       ├── [VideoDownloadTool.tsx](./video/src/components/tools/VideoDownloadTool.tsx)
│   │   │       ├── [VideoExtractAudioTool.tsx](./video/src/components/tools/VideoExtractAudioTool.tsx)
│   │   │       ├── [VideoExtractFramesTool.tsx](./video/src/components/tools/VideoExtractFramesTool.tsx)
│   │   │       ├── [VideoMergeTool.tsx](./video/src/components/tools/VideoMergeTool.tsx)
│   │   │       ├── [VideoMuteTool.tsx](./video/src/components/tools/VideoMuteTool.tsx)
│   │   │       ├── [VideoResizeTool.tsx](./video/src/components/tools/VideoResizeTool.tsx)
│   │   │       ├── [VideoSpeedTool.tsx](./video/src/components/tools/VideoSpeedTool.tsx)
│   │   │       ├── [VideoStabilizeTool.tsx](./video/src/components/tools/VideoStabilizeTool.tsx)
│   │   │       ├── [VideoToolsPage.tsx](./video/src/components/tools/VideoToolsPage.tsx)
│   │   │       └── [VideoTrimTool.tsx](./video/src/components/tools/VideoTrimTool.tsx)
│   │   ├── content/
│   │   │   ├── [about.ts](./video/src/content/about.ts)
│   │   │   ├── [download.ts](./video/src/content/download.ts)
│   │   │   └── [version.ts](./video/src/content/version.ts)
│   │   ├── data/
│   │   │   ├── __tests__/
│   │   │   │   └── [video-tools.test.ts](./video/src/data/__tests__/video-tools.test.ts)
│   │   │   └── [video-tools.ts](./video/src/data/video-tools.ts)
│   │   ├── lib/
│   │   │   ├── __tests__/
│   │   │   │   └── [video-tools.test.ts](./video/src/lib/__tests__/video-tools.test.ts)
│   │   │   └── [video-tools.ts](./video/src/lib/video-tools.ts)
│   │   ├── styles/
│   │   │   ├── [globals.css](./video/src/styles/globals.css)
│   │   │   └── [themes.css](./video/src/styles/themes.css)
│   │   └── types/
│   │       └── [speech-recognition.d.ts](./video/src/types/speech-recognition.d.ts)
│   ├── src-tauri/
│   │   ├── capabilities/
│   │   │   └── [default.json](./video/src-tauri/capabilities/default.json)
│   │   ├── icons/
│   │   │   ├── android/
│   │   │   │   ├── mipmap-anydpi-v26/
│   │   │   │   │   └── [ic_launcher.xml](./video/src-tauri/icons/android/mipmap-anydpi-v26/ic_launcher.xml)
│   │   │   │   ├── mipmap-hdpi/
│   │   │   │   │   ├── [ic_launcher.png](./video/src-tauri/icons/android/mipmap-hdpi/ic_launcher.png)
│   │   │   │   │   ├── [ic_launcher_foreground.png](./video/src-tauri/icons/android/mipmap-hdpi/ic_launcher_foreground.png)
│   │   │   │   │   └── [ic_launcher_round.png](./video/src-tauri/icons/android/mipmap-hdpi/ic_launcher_round.png)
│   │   │   │   ├── mipmap-mdpi/
│   │   │   │   │   ├── [ic_launcher.png](./video/src-tauri/icons/android/mipmap-mdpi/ic_launcher.png)
│   │   │   │   │   ├── [ic_launcher_foreground.png](./video/src-tauri/icons/android/mipmap-mdpi/ic_launcher_foreground.png)
│   │   │   │   │   └── [ic_launcher_round.png](./video/src-tauri/icons/android/mipmap-mdpi/ic_launcher_round.png)
│   │   │   │   ├── mipmap-xhdpi/
│   │   │   │   │   ├── [ic_launcher.png](./video/src-tauri/icons/android/mipmap-xhdpi/ic_launcher.png)
│   │   │   │   │   ├── [ic_launcher_foreground.png](./video/src-tauri/icons/android/mipmap-xhdpi/ic_launcher_foreground.png)
│   │   │   │   │   └── [ic_launcher_round.png](./video/src-tauri/icons/android/mipmap-xhdpi/ic_launcher_round.png)
│   │   │   │   ├── mipmap-xxhdpi/
│   │   │   │   │   ├── [ic_launcher.png](./video/src-tauri/icons/android/mipmap-xxhdpi/ic_launcher.png)
│   │   │   │   │   ├── [ic_launcher_foreground.png](./video/src-tauri/icons/android/mipmap-xxhdpi/ic_launcher_foreground.png)
│   │   │   │   │   └── [ic_launcher_round.png](./video/src-tauri/icons/android/mipmap-xxhdpi/ic_launcher_round.png)
│   │   │   │   ├── mipmap-xxxhdpi/
│   │   │   │   │   ├── [ic_launcher.png](./video/src-tauri/icons/android/mipmap-xxxhdpi/ic_launcher.png)
│   │   │   │   │   ├── [ic_launcher_foreground.png](./video/src-tauri/icons/android/mipmap-xxxhdpi/ic_launcher_foreground.png)
│   │   │   │   │   └── [ic_launcher_round.png](./video/src-tauri/icons/android/mipmap-xxxhdpi/ic_launcher_round.png)
│   │   │   │   └── values/
│   │   │   │       └── [ic_launcher_background.xml](./video/src-tauri/icons/android/values/ic_launcher_background.xml)
│   │   │   ├── ios/
│   │   │   │   ├── [AppIcon-20x20@1x.png](./video/src-tauri/icons/ios/AppIcon-20x20@1x.png)
│   │   │   │   ├── [AppIcon-20x20@2x-1.png](./video/src-tauri/icons/ios/AppIcon-20x20@2x-1.png)
│   │   │   │   ├── [AppIcon-20x20@2x.png](./video/src-tauri/icons/ios/AppIcon-20x20@2x.png)
│   │   │   │   ├── [AppIcon-20x20@3x.png](./video/src-tauri/icons/ios/AppIcon-20x20@3x.png)
│   │   │   │   ├── [AppIcon-29x29@1x.png](./video/src-tauri/icons/ios/AppIcon-29x29@1x.png)
│   │   │   │   ├── [AppIcon-29x29@2x-1.png](./video/src-tauri/icons/ios/AppIcon-29x29@2x-1.png)
│   │   │   │   ├── [AppIcon-29x29@2x.png](./video/src-tauri/icons/ios/AppIcon-29x29@2x.png)
│   │   │   │   ├── [AppIcon-29x29@3x.png](./video/src-tauri/icons/ios/AppIcon-29x29@3x.png)
│   │   │   │   ├── [AppIcon-40x40@1x.png](./video/src-tauri/icons/ios/AppIcon-40x40@1x.png)
│   │   │   │   ├── [AppIcon-40x40@2x-1.png](./video/src-tauri/icons/ios/AppIcon-40x40@2x-1.png)
│   │   │   │   ├── [AppIcon-40x40@2x.png](./video/src-tauri/icons/ios/AppIcon-40x40@2x.png)
│   │   │   │   ├── [AppIcon-40x40@3x.png](./video/src-tauri/icons/ios/AppIcon-40x40@3x.png)
│   │   │   │   ├── [AppIcon-512@2x.png](./video/src-tauri/icons/ios/AppIcon-512@2x.png)
│   │   │   │   ├── [AppIcon-60x60@2x.png](./video/src-tauri/icons/ios/AppIcon-60x60@2x.png)
│   │   │   │   ├── [AppIcon-60x60@3x.png](./video/src-tauri/icons/ios/AppIcon-60x60@3x.png)
│   │   │   │   ├── [AppIcon-76x76@1x.png](./video/src-tauri/icons/ios/AppIcon-76x76@1x.png)
│   │   │   │   ├── [AppIcon-76x76@2x.png](./video/src-tauri/icons/ios/AppIcon-76x76@2x.png)
│   │   │   │   └── [AppIcon-83.5x83.5@2x.png](./video/src-tauri/icons/ios/AppIcon-83.5x83.5@2x.png)
│   │   │   ├── [128x128.png](./video/src-tauri/icons/128x128.png)
│   │   │   ├── [128x128@2x.png](./video/src-tauri/icons/128x128@2x.png)
│   │   │   ├── [256x256.png](./video/src-tauri/icons/256x256.png)
│   │   │   ├── [32x32.png](./video/src-tauri/icons/32x32.png)
│   │   │   ├── [64x64.png](./video/src-tauri/icons/64x64.png)
│   │   │   ├── [Square107x107Logo.png](./video/src-tauri/icons/Square107x107Logo.png)
│   │   │   ├── [Square142x142Logo.png](./video/src-tauri/icons/Square142x142Logo.png)
│   │   │   ├── [Square150x150Logo.png](./video/src-tauri/icons/Square150x150Logo.png)
│   │   │   ├── [Square284x284Logo.png](./video/src-tauri/icons/Square284x284Logo.png)
│   │   │   ├── [Square30x30Logo.png](./video/src-tauri/icons/Square30x30Logo.png)
│   │   │   ├── [Square310x310Logo.png](./video/src-tauri/icons/Square310x310Logo.png)
│   │   │   ├── [Square44x44Logo.png](./video/src-tauri/icons/Square44x44Logo.png)
│   │   │   ├── [Square71x71Logo.png](./video/src-tauri/icons/Square71x71Logo.png)
│   │   │   ├── [Square89x89Logo.png](./video/src-tauri/icons/Square89x89Logo.png)
│   │   │   ├── [StoreLogo.png](./video/src-tauri/icons/StoreLogo.png)
│   │   │   ├── [create-icons.sh](./video/src-tauri/icons/create-icons.sh)
│   │   │   ├── [icon.icns](./video/src-tauri/icons/icon.icns)
│   │   │   ├── [icon.ico](./video/src-tauri/icons/icon.ico)
│   │   │   └── [icon.png](./video/src-tauri/icons/icon.png)
│   │   ├── src/
│   │   │   ├── [lib.rs](./video/src-tauri/src/lib.rs)
│   │   │   └── [main.rs](./video/src-tauri/src/main.rs)
│   │   ├── [Cargo.lock](./video/src-tauri/Cargo.lock)
│   │   ├── [Cargo.toml](./video/src-tauri/Cargo.toml)
│   │   ├── [build.rs](./video/src-tauri/build.rs)
│   │   └── [tauri.conf.json](./video/src-tauri/tauri.conf.json)
│   ├── [AGENTS.md](./video/AGENTS.md)
│   ├── [Dockerfile](./video/Dockerfile)
│   ├── [LICENSE](./video/LICENSE)
│   ├── [README.md](./video/README.md)
│   ├── [TREE.md](./video/TREE.md)
│   ├── [docker-compose.yaml](./video/docker-compose.yaml)
│   ├── [eslint.config.mts](./video/eslint.config.mts)
│   ├── [jest.config.ts](./video/jest.config.ts)
│   ├── [jest.setup.ts](./video/jest.setup.ts)
│   ├── [next.config.ts](./video/next.config.ts)
│   ├── [package.json](./video/package.json)
│   ├── [playwright.config.ts](./video/playwright.config.ts)
│   ├── [postcss.config.mjs](./video/postcss.config.mjs)
│   └── [tsconfig.json](./video/tsconfig.json)
├── [README.md](./README.md)
└── [TREE.md](./TREE.md)
```

282 directories, 1098 files
