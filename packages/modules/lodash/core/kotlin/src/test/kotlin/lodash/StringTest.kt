package lodash.test

import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertFalse
import org.junit.jupiter.api.Assertions.assertTrue
import org.junit.jupiter.api.Test

class StringTest {

    @Test
    fun camelCase() {
        assertEquals("fooBar", lodash.camelCase("Foo Bar"))
        assertEquals("fooBar", lodash.camelCase("--foo-bar--"))
        assertEquals("fooBar", lodash.camelCase("foo_bar"))
        assertEquals("fooBar", lodash.camelCase("FOO BAR"))
        assertEquals("", lodash.camelCase(null))
    }

    @Test
    fun capitalize() {
        assertEquals("Hello", lodash.capitalize("hello"))
        assertEquals("Hello", lodash.capitalize("HELLO"))
        assertEquals("Hello world", lodash.capitalize("hello world"))
        assertEquals("", lodash.capitalize(null))
    }

    @Test
    fun endsWith() {
        assertTrue(lodash.endsWith("hello", "lo"))
        assertFalse(lodash.endsWith("hello", "el"))
        assertFalse(lodash.endsWith(null, "lo"))
        assertFalse(lodash.endsWith("hello", null))
        assertTrue(lodash.endsWith("hello", "hel", 3))
        assertFalse(lodash.endsWith("hello", "lo", -1))
        assertFalse(lodash.endsWith("hello", "lo", 0))
    }

    @Test
    fun escape() {
        assertEquals("&amp;", lodash.escape("&"))
        assertEquals("&lt;&gt;", lodash.escape("<>"))
        assertEquals("&quot;hello&quot;", lodash.escape("\"hello\""))
        assertEquals("&#39;", lodash.escape("'"))
        assertEquals("", lodash.escape(null))
    }

    @Test
    fun kebabCase() {
        assertEquals("foo-bar", lodash.kebabCase("Foo Bar"))
        assertEquals("foobar", lodash.kebabCase("fooBar"))
        assertEquals("foo-bar", lodash.kebabCase("__FOO_BAR__"))
        assertEquals("", lodash.kebabCase(null))
    }

    @Test
    fun lowerFirst() {
        assertEquals("hello", lodash.lowerFirst("Hello"))
        assertEquals("hello", lodash.lowerFirst("hello"))
        assertEquals("hELLO", lodash.lowerFirst("HELLO"))
        assertEquals("", lodash.lowerFirst(null))
    }

    @Test
    fun pad() {
        assertEquals("  hi  ", lodash.pad("hi", 6))
        assertEquals("--hi--", lodash.pad("hi", 6, "-"))
        assertEquals("hi", lodash.pad("hi", 2))
        assertEquals("hi", lodash.pad("hi", 1))
        assertEquals("", lodash.pad(null, 6))
    }

    @Test
    fun padEnd() {
        assertEquals("hi    ", lodash.padEnd("hi", 6))
        assertEquals("hi----", lodash.padEnd("hi", 6, "-"))
        assertEquals("hi", lodash.padEnd("hi", 2))
        assertEquals("", lodash.padEnd(null, 6))
    }

    @Test
    fun padStart() {
        assertEquals("    hi", lodash.padStart("hi", 6))
        assertEquals("----hi", lodash.padStart("hi", 6, "-"))
        assertEquals("hi", lodash.padStart("hi", 2))
        assertEquals("", lodash.padStart(null, 6))
    }

    @Test
    fun repeatStr() {
        assertEquals("aaa", lodash.repeat("a", 3))
        assertEquals("", lodash.repeat("a", 0))
        assertEquals("", lodash.repeat("a", -1))
        assertEquals("", lodash.repeat(null, 3))
    }

    @Test
    fun replace() {
        assertEquals("hxllo", lodash.replace("hello", "el", "xl"))
        assertEquals("hello", lodash.replace("hello", "xyz", "abc"))
        assertEquals("", lodash.replace(null, "el", "xl"))
    }

    @Test
    fun snakeCase() {
        assertEquals("foo_bar", lodash.snakeCase("Foo Bar"))
        assertEquals("foobar", lodash.snakeCase("fooBar"))
        assertEquals("foo_bar", lodash.snakeCase("--FOO-BAR--"))
        assertEquals("", lodash.snakeCase(null))
    }

    @Test
    fun split() {
        assertEquals(listOf("a", "b", "c"), lodash.split("a,b,c", ","))
        assertEquals(listOf("a", "b"), lodash.split("a,b,c", ",", 2))
        assertEquals(listOf("a,b,c"), lodash.split("a,b,c", null))
        assertEquals(emptyList<String>(), lodash.split(null, ","))
    }

    @Test
    fun startCase() {
        assertEquals("Foobar", lodash.startCase("fooBar"))
        assertEquals("Foo Bar", lodash.startCase("FOO BAR"))
        assertEquals("Foo Bar", lodash.startCase("--foo-bar--"))
        assertEquals("", lodash.startCase(null))
    }

    @Test
    fun startsWith() {
        assertTrue(lodash.startsWith("hello", "hel"))
        assertFalse(lodash.startsWith("hello", "lo"))
        assertTrue(lodash.startsWith("hello", "hel", 0))
        assertTrue(lodash.startsWith("hello", "lo", 3))
        assertFalse(lodash.startsWith(null, "hel"))
        assertFalse(lodash.startsWith("hello", null))
    }

    @Test
    fun toLower() {
        assertEquals("hello", lodash.toLower("HELLO"))
        assertEquals("hello", lodash.toLower("hello"))
        assertEquals("", lodash.toLower(null))
    }

    @Test
    fun toUpper() {
        assertEquals("HELLO", lodash.toUpper("hello"))
        assertEquals("HELLO", lodash.toUpper("HELLO"))
        assertEquals("", lodash.toUpper(null))
    }

    @Test
    fun truncate() {
        assertEquals("hello...", lodash.truncate("hello world", 8))
        assertEquals("hello world", lodash.truncate("hello world", 20))
        assertEquals("hello!!!", lodash.truncate("hello world", 8, "!!!"))
        assertEquals("", lodash.truncate(null))
    }

    @Test
    fun unescape() {
        assertEquals("&", lodash.unescape("&amp;"))
        assertEquals("<>", lodash.unescape("&lt;&gt;"))
        assertEquals("\"hello\"", lodash.unescape("&quot;hello&quot;"))
        assertEquals("'", lodash.unescape("&#39;"))
        assertEquals("", lodash.unescape(null))
    }

    @Test
    fun upperFirst() {
        assertEquals("Hello", lodash.upperFirst("hello"))
        assertEquals("Hello", lodash.upperFirst("Hello"))
        assertEquals("HELLO", lodash.upperFirst("hELLO"))
        assertEquals("", lodash.upperFirst(null))
    }

    @Test
    fun words() {
        assertEquals(listOf("hello", "world"), lodash.words("hello world"))
        assertEquals(listOf("abc123"), lodash.words("abc123"))
        assertEquals(emptyList<String>(), lodash.words(null))
        assertEquals(emptyList<String>(), lodash.words("!@#"))
    }
}
