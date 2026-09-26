package io.github.hieudoanm.kevin.gui

import androidx.compose.material3.AlertDialog
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable

/** Confirms a pending single-key or delete-all request; renders nothing without one. */
@Composable
internal fun ConfirmDialog(state: GuiState, onEvent: (GuiEvent) -> Unit) {
    val key = state.pendingDelete
    val all = state.pendingDeleteAll
    if (key == null && !all) return
    AlertDialog(
        onDismissRequest = { onEvent(GuiEvent.Dismiss) },
        title = { Text(if (all) "Delete all keys" else "Delete key") },
        text = { Text(if (all) "Every key will be removed from the store." else "Delete \"$key\"?") },
        confirmButton = {
            TextButton(onClick = { onEvent(GuiEvent.Confirm) }) {
                Text("Delete", color = MaterialTheme.colorScheme.error)
            }
        },
        dismissButton = {
            TextButton(onClick = { onEvent(GuiEvent.Dismiss) }) { Text("Cancel") }
        },
    )
}
