package io.github.hieudoanm.kevin.tui

import io.github.hieudoanm.kevin.db.Db

private const val HELP =
    "tab cycle focus · enter set/edit · ↑/↓ move · d delete · D delete-all · r refresh · q quit"

/** Renders [TuiState] to a plain-text frame; kept pure so it can be asserted in tests. */
internal object Render {
    fun frame(state: TuiState, kv: Db): String {
        val width = lineWidth(state)
        val (keyWidth, valueWidth) = inputWidths(state)
        val (columnKey, columnValue) = columnWidths(state)
        return buildString {
            appendLine("kevin — Key/Value (${kv.len()} keys)")
            appendLine(rule(width))
            appendLine(inputs(state, keyWidth, valueWidth))
            appendLine(rule(width))
            appendLine(header(columnKey))
            state.rows.forEachIndexed { index, key -> appendLine(row(state, index, key, kv, columnKey, columnValue)) }
            appendLine(rule(width))
            appendLine(footer(state))
            append(HELP)
        }
    }

    fun lineWidth(state: TuiState): Int = if (state.width < 40) 80 else state.width

    fun inputWidths(state: TuiState): Pair<Int, Int> {
        val available = lineWidth(state) - "Key/Search: []  Value: []".length
        val key = (available / 3).coerceAtLeast(10)
        return key to (available - key)
    }

    fun columnWidths(state: TuiState): Pair<Int, Int> {
        val remaining = lineWidth(state) - 7
        val key = (remaining / 3).coerceAtLeast(8)
        return key to (remaining - key - 1).coerceAtLeast(10)
    }

    fun truncate(text: String, max: Int): String = if (text.length <= max) text else text.take(max) + "…"

    fun padRight(text: String, width: Int): String = text.padEnd(width).take(width)

    private fun rule(width: Int) = "─".repeat(width)

    private fun inputs(state: TuiState, keyWidth: Int, valueWidth: Int): String {
        val key = field(state.keyField, state.focus == Focus.KEY, EMPTY_KEY_FIELD, keyWidth)
        val value = field(state.valueField, state.focus == Focus.VALUE, EMPTY_VALUE_FIELD, valueWidth)
        return "Key/Search: [$key]  Value: [$value]"
    }

    private fun field(field: TextField, focused: Boolean, placeholder: String, width: Int): String {
        val text = when {
            focused -> caretOf(field, placeholder)
            field.value.isNotEmpty() -> field.value
            else -> placeholder
        }
        return padRight(truncate(text, width), width)
    }

    private fun header(keyWidth: Int): String = " %3s  %s  %s".format("No", padRight("Key", keyWidth), "Value")

    private fun row(
        state: TuiState,
        index: Int,
        key: String,
        kv: Db,
        keyWidth: Int,
        valueWidth: Int,
    ): String {
        val marker = if (index == state.cursor) ">" else " "
        val value = kv.get(key).orEmpty()
        return "%s%3d  %s  %s".format(
            marker,
            index + 1,
            padRight(truncate(key, keyWidth), keyWidth),
            truncate(value, valueWidth),
        )
    }

    private fun footer(state: TuiState): String = when {
        state.confirmDelete -> "confirm: press D again to delete all keys"
        state.status.isNotEmpty() -> state.status
        else -> ""
    }
}

private const val EMPTY_KEY_FIELD = "key / search"
private const val EMPTY_VALUE_FIELD = "value"
