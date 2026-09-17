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
│   │       ├── __tests__/
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
│   │   ├── devices/
│   │   │   ├── [devices.md](./src/notes/devices/devices.md)
│   │   │   ├── [headphones.md](./src/notes/devices/headphones.md)
│   │   │   ├── [laptops.md](./src/notes/devices/laptops.md)
│   │   │   ├── [phones.md](./src/notes/devices/phones.md)
│   │   │   ├── [tablets.md](./src/notes/devices/tablets.md)
│   │   │   └── [watches.md](./src/notes/devices/watches.md)
│   │   ├── engineering/
│   │   │   ├── data/
│   │   │   │   ├── analyst/
│   │   │   │   │   ├── non-technical/
│   │   │   │   │   │   ├── [powerbi.md](./src/notes/engineering/data/analyst/non-technical/powerbi.md)
│   │   │   │   │   │   └── [tableau.md](./src/notes/engineering/data/analyst/non-technical/tableau.md)
│   │   │   │   │   └── technical/
│   │   │   │   │       ├── [matplotlib.md](./src/notes/engineering/data/analyst/technical/matplotlib.md)
│   │   │   │   │       ├── [numpy.md](./src/notes/engineering/data/analyst/technical/numpy.md)
│   │   │   │   │       ├── [pandas.md](./src/notes/engineering/data/analyst/technical/pandas.md)
│   │   │   │   │       └── [statsmodels.md](./src/notes/engineering/data/analyst/technical/statsmodels.md)
│   │   │   │   ├── engineer/
│   │   │   │   │   ├── [apache-airflow.md](./src/notes/engineering/data/engineer/apache-airflow.md)
│   │   │   │   │   ├── [apache-iceberg.md](./src/notes/engineering/data/engineer/apache-iceberg.md)
│   │   │   │   │   ├── [apache-spark.md](./src/notes/engineering/data/engineer/apache-spark.md)
│   │   │   │   │   └── [apache-trino.md](./src/notes/engineering/data/engineer/apache-trino.md)
│   │   │   │   └── scientist/
│   │   │   │       ├── python/
│   │   │   │       │   ├── [hugging-face.md](./src/notes/engineering/data/scientist/python/hugging-face.md)
│   │   │   │       │   ├── [pytorch.md](./src/notes/engineering/data/scientist/python/pytorch.md)
│   │   │   │       │   ├── [scikit-learn.md](./src/notes/engineering/data/scientist/python/scikit-learn.md)
│   │   │   │       │   ├── [tensorflow.md](./src/notes/engineering/data/scientist/python/tensorflow.md)
│   │   │   │       │   └── [xgboost.md](./src/notes/engineering/data/scientist/python/xgboost.md)
│   │   │   │       └── typescript/
│   │   │   │           ├── [brain.js.md](./src/notes/engineering/data/scientist/typescript/brain.js.md)
│   │   │   │           ├── [mind.js.md](./src/notes/engineering/data/scientist/typescript/mind.js.md)
│   │   │   │           ├── [ml5.js.md](./src/notes/engineering/data/scientist/typescript/ml5.js.md)
│   │   │   │           └── [synaptic.js.md](./src/notes/engineering/data/scientist/typescript/synaptic.js.md)
│   │   │   ├── developer-tools/
│   │   │   │   ├── api/
│   │   │   │   │   ├── clients/
│   │   │   │   │   │   ├── [bruno.md](./src/notes/engineering/developer-tools/api/clients/bruno.md)
│   │   │   │   │   │   ├── [insomnia.md](./src/notes/engineering/developer-tools/api/clients/insomnia.md)
│   │   │   │   │   │   └── [postman.md](./src/notes/engineering/developer-tools/api/clients/postman.md)
│   │   │   │   │   └── documentation/
│   │   │   │   │       ├── [rapi-doc.md](./src/notes/engineering/developer-tools/api/documentation/rapi-doc.md)
│   │   │   │   │       ├── [redoc.md](./src/notes/engineering/developer-tools/api/documentation/redoc.md)
│   │   │   │   │       ├── [stoplight.md](./src/notes/engineering/developer-tools/api/documentation/stoplight.md)
│   │   │   │   │       └── [swagger.md](./src/notes/engineering/developer-tools/api/documentation/swagger.md)
│   │   │   │   ├── code-editors/
│   │   │   │   │   ├── [cursor.md](./src/notes/engineering/developer-tools/code-editors/cursor.md)
│   │   │   │   │   ├── [vscode.md](./src/notes/engineering/developer-tools/code-editors/vscode.md)
│   │   │   │   │   ├── [vscodium.md](./src/notes/engineering/developer-tools/code-editors/vscodium.md)
│   │   │   │   │   └── [windsurf.md](./src/notes/engineering/developer-tools/code-editors/windsurf.md)
│   │   │   │   ├── ide/
│   │   │   │   │   ├── jetbrains/
│   │   │   │   │   │   ├── [clion.md](./src/notes/engineering/developer-tools/ide/jetbrains/clion.md)
│   │   │   │   │   │   ├── [intellij-idea.md](./src/notes/engineering/developer-tools/ide/jetbrains/intellij-idea.md)
│   │   │   │   │   │   ├── [php-storm.md](./src/notes/engineering/developer-tools/ide/jetbrains/php-storm.md)
│   │   │   │   │   │   ├── [py-charm.md](./src/notes/engineering/developer-tools/ide/jetbrains/py-charm.md)
│   │   │   │   │   │   ├── [rider.md](./src/notes/engineering/developer-tools/ide/jetbrains/rider.md)
│   │   │   │   │   │   ├── [ruby-mine.md](./src/notes/engineering/developer-tools/ide/jetbrains/ruby-mine.md)
│   │   │   │   │   │   ├── [rust-rover.md](./src/notes/engineering/developer-tools/ide/jetbrains/rust-rover.md)
│   │   │   │   │   │   └── [web-storm.md](./src/notes/engineering/developer-tools/ide/jetbrains/web-storm.md)
│   │   │   │   │   ├── [android-studio.md](./src/notes/engineering/developer-tools/ide/android-studio.md)
│   │   │   │   │   ├── [visual-studio.md](./src/notes/engineering/developer-tools/ide/visual-studio.md)
│   │   │   │   │   └── [xcode.md](./src/notes/engineering/developer-tools/ide/xcode.md)
│   │   │   │   ├── languages/
│   │   │   │   │   ├── c/
│   │   │   │   │   │   └── tools/
│   │   │   │   │   │       └── [clang-format.md](./src/notes/engineering/developer-tools/languages/c/tools/clang-format.md)
│   │   │   │   │   ├── go/
│   │   │   │   │   │   └── tools/
│   │   │   │   │   │       └── [gofmt.md](./src/notes/engineering/developer-tools/languages/go/tools/gofmt.md)
│   │   │   │   │   ├── python/
│   │   │   │   │   │   └── tools/
│   │   │   │   │   │       ├── [black.md](./src/notes/engineering/developer-tools/languages/python/tools/black.md)
│   │   │   │   │   │       ├── [flake8.md](./src/notes/engineering/developer-tools/languages/python/tools/flake8.md)
│   │   │   │   │   │       ├── [pylint.md](./src/notes/engineering/developer-tools/languages/python/tools/pylint.md)
│   │   │   │   │   │       └── [ruff.md](./src/notes/engineering/developer-tools/languages/python/tools/ruff.md)
│   │   │   │   │   ├── shell/
│   │   │   │   │   │   └── tools/
│   │   │   │   │   │       └── [shell-check.md](./src/notes/engineering/developer-tools/languages/shell/tools/shell-check.md)
│   │   │   │   │   └── typescript/
│   │   │   │   │       ├── engines/
│   │   │   │   │       │   ├── [hermes.md](./src/notes/engineering/developer-tools/languages/typescript/engines/hermes.md)
│   │   │   │   │       │   ├── [javascript-core.md](./src/notes/engineering/developer-tools/languages/typescript/engines/javascript-core.md)
│   │   │   │   │       │   ├── [quick.js.md](./src/notes/engineering/developer-tools/languages/typescript/engines/quick.js.md)
│   │   │   │   │       │   ├── [spider-monkey.md](./src/notes/engineering/developer-tools/languages/typescript/engines/spider-monkey.md)
│   │   │   │   │       │   └── [v8.md](./src/notes/engineering/developer-tools/languages/typescript/engines/v8.md)
│   │   │   │   │       ├── monorepo/
│   │   │   │   │       │   ├── [bit.md](./src/notes/engineering/developer-tools/languages/typescript/monorepo/bit.md)
│   │   │   │   │       │   ├── [lerna.js.md](./src/notes/engineering/developer-tools/languages/typescript/monorepo/lerna.js.md)
│   │   │   │   │       │   ├── [nx.md](./src/notes/engineering/developer-tools/languages/typescript/monorepo/nx.md)
│   │   │   │   │       │   ├── [pnpm-workspaces.md](./src/notes/engineering/developer-tools/languages/typescript/monorepo/pnpm-workspaces.md)
│   │   │   │   │       │   ├── [turborepo.md](./src/notes/engineering/developer-tools/languages/typescript/monorepo/turborepo.md)
│   │   │   │   │       │   └── [yarn-workspaces.md](./src/notes/engineering/developer-tools/languages/typescript/monorepo/yarn-workspaces.md)
│   │   │   │   │       ├── packages/
│   │   │   │   │       │   ├── managers/
│   │   │   │   │       │   │   ├── [npm.md](./src/notes/engineering/developer-tools/languages/typescript/packages/managers/npm.md)
│   │   │   │   │       │   │   ├── [pnpm.md](./src/notes/engineering/developer-tools/languages/typescript/packages/managers/pnpm.md)
│   │   │   │   │       │   │   ├── [volt.md](./src/notes/engineering/developer-tools/languages/typescript/packages/managers/volt.md)
│   │   │   │   │       │   │   └── [yarn.md](./src/notes/engineering/developer-tools/languages/typescript/packages/managers/yarn.md)
│   │   │   │   │       │   └── registries/
│   │   │   │   │       │       ├── [github-packages.md](./src/notes/engineering/developer-tools/languages/typescript/packages/registries/github-packages.md)
│   │   │   │   │       │       └── [jsr.md](./src/notes/engineering/developer-tools/languages/typescript/packages/registries/jsr.md)
│   │   │   │   │       ├── runtimes/
│   │   │   │   │       │   ├── [bun.md](./src/notes/engineering/developer-tools/languages/typescript/runtimes/bun.md)
│   │   │   │   │       │   ├── [deno.md](./src/notes/engineering/developer-tools/languages/typescript/runtimes/deno.md)
│   │   │   │   │       │   ├── [llrt.md](./src/notes/engineering/developer-tools/languages/typescript/runtimes/llrt.md)
│   │   │   │   │       │   ├── [node.js.md](./src/notes/engineering/developer-tools/languages/typescript/runtimes/node.js.md)
│   │   │   │   │       │   └── [winter.js.md](./src/notes/engineering/developer-tools/languages/typescript/runtimes/winter.js.md)
│   │   │   │   │       └── tools/
│   │   │   │   │           ├── [biome.md](./src/notes/engineering/developer-tools/languages/typescript/tools/biome.md)
│   │   │   │   │           ├── [eslint.md](./src/notes/engineering/developer-tools/languages/typescript/tools/eslint.md)
│   │   │   │   │           ├── [oxc.md](./src/notes/engineering/developer-tools/languages/typescript/tools/oxc.md)
│   │   │   │   │           └── [prettier.md](./src/notes/engineering/developer-tools/languages/typescript/tools/prettier.md)
│   │   │   │   └── version-control/
│   │   │   │       ├── platform/
│   │   │   │       │   └── [launchpad.md](./src/notes/engineering/developer-tools/version-control/platform/launchpad.md)
│   │   │   │       └── system/
│   │   │   │           ├── [helix-core.md](./src/notes/engineering/developer-tools/version-control/system/helix-core.md)
│   │   │   │           └── [svn.md](./src/notes/engineering/developer-tools/version-control/system/svn.md)
│   │   │   ├── devops/
│   │   │   │   ├── container/
│   │   │   │   │   ├── desktop/
│   │   │   │   │   │   └── [rancher.md](./src/notes/engineering/devops/container/desktop/rancher.md)
│   │   │   │   │   ├── orchestration/
│   │   │   │   │   │   ├── [kubernetes.md](./src/notes/engineering/devops/container/orchestration/kubernetes.md)
│   │   │   │   │   │   └── [nomad.md](./src/notes/engineering/devops/container/orchestration/nomad.md)
│   │   │   │   │   └── runtimes/
│   │   │   │   │       ├── [containerd.md](./src/notes/engineering/devops/container/runtimes/containerd.md)
│   │   │   │   │       ├── [docker.md](./src/notes/engineering/devops/container/runtimes/docker.md)
│   │   │   │   │       ├── [hadolint.md](./src/notes/engineering/devops/container/runtimes/hadolint.md)
│   │   │   │   │       └── [podman.md](./src/notes/engineering/devops/container/runtimes/podman.md)
│   │   │   │   ├── delivery/
│   │   │   │   │   └── iac/
│   │   │   │   │       ├── [aws-cloudformation.md](./src/notes/engineering/devops/delivery/iac/aws-cloudformation.md)
│   │   │   │   │       ├── [open-tofu.md](./src/notes/engineering/devops/delivery/iac/open-tofu.md)
│   │   │   │   │       └── [terraform.md](./src/notes/engineering/devops/delivery/iac/terraform.md)
│   │   │   │   ├── hosting/
│   │   │   │   │   ├── baas/
│   │   │   │   │   │   ├── [appwrite.md](./src/notes/engineering/devops/hosting/baas/appwrite.md)
│   │   │   │   │   │   ├── [firebase.md](./src/notes/engineering/devops/hosting/baas/firebase.md)
│   │   │   │   │   │   ├── [nhost.md](./src/notes/engineering/devops/hosting/baas/nhost.md)
│   │   │   │   │   │   ├── [pocketbase.md](./src/notes/engineering/devops/hosting/baas/pocketbase.md)
│   │   │   │   │   │   └── [supabase.md](./src/notes/engineering/devops/hosting/baas/supabase.md)
│   │   │   │   │   ├── iaas/
│   │   │   │   │   │   ├── [aws.md](./src/notes/engineering/devops/hosting/iaas/aws.md)
│   │   │   │   │   │   ├── [azure.md](./src/notes/engineering/devops/hosting/iaas/azure.md)
│   │   │   │   │   │   ├── [digital-ocean.md](./src/notes/engineering/devops/hosting/iaas/digital-ocean.md)
│   │   │   │   │   │   ├── [google-cloud.md](./src/notes/engineering/devops/hosting/iaas/google-cloud.md)
│   │   │   │   │   │   └── [ibm-cloud.md](./src/notes/engineering/devops/hosting/iaas/ibm-cloud.md)
│   │   │   │   │   ├── paas/
│   │   │   │   │   │   ├── [google-app-engine.md](./src/notes/engineering/devops/hosting/paas/google-app-engine.md)
│   │   │   │   │   │   ├── [heroku.md](./src/notes/engineering/devops/hosting/paas/heroku.md)
│   │   │   │   │   │   ├── [open-shift.md](./src/notes/engineering/devops/hosting/paas/open-shift.md)
│   │   │   │   │   │   ├── [railway.md](./src/notes/engineering/devops/hosting/paas/railway.md)
│   │   │   │   │   │   └── [render.md](./src/notes/engineering/devops/hosting/paas/render.md)
│   │   │   │   │   ├── serverless/
│   │   │   │   │   │   ├── [cloudflare-workers.md](./src/notes/engineering/devops/hosting/serverless/cloudflare-workers.md)
│   │   │   │   │   │   ├── [deno-deploy.md](./src/notes/engineering/devops/hosting/serverless/deno-deploy.md)
│   │   │   │   │   │   ├── [fly.md](./src/notes/engineering/devops/hosting/serverless/fly.md)
│   │   │   │   │   │   ├── [netlify.md](./src/notes/engineering/devops/hosting/serverless/netlify.md)
│   │   │   │   │   │   └── [vercel.md](./src/notes/engineering/devops/hosting/serverless/vercel.md)
│   │   │   │   │   └── static/
│   │   │   │   │       ├── [cloudflare-pages.md](./src/notes/engineering/devops/hosting/static/cloudflare-pages.md)
│   │   │   │   │       └── [github-pages.md](./src/notes/engineering/devops/hosting/static/github-pages.md)
│   │   │   │   ├── observability/
│   │   │   │   │   ├── [aws-cloudwatch.md](./src/notes/engineering/devops/observability/aws-cloudwatch.md)
│   │   │   │   │   ├── [datadog.md](./src/notes/engineering/devops/observability/datadog.md)
│   │   │   │   │   ├── [grafana.md](./src/notes/engineering/devops/observability/grafana.md)
│   │   │   │   │   ├── [kibana.md](./src/notes/engineering/devops/observability/kibana.md)
│   │   │   │   │   └── [splunk.md](./src/notes/engineering/devops/observability/splunk.md)
│   │   │   │   └── secrets/
│   │   │   │       ├── [aws-secrets-manager.md](./src/notes/engineering/devops/secrets/aws-secrets-manager.md)
│   │   │   │       ├── [azure-key-vault.md](./src/notes/engineering/devops/secrets/azure-key-vault.md)
│   │   │   │       ├── [hashicorp-vault.md](./src/notes/engineering/devops/secrets/hashicorp-vault.md)
│   │   │   │       ├── [infisical.md](./src/notes/engineering/devops/secrets/infisical.md)
│   │   │   │       ├── [kubernetes-secrets.md](./src/notes/engineering/devops/secrets/kubernetes-secrets.md)
│   │   │   │       └── [open-bao.md](./src/notes/engineering/devops/secrets/open-bao.md)
│   │   │   ├── game/
│   │   │   │   └── engines/
│   │   │   │       ├── [cocos.md](./src/notes/engineering/game/engines/cocos.md)
│   │   │   │       ├── [godot.md](./src/notes/engineering/game/engines/godot.md)
│   │   │   │       ├── [unity.md](./src/notes/engineering/game/engines/unity.md)
│   │   │   │       └── [unreal.md](./src/notes/engineering/game/engines/unreal.md)
│   │   │   ├── hardware/
│   │   │   │   ├── chip/
│   │   │   │   │   ├── apple/
│   │   │   │   │   │   ├── [a-series.md](./src/notes/engineering/hardware/chip/apple/a-series.md)
│   │   │   │   │   │   └── [m-series.md](./src/notes/engineering/hardware/chip/apple/m-series.md)
│   │   │   │   │   └── [snapdragon.md](./src/notes/engineering/hardware/chip/snapdragon.md)
│   │   │   │   ├── microcontroller/
│   │   │   │   │   ├── [arduino.md](./src/notes/engineering/hardware/microcontroller/arduino.md)
│   │   │   │   │   ├── [esp32.md](./src/notes/engineering/hardware/microcontroller/esp32.md)
│   │   │   │   │   └── [raspberry-pi-pico.md](./src/notes/engineering/hardware/microcontroller/raspberry-pi-pico.md)
│   │   │   │   ├── tpu/
│   │   │   │   │   └── [google.md](./src/notes/engineering/hardware/tpu/google.md)
│   │   │   │   └── [raspberry-pi.md](./src/notes/engineering/hardware/raspberry-pi.md)
│   │   │   ├── languages/
│   │   │   │   ├── compiled/
│   │   │   │   │   ├── [c.md](./src/notes/engineering/languages/compiled/c.md)
│   │   │   │   │   ├── [cplusplus.md](./src/notes/engineering/languages/compiled/cplusplus.md)
│   │   │   │   │   ├── [go.md](./src/notes/engineering/languages/compiled/go.md)
│   │   │   │   │   └── [rust.md](./src/notes/engineering/languages/compiled/rust.md)
│   │   │   │   ├── data/
│   │   │   │   │   ├── [javascript.md](./src/notes/engineering/languages/data/javascript.md)
│   │   │   │   │   ├── [matlab.md](./src/notes/engineering/languages/data/matlab.md)
│   │   │   │   │   ├── [python.md](./src/notes/engineering/languages/data/python.md)
│   │   │   │   │   └── [r.md](./src/notes/engineering/languages/data/r.md)
│   │   │   │   ├── full-stack/
│   │   │   │   │   ├── [dart.md](./src/notes/engineering/languages/full-stack/dart.md)
│   │   │   │   │   ├── [php.md](./src/notes/engineering/languages/full-stack/php.md)
│   │   │   │   │   ├── [ruby.md](./src/notes/engineering/languages/full-stack/ruby.md)
│   │   │   │   │   └── [typescript.md](./src/notes/engineering/languages/full-stack/typescript.md)
│   │   │   │   ├── jvm/
│   │   │   │   │   ├── [groovy.md](./src/notes/engineering/languages/jvm/groovy.md)
│   │   │   │   │   ├── [java.md](./src/notes/engineering/languages/jvm/java.md)
│   │   │   │   │   ├── [kotlin.md](./src/notes/engineering/languages/jvm/kotlin.md)
│   │   │   │   │   └── [scala.md](./src/notes/engineering/languages/jvm/scala.md)
│   │   │   │   ├── native/
│   │   │   │   │   ├── [csharp.md](./src/notes/engineering/languages/native/csharp.md)
│   │   │   │   │   └── [swift.md](./src/notes/engineering/languages/native/swift.md)
│   │   │   │   └── terminal/
│   │   │   │       ├── [bash.md](./src/notes/engineering/languages/terminal/bash.md)
│   │   │   │       └── [power-shell.md](./src/notes/engineering/languages/terminal/power-shell.md)
│   │   │   ├── roles/
│   │   │   │   ├── delivery/
│   │   │   │   │   ├── [release-train-engineer.md](./src/notes/engineering/roles/delivery/release-train-engineer.md)
│   │   │   │   │   └── [scrum-master.md](./src/notes/engineering/roles/delivery/scrum-master.md)
│   │   │   │   ├── engineer/
│   │   │   │   │   ├── [distinguished.md](./src/notes/engineering/roles/engineer/distinguished.md)
│   │   │   │   │   ├── [lead.md](./src/notes/engineering/roles/engineer/lead.md)
│   │   │   │   │   ├── [manager.md](./src/notes/engineering/roles/engineer/manager.md)
│   │   │   │   │   └── [principal.md](./src/notes/engineering/roles/engineer/principal.md)
│   │   │   │   ├── product/
│   │   │   │   │   ├── [business-analyst.md](./src/notes/engineering/roles/product/business-analyst.md)
│   │   │   │   │   └── [product-owner.md](./src/notes/engineering/roles/product/product-owner.md)
│   │   │   │   └── solution/
│   │   │   │       ├── [architect.md](./src/notes/engineering/roles/solution/architect.md)
│   │   │   │       └── [design.md](./src/notes/engineering/roles/solution/design.md)
│   │   │   ├── software/
│   │   │   │   ├── backend/
│   │   │   │   │   ├── api/
│   │   │   │   │   │   ├── protocols/
│   │   │   │   │   │   │   ├── [amqp.md](./src/notes/engineering/software/backend/api/protocols/amqp.md)
│   │   │   │   │   │   │   ├── [grpc.md](./src/notes/engineering/software/backend/api/protocols/grpc.md)
│   │   │   │   │   │   │   ├── [https.md](./src/notes/engineering/software/backend/api/protocols/https.md)
│   │   │   │   │   │   │   ├── [mqtt.md](./src/notes/engineering/software/backend/api/protocols/mqtt.md)
│   │   │   │   │   │   │   ├── [tcp.md](./src/notes/engineering/software/backend/api/protocols/tcp.md)
│   │   │   │   │   │   │   ├── [udp.md](./src/notes/engineering/software/backend/api/protocols/udp.md)
│   │   │   │   │   │   │   └── [web-socket.md](./src/notes/engineering/software/backend/api/protocols/web-socket.md)
│   │   │   │   │   │   └── styles/
│   │   │   │   │   │       ├── https/
│   │   │   │   │   │       │   ├── [graphql.md](./src/notes/engineering/software/backend/api/styles/https/graphql.md)
│   │   │   │   │   │       │   ├── [rest.md](./src/notes/engineering/software/backend/api/styles/https/rest.md)
│   │   │   │   │   │       │   └── [webhook.md](./src/notes/engineering/software/backend/api/styles/https/webhook.md)
│   │   │   │   │   │       └── [rpc.md](./src/notes/engineering/software/backend/api/styles/rpc.md)
│   │   │   │   │   ├── architecture/
│   │   │   │   │   │   ├── [cqrs.md](./src/notes/engineering/software/backend/architecture/cqrs.md)
│   │   │   │   │   │   ├── [event-driven.md](./src/notes/engineering/software/backend/architecture/event-driven.md)
│   │   │   │   │   │   ├── [hexagonal.md](./src/notes/engineering/software/backend/architecture/hexagonal.md)
│   │   │   │   │   │   ├── [microservices.md](./src/notes/engineering/software/backend/architecture/microservices.md)
│   │   │   │   │   │   └── [monolith.md](./src/notes/engineering/software/backend/architecture/monolith.md)
│   │   │   │   │   ├── database/
│   │   │   │   │   │   ├── hosting/
│   │   │   │   │   │   │   ├── [neon.md](./src/notes/engineering/software/backend/database/hosting/neon.md)
│   │   │   │   │   │   │   └── [planet-scale.md](./src/notes/engineering/software/backend/database/hosting/planet-scale.md)
│   │   │   │   │   │   ├── orm/
│   │   │   │   │   │   │   ├── python/
│   │   │   │   │   │   │   │   └── [sql-alchemy.md](./src/notes/engineering/software/backend/database/orm/python/sql-alchemy.md)
│   │   │   │   │   │   │   └── typescript/
│   │   │   │   │   │   │       ├── [drizzle.md](./src/notes/engineering/software/backend/database/orm/typescript/drizzle.md)
│   │   │   │   │   │   │       ├── [mikro-orm.md](./src/notes/engineering/software/backend/database/orm/typescript/mikro-orm.md)
│   │   │   │   │   │   │       ├── [mongoose.md](./src/notes/engineering/software/backend/database/orm/typescript/mongoose.md)
│   │   │   │   │   │   │       ├── [prisma.md](./src/notes/engineering/software/backend/database/orm/typescript/prisma.md)
│   │   │   │   │   │   │       ├── [sequelize.md](./src/notes/engineering/software/backend/database/orm/typescript/sequelize.md)
│   │   │   │   │   │   │       └── [type-orm.md](./src/notes/engineering/software/backend/database/orm/typescript/type-orm.md)
│   │   │   │   │   │   └── paradigms/
│   │   │   │   │   │       ├── cache/
│   │   │   │   │   │       │   ├── [badger.md](./src/notes/engineering/software/backend/database/paradigms/cache/badger.md)
│   │   │   │   │   │       │   ├── [leveldb.md](./src/notes/engineering/software/backend/database/paradigms/cache/leveldb.md)
│   │   │   │   │   │       │   ├── [memcached.md](./src/notes/engineering/software/backend/database/paradigms/cache/memcached.md)
│   │   │   │   │   │       │   ├── [redis.md](./src/notes/engineering/software/backend/database/paradigms/cache/redis.md)
│   │   │   │   │   │       │   ├── [rocksdb.md](./src/notes/engineering/software/backend/database/paradigms/cache/rocksdb.md)
│   │   │   │   │   │       │   └── [valkey.md](./src/notes/engineering/software/backend/database/paradigms/cache/valkey.md)
│   │   │   │   │   │       ├── graph/
│   │   │   │   │   │       │   ├── [dgraph.md](./src/notes/engineering/software/backend/database/paradigms/graph/dgraph.md)
│   │   │   │   │   │       │   └── [neo4j.md](./src/notes/engineering/software/backend/database/paradigms/graph/neo4j.md)
│   │   │   │   │   │       ├── multi/
│   │   │   │   │   │       │   └── [fauna.md](./src/notes/engineering/software/backend/database/paradigms/multi/fauna.md)
│   │   │   │   │   │       ├── nosql/
│   │   │   │   │   │       │   ├── [couchbase.md](./src/notes/engineering/software/backend/database/paradigms/nosql/couchbase.md)
│   │   │   │   │   │       │   ├── [couchdb.md](./src/notes/engineering/software/backend/database/paradigms/nosql/couchdb.md)
│   │   │   │   │   │       │   ├── [dynamodb.md](./src/notes/engineering/software/backend/database/paradigms/nosql/dynamodb.md)
│   │   │   │   │   │       │   ├── [mongodb.md](./src/notes/engineering/software/backend/database/paradigms/nosql/mongodb.md)
│   │   │   │   │   │       │   └── [rethinkdb.md](./src/notes/engineering/software/backend/database/paradigms/nosql/rethinkdb.md)
│   │   │   │   │   │       ├── search/
│   │   │   │   │   │       │   ├── [apache-solr.md](./src/notes/engineering/software/backend/database/paradigms/search/apache-solr.md)
│   │   │   │   │   │       │   ├── [elasticsearch.md](./src/notes/engineering/software/backend/database/paradigms/search/elasticsearch.md)
│   │   │   │   │   │       │   └── [opensearch.md](./src/notes/engineering/software/backend/database/paradigms/search/opensearch.md)
│   │   │   │   │   │       ├── sql/
│   │   │   │   │   │       │   ├── [cockroachdb.md](./src/notes/engineering/software/backend/database/paradigms/sql/cockroachdb.md)
│   │   │   │   │   │       │   ├── [libsql.md](./src/notes/engineering/software/backend/database/paradigms/sql/libsql.md)
│   │   │   │   │   │       │   ├── [mariadb.md](./src/notes/engineering/software/backend/database/paradigms/sql/mariadb.md)
│   │   │   │   │   │       │   ├── [mssql.md](./src/notes/engineering/software/backend/database/paradigms/sql/mssql.md)
│   │   │   │   │   │       │   ├── [mysql.md](./src/notes/engineering/software/backend/database/paradigms/sql/mysql.md)
│   │   │   │   │   │       │   ├── [postgresql.md](./src/notes/engineering/software/backend/database/paradigms/sql/postgresql.md)
│   │   │   │   │   │       │   └── [sqlite.md](./src/notes/engineering/software/backend/database/paradigms/sql/sqlite.md)
│   │   │   │   │   │       └── wide-column/
│   │   │   │   │   │           ├── [apache-cassandra.md](./src/notes/engineering/software/backend/database/paradigms/wide-column/apache-cassandra.md)
│   │   │   │   │   │           └── [apache-hbase.md](./src/notes/engineering/software/backend/database/paradigms/wide-column/apache-hbase.md)
│   │   │   │   │   ├── events/
│   │   │   │   │   │   ├── pub-sub/
│   │   │   │   │   │   │   ├── [mqtt.md](./src/notes/engineering/software/backend/events/pub-sub/mqtt.md)
│   │   │   │   │   │   │   └── [nats.md](./src/notes/engineering/software/backend/events/pub-sub/nats.md)
│   │   │   │   │   │   ├── queue/
│   │   │   │   │   │   │   ├── [activemq.md](./src/notes/engineering/software/backend/events/queue/activemq.md)
│   │   │   │   │   │   │   └── [rabbitmq.md](./src/notes/engineering/software/backend/events/queue/rabbitmq.md)
│   │   │   │   │   │   └── streaming/
│   │   │   │   │   │       ├── [apache-kafka.md](./src/notes/engineering/software/backend/events/streaming/apache-kafka.md)
│   │   │   │   │   │       └── [apache-pulsar.md](./src/notes/engineering/software/backend/events/streaming/apache-pulsar.md)
│   │   │   │   │   ├── languages/
│   │   │   │   │   │   ├── csharp/
│   │   │   │   │   │   │   └── [dotnet.md](./src/notes/engineering/software/backend/languages/csharp/dotnet.md)
│   │   │   │   │   │   ├── go/
│   │   │   │   │   │   │   ├── frameworks/
│   │   │   │   │   │   │   │   ├── [beego.md](./src/notes/engineering/software/backend/languages/go/frameworks/beego.md)
│   │   │   │   │   │   │   │   ├── [chi.md](./src/notes/engineering/software/backend/languages/go/frameworks/chi.md)
│   │   │   │   │   │   │   │   ├── [echo.md](./src/notes/engineering/software/backend/languages/go/frameworks/echo.md)
│   │   │   │   │   │   │   │   ├── [gin.md](./src/notes/engineering/software/backend/languages/go/frameworks/gin.md)
│   │   │   │   │   │   │   │   └── [gorilla.md](./src/notes/engineering/software/backend/languages/go/frameworks/gorilla.md)
│   │   │   │   │   │   │   └── graphql/
│   │   │   │   │   │   │       └── [graphql-go.md](./src/notes/engineering/software/backend/languages/go/graphql/graphql-go.md)
│   │   │   │   │   │   ├── jvm/
│   │   │   │   │   │   │   ├── java/
│   │   │   │   │   │   │   │   ├── [helidon.md](./src/notes/engineering/software/backend/languages/jvm/java/helidon.md)
│   │   │   │   │   │   │   │   ├── [javalin.md](./src/notes/engineering/software/backend/languages/jvm/java/javalin.md)
│   │   │   │   │   │   │   │   ├── [micronaut.md](./src/notes/engineering/software/backend/languages/jvm/java/micronaut.md)
│   │   │   │   │   │   │   │   ├── [quarkus.md](./src/notes/engineering/software/backend/languages/jvm/java/quarkus.md)
│   │   │   │   │   │   │   │   └── [spring-boot.md](./src/notes/engineering/software/backend/languages/jvm/java/spring-boot.md)
│   │   │   │   │   │   │   ├── kotlin/
│   │   │   │   │   │   │   │   └── [ktor.md](./src/notes/engineering/software/backend/languages/jvm/kotlin/ktor.md)
│   │   │   │   │   │   │   └── scala/
│   │   │   │   │   │   │       ├── [akka.md](./src/notes/engineering/software/backend/languages/jvm/scala/akka.md)
│   │   │   │   │   │   │       ├── [http4s.md](./src/notes/engineering/software/backend/languages/jvm/scala/http4s.md)
│   │   │   │   │   │   │       └── [play.md](./src/notes/engineering/software/backend/languages/jvm/scala/play.md)
│   │   │   │   │   │   ├── php/
│   │   │   │   │   │   │   └── [laravel.md](./src/notes/engineering/software/backend/languages/php/laravel.md)
│   │   │   │   │   │   ├── python/
│   │   │   │   │   │   │   ├── [fastapi.md](./src/notes/engineering/software/backend/languages/python/fastapi.md)
│   │   │   │   │   │   │   ├── [flask.md](./src/notes/engineering/software/backend/languages/python/flask.md)
│   │   │   │   │   │   │   ├── [pyramid.md](./src/notes/engineering/software/backend/languages/python/pyramid.md)
│   │   │   │   │   │   │   └── [tonardo.md](./src/notes/engineering/software/backend/languages/python/tonardo.md)
│   │   │   │   │   │   ├── ruby/
│   │   │   │   │   │   │   └── [rails.md](./src/notes/engineering/software/backend/languages/ruby/rails.md)
│   │   │   │   │   │   ├── rust/
│   │   │   │   │   │   │   ├── [actix.md](./src/notes/engineering/software/backend/languages/rust/actix.md)
│   │   │   │   │   │   │   ├── [gotham.md](./src/notes/engineering/software/backend/languages/rust/gotham.md)
│   │   │   │   │   │   │   ├── [hyper.md](./src/notes/engineering/software/backend/languages/rust/hyper.md)
│   │   │   │   │   │   │   ├── [rocket.md](./src/notes/engineering/software/backend/languages/rust/rocket.md)
│   │   │   │   │   │   │   └── [wrap.md](./src/notes/engineering/software/backend/languages/rust/wrap.md)
│   │   │   │   │   │   └── typescript/
│   │   │   │   │   │       ├── frameworks/
│   │   │   │   │   │       │   ├── [express.js.md](./src/notes/engineering/software/backend/languages/typescript/frameworks/express.js.md)
│   │   │   │   │   │       │   ├── [fastify.js.md](./src/notes/engineering/software/backend/languages/typescript/frameworks/fastify.js.md)
│   │   │   │   │   │       │   ├── [hapi.js.md](./src/notes/engineering/software/backend/languages/typescript/frameworks/hapi.js.md)
│   │   │   │   │   │       │   ├── [hono.js.md](./src/notes/engineering/software/backend/languages/typescript/frameworks/hono.js.md)
│   │   │   │   │   │       │   ├── [koa.js.md](./src/notes/engineering/software/backend/languages/typescript/frameworks/koa.js.md)
│   │   │   │   │   │       │   └── [nest.js.md](./src/notes/engineering/software/backend/languages/typescript/frameworks/nest.js.md)
│   │   │   │   │   │       ├── graphql/
│   │   │   │   │   │       │   ├── [apollo-server.md](./src/notes/engineering/software/backend/languages/typescript/graphql/apollo-server.md)
│   │   │   │   │   │       │   ├── [garph.md](./src/notes/engineering/software/backend/languages/typescript/graphql/garph.md)
│   │   │   │   │   │       │   ├── [mercurius.md](./src/notes/engineering/software/backend/languages/typescript/graphql/mercurius.md)
│   │   │   │   │   │       │   └── [yoga.md](./src/notes/engineering/software/backend/languages/typescript/graphql/yoga.md)
│   │   │   │   │   │       ├── native/
│   │   │   │   │   │       │   ├── [bun.http.md](./src/notes/engineering/software/backend/languages/typescript/native/bun.http.md)
│   │   │   │   │   │       │   ├── [deno.http.md](./src/notes/engineering/software/backend/languages/typescript/native/deno.http.md)
│   │   │   │   │   │       │   └── [node.http.md](./src/notes/engineering/software/backend/languages/typescript/native/node.http.md)
│   │   │   │   │   │       └── web-socket/
│   │   │   │   │   │           ├── [sock.js.md](./src/notes/engineering/software/backend/languages/typescript/web-socket/sock.js.md)
│   │   │   │   │   │           ├── [socket.io.md](./src/notes/engineering/software/backend/languages/typescript/web-socket/socket.io.md)
│   │   │   │   │   │           └── [ws.md](./src/notes/engineering/software/backend/languages/typescript/web-socket/ws.md)
│   │   │   │   │   └── security/
│   │   │   │   │       ├── [jwt.md](./src/notes/engineering/software/backend/security/jwt.md)
│   │   │   │   │       ├── [oauth2.md](./src/notes/engineering/software/backend/security/oauth2.md)
│   │   │   │   │       └── [oidc.md](./src/notes/engineering/software/backend/security/oidc.md)
│   │   │   │   ├── cli/
│   │   │   │   │   ├── go/
│   │   │   │   │   │   └── [cobra.md](./src/notes/engineering/software/cli/go/cobra.md)
│   │   │   │   │   ├── python/
│   │   │   │   │   │   ├── [argparse.md](./src/notes/engineering/software/cli/python/argparse.md)
│   │   │   │   │   │   └── [click.md](./src/notes/engineering/software/cli/python/click.md)
│   │   │   │   │   ├── rust/
│   │   │   │   │   │   ├── [argh.md](./src/notes/engineering/software/cli/rust/argh.md)
│   │   │   │   │   │   └── [clap.md](./src/notes/engineering/software/cli/rust/clap.md)
│   │   │   │   │   └── typescript/
│   │   │   │   │       ├── [commander.md](./src/notes/engineering/software/cli/typescript/commander.md)
│   │   │   │   │       ├── [oclif.md](./src/notes/engineering/software/cli/typescript/oclif.md)
│   │   │   │   │       └── [yargs.md](./src/notes/engineering/software/cli/typescript/yargs.md)
│   │   │   │   ├── frontend/
│   │   │   │   │   ├── bff/
│   │   │   │   │   │   ├── [graphql.md](./src/notes/engineering/software/frontend/bff/graphql.md)
│   │   │   │   │   │   └── [trpc.md](./src/notes/engineering/software/frontend/bff/trpc.md)
│   │   │   │   │   ├── hybrid/
│   │   │   │   │   │   ├── desktop/
│   │   │   │   │   │   │   ├── [electron.md](./src/notes/engineering/software/frontend/hybrid/desktop/electron.md)
│   │   │   │   │   │   │   ├── [tauri.md](./src/notes/engineering/software/frontend/hybrid/desktop/tauri.md)
│   │   │   │   │   │   │   └── [wails.md](./src/notes/engineering/software/frontend/hybrid/desktop/wails.md)
│   │   │   │   │   │   ├── mobile/
│   │   │   │   │   │   │   ├── frameworks/
│   │   │   │   │   │   │   │   ├── [capacitor.js.md](./src/notes/engineering/software/frontend/hybrid/mobile/frameworks/capacitor.js.md)
│   │   │   │   │   │   │   │   ├── [expo.md](./src/notes/engineering/software/frontend/hybrid/mobile/frameworks/expo.md)
│   │   │   │   │   │   │   │   ├── [ionic.md](./src/notes/engineering/software/frontend/hybrid/mobile/frameworks/ionic.md)
│   │   │   │   │   │   │   │   ├── [lynx.md](./src/notes/engineering/software/frontend/hybrid/mobile/frameworks/lynx.md)
│   │   │   │   │   │   │   │   ├── [native-script.md](./src/notes/engineering/software/frontend/hybrid/mobile/frameworks/native-script.md)
│   │   │   │   │   │   │   │   ├── [react-native.md](./src/notes/engineering/software/frontend/hybrid/mobile/frameworks/react-native.md)
│   │   │   │   │   │   │   │   └── [svelte-native.md](./src/notes/engineering/software/frontend/hybrid/mobile/frameworks/svelte-native.md)
│   │   │   │   │   │   │   └── styling/
│   │   │   │   │   │   │       └── [nativewind.md](./src/notes/engineering/software/frontend/hybrid/mobile/styling/nativewind.md)
│   │   │   │   │   │   ├── multi/
│   │   │   │   │   │   │   ├── [meteor.md](./src/notes/engineering/software/frontend/hybrid/multi/meteor.md)
│   │   │   │   │   │   │   └── [quasar.md](./src/notes/engineering/software/frontend/hybrid/multi/quasar.md)
│   │   │   │   │   │   └── [flutter.md](./src/notes/engineering/software/frontend/hybrid/flutter.md)
│   │   │   │   │   ├── native/
│   │   │   │   │   │   ├── desktop/
│   │   │   │   │   │   │   ├── linux/
│   │   │   │   │   │   │   │   ├── [alpine-linux.md](./src/notes/engineering/software/frontend/native/desktop/linux/alpine-linux.md)
│   │   │   │   │   │   │   │   ├── [arch-linux.md](./src/notes/engineering/software/frontend/native/desktop/linux/arch-linux.md)
│   │   │   │   │   │   │   │   ├── [chromeos.md](./src/notes/engineering/software/frontend/native/desktop/linux/chromeos.md)
│   │   │   │   │   │   │   │   ├── [debian.md](./src/notes/engineering/software/frontend/native/desktop/linux/debian.md)
│   │   │   │   │   │   │   │   ├── [fedora.md](./src/notes/engineering/software/frontend/native/desktop/linux/fedora.md)
│   │   │   │   │   │   │   │   ├── [freebsd.md](./src/notes/engineering/software/frontend/native/desktop/linux/freebsd.md)
│   │   │   │   │   │   │   │   ├── [kali.md](./src/notes/engineering/software/frontend/native/desktop/linux/kali.md)
│   │   │   │   │   │   │   │   ├── [kernel.md](./src/notes/engineering/software/frontend/native/desktop/linux/kernel.md)
│   │   │   │   │   │   │   │   ├── [linux.md](./src/notes/engineering/software/frontend/native/desktop/linux/linux.md)
│   │   │   │   │   │   │   │   ├── [mint.md](./src/notes/engineering/software/frontend/native/desktop/linux/mint.md)
│   │   │   │   │   │   │   │   ├── [red-hat-enterprise-linux.md](./src/notes/engineering/software/frontend/native/desktop/linux/red-hat-enterprise-linux.md)
│   │   │   │   │   │   │   │   └── [ubuntu.md](./src/notes/engineering/software/frontend/native/desktop/linux/ubuntu.md)
│   │   │   │   │   │   │   ├── [macos.md](./src/notes/engineering/software/frontend/native/desktop/macos.md)
│   │   │   │   │   │   │   └── [windows.md](./src/notes/engineering/software/frontend/native/desktop/windows.md)
│   │   │   │   │   │   └── mobile/
│   │   │   │   │   │       ├── operating-systems/
│   │   │   │   │   │       │   ├── [android.md](./src/notes/engineering/software/frontend/native/mobile/operating-systems/android.md)
│   │   │   │   │   │       │   ├── [harmonyos.md](./src/notes/engineering/software/frontend/native/mobile/operating-systems/harmonyos.md)
│   │   │   │   │   │       │   ├── [ios.md](./src/notes/engineering/software/frontend/native/mobile/operating-systems/ios.md)
│   │   │   │   │   │       │   ├── [kaios.md](./src/notes/engineering/software/frontend/native/mobile/operating-systems/kaios.md)
│   │   │   │   │   │       │   └── [ubuntu-touch.md](./src/notes/engineering/software/frontend/native/mobile/operating-systems/ubuntu-touch.md)
│   │   │   │   │   │       └── styling/
│   │   │   │   │   │           ├── [material3.md](./src/notes/engineering/software/frontend/native/mobile/styling/material3.md)
│   │   │   │   │   │           └── [swift-ui.md](./src/notes/engineering/software/frontend/native/mobile/styling/swift-ui.md)
│   │   │   │   │   └── web/
│   │   │   │   │       ├── authentication/
│   │   │   │   │       │   ├── [auth.js.md](./src/notes/engineering/software/frontend/web/authentication/auth.js.md)
│   │   │   │   │       │   └── [better-auth.md](./src/notes/engineering/software/frontend/web/authentication/better-auth.md)
│   │   │   │   │       ├── build-tools/
│   │   │   │   │       │   ├── bundler/
│   │   │   │   │       │   │   ├── [esbuild.md](./src/notes/engineering/software/frontend/web/build-tools/bundler/esbuild.md)
│   │   │   │   │       │   │   ├── [parcel.js.md](./src/notes/engineering/software/frontend/web/build-tools/bundler/parcel.js.md)
│   │   │   │   │       │   │   ├── [rollup.js.md](./src/notes/engineering/software/frontend/web/build-tools/bundler/rollup.js.md)
│   │   │   │   │       │   │   ├── [rspack.md](./src/notes/engineering/software/frontend/web/build-tools/bundler/rspack.md)
│   │   │   │   │       │   │   └── [webpack.js.md](./src/notes/engineering/software/frontend/web/build-tools/bundler/webpack.js.md)
│   │   │   │   │       │   ├── compiler/
│   │   │   │   │       │   │   ├── [babel.js.md](./src/notes/engineering/software/frontend/web/build-tools/compiler/babel.js.md)
│   │   │   │   │       │   │   └── [swc.md](./src/notes/engineering/software/frontend/web/build-tools/compiler/swc.md)
│   │   │   │   │       │   ├── [storybook.md](./src/notes/engineering/software/frontend/web/build-tools/storybook.md)
│   │   │   │   │       │   └── [vite.md](./src/notes/engineering/software/frontend/web/build-tools/vite.md)
│   │   │   │   │       ├── charts/
│   │   │   │   │       │   ├── [chart.js.md](./src/notes/engineering/software/frontend/web/charts/chart.js.md)
│   │   │   │   │       │   ├── [chartist.md](./src/notes/engineering/software/frontend/web/charts/chartist.md)
│   │   │   │   │       │   ├── [d3.js.md](./src/notes/engineering/software/frontend/web/charts/d3.js.md)
│   │   │   │   │       │   ├── [google-charts.md](./src/notes/engineering/software/frontend/web/charts/google-charts.md)
│   │   │   │   │       │   ├── [highcharts.md](./src/notes/engineering/software/frontend/web/charts/highcharts.md)
│   │   │   │   │       │   ├── [plotly.md](./src/notes/engineering/software/frontend/web/charts/plotly.md)
│   │   │   │   │       │   ├── [recharts.md](./src/notes/engineering/software/frontend/web/charts/recharts.md)
│   │   │   │   │       │   └── [tanstack-charts.md](./src/notes/engineering/software/frontend/web/charts/tanstack-charts.md)
│   │   │   │   │       ├── frameworks/
│   │   │   │   │       │   ├── csr/
│   │   │   │   │       │   │   ├── jsx/
│   │   │   │   │       │   │   │   ├── [preact.md](./src/notes/engineering/software/frontend/web/frameworks/csr/jsx/preact.md)
│   │   │   │   │       │   │   │   ├── [qwik.md](./src/notes/engineering/software/frontend/web/frameworks/csr/jsx/qwik.md)
│   │   │   │   │       │   │   │   ├── [react.md](./src/notes/engineering/software/frontend/web/frameworks/csr/jsx/react.md)
│   │   │   │   │       │   │   │   └── [solid.md](./src/notes/engineering/software/frontend/web/frameworks/csr/jsx/solid.md)
│   │   │   │   │       │   │   ├── [angular.js.md](./src/notes/engineering/software/frontend/web/frameworks/csr/angular.js.md)
│   │   │   │   │       │   │   ├── [angular.md](./src/notes/engineering/software/frontend/web/frameworks/csr/angular.md)
│   │   │   │   │       │   │   ├── [backbone.md](./src/notes/engineering/software/frontend/web/frameworks/csr/backbone.md)
│   │   │   │   │       │   │   ├── [ember.md](./src/notes/engineering/software/frontend/web/frameworks/csr/ember.md)
│   │   │   │   │       │   │   ├── [svelte.md](./src/notes/engineering/software/frontend/web/frameworks/csr/svelte.md)
│   │   │   │   │       │   │   └── [vue.md](./src/notes/engineering/software/frontend/web/frameworks/csr/vue.md)
│   │   │   │   │       │   ├── ssg/
│   │   │   │   │       │   │   ├── [astro.md](./src/notes/engineering/software/frontend/web/frameworks/ssg/astro.md)
│   │   │   │   │       │   │   ├── [gatsby.md](./src/notes/engineering/software/frontend/web/frameworks/ssg/gatsby.md)
│   │   │   │   │       │   │   └── [vuepress.md](./src/notes/engineering/software/frontend/web/frameworks/ssg/vuepress.md)
│   │   │   │   │       │   └── ssr/
│   │   │   │   │       │       ├── [angular-ssr.md](./src/notes/engineering/software/frontend/web/frameworks/ssr/angular-ssr.md)
│   │   │   │   │       │       ├── [htmx.md](./src/notes/engineering/software/frontend/web/frameworks/ssr/htmx.md)
│   │   │   │   │       │       ├── [next.md](./src/notes/engineering/software/frontend/web/frameworks/ssr/next.md)
│   │   │   │   │       │       ├── [nuxt.md](./src/notes/engineering/software/frontend/web/frameworks/ssr/nuxt.md)
│   │   │   │   │       │       ├── [remix.md](./src/notes/engineering/software/frontend/web/frameworks/ssr/remix.md)
│   │   │   │   │       │       ├── [solid-start.md](./src/notes/engineering/software/frontend/web/frameworks/ssr/solid-start.md)
│   │   │   │   │       │       └── [svelte-kit.md](./src/notes/engineering/software/frontend/web/frameworks/ssr/svelte-kit.md)
│   │   │   │   │       ├── query/
│   │   │   │   │       │   ├── [apollo-client.md](./src/notes/engineering/software/frontend/web/query/apollo-client.md)
│   │   │   │   │       │   ├── [axios.md](./src/notes/engineering/software/frontend/web/query/axios.md)
│   │   │   │   │       │   ├── [swr.md](./src/notes/engineering/software/frontend/web/query/swr.md)
│   │   │   │   │       │   └── [tanstack-query.md](./src/notes/engineering/software/frontend/web/query/tanstack-query.md)
│   │   │   │   │       ├── state-management/
│   │   │   │   │       │   ├── [jotai.md](./src/notes/engineering/software/frontend/web/state-management/jotai.md)
│   │   │   │   │       │   ├── [nano-stores.md](./src/notes/engineering/software/frontend/web/state-management/nano-stores.md)
│   │   │   │   │       │   ├── [redux.md](./src/notes/engineering/software/frontend/web/state-management/redux.md)
│   │   │   │   │       │   ├── [xstate.md](./src/notes/engineering/software/frontend/web/state-management/xstate.md)
│   │   │   │   │       │   └── [zustand.md](./src/notes/engineering/software/frontend/web/state-management/zustand.md)
│   │   │   │   │       ├── styling/
│   │   │   │   │       │   ├── css-in-js/
│   │   │   │   │       │   │   ├── [emotion.md](./src/notes/engineering/software/frontend/web/styling/css-in-js/emotion.md)
│   │   │   │   │       │   │   ├── [styled-components.md](./src/notes/engineering/software/frontend/web/styling/css-in-js/styled-components.md)
│   │   │   │   │       │   │   └── [stylex.md](./src/notes/engineering/software/frontend/web/styling/css-in-js/stylex.md)
│   │   │   │   │       │   ├── css-preprocessor/
│   │   │   │   │       │   │   ├── [less.md](./src/notes/engineering/software/frontend/web/styling/css-preprocessor/less.md)
│   │   │   │   │       │   │   └── [sass.md](./src/notes/engineering/software/frontend/web/styling/css-preprocessor/sass.md)
│   │   │   │   │       │   ├── css-tooling/
│   │   │   │   │       │   │   ├── [postcss.md](./src/notes/engineering/software/frontend/web/styling/css-tooling/postcss.md)
│   │   │   │   │       │   │   └── [stylelint.md](./src/notes/engineering/software/frontend/web/styling/css-tooling/stylelint.md)
│   │   │   │   │       │   ├── css-utilities/
│   │   │   │   │       │   │   ├── [tailwindcss.md](./src/notes/engineering/software/frontend/web/styling/css-utilities/tailwindcss.md)
│   │   │   │   │       │   │   └── [unocss.md](./src/notes/engineering/software/frontend/web/styling/css-utilities/unocss.md)
│   │   │   │   │       │   └── ui-components/
│   │   │   │   │       │       ├── css/
│   │   │   │   │       │       │   ├── [bootstrap.md](./src/notes/engineering/software/frontend/web/styling/ui-components/css/bootstrap.md)
│   │   │   │   │       │       │   ├── [bulma.md](./src/notes/engineering/software/frontend/web/styling/ui-components/css/bulma.md)
│   │   │   │   │       │       │   ├── [daisyui.md](./src/notes/engineering/software/frontend/web/styling/ui-components/css/daisyui.md)
│   │   │   │   │       │       │   ├── [materializecss.md](./src/notes/engineering/software/frontend/web/styling/ui-components/css/materializecss.md)
│   │   │   │   │       │       │   ├── [tailwindcss-plus.md](./src/notes/engineering/software/frontend/web/styling/ui-components/css/tailwindcss-plus.md)
│   │   │   │   │       │       │   └── [uikit.md](./src/notes/engineering/software/frontend/web/styling/ui-components/css/uikit.md)
│   │   │   │   │       │       └── react/
│   │   │   │   │       │           ├── [ant-design.md](./src/notes/engineering/software/frontend/web/styling/ui-components/react/ant-design.md)
│   │   │   │   │       │           ├── [charka-ui.md](./src/notes/engineering/software/frontend/web/styling/ui-components/react/charka-ui.md)
│   │   │   │   │       │           ├── [hero-ui.md](./src/notes/engineering/software/frontend/web/styling/ui-components/react/hero-ui.md)
│   │   │   │   │       │           ├── [mui.md](./src/notes/engineering/software/frontend/web/styling/ui-components/react/mui.md)
│   │   │   │   │       │           ├── [shadcn-ui.md](./src/notes/engineering/software/frontend/web/styling/ui-components/react/shadcn-ui.md)
│   │   │   │   │       │           └── [theme-ui.md](./src/notes/engineering/software/frontend/web/styling/ui-components/react/theme-ui.md)
│   │   │   │   │       └── testing/
│   │   │   │   │           ├── e2e/
│   │   │   │   │           │   ├── [cypress.md](./src/notes/engineering/software/frontend/web/testing/e2e/cypress.md)
│   │   │   │   │           │   ├── [karma.md](./src/notes/engineering/software/frontend/web/testing/e2e/karma.md)
│   │   │   │   │           │   ├── [playwright.md](./src/notes/engineering/software/frontend/web/testing/e2e/playwright.md)
│   │   │   │   │           │   ├── [puppeteer.md](./src/notes/engineering/software/frontend/web/testing/e2e/puppeteer.md)
│   │   │   │   │           │   └── [selenium.md](./src/notes/engineering/software/frontend/web/testing/e2e/selenium.md)
│   │   │   │   │           └── unit/
│   │   │   │   │               ├── [jasmine.js.md](./src/notes/engineering/software/frontend/web/testing/unit/jasmine.js.md)
│   │   │   │   │               ├── [jest.js.md](./src/notes/engineering/software/frontend/web/testing/unit/jest.js.md)
│   │   │   │   │               ├── [mocha.js.md](./src/notes/engineering/software/frontend/web/testing/unit/mocha.js.md)
│   │   │   │   │               ├── [testing-library.md](./src/notes/engineering/software/frontend/web/testing/unit/testing-library.md)
│   │   │   │   │               └── [vitest.md](./src/notes/engineering/software/frontend/web/testing/unit/vitest.md)
│   │   │   │   └── services/
│   │   │   │       ├── auth/
│   │   │   │       │   ├── [auth0.md](./src/notes/engineering/software/services/auth/auth0.md)
│   │   │   │       │   ├── [clerk.md](./src/notes/engineering/software/services/auth/clerk.md)
│   │   │   │       │   ├── [keycloak.md](./src/notes/engineering/software/services/auth/keycloak.md)
│   │   │   │       │   ├── [okta.md](./src/notes/engineering/software/services/auth/okta.md)
│   │   │   │       │   ├── [one-login.md](./src/notes/engineering/software/services/auth/one-login.md)
│   │   │   │       │   ├── [osso.md](./src/notes/engineering/software/services/auth/osso.md)
│   │   │   │       │   └── [zitadel.md](./src/notes/engineering/software/services/auth/zitadel.md)
│   │   │   │       ├── email/
│   │   │   │       │   ├── [mail-gun.md](./src/notes/engineering/software/services/email/mail-gun.md)
│   │   │   │       │   ├── [mailchimp.md](./src/notes/engineering/software/services/email/mailchimp.md)
│   │   │   │       │   ├── [postmark.md](./src/notes/engineering/software/services/email/postmark.md)
│   │   │   │       │   ├── [resend.md](./src/notes/engineering/software/services/email/resend.md)
│   │   │   │       │   └── [send-grid.md](./src/notes/engineering/software/services/email/send-grid.md)
│   │   │   │       └── payment/
│   │   │   │           ├── [braintree.md](./src/notes/engineering/software/services/payment/braintree.md)
│   │   │   │           ├── [dodopayments.md](./src/notes/engineering/software/services/payment/dodopayments.md)
│   │   │   │           ├── [klarna.md](./src/notes/engineering/software/services/payment/klarna.md)
│   │   │   │           ├── [lemonsqueezy.md](./src/notes/engineering/software/services/payment/lemonsqueezy.md)
│   │   │   │           ├── [paddle.md](./src/notes/engineering/software/services/payment/paddle.md)
│   │   │   │           ├── [paypal.md](./src/notes/engineering/software/services/payment/paypal.md)
│   │   │   │           ├── [polar.md](./src/notes/engineering/software/services/payment/polar.md)
│   │   │   │           ├── [revenuecat.md](./src/notes/engineering/software/services/payment/revenuecat.md)
│   │   │   │           ├── [square.md](./src/notes/engineering/software/services/payment/square.md)
│   │   │   │           └── [stripe.md](./src/notes/engineering/software/services/payment/stripe.md)
│   │   │   ├── [agents.md](./src/notes/engineering/agents.md)
│   │   │   ├── [ai.md](./src/notes/engineering/ai.md)
│   │   │   ├── [algorithms.md](./src/notes/engineering/algorithms.md)
│   │   │   ├── [api.md](./src/notes/engineering/api.md)
│   │   │   ├── [back-end.md](./src/notes/engineering/back-end.md)
│   │   │   ├── [blockchain.md](./src/notes/engineering/blockchain.md)
│   │   │   ├── [browsers.md](./src/notes/engineering/browsers.md)
│   │   │   ├── [c.md](./src/notes/engineering/c.md)
│   │   │   ├── [cli.md](./src/notes/engineering/cli.md)
│   │   │   ├── [data-structures-and-algorithms.md](./src/notes/engineering/data-structures-and-algorithms.md)
│   │   │   ├── [data-structures.md](./src/notes/engineering/data-structures.md)
│   │   │   ├── [databases.md](./src/notes/engineering/databases.md)
│   │   │   ├── [design.md](./src/notes/engineering/design.md)
│   │   │   ├── [foss.md](./src/notes/engineering/foss.md)
│   │   │   ├── [front-end.md](./src/notes/engineering/front-end.md)
│   │   │   ├── [game-engines.md](./src/notes/engineering/game-engines.md)
│   │   │   ├── [go.md](./src/notes/engineering/go.md)
│   │   │   ├── [hosting.md](./src/notes/engineering/hosting.md)
│   │   │   ├── [ide.md](./src/notes/engineering/ide.md)
│   │   │   ├── [javascript.md](./src/notes/engineering/javascript.md)
│   │   │   ├── [languages.md](./src/notes/engineering/languages.md)
│   │   │   ├── [llm.md](./src/notes/engineering/llm.md)
│   │   │   ├── [messaging.md](./src/notes/engineering/messaging.md)
│   │   │   ├── [os.md](./src/notes/engineering/os.md)
│   │   │   ├── [rust.md](./src/notes/engineering/rust.md)
│   │   │   ├── [system-design.md](./src/notes/engineering/system-design.md)
│   │   │   ├── [technology.md](./src/notes/engineering/technology.md)
│   │   │   ├── [techstack.md](./src/notes/engineering/techstack.md)
│   │   │   ├── [ui-components.md](./src/notes/engineering/ui-components.md)
│   │   │   └── [workspaces.md](./src/notes/engineering/workspaces.md)
│   │   ├── games/
│   │   │   ├── [board-go.md](./src/notes/games/board-go.md)
│   │   │   ├── [checker.md](./src/notes/games/checker.md)
│   │   │   ├── [chess.md](./src/notes/games/chess.md)
│   │   │   ├── [dota.md](./src/notes/games/dota.md)
│   │   │   ├── [e-sports.md](./src/notes/games/e-sports.md)
│   │   │   ├── [games.md](./src/notes/games/games.md)
│   │   │   ├── [gaming-consoles.md](./src/notes/games/gaming-consoles.md)
│   │   │   ├── [league-of-legends.md](./src/notes/games/league-of-legends.md)
│   │   │   ├── [shogi.md](./src/notes/games/shogi.md)
│   │   │   └── [xiangqi.md](./src/notes/games/xiangqi.md)
│   │   ├── geography/
│   │   │   ├── [cities.md](./src/notes/geography/cities.md)
│   │   │   └── [geography.md](./src/notes/geography/geography.md)
│   │   ├── humanities/
│   │   │   ├── [books.md](./src/notes/humanities/books.md)
│   │   │   ├── [grammy.md](./src/notes/humanities/grammy.md)
│   │   │   ├── [humanity-languages.md](./src/notes/humanities/humanity-languages.md)
│   │   │   ├── [humanity.md](./src/notes/humanities/humanity.md)
│   │   │   ├── [languages-languages.md](./src/notes/humanities/languages-languages.md)
│   │   │   ├── [literature.md](./src/notes/humanities/literature.md)
│   │   │   ├── [news.md](./src/notes/humanities/news.md)
│   │   │   ├── [nobel.md](./src/notes/humanities/nobel.md)
│   │   │   └── [random-research.md](./src/notes/humanities/random-research.md)
│   │   ├── life/
│   │   │   ├── [bored.md](./src/notes/life/bored.md)
│   │   │   ├── [degrees.md](./src/notes/life/degrees.md)
│   │   │   ├── [education.md](./src/notes/life/education.md)
│   │   │   ├── [f&b.md](./src/notes/life/f&b.md)
│   │   │   ├── [maslow-hierarchy.md](./src/notes/life/maslow-hierarchy.md)
│   │   │   ├── [minimalism.md](./src/notes/life/minimalism.md)
│   │   │   ├── [monday-fear.md](./src/notes/life/monday-fear.md)
│   │   │   ├── [negative-thoughts.md](./src/notes/life/negative-thoughts.md)
│   │   │   ├── [nothing.md](./src/notes/life/nothing.md)
│   │   │   ├── [resolutions.md](./src/notes/life/resolutions.md)
│   │   │   ├── [sample.md](./src/notes/life/sample.md)
│   │   │   └── [university.md](./src/notes/life/university.md)
│   │   ├── marketing/
│   │   │   ├── copy-writer/
│   │   │   │   ├── commerce/
│   │   │   │   │   ├── [gumroad.md](./src/notes/marketing/copy-writer/commerce/gumroad.md)
│   │   │   │   │   └── [shopify.md](./src/notes/marketing/copy-writer/commerce/shopify.md)
│   │   │   │   └── sites/
│   │   │   │       ├── [acquire.md](./src/notes/marketing/copy-writer/sites/acquire.md)
│   │   │   │       ├── [hacker-news.md](./src/notes/marketing/copy-writer/sites/hacker-news.md)
│   │   │   │       ├── [indie-hackers.md](./src/notes/marketing/copy-writer/sites/indie-hackers.md)
│   │   │   │       └── [product-hunt.md](./src/notes/marketing/copy-writer/sites/product-hunt.md)
│   │   │   └── ui-ux-designer/
│   │   │       ├── [canva.md](./src/notes/marketing/ui-ux-designer/canva.md)
│   │   │       └── [figma.md](./src/notes/marketing/ui-ux-designer/figma.md)
│   │   ├── media/
│   │   │   ├── [anime.md](./src/notes/media/anime.md)
│   │   │   ├── [arts.md](./src/notes/media/arts.md)
│   │   │   ├── [comics.md](./src/notes/media/comics.md)
│   │   │   ├── [entertainment.md](./src/notes/media/entertainment.md)
│   │   │   ├── [game-of-thrones.md](./src/notes/media/game-of-thrones.md)
│   │   │   ├── [instruments.md](./src/notes/media/instruments.md)
│   │   │   ├── [listening.md](./src/notes/media/listening.md)
│   │   │   ├── [movies.md](./src/notes/media/movies.md)
│   │   │   ├── [music.md](./src/notes/media/music.md)
│   │   │   ├── [musical.md](./src/notes/media/musical.md)
│   │   │   ├── [podcasts.md](./src/notes/media/podcasts.md)
│   │   │   ├── [reading.md](./src/notes/media/reading.md)
│   │   │   ├── [series.md](./src/notes/media/series.md)
│   │   │   └── [watching.md](./src/notes/media/watching.md)
│   │   ├── science/
│   │   │   ├── [biology.md](./src/notes/science/biology.md)
│   │   │   ├── [brain.md](./src/notes/science/brain.md)
│   │   │   ├── [chemistry.md](./src/notes/science/chemistry.md)
│   │   │   ├── [economics.md](./src/notes/science/economics.md)
│   │   │   ├── [fields.md](./src/notes/science/fields.md)
│   │   │   ├── [mathematics.md](./src/notes/science/mathematics.md)
│   │   │   ├── [neuroscience.md](./src/notes/science/neuroscience.md)
│   │   │   ├── [physics.md](./src/notes/science/physics.md)
│   │   │   ├── [psychology.md](./src/notes/science/psychology.md)
│   │   │   ├── [sciences.md](./src/notes/science/sciences.md)
│   │   │   └── [stem.md](./src/notes/science/stem.md)
│   │   ├── sports/
│   │   │   ├── [american-football.md](./src/notes/sports/american-football.md)
│   │   │   ├── [badminton.md](./src/notes/sports/badminton.md)
│   │   │   ├── [baseball.md](./src/notes/sports/baseball.md)
│   │   │   ├── [basketball.md](./src/notes/sports/basketball.md)
│   │   │   ├── [bicycling.md](./src/notes/sports/bicycling.md)
│   │   │   ├── [cricket.md](./src/notes/sports/cricket.md)
│   │   │   ├── [f1.md](./src/notes/sports/f1.md)
│   │   │   ├── [football.md](./src/notes/sports/football.md)
│   │   │   ├── [futsal.md](./src/notes/sports/futsal.md)
│   │   │   ├── [marathon.md](./src/notes/sports/marathon.md)
│   │   │   ├── [netball.md](./src/notes/sports/netball.md)
│   │   │   ├── [pickleball.md](./src/notes/sports/pickleball.md)
│   │   │   ├── [rugby.md](./src/notes/sports/rugby.md)
│   │   │   ├── [sports.md](./src/notes/sports/sports.md)
│   │   │   ├── [squash.md](./src/notes/sports/squash.md)
│   │   │   ├── [swimming.md](./src/notes/sports/swimming.md)
│   │   │   ├── [table-tennis.md](./src/notes/sports/table-tennis.md)
│   │   │   └── [tennis.md](./src/notes/sports/tennis.md)
│   │   ├── transport/
│   │   │   ├── [cars.md](./src/notes/transport/cars.md)
│   │   │   ├── [motorcycle.md](./src/notes/transport/motorcycle.md)
│   │   │   ├── [motorcycles.md](./src/notes/transport/motorcycles.md)
│   │   │   └── [vehicles.md](./src/notes/transport/vehicles.md)
│   │   ├── [engineering.md](./src/notes/engineering.md)
│   │   ├── [intro.md](./src/notes/intro.md)
│   │   ├── [me.md](./src/notes/me.md)
│   │   └── [resume.md](./src/notes/resume.md)
│   ├── scripts/
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

298 directories, 923 files
