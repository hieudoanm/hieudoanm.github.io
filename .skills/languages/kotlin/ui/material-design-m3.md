---
name: material-design-m3
description: Material Design 3 (Material You) — Google's third design system for Android/Kotlin (and cross-platform), with dynamic color, expressive components, and adaptive layouts.
---

Material Design 3 (M3, "Material You") is Google's **evolved design system** for Android (Jetpack Compose) and the web. It centers on **dynamic color, expression, and adaptability** while keeping the strong token-based theming of M2.

## 1. Core Concepts

- **Design tokens**: color, typography, and shape scales defined once and consumed everywhere.
- **Color roles**: each component has semantic roles like `primary`, `secondary`, `surface`, `surfaceVariant`, `error`, with tonal-palette consistency built in.
- **Dynamic color**: on Android 12+, colors derive from the home-screen wallpaper; `dynamicLightColorScheme/dynamicDarkColorScheme` provide automatic theming.
- **Elevation**: realized with **tonal overlays** and shadows; elevation levels pick up surface tints.
- **Typography**: expressive type ramp (`display`, `headline`, `title`, `body`, `label`) with optical-scaled versions.

## 2. Setting Up in Compose

- Dependencies: `androidx.compose.material3:material3` (Jetpack Compose) — the M3 implementation.
- `MaterialTheme(colorScheme, typography, shapes)` composes the tokens; start with `lightColorScheme()/darkColorScheme()`.
- Enable dynamic color where available; fall back to custom scheme otherwise:
  `if (Build.VERSION.SDK_INT >= 31) use dynamicLightColorScheme(context) else use customScheme`.
- Built-in components honor the theme automatically: `Button`, `Card`, `FloatingActionButton`, `TopAppBar`, `Switch`, `Slider`, etc.

## 3. Color

- Use **tonal palettes** — a color family ramp (0–100) where roles map to precise tones (`primary = 40` light, `primary` dark = 80).
- Build a scheme with `lightColorScheme()` + a `ColorScheme` via `lightColorScheme(primary = ...)`.
- `surfaceVariant` for chips/list backgrounds; `surfaceContainer*` for layered surfaces.
- Adjust contrast manually via `ColorScheme` parameters only where accessibility requires.

## 4. Typography

- Scale: `displayLarge → labelSmall`; M3 emphasizes expressive big text with optical sizing.
- Use `Typography()` with `MaterialTheme.typography.*` shortcuts per style; configure under M3's `Typography` object.
- Spacing and letter-spacing: keep defaults unless a brand requirement exists.

## 5. Shape

- Shapes are **corner styles** (rounded, cut, squircle/pill) via `Shapes()` / `ShapeDefaults`.
- Component variants (`Default`, `Small`, `Medium`, `Large`, `Full`) via `MaterialTheme.shapes.*`:
  e.g., `cornerOverride` increase radii for expressive look.
- Keep consistent corner usage across cards and dialogs.

## 6. Components & State

- Interactive states share tokens: `stateLayer` (transparency overlay) + `indicator` (highlight).
- Use `MaterialTheme.colorScheme` + `LocalContentColor` correctly inside custom components.
- **AnimatedVisibility / transitions**: components animate between states; use `animateColorAsState` etc.

## 7. Common Pitfalls

- Mixing M2 and M3 components — token mismatch (e.g., `Surface` with old elevation).
- Hardcoding colors instead of using scheme roles (breaks dark/dynamic theming).
- Ignoring **accessibility**: contrast on tonal surfaces, `localizedStrings`, touch targets (`minimumInteractiveComponentSize`).
- Loading dynamic color on unsupported OS versions without fallback.

## General Rules of Thumb

- Theming is token-first: define color, typography, and shape once, consume via roles.
- Use dynamic color when supported, custom scheme otherwise; always support dark.
- Prefer Material 3 components over custom visuals to stay accessible and consistent.
- Elevate via tonal overlays and shadows consistently across the app.

## Quick-Start Checklist

- [ ] Add `material3` dependency; wrap app in `MaterialTheme`.
- [ ] Define `ColorScheme` (dynamic where available + fallback) and typography/shape.
- [ ] Ensure dark theme objectivity (`darkColorScheme()`).
- [ ] Migrate components from M2 to M3; avoid mixing libraries.
- [ ] Verify dynamic color fallback on API < 31.
- [ ] Check contrast/accessibility and touch-target sizes.
- [ ] Test tonal overlays and elevation rendering across surfaces.