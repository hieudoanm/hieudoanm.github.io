package io.github.hieudoanm.backbone.mcp

import io.github.hieudoanm.backbone.core.AppConfig
import io.github.hieudoanm.backbone.database.Database
import kotlinx.serialization.json.JsonElement
import kotlinx.serialization.json.JsonNull
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.JsonPrimitive
import kotlinx.serialization.json.booleanOrNull
import kotlinx.serialization.json.buildJsonObject
import kotlinx.serialization.json.intOrNull
import kotlinx.serialization.json.jsonArray
import kotlinx.serialization.json.jsonObject
import kotlinx.serialization.json.jsonPrimitive
import kotlinx.serialization.json.put
import org.junit.jupiter.api.AfterEach
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import java.io.ByteArrayInputStream
import java.io.ByteArrayOutputStream
import java.io.File
import java.io.PrintStream
import kotlin.io.path.createTempDirectory
import kotlin.test.assertEquals
import kotlin.test.assertFalse
import kotlin.test.assertNotNull
import kotlin.test.assertTrue
import kotlin.test.fail

/**
 * Protocol behaviour of the Backbone MCP server.
 *
 * Each test drives the real [Server] against a real migrated SQLite database in
 * a temporary directory, so tool handlers are exercised against real storage
 * rather than a stub.
 */
class McpServerTest {
    private lateinit var tempDir: File
    private lateinit var database: Database

    @BeforeEach
    fun setup() {
        tempDir = createTempDirectory("backbone-mcp-test-").toFile()
        database = Database(AppConfig(backboneData = tempDir.absolutePath))
    }

    @AfterEach
    fun teardown() {
        database.close()
        tempDir.deleteRecursively()
    }

    /** Runs frames through a server and returns one decoded reply per line. */
    private fun serve(input: String): List<JsonObject> {
        val output = ByteArrayOutputStream()
        val writer = output.bufferedWriter()
        val diagnostics = PrintStream(ByteArrayOutputStream())
        Server(
            output = writer,
            diagnostics = diagnostics,
            handlers = Handlers(database),
            serverName = "backbone-mcp",
            serverVersion = "0.0.1",
        ).serve(ByteArrayInputStream(input.toByteArray()))
        writer.flush()
        return output.toString(Charsets.UTF_8.name())
            .lines()
            .filter { it.isNotBlank() }
            .map { compact.parseToJsonElement(it).jsonObject }
    }

    /** Runs one request expected to produce exactly one reply. */
    private fun single(input: String): JsonObject {
        val replies = serve(input)
        assertEquals(1, replies.size, "expected one reply, got $replies")
        return replies.first()
    }

    private fun frame(body: JsonObject): String = compact.encodeToString(JsonObject.serializer(), body)

    private fun request(id: Int, method: String, params: JsonObject = JsonObject(emptyMap())): String =
        frame(buildJsonObject {
            put("jsonrpc", "2.0")
            put("id", id)
            put("method", method)
            put("params", params)
        })

    private fun callTool(id: Int, name: String, arguments: JsonObject = JsonObject(emptyMap())): String =
        request(id, "tools/call", buildJsonObject {
            put("name", name)
            put("arguments", arguments)
        })

    private fun result(reply: JsonObject): JsonObject =
        reply["result"]?.jsonObject ?: fail("reply has no result: $reply")

    private fun error(reply: JsonObject): JsonObject =
        reply["error"]?.jsonObject ?: fail("reply has no error: $reply")

    /** The text of a successful tool result, failing if the tool reported an error. */
    private fun toolText(reply: JsonObject): String {
        val result = result(reply)
        val isError = (result["isError"] as? JsonPrimitive)?.booleanOrNull ?: false
        assertFalse(isError, "tool reported an error: $result")
        return result["content"]!!.jsonArray[0].jsonObject["text"]!!.jsonPrimitive.content
    }

    /** The text of an errored tool result, failing if the tool reported success. */
    private fun errorText(reply: JsonObject): String {
        val result = result(reply)
        assertEquals(JsonPrimitive(true), result["isError"], "expected an errored result: $result")
        return result["content"]!!.jsonArray[0].jsonObject["text"]!!.jsonPrimitive.content
    }

    @Test
    fun `initialize advertises the protocol version and server name`() {
        val reply = single(request(1, "initialize", buildJsonObject { put("protocolVersion", "2025-11-25") }))
        val result = result(reply)
        assertEquals("2025-11-25", result["protocolVersion"]!!.jsonPrimitive.content)
        assertEquals("backbone-mcp", result["serverInfo"]!!.jsonObject["name"]!!.jsonPrimitive.content)
        assertEquals(false, result["capabilities"]!!.jsonObject["tools"]!!.jsonObject["listChanged"]!!.jsonPrimitive.booleanOrNull)
        assertEquals("2.0", reply["jsonrpc"]!!.jsonPrimitive.content)
        assertEquals(1, reply["id"]!!.jsonPrimitive.intOrNull)
    }

    @Test
    fun `initialize answers with its own revision when the client asks for another`() {
        val reply = single(request(1, "initialize", buildJsonObject { put("protocolVersion", "1999-01-01") }))
        assertEquals("2025-11-25", result(reply)["protocolVersion"]!!.jsonPrimitive.content)
    }

    @Test
    fun `ping answers with an empty result`() {
        val reply = single(request(2, "ping"))
        assertEquals(JsonObject(emptyMap()), result(reply))
    }

    @Test
    fun `tools list is sorted and covers the backbone surface`() {
        val reply = single(request(3, "tools/list"))
        val names = result(reply)["tools"]!!.jsonArray.map { it.jsonObject["name"]!!.jsonPrimitive.content }
        assertEquals(names.sorted(), names, "tools/list must be sorted by name")
        for (expected in listOf(
            "backbone_collections_create", "backbone_collections_delete", "backbone_collections_list",
            "backbone_export", "backbone_health", "backbone_import",
            "backbone_records_create", "backbone_records_delete", "backbone_records_get",
            "backbone_records_list", "backbone_records_update",
        )) {
            assertTrue(names.contains(expected), "missing tool $expected")
        }
    }

    @Test
    fun `every tool advertises an object schema with a required list`() {
        val tools = result(single(request(4, "tools/list")))["tools"]!!.jsonArray
        assertTrue(tools.isNotEmpty())
        for (tool in tools) {
            val name = tool.jsonObject["name"]!!.jsonPrimitive.content
            val schema = tool.jsonObject["inputSchema"]!!.jsonObject
            assertEquals("object", schema["type"]!!.jsonPrimitive.content, "bad schema for $name")
            assertNotNull(schema["required"], "$name is missing a required list")
            assertTrue(tool.jsonObject["description"]!!.jsonPrimitive.content.isNotEmpty(), "$name has no description")
        }
    }

    @Test
    fun `health reports the database is reachable`() {
        val reply = single(callTool(5, "backbone_health"))
        assertTrue(toolText(reply).contains("operational"))
    }

    @Test
    fun `collections round trip through the real database`() {
        val empty = single(callTool(6, "backbone_collections_list"))
        assertEquals(0, compact.parseToJsonElement(toolText(empty)).jsonObject["collections"]!!.jsonArray.size)

        val created = single(callTool(7, "backbone_collections_create", buildJsonObject {
            put("name", "notes")
            put("schema", "{}")
        }))
        assertTrue(toolText(created).contains("\"created\": true"))

        val listed = single(callTool(8, "backbone_collections_list"))
        assertTrue(toolText(listed).contains("notes"), "created collection is missing")

        val deleted = single(callTool(9, "backbone_collections_delete", buildJsonObject { put("name", "notes") }))
        assertTrue(toolText(deleted).contains("\"deleted\": true"))

        val gone = single(callTool(10, "backbone_collections_list"))
        assertEquals(0, compact.parseToJsonElement(toolText(gone)).jsonObject["collections"]!!.jsonArray.size)
    }

    @Test
    fun `creating a collection twice reports a conflict`() {
        val args = buildJsonObject { put("name", "dupe") }
        serve(callTool(11, "backbone_collections_create", args))
        val second = single(callTool(12, "backbone_collections_create", args))
        assertTrue(errorText(second).contains("already exists"))
    }

    @Test
    fun `creating a collection without a name is rejected`() {
        val reply = single(callTool(13, "backbone_collections_create", buildJsonObject { put("name", "  ") }))
        assertTrue(errorText(reply).contains("must not be empty"))
    }

    @Test
    fun `deleting a missing collection reports an error`() {
        val reply = single(callTool(14, "backbone_collections_delete", buildJsonObject { put("name", "ghost") }))
        assertTrue(errorText(reply).contains("not found"))
    }

    @Test
    fun `records round trip through the real database`() {
        serve(callTool(15, "backbone_collections_create", buildJsonObject { put("name", "posts") }))

        val created = single(callTool(16, "backbone_records_create", buildJsonObject {
            put("collection", "posts")
            put("id", "post-1")
            putJson("data", buildJsonObject { put("title", "Hello") })
        }))
        assertTrue(toolText(created).contains("Hello"))

        val fetched = single(callTool(17, "backbone_records_get", buildJsonObject {
            put("collection", "posts"); put("id", "post-1")
        }))
        assertTrue(toolText(fetched).contains("Hello"))

        val updated = single(callTool(18, "backbone_records_update", buildJsonObject {
            put("collection", "posts"); put("id", "post-1")
            putJson("data", buildJsonObject { put("title", "Updated") })
        }))
        assertTrue(toolText(updated).contains("Updated"))

        val listed = single(callTool(19, "backbone_records_list", buildJsonObject { put("collection", "posts") }))
        assertTrue(toolText(listed).contains("Updated"), "update was not persisted")

        val deleted = single(callTool(20, "backbone_records_delete", buildJsonObject {
            put("collection", "posts"); put("id", "post-1")
        }))
        assertTrue(toolText(deleted).contains("\"deleted\": true"))

        val missing = single(callTool(21, "backbone_records_get", buildJsonObject {
            put("collection", "posts"); put("id", "post-1")
        }))
        assertTrue(errorText(missing).contains("not found"))
    }

    @Test
    fun `records create generates an id when none is given`() {
        serve(callTool(22, "backbone_collections_create", buildJsonObject { put("name", "auto") }))
        val created = single(callTool(23, "backbone_records_create", buildJsonObject {
            put("collection", "auto")
            putJson("data", buildJsonObject { put("n", 1) })
        }))
        val id = compact.parseToJsonElement(toolText(created)).jsonObject["id"]!!.jsonPrimitive.content
        assertTrue(id.isNotEmpty(), "no id was generated")
    }

    @Test
    fun `records list rejects a per_page above the cap`() {
        serve(callTool(24, "backbone_collections_create", buildJsonObject { put("name", "capped") }))
        val reply = single(callTool(25, "backbone_records_list", buildJsonObject {
            put("collection", "capped"); put("per_page", 100_000)
        }))
        assertTrue(errorText(reply).contains("per_page must be between"))
    }

    @Test
    fun `records list rejects a page below one`() {
        serve(callTool(26, "backbone_collections_create", buildJsonObject { put("name", "paged") }))
        val reply = single(callTool(27, "backbone_records_list", buildJsonObject {
            put("collection", "paged"); put("page", 0)
        }))
        assertTrue(errorText(reply).contains("page must be 1 or greater"))
    }

    @Test
    fun `export returns real data and import applies it to another database`() {
        serve(callTool(28, "backbone_collections_create", buildJsonObject { put("name", "shipped") }))
        serve(callTool(29, "backbone_records_create", buildJsonObject {
            put("collection", "shipped"); put("id", "r1")
            putJson("data", buildJsonObject { put("ok", true) })
        }))

        val payload = toolText(single(callTool(30, "backbone_export", buildJsonObject { put("format", "json") })))
        assertTrue(payload.contains("shipped"), "export is missing the collection")

        // A second database receives the payload, so a passing test cannot be a
        // no-op handler.
        val otherDir = createTempDirectory("backbone-mcp-import-").toFile()
        val other = Database(AppConfig(backboneData = otherDir.absolutePath))
        try {
            fun run(input: String): String {
                val output = ByteArrayOutputStream()
                val writer = output.bufferedWriter()
                Server(writer, PrintStream(ByteArrayOutputStream()), Handlers(other), "backbone-mcp", "0.0.1")
                    .serve(ByteArrayInputStream((input + "\n").toByteArray()))
                writer.flush()
                return output.toString(Charsets.UTF_8.name()).lines().first()
            }

            val summary = toolText(
                compact.parseToJsonElement(run(callTool(31, "backbone_import", buildJsonObject {
                    put("format", "json"); put("data", payload)
                }))).jsonObject,
            )
            assertTrue(summary.contains("\"created_collections\": 1"), "import summary: $summary")
            assertTrue(summary.contains("\"created_records\": 1"), "import summary: $summary")

            assertTrue(run(callTool(32, "backbone_collections_list")).contains("shipped"), "imported collection is missing")
            assertTrue(
                run(callTool(33, "backbone_records_list", buildJsonObject { put("collection", "shipped") })).contains("r1"),
                "imported record is missing",
            )
        } finally {
            other.close()
            otherDir.deleteRecursively()
        }
    }

    @Test
    fun `export rejects a format this build cannot produce`() {
        val reply = single(callTool(34, "backbone_export", buildJsonObject { put("format", "csv") }))
        assertTrue(errorText(reply).contains("only the json format"))
    }

    @Test
    fun `import rejects malformed data`() {
        val reply = single(callTool(35, "backbone_import", buildJsonObject {
            put("format", "json"); put("data", "{nope")
        }))
        assertTrue(errorText(reply).contains("parse data"))
    }

    @Test
    fun `a notification produces no reply`() {
        assertTrue(serve(frame(buildJsonObject { put("jsonrpc", "2.0"); put("method", "tools/list") })).isEmpty())
        assertTrue(serve(frame(buildJsonObject {
            put("jsonrpc", "2.0"); put("id", JsonNull); put("method", "tools/list")
        })).isEmpty(), "a JSON-null id is a notification")
    }

    @Test
    fun `a string null id is a real request`() {
        val replies = serve(frame(buildJsonObject {
            put("jsonrpc", "2.0"); put("id", "null"); put("method", "ping")
        }))
        assertEquals(1, replies.size, "the string \"null\" is a real id: $replies")
        assertEquals("null", replies.first()["id"]!!.jsonPrimitive.content)
    }

    @Test
    fun `an unknown method reports method not found`() {
        val reply = single(request(36, "nope"))
        assertEquals(ErrorCode.METHOD_NOT_FOUND, error(reply)["code"]!!.jsonPrimitive.intOrNull)
        assertEquals("method not found: nope", error(reply)["message"]!!.jsonPrimitive.content)
    }

    @Test
    fun `an unknown tool reports method not found`() {
        val reply = single(callTool(37, "backbone_nope"))
        assertEquals(ErrorCode.METHOD_NOT_FOUND, error(reply)["code"]!!.jsonPrimitive.intOrNull)
        assertTrue(error(reply)["message"]!!.jsonPrimitive.content.contains("tool not found"))
    }

    @Test
    fun `a malformed frame reports a parse error with a null id`() {
        val reply = single("{not json}\n")
        assertEquals(ErrorCode.PARSE, error(reply)["code"]!!.jsonPrimitive.intOrNull)
        assertEquals(JsonNull, reply["id"], "a parse error has no id to echo")
        assertEquals("2.0", reply["jsonrpc"]!!.jsonPrimitive.content)
    }

    @Test
    fun `a frame above the cap is rejected and the reader resynchronises`() {
        val oversized = "x".repeat(MAX_FRAME_CHARS + 64)
        val bad = "{\"jsonrpc\":\"2.0\",\"id\":1,\"method\":\"$oversized\"}\n"
        val good = request(2, "ping") + "\n"
        val replies = serve(bad + good)
        assertEquals(2, replies.size, "one error for the bad frame, one reply for the good one: $replies")
        assertTrue(error(replies[0])["message"]!!.jsonPrimitive.content.contains("frame too large"))
        assertEquals(2, replies[1]["id"]!!.jsonPrimitive.intOrNull, "the reader did not resynchronise")
    }

    @Test
    fun `params that are not an object report invalid params`() {
        val reply = single("{\"jsonrpc\":\"2.0\",\"id\":3,\"method\":\"tools/call\",\"params\":\"not an object\"}\n")
        assertEquals(ErrorCode.INVALID_PARAMS, error(reply)["code"]!!.jsonPrimitive.intOrNull)
    }

    @Test
    fun `call params with no arguments name no tool rather than failing to decode`() {
        val reply = single("{\"jsonrpc\":\"2.0\",\"id\":4,\"method\":\"tools/call\"}\n")
        assertEquals(ErrorCode.METHOD_NOT_FOUND, error(reply)["code"]!!.jsonPrimitive.intOrNull)
    }

    @Test
    fun `a final frame without a trailing newline is still answered`() {
        val reply = single(request(5, "ping"))
        assertEquals(5, reply["id"]!!.jsonPrimitive.intOrNull)
    }

    @Test
    fun `a bad jsonrpc version reports invalid request`() {
        val reply = single("{\"jsonrpc\":\"1.0\",\"id\":6,\"method\":\"ping\"}\n")
        assertEquals(ErrorCode.INVALID_REQUEST, error(reply)["code"]!!.jsonPrimitive.intOrNull)
    }

    @Test
    fun `a request without a method reports invalid request`() {
        val reply = single("{\"jsonrpc\":\"2.0\",\"id\":7}\n")
        assertEquals(ErrorCode.INVALID_REQUEST, error(reply)["code"]!!.jsonPrimitive.intOrNull)
    }

    @Test
    fun `every reply is a single line even when the payload is not`() {
        serve(callTool(8, "backbone_collections_create", buildJsonObject { put("name", "multiline") }))
        val input = callTool(9, "backbone_collections_list") + "\n" + request(10, "ping") + "\n"
        val output = ByteArrayOutputStream()
        val writer = output.bufferedWriter()
        Server(writer, PrintStream(ByteArrayOutputStream()), Handlers(database), "backbone-mcp", "0.0.1")
            .serve(ByteArrayInputStream(input.toByteArray()))
        writer.flush()
        val text = output.toString(Charsets.UTF_8.name())
        assertEquals(2, text.lines().count { it.isNotBlank() }, "each reply must be one line")
        // The tool text is pretty-printed, so its newlines appear only escaped.
        assertTrue(text.contains("\\n"), "the indented payload should be escaped: $text")
        assertTrue(text.contains("\\\"collections\\\""), "the payload should be escaped: $text")
    }
}

/** Builds a nested object and stores it under [key]. */
private fun kotlinx.serialization.json.JsonObjectBuilder.putJson(
    key: String,
    value: JsonObject,
) {
    put(key, value as JsonElement)
}
