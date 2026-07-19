package lodash.test

import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertTrue
import org.junit.jupiter.api.Test

class FunctionTest {

    @Test
    fun after() {
        var count = 0
        val fn = lodash.after(3) { count++; Unit }
        fn()
        assertEquals(0, count)
        fn()
        assertEquals(0, count)
        fn()
        assertEquals(1, count)
        fn()
        assertEquals(2, count)
    }

    @Test
    fun before() {
        var count = 0
        val fn = lodash.before(3) { count++; count }
        assertEquals(1, fn())
        assertEquals(1, count)
        assertEquals(2, fn())
        assertEquals(2, count)
        assertEquals(2, fn())
        assertEquals(2, count)
        assertEquals(2, fn())
        assertEquals(2, count)
    }

    @Test
    fun negate() {
        val isEven: (Int) -> Boolean = { x -> x % 2 == 0 }
        val isOdd = lodash.negate(isEven)
        assertTrue(isOdd(1))
        assertTrue(!isOdd(2))
    }

    @Test
    fun once() {
        var count = 0
        val fn = lodash.once { count++; 42 }
        assertEquals(42, fn())
        assertEquals(1, count)
        assertEquals(42, fn())
        assertEquals(1, count)
    }

    @Test
    fun memoize() {
        var callCount = 0
        val fn = lodash.memoize { x: Int -> callCount++; x * x }
        assertEquals(4, fn(2))
        assertEquals(1, callCount)
        assertEquals(4, fn(2))
        assertEquals(1, callCount)
        assertEquals(9, fn(3))
        assertEquals(2, callCount)
    }

    @Test
    fun flip() {
        val strConcat: (String, String) -> String = { a, b -> "$a $b" }
        val flipped = lodash.flip(strConcat)
        assertEquals("hello world", flipped("world", "hello"))
    }

    @Test
    fun debounce() {
        var count = 0
        val fn = lodash.debounce({ count++; Unit }, 10L)
        fn()
        assertEquals(0, count)
        Thread.sleep(50)
        fn()
        Thread.sleep(50)
        assertTrue(count >= 1)
    }

    @Test
    fun throttle() {
        var count = 0
        val fn = lodash.throttle({ count++; Unit }, 50L)
        fn()
        assertEquals(1, count)
        fn()
        assertEquals(1, count)
        Thread.sleep(60)
        fn()
        assertEquals(2, count)
    }

    @Test
    fun unary() {
        val fn = lodash.unary { x: Int -> x * 2 }
        assertEquals(4, fn(2))
        assertEquals(10, fn(5))
    }

    @Test
    fun wrap() {
        val wrapped = lodash.wrap(5) { x -> x * 2 }
        assertEquals(10, wrapped())
        val wrappedStr = lodash.wrap("hello") { x -> "$x world" }
        assertEquals("hello world", wrappedStr())
    }
}
