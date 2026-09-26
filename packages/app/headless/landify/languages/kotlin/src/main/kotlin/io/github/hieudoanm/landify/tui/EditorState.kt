package io.github.hieudoanm.landify.tui

import java.nio.file.Path

/** Which pane has keyboard focus. */
enum class Mode {
    /** The YAML buffer is editable. */
    EDIT,

    /** The `:` command line is accepting input. */
    COMMAND,
}

/** The meaning behind a status-bar message, which drives its colour. */
enum class Tone { HINT, INFO, SUCCESS, ERROR }

/** A single status-bar line. */
data class Status(val message: String, val tone: Tone = Tone.HINT)

/**
 * The whole editor state, immutable so transitions are pure functions and the
 * frame can be re-rendered from a snapshot.
 *
 * @property buffer the YAML currently in the editor
 * @property saved the YAML last read from or written to disk
 * @property cursor the offset into [buffer] where the next character goes
 * @property dirty whether [buffer] differs from [saved]
 */
data class EditorState(
    val path: Path,
    val buffer: String,
    val saved: String,
    val cursor: Int = buffer.length,
    val mode: Mode = Mode.EDIT,
    val commandLine: String = "",
    val status: Status = Status("ready — type : for commands", Tone.HINT),
) {
    val dirty: Boolean get() = buffer != saved
    val row: Int get() = buffer.take(cursor).count { it == '\n' }
    val column: Int get() = cursor - (buffer.lastIndexOf('\n', cursor - 1) + 1)
}

/** Inserts a character at the cursor and steps over it. */
fun EditorState.insert(character: Char): EditorState = copy(
    buffer = buffer.substring(0, cursor) + character + buffer.substring(cursor),
    cursor = cursor + 1,
    status = Status("editing", Tone.INFO),
)

/** Deletes the character before the cursor, if there is one. */
fun EditorState.backspace(): EditorState = when {
    cursor == 0 -> this
    else -> copy(
        buffer = buffer.removeRange(cursor - 1, cursor),
        cursor = cursor - 1,
        status = Status("editing", Tone.INFO),
    )
}

/** Deletes the character under the cursor, if there is one. */
fun EditorState.delete(): EditorState = when {
    cursor >= buffer.length -> this
    else -> copy(buffer = buffer.removeRange(cursor, cursor + 1), status = Status("editing", Tone.INFO))
}

/** Moves the cursor, clamped to the buffer. */
fun EditorState.moveTo(offset: Int): EditorState = copy(cursor = offset.coerceIn(0, buffer.length))

/** Moves the cursor one character left or right. */
fun EditorState.shift(by: Int): EditorState = moveTo(cursor + by)

/** Moves the cursor to the start of the current line. */
fun EditorState.lineStart(): EditorState = moveTo(buffer.lastIndexOf('\n', cursor - 1) + 1)

/** Moves the cursor to the first character after the current line's newline. */
fun EditorState.lineEnd(): EditorState {
    val newline = buffer.indexOf('\n', cursor)
    return moveTo(if (newline < 0) buffer.length else newline)
}

/** Moves the cursor to the start of the previous or next line. */
fun EditorState.line(by: Int): EditorState {
    val wanted = row + by
    return if (by < 0) previousLine() else nextLine(wanted)
}

private fun EditorState.previousLine(): EditorState {
    if (row == 0) return this
    val start = lineStart().cursor
    return copy(cursor = buffer.lastIndexOf('\n', start - 2) + 1)
}

private fun EditorState.nextLine(wanted: Int): EditorState {
    var index = 0
    var seen = 0
    while (index < buffer.length) {
        index = buffer.indexOf('\n', index)
        if (index < 0) return this
        index += 1
        seen += 1
        if (seen == wanted) return copy(cursor = index)
    }
    return this
}

/** Replaces the buffer wholesale, as `generate` and `theme` do. */
fun EditorState.replacing(text: String): EditorState = copy(buffer = text, cursor = text.length)

/** Enters command mode with an empty command line. */
fun EditorState.enteringCommand(): EditorState =
    copy(mode = Mode.COMMAND, commandLine = "", status = Status("command:", Tone.INFO))

/** Leaves command mode without running anything. */
fun EditorState.leavingCommand(): EditorState = copy(mode = Mode.EDIT, commandLine = "")

/** Appends a character to the command line. */
fun EditorState.withCommandCharacter(character: Char): EditorState =
    copy(commandLine = commandLine + character)

/** Backspace removes the last character of the command line. */
fun EditorState.withCommandBackspace(): EditorState = copy(commandLine = commandLine.dropLast(1))

/** Applies a command outcome to the state. */
fun EditorState.withResult(result: Outcome): EditorState {
    val next = when (result.action) {
        TuiAction.Save -> copy(saved = result.text)
        TuiAction.Reload -> replacing(result.text).copy(saved = result.text)
        is TuiAction.Generate, is TuiAction.Theme -> replacing(result.text)
        TuiAction.Validate, is TuiAction.Build, TuiAction.Help -> this
        TuiAction.Quit, TuiAction.Unknown -> this
    }
    return next.copy(status = Status(result.message, result.tone))
}
