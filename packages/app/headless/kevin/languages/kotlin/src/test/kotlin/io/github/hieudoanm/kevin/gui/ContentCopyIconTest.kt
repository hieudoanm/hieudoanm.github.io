package io.github.hieudoanm.kevin.gui

import androidx.compose.ui.graphics.vector.PathNode
import androidx.compose.ui.graphics.vector.VectorPath
import androidx.compose.ui.unit.dp
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertTrue

/**
 * Guards the hand-inlined Material `content_copy` path data. The glyph exists as
 * source rather than as a dependency, so a typo would only show up on screen.
 */
class ContentCopyIconTest {
    private val nodes: List<PathNode> = ContentCopyIcon.root
        .filterIsInstance<VectorPath>()
        .flatMap { it.pathData }

    @Test
    fun `the glyph uses the 24dp material viewport`() {
        assertEquals(24f, ContentCopyIcon.viewportWidth)
        assertEquals(24f, ContentCopyIcon.viewportHeight)
        assertEquals(24.dp, ContentCopyIcon.defaultWidth)
        assertEquals(24.dp, ContentCopyIcon.defaultHeight)
    }

    @Test
    fun `the glyph draws two sheets plus a cut-out`() {
        assertEquals(3, nodes.filterIsInstance<PathNode.MoveTo>().size)
    }

    @Test
    fun `every vertex stays inside the viewport`() {
        val coordinates = coordinates()
        assertTrue(coordinates.all { it in 0f..24f }, "vertices outside the viewport: $coordinates")
    }

    /** Absolute-to absolute coordinates only; each node type stores just its own. */
    private fun coordinates(): List<Float> = nodes.flatMap { node ->
        when (node) {
            is PathNode.MoveTo -> listOf(node.x, node.y)
            is PathNode.LineTo -> listOf(node.x, node.y)
            is PathNode.HorizontalTo -> listOf(node.x)
            is PathNode.VerticalTo -> listOf(node.y)
            is PathNode.CurveTo -> listOf(node.x1, node.y1, node.x2, node.y2, node.x3, node.y3)
            else -> emptyList()
        }
    }
}
