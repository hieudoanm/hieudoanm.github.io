package io.github.hieudoanm.landify.tui

import com.github.ajalt.mordant.rendering.Widget
import com.github.ajalt.mordant.widgets.Panel
import com.github.ajalt.mordant.widgets.Text

/** Lines reserved for the panel border and the status bar. */
private const val CHROME_LINES = 4

/**
 * The editor pane: the visible slice of the YAML buffer inside a rounded
 * border, titled with the file name and a marker when there are unsaved edits.
 *
 * Rendering is a pure function of [EditorState] and [height], so the layout can
 * be checked without a terminal.
 */
fun editorPane(state: EditorState, height: Int): Widget = Panel(
    content = Text(visibleLines(state, height)),
    title = Text(titleOf(state)),
    expand = true,
)

/** The panel title, with a `(modified)` marker when the buffer has diverged. */
internal fun titleOf(state: EditorState): String {
    val name = state.path.fileName.toString()
    return if (state.dirty) "landify — $name (modified)" else "landify — $name"
}

/** The `:` prompt, shown while command mode is active. */
internal fun commandPrompt(state: EditorState): Widget = Text(":${state.commandLine}")

/**
 * The bottom line. The leading glyph comes from the last command's tone, so
 * errors read differently from hints.
 */
internal fun statusLine(state: EditorState): Widget {
    val glyph = when (state.status.tone) {
        Tone.ERROR -> "x "
        Tone.SUCCESS -> "ok "
        Tone.INFO, Tone.HINT -> ""
    }
    val position = "Ln ${state.row + 1}, Col ${state.column + 1}"
    return Text("$glyph${state.status.message}    $position")
}

/** How many buffer lines fit between the borders and the status bar. */
internal fun viewportHeight(terminalHeight: Int): Int =
    (terminalHeight - CHROME_LINES).coerceAtLeast(1)

/**
 * The slice of the buffer around the cursor.
 *
 * The window scrolls only when the cursor leaves it, so typing near the top
 * does not make the text jump around.
 */
internal fun visibleLines(state: EditorState, height: Int): String {
    val all = state.buffer.split('\n')
    val first = firstVisibleRow(state.row, all.size, viewportHeight(height))
    val last = (first + viewportHeight(height)).coerceAtMost(all.size)
    return all.subList(first, last).joinToString("\n")
}

/** The first row to show so that [row] is inside the window. */
internal fun firstVisibleRow(row: Int, total: Int, height: Int): Int =
    (row - height / 2).coerceIn(0, (total - height).coerceAtLeast(0))
