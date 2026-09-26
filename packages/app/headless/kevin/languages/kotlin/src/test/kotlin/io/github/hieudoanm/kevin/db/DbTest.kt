package io.github.hieudoanm.kevin.db

import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertFalse
import kotlin.test.assertNull
import kotlin.test.assertTrue
import kotlin.time.Duration.Companion.seconds

class DbTest {
    private var clock = 0L
    private val db = Db { clock }

    @Test
    fun `set and get round-trip`() {
        db.set("a", "1")
        assertEquals("1", db.get("a"))
    }

    @Test
    fun `get returns null for missing key`() {
        assertNull(db.get("nope"))
    }

    @Test
    fun `set overwrites the value`() {
        db.set("a", "1")
        db.set("a", "2")
        assertEquals("2", db.get("a"))
    }

    @Test
    fun `set clears an existing expiry`() {
        db.setWithTtl("a", "1", 10.seconds)
        db.set("a", "2")
        clock += 20_000
        assertEquals("2", db.get("a"))
    }

    @Test
    fun `del reports presence and removes the key`() {
        db.set("a", "1")
        assertTrue(db.del("a"))
        assertFalse(db.del("a"))
        assertNull(db.get("a"))
    }

    @Test
    fun `delMultiple counts only the keys that were present`() {
        db.set("a", "1")
        db.set("b", "2")
        assertEquals(1, db.delMultiple(listOf("a", "missing")))
        assertNull(db.get("a"))
        assertEquals("2", db.get("b"))
    }

    @Test
    fun `exists ignores expired keys`() {
        db.setWithTtl("a", "1", 10.seconds)
        assertTrue(db.exists("a"))
        clock += 10_000
        assertFalse(db.exists("a"))
    }

    @Test
    fun `get drops an expired key`() {
        db.setWithTtl("a", "1", 10.seconds)
        clock += 10_000
        assertNull(db.get("a"))
        assertEquals(0, db.len())
    }

    @Test
    fun `len and keys skip expired entries`() {
        db.set("live", "1")
        db.setWithTtl("dying", "2", 10.seconds)
        clock += 10_000
        assertEquals(1, db.len())
        assertEquals(listOf("live"), db.keys())
    }

    @Test
    fun `keys preserves insertion order`() {
        db.set("c", "1")
        db.set("a", "2")
        db.set("b", "3")
        assertEquals(listOf("c", "a", "b"), db.keys())
    }

    @Test
    fun `flush removes everything and reports the count`() {
        db.set("a", "1")
        db.setWithTtl("b", "2", 10.seconds)
        assertEquals(2, db.flush())
        assertEquals(0, db.len())
        assertTrue(db.keys().isEmpty())
    }

    @Test
    fun `expire only applies to existing keys`() {
        assertFalse(db.expire("ghost", 5.seconds))
        db.set("a", "1")
        assertTrue(db.expire("a", 5.seconds))
    }

    @Test
    fun `ttl reports missing, persistent and remaining lifetimes`() {
        db.set("persistent", "1")
        db.setWithTtl("temporary", "2", 30.seconds)
        assertEquals(Ttl(Ttl.MISSING, false), db.ttl("ghost"))
        assertEquals(Ttl(Ttl.PERSISTENT, false), db.ttl("persistent"))
        assertEquals(Ttl(30.seconds, true), db.ttl("temporary"))
    }

    @Test
    fun `ttl removes a key once it expires`() {
        db.setWithTtl("a", "1", 5.seconds)
        clock += 5_000
        assertEquals(Ttl(Ttl.MISSING, false), db.ttl("a"))
        assertNull(db.get("a"))
    }

    @Test
    fun `concurrent writes stay consistent`() {
        val threads = (0 until 8).map { index ->
            Thread { repeat(500) { db.set("key-$index-$it", "value") } }
        }
        threads.forEach(Thread::start)
        threads.forEach(Thread::join)
        assertEquals(8 * 500, db.len())
    }
}
