package io.github.hieudoanm.landify.serve

import com.sun.net.httpserver.HttpExchange
import com.sun.net.httpserver.HttpServer
import java.io.IOException
import java.net.InetSocketAddress
import java.net.URLDecoder
import java.nio.file.Files
import java.nio.file.Path
import java.util.concurrent.CountDownLatch
import kotlin.io.path.readBytes

/**
 * A dependency-free static file server for previewing a built page.
 *
 * The Go original wraps `http.FileServer`; this uses the JDK's built-in
 * [HttpServer] so the Kotlin build needs no web framework. Behaviour matches
 * for the cases Landify produces: `/` and any directory resolve to
 * `index.html`, existing files are streamed with a content type derived from
 * the extension, and anything else is a 404.
 */
class StaticServer(
    root: Path,
    private val bind: String,
    private val port: Int,
) {
    /**
     * The absolute, normalised root.
     *
     * Absolute because [resolve] compares normalised children against the root
     * to refuse traversal, and a relative root like `.` would normalise its
     * children to `out.html`, which does not start with `.`.
     */
    private val root: Path = root.toAbsolutePath().normalize()

    private var server: HttpServer? = null

    /** Counted down by [stop] so [serve] can block on it. */
    private val released = CountDownLatch(1)

    /**
     * The port actually bound, which differs from [port] when it was 0.
     *
     * Read this after [start] returns; before that it falls back to the
     * requested port.
     */
    val boundPort: Int
        get() = server?.address?.port ?: port

    /**
     * Binds the socket and starts accepting connections.
     *
     * Separate from [awaitShutdown] so a caller can report the real
     * [boundPort] — with `--port 0` the OS picks the port, so the requested one
     * is not the one a browser needs.
     *
     * @throws IOException when the address is already in use.
     */
    fun start() {
        val created = HttpServer.create(InetSocketAddress(bind, port), 0)
        server = created
        created.createContext("/") { exchange -> handle(exchange) }
        created.executor = null
        created.start()
    }

    /**
     * Blocks until [stop] is called from another thread or this thread is
     * interrupted, then releases the port.
     *
     * [HttpServer.start] only spawns its accept loop, so the latch is what
     * actually keeps `landify serve` alive instead of returning immediately.
     */
    fun awaitShutdown() {
        try {
            released.await()
        } catch (_: InterruptedException) {
            Thread.currentThread().interrupt()
        } finally {
            stop()
        }
    }

    /** [start] followed by [awaitShutdown]. */
    fun serve() {
        start()
        awaitShutdown()
    }

    /** Stops accepting connections and releases the port, unblocking [serve]. */
    fun stop() {
        released.countDown()
        server?.stop(0)
        server = null
    }

    private fun handle(exchange: HttpExchange) {
        exchange.use {
            val requested = resolve(exchange.requestURI.path)
            if (requested == null) {
                respondNotFound(exchange)
            } else {
                respondFile(exchange, requested)
            }
        }
    }

    /**
     * Maps a URL path to a file inside [root], or null when it escapes the root
     * or does not exist. Directory requests fall back to `index.html`, which is
     * how the built page is served from `/`.
     */
    internal fun resolve(urlPath: String): Path? {
        val decoded = runCatching { URLDecoder.decode(urlPath, Charsets.UTF_8) }
            .getOrDefault(urlPath)
        val relative = decoded.trimStart('/').ifEmpty { "index.html" }
        val candidate = root.resolve(relative).normalize()
        if (!candidate.startsWith(root)) return null
        if (Files.isDirectory(candidate)) return candidate.resolve("index.html").takeIf { Files.isRegularFile(it) }
        return candidate.takeIf { Files.isRegularFile(it) }
    }

    private fun respondFile(exchange: HttpExchange, file: Path) {
        val bytes = file.readBytes()
        exchange.responseHeaders.add("Content-Type", contentTypeOf(file.toString()))
        exchange.sendResponseHeaders(200, bytes.size.toLong())
        exchange.responseBody.use { it.write(bytes) }
    }

    private fun respondNotFound(exchange: HttpExchange) {
        val body = "404 Not Found".toByteArray()
        exchange.sendResponseHeaders(404, body.size.toLong())
        exchange.responseBody.use { it.write(body) }
    }
}
