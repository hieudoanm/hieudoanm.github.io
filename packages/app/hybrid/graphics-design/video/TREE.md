# TREE

```text
├── docs/
│   ├── [ARCHITECTURE.md](./docs/ARCHITECTURE.md)
│   ├── [CONTRIBUTING.md](./docs/CONTRIBUTING.md)
│   ├── [DOWNLOADS.md](./docs/DOWNLOADS.md)
│   ├── [PACKAGING.md](./docs/PACKAGING.md)
│   └── [ROADMAP.md](./docs/ROADMAP.md)
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
│   │   ├── atoms/
│   │   │   ├── __tests__/
│   │   │   │   └── [VideoFileUpload.test.tsx](./src/components/atoms/__tests__/VideoFileUpload.test.tsx)
│   │   │   └── [VideoFileUpload.tsx](./src/components/atoms/VideoFileUpload.tsx)
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
│   │   └── tools/
│   │       ├── __tests__/
│   │       │   ├── [AudioTranscribeTool.test.tsx](./src/components/tools/__tests__/AudioTranscribeTool.test.tsx)
│   │       │   ├── [GenerateSubtitleTool.test.tsx](./src/components/tools/__tests__/GenerateSubtitleTool.test.tsx)
│   │       │   ├── [VideoCompressTool.test.tsx](./src/components/tools/__tests__/VideoCompressTool.test.tsx)
│   │       │   ├── [VideoConvertTool.test.tsx](./src/components/tools/__tests__/VideoConvertTool.test.tsx)
│   │       │   ├── [VideoCropTool.test.tsx](./src/components/tools/__tests__/VideoCropTool.test.tsx)
│   │       │   ├── [VideoDownloadTool.test.tsx](./src/components/tools/__tests__/VideoDownloadTool.test.tsx)
│   │       │   ├── [VideoExtractAudioTool.test.tsx](./src/components/tools/__tests__/VideoExtractAudioTool.test.tsx)
│   │       │   ├── [VideoExtractFramesTool.test.tsx](./src/components/tools/__tests__/VideoExtractFramesTool.test.tsx)
│   │       │   ├── [VideoMergeTool.test.tsx](./src/components/tools/__tests__/VideoMergeTool.test.tsx)
│   │       │   ├── [VideoMuteTool.test.tsx](./src/components/tools/__tests__/VideoMuteTool.test.tsx)
│   │       │   ├── [VideoResizeTool.test.tsx](./src/components/tools/__tests__/VideoResizeTool.test.tsx)
│   │       │   ├── [VideoSpeedTool.test.tsx](./src/components/tools/__tests__/VideoSpeedTool.test.tsx)
│   │       │   ├── [VideoStabilizeTool.test.tsx](./src/components/tools/__tests__/VideoStabilizeTool.test.tsx)
│   │       │   ├── [VideoToolsPage.test.tsx](./src/components/tools/__tests__/VideoToolsPage.test.tsx)
│   │       │   └── [VideoTrimTool.test.tsx](./src/components/tools/__tests__/VideoTrimTool.test.tsx)
│   │       ├── [AudioTranscribeTool.tsx](./src/components/tools/AudioTranscribeTool.tsx)
│   │       ├── [GenerateSubtitleTool.tsx](./src/components/tools/GenerateSubtitleTool.tsx)
│   │       ├── [VideoCompressTool.tsx](./src/components/tools/VideoCompressTool.tsx)
│   │       ├── [VideoConvertTool.tsx](./src/components/tools/VideoConvertTool.tsx)
│   │       ├── [VideoCropTool.tsx](./src/components/tools/VideoCropTool.tsx)
│   │       ├── [VideoDownloadTool.tsx](./src/components/tools/VideoDownloadTool.tsx)
│   │       ├── [VideoExtractAudioTool.tsx](./src/components/tools/VideoExtractAudioTool.tsx)
│   │       ├── [VideoExtractFramesTool.tsx](./src/components/tools/VideoExtractFramesTool.tsx)
│   │       ├── [VideoMergeTool.tsx](./src/components/tools/VideoMergeTool.tsx)
│   │       ├── [VideoMuteTool.tsx](./src/components/tools/VideoMuteTool.tsx)
│   │       ├── [VideoResizeTool.tsx](./src/components/tools/VideoResizeTool.tsx)
│   │       ├── [VideoSpeedTool.tsx](./src/components/tools/VideoSpeedTool.tsx)
│   │       ├── [VideoStabilizeTool.tsx](./src/components/tools/VideoStabilizeTool.tsx)
│   │       ├── [VideoToolsPage.tsx](./src/components/tools/VideoToolsPage.tsx)
│   │       └── [VideoTrimTool.tsx](./src/components/tools/VideoTrimTool.tsx)
│   ├── data/
│   │   ├── __tests__/
│   │   │   └── [video-tools.test.ts](./src/data/__tests__/video-tools.test.ts)
│   │   └── [video-tools.ts](./src/data/video-tools.ts)
│   ├── lib/
│   │   ├── __tests__/
│   │   │   └── [video-tools.test.ts](./src/lib/__tests__/video-tools.test.ts)
│   │   └── [video-tools.ts](./src/lib/video-tools.ts)
│   ├── styles/
│   │   ├── [base.css](./src/styles/base.css)
│   │   ├── [globals.css](./src/styles/globals.css)
│   │   └── [themes.css](./src/styles/themes.css)
│   └── types/
│       └── [speech-recognition.d.ts](./src/types/speech-recognition.d.ts)
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

41 directories, 149 files
