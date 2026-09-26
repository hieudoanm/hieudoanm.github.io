package io.github.hieudoanm.kevin.server

import io.github.hieudoanm.kevin.db.Db
import java.net.InetSocketAddress
import java.net.ServerSocket
import java.net.Socket
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertTrue

class ServerTest {
    private val db = Db()
    private val socket = ServerSocket().apply {
        reuseAddress = true
        bind(InetSocketAddress("127.0.0.1", 0))
    }
    private val server = Server(db, socket)

    private fun withServer(block: (Socket) -> Unit) {
        val thread = Thread { server.serve() }.apply { isDaemon = true }
        thread.start()
        try {
            block(Socket("127.0.0.1", socket.localPort))
        } finally {
            server.shutdown()
            thread.join(2_000)
        }
    }

    private fun Socket.commands(vararg lines: String): List<String> {
        getOutputStream().bufferedWriter().use { it.write(lines.joinToString("\r\n", postfix = "\r\n")) }
        return getInputStream().bufferedReader().use { reader -> lines.indices.map { reader.readLine() ?: "" } }
    }

    @Test
    fun `serves commands over tcp`() {
        withServer { socket ->
            assertEquals(listOf("OK", "kevin", "1"), socket.commands("SET name kevin", "GET name", "EXISTS name"))
        }
    }

    @Test
    fun `blank lines are skipped without a response`() {
        withServer { socket ->
            assertEquals(listOf("PONG"), socket.commands("", "PING"))
        }
    }

    @Test
    fun `multiple clients share the same store`() {
        withServer { first ->
            first.commands("SET shared 1")
            Socket("127.0.0.1", socket.localPort).use { second ->
                assertEquals(listOf("1"), second.commands("GET shared"))
            }
        }
    }

    @Test
    fun `protocol errors are reported to the client`() {
        withServer { socket ->
            assertEquals(listOf("ERR unknown command"), socket.commands("NOPE"))
        }
    }

    @Test
    fun `shutdown stops the server`() {
        val thread = Thread { server.serve() }.apply { isDaemon = true }
        thread.start()
        assertTrue(socket.isBound)
        server.shutdown()
        thread.join(2_000)
        assertTrue(!thread.isAlive)
    }
}
