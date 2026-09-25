---
name: material-design-m3
description: Material Design 3 (Material You) — Google's third design system for Android/Kotlin (and cross-platform), with dynamic color, expressive components, and adaptive layouts.
---

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

- Dependencies: `androidx.compose.material3:material3` (Jetpack Compose) — the M3 implementation.
- `MaterialTheme(colorScheme, typography, shapes)` composes the tokens; start with `lightColorScheme()/darkColorScheme()`.
- Enable dynamic color where available; fall back to custom scheme otherwise:
  `if (Build.VERSION.SDK_INT >= 31) use dynamicLightColorScheme(context) else use customScheme`.
```kotlin
@Composable
fun AppTheme(
    darkTheme: Boolean = isSystemInDarkTheme(),
    dynamicColor: Boolean = true,
    content: @Composable () -> Unit,
) {
    val context: Context = LocalContext.current
    val colorScheme: ColorScheme = when {
        dynamicColor && Build.VERSION.SDK_INT >= Build.VERSION_CODES.S ->
            if (darkTheme) dynamicDarkColorScheme(context) else dynamicLightColorScheme(context)
        darkTheme -> AppDarkColorScheme
        else -> AppLightColorScheme
    }
    MaterialTheme(colorScheme = colorScheme, typography = AppTypography, shapes = AppShapes, content = content)
}
```

- Built-in components honor the theme automatically: `Button`, `Card`, `FloatingActionButton`, `TopAppBar`, `Switch`, `Slider`, etc.
```kotlin
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun MainScreen(
    selectedTab: MainTab,
    onTabSelected: (MainTab) -> Unit,
    snackbarHostState: SnackbarHostState,
    onSave: () -> Unit,
    content: @Composable (PaddingValues) -> Unit,
) {
    Scaffold(
        topBar = { TopAppBar(title = { Text(stringResource(R.string.app_title)) }) },
        snackbarHost = { SnackbarHost(snackbarHostState) },
        floatingActionButton = { ExtendedFloatingActionButton(onClick = onSave) { Text(stringResource(R.string.save)) } },
        bottomBar = {
            NavigationBar {
                MainTab.entries.forEach { tab ->
                    NavigationBarItem(selected = tab == selectedTab, onClick = { onTabSelected(tab) },
                        icon = { Icon(tab.icon, contentDescription = null) }, label = { Text(stringResource(tab.labelRes)) })
                }
            }
        },
    ) { innerPadding -> content(innerPadding) } // forward innerPadding, never ignore it
}
```

## 3. Color

- Use **tonal palettes** — a color family ramp (0–100) where roles map to precise tones (`primary = 40` light, `primary` dark = 80).
- Build a scheme with `lightColorScheme()` + a `ColorScheme` via `lightColorScheme(primary = ...)`.
- `surfaceVariant` for chips/list backgrounds; `surfaceContainer*` for layered surfaces.
- Adjust contrast manually via `ColorScheme` parameters only where accessibility requires.
```kotlin
val AppLightColorScheme: ColorScheme = lightColorScheme(
    primary = Color(0xFF3B7DD8),
    onPrimary = Color(0xFFFFFFFF),
    surface = Color(0xFFF7F7F9),
    onSurface = Color(0xFF1A1A1E),
    surfaceContainer = Color(0xFFEFEFF4), // chips and layered surfaces
    error = Color(0xFFD64545),
)

val AppDarkColorScheme: ColorScheme = darkColorScheme(
    primary = Color(0xFF7FB0FF),
    onPrimary = Color(0xFF002F5F),
    surface = Color(0xFF1A1A1E),
    onSurface = Color(0xFFE8E8EC),
    surfaceContainer = Color(0xFF26262C),
    error = Color(0xFFFF6B6B),
)
```

## 4. Typography

- Scale: `displayLarge → labelSmall`; M3 emphasizes expressive big text with optical sizing.
- Use `Typography()` with `MaterialTheme.typography.*` shortcuts per style; configure under M3's `Typography` object.
- Spacing and letter-spacing: keep defaults unless a brand requirement exists.
```kotlin
val AppTypography: Typography = Typography(
    headlineMedium = TextStyle(fontSize = 26.sp, lineHeight = 32.sp),
    titleLarge = TextStyle(fontSize = 22.sp, lineHeight = 28.sp, fontWeight = FontWeight.SemiBold),
    bodyLarge = TextStyle(fontSize = 16.sp, lineHeight = 24.sp, letterSpacing = 0.5.sp),
    labelLarge = TextStyle(fontSize = 14.sp, lineHeight = 20.sp, fontWeight = FontWeight.Medium),
)
```

## 5. Shape

- Shapes are **corner styles** (rounded, cut, squircle/pill) via `Shapes()` / `ShapeDefaults`.
- Component variants (`Default`, `Small`, `Medium`, `Large`, `Full`) via `MaterialTheme.shapes.*`:
  e.g., `cornerOverride` increase radii for expressive look.
- Keep consistent corner usage across cards and dialogs.
```kotlin
val AppShapes: Shapes = Shapes(
    extraSmall = RoundedCornerShape(4.dp),
    small = RoundedCornerShape(8.dp),
    medium = RoundedCornerShape(12.dp),
    large = RoundedCornerShape(20.dp),
    extraLarge = RoundedCornerShape(28.dp),
)
```

## 6. Components & State

- Interactive states share tokens: `stateLayer` (transparency overlay) + `indicator` (highlight).
- Use `MaterialTheme.colorScheme` + `LocalContentColor` correctly inside custom components.
- **AnimatedVisibility / transitions**: components animate between states; use `animateColorAsState` etc.
```kotlin
@Composable
fun SectionSurface(raised: Boolean, content: @Composable () -> Unit) {
    val containerColor: Color by animateColorAsState(
        targetValue = if (raised) MaterialTheme.colorScheme.surfaceContainerHigh
        else MaterialTheme.colorScheme.surfaceContainerLow,
        label = "sectionContainerColor",
    )
    Surface(
        shape = MaterialTheme.shapes.medium,
        color = containerColor,
        contentColor = MaterialTheme.colorScheme.onSurface,
        tonalElevation = if (raised) 3.dp else 0.dp,  // tint, not just a shadow
        shadowElevation = if (raised) 1.dp else 0.dp,
    ) { Column(modifier = Modifier.padding(Space.md)) { content() } }
}
```

## 7. Common Pitfalls

- Mixing M2 and M3 components — token mismatch (e.g., `Surface` with old elevation).
- Hardcoding colors instead of using scheme roles (breaks dark/dynamic theming).
- Ignoring **accessibility**: contrast on tonal surfaces, `localizedStrings`, touch targets (`minimumInteractiveComponentSize`).
```kotlin
@Composable
fun KeyValueRow(label: String, value: String, selected: Boolean, onClick: () -> Unit) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .selectable(selected = selected, onClick = onClick) // merged semantics, no double semantics{}
            .background(if (selected) MaterialTheme.colorScheme.secondaryContainer else Color.Transparent)
            .padding(horizontal = Space.lg, vertical = Space.md),
        verticalAlignment = Alignment.CenterVertically,
    ) {
        Icon(imageVector = Icons.Filled.Star, contentDescription = "$label is pinned")
        Text(text = value, style = MaterialTheme.typography.labelLarge, modifier = Modifier.weight(1f))
    }
}
```

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
