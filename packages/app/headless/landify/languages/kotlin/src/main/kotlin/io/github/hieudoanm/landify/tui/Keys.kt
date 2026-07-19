package io.github.hieudoanm.landify.tui

import com.github.ajalt.mordant.input.KeyboardEvent
import com.github.ajalt.mordant.input.isCtrlC

/**
 * Applies one key press.
 *
 * Returns the next state, or null when the editor should exit (Ctrl+C,
 * Ctrl+Q, or `quit`).
 */
fun step(state: EditorState, event: KeyboardEvent): EditorState? {
    if (event.isCtrlC) return null
    if (event.ctrl && event.key == "q") return null
    return when (state.mode) {
        Mode.COMMAND -> commandKey(state, event)
        Mode.EDIT -> editKey(state, event)
    }
}

/** Keys that edit the YAML buffer or open the command line. */
private fun editKey(state: EditorState, event: KeyboardEvent): EditorState? = when (event.key) {
    "Left" -> state.shift(-1)
    "Right" -> state.shift(1)
    "Up" -> state.line(-1)
    "Down" -> state.line(1)
    "Home" -> state.lineStart()
    "End" -> state.lineEnd()
    "Enter" -> state.insert('\n')
    "Backspace" -> state.backspace()
    "Delete" -> state.delete()
    "Tab" -> state.insert('\t')
    "Escape" -> state.enteringCommand()
    else -> if (event.key.length == 1 && !event.ctrl) state.insert(event.key[0]) else state
}

/** Keys that edit or submit the `:` command line. */
private fun commandKey(state: EditorState, event: KeyboardEvent): EditorState? = when (event.key) {
    "Escape" -> state.leavingCommand()
    "Enter" -> run(state)
    "Backspace" -> state.withCommandBackspace()
    else -> if (event.key.length == 1 && !event.ctrl) state.withCommandCharacter(event.key[0]) else state
}

/** Parses and runs the pending command, leaving command mode either way. */
private fun run(state: EditorState): EditorState? {
    val action = parseCommand(state.commandLine)
    if (action == TuiAction.Quit) return null
    return state.leavingCommand().withResult(execute(state, action))
}
