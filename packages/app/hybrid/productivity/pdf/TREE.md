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
│   ├── [home.spec.ts](./e2e/home.spec.ts)
│   ├── [navigation.spec.ts](./e2e/navigation.spec.ts)
│   ├── [pdf-compare.spec.ts](./e2e/pdf-compare.spec.ts)
│   ├── [pdf-edit.spec.ts](./e2e/pdf-edit.spec.ts)
│   ├── [pdf-merge.spec.ts](./e2e/pdf-merge.spec.ts)
│   ├── [pdf-viewer.spec.ts](./e2e/pdf-viewer.spec.ts)
│   ├── [profile.spec.ts](./e2e/profile.spec.ts)
│   ├── [settings.spec.ts](./e2e/settings.spec.ts)
│   ├── [version.spec.ts](./e2e/version.spec.ts)
│   └── [view-mode.spec.ts](./e2e/view-mode.spec.ts)
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
│   │   │   │   └── [page.tsx](./src/app/(info)/about/page.tsx)
│   │   │   ├── downloads/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [page.test.tsx](./src/app/(info)/downloads/__tests__/page.test.tsx)
│   │   │   │   └── [page.tsx](./src/app/(info)/downloads/page.tsx)
│   │   │   └── version/
│   │   │       └── [page.tsx](./src/app/(info)/version/page.tsx)
│   │   ├── __tests__/
│   │   │   ├── [about-page.test.tsx](./src/app/__tests__/about-page.test.tsx)
│   │   │   ├── [error-page.test.tsx](./src/app/__tests__/error-page.test.tsx)
│   │   │   ├── [error.test.tsx](./src/app/__tests__/error.test.tsx)
│   │   │   ├── [forbidden.test.tsx](./src/app/__tests__/forbidden.test.tsx)
│   │   │   ├── [global-error.test.tsx](./src/app/__tests__/global-error.test.tsx)
│   │   │   ├── [home-page.test.tsx](./src/app/__tests__/home-page.test.tsx)
│   │   │   ├── [layout.test.tsx](./src/app/__tests__/layout.test.tsx)
│   │   │   ├── [loading.test.tsx](./src/app/__tests__/loading.test.tsx)
│   │   │   ├── [not-found-page.test.tsx](./src/app/__tests__/not-found-page.test.tsx)
│   │   │   ├── [not-found.test.tsx](./src/app/__tests__/not-found.test.tsx)
│   │   │   ├── [pdf-compare-page.test.tsx](./src/app/__tests__/pdf-compare-page.test.tsx)
│   │   │   ├── [pdf-edit-page.test.tsx](./src/app/__tests__/pdf-edit-page.test.tsx)
│   │   │   ├── [pdf-merge-page.test.tsx](./src/app/__tests__/pdf-merge-page.test.tsx)
│   │   │   ├── [pdf-viewer-page.test.tsx](./src/app/__tests__/pdf-viewer-page.test.tsx)
│   │   │   ├── [robots.test.ts](./src/app/__tests__/robots.test.ts)
│   │   │   ├── [settings-page.test.tsx](./src/app/__tests__/settings-page.test.tsx)
│   │   │   ├── [template.test.tsx](./src/app/__tests__/template.test.tsx)
│   │   │   ├── [tools-page.test.tsx](./src/app/__tests__/tools-page.test.tsx)
│   │   │   ├── [unauthorized.test.tsx](./src/app/__tests__/unauthorized.test.tsx)
│   │   │   └── [version-page.test.tsx](./src/app/__tests__/version-page.test.tsx)
│   │   ├── pdf/
│   │   │   ├── compare/
│   │   │   │   └── [page.tsx](./src/app/pdf/compare/page.tsx)
│   │   │   ├── edit/
│   │   │   │   └── [page.tsx](./src/app/pdf/edit/page.tsx)
│   │   │   ├── merge/
│   │   │   │   └── [page.tsx](./src/app/pdf/merge/page.tsx)
│   │   │   └── [page.tsx](./src/app/pdf/page.tsx)
│   │   ├── settings/
│   │   │   └── [page.tsx](./src/app/settings/page.tsx)
│   │   ├── tools/
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
│   │   │   ├── [PdfFileUpload.test.tsx](./src/components/__tests__/PdfFileUpload.test.tsx)
│   │   │   └── [SWProvider.test.tsx](./src/components/__tests__/SWProvider.test.tsx)
│   │   ├── atoms/
│   │   │   ├── __mocks__/
│   │   │   │   └── [PdfFileUpload.tsx](./src/components/atoms/__mocks__/PdfFileUpload.tsx)
│   │   │   └── [PdfFileUpload.tsx](./src/components/atoms/PdfFileUpload.tsx)
│   │   ├── molecules/
│   │   │   ├── __tests__/
│   │   │   │   ├── [FormFieldsLayer.test.tsx](./src/components/molecules/__tests__/FormFieldsLayer.test.tsx)
│   │   │   │   ├── [PageOrganizer.test.tsx](./src/components/molecules/__tests__/PageOrganizer.test.tsx)
│   │   │   │   ├── [PageView.test.tsx](./src/components/molecules/__tests__/PageView.test.tsx)
│   │   │   │   └── [SignaturePad.test.tsx](./src/components/molecules/__tests__/SignaturePad.test.tsx)
│   │   │   ├── [FormFieldsLayer.tsx](./src/components/molecules/FormFieldsLayer.tsx)
│   │   │   ├── [PageOrganizer.tsx](./src/components/molecules/PageOrganizer.tsx)
│   │   │   ├── [PageView.tsx](./src/components/molecules/PageView.tsx)
│   │   │   ├── [SignaturePad.tsx](./src/components/molecules/SignaturePad.tsx)
│   │   │   └── [ViewerSkeleton.tsx](./src/components/molecules/ViewerSkeleton.tsx)
│   │   ├── organisms/
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
│   │   │   │   ├── [convert-create-tools.test.tsx](./src/components/tools/__tests__/convert-create-tools.test.tsx)
│   │   │   │   ├── [pdf-canvas-tools.test.tsx](./src/components/tools/__tests__/pdf-canvas-tools.test.tsx)
│   │   │   │   └── [pdf-operations-tools.test.tsx](./src/components/tools/__tests__/pdf-operations-tools.test.tsx)
│   │   │   ├── [CreateTextToPdfTool.tsx](./src/components/tools/CreateTextToPdfTool.tsx)
│   │   │   ├── [CreateUrlToPdfTool.tsx](./src/components/tools/CreateUrlToPdfTool.tsx)
│   │   │   ├── [EbookConvertTool.tsx](./src/components/tools/EbookConvertTool.tsx)
│   │   │   ├── [ImagesToPdfTool.tsx](./src/components/tools/ImagesToPdfTool.tsx)
│   │   │   ├── [PdfAnnotateTool.tsx](./src/components/tools/PdfAnnotateTool.tsx)
│   │   │   ├── [PdfCompressTool.tsx](./src/components/tools/PdfCompressTool.tsx)
│   │   │   ├── [PdfCropTool.tsx](./src/components/tools/PdfCropTool.tsx)
│   │   │   ├── [PdfDeletePagesTool.tsx](./src/components/tools/PdfDeletePagesTool.tsx)
│   │   │   ├── [PdfEsignTool.tsx](./src/components/tools/PdfEsignTool.tsx)
│   │   │   ├── [PdfExtractImagesTool.tsx](./src/components/tools/PdfExtractImagesTool.tsx)
│   │   │   ├── [PdfExtractTextTool.tsx](./src/components/tools/PdfExtractTextTool.tsx)
│   │   │   ├── [PdfInfoTool.tsx](./src/components/tools/PdfInfoTool.tsx)
│   │   │   ├── [PdfMergeTool.tsx](./src/components/tools/PdfMergeTool.tsx)
│   │   │   ├── [PdfMetadataTool.tsx](./src/components/tools/PdfMetadataTool.tsx)
│   │   │   ├── [PdfOcrTool.tsx](./src/components/tools/PdfOcrTool.tsx)
│   │   │   ├── [PdfPageNumbersTool.tsx](./src/components/tools/PdfPageNumbersTool.tsx)
│   │   │   ├── [PdfPlaceholderTool.tsx](./src/components/tools/PdfPlaceholderTool.tsx)
│   │   │   ├── [PdfRearrangeTool.tsx](./src/components/tools/PdfRearrangeTool.tsx)
│   │   │   ├── [PdfRedactTool.tsx](./src/components/tools/PdfRedactTool.tsx)
│   │   │   ├── [PdfRepairTool.tsx](./src/components/tools/PdfRepairTool.tsx)
│   │   │   ├── [PdfRotateTool.tsx](./src/components/tools/PdfRotateTool.tsx)
│   │   │   ├── [PdfSecurityTool.tsx](./src/components/tools/PdfSecurityTool.tsx)
│   │   │   ├── [PdfSplitTool.tsx](./src/components/tools/PdfSplitTool.tsx)
│   │   │   ├── [PdfToFormatTool.tsx](./src/components/tools/PdfToFormatTool.tsx)
│   │   │   ├── [PdfToImagesTool.tsx](./src/components/tools/PdfToImagesTool.tsx)
│   │   │   ├── [PdfTranslateTool.tsx](./src/components/tools/PdfTranslateTool.tsx)
│   │   │   ├── [PdfWatermarkTool.tsx](./src/components/tools/PdfWatermarkTool.tsx)
│   │   │   └── [UrlToPdfTool.tsx](./src/components/tools/UrlToPdfTool.tsx)
│   │   └── [SWProvider.tsx](./src/components/SWProvider.tsx)
│   ├── data/
│   │   ├── __tests__/
│   │   │   ├── [models.test.ts](./src/data/__tests__/models.test.ts)
│   │   │   ├── [pdf-tools.test.ts](./src/data/__tests__/pdf-tools.test.ts)
│   │   │   └── [seed.test.ts](./src/data/__tests__/seed.test.ts)
│   │   ├── [models.ts](./src/data/models.ts)
│   │   ├── [pdf-tools.ts](./src/data/pdf-tools.ts)
│   │   └── [seed.ts](./src/data/seed.ts)
│   ├── hooks/
│   │   ├── __tests__/
│   │   │   └── [useSWRegister.test.ts](./src/hooks/__tests__/useSWRegister.test.ts)
│   │   └── [useSWRegister.ts](./src/hooks/useSWRegister.ts)
│   ├── lib/
│   │   ├── __tests__/
│   │   │   ├── [db.test.ts](./src/lib/__tests__/db.test.ts)
│   │   │   └── [pdf-tools.test.ts](./src/lib/__tests__/pdf-tools.test.ts)
│   │   ├── [db.ts](./src/lib/db.ts)
│   │   └── [pdf-tools.ts](./src/lib/pdf-tools.ts)
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
│   │   └── [index.ts](./src/types/index.ts)
│   └── utils/
│       ├── __tests__/
│       │   └── [format.test.ts](./src/utils/__tests__/format.test.ts)
│       └── [format.ts](./src/utils/format.ts)
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
├── [apple-touch-icon.png](./apple-touch-icon.png)
├── [docker-compose.yaml](./docker-compose.yaml)
├── [eslint.config.mts](./eslint.config.mts)
├── [favicon.ico](./favicon.ico)
├── [jest.config.ts](./jest.config.ts)
├── [jest.setup.ts](./jest.setup.ts)
├── [next.config.ts](./next.config.ts)
├── [package.json](./package.json)
├── [playwright.config.ts](./playwright.config.ts)
├── [postcss.config.mjs](./postcss.config.mjs)
├── [robots.txt](./robots.txt)
├── [sitemap.xml](./sitemap.xml)
└── [tsconfig.json](./tsconfig.json)
```

56 directories, 208 files
