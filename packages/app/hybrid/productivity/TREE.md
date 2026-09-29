# TREE

```text
├── keynotes/
│   ├── __mocks__/
│   │   └── [idb.ts](./keynotes/__mocks__/idb.ts)
│   ├── docs/
│   │   ├── [ARCHITECTURE.md](./keynotes/docs/ARCHITECTURE.md)
│   │   ├── [CONTRIBUTING.md](./keynotes/docs/CONTRIBUTING.md)
│   │   ├── [DOWNLOADS.md](./keynotes/docs/DOWNLOADS.md)
│   │   ├── [PACKAGING.md](./keynotes/docs/PACKAGING.md)
│   │   └── [ROADMAP.md](./keynotes/docs/ROADMAP.md)
│   ├── e2e/
│   │   ├── screenshots/
│   │   │   ├── [about.png](./keynotes/e2e/screenshots/about.png)
│   │   │   ├── [downloads.png](./keynotes/e2e/screenshots/downloads.png)
│   │   │   └── [version.png](./keynotes/e2e/screenshots/version.png)
│   │   ├── [about.spec.ts](./keynotes/e2e/about.spec.ts)
│   │   ├── [downloads.spec.ts](./keynotes/e2e/downloads.spec.ts)
│   │   ├── [home.spec.ts](./keynotes/e2e/home.spec.ts)
│   │   └── [version.spec.ts](./keynotes/e2e/version.spec.ts)
│   ├── public/
│   │   ├── icons/
│   │   │   ├── [icon-128x128.png](./keynotes/public/icons/icon-128x128.png)
│   │   │   ├── [icon-144x144.png](./keynotes/public/icons/icon-144x144.png)
│   │   │   ├── [icon-152x152.png](./keynotes/public/icons/icon-152x152.png)
│   │   │   ├── [icon-16x16.png](./keynotes/public/icons/icon-16x16.png)
│   │   │   ├── [icon-180x180.png](./keynotes/public/icons/icon-180x180.png)
│   │   │   ├── [icon-192x192.png](./keynotes/public/icons/icon-192x192.png)
│   │   │   ├── [icon-256x256.png](./keynotes/public/icons/icon-256x256.png)
│   │   │   ├── [icon-32x32.png](./keynotes/public/icons/icon-32x32.png)
│   │   │   ├── [icon-384x384.png](./keynotes/public/icons/icon-384x384.png)
│   │   │   ├── [icon-48x48.png](./keynotes/public/icons/icon-48x48.png)
│   │   │   ├── [icon-512x512.png](./keynotes/public/icons/icon-512x512.png)
│   │   │   ├── [icon-64x64.png](./keynotes/public/icons/icon-64x64.png)
│   │   │   ├── [icon-72x72.png](./keynotes/public/icons/icon-72x72.png)
│   │   │   ├── [icon-96x96.png](./keynotes/public/icons/icon-96x96.png)
│   │   │   └── [icon.svg](./keynotes/public/icons/icon.svg)
│   │   ├── [apple-touch-icon.png](./keynotes/public/apple-touch-icon.png)
│   │   ├── [favicon.ico](./keynotes/public/favicon.ico)
│   │   ├── [icon.svg](./keynotes/public/icon.svg)
│   │   ├── [manifest.webmanifest](./keynotes/public/manifest.webmanifest)
│   │   ├── [robots.txt](./keynotes/public/robots.txt)
│   │   ├── [sitemap.xml](./keynotes/public/sitemap.xml)
│   │   └── [sw.js](./keynotes/public/sw.js)
│   ├── src/
│   │   ├── app/
│   │   │   ├── (app)/
│   │   │   │   ├── editor/
│   │   │   │   │   └── [id]/
│   │   │   │   │       ├── __tests__/
│   │   │   │   │       │   ├── [EditorInteractions.test.tsx](./keynotes/src/app/(app)/editor/[id]/__tests__/EditorInteractions.test.tsx)
│   │   │   │   │       │   ├── [EditorPage.coverage.test.tsx](./keynotes/src/app/(app)/editor/[id]/__tests__/EditorPage.coverage.test.tsx)
│   │   │   │   │       │   └── [EditorPage.test.tsx](./keynotes/src/app/(app)/editor/[id]/__tests__/EditorPage.test.tsx)
│   │   │   │   │       ├── [EditorPage.tsx](./keynotes/src/app/(app)/editor/[id]/EditorPage.tsx)
│   │   │   │   │       └── [page.tsx](./keynotes/src/app/(app)/editor/[id]/page.tsx)
│   │   │   │   ├── handouts/
│   │   │   │   │   └── [id]/
│   │   │   │   │       ├── __tests__/
│   │   │   │   │       │   └── [HandoutsPage.test.tsx](./keynotes/src/app/(app)/handouts/[id]/__tests__/HandoutsPage.test.tsx)
│   │   │   │   │       ├── [HandoutsPage.tsx](./keynotes/src/app/(app)/handouts/[id]/HandoutsPage.tsx)
│   │   │   │   │       └── [page.tsx](./keynotes/src/app/(app)/handouts/[id]/page.tsx)
│   │   │   │   ├── present/
│   │   │   │   │   ├── [id]/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   └── [PresentPage.test.tsx](./keynotes/src/app/(app)/present/[id]/__tests__/PresentPage.test.tsx)
│   │   │   │   │   │   ├── [PresentPage.tsx](./keynotes/src/app/(app)/present/[id]/PresentPage.tsx)
│   │   │   │   │   │   └── [page.tsx](./keynotes/src/app/(app)/present/[id]/page.tsx)
│   │   │   │   │   └── __tests__/
│   │   │   │   │       └── [PresentPage.test.tsx](./keynotes/src/app/(app)/present/__tests__/PresentPage.test.tsx)
│   │   │   │   ├── presenter/
│   │   │   │   │   └── [id]/
│   │   │   │   │       ├── __tests__/
│   │   │   │   │       │   └── [PresenterView.test.tsx](./keynotes/src/app/(app)/presenter/[id]/__tests__/PresenterView.test.tsx)
│   │   │   │   │       ├── [PresenterView.tsx](./keynotes/src/app/(app)/presenter/[id]/PresenterView.tsx)
│   │   │   │   │       └── [page.tsx](./keynotes/src/app/(app)/presenter/[id]/page.tsx)
│   │   │   │   ├── print/
│   │   │   │   │   └── [id]/
│   │   │   │   │       ├── __tests__/
│   │   │   │   │       │   └── [PrintPage.test.tsx](./keynotes/src/app/(app)/print/[id]/__tests__/PrintPage.test.tsx)
│   │   │   │   │       ├── [PrintPage.tsx](./keynotes/src/app/(app)/print/[id]/PrintPage.tsx)
│   │   │   │   │       └── [page.tsx](./keynotes/src/app/(app)/print/[id]/page.tsx)
│   │   │   │   └── templates/
│   │   │   │       └── [page.tsx](./keynotes/src/app/(app)/templates/page.tsx)
│   │   │   ├── (auth)/
│   │   │   │   ├── forget-password/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./keynotes/src/app/(auth)/forget-password/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./keynotes/src/app/(auth)/forget-password/page.tsx)
│   │   │   │   ├── profile/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./keynotes/src/app/(auth)/profile/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./keynotes/src/app/(auth)/profile/page.tsx)
│   │   │   │   ├── reset-password/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./keynotes/src/app/(auth)/reset-password/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./keynotes/src/app/(auth)/reset-password/page.tsx)
│   │   │   │   ├── sign-in/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./keynotes/src/app/(auth)/sign-in/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./keynotes/src/app/(auth)/sign-in/page.tsx)
│   │   │   │   └── sign-up/
│   │   │   │       ├── __tests__/
│   │   │   │       │   └── [page.test.tsx](./keynotes/src/app/(auth)/sign-up/__tests__/page.test.tsx)
│   │   │   │       └── [page.tsx](./keynotes/src/app/(auth)/sign-up/page.tsx)
│   │   │   ├── (info)/
│   │   │   │   ├── about/
│   │   │   │   │   └── [page.tsx](./keynotes/src/app/(info)/about/page.tsx)
│   │   │   │   ├── downloads/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./keynotes/src/app/(info)/downloads/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./keynotes/src/app/(info)/downloads/page.tsx)
│   │   │   │   └── version/
│   │   │   │       └── [page.tsx](./keynotes/src/app/(info)/version/page.tsx)
│   │   │   ├── __tests__/
│   │   │   │   ├── [error.test.tsx](./keynotes/src/app/__tests__/error.test.tsx)
│   │   │   │   ├── [forbidden.test.tsx](./keynotes/src/app/__tests__/forbidden.test.tsx)
│   │   │   │   ├── [global-error.test.tsx](./keynotes/src/app/__tests__/global-error.test.tsx)
│   │   │   │   ├── [layout.test.tsx](./keynotes/src/app/__tests__/layout.test.tsx)
│   │   │   │   ├── [loading.test.tsx](./keynotes/src/app/__tests__/loading.test.tsx)
│   │   │   │   ├── [not-found.test.tsx](./keynotes/src/app/__tests__/not-found.test.tsx)
│   │   │   │   ├── [page.test.tsx](./keynotes/src/app/__tests__/page.test.tsx)
│   │   │   │   ├── [robots.test.ts](./keynotes/src/app/__tests__/robots.test.ts)
│   │   │   │   ├── [template.test.tsx](./keynotes/src/app/__tests__/template.test.tsx)
│   │   │   │   └── [unauthorized.test.tsx](./keynotes/src/app/__tests__/unauthorized.test.tsx)
│   │   │   ├── [default.tsx](./keynotes/src/app/default.tsx)
│   │   │   ├── [error.tsx](./keynotes/src/app/error.tsx)
│   │   │   ├── [favicon.ico](./keynotes/src/app/favicon.ico)
│   │   │   ├── [forbidden.tsx](./keynotes/src/app/forbidden.tsx)
│   │   │   ├── [global-error.tsx](./keynotes/src/app/global-error.tsx)
│   │   │   ├── [layout.tsx](./keynotes/src/app/layout.tsx)
│   │   │   ├── [loading.tsx](./keynotes/src/app/loading.tsx)
│   │   │   ├── [not-found.tsx](./keynotes/src/app/not-found.tsx)
│   │   │   ├── [page.tsx](./keynotes/src/app/page.tsx)
│   │   │   ├── [robots.ts](./keynotes/src/app/robots.ts)
│   │   │   ├── [template.tsx](./keynotes/src/app/template.tsx)
│   │   │   └── [unauthorized.tsx](./keynotes/src/app/unauthorized.tsx)
│   │   ├── components/
│   │   │   ├── atoms/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [FormControls.test.tsx](./keynotes/src/components/atoms/__tests__/FormControls.test.tsx)
│   │   │   │   ├── [FormControls.tsx](./keynotes/src/components/atoms/FormControls.tsx)
│   │   │   │   ├── [IconButton.tsx](./keynotes/src/components/atoms/IconButton.tsx)
│   │   │   │   ├── [LiveRegion.tsx](./keynotes/src/components/atoms/LiveRegion.tsx)
│   │   │   │   ├── [SkipLink.tsx](./keynotes/src/components/atoms/SkipLink.tsx)
│   │   │   │   └── [ThemeToggle.tsx](./keynotes/src/components/atoms/ThemeToggle.tsx)
│   │   │   ├── canvas/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [ObjectRenderer.test.tsx](./keynotes/src/components/canvas/__tests__/ObjectRenderer.test.tsx)
│   │   │   │   │   ├── [SlideCanvas.coverage.test.tsx](./keynotes/src/components/canvas/__tests__/SlideCanvas.coverage.test.tsx)
│   │   │   │   │   ├── [SlideCanvas.test.tsx](./keynotes/src/components/canvas/__tests__/SlideCanvas.test.tsx)
│   │   │   │   │   └── [canvasOps.test.ts](./keynotes/src/components/canvas/__tests__/canvasOps.test.ts)
│   │   │   │   ├── [ObjectRenderer.tsx](./keynotes/src/components/canvas/ObjectRenderer.tsx)
│   │   │   │   ├── [Rulers.tsx](./keynotes/src/components/canvas/Rulers.tsx)
│   │   │   │   ├── [SelectionOverlay.tsx](./keynotes/src/components/canvas/SelectionOverlay.tsx)
│   │   │   │   ├── [SlideCanvas.tsx](./keynotes/src/components/canvas/SlideCanvas.tsx)
│   │   │   │   ├── [SlidePreview.tsx](./keynotes/src/components/canvas/SlidePreview.tsx)
│   │   │   │   └── [canvasOps.ts](./keynotes/src/components/canvas/canvasOps.ts)
│   │   │   ├── home/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [DeckThumb.test.tsx](./keynotes/src/components/home/__tests__/DeckThumb.test.tsx)
│   │   │   │   ├── [DeckThumb.tsx](./keynotes/src/components/home/DeckThumb.tsx)
│   │   │   │   └── [ImportMenu.tsx](./keynotes/src/components/home/ImportMenu.tsx)
│   │   │   ├── objects/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [ObjectContent.test.tsx](./keynotes/src/components/objects/__tests__/ObjectContent.test.tsx)
│   │   │   │   └── [ObjectContent.tsx](./keynotes/src/components/objects/ObjectContent.tsx)
│   │   │   ├── organisms/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [EditorToolbar.coverage.test.tsx](./keynotes/src/components/organisms/__tests__/EditorToolbar.coverage.test.tsx)
│   │   │   │   │   ├── [ExportMenu.test.tsx](./keynotes/src/components/organisms/__tests__/ExportMenu.test.tsx)
│   │   │   │   │   └── [InsertToolbar.test.tsx](./keynotes/src/components/organisms/__tests__/InsertToolbar.test.tsx)
│   │   │   │   ├── panels/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [AnimationsPanel.test.tsx](./keynotes/src/components/organisms/panels/__tests__/AnimationsPanel.test.tsx)
│   │   │   │   │   │   ├── [CommentsPanel.test.tsx](./keynotes/src/components/organisms/panels/__tests__/CommentsPanel.test.tsx)
│   │   │   │   │   │   ├── [FooterControls.test.tsx](./keynotes/src/components/organisms/panels/__tests__/FooterControls.test.tsx)
│   │   │   │   │   │   ├── [FormatPanel.test.tsx](./keynotes/src/components/organisms/panels/__tests__/FormatPanel.test.tsx)
│   │   │   │   │   │   ├── [MasterPanel.test.tsx](./keynotes/src/components/organisms/panels/__tests__/MasterPanel.test.tsx)
│   │   │   │   │   │   ├── [ReuseSlidesModal.test.tsx](./keynotes/src/components/organisms/panels/__tests__/ReuseSlidesModal.test.tsx)
│   │   │   │   │   │   ├── [SectionGroup.test.tsx](./keynotes/src/components/organisms/panels/__tests__/SectionGroup.test.tsx)
│   │   │   │   │   │   ├── [SlideBackgroundPicker.test.tsx](./keynotes/src/components/organisms/panels/__tests__/SlideBackgroundPicker.test.tsx)
│   │   │   │   │   │   └── [SlidesPanel.test.tsx](./keynotes/src/components/organisms/panels/__tests__/SlidesPanel.test.tsx)
│   │   │   │   │   ├── animations/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   └── [AnimationOrderList.test.tsx](./keynotes/src/components/organisms/panels/animations/__tests__/AnimationOrderList.test.tsx)
│   │   │   │   │   │   ├── [AnimationOrderList.tsx](./keynotes/src/components/organisms/panels/animations/AnimationOrderList.tsx)
│   │   │   │   │   │   └── [AnimationPreview.tsx](./keynotes/src/components/organisms/panels/animations/AnimationPreview.tsx)
│   │   │   │   │   ├── [AnimationsPanel.tsx](./keynotes/src/components/organisms/panels/AnimationsPanel.tsx)
│   │   │   │   │   ├── [ArrangePanel.tsx](./keynotes/src/components/organisms/panels/ArrangePanel.tsx)
│   │   │   │   │   ├── [CommentsPanel.tsx](./keynotes/src/components/organisms/panels/CommentsPanel.tsx)
│   │   │   │   │   ├── [FooterControls.tsx](./keynotes/src/components/organisms/panels/FooterControls.tsx)
│   │   │   │   │   ├── [FormatPanel.tsx](./keynotes/src/components/organisms/panels/FormatPanel.tsx)
│   │   │   │   │   ├── [LeftPanel.tsx](./keynotes/src/components/organisms/panels/LeftPanel.tsx)
│   │   │   │   │   ├── [MasterPanel.tsx](./keynotes/src/components/organisms/panels/MasterPanel.tsx)
│   │   │   │   │   ├── [NotesPanel.tsx](./keynotes/src/components/organisms/panels/NotesPanel.tsx)
│   │   │   │   │   ├── [OutlinePanel.tsx](./keynotes/src/components/organisms/panels/OutlinePanel.tsx)
│   │   │   │   │   ├── [ReuseSlidesModal.tsx](./keynotes/src/components/organisms/panels/ReuseSlidesModal.tsx)
│   │   │   │   │   ├── [RightPanel.tsx](./keynotes/src/components/organisms/panels/RightPanel.tsx)
│   │   │   │   │   ├── [SectionGroup.tsx](./keynotes/src/components/organisms/panels/SectionGroup.tsx)
│   │   │   │   │   ├── [SlideBackgroundPicker.tsx](./keynotes/src/components/organisms/panels/SlideBackgroundPicker.tsx)
│   │   │   │   │   ├── [SlideThumb.tsx](./keynotes/src/components/organisms/panels/SlideThumb.tsx)
│   │   │   │   │   ├── [SlidesPanel.tsx](./keynotes/src/components/organisms/panels/SlidesPanel.tsx)
│   │   │   │   │   ├── [ThemePanel.tsx](./keynotes/src/components/organisms/panels/ThemePanel.tsx)
│   │   │   │   │   └── [TransitionsPanel.tsx](./keynotes/src/components/organisms/panels/TransitionsPanel.tsx)
│   │   │   │   ├── [DiagnosticsPanel.tsx](./keynotes/src/components/organisms/DiagnosticsPanel.tsx)
│   │   │   │   ├── [EditorToolbar.tsx](./keynotes/src/components/organisms/EditorToolbar.tsx)
│   │   │   │   ├── [ExportMenu.tsx](./keynotes/src/components/organisms/ExportMenu.tsx)
│   │   │   │   ├── [Header.tsx](./keynotes/src/components/organisms/Header.tsx)
│   │   │   │   ├── [InsertToolbar.tsx](./keynotes/src/components/organisms/InsertToolbar.tsx)
│   │   │   │   └── [ToastContainer.tsx](./keynotes/src/components/organisms/ToastContainer.tsx)
│   │   │   ├── present/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [AnnotationOverlay.test.tsx](./keynotes/src/components/present/__tests__/AnnotationOverlay.test.tsx)
│   │   │   │   │   ├── [PresentSlide.test.tsx](./keynotes/src/components/present/__tests__/PresentSlide.test.tsx)
│   │   │   │   │   └── [presentSteps.test.ts](./keynotes/src/components/present/__tests__/presentSteps.test.ts)
│   │   │   │   ├── [AnnotationOverlay.tsx](./keynotes/src/components/present/AnnotationOverlay.tsx)
│   │   │   │   ├── [AnnotationToolbar.tsx](./keynotes/src/components/present/AnnotationToolbar.tsx)
│   │   │   │   ├── [BlackoutOverlay.tsx](./keynotes/src/components/present/BlackoutOverlay.tsx)
│   │   │   │   ├── [CaptionsBar.tsx](./keynotes/src/components/present/CaptionsBar.tsx)
│   │   │   │   ├── [PresentSlide.tsx](./keynotes/src/components/present/PresentSlide.tsx)
│   │   │   │   ├── [PresentTools.tsx](./keynotes/src/components/present/PresentTools.tsx)
│   │   │   │   ├── [RehearsalSummary.tsx](./keynotes/src/components/present/RehearsalSummary.tsx)
│   │   │   │   └── [presentSteps.ts](./keynotes/src/components/present/presentSteps.ts)
│   │   │   ├── templates/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [AboutTemplate.test.tsx](./keynotes/src/components/templates/__tests__/AboutTemplate.test.tsx)
│   │   │   │   │   ├── [DownloadsTemplate.test.tsx](./keynotes/src/components/templates/__tests__/DownloadsTemplate.test.tsx)
│   │   │   │   │   ├── [ErrorTemplate.test.tsx](./keynotes/src/components/templates/__tests__/ErrorTemplate.test.tsx)
│   │   │   │   │   └── [VersionTemplate.test.tsx](./keynotes/src/components/templates/__tests__/VersionTemplate.test.tsx)
│   │   │   │   ├── [AboutTemplate.tsx](./keynotes/src/components/templates/AboutTemplate.tsx)
│   │   │   │   ├── [DownloadsTemplate.tsx](./keynotes/src/components/templates/DownloadsTemplate.tsx)
│   │   │   │   ├── [ErrorTemplate.tsx](./keynotes/src/components/templates/ErrorTemplate.tsx)
│   │   │   │   └── [VersionTemplate.tsx](./keynotes/src/components/templates/VersionTemplate.tsx)
│   │   │   └── [PwaRegister.tsx](./keynotes/src/components/PwaRegister.tsx)
│   │   ├── content/
│   │   │   ├── [about.ts](./keynotes/src/content/about.ts)
│   │   │   ├── [download.ts](./keynotes/src/content/download.ts)
│   │   │   └── [version.ts](./keynotes/src/content/version.ts)
│   │   ├── data/
│   │   │   ├── __tests__/
│   │   │   │   └── [themes.test.ts](./keynotes/src/data/__tests__/themes.test.ts)
│   │   │   ├── [charts.ts](./keynotes/src/data/charts.ts)
│   │   │   ├── [icons.ts](./keynotes/src/data/icons.ts)
│   │   │   ├── [presets.ts](./keynotes/src/data/presets.ts)
│   │   │   ├── [templates.ts](./keynotes/src/data/templates.ts)
│   │   │   └── [themes.ts](./keynotes/src/data/themes.ts)
│   │   ├── hooks/
│   │   │   ├── __tests__/
│   │   │   │   ├── [useCaptions.test.tsx](./keynotes/src/hooks/__tests__/useCaptions.test.tsx)
│   │   │   │   ├── [useObjectKeyboard.test.tsx](./keynotes/src/hooks/__tests__/useObjectKeyboard.test.tsx)
│   │   │   │   └── [useTheme.test.tsx](./keynotes/src/hooks/__tests__/useTheme.test.tsx)
│   │   │   ├── [useCaptions.ts](./keynotes/src/hooks/useCaptions.ts)
│   │   │   ├── [useObjectKeyboard.ts](./keynotes/src/hooks/useObjectKeyboard.ts)
│   │   │   └── [useTheme.ts](./keynotes/src/hooks/useTheme.ts)
│   │   ├── lib/
│   │   │   ├── __tests__/
│   │   │   │   └── [db.test.ts](./keynotes/src/lib/__tests__/db.test.ts)
│   │   │   ├── stubs/
│   │   │   │   └── [node-builtins.ts](./keynotes/src/lib/stubs/node-builtins.ts)
│   │   │   └── [db.ts](./keynotes/src/lib/db.ts)
│   │   ├── providers/
│   │   │   ├── __tests__/
│   │   │   │   ├── [DeckProvider.test.tsx](./keynotes/src/providers/__tests__/DeckProvider.test.tsx)
│   │   │   │   └── [ToastProvider.test.tsx](./keynotes/src/providers/__tests__/ToastProvider.test.tsx)
│   │   │   ├── [DeckProvider.tsx](./keynotes/src/providers/DeckProvider.tsx)
│   │   │   ├── [Providers.tsx](./keynotes/src/providers/Providers.tsx)
│   │   │   └── [ToastProvider.tsx](./keynotes/src/providers/ToastProvider.tsx)
│   │   ├── styles/
│   │   │   ├── [globals.css](./keynotes/src/styles/globals.css)
│   │   │   └── [themes.css](./keynotes/src/styles/themes.css)
│   │   ├── test/
│   │   │   └── [helpers.tsx](./keynotes/src/test/helpers.tsx)
│   │   ├── types/
│   │   │   └── [deck.ts](./keynotes/src/types/deck.ts)
│   │   └── utils/
│   │       ├── __tests__/
│   │       │   ├── [animations.test.ts](./keynotes/src/utils/__tests__/animations.test.ts)
│   │       │   ├── [annotations.test.ts](./keynotes/src/utils/__tests__/annotations.test.ts)
│   │       │   ├── [capture.test.ts](./keynotes/src/utils/__tests__/capture.test.ts)
│   │       │   ├── [color.test.ts](./keynotes/src/utils/__tests__/color.test.ts)
│   │       │   ├── [deckFactory.test.ts](./keynotes/src/utils/__tests__/deckFactory.test.ts)
│   │       │   ├── [diagnostics.test.ts](./keynotes/src/utils/__tests__/diagnostics.test.ts)
│   │       │   ├── [exporters.test.ts](./keynotes/src/utils/__tests__/exporters.test.ts)
│   │       │   ├── [format.test.ts](./keynotes/src/utils/__tests__/format.test.ts)
│   │       │   ├── [geometry.test.ts](./keynotes/src/utils/__tests__/geometry.test.ts)
│   │       │   ├── [highlight.test.tsx](./keynotes/src/utils/__tests__/highlight.test.tsx)
│   │       │   ├── [importers.test.ts](./keynotes/src/utils/__tests__/importers.test.ts)
│   │       │   ├── [markdown.test.tsx](./keynotes/src/utils/__tests__/markdown.test.tsx)
│   │       │   ├── [master.test.ts](./keynotes/src/utils/__tests__/master.test.ts)
│   │       │   ├── [recentColors.test.ts](./keynotes/src/utils/__tests__/recentColors.test.ts)
│   │       │   ├── [rehearsal.test.ts](./keynotes/src/utils/__tests__/rehearsal.test.ts)
│   │       │   ├── [reuse.test.ts](./keynotes/src/utils/__tests__/reuse.test.ts)
│   │       │   ├── [sections.test.ts](./keynotes/src/utils/__tests__/sections.test.ts)
│   │       │   ├── [shapes.test.ts](./keynotes/src/utils/__tests__/shapes.test.ts)
│   │       │   ├── [shortcuts.test.ts](./keynotes/src/utils/__tests__/shortcuts.test.ts)
│   │       │   └── [slideBg.test.ts](./keynotes/src/utils/__tests__/slideBg.test.ts)
│   │       ├── [animations.ts](./keynotes/src/utils/animations.ts)
│   │       ├── [annotations.ts](./keynotes/src/utils/annotations.ts)
│   │       ├── [capture.ts](./keynotes/src/utils/capture.ts)
│   │       ├── [color.ts](./keynotes/src/utils/color.ts)
│   │       ├── [deckFactory.ts](./keynotes/src/utils/deckFactory.ts)
│   │       ├── [diagnostics.ts](./keynotes/src/utils/diagnostics.ts)
│   │       ├── [exporters.ts](./keynotes/src/utils/exporters.ts)
│   │       ├── [format.ts](./keynotes/src/utils/format.ts)
│   │       ├── [geometry.ts](./keynotes/src/utils/geometry.ts)
│   │       ├── [highlight.tsx](./keynotes/src/utils/highlight.tsx)
│   │       ├── [id.ts](./keynotes/src/utils/id.ts)
│   │       ├── [importers.ts](./keynotes/src/utils/importers.ts)
│   │       ├── [markdown.tsx](./keynotes/src/utils/markdown.tsx)
│   │       ├── [master.ts](./keynotes/src/utils/master.ts)
│   │       ├── [recentColors.ts](./keynotes/src/utils/recentColors.ts)
│   │       ├── [rehearsal.ts](./keynotes/src/utils/rehearsal.ts)
│   │       ├── [reuse.ts](./keynotes/src/utils/reuse.ts)
│   │       ├── [sections.ts](./keynotes/src/utils/sections.ts)
│   │       ├── [shapes.ts](./keynotes/src/utils/shapes.ts)
│   │       ├── [shortcuts.ts](./keynotes/src/utils/shortcuts.ts)
│   │       └── [slideBg.ts](./keynotes/src/utils/slideBg.ts)
│   ├── src-tauri/
│   │   ├── capabilities/
│   │   │   └── [default.json](./keynotes/src-tauri/capabilities/default.json)
│   │   ├── icons/
│   │   │   ├── android/
│   │   │   │   ├── mipmap-anydpi-v26/
│   │   │   │   │   └── [ic_launcher.xml](./keynotes/src-tauri/icons/android/mipmap-anydpi-v26/ic_launcher.xml)
│   │   │   │   ├── mipmap-hdpi/
│   │   │   │   │   ├── [ic_launcher.png](./keynotes/src-tauri/icons/android/mipmap-hdpi/ic_launcher.png)
│   │   │   │   │   ├── [ic_launcher_foreground.png](./keynotes/src-tauri/icons/android/mipmap-hdpi/ic_launcher_foreground.png)
│   │   │   │   │   └── [ic_launcher_round.png](./keynotes/src-tauri/icons/android/mipmap-hdpi/ic_launcher_round.png)
│   │   │   │   ├── mipmap-mdpi/
│   │   │   │   │   ├── [ic_launcher.png](./keynotes/src-tauri/icons/android/mipmap-mdpi/ic_launcher.png)
│   │   │   │   │   ├── [ic_launcher_foreground.png](./keynotes/src-tauri/icons/android/mipmap-mdpi/ic_launcher_foreground.png)
│   │   │   │   │   └── [ic_launcher_round.png](./keynotes/src-tauri/icons/android/mipmap-mdpi/ic_launcher_round.png)
│   │   │   │   ├── mipmap-xhdpi/
│   │   │   │   │   ├── [ic_launcher.png](./keynotes/src-tauri/icons/android/mipmap-xhdpi/ic_launcher.png)
│   │   │   │   │   ├── [ic_launcher_foreground.png](./keynotes/src-tauri/icons/android/mipmap-xhdpi/ic_launcher_foreground.png)
│   │   │   │   │   └── [ic_launcher_round.png](./keynotes/src-tauri/icons/android/mipmap-xhdpi/ic_launcher_round.png)
│   │   │   │   ├── mipmap-xxhdpi/
│   │   │   │   │   ├── [ic_launcher.png](./keynotes/src-tauri/icons/android/mipmap-xxhdpi/ic_launcher.png)
│   │   │   │   │   ├── [ic_launcher_foreground.png](./keynotes/src-tauri/icons/android/mipmap-xxhdpi/ic_launcher_foreground.png)
│   │   │   │   │   └── [ic_launcher_round.png](./keynotes/src-tauri/icons/android/mipmap-xxhdpi/ic_launcher_round.png)
│   │   │   │   ├── mipmap-xxxhdpi/
│   │   │   │   │   ├── [ic_launcher.png](./keynotes/src-tauri/icons/android/mipmap-xxxhdpi/ic_launcher.png)
│   │   │   │   │   ├── [ic_launcher_foreground.png](./keynotes/src-tauri/icons/android/mipmap-xxxhdpi/ic_launcher_foreground.png)
│   │   │   │   │   └── [ic_launcher_round.png](./keynotes/src-tauri/icons/android/mipmap-xxxhdpi/ic_launcher_round.png)
│   │   │   │   └── values/
│   │   │   │       └── [ic_launcher_background.xml](./keynotes/src-tauri/icons/android/values/ic_launcher_background.xml)
│   │   │   ├── ios/
│   │   │   │   ├── [AppIcon-20x20@1x.png](./keynotes/src-tauri/icons/ios/AppIcon-20x20@1x.png)
│   │   │   │   ├── [AppIcon-20x20@2x-1.png](./keynotes/src-tauri/icons/ios/AppIcon-20x20@2x-1.png)
│   │   │   │   ├── [AppIcon-20x20@2x.png](./keynotes/src-tauri/icons/ios/AppIcon-20x20@2x.png)
│   │   │   │   ├── [AppIcon-20x20@3x.png](./keynotes/src-tauri/icons/ios/AppIcon-20x20@3x.png)
│   │   │   │   ├── [AppIcon-29x29@1x.png](./keynotes/src-tauri/icons/ios/AppIcon-29x29@1x.png)
│   │   │   │   ├── [AppIcon-29x29@2x-1.png](./keynotes/src-tauri/icons/ios/AppIcon-29x29@2x-1.png)
│   │   │   │   ├── [AppIcon-29x29@2x.png](./keynotes/src-tauri/icons/ios/AppIcon-29x29@2x.png)
│   │   │   │   ├── [AppIcon-29x29@3x.png](./keynotes/src-tauri/icons/ios/AppIcon-29x29@3x.png)
│   │   │   │   ├── [AppIcon-40x40@1x.png](./keynotes/src-tauri/icons/ios/AppIcon-40x40@1x.png)
│   │   │   │   ├── [AppIcon-40x40@2x-1.png](./keynotes/src-tauri/icons/ios/AppIcon-40x40@2x-1.png)
│   │   │   │   ├── [AppIcon-40x40@2x.png](./keynotes/src-tauri/icons/ios/AppIcon-40x40@2x.png)
│   │   │   │   ├── [AppIcon-40x40@3x.png](./keynotes/src-tauri/icons/ios/AppIcon-40x40@3x.png)
│   │   │   │   ├── [AppIcon-512@2x.png](./keynotes/src-tauri/icons/ios/AppIcon-512@2x.png)
│   │   │   │   ├── [AppIcon-60x60@2x.png](./keynotes/src-tauri/icons/ios/AppIcon-60x60@2x.png)
│   │   │   │   ├── [AppIcon-60x60@3x.png](./keynotes/src-tauri/icons/ios/AppIcon-60x60@3x.png)
│   │   │   │   ├── [AppIcon-76x76@1x.png](./keynotes/src-tauri/icons/ios/AppIcon-76x76@1x.png)
│   │   │   │   ├── [AppIcon-76x76@2x.png](./keynotes/src-tauri/icons/ios/AppIcon-76x76@2x.png)
│   │   │   │   └── [AppIcon-83.5x83.5@2x.png](./keynotes/src-tauri/icons/ios/AppIcon-83.5x83.5@2x.png)
│   │   │   ├── [128x128.png](./keynotes/src-tauri/icons/128x128.png)
│   │   │   ├── [128x128@2x.png](./keynotes/src-tauri/icons/128x128@2x.png)
│   │   │   ├── [256x256.png](./keynotes/src-tauri/icons/256x256.png)
│   │   │   ├── [32x32.png](./keynotes/src-tauri/icons/32x32.png)
│   │   │   ├── [64x64.png](./keynotes/src-tauri/icons/64x64.png)
│   │   │   ├── [Square107x107Logo.png](./keynotes/src-tauri/icons/Square107x107Logo.png)
│   │   │   ├── [Square142x142Logo.png](./keynotes/src-tauri/icons/Square142x142Logo.png)
│   │   │   ├── [Square150x150Logo.png](./keynotes/src-tauri/icons/Square150x150Logo.png)
│   │   │   ├── [Square284x284Logo.png](./keynotes/src-tauri/icons/Square284x284Logo.png)
│   │   │   ├── [Square30x30Logo.png](./keynotes/src-tauri/icons/Square30x30Logo.png)
│   │   │   ├── [Square310x310Logo.png](./keynotes/src-tauri/icons/Square310x310Logo.png)
│   │   │   ├── [Square44x44Logo.png](./keynotes/src-tauri/icons/Square44x44Logo.png)
│   │   │   ├── [Square71x71Logo.png](./keynotes/src-tauri/icons/Square71x71Logo.png)
│   │   │   ├── [Square89x89Logo.png](./keynotes/src-tauri/icons/Square89x89Logo.png)
│   │   │   ├── [StoreLogo.png](./keynotes/src-tauri/icons/StoreLogo.png)
│   │   │   ├── [create-icons.sh](./keynotes/src-tauri/icons/create-icons.sh)
│   │   │   ├── [icon.icns](./keynotes/src-tauri/icons/icon.icns)
│   │   │   ├── [icon.ico](./keynotes/src-tauri/icons/icon.ico)
│   │   │   └── [icon.png](./keynotes/src-tauri/icons/icon.png)
│   │   ├── src/
│   │   │   ├── [lib.rs](./keynotes/src-tauri/src/lib.rs)
│   │   │   └── [main.rs](./keynotes/src-tauri/src/main.rs)
│   │   ├── [Cargo.lock](./keynotes/src-tauri/Cargo.lock)
│   │   ├── [Cargo.toml](./keynotes/src-tauri/Cargo.toml)
│   │   ├── [build.rs](./keynotes/src-tauri/build.rs)
│   │   └── [tauri.conf.json](./keynotes/src-tauri/tauri.conf.json)
│   ├── [AGENTS.md](./keynotes/AGENTS.md)
│   ├── [Dockerfile](./keynotes/Dockerfile)
│   ├── [LICENSE](./keynotes/LICENSE)
│   ├── [README.md](./keynotes/README.md)
│   ├── [docker-compose.yaml](./keynotes/docker-compose.yaml)
│   ├── [eslint.config.mts](./keynotes/eslint.config.mts)
│   ├── [jest.config.ts](./keynotes/jest.config.ts)
│   ├── [jest.setup.ts](./keynotes/jest.setup.ts)
│   ├── [next.config.ts](./keynotes/next.config.ts)
│   ├── [package.json](./keynotes/package.json)
│   ├── [playwright.config.ts](./keynotes/playwright.config.ts)
│   ├── [postcss.config.mjs](./keynotes/postcss.config.mjs)
│   └── [tsconfig.json](./keynotes/tsconfig.json)
├── office/
│   ├── docs/
│   │   ├── [ARCHITECTURE.md](./office/docs/ARCHITECTURE.md)
│   │   ├── [CONTRIBUTING.md](./office/docs/CONTRIBUTING.md)
│   │   ├── [DOWNLOADS.md](./office/docs/DOWNLOADS.md)
│   │   ├── [PACKAGING.md](./office/docs/PACKAGING.md)
│   │   └── [ROADMAP.md](./office/docs/ROADMAP.md)
│   ├── e2e/
│   │   ├── screenshots/
│   │   │   ├── [about.png](./office/e2e/screenshots/about.png)
│   │   │   ├── [downloads.png](./office/e2e/screenshots/downloads.png)
│   │   │   └── [version.png](./office/e2e/screenshots/version.png)
│   │   ├── [about.spec.ts](./office/e2e/about.spec.ts)
│   │   ├── [downloads.spec.ts](./office/e2e/downloads.spec.ts)
│   │   ├── [home.spec.ts](./office/e2e/home.spec.ts)
│   │   ├── [smoke.spec.ts](./office/e2e/smoke.spec.ts)
│   │   └── [version.spec.ts](./office/e2e/version.spec.ts)
│   ├── public/
│   │   ├── icons/
│   │   │   ├── [icon-128x128.png](./office/public/icons/icon-128x128.png)
│   │   │   ├── [icon-144x144.png](./office/public/icons/icon-144x144.png)
│   │   │   ├── [icon-152x152.png](./office/public/icons/icon-152x152.png)
│   │   │   ├── [icon-16x16.png](./office/public/icons/icon-16x16.png)
│   │   │   ├── [icon-180x180.png](./office/public/icons/icon-180x180.png)
│   │   │   ├── [icon-192x192.png](./office/public/icons/icon-192x192.png)
│   │   │   ├── [icon-256x256.png](./office/public/icons/icon-256x256.png)
│   │   │   ├── [icon-32x32.png](./office/public/icons/icon-32x32.png)
│   │   │   ├── [icon-384x384.png](./office/public/icons/icon-384x384.png)
│   │   │   ├── [icon-48x48.png](./office/public/icons/icon-48x48.png)
│   │   │   ├── [icon-512x512.png](./office/public/icons/icon-512x512.png)
│   │   │   ├── [icon-64x64.png](./office/public/icons/icon-64x64.png)
│   │   │   ├── [icon-72x72.png](./office/public/icons/icon-72x72.png)
│   │   │   ├── [icon-96x96.png](./office/public/icons/icon-96x96.png)
│   │   │   └── [icon.svg](./office/public/icons/icon.svg)
│   │   ├── [apple-touch-icon.png](./office/public/apple-touch-icon.png)
│   │   ├── [favicon.ico](./office/public/favicon.ico)
│   │   ├── [manifest.json](./office/public/manifest.json)
│   │   ├── [robots.txt](./office/public/robots.txt)
│   │   ├── [sitemap.xml](./office/public/sitemap.xml)
│   │   └── [sw.js](./office/public/sw.js)
│   ├── scripts/
│   │   └── [generate-seed.mjs](./office/scripts/generate-seed.mjs)
│   ├── src/
│   │   ├── app/
│   │   │   ├── (app)/
│   │   │   │   ├── (lite)/
│   │   │   │   │   └── lite/
│   │   │   │   │       ├── __tests__/
│   │   │   │   │       │   └── [page.test.tsx](./office/src/app/(app)/(lite)/lite/__tests__/page.test.tsx)
│   │   │   │   │       ├── calendar/
│   │   │   │   │       │   ├── __tests__/
│   │   │   │   │       │   │   └── [page.test.tsx](./office/src/app/(app)/(lite)/lite/calendar/__tests__/page.test.tsx)
│   │   │   │   │       │   └── [page.tsx](./office/src/app/(app)/(lite)/lite/calendar/page.tsx)
│   │   │   │   │       ├── csv/
│   │   │   │   │       │   ├── __tests__/
│   │   │   │   │       │   │   └── [page.test.tsx](./office/src/app/(app)/(lite)/lite/csv/__tests__/page.test.tsx)
│   │   │   │   │       │   └── [page.tsx](./office/src/app/(app)/(lite)/lite/csv/page.tsx)
│   │   │   │   │       ├── md/
│   │   │   │   │       │   ├── __tests__/
│   │   │   │   │       │   │   └── [page.test.tsx](./office/src/app/(app)/(lite)/lite/md/__tests__/page.test.tsx)
│   │   │   │   │       │   └── [page.tsx](./office/src/app/(app)/(lite)/lite/md/page.tsx)
│   │   │   │   │       ├── tasks/
│   │   │   │   │       │   ├── __tests__/
│   │   │   │   │       │   │   └── [page.test.tsx](./office/src/app/(app)/(lite)/lite/tasks/__tests__/page.test.tsx)
│   │   │   │   │       │   └── [page.tsx](./office/src/app/(app)/(lite)/lite/tasks/page.tsx)
│   │   │   │   │       └── [page.tsx](./office/src/app/(app)/(lite)/lite/page.tsx)
│   │   │   │   ├── calendar/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./office/src/app/(app)/calendar/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./office/src/app/(app)/calendar/page.tsx)
│   │   │   │   ├── csv/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./office/src/app/(app)/csv/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./office/src/app/(app)/csv/page.tsx)
│   │   │   │   ├── md/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./office/src/app/(app)/md/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./office/src/app/(app)/md/page.tsx)
│   │   │   │   └── tasks/
│   │   │   │       ├── __tests__/
│   │   │   │       │   └── [page.test.tsx](./office/src/app/(app)/tasks/__tests__/page.test.tsx)
│   │   │   │       └── [page.tsx](./office/src/app/(app)/tasks/page.tsx)
│   │   │   ├── (auth)/
│   │   │   │   ├── forget-password/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./office/src/app/(auth)/forget-password/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./office/src/app/(auth)/forget-password/page.tsx)
│   │   │   │   ├── profile/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./office/src/app/(auth)/profile/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./office/src/app/(auth)/profile/page.tsx)
│   │   │   │   ├── reset-password/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./office/src/app/(auth)/reset-password/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./office/src/app/(auth)/reset-password/page.tsx)
│   │   │   │   ├── sign-in/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./office/src/app/(auth)/sign-in/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./office/src/app/(auth)/sign-in/page.tsx)
│   │   │   │   └── sign-up/
│   │   │   │       ├── __tests__/
│   │   │   │       │   └── [page.test.tsx](./office/src/app/(auth)/sign-up/__tests__/page.test.tsx)
│   │   │   │       └── [page.tsx](./office/src/app/(auth)/sign-up/page.tsx)
│   │   │   ├── (info)/
│   │   │   │   ├── about/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./office/src/app/(info)/about/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./office/src/app/(info)/about/page.tsx)
│   │   │   │   ├── downloads/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./office/src/app/(info)/downloads/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./office/src/app/(info)/downloads/page.tsx)
│   │   │   │   └── version/
│   │   │   │       ├── __tests__/
│   │   │   │       │   └── [page.test.tsx](./office/src/app/(info)/version/__tests__/page.test.tsx)
│   │   │   │       └── [page.tsx](./office/src/app/(info)/version/page.tsx)
│   │   │   ├── __tests__/
│   │   │   │   ├── [default.test.tsx](./office/src/app/__tests__/default.test.tsx)
│   │   │   │   ├── [error.test.tsx](./office/src/app/__tests__/error.test.tsx)
│   │   │   │   ├── [forbidden.test.tsx](./office/src/app/__tests__/forbidden.test.tsx)
│   │   │   │   ├── [global-error.test.tsx](./office/src/app/__tests__/global-error.test.tsx)
│   │   │   │   ├── [layout.test.tsx](./office/src/app/__tests__/layout.test.tsx)
│   │   │   │   ├── [loading.test.tsx](./office/src/app/__tests__/loading.test.tsx)
│   │   │   │   ├── [not-found.test.tsx](./office/src/app/__tests__/not-found.test.tsx)
│   │   │   │   ├── [page.test.tsx](./office/src/app/__tests__/page.test.tsx)
│   │   │   │   ├── [robots.test.ts](./office/src/app/__tests__/robots.test.ts)
│   │   │   │   ├── [template.test.tsx](./office/src/app/__tests__/template.test.tsx)
│   │   │   │   └── [unauthorized.test.tsx](./office/src/app/__tests__/unauthorized.test.tsx)
│   │   │   ├── [default.tsx](./office/src/app/default.tsx)
│   │   │   ├── [error.tsx](./office/src/app/error.tsx)
│   │   │   ├── [favicon.ico](./office/src/app/favicon.ico)
│   │   │   ├── [forbidden.tsx](./office/src/app/forbidden.tsx)
│   │   │   ├── [global-error.tsx](./office/src/app/global-error.tsx)
│   │   │   ├── [layout.tsx](./office/src/app/layout.tsx)
│   │   │   ├── [loading.tsx](./office/src/app/loading.tsx)
│   │   │   ├── [not-found.tsx](./office/src/app/not-found.tsx)
│   │   │   ├── [page.tsx](./office/src/app/page.tsx)
│   │   │   ├── [robots.ts](./office/src/app/robots.ts)
│   │   │   ├── [template.tsx](./office/src/app/template.tsx)
│   │   │   └── [unauthorized.tsx](./office/src/app/unauthorized.tsx)
│   │   ├── components/
│   │   │   ├── calendar/
│   │   │   │   ├── atoms/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [EventList.test.tsx](./office/src/components/calendar/atoms/__tests__/EventList.test.tsx)
│   │   │   │   │   │   ├── [LunarDate.test.tsx](./office/src/components/calendar/atoms/__tests__/LunarDate.test.tsx)
│   │   │   │   │   │   ├── [TimeBlock.test.tsx](./office/src/components/calendar/atoms/__tests__/TimeBlock.test.tsx)
│   │   │   │   │   │   └── [TimeGrid.test.tsx](./office/src/components/calendar/atoms/__tests__/TimeGrid.test.tsx)
│   │   │   │   │   ├── [EventList.tsx](./office/src/components/calendar/atoms/EventList.tsx)
│   │   │   │   │   ├── [LunarDate.tsx](./office/src/components/calendar/atoms/LunarDate.tsx)
│   │   │   │   │   ├── [TimeBlock.tsx](./office/src/components/calendar/atoms/TimeBlock.tsx)
│   │   │   │   │   └── [TimeGrid.tsx](./office/src/components/calendar/atoms/TimeGrid.tsx)
│   │   │   │   ├── molecules/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [DayView.test.tsx](./office/src/components/calendar/molecules/__tests__/DayView.test.tsx)
│   │   │   │   │   │   ├── [MonthCalendar.test.tsx](./office/src/components/calendar/molecules/__tests__/MonthCalendar.test.tsx)
│   │   │   │   │   │   ├── [ThreeDayView.test.tsx](./office/src/components/calendar/molecules/__tests__/ThreeDayView.test.tsx)
│   │   │   │   │   │   ├── [WeekView.test.tsx](./office/src/components/calendar/molecules/__tests__/WeekView.test.tsx)
│   │   │   │   │   │   └── [YearlyView.test.tsx](./office/src/components/calendar/molecules/__tests__/YearlyView.test.tsx)
│   │   │   │   │   ├── [DayView.tsx](./office/src/components/calendar/molecules/DayView.tsx)
│   │   │   │   │   ├── [HalflyView.tsx](./office/src/components/calendar/molecules/HalflyView.tsx)
│   │   │   │   │   ├── [MonthCalendar.tsx](./office/src/components/calendar/molecules/MonthCalendar.tsx)
│   │   │   │   │   ├── [QuarterlyView.tsx](./office/src/components/calendar/molecules/QuarterlyView.tsx)
│   │   │   │   │   ├── [ThreeDayView.tsx](./office/src/components/calendar/molecules/ThreeDayView.tsx)
│   │   │   │   │   ├── [WeekView.tsx](./office/src/components/calendar/molecules/WeekView.tsx)
│   │   │   │   │   └── [YearlyView.tsx](./office/src/components/calendar/molecules/YearlyView.tsx)
│   │   │   │   └── organisms/
│   │   │   │       ├── __tests__/
│   │   │   │       │   ├── [CalendarApp.test.tsx](./office/src/components/calendar/organisms/__tests__/CalendarApp.test.tsx)
│   │   │   │       │   ├── [CountdownModal.test.tsx](./office/src/components/calendar/organisms/__tests__/CountdownModal.test.tsx)
│   │   │   │       │   ├── [DaysCountModal.test.tsx](./office/src/components/calendar/organisms/__tests__/DaysCountModal.test.tsx)
│   │   │   │       │   └── [LiteCalendar.test.tsx](./office/src/components/calendar/organisms/__tests__/LiteCalendar.test.tsx)
│   │   │   │       ├── [CalendarApp.tsx](./office/src/components/calendar/organisms/CalendarApp.tsx)
│   │   │   │       ├── [CountdownModal.tsx](./office/src/components/calendar/organisms/CountdownModal.tsx)
│   │   │   │       ├── [DaysCountModal.tsx](./office/src/components/calendar/organisms/DaysCountModal.tsx)
│   │   │   │       └── [LiteCalendar.tsx](./office/src/components/calendar/organisms/LiteCalendar.tsx)
│   │   │   ├── csv/
│   │   │   │   ├── atoms/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [Cell.test.tsx](./office/src/components/csv/atoms/__tests__/Cell.test.tsx)
│   │   │   │   │   └── [Cell.tsx](./office/src/components/csv/atoms/Cell.tsx)
│   │   │   │   ├── molecules/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [StatusBar.test.tsx](./office/src/components/csv/molecules/__tests__/StatusBar.test.tsx)
│   │   │   │   │   │   └── [Toolbar.test.tsx](./office/src/components/csv/molecules/__tests__/Toolbar.test.tsx)
│   │   │   │   │   ├── [CommentPopover.tsx](./office/src/components/csv/molecules/CommentPopover.tsx)
│   │   │   │   │   ├── [FilterBar.tsx](./office/src/components/csv/molecules/FilterBar.tsx)
│   │   │   │   │   ├── [FindBar.tsx](./office/src/components/csv/molecules/FindBar.tsx)
│   │   │   │   │   ├── [SheetTabs.tsx](./office/src/components/csv/molecules/SheetTabs.tsx)
│   │   │   │   │   ├── [ShortcutsModal.tsx](./office/src/components/csv/molecules/ShortcutsModal.tsx)
│   │   │   │   │   ├── [StatusBar.tsx](./office/src/components/csv/molecules/StatusBar.tsx)
│   │   │   │   │   └── [Toolbar.tsx](./office/src/components/csv/molecules/Toolbar.tsx)
│   │   │   │   ├── organisms/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [Grid.test.tsx](./office/src/components/csv/organisms/__tests__/Grid.test.tsx)
│   │   │   │   │   │   ├── [LiteSheet.test.tsx](./office/src/components/csv/organisms/__tests__/LiteSheet.test.tsx)
│   │   │   │   │   │   └── [Sheet.test.tsx](./office/src/components/csv/organisms/__tests__/Sheet.test.tsx)
│   │   │   │   │   ├── [Grid.tsx](./office/src/components/csv/organisms/Grid.tsx)
│   │   │   │   │   ├── [LiteSheet.tsx](./office/src/components/csv/organisms/LiteSheet.tsx)
│   │   │   │   │   └── [Sheet.tsx](./office/src/components/csv/organisms/Sheet.tsx)
│   │   │   │   └── templates/
│   │   │   ├── md/
│   │   │   │   ├── atoms/
│   │   │   │   ├── molecules/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [ConvertToolbar.test.tsx](./office/src/components/md/molecules/__tests__/ConvertToolbar.test.tsx)
│   │   │   │   │   │   ├── [FileToolbar.test.tsx](./office/src/components/md/molecules/__tests__/FileToolbar.test.tsx)
│   │   │   │   │   │   ├── [FormatToolbar.test.tsx](./office/src/components/md/molecules/__tests__/FormatToolbar.test.tsx)
│   │   │   │   │   │   ├── [StatsBar.test.tsx](./office/src/components/md/molecules/__tests__/StatsBar.test.tsx)
│   │   │   │   │   │   ├── [TocSidebar.test.tsx](./office/src/components/md/molecules/__tests__/TocSidebar.test.tsx)
│   │   │   │   │   │   ├── [ViewControls.test.tsx](./office/src/components/md/molecules/__tests__/ViewControls.test.tsx)
│   │   │   │   │   │   └── [WordCounterDialog.test.tsx](./office/src/components/md/molecules/__tests__/WordCounterDialog.test.tsx)
│   │   │   │   │   ├── [ConvertToolbar.tsx](./office/src/components/md/molecules/ConvertToolbar.tsx)
│   │   │   │   │   ├── [FileToolbar.tsx](./office/src/components/md/molecules/FileToolbar.tsx)
│   │   │   │   │   ├── [FormatToolbar.tsx](./office/src/components/md/molecules/FormatToolbar.tsx)
│   │   │   │   │   ├── [StatsBar.tsx](./office/src/components/md/molecules/StatsBar.tsx)
│   │   │   │   │   ├── [TocSidebar.tsx](./office/src/components/md/molecules/TocSidebar.tsx)
│   │   │   │   │   ├── [ViewControls.tsx](./office/src/components/md/molecules/ViewControls.tsx)
│   │   │   │   │   └── [WordCounterDialog.tsx](./office/src/components/md/molecules/WordCounterDialog.tsx)
│   │   │   │   ├── organisms/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [GraphView.test.tsx](./office/src/components/md/organisms/__tests__/GraphView.test.tsx)
│   │   │   │   │   │   ├── [LiteMarkdown.test.tsx](./office/src/components/md/organisms/__tests__/LiteMarkdown.test.tsx)
│   │   │   │   │   │   ├── [MarkdownApp.test.tsx](./office/src/components/md/organisms/__tests__/MarkdownApp.test.tsx)
│   │   │   │   │   │   ├── [MarkdownPreviewer.test.tsx](./office/src/components/md/organisms/__tests__/MarkdownPreviewer.test.tsx)
│   │   │   │   │   │   └── [MarkdownSidebar.test.tsx](./office/src/components/md/organisms/__tests__/MarkdownSidebar.test.tsx)
│   │   │   │   │   ├── [GraphView.tsx](./office/src/components/md/organisms/GraphView.tsx)
│   │   │   │   │   ├── [LiteMarkdownApp.tsx](./office/src/components/md/organisms/LiteMarkdownApp.tsx)
│   │   │   │   │   ├── [MarkdownApp.tsx](./office/src/components/md/organisms/MarkdownApp.tsx)
│   │   │   │   │   ├── [MarkdownPreviewer.tsx](./office/src/components/md/organisms/MarkdownPreviewer.tsx)
│   │   │   │   │   └── [MarkdownSidebar.tsx](./office/src/components/md/organisms/MarkdownSidebar.tsx)
│   │   │   │   └── templates/
│   │   │   ├── shared/
│   │   │   │   ├── atoms/
│   │   │   │   ├── molecules/
│   │   │   │   ├── organisms/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [AppsHub.test.tsx](./office/src/components/shared/organisms/__tests__/AppsHub.test.tsx)
│   │   │   │   │   │   └── [Header.test.tsx](./office/src/components/shared/organisms/__tests__/Header.test.tsx)
│   │   │   │   │   ├── [AppsComparison.tsx](./office/src/components/shared/organisms/AppsComparison.tsx)
│   │   │   │   │   ├── [AppsHub.tsx](./office/src/components/shared/organisms/AppsHub.tsx)
│   │   │   │   │   └── [Header.tsx](./office/src/components/shared/organisms/Header.tsx)
│   │   │   │   └── templates/
│   │   │   │       ├── __tests__/
│   │   │   │       │   ├── [AboutTemplate.test.tsx](./office/src/components/shared/templates/__tests__/AboutTemplate.test.tsx)
│   │   │   │       │   ├── [DownloadsTemplate.test.tsx](./office/src/components/shared/templates/__tests__/DownloadsTemplate.test.tsx)
│   │   │   │       │   ├── [ErrorTemplate.test.tsx](./office/src/components/shared/templates/__tests__/ErrorTemplate.test.tsx)
│   │   │   │       │   └── [VersionTemplate.test.tsx](./office/src/components/shared/templates/__tests__/VersionTemplate.test.tsx)
│   │   │   │       ├── [AboutTemplate.tsx](./office/src/components/shared/templates/AboutTemplate.tsx)
│   │   │   │       ├── [DownloadsTemplate.tsx](./office/src/components/shared/templates/DownloadsTemplate.tsx)
│   │   │   │       ├── [ErrorTemplate.tsx](./office/src/components/shared/templates/ErrorTemplate.tsx)
│   │   │   │       └── [VersionTemplate.tsx](./office/src/components/shared/templates/VersionTemplate.tsx)
│   │   │   └── tasks/
│   │   │       ├── atoms/
│   │   │       │   ├── __tests__/
│   │   │       │   │   ├── [DueFilterSelect.test.tsx](./office/src/components/tasks/atoms/__tests__/DueFilterSelect.test.tsx)
│   │   │       │   │   └── [PriorityFilterSelect.test.tsx](./office/src/components/tasks/atoms/__tests__/PriorityFilterSelect.test.tsx)
│   │   │       │   ├── [DueFilterSelect.tsx](./office/src/components/tasks/atoms/DueFilterSelect.tsx)
│   │   │       │   └── [PriorityFilterSelect.tsx](./office/src/components/tasks/atoms/PriorityFilterSelect.tsx)
│   │   │       ├── molecules/
│   │   │       │   ├── __tests__/
│   │   │       │   │   ├── [LabelFilters.test.tsx](./office/src/components/tasks/molecules/__tests__/LabelFilters.test.tsx)
│   │   │       │   │   ├── [MemberFilters.test.tsx](./office/src/components/tasks/molecules/__tests__/MemberFilters.test.tsx)
│   │   │       │   │   ├── [TaskEmptyState.test.tsx](./office/src/components/tasks/molecules/__tests__/TaskEmptyState.test.tsx)
│   │   │       │   │   ├── [TaskInput.test.tsx](./office/src/components/tasks/molecules/__tests__/TaskInput.test.tsx)
│   │   │       │   │   ├── [TaskItem.test.tsx](./office/src/components/tasks/molecules/__tests__/TaskItem.test.tsx)
│   │   │       │   │   └── [TaskSignInState.test.tsx](./office/src/components/tasks/molecules/__tests__/TaskSignInState.test.tsx)
│   │   │       │   ├── [LabelFilters.tsx](./office/src/components/tasks/molecules/LabelFilters.tsx)
│   │   │       │   ├── [MemberFilters.tsx](./office/src/components/tasks/molecules/MemberFilters.tsx)
│   │   │       │   ├── [PresetsMenu.tsx](./office/src/components/tasks/molecules/PresetsMenu.tsx)
│   │   │       │   ├── [TaskEmptyState.tsx](./office/src/components/tasks/molecules/TaskEmptyState.tsx)
│   │   │       │   ├── [TaskInput.tsx](./office/src/components/tasks/molecules/TaskInput.tsx)
│   │   │       │   ├── [TaskItem.tsx](./office/src/components/tasks/molecules/TaskItem.tsx)
│   │   │       │   └── [TaskSignInState.tsx](./office/src/components/tasks/molecules/TaskSignInState.tsx)
│   │   │       ├── organisms/
│   │   │       │   ├── __tests__/
│   │   │       │   │   ├── [BoardBody.test.tsx](./office/src/components/tasks/organisms/__tests__/BoardBody.test.tsx)
│   │   │       │   │   ├── [KanbanBoard.test.tsx](./office/src/components/tasks/organisms/__tests__/KanbanBoard.test.tsx)
│   │   │       │   │   ├── [MemberSwitcher.test.tsx](./office/src/components/tasks/organisms/__tests__/MemberSwitcher.test.tsx)
│   │   │       │   │   ├── [TasksView.test.tsx](./office/src/components/tasks/organisms/__tests__/TasksView.test.tsx)
│   │   │       │   │   └── [ViewSwitcher.test.tsx](./office/src/components/tasks/organisms/__tests__/ViewSwitcher.test.tsx)
│   │   │       │   ├── [BoardBody.tsx](./office/src/components/tasks/organisms/BoardBody.tsx)
│   │   │       │   ├── [BoardFilterBar.tsx](./office/src/components/tasks/organisms/BoardFilterBar.tsx)
│   │   │       │   ├── [CalendarView.tsx](./office/src/components/tasks/organisms/CalendarView.tsx)
│   │   │       │   ├── [KanbanBoard.tsx](./office/src/components/tasks/organisms/KanbanBoard.tsx)
│   │   │       │   ├── [ListView.tsx](./office/src/components/tasks/organisms/ListView.tsx)
│   │   │       │   ├── [MemberSwitcher.tsx](./office/src/components/tasks/organisms/MemberSwitcher.tsx)
│   │   │       │   ├── [ProjectSidebar.tsx](./office/src/components/tasks/organisms/ProjectSidebar.tsx)
│   │   │       │   ├── [TasksView.tsx](./office/src/components/tasks/organisms/TasksView.tsx)
│   │   │       │   ├── [TimelineView.tsx](./office/src/components/tasks/organisms/TimelineView.tsx)
│   │   │       │   └── [ViewSwitcher.tsx](./office/src/components/tasks/organisms/ViewSwitcher.tsx)
│   │   │       └── [Providers.tsx](./office/src/components/tasks/Providers.tsx)
│   │   ├── content/
│   │   │   ├── [about.ts](./office/src/content/about.ts)
│   │   │   ├── [download.ts](./office/src/content/download.ts)
│   │   │   └── [version.ts](./office/src/content/version.ts)
│   │   ├── data/
│   │   │   ├── calendar/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [constants.test.ts](./office/src/data/calendar/__tests__/constants.test.ts)
│   │   │   │   │   └── [timeBlocks.test.ts](./office/src/data/calendar/__tests__/timeBlocks.test.ts)
│   │   │   │   ├── [constants.ts](./office/src/data/calendar/constants.ts)
│   │   │   │   ├── [events.ts](./office/src/data/calendar/events.ts)
│   │   │   │   ├── [months.ts](./office/src/data/calendar/months.ts)
│   │   │   │   ├── [timeBlocks.ts](./office/src/data/calendar/timeBlocks.ts)
│   │   │   │   └── [years.ts](./office/src/data/calendar/years.ts)
│   │   │   ├── csv/
│   │   │   │   ├── [anime.csv](./office/src/data/csv/anime.csv)
│   │   │   │   ├── [api-protocols.csv](./office/src/data/csv/api-protocols.csv)
│   │   │   │   ├── [api-styles.csv](./office/src/data/csv/api-styles.csv)
│   │   │   │   ├── [apis.csv](./office/src/data/csv/apis.csv)
│   │   │   │   ├── [arts.csv](./office/src/data/csv/arts.csv)
│   │   │   │   ├── [biology.csv](./office/src/data/csv/biology.csv)
│   │   │   │   ├── [books.csv](./office/src/data/csv/books.csv)
│   │   │   │   ├── [bored.csv](./office/src/data/csv/bored.csv)
│   │   │   │   ├── [build-tools.csv](./office/src/data/csv/build-tools.csv)
│   │   │   │   ├── [cars.csv](./office/src/data/csv/cars.csv)
│   │   │   │   ├── [chess-engines.csv](./office/src/data/csv/chess-engines.csv)
│   │   │   │   ├── [chess-players.csv](./office/src/data/csv/chess-players.csv)
│   │   │   │   ├── [chess-titles.csv](./office/src/data/csv/chess-titles.csv)
│   │   │   │   ├── [cities.csv](./office/src/data/csv/cities.csv)
│   │   │   │   ├── [comics.csv](./office/src/data/csv/comics.csv)
│   │   │   │   ├── [commerce.csv](./office/src/data/csv/commerce.csv)
│   │   │   │   ├── [database-hosting.csv](./office/src/data/csv/database-hosting.csv)
│   │   │   │   ├── [degrees.csv](./office/src/data/csv/degrees.csv)
│   │   │   │   ├── [dota.csv](./office/src/data/csv/dota.csv)
│   │   │   │   ├── [e-sports.csv](./office/src/data/csv/e-sports.csv)
│   │   │   │   ├── [fandb-beverages.csv](./office/src/data/csv/fandb-beverages.csv)
│   │   │   │   ├── [fandb-foods.csv](./office/src/data/csv/fandb-foods.csv)
│   │   │   │   ├── [fields-medal.csv](./office/src/data/csv/fields-medal.csv)
│   │   │   │   ├── [football-competitions.csv](./office/src/data/csv/football-competitions.csv)
│   │   │   │   ├── [football.csv](./office/src/data/csv/football.csv)
│   │   │   │   ├── [futsal.csv](./office/src/data/csv/futsal.csv)
│   │   │   │   ├── [game-of-thrones.csv](./office/src/data/csv/game-of-thrones.csv)
│   │   │   │   ├── [games.csv](./office/src/data/csv/games.csv)
│   │   │   │   ├── [grammy-tracks.csv](./office/src/data/csv/grammy-tracks.csv)
│   │   │   │   ├── [grammy.csv](./office/src/data/csv/grammy.csv)
│   │   │   │   ├── [hardwares.csv](./office/src/data/csv/hardwares.csv)
│   │   │   │   ├── [hybrid-frameworks.csv](./office/src/data/csv/hybrid-frameworks.csv)
│   │   │   │   ├── [instruments.csv](./office/src/data/csv/instruments.csv)
│   │   │   │   ├── [languages.csv](./office/src/data/csv/languages.csv)
│   │   │   │   ├── [league-of-legends.csv](./office/src/data/csv/league-of-legends.csv)
│   │   │   │   ├── [literature.csv](./office/src/data/csv/literature.csv)
│   │   │   │   ├── [marathon-distances.csv](./office/src/data/csv/marathon-distances.csv)
│   │   │   │   ├── [marathon-majors.csv](./office/src/data/csv/marathon-majors.csv)
│   │   │   │   ├── [minimalism.csv](./office/src/data/csv/minimalism.csv)
│   │   │   │   ├── [motorcycle.csv](./office/src/data/csv/motorcycle.csv)
│   │   │   │   ├── [motorcycles.csv](./office/src/data/csv/motorcycles.csv)
│   │   │   │   ├── [movies.csv](./office/src/data/csv/movies.csv)
│   │   │   │   ├── [music-artists.csv](./office/src/data/csv/music-artists.csv)
│   │   │   │   ├── [musical.csv](./office/src/data/csv/musical.csv)
│   │   │   │   ├── [native-mobile-styling.csv](./office/src/data/csv/native-mobile-styling.csv)
│   │   │   │   ├── [negative-thoughts.csv](./office/src/data/csv/negative-thoughts.csv)
│   │   │   │   ├── [neuroscience.csv](./office/src/data/csv/neuroscience.csv)
│   │   │   │   ├── [news.csv](./office/src/data/csv/news.csv)
│   │   │   │   ├── [nobel.csv](./office/src/data/csv/nobel.csv)
│   │   │   │   ├── [podcasts.csv](./office/src/data/csv/podcasts.csv)
│   │   │   │   ├── [pub-sub.csv](./office/src/data/csv/pub-sub.csv)
│   │   │   │   ├── [random-research.csv](./office/src/data/csv/random-research.csv)
│   │   │   │   ├── [science-subjects.csv](./office/src/data/csv/science-subjects.csv)
│   │   │   │   ├── [series.csv](./office/src/data/csv/series.csv)
│   │   │   │   ├── [softwares.csv](./office/src/data/csv/softwares.csv)
│   │   │   │   ├── [sports.csv](./office/src/data/csv/sports.csv)
│   │   │   │   ├── [system-design.csv](./office/src/data/csv/system-design.csv)
│   │   │   │   ├── [tennis.csv](./office/src/data/csv/tennis.csv)
│   │   │   │   ├── [typescript-web-sockets.csv](./office/src/data/csv/typescript-web-sockets.csv)
│   │   │   │   ├── [university.csv](./office/src/data/csv/university.csv)
│   │   │   │   ├── [web-frameworks.csv](./office/src/data/csv/web-frameworks.csv)
│   │   │   │   ├── [web-styling.csv](./office/src/data/csv/web-styling.csv)
│   │   │   │   └── [yearly-resolutions.csv](./office/src/data/csv/yearly-resolutions.csv)
│   │   │   ├── md/
│   │   │   │   ├── [cheat-sheet.ts](./office/src/data/md/cheat-sheet.ts)
│   │   │   │   ├── [seed.gen.json](./office/src/data/md/seed.gen.json)
│   │   │   │   └── [seed.ts](./office/src/data/md/seed.ts)
│   │   │   └── tasks/
│   │   │       ├── [models.ts](./office/src/data/tasks/models.ts)
│   │   │       └── [seed.ts](./office/src/data/tasks/seed.ts)
│   │   ├── hooks/
│   │   │   ├── calendar/
│   │   │   ├── csv/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [useCsvState.test.ts](./office/src/hooks/csv/__tests__/useCsvState.test.ts)
│   │   │   │   │   └── [useEditor.test.ts](./office/src/hooks/csv/__tests__/useEditor.test.ts)
│   │   │   │   ├── [useCsvState.ts](./office/src/hooks/csv/useCsvState.ts)
│   │   │   │   └── [useEditor.ts](./office/src/hooks/csv/useEditor.ts)
│   │   │   ├── md/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [useCodeMirror.test.ts](./office/src/hooks/md/__tests__/useCodeMirror.test.ts)
│   │   │   │   │   ├── [useMarkdownRender.test.ts](./office/src/hooks/md/__tests__/useMarkdownRender.test.ts)
│   │   │   │   │   └── [useScrollSync.test.ts](./office/src/hooks/md/__tests__/useScrollSync.test.ts)
│   │   │   │   ├── [useCodeMirror.ts](./office/src/hooks/md/useCodeMirror.ts)
│   │   │   │   ├── [useMarkdownRender.ts](./office/src/hooks/md/useMarkdownRender.ts)
│   │   │   │   └── [useScrollSync.ts](./office/src/hooks/md/useScrollSync.ts)
│   │   │   └── shared/
│   │   │       ├── [useRegisterServiceWorker.ts](./office/src/hooks/shared/useRegisterServiceWorker.ts)
│   │   │       └── [useTheme.ts](./office/src/hooks/shared/useTheme.ts)
│   │   ├── lib/
│   │   │   ├── calendar/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [countdown.test.ts](./office/src/lib/calendar/__tests__/countdown.test.ts)
│   │   │   │   │   ├── [daysBetween.test.ts](./office/src/lib/calendar/__tests__/daysBetween.test.ts)
│   │   │   │   │   └── [fonts.test.ts](./office/src/lib/calendar/__tests__/fonts.test.ts)
│   │   │   │   ├── [countdown.ts](./office/src/lib/calendar/countdown.ts)
│   │   │   │   ├── [daysBetween.ts](./office/src/lib/calendar/daysBetween.ts)
│   │   │   │   └── [fonts.ts](./office/src/lib/calendar/fonts.ts)
│   │   │   ├── csv/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [autofill.test.ts](./office/src/lib/csv/__tests__/autofill.test.ts)
│   │   │   │   │   ├── [columns.test.ts](./office/src/lib/csv/__tests__/columns.test.ts)
│   │   │   │   │   ├── [csv.test.ts](./office/src/lib/csv/__tests__/csv.test.ts)
│   │   │   │   │   ├── [export.test.ts](./office/src/lib/csv/__tests__/export.test.ts)
│   │   │   │   │   ├── [format.test.ts](./office/src/lib/csv/__tests__/format.test.ts)
│   │   │   │   │   ├── [formula.test.ts](./office/src/lib/csv/__tests__/formula.test.ts)
│   │   │   │   │   ├── [grid.test.ts](./office/src/lib/csv/__tests__/grid.test.ts)
│   │   │   │   │   ├── [selection.test.ts](./office/src/lib/csv/__tests__/selection.test.ts)
│   │   │   │   │   ├── [storage.test.ts](./office/src/lib/csv/__tests__/storage.test.ts)
│   │   │   │   │   ├── [workbook.test.ts](./office/src/lib/csv/__tests__/workbook.test.ts)
│   │   │   │   │   └── [xlsx.test.ts](./office/src/lib/csv/__tests__/xlsx.test.ts)
│   │   │   │   ├── [autofill.ts](./office/src/lib/csv/autofill.ts)
│   │   │   │   ├── [columns.ts](./office/src/lib/csv/columns.ts)
│   │   │   │   ├── [csv.ts](./office/src/lib/csv/csv.ts)
│   │   │   │   ├── [export.ts](./office/src/lib/csv/export.ts)
│   │   │   │   ├── [format.ts](./office/src/lib/csv/format.ts)
│   │   │   │   ├── [formula.ts](./office/src/lib/csv/formula.ts)
│   │   │   │   ├── [grid.ts](./office/src/lib/csv/grid.ts)
│   │   │   │   ├── [selection.ts](./office/src/lib/csv/selection.ts)
│   │   │   │   ├── [storage.ts](./office/src/lib/csv/storage.ts)
│   │   │   │   ├── [types.ts](./office/src/lib/csv/types.ts)
│   │   │   │   ├── [workbook.ts](./office/src/lib/csv/workbook.ts)
│   │   │   │   ├── [xlsx.ts](./office/src/lib/csv/xlsx.ts)
│   │   │   │   └── [xml.ts](./office/src/lib/csv/xml.ts)
│   │   │   ├── md/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [braille.test.ts](./office/src/lib/md/__tests__/braille.test.ts)
│   │   │   │   │   ├── [date.test.ts](./office/src/lib/md/__tests__/date.test.ts)
│   │   │   │   │   ├── [export.test.ts](./office/src/lib/md/__tests__/export.test.ts)
│   │   │   │   │   ├── [format.test.ts](./office/src/lib/md/__tests__/format.test.ts)
│   │   │   │   │   ├── [leet.test.ts](./office/src/lib/md/__tests__/leet.test.ts)
│   │   │   │   │   ├── [markdown.test.ts](./office/src/lib/md/__tests__/markdown.test.ts)
│   │   │   │   │   ├── [morse.test.ts](./office/src/lib/md/__tests__/morse.test.ts)
│   │   │   │   │   ├── [slug.test.ts](./office/src/lib/md/__tests__/slug.test.ts)
│   │   │   │   │   ├── [storage.ssr.test.ts](./office/src/lib/md/__tests__/storage.ssr.test.ts)
│   │   │   │   │   ├── [storage.test.ts](./office/src/lib/md/__tests__/storage.test.ts)
│   │   │   │   │   ├── [textCase.test.ts](./office/src/lib/md/__tests__/textCase.test.ts)
│   │   │   │   │   ├── [typoglycemia.test.ts](./office/src/lib/md/__tests__/typoglycemia.test.ts)
│   │   │   │   │   ├── [wikilinks.test.ts](./office/src/lib/md/__tests__/wikilinks.test.ts)
│   │   │   │   │   └── [wordCounter.test.ts](./office/src/lib/md/__tests__/wordCounter.test.ts)
│   │   │   │   ├── [braille.ts](./office/src/lib/md/braille.ts)
│   │   │   │   ├── [date.ts](./office/src/lib/md/date.ts)
│   │   │   │   ├── [export.ts](./office/src/lib/md/export.ts)
│   │   │   │   ├── [format.ts](./office/src/lib/md/format.ts)
│   │   │   │   ├── [leet.ts](./office/src/lib/md/leet.ts)
│   │   │   │   ├── [markdown.ts](./office/src/lib/md/markdown.ts)
│   │   │   │   ├── [morse.ts](./office/src/lib/md/morse.ts)
│   │   │   │   ├── [slug.ts](./office/src/lib/md/slug.ts)
│   │   │   │   ├── [storage.ts](./office/src/lib/md/storage.ts)
│   │   │   │   ├── [textCase.ts](./office/src/lib/md/textCase.ts)
│   │   │   │   ├── [types.ts](./office/src/lib/md/types.ts)
│   │   │   │   ├── [typoglycemia.ts](./office/src/lib/md/typoglycemia.ts)
│   │   │   │   ├── [wikilinks.ts](./office/src/lib/md/wikilinks.ts)
│   │   │   │   └── [wordCounter.ts](./office/src/lib/md/wordCounter.ts)
│   │   │   └── tasks/
│   │   │       ├── __tests__/
│   │   │       │   ├── [auth.test.tsx](./office/src/lib/tasks/__tests__/auth.test.tsx)
│   │   │       │   ├── [collab.test.ts](./office/src/lib/tasks/__tests__/collab.test.ts)
│   │   │       │   ├── [data-provider.test.tsx](./office/src/lib/tasks/__tests__/data-provider.test.tsx)
│   │   │       │   ├── [db.test.ts](./office/src/lib/tasks/__tests__/db.test.ts)
│   │   │       │   ├── [format.test.ts](./office/src/lib/tasks/__tests__/format.test.ts)
│   │   │       │   ├── [toast.test.tsx](./office/src/lib/tasks/__tests__/toast.test.tsx)
│   │   │       │   └── [types.test.ts](./office/src/lib/tasks/__tests__/types.test.ts)
│   │   │       ├── [auth.tsx](./office/src/lib/tasks/auth.tsx)
│   │   │       ├── [collab.ts](./office/src/lib/tasks/collab.ts)
│   │   │       ├── [data-provider.tsx](./office/src/lib/tasks/data-provider.tsx)
│   │   │       ├── [db.ts](./office/src/lib/tasks/db.ts)
│   │   │       ├── [format.ts](./office/src/lib/tasks/format.ts)
│   │   │       ├── [toast.tsx](./office/src/lib/tasks/toast.tsx)
│   │   │       └── [types.ts](./office/src/lib/tasks/types.ts)
│   │   ├── notes/
│   │   │   ├── engineering/
│   │   │   │   ├── [algorithms.md](./office/src/notes/engineering/algorithms.md)
│   │   │   │   ├── [data-structures-and-algorithms.md](./office/src/notes/engineering/data-structures-and-algorithms.md)
│   │   │   │   └── [data-structures.md](./office/src/notes/engineering/data-structures.md)
│   │   │   ├── life/
│   │   │   │   ├── [maslow-hierarchy.md](./office/src/notes/life/maslow-hierarchy.md)
│   │   │   │   ├── [monday-fear.md](./office/src/notes/life/monday-fear.md)
│   │   │   │   ├── [nothing.md](./office/src/notes/life/nothing.md)
│   │   │   │   ├── [sample.md](./office/src/notes/life/sample.md)
│   │   │   │   └── [sports.md](./office/src/notes/life/sports.md)
│   │   │   ├── marketing/
│   │   │   │   └── copy-writer/
│   │   │   │       └── sites/
│   │   │   │           ├── [acquire.md](./office/src/notes/marketing/copy-writer/sites/acquire.md)
│   │   │   │           ├── [hacker-news.md](./office/src/notes/marketing/copy-writer/sites/hacker-news.md)
│   │   │   │           ├── [indie-hackers.md](./office/src/notes/marketing/copy-writer/sites/indie-hackers.md)
│   │   │   │           └── [product-hunt.md](./office/src/notes/marketing/copy-writer/sites/product-hunt.md)
│   │   │   ├── science/
│   │   │   │   └── [brain.md](./office/src/notes/science/brain.md)
│   │   │   ├── [TREE.md](./office/src/notes/TREE.md)
│   │   │   ├── [bored.md](./office/src/notes/bored.md)
│   │   │   ├── [engineering.md](./office/src/notes/engineering.md)
│   │   │   ├── [intro.md](./office/src/notes/intro.md)
│   │   │   ├── [me.md](./office/src/notes/me.md)
│   │   │   ├── [minimalism.md](./office/src/notes/minimalism.md)
│   │   │   └── [resume.md](./office/src/notes/resume.md)
│   │   ├── styles/
│   │   │   ├── [globals.css](./office/src/styles/globals.css)
│   │   │   └── [themes.css](./office/src/styles/themes.css)
│   │   └── test/
│   │       └── [style-mock.js](./office/src/test/style-mock.js)
│   ├── src-tauri/
│   │   ├── capabilities/
│   │   │   └── [default.json](./office/src-tauri/capabilities/default.json)
│   │   ├── icons/
│   │   │   ├── android/
│   │   │   │   ├── mipmap-anydpi-v26/
│   │   │   │   │   └── [ic_launcher.xml](./office/src-tauri/icons/android/mipmap-anydpi-v26/ic_launcher.xml)
│   │   │   │   ├── mipmap-hdpi/
│   │   │   │   │   ├── [ic_launcher.png](./office/src-tauri/icons/android/mipmap-hdpi/ic_launcher.png)
│   │   │   │   │   ├── [ic_launcher_foreground.png](./office/src-tauri/icons/android/mipmap-hdpi/ic_launcher_foreground.png)
│   │   │   │   │   └── [ic_launcher_round.png](./office/src-tauri/icons/android/mipmap-hdpi/ic_launcher_round.png)
│   │   │   │   ├── mipmap-mdpi/
│   │   │   │   │   ├── [ic_launcher.png](./office/src-tauri/icons/android/mipmap-mdpi/ic_launcher.png)
│   │   │   │   │   ├── [ic_launcher_foreground.png](./office/src-tauri/icons/android/mipmap-mdpi/ic_launcher_foreground.png)
│   │   │   │   │   └── [ic_launcher_round.png](./office/src-tauri/icons/android/mipmap-mdpi/ic_launcher_round.png)
│   │   │   │   ├── mipmap-xhdpi/
│   │   │   │   │   ├── [ic_launcher.png](./office/src-tauri/icons/android/mipmap-xhdpi/ic_launcher.png)
│   │   │   │   │   ├── [ic_launcher_foreground.png](./office/src-tauri/icons/android/mipmap-xhdpi/ic_launcher_foreground.png)
│   │   │   │   │   └── [ic_launcher_round.png](./office/src-tauri/icons/android/mipmap-xhdpi/ic_launcher_round.png)
│   │   │   │   ├── mipmap-xxhdpi/
│   │   │   │   │   ├── [ic_launcher.png](./office/src-tauri/icons/android/mipmap-xxhdpi/ic_launcher.png)
│   │   │   │   │   ├── [ic_launcher_foreground.png](./office/src-tauri/icons/android/mipmap-xxhdpi/ic_launcher_foreground.png)
│   │   │   │   │   └── [ic_launcher_round.png](./office/src-tauri/icons/android/mipmap-xxhdpi/ic_launcher_round.png)
│   │   │   │   ├── mipmap-xxxhdpi/
│   │   │   │   │   ├── [ic_launcher.png](./office/src-tauri/icons/android/mipmap-xxxhdpi/ic_launcher.png)
│   │   │   │   │   ├── [ic_launcher_foreground.png](./office/src-tauri/icons/android/mipmap-xxxhdpi/ic_launcher_foreground.png)
│   │   │   │   │   └── [ic_launcher_round.png](./office/src-tauri/icons/android/mipmap-xxxhdpi/ic_launcher_round.png)
│   │   │   │   └── values/
│   │   │   │       └── [ic_launcher_background.xml](./office/src-tauri/icons/android/values/ic_launcher_background.xml)
│   │   │   ├── ios/
│   │   │   │   ├── [AppIcon-20x20@1x.png](./office/src-tauri/icons/ios/AppIcon-20x20@1x.png)
│   │   │   │   ├── [AppIcon-20x20@2x-1.png](./office/src-tauri/icons/ios/AppIcon-20x20@2x-1.png)
│   │   │   │   ├── [AppIcon-20x20@2x.png](./office/src-tauri/icons/ios/AppIcon-20x20@2x.png)
│   │   │   │   ├── [AppIcon-20x20@3x.png](./office/src-tauri/icons/ios/AppIcon-20x20@3x.png)
│   │   │   │   ├── [AppIcon-29x29@1x.png](./office/src-tauri/icons/ios/AppIcon-29x29@1x.png)
│   │   │   │   ├── [AppIcon-29x29@2x-1.png](./office/src-tauri/icons/ios/AppIcon-29x29@2x-1.png)
│   │   │   │   ├── [AppIcon-29x29@2x.png](./office/src-tauri/icons/ios/AppIcon-29x29@2x.png)
│   │   │   │   ├── [AppIcon-29x29@3x.png](./office/src-tauri/icons/ios/AppIcon-29x29@3x.png)
│   │   │   │   ├── [AppIcon-40x40@1x.png](./office/src-tauri/icons/ios/AppIcon-40x40@1x.png)
│   │   │   │   ├── [AppIcon-40x40@2x-1.png](./office/src-tauri/icons/ios/AppIcon-40x40@2x-1.png)
│   │   │   │   ├── [AppIcon-40x40@2x.png](./office/src-tauri/icons/ios/AppIcon-40x40@2x.png)
│   │   │   │   ├── [AppIcon-40x40@3x.png](./office/src-tauri/icons/ios/AppIcon-40x40@3x.png)
│   │   │   │   ├── [AppIcon-512@2x.png](./office/src-tauri/icons/ios/AppIcon-512@2x.png)
│   │   │   │   ├── [AppIcon-60x60@2x.png](./office/src-tauri/icons/ios/AppIcon-60x60@2x.png)
│   │   │   │   ├── [AppIcon-60x60@3x.png](./office/src-tauri/icons/ios/AppIcon-60x60@3x.png)
│   │   │   │   ├── [AppIcon-76x76@1x.png](./office/src-tauri/icons/ios/AppIcon-76x76@1x.png)
│   │   │   │   ├── [AppIcon-76x76@2x.png](./office/src-tauri/icons/ios/AppIcon-76x76@2x.png)
│   │   │   │   └── [AppIcon-83.5x83.5@2x.png](./office/src-tauri/icons/ios/AppIcon-83.5x83.5@2x.png)
│   │   │   ├── [128x128.png](./office/src-tauri/icons/128x128.png)
│   │   │   ├── [128x128@2x.png](./office/src-tauri/icons/128x128@2x.png)
│   │   │   ├── [256x256.png](./office/src-tauri/icons/256x256.png)
│   │   │   ├── [32x32.png](./office/src-tauri/icons/32x32.png)
│   │   │   ├── [64x64.png](./office/src-tauri/icons/64x64.png)
│   │   │   ├── [Square107x107Logo.png](./office/src-tauri/icons/Square107x107Logo.png)
│   │   │   ├── [Square142x142Logo.png](./office/src-tauri/icons/Square142x142Logo.png)
│   │   │   ├── [Square150x150Logo.png](./office/src-tauri/icons/Square150x150Logo.png)
│   │   │   ├── [Square284x284Logo.png](./office/src-tauri/icons/Square284x284Logo.png)
│   │   │   ├── [Square30x30Logo.png](./office/src-tauri/icons/Square30x30Logo.png)
│   │   │   ├── [Square310x310Logo.png](./office/src-tauri/icons/Square310x310Logo.png)
│   │   │   ├── [Square44x44Logo.png](./office/src-tauri/icons/Square44x44Logo.png)
│   │   │   ├── [Square71x71Logo.png](./office/src-tauri/icons/Square71x71Logo.png)
│   │   │   ├── [Square89x89Logo.png](./office/src-tauri/icons/Square89x89Logo.png)
│   │   │   ├── [StoreLogo.png](./office/src-tauri/icons/StoreLogo.png)
│   │   │   ├── [create-icons.sh](./office/src-tauri/icons/create-icons.sh)
│   │   │   ├── [icon.icns](./office/src-tauri/icons/icon.icns)
│   │   │   ├── [icon.ico](./office/src-tauri/icons/icon.ico)
│   │   │   └── [icon.png](./office/src-tauri/icons/icon.png)
│   │   ├── src/
│   │   │   ├── [lib.rs](./office/src-tauri/src/lib.rs)
│   │   │   └── [main.rs](./office/src-tauri/src/main.rs)
│   │   ├── [Cargo.lock](./office/src-tauri/Cargo.lock)
│   │   ├── [Cargo.toml](./office/src-tauri/Cargo.toml)
│   │   ├── [build.rs](./office/src-tauri/build.rs)
│   │   └── [tauri.conf.json](./office/src-tauri/tauri.conf.json)
│   ├── [AGENTS.md](./office/AGENTS.md)
│   ├── [Dockerfile](./office/Dockerfile)
│   ├── [LICENSE](./office/LICENSE)
│   ├── [README.md](./office/README.md)
│   ├── [TREE.md](./office/TREE.md)
│   ├── [docker-compose.yaml](./office/docker-compose.yaml)
│   ├── [eslint.config.mts](./office/eslint.config.mts)
│   ├── [jest.config.ts](./office/jest.config.ts)
│   ├── [jest.setup.ts](./office/jest.setup.ts)
│   ├── [next.config.ts](./office/next.config.ts)
│   ├── [package.json](./office/package.json)
│   ├── [playwright.config.ts](./office/playwright.config.ts)
│   ├── [postcss.config.mjs](./office/postcss.config.mjs)
│   └── [tsconfig.json](./office/tsconfig.json)
├── pdf/
│   ├── docs/
│   │   ├── [ARCHITECTURE.md](./pdf/docs/ARCHITECTURE.md)
│   │   ├── [CONTRIBUTING.md](./pdf/docs/CONTRIBUTING.md)
│   │   ├── [DOWNLOADS.md](./pdf/docs/DOWNLOADS.md)
│   │   ├── [PACKAGING.md](./pdf/docs/PACKAGING.md)
│   │   └── [ROADMAP.md](./pdf/docs/ROADMAP.md)
│   ├── e2e/
│   │   ├── [about.spec.ts](./pdf/e2e/about.spec.ts)
│   │   ├── [downloads.spec.ts](./pdf/e2e/downloads.spec.ts)
│   │   ├── [home.spec.ts](./pdf/e2e/home.spec.ts)
│   │   ├── [navigation.spec.ts](./pdf/e2e/navigation.spec.ts)
│   │   ├── [pdf-compare.spec.ts](./pdf/e2e/pdf-compare.spec.ts)
│   │   ├── [pdf-edit.spec.ts](./pdf/e2e/pdf-edit.spec.ts)
│   │   ├── [pdf-merge.spec.ts](./pdf/e2e/pdf-merge.spec.ts)
│   │   ├── [pdf-viewer.spec.ts](./pdf/e2e/pdf-viewer.spec.ts)
│   │   ├── [profile.spec.ts](./pdf/e2e/profile.spec.ts)
│   │   ├── [settings.spec.ts](./pdf/e2e/settings.spec.ts)
│   │   ├── [version.spec.ts](./pdf/e2e/version.spec.ts)
│   │   └── [view-mode.spec.ts](./pdf/e2e/view-mode.spec.ts)
│   ├── public/
│   │   ├── icons/
│   │   │   ├── [icon-128x128.png](./pdf/public/icons/icon-128x128.png)
│   │   │   ├── [icon-144x144.png](./pdf/public/icons/icon-144x144.png)
│   │   │   ├── [icon-152x152.png](./pdf/public/icons/icon-152x152.png)
│   │   │   ├── [icon-16x16.png](./pdf/public/icons/icon-16x16.png)
│   │   │   ├── [icon-180x180.png](./pdf/public/icons/icon-180x180.png)
│   │   │   ├── [icon-192x192.png](./pdf/public/icons/icon-192x192.png)
│   │   │   ├── [icon-256x256.png](./pdf/public/icons/icon-256x256.png)
│   │   │   ├── [icon-32x32.png](./pdf/public/icons/icon-32x32.png)
│   │   │   ├── [icon-384x384.png](./pdf/public/icons/icon-384x384.png)
│   │   │   ├── [icon-48x48.png](./pdf/public/icons/icon-48x48.png)
│   │   │   ├── [icon-512x512.png](./pdf/public/icons/icon-512x512.png)
│   │   │   ├── [icon-64x64.png](./pdf/public/icons/icon-64x64.png)
│   │   │   ├── [icon-72x72.png](./pdf/public/icons/icon-72x72.png)
│   │   │   ├── [icon-96x96.png](./pdf/public/icons/icon-96x96.png)
│   │   │   └── [icon.svg](./pdf/public/icons/icon.svg)
│   │   ├── [apple-touch-icon.png](./pdf/public/apple-touch-icon.png)
│   │   ├── [favicon.ico](./pdf/public/favicon.ico)
│   │   ├── [manifest.json](./pdf/public/manifest.json)
│   │   ├── [robots.txt](./pdf/public/robots.txt)
│   │   ├── [sitemap.xml](./pdf/public/sitemap.xml)
│   │   └── [sw.js](./pdf/public/sw.js)
│   ├── src/
│   │   ├── app/
│   │   │   ├── (auth)/
│   │   │   │   ├── forget-password/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./pdf/src/app/(auth)/forget-password/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./pdf/src/app/(auth)/forget-password/page.tsx)
│   │   │   │   ├── profile/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./pdf/src/app/(auth)/profile/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./pdf/src/app/(auth)/profile/page.tsx)
│   │   │   │   ├── reset-password/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./pdf/src/app/(auth)/reset-password/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./pdf/src/app/(auth)/reset-password/page.tsx)
│   │   │   │   ├── sign-in/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./pdf/src/app/(auth)/sign-in/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./pdf/src/app/(auth)/sign-in/page.tsx)
│   │   │   │   └── sign-up/
│   │   │   │       ├── __tests__/
│   │   │   │       │   └── [page.test.tsx](./pdf/src/app/(auth)/sign-up/__tests__/page.test.tsx)
│   │   │   │       └── [page.tsx](./pdf/src/app/(auth)/sign-up/page.tsx)
│   │   │   ├── (info)/
│   │   │   │   ├── about/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./pdf/src/app/(info)/about/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./pdf/src/app/(info)/about/page.tsx)
│   │   │   │   ├── downloads/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./pdf/src/app/(info)/downloads/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./pdf/src/app/(info)/downloads/page.tsx)
│   │   │   │   └── version/
│   │   │   │       ├── __tests__/
│   │   │   │       │   └── [page.test.tsx](./pdf/src/app/(info)/version/__tests__/page.test.tsx)
│   │   │   │       └── [page.tsx](./pdf/src/app/(info)/version/page.tsx)
│   │   │   ├── __tests__/
│   │   │   │   ├── [error.test.tsx](./pdf/src/app/__tests__/error.test.tsx)
│   │   │   │   ├── [forbidden.test.tsx](./pdf/src/app/__tests__/forbidden.test.tsx)
│   │   │   │   ├── [global-error.test.tsx](./pdf/src/app/__tests__/global-error.test.tsx)
│   │   │   │   ├── [layout.test.tsx](./pdf/src/app/__tests__/layout.test.tsx)
│   │   │   │   ├── [loading.test.tsx](./pdf/src/app/__tests__/loading.test.tsx)
│   │   │   │   ├── [not-found.test.tsx](./pdf/src/app/__tests__/not-found.test.tsx)
│   │   │   │   ├── [page.test.tsx](./pdf/src/app/__tests__/page.test.tsx)
│   │   │   │   ├── [robots.test.ts](./pdf/src/app/__tests__/robots.test.ts)
│   │   │   │   ├── [template.test.tsx](./pdf/src/app/__tests__/template.test.tsx)
│   │   │   │   └── [unauthorized.test.tsx](./pdf/src/app/__tests__/unauthorized.test.tsx)
│   │   │   ├── pdf/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [page.test.tsx](./pdf/src/app/pdf/__tests__/page.test.tsx)
│   │   │   │   ├── compare/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./pdf/src/app/pdf/compare/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./pdf/src/app/pdf/compare/page.tsx)
│   │   │   │   ├── edit/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./pdf/src/app/pdf/edit/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./pdf/src/app/pdf/edit/page.tsx)
│   │   │   │   ├── merge/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./pdf/src/app/pdf/merge/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./pdf/src/app/pdf/merge/page.tsx)
│   │   │   │   └── [page.tsx](./pdf/src/app/pdf/page.tsx)
│   │   │   ├── settings/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [page.test.tsx](./pdf/src/app/settings/__tests__/page.test.tsx)
│   │   │   │   └── [page.tsx](./pdf/src/app/settings/page.tsx)
│   │   │   ├── tools/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [page.test.tsx](./pdf/src/app/tools/__tests__/page.test.tsx)
│   │   │   │   └── [page.tsx](./pdf/src/app/tools/page.tsx)
│   │   │   ├── [default.tsx](./pdf/src/app/default.tsx)
│   │   │   ├── [error.tsx](./pdf/src/app/error.tsx)
│   │   │   ├── [favicon.ico](./pdf/src/app/favicon.ico)
│   │   │   ├── [forbidden.tsx](./pdf/src/app/forbidden.tsx)
│   │   │   ├── [global-error.tsx](./pdf/src/app/global-error.tsx)
│   │   │   ├── [layout.tsx](./pdf/src/app/layout.tsx)
│   │   │   ├── [loading.tsx](./pdf/src/app/loading.tsx)
│   │   │   ├── [not-found.tsx](./pdf/src/app/not-found.tsx)
│   │   │   ├── [page.tsx](./pdf/src/app/page.tsx)
│   │   │   ├── [robots.ts](./pdf/src/app/robots.ts)
│   │   │   ├── [template.tsx](./pdf/src/app/template.tsx)
│   │   │   └── [unauthorized.tsx](./pdf/src/app/unauthorized.tsx)
│   │   ├── components/
│   │   │   ├── __tests__/
│   │   │   │   ├── [PdfFileUpload.test.tsx](./pdf/src/components/__tests__/PdfFileUpload.test.tsx)
│   │   │   │   └── [SWProvider.test.tsx](./pdf/src/components/__tests__/SWProvider.test.tsx)
│   │   │   ├── atoms/
│   │   │   │   ├── __mocks__/
│   │   │   │   │   └── [PdfFileUpload.tsx](./pdf/src/components/atoms/__mocks__/PdfFileUpload.tsx)
│   │   │   │   └── [PdfFileUpload.tsx](./pdf/src/components/atoms/PdfFileUpload.tsx)
│   │   │   ├── molecules/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [FormFieldsLayer.test.tsx](./pdf/src/components/molecules/__tests__/FormFieldsLayer.test.tsx)
│   │   │   │   │   ├── [PageOrganizer.test.tsx](./pdf/src/components/molecules/__tests__/PageOrganizer.test.tsx)
│   │   │   │   │   ├── [PageView.test.tsx](./pdf/src/components/molecules/__tests__/PageView.test.tsx)
│   │   │   │   │   └── [SignaturePad.test.tsx](./pdf/src/components/molecules/__tests__/SignaturePad.test.tsx)
│   │   │   │   ├── [FormFieldsLayer.tsx](./pdf/src/components/molecules/FormFieldsLayer.tsx)
│   │   │   │   ├── [PageOrganizer.tsx](./pdf/src/components/molecules/PageOrganizer.tsx)
│   │   │   │   ├── [PageView.tsx](./pdf/src/components/molecules/PageView.tsx)
│   │   │   │   ├── [SignaturePad.tsx](./pdf/src/components/molecules/SignaturePad.tsx)
│   │   │   │   └── [ViewerSkeleton.tsx](./pdf/src/components/molecules/ViewerSkeleton.tsx)
│   │   │   ├── organisms/
│   │   │   │   ├── [Header.tsx](./pdf/src/components/organisms/Header.tsx)
│   │   │   │   └── [ToastContainer.tsx](./pdf/src/components/organisms/ToastContainer.tsx)
│   │   │   ├── templates/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [AboutTemplate.test.tsx](./pdf/src/components/templates/__tests__/AboutTemplate.test.tsx)
│   │   │   │   │   ├── [DownloadsTemplate.test.tsx](./pdf/src/components/templates/__tests__/DownloadsTemplate.test.tsx)
│   │   │   │   │   ├── [ErrorTemplate.test.tsx](./pdf/src/components/templates/__tests__/ErrorTemplate.test.tsx)
│   │   │   │   │   └── [VersionTemplate.test.tsx](./pdf/src/components/templates/__tests__/VersionTemplate.test.tsx)
│   │   │   │   ├── [AboutTemplate.tsx](./pdf/src/components/templates/AboutTemplate.tsx)
│   │   │   │   ├── [DownloadsTemplate.tsx](./pdf/src/components/templates/DownloadsTemplate.tsx)
│   │   │   │   ├── [ErrorTemplate.tsx](./pdf/src/components/templates/ErrorTemplate.tsx)
│   │   │   │   └── [VersionTemplate.tsx](./pdf/src/components/templates/VersionTemplate.tsx)
│   │   │   └── tools/
│   │   │       ├── __tests__/
│   │   │       │   ├── [convert-create-tools.test.tsx](./pdf/src/components/tools/__tests__/convert-create-tools.test.tsx)
│   │   │       │   ├── [pdf-canvas-tools.test.tsx](./pdf/src/components/tools/__tests__/pdf-canvas-tools.test.tsx)
│   │   │       │   └── [pdf-operations-tools.test.tsx](./pdf/src/components/tools/__tests__/pdf-operations-tools.test.tsx)
│   │   │       ├── [CreateTextToPdfTool.tsx](./pdf/src/components/tools/CreateTextToPdfTool.tsx)
│   │   │       ├── [CreateUrlToPdfTool.tsx](./pdf/src/components/tools/CreateUrlToPdfTool.tsx)
│   │   │       ├── [EbookConvertTool.tsx](./pdf/src/components/tools/EbookConvertTool.tsx)
│   │   │       ├── [ImagesToPdfTool.tsx](./pdf/src/components/tools/ImagesToPdfTool.tsx)
│   │   │       ├── [PdfAnnotateTool.tsx](./pdf/src/components/tools/PdfAnnotateTool.tsx)
│   │   │       ├── [PdfCompressTool.tsx](./pdf/src/components/tools/PdfCompressTool.tsx)
│   │   │       ├── [PdfCropTool.tsx](./pdf/src/components/tools/PdfCropTool.tsx)
│   │   │       ├── [PdfDeletePagesTool.tsx](./pdf/src/components/tools/PdfDeletePagesTool.tsx)
│   │   │       ├── [PdfEsignTool.tsx](./pdf/src/components/tools/PdfEsignTool.tsx)
│   │   │       ├── [PdfExtractImagesTool.tsx](./pdf/src/components/tools/PdfExtractImagesTool.tsx)
│   │   │       ├── [PdfExtractTextTool.tsx](./pdf/src/components/tools/PdfExtractTextTool.tsx)
│   │   │       ├── [PdfInfoTool.tsx](./pdf/src/components/tools/PdfInfoTool.tsx)
│   │   │       ├── [PdfMergeTool.tsx](./pdf/src/components/tools/PdfMergeTool.tsx)
│   │   │       ├── [PdfMetadataTool.tsx](./pdf/src/components/tools/PdfMetadataTool.tsx)
│   │   │       ├── [PdfOcrTool.tsx](./pdf/src/components/tools/PdfOcrTool.tsx)
│   │   │       ├── [PdfPageNumbersTool.tsx](./pdf/src/components/tools/PdfPageNumbersTool.tsx)
│   │   │       ├── [PdfPlaceholderTool.tsx](./pdf/src/components/tools/PdfPlaceholderTool.tsx)
│   │   │       ├── [PdfRearrangeTool.tsx](./pdf/src/components/tools/PdfRearrangeTool.tsx)
│   │   │       ├── [PdfRedactTool.tsx](./pdf/src/components/tools/PdfRedactTool.tsx)
│   │   │       ├── [PdfRepairTool.tsx](./pdf/src/components/tools/PdfRepairTool.tsx)
│   │   │       ├── [PdfRotateTool.tsx](./pdf/src/components/tools/PdfRotateTool.tsx)
│   │   │       ├── [PdfSecurityTool.tsx](./pdf/src/components/tools/PdfSecurityTool.tsx)
│   │   │       ├── [PdfSplitTool.tsx](./pdf/src/components/tools/PdfSplitTool.tsx)
│   │   │       ├── [PdfToFormatTool.tsx](./pdf/src/components/tools/PdfToFormatTool.tsx)
│   │   │       ├── [PdfToImagesTool.tsx](./pdf/src/components/tools/PdfToImagesTool.tsx)
│   │   │       ├── [PdfTranslateTool.tsx](./pdf/src/components/tools/PdfTranslateTool.tsx)
│   │   │       ├── [PdfWatermarkTool.tsx](./pdf/src/components/tools/PdfWatermarkTool.tsx)
│   │   │       └── [UrlToPdfTool.tsx](./pdf/src/components/tools/UrlToPdfTool.tsx)
│   │   ├── content/
│   │   │   ├── [about.ts](./pdf/src/content/about.ts)
│   │   │   ├── [download.ts](./pdf/src/content/download.ts)
│   │   │   └── [version.ts](./pdf/src/content/version.ts)
│   │   ├── data/
│   │   │   ├── __tests__/
│   │   │   │   ├── [models.test.ts](./pdf/src/data/__tests__/models.test.ts)
│   │   │   │   ├── [pdf-tools.test.ts](./pdf/src/data/__tests__/pdf-tools.test.ts)
│   │   │   │   └── [seed.test.ts](./pdf/src/data/__tests__/seed.test.ts)
│   │   │   ├── [models.ts](./pdf/src/data/models.ts)
│   │   │   ├── [pdf-tools.ts](./pdf/src/data/pdf-tools.ts)
│   │   │   └── [seed.ts](./pdf/src/data/seed.ts)
│   │   ├── hooks/
│   │   │   ├── __tests__/
│   │   │   │   └── [useSWRegister.test.ts](./pdf/src/hooks/__tests__/useSWRegister.test.ts)
│   │   │   └── [useSWRegister.ts](./pdf/src/hooks/useSWRegister.ts)
│   │   ├── lib/
│   │   │   ├── __tests__/
│   │   │   │   ├── [db.test.ts](./pdf/src/lib/__tests__/db.test.ts)
│   │   │   │   └── [pdf-tools.test.ts](./pdf/src/lib/__tests__/pdf-tools.test.ts)
│   │   │   ├── [db.ts](./pdf/src/lib/db.ts)
│   │   │   └── [pdf-tools.ts](./pdf/src/lib/pdf-tools.ts)
│   │   ├── providers/
│   │   │   ├── __tests__/
│   │   │   │   ├── [DataProvider.test.tsx](./pdf/src/providers/__tests__/DataProvider.test.tsx)
│   │   │   │   ├── [Providers.test.tsx](./pdf/src/providers/__tests__/Providers.test.tsx)
│   │   │   │   └── [ToastProvider.test.tsx](./pdf/src/providers/__tests__/ToastProvider.test.tsx)
│   │   │   ├── [DataProvider.tsx](./pdf/src/providers/DataProvider.tsx)
│   │   │   ├── [Providers.tsx](./pdf/src/providers/Providers.tsx)
│   │   │   ├── [SWProvider.tsx](./pdf/src/providers/SWProvider.tsx)
│   │   │   └── [ToastProvider.tsx](./pdf/src/providers/ToastProvider.tsx)
│   │   ├── styles/
│   │   │   ├── [globals.css](./pdf/src/styles/globals.css)
│   │   │   └── [themes.css](./pdf/src/styles/themes.css)
│   │   ├── types/
│   │   │   └── [index.ts](./pdf/src/types/index.ts)
│   │   └── utils/
│   │       ├── __tests__/
│   │       │   └── [format.test.ts](./pdf/src/utils/__tests__/format.test.ts)
│   │       └── [format.ts](./pdf/src/utils/format.ts)
│   ├── src-tauri/
│   │   ├── capabilities/
│   │   │   └── [default.json](./pdf/src-tauri/capabilities/default.json)
│   │   ├── icons/
│   │   │   ├── android/
│   │   │   │   ├── mipmap-anydpi-v26/
│   │   │   │   │   └── [ic_launcher.xml](./pdf/src-tauri/icons/android/mipmap-anydpi-v26/ic_launcher.xml)
│   │   │   │   ├── mipmap-hdpi/
│   │   │   │   │   ├── [ic_launcher.png](./pdf/src-tauri/icons/android/mipmap-hdpi/ic_launcher.png)
│   │   │   │   │   ├── [ic_launcher_foreground.png](./pdf/src-tauri/icons/android/mipmap-hdpi/ic_launcher_foreground.png)
│   │   │   │   │   └── [ic_launcher_round.png](./pdf/src-tauri/icons/android/mipmap-hdpi/ic_launcher_round.png)
│   │   │   │   ├── mipmap-mdpi/
│   │   │   │   │   ├── [ic_launcher.png](./pdf/src-tauri/icons/android/mipmap-mdpi/ic_launcher.png)
│   │   │   │   │   ├── [ic_launcher_foreground.png](./pdf/src-tauri/icons/android/mipmap-mdpi/ic_launcher_foreground.png)
│   │   │   │   │   └── [ic_launcher_round.png](./pdf/src-tauri/icons/android/mipmap-mdpi/ic_launcher_round.png)
│   │   │   │   ├── mipmap-xhdpi/
│   │   │   │   │   ├── [ic_launcher.png](./pdf/src-tauri/icons/android/mipmap-xhdpi/ic_launcher.png)
│   │   │   │   │   ├── [ic_launcher_foreground.png](./pdf/src-tauri/icons/android/mipmap-xhdpi/ic_launcher_foreground.png)
│   │   │   │   │   └── [ic_launcher_round.png](./pdf/src-tauri/icons/android/mipmap-xhdpi/ic_launcher_round.png)
│   │   │   │   ├── mipmap-xxhdpi/
│   │   │   │   │   ├── [ic_launcher.png](./pdf/src-tauri/icons/android/mipmap-xxhdpi/ic_launcher.png)
│   │   │   │   │   ├── [ic_launcher_foreground.png](./pdf/src-tauri/icons/android/mipmap-xxhdpi/ic_launcher_foreground.png)
│   │   │   │   │   └── [ic_launcher_round.png](./pdf/src-tauri/icons/android/mipmap-xxhdpi/ic_launcher_round.png)
│   │   │   │   ├── mipmap-xxxhdpi/
│   │   │   │   │   ├── [ic_launcher.png](./pdf/src-tauri/icons/android/mipmap-xxxhdpi/ic_launcher.png)
│   │   │   │   │   ├── [ic_launcher_foreground.png](./pdf/src-tauri/icons/android/mipmap-xxxhdpi/ic_launcher_foreground.png)
│   │   │   │   │   └── [ic_launcher_round.png](./pdf/src-tauri/icons/android/mipmap-xxxhdpi/ic_launcher_round.png)
│   │   │   │   └── values/
│   │   │   │       └── [ic_launcher_background.xml](./pdf/src-tauri/icons/android/values/ic_launcher_background.xml)
│   │   │   ├── ios/
│   │   │   │   ├── [AppIcon-20x20@1x.png](./pdf/src-tauri/icons/ios/AppIcon-20x20@1x.png)
│   │   │   │   ├── [AppIcon-20x20@2x-1.png](./pdf/src-tauri/icons/ios/AppIcon-20x20@2x-1.png)
│   │   │   │   ├── [AppIcon-20x20@2x.png](./pdf/src-tauri/icons/ios/AppIcon-20x20@2x.png)
│   │   │   │   ├── [AppIcon-20x20@3x.png](./pdf/src-tauri/icons/ios/AppIcon-20x20@3x.png)
│   │   │   │   ├── [AppIcon-29x29@1x.png](./pdf/src-tauri/icons/ios/AppIcon-29x29@1x.png)
│   │   │   │   ├── [AppIcon-29x29@2x-1.png](./pdf/src-tauri/icons/ios/AppIcon-29x29@2x-1.png)
│   │   │   │   ├── [AppIcon-29x29@2x.png](./pdf/src-tauri/icons/ios/AppIcon-29x29@2x.png)
│   │   │   │   ├── [AppIcon-29x29@3x.png](./pdf/src-tauri/icons/ios/AppIcon-29x29@3x.png)
│   │   │   │   ├── [AppIcon-40x40@1x.png](./pdf/src-tauri/icons/ios/AppIcon-40x40@1x.png)
│   │   │   │   ├── [AppIcon-40x40@2x-1.png](./pdf/src-tauri/icons/ios/AppIcon-40x40@2x-1.png)
│   │   │   │   ├── [AppIcon-40x40@2x.png](./pdf/src-tauri/icons/ios/AppIcon-40x40@2x.png)
│   │   │   │   ├── [AppIcon-40x40@3x.png](./pdf/src-tauri/icons/ios/AppIcon-40x40@3x.png)
│   │   │   │   ├── [AppIcon-512@2x.png](./pdf/src-tauri/icons/ios/AppIcon-512@2x.png)
│   │   │   │   ├── [AppIcon-60x60@2x.png](./pdf/src-tauri/icons/ios/AppIcon-60x60@2x.png)
│   │   │   │   ├── [AppIcon-60x60@3x.png](./pdf/src-tauri/icons/ios/AppIcon-60x60@3x.png)
│   │   │   │   ├── [AppIcon-76x76@1x.png](./pdf/src-tauri/icons/ios/AppIcon-76x76@1x.png)
│   │   │   │   ├── [AppIcon-76x76@2x.png](./pdf/src-tauri/icons/ios/AppIcon-76x76@2x.png)
│   │   │   │   └── [AppIcon-83.5x83.5@2x.png](./pdf/src-tauri/icons/ios/AppIcon-83.5x83.5@2x.png)
│   │   │   ├── [128x128.png](./pdf/src-tauri/icons/128x128.png)
│   │   │   ├── [128x128@2x.png](./pdf/src-tauri/icons/128x128@2x.png)
│   │   │   ├── [256x256.png](./pdf/src-tauri/icons/256x256.png)
│   │   │   ├── [32x32.png](./pdf/src-tauri/icons/32x32.png)
│   │   │   ├── [64x64.png](./pdf/src-tauri/icons/64x64.png)
│   │   │   ├── [Square107x107Logo.png](./pdf/src-tauri/icons/Square107x107Logo.png)
│   │   │   ├── [Square142x142Logo.png](./pdf/src-tauri/icons/Square142x142Logo.png)
│   │   │   ├── [Square150x150Logo.png](./pdf/src-tauri/icons/Square150x150Logo.png)
│   │   │   ├── [Square284x284Logo.png](./pdf/src-tauri/icons/Square284x284Logo.png)
│   │   │   ├── [Square30x30Logo.png](./pdf/src-tauri/icons/Square30x30Logo.png)
│   │   │   ├── [Square310x310Logo.png](./pdf/src-tauri/icons/Square310x310Logo.png)
│   │   │   ├── [Square44x44Logo.png](./pdf/src-tauri/icons/Square44x44Logo.png)
│   │   │   ├── [Square71x71Logo.png](./pdf/src-tauri/icons/Square71x71Logo.png)
│   │   │   ├── [Square89x89Logo.png](./pdf/src-tauri/icons/Square89x89Logo.png)
│   │   │   ├── [StoreLogo.png](./pdf/src-tauri/icons/StoreLogo.png)
│   │   │   ├── [create-icons.sh](./pdf/src-tauri/icons/create-icons.sh)
│   │   │   ├── [icon.icns](./pdf/src-tauri/icons/icon.icns)
│   │   │   ├── [icon.ico](./pdf/src-tauri/icons/icon.ico)
│   │   │   └── [icon.png](./pdf/src-tauri/icons/icon.png)
│   │   ├── src/
│   │   │   ├── [lib.rs](./pdf/src-tauri/src/lib.rs)
│   │   │   └── [main.rs](./pdf/src-tauri/src/main.rs)
│   │   ├── [Cargo.lock](./pdf/src-tauri/Cargo.lock)
│   │   ├── [Cargo.toml](./pdf/src-tauri/Cargo.toml)
│   │   ├── [build.rs](./pdf/src-tauri/build.rs)
│   │   └── [tauri.conf.json](./pdf/src-tauri/tauri.conf.json)
│   ├── [AGENTS.md](./pdf/AGENTS.md)
│   ├── [Dockerfile](./pdf/Dockerfile)
│   ├── [LICENSE](./pdf/LICENSE)
│   ├── [README.md](./pdf/README.md)
│   ├── [TREE.md](./pdf/TREE.md)
│   ├── [apple-touch-icon.png](./pdf/apple-touch-icon.png)
│   ├── [docker-compose.yaml](./pdf/docker-compose.yaml)
│   ├── [eslint.config.mts](./pdf/eslint.config.mts)
│   ├── [favicon.ico](./pdf/favicon.ico)
│   ├── [jest.config.ts](./pdf/jest.config.ts)
│   ├── [jest.setup.ts](./pdf/jest.setup.ts)
│   ├── [next.config.ts](./pdf/next.config.ts)
│   ├── [package.json](./pdf/package.json)
│   ├── [playwright.config.ts](./pdf/playwright.config.ts)
│   ├── [postcss.config.mjs](./pdf/postcss.config.mjs)
│   ├── [robots.txt](./pdf/robots.txt)
│   ├── [sitemap.xml](./pdf/sitemap.xml)
│   └── [tsconfig.json](./pdf/tsconfig.json)
├── resume/
│   ├── docs/
│   │   ├── other/
│   │   │   ├── [DATA-MODEL.md](./resume/docs/other/DATA-MODEL.md)
│   │   │   ├── [DEVELOPMENT.md](./resume/docs/other/DEVELOPMENT.md)
│   │   │   ├── [README.md](./resume/docs/other/README.md)
│   │   │   └── [TEMPLATES.md](./resume/docs/other/TEMPLATES.md)
│   │   ├── [ARCHITECTURE.md](./resume/docs/ARCHITECTURE.md)
│   │   ├── [CONTRIBUTING.md](./resume/docs/CONTRIBUTING.md)
│   │   ├── [DOWNLOADS.md](./resume/docs/DOWNLOADS.md)
│   │   └── [ROADMAP.md](./resume/docs/ROADMAP.md)
│   ├── e2e/
│   │   ├── [about.spec.ts](./resume/e2e/about.spec.ts)
│   │   ├── [downloads.spec.ts](./resume/e2e/downloads.spec.ts)
│   │   ├── [editor.spec.ts](./resume/e2e/editor.spec.ts)
│   │   ├── [home.spec.ts](./resume/e2e/home.spec.ts)
│   │   ├── [hydration.spec.ts](./resume/e2e/hydration.spec.ts)
│   │   ├── [navigation.spec.ts](./resume/e2e/navigation.spec.ts)
│   │   ├── [responsive.spec.ts](./resume/e2e/responsive.spec.ts)
│   │   └── [version.spec.ts](./resume/e2e/version.spec.ts)
│   ├── public/
│   │   ├── icons/
│   │   │   ├── [icon-128x128.png](./resume/public/icons/icon-128x128.png)
│   │   │   ├── [icon-144x144.png](./resume/public/icons/icon-144x144.png)
│   │   │   ├── [icon-152x152.png](./resume/public/icons/icon-152x152.png)
│   │   │   ├── [icon-16x16.png](./resume/public/icons/icon-16x16.png)
│   │   │   ├── [icon-180x180.png](./resume/public/icons/icon-180x180.png)
│   │   │   ├── [icon-192x192.png](./resume/public/icons/icon-192x192.png)
│   │   │   ├── [icon-256x256.png](./resume/public/icons/icon-256x256.png)
│   │   │   ├── [icon-32x32.png](./resume/public/icons/icon-32x32.png)
│   │   │   ├── [icon-384x384.png](./resume/public/icons/icon-384x384.png)
│   │   │   ├── [icon-48x48.png](./resume/public/icons/icon-48x48.png)
│   │   │   ├── [icon-512x512.png](./resume/public/icons/icon-512x512.png)
│   │   │   ├── [icon-64x64.png](./resume/public/icons/icon-64x64.png)
│   │   │   ├── [icon-72x72.png](./resume/public/icons/icon-72x72.png)
│   │   │   ├── [icon-96x96.png](./resume/public/icons/icon-96x96.png)
│   │   │   └── [icon.svg](./resume/public/icons/icon.svg)
│   │   ├── [apple-touch-icon.png](./resume/public/apple-touch-icon.png)
│   │   ├── [favicon.ico](./resume/public/favicon.ico)
│   │   ├── [manifest.json](./resume/public/manifest.json)
│   │   ├── [resume.schema.json](./resume/public/resume.schema.json)
│   │   ├── [robots.txt](./resume/public/robots.txt)
│   │   ├── [sitemap.xml](./resume/public/sitemap.xml)
│   │   └── [sw.js](./resume/public/sw.js)
│   ├── src/
│   │   ├── app/
│   │   │   ├── (auth)/
│   │   │   │   ├── forget-password/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./resume/src/app/(auth)/forget-password/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./resume/src/app/(auth)/forget-password/page.tsx)
│   │   │   │   ├── profile/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./resume/src/app/(auth)/profile/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./resume/src/app/(auth)/profile/page.tsx)
│   │   │   │   ├── reset-password/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./resume/src/app/(auth)/reset-password/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./resume/src/app/(auth)/reset-password/page.tsx)
│   │   │   │   ├── sign-in/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./resume/src/app/(auth)/sign-in/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./resume/src/app/(auth)/sign-in/page.tsx)
│   │   │   │   └── sign-up/
│   │   │   │       ├── __tests__/
│   │   │   │       │   └── [page.test.tsx](./resume/src/app/(auth)/sign-up/__tests__/page.test.tsx)
│   │   │   │       └── [page.tsx](./resume/src/app/(auth)/sign-up/page.tsx)
│   │   │   ├── (info)/
│   │   │   │   ├── about/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./resume/src/app/(info)/about/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./resume/src/app/(info)/about/page.tsx)
│   │   │   │   ├── downloads/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./resume/src/app/(info)/downloads/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./resume/src/app/(info)/downloads/page.tsx)
│   │   │   │   └── version/
│   │   │   │       ├── __tests__/
│   │   │   │       │   └── [page.test.tsx](./resume/src/app/(info)/version/__tests__/page.test.tsx)
│   │   │   │       └── [page.tsx](./resume/src/app/(info)/version/page.tsx)
│   │   │   ├── __tests__/
│   │   │   │   ├── [error.test.tsx](./resume/src/app/__tests__/error.test.tsx)
│   │   │   │   ├── [forbidden.test.tsx](./resume/src/app/__tests__/forbidden.test.tsx)
│   │   │   │   ├── [global-error.test.tsx](./resume/src/app/__tests__/global-error.test.tsx)
│   │   │   │   ├── [layout.test.tsx](./resume/src/app/__tests__/layout.test.tsx)
│   │   │   │   ├── [loading.test.tsx](./resume/src/app/__tests__/loading.test.tsx)
│   │   │   │   ├── [not-found.test.tsx](./resume/src/app/__tests__/not-found.test.tsx)
│   │   │   │   ├── [page.test.tsx](./resume/src/app/__tests__/page.test.tsx)
│   │   │   │   ├── [robots.test.ts](./resume/src/app/__tests__/robots.test.ts)
│   │   │   │   ├── [template.test.tsx](./resume/src/app/__tests__/template.test.tsx)
│   │   │   │   └── [unauthorized.test.tsx](./resume/src/app/__tests__/unauthorized.test.tsx)
│   │   │   ├── [default.tsx](./resume/src/app/default.tsx)
│   │   │   ├── [error.tsx](./resume/src/app/error.tsx)
│   │   │   ├── [favicon.ico](./resume/src/app/favicon.ico)
│   │   │   ├── [forbidden.tsx](./resume/src/app/forbidden.tsx)
│   │   │   ├── [global-error.tsx](./resume/src/app/global-error.tsx)
│   │   │   ├── [layout.tsx](./resume/src/app/layout.tsx)
│   │   │   ├── [loading.tsx](./resume/src/app/loading.tsx)
│   │   │   ├── [not-found.tsx](./resume/src/app/not-found.tsx)
│   │   │   ├── [page.tsx](./resume/src/app/page.tsx)
│   │   │   ├── [robots.ts](./resume/src/app/robots.ts)
│   │   │   ├── [template.tsx](./resume/src/app/template.tsx)
│   │   │   └── [unauthorized.tsx](./resume/src/app/unauthorized.tsx)
│   │   ├── components/
│   │   │   ├── atoms/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [BulletList.test.tsx](./resume/src/components/atoms/__tests__/BulletList.test.tsx)
│   │   │   │   │   ├── [ContactList.test.tsx](./resume/src/components/atoms/__tests__/ContactList.test.tsx)
│   │   │   │   │   ├── [HeaderRow.test.tsx](./resume/src/components/atoms/__tests__/HeaderRow.test.tsx)
│   │   │   │   │   ├── [Section.test.tsx](./resume/src/components/atoms/__tests__/Section.test.tsx)
│   │   │   │   │   ├── [TextBlock.test.tsx](./resume/src/components/atoms/__tests__/TextBlock.test.tsx)
│   │   │   │   │   ├── [ThemeToggle.test.tsx](./resume/src/components/atoms/__tests__/ThemeToggle.test.tsx)
│   │   │   │   │   └── [WebTag.test.tsx](./resume/src/components/atoms/__tests__/WebTag.test.tsx)
│   │   │   │   ├── [BulletList.tsx](./resume/src/components/atoms/BulletList.tsx)
│   │   │   │   ├── [ContactList.tsx](./resume/src/components/atoms/ContactList.tsx)
│   │   │   │   ├── [Field.tsx](./resume/src/components/atoms/Field.tsx)
│   │   │   │   ├── [HeaderRow.tsx](./resume/src/components/atoms/HeaderRow.tsx)
│   │   │   │   ├── [ListItemCard.tsx](./resume/src/components/atoms/ListItemCard.tsx)
│   │   │   │   ├── [Section.tsx](./resume/src/components/atoms/Section.tsx)
│   │   │   │   ├── [TextBlock.tsx](./resume/src/components/atoms/TextBlock.tsx)
│   │   │   │   ├── [ThemeToggle.tsx](./resume/src/components/atoms/ThemeToggle.tsx)
│   │   │   │   └── [WebTag.tsx](./resume/src/components/atoms/WebTag.tsx)
│   │   │   ├── molecules/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [CertificationsForm.test.tsx](./resume/src/components/molecules/__tests__/CertificationsForm.test.tsx)
│   │   │   │   │   ├── [EducationForm.test.tsx](./resume/src/components/molecules/__tests__/EducationForm.test.tsx)
│   │   │   │   │   ├── [ExperienceForm.test.tsx](./resume/src/components/molecules/__tests__/ExperienceForm.test.tsx)
│   │   │   │   │   ├── [LanguagesForm.test.tsx](./resume/src/components/molecules/__tests__/LanguagesForm.test.tsx)
│   │   │   │   │   ├── [PersonalForm.test.tsx](./resume/src/components/molecules/__tests__/PersonalForm.test.tsx)
│   │   │   │   │   ├── [ProjectForm.test.tsx](./resume/src/components/molecules/__tests__/ProjectForm.test.tsx)
│   │   │   │   │   ├── [SkillsForm.test.tsx](./resume/src/components/molecules/__tests__/SkillsForm.test.tsx)
│   │   │   │   │   └── [SortableList.test.tsx](./resume/src/components/molecules/__tests__/SortableList.test.tsx)
│   │   │   │   ├── [CertificationsForm.tsx](./resume/src/components/molecules/CertificationsForm.tsx)
│   │   │   │   ├── [EducationForm.tsx](./resume/src/components/molecules/EducationForm.tsx)
│   │   │   │   ├── [ExperienceForm.tsx](./resume/src/components/molecules/ExperienceForm.tsx)
│   │   │   │   ├── [InterestsForm.tsx](./resume/src/components/molecules/InterestsForm.tsx)
│   │   │   │   ├── [LanguagesForm.tsx](./resume/src/components/molecules/LanguagesForm.tsx)
│   │   │   │   ├── [PersonalForm.tsx](./resume/src/components/molecules/PersonalForm.tsx)
│   │   │   │   ├── [ProjectForm.tsx](./resume/src/components/molecules/ProjectForm.tsx)
│   │   │   │   ├── [SkillsForm.tsx](./resume/src/components/molecules/SkillsForm.tsx)
│   │   │   │   ├── [SortableList.tsx](./resume/src/components/molecules/SortableList.tsx)
│   │   │   │   ├── [SummaryForm.tsx](./resume/src/components/molecules/SummaryForm.tsx)
│   │   │   │   ├── [TemplateThumbnail.tsx](./resume/src/components/molecules/TemplateThumbnail.tsx)
│   │   │   │   └── [ZoomControls.tsx](./resume/src/components/molecules/ZoomControls.tsx)
│   │   │   ├── organisms/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [DataPanel.test.tsx](./resume/src/components/organisms/__tests__/DataPanel.test.tsx)
│   │   │   │   │   ├── [EditorPanel.test.tsx](./resume/src/components/organisms/__tests__/EditorPanel.test.tsx)
│   │   │   │   │   ├── [PreviewToolbar.test.tsx](./resume/src/components/organisms/__tests__/PreviewToolbar.test.tsx)
│   │   │   │   │   ├── [ProfileSwitcher.test.tsx](./resume/src/components/organisms/__tests__/ProfileSwitcher.test.tsx)
│   │   │   │   │   ├── [TemplatePicker.test.tsx](./resume/src/components/organisms/__tests__/TemplatePicker.test.tsx)
│   │   │   │   │   └── [templateFilters.test.ts](./resume/src/components/organisms/__tests__/templateFilters.test.ts)
│   │   │   │   ├── [DataPanel.tsx](./resume/src/components/organisms/DataPanel.tsx)
│   │   │   │   ├── [EditorPanel.tsx](./resume/src/components/organisms/EditorPanel.tsx)
│   │   │   │   ├── [Header.tsx](./resume/src/components/organisms/Header.tsx)
│   │   │   │   ├── [PreviewStage.tsx](./resume/src/components/organisms/PreviewStage.tsx)
│   │   │   │   ├── [PreviewToolbar.tsx](./resume/src/components/organisms/PreviewToolbar.tsx)
│   │   │   │   ├── [ProfileSwitcher.tsx](./resume/src/components/organisms/ProfileSwitcher.tsx)
│   │   │   │   ├── [ResumeSheet.tsx](./resume/src/components/organisms/ResumeSheet.tsx)
│   │   │   │   ├── [TemplatePicker.tsx](./resume/src/components/organisms/TemplatePicker.tsx)
│   │   │   │   └── [templateFilters.ts](./resume/src/components/organisms/templateFilters.ts)
│   │   │   └── templates/
│   │   │       ├── __tests__/
│   │   │       │   ├── [AboutTemplate.test.tsx](./resume/src/components/templates/__tests__/AboutTemplate.test.tsx)
│   │   │       │   ├── [DownloadsTemplate.test.tsx](./resume/src/components/templates/__tests__/DownloadsTemplate.test.tsx)
│   │   │       │   ├── [ErrorTemplate.test.tsx](./resume/src/components/templates/__tests__/ErrorTemplate.test.tsx)
│   │   │       │   ├── [PreviewPanel.test.tsx](./resume/src/components/templates/__tests__/PreviewPanel.test.tsx)
│   │   │       │   └── [VersionTemplate.test.tsx](./resume/src/components/templates/__tests__/VersionTemplate.test.tsx)
│   │   │       ├── resume/
│   │   │       │   ├── __tests__/
│   │   │       │   │   └── [registry.test.ts](./resume/src/components/templates/resume/__tests__/registry.test.ts)
│   │   │       │   ├── bands/
│   │   │       │   │   ├── __tests__/
│   │   │       │   │   │   ├── [EmberTemplate.test.tsx](./resume/src/components/templates/resume/bands/__tests__/EmberTemplate.test.tsx)
│   │   │       │   │   │   ├── [ExecutiveTemplate.test.tsx](./resume/src/components/templates/resume/bands/__tests__/ExecutiveTemplate.test.tsx)
│   │   │       │   │   │   ├── [KineticTemplate.test.tsx](./resume/src/components/templates/resume/bands/__tests__/KineticTemplate.test.tsx)
│   │   │       │   │   │   ├── [MeadowTemplate.test.tsx](./resume/src/components/templates/resume/bands/__tests__/MeadowTemplate.test.tsx)
│   │   │       │   │   │   ├── [SterlingTemplate.test.tsx](./resume/src/components/templates/resume/bands/__tests__/SterlingTemplate.test.tsx)
│   │   │       │   │   │   ├── [SummitTemplate.test.tsx](./resume/src/components/templates/resume/bands/__tests__/SummitTemplate.test.tsx)
│   │   │       │   │   │   ├── [TimberTemplate.test.tsx](./resume/src/components/templates/resume/bands/__tests__/TimberTemplate.test.tsx)
│   │   │       │   │   │   └── [WaveTemplate.test.tsx](./resume/src/components/templates/resume/bands/__tests__/WaveTemplate.test.tsx)
│   │   │       │   │   ├── [EmberTemplate.tsx](./resume/src/components/templates/resume/bands/EmberTemplate.tsx)
│   │   │       │   │   ├── [ExecutiveTemplate.tsx](./resume/src/components/templates/resume/bands/ExecutiveTemplate.tsx)
│   │   │       │   │   ├── [KineticTemplate.tsx](./resume/src/components/templates/resume/bands/KineticTemplate.tsx)
│   │   │       │   │   ├── [MeadowTemplate.tsx](./resume/src/components/templates/resume/bands/MeadowTemplate.tsx)
│   │   │       │   │   ├── [SterlingTemplate.tsx](./resume/src/components/templates/resume/bands/SterlingTemplate.tsx)
│   │   │       │   │   ├── [SummitTemplate.tsx](./resume/src/components/templates/resume/bands/SummitTemplate.tsx)
│   │   │       │   │   ├── [TimberTemplate.tsx](./resume/src/components/templates/resume/bands/TimberTemplate.tsx)
│   │   │       │   │   └── [WaveTemplate.tsx](./resume/src/components/templates/resume/bands/WaveTemplate.tsx)
│   │   │       │   ├── classic/
│   │   │       │   │   ├── __tests__/
│   │   │       │   │   │   ├── [CeremonyTemplate.test.tsx](./resume/src/components/templates/resume/classic/__tests__/CeremonyTemplate.test.tsx)
│   │   │       │   │   │   ├── [ClassicTemplate.test.tsx](./resume/src/components/templates/resume/classic/__tests__/ClassicTemplate.test.tsx)
│   │   │       │   │   │   ├── [ElegantTemplate.test.tsx](./resume/src/components/templates/resume/classic/__tests__/ElegantTemplate.test.tsx)
│   │   │       │   │   │   ├── [InkwellTemplate.test.tsx](./resume/src/components/templates/resume/classic/__tests__/InkwellTemplate.test.tsx)
│   │   │       │   │   │   ├── [PinnacleTemplate.test.tsx](./resume/src/components/templates/resume/classic/__tests__/PinnacleTemplate.test.tsx)
│   │   │       │   │   │   ├── [TerraTemplate.test.tsx](./resume/src/components/templates/resume/classic/__tests__/TerraTemplate.test.tsx)
│   │   │       │   │   │   ├── [TopazTemplate.test.tsx](./resume/src/components/templates/resume/classic/__tests__/TopazTemplate.test.tsx)
│   │   │       │   │   │   └── [VintageTemplate.test.tsx](./resume/src/components/templates/resume/classic/__tests__/VintageTemplate.test.tsx)
│   │   │       │   │   ├── [CeremonyTemplate.tsx](./resume/src/components/templates/resume/classic/CeremonyTemplate.tsx)
│   │   │       │   │   ├── [ClassicTemplate.tsx](./resume/src/components/templates/resume/classic/ClassicTemplate.tsx)
│   │   │       │   │   ├── [ElegantTemplate.tsx](./resume/src/components/templates/resume/classic/ElegantTemplate.tsx)
│   │   │       │   │   ├── [InkwellTemplate.tsx](./resume/src/components/templates/resume/classic/InkwellTemplate.tsx)
│   │   │       │   │   ├── [PinnacleTemplate.tsx](./resume/src/components/templates/resume/classic/PinnacleTemplate.tsx)
│   │   │       │   │   ├── [TerraTemplate.tsx](./resume/src/components/templates/resume/classic/TerraTemplate.tsx)
│   │   │       │   │   ├── [TopazTemplate.tsx](./resume/src/components/templates/resume/classic/TopazTemplate.tsx)
│   │   │       │   │   └── [VintageTemplate.tsx](./resume/src/components/templates/resume/classic/VintageTemplate.tsx)
│   │   │       │   ├── colorful/
│   │   │       │   │   ├── __tests__/
│   │   │       │   │   │   ├── [AmberTemplate.test.tsx](./resume/src/components/templates/resume/colorful/__tests__/AmberTemplate.test.tsx)
│   │   │       │   │   │   ├── [AzureTemplate.test.tsx](./resume/src/components/templates/resume/colorful/__tests__/AzureTemplate.test.tsx)
│   │   │       │   │   │   ├── [GlowTemplate.test.tsx](./resume/src/components/templates/resume/colorful/__tests__/GlowTemplate.test.tsx)
│   │   │       │   │   │   ├── [PrismTemplate.test.tsx](./resume/src/components/templates/resume/colorful/__tests__/PrismTemplate.test.tsx)
│   │   │       │   │   │   ├── [PulseTemplate.test.tsx](./resume/src/components/templates/resume/colorful/__tests__/PulseTemplate.test.tsx)
│   │   │       │   │   │   ├── [SaffronTemplate.test.tsx](./resume/src/components/templates/resume/colorful/__tests__/SaffronTemplate.test.tsx)
│   │   │       │   │   │   ├── [SolTemplate.test.tsx](./resume/src/components/templates/resume/colorful/__tests__/SolTemplate.test.tsx)
│   │   │       │   │   │   └── [SolsticeTemplate.test.tsx](./resume/src/components/templates/resume/colorful/__tests__/SolsticeTemplate.test.tsx)
│   │   │       │   │   ├── [AmberTemplate.tsx](./resume/src/components/templates/resume/colorful/AmberTemplate.tsx)
│   │   │       │   │   ├── [AzureTemplate.tsx](./resume/src/components/templates/resume/colorful/AzureTemplate.tsx)
│   │   │       │   │   ├── [GlowTemplate.tsx](./resume/src/components/templates/resume/colorful/GlowTemplate.tsx)
│   │   │       │   │   ├── [PrismTemplate.tsx](./resume/src/components/templates/resume/colorful/PrismTemplate.tsx)
│   │   │       │   │   ├── [PulseTemplate.tsx](./resume/src/components/templates/resume/colorful/PulseTemplate.tsx)
│   │   │       │   │   ├── [SaffronTemplate.tsx](./resume/src/components/templates/resume/colorful/SaffronTemplate.tsx)
│   │   │       │   │   ├── [SolTemplate.tsx](./resume/src/components/templates/resume/colorful/SolTemplate.tsx)
│   │   │       │   │   └── [SolsticeTemplate.tsx](./resume/src/components/templates/resume/colorful/SolsticeTemplate.tsx)
│   │   │       │   ├── minimal/
│   │   │       │   │   ├── __tests__/
│   │   │       │   │   │   ├── [AlignTemplate.test.tsx](./resume/src/components/templates/resume/minimal/__tests__/AlignTemplate.test.tsx)
│   │   │       │   │   │   ├── [CompactTemplate.test.tsx](./resume/src/components/templates/resume/minimal/__tests__/CompactTemplate.test.tsx)
│   │   │       │   │   │   ├── [LatticeTemplate.test.tsx](./resume/src/components/templates/resume/minimal/__tests__/LatticeTemplate.test.tsx)
│   │   │       │   │   │   ├── [MinimalTemplate.test.tsx](./resume/src/components/templates/resume/minimal/__tests__/MinimalTemplate.test.tsx)
│   │   │       │   │   │   ├── [QuartzTemplate.test.tsx](./resume/src/components/templates/resume/minimal/__tests__/QuartzTemplate.test.tsx)
│   │   │       │   │   │   ├── [SimpleTemplate.test.tsx](./resume/src/components/templates/resume/minimal/__tests__/SimpleTemplate.test.tsx)
│   │   │       │   │   │   ├── [SlateTemplate.test.tsx](./resume/src/components/templates/resume/minimal/__tests__/SlateTemplate.test.tsx)
│   │   │       │   │   │   └── [ZenTemplate.test.tsx](./resume/src/components/templates/resume/minimal/__tests__/ZenTemplate.test.tsx)
│   │   │       │   │   ├── [AlignTemplate.tsx](./resume/src/components/templates/resume/minimal/AlignTemplate.tsx)
│   │   │       │   │   ├── [CompactTemplate.tsx](./resume/src/components/templates/resume/minimal/CompactTemplate.tsx)
│   │   │       │   │   ├── [LatticeTemplate.tsx](./resume/src/components/templates/resume/minimal/LatticeTemplate.tsx)
│   │   │       │   │   ├── [MinimalTemplate.tsx](./resume/src/components/templates/resume/minimal/MinimalTemplate.tsx)
│   │   │       │   │   ├── [QuartzTemplate.tsx](./resume/src/components/templates/resume/minimal/QuartzTemplate.tsx)
│   │   │       │   │   ├── [SimpleTemplate.tsx](./resume/src/components/templates/resume/minimal/SimpleTemplate.tsx)
│   │   │       │   │   ├── [SlateTemplate.tsx](./resume/src/components/templates/resume/minimal/SlateTemplate.tsx)
│   │   │       │   │   └── [ZenTemplate.tsx](./resume/src/components/templates/resume/minimal/ZenTemplate.tsx)
│   │   │       │   ├── natural/
│   │   │       │   │   ├── __tests__/
│   │   │       │   │   │   ├── [FloraTemplate.test.tsx](./resume/src/components/templates/resume/natural/__tests__/FloraTemplate.test.tsx)
│   │   │       │   │   │   ├── [GroveTemplate.test.tsx](./resume/src/components/templates/resume/natural/__tests__/GroveTemplate.test.tsx)
│   │   │       │   │   │   ├── [NectarTemplate.test.tsx](./resume/src/components/templates/resume/natural/__tests__/NectarTemplate.test.tsx)
│   │   │       │   │   │   ├── [OasisTemplate.test.tsx](./resume/src/components/templates/resume/natural/__tests__/OasisTemplate.test.tsx)
│   │   │       │   │   │   ├── [PeaksTemplate.test.tsx](./resume/src/components/templates/resume/natural/__tests__/PeaksTemplate.test.tsx)
│   │   │       │   │   │   ├── [PineTemplate.test.tsx](./resume/src/components/templates/resume/natural/__tests__/PineTemplate.test.tsx)
│   │   │       │   │   │   ├── [RidgeTemplate.test.tsx](./resume/src/components/templates/resume/natural/__tests__/RidgeTemplate.test.tsx)
│   │   │       │   │   │   └── [TideTemplate.test.tsx](./resume/src/components/templates/resume/natural/__tests__/TideTemplate.test.tsx)
│   │   │       │   │   ├── [FloraTemplate.tsx](./resume/src/components/templates/resume/natural/FloraTemplate.tsx)
│   │   │       │   │   ├── [GroveTemplate.tsx](./resume/src/components/templates/resume/natural/GroveTemplate.tsx)
│   │   │       │   │   ├── [NectarTemplate.tsx](./resume/src/components/templates/resume/natural/NectarTemplate.tsx)
│   │   │       │   │   ├── [OasisTemplate.tsx](./resume/src/components/templates/resume/natural/OasisTemplate.tsx)
│   │   │       │   │   ├── [PeaksTemplate.tsx](./resume/src/components/templates/resume/natural/PeaksTemplate.tsx)
│   │   │       │   │   ├── [PineTemplate.tsx](./resume/src/components/templates/resume/natural/PineTemplate.tsx)
│   │   │       │   │   ├── [RidgeTemplate.tsx](./resume/src/components/templates/resume/natural/RidgeTemplate.tsx)
│   │   │       │   │   └── [TideTemplate.tsx](./resume/src/components/templates/resume/natural/TideTemplate.tsx)
│   │   │       │   ├── sidebar/
│   │   │       │   │   ├── __tests__/
│   │   │       │   │   │   ├── [AuroraTemplate.test.tsx](./resume/src/components/templates/resume/sidebar/__tests__/AuroraTemplate.test.tsx)
│   │   │       │   │   │   ├── [BeaconTemplate.test.tsx](./resume/src/components/templates/resume/sidebar/__tests__/BeaconTemplate.test.tsx)
│   │   │       │   │   │   ├── [DuskTemplate.test.tsx](./resume/src/components/templates/resume/sidebar/__tests__/DuskTemplate.test.tsx)
│   │   │       │   │   │   ├── [HarborTemplate.test.tsx](./resume/src/components/templates/resume/sidebar/__tests__/HarborTemplate.test.tsx)
│   │   │       │   │   │   ├── [IrisTemplate.test.tsx](./resume/src/components/templates/resume/sidebar/__tests__/IrisTemplate.test.tsx)
│   │   │       │   │   │   ├── [ModernTemplate.test.tsx](./resume/src/components/templates/resume/sidebar/__tests__/ModernTemplate.test.tsx)
│   │   │       │   │   │   ├── [NovaTemplate.test.tsx](./resume/src/components/templates/resume/sidebar/__tests__/NovaTemplate.test.tsx)
│   │   │       │   │   │   └── [WillowTemplate.test.tsx](./resume/src/components/templates/resume/sidebar/__tests__/WillowTemplate.test.tsx)
│   │   │       │   │   ├── [AuroraTemplate.tsx](./resume/src/components/templates/resume/sidebar/AuroraTemplate.tsx)
│   │   │       │   │   ├── [BeaconTemplate.tsx](./resume/src/components/templates/resume/sidebar/BeaconTemplate.tsx)
│   │   │       │   │   ├── [DuskTemplate.tsx](./resume/src/components/templates/resume/sidebar/DuskTemplate.tsx)
│   │   │       │   │   ├── [HarborTemplate.tsx](./resume/src/components/templates/resume/sidebar/HarborTemplate.tsx)
│   │   │       │   │   ├── [IrisTemplate.tsx](./resume/src/components/templates/resume/sidebar/IrisTemplate.tsx)
│   │   │       │   │   ├── [ModernTemplate.tsx](./resume/src/components/templates/resume/sidebar/ModernTemplate.tsx)
│   │   │       │   │   ├── [NovaTemplate.tsx](./resume/src/components/templates/resume/sidebar/NovaTemplate.tsx)
│   │   │       │   │   └── [WillowTemplate.tsx](./resume/src/components/templates/resume/sidebar/WillowTemplate.tsx)
│   │   │       │   ├── soft/
│   │   │       │   │   ├── __tests__/
│   │   │       │   │   │   ├── [BreezeTemplate.test.tsx](./resume/src/components/templates/resume/soft/__tests__/BreezeTemplate.test.tsx)
│   │   │       │   │   │   ├── [CanvasTemplate.test.tsx](./resume/src/components/templates/resume/soft/__tests__/CanvasTemplate.test.tsx)
│   │   │       │   │   │   ├── [CopperTemplate.test.tsx](./resume/src/components/templates/resume/soft/__tests__/CopperTemplate.test.tsx)
│   │   │       │   │   │   ├── [CoralTemplate.test.tsx](./resume/src/components/templates/resume/soft/__tests__/CoralTemplate.test.tsx)
│   │   │       │   │   │   ├── [MarbleTemplate.test.tsx](./resume/src/components/templates/resume/soft/__tests__/MarbleTemplate.test.tsx)
│   │   │       │   │   │   ├── [OpalTemplate.test.tsx](./resume/src/components/templates/resume/soft/__tests__/OpalTemplate.test.tsx)
│   │   │       │   │   │   ├── [RoseTemplate.test.tsx](./resume/src/components/templates/resume/soft/__tests__/RoseTemplate.test.tsx)
│   │   │       │   │   │   └── [SherbetTemplate.test.tsx](./resume/src/components/templates/resume/soft/__tests__/SherbetTemplate.test.tsx)
│   │   │       │   │   ├── [BreezeTemplate.tsx](./resume/src/components/templates/resume/soft/BreezeTemplate.tsx)
│   │   │       │   │   ├── [CanvasTemplate.tsx](./resume/src/components/templates/resume/soft/CanvasTemplate.tsx)
│   │   │       │   │   ├── [CopperTemplate.tsx](./resume/src/components/templates/resume/soft/CopperTemplate.tsx)
│   │   │       │   │   ├── [CoralTemplate.tsx](./resume/src/components/templates/resume/soft/CoralTemplate.tsx)
│   │   │       │   │   ├── [MarbleTemplate.tsx](./resume/src/components/templates/resume/soft/MarbleTemplate.tsx)
│   │   │       │   │   ├── [OpalTemplate.tsx](./resume/src/components/templates/resume/soft/OpalTemplate.tsx)
│   │   │       │   │   ├── [RoseTemplate.tsx](./resume/src/components/templates/resume/soft/RoseTemplate.tsx)
│   │   │       │   │   └── [SherbetTemplate.tsx](./resume/src/components/templates/resume/soft/SherbetTemplate.tsx)
│   │   │       │   ├── specialty/
│   │   │       │   │   ├── __tests__/
│   │   │       │   │   │   ├── [AcademicTemplate.test.tsx](./resume/src/components/templates/resume/specialty/__tests__/AcademicTemplate.test.tsx)
│   │   │       │   │   │   ├── [BoldTemplate.test.tsx](./resume/src/components/templates/resume/specialty/__tests__/BoldTemplate.test.tsx)
│   │   │       │   │   │   ├── [CreativeTemplate.test.tsx](./resume/src/components/templates/resume/specialty/__tests__/CreativeTemplate.test.tsx)
│   │   │       │   │   │   ├── [MuseTemplate.test.tsx](./resume/src/components/templates/resume/specialty/__tests__/MuseTemplate.test.tsx)
│   │   │       │   │   │   ├── [OrbitTemplate.test.tsx](./resume/src/components/templates/resume/specialty/__tests__/OrbitTemplate.test.tsx)
│   │   │       │   │   │   ├── [ProfessionalTemplate.test.tsx](./resume/src/components/templates/resume/specialty/__tests__/ProfessionalTemplate.test.tsx)
│   │   │       │   │   │   ├── [SierraTemplate.test.tsx](./resume/src/components/templates/resume/specialty/__tests__/SierraTemplate.test.tsx)
│   │   │       │   │   │   └── [TechnicalTemplate.test.tsx](./resume/src/components/templates/resume/specialty/__tests__/TechnicalTemplate.test.tsx)
│   │   │       │   │   ├── [AcademicTemplate.tsx](./resume/src/components/templates/resume/specialty/AcademicTemplate.tsx)
│   │   │       │   │   ├── [BoldTemplate.tsx](./resume/src/components/templates/resume/specialty/BoldTemplate.tsx)
│   │   │       │   │   ├── [CreativeTemplate.tsx](./resume/src/components/templates/resume/specialty/CreativeTemplate.tsx)
│   │   │       │   │   ├── [MuseTemplate.tsx](./resume/src/components/templates/resume/specialty/MuseTemplate.tsx)
│   │   │       │   │   ├── [OrbitTemplate.tsx](./resume/src/components/templates/resume/specialty/OrbitTemplate.tsx)
│   │   │       │   │   ├── [ProfessionalTemplate.tsx](./resume/src/components/templates/resume/specialty/ProfessionalTemplate.tsx)
│   │   │       │   │   ├── [SierraTemplate.tsx](./resume/src/components/templates/resume/specialty/SierraTemplate.tsx)
│   │   │       │   │   └── [TechnicalTemplate.tsx](./resume/src/components/templates/resume/specialty/TechnicalTemplate.tsx)
│   │   │       │   ├── [index.ts](./resume/src/components/templates/resume/index.ts)
│   │   │       │   └── [types.ts](./resume/src/components/templates/resume/types.ts)
│   │   │       ├── [AboutTemplate.tsx](./resume/src/components/templates/AboutTemplate.tsx)
│   │   │       ├── [DownloadsTemplate.tsx](./resume/src/components/templates/DownloadsTemplate.tsx)
│   │   │       ├── [ErrorTemplate.tsx](./resume/src/components/templates/ErrorTemplate.tsx)
│   │   │       ├── [PreviewPanel.tsx](./resume/src/components/templates/PreviewPanel.tsx)
│   │   │       └── [VersionTemplate.tsx](./resume/src/components/templates/VersionTemplate.tsx)
│   │   ├── content/
│   │   │   ├── [about.ts](./resume/src/content/about.ts)
│   │   │   ├── [download.ts](./resume/src/content/download.ts)
│   │   │   └── [version.ts](./resume/src/content/version.ts)
│   │   ├── data/
│   │   │   ├── __tests__/
│   │   │   │   ├── [examples.test.ts](./resume/src/data/__tests__/examples.test.ts)
│   │   │   │   ├── [paper.test.ts](./resume/src/data/__tests__/paper.test.ts)
│   │   │   │   └── [seed.test.ts](./resume/src/data/__tests__/seed.test.ts)
│   │   │   ├── [examples.ts](./resume/src/data/examples.ts)
│   │   │   ├── [paper.ts](./resume/src/data/paper.ts)
│   │   │   └── [seed.ts](./resume/src/data/seed.ts)
│   │   ├── hooks/
│   │   │   ├── __tests__/
│   │   │   │   ├── [useHistory.test.ts](./resume/src/hooks/__tests__/useHistory.test.ts)
│   │   │   │   ├── [useKeyboardShortcuts.test.ts](./resume/src/hooks/__tests__/useKeyboardShortcuts.test.ts)
│   │   │   │   ├── [useLocalStorage.test.ts](./resume/src/hooks/__tests__/useLocalStorage.test.ts)
│   │   │   │   ├── [useResumeProfiles.test.ts](./resume/src/hooks/__tests__/useResumeProfiles.test.ts)
│   │   │   │   ├── [useSWRegister.test.ts](./resume/src/hooks/__tests__/useSWRegister.test.ts)
│   │   │   │   └── [useTheme.test.ts](./resume/src/hooks/__tests__/useTheme.test.ts)
│   │   │   ├── [useHistory.ts](./resume/src/hooks/useHistory.ts)
│   │   │   ├── [useKeyboardShortcuts.ts](./resume/src/hooks/useKeyboardShortcuts.ts)
│   │   │   ├── [useLocalStorage.ts](./resume/src/hooks/useLocalStorage.ts)
│   │   │   ├── [useOverflowDetect.ts](./resume/src/hooks/useOverflowDetect.ts)
│   │   │   ├── [usePreviewScale.ts](./resume/src/hooks/usePreviewScale.ts)
│   │   │   ├── [useResumeProfiles.ts](./resume/src/hooks/useResumeProfiles.ts)
│   │   │   ├── [useSWRegister.ts](./resume/src/hooks/useSWRegister.ts)
│   │   │   └── [useTheme.ts](./resume/src/hooks/useTheme.ts)
│   │   ├── providers/
│   │   │   ├── __tests__/
│   │   │   │   └── [SWProvider.test.tsx](./resume/src/providers/__tests__/SWProvider.test.tsx)
│   │   │   └── [SWProvider.tsx](./resume/src/providers/SWProvider.tsx)
│   │   ├── routes/
│   │   │   ├── __tests__/
│   │   │   │   └── [ErrorPage.test.tsx](./resume/src/routes/__tests__/ErrorPage.test.tsx)
│   │   │   └── [ErrorPage.tsx](./resume/src/routes/ErrorPage.tsx)
│   │   ├── styles/
│   │   │   ├── [globals.css](./resume/src/styles/globals.css)
│   │   │   └── [themes.css](./resume/src/styles/themes.css)
│   │   ├── types/
│   │   │   └── [resume.ts](./resume/src/types/resume.ts)
│   │   └── utils/
│   │       ├── __tests__/
│   │       │   ├── [contact.test.ts](./resume/src/utils/__tests__/contact.test.ts)
│   │       │   ├── [count.test.ts](./resume/src/utils/__tests__/count.test.ts)
│   │       │   ├── [export.test.ts](./resume/src/utils/__tests__/export.test.ts)
│   │       │   ├── [fit.test.ts](./resume/src/utils/__tests__/fit.test.ts)
│   │       │   ├── [id.test.ts](./resume/src/utils/__tests__/id.test.ts)
│   │       │   ├── [io.test.ts](./resume/src/utils/__tests__/io.test.ts)
│   │       │   └── [text.test.ts](./resume/src/utils/__tests__/text.test.ts)
│   │       ├── [contact.ts](./resume/src/utils/contact.ts)
│   │       ├── [count.ts](./resume/src/utils/count.ts)
│   │       ├── [export.ts](./resume/src/utils/export.ts)
│   │       ├── [fit.ts](./resume/src/utils/fit.ts)
│   │       ├── [id.ts](./resume/src/utils/id.ts)
│   │       ├── [io.ts](./resume/src/utils/io.ts)
│   │       └── [text.ts](./resume/src/utils/text.ts)
│   ├── src-tauri/
│   │   ├── capabilities/
│   │   │   └── [default.json](./resume/src-tauri/capabilities/default.json)
│   │   ├── icons/
│   │   │   ├── android/
│   │   │   │   ├── mipmap-anydpi-v26/
│   │   │   │   │   └── [ic_launcher.xml](./resume/src-tauri/icons/android/mipmap-anydpi-v26/ic_launcher.xml)
│   │   │   │   ├── mipmap-hdpi/
│   │   │   │   │   ├── [ic_launcher.png](./resume/src-tauri/icons/android/mipmap-hdpi/ic_launcher.png)
│   │   │   │   │   ├── [ic_launcher_foreground.png](./resume/src-tauri/icons/android/mipmap-hdpi/ic_launcher_foreground.png)
│   │   │   │   │   └── [ic_launcher_round.png](./resume/src-tauri/icons/android/mipmap-hdpi/ic_launcher_round.png)
│   │   │   │   ├── mipmap-mdpi/
│   │   │   │   │   ├── [ic_launcher.png](./resume/src-tauri/icons/android/mipmap-mdpi/ic_launcher.png)
│   │   │   │   │   ├── [ic_launcher_foreground.png](./resume/src-tauri/icons/android/mipmap-mdpi/ic_launcher_foreground.png)
│   │   │   │   │   └── [ic_launcher_round.png](./resume/src-tauri/icons/android/mipmap-mdpi/ic_launcher_round.png)
│   │   │   │   ├── mipmap-xhdpi/
│   │   │   │   │   ├── [ic_launcher.png](./resume/src-tauri/icons/android/mipmap-xhdpi/ic_launcher.png)
│   │   │   │   │   ├── [ic_launcher_foreground.png](./resume/src-tauri/icons/android/mipmap-xhdpi/ic_launcher_foreground.png)
│   │   │   │   │   └── [ic_launcher_round.png](./resume/src-tauri/icons/android/mipmap-xhdpi/ic_launcher_round.png)
│   │   │   │   ├── mipmap-xxhdpi/
│   │   │   │   │   ├── [ic_launcher.png](./resume/src-tauri/icons/android/mipmap-xxhdpi/ic_launcher.png)
│   │   │   │   │   ├── [ic_launcher_foreground.png](./resume/src-tauri/icons/android/mipmap-xxhdpi/ic_launcher_foreground.png)
│   │   │   │   │   └── [ic_launcher_round.png](./resume/src-tauri/icons/android/mipmap-xxhdpi/ic_launcher_round.png)
│   │   │   │   ├── mipmap-xxxhdpi/
│   │   │   │   │   ├── [ic_launcher.png](./resume/src-tauri/icons/android/mipmap-xxxhdpi/ic_launcher.png)
│   │   │   │   │   ├── [ic_launcher_foreground.png](./resume/src-tauri/icons/android/mipmap-xxxhdpi/ic_launcher_foreground.png)
│   │   │   │   │   └── [ic_launcher_round.png](./resume/src-tauri/icons/android/mipmap-xxxhdpi/ic_launcher_round.png)
│   │   │   │   └── values/
│   │   │   │       └── [ic_launcher_background.xml](./resume/src-tauri/icons/android/values/ic_launcher_background.xml)
│   │   │   ├── ios/
│   │   │   │   ├── [AppIcon-20x20@1x.png](./resume/src-tauri/icons/ios/AppIcon-20x20@1x.png)
│   │   │   │   ├── [AppIcon-20x20@2x-1.png](./resume/src-tauri/icons/ios/AppIcon-20x20@2x-1.png)
│   │   │   │   ├── [AppIcon-20x20@2x.png](./resume/src-tauri/icons/ios/AppIcon-20x20@2x.png)
│   │   │   │   ├── [AppIcon-20x20@3x.png](./resume/src-tauri/icons/ios/AppIcon-20x20@3x.png)
│   │   │   │   ├── [AppIcon-29x29@1x.png](./resume/src-tauri/icons/ios/AppIcon-29x29@1x.png)
│   │   │   │   ├── [AppIcon-29x29@2x-1.png](./resume/src-tauri/icons/ios/AppIcon-29x29@2x-1.png)
│   │   │   │   ├── [AppIcon-29x29@2x.png](./resume/src-tauri/icons/ios/AppIcon-29x29@2x.png)
│   │   │   │   ├── [AppIcon-29x29@3x.png](./resume/src-tauri/icons/ios/AppIcon-29x29@3x.png)
│   │   │   │   ├── [AppIcon-40x40@1x.png](./resume/src-tauri/icons/ios/AppIcon-40x40@1x.png)
│   │   │   │   ├── [AppIcon-40x40@2x-1.png](./resume/src-tauri/icons/ios/AppIcon-40x40@2x-1.png)
│   │   │   │   ├── [AppIcon-40x40@2x.png](./resume/src-tauri/icons/ios/AppIcon-40x40@2x.png)
│   │   │   │   ├── [AppIcon-40x40@3x.png](./resume/src-tauri/icons/ios/AppIcon-40x40@3x.png)
│   │   │   │   ├── [AppIcon-512@2x.png](./resume/src-tauri/icons/ios/AppIcon-512@2x.png)
│   │   │   │   ├── [AppIcon-60x60@2x.png](./resume/src-tauri/icons/ios/AppIcon-60x60@2x.png)
│   │   │   │   ├── [AppIcon-60x60@3x.png](./resume/src-tauri/icons/ios/AppIcon-60x60@3x.png)
│   │   │   │   ├── [AppIcon-76x76@1x.png](./resume/src-tauri/icons/ios/AppIcon-76x76@1x.png)
│   │   │   │   ├── [AppIcon-76x76@2x.png](./resume/src-tauri/icons/ios/AppIcon-76x76@2x.png)
│   │   │   │   └── [AppIcon-83.5x83.5@2x.png](./resume/src-tauri/icons/ios/AppIcon-83.5x83.5@2x.png)
│   │   │   ├── [128x128.png](./resume/src-tauri/icons/128x128.png)
│   │   │   ├── [128x128@2x.png](./resume/src-tauri/icons/128x128@2x.png)
│   │   │   ├── [256x256.png](./resume/src-tauri/icons/256x256.png)
│   │   │   ├── [32x32.png](./resume/src-tauri/icons/32x32.png)
│   │   │   ├── [64x64.png](./resume/src-tauri/icons/64x64.png)
│   │   │   ├── [Square107x107Logo.png](./resume/src-tauri/icons/Square107x107Logo.png)
│   │   │   ├── [Square142x142Logo.png](./resume/src-tauri/icons/Square142x142Logo.png)
│   │   │   ├── [Square150x150Logo.png](./resume/src-tauri/icons/Square150x150Logo.png)
│   │   │   ├── [Square284x284Logo.png](./resume/src-tauri/icons/Square284x284Logo.png)
│   │   │   ├── [Square30x30Logo.png](./resume/src-tauri/icons/Square30x30Logo.png)
│   │   │   ├── [Square310x310Logo.png](./resume/src-tauri/icons/Square310x310Logo.png)
│   │   │   ├── [Square44x44Logo.png](./resume/src-tauri/icons/Square44x44Logo.png)
│   │   │   ├── [Square71x71Logo.png](./resume/src-tauri/icons/Square71x71Logo.png)
│   │   │   ├── [Square89x89Logo.png](./resume/src-tauri/icons/Square89x89Logo.png)
│   │   │   ├── [StoreLogo.png](./resume/src-tauri/icons/StoreLogo.png)
│   │   │   ├── [create-icons.sh](./resume/src-tauri/icons/create-icons.sh)
│   │   │   ├── [icon.icns](./resume/src-tauri/icons/icon.icns)
│   │   │   ├── [icon.ico](./resume/src-tauri/icons/icon.ico)
│   │   │   └── [icon.png](./resume/src-tauri/icons/icon.png)
│   │   ├── src/
│   │   │   ├── [lib.rs](./resume/src-tauri/src/lib.rs)
│   │   │   └── [main.rs](./resume/src-tauri/src/main.rs)
│   │   ├── [Cargo.lock](./resume/src-tauri/Cargo.lock)
│   │   ├── [Cargo.toml](./resume/src-tauri/Cargo.toml)
│   │   ├── [build.rs](./resume/src-tauri/build.rs)
│   │   └── [tauri.conf.json](./resume/src-tauri/tauri.conf.json)
│   ├── [AGENTS.md](./resume/AGENTS.md)
│   ├── [Dockerfile](./resume/Dockerfile)
│   ├── [LICENSE](./resume/LICENSE)
│   ├── [README.md](./resume/README.md)
│   ├── [docker-compose.yaml](./resume/docker-compose.yaml)
│   ├── [eslint.config.mts](./resume/eslint.config.mts)
│   ├── [jest.config.ts](./resume/jest.config.ts)
│   ├── [jest.setup.ts](./resume/jest.setup.ts)
│   ├── [next.config.ts](./resume/next.config.ts)
│   ├── [package.json](./resume/package.json)
│   ├── [playwright.config.ts](./resume/playwright.config.ts)
│   ├── [postcss.config.mjs](./resume/postcss.config.mjs)
│   └── [tsconfig.json](./resume/tsconfig.json)
├── [README.md](./README.md)
└── [TREE.md](./TREE.md)
```

376 directories, 1414 files
