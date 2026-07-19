package lodash.test

import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertNotNull
import org.junit.jupiter.api.Test

class SeqTest {

    @Test
    fun chain() {
        val wrapper = lodash.chain(5)
        assertNotNull(wrapper)
    }

    @Test
    fun lodashWrapperValue() {
        assertEquals(42, lodash.chain(42).value())
        assertEquals("hello", lodash.chain("hello").value())
    }

    @Test
    fun lodashWrapperTap() {
        val result = mutableListOf<Int>()
        val wrapper = lodash.chain(42).tap { x -> result.add(x) }
        assertEquals(listOf(42), result)
        assertEquals(42, wrapper.value())
    }

    @Test
    fun lodashWrapperThru() {
        val wrapper = lodash.chain(5).thru { x -> x * 2 }.thru { x -> x + 1 }
        assertEquals(11, wrapper.value())
    }

    @Test
    fun tap() {
        val result = mutableListOf<Int>()
        val value = lodash.tap(42) { x -> result.add(x) }
        assertEquals(listOf(42), result)
        assertEquals(42, value)
    }

    @Test
    fun thru() {
        val result = lodash.thru(5) { x -> x * 2 }
        assertEquals(10, result)
        val result2 = lodash.thru("hello") { x -> x.uppercase() }
        assertEquals("HELLO", result2)
    }
}
