# TREE

```text
├── docs/
│   ├── [ARCHITECTURE.md](./docs/ARCHITECTURE.md)
│   ├── [CONTRIBUTING.md](./docs/CONTRIBUTING.md)
│   ├── [DOWNLOADS.md](./docs/DOWNLOADS.md)
│   ├── [PACKAGING.md](./docs/PACKAGING.md)
│   └── [ROADMAP.md](./docs/ROADMAP.md)
├── e2e/
│   ├── [about.spec.ts](./e2e/about.spec.ts)
│   ├── [board-views.spec.ts](./e2e/board-views.spec.ts)
│   ├── [board.spec.ts](./e2e/board.spec.ts)
│   ├── [downloads.spec.ts](./e2e/downloads.spec.ts)
│   ├── [home.spec.ts](./e2e/home.spec.ts)
│   ├── [navigation.spec.ts](./e2e/navigation.spec.ts)
│   ├── [profile.spec.ts](./e2e/profile.spec.ts)
│   ├── [tasks.spec.ts](./e2e/tasks.spec.ts)
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
│   │   ├── __tests__/
│   │   │   ├── [error.test.tsx](./src/app/__tests__/error.test.tsx)
│   │   │   ├── [forbidden.test.tsx](./src/app/__tests__/forbidden.test.tsx)
│   │   │   ├── [global-error.test.tsx](./src/app/__tests__/global-error.test.tsx)
│   │   │   ├── [layout.test.tsx](./src/app/__tests__/layout.test.tsx)
│   │   │   ├── [loading.test.tsx](./src/app/__tests__/loading.test.tsx)
│   │   │   ├── [not-found.test.tsx](./src/app/__tests__/not-found.test.tsx)
│   │   │   ├── [page.test.tsx](./src/app/__tests__/page.test.tsx)
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
│   │   ├── [page.tsx](./src/app/page.tsx)
│   │   ├── [robots.ts](./src/app/robots.ts)
│   │   ├── [template.tsx](./src/app/template.tsx)
│   │   └── [unauthorized.tsx](./src/app/unauthorized.tsx)
│   ├── components/
│   │   ├── atoms/
│   │   │   ├── __tests__/
│   │   │   │   └── [FilterSelects.test.tsx](./src/components/atoms/__tests__/FilterSelects.test.tsx)
│   │   │   ├── [DueFilterSelect.tsx](./src/components/atoms/DueFilterSelect.tsx)
│   │   │   └── [PriorityFilterSelect.tsx](./src/components/atoms/PriorityFilterSelect.tsx)
│   │   ├── molecules/
│   │   │   ├── __tests__/
│   │   │   │   ├── [PresetsMenu.test.tsx](./src/components/molecules/__tests__/PresetsMenu.test.tsx)
│   │   │   │   └── [Tasks.test.tsx](./src/components/molecules/__tests__/Tasks.test.tsx)
│   │   │   ├── [LabelFilters.tsx](./src/components/molecules/LabelFilters.tsx)
│   │   │   ├── [MemberFilters.tsx](./src/components/molecules/MemberFilters.tsx)
│   │   │   ├── [PresetsMenu.tsx](./src/components/molecules/PresetsMenu.tsx)
│   │   │   ├── [TaskInput.tsx](./src/components/molecules/TaskInput.tsx)
│   │   │   └── [TaskItem.tsx](./src/components/molecules/TaskItem.tsx)
│   │   ├── organisms/
│   │   │   ├── __tests__/
│   │   │   │   ├── [BoardFilterBar.test.tsx](./src/components/organisms/__tests__/BoardFilterBar.test.tsx)
│   │   │   │   ├── [CalendarView.test.tsx](./src/components/organisms/__tests__/CalendarView.test.tsx)
│   │   │   │   ├── [ListView.test.tsx](./src/components/organisms/__tests__/ListView.test.tsx)
│   │   │   │   ├── [MemberSwitcher.test.tsx](./src/components/organisms/__tests__/MemberSwitcher.test.tsx)
│   │   │   │   ├── [TasksView.test.tsx](./src/components/organisms/__tests__/TasksView.test.tsx)
│   │   │   │   ├── [TimelineView.test.tsx](./src/components/organisms/__tests__/TimelineView.test.tsx)
│   │   │   │   ├── [ToastContainer.test.tsx](./src/components/organisms/__tests__/ToastContainer.test.tsx)
│   │   │   │   └── [ViewSwitcher.test.tsx](./src/components/organisms/__tests__/ViewSwitcher.test.tsx)
│   │   │   ├── [BoardActivity.tsx](./src/components/organisms/BoardActivity.tsx)
│   │   │   ├── [BoardFilterBar.tsx](./src/components/organisms/BoardFilterBar.tsx)
│   │   │   ├── [CalendarView.tsx](./src/components/organisms/CalendarView.tsx)
│   │   │   ├── [Header.tsx](./src/components/organisms/Header.tsx)
│   │   │   ├── [KanbanBoard.tsx](./src/components/organisms/KanbanBoard.tsx)
│   │   │   ├── [ListView.tsx](./src/components/organisms/ListView.tsx)
│   │   │   ├── [MemberSwitcher.tsx](./src/components/organisms/MemberSwitcher.tsx)
│   │   │   ├── [MembersMenu.tsx](./src/components/organisms/MembersMenu.tsx)
│   │   │   ├── [NotificationsDropdown.tsx](./src/components/organisms/NotificationsDropdown.tsx)
│   │   │   ├── [ProjectSidebar.tsx](./src/components/organisms/ProjectSidebar.tsx)
│   │   │   ├── [ShareMenu.tsx](./src/components/organisms/ShareMenu.tsx)
│   │   │   ├── [TasksView.tsx](./src/components/organisms/TasksView.tsx)
│   │   │   ├── [TimelineView.tsx](./src/components/organisms/TimelineView.tsx)
│   │   │   ├── [ToastContainer.tsx](./src/components/organisms/ToastContainer.tsx)
│   │   │   └── [ViewSwitcher.tsx](./src/components/organisms/ViewSwitcher.tsx)
│   │   └── templates/
│   │       ├── __tests__/
│   │       │   ├── [AboutTemplate.test.tsx](./src/components/templates/__tests__/AboutTemplate.test.tsx)
│   │       │   ├── [DownloadsTemplate.test.tsx](./src/components/templates/__tests__/DownloadsTemplate.test.tsx)
│   │       │   ├── [ErrorTemplate.test.tsx](./src/components/templates/__tests__/ErrorTemplate.test.tsx)
│   │       │   └── [VersionTemplate.test.tsx](./src/components/templates/__tests__/VersionTemplate.test.tsx)
│   │       ├── [AboutTemplate.tsx](./src/components/templates/AboutTemplate.tsx)
│   │       ├── [DownloadsTemplate.tsx](./src/components/templates/DownloadsTemplate.tsx)
│   │       ├── [ErrorTemplate.tsx](./src/components/templates/ErrorTemplate.tsx)
│   │       └── [VersionTemplate.tsx](./src/components/templates/VersionTemplate.tsx)
│   ├── content/
│   │   ├── [about.ts](./src/content/about.ts)
│   │   ├── [download.ts](./src/content/download.ts)
│   │   └── [version.ts](./src/content/version.ts)
│   ├── data/
│   │   ├── __tests__/
│   │   │   ├── [models.test.ts](./src/data/__tests__/models.test.ts)
│   │   │   └── [seed.test.ts](./src/data/__tests__/seed.test.ts)
│   │   ├── [models.ts](./src/data/models.ts)
│   │   └── [seed.ts](./src/data/seed.ts)
│   ├── hooks/
│   │   ├── __tests__/
│   │   │   └── [useSWRegister.test.ts](./src/hooks/__tests__/useSWRegister.test.ts)
│   │   └── [useSWRegister.ts](./src/hooks/useSWRegister.ts)
│   ├── lib/
│   │   ├── __tests__/
│   │   │   └── [db.test.ts](./src/lib/__tests__/db.test.ts)
│   │   └── [db.ts](./src/lib/db.ts)
│   ├── providers/
│   │   ├── __tests__/
│   │   │   ├── [AuthProvider.test.tsx](./src/providers/__tests__/AuthProvider.test.tsx)
│   │   │   ├── [DataProvider.test.tsx](./src/providers/__tests__/DataProvider.test.tsx)
│   │   │   ├── [Providers.test.tsx](./src/providers/__tests__/Providers.test.tsx)
│   │   │   ├── [SWProvider.test.tsx](./src/providers/__tests__/SWProvider.test.tsx)
│   │   │   └── [ToastProvider.test.tsx](./src/providers/__tests__/ToastProvider.test.tsx)
│   │   ├── [AuthProvider.tsx](./src/providers/AuthProvider.tsx)
│   │   ├── [DataProvider.tsx](./src/providers/DataProvider.tsx)
│   │   ├── [Providers.tsx](./src/providers/Providers.tsx)
│   │   ├── [SWProvider.tsx](./src/providers/SWProvider.tsx)
│   │   └── [ToastProvider.tsx](./src/providers/ToastProvider.tsx)
│   ├── styles/
│   │   ├── [base.css](./src/styles/base.css)
│   │   ├── [globals.css](./src/styles/globals.css)
│   │   └── [themes.css](./src/styles/themes.css)
│   ├── types/
│   │   ├── [board-filters.ts](./src/types/board-filters.ts)
│   │   └── [index.ts](./src/types/index.ts)
│   └── utils/
│       ├── __tests__/
│       │   └── [format.test.ts](./src/utils/__tests__/format.test.ts)
│       ├── [collab.ts](./src/utils/collab.ts)
│       └── [format.ts](./src/utils/format.ts)
├── src-tauri/
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

59 directories, 217 files
