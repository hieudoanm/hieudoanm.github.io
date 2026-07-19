package io.github.hieudoanm.kevin.gui

import io.github.hieudoanm.kevin.db.Db
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertNull
import kotlin.test.assertTrue

class GuiControllerTest {
    private val db = Db()

    private fun reduce(state: GuiState, event: GuiEvent) = GuiController.reduce(state, event, db, ::noop)

    private fun noop(value: String) = Unit

    private fun seeded(): GuiState {
        db.set("apple", "red")
        db.set("banana", "yellow")
        return GuiController.reduce(GuiState(), GuiEvent.Refresh, db)
    }

    @Test
    fun `refresh loads the rows and count`() {
        val state = seeded()
        assertEquals(listOf("apple", "banana"), state.rows)
        assertEquals(2, state.count)
    }

    @Test
    fun `the title reports the key count`() {
        assertEquals("kevin — Key/Value (2 keys)", seeded().title)
    }

    @Test
    fun `rows are sorted`() {
        db.set("zebra", "z")
        db.set("ant", "a")
        val state = GuiController.reduce(GuiState(), GuiEvent.Refresh, db)
        assertEquals(listOf("ant", "zebra"), state.rows)
    }

    @Test
    fun `a query filters keys and values`() {
        var state = seeded()
        state = reduce(state, GuiEvent.QueryChanged("ban"))
        assertEquals(listOf("banana"), state.rows)
        state = reduce(state, GuiEvent.QueryChanged("red"))
        assertEquals(listOf("apple"), state.rows)
    }

    @Test
    fun `the query is trimmed and case insensitive`() {
        val state = reduce(seeded(), GuiEvent.QueryChanged("  APPLE "))
        assertEquals(listOf("apple"), state.rows)
    }

    @Test
    fun `set stores the key and value`() {
        var state = reduce(seeded(), GuiEvent.QueryChanged("cherry"))
        state = reduce(state, GuiEvent.ValueChanged("red"))
        state = reduce(state, GuiEvent.Set)
        assertEquals("red", db.get("cherry"))
        assertEquals("set cherry", state.status)
    }

    @Test
    fun `set reports an update for an existing key`() {
        var state = reduce(seeded(), GuiEvent.QueryChanged("apple"))
        state = reduce(state, GuiEvent.ValueChanged("green"))
        state = reduce(state, GuiEvent.Set)
        assertEquals("updated apple", state.status)
        assertEquals("green", db.get("apple"))
    }

    @Test
    fun `set with a blank key reports a status`() {
        val state = reduce(seeded(), GuiEvent.Set)
        assertEquals("enter a key first", state.status)
    }

    @Test
    fun `edit row loads the key and value`() {
        val state = reduce(seeded(), GuiEvent.EditRow("banana"))
        assertEquals("banana", state.keyQuery)
        assertEquals("yellow", state.valueInput)
        assertEquals("loaded banana", state.status)
    }

    @Test
    fun `edit row for a missing key clears the value`() {
        val state = reduce(seeded(), GuiEvent.EditRow("ghost"))
        assertEquals("", state.valueInput)
        assertEquals("key not found: ghost", state.status)
    }

    @Test
    fun `select row records the selection`() {
        assertEquals("apple", reduce(seeded(), GuiEvent.SelectRow("apple")).selectedKey)
    }

    @Test
    fun `copy row reports the value through the clipboard`() {
        var copied: String? = null
        val state = GuiController.reduce(seeded(), GuiEvent.CopyRow("apple"), db) { copied = it }
        assertEquals("red", copied)
        assertEquals("value copied to clipboard", state.status)
    }

    @Test
    fun `copy row for a missing key reports not found`() {
        val state = reduce(seeded(), GuiEvent.CopyRow("ghost"))
        assertEquals("key not found: ghost", state.status)
    }

    @Test
    fun `delete row asks for confirmation first`() {
        val state = reduce(seeded(), GuiEvent.DeleteRow("apple"))
        assertEquals("apple", state.pendingDelete)
        assertEquals("red", db.get("apple"))
    }

    @Test
    fun `confirming a row delete removes the key`() {
        var state = reduce(seeded(), GuiEvent.DeleteRow("apple"))
        state = reduce(state, GuiEvent.Confirm)
        assertNull(state.pendingDelete)
        assertNull(db.get("apple"))
        assertEquals("deleted apple", state.status)
        assertEquals(listOf("banana"), state.rows)
    }

    @Test
    fun `dismissing a row delete keeps the key`() {
        var state = reduce(seeded(), GuiEvent.DeleteRow("apple"))
        state = reduce(state, GuiEvent.Dismiss)
        assertNull(state.pendingDelete)
        assertEquals("red", db.get("apple"))
    }

    @Test
    fun `delete all asks for confirmation first`() {
        val state = reduce(seeded(), GuiEvent.DeleteAll)
        assertTrue(state.pendingDeleteAll)
        assertEquals(2, db.len())
    }

    @Test
    fun `confirming delete all empties the store`() {
        var state = reduce(seeded(), GuiEvent.DeleteAll)
        state = reduce(state, GuiEvent.Confirm)
        assertEquals(0, db.len())
        assertEquals("deleted 2 keys", state.status)
        assertTrue(state.rows.isEmpty())
    }

    @Test
    fun `dismissing delete all keeps the keys`() {
        val state = reduce(reduce(seeded(), GuiEvent.DeleteAll), GuiEvent.Dismiss)
        assertTrue(!state.pendingDeleteAll)
        assertEquals(2, db.len())
    }

    @Test
    fun `a new delete request replaces a pending confirmation`() {
        var state = reduce(seeded(), GuiEvent.DeleteAll)
        state = reduce(state, GuiEvent.DeleteRow("apple"))
        assertNull(state.pendingDeleteAll)
        assertEquals("apple", state.pendingDelete)
    }

    @Test
    fun `refresh clears the editor inputs`() {
        var state = reduce(seeded(), GuiEvent.EditRow("apple"))
        state = reduce(state, GuiEvent.Refresh)
        assertEquals("", state.keyQuery)
        assertEquals("", state.valueInput)
        assertEquals("", state.selectedKey)
        assertEquals("refreshed", state.status)
    }

    @Test
    fun `the selection is dropped when the filter hides it`() {
        var state = reduce(seeded(), GuiEvent.SelectRow("apple"))
        state = reduce(state, GuiEvent.QueryChanged("banana"))
        assertEquals("", state.selectedKey)
    }

    @Test
    fun `values are cached for the table`() {
        assertEquals(mapOf("apple" to "red", "banana" to "yellow"), seeded().values)
    }
}
