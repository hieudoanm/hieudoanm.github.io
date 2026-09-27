package io.github.hieudoanm.kevin.server

import io.github.hieudoanm.kevin.db.Db
import java.net.InetSocketAddress
import java.net.ServerSocket
import java.net.Socket
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertTrue

/**
 * Each test gets its own server, because `shutdown` closes the listening
 * socket and a shared instance would leave later tests talking to a dead port.
 */
class ServerTest {

    private fun withServer(block: (Int) -> Unit) {
        val socket = ServerSocket().apply {
            reuseAddress = true
            bind(InetSocketAddress("127.0.0.1", 0))
        }
        val server = Server(Db(), socket)
        val thread = Thread { server.serve() }.apply { isDaemon = true }
        thread.start()
        try {
            block(socket.localPort)
        } finally {
            server.shutdown()
            thread.join(2_000)
        }
    }

    /**
     * Sends [lines] and reads exactly [replies] lines, because blank lines are
     * skipped and produce no response.
     */
    private fun commands(port: Int, replies: Int, vararg lines: String): List<String> =
        Socket("127.0.0.1", port).use { socket ->
            // Flush, never close: closing the output stream would shut the socket
            // down before the replies arrive.
            val writer = socket.getOutputStream().bufferedWriter()
            writer.write(lines.joinToString("\r\n", postfix = "\r\n"))
            writer.flush()
            socket.getInputStream().bufferedReader().use { reader ->
                (0 until replies).map { reader.readLine() ?: "" }
            }
        }

    @Test
    fun `serves commands over tcp`() {
        withServer { port ->
            assertEquals(
                listOf("OK", "kevin", "1"),
                commands(port, 3, "SET name kevin", "GET name", "EXISTS name"),
            )
        }
    }

    @Test
    fun `blank lines are skipped without a response`() {
        withServer { port ->
            assertEquals(listOf("PONG"), commands(port, 1, "", "PING"))
        }
    }

    @Test
    fun `multiple clients share the same store`() {
        withServer { port ->
            assertEquals(listOf("OK"), commands(port, 1, "SET shared 1"))
            assertEquals(listOf("1"), commands(port, 1, "GET shared"))
        }
    }

    @Test
    fun `protocol errors are reported to the client`() {
        withServer { port ->
            assertEquals(listOf("ERR unknown command"), commands(port, 1, "NOPE"))
        }
    }

    @Test
    fun `shutdown stops the server`() {
        val socket = ServerSocket().apply {
            reuseAddress = true
            bind(InetSocketAddress("127.0.0.1", 0))
        }
        val server = Server(Db(), socket)
        val thread = Thread { server.serve() }.apply { isDaemon = true }
        thread.start()
        assertTrue(socket.isBound)
        server.shutdown()
        thread.join(2_000)
        assertTrue(!thread.isAlive)
    }
}
