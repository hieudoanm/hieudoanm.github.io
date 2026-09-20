package io.github.hieudoanm.kevin.gui

import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.ColorScheme
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Shapes
import androidx.compose.material3.Typography
import androidx.compose.material3.darkColorScheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import javax.swing.UIManager

/** 4dp-grid spacing tokens; every gap and corner radius in the GUI comes from here. */
object Space {
    val xs = 4.dp
    val sm = 8.dp
    val md = 12.dp
    val lg = 16.dp
    val xl = 24.dp
    val minTouch = 48.dp
}

private val KevinShapes = Shapes(
    extraSmall = RoundedCornerShape(Space.xs),
    small = RoundedCornerShape(Space.sm),
    medium = RoundedCornerShape(Space.md),
    large = RoundedCornerShape(Space.lg),
    extraLarge = RoundedCornerShape(Space.xl),
)

private val KevinTypography = Typography().copy(
    titleLarge = TextStyle(fontSize = 22.sp, fontWeight = FontWeight.SemiBold),
    titleMedium = TextStyle(fontSize = 16.sp, fontWeight = FontWeight.SemiBold),
    bodyLarge = TextStyle(fontSize = 16.sp, fontWeight = FontWeight.Normal),
    bodyMedium = TextStyle(fontSize = 14.sp, fontWeight = FontWeight.Normal),
    labelLarge = TextStyle(fontSize = 14.sp, fontWeight = FontWeight.Medium),
    labelSmall = TextStyle(fontSize = 11.sp, fontWeight = FontWeight.Medium),
)

/** Wraps [content] in the KeVIN Material 3 theme, following the OS appearance. */
@Composable
internal fun KevinTheme(content: @Composable () -> Unit) {
    val dark = remember { isDesktopDarkTheme() }
    MaterialTheme(
        colorScheme = if (dark) kevinDarkColorScheme() else kevinLightColorScheme(),
        shapes = KevinShapes,
        typography = KevinTypography,
        content = content,
    )
}

private fun kevinLightColorScheme(): ColorScheme = lightColorScheme(
    primary = Color(0xFF3B7DD8),
    onPrimary = Color(0xFFFFFFFF),
    surface = Color(0xFFF7F7F9),
    onSurface = Color(0xFF1A1A1E),
    surfaceVariant = Color(0xFFE7E7EC),
    onSurfaceVariant = Color(0xFF6B6B75),
    outline = Color(0xFFC4C4CC),
    error = Color(0xFFD64545),
    onError = Color(0xFFFFFFFF),
    secondaryContainer = Color(0xFFDCE7FB),
    onSecondaryContainer = Color(0xFF0A1F38),
)

private fun kevinDarkColorScheme(): ColorScheme = darkColorScheme(
    primary = Color(0xFF7FB0FF),
    onPrimary = Color(0xFF002F5F),
    surface = Color(0xFF1A1A1E),
    onSurface = Color(0xFFE8E8EC),
    surfaceVariant = Color(0xFF2A2A30),
    onSurfaceVariant = Color(0xFFA8A8B3),
    outline = Color(0xFF3E3E46),
    error = Color(0xFFFF6B6B),
    onError = Color(0xFF3B0000),
    secondaryContainer = Color(0xFF1F3A5C),
    onSecondaryContainer = Color(0xFFD3E3FF),
)

/**
 * Desktop stand-in for the Android-only `isSystemInDarkTheme()`: reads the AWT
 * panel background and treats a dark luminance as the dark appearance. Callers
 * cache the result, because it is a system value rather than Compose state.
 */
internal fun isDesktopDarkTheme(): Boolean {
    val panel = UIManager.getLookAndFeelDefaults().getColor("Panel.background") ?: return false
    val luminance = 0.2126 * panel.red + 0.7152 * panel.green + 0.0722 * panel.blue
    return luminance < 128.0
}
