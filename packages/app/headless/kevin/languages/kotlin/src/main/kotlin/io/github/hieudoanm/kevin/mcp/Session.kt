package io.github.hieudoanm.kevin.mcp

import io.github.hieudoanm.kevin.db.Db
import io.github.hieudoanm.kevin.db.load
import io.github.hieudoanm.kevin.db.save
import java.nio.file.Path
import java.util.logging.Level
import java.util.logging.Logger

/**
 * The store an MCP session operates on, plus the resources it owns.
 *
 * Exactly one backend is created: [TcpStore] when [addr] is set, otherwise an
 * in-process [DbStore] optionally backed by the [data] snapshot.
 */
internal class Session private constructor(
    val store: Store,
    private val kv: Db?,
    private val data: Path?,
    private val logger: Logger,
) : AutoCloseable {

    /** How the store is described in the startup log. */
    fun describe(): String = when {
        store is TcpStore -> "tcp:${store.address}"
        data != null -> "in-process (data $data)"
        else -> "in-process"
    }

    /** Saves the snapshot and releases the store. */
    override fun close() {
        data?.let(::saveSnapshot)
        store.close()
    }

    private fun saveSnapshot(path: Path) = runCatching { kv?.save(path) }
        .onFailure { logger.log(Level.SEVERE, "could not save data file ($path): ${it.message}") }
        .onSuccess { logger.log(Level.INFO, "saved data file ($path)") }

    companion object {
        /**
         * Builds a session. [addr] and [data] are mutually exclusive: a proxied
         * server owns its own persistence.
         */
        fun open(
            addr: String?,
            data: Path?,
            logger: Logger = Logger.getLogger(Session::class.java.name),
        ): Session {
            require(addr == null || data == null) {
                "--addr and --data are mutually exclusive: a proxied store is owned by the running server"
            }
            if (addr != null) return Session(TcpStore(addr), null, null, logger)
            val kv = Db()
            data?.let { loadSnapshot(kv, it, logger) }
            return Session(DbStore(kv), kv, data, logger)
        }

        private fun loadSnapshot(kv: Db, path: Path, logger: Logger) =
            runCatching { kv.load(path) }
                .onFailure { logger.log(Level.WARNING, "could not load data file ($path): ${it.message}") }
                .onSuccess { logger.log(Level.INFO, "loaded data file ($path)") }
    }
}
