package io.github.hieudoanm.kevin.gui

import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.SolidColor
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.graphics.vector.path
import androidx.compose.ui.unit.dp

/**
 * The Material `content_copy` glyph (24dp viewport, official path data).
 *
 * AndroidX froze the material-icons artifacts at 1.7.8 and its core set has no
 * copy icon, while `material-icons-extended` would add 37MB to the distribution
 * for a single glyph. Inlining the path is cheaper than either.
 */
internal val ContentCopyIcon: ImageVector = ImageVector.Builder(
    name = "ContentCopy",
    defaultWidth = 24.dp,
    defaultHeight = 24.dp,
    viewportWidth = 24f,
    viewportHeight = 24f,
).apply {
    // Fill is a mask: Icon tints the whole vector with the local content colour.
    path(fill = SolidColor(Color.Black)) {
        // Outline of the sheet being copied from.
        moveTo(16f, 1f)
        horizontalLineTo(4f)
        curveTo(2.9f, 1f, 2f, 1.9f, 2f, 3f)
        verticalLineTo(17f)
        horizontalLineTo(4f)
        verticalLineTo(3f)
        horizontalLineTo(16f)
        verticalLineTo(1f)
        close()
        // Front sheet.
        moveTo(19f, 5f)
        horizontalLineTo(8f)
        curveTo(6.9f, 5f, 6f, 5.9f, 6f, 7f)
        verticalLineTo(21f)
        curveTo(6f, 22.1f, 6.9f, 23f, 8f, 23f)
        horizontalLineTo(19f)
        curveTo(20.1f, 23f, 21f, 22.1f, 21f, 21f)
        verticalLineTo(7f)
        curveTo(21f, 5.9f, 20.1f, 5f, 19f, 5f)
        close()
        // Counter-wound cut-out, so the non-zero fill rule leaves a hole.
        moveTo(19f, 21f)
        horizontalLineTo(8f)
        verticalLineTo(7f)
        horizontalLineTo(19f)
        verticalLineTo(21f)
        close()
    }
}.build()
