package io.github.hieudoanm.kevin.server

import io.github.hieudoanm.kevin.db.Db
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertFalse
import kotlin.test.assertNull
import kotlin.test.assertTrue

class HandlerTest {
    private var clock = 0L
    private val db = Db { clock }

    private fun run(line: String) = handleLine(line, db)

    @Test
    fun `ping replies pong`() {
        assertEquals(Reply("PONG\n", true), run("PING"))
    }

    @Test
    fun `commands are case insensitive`() {
        assertEquals(Reply("PONG\n", true), run("ping"))
        assertEquals(Reply("OK\n", true), run("sEt Foo Bar"))
        assertEquals(Reply("Bar\n", true), run("get foo"))
    }

    @Test
    fun `blank lines produce no reply`() {
        assertFalse(run("").shouldReply)
        assertFalse(run("   ").shouldReply)
        assertFalse(run("\r\n").shouldReply)
    }

    @Test
    fun `trailing carriage returns are trimmed`() {
        assertEquals(Reply("PONG\n", true), run("PING\r\n"))
    }

    @Test
    fun `unknown commands report an error`() {
        assertEquals(Reply("ERR unknown command\n", true), run("FROBNICATE"))
    }

    @Test
    fun `set and get a value`() {
        assertEquals(Reply("OK\n", true), run("SET name kevin"))
        assertEquals(Reply("kevin\n", true), run("GET name"))
    }

    @Test
    fun `set keeps embedded spaces in the value`() {
        run("SET greeting hello there world")
        assertEquals("hello there world", db.get("greeting"))
    }

    @Test
    fun `set without a value reports usage`() {
        assertEquals(Reply("ERR usage: SET key value [EX seconds]\n", true), run("SET"))
        assertEquals(Reply("ERR usage: SET key value [EX seconds]\n", true), run("SET onlykey"))
    }

    @Test
    fun `set with a valid ex stores a value without the suffix`() {
        assertEquals(Reply("OK\n", true), run("SET temp value EX 30"))
        assertEquals("value", db.get("temp"))
        assertEquals(30, db.ttl("temp").remaining.inWholeSeconds)
    }

    @Test
    fun `set with a non-positive or invalid ex reports an error`() {
        assertEquals(Reply("ERR invalid expire time\n", true), run("SET a b EX 0"))
        assertEquals(Reply("ERR invalid expire time\n", true), run("SET a b EX -5"))
        assertEquals(Reply("ERR invalid expire time\n", true), run("SET a b EX soon"))
        assertNull(db.get("a"))
    }

    @Test
    fun `get on a missing key replies nil`() {
        assertEquals(Reply("(nil)\n", true), run("GET ghost"))
    }

    @Test
    fun `get with extra arguments reports usage`() {
        assertEquals(Reply("ERR usage: GET key\n", true), run("GET a b"))
    }

    @Test
    fun `del removes a single key and counts it`() {
        run("SET a 1")
        assertEquals(Reply("1\n", true), run("DEL a"))
        assertEquals(Reply("0\n", true), run("DEL a"))
    }

    @Test
    fun `del accepts several keys`() {
        run("SET a 1")
        run("SET b 2")
        assertEquals(Reply("2\n", true), run("DEL a b"))
    }

    @Test
    fun `del without arguments reports usage`() {
        assertEquals(Reply("ERR usage: DEL key [key ...]\n", true), run("DEL"))
    }

    @Test
    fun `keys lists keys space separated`() {
        run("SET a 1")
        run("SET b 2")
        assertEquals(Reply("a b\n", true), run("KEYS"))
    }

    @Test
    fun `exists reports presence`() {
        run("SET a 1")
        assertEquals(Reply("1\n", true), run("EXISTS a"))
        assertEquals(Reply("0\n", true), run("EXISTS b"))
    }

    @Test
    fun `exists with extra arguments reports usage`() {
        assertEquals(Reply("ERR usage: EXISTS key\n", true), run("EXISTS a b"))
    }

    @Test
    fun `len reports the key count`() {
        run("SET a 1")
        run("SET b 2")
        assertEquals(Reply("2\n", true), run("LEN"))
    }

    @Test
    fun `len with arguments reports usage`() {
        assertEquals(Reply("ERR usage: LEN\n", true), run("LEN now"))
    }

    @Test
    fun `flushall and flushdb empty the store`() {
        run("SET a 1")
        assertEquals(Reply("OK\n", true), run("FLUSHALL"))
        assertEquals(Reply("0\n", true), run("LEN"))
        run("SET b 2")
        assertEquals(Reply("OK\n", true), run("FLUSHDB"))
        assertEquals(Reply("0\n", true), run("LEN"))
    }

    @Test
    fun `flush with arguments reports usage`() {
        assertEquals(Reply("ERR usage: FLUSHALL\n", true), run("FLUSHALL now"))
    }

    @Test
    fun `commands share one store across connections`() {
        run("SET shared 1")
        assertEquals(Reply("1\n", true), handleLine("EXISTS shared", db))
        assertTrue(db.exists("shared"))
    }
}
