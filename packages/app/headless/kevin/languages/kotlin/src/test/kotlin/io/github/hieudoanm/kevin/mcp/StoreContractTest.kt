package io.github.hieudoanm.kevin.mcp

import io.github.hieudoanm.kevin.db.Db
import io.github.hieudoanm.kevin.server.Server
import java.net.ServerSocket
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertFailsWith
import kotlin.test.assertFalse
import kotlin.test.assertTrue

/** The resources one store backend needs, released after each test. */
private class Harness private constructor(
    private val store: Store,
    private val socket: ServerSocket?,
    private val thread: Thread?,
) : AutoCloseable {
    fun store(): Store = store

    override fun close() {
        store.close()
        socket?.close()
        thread?.interrupt()
    }

    companion object {
        fun embedded(): Harness = Harness(DbStore(Db()), null, null)

        fun tcp(): Harness {
            val socket = ServerSocket(0)
            val server = Server(Db(), socket)
            val thread = Thread { server.serve() }.apply {
                isDaemon = true
                start()
            }
            return Harness(TcpStore("127.0.0.1:${socket.localPort}"), socket, thread)
        }
    }
}

/**
 * The contract every backend must satisfy, exercised against the in-process
 * store and the TCP proxy alike.
 */
class StoreContractTest {

    @Test
    fun `the in-process store satisfies the contract`() = contract(Harness.embedded())

    @Test
    fun `the tcp store satisfies the contract`() = contract(Harness.tcp())

    private fun contract(harness: Harness) = harness.use {
        val store = harness.store()
        store.ping()

        store.set("a", "one", 0)
        assertEquals("one" to true, store.get("a"))
        assertTrue(store.exists("a"))
        assertEquals(listOf("a"), store.keys())
        assertEquals(1, store.len())

        assertEquals(-1, store.ttl("a").first)
        assertEquals(TtlState.NoExpiry, store.ttl("a").second)

        assertEquals(0, store.del(listOf("missing")))
        assertEquals(1, store.del(listOf("a")))
        assertEquals("" to false, store.get("a"))
        assertFalse(store.exists("a"))
        assertEquals(0, store.len())
    }

    @Test
    fun `ttl reports a live key as expiring`() {
        Harness.embedded().use { harness ->
            val store = harness.store()
            store.set("k", "v", 60)
            val (seconds, state) = store.ttl("k")
            assertEquals(TtlState.Expiring, state)
            assertTrue(seconds in 1..60, "expected 1..60 seconds, got $seconds")
        }
    }

    @Test
    fun `ttl reports an absent key as missing`() {
        Harness.embedded().use { harness ->
            val (seconds, state) = harness.store().ttl("nope")
            assertEquals(TtlState.Missing, state)
            assertEquals(-2, seconds)
        }
    }

    @Test
    fun `expire only succeeds for a present key`() {
        Harness.embedded().use { harness ->
            val store = harness.store()
            assertFalse(store.expire("nope", 30))
            store.set("k", "v", 0)
            assertTrue(store.expire("k", 30))
        }
    }

    @Test
    fun `flush removes every key and reports the count`() {
        Harness.embedded().use { harness ->
            val store = harness.store()
            store.set("a", "1", 0)
            store.set("b", "2", 0)
            assertEquals(2, store.flush())
            assertEquals(0, store.len())
        }
    }

    @Test
    fun `a proxied value containing ex is stored whole`() {
        Harness.tcp().use { harness ->
            val store = harness.store()
            store.set("k", "prefix-EX-suffix", 0)
            assertEquals("prefix-EX-suffix" to true, store.get("k"))
        }
    }

    @Test
    fun `the proxy rejects a token the protocol cannot carry`() {
        Harness.tcp().use { harness ->
            val store = harness.store()
            val failure = assertFailsWith<StoreException> { store.set("a key", "v", 0) }
            assertTrue(
                failure.message!!.contains("must not contain spaces or newlines"),
                "got ${failure.message}",
            )
        }
    }

    @Test
    fun `the proxy surfaces a server-side error`() {
        Harness.tcp().use { harness ->
            val failure = assertFailsWith<StoreException> { harness.store().expire("k", -5) }
            assertTrue(failure.message!!.contains("ERR invalid expire time"), "got ${failure.message}")
        }
    }
}
