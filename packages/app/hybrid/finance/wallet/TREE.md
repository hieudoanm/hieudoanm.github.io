# TREE

```text
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
│   │   ├── (auth)/
│   │   │   ├── (recovery)/
│   │   │   │   ├── forgot-password/
│   │   │   │   │   └── [page.tsx](./src/app/(auth)/(recovery)/forgot-password/page.tsx)
│   │   │   │   └── reset-password/
│   │   │   │       └── [page.tsx](./src/app/(auth)/(recovery)/reset-password/page.tsx)
│   │   │   ├── login/
│   │   │   │   └── [page.tsx](./src/app/(auth)/login/page.tsx)
│   │   │   └── register/
│   │   │       └── [page.tsx](./src/app/(auth)/register/page.tsx)
│   │   ├── (dashboard)/
│   │   │   ├── (banking)/
│   │   │   │   ├── card-rewards/
│   │   │   │   │   └── [page.tsx](./src/app/(dashboard)/(banking)/card-rewards/page.tsx)
│   │   │   │   ├── fixed-deposits/
│   │   │   │   │   └── [page.tsx](./src/app/(dashboard)/(banking)/fixed-deposits/page.tsx)
│   │   │   │   ├── insurance/
│   │   │   │   │   └── [page.tsx](./src/app/(dashboard)/(banking)/insurance/page.tsx)
│   │   │   │   ├── recurring-deposits/
│   │   │   │   │   └── [page.tsx](./src/app/(dashboard)/(banking)/recurring-deposits/page.tsx)
│   │   │   │   └── savings-goals/
│   │   │   │       └── [page.tsx](./src/app/(dashboard)/(banking)/savings-goals/page.tsx)
│   │   │   ├── (budgeting)/
│   │   │   │   ├── bills/
│   │   │   │   │   └── [page.tsx](./src/app/(dashboard)/(budgeting)/bills/page.tsx)
│   │   │   │   ├── budget/
│   │   │   │   │   └── [page.tsx](./src/app/(dashboard)/(budgeting)/budget/page.tsx)
│   │   │   │   ├── currency-alerts/
│   │   │   │   │   └── [page.tsx](./src/app/(dashboard)/(budgeting)/currency-alerts/page.tsx)
│   │   │   │   ├── rates/
│   │   │   │   │   └── [page.tsx](./src/app/(dashboard)/(budgeting)/rates/page.tsx)
│   │   │   │   └── recurring-transfers/
│   │   │   │       └── [page.tsx](./src/app/(dashboard)/(budgeting)/recurring-transfers/page.tsx)
│   │   │   ├── (financial)/
│   │   │   │   ├── accounts/
│   │   │   │   │   ├── checking/
│   │   │   │   │   │   └── [page.tsx](./src/app/(dashboard)/(financial)/accounts/checking/page.tsx)
│   │   │   │   │   ├── credit/
│   │   │   │   │   │   └── [page.tsx](./src/app/(dashboard)/(financial)/accounts/credit/page.tsx)
│   │   │   │   │   ├── savings/
│   │   │   │   │   │   └── [page.tsx](./src/app/(dashboard)/(financial)/accounts/savings/page.tsx)
│   │   │   │   │   └── [page.tsx](./src/app/(dashboard)/(financial)/accounts/page.tsx)
│   │   │   │   ├── exchange/
│   │   │   │   │   └── [page.tsx](./src/app/(dashboard)/(financial)/exchange/page.tsx)
│   │   │   │   ├── reports/
│   │   │   │   │   └── [page.tsx](./src/app/(dashboard)/(financial)/reports/page.tsx)
│   │   │   │   └── transactions/
│   │   │   │       └── [page.tsx](./src/app/(dashboard)/(financial)/transactions/page.tsx)
│   │   │   ├── (payments)/
│   │   │   │   ├── cards/
│   │   │   │   │   └── [page.tsx](./src/app/(dashboard)/(payments)/cards/page.tsx)
│   │   │   │   ├── contacts/
│   │   │   │   │   └── [page.tsx](./src/app/(dashboard)/(payments)/contacts/page.tsx)
│   │   │   │   ├── loans/
│   │   │   │   │   └── [page.tsx](./src/app/(dashboard)/(payments)/loans/page.tsx)
│   │   │   │   ├── pay/
│   │   │   │   │   └── [page.tsx](./src/app/(dashboard)/(payments)/pay/page.tsx)
│   │   │   │   ├── payment-requests/
│   │   │   │   │   └── [page.tsx](./src/app/(dashboard)/(payments)/payment-requests/page.tsx)
│   │   │   │   ├── split-bill/
│   │   │   │   │   └── [page.tsx](./src/app/(dashboard)/(payments)/split-bill/page.tsx)
│   │   │   │   └── transfer/
│   │   │   │       └── [page.tsx](./src/app/(dashboard)/(payments)/transfer/page.tsx)
│   │   │   └── [page.tsx](./src/app/(dashboard)/page.tsx)
│   │   ├── (notifications)/
│   │   │   └── notifications/
│   │   │       └── [page.tsx](./src/app/(notifications)/notifications/page.tsx)
│   │   ├── (profile)/
│   │   │   ├── profile/
│   │   │   │   └── [page.tsx](./src/app/(profile)/profile/page.tsx)
│   │   │   └── settings/
│   │   │       └── [page.tsx](./src/app/(profile)/settings/page.tsx)
│   │   ├── (settings)/
│   │   │   ├── help-support/
│   │   │   │   └── [page.tsx](./src/app/(settings)/help-support/page.tsx)
│   │   │   ├── privacy-policy/
│   │   │   │   └── [page.tsx](./src/app/(settings)/privacy-policy/page.tsx)
│   │   │   └── terms-of-service/
│   │   │       └── [page.tsx](./src/app/(settings)/terms-of-service/page.tsx)
│   │   ├── __tests__/
│   │   │   ├── [cards.test.tsx](./src/app/__tests__/cards.test.tsx)
│   │   │   ├── [dashboard.test.tsx](./src/app/__tests__/dashboard.test.tsx)
│   │   │   ├── [login.test.tsx](./src/app/__tests__/login.test.tsx)
│   │   │   └── [transfer.test.tsx](./src/app/__tests__/transfer.test.tsx)
│   │   ├── about/
│   │   │   └── [page.tsx](./src/app/about/page.tsx)
│   │   ├── version/
│   │   │   └── [page.tsx](./src/app/version/page.tsx)
│   │   ├── [error.tsx](./src/app/error.tsx)
│   │   ├── [layout.tsx](./src/app/layout.tsx)
│   │   └── [not-found.tsx](./src/app/not-found.tsx)
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
│   │   │   │   ├── [CardSpending.test.tsx](./src/components/atoms/__tests__/CardSpending.test.tsx)
│   │   │   │   ├── [NotificationItem.test.tsx](./src/components/atoms/__tests__/NotificationItem.test.tsx)
│   │   │   │   ├── [RateItem.test.tsx](./src/components/atoms/__tests__/RateItem.test.tsx)
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
│   │   │   │   └── [Sidebar.test.tsx](./src/components/organisms/__tests__/Sidebar.test.tsx)
│   │   │   ├── [BottomNav.tsx](./src/components/organisms/BottomNav.tsx)
│   │   │   ├── [Header.tsx](./src/components/organisms/Header.tsx)
│   │   │   ├── [ProfileForm.tsx](./src/components/organisms/ProfileForm.tsx)
│   │   │   ├── [SettingsSection.tsx](./src/components/organisms/SettingsSection.tsx)
│   │   │   ├── [Sidebar.tsx](./src/components/organisms/Sidebar.tsx)
│   │   │   └── [index.ts](./src/components/organisms/index.ts)
│   │   ├── templates/
│   │   │   ├── __tests__/
│   │   │   │   ├── [AuthTemplate.test.tsx](./src/components/templates/__tests__/AuthTemplate.test.tsx)
│   │   │   │   └── [DashboardTemplate.test.tsx](./src/components/templates/__tests__/DashboardTemplate.test.tsx)
│   │   │   ├── [AboutTemplate.tsx](./src/components/templates/AboutTemplate.tsx)
│   │   │   ├── [AuthTemplate.tsx](./src/components/templates/AuthTemplate.tsx)
│   │   │   ├── [DashboardTemplate.tsx](./src/components/templates/DashboardTemplate.tsx)
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
│   │   │   ├── [useMediaQuery.test.ts](./src/hooks/__tests__/useMediaQuery.test.ts)
│   │   │   └── [useTheme.test.ts](./src/hooks/__tests__/useTheme.test.ts)
│   │   ├── [useEntitySync.ts](./src/hooks/useEntitySync.ts)
│   │   ├── [useHaptic.ts](./src/hooks/useHaptic.ts)
│   │   ├── [useMediaQuery.ts](./src/hooks/useMediaQuery.ts)
│   │   ├── [usePullToRefresh.ts](./src/hooks/usePullToRefresh.ts)
│   │   ├── [useSWRegister.ts](./src/hooks/useSWRegister.ts)
│   │   └── [useTheme.ts](./src/hooks/useTheme.ts)
│   ├── lib/
│   │   ├── __tests__/
│   │   │   └── [db.test.ts](./src/lib/__tests__/db.test.ts)
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
│   │   └── [globals.css](./src/styles/globals.css)
│   ├── types/
│   │   ├── [index.ts](./src/types/index.ts)
│   │   └── [theme.ts](./src/types/theme.ts)
│   └── utils/
│       ├── __tests__/
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

81 directories, 229 files
