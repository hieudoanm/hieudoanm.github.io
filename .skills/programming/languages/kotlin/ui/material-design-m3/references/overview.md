# Overview

Focused reference for **material-design-m3**, excerpted from SKILL.md. The skill file remains the canonical guide.

# Material Design 3

(M3, "Material You") is Google's **evolved design system** for Android (Jetpack Compose) and the web. It centers on **dynamic color, expression, and adaptability** while keeping the strong token-based theming of M2.

## 1. Core Concepts

- **Design tokens**: color, typography, and shape scales defined once and consumed everywhere.
```kotlin
object Space {
    val xs: Dp = 4.dp
    val sm: Dp = 8.dp
    val md: Dp = 12.dp
    val lg: Dp = 16.dp
    val xl: Dp = 24.dp
    val minTouch: Dp = 48.dp
}
```

- **Color roles**: each component has semantic roles like `primary`, `secondary`, `surface`, `surfaceVariant`, `error`, with tonal-palette consistency built in.
- **Dynamic color**: on Android 12+, colors derive from the home-screen wallpaper; `dynamicLightColorScheme/dynamicDarkColorScheme` provide automatic theming.
- **Elevation**: realized with **tonal overlays** and shadows; elevation levels pick up surface tints.
- **Typography**: expressive type ramp (`display`, `headline`, `title`, `body`, `label`) with optical-scaled versions.

## 2. Setting Up in Compose
