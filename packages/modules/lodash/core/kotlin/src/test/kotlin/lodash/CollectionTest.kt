package lodash.test

import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertFalse
import org.junit.jupiter.api.Assertions.assertNotNull
import org.junit.jupiter.api.Assertions.assertTrue
import org.junit.jupiter.api.Test

class CollectionTest {

    @Test
    fun countBy() {
        assertEquals(mapOf(1 to 2, 2 to 1), lodash.countBy(listOf(1.1, 1.2, 2.3), { x -> x.toInt() }))
        assertEquals(emptyMap<Int, Int>(), lodash.countBy(emptyList<Int>(), { x -> x }))
    }

    @Test
    fun every() {
        assertTrue(lodash.every(listOf(2, 4, 6), { x -> x % 2 == 0 }))
        assertFalse(lodash.every(listOf(2, 3, 4), { x -> x % 2 == 0 }))
        assertTrue(lodash.every(emptyList<Int>(), { x -> false }))
    }

    @Test
    fun filter() {
        assertEquals(listOf(2, 4), lodash.filter(listOf(1, 2, 3, 4), { x -> x % 2 == 0 }))
        assertEquals(emptyList<Int>(), lodash.filter(listOf(1, 3, 5), { x -> x % 2 == 0 }))
        assertEquals(emptyList<Int>(), lodash.filter(emptyList<Int>(), { x -> true }))
    }

    @Test
    fun find() {
        assertEquals(2, lodash.find(listOf(1, 2, 3), { x -> x % 2 == 0 }))
        assertEquals(null, lodash.find(listOf(1, 3, 5), { x -> x % 2 == 0 }))
        assertEquals(null, lodash.find(emptyList<Int>(), { x -> true }))
    }

    @Test
    fun findLast() {
        assertEquals(4, lodash.findLast(listOf(1, 2, 3, 4), { x -> x % 2 == 0 }))
        assertEquals(null, lodash.findLast(listOf(1, 3, 5), { x -> x % 2 == 0 }))
    }

    @Test
    fun flatMap() {
        assertEquals(listOf(1, 2, 2, 3, 3, 4), lodash.flatMap(listOf(1, 2, 3), { x -> listOf(x, x + 1) }))
        assertEquals(emptyList<Int>(), lodash.flatMap(emptyList<Int>(), { x -> listOf(x) }))
    }

    @Test
    fun forEach() {
        val result = mutableListOf<Int>()
        lodash.forEach(listOf(1, 2, 3), { x -> result.add(x) })
        assertEquals(listOf(1, 2, 3), result)
    }

    @Test
    fun forEachRight() {
        val result = mutableListOf<Int>()
        lodash.forEachRight(listOf(1, 2, 3), { x -> result.add(x) })
        assertEquals(listOf(3, 2, 1), result)
        lodash.forEachRight(emptyList<Int>(), { x -> result.add(x) })
    }

    @Test
    fun groupBy() {
        assertEquals(mapOf(1 to listOf(1.1, 1.2), 2 to listOf(2.3)), lodash.groupBy(listOf(1.1, 1.2, 2.3), { x -> x.toInt() }))
        assertEquals(emptyMap<Int, List<Double>>(), lodash.groupBy(emptyList<Double>(), { x -> x.toInt() }))
    }

    @Test
    fun includes() {
        assertTrue(lodash.includes(listOf(1, 2, 3), 2))
        assertFalse(lodash.includes(listOf(1, 2, 3), 4))
        assertFalse(lodash.includes(emptyList<Int>(), 1))
    }

    @Test
    fun keyBy() {
        assertEquals(mapOf(1 to 1.2, 2 to 2.3), lodash.keyBy(listOf(1.1, 1.2, 2.3), { x -> x.toInt() }))
        assertEquals(emptyMap<Int, Double>(), lodash.keyBy(emptyList<Double>(), { x -> x.toInt() }))
    }

    @Test
    fun mapTest() {
        assertEquals(listOf(2, 4, 6), lodash.map(listOf(1, 2, 3), { x -> x * 2 }))
        assertEquals(emptyList<Int>(), lodash.map(emptyList<Int>(), { x -> x * 2 }))
    }

    @Test
    fun partition() {
        val evensAndOdds = lodash.partition(listOf(1, 2, 3, 4), { x -> x % 2 == 0 })
        assertEquals(listOf(2, 4), evensAndOdds.first)
        assertEquals(listOf(1, 3), evensAndOdds.second)
        val allAndNone = lodash.partition(listOf(1, 2, 3), { x -> true })
        assertEquals(listOf(1, 2, 3), allAndNone.first)
        assertEquals(emptyList<Int>(), allAndNone.second)
    }

    @Test
    fun reduce() {
        assertEquals(6, lodash.reduce(listOf(1, 2, 3), { acc, x -> acc + x }, 0))
        assertEquals(0, lodash.reduce(emptyList<Int>(), { acc, x -> acc + x }, 0))
    }

    @Test
    fun reduceRight() {
        assertEquals("cba", lodash.reduceRight(listOf("a", "b", "c"), { acc, s -> acc + s }, ""))
        assertEquals("", lodash.reduceRight(emptyList<String>(), { acc, s -> acc + s }, ""))
    }

    @Test
    fun reject() {
        assertEquals(listOf(1, 3), lodash.reject(listOf(1, 2, 3, 4), { x -> x % 2 == 0 }))
        assertEquals(emptyList<Int>(), lodash.reject(listOf(1, 2, 3), { x -> true }))
        assertEquals(listOf(1, 2, 3), lodash.reject(listOf(1, 2, 3), { x -> false }))
    }

    @Test
    fun sample() {
        val list = listOf(1, 2, 3, 4, 5)
        val s = lodash.sample(list)
        assertNotNull(s)
        assertTrue(s in list)
        assertEquals(null, lodash.sample(emptyList<Int>()))
    }

    @Test
    fun sampleSize() {
        val list = listOf(1, 2, 3, 4, 5)
        val result = lodash.sampleSize(list, 3)
        assertEquals(3, result.size)
        assertTrue(result.all { it in list })
        assertEquals(emptyList<Int>(), lodash.sampleSize(list, 0))
        assertEquals(list.sorted(), lodash.sampleSize(list, 10).sorted())
    }

    @Test
    fun shuffle() {
        val list = listOf(1, 2, 3, 4, 5)
        val shuffled = lodash.shuffle(list)
        assertEquals(list.sorted(), shuffled.sorted())
        assertEquals(emptyList<Int>(), lodash.shuffle(emptyList<Int>()))
    }

    @Test
    fun size() {
        assertEquals(3, lodash.size(listOf(1, 2, 3)))
        assertEquals(0, lodash.size(emptyList<Int>()))
        assertEquals(3, lodash.size(setOf(1, 2, 3)))
    }

    @Test
    fun some() {
        assertTrue(lodash.some(listOf(1, 2, 3), { x -> x % 2 == 0 }))
        assertFalse(lodash.some(listOf(1, 3, 5), { x -> x % 2 == 0 }))
        assertFalse(lodash.some(emptyList<Int>(), { x -> true }))
    }

    @Test
    fun sortBy() {
        assertEquals(listOf(1, 2, 3, 4, 5), lodash.sortBy(listOf(5, 3, 1, 4, 2), { x -> x }))
        assertEquals(listOf("a", "bb", "ccc"), lodash.sortBy(listOf("ccc", "a", "bb"), { x -> x.length }))
        assertEquals(emptyList<Int>(), lodash.sortBy(emptyList<Int>(), { x -> x }))
    }
}
