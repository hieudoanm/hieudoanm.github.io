package io.github.hieudoanm.kevin.tui

import io.github.hieudoanm.kevin.db.Db
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertFalse
import kotlin.test.assertTrue

class TuiReducerTest {
    private val db = Db()

    private fun press(state: TuiState, vararg keys: String) =
        keys.fold(state) { acc, key -> TuiReducer.reduce(acc, TuiEvent.Press(key), db) }

    private fun TuiState.reload() = TuiReducer.reduce(this, TuiEvent.Reload, db)

    private fun seeded(): TuiState {
        db.set("apple", "red")
        db.set("banana", "yellow")
        return TuiState().reload()
    }

    @Test
    fun `initial state focuses the key field`() {
        assertEquals(Focus.KEY, TuiState().focus)
    }

    @Test
    fun `tab cycles focus and wraps`() {
        var state = TuiState()
        state = press(state, "Tab")
        assertEquals(Focus.VALUE, state.focus)
        state = press(state, "Tab")
        assertEquals(Focus.TABLE, state.focus)
        state = press(state, "Tab")
        assertEquals(Focus.KEY, state.focus)
    }

    @Test
    fun `typing in the key field filters the rows`() {
        val state = press(seeded(), "b")
        assertEquals("b", state.keyField.value)
        assertEquals(listOf("banana"), state.rows)
    }

    @Test
    fun `typing in the key field also matches values`() {
        val state = press(seeded(), "y", "e")
        assertEquals(listOf("banana"), state.rows)
    }

    @Test
    fun `backspace edits the focused field`() {
        val state = press(seeded(), "a", "p", "Backspace")
        assertEquals("p", state.keyField.value)
        assertEquals(listOf("apple"), state.rows)
    }

    @Test
    fun `enter in the key field stores the value`() {
        val state = press(seeded(), "c", "Tab", "g", "r", "e", "e", "n", "Enter")
        assertEquals("green", db.get("c"))
        assertTrue(state.rows.contains("c"))
    }

    @Test
    fun `enter with a blank key reports a status`() {
        val state = press(seeded(), "Enter")
        assertEquals("enter a key first", state.status)
    }

    @Test
    fun `set reports whether the key was added or updated`() {
        var state = press(seeded(), "c", "Tab", "x", "Enter")
        assertEquals("set c", state.status)
        state = press(state, "y", "Enter")
        assertEquals("set c", state.status)
        state = press(state, "y", "Backspace", "z", "Enter")
        assertEquals("updated c", state.status)
    }

    @Test
    fun `arrow keys move the cursor only when the table has focus`() {
        var state = press(seeded(), "Tab", "Tab")
        assertEquals(Focus.TABLE, state.focus)
        state = press(state, "ArrowDown")
        assertEquals(1, state.cursor)
        state = press(state, "ArrowUp")
        assertEquals(0, state.cursor)
        state = press(state, "ArrowUp")
        assertEquals(1, state.cursor, "cursor wraps to the end")
    }

    @Test
    fun `arrow keys are ignored while typing`() {
        val state = press(seeded(), "ArrowDown", "ArrowUp")
        assertEquals(0, state.cursor)
        assertEquals(Focus.KEY, state.focus)
    }

    @Test
    fun `d deletes the selected key`() {
        var state = press(seeded(), "Tab", "Tab")
        state = press(state, "d")
        assertEquals("deleted apple", state.status)
        assertEquals(listOf("banana"), state.rows)
    }

    @Test
    fun `shift-d asks for confirmation before deleting everything`() {
        var state = press(seeded(), "Tab", "Tab", "D")
        assertTrue(state.confirmDelete)
        assertEquals(2, db.len())
        state = press(state, "D")
        assertFalse(state.confirmDelete)
        assertEquals(0, db.len())
        assertEquals("deleted 2 keys", state.status)
    }

    @Test
    fun `any other key cancels the delete-all confirmation`() {
        var state = press(seeded(), "Tab", "Tab", "D")
        state = press(state, "ArrowDown")
        assertFalse(state.confirmDelete)
        assertEquals(2, db.len())
    }

    @Test
    fun `r clears the inputs and reloads`() {
        val state = press(seeded(), "a", "Tab", "Tab", "r")
        assertEquals("", state.keyField.value)
        assertEquals("", state.valueField.value)
        assertEquals("refreshed", state.status)
        assertEquals(2, state.rows.size)
    }

    @Test
    fun `enter on the table loads the key into the value field`() {
        val state = press(seeded(), "Tab", "Tab", "Enter")
        assertEquals(Focus.VALUE, state.focus)
        assertEquals("apple", state.keyField.value)
        assertEquals("red", state.valueField.value)
        assertEquals("loaded apple", state.status)
    }

    @Test
    fun `space on the table also loads the key`() {
        val state = press(seeded(), "Tab", "Tab", " ")
        assertEquals("apple", state.valueField.value)
    }

    @Test
    fun `q quits only when the table has focus`() {
        assertTrue(press(seeded(), "q").running)
        assertFalse(press(seeded(), "Tab", "Tab", "q").running)
    }

    @Test
    fun `ctrl-c always quits`() {
        val state = TuiReducer.reduce(seeded(), TuiEvent.Press("c", ctrl = true), db)
        assertFalse(state.running)
    }

    @Test
    fun `d and r type into the key field when it has focus`() {
        val state = press(seeded(), "d", "r")
        assertEquals("dr", state.keyField.value)
    }
}
