package io.github.hieudoanm.kevin.tui

import io.github.hieudoanm.kevin.db.Db
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertTrue

class RenderTest {
    private val db = Db()

    private fun state(width: Int = 80) = TuiState(width = width).let { TuiReducer.reduce(it, TuiEvent.Reload, db) }

    @Test
    fun `the header reports the live key count`() {
        db.set("a", "1")
        assertTrue(Render.frame(state(), db).startsWith("kevin — Key/Value (1 keys)"))
    }

    @Test
    fun `the header shows the key and value fields`() {
        assertTrue(Render.frame(state(), db).contains("Key/Search: ["))
        assertTrue(Render.frame(state(), db).contains("Value: ["))
    }

    @Test
    fun `the column header is present`() {
        val frame = Render.frame(state(), db)
        assertTrue(frame.contains("No"))
        assertTrue(frame.contains("Key"))
        assertTrue(frame.contains("Value"))
    }

    @Test
    fun `rows are numbered from one and marked with the cursor`() {
        db.set("apple", "red")
        db.set("banana", "yellow")
        val frame = Render.frame(state(), db)
        assertTrue(frame.contains("> 1  apple"))
        assertTrue(frame.contains("  2  banana"))
    }

    @Test
    fun `the caret marks the active field only`() {
        val frame = Render.frame(state(), db)
        assertTrue(frame.contains("key / search^"))
        assertTrue(!frame.contains("value^"))
    }

    @Test
    fun `the help line explains the bindings`() {
        val frame = Render.frame(state(), db)
        assertTrue(frame.contains("tab cycle focus"))
        assertTrue(frame.contains("D delete-all"))
    }

    @Test
    fun `the delete-all confirmation replaces the status`() {
        var current = state()
        current = TuiReducer.reduce(current, TuiEvent.Press("Tab"), db)
        current = TuiReducer.reduce(current, TuiEvent.Press("Tab"), db)
        current = TuiReducer.reduce(current, TuiEvent.Press("D"), db)
        assertTrue(Render.frame(current, db).contains("press D again to delete all keys"))
    }

    @Test
    fun `the status line is shown when set`() {
        var current = state()
        current = TuiReducer.reduce(current, TuiEvent.Press("Enter"), db)
        assertTrue(Render.frame(current, db).contains("enter a key first"))
    }

    @Test
    fun `narrow terminals fall back to eighty columns`() {
        assertEquals(80, Render.lineWidth(TuiState(width = 20)))
        assertEquals(80, Render.lineWidth(TuiState(width = 40)))
        assertEquals(120, Render.lineWidth(TuiState(width = 120)))
    }

    @Test
    fun `long values are truncated with an ellipsis`() {
        db.set("k", "x".repeat(200))
        val frame = Render.frame(state(), db)
        assertTrue(frame.contains("…"))
    }

    @Test
    fun `truncate only shortens over-long text`() {
        assertEquals("abc", Render.truncate("abc", 3))
        assertEquals("ab…", Render.truncate("abc", 2))
    }

    @Test
    fun `padRight never exceeds the requested width`() {
        assertEquals("ab  ", Render.padRight("ab", 4))
        assertEquals("ab", Render.padRight("abcdef", 2))
    }
}
