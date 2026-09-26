package io.github.hieudoanm.kevin.gui

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.ColumnScope
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.selection.selectable
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Delete
import androidx.compose.material.icons.filled.Edit
import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp

private val NO_WIDTH = 56.dp
private val MARKER_WIDTH = 20.dp
private val ACTION_WIDTH = 48.dp

/** The sorted key/value table with its column headers, count and status line. */
@Composable
internal fun KeyValueTable(state: GuiState, onEvent: (GuiEvent) -> Unit) {
    val rows = remember(state.rows, state.values, state.selectedKey) { state.rowModels() }
    Column(modifier = Modifier.fillMaxWidth()) {
        TableHeader()
        HorizontalDivider(color = MaterialTheme.colorScheme.outline)
        if (rows.isEmpty()) {
            EmptyTable()
        } else {
            LazyColumn(modifier = Modifier.weight(1f)) {
                items(rows, key = { it.key }) { row ->
                    KeyRow(
                        row = row,
                        onSelect = { onEvent(GuiEvent.SelectRow(row.key)) },
                        onEvent = onEvent,
                    )
                }
            }
        }
        StatusBar(state)
    }
}

@Composable
private fun TableHeader() {
    Row(
        modifier = Modifier.fillMaxWidth().padding(horizontal = Space.sm, vertical = Space.xs),
        verticalAlignment = Alignment.CenterVertically,
    ) {
        Text("", Modifier.width(MARKER_WIDTH), style = headerStyle())
        Text("No", Modifier.width(NO_WIDTH), style = headerStyle())
        Text("Key", Modifier.weight(1f), style = headerStyle())
        Text("Value", Modifier.weight(1f), style = headerStyle())
        Text("Actions", Modifier.width(ACTION_WIDTH * 3), style = headerStyle())    }
}

/** Column headers use the label-small ramp so they never compete with cell text. */
@Composable
private fun headerStyle() = MaterialTheme.typography.labelSmall.copy(
    color = MaterialTheme.colorScheme.onSurfaceVariant,
)

@Composable
private fun KeyRow(row: RowModel, onSelect: () -> Unit, onEvent: (GuiEvent) -> Unit) {
    val background = if (row.selected) {
        MaterialTheme.colorScheme.secondaryContainer
    } else {
        MaterialTheme.colorScheme.surface
    }
    Row(
        // background before padding so the highlight spans the full row width.
        modifier = Modifier
            .fillMaxWidth()
            .selectable(selected = row.selected, onClick = onSelect)
            .background(background)
            .padding(horizontal = Space.sm, vertical = Space.xs),
        verticalAlignment = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.spacedBy(Space.xs),
    ) {
        Text(selectionMarker(row.selected), Modifier.width(MARKER_WIDTH))
        Text((row.index + 1).toString(), Modifier.width(NO_WIDTH), style = MaterialTheme.typography.bodyMedium)
        Text(
            text = row.key,
            modifier = Modifier.weight(1f),
            style = MaterialTheme.typography.bodyMedium,
            fontWeight = if (row.selected) FontWeight.SemiBold else FontWeight.Normal,
            maxLines = 1,
            overflow = TextOverflow.Ellipsis,
        )
        Text(
            text = row.value,
            modifier = Modifier.weight(1f),
            style = MaterialTheme.typography.bodyMedium,
            color = MaterialTheme.colorScheme.onSurfaceVariant,
            maxLines = 1,
            overflow = TextOverflow.Ellipsis,
        )
        RowAction(Icons.Filled.Edit, "Edit") { onEvent(GuiEvent.EditRow(row.key)) }
        RowAction(ContentCopyIcon, "Copy value") { onEvent(GuiEvent.CopyRow(row.key)) }
        RowAction(Icons.Filled.Delete, "Delete key", destructive = true) {
            onEvent(GuiEvent.DeleteRow(row.key))
        }
    }
}

/** Selection is signalled by a marker as well as colour, never colour alone. */
private fun selectionMarker(selected: Boolean) = if (selected) "▸" else ""

@Composable
private fun RowAction(
    icon: ImageVector,
    label: String,
    destructive: Boolean = false,
    onClick: () -> Unit,
) {
    ActionButton(
        icon = icon,
        label = label,
        onClick = onClick,
        destructive = destructive,
        modifier = Modifier.width(ACTION_WIDTH),
    )
}

/** Fills the list's slot, so `weight` needs the caller's [ColumnScope]. */
@Composable
private fun ColumnScope.EmptyTable() {
    Box(modifier = Modifier.fillMaxWidth().weight(1f), contentAlignment = Alignment.Center) {
        Text(
            text = "No keys match. Use Set to add one.",
            style = MaterialTheme.typography.bodyLarge,
            color = MaterialTheme.colorScheme.onSurfaceVariant,
        )
    }
}

@Composable
private fun StatusBar(state: GuiState) {
    Row(
        modifier = Modifier.fillMaxWidth().padding(vertical = Space.xs),
        horizontalArrangement = Arrangement.SpaceBetween,
        verticalAlignment = Alignment.CenterVertically,
    ) {
        Text(
            text = "${state.count} keys",
            style = MaterialTheme.typography.titleMedium,
            color = MaterialTheme.colorScheme.primary,
        )
        Text(
            text = state.status,
            modifier = Modifier.padding(start = Space.md),
            style = MaterialTheme.typography.bodyMedium,
            color = MaterialTheme.colorScheme.onSurfaceVariant,
            maxLines = 1,
            overflow = TextOverflow.Ellipsis,
        )
    }
}
