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
│   ├── [albums.spec.ts](./e2e/albums.spec.ts)
│   ├── [crop.spec.ts](./e2e/crop.spec.ts)
│   ├── [edit.spec.ts](./e2e/edit.spec.ts)
│   ├── [home.spec.ts](./e2e/home.spec.ts)
│   ├── [layers.spec.ts](./e2e/layers.spec.ts)
│   ├── [navigation.spec.ts](./e2e/navigation.spec.ts)
│   ├── [profile.spec.ts](./e2e/profile.spec.ts)
│   ├── [settings.spec.ts](./e2e/settings.spec.ts)
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
│   │   ├── albums/
│   │   │   ├── __tests__/
│   │   │   │   └── [page.test.tsx](./src/app/albums/__tests__/page.test.tsx)
│   │   │   └── [page.tsx](./src/app/albums/page.tsx)
│   │   ├── edit/
│   │   │   ├── __tests__/
│   │   │   │   └── [page.test.tsx](./src/app/edit/__tests__/page.test.tsx)
│   │   │   ├── crop/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [page.test.tsx](./src/app/edit/crop/__tests__/page.test.tsx)
│   │   │   │   └── [page.tsx](./src/app/edit/crop/page.tsx)
│   │   │   ├── layers/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [page.test.tsx](./src/app/edit/layers/__tests__/page.test.tsx)
│   │   │   │   └── [page.tsx](./src/app/edit/layers/page.tsx)
│   │   │   └── [page.tsx](./src/app/edit/page.tsx)
│   │   ├── settings/
│   │   │   ├── __tests__/
│   │   │   │   └── [page.test.tsx](./src/app/settings/__tests__/page.test.tsx)
│   │   │   └── [page.tsx](./src/app/settings/page.tsx)
│   │   ├── tools/
│   │   │   ├── __tests__/
│   │   │   │   └── [page.test.tsx](./src/app/tools/__tests__/page.test.tsx)
│   │   │   └── [page.tsx](./src/app/tools/page.tsx)
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
│   │   ├── atoms/
│   │   │   ├── __tests__/
│   │   │   │   └── [ImageFileUpload.test.tsx](./src/components/atoms/__tests__/ImageFileUpload.test.tsx)
│   │   │   └── [ImageFileUpload.tsx](./src/components/atoms/ImageFileUpload.tsx)
│   │   ├── organisms/
│   │   │   ├── __tests__/
│   │   │   │   └── [ToastContainer.test.tsx](./src/components/organisms/__tests__/ToastContainer.test.tsx)
│   │   │   └── [ToastContainer.tsx](./src/components/organisms/ToastContainer.tsx)
│   │   ├── templates/
│   │   │   ├── __tests__/
│   │   │   │   ├── [AboutTemplate.test.tsx](./src/components/templates/__tests__/AboutTemplate.test.tsx)
│   │   │   │   ├── [DownloadsTemplate.test.tsx](./src/components/templates/__tests__/DownloadsTemplate.test.tsx)
│   │   │   │   ├── [ErrorTemplate.test.tsx](./src/components/templates/__tests__/ErrorTemplate.test.tsx)
│   │   │   │   └── [VersionTemplate.test.tsx](./src/components/templates/__tests__/VersionTemplate.test.tsx)
│   │   │   ├── [AboutTemplate.tsx](./src/components/templates/AboutTemplate.tsx)
│   │   │   ├── [DownloadsTemplate.tsx](./src/components/templates/DownloadsTemplate.tsx)
│   │   │   ├── [ErrorTemplate.tsx](./src/components/templates/ErrorTemplate.tsx)
│   │   │   └── [VersionTemplate.tsx](./src/components/templates/VersionTemplate.tsx)
│   │   ├── tools/
│   │   │   ├── __tests__/
│   │   │   │   ├── [AiColorizeTool.test.tsx](./src/components/tools/__tests__/AiColorizeTool.test.tsx)
│   │   │   │   ├── [AiGenerateTool.test.tsx](./src/components/tools/__tests__/AiGenerateTool.test.tsx)
│   │   │   │   ├── [AiRemoveBgTool.test.tsx](./src/components/tools/__tests__/AiRemoveBgTool.test.tsx)
│   │   │   │   ├── [AiRemoveObjectTool.test.tsx](./src/components/tools/__tests__/AiRemoveObjectTool.test.tsx)
│   │   │   │   ├── [AiRemovePersonTool.test.tsx](./src/components/tools/__tests__/AiRemovePersonTool.test.tsx)
│   │   │   │   ├── [AiRemoveWatermarkTool.test.tsx](./src/components/tools/__tests__/AiRemoveWatermarkTool.test.tsx)
│   │   │   │   ├── [AiRestoreTool.test.tsx](./src/components/tools/__tests__/AiRestoreTool.test.tsx)
│   │   │   │   ├── [AiUnblurTool.test.tsx](./src/components/tools/__tests__/AiUnblurTool.test.tsx)
│   │   │   │   ├── [AiUpscaleTool.test.tsx](./src/components/tools/__tests__/AiUpscaleTool.test.tsx)
│   │   │   │   ├── [BarcodeReadTool.test.tsx](./src/components/tools/__tests__/BarcodeReadTool.test.tsx)
│   │   │   │   ├── [BarcodeTool.test.tsx](./src/components/tools/__tests__/BarcodeTool.test.tsx)
│   │   │   │   ├── [Base64Tool.test.tsx](./src/components/tools/__tests__/Base64Tool.test.tsx)
│   │   │   │   ├── [BreakingBadTool.test.tsx](./src/components/tools/__tests__/BreakingBadTool.test.tsx)
│   │   │   │   ├── [CameraTool.test.tsx](./src/components/tools/__tests__/CameraTool.test.tsx)
│   │   │   │   ├── [ChartMakerTool.test.tsx](./src/components/tools/__tests__/ChartMakerTool.test.tsx)
│   │   │   │   ├── [CollageMakerTool.test.tsx](./src/components/tools/__tests__/CollageMakerTool.test.tsx)
│   │   │   │   ├── [ColorsTool.test.tsx](./src/components/tools/__tests__/ColorsTool.test.tsx)
│   │   │   │   ├── [ContrastCheckerTool.test.tsx](./src/components/tools/__tests__/ContrastCheckerTool.test.tsx)
│   │   │   │   ├── [GitHubSocialPreviewTool.test.tsx](./src/components/tools/__tests__/GitHubSocialPreviewTool.test.tsx)
│   │   │   │   ├── [GradientGeneratorTool.test.tsx](./src/components/tools/__tests__/GradientGeneratorTool.test.tsx)
│   │   │   │   ├── [HouseTool.test.tsx](./src/components/tools/__tests__/HouseTool.test.tsx)
│   │   │   │   ├── [ImageAdjustTool.test.tsx](./src/components/tools/__tests__/ImageAdjustTool.test.tsx)
│   │   │   │   ├── [ImageBlurBackgroundTool.test.tsx](./src/components/tools/__tests__/ImageBlurBackgroundTool.test.tsx)
│   │   │   │   ├── [ImageBorderTool.test.tsx](./src/components/tools/__tests__/ImageBorderTool.test.tsx)
│   │   │   │   ├── [ImageBwTool.test.tsx](./src/components/tools/__tests__/ImageBwTool.test.tsx)
│   │   │   │   ├── [ImageColorizeTool.test.tsx](./src/components/tools/__tests__/ImageColorizeTool.test.tsx)
│   │   │   │   ├── [ImageCombinerSideBySideTool.test.tsx](./src/components/tools/__tests__/ImageCombinerSideBySideTool.test.tsx)
│   │   │   │   ├── [ImageCombinerStackedTool.test.tsx](./src/components/tools/__tests__/ImageCombinerStackedTool.test.tsx)
│   │   │   │   ├── [ImageCompressTool.test.tsx](./src/components/tools/__tests__/ImageCompressTool.test.tsx)
│   │   │   │   ├── [ImageConvertTool.test.tsx](./src/components/tools/__tests__/ImageConvertTool.test.tsx)
│   │   │   │   ├── [ImageCropTool.test.tsx](./src/components/tools/__tests__/ImageCropTool.test.tsx)
│   │   │   │   ├── [ImageDominantColorTool.test.tsx](./src/components/tools/__tests__/ImageDominantColorTool.test.tsx)
│   │   │   │   ├── [ImageFlipTool.test.tsx](./src/components/tools/__tests__/ImageFlipTool.test.tsx)
│   │   │   │   ├── [ImageMorphingTool.test.tsx](./src/components/tools/__tests__/ImageMorphingTool.test.tsx)
│   │   │   │   ├── [ImageOcrTool.test.tsx](./src/components/tools/__tests__/ImageOcrTool.test.tsx)
│   │   │   │   ├── [ImagePhotoFiltersTool.test.tsx](./src/components/tools/__tests__/ImagePhotoFiltersTool.test.tsx)
│   │   │   │   ├── [ImagePixelateFaceTool.test.tsx](./src/components/tools/__tests__/ImagePixelateFaceTool.test.tsx)
│   │   │   │   ├── [ImagePixelateTool.test.tsx](./src/components/tools/__tests__/ImagePixelateTool.test.tsx)
│   │   │   │   ├── [ImageProfileTool.test.tsx](./src/components/tools/__tests__/ImageProfileTool.test.tsx)
│   │   │   │   ├── [ImageResizeTool.test.tsx](./src/components/tools/__tests__/ImageResizeTool.test.tsx)
│   │   │   │   ├── [ImageRotateTool.test.tsx](./src/components/tools/__tests__/ImageRotateTool.test.tsx)
│   │   │   │   ├── [ImageRoundTool.test.tsx](./src/components/tools/__tests__/ImageRoundTool.test.tsx)
│   │   │   │   ├── [ImageShadowTool.test.tsx](./src/components/tools/__tests__/ImageShadowTool.test.tsx)
│   │   │   │   ├── [ImageSharpenTool.test.tsx](./src/components/tools/__tests__/ImageSharpenTool.test.tsx)
│   │   │   │   ├── [ImageSplitTool.test.tsx](./src/components/tools/__tests__/ImageSplitTool.test.tsx)
│   │   │   │   ├── [ImageTextTool.test.tsx](./src/components/tools/__tests__/ImageTextTool.test.tsx)
│   │   │   │   ├── [ImageTranslateTool.test.tsx](./src/components/tools/__tests__/ImageTranslateTool.test.tsx)
│   │   │   │   ├── [ImageTransparentBgTool.test.tsx](./src/components/tools/__tests__/ImageTransparentBgTool.test.tsx)
│   │   │   │   ├── [ImageVignetteTool.test.tsx](./src/components/tools/__tests__/ImageVignetteTool.test.tsx)
│   │   │   │   ├── [ImageWatermarkTool.test.tsx](./src/components/tools/__tests__/ImageWatermarkTool.test.tsx)
│   │   │   │   ├── [InstaSizeTool.test.tsx](./src/components/tools/__tests__/InstaSizeTool.test.tsx)
│   │   │   │   ├── [InvoiceParserTool.test.tsx](./src/components/tools/__tests__/InvoiceParserTool.test.tsx)
│   │   │   │   ├── [MemeMakerTool.test.tsx](./src/components/tools/__tests__/MemeMakerTool.test.tsx)
│   │   │   │   ├── [PixelTool.test.tsx](./src/components/tools/__tests__/PixelTool.test.tsx)
│   │   │   │   ├── [QRCodeTool.test.tsx](./src/components/tools/__tests__/QRCodeTool.test.tsx)
│   │   │   │   ├── [QrReadTool.test.tsx](./src/components/tools/__tests__/QrReadTool.test.tsx)
│   │   │   │   └── [YouTubeThumbnailsTool.test.tsx](./src/components/tools/__tests__/YouTubeThumbnailsTool.test.tsx)
│   │   │   ├── [AiColorizeTool.tsx](./src/components/tools/AiColorizeTool.tsx)
│   │   │   ├── [AiGenerateTool.tsx](./src/components/tools/AiGenerateTool.tsx)
│   │   │   ├── [AiRemoveBgTool.tsx](./src/components/tools/AiRemoveBgTool.tsx)
│   │   │   ├── [AiRemoveObjectTool.tsx](./src/components/tools/AiRemoveObjectTool.tsx)
│   │   │   ├── [AiRemovePersonTool.tsx](./src/components/tools/AiRemovePersonTool.tsx)
│   │   │   ├── [AiRemoveWatermarkTool.tsx](./src/components/tools/AiRemoveWatermarkTool.tsx)
│   │   │   ├── [AiRestoreTool.tsx](./src/components/tools/AiRestoreTool.tsx)
│   │   │   ├── [AiUnblurTool.tsx](./src/components/tools/AiUnblurTool.tsx)
│   │   │   ├── [AiUpscaleTool.tsx](./src/components/tools/AiUpscaleTool.tsx)
│   │   │   ├── [BarcodeReadTool.tsx](./src/components/tools/BarcodeReadTool.tsx)
│   │   │   ├── [BarcodeTool.tsx](./src/components/tools/BarcodeTool.tsx)
│   │   │   ├── [Base64Tool.tsx](./src/components/tools/Base64Tool.tsx)
│   │   │   ├── [BreakingBadTool.tsx](./src/components/tools/BreakingBadTool.tsx)
│   │   │   ├── [CameraTool.tsx](./src/components/tools/CameraTool.tsx)
│   │   │   ├── [ChartMakerTool.tsx](./src/components/tools/ChartMakerTool.tsx)
│   │   │   ├── [CollageMakerTool.tsx](./src/components/tools/CollageMakerTool.tsx)
│   │   │   ├── [ColorsTool.tsx](./src/components/tools/ColorsTool.tsx)
│   │   │   ├── [ContrastCheckerTool.tsx](./src/components/tools/ContrastCheckerTool.tsx)
│   │   │   ├── [GitHubSocialPreviewTool.tsx](./src/components/tools/GitHubSocialPreviewTool.tsx)
│   │   │   ├── [GradientGeneratorTool.tsx](./src/components/tools/GradientGeneratorTool.tsx)
│   │   │   ├── [HouseTool.tsx](./src/components/tools/HouseTool.tsx)
│   │   │   ├── [ImageAdjustTool.tsx](./src/components/tools/ImageAdjustTool.tsx)
│   │   │   ├── [ImageBlurBackgroundTool.tsx](./src/components/tools/ImageBlurBackgroundTool.tsx)
│   │   │   ├── [ImageBorderTool.tsx](./src/components/tools/ImageBorderTool.tsx)
│   │   │   ├── [ImageBwTool.tsx](./src/components/tools/ImageBwTool.tsx)
│   │   │   ├── [ImageColorizeTool.tsx](./src/components/tools/ImageColorizeTool.tsx)
│   │   │   ├── [ImageCombinerSideBySideTool.tsx](./src/components/tools/ImageCombinerSideBySideTool.tsx)
│   │   │   ├── [ImageCombinerStackedTool.tsx](./src/components/tools/ImageCombinerStackedTool.tsx)
│   │   │   ├── [ImageCompressTool.tsx](./src/components/tools/ImageCompressTool.tsx)
│   │   │   ├── [ImageConvertTool.tsx](./src/components/tools/ImageConvertTool.tsx)
│   │   │   ├── [ImageCropTool.tsx](./src/components/tools/ImageCropTool.tsx)
│   │   │   ├── [ImageDominantColorTool.tsx](./src/components/tools/ImageDominantColorTool.tsx)
│   │   │   ├── [ImageFlipTool.tsx](./src/components/tools/ImageFlipTool.tsx)
│   │   │   ├── [ImageMorphingTool.tsx](./src/components/tools/ImageMorphingTool.tsx)
│   │   │   ├── [ImageOcrTool.tsx](./src/components/tools/ImageOcrTool.tsx)
│   │   │   ├── [ImagePhotoFiltersTool.tsx](./src/components/tools/ImagePhotoFiltersTool.tsx)
│   │   │   ├── [ImagePixelateFaceTool.tsx](./src/components/tools/ImagePixelateFaceTool.tsx)
│   │   │   ├── [ImagePixelateTool.tsx](./src/components/tools/ImagePixelateTool.tsx)
│   │   │   ├── [ImageProfileTool.tsx](./src/components/tools/ImageProfileTool.tsx)
│   │   │   ├── [ImageResizeTool.tsx](./src/components/tools/ImageResizeTool.tsx)
│   │   │   ├── [ImageRotateTool.tsx](./src/components/tools/ImageRotateTool.tsx)
│   │   │   ├── [ImageRoundTool.tsx](./src/components/tools/ImageRoundTool.tsx)
│   │   │   ├── [ImageShadowTool.tsx](./src/components/tools/ImageShadowTool.tsx)
│   │   │   ├── [ImageSharpenTool.tsx](./src/components/tools/ImageSharpenTool.tsx)
│   │   │   ├── [ImageSplitTool.tsx](./src/components/tools/ImageSplitTool.tsx)
│   │   │   ├── [ImageTextTool.tsx](./src/components/tools/ImageTextTool.tsx)
│   │   │   ├── [ImageTranslateTool.tsx](./src/components/tools/ImageTranslateTool.tsx)
│   │   │   ├── [ImageTransparentBgTool.tsx](./src/components/tools/ImageTransparentBgTool.tsx)
│   │   │   ├── [ImageVignetteTool.tsx](./src/components/tools/ImageVignetteTool.tsx)
│   │   │   ├── [ImageWatermarkTool.tsx](./src/components/tools/ImageWatermarkTool.tsx)
│   │   │   ├── [InstaSizeTool.tsx](./src/components/tools/InstaSizeTool.tsx)
│   │   │   ├── [InvoiceParserTool.tsx](./src/components/tools/InvoiceParserTool.tsx)
│   │   │   ├── [MemeMakerTool.tsx](./src/components/tools/MemeMakerTool.tsx)
│   │   │   ├── [PixelTool.tsx](./src/components/tools/PixelTool.tsx)
│   │   │   ├── [QRCodeTool.tsx](./src/components/tools/QRCodeTool.tsx)
│   │   │   ├── [QrReadTool.tsx](./src/components/tools/QrReadTool.tsx)
│   │   │   └── [YouTubeThumbnailsTool.tsx](./src/components/tools/YouTubeThumbnailsTool.tsx)
│   │   └── [SWProvider.tsx](./src/components/SWProvider.tsx)
│   ├── data/
│   │   ├── __tests__/
│   │   │   └── [data.test.ts](./src/data/__tests__/data.test.ts)
│   │   ├── [models.ts](./src/data/models.ts)
│   │   ├── [photo-tools.ts](./src/data/photo-tools.ts)
│   │   └── [seed.ts](./src/data/seed.ts)
│   ├── hooks/
│   │   ├── __tests__/
│   │   │   └── [useSWRegister.test.ts](./src/hooks/__tests__/useSWRegister.test.ts)
│   │   └── [useSWRegister.ts](./src/hooks/useSWRegister.ts)
│   ├── lib/
│   │   ├── __tests__/
│   │   │   ├── [db.test.ts](./src/lib/__tests__/db.test.ts)
│   │   │   └── [photo-tools.test.ts](./src/lib/__tests__/photo-tools.test.ts)
│   │   ├── [db.ts](./src/lib/db.ts)
│   │   └── [photo-tools.ts](./src/lib/photo-tools.ts)
│   ├── providers/
│   │   ├── __tests__/
│   │   │   ├── [DataProvider.test.tsx](./src/providers/__tests__/DataProvider.test.tsx)
│   │   │   └── [ToastProvider.test.tsx](./src/providers/__tests__/ToastProvider.test.tsx)
│   │   ├── [DataProvider.tsx](./src/providers/DataProvider.tsx)
│   │   ├── [Providers.tsx](./src/providers/Providers.tsx)
│   │   └── [ToastProvider.tsx](./src/providers/ToastProvider.tsx)
│   ├── server/
│   │   ├── __tests__/
│   │   │   └── [openrouter.test.ts](./src/server/__tests__/openrouter.test.ts)
│   │   └── trpc/
│   │       ├── routers/
│   │       │   ├── openrouter/
│   │       │   │   └── [index.ts](./src/server/trpc/routers/openrouter/index.ts)
│   │       │   └── [_app.ts](./src/server/trpc/routers/_app.ts)
│   │       └── [trpc.ts](./src/server/trpc/trpc.ts)
│   ├── styles/
│   │   ├── [base.css](./src/styles/base.css)
│   │   ├── [globals.css](./src/styles/globals.css)
│   │   └── [themes.css](./src/styles/themes.css)
│   ├── types/
│   │   └── [index.ts](./src/types/index.ts)
│   └── utils/
│       ├── __tests__/
│       │   └── [format.test.ts](./src/utils/__tests__/format.test.ts)
│       ├── [format.ts](./src/utils/format.ts)
│       └── [trpc.ts](./src/utils/trpc.ts)
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

68 directories, 276 files
