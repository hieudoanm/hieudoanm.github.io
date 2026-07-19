package io.github.hieudoanm.kevin.gui

import kotlin.test.Test
import kotlin.test.assertEquals

/** [GuiState.rowModels] is pure, so it is asserted without a Db or a Compose runtime. */
class TableRowsTest {
    private val state = GuiState(
        rows = listOf("apple", "banana"),
        values = mapOf("apple" to "red", "banana" to "yellow"),
        selectedKey = "apple",
        count = 2,
    )

    @Test
    fun `rows are numbered in visible order`() {
        assertEquals(listOf(0, 1), state.rowModels().map { it.index })
    }

    @Test
    fun `a row model carries the value and the selection`() {
        assertEquals(
            listOf(
                RowModel(0, "apple", "red", true),
                RowModel(1, "banana", "yellow", false),
            ),
            state.rowModels(),
        )
    }

    @Test
    fun `no row is selected when the state has no selection`() {
        val unselected = state.copy(selectedKey = "")
        assertEquals(listOf(false, false), unselected.rowModels().map { it.selected })
    }

    @Test
    fun `a row model falls back to an empty value`() {
        val missing = GuiState(rows = listOf("ghost"), count = 1)
        assertEquals(RowModel(0, "ghost", "", false), missing.rowModels().single())
    }
}
