# TREE

```text
├── photo/
│   ├── docs/
│   │   ├── [ARCHITECTURE.md](./photo/docs/ARCHITECTURE.md)
│   │   ├── [CONTRIBUTING.md](./photo/docs/CONTRIBUTING.md)
│   │   ├── [DOWNLOADS.md](./photo/docs/DOWNLOADS.md)
│   │   ├── [PACKAGING.md](./photo/docs/PACKAGING.md)
│   │   └── [ROADMAP.md](./photo/docs/ROADMAP.md)
│   ├── e2e/
│   │   ├── [about.spec.ts](./photo/e2e/about.spec.ts)
│   │   ├── [albums.spec.ts](./photo/e2e/albums.spec.ts)
│   │   ├── [crop.spec.ts](./photo/e2e/crop.spec.ts)
│   │   ├── [edit.spec.ts](./photo/e2e/edit.spec.ts)
│   │   ├── [home.spec.ts](./photo/e2e/home.spec.ts)
│   │   ├── [layers.spec.ts](./photo/e2e/layers.spec.ts)
│   │   ├── [navigation.spec.ts](./photo/e2e/navigation.spec.ts)
│   │   ├── [profile.spec.ts](./photo/e2e/profile.spec.ts)
│   │   ├── [settings.spec.ts](./photo/e2e/settings.spec.ts)
│   │   └── [version.spec.ts](./photo/e2e/version.spec.ts)
│   ├── public/
│   │   ├── icons/
│   │   │   ├── [icon-128x128.png](./photo/public/icons/icon-128x128.png)
│   │   │   ├── [icon-144x144.png](./photo/public/icons/icon-144x144.png)
│   │   │   ├── [icon-152x152.png](./photo/public/icons/icon-152x152.png)
│   │   │   ├── [icon-16x16.png](./photo/public/icons/icon-16x16.png)
│   │   │   ├── [icon-180x180.png](./photo/public/icons/icon-180x180.png)
│   │   │   ├── [icon-192x192.png](./photo/public/icons/icon-192x192.png)
│   │   │   ├── [icon-256x256.png](./photo/public/icons/icon-256x256.png)
│   │   │   ├── [icon-32x32.png](./photo/public/icons/icon-32x32.png)
│   │   │   ├── [icon-384x384.png](./photo/public/icons/icon-384x384.png)
│   │   │   ├── [icon-48x48.png](./photo/public/icons/icon-48x48.png)
│   │   │   ├── [icon-512x512.png](./photo/public/icons/icon-512x512.png)
│   │   │   ├── [icon-64x64.png](./photo/public/icons/icon-64x64.png)
│   │   │   ├── [icon-72x72.png](./photo/public/icons/icon-72x72.png)
│   │   │   ├── [icon-96x96.png](./photo/public/icons/icon-96x96.png)
│   │   │   └── [icon.svg](./photo/public/icons/icon.svg)
│   │   ├── [apple-touch-icon.png](./photo/public/apple-touch-icon.png)
│   │   ├── [favicon.ico](./photo/public/favicon.ico)
│   │   ├── [manifest.json](./photo/public/manifest.json)
│   │   ├── [robots.txt](./photo/public/robots.txt)
│   │   ├── [sitemap.xml](./photo/public/sitemap.xml)
│   │   └── [sw.js](./photo/public/sw.js)
│   ├── src/
│   │   ├── app/
│   │   │   ├── (auth)/
│   │   │   │   ├── forget-password/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./photo/src/app/(auth)/forget-password/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./photo/src/app/(auth)/forget-password/page.tsx)
│   │   │   │   ├── profile/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./photo/src/app/(auth)/profile/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./photo/src/app/(auth)/profile/page.tsx)
│   │   │   │   ├── reset-password/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./photo/src/app/(auth)/reset-password/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./photo/src/app/(auth)/reset-password/page.tsx)
│   │   │   │   ├── sign-in/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./photo/src/app/(auth)/sign-in/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./photo/src/app/(auth)/sign-in/page.tsx)
│   │   │   │   └── sign-up/
│   │   │   │       ├── __tests__/
│   │   │   │       │   └── [page.test.tsx](./photo/src/app/(auth)/sign-up/__tests__/page.test.tsx)
│   │   │   │       └── [page.tsx](./photo/src/app/(auth)/sign-up/page.tsx)
│   │   │   ├── (info)/
│   │   │   │   ├── about/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./photo/src/app/(info)/about/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./photo/src/app/(info)/about/page.tsx)
│   │   │   │   ├── downloads/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./photo/src/app/(info)/downloads/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./photo/src/app/(info)/downloads/page.tsx)
│   │   │   │   └── version/
│   │   │   │       ├── __tests__/
│   │   │   │       │   └── [page.test.tsx](./photo/src/app/(info)/version/__tests__/page.test.tsx)
│   │   │   │       └── [page.tsx](./photo/src/app/(info)/version/page.tsx)
│   │   │   ├── __tests__/
│   │   │   │   ├── [error.test.tsx](./photo/src/app/__tests__/error.test.tsx)
│   │   │   │   ├── [forbidden.test.tsx](./photo/src/app/__tests__/forbidden.test.tsx)
│   │   │   │   ├── [global-error.test.tsx](./photo/src/app/__tests__/global-error.test.tsx)
│   │   │   │   ├── [layout.test.tsx](./photo/src/app/__tests__/layout.test.tsx)
│   │   │   │   ├── [loading.test.tsx](./photo/src/app/__tests__/loading.test.tsx)
│   │   │   │   ├── [not-found.test.tsx](./photo/src/app/__tests__/not-found.test.tsx)
│   │   │   │   ├── [page.test.tsx](./photo/src/app/__tests__/page.test.tsx)
│   │   │   │   ├── [robots.test.ts](./photo/src/app/__tests__/robots.test.ts)
│   │   │   │   ├── [template.test.tsx](./photo/src/app/__tests__/template.test.tsx)
│   │   │   │   └── [unauthorized.test.tsx](./photo/src/app/__tests__/unauthorized.test.tsx)
│   │   │   ├── albums/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [page.test.tsx](./photo/src/app/albums/__tests__/page.test.tsx)
│   │   │   │   └── [page.tsx](./photo/src/app/albums/page.tsx)
│   │   │   ├── edit/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [page.test.tsx](./photo/src/app/edit/__tests__/page.test.tsx)
│   │   │   │   ├── crop/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./photo/src/app/edit/crop/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./photo/src/app/edit/crop/page.tsx)
│   │   │   │   ├── layers/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./photo/src/app/edit/layers/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./photo/src/app/edit/layers/page.tsx)
│   │   │   │   └── [page.tsx](./photo/src/app/edit/page.tsx)
│   │   │   ├── settings/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [page.test.tsx](./photo/src/app/settings/__tests__/page.test.tsx)
│   │   │   │   └── [page.tsx](./photo/src/app/settings/page.tsx)
│   │   │   ├── tools/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [page.test.tsx](./photo/src/app/tools/__tests__/page.test.tsx)
│   │   │   │   └── [page.tsx](./photo/src/app/tools/page.tsx)
│   │   │   ├── [default.tsx](./photo/src/app/default.tsx)
│   │   │   ├── [error.tsx](./photo/src/app/error.tsx)
│   │   │   ├── [favicon.ico](./photo/src/app/favicon.ico)
│   │   │   ├── [forbidden.tsx](./photo/src/app/forbidden.tsx)
│   │   │   ├── [global-error.tsx](./photo/src/app/global-error.tsx)
│   │   │   ├── [layout.tsx](./photo/src/app/layout.tsx)
│   │   │   ├── [loading.tsx](./photo/src/app/loading.tsx)
│   │   │   ├── [not-found.tsx](./photo/src/app/not-found.tsx)
│   │   │   ├── [page.tsx](./photo/src/app/page.tsx)
│   │   │   ├── [robots.ts](./photo/src/app/robots.ts)
│   │   │   ├── [template.tsx](./photo/src/app/template.tsx)
│   │   │   └── [unauthorized.tsx](./photo/src/app/unauthorized.tsx)
│   │   ├── components/
│   │   │   ├── __tests__/
│   │   │   ├── atoms/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [ImageFileUpload.test.tsx](./photo/src/components/atoms/__tests__/ImageFileUpload.test.tsx)
│   │   │   │   └── [ImageFileUpload.tsx](./photo/src/components/atoms/ImageFileUpload.tsx)
│   │   │   ├── organisms/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [ToastContainer.test.tsx](./photo/src/components/organisms/__tests__/ToastContainer.test.tsx)
│   │   │   │   └── [ToastContainer.tsx](./photo/src/components/organisms/ToastContainer.tsx)
│   │   │   ├── templates/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [AboutTemplate.test.tsx](./photo/src/components/templates/__tests__/AboutTemplate.test.tsx)
│   │   │   │   │   ├── [DownloadsTemplate.test.tsx](./photo/src/components/templates/__tests__/DownloadsTemplate.test.tsx)
│   │   │   │   │   ├── [ErrorTemplate.test.tsx](./photo/src/components/templates/__tests__/ErrorTemplate.test.tsx)
│   │   │   │   │   └── [VersionTemplate.test.tsx](./photo/src/components/templates/__tests__/VersionTemplate.test.tsx)
│   │   │   │   ├── [AboutTemplate.tsx](./photo/src/components/templates/AboutTemplate.tsx)
│   │   │   │   ├── [DownloadsTemplate.tsx](./photo/src/components/templates/DownloadsTemplate.tsx)
│   │   │   │   ├── [ErrorTemplate.tsx](./photo/src/components/templates/ErrorTemplate.tsx)
│   │   │   │   └── [VersionTemplate.tsx](./photo/src/components/templates/VersionTemplate.tsx)
│   │   │   ├── tools/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [AiColorizeTool.test.tsx](./photo/src/components/tools/__tests__/AiColorizeTool.test.tsx)
│   │   │   │   │   ├── [AiGenerateTool.test.tsx](./photo/src/components/tools/__tests__/AiGenerateTool.test.tsx)
│   │   │   │   │   ├── [AiRemoveBgTool.test.tsx](./photo/src/components/tools/__tests__/AiRemoveBgTool.test.tsx)
│   │   │   │   │   ├── [AiRemoveObjectTool.test.tsx](./photo/src/components/tools/__tests__/AiRemoveObjectTool.test.tsx)
│   │   │   │   │   ├── [AiRemovePersonTool.test.tsx](./photo/src/components/tools/__tests__/AiRemovePersonTool.test.tsx)
│   │   │   │   │   ├── [AiRemoveWatermarkTool.test.tsx](./photo/src/components/tools/__tests__/AiRemoveWatermarkTool.test.tsx)
│   │   │   │   │   ├── [AiRestoreTool.test.tsx](./photo/src/components/tools/__tests__/AiRestoreTool.test.tsx)
│   │   │   │   │   ├── [AiUnblurTool.test.tsx](./photo/src/components/tools/__tests__/AiUnblurTool.test.tsx)
│   │   │   │   │   ├── [AiUpscaleTool.test.tsx](./photo/src/components/tools/__tests__/AiUpscaleTool.test.tsx)
│   │   │   │   │   ├── [BarcodeReadTool.test.tsx](./photo/src/components/tools/__tests__/BarcodeReadTool.test.tsx)
│   │   │   │   │   ├── [BarcodeTool.test.tsx](./photo/src/components/tools/__tests__/BarcodeTool.test.tsx)
│   │   │   │   │   ├── [Base64Tool.test.tsx](./photo/src/components/tools/__tests__/Base64Tool.test.tsx)
│   │   │   │   │   ├── [BreakingBadTool.test.tsx](./photo/src/components/tools/__tests__/BreakingBadTool.test.tsx)
│   │   │   │   │   ├── [CameraTool.test.tsx](./photo/src/components/tools/__tests__/CameraTool.test.tsx)
│   │   │   │   │   ├── [ChartMakerTool.test.tsx](./photo/src/components/tools/__tests__/ChartMakerTool.test.tsx)
│   │   │   │   │   ├── [CollageMakerTool.test.tsx](./photo/src/components/tools/__tests__/CollageMakerTool.test.tsx)
│   │   │   │   │   ├── [ColorsTool.test.tsx](./photo/src/components/tools/__tests__/ColorsTool.test.tsx)
│   │   │   │   │   ├── [ContrastCheckerTool.test.tsx](./photo/src/components/tools/__tests__/ContrastCheckerTool.test.tsx)
│   │   │   │   │   ├── [GitHubSocialPreviewTool.test.tsx](./photo/src/components/tools/__tests__/GitHubSocialPreviewTool.test.tsx)
│   │   │   │   │   ├── [GradientGeneratorTool.test.tsx](./photo/src/components/tools/__tests__/GradientGeneratorTool.test.tsx)
│   │   │   │   │   ├── [HouseTool.test.tsx](./photo/src/components/tools/__tests__/HouseTool.test.tsx)
│   │   │   │   │   ├── [ImageAdjustTool.test.tsx](./photo/src/components/tools/__tests__/ImageAdjustTool.test.tsx)
│   │   │   │   │   ├── [ImageBlurBackgroundTool.test.tsx](./photo/src/components/tools/__tests__/ImageBlurBackgroundTool.test.tsx)
│   │   │   │   │   ├── [ImageBorderTool.test.tsx](./photo/src/components/tools/__tests__/ImageBorderTool.test.tsx)
│   │   │   │   │   ├── [ImageBwTool.test.tsx](./photo/src/components/tools/__tests__/ImageBwTool.test.tsx)
│   │   │   │   │   ├── [ImageColorizeTool.test.tsx](./photo/src/components/tools/__tests__/ImageColorizeTool.test.tsx)
│   │   │   │   │   ├── [ImageCombinerSideBySideTool.test.tsx](./photo/src/components/tools/__tests__/ImageCombinerSideBySideTool.test.tsx)
│   │   │   │   │   ├── [ImageCombinerStackedTool.test.tsx](./photo/src/components/tools/__tests__/ImageCombinerStackedTool.test.tsx)
│   │   │   │   │   ├── [ImageCompressTool.test.tsx](./photo/src/components/tools/__tests__/ImageCompressTool.test.tsx)
│   │   │   │   │   ├── [ImageConvertTool.test.tsx](./photo/src/components/tools/__tests__/ImageConvertTool.test.tsx)
│   │   │   │   │   ├── [ImageCropTool.test.tsx](./photo/src/components/tools/__tests__/ImageCropTool.test.tsx)
│   │   │   │   │   ├── [ImageDominantColorTool.test.tsx](./photo/src/components/tools/__tests__/ImageDominantColorTool.test.tsx)
│   │   │   │   │   ├── [ImageFlipTool.test.tsx](./photo/src/components/tools/__tests__/ImageFlipTool.test.tsx)
│   │   │   │   │   ├── [ImageMorphingTool.test.tsx](./photo/src/components/tools/__tests__/ImageMorphingTool.test.tsx)
│   │   │   │   │   ├── [ImageOcrTool.test.tsx](./photo/src/components/tools/__tests__/ImageOcrTool.test.tsx)
│   │   │   │   │   ├── [ImagePhotoFiltersTool.test.tsx](./photo/src/components/tools/__tests__/ImagePhotoFiltersTool.test.tsx)
│   │   │   │   │   ├── [ImagePixelateFaceTool.test.tsx](./photo/src/components/tools/__tests__/ImagePixelateFaceTool.test.tsx)
│   │   │   │   │   ├── [ImagePixelateTool.test.tsx](./photo/src/components/tools/__tests__/ImagePixelateTool.test.tsx)
│   │   │   │   │   ├── [ImageProfileTool.test.tsx](./photo/src/components/tools/__tests__/ImageProfileTool.test.tsx)
│   │   │   │   │   ├── [ImageResizeTool.test.tsx](./photo/src/components/tools/__tests__/ImageResizeTool.test.tsx)
│   │   │   │   │   ├── [ImageRotateTool.test.tsx](./photo/src/components/tools/__tests__/ImageRotateTool.test.tsx)
│   │   │   │   │   ├── [ImageRoundTool.test.tsx](./photo/src/components/tools/__tests__/ImageRoundTool.test.tsx)
│   │   │   │   │   ├── [ImageShadowTool.test.tsx](./photo/src/components/tools/__tests__/ImageShadowTool.test.tsx)
│   │   │   │   │   ├── [ImageSharpenTool.test.tsx](./photo/src/components/tools/__tests__/ImageSharpenTool.test.tsx)
│   │   │   │   │   ├── [ImageSplitTool.test.tsx](./photo/src/components/tools/__tests__/ImageSplitTool.test.tsx)
│   │   │   │   │   ├── [ImageTextTool.test.tsx](./photo/src/components/tools/__tests__/ImageTextTool.test.tsx)
│   │   │   │   │   ├── [ImageTranslateTool.test.tsx](./photo/src/components/tools/__tests__/ImageTranslateTool.test.tsx)
│   │   │   │   │   ├── [ImageTransparentBgTool.test.tsx](./photo/src/components/tools/__tests__/ImageTransparentBgTool.test.tsx)
│   │   │   │   │   ├── [ImageVignetteTool.test.tsx](./photo/src/components/tools/__tests__/ImageVignetteTool.test.tsx)
│   │   │   │   │   ├── [ImageWatermarkTool.test.tsx](./photo/src/components/tools/__tests__/ImageWatermarkTool.test.tsx)
│   │   │   │   │   ├── [InstaSizeTool.test.tsx](./photo/src/components/tools/__tests__/InstaSizeTool.test.tsx)
│   │   │   │   │   ├── [InvoiceParserTool.test.tsx](./photo/src/components/tools/__tests__/InvoiceParserTool.test.tsx)
│   │   │   │   │   ├── [MemeMakerTool.test.tsx](./photo/src/components/tools/__tests__/MemeMakerTool.test.tsx)
│   │   │   │   │   ├── [PixelTool.test.tsx](./photo/src/components/tools/__tests__/PixelTool.test.tsx)
│   │   │   │   │   ├── [QRCodeTool.test.tsx](./photo/src/components/tools/__tests__/QRCodeTool.test.tsx)
│   │   │   │   │   ├── [QrReadTool.test.tsx](./photo/src/components/tools/__tests__/QrReadTool.test.tsx)
│   │   │   │   │   └── [YouTubeThumbnailsTool.test.tsx](./photo/src/components/tools/__tests__/YouTubeThumbnailsTool.test.tsx)
│   │   │   │   ├── [AiColorizeTool.tsx](./photo/src/components/tools/AiColorizeTool.tsx)
│   │   │   │   ├── [AiGenerateTool.tsx](./photo/src/components/tools/AiGenerateTool.tsx)
│   │   │   │   ├── [AiRemoveBgTool.tsx](./photo/src/components/tools/AiRemoveBgTool.tsx)
│   │   │   │   ├── [AiRemoveObjectTool.tsx](./photo/src/components/tools/AiRemoveObjectTool.tsx)
│   │   │   │   ├── [AiRemovePersonTool.tsx](./photo/src/components/tools/AiRemovePersonTool.tsx)
│   │   │   │   ├── [AiRemoveWatermarkTool.tsx](./photo/src/components/tools/AiRemoveWatermarkTool.tsx)
│   │   │   │   ├── [AiRestoreTool.tsx](./photo/src/components/tools/AiRestoreTool.tsx)
│   │   │   │   ├── [AiUnblurTool.tsx](./photo/src/components/tools/AiUnblurTool.tsx)
│   │   │   │   ├── [AiUpscaleTool.tsx](./photo/src/components/tools/AiUpscaleTool.tsx)
│   │   │   │   ├── [BarcodeReadTool.tsx](./photo/src/components/tools/BarcodeReadTool.tsx)
│   │   │   │   ├── [BarcodeTool.tsx](./photo/src/components/tools/BarcodeTool.tsx)
│   │   │   │   ├── [Base64Tool.tsx](./photo/src/components/tools/Base64Tool.tsx)
│   │   │   │   ├── [BreakingBadTool.tsx](./photo/src/components/tools/BreakingBadTool.tsx)
│   │   │   │   ├── [CameraTool.tsx](./photo/src/components/tools/CameraTool.tsx)
│   │   │   │   ├── [ChartMakerTool.tsx](./photo/src/components/tools/ChartMakerTool.tsx)
│   │   │   │   ├── [CollageMakerTool.tsx](./photo/src/components/tools/CollageMakerTool.tsx)
│   │   │   │   ├── [ColorsTool.tsx](./photo/src/components/tools/ColorsTool.tsx)
│   │   │   │   ├── [ContrastCheckerTool.tsx](./photo/src/components/tools/ContrastCheckerTool.tsx)
│   │   │   │   ├── [GitHubSocialPreviewTool.tsx](./photo/src/components/tools/GitHubSocialPreviewTool.tsx)
│   │   │   │   ├── [GradientGeneratorTool.tsx](./photo/src/components/tools/GradientGeneratorTool.tsx)
│   │   │   │   ├── [HouseTool.tsx](./photo/src/components/tools/HouseTool.tsx)
│   │   │   │   ├── [ImageAdjustTool.tsx](./photo/src/components/tools/ImageAdjustTool.tsx)
│   │   │   │   ├── [ImageBlurBackgroundTool.tsx](./photo/src/components/tools/ImageBlurBackgroundTool.tsx)
│   │   │   │   ├── [ImageBorderTool.tsx](./photo/src/components/tools/ImageBorderTool.tsx)
│   │   │   │   ├── [ImageBwTool.tsx](./photo/src/components/tools/ImageBwTool.tsx)
│   │   │   │   ├── [ImageColorizeTool.tsx](./photo/src/components/tools/ImageColorizeTool.tsx)
│   │   │   │   ├── [ImageCombinerSideBySideTool.tsx](./photo/src/components/tools/ImageCombinerSideBySideTool.tsx)
│   │   │   │   ├── [ImageCombinerStackedTool.tsx](./photo/src/components/tools/ImageCombinerStackedTool.tsx)
│   │   │   │   ├── [ImageCompressTool.tsx](./photo/src/components/tools/ImageCompressTool.tsx)
│   │   │   │   ├── [ImageConvertTool.tsx](./photo/src/components/tools/ImageConvertTool.tsx)
│   │   │   │   ├── [ImageCropTool.tsx](./photo/src/components/tools/ImageCropTool.tsx)
│   │   │   │   ├── [ImageDominantColorTool.tsx](./photo/src/components/tools/ImageDominantColorTool.tsx)
│   │   │   │   ├── [ImageFlipTool.tsx](./photo/src/components/tools/ImageFlipTool.tsx)
│   │   │   │   ├── [ImageMorphingTool.tsx](./photo/src/components/tools/ImageMorphingTool.tsx)
│   │   │   │   ├── [ImageOcrTool.tsx](./photo/src/components/tools/ImageOcrTool.tsx)
│   │   │   │   ├── [ImagePhotoFiltersTool.tsx](./photo/src/components/tools/ImagePhotoFiltersTool.tsx)
│   │   │   │   ├── [ImagePixelateFaceTool.tsx](./photo/src/components/tools/ImagePixelateFaceTool.tsx)
│   │   │   │   ├── [ImagePixelateTool.tsx](./photo/src/components/tools/ImagePixelateTool.tsx)
│   │   │   │   ├── [ImageProfileTool.tsx](./photo/src/components/tools/ImageProfileTool.tsx)
│   │   │   │   ├── [ImageResizeTool.tsx](./photo/src/components/tools/ImageResizeTool.tsx)
│   │   │   │   ├── [ImageRotateTool.tsx](./photo/src/components/tools/ImageRotateTool.tsx)
│   │   │   │   ├── [ImageRoundTool.tsx](./photo/src/components/tools/ImageRoundTool.tsx)
│   │   │   │   ├── [ImageShadowTool.tsx](./photo/src/components/tools/ImageShadowTool.tsx)
│   │   │   │   ├── [ImageSharpenTool.tsx](./photo/src/components/tools/ImageSharpenTool.tsx)
│   │   │   │   ├── [ImageSplitTool.tsx](./photo/src/components/tools/ImageSplitTool.tsx)
│   │   │   │   ├── [ImageTextTool.tsx](./photo/src/components/tools/ImageTextTool.tsx)
│   │   │   │   ├── [ImageTranslateTool.tsx](./photo/src/components/tools/ImageTranslateTool.tsx)
│   │   │   │   ├── [ImageTransparentBgTool.tsx](./photo/src/components/tools/ImageTransparentBgTool.tsx)
│   │   │   │   ├── [ImageVignetteTool.tsx](./photo/src/components/tools/ImageVignetteTool.tsx)
│   │   │   │   ├── [ImageWatermarkTool.tsx](./photo/src/components/tools/ImageWatermarkTool.tsx)
│   │   │   │   ├── [InstaSizeTool.tsx](./photo/src/components/tools/InstaSizeTool.tsx)
│   │   │   │   ├── [InvoiceParserTool.tsx](./photo/src/components/tools/InvoiceParserTool.tsx)
│   │   │   │   ├── [MemeMakerTool.tsx](./photo/src/components/tools/MemeMakerTool.tsx)
│   │   │   │   ├── [PixelTool.tsx](./photo/src/components/tools/PixelTool.tsx)
│   │   │   │   ├── [QRCodeTool.tsx](./photo/src/components/tools/QRCodeTool.tsx)
│   │   │   │   ├── [QrReadTool.tsx](./photo/src/components/tools/QrReadTool.tsx)
│   │   │   │   └── [YouTubeThumbnailsTool.tsx](./photo/src/components/tools/YouTubeThumbnailsTool.tsx)
│   │   │   └── [SWProvider.tsx](./photo/src/components/SWProvider.tsx)
│   │   ├── data/
│   │   │   ├── __tests__/
│   │   │   │   └── [data.test.ts](./photo/src/data/__tests__/data.test.ts)
│   │   │   ├── [models.ts](./photo/src/data/models.ts)
│   │   │   ├── [photo-tools.ts](./photo/src/data/photo-tools.ts)
│   │   │   └── [seed.ts](./photo/src/data/seed.ts)
│   │   ├── hooks/
│   │   │   ├── __tests__/
│   │   │   │   └── [useSWRegister.test.ts](./photo/src/hooks/__tests__/useSWRegister.test.ts)
│   │   │   └── [useSWRegister.ts](./photo/src/hooks/useSWRegister.ts)
│   │   ├── lib/
│   │   │   ├── __tests__/
│   │   │   │   ├── [db.test.ts](./photo/src/lib/__tests__/db.test.ts)
│   │   │   │   └── [photo-tools.test.ts](./photo/src/lib/__tests__/photo-tools.test.ts)
│   │   │   ├── [db.ts](./photo/src/lib/db.ts)
│   │   │   └── [photo-tools.ts](./photo/src/lib/photo-tools.ts)
│   │   ├── providers/
│   │   │   ├── __tests__/
│   │   │   │   ├── [DataProvider.test.tsx](./photo/src/providers/__tests__/DataProvider.test.tsx)
│   │   │   │   └── [ToastProvider.test.tsx](./photo/src/providers/__tests__/ToastProvider.test.tsx)
│   │   │   ├── [DataProvider.tsx](./photo/src/providers/DataProvider.tsx)
│   │   │   ├── [Providers.tsx](./photo/src/providers/Providers.tsx)
│   │   │   └── [ToastProvider.tsx](./photo/src/providers/ToastProvider.tsx)
│   │   ├── server/
│   │   │   ├── __tests__/
│   │   │   │   └── [openrouter.test.ts](./photo/src/server/__tests__/openrouter.test.ts)
│   │   │   └── trpc/
│   │   │       ├── routers/
│   │   │       │   ├── openrouter/
│   │   │       │   │   └── [index.ts](./photo/src/server/trpc/routers/openrouter/index.ts)
│   │   │       │   └── [_app.ts](./photo/src/server/trpc/routers/_app.ts)
│   │   │       └── [trpc.ts](./photo/src/server/trpc/trpc.ts)
│   │   ├── styles/
│   │   │   ├── [base.css](./photo/src/styles/base.css)
│   │   │   ├── [globals.css](./photo/src/styles/globals.css)
│   │   │   └── [themes.css](./photo/src/styles/themes.css)
│   │   ├── types/
│   │   │   └── [index.ts](./photo/src/types/index.ts)
│   │   └── utils/
│   │       ├── __tests__/
│   │       │   └── [format.test.ts](./photo/src/utils/__tests__/format.test.ts)
│   │       ├── [format.ts](./photo/src/utils/format.ts)
│   │       └── [trpc.ts](./photo/src/utils/trpc.ts)
│   ├── src-tauri/
│   │   ├── capabilities/
│   │   │   └── [default.json](./photo/src-tauri/capabilities/default.json)
│   │   ├── icons/
│   │   │   ├── [128x128.png](./photo/src-tauri/icons/128x128.png)
│   │   │   ├── [128x128@2x.png](./photo/src-tauri/icons/128x128@2x.png)
│   │   │   ├── [32x32.png](./photo/src-tauri/icons/32x32.png)
│   │   │   ├── [Square107x107Logo.png](./photo/src-tauri/icons/Square107x107Logo.png)
│   │   │   ├── [Square142x142Logo.png](./photo/src-tauri/icons/Square142x142Logo.png)
│   │   │   ├── [Square150x150Logo.png](./photo/src-tauri/icons/Square150x150Logo.png)
│   │   │   ├── [Square284x284Logo.png](./photo/src-tauri/icons/Square284x284Logo.png)
│   │   │   ├── [Square30x30Logo.png](./photo/src-tauri/icons/Square30x30Logo.png)
│   │   │   ├── [Square310x310Logo.png](./photo/src-tauri/icons/Square310x310Logo.png)
│   │   │   ├── [Square44x44Logo.png](./photo/src-tauri/icons/Square44x44Logo.png)
│   │   │   ├── [Square71x71Logo.png](./photo/src-tauri/icons/Square71x71Logo.png)
│   │   │   ├── [Square89x89Logo.png](./photo/src-tauri/icons/Square89x89Logo.png)
│   │   │   ├── [StoreLogo.png](./photo/src-tauri/icons/StoreLogo.png)
│   │   │   ├── [icon.icns](./photo/src-tauri/icons/icon.icns)
│   │   │   ├── [icon.ico](./photo/src-tauri/icons/icon.ico)
│   │   │   └── [icon.png](./photo/src-tauri/icons/icon.png)
│   │   ├── src/
│   │   │   ├── [lib.rs](./photo/src-tauri/src/lib.rs)
│   │   │   └── [main.rs](./photo/src-tauri/src/main.rs)
│   │   ├── [Cargo.lock](./photo/src-tauri/Cargo.lock)
│   │   ├── [Cargo.toml](./photo/src-tauri/Cargo.toml)
│   │   ├── [build.rs](./photo/src-tauri/build.rs)
│   │   └── [tauri.conf.json](./photo/src-tauri/tauri.conf.json)
│   ├── [AGENTS.md](./photo/AGENTS.md)
│   ├── [Dockerfile](./photo/Dockerfile)
│   ├── [LICENSE](./photo/LICENSE)
│   ├── [README.md](./photo/README.md)
│   ├── [TREE.md](./photo/TREE.md)
│   ├── [docker-compose.yaml](./photo/docker-compose.yaml)
│   ├── [eslint.config.mts](./photo/eslint.config.mts)
│   ├── [jest.config.ts](./photo/jest.config.ts)
│   ├── [jest.setup.ts](./photo/jest.setup.ts)
│   ├── [next.config.ts](./photo/next.config.ts)
│   ├── [package.json](./photo/package.json)
│   ├── [playwright.config.ts](./photo/playwright.config.ts)
│   ├── [postcss.config.mjs](./photo/postcss.config.mjs)
│   └── [tsconfig.json](./photo/tsconfig.json)
├── svg/
│   ├── docs/
│   │   ├── [ARCHITECTURE.md](./svg/docs/ARCHITECTURE.md)
│   │   ├── [CONTRIBUTING.md](./svg/docs/CONTRIBUTING.md)
│   │   ├── [DOWNLOADS.md](./svg/docs/DOWNLOADS.md)
│   │   ├── [PACKAGING.md](./svg/docs/PACKAGING.md)
│   │   └── [ROADMAP.md](./svg/docs/ROADMAP.md)
│   ├── e2e/
│   │   ├── [about.spec.ts](./svg/e2e/about.spec.ts)
│   │   ├── [canvas-editor.spec.ts](./svg/e2e/canvas-editor.spec.ts)
│   │   ├── [code-editor.spec.ts](./svg/e2e/code-editor.spec.ts)
│   │   ├── [home.spec.ts](./svg/e2e/home.spec.ts)
│   │   ├── [navigation.spec.ts](./svg/e2e/navigation.spec.ts)
│   │   ├── [profile.spec.ts](./svg/e2e/profile.spec.ts)
│   │   ├── [settings.spec.ts](./svg/e2e/settings.spec.ts)
│   │   └── [version.spec.ts](./svg/e2e/version.spec.ts)
│   ├── public/
│   │   ├── icons/
│   │   │   ├── [icon-128x128.png](./svg/public/icons/icon-128x128.png)
│   │   │   ├── [icon-144x144.png](./svg/public/icons/icon-144x144.png)
│   │   │   ├── [icon-152x152.png](./svg/public/icons/icon-152x152.png)
│   │   │   ├── [icon-16x16.png](./svg/public/icons/icon-16x16.png)
│   │   │   ├── [icon-180x180.png](./svg/public/icons/icon-180x180.png)
│   │   │   ├── [icon-192x192.png](./svg/public/icons/icon-192x192.png)
│   │   │   ├── [icon-256x256.png](./svg/public/icons/icon-256x256.png)
│   │   │   ├── [icon-32x32.png](./svg/public/icons/icon-32x32.png)
│   │   │   ├── [icon-384x384.png](./svg/public/icons/icon-384x384.png)
│   │   │   ├── [icon-48x48.png](./svg/public/icons/icon-48x48.png)
│   │   │   ├── [icon-512x512.png](./svg/public/icons/icon-512x512.png)
│   │   │   ├── [icon-64x64.png](./svg/public/icons/icon-64x64.png)
│   │   │   ├── [icon-72x72.png](./svg/public/icons/icon-72x72.png)
│   │   │   ├── [icon-96x96.png](./svg/public/icons/icon-96x96.png)
│   │   │   └── [icon.svg](./svg/public/icons/icon.svg)
│   │   ├── [apple-touch-icon.png](./svg/public/apple-touch-icon.png)
│   │   ├── [favicon.ico](./svg/public/favicon.ico)
│   │   ├── [manifest.json](./svg/public/manifest.json)
│   │   ├── [robots.txt](./svg/public/robots.txt)
│   │   ├── [sitemap.xml](./svg/public/sitemap.xml)
│   │   └── [sw.js](./svg/public/sw.js)
│   ├── src/
│   │   ├── app/
│   │   │   ├── (auth)/
│   │   │   │   ├── forget-password/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./svg/src/app/(auth)/forget-password/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./svg/src/app/(auth)/forget-password/page.tsx)
│   │   │   │   ├── profile/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./svg/src/app/(auth)/profile/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./svg/src/app/(auth)/profile/page.tsx)
│   │   │   │   ├── reset-password/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./svg/src/app/(auth)/reset-password/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./svg/src/app/(auth)/reset-password/page.tsx)
│   │   │   │   ├── sign-in/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./svg/src/app/(auth)/sign-in/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./svg/src/app/(auth)/sign-in/page.tsx)
│   │   │   │   └── sign-up/
│   │   │   │       ├── __tests__/
│   │   │   │       │   └── [page.test.tsx](./svg/src/app/(auth)/sign-up/__tests__/page.test.tsx)
│   │   │   │       └── [page.tsx](./svg/src/app/(auth)/sign-up/page.tsx)
│   │   │   ├── (info)/
│   │   │   │   ├── about/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./svg/src/app/(info)/about/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./svg/src/app/(info)/about/page.tsx)
│   │   │   │   ├── downloads/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./svg/src/app/(info)/downloads/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./svg/src/app/(info)/downloads/page.tsx)
│   │   │   │   └── version/
│   │   │   │       ├── __tests__/
│   │   │   │       │   └── [page.test.tsx](./svg/src/app/(info)/version/__tests__/page.test.tsx)
│   │   │   │       └── [page.tsx](./svg/src/app/(info)/version/page.tsx)
│   │   │   ├── __tests__/
│   │   │   │   ├── [error.test.tsx](./svg/src/app/__tests__/error.test.tsx)
│   │   │   │   ├── [forbidden.test.tsx](./svg/src/app/__tests__/forbidden.test.tsx)
│   │   │   │   ├── [global-error.test.tsx](./svg/src/app/__tests__/global-error.test.tsx)
│   │   │   │   ├── [home-page.test.tsx](./svg/src/app/__tests__/home-page.test.tsx)
│   │   │   │   ├── [layout.test.tsx](./svg/src/app/__tests__/layout.test.tsx)
│   │   │   │   ├── [loading.test.tsx](./svg/src/app/__tests__/loading.test.tsx)
│   │   │   │   ├── [not-found.test.tsx](./svg/src/app/__tests__/not-found.test.tsx)
│   │   │   │   ├── [robots.test.ts](./svg/src/app/__tests__/robots.test.ts)
│   │   │   │   ├── [template.test.tsx](./svg/src/app/__tests__/template.test.tsx)
│   │   │   │   └── [unauthorized.test.tsx](./svg/src/app/__tests__/unauthorized.test.tsx)
│   │   │   ├── edit/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [page.test.tsx](./svg/src/app/edit/__tests__/page.test.tsx)
│   │   │   │   ├── code/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./svg/src/app/edit/code/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./svg/src/app/edit/code/page.tsx)
│   │   │   │   └── [page.tsx](./svg/src/app/edit/page.tsx)
│   │   │   ├── settings/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [page.test.tsx](./svg/src/app/settings/__tests__/page.test.tsx)
│   │   │   │   └── [page.tsx](./svg/src/app/settings/page.tsx)
│   │   │   ├── [default.tsx](./svg/src/app/default.tsx)
│   │   │   ├── [error.tsx](./svg/src/app/error.tsx)
│   │   │   ├── [favicon.ico](./svg/src/app/favicon.ico)
│   │   │   ├── [forbidden.tsx](./svg/src/app/forbidden.tsx)
│   │   │   ├── [global-error.tsx](./svg/src/app/global-error.tsx)
│   │   │   ├── [layout.tsx](./svg/src/app/layout.tsx)
│   │   │   ├── [loading.tsx](./svg/src/app/loading.tsx)
│   │   │   ├── [not-found.tsx](./svg/src/app/not-found.tsx)
│   │   │   ├── [page.tsx](./svg/src/app/page.tsx)
│   │   │   ├── [robots.ts](./svg/src/app/robots.ts)
│   │   │   ├── [template.tsx](./svg/src/app/template.tsx)
│   │   │   └── [unauthorized.tsx](./svg/src/app/unauthorized.tsx)
│   │   ├── components/
│   │   │   ├── __tests__/
│   │   │   │   └── [SWProvider.test.tsx](./svg/src/components/__tests__/SWProvider.test.tsx)
│   │   │   ├── atoms/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [FileDropzone.test.tsx](./svg/src/components/atoms/__tests__/FileDropzone.test.tsx)
│   │   │   │   │   └── [PageTransition.test.tsx](./svg/src/components/atoms/__tests__/PageTransition.test.tsx)
│   │   │   │   ├── [FileDropzone.tsx](./svg/src/components/atoms/FileDropzone.tsx)
│   │   │   │   └── [PageTransition.tsx](./svg/src/components/atoms/PageTransition.tsx)
│   │   │   ├── organisms/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [IconGenerator.test.tsx](./svg/src/components/organisms/__tests__/IconGenerator.test.tsx)
│   │   │   │   │   ├── [IconWorkbench.test.tsx](./svg/src/components/organisms/__tests__/IconWorkbench.test.tsx)
│   │   │   │   │   └── [ToastContainer.test.tsx](./svg/src/components/organisms/__tests__/ToastContainer.test.tsx)
│   │   │   │   ├── [IconGenerator.tsx](./svg/src/components/organisms/IconGenerator.tsx)
│   │   │   │   ├── [IconWorkbench.tsx](./svg/src/components/organisms/IconWorkbench.tsx)
│   │   │   │   └── [ToastContainer.tsx](./svg/src/components/organisms/ToastContainer.tsx)
│   │   │   ├── templates/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [AboutTemplate.test.tsx](./svg/src/components/templates/__tests__/AboutTemplate.test.tsx)
│   │   │   │   │   ├── [DownloadsTemplate.test.tsx](./svg/src/components/templates/__tests__/DownloadsTemplate.test.tsx)
│   │   │   │   │   ├── [ErrorTemplate.test.tsx](./svg/src/components/templates/__tests__/ErrorTemplate.test.tsx)
│   │   │   │   │   └── [VersionTemplate.test.tsx](./svg/src/components/templates/__tests__/VersionTemplate.test.tsx)
│   │   │   │   ├── [AboutTemplate.tsx](./svg/src/components/templates/AboutTemplate.tsx)
│   │   │   │   ├── [DownloadsTemplate.tsx](./svg/src/components/templates/DownloadsTemplate.tsx)
│   │   │   │   ├── [ErrorTemplate.tsx](./svg/src/components/templates/ErrorTemplate.tsx)
│   │   │   │   └── [VersionTemplate.tsx](./svg/src/components/templates/VersionTemplate.tsx)
│   │   │   └── [SWProvider.tsx](./svg/src/components/SWProvider.tsx)
│   │   ├── data/
│   │   │   ├── __tests__/
│   │   │   │   ├── [models.test.ts](./svg/src/data/__tests__/models.test.ts)
│   │   │   │   └── [seed.test.ts](./svg/src/data/__tests__/seed.test.ts)
│   │   │   ├── [iconPresets.ts](./svg/src/data/iconPresets.ts)
│   │   │   ├── [models.ts](./svg/src/data/models.ts)
│   │   │   └── [seed.ts](./svg/src/data/seed.ts)
│   │   ├── hooks/
│   │   │   ├── __tests__/
│   │   │   │   └── [useSWRegister.test.ts](./svg/src/hooks/__tests__/useSWRegister.test.ts)
│   │   │   └── [useSWRegister.ts](./svg/src/hooks/useSWRegister.ts)
│   │   ├── lib/
│   │   │   ├── __tests__/
│   │   │   │   ├── [db.ssr.test.ts](./svg/src/lib/__tests__/db.ssr.test.ts)
│   │   │   │   └── [db.test.ts](./svg/src/lib/__tests__/db.test.ts)
│   │   │   └── [db.ts](./svg/src/lib/db.ts)
│   │   ├── providers/
│   │   │   ├── __tests__/
│   │   │   │   ├── [DataProvider.test.tsx](./svg/src/providers/__tests__/DataProvider.test.tsx)
│   │   │   │   ├── [Providers.test.tsx](./svg/src/providers/__tests__/Providers.test.tsx)
│   │   │   │   └── [ToastProvider.test.tsx](./svg/src/providers/__tests__/ToastProvider.test.tsx)
│   │   │   ├── [DataProvider.tsx](./svg/src/providers/DataProvider.tsx)
│   │   │   ├── [Providers.tsx](./svg/src/providers/Providers.tsx)
│   │   │   └── [ToastProvider.tsx](./svg/src/providers/ToastProvider.tsx)
│   │   ├── styles/
│   │   │   ├── [base.css](./svg/src/styles/base.css)
│   │   │   ├── [globals.css](./svg/src/styles/globals.css)
│   │   │   └── [themes.css](./svg/src/styles/themes.css)
│   │   ├── types/
│   │   │   └── [index.ts](./svg/src/types/index.ts)
│   │   └── utils/
│   │       ├── __tests__/
│   │       │   ├── [format.test.ts](./svg/src/utils/__tests__/format.test.ts)
│   │       │   ├── [iconGenerator.test.ts](./svg/src/utils/__tests__/iconGenerator.test.ts)
│   │       │   └── [svgToCanvas.test.ts](./svg/src/utils/__tests__/svgToCanvas.test.ts)
│   │       ├── [format.ts](./svg/src/utils/format.ts)
│   │       ├── [iconGenerator.ts](./svg/src/utils/iconGenerator.ts)
│   │       └── [svgToCanvas.ts](./svg/src/utils/svgToCanvas.ts)
│   ├── src-tauri/
│   │   ├── capabilities/
│   │   │   └── [default.json](./svg/src-tauri/capabilities/default.json)
│   │   ├── icons/
│   │   │   ├── [128x128.png](./svg/src-tauri/icons/128x128.png)
│   │   │   ├── [128x128@2x.png](./svg/src-tauri/icons/128x128@2x.png)
│   │   │   ├── [32x32.png](./svg/src-tauri/icons/32x32.png)
│   │   │   ├── [Square107x107Logo.png](./svg/src-tauri/icons/Square107x107Logo.png)
│   │   │   ├── [Square142x142Logo.png](./svg/src-tauri/icons/Square142x142Logo.png)
│   │   │   ├── [Square150x150Logo.png](./svg/src-tauri/icons/Square150x150Logo.png)
│   │   │   ├── [Square284x284Logo.png](./svg/src-tauri/icons/Square284x284Logo.png)
│   │   │   ├── [Square30x30Logo.png](./svg/src-tauri/icons/Square30x30Logo.png)
│   │   │   ├── [Square310x310Logo.png](./svg/src-tauri/icons/Square310x310Logo.png)
│   │   │   ├── [Square44x44Logo.png](./svg/src-tauri/icons/Square44x44Logo.png)
│   │   │   ├── [Square71x71Logo.png](./svg/src-tauri/icons/Square71x71Logo.png)
│   │   │   ├── [Square89x89Logo.png](./svg/src-tauri/icons/Square89x89Logo.png)
│   │   │   ├── [StoreLogo.png](./svg/src-tauri/icons/StoreLogo.png)
│   │   │   ├── [icon.icns](./svg/src-tauri/icons/icon.icns)
│   │   │   ├── [icon.ico](./svg/src-tauri/icons/icon.ico)
│   │   │   └── [icon.png](./svg/src-tauri/icons/icon.png)
│   │   ├── src/
│   │   │   ├── [lib.rs](./svg/src-tauri/src/lib.rs)
│   │   │   └── [main.rs](./svg/src-tauri/src/main.rs)
│   │   ├── [Cargo.lock](./svg/src-tauri/Cargo.lock)
│   │   ├── [Cargo.toml](./svg/src-tauri/Cargo.toml)
│   │   ├── [build.rs](./svg/src-tauri/build.rs)
│   │   └── [tauri.conf.json](./svg/src-tauri/tauri.conf.json)
│   ├── [AGENTS.md](./svg/AGENTS.md)
│   ├── [Dockerfile](./svg/Dockerfile)
│   ├── [LICENSE](./svg/LICENSE)
│   ├── [README.md](./svg/README.md)
│   ├── [TREE.md](./svg/TREE.md)
│   ├── [docker-compose.yaml](./svg/docker-compose.yaml)
│   ├── [eslint.config.mts](./svg/eslint.config.mts)
│   ├── [jest.config.ts](./svg/jest.config.ts)
│   ├── [jest.setup.ts](./svg/jest.setup.ts)
│   ├── [next.config.ts](./svg/next.config.ts)
│   ├── [package.json](./svg/package.json)
│   ├── [playwright.config.ts](./svg/playwright.config.ts)
│   ├── [postcss.config.mjs](./svg/postcss.config.mjs)
│   └── [tsconfig.json](./svg/tsconfig.json)
├── video/
│   ├── docs/
│   │   ├── [ARCHITECTURE.md](./video/docs/ARCHITECTURE.md)
│   │   ├── [CONTRIBUTING.md](./video/docs/CONTRIBUTING.md)
│   │   ├── [DOWNLOADS.md](./video/docs/DOWNLOADS.md)
│   │   ├── [PACKAGING.md](./video/docs/PACKAGING.md)
│   │   └── [ROADMAP.md](./video/docs/ROADMAP.md)
│   ├── public/
│   │   ├── icons/
│   │   │   ├── [icon-128x128.png](./video/public/icons/icon-128x128.png)
│   │   │   ├── [icon-144x144.png](./video/public/icons/icon-144x144.png)
│   │   │   ├── [icon-152x152.png](./video/public/icons/icon-152x152.png)
│   │   │   ├── [icon-16x16.png](./video/public/icons/icon-16x16.png)
│   │   │   ├── [icon-180x180.png](./video/public/icons/icon-180x180.png)
│   │   │   ├── [icon-192x192.png](./video/public/icons/icon-192x192.png)
│   │   │   ├── [icon-256x256.png](./video/public/icons/icon-256x256.png)
│   │   │   ├── [icon-32x32.png](./video/public/icons/icon-32x32.png)
│   │   │   ├── [icon-384x384.png](./video/public/icons/icon-384x384.png)
│   │   │   ├── [icon-48x48.png](./video/public/icons/icon-48x48.png)
│   │   │   ├── [icon-512x512.png](./video/public/icons/icon-512x512.png)
│   │   │   ├── [icon-64x64.png](./video/public/icons/icon-64x64.png)
│   │   │   ├── [icon-72x72.png](./video/public/icons/icon-72x72.png)
│   │   │   ├── [icon-96x96.png](./video/public/icons/icon-96x96.png)
│   │   │   └── [icon.svg](./video/public/icons/icon.svg)
│   │   ├── [apple-touch-icon.png](./video/public/apple-touch-icon.png)
│   │   ├── [favicon.ico](./video/public/favicon.ico)
│   │   ├── [manifest.json](./video/public/manifest.json)
│   │   ├── [robots.txt](./video/public/robots.txt)
│   │   ├── [sitemap.xml](./video/public/sitemap.xml)
│   │   └── [sw.js](./video/public/sw.js)
│   ├── src/
│   │   ├── app/
│   │   │   ├── (auth)/
│   │   │   │   ├── forget-password/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./video/src/app/(auth)/forget-password/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./video/src/app/(auth)/forget-password/page.tsx)
│   │   │   │   ├── profile/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./video/src/app/(auth)/profile/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./video/src/app/(auth)/profile/page.tsx)
│   │   │   │   ├── reset-password/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./video/src/app/(auth)/reset-password/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./video/src/app/(auth)/reset-password/page.tsx)
│   │   │   │   ├── sign-in/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./video/src/app/(auth)/sign-in/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./video/src/app/(auth)/sign-in/page.tsx)
│   │   │   │   └── sign-up/
│   │   │   │       ├── __tests__/
│   │   │   │       │   └── [page.test.tsx](./video/src/app/(auth)/sign-up/__tests__/page.test.tsx)
│   │   │   │       └── [page.tsx](./video/src/app/(auth)/sign-up/page.tsx)
│   │   │   ├── (info)/
│   │   │   │   ├── about/
│   │   │   │   │   └── [page.tsx](./video/src/app/(info)/about/page.tsx)
│   │   │   │   ├── downloads/
│   │   │   │   │   ├── __tests__/
│   │   │   │   │   │   └── [page.test.tsx](./video/src/app/(info)/downloads/__tests__/page.test.tsx)
│   │   │   │   │   └── [page.tsx](./video/src/app/(info)/downloads/page.tsx)
│   │   │   │   └── version/
│   │   │   │       └── [page.tsx](./video/src/app/(info)/version/page.tsx)
│   │   │   ├── __tests__/
│   │   │   │   ├── [error.test.tsx](./video/src/app/__tests__/error.test.tsx)
│   │   │   │   ├── [forbidden.test.tsx](./video/src/app/__tests__/forbidden.test.tsx)
│   │   │   │   ├── [global-error.test.tsx](./video/src/app/__tests__/global-error.test.tsx)
│   │   │   │   ├── [layout.test.tsx](./video/src/app/__tests__/layout.test.tsx)
│   │   │   │   ├── [loading.test.tsx](./video/src/app/__tests__/loading.test.tsx)
│   │   │   │   ├── [not-found.test.tsx](./video/src/app/__tests__/not-found.test.tsx)
│   │   │   │   ├── [page.test.tsx](./video/src/app/__tests__/page.test.tsx)
│   │   │   │   ├── [robots.test.ts](./video/src/app/__tests__/robots.test.ts)
│   │   │   │   ├── [template.test.tsx](./video/src/app/__tests__/template.test.tsx)
│   │   │   │   └── [unauthorized.test.tsx](./video/src/app/__tests__/unauthorized.test.tsx)
│   │   │   ├── tools/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [page.test.tsx](./video/src/app/tools/__tests__/page.test.tsx)
│   │   │   │   └── [page.tsx](./video/src/app/tools/page.tsx)
│   │   │   ├── [default.tsx](./video/src/app/default.tsx)
│   │   │   ├── [error.tsx](./video/src/app/error.tsx)
│   │   │   ├── [favicon.ico](./video/src/app/favicon.ico)
│   │   │   ├── [forbidden.tsx](./video/src/app/forbidden.tsx)
│   │   │   ├── [global-error.tsx](./video/src/app/global-error.tsx)
│   │   │   ├── [layout.tsx](./video/src/app/layout.tsx)
│   │   │   ├── [loading.tsx](./video/src/app/loading.tsx)
│   │   │   ├── [not-found.tsx](./video/src/app/not-found.tsx)
│   │   │   ├── [page.tsx](./video/src/app/page.tsx)
│   │   │   ├── [robots.ts](./video/src/app/robots.ts)
│   │   │   ├── [template.tsx](./video/src/app/template.tsx)
│   │   │   └── [unauthorized.tsx](./video/src/app/unauthorized.tsx)
│   │   ├── components/
│   │   │   ├── atoms/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [VideoFileUpload.test.tsx](./video/src/components/atoms/__tests__/VideoFileUpload.test.tsx)
│   │   │   │   └── [VideoFileUpload.tsx](./video/src/components/atoms/VideoFileUpload.tsx)
│   │   │   ├── templates/
│   │   │   │   ├── __tests__/
│   │   │   │   │   ├── [AboutTemplate.test.tsx](./video/src/components/templates/__tests__/AboutTemplate.test.tsx)
│   │   │   │   │   ├── [DownloadsTemplate.test.tsx](./video/src/components/templates/__tests__/DownloadsTemplate.test.tsx)
│   │   │   │   │   ├── [ErrorTemplate.test.tsx](./video/src/components/templates/__tests__/ErrorTemplate.test.tsx)
│   │   │   │   │   └── [VersionTemplate.test.tsx](./video/src/components/templates/__tests__/VersionTemplate.test.tsx)
│   │   │   │   ├── [AboutTemplate.tsx](./video/src/components/templates/AboutTemplate.tsx)
│   │   │   │   ├── [DownloadsTemplate.tsx](./video/src/components/templates/DownloadsTemplate.tsx)
│   │   │   │   ├── [ErrorTemplate.tsx](./video/src/components/templates/ErrorTemplate.tsx)
│   │   │   │   └── [VersionTemplate.tsx](./video/src/components/templates/VersionTemplate.tsx)
│   │   │   └── tools/
│   │   │       ├── __tests__/
│   │   │       │   ├── [AudioTranscribeTool.test.tsx](./video/src/components/tools/__tests__/AudioTranscribeTool.test.tsx)
│   │   │       │   ├── [GenerateSubtitleTool.test.tsx](./video/src/components/tools/__tests__/GenerateSubtitleTool.test.tsx)
│   │   │       │   ├── [VideoCompressTool.test.tsx](./video/src/components/tools/__tests__/VideoCompressTool.test.tsx)
│   │   │       │   ├── [VideoConvertTool.test.tsx](./video/src/components/tools/__tests__/VideoConvertTool.test.tsx)
│   │   │       │   ├── [VideoCropTool.test.tsx](./video/src/components/tools/__tests__/VideoCropTool.test.tsx)
│   │   │       │   ├── [VideoDownloadTool.test.tsx](./video/src/components/tools/__tests__/VideoDownloadTool.test.tsx)
│   │   │       │   ├── [VideoExtractAudioTool.test.tsx](./video/src/components/tools/__tests__/VideoExtractAudioTool.test.tsx)
│   │   │       │   ├── [VideoExtractFramesTool.test.tsx](./video/src/components/tools/__tests__/VideoExtractFramesTool.test.tsx)
│   │   │       │   ├── [VideoMergeTool.test.tsx](./video/src/components/tools/__tests__/VideoMergeTool.test.tsx)
│   │   │       │   ├── [VideoMuteTool.test.tsx](./video/src/components/tools/__tests__/VideoMuteTool.test.tsx)
│   │   │       │   ├── [VideoResizeTool.test.tsx](./video/src/components/tools/__tests__/VideoResizeTool.test.tsx)
│   │   │       │   ├── [VideoSpeedTool.test.tsx](./video/src/components/tools/__tests__/VideoSpeedTool.test.tsx)
│   │   │       │   ├── [VideoStabilizeTool.test.tsx](./video/src/components/tools/__tests__/VideoStabilizeTool.test.tsx)
│   │   │       │   ├── [VideoToolsPage.test.tsx](./video/src/components/tools/__tests__/VideoToolsPage.test.tsx)
│   │   │       │   └── [VideoTrimTool.test.tsx](./video/src/components/tools/__tests__/VideoTrimTool.test.tsx)
│   │   │       ├── [AudioTranscribeTool.tsx](./video/src/components/tools/AudioTranscribeTool.tsx)
│   │   │       ├── [GenerateSubtitleTool.tsx](./video/src/components/tools/GenerateSubtitleTool.tsx)
│   │   │       ├── [VideoCompressTool.tsx](./video/src/components/tools/VideoCompressTool.tsx)
│   │   │       ├── [VideoConvertTool.tsx](./video/src/components/tools/VideoConvertTool.tsx)
│   │   │       ├── [VideoCropTool.tsx](./video/src/components/tools/VideoCropTool.tsx)
│   │   │       ├── [VideoDownloadTool.tsx](./video/src/components/tools/VideoDownloadTool.tsx)
│   │   │       ├── [VideoExtractAudioTool.tsx](./video/src/components/tools/VideoExtractAudioTool.tsx)
│   │   │       ├── [VideoExtractFramesTool.tsx](./video/src/components/tools/VideoExtractFramesTool.tsx)
│   │   │       ├── [VideoMergeTool.tsx](./video/src/components/tools/VideoMergeTool.tsx)
│   │   │       ├── [VideoMuteTool.tsx](./video/src/components/tools/VideoMuteTool.tsx)
│   │   │       ├── [VideoResizeTool.tsx](./video/src/components/tools/VideoResizeTool.tsx)
│   │   │       ├── [VideoSpeedTool.tsx](./video/src/components/tools/VideoSpeedTool.tsx)
│   │   │       ├── [VideoStabilizeTool.tsx](./video/src/components/tools/VideoStabilizeTool.tsx)
│   │   │       ├── [VideoToolsPage.tsx](./video/src/components/tools/VideoToolsPage.tsx)
│   │   │       └── [VideoTrimTool.tsx](./video/src/components/tools/VideoTrimTool.tsx)
│   │   ├── data/
│   │   │   ├── __tests__/
│   │   │   │   └── [video-tools.test.ts](./video/src/data/__tests__/video-tools.test.ts)
│   │   │   └── [video-tools.ts](./video/src/data/video-tools.ts)
│   │   ├── lib/
│   │   │   ├── __tests__/
│   │   │   │   └── [video-tools.test.ts](./video/src/lib/__tests__/video-tools.test.ts)
│   │   │   └── [video-tools.ts](./video/src/lib/video-tools.ts)
│   │   ├── styles/
│   │   │   ├── [base.css](./video/src/styles/base.css)
│   │   │   ├── [globals.css](./video/src/styles/globals.css)
│   │   │   └── [themes.css](./video/src/styles/themes.css)
│   │   └── types/
│   │       └── [speech-recognition.d.ts](./video/src/types/speech-recognition.d.ts)
│   ├── src-tauri/
│   │   ├── capabilities/
│   │   │   └── [default.json](./video/src-tauri/capabilities/default.json)
│   │   ├── icons/
│   │   │   ├── [128x128.png](./video/src-tauri/icons/128x128.png)
│   │   │   ├── [128x128@2x.png](./video/src-tauri/icons/128x128@2x.png)
│   │   │   ├── [32x32.png](./video/src-tauri/icons/32x32.png)
│   │   │   ├── [Square107x107Logo.png](./video/src-tauri/icons/Square107x107Logo.png)
│   │   │   ├── [Square142x142Logo.png](./video/src-tauri/icons/Square142x142Logo.png)
│   │   │   ├── [Square150x150Logo.png](./video/src-tauri/icons/Square150x150Logo.png)
│   │   │   ├── [Square284x284Logo.png](./video/src-tauri/icons/Square284x284Logo.png)
│   │   │   ├── [Square30x30Logo.png](./video/src-tauri/icons/Square30x30Logo.png)
│   │   │   ├── [Square310x310Logo.png](./video/src-tauri/icons/Square310x310Logo.png)
│   │   │   ├── [Square44x44Logo.png](./video/src-tauri/icons/Square44x44Logo.png)
│   │   │   ├── [Square71x71Logo.png](./video/src-tauri/icons/Square71x71Logo.png)
│   │   │   ├── [Square89x89Logo.png](./video/src-tauri/icons/Square89x89Logo.png)
│   │   │   ├── [StoreLogo.png](./video/src-tauri/icons/StoreLogo.png)
│   │   │   ├── [icon.icns](./video/src-tauri/icons/icon.icns)
│   │   │   ├── [icon.ico](./video/src-tauri/icons/icon.ico)
│   │   │   └── [icon.png](./video/src-tauri/icons/icon.png)
│   │   ├── src/
│   │   │   ├── [lib.rs](./video/src-tauri/src/lib.rs)
│   │   │   └── [main.rs](./video/src-tauri/src/main.rs)
│   │   ├── [Cargo.lock](./video/src-tauri/Cargo.lock)
│   │   ├── [Cargo.toml](./video/src-tauri/Cargo.toml)
│   │   ├── [build.rs](./video/src-tauri/build.rs)
│   │   └── [tauri.conf.json](./video/src-tauri/tauri.conf.json)
│   ├── [AGENTS.md](./video/AGENTS.md)
│   ├── [Dockerfile](./video/Dockerfile)
│   ├── [LICENSE](./video/LICENSE)
│   ├── [README.md](./video/README.md)
│   ├── [TREE.md](./video/TREE.md)
│   ├── [docker-compose.yaml](./video/docker-compose.yaml)
│   ├── [eslint.config.mts](./video/eslint.config.mts)
│   ├── [jest.config.ts](./video/jest.config.ts)
│   ├── [jest.setup.ts](./video/jest.setup.ts)
│   ├── [next.config.ts](./video/next.config.ts)
│   ├── [package.json](./video/package.json)
│   ├── [playwright.config.ts](./video/playwright.config.ts)
│   ├── [postcss.config.mjs](./video/postcss.config.mjs)
│   └── [tsconfig.json](./video/tsconfig.json)
├── [README.md](./README.md)
└── [TREE.md](./TREE.md)
```

167 directories, 588 files
