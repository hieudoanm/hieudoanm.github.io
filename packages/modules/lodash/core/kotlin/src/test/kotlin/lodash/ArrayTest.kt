package lodash.test

import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertNull
import org.junit.jupiter.api.Test

class ArrayTest {

    @Test
    fun chunk() {
        assertEquals(listOf(listOf(1, 2), listOf(3, 4), listOf(5)), lodash.chunk(listOf(1, 2, 3, 4, 5), 2))
        assertEquals(emptyList<List<Int>>(), lodash.chunk(listOf(1, 2), 0))
        assertEquals(emptyList<List<Int>>(), lodash.chunk(listOf(1, 2), -1))
        assertEquals(emptyList<List<Int>>(), lodash.chunk(emptyList<Int>(), 2))
        assertEquals(listOf(listOf(1, 2, 3)), lodash.chunk(listOf(1, 2, 3), 5))
        assertEquals(listOf(listOf(1), listOf(2), listOf(3)), lodash.chunk(listOf(1, 2, 3), 1))
    }

    @Test
    fun compact() {
        assertEquals(listOf(1, 2, 3), lodash.compact(listOf(1, null, 2, null, 3)))
        assertEquals(listOf("a", "b"), lodash.compact(listOf("a", null, "b", null)))
        assertEquals(listOf(1, 2), lodash.compact(listOf(0, 1, false, 2, null, "")))
        assertEquals(emptyList<Any>(), lodash.compact(listOf(null, false, 0, "")))
        assertEquals(listOf(1.5), lodash.compact(listOf(1.5, Double.NaN)))
        assertEquals(listOf(true), lodash.compact(listOf(true, false)))
        assertEquals(emptyList<Any>(), lodash.compact(emptyList<Any?>()))
    }

    @Test
    fun concat() {
        assertEquals(listOf(1, 2, 3, 4), lodash.concat(listOf(1), listOf(2, 3), 4))
        assertEquals(listOf(1), lodash.concat(listOf(1)))
        assertEquals(listOf(1, 2, 3), lodash.concat(listOf(1), listOf(2), 3))
        assertEquals(emptyList<Any?>(), lodash.concat(emptyList<Any?>()))
        assertEquals(listOf(1, "a", "b"), lodash.concat(listOf(1), listOf("a"), "b"))
    }

    @Test
    fun difference() {
        assertEquals(listOf(1), lodash.difference(listOf(1, 2, 3), listOf(2, 3)))
        assertEquals(listOf(1, 2, 3), lodash.difference(listOf(1, 2, 3), listOf(4)))
        assertEquals(emptyList<Int>(), lodash.difference(listOf(1, 2), listOf(1, 2)))
        assertEquals(listOf("a"), lodash.difference(listOf("a", "b"), listOf("b")))
    }

    @Test
    fun drop() {
        assertEquals(listOf(2, 3), lodash.drop(listOf(1, 2, 3), 1))
        assertEquals(listOf(1, 2, 3), lodash.drop(listOf(1, 2, 3), 0))
        assertEquals(emptyList<Int>(), lodash.drop(listOf(1, 2, 3), 5))
        assertEquals(listOf(1, 2, 3), lodash.drop(listOf(1, 2, 3), -1))
        assertEquals(listOf(3), lodash.drop(listOf(1, 2, 3), 2))
    }

    @Test
    fun dropRight() {
        assertEquals(listOf(1, 2), lodash.dropRight(listOf(1, 2, 3), 1))
        assertEquals(listOf(1, 2, 3), lodash.dropRight(listOf(1, 2, 3), 0))
        assertEquals(emptyList<Int>(), lodash.dropRight(listOf(1, 2, 3), 5))
        assertEquals(listOf(1, 2, 3), lodash.dropRight(listOf(1, 2, 3), -1))
        assertEquals(listOf(1), lodash.dropRight(listOf(1, 2, 3), 2))
    }

    @Test
    fun dropWhile() {
        assertEquals(listOf(3, 4), lodash.dropWhile(listOf(1, 2, 3, 4), { x -> x < 3 }))
        assertEquals(listOf(1, 2, 3, 4), lodash.dropWhile(listOf(1, 2, 3, 4), { x -> false }))
        assertEquals(emptyList<Int>(), lodash.dropWhile(listOf(1, 2, 3, 4), { x -> true }))
    }

    @Test
    fun dropRightWhile() {
        assertEquals(listOf(1, 2), lodash.dropRightWhile(listOf(1, 2, 3, 4), { x -> x > 2 }))
        assertEquals(listOf(1, 2, 3, 4), lodash.dropRightWhile(listOf(1, 2, 3, 4), { x -> false }))
        assertEquals(emptyList<Int>(), lodash.dropRightWhile(listOf(1, 2, 3, 4), { x -> true }))
    }

    @Test
    fun fill() {
        assertEquals(mutableListOf(0, 0, 0), lodash.fill(mutableListOf(1, 2, 3), 0))
        assertEquals(mutableListOf(1, 0, 0), lodash.fill(mutableListOf(1, 2, 3), 0, 1))
        assertEquals(mutableListOf(1, 0, 3), lodash.fill(mutableListOf(1, 2, 3), 0, 1, 2))
        assertEquals(mutableListOf(0, 0, 3), lodash.fill(mutableListOf(1, 2, 3), 0, -1, 2))
        assertEquals(mutableListOf("x", "x"), lodash.fill(mutableListOf("a", "b"), "x"))
    }

    @Test
    fun findIndex() {
        assertEquals(1, lodash.findIndex(listOf(1, 2, 3), { x -> x == 2 }))
        assertEquals(-1, lodash.findIndex(listOf(1, 2, 3), { x -> x == 4 }))
        assertEquals(0, lodash.findIndex(listOf(1, 2, 3), { x -> x == 1 }))
    }

    @Test
    fun findLastIndex() {
        assertEquals(2, lodash.findLastIndex(listOf(1, 2, 3), { x -> x == 3 }))
        assertEquals(-1, lodash.findLastIndex(listOf(1, 2, 3), { x -> x == 4 }))
        assertEquals(2, lodash.findLastIndex(listOf(1, 2, 2), { x -> x == 2 }))
    }

    @Test
    fun flatten() {
        assertEquals(listOf(1, 2, 3), lodash.flatten(listOf<Any?>(listOf(1, 2), listOf(3))))
        assertEquals(listOf(1, 2, 3, 4), lodash.flatten(listOf<Any?>(listOf(1, 2, 3, 4))))
        assertEquals(listOf(1, 2), lodash.flatten(listOf<Any?>(1, listOf(2))))
        assertEquals(emptyList<Any?>(), lodash.flatten(emptyList<Any?>()))
    }

    @Test
    fun flattenDeep() {
        assertEquals(listOf(1, 2, 3, 4), lodash.flattenDeep(listOf<Any?>(listOf(1, listOf(2, listOf(3, 4))))))
        assertEquals(listOf(1, 2, 3), lodash.flattenDeep(listOf<Any?>(listOf(1, 2, 3))))
        assertEquals(listOf(1), lodash.flattenDeep(listOf<Any?>(1)))
        assertEquals(emptyList<Any?>(), lodash.flattenDeep(emptyList<Any?>()))
    }

    @Test
    fun flattenDepth() {
        assertEquals(listOf(1, listOf(2)), lodash.flattenDepth(listOf<Any?>(listOf(1, listOf(2))), 1))
        assertEquals(listOf(1, 2), lodash.flattenDepth(listOf<Any?>(listOf(1, listOf(2))), 2))
        assertEquals(listOf<Any?>(listOf(1, 2)), lodash.flattenDepth(listOf<Any?>(listOf(1, 2)), 0))
        assertEquals(emptyList<Any?>(), lodash.flattenDepth(emptyList<Any?>(), 2))
    }

    @Test
    fun fromPairs() {
        assertEquals(mapOf("a" to 1, "b" to 2), lodash.fromPairs(listOf("a" to 1, "b" to 2)))
        assertEquals(emptyMap<String, Int>(), lodash.fromPairs(emptyList<Pair<String, Int>>()))
    }

    @Test
    fun head() {
        assertEquals(1, lodash.head(listOf(1, 2, 3)))
        assertNull(lodash.head(emptyList<Int>()))
        assertEquals("a", lodash.head(listOf("a", "b")))
    }

    @Test
    fun indexOf() {
        assertEquals(1, lodash.indexOf(listOf(1, 2, 3), 2))
        assertEquals(-1, lodash.indexOf(listOf(1, 2, 3), 4))
        assertEquals(2, lodash.indexOf(listOf(1, 2, 3), 3, 1))
        assertEquals(-1, lodash.indexOf(listOf(1, 2, 3), 1, 5))
        assertEquals(-1, lodash.indexOf(emptyList<Int>(), 1))
    }

    @Test
    fun initial() {
        assertEquals(listOf(1, 2), lodash.initial(listOf(1, 2, 3)))
        assertEquals(emptyList<Int>(), lodash.initial(listOf(1)))
        assertEquals(emptyList<Int>(), lodash.initial(emptyList<Int>()))
    }

    @Test
    fun intersection() {
        assertEquals(listOf(2), lodash.intersection(listOf(1, 2), listOf(2, 3)))
        assertEquals(emptyList<Int>(), lodash.intersection(listOf(1, 2), listOf(3, 4)))
        assertEquals(emptyList<Nothing>(), lodash.intersection<Nothing>())
        assertEquals(listOf(1), lodash.intersection(listOf(1, 2), listOf(1, 3), listOf(1, 4)))
    }

    @Test
    fun join() {
        assertEquals("1,2,3", lodash.join(listOf(1, 2, 3)))
        assertEquals("1-2-3", lodash.join(listOf(1, 2, 3), "-"))
        assertEquals("", lodash.join(emptyList<Int>()))
    }

    @Test
    fun last() {
        assertEquals(3, lodash.last(listOf(1, 2, 3)))
        assertNull(lodash.last(emptyList<Int>()))
        assertEquals("b", lodash.last(listOf("a", "b")))
    }

    @Test
    fun lastIndexOf() {
        assertEquals(2, lodash.lastIndexOf(listOf(1, 2, 3), 3))
        assertEquals(-1, lodash.lastIndexOf(emptyList<Int>(), 1))
        assertEquals(0, lodash.lastIndexOf(listOf(1, 2, 1), 1, 1))
        assertEquals(2, lodash.lastIndexOf(listOf(1, 2, 1), 1))
    }

    @Test
    fun nth() {
        assertEquals(2, lodash.nth(listOf(1, 2, 3), 1))
        assertEquals(3, lodash.nth(listOf(1, 2, 3), -1))
        assertEquals(1, lodash.nth(listOf(1, 2, 3), -3))
        assertNull(lodash.nth(listOf(1, 2, 3), 5))
        assertNull(lodash.nth(listOf(1, 2, 3), -5))
        assertEquals(1, lodash.nth(listOf(1, 2, 3)))
    }

    @Test
    fun pull() {
        assertEquals(mutableListOf(1, 3), lodash.pull(mutableListOf(1, 2, 3), 2))
        assertEquals(mutableListOf(1), lodash.pull(mutableListOf(1, 2, 3), 2, 3))
        assertEquals(mutableListOf(1, 2, 3), lodash.pull(mutableListOf(1, 2, 3)))
    }

    @Test
    fun pullAll() {
        assertEquals(mutableListOf(1, 3), lodash.pullAll(mutableListOf(1, 2, 3), listOf(2)))
        assertEquals(mutableListOf(1), lodash.pullAll(mutableListOf(1, 2, 3), listOf(2, 3)))
        assertEquals(mutableListOf(1, 2, 3), lodash.pullAll(mutableListOf(1, 2, 3), emptyList<Int>()))
    }

    @Test
    fun reverse() {
        assertEquals(mutableListOf(3, 2, 1), lodash.reverse(mutableListOf(1, 2, 3)))
        assertEquals(mutableListOf<Int>(), lodash.reverse(mutableListOf<Int>()))
        assertEquals(mutableListOf(1), lodash.reverse(mutableListOf(1)))
    }

    @Test
    fun slice() {
        assertEquals(listOf(2, 3), lodash.slice(listOf(1, 2, 3, 4), 1, 3))
        assertEquals(listOf(1, 2), lodash.slice(listOf(1, 2, 3), 0, 2))
        assertEquals(emptyList<Int>(), lodash.slice(listOf(1, 2, 3), 2, 1))
        assertEquals(listOf(1, 2, 3), lodash.slice(listOf(1, 2, 3)))
    }

    @Test
    fun tail() {
        assertEquals(listOf(2, 3), lodash.tail(listOf(1, 2, 3)))
        assertEquals(emptyList<Int>(), lodash.tail(listOf(1)))
        assertEquals(emptyList<Int>(), lodash.tail(emptyList<Int>()))
    }

    @Test
    fun take() {
        assertEquals(listOf(1), lodash.take(listOf(1, 2, 3), 1))
        assertEquals(emptyList<Int>(), lodash.take(listOf(1, 2, 3), 0))
        assertEquals(listOf(1, 2, 3), lodash.take(listOf(1, 2, 3), 5))
        assertEquals(emptyList<Int>(), lodash.take(listOf(1, 2, 3), -1))
    }

    @Test
    fun takeRight() {
        assertEquals(listOf(3), lodash.takeRight(listOf(1, 2, 3), 1))
        assertEquals(emptyList<Int>(), lodash.takeRight(listOf(1, 2, 3), 0))
        assertEquals(listOf(1, 2, 3), lodash.takeRight(listOf(1, 2, 3), 5))
        assertEquals(emptyList<Int>(), lodash.takeRight(listOf(1, 2, 3), -1))
    }

    @Test
    fun union() {
        assertEquals(listOf(1, 2, 3), lodash.union(listOf(1, 2), listOf(2, 3)))
        assertEquals(listOf(1, 2), lodash.union(listOf(1, 2)))
        assertEquals(emptyList<Nothing>(), lodash.union<Nothing>())
    }

    @Test
    fun uniq() {
        assertEquals(listOf(1, 2, 3), lodash.uniq(listOf(1, 2, 1, 3, 2)))
        assertEquals(emptyList<Int>(), lodash.uniq(emptyList<Int>()))
        assertEquals(listOf("a", "b"), lodash.uniq(listOf("a", "b", "a")))
    }

    @Test
    fun uniqBy() {
        assertEquals(listOf(1, 2), lodash.uniqBy(listOf(1, 2, 3), { x -> x % 2 }))
        assertEquals(listOf("a", "bb"), lodash.uniqBy(listOf("a", "b", "bb"), { x -> x.length }))
    }

    @Test
    fun unzip() {
        assertEquals(listOf(listOf(1, 2), listOf(3, 4)), lodash.unzip(listOf(listOf(1, 3), listOf(2, 4))))
        assertEquals(emptyList<List<Nothing?>>(), lodash.unzip(emptyList<List<Nothing?>>()))
        assertEquals(listOf(listOf(1), listOf(2)), lodash.unzip(listOf(listOf(1, 2))))
    }

    @Test
    fun without() {
        assertEquals(listOf(1, 3), lodash.without(listOf(1, 2, 3), 2))
        assertEquals(listOf(1, 2, 3), lodash.without(listOf(1, 2, 3)))
        assertEquals(emptyList<Int>(), lodash.without(listOf(1, 2), 1, 2))
    }

    @Test
    fun xor() {
        assertEquals(listOf(1, 4), lodash.xor(listOf(1, 2), listOf(2, 3), listOf(3, 4)))
        assertEquals(listOf(1), lodash.xor(listOf(1, 2), listOf(2)))
        assertEquals(emptyList<Nothing>(), lodash.xor<Nothing>())
        assertEquals(listOf(1), lodash.xor(listOf(1)))
    }

    @Test
    fun zip() {
        assertEquals(listOf(listOf(1, "a"), listOf(2, "b")), lodash.zip(listOf(1, 2), listOf("a", "b")))
        assertEquals(emptyList<List<Nothing?>>(), lodash.zip<Nothing>())
        assertEquals(listOf(listOf(1, "a"), listOf(2, null)), lodash.zip(listOf(1, 2), listOf("a")))
    }

    @Test
    fun zipObject() {
        assertEquals(mapOf("a" to 1, "b" to 2), lodash.zipObject(listOf("a", "b"), listOf(1, 2)))
        assertEquals(mapOf("a" to 1, "b" to null), lodash.zipObject(listOf("a", "b"), listOf(1)))
        assertEquals(emptyMap<String, Nothing?>(), lodash.zipObject(emptyList<String>(), emptyList<Nothing>()))
    }
}
