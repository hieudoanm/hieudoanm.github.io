package io.github.hieudoanm.kevin.tui

/** Which input currently has focus: the key/search field, the value field, or the table. */
enum class Focus { KEY, VALUE, TABLE }

/** A single-line text field with a caret. */
data class TextField(val value: String = "", val caret: Int = 0) {
    fun moveCaret(delta: Int): TextField = copy(caret = (caret + delta).coerceIn(0, value.length))

    fun toStart(): TextField = copy(caret = 0)

    fun toEnd(): TextField = copy(caret = value.length)

    fun insert(text: String): TextField {
        val at = caret.coerceIn(0, value.length)
        val next = value.substring(0, at) + text + value.substring(at)
        return TextField(next, at + text.length)
    }

    fun backspace(): TextField {
        if (caret == 0) return this
        return TextField(value.removeRange(caret - 1, caret), caret - 1)
    }

    fun deleteForward(): TextField {
        if (caret >= value.length) return this
        return TextField(value.removeRange(caret, caret + 1), caret)
    }

    companion object {
        fun of(text: String) = TextField(text, text.length)
    }
}

/** Immutable TUI state; every transition produces a new instance. */
data class TuiState(
    val focus: Focus = Focus.KEY,
    val keyField: TextField = TextField(),
    val valueField: TextField = TextField(),
    val rows: List<String> = emptyList(),
    val cursor: Int = 0,
    val status: String = "",
    val confirmDelete: Boolean = false,
    val width: Int = 0,
    val running: Boolean = true,
) {
    val count: Int get() = rows.size
}
