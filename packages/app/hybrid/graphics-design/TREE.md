# TREE

```text
├── exhibit/
│   ├── docs/
│   │   ├── [ARCHITECTURE.md](./exhibit/docs/ARCHITECTURE.md)
│   │   ├── [CONTRIBUTING.md](./exhibit/docs/CONTRIBUTING.md)
│   │   ├── [DOWNLOADS.md](./exhibit/docs/DOWNLOADS.md)
│   │   ├── [PACKAGING.md](./exhibit/docs/PACKAGING.md)
│   │   └── [ROADMAP.md](./exhibit/docs/ROADMAP.md)
│   ├── e2e/
│   │   ├── wallet/
│   │   │   ├── [auth-guard.spec.ts](./exhibit/e2e/wallet/auth-guard.spec.ts)
│   │   │   ├── [cards.spec.ts](./exhibit/e2e/wallet/cards.spec.ts)
│   │   │   ├── [exchange.spec.ts](./exhibit/e2e/wallet/exchange.spec.ts)
│   │   │   ├── [helpers.ts](./exhibit/e2e/wallet/helpers.ts)
│   │   │   ├── [index.spec.ts](./exhibit/e2e/wallet/index.spec.ts)
│   │   │   ├── [navigation.spec.ts](./exhibit/e2e/wallet/navigation.spec.ts)
│   │   │   ├── [pay.spec.ts](./exhibit/e2e/wallet/pay.spec.ts)
│   │   │   ├── [profile.spec.ts](./exhibit/e2e/wallet/profile.spec.ts)
│   │   │   ├── [transactions.spec.ts](./exhibit/e2e/wallet/transactions.spec.ts)
│   │   │   └── [transfer.spec.ts](./exhibit/e2e/wallet/transfer.spec.ts)
│   │   ├── [about.spec.ts](./exhibit/e2e/about.spec.ts)
│   │   ├── [downloads.spec.ts](./exhibit/e2e/downloads.spec.ts)
│   │   ├── [home.spec.ts](./exhibit/e2e/home.spec.ts)
│   │   └── [version.spec.ts](./exhibit/e2e/version.spec.ts)
│   ├── public/
│   │   ├── icons/
│   │   │   ├── [icon-128x128.png](./exhibit/public/icons/icon-128x128.png)
│   │   │   ├── [icon-144x144.png](./exhibit/public/icons/icon-144x144.png)
│   │   │   ├── [icon-152x152.png](./exhibit/public/icons/icon-152x152.png)
│   │   │   ├── [icon-16x16.png](./exhibit/public/icons/icon-16x16.png)
│   │   │   ├── [icon-180x180.png](./exhibit/public/icons/icon-180x180.png)
│   │   │   ├── [icon-192x192.png](./exhibit/public/icons/icon-192x192.png)
│   │   │   ├── [icon-256x256.png](./exhibit/public/icons/icon-256x256.png)
│   │   │   ├── [icon-32x32.png](./exhibit/public/icons/icon-32x32.png)
│   │   │   ├── [icon-384x384.png](./exhibit/public/icons/icon-384x384.png)
│   │   │   ├── [icon-48x48.png](./exhibit/public/icons/icon-48x48.png)
│   │   │   ├── [icon-512x512.png](./exhibit/public/icons/icon-512x512.png)
│   │   │   ├── [icon-64x64.png](./exhibit/public/icons/icon-64x64.png)
│   │   │   ├── [icon-72x72.png](./exhibit/public/icons/icon-72x72.png)
│   │   │   ├── [icon-96x96.png](./exhibit/public/icons/icon-96x96.png)
│   │   │   └── [icon.svg](./exhibit/public/icons/icon.svg)
│   │   ├── og/
│   │   │   ├── [og.png](./exhibit/public/og/og.png)
│   │   │   └── [og.svg](./exhibit/public/og/og.svg)
│   │   ├── [apple-touch-icon.png](./exhibit/public/apple-touch-icon.png)
│   │   ├── [favicon.ico](./exhibit/public/favicon.ico)
│   │   ├── [manifest.json](./exhibit/public/manifest.json)
│   │   ├── [robots.txt](./exhibit/public/robots.txt)
│   │   ├── [sitemap.xml](./exhibit/public/sitemap.xml)
│   │   └── [sw.js](./exhibit/public/sw.js)
│   ├── src/
│   │   ├── app/
│   │   │   ├── (app)/
│   │   │   │   ├── chat/
│   │   │   │   │   ├── settings/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   └── [page.test.tsx](./exhibit/src/app/(app)/chat/settings/__tests__/page.test.tsx)
│   │   │   │   │   │   └── [page.tsx](./exhibit/src/app/(app)/chat/settings/page.tsx)
│   │   │   │   │   └── [page.tsx](./exhibit/src/app/(app)/chat/page.tsx)
│   │   │   │   ├── menu/
│   │   │   │   │   └── [page.tsx](./exhibit/src/app/(app)/menu/page.tsx)
│   │   │   │   ├── password/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./exhibit/src/app/(app)/password/__tests__/page.test.tsx)
│   │   │   │   │   ├── generator/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   └── [page.test.tsx](./exhibit/src/app/(app)/password/generator/__tests__/page.test.tsx)
│   │   │   │   │   │   └── [page.tsx](./exhibit/src/app/(app)/password/generator/page.tsx)
│   │   │   │   │   ├── health/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   └── [health-page.test.tsx](./exhibit/src/app/(app)/password/health/__tests__/health-page.test.tsx)
│   │   │   │   │   │   └── [page.tsx](./exhibit/src/app/(app)/password/health/page.tsx)
│   │   │   │   │   ├── item/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   └── [item-page.test.tsx](./exhibit/src/app/(app)/password/item/__tests__/item-page.test.tsx)
│   │   │   │   │   │   └── [page.tsx](./exhibit/src/app/(app)/password/item/page.tsx)
│   │   │   │   │   ├── settings/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   └── [settings-page.test.tsx](./exhibit/src/app/(app)/password/settings/__tests__/settings-page.test.tsx)
│   │   │   │   │   │   └── [page.tsx](./exhibit/src/app/(app)/password/settings/page.tsx)
│   │   │   │   │   ├── trash/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   └── [trash-page.test.tsx](./exhibit/src/app/(app)/password/trash/__tests__/trash-page.test.tsx)
│   │   │   │   │   │   └── [page.tsx](./exhibit/src/app/(app)/password/trash/page.tsx)
│   │   │   │   │   └── [page.tsx](./exhibit/src/app/(app)/password/page.tsx)
│   │   │   │   ├── pos/
│   │   │   │   │   └── [page.tsx](./exhibit/src/app/(app)/pos/page.tsx)
│   │   │   │   ├── video/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./exhibit/src/app/(app)/video/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./exhibit/src/app/(app)/video/page.tsx)
│   │   │   │   └── wallet/
│   │   │   │       ├── __tests__/
│   │   │   │       │   └── [page.test.tsx](./exhibit/src/app/(app)/wallet/__tests__/page.test.tsx)
│   │   │   │       ├── accounts/
│   │   │   │       │   ├── __tests__/
│   │   │   │       │   │   └── [page.test.tsx](./exhibit/src/app/(app)/wallet/accounts/__tests__/page.test.tsx)
│   │   │   │       │   ├── checking/
│   │   │   │       │   │   ├── __tests__/
│   │   │   │       │   │   │   └── [page.test.tsx](./exhibit/src/app/(app)/wallet/accounts/checking/__tests__/page.test.tsx)
│   │   │   │       │   │   └── [page.tsx](./exhibit/src/app/(app)/wallet/accounts/checking/page.tsx)
│   │   │   │       │   ├── credit/
│   │   │   │       │   │   ├── __tests__/
│   │   │   │       │   │   │   └── [page.test.tsx](./exhibit/src/app/(app)/wallet/accounts/credit/__tests__/page.test.tsx)
│   │   │   │       │   │   └── [page.tsx](./exhibit/src/app/(app)/wallet/accounts/credit/page.tsx)
│   │   │   │       │   ├── savings/
│   │   │   │       │   │   ├── __tests__/
│   │   │   │       │   │   │   └── [page.test.tsx](./exhibit/src/app/(app)/wallet/accounts/savings/__tests__/page.test.tsx)
│   │   │   │       │   │   └── [page.tsx](./exhibit/src/app/(app)/wallet/accounts/savings/page.tsx)
│   │   │   │       │   └── [page.tsx](./exhibit/src/app/(app)/wallet/accounts/page.tsx)
│   │   │   │       ├── bills/
│   │   │   │       │   ├── __tests__/
│   │   │   │       │   │   └── [page.test.tsx](./exhibit/src/app/(app)/wallet/bills/__tests__/page.test.tsx)
│   │   │   │       │   └── [page.tsx](./exhibit/src/app/(app)/wallet/bills/page.tsx)
│   │   │   │       ├── budget/
│   │   │   │       │   ├── __tests__/
│   │   │   │       │   │   └── [page.test.tsx](./exhibit/src/app/(app)/wallet/budget/__tests__/page.test.tsx)
│   │   │   │       │   └── [page.tsx](./exhibit/src/app/(app)/wallet/budget/page.tsx)
│   │   │   │       ├── card-rewards/
│   │   │   │       │   ├── __tests__/
│   │   │   │       │   │   └── [page.test.tsx](./exhibit/src/app/(app)/wallet/card-rewards/__tests__/page.test.tsx)
│   │   │   │       │   └── [page.tsx](./exhibit/src/app/(app)/wallet/card-rewards/page.tsx)
│   │   │   │       ├── cards/
│   │   │   │       │   ├── __tests__/
│   │   │   │       │   │   └── [page.test.tsx](./exhibit/src/app/(app)/wallet/cards/__tests__/page.test.tsx)
│   │   │   │       │   └── [page.tsx](./exhibit/src/app/(app)/wallet/cards/page.tsx)
│   │   │   │       ├── contacts/
│   │   │   │       │   ├── __tests__/
│   │   │   │       │   │   └── [page.test.tsx](./exhibit/src/app/(app)/wallet/contacts/__tests__/page.test.tsx)
│   │   │   │       │   └── [page.tsx](./exhibit/src/app/(app)/wallet/contacts/page.tsx)
│   │   │   │       ├── currency-alerts/
│   │   │   │       │   ├── __tests__/
│   │   │   │       │   │   └── [page.test.tsx](./exhibit/src/app/(app)/wallet/currency-alerts/__tests__/page.test.tsx)
│   │   │   │       │   └── [page.tsx](./exhibit/src/app/(app)/wallet/currency-alerts/page.tsx)
│   │   │   │       ├── exchange/
│   │   │   │       │   ├── __tests__/
│   │   │   │       │   │   └── [page.test.tsx](./exhibit/src/app/(app)/wallet/exchange/__tests__/page.test.tsx)
│   │   │   │       │   └── [page.tsx](./exhibit/src/app/(app)/wallet/exchange/page.tsx)
│   │   │   │       ├── fixed-deposits/
│   │   │   │       │   ├── __tests__/
│   │   │   │       │   │   └── [page.test.tsx](./exhibit/src/app/(app)/wallet/fixed-deposits/__tests__/page.test.tsx)
│   │   │   │       │   └── [page.tsx](./exhibit/src/app/(app)/wallet/fixed-deposits/page.tsx)
│   │   │   │       ├── help-support/
│   │   │   │       │   ├── __tests__/
│   │   │   │       │   │   └── [page.test.tsx](./exhibit/src/app/(app)/wallet/help-support/__tests__/page.test.tsx)
│   │   │   │       │   └── [page.tsx](./exhibit/src/app/(app)/wallet/help-support/page.tsx)
│   │   │   │       ├── insurance/
│   │   │   │       │   ├── __tests__/
│   │   │   │       │   │   └── [page.test.tsx](./exhibit/src/app/(app)/wallet/insurance/__tests__/page.test.tsx)
│   │   │   │       │   └── [page.tsx](./exhibit/src/app/(app)/wallet/insurance/page.tsx)
│   │   │   │       ├── loans/
│   │   │   │       │   ├── __tests__/
│   │   │   │       │   │   └── [page.test.tsx](./exhibit/src/app/(app)/wallet/loans/__tests__/page.test.tsx)
│   │   │   │       │   └── [page.tsx](./exhibit/src/app/(app)/wallet/loans/page.tsx)
│   │   │   │       ├── notifications/
│   │   │   │       │   ├── __tests__/
│   │   │   │       │   │   └── [page.test.tsx](./exhibit/src/app/(app)/wallet/notifications/__tests__/page.test.tsx)
│   │   │   │       │   └── [page.tsx](./exhibit/src/app/(app)/wallet/notifications/page.tsx)
│   │   │   │       ├── pay/
│   │   │   │       │   ├── __tests__/
│   │   │   │       │   │   └── [page.test.tsx](./exhibit/src/app/(app)/wallet/pay/__tests__/page.test.tsx)
│   │   │   │       │   └── [page.tsx](./exhibit/src/app/(app)/wallet/pay/page.tsx)
│   │   │   │       ├── payment-requests/
│   │   │   │       │   ├── __tests__/
│   │   │   │       │   │   └── [page.test.tsx](./exhibit/src/app/(app)/wallet/payment-requests/__tests__/page.test.tsx)
│   │   │   │       │   └── [page.tsx](./exhibit/src/app/(app)/wallet/payment-requests/page.tsx)
│   │   │   │       ├── privacy-policy/
│   │   │   │       │   ├── __tests__/
│   │   │   │       │   │   └── [page.test.tsx](./exhibit/src/app/(app)/wallet/privacy-policy/__tests__/page.test.tsx)
│   │   │   │       │   └── [page.tsx](./exhibit/src/app/(app)/wallet/privacy-policy/page.tsx)
│   │   │   │       ├── profile/
│   │   │   │       │   ├── __tests__/
│   │   │   │       │   │   └── [page.test.tsx](./exhibit/src/app/(app)/wallet/profile/__tests__/page.test.tsx)
│   │   │   │       │   └── [page.tsx](./exhibit/src/app/(app)/wallet/profile/page.tsx)
│   │   │   │       ├── rates/
│   │   │   │       │   ├── __tests__/
│   │   │   │       │   │   └── [page.test.tsx](./exhibit/src/app/(app)/wallet/rates/__tests__/page.test.tsx)
│   │   │   │       │   └── [page.tsx](./exhibit/src/app/(app)/wallet/rates/page.tsx)
│   │   │   │       ├── recurring-deposits/
│   │   │   │       │   ├── __tests__/
│   │   │   │       │   │   └── [page.test.tsx](./exhibit/src/app/(app)/wallet/recurring-deposits/__tests__/page.test.tsx)
│   │   │   │       │   └── [page.tsx](./exhibit/src/app/(app)/wallet/recurring-deposits/page.tsx)
│   │   │   │       ├── recurring-transfers/
│   │   │   │       │   ├── __tests__/
│   │   │   │       │   │   └── [page.test.tsx](./exhibit/src/app/(app)/wallet/recurring-transfers/__tests__/page.test.tsx)
│   │   │   │       │   └── [page.tsx](./exhibit/src/app/(app)/wallet/recurring-transfers/page.tsx)
│   │   │   │       ├── reports/
│   │   │   │       │   ├── __tests__/
│   │   │   │       │   │   └── [page.test.tsx](./exhibit/src/app/(app)/wallet/reports/__tests__/page.test.tsx)
│   │   │   │       │   └── [page.tsx](./exhibit/src/app/(app)/wallet/reports/page.tsx)
│   │   │   │       ├── savings-goals/
│   │   │   │       │   ├── __tests__/
│   │   │   │       │   │   └── [page.test.tsx](./exhibit/src/app/(app)/wallet/savings-goals/__tests__/page.test.tsx)
│   │   │   │       │   └── [page.tsx](./exhibit/src/app/(app)/wallet/savings-goals/page.tsx)
│   │   │   │       ├── settings/
│   │   │   │       │   └── [page.tsx](./exhibit/src/app/(app)/wallet/settings/page.tsx)
│   │   │   │       ├── split-bill/
│   │   │   │       │   ├── __tests__/
│   │   │   │       │   │   └── [page.test.tsx](./exhibit/src/app/(app)/wallet/split-bill/__tests__/page.test.tsx)
│   │   │   │       │   └── [page.tsx](./exhibit/src/app/(app)/wallet/split-bill/page.tsx)
│   │   │   │       ├── terms-of-service/
│   │   │   │       │   ├── __tests__/
│   │   │   │       │   │   └── [page.test.tsx](./exhibit/src/app/(app)/wallet/terms-of-service/__tests__/page.test.tsx)
│   │   │   │       │   └── [page.tsx](./exhibit/src/app/(app)/wallet/terms-of-service/page.tsx)
│   │   │   │       ├── transactions/
│   │   │   │       │   ├── __tests__/
│   │   │   │       │   │   └── [page.test.tsx](./exhibit/src/app/(app)/wallet/transactions/__tests__/page.test.tsx)
│   │   │   │       │   └── [page.tsx](./exhibit/src/app/(app)/wallet/transactions/page.tsx)
│   │   │   │       ├── transfer/
│   │   │   │       │   ├── __tests__/
│   │   │   │       │   │   └── [page.test.tsx](./exhibit/src/app/(app)/wallet/transfer/__tests__/page.test.tsx)
│   │   │   │       │   └── [page.tsx](./exhibit/src/app/(app)/wallet/transfer/page.tsx)
│   │   │   │       ├── [layout.tsx](./exhibit/src/app/(app)/wallet/layout.tsx)
│   │   │   │       ├── [loading.tsx](./exhibit/src/app/(app)/wallet/loading.tsx)
│   │   │   │       ├── [page.tsx](./exhibit/src/app/(app)/wallet/page.tsx)
│   │   │   │       └── [template.tsx](./exhibit/src/app/(app)/wallet/template.tsx)
│   │   │   ├── (auth)/
│   │   │   │   ├── forget-password/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./exhibit/src/app/(auth)/forget-password/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./exhibit/src/app/(auth)/forget-password/page.tsx)
│   │   │   │   ├── profile/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./exhibit/src/app/(auth)/profile/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./exhibit/src/app/(auth)/profile/page.tsx)
│   │   │   │   ├── reset-password/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./exhibit/src/app/(auth)/reset-password/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./exhibit/src/app/(auth)/reset-password/page.tsx)
│   │   │   │   ├── sign-in/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./exhibit/src/app/(auth)/sign-in/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./exhibit/src/app/(auth)/sign-in/page.tsx)
│   │   │   │   └── sign-up/
│   │   │   │       ├── __tests__/
│   │   │   │       │   └── [page.test.tsx](./exhibit/src/app/(auth)/sign-up/__tests__/page.test.tsx)
│   │   │   │       └── [page.tsx](./exhibit/src/app/(auth)/sign-up/page.tsx)
│   │   │   ├── (info)/
│   │   │   │   ├── about/
│   │   │   │   │   └── [page.tsx](./exhibit/src/app/(info)/about/page.tsx)
│   │   │   │   ├── downloads/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./exhibit/src/app/(info)/downloads/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./exhibit/src/app/(info)/downloads/page.tsx)
│   │   │   │   └── version/
│   │   │   │       └── [page.tsx](./exhibit/src/app/(info)/version/page.tsx)
│   │   │   ├── __tests__/
│   │   │   │   ├── [about.test.tsx](./exhibit/src/app/__tests__/about.test.tsx)
│   │   │   │   ├── [default.test.tsx](./exhibit/src/app/__tests__/default.test.tsx)
│   │   │   │   ├── [error.test.tsx](./exhibit/src/app/__tests__/error.test.tsx)
│   │   │   │   ├── [forbidden.test.tsx](./exhibit/src/app/__tests__/forbidden.test.tsx)
│   │   │   │   ├── [global-error.test.tsx](./exhibit/src/app/__tests__/global-error.test.tsx)
│   │   │   │   ├── [layout.test.tsx](./exhibit/src/app/__tests__/layout.test.tsx)
│   │   │   │   ├── [loading.test.tsx](./exhibit/src/app/__tests__/loading.test.tsx)
│   │   │   │   ├── [not-found.test.tsx](./exhibit/src/app/__tests__/not-found.test.tsx)
│   │   │   │   ├── [robots.test.ts](./exhibit/src/app/__tests__/robots.test.ts)
│   │   │   │   ├── [template.test.tsx](./exhibit/src/app/__tests__/template.test.tsx)
│   │   │   │   ├── [unauthorized.test.tsx](./exhibit/src/app/__tests__/unauthorized.test.tsx)
│   │   │   │   └── [version.test.tsx](./exhibit/src/app/__tests__/version.test.tsx)
│   │   │   ├── [default.tsx](./exhibit/src/app/default.tsx)
│   │   │   ├── [error.tsx](./exhibit/src/app/error.tsx)
│   │   │   ├── [favicon.ico](./exhibit/src/app/favicon.ico)
│   │   │   ├── [forbidden.tsx](./exhibit/src/app/forbidden.tsx)
│   │   │   ├── [global-error.tsx](./exhibit/src/app/global-error.tsx)
│   │   │   ├── [layout.tsx](./exhibit/src/app/layout.tsx)
│   │   │   ├── [loading.tsx](./exhibit/src/app/loading.tsx)
│   │   │   ├── [not-found.tsx](./exhibit/src/app/not-found.tsx)
│   │   │   ├── [page.tsx](./exhibit/src/app/page.tsx)
│   │   │   ├── [robots.ts](./exhibit/src/app/robots.ts)
│   │   │   ├── [template.tsx](./exhibit/src/app/template.tsx)
│   │   │   └── [unauthorized.tsx](./exhibit/src/app/unauthorized.tsx)
│   │   ├── components/
│   │   │   ├── chat/
│   │   │   │   ├── atoms/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [Avatar.test.tsx](./exhibit/src/components/chat/atoms/__tests__/Avatar.test.tsx)
│   │   │   │   │   │   ├── [Badge.test.tsx](./exhibit/src/components/chat/atoms/__tests__/Badge.test.tsx)
│   │   │   │   │   │   ├── [EmptyState.test.tsx](./exhibit/src/components/chat/atoms/__tests__/EmptyState.test.tsx)
│   │   │   │   │   │   ├── [IconButton.test.tsx](./exhibit/src/components/chat/atoms/__tests__/IconButton.test.tsx)
│   │   │   │   │   │   ├── [StatusDot.test.tsx](./exhibit/src/components/chat/atoms/__tests__/StatusDot.test.tsx)
│   │   │   │   │   │   └── [TypingIndicator.test.tsx](./exhibit/src/components/chat/atoms/__tests__/TypingIndicator.test.tsx)
│   │   │   │   │   ├── [Avatar.tsx](./exhibit/src/components/chat/atoms/Avatar.tsx)
│   │   │   │   │   ├── [Badge.tsx](./exhibit/src/components/chat/atoms/Badge.tsx)
│   │   │   │   │   ├── [EmptyState.tsx](./exhibit/src/components/chat/atoms/EmptyState.tsx)
│   │   │   │   │   ├── [IconButton.tsx](./exhibit/src/components/chat/atoms/IconButton.tsx)
│   │   │   │   │   ├── [StatusDot.tsx](./exhibit/src/components/chat/atoms/StatusDot.tsx)
│   │   │   │   │   ├── [TypingIndicator.tsx](./exhibit/src/components/chat/atoms/TypingIndicator.tsx)
│   │   │   │   │   └── [index.ts](./exhibit/src/components/chat/atoms/index.ts)
│   │   │   │   ├── molecules/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [CallControls.test.tsx](./exhibit/src/components/chat/molecules/__tests__/CallControls.test.tsx)
│   │   │   │   │   │   ├── [ChatHeader.test.tsx](./exhibit/src/components/chat/molecules/__tests__/ChatHeader.test.tsx)
│   │   │   │   │   │   ├── [ChatListItem.test.tsx](./exhibit/src/components/chat/molecules/__tests__/ChatListItem.test.tsx)
│   │   │   │   │   │   ├── [ChatSearchBar.test.tsx](./exhibit/src/components/chat/molecules/__tests__/ChatSearchBar.test.tsx)
│   │   │   │   │   │   ├── [Composer.test.tsx](./exhibit/src/components/chat/molecules/__tests__/Composer.test.tsx)
│   │   │   │   │   │   ├── [ContactRow.test.tsx](./exhibit/src/components/chat/molecules/__tests__/ContactRow.test.tsx)
│   │   │   │   │   │   ├── [DateDivider.test.tsx](./exhibit/src/components/chat/molecules/__tests__/DateDivider.test.tsx)
│   │   │   │   │   │   ├── [EmojiAutocomplete.test.tsx](./exhibit/src/components/chat/molecules/__tests__/EmojiAutocomplete.test.tsx)
│   │   │   │   │   │   ├── [LinkPreviewCard.test.tsx](./exhibit/src/components/chat/molecules/__tests__/LinkPreviewCard.test.tsx)
│   │   │   │   │   │   ├── [MediaComposer.test.tsx](./exhibit/src/components/chat/molecules/__tests__/MediaComposer.test.tsx)
│   │   │   │   │   │   ├── [MessageBubble.test.tsx](./exhibit/src/components/chat/molecules/__tests__/MessageBubble.test.tsx)
│   │   │   │   │   │   ├── [MessageContextMenu.test.tsx](./exhibit/src/components/chat/molecules/__tests__/MessageContextMenu.test.tsx)
│   │   │   │   │   │   ├── [ReactionBar.test.tsx](./exhibit/src/components/chat/molecules/__tests__/ReactionBar.test.tsx)
│   │   │   │   │   │   ├── [ReplyComposer.test.tsx](./exhibit/src/components/chat/molecules/__tests__/ReplyComposer.test.tsx)
│   │   │   │   │   │   ├── [SearchBar.test.tsx](./exhibit/src/components/chat/molecules/__tests__/SearchBar.test.tsx)
│   │   │   │   │   │   ├── [SecretChatBanner.test.tsx](./exhibit/src/components/chat/molecules/__tests__/SecretChatBanner.test.tsx)
│   │   │   │   │   │   ├── [StickerPicker.test.tsx](./exhibit/src/components/chat/molecules/__tests__/StickerPicker.test.tsx)
│   │   │   │   │   │   ├── [ToastViewport.test.tsx](./exhibit/src/components/chat/molecules/__tests__/ToastViewport.test.tsx)
│   │   │   │   │   │   ├── [VerificationCodeModal.test.tsx](./exhibit/src/components/chat/molecules/__tests__/VerificationCodeModal.test.tsx)
│   │   │   │   │   │   └── [VoiceRecorder.test.tsx](./exhibit/src/components/chat/molecules/__tests__/VoiceRecorder.test.tsx)
│   │   │   │   │   ├── [CallControls.tsx](./exhibit/src/components/chat/molecules/CallControls.tsx)
│   │   │   │   │   ├── [ChatHeader.tsx](./exhibit/src/components/chat/molecules/ChatHeader.tsx)
│   │   │   │   │   ├── [ChatListItem.tsx](./exhibit/src/components/chat/molecules/ChatListItem.tsx)
│   │   │   │   │   ├── [ChatSearchBar.tsx](./exhibit/src/components/chat/molecules/ChatSearchBar.tsx)
│   │   │   │   │   ├── [Composer.tsx](./exhibit/src/components/chat/molecules/Composer.tsx)
│   │   │   │   │   ├── [ContactRow.tsx](./exhibit/src/components/chat/molecules/ContactRow.tsx)
│   │   │   │   │   ├── [DateDivider.tsx](./exhibit/src/components/chat/molecules/DateDivider.tsx)
│   │   │   │   │   ├── [EmojiAutocomplete.tsx](./exhibit/src/components/chat/molecules/EmojiAutocomplete.tsx)
│   │   │   │   │   ├── [LinkPreviewCard.tsx](./exhibit/src/components/chat/molecules/LinkPreviewCard.tsx)
│   │   │   │   │   ├── [MediaComposer.tsx](./exhibit/src/components/chat/molecules/MediaComposer.tsx)
│   │   │   │   │   ├── [MessageBubble.tsx](./exhibit/src/components/chat/molecules/MessageBubble.tsx)
│   │   │   │   │   ├── [MessageContextMenu.tsx](./exhibit/src/components/chat/molecules/MessageContextMenu.tsx)
│   │   │   │   │   ├── [ReactionBar.tsx](./exhibit/src/components/chat/molecules/ReactionBar.tsx)
│   │   │   │   │   ├── [ReplyComposer.tsx](./exhibit/src/components/chat/molecules/ReplyComposer.tsx)
│   │   │   │   │   ├── [SearchBar.tsx](./exhibit/src/components/chat/molecules/SearchBar.tsx)
│   │   │   │   │   ├── [SecretChatBanner.tsx](./exhibit/src/components/chat/molecules/SecretChatBanner.tsx)
│   │   │   │   │   ├── [StickerPicker.tsx](./exhibit/src/components/chat/molecules/StickerPicker.tsx)
│   │   │   │   │   ├── [ToastViewport.tsx](./exhibit/src/components/chat/molecules/ToastViewport.tsx)
│   │   │   │   │   ├── [VerificationCodeModal.tsx](./exhibit/src/components/chat/molecules/VerificationCodeModal.tsx)
│   │   │   │   │   ├── [VoiceRecorder.tsx](./exhibit/src/components/chat/molecules/VoiceRecorder.tsx)
│   │   │   │   │   └── [index.ts](./exhibit/src/components/chat/molecules/index.ts)
│   │   │   │   ├── organisms/
│   │   │   │   │   ├── ChatPane/
│   │   │   │   │   │   ├── [MessageList.tsx](./exhibit/src/components/chat/organisms/ChatPane/MessageList.tsx)
│   │   │   │   │   │   └── [useChatPaneHandlers.ts](./exhibit/src/components/chat/organisms/ChatPane/useChatPaneHandlers.ts)
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [BlockedContactsPanel.test.tsx](./exhibit/src/components/chat/organisms/__tests__/BlockedContactsPanel.test.tsx)
│   │   │   │   │   │   ├── [CallHistoryPanel.test.tsx](./exhibit/src/components/chat/organisms/__tests__/CallHistoryPanel.test.tsx)
│   │   │   │   │   │   ├── [CallScreen.test.tsx](./exhibit/src/components/chat/organisms/__tests__/CallScreen.test.tsx)
│   │   │   │   │   │   ├── [ChatPane.test.tsx](./exhibit/src/components/chat/organisms/__tests__/ChatPane.test.tsx)
│   │   │   │   │   │   ├── [ChatSettingsPanel.test.tsx](./exhibit/src/components/chat/organisms/__tests__/ChatSettingsPanel.test.tsx)
│   │   │   │   │   │   ├── [ChatSidebar.test.tsx](./exhibit/src/components/chat/organisms/__tests__/ChatSidebar.test.tsx)
│   │   │   │   │   │   ├── [DeviceSyncPanel.test.tsx](./exhibit/src/components/chat/organisms/__tests__/DeviceSyncPanel.test.tsx)
│   │   │   │   │   │   ├── [DeviceTrustPanel.test.tsx](./exhibit/src/components/chat/organisms/__tests__/DeviceTrustPanel.test.tsx)
│   │   │   │   │   │   ├── [ForwardModal.test.tsx](./exhibit/src/components/chat/organisms/__tests__/ForwardModal.test.tsx)
│   │   │   │   │   │   ├── [GroupAdminPanel.test.tsx](./exhibit/src/components/chat/organisms/__tests__/GroupAdminPanel.test.tsx)
│   │   │   │   │   │   ├── [GroupCallView.test.tsx](./exhibit/src/components/chat/organisms/__tests__/GroupCallView.test.tsx)
│   │   │   │   │   │   ├── [ImageLightbox.test.tsx](./exhibit/src/components/chat/organisms/__tests__/ImageLightbox.test.tsx)
│   │   │   │   │   │   ├── [IncomingCallModal.test.tsx](./exhibit/src/components/chat/organisms/__tests__/IncomingCallModal.test.tsx)
│   │   │   │   │   │   ├── [MediaGallery.test.tsx](./exhibit/src/components/chat/organisms/__tests__/MediaGallery.test.tsx)
│   │   │   │   │   │   ├── [NewChatModal.test.tsx](./exhibit/src/components/chat/organisms/__tests__/NewChatModal.test.tsx)
│   │   │   │   │   │   ├── [PairingModal.test.tsx](./exhibit/src/components/chat/organisms/__tests__/PairingModal.test.tsx)
│   │   │   │   │   │   ├── [PinLockScreen.test.tsx](./exhibit/src/components/chat/organisms/__tests__/PinLockScreen.test.tsx)
│   │   │   │   │   │   └── [PrivacySettingsPanel.test.tsx](./exhibit/src/components/chat/organisms/__tests__/PrivacySettingsPanel.test.tsx)
│   │   │   │   │   ├── [BlockedContactsPanel.tsx](./exhibit/src/components/chat/organisms/BlockedContactsPanel.tsx)
│   │   │   │   │   ├── [CallHistoryPanel.tsx](./exhibit/src/components/chat/organisms/CallHistoryPanel.tsx)
│   │   │   │   │   ├── [CallScreen.tsx](./exhibit/src/components/chat/organisms/CallScreen.tsx)
│   │   │   │   │   ├── [ChatPane.tsx](./exhibit/src/components/chat/organisms/ChatPane.tsx)
│   │   │   │   │   ├── [ChatSettingsPanel.tsx](./exhibit/src/components/chat/organisms/ChatSettingsPanel.tsx)
│   │   │   │   │   ├── [ChatSidebar.tsx](./exhibit/src/components/chat/organisms/ChatSidebar.tsx)
│   │   │   │   │   ├── [DeviceSyncPanel.tsx](./exhibit/src/components/chat/organisms/DeviceSyncPanel.tsx)
│   │   │   │   │   ├── [DeviceTrustPanel.tsx](./exhibit/src/components/chat/organisms/DeviceTrustPanel.tsx)
│   │   │   │   │   ├── [ForwardModal.tsx](./exhibit/src/components/chat/organisms/ForwardModal.tsx)
│   │   │   │   │   ├── [GroupAdminPanel.tsx](./exhibit/src/components/chat/organisms/GroupAdminPanel.tsx)
│   │   │   │   │   ├── [GroupCallView.tsx](./exhibit/src/components/chat/organisms/GroupCallView.tsx)
│   │   │   │   │   ├── [Header.tsx](./exhibit/src/components/chat/organisms/Header.tsx)
│   │   │   │   │   ├── [ImageLightbox.tsx](./exhibit/src/components/chat/organisms/ImageLightbox.tsx)
│   │   │   │   │   ├── [IncomingCallModal.tsx](./exhibit/src/components/chat/organisms/IncomingCallModal.tsx)
│   │   │   │   │   ├── [MediaGallery.tsx](./exhibit/src/components/chat/organisms/MediaGallery.tsx)
│   │   │   │   │   ├── [NewChatModal.tsx](./exhibit/src/components/chat/organisms/NewChatModal.tsx)
│   │   │   │   │   ├── [PairingModal.tsx](./exhibit/src/components/chat/organisms/PairingModal.tsx)
│   │   │   │   │   ├── [PinLockScreen.tsx](./exhibit/src/components/chat/organisms/PinLockScreen.tsx)
│   │   │   │   │   └── [PrivacySettingsPanel.tsx](./exhibit/src/components/chat/organisms/PrivacySettingsPanel.tsx)
│   │   │   │   ├── templates/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [AboutTemplate.test.tsx](./exhibit/src/components/chat/templates/__tests__/AboutTemplate.test.tsx)
│   │   │   │   │   │   ├── [AppShell.test.tsx](./exhibit/src/components/chat/templates/__tests__/AppShell.test.tsx)
│   │   │   │   │   │   ├── [DownloadsTemplate.test.tsx](./exhibit/src/components/chat/templates/__tests__/DownloadsTemplate.test.tsx)
│   │   │   │   │   │   ├── [ErrorTemplate.test.tsx](./exhibit/src/components/chat/templates/__tests__/ErrorTemplate.test.tsx)
│   │   │   │   │   │   └── [VersionTemplate.test.tsx](./exhibit/src/components/chat/templates/__tests__/VersionTemplate.test.tsx)
│   │   │   │   │   ├── [AboutTemplate.tsx](./exhibit/src/components/chat/templates/AboutTemplate.tsx)
│   │   │   │   │   ├── [AppShell.tsx](./exhibit/src/components/chat/templates/AppShell.tsx)
│   │   │   │   │   ├── [DownloadsTemplate.tsx](./exhibit/src/components/chat/templates/DownloadsTemplate.tsx)
│   │   │   │   │   ├── [ErrorTemplate.tsx](./exhibit/src/components/chat/templates/ErrorTemplate.tsx)
│   │   │   │   │   ├── [VersionTemplate.tsx](./exhibit/src/components/chat/templates/VersionTemplate.tsx)
│   │   │   │   │   └── [index.ts](./exhibit/src/components/chat/templates/index.ts)
│   │   │   │   └── [index.ts](./exhibit/src/components/chat/index.ts)
│   │   │   ├── menu/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [CustomerMenu.test.tsx](./exhibit/src/components/menu/__tests__/CustomerMenu.test.tsx)
│   │   │   │   ├── [CustomerMenu.tsx](./exhibit/src/components/menu/CustomerMenu.tsx)
│   │   │   │   ├── [Header.tsx](./exhibit/src/components/menu/Header.tsx)
│   │   │   │   ├── [MenuManager.tsx](./exhibit/src/components/menu/MenuManager.tsx)
│   │   │   │   ├── [QrShare.tsx](./exhibit/src/components/menu/QrShare.tsx)
│   │   │   │   ├── [RestaurantDashboard.tsx](./exhibit/src/components/menu/RestaurantDashboard.tsx)
│   │   │   │   ├── [RestaurantManager.tsx](./exhibit/src/components/menu/RestaurantManager.tsx)
│   │   │   │   ├── [index.ts](./exhibit/src/components/menu/index.ts)
│   │   │   │   └── [types.ts](./exhibit/src/components/menu/types.ts)
│   │   │   ├── molecules/
│   │   │   │   └── __tests__/
│   │   │   ├── password/
│   │   │   │   ├── molecules/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [AccessLogCard.test.tsx](./exhibit/src/components/password/molecules/__tests__/AccessLogCard.test.tsx)
│   │   │   │   │   │   └── [ShareItemModal.test.tsx](./exhibit/src/components/password/molecules/__tests__/ShareItemModal.test.tsx)
│   │   │   │   │   ├── [AccessLogCard.tsx](./exhibit/src/components/password/molecules/AccessLogCard.tsx)
│   │   │   │   │   ├── [ConfirmDialog.tsx](./exhibit/src/components/password/molecules/ConfirmDialog.tsx)
│   │   │   │   │   ├── [HealthWidgets.tsx](./exhibit/src/components/password/molecules/HealthWidgets.tsx)
│   │   │   │   │   ├── [ShareItemModal.tsx](./exhibit/src/components/password/molecules/ShareItemModal.tsx)
│   │   │   │   │   ├── [VaultItemForm.tsx](./exhibit/src/components/password/molecules/VaultItemForm.tsx)
│   │   │   │   │   └── [index.ts](./exhibit/src/components/password/molecules/index.ts)
│   │   │   │   ├── organisms/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [EmergencyAccessCard.test.tsx](./exhibit/src/components/password/organisms/__tests__/EmergencyAccessCard.test.tsx)
│   │   │   │   │   │   ├── [FolderManager.test.tsx](./exhibit/src/components/password/organisms/__tests__/FolderManager.test.tsx)
│   │   │   │   │   │   ├── [LockScreen.test.tsx](./exhibit/src/components/password/organisms/__tests__/LockScreen.test.tsx)
│   │   │   │   │   │   ├── [RecentlyUsed.test.tsx](./exhibit/src/components/password/organisms/__tests__/RecentlyUsed.test.tsx)
│   │   │   │   │   │   ├── [ToastContainer.test.tsx](./exhibit/src/components/password/organisms/__tests__/ToastContainer.test.tsx)
│   │   │   │   │   │   ├── [TotpDisplay.test.tsx](./exhibit/src/components/password/organisms/__tests__/TotpDisplay.test.tsx)
│   │   │   │   │   │   └── [TransferCard.test.tsx](./exhibit/src/components/password/organisms/__tests__/TransferCard.test.tsx)
│   │   │   │   │   ├── [EmergencyAccessCard.tsx](./exhibit/src/components/password/organisms/EmergencyAccessCard.tsx)
│   │   │   │   │   ├── [FolderManager.tsx](./exhibit/src/components/password/organisms/FolderManager.tsx)
│   │   │   │   │   ├── [LockScreen.tsx](./exhibit/src/components/password/organisms/LockScreen.tsx)
│   │   │   │   │   ├── [MasterPasswordCard.tsx](./exhibit/src/components/password/organisms/MasterPasswordCard.tsx)
│   │   │   │   │   ├── [RecentlyUsed.tsx](./exhibit/src/components/password/organisms/RecentlyUsed.tsx)
│   │   │   │   │   ├── [SecuritySettingsCard.tsx](./exhibit/src/components/password/organisms/SecuritySettingsCard.tsx)
│   │   │   │   │   ├── [ToastContainer.tsx](./exhibit/src/components/password/organisms/ToastContainer.tsx)
│   │   │   │   │   ├── [TotpDisplay.tsx](./exhibit/src/components/password/organisms/TotpDisplay.tsx)
│   │   │   │   │   ├── [TransferCard.tsx](./exhibit/src/components/password/organisms/TransferCard.tsx)
│   │   │   │   │   ├── [VaultItemCard.tsx](./exhibit/src/components/password/organisms/VaultItemCard.tsx)
│   │   │   │   │   ├── [VaultToolbar.tsx](./exhibit/src/components/password/organisms/VaultToolbar.tsx)
│   │   │   │   │   └── [index.ts](./exhibit/src/components/password/organisms/index.ts)
│   │   │   │   └── [index.ts](./exhibit/src/components/password/index.ts)
│   │   │   ├── pos/
│   │   │   │   ├── atoms/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [EmptyState.test.tsx](./exhibit/src/components/pos/atoms/__tests__/EmptyState.test.tsx)
│   │   │   │   │   │   ├── [IconButton.test.tsx](./exhibit/src/components/pos/atoms/__tests__/IconButton.test.tsx)
│   │   │   │   │   │   ├── [Money.test.tsx](./exhibit/src/components/pos/atoms/__tests__/Money.test.tsx)
│   │   │   │   │   │   ├── [StatusBadge.test.tsx](./exhibit/src/components/pos/atoms/__tests__/StatusBadge.test.tsx)
│   │   │   │   │   │   └── [SuccessMark.test.tsx](./exhibit/src/components/pos/atoms/__tests__/SuccessMark.test.tsx)
│   │   │   │   │   ├── [EmptyState.tsx](./exhibit/src/components/pos/atoms/EmptyState.tsx)
│   │   │   │   │   ├── [IconButton.tsx](./exhibit/src/components/pos/atoms/IconButton.tsx)
│   │   │   │   │   ├── [Money.tsx](./exhibit/src/components/pos/atoms/Money.tsx)
│   │   │   │   │   ├── [StatusBadge.tsx](./exhibit/src/components/pos/atoms/StatusBadge.tsx)
│   │   │   │   │   ├── [SuccessMark.tsx](./exhibit/src/components/pos/atoms/SuccessMark.tsx)
│   │   │   │   │   └── [index.ts](./exhibit/src/components/pos/atoms/index.ts)
│   │   │   │   ├── molecules/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [CodeApplyField.test.tsx](./exhibit/src/components/pos/molecules/__tests__/CodeApplyField.test.tsx)
│   │   │   │   │   │   ├── [FilterTabs.test.tsx](./exhibit/src/components/pos/molecules/__tests__/FilterTabs.test.tsx)
│   │   │   │   │   │   ├── [LineItemRow.test.tsx](./exhibit/src/components/pos/molecules/__tests__/LineItemRow.test.tsx)
│   │   │   │   │   │   ├── [MoneyRow.test.tsx](./exhibit/src/components/pos/molecules/__tests__/MoneyRow.test.tsx)
│   │   │   │   │   │   ├── [PanelHeader.test.tsx](./exhibit/src/components/pos/molecules/__tests__/PanelHeader.test.tsx)
│   │   │   │   │   │   ├── [PaymentBreakdown.test.tsx](./exhibit/src/components/pos/molecules/__tests__/PaymentBreakdown.test.tsx)
│   │   │   │   │   │   ├── [SearchField.test.tsx](./exhibit/src/components/pos/molecules/__tests__/SearchField.test.tsx)
│   │   │   │   │   │   ├── [TransactionDetail.test.tsx](./exhibit/src/components/pos/molecules/__tests__/TransactionDetail.test.tsx)
│   │   │   │   │   │   ├── [ViewToolbar.test.tsx](./exhibit/src/components/pos/molecules/__tests__/ViewToolbar.test.tsx)
│   │   │   │   │   │   └── [reportPieces.test.tsx](./exhibit/src/components/pos/molecules/__tests__/reportPieces.test.tsx)
│   │   │   │   │   ├── [AdjustmentList.tsx](./exhibit/src/components/pos/molecules/AdjustmentList.tsx)
│   │   │   │   │   ├── [CodeApplyField.tsx](./exhibit/src/components/pos/molecules/CodeApplyField.tsx)
│   │   │   │   │   ├── [FilterTabs.tsx](./exhibit/src/components/pos/molecules/FilterTabs.tsx)
│   │   │   │   │   ├── [FormCard.tsx](./exhibit/src/components/pos/molecules/FormCard.tsx)
│   │   │   │   │   ├── [LineItemRow.tsx](./exhibit/src/components/pos/molecules/LineItemRow.tsx)
│   │   │   │   │   ├── [MoneyRow.tsx](./exhibit/src/components/pos/molecules/MoneyRow.tsx)
│   │   │   │   │   ├── [PanelHeader.tsx](./exhibit/src/components/pos/molecules/PanelHeader.tsx)
│   │   │   │   │   ├── [PaymentBreakdown.tsx](./exhibit/src/components/pos/molecules/PaymentBreakdown.tsx)
│   │   │   │   │   ├── [SearchField.tsx](./exhibit/src/components/pos/molecules/SearchField.tsx)
│   │   │   │   │   ├── [StatBlock.tsx](./exhibit/src/components/pos/molecules/StatBlock.tsx)
│   │   │   │   │   ├── [TopItemsList.tsx](./exhibit/src/components/pos/molecules/TopItemsList.tsx)
│   │   │   │   │   ├── [TransactionDetail.tsx](./exhibit/src/components/pos/molecules/TransactionDetail.tsx)
│   │   │   │   │   ├── [TransactionTotals.tsx](./exhibit/src/components/pos/molecules/TransactionTotals.tsx)
│   │   │   │   │   ├── [ViewToolbar.tsx](./exhibit/src/components/pos/molecules/ViewToolbar.tsx)
│   │   │   │   │   └── [index.ts](./exhibit/src/components/pos/molecules/index.ts)
│   │   │   │   ├── organisms/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [Cart.test.tsx](./exhibit/src/components/pos/organisms/__tests__/Cart.test.tsx)
│   │   │   │   │   │   ├── [Checkout.test.tsx](./exhibit/src/components/pos/organisms/__tests__/Checkout.test.tsx)
│   │   │   │   │   │   ├── [DailySummary.test.tsx](./exhibit/src/components/pos/organisms/__tests__/DailySummary.test.tsx)
│   │   │   │   │   │   ├── [DigitalReceipt.test.tsx](./exhibit/src/components/pos/organisms/__tests__/DigitalReceipt.test.tsx)
│   │   │   │   │   │   ├── [DiscountManager.test.tsx](./exhibit/src/components/pos/organisms/__tests__/DiscountManager.test.tsx)
│   │   │   │   │   │   ├── [GiftCardManager.test.tsx](./exhibit/src/components/pos/organisms/__tests__/GiftCardManager.test.tsx)
│   │   │   │   │   │   ├── [InventoryManager.test.tsx](./exhibit/src/components/pos/organisms/__tests__/InventoryManager.test.tsx)
│   │   │   │   │   │   ├── [ItemCatalog.test.tsx](./exhibit/src/components/pos/organisms/__tests__/ItemCatalog.test.tsx)
│   │   │   │   │   │   ├── [PaymentPanel.test.tsx](./exhibit/src/components/pos/organisms/__tests__/PaymentPanel.test.tsx)
│   │   │   │   │   │   ├── [Receipt.test.tsx](./exhibit/src/components/pos/organisms/__tests__/Receipt.test.tsx)
│   │   │   │   │   │   ├── [ReportingDashboard.test.tsx](./exhibit/src/components/pos/organisms/__tests__/ReportingDashboard.test.tsx)
│   │   │   │   │   │   ├── [ShiftManager.test.tsx](./exhibit/src/components/pos/organisms/__tests__/ShiftManager.test.tsx)
│   │   │   │   │   │   ├── [TaxConfigPanel.test.tsx](./exhibit/src/components/pos/organisms/__tests__/TaxConfigPanel.test.tsx)
│   │   │   │   │   │   ├── [TransactionHistory.test.tsx](./exhibit/src/components/pos/organisms/__tests__/TransactionHistory.test.tsx)
│   │   │   │   │   │   └── [UserManager.test.tsx](./exhibit/src/components/pos/organisms/__tests__/UserManager.test.tsx)
│   │   │   │   │   ├── [Cart.tsx](./exhibit/src/components/pos/organisms/Cart.tsx)
│   │   │   │   │   ├── [Checkout.tsx](./exhibit/src/components/pos/organisms/Checkout.tsx)
│   │   │   │   │   ├── [DailySummary.tsx](./exhibit/src/components/pos/organisms/DailySummary.tsx)
│   │   │   │   │   ├── [DigitalReceipt.tsx](./exhibit/src/components/pos/organisms/DigitalReceipt.tsx)
│   │   │   │   │   ├── [DiscountManager.tsx](./exhibit/src/components/pos/organisms/DiscountManager.tsx)
│   │   │   │   │   ├── [GiftCardManager.tsx](./exhibit/src/components/pos/organisms/GiftCardManager.tsx)
│   │   │   │   │   ├── [InventoryManager.tsx](./exhibit/src/components/pos/organisms/InventoryManager.tsx)
│   │   │   │   │   ├── [ItemCatalog.tsx](./exhibit/src/components/pos/organisms/ItemCatalog.tsx)
│   │   │   │   │   ├── [PaymentPanel.tsx](./exhibit/src/components/pos/organisms/PaymentPanel.tsx)
│   │   │   │   │   ├── [Receipt.tsx](./exhibit/src/components/pos/organisms/Receipt.tsx)
│   │   │   │   │   ├── [ReportingDashboard.tsx](./exhibit/src/components/pos/organisms/ReportingDashboard.tsx)
│   │   │   │   │   ├── [ShiftManager.tsx](./exhibit/src/components/pos/organisms/ShiftManager.tsx)
│   │   │   │   │   ├── [TaxConfigPanel.tsx](./exhibit/src/components/pos/organisms/TaxConfigPanel.tsx)
│   │   │   │   │   ├── [TransactionHistory.tsx](./exhibit/src/components/pos/organisms/TransactionHistory.tsx)
│   │   │   │   │   ├── [UserManager.tsx](./exhibit/src/components/pos/organisms/UserManager.tsx)
│   │   │   │   │   └── [index.ts](./exhibit/src/components/pos/organisms/index.ts)
│   │   │   │   ├── templates/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [PosTemplate.test.tsx](./exhibit/src/components/pos/templates/__tests__/PosTemplate.test.tsx)
│   │   │   │   │   ├── [PosTemplate.tsx](./exhibit/src/components/pos/templates/PosTemplate.tsx)
│   │   │   │   │   ├── [index.ts](./exhibit/src/components/pos/templates/index.ts)
│   │   │   │   │   └── [usePosState.ts](./exhibit/src/components/pos/templates/usePosState.ts)
│   │   │   │   ├── [UserManager.tsx](./exhibit/src/components/pos/UserManager.tsx)
│   │   │   │   ├── [index.ts](./exhibit/src/components/pos/index.ts)
│   │   │   │   └── [types.ts](./exhibit/src/components/pos/types.ts)
│   │   │   ├── shared/
│   │   │   │   ├── organisms/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [Header.test.tsx](./exhibit/src/components/shared/organisms/__tests__/Header.test.tsx)
│   │   │   │   │   └── [Header.tsx](./exhibit/src/components/shared/organisms/Header.tsx)
│   │   │   │   └── templates/
│   │   │   │       ├── __tests__/
│   │   │   │       │   ├── [AboutTemplate.test.tsx](./exhibit/src/components/shared/templates/__tests__/AboutTemplate.test.tsx)
│   │   │   │       │   ├── [DownloadsTemplate.test.tsx](./exhibit/src/components/shared/templates/__tests__/DownloadsTemplate.test.tsx)
│   │   │   │       │   ├── [ErrorTemplate.test.tsx](./exhibit/src/components/shared/templates/__tests__/ErrorTemplate.test.tsx)
│   │   │   │       │   └── [VersionTemplate.test.tsx](./exhibit/src/components/shared/templates/__tests__/VersionTemplate.test.tsx)
│   │   │   │       ├── [AboutTemplate.tsx](./exhibit/src/components/shared/templates/AboutTemplate.tsx)
│   │   │   │       ├── [DownloadsTemplate.tsx](./exhibit/src/components/shared/templates/DownloadsTemplate.tsx)
│   │   │   │       ├── [ErrorTemplate.tsx](./exhibit/src/components/shared/templates/ErrorTemplate.tsx)
│   │   │   │       └── [VersionTemplate.tsx](./exhibit/src/components/shared/templates/VersionTemplate.tsx)
│   │   │   ├── video/
│   │   │   │   ├── atoms/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [VideoFileUpload.test.tsx](./exhibit/src/components/video/atoms/__tests__/VideoFileUpload.test.tsx)
│   │   │   │   │   ├── [VideoFileUpload.tsx](./exhibit/src/components/video/atoms/VideoFileUpload.tsx)
│   │   │   │   │   └── [index.ts](./exhibit/src/components/video/atoms/index.ts)
│   │   │   │   ├── molecules/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [AudioTranscribeTool.test.tsx](./exhibit/src/components/video/molecules/__tests__/AudioTranscribeTool.test.tsx)
│   │   │   │   │   │   ├── [GenerateSubtitleTool.test.tsx](./exhibit/src/components/video/molecules/__tests__/GenerateSubtitleTool.test.tsx)
│   │   │   │   │   │   ├── [VideoCompressTool.test.tsx](./exhibit/src/components/video/molecules/__tests__/VideoCompressTool.test.tsx)
│   │   │   │   │   │   ├── [VideoConvertTool.test.tsx](./exhibit/src/components/video/molecules/__tests__/VideoConvertTool.test.tsx)
│   │   │   │   │   │   ├── [VideoCropTool.test.tsx](./exhibit/src/components/video/molecules/__tests__/VideoCropTool.test.tsx)
│   │   │   │   │   │   ├── [VideoDownloadTool.test.tsx](./exhibit/src/components/video/molecules/__tests__/VideoDownloadTool.test.tsx)
│   │   │   │   │   │   ├── [VideoExtractAudioTool.test.tsx](./exhibit/src/components/video/molecules/__tests__/VideoExtractAudioTool.test.tsx)
│   │   │   │   │   │   ├── [VideoExtractFramesTool.test.tsx](./exhibit/src/components/video/molecules/__tests__/VideoExtractFramesTool.test.tsx)
│   │   │   │   │   │   ├── [VideoMergeTool.test.tsx](./exhibit/src/components/video/molecules/__tests__/VideoMergeTool.test.tsx)
│   │   │   │   │   │   ├── [VideoMuteTool.test.tsx](./exhibit/src/components/video/molecules/__tests__/VideoMuteTool.test.tsx)
│   │   │   │   │   │   ├── [VideoResizeTool.test.tsx](./exhibit/src/components/video/molecules/__tests__/VideoResizeTool.test.tsx)
│   │   │   │   │   │   ├── [VideoSpeedTool.test.tsx](./exhibit/src/components/video/molecules/__tests__/VideoSpeedTool.test.tsx)
│   │   │   │   │   │   ├── [VideoStabilizeTool.test.tsx](./exhibit/src/components/video/molecules/__tests__/VideoStabilizeTool.test.tsx)
│   │   │   │   │   │   └── [VideoTrimTool.test.tsx](./exhibit/src/components/video/molecules/__tests__/VideoTrimTool.test.tsx)
│   │   │   │   │   ├── [AudioTranscribeTool.tsx](./exhibit/src/components/video/molecules/AudioTranscribeTool.tsx)
│   │   │   │   │   ├── [GenerateSubtitleTool.tsx](./exhibit/src/components/video/molecules/GenerateSubtitleTool.tsx)
│   │   │   │   │   ├── [VideoCompressTool.tsx](./exhibit/src/components/video/molecules/VideoCompressTool.tsx)
│   │   │   │   │   ├── [VideoConvertTool.tsx](./exhibit/src/components/video/molecules/VideoConvertTool.tsx)
│   │   │   │   │   ├── [VideoCropTool.tsx](./exhibit/src/components/video/molecules/VideoCropTool.tsx)
│   │   │   │   │   ├── [VideoDownloadTool.tsx](./exhibit/src/components/video/molecules/VideoDownloadTool.tsx)
│   │   │   │   │   ├── [VideoExtractAudioTool.tsx](./exhibit/src/components/video/molecules/VideoExtractAudioTool.tsx)
│   │   │   │   │   ├── [VideoExtractFramesTool.tsx](./exhibit/src/components/video/molecules/VideoExtractFramesTool.tsx)
│   │   │   │   │   ├── [VideoMergeTool.tsx](./exhibit/src/components/video/molecules/VideoMergeTool.tsx)
│   │   │   │   │   ├── [VideoMuteTool.tsx](./exhibit/src/components/video/molecules/VideoMuteTool.tsx)
│   │   │   │   │   ├── [VideoResizeTool.tsx](./exhibit/src/components/video/molecules/VideoResizeTool.tsx)
│   │   │   │   │   ├── [VideoSpeedTool.tsx](./exhibit/src/components/video/molecules/VideoSpeedTool.tsx)
│   │   │   │   │   ├── [VideoStabilizeTool.tsx](./exhibit/src/components/video/molecules/VideoStabilizeTool.tsx)
│   │   │   │   │   ├── [VideoTrimTool.tsx](./exhibit/src/components/video/molecules/VideoTrimTool.tsx)
│   │   │   │   │   └── [index.ts](./exhibit/src/components/video/molecules/index.ts)
│   │   │   │   ├── templates/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [VideoToolsPage.test.tsx](./exhibit/src/components/video/templates/__tests__/VideoToolsPage.test.tsx)
│   │   │   │   │   ├── [VideoToolsPage.tsx](./exhibit/src/components/video/templates/VideoToolsPage.tsx)
│   │   │   │   │   └── [index.ts](./exhibit/src/components/video/templates/index.ts)
│   │   │   │   └── [index.ts](./exhibit/src/components/video/index.ts)
│   │   │   └── wallet/
│   │   │       ├── __tests__/
│   │   │       │   └── [RouteGuard.test.tsx](./exhibit/src/components/wallet/__tests__/RouteGuard.test.tsx)
│   │   │       ├── atoms/
│   │   │       │   ├── __tests__/
│   │   │       │   │   ├── [AccountCard.test.tsx](./exhibit/src/components/wallet/atoms/__tests__/AccountCard.test.tsx)
│   │   │       │   │   ├── [AccountDetail.test.tsx](./exhibit/src/components/wallet/atoms/__tests__/AccountDetail.test.tsx)
│   │   │       │   │   ├── [BalanceCard.test.tsx](./exhibit/src/components/wallet/atoms/__tests__/BalanceCard.test.tsx)
│   │   │       │   │   ├── [BillItem.test.tsx](./exhibit/src/components/wallet/atoms/__tests__/BillItem.test.tsx)
│   │   │       │   │   ├── [BudgetCategoryCard.test.tsx](./exhibit/src/components/wallet/atoms/__tests__/BudgetCategoryCard.test.tsx)
│   │   │       │   │   ├── [CardActions.test.tsx](./exhibit/src/components/wallet/atoms/__tests__/CardActions.test.tsx)
│   │   │       │   │   ├── [CardDetail.test.tsx](./exhibit/src/components/wallet/atoms/__tests__/CardDetail.test.tsx)
│   │   │       │   │   ├── [CardItem.test.tsx](./exhibit/src/components/wallet/atoms/__tests__/CardItem.test.tsx)
│   │   │       │   │   ├── [CardSpending.branches.test.tsx](./exhibit/src/components/wallet/atoms/__tests__/CardSpending.branches.test.tsx)
│   │   │       │   │   ├── [CardSpending.test.tsx](./exhibit/src/components/wallet/atoms/__tests__/CardSpending.test.tsx)
│   │   │       │   │   ├── [NotificationItem.test.tsx](./exhibit/src/components/wallet/atoms/__tests__/NotificationItem.test.tsx)
│   │   │       │   │   ├── [RateItem.test.tsx](./exhibit/src/components/wallet/atoms/__tests__/RateItem.test.tsx)
│   │   │       │   │   ├── [Skeleton.test.tsx](./exhibit/src/components/wallet/atoms/__tests__/Skeleton.test.tsx)
│   │   │       │   │   ├── [SpendingChart.test.tsx](./exhibit/src/components/wallet/atoms/__tests__/SpendingChart.test.tsx)
│   │   │       │   │   ├── [SwipeableTransactionItem.test.tsx](./exhibit/src/components/wallet/atoms/__tests__/SwipeableTransactionItem.test.tsx)
│   │   │       │   │   ├── [TransactionItem.test.tsx](./exhibit/src/components/wallet/atoms/__tests__/TransactionItem.test.tsx)
│   │   │       │   │   └── [UserCard.test.tsx](./exhibit/src/components/wallet/atoms/__tests__/UserCard.test.tsx)
│   │   │       │   ├── [AccountCard.tsx](./exhibit/src/components/wallet/atoms/AccountCard.tsx)
│   │   │       │   ├── [AccountDetail.tsx](./exhibit/src/components/wallet/atoms/AccountDetail.tsx)
│   │   │       │   ├── [BalanceCard.tsx](./exhibit/src/components/wallet/atoms/BalanceCard.tsx)
│   │   │       │   ├── [BillItem.tsx](./exhibit/src/components/wallet/atoms/BillItem.tsx)
│   │   │       │   ├── [BudgetCategoryCard.tsx](./exhibit/src/components/wallet/atoms/BudgetCategoryCard.tsx)
│   │   │       │   ├── [CardActions.tsx](./exhibit/src/components/wallet/atoms/CardActions.tsx)
│   │   │       │   ├── [CardDetail.tsx](./exhibit/src/components/wallet/atoms/CardDetail.tsx)
│   │   │       │   ├── [CardItem.tsx](./exhibit/src/components/wallet/atoms/CardItem.tsx)
│   │   │       │   ├── [CardSpending.tsx](./exhibit/src/components/wallet/atoms/CardSpending.tsx)
│   │   │       │   ├── [NotificationItem.tsx](./exhibit/src/components/wallet/atoms/NotificationItem.tsx)
│   │   │       │   ├── [RateItem.tsx](./exhibit/src/components/wallet/atoms/RateItem.tsx)
│   │   │       │   ├── [Skeleton.tsx](./exhibit/src/components/wallet/atoms/Skeleton.tsx)
│   │   │       │   ├── [SpendingChart.tsx](./exhibit/src/components/wallet/atoms/SpendingChart.tsx)
│   │   │       │   ├── [SwipeableTransactionItem.tsx](./exhibit/src/components/wallet/atoms/SwipeableTransactionItem.tsx)
│   │   │       │   ├── [TransactionItem.tsx](./exhibit/src/components/wallet/atoms/TransactionItem.tsx)
│   │   │       │   ├── [UserCard.tsx](./exhibit/src/components/wallet/atoms/UserCard.tsx)
│   │   │       │   └── [index.ts](./exhibit/src/components/wallet/atoms/index.ts)
│   │   │       ├── molecules/
│   │   │       │   ├── __tests__/
│   │   │       │   │   ├── [BudgetSummary.test.tsx](./exhibit/src/components/wallet/molecules/__tests__/BudgetSummary.test.tsx)
│   │   │       │   │   ├── [CurrencyConverter.test.tsx](./exhibit/src/components/wallet/molecules/__tests__/CurrencyConverter.test.tsx)
│   │   │       │   │   ├── [QRCodeActions.test.tsx](./exhibit/src/components/wallet/molecules/__tests__/QRCodeActions.test.tsx)
│   │   │       │   │   ├── [QRCodeModal.test.tsx](./exhibit/src/components/wallet/molecules/__tests__/QRCodeModal.test.tsx)
│   │   │       │   │   ├── [QuickActions.test.tsx](./exhibit/src/components/wallet/molecules/__tests__/QuickActions.test.tsx)
│   │   │       │   │   ├── [QuickPayForm.test.tsx](./exhibit/src/components/wallet/molecules/__tests__/QuickPayForm.test.tsx)
│   │   │       │   │   ├── [RateList.test.tsx](./exhibit/src/components/wallet/molecules/__tests__/RateList.test.tsx)
│   │   │       │   │   ├── [TransactionFilters.test.tsx](./exhibit/src/components/wallet/molecules/__tests__/TransactionFilters.test.tsx)
│   │   │       │   │   ├── [TransferConfirmation.test.tsx](./exhibit/src/components/wallet/molecules/__tests__/TransferConfirmation.test.tsx)
│   │   │       │   │   └── [TransferForm.test.tsx](./exhibit/src/components/wallet/molecules/__tests__/TransferForm.test.tsx)
│   │   │       │   ├── [AddAccountModal.tsx](./exhibit/src/components/wallet/molecules/AddAccountModal.tsx)
│   │   │       │   ├── [AddBillModal.tsx](./exhibit/src/components/wallet/molecules/AddBillModal.tsx)
│   │   │       │   ├── [BudgetSummary.tsx](./exhibit/src/components/wallet/molecules/BudgetSummary.tsx)
│   │   │       │   ├── [ContactList.tsx](./exhibit/src/components/wallet/molecules/ContactList.tsx)
│   │   │       │   ├── [CurrencyAlerts.tsx](./exhibit/src/components/wallet/molecules/CurrencyAlerts.tsx)
│   │   │       │   ├── [CurrencyConverter.tsx](./exhibit/src/components/wallet/molecules/CurrencyConverter.tsx)
│   │   │       │   ├── [QRCodeActions.tsx](./exhibit/src/components/wallet/molecules/QRCodeActions.tsx)
│   │   │       │   ├── [QRCodeModal.tsx](./exhibit/src/components/wallet/molecules/QRCodeModal.tsx)
│   │   │       │   ├── [QuickActions.tsx](./exhibit/src/components/wallet/molecules/QuickActions.tsx)
│   │   │       │   ├── [QuickPayForm.tsx](./exhibit/src/components/wallet/molecules/QuickPayForm.tsx)
│   │   │       │   ├── [RateList.tsx](./exhibit/src/components/wallet/molecules/RateList.tsx)
│   │   │       │   ├── [SplitBill.tsx](./exhibit/src/components/wallet/molecules/SplitBill.tsx)
│   │   │       │   ├── [TransactionFilters.tsx](./exhibit/src/components/wallet/molecules/TransactionFilters.tsx)
│   │   │       │   ├── [TransferConfirmation.tsx](./exhibit/src/components/wallet/molecules/TransferConfirmation.tsx)
│   │   │       │   ├── [TransferForm.tsx](./exhibit/src/components/wallet/molecules/TransferForm.tsx)
│   │   │       │   └── [index.ts](./exhibit/src/components/wallet/molecules/index.ts)
│   │   │       ├── organisms/
│   │   │       │   ├── __tests__/
│   │   │       │   │   ├── [BottomNav.test.tsx](./exhibit/src/components/wallet/organisms/__tests__/BottomNav.test.tsx)
│   │   │       │   │   ├── [SettingsSection.test.tsx](./exhibit/src/components/wallet/organisms/__tests__/SettingsSection.test.tsx)
│   │   │       │   │   └── [Sidebar.test.tsx](./exhibit/src/components/wallet/organisms/__tests__/Sidebar.test.tsx)
│   │   │       │   ├── [BottomNav.tsx](./exhibit/src/components/wallet/organisms/BottomNav.tsx)
│   │   │       │   ├── [SettingsSection.tsx](./exhibit/src/components/wallet/organisms/SettingsSection.tsx)
│   │   │       │   ├── [Sidebar.tsx](./exhibit/src/components/wallet/organisms/Sidebar.tsx)
│   │   │       │   └── [index.ts](./exhibit/src/components/wallet/organisms/index.ts)
│   │   │       ├── templates/
│   │   │       │   ├── __tests__/
│   │   │       │   │   └── [DashboardTemplate.test.tsx](./exhibit/src/components/wallet/templates/__tests__/DashboardTemplate.test.tsx)
│   │   │       │   ├── [DashboardTemplate.tsx](./exhibit/src/components/wallet/templates/DashboardTemplate.tsx)
│   │   │       │   └── [index.ts](./exhibit/src/components/wallet/templates/index.ts)
│   │   │       ├── [OfflineBanner.tsx](./exhibit/src/components/wallet/OfflineBanner.tsx)
│   │   │       ├── [PageTransition.tsx](./exhibit/src/components/wallet/PageTransition.tsx)
│   │   │       ├── [RouteGuard.tsx](./exhibit/src/components/wallet/RouteGuard.tsx)
│   │   │       └── [SkipToContent.tsx](./exhibit/src/components/wallet/SkipToContent.tsx)
│   │   ├── content/
│   │   │   ├── [about.ts](./exhibit/src/content/about.ts)
│   │   │   ├── [download.ts](./exhibit/src/content/download.ts)
│   │   │   └── [version.ts](./exhibit/src/content/version.ts)
│   │   ├── data/
│   │   │   ├── __tests__/
│   │   │   │   └── [items.test.ts](./exhibit/src/data/__tests__/items.test.ts)
│   │   │   ├── chat/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [models.test.ts](./exhibit/src/data/chat/__tests__/models.test.ts)
│   │   │   │   │   └── [seed.test.ts](./exhibit/src/data/chat/__tests__/seed.test.ts)
│   │   │   │   ├── [index.ts](./exhibit/src/data/chat/index.ts)
│   │   │   │   ├── [models.ts](./exhibit/src/data/chat/models.ts)
│   │   │   │   ├── [seed.ts](./exhibit/src/data/chat/seed.ts)
│   │   │   │   └── [stickers.ts](./exhibit/src/data/chat/stickers.ts)
│   │   │   ├── password/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [models.test.ts](./exhibit/src/data/password/__tests__/models.test.ts)
│   │   │   │   │   └── [seed.test.ts](./exhibit/src/data/password/__tests__/seed.test.ts)
│   │   │   │   ├── [index.ts](./exhibit/src/data/password/index.ts)
│   │   │   │   ├── [models.ts](./exhibit/src/data/password/models.ts)
│   │   │   │   └── [seed.ts](./exhibit/src/data/password/seed.ts)
│   │   │   ├── video/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [video-tools.test.ts](./exhibit/src/data/video/__tests__/video-tools.test.ts)
│   │   │   │   └── [video-tools.ts](./exhibit/src/data/video/video-tools.ts)
│   │   │   ├── wallet/
│   │   │   │   ├── [mock.ts](./exhibit/src/data/wallet/mock.ts)
│   │   │   │   └── [nav.ts](./exhibit/src/data/wallet/nav.ts)
│   │   │   └── [items.ts](./exhibit/src/data/items.ts)
│   │   ├── hooks/
│   │   │   ├── chat/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [useSWRegister.test.ts](./exhibit/src/hooks/chat/__tests__/useSWRegister.test.ts)
│   │   │   │   ├── [index.ts](./exhibit/src/hooks/chat/index.ts)
│   │   │   │   ├── [useAuthActions.ts](./exhibit/src/hooks/chat/useAuthActions.ts)
│   │   │   │   ├── [useCallActions.ts](./exhibit/src/hooks/chat/useCallActions.ts)
│   │   │   │   ├── [useChatActions.ts](./exhibit/src/hooks/chat/useChatActions.ts)
│   │   │   │   ├── [useDataEffects.ts](./exhibit/src/hooks/chat/useDataEffects.ts)
│   │   │   │   ├── [useMessageActions.ts](./exhibit/src/hooks/chat/useMessageActions.ts)
│   │   │   │   ├── [usePeerActions.ts](./exhibit/src/hooks/chat/usePeerActions.ts)
│   │   │   │   ├── [usePrivacyActions.ts](./exhibit/src/hooks/chat/usePrivacyActions.ts)
│   │   │   │   ├── [useSWRegister.ts](./exhibit/src/hooks/chat/useSWRegister.ts)
│   │   │   │   └── [useSettingsActions.ts](./exhibit/src/hooks/chat/useSettingsActions.ts)
│   │   │   ├── menu/
│   │   │   │   ├── [index.ts](./exhibit/src/hooks/menu/index.ts)
│   │   │   │   └── [useMenuStore.ts](./exhibit/src/hooks/menu/useMenuStore.ts)
│   │   │   ├── password/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [useSWRegister.test.tsx](./exhibit/src/hooks/password/__tests__/useSWRegister.test.tsx)
│   │   │   │   ├── [index.ts](./exhibit/src/hooks/password/index.ts)
│   │   │   │   └── [useSWRegister.ts](./exhibit/src/hooks/password/useSWRegister.ts)
│   │   │   └── wallet/
│   │   │       ├── [useEntitySync.ts](./exhibit/src/hooks/wallet/useEntitySync.ts)
│   │   │       ├── [useHaptic.ts](./exhibit/src/hooks/wallet/useHaptic.ts)
│   │   │       ├── [useMediaQuery.ts](./exhibit/src/hooks/wallet/useMediaQuery.ts)
│   │   │       ├── [usePullToRefresh.ts](./exhibit/src/hooks/wallet/usePullToRefresh.ts)
│   │   │       ├── [useSWRegister.ts](./exhibit/src/hooks/wallet/useSWRegister.ts)
│   │   │       └── [useWalletSession.ts](./exhibit/src/hooks/wallet/useWalletSession.ts)
│   │   ├── lib/
│   │   │   ├── __tests__/
│   │   │   │   └── [storage.test.ts](./exhibit/src/lib/__tests__/storage.test.ts)
│   │   │   ├── chat/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [crypto.test.ts](./exhibit/src/lib/chat/__tests__/crypto.test.ts)
│   │   │   │   │   ├── [db.test.ts](./exhibit/src/lib/chat/__tests__/db.test.ts)
│   │   │   │   │   ├── [format.test.ts](./exhibit/src/lib/chat/__tests__/format.test.ts)
│   │   │   │   │   ├── [selectors.test.ts](./exhibit/src/lib/chat/__tests__/selectors.test.ts)
│   │   │   │   │   ├── [url.test.ts](./exhibit/src/lib/chat/__tests__/url.test.ts)
│   │   │   │   │   └── [webrtc.test.ts](./exhibit/src/lib/chat/__tests__/webrtc.test.ts)
│   │   │   │   ├── [crypto.ts](./exhibit/src/lib/chat/crypto.ts)
│   │   │   │   ├── [db.ts](./exhibit/src/lib/chat/db.ts)
│   │   │   │   ├── [format.ts](./exhibit/src/lib/chat/format.ts)
│   │   │   │   ├── [index.ts](./exhibit/src/lib/chat/index.ts)
│   │   │   │   ├── [selectors.ts](./exhibit/src/lib/chat/selectors.ts)
│   │   │   │   ├── [url.ts](./exhibit/src/lib/chat/url.ts)
│   │   │   │   └── [webrtc.ts](./exhibit/src/lib/chat/webrtc.ts)
│   │   │   ├── menu/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [menu.test.ts](./exhibit/src/lib/menu/__tests__/menu.test.ts)
│   │   │   │   ├── [ids.ts](./exhibit/src/lib/menu/ids.ts)
│   │   │   │   ├── [index.ts](./exhibit/src/lib/menu/index.ts)
│   │   │   │   ├── [menu.ts](./exhibit/src/lib/menu/menu.ts)
│   │   │   │   ├── [qr.ts](./exhibit/src/lib/menu/qr.ts)
│   │   │   │   ├── [seed.ts](./exhibit/src/lib/menu/seed.ts)
│   │   │   │   └── [storage.ts](./exhibit/src/lib/menu/storage.ts)
│   │   │   ├── password/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [db.test.ts](./exhibit/src/lib/password/__tests__/db.test.ts)
│   │   │   │   │   ├── [health.test.ts](./exhibit/src/lib/password/__tests__/health.test.ts)
│   │   │   │   │   ├── [security.test.ts](./exhibit/src/lib/password/__tests__/security.test.ts)
│   │   │   │   │   ├── [totp.test.ts](./exhibit/src/lib/password/__tests__/totp.test.ts)
│   │   │   │   │   └── [transfer.test.ts](./exhibit/src/lib/password/__tests__/transfer.test.ts)
│   │   │   │   ├── [db.ts](./exhibit/src/lib/password/db.ts)
│   │   │   │   ├── [health.ts](./exhibit/src/lib/password/health.ts)
│   │   │   │   ├── [index.ts](./exhibit/src/lib/password/index.ts)
│   │   │   │   ├── [security.ts](./exhibit/src/lib/password/security.ts)
│   │   │   │   ├── [totp.ts](./exhibit/src/lib/password/totp.ts)
│   │   │   │   └── [transfer.ts](./exhibit/src/lib/password/transfer.ts)
│   │   │   ├── pos/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [cart.test.ts](./exhibit/src/lib/pos/__tests__/cart.test.ts)
│   │   │   │   │   ├── [discounts.test.ts](./exhibit/src/lib/pos/__tests__/discounts.test.ts)
│   │   │   │   │   ├── [export.test.ts](./exhibit/src/lib/pos/__tests__/export.test.ts)
│   │   │   │   │   ├── [money.test.ts](./exhibit/src/lib/pos/__tests__/money.test.ts)
│   │   │   │   │   ├── [payment.test.ts](./exhibit/src/lib/pos/__tests__/payment.test.ts)
│   │   │   │   │   └── [reports.test.ts](./exhibit/src/lib/pos/__tests__/reports.test.ts)
│   │   │   │   ├── [cart.ts](./exhibit/src/lib/pos/cart.ts)
│   │   │   │   ├── [discounts.ts](./exhibit/src/lib/pos/discounts.ts)
│   │   │   │   ├── [download.ts](./exhibit/src/lib/pos/download.ts)
│   │   │   │   ├── [export.ts](./exhibit/src/lib/pos/export.ts)
│   │   │   │   ├── [index.ts](./exhibit/src/lib/pos/index.ts)
│   │   │   │   ├── [inventory.ts](./exhibit/src/lib/pos/inventory.ts)
│   │   │   │   ├── [money.ts](./exhibit/src/lib/pos/money.ts)
│   │   │   │   ├── [payment.ts](./exhibit/src/lib/pos/payment.ts)
│   │   │   │   ├── [reports.ts](./exhibit/src/lib/pos/reports.ts)
│   │   │   │   └── [transactions.ts](./exhibit/src/lib/pos/transactions.ts)
│   │   │   ├── video/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [video-tools.test.ts](./exhibit/src/lib/video/__tests__/video-tools.test.ts)
│   │   │   │   └── [video-tools.ts](./exhibit/src/lib/video/video-tools.ts)
│   │   │   ├── wallet/
│   │   │   │   ├── [db.ts](./exhibit/src/lib/wallet/db.ts)
│   │   │   │   ├── [export.ts](./exhibit/src/lib/wallet/export.ts)
│   │   │   │   ├── [format.ts](./exhibit/src/lib/wallet/format.ts)
│   │   │   │   ├── [iconMap.ts](./exhibit/src/lib/wallet/iconMap.ts)
│   │   │   │   ├── [seed.ts](./exhibit/src/lib/wallet/seed.ts)
│   │   │   │   └── [session.ts](./exhibit/src/lib/wallet/session.ts)
│   │   │   └── [storage.ts](./exhibit/src/lib/storage.ts)
│   │   ├── providers/
│   │   │   ├── chat/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [DataProvider.test.tsx](./exhibit/src/providers/chat/__tests__/DataProvider.test.tsx)
│   │   │   │   │   ├── [Providers.test.tsx](./exhibit/src/providers/chat/__tests__/Providers.test.tsx)
│   │   │   │   │   ├── [SWProvider.test.tsx](./exhibit/src/providers/chat/__tests__/SWProvider.test.tsx)
│   │   │   │   │   └── [ToastProvider.test.tsx](./exhibit/src/providers/chat/__tests__/ToastProvider.test.tsx)
│   │   │   │   ├── [DataContext.ts](./exhibit/src/providers/chat/DataContext.ts)
│   │   │   │   ├── [DataProvider.tsx](./exhibit/src/providers/chat/DataProvider.tsx)
│   │   │   │   ├── [Providers.tsx](./exhibit/src/providers/chat/Providers.tsx)
│   │   │   │   ├── [SWProvider.tsx](./exhibit/src/providers/chat/SWProvider.tsx)
│   │   │   │   ├── [ToastProvider.tsx](./exhibit/src/providers/chat/ToastProvider.tsx)
│   │   │   │   ├── [data-helpers.ts](./exhibit/src/providers/chat/data-helpers.ts)
│   │   │   │   └── [index.ts](./exhibit/src/providers/chat/index.ts)
│   │   │   ├── password/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [DataProvider.test.tsx](./exhibit/src/providers/password/__tests__/DataProvider.test.tsx)
│   │   │   │   │   ├── [SWProvider.test.tsx](./exhibit/src/providers/password/__tests__/SWProvider.test.tsx)
│   │   │   │   │   ├── [SecurityProvider.test.tsx](./exhibit/src/providers/password/__tests__/SecurityProvider.test.tsx)
│   │   │   │   │   └── [ToastProvider.test.tsx](./exhibit/src/providers/password/__tests__/ToastProvider.test.tsx)
│   │   │   │   ├── [DataProvider.tsx](./exhibit/src/providers/password/DataProvider.tsx)
│   │   │   │   ├── [Providers.tsx](./exhibit/src/providers/password/Providers.tsx)
│   │   │   │   ├── [SWProvider.tsx](./exhibit/src/providers/password/SWProvider.tsx)
│   │   │   │   ├── [SecurityProvider.tsx](./exhibit/src/providers/password/SecurityProvider.tsx)
│   │   │   │   ├── [ToastProvider.tsx](./exhibit/src/providers/password/ToastProvider.tsx)
│   │   │   │   └── [index.ts](./exhibit/src/providers/password/index.ts)
│   │   │   └── wallet/
│   │   │       ├── __tests__/
│   │   │       │   ├── [DataProvider.crud.test.tsx](./exhibit/src/providers/wallet/__tests__/DataProvider.crud.test.tsx)
│   │   │       │   ├── [DataProvider.loading.test.tsx](./exhibit/src/providers/wallet/__tests__/DataProvider.loading.test.tsx)
│   │   │       │   ├── [DataProvider.test.tsx](./exhibit/src/providers/wallet/__tests__/DataProvider.test.tsx)
│   │   │       │   └── [ToastProvider.test.tsx](./exhibit/src/providers/wallet/__tests__/ToastProvider.test.tsx)
│   │   │       ├── auth/
│   │   │       │   └── [AuthProvider.tsx](./exhibit/src/providers/wallet/auth/AuthProvider.tsx)
│   │   │       ├── entities/
│   │   │       │   ├── [AccountsProvider.tsx](./exhibit/src/providers/wallet/entities/AccountsProvider.tsx)
│   │   │       │   ├── [BillsProvider.tsx](./exhibit/src/providers/wallet/entities/BillsProvider.tsx)
│   │   │       │   ├── [BudgetProvider.tsx](./exhibit/src/providers/wallet/entities/BudgetProvider.tsx)
│   │   │       │   ├── [CardsProvider.tsx](./exhibit/src/providers/wallet/entities/CardsProvider.tsx)
│   │   │       │   ├── [ContactsProvider.tsx](./exhibit/src/providers/wallet/entities/ContactsProvider.tsx)
│   │   │       │   ├── [CurrencyAlertsProvider.tsx](./exhibit/src/providers/wallet/entities/CurrencyAlertsProvider.tsx)
│   │   │       │   ├── [CurrencyRatesProvider.tsx](./exhibit/src/providers/wallet/entities/CurrencyRatesProvider.tsx)
│   │   │       │   ├── [FDsProvider.tsx](./exhibit/src/providers/wallet/entities/FDsProvider.tsx)
│   │   │       │   ├── [GoalsProvider.tsx](./exhibit/src/providers/wallet/entities/GoalsProvider.tsx)
│   │   │       │   ├── [InsuranceProvider.tsx](./exhibit/src/providers/wallet/entities/InsuranceProvider.tsx)
│   │   │       │   ├── [LoansProvider.tsx](./exhibit/src/providers/wallet/entities/LoansProvider.tsx)
│   │   │       │   ├── [NotificationsProvider.tsx](./exhibit/src/providers/wallet/entities/NotificationsProvider.tsx)
│   │   │       │   ├── [PaymentRequestsProvider.tsx](./exhibit/src/providers/wallet/entities/PaymentRequestsProvider.tsx)
│   │   │       │   ├── [RDsProvider.tsx](./exhibit/src/providers/wallet/entities/RDsProvider.tsx)
│   │   │       │   ├── [RecurringTransfersProvider.tsx](./exhibit/src/providers/wallet/entities/RecurringTransfersProvider.tsx)
│   │   │       │   ├── [RewardsProvider.tsx](./exhibit/src/providers/wallet/entities/RewardsProvider.tsx)
│   │   │       │   ├── [TransactionsProvider.tsx](./exhibit/src/providers/wallet/entities/TransactionsProvider.tsx)
│   │   │       │   └── [UserProvider.tsx](./exhibit/src/providers/wallet/entities/UserProvider.tsx)
│   │   │       ├── [DataProvider.tsx](./exhibit/src/providers/wallet/DataProvider.tsx)
│   │   │       ├── [Providers.tsx](./exhibit/src/providers/wallet/Providers.tsx)
│   │   │       ├── [SWProvider.tsx](./exhibit/src/providers/wallet/SWProvider.tsx)
│   │   │       ├── [ToastProvider.tsx](./exhibit/src/providers/wallet/ToastProvider.tsx)
│   │   │       └── [WalletProviders.tsx](./exhibit/src/providers/wallet/WalletProviders.tsx)
│   │   ├── styles/
│   │   │   ├── [globals.css](./exhibit/src/styles/globals.css)
│   │   │   └── [themes.css](./exhibit/src/styles/themes.css)
│   │   ├── test-helpers/
│   │   │   ├── password/
│   │   │   │   ├── [fakeDb.ts](./exhibit/src/test-helpers/password/fakeDb.ts)
│   │   │   │   └── [index.ts](./exhibit/src/test-helpers/password/index.ts)
│   │   │   └── wallet/
│   │   │       ├── [db-mock.ts](./exhibit/src/test-helpers/wallet/db-mock.ts)
│   │   │       ├── [index.ts](./exhibit/src/test-helpers/wallet/index.ts)
│   │   │       ├── [nav-mock.ts](./exhibit/src/test-helpers/wallet/nav-mock.ts)
│   │   │       └── [render.tsx](./exhibit/src/test-helpers/wallet/render.tsx)
│   │   ├── types/
│   │   │   ├── chat/
│   │   │   │   ├── [call.ts](./exhibit/src/types/chat/call.ts)
│   │   │   │   ├── [chat.ts](./exhibit/src/types/chat/chat.ts)
│   │   │   │   ├── [index.ts](./exhibit/src/types/chat/index.ts)
│   │   │   │   ├── [message.ts](./exhibit/src/types/chat/message.ts)
│   │   │   │   ├── [peer.ts](./exhibit/src/types/chat/peer.ts)
│   │   │   │   ├── [settings.ts](./exhibit/src/types/chat/settings.ts)
│   │   │   │   └── [user.ts](./exhibit/src/types/chat/user.ts)
│   │   │   ├── menu/
│   │   │   │   ├── [index.ts](./exhibit/src/types/menu/index.ts)
│   │   │   │   └── [menu.ts](./exhibit/src/types/menu/menu.ts)
│   │   │   ├── password/
│   │   │   │   └── [index.ts](./exhibit/src/types/password/index.ts)
│   │   │   ├── pos/
│   │   │   │   └── [index.ts](./exhibit/src/types/pos/index.ts)
│   │   │   ├── video/
│   │   │   │   └── [speech-recognition.d.ts](./exhibit/src/types/video/speech-recognition.d.ts)
│   │   │   └── wallet/
│   │   │       └── [index.ts](./exhibit/src/types/wallet/index.ts)
│   │   └── utils/
│   │       └── password/
│   │           ├── __tests__/
│   │           │   └── [format.test.ts](./exhibit/src/utils/password/__tests__/format.test.ts)
│   │           ├── [format.ts](./exhibit/src/utils/password/format.ts)
│   │           └── [index.ts](./exhibit/src/utils/password/index.ts)
│   ├── src-tauri/
│   │   ├── capabilities/
│   │   │   └── [default.json](./exhibit/src-tauri/capabilities/default.json)
│   │   ├── icons/
│   │   │   ├── android/
│   │   │   │   ├── mipmap-anydpi-v26/
│   │   │   │   │   └── [ic_launcher.xml](./exhibit/src-tauri/icons/android/mipmap-anydpi-v26/ic_launcher.xml)
│   │   │   │   ├── mipmap-hdpi/
│   │   │   │   │   ├── [ic_launcher.png](./exhibit/src-tauri/icons/android/mipmap-hdpi/ic_launcher.png)
│   │   │   │   │   ├── [ic_launcher_foreground.png](./exhibit/src-tauri/icons/android/mipmap-hdpi/ic_launcher_foreground.png)
│   │   │   │   │   └── [ic_launcher_round.png](./exhibit/src-tauri/icons/android/mipmap-hdpi/ic_launcher_round.png)
│   │   │   │   ├── mipmap-mdpi/
│   │   │   │   │   ├── [ic_launcher.png](./exhibit/src-tauri/icons/android/mipmap-mdpi/ic_launcher.png)
│   │   │   │   │   ├── [ic_launcher_foreground.png](./exhibit/src-tauri/icons/android/mipmap-mdpi/ic_launcher_foreground.png)
│   │   │   │   │   └── [ic_launcher_round.png](./exhibit/src-tauri/icons/android/mipmap-mdpi/ic_launcher_round.png)
│   │   │   │   ├── mipmap-xhdpi/
│   │   │   │   │   ├── [ic_launcher.png](./exhibit/src-tauri/icons/android/mipmap-xhdpi/ic_launcher.png)
│   │   │   │   │   ├── [ic_launcher_foreground.png](./exhibit/src-tauri/icons/android/mipmap-xhdpi/ic_launcher_foreground.png)
│   │   │   │   │   └── [ic_launcher_round.png](./exhibit/src-tauri/icons/android/mipmap-xhdpi/ic_launcher_round.png)
│   │   │   │   ├── mipmap-xxhdpi/
│   │   │   │   │   ├── [ic_launcher.png](./exhibit/src-tauri/icons/android/mipmap-xxhdpi/ic_launcher.png)
│   │   │   │   │   ├── [ic_launcher_foreground.png](./exhibit/src-tauri/icons/android/mipmap-xxhdpi/ic_launcher_foreground.png)
│   │   │   │   │   └── [ic_launcher_round.png](./exhibit/src-tauri/icons/android/mipmap-xxhdpi/ic_launcher_round.png)
│   │   │   │   ├── mipmap-xxxhdpi/
│   │   │   │   │   ├── [ic_launcher.png](./exhibit/src-tauri/icons/android/mipmap-xxxhdpi/ic_launcher.png)
│   │   │   │   │   ├── [ic_launcher_foreground.png](./exhibit/src-tauri/icons/android/mipmap-xxxhdpi/ic_launcher_foreground.png)
│   │   │   │   │   └── [ic_launcher_round.png](./exhibit/src-tauri/icons/android/mipmap-xxxhdpi/ic_launcher_round.png)
│   │   │   │   └── values/
│   │   │   │       └── [ic_launcher_background.xml](./exhibit/src-tauri/icons/android/values/ic_launcher_background.xml)
│   │   │   ├── ios/
│   │   │   │   ├── [AppIcon-20x20@1x.png](./exhibit/src-tauri/icons/ios/AppIcon-20x20@1x.png)
│   │   │   │   ├── [AppIcon-20x20@2x-1.png](./exhibit/src-tauri/icons/ios/AppIcon-20x20@2x-1.png)
│   │   │   │   ├── [AppIcon-20x20@2x.png](./exhibit/src-tauri/icons/ios/AppIcon-20x20@2x.png)
│   │   │   │   ├── [AppIcon-20x20@3x.png](./exhibit/src-tauri/icons/ios/AppIcon-20x20@3x.png)
│   │   │   │   ├── [AppIcon-29x29@1x.png](./exhibit/src-tauri/icons/ios/AppIcon-29x29@1x.png)
│   │   │   │   ├── [AppIcon-29x29@2x-1.png](./exhibit/src-tauri/icons/ios/AppIcon-29x29@2x-1.png)
│   │   │   │   ├── [AppIcon-29x29@2x.png](./exhibit/src-tauri/icons/ios/AppIcon-29x29@2x.png)
│   │   │   │   ├── [AppIcon-29x29@3x.png](./exhibit/src-tauri/icons/ios/AppIcon-29x29@3x.png)
│   │   │   │   ├── [AppIcon-40x40@1x.png](./exhibit/src-tauri/icons/ios/AppIcon-40x40@1x.png)
│   │   │   │   ├── [AppIcon-40x40@2x-1.png](./exhibit/src-tauri/icons/ios/AppIcon-40x40@2x-1.png)
│   │   │   │   ├── [AppIcon-40x40@2x.png](./exhibit/src-tauri/icons/ios/AppIcon-40x40@2x.png)
│   │   │   │   ├── [AppIcon-40x40@3x.png](./exhibit/src-tauri/icons/ios/AppIcon-40x40@3x.png)
│   │   │   │   ├── [AppIcon-512@2x.png](./exhibit/src-tauri/icons/ios/AppIcon-512@2x.png)
│   │   │   │   ├── [AppIcon-60x60@2x.png](./exhibit/src-tauri/icons/ios/AppIcon-60x60@2x.png)
│   │   │   │   ├── [AppIcon-60x60@3x.png](./exhibit/src-tauri/icons/ios/AppIcon-60x60@3x.png)
│   │   │   │   ├── [AppIcon-76x76@1x.png](./exhibit/src-tauri/icons/ios/AppIcon-76x76@1x.png)
│   │   │   │   ├── [AppIcon-76x76@2x.png](./exhibit/src-tauri/icons/ios/AppIcon-76x76@2x.png)
│   │   │   │   └── [AppIcon-83.5x83.5@2x.png](./exhibit/src-tauri/icons/ios/AppIcon-83.5x83.5@2x.png)
│   │   │   ├── [128x128.png](./exhibit/src-tauri/icons/128x128.png)
│   │   │   ├── [128x128@2x.png](./exhibit/src-tauri/icons/128x128@2x.png)
│   │   │   ├── [256x256.png](./exhibit/src-tauri/icons/256x256.png)
│   │   │   ├── [32x32.png](./exhibit/src-tauri/icons/32x32.png)
│   │   │   ├── [64x64.png](./exhibit/src-tauri/icons/64x64.png)
│   │   │   ├── [Square107x107Logo.png](./exhibit/src-tauri/icons/Square107x107Logo.png)
│   │   │   ├── [Square142x142Logo.png](./exhibit/src-tauri/icons/Square142x142Logo.png)
│   │   │   ├── [Square150x150Logo.png](./exhibit/src-tauri/icons/Square150x150Logo.png)
│   │   │   ├── [Square284x284Logo.png](./exhibit/src-tauri/icons/Square284x284Logo.png)
│   │   │   ├── [Square30x30Logo.png](./exhibit/src-tauri/icons/Square30x30Logo.png)
│   │   │   ├── [Square310x310Logo.png](./exhibit/src-tauri/icons/Square310x310Logo.png)
│   │   │   ├── [Square44x44Logo.png](./exhibit/src-tauri/icons/Square44x44Logo.png)
│   │   │   ├── [Square71x71Logo.png](./exhibit/src-tauri/icons/Square71x71Logo.png)
│   │   │   ├── [Square89x89Logo.png](./exhibit/src-tauri/icons/Square89x89Logo.png)
│   │   │   ├── [StoreLogo.png](./exhibit/src-tauri/icons/StoreLogo.png)
│   │   │   ├── [create-icons.sh](./exhibit/src-tauri/icons/create-icons.sh)
│   │   │   ├── [icon-1024.png](./exhibit/src-tauri/icons/icon-1024.png)
│   │   │   ├── [icon.icns](./exhibit/src-tauri/icons/icon.icns)
│   │   │   ├── [icon.ico](./exhibit/src-tauri/icons/icon.ico)
│   │   │   └── [icon.png](./exhibit/src-tauri/icons/icon.png)
│   │   ├── src/
│   │   │   ├── [lib.rs](./exhibit/src-tauri/src/lib.rs)
│   │   │   └── [main.rs](./exhibit/src-tauri/src/main.rs)
│   │   ├── [Cargo.lock](./exhibit/src-tauri/Cargo.lock)
│   │   ├── [Cargo.toml](./exhibit/src-tauri/Cargo.toml)
│   │   ├── [build.rs](./exhibit/src-tauri/build.rs)
│   │   └── [tauri.conf.json](./exhibit/src-tauri/tauri.conf.json)
│   ├── [AGENTS.md](./exhibit/AGENTS.md)
│   ├── [Dockerfile](./exhibit/Dockerfile)
│   ├── [LICENSE](./exhibit/LICENSE)
│   ├── [README.md](./exhibit/README.md)
│   ├── [TREE.md](./exhibit/TREE.md)
│   ├── [docker-compose.yaml](./exhibit/docker-compose.yaml)
│   ├── [eslint.config.mts](./exhibit/eslint.config.mts)
│   ├── [jest.config.ts](./exhibit/jest.config.ts)
│   ├── [jest.setup.ts](./exhibit/jest.setup.ts)
│   ├── [next.config.ts](./exhibit/next.config.ts)
│   ├── [package.json](./exhibit/package.json)
│   ├── [playwright.config.ts](./exhibit/playwright.config.ts)
│   ├── [postcss.config.mjs](./exhibit/postcss.config.mjs)
│   └── [tsconfig.json](./exhibit/tsconfig.json)
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
│   │   ├── og/
│   │   │   ├── [og.png](./photo/public/og/og.png)
│   │   │   └── [og.svg](./photo/public/og/og.svg)
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
│   │   ├── og/
│   │   │   ├── [og.png](./svg/public/og/og.png)
│   │   │   └── [og.svg](./svg/public/og/og.svg)
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
├── [README.md](./README.md)
└── [TREE.md](./TREE.md)
```

370 directories, 1275 files
