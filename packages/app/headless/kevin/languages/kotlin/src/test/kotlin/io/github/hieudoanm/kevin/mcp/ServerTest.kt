package io.github.hieudoanm.kevin.mcp

import io.github.hieudoanm.kevin.db.Db
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.JsonPrimitive
import kotlinx.serialization.json.buildJsonArray
import kotlinx.serialization.json.buildJsonObject
import kotlinx.serialization.json.jsonArray
import kotlinx.serialization.json.jsonObject
import kotlinx.serialization.json.jsonPrimitive
import kotlinx.serialization.json.put
import java.io.StringWriter
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertNotNull
import kotlin.test.assertNull
import kotlin.test.assertTrue

/** Drives the wire protocol against a server backed by a fresh in-process store. */
internal fun testServer(): McpServer = McpServer().also { Tools.register(it, DbStore(Db())) }

/** Sends one frame and returns the decoded reply, failing if nothing came back. */
internal fun McpServer.reply(frame: String): JsonObject {
    val answer = handle(frame)
    assertNotNull(answer, "expected a reply to $frame")
    return json.parseToJsonElement(answer).jsonObject
}

/** Returns the `result` member of a reply as an object. */
internal fun JsonObject.result(): JsonObject = this["result"]?.jsonObject
    ?: error("expected a result, got $this")

/** Returns the text of the first content item. */
internal fun JsonObject.text(): String = result().let { body ->
    val content = body["content"]!!.jsonArray
    content.first().jsonObject["text"]!!.jsonPrimitive.content
}

/** Builds a `tools/call` frame. */
internal fun callFrame(id: Int, name: String, arguments: JsonObject): String {
    val params = buildJsonObject {
        put("name", name)
        put("arguments", arguments)
    }
    return """{"jsonrpc":"2.0","id":$id,"method":"tools/call","params":${params}}"""
}

class ServerTest {

    @Test
    fun `initialize reports the protocol version and server identity`() {
        val result = testServer().reply(
            """{"jsonrpc":"2.0","id":1,"method":"initialize","params":{}}""",
        ).result()
        assertEquals("2025-11-25", result["protocolVersion"]!!.jsonPrimitive.content)
        val info = result["serverInfo"]!!.jsonObject
        assertEquals("kevin-mcp", info["name"]!!.jsonPrimitive.content)
        assertEquals("1.0.0", info["version"]!!.jsonPrimitive.content)
        val tools = result["capabilities"]!!.jsonObject["tools"]!!.jsonObject
        assertEquals(false, tools["listChanged"]!!.jsonPrimitive.content.toBoolean())
    }

    @Test
    fun `tools list is sorted by name and carries a schema`() {
        val result = testServer().reply("""{"jsonrpc":"2.0","id":2,"method":"tools/list"}""").result()
        val names = result["tools"]!!.jsonArray.map { it.jsonObject["name"]!!.jsonPrimitive.content }
        assertEquals(names.sorted(), names)
        assertEquals(10, names.size)
        assertEquals("kevin_del", names.first())
        assertEquals("kevin_ttl", names.last())
        val set = result["tools"]!!.jsonArray
            .map { it.jsonObject }
            .first { it["name"]!!.jsonPrimitive.content == "kevin_set" }
        val schema = set["inputSchema"]!!.jsonObject
        assertEquals("object", schema["type"]!!.jsonPrimitive.content)
        assertEquals(
            listOf("key", "value"),
            schema["required"]!!.jsonArray.map { it.jsonPrimitive.content },
        )
    }

    @Test
    fun `a notification receives no reply`() {
        val server = testServer()
        assertNull(server.handle("""{"jsonrpc":"2.0","method":"notifications/initialized"}"""))
        assertNull(server.handle("""{"jsonrpc":"2.0","id":null,"method":"tools/list"}"""))
        assertNull(server.handle("""{"jsonrpc":"2.0","method":"ping"}"""))
        assertNull(
            server.handle(
                """{"jsonrpc":"2.0","method":"tools/call","params":{"name":"kevin_ping"}}""",
            ),
        )
    }

    @Test
    fun `an undecodable frame becomes a parse error with a null id`() {
        val reply = testServer().reply("not json at all")
        assertEquals(JsonPrimitive(null), reply["id"])
        val error = reply["error"]!!.jsonObject
        assertEquals(-32700, error["code"]!!.jsonPrimitive.content.toInt())
        assertTrue(error["message"]!!.jsonPrimitive.content.startsWith("parse error"))
    }

    @Test
    fun `an unknown method is reported as method not found`() {
        val reply = testServer().reply("""{"jsonrpc":"2.0","id":3,"method":"unknown/method"}""")
        val error = reply["error"]!!.jsonObject
        assertEquals(-32601, error["code"]!!.jsonPrimitive.content.toInt())
        assertEquals("method not found: unknown/method", error["message"]!!.jsonPrimitive.content)
    }

    @Test
    fun `an unknown tool is reported as tool not found`() {
        val reply = testServer().reply(callFrame(4, "nope", buildJsonObject {}))
        val error = reply["error"]!!.jsonObject
        assertEquals(-32601, error["code"]!!.jsonPrimitive.content.toInt())
        assertEquals("tool not found: nope", error["message"]!!.jsonPrimitive.content)
    }

    @Test
    fun `tools call without params names no tool`() {
        val reply = testServer().reply("""{"jsonrpc":"2.0","id":5,"method":"tools/call"}""")
        assertEquals(
            "tool not found: ",
            reply["error"]!!.jsonObject["message"]!!.jsonPrimitive.content,
        )
    }

    @Test
    fun `the transport writes one frame per answered request`() {
        val server = testServer()
        val input = """
            {"jsonrpc":"2.0","id":1,"method":"initialize","params":{}}
            {"jsonrpc":"2.0","method":"notifications/initialized"}
            {"jsonrpc":"2.0","id":2,"method":"tools/call","params":{"name":"kevin_ping"}}
        """.trimIndent().reader().buffered()
        val output = StringWriter()

        server.runWith(input, output)

        val lines = output.toString().lines().filter(String::isNotEmpty)
        assertEquals(2, lines.size, "got $lines")
        assertEquals(listOf(1, 2), lines.map { json.parseToJsonElement(it).jsonObject["id"]!!.jsonPrimitive.content.toInt() })
    }
}

class ToolTest {

    @Test
    fun `ping reports liveness`() {
        assertEquals("""{"pong":true}""", testServer().reply(callFrame(1, "kevin_ping", buildJsonObject {})).text())
    }

    @Test
    fun `set then get round-trips a value with spaces`() {
        val server = testServer()
        val stored = server.reply(
            callFrame(1, "kevin_set", buildJsonObject { put("key", "greeting"); put("value", "hello world") }),
        )
        assertEquals("""{"ok":true}""", stored.text())
        val read = server.reply(callFrame(2, "kevin_get", buildJsonObject { put("key", "greeting") }))
        assertEquals(
            """{"found":true,"value":"hello world"}""",
            read.text(),
        )
    }

    @Test
    fun `get reports a missing key with a null value`() {
        val reply = testServer().reply(callFrame(1, "kevin_get", buildJsonObject { put("key", "nope") }))
        assertEquals("""{"found":false,"value":null}""", reply.text())
    }

    @Test
    fun `keys and len report the stored keys`() {
        val server = testServer()
        server.reply(callFrame(1, "kevin_set", buildJsonObject { put("key", "a"); put("value", "1") }))
        server.reply(callFrame(2, "kevin_set", buildJsonObject { put("key", "b"); put("value", "2") }))
        assertEquals(
            """{"keys":["a","b"],"count":2}""",
            server.reply(callFrame(3, "kevin_keys", buildJsonObject {})).text(),
        )
        assertEquals("""{"count":2}""", server.reply(callFrame(4, "kevin_len", buildJsonObject {})).text())
    }

    @Test
    fun `exists reports presence`() {
        val server = testServer()
        server.reply(callFrame(1, "kevin_set", buildJsonObject { put("key", "a"); put("value", "1") }))
        assertEquals("""{"exists":true}""", server.reply(callFrame(2, "kevin_exists", buildJsonObject { put("key", "a") })).text())
        assertEquals("""{"exists":false}""", server.reply(callFrame(3, "kevin_exists", buildJsonObject { put("key", "b") })).text())
    }

    @Test
    fun `del reports how many keys were present`() {
        val server = testServer()
        server.reply(callFrame(1, "kevin_set", buildJsonObject { put("key", "a"); put("value", "1") }))
        val args = buildJsonObject {
            put("keys", buildJsonArray { add(JsonPrimitive("a")); add(JsonPrimitive("ghost")) })
        }
        assertEquals("""{"deleted":1}""", server.reply(callFrame(2, "kevin_del", args)).text())
    }

    @Test
    fun `ttl reports each of the three states`() {
        val server = testServer()
        assertEquals(
            """{"key":"nope","seconds":-2,"state":"missing"}""",
            server.reply(callFrame(1, "kevin_ttl", buildJsonObject { put("key", "nope") })).text(),
        )
        server.reply(callFrame(2, "kevin_set", buildJsonObject { put("key", "p"); put("value", "1") }))
        assertEquals(
            """{"key":"p","seconds":-1,"state":"no-expiry"}""",
            server.reply(callFrame(3, "kevin_ttl", buildJsonObject { put("key", "p") })).text(),
        )
        server.reply(
            callFrame(4, "kevin_set", buildJsonObject {
                put("key", "e"); put("value", "1"); put("ttl_seconds", 60)
            }),
        )
        val body = json.parseToJsonElement(
            server.reply(callFrame(5, "kevin_ttl", buildJsonObject { put("key", "e") })).text(),
        ).jsonObject
        val state = body["state"]!!.jsonPrimitive.content
        val seconds = body["seconds"]!!.jsonPrimitive.content.toInt()
        assertEquals("expiring", state)
        assertTrue(seconds in 1..60, "expected 1..60 seconds, got $seconds")
    }

    @Test
    fun `expire reports whether the key existed`() {
        val server = testServer()
        val missing = server.reply(
            callFrame(1, "kevin_expire", buildJsonObject { put("key", "nope"); put("seconds", 30) }),
        )
        assertEquals("""{"ok":false}""", missing.text())
        server.reply(callFrame(2, "kevin_set", buildJsonObject { put("key", "a"); put("value", "1") }))
        val present = server.reply(
            callFrame(3, "kevin_expire", buildJsonObject { put("key", "a"); put("seconds", 30) }),
        )
        assertEquals("""{"ok":true}""", present.text())
    }

    @Test
    fun `flush only runs when confirmed`() {
        val server = testServer()
        server.reply(callFrame(1, "kevin_set", buildJsonObject { put("key", "a"); put("value", "1") }))
        val refused = server.reply(callFrame(2, "kevin_flush", buildJsonObject { }))
        assertEquals(true, refused.result()["isError"]!!.jsonPrimitive.content.toBoolean())
        assertEquals("confirm must be true to remove every key", refused.text())
        val confirmed = server.reply(
            callFrame(3, "kevin_flush", buildJsonObject { put("confirm", true) }),
        )
        assertEquals("""{"deleted":1}""", confirmed.text())
    }

    @Test
    fun `a missing key is reported as a readable failure`() {
        val reply = testServer().reply(callFrame(1, "kevin_set", buildJsonObject { put("value", "v") }))
        assertEquals(true, reply.result()["isError"]!!.jsonPrimitive.content.toBoolean())
        assertEquals("key is required and must not be blank", reply.text())
    }

    @Test
    fun `a non-positive expire time is refused before the store is touched`() {
        val reply = testServer().reply(
            callFrame(1, "kevin_expire", buildJsonObject { put("key", "a"); put("seconds", 0) }),
        )
        assertEquals(true, reply.result()["isError"]!!.jsonPrimitive.content.toBoolean())
        assertEquals("seconds is required and must be greater than 0", reply.text())
    }

    @Test
    fun `an empty value is refused`() {
        val reply = testServer().reply(
            callFrame(1, "kevin_set", buildJsonObject { put("key", "a"); put("value", "") }),
        )
        assertEquals("value is required and must not be empty", reply.text())
    }

    @Test
    fun `an empty key list is refused`() {
        val reply = testServer().reply(
            callFrame(1, "kevin_del", buildJsonObject { put("keys", buildJsonArray {}) }),
        )
        assertEquals("keys is required and must contain at least one key", reply.text())
    }

    @Test
    fun `a successful result omits the error flag`() {
        val result = testServer().reply(callFrame(1, "kevin_ping", buildJsonObject {})).result()
        assertNull(result["isError"], "a success should not carry isError")
    }
}
