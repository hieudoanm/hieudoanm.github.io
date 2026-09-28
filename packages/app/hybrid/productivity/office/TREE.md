# TREE

```text
├── docs/
│   ├── [ARCHITECTURE.md](./docs/ARCHITECTURE.md)
│   ├── [CONTRIBUTING.md](./docs/CONTRIBUTING.md)
│   ├── [DOWNLOADS.md](./docs/DOWNLOADS.md)
│   ├── [PACKAGING.md](./docs/PACKAGING.md)
│   └── [ROADMAP.md](./docs/ROADMAP.md)
├── e2e/
│   ├── screenshots/
│   │   ├── [about.png](./e2e/screenshots/about.png)
│   │   ├── [downloads.png](./e2e/screenshots/downloads.png)
│   │   └── [version.png](./e2e/screenshots/version.png)
│   ├── [about.spec.ts](./e2e/about.spec.ts)
│   ├── [downloads.spec.ts](./e2e/downloads.spec.ts)
│   ├── [home.spec.ts](./e2e/home.spec.ts)
│   ├── [smoke.spec.ts](./e2e/smoke.spec.ts)
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
├── scripts/
│   └── [generate-seed.mjs](./scripts/generate-seed.mjs)
├── src/
│   ├── app/
│   │   ├── (app)/
│   │   │   ├── (lite)/
│   │   │   │   └── lite/
│   │   │   │       ├── __tests__/
│   │   │   │       │   └── [page.test.tsx](./src/app/(app)/(lite)/lite/__tests__/page.test.tsx)
│   │   │   │       ├── calendar/
│   │   │   │       │   ├── __tests__/
│   │   │   │       │   │   └── [page.test.tsx](./src/app/(app)/(lite)/lite/calendar/__tests__/page.test.tsx)
│   │   │   │       │   └── [page.tsx](./src/app/(app)/(lite)/lite/calendar/page.tsx)
│   │   │   │       ├── csv/
│   │   │   │       │   ├── __tests__/
│   │   │   │       │   │   └── [page.test.tsx](./src/app/(app)/(lite)/lite/csv/__tests__/page.test.tsx)
│   │   │   │       │   └── [page.tsx](./src/app/(app)/(lite)/lite/csv/page.tsx)
│   │   │   │       ├── md/
│   │   │   │       │   ├── __tests__/
│   │   │   │       │   │   └── [page.test.tsx](./src/app/(app)/(lite)/lite/md/__tests__/page.test.tsx)
│   │   │   │       │   └── [page.tsx](./src/app/(app)/(lite)/lite/md/page.tsx)
│   │   │   │       ├── tasks/
│   │   │   │       │   ├── __tests__/
│   │   │   │       │   │   └── [page.test.tsx](./src/app/(app)/(lite)/lite/tasks/__tests__/page.test.tsx)
│   │   │   │       │   └── [page.tsx](./src/app/(app)/(lite)/lite/tasks/page.tsx)
│   │   │   │       └── [page.tsx](./src/app/(app)/(lite)/lite/page.tsx)
│   │   │   ├── calendar/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [page.test.tsx](./src/app/(app)/calendar/__tests__/page.test.tsx)
│   │   │   │   └── [page.tsx](./src/app/(app)/calendar/page.tsx)
│   │   │   ├── csv/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [page.test.tsx](./src/app/(app)/csv/__tests__/page.test.tsx)
│   │   │   │   └── [page.tsx](./src/app/(app)/csv/page.tsx)
│   │   │   ├── md/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [page.test.tsx](./src/app/(app)/md/__tests__/page.test.tsx)
│   │   │   │   └── [page.tsx](./src/app/(app)/md/page.tsx)
│   │   │   └── tasks/
│   │   │       ├── __tests__/
│   │   │       │   └── [page.test.tsx](./src/app/(app)/tasks/__tests__/page.test.tsx)
│   │   │       └── [page.tsx](./src/app/(app)/tasks/page.tsx)
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
│   │   │   ├── [default.test.tsx](./src/app/__tests__/default.test.tsx)
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
│   │   ├── calendar/
│   │   │   ├── atoms/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [EventList.test.tsx](./src/components/calendar/atoms/__tests__/EventList.test.tsx)
│   │   │   │   │   ├── [LunarDate.test.tsx](./src/components/calendar/atoms/__tests__/LunarDate.test.tsx)
│   │   │   │   │   ├── [TimeBlock.test.tsx](./src/components/calendar/atoms/__tests__/TimeBlock.test.tsx)
│   │   │   │   │   └── [TimeGrid.test.tsx](./src/components/calendar/atoms/__tests__/TimeGrid.test.tsx)
│   │   │   │   ├── [EventList.tsx](./src/components/calendar/atoms/EventList.tsx)
│   │   │   │   ├── [LunarDate.tsx](./src/components/calendar/atoms/LunarDate.tsx)
│   │   │   │   ├── [TimeBlock.tsx](./src/components/calendar/atoms/TimeBlock.tsx)
│   │   │   │   └── [TimeGrid.tsx](./src/components/calendar/atoms/TimeGrid.tsx)
│   │   │   ├── molecules/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [DayView.test.tsx](./src/components/calendar/molecules/__tests__/DayView.test.tsx)
│   │   │   │   │   ├── [MonthCalendar.test.tsx](./src/components/calendar/molecules/__tests__/MonthCalendar.test.tsx)
│   │   │   │   │   ├── [ThreeDayView.test.tsx](./src/components/calendar/molecules/__tests__/ThreeDayView.test.tsx)
│   │   │   │   │   ├── [WeekView.test.tsx](./src/components/calendar/molecules/__tests__/WeekView.test.tsx)
│   │   │   │   │   └── [YearlyView.test.tsx](./src/components/calendar/molecules/__tests__/YearlyView.test.tsx)
│   │   │   │   ├── [DayView.tsx](./src/components/calendar/molecules/DayView.tsx)
│   │   │   │   ├── [HalflyView.tsx](./src/components/calendar/molecules/HalflyView.tsx)
│   │   │   │   ├── [MonthCalendar.tsx](./src/components/calendar/molecules/MonthCalendar.tsx)
│   │   │   │   ├── [QuarterlyView.tsx](./src/components/calendar/molecules/QuarterlyView.tsx)
│   │   │   │   ├── [ThreeDayView.tsx](./src/components/calendar/molecules/ThreeDayView.tsx)
│   │   │   │   ├── [WeekView.tsx](./src/components/calendar/molecules/WeekView.tsx)
│   │   │   │   └── [YearlyView.tsx](./src/components/calendar/molecules/YearlyView.tsx)
│   │   │   └── organisms/
│   │   │       ├── __tests__/
│   │   │       │   ├── [CalendarApp.test.tsx](./src/components/calendar/organisms/__tests__/CalendarApp.test.tsx)
│   │   │       │   ├── [CountdownModal.test.tsx](./src/components/calendar/organisms/__tests__/CountdownModal.test.tsx)
│   │   │       │   ├── [DaysCountModal.test.tsx](./src/components/calendar/organisms/__tests__/DaysCountModal.test.tsx)
│   │   │       │   └── [LiteCalendar.test.tsx](./src/components/calendar/organisms/__tests__/LiteCalendar.test.tsx)
│   │   │       ├── [CalendarApp.tsx](./src/components/calendar/organisms/CalendarApp.tsx)
│   │   │       ├── [CountdownModal.tsx](./src/components/calendar/organisms/CountdownModal.tsx)
│   │   │       ├── [DaysCountModal.tsx](./src/components/calendar/organisms/DaysCountModal.tsx)
│   │   │       └── [LiteCalendar.tsx](./src/components/calendar/organisms/LiteCalendar.tsx)
│   │   ├── csv/
│   │   │   ├── atoms/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [Cell.test.tsx](./src/components/csv/atoms/__tests__/Cell.test.tsx)
│   │   │   │   └── [Cell.tsx](./src/components/csv/atoms/Cell.tsx)
│   │   │   ├── molecules/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [StatusBar.test.tsx](./src/components/csv/molecules/__tests__/StatusBar.test.tsx)
│   │   │   │   │   └── [Toolbar.test.tsx](./src/components/csv/molecules/__tests__/Toolbar.test.tsx)
│   │   │   │   ├── [CommentPopover.tsx](./src/components/csv/molecules/CommentPopover.tsx)
│   │   │   │   ├── [FilterBar.tsx](./src/components/csv/molecules/FilterBar.tsx)
│   │   │   │   ├── [FindBar.tsx](./src/components/csv/molecules/FindBar.tsx)
│   │   │   │   ├── [SheetTabs.tsx](./src/components/csv/molecules/SheetTabs.tsx)
│   │   │   │   ├── [ShortcutsModal.tsx](./src/components/csv/molecules/ShortcutsModal.tsx)
│   │   │   │   ├── [StatusBar.tsx](./src/components/csv/molecules/StatusBar.tsx)
│   │   │   │   └── [Toolbar.tsx](./src/components/csv/molecules/Toolbar.tsx)
│   │   │   ├── organisms/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [Grid.test.tsx](./src/components/csv/organisms/__tests__/Grid.test.tsx)
│   │   │   │   │   ├── [LiteSheet.test.tsx](./src/components/csv/organisms/__tests__/LiteSheet.test.tsx)
│   │   │   │   │   └── [Sheet.test.tsx](./src/components/csv/organisms/__tests__/Sheet.test.tsx)
│   │   │   │   ├── [Grid.tsx](./src/components/csv/organisms/Grid.tsx)
│   │   │   │   ├── [LiteSheet.tsx](./src/components/csv/organisms/LiteSheet.tsx)
│   │   │   │   └── [Sheet.tsx](./src/components/csv/organisms/Sheet.tsx)
│   │   │   └── templates/
│   │   ├── md/
│   │   │   ├── atoms/
│   │   │   ├── molecules/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [ConvertToolbar.test.tsx](./src/components/md/molecules/__tests__/ConvertToolbar.test.tsx)
│   │   │   │   │   ├── [FileToolbar.test.tsx](./src/components/md/molecules/__tests__/FileToolbar.test.tsx)
│   │   │   │   │   ├── [FormatToolbar.test.tsx](./src/components/md/molecules/__tests__/FormatToolbar.test.tsx)
│   │   │   │   │   ├── [StatsBar.test.tsx](./src/components/md/molecules/__tests__/StatsBar.test.tsx)
│   │   │   │   │   ├── [TocSidebar.test.tsx](./src/components/md/molecules/__tests__/TocSidebar.test.tsx)
│   │   │   │   │   ├── [ViewControls.test.tsx](./src/components/md/molecules/__tests__/ViewControls.test.tsx)
│   │   │   │   │   └── [WordCounterDialog.test.tsx](./src/components/md/molecules/__tests__/WordCounterDialog.test.tsx)
│   │   │   │   ├── [ConvertToolbar.tsx](./src/components/md/molecules/ConvertToolbar.tsx)
│   │   │   │   ├── [FileToolbar.tsx](./src/components/md/molecules/FileToolbar.tsx)
│   │   │   │   ├── [FormatToolbar.tsx](./src/components/md/molecules/FormatToolbar.tsx)
│   │   │   │   ├── [StatsBar.tsx](./src/components/md/molecules/StatsBar.tsx)
│   │   │   │   ├── [TocSidebar.tsx](./src/components/md/molecules/TocSidebar.tsx)
│   │   │   │   ├── [ViewControls.tsx](./src/components/md/molecules/ViewControls.tsx)
│   │   │   │   └── [WordCounterDialog.tsx](./src/components/md/molecules/WordCounterDialog.tsx)
│   │   │   ├── organisms/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [GraphView.test.tsx](./src/components/md/organisms/__tests__/GraphView.test.tsx)
│   │   │   │   │   ├── [LiteMarkdown.test.tsx](./src/components/md/organisms/__tests__/LiteMarkdown.test.tsx)
│   │   │   │   │   ├── [MarkdownApp.test.tsx](./src/components/md/organisms/__tests__/MarkdownApp.test.tsx)
│   │   │   │   │   ├── [MarkdownPreviewer.test.tsx](./src/components/md/organisms/__tests__/MarkdownPreviewer.test.tsx)
│   │   │   │   │   └── [MarkdownSidebar.test.tsx](./src/components/md/organisms/__tests__/MarkdownSidebar.test.tsx)
│   │   │   │   ├── [GraphView.tsx](./src/components/md/organisms/GraphView.tsx)
│   │   │   │   ├── [LiteMarkdownApp.tsx](./src/components/md/organisms/LiteMarkdownApp.tsx)
│   │   │   │   ├── [MarkdownApp.tsx](./src/components/md/organisms/MarkdownApp.tsx)
│   │   │   │   ├── [MarkdownPreviewer.tsx](./src/components/md/organisms/MarkdownPreviewer.tsx)
│   │   │   │   └── [MarkdownSidebar.tsx](./src/components/md/organisms/MarkdownSidebar.tsx)
│   │   │   └── templates/
│   │   ├── shared/
│   │   │   ├── atoms/
│   │   │   ├── molecules/
│   │   │   ├── organisms/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [AppsHub.test.tsx](./src/components/shared/organisms/__tests__/AppsHub.test.tsx)
│   │   │   │   │   └── [Header.test.tsx](./src/components/shared/organisms/__tests__/Header.test.tsx)
│   │   │   │   ├── [AppsComparison.tsx](./src/components/shared/organisms/AppsComparison.tsx)
│   │   │   │   ├── [AppsHub.tsx](./src/components/shared/organisms/AppsHub.tsx)
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
│   │   └── tasks/
│   │       ├── atoms/
│   │       │   ├── __tests__/
│   │       │   │   ├── [DueFilterSelect.test.tsx](./src/components/tasks/atoms/__tests__/DueFilterSelect.test.tsx)
│   │       │   │   └── [PriorityFilterSelect.test.tsx](./src/components/tasks/atoms/__tests__/PriorityFilterSelect.test.tsx)
│   │       │   ├── [DueFilterSelect.tsx](./src/components/tasks/atoms/DueFilterSelect.tsx)
│   │       │   └── [PriorityFilterSelect.tsx](./src/components/tasks/atoms/PriorityFilterSelect.tsx)
│   │       ├── molecules/
│   │       │   ├── __tests__/
│   │       │   │   ├── [LabelFilters.test.tsx](./src/components/tasks/molecules/__tests__/LabelFilters.test.tsx)
│   │       │   │   ├── [MemberFilters.test.tsx](./src/components/tasks/molecules/__tests__/MemberFilters.test.tsx)
│   │       │   │   ├── [TaskEmptyState.test.tsx](./src/components/tasks/molecules/__tests__/TaskEmptyState.test.tsx)
│   │       │   │   ├── [TaskInput.test.tsx](./src/components/tasks/molecules/__tests__/TaskInput.test.tsx)
│   │       │   │   ├── [TaskItem.test.tsx](./src/components/tasks/molecules/__tests__/TaskItem.test.tsx)
│   │       │   │   └── [TaskSignInState.test.tsx](./src/components/tasks/molecules/__tests__/TaskSignInState.test.tsx)
│   │       │   ├── [LabelFilters.tsx](./src/components/tasks/molecules/LabelFilters.tsx)
│   │       │   ├── [MemberFilters.tsx](./src/components/tasks/molecules/MemberFilters.tsx)
│   │       │   ├── [PresetsMenu.tsx](./src/components/tasks/molecules/PresetsMenu.tsx)
│   │       │   ├── [TaskEmptyState.tsx](./src/components/tasks/molecules/TaskEmptyState.tsx)
│   │       │   ├── [TaskInput.tsx](./src/components/tasks/molecules/TaskInput.tsx)
│   │       │   ├── [TaskItem.tsx](./src/components/tasks/molecules/TaskItem.tsx)
│   │       │   └── [TaskSignInState.tsx](./src/components/tasks/molecules/TaskSignInState.tsx)
│   │       ├── organisms/
│   │       │   ├── __tests__/
│   │       │   │   ├── [BoardBody.test.tsx](./src/components/tasks/organisms/__tests__/BoardBody.test.tsx)
│   │       │   │   ├── [KanbanBoard.test.tsx](./src/components/tasks/organisms/__tests__/KanbanBoard.test.tsx)
│   │       │   │   ├── [MemberSwitcher.test.tsx](./src/components/tasks/organisms/__tests__/MemberSwitcher.test.tsx)
│   │       │   │   ├── [TasksView.test.tsx](./src/components/tasks/organisms/__tests__/TasksView.test.tsx)
│   │       │   │   └── [ViewSwitcher.test.tsx](./src/components/tasks/organisms/__tests__/ViewSwitcher.test.tsx)
│   │       │   ├── [BoardBody.tsx](./src/components/tasks/organisms/BoardBody.tsx)
│   │       │   ├── [BoardFilterBar.tsx](./src/components/tasks/organisms/BoardFilterBar.tsx)
│   │       │   ├── [CalendarView.tsx](./src/components/tasks/organisms/CalendarView.tsx)
│   │       │   ├── [KanbanBoard.tsx](./src/components/tasks/organisms/KanbanBoard.tsx)
│   │       │   ├── [ListView.tsx](./src/components/tasks/organisms/ListView.tsx)
│   │       │   ├── [MemberSwitcher.tsx](./src/components/tasks/organisms/MemberSwitcher.tsx)
│   │       │   ├── [ProjectSidebar.tsx](./src/components/tasks/organisms/ProjectSidebar.tsx)
│   │       │   ├── [TasksView.tsx](./src/components/tasks/organisms/TasksView.tsx)
│   │       │   ├── [TimelineView.tsx](./src/components/tasks/organisms/TimelineView.tsx)
│   │       │   └── [ViewSwitcher.tsx](./src/components/tasks/organisms/ViewSwitcher.tsx)
│   │       └── [Providers.tsx](./src/components/tasks/Providers.tsx)
│   ├── content/
│   │   ├── [about.ts](./src/content/about.ts)
│   │   ├── [download.ts](./src/content/download.ts)
│   │   └── [version.ts](./src/content/version.ts)
│   ├── data/
│   │   ├── calendar/
│   │   │   ├── __tests__/
│   │   │   │   ├── [constants.test.ts](./src/data/calendar/__tests__/constants.test.ts)
│   │   │   │   └── [timeBlocks.test.ts](./src/data/calendar/__tests__/timeBlocks.test.ts)
│   │   │   ├── [constants.ts](./src/data/calendar/constants.ts)
│   │   │   ├── [events.ts](./src/data/calendar/events.ts)
│   │   │   ├── [months.ts](./src/data/calendar/months.ts)
│   │   │   ├── [timeBlocks.ts](./src/data/calendar/timeBlocks.ts)
│   │   │   └── [years.ts](./src/data/calendar/years.ts)
│   │   ├── csv/
│   │   │   ├── [anime.csv](./src/data/csv/anime.csv)
│   │   │   ├── [api-protocols.csv](./src/data/csv/api-protocols.csv)
│   │   │   ├── [api-styles.csv](./src/data/csv/api-styles.csv)
│   │   │   ├── [apis.csv](./src/data/csv/apis.csv)
│   │   │   ├── [arts.csv](./src/data/csv/arts.csv)
│   │   │   ├── [biology.csv](./src/data/csv/biology.csv)
│   │   │   ├── [books.csv](./src/data/csv/books.csv)
│   │   │   ├── [bored.csv](./src/data/csv/bored.csv)
│   │   │   ├── [build-tools.csv](./src/data/csv/build-tools.csv)
│   │   │   ├── [cars.csv](./src/data/csv/cars.csv)
│   │   │   ├── [chess-engines.csv](./src/data/csv/chess-engines.csv)
│   │   │   ├── [chess-players.csv](./src/data/csv/chess-players.csv)
│   │   │   ├── [chess-titles.csv](./src/data/csv/chess-titles.csv)
│   │   │   ├── [cities.csv](./src/data/csv/cities.csv)
│   │   │   ├── [comics.csv](./src/data/csv/comics.csv)
│   │   │   ├── [commerce.csv](./src/data/csv/commerce.csv)
│   │   │   ├── [database-hosting.csv](./src/data/csv/database-hosting.csv)
│   │   │   ├── [degrees.csv](./src/data/csv/degrees.csv)
│   │   │   ├── [dota.csv](./src/data/csv/dota.csv)
│   │   │   ├── [e-sports.csv](./src/data/csv/e-sports.csv)
│   │   │   ├── [fandb-beverages.csv](./src/data/csv/fandb-beverages.csv)
│   │   │   ├── [fandb-foods.csv](./src/data/csv/fandb-foods.csv)
│   │   │   ├── [fields-medal.csv](./src/data/csv/fields-medal.csv)
│   │   │   ├── [football-competitions.csv](./src/data/csv/football-competitions.csv)
│   │   │   ├── [football.csv](./src/data/csv/football.csv)
│   │   │   ├── [futsal.csv](./src/data/csv/futsal.csv)
│   │   │   ├── [game-of-thrones.csv](./src/data/csv/game-of-thrones.csv)
│   │   │   ├── [games.csv](./src/data/csv/games.csv)
│   │   │   ├── [grammy-tracks.csv](./src/data/csv/grammy-tracks.csv)
│   │   │   ├── [grammy.csv](./src/data/csv/grammy.csv)
│   │   │   ├── [hardwares.csv](./src/data/csv/hardwares.csv)
│   │   │   ├── [hybrid-frameworks.csv](./src/data/csv/hybrid-frameworks.csv)
│   │   │   ├── [instruments.csv](./src/data/csv/instruments.csv)
│   │   │   ├── [languages.csv](./src/data/csv/languages.csv)
│   │   │   ├── [league-of-legends.csv](./src/data/csv/league-of-legends.csv)
│   │   │   ├── [literature.csv](./src/data/csv/literature.csv)
│   │   │   ├── [marathon-distances.csv](./src/data/csv/marathon-distances.csv)
│   │   │   ├── [marathon-majors.csv](./src/data/csv/marathon-majors.csv)
│   │   │   ├── [minimalism.csv](./src/data/csv/minimalism.csv)
│   │   │   ├── [motorcycle.csv](./src/data/csv/motorcycle.csv)
│   │   │   ├── [motorcycles.csv](./src/data/csv/motorcycles.csv)
│   │   │   ├── [movies.csv](./src/data/csv/movies.csv)
│   │   │   ├── [music-artists.csv](./src/data/csv/music-artists.csv)
│   │   │   ├── [musical.csv](./src/data/csv/musical.csv)
│   │   │   ├── [native-mobile-styling.csv](./src/data/csv/native-mobile-styling.csv)
│   │   │   ├── [negative-thoughts.csv](./src/data/csv/negative-thoughts.csv)
│   │   │   ├── [neuroscience.csv](./src/data/csv/neuroscience.csv)
│   │   │   ├── [news.csv](./src/data/csv/news.csv)
│   │   │   ├── [nobel.csv](./src/data/csv/nobel.csv)
│   │   │   ├── [podcasts.csv](./src/data/csv/podcasts.csv)
│   │   │   ├── [pub-sub.csv](./src/data/csv/pub-sub.csv)
│   │   │   ├── [random-research.csv](./src/data/csv/random-research.csv)
│   │   │   ├── [science-subjects.csv](./src/data/csv/science-subjects.csv)
│   │   │   ├── [series.csv](./src/data/csv/series.csv)
│   │   │   ├── [softwares.csv](./src/data/csv/softwares.csv)
│   │   │   ├── [sports.csv](./src/data/csv/sports.csv)
│   │   │   ├── [system-design.csv](./src/data/csv/system-design.csv)
│   │   │   ├── [tennis.csv](./src/data/csv/tennis.csv)
│   │   │   ├── [typescript-web-sockets.csv](./src/data/csv/typescript-web-sockets.csv)
│   │   │   ├── [university.csv](./src/data/csv/university.csv)
│   │   │   ├── [web-frameworks.csv](./src/data/csv/web-frameworks.csv)
│   │   │   ├── [web-styling.csv](./src/data/csv/web-styling.csv)
│   │   │   └── [yearly-resolutions.csv](./src/data/csv/yearly-resolutions.csv)
│   │   ├── md/
│   │   │   ├── [cheat-sheet.ts](./src/data/md/cheat-sheet.ts)
│   │   │   ├── [seed.gen.json](./src/data/md/seed.gen.json)
│   │   │   └── [seed.ts](./src/data/md/seed.ts)
│   │   └── tasks/
│   │       ├── [models.ts](./src/data/tasks/models.ts)
│   │       └── [seed.ts](./src/data/tasks/seed.ts)
│   ├── hooks/
│   │   ├── calendar/
│   │   ├── csv/
│   │   │   ├── __tests__/
│   │   │   │   ├── [useCsvState.test.ts](./src/hooks/csv/__tests__/useCsvState.test.ts)
│   │   │   │   └── [useEditor.test.ts](./src/hooks/csv/__tests__/useEditor.test.ts)
│   │   │   ├── [useCsvState.ts](./src/hooks/csv/useCsvState.ts)
│   │   │   └── [useEditor.ts](./src/hooks/csv/useEditor.ts)
│   │   ├── md/
│   │   │   ├── __tests__/
│   │   │   │   ├── [useCodeMirror.test.ts](./src/hooks/md/__tests__/useCodeMirror.test.ts)
│   │   │   │   ├── [useMarkdownRender.test.ts](./src/hooks/md/__tests__/useMarkdownRender.test.ts)
│   │   │   │   └── [useScrollSync.test.ts](./src/hooks/md/__tests__/useScrollSync.test.ts)
│   │   │   ├── [useCodeMirror.ts](./src/hooks/md/useCodeMirror.ts)
│   │   │   ├── [useMarkdownRender.ts](./src/hooks/md/useMarkdownRender.ts)
│   │   │   └── [useScrollSync.ts](./src/hooks/md/useScrollSync.ts)
│   │   └── shared/
│   │       ├── [useRegisterServiceWorker.ts](./src/hooks/shared/useRegisterServiceWorker.ts)
│   │       └── [useTheme.ts](./src/hooks/shared/useTheme.ts)
│   ├── lib/
│   │   ├── calendar/
│   │   │   ├── __tests__/
│   │   │   │   ├── [countdown.test.ts](./src/lib/calendar/__tests__/countdown.test.ts)
│   │   │   │   ├── [daysBetween.test.ts](./src/lib/calendar/__tests__/daysBetween.test.ts)
│   │   │   │   └── [fonts.test.ts](./src/lib/calendar/__tests__/fonts.test.ts)
│   │   │   ├── [countdown.ts](./src/lib/calendar/countdown.ts)
│   │   │   ├── [daysBetween.ts](./src/lib/calendar/daysBetween.ts)
│   │   │   └── [fonts.ts](./src/lib/calendar/fonts.ts)
│   │   ├── csv/
│   │   │   ├── __tests__/
│   │   │   │   ├── [autofill.test.ts](./src/lib/csv/__tests__/autofill.test.ts)
│   │   │   │   ├── [columns.test.ts](./src/lib/csv/__tests__/columns.test.ts)
│   │   │   │   ├── [csv.test.ts](./src/lib/csv/__tests__/csv.test.ts)
│   │   │   │   ├── [export.test.ts](./src/lib/csv/__tests__/export.test.ts)
│   │   │   │   ├── [format.test.ts](./src/lib/csv/__tests__/format.test.ts)
│   │   │   │   ├── [formula.test.ts](./src/lib/csv/__tests__/formula.test.ts)
│   │   │   │   ├── [grid.test.ts](./src/lib/csv/__tests__/grid.test.ts)
│   │   │   │   ├── [selection.test.ts](./src/lib/csv/__tests__/selection.test.ts)
│   │   │   │   ├── [storage.test.ts](./src/lib/csv/__tests__/storage.test.ts)
│   │   │   │   ├── [workbook.test.ts](./src/lib/csv/__tests__/workbook.test.ts)
│   │   │   │   └── [xlsx.test.ts](./src/lib/csv/__tests__/xlsx.test.ts)
│   │   │   ├── [autofill.ts](./src/lib/csv/autofill.ts)
│   │   │   ├── [columns.ts](./src/lib/csv/columns.ts)
│   │   │   ├── [csv.ts](./src/lib/csv/csv.ts)
│   │   │   ├── [export.ts](./src/lib/csv/export.ts)
│   │   │   ├── [format.ts](./src/lib/csv/format.ts)
│   │   │   ├── [formula.ts](./src/lib/csv/formula.ts)
│   │   │   ├── [grid.ts](./src/lib/csv/grid.ts)
│   │   │   ├── [selection.ts](./src/lib/csv/selection.ts)
│   │   │   ├── [storage.ts](./src/lib/csv/storage.ts)
│   │   │   ├── [types.ts](./src/lib/csv/types.ts)
│   │   │   ├── [workbook.ts](./src/lib/csv/workbook.ts)
│   │   │   ├── [xlsx.ts](./src/lib/csv/xlsx.ts)
│   │   │   └── [xml.ts](./src/lib/csv/xml.ts)
│   │   ├── md/
│   │   │   ├── __tests__/
│   │   │   │   ├── [braille.test.ts](./src/lib/md/__tests__/braille.test.ts)
│   │   │   │   ├── [date.test.ts](./src/lib/md/__tests__/date.test.ts)
│   │   │   │   ├── [export.test.ts](./src/lib/md/__tests__/export.test.ts)
│   │   │   │   ├── [format.test.ts](./src/lib/md/__tests__/format.test.ts)
│   │   │   │   ├── [leet.test.ts](./src/lib/md/__tests__/leet.test.ts)
│   │   │   │   ├── [markdown.test.ts](./src/lib/md/__tests__/markdown.test.ts)
│   │   │   │   ├── [morse.test.ts](./src/lib/md/__tests__/morse.test.ts)
│   │   │   │   ├── [slug.test.ts](./src/lib/md/__tests__/slug.test.ts)
│   │   │   │   ├── [storage.ssr.test.ts](./src/lib/md/__tests__/storage.ssr.test.ts)
│   │   │   │   ├── [storage.test.ts](./src/lib/md/__tests__/storage.test.ts)
│   │   │   │   ├── [textCase.test.ts](./src/lib/md/__tests__/textCase.test.ts)
│   │   │   │   ├── [typoglycemia.test.ts](./src/lib/md/__tests__/typoglycemia.test.ts)
│   │   │   │   ├── [wikilinks.test.ts](./src/lib/md/__tests__/wikilinks.test.ts)
│   │   │   │   └── [wordCounter.test.ts](./src/lib/md/__tests__/wordCounter.test.ts)
│   │   │   ├── [braille.ts](./src/lib/md/braille.ts)
│   │   │   ├── [date.ts](./src/lib/md/date.ts)
│   │   │   ├── [export.ts](./src/lib/md/export.ts)
│   │   │   ├── [format.ts](./src/lib/md/format.ts)
│   │   │   ├── [leet.ts](./src/lib/md/leet.ts)
│   │   │   ├── [markdown.ts](./src/lib/md/markdown.ts)
│   │   │   ├── [morse.ts](./src/lib/md/morse.ts)
│   │   │   ├── [slug.ts](./src/lib/md/slug.ts)
│   │   │   ├── [storage.ts](./src/lib/md/storage.ts)
│   │   │   ├── [textCase.ts](./src/lib/md/textCase.ts)
│   │   │   ├── [types.ts](./src/lib/md/types.ts)
│   │   │   ├── [typoglycemia.ts](./src/lib/md/typoglycemia.ts)
│   │   │   ├── [wikilinks.ts](./src/lib/md/wikilinks.ts)
│   │   │   └── [wordCounter.ts](./src/lib/md/wordCounter.ts)
│   │   └── tasks/
│   │       ├── __tests__/
│   │       │   ├── [auth.test.tsx](./src/lib/tasks/__tests__/auth.test.tsx)
│   │       │   ├── [collab.test.ts](./src/lib/tasks/__tests__/collab.test.ts)
│   │       │   ├── [data-provider.test.tsx](./src/lib/tasks/__tests__/data-provider.test.tsx)
│   │       │   ├── [db.test.ts](./src/lib/tasks/__tests__/db.test.ts)
│   │       │   ├── [format.test.ts](./src/lib/tasks/__tests__/format.test.ts)
│   │       │   ├── [toast.test.tsx](./src/lib/tasks/__tests__/toast.test.tsx)
│   │       │   └── [types.test.ts](./src/lib/tasks/__tests__/types.test.ts)
│   │       ├── [auth.tsx](./src/lib/tasks/auth.tsx)
│   │       ├── [collab.ts](./src/lib/tasks/collab.ts)
│   │       ├── [data-provider.tsx](./src/lib/tasks/data-provider.tsx)
│   │       ├── [db.ts](./src/lib/tasks/db.ts)
│   │       ├── [format.ts](./src/lib/tasks/format.ts)
│   │       ├── [toast.tsx](./src/lib/tasks/toast.tsx)
│   │       └── [types.ts](./src/lib/tasks/types.ts)
│   ├── notes/
│   │   ├── engineering/
│   │   │   ├── [agents.md](./src/notes/engineering/agents.md)
│   │   │   ├── [algorithms.md](./src/notes/engineering/algorithms.md)
│   │   │   ├── [blockchain.md](./src/notes/engineering/blockchain.md)
│   │   │   ├── [data-structures-and-algorithms.md](./src/notes/engineering/data-structures-and-algorithms.md)
│   │   │   ├── [data-structures.md](./src/notes/engineering/data-structures.md)
│   │   │   ├── [technology.md](./src/notes/engineering/technology.md)
│   │   │   └── [techstack.md](./src/notes/engineering/techstack.md)
│   │   ├── life/
│   │   │   ├── [education.md](./src/notes/life/education.md)
│   │   │   ├── [maslow-hierarchy.md](./src/notes/life/maslow-hierarchy.md)
│   │   │   ├── [monday-fear.md](./src/notes/life/monday-fear.md)
│   │   │   ├── [nothing.md](./src/notes/life/nothing.md)
│   │   │   └── [sample.md](./src/notes/life/sample.md)
│   │   ├── marketing/
│   │   │   └── copy-writer/
│   │   │       └── sites/
│   │   │           ├── [acquire.md](./src/notes/marketing/copy-writer/sites/acquire.md)
│   │   │           ├── [hacker-news.md](./src/notes/marketing/copy-writer/sites/hacker-news.md)
│   │   │           ├── [indie-hackers.md](./src/notes/marketing/copy-writer/sites/indie-hackers.md)
│   │   │           └── [product-hunt.md](./src/notes/marketing/copy-writer/sites/product-hunt.md)
│   │   ├── media/
│   │   │   ├── [entertainment.md](./src/notes/media/entertainment.md)
│   │   │   ├── [listening.md](./src/notes/media/listening.md)
│   │   │   ├── [reading.md](./src/notes/media/reading.md)
│   │   │   └── [watching.md](./src/notes/media/watching.md)
│   │   ├── science/
│   │   │   ├── [brain.md](./src/notes/science/brain.md)
│   │   │   ├── [mathematics.md](./src/notes/science/mathematics.md)
│   │   │   ├── [psychology.md](./src/notes/science/psychology.md)
│   │   │   ├── [sciences.md](./src/notes/science/sciences.md)
│   │   │   └── [stem.md](./src/notes/science/stem.md)
│   │   ├── sports/
│   │   │   └── [sports.md](./src/notes/sports/sports.md)
│   │   ├── transport/
│   │   │   └── [vehicles.md](./src/notes/transport/vehicles.md)
│   │   ├── [TREE.md](./src/notes/TREE.md)
│   │   ├── [engineering.md](./src/notes/engineering.md)
│   │   ├── [intro.md](./src/notes/intro.md)
│   │   ├── [me.md](./src/notes/me.md)
│   │   └── [resume.md](./src/notes/resume.md)
│   ├── styles/
│   │   ├── [globals.css](./src/styles/globals.css)
│   │   └── [themes.css](./src/styles/themes.css)
│   └── test/
│       └── [style-mock.js](./src/test/style-mock.js)
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

132 directories, 479 files
