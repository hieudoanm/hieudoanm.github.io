# TREE

```text
├── docs/
│   ├── [ARCHITECTURE.md](./docs/ARCHITECTURE.md)
│   ├── [CONTRIBUTING.md](./docs/CONTRIBUTING.md)
│   ├── [DOWNLOADS.md](./docs/DOWNLOADS.md)
│   ├── [PACKAGING.md](./docs/PACKAGING.md)
│   └── [ROADMAP.md](./docs/ROADMAP.md)
├── e2e/
│   ├── [auth-guard.spec.ts](./e2e/auth-guard.spec.ts)
│   ├── [auth.spec.ts](./e2e/auth.spec.ts)
│   ├── [budget-notifications.spec.ts](./e2e/budget-notifications.spec.ts)
│   ├── [cards.spec.ts](./e2e/cards.spec.ts)
│   ├── [exchange.spec.ts](./e2e/exchange.spec.ts)
│   ├── [helpers.ts](./e2e/helpers.ts)
│   ├── [index.spec.ts](./e2e/index.spec.ts)
│   ├── [navigation.spec.ts](./e2e/navigation.spec.ts)
│   ├── [pages.spec.ts](./e2e/pages.spec.ts)
│   ├── [pay.spec.ts](./e2e/pay.spec.ts)
│   ├── [profile.spec.ts](./e2e/profile.spec.ts)
│   ├── [transactions.spec.ts](./e2e/transactions.spec.ts)
│   └── [transfer.spec.ts](./e2e/transfer.spec.ts)
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
│   │   ├── (dashboard)/
│   │   │   ├── (banking)/
│   │   │   │   ├── card-rewards/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(dashboard)/(banking)/card-rewards/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(dashboard)/(banking)/card-rewards/page.tsx)
│   │   │   │   ├── fixed-deposits/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(dashboard)/(banking)/fixed-deposits/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(dashboard)/(banking)/fixed-deposits/page.tsx)
│   │   │   │   ├── insurance/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(dashboard)/(banking)/insurance/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(dashboard)/(banking)/insurance/page.tsx)
│   │   │   │   ├── recurring-deposits/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(dashboard)/(banking)/recurring-deposits/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(dashboard)/(banking)/recurring-deposits/page.tsx)
│   │   │   │   └── savings-goals/
│   │   │   │       ├── __tests__/
│   │   │   │       │   └── [page.test.tsx](./src/app/(dashboard)/(banking)/savings-goals/__tests__/page.test.tsx)
│   │   │   │       └── [page.tsx](./src/app/(dashboard)/(banking)/savings-goals/page.tsx)
│   │   │   ├── (budgeting)/
│   │   │   │   ├── bills/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(dashboard)/(budgeting)/bills/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(dashboard)/(budgeting)/bills/page.tsx)
│   │   │   │   ├── budget/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(dashboard)/(budgeting)/budget/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(dashboard)/(budgeting)/budget/page.tsx)
│   │   │   │   ├── currency-alerts/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(dashboard)/(budgeting)/currency-alerts/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(dashboard)/(budgeting)/currency-alerts/page.tsx)
│   │   │   │   ├── rates/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(dashboard)/(budgeting)/rates/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(dashboard)/(budgeting)/rates/page.tsx)
│   │   │   │   └── recurring-transfers/
│   │   │   │       ├── __tests__/
│   │   │   │       │   └── [page.test.tsx](./src/app/(dashboard)/(budgeting)/recurring-transfers/__tests__/page.test.tsx)
│   │   │   │       └── [page.tsx](./src/app/(dashboard)/(budgeting)/recurring-transfers/page.tsx)
│   │   │   ├── (financial)/
│   │   │   │   ├── accounts/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(dashboard)/(financial)/accounts/__tests__/page.test.tsx)
│   │   │   │   │   ├── checking/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   └── [page.test.tsx](./src/app/(dashboard)/(financial)/accounts/checking/__tests__/page.test.tsx)
│   │   │   │   │   │   └── [page.tsx](./src/app/(dashboard)/(financial)/accounts/checking/page.tsx)
│   │   │   │   │   ├── credit/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   └── [page.test.tsx](./src/app/(dashboard)/(financial)/accounts/credit/__tests__/page.test.tsx)
│   │   │   │   │   │   └── [page.tsx](./src/app/(dashboard)/(financial)/accounts/credit/page.tsx)
│   │   │   │   │   ├── savings/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   └── [page.test.tsx](./src/app/(dashboard)/(financial)/accounts/savings/__tests__/page.test.tsx)
│   │   │   │   │   │   └── [page.tsx](./src/app/(dashboard)/(financial)/accounts/savings/page.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(dashboard)/(financial)/accounts/page.tsx)
│   │   │   │   ├── exchange/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(dashboard)/(financial)/exchange/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(dashboard)/(financial)/exchange/page.tsx)
│   │   │   │   ├── reports/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(dashboard)/(financial)/reports/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(dashboard)/(financial)/reports/page.tsx)
│   │   │   │   └── transactions/
│   │   │   │       ├── __tests__/
│   │   │   │       │   └── [page.test.tsx](./src/app/(dashboard)/(financial)/transactions/__tests__/page.test.tsx)
│   │   │   │       └── [page.tsx](./src/app/(dashboard)/(financial)/transactions/page.tsx)
│   │   │   ├── (payments)/
│   │   │   │   ├── cards/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(dashboard)/(payments)/cards/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(dashboard)/(payments)/cards/page.tsx)
│   │   │   │   ├── contacts/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(dashboard)/(payments)/contacts/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(dashboard)/(payments)/contacts/page.tsx)
│   │   │   │   ├── loans/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(dashboard)/(payments)/loans/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(dashboard)/(payments)/loans/page.tsx)
│   │   │   │   ├── pay/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(dashboard)/(payments)/pay/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(dashboard)/(payments)/pay/page.tsx)
│   │   │   │   ├── payment-requests/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(dashboard)/(payments)/payment-requests/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(dashboard)/(payments)/payment-requests/page.tsx)
│   │   │   │   ├── split-bill/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./src/app/(dashboard)/(payments)/split-bill/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(dashboard)/(payments)/split-bill/page.tsx)
│   │   │   │   └── transfer/
│   │   │   │       ├── __tests__/
│   │   │   │       │   └── [page.test.tsx](./src/app/(dashboard)/(payments)/transfer/__tests__/page.test.tsx)
│   │   │   │       └── [page.tsx](./src/app/(dashboard)/(payments)/transfer/page.tsx)
│   │   │   ├── __tests__/
│   │   │   │   └── [page.test.tsx](./src/app/(dashboard)/__tests__/page.test.tsx)
│   │   │   └── [page.tsx](./src/app/(dashboard)/page.tsx)
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
│   │   ├── (notifications)/
│   │   │   └── notifications/
│   │   │       ├── __tests__/
│   │   │       │   └── [page.test.tsx](./src/app/(notifications)/notifications/__tests__/page.test.tsx)
│   │   │       └── [page.tsx](./src/app/(notifications)/notifications/page.tsx)
│   │   ├── (profile)/
│   │   │   └── settings/
│   │   │       └── [page.tsx](./src/app/(profile)/settings/page.tsx)
│   │   ├── (settings)/
│   │   │   ├── help-support/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [page.test.tsx](./src/app/(settings)/help-support/__tests__/page.test.tsx)
│   │   │   │   └── [page.tsx](./src/app/(settings)/help-support/page.tsx)
│   │   │   ├── privacy-policy/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [page.test.tsx](./src/app/(settings)/privacy-policy/__tests__/page.test.tsx)
│   │   │   │   └── [page.tsx](./src/app/(settings)/privacy-policy/page.tsx)
│   │   │   └── terms-of-service/
│   │   │       ├── __tests__/
│   │   │       │   └── [page.test.tsx](./src/app/(settings)/terms-of-service/__tests__/page.test.tsx)
│   │   │       └── [page.tsx](./src/app/(settings)/terms-of-service/page.tsx)
│   │   ├── __tests__/
│   │   │   ├── [cards.test.tsx](./src/app/__tests__/cards.test.tsx)
│   │   │   ├── [dashboard.test.tsx](./src/app/__tests__/dashboard.test.tsx)
│   │   │   ├── [default.test.tsx](./src/app/__tests__/default.test.tsx)
│   │   │   ├── [error.test.tsx](./src/app/__tests__/error.test.tsx)
│   │   │   ├── [forbidden.test.tsx](./src/app/__tests__/forbidden.test.tsx)
│   │   │   ├── [global-error.test.tsx](./src/app/__tests__/global-error.test.tsx)
│   │   │   ├── [layout.test.tsx](./src/app/__tests__/layout.test.tsx)
│   │   │   ├── [loading.test.tsx](./src/app/__tests__/loading.test.tsx)
│   │   │   ├── [not-found.test.tsx](./src/app/__tests__/not-found.test.tsx)
│   │   │   ├── [robots.test.ts](./src/app/__tests__/robots.test.ts)
│   │   │   ├── [template.test.tsx](./src/app/__tests__/template.test.tsx)
│   │   │   ├── [transfer.test.tsx](./src/app/__tests__/transfer.test.tsx)
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
│   │   ├── __tests__/
│   │   │   └── [RouteGuard.test.tsx](./src/components/__tests__/RouteGuard.test.tsx)
│   │   ├── atoms/
│   │   │   ├── __tests__/
│   │   │   │   ├── [AccountCard.test.tsx](./src/components/atoms/__tests__/AccountCard.test.tsx)
│   │   │   │   ├── [AccountDetail.test.tsx](./src/components/atoms/__tests__/AccountDetail.test.tsx)
│   │   │   │   ├── [BalanceCard.test.tsx](./src/components/atoms/__tests__/BalanceCard.test.tsx)
│   │   │   │   ├── [BillItem.test.tsx](./src/components/atoms/__tests__/BillItem.test.tsx)
│   │   │   │   ├── [BudgetCategoryCard.test.tsx](./src/components/atoms/__tests__/BudgetCategoryCard.test.tsx)
│   │   │   │   ├── [CardActions.test.tsx](./src/components/atoms/__tests__/CardActions.test.tsx)
│   │   │   │   ├── [CardDetail.test.tsx](./src/components/atoms/__tests__/CardDetail.test.tsx)
│   │   │   │   ├── [CardItem.test.tsx](./src/components/atoms/__tests__/CardItem.test.tsx)
│   │   │   │   ├── [CardSpending.branches.test.tsx](./src/components/atoms/__tests__/CardSpending.branches.test.tsx)
│   │   │   │   ├── [CardSpending.test.tsx](./src/components/atoms/__tests__/CardSpending.test.tsx)
│   │   │   │   ├── [NotificationItem.test.tsx](./src/components/atoms/__tests__/NotificationItem.test.tsx)
│   │   │   │   ├── [RateItem.test.tsx](./src/components/atoms/__tests__/RateItem.test.tsx)
│   │   │   │   ├── [Skeleton.test.tsx](./src/components/atoms/__tests__/Skeleton.test.tsx)
│   │   │   │   ├── [SpendingChart.test.tsx](./src/components/atoms/__tests__/SpendingChart.test.tsx)
│   │   │   │   ├── [SwipeableTransactionItem.test.tsx](./src/components/atoms/__tests__/SwipeableTransactionItem.test.tsx)
│   │   │   │   ├── [TransactionItem.test.tsx](./src/components/atoms/__tests__/TransactionItem.test.tsx)
│   │   │   │   └── [UserCard.test.tsx](./src/components/atoms/__tests__/UserCard.test.tsx)
│   │   │   ├── [AccountCard.tsx](./src/components/atoms/AccountCard.tsx)
│   │   │   ├── [AccountDetail.tsx](./src/components/atoms/AccountDetail.tsx)
│   │   │   ├── [BalanceCard.tsx](./src/components/atoms/BalanceCard.tsx)
│   │   │   ├── [BillItem.tsx](./src/components/atoms/BillItem.tsx)
│   │   │   ├── [BudgetCategoryCard.tsx](./src/components/atoms/BudgetCategoryCard.tsx)
│   │   │   ├── [CardActions.tsx](./src/components/atoms/CardActions.tsx)
│   │   │   ├── [CardDetail.tsx](./src/components/atoms/CardDetail.tsx)
│   │   │   ├── [CardItem.tsx](./src/components/atoms/CardItem.tsx)
│   │   │   ├── [CardSpending.tsx](./src/components/atoms/CardSpending.tsx)
│   │   │   ├── [NotificationItem.tsx](./src/components/atoms/NotificationItem.tsx)
│   │   │   ├── [RateItem.tsx](./src/components/atoms/RateItem.tsx)
│   │   │   ├── [Skeleton.tsx](./src/components/atoms/Skeleton.tsx)
│   │   │   ├── [SpendingChart.tsx](./src/components/atoms/SpendingChart.tsx)
│   │   │   ├── [SwipeableTransactionItem.tsx](./src/components/atoms/SwipeableTransactionItem.tsx)
│   │   │   ├── [TransactionItem.tsx](./src/components/atoms/TransactionItem.tsx)
│   │   │   ├── [UserCard.tsx](./src/components/atoms/UserCard.tsx)
│   │   │   └── [index.ts](./src/components/atoms/index.ts)
│   │   ├── molecules/
│   │   │   ├── __tests__/
│   │   │   │   ├── [BudgetSummary.test.tsx](./src/components/molecules/__tests__/BudgetSummary.test.tsx)
│   │   │   │   ├── [CurrencyConverter.test.tsx](./src/components/molecules/__tests__/CurrencyConverter.test.tsx)
│   │   │   │   ├── [QRCodeActions.test.tsx](./src/components/molecules/__tests__/QRCodeActions.test.tsx)
│   │   │   │   ├── [QRCodeModal.test.tsx](./src/components/molecules/__tests__/QRCodeModal.test.tsx)
│   │   │   │   ├── [QuickActions.test.tsx](./src/components/molecules/__tests__/QuickActions.test.tsx)
│   │   │   │   ├── [QuickPayForm.test.tsx](./src/components/molecules/__tests__/QuickPayForm.test.tsx)
│   │   │   │   ├── [RateList.test.tsx](./src/components/molecules/__tests__/RateList.test.tsx)
│   │   │   │   ├── [ThemePicker.test.tsx](./src/components/molecules/__tests__/ThemePicker.test.tsx)
│   │   │   │   ├── [TransactionFilters.test.tsx](./src/components/molecules/__tests__/TransactionFilters.test.tsx)
│   │   │   │   ├── [TransferConfirmation.test.tsx](./src/components/molecules/__tests__/TransferConfirmation.test.tsx)
│   │   │   │   └── [TransferForm.test.tsx](./src/components/molecules/__tests__/TransferForm.test.tsx)
│   │   │   ├── [AddAccountModal.tsx](./src/components/molecules/AddAccountModal.tsx)
│   │   │   ├── [AddBillModal.tsx](./src/components/molecules/AddBillModal.tsx)
│   │   │   ├── [BudgetSummary.tsx](./src/components/molecules/BudgetSummary.tsx)
│   │   │   ├── [ContactList.tsx](./src/components/molecules/ContactList.tsx)
│   │   │   ├── [CurrencyAlerts.tsx](./src/components/molecules/CurrencyAlerts.tsx)
│   │   │   ├── [CurrencyConverter.tsx](./src/components/molecules/CurrencyConverter.tsx)
│   │   │   ├── [QRCodeActions.tsx](./src/components/molecules/QRCodeActions.tsx)
│   │   │   ├── [QRCodeModal.tsx](./src/components/molecules/QRCodeModal.tsx)
│   │   │   ├── [QuickActions.tsx](./src/components/molecules/QuickActions.tsx)
│   │   │   ├── [QuickPayForm.tsx](./src/components/molecules/QuickPayForm.tsx)
│   │   │   ├── [RateList.tsx](./src/components/molecules/RateList.tsx)
│   │   │   ├── [SplitBill.tsx](./src/components/molecules/SplitBill.tsx)
│   │   │   ├── [ThemePicker.tsx](./src/components/molecules/ThemePicker.tsx)
│   │   │   ├── [TransactionFilters.tsx](./src/components/molecules/TransactionFilters.tsx)
│   │   │   ├── [TransferConfirmation.tsx](./src/components/molecules/TransferConfirmation.tsx)
│   │   │   ├── [TransferForm.tsx](./src/components/molecules/TransferForm.tsx)
│   │   │   └── [index.ts](./src/components/molecules/index.ts)
│   │   ├── organisms/
│   │   │   ├── __tests__/
│   │   │   │   ├── [BottomNav.test.tsx](./src/components/organisms/__tests__/BottomNav.test.tsx)
│   │   │   │   ├── [Header.test.tsx](./src/components/organisms/__tests__/Header.test.tsx)
│   │   │   │   ├── [SettingsSection.test.tsx](./src/components/organisms/__tests__/SettingsSection.test.tsx)
│   │   │   │   └── [Sidebar.test.tsx](./src/components/organisms/__tests__/Sidebar.test.tsx)
│   │   │   ├── [BottomNav.tsx](./src/components/organisms/BottomNav.tsx)
│   │   │   ├── [Header.tsx](./src/components/organisms/Header.tsx)
│   │   │   ├── [ProfileForm.tsx](./src/components/organisms/ProfileForm.tsx)
│   │   │   ├── [SettingsSection.tsx](./src/components/organisms/SettingsSection.tsx)
│   │   │   ├── [Sidebar.tsx](./src/components/organisms/Sidebar.tsx)
│   │   │   └── [index.ts](./src/components/organisms/index.ts)
│   │   ├── templates/
│   │   │   ├── __tests__/
│   │   │   │   ├── [AboutTemplate.test.tsx](./src/components/templates/__tests__/AboutTemplate.test.tsx)
│   │   │   │   ├── [AuthTemplate.test.tsx](./src/components/templates/__tests__/AuthTemplate.test.tsx)
│   │   │   │   ├── [DashboardTemplate.test.tsx](./src/components/templates/__tests__/DashboardTemplate.test.tsx)
│   │   │   │   ├── [DownloadsTemplate.test.tsx](./src/components/templates/__tests__/DownloadsTemplate.test.tsx)
│   │   │   │   ├── [ErrorTemplate.test.tsx](./src/components/templates/__tests__/ErrorTemplate.test.tsx)
│   │   │   │   └── [VersionTemplate.test.tsx](./src/components/templates/__tests__/VersionTemplate.test.tsx)
│   │   │   ├── [AboutTemplate.tsx](./src/components/templates/AboutTemplate.tsx)
│   │   │   ├── [AuthTemplate.tsx](./src/components/templates/AuthTemplate.tsx)
│   │   │   ├── [DashboardTemplate.tsx](./src/components/templates/DashboardTemplate.tsx)
│   │   │   ├── [DownloadsTemplate.tsx](./src/components/templates/DownloadsTemplate.tsx)
│   │   │   ├── [ErrorTemplate.tsx](./src/components/templates/ErrorTemplate.tsx)
│   │   │   ├── [VersionTemplate.tsx](./src/components/templates/VersionTemplate.tsx)
│   │   │   └── [index.ts](./src/components/templates/index.ts)
│   │   ├── [OfflineBanner.tsx](./src/components/OfflineBanner.tsx)
│   │   ├── [PageTransition.tsx](./src/components/PageTransition.tsx)
│   │   ├── [RouteGuard.tsx](./src/components/RouteGuard.tsx)
│   │   └── [SkipToContent.tsx](./src/components/SkipToContent.tsx)
│   ├── data/
│   │   ├── [mock.ts](./src/data/mock.ts)
│   │   └── [nav.ts](./src/data/nav.ts)
│   ├── hooks/
│   │   ├── __tests__/
│   │   │   ├── [useEntitySync.test.tsx](./src/hooks/__tests__/useEntitySync.test.tsx)
│   │   │   ├── [useHaptic.test.ts](./src/hooks/__tests__/useHaptic.test.ts)
│   │   │   ├── [useMediaQuery.test.ts](./src/hooks/__tests__/useMediaQuery.test.ts)
│   │   │   ├── [usePullToRefresh.test.tsx](./src/hooks/__tests__/usePullToRefresh.test.tsx)
│   │   │   ├── [useSWRegister.test.ts](./src/hooks/__tests__/useSWRegister.test.ts)
│   │   │   └── [useTheme.test.ts](./src/hooks/__tests__/useTheme.test.ts)
│   │   ├── [useEntitySync.ts](./src/hooks/useEntitySync.ts)
│   │   ├── [useHaptic.ts](./src/hooks/useHaptic.ts)
│   │   ├── [useMediaQuery.ts](./src/hooks/useMediaQuery.ts)
│   │   ├── [usePullToRefresh.ts](./src/hooks/usePullToRefresh.ts)
│   │   ├── [useSWRegister.ts](./src/hooks/useSWRegister.ts)
│   │   └── [useTheme.ts](./src/hooks/useTheme.ts)
│   ├── lib/
│   │   ├── __tests__/
│   │   │   ├── [db.test.ts](./src/lib/__tests__/db.test.ts)
│   │   │   └── [seed.test.ts](./src/lib/__tests__/seed.test.ts)
│   │   ├── [db.ts](./src/lib/db.ts)
│   │   └── [seed.ts](./src/lib/seed.ts)
│   ├── providers/
│   │   ├── __tests__/
│   │   │   ├── [DataProvider.crud.test.tsx](./src/providers/__tests__/DataProvider.crud.test.tsx)
│   │   │   ├── [DataProvider.loading.test.tsx](./src/providers/__tests__/DataProvider.loading.test.tsx)
│   │   │   ├── [DataProvider.test.tsx](./src/providers/__tests__/DataProvider.test.tsx)
│   │   │   └── [ToastProvider.test.tsx](./src/providers/__tests__/ToastProvider.test.tsx)
│   │   ├── auth/
│   │   │   └── [AuthProvider.tsx](./src/providers/auth/AuthProvider.tsx)
│   │   ├── entities/
│   │   │   ├── [AccountsProvider.tsx](./src/providers/entities/AccountsProvider.tsx)
│   │   │   ├── [BillsProvider.tsx](./src/providers/entities/BillsProvider.tsx)
│   │   │   ├── [BudgetProvider.tsx](./src/providers/entities/BudgetProvider.tsx)
│   │   │   ├── [CardsProvider.tsx](./src/providers/entities/CardsProvider.tsx)
│   │   │   ├── [ContactsProvider.tsx](./src/providers/entities/ContactsProvider.tsx)
│   │   │   ├── [CurrencyAlertsProvider.tsx](./src/providers/entities/CurrencyAlertsProvider.tsx)
│   │   │   ├── [CurrencyRatesProvider.tsx](./src/providers/entities/CurrencyRatesProvider.tsx)
│   │   │   ├── [FDsProvider.tsx](./src/providers/entities/FDsProvider.tsx)
│   │   │   ├── [GoalsProvider.tsx](./src/providers/entities/GoalsProvider.tsx)
│   │   │   ├── [InsuranceProvider.tsx](./src/providers/entities/InsuranceProvider.tsx)
│   │   │   ├── [LoansProvider.tsx](./src/providers/entities/LoansProvider.tsx)
│   │   │   ├── [NotificationsProvider.tsx](./src/providers/entities/NotificationsProvider.tsx)
│   │   │   ├── [PaymentRequestsProvider.tsx](./src/providers/entities/PaymentRequestsProvider.tsx)
│   │   │   ├── [RDsProvider.tsx](./src/providers/entities/RDsProvider.tsx)
│   │   │   ├── [RecurringTransfersProvider.tsx](./src/providers/entities/RecurringTransfersProvider.tsx)
│   │   │   ├── [RewardsProvider.tsx](./src/providers/entities/RewardsProvider.tsx)
│   │   │   ├── [TransactionsProvider.tsx](./src/providers/entities/TransactionsProvider.tsx)
│   │   │   └── [UserProvider.tsx](./src/providers/entities/UserProvider.tsx)
│   │   ├── [DataProvider.tsx](./src/providers/DataProvider.tsx)
│   │   ├── [Providers.tsx](./src/providers/Providers.tsx)
│   │   ├── [SWProvider.tsx](./src/providers/SWProvider.tsx)
│   │   └── [ToastProvider.tsx](./src/providers/ToastProvider.tsx)
│   ├── styles/
│   │   ├── [base.css](./src/styles/base.css)
│   │   ├── [globals.css](./src/styles/globals.css)
│   │   └── [themes.css](./src/styles/themes.css)
│   ├── test-helpers/
│   │   ├── [db-mock.ts](./src/test-helpers/db-mock.ts)
│   │   ├── [index.ts](./src/test-helpers/index.ts)
│   │   ├── [nav-mock.ts](./src/test-helpers/nav-mock.ts)
│   │   └── [render.tsx](./src/test-helpers/render.tsx)
│   ├── types/
│   │   ├── [index.ts](./src/types/index.ts)
│   │   └── [theme.ts](./src/types/theme.ts)
│   └── utils/
│       ├── __tests__/
│       │   ├── [export.test.ts](./src/utils/__tests__/export.test.ts)
│       │   ├── [format.test.ts](./src/utils/__tests__/format.test.ts)
│       │   └── [iconMap.test.ts](./src/utils/__tests__/iconMap.test.ts)
│       ├── [export.ts](./src/utils/export.ts)
│       ├── [format.ts](./src/utils/format.ts)
│       └── [iconMap.ts](./src/utils/iconMap.ts)
├── src-tauri/
│   ├── capabilities/
│   │   └── [default.json](./src-tauri/capabilities/default.json)
│   ├── gen/
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

120 directories, 325 files
