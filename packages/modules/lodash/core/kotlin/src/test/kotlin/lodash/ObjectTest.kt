package lodash.test

import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertFalse
import org.junit.jupiter.api.Assertions.assertTrue
import org.junit.jupiter.api.Test

class ObjectTest {

    @Test
    fun assign() {
        val obj = mutableMapOf<String, Any?>("a" to 1)
        lodash.assign(obj, mapOf<String, Any?>("b" to 2), mapOf<String, Any?>("c" to 3))
        assertEquals(mapOf("a" to 1, "b" to 2, "c" to 3), obj)

        val obj2 = mutableMapOf<String, Any?>("a" to 1)
        lodash.assign(obj2, mapOf<String, Any?>("a" to 2))
        assertEquals(mapOf("a" to 2), obj2)
    }

    @Test
    fun pick() {
        val obj = mapOf<String, Any?>("a" to 1, "b" to 2, "c" to 3)
        assertEquals(mapOf("a" to 1, "c" to 3), lodash.pick(obj, listOf("a", "c")))
        assertEquals(emptyMap<String, Any?>(), lodash.pick(obj, listOf("d")))
    }

    @Test
    fun omit() {
        val obj = mapOf<String, Any?>("a" to 1, "b" to 2, "c" to 3)
        assertEquals(mapOf("b" to 2), lodash.omit(obj, listOf("a", "c")))
        assertEquals(obj, lodash.omit(obj, listOf("d")))
    }

    @Test
    fun get() {
        val obj = mapOf<String, Any?>("a" to mapOf<String, Any?>("b" to mapOf<String, Any?>("c" to 42)))
        assertEquals(42, lodash.get(obj, "a.b.c"))
        assertEquals(null, lodash.get(obj, "x"))
        assertEquals("default", lodash.get(obj, "x", "default"))
        assertEquals("default", lodash.get(null, "x", "default"))
    }

    @Test
    fun has() {
        val obj = mapOf<String, Any?>("a" to mapOf<String, Any?>("b" to 42))
        assertTrue(lodash.has(obj, "a"))
        assertTrue(lodash.has(obj, "a.b"))
        assertFalse(lodash.has(obj, "a.c"))
        assertFalse(lodash.has(obj, "x"))
        assertFalse(lodash.has(null, "x"))
    }

    @Test
    fun keys() {
        assertEquals(listOf("a", "b"), lodash.keys(mapOf<String, Any?>("a" to 1, "b" to 2)))
        assertEquals(emptyList<String>(), lodash.keys(emptyMap<String, Any?>()))
    }

    @Test
    fun values() {
        assertEquals(listOf(1, 2), lodash.values(mapOf<String, Any?>("a" to 1, "b" to 2)))
        assertEquals(emptyList<Any?>(), lodash.values(emptyMap<String, Any?>()))
    }

    @Test
    fun mapKeys() {
        val obj = mapOf<String, Any?>("a" to 1, "b" to 2)
        val result = lodash.mapKeys(obj) { value, key -> "$key$value" }
        assertEquals(mapOf("a1" to 1, "b2" to 2), result)
    }

    @Test
    fun mapValues() {
        val obj = mapOf<String, Any?>("a" to 1, "b" to 2)
        val result = lodash.mapValues(obj) { value -> (value as Int) * 2 }
        assertEquals(mapOf("a" to 2, "b" to 4), result)
    }

    @Test
    fun defaults() {
        val obj = mutableMapOf<String, Any?>("a" to 1)
        lodash.defaults(obj, mapOf<String, Any?>("b" to 2), mapOf<String, Any?>("a" to 99, "c" to 3))
        assertEquals(mapOf("a" to 1, "b" to 2, "c" to 3), obj)
    }

    @Test
    fun findKey() {
        val obj = mapOf<String, Any?>("a" to 1, "b" to 2, "c" to 3)
        assertEquals("b", lodash.findKey(obj) { it == 2 })
        assertEquals(null, lodash.findKey(obj) { it == 99 })
    }

    @Test
    fun forIn() {
        val obj = mapOf<String, Any?>("a" to 1, "b" to 2)
        val keys = mutableListOf<String>()
        val vals = mutableListOf<Any?>()
        lodash.forIn(obj) { value, key ->
            vals.add(value)
            keys.add(key)
        }
        assertEquals(listOf("a", "b"), keys)
        assertEquals(listOf(1, 2), vals)
    }

    @Test
    fun forOwn() {
        val obj = mapOf<String, Any?>("a" to 1, "b" to 2)
        val keys = mutableListOf<String>()
        lodash.forOwn(obj) { _, key -> keys.add(key) }
        assertEquals(listOf("a", "b"), keys)
    }

    @Test
    fun invert() {
        val obj = mapOf<String, Any?>("a" to "1", "b" to "2")
        assertEquals(mapOf("1" to "a", "2" to "b"), lodash.invert(obj))
    }

    @Test
    fun invertBy() {
        val obj = mapOf<String, Any?>("a" to 1, "b" to 2)
        val result = lodash.invertBy(obj) { (it as Int).toString() }
        assertEquals(mapOf("1" to "a", "2" to "b"), result)
    }

    @Test
    fun set() {
        val obj = mutableMapOf<String, Any?>()
        lodash.set(obj, "a.b.c", 42)
        assertEquals(42, (obj["a"] as Map<*, *>)["b"].let { (it as Map<*, *>)["c"] })

        val obj2 = mutableMapOf<String, Any?>("x" to 1)
        lodash.set(obj2, "y", 2)
        assertEquals(mapOf("x" to 1, "y" to 2), obj2)
    }

    @Test
    fun unset() {
        val obj = mutableMapOf<String, Any?>("a" to mutableMapOf<String, Any?>("b" to 42))
        assertTrue(lodash.unset(obj, "a.b"))
        assertFalse(lodash.has(obj, "a.b"))
        assertFalse(lodash.unset(obj, "x.y"))
        assertFalse(lodash.unset(obj, "x"))
    }
}
