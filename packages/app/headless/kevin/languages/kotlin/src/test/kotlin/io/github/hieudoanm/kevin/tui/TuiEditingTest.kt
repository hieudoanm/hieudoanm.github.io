package io.github.hieudoanm.kevin.tui

import io.github.hieudoanm.kevin.db.Db
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertTrue

/** Caret movement and text editing inside the focused field. */
class TuiEditingTest {
    private val db = Db()

    private fun press(state: TuiState, vararg keys: String) =
        keys.fold(state) { acc, key -> TuiReducer.reduce(acc, TuiEvent.Press(key), db) }

    private fun seeded(): TuiState {
        db.set("apple", "red")
        return TuiState().let { TuiReducer.reduce(it, TuiEvent.Reload, db) }
    }

    @Test
    fun `left and right move the caret`() {
        val state = press(seeded(), "a", "p", "ArrowLeft", "p")
        assertEquals("app", state.keyField.value)
        assertEquals(2, state.keyField.caret)
    }

    @Test
    fun `home and end jump the caret`() {
        var state = press(seeded(), "a", "b", "Home", "x")
        assertEquals("xab", state.keyField.value)
        state = press(state, "End", "y")
        assertEquals("xaby", state.keyField.value)
    }

    @Test
    fun `delete removes the character at the caret`() {
        val state = press(seeded(), "a", "b", "ArrowLeft", "Delete")
        assertEquals("a", state.keyField.value)
    }

    @Test
    fun `the cursor stays in range when the filter shrinks the list`() {
        val state = press(seeded(), "Tab", "Tab", "ArrowDown", "a")
        assertTrue(state.cursor < state.rows.size)
    }

    @Test
    fun `resize records the new width`() {
        val state = TuiReducer.reduce(TuiState(), TuiEvent.Resize(120), db)
        assertEquals(120, state.width)
    }
}
