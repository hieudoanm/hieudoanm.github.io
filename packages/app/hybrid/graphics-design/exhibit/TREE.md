# TREE

```text
├── docs/
│   ├── [ARCHITECTURE.md](./docs/ARCHITECTURE.md)
│   ├── [CONTRIBUTING.md](./docs/CONTRIBUTING.md)
│   ├── [DOWNLOADS.md](./docs/DOWNLOADS.md)
│   ├── [PACKAGING.md](./docs/PACKAGING.md)
│   └── [ROADMAP.md](./docs/ROADMAP.md)
├── e2e/
│   ├── wallet/
│   │   ├── [auth-guard.spec.ts](./e2e/wallet/auth-guard.spec.ts)
│   │   ├── [cards.spec.ts](./e2e/wallet/cards.spec.ts)
│   │   ├── [exchange.spec.ts](./e2e/wallet/exchange.spec.ts)
│   │   ├── [helpers.ts](./e2e/wallet/helpers.ts)
│   │   ├── [index.spec.ts](./e2e/wallet/index.spec.ts)
│   │   ├── [navigation.spec.ts](./e2e/wallet/navigation.spec.ts)
│   │   ├── [pay.spec.ts](./e2e/wallet/pay.spec.ts)
│   │   ├── [profile.spec.ts](./e2e/wallet/profile.spec.ts)
│   │   ├── [transactions.spec.ts](./e2e/wallet/transactions.spec.ts)
│   │   └── [transfer.spec.ts](./e2e/wallet/transfer.spec.ts)
│   ├── [about.spec.ts](./e2e/about.spec.ts)
│   ├── [downloads.spec.ts](./e2e/downloads.spec.ts)
│   ├── [home.spec.ts](./e2e/home.spec.ts)
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
│   ├── og/
│   │   ├── [og.png](./public/og/og.png)
│   │   └── [og.svg](./public/og/og.svg)
│   ├── [apple-touch-icon.png](./public/apple-touch-icon.png)
│   ├── [favicon.ico](./public/favicon.ico)
│   ├── [manifest.json](./public/manifest.json)
│   ├── [robots.txt](./public/robots.txt)
│   ├── [sitemap.xml](./public/sitemap.xml)
│   └── [sw.js](./public/sw.js)
├── src/
│   ├── app/
│   │   ├── (app)/
│   │   │   ├── chat/
│   │   │   │   ├── settings/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(app)/chat/settings/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(app)/chat/settings/page.tsx)
│   │   │   │   └── [page.tsx](./src/app/(app)/chat/page.tsx)
│   │   │   ├── menu/
│   │   │   │   └── [page.tsx](./src/app/(app)/menu/page.tsx)
│   │   │   ├── password/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [page.test.tsx](./src/app/(app)/password/__tests__/page.test.tsx)
│   │   │   │   ├── generator/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(app)/password/generator/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(app)/password/generator/page.tsx)
│   │   │   │   ├── health/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [health-page.test.tsx](./src/app/(app)/password/health/__tests__/health-page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(app)/password/health/page.tsx)
│   │   │   │   ├── item/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [item-page.test.tsx](./src/app/(app)/password/item/__tests__/item-page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(app)/password/item/page.tsx)
│   │   │   │   ├── settings/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [settings-page.test.tsx](./src/app/(app)/password/settings/__tests__/settings-page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(app)/password/settings/page.tsx)
│   │   │   │   ├── trash/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [trash-page.test.tsx](./src/app/(app)/password/trash/__tests__/trash-page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(app)/password/trash/page.tsx)
│   │   │   │   └── [page.tsx](./src/app/(app)/password/page.tsx)
│   │   │   ├── pos/
│   │   │   │   └── [page.tsx](./src/app/(app)/pos/page.tsx)
│   │   │   ├── video/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [page.test.tsx](./src/app/(app)/video/__tests__/page.test.tsx)
│   │   │   │   └── [page.tsx](./src/app/(app)/video/page.tsx)
│   │   │   └── wallet/
│   │   │       ├── __tests__/
│   │   │       │   └── [page.test.tsx](./src/app/(app)/wallet/__tests__/page.test.tsx)
│   │   │       ├── accounts/
│   │   │       │   ├── __tests__/
│   │   │       │   │   └── [page.test.tsx](./src/app/(app)/wallet/accounts/__tests__/page.test.tsx)
│   │   │       │   ├── checking/
│   │   │       │   │   ├── __tests__/
│   │   │       │   │   │   └── [page.test.tsx](./src/app/(app)/wallet/accounts/checking/__tests__/page.test.tsx)
│   │   │       │   │   └── [page.tsx](./src/app/(app)/wallet/accounts/checking/page.tsx)
│   │   │       │   ├── credit/
│   │   │       │   │   ├── __tests__/
│   │   │       │   │   │   └── [page.test.tsx](./src/app/(app)/wallet/accounts/credit/__tests__/page.test.tsx)
│   │   │       │   │   └── [page.tsx](./src/app/(app)/wallet/accounts/credit/page.tsx)
│   │   │       │   ├── savings/
│   │   │       │   │   ├── __tests__/
│   │   │       │   │   │   └── [page.test.tsx](./src/app/(app)/wallet/accounts/savings/__tests__/page.test.tsx)
│   │   │       │   │   └── [page.tsx](./src/app/(app)/wallet/accounts/savings/page.tsx)
│   │   │       │   └── [page.tsx](./src/app/(app)/wallet/accounts/page.tsx)
│   │   │       ├── bills/
│   │   │       │   ├── __tests__/
│   │   │       │   │   └── [page.test.tsx](./src/app/(app)/wallet/bills/__tests__/page.test.tsx)
│   │   │       │   └── [page.tsx](./src/app/(app)/wallet/bills/page.tsx)
│   │   │       ├── budget/
│   │   │       │   ├── __tests__/
│   │   │       │   │   └── [page.test.tsx](./src/app/(app)/wallet/budget/__tests__/page.test.tsx)
│   │   │       │   └── [page.tsx](./src/app/(app)/wallet/budget/page.tsx)
│   │   │       ├── card-rewards/
│   │   │       │   ├── __tests__/
│   │   │       │   │   └── [page.test.tsx](./src/app/(app)/wallet/card-rewards/__tests__/page.test.tsx)
│   │   │       │   └── [page.tsx](./src/app/(app)/wallet/card-rewards/page.tsx)
│   │   │       ├── cards/
│   │   │       │   ├── __tests__/
│   │   │       │   │   └── [page.test.tsx](./src/app/(app)/wallet/cards/__tests__/page.test.tsx)
│   │   │       │   └── [page.tsx](./src/app/(app)/wallet/cards/page.tsx)
│   │   │       ├── contacts/
│   │   │       │   ├── __tests__/
│   │   │       │   │   └── [page.test.tsx](./src/app/(app)/wallet/contacts/__tests__/page.test.tsx)
│   │   │       │   └── [page.tsx](./src/app/(app)/wallet/contacts/page.tsx)
│   │   │       ├── currency-alerts/
│   │   │       │   ├── __tests__/
│   │   │       │   │   └── [page.test.tsx](./src/app/(app)/wallet/currency-alerts/__tests__/page.test.tsx)
│   │   │       │   └── [page.tsx](./src/app/(app)/wallet/currency-alerts/page.tsx)
│   │   │       ├── exchange/
│   │   │       │   ├── __tests__/
│   │   │       │   │   └── [page.test.tsx](./src/app/(app)/wallet/exchange/__tests__/page.test.tsx)
│   │   │       │   └── [page.tsx](./src/app/(app)/wallet/exchange/page.tsx)
│   │   │       ├── fixed-deposits/
│   │   │       │   ├── __tests__/
│   │   │       │   │   └── [page.test.tsx](./src/app/(app)/wallet/fixed-deposits/__tests__/page.test.tsx)
│   │   │       │   └── [page.tsx](./src/app/(app)/wallet/fixed-deposits/page.tsx)
│   │   │       ├── help-support/
│   │   │       │   ├── __tests__/
│   │   │       │   │   └── [page.test.tsx](./src/app/(app)/wallet/help-support/__tests__/page.test.tsx)
│   │   │       │   └── [page.tsx](./src/app/(app)/wallet/help-support/page.tsx)
│   │   │       ├── insurance/
│   │   │       │   ├── __tests__/
│   │   │       │   │   └── [page.test.tsx](./src/app/(app)/wallet/insurance/__tests__/page.test.tsx)
│   │   │       │   └── [page.tsx](./src/app/(app)/wallet/insurance/page.tsx)
│   │   │       ├── loans/
│   │   │       │   ├── __tests__/
│   │   │       │   │   └── [page.test.tsx](./src/app/(app)/wallet/loans/__tests__/page.test.tsx)
│   │   │       │   └── [page.tsx](./src/app/(app)/wallet/loans/page.tsx)
│   │   │       ├── notifications/
│   │   │       │   ├── __tests__/
│   │   │       │   │   └── [page.test.tsx](./src/app/(app)/wallet/notifications/__tests__/page.test.tsx)
│   │   │       │   └── [page.tsx](./src/app/(app)/wallet/notifications/page.tsx)
│   │   │       ├── pay/
│   │   │       │   ├── __tests__/
│   │   │       │   │   └── [page.test.tsx](./src/app/(app)/wallet/pay/__tests__/page.test.tsx)
│   │   │       │   └── [page.tsx](./src/app/(app)/wallet/pay/page.tsx)
│   │   │       ├── payment-requests/
│   │   │       │   ├── __tests__/
│   │   │       │   │   └── [page.test.tsx](./src/app/(app)/wallet/payment-requests/__tests__/page.test.tsx)
│   │   │       │   └── [page.tsx](./src/app/(app)/wallet/payment-requests/page.tsx)
│   │   │       ├── privacy-policy/
│   │   │       │   ├── __tests__/
│   │   │       │   │   └── [page.test.tsx](./src/app/(app)/wallet/privacy-policy/__tests__/page.test.tsx)
│   │   │       │   └── [page.tsx](./src/app/(app)/wallet/privacy-policy/page.tsx)
│   │   │       ├── profile/
│   │   │       │   ├── __tests__/
│   │   │       │   │   └── [page.test.tsx](./src/app/(app)/wallet/profile/__tests__/page.test.tsx)
│   │   │       │   └── [page.tsx](./src/app/(app)/wallet/profile/page.tsx)
│   │   │       ├── rates/
│   │   │       │   ├── __tests__/
│   │   │       │   │   └── [page.test.tsx](./src/app/(app)/wallet/rates/__tests__/page.test.tsx)
│   │   │       │   └── [page.tsx](./src/app/(app)/wallet/rates/page.tsx)
│   │   │       ├── recurring-deposits/
│   │   │       │   ├── __tests__/
│   │   │       │   │   └── [page.test.tsx](./src/app/(app)/wallet/recurring-deposits/__tests__/page.test.tsx)
│   │   │       │   └── [page.tsx](./src/app/(app)/wallet/recurring-deposits/page.tsx)
│   │   │       ├── recurring-transfers/
│   │   │       │   ├── __tests__/
│   │   │       │   │   └── [page.test.tsx](./src/app/(app)/wallet/recurring-transfers/__tests__/page.test.tsx)
│   │   │       │   └── [page.tsx](./src/app/(app)/wallet/recurring-transfers/page.tsx)
│   │   │       ├── reports/
│   │   │       │   ├── __tests__/
│   │   │       │   │   └── [page.test.tsx](./src/app/(app)/wallet/reports/__tests__/page.test.tsx)
│   │   │       │   └── [page.tsx](./src/app/(app)/wallet/reports/page.tsx)
│   │   │       ├── savings-goals/
│   │   │       │   ├── __tests__/
│   │   │       │   │   └── [page.test.tsx](./src/app/(app)/wallet/savings-goals/__tests__/page.test.tsx)
│   │   │       │   └── [page.tsx](./src/app/(app)/wallet/savings-goals/page.tsx)
│   │   │       ├── settings/
│   │   │       │   └── [page.tsx](./src/app/(app)/wallet/settings/page.tsx)
│   │   │       ├── split-bill/
│   │   │       │   ├── __tests__/
│   │   │       │   │   └── [page.test.tsx](./src/app/(app)/wallet/split-bill/__tests__/page.test.tsx)
│   │   │       │   └── [page.tsx](./src/app/(app)/wallet/split-bill/page.tsx)
│   │   │       ├── terms-of-service/
│   │   │       │   ├── __tests__/
│   │   │       │   │   └── [page.test.tsx](./src/app/(app)/wallet/terms-of-service/__tests__/page.test.tsx)
│   │   │       │   └── [page.tsx](./src/app/(app)/wallet/terms-of-service/page.tsx)
│   │   │       ├── transactions/
│   │   │       │   ├── __tests__/
│   │   │       │   │   └── [page.test.tsx](./src/app/(app)/wallet/transactions/__tests__/page.test.tsx)
│   │   │       │   └── [page.tsx](./src/app/(app)/wallet/transactions/page.tsx)
│   │   │       ├── transfer/
│   │   │       │   ├── __tests__/
│   │   │       │   │   └── [page.test.tsx](./src/app/(app)/wallet/transfer/__tests__/page.test.tsx)
│   │   │       │   └── [page.tsx](./src/app/(app)/wallet/transfer/page.tsx)
│   │   │       ├── [layout.tsx](./src/app/(app)/wallet/layout.tsx)
│   │   │       ├── [loading.tsx](./src/app/(app)/wallet/loading.tsx)
│   │   │       ├── [page.tsx](./src/app/(app)/wallet/page.tsx)
│   │   │       └── [template.tsx](./src/app/(app)/wallet/template.tsx)
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
│   │   │   ├── [about.test.tsx](./src/app/__tests__/about.test.tsx)
│   │   │   ├── [default.test.tsx](./src/app/__tests__/default.test.tsx)
│   │   │   ├── [error.test.tsx](./src/app/__tests__/error.test.tsx)
│   │   │   ├── [forbidden.test.tsx](./src/app/__tests__/forbidden.test.tsx)
│   │   │   ├── [global-error.test.tsx](./src/app/__tests__/global-error.test.tsx)
│   │   │   ├── [layout.test.tsx](./src/app/__tests__/layout.test.tsx)
│   │   │   ├── [loading.test.tsx](./src/app/__tests__/loading.test.tsx)
│   │   │   ├── [not-found.test.tsx](./src/app/__tests__/not-found.test.tsx)
│   │   │   ├── [robots.test.ts](./src/app/__tests__/robots.test.ts)
│   │   │   ├── [template.test.tsx](./src/app/__tests__/template.test.tsx)
│   │   │   ├── [unauthorized.test.tsx](./src/app/__tests__/unauthorized.test.tsx)
│   │   │   └── [version.test.tsx](./src/app/__tests__/version.test.tsx)
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
│   │   ├── chat/
│   │   │   ├── atoms/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [Avatar.test.tsx](./src/components/chat/atoms/__tests__/Avatar.test.tsx)
│   │   │   │   │   ├── [Badge.test.tsx](./src/components/chat/atoms/__tests__/Badge.test.tsx)
│   │   │   │   │   ├── [EmptyState.test.tsx](./src/components/chat/atoms/__tests__/EmptyState.test.tsx)
│   │   │   │   │   ├── [IconButton.test.tsx](./src/components/chat/atoms/__tests__/IconButton.test.tsx)
│   │   │   │   │   ├── [StatusDot.test.tsx](./src/components/chat/atoms/__tests__/StatusDot.test.tsx)
│   │   │   │   │   └── [TypingIndicator.test.tsx](./src/components/chat/atoms/__tests__/TypingIndicator.test.tsx)
│   │   │   │   ├── [Avatar.tsx](./src/components/chat/atoms/Avatar.tsx)
│   │   │   │   ├── [Badge.tsx](./src/components/chat/atoms/Badge.tsx)
│   │   │   │   ├── [EmptyState.tsx](./src/components/chat/atoms/EmptyState.tsx)
│   │   │   │   ├── [IconButton.tsx](./src/components/chat/atoms/IconButton.tsx)
│   │   │   │   ├── [StatusDot.tsx](./src/components/chat/atoms/StatusDot.tsx)
│   │   │   │   ├── [TypingIndicator.tsx](./src/components/chat/atoms/TypingIndicator.tsx)
│   │   │   │   └── [index.ts](./src/components/chat/atoms/index.ts)
│   │   │   ├── molecules/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [CallControls.test.tsx](./src/components/chat/molecules/__tests__/CallControls.test.tsx)
│   │   │   │   │   ├── [ChatHeader.test.tsx](./src/components/chat/molecules/__tests__/ChatHeader.test.tsx)
│   │   │   │   │   ├── [ChatListItem.test.tsx](./src/components/chat/molecules/__tests__/ChatListItem.test.tsx)
│   │   │   │   │   ├── [ChatSearchBar.test.tsx](./src/components/chat/molecules/__tests__/ChatSearchBar.test.tsx)
│   │   │   │   │   ├── [Composer.test.tsx](./src/components/chat/molecules/__tests__/Composer.test.tsx)
│   │   │   │   │   ├── [ContactRow.test.tsx](./src/components/chat/molecules/__tests__/ContactRow.test.tsx)
│   │   │   │   │   ├── [DateDivider.test.tsx](./src/components/chat/molecules/__tests__/DateDivider.test.tsx)
│   │   │   │   │   ├── [EmojiAutocomplete.test.tsx](./src/components/chat/molecules/__tests__/EmojiAutocomplete.test.tsx)
│   │   │   │   │   ├── [LinkPreviewCard.test.tsx](./src/components/chat/molecules/__tests__/LinkPreviewCard.test.tsx)
│   │   │   │   │   ├── [MediaComposer.test.tsx](./src/components/chat/molecules/__tests__/MediaComposer.test.tsx)
│   │   │   │   │   ├── [MessageBubble.test.tsx](./src/components/chat/molecules/__tests__/MessageBubble.test.tsx)
│   │   │   │   │   ├── [MessageContextMenu.test.tsx](./src/components/chat/molecules/__tests__/MessageContextMenu.test.tsx)
│   │   │   │   │   ├── [ReactionBar.test.tsx](./src/components/chat/molecules/__tests__/ReactionBar.test.tsx)
│   │   │   │   │   ├── [ReplyComposer.test.tsx](./src/components/chat/molecules/__tests__/ReplyComposer.test.tsx)
│   │   │   │   │   ├── [SearchBar.test.tsx](./src/components/chat/molecules/__tests__/SearchBar.test.tsx)
│   │   │   │   │   ├── [SecretChatBanner.test.tsx](./src/components/chat/molecules/__tests__/SecretChatBanner.test.tsx)
│   │   │   │   │   ├── [StickerPicker.test.tsx](./src/components/chat/molecules/__tests__/StickerPicker.test.tsx)
│   │   │   │   │   ├── [ToastViewport.test.tsx](./src/components/chat/molecules/__tests__/ToastViewport.test.tsx)
│   │   │   │   │   ├── [VerificationCodeModal.test.tsx](./src/components/chat/molecules/__tests__/VerificationCodeModal.test.tsx)
│   │   │   │   │   └── [VoiceRecorder.test.tsx](./src/components/chat/molecules/__tests__/VoiceRecorder.test.tsx)
│   │   │   │   ├── [CallControls.tsx](./src/components/chat/molecules/CallControls.tsx)
│   │   │   │   ├── [ChatHeader.tsx](./src/components/chat/molecules/ChatHeader.tsx)
│   │   │   │   ├── [ChatListItem.tsx](./src/components/chat/molecules/ChatListItem.tsx)
│   │   │   │   ├── [ChatSearchBar.tsx](./src/components/chat/molecules/ChatSearchBar.tsx)
│   │   │   │   ├── [Composer.tsx](./src/components/chat/molecules/Composer.tsx)
│   │   │   │   ├── [ContactRow.tsx](./src/components/chat/molecules/ContactRow.tsx)
│   │   │   │   ├── [DateDivider.tsx](./src/components/chat/molecules/DateDivider.tsx)
│   │   │   │   ├── [EmojiAutocomplete.tsx](./src/components/chat/molecules/EmojiAutocomplete.tsx)
│   │   │   │   ├── [LinkPreviewCard.tsx](./src/components/chat/molecules/LinkPreviewCard.tsx)
│   │   │   │   ├── [MediaComposer.tsx](./src/components/chat/molecules/MediaComposer.tsx)
│   │   │   │   ├── [MessageBubble.tsx](./src/components/chat/molecules/MessageBubble.tsx)
│   │   │   │   ├── [MessageContextMenu.tsx](./src/components/chat/molecules/MessageContextMenu.tsx)
│   │   │   │   ├── [ReactionBar.tsx](./src/components/chat/molecules/ReactionBar.tsx)
│   │   │   │   ├── [ReplyComposer.tsx](./src/components/chat/molecules/ReplyComposer.tsx)
│   │   │   │   ├── [SearchBar.tsx](./src/components/chat/molecules/SearchBar.tsx)
│   │   │   │   ├── [SecretChatBanner.tsx](./src/components/chat/molecules/SecretChatBanner.tsx)
│   │   │   │   ├── [StickerPicker.tsx](./src/components/chat/molecules/StickerPicker.tsx)
│   │   │   │   ├── [ToastViewport.tsx](./src/components/chat/molecules/ToastViewport.tsx)
│   │   │   │   ├── [VerificationCodeModal.tsx](./src/components/chat/molecules/VerificationCodeModal.tsx)
│   │   │   │   ├── [VoiceRecorder.tsx](./src/components/chat/molecules/VoiceRecorder.tsx)
│   │   │   │   └── [index.ts](./src/components/chat/molecules/index.ts)
│   │   │   ├── organisms/
│   │   │   │   ├── ChatPane/
│   │   │   │   │   ├── [MessageList.tsx](./src/components/chat/organisms/ChatPane/MessageList.tsx)
│   │   │   │   │   └── [useChatPaneHandlers.ts](./src/components/chat/organisms/ChatPane/useChatPaneHandlers.ts)
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [BlockedContactsPanel.test.tsx](./src/components/chat/organisms/__tests__/BlockedContactsPanel.test.tsx)
│   │   │   │   │   ├── [CallHistoryPanel.test.tsx](./src/components/chat/organisms/__tests__/CallHistoryPanel.test.tsx)
│   │   │   │   │   ├── [CallScreen.test.tsx](./src/components/chat/organisms/__tests__/CallScreen.test.tsx)
│   │   │   │   │   ├── [ChatPane.test.tsx](./src/components/chat/organisms/__tests__/ChatPane.test.tsx)
│   │   │   │   │   ├── [ChatSettingsPanel.test.tsx](./src/components/chat/organisms/__tests__/ChatSettingsPanel.test.tsx)
│   │   │   │   │   ├── [ChatSidebar.test.tsx](./src/components/chat/organisms/__tests__/ChatSidebar.test.tsx)
│   │   │   │   │   ├── [DeviceSyncPanel.test.tsx](./src/components/chat/organisms/__tests__/DeviceSyncPanel.test.tsx)
│   │   │   │   │   ├── [DeviceTrustPanel.test.tsx](./src/components/chat/organisms/__tests__/DeviceTrustPanel.test.tsx)
│   │   │   │   │   ├── [ForwardModal.test.tsx](./src/components/chat/organisms/__tests__/ForwardModal.test.tsx)
│   │   │   │   │   ├── [GroupAdminPanel.test.tsx](./src/components/chat/organisms/__tests__/GroupAdminPanel.test.tsx)
│   │   │   │   │   ├── [GroupCallView.test.tsx](./src/components/chat/organisms/__tests__/GroupCallView.test.tsx)
│   │   │   │   │   ├── [ImageLightbox.test.tsx](./src/components/chat/organisms/__tests__/ImageLightbox.test.tsx)
│   │   │   │   │   ├── [IncomingCallModal.test.tsx](./src/components/chat/organisms/__tests__/IncomingCallModal.test.tsx)
│   │   │   │   │   ├── [MediaGallery.test.tsx](./src/components/chat/organisms/__tests__/MediaGallery.test.tsx)
│   │   │   │   │   ├── [NewChatModal.test.tsx](./src/components/chat/organisms/__tests__/NewChatModal.test.tsx)
│   │   │   │   │   ├── [PairingModal.test.tsx](./src/components/chat/organisms/__tests__/PairingModal.test.tsx)
│   │   │   │   │   ├── [PinLockScreen.test.tsx](./src/components/chat/organisms/__tests__/PinLockScreen.test.tsx)
│   │   │   │   │   └── [PrivacySettingsPanel.test.tsx](./src/components/chat/organisms/__tests__/PrivacySettingsPanel.test.tsx)
│   │   │   │   ├── [BlockedContactsPanel.tsx](./src/components/chat/organisms/BlockedContactsPanel.tsx)
│   │   │   │   ├── [CallHistoryPanel.tsx](./src/components/chat/organisms/CallHistoryPanel.tsx)
│   │   │   │   ├── [CallScreen.tsx](./src/components/chat/organisms/CallScreen.tsx)
│   │   │   │   ├── [ChatPane.tsx](./src/components/chat/organisms/ChatPane.tsx)
│   │   │   │   ├── [ChatSettingsPanel.tsx](./src/components/chat/organisms/ChatSettingsPanel.tsx)
│   │   │   │   ├── [ChatSidebar.tsx](./src/components/chat/organisms/ChatSidebar.tsx)
│   │   │   │   ├── [DeviceSyncPanel.tsx](./src/components/chat/organisms/DeviceSyncPanel.tsx)
│   │   │   │   ├── [DeviceTrustPanel.tsx](./src/components/chat/organisms/DeviceTrustPanel.tsx)
│   │   │   │   ├── [ForwardModal.tsx](./src/components/chat/organisms/ForwardModal.tsx)
│   │   │   │   ├── [GroupAdminPanel.tsx](./src/components/chat/organisms/GroupAdminPanel.tsx)
│   │   │   │   ├── [GroupCallView.tsx](./src/components/chat/organisms/GroupCallView.tsx)
│   │   │   │   ├── [Header.tsx](./src/components/chat/organisms/Header.tsx)
│   │   │   │   ├── [ImageLightbox.tsx](./src/components/chat/organisms/ImageLightbox.tsx)
│   │   │   │   ├── [IncomingCallModal.tsx](./src/components/chat/organisms/IncomingCallModal.tsx)
│   │   │   │   ├── [MediaGallery.tsx](./src/components/chat/organisms/MediaGallery.tsx)
│   │   │   │   ├── [NewChatModal.tsx](./src/components/chat/organisms/NewChatModal.tsx)
│   │   │   │   ├── [PairingModal.tsx](./src/components/chat/organisms/PairingModal.tsx)
│   │   │   │   ├── [PinLockScreen.tsx](./src/components/chat/organisms/PinLockScreen.tsx)
│   │   │   │   └── [PrivacySettingsPanel.tsx](./src/components/chat/organisms/PrivacySettingsPanel.tsx)
│   │   │   ├── templates/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [AboutTemplate.test.tsx](./src/components/chat/templates/__tests__/AboutTemplate.test.tsx)
│   │   │   │   │   ├── [AppShell.test.tsx](./src/components/chat/templates/__tests__/AppShell.test.tsx)
│   │   │   │   │   ├── [DownloadsTemplate.test.tsx](./src/components/chat/templates/__tests__/DownloadsTemplate.test.tsx)
│   │   │   │   │   ├── [ErrorTemplate.test.tsx](./src/components/chat/templates/__tests__/ErrorTemplate.test.tsx)
│   │   │   │   │   └── [VersionTemplate.test.tsx](./src/components/chat/templates/__tests__/VersionTemplate.test.tsx)
│   │   │   │   ├── [AboutTemplate.tsx](./src/components/chat/templates/AboutTemplate.tsx)
│   │   │   │   ├── [AppShell.tsx](./src/components/chat/templates/AppShell.tsx)
│   │   │   │   ├── [DownloadsTemplate.tsx](./src/components/chat/templates/DownloadsTemplate.tsx)
│   │   │   │   ├── [ErrorTemplate.tsx](./src/components/chat/templates/ErrorTemplate.tsx)
│   │   │   │   ├── [VersionTemplate.tsx](./src/components/chat/templates/VersionTemplate.tsx)
│   │   │   │   └── [index.ts](./src/components/chat/templates/index.ts)
│   │   │   └── [index.ts](./src/components/chat/index.ts)
│   │   ├── menu/
│   │   │   ├── __tests__/
│   │   │   │   └── [CustomerMenu.test.tsx](./src/components/menu/__tests__/CustomerMenu.test.tsx)
│   │   │   ├── [CustomerMenu.tsx](./src/components/menu/CustomerMenu.tsx)
│   │   │   ├── [Header.tsx](./src/components/menu/Header.tsx)
│   │   │   ├── [MenuManager.tsx](./src/components/menu/MenuManager.tsx)
│   │   │   ├── [QrShare.tsx](./src/components/menu/QrShare.tsx)
│   │   │   ├── [RestaurantDashboard.tsx](./src/components/menu/RestaurantDashboard.tsx)
│   │   │   ├── [RestaurantManager.tsx](./src/components/menu/RestaurantManager.tsx)
│   │   │   ├── [index.ts](./src/components/menu/index.ts)
│   │   │   └── [types.ts](./src/components/menu/types.ts)
│   │   ├── molecules/
│   │   │   └── __tests__/
│   │   ├── password/
│   │   │   ├── molecules/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [AccessLogCard.test.tsx](./src/components/password/molecules/__tests__/AccessLogCard.test.tsx)
│   │   │   │   │   └── [ShareItemModal.test.tsx](./src/components/password/molecules/__tests__/ShareItemModal.test.tsx)
│   │   │   │   ├── [AccessLogCard.tsx](./src/components/password/molecules/AccessLogCard.tsx)
│   │   │   │   ├── [ConfirmDialog.tsx](./src/components/password/molecules/ConfirmDialog.tsx)
│   │   │   │   ├── [HealthWidgets.tsx](./src/components/password/molecules/HealthWidgets.tsx)
│   │   │   │   ├── [ShareItemModal.tsx](./src/components/password/molecules/ShareItemModal.tsx)
│   │   │   │   ├── [VaultItemForm.tsx](./src/components/password/molecules/VaultItemForm.tsx)
│   │   │   │   └── [index.ts](./src/components/password/molecules/index.ts)
│   │   │   ├── organisms/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [EmergencyAccessCard.test.tsx](./src/components/password/organisms/__tests__/EmergencyAccessCard.test.tsx)
│   │   │   │   │   ├── [FolderManager.test.tsx](./src/components/password/organisms/__tests__/FolderManager.test.tsx)
│   │   │   │   │   ├── [LockScreen.test.tsx](./src/components/password/organisms/__tests__/LockScreen.test.tsx)
│   │   │   │   │   ├── [RecentlyUsed.test.tsx](./src/components/password/organisms/__tests__/RecentlyUsed.test.tsx)
│   │   │   │   │   ├── [ToastContainer.test.tsx](./src/components/password/organisms/__tests__/ToastContainer.test.tsx)
│   │   │   │   │   ├── [TotpDisplay.test.tsx](./src/components/password/organisms/__tests__/TotpDisplay.test.tsx)
│   │   │   │   │   └── [TransferCard.test.tsx](./src/components/password/organisms/__tests__/TransferCard.test.tsx)
│   │   │   │   ├── [EmergencyAccessCard.tsx](./src/components/password/organisms/EmergencyAccessCard.tsx)
│   │   │   │   ├── [FolderManager.tsx](./src/components/password/organisms/FolderManager.tsx)
│   │   │   │   ├── [LockScreen.tsx](./src/components/password/organisms/LockScreen.tsx)
│   │   │   │   ├── [MasterPasswordCard.tsx](./src/components/password/organisms/MasterPasswordCard.tsx)
│   │   │   │   ├── [RecentlyUsed.tsx](./src/components/password/organisms/RecentlyUsed.tsx)
│   │   │   │   ├── [SecuritySettingsCard.tsx](./src/components/password/organisms/SecuritySettingsCard.tsx)
│   │   │   │   ├── [ToastContainer.tsx](./src/components/password/organisms/ToastContainer.tsx)
│   │   │   │   ├── [TotpDisplay.tsx](./src/components/password/organisms/TotpDisplay.tsx)
│   │   │   │   ├── [TransferCard.tsx](./src/components/password/organisms/TransferCard.tsx)
│   │   │   │   ├── [VaultItemCard.tsx](./src/components/password/organisms/VaultItemCard.tsx)
│   │   │   │   ├── [VaultToolbar.tsx](./src/components/password/organisms/VaultToolbar.tsx)
│   │   │   │   └── [index.ts](./src/components/password/organisms/index.ts)
│   │   │   └── [index.ts](./src/components/password/index.ts)
│   │   ├── pos/
│   │   │   ├── atoms/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [EmptyState.test.tsx](./src/components/pos/atoms/__tests__/EmptyState.test.tsx)
│   │   │   │   │   ├── [IconButton.test.tsx](./src/components/pos/atoms/__tests__/IconButton.test.tsx)
│   │   │   │   │   ├── [Money.test.tsx](./src/components/pos/atoms/__tests__/Money.test.tsx)
│   │   │   │   │   ├── [StatusBadge.test.tsx](./src/components/pos/atoms/__tests__/StatusBadge.test.tsx)
│   │   │   │   │   └── [SuccessMark.test.tsx](./src/components/pos/atoms/__tests__/SuccessMark.test.tsx)
│   │   │   │   ├── [EmptyState.tsx](./src/components/pos/atoms/EmptyState.tsx)
│   │   │   │   ├── [IconButton.tsx](./src/components/pos/atoms/IconButton.tsx)
│   │   │   │   ├── [Money.tsx](./src/components/pos/atoms/Money.tsx)
│   │   │   │   ├── [StatusBadge.tsx](./src/components/pos/atoms/StatusBadge.tsx)
│   │   │   │   ├── [SuccessMark.tsx](./src/components/pos/atoms/SuccessMark.tsx)
│   │   │   │   └── [index.ts](./src/components/pos/atoms/index.ts)
│   │   │   ├── molecules/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [CodeApplyField.test.tsx](./src/components/pos/molecules/__tests__/CodeApplyField.test.tsx)
│   │   │   │   │   ├── [FilterTabs.test.tsx](./src/components/pos/molecules/__tests__/FilterTabs.test.tsx)
│   │   │   │   │   ├── [LineItemRow.test.tsx](./src/components/pos/molecules/__tests__/LineItemRow.test.tsx)
│   │   │   │   │   ├── [MoneyRow.test.tsx](./src/components/pos/molecules/__tests__/MoneyRow.test.tsx)
│   │   │   │   │   ├── [PanelHeader.test.tsx](./src/components/pos/molecules/__tests__/PanelHeader.test.tsx)
│   │   │   │   │   ├── [PaymentBreakdown.test.tsx](./src/components/pos/molecules/__tests__/PaymentBreakdown.test.tsx)
│   │   │   │   │   ├── [SearchField.test.tsx](./src/components/pos/molecules/__tests__/SearchField.test.tsx)
│   │   │   │   │   ├── [TransactionDetail.test.tsx](./src/components/pos/molecules/__tests__/TransactionDetail.test.tsx)
│   │   │   │   │   ├── [ViewToolbar.test.tsx](./src/components/pos/molecules/__tests__/ViewToolbar.test.tsx)
│   │   │   │   │   └── [reportPieces.test.tsx](./src/components/pos/molecules/__tests__/reportPieces.test.tsx)
│   │   │   │   ├── [AdjustmentList.tsx](./src/components/pos/molecules/AdjustmentList.tsx)
│   │   │   │   ├── [CodeApplyField.tsx](./src/components/pos/molecules/CodeApplyField.tsx)
│   │   │   │   ├── [FilterTabs.tsx](./src/components/pos/molecules/FilterTabs.tsx)
│   │   │   │   ├── [FormCard.tsx](./src/components/pos/molecules/FormCard.tsx)
│   │   │   │   ├── [LineItemRow.tsx](./src/components/pos/molecules/LineItemRow.tsx)
│   │   │   │   ├── [MoneyRow.tsx](./src/components/pos/molecules/MoneyRow.tsx)
│   │   │   │   ├── [PanelHeader.tsx](./src/components/pos/molecules/PanelHeader.tsx)
│   │   │   │   ├── [PaymentBreakdown.tsx](./src/components/pos/molecules/PaymentBreakdown.tsx)
│   │   │   │   ├── [SearchField.tsx](./src/components/pos/molecules/SearchField.tsx)
│   │   │   │   ├── [StatBlock.tsx](./src/components/pos/molecules/StatBlock.tsx)
│   │   │   │   ├── [TopItemsList.tsx](./src/components/pos/molecules/TopItemsList.tsx)
│   │   │   │   ├── [TransactionDetail.tsx](./src/components/pos/molecules/TransactionDetail.tsx)
│   │   │   │   ├── [TransactionTotals.tsx](./src/components/pos/molecules/TransactionTotals.tsx)
│   │   │   │   ├── [ViewToolbar.tsx](./src/components/pos/molecules/ViewToolbar.tsx)
│   │   │   │   └── [index.ts](./src/components/pos/molecules/index.ts)
│   │   │   ├── organisms/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [Cart.test.tsx](./src/components/pos/organisms/__tests__/Cart.test.tsx)
│   │   │   │   │   ├── [Checkout.test.tsx](./src/components/pos/organisms/__tests__/Checkout.test.tsx)
│   │   │   │   │   ├── [DailySummary.test.tsx](./src/components/pos/organisms/__tests__/DailySummary.test.tsx)
│   │   │   │   │   ├── [DigitalReceipt.test.tsx](./src/components/pos/organisms/__tests__/DigitalReceipt.test.tsx)
│   │   │   │   │   ├── [DiscountManager.test.tsx](./src/components/pos/organisms/__tests__/DiscountManager.test.tsx)
│   │   │   │   │   ├── [GiftCardManager.test.tsx](./src/components/pos/organisms/__tests__/GiftCardManager.test.tsx)
│   │   │   │   │   ├── [InventoryManager.test.tsx](./src/components/pos/organisms/__tests__/InventoryManager.test.tsx)
│   │   │   │   │   ├── [ItemCatalog.test.tsx](./src/components/pos/organisms/__tests__/ItemCatalog.test.tsx)
│   │   │   │   │   ├── [PaymentPanel.test.tsx](./src/components/pos/organisms/__tests__/PaymentPanel.test.tsx)
│   │   │   │   │   ├── [Receipt.test.tsx](./src/components/pos/organisms/__tests__/Receipt.test.tsx)
│   │   │   │   │   ├── [ReportingDashboard.test.tsx](./src/components/pos/organisms/__tests__/ReportingDashboard.test.tsx)
│   │   │   │   │   ├── [ShiftManager.test.tsx](./src/components/pos/organisms/__tests__/ShiftManager.test.tsx)
│   │   │   │   │   ├── [TaxConfigPanel.test.tsx](./src/components/pos/organisms/__tests__/TaxConfigPanel.test.tsx)
│   │   │   │   │   ├── [TransactionHistory.test.tsx](./src/components/pos/organisms/__tests__/TransactionHistory.test.tsx)
│   │   │   │   │   └── [UserManager.test.tsx](./src/components/pos/organisms/__tests__/UserManager.test.tsx)
│   │   │   │   ├── [Cart.tsx](./src/components/pos/organisms/Cart.tsx)
│   │   │   │   ├── [Checkout.tsx](./src/components/pos/organisms/Checkout.tsx)
│   │   │   │   ├── [DailySummary.tsx](./src/components/pos/organisms/DailySummary.tsx)
│   │   │   │   ├── [DigitalReceipt.tsx](./src/components/pos/organisms/DigitalReceipt.tsx)
│   │   │   │   ├── [DiscountManager.tsx](./src/components/pos/organisms/DiscountManager.tsx)
│   │   │   │   ├── [GiftCardManager.tsx](./src/components/pos/organisms/GiftCardManager.tsx)
│   │   │   │   ├── [InventoryManager.tsx](./src/components/pos/organisms/InventoryManager.tsx)
│   │   │   │   ├── [ItemCatalog.tsx](./src/components/pos/organisms/ItemCatalog.tsx)
│   │   │   │   ├── [PaymentPanel.tsx](./src/components/pos/organisms/PaymentPanel.tsx)
│   │   │   │   ├── [Receipt.tsx](./src/components/pos/organisms/Receipt.tsx)
│   │   │   │   ├── [ReportingDashboard.tsx](./src/components/pos/organisms/ReportingDashboard.tsx)
│   │   │   │   ├── [ShiftManager.tsx](./src/components/pos/organisms/ShiftManager.tsx)
│   │   │   │   ├── [TaxConfigPanel.tsx](./src/components/pos/organisms/TaxConfigPanel.tsx)
│   │   │   │   ├── [TransactionHistory.tsx](./src/components/pos/organisms/TransactionHistory.tsx)
│   │   │   │   ├── [UserManager.tsx](./src/components/pos/organisms/UserManager.tsx)
│   │   │   │   └── [index.ts](./src/components/pos/organisms/index.ts)
│   │   │   ├── templates/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [PosTemplate.test.tsx](./src/components/pos/templates/__tests__/PosTemplate.test.tsx)
│   │   │   │   ├── [PosTemplate.tsx](./src/components/pos/templates/PosTemplate.tsx)
│   │   │   │   ├── [index.ts](./src/components/pos/templates/index.ts)
│   │   │   │   └── [usePosState.ts](./src/components/pos/templates/usePosState.ts)
│   │   │   ├── [UserManager.tsx](./src/components/pos/UserManager.tsx)
│   │   │   ├── [index.ts](./src/components/pos/index.ts)
│   │   │   └── [types.ts](./src/components/pos/types.ts)
│   │   ├── shared/
│   │   │   ├── organisms/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [Header.test.tsx](./src/components/shared/organisms/__tests__/Header.test.tsx)
│   │   │   │   └── [Header.tsx](./src/components/shared/organisms/Header.tsx)
│   │   │   └── templates/
│   │   │       ├── __tests__/
│   │   │       │   ├── [AboutTemplate.test.tsx](./src/components/shared/templates/__tests__/AboutTemplate.test.tsx)
│   │   │       │   ├── [DownloadsTemplate.test.tsx](./src/components/shared/templates/__tests__/DownloadsTemplate.test.tsx)
│   │   │       │   ├── [ErrorTemplate.test.tsx](./src/components/shared/templates/__tests__/ErrorTemplate.test.tsx)
│   │   │       │   └── [VersionTemplate.test.tsx](./src/components/shared/templates/__tests__/VersionTemplate.test.tsx)
│   │   │       ├── [AboutTemplate.tsx](./src/components/shared/templates/AboutTemplate.tsx)
│   │   │       ├── [DownloadsTemplate.tsx](./src/components/shared/templates/DownloadsTemplate.tsx)
│   │   │       ├── [ErrorTemplate.tsx](./src/components/shared/templates/ErrorTemplate.tsx)
│   │   │       └── [VersionTemplate.tsx](./src/components/shared/templates/VersionTemplate.tsx)
│   │   ├── video/
│   │   │   ├── atoms/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [VideoFileUpload.test.tsx](./src/components/video/atoms/__tests__/VideoFileUpload.test.tsx)
│   │   │   │   ├── [VideoFileUpload.tsx](./src/components/video/atoms/VideoFileUpload.tsx)
│   │   │   │   └── [index.ts](./src/components/video/atoms/index.ts)
│   │   │   ├── molecules/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [AudioTranscribeTool.test.tsx](./src/components/video/molecules/__tests__/AudioTranscribeTool.test.tsx)
│   │   │   │   │   ├── [GenerateSubtitleTool.test.tsx](./src/components/video/molecules/__tests__/GenerateSubtitleTool.test.tsx)
│   │   │   │   │   ├── [VideoCompressTool.test.tsx](./src/components/video/molecules/__tests__/VideoCompressTool.test.tsx)
│   │   │   │   │   ├── [VideoConvertTool.test.tsx](./src/components/video/molecules/__tests__/VideoConvertTool.test.tsx)
│   │   │   │   │   ├── [VideoCropTool.test.tsx](./src/components/video/molecules/__tests__/VideoCropTool.test.tsx)
│   │   │   │   │   ├── [VideoDownloadTool.test.tsx](./src/components/video/molecules/__tests__/VideoDownloadTool.test.tsx)
│   │   │   │   │   ├── [VideoExtractAudioTool.test.tsx](./src/components/video/molecules/__tests__/VideoExtractAudioTool.test.tsx)
│   │   │   │   │   ├── [VideoExtractFramesTool.test.tsx](./src/components/video/molecules/__tests__/VideoExtractFramesTool.test.tsx)
│   │   │   │   │   ├── [VideoMergeTool.test.tsx](./src/components/video/molecules/__tests__/VideoMergeTool.test.tsx)
│   │   │   │   │   ├── [VideoMuteTool.test.tsx](./src/components/video/molecules/__tests__/VideoMuteTool.test.tsx)
│   │   │   │   │   ├── [VideoResizeTool.test.tsx](./src/components/video/molecules/__tests__/VideoResizeTool.test.tsx)
│   │   │   │   │   ├── [VideoSpeedTool.test.tsx](./src/components/video/molecules/__tests__/VideoSpeedTool.test.tsx)
│   │   │   │   │   ├── [VideoStabilizeTool.test.tsx](./src/components/video/molecules/__tests__/VideoStabilizeTool.test.tsx)
│   │   │   │   │   └── [VideoTrimTool.test.tsx](./src/components/video/molecules/__tests__/VideoTrimTool.test.tsx)
│   │   │   │   ├── [AudioTranscribeTool.tsx](./src/components/video/molecules/AudioTranscribeTool.tsx)
│   │   │   │   ├── [GenerateSubtitleTool.tsx](./src/components/video/molecules/GenerateSubtitleTool.tsx)
│   │   │   │   ├── [VideoCompressTool.tsx](./src/components/video/molecules/VideoCompressTool.tsx)
│   │   │   │   ├── [VideoConvertTool.tsx](./src/components/video/molecules/VideoConvertTool.tsx)
│   │   │   │   ├── [VideoCropTool.tsx](./src/components/video/molecules/VideoCropTool.tsx)
│   │   │   │   ├── [VideoDownloadTool.tsx](./src/components/video/molecules/VideoDownloadTool.tsx)
│   │   │   │   ├── [VideoExtractAudioTool.tsx](./src/components/video/molecules/VideoExtractAudioTool.tsx)
│   │   │   │   ├── [VideoExtractFramesTool.tsx](./src/components/video/molecules/VideoExtractFramesTool.tsx)
│   │   │   │   ├── [VideoMergeTool.tsx](./src/components/video/molecules/VideoMergeTool.tsx)
│   │   │   │   ├── [VideoMuteTool.tsx](./src/components/video/molecules/VideoMuteTool.tsx)
│   │   │   │   ├── [VideoResizeTool.tsx](./src/components/video/molecules/VideoResizeTool.tsx)
│   │   │   │   ├── [VideoSpeedTool.tsx](./src/components/video/molecules/VideoSpeedTool.tsx)
│   │   │   │   ├── [VideoStabilizeTool.tsx](./src/components/video/molecules/VideoStabilizeTool.tsx)
│   │   │   │   ├── [VideoTrimTool.tsx](./src/components/video/molecules/VideoTrimTool.tsx)
│   │   │   │   └── [index.ts](./src/components/video/molecules/index.ts)
│   │   │   ├── templates/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [VideoToolsPage.test.tsx](./src/components/video/templates/__tests__/VideoToolsPage.test.tsx)
│   │   │   │   ├── [VideoToolsPage.tsx](./src/components/video/templates/VideoToolsPage.tsx)
│   │   │   │   └── [index.ts](./src/components/video/templates/index.ts)
│   │   │   └── [index.ts](./src/components/video/index.ts)
│   │   └── wallet/
│   │       ├── __tests__/
│   │       │   └── [RouteGuard.test.tsx](./src/components/wallet/__tests__/RouteGuard.test.tsx)
│   │       ├── atoms/
│   │       │   ├── __tests__/
│   │       │   │   ├── [AccountCard.test.tsx](./src/components/wallet/atoms/__tests__/AccountCard.test.tsx)
│   │       │   │   ├── [AccountDetail.test.tsx](./src/components/wallet/atoms/__tests__/AccountDetail.test.tsx)
│   │       │   │   ├── [BalanceCard.test.tsx](./src/components/wallet/atoms/__tests__/BalanceCard.test.tsx)
│   │       │   │   ├── [BillItem.test.tsx](./src/components/wallet/atoms/__tests__/BillItem.test.tsx)
│   │       │   │   ├── [BudgetCategoryCard.test.tsx](./src/components/wallet/atoms/__tests__/BudgetCategoryCard.test.tsx)
│   │       │   │   ├── [CardActions.test.tsx](./src/components/wallet/atoms/__tests__/CardActions.test.tsx)
│   │       │   │   ├── [CardDetail.test.tsx](./src/components/wallet/atoms/__tests__/CardDetail.test.tsx)
│   │       │   │   ├── [CardItem.test.tsx](./src/components/wallet/atoms/__tests__/CardItem.test.tsx)
│   │       │   │   ├── [CardSpending.branches.test.tsx](./src/components/wallet/atoms/__tests__/CardSpending.branches.test.tsx)
│   │       │   │   ├── [CardSpending.test.tsx](./src/components/wallet/atoms/__tests__/CardSpending.test.tsx)
│   │       │   │   ├── [NotificationItem.test.tsx](./src/components/wallet/atoms/__tests__/NotificationItem.test.tsx)
│   │       │   │   ├── [RateItem.test.tsx](./src/components/wallet/atoms/__tests__/RateItem.test.tsx)
│   │       │   │   ├── [Skeleton.test.tsx](./src/components/wallet/atoms/__tests__/Skeleton.test.tsx)
│   │       │   │   ├── [SpendingChart.test.tsx](./src/components/wallet/atoms/__tests__/SpendingChart.test.tsx)
│   │       │   │   ├── [SwipeableTransactionItem.test.tsx](./src/components/wallet/atoms/__tests__/SwipeableTransactionItem.test.tsx)
│   │       │   │   ├── [TransactionItem.test.tsx](./src/components/wallet/atoms/__tests__/TransactionItem.test.tsx)
│   │       │   │   └── [UserCard.test.tsx](./src/components/wallet/atoms/__tests__/UserCard.test.tsx)
│   │       │   ├── [AccountCard.tsx](./src/components/wallet/atoms/AccountCard.tsx)
│   │       │   ├── [AccountDetail.tsx](./src/components/wallet/atoms/AccountDetail.tsx)
│   │       │   ├── [BalanceCard.tsx](./src/components/wallet/atoms/BalanceCard.tsx)
│   │       │   ├── [BillItem.tsx](./src/components/wallet/atoms/BillItem.tsx)
│   │       │   ├── [BudgetCategoryCard.tsx](./src/components/wallet/atoms/BudgetCategoryCard.tsx)
│   │       │   ├── [CardActions.tsx](./src/components/wallet/atoms/CardActions.tsx)
│   │       │   ├── [CardDetail.tsx](./src/components/wallet/atoms/CardDetail.tsx)
│   │       │   ├── [CardItem.tsx](./src/components/wallet/atoms/CardItem.tsx)
│   │       │   ├── [CardSpending.tsx](./src/components/wallet/atoms/CardSpending.tsx)
│   │       │   ├── [NotificationItem.tsx](./src/components/wallet/atoms/NotificationItem.tsx)
│   │       │   ├── [RateItem.tsx](./src/components/wallet/atoms/RateItem.tsx)
│   │       │   ├── [Skeleton.tsx](./src/components/wallet/atoms/Skeleton.tsx)
│   │       │   ├── [SpendingChart.tsx](./src/components/wallet/atoms/SpendingChart.tsx)
│   │       │   ├── [SwipeableTransactionItem.tsx](./src/components/wallet/atoms/SwipeableTransactionItem.tsx)
│   │       │   ├── [TransactionItem.tsx](./src/components/wallet/atoms/TransactionItem.tsx)
│   │       │   ├── [UserCard.tsx](./src/components/wallet/atoms/UserCard.tsx)
│   │       │   └── [index.ts](./src/components/wallet/atoms/index.ts)
│   │       ├── molecules/
│   │       │   ├── __tests__/
│   │       │   │   ├── [BudgetSummary.test.tsx](./src/components/wallet/molecules/__tests__/BudgetSummary.test.tsx)
│   │       │   │   ├── [CurrencyConverter.test.tsx](./src/components/wallet/molecules/__tests__/CurrencyConverter.test.tsx)
│   │       │   │   ├── [QRCodeActions.test.tsx](./src/components/wallet/molecules/__tests__/QRCodeActions.test.tsx)
│   │       │   │   ├── [QRCodeModal.test.tsx](./src/components/wallet/molecules/__tests__/QRCodeModal.test.tsx)
│   │       │   │   ├── [QuickActions.test.tsx](./src/components/wallet/molecules/__tests__/QuickActions.test.tsx)
│   │       │   │   ├── [QuickPayForm.test.tsx](./src/components/wallet/molecules/__tests__/QuickPayForm.test.tsx)
│   │       │   │   ├── [RateList.test.tsx](./src/components/wallet/molecules/__tests__/RateList.test.tsx)
│   │       │   │   ├── [TransactionFilters.test.tsx](./src/components/wallet/molecules/__tests__/TransactionFilters.test.tsx)
│   │       │   │   ├── [TransferConfirmation.test.tsx](./src/components/wallet/molecules/__tests__/TransferConfirmation.test.tsx)
│   │       │   │   └── [TransferForm.test.tsx](./src/components/wallet/molecules/__tests__/TransferForm.test.tsx)
│   │       │   ├── [AddAccountModal.tsx](./src/components/wallet/molecules/AddAccountModal.tsx)
│   │       │   ├── [AddBillModal.tsx](./src/components/wallet/molecules/AddBillModal.tsx)
│   │       │   ├── [BudgetSummary.tsx](./src/components/wallet/molecules/BudgetSummary.tsx)
│   │       │   ├── [ContactList.tsx](./src/components/wallet/molecules/ContactList.tsx)
│   │       │   ├── [CurrencyAlerts.tsx](./src/components/wallet/molecules/CurrencyAlerts.tsx)
│   │       │   ├── [CurrencyConverter.tsx](./src/components/wallet/molecules/CurrencyConverter.tsx)
│   │       │   ├── [QRCodeActions.tsx](./src/components/wallet/molecules/QRCodeActions.tsx)
│   │       │   ├── [QRCodeModal.tsx](./src/components/wallet/molecules/QRCodeModal.tsx)
│   │       │   ├── [QuickActions.tsx](./src/components/wallet/molecules/QuickActions.tsx)
│   │       │   ├── [QuickPayForm.tsx](./src/components/wallet/molecules/QuickPayForm.tsx)
│   │       │   ├── [RateList.tsx](./src/components/wallet/molecules/RateList.tsx)
│   │       │   ├── [SplitBill.tsx](./src/components/wallet/molecules/SplitBill.tsx)
│   │       │   ├── [TransactionFilters.tsx](./src/components/wallet/molecules/TransactionFilters.tsx)
│   │       │   ├── [TransferConfirmation.tsx](./src/components/wallet/molecules/TransferConfirmation.tsx)
│   │       │   ├── [TransferForm.tsx](./src/components/wallet/molecules/TransferForm.tsx)
│   │       │   └── [index.ts](./src/components/wallet/molecules/index.ts)
│   │       ├── organisms/
│   │       │   ├── __tests__/
│   │       │   │   ├── [BottomNav.test.tsx](./src/components/wallet/organisms/__tests__/BottomNav.test.tsx)
│   │       │   │   ├── [SettingsSection.test.tsx](./src/components/wallet/organisms/__tests__/SettingsSection.test.tsx)
│   │       │   │   └── [Sidebar.test.tsx](./src/components/wallet/organisms/__tests__/Sidebar.test.tsx)
│   │       │   ├── [BottomNav.tsx](./src/components/wallet/organisms/BottomNav.tsx)
│   │       │   ├── [SettingsSection.tsx](./src/components/wallet/organisms/SettingsSection.tsx)
│   │       │   ├── [Sidebar.tsx](./src/components/wallet/organisms/Sidebar.tsx)
│   │       │   └── [index.ts](./src/components/wallet/organisms/index.ts)
│   │       ├── templates/
│   │       │   ├── __tests__/
│   │       │   │   └── [DashboardTemplate.test.tsx](./src/components/wallet/templates/__tests__/DashboardTemplate.test.tsx)
│   │       │   ├── [DashboardTemplate.tsx](./src/components/wallet/templates/DashboardTemplate.tsx)
│   │       │   └── [index.ts](./src/components/wallet/templates/index.ts)
│   │       ├── [OfflineBanner.tsx](./src/components/wallet/OfflineBanner.tsx)
│   │       ├── [PageTransition.tsx](./src/components/wallet/PageTransition.tsx)
│   │       ├── [RouteGuard.tsx](./src/components/wallet/RouteGuard.tsx)
│   │       └── [SkipToContent.tsx](./src/components/wallet/SkipToContent.tsx)
│   ├── content/
│   │   ├── [about.ts](./src/content/about.ts)
│   │   ├── [download.ts](./src/content/download.ts)
│   │   └── [version.ts](./src/content/version.ts)
│   ├── data/
│   │   ├── __tests__/
│   │   │   └── [items.test.ts](./src/data/__tests__/items.test.ts)
│   │   ├── chat/
│   │   │   ├── __tests__/
│   │   │   │   ├── [models.test.ts](./src/data/chat/__tests__/models.test.ts)
│   │   │   │   └── [seed.test.ts](./src/data/chat/__tests__/seed.test.ts)
│   │   │   ├── [index.ts](./src/data/chat/index.ts)
│   │   │   ├── [models.ts](./src/data/chat/models.ts)
│   │   │   ├── [seed.ts](./src/data/chat/seed.ts)
│   │   │   └── [stickers.ts](./src/data/chat/stickers.ts)
│   │   ├── password/
│   │   │   ├── __tests__/
│   │   │   │   ├── [models.test.ts](./src/data/password/__tests__/models.test.ts)
│   │   │   │   └── [seed.test.ts](./src/data/password/__tests__/seed.test.ts)
│   │   │   ├── [index.ts](./src/data/password/index.ts)
│   │   │   ├── [models.ts](./src/data/password/models.ts)
│   │   │   └── [seed.ts](./src/data/password/seed.ts)
│   │   ├── video/
│   │   │   ├── __tests__/
│   │   │   │   └── [video-tools.test.ts](./src/data/video/__tests__/video-tools.test.ts)
│   │   │   └── [video-tools.ts](./src/data/video/video-tools.ts)
│   │   ├── wallet/
│   │   │   ├── [mock.ts](./src/data/wallet/mock.ts)
│   │   │   └── [nav.ts](./src/data/wallet/nav.ts)
│   │   └── [items.ts](./src/data/items.ts)
│   ├── hooks/
│   │   ├── chat/
│   │   │   ├── __tests__/
│   │   │   │   └── [useSWRegister.test.ts](./src/hooks/chat/__tests__/useSWRegister.test.ts)
│   │   │   ├── [index.ts](./src/hooks/chat/index.ts)
│   │   │   ├── [useAuthActions.ts](./src/hooks/chat/useAuthActions.ts)
│   │   │   ├── [useCallActions.ts](./src/hooks/chat/useCallActions.ts)
│   │   │   ├── [useChatActions.ts](./src/hooks/chat/useChatActions.ts)
│   │   │   ├── [useDataEffects.ts](./src/hooks/chat/useDataEffects.ts)
│   │   │   ├── [useMessageActions.ts](./src/hooks/chat/useMessageActions.ts)
│   │   │   ├── [usePeerActions.ts](./src/hooks/chat/usePeerActions.ts)
│   │   │   ├── [usePrivacyActions.ts](./src/hooks/chat/usePrivacyActions.ts)
│   │   │   ├── [useSWRegister.ts](./src/hooks/chat/useSWRegister.ts)
│   │   │   └── [useSettingsActions.ts](./src/hooks/chat/useSettingsActions.ts)
│   │   ├── menu/
│   │   │   ├── [index.ts](./src/hooks/menu/index.ts)
│   │   │   └── [useMenuStore.ts](./src/hooks/menu/useMenuStore.ts)
│   │   ├── password/
│   │   │   ├── __tests__/
│   │   │   │   └── [useSWRegister.test.tsx](./src/hooks/password/__tests__/useSWRegister.test.tsx)
│   │   │   ├── [index.ts](./src/hooks/password/index.ts)
│   │   │   └── [useSWRegister.ts](./src/hooks/password/useSWRegister.ts)
│   │   └── wallet/
│   │       ├── [useEntitySync.ts](./src/hooks/wallet/useEntitySync.ts)
│   │       ├── [useHaptic.ts](./src/hooks/wallet/useHaptic.ts)
│   │       ├── [useMediaQuery.ts](./src/hooks/wallet/useMediaQuery.ts)
│   │       ├── [usePullToRefresh.ts](./src/hooks/wallet/usePullToRefresh.ts)
│   │       ├── [useSWRegister.ts](./src/hooks/wallet/useSWRegister.ts)
│   │       └── [useWalletSession.ts](./src/hooks/wallet/useWalletSession.ts)
│   ├── lib/
│   │   ├── __tests__/
│   │   │   └── [storage.test.ts](./src/lib/__tests__/storage.test.ts)
│   │   ├── chat/
│   │   │   ├── __tests__/
│   │   │   │   ├── [crypto.test.ts](./src/lib/chat/__tests__/crypto.test.ts)
│   │   │   │   ├── [db.test.ts](./src/lib/chat/__tests__/db.test.ts)
│   │   │   │   ├── [format.test.ts](./src/lib/chat/__tests__/format.test.ts)
│   │   │   │   ├── [selectors.test.ts](./src/lib/chat/__tests__/selectors.test.ts)
│   │   │   │   ├── [url.test.ts](./src/lib/chat/__tests__/url.test.ts)
│   │   │   │   └── [webrtc.test.ts](./src/lib/chat/__tests__/webrtc.test.ts)
│   │   │   ├── [crypto.ts](./src/lib/chat/crypto.ts)
│   │   │   ├── [db.ts](./src/lib/chat/db.ts)
│   │   │   ├── [format.ts](./src/lib/chat/format.ts)
│   │   │   ├── [index.ts](./src/lib/chat/index.ts)
│   │   │   ├── [selectors.ts](./src/lib/chat/selectors.ts)
│   │   │   ├── [url.ts](./src/lib/chat/url.ts)
│   │   │   └── [webrtc.ts](./src/lib/chat/webrtc.ts)
│   │   ├── menu/
│   │   │   ├── __tests__/
│   │   │   │   └── [menu.test.ts](./src/lib/menu/__tests__/menu.test.ts)
│   │   │   ├── [ids.ts](./src/lib/menu/ids.ts)
│   │   │   ├── [index.ts](./src/lib/menu/index.ts)
│   │   │   ├── [menu.ts](./src/lib/menu/menu.ts)
│   │   │   ├── [qr.ts](./src/lib/menu/qr.ts)
│   │   │   ├── [seed.ts](./src/lib/menu/seed.ts)
│   │   │   └── [storage.ts](./src/lib/menu/storage.ts)
│   │   ├── password/
│   │   │   ├── __tests__/
│   │   │   │   ├── [db.test.ts](./src/lib/password/__tests__/db.test.ts)
│   │   │   │   ├── [health.test.ts](./src/lib/password/__tests__/health.test.ts)
│   │   │   │   ├── [security.test.ts](./src/lib/password/__tests__/security.test.ts)
│   │   │   │   ├── [totp.test.ts](./src/lib/password/__tests__/totp.test.ts)
│   │   │   │   └── [transfer.test.ts](./src/lib/password/__tests__/transfer.test.ts)
│   │   │   ├── [db.ts](./src/lib/password/db.ts)
│   │   │   ├── [health.ts](./src/lib/password/health.ts)
│   │   │   ├── [index.ts](./src/lib/password/index.ts)
│   │   │   ├── [security.ts](./src/lib/password/security.ts)
│   │   │   ├── [totp.ts](./src/lib/password/totp.ts)
│   │   │   └── [transfer.ts](./src/lib/password/transfer.ts)
│   │   ├── pos/
│   │   │   ├── __tests__/
│   │   │   │   ├── [cart.test.ts](./src/lib/pos/__tests__/cart.test.ts)
│   │   │   │   ├── [discounts.test.ts](./src/lib/pos/__tests__/discounts.test.ts)
│   │   │   │   ├── [export.test.ts](./src/lib/pos/__tests__/export.test.ts)
│   │   │   │   ├── [money.test.ts](./src/lib/pos/__tests__/money.test.ts)
│   │   │   │   ├── [payment.test.ts](./src/lib/pos/__tests__/payment.test.ts)
│   │   │   │   └── [reports.test.ts](./src/lib/pos/__tests__/reports.test.ts)
│   │   │   ├── [cart.ts](./src/lib/pos/cart.ts)
│   │   │   ├── [discounts.ts](./src/lib/pos/discounts.ts)
│   │   │   ├── [download.ts](./src/lib/pos/download.ts)
│   │   │   ├── [export.ts](./src/lib/pos/export.ts)
│   │   │   ├── [index.ts](./src/lib/pos/index.ts)
│   │   │   ├── [inventory.ts](./src/lib/pos/inventory.ts)
│   │   │   ├── [money.ts](./src/lib/pos/money.ts)
│   │   │   ├── [payment.ts](./src/lib/pos/payment.ts)
│   │   │   ├── [reports.ts](./src/lib/pos/reports.ts)
│   │   │   └── [transactions.ts](./src/lib/pos/transactions.ts)
│   │   ├── video/
│   │   │   ├── __tests__/
│   │   │   │   └── [video-tools.test.ts](./src/lib/video/__tests__/video-tools.test.ts)
│   │   │   └── [video-tools.ts](./src/lib/video/video-tools.ts)
│   │   ├── wallet/
│   │   │   ├── [db.ts](./src/lib/wallet/db.ts)
│   │   │   ├── [export.ts](./src/lib/wallet/export.ts)
│   │   │   ├── [format.ts](./src/lib/wallet/format.ts)
│   │   │   ├── [iconMap.ts](./src/lib/wallet/iconMap.ts)
│   │   │   ├── [seed.ts](./src/lib/wallet/seed.ts)
│   │   │   └── [session.ts](./src/lib/wallet/session.ts)
│   │   └── [storage.ts](./src/lib/storage.ts)
│   ├── providers/
│   │   ├── chat/
│   │   │   ├── __tests__/
│   │   │   │   ├── [DataProvider.test.tsx](./src/providers/chat/__tests__/DataProvider.test.tsx)
│   │   │   │   ├── [Providers.test.tsx](./src/providers/chat/__tests__/Providers.test.tsx)
│   │   │   │   ├── [SWProvider.test.tsx](./src/providers/chat/__tests__/SWProvider.test.tsx)
│   │   │   │   └── [ToastProvider.test.tsx](./src/providers/chat/__tests__/ToastProvider.test.tsx)
│   │   │   ├── [DataContext.ts](./src/providers/chat/DataContext.ts)
│   │   │   ├── [DataProvider.tsx](./src/providers/chat/DataProvider.tsx)
│   │   │   ├── [Providers.tsx](./src/providers/chat/Providers.tsx)
│   │   │   ├── [SWProvider.tsx](./src/providers/chat/SWProvider.tsx)
│   │   │   ├── [ToastProvider.tsx](./src/providers/chat/ToastProvider.tsx)
│   │   │   ├── [data-helpers.ts](./src/providers/chat/data-helpers.ts)
│   │   │   └── [index.ts](./src/providers/chat/index.ts)
│   │   ├── password/
│   │   │   ├── __tests__/
│   │   │   │   ├── [DataProvider.test.tsx](./src/providers/password/__tests__/DataProvider.test.tsx)
│   │   │   │   ├── [SWProvider.test.tsx](./src/providers/password/__tests__/SWProvider.test.tsx)
│   │   │   │   ├── [SecurityProvider.test.tsx](./src/providers/password/__tests__/SecurityProvider.test.tsx)
│   │   │   │   └── [ToastProvider.test.tsx](./src/providers/password/__tests__/ToastProvider.test.tsx)
│   │   │   ├── [DataProvider.tsx](./src/providers/password/DataProvider.tsx)
│   │   │   ├── [Providers.tsx](./src/providers/password/Providers.tsx)
│   │   │   ├── [SWProvider.tsx](./src/providers/password/SWProvider.tsx)
│   │   │   ├── [SecurityProvider.tsx](./src/providers/password/SecurityProvider.tsx)
│   │   │   ├── [ToastProvider.tsx](./src/providers/password/ToastProvider.tsx)
│   │   │   └── [index.ts](./src/providers/password/index.ts)
│   │   └── wallet/
│   │       ├── __tests__/
│   │       │   ├── [DataProvider.crud.test.tsx](./src/providers/wallet/__tests__/DataProvider.crud.test.tsx)
│   │       │   ├── [DataProvider.loading.test.tsx](./src/providers/wallet/__tests__/DataProvider.loading.test.tsx)
│   │       │   ├── [DataProvider.test.tsx](./src/providers/wallet/__tests__/DataProvider.test.tsx)
│   │       │   └── [ToastProvider.test.tsx](./src/providers/wallet/__tests__/ToastProvider.test.tsx)
│   │       ├── auth/
│   │       │   └── [AuthProvider.tsx](./src/providers/wallet/auth/AuthProvider.tsx)
│   │       ├── entities/
│   │       │   ├── [AccountsProvider.tsx](./src/providers/wallet/entities/AccountsProvider.tsx)
│   │       │   ├── [BillsProvider.tsx](./src/providers/wallet/entities/BillsProvider.tsx)
│   │       │   ├── [BudgetProvider.tsx](./src/providers/wallet/entities/BudgetProvider.tsx)
│   │       │   ├── [CardsProvider.tsx](./src/providers/wallet/entities/CardsProvider.tsx)
│   │       │   ├── [ContactsProvider.tsx](./src/providers/wallet/entities/ContactsProvider.tsx)
│   │       │   ├── [CurrencyAlertsProvider.tsx](./src/providers/wallet/entities/CurrencyAlertsProvider.tsx)
│   │       │   ├── [CurrencyRatesProvider.tsx](./src/providers/wallet/entities/CurrencyRatesProvider.tsx)
│   │       │   ├── [FDsProvider.tsx](./src/providers/wallet/entities/FDsProvider.tsx)
│   │       │   ├── [GoalsProvider.tsx](./src/providers/wallet/entities/GoalsProvider.tsx)
│   │       │   ├── [InsuranceProvider.tsx](./src/providers/wallet/entities/InsuranceProvider.tsx)
│   │       │   ├── [LoansProvider.tsx](./src/providers/wallet/entities/LoansProvider.tsx)
│   │       │   ├── [NotificationsProvider.tsx](./src/providers/wallet/entities/NotificationsProvider.tsx)
│   │       │   ├── [PaymentRequestsProvider.tsx](./src/providers/wallet/entities/PaymentRequestsProvider.tsx)
│   │       │   ├── [RDsProvider.tsx](./src/providers/wallet/entities/RDsProvider.tsx)
│   │       │   ├── [RecurringTransfersProvider.tsx](./src/providers/wallet/entities/RecurringTransfersProvider.tsx)
│   │       │   ├── [RewardsProvider.tsx](./src/providers/wallet/entities/RewardsProvider.tsx)
│   │       │   ├── [TransactionsProvider.tsx](./src/providers/wallet/entities/TransactionsProvider.tsx)
│   │       │   └── [UserProvider.tsx](./src/providers/wallet/entities/UserProvider.tsx)
│   │       ├── [DataProvider.tsx](./src/providers/wallet/DataProvider.tsx)
│   │       ├── [Providers.tsx](./src/providers/wallet/Providers.tsx)
│   │       ├── [SWProvider.tsx](./src/providers/wallet/SWProvider.tsx)
│   │       ├── [ToastProvider.tsx](./src/providers/wallet/ToastProvider.tsx)
│   │       └── [WalletProviders.tsx](./src/providers/wallet/WalletProviders.tsx)
│   ├── styles/
│   │   ├── [globals.css](./src/styles/globals.css)
│   │   └── [themes.css](./src/styles/themes.css)
│   ├── test-helpers/
│   │   ├── password/
│   │   │   ├── [fakeDb.ts](./src/test-helpers/password/fakeDb.ts)
│   │   │   └── [index.ts](./src/test-helpers/password/index.ts)
│   │   └── wallet/
│   │       ├── [db-mock.ts](./src/test-helpers/wallet/db-mock.ts)
│   │       ├── [index.ts](./src/test-helpers/wallet/index.ts)
│   │       ├── [nav-mock.ts](./src/test-helpers/wallet/nav-mock.ts)
│   │       └── [render.tsx](./src/test-helpers/wallet/render.tsx)
│   ├── types/
│   │   ├── chat/
│   │   │   ├── [call.ts](./src/types/chat/call.ts)
│   │   │   ├── [chat.ts](./src/types/chat/chat.ts)
│   │   │   ├── [index.ts](./src/types/chat/index.ts)
│   │   │   ├── [message.ts](./src/types/chat/message.ts)
│   │   │   ├── [peer.ts](./src/types/chat/peer.ts)
│   │   │   ├── [settings.ts](./src/types/chat/settings.ts)
│   │   │   └── [user.ts](./src/types/chat/user.ts)
│   │   ├── menu/
│   │   │   ├── [index.ts](./src/types/menu/index.ts)
│   │   │   └── [menu.ts](./src/types/menu/menu.ts)
│   │   ├── password/
│   │   │   └── [index.ts](./src/types/password/index.ts)
│   │   ├── pos/
│   │   │   └── [index.ts](./src/types/pos/index.ts)
│   │   ├── video/
│   │   │   └── [speech-recognition.d.ts](./src/types/video/speech-recognition.d.ts)
│   │   └── wallet/
│   │       └── [index.ts](./src/types/wallet/index.ts)
│   └── utils/
│       └── password/
│           ├── __tests__/
│           │   └── [format.test.ts](./src/utils/password/__tests__/format.test.ts)
│           ├── [format.ts](./src/utils/password/format.ts)
│           └── [index.ts](./src/utils/password/index.ts)
├── src-tauri/
│   ├── capabilities/
│   │   └── [default.json](./src-tauri/capabilities/default.json)
│   ├── icons/
│   │   ├── android/
│   │   │   ├── mipmap-anydpi-v26/
│   │   │   │   └── [ic_launcher.xml](./src-tauri/icons/android/mipmap-anydpi-v26/ic_launcher.xml)
│   │   │   ├── mipmap-hdpi/
│   │   │   │   ├── [ic_launcher.png](./src-tauri/icons/android/mipmap-hdpi/ic_launcher.png)
│   │   │   │   ├── [ic_launcher_foreground.png](./src-tauri/icons/android/mipmap-hdpi/ic_launcher_foreground.png)
│   │   │   │   └── [ic_launcher_round.png](./src-tauri/icons/android/mipmap-hdpi/ic_launcher_round.png)
│   │   │   ├── mipmap-mdpi/
│   │   │   │   ├── [ic_launcher.png](./src-tauri/icons/android/mipmap-mdpi/ic_launcher.png)
│   │   │   │   ├── [ic_launcher_foreground.png](./src-tauri/icons/android/mipmap-mdpi/ic_launcher_foreground.png)
│   │   │   │   └── [ic_launcher_round.png](./src-tauri/icons/android/mipmap-mdpi/ic_launcher_round.png)
│   │   │   ├── mipmap-xhdpi/
│   │   │   │   ├── [ic_launcher.png](./src-tauri/icons/android/mipmap-xhdpi/ic_launcher.png)
│   │   │   │   ├── [ic_launcher_foreground.png](./src-tauri/icons/android/mipmap-xhdpi/ic_launcher_foreground.png)
│   │   │   │   └── [ic_launcher_round.png](./src-tauri/icons/android/mipmap-xhdpi/ic_launcher_round.png)
│   │   │   ├── mipmap-xxhdpi/
│   │   │   │   ├── [ic_launcher.png](./src-tauri/icons/android/mipmap-xxhdpi/ic_launcher.png)
│   │   │   │   ├── [ic_launcher_foreground.png](./src-tauri/icons/android/mipmap-xxhdpi/ic_launcher_foreground.png)
│   │   │   │   └── [ic_launcher_round.png](./src-tauri/icons/android/mipmap-xxhdpi/ic_launcher_round.png)
│   │   │   ├── mipmap-xxxhdpi/
│   │   │   │   ├── [ic_launcher.png](./src-tauri/icons/android/mipmap-xxxhdpi/ic_launcher.png)
│   │   │   │   ├── [ic_launcher_foreground.png](./src-tauri/icons/android/mipmap-xxxhdpi/ic_launcher_foreground.png)
│   │   │   │   └── [ic_launcher_round.png](./src-tauri/icons/android/mipmap-xxxhdpi/ic_launcher_round.png)
│   │   │   └── values/
│   │   │       └── [ic_launcher_background.xml](./src-tauri/icons/android/values/ic_launcher_background.xml)
│   │   ├── ios/
│   │   │   ├── [AppIcon-20x20@1x.png](./src-tauri/icons/ios/AppIcon-20x20@1x.png)
│   │   │   ├── [AppIcon-20x20@2x-1.png](./src-tauri/icons/ios/AppIcon-20x20@2x-1.png)
│   │   │   ├── [AppIcon-20x20@2x.png](./src-tauri/icons/ios/AppIcon-20x20@2x.png)
│   │   │   ├── [AppIcon-20x20@3x.png](./src-tauri/icons/ios/AppIcon-20x20@3x.png)
│   │   │   ├── [AppIcon-29x29@1x.png](./src-tauri/icons/ios/AppIcon-29x29@1x.png)
│   │   │   ├── [AppIcon-29x29@2x-1.png](./src-tauri/icons/ios/AppIcon-29x29@2x-1.png)
│   │   │   ├── [AppIcon-29x29@2x.png](./src-tauri/icons/ios/AppIcon-29x29@2x.png)
│   │   │   ├── [AppIcon-29x29@3x.png](./src-tauri/icons/ios/AppIcon-29x29@3x.png)
│   │   │   ├── [AppIcon-40x40@1x.png](./src-tauri/icons/ios/AppIcon-40x40@1x.png)
│   │   │   ├── [AppIcon-40x40@2x-1.png](./src-tauri/icons/ios/AppIcon-40x40@2x-1.png)
│   │   │   ├── [AppIcon-40x40@2x.png](./src-tauri/icons/ios/AppIcon-40x40@2x.png)
│   │   │   ├── [AppIcon-40x40@3x.png](./src-tauri/icons/ios/AppIcon-40x40@3x.png)
│   │   │   ├── [AppIcon-512@2x.png](./src-tauri/icons/ios/AppIcon-512@2x.png)
│   │   │   ├── [AppIcon-60x60@2x.png](./src-tauri/icons/ios/AppIcon-60x60@2x.png)
│   │   │   ├── [AppIcon-60x60@3x.png](./src-tauri/icons/ios/AppIcon-60x60@3x.png)
│   │   │   ├── [AppIcon-76x76@1x.png](./src-tauri/icons/ios/AppIcon-76x76@1x.png)
│   │   │   ├── [AppIcon-76x76@2x.png](./src-tauri/icons/ios/AppIcon-76x76@2x.png)
│   │   │   └── [AppIcon-83.5x83.5@2x.png](./src-tauri/icons/ios/AppIcon-83.5x83.5@2x.png)
│   │   ├── [128x128.png](./src-tauri/icons/128x128.png)
│   │   ├── [128x128@2x.png](./src-tauri/icons/128x128@2x.png)
│   │   ├── [256x256.png](./src-tauri/icons/256x256.png)
│   │   ├── [32x32.png](./src-tauri/icons/32x32.png)
│   │   ├── [64x64.png](./src-tauri/icons/64x64.png)
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
│   │   ├── [create-icons.sh](./src-tauri/icons/create-icons.sh)
│   │   ├── [icon-1024.png](./src-tauri/icons/icon-1024.png)
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

223 directories, 748 files
