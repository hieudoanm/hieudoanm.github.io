package io.github.hieudoanm.kevin.tui

import io.github.hieudoanm.kevin.db.Db

/** A TUI event; [Reload] is the idle tick that re-reads the shared store. */
sealed interface TuiEvent {
    data object Reload : TuiEvent

    data class Resize(val width: Int) : TuiEvent

    data class Press(val key: String, val ctrl: Boolean = false, val shift: Boolean = false) : TuiEvent
}

/** Applies [TuiEvent]s to [TuiState], mutating [kv] only where the TUI edits data. */
object TuiReducer {
    fun reduce(state: TuiState, event: TuiEvent, kv: Db): TuiState = when (event) {
        is TuiEvent.Resize -> state.copy(width = event.width)
        TuiEvent.Reload -> state.reload(kv)
        is TuiEvent.Press -> press(state, event, kv)
    }

    private fun press(state: TuiState, event: TuiEvent.Press, kv: Db): TuiState {
        if (event.key == "D") {
            return if (state.focus == Focus.TABLE) state.deleteAll(kv) else state
        }
        val next = state.copy(confirmDelete = false)
        return when (event.key) {
            "c" if event.ctrl -> next.copy(running = false)
            "q" if next.focus == Focus.TABLE -> next.copy(running = false)
            "Tab" -> next.cycleFocus()
            "Enter" -> if (next.focus == Focus.TABLE) next.editSelected(kv) else next.doSet(kv)
            "ArrowUp" -> next.moveCursor(-1)
            "ArrowDown" -> next.moveCursor(1)
            "d" if next.focus == Focus.TABLE -> next.deleteSelected(kv)
            "r" if next.focus == Focus.TABLE -> next.refresh(kv)
            " " if next.focus == Focus.TABLE -> next.editSelected(kv)
            "ArrowLeft" -> next.editField { it.moveCaret(-1) }
            "ArrowRight" -> next.editField { it.moveCaret(1) }
            "Home" -> next.editField { it.toStart() }
            "End" -> next.editField { it.toEnd() }
            "Backspace" -> next.editField { it.backspace() }
            "Delete" -> next.editField { it.deleteForward() }
            else -> next.type(event, kv)
        }
    }
}
