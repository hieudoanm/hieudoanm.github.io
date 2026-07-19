package io.github.hieudoanm.kevin.gui

import androidx.compose.runtime.Immutable

/** One immutable table row so Compose can skip recomposition for unchanged rows. */
@Immutable
data class RowModel(val index: Int, val key: String, val value: String, val selected: Boolean)

/**
 * Derives the visible table rows from [GuiState]. Pure and side-effect free so
 * the table can be exercised without a Compose runtime.
 */
internal fun GuiState.rowModels(): List<RowModel> = rows.mapIndexed { index, key ->
    RowModel(index, key, values[key].orEmpty(), key == selectedKey)
}
