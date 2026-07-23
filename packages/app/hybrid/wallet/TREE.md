# TREE

```text
├── e2e/
│   ├── [auth.spec.ts](./e2e/auth.spec.ts)
│   ├── [cards.spec.ts](./e2e/cards.spec.ts)
│   ├── [exchange.spec.ts](./e2e/exchange.spec.ts)
│   ├── [helpers.ts](./e2e/helpers.ts)
│   ├── [index.spec.ts](./e2e/index.spec.ts)
│   ├── [navigation.spec.ts](./e2e/navigation.spec.ts)
│   ├── [pay.spec.ts](./e2e/pay.spec.ts)
│   ├── [profile.spec.ts](./e2e/profile.spec.ts)
│   ├── [transactions.spec.ts](./e2e/transactions.spec.ts)
│   └── [transfer.spec.ts](./e2e/transfer.spec.ts)
├── public/
│   └── [favicon.ico](./public/favicon.ico)
├── src/
│   ├── app/
│   │   ├── accounts/
│   │   │   └── [page.tsx](./src/app/accounts/page.tsx)
│   │   ├── bills/
│   │   │   └── [page.tsx](./src/app/bills/page.tsx)
│   │   ├── budget/
│   │   │   └── [page.tsx](./src/app/budget/page.tsx)
│   │   ├── cards/
│   │   │   └── [page.tsx](./src/app/cards/page.tsx)
│   │   ├── exchange/
│   │   │   └── [page.tsx](./src/app/exchange/page.tsx)
│   │   ├── help-support/
│   │   │   └── [page.tsx](./src/app/help-support/page.tsx)
│   │   ├── login/
│   │   │   └── [page.tsx](./src/app/login/page.tsx)
│   │   ├── notifications/
│   │   │   └── [page.tsx](./src/app/notifications/page.tsx)
│   │   ├── pay/
│   │   │   └── [page.tsx](./src/app/pay/page.tsx)
│   │   ├── privacy-policy/
│   │   │   └── [page.tsx](./src/app/privacy-policy/page.tsx)
│   │   ├── profile/
│   │   │   └── [page.tsx](./src/app/profile/page.tsx)
│   │   ├── register/
│   │   │   └── [page.tsx](./src/app/register/page.tsx)
│   │   ├── terms-of-service/
│   │   │   └── [page.tsx](./src/app/terms-of-service/page.tsx)
│   │   ├── transactions/
│   │   │   └── [page.tsx](./src/app/transactions/page.tsx)
│   │   ├── transfer/
│   │   │   └── [page.tsx](./src/app/transfer/page.tsx)
│   │   ├── [error.tsx](./src/app/error.tsx)
│   │   ├── [layout.tsx](./src/app/layout.tsx)
│   │   ├── [not-found.tsx](./src/app/not-found.tsx)
│   │   └── [page.tsx](./src/app/page.tsx)
│   ├── components/
│   │   ├── atoms/
│   │   │   ├── __tests__/
│   │   │   │   ├── [AccountCard.test.tsx](./src/components/atoms/__tests__/AccountCard.test.tsx)
│   │   │   │   ├── [AccountDetail.test.tsx](./src/components/atoms/__tests__/AccountDetail.test.tsx)
│   │   │   │   ├── [BalanceCard.test.tsx](./src/components/atoms/__tests__/BalanceCard.test.tsx)
│   │   │   │   ├── [BillItem.test.tsx](./src/components/atoms/__tests__/BillItem.test.tsx)
│   │   │   │   ├── [BudgetCategoryCard.test.tsx](./src/components/atoms/__tests__/BudgetCategoryCard.test.tsx)
│   │   │   │   ├── [CardDetail.test.tsx](./src/components/atoms/__tests__/CardDetail.test.tsx)
│   │   │   │   ├── [CardItem.test.tsx](./src/components/atoms/__tests__/CardItem.test.tsx)
│   │   │   │   ├── [NotificationItem.test.tsx](./src/components/atoms/__tests__/NotificationItem.test.tsx)
│   │   │   │   ├── [RateItem.test.tsx](./src/components/atoms/__tests__/RateItem.test.tsx)
│   │   │   │   ├── [TransactionItem.test.tsx](./src/components/atoms/__tests__/TransactionItem.test.tsx)
│   │   │   │   └── [UserCard.test.tsx](./src/components/atoms/__tests__/UserCard.test.tsx)
│   │   │   ├── [AccountCard.tsx](./src/components/atoms/AccountCard.tsx)
│   │   │   ├── [AccountDetail.tsx](./src/components/atoms/AccountDetail.tsx)
│   │   │   ├── [BalanceCard.tsx](./src/components/atoms/BalanceCard.tsx)
│   │   │   ├── [BillItem.tsx](./src/components/atoms/BillItem.tsx)
│   │   │   ├── [BudgetCategoryCard.tsx](./src/components/atoms/BudgetCategoryCard.tsx)
│   │   │   ├── [CardDetail.tsx](./src/components/atoms/CardDetail.tsx)
│   │   │   ├── [CardItem.tsx](./src/components/atoms/CardItem.tsx)
│   │   │   ├── [NotificationItem.tsx](./src/components/atoms/NotificationItem.tsx)
│   │   │   ├── [RateItem.tsx](./src/components/atoms/RateItem.tsx)
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
│   │   │   ├── [BudgetSummary.tsx](./src/components/molecules/BudgetSummary.tsx)
│   │   │   ├── [CurrencyConverter.tsx](./src/components/molecules/CurrencyConverter.tsx)
│   │   │   ├── [QRCodeActions.tsx](./src/components/molecules/QRCodeActions.tsx)
│   │   │   ├── [QRCodeModal.tsx](./src/components/molecules/QRCodeModal.tsx)
│   │   │   ├── [QuickActions.tsx](./src/components/molecules/QuickActions.tsx)
│   │   │   ├── [QuickPayForm.tsx](./src/components/molecules/QuickPayForm.tsx)
│   │   │   ├── [RateList.tsx](./src/components/molecules/RateList.tsx)
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
│   │   │   ├── [Sidebar.tsx](./src/components/organisms/Sidebar.tsx)
│   │   │   └── [index.ts](./src/components/organisms/index.ts)
│   │   ├── templates/
│   │   │   ├── __tests__/
│   │   │   │   ├── [AuthTemplate.test.tsx](./src/components/templates/__tests__/AuthTemplate.test.tsx)
│   │   │   │   └── [DashboardTemplate.test.tsx](./src/components/templates/__tests__/DashboardTemplate.test.tsx)
│   │   │   ├── [AuthTemplate.tsx](./src/components/templates/AuthTemplate.tsx)
│   │   │   ├── [DashboardTemplate.tsx](./src/components/templates/DashboardTemplate.tsx)
│   │   │   └── [index.ts](./src/components/templates/index.ts)
│   │   └── [RouteGuard.tsx](./src/components/RouteGuard.tsx)
│   ├── data/
│   │   ├── [mock.ts](./src/data/mock.ts)
│   │   └── [nav.ts](./src/data/nav.ts)
│   ├── hooks/
│   │   ├── __tests__/
│   │   │   ├── [useMediaQuery.test.ts](./src/hooks/__tests__/useMediaQuery.test.ts)
│   │   │   └── [useTheme.test.ts](./src/hooks/__tests__/useTheme.test.ts)
│   │   ├── [useMediaQuery.ts](./src/hooks/useMediaQuery.ts)
│   │   └── [useTheme.ts](./src/hooks/useTheme.ts)
│   ├── lib/
│   │   └── [db.ts](./src/lib/db.ts)
│   ├── providers/
│   │   ├── [DataProvider.tsx](./src/providers/DataProvider.tsx)
│   │   ├── [Providers.tsx](./src/providers/Providers.tsx)
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
│       ├── [format.ts](./src/utils/format.ts)
│       └── [iconMap.ts](./src/utils/iconMap.ts)
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
│   ├── [Cargo.toml](./src-tauri/Cargo.toml)
│   ├── [build.rs](./src-tauri/build.rs)
│   └── [tauri.conf.json](./src-tauri/tauri.conf.json)
├── [LICENSE](./LICENSE)
├── [PLAN.md](./PLAN.md)
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

41 directories, 140 files
