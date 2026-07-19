package io.github.hieudoanm.kevin.server

import io.github.hieudoanm.kevin.db.Db
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertNull

/** Expiry-related commands: `SET ... EX`, `EXPIRE` and `TTL`. */
class HandlerExpiryTest {
    private var clock = 0L
    private val db = Db { clock }

    private fun run(line: String) = handleLine(line, db)

    @Test
    fun `expire sets and reports a lifetime`() {
        run("SET a 1")
        assertEquals(Reply("1\n", true), run("EXPIRE a 30"))
        assertEquals(30, db.ttl("a").remaining.inWholeSeconds)
    }

    @Test
    fun `expire on a missing key replies zero`() {
        assertEquals(Reply("0\n", true), run("EXPIRE ghost 30"))
    }

    @Test
    fun `expire validates its arguments`() {
        assertEquals(Reply("ERR usage: EXPIRE key seconds\n", true), run("EXPIRE a"))
        assertEquals(Reply("ERR invalid expire time\n", true), run("EXPIRE a 0"))
        assertEquals(Reply("ERR invalid expire time\n", true), run("EXPIRE a later"))
    }

    @Test
    fun `ttl rounds a live lifetime up`() {
        run("SET a 1")
        run("EXPIRE a 30")
        clock += 500
        assertEquals(Reply("30\n", true), run("TTL a"))
    }

    @Test
    fun `ttl replies minus one for a persistent key`() {
        run("SET a 1")
        assertEquals(Reply("-1\n", true), run("TTL a"))
    }

    @Test
    fun `ttl replies minus two for a missing or expired key`() {
        assertEquals(Reply("-2\n", true), run("TTL ghost"))
        run("SET a 1")
        run("EXPIRE a 5")
        clock += 5_000
        assertEquals(Reply("-2\n", true), run("TTL a"))
    }

    @Test
    fun `ttl with extra arguments reports usage`() {
        assertEquals(Reply("ERR usage: TTL key\n", true), run("TTL a b"))
    }
}
