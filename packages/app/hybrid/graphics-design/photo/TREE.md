# TREE

```text
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
│   │   ├── [icon-192x192.png](./public/icons/icon-192x192.png)
│   │   ├── [icon-512x512.png](./public/icons/icon-512x512.png)
│   │   └── [icon.svg](./public/icons/icon.svg)
│   ├── [apple-touch-icon.png](./public/apple-touch-icon.png)
│   ├── [favicon.ico](./public/favicon.ico)
│   ├── [manifest.json](./public/manifest.json)
│   ├── [robots.txt](./public/robots.txt)
│   ├── [sitemap.xml](./public/sitemap.xml)
│   └── [sw.js](./public/sw.js)
├── src/
│   ├── app/
│   │   ├── about/
│   │   │   └── [page.tsx](./src/app/about/page.tsx)
│   │   ├── albums/
│   │   │   └── [page.tsx](./src/app/albums/page.tsx)
│   │   ├── edit/
│   │   │   ├── crop/
│   │   │   │   └── [page.tsx](./src/app/edit/crop/page.tsx)
│   │   │   ├── layers/
│   │   │   │   └── [page.tsx](./src/app/edit/layers/page.tsx)
│   │   │   └── [page.tsx](./src/app/edit/page.tsx)
│   │   ├── profile/
│   │   │   └── [page.tsx](./src/app/profile/page.tsx)
│   │   ├── settings/
│   │   │   └── [page.tsx](./src/app/settings/page.tsx)
│   │   ├── tools/
│   │   │   └── [page.tsx](./src/app/tools/page.tsx)
│   │   ├── version/
│   │   │   └── [page.tsx](./src/app/version/page.tsx)
│   │   ├── [error.tsx](./src/app/error.tsx)
│   │   ├── [layout.tsx](./src/app/layout.tsx)
│   │   ├── [not-found.tsx](./src/app/not-found.tsx)
│   │   └── [page.tsx](./src/app/page.tsx)
│   ├── components/
│   │   ├── atoms/
│   │   │   └── [ImageFileUpload.tsx](./src/components/atoms/ImageFileUpload.tsx)
│   │   ├── organisms/
│   │   │   └── [ToastContainer.tsx](./src/components/organisms/ToastContainer.tsx)
│   │   ├── templates/
│   │   │   ├── [AboutTemplate.tsx](./src/components/templates/AboutTemplate.tsx)
│   │   │   ├── [ErrorTemplate.tsx](./src/components/templates/ErrorTemplate.tsx)
│   │   │   └── [VersionTemplate.tsx](./src/components/templates/VersionTemplate.tsx)
│   │   ├── tools/
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
│   │   ├── [models.ts](./src/data/models.ts)
│   │   ├── [photo-tools.ts](./src/data/photo-tools.ts)
│   │   └── [seed.ts](./src/data/seed.ts)
│   ├── hooks/
│   │   └── [useSWRegister.ts](./src/hooks/useSWRegister.ts)
│   ├── lib/
│   │   ├── [db.ts](./src/lib/db.ts)
│   │   └── [photo-tools.ts](./src/lib/photo-tools.ts)
│   ├── providers/
│   │   ├── [DataProvider.tsx](./src/providers/DataProvider.tsx)
│   │   ├── [Providers.tsx](./src/providers/Providers.tsx)
│   │   └── [ToastProvider.tsx](./src/providers/ToastProvider.tsx)
│   ├── server/
│   │   └── trpc/
│   │       ├── routers/
│   │       │   ├── openrouter/
│   │       │   │   └── [index.ts](./src/server/trpc/routers/openrouter/index.ts)
│   │       │   └── [_app.ts](./src/server/trpc/routers/_app.ts)
│   │       └── [trpc.ts](./src/server/trpc/trpc.ts)
│   ├── styles/
│   │   └── [globals.css](./src/styles/globals.css)
│   ├── types/
│   │   └── [index.ts](./src/types/index.ts)
│   └── utils/
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

34 directories, 145 files
