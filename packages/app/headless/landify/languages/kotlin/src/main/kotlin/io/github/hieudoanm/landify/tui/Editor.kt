package io.github.hieudoanm.landify.tui

import com.github.ajalt.mordant.input.KeyboardEvent
import com.github.ajalt.mordant.input.RawModeScope
import com.github.ajalt.mordant.input.enterRawModeOrNull
import com.github.ajalt.mordant.input.isCtrlC
import com.github.ajalt.mordant.terminal.Terminal
import java.nio.file.Files
import java.nio.file.Path
import kotlin.io.path.readText

/**
 * Opens the terminal editor for [path].
 *
 * When the file does not exist it starts from a blank product scaffold, so
 * `landify tui` works before `landify new`. Raw mode is unavailable when stdin
 * is not a TTY (a pipe or a CI job), and the buffer is then printed once instead
 * of looping.
 */
fun runEditor(path: Path, terminal: Terminal = Terminal()) {
    val state = initialState(path)
    val scope = terminal.enterRawModeOrNull()
    if (scope == null) {
        terminal.println(editorPane(state, viewportHeight(terminal.size.height)))
        return
    }
    scope.use { edit(it, state, terminal) }
}

/** The starting state: the file's contents, or a fresh scaffold. */
fun initialState(path: Path): EditorState {
    val text = if (Files.isRegularFile(path)) {
        runCatching { path.readText() }.getOrElse { "" }
    } else {
        runCatching { io.github.hieudoanm.landify.render.placeholder("product") }.getOrElse { "" }
    }
    return EditorState(path = path, buffer = text, saved = text)
}

/** The event loop: draw, read one key, apply it, repeat. */
private fun edit(scope: RawModeScope, initial: EditorState, terminal: Terminal) {
    var state = initial
    terminal.cursor.hide()
    while (true) {
        draw(state, terminal)
        val event = scope.readKeyOrNull() ?: return
        state = step(state, event) ?: return
    }
}

/** Clears the screen and repaints the frame. */
private fun draw(state: EditorState, terminal: Terminal) {
    val height = viewportHeight(terminal.updateSize().height)
    terminal.rawPrint(terminal.cursor.getMoves { clearScreen() })
    terminal.println(editorPane(state, height))
    terminal.println(statusLine(state))
    if (state.mode == Mode.COMMAND) terminal.println(commandPrompt(state))
}
