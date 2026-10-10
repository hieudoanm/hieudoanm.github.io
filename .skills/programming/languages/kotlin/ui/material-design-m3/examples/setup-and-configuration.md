# Material Design 3: 2. Setting Up in Compose

## Source guidance

This example applies the **2. Setting Up in Compose** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- Dependencies: `androidx.compose.material3:material3` (Jetpack Compose) — the M3 implementation.
- `MaterialTheme(colorScheme, typography, shapes)` composes the tokens; start with `lightColorScheme()/darkColorScheme()`.
- Enable dynamic color where available; fall back to custom scheme otherwise:
`if (Build.VERSION.SDK_INT >= 31) use dynamicLightColorScheme(context) else use customScheme`.
- Built-in components honor the theme automatically: `Button`, `Card`, `FloatingActionButton`, `TopAppBar`, `Switch`, `Slider`, etc.

## Example

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

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for material-design-m3.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
