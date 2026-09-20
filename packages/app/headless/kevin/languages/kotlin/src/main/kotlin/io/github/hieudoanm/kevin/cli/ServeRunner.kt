package io.github.hieudoanm.kevin.cli

import io.github.hieudoanm.kevin.db.Db
import io.github.hieudoanm.kevin.db.load
import io.github.hieudoanm.kevin.db.save
import io.github.hieudoanm.kevin.server.Server
import java.net.InetSocketAddress
import java.net.ServerSocket
import java.nio.file.Path
import java.util.logging.Level
import java.util.logging.Logger

/** Parsed `kevin serve` options. */
data class ServeConfig(
    val port: Int = 6379,
    val bind: String = "0.0.0.0",
    val data: Path? = null,
    val gui: Boolean = false,
    val tui: Boolean = false,
) {
    val address: String get() = "$bind:$port"
}

/** The running server handed to a manager UI; [port] is the bound port. */
class ServeSession(val kv: Db, val address: String, val port: Int)

/**
 * Starts the TCP server and then the requested manager UI, saving the data file
 * on shutdown. The UI launchers are injected so tests can observe them.
 */
class ServeRunner(
    private val config: ServeConfig,
    private val kv: Db = Db(),
    private val logger: Logger = Logger.getLogger(ServeRunner::class.java.name),
    private val guiLauncher: (ServeSession) -> Unit = { io.github.hieudoanm.kevin.gui.run(it.kv) },
    private val tuiLauncher: (ServeSession) -> Unit = { io.github.hieudoanm.kevin.tui.run(it.kv) },
) {
    fun run() {
        config.data?.let(::loadData)
        val socket = openSocket()
        val server = Server(kv, socket, logger)
        val session = ServeSession(kv, socket.localSocketAddress.toString(), socket.localPort)
        val thread = startServer(server)
        installShutdownHook(server, config.data)
        try {
            if (config.tui) tuiLauncher(session)
            else if (config.gui) guiLauncher(session)
            else thread.join()
        } finally {
            config.data?.let(::saveData)
            server.shutdown()
        }
    }

    private fun loadData(path: Path) = runCatching { kv.load(path) }
        .onFailure { logger.log(Level.WARNING, "could not load data file ($path): ${it.message}") }
        .onSuccess { logger.log(Level.INFO, "loaded data file ($path)") }

    private fun saveData(path: Path) = runCatching { kv.save(path) }
        .onFailure { logger.log(Level.SEVERE, "could not save data file ($path): ${it.message}") }
        .onSuccess { logger.log(Level.INFO, "saved data file ($path)") }

    private fun openSocket(): ServerSocket = ServerSocket().apply {
        reuseAddress = true
        bind(InetSocketAddress(config.bind, config.port))
    }

    private fun startServer(server: Server): Thread = Thread({ server.serve() }, "kevin-server")
        .apply { isDaemon = true }
        .also(Thread::start)

    private fun installShutdownHook(server: Server, path: Path?) {
        val hook = Thread {
            path?.let(::saveData)
            server.shutdown()
        }
        hook.name = "kevin-shutdown"
        Runtime.getRuntime().addShutdownHook(hook)
    }
}
