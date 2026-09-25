package io.github.hieudoanm.browserverless.mcp

import com.sun.net.httpserver.HttpServer
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.jsonArray
import kotlinx.serialization.json.jsonObject
import kotlinx.serialization.json.jsonPrimitive
import java.io.BufferedReader
import java.io.StringReader
import java.io.StringWriter
import java.net.InetSocketAddress
import java.util.Base64
import kotlin.test.AfterTest
import kotlin.test.Test
import kotlin.test.assertContains
import kotlin.test.assertEquals
import kotlin.test.assertFalse
import kotlin.test.assertTrue

/**
 * End-to-end tests for the renderer that talks to a real `browserverless serve`.
 *
 * These run against a fake rendering server, so they verify the wire contract —
 * the request body, the response codes, the metadata headers and the base64
 * image block — without needing a live browser. Pointing one at a real engine is
 * the job of the browserverless-rust MCP tests.
 */
class HttpRendererTest {
    private var fixture: HttpServer? = null

    @AfterTest
    fun tearDown() {
        fixture?.stop(0)
    }

    /** A stand-in engine that records requests and replies like `serve` does. */
    private fun startEngine(
        status: Int = 200,
        body: ByteArray = "<html><body>hi</body></html>".toByteArray(),
        headers: Map<String, String> = mapOf(
            "x-browserverless-url" to "https://example.com/final",
            "x-browserverless-title" to "Example",
            "x-browserverless-load-status" to "ok",
            "x-browserverless-duration-ms" to "12",
            "x-browserverless-memory-kb" to "34",
        ),
    ): Pair<String, MutableList<String>> {
        val seen = mutableListOf<String>()
        val server = HttpServer.create(InetSocketAddress("127.0.0.1", 0), 0)
        server.createContext("/api/v1/scrape") { exchange ->
            seen += exchange.requestBody.readBytes().decodeToString()
            for ((name, value) in headers) exchange.responseHeaders.add(name, value)
            exchange.sendResponseHeaders(status, body.size.toLong())
            exchange.responseBody.use { it.write(body) }
        }
        server.createContext("/api/v1/screenshot") { exchange ->
            seen += exchange.requestBody.readBytes().decodeToString()
            for ((name, value) in headers) exchange.responseHeaders.add(name, value)
            exchange.sendResponseHeaders(status, body.size.toLong())
            exchange.responseBody.use { it.write(body) }
        }
        server.start()
        fixture = server
        return "http://127.0.0.1:${server.address.port}" to seen
    }

    @Test
    fun `scrape returns the html and the metadata headers`() {
        val (base, _) = startEngine()
        val outcome = HttpRenderer(base).scrape("https://example.com", null).getOrThrow()

        assertEquals("https://example.com/final", outcome.url)
        assertEquals("Example", outcome.title)
        assertEquals("<html><body>hi</body></html>", outcome.html)
        assertFalse(outcome.timedOut)
        assertEquals(12, outcome.durationMs)
        assertEquals(34, outcome.memoryKb)
    }

    @Test
    fun `a partial load is reported as timed out`() {
        val (base, _) = startEngine(
            headers = mapOf("x-browserverless-load-status" to "partial"),
        )
        assertTrue(HttpRenderer(base).scrape("https://example.com", null).getOrThrow().timedOut)
    }

    @Test
    fun `the request body carries the requested url`() {
        val (base, seen) = startEngine()
        HttpRenderer(base).scrape("https://example.com/page", null).getOrThrow()

        val body = Json.parseToJsonElement(seen.single()).jsonObject
        assertEquals("https://example.com/page", body["url"]!!.jsonPrimitive.content)
    }

    @Test
    fun `a trailing slash on the base url does not double up`() {
        val (base, _) = startEngine()
        val outcome = HttpRenderer("$base/").scrape("https://example.com", null).getOrThrow()
        assertEquals("https://example.com/final", outcome.url)
    }

    @Test
    fun `screenshot returns the raw bytes`() {
        val png = byteArrayOf(0x89.toByte(), 0x50, 0x4E, 0x47, 1, 2, 3)
        val (base, _) = startEngine(body = png)
        val outcome = HttpRenderer(base).screenshot("https://example.com", null).getOrThrow()

        assertTrue(png.contentEquals(outcome.png))
    }

    @Test
    fun `a server error is reported as a failure rather than as html`() {
        val (base, _) = startEngine(status = 504, body = "render timed out".toByteArray())
        val failure = HttpRenderer(base).scrape("https://example.com", null).exceptionOrNull()

        assertTrue(failure != null, "a 504 must not be treated as a successful render")
        assertContains(failure!!.message.orEmpty(), "504")
    }

    @Test
    fun `a response over the cap is refused while it streams`() {
        // A small cap stands in for the production 32 MiB limit, so the test does
        // not have to move that much data to prove the bound holds.
        val cap = 64L * 1024
        val server = HttpServer.create(InetSocketAddress("127.0.0.1", 0), 0)
        server.createContext("/api/v1/scrape") { exchange ->
            val chunk = ByteArray(8 * 1024) { 'a'.code.toByte() }
            exchange.sendResponseHeaders(200, 0)
            exchange.responseBody.use { out ->
                repeat(64) { out.write(chunk) }
            }
        }
        server.start()
        val base = "http://127.0.0.1:${server.address.port}"

        try {
            val failure = HttpRenderer(base, maxResponseBytes = cap)
                .scrape("https://example.com", null)
                .exceptionOrNull()

            assertTrue(failure != null, "an oversized body must not be accepted as html")
            assertContains(failure!!.message.orEmpty(), "exceeded $cap bytes")
        } finally {
            server.stop(0)
        }
    }

    @Test
    fun `a body at the cap is still accepted`() {
        val cap = 64L * 1024
        val html = "a".repeat(cap.toInt())
        val (base, _) = startEngine(status = 200, body = html.toByteArray())
        val outcome = HttpRenderer(base, maxResponseBytes = cap)
            .scrape("https://example.com", null)
            .getOrNull()

        assertEquals(html, outcome?.html)
    }

    @Test
    fun `an unreachable engine is reported as a failure`() {
        // Port 1 is reserved and refuses connections.
        val failure = HttpRenderer("http://127.0.0.1:1").scrape("https://example.com", null)
            .exceptionOrNull()
        assertTrue(failure != null, "an unreachable engine must not hang or succeed")
    }

    @Test
    fun `the per call timeout bounds the request`() {
        val server = HttpServer.create(InetSocketAddress("127.0.0.1", 0), 0)
        server.createContext("/api/v1/scrape") { exchange ->
            // Never respond, so only the request deadline can end this.
            Thread.sleep(30_000)
        }
        server.start()
        fixture = server
        val base = "http://127.0.0.1:${server.address.port}"

        val started = System.nanoTime()
        val failure = HttpRenderer(base).scrape("https://example.com", 1_000).exceptionOrNull()
        val elapsedMs = (System.nanoTime() - started) / 1_000_000

        assertTrue(failure != null, "a hung engine must produce an error")
        assertTrue(elapsedMs < 20_000, "a 1s deadline must not wait 30s, took ${elapsedMs}ms")
    }

    @Test
    fun `the server reports a real png as an image block`() {
        val png = byteArrayOf(0x89.toByte(), 0x50, 0x4E, 0x47, 1, 2, 3)
        val (base, _) = startEngine(body = png)
        val writer = StringWriter()
        Server(HttpRenderer(base))
            .run(
                BufferedReader(
                    StringReader(
                        """{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"browserverless_screenshot","arguments":{"url":"https://example.com"}}}""" + "\n",
                    ),
                ),
                writer,
                StringWriter(),
            )

        val content = Json.parseToJsonElement(writer.toString().trim()).jsonObject["result"]!!
            .jsonObject["content"]!!.jsonArray
        val image = content[1].jsonObject
        assertEquals("image", image["type"]!!.jsonPrimitive.content)
        assertEquals(
            png.toList(),
            Base64.getDecoder().decode(image["data"]!!.jsonPrimitive.content).toList(),
        )
    }

    @Test
    fun `a failed render reaches the model as a tool error`() {
        val (base, _) = startEngine(status = 500, body = "boom".toByteArray())
        val writer = StringWriter()
        Server(HttpRenderer(base))
            .run(
                BufferedReader(
                    StringReader(
                        """{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"browserverless_scrape","arguments":{"url":"https://example.com"}}}""" + "\n",
                    ),
                ),
                writer,
                StringWriter(),
            )

        val result: JsonObject = Json.parseToJsonElement(writer.toString().trim()).jsonObject["result"]!!.jsonObject
        assertTrue(result["isError"]!!.jsonPrimitive.content.toBoolean())
    }
}
