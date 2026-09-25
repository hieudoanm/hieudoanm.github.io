package io.github.hieudoanm.browserverless.mcp

import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.JsonPrimitive
import kotlinx.serialization.json.buildJsonObject
import kotlinx.serialization.json.jsonArray
import kotlinx.serialization.json.jsonObject
import kotlinx.serialization.json.jsonPrimitive
import kotlinx.serialization.json.put
import kotlinx.serialization.json.putJsonObject
import java.io.BufferedReader
import java.io.StringReader
import java.io.StringWriter
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertFalse
import kotlin.test.assertNotNull
import kotlin.test.assertNull
import kotlin.test.assertTrue

/**
 * Drives the server over a stub renderer, so the protocol contract is tested
 * without an engine. The real renderer is covered against a live server.
 */
private class StubRenderer(
    private val failure: String? = null,
) : Renderer {
    val scraped = mutableListOf<String>()
    val screenshotted = mutableListOf<String>()

    override fun scrape(url: String, timeoutMs: Long?): Result<ScrapeOutcome> {
        scraped += url
        failure?.let { return Result.failure(IllegalStateException(it)) }
        return Result.success(
            ScrapeOutcome(
                url = "https://example.com/final",
                title = "Example",
                html = "<html><body>hi</body></html>",
                timedOut = false,
                durationMs = 12,
                memoryKb = 34,
            ),
        )
    }

    override fun screenshot(url: String, timeoutMs: Long?): Result<ScreenshotOutcome> {
        screenshotted += url
        failure?.let { return Result.failure(IllegalStateException(it)) }
        return Result.success(
            ScreenshotOutcome(
                url = "https://example.com/final",
                title = "Example",
                png = byteArrayOf(0x89.toByte(), 0x50, 0x4E, 0x47),
                timedOut = true,
                durationMs = 20,
                memoryKb = 56,
            ),
        )
    }
}

/** Runs [input] through a server and returns the decoded reply frames. */
private fun drive(renderer: Renderer, input: String): List<JsonObject> {
    val writer = StringWriter()
    Server(renderer).run(BufferedReader(StringReader(input)), writer, StringWriter())
    val compact = Json
    return writer.toString()
        .lines()
        .filter { it.isNotBlank() }
        .map { compact.parseToJsonElement(it).jsonObject }
}

/** Builds a tools/call frame for [name] with [arguments]. */
private fun call(id: Int, name: String, arguments: JsonObject): String =
    buildJsonObject {
        put("jsonrpc", "2.0")
        put("id", id)
        put("method", "tools/call")
        putJsonObject("params") {
            put("name", name)
            put("arguments", arguments)
        }
    }.toString() + "\n"

private fun url(url: String) = buildJsonObject { put("url", url) }

private val firstResult: JsonObject
    get() = JsonObject(emptyMap())

class McpServerTest {
    @Test
    fun `initialize reports the protocol version and identity`() {
        val replies = drive(
            StubRenderer(),
            """{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-11-25"}}""" + "\n",
        )
        val result = replies[0]["result"]!!.jsonObject
        assertEquals("2025-11-25", result["protocolVersion"]!!.jsonPrimitive.content)
        assertEquals("browserverless-mcp", result["serverInfo"]!!.jsonObject["name"]!!.jsonPrimitive.content)
        assertFalse(result["capabilities"]!!.jsonObject["tools"]!!.jsonObject["listChanged"]!!.jsonPrimitive.content.toBoolean())
    }

    @Test
    fun `an unsupported protocol version falls back to the served one`() {
        val replies = drive(
            StubRenderer(),
            """{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"1999-01-01"}}""" + "\n",
        )
        assertEquals(
            PROTOCOL_VERSION,
            replies[0]["result"]!!.jsonObject["protocolVersion"]!!.jsonPrimitive.content,
        )
    }

    @Test
    fun `ping is answered with an empty result`() {
        val replies = drive(StubRenderer(), """{"jsonrpc":"2.0","id":1,"method":"ping"}""" + "\n")
        assertEquals(JsonObject(emptyMap()), replies[0]["result"]!!.jsonObject)
    }

    @Test
    fun `the tool list is sorted and complete`() {
        val replies = drive(StubRenderer(), """{"jsonrpc":"2.0","id":1,"method":"tools/list"}""" + "\n")
        val names = replies[0]["result"]!!.jsonObject["tools"]!!.jsonArray
            .map { it.jsonObject["name"]!!.jsonPrimitive.content }
        assertEquals(
            listOf("browserverless_scrape", "browserverless_screenshot", "browserverless_version"),
            names,
        )
    }

    @Test
    fun `scrape returns html as text`() {
        val replies = drive(StubRenderer(), call(1, "browserverless_scrape", url("https://example.com")))
        val result = replies[0]["result"]!!.jsonObject
        assertNull(result["isError"], "a success must omit isError")
        val payload = Json.parseToJsonElement(
            result["content"]!!.jsonArray[0].jsonObject["text"]!!.jsonPrimitive.content,
        ).jsonObject
        assertEquals("<html><body>hi</body></html>", payload["html"]!!.jsonPrimitive.content)
        assertEquals("Example", payload["title"]!!.jsonPrimitive.content)
        assertEquals(34, payload["memory_kb"]!!.jsonPrimitive.content.toInt())
    }

    @Test
    fun `screenshot returns the png as an image block not as text`() {
        val replies = drive(StubRenderer(), call(1, "browserverless_screenshot", url("https://example.com")))
        val content = replies[0]["result"]!!.jsonObject["content"]!!.jsonArray

        assertEquals(2, content.size, "a summary and an image")
        val summary = Json.parseToJsonElement(
            content[0].jsonObject["text"]!!.jsonPrimitive.content,
        ).jsonObject
        assertEquals(4, summary["png_bytes"]!!.jsonPrimitive.content.toInt())
        assertNull(content[0].jsonObject["data"], "the summary must not inline image bytes")

        val image = content[1].jsonObject
        assertEquals("image", image["type"]!!.jsonPrimitive.content)
        assertEquals("image/png", image["mimeType"]!!.jsonPrimitive.content)
        assertEquals("iVBORw==", image["data"]!!.jsonPrimitive.content)
    }

    @Test
    fun `a render failure is a tool error not a jsonrpc error`() {
        val replies = drive(
            StubRenderer(failure = "connection refused"),
            call(1, "browserverless_scrape", url("https://example.com")),
        )
        assertNull(replies[0]["error"], "a tool failure must not become a JSON-RPC error")
        val result = replies[0]["result"]!!.jsonObject
        assertTrue(result["isError"]!!.jsonPrimitive.content.toBoolean())
        val text = result["content"]!!.jsonArray[0].jsonObject["text"]!!.jsonPrimitive.content
        assertTrue(text.contains("connection refused"), text)
    }

    @Test
    fun `a missing url is reported to the model in its own terms`() {
        val replies = drive(StubRenderer(), call(1, "browserverless_scrape", JsonObject(emptyMap())))
        val result = replies[0]["result"]!!.jsonObject
        assertTrue(result["isError"]!!.jsonPrimitive.content.toBoolean())
        assertEquals(
            "missing required argument: url",
            result["content"]!!.jsonArray[0].jsonObject["text"]!!.jsonPrimitive.content,
        )
    }

    @Test
    fun `a non-http url is refused`() {
        val replies = drive(StubRenderer(), call(1, "browserverless_scrape", url("file:///etc/passwd")))
        val result = replies[0]["result"]!!.jsonObject
        assertTrue(result["isError"]!!.jsonPrimitive.content.toBoolean())
        val text = result["content"]!!.jsonArray[0].jsonObject["text"]!!.jsonPrimitive.content
        assertTrue(text.contains("unsupported scheme"), text)
    }

    @Test
    fun `a negative timeout is refused`() {
        val replies = drive(
            StubRenderer(),
            call(1, "browserverless_scrape", buildJsonObject {
                put("url", "https://example.com")
                put("timeout_ms", -1)
            }),
        )
        val result = replies[0]["result"]!!.jsonObject
        assertTrue(result["isError"]!!.jsonPrimitive.content.toBoolean())
        assertTrue(
            result["content"]!!.jsonArray[0].jsonObject["text"]!!.jsonPrimitive.content
                .contains("must not be negative"),
        )
    }

    @Test
    fun `an oversized timeout is refused rather than disabling the deadline`() {
        val replies = drive(
            StubRenderer(),
            call(1, "browserverless_scrape", buildJsonObject {
                put("url", "https://example.com")
                put("timeout_ms", Long.MAX_VALUE)
            }),
        )
        val result = replies[0]["result"]!!.jsonObject
        assertTrue(result["isError"]!!.jsonPrimitive.content.toBoolean())
        assertTrue(
            result["content"]!!.jsonArray[0].jsonObject["text"]!!.jsonPrimitive.content
                .contains("must not exceed"),
        )
    }

    @Test
    fun `an unknown tool is a method-not-found error`() {
        val replies = drive(StubRenderer(), call(1, "browserverless_nope", JsonObject(emptyMap())))
        val error = replies[0]["error"]!!.jsonObject
        assertEquals(ErrorCode.METHOD_NOT_FOUND, error["code"]!!.jsonPrimitive.content.toInt())
        assertTrue(error["message"]!!.jsonPrimitive.content.contains("tool not found"))
    }

    @Test
    fun `an unknown method is a method-not-found error`() {
        val replies = drive(StubRenderer(), """{"jsonrpc":"2.0","id":1,"method":"resources/list"}""" + "\n")
        assertEquals(
            ErrorCode.METHOD_NOT_FOUND,
            replies[0]["error"]!!.jsonObject["code"]!!.jsonPrimitive.content.toInt(),
        )
    }

    @Test
    fun `a malformed frame is a parse error with a null id`() {
        val replies = drive(StubRenderer(), "{not json}\n")
        val error = replies[0]["error"]!!.jsonObject
        assertEquals(ErrorCode.PARSE, error["code"]!!.jsonPrimitive.content.toInt())
        assertEquals("null", replies[0]["id"]!!.jsonPrimitive.content)
    }

    @Test
    fun `a wrong jsonrpc version is an invalid request`() {
        val replies = drive(StubRenderer(), """{"jsonrpc":"1.0","id":1,"method":"ping"}""" + "\n")
        assertEquals(
            ErrorCode.INVALID_REQUEST,
            replies[0]["error"]!!.jsonObject["code"]!!.jsonPrimitive.content.toInt(),
        )
    }

    @Test
    fun `a notification is never answered`() {
        val input = """{"jsonrpc":"2.0","method":"notifications/initialized"}""" + "\n" +
            call(2, "browserverless_version", JsonObject(emptyMap()))
        val replies = drive(StubRenderer(), input)

        assertEquals(1, replies.size, "only the id-bearing request may be answered")
        assertEquals(2, replies[0]["id"]!!.jsonPrimitive.content.toInt())
    }

    @Test
    fun `a notification with a bad version stays silent`() {
        // The notification check must precede the version check, or the client
        // receives a reply it can never match.
        val replies = drive(StubRenderer(), """{"jsonrpc":"1.0","method":"ping"}""" + "\n")
        assertTrue(replies.isEmpty())
    }

    @Test
    fun `a notification does not run its tool`() {
        val renderer = StubRenderer()
        val input = """{"jsonrpc":"2.0","method":"tools/call","params":{"name":"browserverless_scrape","arguments":{"url":"https://example.com"}}}""" + "\n"
        val replies = drive(renderer, input)

        assertTrue(replies.isEmpty(), "a notification must produce no reply")
        assertTrue(renderer.scraped.isEmpty(), "a notification must not render")
    }

    @Test
    fun `a call with no params names no tool rather than failing to decode`() {
        val replies = drive(StubRenderer(), """{"jsonrpc":"2.0","id":1,"method":"tools/call"}""" + "\n")
        val error = replies[0]["error"]!!.jsonObject
        assertEquals(ErrorCode.METHOD_NOT_FOUND, error["code"]!!.jsonPrimitive.content.toInt())
        assertTrue(error["message"]!!.jsonPrimitive.content.contains("tool not found"))
    }

    @Test
    fun `non-object params are rejected as invalid params`() {
        val replies = drive(
            StubRenderer(),
            """{"jsonrpc":"2.0","id":1,"method":"tools/call","params":"nope"}""" + "\n",
        )
        assertEquals(
            ErrorCode.INVALID_PARAMS,
            replies[0]["error"]!!.jsonObject["code"]!!.jsonPrimitive.content.toInt(),
        )
    }

    @Test
    fun `every response is a single line`() {
        // A pretty-printed reply would split across lines and desynchronise a
        // line-oriented client, so the transport is exercised over multi-line input.
        val input = """{"jsonrpc":"2.0","id":1,"method":"tools/list"}""" + "\n" +
            call(2, "browserverless_scrape", url("https://example.com"))
        val writer = StringWriter()
        Server(StubRenderer()).run(BufferedReader(StringReader(input)), writer, StringWriter())
        val lines = writer.toString().lines().filter { it.isNotBlank() }
        assertEquals(2, lines.size)
        for (line in lines) Json.parseToJsonElement(line)
    }

    @Test
    fun `the version tool reports the server identity`() {
        val replies = drive(StubRenderer(), call(1, "browserverless_version", JsonObject(emptyMap())))
        val payload = Json.parseToJsonElement(
            replies[0]["result"]!!.jsonObject["content"]!!.jsonArray[0]
                .jsonObject["text"]!!.jsonPrimitive.content,
        ).jsonObject
        assertEquals("browserverless-mcp", payload["server"]!!.jsonPrimitive.content)
        assertNotNull(payload["version"]!!.jsonPrimitive.content)
    }

    @Test
    fun `the tool schemas declare url as required`() {
        for (tool in listOf(Tools.scrape(), Tools.screenshot())) {
            assertEquals("object", tool.inputSchema.type)
            assertEquals(listOf("url"), tool.inputSchema.required)
            assertEquals("string", tool.inputSchema.properties["url"]!!.type)
        }
        assertTrue(Tools.version().inputSchema.required.isEmpty())
    }

    @Test
    fun `an oversized frame is a parse error and does not execute the tail`() {
        // A frame beyond the cap must be refused, and its remainder discarded as
        // junk so it cannot be run as a second command.
        val huge = "x".repeat(MAX_FRAME_CHARS + 16)
        val input = """{"jsonrpc":"2.0","id":1,"method":"ping","pad":"$huge"}""" + "\n" +
            call(2, "browserverless_version", JsonObject(emptyMap()))
        val replies = drive(StubRenderer(), input)

        assertEquals(
            ErrorCode.PARSE,
            replies[0]["error"]!!.jsonObject["code"]!!.jsonPrimitive.content.toInt(),
        )
        assertEquals(
            2,
            replies[1]["id"]!!.jsonPrimitive.content.toInt(),
            "the stream must resynchronise on the next frame",
        )
    }

    @Test
    fun `a json-null id is treated as a notification`() {
        val replies = drive(StubRenderer(), """{"jsonrpc":"2.0","id":null,"method":"ping"}""" + "\n")
        assertTrue(replies.isEmpty())
    }

    @Test
    fun `a string id is preserved verbatim`() {
        val replies = drive(StubRenderer(), """{"jsonrpc":"2.0","id":"abc","method":"ping"}""" + "\n")
        assertEquals("abc", replies[0]["id"]!!.jsonPrimitive.content)
    }

    @Test
    fun `a string id is not a notification`() {
        // An id of "null" as a string is a real id, unlike a JSON null.
        val replies = drive(StubRenderer(), """{"jsonrpc":"2.0","id":"null","method":"ping"}""" + "\n")
        assertEquals(1, replies.size)
    }

    @Test
    fun `a final frame without a trailing newline is still answered`() {
        val replies = drive(StubRenderer(), """{"jsonrpc":"2.0","id":1,"method":"ping"}""")
        assertEquals(1, replies.size)
        assertEquals(firstResult, replies[0]["result"]!!.jsonObject)
    }

    @Test
    fun `unknown fields in a request are ignored`() {
        // MCP clients may add fields; rejecting them would break the session.
        val replies = drive(
            StubRenderer(),
            """{"jsonrpc":"2.0","id":1,"method":"ping","extra":{"a":1}}""" + "\n",
        )
        assertEquals(1, replies.size)
    }

    @Test
    fun `blank lines are skipped`() {
        val replies = drive(StubRenderer(), "\n\n" + """{"jsonrpc":"2.0","id":1,"method":"ping"}""" + "\n\n")
        assertEquals(1, replies.size)
    }

    @Test
    fun `the renderer receives the requested url`() {
        val renderer = StubRenderer()
        drive(renderer, call(1, "browserverless_scrape", url("https://example.com/page")))
        assertEquals(listOf("https://example.com/page"), renderer.scraped)
    }

    @Test
    fun `a zero timeout means use the server default`() {
        val renderer = StubRenderer()
        drive(
            renderer,
            call(1, "browserverless_scrape", buildJsonObject {
                put("url", "https://example.com")
                put("timeout_ms", 0)
            }),
        )
        assertEquals(listOf("https://example.com"), renderer.scraped)
    }
}
