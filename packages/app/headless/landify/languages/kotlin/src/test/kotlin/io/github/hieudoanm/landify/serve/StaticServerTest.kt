package io.github.hieudoanm.landify.serve

import java.io.IOException
import java.net.HttpURLConnection
import java.net.URI
import java.nio.file.Files
import java.nio.file.Path
import java.util.concurrent.TimeUnit
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertNotNull
import kotlin.test.assertNull
import kotlin.test.assertTrue

class StaticServerTest {
    @Test
    fun `a request is served, and stop releases the server`() {
        val root = Files.createTempDirectory("landify-serve")
        Files.writeString(root.resolve("hello.txt"), "hi")
        val server = StaticServer(root, "127.0.0.1", 0)
        val thread = serveInBackground(server)
        try {
            assertEquals("hi", get(server.boundPort, "/hello.txt"))
        } finally {
            server.stop()
        }
        thread.join(THREAD_JOIN_MILLIS)
        assertTrue(!thread.isAlive, "serve did not return after stop()")
        root.toFile().deleteRecursively()
    }

    @Test
    fun `serve blocks instead of returning immediately`() {
        val root = Files.createTempDirectory("landify-blocking")
        val server = StaticServer(root, "127.0.0.1", 0)
        val thread = serveInBackground(server)
        try {
            assertTrue(thread.isAlive, "serve returned before stop() was called")
        } finally {
            server.stop()
        }
        thread.join(THREAD_JOIN_MILLIS)
        assertTrue(!thread.isAlive, "serve did not return after stop()")
        root.toFile().deleteRecursively()
    }

    @Test
    fun `a missing directory answers 404 instead of panicking`() {
        val root = Path.of("does", "not", "exist")
        val server = StaticServer(root, "127.0.0.1", 0)
        val thread = serveInBackground(server)
        try {
            assertEquals(404, status(server.boundPort, "/"))
        } finally {
            server.stop()
        }
        thread.join(THREAD_JOIN_MILLIS)
    }

    @Test
    fun `the root path resolves to index html`() {
        val root = Files.createTempDirectory("landify-root")
        Files.writeString(root.resolve("index.html"), "x")
        val server = StaticServer(root, "127.0.0.1", 0)
        try {
            assertEquals(root.resolve("index.html"), server.resolve("/"))
            assertEquals(root.resolve("index.html"), server.resolve(""))
        } finally {
            root.toFile().deleteRecursively()
        }
    }

    @Test
    fun `a traversal outside the root is refused`() {
        val root = Files.createTempDirectory("landify-escape")
        val server = StaticServer(root, "127.0.0.1", 0)
        try {
            assertNull(server.resolve("/../secret.txt"))
            assertNull(server.resolve("/%2e%2e/secret.txt"))
        } finally {
            root.toFile().deleteRecursively()
        }
    }

    @Test
    fun `a relative root still serves files beneath it`() {
        // Gradle runs tests with the project directory as the working directory,
        // so an empty root is the `landify serve -d .` case that used to 404.
        val server = StaticServer(Path.of(""), "127.0.0.1", 0)
        val found = server.resolve("/build.gradle.kts")
        assertNotNull(found, "a file in the working directory should resolve")
        assertEquals(
            Path.of("").toAbsolutePath().normalize(),
            found.toAbsolutePath().normalize().parent,
        )
    }

    @Test
    fun `a directory falls back to its index html`() {
        val root = Files.createTempDirectory("landify-dir")
        Files.createDirectory(root.resolve("docs"))
        Files.writeString(root.resolve("docs/index.html"), "docs")
        val server = StaticServer(root, "127.0.0.1", 0)
        try {
            assertEquals(root.resolve("docs/index.html"), server.resolve("/docs/"))
        } finally {
            root.toFile().deleteRecursively()
        }
    }

    @Test
    fun `start reports a real port when 0 was requested`() {
        // `landify serve -p 0` must print a usable URL, so boundPort has to
        // differ from the requested 0 once the OS has assigned one.
        val root = Files.createTempDirectory("landify-ephemeral")
        Files.writeString(root.resolve("index.html"), "hi")
        val server = StaticServer(root, "127.0.0.1", 0)
        try {
            server.start()
            assertTrue(server.boundPort > 0, "expected an OS-assigned port, got ${server.boundPort}")
            assertEquals("hi", get(server.boundPort, "/"))
        } finally {
            server.stop()
            root.toFile().deleteRecursively()
        }
    }

    @Test
    fun `a yaml file is served as text like the Go original`() {
        assertEquals("text/plain; charset=utf-8", contentTypeOf("landify.yaml"))
        assertEquals("text/plain; charset=utf-8", contentTypeOf("config.yml"))
    }
}

/** Runs [server] on its own thread and waits until the port is bound. */
private fun serveInBackground(server: StaticServer): Thread {
    val thread = Thread { server.serve() }
    thread.isDaemon = true
    thread.start()
    val deadline = System.nanoTime() + TimeUnit.SECONDS.toNanos(5)
    while (server.boundPort == 0 && System.nanoTime() < deadline) Thread.sleep(10)
    return thread
}

/** Fetches [path] from a server on [port] and returns the body. */
private fun get(port: Int, path: String): String {
    val connection = URI("http://127.0.0.1:$port$path").toURL().openConnection() as HttpURLConnection
    return connection.inputStream.use { String(it.readBytes()) }
}

/** The HTTP status code for [path], draining the body either way. */
private fun status(port: Int, path: String): Int {
    val connection = URI("http://127.0.0.1:$port$path").toURL().openConnection() as HttpURLConnection
    try {
        connection.inputStream.use { it.readBytes() }
    } catch (_: IOException) {
        connection.errorStream?.use { it.readBytes() }
    }
    return connection.responseCode
}

/** Generous upper bound for the serve thread to notice stop(). */
private const val THREAD_JOIN_MILLIS = 5_000L
