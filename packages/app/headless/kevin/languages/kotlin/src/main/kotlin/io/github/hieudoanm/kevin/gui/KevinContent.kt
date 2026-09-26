package io.github.hieudoanm.kevin.gui

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.Delete
import androidx.compose.material.icons.filled.Refresh
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalClipboardManager
import androidx.compose.ui.text.AnnotatedString
import androidx.compose.ui.unit.dp
import io.github.hieudoanm.kevin.db.Db

private val ACTION_WIDTH = 48.dp

/** The key/value manager window contents; reports every state change to [onState]. */
@Suppress("DEPRECATION") // LocalClipboard is suspend-only; the reducer callback is not.
@Composable
internal fun KevinContent(state: GuiState, kv: Db, onState: (GuiState) -> Unit) {
    val clipboard = LocalClipboardManager.current
    val copy: (String) -> Unit = { clipboard.setText(AnnotatedString(it)) }
    val dispatch: (GuiEvent) -> Unit = { onState(GuiController.reduce(state, it, kv, copy)) }
    Surface(
        modifier = Modifier.fillMaxSize(),
        color = MaterialTheme.colorScheme.surface,
    ) {
        // One owner for page padding; children lay out without their own.
        Column(
            modifier = Modifier.padding(Space.xl),
            verticalArrangement = Arrangement.spacedBy(Space.md),
        ) {
            ControlBar(state, dispatch)
            KeyValueTable(state, dispatch)
        }
    }
    ConfirmDialog(state, dispatch)
}

@Composable
private fun ControlBar(state: GuiState, onEvent: (GuiEvent) -> Unit) {
    Row(
        modifier = Modifier.fillMaxWidth(),
        horizontalArrangement = Arrangement.spacedBy(Space.sm),
        verticalAlignment = Alignment.CenterVertically,
    ) {
        OutlinedTextField(
            value = state.keyQuery,
            onValueChange = { onEvent(GuiEvent.QueryChanged(it)) },
            label = { Text("Key / search") },
            singleLine = true,
            modifier = Modifier.weight(1f),
        )
        OutlinedTextField(
            value = state.valueInput,
            onValueChange = { onEvent(GuiEvent.ValueChanged(it)) },
            label = { Text("Value") },
            singleLine = true,
            modifier = Modifier.weight(1f),
        )
        ActionButton(
            icon = Icons.Filled.Add,
            label = "Set key",
            onClick = { onEvent(GuiEvent.Set) },
            modifier = Modifier.width(ACTION_WIDTH),
        )
        ActionButton(
            icon = Icons.Filled.Refresh,
            label = "Refresh",
            onClick = { onEvent(GuiEvent.Refresh) },
            modifier = Modifier.width(ACTION_WIDTH),
        )
        ActionButton(
            icon = Icons.Filled.Delete,
            label = "Delete all keys",
            onClick = { onEvent(GuiEvent.DeleteAll) },
            destructive = true,
            modifier = Modifier.width(ACTION_WIDTH),
        )
    }
}
