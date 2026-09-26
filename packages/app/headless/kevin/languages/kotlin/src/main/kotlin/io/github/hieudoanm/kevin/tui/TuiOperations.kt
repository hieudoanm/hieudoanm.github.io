package io.github.hieudoanm.kevin.tui

import io.github.hieudoanm.kevin.db.Db

private const val CARET = "^"
private const val EMPTY_KEY_FIELD = "key / search"
private const val EMPTY_VALUE_FIELD = "value"

/** Rebuilds the filtered row list from the key/search field, keeping the cursor in range. */
internal fun TuiState.reload(kv: Db): TuiState {
    val query = keyField.value.trim().lowercase()
    val filtered = kv.keys().filter { matches(it, query, kv) }.sorted()
    return copy(rows = filtered, cursor = cursor.coerceAtMost(maxOf(0, filtered.lastIndex)))
}

private fun matches(key: String, query: String, kv: Db): Boolean {
    if (query.isEmpty()) return true
    val value = kv.get(key).orEmpty()
    return key.lowercase().contains(query) || value.lowercase().contains(query)
}

internal fun TuiState.cycleFocus(): TuiState = when (focus) {
    Focus.KEY -> copy(focus = Focus.VALUE)
    Focus.VALUE -> copy(focus = Focus.TABLE)
    Focus.TABLE -> copy(focus = Focus.KEY)
}

internal fun TuiState.moveCursor(delta: Int): TuiState {
    if (focus != Focus.TABLE || rows.isEmpty()) return this
    return copy(cursor = (cursor + delta + rows.size) % rows.size)
}

internal fun TuiState.editField(transform: (TextField) -> TextField): TuiState = when (focus) {
    Focus.KEY -> copy(keyField = transform(keyField))
    Focus.VALUE -> copy(valueField = transform(valueField))
    Focus.TABLE -> this
}

internal fun TuiState.type(event: TuiEvent.Press, kv: Db): TuiState {
    if (event.ctrl || event.key.length != 1) return this
    val typed = editField { it.insert(event.key) }
    return if (typed.focus == Focus.KEY) typed.reload(kv) else typed
}

internal fun TuiState.doSet(kv: Db): TuiState {
    val key = keyField.value
    if (key.isBlank()) return copy(status = "enter a key first")
    val existed = kv.get(key) != null
    kv.set(key, valueField.value)
    return copy(status = if (existed) "updated $key" else "set $key").reload(kv)
}

internal fun TuiState.editSelected(kv: Db): TuiState {
    val key = rows.getOrNull(cursor) ?: return this
    val value = kv.get(key).orEmpty()
    return copy(
        keyField = TextField.of(key),
        valueField = TextField.of(value),
        status = "loaded $key",
        focus = Focus.VALUE,
    )
}

internal fun TuiState.deleteSelected(kv: Db): TuiState {
    val key = rows.getOrNull(cursor) ?: return this
    if (!kv.del(key)) return this
    return copy(status = "deleted $key").reload(kv)
}

internal fun TuiState.deleteAll(kv: Db): TuiState {
    if (!confirmDelete) return copy(confirmDelete = true, status = "")
    val removed = kv.flush()
    return copy(confirmDelete = false, status = "deleted $removed keys").reload(kv)
}

internal fun TuiState.refresh(kv: Db): TuiState = copy(
    keyField = TextField(),
    valueField = TextField(),
    status = "refreshed",
).reload(kv)

internal fun caretOf(field: TextField, placeholder: String): String {
    val text = field.value.ifEmpty { placeholder }
    val at = field.caret.coerceIn(0, field.value.length)
    return text.substring(0, at) + CARET + text.substring(at)
}
