package io.github.hieudoanm.kevin.tui

import kotlin.test.Test
import kotlin.test.assertEquals

class TextFieldTest {
    @Test
    fun `insert puts text at the caret`() {
        assertEquals(TextField("abc", 3), TextField("ac", 1).insert("b"))
    }

    @Test
    fun `insert accepts multiple characters`() {
        assertEquals(TextField("xhey", 3), TextField("xy", 1).insert("he"))
    }

    @Test
    fun `backspace removes the character before the caret`() {
        assertEquals(TextField("ac", 1), TextField("abc", 2).backspace())
    }

    @Test
    fun `backspace at the start is a no-op`() {
        assertEquals(TextField("ab", 0), TextField("ab", 0).backspace())
    }

    @Test
    fun `delete removes the character at the caret`() {
        assertEquals(TextField("ab", 1), TextField("abc", 1).deleteForward())
    }

    @Test
    fun `delete at the end is a no-op`() {
        assertEquals(TextField("ab", 2), TextField("ab", 2).deleteForward())
    }

    @Test
    fun `the caret is clamped to the value bounds`() {
        assertEquals(2, TextField("ab", 0).moveCaret(9).caret)
        assertEquals(0, TextField("ab", 2).moveCaret(-9).caret)
    }

    @Test
    fun `toStart and toEnd jump the caret`() {
        assertEquals(0, TextField("abc", 2).toStart().caret)
        assertEquals(3, TextField("abc", 0).toEnd().caret)
    }

    @Test
    fun `of places the caret at the end`() {
        assertEquals(TextField("abc", 3), TextField.of("abc"))
    }
}
