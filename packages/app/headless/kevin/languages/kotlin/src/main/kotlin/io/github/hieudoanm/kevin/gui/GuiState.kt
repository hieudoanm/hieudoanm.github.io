package io.github.hieudoanm.kevin.gui

import io.github.hieudoanm.kevin.db.Db

/** Immutable GUI state; every transition produces a new instance. */
data class GuiState(
    val keyQuery: String = "",
    val valueInput: String = "",
    val rows: List<String> = emptyList(),
    val values: Map<String, String> = emptyMap(),
    val selectedKey: String = "",
    val status: String = "",
    val count: Int = 0,
    val pendingDelete: String? = null,
    val pendingDeleteAll: Boolean = false,
) {
    val title: String get() = "kevin — Key/Value ($count keys)"
}

/** User intent surfaced by the Compose widgets. */
sealed interface GuiEvent {
    data class QueryChanged(val query: String) : GuiEvent

    data class ValueChanged(val value: String) : GuiEvent

    data object Set : GuiEvent

    data object Refresh : GuiEvent

    data object DeleteAll : GuiEvent

    data class SelectRow(val key: String) : GuiEvent

    data class EditRow(val key: String) : GuiEvent

    data class CopyRow(val key: String) : GuiEvent

    data class DeleteRow(val key: String) : GuiEvent

    data object Confirm : GuiEvent

    data object Dismiss : GuiEvent
}

/** Applies [GuiEvent]s to [GuiState], mutating [kv] only where the GUI edits data. */
object GuiController {
    fun reduce(state: GuiState, event: GuiEvent, kv: Db, onCopy: (String) -> Unit = {}): GuiState =
        when (event) {
            is GuiEvent.QueryChanged -> state.copy(keyQuery = event.query).render(kv)
            is GuiEvent.ValueChanged -> state.copy(valueInput = event.value)
            GuiEvent.Set -> state.doSet(kv)
            GuiEvent.Refresh -> state.refresh(kv)
            GuiEvent.DeleteAll -> state.copy(pendingDeleteAll = true, pendingDelete = null)
            is GuiEvent.SelectRow -> state.copy(selectedKey = event.key)
            is GuiEvent.EditRow -> state.loadRow(event.key, kv)
            is GuiEvent.CopyRow -> state.copyValue(event.key, kv, onCopy)
            is GuiEvent.DeleteRow -> state.copy(pendingDelete = event.key, pendingDeleteAll = false)
            GuiEvent.Confirm -> state.confirm(kv)
            GuiEvent.Dismiss -> state.copy(pendingDelete = null, pendingDeleteAll = false)
        }
}

internal fun GuiState.render(kv: Db): GuiState {
    val filtered = filterAndSort(kv, keyQuery)
    return copy(
        rows = filtered,
        values = filtered.associateWith { kv.get(it).orEmpty() },
        selectedKey = selectedKey.takeIf { it in filtered }.orEmpty(),
        count = kv.keys().size,
    )
}

internal fun filterAndSort(kv: Db, query: String): List<String> {
    val needle = query.trim().lowercase()
    return kv.keys().filter { key ->
        needle.isEmpty() || key.lowercase().contains(needle) ||
            kv.get(key).orEmpty().lowercase().contains(needle)
    }.sorted()
}

internal fun GuiState.doSet(kv: Db): GuiState {
    if (keyQuery.isBlank()) return copy(status = "enter a key first").render(kv)
    val existed = kv.get(keyQuery) != null
    kv.set(keyQuery, valueInput)
    return copy(
        selectedKey = keyQuery,
        status = if (existed) "updated $keyQuery" else "set $keyQuery",
    ).render(kv)
}

internal fun GuiState.loadRow(key: String, kv: Db): GuiState {
    val value = kv.get(key) ?: return copy(valueInput = "", status = "key not found: $key")
    return copy(keyQuery = key, valueInput = value, selectedKey = key, status = "loaded $key")
}

internal fun GuiState.copyValue(key: String, kv: Db, onCopy: (String) -> Unit): GuiState {
    val value = kv.get(key) ?: return copy(status = "key not found: $key")
    onCopy(value)
    return copy(status = "value copied to clipboard")
}

internal fun GuiState.confirm(kv: Db): GuiState = when {
    pendingDeleteAll -> copy(pendingDeleteAll = false, status = "deleted ${kv.flush()} keys").render(kv)
    pendingDelete != null -> deleteOne(pendingDelete, kv)
    else -> this
}

internal fun GuiState.deleteOne(key: String, kv: Db): GuiState {
    if (!kv.del(key)) return copy(pendingDelete = null, status = "key not found: $key")
    return copy(
        selectedKey = if (selectedKey == key) "" else selectedKey,
        pendingDelete = null,
        status = "deleted $key",
    ).render(kv)
}

/** Clears the editor inputs and reloads, mirroring the Go GUI's refresh button. */
internal fun GuiState.refresh(kv: Db): GuiState = copy(
    keyQuery = "",
    valueInput = "",
    selectedKey = "",
    status = "refreshed",
).render(kv)
