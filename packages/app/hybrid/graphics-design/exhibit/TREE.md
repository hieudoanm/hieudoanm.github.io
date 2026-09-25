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
│   ├── __tests__/
│   │   ├── [about.test.tsx](./src/__tests__/about.test.tsx)
│   │   ├── [downloads.test.tsx](./src/__tests__/downloads.test.tsx)
│   │   ├── [error.test.tsx](./src/__tests__/error.test.tsx)
│   │   ├── [global-error.test.tsx](./src/__tests__/global-error.test.tsx)
│   │   ├── [layout.test.tsx](./src/__tests__/layout.test.tsx)
│   │   ├── [not-found.test.tsx](./src/__tests__/not-found.test.tsx)
│   │   └── [version.test.tsx](./src/__tests__/version.test.tsx)
│   ├── app/
│   │   ├── (app)/
│   │   │   ├── __tests__/
│   │   │   │   └── [page.test.tsx](./src/app/(app)/__tests__/page.test.tsx)
│   │   │   ├── wallet/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [page.test.tsx](./src/app/(app)/wallet/__tests__/page.test.tsx)
│   │   │   │   ├── accounts/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(app)/wallet/accounts/__tests__/page.test.tsx)
│   │   │   │   │   ├── checking/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   └── [page.test.tsx](./src/app/(app)/wallet/accounts/checking/__tests__/page.test.tsx)
│   │   │   │   │   │   └── [page.tsx](./src/app/(app)/wallet/accounts/checking/page.tsx)
│   │   │   │   │   ├── credit/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   └── [page.test.tsx](./src/app/(app)/wallet/accounts/credit/__tests__/page.test.tsx)
│   │   │   │   │   │   └── [page.tsx](./src/app/(app)/wallet/accounts/credit/page.tsx)
│   │   │   │   │   ├── savings/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   └── [page.test.tsx](./src/app/(app)/wallet/accounts/savings/__tests__/page.test.tsx)
│   │   │   │   │   │   └── [page.tsx](./src/app/(app)/wallet/accounts/savings/page.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(app)/wallet/accounts/page.tsx)
│   │   │   │   ├── bills/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(app)/wallet/bills/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(app)/wallet/bills/page.tsx)
│   │   │   │   ├── budget/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(app)/wallet/budget/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(app)/wallet/budget/page.tsx)
│   │   │   │   ├── card-rewards/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(app)/wallet/card-rewards/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(app)/wallet/card-rewards/page.tsx)
│   │   │   │   ├── cards/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(app)/wallet/cards/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(app)/wallet/cards/page.tsx)
│   │   │   │   ├── contacts/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(app)/wallet/contacts/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(app)/wallet/contacts/page.tsx)
│   │   │   │   ├── currency-alerts/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(app)/wallet/currency-alerts/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(app)/wallet/currency-alerts/page.tsx)
│   │   │   │   ├── exchange/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(app)/wallet/exchange/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(app)/wallet/exchange/page.tsx)
│   │   │   │   ├── fixed-deposits/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(app)/wallet/fixed-deposits/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(app)/wallet/fixed-deposits/page.tsx)
│   │   │   │   ├── help-support/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(app)/wallet/help-support/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(app)/wallet/help-support/page.tsx)
│   │   │   │   ├── insurance/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(app)/wallet/insurance/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(app)/wallet/insurance/page.tsx)
│   │   │   │   ├── loans/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(app)/wallet/loans/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(app)/wallet/loans/page.tsx)
│   │   │   │   ├── notifications/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(app)/wallet/notifications/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(app)/wallet/notifications/page.tsx)
│   │   │   │   ├── pay/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(app)/wallet/pay/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(app)/wallet/pay/page.tsx)
│   │   │   │   ├── payment-requests/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(app)/wallet/payment-requests/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(app)/wallet/payment-requests/page.tsx)
│   │   │   │   ├── privacy-policy/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(app)/wallet/privacy-policy/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(app)/wallet/privacy-policy/page.tsx)
│   │   │   │   ├── profile/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(app)/wallet/profile/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(app)/wallet/profile/page.tsx)
│   │   │   │   ├── rates/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(app)/wallet/rates/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(app)/wallet/rates/page.tsx)
│   │   │   │   ├── recurring-deposits/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(app)/wallet/recurring-deposits/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(app)/wallet/recurring-deposits/page.tsx)
│   │   │   │   ├── recurring-transfers/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(app)/wallet/recurring-transfers/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(app)/wallet/recurring-transfers/page.tsx)
│   │   │   │   ├── reports/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(app)/wallet/reports/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(app)/wallet/reports/page.tsx)
│   │   │   │   ├── savings-goals/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(app)/wallet/savings-goals/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(app)/wallet/savings-goals/page.tsx)
│   │   │   │   ├── settings/
│   │   │   │   │   └── [page.tsx](./src/app/(app)/wallet/settings/page.tsx)
│   │   │   │   ├── split-bill/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(app)/wallet/split-bill/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(app)/wallet/split-bill/page.tsx)
│   │   │   │   ├── terms-of-service/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(app)/wallet/terms-of-service/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(app)/wallet/terms-of-service/page.tsx)
│   │   │   │   ├── transactions/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(app)/wallet/transactions/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(app)/wallet/transactions/page.tsx)
│   │   │   │   ├── transfer/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(app)/wallet/transfer/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(app)/wallet/transfer/page.tsx)
│   │   │   │   ├── [layout.tsx](./src/app/(app)/wallet/layout.tsx)
│   │   │   │   ├── [loading.tsx](./src/app/(app)/wallet/loading.tsx)
│   │   │   │   ├── [page.tsx](./src/app/(app)/wallet/page.tsx)
│   │   │   │   └── [template.tsx](./src/app/(app)/wallet/template.tsx)
│   │   │   └── [page.tsx](./src/app/(app)/page.tsx)
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
│   │   │   │   └── [page.tsx](./src/app/(info)/downloads/page.tsx)
│   │   │   └── version/
│   │   │       └── [page.tsx](./src/app/(info)/version/page.tsx)
│   │   ├── __tests__/
│   │   │   ├── [default.test.tsx](./src/app/__tests__/default.test.tsx)
│   │   │   ├── [error.test.tsx](./src/app/__tests__/error.test.tsx)
│   │   │   ├── [forbidden.test.tsx](./src/app/__tests__/forbidden.test.tsx)
│   │   │   ├── [global-error.test.tsx](./src/app/__tests__/global-error.test.tsx)
│   │   │   ├── [layout.test.tsx](./src/app/__tests__/layout.test.tsx)
│   │   │   ├── [loading.test.tsx](./src/app/__tests__/loading.test.tsx)
│   │   │   ├── [not-found.test.tsx](./src/app/__tests__/not-found.test.tsx)
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
│   │   ├── [robots.ts](./src/app/robots.ts)
│   │   ├── [template.tsx](./src/app/template.tsx)
│   │   └── [unauthorized.tsx](./src/app/unauthorized.tsx)
│   ├── components/
│   │   ├── organisms/
│   │   │   ├── __tests__/
│   │   │   │   ├── [Cart.test.tsx](./src/components/organisms/__tests__/Cart.test.tsx)
│   │   │   │   ├── [Checkout.test.tsx](./src/components/organisms/__tests__/Checkout.test.tsx)
│   │   │   │   ├── [DailySummary.test.tsx](./src/components/organisms/__tests__/DailySummary.test.tsx)
│   │   │   │   ├── [DigitalReceipt.test.tsx](./src/components/organisms/__tests__/DigitalReceipt.test.tsx)
│   │   │   │   ├── [DiscountManager.test.tsx](./src/components/organisms/__tests__/DiscountManager.test.tsx)
│   │   │   │   ├── [GiftCardManager.test.tsx](./src/components/organisms/__tests__/GiftCardManager.test.tsx)
│   │   │   │   ├── [Header.test.tsx](./src/components/organisms/__tests__/Header.test.tsx)
│   │   │   │   ├── [InventoryManager.test.tsx](./src/components/organisms/__tests__/InventoryManager.test.tsx)
│   │   │   │   ├── [ItemCatalog.test.tsx](./src/components/organisms/__tests__/ItemCatalog.test.tsx)
│   │   │   │   ├── [PaymentPanel.test.tsx](./src/components/organisms/__tests__/PaymentPanel.test.tsx)
│   │   │   │   ├── [Receipt.test.tsx](./src/components/organisms/__tests__/Receipt.test.tsx)
│   │   │   │   ├── [ReportingDashboard.test.tsx](./src/components/organisms/__tests__/ReportingDashboard.test.tsx)
│   │   │   │   ├── [ShiftManager.test.tsx](./src/components/organisms/__tests__/ShiftManager.test.tsx)
│   │   │   │   ├── [TaxConfigPanel.test.tsx](./src/components/organisms/__tests__/TaxConfigPanel.test.tsx)
│   │   │   │   ├── [TransactionHistory.test.tsx](./src/components/organisms/__tests__/TransactionHistory.test.tsx)
│   │   │   │   └── [UserManager.test.tsx](./src/components/organisms/__tests__/UserManager.test.tsx)
│   │   │   ├── [Cart.tsx](./src/components/organisms/Cart.tsx)
│   │   │   ├── [Checkout.tsx](./src/components/organisms/Checkout.tsx)
│   │   │   ├── [DailySummary.tsx](./src/components/organisms/DailySummary.tsx)
│   │   │   ├── [DigitalReceipt.tsx](./src/components/organisms/DigitalReceipt.tsx)
│   │   │   ├── [DiscountManager.tsx](./src/components/organisms/DiscountManager.tsx)
│   │   │   ├── [GiftCardManager.tsx](./src/components/organisms/GiftCardManager.tsx)
│   │   │   ├── [Header.tsx](./src/components/organisms/Header.tsx)
│   │   │   ├── [InventoryManager.tsx](./src/components/organisms/InventoryManager.tsx)
│   │   │   ├── [ItemCatalog.tsx](./src/components/organisms/ItemCatalog.tsx)
│   │   │   ├── [PaymentPanel.tsx](./src/components/organisms/PaymentPanel.tsx)
│   │   │   ├── [Receipt.tsx](./src/components/organisms/Receipt.tsx)
│   │   │   ├── [ReportingDashboard.tsx](./src/components/organisms/ReportingDashboard.tsx)
│   │   │   ├── [ShiftManager.tsx](./src/components/organisms/ShiftManager.tsx)
│   │   │   ├── [TaxConfigPanel.tsx](./src/components/organisms/TaxConfigPanel.tsx)
│   │   │   ├── [TransactionHistory.tsx](./src/components/organisms/TransactionHistory.tsx)
│   │   │   └── [UserManager.tsx](./src/components/organisms/UserManager.tsx)
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
│   │   ├── templates/
│   │   └── wallet/
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
│   ├── data/
│   │   ├── __tests__/
│   │   │   └── [items.test.ts](./src/data/__tests__/items.test.ts)
│   │   ├── wallet/
│   │   │   ├── [mock.ts](./src/data/wallet/mock.ts)
│   │   │   └── [nav.ts](./src/data/wallet/nav.ts)
│   │   └── [items.ts](./src/data/items.ts)
│   ├── hooks/
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
│   │   ├── wallet/
│   │   │   ├── [db.ts](./src/lib/wallet/db.ts)
│   │   │   ├── [export.ts](./src/lib/wallet/export.ts)
│   │   │   ├── [format.ts](./src/lib/wallet/format.ts)
│   │   │   ├── [iconMap.ts](./src/lib/wallet/iconMap.ts)
│   │   │   ├── [seed.ts](./src/lib/wallet/seed.ts)
│   │   │   └── [session.ts](./src/lib/wallet/session.ts)
│   │   └── [storage.ts](./src/lib/storage.ts)
│   ├── providers/
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
│   │   ├── [base.css](./src/styles/base.css)
│   │   ├── [globals.css](./src/styles/globals.css)
│   │   └── [themes.css](./src/styles/themes.css)
│   ├── test-helpers/
│   │   └── wallet/
│   │       ├── [db-mock.ts](./src/test-helpers/wallet/db-mock.ts)
│   │       ├── [index.ts](./src/test-helpers/wallet/index.ts)
│   │       ├── [nav-mock.ts](./src/test-helpers/wallet/nav-mock.ts)
│   │       └── [render.tsx](./src/test-helpers/wallet/render.tsx)
│   └── types/
│       ├── wallet/
│       │   └── [index.ts](./src/types/wallet/index.ts)
│       └── [pos.ts](./src/types/pos.ts)
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

127 directories, 352 files
