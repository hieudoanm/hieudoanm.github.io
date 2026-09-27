package io.github.hieudoanm.kevin.mcp

import java.io.BufferedReader
import java.io.BufferedWriter
import java.io.Closeable
import java.io.InputStreamReader
import java.io.OutputStreamWriter
import java.net.InetSocketAddress
import java.net.Socket

private const val CONNECT_TIMEOUT_MS = 5_000
private const val ERROR_PREFIX = "ERR "
private const val OK = "OK"
private const val NIL = "(nil)"

/**
 * A [Store] proxied to a remote `kevin serve`.
 *
 * The socket sits behind a lock because a command needs exclusive use of the
 * connection for its write-then-read exchange. The server answers one request at
 * a time, so the lock is never contended in practice.
 */
internal class TcpStore(val address: String) : Store, Closeable {
    private val lock = Any()
    private val socket = Socket()
    private val reader: BufferedReader
    private val writer: BufferedWriter

    init {
        val port = address.substringAfterLast(':', "").toIntOrNull()
            ?: throw StoreException("kevin address must be host:port, got \"$address\"")
        val host = address.substringBeforeLast(':', "127.0.0.1")
        socket.connect(InetSocketAddress(host, port), CONNECT_TIMEOUT_MS)
        reader = BufferedReader(InputStreamReader(socket.getInputStream(), Charsets.UTF_8))
        writer = BufferedWriter(OutputStreamWriter(socket.getOutputStream(), Charsets.UTF_8))
    }

    /** Releases the connection. */
    override fun close() {
        runCatching { socket.close() }
    }

    override fun ping() {
        command("PING")
    }

    override fun get(key: String): Pair<String, Boolean> {
        val reply = command("GET $key").trim()
        if (reply == NIL) return "" to false
        return reply to true
    }

    override fun set(key: String, value: String, ttlSeconds: Int) {
        validateToken("key", key)
        validateToken("value", value)
        command("SET $key $value").requireOk()
        if (ttlSeconds > 0) command("EXPIRE $key $ttlSeconds").requireOk()
    }

    override fun del(keys: List<String>): Int {
        if (keys.isEmpty()) throw StoreException("keys must not be empty")
        keys.forEach { validateToken("key", it) }
        return command("DEL ${keys.joinToString(" ")}").count()
    }

    override fun exists(key: String): Boolean {
        validateToken("key", key)
        return command("EXISTS $key").count() > 0
    }

    override fun keys(): List<String> = command("KEYS").trim().split(WHITESPACE).filter(String::isNotEmpty)

    override fun len(): Int = command("LEN").count().coerceAtLeast(0)

    override fun flush(): Int {
        val before = len()
        command("FLUSHALL").requireOk()
        return before
    }

    override fun ttl(key: String): Pair<Int, TtlState> {
        validateToken("key", key)
        val seconds = command("TTL $key").count()
        val state = when {
            seconds <= -2 -> TtlState.Missing
            seconds < 0 -> TtlState.NoExpiry
            else -> TtlState.Expiring
        }
        return seconds to state
    }

    override fun expire(key: String, seconds: Int): Boolean {
        validateToken("key", key)
        return command("EXPIRE $key $seconds").count() > 0
    }

    /** Sends one protocol line and returns the server's reply, newline included. */
    private fun command(request: String): String = try {
        synchronized(lock) {
            writer.write("$request\r\n")
            writer.flush()
            val line = reader.readLine()
                ?: throw StoreException("kevin closed the connection during \"$request\"")
            if (line.startsWith(ERROR_PREFIX)) throw StoreException(line.trim())
            line
        }
    } catch (error: StoreException) {
        throw error
    } catch (error: Exception) {
        throw StoreException("kevin request \"$request\" failed: ${error.message}", error)
    }

    private fun String.requireOk() {
        if (trim() == OK) Unit else throw StoreException("unexpected reply \"$this\"")
    }

    private fun String.count(): Int = trim().toIntOrNull()
        ?: throw StoreException("unexpected reply \"$this\"")
}

private val WHITESPACE = Regex("\\s+")

/**
 * Rejects keys and values the inline protocol cannot carry: it tokenises on
 * single spaces and terminates lines on newlines, so an embedded space or
 * newline would silently split one value into two arguments.
 */
internal fun validateToken(name: String, value: String) {
    if (value.isEmpty()) throw StoreException("$name must not be empty")
    if (value.any(Char::isWhitespace)) {
        throw StoreException("$name must not contain spaces or newlines when kevin is reached over TCP, got \"$value\"")
    }
}
