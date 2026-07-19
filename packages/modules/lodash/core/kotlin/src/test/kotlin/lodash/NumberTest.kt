package lodash.test

import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertFalse
import org.junit.jupiter.api.Assertions.assertTrue
import org.junit.jupiter.api.Test

class NumberTest {

    @Test
    fun clamp() {
        assertEquals(-5.0, lodash.clamp(-10.0, -5.0, 5.0))
        assertEquals(0.0, lodash.clamp(0.0, -5.0, 5.0))
        assertEquals(5.0, lodash.clamp(10.0, -5.0, 5.0))
        assertEquals(3, lodash.clamp(3, 1, 5))
        assertEquals(1, lodash.clamp(0, 1, 5))
        assertEquals(5, lodash.clamp(10, 1, 5))
        assertEquals(3L, lodash.clamp(3L, 1L, 5L))
        assertEquals(1L, lodash.clamp(0L, 1L, 5L))
    }

    @Test
    fun inRange() {
        assertTrue(lodash.inRange(3.0, 2.0, 5.0))
        assertFalse(lodash.inRange(5.0, 2.0, 5.0))
        assertTrue(lodash.inRange(3.0, 5.0, 2.0))
        assertTrue(lodash.inRange(2.0, end = 5.0))
        assertFalse(lodash.inRange(6.0, end = 5.0))
        assertTrue(lodash.inRange(3, 2, 5))
    }

    @Test
    fun randomTest() {
        val r1 = lodash.random()
        assertTrue(r1 >= 0.0)
        assertTrue(r1 < 1.0)

        val r2 = lodash.random(5.0)
        assertTrue(r2 >= 0.0)
        assertTrue(r2 < 5.0)

        val r3 = lodash.random(1, 6)
        assertTrue(r3 >= 1)
        assertTrue(r3 <= 6)

        val r4 = lodash.random(10)
        assertTrue(r4 >= 0)
        assertTrue(r4 <= 10)

        val r5 = lodash.random(0.0, 1.0, floating = true)
        assertTrue(r5 >= 0.0)
        assertTrue(r5 < 1.0)
    }
}
