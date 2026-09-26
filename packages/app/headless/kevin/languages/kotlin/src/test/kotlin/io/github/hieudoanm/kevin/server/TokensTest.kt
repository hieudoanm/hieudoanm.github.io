package io.github.hieudoanm.kevin.server

import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertFalse
import kotlin.test.assertTrue

class TokensTest {
    @Test
    fun `splitToken returns the first token and the rest`() {
        assertEquals("cmd" to " key value", splitToken("cmd key value"))
    }

    @Test
    fun `splitToken keeps leading separator spaces in the rest`() {
        assertEquals("a" to "   b", splitToken("a   b"))
    }

    @Test
    fun `splitToken skips leading spaces`() {
        assertEquals("a" to " b", splitToken("   a b"))
    }

    @Test
    fun `splitToken on an empty string yields two empty parts`() {
        assertEquals("" to "", splitToken(""))
    }

    @Test
    fun `splitToken on only spaces yields two empty parts`() {
        assertEquals("" to "   ", splitToken("   "))
    }

    @Test
    fun `splitAll returns every token`() {
        assertEquals(listOf("a", "b", "c"), splitAll("a b c"))
    }

    @Test
    fun `splitAll collapses repeated separators`() {
        assertEquals(listOf("a", "b"), splitAll("a    b"))
    }

    @Test
    fun `splitAll on blank input is empty`() {
        assertTrue(splitAll("").isEmpty())
        assertTrue(splitAll("   ").isEmpty())
    }

    @Test
    fun `splitTwo accepts exactly two tokens`() {
        assertEquals(Triple("a", "b", true), splitTwo("a b"))
    }

    @Test
    fun `splitTwo rejects a missing second token`() {
        assertFalse(splitTwo("a").third)
    }

    @Test
    fun `splitTwo rejects trailing tokens`() {
        assertFalse(splitTwo("a b c").third)
    }
}
