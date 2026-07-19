package lodash.test

import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertNull
import org.junit.jupiter.api.Assertions.assertTrue
import org.junit.jupiter.api.Test

class MathTest {

    @Test
    fun add() {
        assertEquals(5.0, lodash.add(2.0, 3.0))
        assertEquals(5, lodash.add(2, 3))
        assertEquals(0.0, lodash.add(-1.0, 1.0))
    }

    @Test
    fun ceil() {
        assertEquals(4.0, lodash.ceil(3.14))
        assertEquals(3.2, lodash.ceil(3.14, 1))
        assertEquals(-3.1, lodash.ceil(-3.14, 1))
        assertEquals(4.0, lodash.ceil(3.14, 0))
    }

    @Test
    fun divide() {
        assertEquals(2.0, lodash.divide(6.0, 3.0))
        assertEquals(Double.POSITIVE_INFINITY, lodash.divide(1.0, 0.0))
    }

    @Test
    fun floor() {
        assertEquals(3.0, lodash.floor(3.14))
        assertEquals(3.1, lodash.floor(3.14, 1))
        assertEquals(-3.2, lodash.floor(-3.14, 1))
    }

    @Test
    fun max() {
        assertEquals(3, lodash.max(listOf(1, 2, 3)))
        assertNull(lodash.max(emptyList<Int>()))
        assertNull(lodash.max<Int>(null))
    }

    @Test
    fun maxBy() {
        assertEquals("ccc", lodash.maxBy(listOf("a", "bb", "ccc")) { it.length })
        assertNull(lodash.maxBy(emptyList<String>()) { it.length })
        assertNull(lodash.maxBy<String, Int>(null) { it.length })
    }

    @Test
    fun mean() {
        assertEquals(2.0, lodash.mean(listOf(1, 2, 3)))
        assertTrue(lodash.mean(null).isNaN())
        assertTrue(lodash.mean(emptyList<Number>()).isNaN())
    }

    @Test
    fun meanBy() {
        val items = listOf("a", "bb", "ccc")
        assertEquals(2.0, lodash.meanBy(items) { it.length })
        assertTrue(lodash.meanBy<String>(null) { it.length }.isNaN())
        assertTrue(lodash.meanBy(emptyList<String>()) { it.length }.isNaN())
    }

    @Test
    fun min() {
        assertEquals(1, lodash.min(listOf(1, 2, 3)))
        assertNull(lodash.min(emptyList<Int>()))
        assertNull(lodash.min<Int>(null))
    }

    @Test
    fun minBy() {
        assertEquals("a", lodash.minBy(listOf("a", "bb", "ccc")) { it.length })
        assertNull(lodash.minBy(emptyList<String>()) { it.length })
        assertNull(lodash.minBy<String, Int>(null) { it.length })
    }

    @Test
    fun multiply() {
        assertEquals(6.0, lodash.multiply(2.0, 3.0))
        assertEquals(6, lodash.multiply(2, 3))
        assertEquals(0.0, lodash.multiply(0.0, 5.0))
    }

    @Test
    fun round() {
        assertEquals(3.0, lodash.round(3.14))
        assertEquals(3.14, lodash.round(3.14159, 2))
        assertEquals(3.14, lodash.round(3.14159, 2))
    }

    @Test
    fun subtract() {
        assertEquals(1.0, lodash.subtract(3.0, 2.0))
        assertEquals(1, lodash.subtract(3, 2))
        assertEquals(-1.0, lodash.subtract(2.0, 3.0))
    }

    @Test
    fun sum() {
        assertEquals(6.0, lodash.sum(listOf(1, 2, 3)))
        assertEquals(0.0, lodash.sum(emptyList<Number>()))
        assertEquals(0.0, lodash.sum(null))
    }

    @Test
    fun sumBy() {
        assertEquals(6.0, lodash.sumBy(listOf(1, 2, 3)) { it })
        assertEquals(0.0, lodash.sumBy(emptyList<Int>()) { it })
        assertEquals(0.0, lodash.sumBy<Int>(null) { it })
    }
}
