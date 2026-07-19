package lodash.test

import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertFalse
import org.junit.jupiter.api.Assertions.assertTrue
import org.junit.jupiter.api.Test
import java.util.Date

class LangTest {

    @Test
    fun eqTest() {
        assertTrue(lodash.eq(1, 1))
        assertFalse(lodash.eq(1, 2))
        assertTrue(lodash.eq("a", "a"))
        assertTrue(lodash.eq(null, null))
        assertFalse(lodash.eq(null, 1))
    }

    @Test
    fun gtTest() {
        assertTrue(lodash.gt(2.0, 1.0))
        assertFalse(lodash.gt(1.0, 1.0))
        assertFalse(lodash.gt(1.0, 2.0))
    }

    @Test
    fun gteTest() {
        assertTrue(lodash.gte(2.0, 1.0))
        assertTrue(lodash.gte(1.0, 1.0))
        assertFalse(lodash.gte(1.0, 2.0))
    }

    @Test
    fun ltTest() {
        assertTrue(lodash.lt(1.0, 2.0))
        assertFalse(lodash.lt(1.0, 1.0))
        assertFalse(lodash.lt(2.0, 1.0))
    }

    @Test
    fun lteTest() {
        assertTrue(lodash.lte(1.0, 2.0))
        assertTrue(lodash.lte(1.0, 1.0))
        assertFalse(lodash.lte(2.0, 1.0))
    }

    @Test
    fun isArray() {
        assertTrue(lodash.isArray(listOf(1, 2)))
        assertTrue(lodash.isArray(arrayOf(1, 2)))
        assertTrue(lodash.isArray(intArrayOf(1, 2)))
        assertTrue(lodash.isArray(longArrayOf(1L, 2L)))
        assertTrue(lodash.isArray(doubleArrayOf(1.0, 2.0)))
        assertFalse(lodash.isArray("hello"))
        assertFalse(lodash.isArray(null))
        assertFalse(lodash.isArray(42))
    }

    @Test
    fun isBoolean() {
        assertTrue(lodash.isBoolean(true))
        assertTrue(lodash.isBoolean(false))
        assertFalse(lodash.isBoolean(1))
        assertFalse(lodash.isBoolean(null))
        assertFalse(lodash.isBoolean("true"))
    }

    @Test
    fun isEmpty() {
        assertTrue(lodash.isEmpty(null))
        assertTrue(lodash.isEmpty(""))
        assertFalse(lodash.isEmpty("hello"))
        assertTrue(lodash.isEmpty(emptyList<Int>()))
        assertFalse(lodash.isEmpty(listOf(1)))
        assertTrue(lodash.isEmpty(emptyArray<Int>()))
        assertTrue(lodash.isEmpty(emptyMap<Int, Int>()))
        assertTrue(lodash.isEmpty(intArrayOf()))
        assertTrue(lodash.isEmpty(longArrayOf()))
        assertTrue(lodash.isEmpty(doubleArrayOf()))
        assertTrue(lodash.isEmpty(42))
    }

    @Test
    fun isEqual() {
        assertTrue(lodash.isEqual(1, 1))
        assertTrue(lodash.isEqual(null, null))
        assertFalse(lodash.isEqual(1, 2))
        assertTrue(lodash.isEqual(listOf(1, 2), listOf(1, 2)))
    }

    @Test
    fun isFinite() {
        assertTrue(lodash.isFinite(42.0))
        assertTrue(lodash.isFinite(42))
        assertFalse(lodash.isFinite(Double.POSITIVE_INFINITY))
        assertFalse(lodash.isFinite(Double.NaN))
        assertFalse(lodash.isFinite(null))
        assertFalse(lodash.isFinite("42"))
    }

    @Test
    fun isNumber() {
        assertTrue(lodash.isNumber(42))
        assertTrue(lodash.isNumber(3.14))
        assertTrue(lodash.isNumber(Double.NaN))
        assertFalse(lodash.isNumber("42"))
        assertFalse(lodash.isNumber(null))
    }

    @Test
    fun isString() {
        assertTrue(lodash.isString("hello"))
        assertFalse(lodash.isString(42))
        assertFalse(lodash.isString(null))
    }

    @Test
    fun isNaN() {
        assertTrue(lodash.isNaN(Double.NaN))
        assertFalse(lodash.isNaN(42.0))
        assertFalse(lodash.isNaN(null))
        assertFalse(lodash.isNaN("NaN"))
        assertFalse(lodash.isNaN(Float.NaN))
    }

    @Test
    fun isNil() {
        assertTrue(lodash.isNil(null))
        assertFalse(lodash.isNil(0))
        assertFalse(lodash.isNil(""))
    }

    @Test
    fun isNull() {
        assertTrue(lodash.isNull(null))
        assertFalse(lodash.isNull(0))
    }

    @Test
    fun isInteger() {
        assertTrue(lodash.isInteger(42))
        assertTrue(lodash.isInteger(42.0))
        assertFalse(lodash.isInteger(42.5))
        assertFalse(lodash.isInteger("42"))
        assertFalse(lodash.isInteger(null))
    }

    @Test
    fun toFinite() {
        assertEquals(42.0, lodash.toFinite(42))
        assertEquals(0.0, lodash.toFinite(Double.NaN))
        assertEquals(Double.MAX_VALUE, lodash.toFinite(Double.POSITIVE_INFINITY))
        assertEquals(-Double.MAX_VALUE, lodash.toFinite(Double.NEGATIVE_INFINITY))
        assertEquals(3.14, lodash.toFinite("3.14"))
    }

    @Test
    fun toInteger() {
        assertEquals(42, lodash.toInteger(42))
        assertEquals(0, lodash.toInteger(null))
        assertEquals(0, lodash.toInteger(Double.NaN))
        assertEquals(3, lodash.toInteger(3.14))
    }

    @Test
    fun toNumber() {
        assertEquals(42.0, lodash.toNumber(42))
        assertEquals(3.14, lodash.toNumber("3.14"))
        assertEquals(0.0, lodash.toNumber("invalid"))
        assertEquals(1.0, lodash.toNumber(true))
        assertEquals(0.0, lodash.toNumber(false))
        assertEquals(0.0, lodash.toNumber(null))
    }

    @Test
    fun toStringTest() {
        assertEquals("42", lodash.toString(42))
        assertEquals("hello", lodash.toString("hello"))
        assertEquals("", lodash.toString(null))
        assertEquals("true", lodash.toString(true))
    }

    @Test
    fun castArray() {
        assertEquals(listOf(1, 2), lodash.castArray(listOf(1, 2)))
        assertEquals(listOf(1, 2), lodash.castArray(arrayOf(1, 2)))
        assertEquals(listOf(42), lodash.castArray(42))
        assertEquals(listOf(null), lodash.castArray(null))
    }

    @Test
    fun isFunction() {
        assertTrue(lodash.isFunction({ x: Int -> x }))
        assertFalse(lodash.isFunction(42))
        assertFalse(lodash.isFunction(null))
    }

    @Test
    fun isDate() {
        assertTrue(lodash.isDate(Date()))
        assertFalse(lodash.isDate(42))
        assertFalse(lodash.isDate(null))
    }

    @Test
    fun isElement() {
        assertFalse(lodash.isElement("div"))
        assertFalse(lodash.isElement(null))
        assertFalse(lodash.isElement(42))
    }

    @Test
    fun isError() {
        assertTrue(lodash.isError(RuntimeException()))
        assertTrue(lodash.isError(Exception()))
        assertFalse(lodash.isError(42))
        assertFalse(lodash.isError(null))
    }

    @Test
    fun isMap() {
        assertTrue(lodash.isMap(mapOf(1 to 2)))
        assertFalse(lodash.isMap(listOf(1, 2)))
        assertFalse(lodash.isMap(null))
    }

    @Test
    fun isSet() {
        assertTrue(lodash.isSet(setOf(1, 2)))
        assertFalse(lodash.isSet(listOf(1, 2)))
        assertFalse(lodash.isSet(null))
    }

    @Test
    fun isRegExp() {
        assertTrue(lodash.isRegExp(Regex("\\d+")))
        assertFalse(lodash.isRegExp("\\d+"))
        assertFalse(lodash.isRegExp(null))
    }
}
