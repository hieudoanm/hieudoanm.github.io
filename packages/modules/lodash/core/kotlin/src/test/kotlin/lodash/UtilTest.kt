package lodash.test

import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertFalse
import org.junit.jupiter.api.Assertions.assertNotNull
import org.junit.jupiter.api.Assertions.assertNull
import org.junit.jupiter.api.Assertions.assertTrue
import org.junit.jupiter.api.Test

class UtilTest {

    @Test
    fun attempt() {
        assertEquals(42, lodash.attempt { 42 })
        val error = lodash.attempt { throw RuntimeException("fail") }
        assertTrue(error is RuntimeException)
        assertEquals("fail", (error as RuntimeException).message)
    }

    @Test
    fun constant() {
        val fn = lodash.constant(42)
        assertEquals(42, fn())
        assertEquals(42, fn())
        assertEquals("hello", lodash.constant("hello")())
    }

    @Test
    fun defaultTo() {
        assertEquals(42, lodash.defaultTo(null, 42))
        assertEquals(42, lodash.defaultTo(42, 0))
        assertEquals("default", lodash.defaultTo(null, "default"))
    }

    @Test
    fun identity() {
        assertEquals(42, lodash.identity(42))
        assertEquals("hello", lodash.identity("hello"))
        assertNull(lodash.identity(null))
    }

    @Test
    fun noop() {
        lodash.noop()
    }

    @Test
    fun nthArg() {
        val getFirst = lodash.nthArg<Int>(0)
        assertEquals(1, getFirst(listOf(1, 2, 3)))
        val getLast = lodash.nthArg<Int>(-1)
        assertEquals(3, getLast(listOf(1, 2, 3)))
        val getSecond = lodash.nthArg<Int>(1)
        assertEquals(2, getSecond(listOf(1, 2, 3)))
        val outOfBounds = lodash.nthArg<Int>(10)
        assertNull(outOfBounds(listOf(1, 2, 3)))
    }

    @Test
    fun range() {
        assertEquals(listOf(0, 1, 2), lodash.range(0, 3))
        assertEquals(listOf(0, 2, 4), lodash.range(0, 5, 2))
        assertEquals(listOf(3, 2, 1), lodash.range(3, 0, -1))
        assertEquals(emptyList<Int>(), lodash.range(0, 0))
        assertEquals(emptyList<Int>(), lodash.range(0, 3, 0))
        assertEquals(listOf(0, 1, 2), lodash.range(3))
    }

    @Test
    fun rangeRight() {
        assertEquals(listOf(2, 1, 0), lodash.rangeRight(0, 3))
        assertEquals(listOf(4, 2, 0), lodash.rangeRight(0, 5, 2))
        assertEquals(emptyList<Int>(), lodash.rangeRight(0, 3, -1))
        assertEquals(emptyList<Int>(), lodash.rangeRight(0, 0))
        assertEquals(listOf(2, 1, 0), lodash.rangeRight(3))
    }

    @Test
    fun stubArray() {
        assertEquals(emptyList<Any>(), lodash.stubArray())
    }

    @Test
    fun stubFalse() {
        assertFalse(lodash.stubFalse())
    }

    @Test
    fun stubObject() {
        assertEquals(emptyMap<String, Any>(), lodash.stubObject())
    }

    @Test
    fun stubString() {
        assertEquals("", lodash.stubString())
    }

    @Test
    fun stubTrue() {
        assertTrue(lodash.stubTrue())
    }

    @Test
    fun times() {
        assertEquals(listOf(0, 1, 2), lodash.times(3) { i -> i })
        assertEquals(emptyList<Int>(), lodash.times(0) { i -> i })
        assertEquals(listOf(0, 2, 4), lodash.times(3) { i -> i * 2 })
    }

    @Test
    fun uniqueId() {
        val id1 = lodash.uniqueId()
        val id2 = lodash.uniqueId()
        assertNotNull(id1)
        assertNotNull(id2)
        assertTrue(id2.toInt() > id1.toInt())
        assertEquals("prefix3", lodash.uniqueId("prefix"))
        assertEquals("prefix4", lodash.uniqueId("prefix"))
    }
}
