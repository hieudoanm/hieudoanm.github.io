# TREE

```text
├── tax/
│   ├── docs/
│   │   ├── [ARCHITECTURE.md](./tax/docs/ARCHITECTURE.md)
│   │   ├── [CONTRIBUTING.md](./tax/docs/CONTRIBUTING.md)
│   │   ├── [DOWNLOADS.md](./tax/docs/DOWNLOADS.md)
│   │   ├── [PACKAGING.md](./tax/docs/PACKAGING.md)
│   │   └── [ROADMAP.md](./tax/docs/ROADMAP.md)
│   ├── e2e/
│   │   ├── screenshots/
│   │   │   ├── [about.png](./tax/e2e/screenshots/about.png)
│   │   │   ├── [downloads.png](./tax/e2e/screenshots/downloads.png)
│   │   │   ├── [home.png](./tax/e2e/screenshots/home.png)
│   │   │   └── [version.png](./tax/e2e/screenshots/version.png)
│   │   ├── [about.spec.ts](./tax/e2e/about.spec.ts)
│   │   ├── [calculator.spec.ts](./tax/e2e/calculator.spec.ts)
│   │   ├── [downloads.spec.ts](./tax/e2e/downloads.spec.ts)
│   │   ├── [helpers.ts](./tax/e2e/helpers.ts)
│   │   ├── [home.spec.ts](./tax/e2e/home.spec.ts)
│   │   ├── [index.spec.ts](./tax/e2e/index.spec.ts)
│   │   ├── [navigation.spec.ts](./tax/e2e/navigation.spec.ts)
│   │   └── [version.spec.ts](./tax/e2e/version.spec.ts)
│   ├── public/
│   │   ├── icons/
│   │   │   ├── [icon-128x128.png](./tax/public/icons/icon-128x128.png)
│   │   │   ├── [icon-16x16.png](./tax/public/icons/icon-16x16.png)
│   │   │   ├── [icon-192x192.png](./tax/public/icons/icon-192x192.png)
│   │   │   ├── [icon-256x256.png](./tax/public/icons/icon-256x256.png)
│   │   │   ├── [icon-32x32.png](./tax/public/icons/icon-32x32.png)
│   │   │   ├── [icon-48x48.png](./tax/public/icons/icon-48x48.png)
│   │   │   ├── [icon-512x512.png](./tax/public/icons/icon-512x512.png)
│   │   │   ├── [icon-64x64.png](./tax/public/icons/icon-64x64.png)
│   │   │   └── [icon.svg](./tax/public/icons/icon.svg)
│   │   ├── [apple-touch-icon.png](./tax/public/apple-touch-icon.png)
│   │   ├── [favicon.ico](./tax/public/favicon.ico)
│   │   ├── [manifest.json](./tax/public/manifest.json)
│   │   ├── [robots.txt](./tax/public/robots.txt)
│   │   ├── [sitemap.xml](./tax/public/sitemap.xml)
│   │   └── [sw.js](./tax/public/sw.js)
│   ├── src/
│   │   ├── app/
│   │   │   ├── (auth)/
│   │   │   │   ├── forget-password/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./tax/src/app/(auth)/forget-password/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./tax/src/app/(auth)/forget-password/page.tsx)
│   │   │   │   ├── profile/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./tax/src/app/(auth)/profile/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./tax/src/app/(auth)/profile/page.tsx)
│   │   │   │   ├── reset-password/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./tax/src/app/(auth)/reset-password/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./tax/src/app/(auth)/reset-password/page.tsx)
│   │   │   │   ├── sign-in/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./tax/src/app/(auth)/sign-in/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./tax/src/app/(auth)/sign-in/page.tsx)
│   │   │   │   └── sign-up/
│   │   │   │       ├── __tests__/
│   │   │   │       │   └── [page.test.tsx](./tax/src/app/(auth)/sign-up/__tests__/page.test.tsx)
│   │   │   │       └── [page.tsx](./tax/src/app/(auth)/sign-up/page.tsx)
│   │   │   ├── (info)/
│   │   │   │   ├── about/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./tax/src/app/(info)/about/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./tax/src/app/(info)/about/page.tsx)
│   │   │   │   ├── downloads/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./tax/src/app/(info)/downloads/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./tax/src/app/(info)/downloads/page.tsx)
│   │   │   │   └── version/
│   │   │   │       ├── __tests__/
│   │   │   │       │   └── [page.test.tsx](./tax/src/app/(info)/version/__tests__/page.test.tsx)
│   │   │   │       └── [page.tsx](./tax/src/app/(info)/version/page.tsx)
│   │   │   ├── __tests__/
│   │   │   │   ├── [audit-detail-page.test.tsx](./tax/src/app/__tests__/audit-detail-page.test.tsx)
│   │   │   │   ├── [audit-page.test.tsx](./tax/src/app/__tests__/audit-page.test.tsx)
│   │   │   │   ├── [business-page.test.tsx](./tax/src/app/__tests__/business-page.test.tsx)
│   │   │   │   ├── [calculator-page.test.tsx](./tax/src/app/__tests__/calculator-page.test.tsx)
│   │   │   │   ├── [error.test.tsx](./tax/src/app/__tests__/error.test.tsx)
│   │   │   │   ├── [forbidden.test.tsx](./tax/src/app/__tests__/forbidden.test.tsx)
│   │   │   │   ├── [global-error.test.tsx](./tax/src/app/__tests__/global-error.test.tsx)
│   │   │   │   ├── [layout.test.tsx](./tax/src/app/__tests__/layout.test.tsx)
│   │   │   │   ├── [loading.test.tsx](./tax/src/app/__tests__/loading.test.tsx)
│   │   │   │   ├── [new-submission-page.test.tsx](./tax/src/app/__tests__/new-submission-page.test.tsx)
│   │   │   │   ├── [not-found.test.tsx](./tax/src/app/__tests__/not-found.test.tsx)
│   │   │   │   ├── [page.test.tsx](./tax/src/app/__tests__/page.test.tsx)
│   │   │   │   ├── [personal-page.test.tsx](./tax/src/app/__tests__/personal-page.test.tsx)
│   │   │   │   ├── [robots.test.ts](./tax/src/app/__tests__/robots.test.ts)
│   │   │   │   ├── [settings-page.test.tsx](./tax/src/app/__tests__/settings-page.test.tsx)
│   │   │   │   ├── [submission-detail-page.test.tsx](./tax/src/app/__tests__/submission-detail-page.test.tsx)
│   │   │   │   ├── [submission-page.test.tsx](./tax/src/app/__tests__/submission-page.test.tsx)
│   │   │   │   ├── [template.test.tsx](./tax/src/app/__tests__/template.test.tsx)
│   │   │   │   └── [unauthorized.test.tsx](./tax/src/app/__tests__/unauthorized.test.tsx)
│   │   │   ├── business/
│   │   │   │   ├── audit/
│   │   │   │   │   └── [page.tsx](./tax/src/app/business/audit/page.tsx)
│   │   │   │   ├── submission/
│   │   │   │   │   ├── new/
│   │   │   │   │   │   └── [page.tsx](./tax/src/app/business/submission/new/page.tsx)
│   │   │   │   │   └── [page.tsx](./tax/src/app/business/submission/page.tsx)
│   │   │   │   └── [page.tsx](./tax/src/app/business/page.tsx)
│   │   │   ├── personal/
│   │   │   │   ├── calculator/
│   │   │   │   │   └── [page.tsx](./tax/src/app/personal/calculator/page.tsx)
│   │   │   │   └── [page.tsx](./tax/src/app/personal/page.tsx)
│   │   │   ├── settings/
│   │   │   │   └── [page.tsx](./tax/src/app/settings/page.tsx)
│   │   │   ├── [error.tsx](./tax/src/app/error.tsx)
│   │   │   ├── [forbidden.tsx](./tax/src/app/forbidden.tsx)
│   │   │   ├── [global-error.tsx](./tax/src/app/global-error.tsx)
│   │   │   ├── [layout.tsx](./tax/src/app/layout.tsx)
│   │   │   ├── [loading.tsx](./tax/src/app/loading.tsx)
│   │   │   ├── [not-found.tsx](./tax/src/app/not-found.tsx)
│   │   │   ├── [page.tsx](./tax/src/app/page.tsx)
│   │   │   ├── [robots.ts](./tax/src/app/robots.ts)
│   │   │   ├── [template.tsx](./tax/src/app/template.tsx)
│   │   │   └── [unauthorized.tsx](./tax/src/app/unauthorized.tsx)
│   │   ├── components/
│   │   │   ├── __tests__/
│   │   │   │   ├── [OfflineBanner.test.tsx](./tax/src/components/__tests__/OfflineBanner.test.tsx)
│   │   │   │   ├── [RouteGuard.test.tsx](./tax/src/components/__tests__/RouteGuard.test.tsx)
│   │   │   │   └── [SkipToContent.test.tsx](./tax/src/components/__tests__/SkipToContent.test.tsx)
│   │   │   ├── organisms/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [AuditDetail.test.tsx](./tax/src/components/organisms/__tests__/AuditDetail.test.tsx)
│   │   │   │   │   ├── [AuditList.test.tsx](./tax/src/components/organisms/__tests__/AuditList.test.tsx)
│   │   │   │   │   ├── [BottomNav.test.tsx](./tax/src/components/organisms/__tests__/BottomNav.test.tsx)
│   │   │   │   │   ├── [CalculatorForm.test.tsx](./tax/src/components/organisms/__tests__/CalculatorForm.test.tsx)
│   │   │   │   │   ├── [CalculatorResults.test.tsx](./tax/src/components/organisms/__tests__/CalculatorResults.test.tsx)
│   │   │   │   │   ├── [Header.test.tsx](./tax/src/components/organisms/__tests__/Header.test.tsx)
│   │   │   │   │   ├── [Sidebar.test.tsx](./tax/src/components/organisms/__tests__/Sidebar.test.tsx)
│   │   │   │   │   ├── [SubmissionDetail.test.tsx](./tax/src/components/organisms/__tests__/SubmissionDetail.test.tsx)
│   │   │   │   │   └── [SubmissionList.test.tsx](./tax/src/components/organisms/__tests__/SubmissionList.test.tsx)
│   │   │   │   ├── [AuditDetail.tsx](./tax/src/components/organisms/AuditDetail.tsx)
│   │   │   │   ├── [AuditList.tsx](./tax/src/components/organisms/AuditList.tsx)
│   │   │   │   ├── [BottomNav.tsx](./tax/src/components/organisms/BottomNav.tsx)
│   │   │   │   ├── [CalculatorForm.tsx](./tax/src/components/organisms/CalculatorForm.tsx)
│   │   │   │   ├── [CalculatorResults.tsx](./tax/src/components/organisms/CalculatorResults.tsx)
│   │   │   │   ├── [Header.tsx](./tax/src/components/organisms/Header.tsx)
│   │   │   │   ├── [Sidebar.tsx](./tax/src/components/organisms/Sidebar.tsx)
│   │   │   │   ├── [SubmissionDetail.tsx](./tax/src/components/organisms/SubmissionDetail.tsx)
│   │   │   │   └── [SubmissionList.tsx](./tax/src/components/organisms/SubmissionList.tsx)
│   │   │   ├── templates/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [AboutTemplate.test.tsx](./tax/src/components/templates/__tests__/AboutTemplate.test.tsx)
│   │   │   │   │   ├── [AuthTemplate.test.tsx](./tax/src/components/templates/__tests__/AuthTemplate.test.tsx)
│   │   │   │   │   ├── [DashboardTemplate.test.tsx](./tax/src/components/templates/__tests__/DashboardTemplate.test.tsx)
│   │   │   │   │   ├── [DownloadsTemplate.test.tsx](./tax/src/components/templates/__tests__/DownloadsTemplate.test.tsx)
│   │   │   │   │   └── [VersionTemplate.test.tsx](./tax/src/components/templates/__tests__/VersionTemplate.test.tsx)
│   │   │   │   ├── [AboutTemplate.tsx](./tax/src/components/templates/AboutTemplate.tsx)
│   │   │   │   ├── [AuthTemplate.tsx](./tax/src/components/templates/AuthTemplate.tsx)
│   │   │   │   ├── [DashboardTemplate.tsx](./tax/src/components/templates/DashboardTemplate.tsx)
│   │   │   │   ├── [DownloadsTemplate.tsx](./tax/src/components/templates/DownloadsTemplate.tsx)
│   │   │   │   └── [VersionTemplate.tsx](./tax/src/components/templates/VersionTemplate.tsx)
│   │   │   ├── [OfflineBanner.tsx](./tax/src/components/OfflineBanner.tsx)
│   │   │   ├── [RouteGuard.tsx](./tax/src/components/RouteGuard.tsx)
│   │   │   └── [SkipToContent.tsx](./tax/src/components/SkipToContent.tsx)
│   │   ├── content/
│   │   │   ├── [about.ts](./tax/src/content/about.ts)
│   │   │   ├── [download.ts](./tax/src/content/download.ts)
│   │   │   └── [version.ts](./tax/src/content/version.ts)
│   │   ├── data/
│   │   │   ├── __tests__/
│   │   │   │   ├── [mock.test.ts](./tax/src/data/__tests__/mock.test.ts)
│   │   │   │   └── [nav.test.ts](./tax/src/data/__tests__/nav.test.ts)
│   │   │   ├── [mock.ts](./tax/src/data/mock.ts)
│   │   │   └── [nav.ts](./tax/src/data/nav.ts)
│   │   ├── hooks/
│   │   │   ├── __tests__/
│   │   │   │   └── [useEntitySync.test.ts](./tax/src/hooks/__tests__/useEntitySync.test.ts)
│   │   │   └── [useEntitySync.ts](./tax/src/hooks/useEntitySync.ts)
│   │   ├── lib/
│   │   │   ├── __tests__/
│   │   │   │   ├── [db.test.ts](./tax/src/lib/__tests__/db.test.ts)
│   │   │   │   └── [seed.test.ts](./tax/src/lib/__tests__/seed.test.ts)
│   │   │   ├── tax/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [calculator.test.ts](./tax/src/lib/tax/__tests__/calculator.test.ts)
│   │   │   │   │   └── [constants.test.ts](./tax/src/lib/tax/__tests__/constants.test.ts)
│   │   │   │   ├── [calculator.ts](./tax/src/lib/tax/calculator.ts)
│   │   │   │   └── [constants.ts](./tax/src/lib/tax/constants.ts)
│   │   │   ├── [db.ts](./tax/src/lib/db.ts)
│   │   │   └── [seed.ts](./tax/src/lib/seed.ts)
│   │   ├── providers/
│   │   │   ├── __tests__/
│   │   │   │   ├── [DataProvider.test.tsx](./tax/src/providers/__tests__/DataProvider.test.tsx)
│   │   │   │   └── [ToastProvider.test.tsx](./tax/src/providers/__tests__/ToastProvider.test.tsx)
│   │   │   ├── auth/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [AuthProvider.test.tsx](./tax/src/providers/auth/__tests__/AuthProvider.test.tsx)
│   │   │   │   └── [AuthProvider.tsx](./tax/src/providers/auth/AuthProvider.tsx)
│   │   │   ├── entities/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [crud.test.tsx](./tax/src/providers/entities/__tests__/crud.test.tsx)
│   │   │   │   │   └── [providers.test.tsx](./tax/src/providers/entities/__tests__/providers.test.tsx)
│   │   │   │   ├── [AuditsProvider.tsx](./tax/src/providers/entities/AuditsProvider.tsx)
│   │   │   │   ├── [CompaniesProvider.tsx](./tax/src/providers/entities/CompaniesProvider.tsx)
│   │   │   │   ├── [SubmissionsProvider.tsx](./tax/src/providers/entities/SubmissionsProvider.tsx)
│   │   │   │   └── [UserProvider.tsx](./tax/src/providers/entities/UserProvider.tsx)
│   │   │   ├── [DataProvider.tsx](./tax/src/providers/DataProvider.tsx)
│   │   │   ├── [Providers.tsx](./tax/src/providers/Providers.tsx)
│   │   │   └── [ToastProvider.tsx](./tax/src/providers/ToastProvider.tsx)
│   │   ├── styles/
│   │   │   ├── [globals.css](./tax/src/styles/globals.css)
│   │   │   └── [themes.css](./tax/src/styles/themes.css)
│   │   ├── types/
│   │   │   └── [index.ts](./tax/src/types/index.ts)
│   │   └── utils/
│   │       ├── __tests__/
│   │       │   └── [format.test.ts](./tax/src/utils/__tests__/format.test.ts)
│   │       └── [format.ts](./tax/src/utils/format.ts)
│   ├── src-tauri/
│   │   ├── capabilities/
│   │   │   └── [default.json](./tax/src-tauri/capabilities/default.json)
│   │   ├── icons/
│   │   │   ├── android/
│   │   │   │   ├── mipmap-anydpi-v26/
│   │   │   │   │   └── [ic_launcher.xml](./tax/src-tauri/icons/android/mipmap-anydpi-v26/ic_launcher.xml)
│   │   │   │   ├── mipmap-hdpi/
│   │   │   │   │   ├── [ic_launcher.png](./tax/src-tauri/icons/android/mipmap-hdpi/ic_launcher.png)
│   │   │   │   │   ├── [ic_launcher_foreground.png](./tax/src-tauri/icons/android/mipmap-hdpi/ic_launcher_foreground.png)
│   │   │   │   │   └── [ic_launcher_round.png](./tax/src-tauri/icons/android/mipmap-hdpi/ic_launcher_round.png)
│   │   │   │   ├── mipmap-mdpi/
│   │   │   │   │   ├── [ic_launcher.png](./tax/src-tauri/icons/android/mipmap-mdpi/ic_launcher.png)
│   │   │   │   │   ├── [ic_launcher_foreground.png](./tax/src-tauri/icons/android/mipmap-mdpi/ic_launcher_foreground.png)
│   │   │   │   │   └── [ic_launcher_round.png](./tax/src-tauri/icons/android/mipmap-mdpi/ic_launcher_round.png)
│   │   │   │   ├── mipmap-xhdpi/
│   │   │   │   │   ├── [ic_launcher.png](./tax/src-tauri/icons/android/mipmap-xhdpi/ic_launcher.png)
│   │   │   │   │   ├── [ic_launcher_foreground.png](./tax/src-tauri/icons/android/mipmap-xhdpi/ic_launcher_foreground.png)
│   │   │   │   │   └── [ic_launcher_round.png](./tax/src-tauri/icons/android/mipmap-xhdpi/ic_launcher_round.png)
│   │   │   │   ├── mipmap-xxhdpi/
│   │   │   │   │   ├── [ic_launcher.png](./tax/src-tauri/icons/android/mipmap-xxhdpi/ic_launcher.png)
│   │   │   │   │   ├── [ic_launcher_foreground.png](./tax/src-tauri/icons/android/mipmap-xxhdpi/ic_launcher_foreground.png)
│   │   │   │   │   └── [ic_launcher_round.png](./tax/src-tauri/icons/android/mipmap-xxhdpi/ic_launcher_round.png)
│   │   │   │   ├── mipmap-xxxhdpi/
│   │   │   │   │   ├── [ic_launcher.png](./tax/src-tauri/icons/android/mipmap-xxxhdpi/ic_launcher.png)
│   │   │   │   │   ├── [ic_launcher_foreground.png](./tax/src-tauri/icons/android/mipmap-xxxhdpi/ic_launcher_foreground.png)
│   │   │   │   │   └── [ic_launcher_round.png](./tax/src-tauri/icons/android/mipmap-xxxhdpi/ic_launcher_round.png)
│   │   │   │   └── values/
│   │   │   │       └── [ic_launcher_background.xml](./tax/src-tauri/icons/android/values/ic_launcher_background.xml)
│   │   │   ├── ios/
│   │   │   │   ├── [AppIcon-20x20@1x.png](./tax/src-tauri/icons/ios/AppIcon-20x20@1x.png)
│   │   │   │   ├── [AppIcon-20x20@2x-1.png](./tax/src-tauri/icons/ios/AppIcon-20x20@2x-1.png)
│   │   │   │   ├── [AppIcon-20x20@2x.png](./tax/src-tauri/icons/ios/AppIcon-20x20@2x.png)
│   │   │   │   ├── [AppIcon-20x20@3x.png](./tax/src-tauri/icons/ios/AppIcon-20x20@3x.png)
│   │   │   │   ├── [AppIcon-29x29@1x.png](./tax/src-tauri/icons/ios/AppIcon-29x29@1x.png)
│   │   │   │   ├── [AppIcon-29x29@2x-1.png](./tax/src-tauri/icons/ios/AppIcon-29x29@2x-1.png)
│   │   │   │   ├── [AppIcon-29x29@2x.png](./tax/src-tauri/icons/ios/AppIcon-29x29@2x.png)
│   │   │   │   ├── [AppIcon-29x29@3x.png](./tax/src-tauri/icons/ios/AppIcon-29x29@3x.png)
│   │   │   │   ├── [AppIcon-40x40@1x.png](./tax/src-tauri/icons/ios/AppIcon-40x40@1x.png)
│   │   │   │   ├── [AppIcon-40x40@2x-1.png](./tax/src-tauri/icons/ios/AppIcon-40x40@2x-1.png)
│   │   │   │   ├── [AppIcon-40x40@2x.png](./tax/src-tauri/icons/ios/AppIcon-40x40@2x.png)
│   │   │   │   ├── [AppIcon-40x40@3x.png](./tax/src-tauri/icons/ios/AppIcon-40x40@3x.png)
│   │   │   │   ├── [AppIcon-512@2x.png](./tax/src-tauri/icons/ios/AppIcon-512@2x.png)
│   │   │   │   ├── [AppIcon-60x60@2x.png](./tax/src-tauri/icons/ios/AppIcon-60x60@2x.png)
│   │   │   │   ├── [AppIcon-60x60@3x.png](./tax/src-tauri/icons/ios/AppIcon-60x60@3x.png)
│   │   │   │   ├── [AppIcon-76x76@1x.png](./tax/src-tauri/icons/ios/AppIcon-76x76@1x.png)
│   │   │   │   ├── [AppIcon-76x76@2x.png](./tax/src-tauri/icons/ios/AppIcon-76x76@2x.png)
│   │   │   │   └── [AppIcon-83.5x83.5@2x.png](./tax/src-tauri/icons/ios/AppIcon-83.5x83.5@2x.png)
│   │   │   ├── [128x128.png](./tax/src-tauri/icons/128x128.png)
│   │   │   ├── [128x128@2x.png](./tax/src-tauri/icons/128x128@2x.png)
│   │   │   ├── [256x256.png](./tax/src-tauri/icons/256x256.png)
│   │   │   ├── [32x32.png](./tax/src-tauri/icons/32x32.png)
│   │   │   ├── [64x64.png](./tax/src-tauri/icons/64x64.png)
│   │   │   ├── [Square107x107Logo.png](./tax/src-tauri/icons/Square107x107Logo.png)
│   │   │   ├── [Square142x142Logo.png](./tax/src-tauri/icons/Square142x142Logo.png)
│   │   │   ├── [Square150x150Logo.png](./tax/src-tauri/icons/Square150x150Logo.png)
│   │   │   ├── [Square284x284Logo.png](./tax/src-tauri/icons/Square284x284Logo.png)
│   │   │   ├── [Square30x30Logo.png](./tax/src-tauri/icons/Square30x30Logo.png)
│   │   │   ├── [Square310x310Logo.png](./tax/src-tauri/icons/Square310x310Logo.png)
│   │   │   ├── [Square44x44Logo.png](./tax/src-tauri/icons/Square44x44Logo.png)
│   │   │   ├── [Square71x71Logo.png](./tax/src-tauri/icons/Square71x71Logo.png)
│   │   │   ├── [Square89x89Logo.png](./tax/src-tauri/icons/Square89x89Logo.png)
│   │   │   ├── [StoreLogo.png](./tax/src-tauri/icons/StoreLogo.png)
│   │   │   ├── [create-icons.sh](./tax/src-tauri/icons/create-icons.sh)
│   │   │   ├── [icon.icns](./tax/src-tauri/icons/icon.icns)
│   │   │   ├── [icon.ico](./tax/src-tauri/icons/icon.ico)
│   │   │   ├── [icon.png](./tax/src-tauri/icons/icon.png)
│   │   │   └── [icon.svg](./tax/src-tauri/icons/icon.svg)
│   │   ├── src/
│   │   │   ├── [lib.rs](./tax/src-tauri/src/lib.rs)
│   │   │   └── [main.rs](./tax/src-tauri/src/main.rs)
│   │   ├── [Cargo.lock](./tax/src-tauri/Cargo.lock)
│   │   ├── [Cargo.toml](./tax/src-tauri/Cargo.toml)
│   │   ├── [build.rs](./tax/src-tauri/build.rs)
│   │   └── [tauri.conf.json](./tax/src-tauri/tauri.conf.json)
│   ├── [AGENTS.md](./tax/AGENTS.md)
│   ├── [Dockerfile](./tax/Dockerfile)
│   ├── [LICENSE](./tax/LICENSE)
│   ├── [docker-compose.yaml](./tax/docker-compose.yaml)
│   ├── [eslint.config.mts](./tax/eslint.config.mts)
│   ├── [jest.config.ts](./tax/jest.config.ts)
│   ├── [jest.setup.ts](./tax/jest.setup.ts)
│   ├── [next.config.ts](./tax/next.config.ts)
│   ├── [package.json](./tax/package.json)
│   ├── [playwright.config.ts](./tax/playwright.config.ts)
│   ├── [postcss.config.mjs](./tax/postcss.config.mjs)
│   └── [tsconfig.json](./tax/tsconfig.json)
├── [README.md](./README.md)
└── [TREE.md](./TREE.md)
```

72 directories, 229 files
