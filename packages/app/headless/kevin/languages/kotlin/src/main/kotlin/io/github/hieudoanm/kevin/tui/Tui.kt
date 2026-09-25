package io.github.hieudoanm.kevin.tui

import com.github.ajalt.mordant.input.enterRawModeOrNull
import com.github.ajalt.mordant.terminal.Terminal
import io.github.hieudoanm.kevin.db.Db
import kotlin.time.Duration.Companion.milliseconds

private const val POLL_MILLIS = 250L

/**
 * Opens the key/value manager TUI backed by [kv] and blocks until the user quits.
 * The TCP server is expected to run concurrently on the same [kv].
 */
fun run(kv: Db, terminal: Terminal = Terminal()) {
    val raw = terminal.enterRawModeOrNull() ?: error("raw terminal mode is not available")
    try {
        terminal.cursor.move { clearScreen() }
        terminal.cursor.hide()
        var state = TuiState(width = terminal.size.width).reload(kv)
        while (state.running) {
            draw(terminal, state, kv)
            val event = raw.readKeyOrNull(POLL_MILLIS.milliseconds)?.toEvent() ?: TuiEvent.Reload
            state = TuiReducer.reduce(state, event, kv)
        }
    } finally {
        raw.close()
        terminal.cursor.show()
        terminal.println()
    }
}

private fun draw(terminal: Terminal, state: TuiState, kv: Db) {
    terminal.cursor.move { clearScreenBeforeCursor() }
    terminal.rawPrint(Render.frame(state, kv) + "\r\n\r\n")
}

private fun com.github.ajalt.mordant.input.KeyboardEvent.toEvent(): TuiEvent.Press =
    TuiEvent.Press(key = key, ctrl = ctrl, shift = shift)
