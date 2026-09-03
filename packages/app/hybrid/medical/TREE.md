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
│   │   ├── [history.spec.ts](./brainbow/e2e/history.spec.ts)
│   │   ├── [home.spec.ts](./brainbow/e2e/home.spec.ts)
│   │   ├── [viewer.spec.ts](./brainbow/e2e/viewer.spec.ts)
│   │   └── [webviewer.spec.ts](./brainbow/e2e/webviewer.spec.ts)
│   ├── public/
│   │   ├── icons/
│   │   │   ├── [icon-128x128.png](./brainbow/public/icons/icon-128x128.png)
│   │   │   ├── [icon-144x144.png](./brainbow/public/icons/icon-144x144.png)
│   │   │   ├── [icon-152x152.png](./brainbow/public/icons/icon-152x152.png)
│   │   │   ├── [icon-16x16.png](./brainbow/public/icons/icon-16x16.png)
│   │   │   ├── [icon-180x180.png](./brainbow/public/icons/icon-180x180.png)
│   │   │   ├── [icon-192.png](./brainbow/public/icons/icon-192.png)
│   │   │   ├── [icon-192x192.png](./brainbow/public/icons/icon-192x192.png)
│   │   │   ├── [icon-256x256.png](./brainbow/public/icons/icon-256x256.png)
│   │   │   ├── [icon-32x32.png](./brainbow/public/icons/icon-32x32.png)
│   │   │   ├── [icon-384x384.png](./brainbow/public/icons/icon-384x384.png)
│   │   │   ├── [icon-48x48.png](./brainbow/public/icons/icon-48x48.png)
│   │   │   ├── [icon-512.png](./brainbow/public/icons/icon-512.png)
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
│   │   │   ├── [base.css](./brainbow/src/styles/base.css)
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
│   │   │   ├── [128x128.png](./brainbow/src-tauri/icons/128x128.png)
│   │   │   ├── [128x128@2x.png](./brainbow/src-tauri/icons/128x128@2x.png)
│   │   │   ├── [32x32.png](./brainbow/src-tauri/icons/32x32.png)
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
├── eyes/
│   ├── docs/
│   │   ├── [ARCHITECTURE.md](./eyes/docs/ARCHITECTURE.md)
│   │   ├── [CONTRIBUTING.md](./eyes/docs/CONTRIBUTING.md)
│   │   ├── [DOWNLOADS.md](./eyes/docs/DOWNLOADS.md)
│   │   ├── [PACKAGING.md](./eyes/docs/PACKAGING.md)
│   │   └── [ROADMAP.md](./eyes/docs/ROADMAP.md)
│   ├── e2e/
│   │   └── [home.spec.ts](./eyes/e2e/home.spec.ts)
│   ├── public/
│   │   ├── icons/
│   │   │   ├── [icon-128x128.png](./eyes/public/icons/icon-128x128.png)
│   │   │   ├── [icon-144x144.png](./eyes/public/icons/icon-144x144.png)
│   │   │   ├── [icon-152x152.png](./eyes/public/icons/icon-152x152.png)
│   │   │   ├── [icon-16x16.png](./eyes/public/icons/icon-16x16.png)
│   │   │   ├── [icon-180x180.png](./eyes/public/icons/icon-180x180.png)
│   │   │   ├── [icon-192.png](./eyes/public/icons/icon-192.png)
│   │   │   ├── [icon-192x192.png](./eyes/public/icons/icon-192x192.png)
│   │   │   ├── [icon-256x256.png](./eyes/public/icons/icon-256x256.png)
│   │   │   ├── [icon-32x32.png](./eyes/public/icons/icon-32x32.png)
│   │   │   ├── [icon-384x384.png](./eyes/public/icons/icon-384x384.png)
│   │   │   ├── [icon-48x48.png](./eyes/public/icons/icon-48x48.png)
│   │   │   ├── [icon-512.png](./eyes/public/icons/icon-512.png)
│   │   │   ├── [icon-512x512.png](./eyes/public/icons/icon-512x512.png)
│   │   │   ├── [icon-64x64.png](./eyes/public/icons/icon-64x64.png)
│   │   │   ├── [icon-72x72.png](./eyes/public/icons/icon-72x72.png)
│   │   │   ├── [icon-96x96.png](./eyes/public/icons/icon-96x96.png)
│   │   │   └── [icon.svg](./eyes/public/icons/icon.svg)
│   │   ├── [apple-touch-icon.png](./eyes/public/apple-touch-icon.png)
│   │   ├── [favicon.ico](./eyes/public/favicon.ico)
│   │   ├── [manifest.json](./eyes/public/manifest.json)
│   │   ├── [robots.txt](./eyes/public/robots.txt)
│   │   ├── [sitemap.xml](./eyes/public/sitemap.xml)
│   │   └── [sw.js](./eyes/public/sw.js)
│   ├── src/
│   │   ├── app/
│   │   │   ├── (app)/
│   │   │   │   ├── logmar/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./eyes/src/app/(app)/logmar/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./eyes/src/app/(app)/logmar/page.tsx)
│   │   │   │   ├── snellen/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./eyes/src/app/(app)/snellen/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./eyes/src/app/(app)/snellen/page.tsx)
│   │   │   │   └── tumbling-e/
│   │   │   │       ├── __tests__/
│   │   │   │       │   └── [page.test.tsx](./eyes/src/app/(app)/tumbling-e/__tests__/page.test.tsx)
│   │   │   │       └── [page.tsx](./eyes/src/app/(app)/tumbling-e/page.tsx)
│   │   │   ├── (auth)/
│   │   │   │   ├── forget-password/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./eyes/src/app/(auth)/forget-password/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./eyes/src/app/(auth)/forget-password/page.tsx)
│   │   │   │   ├── profile/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./eyes/src/app/(auth)/profile/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./eyes/src/app/(auth)/profile/page.tsx)
│   │   │   │   ├── reset-password/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./eyes/src/app/(auth)/reset-password/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./eyes/src/app/(auth)/reset-password/page.tsx)
│   │   │   │   ├── sign-in/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./eyes/src/app/(auth)/sign-in/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./eyes/src/app/(auth)/sign-in/page.tsx)
│   │   │   │   └── sign-up/
│   │   │   │       ├── __tests__/
│   │   │   │       │   └── [page.test.tsx](./eyes/src/app/(auth)/sign-up/__tests__/page.test.tsx)
│   │   │   │       └── [page.tsx](./eyes/src/app/(auth)/sign-up/page.tsx)
│   │   │   ├── (info)/
│   │   │   │   ├── about/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./eyes/src/app/(info)/about/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./eyes/src/app/(info)/about/page.tsx)
│   │   │   │   ├── downloads/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./eyes/src/app/(info)/downloads/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./eyes/src/app/(info)/downloads/page.tsx)
│   │   │   │   └── version/
│   │   │   │       ├── __tests__/
│   │   │   │       │   └── [page.test.tsx](./eyes/src/app/(info)/version/__tests__/page.test.tsx)
│   │   │   │       └── [page.tsx](./eyes/src/app/(info)/version/page.tsx)
│   │   │   ├── __tests__/
│   │   │   │   ├── [error.test.tsx](./eyes/src/app/__tests__/error.test.tsx)
│   │   │   │   ├── [forbidden.test.tsx](./eyes/src/app/__tests__/forbidden.test.tsx)
│   │   │   │   ├── [global-error.test.tsx](./eyes/src/app/__tests__/global-error.test.tsx)
│   │   │   │   ├── [loading.test.tsx](./eyes/src/app/__tests__/loading.test.tsx)
│   │   │   │   ├── [not-found.test.tsx](./eyes/src/app/__tests__/not-found.test.tsx)
│   │   │   │   ├── [page.test.tsx](./eyes/src/app/__tests__/page.test.tsx)
│   │   │   │   ├── [robots.test.ts](./eyes/src/app/__tests__/robots.test.ts)
│   │   │   │   ├── [template.test.tsx](./eyes/src/app/__tests__/template.test.tsx)
│   │   │   │   └── [unauthorized.test.tsx](./eyes/src/app/__tests__/unauthorized.test.tsx)
│   │   │   ├── [default.tsx](./eyes/src/app/default.tsx)
│   │   │   ├── [error.tsx](./eyes/src/app/error.tsx)
│   │   │   ├── [favicon.ico](./eyes/src/app/favicon.ico)
│   │   │   ├── [forbidden.tsx](./eyes/src/app/forbidden.tsx)
│   │   │   ├── [global-error.tsx](./eyes/src/app/global-error.tsx)
│   │   │   ├── [layout.tsx](./eyes/src/app/layout.tsx)
│   │   │   ├── [loading.tsx](./eyes/src/app/loading.tsx)
│   │   │   ├── [not-found.tsx](./eyes/src/app/not-found.tsx)
│   │   │   ├── [page.tsx](./eyes/src/app/page.tsx)
│   │   │   ├── [robots.ts](./eyes/src/app/robots.ts)
│   │   │   ├── [template.tsx](./eyes/src/app/template.tsx)
│   │   │   └── [unauthorized.tsx](./eyes/src/app/unauthorized.tsx)
│   │   ├── components/
│   │   │   ├── atoms/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [Badge.test.tsx](./eyes/src/components/atoms/__tests__/Badge.test.tsx)
│   │   │   │   │   └── [Button.test.tsx](./eyes/src/components/atoms/__tests__/Button.test.tsx)
│   │   │   │   ├── [Badge.tsx](./eyes/src/components/atoms/Badge.tsx)
│   │   │   │   ├── [Button.tsx](./eyes/src/components/atoms/Button.tsx)
│   │   │   │   └── [OfflineBadge.tsx](./eyes/src/components/atoms/OfflineBadge.tsx)
│   │   │   ├── organisms/
│   │   │   │   ├── LogMARChart/
│   │   │   │   │   ├── utils/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   └── [chart.test.ts](./eyes/src/components/organisms/LogMARChart/utils/__tests__/chart.test.ts)
│   │   │   │   │   │   └── [chart.ts](./eyes/src/components/organisms/LogMARChart/utils/chart.ts)
│   │   │   │   │   ├── [AGENTS.md](./eyes/src/components/organisms/LogMARChart/AGENTS.md)
│   │   │   │   │   ├── [constants.ts](./eyes/src/components/organisms/LogMARChart/constants.ts)
│   │   │   │   │   └── [index.tsx](./eyes/src/components/organisms/LogMARChart/index.tsx)
│   │   │   │   ├── SnellenChart/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [utils.test.ts](./eyes/src/components/organisms/SnellenChart/__tests__/utils.test.ts)
│   │   │   │   │   ├── [AGENTS.md](./eyes/src/components/organisms/SnellenChart/AGENTS.md)
│   │   │   │   │   ├── [index.tsx](./eyes/src/components/organisms/SnellenChart/index.tsx)
│   │   │   │   │   └── [utils.ts](./eyes/src/components/organisms/SnellenChart/utils.ts)
│   │   │   │   ├── TumblingEChart/
│   │   │   │   │   ├── utils/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   └── [chart.test.ts](./eyes/src/components/organisms/TumblingEChart/utils/__tests__/chart.test.ts)
│   │   │   │   │   │   └── [chart.ts](./eyes/src/components/organisms/TumblingEChart/utils/chart.ts)
│   │   │   │   │   ├── [AGENTS.md](./eyes/src/components/organisms/TumblingEChart/AGENTS.md)
│   │   │   │   │   ├── [constants.ts](./eyes/src/components/organisms/TumblingEChart/constants.ts)
│   │   │   │   │   ├── [index.tsx](./eyes/src/components/organisms/TumblingEChart/index.tsx)
│   │   │   │   │   └── [types.ts](./eyes/src/components/organisms/TumblingEChart/types.ts)
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── __snapshots__/
│   │   │   │   │   │   └── [SnellenChart.test.tsx.snap](./eyes/src/components/organisms/__tests__/__snapshots__/SnellenChart.test.tsx.snap)
│   │   │   │   │   ├── [Header.test.tsx](./eyes/src/components/organisms/__tests__/Header.test.tsx)
│   │   │   │   │   ├── [LogMARChart.test.tsx](./eyes/src/components/organisms/__tests__/LogMARChart.test.tsx)
│   │   │   │   │   ├── [SnellenChart.test.tsx](./eyes/src/components/organisms/__tests__/SnellenChart.test.tsx)
│   │   │   │   │   └── [TumblingEChart.test.tsx](./eyes/src/components/organisms/__tests__/TumblingEChart.test.tsx)
│   │   │   │   └── [Header.tsx](./eyes/src/components/organisms/Header.tsx)
│   │   │   └── templates/
│   │   │       ├── __tests__/
│   │   │       │   ├── [AboutTemplate.test.tsx](./eyes/src/components/templates/__tests__/AboutTemplate.test.tsx)
│   │   │       │   ├── [DownloadsTemplate.test.tsx](./eyes/src/components/templates/__tests__/DownloadsTemplate.test.tsx)
│   │   │       │   ├── [ErrorTemplate.test.tsx](./eyes/src/components/templates/__tests__/ErrorTemplate.test.tsx)
│   │   │       │   ├── [HomeTemplate.test.tsx](./eyes/src/components/templates/__tests__/HomeTemplate.test.tsx)
│   │   │       │   └── [VersionTemplate.test.tsx](./eyes/src/components/templates/__tests__/VersionTemplate.test.tsx)
│   │   │       ├── [AboutTemplate.tsx](./eyes/src/components/templates/AboutTemplate.tsx)
│   │   │       ├── [DownloadsTemplate.tsx](./eyes/src/components/templates/DownloadsTemplate.tsx)
│   │   │       ├── [ErrorTemplate.tsx](./eyes/src/components/templates/ErrorTemplate.tsx)
│   │   │       ├── [HomeTemplate.tsx](./eyes/src/components/templates/HomeTemplate.tsx)
│   │   │       └── [VersionTemplate.tsx](./eyes/src/components/templates/VersionTemplate.tsx)
│   │   ├── hooks/
│   │   │   ├── __tests__/
│   │   │   │   ├── [useOffline.test.ts](./eyes/src/hooks/__tests__/useOffline.test.ts)
│   │   │   │   ├── [useSWRegister.test.ts](./eyes/src/hooks/__tests__/useSWRegister.test.ts)
│   │   │   │   └── [useUpdater.test.ts](./eyes/src/hooks/__tests__/useUpdater.test.ts)
│   │   │   ├── [useOffline.ts](./eyes/src/hooks/useOffline.ts)
│   │   │   ├── [useSWRegister.ts](./eyes/src/hooks/useSWRegister.ts)
│   │   │   ├── [useTheme.ts](./eyes/src/hooks/useTheme.ts)
│   │   │   └── [useUpdater.ts](./eyes/src/hooks/useUpdater.ts)
│   │   ├── lib/
│   │   │   └── native/
│   │   │       ├── __tests__/
│   │   │       │   └── [index.test.ts](./eyes/src/lib/native/__tests__/index.test.ts)
│   │   │       └── [index.ts](./eyes/src/lib/native/index.ts)
│   │   ├── providers/
│   │   │   ├── __tests__/
│   │   │   │   ├── [NativeProvider.test.tsx](./eyes/src/providers/__tests__/NativeProvider.test.tsx)
│   │   │   │   └── [SWProvider.test.tsx](./eyes/src/providers/__tests__/SWProvider.test.tsx)
│   │   │   ├── [NativeProvider.tsx](./eyes/src/providers/NativeProvider.tsx)
│   │   │   └── [SWProvider.tsx](./eyes/src/providers/SWProvider.tsx)
│   │   └── styles/
│   │       ├── [base.css](./eyes/src/styles/base.css)
│   │       ├── [globals.css](./eyes/src/styles/globals.css)
│   │       └── [themes.css](./eyes/src/styles/themes.css)
│   ├── src-tauri/
│   │   ├── capabilities/
│   │   │   └── [default.json](./eyes/src-tauri/capabilities/default.json)
│   │   ├── icons/
│   │   │   ├── [128x128.png](./eyes/src-tauri/icons/128x128.png)
│   │   │   ├── [128x128@2x.png](./eyes/src-tauri/icons/128x128@2x.png)
│   │   │   ├── [32x32.png](./eyes/src-tauri/icons/32x32.png)
│   │   │   ├── [64x64.png](./eyes/src-tauri/icons/64x64.png)
│   │   │   ├── [Square107x107Logo.png](./eyes/src-tauri/icons/Square107x107Logo.png)
│   │   │   ├── [Square142x142Logo.png](./eyes/src-tauri/icons/Square142x142Logo.png)
│   │   │   ├── [Square150x150Logo.png](./eyes/src-tauri/icons/Square150x150Logo.png)
│   │   │   ├── [Square284x284Logo.png](./eyes/src-tauri/icons/Square284x284Logo.png)
│   │   │   ├── [Square30x30Logo.png](./eyes/src-tauri/icons/Square30x30Logo.png)
│   │   │   ├── [Square310x310Logo.png](./eyes/src-tauri/icons/Square310x310Logo.png)
│   │   │   ├── [Square44x44Logo.png](./eyes/src-tauri/icons/Square44x44Logo.png)
│   │   │   ├── [Square71x71Logo.png](./eyes/src-tauri/icons/Square71x71Logo.png)
│   │   │   ├── [Square89x89Logo.png](./eyes/src-tauri/icons/Square89x89Logo.png)
│   │   │   ├── [StoreLogo.png](./eyes/src-tauri/icons/StoreLogo.png)
│   │   │   ├── [icon.icns](./eyes/src-tauri/icons/icon.icns)
│   │   │   ├── [icon.ico](./eyes/src-tauri/icons/icon.ico)
│   │   │   └── [icon.png](./eyes/src-tauri/icons/icon.png)
│   │   ├── src/
│   │   │   ├── [lib.rs](./eyes/src-tauri/src/lib.rs)
│   │   │   └── [main.rs](./eyes/src-tauri/src/main.rs)
│   │   ├── [Cargo.lock](./eyes/src-tauri/Cargo.lock)
│   │   ├── [Cargo.toml](./eyes/src-tauri/Cargo.toml)
│   │   ├── [build.rs](./eyes/src-tauri/build.rs)
│   │   └── [tauri.conf.json](./eyes/src-tauri/tauri.conf.json)
│   ├── [AGENTS.md](./eyes/AGENTS.md)
│   ├── [Dockerfile](./eyes/Dockerfile)
│   ├── [LICENSE](./eyes/LICENSE)
│   ├── [docker-compose.yaml](./eyes/docker-compose.yaml)
│   ├── [eslint.config.mts](./eyes/eslint.config.mts)
│   ├── [jest.config.ts](./eyes/jest.config.ts)
│   ├── [jest.setup.ts](./eyes/jest.setup.ts)
│   ├── [next.config.ts](./eyes/next.config.ts)
│   ├── [package.json](./eyes/package.json)
│   ├── [playwright.config.ts](./eyes/playwright.config.ts)
│   ├── [postcss.config.mjs](./eyes/postcss.config.mjs)
│   └── [tsconfig.json](./eyes/tsconfig.json)
├── mri/
│   ├── docs/
│   │   ├── [ARCHITECTURE.md](./mri/docs/ARCHITECTURE.md)
│   │   ├── [CONTRIBUTING.md](./mri/docs/CONTRIBUTING.md)
│   │   ├── [DOWNLOADS.md](./mri/docs/DOWNLOADS.md)
│   │   ├── [PACKAGING.md](./mri/docs/PACKAGING.md)
│   │   └── [ROADMAP.md](./mri/docs/ROADMAP.md)
│   ├── e2e/
│   │   └── [home.spec.ts](./mri/e2e/home.spec.ts)
│   ├── public/
│   │   ├── icons/
│   │   │   ├── [icon-128x128.png](./mri/public/icons/icon-128x128.png)
│   │   │   ├── [icon-144x144.png](./mri/public/icons/icon-144x144.png)
│   │   │   ├── [icon-152x152.png](./mri/public/icons/icon-152x152.png)
│   │   │   ├── [icon-16x16.png](./mri/public/icons/icon-16x16.png)
│   │   │   ├── [icon-180x180.png](./mri/public/icons/icon-180x180.png)
│   │   │   ├── [icon-192.png](./mri/public/icons/icon-192.png)
│   │   │   ├── [icon-192x192.png](./mri/public/icons/icon-192x192.png)
│   │   │   ├── [icon-256x256.png](./mri/public/icons/icon-256x256.png)
│   │   │   ├── [icon-32x32.png](./mri/public/icons/icon-32x32.png)
│   │   │   ├── [icon-384x384.png](./mri/public/icons/icon-384x384.png)
│   │   │   ├── [icon-48x48.png](./mri/public/icons/icon-48x48.png)
│   │   │   ├── [icon-512.png](./mri/public/icons/icon-512.png)
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
│   │   ├── hooks/
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
│   │   ├── providers/
│   │   └── styles/
│   │       ├── [base.css](./mri/src/styles/base.css)
│   │       ├── [globals.css](./mri/src/styles/globals.css)
│   │       └── [themes.css](./mri/src/styles/themes.css)
│   ├── src-tauri/
│   │   ├── capabilities/
│   │   │   └── [default.json](./mri/src-tauri/capabilities/default.json)
│   │   ├── icons/
│   │   │   ├── [128x128.png](./mri/src-tauri/icons/128x128.png)
│   │   │   ├── [128x128@2x.png](./mri/src-tauri/icons/128x128@2x.png)
│   │   │   ├── [32x32.png](./mri/src-tauri/icons/32x32.png)
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
├── psychology/
│   ├── docs/
│   │   ├── [ARCHITECTURE.md](./psychology/docs/ARCHITECTURE.md)
│   │   ├── [CONTRIBUTING.md](./psychology/docs/CONTRIBUTING.md)
│   │   ├── [DOWNLOADS.md](./psychology/docs/DOWNLOADS.md)
│   │   ├── [PACKAGING.md](./psychology/docs/PACKAGING.md)
│   │   └── [ROADMAP.md](./psychology/docs/ROADMAP.md)
│   ├── e2e/
│   │   └── [home.spec.ts](./psychology/e2e/home.spec.ts)
│   ├── public/
│   │   ├── icons/
│   │   │   ├── [icon-128x128.png](./psychology/public/icons/icon-128x128.png)
│   │   │   ├── [icon-144x144.png](./psychology/public/icons/icon-144x144.png)
│   │   │   ├── [icon-152x152.png](./psychology/public/icons/icon-152x152.png)
│   │   │   ├── [icon-16x16.png](./psychology/public/icons/icon-16x16.png)
│   │   │   ├── [icon-180x180.png](./psychology/public/icons/icon-180x180.png)
│   │   │   ├── [icon-192.png](./psychology/public/icons/icon-192.png)
│   │   │   ├── [icon-192x192.png](./psychology/public/icons/icon-192x192.png)
│   │   │   ├── [icon-256x256.png](./psychology/public/icons/icon-256x256.png)
│   │   │   ├── [icon-32x32.png](./psychology/public/icons/icon-32x32.png)
│   │   │   ├── [icon-384x384.png](./psychology/public/icons/icon-384x384.png)
│   │   │   ├── [icon-48x48.png](./psychology/public/icons/icon-48x48.png)
│   │   │   ├── [icon-512.png](./psychology/public/icons/icon-512.png)
│   │   │   ├── [icon-512x512.png](./psychology/public/icons/icon-512x512.png)
│   │   │   ├── [icon-64x64.png](./psychology/public/icons/icon-64x64.png)
│   │   │   ├── [icon-72x72.png](./psychology/public/icons/icon-72x72.png)
│   │   │   ├── [icon-96x96.png](./psychology/public/icons/icon-96x96.png)
│   │   │   └── [icon.svg](./psychology/public/icons/icon.svg)
│   │   ├── [apple-touch-icon.png](./psychology/public/apple-touch-icon.png)
│   │   ├── [favicon.ico](./psychology/public/favicon.ico)
│   │   ├── [manifest.json](./psychology/public/manifest.json)
│   │   ├── [robots.txt](./psychology/public/robots.txt)
│   │   ├── [sitemap.xml](./psychology/public/sitemap.xml)
│   │   └── [sw.js](./psychology/public/sw.js)
│   ├── src/
│   │   ├── app/
│   │   │   ├── (auth)/
│   │   │   │   ├── forget-password/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./psychology/src/app/(auth)/forget-password/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./psychology/src/app/(auth)/forget-password/page.tsx)
│   │   │   │   ├── profile/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./psychology/src/app/(auth)/profile/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./psychology/src/app/(auth)/profile/page.tsx)
│   │   │   │   ├── reset-password/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./psychology/src/app/(auth)/reset-password/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./psychology/src/app/(auth)/reset-password/page.tsx)
│   │   │   │   ├── sign-in/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./psychology/src/app/(auth)/sign-in/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./psychology/src/app/(auth)/sign-in/page.tsx)
│   │   │   │   └── sign-up/
│   │   │   │       ├── __tests__/
│   │   │   │       │   └── [page.test.tsx](./psychology/src/app/(auth)/sign-up/__tests__/page.test.tsx)
│   │   │   │       └── [page.tsx](./psychology/src/app/(auth)/sign-up/page.tsx)
│   │   │   ├── (info)/
│   │   │   │   ├── about/
│   │   │   │   │   └── [page.tsx](./psychology/src/app/(info)/about/page.tsx)
│   │   │   │   ├── downloads/
│   │   │   │   │   └── [page.tsx](./psychology/src/app/(info)/downloads/page.tsx)
│   │   │   │   └── version/
│   │   │   │       └── [page.tsx](./psychology/src/app/(info)/version/page.tsx)
│   │   │   ├── __tests__/
│   │   │   │   ├── [error.test.tsx](./psychology/src/app/__tests__/error.test.tsx)
│   │   │   │   ├── [forbidden.test.tsx](./psychology/src/app/__tests__/forbidden.test.tsx)
│   │   │   │   ├── [global-error.test.tsx](./psychology/src/app/__tests__/global-error.test.tsx)
│   │   │   │   ├── [layout.test.tsx](./psychology/src/app/__tests__/layout.test.tsx)
│   │   │   │   ├── [loading.test.tsx](./psychology/src/app/__tests__/loading.test.tsx)
│   │   │   │   ├── [not-found.test.tsx](./psychology/src/app/__tests__/not-found.test.tsx)
│   │   │   │   ├── [page.test.tsx](./psychology/src/app/__tests__/page.test.tsx)
│   │   │   │   ├── [robots.test.ts](./psychology/src/app/__tests__/robots.test.ts)
│   │   │   │   ├── [template.test.tsx](./psychology/src/app/__tests__/template.test.tsx)
│   │   │   │   └── [unauthorized.test.tsx](./psychology/src/app/__tests__/unauthorized.test.tsx)
│   │   │   ├── beck-depression-inventory/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [page.test.tsx](./psychology/src/app/beck-depression-inventory/__tests__/page.test.tsx)
│   │   │   │   └── [page.tsx](./psychology/src/app/beck-depression-inventory/page.tsx)
│   │   │   ├── big-five-inventory/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [page.test.tsx](./psychology/src/app/big-five-inventory/__tests__/page.test.tsx)
│   │   │   │   └── [page.tsx](./psychology/src/app/big-five-inventory/page.tsx)
│   │   │   ├── dyadic-adjustment-scale/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [page.test.tsx](./psychology/src/app/dyadic-adjustment-scale/__tests__/page.test.tsx)
│   │   │   │   └── [page.tsx](./psychology/src/app/dyadic-adjustment-scale/page.tsx)
│   │   │   ├── experiences-in-close-relationships/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [page.test.tsx](./psychology/src/app/experiences-in-close-relationships/__tests__/page.test.tsx)
│   │   │   │   └── [page.tsx](./psychology/src/app/experiences-in-close-relationships/page.tsx)
│   │   │   ├── generalized-anxiety-disorder/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [page.test.tsx](./psychology/src/app/generalized-anxiety-disorder/__tests__/page.test.tsx)
│   │   │   │   └── [page.tsx](./psychology/src/app/generalized-anxiety-disorder/page.tsx)
│   │   │   ├── patient-health-questionnaire/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [page.test.tsx](./psychology/src/app/patient-health-questionnaire/__tests__/page.test.tsx)
│   │   │   │   └── [page.tsx](./psychology/src/app/patient-health-questionnaire/page.tsx)
│   │   │   ├── relationship-closeness-inventory/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [page.test.tsx](./psychology/src/app/relationship-closeness-inventory/__tests__/page.test.tsx)
│   │   │   │   └── [page.tsx](./psychology/src/app/relationship-closeness-inventory/page.tsx)
│   │   │   ├── satisfaction-with-life/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [page.test.tsx](./psychology/src/app/satisfaction-with-life/__tests__/page.test.tsx)
│   │   │   │   └── [page.tsx](./psychology/src/app/satisfaction-with-life/page.tsx)
│   │   │   ├── [default.tsx](./psychology/src/app/default.tsx)
│   │   │   ├── [error.tsx](./psychology/src/app/error.tsx)
│   │   │   ├── [favicon.ico](./psychology/src/app/favicon.ico)
│   │   │   ├── [forbidden.tsx](./psychology/src/app/forbidden.tsx)
│   │   │   ├── [global-error.tsx](./psychology/src/app/global-error.tsx)
│   │   │   ├── [layout.tsx](./psychology/src/app/layout.tsx)
│   │   │   ├── [loading.tsx](./psychology/src/app/loading.tsx)
│   │   │   ├── [not-found.tsx](./psychology/src/app/not-found.tsx)
│   │   │   ├── [page.tsx](./psychology/src/app/page.tsx)
│   │   │   ├── [robots.ts](./psychology/src/app/robots.ts)
│   │   │   ├── [template.tsx](./psychology/src/app/template.tsx)
│   │   │   └── [unauthorized.tsx](./psychology/src/app/unauthorized.tsx)
│   │   ├── components/
│   │   │   ├── atoms/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [Badge.test.tsx](./psychology/src/components/atoms/__tests__/Badge.test.tsx)
│   │   │   │   │   └── [Button.test.tsx](./psychology/src/components/atoms/__tests__/Button.test.tsx)
│   │   │   │   ├── [Badge.tsx](./psychology/src/components/atoms/Badge.tsx)
│   │   │   │   ├── [Button.tsx](./psychology/src/components/atoms/Button.tsx)
│   │   │   │   └── [OfflineBadge.tsx](./psychology/src/components/atoms/OfflineBadge.tsx)
│   │   │   ├── scales/
│   │   │   │   ├── BeckDepressionInventory/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [index.test.tsx](./psychology/src/components/scales/BeckDepressionInventory/__tests__/index.test.tsx)
│   │   │   │   │   │   └── [utils.test.ts](./psychology/src/components/scales/BeckDepressionInventory/__tests__/utils.test.ts)
│   │   │   │   │   ├── components/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [OptionsStep.test.tsx](./psychology/src/components/scales/BeckDepressionInventory/components/__tests__/OptionsStep.test.tsx)
│   │   │   │   │   │   │   └── [ResultsStep.test.tsx](./psychology/src/components/scales/BeckDepressionInventory/components/__tests__/ResultsStep.test.tsx)
│   │   │   │   │   │   ├── [OptionsStep.tsx](./psychology/src/components/scales/BeckDepressionInventory/components/OptionsStep.tsx)
│   │   │   │   │   │   └── [ResultsStep.tsx](./psychology/src/components/scales/BeckDepressionInventory/components/ResultsStep.tsx)
│   │   │   │   │   ├── docs/
│   │   │   │   │   │   └── [beck-depression-inventory.md](./psychology/src/components/scales/BeckDepressionInventory/docs/beck-depression-inventory.md)
│   │   │   │   │   ├── [AGENTS.md](./psychology/src/components/scales/BeckDepressionInventory/AGENTS.md)
│   │   │   │   │   ├── [index.tsx](./psychology/src/components/scales/BeckDepressionInventory/index.tsx)
│   │   │   │   │   ├── [items.ts](./psychology/src/components/scales/BeckDepressionInventory/items.ts)
│   │   │   │   │   └── [utils.ts](./psychology/src/components/scales/BeckDepressionInventory/utils.ts)
│   │   │   │   ├── BigFiveInventory/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [index.test.tsx](./psychology/src/components/scales/BigFiveInventory/__tests__/index.test.tsx)
│   │   │   │   │   │   └── [utils.test.ts](./psychology/src/components/scales/BigFiveInventory/__tests__/utils.test.ts)
│   │   │   │   │   ├── components/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [AgreeStep.test.tsx](./psychology/src/components/scales/BigFiveInventory/components/__tests__/AgreeStep.test.tsx)
│   │   │   │   │   │   │   └── [ResultsStep.test.tsx](./psychology/src/components/scales/BigFiveInventory/components/__tests__/ResultsStep.test.tsx)
│   │   │   │   │   │   ├── [AgreeStep.tsx](./psychology/src/components/scales/BigFiveInventory/components/AgreeStep.tsx)
│   │   │   │   │   │   └── [ResultsStep.tsx](./psychology/src/components/scales/BigFiveInventory/components/ResultsStep.tsx)
│   │   │   │   │   ├── docs/
│   │   │   │   │   │   └── [big-five-inventory.md](./psychology/src/components/scales/BigFiveInventory/docs/big-five-inventory.md)
│   │   │   │   │   ├── [AGENTS.md](./psychology/src/components/scales/BigFiveInventory/AGENTS.md)
│   │   │   │   │   ├── [index.tsx](./psychology/src/components/scales/BigFiveInventory/index.tsx)
│   │   │   │   │   └── [utils.ts](./psychology/src/components/scales/BigFiveInventory/utils.ts)
│   │   │   │   ├── DyadicAdjustmentScale/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [index.test.tsx](./psychology/src/components/scales/DyadicAdjustmentScale/__tests__/index.test.tsx)
│   │   │   │   │   │   └── [utils.test.ts](./psychology/src/components/scales/DyadicAdjustmentScale/__tests__/utils.test.ts)
│   │   │   │   │   ├── components/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [OptionsStep.test.tsx](./psychology/src/components/scales/DyadicAdjustmentScale/components/__tests__/OptionsStep.test.tsx)
│   │   │   │   │   │   │   └── [ResultsStep.test.tsx](./psychology/src/components/scales/DyadicAdjustmentScale/components/__tests__/ResultsStep.test.tsx)
│   │   │   │   │   │   ├── [OptionsStep.tsx](./psychology/src/components/scales/DyadicAdjustmentScale/components/OptionsStep.tsx)
│   │   │   │   │   │   └── [ResultsStep.tsx](./psychology/src/components/scales/DyadicAdjustmentScale/components/ResultsStep.tsx)
│   │   │   │   │   ├── docs/
│   │   │   │   │   │   └── [dyadic-adjustment-scale.md](./psychology/src/components/scales/DyadicAdjustmentScale/docs/dyadic-adjustment-scale.md)
│   │   │   │   │   ├── [AGENTS.md](./psychology/src/components/scales/DyadicAdjustmentScale/AGENTS.md)
│   │   │   │   │   ├── [index.tsx](./psychology/src/components/scales/DyadicAdjustmentScale/index.tsx)
│   │   │   │   │   └── [utils.ts](./psychology/src/components/scales/DyadicAdjustmentScale/utils.ts)
│   │   │   │   ├── ExperiencesInCloseRelationships/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [index.test.tsx](./psychology/src/components/scales/ExperiencesInCloseRelationships/__tests__/index.test.tsx)
│   │   │   │   │   │   └── [utils.test.ts](./psychology/src/components/scales/ExperiencesInCloseRelationships/__tests__/utils.test.ts)
│   │   │   │   │   ├── components/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [ResultsStep.test.tsx](./psychology/src/components/scales/ExperiencesInCloseRelationships/components/__tests__/ResultsStep.test.tsx)
│   │   │   │   │   │   │   └── [ScaleStep.test.tsx](./psychology/src/components/scales/ExperiencesInCloseRelationships/components/__tests__/ScaleStep.test.tsx)
│   │   │   │   │   │   ├── [ResultsStep.tsx](./psychology/src/components/scales/ExperiencesInCloseRelationships/components/ResultsStep.tsx)
│   │   │   │   │   │   └── [ScaleStep.tsx](./psychology/src/components/scales/ExperiencesInCloseRelationships/components/ScaleStep.tsx)
│   │   │   │   │   ├── docs/
│   │   │   │   │   │   └── [experiences-in-close-relationships.md](./psychology/src/components/scales/ExperiencesInCloseRelationships/docs/experiences-in-close-relationships.md)
│   │   │   │   │   ├── [AGENTS.md](./psychology/src/components/scales/ExperiencesInCloseRelationships/AGENTS.md)
│   │   │   │   │   ├── [index.tsx](./psychology/src/components/scales/ExperiencesInCloseRelationships/index.tsx)
│   │   │   │   │   └── [utils.ts](./psychology/src/components/scales/ExperiencesInCloseRelationships/utils.ts)
│   │   │   │   ├── GeneralizedAnxietyDisorderScale/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [index.test.tsx](./psychology/src/components/scales/GeneralizedAnxietyDisorderScale/__tests__/index.test.tsx)
│   │   │   │   │   │   └── [utils.test.ts](./psychology/src/components/scales/GeneralizedAnxietyDisorderScale/__tests__/utils.test.ts)
│   │   │   │   │   ├── components/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [FrequencyStep.test.tsx](./psychology/src/components/scales/GeneralizedAnxietyDisorderScale/components/__tests__/FrequencyStep.test.tsx)
│   │   │   │   │   │   │   └── [ResultsStep.test.tsx](./psychology/src/components/scales/GeneralizedAnxietyDisorderScale/components/__tests__/ResultsStep.test.tsx)
│   │   │   │   │   │   ├── [FrequencyStep.tsx](./psychology/src/components/scales/GeneralizedAnxietyDisorderScale/components/FrequencyStep.tsx)
│   │   │   │   │   │   └── [ResultsStep.tsx](./psychology/src/components/scales/GeneralizedAnxietyDisorderScale/components/ResultsStep.tsx)
│   │   │   │   │   ├── docs/
│   │   │   │   │   │   └── [generalized-anxiety-disorder-scale.md](./psychology/src/components/scales/GeneralizedAnxietyDisorderScale/docs/generalized-anxiety-disorder-scale.md)
│   │   │   │   │   ├── [AGENTS.md](./psychology/src/components/scales/GeneralizedAnxietyDisorderScale/AGENTS.md)
│   │   │   │   │   ├── [index.tsx](./psychology/src/components/scales/GeneralizedAnxietyDisorderScale/index.tsx)
│   │   │   │   │   └── [utils.ts](./psychology/src/components/scales/GeneralizedAnxietyDisorderScale/utils.ts)
│   │   │   │   ├── PatientHealthQuestionnaire/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [index.test.tsx](./psychology/src/components/scales/PatientHealthQuestionnaire/__tests__/index.test.tsx)
│   │   │   │   │   │   └── [utils.test.ts](./psychology/src/components/scales/PatientHealthQuestionnaire/__tests__/utils.test.ts)
│   │   │   │   │   ├── components/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [FrequencyStep.test.tsx](./psychology/src/components/scales/PatientHealthQuestionnaire/components/__tests__/FrequencyStep.test.tsx)
│   │   │   │   │   │   │   └── [ResultsStep.test.tsx](./psychology/src/components/scales/PatientHealthQuestionnaire/components/__tests__/ResultsStep.test.tsx)
│   │   │   │   │   │   ├── [FrequencyStep.tsx](./psychology/src/components/scales/PatientHealthQuestionnaire/components/FrequencyStep.tsx)
│   │   │   │   │   │   └── [ResultsStep.tsx](./psychology/src/components/scales/PatientHealthQuestionnaire/components/ResultsStep.tsx)
│   │   │   │   │   ├── docs/
│   │   │   │   │   │   └── [patient-health-questionnaire.md](./psychology/src/components/scales/PatientHealthQuestionnaire/docs/patient-health-questionnaire.md)
│   │   │   │   │   ├── [AGENTS.md](./psychology/src/components/scales/PatientHealthQuestionnaire/AGENTS.md)
│   │   │   │   │   ├── [index.tsx](./psychology/src/components/scales/PatientHealthQuestionnaire/index.tsx)
│   │   │   │   │   └── [utils.ts](./psychology/src/components/scales/PatientHealthQuestionnaire/utils.ts)
│   │   │   │   ├── RelationshipClosenessInventory/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   ├── [index.test.tsx](./psychology/src/components/scales/RelationshipClosenessInventory/__tests__/index.test.tsx)
│   │   │   │   │   │   └── [utils.test.ts](./psychology/src/components/scales/RelationshipClosenessInventory/__tests__/utils.test.ts)
│   │   │   │   │   ├── components/
│   │   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   │   ├── [ActivitiesStep.test.tsx](./psychology/src/components/scales/RelationshipClosenessInventory/components/__tests__/ActivitiesStep.test.tsx)
│   │   │   │   │   │   │   ├── [ResultsStep.test.tsx](./psychology/src/components/scales/RelationshipClosenessInventory/components/__tests__/ResultsStep.test.tsx)
│   │   │   │   │   │   │   └── [TimeStep.test.tsx](./psychology/src/components/scales/RelationshipClosenessInventory/components/__tests__/TimeStep.test.tsx)
│   │   │   │   │   │   ├── [ActivitiesStep.tsx](./psychology/src/components/scales/RelationshipClosenessInventory/components/ActivitiesStep.tsx)
│   │   │   │   │   │   ├── [ResultsStep.tsx](./psychology/src/components/scales/RelationshipClosenessInventory/components/ResultsStep.tsx)
│   │   │   │   │   │   ├── [ScaleStep.tsx](./psychology/src/components/scales/RelationshipClosenessInventory/components/ScaleStep.tsx)
│   │   │   │   │   │   └── [TimeStep.tsx](./psychology/src/components/scales/RelationshipClosenessInventory/components/TimeStep.tsx)
│   │   │   │   │   ├── docs/
│   │   │   │   │   │   └── [relationship-closeness-inventory-revised.md](./psychology/src/components/scales/RelationshipClosenessInventory/docs/relationship-closeness-inventory-revised.md)
│   │   │   │   │   ├── [AGENTS.md](./psychology/src/components/scales/RelationshipClosenessInventory/AGENTS.md)
│   │   │   │   │   ├── [index.tsx](./psychology/src/components/scales/RelationshipClosenessInventory/index.tsx)
│   │   │   │   │   └── [utils.ts](./psychology/src/components/scales/RelationshipClosenessInventory/utils.ts)
│   │   │   │   └── SatisfactionWithLifeScale/
│   │   │   │       ├── __tests__/
│   │   │   │       │   ├── [index.test.tsx](./psychology/src/components/scales/SatisfactionWithLifeScale/__tests__/index.test.tsx)
│   │   │   │       │   └── [utils.test.ts](./psychology/src/components/scales/SatisfactionWithLifeScale/__tests__/utils.test.ts)
│   │   │   │       ├── components/
│   │   │   │       │   ├── [ResultsStep.tsx](./psychology/src/components/scales/SatisfactionWithLifeScale/components/ResultsStep.tsx)
│   │   │   │       │   └── [ScaleStep.tsx](./psychology/src/components/scales/SatisfactionWithLifeScale/components/ScaleStep.tsx)
│   │   │   │       ├── docs/
│   │   │   │       │   └── [satisfacition-with-life-scale.md](./psychology/src/components/scales/SatisfactionWithLifeScale/docs/satisfacition-with-life-scale.md)
│   │   │   │       ├── [AGENTS.md](./psychology/src/components/scales/SatisfactionWithLifeScale/AGENTS.md)
│   │   │   │       ├── [index.tsx](./psychology/src/components/scales/SatisfactionWithLifeScale/index.tsx)
│   │   │   │       └── [utils.ts](./psychology/src/components/scales/SatisfactionWithLifeScale/utils.ts)
│   │   │   └── templates/
│   │   │       ├── __tests__/
│   │   │       │   ├── [AboutTemplate.test.tsx](./psychology/src/components/templates/__tests__/AboutTemplate.test.tsx)
│   │   │       │   ├── [DownloadsTemplate.test.tsx](./psychology/src/components/templates/__tests__/DownloadsTemplate.test.tsx)
│   │   │       │   ├── [ErrorTemplate.test.tsx](./psychology/src/components/templates/__tests__/ErrorTemplate.test.tsx)
│   │   │       │   ├── [HomeTemplate.test.tsx](./psychology/src/components/templates/__tests__/HomeTemplate.test.tsx)
│   │   │       │   ├── [ToolTemplate.test.tsx](./psychology/src/components/templates/__tests__/ToolTemplate.test.tsx)
│   │   │       │   └── [VersionTemplate.test.tsx](./psychology/src/components/templates/__tests__/VersionTemplate.test.tsx)
│   │   │       ├── [AboutTemplate.tsx](./psychology/src/components/templates/AboutTemplate.tsx)
│   │   │       ├── [DownloadsTemplate.tsx](./psychology/src/components/templates/DownloadsTemplate.tsx)
│   │   │       ├── [ErrorTemplate.tsx](./psychology/src/components/templates/ErrorTemplate.tsx)
│   │   │       ├── [HomeTemplate.tsx](./psychology/src/components/templates/HomeTemplate.tsx)
│   │   │       ├── [ToolTemplate.tsx](./psychology/src/components/templates/ToolTemplate.tsx)
│   │   │       └── [VersionTemplate.tsx](./psychology/src/components/templates/VersionTemplate.tsx)
│   │   ├── hooks/
│   │   │   ├── __tests__/
│   │   │   │   ├── [useOffline.test.ts](./psychology/src/hooks/__tests__/useOffline.test.ts)
│   │   │   │   ├── [useSWRegister.test.ts](./psychology/src/hooks/__tests__/useSWRegister.test.ts)
│   │   │   │   └── [useUpdater.test.ts](./psychology/src/hooks/__tests__/useUpdater.test.ts)
│   │   │   ├── [useOffline.ts](./psychology/src/hooks/useOffline.ts)
│   │   │   ├── [useSWRegister.ts](./psychology/src/hooks/useSWRegister.ts)
│   │   │   └── [useUpdater.ts](./psychology/src/hooks/useUpdater.ts)
│   │   ├── lib/
│   │   │   └── native/
│   │   │       ├── __tests__/
│   │   │       │   └── [index.test.ts](./psychology/src/lib/native/__tests__/index.test.ts)
│   │   │       └── [index.ts](./psychology/src/lib/native/index.ts)
│   │   ├── providers/
│   │   │   ├── __tests__/
│   │   │   │   ├── [NativeProvider.test.tsx](./psychology/src/providers/__tests__/NativeProvider.test.tsx)
│   │   │   │   └── [SWProvider.test.tsx](./psychology/src/providers/__tests__/SWProvider.test.tsx)
│   │   │   ├── [NativeProvider.tsx](./psychology/src/providers/NativeProvider.tsx)
│   │   │   └── [SWProvider.tsx](./psychology/src/providers/SWProvider.tsx)
│   │   └── styles/
│   │       ├── [base.css](./psychology/src/styles/base.css)
│   │       ├── [globals.css](./psychology/src/styles/globals.css)
│   │       └── [themes.css](./psychology/src/styles/themes.css)
│   ├── src-tauri/
│   │   ├── capabilities/
│   │   │   └── [default.json](./psychology/src-tauri/capabilities/default.json)
│   │   ├── icons/
│   │   │   ├── [128x128.png](./psychology/src-tauri/icons/128x128.png)
│   │   │   ├── [128x128@2x.png](./psychology/src-tauri/icons/128x128@2x.png)
│   │   │   ├── [32x32.png](./psychology/src-tauri/icons/32x32.png)
│   │   │   ├── [64x64.png](./psychology/src-tauri/icons/64x64.png)
│   │   │   ├── [Square107x107Logo.png](./psychology/src-tauri/icons/Square107x107Logo.png)
│   │   │   ├── [Square142x142Logo.png](./psychology/src-tauri/icons/Square142x142Logo.png)
│   │   │   ├── [Square150x150Logo.png](./psychology/src-tauri/icons/Square150x150Logo.png)
│   │   │   ├── [Square284x284Logo.png](./psychology/src-tauri/icons/Square284x284Logo.png)
│   │   │   ├── [Square30x30Logo.png](./psychology/src-tauri/icons/Square30x30Logo.png)
│   │   │   ├── [Square310x310Logo.png](./psychology/src-tauri/icons/Square310x310Logo.png)
│   │   │   ├── [Square44x44Logo.png](./psychology/src-tauri/icons/Square44x44Logo.png)
│   │   │   ├── [Square71x71Logo.png](./psychology/src-tauri/icons/Square71x71Logo.png)
│   │   │   ├── [Square89x89Logo.png](./psychology/src-tauri/icons/Square89x89Logo.png)
│   │   │   ├── [StoreLogo.png](./psychology/src-tauri/icons/StoreLogo.png)
│   │   │   ├── [icon.icns](./psychology/src-tauri/icons/icon.icns)
│   │   │   ├── [icon.ico](./psychology/src-tauri/icons/icon.ico)
│   │   │   └── [icon.png](./psychology/src-tauri/icons/icon.png)
│   │   ├── src/
│   │   │   ├── [lib.rs](./psychology/src-tauri/src/lib.rs)
│   │   │   └── [main.rs](./psychology/src-tauri/src/main.rs)
│   │   ├── [Cargo.lock](./psychology/src-tauri/Cargo.lock)
│   │   ├── [Cargo.toml](./psychology/src-tauri/Cargo.toml)
│   │   ├── [build.rs](./psychology/src-tauri/build.rs)
│   │   └── [tauri.conf.json](./psychology/src-tauri/tauri.conf.json)
│   ├── [AGENTS.md](./psychology/AGENTS.md)
│   ├── [Dockerfile](./psychology/Dockerfile)
│   ├── [LICENSE](./psychology/LICENSE)
│   ├── [docker-compose.yaml](./psychology/docker-compose.yaml)
│   ├── [eslint.config.mts](./psychology/eslint.config.mts)
│   ├── [jest.config.ts](./psychology/jest.config.ts)
│   ├── [jest.setup.ts](./psychology/jest.setup.ts)
│   ├── [next.config.ts](./psychology/next.config.ts)
│   ├── [package.json](./psychology/package.json)
│   ├── [playwright.config.ts](./psychology/playwright.config.ts)
│   ├── [postcss.config.mjs](./psychology/postcss.config.mjs)
│   └── [tsconfig.json](./psychology/tsconfig.json)
├── [README.md](./README.md)
└── [TREE.md](./TREE.md)
```

284 directories, 856 files
