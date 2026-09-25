package io.github.hieudoanm.kevin.mcp

import io.github.hieudoanm.kevin.db.Db
import io.github.hieudoanm.kevin.db.load
import io.github.hieudoanm.kevin.db.save
import io.github.hieudoanm.kevin.server.Server
import java.net.ServerSocket
import java.nio.file.Files
import java.nio.file.Path
import java.util.logging.Level
import java.util.logging.Logger
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertFailsWith
import kotlin.test.assertTrue

/** How a session picks its backend and what it does with the snapshot. */
class SessionTest {

    private val quiet: Logger = Logger.getLogger("kevin.mcp.test").apply { level = Level.OFF }

    @Test
    fun `an embedded session needs no snapshot`() {
        Session.open(null, null, quiet).use { session ->
            assertEquals("in-process", session.describe())
            session.store.set("k", "v", 0)
            assertEquals("v" to true, session.store.get("k"))
        }
    }

    @Test
    fun `a proxied session reports the address`() {
        val socket = ServerSocket(0)
        val server = Server(Db(), socket)
        val thread = Thread { server.serve() }.apply { isDaemon = true }
        thread.start()
        try {
            val address = "127.0.0.1:${socket.localPort}"
            Session.open(address, null, quiet).use { session ->
                assertEquals("tcp:$address", session.describe())
                session.store.ping()
            }
        } finally {
            server.shutdown()
            thread.join(2_000)
            socket.close()
        }
    }

    @Test
    fun `a data session saves its snapshot when it closes`() {
        val path: Path = Files.createTempFile("kevin-mcp", ".json")
        Session.open(null, path, quiet).use { session ->
            session.store.set("a", "1", 0)
            session.store.set("b", "2", 0)
        }
        assertTrue(Files.size(path) > 0, "expected a written snapshot")
        val restored = Db()
        restored.load(path)
        assertEquals("1", restored.get("a"))
        assertEquals("2", restored.get("b"))
    }

    @Test
    fun `a data session loads an existing snapshot`() {
        val path: Path = Files.createTempFile("kevin-mcp", ".json")
        Db().apply { set("kept", "yes") }.save(path)
        Session.open(null, path, quiet).use { session ->
            assertTrue(session.describe().startsWith("in-process (data "))
            assertEquals("yes" to true, session.store.get("kept"))
        }
    }

    @Test
    fun `a missing snapshot is not an error`() {
        val path = Files.createTempDirectory("kevin-mcp").resolve("absent.json")
        Session.open(null, path, quiet).use { session ->
            assertEquals(0, session.store.len())
        }
    }

    @Test
    fun `an address and a data file are mutually exclusive`() {
        val path: Path = Files.createTempFile("kevin-mcp", ".json")
        val failure = assertFailsWith<IllegalArgumentException> { Session.open("localhost:6379", path, quiet) }
        assertTrue(failure.message!!.contains("mutually exclusive"), "got ${failure.message}")
    }
}
