# TREE

```text
├── e2e/
│   ├── [about.spec.ts](./e2e/about.spec.ts)
│   ├── [bracket.spec.ts](./e2e/bracket.spec.ts)
│   ├── [create.spec.ts](./e2e/create.spec.ts)
│   ├── [dashboard.spec.ts](./e2e/dashboard.spec.ts)
│   ├── [matches.spec.ts](./e2e/matches.spec.ts)
│   ├── [navigation.spec.ts](./e2e/navigation.spec.ts)
│   ├── [participants.spec.ts](./e2e/participants.spec.ts)
│   ├── [profile.spec.ts](./e2e/profile.spec.ts)
│   ├── [settings.spec.ts](./e2e/settings.spec.ts)
│   ├── [standings.spec.ts](./e2e/standings.spec.ts)
│   ├── [tournament-detail.spec.ts](./e2e/tournament-detail.spec.ts)
│   └── [version.spec.ts](./e2e/version.spec.ts)
├── images/
├── public/
│   ├── icons/
│   │   ├── [icon-192x192.png](./public/icons/icon-192x192.png)
│   │   ├── [icon-512x512.png](./public/icons/icon-512x512.png)
│   │   └── [icon.svg](./public/icons/icon.svg)
│   ├── [favicon.ico](./public/favicon.ico)
│   ├── [manifest.json](./public/manifest.json)
│   └── [sw.js](./public/sw.js)
├── src/
│   ├── app/
│   │   ├── (dashboard)/
│   │   │   └── [page.tsx](./src/app/(dashboard)/page.tsx)
│   │   ├── (info)/
│   │   │   ├── about/
│   │   │   │   └── [page.tsx](./src/app/(info)/about/page.tsx)
│   │   │   └── version/
│   │   │       └── [page.tsx](./src/app/(info)/version/page.tsx)
│   │   ├── (tournament)/
│   │   │   ├── bracket/
│   │   │   │   └── [page.tsx](./src/app/(tournament)/bracket/page.tsx)
│   │   │   ├── create/
│   │   │   │   └── [page.tsx](./src/app/(tournament)/create/page.tsx)
│   │   │   ├── match/
│   │   │   │   └── [page.tsx](./src/app/(tournament)/match/page.tsx)
│   │   │   ├── matches/
│   │   │   │   └── [page.tsx](./src/app/(tournament)/matches/page.tsx)
│   │   │   ├── participants/
│   │   │   │   └── [page.tsx](./src/app/(tournament)/participants/page.tsx)
│   │   │   ├── standings/
│   │   │   │   └── [page.tsx](./src/app/(tournament)/standings/page.tsx)
│   │   │   └── tournament/
│   │   │       └── [page.tsx](./src/app/(tournament)/tournament/page.tsx)
│   │   ├── (user)/
│   │   │   ├── profile/
│   │   │   │   └── [page.tsx](./src/app/(user)/profile/page.tsx)
│   │   │   └── settings/
│   │   │       └── [page.tsx](./src/app/(user)/settings/page.tsx)
│   │   ├── [error.tsx](./src/app/error.tsx)
│   │   ├── [layout.tsx](./src/app/layout.tsx)
│   │   ├── [not-found.tsx](./src/app/not-found.tsx)
│   │   └── [providers.tsx](./src/app/providers.tsx)
│   ├── components/
│   │   ├── atoms/
│   │   │   ├── __tests__/
│   │   │   ├── [ContextMenu.tsx](./src/components/atoms/ContextMenu.tsx)
│   │   │   └── [EmptyState.tsx](./src/components/atoms/EmptyState.tsx)
│   │   ├── molecules/
│   │   │   ├── __tests__/
│   │   │   ├── [FormatBadge.tsx](./src/components/molecules/FormatBadge.tsx)
│   │   │   ├── [SearchBar.tsx](./src/components/molecules/SearchBar.tsx)
│   │   │   ├── [StatusBadge.tsx](./src/components/molecules/StatusBadge.tsx)
│   │   │   ├── [StatusFilter.tsx](./src/components/molecules/StatusFilter.tsx)
│   │   │   ├── [TournamentCard.tsx](./src/components/molecules/TournamentCard.tsx)
│   │   │   └── [TournamentList.tsx](./src/components/molecules/TournamentList.tsx)
│   │   ├── organisms/
│   │   │   ├── __tests__/
│   │   │   ├── [AnalyticsPanel.tsx](./src/components/organisms/AnalyticsPanel.tsx)
│   │   │   ├── [BracketView.tsx](./src/components/organisms/BracketView.tsx)
│   │   │   ├── [ExportModal.tsx](./src/components/organisms/ExportModal.tsx)
│   │   │   ├── [Header.tsx](./src/components/organisms/Header.tsx)
│   │   │   ├── [MatchCard.tsx](./src/components/organisms/MatchCard.tsx)
│   │   │   ├── [Navbar.tsx](./src/components/organisms/Navbar.tsx)
│   │   │   ├── [ParticipantList.tsx](./src/components/organisms/ParticipantList.tsx)
│   │   │   ├── [ShareModal.tsx](./src/components/organisms/ShareModal.tsx)
│   │   │   ├── [StandingsTable.tsx](./src/components/organisms/StandingsTable.tsx)
│   │   │   └── [ToastContainer.tsx](./src/components/organisms/ToastContainer.tsx)
│   │   ├── pages/
│   │   │   ├── bracket/
│   │   │   │   ├── [BracketCard.tsx](./src/components/pages/bracket/BracketCard.tsx)
│   │   │   │   └── [BracketPage.tsx](./src/components/pages/bracket/BracketPage.tsx)
│   │   │   ├── create/
│   │   │   │   ├── [CreatePage.tsx](./src/components/pages/create/CreatePage.tsx)
│   │   │   │   └── [FormatSelector.tsx](./src/components/pages/create/FormatSelector.tsx)
│   │   │   ├── match-detail/
│   │   │   │   ├── [MatchDetailPage.tsx](./src/components/pages/match-detail/MatchDetailPage.tsx)
│   │   │   │   ├── [MatchParticipants.tsx](./src/components/pages/match-detail/MatchParticipants.tsx)
│   │   │   │   ├── [ScoreEditor.tsx](./src/components/pages/match-detail/ScoreEditor.tsx)
│   │   │   │   └── [WinnerSelector.tsx](./src/components/pages/match-detail/WinnerSelector.tsx)
│   │   │   ├── matches/
│   │   │   │   ├── [MatchListItem.tsx](./src/components/pages/matches/MatchListItem.tsx)
│   │   │   │   └── [MatchesPage.tsx](./src/components/pages/matches/MatchesPage.tsx)
│   │   │   ├── participants/
│   │   │   │   ├── [AddParticipantForm.tsx](./src/components/pages/participants/AddParticipantForm.tsx)
│   │   │   │   ├── [BatchAddForm.tsx](./src/components/pages/participants/BatchAddForm.tsx)
│   │   │   │   ├── [ParticipantList.tsx](./src/components/pages/participants/ParticipantList.tsx)
│   │   │   │   └── [ParticipantsPage.tsx](./src/components/pages/participants/ParticipantsPage.tsx)
│   │   │   ├── profile/
│   │   │   │   ├── [ActivityList.tsx](./src/components/pages/profile/ActivityList.tsx)
│   │   │   │   ├── [ProfilePage.tsx](./src/components/pages/profile/ProfilePage.tsx)
│   │   │   │   └── [StatsCard.tsx](./src/components/pages/profile/StatsCard.tsx)
│   │   │   ├── settings/
│   │   │   │   ├── [SettingRow.tsx](./src/components/pages/settings/SettingRow.tsx)
│   │   │   │   ├── [SettingSection.tsx](./src/components/pages/settings/SettingSection.tsx)
│   │   │   │   └── [SettingsPage.tsx](./src/components/pages/settings/SettingsPage.tsx)
│   │   │   ├── standings/
│   │   │   │   ├── [StandingsPage.tsx](./src/components/pages/standings/StandingsPage.tsx)
│   │   │   │   └── [StandingsTable.tsx](./src/components/pages/standings/StandingsTable.tsx)
│   │   │   ├── tournament/
│   │   │   │   ├── [BracketView.tsx](./src/components/pages/tournament/BracketView.tsx)
│   │   │   │   ├── [MatchCard.tsx](./src/components/pages/tournament/MatchCard.tsx)
│   │   │   │   ├── [MatchesView.tsx](./src/components/pages/tournament/MatchesView.tsx)
│   │   │   │   ├── [OverviewView.tsx](./src/components/pages/tournament/OverviewView.tsx)
│   │   │   │   ├── [ParticipantsView.tsx](./src/components/pages/tournament/ParticipantsView.tsx)
│   │   │   │   ├── [StandingsView.tsx](./src/components/pages/tournament/StandingsView.tsx)
│   │   │   │   ├── [TournamentDetailPage.tsx](./src/components/pages/tournament/TournamentDetailPage.tsx)
│   │   │   │   └── [constants.ts](./src/components/pages/tournament/constants.ts)
│   │   │   ├── [AboutPage.tsx](./src/components/pages/AboutPage.tsx)
│   │   │   ├── [DashboardPage.tsx](./src/components/pages/DashboardPage.tsx)
│   │   │   └── [VersionPage.tsx](./src/components/pages/VersionPage.tsx)
│   │   └── templates/
│   │       ├── __tests__/
│   │       ├── [AboutTemplate.tsx](./src/components/templates/AboutTemplate.tsx)
│   │       ├── [ErrorTemplate.tsx](./src/components/templates/ErrorTemplate.tsx)
│   │       ├── [SettingsTemplate.tsx](./src/components/templates/SettingsTemplate.tsx)
│   │       └── [VersionTemplate.tsx](./src/components/templates/VersionTemplate.tsx)
│   ├── data/
│   │   ├── [index.ts](./src/data/index.ts)
│   │   └── [models.ts](./src/data/models.ts)
│   ├── hooks/
│   │   └── [useSWRegister.ts](./src/hooks/useSWRegister.ts)
│   ├── lib/
│   │   ├── [analytics.ts](./src/lib/analytics.ts)
│   │   ├── [db.ts](./src/lib/db.ts)
│   │   ├── [export.ts](./src/lib/export.ts)
│   │   ├── [formats.ts](./src/lib/formats.ts)
│   │   ├── [import.ts](./src/lib/import.ts)
│   │   ├── [index.ts](./src/lib/index.ts)
│   │   ├── [notifications.ts](./src/lib/notifications.ts)
│   │   ├── [sample-data.ts](./src/lib/sample-data.ts)
│   │   ├── [scheduling.ts](./src/lib/scheduling.ts)
│   │   ├── [sharing.ts](./src/lib/sharing.ts)
│   │   ├── [sqlite.ts](./src/lib/sqlite.ts)
│   │   ├── [standings.ts](./src/lib/standings.ts)
│   │   └── [utils.ts](./src/lib/utils.ts)
│   ├── providers/
│   │   ├── [DataProvider.tsx](./src/providers/DataProvider.tsx)
│   │   ├── [SWProvider.tsx](./src/providers/SWProvider.tsx)
│   │   └── [ToastProvider.tsx](./src/providers/ToastProvider.tsx)
│   ├── styles/
│   │   └── [globals.css](./src/styles/globals.css)
│   └── types/
│       └── [index.ts](./src/types/index.ts)
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
│   │   ├── [create-icons.sh](./src-tauri/icons/create-icons.sh)
│   │   ├── [icon.icns](./src-tauri/icons/icon.icns)
│   │   ├── [icon.ico](./src-tauri/icons/icon.ico)
│   │   └── [icon.png](./src-tauri/icons/icon.png)
│   ├── src/
│   │   ├── [lib.rs](./src-tauri/src/lib.rs)
│   │   └── [main.rs](./src-tauri/src/main.rs)
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

50 directories, 145 files
