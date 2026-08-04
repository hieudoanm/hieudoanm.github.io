# TREE

```text
├── docs/
│   ├── [ARCHITECTURE.md](./docs/ARCHITECTURE.md)
│   ├── [CONTRIBUTING.md](./docs/CONTRIBUTING.md)
│   └── [ROADMAP.md](./docs/ROADMAP.md)
├── e2e/
│   └── [index.spec.ts](./e2e/index.spec.ts)
├── public/
│   ├── icons/
│   │   ├── [icon-192.png](./public/icons/icon-192.png)
│   │   ├── [icon-512.png](./public/icons/icon-512.png)
│   │   └── [icon.svg](./public/icons/icon.svg)
│   ├── [favicon.ico](./public/favicon.ico)
│   ├── [manifest.json](./public/manifest.json)
│   └── [sw.js](./public/sw.js)
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── forgot-password/
│   │   │   │   └── [page.tsx](./src/app/(auth)/forgot-password/page.tsx)
│   │   │   ├── reset-password/
│   │   │   │   └── [page.tsx](./src/app/(auth)/reset-password/page.tsx)
│   │   │   ├── sign-in/
│   │   │   │   └── [page.tsx](./src/app/(auth)/sign-in/page.tsx)
│   │   │   ├── sign-up/
│   │   │   │   └── [page.tsx](./src/app/(auth)/sign-up/page.tsx)
│   │   │   └── [loading.tsx](./src/app/(auth)/loading.tsx)
│   │   ├── (main)/
│   │   │   ├── (app)/
│   │   │   │   ├── dashboard/
│   │   │   │   │   └── [page.tsx](./src/app/(main)/(app)/dashboard/page.tsx)
│   │   │   │   ├── profile/
│   │   │   │   │   └── [page.tsx](./src/app/(main)/(app)/profile/page.tsx)
│   │   │   │   ├── settings/
│   │   │   │   │   └── [page.tsx](./src/app/(main)/(app)/settings/page.tsx)
│   │   │   │   ├── version/
│   │   │   │   │   └── [page.tsx](./src/app/(main)/(app)/version/page.tsx)
│   │   │   │   └── [loading.tsx](./src/app/(main)/(app)/loading.tsx)
│   │   │   ├── (info)/
│   │   │   │   ├── about/
│   │   │   │   │   └── [page.tsx](./src/app/(main)/(info)/about/page.tsx)
│   │   │   │   ├── coming-soon/
│   │   │   │   │   └── [page.tsx](./src/app/(main)/(info)/coming-soon/page.tsx)
│   │   │   │   ├── maintenance/
│   │   │   │   │   └── [page.tsx](./src/app/(main)/(info)/maintenance/page.tsx)
│   │   │   │   └── search/
│   │   │   │       └── [page.tsx](./src/app/(main)/(info)/search/page.tsx)
│   │   │   ├── blog/
│   │   │   │   ├── [slug]/
│   │   │   │   │   └── [page.tsx](./src/app/(main)/blog/[slug]/page.tsx)
│   │   │   │   ├── [loading.tsx](./src/app/(main)/blog/loading.tsx)
│   │   │   │   └── [page.tsx](./src/app/(main)/blog/page.tsx)
│   │   │   └── store/
│   │   │       ├── [id]/
│   │   │       │   └── [page.tsx](./src/app/(main)/store/[id]/page.tsx)
│   │   │       ├── cart/
│   │   │       │   └── [page.tsx](./src/app/(main)/store/cart/page.tsx)
│   │   │       ├── checkout/
│   │   │       │   └── [page.tsx](./src/app/(main)/store/checkout/page.tsx)
│   │   │       ├── order-confirmation/
│   │   │       │   └── [page.tsx](./src/app/(main)/store/order-confirmation/page.tsx)
│   │   │       ├── order-history/
│   │   │       │   └── [page.tsx](./src/app/(main)/store/order-history/page.tsx)
│   │   │       ├── [loading.tsx](./src/app/(main)/store/loading.tsx)
│   │   │       └── [page.tsx](./src/app/(main)/store/page.tsx)
│   │   ├── (marketing)/
│   │   │   ├── landing/
│   │   │   │   └── [page.tsx](./src/app/(marketing)/landing/page.tsx)
│   │   │   ├── privacy/
│   │   │   │   └── [page.tsx](./src/app/(marketing)/privacy/page.tsx)
│   │   │   ├── resume/
│   │   │   │   └── [page.tsx](./src/app/(marketing)/resume/page.tsx)
│   │   │   └── terms/
│   │   │       └── [page.tsx](./src/app/(marketing)/terms/page.tsx)
│   │   ├── [error.tsx](./src/app/error.tsx)
│   │   ├── [global-error.tsx](./src/app/global-error.tsx)
│   │   ├── [layout.tsx](./src/app/layout.tsx)
│   │   ├── [not-found.tsx](./src/app/not-found.tsx)
│   │   └── [page.tsx](./src/app/page.tsx)
│   ├── components/
│   │   ├── atoms/
│   │   │   ├── [Avatar.tsx](./src/components/atoms/Avatar.tsx)
│   │   │   ├── [Badge.tsx](./src/components/atoms/Badge.tsx)
│   │   │   ├── [Separator.tsx](./src/components/atoms/Separator.tsx)
│   │   │   ├── [Skeleton.tsx](./src/components/atoms/Skeleton.tsx)
│   │   │   ├── [Spinner.tsx](./src/components/atoms/Spinner.tsx)
│   │   │   └── [TextField.tsx](./src/components/atoms/TextField.tsx)
│   │   ├── molecules/
│   │   │   ├── [Card.tsx](./src/components/molecules/Card.tsx)
│   │   │   ├── [Dropdown.tsx](./src/components/molecules/Dropdown.tsx)
│   │   │   ├── [EmptyState.tsx](./src/components/molecules/EmptyState.tsx)
│   │   │   ├── [Modal.tsx](./src/components/molecules/Modal.tsx)
│   │   │   ├── [Tabs.tsx](./src/components/molecules/Tabs.tsx)
│   │   │   └── [Toast.tsx](./src/components/molecules/Toast.tsx)
│   │   ├── organisms/
│   │   │   ├── [Header.tsx](./src/components/organisms/Header.tsx)
│   │   │   └── [Navbar.tsx](./src/components/organisms/Navbar.tsx)
│   │   └── templates/
│   │       ├── app/
│   │       │   ├── __tests__/
│   │       │   │   ├── __snapshots__/
│   │       │   │   │   └── [ChatTemplate.test.tsx.snap](./src/components/templates/app/__tests__/__snapshots__/ChatTemplate.test.tsx.snap)
│   │       │   │   └── [ChatTemplate.test.tsx](./src/components/templates/app/__tests__/ChatTemplate.test.tsx)
│   │       │   ├── [AppLoadingTemplate.tsx](./src/components/templates/app/AppLoadingTemplate.tsx)
│   │       │   ├── [ChatTemplate.tsx](./src/components/templates/app/ChatTemplate.tsx)
│   │       │   ├── [DashboardTemplate.tsx](./src/components/templates/app/DashboardTemplate.tsx)
│   │       │   ├── [ProfileTemplate.tsx](./src/components/templates/app/ProfileTemplate.tsx)
│   │       │   ├── [SettingsTemplate.tsx](./src/components/templates/app/SettingsTemplate.tsx)
│   │       │   ├── [VersionTemplate.tsx](./src/components/templates/app/VersionTemplate.tsx)
│   │       │   └── [index.ts](./src/components/templates/app/index.ts)
│   │       ├── auth/
│   │       │   ├── [AuthLoadingTemplate.tsx](./src/components/templates/auth/AuthLoadingTemplate.tsx)
│   │       │   ├── [ForgetPassword.tsx](./src/components/templates/auth/ForgetPassword.tsx)
│   │       │   ├── [ResetPassword.tsx](./src/components/templates/auth/ResetPassword.tsx)
│   │       │   ├── [SignInTemplate.tsx](./src/components/templates/auth/SignInTemplate.tsx)
│   │       │   ├── [SignUpTemplate.tsx](./src/components/templates/auth/SignUpTemplate.tsx)
│   │       │   └── [index.ts](./src/components/templates/auth/index.ts)
│   │       ├── blog/
│   │       │   ├── [BlogItemTemplate.tsx](./src/components/templates/blog/BlogItemTemplate.tsx)
│   │       │   ├── [BlogListTemplate.tsx](./src/components/templates/blog/BlogListTemplate.tsx)
│   │       │   ├── [BlogLoadingTemplate.tsx](./src/components/templates/blog/BlogLoadingTemplate.tsx)
│   │       │   └── [index.ts](./src/components/templates/blog/index.ts)
│   │       ├── landing/
│   │       │   ├── [LandingTemplate.tsx](./src/components/templates/landing/LandingTemplate.tsx)
│   │       │   ├── [PrivacyTemplate.tsx](./src/components/templates/landing/PrivacyTemplate.tsx)
│   │       │   ├── [TermsTemplate.tsx](./src/components/templates/landing/TermsTemplate.tsx)
│   │       │   └── [index.ts](./src/components/templates/landing/index.ts)
│   │       ├── resume/
│   │       │   ├── [ResumeTemplate.tsx](./src/components/templates/resume/ResumeTemplate.tsx)
│   │       │   └── [index.ts](./src/components/templates/resume/index.ts)
│   │       ├── shared/
│   │       │   ├── ComponentsTemplate/
│   │       │   │   ├── demo/
│   │       │   │   │   ├── colors/
│   │       │   │   │   │   └── [ColorPalette.tsx](./src/components/templates/shared/ComponentsTemplate/demo/colors/ColorPalette.tsx)
│   │       │   │   │   ├── components/
│   │       │   │   │   │   ├── components/
│   │       │   │   │   │   │   ├── [AdminMenuCard.tsx](./src/components/templates/shared/ComponentsTemplate/demo/components/components/AdminMenuCard.tsx)
│   │       │   │   │   │   │   ├── [AlertDashWarning.tsx](./src/components/templates/shared/ComponentsTemplate/demo/components/components/AlertDashWarning.tsx)
│   │       │   │   │   │   │   ├── [AlertOutlineSuccess.tsx](./src/components/templates/shared/ComponentsTemplate/demo/components/components/AlertOutlineSuccess.tsx)
│   │       │   │   │   │   │   ├── [AlertSoftError.tsx](./src/components/templates/shared/ComponentsTemplate/demo/components/components/AlertSoftError.tsx)
│   │       │   │   │   │   │   ├── [AlertSolidInfo.tsx](./src/components/templates/shared/ComponentsTemplate/demo/components/components/AlertSolidInfo.tsx)
│   │       │   │   │   │   │   ├── [BarChartCard.tsx](./src/components/templates/shared/ComponentsTemplate/demo/components/components/BarChartCard.tsx)
│   │       │   │   │   │   │   ├── [CalendarCard.tsx](./src/components/templates/shared/ComponentsTemplate/demo/components/components/CalendarCard.tsx)
│   │       │   │   │   │   │   ├── [ChatCard.tsx](./src/components/templates/shared/ComponentsTemplate/demo/components/components/ChatCard.tsx)
│   │       │   │   │   │   │   ├── [DockDemo.tsx](./src/components/templates/shared/ComponentsTemplate/demo/components/components/DockDemo.tsx)
│   │       │   │   │   │   │   ├── [FilterCard.tsx](./src/components/templates/shared/ComponentsTemplate/demo/components/components/FilterCard.tsx)
│   │       │   │   │   │   │   ├── [MediaPlayerCard.tsx](./src/components/templates/shared/ComponentsTemplate/demo/components/components/MediaPlayerCard.tsx)
│   │       │   │   │   │   │   ├── [MockupCodeCard.tsx](./src/components/templates/shared/ComponentsTemplate/demo/components/components/MockupCodeCard.tsx)
│   │       │   │   │   │   │   ├── [PriceRangeCard.tsx](./src/components/templates/shared/ComponentsTemplate/demo/components/components/PriceRangeCard.tsx)
│   │       │   │   │   │   │   ├── [PricingCard.tsx](./src/components/templates/shared/ComponentsTemplate/demo/components/components/PricingCard.tsx)
│   │       │   │   │   │   │   ├── [ProductCard.tsx](./src/components/templates/shared/ComponentsTemplate/demo/components/components/ProductCard.tsx)
│   │       │   │   │   │   │   ├── [RecentOrdersCard.tsx](./src/components/templates/shared/ComponentsTemplate/demo/components/components/RecentOrdersCard.tsx)
│   │       │   │   │   │   │   ├── [RegistrationCard.tsx](./src/components/templates/shared/ComponentsTemplate/demo/components/components/RegistrationCard.tsx)
│   │       │   │   │   │   │   ├── [RevenueStatsCard.tsx](./src/components/templates/shared/ComponentsTemplate/demo/components/components/RevenueStatsCard.tsx)
│   │       │   │   │   │   │   ├── [SearchJoin.tsx](./src/components/templates/shared/ComponentsTemplate/demo/components/components/SearchJoin.tsx)
│   │       │   │   │   │   │   ├── [StatsRadialCard.tsx](./src/components/templates/shared/ComponentsTemplate/demo/components/components/StatsRadialCard.tsx)
│   │       │   │   │   │   │   ├── [TabsCard.tsx](./src/components/templates/shared/ComponentsTemplate/demo/components/components/TabsCard.tsx)
│   │       │   │   │   │   │   ├── [TimelineDemo.tsx](./src/components/templates/shared/ComponentsTemplate/demo/components/components/TimelineDemo.tsx)
│   │       │   │   │   │   │   ├── [WritePostCard.tsx](./src/components/templates/shared/ComponentsTemplate/demo/components/components/WritePostCard.tsx)
│   │       │   │   │   │   │   └── [index.ts](./src/components/templates/shared/ComponentsTemplate/demo/components/components/index.ts)
│   │       │   │   │   │   ├── [ComponentsDemo.tsx](./src/components/templates/shared/ComponentsTemplate/demo/components/ComponentsDemo.tsx)
│   │       │   │   │   │   ├── [ComponentsDemoColumn1.tsx](./src/components/templates/shared/ComponentsTemplate/demo/components/ComponentsDemoColumn1.tsx)
│   │       │   │   │   │   ├── [ComponentsDemoColumn2.tsx](./src/components/templates/shared/ComponentsTemplate/demo/components/ComponentsDemoColumn2.tsx)
│   │       │   │   │   │   ├── [ComponentsDemoColumn3.tsx](./src/components/templates/shared/ComponentsTemplate/demo/components/ComponentsDemoColumn3.tsx)
│   │       │   │   │   │   └── [index.ts](./src/components/templates/shared/ComponentsTemplate/demo/components/index.ts)
│   │       │   │   │   ├── pages/
│   │       │   │   │   │   └── [PagesDirectory.tsx](./src/components/templates/shared/ComponentsTemplate/demo/pages/PagesDirectory.tsx)
│   │       │   │   │   ├── [PreviewTabs.tsx](./src/components/templates/shared/ComponentsTemplate/demo/PreviewTabs.tsx)
│   │       │   │   │   └── [PreviewTabsPane.tsx](./src/components/templates/shared/ComponentsTemplate/demo/PreviewTabsPane.tsx)
│   │       │   │   ├── editor/
│   │       │   │   │   ├── colors/
│   │       │   │   │   │   ├── [ColorPicker.tsx](./src/components/templates/shared/ComponentsTemplate/editor/colors/ColorPicker.tsx)
│   │       │   │   │   │   ├── [ColorsPane.tsx](./src/components/templates/shared/ComponentsTemplate/editor/colors/ColorsPane.tsx)
│   │       │   │   │   │   └── [index.ts](./src/components/templates/shared/ComponentsTemplate/editor/colors/index.ts)
│   │       │   │   │   ├── presets/
│   │       │   │   │   │   ├── [ThemePresets.tsx](./src/components/templates/shared/ComponentsTemplate/editor/presets/ThemePresets.tsx)
│   │       │   │   │   │   ├── [ThemeSwatches.tsx](./src/components/templates/shared/ComponentsTemplate/editor/presets/ThemeSwatches.tsx)
│   │       │   │   │   │   └── [index.ts](./src/components/templates/shared/ComponentsTemplate/editor/presets/index.ts)
│   │       │   │   │   ├── settings/
│   │       │   │   │   │   ├── [SettingsPane.tsx](./src/components/templates/shared/ComponentsTemplate/editor/settings/SettingsPane.tsx)
│   │       │   │   │   │   ├── [editor-controls.tsx](./src/components/templates/shared/ComponentsTemplate/editor/settings/editor-controls.tsx)
│   │       │   │   │   │   └── [index.ts](./src/components/templates/shared/ComponentsTemplate/editor/settings/index.ts)
│   │       │   │   │   ├── [ThemeConfig.ts](./src/components/templates/shared/ComponentsTemplate/editor/ThemeConfig.ts)
│   │       │   │   │   ├── [ThemeEditor.tsx](./src/components/templates/shared/ComponentsTemplate/editor/ThemeEditor.tsx)
│   │       │   │   │   ├── [ThemeEditorPane.tsx](./src/components/templates/shared/ComponentsTemplate/editor/ThemeEditorPane.tsx)
│   │       │   │   │   ├── [css-utils.ts](./src/components/templates/shared/ComponentsTemplate/editor/css-utils.ts)
│   │       │   │   │   ├── [index.ts](./src/components/templates/shared/ComponentsTemplate/editor/index.ts)
│   │       │   │   │   └── [theme-data.ts](./src/components/templates/shared/ComponentsTemplate/editor/theme-data.ts)
│   │       │   │   ├── [ComponentsTemplate.tsx](./src/components/templates/shared/ComponentsTemplate/ComponentsTemplate.tsx)
│   │       │   │   └── [index.ts](./src/components/templates/shared/ComponentsTemplate/index.ts)
│   │       │   ├── [AboutTemplate.tsx](./src/components/templates/shared/AboutTemplate.tsx)
│   │       │   ├── [ComingSoonTemplate.tsx](./src/components/templates/shared/ComingSoonTemplate.tsx)
│   │       │   ├── [CookieConsentTemplate.tsx](./src/components/templates/shared/CookieConsentTemplate.tsx)
│   │       │   ├── [ErrorTemplate.tsx](./src/components/templates/shared/ErrorTemplate.tsx)
│   │       │   ├── [GlobalErrorTemplate.tsx](./src/components/templates/shared/GlobalErrorTemplate.tsx)
│   │       │   ├── [MaintenanceTemplate.tsx](./src/components/templates/shared/MaintenanceTemplate.tsx)
│   │       │   ├── [NotFoundTemplate.tsx](./src/components/templates/shared/NotFoundTemplate.tsx)
│   │       │   ├── [OnboardingTemplate.tsx](./src/components/templates/shared/OnboardingTemplate.tsx)
│   │       │   ├── [PageShell.tsx](./src/components/templates/shared/PageShell.tsx)
│   │       │   ├── [SearchTemplate.tsx](./src/components/templates/shared/SearchTemplate.tsx)
│   │       │   └── [index.ts](./src/components/templates/shared/index.ts)
│   │       └── store/
│   │           ├── [CartTemplate.tsx](./src/components/templates/store/CartTemplate.tsx)
│   │           ├── [CheckoutTemplate.tsx](./src/components/templates/store/CheckoutTemplate.tsx)
│   │           ├── [OrderConfirmationTemplate.tsx](./src/components/templates/store/OrderConfirmationTemplate.tsx)
│   │           ├── [OrderHistoryTemplate.tsx](./src/components/templates/store/OrderHistoryTemplate.tsx)
│   │           ├── [StoreFrontTemplate.tsx](./src/components/templates/store/StoreFrontTemplate.tsx)
│   │           ├── [StoreItemTemplate.tsx](./src/components/templates/store/StoreItemTemplate.tsx)
│   │           ├── [StoreLoadingTemplate.tsx](./src/components/templates/store/StoreLoadingTemplate.tsx)
│   │           └── [index.ts](./src/components/templates/store/index.ts)
│   ├── hooks/
│   │   └── [useSWRegister.ts](./src/hooks/useSWRegister.ts)
│   ├── providers/
│   │   └── [SWProvider.tsx](./src/providers/SWProvider.tsx)
│   └── styles/
│       ├── [base.css](./src/styles/base.css)
│       ├── [globals.css](./src/styles/globals.css)
│       └── [themes.css](./src/styles/themes.css)
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

67 directories, 191 files
