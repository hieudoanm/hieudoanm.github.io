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
│   ├── [downloads.spec.ts](./e2e/downloads.spec.ts)
│   ├── [home.spec.ts](./e2e/home.spec.ts)
│   ├── [navigation.spec.ts](./e2e/navigation.spec.ts)
│   └── [version.spec.ts](./e2e/version.spec.ts)
├── public/
│   ├── icons/
│   │   ├── [icon-128x128.png](./public/icons/icon-128x128.png)
│   │   ├── [icon-144x144.png](./public/icons/icon-144x144.png)
│   │   ├── [icon-152x152.png](./public/icons/icon-152x152.png)
│   │   ├── [icon-16x16.png](./public/icons/icon-16x16.png)
│   │   ├── [icon-180x180.png](./public/icons/icon-180x180.png)
│   │   ├── [icon-192.png](./public/icons/icon-192.png)
│   │   ├── [icon-192x192.png](./public/icons/icon-192x192.png)
│   │   ├── [icon-256x256.png](./public/icons/icon-256x256.png)
│   │   ├── [icon-32x32.png](./public/icons/icon-32x32.png)
│   │   ├── [icon-384x384.png](./public/icons/icon-384x384.png)
│   │   ├── [icon-48x48.png](./public/icons/icon-48x48.png)
│   │   ├── [icon-512.png](./public/icons/icon-512.png)
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
│   │   ├── (app)/
│   │   │   ├── adjuster/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [page.test.tsx](./src/app/(app)/adjuster/__tests__/page.test.tsx)
│   │   │   │   └── [page.tsx](./src/app/(app)/adjuster/page.tsx)
│   │   │   ├── color-blindness/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [page.test.tsx](./src/app/(app)/color-blindness/__tests__/page.test.tsx)
│   │   │   │   └── [page.tsx](./src/app/(app)/color-blindness/page.tsx)
│   │   │   ├── contrast/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [page.test.tsx](./src/app/(app)/contrast/__tests__/page.test.tsx)
│   │   │   │   └── [page.tsx](./src/app/(app)/contrast/page.tsx)
│   │   │   ├── converter/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [page.test.tsx](./src/app/(app)/converter/__tests__/page.test.tsx)
│   │   │   │   └── [page.tsx](./src/app/(app)/converter/page.tsx)
│   │   │   ├── css-scale/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [page.test.tsx](./src/app/(app)/css-scale/__tests__/page.test.tsx)
│   │   │   │   └── [page.tsx](./src/app/(app)/css-scale/page.tsx)
│   │   │   ├── gradient/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [page.test.tsx](./src/app/(app)/gradient/__tests__/page.test.tsx)
│   │   │   │   └── [page.tsx](./src/app/(app)/gradient/page.tsx)
│   │   │   ├── mixer/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [page.test.tsx](./src/app/(app)/mixer/__tests__/page.test.tsx)
│   │   │   │   └── [page.tsx](./src/app/(app)/mixer/page.tsx)
│   │   │   ├── opacity/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [page.test.tsx](./src/app/(app)/opacity/__tests__/page.test.tsx)
│   │   │   │   └── [page.tsx](./src/app/(app)/opacity/page.tsx)
│   │   │   ├── palette/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [page.test.tsx](./src/app/(app)/palette/__tests__/page.test.tsx)
│   │   │   │   └── [page.tsx](./src/app/(app)/palette/page.tsx)
│   │   │   ├── random/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [page.test.tsx](./src/app/(app)/random/__tests__/page.test.tsx)
│   │   │   │   └── [page.tsx](./src/app/(app)/random/page.tsx)
│   │   │   ├── schemes/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [page.test.tsx](./src/app/(app)/schemes/__tests__/page.test.tsx)
│   │   │   │   └── [page.tsx](./src/app/(app)/schemes/page.tsx)
│   │   │   ├── shades-tints/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [page.test.tsx](./src/app/(app)/shades-tints/__tests__/page.test.tsx)
│   │   │   │   └── [page.tsx](./src/app/(app)/shades-tints/page.tsx)
│   │   │   ├── temperature/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [page.test.tsx](./src/app/(app)/temperature/__tests__/page.test.tsx)
│   │   │   │   └── [page.tsx](./src/app/(app)/temperature/page.tsx)
│   │   │   ├── theme/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [page.test.tsx](./src/app/(app)/theme/__tests__/page.test.tsx)
│   │   │   │   └── [page.tsx](./src/app/(app)/theme/page.tsx)
│   │   │   ├── tint-shade-tone/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── [page.test.tsx](./src/app/(app)/tint-shade-tone/__tests__/page.test.tsx)
│   │   │   │   └── [page.tsx](./src/app/(app)/tint-shade-tone/page.tsx)
│   │   │   └── wheel/
│   │   │       ├── __tests__/
│   │   │       │   └── [page.test.tsx](./src/app/(app)/wheel/__tests__/page.test.tsx)
│   │   │       └── [page.tsx](./src/app/(app)/wheel/page.tsx)
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
│   │   │   ├── [layout.test.tsx](./src/app/__tests__/layout.test.tsx)
│   │   │   ├── [loading.test.tsx](./src/app/__tests__/loading.test.tsx)
│   │   │   ├── [not-found.test.tsx](./src/app/__tests__/not-found.test.tsx)
│   │   │   ├── [page.test.tsx](./src/app/__tests__/page.test.tsx)
│   │   │   ├── [robots.test.ts](./src/app/__tests__/robots.test.ts)
│   │   │   ├── [template.test.tsx](./src/app/__tests__/template.test.tsx)
│   │   │   └── [unauthorized.test.tsx](./src/app/__tests__/unauthorized.test.tsx)
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
│   │   │   │   ├── [CopyRow.test.tsx](./src/components/atoms/__tests__/CopyRow.test.tsx)
│   │   │   │   ├── [Swatch.test.tsx](./src/components/atoms/__tests__/Swatch.test.tsx)
│   │   │   │   ├── [ThemeToggle.test.tsx](./src/components/atoms/__tests__/ThemeToggle.test.tsx)
│   │   │   │   └── [TheoryNote.test.tsx](./src/components/atoms/__tests__/TheoryNote.test.tsx)
│   │   │   ├── [CopyRow.tsx](./src/components/atoms/CopyRow.tsx)
│   │   │   ├── [Swatch.tsx](./src/components/atoms/Swatch.tsx)
│   │   │   ├── [ThemeToggle.tsx](./src/components/atoms/ThemeToggle.tsx)
│   │   │   └── [TheoryNote.tsx](./src/components/atoms/TheoryNote.tsx)
│   │   ├── molecules/
│   │   │   ├── __tests__/
│   │   │   │   └── [ToolSection.test.tsx](./src/components/molecules/__tests__/ToolSection.test.tsx)
│   │   │   └── [ToolSection.tsx](./src/components/molecules/ToolSection.tsx)
│   │   ├── organisms/
│   │   │   ├── __tests__/
│   │   │   │   ├── [ColorAdjuster.test.tsx](./src/components/organisms/__tests__/ColorAdjuster.test.tsx)
│   │   │   │   ├── [ColorBlindnessSimulator.test.tsx](./src/components/organisms/__tests__/ColorBlindnessSimulator.test.tsx)
│   │   │   │   ├── [ColorConverter.test.tsx](./src/components/organisms/__tests__/ColorConverter.test.tsx)
│   │   │   │   ├── [ColorMixer.test.tsx](./src/components/organisms/__tests__/ColorMixer.test.tsx)
│   │   │   │   ├── [ColorSchemes.test.tsx](./src/components/organisms/__tests__/ColorSchemes.test.tsx)
│   │   │   │   ├── [ColorTemperature.test.tsx](./src/components/organisms/__tests__/ColorTemperature.test.tsx)
│   │   │   │   ├── [ColorWheel.test.tsx](./src/components/organisms/__tests__/ColorWheel.test.tsx)
│   │   │   │   ├── [ColorsTool.test.tsx](./src/components/organisms/__tests__/ColorsTool.test.tsx)
│   │   │   │   ├── [ContrastChecker.test.tsx](./src/components/organisms/__tests__/ContrastChecker.test.tsx)
│   │   │   │   ├── [CssScaleExporter.test.tsx](./src/components/organisms/__tests__/CssScaleExporter.test.tsx)
│   │   │   │   ├── [GradientBuilder.test.tsx](./src/components/organisms/__tests__/GradientBuilder.test.tsx)
│   │   │   │   ├── [Header.test.tsx](./src/components/organisms/__tests__/Header.test.tsx)
│   │   │   │   ├── [OpacityOverlay.test.tsx](./src/components/organisms/__tests__/OpacityOverlay.test.tsx)
│   │   │   │   ├── [PaletteGenerator.test.tsx](./src/components/organisms/__tests__/PaletteGenerator.test.tsx)
│   │   │   │   ├── [RandomColor.test.tsx](./src/components/organisms/__tests__/RandomColor.test.tsx)
│   │   │   │   ├── [ShadesTints.test.tsx](./src/components/organisms/__tests__/ShadesTints.test.tsx)
│   │   │   │   └── [TintShadeTone.test.tsx](./src/components/organisms/__tests__/TintShadeTone.test.tsx)
│   │   │   ├── [ColorAdjuster.tsx](./src/components/organisms/ColorAdjuster.tsx)
│   │   │   ├── [ColorBlindnessSimulator.tsx](./src/components/organisms/ColorBlindnessSimulator.tsx)
│   │   │   ├── [ColorConverter.tsx](./src/components/organisms/ColorConverter.tsx)
│   │   │   ├── [ColorMixer.tsx](./src/components/organisms/ColorMixer.tsx)
│   │   │   ├── [ColorSchemes.tsx](./src/components/organisms/ColorSchemes.tsx)
│   │   │   ├── [ColorTemperature.tsx](./src/components/organisms/ColorTemperature.tsx)
│   │   │   ├── [ColorWheel.tsx](./src/components/organisms/ColorWheel.tsx)
│   │   │   ├── [ColorsTool.tsx](./src/components/organisms/ColorsTool.tsx)
│   │   │   ├── [ContrastChecker.tsx](./src/components/organisms/ContrastChecker.tsx)
│   │   │   ├── [CssScaleExporter.tsx](./src/components/organisms/CssScaleExporter.tsx)
│   │   │   ├── [GradientBuilder.tsx](./src/components/organisms/GradientBuilder.tsx)
│   │   │   ├── [Header.tsx](./src/components/organisms/Header.tsx)
│   │   │   ├── [OpacityOverlay.tsx](./src/components/organisms/OpacityOverlay.tsx)
│   │   │   ├── [PaletteGenerator.tsx](./src/components/organisms/PaletteGenerator.tsx)
│   │   │   ├── [RandomColor.tsx](./src/components/organisms/RandomColor.tsx)
│   │   │   ├── [ShadesTints.tsx](./src/components/organisms/ShadesTints.tsx)
│   │   │   ├── [TintShadeTone.tsx](./src/components/organisms/TintShadeTone.tsx)
│   │   │   └── [themeColors.ts](./src/components/organisms/themeColors.ts)
│   │   └── templates/
│   │       ├── __tests__/
│   │       │   ├── [AboutTemplate.test.tsx](./src/components/templates/__tests__/AboutTemplate.test.tsx)
│   │       │   ├── [DownloadsTemplate.test.tsx](./src/components/templates/__tests__/DownloadsTemplate.test.tsx)
│   │       │   ├── [ErrorTemplate.test.tsx](./src/components/templates/__tests__/ErrorTemplate.test.tsx)
│   │       │   ├── [HomeTemplate.test.tsx](./src/components/templates/__tests__/HomeTemplate.test.tsx)
│   │       │   └── [VersionTemplate.test.tsx](./src/components/templates/__tests__/VersionTemplate.test.tsx)
│   │       ├── [AboutTemplate.tsx](./src/components/templates/AboutTemplate.tsx)
│   │       ├── [DownloadsTemplate.tsx](./src/components/templates/DownloadsTemplate.tsx)
│   │       ├── [ErrorTemplate.tsx](./src/components/templates/ErrorTemplate.tsx)
│   │       ├── [HomeTemplate.tsx](./src/components/templates/HomeTemplate.tsx)
│   │       └── [VersionTemplate.tsx](./src/components/templates/VersionTemplate.tsx)
│   ├── hooks/
│   │   ├── __tests__/
│   │   │   ├── [useClipboard.test.ts](./src/hooks/__tests__/useClipboard.test.ts)
│   │   │   ├── [useSWRegister.test.ts](./src/hooks/__tests__/useSWRegister.test.ts)
│   │   │   └── [useTheme.test.ts](./src/hooks/__tests__/useTheme.test.ts)
│   │   ├── [useClipboard.ts](./src/hooks/useClipboard.ts)
│   │   ├── [useSWRegister.ts](./src/hooks/useSWRegister.ts)
│   │   └── [useTheme.ts](./src/hooks/useTheme.ts)
│   ├── lib/
│   │   ├── __tests__/
│   │   │   └── [colors.test.ts](./src/lib/__tests__/colors.test.ts)
│   │   └── [colors.ts](./src/lib/colors.ts)
│   ├── providers/
│   │   ├── __tests__/
│   │   │   └── [SWProvider.test.tsx](./src/providers/__tests__/SWProvider.test.tsx)
│   │   └── [SWProvider.tsx](./src/providers/SWProvider.tsx)
│   └── styles/
│       ├── [base.css](./src/styles/base.css)
│       ├── [globals.css](./src/styles/globals.css)
│       └── [themes.css](./src/styles/themes.css)
├── src-tauri/
│   ├── capabilities/
│   │   └── [default.json](./src-tauri/capabilities/default.json)
│   ├── icons/
│   │   ├── android/
│   │   │   ├── mipmap-anydpi-v26/
│   │   │   │   └── [ic_launcher.xml](./src-tauri/icons/android/mipmap-anydpi-v26/ic_launcher.xml)
│   │   │   ├── mipmap-hdpi/
│   │   │   │   ├── [ic_launcher.png](./src-tauri/icons/android/mipmap-hdpi/ic_launcher.png)
│   │   │   │   ├── [ic_launcher_foreground.png](./src-tauri/icons/android/mipmap-hdpi/ic_launcher_foreground.png)
│   │   │   │   └── [ic_launcher_round.png](./src-tauri/icons/android/mipmap-hdpi/ic_launcher_round.png)
│   │   │   ├── mipmap-mdpi/
│   │   │   │   ├── [ic_launcher.png](./src-tauri/icons/android/mipmap-mdpi/ic_launcher.png)
│   │   │   │   ├── [ic_launcher_foreground.png](./src-tauri/icons/android/mipmap-mdpi/ic_launcher_foreground.png)
│   │   │   │   └── [ic_launcher_round.png](./src-tauri/icons/android/mipmap-mdpi/ic_launcher_round.png)
│   │   │   ├── mipmap-xhdpi/
│   │   │   │   ├── [ic_launcher.png](./src-tauri/icons/android/mipmap-xhdpi/ic_launcher.png)
│   │   │   │   ├── [ic_launcher_foreground.png](./src-tauri/icons/android/mipmap-xhdpi/ic_launcher_foreground.png)
│   │   │   │   └── [ic_launcher_round.png](./src-tauri/icons/android/mipmap-xhdpi/ic_launcher_round.png)
│   │   │   ├── mipmap-xxhdpi/
│   │   │   │   ├── [ic_launcher.png](./src-tauri/icons/android/mipmap-xxhdpi/ic_launcher.png)
│   │   │   │   ├── [ic_launcher_foreground.png](./src-tauri/icons/android/mipmap-xxhdpi/ic_launcher_foreground.png)
│   │   │   │   └── [ic_launcher_round.png](./src-tauri/icons/android/mipmap-xxhdpi/ic_launcher_round.png)
│   │   │   ├── mipmap-xxxhdpi/
│   │   │   │   ├── [ic_launcher.png](./src-tauri/icons/android/mipmap-xxxhdpi/ic_launcher.png)
│   │   │   │   ├── [ic_launcher_foreground.png](./src-tauri/icons/android/mipmap-xxxhdpi/ic_launcher_foreground.png)
│   │   │   │   └── [ic_launcher_round.png](./src-tauri/icons/android/mipmap-xxxhdpi/ic_launcher_round.png)
│   │   │   └── values/
│   │   │       └── [ic_launcher_background.xml](./src-tauri/icons/android/values/ic_launcher_background.xml)
│   │   ├── ios/
│   │   │   ├── [AppIcon-20x20@1x.png](./src-tauri/icons/ios/AppIcon-20x20@1x.png)
│   │   │   ├── [AppIcon-20x20@2x-1.png](./src-tauri/icons/ios/AppIcon-20x20@2x-1.png)
│   │   │   ├── [AppIcon-20x20@2x.png](./src-tauri/icons/ios/AppIcon-20x20@2x.png)
│   │   │   ├── [AppIcon-20x20@3x.png](./src-tauri/icons/ios/AppIcon-20x20@3x.png)
│   │   │   ├── [AppIcon-29x29@1x.png](./src-tauri/icons/ios/AppIcon-29x29@1x.png)
│   │   │   ├── [AppIcon-29x29@2x-1.png](./src-tauri/icons/ios/AppIcon-29x29@2x-1.png)
│   │   │   ├── [AppIcon-29x29@2x.png](./src-tauri/icons/ios/AppIcon-29x29@2x.png)
│   │   │   ├── [AppIcon-29x29@3x.png](./src-tauri/icons/ios/AppIcon-29x29@3x.png)
│   │   │   ├── [AppIcon-40x40@1x.png](./src-tauri/icons/ios/AppIcon-40x40@1x.png)
│   │   │   ├── [AppIcon-40x40@2x-1.png](./src-tauri/icons/ios/AppIcon-40x40@2x-1.png)
│   │   │   ├── [AppIcon-40x40@2x.png](./src-tauri/icons/ios/AppIcon-40x40@2x.png)
│   │   │   ├── [AppIcon-40x40@3x.png](./src-tauri/icons/ios/AppIcon-40x40@3x.png)
│   │   │   ├── [AppIcon-512@2x.png](./src-tauri/icons/ios/AppIcon-512@2x.png)
│   │   │   ├── [AppIcon-60x60@2x.png](./src-tauri/icons/ios/AppIcon-60x60@2x.png)
│   │   │   ├── [AppIcon-60x60@3x.png](./src-tauri/icons/ios/AppIcon-60x60@3x.png)
│   │   │   ├── [AppIcon-76x76@1x.png](./src-tauri/icons/ios/AppIcon-76x76@1x.png)
│   │   │   ├── [AppIcon-76x76@2x.png](./src-tauri/icons/ios/AppIcon-76x76@2x.png)
│   │   │   └── [AppIcon-83.5x83.5@2x.png](./src-tauri/icons/ios/AppIcon-83.5x83.5@2x.png)
│   │   ├── [128x128.png](./src-tauri/icons/128x128.png)
│   │   ├── [128x128@2x.png](./src-tauri/icons/128x128@2x.png)
│   │   ├── [32x32.png](./src-tauri/icons/32x32.png)
│   │   ├── [64x64.png](./src-tauri/icons/64x64.png)
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
│   │   ├── [icon.png](./src-tauri/icons/icon.png)
│   │   └── [icon.svg](./src-tauri/icons/icon.svg)
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

76 directories, 235 files
