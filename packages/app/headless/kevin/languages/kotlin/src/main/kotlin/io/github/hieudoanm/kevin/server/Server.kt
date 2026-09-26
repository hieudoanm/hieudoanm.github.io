package io.github.hieudoanm.kevin.server

import io.github.hieudoanm.kevin.db.Db
import java.io.IOException
import java.net.ServerSocket
import java.net.Socket
import java.util.concurrent.atomic.AtomicBoolean
import java.util.logging.Level
import java.util.logging.Logger

/** Serves the Redis-style protocol over TCP on a bound [socket]. */
class Server(
    private val kv: Db,
    private val socket: ServerSocket,
    private val logger: Logger = Logger.getLogger(Server::class.java.name),
) {
    private val running = AtomicBoolean(true)

    /** Accepts connections until [shutdown] is called, handling each in its own thread. */
    fun serve() {
        val address = socket.localSocketAddress
        logger.log(Level.INFO, "server listening on $address")
        while (running.get()) {
            val connection = accept()
            if (connection != null) startConnectionThread(connection)
        }
        logger.log(Level.INFO, "server stopped ($address)")
    }

    /** Stops accepting and closes the listening socket. */
    fun shutdown() {
        running.set(false)
        runCatching { socket.close() }
    }

    private fun accept(): Socket? = try {
        socket.accept()
    } catch (error: IOException) {
        if (running.get()) logger.log(Level.WARNING, "accept failed: ${error.message}")
        null
    }

    private fun startConnectionThread(connection: Socket) {
        logger.log(Level.INFO, "connection opened from ${connection.remoteSocketAddress}")
        Thread({ handleConnection(connection) }, "kevin-conn").apply { isDaemon = true }.start()
    }

    private fun handleConnection(connection: Socket) {
        try {
            val reader = connection.getInputStream().bufferedReader()
            val writer = connection.getOutputStream().bufferedWriter()
            while (true) {
                val line = reader.readLine() ?: break
                val reply = handleLine(line, kv)
                if (!reply.shouldReply) continue
                writer.write(reply.response)
                writer.flush()
            }
        } catch (error: IOException) {
            logger.log(Level.FINE, "connection error: ${error.message}")
        } finally {
            runCatching { connection.close() }
        }
    }
}
