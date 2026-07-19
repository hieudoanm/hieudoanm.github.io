# TREE

```text
├── brainbow/
│   ├── docs/
│   │   ├── [ARCHITECTURE.md](./brainbow/docs/ARCHITECTURE.md)
│   │   ├── [CONTRIBUTING.md](./brainbow/docs/CONTRIBUTING.md)
│   │   ├── [DOWNLOADS.md](./brainbow/docs/DOWNLOADS.md)
│   │   ├── [PACKAGING.md](./brainbow/docs/PACKAGING.md)
│   │   └── [ROADMAP.md](./brainbow/docs/ROADMAP.md)
│   ├── e2e/
│   │   ├── screenshots/
│   │   │   ├── [about.png](./brainbow/e2e/screenshots/about.png)
│   │   │   ├── [downloads.png](./brainbow/e2e/screenshots/downloads.png)
│   │   │   └── [version.png](./brainbow/e2e/screenshots/version.png)
│   │   ├── [about.spec.ts](./brainbow/e2e/about.spec.ts)
│   │   ├── [downloads.spec.ts](./brainbow/e2e/downloads.spec.ts)
│   │   ├── [history.spec.ts](./brainbow/e2e/history.spec.ts)
│   │   ├── [home.spec.ts](./brainbow/e2e/home.spec.ts)
│   │   ├── [version.spec.ts](./brainbow/e2e/version.spec.ts)
│   │   ├── [viewer.spec.ts](./brainbow/e2e/viewer.spec.ts)
│   │   └── [webviewer.spec.ts](./brainbow/e2e/webviewer.spec.ts)
│   ├── public/
│   │   ├── icons/
│   │   │   ├── [icon-128x128.png](./brainbow/public/icons/icon-128x128.png)
│   │   │   ├── [icon-144x144.png](./brainbow/public/icons/icon-144x144.png)
│   │   │   ├── [icon-152x152.png](./brainbow/public/icons/icon-152x152.png)
│   │   │   ├── [icon-16x16.png](./brainbow/public/icons/icon-16x16.png)
│   │   │   ├── [icon-180x180.png](./brainbow/public/icons/icon-180x180.png)
│   │   │   ├── [icon-192x192.png](./brainbow/public/icons/icon-192x192.png)
│   │   │   ├── [icon-256x256.png](./brainbow/public/icons/icon-256x256.png)
│   │   │   ├── [icon-32x32.png](./brainbow/public/icons/icon-32x32.png)
│   │   │   ├── [icon-384x384.png](./brainbow/public/icons/icon-384x384.png)
│   │   │   ├── [icon-48x48.png](./brainbow/public/icons/icon-48x48.png)
│   │   │   ├── [icon-512x512.png](./brainbow/public/icons/icon-512x512.png)
│   │   │   ├── [icon-64x64.png](./brainbow/public/icons/icon-64x64.png)
│   │   │   ├── [icon-72x72.png](./brainbow/public/icons/icon-72x72.png)
│   │   │   ├── [icon-96x96.png](./brainbow/public/icons/icon-96x96.png)
│   │   │   └── [icon.svg](./brainbow/public/icons/icon.svg)
│   │   ├── [apple-touch-icon.png](./brainbow/public/apple-touch-icon.png)
│   │   ├── [favicon.ico](./brainbow/public/favicon.ico)
│   │   ├── [manifest.json](./brainbow/public/manifest.json)
│   │   ├── [robots.txt](./brainbow/public/robots.txt)
│   │   ├── [sitemap.xml](./brainbow/public/sitemap.xml)
│   │   └── [sw.js](./brainbow/public/sw.js)
│   ├── src/
│   │   ├── app/
│   │   │   ├── (auth)/
│   │   │   │   ├── forget-password/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./brainbow/src/app/(auth)/forget-password/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./brainbow/src/app/(auth)/forget-password/page.tsx)
│   │   │   │   ├── profile/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./brainbow/src/app/(auth)/profile/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./brainbow/src/app/(auth)/profile/page.tsx)
│   │   │   │   ├── reset-password/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./brainbow/src/app/(auth)/reset-password/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./brainbow/src/app/(auth)/reset-password/page.tsx)
│   │   │   │   ├── sign-in/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./brainbow/src/app/(auth)/sign-in/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./brainbow/src/app/(auth)/sign-in/page.tsx)
│   │   │   │   └── sign-up/
│   │   │   │       ├── __tests__/
│   │   │   │       │   └── [page.test.tsx](./brainbow/src/app/(auth)/sign-up/__tests__/page.test.tsx)
│   │   │   │       └── [page.tsx](./brainbow/src/app/(auth)/sign-up/page.tsx)
│   │   │   ├── (info)/
│   │   │   │   ├── about/
│   │   │   │   │   └── [page.tsx](./brainbow/src/app/(info)/about/page.tsx)
│   │   │   │   ├── downloads/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./brainbow/src/app/(info)/downloads/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./brainbow/src/app/(info)/downloads/page.tsx)
│   │   │   │   └── version/
│   │   │   │       └── [page.tsx](./brainbow/src/app/(info)/version/page.tsx)
│   │   │   ├── __tests__/
│   │   │   │   ├── [error.test.tsx](./brainbow/src/app/__tests__/error.test.tsx)
│   │   │   │   ├── [forbidden.test.tsx](./brainbow/src/app/__tests__/forbidden.test.tsx)
│   │   │   │   ├── [global-error.test.tsx](./brainbow/src/app/__tests__/global-error.test.tsx)
│   │   │   │   ├── [layout.test.tsx](./brainbow/src/app/__tests__/layout.test.tsx)
│   │   │   │   ├── [loading.test.tsx](./brainbow/src/app/__tests__/loading.test.tsx)
│   │   │   │   ├── [not-found.test.tsx](./brainbow/src/app/__tests__/not-found.test.tsx)
│   │   │   │   ├── [page.test.tsx](./brainbow/src/app/__tests__/page.test.tsx)
│   │   │   │   ├── [robots.test.ts](./brainbow/src/app/__tests__/robots.test.ts)
│   │   │   │   ├── [template.test.tsx](./brainbow/src/app/__tests__/template.test.tsx)
│   │   │   │   └── [unauthorized.test.tsx](./brainbow/src/app/__tests__/unauthorized.test.tsx)
│   │   │   ├── [default.tsx](./brainbow/src/app/default.tsx)
│   │   │   ├── [error.tsx](./brainbow/src/app/error.tsx)
│   │   │   ├── [favicon.ico](./brainbow/src/app/favicon.ico)
│   │   │   ├── [forbidden.tsx](./brainbow/src/app/forbidden.tsx)
│   │   │   ├── [global-error.tsx](./brainbow/src/app/global-error.tsx)
│   │   │   ├── [layout.tsx](./brainbow/src/app/layout.tsx)
│   │   │   ├── [loading.tsx](./brainbow/src/app/loading.tsx)
│   │   │   ├── [not-found.tsx](./brainbow/src/app/not-found.tsx)
│   │   │   ├── [page.tsx](./brainbow/src/app/page.tsx)
│   │   │   ├── [robots.ts](./brainbow/src/app/robots.ts)
│   │   │   ├── [template.tsx](./brainbow/src/app/template.tsx)
│   │   │   └── [unauthorized.tsx](./brainbow/src/app/unauthorized.tsx)
│   │   ├── components/
│   │   │   ├── atoms/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [Badge.test.tsx](./brainbow/src/components/atoms/__tests__/Badge.test.tsx)
│   │   │   │   │   ├── [Button.test.tsx](./brainbow/src/components/atoms/__tests__/Button.test.tsx)
│   │   │   │   │   ├── [Slider.test.tsx](./brainbow/src/components/atoms/__tests__/Slider.test.tsx)
│   │   │   │   │   └── [Toggle.test.tsx](./brainbow/src/components/atoms/__tests__/Toggle.test.tsx)
│   │   │   │   ├── [Badge.tsx](./brainbow/src/components/atoms/Badge.tsx)
│   │   │   │   ├── [Button.tsx](./brainbow/src/components/atoms/Button.tsx)
│   │   │   │   ├── [OfflineBadge.tsx](./brainbow/src/components/atoms/OfflineBadge.tsx)
│   │   │   │   ├── [Slider.tsx](./brainbow/src/components/atoms/Slider.tsx)
│   │   │   │   ├── [Toggle.tsx](./brainbow/src/components/atoms/Toggle.tsx)
│   │   │   │   └── [Toolbar.tsx](./brainbow/src/components/atoms/Toolbar.tsx)
│   │   │   ├── molecules/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [AnalysisPanel.test.tsx](./brainbow/src/components/molecules/__tests__/AnalysisPanel.test.tsx)
│   │   │   │   │   ├── [CalibrationInput.test.tsx](./brainbow/src/components/molecules/__tests__/CalibrationInput.test.tsx)
│   │   │   │   │   ├── [ChannelControl.test.tsx](./brainbow/src/components/molecules/__tests__/ChannelControl.test.tsx)
│   │   │   │   │   ├── [ChannelHistogram.test.tsx](./brainbow/src/components/molecules/__tests__/ChannelHistogram.test.tsx)
│   │   │   │   │   ├── [CompareControls.test.tsx](./brainbow/src/components/molecules/__tests__/CompareControls.test.tsx)
│   │   │   │   │   ├── [EmptyState.test.tsx](./brainbow/src/components/molecules/__tests__/EmptyState.test.tsx)
│   │   │   │   │   ├── [GuideControls.test.tsx](./brainbow/src/components/molecules/__tests__/GuideControls.test.tsx)
│   │   │   │   │   ├── [ImageToolbar.test.tsx](./brainbow/src/components/molecules/__tests__/ImageToolbar.test.tsx)
│   │   │   │   │   ├── [LayerPanel.test.tsx](./brainbow/src/components/molecules/__tests__/LayerPanel.test.tsx)
│   │   │   │   │   ├── [Minimap.test.tsx](./brainbow/src/components/molecules/__tests__/Minimap.test.tsx)
│   │   │   │   │   ├── [ToolPalette.test.tsx](./brainbow/src/components/molecules/__tests__/ToolPalette.test.tsx)
│   │   │   │   │   └── [historyModal.test.tsx](./brainbow/src/components/molecules/__tests__/historyModal.test.tsx)
│   │   │   │   ├── [AnalysisPanel.tsx](./brainbow/src/components/molecules/AnalysisPanel.tsx)
│   │   │   │   ├── [CalibrationInput.tsx](./brainbow/src/components/molecules/CalibrationInput.tsx)
│   │   │   │   ├── [ChannelControl.tsx](./brainbow/src/components/molecules/ChannelControl.tsx)
│   │   │   │   ├── [ChannelHistogram.tsx](./brainbow/src/components/molecules/ChannelHistogram.tsx)
│   │   │   │   ├── [CompareControls.tsx](./brainbow/src/components/molecules/CompareControls.tsx)
│   │   │   │   ├── [ComparePane.tsx](./brainbow/src/components/molecules/ComparePane.tsx)
│   │   │   │   ├── [EmptyState.tsx](./brainbow/src/components/molecules/EmptyState.tsx)
│   │   │   │   ├── [GuideControls.tsx](./brainbow/src/components/molecules/GuideControls.tsx)
│   │   │   │   ├── [HistoryModal.tsx](./brainbow/src/components/molecules/HistoryModal.tsx)
│   │   │   │   ├── [ImageToolbar.tsx](./brainbow/src/components/molecules/ImageToolbar.tsx)
│   │   │   │   ├── [LayerPanel.tsx](./brainbow/src/components/molecules/LayerPanel.tsx)
│   │   │   │   ├── [Minimap.tsx](./brainbow/src/components/molecules/Minimap.tsx)
│   │   │   │   ├── [ReportModal.tsx](./brainbow/src/components/molecules/ReportModal.tsx)
│   │   │   │   ├── [SliceNavigator.tsx](./brainbow/src/components/molecules/SliceNavigator.tsx)
│   │   │   │   └── [ToolPalette.tsx](./brainbow/src/components/molecules/ToolPalette.tsx)
│   │   │   ├── organisms/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [ChannelList.test.tsx](./brainbow/src/components/organisms/__tests__/ChannelList.test.tsx)
│   │   │   │   │   ├── [ViewerCanvas.test.tsx](./brainbow/src/components/organisms/__tests__/ViewerCanvas.test.tsx)
│   │   │   │   │   └── [canvas.test.tsx](./brainbow/src/components/organisms/__tests__/canvas.test.tsx)
│   │   │   │   ├── [AnnotatorCanvas.tsx](./brainbow/src/components/organisms/AnnotatorCanvas.tsx)
│   │   │   │   ├── [ChannelList.tsx](./brainbow/src/components/organisms/ChannelList.tsx)
│   │   │   │   ├── [Header.tsx](./brainbow/src/components/organisms/Header.tsx)
│   │   │   │   ├── [ViewerCanvas.tsx](./brainbow/src/components/organisms/ViewerCanvas.tsx)
│   │   │   │   └── [ViewerSidebar.tsx](./brainbow/src/components/organisms/ViewerSidebar.tsx)
│   │   │   └── templates/
│   │   │       ├── __tests__/
│   │   │       │   ├── [AboutTemplate.test.tsx](./brainbow/src/components/templates/__tests__/AboutTemplate.test.tsx)
│   │   │       │   ├── [DownloadsTemplate.test.tsx](./brainbow/src/components/templates/__tests__/DownloadsTemplate.test.tsx)
│   │   │       │   ├── [ErrorTemplate.test.tsx](./brainbow/src/components/templates/__tests__/ErrorTemplate.test.tsx)
│   │   │       │   ├── [HomeTemplate.test.tsx](./brainbow/src/components/templates/__tests__/HomeTemplate.test.tsx)
│   │   │       │   ├── [VersionTemplate.test.tsx](./brainbow/src/components/templates/__tests__/VersionTemplate.test.tsx)
│   │   │       │   └── [ViewerTemplate.test.tsx](./brainbow/src/components/templates/__tests__/ViewerTemplate.test.tsx)
│   │   │       ├── [AboutTemplate.tsx](./brainbow/src/components/templates/AboutTemplate.tsx)
│   │   │       ├── [DownloadsTemplate.tsx](./brainbow/src/components/templates/DownloadsTemplate.tsx)
│   │   │       ├── [ErrorTemplate.tsx](./brainbow/src/components/templates/ErrorTemplate.tsx)
│   │   │       ├── [HomeTemplate.tsx](./brainbow/src/components/templates/HomeTemplate.tsx)
│   │   │       ├── [VersionTemplate.tsx](./brainbow/src/components/templates/VersionTemplate.tsx)
│   │   │       ├── [ViewerTemplate.tsx](./brainbow/src/components/templates/ViewerTemplate.tsx)
│   │   │       └── [ViewerTemplateProps.ts](./brainbow/src/components/templates/ViewerTemplateProps.ts)
│   │   ├── content/
│   │   │   ├── [about.ts](./brainbow/src/content/about.ts)
│   │   │   ├── [download.ts](./brainbow/src/content/download.ts)
│   │   │   └── [version.ts](./brainbow/src/content/version.ts)
│   │   ├── data/
│   │   │   ├── __tests__/
│   │   │   │   ├── [channels.test.ts](./brainbow/src/data/__tests__/channels.test.ts)
│   │   │   │   ├── [layers.test.ts](./brainbow/src/data/__tests__/layers.test.ts)
│   │   │   │   └── [sample.test.ts](./brainbow/src/data/__tests__/sample.test.ts)
│   │   │   ├── [channels.ts](./brainbow/src/data/channels.ts)
│   │   │   ├── [layers.ts](./brainbow/src/data/layers.ts)
│   │   │   └── [sample.ts](./brainbow/src/data/sample.ts)
│   │   ├── hooks/
│   │   │   ├── __tests__/
│   │   │   │   ├── [shortcuts.test.ts](./brainbow/src/hooks/__tests__/shortcuts.test.ts)
│   │   │   │   ├── [useAnalysis.test.tsx](./brainbow/src/hooks/__tests__/useAnalysis.test.tsx)
│   │   │   │   ├── [useAnnotation.test.tsx](./brainbow/src/hooks/__tests__/useAnnotation.test.tsx)
│   │   │   │   ├── [useHistory.test.tsx](./brainbow/src/hooks/__tests__/useHistory.test.tsx)
│   │   │   │   ├── [useImageViewer.test.tsx](./brainbow/src/hooks/__tests__/useImageViewer.test.tsx)
│   │   │   │   ├── [useOffline.test.ts](./brainbow/src/hooks/__tests__/useOffline.test.ts)
│   │   │   │   ├── [useSWRegister.test.ts](./brainbow/src/hooks/__tests__/useSWRegister.test.ts)
│   │   │   │   └── [useUpdater.test.ts](./brainbow/src/hooks/__tests__/useUpdater.test.ts)
│   │   │   ├── [useAnalysis.ts](./brainbow/src/hooks/useAnalysis.ts)
│   │   │   ├── [useAnnotation.ts](./brainbow/src/hooks/useAnnotation.ts)
│   │   │   ├── [useHistory.ts](./brainbow/src/hooks/useHistory.ts)
│   │   │   ├── [useImageViewer.ts](./brainbow/src/hooks/useImageViewer.ts)
│   │   │   ├── [useOffline.ts](./brainbow/src/hooks/useOffline.ts)
│   │   │   ├── [useSWRegister.ts](./brainbow/src/hooks/useSWRegister.ts)
│   │   │   ├── [useShortcuts.ts](./brainbow/src/hooks/useShortcuts.ts)
│   │   │   └── [useUpdater.ts](./brainbow/src/hooks/useUpdater.ts)
│   │   ├── lib/
│   │   │   ├── analysis/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [analyze.test.ts](./brainbow/src/lib/analysis/__tests__/analyze.test.ts)
│   │   │   │   │   ├── [batch.test.ts](./brainbow/src/lib/analysis/__tests__/batch.test.ts)
│   │   │   │   │   ├── [density.test.ts](./brainbow/src/lib/analysis/__tests__/density.test.ts)
│   │   │   │   │   ├── [presets.test.ts](./brainbow/src/lib/analysis/__tests__/presets.test.ts)
│   │   │   │   │   ├── [report.test.ts](./brainbow/src/lib/analysis/__tests__/report.test.ts)
│   │   │   │   │   └── [summary.test.ts](./brainbow/src/lib/analysis/__tests__/summary.test.ts)
│   │   │   │   ├── [analyze.ts](./brainbow/src/lib/analysis/analyze.ts)
│   │   │   │   ├── [batch.ts](./brainbow/src/lib/analysis/batch.ts)
│   │   │   │   ├── [density.ts](./brainbow/src/lib/analysis/density.ts)
│   │   │   │   ├── [presets.ts](./brainbow/src/lib/analysis/presets.ts)
│   │   │   │   ├── [report.ts](./brainbow/src/lib/analysis/report.ts)
│   │   │   │   └── [summary.ts](./brainbow/src/lib/analysis/summary.ts)
│   │   │   ├── annotation/
│   │   │   │   └── [id.ts](./brainbow/src/lib/annotation/id.ts)
│   │   │   ├── canvas/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [draw.test.ts](./brainbow/src/lib/canvas/__tests__/draw.test.ts)
│   │   │   │   │   ├── [overlay.test.ts](./brainbow/src/lib/canvas/__tests__/overlay.test.ts)
│   │   │   │   │   └── [scale.test.ts](./brainbow/src/lib/canvas/__tests__/scale.test.ts)
│   │   │   │   ├── [draw.ts](./brainbow/src/lib/canvas/draw.ts)
│   │   │   │   ├── [overlay.ts](./brainbow/src/lib/canvas/overlay.ts)
│   │   │   │   └── [scale.ts](./brainbow/src/lib/canvas/scale.ts)
│   │   │   ├── export/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [csv.test.ts](./brainbow/src/lib/export/__tests__/csv.test.ts)
│   │   │   │   │   ├── [geojson.test.ts](./brainbow/src/lib/export/__tests__/geojson.test.ts)
│   │   │   │   │   ├── [raster.test.ts](./brainbow/src/lib/export/__tests__/raster.test.ts)
│   │   │   │   │   ├── [roi.test.ts](./brainbow/src/lib/export/__tests__/roi.test.ts)
│   │   │   │   │   ├── [svg.test.ts](./brainbow/src/lib/export/__tests__/svg.test.ts)
│   │   │   │   │   ├── [web.test.ts](./brainbow/src/lib/export/__tests__/web.test.ts)
│   │   │   │   │   └── [zip.test.ts](./brainbow/src/lib/export/__tests__/zip.test.ts)
│   │   │   │   ├── [csv.ts](./brainbow/src/lib/export/csv.ts)
│   │   │   │   ├── [geojson.ts](./brainbow/src/lib/export/geojson.ts)
│   │   │   │   ├── [raster.ts](./brainbow/src/lib/export/raster.ts)
│   │   │   │   ├── [roi.ts](./brainbow/src/lib/export/roi.ts)
│   │   │   │   ├── [svg.ts](./brainbow/src/lib/export/svg.ts)
│   │   │   │   ├── [web.ts](./brainbow/src/lib/export/web.ts)
│   │   │   │   └── [zip.ts](./brainbow/src/lib/export/zip.ts)
│   │   │   ├── geometry/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [annotation.test.ts](./brainbow/src/lib/geometry/__tests__/annotation.test.ts)
│   │   │   │   │   ├── [minimap.test.ts](./brainbow/src/lib/geometry/__tests__/minimap.test.ts)
│   │   │   │   │   ├── [snap.test.ts](./brainbow/src/lib/geometry/__tests__/snap.test.ts)
│   │   │   │   │   └── [viewport.test.ts](./brainbow/src/lib/geometry/__tests__/viewport.test.ts)
│   │   │   │   ├── [annotation.ts](./brainbow/src/lib/geometry/annotation.ts)
│   │   │   │   ├── [minimap.ts](./brainbow/src/lib/geometry/minimap.ts)
│   │   │   │   ├── [snap.ts](./brainbow/src/lib/geometry/snap.ts)
│   │   │   │   ├── [transform.ts](./brainbow/src/lib/geometry/transform.ts)
│   │   │   │   └── [viewport.ts](./brainbow/src/lib/geometry/viewport.ts)
│   │   │   ├── history/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [history.test.ts](./brainbow/src/lib/history/__tests__/history.test.ts)
│   │   │   │   │   └── [storage.test.ts](./brainbow/src/lib/history/__tests__/storage.test.ts)
│   │   │   │   ├── [history.ts](./brainbow/src/lib/history/history.ts)
│   │   │   │   └── [storage.ts](./brainbow/src/lib/history/storage.ts)
│   │   │   ├── image/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [channels.test.ts](./brainbow/src/lib/image/__tests__/channels.test.ts)
│   │   │   │   │   ├── [histogram.test.ts](./brainbow/src/lib/image/__tests__/histogram.test.ts)
│   │   │   │   │   ├── [load.test.ts](./brainbow/src/lib/image/__tests__/load.test.ts)
│   │   │   │   │   ├── [orientation.test.ts](./brainbow/src/lib/image/__tests__/orientation.test.ts)
│   │   │   │   │   ├── [regions.test.ts](./brainbow/src/lib/image/__tests__/regions.test.ts)
│   │   │   │   │   ├── [segmentation.test.ts](./brainbow/src/lib/image/__tests__/segmentation.test.ts)
│   │   │   │   │   └── [tiff.test.ts](./brainbow/src/lib/image/__tests__/tiff.test.ts)
│   │   │   │   ├── [channels.ts](./brainbow/src/lib/image/channels.ts)
│   │   │   │   ├── [histogram.ts](./brainbow/src/lib/image/histogram.ts)
│   │   │   │   ├── [load.ts](./brainbow/src/lib/image/load.ts)
│   │   │   │   ├── [orientation.ts](./brainbow/src/lib/image/orientation.ts)
│   │   │   │   ├── [regions.ts](./brainbow/src/lib/image/regions.ts)
│   │   │   │   ├── [segmentation.ts](./brainbow/src/lib/image/segmentation.ts)
│   │   │   │   └── [tiff.ts](./brainbow/src/lib/image/tiff.ts)
│   │   │   ├── io/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [base64.test.ts](./brainbow/src/lib/io/__tests__/base64.test.ts)
│   │   │   │   │   └── [dom.test.ts](./brainbow/src/lib/io/__tests__/dom.test.ts)
│   │   │   │   ├── [base64.ts](./brainbow/src/lib/io/base64.ts)
│   │   │   │   └── [dom.ts](./brainbow/src/lib/io/dom.ts)
│   │   │   ├── measure/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [measure.test.ts](./brainbow/src/lib/measure/__tests__/measure.test.ts)
│   │   │   │   └── [measure.ts](./brainbow/src/lib/measure/measure.ts)
│   │   │   ├── native/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [index.test.ts](./brainbow/src/lib/native/__tests__/index.test.ts)
│   │   │   │   └── [index.ts](./brainbow/src/lib/native/index.ts)
│   │   │   ├── projects/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [bundle.test.ts](./brainbow/src/lib/projects/__tests__/bundle.test.ts)
│   │   │   │   │   └── [io.test.ts](./brainbow/src/lib/projects/__tests__/io.test.ts)
│   │   │   │   ├── [bundle.ts](./brainbow/src/lib/projects/bundle.ts)
│   │   │   │   └── [io.ts](./brainbow/src/lib/projects/io.ts)
│   │   │   ├── share/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [share.test.ts](./brainbow/src/lib/share/__tests__/share.test.ts)
│   │   │   │   └── [share.ts](./brainbow/src/lib/share/share.ts)
│   │   │   └── store/
│   │   │       ├── __tests__/
│   │   │       │   └── [viewerStore.test.ts](./brainbow/src/lib/store/__tests__/viewerStore.test.ts)
│   │   │       └── [viewerStore.ts](./brainbow/src/lib/store/viewerStore.ts)
│   │   ├── providers/
│   │   │   ├── __tests__/
│   │   │   │   └── [providers.test.tsx](./brainbow/src/providers/__tests__/providers.test.tsx)
│   │   │   ├── [NativeProvider.tsx](./brainbow/src/providers/NativeProvider.tsx)
│   │   │   └── [SWProvider.tsx](./brainbow/src/providers/SWProvider.tsx)
│   │   ├── styles/
│   │   │   ├── [globals.css](./brainbow/src/styles/globals.css)
│   │   │   └── [themes.css](./brainbow/src/styles/themes.css)
│   │   └── types/
│   │       ├── [annotation.ts](./brainbow/src/types/annotation.ts)
│   │       ├── [compare.ts](./brainbow/src/types/compare.ts)
│   │       ├── [image.ts](./brainbow/src/types/image.ts)
│   │       └── [project.ts](./brainbow/src/types/project.ts)
│   ├── src-tauri/
│   │   ├── capabilities/
│   │   │   └── [default.json](./brainbow/src-tauri/capabilities/default.json)
│   │   ├── icons/
│   │   │   ├── android/
│   │   │   │   ├── mipmap-anydpi-v26/
│   │   │   │   │   └── [ic_launcher.xml](./brainbow/src-tauri/icons/android/mipmap-anydpi-v26/ic_launcher.xml)
│   │   │   │   ├── mipmap-hdpi/
│   │   │   │   │   ├── [ic_launcher.png](./brainbow/src-tauri/icons/android/mipmap-hdpi/ic_launcher.png)
│   │   │   │   │   ├── [ic_launcher_foreground.png](./brainbow/src-tauri/icons/android/mipmap-hdpi/ic_launcher_foreground.png)
│   │   │   │   │   └── [ic_launcher_round.png](./brainbow/src-tauri/icons/android/mipmap-hdpi/ic_launcher_round.png)
│   │   │   │   ├── mipmap-mdpi/
│   │   │   │   │   ├── [ic_launcher.png](./brainbow/src-tauri/icons/android/mipmap-mdpi/ic_launcher.png)
│   │   │   │   │   ├── [ic_launcher_foreground.png](./brainbow/src-tauri/icons/android/mipmap-mdpi/ic_launcher_foreground.png)
│   │   │   │   │   └── [ic_launcher_round.png](./brainbow/src-tauri/icons/android/mipmap-mdpi/ic_launcher_round.png)
│   │   │   │   ├── mipmap-xhdpi/
│   │   │   │   │   ├── [ic_launcher.png](./brainbow/src-tauri/icons/android/mipmap-xhdpi/ic_launcher.png)
│   │   │   │   │   ├── [ic_launcher_foreground.png](./brainbow/src-tauri/icons/android/mipmap-xhdpi/ic_launcher_foreground.png)
│   │   │   │   │   └── [ic_launcher_round.png](./brainbow/src-tauri/icons/android/mipmap-xhdpi/ic_launcher_round.png)
│   │   │   │   ├── mipmap-xxhdpi/
│   │   │   │   │   ├── [ic_launcher.png](./brainbow/src-tauri/icons/android/mipmap-xxhdpi/ic_launcher.png)
│   │   │   │   │   ├── [ic_launcher_foreground.png](./brainbow/src-tauri/icons/android/mipmap-xxhdpi/ic_launcher_foreground.png)
│   │   │   │   │   └── [ic_launcher_round.png](./brainbow/src-tauri/icons/android/mipmap-xxhdpi/ic_launcher_round.png)
│   │   │   │   ├── mipmap-xxxhdpi/
│   │   │   │   │   ├── [ic_launcher.png](./brainbow/src-tauri/icons/android/mipmap-xxxhdpi/ic_launcher.png)
│   │   │   │   │   ├── [ic_launcher_foreground.png](./brainbow/src-tauri/icons/android/mipmap-xxxhdpi/ic_launcher_foreground.png)
│   │   │   │   │   └── [ic_launcher_round.png](./brainbow/src-tauri/icons/android/mipmap-xxxhdpi/ic_launcher_round.png)
│   │   │   │   └── values/
│   │   │   │       └── [ic_launcher_background.xml](./brainbow/src-tauri/icons/android/values/ic_launcher_background.xml)
│   │   │   ├── ios/
│   │   │   │   ├── [AppIcon-20x20@1x.png](./brainbow/src-tauri/icons/ios/AppIcon-20x20@1x.png)
│   │   │   │   ├── [AppIcon-20x20@2x-1.png](./brainbow/src-tauri/icons/ios/AppIcon-20x20@2x-1.png)
│   │   │   │   ├── [AppIcon-20x20@2x.png](./brainbow/src-tauri/icons/ios/AppIcon-20x20@2x.png)
│   │   │   │   ├── [AppIcon-20x20@3x.png](./brainbow/src-tauri/icons/ios/AppIcon-20x20@3x.png)
│   │   │   │   ├── [AppIcon-29x29@1x.png](./brainbow/src-tauri/icons/ios/AppIcon-29x29@1x.png)
│   │   │   │   ├── [AppIcon-29x29@2x-1.png](./brainbow/src-tauri/icons/ios/AppIcon-29x29@2x-1.png)
│   │   │   │   ├── [AppIcon-29x29@2x.png](./brainbow/src-tauri/icons/ios/AppIcon-29x29@2x.png)
│   │   │   │   ├── [AppIcon-29x29@3x.png](./brainbow/src-tauri/icons/ios/AppIcon-29x29@3x.png)
│   │   │   │   ├── [AppIcon-40x40@1x.png](./brainbow/src-tauri/icons/ios/AppIcon-40x40@1x.png)
│   │   │   │   ├── [AppIcon-40x40@2x-1.png](./brainbow/src-tauri/icons/ios/AppIcon-40x40@2x-1.png)
│   │   │   │   ├── [AppIcon-40x40@2x.png](./brainbow/src-tauri/icons/ios/AppIcon-40x40@2x.png)
│   │   │   │   ├── [AppIcon-40x40@3x.png](./brainbow/src-tauri/icons/ios/AppIcon-40x40@3x.png)
│   │   │   │   ├── [AppIcon-512@2x.png](./brainbow/src-tauri/icons/ios/AppIcon-512@2x.png)
│   │   │   │   ├── [AppIcon-60x60@2x.png](./brainbow/src-tauri/icons/ios/AppIcon-60x60@2x.png)
│   │   │   │   ├── [AppIcon-60x60@3x.png](./brainbow/src-tauri/icons/ios/AppIcon-60x60@3x.png)
│   │   │   │   ├── [AppIcon-76x76@1x.png](./brainbow/src-tauri/icons/ios/AppIcon-76x76@1x.png)
│   │   │   │   ├── [AppIcon-76x76@2x.png](./brainbow/src-tauri/icons/ios/AppIcon-76x76@2x.png)
│   │   │   │   └── [AppIcon-83.5x83.5@2x.png](./brainbow/src-tauri/icons/ios/AppIcon-83.5x83.5@2x.png)
│   │   │   ├── [128x128.png](./brainbow/src-tauri/icons/128x128.png)
│   │   │   ├── [128x128@2x.png](./brainbow/src-tauri/icons/128x128@2x.png)
│   │   │   ├── [256x256.png](./brainbow/src-tauri/icons/256x256.png)
│   │   │   ├── [32x32.png](./brainbow/src-tauri/icons/32x32.png)
│   │   │   ├── [64x64.png](./brainbow/src-tauri/icons/64x64.png)
│   │   │   ├── [Square107x107Logo.png](./brainbow/src-tauri/icons/Square107x107Logo.png)
│   │   │   ├── [Square142x142Logo.png](./brainbow/src-tauri/icons/Square142x142Logo.png)
│   │   │   ├── [Square150x150Logo.png](./brainbow/src-tauri/icons/Square150x150Logo.png)
│   │   │   ├── [Square284x284Logo.png](./brainbow/src-tauri/icons/Square284x284Logo.png)
│   │   │   ├── [Square30x30Logo.png](./brainbow/src-tauri/icons/Square30x30Logo.png)
│   │   │   ├── [Square310x310Logo.png](./brainbow/src-tauri/icons/Square310x310Logo.png)
│   │   │   ├── [Square44x44Logo.png](./brainbow/src-tauri/icons/Square44x44Logo.png)
│   │   │   ├── [Square71x71Logo.png](./brainbow/src-tauri/icons/Square71x71Logo.png)
│   │   │   ├── [Square89x89Logo.png](./brainbow/src-tauri/icons/Square89x89Logo.png)
│   │   │   ├── [StoreLogo.png](./brainbow/src-tauri/icons/StoreLogo.png)
│   │   │   ├── [create-icons.sh](./brainbow/src-tauri/icons/create-icons.sh)
│   │   │   ├── [icon.icns](./brainbow/src-tauri/icons/icon.icns)
│   │   │   ├── [icon.ico](./brainbow/src-tauri/icons/icon.ico)
│   │   │   └── [icon.png](./brainbow/src-tauri/icons/icon.png)
│   │   ├── src/
│   │   │   ├── [commands.rs](./brainbow/src-tauri/src/commands.rs)
│   │   │   ├── [lib.rs](./brainbow/src-tauri/src/lib.rs)
│   │   │   └── [main.rs](./brainbow/src-tauri/src/main.rs)
│   │   ├── [Cargo.lock](./brainbow/src-tauri/Cargo.lock)
│   │   ├── [Cargo.toml](./brainbow/src-tauri/Cargo.toml)
│   │   ├── [build.rs](./brainbow/src-tauri/build.rs)
│   │   └── [tauri.conf.json](./brainbow/src-tauri/tauri.conf.json)
│   ├── [AGENTS.md](./brainbow/AGENTS.md)
│   ├── [Dockerfile](./brainbow/Dockerfile)
│   ├── [LICENSE](./brainbow/LICENSE)
│   ├── [docker-compose.yaml](./brainbow/docker-compose.yaml)
│   ├── [eslint.config.mts](./brainbow/eslint.config.mts)
│   ├── [jest.config.ts](./brainbow/jest.config.ts)
│   ├── [jest.setup.ts](./brainbow/jest.setup.ts)
│   ├── [next.config.ts](./brainbow/next.config.ts)
│   ├── [package.json](./brainbow/package.json)
│   ├── [playwright.config.ts](./brainbow/playwright.config.ts)
│   ├── [postcss.config.mjs](./brainbow/postcss.config.mjs)
│   └── [tsconfig.json](./brainbow/tsconfig.json)
├── mri/
│   ├── docs/
│   │   ├── [ARCHITECTURE.md](./mri/docs/ARCHITECTURE.md)
│   │   ├── [CONTRIBUTING.md](./mri/docs/CONTRIBUTING.md)
│   │   ├── [DOWNLOADS.md](./mri/docs/DOWNLOADS.md)
│   │   ├── [PACKAGING.md](./mri/docs/PACKAGING.md)
│   │   └── [ROADMAP.md](./mri/docs/ROADMAP.md)
│   ├── e2e/
│   │   ├── screenshots/
│   │   │   ├── [about.png](./mri/e2e/screenshots/about.png)
│   │   │   ├── [downloads.png](./mri/e2e/screenshots/downloads.png)
│   │   │   ├── [home.png](./mri/e2e/screenshots/home.png)
│   │   │   └── [version.png](./mri/e2e/screenshots/version.png)
│   │   ├── [about.spec.ts](./mri/e2e/about.spec.ts)
│   │   ├── [downloads.spec.ts](./mri/e2e/downloads.spec.ts)
│   │   ├── [home.spec.ts](./mri/e2e/home.spec.ts)
│   │   └── [version.spec.ts](./mri/e2e/version.spec.ts)
│   ├── public/
│   │   ├── icons/
│   │   │   ├── [icon-128x128.png](./mri/public/icons/icon-128x128.png)
│   │   │   ├── [icon-144x144.png](./mri/public/icons/icon-144x144.png)
│   │   │   ├── [icon-152x152.png](./mri/public/icons/icon-152x152.png)
│   │   │   ├── [icon-16x16.png](./mri/public/icons/icon-16x16.png)
│   │   │   ├── [icon-180x180.png](./mri/public/icons/icon-180x180.png)
│   │   │   ├── [icon-192x192.png](./mri/public/icons/icon-192x192.png)
│   │   │   ├── [icon-256x256.png](./mri/public/icons/icon-256x256.png)
│   │   │   ├── [icon-32x32.png](./mri/public/icons/icon-32x32.png)
│   │   │   ├── [icon-384x384.png](./mri/public/icons/icon-384x384.png)
│   │   │   ├── [icon-48x48.png](./mri/public/icons/icon-48x48.png)
│   │   │   ├── [icon-512x512.png](./mri/public/icons/icon-512x512.png)
│   │   │   ├── [icon-64x64.png](./mri/public/icons/icon-64x64.png)
│   │   │   ├── [icon-72x72.png](./mri/public/icons/icon-72x72.png)
│   │   │   ├── [icon-96x96.png](./mri/public/icons/icon-96x96.png)
│   │   │   └── [icon.svg](./mri/public/icons/icon.svg)
│   │   ├── [apple-touch-icon.png](./mri/public/apple-touch-icon.png)
│   │   ├── [favicon.ico](./mri/public/favicon.ico)
│   │   ├── [manifest.json](./mri/public/manifest.json)
│   │   ├── [robots.txt](./mri/public/robots.txt)
│   │   ├── [sitemap.xml](./mri/public/sitemap.xml)
│   │   └── [sw.js](./mri/public/sw.js)
│   ├── src/
│   │   ├── app/
│   │   │   ├── (app)/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [compare.test.tsx](./mri/src/app/(app)/__tests__/compare.test.tsx)
│   │   │   │   │   ├── [dicomweb.test.tsx](./mri/src/app/(app)/__tests__/dicomweb.test.tsx)
│   │   │   │   │   ├── [forbidden.test.tsx](./mri/src/app/(app)/__tests__/forbidden.test.tsx)
│   │   │   │   │   ├── [models.test.tsx](./mri/src/app/(app)/__tests__/models.test.tsx)
│   │   │   │   │   ├── [pipelines.test.tsx](./mri/src/app/(app)/__tests__/pipelines.test.tsx)
│   │   │   │   │   ├── [protocols.test.tsx](./mri/src/app/(app)/__tests__/protocols.test.tsx)
│   │   │   │   │   ├── [studies.test.tsx](./mri/src/app/(app)/__tests__/studies.test.tsx)
│   │   │   │   │   ├── [unauthorized.test.tsx](./mri/src/app/(app)/__tests__/unauthorized.test.tsx)
│   │   │   │   │   ├── [viewer.test.tsx](./mri/src/app/(app)/__tests__/viewer.test.tsx)
│   │   │   │   │   └── [workspace.test.tsx](./mri/src/app/(app)/__tests__/workspace.test.tsx)
│   │   │   │   ├── compare/
│   │   │   │   │   └── [page.tsx](./mri/src/app/(app)/compare/page.tsx)
│   │   │   │   ├── dicomweb/
│   │   │   │   │   └── [page.tsx](./mri/src/app/(app)/dicomweb/page.tsx)
│   │   │   │   ├── models/
│   │   │   │   │   └── [page.tsx](./mri/src/app/(app)/models/page.tsx)
│   │   │   │   ├── pipelines/
│   │   │   │   │   └── [page.tsx](./mri/src/app/(app)/pipelines/page.tsx)
│   │   │   │   ├── protocols/
│   │   │   │   │   └── [page.tsx](./mri/src/app/(app)/protocols/page.tsx)
│   │   │   │   ├── studies/
│   │   │   │   │   └── [page.tsx](./mri/src/app/(app)/studies/page.tsx)
│   │   │   │   ├── viewer/
│   │   │   │   │   └── [page.tsx](./mri/src/app/(app)/viewer/page.tsx)
│   │   │   │   └── workspace/
│   │   │   │       └── [page.tsx](./mri/src/app/(app)/workspace/page.tsx)
│   │   │   ├── (auth)/
│   │   │   │   ├── forget-password/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./mri/src/app/(auth)/forget-password/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./mri/src/app/(auth)/forget-password/page.tsx)
│   │   │   │   ├── profile/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./mri/src/app/(auth)/profile/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./mri/src/app/(auth)/profile/page.tsx)
│   │   │   │   ├── reset-password/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./mri/src/app/(auth)/reset-password/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./mri/src/app/(auth)/reset-password/page.tsx)
│   │   │   │   ├── sign-in/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./mri/src/app/(auth)/sign-in/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./mri/src/app/(auth)/sign-in/page.tsx)
│   │   │   │   └── sign-up/
│   │   │   │       ├── __tests__/
│   │   │   │       │   └── [page.test.tsx](./mri/src/app/(auth)/sign-up/__tests__/page.test.tsx)
│   │   │   │       └── [page.tsx](./mri/src/app/(auth)/sign-up/page.tsx)
│   │   │   ├── (info)/
│   │   │   │   ├── about/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./mri/src/app/(info)/about/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./mri/src/app/(info)/about/page.tsx)
│   │   │   │   ├── downloads/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./mri/src/app/(info)/downloads/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./mri/src/app/(info)/downloads/page.tsx)
│   │   │   │   └── version/
│   │   │   │       ├── __tests__/
│   │   │   │       │   └── [page.test.tsx](./mri/src/app/(info)/version/__tests__/page.test.tsx)
│   │   │   │       └── [page.tsx](./mri/src/app/(info)/version/page.tsx)
│   │   │   ├── __tests__/
│   │   │   │   ├── [default.test.tsx](./mri/src/app/__tests__/default.test.tsx)
│   │   │   │   ├── [error.test.tsx](./mri/src/app/__tests__/error.test.tsx)
│   │   │   │   ├── [forbidden.test.tsx](./mri/src/app/__tests__/forbidden.test.tsx)
│   │   │   │   ├── [global-error.test.tsx](./mri/src/app/__tests__/global-error.test.tsx)
│   │   │   │   ├── [layout.test.tsx](./mri/src/app/__tests__/layout.test.tsx)
│   │   │   │   ├── [loading.test.tsx](./mri/src/app/__tests__/loading.test.tsx)
│   │   │   │   ├── [not-found.test.tsx](./mri/src/app/__tests__/not-found.test.tsx)
│   │   │   │   ├── [page.test.tsx](./mri/src/app/__tests__/page.test.tsx)
│   │   │   │   ├── [robots.test.ts](./mri/src/app/__tests__/robots.test.ts)
│   │   │   │   ├── [template.test.tsx](./mri/src/app/__tests__/template.test.tsx)
│   │   │   │   └── [unauthorized.test.tsx](./mri/src/app/__tests__/unauthorized.test.tsx)
│   │   │   ├── [default.tsx](./mri/src/app/default.tsx)
│   │   │   ├── [error.tsx](./mri/src/app/error.tsx)
│   │   │   ├── [favicon.ico](./mri/src/app/favicon.ico)
│   │   │   ├── [forbidden.tsx](./mri/src/app/forbidden.tsx)
│   │   │   ├── [global-error.tsx](./mri/src/app/global-error.tsx)
│   │   │   ├── [layout.tsx](./mri/src/app/layout.tsx)
│   │   │   ├── [loading.tsx](./mri/src/app/loading.tsx)
│   │   │   ├── [not-found.tsx](./mri/src/app/not-found.tsx)
│   │   │   ├── [page.tsx](./mri/src/app/page.tsx)
│   │   │   ├── [robots.ts](./mri/src/app/robots.ts)
│   │   │   ├── [template.tsx](./mri/src/app/template.tsx)
│   │   │   └── [unauthorized.tsx](./mri/src/app/unauthorized.tsx)
│   │   ├── components/
│   │   │   ├── atoms/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [Badge.test.tsx](./mri/src/components/atoms/__tests__/Badge.test.tsx)
│   │   │   │   │   └── [Button.test.tsx](./mri/src/components/atoms/__tests__/Button.test.tsx)
│   │   │   │   ├── [Badge.tsx](./mri/src/components/atoms/Badge.tsx)
│   │   │   │   └── [Button.tsx](./mri/src/components/atoms/Button.tsx)
│   │   │   ├── molecules/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [AnalysisPanel.test.tsx](./mri/src/components/molecules/__tests__/AnalysisPanel.test.tsx)
│   │   │   │   │   ├── [JobsPanel.test.tsx](./mri/src/components/molecules/__tests__/JobsPanel.test.tsx)
│   │   │   │   │   ├── [MetadataPanel.test.tsx](./mri/src/components/molecules/__tests__/MetadataPanel.test.tsx)
│   │   │   │   │   └── [QcPanel.test.tsx](./mri/src/components/molecules/__tests__/QcPanel.test.tsx)
│   │   │   │   ├── [AnalysisPanel.tsx](./mri/src/components/molecules/AnalysisPanel.tsx)
│   │   │   │   ├── [JobsPanel.tsx](./mri/src/components/molecules/JobsPanel.tsx)
│   │   │   │   ├── [MetadataPanel.tsx](./mri/src/components/molecules/MetadataPanel.tsx)
│   │   │   │   ├── [QcPanel.tsx](./mri/src/components/molecules/QcPanel.tsx)
│   │   │   │   └── [SliceCanvas.tsx](./mri/src/components/molecules/SliceCanvas.tsx)
│   │   │   ├── organisms/
│   │   │   │   └── [Header.tsx](./mri/src/components/organisms/Header.tsx)
│   │   │   └── templates/
│   │   │       ├── __tests__/
│   │   │       │   ├── [AboutTemplate.test.tsx](./mri/src/components/templates/__tests__/AboutTemplate.test.tsx)
│   │   │       │   ├── [CompareTemplate.test.tsx](./mri/src/components/templates/__tests__/CompareTemplate.test.tsx)
│   │   │       │   ├── [DicomwebTemplate.test.tsx](./mri/src/components/templates/__tests__/DicomwebTemplate.test.tsx)
│   │   │       │   ├── [DownloadsTemplate.test.tsx](./mri/src/components/templates/__tests__/DownloadsTemplate.test.tsx)
│   │   │       │   ├── [ErrorTemplate.test.tsx](./mri/src/components/templates/__tests__/ErrorTemplate.test.tsx)
│   │   │       │   ├── [ModelsTemplate.test.tsx](./mri/src/components/templates/__tests__/ModelsTemplate.test.tsx)
│   │   │       │   ├── [PipelinesTemplate.test.tsx](./mri/src/components/templates/__tests__/PipelinesTemplate.test.tsx)
│   │   │       │   ├── [ProtocolsTemplate.test.tsx](./mri/src/components/templates/__tests__/ProtocolsTemplate.test.tsx)
│   │   │       │   ├── [StudiesTemplate.test.tsx](./mri/src/components/templates/__tests__/StudiesTemplate.test.tsx)
│   │   │       │   ├── [VersionTemplate.test.tsx](./mri/src/components/templates/__tests__/VersionTemplate.test.tsx)
│   │   │       │   ├── [ViewerTemplate.test.tsx](./mri/src/components/templates/__tests__/ViewerTemplate.test.tsx)
│   │   │       │   └── [WorkspaceTemplate.test.tsx](./mri/src/components/templates/__tests__/WorkspaceTemplate.test.tsx)
│   │   │       ├── [AboutTemplate.tsx](./mri/src/components/templates/AboutTemplate.tsx)
│   │   │       ├── [CompareTemplate.tsx](./mri/src/components/templates/CompareTemplate.tsx)
│   │   │       ├── [DicomwebTemplate.tsx](./mri/src/components/templates/DicomwebTemplate.tsx)
│   │   │       ├── [DownloadsTemplate.tsx](./mri/src/components/templates/DownloadsTemplate.tsx)
│   │   │       ├── [ErrorTemplate.tsx](./mri/src/components/templates/ErrorTemplate.tsx)
│   │   │       ├── [ModelsTemplate.tsx](./mri/src/components/templates/ModelsTemplate.tsx)
│   │   │       ├── [PipelinesTemplate.tsx](./mri/src/components/templates/PipelinesTemplate.tsx)
│   │   │       ├── [ProtocolsTemplate.tsx](./mri/src/components/templates/ProtocolsTemplate.tsx)
│   │   │       ├── [StudiesTemplate.tsx](./mri/src/components/templates/StudiesTemplate.tsx)
│   │   │       ├── [VersionTemplate.tsx](./mri/src/components/templates/VersionTemplate.tsx)
│   │   │       ├── [ViewerTemplate.tsx](./mri/src/components/templates/ViewerTemplate.tsx)
│   │   │       └── [WorkspaceTemplate.tsx](./mri/src/components/templates/WorkspaceTemplate.tsx)
│   │   ├── content/
│   │   │   ├── [about.ts](./mri/src/content/about.ts)
│   │   │   ├── [download.ts](./mri/src/content/download.ts)
│   │   │   └── [version.ts](./mri/src/content/version.ts)
│   │   ├── lib/
│   │   │   ├── __tests__/
│   │   │   │   └── [compare.test.ts](./mri/src/lib/__tests__/compare.test.ts)
│   │   │   ├── api/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [client.test.ts](./mri/src/lib/api/__tests__/client.test.ts)
│   │   │   │   ├── [client.ts](./mri/src/lib/api/client.ts)
│   │   │   │   └── [types.ts](./mri/src/lib/api/types.ts)
│   │   │   ├── viewer/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [lut.test.ts](./mri/src/lib/viewer/__tests__/lut.test.ts)
│   │   │   │   └── [lut.ts](./mri/src/lib/viewer/lut.ts)
│   │   │   └── [compare.ts](./mri/src/lib/compare.ts)
│   │   └── styles/
│   │       ├── [globals.css](./mri/src/styles/globals.css)
│   │       └── [themes.css](./mri/src/styles/themes.css)
│   ├── src-tauri/
│   │   ├── capabilities/
│   │   │   └── [default.json](./mri/src-tauri/capabilities/default.json)
│   │   ├── icons/
│   │   │   ├── android/
│   │   │   │   ├── mipmap-anydpi-v26/
│   │   │   │   │   └── [ic_launcher.xml](./mri/src-tauri/icons/android/mipmap-anydpi-v26/ic_launcher.xml)
│   │   │   │   ├── mipmap-hdpi/
│   │   │   │   │   ├── [ic_launcher.png](./mri/src-tauri/icons/android/mipmap-hdpi/ic_launcher.png)
│   │   │   │   │   ├── [ic_launcher_foreground.png](./mri/src-tauri/icons/android/mipmap-hdpi/ic_launcher_foreground.png)
│   │   │   │   │   └── [ic_launcher_round.png](./mri/src-tauri/icons/android/mipmap-hdpi/ic_launcher_round.png)
│   │   │   │   ├── mipmap-mdpi/
│   │   │   │   │   ├── [ic_launcher.png](./mri/src-tauri/icons/android/mipmap-mdpi/ic_launcher.png)
│   │   │   │   │   ├── [ic_launcher_foreground.png](./mri/src-tauri/icons/android/mipmap-mdpi/ic_launcher_foreground.png)
│   │   │   │   │   └── [ic_launcher_round.png](./mri/src-tauri/icons/android/mipmap-mdpi/ic_launcher_round.png)
│   │   │   │   ├── mipmap-xhdpi/
│   │   │   │   │   ├── [ic_launcher.png](./mri/src-tauri/icons/android/mipmap-xhdpi/ic_launcher.png)
│   │   │   │   │   ├── [ic_launcher_foreground.png](./mri/src-tauri/icons/android/mipmap-xhdpi/ic_launcher_foreground.png)
│   │   │   │   │   └── [ic_launcher_round.png](./mri/src-tauri/icons/android/mipmap-xhdpi/ic_launcher_round.png)
│   │   │   │   ├── mipmap-xxhdpi/
│   │   │   │   │   ├── [ic_launcher.png](./mri/src-tauri/icons/android/mipmap-xxhdpi/ic_launcher.png)
│   │   │   │   │   ├── [ic_launcher_foreground.png](./mri/src-tauri/icons/android/mipmap-xxhdpi/ic_launcher_foreground.png)
│   │   │   │   │   └── [ic_launcher_round.png](./mri/src-tauri/icons/android/mipmap-xxhdpi/ic_launcher_round.png)
│   │   │   │   ├── mipmap-xxxhdpi/
│   │   │   │   │   ├── [ic_launcher.png](./mri/src-tauri/icons/android/mipmap-xxxhdpi/ic_launcher.png)
│   │   │   │   │   ├── [ic_launcher_foreground.png](./mri/src-tauri/icons/android/mipmap-xxxhdpi/ic_launcher_foreground.png)
│   │   │   │   │   └── [ic_launcher_round.png](./mri/src-tauri/icons/android/mipmap-xxxhdpi/ic_launcher_round.png)
│   │   │   │   └── values/
│   │   │   │       └── [ic_launcher_background.xml](./mri/src-tauri/icons/android/values/ic_launcher_background.xml)
│   │   │   ├── ios/
│   │   │   │   ├── [AppIcon-20x20@1x.png](./mri/src-tauri/icons/ios/AppIcon-20x20@1x.png)
│   │   │   │   ├── [AppIcon-20x20@2x-1.png](./mri/src-tauri/icons/ios/AppIcon-20x20@2x-1.png)
│   │   │   │   ├── [AppIcon-20x20@2x.png](./mri/src-tauri/icons/ios/AppIcon-20x20@2x.png)
│   │   │   │   ├── [AppIcon-20x20@3x.png](./mri/src-tauri/icons/ios/AppIcon-20x20@3x.png)
│   │   │   │   ├── [AppIcon-29x29@1x.png](./mri/src-tauri/icons/ios/AppIcon-29x29@1x.png)
│   │   │   │   ├── [AppIcon-29x29@2x-1.png](./mri/src-tauri/icons/ios/AppIcon-29x29@2x-1.png)
│   │   │   │   ├── [AppIcon-29x29@2x.png](./mri/src-tauri/icons/ios/AppIcon-29x29@2x.png)
│   │   │   │   ├── [AppIcon-29x29@3x.png](./mri/src-tauri/icons/ios/AppIcon-29x29@3x.png)
│   │   │   │   ├── [AppIcon-40x40@1x.png](./mri/src-tauri/icons/ios/AppIcon-40x40@1x.png)
│   │   │   │   ├── [AppIcon-40x40@2x-1.png](./mri/src-tauri/icons/ios/AppIcon-40x40@2x-1.png)
│   │   │   │   ├── [AppIcon-40x40@2x.png](./mri/src-tauri/icons/ios/AppIcon-40x40@2x.png)
│   │   │   │   ├── [AppIcon-40x40@3x.png](./mri/src-tauri/icons/ios/AppIcon-40x40@3x.png)
│   │   │   │   ├── [AppIcon-512@2x.png](./mri/src-tauri/icons/ios/AppIcon-512@2x.png)
│   │   │   │   ├── [AppIcon-60x60@2x.png](./mri/src-tauri/icons/ios/AppIcon-60x60@2x.png)
│   │   │   │   ├── [AppIcon-60x60@3x.png](./mri/src-tauri/icons/ios/AppIcon-60x60@3x.png)
│   │   │   │   ├── [AppIcon-76x76@1x.png](./mri/src-tauri/icons/ios/AppIcon-76x76@1x.png)
│   │   │   │   ├── [AppIcon-76x76@2x.png](./mri/src-tauri/icons/ios/AppIcon-76x76@2x.png)
│   │   │   │   └── [AppIcon-83.5x83.5@2x.png](./mri/src-tauri/icons/ios/AppIcon-83.5x83.5@2x.png)
│   │   │   ├── [128x128.png](./mri/src-tauri/icons/128x128.png)
│   │   │   ├── [128x128@2x.png](./mri/src-tauri/icons/128x128@2x.png)
│   │   │   ├── [256x256.png](./mri/src-tauri/icons/256x256.png)
│   │   │   ├── [32x32.png](./mri/src-tauri/icons/32x32.png)
│   │   │   ├── [64x64.png](./mri/src-tauri/icons/64x64.png)
│   │   │   ├── [Square107x107Logo.png](./mri/src-tauri/icons/Square107x107Logo.png)
│   │   │   ├── [Square142x142Logo.png](./mri/src-tauri/icons/Square142x142Logo.png)
│   │   │   ├── [Square150x150Logo.png](./mri/src-tauri/icons/Square150x150Logo.png)
│   │   │   ├── [Square284x284Logo.png](./mri/src-tauri/icons/Square284x284Logo.png)
│   │   │   ├── [Square30x30Logo.png](./mri/src-tauri/icons/Square30x30Logo.png)
│   │   │   ├── [Square310x310Logo.png](./mri/src-tauri/icons/Square310x310Logo.png)
│   │   │   ├── [Square44x44Logo.png](./mri/src-tauri/icons/Square44x44Logo.png)
│   │   │   ├── [Square71x71Logo.png](./mri/src-tauri/icons/Square71x71Logo.png)
│   │   │   ├── [Square89x89Logo.png](./mri/src-tauri/icons/Square89x89Logo.png)
│   │   │   ├── [StoreLogo.png](./mri/src-tauri/icons/StoreLogo.png)
│   │   │   ├── [create-icons.sh](./mri/src-tauri/icons/create-icons.sh)
│   │   │   ├── [icon.icns](./mri/src-tauri/icons/icon.icns)
│   │   │   ├── [icon.ico](./mri/src-tauri/icons/icon.ico)
│   │   │   └── [icon.png](./mri/src-tauri/icons/icon.png)
│   │   ├── src/
│   │   │   ├── [analysis.rs](./mri/src-tauri/src/analysis.rs)
│   │   │   ├── [classifier.rs](./mri/src-tauri/src/classifier.rs)
│   │   │   ├── [commands.rs](./mri/src-tauri/src/commands.rs)
│   │   │   ├── [commands_dicomweb.rs](./mri/src-tauri/src/commands_dicomweb.rs)
│   │   │   ├── [commands_intel.rs](./mri/src-tauri/src/commands_intel.rs)
│   │   │   ├── [commands_models.rs](./mri/src-tauri/src/commands_models.rs)
│   │   │   ├── [commands_workflow.rs](./mri/src-tauri/src/commands_workflow.rs)
│   │   │   ├── [compare.rs](./mri/src-tauri/src/compare.rs)
│   │   │   ├── [db.rs](./mri/src-tauri/src/db.rs)
│   │   │   ├── [dicomweb.rs](./mri/src-tauri/src/dicomweb.rs)
│   │   │   ├── [import_dicom.rs](./mri/src-tauri/src/import_dicom.rs)
│   │   │   ├── [import_nifti.rs](./mri/src-tauri/src/import_nifti.rs)
│   │   │   ├── [inference.rs](./mri/src-tauri/src/inference.rs)
│   │   │   ├── [jobs.rs](./mri/src-tauri/src/jobs.rs)
│   │   │   ├── [lib.rs](./mri/src-tauri/src/lib.rs)
│   │   │   ├── [main.rs](./mri/src-tauri/src/main.rs)
│   │   │   ├── [models.rs](./mri/src-tauri/src/models.rs)
│   │   │   ├── [normalize.rs](./mri/src-tauri/src/normalize.rs)
│   │   │   ├── [pipeline.rs](./mri/src-tauri/src/pipeline.rs)
│   │   │   ├── [process.rs](./mri/src-tauri/src/process.rs)
│   │   │   ├── [protocol.rs](./mri/src-tauri/src/protocol.rs)
│   │   │   ├── [provenance.rs](./mri/src-tauri/src/provenance.rs)
│   │   │   ├── [qc.rs](./mri/src-tauri/src/qc.rs)
│   │   │   ├── [qc_stats.rs](./mri/src-tauri/src/qc_stats.rs)
│   │   │   ├── [registry.rs](./mri/src-tauri/src/registry.rs)
│   │   │   ├── [state.rs](./mri/src-tauri/src/state.rs)
│   │   │   ├── [store.rs](./mri/src-tauri/src/store.rs)
│   │   │   ├── [viewer.rs](./mri/src-tauri/src/viewer.rs)
│   │   │   └── [workspace.rs](./mri/src-tauri/src/workspace.rs)
│   │   ├── [Cargo.lock](./mri/src-tauri/Cargo.lock)
│   │   ├── [Cargo.toml](./mri/src-tauri/Cargo.toml)
│   │   ├── [build.rs](./mri/src-tauri/build.rs)
│   │   └── [tauri.conf.json](./mri/src-tauri/tauri.conf.json)
│   ├── [AGENTS.md](./mri/AGENTS.md)
│   ├── [Dockerfile](./mri/Dockerfile)
│   ├── [LICENSE](./mri/LICENSE)
│   ├── [docker-compose.yaml](./mri/docker-compose.yaml)
│   ├── [eslint.config.mts](./mri/eslint.config.mts)
│   ├── [jest.config.ts](./mri/jest.config.ts)
│   ├── [jest.setup.ts](./mri/jest.setup.ts)
│   ├── [next.config.ts](./mri/next.config.ts)
│   ├── [package.json](./mri/package.json)
│   ├── [playwright.config.ts](./mri/playwright.config.ts)
│   ├── [postcss.config.mjs](./mri/postcss.config.mjs)
│   └── [tsconfig.json](./mri/tsconfig.json)
├── [README.md](./README.md)
└── [TREE.md](./TREE.md)
```

148 directories, 557 files
