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
│   │   ├── [calculator.spec.ts](./tax/e2e/calculator.spec.ts)
│   │   ├── [helpers.ts](./tax/e2e/helpers.ts)
│   │   ├── [index.spec.ts](./tax/e2e/index.spec.ts)
│   │   └── [navigation.spec.ts](./tax/e2e/navigation.spec.ts)
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
│   │   │   │   ├── (audit)/
│   │   │   │   │   └── audit/
│   │   │   │   │       └── [id]/
│   │   │   │   ├── (submission)/
│   │   │   │   │   └── submission/
│   │   │   │   │       ├── [id]/
│   │   │   │   │       └── new/
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
│   │   │   ├── atoms/
│   │   │   ├── molecules/
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
│   │   │   ├── [base.css](./tax/src/styles/base.css)
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
├── wallet/
│   ├── docs/
│   │   ├── [ARCHITECTURE.md](./wallet/docs/ARCHITECTURE.md)
│   │   ├── [CONTRIBUTING.md](./wallet/docs/CONTRIBUTING.md)
│   │   ├── [DOWNLOADS.md](./wallet/docs/DOWNLOADS.md)
│   │   ├── [PACKAGING.md](./wallet/docs/PACKAGING.md)
│   │   └── [ROADMAP.md](./wallet/docs/ROADMAP.md)
│   ├── e2e/
│   │   ├── [auth-guard.spec.ts](./wallet/e2e/auth-guard.spec.ts)
│   │   ├── [auth.spec.ts](./wallet/e2e/auth.spec.ts)
│   │   ├── [budget-notifications.spec.ts](./wallet/e2e/budget-notifications.spec.ts)
│   │   ├── [cards.spec.ts](./wallet/e2e/cards.spec.ts)
│   │   ├── [exchange.spec.ts](./wallet/e2e/exchange.spec.ts)
│   │   ├── [helpers.ts](./wallet/e2e/helpers.ts)
│   │   ├── [index.spec.ts](./wallet/e2e/index.spec.ts)
│   │   ├── [navigation.spec.ts](./wallet/e2e/navigation.spec.ts)
│   │   ├── [pages.spec.ts](./wallet/e2e/pages.spec.ts)
│   │   ├── [pay.spec.ts](./wallet/e2e/pay.spec.ts)
│   │   ├── [profile.spec.ts](./wallet/e2e/profile.spec.ts)
│   │   ├── [transactions.spec.ts](./wallet/e2e/transactions.spec.ts)
│   │   └── [transfer.spec.ts](./wallet/e2e/transfer.spec.ts)
│   ├── public/
│   │   ├── icons/
│   │   │   ├── [icon-128x128.png](./wallet/public/icons/icon-128x128.png)
│   │   │   ├── [icon-144x144.png](./wallet/public/icons/icon-144x144.png)
│   │   │   ├── [icon-152x152.png](./wallet/public/icons/icon-152x152.png)
│   │   │   ├── [icon-16x16.png](./wallet/public/icons/icon-16x16.png)
│   │   │   ├── [icon-180x180.png](./wallet/public/icons/icon-180x180.png)
│   │   │   ├── [icon-192x192.png](./wallet/public/icons/icon-192x192.png)
│   │   │   ├── [icon-256x256.png](./wallet/public/icons/icon-256x256.png)
│   │   │   ├── [icon-32x32.png](./wallet/public/icons/icon-32x32.png)
│   │   │   ├── [icon-384x384.png](./wallet/public/icons/icon-384x384.png)
│   │   │   ├── [icon-48x48.png](./wallet/public/icons/icon-48x48.png)
│   │   │   ├── [icon-512x512.png](./wallet/public/icons/icon-512x512.png)
│   │   │   ├── [icon-64x64.png](./wallet/public/icons/icon-64x64.png)
│   │   │   ├── [icon-72x72.png](./wallet/public/icons/icon-72x72.png)
│   │   │   ├── [icon-96x96.png](./wallet/public/icons/icon-96x96.png)
│   │   │   └── [icon.svg](./wallet/public/icons/icon.svg)
│   │   ├── [apple-touch-icon.png](./wallet/public/apple-touch-icon.png)
│   │   ├── [favicon.ico](./wallet/public/favicon.ico)
│   │   ├── [manifest.json](./wallet/public/manifest.json)
│   │   ├── [robots.txt](./wallet/public/robots.txt)
│   │   ├── [sitemap.xml](./wallet/public/sitemap.xml)
│   │   └── [sw.js](./wallet/public/sw.js)
│   ├── src/
│   │   ├── app/
│   │   │   ├── (auth)/
│   │   │   │   ├── forget-password/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./wallet/src/app/(auth)/forget-password/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./wallet/src/app/(auth)/forget-password/page.tsx)
│   │   │   │   ├── profile/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./wallet/src/app/(auth)/profile/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./wallet/src/app/(auth)/profile/page.tsx)
│   │   │   │   ├── reset-password/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./wallet/src/app/(auth)/reset-password/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./wallet/src/app/(auth)/reset-password/page.tsx)
│   │   │   │   ├── sign-in/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./wallet/src/app/(auth)/sign-in/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./wallet/src/app/(auth)/sign-in/page.tsx)
│   │   │   │   └── sign-up/
│   │   │   │       ├── __tests__/
│   │   │   │       │   └── [page.test.tsx](./wallet/src/app/(auth)/sign-up/__tests__/page.test.tsx)
│   │   │   │       └── [page.tsx](./wallet/src/app/(auth)/sign-up/page.tsx)
│   │   │   ├── (dashboard)/
│   │   │   │   ├── (banking)/
│   │   │   │   │   ├── card-rewards/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   └── [page.test.tsx](./wallet/src/app/(dashboard)/(banking)/card-rewards/__tests__/page.test.tsx)
│   │   │   │   │   │   └── [page.tsx](./wallet/src/app/(dashboard)/(banking)/card-rewards/page.tsx)
│   │   │   │   │   ├── fixed-deposits/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   └── [page.test.tsx](./wallet/src/app/(dashboard)/(banking)/fixed-deposits/__tests__/page.test.tsx)
│   │   │   │   │   │   └── [page.tsx](./wallet/src/app/(dashboard)/(banking)/fixed-deposits/page.tsx)
│   │   │   │   │   ├── insurance/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   └── [page.test.tsx](./wallet/src/app/(dashboard)/(banking)/insurance/__tests__/page.test.tsx)
│   │   │   │   │   │   └── [page.tsx](./wallet/src/app/(dashboard)/(banking)/insurance/page.tsx)
│   │   │   │   │   ├── recurring-deposits/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   └── [page.test.tsx](./wallet/src/app/(dashboard)/(banking)/recurring-deposits/__tests__/page.test.tsx)
│   │   │   │   │   │   └── [page.tsx](./wallet/src/app/(dashboard)/(banking)/recurring-deposits/page.tsx)
│   │   │   │   │   └── savings-goals/
│   │   │   │   │       ├── __tests__/
│   │   │   │   │       │   └── [page.test.tsx](./wallet/src/app/(dashboard)/(banking)/savings-goals/__tests__/page.test.tsx)
│   │   │   │   │       └── [page.tsx](./wallet/src/app/(dashboard)/(banking)/savings-goals/page.tsx)
│   │   │   │   ├── (budgeting)/
│   │   │   │   │   ├── bills/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   └── [page.test.tsx](./wallet/src/app/(dashboard)/(budgeting)/bills/__tests__/page.test.tsx)
│   │   │   │   │   │   └── [page.tsx](./wallet/src/app/(dashboard)/(budgeting)/bills/page.tsx)
│   │   │   │   │   ├── budget/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   └── [page.test.tsx](./wallet/src/app/(dashboard)/(budgeting)/budget/__tests__/page.test.tsx)
│   │   │   │   │   │   └── [page.tsx](./wallet/src/app/(dashboard)/(budgeting)/budget/page.tsx)
│   │   │   │   │   ├── currency-alerts/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   └── [page.test.tsx](./wallet/src/app/(dashboard)/(budgeting)/currency-alerts/__tests__/page.test.tsx)
│   │   │   │   │   │   └── [page.tsx](./wallet/src/app/(dashboard)/(budgeting)/currency-alerts/page.tsx)
│   │   │   │   │   ├── rates/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   └── [page.test.tsx](./wallet/src/app/(dashboard)/(budgeting)/rates/__tests__/page.test.tsx)
│   │   │   │   │   │   └── [page.tsx](./wallet/src/app/(dashboard)/(budgeting)/rates/page.tsx)
│   │   │   │   │   └── recurring-transfers/
│   │   │   │   │       ├── __tests__/
│   │   │   │   │       │   └── [page.test.tsx](./wallet/src/app/(dashboard)/(budgeting)/recurring-transfers/__tests__/page.test.tsx)
│   │   │   │   │       └── [page.tsx](./wallet/src/app/(dashboard)/(budgeting)/recurring-transfers/page.tsx)
│   │   │   │   ├── (financial)/
│   │   │   │   │   ├── accounts/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   └── [page.test.tsx](./wallet/src/app/(dashboard)/(financial)/accounts/__tests__/page.test.tsx)
│   │   │   │   │   │   ├── checking/
│   │   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   │   └── [page.test.tsx](./wallet/src/app/(dashboard)/(financial)/accounts/checking/__tests__/page.test.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./wallet/src/app/(dashboard)/(financial)/accounts/checking/page.tsx)
│   │   │   │   │   │   ├── credit/
│   │   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   │   └── [page.test.tsx](./wallet/src/app/(dashboard)/(financial)/accounts/credit/__tests__/page.test.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./wallet/src/app/(dashboard)/(financial)/accounts/credit/page.tsx)
│   │   │   │   │   │   ├── savings/
│   │   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   │   └── [page.test.tsx](./wallet/src/app/(dashboard)/(financial)/accounts/savings/__tests__/page.test.tsx)
│   │   │   │   │   │   │   └── [page.tsx](./wallet/src/app/(dashboard)/(financial)/accounts/savings/page.tsx)
│   │   │   │   │   │   └── [page.tsx](./wallet/src/app/(dashboard)/(financial)/accounts/page.tsx)
│   │   │   │   │   ├── exchange/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   └── [page.test.tsx](./wallet/src/app/(dashboard)/(financial)/exchange/__tests__/page.test.tsx)
│   │   │   │   │   │   └── [page.tsx](./wallet/src/app/(dashboard)/(financial)/exchange/page.tsx)
│   │   │   │   │   ├── reports/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   └── [page.test.tsx](./wallet/src/app/(dashboard)/(financial)/reports/__tests__/page.test.tsx)
│   │   │   │   │   │   └── [page.tsx](./wallet/src/app/(dashboard)/(financial)/reports/page.tsx)
│   │   │   │   │   └── transactions/
│   │   │   │   │       ├── __tests__/
│   │   │   │   │       │   └── [page.test.tsx](./wallet/src/app/(dashboard)/(financial)/transactions/__tests__/page.test.tsx)
│   │   │   │   │       └── [page.tsx](./wallet/src/app/(dashboard)/(financial)/transactions/page.tsx)
│   │   │   │   ├── (payments)/
│   │   │   │   │   ├── cards/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   └── [page.test.tsx](./wallet/src/app/(dashboard)/(payments)/cards/__tests__/page.test.tsx)
│   │   │   │   │   │   └── [page.tsx](./wallet/src/app/(dashboard)/(payments)/cards/page.tsx)
│   │   │   │   │   ├── contacts/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   └── [page.test.tsx](./wallet/src/app/(dashboard)/(payments)/contacts/__tests__/page.test.tsx)
│   │   │   │   │   │   └── [page.tsx](./wallet/src/app/(dashboard)/(payments)/contacts/page.tsx)
│   │   │   │   │   ├── loans/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   └── [page.test.tsx](./wallet/src/app/(dashboard)/(payments)/loans/__tests__/page.test.tsx)
│   │   │   │   │   │   └── [page.tsx](./wallet/src/app/(dashboard)/(payments)/loans/page.tsx)
│   │   │   │   │   ├── pay/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   └── [page.test.tsx](./wallet/src/app/(dashboard)/(payments)/pay/__tests__/page.test.tsx)
│   │   │   │   │   │   └── [page.tsx](./wallet/src/app/(dashboard)/(payments)/pay/page.tsx)
│   │   │   │   │   ├── payment-requests/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   └── [page.test.tsx](./wallet/src/app/(dashboard)/(payments)/payment-requests/__tests__/page.test.tsx)
│   │   │   │   │   │   └── [page.tsx](./wallet/src/app/(dashboard)/(payments)/payment-requests/page.tsx)
│   │   │   │   │   ├── split-bill/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   └── [page.test.tsx](./wallet/src/app/(dashboard)/(payments)/split-bill/__tests__/page.test.tsx)
│   │   │   │   │   │   └── [page.tsx](./wallet/src/app/(dashboard)/(payments)/split-bill/page.tsx)
│   │   │   │   │   └── transfer/
│   │   │   │   │       ├── __tests__/
│   │   │   │   │       │   └── [page.test.tsx](./wallet/src/app/(dashboard)/(payments)/transfer/__tests__/page.test.tsx)
│   │   │   │   │       └── [page.tsx](./wallet/src/app/(dashboard)/(payments)/transfer/page.tsx)
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [page.test.tsx](./wallet/src/app/(dashboard)/__tests__/page.test.tsx)
│   │   │   │   └── [page.tsx](./wallet/src/app/(dashboard)/page.tsx)
│   │   │   ├── (info)/
│   │   │   │   ├── about/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./wallet/src/app/(info)/about/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./wallet/src/app/(info)/about/page.tsx)
│   │   │   │   ├── downloads/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./wallet/src/app/(info)/downloads/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./wallet/src/app/(info)/downloads/page.tsx)
│   │   │   │   └── version/
│   │   │   │       ├── __tests__/
│   │   │   │       │   └── [page.test.tsx](./wallet/src/app/(info)/version/__tests__/page.test.tsx)
│   │   │   │       └── [page.tsx](./wallet/src/app/(info)/version/page.tsx)
│   │   │   ├── (notifications)/
│   │   │   │   └── notifications/
│   │   │   │       ├── __tests__/
│   │   │   │       │   └── [page.test.tsx](./wallet/src/app/(notifications)/notifications/__tests__/page.test.tsx)
│   │   │   │       └── [page.tsx](./wallet/src/app/(notifications)/notifications/page.tsx)
│   │   │   ├── (profile)/
│   │   │   │   └── settings/
│   │   │   │       └── [page.tsx](./wallet/src/app/(profile)/settings/page.tsx)
│   │   │   ├── (settings)/
│   │   │   │   ├── help-support/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./wallet/src/app/(settings)/help-support/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./wallet/src/app/(settings)/help-support/page.tsx)
│   │   │   │   ├── privacy-policy/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./wallet/src/app/(settings)/privacy-policy/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./wallet/src/app/(settings)/privacy-policy/page.tsx)
│   │   │   │   └── terms-of-service/
│   │   │   │       ├── __tests__/
│   │   │   │       │   └── [page.test.tsx](./wallet/src/app/(settings)/terms-of-service/__tests__/page.test.tsx)
│   │   │   │       └── [page.tsx](./wallet/src/app/(settings)/terms-of-service/page.tsx)
│   │   │   ├── __tests__/
│   │   │   │   ├── [cards.test.tsx](./wallet/src/app/__tests__/cards.test.tsx)
│   │   │   │   ├── [dashboard.test.tsx](./wallet/src/app/__tests__/dashboard.test.tsx)
│   │   │   │   ├── [default.test.tsx](./wallet/src/app/__tests__/default.test.tsx)
│   │   │   │   ├── [error.test.tsx](./wallet/src/app/__tests__/error.test.tsx)
│   │   │   │   ├── [forbidden.test.tsx](./wallet/src/app/__tests__/forbidden.test.tsx)
│   │   │   │   ├── [global-error.test.tsx](./wallet/src/app/__tests__/global-error.test.tsx)
│   │   │   │   ├── [layout.test.tsx](./wallet/src/app/__tests__/layout.test.tsx)
│   │   │   │   ├── [loading.test.tsx](./wallet/src/app/__tests__/loading.test.tsx)
│   │   │   │   ├── [not-found.test.tsx](./wallet/src/app/__tests__/not-found.test.tsx)
│   │   │   │   ├── [robots.test.ts](./wallet/src/app/__tests__/robots.test.ts)
│   │   │   │   ├── [template.test.tsx](./wallet/src/app/__tests__/template.test.tsx)
│   │   │   │   ├── [transfer.test.tsx](./wallet/src/app/__tests__/transfer.test.tsx)
│   │   │   │   └── [unauthorized.test.tsx](./wallet/src/app/__tests__/unauthorized.test.tsx)
│   │   │   ├── [default.tsx](./wallet/src/app/default.tsx)
│   │   │   ├── [error.tsx](./wallet/src/app/error.tsx)
│   │   │   ├── [favicon.ico](./wallet/src/app/favicon.ico)
│   │   │   ├── [forbidden.tsx](./wallet/src/app/forbidden.tsx)
│   │   │   ├── [global-error.tsx](./wallet/src/app/global-error.tsx)
│   │   │   ├── [layout.tsx](./wallet/src/app/layout.tsx)
│   │   │   ├── [loading.tsx](./wallet/src/app/loading.tsx)
│   │   │   ├── [not-found.tsx](./wallet/src/app/not-found.tsx)
│   │   │   ├── [robots.ts](./wallet/src/app/robots.ts)
│   │   │   ├── [template.tsx](./wallet/src/app/template.tsx)
│   │   │   └── [unauthorized.tsx](./wallet/src/app/unauthorized.tsx)
│   │   ├── components/
│   │   │   ├── __tests__/
│   │   │   │   └── [RouteGuard.test.tsx](./wallet/src/components/__tests__/RouteGuard.test.tsx)
│   │   │   ├── atoms/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [AccountCard.test.tsx](./wallet/src/components/atoms/__tests__/AccountCard.test.tsx)
│   │   │   │   │   ├── [AccountDetail.test.tsx](./wallet/src/components/atoms/__tests__/AccountDetail.test.tsx)
│   │   │   │   │   ├── [BalanceCard.test.tsx](./wallet/src/components/atoms/__tests__/BalanceCard.test.tsx)
│   │   │   │   │   ├── [BillItem.test.tsx](./wallet/src/components/atoms/__tests__/BillItem.test.tsx)
│   │   │   │   │   ├── [BudgetCategoryCard.test.tsx](./wallet/src/components/atoms/__tests__/BudgetCategoryCard.test.tsx)
│   │   │   │   │   ├── [CardActions.test.tsx](./wallet/src/components/atoms/__tests__/CardActions.test.tsx)
│   │   │   │   │   ├── [CardDetail.test.tsx](./wallet/src/components/atoms/__tests__/CardDetail.test.tsx)
│   │   │   │   │   ├── [CardItem.test.tsx](./wallet/src/components/atoms/__tests__/CardItem.test.tsx)
│   │   │   │   │   ├── [CardSpending.branches.test.tsx](./wallet/src/components/atoms/__tests__/CardSpending.branches.test.tsx)
│   │   │   │   │   ├── [CardSpending.test.tsx](./wallet/src/components/atoms/__tests__/CardSpending.test.tsx)
│   │   │   │   │   ├── [NotificationItem.test.tsx](./wallet/src/components/atoms/__tests__/NotificationItem.test.tsx)
│   │   │   │   │   ├── [RateItem.test.tsx](./wallet/src/components/atoms/__tests__/RateItem.test.tsx)
│   │   │   │   │   ├── [Skeleton.test.tsx](./wallet/src/components/atoms/__tests__/Skeleton.test.tsx)
│   │   │   │   │   ├── [SpendingChart.test.tsx](./wallet/src/components/atoms/__tests__/SpendingChart.test.tsx)
│   │   │   │   │   ├── [SwipeableTransactionItem.test.tsx](./wallet/src/components/atoms/__tests__/SwipeableTransactionItem.test.tsx)
│   │   │   │   │   ├── [TransactionItem.test.tsx](./wallet/src/components/atoms/__tests__/TransactionItem.test.tsx)
│   │   │   │   │   └── [UserCard.test.tsx](./wallet/src/components/atoms/__tests__/UserCard.test.tsx)
│   │   │   │   ├── [AccountCard.tsx](./wallet/src/components/atoms/AccountCard.tsx)
│   │   │   │   ├── [AccountDetail.tsx](./wallet/src/components/atoms/AccountDetail.tsx)
│   │   │   │   ├── [BalanceCard.tsx](./wallet/src/components/atoms/BalanceCard.tsx)
│   │   │   │   ├── [BillItem.tsx](./wallet/src/components/atoms/BillItem.tsx)
│   │   │   │   ├── [BudgetCategoryCard.tsx](./wallet/src/components/atoms/BudgetCategoryCard.tsx)
│   │   │   │   ├── [CardActions.tsx](./wallet/src/components/atoms/CardActions.tsx)
│   │   │   │   ├── [CardDetail.tsx](./wallet/src/components/atoms/CardDetail.tsx)
│   │   │   │   ├── [CardItem.tsx](./wallet/src/components/atoms/CardItem.tsx)
│   │   │   │   ├── [CardSpending.tsx](./wallet/src/components/atoms/CardSpending.tsx)
│   │   │   │   ├── [NotificationItem.tsx](./wallet/src/components/atoms/NotificationItem.tsx)
│   │   │   │   ├── [RateItem.tsx](./wallet/src/components/atoms/RateItem.tsx)
│   │   │   │   ├── [Skeleton.tsx](./wallet/src/components/atoms/Skeleton.tsx)
│   │   │   │   ├── [SpendingChart.tsx](./wallet/src/components/atoms/SpendingChart.tsx)
│   │   │   │   ├── [SwipeableTransactionItem.tsx](./wallet/src/components/atoms/SwipeableTransactionItem.tsx)
│   │   │   │   ├── [TransactionItem.tsx](./wallet/src/components/atoms/TransactionItem.tsx)
│   │   │   │   ├── [UserCard.tsx](./wallet/src/components/atoms/UserCard.tsx)
│   │   │   │   └── [index.ts](./wallet/src/components/atoms/index.ts)
│   │   │   ├── molecules/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [BudgetSummary.test.tsx](./wallet/src/components/molecules/__tests__/BudgetSummary.test.tsx)
│   │   │   │   │   ├── [CurrencyConverter.test.tsx](./wallet/src/components/molecules/__tests__/CurrencyConverter.test.tsx)
│   │   │   │   │   ├── [QRCodeActions.test.tsx](./wallet/src/components/molecules/__tests__/QRCodeActions.test.tsx)
│   │   │   │   │   ├── [QRCodeModal.test.tsx](./wallet/src/components/molecules/__tests__/QRCodeModal.test.tsx)
│   │   │   │   │   ├── [QuickActions.test.tsx](./wallet/src/components/molecules/__tests__/QuickActions.test.tsx)
│   │   │   │   │   ├── [QuickPayForm.test.tsx](./wallet/src/components/molecules/__tests__/QuickPayForm.test.tsx)
│   │   │   │   │   ├── [RateList.test.tsx](./wallet/src/components/molecules/__tests__/RateList.test.tsx)
│   │   │   │   │   ├── [ThemePicker.test.tsx](./wallet/src/components/molecules/__tests__/ThemePicker.test.tsx)
│   │   │   │   │   ├── [TransactionFilters.test.tsx](./wallet/src/components/molecules/__tests__/TransactionFilters.test.tsx)
│   │   │   │   │   ├── [TransferConfirmation.test.tsx](./wallet/src/components/molecules/__tests__/TransferConfirmation.test.tsx)
│   │   │   │   │   └── [TransferForm.test.tsx](./wallet/src/components/molecules/__tests__/TransferForm.test.tsx)
│   │   │   │   ├── [AddAccountModal.tsx](./wallet/src/components/molecules/AddAccountModal.tsx)
│   │   │   │   ├── [AddBillModal.tsx](./wallet/src/components/molecules/AddBillModal.tsx)
│   │   │   │   ├── [BudgetSummary.tsx](./wallet/src/components/molecules/BudgetSummary.tsx)
│   │   │   │   ├── [ContactList.tsx](./wallet/src/components/molecules/ContactList.tsx)
│   │   │   │   ├── [CurrencyAlerts.tsx](./wallet/src/components/molecules/CurrencyAlerts.tsx)
│   │   │   │   ├── [CurrencyConverter.tsx](./wallet/src/components/molecules/CurrencyConverter.tsx)
│   │   │   │   ├── [QRCodeActions.tsx](./wallet/src/components/molecules/QRCodeActions.tsx)
│   │   │   │   ├── [QRCodeModal.tsx](./wallet/src/components/molecules/QRCodeModal.tsx)
│   │   │   │   ├── [QuickActions.tsx](./wallet/src/components/molecules/QuickActions.tsx)
│   │   │   │   ├── [QuickPayForm.tsx](./wallet/src/components/molecules/QuickPayForm.tsx)
│   │   │   │   ├── [RateList.tsx](./wallet/src/components/molecules/RateList.tsx)
│   │   │   │   ├── [SplitBill.tsx](./wallet/src/components/molecules/SplitBill.tsx)
│   │   │   │   ├── [ThemePicker.tsx](./wallet/src/components/molecules/ThemePicker.tsx)
│   │   │   │   ├── [TransactionFilters.tsx](./wallet/src/components/molecules/TransactionFilters.tsx)
│   │   │   │   ├── [TransferConfirmation.tsx](./wallet/src/components/molecules/TransferConfirmation.tsx)
│   │   │   │   ├── [TransferForm.tsx](./wallet/src/components/molecules/TransferForm.tsx)
│   │   │   │   └── [index.ts](./wallet/src/components/molecules/index.ts)
│   │   │   ├── organisms/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [BottomNav.test.tsx](./wallet/src/components/organisms/__tests__/BottomNav.test.tsx)
│   │   │   │   │   ├── [Header.test.tsx](./wallet/src/components/organisms/__tests__/Header.test.tsx)
│   │   │   │   │   ├── [SettingsSection.test.tsx](./wallet/src/components/organisms/__tests__/SettingsSection.test.tsx)
│   │   │   │   │   └── [Sidebar.test.tsx](./wallet/src/components/organisms/__tests__/Sidebar.test.tsx)
│   │   │   │   ├── [BottomNav.tsx](./wallet/src/components/organisms/BottomNav.tsx)
│   │   │   │   ├── [Header.tsx](./wallet/src/components/organisms/Header.tsx)
│   │   │   │   ├── [ProfileForm.tsx](./wallet/src/components/organisms/ProfileForm.tsx)
│   │   │   │   ├── [SettingsSection.tsx](./wallet/src/components/organisms/SettingsSection.tsx)
│   │   │   │   ├── [Sidebar.tsx](./wallet/src/components/organisms/Sidebar.tsx)
│   │   │   │   └── [index.ts](./wallet/src/components/organisms/index.ts)
│   │   │   ├── templates/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [AboutTemplate.test.tsx](./wallet/src/components/templates/__tests__/AboutTemplate.test.tsx)
│   │   │   │   │   ├── [AuthTemplate.test.tsx](./wallet/src/components/templates/__tests__/AuthTemplate.test.tsx)
│   │   │   │   │   ├── [DashboardTemplate.test.tsx](./wallet/src/components/templates/__tests__/DashboardTemplate.test.tsx)
│   │   │   │   │   ├── [DownloadsTemplate.test.tsx](./wallet/src/components/templates/__tests__/DownloadsTemplate.test.tsx)
│   │   │   │   │   ├── [ErrorTemplate.test.tsx](./wallet/src/components/templates/__tests__/ErrorTemplate.test.tsx)
│   │   │   │   │   └── [VersionTemplate.test.tsx](./wallet/src/components/templates/__tests__/VersionTemplate.test.tsx)
│   │   │   │   ├── [AboutTemplate.tsx](./wallet/src/components/templates/AboutTemplate.tsx)
│   │   │   │   ├── [AuthTemplate.tsx](./wallet/src/components/templates/AuthTemplate.tsx)
│   │   │   │   ├── [DashboardTemplate.tsx](./wallet/src/components/templates/DashboardTemplate.tsx)
│   │   │   │   ├── [DownloadsTemplate.tsx](./wallet/src/components/templates/DownloadsTemplate.tsx)
│   │   │   │   ├── [ErrorTemplate.tsx](./wallet/src/components/templates/ErrorTemplate.tsx)
│   │   │   │   ├── [VersionTemplate.tsx](./wallet/src/components/templates/VersionTemplate.tsx)
│   │   │   │   └── [index.ts](./wallet/src/components/templates/index.ts)
│   │   │   ├── [OfflineBanner.tsx](./wallet/src/components/OfflineBanner.tsx)
│   │   │   ├── [PageTransition.tsx](./wallet/src/components/PageTransition.tsx)
│   │   │   ├── [RouteGuard.tsx](./wallet/src/components/RouteGuard.tsx)
│   │   │   └── [SkipToContent.tsx](./wallet/src/components/SkipToContent.tsx)
│   │   ├── data/
│   │   │   ├── [mock.ts](./wallet/src/data/mock.ts)
│   │   │   └── [nav.ts](./wallet/src/data/nav.ts)
│   │   ├── hooks/
│   │   │   ├── __tests__/
│   │   │   │   ├── [useEntitySync.test.tsx](./wallet/src/hooks/__tests__/useEntitySync.test.tsx)
│   │   │   │   ├── [useHaptic.test.ts](./wallet/src/hooks/__tests__/useHaptic.test.ts)
│   │   │   │   ├── [useMediaQuery.test.ts](./wallet/src/hooks/__tests__/useMediaQuery.test.ts)
│   │   │   │   ├── [usePullToRefresh.test.tsx](./wallet/src/hooks/__tests__/usePullToRefresh.test.tsx)
│   │   │   │   ├── [useSWRegister.test.ts](./wallet/src/hooks/__tests__/useSWRegister.test.ts)
│   │   │   │   └── [useTheme.test.ts](./wallet/src/hooks/__tests__/useTheme.test.ts)
│   │   │   ├── [useEntitySync.ts](./wallet/src/hooks/useEntitySync.ts)
│   │   │   ├── [useHaptic.ts](./wallet/src/hooks/useHaptic.ts)
│   │   │   ├── [useMediaQuery.ts](./wallet/src/hooks/useMediaQuery.ts)
│   │   │   ├── [usePullToRefresh.ts](./wallet/src/hooks/usePullToRefresh.ts)
│   │   │   ├── [useSWRegister.ts](./wallet/src/hooks/useSWRegister.ts)
│   │   │   └── [useTheme.ts](./wallet/src/hooks/useTheme.ts)
│   │   ├── lib/
│   │   │   ├── __tests__/
│   │   │   │   ├── [db.test.ts](./wallet/src/lib/__tests__/db.test.ts)
│   │   │   │   └── [seed.test.ts](./wallet/src/lib/__tests__/seed.test.ts)
│   │   │   ├── [db.ts](./wallet/src/lib/db.ts)
│   │   │   └── [seed.ts](./wallet/src/lib/seed.ts)
│   │   ├── providers/
│   │   │   ├── __tests__/
│   │   │   │   ├── [DataProvider.crud.test.tsx](./wallet/src/providers/__tests__/DataProvider.crud.test.tsx)
│   │   │   │   ├── [DataProvider.loading.test.tsx](./wallet/src/providers/__tests__/DataProvider.loading.test.tsx)
│   │   │   │   ├── [DataProvider.test.tsx](./wallet/src/providers/__tests__/DataProvider.test.tsx)
│   │   │   │   └── [ToastProvider.test.tsx](./wallet/src/providers/__tests__/ToastProvider.test.tsx)
│   │   │   ├── auth/
│   │   │   │   └── [AuthProvider.tsx](./wallet/src/providers/auth/AuthProvider.tsx)
│   │   │   ├── entities/
│   │   │   │   ├── [AccountsProvider.tsx](./wallet/src/providers/entities/AccountsProvider.tsx)
│   │   │   │   ├── [BillsProvider.tsx](./wallet/src/providers/entities/BillsProvider.tsx)
│   │   │   │   ├── [BudgetProvider.tsx](./wallet/src/providers/entities/BudgetProvider.tsx)
│   │   │   │   ├── [CardsProvider.tsx](./wallet/src/providers/entities/CardsProvider.tsx)
│   │   │   │   ├── [ContactsProvider.tsx](./wallet/src/providers/entities/ContactsProvider.tsx)
│   │   │   │   ├── [CurrencyAlertsProvider.tsx](./wallet/src/providers/entities/CurrencyAlertsProvider.tsx)
│   │   │   │   ├── [CurrencyRatesProvider.tsx](./wallet/src/providers/entities/CurrencyRatesProvider.tsx)
│   │   │   │   ├── [FDsProvider.tsx](./wallet/src/providers/entities/FDsProvider.tsx)
│   │   │   │   ├── [GoalsProvider.tsx](./wallet/src/providers/entities/GoalsProvider.tsx)
│   │   │   │   ├── [InsuranceProvider.tsx](./wallet/src/providers/entities/InsuranceProvider.tsx)
│   │   │   │   ├── [LoansProvider.tsx](./wallet/src/providers/entities/LoansProvider.tsx)
│   │   │   │   ├── [NotificationsProvider.tsx](./wallet/src/providers/entities/NotificationsProvider.tsx)
│   │   │   │   ├── [PaymentRequestsProvider.tsx](./wallet/src/providers/entities/PaymentRequestsProvider.tsx)
│   │   │   │   ├── [RDsProvider.tsx](./wallet/src/providers/entities/RDsProvider.tsx)
│   │   │   │   ├── [RecurringTransfersProvider.tsx](./wallet/src/providers/entities/RecurringTransfersProvider.tsx)
│   │   │   │   ├── [RewardsProvider.tsx](./wallet/src/providers/entities/RewardsProvider.tsx)
│   │   │   │   ├── [TransactionsProvider.tsx](./wallet/src/providers/entities/TransactionsProvider.tsx)
│   │   │   │   └── [UserProvider.tsx](./wallet/src/providers/entities/UserProvider.tsx)
│   │   │   ├── [DataProvider.tsx](./wallet/src/providers/DataProvider.tsx)
│   │   │   ├── [Providers.tsx](./wallet/src/providers/Providers.tsx)
│   │   │   ├── [SWProvider.tsx](./wallet/src/providers/SWProvider.tsx)
│   │   │   └── [ToastProvider.tsx](./wallet/src/providers/ToastProvider.tsx)
│   │   ├── styles/
│   │   │   ├── [base.css](./wallet/src/styles/base.css)
│   │   │   ├── [globals.css](./wallet/src/styles/globals.css)
│   │   │   └── [themes.css](./wallet/src/styles/themes.css)
│   │   ├── test-helpers/
│   │   │   ├── [db-mock.ts](./wallet/src/test-helpers/db-mock.ts)
│   │   │   ├── [index.ts](./wallet/src/test-helpers/index.ts)
│   │   │   ├── [nav-mock.ts](./wallet/src/test-helpers/nav-mock.ts)
│   │   │   └── [render.tsx](./wallet/src/test-helpers/render.tsx)
│   │   ├── types/
│   │   │   ├── [index.ts](./wallet/src/types/index.ts)
│   │   │   └── [theme.ts](./wallet/src/types/theme.ts)
│   │   └── utils/
│   │       ├── __tests__/
│   │       │   ├── [export.test.ts](./wallet/src/utils/__tests__/export.test.ts)
│   │       │   ├── [format.test.ts](./wallet/src/utils/__tests__/format.test.ts)
│   │       │   └── [iconMap.test.ts](./wallet/src/utils/__tests__/iconMap.test.ts)
│   │       ├── [export.ts](./wallet/src/utils/export.ts)
│   │       ├── [format.ts](./wallet/src/utils/format.ts)
│   │       └── [iconMap.ts](./wallet/src/utils/iconMap.ts)
│   ├── src-tauri/
│   │   ├── capabilities/
│   │   │   └── [default.json](./wallet/src-tauri/capabilities/default.json)
│   │   ├── gen/
│   │   │   └── schemas/
│   │   │       ├── [acl-manifests.json](./wallet/src-tauri/gen/schemas/acl-manifests.json)
│   │   │       ├── [capabilities.json](./wallet/src-tauri/gen/schemas/capabilities.json)
│   │   │       ├── [desktop-schema.json](./wallet/src-tauri/gen/schemas/desktop-schema.json)
│   │   │       └── [macOS-schema.json](./wallet/src-tauri/gen/schemas/macOS-schema.json)
│   │   ├── icons/
│   │   │   ├── [128x128.png](./wallet/src-tauri/icons/128x128.png)
│   │   │   ├── [128x128@2x.png](./wallet/src-tauri/icons/128x128@2x.png)
│   │   │   ├── [32x32.png](./wallet/src-tauri/icons/32x32.png)
│   │   │   ├── [Square107x107Logo.png](./wallet/src-tauri/icons/Square107x107Logo.png)
│   │   │   ├── [Square142x142Logo.png](./wallet/src-tauri/icons/Square142x142Logo.png)
│   │   │   ├── [Square150x150Logo.png](./wallet/src-tauri/icons/Square150x150Logo.png)
│   │   │   ├── [Square284x284Logo.png](./wallet/src-tauri/icons/Square284x284Logo.png)
│   │   │   ├── [Square30x30Logo.png](./wallet/src-tauri/icons/Square30x30Logo.png)
│   │   │   ├── [Square310x310Logo.png](./wallet/src-tauri/icons/Square310x310Logo.png)
│   │   │   ├── [Square44x44Logo.png](./wallet/src-tauri/icons/Square44x44Logo.png)
│   │   │   ├── [Square71x71Logo.png](./wallet/src-tauri/icons/Square71x71Logo.png)
│   │   │   ├── [Square89x89Logo.png](./wallet/src-tauri/icons/Square89x89Logo.png)
│   │   │   ├── [StoreLogo.png](./wallet/src-tauri/icons/StoreLogo.png)
│   │   │   ├── [icon.icns](./wallet/src-tauri/icons/icon.icns)
│   │   │   ├── [icon.ico](./wallet/src-tauri/icons/icon.ico)
│   │   │   └── [icon.png](./wallet/src-tauri/icons/icon.png)
│   │   ├── src/
│   │   │   ├── [lib.rs](./wallet/src-tauri/src/lib.rs)
│   │   │   └── [main.rs](./wallet/src-tauri/src/main.rs)
│   │   ├── [Cargo.lock](./wallet/src-tauri/Cargo.lock)
│   │   ├── [Cargo.toml](./wallet/src-tauri/Cargo.toml)
│   │   ├── [build.rs](./wallet/src-tauri/build.rs)
│   │   └── [tauri.conf.json](./wallet/src-tauri/tauri.conf.json)
│   ├── [AGENTS.md](./wallet/AGENTS.md)
│   ├── [Dockerfile](./wallet/Dockerfile)
│   ├── [LICENSE](./wallet/LICENSE)
│   ├── [README.md](./wallet/README.md)
│   ├── [TREE.md](./wallet/TREE.md)
│   ├── [docker-compose.yaml](./wallet/docker-compose.yaml)
│   ├── [eslint.config.mts](./wallet/eslint.config.mts)
│   ├── [jest.config.ts](./wallet/jest.config.ts)
│   ├── [jest.setup.ts](./wallet/jest.setup.ts)
│   ├── [next.config.ts](./wallet/next.config.ts)
│   ├── [package.json](./wallet/package.json)
│   ├── [playwright.config.ts](./wallet/playwright.config.ts)
│   ├── [postcss.config.mjs](./wallet/postcss.config.mjs)
│   └── [tsconfig.json](./wallet/tsconfig.json)
├── [README.md](./README.md)
└── [TREE.md](./TREE.md)
```

201 directories, 547 files
