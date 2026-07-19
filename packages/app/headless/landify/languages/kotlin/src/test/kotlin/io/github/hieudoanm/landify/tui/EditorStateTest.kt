package io.github.hieudoanm.landify.tui

import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertTrue

class EditorStateTest {
    @Test
    fun `the cursor starts at the end of the buffer`() {
        val state = state("hello")
        assertEquals(5, state.cursor)
        assertEquals(0, state.row)
        assertEquals(5, state.column)
    }

    @Test
    fun `insert places a character at the cursor and steps over it`() {
        val state = state("ac").moveTo(1).insert('b')
        assertEquals("abc", state.buffer)
        assertEquals(2, state.cursor)
    }

    @Test
    fun `backspace removes the character before the cursor`() {
        assertEquals("ac", state("abc").backspace().buffer)
    }

    @Test
    fun `backspace at the start is a no-op`() {
        val start = state("abc").moveTo(0)
        assertEquals("abc", start.backspace().buffer)
    }

    @Test
    fun `delete removes the character under the cursor`() {
        val state = state("abc").moveTo(1).delete()
        assertEquals("ac", state.buffer)
        assertEquals(1, state.cursor, "delete keeps the cursor in place")
    }

    @Test
    fun `delete at the end is a no-op`() {
        assertEquals("abc", state("abc").delete().buffer)
    }

    @Test
    fun `the cursor is clamped to the buffer`() {
        assertEquals(3, state("abc").moveTo(99).cursor)
        assertEquals(0, state("abc").moveTo(-5).cursor)
    }

    @Test
    fun `line start and end jump to the line boundaries`() {
        val state = state("ab\ncd\nef")
        assertEquals(3, state.moveTo(5).lineStart().cursor)
        assertEquals(5, state.moveTo(4).lineEnd().cursor)
    }

    @Test
    fun `up and down move by whole lines`() {
        val state = state("ab\ncd\nef")
        assertEquals(3, state.moveTo(5).line(-1).cursor, "up lands on line start")
        assertEquals(8, state.moveTo(4).line(1).cursor, "down lands on the next line start")
    }

    @Test
    fun `up on the first line stays put`() {
        val state = state("ab\ncd")
        assertEquals(0, state.moveTo(1).line(-1).cursor)
    }

    @Test
    fun `row and column track the cursor`() {
        val state = state("ab\ncd")
        assertEquals(1, state.moveTo(4).row)
        assertEquals(1, state.moveTo(4).column)
    }

    @Test
    fun `dirty tracks divergence from the saved text`() {
        assertTrue(!state("same").dirty)
        assertTrue(state("same").insert('!').dirty)
    }

    @Test
    fun `the command line starts empty when command mode opens`() {
        val opened = state("x").enteringCommand()
        assertEquals(Mode.COMMAND, opened.mode)
        assertEquals("", opened.commandLine)
    }

    @Test
    fun `the command line edits independently of the buffer`() {
        val typed = state("x").enteringCommand().withCommandCharacter('v').withCommandCharacter('a')
        assertEquals("va", typed.commandLine)
        assertEquals("x", typed.buffer, "typing a command must not touch the buffer")
        assertEquals("v", typed.withCommandBackspace().commandLine)
    }

    @Test
    fun `an empty command line leaves command mode untouched`() {
        assertEquals(Mode.EDIT, state("x").leavingCommand().mode)
    }
}

/** A state over [buffer], with the same text already saved. */
private fun state(buffer: String): EditorState =
    EditorState(
        path = java.nio.file.Path.of("landify.yaml"),
        buffer = buffer,
        saved = buffer,
    )
