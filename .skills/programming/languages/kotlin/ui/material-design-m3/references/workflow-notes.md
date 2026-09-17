# Workflow notes

Focused reference for **material-design-m3**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
