# TREE

```text
├── docs/
│   ├── other/
│   │   └── [DATABASES.md](./docs/other/DATABASES.md)
│   ├── [ARCHITECTURE.md](./docs/ARCHITECTURE.md)
│   ├── [CONTRIBUTING.md](./docs/CONTRIBUTING.md)
│   ├── [DOWNLOADS.md](./docs/DOWNLOADS.md)
│   ├── [PACKAGING.md](./docs/PACKAGING.md)
│   └── [ROADMAP.md](./docs/ROADMAP.md)
├── e2e/
│   ├── [about.spec.ts](./e2e/about.spec.ts)
│   ├── [connection-management.spec.ts](./e2e/connection-management.spec.ts)
│   ├── [db-page.spec.ts](./e2e/db-page.spec.ts)
│   ├── [home.spec.ts](./e2e/home.spec.ts)
│   ├── [navigation.spec.ts](./e2e/navigation.spec.ts)
│   ├── [profile.spec.ts](./e2e/profile.spec.ts)
│   ├── [search.spec.ts](./e2e/search.spec.ts)
│   ├── [settings.spec.ts](./e2e/settings.spec.ts)
│   └── [version.spec.ts](./e2e/version.spec.ts)
├── public/
│   ├── examples/
│   │   └── sqlite/
│   │       ├── [blog-cms.sqlite](./public/examples/sqlite/blog-cms.sqlite)
│   │       ├── [chinook.sqlite](./public/examples/sqlite/chinook.sqlite)
│   │       ├── [classicmodels.sqlite](./public/examples/sqlite/classicmodels.sqlite)
│   │       ├── [e-commerce.sqlite](./public/examples/sqlite/e-commerce.sqlite)
│   │       ├── [hr.sqlite](./public/examples/sqlite/hr.sqlite)
│   │       ├── [index.json](./public/examples/sqlite/index.json)
│   │       ├── [music-streaming.sqlite](./public/examples/sqlite/music-streaming.sqlite)
│   │       ├── [northwind.sqlite](./public/examples/sqlite/northwind.sqlite)
│   │       ├── [project-management.sqlite](./public/examples/sqlite/project-management.sqlite)
│   │       ├── [sakila.sqlite](./public/examples/sqlite/sakila.sqlite)
│   │       └── [social-media.sqlite](./public/examples/sqlite/social-media.sqlite)
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
│   ├── wasm/
│   │   └── [sql-wasm.wasm](./public/wasm/sql-wasm.wasm)
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
│   │   │   ├── [default.test.tsx](./src/app/__tests__/default.test.tsx)
│   │   │   ├── [error.test.tsx](./src/app/__tests__/error.test.tsx)
│   │   │   ├── [forbidden.test.tsx](./src/app/__tests__/forbidden.test.tsx)
│   │   │   ├── [global-error.test.tsx](./src/app/__tests__/global-error.test.tsx)
│   │   │   ├── [home-page.test.tsx](./src/app/__tests__/home-page.test.tsx)
│   │   │   ├── [layout.test.tsx](./src/app/__tests__/layout.test.tsx)
│   │   │   ├── [loading.test.tsx](./src/app/__tests__/loading.test.tsx)
│   │   │   ├── [not-found.test.tsx](./src/app/__tests__/not-found.test.tsx)
│   │   │   ├── [page.test.tsx](./src/app/__tests__/page.test.tsx)
│   │   │   ├── [robots.test.ts](./src/app/__tests__/robots.test.ts)
│   │   │   ├── [template.test.tsx](./src/app/__tests__/template.test.tsx)
│   │   │   └── [unauthorized.test.tsx](./src/app/__tests__/unauthorized.test.tsx)
│   │   ├── db/
│   │   │   ├── __tests__/
│   │   │   │   └── [db-page.test.tsx](./src/app/db/__tests__/db-page.test.tsx)
│   │   │   └── [page.tsx](./src/app/db/page.tsx)
│   │   ├── posts/
│   │   │   ├── [slug]/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [page.test.tsx](./src/app/posts/[slug]/__tests__/page.test.tsx)
│   │   │   │   └── [page.tsx](./src/app/posts/[slug]/page.tsx)
│   │   │   ├── __tests__/
│   │   │   │   └── [page.test.tsx](./src/app/posts/__tests__/page.test.tsx)
│   │   │   └── [page.tsx](./src/app/posts/page.tsx)
│   │   ├── redis/
│   │   │   ├── __tests__/
│   │   │   └── editor/
│   │   │       └── __tests__/
│   │   ├── settings/
│   │   │   ├── __tests__/
│   │   │   │   └── [page.test.tsx](./src/app/settings/__tests__/page.test.tsx)
│   │   │   └── [page.tsx](./src/app/settings/page.tsx)
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
│   │   ├── __tests__/
│   │   │   └── [SWProvider.test.tsx](./src/components/__tests__/SWProvider.test.tsx)
│   │   ├── atoms/
│   │   │   ├── __tests__/
│   │   │   │   ├── [CellValue.test.tsx](./src/components/atoms/__tests__/CellValue.test.tsx)
│   │   │   │   └── [SortIcon.test.tsx](./src/components/atoms/__tests__/SortIcon.test.tsx)
│   │   │   ├── [CellValue.tsx](./src/components/atoms/CellValue.tsx)
│   │   │   └── [SortIcon.tsx](./src/components/atoms/SortIcon.tsx)
│   │   ├── molecules/
│   │   │   ├── __tests__/
│   │   │   │   ├── [DataView.test.tsx](./src/components/molecules/__tests__/DataView.test.tsx)
│   │   │   │   ├── [DbModals.test.tsx](./src/components/molecules/__tests__/DbModals.test.tsx)
│   │   │   │   ├── [DbSidePanel.test.tsx](./src/components/molecules/__tests__/DbSidePanel.test.tsx)
│   │   │   │   ├── [EmptyState.test.tsx](./src/components/molecules/__tests__/EmptyState.test.tsx)
│   │   │   │   ├── [ErDiagramView.test.tsx](./src/components/molecules/__tests__/ErDiagramView.test.tsx)
│   │   │   │   ├── [ExportModal.test.tsx](./src/components/molecules/__tests__/ExportModal.test.tsx)
│   │   │   │   ├── [ImportModal.test.tsx](./src/components/molecules/__tests__/ImportModal.test.tsx)
│   │   │   │   ├── [SheetsSidebar.test.tsx](./src/components/molecules/__tests__/SheetsSidebar.test.tsx)
│   │   │   │   ├── [SheetsToolbar.test.tsx](./src/components/molecules/__tests__/SheetsToolbar.test.tsx)
│   │   │   │   ├── [SqlEditor.test.tsx](./src/components/molecules/__tests__/SqlEditor.test.tsx)
│   │   │   │   └── [StatsView.test.tsx](./src/components/molecules/__tests__/StatsView.test.tsx)
│   │   │   ├── redis/
│   │   │   │   └── __tests__/
│   │   │   ├── [ConnectionModal.tsx](./src/components/molecules/ConnectionModal.tsx)
│   │   │   ├── [DataView.tsx](./src/components/molecules/DataView.tsx)
│   │   │   ├── [DbBookmarkDialog.tsx](./src/components/molecules/DbBookmarkDialog.tsx)
│   │   │   ├── [DbDropOverlay.tsx](./src/components/molecules/DbDropOverlay.tsx)
│   │   │   ├── [DbEditorPanel.tsx](./src/components/molecules/DbEditorPanel.tsx)
│   │   │   ├── [DbFooter.tsx](./src/components/molecules/DbFooter.tsx)
│   │   │   ├── [DbHeader.tsx](./src/components/molecules/DbHeader.tsx)
│   │   │   ├── [DbModals.tsx](./src/components/molecules/DbModals.tsx)
│   │   │   ├── [DbSchemaSidebar.tsx](./src/components/molecules/DbSchemaSidebar.tsx)
│   │   │   ├── [DbSidePanel.tsx](./src/components/molecules/DbSidePanel.tsx)
│   │   │   ├── [EmptyState.tsx](./src/components/molecules/EmptyState.tsx)
│   │   │   ├── [ErDiagramView.tsx](./src/components/molecules/ErDiagramView.tsx)
│   │   │   ├── [ExportModal.tsx](./src/components/molecules/ExportModal.tsx)
│   │   │   ├── [ImportModal.tsx](./src/components/molecules/ImportModal.tsx)
│   │   │   ├── [SheetsSidebar.tsx](./src/components/molecules/SheetsSidebar.tsx)
│   │   │   ├── [SheetsToolbar.tsx](./src/components/molecules/SheetsToolbar.tsx)
│   │   │   ├── [SqlEditor.tsx](./src/components/molecules/SqlEditor.tsx)
│   │   │   └── [StatsView.tsx](./src/components/molecules/StatsView.tsx)
│   │   ├── organisms/
│   │   │   ├── __tests__/
│   │   │   │   ├── [Markdown.test.tsx](./src/components/organisms/__tests__/Markdown.test.tsx)
│   │   │   │   └── [TableDesignerModal.test.tsx](./src/components/organisms/__tests__/TableDesignerModal.test.tsx)
│   │   │   ├── [Markdown.tsx](./src/components/organisms/Markdown.tsx)
│   │   │   ├── [TableDesignerModal.tsx](./src/components/organisms/TableDesignerModal.tsx)
│   │   │   ├── [ToastContainer.tsx](./src/components/organisms/ToastContainer.tsx)
│   │   │   └── [VisualizationModal.tsx](./src/components/organisms/VisualizationModal.tsx)
│   │   ├── templates/
│   │   │   ├── __tests__/
│   │   │   │   ├── [AboutTemplate.test.tsx](./src/components/templates/__tests__/AboutTemplate.test.tsx)
│   │   │   │   ├── [DownloadsTemplate.test.tsx](./src/components/templates/__tests__/DownloadsTemplate.test.tsx)
│   │   │   │   ├── [ErrorTemplate.test.tsx](./src/components/templates/__tests__/ErrorTemplate.test.tsx)
│   │   │   │   ├── [PostView.test.tsx](./src/components/templates/__tests__/PostView.test.tsx)
│   │   │   │   └── [VersionTemplate.test.tsx](./src/components/templates/__tests__/VersionTemplate.test.tsx)
│   │   │   ├── [AboutTemplate.tsx](./src/components/templates/AboutTemplate.tsx)
│   │   │   ├── [DownloadsTemplate.tsx](./src/components/templates/DownloadsTemplate.tsx)
│   │   │   ├── [ErrorTemplate.tsx](./src/components/templates/ErrorTemplate.tsx)
│   │   │   ├── [PostView.tsx](./src/components/templates/PostView.tsx)
│   │   │   └── [VersionTemplate.tsx](./src/components/templates/VersionTemplate.tsx)
│   │   └── [SWProvider.tsx](./src/components/SWProvider.tsx)
│   ├── data/
│   │   ├── __tests__/
│   │   │   ├── [models.test.ts](./src/data/__tests__/models.test.ts)
│   │   │   └── [seed.test.ts](./src/data/__tests__/seed.test.ts)
│   │   ├── [models.ts](./src/data/models.ts)
│   │   └── [seed.ts](./src/data/seed.ts)
│   ├── hooks/
│   │   ├── __tests__/
│   │   │   ├── [useDbPageHooks.test.ts](./src/hooks/__tests__/useDbPageHooks.test.ts)
│   │   │   ├── [useSWRegister.test.ts](./src/hooks/__tests__/useSWRegister.test.ts)
│   │   │   └── [useSqlDatabase.test.ts](./src/hooks/__tests__/useSqlDatabase.test.ts)
│   │   ├── [sqlDatabaseHelpers.ts](./src/hooks/sqlDatabaseHelpers.ts)
│   │   ├── [useDbPage.ts](./src/hooks/useDbPage.ts)
│   │   ├── [useDbPageActions.ts](./src/hooks/useDbPageActions.ts)
│   │   ├── [useDbPageLayout.ts](./src/hooks/useDbPageLayout.ts)
│   │   ├── [useDbPageQuery.ts](./src/hooks/useDbPageQuery.ts)
│   │   ├── [useDbPageSelection.ts](./src/hooks/useDbPageSelection.ts)
│   │   ├── [useDbPageState.ts](./src/hooks/useDbPageState.ts)
│   │   ├── [useSWRegister.ts](./src/hooks/useSWRegister.ts)
│   │   ├── [useSqlDatabase.ts](./src/hooks/useSqlDatabase.ts)
│   │   ├── [useSqlDatabaseIo.ts](./src/hooks/useSqlDatabaseIo.ts)
│   │   ├── [useSqlDatabaseMutations.ts](./src/hooks/useSqlDatabaseMutations.ts)
│   │   ├── [useSqlDatabaseQuery.ts](./src/hooks/useSqlDatabaseQuery.ts)
│   │   ├── [useSqlDatabaseSchema.ts](./src/hooks/useSqlDatabaseSchema.ts)
│   │   └── [useSqlDatabaseState.ts](./src/hooks/useSqlDatabaseState.ts)
│   ├── lib/
│   │   ├── __tests__/
│   │   │   └── [db.test.ts](./src/lib/__tests__/db.test.ts)
│   │   ├── redis/
│   │   │   └── __tests__/
│   │   ├── stubs/
│   │   │   └── [node-builtins.ts](./src/lib/stubs/node-builtins.ts)
│   │   ├── [db.ts](./src/lib/db.ts)
│   │   └── [examples.ts](./src/lib/examples.ts)
│   ├── posts/
│   │   ├── __tests__/
│   │   │   └── [posts.test.ts](./src/posts/__tests__/posts.test.ts)
│   │   ├── [blog-cms.md](./src/posts/blog-cms.md)
│   │   ├── [chinook.md](./src/posts/chinook.md)
│   │   ├── [classicmodels.md](./src/posts/classicmodels.md)
│   │   ├── [content.ts](./src/posts/content.ts)
│   │   ├── [e-commerce.md](./src/posts/e-commerce.md)
│   │   ├── [hr.md](./src/posts/hr.md)
│   │   ├── [index.ts](./src/posts/index.ts)
│   │   ├── [music-streaming.md](./src/posts/music-streaming.md)
│   │   ├── [northwind.md](./src/posts/northwind.md)
│   │   ├── [project-management.md](./src/posts/project-management.md)
│   │   ├── [sakila.md](./src/posts/sakila.md)
│   │   └── [social-media.md](./src/posts/social-media.md)
│   ├── providers/
│   │   ├── __tests__/
│   │   │   ├── [DataProvider.test.tsx](./src/providers/__tests__/DataProvider.test.tsx)
│   │   │   ├── [Providers.test.tsx](./src/providers/__tests__/Providers.test.tsx)
│   │   │   └── [ToastProvider.test.tsx](./src/providers/__tests__/ToastProvider.test.tsx)
│   │   ├── [DataProvider.tsx](./src/providers/DataProvider.tsx)
│   │   ├── [Providers.tsx](./src/providers/Providers.tsx)
│   │   └── [ToastProvider.tsx](./src/providers/ToastProvider.tsx)
│   ├── styles/
│   │   ├── [base.css](./src/styles/base.css)
│   │   ├── [globals.css](./src/styles/globals.css)
│   │   └── [themes.css](./src/styles/themes.css)
│   ├── types/
│   │   ├── [index.ts](./src/types/index.ts)
│   │   └── [sqlite.ts](./src/types/sqlite.ts)
│   └── utils/
│       ├── __tests__/
│       │   ├── [autocomplete.test.ts](./src/utils/__tests__/autocomplete.test.ts)
│       │   ├── [csv.test.ts](./src/utils/__tests__/csv.test.ts)
│       │   ├── [er.test.ts](./src/utils/__tests__/er.test.ts)
│       │   ├── [format.test.ts](./src/utils/__tests__/format.test.ts)
│       │   ├── [import.test.ts](./src/utils/__tests__/import.test.ts)
│       │   ├── [markdown.test.ts](./src/utils/__tests__/markdown.test.ts)
│       │   ├── [mermaid.test.ts](./src/utils/__tests__/mermaid.test.ts)
│       │   ├── [opfs.test.ts](./src/utils/__tests__/opfs.test.ts)
│       │   ├── [schema.test.ts](./src/utils/__tests__/schema.test.ts)
│       │   ├── [seedData.test.ts](./src/utils/__tests__/seedData.test.ts)
│       │   ├── [sqlDump.test.ts](./src/utils/__tests__/sqlDump.test.ts)
│       │   ├── [sqlExport.test.ts](./src/utils/__tests__/sqlExport.test.ts)
│       │   ├── [sqlFormat.test.ts](./src/utils/__tests__/sqlFormat.test.ts)
│       │   ├── [sqlHighlight.test.ts](./src/utils/__tests__/sqlHighlight.test.ts)
│       │   ├── [stats.test.ts](./src/utils/__tests__/stats.test.ts)
│       │   └── [tableData.test.ts](./src/utils/__tests__/tableData.test.ts)
│       ├── [autocomplete.ts](./src/utils/autocomplete.ts)
│       ├── [csv.ts](./src/utils/csv.ts)
│       ├── [er.ts](./src/utils/er.ts)
│       ├── [format.ts](./src/utils/format.ts)
│       ├── [import.ts](./src/utils/import.ts)
│       ├── [markdown.ts](./src/utils/markdown.ts)
│       ├── [mermaid.ts](./src/utils/mermaid.ts)
│       ├── [opfs.ts](./src/utils/opfs.ts)
│       ├── [schema.ts](./src/utils/schema.ts)
│       ├── [seedData.ts](./src/utils/seedData.ts)
│       ├── [sqlDump.ts](./src/utils/sqlDump.ts)
│       ├── [sqlExport.ts](./src/utils/sqlExport.ts)
│       ├── [sqlFormat.ts](./src/utils/sqlFormat.ts)
│       ├── [sqlHighlight.ts](./src/utils/sqlHighlight.ts)
│       ├── [sqlStatements.ts](./src/utils/sqlStatements.ts)
│       ├── [stats.ts](./src/utils/stats.ts)
│       └── [tableData.ts](./src/utils/tableData.ts)
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

74 directories, 266 files
